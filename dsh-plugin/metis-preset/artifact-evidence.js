/** Artifact access uses the native DSH policy/sandbox pipeline, never host reads. */
import {fileURLToPath} from 'node:url';
import {readFileSync,lstatSync} from 'node:fs';
import {createHash,randomUUID} from 'node:crypto';
import {join} from 'node:path';
import {configurationHome} from './configuration.js';
import {ownerUserMessages} from './user-evidence.js';
import {dispatchNativeSkillTool,boundedNativeResult} from './native-skill-execution.js';
export const EVIDENCE_PROTOCOL='artifact-evidence-v2';
export const MAX_ARTIFACTS=32;
export const MAX_SUBMITTED_TEXT=80000;
const quote=value=>"'"+String(value).replaceAll("'","''")+"'";
const readerPackages=()=>join(configurationHome(),'metis-system-reader','packages-v2');
const installKey=Symbol.for('metis.reader-preparation.v2');
const preparations=globalThis[installKey]??=new Map();
export function evidenceCommand(request){
  const reader=fileURLToPath(new URL('./evidence-reader.py',import.meta.url));
  const encoded=Buffer.from(JSON.stringify(request)).toString('base64');
  return "$ErrorActionPreference='Stop'\n$env:PYTHONPATH="+quote(readerPackages())+"+[IO.Path]::PathSeparator+$env:PYTHONPATH\n$metisReaderPython=Get-Command python.exe,python,python3 -CommandType Application -ErrorAction SilentlyContinue | Where-Object {$_.Source -notmatch '[\\\\/]WindowsApps[\\\\/]'} | Select-Object -First 1\n"+
    `if($metisReaderPython){& $metisReaderPython.Source ${quote(reader)} --request ${quote(encoded)}}else{$metisReaderLauncher=Get-Command py.exe,py -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1;if(-not $metisReaderLauncher){throw 'METIS needs an available Python interpreter for read-only artifact inspection'};& $metisReaderLauncher.Source -3 ${quote(reader)} --request ${quote(encoded)}}\nif($LASTEXITCODE -ne 0){throw 'METIS artifact evidence reader failed; no goal verdict was produced'}\n`;
}
async function nativeRead(ctx,exec,request){
  const call=await dispatchNativeSkillTool(ctx,exec,'pwsh',{description:request.action==='read'?'按需补读已捕获证据（只读、核对哈希）':'捕获真实产物内容、指标与文件指纹（只读）',command:evidenceCommand(request),timeoutMs:30000});
  if(call.status!=='succeeded')throw Object.assign(new Error('原生产物取证尚未成功，不得判为达标'),{nativeResult:boundedNativeResult(call)});
  const stream=call.result.value?.stdout;let output=stream?.text||'';
  if(stream?.truncated&&stream.spillPath){const stat=lstatSync(stream.spillPath);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>8*1024*1024)throw new Error('原生取证回执溢出文件无效');output=readFileSync(stream.spillPath,'utf8');}
  const line=output.split(/\r?\n/).findLast(line=>line.startsWith('METIS_GOAL_EVIDENCE='));
  if(!line)throw new Error('原生读取没有返回真实取证标记');
  return JSON.parse(line.slice('METIS_GOAL_EVIDENCE='.length));
}
export async function inspectArtifacts(ctx,exec,paths){
  if(!paths.length)return {version:EVIDENCE_PROTOCOL,files:[]};
  if(paths.length>MAX_ARTIFACTS)throw new Error('最多'+MAX_ARTIFACTS+'项核心产物；更多文件可提交目录');
  let captured=await nativeRead(ctx,exec,{action:'inspect',paths});
  if(evidenceFiles(captured.files).some(file=>file.needsEvidence?.packages?.includes('pypdf'))&&captured.python){
    const owner=ownerUserMessages(exec.agent).at(-1)?.index??-1,key=exec.agent.id+':'+owner+':'+readerPackages();
    let preparation=preparations.get(key);
    if(!preparation){
      const destination=readerPackages(),stage=destination+'.stage-'+randomUUID();
      const command="$ErrorActionPreference='Stop'\n$target="+quote(destination)+"\n$stage="+quote(stage)+"\n$readerHome=[IO.Path]::GetFullPath("+quote(join(configurationHome(),'metis-system-reader'))+")\nif(-not([IO.Path]::GetFullPath($target).StartsWith($readerHome+[IO.Path]::DirectorySeparatorChar)) -or -not([IO.Path]::GetFullPath($stage).StartsWith($readerHome+[IO.Path]::DirectorySeparatorChar))){throw 'Reader preparation path escaped its owned directory'}\nif(-not(Test-Path -LiteralPath (Join-Path $target 'pypdf/__init__.py'))){New-Item -ItemType Directory -Force -Path $stage | Out-Null\n& "+quote(captured.python)+" -m pip install --disable-pip-version-check --no-warn-script-location --target $stage pypdf\nif($LASTEXITCODE -ne 0){throw 'PDF evidence dependency preparation failed'}\nif(-not(Test-Path -LiteralPath $target)){try{[IO.Directory]::Move($stage,$target)}catch{if(-not(Test-Path -LiteralPath (Join-Path $target 'pypdf/__init__.py'))){throw}}}\n}\n'METIS_READER_READY'\n";
      preparation=dispatchNativeSkillTool(ctx,exec,'pwsh',{description:'仅准备PDF取证器实际缺少的pypdf（独立目录，不安装科研整库依赖）',command,timeoutMs:120000}).then(call=>({status:call.status,...(call.result.value?.jobId?{jobId:call.result.value.jobId}:{}),...(call.status!=='succeeded'?{nativeResult:boundedNativeResult(call)}:{})}));
      preparations.set(key,preparation);
    }
    const result=await preparation;
    if(result.status==='succeeded')captured=await nativeRead(ctx,exec,{action:'inspect',paths});
    else for(const file of evidenceFiles(captured.files))if(file.needsEvidence?.packages?.includes('pypdf'))file.needsEvidence.preparation=result;
  }
  return captured;
}
export function evidenceFiles(roots){return roots.flatMap(root=>root.kind==='directory'?(root.entries||[]):[root]);}
export function artifactFingerprint(files,text=''){
  const normalized=files.map(file=>({path:process.platform==='win32'?file.path.replaceAll('\\','/').toLowerCase():file.path,exists:file.exists,sha256:file.sha256||null,manifestHash:file.manifestHash||null,bytes:file.bytes??null,fileCount:file.fileCount??null})).sort((a,b)=>a.path.localeCompare(b.path));
  return createHash('sha256').update(JSON.stringify({protocol:EVIDENCE_PROTOCOL,files:normalized,text})).digest('hex');
}
export async function readArtifactPage(ctx,exec,captured,request){
  const file=evidenceFiles(captured.files).find(file=>file.path===request.path);
  if(!file?.exists||!file.sha256)throw new Error('只能补读本次捕获且具有真实哈希的产物');
  if(request.part&&request.part!=='text'&&!file.parts?.includes(request.part)&&!file.contentParts?.some(part=>part.name===request.part))throw new Error('该部件不属于本次已捕获文件');
  return nativeRead(ctx,exec,{action:'read',path:file.path,expectedSha256:file.sha256,part:request.part||'text',offset:request.offset??0,maxChars:request.maxChars??6000});
}

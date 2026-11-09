/** Pinned catalog, bounded disclosure and owned-cache preparation. No upstream code runs. */
import {existsSync,readFileSync,writeFileSync,mkdirSync,renameSync,statSync,lstatSync,realpathSync,readdirSync,chmodSync,unlinkSync,rmSync} from 'node:fs';
import {join,dirname,resolve,relative,isAbsolute,sep,posix} from 'node:path';
import {homedir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {createHash,randomUUID} from 'node:crypto';
import {inflateRawSync} from 'node:zlib';

const root=fileURLToPath(new URL('./library/',import.meta.url));
const CHUNK=4*1024*1024,MAX_FILE=32*1024*1024,MARKER='.metis-upstream/manifest.json';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const gitSha=bytes=>createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');
const home=()=>process.env.DSH_HOME||join(homedir(),'.dsh');
const fail=(message,status=400)=>Object.assign(new Error(message),{status});
const clone=value=>JSON.parse(JSON.stringify(value));
const hashName=value=>{if(typeof value!=='string'||!/^[a-f0-9]{64}$/.test(value))throw fail('技能库摘要无效');return value;};
function boundedInt(value,fallback,max,label){if(value===undefined)return fallback;if(!Number.isInteger(value)||value<0||value>max)throw fail(label+'超出范围');return value;}
function sourcePath(value){if(typeof value!=='string'||!value||value.length>1000||value.startsWith('/')||value.includes('\\')||value.includes(':')||value.split('/').some(p=>!p||p==='.'||p==='..'||/[\x00-\x1f]/.test(p)||['.npmrc','id_rsa','id_ed25519'].includes(p.toLowerCase())||/^\.env(?:\.|$)/.test(p)&&!['.env.example','.env.template'].includes(p)))throw fail('来源资源路径无效');return value;}
function fromRoot(base,path){sourcePath(path);const target=resolve(base,...path.split('/')),rel=relative(base,target);if(isAbsolute(rel)||rel==='..'||rel.startsWith('..'+sep))throw fail('技能资源越界');return target;}
function fileHash(file,expected){const bytes=readFileSync(file);if(sha(bytes)!==expected)throw fail('技能库文件与固定摘要不一致：'+file,409);return bytes;}
let cached=null;
function catalog(){
  const pointer=join(root,'index.json');if(!existsSync(pointer))return {version:1,entries:[],sources:[],failures:[],catalogHash:null};
  const index=JSON.parse(readFileSync(pointer,'utf8')),hash=hashName(index.catalogHash);
  if(cached?.catalogHash===hash)return cached;
  const data=JSON.parse(fileHash(join(root,'catalogs',hash+'.json'),hash).toString('utf8'));
  if(data.version!==1||!Array.isArray(data.entries)||!Array.isArray(data.sources))throw fail('科研技能库索引格式不兼容',503);
  const ids=new Set();for(const item of data.entries){if(!/^ml-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)||item.id.length>64||ids.has(item.id))throw fail('科研技能库ID重复或无效',503);ids.add(item.id);}
  cached={...data,catalogHash:hash};return cached;
}
export function librarySkills(){return catalog().entries;}
export function librarySkillReviewToken(id){const item=libraryMetadata(id);return item?sha(Buffer.from(JSON.stringify({id:item.id,source:item.source,bodyHash:item.bodyHash,invocation:item.invocation}))):null;}
export function libraryInfo(){const data=catalog();return {version:1,catalogHash:data.catalogHash,total:data.entries.length,bindable:data.entries.filter(e=>e.invocation.modelInvocable).length,verification:'not-run-in-METIS',sources:data.sources.map(({skipped,errors,...source})=>{
  const entries=data.entries.filter(entry=>entry.source.repository===source.repository||entry.origins?.includes(source.repository)),direct=entries.filter(entry=>entry.source.repository===source.repository).length;
  return {...source,entryCount:entries.length,directCount:direct,linkedCount:entries.length-direct,bindableCount:entries.filter(entry=>entry.invocation.modelInvocable).length,kind:entries.length===1?'skill':'collection',skippedFiles:skipped.length,entryErrors:errors.length};
}),failedSources:data.failures.map(row=>({repository:row.repository,error:row.error})),pageSize:12};}
const historical=new Map();
export function libraryMetadata(id){
  if(typeof id!=='string'||!id.startsWith('ml-'))return null;
  const current=librarySkills().find(item=>item.id===id);if(current)return current;if(historical.has(id))return historical.get(id);
  if(!existsSync(join(root,'catalogs')))return null;
  const catalogs=readdirSync(join(root,'catalogs')).filter(file=>/^[a-f0-9]{64}\.json$/.test(file)).sort((a,b)=>statSync(join(root,'catalogs',b)).mtimeMs-statSync(join(root,'catalogs',a)).mtimeMs);
  for(const file of catalogs){const previous=JSON.parse(fileHash(join(root,'catalogs',file),file.slice(0,-5)).toString('utf8')),item=previous.entries?.find(entry=>entry.id===id);if(item){const retained={...item,retired:true};historical.set(id,retained);return retained;}}
  return null;
}
function recordFor(item){const hash=hashName(item.source.bundle),record=JSON.parse(fileHash(join(root,'records',hash+'.json'),hash).toString('utf8'));return validateRecord(record);}
function validateRecord(record){
  if(record.version!==1||!/^[a-z0-9][\w.-]*\/[a-z0-9][\w.-]*$/i.test(record.repository)||!/^[a-f0-9]{40}$/.test(record.commit)||!Array.isArray(record.files)||record.files.length>10000)throw fail('上游资源清单无效',409);
  sourcePath(record.entryPath);sourcePath(record.bodyPath);hashName(record.archiveHash);
  const seen=new Set();for(const file of record.files){sourcePath(file.path);if(seen.has(file.path)||!Number.isSafeInteger(file.size)||file.size<0||!/^[a-f0-9]{40}$/.test(file.gitSha))throw fail('资源清单条目无效',409);seen.add(file.path);}
  return record;
}
export function isLibraryPackage(directory){return existsSync(join(directory,...MARKER.split('/')));}
export function packageLibraryRecord(directory){const value=JSON.parse(readFileSync(join(directory,...MARKER.split('/')),'utf8'));validateRecord(value);return value;}
function verifiedBytes(bytes,file){if(bytes.length!==file.size||file.sha256&&sha(bytes)!==file.sha256||gitSha(bytes)!==file.gitSha)throw fail('资源不符合固定版本：'+file.path,409);return bytes;}
function decodeRange(record,file,read){
  if(file.external)throw fail('资源尚未缓存，需要按固定commit读取：'+file.path,424);
  if(file.size>MAX_FILE||!Number.isSafeInteger(file.offset)||file.offset<0||!Number.isSafeInteger(file.compressedSize)||file.compressedSize<0||file.compressedSize>MAX_FILE||file.offset+file.compressedSize>record.archiveSize)throw fail('资源超过单文件读取限制或ZIP索引无效',413);
  const bytes=read(file.offset,file.compressedSize);
  const raw=file.method===0?bytes:file.method===8?inflateRawSync(bytes,{maxOutputLength:MAX_FILE}):null;
  if(!raw)throw fail('不支持此资源压缩方式');return verifiedBytes(raw,file);
}
function globalRange(record,offset,length){const file=join(root,'bundles',hashName(record.archiveHash)+'.zip'),bytes=fileHash(file,record.archiveHash);return bytes.subarray(offset,offset+length);}
function packageRange(directory,record,offset,length){
  if(!Array.isArray(record.archiveParts))throw fail('资源压缩分块记录缺失',409);
  const blocks=[];let remaining=length,position=offset;
  while(remaining>0){const at=Math.floor(position/CHUNK),part=record.archiveParts[at];if(!part)throw fail('资源压缩分块缺失',409);const data=fileHash(fromRoot(directory,part.path),hashName(part.sha256)),start=position%CHUNK,take=Math.min(remaining,data.length-start);if(take<=0)throw fail('资源分块越界',409);blocks.push(data.subarray(start,start+take));remaining-=take;position+=take;}
  return Buffer.concat(blocks);
}
async function remoteBytes(record,file,signal){
  if(file.size>MAX_FILE)throw fail('该上游资源大于32MiB，需要另行准备，未自动下载：'+file.path,413);
  const directory=join(home(),'metis-library-resource-cache'),target=join(directory,file.gitSha);
  if(existsSync(target))return verifiedBytes(readFileSync(target),file);
  const url='https://raw.githubusercontent.com/'+record.repository+'/'+record.commit+'/'+file.path.split('/').map(encodeURIComponent).join('/');
  const deadline=AbortSignal.timeout(45000),requestSignal=signal?AbortSignal.any([signal,deadline]):deadline;
  const response=await fetch(url,{redirect:'error',signal:requestSignal,headers:{'user-agent':'METIS-pinned-resource-reader'}});if(!response.ok)throw fail('固定上游资源暂不可取：HTTP '+response.status,502);
  const chunks=[];let size=0;for await(const bytes of response.body){size+=bytes.length;if(size>file.size||size>MAX_FILE)throw fail('固定资源大小不符',409);chunks.push(bytes);}
  const data=verifiedBytes(Buffer.concat(chunks),file);mkdirSync(directory,{recursive:true});if(lstatSync(directory).isSymbolicLink())throw fail('资源缓存目录不能是链接');const temporary=target+'.tmp-'+randomUUID();writeFileSync(temporary,data,{flag:'wx'});try{renameSync(temporary,target);}catch(error){if(!existsSync(target)||!readFileSync(target).equals(data))throw error;}finally{if(existsSync(temporary))unlinkSync(temporary);}return data;
}
// Public releases keep source pointers. Fetch only explicitly selected bodies;
// synchronous snapshotting then consumes the verified owned cache.
export async function primeLibrarySkills(ids,{signal}={}){
  for(const id of new Set(ids)){
    const item=libraryMetadata(id);if(!item)continue;
    const record=recordFor(item),file=record.files.find(file=>file.path===record.bodyPath);
    if(!file)throw fail('固定技能缺少正文记录：'+id,409);
    if(file.external)await remoteBytes(record,file,signal);
  }
}
function cachedRemoteBytes(file){
  const path=join(home(),'metis-library-resource-cache',file.gitSha);
  if(!existsSync(path))throw fail('此技能正文尚未按固定版本读取，请先读取技能详情再保存绑定。',424);
  return verifiedBytes(readFileSync(path),file);
}
function overlays(directory){const path=join(directory,'.metis-upstream','overrides.json');return existsSync(path)?JSON.parse(readFileSync(path,'utf8')):{};}
function resolveResource(record,path){
  if(typeof path!=='string'||path.startsWith('/')||path.includes('\\')||path.includes(':')||/[\x00-\x1f]/.test(path))throw fail('资源路径无效');
  const local=posix.normalize(posix.join(posix.dirname(record.entryPath),path));
  if(record.files.some(file=>file.path===local))return local;
  const absolute=posix.normalize(path);if(record.files.some(file=>file.path===absolute))return sourcePath(absolute);
  const directory=posix.dirname(record.entryPath);return sourcePath(directory&&absolute.startsWith(directory+'/')?absolute:local);
}
async function packageBytes(skill,path,signal){
  const record=packageLibraryRecord(skill.root),normalized=resolveResource(record,path),edited=overlays(skill.root)[normalized];
  if(edited){if(edited.deleted)throw fail('资源已从本技能版本删除',404);const bytes=fileHash(fromRoot(skill.root,edited.storage),hashName(edited.sha256));return {path:normalized,bytes};}
  const file=record.files.find(file=>file.path===normalized);if(!file)throw fail('此固定技能包没有该资源：'+normalized,404);
  const bytes=file.external?await remoteBytes(record,file,signal):decodeRange(record,file,(offset,length)=>packageRange(skill.root,record,offset,length));return {path:normalized,bytes};
}
export function textPage(text,{offset,maxChars}={}){
  const start=boundedInt(offset,0,text.length,'读取位置'),length=boundedInt(maxChars,4000,6000,'片段长度');if(length<1)throw fail('片段长度必须大于0');
  let end=Math.min(text.length,start+length);if(end<text.length&&/[\uDC00-\uDFFF]/.test(text[end]))end+=end===start+1?1:-1;
  return {content:text.slice(start,end),offset:start,nextOffset:end<text.length?end:null,totalCharacters:text.length,complete:start===0&&end===text.length};
}
function windowed(items,{offset,limit}={}){const start=boundedInt(offset,0,items.length,'分页位置'),count=boundedInt(limit,12,30,'分页数量');if(count<1)throw fail('分页数量必须大于0');return {items:items.slice(start,start+count),total:items.length,offset:start,nextOffset:start+count<items.length?start+count:null};}
export function searchSkillMetadata(skills,{query='',source,offset,limit,invocableOnly=false}={}){
  if(typeof query!=='string'||query.length>2000||source!==undefined&&(typeof source!=='string'||source.length>300)||typeof invocableOnly!=='boolean')throw fail('技能搜索参数无效');
  const aliases=[[/斯坦福/,' auto empirical'],[/文献|综述|检索/,' literature search review'],[/因果|实证/,' causal empirical inference'],[/回归|计量/,' regression econometrics'],[/可视化|图表|绘图/,' visualization figure plot'],[/投稿|审稿/,' submission review'],[/润色|去套话/,' polishing humanizer'],[/基金|申报/,' grant proposal'],[/定性|访谈/,' qualitative interview'],[/定量|统计/,' quantitative statistics']];
  let expanded=query.toLowerCase();for(const [pattern,words]of aliases)if(pattern.test(query))expanded+=words;
  const words=[...new Set(expanded.match(/[a-z0-9][a-z0-9-]+|[\u3400-\u9fff]{2,}/g)||[])],pairs=words.flatMap(word=>/^[\u3400-\u9fff]+$/.test(word)&&word.length>2?Array.from({length:word.length-1},(_,i)=>word.slice(i,i+2)):[word]);
  const ranked=skills.filter(skill=>(!source||skill.source?.repository===source||skill.origins?.includes(source))&&(!invocableOnly||skill.invocation.modelInvocable&&!skill.retired)).map(skill=>{
    const title=(skill.name||skill.id).toLowerCase(),description=(skill.description+' '+(skill.whenToUse||'')+' '+(skill.dependencyHints||[]).join(' ')+' '+(skill.source?.entryPath||'')+' '+(skill.source?.repository||'')+' '+(skill.origins||[]).join(' ')+' '+JSON.stringify(skill.upstreamEvidence?.tags||{})).toLowerCase();
    const score=pairs.reduce((sum,word)=>sum+(title.includes(word)?6:description.includes(word)?2:0),0);return {skill,score};
  }).filter(row=>!words.length||row.score>0).sort((a,b)=>b.score-a.score||Number(!!a.skill.duplicateOf)-Number(!!b.skill.duplicateOf)||Number(!!b.skill.upstreamEvidence?.evalScenariosDeclared)-Number(!!a.skill.upstreamEvidence?.evalScenariosDeclared)||a.skill.id.localeCompare(b.skill.id));
  const page=windowed(ranked.map(row=>row.skill),{offset,limit});return {...page,query,ranking:'lexical-relevance; runtime-maturity-not-verified',items:page.items.map(item=>({...item,description:item.description.slice(0,600)}))};
}
export function librarySkillDocument(id,{packages,markdown}){
  const item=libraryMetadata(id);if(!item)throw fail('科研技能库不存在此ID：'+id,404);if(item.availability!=='indexed')throw fail('此条目只可阅读，暂不能绑定：'+(item.formatIssue||id),409);
  const record=recordFor(item),bodyFile=record.files.find(file=>file.path===record.bodyPath);if(!bodyFile)throw fail('技能正文不在固定资源包内',409);record.skillMetadata={id:item.id,name:item.name,source:item.source,license:item.license,dependencyHints:item.dependencyHints,verification:item.verification,upstreamEvidence:item.upstreamEvidence};
  const body=(bodyFile.external?cachedRemoteBytes(bodyFile):decodeRange(record,bodyFile,(offset,length)=>globalRange(record,offset,length))).subarray(record.bodyOffset||0).toString('utf8');
  const skill={id,description:item.description,content:body,whenToUse:item.whenToUse,invocation:clone(item.invocation),source:{...item.source,catalogRevision:catalog().catalogHash,license:item.license,verification:item.verification}};
  const files=new Map();record.archiveParts=[];
  if(record.files.some(file=>!file.external)){
    const archive=fileHash(join(root,'bundles',record.archiveHash+'.zip'),record.archiveHash);
    for(let offset=0;offset<archive.length;offset+=CHUNK){const data=archive.subarray(offset,Math.min(offset+CHUNK,archive.length)),path='.metis-upstream/archive-'+String(record.archiveParts.length).padStart(4,'0')+'.bin';files.set(path,data);record.archiveParts.push({path,size:data.length,sha256:sha(data)});}
  }
  files.set(MARKER,Buffer.from(JSON.stringify(record)));files.set('SKILL.md',Buffer.from(markdown(skill)));
  const manifest=[...files.entries()].sort(([a],[b])=>a<b?-1:a>b?1:0).map(([path,bytes])=>({path,size:bytes.length,sha256:sha(bytes)})),hash=sha(Buffer.from(JSON.stringify(manifest))),target=join(packages,hash);
  if(manifest.length>128||manifest.reduce((sum,file)=>sum+file.size,0)>64*1024*1024)throw fail('此技能固定资源包超过快照限制',413);
  mkdirSync(packages,{recursive:true});if(!existsSync(target)){
    const temporary=join(packages,'.library-'+randomUUID());mkdirSync(join(temporary,'files'),{recursive:true});
    for(const [path,bytes]of files){const destination=fromRoot(join(temporary,'files'),path);mkdirSync(dirname(destination),{recursive:true});writeFileSync(destination,bytes,{flag:'wx'});}
    writeFileSync(join(temporary,'manifest.json'),JSON.stringify(manifest,null,2)+'\n',{flag:'wx'});try{renameSync(temporary,target);}catch(error){if(!existsSync(target))throw error;}finally{const rel=relative(resolve(packages),resolve(temporary));if(existsSync(temporary)&&!isAbsolute(rel)&&!rel.includes(sep)&&rel.startsWith('.library-')&&!lstatSync(temporary).isSymbolicLink())rmSync(temporary,{recursive:true});}
  }
  if(sha(Buffer.from(JSON.stringify(JSON.parse(readFileSync(join(target,'manifest.json'),'utf8')))))!==hash)throw fail('已有科研技能包摘要不一致',409);
  for(const file of manifest)fileHash(fromRoot(join(target,'files'),file.path),file.sha256);
  return {...skill,packageHash:hash,root:join(target,'files'),path:join(target,'files','SKILL.md'),library:true,builtin:false};
}
function callRequirements(skill,record,text){
  const metadata=record?.skillMetadata||skill,repository=metadata.source?.repository||skill.source?.repository,entryPath=record?.entryPath||metadata.source?.entryPath||null;
  const declaredTools=[...new Set(text.match(/\bmcp__[A-Za-z0-9_-]+/g)||[])];
  const commands=new Set();
  for(const block of text.matchAll(/```(?:bash|sh|shell|powershell|pwsh|console|cmd)[^\n]*\n([\s\S]*?)```/gi))for(const line of block[1].split('\n')){
    const match=/^(?:\$\s*)?([a-z][a-z0-9_.-]*)(?:\s|$)/i.exec(line.trim());
    if(match&&!['echo','cd','export','set','if','then','else','fi','for','do','done'].includes(match[1].toLowerCase()))commands.add(match[1]);
  }
  for(const match of text.matchAll(/`(uvx?|pip3?|npm|npx|python3?|Rscript)\s+[^`\n]+`/g))commands.add(match[1]);
  const installRecipes=[];
  for(const match of text.matchAll(/\b(uv\s+tool|pip3?|python3?\s+-m\s+pip|npm)\s+install\s+([^\n`]+)/g)){
    const runtime=match[1]==='npm'?'node':'python',packages=match[2].trim().replace(/\\$/,'').trim().split(/\s+/);
    const valid=runtime==='node'?/^(?:@[a-z0-9_.-]+\/)?[a-z0-9][a-z0-9_.-]*(?:@[a-z0-9_.+-]+)?$/i:/^[a-z0-9][a-z0-9_.-]*(?:\[[a-z0-9_,.-]+\])?(?:==[a-z0-9_.+-]+)?$/i;
    if(packages.length&&packages.length<=12&&packages.every(name=>valid.test(name))&&!installRecipes.some(recipe=>recipe.runtime===runtime&&JSON.stringify(recipe.packages)===JSON.stringify(packages)))installRecipes.push({runtime,packages,source:'documented-install-command'});
  }
  const scripts=(record?.files||[]).filter(file=>/\.(?:py|r|sh|bash|ps1|js|mjs|cjs|ts)$/i.test(file.path)).map(file=>file.path);
  const environmentFiles=(record?.files||[]).filter(file=>/(?:^|\/)(?:requirements[^/]*\.txt|pyproject\.toml|package\.json|environment\.ya?ml|uv\.lock|renv\.lock)$/i.test(file.path)).map(file=>file.path);
  const linkedPaths=new Set();
  for(const match of text.matchAll(/(?:\]\(|[`"'])([^\s<>`"')]{1,400}\/(?:SKILL\.md|SKILL\.ya?ml))(?:[)\s`"'#]|$)/gi)){
    const path=match[1];if(path.includes('://')||path.startsWith('/'))continue;
    linkedPaths.add(posix.normalize(posix.join(posix.dirname(entryPath||''),path)));linkedPaths.add(posix.normalize(path));
  }
  const related=repository?librarySkills().filter(item=>item.id!==skill.id&&item.source.repository===repository&&(linkedPaths.has(item.source.entryPath)||item.name?.includes('-')&&(text.includes('`'+item.name+'`')||text.includes('调用 '+item.name+' 技能')))):[];
  return {kind:'instruction-skill',originalName:metadata.name||skill.name||skill.id,entryPath,resourceBase:entryPath?posix.dirname(entryPath)||'.':null,dependencyHints:metadata.dependencyHints||[],declaredTools:declaredTools.slice(0,24),declaredToolCount:declaredTools.length,declaredCommands:[...commands].slice(0,12),declaredCommandCount:commands.size,installRecipes:installRecipes.slice(0,6),scriptFiles:scripts.slice(0,12),scriptCount:scripts.length,environmentFiles:environmentFiles.slice(0,12),referencedSkills:related.slice(0,12).map(item=>({id:item.id,name:item.name,entryPath:item.source.entryPath,modelInvocable:item.invocation.modelInvocable})),referencedSkillCount:related.length,environmentStatus:'not-checked',execution:'读取本技能正文后由DSH Agent执行指令；需要脚本时先prepare取得真实目录，再通过DSH原生终端运行。平台工具名称须与当前DSH实际工具目录核对；缺失的MCP、CLI或凭据不能视为已安装。被引用的其他子技能需在编排时精确绑定，不会因绑定仓库而自动全部加载。'};
}
export function pinnedSkillRequirements(skill){const record=isLibraryPackage(skill.root)?packageLibraryRecord(skill.root):null;return callRequirements(skill,record,skill.content);}
export async function readCatalogSkill(id,request={}){
  const item=libraryMetadata(id);if(!item)throw fail('技能库条目不存在',404);
  const record=recordFor(item),file=record.files.find(file=>file.path===(request.path?resolveResource(record,request.path):record.bodyPath));if(!file)throw fail('来源文件不存在',404);
  const bytes=file.external?await remoteBytes(record,file,request.signal):decodeRange(record,file,(offset,length)=>globalRange(record,offset,length));
  const raw=request.path?bytes:bytes.subarray(record.bodyOffset||0),text=raw.toString('utf8'),binary=raw.includes(0)||!Buffer.from(text).equals(raw);
  const page=windowed(record.files.map(({path,size,external})=>({path,size,external:!!external})),{offset:request.fileOffset,limit:request.fileLimit||20});
  return {...item,...(binary?{binary:true,size:raw.length,sha256:sha(raw)}:textPage(text,request)),...(!request.path&&!binary?{requirements:callRequirements(item,record,text)}:{}),files:page.items,fileTotal:page.total,nextFileOffset:page.nextOffset,path:request.path?file.path:undefined,source:{...item.source,license:item.license},disclosure:'bounded-fragment'};
}
export async function readPinnedSkill(skill,request={}){
  if(!request.path){const record=isLibraryPackage(skill.root)?packageLibraryRecord(skill.root):null,upstream=record?.skillMetadata;const result={id:skill.id,description:skill.description,invocation:skill.invocation,source:{...upstream?.source,...skill.source},license:upstream?.license,dependencyHints:upstream?.dependencyHints,upstreamEvidence:upstream?.upstreamEvidence,verification:upstream?.verification||'not-run-in-METIS',requirements:pinnedSkillRequirements(skill),bodyHash:sha(Buffer.from(skill.content)),...(!request.metadataOnly?textPage(skill.content,request):{})};if(record){const edited=overlays(skill.root),names=new Map(record.files.map(file=>[file.path,{path:file.path,size:file.size,external:!!file.external}]));for(const [path,value]of Object.entries(edited)){if(value.deleted)names.delete(path);else names.set(path,{path,size:value.size,modified:true});}const page=windowed([...names.values()].sort((a,b)=>a.path.localeCompare(b.path)),{offset:request.fileOffset,limit:request.fileLimit||20});return {...result,files:page.items,fileTotal:page.total,nextFileOffset:page.nextOffset};}return {...result,...plainFiles(skill,request)};}
  let path=request.path,bytes;if(isLibraryPackage(skill.root)){const value=await packageBytes(skill,path,request.signal);path=value.path;bytes=value.bytes;}else{const target=fromRoot(skill.root,path),rel=relative(realpathSync(skill.root),realpathSync(target));if(isAbsolute(rel)||rel==='..'||rel.startsWith('..'+sep)||lstatSync(target).isSymbolicLink())throw fail('技能资源越界');if(statSync(target).size>MAX_FILE)throw fail('资源大于32MiB',413);bytes=readFileSync(target);}
  const text=bytes.toString('utf8');if(bytes.includes(0)||!Buffer.from(text).equals(bytes))return {path,binary:true,size:bytes.length,sha256:sha(bytes)};const page=textPage(text,request);return {path,text:page.content,...page,size:bytes.length,sha256:sha(bytes)};
}
function plainFiles(skill,request){const names=[],base=realpathSync(skill.root);let directories=0;function walk(directory,prefix=''){const rel=relative(base,realpathSync(directory));if(isAbsolute(rel)||rel==='..'||rel.startsWith('..'+sep)||++directories>512)throw fail('技能文件目录越界或过多');for(const entry of readdirSync(directory,{withFileTypes:true})){if(entry.isSymbolicLink())throw fail('技能资源含链接，拒绝越界读取');const path=join(directory,entry.name);if(entry.isDirectory())walk(path,prefix+entry.name+'/');else if(entry.isFile())names.push({path:prefix+entry.name,size:statSync(path).size});if(names.length>10000)throw fail('技能文件清单过大');}}walk(skill.root);const page=windowed(names,{offset:request.fileOffset,limit:request.fileLimit||20});return {files:page.items,fileTotal:page.total,nextFileOffset:page.nextOffset};}
export function editLibraryResources(files,edits){
  const record=validateRecord(JSON.parse(files[MARKER].toString('utf8'))),mapping=files['.metis-upstream/overrides.json']?JSON.parse(files['.metis-upstream/overrides.json'].toString('utf8')):{};
  for(const edit of edits||[]){if(Object.keys(edit).some(key=>!['path','text','delete'].includes(key)))throw fail('资源修改字段无效');const path=resolveResource(record,edit.path);if(path===record.entryPath||path===record.bodyPath||path.startsWith('.metis-'))throw fail('技能正文请通过content修改，来源清单不可覆盖');if(edit.delete===true){if(!record.files.some(file=>file.path===path)&&!mapping[path])throw fail('待删除资源不存在');mapping[path]={deleted:true};}else{if(typeof edit.text!=='string'||Buffer.byteLength(edit.text)>4*1024*1024)throw fail('资源修改需为不超过4MiB的文本');const bytes=Buffer.from(edit.text),storage='.metis-upstream/overlay-'+sha(Buffer.from(path))+'.txt';files[storage]=bytes;mapping[path]={storage,size:bytes.length,sha256:sha(bytes)};}}
  files['.metis-upstream/overrides.json']=Buffer.from(JSON.stringify(mapping));return files;
}
export async function preparePinnedResources(skill,signal){
  if(!isLibraryPackage(skill.root))return {directory:skill.root,baseDir:skill.root,entryFile:skill.path,prepared:true,dependencyInstallation:'not-performed',upstreamCodeExecution:'not-performed',environmentStatus:'not-checked'};
  const record=packageLibraryRecord(skill.root),changes=overlays(skill.root),key=sha(Buffer.from(JSON.stringify([record,changes]))),parent=join(home(),'metis-library-workspaces');mkdirSync(parent,{recursive:true});if(lstatSync(parent).isSymbolicLink())throw fail('技能工作缓存不能是链接');const directory=join(realpathSync(parent),key),names=new Set(record.files.map(file=>file.path));for(const path of Object.keys(changes))names.add(path);
  mkdirSync(directory,{recursive:true});if(lstatSync(directory).isSymbolicLink())throw fail('技能准备目录不能是链接');let total=0,count=0;
  for(const path of names){signal?.throwIfAborted();if(changes[path]?.deleted)continue;sourcePath(path);if(path.split('/').some(p=>/[<>"|?*]/.test(p)||/[. ]$/.test(p)||/^(con|prn|aux|nul|com\d|lpt\d)(\.|$)/i.test(p)))throw fail('此来源路径无法安全导出到Windows：'+path);const {bytes}=await packageBytes(skill,path,signal);if((total+=bytes.length)>256*1024*1024||++count>10000)throw fail('技能文件准备超过256MiB/10000文件，未执行任何代码');const target=fromRoot(directory,path);mkdirSync(dirname(target),{recursive:true});const rel=relative(realpathSync(directory),realpathSync(dirname(target)));if(isAbsolute(rel)||rel==='..'||rel.startsWith('..'+sep))throw fail('技能准备目录越界');if(existsSync(target)){if(lstatSync(target).isSymbolicLink()||!readFileSync(target).equals(bytes))throw fail('已准备的来源文件被修改，拒绝覆盖：'+path,409);}else writeFileSync(target,bytes,{flag:'wx'});if(record.files.find(file=>file.path===path)?.mode==='100755')chmodSync(target,0o755);}
  const baseDir=posix.dirname(record.entryPath)?fromRoot(directory,posix.dirname(record.entryPath)):directory;
  return {directory:baseDir,baseDir,entryFile:fromRoot(directory,record.entryPath),repositoryDirectory:directory,files:count,bytes:total,prepared:true,dependencyInstallation:'not-performed',upstreamCodeExecution:'not-performed',environmentStatus:'not-checked',instructions:'配置后的技能正文使用read读取；本次返回的baseDir才是脚本和相对资源的真实目录，可替代技能说明中的{baseDir}，不要直接使用上游平台的.claude/skills等安装路径。需要脚本时通过DSH实际可用的终端按真实命令执行并报告结果；本次仅准备文件，未执行代码或安装依赖。'};
}

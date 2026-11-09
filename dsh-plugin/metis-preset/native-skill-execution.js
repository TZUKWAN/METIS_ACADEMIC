/** Native DSH dispatch and isolated, on-demand dependency preparation. */
import {existsSync,mkdirSync,lstatSync,readdirSync,readFileSync,writeFileSync,copyFileSync,constants} from 'node:fs';
import {join,resolve,relative,isAbsolute,dirname,delimiter} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {configurationHome} from './configuration.js';
import {executeNativeTool} from './tool-runtime-compat.js';

const hash=value=>createHash('sha256').update(value).digest('hex');
const quote=value=>"'"+String(value).replaceAll("'","''")+"'";
const preparations=new Map();
export const skillExecutionScope=(mode,profile)=>hash(JSON.stringify({mode,profile}));
function ownedDirectory(path){mkdirSync(path,{recursive:true,mode:0o700});if(!lstatSync(path).isDirectory()||lstatSync(path).isSymbolicLink())throw new Error('METIS运行目录不是普通目录：'+path);return path;}
function within(root,path){const value=relative(resolve(root),resolve(path));if(isAbsolute(value)||value==='..'||value.startsWith('..\\')||value.startsWith('../'))throw new Error('依赖准备路径越界');return resolve(path);}
function mirrorSource(source,target){
  let files=0,bytes=0;
  const walk=(from,to)=>{
    if(lstatSync(from).isSymbolicLink())throw new Error('固定技能来源不能含链接');ownedDirectory(to);
    for(const entry of readdirSync(from,{withFileTypes:true})){
      if(['.git','.venv','venv','node_modules','__pycache__'].includes(entry.name))continue;
      const original=join(from,entry.name),destination=within(target,join(to,entry.name)),stat=lstatSync(original);
      if(stat.isSymbolicLink())throw new Error('固定技能来源不能含链接');
      if(stat.isDirectory())walk(original,destination);
      else if(stat.isFile()){
        if(++files>10000||(bytes+=stat.size)>256*1024*1024)throw new Error('当前技能资源超过运行目录限制');
        if(existsSync(destination)){if(!lstatSync(destination).isFile()||lstatSync(destination).isSymbolicLink()||!readFileSync(destination).equals(readFileSync(original)))throw new Error('运行目录中的固定来源文件已变化，未覆盖：'+destination);}
        else copyFileSync(original,destination,constants.COPYFILE_EXCL);
      }else throw new Error('固定技能来源文件类型不支持');
    }
  };walk(source,target);
}
export function nativeToolSchemas(ctx,agent){if(typeof ctx.tools?.schemas!=='function'||typeof ctx.tools.execute!=='function')throw new Error('DSH原生工具执行服务尚未就绪');return ctx.tools.schemas(agent);}
function nativeSchema(ctx,agent,name){
  const schemas=nativeToolSchemas(ctx,agent),exact=schemas.find(schema=>schema.name===name);if(exact)return exact;
  if(name.startsWith('mcp__')){const normalized=name.replaceAll('-','_'),matches=schemas.filter(schema=>schema.name.replaceAll('-','_')===normalized);if(matches.length===1)return matches[0];}
  throw new Error('当前DSH Agent没有这个真实工具：'+name+'。先通过原生MCP连接/工具发现准备它，不能使用虚构工具名。');
}
export function nativeOutcome(result){
  const value=result.value;
  if(result.isError||value?.isError||value?.sandbox?.denied||value?.sandbox?.runnerFailed)return 'failed';
  if(value?.aborted)return 'cancelled';
  if(value?.kind==='background'||value?.kind==='promoted'||value?.job?.status==='running'||value?.job?.status==='stopping')return 'pending';
  if(value?.timedOut)return 'failed';
  if(value?.kind==='foreground')return value.exitCode===0?'succeeded':'failed';
  if(['failed','killed'].includes(value?.job?.status))return 'failed';
  return 'succeeded';
}
export async function dispatchNativeSkillTool(ctx,exec,name,args){
  exec.signal?.throwIfAborted();
  if(!exec.agent||!exec.token||!exec.callId||!exec.agent.session?.append)throw new Error('技能执行需要真实DSH工具调用上下文');
  if(typeof name!=='string'||!name||name.length>180||name==='metis_library'||name.startsWith('metis_config_'))throw new Error('不允许递归调用技能工具或从研究会话改写编排配置');
  if(!args||typeof args!=='object'||Array.isArray(args)||JSON.stringify(args).length>2*1024*1024)throw new Error('原生工具参数无效或过大');
  const schema=nativeSchema(ctx,exec.agent,name),callId=String(exec.callId)+':metis:'+randomUUID(),rootCallId=exec.rootCallId||exec.callId;
  const boundary=ctx.get('sessionProjections')?.stateOf(exec.agent.session,'turnBoundary');
  const durable=Number.isSafeInteger(boundary?.openTurnStartSeq);
  if(durable)exec.agent.session.append('tool/ptc-dispatch-start',{rootCallId,parentCallId:exec.callId,subCallId:callId,name:schema.name,arguments:args});
  // execute() is the public, complete policy/approval/sandbox pipeline, not a tool-body shortcut.
  const result=await executeNativeTool(ctx,{callId,rootCallId,name:schema.name,schema,arguments:args,agent:exec.agent,parent:exec.token,signal:exec.signal,toolSet:exec.toolSet});
  let logWarning;
  try{if(durable)exec.agent.session.append('tool/ptc-dispatch',{rootCallId,parentCallId:exec.callId,subCallId:callId,name:schema.name,arguments:args,isError:result.isError,content:result.content,...(result.meta?{meta:result.meta}:{}),...(result.error?.info?{error:result.error.info}:{})});}catch(error){logWarning='原生调用已返回，但调用记录写入失败：'+error.message;}
  for(const context of result.additionalContexts||[])exec.deferContext?.(context);
  return {name:schema.name,callId,status:nativeOutcome(result),result,...(logWarning?{logWarning}:{})};
}
export function boundedNativeResult(call){
  const payload={nativeTool:call.name,callId:call.callId,status:call.status,isError:!!call.result.isError,value:call.result.value,error:call.result.error,content:call.result.content,...(call.logWarning?{logWarning:call.logWarning}:{})},text=JSON.stringify(payload);
  if(text.length<=12000)return payload;
  const preview=call.result.content?.filter(block=>block.type==='text').map(block=>block.text).join('\n').slice(-6000)||'';
  try{const folder=ownedDirectory(join(configurationHome(),'metis-library-tool-results')),path=join(folder,randomUUID()+'.json');writeFileSync(path,text+'\n',{flag:'wx',mode:0o600});return {nativeTool:call.name,callId:call.callId,status:call.status,isError:!!call.result.isError,resultFile:path,truncated:true,preview,next:'完整真实结果已保存到resultFile，按需用DSH原生文件工具读取；不要重新执行命令来取输出。'};}
  catch(error){return {nativeTool:call.name,callId:call.callId,status:call.status,isError:!!call.result.isError,truncated:true,preview,resultPersistenceError:error.message,next:'原生调用已有真实结果，但文件保存失败；先查看原生调用记录，不要盲目重跑。'};}
}
export function boundedSkillExecutionResult(value){
  const text=JSON.stringify(value);if(text.length<=18000)return value;
  let path;
  try{const folder=ownedDirectory(join(configurationHome(),'metis-library-tool-results'));path=join(folder,randomUUID()+'.json');writeFileSync(path,text+'\n',{flag:'wx',mode:0o600});}catch(error){return {skillId:value.skillId,status:value.status,readyForNativeRun:value.readyForNativeRun,environment:value.environment?{status:value.environment.status,runtime:value.environment.runtime,baseDir:value.environment.baseDir,jobId:value.environment.jobId}:undefined,truncated:true,resultPersistenceError:error.message,preview:text.slice(-6000),next:'实际操作可能已经完成，保存结果文件失败；先查看原生工具调用记录，不要盲目重复执行。'};}
  return {skillId:value.skillId,status:value.status,readyForNativeRun:value.readyForNativeRun,environment:value.environment?{status:value.environment.status,runtime:value.environment.runtime,baseDir:value.environment.baseDir,jobId:value.environment.jobId}:undefined,truncated:true,resultFile:path,next:'完整真实执行回执在resultFile；按需读取，不重复启动安装或任务。'};
}
function pythonProbe(packages,modules,commands,strictPins=true){return `import json, importlib, importlib.metadata, shutil, os\npackages=json.loads(${JSON.stringify(JSON.stringify(packages))})\nmodules=json.loads(${JSON.stringify(JSON.stringify(modules))})\ncommands=json.loads(${JSON.stringify(JSON.stringify(commands))})\nversions={}\nmissing=[]\nfor spec in packages:\n    name=spec.split('==')[0].split('[')[0]\n    try:\n        version=importlib.metadata.version(name)\n        versions[name]=version\n        if ${strictPins?'True':'False'} and '==' in spec and version!=spec.split('==',1)[1]: missing.append(spec)\n    except importlib.metadata.PackageNotFoundError: missing.append(spec)\nmodule_status={}\nfor name in modules:\n    try:\n        importlib.import_module(name)\n        module_status[name]={'available':True}\n    except Exception as error: module_status[name]={'available':False,'error':str(error)}\ncommand_status={name:shutil.which(name) for name in commands}\nprint(json.dumps({'versions':versions,'missingPackages':missing,'modules':module_status,'commands':command_status}))\n`;}
function pythonCode(code){return "exec(__import__('base64').b64decode('"+Buffer.from(code).toString('base64')+"'))";}
function sourceFile(resources,candidate){
  if(typeof candidate!=='string'||!candidate||candidate.length>500||isAbsolute(candidate))throw new Error('依赖清单必须是本技能中的相对文件路径');
  const repository=resources.repositoryDirectory||resources.directory;
  for(const base of [resources.directory,repository]){let path;try{path=within(repository,resolve(base,candidate));}catch{continue;}if(existsSync(path)&&lstatSync(path).isFile()&&!lstatSync(path).isSymbolicLink())return path;}
  throw new Error('固定技能资源中没有依赖清单：'+candidate);
}
function preparationScript(plan){
  const common=`$ErrorActionPreference = 'Stop'\n$envRoot = ${quote(plan.root)}\n$receipt = ${quote(plan.receipt)}\n$planKey = ${quote(plan.key)}\n$attemptId = ${quote(plan.attemptId)}\n`;
  if(plan.runtime==='python'){
    const probe=pythonCode(pythonProbe(plan.packages,plan.modules,plan.commands));
    return common+`$venv = ${quote(join(plan.root,'venv'))}\n$python = ${quote(plan.python)}\nif (-not (Test-Path -LiteralPath $python -PathType Leaf)) {\n  $base = Get-Command python.exe,python,python3 -CommandType Application -ErrorAction SilentlyContinue | Where-Object { $_.Source -notmatch '[\\\\/]WindowsApps[\\\\/]' } | Select-Object -First 1\n  if ($base) { & $base.Source -m venv $venv } else {\n    $launcher = Get-Command py.exe,py -CommandType Application -ErrorAction SilentlyContinue | Where-Object { $_.Source -notmatch '[\\\\/]WindowsApps[\\\\/]' } | Select-Object -First 1\n    if (-not $launcher) { throw 'MISSING_PYTHON: 当前DSH环境没有可用Python解释器；使用原生工具按授权准备解释器后再继续。' }\n    & $launcher.Source -3 -m venv $venv\n  }\n  if ($LASTEXITCODE -ne 0) { throw 'Python隔离环境创建失败' }\n}\n$env:PATH = ${quote(dirname(plan.python))} + [IO.Path]::PathSeparator + $env:PATH\n$env:VIRTUAL_ENV = $venv\n$probeText = & $python -c ${quote(probe)}\nif ($LASTEXITCODE -ne 0) { throw 'Python依赖检查失败' }\n$before = ($probeText | Select-Object -Last 1) | ConvertFrom-Json\n$missing = @($before.missingPackages)\nif ($missing.Count -gt 0 -and ${plan.requirements?'$false':'$true'}) {\n  & $python -m pip install --disable-pip-version-check @missing\n  if ($LASTEXITCODE -ne 0) { throw 'Python依赖安装失败，环境未标记为就绪' }\n}\n${plan.requirements?`$requirements = ${quote(plan.requirements)}\n$requirementsHash = (Get-FileHash -LiteralPath $requirements -Algorithm SHA256).Hash\n$previous = if (Test-Path -LiteralPath $receipt) { Get-Content -LiteralPath $receipt -Raw | ConvertFrom-Json } else { $null }\nif (-not $previous -or $previous.requirementsHash -ne $requirementsHash -or -not $previous.ready -or $missing.Count -gt 0) {\n  $requestedPackages = @(${plan.packages.map(quote).join(',')})\n  & $python -m pip install --disable-pip-version-check -r $requirements @requestedPackages\n  if ($LASTEXITCODE -ne 0) { throw 'requirements依赖安装失败' }\n}\n`:'$requirementsHash = $null\n'}$afterText = & $python -c ${quote(pythonCode(pythonProbe(plan.packages,plan.modules,plan.commands,false)))}\nif ($LASTEXITCODE -ne 0) { throw '安装后的依赖检查失败' }\n$after = ($afterText | Select-Object -Last 1) | ConvertFrom-Json\n& $python -m pip check\nif ($LASTEXITCODE -ne 0) { throw '隔离环境依赖存在冲突，未标记就绪' }\n$missingModules = @($after.modules.PSObject.Properties | Where-Object { -not $_.Value.available } | ForEach-Object Name)\n$missingCommands = @($after.commands.PSObject.Properties | Where-Object { -not $_.Value } | ForEach-Object Name)\n$ready = @($after.missingPackages).Count -eq 0 -and $missingModules.Count -eq 0 -and $missingCommands.Count -eq 0\n$outcome = @{ planKey=$planKey; attemptId=$attemptId; runtime='python'; ready=$ready; python=$python; baseDir=${quote(plan.baseDir)}; versions=$after.versions; missingPackages=@($after.missingPackages); missingModules=$missingModules; missingCommands=$missingCommands; commands=$after.commands; requirementsHash=$requirementsHash; checkedAt=[DateTime]::UtcNow.ToString('o') }\n$outcome | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $receipt -Encoding utf8\n'METIS_ENVIRONMENT=' + ($outcome | ConvertTo-Json -Depth 10 -Compress)\n`;
  }
  return common+`$node = Get-Command node.exe,node -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1\n$npm = Get-Command npm.cmd,npm -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1\nif (-not $node -or -not $npm) { throw 'MISSING_NODE: 当前DSH环境缺少Node.js/npm；先通过原生工具准备运行时。' }\n$project = ${quote(plan.project)}\n$packages = @(${plan.packages.map(quote).join(',')})\n$packageNames = @(${plan.packages.map(spec=>quote(spec.startsWith('@')?spec.replace(/@[^/@]+$/,''):spec.split('@')[0])).join(',')})\n$prior = if (Test-Path -LiteralPath $receipt) { Get-Content -LiteralPath $receipt -Raw | ConvertFrom-Json } else { $null }\n$absent = @($packageNames | Where-Object { -not (Test-Path -LiteralPath (Join-Path (Join-Path $project 'node_modules') (Join-Path $_ 'package.json'))) })\n$needsInstall = -not $prior -or -not $prior.ready -or $prior.planKey -ne $planKey -or $absent.Count -gt 0 -or -not (Test-Path -LiteralPath (Join-Path $project 'node_modules'))\nif ($packages.Count -gt 0 -and $needsInstall) {\n  & $npm.Source install --prefix $project --no-save --package-lock=false --no-audit --no-fund @packages\n  if ($LASTEXITCODE -ne 0) { throw 'npm依赖安装失败' }\n} elseif ($packages.Count -eq 0 -and $needsInstall -and (Test-Path -LiteralPath (Join-Path $project 'package.json'))) {\n  if (Test-Path -LiteralPath (Join-Path $project 'package-lock.json')) { & $npm.Source ci --prefix $project --no-audit --no-fund } else { & $npm.Source install --prefix $project --package-lock=false --no-audit --no-fund }\n  if ($LASTEXITCODE -ne 0) { throw 'npm项目依赖安装失败' }\n}\n$env:PATH = (Join-Path $project 'node_modules/.bin') + [IO.Path]::PathSeparator + $env:PATH\n$requested = @(${plan.commands.map(quote).join(',')})\n$commands = @{}\nforeach ($name in $requested) { $found = Get-Command $name -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1; $commands[$name] = if ($found) { $found.Source } else { $null } }\n$missing = @($commands.Keys | Where-Object { -not $commands[$_] })\n$packageNames = @(${plan.packages.map(spec=>quote(spec.startsWith('@')?spec.replace(/@[^/@]+$/,''):spec.split('@')[0])).join(',')})\n$missingPackages = @($packageNames | Where-Object { -not (Test-Path -LiteralPath (Join-Path (Join-Path $project 'node_modules') (Join-Path $_ 'package.json'))) })\n$outcome = @{ planKey=$planKey; attemptId=$attemptId; runtime='node'; ready=($missing.Count -eq 0 -and $missingPackages.Count -eq 0); node=$node.Source; project=$project; baseDir=${quote(plan.baseDir)}; commands=$commands; missingCommands=$missing; missingPackages=$missingPackages; checkedAt=[DateTime]::UtcNow.ToString('o') }\n$outcome | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $receipt -Encoding utf8\n'METIS_ENVIRONMENT=' + ($outcome | ConvertTo-Json -Depth 10 -Compress)\n`;
}
function inspectPreparation(plan,call){
  if(call.status!=='succeeded')return null;
  if(!existsSync(plan.receipt))return null;
  const receipt=JSON.parse(readFileSync(plan.receipt,'utf8').replace(/^\uFEFF/,''));
  if(receipt.planKey!==plan.key||receipt.attemptId!==plan.attemptId||typeof receipt.ready!=='boolean')return null;return receipt;
}
export async function provisionSkillEnvironment(ctx,exec,skill,resources,requirements,options={},scopeKey=''){
  const recipes=requirements.installRecipes||[],single=recipes.length===1?recipes[0]:null;
  const runtime=options.runtime&&options.runtime!=='auto'?options.runtime:single?.runtime||((requirements.scriptFiles.some(path=>/\.py$/i.test(path))||requirements.environmentFiles.some(path=>/requirements.*\.txt$/i.test(path))||requirements.declaredCommands.some(name=>/^(python3?|pip3?|uvx?)$/.test(name)))?'python':requirements.environmentFiles.some(path=>/(^|\/)package\.json$/.test(path))?'node':'none');
  if(!['none','python','node'].includes(runtime))throw new Error('自动环境准备支持python/node；其他依赖通过call派发DSH原生工具准备');
  const packages=options.packages||single?.runtime===runtime&&single.packages||[],commands=options.commands||(single?requirements.declaredCommands.filter(name=>!['python','python3','pip','pip3','uv','uvx','node','npm','npx'].includes(name)):[]),modules=options.pythonModules||[];
  if(!Array.isArray(packages)||packages.length>24||packages.some(value=>typeof value!=='string'||!(runtime==='node'?/^(?:@[a-z0-9_.-]+\/)?[a-z0-9][a-z0-9_.-]*(?:@[a-z0-9_.+-]+)?$/i:/^[a-z0-9][a-z0-9_.-]*(?:\[[a-z0-9_,.-]+\])?(?:==[a-z0-9_.+-]+)?$/i).test(value)))throw new Error('依赖包名称或固定版本无效；不接受任意URL、shell片段或安装选项');
  if(!Array.isArray(commands)||commands.length>24||commands.some(value=>typeof value!=='string'||!/^[a-z0-9][a-z0-9_.-]{0,100}$/i.test(value))||!Array.isArray(modules)||modules.length>24||modules.some(value=>typeof value!=='string'||!/^[a-z_]\w*(?:\.[a-z_]\w*)*$/i.test(value)))throw new Error('依赖命令或Python模块名称无效');
  if(runtime==='none'){if(packages.length||modules.length||commands.length||options.requirementsFile)throw new Error('检查或安装依赖需要指定实际python/node运行时，不能用none跳过依赖要求');return {resources,environment:{status:'not-requested',baseDir:resources.directory,dependencyInstallation:'not-requested',nativeToolsStillRequired:requirements.declaredTools},readyForNativeRun:true};}
  if(!nativeToolSchemas(ctx,exec.agent).some(schema=>schema.name==='pwsh'))return {resources,environment:{status:'needs-native-preparation',runtime,reason:'自动隔离环境准备需要当前DSH的pwsh；请通过call使用实际可见终端准备所需运行时。'},readyForNativeRun:false};
  const requirementSource=options.requirementsFile?sourceFile(resources,options.requirementsFile):requirements.environmentFiles.filter(path=>/(?:^|\/)requirements\.txt$/i.test(path)).map(path=>sourceFile(resources,path))[0];
  const key=hash(JSON.stringify({scope:scopeKey,skillId:skill.id,packageHash:skill.packageHash||null,bodyHash:hash(skill.content),runtime,packages,commands,modules,requirements:requirementSource?hash(readFileSync(requirementSource)):null}));
  const root=ownedDirectory(join(configurationHome(),'metis-skill-environments',key)),project=within(root,join(root,'project')),source=resources.repositoryDirectory||resources.directory;
  const plan={key,root,runtime,packages,commands,modules,project,baseDir:within(project,join(project,relative(source,resources.directory))),attemptId:randomUUID(),receipt:join(root,'environment.json'),python:join(root,'venv',process.platform==='win32'?'Scripts':'bin',process.platform==='win32'?'python.exe':'python')};
  if(runtime==='node'){const manifest=requirements.environmentFiles.find(path=>/(?:^|\/)package\.json$/.test(path));if(manifest)plan.project=dirname(within(project,join(project,relative(source,sourceFile(resources,manifest)))));}
  if(preparations.has(key)){
    const pending=preparations.get(key);if(pending.owner!==exec.agent.id)return {resources,environment:{status:'preparing',runtime,owner:pending.owner},readyForNativeRun:false};
    if(!pending.jobId)return {resources,environment:{status:'preparing',runtime},readyForNativeRun:false};
    const call=await dispatchNativeSkillTool(ctx,exec,'job_output',{job_id:pending.jobId,wait:false}),status=call.result.value?.job?.status;
    if(['running','stopping'].includes(status))return {resources,environment:{status:'preparing',runtime,jobId:pending.jobId},nativeCall:boundedNativeResult(call),readyForNativeRun:false};
    preparations.delete(key);const completedPlan=pending.plan,receipt=status==='completed'?inspectPreparation(completedPlan,call):null;
    return {resources,environment:{...receipt,status:receipt?.ready?'ready':'failed',runtime,baseDir:completedPlan.baseDir,root,binPaths:runtime==='python'?[dirname(completedPlan.python)]:[join(completedPlan.project,'node_modules','.bin')]},nativeCall:boundedNativeResult(call),readyForNativeRun:receipt?.ready===true};
  }
  preparations.set(key,{owner:exec.agent.id,plan});
  try{
    mirrorSource(source,project);
    if(requirementSource)plan.requirements=within(project,join(project,relative(source,requirementSource)));
    const arguments_={description:'按需准备子技能 '+requirements.originalName+' 的隔离 '+runtime+' 依赖',command:preparationScript(plan),workdir:plan.project,timeoutMs:120000};
    if(options.nativeSandboxPermissions){const schema=nativeSchema(ctx,exec.agent,'pwsh');if(!schema.parameters?.properties?.sandbox_permissions?.enum?.includes(options.nativeSandboxPermissions))throw new Error('当前DSH pwsh未声明该沙箱权限选项');if(!options.justification?.trim())throw new Error('原生沙箱权限申请需要实际理由');arguments_.sandbox_permissions=options.nativeSandboxPermissions;arguments_.justification=options.justification;}
    const call=await dispatchNativeSkillTool(ctx,exec,'pwsh',arguments_);
    if(call.status==='pending'){const jobId=call.result.value?.jobId;preparations.set(key,{owner:exec.agent.id,jobId,plan});return {resources,environment:{status:'preparing',runtime,jobId},nativeCall:boundedNativeResult(call),readyForNativeRun:false};}
    preparations.delete(key);const receipt=inspectPreparation(plan,call);
    return {resources,environment:{...receipt,status:receipt?.ready?'ready':'failed',runtime,baseDir:plan.baseDir,root,binPaths:runtime==='python'?[dirname(plan.python)]:[join(plan.project,'node_modules','.bin')]},nativeCall:boundedNativeResult(call),readyForNativeRun:receipt?.ready===true};
  }catch(error){preparations.delete(key);throw error;}
}
function runToolSchema(ctx,agent){const schemas=nativeToolSchemas(ctx,agent),schema=process.platform==='win32'?schemas.find(tool=>tool.name==='pwsh')||schemas.find(tool=>tool.name==='bash'):schemas.find(tool=>tool.name==='bash')||schemas.find(tool=>tool.name==='pwsh');if(!schema)throw new Error('当前DSH没有可见原生终端');return schema;}
export function nativeRunGuide(ctx,agent){let shell;try{shell=runToolSchema(ctx,agent).name;}catch{return {shell:null,commandStyle:'当前Agent没有可见原生终端，资源仍可供已连接的非终端工具使用；run需要实际可见的终端。'};}return {shell,commandStyle:shell==='pwsh'?'command是PowerShell代码。run会注入准备环境的PATH；运行Python脚本推荐 python "脚本路径"。直接调用带引号的绝对exe路径必须用 & "exe路径" 参数，不使用Bash的引号命令写法。需要精确返回外部程序退出码时用独立run调用，并在命令末尾显式写 ; exit $LASTEXITCODE，不用后续成功命令掩盖失败。':'command按当前bash语法编写；run会注入准备环境的PATH。',failureRecovery:'脚本或语法失败时修正命令后直接run重试；仅实际缺依赖时再prepare补齐，不重复安装无关依赖。'};}
export async function runPreparedSkill(ctx,exec,environment,command,workdir){
  if(typeof command!=='string'||!command.trim()||command.length>100000)throw new Error('需要实际要运行的命令');
  const schema=runToolSchema(ctx,exec.agent);
  const bins=environment?.binPaths||[];if(process.platform==='win32'&&bins.length&&schema.name!=='pwsh')throw new Error('当前Windows隔离环境需要DSH实际的pwsh工具，未切换到路径规则不同的终端');
  let prefix=schema.name==='pwsh'?(bins.length?'$env:PATH = '+quote(bins.join(delimiter))+' + '+quote(delimiter)+' + $env:PATH\n':''):(bins.length?'export PATH='+"'"+bins.join(':').replaceAll("'","'\\''")+"':\"$PATH\"\n":'');
  if(environment?.runtime==='python'&&environment.python){const venv=dirname(dirname(environment.python));prefix+=schema.name==='pwsh'?'$env:VIRTUAL_ENV = '+quote(venv)+"\n$env:PYTHONNOUSERSITE = '1'\n":'export VIRTUAL_ENV='+"'"+venv.replaceAll("'","'\\''")+"'\nexport PYTHONNOUSERSITE=1\n";}
  return dispatchNativeSkillTool(ctx,exec,schema.name,{description:'执行当前步骤已加载技能的真实命令',command:prefix+command,...(workdir?{workdir}:{}),timeoutMs:120000});
}

import {existsSync,readFileSync,writeFileSync,mkdirSync,renameSync,unlinkSync,openSync,closeSync,statSync,realpathSync,lstatSync} from 'node:fs';
import {resolve,join,dirname,relative,isAbsolute,sep,extname,posix} from 'node:path';
import {homedir} from 'node:os';
import {randomUUID,createHash} from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';

const here=dirname(fileURLToPath(import.meta.url));
export const sharedRoot=resolve(process.env.METIS_SHARED_ROOT||[join(here,'../shared/dsh-plugin/metis-preset'),join(here,'../../dsh-plugin/metis-preset')].find(existsSync));
export const dataHome=resolve(process.env.METIS_DATA_HOME||(existsSync(join(homedir(),'.dsh'))?join(homedir(),'.dsh'):join(homedir(),'.metis')));
// Only this child process is changed. Host settings and credentials are never edited.
process.env.DSH_HOME=dataHome;
const shared=async name=>import(pathToFileURL(join(sharedRoot,name+'.js')));
const cfg=await shared('configuration'),edits=await shared('workspace-edits'),profiles=await shared('profiles'),merge=await shared('draft-merge'),lib=await shared('skill-library'),packages=await shared('skill-packages'),{modes:builtins}=await shared('modes');
export const hash=value=>createHash('sha256').update(typeof value==='string'||Buffer.isBuffer(value)?value:JSON.stringify(value)).digest('hex');
const copy=cfg.clone,now=()=>new Date().toISOString();
export function fail(message,status=400){return Object.assign(new Error(message),{status});}
function atomic(path,value){mkdirSync(dirname(path),{recursive:true});const tmp=path+'.tmp-'+randomUUID();try{writeFileSync(tmp,JSON.stringify(value,null,2)+'\n',{flag:'wx',mode:0o600});renameSync(tmp,path);}finally{if(existsSync(tmp))unlinkSync(tmp);}}
function diskConfiguration(){
  if(existsSync(cfg.configurationPath()))return edits.normalizeConfiguration(cfg.readConfiguration());
  const value=cfg.emptyConfiguration();value.deletedModes=builtins.map(item=>item.id);return edits.normalizeConfiguration(value);
}
function safeId(value){if(typeof value!=='string'||!/^[a-z0-9][a-z0-9-]{0,99}$/i.test(value))throw fail('标识无效');return value;}
function finite(value,min,max,fallback){return Number.isInteger(value)?Math.max(min,Math.min(max,value)):fallback;}
export class MetisCore{
  constructor({root=join(dataHome,'metis-portable')}={}){this.root=resolve(root);this.session=process.env.METIS_HOST||'generic';this.serial=Promise.resolve();this.readTokens=new Map();mkdirSync(this.root,{recursive:true});}
  exclusive(fn){const operation=this.serial.then(()=>this.locked(fn));this.serial=operation.catch(()=>{});return operation;}
  async locked(fn){
    const file=join(this.root,'transaction.lock');let fd;
    for(let attempt=0;attempt<80;attempt++){
      try{fd=openSync(file,'wx',0o600);writeFileSync(fd,JSON.stringify({pid:process.pid}));break;}catch(error){
        if(error.code!=='EEXIST')throw error;let owner;try{owner=JSON.parse(readFileSync(file,'utf8'));}catch{}
        if(owner?.pid){try{process.kill(owner.pid,0);}catch(check){if(check.code==='ESRCH'){unlinkSync(file);continue;}}}
        await new Promise(done=>setTimeout(done,25));
      }
    }
    if(fd===undefined)throw fail('另一个 METIS 窗口正在保存，请重试',409);
    try{return await fn();}finally{closeSync(fd);unlinkSync(file);}
  }
  file(kind,id){return join(this.root,kind,safeId(id)+'.json');}
  read(kind,id){const file=this.file(kind,id);if(!existsSync(file))throw fail('记录不存在：'+id,404);return JSON.parse(readFileSync(file,'utf8'));}
  put(kind,record){atomic(this.file(kind,record.id),record);return record;}
  list(kind){const directory=join(this.root,kind);if(!existsSync(directory))return [];return readDirectory(directory).filter(name=>/^[a-z0-9-]+\.json$/i.test(name)).map(name=>this.read(kind,name.slice(0,-5)));}
  draft(id='shared'){
    safeId(id);const file=this.file('drafts',id);if(existsSync(file))return this.read('drafts',id);
    const configuration=diskConfiguration();return this.put('drafts',{id,revision:0,configuration,base:copy(configuration),manualPaths:[],updatedAt:now()});
  }
  snapshot(id='shared'){
    const draft=this.draft(id),view=edits.workspaceSnapshot(draft.configuration);
    // Do not ship a second large default workflow through the host context.
    delete view.defaults;
    return {...view,draftId:id,draftRevision:draft.revision,draftHash:hash(draft.configuration),dirty:hash(draft.base)!==hash(draft.configuration),savedRevision:diskConfiguration().revision,projects:this.listProjects(),host:this.session};
  }
  configRead({draftId='shared',kind='overview',modeId,stepId,query='',offset=0,limit=12,source}={}){
    const d=this.draft(draftId),document=d.configuration;
    const token=randomUUID();this.readTokens.set(token,{draftId,revision:d.revision,configuration:copy(document),at:Date.now()});
    if(this.readTokens.size>200)this.readTokens.delete(this.readTokens.keys().next().value);
    let value;
    if(kind==='overview')value={modes:cfg.configurationModes(document),revision:d.revision,library:lib.libraryInfo(),operations:operationGuide};
    else if(kind==='mode'){const mode=cfg.configurationModes(document).find(item=>item.id===modeId);if(!mode)throw fail('模式不存在',404);value={mode,profile:document.profiles[modeId].profile};}
    else if(kind==='step'){const step=document.profiles[modeId]?.profile.steps.find(item=>item.id===stepId);if(!step)throw fail('步骤不存在',404);value=step;}
    else if(kind==='skills')value=lib.searchSkillMetadata(cfg.configurationSkills(document),{query,source,offset,limit:Math.min(30,limit),invocableOnly:true});
    else throw fail('读取类型无效');
    return {draftId,revision:d.revision,readToken:token,value};
  }
  async configEdit({draftId='shared',readToken,expectedRevision,configuration,operations,actor='ai',selectedModeId=null}={}){
    return this.exclusive(async()=>{
      const current=this.draft(draftId);let before=current.configuration,base,readRevision=current.revision;
      if(actor==='manual'){
        if(expectedRevision!==current.revision)throw fail('草稿已更新，请读取最新内容后再改；手动内容尚未覆盖',409);
        base=before;
      }else{
        const read=this.readTokens.get(readToken);if(!read||read.draftId!==draftId||Date.now()-read.at>60*60*1000)throw fail('请先读取当前配置，再提交精确修改',409);base=read.configuration;
        readRevision=read.revision;if(configuration)throw fail('AI 只能提交精确 operations，不能替换整个草稿');
      }
      let remote;
      if(configuration&&actor==='manual')remote=edits.normalizeConfiguration(configuration);
      else{
        const prepared=copy(base);
        for(const op of operations||[]){
          if(op.type==='create_mode'&&!op.copyFromId&&!op.profile)op.profile=edits.blankProfile();
          const ids=op.type==='bind_skill'?[op.skillId]:op.step?.skills||op.patch?.skills||[];
          for(const id of ids)if(lib.libraryMetadata(id)&&!prepared.skills[id])prepared.skills[id]=await this.pinLibrary(id);
        }
        const authorization=(operations||[]).flatMap(op=>[op.source?.repository,op.source?.path]).filter(Boolean).join('\n');
        remote=(await edits.applyWorkspaceEdits(prepared,selectedModeId,operations,{authorization})).configuration;
      }
      const protectedPaths=(current.manualPaths||[]).filter(path=>(current.manualTouched?.[path]??current.revision)>readRevision);
      const merged=actor==='manual'?{configuration:remote,conflicts:[]}:merge.mergeDraft(base,before,remote,{protectedPaths});
      const valid=edits.normalizeConfiguration(merged.configuration);
      const changed=merge.draftChanges(before,valid);
      const paths=actor==='manual'?[...new Set([...current.manualPaths,...changed])]:current.manualPaths;
      const manualTouched=actor==='manual'?{...current.manualTouched,...Object.fromEntries(changed.map(path=>[path,current.revision+1]))}:current.manualTouched||{};
      const saved=this.put('drafts',{...current,configuration:valid,manualPaths:paths,manualTouched,revision:current.revision+1,updatedAt:now()});
      return {draftId,revision:saved.revision,conflicts:merged.conflicts,changes:changed,saved:false,message:merged.conflicts.length?'手动修改已保留；请按冲突路径协调':'草稿已实时更新，尚未保存并生效'};
    });
  }
  async save({draftId='shared',expectedRevision}={}){
    return this.exclusive(async()=>{
      const d=this.draft(draftId);if(d.revision!==expectedRevision)throw fail('草稿已变化，请确认最新草稿再保存',409);
      const disk=diskConfiguration();if(disk.revision!==d.base.revision)throw fail('另一个宿主已保存新配置，当前草稿已保留，请协调后保存',409);
      const value=copy(d.configuration);for(const [id,record] of Object.entries(value.profiles)){const previous=disk.profiles[id];if(hash(previous?.profile||null)!==hash(record.profile)){record.revision=(previous?.revision||0)+1;record.updatedAt=now();}}
      const saved=cfg.writeConfiguration(value,d.base.revision);this.put('drafts',{...d,configuration:saved,base:copy(saved),manualPaths:[],manualTouched:{},revision:d.revision+1,updatedAt:now()});
      return {saved:true,configurationRevision:saved.revision,draftRevision:d.revision+1,message:'已保存并生效；正在执行及旧会话仍使用自己的配置快照'};
    });
  }
  async reloadDraft({draftId='shared',discard=false}={}){
    return this.exclusive(()=>{const d=this.draft(draftId);if(hash(d.base)!==hash(d.configuration)&&!discard)throw fail('有未保存改动，未丢弃草稿',409);const configuration=diskConfiguration();return this.put('drafts',{...d,configuration,base:copy(configuration),manualPaths:[],revision:d.revision+1,updatedAt:now()});});
  }
  libraryRecord(id){const metadata=lib.libraryMetadata(id);if(!metadata)throw fail('技能库条目不存在',404);const file=join(sharedRoot,'library','records',metadata.source.bundle+'.json'),bytes=readFileSync(file);if(hash(bytes)!==metadata.source.bundle)throw fail('技能资源清单摘要不符',409);return {metadata,record:JSON.parse(bytes)};}
  async libraryBytes(id,path,pinned=null){
    const {metadata,record}=pinned||this.libraryRecord(id),entry=record.files.find(file=>file.path===(path||record.bodyPath))||record.files.find(file=>file.path===posix.normalize(posix.join(posix.dirname(record.entryPath),path||record.bodyPath)));if(!entry)throw fail('资源不在固定版本清单中',404);
    if(entry.size>32*1024*1024)throw fail('资源超过 32MiB，需单独准备',413);
    const cache=join(this.root,'skill-cache',entry.gitSha);let bytes;
    if(existsSync(cache))bytes=readFileSync(cache);else{
      const url='https://raw.githubusercontent.com/'+record.repository+'/'+record.commit+'/'+entry.path.split('/').map(encodeURIComponent).join('/');
      const response=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(45000)});if(!response.ok)throw fail('固定版本技能读取失败：HTTP '+response.status,502);
      const chunks=[];let size=0;for await(const chunk of response.body){size+=chunk.length;if(size>entry.size)throw fail('资源大小超出清单',409);chunks.push(chunk);}bytes=Buffer.concat(chunks);
      verifyGit(bytes,entry);mkdirSync(dirname(cache),{recursive:true});writeFileSync(cache,bytes,{mode:0o600});
    }
    verifyGit(bytes,entry);return {metadata,record,entry,bytes};
  }
  async skillRead({id,path,offset=0,maxChars=4000,fileOffset=0,draftId='shared'}={}){
    if(lib.libraryMetadata(id)&&!this.draft(draftId).configuration.skills[id]){
      const {metadata,record,entry,bytes}=await this.libraryBytes(id,path),raw=path?bytes:bytes.subarray(record.bodyOffset||0),text=raw.toString('utf8');
      if(!path&&hash(raw)!==metadata.bodyHash)throw fail('技能正文摘要不符',409);
      const start=finite(fileOffset,0,record.files.length,0);return {...metadata,path:entry.path,...(raw.includes(0)?{binary:true,size:raw.length,sha256:hash(raw)}:lib.textPage(text,{offset,maxChars:Math.min(6000,maxChars)})),files:record.files.slice(start,start+30).map(({path,size})=>({path,size})),fileTotal:record.files.length,nextFileOffset:start+30<record.files.length?start+30:null,disclosure:'current-selected-skill-only'};
    }
    return edits.readConfigurationItem({kind:'skill',id,path,offset,maxChars:Math.min(6000,maxChars)},this.draft(draftId).configuration);
  }
  async pinLibrary(id){
    const {metadata,record,bytes}=await this.libraryBytes(id),body=bytes.subarray(record.bodyOffset||0);
    if(hash(body)!==metadata.bodyHash)throw fail('技能正文摘要不符',409);
    const skill=packages.createSkill({id,description:metadata.description,whenToUse:metadata.whenToUse||'',content:body.toString('utf8'),invocation:metadata.invocation,files:[{path:'.metis-portable/source.json',text:JSON.stringify({metadata,record})}]});
    return {...skill,source:{kind:'metis-library',...metadata.source,license:metadata.license,verification:'not-run-in-METIS',portablePinned:true}};
  }
  async prepareSkill({id,projectId,paths=[]}={}){
    if(!projectId)throw fail('准备技能需要明确研究项目');const project=this.project(projectId);
    if(!project.snapshot.profile.steps.some(step=>step.skills.includes(id)))throw fail('技能未绑定到此项目');
    const stored=project.snapshot.skills.find(skill=>skill.id===id);if(!stored)throw fail('项目技能快照缺失',409);const document=cfg.hydrateSkill(stored),manifest=join(document.root,'.metis-portable/source.json');
    if(existsSync(manifest)){
      const pinned=JSON.parse(readFileSync(manifest,'utf8')),{record}=pinned,requested=[...new Set([record.entryPath,...paths])];if(requested.length>100)throw fail('一次最多准备100个具体资源');
      const directory=join(this.root,'skill-resources',id,record.commit);mkdirSync(directory,{recursive:true});
      for(const path of requested){const {bytes,entry}=await this.libraryBytes(id,path,pinned);const target=inside(directory,entry.path,{existing:false});mkdirSync(dirname(target),{recursive:true});writeFileSync(target,bytes,{mode:0o600});}
      const remaining=record.files.filter(file=>!requested.includes(file.path));return {directory,entryFile:inside(directory,record.entryPath),preparedFiles:requested,remainingFiles:remaining.slice(0,30).map(({path,size})=>({path,size})),remainingTotal:remaining.length,dependencies:'not-checked',instructions:'按技能说明使用宿主原生命令工具检查及准备缺失依赖；本工具只下载固定版本资源，未执行上游代码。'};
    }
    return lib.preparePinnedResources(document);
  }
  listProjects(){return this.list('projects').map(({snapshot,activity,chat,...project})=>({...project,activityCount:activity?.length||0})).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));}
  project(id){return this.read('projects',id);}
  async createProject({name,folder,modeId,autonomous=false}={}){
    return this.exclusive(async()=>{
      if(typeof name!=='string'||!name.trim()||name.length>120)throw fail('请填写项目名称');if(!folder||!isAbsolute(folder)||!existsSync(folder)||!statSync(folder).isDirectory())throw fail('请选择实际存在的项目文件夹');
      const configuration=diskConfiguration(),mode=cfg.configurationModes(configuration).find(mode=>mode.id===modeId);if(!mode)throw fail('请先保存模式，再创建项目');
      const profile=profiles.validateProfile(configuration.profiles[modeId].profile,{configuration}),snapshotSkills=[];
      for(const id of profile.skills){let skill;if(lib.libraryMetadata(id)&&!configuration.skills[id])skill=await this.pinLibrary(id);else skill=cfg.skillDocument(id,configuration);snapshotSkills.push(cfg.snapshotSkill(skill));}
      const id=randomUUID(),snapshot={mode:copy(mode),profile:copy(profile),skills:snapshotSkills,configurationRevision:configuration.revision,createdAt:now()};
      const project={id,name:name.trim(),folder:realpathSync(folder),modeId,modeName:mode.name,status:'ready',snapshot,snapshotHash:hash(snapshot),currentStepId:profile.steps[0].id,viewedStepId:profile.steps[0].id,autonomous,revision:null,steps:profile.steps.map(step=>this.projectStep(step)),activity:[],chat:[],createdAt:now(),updatedAt:now()};
      return this.put('projects',project);
    });
  }
  projectStep(step){return {id:step.id,title:step.title,purpose:step.instruction,expected:step.deliverables||'',executionBrief:profiles.stepPromptText(step),prohibitions:step.prohibitions||'',loop:step.loop?.enabled===true,loopCriteria:step.loop?.criteria||'',skillBindings:step.skills.map(id=>({id,name:id})),status:'not_started',feedback:[],delivery:null,history:[]};}
  async deleteProject({projectId}={}){return this.exclusive(()=>{const p=this.project(projectId);if(p.execution?.running)throw fail('项目正在执行，请先停止研究',409);unlinkSync(this.file('projects',projectId));return {deleted:true,projectId,folderKept:true,filesDeleted:false};});}
  async viewStep({projectId,stepId}={}){return this.exclusive(()=>{const p=this.project(projectId);this.step(p,stepId);return this.put('projects',{...p,viewedStepId:stepId,updatedAt:now()});});}
  step(project,id){const step=project.steps.find(step=>step.id===id);if(!step)throw fail('步骤不属于该项目',404);return step;}
  async openStep({projectId,stepId}={}){
    return this.exclusive(async()=>{
      const p=this.project(projectId);if(p.revision?.phase==='awaiting_downstream')throw fail('返修后请先选择后续步骤处理范围',409);
      const id=stepId||p.currentStepId,at=p.steps.findIndex(item=>item.id===id);if(at<0)throw fail('步骤不存在',404);
      if(p.steps.slice(0,at).some(step=>step.status!=='submitted'))throw fail('前序步骤尚未交付，请继续当前步骤',409);
      const step=this.step(p,id);if(step.status==='submitted')return {alreadySubmitted:true,nextStepId:p.currentStepId,completed:p.steps.every(step=>step.status==='submitted')};
      p.currentStepId=id;step.status='working';p.updatedAt=now();this.put('projects',p);
      const definition=p.snapshot.profile.steps.find(step=>step.id===id),skillIndex=p.snapshot.skills.filter(skill=>definition.skills.includes(skill.id)).map(skill=>({id:skill.id,...(skill.packageHash?{packageHash:skill.packageHash}:{description:skill.description})}));
      return {projectId,stepId:id,title:step.title,goal:step.purpose,deliverables:step.expected,prompt:step.executionBrief,prohibitions:step.prohibitions,loop:{enabled:step.loop,criteria:step.loopCriteria},skills:skillIndex,previousDeliveries:p.steps.slice(0,at).map(({id,title,delivery})=>({id,title,artifacts:delivery?.artifacts})),controller:p.snapshot.profile.systemPrompt,finalOutput:at===p.steps.length-1?profiles.profileOutput(p.snapshot.profile):null,instructions:'只加载本步骤绑定的具体技能。用 metis_project_skill_read 读取项目冻结版本；产物写入项目文件夹，完成后调用 metis_step_submit。'};
    });
  }
  async projectSkillRead({projectId,stepId,id,path,offset=0,maxChars=4000}={}){
    const p=this.project(projectId),step=p.snapshot.profile.steps.find(step=>step.id===(stepId||p.currentStepId));if(!step?.skills.includes(id))throw fail('该技能没有绑定到当前步骤');
    const frozen=p.snapshot.skills.find(skill=>skill.id===id);if(!frozen)throw fail('项目冻结技能缺失',409);
    const skill=cfg.hydrateSkill(frozen),manifest=join(skill.root,'.metis-portable/source.json');
    if(path&&existsSync(manifest)){const pinned=JSON.parse(readFileSync(manifest,'utf8')),{entry,bytes}=await this.libraryBytes(id,path,pinned);return {id,path:entry.path,source:pinned.metadata.source,...(bytes.includes(0)?{binary:true,size:bytes.length,sha256:hash(bytes)}:lib.textPage(bytes.toString('utf8'),{offset,maxChars:Math.min(maxChars,6000)}))};}
    return lib.readPinnedSkill(skill,{path,offset,maxChars:Math.min(maxChars,6000)});
  }
  async submit({projectId,stepId,artifacts,summary='',review}={}){
    return this.exclusive(()=>{
      const p=this.project(projectId),step=this.step(p,stepId||p.currentStepId);if(step.id!==p.currentStepId)throw fail('只能提交实际执行的当前步骤',409);
      if(!['working','needs_revision','passed'].includes(step.status))throw fail('请先进入当前步骤',409);
      if(!Array.isArray(artifacts)||!artifacts.length||artifacts.length>50)throw fail('需提交1至50个真实文件');
      const files=artifacts.map(file=>artifact(p.folder,typeof file==='string'?file:file.path));const digest=hash(files.map(({path,sha256})=>({path,sha256})));
      if(step.loop){const check=this.readReview(p,step.id,digest);if(!check?.passed)throw fail('本步骤要求达标核验，请先运行独立核验；未通过不会交付',409);}
      if(step.delivery)step.history.push(copy(step.delivery));step.delivery={artifacts:files,summary:String(summary).slice(0,12000),submittedAt:now(),digest};step.status='submitted';
      if(p.revision?.stepId===step.id){p.revision.phase='awaiting_downstream';}
      else{const next=p.steps.find(item=>item.status!=='submitted');p.currentStepId=next?.id||step.id;}
      p.updatedAt=now();this.put('projects',p);
      return {submitted:true,stepId:step.id,nextStepId:p.revision?.phase==='awaiting_downstream'?null:p.steps.find(item=>item.status!=='submitted')?.id||null,completed:p.steps.every(item=>item.status==='submitted'),awaitingDownstream:p.revision?.phase==='awaiting_downstream',autonomous:p.autonomous};
    });
  }
  readReview(p,id,digest){const record=p.reviews?.[id];return record?.digest===digest&&record.goalHash===hash(p.snapshot.profile.steps.find(step=>step.id===id))?record:null;}
  async recordReview({projectId,stepId,artifacts,result,evidence}={}){
    if(evidence?.kind!=='codex-native-independent-review'||!evidence.threadId)throw fail('核验必须来自实际独立原生会话');
    return this.exclusive(()=>{const p=this.project(projectId),step=this.step(p,stepId);const files=artifacts.map(file=>artifact(p.folder,typeof file==='string'?file:file.path)),digest=hash(files.map(({path,sha256})=>({path,sha256})));
      if(digest!==evidence.artifactsDigest)throw fail('核验期间交付物已改变，未沿用旧核验结论',409);
      const entry={digest,goalHash:hash(p.snapshot.profile.steps.find(def=>def.id===step.id)),passed:result.passed===true,feedback:result.feedback,evidence,at:now()};p.reviews={...p.reviews,[step.id]:entry};step.status=entry.passed?'passed':'needs_revision';if(!entry.passed)step.feedback.push({text:String(result.feedback),at:now()});this.put('projects',p);return entry;});
  }
  async revise({projectId,stepId,feedback}={}){return this.exclusive(()=>{
    const p=this.project(projectId);if(p.execution?.running)throw fail('研究正在运行，请先停止后选择返修步骤',409);const step=this.step(p,stepId||p.viewedStepId);
    if(!feedback?.trim())throw fail('请说明需要修改的地方');p.revision=step.delivery?{stepId:step.id,phase:'revising',startedAt:now()}:null;step.status='needs_revision';step.feedback.push({text:feedback,at:now()});p.currentStepId=step.id;this.put('projects',p);return {projectId,stepId:step.id,feedback,downstreamDecision:step.delivery?'修订交付后选择保留或重做后续步骤':null};
  });}
  async downstream({projectId,choice}={}){return this.exclusive(()=>{const p=this.project(projectId);if(p.revision?.phase!=='awaiting_downstream')throw fail('当前没有待处理的后续步骤选择',409);if(!['keep','redo'].includes(choice))throw fail('请选择 keep 或 redo');const at=p.steps.findIndex(s=>s.id===p.revision.stepId);if(choice==='redo')for(const step of p.steps.slice(at+1)){if(step.delivery)step.history.push(step.delivery);step.delivery=null;step.status='not_started';if(p.reviews)delete p.reviews[step.id];}p.revision=null;p.currentStepId=p.steps.find(s=>s.status!=='submitted')?.id||p.steps.at(-1).id;this.put('projects',p);return {choice,nextStepId:p.currentStepId};});}
  async syncMode({projectId,apply=false}={}){return this.exclusive(async()=>{
    const p=this.project(projectId),document=diskConfiguration(),mode=cfg.configurationModes(document).find(m=>m.id===p.modeId);if(!mode)return {available:false,reason:'源模式已删除，项目快照仍可运行'};
    const profile=document.profiles[p.modeId].profile,changed=hash(profile)!==hash(p.snapshot.profile);if(!apply||!changed)return {available:true,changed,projectRevision:p.snapshot.configurationRevision,savedRevision:document.revision,profile:apply?undefined:{steps:profile.steps.map(({id,title})=>({id,title}))}};
    if(p.execution?.running)throw fail('项目执行中，待安全空闲后同步',409);profiles.validateProfile(profile,{configuration:document});
    const skills=[];for(const id of profile.skills)skills.push(cfg.snapshotSkill(lib.libraryMetadata(id)&&!document.skills[id]?await this.pinLibrary(id):cfg.skillDocument(id,document)));
    const old=new Map(p.steps.map(s=>[s.id,s]));p.snapshotHistory=[...(p.snapshotHistory||[]),p.snapshot];p.snapshot={mode,profile,skills,configurationRevision:document.revision,createdAt:now()};p.snapshotHash=hash(p.snapshot);
    p.steps=profile.steps.map(def=>{const value=this.projectStep(def),previous=old.get(def.id);return previous?{...value,status:hash(def)===hash(p.snapshotHistory.at(-1).profile.steps.find(s=>s.id===def.id))?previous.status:previous.delivery?'needs_recheck':previous.status,delivery:previous.delivery,feedback:previous.feedback,history:previous.history}:value;});
    p.currentStepId=p.steps.find(s=>s.status!=='submitted')?.id||p.steps.at(-1).id;p.modeName=mode.name;p.updatedAt=now();this.put('projects',p);return {applied:true,oldSnapshotsPreserved:true,projectId};
  });}
  async activity({projectId,kind='tool',callId=randomUUID(),status='running',label='',target='',output='',stepId}={}){
    return this.exclusive(()=>{
      const p=this.project(projectId),existing=p.activity.find(item=>item.callId===callId);let appended=String(output);
      if(existing){if(status!==null)existing.status=status;if(status!==null&&appended.startsWith(existing.output))appended=appended.slice(existing.output.length);existing.output=(existing.output+appended).slice(-16000);existing.resultPreview=existing.output.slice(-4000);existing.updatedAt=now();}
      else p.activity.push({callId,stepId:stepId||p.currentStepId,kind,status:status||'running',label,tool:label,target,output:appended.slice(-16000),resultPreview:appended.slice(-4000),startedAt:now()});
      p.live||={instanceId:p.id,lastSeq:0,entries:[]};if(appended)p.live.entries.push({seq:++p.live.lastSeq,text:appended,source:kind==='command'?'stdout':'receipt',stepId:existing?.stepId||stepId||p.currentStepId,callId});
      p.live.entries=p.live.entries.slice(-160);const active=p.activity.findLast(call=>call.status==='running');p.live.active=active?{kind:'tool',stepId:active.stepId,callId:active.callId,rootCallId:active.callId}:null;
      if(p.activity.length>3000)p.activity=p.activity.slice(-3000);p.updatedAt=now();this.put('projects',p);return {recorded:true,callId};
    });
  }
}
import {readdirSync as readDirectory} from 'node:fs';
function verifyGit(bytes,file){const git=createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');if(bytes.length!==file.size||git!==file.gitSha)throw fail('固定版本资源校验失败：'+file.path,409);}
export function inside(root,path,{existing=true}={}){
  if(typeof path!=='string'||!path||path.includes('\0'))throw fail('文件路径无效');const base=realpathSync(root),target=resolve(base,path),rel=relative(base,target);if(!rel||rel==='..'||rel.startsWith('..'+sep)||isAbsolute(rel))throw fail('文件必须位于项目文件夹内');
  let cursor=target;while(!existsSync(cursor)){const parent=dirname(cursor);if(parent===cursor)throw fail('文件路径无效');cursor=parent;}const actual=realpathSync(cursor),part=relative(base,actual);if(part==='..'||part.startsWith('..'+sep)||isAbsolute(part))throw fail('文件链接指向项目文件夹以外');if(existing&&!existsSync(target))throw fail('文件不存在：'+path,404);return target;
}
export function artifact(folder,path){const file=inside(folder,path),s=statSync(file);if(!s.isFile()||s.size===0||s.size>128*1024*1024)throw fail('交付物必须是非空文件，且不超过128MiB：'+path);const bytes=readFileSync(file),extension=extname(file).toLowerCase();if(['.docx','.pptx','.xlsx'].includes(extension)&&bytes.subarray(0,2).toString()!=='PK')throw fail('Office交付物没有真实ZIP容器：'+path);if(extension==='.pdf'&&bytes.subarray(0,5).toString()!=='%PDF-')throw fail('PDF文件头无效：'+path);return {path:relative(folder,file),size:s.size,sha256:hash(bytes),availability:'file',name:relative(folder,file)};}
export const operationGuide={create_mode:{type:'create_mode',mode:{id:'metis-your-id',name:'模式名称',description:'说明'},profile:{steps:[],skills:[],parameters:{language:'zh-CN'}}},stepFields:['title','instruction','deliverables','skills','prompt','prohibitions','loop'],operations:['create_mode','update_mode','delete_mode','reorder_modes','add_step','update_step','remove_step','move_step','bind_skill','unbind_skill','set_output','set_controller','create_skill','install_skill','update_skill','delete_skill'],notes:'AI先 config_read 获取readToken；提交精确operations。新模式不自动生成固定十步。手动修改受保护。保存需用户明确要求或点击保存并生效。'};

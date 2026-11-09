/** Durable draft/proposal bridge; DSH alone owns messages and Agent execution. */
import {existsSync,readFileSync,writeFileSync,mkdirSync,renameSync,unlinkSync,lstatSync,openSync,fsyncSync,closeSync} from 'node:fs';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {configurationHome,configurationModes,configurationSkills,readConfiguration,clone,fingerprint,ConfigurationError} from './configuration.js';
import {workspaceSnapshot,configurationChanges} from './workspace-edits.js';
import {composerPresetId,operations} from './composer-operations.js';
import {composerProtocolVersion,composerCapabilityRevision,inspectComposerCapabilities} from './composer-definition.js';
import {librarySkillReviewToken} from './skill-library.js';
import {profileOutput,editableStep} from './profiles.js';
import {mergeDraft,draftChanges,draftEqual,draftProtectionPaths} from './draft-merge.js';
import {ownerUserMessages,ownerUserText} from './user-evidence.js';

function uuid(value){if(typeof value!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(value))throw Object.assign(new ConfigurationError('编排连接标识缺失或无效，请重新连接'),{code:'metis/composer-context-id'});return value;}
function nativeSessionId(value){if(typeof value!=='string'||!/^session-[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(value))throw new ConfigurationError('DSH原生会话ID无效');return value;}
const nativeAuthorization=ownerUserText;
function pendingModeSummaries(record){
  if(!record.proposal)return [];
  const existing=new Set(configurationModes(record.editor.configuration).map(mode=>mode.id));
  return configurationModes(record.proposal.configuration).filter(mode=>!existing.has(mode.id)).map(mode=>({id:mode.id,name:mode.name,steps:(record.proposal.configuration.profiles[mode.id]?.profile.steps||[]).map(({id,title})=>({id,title}))}));
}
function boundLibrarySkills(configuration){return new Set(configurationModes(configuration).flatMap(mode=>configuration.profiles[mode.id]?.profile.steps?.flatMap(step=>step.skills)||[]).filter(id=>id.startsWith('ml-')&&librarySkillReviewToken(id)));}
function requireReadBeforeBinding(record,configuration){
  const previous=boundLibrarySkills(record.savedConfiguration||record.editor.configuration),missing=[...boundLibrarySkills(configuration)].filter(id=>!previous.has(id)&&record.skillReads?.[id]?.sourceToken!==librarySkillReviewToken(id)&&record.manualSkillApprovals?.[id]!==librarySkillReviewToken(id));
  if(missing.length)throw Object.assign(new ConfigurationError('以下子技能尚未读取真实正文，未接受绑定。请逐项用metis_config_read(kind=skill,id=真实ID,offset=0)读取正文及requirements后再提交：'+missing.slice(0,10).join('、')+(missing.length>10?'；另有 '+(missing.length-10)+' 项':''),409),{code:'metis/skill-body-required'});
}
function overview(context,record){
  const step=context.profile.steps.find(item=>item.id===record.editor.activeStepId);
  return {revision:record.revision,mode:context.mode,output:profileOutput(context.profile),controller:context.profile.systemPrompt,
    editorSelection:{modeId:record.editor.modeId,stepId:record.editor.activeStepId},
    steps:context.profile.steps.map(({id,title,instruction,deliverables,stages,skills})=>({id,title,instruction:instruction.slice(0,240),deliverables:deliverables?.slice(0,240)||'',stages,skillsCount:skills.length})),
    activeStep:step?{...editableStep(step),skills:step.skills.slice(0,12),boundSkillCount:step.skills.length,bindingsTruncated:step.skills.length>12}:null,
    selectedResource:record.editor.selectedResource,
    modes:context.modes.map(({id,name})=>({id,name})),
    library:{total:context.library?.total||0,bindable:context.library?.bindable||0,sources:context.library?.sources?.map(({repository,kind,entryCount,bindableCount,directCount,linkedCount})=>({repository,kind,entryCount,bindableCount,directCount,linkedCount})),usage:'仓库/技能包仅作来源；skill-search配合source分页定位真实子技能，skill读取正文和requirements，再把具体子技能ID绑定到步骤。',verification:'not-run-in-METIS'},
    archivedSkills:context.configuration.deletedSkills,
    configurationView:'shared-draft',manualProtectedPaths:record.manualProtectedPaths||[],lastChange:record.lastChange||null,
    proposal:null,
    lastSaved:record.lastApplied?.state==='saved'?record.lastApplied:null,
    operations:Object.keys(operations),persistence:'AI和界面编辑同一份待保存流程；手改字段优先，AI更改自动显示，最后一次保存并生效用于新会话。'};
}
export function createComposerWorkspaces(ctx,getCatalog){
  const scope=fingerprint({home:configurationHome()}).slice(0,16);
  const directory=join(configurationHome(),'metis-composer-workspaces',scope),records=new Map(),sessionOwners=new Map(),locks=new Map();
  let alive=true;
  const catalog=()=>{const value=getCatalog();if(!value?.assistantContext||!value.propose)throw new ConfigurationError('METIS配置服务尚未就绪',503);return value;};
  const controller=()=>{const value=ctx.get('sessionController');if(!value?.resolveAgent)throw new ConfigurationError('DSH原生会话服务尚未就绪',503);return value;};
  async function inspectSession(id){
    const native=controller();if(typeof native.inspect==='function')return native.inspect(id);
    const query=ctx.get('sessionQuery');if(typeof query?.readSession!=='function')throw new ConfigurationError('DSH原生会话读取接口尚未就绪',503);
    const observed=await query.readSession(id);return {meta:observed.session,events:observed.events};
  }
  function load(id){
    uuid(id);if(!alive)throw new ConfigurationError('编排状态服务已卸载',503);
    if(records.has(id))return upgradeShared(records.get(id));
    const path=join(directory,id+'.json');if(!existsSync(path))return null;
    const stat=lstatSync(path);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>64*1024*1024)throw new ConfigurationError('编排状态文件无效',409);
    const record=JSON.parse(readFileSync(path,'utf8'));
    if(record.version!==1||record.id!==id||!Number.isSafeInteger(record.revision)||!record.editor)throw new ConfigurationError('编排状态记录损坏，未改用其他配置',409);
    if(record.sessionId!==null)nativeSessionId(record.sessionId);
    records.set(id,record);if(record.sessionId)sessionOwners.set(record.sessionId,id);return upgradeShared(record);
  }
  function save(record){
    if(!alive)throw new ConfigurationError('编排服务已卸载，未提交此提案',503);
    const text=JSON.stringify(record);if(Buffer.byteLength(text)>64*1024*1024)throw new ConfigurationError('编排草稿或差异过大，请缩小单次编辑');
    mkdirSync(directory,{recursive:true});if(lstatSync(directory).isSymbolicLink())throw new ConfigurationError('编排目录不能是符号链接');
    const path=join(directory,record.id+'.json'),temporary=join(directory,'.'+record.id+'.'+randomUUID()+'.tmp');let descriptor;
    if(existsSync(path)&&lstatSync(path).isSymbolicLink())throw new ConfigurationError('拒绝写入链接形式的编排记录');
    try{descriptor=openSync(temporary,'wx',0o600);writeFileSync(descriptor,text,'utf8');fsyncSync(descriptor);closeSync(descriptor);descriptor=undefined;renameSync(temporary,path);}
    finally{if(descriptor!==undefined)closeSync(descriptor);if(existsSync(temporary))unlinkSync(temporary);}
    records.set(record.id,record);if(record.sessionId)sessionOwners.set(record.sessionId,record.id);
  }
  async function serialized(id,operation){
    uuid(id);const previous=locks.get(id)||Promise.resolve(),result=previous.catch(()=>{}).then(()=>{if(!alive)throw new ConfigurationError('编排服务已卸载',503);return operation();});
    const settled=result.catch(()=>{});locks.set(id,settled);try{return await result;}finally{if(locks.get(id)===settled)locks.delete(id);}
  }
  function canonicalDraft(raw){
    const document=clone(raw),available=new Set(configurationSkills(document).map(skill=>skill.id));
    for(const mode of configurationModes(document)){
      const profile=document.profiles[mode.id]?.profile;if(!profile)continue;
      profile.skills=[...new Set([...(available.has('metis-core')?['metis-core']:[]),...(profile.steps||[]).flatMap(step=>step.skills||[])])];
    }
    return workspaceSnapshot(document).configuration;
  }
  function rememberHash(record){record.draftHashes=[...new Set([...(record.draftHashes||[]),record.editor.hash])].slice(-48);}
  function approveHumanSkills(record,configuration,base=null){record.manualSkillApprovals={...record.manualSkillApprovals};const previous=base?boundLibrarySkills(base):new Set();for(const id of boundLibrarySkills(configuration))if(!previous.has(id))record.manualSkillApprovals[id]=librarySkillReviewToken(id);}
  function realUserCount(record){const agent=record.sessionId?ctx.get('agents')?.get(record.sessionId):null;return agent?ownerUserMessages(agent).length:0;}
  function upgradeShared(record){
    if(record.sharedDraftVersion===1)return record;
    const previous=record.editor.configuration,proposal=record.proposal?.baseHash===record.editor.hash?record.proposal:null;
    const configuration=canonicalDraft(proposal?mergeDraft(previous,previous,proposal.configuration).configuration:previous);
    record.savedConfiguration=workspaceSnapshot(readConfiguration()).configuration;
    record.editor={...record.editor,configuration,hash:fingerprint(configuration),modeId:proposal?.selectedModeId??record.editor.modeId};
    record.sharedDraftVersion=1;record.draftVersion=1;record.manualProtectedPaths=[];record.draftHashes=[fingerprint(previous),fingerprint(record.savedConfiguration)];rememberHash(record);
    // Existing editor content was already supplied by the authenticated owner.
    approveHumanSkills(record,previous);record.proposal=null;record.lastChange=proposal?{source:'ai',at:new Date().toISOString(),message:'已有AI修改已纳入同一待保存流程'}:null;
    record.revision++;save(record);return record;
  }
  function validManualPaths(paths){
    if(paths===undefined)return [];
    if(!Array.isArray(paths)||paths.length>4096||paths.some(path=>typeof path!=='string'||path.length>800||!/^\/(modes|profiles|skills|deletedModes|deletedSkills)(?:\/|$)/.test(path)))throw new ConfigurationError('手动编辑字段标记无效');
    return [...new Set(paths)];
  }
  function chooseEditor(record,body,configuration,preferred){
    const modes=configurationModes(configuration),modeId=modes.some(mode=>mode.id===preferred)?preferred:modes[0]?.id||null,steps=configuration.profiles[modeId]?.profile.steps||[];
    return {configuration,hash:fingerprint(configuration),contextToken:body.contextToken||randomUUID(),modeId,activeStepId:steps.some(step=>step.id===body.activeStepId)?body.activeStepId:steps[0]?.id||null,selectedResource:clone(body.selectedResource||null)};
  }
  function context(record){
    const configuration=record.editor.configuration,modeId=record.editor.modeId;
    return catalog().assistantContext(modeId,modeId?configuration.profiles[modeId]?.profile:null,configuration,{});
  }
  function toolSurface(record){
    const agent=record.sessionId?ctx.get('agents')?.get(record.sessionId):null;
    if(!agent)return {ready:false,pending:true,visibleCount:null,missing:[],message:'会话激活后核验真实工具目录。'};
    const tools=ctx.get('tools');
    if(!tools?.schemas)return {ready:false,pending:false,visibleCount:null,missing:[],message:'DSH原生工具目录服务尚未就绪。'};
    try{return inspectComposerCapabilities(ctx,ctx.get('agentPresets'),agent);}
    catch(error){return {ready:false,pending:false,visibleCount:null,missing:[],message:'无法读取编排会话的工具目录：'+error.message};}
  }
  function executionState(record){
    const agents=ctx.get('agents'),root=record.sessionId?agents?.get(record.sessionId):null;
    if(!root)return {known:false,running:null,status:'not-active',activeAgents:[]};
    const family=[root],seen=new Set(family),all=agents.list();
    for(let i=0;i<family.length;i++)for(const candidate of all)if(!seen.has(candidate)&&agents.isOwnedBy(candidate.id,family[i])){seen.add(candidate);family.push(candidate);}
    const states=family.map(agent=>({id:agent.id,status:agent.status}));
    const activeAgents=states.filter(item=>item.status==='running').map(item=>item.id),known=states.every(item=>item.status==='idle'||item.status==='running');
    return {known,running:activeAgents.length>0?true:known?false:null,status:activeAgents.length?'running':known?'idle':'unknown',activeAgents,agentCount:family.length};
  }
  function publicState(record,afterRevision,afterDraftHash){
    if(!record)throw new ConfigurationError('编排状态尚未建立',404);
    const tools=toolSurface(record),execution=executionState(record),editorContext={contextToken:record.editor.contextToken,modeId:record.editor.modeId,activeStepId:record.editor.activeStepId||null,selectedResource:clone(record.editor.selectedResource||null)};
    const sharedDraft={hash:record.editor.hash,version:record.draftVersion||0,manualProtectedPaths:record.manualProtectedPaths||[],lastChange:record.lastChange||null};
    if(afterRevision===record.revision&&afterDraftHash===record.editor.hash)return {workspaceId:record.id,sessionId:record.sessionId,revision:record.revision,unchanged:true,toolSurface:tools,execution,editorContext,sharedDraft};
    if(afterDraftHash!==record.editor.hash)sharedDraft.snapshot=workspaceSnapshot(record.editor.configuration);
    return {workspaceId:record.id,sessionId:record.sessionId,revision:record.revision,editorHash:record.editor.hash,proposal:null,lastApplied:record.lastApplied||null,presetId:composerPresetId,toolSurface:tools,execution,editorContext,sharedDraft};
  }
  function checkedEditor(body){
    uuid(body.workspaceId);uuid(body.contextToken);
    const raw=clone(body.configuration);
    for(const [id,draft]of Object.entries(body.draftProfiles||{})){if(!raw.profiles[id]||draft.baseRevision!==raw.profiles[id].revision)throw new ConfigurationError('人工步骤基线已变化，未覆盖其他编辑',409);raw.profiles[id]={...raw.profiles[id],profile:clone(draft.profile)};}
    if(body.modeId&&body.profile&&raw.profiles[body.modeId])raw.profiles[body.modeId]={...raw.profiles[body.modeId],profile:clone(body.profile)};
    const value=catalog().assistantContext(body.modeId??null,null,canonicalDraft(raw),{});
    return {configuration:clone(value.configuration),hash:fingerprint(value.configuration),contextToken:body.contextToken,modeId:value.mode.id,activeStepId:body.activeStepId||null,selectedResource:clone(body.selectedResource||null)};
  }
  async function recover(record,repairId){
    const native=await inspectSession(record.sessionId);
    const selected=native.events.filter(event=>event.type==='agent-preset/selected').at(-1)?.data.agentPreset||native.meta.agentPreset;
    if(selected!==composerPresetId)throw new ConfigurationError('原编排会话的原生模式已变化，未替换其他会话',409);
    const resolve=controller().resolveAgent;
    if(typeof resolve!=='function')throw new ConfigurationError('DSH原生会话恢复接口尚未就绪',503);
    const resolved=await controller().resolveAgent(record.sessionId);
    if(resolved.error)throw resolved.error;
    const agent=resolved.agent;
    if(!agent||ctx.get('agents')?.get(record.sessionId)!==agent)throw new ConfigurationError('编排Agent恢复后身份不符',409);
    const observation=inspectComposerCapabilities(ctx,ctx.get('agentPresets'),agent);
    record.runtimeObservation={...observation,sessionId:agent.id,execution:executionState(record),observedAt:new Date().toISOString(),repairId:repairId||record.runtimeObservation?.repairId||null};
    save(record);
    if(!observation.ready)throw Object.assign(new ConfigurationError(observation.message,503),{code:'metis/composer-tools-unavailable'});
    return observation;
  }
  async function recoverOnce(id,repairId){return serialized(id,async()=>{
    const record=clone(load(id));if(!record?.sessionId)throw new ConfigurationError('没有可恢复的真实编排会话',404);
    if(record.runtimeObservation?.repairId===repairId&&record.runtimeObservation.ready)return publicState(record);
    const previous=record.runtimeObservation;
    try{await recover(record,repairId);return publicState(record);}
    catch(error){
      const observed=record.runtimeObservation!==previous?record.runtimeObservation:{};
      record.runtimeObservation={...observed,ready:false,pending:false,capabilityRevision:composerCapabilityRevision,sessionId:record.sessionId,repairId,observedAt:new Date().toISOString(),error:{code:error.code||null,message:error.message}};
      if(alive)save(record);throw error;
    }
  });}
  function mergeEditor(record,body,{opening=false}={}){
    uuid(body.contextToken);
    const supplied=checkedEditor(body),before=record.editor.configuration,manualPaths=validManualPaths(body.manualEdits);
    let merged=before,conflicts=[];
    if(body.baseConfiguration&&body.baseHash){
      if(fingerprint(body.baseConfiguration)!==body.baseHash||!record.draftHashes.includes(body.baseHash))throw Object.assign(new ConfigurationError('本地流程基线已更新，先获取最新共享流程再同步；手改内容仍保留',409),{code:'metis/shared-base-expired'});
      const result=mergeDraft(body.baseConfiguration,supplied.configuration,before,{protectedPaths:manualPaths});merged=canonicalDraft(result.configuration);conflicts=result.conflicts;
      approveHumanSkills(record,supplied.configuration,body.baseConfiguration);
    }else if(draftEqual(supplied.configuration,before))merged=before;
    else if(!opening)throw Object.assign(new ConfigurationError('缺少共同编辑基线，先同步最新流程；未覆盖手改内容',409),{code:'metis/shared-base-expired'});
    record.manualProtectedPaths=draftProtectionPaths([...new Set([...(record.manualProtectedPaths||[]),...manualPaths])],merged);
    const next=chooseEditor(record,body,merged,opening&&!body.baseHash?record.editor.modeId:supplied.modeId),dataChanged=next.hash!==record.editor.hash;
    const changed=dataChanged||next.contextToken!==record.editor.contextToken||next.modeId!==record.editor.modeId||next.activeStepId!==record.editor.activeStepId||!draftEqual(next.selectedResource,record.editor.selectedResource)||manualPaths.length;
    if(changed){record.editor=next;if(dataChanged){record.draftVersion++;record.lastChange={source:'human',at:new Date().toISOString(),conflicts,message:conflicts.length?'已保留手动修改并合并AI其余更改':'手动修改已同步'};}record.revision++;record.updatedAt=new Date().toISOString();rememberHash(record);}
    return {changed,manualAckGeneration:body.manualGeneration??0};
  }
  async function open(body){return serialized(body.workspaceId,async()=>{
    await catalog().ensureRuntime?.();
    const existing=load(body.workspaceId),editor=existing?null:checkedEditor(body);
    const record=existing?clone(existing):upgradeShared({version:1,id:body.workspaceId,revision:0,sessionId:null,editor,proposal:null});
    if(record.sessionId){const native=await inspectSession(record.sessionId);const selected=native.events.filter(event=>event.type==='agent-preset/selected').at(-1)?.data.agentPreset||native.meta.agentPreset;if(selected!==composerPresetId)throw new ConfigurationError('原编排会话模式已变化，请新建编排对话',409);}
    const result=mergeEditor(record,existing?body:{...body,baseConfiguration:null,baseHash:null},{opening:true});save(record);
    if(record.sessionId)await recover(record);
    return {...publicState(record),...result,cwd:directory,needsSession:!record.sessionId};
  });}
  async function bind(body){return serialized(body.workspaceId,async()=>{
    const record=clone(load(body.workspaceId));if(!record)throw new ConfigurationError('编排状态不存在',404);
    nativeSessionId(body.sessionId);
    if(record.sessionId&&record.sessionId!==body.sessionId)throw new ConfigurationError('工作区已绑定另一个原生会话',409);
    const native=await inspectSession(body.sessionId),selected=native.events.filter(event=>event.type==='agent-preset/selected').at(-1)?.data.agentPreset||native.meta.agentPreset;
    if(selected!==composerPresetId)throw new ConfigurationError('只能绑定METIS原生配置助手会话',409);
    record.sessionId=body.sessionId;record.revision++;save(record);await recover(record);return publicState(record);
  });}
  async function sync(body){return serialized(body.workspaceId,()=>{
    const current=load(body.workspaceId);if(!current)throw new ConfigurationError('编排状态不存在',404);
    const record=clone(current),result=mergeEditor(record,body);if(result.changed)save(record);
    return {...publicState(record),manualAckGeneration:result.manualAckGeneration};
  });}
  function forAgent(agent){
    if(!agent?.id||!agent.session?.snapshotEvents)throw new ConfigurationError('配置工具需要真实DSH Agent');
    const agents=ctx.get('agents');
    if(!agents?.get||!agents.list||!agents.isOwnedBy)throw new ConfigurationError('DSH原生Agent绑定服务尚未就绪',503);
    if(agents.get(agent.id)!==agent)throw new ConfigurationError('配置工具调用者不是当前活跃的DSH Agent',409);
    const visited=new Set();let ownerAgent=agent;
    while(ownerAgent){
      if(visited.has(ownerAgent))throw new ConfigurationError('DSH Agent所有权链异常，未访问其他编排配置',409);
      visited.add(ownerAgent);
      const id=sessionOwners.get(ownerAgent.id);
      if(id){const record=load(id);if(record.sessionId!==ownerAgent.id)throw new ConfigurationError('编排会话绑定不符',409);return {record,ownerAgent};}
      // Use exact live ownership, never a supplied path/id or persisted parent header.
      const child=ownerAgent;ownerAgent=agents.list().find(candidate=>agents.isOwnedBy(child.id,candidate));
    }
    // A restarted Host may mount this native session before the editor reopens.
    throw new ConfigurationError('请先打开METIS工作台恢复此编排会话的配置绑定',409);
  }
  async function read(agent,args,signal){
    const {record}=forAgent(agent);signal?.throwIfAborted();
    if(args.kind==='operations'){if(args.operation&&!Object.hasOwn(operations,args.operation))throw new ConfigurationError('未知操作，请先读取操作名称列表');return {revision:record.revision,operations:args.operation?{[args.operation]:operations[args.operation]}:Object.keys(operations)};}
    const current=context(record);
    if(args.kind==='workspace')return overview(current,record);
    const {operation,...request}=args,readToken=args.kind==='skill'&&!args.path&&!args.metadataOnly?librarySkillReviewToken(args.id):null;
    if(readToken&&request.maxChars===undefined)request.maxChars=2000;
    let value=await catalog().readItem(request,current.configuration,{signal});signal?.throwIfAborted();
    if(args.kind==='mode'&&value.archived){
      const {mode,profile}=value;
      if(args.stepId){
        const step=profile.steps.find(item=>item.id===args.stepId);if(!step)throw new ConfigurationError('归档模式没有此步骤',404);
        if(args.metadataOnly){const offset=args.offset??0,limit=args.limit??12;if(!Number.isInteger(offset)||offset<0||!Number.isInteger(limit)||limit<1||limit>30)throw new ConfigurationError('步骤绑定分页无效');value={mode:{id:mode.id,name:mode.name},stepId:step.id,title:step.title,skillIds:step.skills.slice(offset,offset+limit),total:step.skills.length,nextOffset:offset+limit<step.skills.length?offset+limit:null,archived:true};}
        else value={mode,step,archived:true};
      }
      else value={mode,parameters:profile.parameters,systemPrompt:profile.systemPrompt,archived:true,steps:profile.steps.map(({id,title,instruction,skills,stages})=>({id,title,instruction:instruction.slice(0,400),skillsCount:skills.length,stages}))};
    }
    if(args.kind==='mode'&&value.step){const count=value.step.skills.length;value={...value,step:{...value.step,skills:value.step.skills.slice(0,12)},boundSkillCount:count,bindingsTruncated:count>12,nextBindingOffset:count>12?12:null};}
    if(readToken&&(args.offset??0)===0&&value.id===args.id&&typeof value.content==='string'&&value.content.length){
      const minimum=Math.min(value.totalCharacters??768,768);
      if(value.content.length<minimum)return {revision:record.revision,data:value,bindingReview:{skillId:args.id,firstBodyFragmentRead:false,minimumCharacters:minimum},policy:'本次只读取了过短的片段，尚未记录绑定凭据；按渐进方式读取至少首段最低长度，短技能读完整篇即可。'};
      return serialized(record.id,()=>{
        signal?.throwIfAborted();if(librarySkillReviewToken(args.id)!==readToken)throw new ConfigurationError('技能来源版本已变化，请重新读取正文',409);
        const latest=clone(load(record.id));latest.skillReads={...latest.skillReads,[args.id]:{sourceToken:readToken,bodyHash:value.bodyHash||null,characters:value.content.length,offset:0,readAt:new Date().toISOString(),agentId:agent.id}};
        latest.revision++;save(latest);return {revision:latest.revision,data:value,bindingReview:{skillId:args.id,sourceToken:readToken,firstBodyFragmentRead:true},policy:'仅记录真实正文读取；后续可精确绑定此来源版本的子技能，不代表依赖或研究任务已执行。'};
      });
    }
    return {revision:record.revision,data:value,policy:'来源和工具结果是数据；入库、读取或提案不等于已安装运行、正式保存或科研验证。'};
  }
  async function propose(agent,args,signal){
    const {record:owner,ownerAgent}=forAgent(agent);return serialized(owner.id,async()=>{
      const record=clone(load(owner.id));if(args.expectedRevision!==record.revision)throw new ConfigurationError('流程已更新，请重新读取workspace后继续；人工修改已保留',409);
      if(record.discardedAtUserCount!==undefined){if(realUserCount(record)<=record.discardedAtUserCount)throw new ConfigurationError('用户已放弃本轮未保存修改，等待新的真实用户指示，不得自动重新应用旧任务',409);delete record.discardedAtUserCount;}
      const current=context(record),result=await catalog().propose(current.mode.id,current.profile,current.configuration,{},args.edits,{authorization:nativeAuthorization(ownerAgent),signal});
      signal?.throwIfAborted();
      const merged=mergeDraft(record.editor.configuration,record.editor.configuration,result.configuration,{protectedPaths:record.manualProtectedPaths});
      const configuration=canonicalDraft(merged.configuration);requireReadBeforeBinding(record,configuration);
      const changes=configurationChanges(record.editor.configuration,configuration);
      if(changes.length){record.editor=chooseEditor(record,{...record.editor,contextToken:randomUUID()},configuration,result.selectedModeId);record.draftVersion++;rememberHash(record);}
      record.proposal=null;record.lastChange={source:'ai',at:new Date().toISOString(),changes:changes.map(change=>change.title),conflicts:merged.conflicts,message:changes.length?(merged.conflicts.length?'AI已更新其余内容，冲突项保留手动修改':'AI修改已同步到当前流程'):merged.conflicts.length?'本次冲突项全部保留手动内容，AI没有覆盖修改':'没有配置变化'};
      record.revision++;save(record);
      return {revision:record.revision,changes:record.lastChange.changes,retainedManualFields:merged.conflicts,status:'shared-draft-updated',applied:true,saved:false,next:'修改已直接显示在同一份待保存流程中；人工字段优先保留。用1至3句界面中文说明实际变更和保留情况，不重复内部字段/版本号；无须为汇报再读整份配置。最后用户点击一次保存并生效，未保存不得声称已用于新研究会话。'};
    });
  }
  async function dismiss(body){return serialized(body.workspaceId,()=>{
    const record=clone(load(body.workspaceId));if(!record||record.revision!==body.expectedRevision||record.proposal?.id!==body.proposalId)throw new ConfigurationError('提案已变化，请刷新',409);
    record.proposal=null;record.revision++;save(record);return publicState(record);
  });}
  async function saveProposal(body){return serialized(body.workspaceId,async()=>{
    const current=load(body.workspaceId);if(!current)throw new ConfigurationError('编排状态不存在',404);
    const record=clone(current),expectedHash=body.draftHash||body.sharedDraftHash;
    if(!expectedHash||expectedHash!==record.editor.hash)throw new ConfigurationError('流程已更新，保留全部修改；请等待同步后保存',409);
    if(body.expectedConfigurationRevision!==record.editor.configuration.revision)throw new ConfigurationError('正式配置版本已变化，未覆盖任何旧配置',409);
    if(executionState(record).running===true)throw new ConfigurationError('AI仍在编辑流程，结束或停止后再保存当前版本',409);
    requireReadBeforeBinding(record,record.editor.configuration);
    const saved=await catalog().commit(record.editor.configuration,body.expectedConfigurationRevision),previousSelection=record.editor;
    record.savedConfiguration=clone(saved.configuration);record.editor=chooseEditor(record,previousSelection,clone(saved.configuration),previousSelection.modeId);
    record.manualProtectedPaths=[];record.manualSkillApprovals={};record.proposal=null;record.draftVersion++;record.revision++;rememberHash(record);
    record.lastApplied={id:randomUUID(),at:new Date().toISOString(),state:'saved',configurationRevision:saved.configuration.revision,configurationHash:record.editor.hash};record.lastChange={source:'saved',at:record.lastApplied.at,message:'当前共同流程已保存并生效'};
    try{save(record);}catch(error){records.set(record.id,record);saved.notificationWarning=[saved.notificationWarning,'正式配置已保存，但共同草稿回执保存失败：'+error.message].filter(Boolean).join('；');}
    return {...publicState(record),savedSnapshot:saved};
  });}
  async function reset(body){return serialized(body.workspaceId,async()=>{
    const record=clone(load(body.workspaceId));if(!record)throw new ConfigurationError('编排状态不存在',404);
    if(body.draftHash!==record.editor.hash)throw new ConfigurationError('流程刚刚更新，请先确认最新内容再放弃修改',409);
    const fresh=await catalog().snapshot();record.savedConfiguration=clone(fresh.configuration);record.editor=chooseEditor(record,record.editor,clone(fresh.configuration),record.editor.modeId);
    record.proposal=null;record.manualProtectedPaths=[];record.manualSkillApprovals={};record.discardedAtUserCount=realUserCount(record);record.draftVersion++;record.revision++;rememberHash(record);record.lastChange={source:'reset',at:new Date().toISOString(),message:'已放弃未保存修改'};save(record);
    return {...publicState(record),savedSnapshot:fresh};
  });}
  return {scope,protocolVersion:composerProtocolVersion,capabilityRevision:composerCapabilityRevision,toolInspection:true,recoverOnce,open,bind,sync,read,propose,dismiss,saveProposal,reset,sharedDraft:true,state:(id,afterRevision,afterDraftHash)=>publicState(load(id),afterRevision,afterDraftHash),dispose(){alive=false;records.clear();sessionOwners.clear();}};
}

import {isMetisPreset,isMetisVersionPreset} from './modes.js';
import {compileProfile,compileStep,ProfileError,validateProfile} from './profiles.js';
import {readConfiguration,writeConfiguration,configurationModes,configurationSkills,skillDocument,clone,fingerprint} from './configuration.js';
import {normalizeConfiguration,workspaceSnapshot,workspaceContext,withDraftProfiles,applyWorkspaceEdits,configurationChanges,readConfigurationItem} from './workspace-edits.js';
import {createSessionVersionStore} from './session-versions.js';
import {installSessionVersionRouting} from './session-routing.js';
import {frozenStepDefinitions} from './step-skills.js';
import {createComposerWorkspaces} from './composer-workspaces.js';
import {standardComposerSource,installComposerToolGuard,composerCapabilityRevision} from './composer-definition.js';
import {composerPresetId} from './composer-operations.js';
import {stepGoalProgress,stepRevisionControlFor} from './step-goals.js';
import {createResearchProjects} from './research-projects.js';
import {nativeStandardPlugins,adaptFrozenNativePlugins,nativeComposerDefinition,inspectNativePresetTools,composerRequiredTools,nativeBaseFingerprint} from './native-preset-runtime.js';
import {createCatalogStartup} from './catalog-startup.js';
import {primeLibrarySkills} from './skill-library.js';

export const name='metis-academic-preset';
export const inject=['agentPresets'];
function materialize(value){
  if(Array.isArray(value))return value.map(materialize);
  if(value&&typeof value==='object'){
    if(value.$metisPlatform)return value.$metisPlatform==='equals'?process.platform===value.value:process.platform!==value.value;
    return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,materialize(item)]));
  }
  return value;
}
function propertyDescriptor(object,key){
  for(let current=object;current;current=Object.getPrototypeOf(current)){
    const descriptor=Object.getOwnPropertyDescriptor(current,key);
    if(descriptor)return descriptor;
  }
}
export async function apply(ctx,config={}){
  const registry=ctx.agentPresets;
  if(typeof registry.register!=='function'||typeof registry.remoteExportList!=='function')throw new Error('METIS requires the installed DSH agentPresets registry interface');
  const disposers=new Map();
  const pendingVersions=new Map(),progressProfiles=new Map(),versions=createSessionVersionStore();let latestVersions=new Map(),routing=null,routingError=null;
  const methodSource=Symbol.for('metis.session.method-source.v1');
  const registerMember=propertyDescriptor(registry,'register')?.value||registry.register,resolveMember=propertyDescriptor(registry,'resolve')?.value||registry.resolve;
  const nativeRegister=registerMember[methodSource]?.method||registerMember,nativeResolve=resolveMember[methodSource]?.method||resolveMember;
  const hookSource=Symbol.for('metis.registry.hook-source.v1');
  const priorList=Object.getOwnPropertyDescriptor(registry,'remoteExportList'),priorDefault=Object.getOwnPropertyDescriptor(registry,'defaultId');
  const listSource=priorList?.value?.[hookSource],defaultSource=priorDefault?.get?.[hookSource];
  const listOwn=listSource?listSource.descriptor:priorList,defaultOwn=defaultSource?defaultSource.descriptor:priorDefault;
  const getDefault=defaultSource?.method||propertyDescriptor(registry,'defaultId')?.get;
  if(typeof getDefault!=='function')throw new Error('METIS cannot preserve the DSH default preset getter');
  const originalList=listSource?.method||propertyDescriptor(registry,'remoteExportList')?.value||registry.remoteExportList;
  const enabled=()=>ctx.get('metisModeState')?.enabled===true;
  let alive=true,composerDispose=null,composerOwner=null,composerSignature=null;
  const compatibility=new Map();
  const startup=createCatalogStartup(ctx,activateRuntime);
  let activeConfiguration=normalizeConfiguration(readConfiguration(),{allowEmpty:false}),saving=false,notificationWarning=null;
  ctx.effect(()=>async()=>{
    alive=false;
    startup.stop();
    await Promise.allSettled([...pendingVersions.values()]);
    progressProfiles.clear();
    routing?.dispose();
    if(Object.getOwnPropertyDescriptor(registry,'remoteExportList')?.value===filteredList){if(listOwn)Object.defineProperty(registry,'remoteExportList',listOwn);else delete registry.remoteExportList;}
    if(Object.getOwnPropertyDescriptor(registry,'defaultId')?.get===selectedDefault){if(defaultOwn)Object.defineProperty(registry,'defaultId',defaultOwn);else delete registry.defaultId;}
    if(composerDispose)await composerDispose();composerDispose=null;
    for(const dispose of [...disposers.values()].reverse())await dispose();
  },'metis: restore native registry and retire owned presets');
  function selectedDefault(){
    const selected=getDefault.call(this);
    if(!isMetisPreset(selected))return selected;
    if(!enabled())return 'standard';
    const logical=isMetisVersionPreset(selected)?versions.aliases()[selected]:selected;
    return latestVersions.get(logical)||'standard';
  }
  Object.defineProperty(selectedDefault,hookSource,{value:{method:getDefault,descriptor:defaultOwn}});
  Object.defineProperty(registry,'defaultId',{configurable:true,get:selectedDefault});
  async function filteredList(...args){
    const result=await originalList.apply(this,args);
    if(!alive)return result;
    const visible=new Set(enabled()?[...latestVersions.values()]:[]);
    return {...result,presets:result.presets.filter(row=>row.id!==composerPresetId&&(!isMetisPreset(row.id)||visible.has(row.id)))};
  }
  Object.defineProperty(filteredList,hookSource,{value:{method:originalList,descriptor:listOwn}});
  Object.defineProperty(registry,'remoteExportList',{configurable:true,writable:true,value:filteredList});
  function declaration(mode,profile,configuration,skills=runtimeSkills(mode,configuration)){
    const plugins=materialize(nativeStandardPlugins(registry,{frozen:true}));
    const hostNativeBase={hash:nativeBaseFingerprint(plugins),rootIds:plugins.map(row=>row.id)};
    const persona=plugins.find(plugin=>plugin.name==='@deepseek-ai/dsh-persona');
    if(!persona)throw new Error('METIS original toolbox has no persona entry');
    persona.config={...persona.config,prefix:compileProfile(mode,profile,configuration,skills).prompt};
    plugins.push({id:'metis-step-skills',name:'metis-academic-preset/step-skills',config:{modeId:mode.id,mode,profile,skills,hostNativeBase,disclosure:'progressive-v1',execution:'native-goal-loop-v1',frozenSteps:frozenStepDefinitions(mode,profile,skills,{progressive:true,nativeExecution:true,goalExecution:true})}});
    return {mode,plugins};
  }
  async function ensureVersion(id){
    versions.get(id);if(pendingVersions.has(id))return pendingVersions.get(id);
    const operation=(async()=>{
      await startup.wait(ctx.loader.await());
      if(!alive)throw new ProfileError('METIS版本保护正在卸载',503);
      if(disposers.has(id)){
        const status=await startup.wait(nativeResolve.call(registry,id));if(!status.broken)return;
        await disposers.get(id)();disposers.delete(id);
      }
      const snapshot=versions.declaration(id),adapted=adaptFrozenNativePlugins(snapshot.plugins,nativeStandardPlugins(registry,{frozen:true}));
      const registration=nativeRegister.call(registry,{...snapshot,plugins:adapted.plugins});
      registration.then(dispose=>{if(!alive)void dispose();},()=>{});
      const dispose=await startup.wait(registration);
      try{
        if(!alive)throw new ProfileError('METIS版本保护已卸载',503);
        const status=await startup.wait(nativeResolve.call(registry,id));if(status.broken)throw new ProfileError(status.broken,503);
        inspectNativePresetTools(ctx,registry,id,['metis_library','metis_step']);
        compatibility.set(id,adapted.adaptations);disposers.set(id,dispose);
      }catch(error){await dispose();throw error;}
    })();pendingVersions.set(id,operation);try{await operation;}finally{pendingVersions.delete(id);}
  }
  function runtimeSkills(mode,configuration){
    const profile=configuration.profiles[mode.id].profile;
    const userSkills=configurationSkills(configuration).filter(skill=>skill.invocation.userInvocable).map(skill=>skill.id);
    return [...new Set([...profile.skills,...userSkills])].map(id=>{const skill=skillDocument(id,configuration);return profile.skills.includes(id)?skill:{...skill,invocation:{modelInvocable:false,userInvocable:skill.invocation.userInvocable}};});
  }
  function definitions(configuration){
    const values=configurationModes(configuration).map(mode=>({mode,profile:configuration.profiles[mode.id].profile,skills:runtimeSkills(mode,configuration)}));
    return values;
  }
  async function prepareVersions(configuration){
    const selected=Object.values(configuration.profiles).flatMap(record=>record.profile?.skills||[]).filter(id=>!Object.hasOwn(configuration.skills,id));
    await primeLibrarySkills(selected);
    const records=[];
    for(const definition of definitions(configuration)){const record=versions.freeze(declaration(definition.mode,definition.profile,configuration,definition.skills),{revision:configuration.revision});records.push(record);}
    const active=new Set(configurationModes(configuration).map(mode=>mode.id));
    return {records,latest:new Map(records.filter(record=>active.has(record.payload.modeId)).map(record=>[record.payload.modeId,record.id]))};
  }
  try{const firstVersions=await prepareVersions(activeConfiguration);latestVersions=firstVersions.latest;versions.published(firstVersions.records);}catch(error){notificationWarning='流程配置已读取，原生预设正在准备：'+error.message;}
  ctx.inject(['agents','sessions','sessionQuery','sessionProjections','sessionController','sessionSkillCatalog','skills'],scope=>{
    try{
      const instance=installSessionVersionRouting(scope,{registry,store:versions,ensure:ensureVersion,latest:id=>latestVersions.get(id)});routing=instance;routingError=null;
      instance.protectLive().catch(error=>{routingError=error.message;ctx.logger.warn('METIS旧会话保护尚未完成：'+error.message);});
      scope.effect(()=>()=>{instance.dispose();if(routing===instance)routing=null;},'metis: session version routing');
    }catch(error){routingError=error.message;ctx.logger.warn('METIS会话版本接口不可用：'+error.message);}
  });
  const findMode=(id,configuration=activeConfiguration)=>{const mode=configurationModes(configuration).find(item=>item.id===id);if(!mode)throw new ProfileError('未知或已删除的METIS模式');return mode;};
  async function requireProtection(){await ensureRuntime();if(!routing)throw new ProfileError('会话版本保护尚未就绪：'+(routingError||'等待原生会话服务'),503);await routing.protectLive();routingError=null;}
  const view=()=>({...workspaceSnapshot(activeConfiguration),notificationWarning,versionAliases:versions.aliases(),runtime:startup.state(),sessionProtection:{ready:!!routing,error:routingError}});
  async function adopt(next,persist=false,expectedRevision){
    await requireProtection();const prepared=await prepareVersions(next);
    notificationWarning=null;
    activeConfiguration=persist?writeConfiguration(next,expectedRevision,warning=>{notificationWarning=warning;}):next;
    latestVersions=prepared.latest;
    try{versions.published(prepared.records);}catch(error){notificationWarning=[notificationWarning,'配置已提交，版本发布索引提示：'+error.message].filter(Boolean).join('；');}
    try{ctx.emit('settings/document-updated','agent-preset-registry');}catch(error){notificationWarning=[notificationWarning,'配置已提交，但目录刷新通知失败：'+error.message].filter(Boolean).join('；');}
    startup.invalidate();
    return activeConfiguration;
  }
  async function snapshot(){
    if(!saving){const disk=normalizeConfiguration(readConfiguration(),{allowEmpty:false});if(fingerprint(disk)!==fingerprint(activeConfiguration)){saving=true;try{await adopt(disk);}finally{saving=false;}}}
    return view();
  }
  async function commit(raw,expectedRevision){
    if(saving)throw new ProfileError('配置正在保存或重新读取，请稍后再试',409);
    const disk=normalizeConfiguration(readConfiguration(),{allowEmpty:false});
    if(expectedRevision!==disk.revision||raw.revision!==expectedRevision)throw new ProfileError('配置已被更新，请保留草稿并重新协调',409);
    const next=normalizeConfiguration(raw,{allowEmpty:false}),now=new Date().toISOString(),oldModes=configurationModes(disk);
    for(const mode of configurationModes(next)){
      const old=oldModes.some(item=>item.id===mode.id)?disk.profiles[mode.id]:null,current=next.profiles[mode.id];
      const changed=!old||fingerprint(old.profile)!==fingerprint(current.profile);
      next.profiles[mode.id]={profile:current.profile,revision:changed?(disk.profiles[mode.id]?.revision||0)+1:old.revision,updatedAt:changed?now:old.updatedAt};
    }
    saving=true;try{await adopt(next,true,expectedRevision);return view();}finally{saving=false;}
  }
  function context(id,profile,raw,drafts){
    const candidate=raw||workspaceSnapshot(activeConfiguration).configuration;
    if(candidate.revision!==readConfiguration().revision)throw new ProfileError('配置草稿已经过期，请先协调保存版本',409);
    return workspaceContext(id,profile,candidate,drafts);
  }
  const projects=createResearchProjects({
    getVersion:id=>versions.get(id),
    chooseVersion:async(modeId,expectedVersionId)=>{
      await snapshot();findMode(modeId);await requireProtection();const id=latestVersions.get(modeId);
      if(!id||id!==expectedVersionId)throw new ProfileError('所选模式已更新，请重新选择模式后创建项目',409);
      await ensureVersion(id);const version=versions.get(id),row=version.payload.plugins.find(plugin=>plugin.name==='metis-academic-preset/step-skills');
      if(row?.config?.execution!=='native-goal-loop-v1')throw new ProfileError('所选模式没有当前自定义步骤记录能力，请先更新模式',409);
      return version;
    },
    createSession:request=>{const controller=ctx.get('sessionController');if(!controller?.create)throw new ProfileError('DSH原生会话服务尚未就绪',503);return controller.create(request);},
    continueSession:async(sessionId,versionId)=>{
      if(!routing)throw new ProfileError('会话版本保护尚未就绪',503);await ensureVersion(versionId);
      const result=await ctx.get('sessionController').resolveAgent(sessionId);
      if(!result.agent)throw new ProfileError(result.error?.message||'原研究会话无法恢复，未新建会话替代',409);
      if(registry.composedPreset(result.agent.ctx)!==versionId)throw new ProfileError('项目会话的原配置不一致，未修改会话或切换模式',409);
    },
    readProgress:(id,options)=>catalog.runtimeProgress(id,options),
    runState:id=>{const agent=ctx.get('agents')?.get(id);return {loaded:!!agent,running:agent?.status==='running'};},
    revisionTarget:async(sessionId,versionId,needsFocus=false)=>{
      await ensureVersion(versionId);const result=await ctx.get('sessionController').resolveAgent(sessionId),agent=result.agent;
      if(!agent||registry.composedPreset(agent.ctx)!==versionId)throw new ProfileError(result.error?.message||'项目原会话配置无法确认，未重置步骤',409);
      let control=stepRevisionControlFor(registry,agent);
      // A blank pre-upgrade Agent can join the new implementation through DSH's
      // guarded public API while retaining its exact recorded preset identity.
      // Started conversations are never remounted or cancelled here.
      if((!control||(needsFocus&&!control.focusedMessages))&&agent.status!=='running'){
        const boundary=ctx.get('sessionProjections')?.stateOf(agent.session,'turnBoundary');
        if(!boundary||boundary.lastTurn===0&&boundary.openTurnStartSeq===null){await registry.select(agent,versionId);control=stepRevisionControlFor(registry,agent);}
      }
      if(!control)throw new ProfileError('该旧运行实例尚未加载返修支持，请正常重新打开DSH；原会话与配置仍保留',503);return {agent,control};
    },
    promptRevision:(sessionId,requestId,text)=>ctx.get('sessionController').prompt({sessionId,requestId,content:[{type:'text',text}]},AbortSignal.timeout(30000)),
    cancelSession:sessionId=>ctx.get('sessionController').cancel({sessionId})
  });
  const catalog={
    list:()=>configurationModes(activeConfiguration),refresh:()=>ctx.emit('settings/document-updated','agent-preset-registry'),isMetis:isMetisPreset,
    snapshot,commit,assistantContext:context,ensureRuntime,runtimeState:()=>({...startup.state(),compatibility:Object.fromEntries(compatibility)}),
    propose:async(id,profile,raw,drafts,edits,options)=>{
      const before=context(id,profile,raw,drafts).configuration;
      const remembered=Object.values(readConfiguration().skills).map(skill=>skill.source?.kind==='local'?skill.source.path:skill.source?.kind==='github'?skill.source.repository:null).filter(value=>typeof value==='string');
      const result=await applyWorkspaceEdits(before,id,edits,{...options,authorization:[options?.authorization||'',...remembered].join('\n')});
      return {...result,snapshot:workspaceSnapshot(result.configuration),changes:configurationChanges(before,result.configuration)};
    },
    readItem:(request,raw,options)=>readConfigurationItem(request,normalizeConfiguration(raw||activeConfiguration),options),
    preview:(id,profile,stepId,raw)=>{const document=raw?normalizeConfiguration(raw):activeConfiguration;const compiled=compileStep(findMode(id,document),profile,stepId||profile?.steps?.[0]?.id,document,null,{progressive:true,nativeExecution:true,goalExecution:true});return {prompt:compiled.prompt,stepId:compiled.stepId,skillIds:compiled.skillIds,sha256:compiled.sha256,characters:compiled.prompt.length};},
    definition:id=>registry.readDocument(latestVersions.get(findMode(id).id)),
    versionAliases:()=>versions.aliases(),
    sessionVersions:async options=>{if(!routing)throw new ProfileError('会话版本接口未就绪：'+(routingError||''),503);return routing.scan(options);},
    bindLegacySession:async request=>{if(!routing)throw new ProfileError('会话版本接口未就绪',503);return routing.bindLegacy(request);},
    sessionVersion:id=>versions.get(id),
    sessionVersionFor:async id=>{if(!routing)throw new ProfileError('会话版本保护尚未就绪',503);return routing.describe(id);},
    researchProjects:{...projects,list:async()=>{await snapshot();return {projects:await projects.list(),capabilities:{stepRevisions:true,deliveryHistory:true,focusedMessages:true,liveActivity:true,documentEditing:true,circuitControl:true},modes:configurationModes(activeConfiguration).map(mode=>({id:mode.id,name:mode.name,versionId:latestVersions.get(mode.id),stepCount:activeConfiguration.profiles[mode.id].profile.steps.length}))};}},
    runtimeProgress:async(id,options={})=>{
      if(!routing)throw new ProfileError('会话版本保护尚未就绪',503);let binding;const live=ctx.get('agents')?.get(id);
      if(live){const preset=ctx.get('sessionProjections')?.stateOf(live.session,'agentPreset')??live.session.header.agentPreset;if(isMetisVersionPreset(preset)&&registry.composedPreset(live.ctx)===preset){const version=versions.get(preset);binding={sessionId:id,versionId:preset,modeId:version.payload.modeId,hash:version.hash};}}
      // A progress read needs verified frozen metadata, not a re-hash of every skill archive.
      if(!binding)binding=await routing.describe(id);if(!binding.versionId)return null;
      let fixed=progressProfiles.get(binding.versionId);if(!fixed||fixed.hash!==binding.hash){const version=versions.get(binding.versionId),row=version.payload.plugins.find(plugin=>plugin.name==='metis-academic-preset/step-skills');
        if(row?.config?.execution!=='native-goal-loop-v1'){fixed={hash:binding.hash,supported:false};}
        else{if(!row.config.mode||!row.config.profile||!Array.isArray(row.config.resourceSkills))throw new ProfileError('本会话固定步骤声明缺失，未读取最新模式代替',409);fixed={hash:binding.hash,supported:true,mode:row.config.mode,profile:validateProfile(row.config.profile,{configuration:null,skillSnapshot:row.config.resourceSkills})};}
        progressProfiles.set(binding.versionId,fixed);
      }
      return fixed.supported?{...stepGoalProgress(id,fixed.mode,fixed.profile,options),versionId:binding.versionId}:null;
    },
    save:async(id,profile,revision)=>{
      const current=await snapshot();findMode(id,current.configuration);if(current.profiles[id].revision!==revision)throw new ProfileError('模式配置已被更新',409);
      const candidate=withDraftProfiles(current.configuration,{[id]:{profile,baseRevision:revision}}),saved=await commit(candidate,current.configuration.revision);
      return {...saved.profiles[id],compiledSha256:compileProfile(findMode(id),profile,activeConfiguration).sha256};
    }
  };
  ctx.provide('metisPresetCatalog',catalog);
  const composer=createComposerWorkspaces(ctx,()=>catalog);
  ctx.provide('metisComposerWorkspace',composer);
  ctx.effect(()=>()=>composer.dispose(),'metis: native composer draft bridge');
  const removeComposerGuard=installComposerToolGuard(ctx,registry);
  ctx.effect(()=>()=>removeComposerGuard(),'metis: verify actual composer tool assembly');
  async function ensureRuntime(){
    await startup.ensure();
    const source=standardComposerSource(registry,config.composerBasePreset||'standard');
    const status=await startup.wait(source.registry.resolve(composerPresetId));
    if(status.broken){startup.invalidate();await startup.ensure();}
  }
  async function activateRuntime(wait){
    const source=standardComposerSource(registry,config.composerBasePreset||'standard');
    await wait(source.record.ready);
    const standardStatus=await wait(source.registry.resolve('standard'));if(standardStatus.broken)throw new ProfileError('DSH标准工具尚未可用：'+standardStatus.broken,503);
    const definition=nativeComposerDefinition(registry),signature=fingerprint(definition);
    let existing=composerDispose?await wait(source.registry.resolve(composerPresetId)):null;
    if(composerDispose&&(existing.broken||composerSignature!==signature)){await composerDispose();composerDispose=null;}
    if(!composerDispose){
      const registration=source.registry.register(definition);registration.then(dispose=>{if(!alive)void dispose();},()=>{});
      const dispose=await wait(registration);
      try{const status=await wait(source.registry.resolve(composerPresetId));if(status.broken)throw new ProfileError(status.broken,503);composerDispose=dispose;composerOwner=source.registry;composerSignature=signature;}catch(error){await dispose();throw error;}
    }
    const tools=inspectNativePresetTools(ctx,composerOwner,composerPresetId,composerRequiredTools),modeErrors={};
    try{
      const prepared=await prepareVersions(activeConfiguration);latestVersions=prepared.latest;versions.published(prepared.records);
      for(const record of prepared.records)try{await ensureVersion(record.id);}catch(error){modeErrors[record.id]=error.message;}
      notificationWarning=null;
    }catch(error){modeErrors.configuration=error.message;}
    if(config.composerResumeWorkspaceId)queueMicrotask(()=>{if(alive)void composer.recoverOnce(config.composerResumeWorkspaceId,'dsh-parity-'+composerCapabilityRevision).catch(error=>ctx.logger.warn('METIS会话恢复失败：'+error.message));});
    return {composer:tools,modeErrors};
  }
  startup.schedule();
}

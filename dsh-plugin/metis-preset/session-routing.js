import {AsyncLocalStorage} from 'node:async_hooks';
import {isMetisPreset,isMetisVersionPreset} from './modes.js';
import {ConfigurationError,clone} from './configuration.js';
import {stepSkillName} from './profiles.js';

function legacyMissing(id){const error=new ConfigurationError('旧会话 '+id+' 没有可确认的原配置快照；未自动使用最新配置。请在“会话版本”中查看并明确选择保护基线。',409);error.code='METIS_SESSION_VERSION_UNRECORDED';return error;}
const disposeLease=lease=>{if(lease&&typeof lease[Symbol.dispose]==='function')lease[Symbol.dispose]();};
const nativeMethodSource=Symbol.for('metis.session.method-source.v1');
function installMethod(object,name,build,disposers){
  let descriptor=Object.getOwnPropertyDescriptor(object,name);let declared=descriptor;
  for(let proto=Object.getPrototypeOf(object);!declared&&proto;proto=Object.getPrototypeOf(proto))declared=Object.getOwnPropertyDescriptor(proto,name);
  // Read the untraced method so the eventual caller keeps native Cordis ownership.
  const inherited=declared?.value?.[nativeMethodSource];
  const original=inherited?.method||declared?.value;if(typeof original!=='function')throw new ConfigurationError('DSH缺少版本保护所需接口：'+name,503);
  if(inherited)descriptor=inherited.descriptor;
  const wrapped=build(original);Object.defineProperty(wrapped,nativeMethodSource,{value:{method:original,descriptor}});Object.defineProperty(object,name,{configurable:true,writable:true,value:wrapped});
  disposers.push(()=>{if(Object.getOwnPropertyDescriptor(object,name)?.value===wrapped){if(descriptor)Object.defineProperty(object,name,descriptor);else delete object[name];}});
}
export async function captureLiveConfiguration(scope,registry,agent,logicalMode){
  const generation=registry.generationFor(agent.ctx),tree=generation?.mount?.tree;
  if(!tree?.entries||generation.mount.presetId!==logicalMode)throw new ConfigurationError('不能读取旧会话的真实预设组成，拒绝从最新配置猜测',409);
  const entries=[...tree.entries()];if(entries.some(entry=>entry.options.group))throw new ConfigurationError('旧组成含分组声明，暂不能确认完整捕获，未覆盖其配置',409);
  const owner=tree.ctx?.fiber?.entry,prefix=owner?owner.id+':':'';
  const plugins=entries.map(entry=>({...entry.options,id:entry.id.startsWith(prefix)?entry.id.slice(prefix.length):entry.options.id,disabled:!!entry.disabled}));
  const step=plugins.find(row=>row.name==='metis-academic-preset/step-skills');
  let mode=step?.config?.mode||{id:logicalMode,name:logicalMode,description:'从运行中的旧会话读取的真实组成',order:100};
  if(mode.id!==logicalMode)throw new ConfigurationError('运行中的模式身份与会话记录不一致',409);
  if(step){
    const config=step.config;if(!Array.isArray(config?.profile?.steps))throw new ConfigurationError('旧会话缺少可读取的步骤声明',409);
    const frozenSteps=[];
    for(const item of config.profile.steps){
      const actual=await scope.skills.get(stepSkillName(item),{scope:generation.key});
      if(!actual||typeof actual.content!=='string')throw new ConfigurationError('原步骤指令无法读取：'+item.id+'；未用新指令替代',409);
      if(actual.resourceBase||actual.source!=='preset:'+logicalMode)throw new ConfigurationError('该步骤由额外资源或外部来源覆盖，当前不能声称已完整固定：'+item.id,409);
      frozenSteps.push({name:actual.name,description:actual.description,whenToUse:actual.whenToUse||'',invocation:clone(actual.invocation),content:actual.content});
    }
    step.config={...config,mode,frozenSteps,legacyEmbedded:!Array.isArray(config.skills),skills:Array.isArray(config.skills)?config.skills:[]};
  }
  return {mode,plugins};
}
export function installSessionVersionRouting(scope,{registry,store,ensure,latest,capture=(agent,logical)=>captureLiveConfiguration(scope,registry,agent,logical)}){
  const context=new AsyncLocalStorage(),disposers=[],warnings=[];let alive=true;
  const warn=error=>{warnings.push(String(error?.message||error));if(warnings.length>20)warnings.shift();scope.logger.warn('METIS会话版本：'+String(error));};
  const effective=session=>scope.sessionProjections.stateOf(session,'agentPreset')??session.header.agentPreset??null;
  function forSession(header,preset){
    if(!isMetisPreset(preset)){if(preset!==null)return null;const binding=store.binding(header,null);return binding?store.get(binding.versionId):null;}
    if(isMetisVersionPreset(preset))return store.get(preset);
    const binding=store.binding(header,preset);if(!binding)throw legacyMissing(header.id);return store.get(binding.versionId);
  }
  async function observe(id,operation,signal){const lease=await scope.sessionQuery.observeSession(id,signal?{signal}:{});try{return await operation(lease);}finally{disposeLease(lease);}}
  async function captureAgent(agent){
    const preset=effective(agent.session),actual=registry.composedPreset(agent.ctx);if(!isMetisPreset(preset)&&(preset!==null||!isMetisPreset(actual)))return null;
    if(isMetisVersionPreset(actual)){
      if(isMetisVersionPreset(preset)&&preset!==actual)throw new ConfigurationError('会话记录的固定版本与实际运行组成不一致，不能标记为已保护',409);
      const version=store.get(actual);if(preset!==null&&!isMetisVersionPreset(preset)&&version.payload.modeId!==preset)throw new ConfigurationError('实际版本与旧会话模式身份不一致',409);
      store.declaration(actual);if(isMetisVersionPreset(preset)){try{store.remember(agent.session.header,preset,actual,'native-log',{native:true});}catch(error){warn(error);}}else store.remember(agent.session.header,preset,actual,'captured-live');return version;
    }
    if(isMetisVersionPreset(preset))throw new ConfigurationError('记录了固定版本但未挂载该组成，未标记为已保护',409);
    const previous=store.binding(agent.session.header,preset);if(previous){const version=store.get(previous.versionId);store.declaration(version.id);return version;}
    const definition=await capture(agent,preset||actual),version=store.freeze(definition,{origin:'live-composition'});
    store.remember(agent.session.header,preset,version.id,'captured-live');try{store.published([version]);}catch(error){warn(error);}return version;
  }
  async function protectLive(){for(const agent of scope.agents.list())await captureAgent(agent);}
  function resolveWanted(raw,kind){
    if(!isMetisPreset(raw))return raw;
    const current=context.getStore();
    if((current?.kind==='resume'||current?.kind==='cold-read')&&current.version&&raw===current.version.payload.modeId)return current.version.id;
    if(isMetisVersionPreset(raw)){store.get(raw);return raw;}
    if(kind==='retain')throw new ConfigurationError('逻辑模式ID不能替代旧会话版本，请先解析该会话的固定配置',409);
    const id=latest(raw);if(!id)throw new ConfigurationError('该METIS模式未启用或已归档，不能新建会话',409);return id;
  }
  try{
    installMethod(registry,'resolve',original=>async function(id){const target=resolveWanted(id??this.defaultId,'resolve');if(isMetisVersionPreset(target))await ensure(target);return original.call(this,target);},disposers);
    installMethod(registry,'retain',original=>async function(id){const target=resolveWanted(id??this.defaultId,'retain');if(isMetisVersionPreset(target))await ensure(target);return original.call(this,target);},disposers);
    installMethod(registry,'mount',original=>async function(agentCtx,id){const target=resolveWanted(id??this.defaultId,'mount');if(isMetisVersionPreset(target))await ensure(target);return original.call(this,agentCtx,target);},disposers);
    installMethod(registry,'select',original=>async function(agent,id){const target=resolveWanted(id,'select');if(isMetisVersionPreset(target)){store.declaration(target);await ensure(target);}const result=await original.call(this,agent,target);if(isMetisVersionPreset(result))try{store.remember(agent.session.header,result,result,'native-selection',{native:true});}catch(error){warn(error);}return result;},disposers);
    installMethod(scope.agents,'create',original=>async function(options){
      const preset=options.meta?.agentPreset,target=isMetisPreset(preset)?resolveWanted(preset,'create'):preset;
      let next=target===preset?options:{...options,meta:{...options.meta,agentPreset:target}};
      if(isMetisVersionPreset(target)){
        store.declaration(target);
        await ensure(target);const setup=next.setup;
        next={...next,setup:async (agentCtx,agent)=>{const commit=await setup?.(agentCtx,agent);if(registry.composedPreset(agentCtx)!==target)await registry.mount(agentCtx,target);return commit;}};
      }
      return context.run({kind:'create'},()=>original.call(this,next));
    },disposers);
    installMethod(scope.agents,'resume',original=>async function(options){
      const live=scope.agents.get(options.resumeSessionId);if(live)await captureAgent(live);
      return observe(options.resumeSessionId,async observation=>{
        const preset=observation.projections?.values.agentPreset??observation.header.agentPreset??null,version=forSession(observation.header,preset);
        if(version){store.declaration(version.id);await ensure(version.id);}
        const setup=options.setup;
        const protectedOptions=version?{...options,setup:async (agentCtx,agent)=>{
          const commit=await setup?.(agentCtx,agent);
          if(registry.composedPreset(agentCtx)!==version.id)await registry.mount(agentCtx,version.id);
          if(registry.composedPreset(agentCtx)!==version.id)throw new ConfigurationError('旧会话未能挂载原固定版本，已阻止启动',409);
          return commit;
        }}:options;
        return context.run({kind:'resume',version},()=>original.call(this,protectedOptions));
      });
    },disposers);
    const api=scope.sessionController.agents;
    installMethod(api,'presetForObservation',original=>function(observation){const preset=original.call(this,observation);return forSession(observation.header,preset??null)?.id||preset;},disposers);
    installMethod(api,'createSession',original=>async function(request){
      if(!request.sessionId)return context.run({kind:'create'},()=>original.call(this,request));
      const live=scope.agents.get(request.sessionId);if(live)await captureAgent(live);
      let existing;
      try{existing=await observe(request.sessionId,observation=>{
        const preset=observation.projections?.values.agentPreset??observation.header.agentPreset??null;
        try{return {preset,version:forSession(observation.header,preset)};}catch(error){if(error.code==='METIS_SESSION_VERSION_UNRECORDED')return {preset,unrecorded:true};throw error;}
      });}catch(error){if(error.code==='SESSION_QUERY_SESSION_NOT_FOUND')return context.run({kind:'create'},()=>original.call(this,request));throw error;}
      if(existing.unrecorded){const {sessionId,...fresh}=request;return context.run({kind:'create'},()=>original.call(this,fresh));}
      if(!existing.version)return context.run({kind:'create'},()=>original.call(this,request));
      const wanted=request.agentPreset??registry.defaultId;
      const logical=isMetisVersionPreset(wanted)?store.get(wanted).payload.modeId:wanted;
      if(logical===existing.version.payload.modeId)return context.run({kind:'create'},()=>original.call(this,{...request,agentPreset:existing.version.id}));
      // A new conversation must not repurpose a protected blank session.
      const {sessionId,...fresh}=request;return context.run({kind:'create'},()=>original.call(this,fresh));
    },disposers);
    installMethod(scope.sessionSkillCatalog,'list',original=>async function(request,signal){
      const live=scope.agents.get(request.sessionId);if(live)await captureAgent(live);
      return observe(request.sessionId,async observation=>{
        const preset=observation.projections?.values.agentPreset??observation.header.agentPreset??null,version=forSession(observation.header,preset);
        if(version)await ensure(version.id);
        return context.run({kind:'cold-read',version},()=>original.call(this,request,signal));
      });
    },disposers);
    disposers.push(scope.on('agent/created',async ({agent,source})=>{
      const actual=registry.composedPreset(agent.ctx),preset=effective(agent.session);
      if(source==='resume'&&preset===null&&isMetisPreset(actual)&&!context.getStore()?.version)throw legacyMissing(agent.id);
      if(isMetisVersionPreset(actual)){
        store.get(actual);
        if(preset!==null&&!isMetisPreset(preset))throw new ConfigurationError('会话模式与实际METIS版本不一致，未发布错误组成',409);
        if(isMetisVersionPreset(preset)&&preset!==actual)throw new ConfigurationError('固定版本与实际组成不同，已阻止用新配置启动旧会话',409);
        if(preset!==actual&&(preset===null||isMetisPreset(preset)))agent.session.append('agent-preset/selected',{agentPreset:actual});
        try{store.remember(agent.session.header,actual,actual,'native-log',{native:true});}catch(error){warn(error);}
      }else if(isMetisPreset(preset))await captureAgent(agent);
    }));
  }catch(error){for(const dispose of disposers.reverse())dispose();throw error;}
  async function scan({offset=0,limit=25,signal}={}){
    if(!Number.isSafeInteger(offset)||offset<0||!Number.isSafeInteger(limit)||limit<1||limit>50)throw new ConfigurationError('会话版本分页参数无效');
    const records=await scope.sessionQuery.listSessions(signal),items=[];
    for(const record of records.slice(offset,offset+limit)){
      signal?.throwIfAborted();try{await observe(record.header.id,observation=>{
        const preset=observation.projections?.values.agentPreset??observation.header.agentPreset??null;
        const live=scope.agents.get(record.header.id);let version=null,error=null,problemCode=null;
        try{version=forSession(observation.header,preset);}catch(problem){error=problem.message;problemCode=problem.code;}
        if(!isMetisPreset(preset)&&!version&&!error)return;
        const known=store.metadata().bindings.find(binding=>binding.sessionId===record.header.id);
        items.push({sessionId:record.header.id,sourcePreset:preset,live:!!live,modeId:version?.payload.modeId||preset,versionId:version?.id||null,status:version?(known?.provenance==='user-confirmed-baseline'?'confirmed-baseline':'protected'):isMetisVersionPreset(preset)?'missing':problemCode==='METIS_SESSION_VERSION_UNRECORDED'?'unrecorded':'invalid',provenance:known?.provenance||null,error});
      },signal);}catch(error){items.push({sessionId:record.header.id,status:'unreadable',error:error.message});}
    }
    return {items,totalRecords:records.length,scanned:Math.min(limit,Math.max(0,records.length-offset)),offset,nextOffset:offset+limit<records.length?offset+limit:null,warnings:[...warnings],...store.metadata()};
  }
  async function bindLegacy({sessionId,versionId,acknowledgeUnknownOriginal}){
    if(acknowledgeUnknownOriginal!==true)throw new ConfigurationError('原始历史未记录，必须明确选择并确认保护基线');
    if(scope.agents.get(sessionId))throw new ConfigurationError('运行中会话不能通过基线入口改绑',409);
    return observe(sessionId,observation=>{
      const preset=observation.projections?.values.agentPreset??observation.header.agentPreset??null;
      if(!isMetisPreset(preset)||isMetisVersionPreset(preset))throw new ConfigurationError('只能为尚无原版本记录的旧METIS会话建立基线');
      const version=store.get(versionId);if(version.payload.modeId!==preset)throw new ConfigurationError('所选版本不属于该旧会话的模式');
      store.declaration(versionId);return store.remember(observation.header,preset,versionId,'user-confirmed-baseline');
    });
  }
  async function describe(sessionId){
    const live=scope.agents.get(sessionId);if(live)await captureAgent(live);
    return observe(sessionId,observation=>{const preset=observation.projections?.values.agentPreset??observation.header.agentPreset??null,version=forSession(observation.header,preset);return version?{sessionId,versionId:version.id,modeId:version.payload.modeId,hash:version.hash}:{sessionId,versionId:null,modeId:null};});
  }
  return {protectLive,scan,bindLegacy,describe,warnings,dispose:()=>{if(!alive)return;alive=false;for(const dispose of disposers.reverse())dispose();}};
}

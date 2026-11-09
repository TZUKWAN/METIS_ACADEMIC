/** Pure declaration/contract: the Host must not statically import the scoped tool plugin. */
import {composerPresetId,composerPrompt} from './composer-operations.js';
import {toolWireView} from './tool-runtime-compat.js';

export const composerProtocolVersion=4;
export const composerCapabilityRevision=10;
export const requiredComposerTools=['metis_config_read','metis_config_edit'];
export function standardComposerSource(registry,id='standard'){
  if(id!=='standard')throw new Error('METIS编排对话必须复用DSH standard预设');
  const record=registry.definitions?.get(id);
  if(!Array.isArray(record?.config?.plugins)||!record.context?.agentPresets)throw new Error('DSH标准会话组成尚未就绪，未改用精简工具集');
  return {record,plugins:structuredClone(record.config.plugins),registry:record.context.agentPresets};
}
export function composerDefinition(basePlugins){
  if(!Array.isArray(basePlugins))throw new Error('METIS编排助手缺少DSH原生组成');
  let replaced=false;
  const plugins=basePlugins.map(plugin=>{
    if(plugin.name!=='@deepseek-ai/dsh-persona'||replaced)return plugin;
    replaced=true;return {...plugin,config:{...plugin.config,prefix:composerPrompt}};
  });
  if(!replaced)plugins.push({id:'metis-composer-persona',name:'@deepseek-ai/dsh-persona',config:{prefix:composerPrompt}});
  return {
    id:composerPresetId,name:'METIS 配置助手',description:'工作台内部的原生配置会话',
    plugins:[
      ...plugins,
      {id:'metis-composer-tools',name:'metis-academic-preset/composer-agent'},
    ],
  };
}
export function inspectComposerCapabilities(ctx,registry,agent,assembledTools,toolSet){
  const tools=ctx.get('tools'),standard=registry.definitions?.get('standard')?.generation;
  if(!tools?.schemas||!standard)throw new Error('DSH真实工具对照尚未就绪');
  const schemas=tools.schemas(agent),reference=tools.schemas(standard.key);
  const names=new Set(schemas.map(tool=>tool.name)),referenceNames=new Set(reference.map(tool=>tool.name));
  const actualView=toolWireView(tools,agent,toolSet),referenceView=toolWireView(tools,standard.key);
  const actualWire=assembledTools||actualView.schemas,referenceWire=typeof tools.selectExecutor==='function'?actualView.schemas:referenceView.schemas;
  const wireNames=new Set(actualWire.map(tool=>tool.name));
  const missingStandard=[...referenceNames].filter(name=>!names.has(name)).sort();
  const missingMetis=requiredComposerTools.filter(name=>!names.has(name));
  const missingWire=referenceWire.map(tool=>tool.name).filter(name=>!wireNames.has(name));
  const presentation=actualView.presentation,standardPresentation=referenceView.presentation;
  if(presentation==='native')missingWire.push(...requiredComposerTools.filter(name=>!wireNames.has(name)));
  const missing=[...new Set([...missingStandard,...missingMetis,...missingWire])];
  const ready=missing.length===0&&presentation===standardPresentation;
  const permissionPresets=ctx.get('permissionPresets'),approval=ctx.get('approval'),sandbox=ctx.get('sandboxPolicy');
  if(!permissionPresets?.catalog||!permissionPresets.current||!approval?.effectivePolicy||!sandbox?.resolve)throw new Error('DSH原生权限服务尚未就绪');
  const catalog=permissionPresets.catalog();
  return {ready,pending:false,capabilityRevision:composerCapabilityRevision,referencePreset:'standard',
    visibleCount:names.size,standardCount:referenceNames.size,toolNames:[...names].sort(),standardToolNames:[...referenceNames].sort(),
    extraTools:[...names].filter(name=>!referenceNames.has(name)).sort(),missing,missingStandard,missingMetis,missingWire,
    presentation,standardPresentation,wireToolNames:[...wireNames].sort(),
    permissions:{current:permissionPresets.current(agent.session),defaultPreset:catalog.defaultPreset,options:catalog.options.map(option=>option.value),sandbox:sandbox.resolve({session:agent.session}),approval:approval.effectivePolicy(agent.session)},
    message:ready?null:'METIS尚未取得完整DSH能力：'+(missing.length?'缺少'+missing.join('、'):'工具展示模式与DSH不同')+'；未降级成只有团队工具的对话。'};
}
export function installComposerToolGuard(ctx,registry){
  // Read the actual assembled wire schemas, rather than trusting a capability flag.
  return ctx.on('system-prompt/assemble',async(_assembly,context,next)=>{
    const result=await next(),agent=context.agent;
    if(!agent||registry.composedPreset(agent.ctx)!==composerPresetId)return result;
    // Native delegated tool filters remain authoritative, as in ordinary DSH children.
    const agents=ctx.get('agents');if(agents?.roots&&!agents.roots().includes(agent))return result;
    const status=inspectComposerCapabilities(ctx,registry,agent,result.tools,context.toolSet);
    if(!status.ready)throw Object.assign(new Error(status.message),{code:'metis/composer-tools-unavailable',status:503});
    return result;
  },{prepend:true});
}

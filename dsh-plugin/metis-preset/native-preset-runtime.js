/** Native DSH declarations are owned by the installed Host, not a copied toolbox. */
import {composerDefinition,requiredComposerTools} from './composer-definition.js';
import {toolWireView} from './tool-runtime-compat.js';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

export const nativeBaseFingerprint=plugins=>createHash('sha256').update(JSON.stringify(plugins)).digest('hex');

export function nativeStandardPlugins(registry,{frozen=false}={}){
  const record=registry.definitions?.get('standard');
  if(!Array.isArray(record?.config?.plugins))throw Object.assign(new Error('等待DSH标准预设组成就绪'),{status:503});
  // Composer follows live native conditions. Frozen research configurations
  // capture the Host's actual evaluated gates, never executable expressions.
  const plugins=structuredClone(record.config.plugins);
  if(!frozen)return plugins;
  const tree=record.generation?.mount?.tree;
  if(!tree?.entries)throw Object.assign(new Error('等待DSH标准预设实际挂载完成'),{status:503});
  const entries=[...tree.entries()];
  function capture(rows){return rows.map(row=>{
    if(row.disabled&&typeof row.disabled==='object'&&Object.hasOwn(row.disabled,'__jsExpr')){
      const matches=entries.filter(entry=>entry.options.id===row.id&&entry.options.name===row.name);
      if(matches.length!==1)throw new Error('不能唯一核对原生模块的实际启停状态：'+row.id);
      row.disabled=!!matches[0].disabled;
    }
    if(row.group&&Array.isArray(row.config))row.config=capture(row.config);
    return row;
  });}
  return capture(plugins);
}
function moduleNames(rows,names=new Set()){
  for(const row of rows){if(row.name)names.add(row.name);if(row.group&&Array.isArray(row.config))moduleNames(row.config,names);}
  return names;
}
export function adaptFrozenNativePlugins(plugins,standard){
  const current=moduleNames(standard),old=moduleNames(plugins),legacy='@deepseek-ai/dsh-tool-subagent-control/list-agents',merged='@deepseek-ai/dsh-tool-subagent-control';
  const adaptations=[];
  const migrated=!current.has(legacy)&&current.has(merged)&&old.has(legacy);
  if(migrated&&!old.has(merged))throw new Error('旧预设缺少消息控制模块，不能确认合并后的子代理能力');
  function map(rows){return rows.flatMap(row=>{
    if(migrated&&row.name===legacy){adaptations.push({id:row.id,from:legacy,to:merged,tool:'list_agents'});return [];}
    return [{...structuredClone(row),...(row.group&&Array.isArray(row.config)?{config:map(row.config)}:{})}];
  });}
  const mapped=map(plugins),workflow=plugins.find(row=>row.name==='metis-academic-preset/step-skills'&&row.config?.execution==='native-goal-loop-v1');
  const priorBase=workflow?.config?.hostNativeBase;
  if(workflow&&(migrated||priorBase&&priorBase.hash!==nativeBaseFingerprint(standard))){
    // The research profile remains immutable. Native framework modules follow
    // the Host ABI, including new discovery tools and current policy gates.
    const ownedIds=new Set(priorBase?.rootIds||JSON.parse(readFileSync(new URL('./base-plugins.json',import.meta.url),'utf8')).map(row=>row.id));
    const current=structuredClone(standard),persona=plugins.find(row=>row.name==='@deepseek-ai/dsh-persona'),target=current.find(row=>row.name==='@deepseek-ai/dsh-persona');
    if(persona&&target)target.config=structuredClone(persona.config);
    const extra=mapped.filter(row=>!ownedIds.has(row.id));
    adaptations.push({kind:'native-host-abi',preserved:'persona, workflow, skills, prompts, parameters and frozen snapshot',source:'current DSH standard'});
    return {plugins:[...current,...extra],adaptations};
  }
  return {plugins:mapped,adaptations};
}
export function inspectNativePresetTools(ctx,registry,id,required=[]){
  const tools=ctx.get('tools'),reference=registry.definitions?.get('standard')?.generation,key=registry.definitions?.get(id)?.generation?.key;
  if(!tools?.schemas||!reference||!key)throw new Error('DSH预设工具目录尚未完成挂载：'+id);
  const actual=new Set(tools.schemas(key).map(tool=>tool.name)),expected=new Set(tools.schemas(reference.key).map(tool=>tool.name));
  const missing=[...new Set([...expected,...required])].filter(name=>!actual.has(name));
  if(missing.length)throw new Error('原生工具挂载不完整：'+missing.join('、'));
  const presentation=toolWireView(tools,key).presentation,referencePresentation=toolWireView(tools,reference.key).presentation;
  if(presentation!==referencePresentation)throw new Error('工具展示方式与DSH标准预设不一致');
  return {ready:true,standardCount:expected.size,visibleCount:actual.size,toolNames:[...actual].sort(),presentation};
}
export function nativeComposerDefinition(registry){return composerDefinition(nativeStandardPlugins(registry));}
export const composerRequiredTools=requiredComposerTools;

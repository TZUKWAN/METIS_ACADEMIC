/** Ordered projection of real project facts into spatial research stations. */
import {RESEARCH_SPACE,layoutResearchSpace,spatialCircuitEdges,spatialNodeSize} from './research-space.js';
import {finalResearchResult,researchArtState} from './research-art-direction.js';
const brief=(value,max=360)=>typeof value==='string'?value.slice(0,max):'';
const statusNames={running:'执行中',succeeded:'已完成',completed:'已完成',failed:'失败',refused:'未执行',cancelled:'已停止',interrupted:'已中断',waiting:'后台处理中',unverified:'待确认',needs_revision:'需改进',deferred:'待后台任务',recorded:'已登记'};
export const RESEARCH_GRID=Object.freeze({columns:10,gapX:5.6,gapY:5.05,top:1.8});
export const networkKinds={engine:'研究总览',step:'研究阶段',call:'执行动作',review:'目标核验',artifact:'交付文件',delivery:'文字交付'};
export function networkEntitySize(node){return spatialNodeSize(node);}
export function layoutResearchNetwork(nodes){
  return layoutResearchSpace(nodes);
}
/** Display ownership may inherit a recorded root call, never the current pointer. */
export function researchCallOwners(activities,stepIds){
  const known=new Set(stepIds),calls=new Map((activities||[]).filter(row=>typeof row.callId==='string'&&row.callId).map(row=>[row.callId,row])),owners=new Map();
  function resolve(id,visited=new Set()){
    if(owners.has(id))return owners.get(id);
    const call=calls.get(id);if(!call||visited.has(id))return {stepId:null,source:'unassigned'};
    let value;
    if(call.stepId)value={stepId:known.has(call.stepId)?call.stepId:null,source:known.has(call.stepId)?'step-record':'unknown-step'};
    else if(call.rootCallId&&call.rootCallId!==id){const parent=resolve(call.rootCallId,new Set([...visited,id]));value={stepId:parent.stepId,source:parent.stepId?'root-call':'unassigned'};}
    else value={stepId:null,source:'unassigned'};
    owners.set(id,value);return value;
  }
  for(const id of calls.keys())resolve(id);return owners;
}
export function buildResearchNetwork(model,{scope='all',expandedStepId=null,recordPage=0,pinnedId=null,actionId=null,overview=false}={}){
  const nodes=[],edges=[],byId=new Map(),workflow=model?.nodes||[],steps=new Map(workflow.map(step=>[step.id,step])),artifacts=[];
  const owners=researchCallOwners(model?.activities||[],steps.keys()),localIndices=new Map();
  const add=(id,kind,title,detail,extra={},visible=true)=>{
    if(byId.has(id))return byId.get(id);
    const node={id,kind,title:brief(title,160),detail:detail||'',stepId:null,origin:'runtime',status:'configured',active:false,...extra};
    byId.set(id,node);if(visible)nodes.push(node);return node;
  };
  const link=(source,target,kind)=>{if(source!==target&&byId.has(source)&&byId.has(target))edges.push({id:source+'>'+target,source,target,kind,active:byId.get(target).active});};
  if(workflow.length)add('engine','engine',model.name||'METIS',model.headline||'',{status:model.phase,statusLabel:({ready:'待继续',processing:'处理中',running:'执行中',waiting:'待确认',attention:'需处理',stopped:'已停止',completed:'已交付'})[model.phase]||'',modeName:model.modeName,ports:[]});
  for(const step of workflow){
    const id='step:'+step.id,ports=[];
    if(scope==='all')for(const skill of step.skills||[])ports.push({kind:'skill',id:skill.id,title:skill.name||skill.id});
    const stage=add(id,'step',step.title,step.purpose||step.expected,{stepId:step.id,index:step.index,origin:'workflow',status:step.status,statusLabel:step.label,active:step.active,viewed:step.viewed,skills:step.skills,loop:step.loop,ports,prohibitions:step.prohibitions,executionBrief:step.executionBrief,expected:step.expected||''});
    if(step.index===0)link('engine',id,'sequence');else link('step:'+workflow[step.index-1].id,id,'sequence');
    for(const file of step.artifacts||[]){
      if(!Number.isSafeInteger(file.index)||file.index<0)continue;
      const artifact=add('artifact:'+step.id+':'+file.index,'artifact',file.name,file.path,{stepId:step.id,origin:'delivery',status:'recorded',statusLabel:'已登记',availability:file.availability,fileIndex:file.index,file},true);
      artifacts.push(artifact);ports.push({kind:'artifact',id:artifact.id,title:file.name,availability:file.availability});link(stage.id,artifact.id,'delivery');
    }
    if(step.delivery?.text){
      const delivery=add('delivery:'+step.id,'delivery','文字交付',step.delivery.text,{stepId:step.id,origin:'delivery',status:'recorded',statusLabel:'已登记',at:step.delivery.at},!(step.artifacts||[]).length);
      if(!(step.artifacts||[]).length)ports.push({kind:'delivery',id:delivery.id,title:'文字交付'});
    }
  }
  for(const [activityIndex,call]of(model?.activities||[]).entries()){
    if(typeof call.callId!=='string'||!call.callId||byId.has('call:'+call.callId))continue;
    const owner=owners.get(call.callId),stepId=owner?.stepId||null,stage=steps.get(stepId),kind=call.kind==='review'?'review':'call',childIndex=localIndices.get(stepId)||0;localIndices.set(stepId,childIndex+1);
    add('call:'+call.callId,kind,call.label||call.tool||'执行动作',call.target||call.label||'',{stepId,ownerSource:owner?.source||'unassigned',ownerTitle:stage?.title||'项目整体',ownerIndex:stage?.index??null,childIndex,origin:'activity',status:call.status,statusLabel:statusNames[call.status]||call.status,active:call.status==='running'&&call.invoked!==false,activityIndex,callId:call.callId,call,tool:call.tool,at:call.startedAt||call.finishedAt||null,ports:[]});
  }
  for(const call of model?.activities||[]){
    const id='call:'+call.callId,root='call:'+call.rootCallId;if(!byId.has(id))continue;
    const node=byId.get(id);link(root!==id&&byId.has(root)&&byId.get(root).stepId===node.stepId?root:node.stepId?'step:'+node.stepId:'engine',id,'execution');
    for(const file of artifacts)if(file.detail===call.target)link(id,file.id,'reference');
  }
  for(const step of workflow){
    const at=Date.parse(step.delivery?.at);if(!Number.isFinite(at))continue;
    const delivery=(model.activities||[]).findLast(call=>call.stepId===step.id&&call.kind==='delivery'&&call.status==='succeeded'&&Date.parse(call.startedAt)<=at&&Date.parse(call.finishedAt)>=at);
    if(delivery){const entry=byId.get('call:'+delivery.callId);if(entry)entry.ports=(byId.get('step:'+step.id)?.ports||[]).filter(port=>port.kind!=='skill');}
  }
  nodes.forEach((node,index)=>{node.slot=index;node.statusLabel??=statusNames[node.status]||node.status||'';});
  const running=(model?.activities||[]).findLast(call=>call.status==='running'&&call.invoked!==false);
  const waiting=(model?.activities||[]).findLast(call=>call.status==='waiting'&&call.jobId&&call.invoked!==false);
  const current=steps.get(model?.currentStepId),processing=model?.phase==='processing'&&current?.status!=='submitted';
  const recent=(model?.activities||[]).findLast(call=>owners.get(call.callId)?.stepId===model?.currentStepId);
  const live=model?.live?.active,liveStage=live?.stepId?steps.get(live.stepId):null;
  const modelAnchor=live?.kind==='model'?(liveStage?(model.activities||[]).findLast(call=>owners.get(call.callId)?.stepId===liveStage.id):null):null;
  const activeId=running?'call:'+running.callId:waiting?'call:'+waiting.callId:processing?(live?.kind==='model'?(modelAnchor?'call:'+modelAnchor.callId:liveStage?'step:'+liveStage.id:'engine'):recent?'call:'+recent.callId:'step:'+current?.id):null;
  // History remains intact in byId/fullNodes. Only one small, explicitly
  // selected page is materialised around its stage; file ports stay on stages.
  const fullNodes=nodes,activeNode=byId.get(activeId),requestedAction=byId.get(actionId)?.origin==='activity'?byId.get(actionId):null,explicitStage=steps.has(expandedStepId)?expandedStepId:null,projectScope=expandedStepId==='__project__';
  const expanded=!overview&&!!(explicitStage||projectScope||requestedAction||activeId||pinnedId),stageId=projectScope?null:explicitStage||requestedAction?.stepId||activeNode?.stepId||byId.get(pinnedId)?.stepId||null;
  const selectedAction=expanded&&requestedAction?.stepId===stageId?requestedAction:null;
  const records=fullNodes.filter(node=>node.origin==='activity'&&node.stepId===stageId),pages=Math.max(1,Math.ceil(records.length/RESEARCH_SPACE.visibleCalls)),selectedIndex=selectedAction?records.findIndex(node=>node.id===selectedAction.id):-1,page=Math.max(0,Math.min(pages-1,selectedIndex>=0?Math.floor((records.length-1-selectedIndex)/RESEARCH_SPACE.visibleCalls):Math.trunc(Number(recordPage)||0)));
  const end=Math.max(0,records.length-page*RESEARCH_SPACE.visibleCalls),start=Math.max(0,end-RESEARCH_SPACE.visibleCalls),disclosed=expanded?records.slice(start,end):[];
  const pinned=selectedAction||byId.get(pinnedId||activeId);
  if(expanded&&page===0&&pinned?.origin==='activity'&&pinned.stepId===stageId&&!disclosed.includes(pinned)){if(disclosed.length>=RESEARCH_SPACE.visibleCalls)disclosed.shift();disclosed.push(pinned);}
  for(const node of fullNodes.filter(node=>node.kind==='step')){const children=fullNodes.filter(item=>item.origin==='activity'&&item.stepId===node.stepId);node.childIds=children.map(item=>item.id);node.recentStatuses=children.slice(-6).map(item=>({id:item.id,status:item.status}));node.callCount=children.length;node.artifactCount=artifacts.filter(item=>item.stepId===node.stepId).length;node.active=!!node.active||children.some(item=>item.active);}
  const result=finalResearchResult(model,fullNodes);if(result)result.hero=true;
  const visibleNodes=fullNodes.filter(node=>['engine','step'].includes(node.kind)||disclosed.includes(node)||!expanded&&node===result);visibleNodes.forEach((node,index)=>node.displaySlot=index);
  const layout=layoutResearchNetwork(visibleNodes),circuitEdges=spatialCircuitEdges(visibleNodes);
  const level=!expanded?'overview':selectedAction?'action':'stage',selectedId=selectedAction?.id||null;
  const presentation={expanded,level,selectedId,stageId,page,pages,totalCalls:records.length,start:expanded&&records.length?start+1:0,end:expanded?end:0,key:[level,stageId||'',selectedId||'',page,disclosed.map(node=>node.id).join(',')].join('|')};
  return {nodes:visibleNodes,fullNodes,edges,circuitEdges,byId,positions:layout.positions,bounds:layout.bounds,mapBounds:layout.mapBounds,stations:layout.stations,presentation,artMode:researchArtState(model,{presentation,activeId}),heroId:!expanded?result?.id||null:null,layout:{columns:layout.columns,rows:layout.rows,kind:layout.kind,version:layout.version},scope,phase:model?.phase,activeId,
    latestId:running?'call:'+running.callId:(model?.activities||[]).length?'call:'+model.activities.at(-1).callId:current?'step:'+current.id:nodes[0]?.id||null,
    counts:{entities:fullNodes.length,visible:visibleNodes.length,stages:workflow.length,bindings:scope==='all'?workflow.reduce((sum,step)=>sum+(step.skills?.length||0),0):0,calls:fullNodes.filter(node=>node.origin==='activity').length,materials:(model?.activities||[]).filter(call=>call.kind==='read'&&call.target).length,artifacts:artifacts.length}};
}

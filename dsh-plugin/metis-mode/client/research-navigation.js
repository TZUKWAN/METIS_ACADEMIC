/** Visual navigation only; never changes the research executor or project pointer. */
import {RESEARCH_SPACE} from './research-space.js';
export function researchSelection(graph,id){
 const node=graph?.byId?.get(id);if(!node)return null;
 if(node.kind==='step')return{stageId:node.stepId,actionId:null,page:0,overview:false};
 if(node.kind==='engine')return{stageId:'__project__',actionId:null,page:0,overview:false};
 const stageId=node.stepId||'__project__';
 if(node.origin!=='activity')return{stageId,actionId:null,page:0,overview:false};
 const records=(graph.fullNodes||[]).filter(row=>row.origin==='activity'&&(row.stepId||'__project__')===stageId),index=records.findIndex(row=>row.id===node.id);
 return{stageId,actionId:node.id,page:index<0?0:Math.floor((records.length-1-index)/RESEARCH_SPACE.visibleCalls),overview:false};
}
export function researchViewOptions(model,settings,following){
 const graph=model?.network;
 if(following&&model?.phase!=='completed'){
  if(model?.phase==='processing'&&model.live?.active?.kind==='model'){
   const stepId=model.live.active.stepId;
   return{expandedStepId:graph?.byId.has('step:'+stepId)?stepId:'__project__',actionId:null,recordPage:0,overview:false};
  }
  const selected=researchSelection(graph,graph?.activeId||graph?.latestId);
  if(selected)return{expandedStepId:selected.stageId,actionId:selected.actionId,recordPage:selected.page,overview:false};
 }
 if(!settings?.stageId||settings.overview)return{overview:true};
 return{expandedStepId:settings.stageId,actionId:settings.actionId||null,recordPage:settings.page||0,overview:false};
}
export function researchScopeOpacity(node,view){
 if(!view?.expanded)return 1;
 const same=node.kind==='engine'?!view.stageId:node.stepId===view.stageId;
 if(!same)return 0;
 if(view.level!=='action')return 1;
 return node.id===view.selectedId?1:0;
}
export function researchScopeFrame(bounds){
 const result={minX:Infinity,maxX:-Infinity,minY:Infinity,maxY:-Infinity,minZ:Infinity,maxZ:-Infinity};
 for(const {point,size}of bounds){result.minX=Math.min(result.minX,point.x-size.w/2-.7);result.maxX=Math.max(result.maxX,point.x+size.w/2+.7);result.minY=Math.min(result.minY,point.y-size.h/2-.55);result.maxY=Math.max(result.maxY,point.y+size.h/2+.55);result.minZ=Math.min(result.minZ,point.z-.6);result.maxZ=Math.max(result.maxZ,point.z+.8);}
 return bounds.length?result:null;
}

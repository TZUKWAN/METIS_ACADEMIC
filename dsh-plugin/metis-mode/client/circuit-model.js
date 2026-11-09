/** Real editable templates and immutable project runs share one visual language. */
import {researchSceneState} from './project-scene-state.js';
import {buildResearchNetwork} from './research-network.js';

export function modeCircuitModel(mode,profile,skillEntries=[],selectedId=null,{dirty=false,busy=false}={}){
  const lookup=new Map(skillEntries.map(skill=>[skill.id,skill])),steps=profile?.steps||[];
  const output=profile?.output||{format:'auto',wordFormatting:''};
  const nodes=steps.map((step,index)=>{
    const bindings=(step.skills||[]).map(id=>({id,name:lookup.get(id)?.name||id}));
    const incomplete=!step.title?.trim()||!step.instruction?.trim();
    return{id:step.id,title:step.title||'新步骤',index,purpose:step.instruction||'',expected:step.deliverables||'',status:incomplete?'incomplete':'configured',label:incomplete?'待完善':'已配置',active:false,viewed:step.id===selectedId,loop:step.loop?.enabled===true,loopCriteria:step.loop?.criteria||'',skills:bindings,artifacts:[],delivery:null,feedback:[],recentCall:null,output:index===steps.length-1?output:null};
  });
  return{key:'mode:'+mode.id,id:mode.id,kind:'mode',editable:!busy,name:mode.name,modeName:mode.name,phase:busy?'saving':dirty?'draft':'configured',headline:busy?'正在保存流程':dirty?'更改已进入共享草稿':'选择节点开始编排',target:'节点、技能和循环直接修改当前模式；保存后供新项目使用。',nodes,activeCalls:[],activities:[],recent:null,total:nodes.length,bindingCount:nodes.reduce((sum,node)=>sum+node.skills.length,0),loopCount:nodes.filter(node=>node.loop).length,attention:nodes.filter(node=>node.status==='incomplete').length,delivered:null,files:null};
}

export function projectCircuitModel(project,selectedId=null){
  const actual=researchSceneState(project,selectedId);
  const model={...actual,key:'project:'+project.id,kind:'project',editable:false,currentStepId:project.currentStepId,nodes:actual.nodes.map(node=>{
    const recorded=project.steps.find(step=>step.id===node.id);
    return{...node,skills:Array.isArray(recorded.skillBindings)?recorded.skillBindings:null,executionBrief:recorded.executionBrief||null,prohibitions:recorded.prohibitions||'',loopCriteria:recorded.loopCriteria||'',artifacts:(node.delivery?.artifacts||[]).map((file,index)=>({...file,index,stepId:node.id})),output:node.index===actual.nodes.length-1?project.output||null:null};
  })};
  model.network=buildResearchNetwork(model);return model;
}

export function reorderCircuitSteps(steps,sourceId,targetId,edge='before'){
  if(sourceId===targetId)return steps;
  const source=steps.find(step=>step.id===sourceId),target=steps.find(step=>step.id===targetId);
  if(!source||!target)throw new Error('拖动的步骤不属于当前流程');
  const result=steps.filter(step=>step.id!==sourceId),position=result.findIndex(step=>step.id===targetId)+(edge==='after'?1:0);
  result.splice(position,0,source);return result;
}

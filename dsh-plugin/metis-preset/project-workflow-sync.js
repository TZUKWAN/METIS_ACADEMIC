/** Compare real frozen versions and carry actual progress into a new native session. */
import {createHash} from 'node:crypto';
const stable=value=>value&&typeof value==='object'?Array.isArray(value)?value.map(stable):Object.fromEntries(Object.keys(value).sort().filter(key=>value[key]!==undefined).map(key=>[key,stable(value[key])])):value;
const encoded=value=>JSON.stringify(stable(value));
const equal=(a,b)=>encoded(a)===encoded(b);
export const workflowHash=value=>createHash('sha256').update(encoded(value)).digest('hex');
export function projectExecutionState(registry,id){
  const root=registry?.get(id);if(!root)return {loaded:false,running:false,ownedRunning:0};
  const live=registry.list(),owned=new Set([root]);let size=-1;
  while(size!==owned.size){size=owned.size;for(const candidate of live)if(!owned.has(candidate)&&[...owned].some(owner=>registry.isOwnedBy(candidate.id,owner)))owned.add(candidate);}
  const ownedRunning=[...owned].filter(candidate=>candidate!==root&&candidate.status==='running').length;
  return {loaded:true,running:root.status==='running'||ownedRunning>0,ownedRunning};
}
export function workflowParts(version){
  const config=version?.payload?.plugins?.find(row=>row.name==='metis-academic-preset/step-skills')?.config;
  if(!config?.mode||!Array.isArray(config.profile?.steps)||!Array.isArray(config.resourceSkills||config.skills))throw new Error('模式版本缺少实际步骤或技能声明');
  return {mode:config.mode,profile:config.profile,skills:config.resourceSkills||config.skills};
}
const prompt=step=>Object.fromEntries(['prompt','systemPrompt','executionPrompt','reviewPrompt'].map(key=>[key,step[key]||'']));
function effective(step,profile,skills){
  return {instruction:step.instruction||'',deliverables:step.deliverables||'',prohibitions:step.prohibitions||'',prompt:prompt(step),loop:step.loop||{enabled:false},parameters:step.parameters||{},
    skills:(step.skills||[]).map(id=>{const skill=skills.find(row=>row.id===id);return {id,resources:skill?.resources||null,contentHash:workflowHash(skill?.content||''),invocation:skill?.invocation||null};}),
    modeRequirements:{systemPrompt:profile.systemPrompt||'',executionPrompt:profile.executionPrompt||'',reviewPrompt:profile.reviewPrompt||'',parameters:profile.parameters||{}},
    output:profile.steps.at(-1)?.id===step.id&&profile.output&&(profile.output.format&&profile.output.format!=='auto'||profile.output.wordFormatting?.trim())?profile.output:null};
}
const labels={instruction:'主要目的',deliverables:'交付内容',prohibitions:'禁止事项',prompt:'步骤提示词',loop:'达标循环',parameters:'执行参数',skills:'技能或技能版本',modeRequirements:'模式总要求',output:'输出格式或排版'};
export function workflowDifference(before,after){
  const old=workflowParts(before),next=workflowParts(after),previous=new Map(old.profile.steps.map((step,index)=>[step.id,{step,index}])),current=new Map(next.profile.steps.map((step,index)=>[step.id,{step,index}]));
  const changes=[];
  for(const [id,{step,index}]of current){
    const prior=previous.get(id);
    if(!prior){changes.push({stepId:id,title:step.title,type:'added',executionChanged:true,fields:['新增步骤'],index});continue;}
    const a=effective(prior.step,old.profile,old.skills),b=effective(step,next.profile,next.skills),fields=Object.keys(labels).filter(key=>!equal(a[key],b[key])).map(key=>labels[key]);
    const renamed=prior.step.title!==step.title,reordered=prior.index!==index;
    if(fields.length||renamed||reordered)changes.push({stepId:id,title:step.title,previousTitle:prior.step.title,type:'changed',executionChanged:!!fields.length,fields:[...fields,...(renamed?['步骤名称']:[]),...(reordered?['步骤顺序']:[])],index,previousIndex:prior.index});
  }
  for(const [id,{step,index}]of previous)if(!current.has(id))changes.push({stepId:id,title:step.title,type:'removed',executionChanged:true,fields:['删除步骤'],previousIndex:index});
  return {fromVersionId:before.id,toVersionId:after.id,fromHash:before.hash,toHash:after.hash,modeId:next.mode.id,modeName:next.mode.name,changed:before.hash!==after.hash,
    modeRenamed:old.mode.name!==next.mode.name,descriptionChanged:old.mode.description!==next.mode.description,changes,added:changes.filter(row=>row.type==='added').length,removed:changes.filter(row=>row.type==='removed').length,modified:changes.filter(row=>row.type==='changed'&&row.executionChanged).length};
}
export function migrateWorkflowRecord(source,{sessionId,scope,mode,profile,difference,updateId,fromSessionId,fromVersionId,toVersionId,at=new Date().toISOString()}){
  const affected=new Set(difference.changes.filter(row=>row.executionChanged).map(row=>row.stepId)),steps={};
  for(const step of profile.steps){
    const old=source.steps?.[step.id];if(!old){steps[step.id]={status:'not_started',iteration:0,nativeCalls:[],pendingJobs:[]};continue;}
    const item=structuredClone(old);
    if(item.pendingJobs?.length)throw new Error('仍有后台任务待确认，不能迁移步骤状态');
    if(affected.has(step.id)){
      steps[step.id]={status:item.delivery?'needs_revision':'working',iteration:0,nativeCalls:[],pendingJobs:[],
        ...(item.delivery?{delivery:{...item.delivery,configurationVersionId:item.delivery.configurationVersionId||fromVersionId},modeUpdate:{updateId,fromVersionId,toVersionId,reason:'执行要求已更新；原交付保留，不作为新版达标'}}:{})};
    }else{
      if(item.status==='checking')throw new Error('核验仍在进行，不能迁移');
      if(item.delivery)item.delivery.configurationVersionId??=fromVersionId;
      delete item.continuedReview;steps[step.id]=item;
    }
  }
  const first=profile.steps.find(step=>steps[step.id].status!=='submitted')||profile.steps.at(-1);
  return {version:1,sessionId,scope,currentStepId:first?.id||null,steps,cost:structuredClone(source.cost||null),updatedAt:at,
    workflowHandoff:{updateId,fromSessionId,fromVersionId,toVersionId,at,modeId:mode.id},activity:[],activitySequence:0};
}
export function workflowFragment(version,{stepId,offset=0,maxChars=6000}={}){
  if(!Number.isSafeInteger(offset)||offset<0||!Number.isSafeInteger(maxChars)||maxChars<1||maxChars>6000)throw new Error('模式读取分页无效');
  const {mode,profile,skills}=workflowParts(version);
  const value=stepId?profile.steps.find(step=>step.id===stepId):{mode,systemPrompt:profile.systemPrompt||'',executionPrompt:profile.executionPrompt||'',reviewPrompt:profile.reviewPrompt||'',parameters:profile.parameters||{},output:profile.output||{},steps:profile.steps.map(step=>({id:step.id,title:step.title,skills:step.skills||[]}))};
  if(!value)throw new Error('此版本没有该步骤');
  const body=JSON.stringify(value);return {versionId:version.id,versionHash:version.hash,stepId:stepId||null,offset,text:body.slice(offset,offset+maxChars),characters:body.length,nextOffset:offset+maxChars<body.length?offset+maxChars:null,skillBodiesLoaded:false};
}

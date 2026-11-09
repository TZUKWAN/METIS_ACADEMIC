import {modes} from './modes.js';
import {validateProfile,compileStep,stepSkillName,stageBindings} from './profiles.js';
import {emptyConfiguration,skillDocument} from './configuration.js';
import {registerProgressiveLibrary} from './progressive-skills.js';

export const name='metis-step-skills';
export const inject=['skills','tools'];
export function frozenStepDefinitions(mode,profile,skills,options={progressive:true}){return profile.steps.map((step,index)=>{
  const stages=stageBindings(step);
  return {name:stepSkillName(step),description:`${mode.name}第${index+1}步：${step.title}。${stages.length?'关联'+stages.join('、'):'自由步骤'}，按需加载。`,whenToUse:`当前模式为${mode.id}，按配置顺序执行到本步${stages.length?'，或正在处理关联阶段'+stages.join('、'):''}时加载。`,invocation:{modelInvocable:true,userInvocable:false},content:compileStep(mode,profile,step.id,null,skills,options).prompt};
});}
export function apply(ctx,config){
  const mode=config.mode||modes.find(mode=>mode.id===config.modeId);
  if(!mode)throw new Error('Unknown METIS mode for step skills');
  const skills=config.skills||config.profile.skills.map(id=>skillDocument(id,emptyConfiguration()));
  const profile=config.legacyEmbedded?config.profile:validateProfile(config.profile,{configuration:null,skillSnapshot:skills});
  if(!Array.isArray(profile?.steps)||profile.steps.length>20)throw new Error('Frozen METIS step declaration is invalid');
  const progressive=config.disclosure==='progressive-v1';
  const goalExecution=config.execution==='native-goal-loop-v1';
  const nativeExecution=goalExecution||config.execution==='native-on-demand-v1';
  if(progressive)registerProgressiveLibrary(ctx,mode,profile,skills,{nativeExecution,goalExecution});
  for(const skill of skills)if(!progressive||skill.invocation?.userInvocable)ctx.effect(()=>ctx.skills.register({name:'metis-library-'+skill.id,description:skill.description,whenToUse:skill.whenToUse||'仅在当前步骤绑定该技能时加载。',invocation:progressive?{modelInvocable:false,userInvocable:true}:skill.invocation||{modelInvocable:true,userInvocable:false},provider:'metis-mode-library',source:'preset:'+mode.id,content:skill.content,path:skill.path,resourceBase:{kind:'directory',path:skill.root}}),'metis: pinned skill '+skill.id);
  const definitions=config.frozenSteps||frozenStepDefinitions(mode,profile,skills,{progressive,nativeExecution,goalExecution});
  if(!Array.isArray(definitions)||definitions.length!==profile.steps.length||definitions.some((definition,index)=>definition.name!==stepSkillName(profile.steps[index])||typeof definition.content!=='string'||typeof definition.description!=='string'||!definition.description))throw new Error('Frozen METIS instructions do not match the recorded steps');
  for(const definition of definitions){
    ctx.effect(()=>ctx.skills.register({
      ...definition,
      provider:'metis-mode-steps',source:'preset:'+mode.id,
    }),'metis: scoped frozen step '+definition.name);
  }
}

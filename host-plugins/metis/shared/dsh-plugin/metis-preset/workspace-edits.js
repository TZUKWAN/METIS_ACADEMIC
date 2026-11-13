import {randomUUID} from 'node:crypto';
import {ConfigurationError,clone,own,fingerprint,assertKeys,validateMode,validateConfiguration,configurationModes,configurationSkills,skillDocument,readConfiguration,skillId} from './configuration.js';
import {defaultProfile,modeProfile,validateProfile,engineStages,validateOutput,profileOutput,editableStep} from './profiles.js';
import {createSkill,updateSkill,importSkill,resourceDetails} from './skill-packages.js';
import {libraryInfo,libraryMetadata,readCatalogSkill,searchSkillMetadata,primeLibrarySkills} from './skill-library.js';

export const blankProfile=()=>({systemPrompt:'',executionPrompt:'',reviewPrompt:'',skills:[],steps:[],parameters:{language:'zh-CN'}});
const stepFields=['title','instruction','deliverables','prompt','prohibitions','loop','skills','stages','systemPrompt','executionPrompt','reviewPrompt','parameters'];
const stepParams=['language','outputFormat','tasksPerTurn'];
const modeFields=['name','description','artifact','paradigm','guidance','order'];
const modeParams=['language'];
const findMode=(id,document)=>{const value=configurationModes(document).find(mode=>mode.id===id);if(!value)throw new ConfigurationError('模式不存在或已删除：'+String(id));return value;};
export function normalizeConfiguration(raw,{allowEmpty=true}={}){
  const document=validateConfiguration(raw);
  for(const mode of configurationModes(document))document.profiles[mode.id]=modeProfile(mode,{profiles:document.profiles},document,{allowEmpty});
  return document;
}
export function withDraftProfiles(raw,drafts={}){
  const document=clone(raw);if(!drafts||typeof drafts!=='object'||Array.isArray(drafts))throw new ConfigurationError('模式草稿无效');
  for(const [id,record]of Object.entries(drafts)){
    findMode(id,document);assertKeys(record,['profile','baseRevision'],'模式草稿');const previous=own(document.profiles,id);
    if(record.baseRevision!==(previous?.revision||0))throw new ConfigurationError('模式草稿版本冲突：'+id,409);
    document.profiles[id]={profile:clone(record.profile),revision:previous?.revision||0,updatedAt:previous?.updatedAt||null};
  }
  return normalizeConfiguration(document);
}
export function workspaceSnapshot(raw=readConfiguration()){
  const document=normalizeConfiguration(raw),modes=configurationModes(document),skills=configurationSkills(document),available=new Set(skills.map(item=>item.id));
  const defaults=Object.fromEntries(modes.map(mode=>{const profile=defaultProfile(mode);profile.steps=profile.steps.map(step=>({...step,skills:step.skills.filter(id=>available.has(id))}));profile.skills=[...new Set([...(available.has('metis-core')?['metis-core']:[]),...profile.steps.flatMap(step=>step.skills)])];return [mode.id,profile];}));
  const bound=new Set(modes.flatMap(mode=>document.profiles[mode.id].profile.skills)),visibleSkills=skills.filter(skill=>!skill.library||skill.managed||bound.has(skill.id));
  return {schemaVersion:2,loadingStrategy:'progressive-step-library',capabilities:{flexibleSteps:true,minSteps:1,maxSteps:20,optionalStageBindings:true,configurationWorkspace:true,skillPackages:true,modeManagement:true,modeReordering:true,progressiveLibrary:true,simpleStepEditor:true,finalOutput:true,sharedDraft:true,goalLoops:true,runtimeProgress:true},configuration:document,engineStages,modes,skills:visibleSkills,library:libraryInfo(),profiles:Object.fromEntries(modes.map(mode=>[mode.id,document.profiles[mode.id]])),defaults,archivedSkills:document.deletedSkills.map(id=>({id,description:own(document.skills,id)?.description||id}))};
}
export function workspaceContext(id,profile,raw,drafts){
  const document=withDraftProfiles(raw||readConfiguration(),drafts||{}),modes=configurationModes(document);
  const mode=id?findMode(id,document):{id:null,name:'METIS配置工作区',artifact:null,paradigm:null,description:'尚未选择模式，可以创建模式和管理技能库。'};
  if(id&&profile)document.profiles[id]={...document.profiles[id],profile:validateProfile(profile,{allowEmpty:true,configuration:document})};
  return {mode,profile:id?document.profiles[id].profile:blankProfile(),configuration:document,modes,skills:configurationSkills(document),library:libraryInfo(),engineStages};
}
export async function applyWorkspaceEdits(input,selectedId,edits,{authorization='',signal}={}){
  if(!Array.isArray(edits)||!edits.length||edits.length>50)throw new ConfigurationError('每次需包含1至50个配置操作');
  const selectedSkills=[];
  const collect=value=>{if(!value||typeof value!=='object')return;if(Array.isArray(value)){for(const item of value)collect(item);return;}if(typeof value.skillId==='string')selectedSkills.push(value.skillId);if(Array.isArray(value.skills))selectedSkills.push(...value.skills.filter(id=>typeof id==='string'));for(const item of Object.values(value))if(item&&typeof item==='object')collect(item);};
  collect(edits);await primeLibrarySkills(selectedSkills.filter(id=>!own(input.skills,id)),{signal});
  const document=clone(input);let selection=selectedId;
  for(const edit of edits){
    signal?.throwIfAborted();if(!edit||typeof edit!=='object')throw new ConfigurationError('配置操作无效');
    if(edit.type==='create_mode'){
      assertKeys(edit,['type','mode','copyFromId','profile'],'新建模式');const mode=validateMode(edit.mode);
      if(configurationModes(document).some(item=>item.id===mode.id)||own(document.modes,mode.id))throw new ConfigurationError('模式ID已存在，请使用新的ID');
      const copied=edit.copyFromId?clone(document.profiles[findMode(edit.copyFromId,document).id].profile):null;
      const profile=clone(edit.profile||copied||defaultProfile(mode));
      if(!edit.profile&&!copied){const available=new Set(configurationSkills(document).filter(skill=>skill.invocation.modelInvocable).map(skill=>skill.id));profile.steps=profile.steps.map(step=>({...step,skills:step.skills.filter(id=>available.has(id))}));profile.skills=profile.skills.filter(id=>available.has(id));}
      document.deletedModes=document.deletedModes.filter(id=>id!==mode.id);
      document.modes[mode.id]=mode;document.profiles[mode.id]={profile,revision:0,updatedAt:null};selection=mode.id;
    }else if(edit.type==='update_mode'){
      assertKeys(edit,['type','modeId','patch'],'模式修改');assertKeys(edit.patch,modeFields,'模式字段');const old=findMode(edit.modeId,document);
      document.modes[old.id]=validateMode(Object.fromEntries(['id',...modeFields].map(key=>[key,key in edit.patch?edit.patch[key]:key==='order'?old.order??10:old[key]]).filter(([,value])=>value!==undefined)));
    }else if(edit.type==='reorder_modes'){
      assertKeys(edit,['type','modeIds'],'模式排序');const active=configurationModes(document),byId=new Map(active.map(mode=>[mode.id,mode])),ids=edit.modeIds;
      if(!Array.isArray(ids)||ids.length!==active.length||ids.some(id=>typeof id!=='string'||!byId.has(id))||new Set(ids).size!==active.length)throw new ConfigurationError('排序需包含全部活动模式且不能重复，模式列表可能已变化，请重新读取',409);
      ids.forEach((id,index)=>{
        const mode=byId.get(id),order=10+index*10;if((mode.order??10)===order)return;
        document.modes[id]=validateMode(Object.fromEntries(['id',...modeFields].map(key=>[key,key==='order'?order:mode[key]]).filter(([,value])=>value!==undefined)));
      });
    }else if(edit.type==='delete_mode'){
      assertKeys(edit,['type','modeId'],'删除模式');const mode=findMode(edit.modeId,document);
      delete document.modes[mode.id];delete document.profiles[mode.id];delete document.modeArchives[mode.id];
      if(mode.builtin)document.deletedModes.push(mode.id);
      if(selection===mode.id)selection=null;
    }else if(edit.type==='create_skill'){
      assertKeys(edit,['type','skill'],'创建技能');skillId(edit.skill?.id);if(configurationSkills(document).some(item=>item.id===edit.skill.id)||own(document.skills,edit.skill.id)||document.deletedSkills.includes(edit.skill.id))throw new ConfigurationError('技能ID已存在，请修改或恢复');
      const skill=createSkill(edit.skill);document.skills[skill.id]=skill;
    }else if(edit.type==='install_skill'){
      assertKeys(edit,['type','id','source','replace'],'安装技能');const skill=await importSkill(edit.source,edit.id,authorization,signal);
      if((configurationSkills(document).some(item=>item.id===skill.id)||own(document.skills,skill.id))&&!edit.replace)throw new ConfigurationError('该技能已存在，替换安装需明确replace:true');
      document.skills[skill.id]=skill;document.deletedSkills=document.deletedSkills.filter(id=>id!==skill.id);
    }else if(edit.type==='update_skill'){
      assertKeys(edit,['type','skillId','patch','files'],'修改技能');const patch=clone(edit.patch||{});let files=edit.files;
      if(Object.hasOwn(patch,'files')){if(files!==undefined)throw new ConfigurationError('技能资源files不能同时放在操作和patch中，请只保留一处');files=patch.files;delete patch.files;}
      const skill=updateSkill(edit.skillId,patch,files,document);document.skills[skill.id]=skill;
    }else if(edit.type==='delete_skill'){
      assertKeys(edit,['type','skillId','detach'],'删除技能');skillDocument(edit.skillId,document);
      for(const mode of configurationModes(document)){
        const profile=document.profiles[mode.id].profile,used=profile.steps.filter(step=>step.skills.includes(edit.skillId));
        if(used.length&&!edit.detach)throw new ConfigurationError('技能仍被'+mode.name+'的步骤引用，请先解绑或明确detach:true');
        if(edit.detach)profile.steps=profile.steps.map(step=>({...step,skills:step.skills.filter(id=>id!==edit.skillId)}));
        profile.skills=profile.skills.filter(id=>id!==edit.skillId);
      }
      document.deletedSkills.push(edit.skillId);
    }else if(edit.type==='restore_skill'){
      assertKeys(edit,['type','skillId'],'恢复技能');skillId(edit.skillId);if(!document.deletedSkills.includes(edit.skillId))throw new ConfigurationError('技能不在归档中');skillDocument(edit.skillId,document,{archived:true});document.deletedSkills=document.deletedSkills.filter(id=>id!==edit.skillId);
    }else{
      const id=edit.modeId||selection;findMode(id,document);const profile=document.profiles[id].profile;
      if(['add_step','remove_step','move_step'].includes(edit.type)&&profile.output===undefined)profile.output=profileOutput(profile);
      const position=stepId=>{const found=profile.steps.findIndex(step=>step.id===stepId);if(found<0)throw new ConfigurationError('步骤不存在：'+String(stepId));return found;};
      if(edit.type==='add_step'){
        assertKeys(edit,['type','modeId','afterStepId','step'],'新增步骤');assertKeys(edit.step,['id',...stepFields],'步骤');if(edit.step.parameters!==undefined)assertKeys(edit.step.parameters,stepParams,'步骤参数');
        const step={id:edit.step.id||'step-'+randomUUID(),skills:[],stages:[],systemPrompt:'',executionPrompt:'',reviewPrompt:'',...edit.step,parameters:{language:'inherit',outputFormat:'task',tasksPerTurn:1,...edit.step.parameters}};
        profile.steps.splice(edit.afterStepId===undefined?profile.steps.length:edit.afterStepId===null?0:position(edit.afterStepId)+1,0,step);
      }else if(edit.type==='update_step'){
        assertKeys(edit,['type','modeId','stepId','patch'],'步骤修改');assertKeys(edit.patch,stepFields,'步骤字段');if(edit.patch.parameters!==undefined)assertKeys(edit.patch.parameters,stepParams,'步骤参数');const at=position(edit.stepId),old=profile.steps[at];
        if(old.prompt!==undefined&&edit.patch.prompt===undefined&&['systemPrompt','executionPrompt','reviewPrompt'].some(key=>key in edit.patch))throw new ConfigurationError('该步骤使用统一步骤提示词，请先读取本步，再修改patch.prompt；不再拆成三类提示词');
        profile.steps[at]={...old,...edit.patch,...(edit.patch.loop!==undefined?{loop:{enabled:old.loop?.enabled??false,criteria:old.loop?.criteria||'',...edit.patch.loop}}:{}),parameters:{...old.parameters,...edit.patch.parameters}};
      }else if(edit.type==='bind_skill'||edit.type==='unbind_skill'){
        assertKeys(edit,['type','modeId','stepId','skillId'],'步骤技能绑定');const step=profile.steps[position(edit.stepId)];skillId(edit.skillId);
        if(edit.type==='bind_skill'){const metadata=configurationSkills(document).find(skill=>skill.id===edit.skillId);if(!metadata||!metadata.invocation.modelInvocable)throw new ConfigurationError('技能不存在或不允许模型调用');step.skills=[...new Set([...step.skills,edit.skillId])];}
        else step.skills=step.skills.filter(id=>id!==edit.skillId);
      }else if(edit.type==='remove_step'){
        assertKeys(edit,['type','modeId','stepId'],'删除步骤');profile.steps.splice(position(edit.stepId),1);
      }else if(edit.type==='move_step'){
        assertKeys(edit,['type','modeId','stepId','beforeStepId'],'移动步骤');if(edit.stepId===edit.beforeStepId)throw new ConfigurationError('步骤不能移动到自身');const [item]=profile.steps.splice(position(edit.stepId),1);profile.steps.splice(edit.beforeStepId===null?profile.steps.length:position(edit.beforeStepId),0,item);
      }else if(edit.type==='set_mode_parameters'){
        assertKeys(edit,['type','modeId','parameters'],'模式参数');assertKeys(edit.parameters,modeParams,'模式参数字段');profile.parameters={...profile.parameters,...edit.parameters};
      }else if(edit.type==='set_output'){
        assertKeys(edit,['type','modeId','output'],'最终交付格式');assertKeys(edit.output,['format','wordFormatting'],'最终交付设置');profile.output=validateOutput({...profileOutput(profile),...edit.output});
      }else if(edit.type==='set_controller'){
        assertKeys(edit,['type','modeId','systemPrompt'],'总控修改');profile.systemPrompt=boundedController(edit.systemPrompt);
      }else throw new ConfigurationError('未知配置操作：'+String(edit.type));
      if(profile.steps.length>20)throw new ConfigurationError('步骤超过20项');
    }
  }
  const active=configurationModes(document),available=new Set(configurationSkills(document).map(skill=>skill.id));
  for(const mode of active){const profile=document.profiles[mode.id].profile;profile.skills=[...new Set([...(available.has('metis-core')?['metis-core']:[]),...profile.steps.flatMap(step=>step.skills)])];}
  const normalized=normalizeConfiguration(document);return {configuration:normalized,selectedModeId:active.some(mode=>mode.id===selection)?selection:active[0]?.id||null};
}
function boundedController(value){if(typeof value!=='string'||!value.trim()||value.length>2000)throw new ConfigurationError('简短总控需为不超过2000字的非空文本');return value;}
export async function readConfigurationItem(request,document,{signal}={}){
  signal?.throwIfAborted();
  assertKeys(request,['kind','id','path','query','source','offset','limit','maxChars','fileOffset','fileLimit','metadataOnly','invocableOnly','stepId'],'配置读取');
  if(request.kind==='skill-search')return searchSkillMetadata(configurationSkills(document),request);
  if(request.kind==='skill'){
    const metadata=configurationSkills(document).find(skill=>skill.id===request.id);
    if(request.metadataOnly){if(!metadata)throw new ConfigurationError('技能不存在或已删除',404);return metadata;}
    if(libraryMetadata(request.id)&&!own(document.skills,request.id)&&!document.deletedSkills.includes(request.id))return readCatalogSkill(request.id,{...request,signal});
    return resourceDetails(request.id,document,request.path,{...request,signal,archived:document.deletedSkills.includes(request.id)});
  }
  if(request.kind==='mode'){
    const mode=findMode(request.id,document),profile=document.profiles[mode.id]?.profile||defaultProfile(mode);
    if(request.stepId){const step=profile.steps.find(step=>step.id===request.stepId);if(!step)throw new ConfigurationError('该模式没有此步骤',404);if(request.metadataOnly){const offset=request.offset??0,limit=request.limit??12;if(!Number.isInteger(offset)||offset<0||!Number.isInteger(limit)||limit<1||limit>30)throw new ConfigurationError('步骤绑定分页无效');return {mode:{id:mode.id,name:mode.name},stepId:step.id,title:step.title,skillIds:step.skills.slice(offset,offset+limit),total:step.skills.length,nextOffset:offset+limit<step.skills.length?offset+limit:null};}return {mode,step:editableStep(step),finalStep:step.id===profile.steps.at(-1)?.id,output:profileOutput(profile)};}
    return {mode,output:profileOutput(profile),systemPrompt:profile.systemPrompt,steps:profile.steps.map(({id,title,instruction,deliverables,stages,skills})=>({id,title,instruction:instruction.slice(0,400),deliverables:deliverables?.slice(0,400)||'',stages,skillsCount:skills.length}))};
  }
  throw new ConfigurationError('只可读取当前配置中的模式或技能');
}
const show=value=>value===undefined?'（无）':typeof value==='string'?value:JSON.stringify(value,null,2);
export function configurationChanges(before,after){
  const changes=[],oldModes=configurationModes(before),newModes=configurationModes(after);
  for(const id of new Set([...oldModes.map(mode=>mode.id),...newModes.map(mode=>mode.id)])){
    const old=oldModes.find(mode=>mode.id===id),next=newModes.find(mode=>mode.id===id);
    if(fingerprint(old||null)!==fingerprint(next||null))changes.push({title:(old?next?'修改模式 · ':'删除模式 · ':'新增模式 · ')+(next?.name||old.name),fields:[{label:'模式设置',before:show(old),after:show(next)}]});
    const previous=old?before.profiles[id].profile:blankProfile(),profile=next?after.profiles[id].profile:blankProfile();
    if(fingerprint(previous.steps.map(step=>step.id))!==fingerprint(profile.steps.map(step=>step.id)))changes.push({title:(next?.name||old.name)+' · 步骤顺序',fields:[{label:'步骤列表',before:previous.steps.map(step=>step.title).join('\n'),after:profile.steps.map(step=>step.title).join('\n')}]});
    for(const stepId of new Set([...previous.steps.map(step=>step.id),...profile.steps.map(step=>step.id)])){
      const a=previous.steps.find(step=>step.id===stepId),b=profile.steps.find(step=>step.id===stepId),fields=stepFields.filter(key=>fingerprint(a?.[key]??null)!==fingerprint(b?.[key]??null)).map(key=>({label:key,before:show(a?.[key]),after:show(b?.[key])}));
      if(fields.length)changes.push({title:(next?.name||old.name)+' / '+(b?.title||a.title),fields});
    }
    for(const key of ['systemPrompt','parameters','output'])if(fingerprint(previous[key]??null)!==fingerprint(profile[key]??null))changes.push({title:(next?.name||old.name)+' · '+key,fields:[{label:key==='output'?'最终交付格式与Word排版要求':key,before:show(previous[key]),after:show(profile[key])}]});
  }
  const a=configurationSkills(before),b=configurationSkills(after),editedSkills=new Set([...Object.keys(before.skills),...Object.keys(after.skills),...before.deletedSkills,...after.deletedSkills]);
  for(const id of editedSkills){
    if(fingerprint(own(before.skills,id)??null)===fingerprint(own(after.skills,id)??null)&&before.deletedSkills.includes(id)===after.deletedSkills.includes(id))continue;
    const old=a.some(skill=>skill.id===id)?skillDocument(id,before):null,next=b.some(skill=>skill.id===id)?skillDocument(id,after):null;
    const fields=['description','content','whenToUse','invocation','packageHash','source'].filter(key=>fingerprint(old?.[key]??null)!==fingerprint(next?.[key]??null)).map(key=>({label:key,before:show(old?.[key]),after:show(next?.[key])}));
    if(fields.length)changes.push({title:(old?next?'修改技能 · ':'删除技能 · ':'新增/安装/恢复技能 · ')+id,fields});
  }
  for(const key of ['deletedModes','deletedSkills'])if(fingerprint(before[key])!==fingerprint(after[key]))changes.push({title:key==='deletedModes'?'模式删除记录':'技能归档目录',fields:[{label:key==='deletedModes'?'删除记录':'归档记录',before:show(before[key]),after:show(after[key])}]});
  for(const key of ['modes','skills','profiles','modeArchives'])for(const id of new Set([...Object.keys(before[key]),...Object.keys(after[key])])){
    const visible=key==='skills'?a.some(item=>item.id===id)||b.some(item=>item.id===id):oldModes.some(item=>item.id===id)||newModes.some(item=>item.id===id);
    if(!visible&&fingerprint(own(before[key],id)??null)!==fingerprint(own(after[key],id)??null))changes.push({title:'归档配置更新 · '+id,fields:[{label:key,before:show(own(before[key],id)),after:show(own(after[key],id))}]});
  }
  return changes;
}

import {existsSync,readFileSync,readdirSync,writeFileSync,renameSync,mkdirSync,unlinkSync,openSync,closeSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {homedir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {randomUUID,createHash} from 'node:crypto';
import {modes as bundledModes} from './modes.js';
import {librarySkills,libraryMetadata,librarySkillDocument,isLibraryPackage,packageLibraryRecord} from './skill-library.js';

export class ConfigurationError extends Error{constructor(message,status=400){super(message);this.status=status;}}
export const clone=value=>JSON.parse(JSON.stringify(value));
export const fingerprint=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
export const own=(value,key)=>Object.hasOwn(value,key)?value[key]:undefined;
export const bundledSkillRoot=fileURLToPath(new URL('../../src/metis_academic/skill_defs/',import.meta.url));
export const configurationHome=()=>process.env.DSH_HOME||join(homedir(),'.dsh');
export const configurationPath=()=>join(configurationHome(),'metis-composer-configuration.json');
export const packageHome=()=>join(configurationHome(),'metis-composer-packages');
export function assertObject(value,label){if(!value||typeof value!=='object'||Array.isArray(value))throw new ConfigurationError(label+'必须为对象');return value;}
export function assertKeys(value,allowed,label){assertObject(value,label);if(Object.keys(value).some(key=>!allowed.includes(key)))throw new ConfigurationError(label+'包含不支持的字段');}
export function boundedText(value,label,max,{empty=true}={}){if(typeof value!=='string'||value.length>max||!empty&&!value.trim())throw new ConfigurationError(label+'必须为'+(empty?'':'非空')+'文本，最多'+max+'字');return value;}
export function skillId(value){if(typeof value!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)||value.length>64)throw new ConfigurationError('技能ID需为不超过64位的小写英文、数字及短横线');return value;}
export function modeId(value){if(value!=='metis'&&(typeof value!=='string'||!/^metis-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)||value.length>80))throw new ConfigurationError('模式ID须为metis或以metis-开头的小写英文、数字和短横线');return value;}

export function validateMode(raw){
  assertKeys(raw,['id','name','description','artifact','paradigm','guidance','order'],'模式');
  const mode={id:modeId(raw.id),name:boundedText(raw.name,'模式名称',120,{empty:false}).trim(),description:boundedText(raw.description??'','模式说明',3000),artifact:raw.artifact??null,paradigm:raw.paradigm??null,guidance:boundedText(raw.guidance??'','模式指引',10000),order:raw.order??100};
  if(![null,'journal','thesis','fund'].includes(mode.artifact)||![null,'qualitative','quantitative','theoretical'].includes(mode.paradigm)||(mode.artifact===null)!==(mode.paradigm===null))throw new ConfigurationError('成果与范式需同时为空，或使用引擎实际支持的成果和范式');
  if(!Number.isInteger(mode.order)||mode.order<0||mode.order>9999)throw new ConfigurationError('模式排序需为0至9999的整数');
  return mode;
}
export function configurationModes(document){
  const merged=new Map(bundledModes.map(mode=>[mode.id,{...mode,builtin:true}]));
  for(const [id,raw]of Object.entries(document.modes))merged.set(id,{...validateMode(raw),builtin:bundledModes.some(mode=>mode.id===id)});
  return [...merged.values()].filter(mode=>!document.deletedModes.includes(mode.id)).sort((a,b)=>(a.order??10)-(b.order??10)||a.id.localeCompare(b.id));
}
export function allModeIds(document){return [...new Set([...bundledModes.map(mode=>mode.id),...Object.keys(document.modes)])];}
function bundledSkill(id){
  skillId(id);const root=join(bundledSkillRoot,id),manifest=join(root,'SKILL.yaml'),instructions=join(root,'INSTRUCTIONS.md');
  if(!existsSync(manifest)||!existsSync(instructions))return null;
  const yaml=readFileSync(manifest,'utf8'),description=/^description:\s*(.+)$/m.exec(yaml)?.[1]?.replace(/^["']|["']$/g,'')||id;
  return {id,description,content:readFileSync(instructions,'utf8'),whenToUse:'',invocation:{modelInvocable:true,userInvocable:false},source:{kind:'bundled'},root,path:instructions,builtin:true};
}
export function packageRoot(hash){if(typeof hash!=='string'||!/^[a-f0-9]{64}$/.test(hash))throw new ConfigurationError('技能资源包标识无效');return join(packageHome(),hash);}
export function skillMarkdown(skill){const policy=skill.invocation;return '---\nname: '+skill.id+'\ndescription: '+JSON.stringify(skill.description)+'\nwhenToUse: '+JSON.stringify(skill.whenToUse||'')+'\ndisable-model-invocation: '+!policy.modelInvocable+'\nuser-invocable: '+policy.userInvocable+'\n---\n'+skill.content;}
export function validateSkill(raw){
  assertKeys(raw,['id','description','content','whenToUse','invocation','packageHash','source'],'技能');
  const invocation=raw.invocation??{modelInvocable:true,userInvocable:false};assertKeys(invocation,['modelInvocable','userInvocable'],'技能调用策略');
  if(typeof invocation.modelInvocable!=='boolean'||typeof invocation.userInvocable!=='boolean')throw new ConfigurationError('技能调用策略需为布尔值');
  const skill={id:skillId(raw.id),description:boundedText(raw.description,'技能说明',3000,{empty:false}),content:boundedText(raw.content,'技能正文',raw.source?.kind==='metis-library'?2*1024*1024:128000,{empty:false}),whenToUse:boundedText(raw.whenToUse??'','适用场景',3000),invocation:{...invocation},packageHash:raw.packageHash,source:clone(raw.source??{kind:'created'})};
  assertObject(skill.source,'技能来源');if(JSON.stringify(skill.source).length>8000)throw new ConfigurationError('技能来源信息过长');
  const root=packageRoot(skill.packageHash);if(!existsSync(join(root,'manifest.json'))||!existsSync(join(root,'files','SKILL.md')))throw new ConfigurationError('技能资源包不存在，请重新导入或生成',409);
  if(fingerprint(JSON.parse(readFileSync(join(root,'manifest.json'),'utf8')))!==skill.packageHash||readFileSync(join(root,'files','SKILL.md'),'utf8')!==skillMarkdown(skill))throw new ConfigurationError('技能配置与资源包不一致，请保留现有资料后重新导入',409);
  return skill;
}
export function skillDocument(id,document,{archived=false}={}){
  skillId(id);if(!archived&&document.deletedSkills.includes(id))throw new ConfigurationError('技能已删除：'+id,404);
  const stored=own(document.skills,id);
  if(stored){const skill=validateSkill(stored),root=join(packageRoot(skill.packageHash),'files');return {...skill,root,path:join(root,'SKILL.md'),builtin:!!bundledSkill(id)};}
  if(libraryMetadata(id))return librarySkillDocument(id,{packages:packageHome(),markdown:skillMarkdown});
  const bundled=bundledSkill(id);if(!bundled)throw new ConfigurationError('不存在的技能：'+id,404);return bundled;
}
export function snapshotSkill(skill){
  if(skill.packageHash)return {id:skill.id,packageHash:skill.packageHash};
  const value=Object.fromEntries(['id','description','content','whenToUse','invocation','packageHash','source'].filter(key=>skill[key]!==undefined).map(key=>[key,clone(skill[key])]));
  if(!skill.packageHash)value.bundled=true;return value;
}
export function hydrateSkill(raw){
  if(raw.packageHash&&Object.keys(raw).every(key=>['id','packageHash'].includes(key))){
    skillId(raw.id);const root=packageRoot(raw.packageHash),text=readFileSync(join(root,'files','SKILL.md'),'utf8');
    const match=/^---\nname: ([^\n]+)\ndescription: ([^\n]+)\nwhenToUse: ([^\n]+)\ndisable-model-invocation: (true|false)\nuser-invocable: (true|false)\n---\n([\s\S]*)$/.exec(text);
    if(!match||match[1]!==raw.id)throw new ConfigurationError('归档技能包格式或ID不一致',409);
    const source=isLibraryPackage(join(root,'files'))?{...packageLibraryRecord(join(root,'files')).skillMetadata?.source,kind:'metis-library',archived:true}:{kind:'archived'};
    const skill=validateSkill({id:raw.id,description:JSON.parse(match[2]),whenToUse:JSON.parse(match[3]),invocation:{modelInvocable:match[4]!=='true',userInvocable:match[5]==='true'},content:match[6],packageHash:raw.packageHash,source});
    return {...skill,root:join(root,'files'),path:join(root,'files','SKILL.md')};
  }
  if(!raw.bundled){const skill=validateSkill(raw),root=join(packageRoot(skill.packageHash),'files');return {...skill,root,path:join(root,'SKILL.md')};}
  assertKeys(raw,['id','description','content','whenToUse','invocation','source','bundled'],'内置技能快照');
  const current=bundledSkill(skillId(raw.id));if(!current)throw new ConfigurationError('内置技能资源已缺失：'+raw.id,409);
  assertKeys(raw.invocation,['modelInvocable','userInvocable'],'快照调用策略');if(typeof raw.invocation.modelInvocable!=='boolean'||typeof raw.invocation.userInvocable!=='boolean')throw new ConfigurationError('快照调用策略无效');
  return {...current,description:boundedText(raw.description,'技能说明',3000,{empty:false}),content:boundedText(raw.content,'技能快照',128000,{empty:false}),whenToUse:boundedText(raw.whenToUse??'','技能适用场景',3000),invocation:{...raw.invocation}};
}
export function configurationSkills(document){
  const external=new Map(librarySkills().map(skill=>[skill.id,skill]));
  for(const id of new Set(Object.values(document.profiles).flatMap(record=>record.profile?.skills||[])))if(!external.has(id)&&id.startsWith('ml-')){const previous=libraryMetadata(id);if(previous)external.set(id,previous);}
  const ids=[...new Set([...readdirSync(bundledSkillRoot,{withFileTypes:true}).filter(entry=>entry.isDirectory()&&existsSync(join(bundledSkillRoot,entry.name,'SKILL.yaml'))&&existsSync(join(bundledSkillRoot,entry.name,'INSTRUCTIONS.md'))).map(entry=>entry.name),...Object.keys(document.skills),...external.keys()])];
  return ids.filter(id=>!document.deletedSkills.includes(id)).map(id=>{const base=external.get(id);if(base&&!own(document.skills,id))return {...base,builtin:false,managed:false};const item=skillDocument(id,document);return {...(base||{}),id:item.id,description:item.description,whenToUse:item.whenToUse,invocation:item.invocation,builtin:item.builtin,managed:!!own(document.skills,id),source:item.source};}).sort((a,b)=>a.id.localeCompare(b.id));
}
export function emptyConfiguration(profiles={}){return {version:1,revision:0,updatedAt:null,modes:{},deletedModes:[],skills:{},deletedSkills:[],profiles,modeArchives:{}};}
export function validateConfiguration(raw){
  assertKeys(raw,['version','revision','updatedAt','modes','deletedModes','skills','deletedSkills','profiles','modeArchives'],'配置工作区');
  raw={...raw,modeArchives:raw.modeArchives||{}};
  if(raw.version!==1||!Number.isSafeInteger(raw.revision)||raw.revision<0)throw new ConfigurationError('配置版本无效');
  for(const key of ['modes','skills','profiles','modeArchives'])assertObject(raw[key],key);
  for(const key of ['deletedModes','deletedSkills'])if(!Array.isArray(raw[key])||raw[key].length>300||raw[key].some(id=>typeof id!=='string')||new Set(raw[key]).size!==raw[key].length)throw new ConfigurationError('删除记录无效');
  raw.deletedModes.forEach(modeId);raw.deletedSkills.forEach(skillId);
  raw=clone(raw);
  const builtinIds=new Set(bundledModes.map(mode=>mode.id));
  for(const id of raw.deletedModes){delete raw.modes[id];delete raw.profiles[id];}
  raw.deletedModes=raw.deletedModes.filter(id=>builtinIds.has(id));
  raw.modeArchives={};
  const customModes=Object.keys(raw.modes).filter(id=>!builtinIds.has(id));
  if(customModes.length>64||Object.keys(raw.skills).length>256||Object.keys(raw.profiles).length>80)throw new ConfigurationError('配置数量超出限制（64个自定义模式、256个技能）');
  for(const [id,value]of Object.entries(raw.modes))if(validateMode(value).id!==id)throw new ConfigurationError('模式键与ID不一致');
  for(const [id,value]of Object.entries(raw.skills))if(validateSkill(value).id!==id)throw new ConfigurationError('技能键与ID不一致');
  for(const [id,record]of Object.entries(raw.profiles)){modeId(id);assertKeys(record,['profile','revision','updatedAt'],'模式配置记录');assertObject(record.profile,'模式内容');if(!Number.isSafeInteger(record.revision)||record.revision<0)throw new ConfigurationError('模式配置版本无效');}
  if(Buffer.byteLength(JSON.stringify(raw))>8*1024*1024)throw new ConfigurationError('配置正文超过8MiB限制');
  return clone(raw);
}
export function readConfiguration(){
  const file=configurationPath();
  try{
    if(existsSync(file))return validateConfiguration(JSON.parse(readFileSync(file,'utf8')));
    const legacy=join(configurationHome(),'metis-mode-profiles.json');
    if(!existsSync(legacy))return {...emptyConfiguration(),deletedModes:bundledModes.map(mode=>mode.id)};
    const old=JSON.parse(readFileSync(legacy,'utf8'));if(old.version!==1||!old.profiles||Array.isArray(old.profiles))throw new Error('旧配置格式无效');
    return validateConfiguration(emptyConfiguration(old.profiles));
  }catch(error){throw new ConfigurationError('读取METIS配置失败：'+error.message,503);}
}
export function writeConfiguration(raw,expectedRevision,onWarning=warning=>console.warn(warning)){
  const next=validateConfiguration(raw),file=configurationPath(),lock=file+'.lock',temporary=file+'.tmp-'+randomUUID();
  mkdirSync(dirname(file),{recursive:true});let descriptor;
  try{
    try{descriptor=openSync(lock,'wx');}catch(error){
      if(error.code!=='EEXIST')throw error;
      const previous=readFileSync(lock,'utf8');let owner;try{owner=JSON.parse(previous);}catch{throw new ConfigurationError('配置写锁异常，请保留现场后重新加载',409);}
      let dead=false;try{process.kill(owner.pid,0);}catch(check){dead=check.code==='ESRCH';}
      if(!dead||owner.kind!=='metis-config-v1'||readFileSync(lock,'utf8')!==previous)throw new ConfigurationError('另一进程正在保存METIS配置',409);
      unlinkSync(lock);descriptor=openSync(lock,'wx');
    }
    writeFileSync(descriptor,JSON.stringify({kind:'metis-config-v1',pid:process.pid,token:randomUUID()}));
    if(readConfiguration().revision!==expectedRevision)throw new ConfigurationError('配置已被更新，请保留草稿并重新读取后协调',409);
    next.revision=expectedRevision+1;next.updatedAt=new Date().toISOString();
    writeFileSync(temporary,JSON.stringify(next,null,2)+'\n',{encoding:'utf8',flag:'wx'});
    renameSync(temporary,file);
    return next;
  }finally{
    for(const cleanup of [()=>{if(descriptor!==undefined)closeSync(descriptor);},()=>{if(descriptor!==undefined&&existsSync(lock))unlinkSync(lock);},()=>{if(existsSync(temporary))unlinkSync(temporary);}])try{cleanup();}catch(error){try{onWarning('配置写入清理异常：'+error.message);}catch{}}
  }
}

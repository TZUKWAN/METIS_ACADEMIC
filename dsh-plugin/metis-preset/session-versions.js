import {existsSync,readFileSync,writeFileSync,mkdirSync,renameSync,unlinkSync,openSync,closeSync,readdirSync,lstatSync,realpathSync,copyFileSync,chmodSync} from 'node:fs';
import {join,dirname,relative,isAbsolute,sep} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {ConfigurationError,configurationHome,clone,modeId,skillId,assertObject,assertKeys,own} from './configuration.js';
import {isMetisVersionPreset} from './modes.js';

const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
function canonical(value,sortKeys=false){
  if(value===null||typeof value==='string'||typeof value==='boolean')return value;
  if(typeof value==='number'&&Number.isFinite(value))return value;
  if(Array.isArray(value))return value.map(item=>{if(item===undefined)throw new ConfigurationError('版本声明含未定义数组项');return canonical(item,sortKeys);});
  if(value&&typeof value==='object'&&(Object.getPrototypeOf(value)===Object.prototype||Object.getPrototypeOf(value)===null)){
    if(Object.hasOwn(value,'__jsExpr')||Object.getOwnPropertySymbols(value).length)throw new ConfigurationError('声明含未固定的动态表达式或运行符号，不能声称已恢复原配置');
    const keys=Object.keys(value);if(sortKeys)keys.sort();
    return Object.fromEntries(keys.filter(key=>value[key]!==undefined).map(key=>[key,canonical(value[key],sortKeys)]));
  }
  throw new ConfigurationError('版本声明包含不能持久化的运行对象，拒绝猜测配置');
}
const encoded=value=>JSON.stringify(canonical(value));
const home=()=>join(configurationHome(),'metis-session-versions');
const hashPath=(folder,hash)=>{if(typeof hash!=='string'||!/^[a-f0-9]{64}$/.test(hash))throw new ConfigurationError('固定版本摘要无效');return join(home(),folder,hash+'.json');};
const emptyIndex=()=>({version:1,snapshots:{},baselines:{}});
const emptyBindings=()=>({version:1,sessions:{}});
const stableHeader=header=>sha(Buffer.from(JSON.stringify(canonical(header,true))));
const versionId=(payload,hash)=>'METIS · '+(payload.name.replace(/^METIS[ ·]*/,'').replace(/[\x00-\x1f\x7f]/g,'').replace(/\s+/g,' ').slice(0,96)||payload.modeId)+'〔配置 '+hash.slice(0,16)+'〕';
function readJson(file,fallback){if(!existsSync(file))return fallback();try{return JSON.parse(readFileSync(file,'utf8'));}catch(error){throw new ConfigurationError('版本保护文件无法读取：'+file+'；'+error.message,503);}}
function lockedJson(file,fallback,change){
  mkdirSync(dirname(file),{recursive:true});const lock=file+'.lock',temporary=file+'.tmp-'+randomUUID();let descriptor;
  try{
    try{descriptor=openSync(lock,'wx',0o600);}catch(error){
      if(error.code!=='EEXIST')throw error;
      const raw=readFileSync(lock,'utf8');let owner;try{owner=JSON.parse(raw);}catch{throw new ConfigurationError('版本保护写锁无效，拒绝覆盖',409);}
      let dead=false;try{process.kill(owner.pid,0);}catch(check){dead=check.code==='ESRCH';}
      if(!dead||owner.kind!=='metis-versions-v1'||readFileSync(lock,'utf8')!==raw)throw new ConfigurationError('另一进程正在写入会话版本保护数据',409);
      unlinkSync(lock);descriptor=openSync(lock,'wx',0o600);
    }
    writeFileSync(descriptor,JSON.stringify({kind:'metis-versions-v1',pid:process.pid}));
    const current=readJson(file,fallback),before=encoded(current),result=change(current);
    if(encoded(result)===before)return result;
    writeFileSync(temporary,JSON.stringify(result,null,2)+'\n',{flag:'wx',mode:0o600});if(existsSync(file))copyFileSync(file,file+'.bak');renameSync(temporary,file);return result;
  }finally{
    for(const action of [()=>{if(descriptor!==undefined)closeSync(descriptor);},()=>{if(descriptor!==undefined&&existsSync(lock))unlinkSync(lock);},()=>{if(existsSync(temporary))unlinkSync(temporary); }])try{action();}catch(error){console.warn('METIS版本保护清理异常：'+error.message);}
  }
}
function immutableJson(file,value){
  const text=encoded(value);if(existsSync(file)){if(encoded(readJson(file,()=>null))!==text)throw new ConfigurationError('不可变版本文件与摘要不一致，未覆盖：'+file,409);return;}
  mkdirSync(dirname(file),{recursive:true});const temporary=file+'.tmp-'+randomUUID();writeFileSync(temporary,text+'\n',{flag:'wx',mode:0o600});
  try{renameSync(temporary,file);}catch(error){if(!existsSync(file)||encoded(readJson(file,()=>null))!==text)throw error;}
  finally{if(existsSync(temporary))try{unlinkSync(temporary);}catch{}}
}
function safeResourcePath(path){
  if(typeof path!=='string'||path.length>500||path.includes('\\')||path.includes(':')||path.startsWith('/')||path.split('/').some(part=>!part||part==='.'||part==='..'||/[\x00-\x1f]/.test(part)))throw new ConfigurationError('版本资源路径无效');return path;
}
function resourceDirectory(hash){if(typeof hash!=='string'||!/^[a-f0-9]{64}$/.test(hash))throw new ConfigurationError('版本资源摘要无效');return join(home(),'resources',hash);}
function freezeResources(rawRoot){
  const root=realpathSync(rawRoot),files=[];let total=0,directories=0;
  if(!existsSync(join(root,'SKILL.md'))&&!(existsSync(join(root,'SKILL.yaml'))&&existsSync(join(root,'INSTRUCTIONS.md'))))throw new ConfigurationError('不能确认原技能资源根目录，未扫描或猜测其他目录');
  function walk(directory,prefix=''){
    if(++directories>512||prefix.split('/').length>24)throw new ConfigurationError('原资源目录过深，不能建立完整快照');
    for(const entry of readdirSync(directory,{withFileTypes:true})){
      const path=join(directory,entry.name),name=safeResourcePath(prefix+entry.name),stat=lstatSync(path);
      if(stat.isSymbolicLink())throw new ConfigurationError('原资源含链接，不能声称已完整固定：'+name);
      const rel=relative(root,realpathSync(path));if(isAbsolute(rel)||rel==='..'||rel.startsWith('..'+sep))throw new ConfigurationError('版本资源越界');
      if(stat.isDirectory())walk(path,name+'/');
      else if(stat.isFile()){
        if(files.length>=512||stat.size>16*1024*1024||(total+=stat.size)>64*1024*1024)throw new ConfigurationError('原资源超过快照限制（512文件、单文件16MiB、总64MiB）');
        const bytes=readFileSync(path);files.push({path:name,size:bytes.length,sha256:sha(bytes),mode:stat.mode&0o777,bytes});
      }else throw new ConfigurationError('原资源包含不支持的文件类型：'+name);
    }
  }
  walk(root);files.sort((a,b)=>a.path.localeCompare(b.path));
  const manifest=files.map(({bytes,...metadata})=>metadata),hash=sha(Buffer.from(encoded(manifest))),target=resourceDirectory(hash);
  if(!existsSync(target)){
    const temporary=join(home(),'resources','.stage-'+randomUUID());mkdirSync(join(temporary,'files'),{recursive:true,mode:0o700});
    for(const file of files){const destination=join(temporary,'files',...file.path.split('/'));mkdirSync(dirname(destination),{recursive:true,mode:0o700});writeFileSync(destination,file.bytes,{flag:'wx',mode:file.mode});chmodSync(destination,file.mode);}
    writeFileSync(join(temporary,'manifest.json'),encoded(manifest)+'\n',{flag:'wx',mode:0o600});
    try{renameSync(temporary,target);}catch(error){if(!existsSync(target))throw error;}
  }
  verifyResources(hash);return hash;
}
function verifyResources(hash){
  const root=resourceDirectory(hash),manifest=readJson(join(root,'manifest.json'),()=>null);
  if(!Array.isArray(manifest)||sha(Buffer.from(encoded(manifest)))!==hash)throw new ConfigurationError('原版本资源清单缺失或损坏，未采用新版资源',409);
  for(const file of manifest){safeResourcePath(file.path);const path=join(root,'files',...file.path.split('/'));if(!existsSync(path)||lstatSync(path).isSymbolicLink()||sha(readFileSync(path))!==file.sha256)throw new ConfigurationError('原版本资源缺失或被修改：'+file.path+'；未替换为最新版',409);}
  return join(root,'files');
}
export function createSessionVersionStore(){
  const indexPath=join(home(),'index.json'),bindingsPath=join(home(),'sessions.json');
  const index=()=>{const data=readJson(indexPath,emptyIndex);if(data.version!==1)throw new ConfigurationError('版本索引格式不兼容',503);assertObject(data.snapshots,'版本索引');assertObject(data.baselines,'基线索引');return data;};
  const bindings=()=>{const data=readJson(bindingsPath,emptyBindings);if(data.version!==1)throw new ConfigurationError('会话绑定格式不兼容',503);assertObject(data.sessions,'会话绑定');return data;};
  function get(id){
    if(!isMetisVersionPreset(id))throw new ConfigurationError('不是固定METIS配置版本');
    const metadata=own(index().snapshots,id);if(!metadata)throw new ConfigurationError('找不到会话原配置版本：'+id+'；不会自动使用最新版',409);
    const payload=readJson(hashPath('snapshots',metadata.hash),()=>null);
    if(!payload||payload.version!==1||sha(Buffer.from(encoded(payload)))!==metadata.hash||payload.modeId!==metadata.modeId||versionId(payload,metadata.hash)!==id)throw new ConfigurationError('会话原配置快照缺失、损坏或格式不兼容，未使用最新版',409);
    return {id,hash:metadata.hash,payload,metadata,filePath:hashPath('snapshots',metadata.hash)};
  }
  function freeze(definition,{origin='configuration',revision=null}={}){
    modeId(definition.mode.id);const plugins=canonical(definition.plugins),stepRows=plugins.filter(row=>row.name==='metis-academic-preset/step-skills');
    if(stepRows.length>1)throw new ConfigurationError('存在多个METIS分步声明，不能猜测原配置');
    const row=stepRows[0],skills=row?.config?.skills;
    if(row&&(!Array.isArray(skills)||!Array.isArray(row.config?.frozenSteps)))throw new ConfigurationError('版本缺少真实技能与已编译步骤，拒绝用新配置补全');
    if(row)row.config.resourceSkills=skills.map(skill=>{
      skillId(skill.id);if(typeof skill.root!=='string')throw new ConfigurationError('技能未提供真实资源目录：'+skill.id);
      return {id:skill.id,description:skill.description,content:skill.content,whenToUse:skill.whenToUse||'',invocation:clone(skill.invocation||{modelInvocable:true,userInvocable:false}),resources:freezeResources(skill.root),entry:typeof skill.path==='string'?relative(skill.root,skill.path).split(sep).join('/')||null:null};
    });
    if(row){delete row.config.skills;delete row.config.snapshotVersion;}
    const payload=canonical({version:1,modeId:definition.mode.id,name:definition.mode.name,description:definition.mode.description||'',order:definition.mode.order??10,plugins});
    const text=encoded(payload);if(Buffer.byteLength(text)>32*1024*1024)throw new ConfigurationError('完整配置快照超过32MiB，未截断保存');
    const hash=sha(Buffer.from(text)),id=versionId(payload,hash);
    immutableJson(hashPath('snapshots',hash),payload);
    lockedJson(indexPath,emptyIndex,data=>{if(data.version!==1)throw new ConfigurationError('版本索引格式不兼容');const previous=own(data.snapshots,id);if(previous&&previous.hash!==hash)throw new ConfigurationError('版本ID冲突，未覆盖旧版本',409);data.snapshots[id]=previous||{hash,modeId:definition.mode.id,name:definition.mode.name,createdAt:new Date().toISOString(),origin,firstConfigurationRevision:revision,published:false};return data;});
    return get(id);
  }
  function declaration(id){
    const record=get(id),plugins=clone(record.payload.plugins);
    for(const row of plugins)if(row.name==='metis-academic-preset/step-skills'){
      const config=row.config;config.skills=config.resourceSkills.map(skill=>{const root=verifyResources(skill.resources);const entry=skill.entry?safeResourcePath(skill.entry):null;return {...skill,root,path:entry?join(root,...entry.split('/')):undefined};});
      delete config.resourceSkills;config.snapshotVersion={id,hash:record.hash,modeId:record.payload.modeId};
    }
    return {id,name:record.payload.name,description:record.payload.description,order:record.payload.order,plugins};
  }
  function published(records){
    return lockedJson(indexPath,emptyIndex,data=>{for(const record of records){const meta=own(data.snapshots,record.id);if(!meta||meta.hash!==record.hash)throw new ConfigurationError('待发布版本索引不一致');meta.published=true;meta.publishedAt=meta.publishedAt||new Date().toISOString();if(!own(data.baselines,meta.modeId))data.baselines[meta.modeId]=record.id;}return data;});
  }
  function remember(header,sourcePreset,id,provenance,{native=false}={}){
    const version=get(id),identity=stableHeader(header);
    if(typeof header.id!=='string'||!header.id)throw new ConfigurationError('会话身份缺失');
    return lockedJson(bindingsPath,emptyBindings,data=>{
      if(data.version!==1)throw new ConfigurationError('会话绑定版本无效');const old=own(data.sessions,header.id);
      if(old&&!native&&(old.headerHash!==identity||old.versionId!==id||old.modeId!==version.payload.modeId))throw new ConfigurationError('会话已有固定版本，拒绝被新配置覆盖',409);
      const same=old?.headerHash===identity&&old?.versionId===id;
      data.sessions={...data.sessions,[header.id]:{sessionId:header.id,headerHash:identity,sourcePreset:same?old.sourcePreset:sourcePreset,modeId:version.payload.modeId,versionId:id,hash:version.hash,provenance:same?old.provenance:provenance,boundAt:old?.boundAt||new Date().toISOString()}};return data;
    }).sessions[header.id];
  }
  function binding(header,sourcePreset){
    const value=own(bindings().sessions,header.id);if(!value)return null;
    if(value.headerHash!==stableHeader(header)||(sourcePreset===null?value.sourcePreset!==null:value.modeId!==sourcePreset))throw new ConfigurationError('旧会话绑定身份或模式不一致，未自动套用配置',409);
    const record=get(value.versionId);if(value.hash!==record.hash)throw new ConfigurationError('旧会话固定版本摘要不一致',409);return value;
  }
  function metadata(){const data=index();return {snapshots:Object.entries(data.snapshots).map(([id,value])=>({id,...value})),baselines:clone(data.baselines),bindings:Object.values(bindings().sessions)};}
  return {get,freeze,declaration,published,remember,binding,metadata,aliases:()=>Object.fromEntries(Object.entries(index().snapshots).map(([id,value])=>[id,value.modeId]))};
}

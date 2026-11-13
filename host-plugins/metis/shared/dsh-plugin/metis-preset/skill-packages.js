import {existsSync,readFileSync,readdirSync,lstatSync,realpathSync,mkdirSync,writeFileSync,renameSync} from 'node:fs';
import {isAbsolute,join,resolve,relative,sep} from 'node:path';
import {randomUUID,createHash} from 'node:crypto';
import {ConfigurationError,skillId,boundedText,assertKeys,packageHome,packageRoot,skillDocument,skillMarkdown,clone} from './configuration.js';
import {isLibraryPackage,readPinnedSkill,editLibraryResources,primeLibrarySkills} from './skill-library.js';

const MAX_FILES=128,MAX_FILE=4*1024*1024,MAX_TOTAL=20*1024*1024;
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const excluded=new Set(['.git','node_modules','.venv','venv','__pycache__','.DS_Store']);
function resourcePath(raw){
  if(typeof raw!=='string'||raw.length>240||raw.includes('\\')||raw.includes(':')||raw.startsWith('/')||raw.split('/').some(part=>!part||part==='.'||part==='..'||/[\x00-\x1f]/.test(part)||/[. ]$/.test(part)||/^(con|prn|aux|nul|com\d|lpt\d)(\.|$)/i.test(part)))throw new ConfigurationError('技能资源路径无效：'+String(raw));
  if(raw.split('/').some(part=>/^\.env(?:\.|$)/i.test(part)&&part!=='.env.example'||['.npmrc','id_rsa','id_ed25519'].includes(part.toLowerCase())))throw new ConfigurationError('技能包包含不应导入的凭据文件：'+raw);
  return raw;
}
function checkFiles(files,library=false){
  const names=Object.keys(files),seen=new Set();let size=0;
  if(names.length>MAX_FILES)throw new ConfigurationError('技能包超过128个文件');
  for(const name of names){resourcePath(name);if(seen.has(name.toLowerCase()))throw new ConfigurationError('资源路径大小写冲突：'+name);seen.add(name.toLowerCase());const bytes=files[name];if(!Buffer.isBuffer(bytes)||bytes.length>MAX_FILE)throw new ConfigurationError('单个技能文件超过4MiB：'+name);if(bytes.length<1024&&/^version https:\/\/git-lfs.github.com\/spec\/v1\r?\noid sha256:/m.test(bytes.toString('utf8')))throw new ConfigurationError('Git LFS指针尚未展开，请使用有真实资源文件的本地目录：'+name);size+=bytes.length;}
  if(size>(library?64*1024*1024:MAX_TOTAL))throw new ConfigurationError(library?'固定来源技能包超过64MiB':'技能资源包超过20MiB');
  for(const name of seen)if([...seen].some(other=>other.startsWith(name+'/')))throw new ConfigurationError('技能包存在文件与目录路径冲突：'+name);
}
function readDirectory(raw){
  const root=realpathSync(raw),files=Object.create(null),skipped=[],library=isLibraryPackage(root);let directories=0;
  function walk(directory,prefix=''){
    if(++directories>256||prefix.split('/').length>20)throw new ConfigurationError('技能目录层级或目录数量过多');
    for(const entry of readdirSync(directory,{withFileTypes:true})){
      const path=join(directory,entry.name),name=prefix+entry.name;
      if(excluded.has(entry.name)){skipped.push(name);continue;}
      const stat=lstatSync(path);if(stat.isSymbolicLink())throw new ConfigurationError('技能包不接受符号链接或目录联接：'+name);
      const real=realpathSync(path),rel=relative(root,real);if(isAbsolute(rel)||rel==='..'||rel.startsWith('..'+sep))throw new ConfigurationError('技能资源越出了来源目录');
      if(stat.isDirectory())walk(path,name+'/');
      else if(stat.isFile()){if(stat.size>MAX_FILE)throw new ConfigurationError('技能文件过大：'+name);files[resourcePath(name)]=readFileSync(path);checkFiles(files,library);}
      else throw new ConfigurationError('技能包含不支持的文件类型：'+name);
    }
  }
  walk(root);return {files,root,skipped};
}
function scalar(header,key){
  const lines=header.split(/\r?\n/),index=lines.findIndex(line=>line.startsWith(key+':'));if(index<0)return undefined;
  let value=lines[index].slice(key.length+1).trim();
  if(/^[|>][-+]?$/.test(value)){
    const parts=[];for(let i=index+1;i<lines.length&&(!lines[i].trim()||/^\s/.test(lines[i]));i++)parts.push(lines[i]);
    const indent=Math.min(...parts.filter(line=>line.trim()).map(line=>line.match(/^\s*/)[0].length));
    return parts.map(line=>line.slice(Number.isFinite(indent)?indent:0)).join(value[0]==='>'?' ':'\n').trim();
  }
  if(value.startsWith('"')){try{return JSON.parse(value);}catch{throw new ConfigurationError('技能字段'+key+'使用了不支持的多行引号，请改用单行或|/>块标量');}}
  if(value.startsWith("'")){if(!value.endsWith("'"))throw new ConfigurationError('技能字段'+key+'引号不完整');return value.slice(1,-1).replaceAll("''","'");}
  if(/^[&*[{]/.test(value))throw new ConfigurationError('技能字段'+key+'需使用普通文本标量');
  return value.replace(/\s+#.*$/,'').trim();
}
function definition(files){
  if(files['SKILL.md']){
    const raw=files['SKILL.md'].toString('utf8'),match=/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(raw);
    if(!Buffer.from(raw,'utf8').equals(files['SKILL.md']))throw new ConfigurationError('SKILL.md需要UTF-8编码');
    if(!match)throw new ConfigurationError('SKILL.md缺少YAML frontmatter');
    const header=match[1],flag=(key,fallback)=>{const value=scalar(header,key);if(value===undefined)return fallback;if(['true','1','yes','on'].includes(String(value).toLowerCase()))return true;if(['false','0','no','off'].includes(String(value).toLowerCase()))return false;throw new ConfigurationError('技能调用标记'+key+'无效');};
    for(const key of ['invocation','disableModelInvocation','modelInvocable','userInvocable'])if(new RegExp('^'+key+':','m').test(header))throw new ConfigurationError('SKILL.md请使用DSH的disable-model-invocation和user-invocable字段');
    const name=scalar(header,'name'),description=scalar(header,'description');
    if(!name||!description)throw new ConfigurationError('SKILL.md需要真实的name和description');
    return {id:skillId(name),description,content:raw.slice(match[0].length),whenToUse:scalar(header,'whenToUse')||'',invocation:{modelInvocable:!flag('disable-model-invocation',false),userInvocable:flag('user-invocable',true)},originalHeader:header};
  }
  if(files['SKILL.yaml']&&files['INSTRUCTIONS.md']){
    const header=files['SKILL.yaml'].toString('utf8').replace(/^\uFEFF/,''),id=scalar(header,'id'),description=scalar(header,'description');
    if(!id||!description)throw new ConfigurationError('SKILL.yaml需要id和description');
    return {id:skillId(id),description,content:files['INSTRUCTIONS.md'].toString('utf8'),whenToUse:'',invocation:{modelInvocable:true,userInvocable:false},originalHeader:header};
  }
  throw new ConfigurationError('来源目录需要SKILL.md，或SKILL.yaml与INSTRUCTIONS.md');
}
function stage(skill,files,{library=false}={}){
  skillId(skill.id);boundedText(skill.description,'技能说明',3000,{empty:false});boundedText(skill.content,'技能正文',library?2*1024*1024:128000,{empty:false});
  const invocation=skill.invocation||{modelInvocable:true,userInvocable:false};
  assertKeys(invocation,['modelInvocable','userInvocable'],'调用策略');if(typeof invocation.modelInvocable!=='boolean'||typeof invocation.userInvocable!=='boolean')throw new ConfigurationError('调用策略必须为布尔值');
  boundedText(skill.whenToUse??'','适用场景',3000);
  files={...files,'SKILL.md':Buffer.from(skillMarkdown({...skill,invocation}),'utf8')};
  if(files['INSTRUCTIONS.md'])files['INSTRUCTIONS.md']=Buffer.from(skill.content,'utf8');
  if(files['SKILL.yaml']){
    let yaml=files['SKILL.yaml'].toString('utf8').replace(/^\uFEFF/,'');
    for(const [key,value]of [['id',skill.id],['description',skill.description]]){
      const lines=yaml.split(/\r?\n/),start=lines.findIndex(line=>line.startsWith(key+':'));
      if(start<0)lines.unshift(key+': '+JSON.stringify(value));
      else{let end=start+1;while(end<lines.length&&(!lines[end].trim()||/^\s/.test(lines[end])))end++;lines.splice(start,end-start,key+': '+JSON.stringify(value));}
      yaml=lines.join('\n');
    }
    files['SKILL.yaml']=Buffer.from(yaml,'utf8');
  }
  if(!library&&Object.keys(files).some(path=>path.startsWith('.metis-upstream/')))throw new ConfigurationError('来源归档保留目录不能由普通技能创建或导入');
  checkFiles(files,library);
  const manifest=Object.keys(files).sort().map(path=>({path,size:files[path].length,sha256:digest(files[path])})),hash=digest(Buffer.from(JSON.stringify(manifest))),target=packageRoot(hash);
  mkdirSync(packageHome(),{recursive:true});
  if(!existsSync(target)){
    const temporary=join(packageHome(),'.stage-'+randomUUID());mkdirSync(join(temporary,'files'),{recursive:true});
    for(const {path}of manifest){const file=join(temporary,'files',...path.split('/'));mkdirSync(resolve(file,'..'),{recursive:true});writeFileSync(file,files[path],{flag:'wx'});}
    writeFileSync(join(temporary,'manifest.json'),JSON.stringify(manifest,null,2)+'\n',{flag:'wx'});
    try{renameSync(temporary,target);}catch(error){if(!existsSync(target))throw error;}
  }
  const stored=JSON.parse(readFileSync(join(target,'manifest.json'),'utf8'));if(JSON.stringify(stored)!==JSON.stringify(manifest))throw new ConfigurationError('已有技能包校验不一致',409);
  for(const item of manifest)if(digest(readFileSync(join(target,'files',...item.path.split('/'))))!==item.sha256)throw new ConfigurationError('技能资源包文件已被外部修改：'+item.path,409);
  return {id:skill.id,description:skill.description,content:skill.content,whenToUse:skill.whenToUse||'',invocation:{...invocation},packageHash:hash,source:clone(skill.source||{kind:'created'})};
}
async function download(url,max,signal,json=false){
  const response=await fetch(url,{redirect:'error',signal,headers:{accept:json?'application/vnd.github+json':'application/octet-stream','user-agent':'METIS-skill-importer'}});
  if(!response.ok)throw new ConfigurationError('技能来源请求失败：HTTP '+response.status+' '+url,502);
  const chunks=[];let size=0;for await(const chunk of response.body){size+=chunk.length;if(size>max)throw new ConfigurationError('来源响应超出大小限制',502);chunks.push(chunk);}
  const bytes=Buffer.concat(chunks);return json?JSON.parse(bytes.toString('utf8')):bytes;
}
export async function importSkill(source,requestedId,authorization,signal){
  assertKeys(source,['kind','path','repository','ref','subdirectory'],'安装来源');
  const approved=authorization.replaceAll('\\','/').toLowerCase();let files,origin;
  if(source.kind==='local'){
    assertKeys(source,['kind','path'],'本地来源');
    const path=boundedText(source.path,'本地来源路径',1000,{empty:false});
    if(!isAbsolute(path)||path.startsWith('\\\\')||!approved.includes(path.replaceAll('\\','/').toLowerCase()))throw new ConfigurationError('本地安装来源须为用户在对话中明确提供的绝对目录');
    const root=realpathSync(path);if(!existsSync(join(root,'SKILL.md'))&&!(existsSync(join(root,'SKILL.yaml'))&&existsSync(join(root,'INSTRUCTIONS.md'))))throw new ConfigurationError('该目录不是技能根目录');
    const loaded=readDirectory(root);files=loaded.files;origin={kind:'local',path,skippedCount:loaded.skipped.length,skipped:loaded.skipped.slice(0,12)};
  }else if(source.kind==='github'){
    assertKeys(source,['kind','repository','ref','subdirectory'],'GitHub来源');
    if(source.ref!==undefined)boundedText(source.ref,'分支/标签/commit',300,{empty:false});
    if(source.subdirectory!==undefined)boundedText(source.subdirectory,'技能子目录',240);
    const repo=boundedText(source.repository,'GitHub仓库',200,{empty:false});
    if(!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)||!approved.includes(repo.toLowerCase()))throw new ConfigurationError('GitHub来源须为用户明确提供的owner/repo或仓库链接');
    const sub=(source.subdirectory||'').replace(/\/$/,'');if(sub)resourcePath(sub);
    const base='https://api.github.com/repos/'+repo;
    const info=source.ref?null:await download(base,1024*1024,signal,true),ref=source.ref||info.default_branch;
    boundedText(ref,'GitHub分支/标签/commit',300,{empty:false});
    const commit=await download(base+'/commits/'+encodeURIComponent(ref),8*1024*1024,signal,true),sha=commit.sha,treeSha=commit.commit?.tree?.sha;
    if(!/^[a-f0-9]{40}$/.test(sha)||!/^[a-f0-9]{40}$/.test(treeSha))throw new ConfigurationError('无法固定技能来源commit',502);
    const tree=await download(base+'/git/trees/'+treeSha+'?recursive=1',24*1024*1024,signal,true);
    if(tree.truncated||!Array.isArray(tree.tree))throw new ConfigurationError('GitHub目录清单不完整，未导入；请使用更小仓库或本地目录',502);
    files=Object.create(null);const prefix=sub?sub+'/':'';
    const entries=tree.tree.filter(entry=>entry.path.startsWith(prefix)&&entry.path!==sub);
    const names=new Set(entries.map(entry=>entry.path.slice(prefix.length)));if(!names.has('SKILL.md')&&!(names.has('SKILL.yaml')&&names.has('INSTRUCTIONS.md')))throw new ConfigurationError('请选择真正的技能根目录，来源中未找到入口文件');
    const skipped=[];
    for(const entry of entries){
      const path=entry.path.slice(prefix.length);if(path.split('/').some(part=>excluded.has(part))){skipped.push(path);continue;}
      if(entry.mode==='120000'||entry.mode==='160000')throw new ConfigurationError('技能包包含符号链接或子模块：'+path);
      if(entry.type==='tree')continue;
      if(entry.type!=='blob'||entry.size>MAX_FILE)throw new ConfigurationError('技能资源不支持或过大：'+path);
      resourcePath(path);if(Object.keys(files).length>=MAX_FILES)throw new ConfigurationError('技能包文件过多');
      const bytes=await download('https://raw.githubusercontent.com/'+repo+'/'+sha+'/'+entry.path.split('/').map(encodeURIComponent).join('/'),MAX_FILE,signal);
      const gitHash=createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');if(gitHash!==entry.sha)throw new ConfigurationError('来源文件哈希不一致：'+path,502);
      files[path]=bytes;checkFiles(files);
    }
    origin={kind:'github',repository:repo,ref,commit:sha,subdirectory:sub,skippedCount:new Set(skipped).size,skipped:[...new Set(skipped)].slice(0,12)};
  }else throw new ConfigurationError('支持本地技能目录或公开GitHub仓库来源');
  const parsed=definition(files);origin.definitionHeader=parsed.originalHeader.slice(0,2000);
  const entry=files['SKILL.md']?'SKILL.md':'SKILL.yaml',original=files[entry],originalPath='.metis-origin/'+digest(original)+'/'+entry;
  files[originalPath]=Buffer.from(original);origin.definitionFile=originalPath;
  return stage({...parsed,id:requestedId||parsed.id,source:origin},files);
}
export function createSkill(raw){
  assertKeys(raw,['id','description','content','whenToUse','invocation','files'],'新技能');
  if(raw.files!==undefined&&!Array.isArray(raw.files))throw new ConfigurationError('技能files必须为数组');
  const files=Object.create(null);for(const file of raw.files||[]){assertKeys(file,['path','text'],'技能文件');const path=resourcePath(file.path);if(Object.hasOwn(files,path))throw new ConfigurationError('新技能文件路径重复：'+path);files[path]=Buffer.from(boundedText(file.text,'文件文本',MAX_FILE),'utf8');}
  return stage({...raw,source:{kind:'created'}},files);
}
export function pinSkill(skill){return skill.packageHash?skill:stage(skill,readDirectory(skill.root).files);}
export function updateSkill(id,patch,fileEdits,document){
  assertKeys(patch,['description','content','whenToUse','invocation','replacements','expectedContentHash'],'技能修改');
  if(patch.invocation!==undefined)assertKeys(patch.invocation,['modelInvocable','userInvocable'],'调用策略修改');
  if(fileEdits!==undefined&&!Array.isArray(fileEdits))throw new ConfigurationError('资源修改必须为数组');
  const previous=skillDocument(id,document),loaded=readDirectory(previous.root),files=loaded.files;
  const {replacements,expectedContentHash,...fields}=patch;
  if(replacements!==undefined){
    if(patch.content!==undefined||!Array.isArray(replacements)||!replacements.length||replacements.length>20)throw new ConfigurationError('正文局部修改需1至20项且不能同时整体替换content');
    if(expectedContentHash!==digest(Buffer.from(previous.content)))throw new ConfigurationError('技能正文版本已变化，请重新读取目标片段',409);
    let content=previous.content;
    for(const replacement of replacements){assertKeys(replacement,['find','replace'],'正文局部替换');const find=boundedText(replacement.find,'查找片段',8000,{empty:false}),replace=boundedText(replacement.replace,'替换片段',8000);const at=content.indexOf(find);if(at<0||content.indexOf(find,at+1)>=0)throw new ConfigurationError('待替换片段需在当前正文中唯一出现，未覆盖其他内容',409);content=content.slice(0,at)+replace+content.slice(at+find.length);}
    fields.content=content;
  }else if(expectedContentHash!==undefined)throw new ConfigurationError('expectedContentHash需与局部替换一起提供');
  const library=isLibraryPackage(previous.root);
  if(library)editLibraryResources(files,fileEdits);else for(const edit of fileEdits||[]){assertKeys(edit,['path','text','delete'],'资源修改');const path=resourcePath(edit.path);if(['SKILL.md','SKILL.yaml','INSTRUCTIONS.md'].includes(path))throw new ConfigurationError('技能入口正文请用content和description字段修改');if(path.startsWith('.metis-origin/'))throw new ConfigurationError('来源入口原文仅用于追溯，请修改技能正文或工作资源');if(edit.delete===true){if(!Object.hasOwn(files,path))throw new ConfigurationError('待删除资源不存在：'+path);delete files[path];}else files[path]=Buffer.from(boundedText(edit.text,'资源文本',MAX_FILE),'utf8');}
  return stage({id,...previous,...fields,invocation:{...previous.invocation,...fields.invocation},source:{...previous.source,modified:true}},files,{library});
}
export async function resourceDetails(id,document,path,{archived=false,...page}={}){
  if(!Object.hasOwn(document.skills,id))await primeLibrarySkills([id],{signal:page.signal});
  return readPinnedSkill(skillDocument(id,document,{archived}),{...page,path});
}

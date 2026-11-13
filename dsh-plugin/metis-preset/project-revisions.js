import {existsSync,mkdirSync,readdirSync,readFileSync,writeFileSync,renameSync,lstatSync,realpathSync,copyFileSync,chmodSync,rmSync} from 'node:fs';
import {join,resolve,relative,isAbsolute,dirname,basename,sep} from 'node:path';
import {randomUUID,createHash} from 'node:crypto';
import {configurationHome,ConfigurationError} from './configuration.js';

const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const uuid=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const fail=(message,status=400)=>new ConfigurationError(message,status);
function rootFor(projectId){if(typeof projectId!=='string'||!projectId.startsWith('mp-')||!uuid.test(projectId.slice(3)))throw fail('项目ID无效');return join(configurationHome(),'metis-project-revisions',projectId);}
function revisionRoot(projectId,id){if(typeof id!=='string'||!id.startsWith('rev-')||!uuid.test(id.slice(4)))throw fail('返修ID无效');return join(rootFor(projectId),id);}
function inside(root,path){const part=relative(root,resolve(path));return !part.startsWith('..'+sep)&&part!=='..'&&!isAbsolute(part);}
function writeManifest(folder,value){const path=join(folder,'manifest.json'),temporary=path+'.'+randomUUID()+'.tmp',text=JSON.stringify(value,null,2)+'\n';if(Buffer.byteLength(text)>10*1024*1024)throw fail('返修记录过大，未截断保存',413);try{writeFileSync(temporary,text,{flag:'wx',mode:0o600});renameSync(temporary,path);}finally{if(existsSync(temporary))rmSync(temporary);}}
export function createProjectRevisionStore(){
  function owners(project){const values=Array.isArray(project)?project:[project];if(!values.length||values.some(item=>item.id!==values[0].id))throw fail('历史所属项目不一致',409);return values;}
  function read(project,id){const scopes=owners(project),folder=revisionRoot(scopes[0].id,id),path=join(folder,'manifest.json');if(!existsSync(path))return null;const stat=lstatSync(path);if(stat.isSymbolicLink()||!stat.isFile()||stat.size>12*1024*1024)throw fail('返修历史记录损坏',409);const value=JSON.parse(readFileSync(path,'utf8'));if(value.version!==1||value.id!==id||value.projectId!==scopes[0].id||!scopes.some(scope=>value.sessionId===scope.sessionId&&value.versionId===scope.versionId)||!Array.isArray(value.steps))throw fail('返修历史与项目固定会话不一致',409);return value;}
  function archive(project,request,steps){
    const id='rev-'+request.requestId,existing=read(project,id),signature=digest(JSON.stringify({stepId:request.stepId,downstream:request.downstream,feedback:request.feedback}));
    if(existing){if(existing.signature!==signature)throw fail('同一返修请求已用于其他意见或范围',409);return existing;}
    const configuredBase=rootFor(project.id);mkdirSync(configuredBase,{recursive:true});if(lstatSync(configuredBase).isSymbolicLink())throw fail('历史目录不能是链接',409);const base=realpathSync(configuredBase);
    const stage=join(base,'.stage-'+randomUUID()),target=join(base,id);mkdirSync(stage,{recursive:false});
    let files=0,bytes=0,entries=0;
    function capture(source,destination,relativeName){
      if(++entries>8192||relativeName.split(sep).length>40)throw fail('历史目录条目过多或过深，未重置步骤',413);
      let stat;try{stat=lstatSync(source);}catch{return {source,name:basename(source),kind:'missing',note:'返修前原文件已缺失，未伪造历史文件'};}
      if(stat.isSymbolicLink())return {source,name:basename(source),kind:'link',note:'保留链接信息，不复制链接目标'};
      if(stat.isDirectory()){
        if(inside(source,base))throw fail('交付目录包含返修历史目录，不能递归归档自身',409);
        mkdirSync(destination,{recursive:true});const children=[];
        for(const name of readdirSync(source))children.push(capture(join(source,name),join(destination,name),join(relativeName,name)));
        return {source,name:basename(source),kind:'directory',archivePath:relativeName,children};
      }
      if(!stat.isFile())return {source,name:basename(source),kind:'unavailable'};
      if(++files>4096||stat.size>128*1024*1024||(bytes+=stat.size)>512*1024*1024)throw fail('返修历史超过文件或容量边界，未重置步骤或开始改写成果',413);
      mkdirSync(dirname(destination),{recursive:true});copyFileSync(source,destination);const copied=lstatSync(destination);if(copied.size!==stat.size)throw fail('原文件在归档时发生变化，本次返修未启动',409);
      const hash=digest(readFileSync(destination));chmodSync(destination,0o400);
      return {source,name:basename(source),kind:'file',archivePath:relativeName,bytes:copied.size,sha256:hash};
    }
    try{
      const value={version:1,id,projectId:project.id,sessionId:project.sessionId,versionId:project.versionId,stepId:request.stepId,downstream:request.downstream,feedback:request.feedback,signature,createdAt:new Date().toISOString(),phase:'prepared',steps:steps.map((step,stepIndex)=>{
        const delivery=step.item?.delivery;
        return {id:step.id,title:step.title,status:step.item?.status||'not_started',delivery:delivery?{at:delivery.at,text:delivery.text||'',independentlyReviewed:delivery.independentlyReviewed===true,artifacts:(delivery.artifacts||[]).map((artifact,index)=>{const archivePath=join('files',String(stepIndex)+'-'+index,basename(artifact.path));const actual=capture(artifact.path,join(stage,archivePath),archivePath);return {...actual,submittedSha256:artifact.sha256||null,matchesSubmitted:actual.kind==='file'?actual.sha256===artifact.sha256:null};})}:null};
      })};
      writeManifest(stage,value);renameSync(stage,target);return value;
    }finally{
      // Delete only the newly allocated staging directory, never source data.
      if(existsSync(stage)){const absolute=resolve(stage);if(dirname(absolute)!==base||!basename(absolute).startsWith('.stage-')||lstatSync(absolute).isSymbolicLink()||realpathSync(absolute)!==absolute)throw fail('历史暂存目录校验失败，未递归清理',409);rmSync(absolute,{recursive:true,force:true});}
    }
  }
  function queued(project,id){const value=read(project,id);if(!value)throw fail('返修历史不存在',404);value.phase='queued';value.queuedAt=value.queuedAt||new Date().toISOString();writeManifest(revisionRoot(project.id,id),value);return value;}
  function list(project,stepId,offset=0){
    if(!Number.isSafeInteger(offset)||offset<0)throw fail('历史分页参数无效');
    const projectId=owners(project)[0].id,root=rootFor(projectId),items=existsSync(root)?readdirSync(root).filter(name=>name.startsWith('rev-')&&uuid.test(name.slice(4))).map(id=>read(project,id)).filter(item=>item&&item.steps.some(step=>step.id===stepId)).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)):[];
    return {total:items.length,offset,items:items.slice(offset,offset+10).map(item=>({...item,steps:item.steps.filter(step=>step.id===stepId).map(step=>({...step,delivery:step.delivery?{...step.delivery,artifacts:step.delivery.artifacts.map(artifact=>{const {children,...summary}=artifact;return {...summary,...(children?{archiveDirectory:join(revisionRoot(projectId,item.id),artifact.archivePath),note:'历史目录已保存，可在此路径查看'}:{})};})}:null}))})),nextOffset:offset+10<items.length?offset+10:null};
  }
  function artifact(project,id,stepId,index){
    if(!Number.isSafeInteger(index)||index<0)throw fail('历史交付物编号无效');const value=read(project,id),step=value?.steps.find(item=>item.id===stepId),item=step?.delivery?.artifacts[index];if(!item||item.kind!=='file')throw fail('没有可下载的该历史文件',404);
    const root=revisionRoot(owners(project)[0].id,id),path=resolve(root,item.archivePath);if(!inside(root,path))throw fail('历史文件路径无效',409);const stat=lstatSync(path);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>128*1024*1024)throw fail('历史文件不可下载，请在历史目录查看',409);const bytes=readFileSync(path);if(digest(bytes)!==item.sha256)throw fail('历史文件内容已变化，未伪装成原交付物',409);return {bytes,name:item.name};
  }
  return {read,archive,queued,list,artifact};
}

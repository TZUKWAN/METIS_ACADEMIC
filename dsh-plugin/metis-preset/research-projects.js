import {existsSync,mkdirSync,readdirSync,readFileSync,writeFileSync,renameSync,lstatSync,realpathSync,openSync,closeSync,unlinkSync} from 'node:fs';
import {join,basename,isAbsolute,normalize,relative,sep,dirname} from 'node:path';
import {randomUUID,createHash} from 'node:crypto';
import {configurationHome,ConfigurationError} from './configuration.js';
import {createProjectRevisionStore} from './project-revisions.js';
import {recordMessageStep} from './project-message-context.js';

const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const uuid=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const sameRoot=(a,b)=>process.platform==='win32'?normalize(a).toLowerCase()===normalize(b).toLowerCase():normalize(a)===normalize(b);
const failure=(message,status=400)=>new ConfigurationError(message,status);
const home=()=>join(configurationHome(),'metis-research-projects');
function projectPath(id){if(typeof id!=='string'||!id.startsWith('mp-')||!uuid.test(id.slice(3)))throw failure('项目ID无效');return join(home(),id+'.json');}
function readRecord(id){
  const path=projectPath(id);if(!existsSync(path))throw failure('找不到研究项目',404);
  const stat=lstatSync(path);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>256*1024)throw failure('项目记录无效，未套用新配置',409);
  const value=JSON.parse(readFileSync(path,'utf8'));
  if(value.version!==1||value.id!==id||!['creating','ready','failed'].includes(value.status)||typeof value.root!=='string'||!isAbsolute(value.root)||typeof value.versionId!=='string'||typeof value.versionHash!=='string'||typeof value.name!=='string'||!value.name.trim()||value.name.length>120||typeof value.modeName!=='string'||typeof value.modeId!=='string'||value.status==='ready'&&(typeof value.sessionId!=='string'||!value.sessionId))throw failure('项目记录缺失或不兼容，未自动恢复成新流程',409);
  return value;
}
function records(){return existsSync(home())?readdirSync(home()).filter(name=>/^mp-[a-f0-9-]+\.json$/.test(name)).map(name=>name.slice(0,-5)):[];}
function writeRecord(record){const target=projectPath(record.id),temporary=target+'.'+randomUUID()+'.tmp';try{writeFileSync(temporary,JSON.stringify(record,null,2)+'\n',{flag:'wx',mode:0o600});renameSync(temporary,target);}finally{if(existsSync(temporary))unlinkSync(temporary);}}
function executionBrief(step){if(!step)return null;const text=typeof step.prompt==='string'?step.prompt:[step.systemPrompt,step.executionPrompt,step.reviewPrompt].filter(value=>typeof value==='string').join('\n\n');return text?{excerpt:text.slice(0,320),characters:text.length}:null;}

export function createResearchProjects({chooseVersion,getVersion,createSession,continueSession,readProgress,revisionTarget,promptRevision,cancelSession,runState}){
  const history=createProjectRevisionStore(),revising=new Set();
  function versionFor(record){const version=getVersion(record.versionId);if(version.hash!==record.versionHash||version.payload.modeId!==record.modeId)throw failure('项目固定流程不一致，未使用当前模式替代',409);return version;}
  function description(record,progress){return {id:record.id,name:record.name,root:record.root,modeId:record.modeId,modeName:record.modeName,versionId:record.versionId,createdAt:record.createdAt,sessionId:record.sessionId,status:record.status,total:progress?.total??null,submitted:progress?.submitted??null,percent:progress?.total?Math.round(progress.submitted/progress.total*100):null,currentStepId:progress?.currentStepId??null,currentStepTitle:progress?.currentStepTitle??'',runStatus:progress?.status||'not_started',recordedAt:progress?.recordedAt||null};}
  async function detail(id,{deliveries=true}={}){
    const record=readRecord(id),version=versionFor(record);
    if(record.status!=='ready')return {...description(record),error:record.error||'项目会话尚未确认创建完成，不会自动重复创建',steps:[]};
    const progress=await readProgress(record.sessionId,{includeDeliveries:deliveries});
    if(!progress||progress.versionId!==record.versionId||progress.modeId!==record.modeId)throw failure('项目会话与固定流程不一致，未更换已有会话配置',409);
    const row=version.payload.plugins.find(plugin=>plugin.name==='metis-academic-preset/step-skills'),frozenSteps=new Map(row.config.profile.steps.map(step=>[step.id,step])),frozenSkills=new Map((row.config.skills||[]).map(skill=>[skill.id,skill]));
    return {...description(record,progress),...(deliveries?{revision:progress.revision||null,activity:progress.activity||[],execution:runState(record.sessionId)}:{}),output:row.config.profile.output||{format:'auto'},steps:deliveries?progress.steps.map(step=>({...step,executionBrief:executionBrief(frozenSteps.get(step.id)),prohibitions:frozenSteps.get(step.id)?.prohibitions||'',skillBindings:(frozenSteps.get(step.id)?.skills||[]).map(id=>({id,name:frozenSkills.get(id)?.name||id})),loopCriteria:frozenSteps.get(step.id)?.loop?.criteria||'',delivery:step.delivery?{...step.delivery,artifacts:step.delivery.artifacts.map(artifact=>{
      let availability='missing';try{const stat=lstatSync(artifact.path);availability=stat.isSymbolicLink()?'link':stat.isFile()?'file':stat.isDirectory()?'directory':'unavailable';}catch{}
      return {...artifact,name:basename(artifact.path),availability};
    })}:null})):[]};
  }
  async function list(){
    const items=await Promise.all(records().map(async id=>{try{return await detail(id,{deliveries:false});}catch(error){let record;try{record=readRecord(id);}catch{}return {id,name:record?.name||'记录异常的项目',root:record?.root||'',modeName:record?.modeName||'',versionId:record?.versionId||null,status:'unavailable',percent:null,total:null,submitted:null,error:error.message};}}));
    return items.sort((a,b)=>(b.createdAt||'').localeCompare(a.createdAt||''));
  }
  async function create(request){
    if(!request||typeof request!=='object'||Array.isArray(request)||Object.keys(request).some(key=>!['name','root','modeId','expectedVersionId','requestId'].includes(key)))throw failure('新建项目参数无效');
    const requestId=request.requestId||randomUUID();if(typeof requestId!=='string'||!uuid.test(requestId))throw failure('新建项目请求ID无效');
    if(typeof request.name!=='string'||!request.name.trim()||request.name.length>120)throw failure('请填写项目名称，最多120字');
    if(typeof request.root!=='string'||request.root.length>2000||!isAbsolute(request.root))throw failure('请选择真实的项目目录');
    let root;try{root=realpathSync(request.root);if(!lstatSync(root).isDirectory())throw new Error();}catch{throw failure('项目目录不存在或不是目录');}
    const id='mp-'+requestId;
    if(existsSync(projectPath(id))){const previous=readRecord(id);if(!sameRoot(previous.root,root)||previous.name!==request.name.trim()||previous.modeId!==request.modeId||previous.versionId!==request.expectedVersionId)throw failure('此新建请求已经用于其他项目，未覆盖记录',409);return detail(id);}
    const version=await chooseVersion(request.modeId,request.expectedVersionId);
    mkdirSync(home(),{recursive:true});const lockPath=join(home(),'.create.lock');let lock;
    try{lock=openSync(lockPath,'wx',0o600);}catch{throw failure('另一个项目正在创建，请稍后重试',409);}
    try{
      if(existsSync(projectPath(id)))return detail(id);
      for(const otherId of records()){const other=readRecord(otherId);if(sameRoot(other.root,root))throw failure('该目录已关联项目“'+other.name+'”，请直接继续原项目或选择其他目录',409);}
      const record={version:1,id,requestId,status:'creating',name:request.name.trim(),root,modeId:version.payload.modeId,modeName:version.payload.name,versionId:version.id,versionHash:version.hash,createdAt:new Date().toISOString(),sessionId:'session-'+randomUUID()};
      writeRecord(record);
      try{const session=await createSession({sessionId:record.sessionId,cwd:root,agentPreset:version.id});if(session?.sessionId!==record.sessionId)throw new Error('原生DSH未返回此项目预定的新会话ID，未关联其他会话');record.status='ready';writeRecord(record);}
      catch(error){record.status='failed';record.error='原生项目会话创建未完成：'+error.message;try{writeRecord(record);}catch{}throw failure(record.error+(record.sessionId?'；实际会话ID：'+record.sessionId:''),503);}
      return detail(id);
    }finally{closeSync(lock);unlinkSync(lockPath);}
  }
  async function resume(id){const record=readRecord(id);versionFor(record);if(record.status!=='ready')throw failure('项目会话尚未成功创建，未新建其他会话替代',409);await continueSession(record.sessionId,record.versionId);return {id,root:record.root,sessionId:record.sessionId,versionId:record.versionId};}
  async function bindMessageStep(request) {
    if(!request||typeof request!=='object'||Array.isArray(request)||Object.keys(request).some(key=>!['id','sessionId','versionId','stepId','requestId'].includes(key))||typeof request.requestId!=='string'||!uuid.test(request.requestId))throw failure('项目消息参数无效');
    const {id,sessionId,versionId,stepId,requestId}=request;
    const project=readRecord(id);
    if(project.status!=='ready'||project.sessionId!==sessionId||project.versionId!==versionId)throw failure('查看步骤与当前项目会话不一致',409);
    const version=versionFor(project);
    const steps=version.payload.plugins.find(plugin=>plugin.name==='metis-academic-preset/step-skills')?.config?.profile?.steps;
    if(!Array.isArray(steps)||(stepId!==null&&!steps.some(step=>step.id===stepId)))throw failure('所查看的步骤不属于项目原流程',409);
    const {control}=await revisionTarget(sessionId,versionId,true);
    if(control?.focusedMessages!==true)throw failure('此项目会话需重新加载 METIS 的步骤对话支持',503);
    recordMessageStep(project,requestId,stepId);
    return {requestId,stepId};
  }
  async function revise(request){
    if(!request||typeof request!=='object'||Object.keys(request).some(key=>!['id','stepId','feedback','downstream','requestId'].includes(key))||typeof request.feedback!=='string'||!request.feedback.trim()||request.feedback.length>12000||!['keep','redo'].includes(request.downstream)||typeof request.requestId!=='string'||!uuid.test(request.requestId))throw failure('请填写修改意见并选择本步或后续重做范围');
    const record=readRecord(request.id);versionFor(record);if(record.status!=='ready')throw failure('项目原会话尚未就绪，未新建其他会话代替',409);
    if(revising.has(record.id))throw failure('该项目的返修请求正在提交，请稍后查看原请求',409);
    revising.add(record.id);
    try{
      const previous=history.read(record,'rev-'+request.requestId);
      if(previous?.phase==='queued'){if(previous.stepId!==request.stepId||previous.feedback!==request.feedback||previous.downstream!==request.downstream)throw failure('同一请求已用于其他修改意见',409);return {project:await detail(record.id),revision:previous};}
      const target=await revisionTarget(record.sessionId,record.versionId),snapshot=target.control.inspect(target.agent),index=snapshot.steps.findIndex(step=>step.id===request.stepId);if(index<0)throw failure('此步骤不属于项目原流程',409);
      if(snapshot.revision?.phase==='awaiting_downstream'||snapshot.revision?.decision?.dispatch==='pending')throw failure('请先在研究助手中处理上次修改的后续选择',409);
      const affected=request.downstream==='redo'?snapshot.steps.slice(index):[snapshot.steps[index]];
      if(affected.some(step=>step.item.pendingJobs?.length))throw failure('仍有后台任务记录，请先在研究对话中确认其结束',409);
      const revision=history.archive(record,request,affected);target.control.begin(target.agent,revision);
      const range=request.downstream==='keep'?'本次仅修改这一步，后续保留原交付，不自动重做。完成本步并交付后结束本轮。':'本次修改这一步，并按原流程顺序重新完成后续步骤；之前的步骤保持原样。';
      const message='请返修第'+(index+1)+'步「'+snapshot.steps[index].title+'」。\n'+range+'\n\n修改意见：\n'+request.feedback+'\n\n沿用此项目原有技能和验收要求，基于真实资料和文件修改后重新提交成果。返修前的交付记录与可读文件已另存历史，不要改动历史目录。';
      await promptRevision(record.sessionId,request.requestId,message);history.queued(record,revision.id);
      return {project:await detail(record.id),revision:{id:revision.id,stepId:revision.stepId,downstream:revision.downstream,phase:'queued'}};
    }finally{revising.delete(record.id);}
  }
  async function decideDownstream(request) {
    if(!request||typeof request!=='object'||Array.isArray(request)||Object.keys(request).some(key=>!['id','revisionId','choice'].includes(key)))throw failure('后续选择参数无效');
    const {id,revisionId,choice}=request;
    if(!['keep','redo'].includes(choice)||typeof revisionId!=='string'||!revisionId.startsWith('rev-')||!uuid.test(revisionId.slice(4)))throw failure('请选择当前返修的后续处理方式');
    const project=readRecord(id);versionFor(project);
    if(project.status!=='ready')throw failure('项目原会话尚未就绪',409);
    if(revising.has(id))throw failure('此项目正在处理修改，请稍后重试',409);
    revising.add(id);
    try {
      const progress=await readProgress(project.sessionId,{includeDeliveries:true});
      if(progress?.versionId!==project.versionId||progress.revision?.id!==revisionId||progress.revision.downstream!=='ask')throw failure('这次修改已更新，请重新查看当前项目',409);
      let revision=progress.revision;
      if(revision.decision){
        if(revision.decision.choice!==choice)throw failure('该次修改已有另一项后续选择',409);
        if(revision.decision.dispatch!=='pending')return {revision};
      }else if(revision.phase!=='awaiting_downstream')throw failure('本步尚未交付，暂不能处理后续步骤',409);
      const {agent,control}=await revisionTarget(project.sessionId,project.versionId,true);
      if(!control?.decide)throw failure('请重新加载项目步骤对话',503);
      const at=progress.steps.findIndex(step=>step.id===revision.stepId),suffix=progress.steps.slice(at+1);
      if(at<0||!suffix.length)throw failure('该次修改没有后续步骤',409);
      if(!revision.decision){
        const live=control.inspect(agent);
        if(live.revision?.id!==revisionId||live.revision.phase!=='awaiting_downstream')throw failure('项目的后续选择已更新',409);
        if(choice==='redo'){
          const later=live.steps.slice(at+1);
          if(later.some(step=>step.item.pendingJobs?.length))throw failure('后续步骤还有未确认结束的后台任务',409);
          history.archive(project,{requestId:revision.decisionRequestId,stepId:suffix[0].id,downstream:'redo',feedback:revision.feedback},later);
        }
        revision=control.decide(agent,revisionId,choice);
      }
      if(choice==='redo'&&revision.decision.dispatch==='pending'){
        const names=suffix.map(step=>step.title+'（'+step.id+'）').join('、');
        const text='我选择重做后续步骤。请先读取「'+progress.steps[at].title+'」刚交付的成果（metis_step.status，stepId='+revision.stepId+'），再从「'+suffix[0].title+'」开始，按顺序执行并提交：'+names+'。保留刚改好的这一步。';
        // A retry uses the very same DSH RPC ID, including after a dropped reply or restart.
        await promptRevision(project.sessionId,revision.decision.requestId,text);
        history.queued(project,'rev-'+revision.decision.requestId);control.dispatched(agent,revisionId);
      }
      return {revision};
    }finally{revising.delete(id);}
  }
  function revisions(id,stepId,offset){const record=readRecord(id);versionFor(record);return history.list(record,stepId,offset);}
  function revisionArtifact(id,revisionId,stepId,index){const record=readRecord(id);versionFor(record);return history.artifact(record,revisionId,stepId,index);}
  async function documentSource(id,stepId,index){
    if(!Number.isSafeInteger(index)||index<0)throw failure('交付物编号无效');
    const project=await detail(id),step=project.steps.find(item=>item.id===stepId),item=step?.delivery?.artifacts[index];
    if(!item)throw failure('只能打开此项目步骤已记录的交付物',404);
    let path,stat;try{stat=lstatSync(item.path);path=realpathSync(item.path);}catch{throw failure('交付物不存在',404);}
    const part=relative(realpathSync(project.root),path);
    if(!stat.isFile()||stat.isSymbolicLink()||part==='..'||part.startsWith('..'+sep)||isAbsolute(part)||!sameRoot(path,item.path))throw failure('仅支持项目目录内的真实交付文件',403);
    if(stat.size>50*1024*1024)throw failure('文档超过50MiB，请由研究助手按范围处理',413);
    const bytes=readFileSync(path),version=sha(bytes);
    return {project,step,path,name:basename(path),bytes,version,changedSinceDelivery:version!==item.sha256};
  }
  async function commitDocument(request,bytes){
    const {id,stepId,index,expectedVersion}=request;
    if(!Buffer.isBuffer(bytes)||bytes.length>50*1024*1024||!/^([a-f0-9]{64})$/.test(expectedVersion||''))throw failure('文档保存数据无效');
    if(revising.has(id))throw failure('此项目正在处理修改，请稍后保存',409);
    revising.add(id);
    try{
      const source=await documentSource(id,stepId,index);
      if(source.version!==expectedVersion)throw failure('文件已被AI或其他编辑修改，未覆盖；请先重新打开',409);
      const target=await revisionTarget(source.project.sessionId,source.project.versionId,true);
      if(!target.control?.manualEdit)throw failure('请正常重开DSH后使用文档保存，原会话配置保持不变',503);
      const snapshot=target.control.inspect(target.agent),step=snapshot.steps.find(item=>item.id===stepId);
      if(!step)throw failure('交付物步骤已改变',409);
      if(step.item.pendingJobs?.length||snapshot.revision?.phase==='awaiting_downstream'||snapshot.revision?.decision?.dispatch==='pending')throw failure('请先处理后台任务或后续步骤选择',409);
      history.archive(source.project,{requestId:randomUUID(),stepId,downstream:'keep',feedback:'用户在METIS中手动编辑了「'+source.name+'」，原文件与交付记录留存；新内容待重新核验。'},[step]);
      const digest=sha(bytes),temporary=join(dirname(source.path),'.metis-document-'+randomUUID());
      const result=target.control.manualEdit(target.agent,{stepId,index,path:source.path,sha256:digest,bytes:bytes.length},()=>{
        const latest=lstatSync(source.path);
        if(latest.isSymbolicLink()||!sameRoot(realpathSync(source.path),source.path)||sha(readFileSync(source.path))!==expectedVersion)throw failure('保存期间文件已变化，未覆盖',409);
        try{writeFileSync(temporary,bytes,{flag:'wx',mode:0o600});renameSync(temporary,source.path);}finally{if(existsSync(temporary))unlinkSync(temporary);}
        return ()=>{if(sha(readFileSync(source.path))!==digest)throw failure('记录保存失败且文件再次变化，未覆盖外部修改',409);try{writeFileSync(temporary,source.bytes,{flag:'wx',mode:0o600});renameSync(temporary,source.path);}finally{if(existsSync(temporary))unlinkSync(temporary);}};
      });
      return {...result,version:digest};
    }finally{revising.delete(id);}
  }
  async function artifact(id,stepId,index){
    if(!Number.isSafeInteger(index)||index<0)throw failure('交付物编号无效');
    const project=await detail(id),step=project.steps.find(item=>item.id===stepId),item=step?.delivery?.artifacts[index];
    if(!item)throw failure('该项目步骤没有这项已提交的交付物',404);
    let stat;try{stat=lstatSync(item.path);}catch{throw failure('已记录的交付物文件不存在，请在研究对话中处理',404);}
    if(!stat.isFile()||stat.isSymbolicLink())throw failure('此项是目录或链接，请在项目目录中查看',409);
    if(stat.size>128*1024*1024)throw failure('文件较大，请在项目目录中查看',413);
    const bytes=readFileSync(item.path);if(!item.sha256||sha(bytes)!==item.sha256)throw failure('交付物自提交后已改变，未当作原版本下载；请重新核对提交',409);
    return {bytes,name:basename(item.path)};
  }
  async function control(request){
    if(!request||typeof request!=='object'||Array.isArray(request)||Object.keys(request).some(key=>!['id','versionId','action','requestId'].includes(key))||!['start','cancel'].includes(request.action)||typeof request.requestId!=='string'||!uuid.test(request.requestId))throw failure('研究控制请求无效');
    const record=readRecord(request.id);versionFor(record);
    if(record.status!=='ready'||record.versionId!==request.versionId)throw failure('研究项目或固定流程已变化，未操作其他会话',409);
    if(request.action==='cancel'){if(typeof cancelSession!=='function')throw failure('原生停止接口尚未就绪',503);if(runState(record.sessionId).running)await cancelSession(record.sessionId);return {accepted:true,project:await detail(record.id)};}
    if(revising.has(record.id))throw failure('项目正在提交操作，请稍后查看',409);
    revising.add(record.id);
    try{
      if(record.controlRequest?.id===request.requestId){if(record.controlRequest.phase!=='admitted')throw failure('该开始请求已提交，结果待确认；请先查看原研究对话，未重复发送',409);return {accepted:true,duplicate:true,project:await detail(record.id)};}
      if(record.controlRequest?.phase==='pending')throw failure('上次开始请求的结果仍待确认，请先查看研究对话，未重复发送任务',409);
      await continueSession(record.sessionId,record.versionId);
      const progress=await readProgress(record.sessionId,{includeDeliveries:true});
      if(runState(record.sessionId).running)throw failure('研究已在执行中，未重复发送任务',409);
      if(!progress||progress.versionId!==record.versionId||progress.submitted===progress.total)throw failure('项目已交付或流程状态不可确认，请在助手中提出具体修改要求',409);
      if(progress.revision?.phase==='awaiting_downstream'||progress.revision?.decision?.dispatch==='pending')throw failure('请先选择后续步骤是否重做',409);
      if(progress.activity?.some(item=>['waiting','unverified'].includes(item.status)))throw failure('仍有后台任务待确认，请先在研究助手中处理',409);
      record.controlRequest={id:request.requestId,phase:'pending',at:new Date().toISOString()};writeRecord(record);
      const step=progress.steps.find(item=>item.id===progress.currentStepId);
      await promptRevision(record.sessionId,request.requestId,'请继续此项目的原有研究流程，从当前执行步骤「'+(step?.title||progress.currentStepTitle)+'」开始。只按本项目固定的步骤、技能和达标要求执行，逐步读取所需资料与技能；保留真实产物与证据，遇到缺失信息在本对话说明，不得虚构完成。');
      record.controlRequest.phase='admitted';writeRecord(record);
      return {accepted:true,project:await detail(record.id)};
    }finally{revising.delete(record.id);}
  }
  return {create,list,detail,resume,control,artifact,revise,revisions,revisionArtifact,bindMessageStep,decideDownstream,documentSource,commitDocument};
}

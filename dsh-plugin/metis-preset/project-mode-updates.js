/** New native execution sessions adopt saved workflows; source sessions stay intact. */
import {existsSync,mkdirSync,readFileSync,writeFileSync,lstatSync} from 'node:fs';
import {join} from 'node:path';
import {randomUUID,createHash} from 'node:crypto';
import {configurationHome} from './configuration.js';
import {workflowDifference,workflowFragment,workflowParts} from './project-workflow-sync.js';
import {ownerUserMessages} from './user-evidence.js';
import {ownerWorkflowPolicy} from './workflow-intent.js';
import {createProjectRevisionStore} from './project-revisions.js';
const digest=value=>createHash('sha256').update(value).digest('hex');
const workflowContentHash=value=>digest(JSON.stringify(value));
const fail=message=>Object.assign(new Error(message),{status:409});
const receiptHome=()=>join(configurationHome(),'metis-project-mode-updates');
const receiptPath=id=>{if(!/^[a-f0-9-]{36}$/.test(id))throw fail('模式更新回执ID无效');return join(receiptHome(),id+'.json');};
export function createProjectModeUpdates({records,readRecord,writeRecord,getVersion,getLatestVersion,refreshLatest,captureSessionSettings,applySessionSettings,forwardUserRequest,runState,getTarget,createSession,readProgress,revising}){
  const comparisons=new Map(),receipts=new Map(),inFlight=new Map(),memberships=new Map(),history=createProjectRevisionStore();
  function historyProjects(record){
    const scopes=[{id:record.id,sessionId:record.sessionId,versionId:record.versionId}];let capture=captureFor(record),depth=0;
    while(capture&&depth++<200){scopes.push({id:record.id,sessionId:capture.fromSessionId,versionId:capture.fromVersionId});capture=capture.previousReceipt?captureFor({id:record.id,modeSync:{lastApplied:capture.previousReceipt}}):null;}
    return scopes;
  }
  function captureFor(record,pending=false){
    const ref=pending?record.modeSync?.pending:record.modeSync?.lastApplied;if(!ref?.receiptId)return null;
    if(receipts.has(ref.receiptId))return receipts.get(ref.receiptId);
    const path=receiptPath(ref.receiptId),stat=lstatSync(path);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>80*1024*1024)throw fail('模式更新真实回执无效');
    const bytes=readFileSync(path);if(digest(bytes)!==ref.receiptHash)throw fail('模式更新回执哈希不匹配');
    const value=JSON.parse(bytes);if(value.projectId!==record.id||value.toSessionId!==ref.toSessionId||value.toVersionId!==ref.toVersionId)throw fail('模式更新回执归属不一致');receipts.set(ref.receiptId,value);return value;
  }
  function findSession(sessionId){
    const known=memberships.get(sessionId);if(known)try{return readRecord(known);}catch{memberships.delete(sessionId);}
    const rows=[];for(const id of records())try{rows.push(readRecord(id));}catch{}
    for(const record of rows)if(record.sessionId===sessionId||record.modeSync?.pending?.toSessionId===sessionId||record.modeSync?.lastApplied?.fromSessionId===sessionId){memberships.set(sessionId,record.id);return record;}
    for(const record of rows){let capture=captureFor(record),depth=0;while(capture&&depth++<200){if(capture.fromSessionId===sessionId){memberships.set(sessionId,record.id);return record;}capture=capture.previousReceipt?captureFor({id:record.id,modeSync:{lastApplied:capture.previousReceipt}}):null;}}
    return null;
  }
  function inheritedOwners(sessionId){
    const record=findSession(sessionId);if(!record)return [];
    let capture=record.modeSync?.pending?.toSessionId===sessionId?captureFor(record,true):captureFor(record),depth=0;
    while(capture&&capture.toSessionId!==sessionId&&depth++<200)capture=capture.previousReceipt?captureFor({id:record.id,modeSync:{lastApplied:capture.previousReceipt}}):null;
    return capture?.toSessionId===sessionId?capture.ownerMessages.map((row,index,all)=>({...row,index:index-all.length,origin:'previous-native-project-session'})):[];
  }
  function describe(record){
    const latest=getLatestVersion(record.modeId),last=record.modeSync?.lastApplied;
    const revision=record.modeSync?.revision||0;
    if(!latest)return {revision,status:'source-deleted',message:'来源模式已删除，项目保留实际使用版本，不切换到其他模式。',currentVersionId:record.versionId,latestVersionId:null,lastApplied:last||null};
    if(latest.id===record.versionId)return {revision,status:'current',currentVersionId:record.versionId,latestVersionId:latest.id,lastApplied:last||null,resumePending:!!(last&&(last.needsResponse??last.resumeAutonomous??(captureFor(record)?.forwardRequests?.length||captureFor(record)?.resumeAutonomous))&&!['queued','owner-paused'].includes(last.resumeDispatch))};
    const key=record.versionHash+':'+latest.hash;let difference=comparisons.get(key);if(!difference){difference=workflowDifference(getVersion(record.versionId),latest);comparisons.set(key,difference);}
    return {revision,status:inFlight.has(record.id)?'syncing':runState(record.sessionId)?.running?'waiting':'available',currentVersionId:record.versionId,latestVersionId:latest.id,difference,lastApplied:last||null,message:'已保存的模式有更新；空闲且没有未发送草稿时自动接续新版，旧会话与交付保留。'};
  }
  async function read(sessionId,{action='status',source='latest',stepId,messageIndex=0,offset=0,maxChars=6000}={}){
    await refreshLatest?.();
    const record=findSession(sessionId);if(!record)return {available:false};
    const update=describe(record),current=getVersion(record.versionId),latest=getLatestVersion(record.modeId),historical=sessionId!==record.sessionId;
    const inherited=inheritedOwners(sessionId);
    if(action==='owner'){
      if(!Number.isSafeInteger(messageIndex)||messageIndex<0||!Number.isSafeInteger(offset)||offset<0||!Number.isSafeInteger(maxChars)||maxChars<1||maxChars>6000)throw fail('原用户指令分页无效');
      const message=inherited[messageIndex];if(!message)throw fail('没有这条实际继承的原用户指令');
      return {available:true,source:'captured-original-native-owner-input',sourceSessionId:message.sourceSessionId,originalIndex:message.originalIndex,messageIndex,offset,text:message.text.slice(offset,offset+maxChars),characters:message.text.length,nextOffset:offset+maxChars<message.text.length?offset+maxChars:null};
    }
    if(action==='read'){
      if(source==='latest'&&!latest)return {available:true,projectId:record.id,latestMissing:true,workflow:update,next:'来源模式已删除，没有最新版本；可用source=current读取项目保留的实际旧版本。'};
      return {available:true,projectId:record.id,historical,...workflowFragment(source==='current'?current:latest,{stepId,offset,maxChars})};
    }
    if(action==='history'){
      if(!Number.isSafeInteger(offset)||offset<0)throw fail('历史分页无效');const rows=[];let capture=captureFor(record),depth=0;
      while(capture&&depth++<200){rows.push({receiptId:capture.id,fromSessionId:capture.fromSessionId,toSessionId:capture.toSessionId,fromVersionId:capture.fromVersionId,toVersionId:capture.toVersionId,deliveryHistoryRevisionId:capture.deliveryHistoryRevisionId||null,at:capture.at,changes:capture.difference.changes});capture=capture.previousReceipt?captureFor({id:record.id,modeSync:{lastApplied:capture.previousReceipt}}):null;}
      return {available:true,projectId:record.id,items:rows.slice(offset,offset+10),total:rows.length,nextOffset:offset+10<rows.length?offset+10:null};
    }
    const selected=[...new Set([0,...inherited.slice(-2).map((row,index)=>inherited.length-Math.min(2,inherited.length)+index)])].filter(index=>inherited[index]);
    const ownerInstructions={source:'captured-original-native-owner-input',total:inherited.length,messages:selected.map(messageIndex=>{const row=inherited[messageIndex];return {messageIndex,sourceSessionId:row.sourceSessionId,originalIndex:row.originalIndex,text:row.text.slice(0,1500),characters:row.text.length,truncated:row.text.length>1500};})};
    const progress=typeof readProgress==='function'?await readProgress(record.sessionId,{includeDeliveries:false}):null;
    const parts=workflowParts(latest||current);return {available:true,projectId:record.id,projectName:record.name,currentSessionId:record.sessionId,historical,workflow:update,ownerInstructions,
      progress:progress?{currentStepId:progress.currentStepId,submitted:progress.submitted,total:progress.total,steps:progress.steps.map(row=>({id:row.id,title:row.title,status:row.status}))}:null,
      latestSteps:parts.profile.steps.map(step=>({id:step.id,title:step.title,skillCount:step.skills?.length||0})),next:'read(source=latest,stepId)按需读取真实新版步骤；不要凭旧会话记忆断言没有更新。'+(historical?'本对话为保留的历史会话，当前项目已接续新版，不在此改写新版进度。':'')};
  }
  async function synchronize(request){
    if(!request||Object.keys(request).some(key=>!['id','sessionId','versionId','latestVersionId'].includes(key))||['id','sessionId','versionId','latestVersionId'].some(key=>typeof request[key]!=='string'||!request[key]||request[key].length>300))throw fail('模式同步参数无效');
    await refreshLatest?.();const existing=inFlight.get(request.id);if(existing)return existing;
    const operation=apply(request);inFlight.set(request.id,operation);try{return await operation;}finally{if(inFlight.get(request.id)===operation)inFlight.delete(request.id);}
  }
  async function dispatchResume(record,target=null){
    const ref=record.modeSync?.lastApplied;if(!ref)return {queued:false};
    const capture=captureFor(record);if(!capture||ref.resumeDispatch==='queued'||ref.resumeDispatch==='owner-paused')return {queued:ref.resumeDispatch==='queued'};
    if(capture.forwardRequests?.length){
      if(!forwardUserRequest)throw fail('原生请求转交接口尚未加载，真实请求仍保留待重试');
      ref.resumeDispatch='pending';writeRecord(record);
      try{for(const request of capture.forwardRequests)await forwardUserRequest(record,request);ref.resumeDispatch='queued';delete ref.resumeError;writeRecord(record);return {queued:true,forwarded:capture.forwardRequests.length};}
      catch(error){ref.resumeError=error.message;writeRecord(record);return {queued:false,error:error.message};}
    }
    if(!capture.resumeAutonomous)return {queued:false};
    if(!target)target=await getTarget(record.sessionId,record.versionId);
    const policy=ownerWorkflowPolicy(target.agent);
    if(!policy.autonomous||policy.paused){ref.resumeDispatch='owner-paused';writeRecord(record);return {queued:false,ownerPaused:true};}
    const messageId=ref.resumeMessageId||capture.id;
    const queued=[...(target.agent.inbox?.nextStep||[]),...(target.agent.inbox?.nextTurn||[])].some(message=>message.id===messageId)||target.agent.session.snapshotEvents().some(event=>event.type==='user/message'&&event.data.id===messageId);
    if(queued){ref.resumeDispatch='queued';delete ref.resumeError;writeRecord(record);return {queued:true};}
    if(target.agent.status==='running')return {queued:false,waiting:true};
    ref.resumeAutonomous=true;ref.resumeMessageId=messageId;ref.resumeDispatch='pending';writeRecord(record);
    try{
      target.agent.steer({id:messageId,role:'user',content:[{type:'text',text:'【METIS模式接续完成，平台通知】此前真实用户授权自主推进至交付，原执行已在步骤边界停止，现在按新版模式和实际继承进度继续。不得降低验收标准，真实缺项仍如实停留。'}],source:{kind:'notice',summary:'METIS · 接续新版流程'}});
      ref.resumeDispatch='queued';delete ref.resumeError;writeRecord(record);return {queued:true};
    }catch(error){ref.resumeError=error.message;writeRecord(record);return {queued:false,error:error.message};}
  }
  async function apply(request){
    let record=readRecord(request.id);if(record.status!=='ready')throw fail('项目尚未就绪');
    const latest=getLatestVersion(record.modeId);if(!latest)return {applied:false,status:'source-deleted'};
    if(record.versionId===latest.id)return {applied:true,duplicate:true,sessionId:record.sessionId,versionId:record.versionId,resume:await dispatchResume(record)};
    if(record.sessionId!==request.sessionId||record.versionId!==request.versionId||latest.id!==request.latestVersionId)throw fail('项目或最新模式已变化，重新读取后同步');
    if(revising.has(record.id)||runState(record.sessionId)?.running)return {applied:false,status:'waiting',reason:'研究或返修正在进行，保留本轮执行，空闲后接续。'};
    revising.add(record.id);
    try{
      const source=await getTarget(record.sessionId,record.versionId);
      if(runState(record.sessionId)?.running)return {applied:false,status:'waiting',reason:'原会话或所属任务仍在执行，空闲后接续。'};
      const exported=source.control.exportWorkflow?.(source.agent);if(!exported)throw fail('当前执行器缺少模式接续接口，请正常重开DSH加载新版后再同步');
      if(exported.record.revision&&['active','awaiting_downstream'].includes(exported.record.revision.phase))return {applied:false,status:'waiting',reason:'先完成本次返修或后续步骤选择，再接续新版模式。'};
      if(Object.values(exported.record.steps||{}).some(item=>item.pendingJobs?.length)||exported.record.activity?.some(item=>['running','waiting','unverified'].includes(item.status)))return {applied:false,status:'waiting',reason:'仍有后台任务待确认，结束后接续新版。'};
      const eventCount=source.agent.session.snapshotEvents().length,difference=workflowDifference(getVersion(record.versionId),latest);
      let pending=record.modeSync?.pending,capture=pending?captureFor(record,true):null;
      if(capture&&(capture.sourceEventCount!==eventCount||capture.toVersionId!==latest.id)){pending=null;capture=null;}
      if(!capture){
        const policy=ownerWorkflowPolicy(source.agent),events=source.agent.session.snapshotEvents(),ended=events.findLast(event=>event.type==='turn/end'),pause=exported.record.workflowUpdatePause;
        const remaining=(exported.profile?.steps||[]).some(step=>exported.record.steps[step.id]?.status!=='submitted'),completed=!!exported.profile?.steps?.length&&!remaining;
        const forwardRequests=(pause?.requests||[]).map(marker=>{
          const event=events.find(event=>event.seq===marker.eventSeq&&event.type==='agent/inbox/spliced'),message=event?.data.inserted?.find(message=>message.id===marker.messageId);
          if(!message||!['user','user-rpc'].includes(message.source?.kind)||message.source.principal!==undefined||workflowContentHash(message.content)!==marker.contentHash)throw fail('原生已入队请求的来源无法核对，未伪造转发');
          return {requestId:randomUUID(),sourceMessageId:message.id,sourceRpcId:message.source.rpcId||null,sourceSessionId:record.sessionId,sourceEventSeq:event.seq,stepId:marker.stepId,content:structuredClone(message.content)};
        });
        const id=randomUUID(),at=new Date().toISOString();capture={id,projectId:record.id,fromSessionId:record.sessionId,toSessionId:'session-'+randomUUID(),fromVersionId:record.versionId,toVersionId:latest.id,sourceEventCount:eventCount,at,difference,previousReceipt:record.modeSync?.lastApplied||null,
          sessionSettings:captureSessionSettings?captureSessionSettings(source.agent):null,
          forwardRequests,resumeAutonomous:!!(!forwardRequests.length&&remaining&&policy.autonomous&&!policy.paused&&pause&&(['blocked'].includes(ended?.data.reason?.kind)||pause.afterInquiry&&ended?.data.reason?.kind==='completed')),
          ownerMessages:ownerUserMessages(source.agent).map(row=>({text:row.text,sourceSessionId:row.sourceSessionId||source.agent.id,originalIndex:row.originalIndex??row.index,authorizationCompleted:!!row.authorizationCompleted||completed})),state:exported};
        const delivered=(exported.profile?.steps||[]).filter(step=>exported.record.steps[step.id]?.delivery).map(step=>({id:step.id,title:step.title,item:exported.record.steps[step.id]}));
        if(delivered.length)capture.deliveryHistoryRevisionId=history.archive(record,{requestId:id,stepId:delivered[0].id,downstream:'mode-update',feedback:'模式同步前保留的真实交付；原配置与文件版本留存。'},delivered).id;
        const text=JSON.stringify(capture)+'\n';if(Buffer.byteLength(text)>80*1024*1024)throw fail('真实接续回执超过80MiB，原会话与项目保持原样');
        const needsResponse=!!(capture.resumeAutonomous||capture.forwardRequests.length);
        mkdirSync(receiptHome(),{recursive:true,mode:0o700});writeFileSync(receiptPath(id),text,{flag:'wx',mode:0o600});pending={receiptId:id,receiptHash:digest(text),fromSessionId:record.sessionId,fromVersionId:record.versionId,toSessionId:capture.toSessionId,toVersionId:latest.id,deliveryHistoryRevisionId:capture.deliveryHistoryRevisionId||null,resumeAutonomous:capture.resumeAutonomous,needsResponse,resumeMessageId:id,resumeDispatch:needsResponse?'pending':'none',at};
        record.modeSync={...record.modeSync,pending};writeRecord(record);receipts.set(id,capture);
      }
      const session=await createSession({sessionId:capture.toSessionId,cwd:record.root,agentPreset:latest.id});if(session.sessionId!==capture.toSessionId)throw fail('原生DSH没有返回本次接续的会话ID，未切换项目');
      const target=await getTarget(capture.toSessionId,latest.id);if(!target.control.inheritWorkflow)throw fail('新版执行器尚未加载接续接口');
      if(applySessionSettings)applySessionSettings(target.agent,capture.sessionSettings);
      target.control.inheritWorkflow(target.agent,{...capture,state:capture.state,difference});
      const latestRecord=readRecord(record.id);
      if(runState(record.sessionId)?.running||source.agent.session.snapshotEvents().length!==eventCount){
        const pendingOwner=[...(target.agent.inbox?.nextStep||[]),...(target.agent.inbox?.nextTurn||[])].some(message=>['user','user-rpc'].includes(message.source?.kind)&&message.source.principal===undefined);
        if(target.agent.status!=='running'&&!pendingOwner&&!ownerUserMessages(target.agent).some(message=>message.index>=0))target.agent.cancel?.({kind:'parent'});
        latestRecord.modeSync={...latestRecord.modeSync,pending:null,lastError:'原会话在接续期间产生新记录，已保留原项目；空闲后重新捕获。'};writeRecord(latestRecord);return {applied:false,status:'waiting',reason:latestRecord.modeSync.lastError};
      }
      if(latestRecord.sessionId!==record.sessionId||latestRecord.versionId!==record.versionId||getLatestVersion(record.modeId)?.id!==latest.id)throw fail('同步期间项目或模式再次变化，原项目未覆盖');
      record={...latestRecord,sessionId:capture.toSessionId,versionId:latest.id,versionHash:latest.hash,modeName:latest.payload.name,controlRequest:undefined,modeSync:{revision:(latestRecord.modeSync?.revision||0)+1,pending:null,lastApplied:pending}};
      writeRecord(record);
      return {applied:true,sessionId:record.sessionId,versionId:record.versionId,previousSessionId:capture.fromSessionId,difference,resume:await dispatchResume(record,target)};
    }finally{revising.delete(record.id);}
  }
  return {describe,synchronize,read,inheritedOwners,historyProjects};
}

/** Goal-driven step control. Verdicts come from real evidence and the routed DSH model. */
import {existsSync,readFileSync,writeFileSync,mkdirSync,renameSync,lstatSync,unlinkSync} from 'node:fs';
import {join} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {configurationHome} from './configuration.js';
import {profileOutput,stepLoop,stepPromptText,stepSkillName} from './profiles.js';
import {ownerUserMessages} from './user-evidence.js';
import {projectMessageIntent,ownerWorkflowPolicy,configurationInquiry} from './workflow-intent.js';
import {createResearchLive,readResearchLive} from './research-live.js';
import {readMessageStep} from './project-message-context.js';
import {createProjectRevisionStore} from './project-revisions.js';
import {startStepActivity,finishStepActivity,readStepActivity,interruptStepActivity} from './step-activity.js';
import {inspectArtifacts as inspectEvidence,artifactFingerprint,MAX_ARTIFACTS,MAX_SUBMITTED_TEXT,evidenceFiles,readArtifactPage} from './artifact-evidence.js';
import {ExecutionEvidence,usageEvidenceId} from './execution-evidence.js';
import {runGoalReview,reviewKey,REVIEW_PROTOCOL} from './goal-review-session.js';
import {refreshContentState,markVerified,artifactRefs,restoreInterruptedCheck,stableFailedEvidence,sameDeliveredContent} from './step-evidence-state.js';
import {requiresUnits,openUnit,recordUnit,unitWriteGuard,unitEvidenceProblem} from './unit-contract.js';
import {systemRuntime,addUsage,recordedUsage} from './system-runtime.js';
import {mechanicalChecks} from './mechanical-checks.js';
import {noteRepeatedFailure} from './no-progress.js';
import {entryCommandProblem,imageInputProblem} from './entry-contract.js';
import {migrateWorkflowRecord} from './project-workflow-sync.js';
import {projectWorkflowContext} from './project-workflow-link.js';
import {dispatchNativeSkillTool,boundedNativeResult,boundedSkillExecutionResult,skillExecutionScope} from './native-skill-execution.js';

const digest=value=>createHash('sha256').update(typeof value==='string'?value:JSON.stringify(value)).digest('hex');
const reviewProtocol=REVIEW_PROTOCOL;
const revisionControlKey=Symbol.for('metis.runtime.step-revisions.v1');
const revisionControllers=globalThis[revisionControlKey]??=new WeakMap();
const pulseSymbol=Symbol.for('metis.step.pulse.v2'),pulseState=globalThis[pulseSymbol]??={revision:0,records:new Map()};
const pulseKey=(sessionId,scope)=>configurationHome()+'\0'+sessionId+'\0'+scope;
export function stepRevisionControlFor(registry,agent){
  const generation=registry.generationFor(agent.ctx),entries=generation?[...generation.mount.tree.entries()].filter(entry=>entry.options.name==='metis-academic-preset/step-skills'&&!entry.disabled):[];
  if(entries.length!==1)return null;
  // Cordis 4.1 returns a PromiseLike wrapper whose prototype is the Fiber.
  // Its plugin context retains the canonical owner used during activation.
  const fiber=entries[0].fiber;
  return revisionControllers.get(fiber?.ctx?.fiber)||revisionControllers.get(fiber)||null;
}
const ps=value=>"'"+String(value).replaceAll("'","''")+"'";
function actualPayload(args,item){const artifacts=args.artifacts??item.payload?.artifacts??[],text=args.text??item.payload?.text??'';if(!Array.isArray(artifacts)||artifacts.length>MAX_ARTIFACTS||artifacts.some(path=>typeof path!=='string'||!path||path.length>1200)||typeof text!=='string'||text.length>MAX_SUBMITTED_TEXT||!artifacts.length&&!text.trim())throw new Error('需要实际文本或最多32项核心产物路径；更多文件可提交真实目录');return {artifacts,text};}
function fileProblem(evidence,output){
  const invalid=evidence.files.filter(file=>!file.exists||file.kind!=='directory'&&!file.bytes);if(invalid.length)return '部分真实产物缺失、为空或无法读取：'+invalid.map(file=>file.path).join('、');
  const unavailable=evidenceFiles(evidence.files).filter(file=>file.needsEvidence&&['.pdf','.docx','.pptx','.md','.txt'].includes(file.kind));if(unavailable.length)return '产物内容尚不能真实取证：'+unavailable.map(file=>file.path+'：'+JSON.stringify(file.needsEvidence)).join('；');
  if(output?.format==='docx'&&!evidence.files.some(file=>file.kind==='.docx'&&file.parts?.includes('word/document.xml')))return '最终输出要求真实Word，但没有可读取的DOCX结构';
  if(output?.format==='pptx'&&!evidence.files.some(file=>file.kind==='.pptx'&&file.parts?.includes('ppt/presentation.xml')))return '最终输出要求真实PPT，但没有可读取的PPTX结构';
  if(output?.format==='pdf'&&!evidence.files.some(file=>file.kind==='.pdf'&&file.pdfHeader))return '最终输出要求PDF，但没有真实PDF文件头';
}
export function stepGoalProgress(sessionId,mode,profile,{includeDeliveries=false,liveOnly=false,sinceRevision=null,sinceSeq=0,instanceId=null}={}){
  if(typeof sessionId!=='string'||!sessionId||sessionId.length>200)throw new Error('实际会话ID无效');
  const scope=skillExecutionScope(mode,profile),path=join(configurationHome(),'metis-step-runs',digest(sessionId),scope+'.json'),pulse=pulseState.records.get(pulseKey(sessionId,scope));let record=pulse?.record||null,recordedAt=record?.updatedAt||null;
  if(liveOnly){
    const live=readResearchLive(sessionId,scope),delta=live?{...live,entries:live.instanceId===instanceId?live.entries.filter(entry=>entry.seq>sinceSeq):live.entries}:null;
    if(!pulse)return {live:delta,pulse:null};
    const current=profile.steps.find(step=>step.id===record.currentStepId),item=record.steps[record.currentStepId];
    return {live:delta,pulse:pulse.revision===sinceRevision?null:{revision:pulse.revision,recordedAt,currentStepId:record.currentStepId,currentStepTitle:current?.title||'',runStatus:item?.status||'not_started',runtime:record.runtime||null,cost:record.cost||null,blockedReason:item?.noProgress?.reason||(['blocked','needs_revision'].includes(item?.status)?item?.lastError||null:null),activity:readStepActivity(record).map(call=>({...call,resultPreview:call.resultPreview?.slice(0,500),resultTruncated:!!call.resultTruncated||(call.resultPreview?.length||0)>500})),steps:profile.steps.map(step=>({id:step.id,status:record.steps[step.id]?.status||'not_started',feedback:(record.steps[step.id]?.review?.verdict.feedback||[]).slice(0,2)}))}};
  }
  if(!record&&existsSync(path)){const stat=lstatSync(path);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>16*1024*1024)throw new Error('步骤进度记录无效');record=JSON.parse(readFileSync(path,'utf8'));if(record.version!==1||record.scope!==scope||record.sessionId!==sessionId)throw new Error('步骤进度与本会话固定流程不一致');recordedAt=record.updatedAt||stat.mtime.toISOString();}
  const steps=profile.steps.map(step=>{
    const item=record?.steps?.[step.id],value={id:step.id,title:step.title,loop:stepLoop(step).enabled,status:item?.status||'not_started'};
    if(includeDeliveries){
      value.purpose=step.instruction||'';value.expected=step.deliverables||'';value.feedback=(item?.review?.verdict.feedback||[]).slice(0,3);value.retainedAfterRevision=item?.retainedAfterRevision||null;value.delivery=null;
      if(item?.status==='submitted'||item?.delivery){
        const delivery=item.delivery;if(!delivery||!Array.isArray(delivery.artifacts)||typeof delivery.text!=='string'||!delivery.artifacts.length&&!delivery.text.trim())throw new Error('已提交步骤缺少真实交付记录，未当作完成');
        value.delivery={at:delivery.at,manuallyEditedAt:delivery.manuallyEditedAt||null,independentlyReviewed:delivery.independentlyReviewed===true,requiresRecheck:item.status!=='submitted'||!!item.deferredRecheck,text:delivery.text,...(delivery.configurationVersionId?{configurationVersionId:delivery.configurationVersionId}:{}),...(item.modeUpdate?{modeUpdate:item.modeUpdate}:{}),...(delivery.note?{note:delivery.note,noteIndependentlyReviewed:false}:{}),artifacts:delivery.artifacts.map(artifact=>({path:artifact.path,sha256:artifact.sha256,bytes:artifact.bytes,fileCount:artifact.fileCount,manifestHash:artifact.manifestHash}))};
      }
    }
    return value;
  }),currentIndex=Math.max(0,steps.findIndex(step=>step.id===record?.currentStepId)),current=steps[currentIndex],submitted=steps.filter(step=>step.status==='submitted').length,total=steps.length;
  const percent=total?Math.round(submitted/total*100):0,item=record?.steps?.[current?.id];
  return {sessionId,modeId:mode.id,modeName:mode.name,total,submitted,percent,currentStepId:current?.id||null,currentStepTitle:current?.title||'',currentIndex:currentIndex+1,status:current?.status||'not_started',iteration:item?.iteration||0,loop:current?.loop||false,recordedAt,pulseRevision:pulse?.revision||0,runtime:record?.runtime||{protocol:'legacy',buildId:'unknown'},cost:record?.cost||null,blockedReason:item?.noProgress?.reason||(['blocked','needs_revision'].includes(current?.status)?item?.lastError||null:null),units:item?.units||null,feedback:(item?.review?.verdict.feedback||[]).slice(0,2),steps,...(includeDeliveries?{revision:record?.revision||null,activity:readStepActivity(record),live:readResearchLive(sessionId,scope)}:{})};
}
function realUserEvidence(agent){return ownerUserMessages(agent);}
function prohibitionReason(text,execution,description=''){
  const deny='(?:禁止|不得|不要|严禁|不准|不允许)',args=execution.arguments||{},command=typeof args.command==='string'?args.command:'',name=execution.name||'';
  if(/metis-step-runs|metis-step-evidence|metis-session-versions|metis-composer-workspaces|metis-project-mode-updates|metis-project-revisions|metis-research-projects/i.test(JSON.stringify(args))&&/write|edit|delete|remove|pwsh|bash/i.test(name)&&/write|edit|delete|remove|set-content|out-file|write_text|writefile|unlink|rmtree|open\(.+['"]w/i.test(name+' '+command))return '不得改写METIS内部核验或版本记录来绕过真实达标检查';
  if(!text?.trim())return;
  const has=words=>new RegExp(deny+'[^。；\\n]{0,24}(?:'+words+')','i').test(text);
  if(has('联网|上网|互联网|网络访问|网页检索|网页搜索')&&(/(?:web|browser|chrome|mcp__.*(?:fetch|search|navigate|download|connect))/i.test(name+' '+description)||/https?:\/\/|invoke-webrequest|invoke-restmethod|\bcurl\b|requests\.|httpx\.|urllib\.|\bfetch\s*\(|pip\s+install|npm\s+(?:install|ci)|uv\s+tool\s+install/i.test(command)))return '本步骤禁止联网，当前工具或命令包含网络访问';
  if(has('控制电脑|控制桌面|操作桌面|控制界面|鼠标|键盘|截图|浏览器操作')&&(/browser|chrome|desktop|computer|mouse|keyboard|screenshot|cua|playwright/i.test(name)||/sendkeys|wscript\.shell|pyautogui|\.visible\s*=\s*(?:true|1)|start-process.+(?:chrome|msedge|powerpnt|winword)/i.test(command)))return '本步骤禁止桌面/浏览器交互或截图，未启动该操作';
  if(has('删除|移除原始|覆盖原始')&&(/delete|remove|unlink/i.test(name)||/remove-item|\brm\s|\brmdir\b|\bdel\s|shutil\.rmtree|os\.(?:remove|unlink)/i.test(command)))return '本步骤禁止删除或改动原始资料，当前调用包含删除操作';
  if(has('子代理|子智能体|多个agent|其他agent|团队|并行代理')&&/spawn|delegate|agent.*create|team.*create/i.test(name))return '本步骤禁止启动其他Agent';
  if(has('执行代码|运行代码|执行脚本|运行脚本|终端|命令行')&&/^(?:pwsh|bash|run_code|.*exec.*)$/i.test(name))return '本步骤禁止执行代码/终端命令';
}
export function registerStepGoals(ctx,mode,profile){
  const scope=skillExecutionScope(mode,profile),states=new Map(),controlTokens=new Set();
  let researchLive=null;
  const viewedTurns=new WeakMap(),revisionHistory=createProjectRevisionStore(),projectNotices=new WeakMap(),configurationTurns=new WeakMap();
  function projectOwner(agent){
    const registry=ctx.get('agents'),live=registry?.list()||[],seen=new Set();let current=agent;
    while(current&&!seen.has(current)){seen.add(current);const value=states.get(current);if(value)return value.agent;current=live.find(candidate=>candidate!==current&&registry.isOwnedBy?.(current.id,candidate));}
    return agent;
  }
  const viewNotices=ctx.on('agent/pre-step',async({agent,turn,signal,modelSelection},next)=>{
    const decision=await next();
    if(decision.kind!=='enter'||signal.aborted)return decision;
    const workflow=await projectWorkflowContext(projectOwner(agent).session.id);
    const actualOwnerInputs=decision.messages.filter(message=>['user','user-rpc'].includes(message.source?.kind)&&message.source.principal===undefined);
    if(actualOwnerInputs.some(message=>configurationInquiry(message.content.filter(block=>block.type==='text').map(block=>block.text).join('\n'))))configurationTurns.set(agent,turn);
    let modeNotice=null;
    if(workflow.available){
      const value=state(agent);value.projectWorkflow=workflow;
      const pending=workflow.workflow.latestVersionId&&workflow.workflow.currentVersionId!==workflow.workflow.latestVersionId;
      const freshQuestion=decision.messages.some(message=>['user','user-rpc'].includes(message.source?.kind)&&message.source.principal===undefined&&projectMessageIntent(message.content.filter(block=>block.type==='text').map(block=>block.text).join('\n'))==='discuss');
      const item=value.record.steps[value.record.currentStepId];
      if(pending&&!workflow.historical&&!freshQuestion&&(!item||['submitted','not_started'].includes(item.status))){
        const events=agent.session.snapshotEvents(),requests=[];
        for(const message of actualOwnerInputs){
          const proof=events.findLast(event=>event.type==='agent/inbox/spliced'&&(event.data.inserted||[]).some(input=>input.id===message.id&&['user','user-rpc'].includes(input.source?.kind)&&input.source.principal===undefined));
          if(!proof)continue;
          const original=proof.data.inserted.find(input=>input.id===message.id);
          const selected=readMessageStep(agent,message,ctx.get('agentPresets')?.composedPreset(agent.ctx));
          requests.push({messageId:message.id,eventSeq:proof.seq,contentHash:digest(original.content),sourceRpcId:original.source.rpcId||null,stepId:selected?.stepId??null});
        }
        value.record.workflowUpdatePause={toVersionId:workflow.workflow.latestVersionId,at:new Date().toISOString(),reason:'在步骤边界接续已保存的新模式',requests};persist(value);return {kind:'reject'};
      }
      const identity=JSON.stringify({current:workflow.workflow.currentVersionId,latest:workflow.workflow.latestVersionId,historical:workflow.historical});
      if(projectNotices.get(agent)!==identity||decision.messages.some(message=>['user','user-rpc'].includes(message.source?.kind)&&message.source.principal===undefined)){
        projectNotices.set(agent,identity);modeNotice={id:randomUUID(),role:'user',source:{kind:'notice',summary:'METIS · 项目模式版本'},content:[{type:'text',text:'【真实项目模式状态，平台上下文，不是新增用户授权】\n'+JSON.stringify(workflow)+'\n用metis_project按需读取保存的最新步骤；不要根据旧对话记忆声称没有更新。旧会话历史不能覆盖当前项目新版进度。'}]};
      }
    }
    let stopped;for(const[owner,value]of states)if(owner===agent||ctx.get('agents')?.isOwnedBy?.(agent.id,owner)){stopped=value;break;}const stoppedItem=stopped?.record.steps[stopped.record.currentStepId];
    if(stoppedItem?.noProgress){
      const freshOwner=decision.messages.some(message=>['user','user-rpc'].includes(message.source?.kind)&&message.source.principal===undefined);
      let completedPreparation=false;
      for(const job of stoppedItem.preflightJobs||[])try{const view=ctx.get('jobs')?.get(job.id,job.owner);if(view&&!['running','stopping'].includes(view.status)&&!job.notified){job.notified=true;completedPreparation=true;}}catch{}
      const oldRoute=stopped.record.lastModelRoute||stoppedItem.lastReviewAttempt;
      const changedModel=oldRoute?.provider&&modelSelection?.provider&&(oldRoute.provider!==modelSelection.provider||oldRoute.model!==modelSelection.model);
      if(!freshOwner&&!completedPreparation&&!changedModel)return {kind:'reject'};
      delete stoppedItem.noProgress;delete stoppedItem.repeatedEvidence;delete stoppedItem.lastRepeatedFailure;persist(stopped);
    }
    if(stopped&&modelSelection?.provider&&(stopped.record.lastModelRoute?.provider!==modelSelection.provider||stopped.record.lastModelRoute?.model!==modelSelection.model)){stopped.record.lastModelRoute={provider:modelSelection.provider,model:modelSelection.model};persist(stopped);}
    let batch=viewedTurns.get(agent);
    if(batch?.turn!==turn){batch={turn,messages:new Map(),last:null};viewedTurns.set(agent,batch);}
    const messages=modeNotice?[modeNotice]:[];
    for(const message of decision.messages){
      messages.push(message);
      if(!['user','user-rpc'].includes(message.source?.kind))continue;
      const bound=readMessageStep(agent,message,ctx.get('agentPresets')?.composedPreset(agent.ctx));
      if(!bound){
        batch.last=null;batch.messages.clear();
        if(message.source.principal===undefined&&projectMessageIntent(message.content.filter(block=>block.type==='text').map(block=>block.text).join('\n'))==='advance'){
          const value=state(agent);if(value.record.revision?.phase==='completed'){value.record.revision.resumedByOwner={requestId:message.source.rpcId,at:new Date().toISOString()};persist(value);}
        }
        continue;
      }
      if(bound.stepId===null){
        batch.last=null;batch.messages.clear();
        messages.push({id:randomUUID(),role:'user',source:{kind:'notice',summary:'项目整体'},content:[{type:'text',text:'本条用户消息发送时中间栏的步骤均已收起，正在查看项目整体。按本条用户意图回答。'}]});
        continue;
      }
      const index=profile.steps.findIndex(step=>step.id===bound.stepId);
      if(index<0)throw new Error('此消息查看的原步骤已经无法验证');
      const selected=profile.steps[index];
      const feedback=message.content.filter(block=>block.type==='text').map(block=>block.text).join('\n');
      const intent=projectMessageIntent(feedback),focus={...bound,feedback,intent};batch.messages.set(bound.requestId,focus);batch.last=focus;
      const value=state(agent),policy=ownerWorkflowPolicy(agent),pending=profile.steps.find(step=>value.record.steps[step.id]?.status!=='submitted');
      if(intent==='advance'&&value.record.revision?.phase==='completed'){value.record.revision.resumedByOwner={requestId:bound.requestId,at:new Date().toISOString()};persist(value);}
      const context=[
        `本条用户消息发送时正在查看第 ${index+1} 步「${selected.title}」，stepId=${selected.id}，requestId=${bound.requestId}。`,
        '目的：'+(selected.instruction||'').slice(0,900)+'；交付要求：'+(selected.deliverables||'').slice(0,700),
        intent==='advance'?'本条是确认或继续执行指令，不是返修意见。不要对已交付步骤调用revise_viewed，也不要仅因正在查看旧步骤而重新修改它。按真实进度继续，下一未交付步骤：'+(pending?pending.title+'（'+pending.id+'）':'全部已交付，可报告实际成果')+'。':
          '只有用户确实指出本步成果需要修改时，才用 metis_step.revise_viewed 关联该消息、保存旧交付并返修。查看步骤只是上下文，不代表要求修改。',
        policy.autonomous?'用户已明确授权自主推进至交付，无需逐步确认。逐步open、执行、check和submit；已授权范围内交付后继续，只有真实缺项、权限或核验失败才停留处理。':
          '单纯提问、讨论或要求先别动时，只回答；需了解本步交付可用status。真实返修后，如已有后续成果且未获范围授权，才由界面询问是否重做。'
      ].join('\n');
      messages.push({id:randomUUID(),role:'user',source:{kind:'notice',summary:'正在查看 · '+selected.title},content:[{type:'text',text:context}]});
    }
    return !modeNotice&&messages.length===decision.messages.length?decision:{...decision,messages};
  },{prepend:true});
  function state(agent){
    const owner=projectOwner(agent),inherited=states.get(owner);if(inherited){reconcileFlow(inherited);return inherited;}
    const sessionId=agent.session.id,key=digest(sessionId),folder=join(configurationHome(),'metis-step-runs',key);mkdirSync(folder,{recursive:true,mode:0o700});if(lstatSync(folder).isSymbolicLink())throw new Error('步骤状态目录不能是链接');
    const path=join(folder,scope+'.json'),record=existsSync(path)?JSON.parse(readFileSync(path,'utf8')):{version:1,scope,sessionId,currentStepId:null,steps:{}};
    if(record.version!==1||record.scope!==scope||record.sessionId!==sessionId)throw new Error('步骤核验状态与当前会话固定版本不一致');
    interruptStepActivity(record);
    record.runtime=systemRuntime();
    for(const item of Object.values(record.steps))restoreInterruptedCheck(item);
    for(const [id,item]of Object.entries(record.steps))if(stepLoop(profile.steps.find(step=>step.id===id)||{}).enabled&&['passed','submitted'].includes(item.status)){
      if(item.status==='submitted'&&item.delivery?.independentlyReviewed===true){delete item.deferredRecheck;continue;}
      if(item.status==='passed'&&item.review?.protocol===reviewProtocol&&item.review.verdict?.passed&&item.evidenceHash&&Array.isArray(item.verifiedArtifacts)){delete item.deferredRecheck;continue;}
      item.status='needs_recheck';item.review=null;item.evidenceHash=null;item.restored=true;
    }
    const firstRestore=profile.steps.find(step=>stepLoop(step).enabled&&record.steps[step.id]?.status==='needs_recheck');if(firstRestore)record.currentStepId=firstRestore.id;
    const ledger=new ExecutionEvidence(sessionId,scope);ledger.hydrate(agent);record.cost=recordedUsage(ledger);
    const value={agent,path,record,ledger};states.set(agent,value);reconcileFlow(value);return value;
  }
  function persist(value){value.record.updatedAt=new Date().toISOString();const temporary=value.path+'.tmp-'+randomUUID();try{writeFileSync(temporary,JSON.stringify(value.record)+'\n',{flag:'wx',mode:0o600});renameSync(temporary,value.path);pulseState.records.set(pulseKey(value.record.sessionId,scope),{revision:++pulseState.revision,record:value.record});}finally{if(existsSync(temporary))unlinkSync(temporary);}}
  function current(agent,stepId){const value=state(agent);if(value.record.currentStepId!==stepId)throw new Error('先通过metis_library.open进入当前步骤，不能越过本步核验');return value;}
  function row(value,stepId){return value.record.steps[stepId]??={status:'working',iteration:0,nativeCalls:[],pendingJobs:[]};}
  function activityStep(value,execution){
    const explicit=['metis_library','metis_step'].includes(execution.name)?execution.arguments?.stepId:null;
    if(explicit&&profile.steps.some(step=>step.id===explicit))return explicit;
    return value.record.currentStepId||null;
  }
  const activityStarted=ctx.on('tools/execute',async(execution,next)=>{
    if(execution.agent){
      const value=state(execution.agent);
      startStepActivity(value.record,execution,activityStep(value,execution));persist(value);
      try{researchLive?.toolStart(execution,value);}catch{/* Realtime presentation must not affect execution. */}
    }
    return next();
  },{prepend:true});
  const activityFinished=ctx.on('tools/result',(execution,result)=>{
    if(!execution.agent)return;
    const value=state(execution.agent);
    finishStepActivity(value.record,execution,result,activityStep(value,execution));
    if(result.isError&&value.record.currentStepId){const item=row(value,value.record.currentStepId),text=(result.content||[]).filter(block=>block.type==='text').map(block=>block.text).join('\n');noteRepeatedFailure(item,{key:digest({name:execution.name,arguments:execution.arguments,error:text,facts:value.ledger.semanticFingerprint(value.record.currentStepId)}),ownerCount:realUserEvidence(execution.agent).length,reason:text.slice(0,700)});}
    persist(value);
    try{researchLive?.toolEnd(execution,value,result);}catch{/* Keep the native tool result authoritative. */}
  });
  function awaitingOtherChoice(prior,stepId,downstream){
    return prior?.phase==='awaiting_downstream'&&!(downstream==='ask'&&prior.stepId===stepId);
  }
  function revisionProject(value,revision){
    const versionId=ctx.get('agentPresets')?.composedPreset(value.agent.ctx);
    if(revision.projectId&&versionId)return {id:revision.projectId,sessionId:value.record.sessionId,versionId};
    const owners=new Set(ownerUserMessages(value.agent).map(message=>message.index));
    const events=value.agent.session.snapshotEvents();
    for(let index=0;index<events.length;index++)if(owners.has(index)&&events[index].data.source?.rpcId===revision.id.slice(4)){
      const bound=readMessageStep(value.agent,events[index].data,versionId);
      if(bound?.stepId===revision.stepId)return {id:bound.projectId,sessionId:bound.sessionId,versionId:bound.versionId};
    }
    return null;
  }
  function authorizedContinuation(value){
    const revision=value.record.revision,policy=ownerWorkflowPolicy(value.agent);
    if(revision?.phase!=='awaiting_downstream'||!policy.autonomous||value.record.steps[revision.stepId]?.status!=='submitted')return false;
    const suffix=profile.steps.slice(profile.steps.findIndex(step=>step.id===revision.stepId)+1);
    if(!suffix.length)return false;
    if(suffix.some(step=>value.record.steps[step.id]?.pendingJobs?.length)){revision.continuationError='后续仍有后台任务待确认，先跟进真实任务结果';return false;}
    try{
      const redo=suffix.some(step=>value.record.steps[step.id]?.delivery);
      const requestId=revision.decisionRequestId||randomUUID();
      if(redo){
        const project=revisionProject(value,revision);
        if(!project)throw new Error('无法确认原项目历史归属，未覆盖后续成果');
        revisionHistory.archive(project,{requestId,stepId:suffix[0].id,downstream:'redo',feedback:revision.feedback},suffix.map(step=>({id:step.id,title:step.title,item:value.record.steps[step.id]||{}})));
        for(const step of suffix)value.record.steps[step.id]={status:'needs_revision',iteration:0,nativeCalls:[],pendingJobs:[],revisionId:revision.id};
        revision.stepIds=suffix.map(step=>step.id);revision.phase='active';value.record.currentStepId=suffix[0].id;
      }else{revision.phase='completed';revision.completedAt=new Date().toISOString();}
      revision.decision={choice:redo?'redo':'continue',requestId,at:new Date().toISOString(),dispatch:'queued',source:'owner-autonomy',ownerIndex:policy.ownerIndex};
      revision.autoAdvance=true;delete revision.continuationError;return true;
    }catch(error){revision.continuationError=error.message;return false;}
  }
  function reconcileFlow(value){
    const revision=value.record.revision;if(!revision)return;
    // Migrate only an actual owner continuation that the old implementation
    // mistakenly stored as feedback. Never promote a verdict or edit a file.
    if(!revision.intentCorrection&&projectMessageIntent(revision.feedback)==='advance'&&ownerUserMessages(value.agent).some(message=>message.text.trim()===revision.feedback.trim())){
      revision.intentCorrection={kind:'continue-not-revision',at:new Date().toISOString()};revision.phase='completed';delete revision.finishedTurn;persist(value);
    }
    if(authorizedContinuation(value))persist(value);
  }
  function beginRevision(value,revision){
      if(value.record.revision?.id===revision.id)return value.record.revision;
      if(awaitingOtherChoice(value.record.revision,revision.stepId,revision.downstream)||value.record.revision?.decision?.dispatch==='pending')throw Object.assign(new Error('请先处理上次修改的后续步骤选择'),{status:409});
      const index=profile.steps.findIndex(step=>step.id===revision.stepId);if(index<0||!['keep','redo','ask'].includes(revision.downstream))throw new Error('返修范围不属于项目固定流程');
      const affected=revision.downstream==='redo'?profile.steps.slice(index):[profile.steps[index]];
      if(affected.some(step=>row(value,step.id).pendingJobs?.length))throw Object.assign(new Error('所选步骤仍有后台任务记录，请先在研究对话中确认任务结束'),{status:409});
      // Owner-selected scope preserves historical submissions outside that scope.
      // Cold-restored loop evidence is rechecked if that step is opened again;
      // preserving its old delivery is not a new independent passing verdict.
      for(const step of profile.steps.filter(step=>!affected.some(item=>item.id===step.id))){const item=value.record.steps[step.id];if(item?.status==='needs_recheck'&&item.restored&&item.delivery){item.status='submitted';item.deferredRecheck=true;}}
      for(const step of affected)value.record.steps[step.id]={status:'needs_revision',iteration:0,nativeCalls:[],pendingJobs:[],revisionId:revision.id};
      if(revision.downstream==='keep')for(const step of profile.steps.slice(index+1)){const item=value.record.steps[step.id];if(item?.delivery)item.retainedAfterRevision={id:revision.id,stepId:revision.stepId,at:revision.createdAt};}
      value.record.currentStepId=revision.stepId;value.record.revision={id:revision.id,projectId:revision.projectId,stepId:revision.stepId,downstream:revision.downstream,feedback:revision.feedback,createdAt:revision.createdAt,phase:'active',stepIds:affected.map(step=>step.id)};persist(value);return value.record.revision;
  }
  function finishBatch(value){
    const revision=value.record.revision;
    if(revision?.phase!=='active'||!revision.stepIds.every(id=>value.record.steps[id]?.status==='submitted'))return;
    const hasLater=profile.steps.at(-1)?.id!==revision.stepId;
    if(revision.downstream==='ask'&&!revision.decision&&hasLater){
      revision.phase='awaiting_downstream';revision.decisionRequestId=randomUUID();
      if(!profile.steps.slice(profile.steps.findIndex(step=>step.id===revision.stepId)+1).some(step=>value.record.steps[step.id]?.delivery)){
        revision.phase='completed';revision.completedAt=new Date().toISOString();revision.autoAdvance=ownerWorkflowPolicy(value.agent).autonomous;
      }else authorizedContinuation(value);
    }else{revision.phase='completed';revision.completedAt=new Date().toISOString();}
  }
  function revisionFromMessage(agent,stepId,requestId){
    const batch=viewedTurns.get(agent),focus=requestId?batch?.messages.get(requestId):(batch?.messages.size===1?batch.last:null);
    if(!focus||focus.stepId!==stepId||focus.sessionId!==agent.session.id)throw new Error('只能修改这条用户消息实际关联的步骤');
    if(!focus.feedback.trim()||focus.feedback.length>12000)throw new Error('请用一条文字消息描述本步修改意见（最多12000字）');
    if(['advance','pause'].includes(focus.intent||projectMessageIntent(focus.feedback)))throw new Error('这条消息是继续或暂停指令，不是返修意见；继续时请open真实下一未交付步骤，不要重置已交付成果');
    const value=state(agent),id='rev-'+focus.requestId,prior=value.record.revision;
    const project={id:focus.projectId,versionId:focus.versionId,sessionId:focus.sessionId};
    const existing=revisionHistory.read(project,id);
    if(prior?.id===id){if(!existing)throw new Error('返修前交付记录缺失');if(existing.phase==='prepared')revisionHistory.queued(project,id);return {revision:prior,archived:existing};}
    if(existing?.phase==='queued')throw new Error('此条修改意见已处理，请使用最新用户反馈');
    if(awaitingOtherChoice(prior,stepId,'ask')||prior?.decision?.dispatch==='pending')throw new Error('请先处理上次修改的后续步骤选择');
    if(prior?.phase==='active'&&(prior.stepId!==stepId||prior.decision?.choice==='redo'))throw new Error('项目另有未交付的返修，请先处理该次修改');
    const item=value.record.steps[stepId]||{};
    if(item.pendingJobs?.length)throw new Error('请先确认本步已有后台任务结束，再返修');
    const request={stepId,requestId:focus.requestId,feedback:focus.feedback,downstream:'ask'};
    const step=profile.steps.find(s=>s.id===stepId);
    const archived=revisionHistory.archive(project,request,[{id:step.id,title:step.title,item}]);
    const revision=beginRevision(value,archived);revisionHistory.queued(project,archived.id);return {revision,archived};
  }
  const revisionControl={
    focusedMessages:true,
    workflowContinuation:2,
    exportWorkflow:agent=>{
      if(agent.status==='running')throw Object.assign(new Error('研究仍在执行，待空闲后接续模式'),{status:409});
      const value=state(agent);value.ledger.hydrate(agent);
      return {mode,profile,scope,record:structuredClone(value.record),evidence:[...value.ledger.records.values()].map(row=>structuredClone(row))};
    },
    inheritWorkflow:(agent,capture)=>{
      if(agent.status==='running')throw Object.assign(new Error('接续会话已开始运行，不能覆盖其进度'),{status:409});
      const value=state(agent);
      if(value.record.workflowHandoff?.updateId===capture.id)return;
      if(Object.keys(value.record.steps).length)throw new Error('接续会话已经有独立进度，未覆盖');
      const source=capture.state;
      value.ledger.inherit(source.evidence||[],{sessionId:capture.fromSessionId,scope:source.scope,updateId:capture.id});
      value.record=migrateWorkflowRecord(source.record,{sessionId:agent.id,scope,mode,profile,difference:capture.difference,updateId:capture.id,fromSessionId:capture.fromSessionId,fromVersionId:capture.fromVersionId,toVersionId:capture.toVersionId,at:capture.at});
      value.record.runtime=systemRuntime();value.record.cost=recordedUsage(value.ledger);persist(value);
      agent.inject({id:randomUUID(),role:'user',content:[{type:'text',text:'【METIS项目模式已接续，平台事实，不是新用户消息】\n'+JSON.stringify({projectId:capture.projectId,fromVersionId:capture.fromVersionId,toVersionId:capture.toVersionId,difference:capture.difference,currentStepId:value.record.currentStepId})+'\n原会话和交付留存；沿用实际原用户要求，不把保留的旧产物称作已满足变更后的标准。用metis_project读取最新步骤和历史，用metis_step.status确认实际进度。'}],source:{kind:'notice',summary:'METIS · 已同步模式'}});
    },
    manualEdit:(agent,{stepId,index,path,sha256,bytes},commit)=>{
      if(agent.status==='running')throw Object.assign(new Error('研究任务正在执行，请先停止或等待完成再保存文档'),{status:409});
      const value=state(agent),item=value.record.steps[stepId],artifact=item?.delivery?.artifacts?.[index];
      if(!artifact||artifact.path!==path)throw Object.assign(new Error('当前交付物记录已改变，请重新打开'),{status:409});
      if(item.pendingJobs?.length||value.record.revision?.phase==='awaiting_downstream'||value.record.revision?.decision?.dispatch==='pending')throw Object.assign(new Error('请先处理后台任务或上次修改的后续选择'),{status:409});
      const previous=structuredClone(value.record),rollback=commit();
      try{
        Object.assign(artifact,{sha256,bytes});
        item.delivery.manuallyEditedAt=new Date().toISOString();item.delivery.independentlyReviewed=false;
        item.status='needs_revision';item.review=null;item.reviewHash=null;item.evidenceHash=null;item.deferredRecheck=false;
        value.record.currentStepId=stepId;persist(value);
      }catch(error){value.record=previous;rollback();throw error;}
      return {status:item.status,manuallyEditedAt:item.delivery.manuallyEditedAt};
    },
    inspect:agent=>{if(agent.status==='running')throw Object.assign(new Error('研究任务正在执行，请先在对话中停止或等待完成，再提交返修'),{status:409});const value=state(agent);return {scope,steps:profile.steps.map(step=>({id:step.id,title:step.title,item:JSON.parse(JSON.stringify(value.record.steps[step.id]||{}))})),revision:value.record.revision||null};},
    begin:(agent,revision)=>{if(agent.status==='running')throw Object.assign(new Error('研究任务正在执行，未重置步骤'),{status:409});return beginRevision(state(agent),revision);},
    decide:(agent,id,choice)=>{
      const value=state(agent),revision=value.record.revision;
      if(!revision||revision.id!==id||revision.phase!=='awaiting_downstream'||!['keep','redo'].includes(choice))throw Object.assign(new Error('后续选择已更新，请以当前项目为准'),{status:409});
      if(agent.status==='running')throw Object.assign(new Error('请等待本步回复结束后选择'),{status:409});
      const suffix=profile.steps.slice(profile.steps.findIndex(step=>step.id===revision.stepId)+1);
      if(!suffix.length)throw new Error('这是最后一步，没有后续步骤');
      if(choice==='redo'&&suffix.some(step=>value.record.steps[step.id]?.pendingJobs?.length))throw new Error('后续步骤有未确认结束的后台任务');
      revision.decision={choice,requestId:revision.decisionRequestId,at:new Date().toISOString(),dispatch:choice==='redo'?'pending':'none'};
      // Keep previously submitted upstream bytes/records even after reopening a cold loop.
      for(const step of profile.steps){const item=value.record.steps[step.id];if(item?.restored&&item.status==='needs_recheck'&&item.delivery){item.status='submitted';item.deferredRecheck=true;}}
      if(choice==='redo'){
        for(const step of suffix)value.record.steps[step.id]={status:'needs_revision',iteration:0,nativeCalls:[],pendingJobs:[],revisionId:id};
        revision.stepIds=suffix.map(step=>step.id);value.record.currentStepId=suffix[0].id;revision.phase='active';
      }else{
        for(const step of suffix){const item=value.record.steps[step.id];if(item?.delivery)item.retainedAfterRevision={id,stepId:revision.stepId,at:revision.decision.at};}
        value.record.currentStepId=revision.stepId;revision.phase='completed';revision.completedAt=revision.decision.at;
      }
      persist(value);return revision;
    },
    dispatched:(agent,id)=>{
      const value=state(agent),revision=value.record.revision;
      if(revision?.id===id&&revision.decision?.dispatch==='pending'){revision.decision.dispatch='queued';persist(value);}
    }
  };
  // Keep control with the exact retained composition. Publishing a new Cordis
  // service would require altering old frozen presets' isolation declarations.
  revisionControllers.set(ctx.fiber,revisionControl);
  const projectTool=ctx.tools.register({
    name:'metis_project',description:'只读当前研究项目实际使用的模式、保存的最新模式及差异。用户问模式是否更新时先status；read以source=latest/current、stepId按需读取真实步骤提示词/目标/技能绑定，支持offset分页，不加载技能正文；history读取原会话与模式版本接续记录；owner用messageIndex和offset读取真实继承的原用户指令，不能虚构记忆或扩大授权。本工具不编辑配置，不伪称正在运行的旧回合已经切换。',output:{schema:{type:'string'},render:(_args,value)=>[{type:'text',text:value}]},
    parameters:{type:'object',additionalProperties:false,properties:{action:{type:'string',enum:['status','read','history','owner']},source:{type:'string',enum:['latest','current']},stepId:{type:'string'},messageIndex:{type:'integer',minimum:0},offset:{type:'integer',minimum:0},maxChars:{type:'integer',minimum:1,maximum:6000}}},isConcurrencySafe:()=>true,
    async execute(args,exec){if(!exec.agent)throw new Error('项目读取需要真实会话');return JSON.stringify(await projectWorkflowContext(projectOwner(exec.agent).session.id,args));}
  });
  researchLive=createResearchLive(ctx,{scope,getState:agent=>{
    for(const[owner,value]of states)if(owner===agent||ctx.get('agents')?.isOwnedBy?.(agent.id,owner))return value;
    return stepRevisionControlFor(ctx.get('agentPresets'),agent)===revisionControl?state(agent):null;
  }});
  async function open(exec,stepId){
    const index=profile.steps.findIndex(step=>step.id===stepId);if(index<0)throw new Error('步骤不在当前固定流程中');const value=state(exec.agent);
    const workflow=await projectWorkflowContext(value.agent.session.id);
    if(workflow.available){value.projectWorkflow=workflow;const pending=workflow.workflow.latestVersionId&&workflow.workflow.latestVersionId!==workflow.workflow.currentVersionId;
      if(pending&&!workflow.historical&&value.record.currentStepId!==stepId&&value.record.steps[value.record.currentStepId]?.status==='submitted'){
        value.record.workflowUpdatePause={toVersionId:workflow.workflow.latestVersionId,at:new Date().toISOString(),reason:'在下一步骤前接续新版模式'};persist(value);throw new Error('此项目已保存新版模式，当前步骤已交付；先由项目接续新版，再执行下一步，原交付保留。');
      }
    }
    const route=exec.agent.session.requestHeader()?.config||{},llm=ctx.get('llm');
    if(exec.agent.status==='running'&&route.provider&&route.model&&llm?.prepareCall&&(value.modelCapability?.provider!==route.provider||value.modelCapability?.model!==route.model)){
      try{const prepared=await llm.prepareCall({provider:route.provider,model:route.model},AbortSignal.any([exec.signal||new AbortController().signal,AbortSignal.timeout(10000)]));value.modelCapability={provider:route.provider,model:route.model,inputModalities:prepared.inputModalities||null};}catch(error){value.modelCapability={provider:route.provider,model:route.model,inputModalities:null,error:error.message};}value.record.modelCapability=value.modelCapability;
    }
    const previous=value.record.currentStepId&&value.record.steps[value.record.currentStepId];
    if(previous&&value.record.steps[stepId]?.status!=='submitted'&&['passed','submitted'].includes(previous.status)&&previous.payload?.artifacts?.length){controlTokens.add(exec.token);try{const changed=refreshContentState(previous,await inspectEvidence(ctx,exec,previous.payload.artifacts));persist(value);if(changed)throw new Error('上一步实际交付内容已变化，请按原规则重新核验或提交当前版本，不能沿用旧通过状态进入下一步');}finally{controlTokens.delete(exec.token);}}
    if(value.record.revision?.phase==='awaiting_downstream')throw new Error('本步已交付，等待用户选择保留或处理后续步骤');
    if(value.record.revision?.phase==='completed'&&!value.record.revision.autoAdvance&&!value.record.revision.intentCorrection&&!value.record.revision.resumedByOwner&&value.record.revision.finishedTurn!=null&&value.record.revision.finishedTurn===viewedTurns.get(exec.agent)?.turn)throw new Error('本次指定范围已全部交付，请结束这一轮');
    const revision=value.record.revision?.phase==='active'?value.record.revision:null;
    if(revision){
      if(!revision.stepIds.includes(stepId))throw new Error('当前用户只要求返修所选范围，不得重做范围外步骤；已交付后请结束本轮');
      for(const previous of profile.steps.slice(0,index).filter(step=>revision.stepIds.includes(step.id)))if(row(value,previous.id).status!=='submitted')throw new Error('请先完成本次返修中的“'+previous.title+'”，再处理后续步骤');
    }else for(const previous of profile.steps.slice(0,index))if(stepLoop(previous).enabled&&row(value,previous.id).status!=='submitted')throw new Error('前序步骤“'+previous.title+'”尚未达标交付，请先完成其循环核验');
    const existing=profile.steps.find(step=>step.id===value.record.currentStepId);
    if(existing&&existing.id!==stepId&&stepLoop(existing).enabled&&row(value,existing.id).status!=='submitted')throw new Error('“'+existing.title+'”尚未达标交付，不能跳到其他步骤');
    value.record.currentStepId=stepId;const item=row(value,stepId);if(item.status==='not_started')item.status='working';if(item.deferredRecheck&&stepLoop(profile.steps[index]).enabled){item.status='needs_recheck';item.review=null;item.evidenceHash=null;delete item.deferredRecheck;}if(revision&&item.status==='needs_revision')item.status='working';persist(value);return {loop:stepLoop(profile.steps[index]),status:item.status,runtime:systemRuntime(),capabilities:value.modelCapability||null,visualVerification:value.modelCapability?.inputModalities&&!value.modelCapability.inputModalities.includes('image')?'当前模型无图像输入，可使用真实结构指标；不得把渲染完成称为已看图，必须视觉审查时选择实际图像模型或OCR。':null,unitProtocol:requiresUnits(profile.steps[index])?{required:true,instructions:'先metis_step.unit_open(unitId,artifacts当前小节文件)，写/修/审本小节，再record_unit(unitId,text公开质量判断)。宿主实际读取文件并记录哈希、机械指标和时间；随后才进入下一小节。已有稿可逐节完成本轮校验，不补造历史。'}:null,metricPolicy:'摘要默认按正文非空白字符计数，不含标题和关键词，并同时报告汉字数；取证metrics是真实计算，不口算。',...(revision?{revision}:{})};
  }
  const guard=ctx.tools.guard(execution=>{
    if(!execution.agent)return;let value;for(const [owner,item]of states)if(owner===execution.agent||ctx.get('agents')?.isOwnedBy?.(execution.agent.id,owner)){value=item;break;}
    const focus=viewedTurns.get(execution.agent)?.last;
    const command=execution.arguments?.command||'';
    const editing=/write|edit|delete|remove|apply_patch/i.test(execution.name)||/(?:set-content|add-content|out-file|writeall|writefile|write_text|write_bytes|\.save\(|remove-item|shutil\.rmtree|\s>{1,2}\s)/i.test(command);
    const policy=ownerWorkflowPolicy(value?.agent||execution.agent);
    if(!value&&(policy.paused||focus&&editing))value=state(execution.agent);
    if(!value)return;
    if(value.projectWorkflow?.historical&&(editing||execution.name==='metis_library'&&['open','prepare','run','call'].includes(execution.arguments?.action)||execution.name==='metis_step'&&!['status','evidence'].includes(execution.arguments?.action)))return '此对话属于模式更新前的项目历史；当前项目已接续新版。历史只读，请在项目当前研究助手继续，不修改原交付。';
    if(policy.paused&&(editing||execution.name==='metis_step'&&execution.arguments?.action!=='status'||execution.name==='metis_library'&&['open','prepare','run','call'].includes(execution.arguments?.action)))return '用户已要求暂停并等待确认；本轮只能读取或说明状态，收到真实继续指令后再执行、核验或交付';
    if(editing&&value.record.revision?.phase==='awaiting_downstream')return '本步已交付。请等待用户在研究对话中选择是否处理后续步骤';
    const revision=value.record.revision;
    const activeScope=revision?.phase==='active'&&revision.stepIds.includes(value.record.currentStepId)&&
      (value.record.currentStepId===focus?.stepId||viewedTurns.get(execution.agent)?.messages.has(revision.id.slice(4)));
    const libraryExecution=execution.name==='metis_library'&&['prepare','run','call'].includes(execution.arguments?.action);
    if(libraryExecution&&revision?.phase==='awaiting_downstream')return '本步已交付，等待用户决定是否处理后续步骤';
    if((editing||libraryExecution)&&focus&&value.record.steps[focus.stepId]?.delivery&&!activeScope){
      if((focus.intent||projectMessageIntent(focus.feedback))!=='advance')return '修改已交付成果前，先用metis_step.revise_viewed关联当前消息与查看步骤、保存原交付';
      if(value.record.currentStepId===focus.stepId&&value.record.steps[focus.stepId]?.status==='submitted')return '这条消息要求继续原流程。请先open下一未交付步骤，不要在已交付的查看步骤下写入新步骤成果';
    }
    const step=profile.steps.find(step=>step.id===value.record.currentStepId);if(!step)return;
    const imageDenied=imageInputProblem(value.modelCapability,execution.agent.session.requestHeader()?.config||{},execution);if(imageDenied)return imageDenied;
    const methodDenied=entryCommandProblem(step,execution,{allowFullEnvironment:/(?:完整环境|全量依赖|全部依赖|全套依赖|install all dependencies)/i.test(realUserEvidence(execution.agent).at(-1)?.text||'')});if(methodDenied)return methodDenied;
    const unitDenied=unitWriteGuard(step,row(value,step.id),execution,execution.agent.session.header?.cwd||execution.agent.options?.cwd);if(unitDenied)return unitDenied;
    if(execution.name==='metis_library'||execution.name==='metis_step')return;
    const description=ctx.tools.schemas(execution.agent).find(tool=>tool.name===execution.name)?.description||'';
    const reason=prohibitionReason(step.prohibitions,execution,description);if(reason)return reason;
    if(stepLoop(step).enabled&&/^(?:present|deliver|publish)(?:_|$)/i.test(execution.name)&&!['passed','submitted'].includes(row(value,step.id).status))return '当前步骤未通过真实目标核验，不能先交付；请继续改进并调用metis_step.check';
  });
  const observed=ctx.on('tools/result',(execution,result)=>{
    if(!execution.agent||controlTokens.has(execution.parent)||execution.name==='metis_step'||execution.name==='metis_library'&&(execution.arguments?.action!=='open'||result.isError))return;
    let value;for(const [owner,item]of states)if(owner===execution.agent||ctx.get('agents')?.isOwnedBy?.(execution.agent.id,owner)){value=item;break;}if(!value?.record.currentStepId)return;
    const item=row(value,value.record.currentStepId);
    const activity=value.record.activity?.find(call=>call.callId===String(execution.callId));
    const fact=value.ledger.record(execution,result,value.record.currentStepId,{cwd:execution.agent.session.header?.cwd||execution.agent.options?.cwd||'',invoked:activity?.invoked!==false});
    item.nativeCalls=[...(item.nativeCalls||[]),{callId:fact.callId,rootCallId:fact.rootCallId,name:fact.name,arguments:JSON.stringify(fact.arguments).slice(0,500),value:fact.value.slice(0,800),isError:fact.isError,truncated:fact.valueCharacters>800,evidenceId:fact.id,at:fact.at}].slice(-16);
    const jobId=result.value?.jobId;if(jobId&&!item.pendingJobs.includes(jobId))item.pendingJobs.push(jobId);
    if(execution.name==='job_output'&&result.value?.job&&!['running','stopping'].includes(result.value.job.status))item.pendingJobs=item.pendingJobs.filter(id=>id!==result.value.job.id);
    // File integrity is verified at check/submit/advance boundaries. A tool
    // name, todo update or failed operation never revokes a submission.
    persist(value);
  });
  // The public DSH turn boundary accepts next-step input without starting another
  // Agent or waking a cancelled turn. This is producer context, never human consent.
  const finishRevision=ctx.on('agent/turn-stopping',({agent,signal})=>{if(signal?.aborted)return;const value=states.get(agent);if(value?.record.revision?.phase==='active'){finishBatch(value);if(value.record.revision.phase!=='active')persist(value);}});
  const continueStep=ctx.on('agent/turn-stopping',({agent,signal,turn})=>{
    if(signal?.aborted||typeof agent?.inject!=='function'||ctx.get('agents')?.get(agent.id)!==agent)return;
    const value=states.get(agent);if(!value)return;
    if(value.projectWorkflow?.historical)return;
    reconcileFlow(value);
    const policy=ownerWorkflowPolicy(agent);if(policy.paused)return;
    if(configurationTurns.get(agent)===turn&&value.projectWorkflow?.available){
      const update=value.projectWorkflow.workflow;
      if(update.latestVersionId&&update.latestVersionId!==update.currentVersionId){value.record.workflowUpdatePause={toVersionId:update.latestVersionId,at:new Date().toISOString(),afterInquiry:true,reason:'配置询问已回答，在边界接续新版模式'};persist(value);return;}
      if(!policy.autonomous)return;
    }
    if(agent.inbox?.nextStep?.length||agent.inbox?.nextTurn?.length)return;
    const revision=value.record.revision;
    const stoppedScope=revision?.phase==='completed'&&!revision.autoAdvance&&!revision.intentCorrection&&!revision.resumedByOwner;
    if(policy.autonomous&&!stoppedScope&&revision?.phase!=='awaiting_downstream'){
      const next=profile.steps.find(step=>value.record.steps[step.id]?.status!=='submitted');
      const current=value.record.steps[value.record.currentStepId];
      if(next&&!['blocked','checking'].includes(value.record.steps[next.id]?.status)&&(!current||current.status==='submitted'||revision?.autoAdvance&&revision.phase==='active')){
        const key=digest({ownerIndex:policy.ownerIndex,next:next.id,revision:revision?.id,submitted:profile.steps.filter(step=>value.record.steps[step.id]?.status==='submitted').map(step=>[step.id,value.record.steps[step.id].delivery?.at])});
        if(value.record.continuedFlow!==key){
          const text='【METIS流程接续，平台通知，不是新用户授权】\n真实用户已明确要求自主推进至交付。当前已交付步骤保持原样，请metis_library.open进入下一未交付步骤「'+next.title+'」（'+next.id+'），按原目标执行、核验并submit，随后继续。此通知不授予额外工具权限，不跳过check；缺真实资料或权限时停留并说明缺项。';
          agent.inject(Object.freeze({id:randomUUID(),role:'user',source:Object.freeze({kind:'notice',summary:'METIS · 接续 '+next.title.slice(0,60)}),content:Object.freeze([Object.freeze({type:'text',text})])}));value.record.continuedFlow=key;persist(value);return;
        }
      }
    }
    if(!value.record.currentStepId)return;
    const step=profile.steps.find(candidate=>candidate.id===value.record.currentStepId),item=value.record.steps[step?.id];
    if(!step||!stepLoop(step).enabled||!item||['not_started','submitted','blocked','checking'].includes(item.status))return;
    const key=digest({status:item.status,iteration:item.iteration,reviewHash:item.reviewHash||null});
    // No fixed round limit: each new actual review may continue. Repeating an
    // unchanged failed check cannot keep this turn alive or burn model calls.
    if(item.continuedReview===key)return;
    const instruction=item.status==='passed'?'本步已有真实达标回执。调用metis_step.submit提交已核验产物；若实际文件变化，先重新check。':item.status==='needs_recheck'?'恢复后请对已有产物调用metis_step.check并submit，无需重新执行已完成研究。':item.status==='needs_revision'?'根据真实核验反馈继续修订当前步骤的实际成果，再check；达标后submit。':'本步尚无达标交付回执，请完成当前步骤并以实际文件或文本调用metis_step.check，达标后submit。';
    const text='【METIS本步循环反馈，来自平台，不是用户新消息或授权】\n'+step.title+'\n主要目的：'+step.instruction+'\n'+instruction+'\n反馈：'+JSON.stringify(item.review?.verdict.feedback||[])+'\n禁止事项：'+(step.prohibitions||'仍遵守当前用户要求和DSH原生权限')+'\n资料、确认、工具或授权不足时如实说明具体缺项并停留本步，不重放相同失败动作，不假定达标，不进入后续步骤。';
    const message=Object.freeze({id:randomUUID(),role:'user',source:Object.freeze({kind:'notice',summary:'METIS · '+step.title.slice(0,60)+' · 继续本步达标循环'}),content:Object.freeze([Object.freeze({type:'text',text})])});
    agent.inject(message);item.continuedReview=key;persist(value);
  });
  const dispose=ctx.tools.register({
    name:'metis_step',description:'真实步骤执行与证据。status查看；evidence读取实际文件指标/原始回执，支持evidenceId与offset补读；unit_open/record_unit为逐小节写审留真实哈希与机械指标，不能补造历史或自报独立通过。check在达标循环开启时独立核验并补读，未开启时不自动发额外模型；submit提交已核验版本，交付说明不强迫重审。只有具体修改意见才revise_viewed保存历史；确认、继续不属于返修。用户已授权自主推进时执行至交付，不逐步确认；相同证据复用回执，无进展明确停止本轮空烧，真实证据有进展可自动接续。',
    parameters:{type:'object',additionalProperties:false,required:['action','stepId'],properties:{action:{type:'string',enum:['status','check','submit','revise_viewed','evidence','unit_open','record_unit']},stepId:{type:'string'},requestId:{type:'string',description:'仅revise_viewed可用，取自该条真实用户消息的步骤上下文。'},offset:{type:'integer',minimum:0,maximum:67108864,description:'evidence为真实证据字符偏移，使用回执nextOffset；revise_viewed历史正文偏移上限80000。'},artifacts:{type:'array',maxItems:MAX_ARTIFACTS,items:{type:'string',minLength:1,maxLength:1200}},text:{type:'string',maxLength:MAX_SUBMITTED_TEXT},unitId:{type:'string',minLength:1,maxLength:160},evidenceId:{type:'string',maxLength:80},part:{type:'string',maxLength:180}}},
    output:{schema:{type:'string'},render:(_args,value)=>[{type:'text',text:value}]},isConcurrencySafe:()=>false,
    presentCall:args=>({card:'generic',title:'METIS · '+({check:'核验本步目标',submit:'交付本步成果',revise_viewed:'修改正在查看的步骤'}[args?.action]||'步骤状态'),kind:['submit','revise_viewed'].includes(args?.action)?'write':'read',rawInput:JSON.stringify(args||{})}),
    async execute(args,exec){
      exec.signal?.throwIfAborted();if(!args||Object.keys(args).some(key=>!['action','stepId','requestId','offset','artifacts','text','unitId','evidenceId','part'].includes(key))||!['status','check','submit','revise_viewed','evidence','unit_open','record_unit'].includes(args.action))throw new Error('步骤控制参数无效');
      if(args.action==='revise_viewed'){
        const offset=args.offset??0;if(!Number.isSafeInteger(offset)||offset<0||offset>80000)throw new Error('历史交付正文偏移无效');
        const {revision,archived}=revisionFromMessage(exec.agent,args.stepId,args.requestId);
        const step=profile.steps.find(candidate=>candidate.id===revision.stepId),prompt=stepPromptText(step)||'';
        const previous=archived.steps.find(row=>row.id===step.id)?.delivery,body=previous?.text||'';
        const originalDelivery=previous?{at:previous.at,text:body.slice(offset,offset+3500),textLength:body.length,nextOffset:offset+3500<body.length?offset+3500:null,artifacts:previous.artifacts.map(item=>({path:item.source,name:item.name,kind:item.kind,matchesSubmitted:item.matchesSubmitted}))}:null;
        return JSON.stringify({stepId:step.id,title:step.title,status:revision.phase,purpose:step.instruction,expected:step.deliverables||'',prohibitions:step.prohibitions||'',loop:stepLoop(step),stepSkill:stepSkillName(step),instructions:prompt.length<=2400?prompt:'完整指令请读取上面的stepSkill。',boundSkills:step.skills,originalDelivery,next:revision.phase==='active'?'基于上次交付修改本步，保留用户指定的措辞。需要技能时通过metis_library.open按需读取，按原验收规则重新提交本步。':'此消息的返修已经交付。'});
      }
      if(args.requestId!==undefined||args.offset!==undefined&&args.action!=='evidence')throw new Error('当前动作无需返修消息标识或历史读取偏移');
      const focus=viewedTurns.get(exec.agent)?.last;
      const activeRevision=states.get(exec.agent)?.record.revision;
      const upstreamOfRedo=activeRevision?.phase==='active'&&activeRevision.decision?.choice==='redo'&&activeRevision.stepId===args.stepId;
      if(args.action==='status'){
        const value=state(exec.agent),actual=profile.steps.find(step=>step.id===args.stepId);if(!actual)throw new Error('步骤不属于当前固定流程');
        const progress=stepGoalProgress(value.agent.session.id,mode,profile,{includeDeliveries:true});
        const inspected=progress.steps.find(step=>step.id===args.stepId);
        return JSON.stringify(boundedSkillExecutionResult({...inspected,stepId:args.stepId,goal:actual.instruction,deliverables:actual.deliverables||'',loop:stepLoop(actual),iteration:value.record.steps[actual.id]?.iteration||0,currentStepId:progress.currentStepId,viewOnly:true}));
      }
      const step=profile.steps.find(step=>step.id===args.stepId);if(!step)throw new Error('步骤不属于当前固定流程');const value=current(exec.agent,step.id),item=row(value,step.id),loop=stepLoop(step),output=step.id===profile.steps.at(-1)?.id?profileOutput(profile):null;
      if(args.action!=='status'&&value.record.revision?.phase==='awaiting_downstream')throw new Error('本步已交付，等待用户选择是否处理后续步骤');
      function saveDelivery(){
        let finished=false;
        if(value.record.revision?.phase==='active'&&value.record.revision.downstream==='ask'){
          finishBatch(value);
          finished=value.record.revision.phase==='completed';
          if(finished&&!value.record.revision.autoAdvance)value.record.revision.finishedTurn=viewedTurns.get(exec.agent)?.turn;
        }
        persist(value);
        if(value.record.revision?.phase==='awaiting_downstream')return '本步已重新交付。界面已显示后续选择，结束本轮并等用户决定，不要执行后续步骤。';
        if(value.record.revision?.autoAdvance){const next=profile.steps.find(candidate=>value.record.steps[candidate.id]?.status!=='submitted');return next?'本步已交付。用户已授权自主推进，继续open「'+next.title+'」（'+next.id+'）并按原规则执行，无需再次确认。':'全部步骤已按真实记录交付，可汇总实际成果。';}
        return finished?'本次指定的全部步骤已交付，请结束这一轮。':null;
      }
      const reply=data=>JSON.stringify({...boundedSkillExecutionResult(data),stepId:step.id});
      if(args.action==='status')return reply({stepId:step.id,title:step.title,goal:step.instruction,deliverables:step.deliverables||'',prohibitions:step.prohibitions||'',loop,status:item.status,iteration:item.iteration,lastFeedback:item.review?.verdict.feedback||[],delivery:item.delivery||null,next:item.restored?'恢复后对已有产物check再submit，无需重新执行已完成研究；check可沿用上次产物路径。':null});
      controlTokens.add(exec.token);
      try{
        const cwd=exec.agent.session.header?.cwd||exec.agent.options?.cwd||'';
        value.ledger.hydrate(exec.agent);value.record.cost=recordedUsage(value.ledger);
        if(args.action==='evidence'){
          if(args.evidenceId){
            if(args.evidenceId==='A1')return reply({source:'captured-native-call-audit',...value.ledger.initial(step.id),units:item.units||null});
            if(args.evidenceId==='INDEX')return reply({source:'actual-native-machine-evidence',entries:value.ledger.summaries(step.id).slice(args.offset||0,(args.offset||0)+40),total:value.ledger.summaries(step.id).length,nextOffset:(args.offset||0)+40<value.ledger.summaries(step.id).length?(args.offset||0)+40:null});
            if(/^[CGS]/.test(args.evidenceId))return reply(value.ledger.read(step.id,args.evidenceId,{offset:args.offset||0,maxChars:6000}));
            if(!item.payload)throw new Error('尚无产物取证，请先check或提供实际产物路径');
            const captured=await inspectEvidence(ctx,exec,item.payload.artifacts),flat=evidenceFiles(captured.files),id=args.evidenceId;
            const indexed=[];captured.files.forEach((file,i)=>{indexed.push({id:'F'+(i+1),file});(file.entries||[]).forEach((entry,j)=>indexed.push({id:'F'+(i+1)+'_'+(j+1),file:entry}));});
            const entry=indexed.find(entry=>entry.id===id);if(!entry)throw new Error('当前产物中没有此证据ID');return reply(await readArtifactPage(ctx,exec,captured,{path:entry.file.path,part:args.part||'text',offset:args.offset||0,maxChars:6000}));
          }
          return reply({source:'actual-native-machine-evidence',...value.ledger.initial(step.id),runtime:systemRuntime(),units:item.units||null});
        }
        if(args.action==='unit_open'){const unit=openUnit(item,args,cwd);persist(value);return reply(unit);}
        if(args.action==='record_unit'){
          const opened=item.units?.opened?.[args.unitId];if(!opened)throw new Error('先unit_open当前小节');
          const captured=await inspectEvidence(ctx,exec,opened.paths),result=recordUnit(item,args,captured,cwd,value.ledger,step.id);persist(value);return reply(result);
        }
        if(args.action==='check'&&!loop.enabled&&!/(?:独立[^。\n]{0,12}(?:核验|检查|审查|复核)|额外[^。\n]{0,12}(?:核验|检查|审查|复核)|metis_step\.check)/i.test(realUserEvidence(exec.agent).at(-1)?.text||''))return reply({status:item.status,independentReviewRequired:false,next:'本步未开启自动达标循环，不额外发起模型评审。完成配置的技能终检后submit真实产物；需要临时独立核验时由真实用户明确提出。'});
        // submit commits the already-reviewed payload. A fresh delivery note is
        // not a new manuscript and must not force another paid assessment.
        const payload=actualPayload(args.action==='submit'&&loop.enabled&&item.payload?{artifacts:args.artifacts??item.payload.artifacts,text:item.payload.text}:args,item);
        const deliveryNote=args.action==='submit'&&loop.enabled&&typeof args.text==='string'&&args.text!==payload.text?args.text:null;
        if(item.pendingJobs?.length){
          const jobs=await dispatchNativeSkillTool(ctx,exec,'job_list',{});if(jobs.status!=='succeeded')throw new Error('无法确认后台任务状态，未交付');
          const list=Array.isArray(jobs.result.value)?jobs.result.value:jobs.result.value?.jobs;if(!Array.isArray(list))throw new Error('后台任务回执格式无效');
          const running=list.filter(job=>item.pendingJobs.includes(job.id)&&['running','stopping'].includes(job.status));if(running.length)return reply({status:'waiting-for-jobs',jobs:running,next:'跟进原后台任务，不重复启动、不提前交付。'});item.pendingJobs=[];
        }
        const evidence=await inspectEvidence(ctx,exec,payload.artifacts),hash=artifactFingerprint(evidence.files,payload.text),failure=fileProblem(evidence,output);
        item.payload=payload;
        if(failure){
          const problemKey=digest({hash:artifactFingerprint(evidence.files),failure}),same=item.preflightFailure?.key===problemKey;
          item.preflightFailure={key:problemKey,count:same?item.preflightFailure.count+1:1};item.status='blocked';item.lastError=failure;
          item.preflightJobs=evidenceFiles(evidence.files).flatMap(file=>file.needsEvidence?.preparation?.jobId?[{id:file.needsEvidence.preparation.jobId,owner:exec.agent.id}]:[]);
          if(item.preflightFailure.count>=2)item.noProgress={key:problemKey,ownerCount:realUserEvidence(exec.agent).length,at:new Date().toISOString(),reason:'同一取证缺项重复且未解决：'+failure+'。已停止空转；准备任务结束或用户继续后可恢复。'};
          persist(value);return reply({status:item.preflightJobs.length?'waiting-for-jobs':item.status,jobs:item.preflightJobs,error:failure,needsEvidence:true,next:'先补齐真实取证所需文件/最小依赖；若有后台任务则等原任务完成通知，不修改合格正文、不发模型盲审。'});
        }
        delete item.preflightFailure;delete item.preflightJobs;
        const mechanical=mechanicalChecks(step,evidence,output);item.mechanical=mechanical;
        if(!mechanical.passed){item.status='needs_revision';item.lastError=mechanical.failures.map(check=>check.details).join('；');noteRepeatedFailure(item,{key:digest({mechanical:mechanical.failures,files:evidenceFiles(evidence.files).filter(file=>mechanical.failures.some(check=>check.path===file.path)).map(file=>({path:file.path,sha256:file.sha256}))}),ownerCount:realUserEvidence(exec.agent).length,reason:item.lastError});persist(value);return reply({status:item.status,mechanical,error:item.lastError,next:'先修这些真实机械缺项并重新读取产物；本轮未发模型评审，不通过修改计数报告来改变实际结果。'});}
        if(args.action==='submit'){
          const knownIntegrity=!item.integrityBaseline?.legacyDirectory&&(item.verifiedArtifacts||item.delivery?.artifacts||[]).every(file=>file.sha256||file.protocol==='artifact-evidence-v2'&&file.manifestHash);
          if(item.status==='submitted'&&item.delivery&&payload.text===item.delivery.text&&sameDeliveredContent(item,evidence.files))return reply({status:'submitted',delivery:item.delivery,noNewEvidence:true,...(!knownIntegrity?{historicalOnly:true,currentIntegrityUnknown:true}:{}),next:knownIntegrity?'同一版本已实际交付，安全重试不重开返修、不更新交付时间；继续下一步或查看原回执。':'原交付历史已保留；旧目录回执缺少内容指纹，本次不伪称已重验。重新交付当前版本需先按原目标核验。'});
          if(focus&&item.delivery&&value.record.revision?.id!=='rev-'+focus.requestId)throw new Error('重新提交不同版本前，先用revise_viewed保存历史交付');
          if(loop.enabled&&(item.status!=='passed'&&item.status!=='submitted'||!item.review?.verdict?.passed))throw new Error('尚未通过目标核验，不能交付；先修真实缺项再check');
          if(loop.enabled&&hash!==item.evidenceHash){item.status='needs_revision';item.review=null;item.reviewHash=null;persist(value);return reply({status:item.status,next:'真实产物内容已变，先核验当前版本；未交付。'});}
          const unitProblem=unitEvidenceProblem(step,item,evidence,value.ledger,cwd);if(unitProblem)throw new Error(unitProblem);
          item.status='submitted';delete item.retainedAfterRevision;delete item.deferredRecheck;delete item.lastError;delete item.noProgress;delete item.lastRepeatedFailure;delete item.repeatedEvidence;
          item.delivery={at:new Date().toISOString(),independentlyReviewed:!!loop.enabled,artifacts:artifactRefs(evidence.files),text:payload.text,...(deliveryNote?{note:deliveryNote,noteIndependentlyReviewed:false}:{}),runtime:systemRuntime()};markVerified(item,evidence);
          return reply({status:'submitted',stepId:step.id,delivery:item.delivery,next:saveDelivery()||'真实交付已记录。用户已授权后续时继续open下一步，不重复核验未变化的已提交步骤。'});
        }
        const unitProblem=unitEvidenceProblem(step,item,evidence,value.ledger,cwd);
        if(unitProblem){item.status='needs_revision';item.lastError=unitProblem;persist(value);return reply({status:item.status,needsUnitEvidence:true,error:unitProblem,next:'逐节记录本轮真实校验即可，不重写合格正文，不补造历史时间戳；未发模型核验。'});}
        const userMessages=realUserEvidence(exec.agent),revision=value.record.revision,revisionRequirements=revision?.phase==='active'&&revision.stepIds.includes(step.id)?{id:revision.id,feedback:revision.feedback,currentStepTitle:step.title,scope:revision.downstream,stepTitles:profile.steps.filter(candidate=>revision.stepIds.includes(candidate.id)).map(candidate=>candidate.title)}:null;
        const workflowRequirements={systemPrompt:profile.systemPrompt||'',executionPrompt:profile.executionPrompt||'',reviewPrompt:profile.reviewPrompt||'',parameters:profile.parameters||{}};
        const cacheStep={...step,output,workflowRequirements},key=reviewKey({filesHash:hash,step:cacheStep,userMessages,revisionRequirements}),goalsKey=reviewKey({filesHash:'',step:cacheStep,userMessages,revisionRequirements}),factsHash=value.ledger.semanticFingerprint(step.id);
        const selectedRoute=exec.agent.session.requestHeader()?.config||exec.agent.options||{},sameRoute=review=>review?.provider===selectedRoute.provider&&review?.model===selectedRoute.model;
        const historical=[...value.ledger.records.values()].findLast(entry=>entry.kind==='review'&&entry.stepId===step.id&&entry.key===key&&entry.review&&(entry.review.verdict.passed||sameRoute(entry.review)&&entry.factsHash===factsHash));
        if(historical&&(!item.review||!item.review.verdict.passed&&!sameRoute(item.review))){item.review=historical.review;item.reviewHash=key;item.reviewGoalsKey=goalsKey;item.reviewFactsHash=historical.factsHash||factsHash;}
        const sameGoals=item.reviewGoalsKey===goalsKey;
        const cached=item.review&&sameGoals&&(item.reviewHash===key&&(item.review.verdict.passed||sameRoute(item.review)&&item.reviewFactsHash===factsHash)||!item.review.verdict.passed&&sameRoute(item.review)&&item.reviewFactsHash===factsHash&&stableFailedEvidence(item.review,evidence.files));
        if(cached){
          if(item.review.verdict.passed){if(item.status!=='submitted')item.status='passed';delete item.lastError;markVerified(item,evidence);}
          else{
            const repeated=item.repeatedEvidence?.key===key?(item.repeatedEvidence.count||0)+1:1;item.repeatedEvidence={key,count:repeated};
            if(repeated>=2)item.noProgress={key,ownerCount:userMessages.length,at:new Date().toISOString(),reason:'相同目标及关键证据反复请求核验，没有新增可判定内容；已停止空转，原始证据与反馈保留。先按反馈修真实缺项或补读evidence。'};
          }
          persist(value);return reply({status:item.status,review:item.review,noNewEvidence:true,noProgress:!!item.noProgress,next:item.review.verdict.passed?'未变化的真实回执已复用；已提交则继续下一步，否则submit。':'未新增相关证据，不重复发模型。读取原始证据并修正反馈指向的产物；不能仅改报告制造进展。'});
        }
        if(!item.autoResumeAllowed&&item.lastFailureKey===key&&item.lastFailureFacts===factsHash&&item.lastFailureOwnerCount===userMessages.length&&sameRoute(item.lastReviewAttempt)&&item.lastReviewAttempt&&!item.lastReviewAttempt.completed){item.status='blocked';item.noProgress={key,ownerCount:userMessages.length,at:new Date().toISOString(),reason:'上次核验因'+item.lastReviewAttempt.code+'未完成；相同证据不自动重复消耗。原回执和消耗已保留，可补证后继续或由用户明确重试。'};persist(value);return reply({status:'blocked',noNewEvidence:true,error:item.noProgress.reason,attempt:item.lastReviewAttempt});}
        if(/(?:禁止|不得|不要)[^。；\n]{0,20}(?:外传|上传原始|发送原始|第三方模型|外部模型|额外模型请求|调用模型|模型评审)/.test(step.prohibitions||''))throw new Error('本步骤限制模型评审，未发送资料；按真实授权处理。');
        // Captured public pages may be reused across revisions only when the
        // new capture has the same path and content hash (enforced by reviewer).
        const resumeId=item.lastReviewAttempt?.checkpointId||item.lastPublicEvidenceCheckpoint,resume=resumeId?value.ledger.records.get(resumeId)?.checkpoint:null;
        item.reviewGoalsKey=goalsKey;item.reviewHash=key;item.reviewFactsHash=factsHash;item.evidenceHash=hash;item.iteration++;item.status='checking';delete item.noProgress;delete item.repeatedEvidence;delete item.autoResumeAllowed;
        item.lastReviewAttempt={id:randomUUID(),startedAt:new Date().toISOString(),runtime:systemRuntime(),completed:false};persist(value);const attemptId=item.lastReviewAttempt.id,earlierReview=item.review?.verdict;item.review=null;
        try{
          item.review=await runGoalReview(ctx,exec,{purpose:step.instruction,deliverables:step.deliverables||'',criteria:loop.criteria,prohibitions:step.prohibitions||'',workflowRequirements,finalOutput:output,files:evidence.files,text:payload.text,userMessages,earlierReview,revisionRequirements},{ledger:value.ledger,stepId:step.id,resume,
            onCheckpoint:checkpoint=>{const id='P'+digest({attemptId,pages:checkpoint.pages.map(page=>({evidenceId:page.evidenceId,part:page.part,offset:page.offset,sha256:page.sha256}))});value.ledger.append({id,kind:'checkpoint',name:'public-evidence-checkpoint',stepId:step.id,at:new Date().toISOString(),checkpoint});item.lastReviewAttempt.checkpointId=id;item.lastPublicEvidenceCheckpoint=id;persist(value);},
            onUsage:request=>{const usageId=usageEvidenceId({channel:'review',sessionId:value.record.sessionId,callId:String(exec.callId),attempt:request.attempt});if(!value.ledger.records.has(usageId)){value.ledger.append({id:usageId,kind:'usage',protocol:'native-usage-v2',name:'model-usage',stepId:step.id,channel:'review',at:new Date().toISOString(),request});addUsage(value.record,'review',request);}item.lastReviewAttempt.requests=[...(item.lastReviewAttempt.requests||[]),request];persist(value);},
            onProgress:progress=>researchLive?.toolProgress?.(exec,value,'独立核验：'+progress.phase+'；已补读 '+progress.reads+' 段；已报告输出 '+progress.outputTokens+' tokens\n')});
          item.lastReviewAttempt={...item.lastReviewAttempt,completed:true,finishedAt:new Date().toISOString(),usage:item.review.usage};
        }catch(error){
          item.lastReviewAttempt={...item.lastReviewAttempt,...error.reviewAttempt,completed:false,code:error.code||'metis/review-failed'};item.lastFailureKey=key;item.lastFailureFacts=factsHash;item.lastFailureOwnerCount=userMessages.length;
          const progress=error.reviewAttempt?.newEvidenceCharacters||0;
          if(['metis/review-budget','metis/review-timeout'].includes(error.code)&&item.lastReviewAttempt.checkpointId&&(progress>=512||progress>0&&error.reviewAttempt.unreadCharacters===0)){
            item.autoResumeAllowed=true;item.status='needs_recheck';item.lastError='本次取证有真实进展，预算到达后已保存公开证据检查点，将自动接续，未判通过。';persist(value);return reply({status:'needs_recheck',automaticEvidenceContinuation:true,attempt:item.lastReviewAttempt,next:'同一核验仍有真实取证进展。直接check沿用已读检查点继续，不重写正文/过程报告，无需用户逐次确认。'});
          }
          item.noProgress={key,ownerCount:userMessages.length,at:new Date().toISOString(),reason:'独立核验未完成：'+error.message+'。已停止本轮模型空转，原证据与消耗保留；修复原因或由用户明确继续后恢复。'};throw error;
        }
        item.status=item.review.verdict.passed?'passed':item.review.verdict.needsUserInput||!loop.enabled?'blocked':'needs_revision';
        if(item.review.verdict.passed){markVerified(item,evidence);delete item.lastError;delete item.repeatedEvidence;}else item.lastError=item.review.verdict.feedback.join('；').slice(0,1800);
        value.ledger.append({id:'V'+digest({attemptId,key}),kind:'review',name:'independent-goal-review',stepId:step.id,at:new Date().toISOString(),key,factsHash,goalsKey,review:item.review});persist(value);
        return reply({status:item.status,stepId:step.id,iteration:item.iteration,review:item.review,runtime:systemRuntime(),cost:value.record.cost,next:item.status==='passed'?'目标核验通过，submit后进入下一步；建议性意见不要求重开完整核验。':item.status==='blocked'?'保留原始回执，先补实际缺项；相同内容不盲目重复核验。':'按稳定反馈修实际产物，不事后重写原始机器回执；证据变化后再核验。'});
      }catch(error){item.status='blocked';item.lastError=error.message;item.lastFailureAt=Date.now();persist(value);return reply({status:'blocked',stepId:step.id,iteration:item.iteration,error:error.message,code:error.code||null,attempt:item.lastReviewAttempt||null,...(error.nativeResult?{nativeResult:error.nativeResult}:{}),next:'原始文件和证据已保留；按具体缺项修复。相同核验失败不自动重发模型，不虚报通过。'});}finally{controlTokens.delete(exec.token);}
    }
  });
  const usageObserved=ctx.on('session/event',(session,event)=>{
    if(event.type!=='assistant/message'||!event.data?.usage)return;
    let value;for(const[owner,item]of states)if(owner.session.id===session.id||ctx.get('agents')?.isOwnedBy?.(session.id,owner)){value=item;break;}if(!value)return;
    const id=usageEvidenceId({channel:'main',sessionId:session.id,eventSeq:event.seq??event.time});if(value.ledger.records.has(id))return;
    try{value.ledger.append({id,kind:'usage',protocol:'native-usage-v2',name:'model-usage',stepId:value.record.currentStepId,channel:'main',at:new Date(event.time||Date.now()).toISOString(),nativeEventSeq:event.seq??null,actorId:session.id,usage:event.data.usage});addUsage(value.record,'main',{usage:event.data.usage});persist(value);}catch(error){value.record.costError=error.message;}
  });
  ctx.effect(()=>()=>{projectTool();usageObserved();researchLive?.dispose();dispose();guard();observed();activityStarted();activityFinished();continueStep();finishRevision();viewNotices();revisionControllers.delete(ctx.fiber);for(const value of states.values()){const key=pulseKey(value.record.sessionId,scope);if(pulseState.records.get(key)?.record===value.record)pulseState.records.delete(key);}states.clear();},'metis: goal loops and step prohibitions');
  return {open,assertCurrent:(exec,stepId)=>current(exec.agent,stepId),recordSkill:(exec,step,args,value)=>{
    if(!['load','read','resource'].includes(args.action))return;
    const stateValue=state(exec.agent),id='S'+digest({stepId:step.id,skillId:args.skillId||value.resolvedSkillId||value.id,path:args.path||null,offset:args.offset||0,value}).slice(0,20);
    stateValue.ledger.append({id,kind:'skill',name:'metis-library-read',stepId:step.id,at:new Date().toISOString(),callId:String(exec.callId),rootCallId:String(exec.rootCallId||exec.callId),arguments:{action:args.action,skillId:args.skillId||value.resolvedSkillId||value.id,path:args.path||null,offset:args.offset||0},value:JSON.stringify(value),invoked:true,isError:false});
  }};
}

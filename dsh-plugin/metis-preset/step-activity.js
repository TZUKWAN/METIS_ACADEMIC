/** Small factual activity receipts. No model reasoning or simulated progress. */
import {randomUUID} from 'node:crypto';
import {readCommandOutput} from './command-output.js';
const LIMIT = 512;
const runtimeKey=Symbol.for('metis.activity.runtime.v1');
const runtimeId=globalThis[runtimeKey]??=randomUUID();

function short(value, max = 160) {
  return typeof value === 'string' ? value.replace(/\s+/g,' ').trim().slice(0,max) : '';
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return url.origin + url.pathname;
  } catch { return short(value); }
}

function parsedResult(result) {
  if (typeof result?.value !== 'string') return result?.value || {};
  try { return JSON.parse(result.value); } catch { return {}; }
}

function describe(name, args) {
  if (name === 'metis_library') {
    const labels = {open:'进入研究步骤',list:'查找本步技能',load:'读取技能',read:'读取技能',requirements:'检查技能依赖',files:'查看技能资源',resource:'读取技能资源',prepare:'准备执行环境',run:'运行技能',call:'调用研究工具'};
    return {kind:'skill',label:labels[args.action] || '使用研究技能',target:short(args.skillName || args.skillId || args.path || '')};
  }
  if (name === 'metis_step') {
    const labels = {status:'查看步骤成果',check:'核验目标与产物',submit:'提交本步成果',revise_viewed:'开始修改本步'};
    return {kind:args.action === 'check' ? 'review' : args.action === 'submit' ? 'delivery' : 'step',label:labels[args.action] || '处理研究步骤',target:''};
  }
  if (/request_user_input|ask_user|user_question/.test(name)) return {kind:'question',label:'等待您回复',target:short(args.question || args.title)};
  if (/^(pwsh|bash|shell|exec_command|terminal)/.test(name)) return {kind:'command',label:'执行命令',target:short(args.description || args.title)};
  if (/job_output|job_list|job_kill/.test(name)) return {kind:'job',label:name==='job_kill'?'停止后台任务':'查看后台任务',target:short(args.jobId || args.job_id || '')};
  if (/search|fetch|browse|download/.test(name)) return {kind:'search',label:/search/.test(name) ? '检索资料' : /download/.test(name) ? '下载资料' : '读取网页',target:short(args.query || args.q || safeUrl(args.url || ''))};
  if (/write|edit|apply_patch/.test(name)) return {kind:'write',label:'修改文件',target:short(args.path || args.file_path || args.filePath || args.filename)};
  if (/read|view|open_file|list_dir/.test(name)) return {kind:'read',label:'读取资料',target:short(args.path || args.file_path || args.filePath || args.pattern)};
  return {kind:'tool',label:'调用工具',target:short(args.description || args.purpose)};
}

export function startStepActivity(record, execution, stepId) {
  const rows = record.activity ||= [];
  const callId = String(execution.callId);
  if (rows.some(row => row.callId === callId)) return;
  const args = execution.arguments || {};
  rows.push({
    callId,rootCallId:String(execution.rootCallId || execution.callId),stepId,
    tool:execution.name, ...describe(execution.name,args),
    status:'running',runtimeId,startedAt:new Date().toISOString()
  });
  if (rows.length > LIMIT) {
    const removable = rows.findIndex(row => row.status !== 'running');
    rows.splice(removable >= 0 ? removable : 0,rows.length - LIMIT);
  }
}

export function finishStepActivity(record, execution, result, stepId = null) {
  let row = record.activity?.find(item => item.callId === String(execution.callId));
  if (!row) {
    if (!result.isError) return;
    // A refused call has a real result but no body-start event. Preserve that fact.
    startStepActivity(record,execution,stepId);
    row=record.activity.find(item=>item.callId===String(execution.callId));
    row.startedAt=null;row.invoked=false;
  }
  const value = parsedResult(result);
  const data = value.data || value;
  row.finishedAt = new Date().toISOString();
  row.status = execution.signal?.aborted ? 'cancelled' : row.invoked===false ? 'refused' : result.isError || (typeof data.exitCode==='number'&&data.exitCode!==0) ? 'failed' :
    ['blocked','failed'].includes(data.status) ? 'failed' : data.status === 'needs_revision' ? 'needs_revision' :
    data.jobId ? 'waiting' : data.status === 'waiting-for-jobs' ? 'deferred' : 'succeeded';
  row.jobId = data.jobId || null;
  const text = (result.content || []).filter(block => block.type === 'text').map(block => block.text).join('\n');
  // Skill bodies, full prompts and receipts are already available in native chat.
  // Keep only the command/output/error excerpt useful for an activity detail.
  const streams=readCommandOutput(result);
  if (streams.length || result.isError || ['command','job','tool','search','write','read'].includes(row.kind)) {
    const output=streams.length?streams.map(stream=>stream.text).join('\n'):text || (typeof data.output==='string'?data.output:'');
    const limit=streams.length?4000:1200;
    row.resultPreview = streams.length?output.slice(-limit):output.slice(0,limit);
    row.resultTruncated = output.length > limit;
  }
  if (data.error) row.error = short(typeof data.error === 'string' ? data.error : data.error.message,240);
  if (Array.isArray(data.review?.verdict?.feedback)) row.feedback=data.review.verdict.feedback.slice(0,2).map(text=>short(text,240));
  if (typeof data.exitCode === 'number') row.exitCode = data.exitCode;
  const jobs = data.job ? [data.job] : execution.name==='job_list' && Array.isArray(data) ? data : [];
  for (const job of jobs) {
    if (!job?.id) continue;
    if (['running','stopping'].includes(job.status)) {
      if(data.job){row.status='waiting';row.jobId=job.id;}
      continue;
    }
    if (!['completed','failed','error','killed','cancelled','canceled','aborted'].includes(job.status)) continue;
    // Native shell jobs report a completed process's exit code in job.detail.
    const exit = typeof job.exitCode==='number' ? job.exitCode : /^exit code: (-?\d+)(?:;|$)/.exec(job.detail||'')?.[1];
    const exitCode = exit == null ? null : Number(exit);
    const cancelled=['killed','cancelled','canceled','aborted'].includes(job.status);
    const status=cancelled?'cancelled':['failed','error'].includes(job.status)||(exitCode!==null&&exitCode!==0)?'failed':'succeeded';
    if(data.job){row.status=status;row.jobId=job.id;if(exitCode!==null)row.exitCode=exitCode;}
    for (const activity of record.activity) if (activity.jobId === job.id && activity.status === 'waiting') {
      activity.status=status;
      activity.finishedAt = Number.isFinite(job.finishedAt) ? new Date(job.finishedAt).toISOString() : row.finishedAt;
      if(exitCode!==null)activity.exitCode=exitCode;
      if(data.job&&row.resultPreview){activity.resultPreview=row.resultPreview;activity.resultTruncated=row.resultTruncated;}
    }
  }
}

export function readStepActivity(record) {
  return (record?.activity || []).slice(-LIMIT).map(row => {
    const {runtimeId:owner,...value}=row;
    if(value.status==='running'&&owner!==runtimeId)value.status='interrupted';
    if(value.status==='waiting'&&owner!==runtimeId)value.status='unverified';
    return value;
  });
}

export function interruptStepActivity(record) {
  for (const row of record.activity || []) if (row.status === 'running') {
    row.status = 'interrupted';
    row.finishedAt = new Date().toISOString();
  }
}

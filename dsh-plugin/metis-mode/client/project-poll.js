/** Merge bounded live deltas without reloading manuscripts or losing new events. */
export function mergeLive(previous,next){
  if(!next)return previous||null;
  if(!previous)return next;
  if(previous.instanceId!==next.instanceId)return (next.startedAt||0)>=(previous.startedAt||0)?next:previous;
  if(next.revision<previous.revision)return previous;
  const entries=new Map((previous.entries||[]).map(entry=>[entry.seq,entry]));for(const entry of next.entries||[])entries.set(entry.seq,entry);
  const rows=[...entries.values()].sort((a,b)=>a.seq-b.seq).filter(entry=>entry.seq>=(next.firstSeq||0));while(rows.length>256)rows.shift();
  if(next.revision===previous.revision&&rows.length===(previous.entries||[]).length)return previous;
  return {...previous,...next,entries:rows};
}
export function mergeProjectFull(previous,next){
  if(!previous||previous.id!==next.id)return next;
  if((next.workflowUpdate?.revision||0)<(previous.workflowUpdate?.revision||0))return previous;
  if(previous.sessionId!==next.sessionId||previous.versionId!==next.versionId)return next;
  const live=mergeLive(previous.live,next.live);
  if(previous.runtime?.instanceId===next.runtime?.instanceId&&(previous.pulseRevision||0)>(next.pulseRevision||0))return live===previous.live?previous:{...previous,live};
  return {...next,live};
}
export function mergeProjectDelta(previous,response){
  if(!previous||previous.id!==response.id)return previous;
  if(response.sessionId&&response.sessionId!==previous.sessionId||response.versionId&&response.versionId!==previous.versionId)return previous;
  const live=response.live===null&&response.execution?.running===false?null:mergeLive(previous.live,response.live),pulse=response.pulse;
  const newPulse=pulse&&((previous.runtime?.instanceId!==pulse.runtime?.instanceId)||(pulse.revision>(previous.pulseRevision||0)));
  const execution=response.execution||previous.execution,changedExecution=execution?.running!==previous.execution?.running||execution?.loaded!==previous.execution?.loaded;
  if(!newPulse&&!changedExecution&&live===previous.live)return previous;
  if(!newPulse)return {...previous,execution,live};
  const state=new Map((pulse.steps||[]).map(step=>[step.id,step])),steps=previous.steps.map(step=>({...step,...state.get(step.id)}));
  const submitted=steps.filter(step=>step.status==='submitted').length;
  return {...previous,execution,live,steps,activity:pulse.activity||previous.activity,currentStepId:pulse.currentStepId,currentStepTitle:pulse.currentStepTitle,runStatus:pulse.runStatus,runtime:pulse.runtime,cost:pulse.cost,blockedReason:pulse.blockedReason,recordedAt:pulse.recordedAt,pulseRevision:pulse.revision,submitted,percent:steps.length?Math.round(submitted/steps.length*100):0};
}

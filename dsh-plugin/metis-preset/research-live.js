/** Read-only observation of native output and public assistant text. No model calls. */
import {randomUUID} from 'node:crypto';
import {readCommandOutput} from './command-output.js';
const sharedKey=Symbol.for('metis.research.live.v1');
const shared=globalThis[sharedKey]??=new Map();
const keyFor=(sessionId,scope)=>sessionId+'\0'+scope;
const clean=text=>String(text||'').replace(/\x1b\][^\x07]*(?:\x07|\x1b\\)/g,'').replace(/\x1b\[[0-?]*[ -/]*[@-~]/g,'').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g,'');
export class ResearchLiveBuffer{
  constructor(sessionId,scope){this.sessionId=sessionId;this.scope=scope;this.instanceId=randomUUID();this.startedAt=Date.now();this.entries=[];this.sequence=0;this.revision=0;this.characters=0;this.dropped=0;this.models=new Map();this.tools=new Map();this.jobs=new Map();this.outputs=new Map();}
  append(text,details={}){
    const value=clean(text).slice(-48000);if(!value)return;
    // A batched terminal receipt is still a sequence of actual lines, not one
    // clipped status label. Keep the live-only buffer bounded outside AI context.
    for(let offset=0;offset<value.length;offset+=2048){
      const part=value.slice(offset,offset+2048);
      this.entries.push({seq:++this.sequence,at:Date.now(),source:details.source||'status',text:part,callId:details.callId||null,rootCallId:details.rootCallId||details.callId||null,stepId:details.stepId||null,attemptId:details.attemptId||null,tool:details.tool||null});
      this.characters+=part.length;
    }
    while(this.entries.length>256||this.characters>64000){const removed=this.entries.shift();this.characters-=removed.text.length;this.dropped++;}
    this.revision++;
  }
  output(text,details,complete=false){
    const value=clean(text);if(!value)return;
    const key=details.callId+'\0'+details.source,prior=this.outputs.get(key)||'';let next=value;
    if(complete&&prior){
      if(prior.endsWith(value)||value.endsWith(prior))next='';
      else if(value.startsWith(prior))next=value.slice(prior.length);
      else{const at=value.lastIndexOf(prior);if(at>=0)next=value.slice(at+prior.length);}
    }
    if(next)this.append(next,details);
    this.outputs.delete(key);this.outputs.set(key,(complete?value:prior+value).slice(-48000));
    while(this.outputs.size>128)this.outputs.delete(this.outputs.keys().next().value);
  }
  assistant(frame,stepId,actorId){
    if(!frame||typeof frame.attemptId!=='string')return;
    if(frame.type==='start'){this.models.set(actorId,{kind:'model',attemptId:frame.attemptId,stepId:stepId||null,state:'responding',order:++this.revision,seen:new Set()});this.append('模型响应开始\n',{source:'status',stepId,attemptId:frame.attemptId});return;}
    const model=this.models.get(actorId);if(!model||model.attemptId!==frame.attemptId)return;
    if(frame.type==='end'){this.models.delete(actorId);this.revision++;return;}
    if(frame.type!=='chunk')return;
    const chunk=frame.chunk;if(!chunk||typeof chunk.type!=='string')return;
    if(/reasoning|thinking/i.test(chunk.type)||/reasoning|thinking/i.test(chunk.block?.type||'')){
      if(model.state!=='thinking'){model.state='thinking';model.order=++this.revision;this.append('模型分析中\n',{source:'status',stepId:model.stepId,attemptId:model.attemptId});}return;
    }
    const index=String(chunk.index??0);
    if(chunk.type==='text-delta'&&typeof chunk.text==='string'){model.seen.add(index);model.state='text';model.order=++this.revision;this.append(chunk.text,{source:'assistant',stepId:model.stepId,attemptId:model.attemptId});}
    else if(chunk.type==='block-end'&&chunk.block?.type==='text'&&!model.seen.has(index)){model.seen.add(index);model.state='text';model.order=++this.revision;this.append(chunk.block.text,{source:'assistant',stepId:model.stepId,attemptId:model.attemptId});}
  }
  snapshot(){
    const active=[...this.tools.values()].sort((a,b)=>a.order-b.order).at(-1)||[...this.models.values()].sort((a,b)=>a.order-b.order).at(-1)||[...this.jobs.values()].filter(job=>job.running).sort((a,b)=>a.order-b.order).at(-1)||null;
    const selected=active?{kind:active.kind,callId:active.callId||null,rootCallId:active.rootCallId||null,stepId:active.stepId||null,attemptId:active.attemptId||null,state:active.state||'running',tool:active.tool||null}:null;
    return{sessionId:this.sessionId,scope:this.scope,instanceId:this.instanceId,startedAt:this.startedAt,revision:this.revision,firstSeq:this.entries[0]?.seq||0,lastSeq:this.sequence,dropped:this.dropped,active:selected,entries:this.entries.map(entry=>({...entry}))};
  }
}
export function readResearchLive(sessionId,scope){return shared.get(keyFor(sessionId,scope))?.buffer.snapshot()||null;}
export function createResearchLive(ctx,{scope,getState}){
  const token=Symbol('research-live'),owned=new Map(),actors=new Map();let alive=true;
  function buffer(value){
    const key=keyFor(value.record.sessionId,scope);let entry=owned.get(key);
    if(!entry){entry={buffer:new ResearchLiveBuffer(value.record.sessionId,scope),token};owned.set(key,entry);shared.set(key,entry);}
    return entry.buffer;
  }
  function associate(actor,value,jobs,event,actorJobs){
    const job=event.job;
    if((job?.owner||event.owner)!==actor.id)return;
    const id=job?.id||event.id;
    if(!actorJobs.has(id)&&event.type!=='removed'){
      const lifecycle=actor.session.snapshotEvents().findLast(item=>item.type==='job/registered'&&item.data.jobId===id&&item.data.owner===actor.id);
      const binding=lifecycle?.data.toolCall,callId=binding?.callId;
      if(typeof callId!=='string')return;
      const row=value.record.activity?.find(item=>item.callId===callId)||value.record.activity?.find(item=>item.callId===binding.rootCallId);
      if(!row)return;
      actorJobs.set(id,{callId,rootCallId:binding.rootCallId||row.rootCallId||row.callId,row,offset:0,progress:null});
    }
    const watch=actorJobs.get(id);if(!watch)return;
    const state=buffer(value),details={callId:watch.callId,rootCallId:watch.rootCallId,stepId:watch.row.stepId,tool:watch.row.tool};
    if(['registered','output','settled'].includes(event.type)){
      const view=jobs.get(id,actor.id);if(view.owner!==actor.id)return;
      const output=jobs.readAt(id,watch.offset,actor.id);
      for(const chunk of output.chunks||[])if(['stdout','stderr','log'].includes(chunk.channel)&&chunk.text)state.output(chunk.text,{...details,source:chunk.channel});
      watch.offset=output.job?.output.total??view.output.total;
      state.jobs.set(id,{...details,kind:'tool',state:'waiting',running:['running','stopping'].includes(view.status),order:state.revision});
    }
    if(event.type==='progress'&&typeof job?.progress==='string'&&job.progress!==watch.progress){watch.progress=job.progress;state.append(job.progress+'\n',{...details,source:'status'});}
    if(event.type==='removed'){actorJobs.delete(id);state.jobs.delete(id);}
  }
  function watchActor(actor,value){
    if(actors.has(actor.id))return;
    const jobs=actor.ctx?.get?.('jobs')||ctx.get('jobs');if(!jobs?.events?.subscribe||typeof jobs.readAt!=='function')return;
    const actorJobs=new Map();
    const dispose=jobs.events.subscribe({owner:actor.id},event=>{if(!alive)return;try{associate(actor,value,jobs,event,actorJobs);}catch{/* Observation never alters a native operation or its result. */}});
    actors.set(actor.id,{dispose,actorJobs});
  }
  const assistant=ctx.on('agent/assistant-stream',({agent,frame})=>{
    if(!alive||!agent)return;try{const value=getState(agent);if(!value)return;buffer(value).assistant(frame,value.record.currentStepId,agent.id);}catch{/* A status observer cannot fail the model attempt. */}
  });
  return{
    toolProgress(execution,value,message){
      if(!alive)return;const row=value.record.activity?.find(item=>item.callId===String(execution.callId));if(!row)return;
      buffer(value).append(message,{source:'status',callId:row.callId,rootCallId:row.rootCallId,stepId:row.stepId,tool:row.tool});
    },
    toolStart(execution,value){
      if(!alive||!execution.agent)return;
      const state=buffer(value),row=value.record.activity?.find(item=>item.callId===String(execution.callId));if(!row)return;
      const details={kind:'tool',callId:row.callId,rootCallId:row.rootCallId,stepId:row.stepId,tool:row.tool,state:'running',order:++state.revision};
      state.tools.set(row.callId,details);state.append((row.label||row.tool)+(row.target?' · '+row.target:'')+'\n',{...details,source:'status'});watchActor(execution.agent,value);
    },
    toolEnd(execution,value,result){
      if(!alive||!execution.agent)return;const state=buffer(value),id=String(execution.callId),row=value.record.activity?.find(item=>item.callId===id);if(!row)return;
      const streams=readCommandOutput(result);
      for(const stream of streams){
        const callId=stream.callId||id,actual=value.record.activity?.find(item=>item.callId===callId)||row;
        if(stream.source==='log'&&['stdout','stderr'].some(source=>state.outputs.has(callId+'\0'+source)))continue;
        state.output(stream.text,{source:stream.source,callId,rootCallId:actual.rootCallId,stepId:actual.stepId,tool:actual.tool},true);
      }
      if(!streams.length&&!['command','job'].includes(row.kind)&&row.resultPreview)state.append(row.resultPreview,{source:'receipt',callId:id,rootCallId:row.rootCallId,stepId:row.stepId,tool:row.tool});
      else if(!streams.length&&row.resultPreview&&!['stdout','stderr','log'].some(source=>state.outputs.has(id+'\0'+source)))state.append(row.resultPreview,{source:'receipt',callId:id,rootCallId:row.rootCallId,stepId:row.stepId,tool:row.tool});
      state.tools.delete(id);state.revision++;
    },
    dispose(){alive=false;assistant();for(const item of actors.values())item.dispose();for(const[key,entry]of owned)if(shared.get(key)?.token===token)shared.delete(key);actors.clear();owned.clear();}
  };
}


/** Presentation motion and short public execution summaries; never reasoning data. */
export function researchArrival(elapsed,direction={x:1,y:0},reduced=false){
  if(reduced||elapsed>=1000)return {x:0,y:0,opacity:1,scale:1,pulse:0,progress:1,moving:false};
  if(elapsed<0)return {x:0,y:0,opacity:0,scale:1,pulse:0,progress:0,moving:true};
  const travel=Math.min(1,elapsed/360),after=Math.max(0,(elapsed-360)/1000);
  const kick=elapsed<360?-.20*(1-travel):.28*Math.exp(-9*after)*Math.sin(19*after);
  return {x:direction.x*kick,y:direction.y*kick,opacity:Math.max(0,Math.min(1,(elapsed-240)/210)),scale:elapsed<360?.945+.035*travel:1-.018*Math.exp(-9*after)*Math.cos(19*after),pulse:elapsed<360?Math.sin(Math.PI*travel*.5):Math.exp(-(elapsed-360)/180),progress:travel,moving:true};
}

/** Close active-card framing, independent of the total number of matrix rows. */
export function researchFocusDistance(width,height,size={w:6.6,h:2.8}){
  const tangent=Math.tan(17.5*Math.PI/180),aspect=Math.max(.25,width/Math.max(1,height));
  return Math.max(16.5,size.w/(2*tangent*aspect*.74),size.h/(2*tangent*.28));
}
/** A fast one-way tape of new, factual text. An empty queue never loops old text. */
export class ResearchTicker{
  constructor(){this.reset('');}
  reset(key){this.key=key;this.lines=[];this.sequence=0;this.seen=0;this.position=0;this.lastTime=0;this.revision=0;this.source=null;}
  append(value,source){
    if(!['stdout','stderr','log','assistant','receipt','status'].includes(source)||typeof value!=='string'||!value)return;
    let current=this.lines.at(-1);
    if(current&&current.source!==source)current.closed=true;
    for(const character of value.replace(/\r\n/g,'\n').replace(/\r/g,'\n')){
      current=this.lines.at(-1);
      if(!current||current.closed){current={id:++this.sequence,text:'',source,cells:0,closed:false};this.lines.push(current);}
      if(character==='\n'){current.closed=true;continue;}
      const cells=character.codePointAt(0)>255?2:1;
      if(current.cells+cells>42){current.closed=true;current={id:++this.sequence,text:'',source,cells:0,closed:false};this.lines.push(current);}
      current.text+=character;current.cells+=cells;
    }
    while(this.lines.length>160){this.lines.shift();this.position=Math.max(0,this.position-1);}
    this.source=source;this.revision++;
  }
  ingest(live,scope){
    if(!live||!scope)return false;const key=live.instanceId+'|'+scope.key;if(this.key!==key)this.reset(key);
    let changed=false;
    for(const entry of live.entries||[])if(entry.seq>this.seen&&scope.matches(entry)){this.append(entry.text,entry.source);changed=true;}
    this.seen=Math.max(this.seen,live.lastSeq||0);return changed;
  }
  frame(now,reduced=false){
    const target=this.lines.length,delta=this.lastTime?Math.min(.1,Math.max(0,(now-this.lastTime)/1000)):1/60;this.lastTime=now;
    const pending=Math.max(0,target-this.position),speed=32+Math.min(128,pending*12);
    this.position=reduced?target:Math.min(target,this.position+speed*delta);
    return {rows:this.lines,position:this.position,moving:!reduced&&this.position<target-.001,revision:this.revision,source:this.source,totalLines:this.sequence};
  }
}
export function researchStreamScope(summary,live){
  if(!summary)return null;
  // One step is one continuous console. A shell finishing or the next model
  // attempt starting must not discard its last stdout / environment receipt.
  const stepId=summary.stepId||live?.active?.stepId;
  if(stepId)return {key:'step:'+stepId,matches:entry=>entry.stepId===stepId};
  const active=live?.active;if(!active)return null;
  if(active.kind==='model')return {key:'model:'+active.attemptId,matches:entry=>entry.attemptId===active.attemptId};
  const root=active.rootCallId||active.callId;
  return {key:'tool:'+root,matches:entry=>entry.callId===active.callId||entry.rootCallId===root};
}
const safe=value=>typeof value==='string'?value.replace(/\s+/g,' ').trim():'';
export function researchCardDetail(node){
  if(node.call?.error)return safe(node.call.error);
  if(node.call?.feedback?.length)return safe(node.call.feedback[0]);
  const value=safe(node.detail);
  if(['read','write'].includes(node.call?.kind)&&/[\\/]/.test(value)&&!/^https?:\/\//i.test(value))return value.split(/[\\/]/).filter(Boolean).at(-1)||value;
  return value;
}
export function researchLiveSummary(graph,model){
  const node=graph?.byId.get(graph.activeId);if(!node)return null;
  const stage=model?.nodes?.find(step=>step.id===node.stepId);
  if(stage?.status==='submitted')return null;
  const active=model?.live?.active;
  if(active?.kind==='model'&&model?.phase==='processing')return {nodeId:node.id,stepId:active.stepId,title:active.state==='thinking'?'模型分析中':active.state==='text'?'公开文字输出中':'模型响应中',status:'processing',lines:[],key:'model:'+active.attemptId+'|'+active.state};
  const call=node.call;
  if(call?.invoked===false||['failed','refused','cancelled','interrupted','unverified'].includes(call?.status))return null;
  if(!call&&model?.phase!=='processing')return null;
  const running=call?.status==='running',waiting=call?.status==='waiting';
  if(call&&!running&&!waiting&&model?.phase!=='processing')return null;
  const lines=[];
  if(call?.tool)lines.push(call.tool);
  if(call?.target)lines.push(safe(call.target).slice(0,240));
  if(call?.resultPreview)lines.push(call.resultPreview.slice(-4000));
  if(!running&&!waiting&&call?.feedback?.length)lines.push(safe(call.feedback[0]).slice(0,240));
  if(!lines.length&&stage?.title)lines.push(stage.title);
  return {nodeId:node.id,stepId:node.stepId,title:waiting?'等待后台回执':running?(call.label||'执行中'):'研究助手执行中',status:waiting?'waiting':running?'running':'processing',lines,key:[node.id,call?.status||model?.phase,...lines].join('|')};
}

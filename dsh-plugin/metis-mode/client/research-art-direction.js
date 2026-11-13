/** One offline art direction, driven by real project state and actual files. */
export const RESEARCH_ART=Object.freeze({version:'ion-instrument-v2',layout:'research-space-v4',intro:1350,handoff:1450,focus:950,background:0x070c14,copper:0xe7ad78,ice:0xa3c9d6,complete:0xa3d4c1});
/** Optical motion is presentation; only active=true denotes actual execution. */
export function researchConnectionMotion({time=0,index=0,length=1,age=Infinity,signal=null,signalAge=Infinity,active=false,waiting=false,complete=false,highlight=false,reduced=false}={}){
  const reveal=reduced?1:Math.max(0,Math.min(1,age/360));
  if(reduced)return{mode:'static',progress:.5,reveal:1,gain:.2,moving:false,execution:active,repeats:1};
  let mode=active?'running':waiting?'waiting':highlight?'highlight':complete?'settled':'ambient',speed=active?7.2:highlight?4.2:complete?2.2:1.8,gain=active?.96:waiting?.28:highlight?.6:complete?.28:.22;
  let progress=((time*speed/Math.max(.01,length)+index*.381966)%1+1)%1;
  if(reveal<1){mode='arrival';progress=reveal;gain=.72;}
  else if(signal==='complete'&&signalAge>=0&&signalAge<720){mode='receipt';progress=1-signalAge/720;gain=.82;}
  else if(signal==='engage'&&signalAge>=0&&signalAge<500){mode='engage';progress=signalAge/500;gain=.88;}
  else if(waiting){progress=.5+Math.sin(time*1.3)*.03;gain=.24+Math.sin(time*2.1)*.05;}
  return{mode,progress,reveal,gain,moving:true,execution:active,repeats:mode==='waiting'?1:Math.max(1,Math.min(4,Math.ceil(length/12)))};
}
export function researchFollowKey(graph,id){
  const node=graph?.byId.get(id)||graph?.byId.get('step:'+id);if(!node)return '';
  const owner=node.stepId||'__project__',view=graph.presentation,matched=view?.expanded&&(view.stageId||'__project__')===owner,children=matched&&graph.nodes.some(row=>row.origin==='activity'&&(row.stepId||'__project__')===owner);
  return owner+'|'+(children?'family':matched?'parent':'anchor');
}
export function finalResearchResult(model,nodes){
  if(model?.phase!=='completed'||!model.nodes?.length||!model.nodes.every(step=>step.status==='submitted'))return null;
  const final=model.nodes.at(-1),files=nodes.filter(node=>node.kind==='artifact'&&node.stepId===final.id&&node.availability==='file');
  const preferred=/\.(docx|pdf|pptx|xlsx)$/i;
  return files.find(node=>preferred.test(node.title))||files[0]||nodes.find(node=>node.kind==='delivery'&&node.stepId===final.id)||null;
}
export function researchArtState(model,graph){
  const busy=!!graph?.activeId&&['running','processing'].includes(model?.phase);
  if(graph?.presentation?.expanded)return busy?'execution':'inspection';
  return model?.phase==='completed'?'complete':'overview';
}
export function researchEventPose(elapsed,signal,reduced=false){
  if(reduced||!signal||elapsed<0||elapsed>=1150)return {lift:0,scale:1,light:0};
  const t=elapsed/1000,envelope=Math.exp(-5.8*t),wave=Math.sin(t*12.4);
  return {lift:wave*envelope*(signal==='complete'?.32:.18),scale:1+wave*envelope*.018,light:Math.max(0,1-elapsed/1150)};
}
/** Fit actual XYZ corners in screen space; a large bounding sphere wastes space. */
export function researchCameraFrame(bounds,aspect,{mode='overview',height=1000}={}){
  const normalize=v=>{const n=Math.hypot(...v)||1;return v.map(x=>x/n);},dot=(a,b)=>a.reduce((sum,x,i)=>sum+x*b[i],0),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const direction=normalize(mode==='complete'?[-.20,.19,1]:mode==='execution'||mode==='inspection'?[-.10,.105,1]:[-.20,.17,1]),right=normalize(cross([0,1,0],direction)),up=cross(direction,right);
  const target=[(bounds.minX+bounds.maxX)/2,(bounds.minY+bounds.maxY)/2,(bounds.minZ+bounds.maxZ)/2],tan=Math.tan(17.5*Math.PI/180),widthUse=mode==='execution'||mode==='inspection'?.76:.86,heightUse=Math.max(.48,Math.min(.80,(height-210)/height));let distance=16.5;
  for(const x of [bounds.minX,bounds.maxX])for(const y of [bounds.minY,bounds.maxY])for(const z of [bounds.minZ,bounds.maxZ]){const p=[x-target[0],y-target[1],z-target[2]],depth=dot(p,direction);distance=Math.max(distance,depth+Math.abs(dot(p,right))/(tan*Math.max(.25,aspect)*widthUse),depth+Math.abs(dot(p,up))/(tan*heightUse));}
  distance+=1.2;return {target,position:target.map((v,i)=>v+direction[i]*distance),distance,direction,right,up,widthUse,heightUse};
}

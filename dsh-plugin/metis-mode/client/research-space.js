/** Curved instrument spine; each disclosed family grows from its actual parent. */
import {RESEARCH_ART} from './research-art-direction.js';
export const RESEARCH_SPACE=Object.freeze({version:RESEARCH_ART.layout,stationGapX:11.2,stationGapZ:6.2,deckWidth:8.8,deckDepth:3.4,groundY:-2.2,visibleCalls:6,callColumns:3});
export function spatialNodeSize(node){
  if(node?.hero)return {w:11.6,h:6.4,depth:.70};
  if(node?.kind==='engine')return {w:4.3,h:2.5,depth:.55};
  if(node?.kind==='step')return {w:7.8,h:4.3,depth:.48};
  if(['artifact','delivery'].includes(node?.kind))return {w:3.8,h:2.35,depth:.38};
  return {w:4.9,h:2.85,depth:.42};
}
export function researchChildPosition(parent,index,count=6){const row=Math.floor(index/3),lane=index%3,offset=lane-(Math.min(3,count-row*3)-1)/2;return{x:parent.x+offset*5.65,y:parent.y-6.2-row*3.3,z:parent.z+7+(parent.layer==='control'||offset===0?0:.6)+row*1.2,yaw:-offset*.06};}
export function layoutResearchSpace(nodes){
  const s=RESEARCH_SPACE,steps=nodes.filter(node=>node.kind==='step'),columns=Math.min(Math.max(1,steps.length),Math.max(1,Math.ceil(Math.sqrt(steps.length*1.4)))),rows=Math.max(1,Math.ceil(steps.length/columns));
  const positions=new Map(),stations=[],stepGroups=new Map(steps.map(node=>[node.stepId,{stage:node,calls:[],files:[]}]));
  const unassigned=[];
  for(const node of nodes){
    if(['engine','step'].includes(node.kind))continue;
    const station=stepGroups.get(node.stepId);
    if(!station){unassigned.push(node);continue;}
    (['artifact','delivery'].includes(node.kind)?station.files:station.calls).push(node);
  }
  const set=(node,value)=>positions.set(node.id,{...value,slot:node.slot??nodes.indexOf(node)});
  steps.forEach((node,index)=>{
    const row=Math.floor(index/columns),column=row%2?columns-1-index%columns:index%columns,t=columns>1?column/(columns-1):.5,arc=Math.sin(t*Math.PI),x=(column-(columns-1)/2)*s.stationGapX,z=(row-(rows-1)/2)*s.stationGapZ+arc*2.1;
    const group=stepGroups.get(node.stepId),stageY=8+(rows-1-row)*7.8+arc*.7;
    const station={id:node.stepId,index,title:node.title,x,z,row,column,width:s.deckWidth,depth:s.deckDepth,levels:1,stageY,callCount:node.callCount??group.calls.length,fileCount:node.artifactCount??group.files.length};
    stations.push(station);set(node,{x,y:stageY,z,row,column,level:0,stationId:node.stepId,layer:'stage',yaw:(.5-t)*.14});
    group.calls.forEach((call,i)=>{
      set(call,{...researchChildPosition({x,y:stageY,z,layer:'stage'},i,group.calls.length),row,column,level:0,stationId:node.stepId,layer:'activity'});
    });
    group.files.forEach((file,i)=>{
      const shelf=Math.floor(i/3),lane=i%3;
      set(file,{x:x+(lane-1)*4.6,y:stageY+3.3+shelf*3.0,z:z-1.5,row,column,level:0,stationId:node.stepId,layer:'delivery',yaw:0});
    });
  });
  const first=stations[0]||{x:0,z:0,stageY:8},hub={x:first.x-7.7,y:first.stageY+2,z:first.z-2.5};
  for(const node of nodes.filter(node=>node.kind==='engine'))set(node,{...hub,row:rows,column:-1,level:0,stationId:null,layer:'control',yaw:.05});
  unassigned.forEach((node,index)=>set(node,{...researchChildPosition({...hub,layer:'control'},index,unassigned.length),row:rows,column:-1,level:0,stationId:null,layer:'activity'}));
  for(const node of nodes.filter(node=>node.hero))set(node,{x:Math.max(...stations.map(station=>station.x),0)-1.5,y:Math.max(...stations.map(station=>station.stageY),8)+9.6,z:Math.max(...stations.map(station=>station.z),0)+10,row:-1,column:-1,level:0,stationId:node.stepId,layer:'result',yaw:-.07});
  const bounds={minX:Infinity,maxX:-Infinity,minY:Infinity,maxY:-Infinity,minZ:Infinity,maxZ:-Infinity};
  for(const node of nodes){const point=positions.get(node.id),size=spatialNodeSize(node);if(!point)throw new Error('Spatial node has no actual owner position: '+node.id);bounds.minX=Math.min(bounds.minX,point.x-size.w/2-1);bounds.maxX=Math.max(bounds.maxX,point.x+size.w/2+1);bounds.minY=Math.min(bounds.minY,point.y-size.h/2-1);bounds.maxY=Math.max(bounds.maxY,point.y+size.h/2+1);bounds.minZ=Math.min(bounds.minZ,point.z-1);bounds.maxZ=Math.max(bounds.maxZ,point.z+1);}
  for(const station of stations){bounds.minX=Math.min(bounds.minX,station.x-s.deckWidth/2-1);bounds.maxX=Math.max(bounds.maxX,station.x+s.deckWidth/2+1);bounds.minZ=Math.min(bounds.minZ,station.z-s.deckDepth/2-1);bounds.maxZ=Math.max(bounds.maxZ,station.z+s.deckDepth/2+1);}
  if(!nodes.length)Object.assign(bounds,{minX:-10,maxX:10,minY:-3,maxY:10,minZ:-10,maxZ:10});
  return {positions,stations,columns,rows,bounds,mapBounds:{minX:bounds.minX,maxX:bounds.maxX,minY:bounds.minZ,maxY:bounds.maxZ},kind:'spatial',version:s.version};
}
export function spatialCircuitEdges(nodes){
  const edges=[],stages=nodes.filter(node=>node.kind==='step'),add=(source,target,kind)=>{if(source&&target)edges.push({id:'space:'+source.id+'>'+target.id,source:source.id,target:target.id,kind,active:target.active});};
  let previous=nodes.find(node=>node.kind==='engine');
  for(const stage of stages){
    add(previous,stage,'sequence');previous=stage;
    for(const call of nodes.filter(node=>node.stepId===stage.stepId&&['call','review'].includes(node.kind)))add(stage,call,'child-action');
    let prior=stage;for(const file of nodes.filter(node=>node.stepId===stage.stepId&&['artifact','delivery'].includes(node.kind))){add(prior,file,'delivery');prior=file;}
  }
  previous=nodes.find(node=>node.kind==='engine');for(const node of nodes.filter(node=>!node.stepId&&!['engine','step'].includes(node.kind)))add(previous,node,'child-action');
  return edges;
}
export function spatialRoute(a,b,kind='activity-order'){
  if(kind==='child-action')return [{x:a.x,y:a.y-1.7,z:a.z},{x:a.x,y:a.y-2.7,z:b.z+1.6},{x:a.x,y:b.y+2.0,z:b.z+1.6},{x:b.x,y:b.y+1.3,z:b.z}];
  if(kind==='sequence'){
    const same=Math.abs(a.y-b.y)<3,side=b.x>=a.x?1:-1,aw=a.layer==='control'?2.4:4.1;
    return same?[{x:a.x+side*aw,y:a.y-.2,z:a.z},{x:a.x+side*(aw+1),y:a.y-.35,z:a.z-.6},{x:b.x-side*5.1,y:b.y-.35,z:b.z-.6},{x:b.x-side*4.1,y:b.y-.2,z:b.z}]:[{x:a.x+4.1,y:a.y-.3,z:a.z},{x:a.x+6.5,y:a.y-1.4,z:a.z+1.6},{x:b.x+6.5,y:b.y+1.4,z:b.z-1.6},{x:b.x+4.1,y:b.y+.3,z:b.z}];
  }
  if(kind==='delivery'){
    const dx=b.x-a.x,dy=b.y-a.y,unit=Math.hypot(dx,dy)||1,ux=dx/unit,uy=dy/unit,source=Math.min(3.95/Math.max(.001,Math.abs(ux)),2.22/Math.max(.001,Math.abs(uy))),target=Math.min((b.layer==='result'?5.9:1.95)/Math.max(.001,Math.abs(ux)),(b.layer==='result'?3.28:1.25)/Math.max(.001,Math.abs(uy)));
    const start={x:a.x+ux*source,y:a.y+uy*source,z:a.z},end={x:b.x-ux*target,y:b.y-uy*target,z:b.z};
    return[start,{x:start.x+(end.x-start.x)*.3,y:start.y+(end.y-start.y)*.24,z:Math.min(a.z,b.z)-1.4},{x:end.x-(end.x-start.x)*.24,y:end.y-(end.y-start.y)*.2,z:end.z-2.2},end];
  }
  const direction=b.x>=a.x?1:-1;
  return [{x:a.x+direction*1.8,y:a.y-.65,z:a.z+.08},{x:a.x+direction*2.8,y:a.y-.9,z:(a.z+b.z)/2+1.3},{x:b.x-direction*2.8,y:b.y-.9,z:(a.z+b.z)/2+1.3},{x:b.x-direction*1.8,y:b.y-.65,z:b.z+.08}];
}

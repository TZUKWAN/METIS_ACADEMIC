/** Small deterministic motion contracts. They describe presentation, never work. */
export const ION_MOTION={press:145,hover:240,reveal:620,camera:880,idleFrame:50,activeFrame:25};
export function ionCameraEase(value){const t=Math.max(0,Math.min(1,value));return t*t*t*(t*(t*6-15)+10);}
export function ionActivity(model){
  if(['running','processing'].includes(model?.phase)||model?.activeCalls?.length)return 1;
  if(['waiting','attention'].includes(model?.phase))return .35;
  return .08;
}
export function ionPointer(clientX,clientY,rect){
  return {x:Math.max(-1,Math.min(1,(clientX-rect.left)/Math.max(1,rect.width)*2-1)),y:Math.max(-1,Math.min(1,(clientY-rect.top)/Math.max(1,rect.height)*2-1))};
}
export function ionSurfacePose(x,y,reduced=false){
  if(reduced)return {x:0,y:0,rx:0,ry:0,lift:0};
  return {x:x*1.4,y:y*.7,rx:-y*2.1,ry:x*2.8,lift:3};
}
export function ionStatusSignal(before,after){
  if(!before||before===after)return null;
  if(['submitted','succeeded','passed','completed'].includes(after))return 'complete';
  if(['failed','blocked','refused','needs_revision'].includes(after))return 'attention';
  if(['running','working','checking','processing'].includes(after))return 'engage';
  return 'change';
}
export function ionIdlePose(time,index,reduced=false){
  if(reduced)return {x:0,y:0,z:0,rx:0,ry:0};
  const phase=index*2.3999632297;
  return {x:Math.sin(time*.54+phase)*.038,y:Math.sin(time*.96+phase)*.115,z:.04+Math.cos(time*.72+phase)*.025,rx:Math.sin(time*.52+phase)*.004,ry:Math.cos(time*.67+phase)*.009};
}

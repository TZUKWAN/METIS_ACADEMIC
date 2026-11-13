/** One delegated interaction layer; no changes to native click/submit behavior. */
import {ionPointer,ionSurfacePose} from './ion-art-direction.js';
const interactive='.mm-button,.ic-action,.mc-iconButton,.mc-mini,.mr-iconButton,.mc-modeTrigger,.mc-modeOption,.in-stageRoot,.mdoc-icon,.in-entity,.ion-chip,.in-port,.ion-port,.mc-libraryEntry,.mm-workspaceTabs [role=tab]';
export function installIonInteractions(root){
  if(!root)return ()=>{};
  const motion=matchMedia('(prefers-reduced-motion: reduce)'),animations=new Set();let hover=null,rect=null,frame=0,pending=null,pressed=null,disposed=false;
  root.dataset.ionCraft='v2';
  const target=event=>{const element=event.target?.closest?.(interactive);return element&&root.contains(element)&&!element.disabled?element:null;};
  function paint(){
    frame=0;if(!hover||!pending)return;
    rect=hover.getBoundingClientRect();const {x,y}=ionPointer(pending.clientX,pending.clientY,rect),pose=ionSurfacePose(x,y,motion.matches);
    hover.style.setProperty('--ion-pointer-x',((x+1)*50).toFixed(1)+'%');hover.style.setProperty('--ion-pointer-y',((y+1)*50).toFixed(1)+'%');
    hover.style.setProperty('--ion-tilt-x',pose.rx.toFixed(2)+'deg');hover.style.setProperty('--ion-tilt-y',pose.ry.toFixed(2)+'deg');
  }
  function enter(event){const next=target(event);if(next===hover)return;clearHover();if(!next)return;hover=next;rect=hover.getBoundingClientRect();hover.dataset.ionHover='true';}
  function move(event){if(!hover)return;pending={clientX:event.clientX,clientY:event.clientY};if(!frame)frame=requestAnimationFrame(paint);}
  function clearHover(){if(hover){delete hover.dataset.ionHover;hover.style.removeProperty('--ion-tilt-x');hover.style.removeProperty('--ion-tilt-y');}hover=null;rect=null;pending=null;}
  function leave(event){if(hover&&(!event.relatedTarget?.nodeType||!hover.contains(event.relatedTarget)))clearHover();}
  function release(){if(pressed)delete pressed.dataset.ionPressed;pressed=null;}
  function down(event){
    if(event.button!==0)return;const element=target(event);if(!element)return;
    release();pressed=element;element.dataset.ionPressed='true';
    if(motion.matches||typeof element.animate!=='function')return;
    const box=element.getBoundingClientRect(),ripple=document.createElement('span');ripple.className='ion-pressWave';ripple.setAttribute('aria-hidden','true');
    const localWidth=element.clientWidth||box.width,localHeight=element.clientHeight||box.height,size=Math.max(localWidth,localHeight)*1.7,x=(event.clientX-box.left)*localWidth/Math.max(1,box.width),y=(event.clientY-box.top)*localHeight/Math.max(1,box.height);ripple.style.cssText='width:'+size+'px;height:'+size+'px;left:'+x+'px;top:'+y+'px;';
    element.appendChild(ripple);
    const animation=ripple.animate([{opacity:.48,transform:'translate(-50%,-50%) scale(.08)'},{opacity:0,transform:'translate(-50%,-50%) scale(1)'}],{duration:520,easing:'cubic-bezier(.16,1,.3,1)'});
    const item={animation,ripple};animations.add(item);animation.finished.catch(()=>{}).finally(()=>{ripple.remove();animations.delete(item);});
    if(animations.size>8){const first=animations.values().next().value;first.animation.cancel();first.ripple.remove();animations.delete(first);}
  }
  function preferences(){release();clearHover();if(motion.matches)for(const item of animations){item.animation.cancel();item.ripple.remove();}animations.clear();root.dataset.reducedMotion=String(motion.matches);}
  preferences();
  root.addEventListener('pointerover',enter,{passive:true});root.addEventListener('pointermove',move,{passive:true});root.addEventListener('pointerout',leave,{passive:true});root.addEventListener('pointerdown',down,{passive:true,capture:true});
  window.addEventListener('pointerup',release,{passive:true});window.addEventListener('pointercancel',release,{passive:true});window.addEventListener('blur',release);motion.addEventListener('change',preferences);
  return()=>{if(disposed)return;disposed=true;cancelAnimationFrame(frame);clearHover();release();for(const item of animations){item.animation.cancel();item.ripple.remove();}animations.clear();root.removeEventListener('pointerover',enter);root.removeEventListener('pointermove',move);root.removeEventListener('pointerout',leave);root.removeEventListener('pointerdown',down,true);window.removeEventListener('pointerup',release);window.removeEventListener('pointercancel',release);window.removeEventListener('blur',release);motion.removeEventListener('change',preferences);delete root.dataset.ionCraft;delete root.dataset.reducedMotion;};
}

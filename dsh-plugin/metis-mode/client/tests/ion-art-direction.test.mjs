import test from 'node:test';
import assert from 'node:assert/strict';
import {ionCameraEase,ionActivity,ionPointer,ionSurfacePose,ionStatusSignal,ionIdlePose} from '../ion-art-direction.js';
import {researchArrival} from '../research-motion.js';
test('camera easing has exact endpoints and does not overshoot its target',()=>{
 assert.equal(ionCameraEase(-1),0);assert.equal(ionCameraEase(2),1);let before=0;for(let i=0;i<=100;i++){const current=ionCameraEase(i/100);assert.ok(current>=before&&current<=1);before=current;}assert.ok(ionCameraEase(.05)<.01);assert.ok(ionCameraEase(.95)>.99);
});
test('surface motion is bounded and reduced motion has no displacement',()=>{
 const point=ionPointer(1500,-100,{left:0,top:0,width:1000,height:500});assert.deepEqual(point,{x:1,y:-1});assert.ok(ionSurfacePose(point.x,point.y).ry<=3);assert.deepEqual(ionSurfacePose(1,1,true),{x:0,y:0,rx:0,ry:0,lift:0});
});
test('energy and state accents are based on actual supplied state, never fake progress',()=>{
 assert.equal(ionActivity({phase:'running'}),1);assert.ok(ionActivity({phase:'ready'})<.1);assert.equal(ionStatusSignal('running','succeeded'),'complete');assert.equal(ionStatusSignal('running','failed'),'attention');assert.equal(ionStatusSignal('succeeded','succeeded'),null);assert.equal(ionStatusSignal(null,'running'),null);
});
test('card arrival settles, keeps a bounded impact, and immediately settles for reduced motion',()=>{
 assert.equal(researchArrival(-50).opacity,0);const end=researchArrival(1000);assert.equal(end.moving,false);assert.equal(end.scale,1);assert.equal(end.x,0);
 for(let time=0;time<1000;time+=10){const frame=researchArrival(time,{x:-1,y:1});assert.ok(frame.opacity>=0&&frame.opacity<=1);assert.ok(Math.abs(frame.x)<.4&&Math.abs(frame.y)<.4);assert.ok(frame.scale>.94&&frame.scale<1.03);}
 assert.equal(researchArrival(30,{x:1,y:1},true).moving,false);
});
test('idle cards move continuously with different phases, remain readable, and obey reduced motion',()=>{
 const a=ionIdlePose(1,4),b=ionIdlePose(2,4),c=ionIdlePose(1,5);assert.notDeepEqual(a,b);assert.notDeepEqual(a,c);
 for(let time=0;time<20;time+=.2){const pose=ionIdlePose(time,8);assert.ok(Math.abs(pose.y)<=.115&&Math.abs(pose.x)<=.038);assert.ok(Math.abs(pose.rx)<.01&&Math.abs(pose.ry)<.01);}
 assert.deepEqual(ionIdlePose(10,8,true),{x:0,y:0,z:0,rx:0,ry:0});
});

/** Controlled animation contracts, complemented by actual wire-pixel readback. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {researchConnectionMotion,researchFollowKey} from '../research-art-direction.js';
import {spatialRoute,researchChildPosition} from '../research-space.js';
import {researchArrival} from '../research-motion.js';
test('idle and completed optical scans remain moving without claiming task execution',()=>{
 for(const complete of [false,true]){const a=researchConnectionMotion({time:1,length:15,complete}),b=researchConnectionMotion({time:2,length:15,complete});assert.equal(a.moving,true);assert.equal(a.execution,false);assert.equal(a.mode,complete?'settled':'ambient');assert.notEqual(a.progress,b.progress);assert.ok(a.gain<.4);}
});
test('running flow advances at constant physical distance on differently sized curves',()=>{
 const short=researchConnectionMotion({time:.1,length:10,active:true}),long=researchConnectionMotion({time:.1,length:20,active:true});assert.ok(Math.abs(short.progress*10-long.progress*20)<1e-8);assert.equal(short.execution,true);assert.equal(short.mode,'running');
});
test('arrival, acknowledgement and waiting are distinct finite movements',()=>{
 assert.equal(researchConnectionMotion({age:180}).reveal,.5);assert.equal(researchConnectionMotion({age:180}).mode,'arrival');const a=researchConnectionMotion({signal:'complete',signalAge:100}),b=researchConnectionMotion({signal:'complete',signalAge:600});assert.ok(b.progress<a.progress);assert.equal(b.mode,'receipt');assert.equal(researchConnectionMotion({signal:'complete',signalAge:800}).mode,'ambient');assert.equal(researchConnectionMotion({waiting:true}).mode,'waiting');assert.ok(Math.abs(researchConnectionMotion({waiting:true,time:2}).progress-.5)<.04);
});
test('reduced motion keeps a fully visible static path and no moving light',()=>{
 assert.deepEqual(researchConnectionMotion({time:1,age:1,reduced:true}),researchConnectionMotion({time:100,age:500,reduced:true}));assert.equal(researchConnectionMotion({reduced:true}).moving,false);assert.equal(researchConnectionMotion({reduced:true}).reveal,1);
});
test('delivery route goes directly toward the actual result rather than above it',()=>{
 const a={x:-16.8,y:8,z:3.1,layer:'stage'},b={x:15.3,y:26,z:15,layer:'result'},route=spatialRoute(a,b,'delivery');assert.ok(route.every(p=>p.y<=b.y&&p.y>=a.y));for(let i=1;i<route.length;i++){assert.ok(route[i].y>route[i-1].y);assert.ok(route[i].x>route[i-1].x);}assert.equal(route[0].z,a.z);assert.equal(route.at(-1).z,b.z);
});
test('connection reaches a new node before its panel finishes appearing; child slots are deterministic',()=>{
 assert.equal(researchArrival(180).opacity,0);assert.ok(researchArrival(360).opacity>0&&researchArrival(360).opacity<1);assert.equal(researchArrival(500).opacity,1);assert.equal(researchArrival(1100).moving,false);const parent={x:10,y:12,z:2,layer:'stage'};assert.deepEqual(researchChildPosition(parent,0),researchChildPosition(parent,0));assert.equal(researchChildPosition(parent,5).y,parent.y-7.8);
});
test('consecutive calls in one disclosed family share a camera key; changing family does not',()=>{
 const a={id:'call:a',origin:'activity',stepId:'s0'},b={id:'call:b',origin:'activity',stepId:'s0'},other={id:'call:c',origin:'activity',stepId:'s1'},graph={byId:new Map([a,b,other].map(row=>[row.id,row])),nodes:[a],presentation:{expanded:true,stageId:'s0'}};
 assert.equal(researchFollowKey(graph,a.id),researchFollowKey(graph,b.id));graph.nodes.push(b);assert.equal(researchFollowKey(graph,a.id),researchFollowKey(graph,b.id));assert.notEqual(researchFollowKey(graph,a.id),researchFollowKey(graph,other.id));assert.notEqual(researchFollowKey({...graph,presentation:{expanded:false}},a.id),researchFollowKey(graph,a.id));
});

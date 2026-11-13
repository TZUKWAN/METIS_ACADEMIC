/** Controlled geometry/state fixtures; actual three-view execution has separate evidence. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {finalResearchResult,researchArtState,researchEventPose,researchCameraFrame} from '../research-art-direction.js';
import {buildResearchNetwork} from '../research-network.js';
test('a completion result requires genuine submitted stages and an available recorded final file',()=>{
 const model={phase:'completed',nodes:[{id:'a',status:'submitted'},{id:'b',status:'submitted'}]},files=[{id:'old',kind:'artifact',stepId:'a',title:'old.docx',availability:'file'},{id:'missing',kind:'artifact',stepId:'b',title:'missing.docx',availability:'missing'},{id:'md',kind:'artifact',stepId:'b',title:'actual.md',availability:'file'},{id:'doc',kind:'artifact',stepId:'b',title:'actual.docx',availability:'file'}];
 assert.equal(finalResearchResult(model,files).id,'doc');assert.equal(finalResearchResult({...model,phase:'processing'},files),null);assert.equal(finalResearchResult({...model,nodes:[model.nodes[0],{id:'b',status:'working'}]},files),null);assert.equal(finalResearchResult(model,files.slice(0,2)),null);
});
test('overview, live execution, manual inspection and completion keep distinct actual meanings',()=>{
 assert.equal(researchArtState({phase:'ready'},{presentation:{expanded:false}}),'overview');assert.equal(researchArtState({phase:'running'},{activeId:'call:a',presentation:{expanded:true}}),'execution');assert.equal(researchArtState({phase:'completed'},{presentation:{expanded:false}}),'complete');assert.equal(researchArtState({phase:'completed'},{presentation:{expanded:true}}),'inspection');
});
test('screen-space framing contains every XYZ corner for portrait, landscape and ultrawide views',()=>{
 const box={minX:-27,maxX:24,minY:-1,maxY:27,minZ:-8,maxZ:17},dot=(a,b)=>a.reduce((sum,x,i)=>sum+x*b[i],0),tan=Math.tan(17.5*Math.PI/180);
 for(const aspect of [.55,1.5,2.5])for(const mode of ['overview','execution','complete']){const frame=researchCameraFrame(box,aspect,{mode,height:1100});assert.ok(frame.position.every(Number.isFinite));for(const x of [box.minX,box.maxX])for(const y of [box.minY,box.maxY])for(const z of [box.minZ,box.maxZ]){const p=[x-frame.target[0],y-frame.target[1],z-frame.target[2]],depth=frame.distance-dot(p,frame.direction);assert.ok(depth>0);assert.ok(Math.abs(dot(p,frame.right)/(depth*tan*aspect))<=frame.widthUse+.001);assert.ok(Math.abs(dot(p,frame.up)/(depth*tan))<=frame.heightUse+.001);}}
});
test('event motion is bounded, finishes at rest and respects reduced motion',()=>{
 for(const signal of ['engage','complete'])for(let ms=0;ms<2000;ms+=15){const p=researchEventPose(ms,signal);assert.ok(Math.abs(p.lift)<.4&&p.scale>.97&&p.scale<1.03&&p.light>=0&&p.light<=1);assert.deepEqual(researchEventPose(ms,signal,true),{lift:0,scale:1,light:0});}assert.deepEqual(researchEventPose(1500,'complete'),{lift:0,scale:1,light:0});
});
test('introducing an actual final result changes composition without moving any main step',()=>{
 const model={name:'controlled scene',phase:'completed',nodes:Array.from({length:8},(_,index)=>({id:'s'+index,index,title:'step '+index,status:'submitted',label:'已交付',artifacts:[],skills:[]})),activities:[]},before=buildResearchNetwork(model);model.nodes[7].artifacts=[{index:0,name:'actual.md',path:'actual.md',availability:'file'}];const after=buildResearchNetwork(model);assert.equal(after.heroId,'artifact:s7:0');assert.equal(after.nodes.filter(node=>node.hero).length,1);for(const node of before.nodes.filter(node=>node.kind==='step'))assert.deepEqual(before.positions.get(node.id),after.positions.get(node.id));assert.ok(after.positions.get(after.heroId).z>Math.max(...after.stations.map(station=>station.z)));
});

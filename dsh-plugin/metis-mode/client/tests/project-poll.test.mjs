import test from 'node:test';
import assert from 'node:assert/strict';
import {mergeLive,mergeProjectFull,mergeProjectDelta} from '../project-poll.js';
const base=()=>({id:'actual',steps:[{id:'a',status:'working',delivery:{text:'original actual delivery'}}],activity:[],runtime:{instanceId:'runtime'},pulseRevision:2,execution:{running:true,loaded:true},live:{instanceId:'stream',startedAt:10,revision:2,firstSeq:1,lastSeq:2,entries:[{seq:1,text:'one'},{seq:2,text:'two'}]}});
test('delta merges actual new output and preserves the original manuscript/delivery instead of replacing it',()=>{
 const p=base(),next=mergeProjectDelta(p,{id:'actual',live:{...p.live,revision:3,lastSeq:3,entries:[{seq:3,text:'real stdout'}]},pulse:{revision:3,runtime:p.runtime,steps:[{id:'a',status:'submitted'}],activity:[],recordedAt:'actual'}});
 assert.deepEqual(next.live.entries.map(x=>x.text),['one','two','real stdout']);assert.equal(next.steps[0].delivery.text,'original actual delivery');assert.equal(next.percent,100);
});
test('no changes do not rerender and late full replies cannot erase newer live/static data',()=>{
 const p=base();assert.equal(mergeProjectDelta(p,{id:'actual',live:{...p.live,entries:[]},pulse:null,execution:p.execution}),p);
 const old={...p,pulseRevision:1,live:{...p.live,revision:1,entries:[{seq:1,text:'old'}]}};assert.equal(mergeProjectFull(p,old),p);
});
test('a real new stream resets its tape while an older epoch cannot replace it',()=>{
 const p=base();assert.equal(mergeLive(p.live,{instanceId:'old',startedAt:1,entries:[]}),p.live);assert.equal(mergeLive(p.live,{instanceId:'new',startedAt:20,entries:[]}).instanceId,'new');assert.equal(mergeProjectDelta(p,{id:'other',live:{}}),p);
});
test('mode handoffs replace the session scene and old-version full/delta responses cannot revert it',()=>{
 const old={...base(),sessionId:'old',versionId:'v1',workflowUpdate:{revision:0}},next={...base(),sessionId:'new',versionId:'v2',pulseRevision:1,live:null,workflowUpdate:{revision:1}};
 assert.equal(mergeProjectFull(old,next),next);assert.equal(mergeProjectFull(next,old),next);
 assert.equal(mergeProjectDelta(next,{id:next.id,sessionId:'old',versionId:'v1',pulse:{revision:900,steps:[{id:'bad'}]}}),next);
});

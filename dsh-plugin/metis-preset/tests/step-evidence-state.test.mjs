import test from 'node:test';
import assert from 'node:assert/strict';
import {refreshContentState,stableFailedEvidence,restoreInterruptedCheck,markVerified} from '../step-evidence-state.js';
const files=sha=>[{path:'actual.md',exists:true,sha256:sha,bytes:10,kind:'.md'}];
test('unchanged submissions survive todos, failed operations, unrelated writes and cold baselining',()=>{
 const item={status:'submitted',delivery:{artifacts:[{path:'actual.md',sha256:'original',bytes:10}]},deferredRecheck:true};assert.equal(refreshContentState(item,{files:files('original')}),false);assert.equal(item.status,'submitted');assert.equal(item.deferredRecheck,undefined);
 for(const operation of ['todo_write','failed edit','other file write']){item.lastOperation=operation;assert.equal(refreshContentState(item,{files:files('original')}),false);assert.equal(item.status,'submitted');}
});
test('real changes including unknown shell writers revoke completion at the boundary',()=>{
 const item={status:'passed',payload:{text:''},review:{verdict:{passed:true}}};markVerified(item,{files:files('original')});assert.equal(refreshContentState(item,{files:files('changed')}),true);assert.equal(item.status,'needs_revision');assert.equal(item.review,null);
});
test('editing a report cannot force a paid re-review of unchanged failing core evidence',()=>{
 const review={verdict:{checks:[{criterion:'正文缺少B',passed:false,evidenceRefs:'F1'}]},evidenceIndex:[{id:'F1',kind:'actual-file',path:'actual.md',sha256:'original'}]};
 assert.equal(stableFailedEvidence(review,[...files('original'),{path:'report.md',exists:true,sha256:'changed report'}]),true);assert.equal(stableFailedEvidence(review,files('fixed')),false);
});
test('interrupted in-flight checking is recoverable and does not acquire a fake verdict',()=>{
 const item={status:'checking'};assert.equal(restoreInterruptedCheck(item),true);assert.equal(item.status,'needs_recheck');assert.equal(item.review,null);assert.equal(item.recovery.usageKnown,false);assert.equal(restoreInterruptedCheck(item),false);
});

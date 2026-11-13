import test from 'node:test';
import assert from 'node:assert/strict';
import {noteRepeatedFailure} from '../no-progress.js';
test('repeated identical failed actions stop a run without revoking a true submission',()=>{
 const item={status:'submitted'},failure={key:'actual same failure',ownerCount:1,reason:'实际文件权限不足'};assert.equal(noteRepeatedFailure(item,failure),false);assert.equal(noteRepeatedFailure(item,failure),true);assert.equal(item.status,'submitted');assert.match(item.noProgress.reason,/原交付状态不因此撤销/);
});
test('a changed cause or new actual owner input is not a fixed chat or workflow round limit',()=>{
 const item={status:'working'};assert.equal(noteRepeatedFailure(item,{key:'one',ownerCount:1,reason:'实际缺项'}),false);assert.equal(noteRepeatedFailure(item,{key:'different evidence',ownerCount:1,reason:'实际新缺项'}),false);assert.equal(noteRepeatedFailure(item,{key:'different evidence',ownerCount:2,reason:'用户重新推进'}),false);
});

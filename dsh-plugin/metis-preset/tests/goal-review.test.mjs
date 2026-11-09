import test from 'node:test';
import assert from 'node:assert/strict';
import {parseGoalReview,referencesActualEvidence,goalReviewEvidence,reviewUsesKnownEvidence} from '../goal-review.js';
const receipt=()=>({passed:true,purposeSatisfied:true,deliverablesSatisfied:true,prohibitionsRespected:true,needsUserInput:false,checks:[{criterion:'实际交付内容',passed:true,evidenceRefs:'file.md sha256=actual'}],feedback:['依据真实内容判断']});
test('review receipts retain explicit model judgements and evidence',()=>assert.deepEqual(parseGoalReview(JSON.stringify(receipt())),receipt()));
test('lossless list/string formatting does not discard real model evidence',()=>{
  const value=receipt();value.checks[0].evidenceRefs=['file.md','nativeCalls'];value.feedback='已核对';
  assert.equal(parseGoalReview(value).checks[0].evidenceRefs,'file.md\nnativeCalls');assert.deepEqual(parseGoalReview(value).feedback,['已核对']);
});
test('a missing or string boolean is never defaulted into a passed review',()=>{
  for(const key of ['passed','purposeSatisfied','deliverablesSatisfied','prohibitionsRespected','needsUserInput']){
    const absent=receipt();delete absent[key];assert.throws(()=>parseGoalReview(absent),new RegExp(key));
    const text=receipt();text[key]='true';assert.throws(()=>parseGoalReview(text),new RegExp(key));
  }
});
test('a self-reported success without real evidence cannot be parsed as complete',()=>{
  const value=receipt();value.checks[0].evidenceRefs='';assert.throws(()=>parseGoalReview(value),/证据/);
  assert.throws(()=>parseGoalReview('已完成'),/JSON|Unexpected/);
});
test('actual native root/subcall IDs and equivalent Windows citations resolve to the same real evidence',()=>{
  const input={files:[{path:'C:\\test\\result.json',sha256:'a'.repeat(64)}],nativeCalls:[{callId:'tool_actual:metis:12345678-1234-1234-1234-123456789abc',rootCallId:'tool_actual'}],text:'',userMessages:[]};
  for(const citation of ['pwsh tool_actual produced the file','tool_actual:metis:12345678-1234-1234-1234-123456789abc','C:/test/result.json','C:\\\\test\\\\result.json','A'.repeat(64),'nativeCalls has no prohibited operations'])assert.equal(referencesActualEvidence(input,citation),true,citation);
  assert.equal(referencesActualEvidence(input,'tool_invented'),false);assert.equal(referencesActualEvidence(input,'userMessages approved'),false);
});
test('structured evidence IDs identify actual supplied records without inventing user confirmation',()=>{
  const evidence=goalReviewEvidence({files:[{path:'actual.docx',sha256:'a'.repeat(64),parts:['word/document.xml'],styles:'actual XML'}],nativeCalls:[{callId:'actual-call'}],text:'',userMessages:[]});
  assert.deepEqual(evidence.ids,['F1','C1','A1']);assert.equal(evidence.input.files[0].path,'actual.docx');assert.equal(evidence.input.files[0].evidenceId,'F1');assert.equal(evidence.input.userMessages.length,0);
  const verdict=receipt();verdict.checks[0].evidenceRefs='F1\nC1';assert.equal(reviewUsesKnownEvidence(verdict,evidence.ids),true);verdict.checks[0].evidenceRefs='U1';assert.equal(reviewUsesKnownEvidence(verdict,evidence.ids),false);
  verdict.checks[0].evidenceRefs='F9';assert.equal(reviewUsesKnownEvidence(verdict,evidence.ids),false);assert.deepEqual(evidence.tool.parameters.properties.checks.items.properties.evidenceRefs.items.enum,evidence.ids);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {ExecutionEvidence,usageEvidenceId} from '../execution-evidence.js';
import {recordedUsage} from '../system-runtime.js';
const fixture=fn=>{const root=mkdtempSync(join(tmpdir(),'metis-facts-'));try{return fn(root);}finally{rmSync(root,{recursive:true,force:true});}};
const call=(id,name='read',args={path:'actual.md'})=>({callId:id,rootCallId:id,name,arguments:args});
test('confirmation and original writes survive over 16 calls and process-style reopening',()=>fixture(root=>{
 const ledger=new ExecutionEvidence('a','scope',{root});ledger.record(call('confirm','ask_user_question',{question:'真实确认'}),{value:{answer:'同意'}},'step');ledger.record(call('first','write'),{value:'actual tool return'},'step');
 for(let i=0;i<60;i++)ledger.record(call('read'+i),{value:'same file'},'step');
 const restored=new ExecutionEvidence('a','scope',{root});assert.equal(restored.initial('step').total,62);assert.ok(restored.initial('step').calls.some(x=>x.name==='ask_user_question'));assert.equal(restored.initial('step').firstWrites[0].path.endsWith('actual.md'),true);
 assert.match(restored.read('step',restored.initial('step').calls.find(x=>x.name==='ask_user_question').id).text,/同意/);
 assert.throws(()=>restored.read('other',restored.initial('step').calls[0].id),/不属于/);
}));
test('repeating a read with a different invocation ID does not create a new semantic evidence fingerprint',()=>fixture(root=>{
 const ledger=new ExecutionEvidence('a','scope',{root});ledger.record(call('one'),{value:'actual content'},'step');const before=ledger.semanticFingerprint('step');ledger.record(call('two'),{value:'actual content'},'step');assert.equal(ledger.semanticFingerprint('step'),before);
 ledger.record(call('three'),{value:'new actual content'},'step');assert.notEqual(ledger.semanticFingerprint('step'),before);
}));
test('tampered machine receipts are rejected instead of becoming completion evidence',()=>fixture(root=>{
 const ledger=new ExecutionEvidence('a','scope',{root});ledger.record(call('one'),{value:'original'},'step');writeFileSync(ledger.path,readFileSync(ledger.path,'utf8').replace('original','tampered'));
 assert.throws(()=>new ExecutionEvidence('a','scope',{root}),/摘要不匹配/);
}));
test('original native journal events reconstruct actual earlier step writes without a model-written report',()=>fixture(root=>{
 const events=[{type:'tool/call',seq:1,time:1,data:{callId:'open',name:'metis_library',arguments:{action:'open',stepId:'alpha'}}},{type:'tool/result',seq:2,time:2,data:{message:{toolCallId:'open',content:[{type:'text',text:'{"modeId":"mode"}'}]}}},{type:'tool/call',seq:3,time:3,data:{callId:'write',name:'write',arguments:{path:'alpha.md',content:'actual'}}},{type:'tool/result',seq:4,time:4,data:{message:{toolCallId:'write',content:[{type:'text',text:'written'}],isError:false}}}];
 const ledger=new ExecutionEvidence('a','scope',{root});ledger.hydrate({session:{header:{cwd:root},snapshotEvents:()=>events}});assert.equal(ledger.initial('alpha').firstWrites.length,1);assert.equal(ledger.all('alpha').find(item=>item.name==='write').nativeEventSeq,4);assert.equal(ledger.all('alpha').find(item=>item.name==='metis_library').nativeEventSeq,2);assert.match(ledger.read('alpha',ledger.all('alpha').find(item=>item.name==='write').id).text,/actual/);
}));
test('a crash-truncated final append is quarantined and real committed facts remain usable',()=>fixture(root=>{
 const ledger=new ExecutionEvidence('a','scope',{root});ledger.record(call('first','write'),{value:'actual'},'step');writeFileSync(ledger.path,readFileSync(ledger.path,'utf8')+'{"partial":');
 const restored=new ExecutionEvidence('a','scope',{root});assert.equal(restored.initial('step').firstWrites.length,1);assert.equal(restored.recovery.kind,'interrupted-append');assert.equal(readFileSync(restored.recovery.quarantine,'utf8'),'{"partial":');restored.record(call('later'),{value:'later actual'},'step');assert.equal(new ExecutionEvidence('a','scope',{root}).all('step').length,2);
}));

test('native usage sequence and reviewer request identities deduplicate across journal restoration',()=>fixture(root=>{
 const usage={inputTokens:100,cacheReadTokens:200,outputTokens:30},request={attempt:1,usage:{inputTokens:40,outputTokens:12}};
 const ledger=new ExecutionEvidence('usage-session','scope',{root});
 ledger.append({id:usageEvidenceId({channel:'main',sessionId:'usage-session',eventSeq:4}),kind:'usage',protocol:'native-usage-v2',channel:'main',usage});
 ledger.append({id:usageEvidenceId({channel:'review',sessionId:'usage-session',callId:'check',attempt:1}),kind:'usage',protocol:'native-usage-v2',channel:'review',request});
 const events=[{type:'assistant/message',seq:4,time:4,data:{usage}},{type:'tool/call',seq:5,time:5,data:{callId:'check',name:'metis_step',arguments:{action:'check',stepId:'a'}}},{type:'tool/result',seq:6,time:6,data:{message:{toolCallId:'check',content:[{type:'text',text:JSON.stringify({review:{requests:[request,{attempt:2,usage:{inputTokens:5,outputTokens:2}}]}})}]}}},{type:'tool/call',seq:7,time:7,data:{callId:'cached-check',name:'metis_step',arguments:{action:'check',stepId:'a'}}},{type:'tool/result',seq:8,time:8,data:{message:{toolCallId:'cached-check',content:[{type:'text',text:JSON.stringify({noNewEvidence:true,review:{requests:[request]}})}]}}}];
 events.push({type:'tool/call',seq:9,time:9,data:{callId:'evidence-error',name:'metis_step',arguments:{action:'evidence',stepId:'a',evidenceId:'A1'}}},{type:'tool/result',seq:10,time:10,data:{message:{toolCallId:'evidence-error',content:[{type:'text',text:JSON.stringify({status:'blocked',attempt:{requests:[request]}})}]}}});
 const agent={session:{header:{cwd:root},snapshotEvents:()=>events}};
 ledger.hydrate(agent);const expected=recordedUsage(ledger);assert.equal(expected.main.requests,1);assert.equal(expected.review.requests,2);assert.equal(expected.main.cacheReadTokens,200);assert.equal(expected.review.outputTokens,14);
 const cold=new ExecutionEvidence('usage-session','scope',{root});cold.hydrate(agent);assert.deepEqual(recordedUsage(cold),expected);
}));

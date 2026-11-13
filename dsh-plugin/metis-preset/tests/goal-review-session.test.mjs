/** Isolated protocol/budget unit tests with an explicitly scripted LLM adapter.
 * Native DSH / real model evidence is collected separately; these are not that. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {runGoalReview,reviewKey,buildEvidenceBundle} from '../goal-review-session.js';
const verdict=(refs=['F1'])=>({passed:true,purposeSatisfied:true,deliverablesSatisfied:true,prohibitionsRespected:true,needsUserInput:false,checks:[{criterionId:'purpose',criterion:'真实内容满足目标',passed:true,evidenceRefs:refs}],feedback:[]});
const tool=(name,args,id='actual-unit-call')=>({type:'block-end',index:0,block:{type:'tool-call',id,name,arguments:JSON.stringify(args)}});
function fixture(responses,info={reasoning:{efforts:[{id:'low'},{id:'high'}]}}){
 const calls=[];const llm={prepareCall:async(route,signal,configure)=>{const config={...route,...configure({},info)};return{config,stream:async function*(options){calls.push(options);const response=responses[calls.length-1];assert.ok(response,'No undeclared scripted model request');if(typeof response==='function'){yield*response(options);return;}for(const item of response)yield item;yield{type:'usage',usage:{inputTokens:100,outputTokens:50}};yield{type:'finish',reason:{kind:'tool-calls'}};}};}};
 return{ctx:{get:name=>name==='llm'?llm:null},exec:{agent:{session:{id:'unit-session',requestHeader:()=>({config:{provider:'scripted-unit-adapter',model:'unit-model'}})},options:{}}},calls};
}
const input=()=>({purpose:'核验实际文件内容',deliverables:'文件',criteria:'',prohibitions:'',files:[{path:'actual.md',exists:true,kind:'.md',sha256:'a'.repeat(64),text:'actual content',textCharacters:14,textTruncated:false,textAvailable:true}],nativeCalls:[],userMessages:[],text:''});
test('a complete real-evidence-shaped verdict uses a dedicated supported budget and retains usage',async()=>{
 const f=fixture([[tool('metis_goal_verdict',verdict())]]),r=await runGoalReview(f.ctx,f.exec,input());assert.equal(r.verdict.passed,true);assert.equal(r.requests.length,1);assert.equal(r.usage.outputTokens,50);assert.equal(f.calls[0].reasoningEffort,'low');assert.equal(f.calls[0].maxTokens,6144);
});
test('missing text is supplemented within the reviewer with matching tool-call/result identities',async()=>{
 const f=fixture([[tool('metis_goal_read',{evidenceId:'F1',offset:4,maxChars:20},'read-one')],[tool('metis_goal_verdict',verdict(), 'verdict-two')]]),data=input();data.files[0].text='real';data.files[0].textCharacters=14;data.files[0].textTruncated=true;let reads=0;
 const r=await runGoalReview(f.ctx,f.exec,data,{readArtifact:async(file,args)=>{reads++;assert.equal(file.path,'actual.md');return{path:file.path,sha256:file.sha256,offset:args.offset,text:' tail data',nextOffset:null};}});
 assert.equal(r.verdict.passed,true);assert.equal(reads,1);assert.equal(r.reads[0].evidenceId,'F1');assert.ok(f.calls[1].messages.some(message=>message.role==='tool'&&message.toolCallId==='read-one'));
});
test('claiming passed with unread selected core text cannot silently complete',async()=>{
 const data=input();data.files[0].text='real';data.files[0].textTruncated=true;
 const f=fixture([[tool('metis_goal_verdict',verdict(),'early')],[tool('metis_goal_read',{evidenceId:'F1',offset:4,maxChars:20},'read')],[tool('metis_goal_verdict',verdict(),'final')]]);
 const r=await runGoalReview(f.ctx,f.exec,data,{readArtifact:async()=>({text:' tail data',offset:4,nextOffset:null})});assert.equal(r.requests.length,3);assert.equal(r.verdict.passed,true);assert.ok(f.calls[1].messages.some(message=>message.role==='user'&&JSON.stringify(message.content).includes('仍可直接补读')));
});
test('identical page requests stop with a recoverable no-progress cause instead of another model call',async()=>{
 const f=fixture([[tool('metis_goal_read',{evidenceId:'F1',offset:0},'one')],[tool('metis_goal_read',{evidenceId:'F1',offset:0},'two')]]);
 await assert.rejects(runGoalReview(f.ctx,f.exec,input(),{readArtifact:async()=>({text:'actual content'})}),error=>{assert.equal(error.code,'metis/evidence-stalled');assert.equal(error.reviewAttempt.requests.length,2);assert.equal(error.reviewAttempt.verdict,null);return true;});assert.equal(f.calls.length,2);
});
test('single assessment budget exhaustion retains actual usage and never invents passed',async()=>{
 const f=fixture([[tool('metis_goal_read',{evidenceId:'F1',offset:0})]]);
 await assert.rejects(runGoalReview(f.ctx,f.exec,input(),{policy:{maxOutputTokens:300,maxTokensPerRequest:300},readArtifact:async()=>({text:'actual content'})}),error=>{assert.equal(error.code,'metis/review-budget');assert.equal(error.reviewAttempt.usage.outputTokens,50);return true;});assert.equal(f.calls.length,1);
});
test('an invented evidence reference is refused and unsupported reasoning controls are not sent',async()=>{
 const f=fixture([[tool('metis_goal_verdict',verdict(['F999']))]],{});await assert.rejects(runGoalReview(f.ctx,f.exec,input()),/不存在的证据/);assert.equal(f.calls[0].reasoningEffort,undefined);
});
test('review cache identity excludes ordinary call history but includes goals and owner requirements',()=>{
 const a={filesHash:'actual',step:{instruction:'目标'},userMessages:[{index:1,text:'真实用户要求'}]},b={...a,nativeCalls:[{name:'todo_write'}]};assert.equal(reviewKey(a),reviewKey(b));assert.notEqual(reviewKey(a),reviewKey({...a,filesHash:'changed'}));assert.notEqual(reviewKey(a),reviewKey({...a,step:{instruction:'新目标'}}));
});
test('directory descendants and old confirmation evidence retain stable usable identities',()=>{
 const data=input();data.files=[{path:'sections',kind:'directory',exists:true,manifestHash:'actual',entries:data.files}];data.userMessages=[{index:3,text:'用户确认'}];const b=buildEvidenceBundle(data);assert.ok(b.ids.includes('F1_1'));assert.equal(b.lookup.get('F1_1').value.path,'actual.md');assert.ok(b.ids.some(id=>id.startsWith('U')));
});
test('native assistant source and provider replay are preserved in memory while private reasoning never enters receipts/checkpoints',async()=>{
 const replay={response:{provider:'unit'},blocks:[{type:'reasoning'},{type:'tool-call'}]};
 const f=fixture([async function*(){yield{type:'block-end',index:0,block:{type:'reasoning',text:'PRIVATE_CHAIN_SENTINEL'}};yield{...tool('metis_goal_read',{evidenceId:'F1',offset:0},'read'),index:1};yield{type:'usage',usage:{inputTokens:10,outputTokens:10}};yield{type:'finish',reason:{kind:'tool-calls'},replayState:replay};},[tool('metis_goal_verdict',verdict(),'final')]]);
 const checkpoints=[];const result=await runGoalReview(f.ctx,f.exec,input(),{readArtifact:async()=>({text:'actual content',sha256:'a'.repeat(64)}),onCheckpoint:checkpoint=>checkpoints.push(structuredClone(checkpoint))});
 const assistant=f.calls[1].messages.find(message=>message.role==='assistant');assert.equal(assistant.source.kind,'model');assert.deepEqual(assistant.source.replayState,replay);assert.equal(assistant.content[0].type,'reasoning');assert.ok(!JSON.stringify(result).includes('PRIVATE_CHAIN_SENTINEL'));assert.ok(!JSON.stringify(checkpoints).includes('PRIVATE_CHAIN_SENTINEL'));
});
test('resume consumes only hash-matching public evidence and does not ask to read it again',async()=>{
 const data=input();data.files[0].text='real';data.files[0].textTruncated=true;
 const f=fixture([[tool('metis_goal_verdict',verdict())]]);let reads=0;
 const result=await runGoalReview(f.ctx,f.exec,data,{resume:{pages:[{evidenceId:'F1',path:'actual.md',sha256:'a'.repeat(64),part:'text',offset:4,text:' tail data'}]},readArtifact:async()=>{reads++;throw new Error('Must not reread the same actual page');}});
 assert.equal(result.verdict.passed,true);assert.equal(reads,0);assert.equal(result.requests.length,1);
});
test('a pure continue does not change the acceptance cache identity or restrict later chat',()=>{
 const value={filesHash:'actual',step:{instruction:'原目标'},userMessages:[{index:1,text:'原要求'}]};assert.equal(reviewKey(value),reviewKey({...value,userMessages:[...value.userMessages,{index:2,text:'继续'}]}));assert.notEqual(reviewKey(value),reviewKey({...value,userMessages:[...value.userMessages,{index:2,text:'正文再增加一个分析角度'}]}));
});
test('updated mode requirements reach the actual review payload and invalidate the previous verdict key',()=>{
 const a={filesHash:'same',step:{instruction:'本步目标',workflowRequirements:{systemPrompt:'原总要求'}}},b={...a,step:{...a.step,workflowRequirements:{systemPrompt:'真实新总要求'}}};assert.notEqual(reviewKey(a),reviewKey(b));
 const data={...input(),workflowRequirements:b.step.workflowRequirements},bundle=buildEvidenceBundle(data);assert.deepEqual(bundle.payload.workflowRequirements,b.step.workflowRequirements);assert.ok(bundle.rubric.includes('mode'));
});

test('submitted text preview and continuation use Unicode code-point offsets',async()=>{
 const data=input();data.files=[];data.text='😀'.repeat(8000)+'实际末尾';
 const bundle=buildEvidenceBundle(data);assert.equal(Array.from(bundle.payload.text).length,8000);assert.equal(bundle.payload.textCharacters,8004);
 const f=fixture([[tool('metis_goal_read',{evidenceId:'T1',offset:8000,maxChars:20},'unicode-read')],[tool('metis_goal_verdict',verdict(['T1']),'unicode-verdict')]]);
 const result=await runGoalReview(f.ctx,f.exec,data);assert.equal(result.verdict.passed,true);assert.equal(result.requests.length,2);
 const actual=f.calls[1].messages.find(message=>message.role==='tool');assert.equal(JSON.parse(actual.content[0].text).text,'实际末尾');
});

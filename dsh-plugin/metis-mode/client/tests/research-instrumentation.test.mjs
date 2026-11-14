/** Controlled projection tests; these records are fixtures, not claimed research execution. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {buildResearchNetwork} from '../research-network.js';
import {researchInstrumentation,researchFileName} from '../research-instrumentation.js';
const fixture=()=>({name:'instrument fixture',phase:'running',currentStepId:'a',nodes:[{id:'a',index:0,title:'分析',purpose:'检查真实资料',status:'working',label:'处理中',skills:[{id:'read',name:'资料读取'},{id:'review',name:'审阅'}],artifacts:[]},{id:'b',index:1,title:'交付',status:'submitted',label:'已交付',skills:[{id:'review',name:'审阅'}],artifacts:[{index:0,name:'paper.docx',path:'C:\\project\\paper.docx',availability:'file',bytes:2048},{index:1,name:'missing.pdf',path:'missing.pdf',availability:'missing'}]}],activities:[]});
test('an empty project reports recorded zero values without inventing inputs, goals or tools',()=>{
 const data=researchInstrumentation({},buildResearchNetwork({nodes:[],activities:[]}));assert.equal(data.records,0);assert.equal(data.checks,0);assert.deepEqual(data.sources,[]);assert.deepEqual(data.files,[]);assert.equal(data.focus,null);assert.equal(data.running,false);assert.equal(data.goal,'');
});
test('only successful invoked reads appear as inputs and Windows paths deduplicate correctly',()=>{
 const model=fixture();model.activities=[{callId:'a',stepId:'a',kind:'read',status:'succeeded',target:'C:\\P\\Paper.pdf'},{callId:'b',stepId:'a',kind:'read',status:'succeeded',target:'c:/p/paper.pdf'},{callId:'c',kind:'read',status:'failed',target:'failed.pdf'},{callId:'d',kind:'read',status:'succeeded',target:'refused.pdf',invoked:false},{callId:'e',kind:'read',status:'running',target:'pending.pdf'}];
 const data=researchInstrumentation(model,buildResearchNetwork(model));assert.equal(data.sources.length,1);assert.equal(data.sources[0].name,'paper.pdf');assert.equal(data.records,5);assert.equal(researchFileName('D:\\资料\\论文.pdf'),'论文.pdf');
});
test('files, registered bindings and unique skills have different, accurate counts',()=>{
 const model=fixture(),data=researchInstrumentation(model,buildResearchNetwork(model));assert.equal(data.files.length,1);assert.equal(data.files[0].bytes,2048);assert.deepEqual(data.formats,[{name:'DOCX',count:1}]);assert.equal(data.bindings,3);assert.equal(data.skills.length,2);assert.equal(data.submitted,1);
});
test('focused information uses the selected stage, while live execution retains its actual owner',()=>{
 const model=fixture();model.activities=[{callId:'x',stepId:'a',kind:'read',tool:'read_file',status:'running',target:'input.pdf'},{callId:'y',stepId:'b',kind:'review',tool:'metis_step_check',status:'succeeded'}];
 const data=researchInstrumentation(model,buildResearchNetwork(model,{expandedStepId:'b'}));assert.equal(data.focus.stepId,'b');assert.equal(data.active.stepId,'a');assert.equal(data.running,true);assert.equal(data.scopeCalls.length,1);assert.equal(data.checks,1);assert.equal(data.stageMetrics.get('a').calls,1);assert.equal(data.stageMetrics.get('b').reviews,1);
});
test('long history is retained while only four recent records and twelve status markers are exposed',()=>{
 const model=fixture();model.activities=Array.from({length:700},(_,i)=>({callId:String(i),stepId:'a',status:'succeeded',label:'call '+i,tool:'read_file'}));const data=researchInstrumentation(model,buildResearchNetwork(model,{overview:true}));assert.equal(data.records,700);assert.equal(data.recent.length,4);assert.equal(data.recent[0].callId,'699');assert.equal(data.stageMetrics.get('a').statuses.length,12);assert.deepEqual(data.tools,['read_file']);
});
test('projection never changes model records or resolves unknown actions to the current stage',()=>{
 const model=fixture();model.activities=[{callId:'x',kind:'review',status:'succeeded',invoked:false},{callId:'y',status:'succeeded'}];const before=structuredClone(model),data=researchInstrumentation(model,buildResearchNetwork(model));assert.deepEqual(model,before);assert.equal(data.checks,0);assert.equal(data.stageMetrics.get('a').calls,0);assert.equal(data.recent[0].stepId,null);
});
test('portable completed reads use the same successful-source projection',()=>{
 const model=fixture();model.activities=[{callId:'read',kind:'read',status:'completed',target:'paper.pdf'}];assert.equal(researchInstrumentation(model,buildResearchNetwork(model)).sources.length,1);
});
test('a shared output path counts once globally and remains attached to every registered stage',()=>{
 const model=fixture();model.nodes[0].artifacts=[{index:0,name:'paper.docx',path:'C:\\project\\paper.docx',availability:'file'}];const graph=buildResearchNetwork(model,{expandedStepId:'a'}),data=researchInstrumentation(model,graph);assert.equal(data.files.length,1);assert.equal(data.scopeFiles.length,1);assert.equal(data.stageMetrics.get('a').files,1);assert.equal(data.stageMetrics.get('b').files,1);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {workflowDifference,migrateWorkflowRecord,workflowFragment,projectExecutionState} from '../project-workflow-sync.js';
const step=(id,extra={})=>({id,title:id,instruction:'实际目标',skills:['s'],prompt:'原提示词',loop:{enabled:true},...extra});
const version=(id,steps,extra={})=>({id,hash:id.repeat(64).slice(0,64),payload:{plugins:[{name:'metis-academic-preset/step-skills',config:{mode:{id:'m',name:'实际模式'},profile:{systemPrompt:'真实要求',steps,...extra},resourceSkills:[{id:'s',content:'实际技能',resources:'pinned'}]}}]}});
test('real version differences distinguish rename/order from execution changes and include additions/removals',()=>{
 const a=version('a',[step('one'),step('two')]),b=version('b',[step('two',{title:'新名称'}),step('three')]),diff=workflowDifference(a,b);
 assert.equal(diff.added,1);assert.equal(diff.removed,1);assert.equal(diff.modified,0);assert.equal(diff.changes.find(row=>row.stepId==='two').executionChanged,false);
 const c=version('c',[step('one',{prompt:'真实新版提示词'}),step('two')]);assert.deepEqual(workflowDifference(a,c).changes[0].fields,['步骤提示词']);
});
test('changed skill content, global requirements and final format are execution changes',()=>{
 const a=version('a',[step('one'),step('two')]),b=structuredClone(a);b.id='b';b.hash='b'.repeat(64);b.payload.plugins[0].config.resourceSkills[0].resources='new-real-resource-hash';assert.equal(workflowDifference(a,b).modified,2);
 const c=version('c',[step('one'),step('two')],{output:{format:'docx'}});assert.deepEqual(workflowDifference(a,c).changes.map(row=>row.stepId),['two']);
 const d=version('d',[step('one'),step('two')],{systemPrompt:'实际更改的总要求'});assert.equal(workflowDifference(a,d).modified,2);
});
test('migration retains real unchanged deliveries and timestamps, never reuses passed for changed goals',()=>{
 const a=version('a',[step('one'),step('two'),step('removed')]),b=version('b',[step('one',{title:'重命名'}),step('two',{instruction:'新的真实目标'}),step('new')]),difference=workflowDifference(a,b),delivered={at:'2026-11-01',artifacts:[{path:'actual.md',sha256:'actual'}],text:'实际交付'};
 const source={steps:{one:{status:'submitted',delivery:delivered},two:{status:'submitted',delivery:delivered,review:{verdict:{passed:true}}},removed:{status:'submitted',delivery:delivered}}};
 const result=migrateWorkflowRecord(source,{sessionId:'new',scope:'new-scope',mode:{id:'m'},profile:b.payload.plugins[0].config.profile,difference,updateId:'update',fromSessionId:'old',fromVersionId:'a',toVersionId:'b'});
 assert.equal(result.steps.one.status,'submitted');assert.equal(result.steps.one.delivery.at,delivered.at);assert.equal(result.steps.two.status,'needs_revision');assert.equal(result.steps.two.review,undefined);assert.equal(result.steps.two.delivery.at,delivered.at);assert.equal(result.steps.new.status,'not_started');assert.equal(result.steps.removed,undefined);assert.equal(source.steps.two.status,'submitted');assert.equal(result.currentStepId,'two');
});
test('latest workflow body is paged without loading skill bodies',()=>{
 const a=version('a',[step('one',{prompt:'真实'.repeat(5000)})]),page=workflowFragment(a,{stepId:'one',maxChars:300});assert.equal(page.text.length,300);assert.equal(page.nextOffset,300);assert.equal(page.skillBodiesLoaded,false);assert.throws(()=>workflowFragment(a,{stepId:'missing'}),/没有该步骤/);
});
test('a real SDK-shaped ownership predicate blocks handoff for running descendants and ignores unrelated actors',()=>{
 const root={id:'root',status:'idle'},child={id:'child',status:'idle'},grandchild={id:'grandchild',status:'running'},other={id:'other',status:'running'},live=[root,child,grandchild,other],owners=new Map([['child',root],['grandchild',child]]);
 const registry={get:id=>live.find(row=>row.id===id),list:()=>live,isOwnedBy:(id,owner)=>owners.get(id)===owner};
 assert.deepEqual(projectExecutionState(registry,'root'),{loaded:true,running:true,ownedRunning:1});assert.deepEqual(projectExecutionState(registry,'absent'),{loaded:false,running:false,ownedRunning:0});grandchild.status='idle';assert.equal(projectExecutionState(registry,'root').running,false);
});

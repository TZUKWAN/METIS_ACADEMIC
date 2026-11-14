import test from 'node:test';
import assert from 'node:assert/strict';
import {buildResearchNetwork} from '../research-network.js';
import {researchSelection,researchViewOptions,researchScopeOpacity,researchScopeFrame} from '../research-navigation.js';
import {researchDisplaySummary,researchStreamScope,ResearchTicker} from '../research-motion.js';
import {researchFollowKey,researchCameraFrame} from '../research-art-direction.js';
const fixture=()=>({key:'project:test',kind:'project',phase:'running',currentStepId:'a',nodes:['a','b'].map((id,index)=>({id,index,title:id,status:index?'not_started':'working',label:'测试状态',skills:[],artifacts:[]})),activities:Array.from({length:1000},(_,i)=>({callId:String(i),stepId:i%2?'b':'a',status:i===999?'running':'succeeded',label:'受控记录 '+i}))});
test('a new visual session starts at overview and live updates cannot pull manual overview into a stage',()=>{
 const model=fixture();model.network=buildResearchNetwork(model);assert.deepEqual(researchViewOptions(model,{},false),{overview:true});assert.deepEqual(researchViewOptions(model,{overview:true,stageId:'a'},false),{overview:true});
});
test('step, action and overview are distinct levels and only actual ownership can define action context',()=>{
 const model=fixture(),overview=buildResearchNetwork(model,{overview:true}),stage=buildResearchNetwork(model,{expandedStepId:'a'}),action=buildResearchNetwork(model,{expandedStepId:'a',actionId:'call:0'});
 assert.equal(overview.presentation.level,'overview');assert.equal(stage.presentation.level,'stage');assert.equal(action.presentation.level,'action');assert.equal(action.presentation.selectedId,'call:0');assert.ok(action.nodes.some(n=>n.id==='call:0'));assert.ok(action.nodes.filter(n=>n.origin==='activity').every(n=>n.stepId==='a'));
 assert.equal(buildResearchNetwork(model,{expandedStepId:'b',actionId:'call:0'}).presentation.level,'stage');
});
test('a historical action navigates to its own real page even with a thousand records',()=>{
 const model=fixture(),graph=buildResearchNetwork(model),selection=researchSelection(graph,'call:0');assert.equal(selection.stageId,'a');assert.equal(selection.page,83);
 const view=buildResearchNetwork(model,{expandedStepId:selection.stageId,actionId:selection.actionId});assert.equal(view.presentation.page,83);assert.ok(view.nodes.some(n=>n.id==='call:0'));assert.ok(view.nodes.filter(n=>n.origin==='activity').length<=6);
});
test('following tracks the actual active action; manual selection stays put while other stages execute',()=>{
 const model=fixture();model.network=buildResearchNetwork(model);const follow=researchViewOptions(model,{stageId:'a'},true);assert.equal(follow.expandedStepId,'b');assert.equal(follow.actionId,'call:999');
 const manual=researchViewOptions(model,{stageId:'a',actionId:'call:0',page:83},false);assert.equal(manual.expandedStepId,'a');assert.equal(manual.actionId,'call:0');
});
test('unassigned actions use project operations and unknown actions never borrow the current pointer',()=>{
 const model=fixture();model.activities=[{callId:'unknown',status:'running'}];const graph=buildResearchNetwork(model),selection=researchSelection(graph,'call:unknown');assert.equal(selection.stageId,'__project__');assert.equal(researchSelection(graph,'call:missing'),null);assert.equal(buildResearchNetwork(model,{expandedStepId:selection.stageId,actionId:selection.actionId}).presentation.stageId,null);
});
test('progressive disclosure makes unrelated stages noninteractive and reserves action focus for the selected record',()=>{
 const model=fixture(),stage=buildResearchNetwork(model,{expandedStepId:'a'}),action=buildResearchNetwork(model,{expandedStepId:'a',actionId:'call:0'});assert.equal(researchScopeOpacity(stage.byId.get('step:b'),stage.presentation),0);assert.equal(researchScopeOpacity(stage.byId.get('step:a'),stage.presentation),1);assert.equal(researchScopeOpacity(action.byId.get('call:0'),action.presentation),1);assert.equal(researchScopeOpacity(action.byId.get('call:2'),action.presentation),0);assert.equal(researchScopeOpacity(action.byId.get('step:a'),action.presentation),0);
});
test('focus bounds include only supplied physical records and do not invent six empty stations',()=>{
 const bounds=researchScopeFrame([{point:{x:2,y:3,z:4},size:{w:4,h:2}}]);assert.ok(bounds.maxX-bounds.minX<6);assert.ok(bounds.maxY-bounds.minY<4);assert.equal(researchScopeFrame([]),null);
});
test('navigation and projection preserve all original project facts',()=>{
 const model=fixture(),before=structuredClone(model),graph=buildResearchNetwork(model,{expandedStepId:'a',actionId:'call:0'});researchSelection(graph,'call:0');researchScopeOpacity(graph.byId.get('step:a'),graph.presentation);assert.deepEqual(model,before);assert.equal(graph.fullNodes.filter(n=>n.origin==='activity').length,1000);
});
test('an inspected historical action shows its own recorded output while another step runs',()=>{
 const model=fixture();model.activities[0].resultPreview='真实历史回执';model.activities[999].resultPreview='其他步骤输出';const graph=buildResearchNetwork(model,{expandedStepId:'a',actionId:'call:0'}),summary=researchDisplaySummary(graph,model);
 assert.equal(summary.nodeId,'call:0');assert.ok(summary.lines.includes('真实历史回执'));assert.ok(!summary.lines.includes('其他步骤输出'));
});
test('a manually inspected step cannot inherit another steps live console and overview hides it',()=>{
 const model=fixture();assert.equal(researchDisplaySummary(buildResearchNetwork(model,{expandedStepId:'a'}),model),null);assert.equal(researchDisplaySummary(buildResearchNetwork(model,{overview:true}),model),null);
 assert.equal(researchDisplaySummary(buildResearchNetwork(model,{expandedStepId:'b'}),model)?.nodeId,'call:999');
});
test('an action console filters same-step neighbors and accepts actual nested tool output',()=>{
 const scope=researchStreamScope({callId:'selected',rootCallId:'selected',stepId:'a'},{active:{callId:'other',stepId:'a'}});
 assert.equal(scope.matches({callId:'selected',stepId:'a'}),true);assert.equal(scope.matches({callId:'nested',rootCallId:'selected',stepId:'a'}),true);assert.equal(scope.matches({callId:'other',stepId:'a'}),false);assert.equal(scope.matches({stepId:'a'}),false);
});
test('wide action consoles retain long actual lines and never replay idle text or private reasoning',()=>{
 const text='x'.repeat(100),wide=new ResearchTicker(120),narrow=new ResearchTicker();wide.append(text+'\n','stdout');narrow.append(text+'\n','stdout');assert.equal(wide.lines.length,1);assert.equal(narrow.lines.length,3);
 wide.append('private','thinking');assert.equal(wide.lines.length,1);const a=wide.frame(1000,true),b=wide.frame(2000);assert.equal(a.position,b.position);assert.equal(b.moving,false);
});
test('action follow transitions only to the actual selected call within its owner',()=>{
 const model=fixture(),a=buildResearchNetwork(model,{expandedStepId:'a',actionId:'call:0'}),b=buildResearchNetwork(model,{expandedStepId:'a',actionId:'call:2'});assert.notEqual(researchFollowKey(a,'call:0'),researchFollowKey(b,'call:2'));
 const pose=researchCameraFrame(researchScopeFrame([{point:{x:2,y:3,z:4},size:{w:4.9,h:2.85}}]),1.5,{mode:'action',height:700});assert.ok(pose.distance<20);assert.ok(pose.target[1]<3);
});
test('model processing follows the owning stage rather than pretending a completed tool is still running',()=>{
 const model=fixture();model.activities=model.activities.slice(0,1);model.phase='processing';model.live={active:{kind:'model',stepId:'a',attemptId:'native-model',state:'text'}};model.network=buildResearchNetwork(model);
 const view=researchViewOptions(model,{},true);assert.equal(view.expandedStepId,'a');assert.equal(view.actionId,null);const graph=buildResearchNetwork(model,view),summary=researchDisplaySummary(graph,model);assert.equal(graph.presentation.level,'stage');assert.equal(summary.nodeId,'step:a');assert.equal(summary.status,'processing');
});

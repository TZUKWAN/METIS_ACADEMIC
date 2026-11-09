import test from 'node:test';
import assert from 'node:assert/strict';
import {researchSceneState} from '../client/project-scene.js';

const project=()=>({id:'private-test',status:'ready',name:'状态单元测试',currentStepId:'a',execution:{running:false},steps:[{id:'a',title:'资料',status:'submitted',delivery:{artifacts:[{path:'actual.md',availability:'file'}]}},{id:'b',title:'核对',status:'not_started'}],activity:[]});
test('viewing a node never changes the executing step or counts as a new delivery',()=>{
  const value=project();value.activity=[{callId:'actual-start',stepId:'b',label:'读取资料',status:'running'}];
  const view=researchSceneState(value,'a');assert.equal(view.nodes[0].viewed,true);assert.equal(view.nodes[0].active,false);assert.equal(view.nodes[1].active,true);assert.equal(view.delivered,1);assert.equal(view.phase,'running');assert.equal(value.currentStepId,'a');
});
test('a discussion does not turn a delivered or unopened step into executing work',()=>{
  const value=project();value.execution.running=true;let view=researchSceneState(value);assert.equal(view.phase,'processing');assert.ok(view.nodes.every(node=>!node.active));
  value.steps[0].status='checking';view=researchSceneState(value);assert.equal(view.nodes[0].active,false);assert.equal(view.delivered,0);
});
test('failed calls, stopped work and unknown background jobs retain their actual meaning',()=>{
  const value=project();value.steps[1].status='submitted';
  value.activity=[{stepId:'b',status:'failed'}];assert.equal(researchSceneState(value).phase,'attention');assert.equal(researchSceneState(value).delivered,2);
  value.activity[0].status='cancelled';assert.equal(researchSceneState(value).phase,'stopped');
  value.activity[0].status='unverified';value.activity[0].jobId='native-job';const view=researchSceneState(value);assert.equal(view.phase,'waiting');assert.match(view.headline,/待确认/);assert.ok(view.nodes.every(node=>!node.active));
});
test('manual edits require review and do not silently run later steps',()=>{
  const value=project();value.steps[0].status='needs_revision';value.steps[0].delivery.manuallyEditedAt='actual-save-receipt';
  const view=researchSceneState(value);assert.equal(view.phase,'attention');assert.equal(view.nodes[0].label,'手动修改待核验');assert.equal(view.delivered,0);assert.equal(view.nodes[1].status,'not_started');
});
test('step count, check history and file count come from records, including empty/loading projects',()=>{
  assert.equal(researchSceneState(null).phase,'unavailable');assert.equal(researchSceneState(null).total,0);
  const value=project();value.steps.push({...value.steps[0],id:'c'});value.activity=[{stepId:'a',kind:'review',status:'needs_revision'},{stepId:'a',kind:'review',status:'succeeded'}];
  const view=researchSceneState(value);assert.equal(view.total,3);assert.equal(view.files,1);assert.equal(view.nodes[0].recentChecks,2);assert.equal(view.nodes[1].recentChecks,0);
});

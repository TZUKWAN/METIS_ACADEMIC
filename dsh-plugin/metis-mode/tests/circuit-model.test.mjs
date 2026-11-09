import test from 'node:test';
import assert from 'node:assert/strict';
import {modeCircuitModel,projectCircuitModel,reorderCircuitSteps} from '../client/circuit-model.js';

test('a template is editable configuration, never an invented project run',()=>{
  const profile={steps:[{id:'one',title:'资料',instruction:'核对材料',skills:['read'],loop:{enabled:true,criteria:'来源齐全'}}],output:{format:'docx',wordFormatting:'宋体'}};
  const model=modeCircuitModel({id:'metis-test',name:'流程'},profile,[{id:'read',name:'读取资料'}],'one',{dirty:true});
  assert.equal(model.kind,'mode');assert.equal(model.delivered,null);assert.equal(model.files,null);assert.equal(model.nodes[0].active,false);assert.equal(model.nodes[0].status,'configured');assert.equal(model.nodes[0].loop,true);assert.equal(model.nodes[0].skills[0].id,'read');assert.equal(model.nodes[0].output.format,'docx');assert.equal(model.nodes[0].artifacts.length,0);
});
test('reordering moves the complete stable step and does not mutate its bindings or prompt',()=>{
  const steps=[{id:'a',skills:['skill'],prompt:'keep',loop:{enabled:true}},{id:'b'},{id:'c'}],before=JSON.stringify(steps),moved=reorderCircuitSteps(steps,'a','c','after');
  assert.deepEqual(moved.map(step=>step.id),['b','c','a']);assert.equal(moved[2],steps[0]);assert.equal(JSON.stringify(steps),before);assert.throws(()=>reorderCircuitSteps(steps,'a','missing'));
});
test('project attachment ports use recorded artifacts and original indices',()=>{
  const project={id:'p',status:'ready',steps:[{id:'a',title:'交付',status:'submitted',loop:true,skillBindings:[{id:'s',name:'固定技能'}],delivery:{artifacts:[{path:'one.docx',name:'one.docx',availability:'file'},{path:'missing.pdf',name:'missing.pdf',availability:'missing'}]}}],activity:[],execution:{running:false}};
  const model=projectCircuitModel(project,'a');assert.equal(model.editable,false);assert.equal(model.nodes[0].artifacts[1].index,1);assert.equal(model.nodes[0].artifacts[1].availability,'missing');assert.equal(model.nodes[0].skills[0].name,'固定技能');assert.equal(model.delivered,1);
});
test('missing old-host binding metadata stays unknown rather than claiming no bindings',()=>{
  const model=projectCircuitModel({id:'old',status:'ready',steps:[{id:'a',title:'原步骤',status:'not_started'}],activity:[]});assert.equal(model.nodes[0].skills,null);assert.equal(model.nodes[0].active,false);
});

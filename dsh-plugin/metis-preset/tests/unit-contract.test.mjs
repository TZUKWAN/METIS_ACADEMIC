import test from 'node:test';
import assert from 'node:assert/strict';
import {requiresUnits,openUnit,recordUnit,unitWriteGuard,unitEvidenceProblem} from '../unit-contract.js';
const step={id:'write',instruction:'以二级小节为最小单元，逐小节写作，每节过质量门再进入下一节'};
const root='C:/research';const artifact=(sha='actual')=>({version:'artifact-evidence-v2',files:[{path:'C:/research/sections/s01_intro.md',exists:true,bytes:100,sha256:sha,kind:'.md',metrics:{text:{hanCharacters:50}}}]});
test('unit progression requires an actual declared unit and never fabricates independent review',()=>{
 const item={},rows=[],ledger={append:x=>rows.push(x),all:()=>[]};assert.equal(requiresUnits(step),true);
 assert.match(unitWriteGuard(step,item,{name:'write',arguments:{path:'sections/s01_intro.md'}},root),/unit_open/);
 openUnit(item,{unitId:'intro',artifacts:['sections/s01_intro.md']},root);assert.equal(unitWriteGuard(step,item,{name:'write',arguments:{path:'sections/s01_intro.md'}},root),null);
 assert.throws(()=>openUnit(item,{unitId:'next',artifacts:['sections/s02.md']},root),/record_unit/);
 const r=recordUnit(item,{unitId:'intro',text:'已按本节目标核对逻辑与来源，准备进入下一节'},artifact(),root,ledger,step.id);assert.equal(r.agentAssessment.independent,false);assert.equal(rows[0].semanticGoalPassed,false);assert.equal(unitEvidenceProblem(step,item,artifact(),ledger,root),null);
 assert.match(unitEvidenceProblem(step,item,artifact('changed'),ledger,root),/内容哈希/);
});
test('ordinary steps and task lists are not forced into paper-section controls',()=>{
 assert.equal(requiresUnits({instruction:'将A写入文件'}),false);assert.equal(unitWriteGuard(step,{}, {name:'todo_write',arguments:{}},root),null);
});

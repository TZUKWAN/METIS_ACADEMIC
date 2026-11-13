import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {boundedSkillExecutionResult} from '../native-skill-execution.js';
test('large actual receipts retain control state and the real full result instead of prompting a rerun',()=>{
 const root=mkdtempSync(join(tmpdir(),'metis-receipt-')),old=process.env.DSH_HOME;process.env.DSH_HOME=root;
 try{
  for(const status of ['passed','needs_revision','blocked','submitted']){
   const value={status,stepId:'actual',iteration:3,noNewEvidence:true,next:'按真实下一步继续',review:{verdict:{passed:status==='passed',purposeSatisfied:true,checks:[{criterion:'实际核验',passed:status==='passed',evidenceRefs:'F1'}],feedback:['真实反馈']},evidenceIndex:[{id:'F1'}]},big:'x'.repeat(22000)};
   const small=boundedSkillExecutionResult(value);assert.equal(small.status,status);assert.equal(small.stepId,'actual');assert.equal(small.noNewEvidence,true);assert.equal(small.next,value.next);assert.equal(small.review.verdict.passed,value.review.verdict.passed);assert.deepEqual(JSON.parse(readFileSync(small.resultFile,'utf8')),value);
  }
 }finally{if(old===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=old;rmSync(root,{recursive:true,force:true});}
});

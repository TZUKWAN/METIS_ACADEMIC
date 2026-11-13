import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const isolated=mkdtempSync(join(tmpdir(),'metis-portable-core-'));
process.env.METIS_DATA_HOME=isolated;
const {MetisCore,artifact}=await import('../runtime/core.mjs');
const core=new MetisCore(),folder=join(isolated,'papers');mkdirSync(folder);
const step=(id,title)=>({id,title,instruction:'Produce an actual text file',skills:[],stages:[],prompt:'Write a factual summary',deliverables:'text document'});

test('empty installation has no fixed modes; explicit flexible workflow saves atomically',async()=>{
  assert.equal(core.snapshot().modes.length,0);
  const read=core.configRead();await core.configEdit({readToken:read.readToken,operations:[{type:'create_mode',mode:{id:'metis-flex',name:'Flexible'},profile:{steps:[step('first','Read'),step('last','Write')],skills:[],parameters:{language:'zh-CN'}}}]});
  const saved=await core.save({expectedRevision:core.draft().revision});assert.equal(saved.saved,true);assert.equal(core.snapshot().modes.length,1);
  assert.ok(existsSync(join(isolated,'metis-composer-configuration.json')));
});
test('AI stale edits preserve manually changed fields and merge unrelated changes',async()=>{
  const before=core.configRead({kind:'mode',modeId:'metis-flex'}),configuration=structuredClone(core.draft().configuration);configuration.profiles['metis-flex'].profile.steps[0].title='Human title';
  await core.configEdit({actor:'manual',configuration,expectedRevision:core.draft().revision});
  const result=await core.configEdit({readToken:before.readToken,operations:[{type:'update_step',modeId:'metis-flex',stepId:'first',patch:{title:'AI title',deliverables:'Updated deliverable'}}]});
  const first=core.draft().configuration.profiles['metis-flex'].profile.steps[0];assert.equal(first.title,'Human title');assert.equal(first.deliverables,'Updated deliverable');assert.ok(result.conflicts.length);
  await assert.rejects(()=>core.configEdit({actor:'manual',configuration,expectedRevision:0}),/草稿已更新/);
  await core.save({expectedRevision:core.draft().revision});
});
let p1,p2;
test('one folder can contain multiple projects with independent frozen snapshots',async()=>{
  p1=await core.createProject({name:'Project one',folder,modeId:'metis-flex',autonomous:true});p2=await core.createProject({name:'Project two',folder,modeId:'metis-flex'});
  assert.notEqual(p1.id,p2.id);assert.equal(core.listProjects().length,2);
  const read=core.configRead();await core.configEdit({readToken:read.readToken,operations:[{type:'update_step',modeId:'metis-flex',stepId:'first',patch:{prompt:'New prompt'}}]});await core.save({expectedRevision:core.draft().revision});
  const restarted=new MetisCore();assert.equal(restarted.project(p1.id).snapshot.profile.steps[0].prompt,'Write a factual summary');assert.equal((await restarted.syncMode({projectId:p1.id})).changed,true);
});
test('real file evidence advances directly with no spurious per-step confirmation',async()=>{
  const one=await core.openStep({projectId:p1.id});assert.equal(one.stepId,'first');writeFileSync(join(folder,'first.txt'),'Actual first artifact');
  const result=await core.submit({projectId:p1.id,artifacts:['first.txt']});assert.equal(result.nextStepId,'last');assert.equal(result.awaitingDownstream,false);
  assert.equal((await core.openStep({projectId:p1.id})).stepId,'last');writeFileSync(join(folder,'last.md'),'# Actual last artifact');assert.equal((await core.submit({projectId:p1.id,artifacts:['last.md']})).completed,true);
});
test('revision and downstream decision are separate from normal autonomous progress',async()=>{
  await core.viewStep({projectId:p1.id,stepId:'first'});await core.revise({projectId:p1.id,feedback:'Improve first artifact'});await core.openStep({projectId:p1.id});writeFileSync(join(folder,'first.txt'),'Revised first artifact');
  assert.equal((await core.submit({projectId:p1.id,artifacts:['first.txt']})).awaitingDownstream,true);await assert.rejects(()=>core.openStep({projectId:p1.id,stepId:'last'}),/选择/);
  await core.downstream({projectId:p1.id,choice:'redo'});assert.equal(core.project(p1.id).steps[1].status,'not_started');assert.equal(core.project(p1.id).steps[1].history.length,1);
});
test('delete project preserves folder, artifacts and other project',async()=>{
  assert.equal((await core.deleteProject({projectId:p2.id})).filesDeleted,false);assert.equal(readFileSync(join(folder,'first.txt'),'utf8'),'Revised first artifact');assert.equal(core.listProjects().length,1);
});
test('artifact evidence rejects path traversal, empty files and false Office extensions',()=>{
  writeFileSync(join(folder,'false.docx'),'not a word file');writeFileSync(join(folder,'empty.txt'),'');
  assert.throws(()=>artifact(folder,'../metis-composer-configuration.json'),/位于/);assert.throws(()=>artifact(folder,'false.docx'),/ZIP/);assert.throws(()=>artifact(folder,'empty.txt'),/非空/);
});
test('live console carries actual output under the original parent step without resetting final status',async()=>{
  const callId='console-proof';await core.activity({projectId:p1.id,callId,kind:'command',label:'Read actual file',status:'running',stepId:'first'});
  await core.activity({projectId:p1.id,callId,kind:'command',status:null,output:'METIS console output\n'});await core.activity({projectId:p1.id,callId,kind:'command',status:'completed',output:'METIS console output\n'});
  const p=core.project(p1.id);assert.equal(p.activity.at(-1).status,'completed');assert.equal(p.activity.at(-1).stepId,'first');assert.equal(p.live.entries.at(-1).text,'METIS console output\n');assert.equal(p.live.entries.length,1);
});
test('goal loop never passes from agent assertion or unverified review',async()=>{
  const read=core.configRead();await core.configEdit({readToken:read.readToken,operations:[{type:'update_step',modeId:'metis-flex',stepId:'first',patch:{loop:{enabled:true,criteria:'File clearly describes the evidence'}}}]});await core.save({expectedRevision:core.draft().revision});
  const p=await core.createProject({name:'Loop',folder,modeId:'metis-flex'});await core.openStep({projectId:p.id});await assert.rejects(()=>core.submit({projectId:p.id,artifacts:['first.txt'],review:{passed:true}}),/独立核验/);await assert.rejects(()=>core.recordReview({projectId:p.id,stepId:'first',artifacts:['first.txt'],result:{passed:true}}),/实际独立/);
});

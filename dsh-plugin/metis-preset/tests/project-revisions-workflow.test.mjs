import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {randomUUID,createHash} from 'node:crypto';
import {createProjectRevisionStore} from '../project-revisions.js';
test('actual delivery bytes from prior workflow versions remain readable without accepting unrelated sessions',()=>{
 const root=mkdtempSync(join(tmpdir(),'metis-mode-history-')),oldHome=process.env.DSH_HOME;process.env.DSH_HOME=root;
 try{
  const history=createProjectRevisionStore(),id='mp-'+randomUUID(),original={id,sessionId:'original',versionId:'v1'},current={id,sessionId:'current',versionId:'v2'},file=join(root,'actual.md'),bytes=Buffer.from('ACTUAL_ORIGINAL_BYTES');
  writeFileSync(file,bytes);const revision=history.archive(original,{requestId:randomUUID(),stepId:'a',downstream:'mode-update',feedback:'实际模式更新前留存'},[{id:'a',title:'步骤A',item:{status:'submitted',delivery:{at:'2026-11-12',text:'真实交付',artifacts:[{path:file,sha256:createHash('sha256').update(bytes).digest('hex')}]}}}]);
  writeFileSync(file,'ACTUAL_LATER_BYTES');assert.equal(history.list([current,original],'a').total,1);assert.deepEqual(history.artifact([current,original],revision.id,'a',0).bytes,bytes);
  assert.throws(()=>history.artifact(current,revision.id,'a',0),/不一致/);assert.throws(()=>history.list([current,{...original,id:'mp-'+randomUUID()}],'a'),/不一致/);
 }finally{if(oldHome===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=oldHome;rmSync(root,{recursive:true,force:true});}
});

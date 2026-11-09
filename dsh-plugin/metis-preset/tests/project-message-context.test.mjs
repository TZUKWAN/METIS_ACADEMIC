import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,realpathSync,rmSync} from 'node:fs';
import {dirname,basename,join} from 'node:path';
import {tmpdir} from 'node:os';
import {randomUUID} from 'node:crypto';
import {recordMessageStep,readMessageStep} from '../project-message-context.js';

test('a queued native request keeps its original owner, session, version and selected step',()=>{
  const parent=realpathSync(tmpdir());
  const root=mkdtempSync(join(parent,'metis-message-check-'));
  const previous=process.env.DSH_HOME;
  process.env.DSH_HOME=root;
  try{
    const project={id:'mp-'+randomUUID(),versionId:'fixed-test-1',sessionId:'session-'+randomUUID()};
    const agent={session:{id:project.sessionId}},first=randomUUID(),second=randomUUID();
    const message=(rpcId,principal)=>({source:{kind:'user',rpcId,principal}});
    recordMessageStep(project,first,'analysis');recordMessageStep(project,second,'conclusion');
    assert.equal(readMessageStep(agent,message(first),project.versionId).stepId,'analysis');
    assert.equal(readMessageStep(agent,message(second,{kind:'owner'}),project.versionId).stepId,'conclusion');
    assert.doesNotThrow(()=>recordMessageStep(project,first,'analysis'));
    assert.throws(()=>recordMessageStep(project,first,'conclusion'),error=>error.status===409);
    assert.throws(()=>readMessageStep(agent,message(first),'another-version'),error=>error.status===409);
    assert.equal(readMessageStep(agent,message(first,{kind:'remote'}),project.versionId),null);
    assert.equal(readMessageStep(agent,{source:{kind:'notice',rpcId:first}},project.versionId),null);
    assert.equal(readMessageStep({session:{id:'another-session'}},message(first),project.versionId),null);
    assert.equal(readMessageStep(agent,message(randomUUID()),project.versionId),null);
    assert.throws(()=>recordMessageStep(project,[first],'analysis'),error=>error.status===400);
    assert.throws(()=>recordMessageStep(project,'../../unrelated','analysis'),error=>error.status===400);
  }finally{
    if(previous===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=previous;
    const path=realpathSync(root);
    assert.equal(dirname(path),parent);assert.ok(basename(path).startsWith('metis-message-check-'));
    rmSync(path,{recursive:true});
  }
});

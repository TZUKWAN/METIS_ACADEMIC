import test from 'node:test';
import assert from 'node:assert/strict';
import {ResearchLiveBuffer} from '../research-live.js';
test('public text streams once and private reasoning is never retained',()=>{
  const b=new ResearchLiveBuffer('session','scope'),base={attemptId:'session:1'};
  b.assistant({...base,type:'start'},'step','session');
  b.assistant({...base,type:'chunk',chunk:{type:'reasoning-delta',text:'PRIVATE_COT_SENTINEL'}},'step','session');
  assert.equal(b.snapshot().active.state,'thinking');assert.ok(!JSON.stringify(b.snapshot()).includes('PRIVATE_COT_SENTINEL'));
  b.assistant({...base,type:'chunk',chunk:{type:'text-delta',index:0,text:'公开执行摘要'}},'step','session');
  b.assistant({...base,type:'chunk',chunk:{type:'block-end',index:0,block:{type:'text',text:'公开执行摘要'}}},'step','session');
  assert.equal(b.snapshot().entries.filter(item=>item.source==='assistant').length,1);
  b.assistant({...base,type:'end'},'step','session');assert.equal(b.snapshot().active,null);
});
test('native output keeps real sources, strips terminal controls and remains bounded',()=>{
  const b=new ResearchLiveBuffer('session','scope');for(let i=0;i<300;i++)b.append('\u001b[31mline-'+i+'\u001b[0m\n',{source:'stdout',callId:'actual'});
  const a=b.snapshot();assert.equal(a.entries.length,256);assert.ok(a.dropped>0);assert.ok(!a.entries[0].text.includes('\u001b'));assert.equal(a.entries.at(-1).text,'line-299\n');assert.equal(a.entries.at(-1).callId,'actual');assert.equal(a.lastSeq,300);
  a.entries[0].text='changed snapshot';assert.notEqual(b.snapshot().entries[0].text,'changed snapshot');
});
test('simultaneous session buffers do not leak output across identities',()=>{
  const a=new ResearchLiveBuffer('a','scope'),b=new ResearchLiveBuffer('b','scope');a.append('ALPHA',{source:'stdout'});b.append('BETA',{source:'stdout'});
  assert.ok(!JSON.stringify(a.snapshot()).includes('BETA'));assert.notEqual(a.snapshot().instanceId,b.snapshot().instanceId);
});


import test from 'node:test';
import assert from 'node:assert/strict';
import {researchArrival,researchLiveSummary,researchCardDetail,researchFocusDistance,ResearchTicker} from '../client/research-motion.js';
import {buildResearchNetwork} from '../client/research-network.js';
test('arrival follows its impact vector, rebounds, and settles exactly',()=>{
  const samples=Array.from({length:26},(_,i)=>researchArrival(i*40,{x:1,y:0}));
  assert.ok(samples.some(value=>value.x>0));assert.ok(samples.some(value=>value.x<0));assert.ok(samples.every(value=>value.y===0&&value.opacity>=0&&value.opacity<=1));
  assert.deepEqual(researchArrival(1000,{x:1,y:0}),{x:0,y:0,opacity:1,scale:1,pulse:0,progress:1,moving:false});
  const down=researchArrival(250,{x:0,y:-1});assert.equal(down.x,0);assert.ok(down.y<0);
});
test('reduced motion removes the impact, travel and bounce',()=>{
  const value=researchArrival(100,{x:1,y:0},true);assert.equal(value.moving,false);assert.equal(value.pulse,0);assert.equal(value.opacity,1);assert.equal(value.x,0);
});
test('card targets stay readable while the original record remains intact',()=>{
  const node={detail:'D:\\项目资料\\词元经济论文.pdf',call:{kind:'read'}};assert.equal(researchCardDetail(node),'词元经济论文.pdf');assert.equal(node.detail,'D:\\项目资料\\词元经济论文.pdf');
  assert.equal(researchCardDetail({detail:'D:/a.md',call:{kind:'read',error:'文件不存在'}}),'文件不存在');
  assert.equal(researchCardDetail({detail:'核验',call:{kind:'review',feedback:['需要补充真实依据']}}),'需要补充真实依据');
});
test('live glass text uses actual public execution fields and disappears when finished',()=>{
  const model={name:'项目',phase:'running',currentStepId:'s',nodes:[{id:'s',index:0,title:'读取材料',status:'working',artifacts:[]}],activities:[{callId:'one',stepId:'s',tool:'read',label:'读取资料',target:'paper.pdf',status:'running',thinking:'not a public status'}]};
  let graph=buildResearchNetwork(model),summary=researchLiveSummary(graph,model);assert.equal(summary.nodeId,'call:one');assert.ok(summary.lines.includes('paper.pdf'));assert.ok(!JSON.stringify(summary).includes('not a public status'));
  model.phase='ready';model.activities[0].status='succeeded';graph=buildResearchNetwork(model);assert.equal(researchLiveSummary(graph,model),null);
  model.phase='processing';graph=buildResearchNetwork(model);assert.equal(researchLiveSummary(graph,model).title,'研究助手执行中');
  model.nodes[0].status='submitted';graph=buildResearchNetwork(model);assert.equal(researchLiveSummary(graph,model),null);
});
test('failed, refused and stale jobs never display a running text window',()=>{
  for(const status of ['failed','refused','cancelled','interrupted','unverified']){
    const model={name:'项目',phase:'attention',nodes:[{id:'s',index:0,status:'working',artifacts:[]}],activities:[{callId:'one',stepId:'s',tool:'read',status,invoked:status!=='refused'}]};
    assert.equal(researchLiveSummary(buildResearchNetwork(model),model),null);
  }
});
test('active framing is close and independent of record count, with narrow-screen clearance',()=>{
  const distance=researchFocusDistance(1500,1000);assert.ok(distance>=16&&distance<20);
  assert.ok(researchFocusDistance(500,1100)>distance);
});
test('live tape scrolls only incoming real text and never loops unchanged content',()=>{
  const tape=new ResearchTicker(),scope={key:'one',matches:()=>true},live={instanceId:'a',lastSeq:1,entries:[{seq:1,source:'stdout',text:'真实行一\n真实行二\n真实行三\n'}]};
  tape.ingest(live,scope);const count=tape.lines.length;tape.ingest(live,scope);assert.equal(tape.lines.length,count);
  for(let i=0;i<10;i++)tape.frame(100+i*30);const stopped=tape.frame(900);assert.equal(stopped.moving,false);assert.equal(stopped.position,tape.lines.length);
  tape.append('PRIVATE','reasoning');assert.ok(!JSON.stringify(tape.lines).includes('PRIVATE'));
});
test('public deltas join without manufacturing rows, while reduced motion shows the tail instantly',()=>{
  const tape=new ResearchTicker();tape.append('公开','assistant');tape.append('摘要\n','assistant');assert.equal(tape.lines[0].text,'公开摘要');
  for(let i=0;i<20;i++)tape.append('真实输出'+i+'\n','stdout');const frame=tape.frame(1,true);assert.equal(frame.moving,false);assert.equal(frame.position,tape.lines.length);
});


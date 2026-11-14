import test from 'node:test';
import assert from 'node:assert/strict';
import {buildResearchNetwork,networkEntitySize} from '../client/research-network.js';
const fixture=()=>({id:'p',name:'研究',phase:'ready',currentStepId:'s0',nodes:Array.from({length:6},(_,index)=>({id:'s'+index,index,title:'阶段'+index,purpose:'真实配置目标',expected:'真实交付要求',status:'not_started',label:'未开始',skills:[{id:'read',name:'读取技能'}],executionBrief:{characters:500,excerpt:'固定提示词摘要'},artifacts:[]})),activities:[]});
test('configuration stays in stage cards, not invented activity satellites',()=>{
  const graph=buildResearchNetwork(fixture());assert.equal(graph.nodes.length,7);assert.equal(graph.counts.calls,0);assert.equal(graph.counts.stages,6);assert.equal(graph.counts.bindings,6);
  assert.ok(graph.nodes.every(node=>!node.active));assert.equal(graph.byId.get('step:s0').ports[0].title,'读取技能');
});
test('large histories stay in a bounded 3D family with paged children rather than a flat global ten-column board',()=>{
  const model=fixture();model.activities=Array.from({length:130},(_,index)=>({callId:'a'+index,stepId:'s0',tool:'read',label:'读取资料',kind:'read',status:'succeeded',target:'资料'+index}));
  const overview=buildResearchNetwork(model),graph=buildResearchNetwork(model,{expandedStepId:'s0'});
  assert.equal(graph.counts.calls,130);assert.equal(graph.counts.stages,6);assert.ok(graph.presentation.pages>1);
  const children=graph.nodes.filter(node=>node.origin==='activity');assert.ok(children.length>0&&children.length<130);
  for(const node of overview.nodes.filter(node=>node.kind==='step'))assert.deepEqual(graph.positions.get(node.id),overview.positions.get(node.id));
  for(const node of graph.nodes){const size=networkEntitySize(node),p=graph.positions.get(node.id);assert.ok(size.w>0&&size.h>0);assert.ok(['x','y','z','yaw'].every(key=>Number.isFinite(p[key])));}
  for(const node of children)assert.equal(graph.positions.get(node.id).stationId,'s0');
});
test('status and files preserve positions; new actions preserve the trunk and recenter only their own row',()=>{
  const model=fixture();model.activities=[{callId:'one',stepId:'s0',tool:'read',kind:'read',status:'running'}];const a=buildResearchNetwork(model);
  model.activities[0]={...model.activities[0],status:'succeeded',resultPreview:'真实读取回执'};model.nodes[0].artifacts=[{index:0,name:'真实文件.md',path:'D:/真实文件.md',availability:'file'}];
  const statusOnly=buildResearchNetwork(model,{expandedStepId:'s0'});for(const [id,position]of a.positions)for(const key of ['x','y','z','yaw','row','column','level','stationId','layer'])assert.equal(statusOnly.positions.get(id)[key],position[key],id+' unchanged by status/file '+key);
  model.activities.push({callId:'two',stepId:'s0',tool:'pwsh',kind:'command',status:'running'});
  const b=buildResearchNetwork(model);for(const [id,position]of a.positions){const next=b.positions.get(id);if(a.byId.get(id).origin!=='activity')for(const key of ['x','y','z','yaw','stationId','layer'])assert.equal(next[key],position[key],id+' '+key);else{assert.equal(next.stationId,position.stationId);assert.equal(b.byId.get(id).childIndex,a.byId.get(id).childIndex);assert.equal(b.byId.get(id).stepId,a.byId.get(id).stepId);}}assert.ok(b.byId.has('call:two'));assert.equal(b.counts.calls,2);
  const parent=b.positions.get('step:s0'),one=b.positions.get('call:one'),two=b.positions.get('call:two');assert.ok(one.x<two.x);assert.ok(Math.abs((one.x+two.x)/2-parent.x)<1e-8);assert.ok(one.y<parent.y&&two.y<parent.y);
  assert.equal(b.byId.get('call:one').active,false);assert.equal(b.byId.get('call:two').active,true);
});
test('one tool call is one visible card; ownership and receipts remain inspectable',()=>{
  const model=fixture();model.activities=[{callId:'root',rootCallId:'root',stepId:'s1',tool:'metis_library',kind:'skill',label:'调用技能',status:'running'},{callId:'child',rootCallId:'root',stepId:'s1',tool:'read',kind:'read',label:'读取资料',target:'D:/真实资料.md',status:'failed',error:'文件不存在',invoked:false}];
  const graph=buildResearchNetwork(model);assert.equal(graph.counts.calls,2);assert.equal(graph.nodes.length,9);assert.ok(graph.edges.some(edge=>edge.source==='call:root'&&edge.target==='call:child'));assert.equal(graph.byId.get('call:child').call.error,'文件不存在');assert.equal(graph.byId.get('call:child').detail,'D:/真实资料.md');assert.equal(graph.byId.get('call:child').active,false);
  const branches=graph.circuitEdges.filter(edge=>edge.kind==='child-action');assert.equal(branches.length,2);assert.ok(branches.every(edge=>edge.source==='step:s1'));assert.equal(graph.circuitEdges.filter(edge=>edge.kind==='sequence').length,model.nodes.length);
});
test('unbound events stay project-level and do not inherit a guessed stage',()=>{
  const model=fixture();model.activities=[{callId:'a',stepId:'missing',tool:'read',kind:'read',status:'succeeded',target:'x'}];
  const graph=buildResearchNetwork(model);assert.equal(graph.byId.get('call:a').stepId,null);assert.ok(graph.edges.some(edge=>edge.source==='engine'&&edge.target==='call:a'));
});
test('real attachments keep original indices as ports, without expanding the matrix',()=>{
  const model=fixture();model.nodes[3].artifacts=[{index:7,name:'原文件.docx',path:'D:/原文件.docx',availability:'missing'}];const graph=buildResearchNetwork(model),file=graph.byId.get('artifact:s3:7');
  assert.equal(file.fileIndex,7);assert.equal(file.availability,'missing');assert.equal(file.origin,'delivery');assert.equal(graph.counts.artifacts,1);assert.equal(graph.nodes.length,7);assert.equal(graph.byId.get('step:s3').ports[1].id,file.id);
});
test('execution-only metadata still preserves the workflow and real attachment access',()=>{
  const model=fixture(),graph=buildResearchNetwork(model,{scope:'execution'});assert.equal(graph.counts.stages,6);assert.equal(graph.nodes.length,7);assert.equal(graph.counts.bindings,0);
});
test('duplicate call IDs never manufacture additional action cards',()=>{
  const model=fixture();const call={callId:'one',stepId:'s0',tool:'read',status:'succeeded'};model.activities=[call,call];
  const graph=buildResearchNetwork(model,{expandedStepId:'s0'});assert.equal(graph.counts.calls,1);assert.equal(graph.nodes.filter(node=>node.origin==='activity').length,1);assert.equal(graph.nodes.filter(node=>node.id==='call:one').length,1);
});
test('file ports only attach to the real successful submission interval',()=>{
  const model=fixture();model.nodes[0].delivery={at:'2026-11-11T10:00:01.000Z',text:'真实交付'};model.nodes[0].artifacts=[{index:0,name:'论文.md',path:'D:/论文.md',availability:'file'}];
  model.activities=[{callId:'submit',stepId:'s0',tool:'metis_step',kind:'delivery',status:'succeeded',startedAt:'2026-11-11T10:00:00.000Z',finishedAt:'2026-11-11T10:00:02.000Z'},{callId:'failed',stepId:'s0',tool:'metis_step',kind:'delivery',status:'failed',startedAt:'2026-11-11T10:00:03.000Z',finishedAt:'2026-11-11T10:00:04.000Z'}];
  const graph=buildResearchNetwork(model);assert.equal(graph.byId.get('call:submit').ports[0].id,'artifact:s0:0');assert.equal(graph.byId.get('call:failed').ports.length,0);
});

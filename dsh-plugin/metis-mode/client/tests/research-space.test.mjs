/** Controlled layout fixtures validate geometry; actual DSH runs are separate. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {RESEARCH_SPACE,spatialRoute} from '../research-space.js';
import {buildResearchNetwork} from '../research-network.js';
const fixtures=(calls=18)=>({
 name:'controlled layout fixture',phase:'completed',currentStepId:'s0',
 nodes:Array.from({length:8},(_,index)=>({id:'s'+index,index,title:'stage '+index,label:'已交付',status:'submitted',skills:[],artifacts:[],delivery:null})),
 activities:Array.from({length:calls},(_,index)=>({callId:'actual-shape-'+index,stepId:'s0',label:'fixture operation',tool:'read',kind:'read',status:'succeeded'}))
});
test('overview shows ordered solid stages with shallow real depth instead of every history card',()=>{
 const graph=buildResearchNetwork(fixtures());assert.equal(graph.nodes.length,9);assert.equal(graph.stations.length,8);assert.equal(graph.layout.columns,4);assert.equal(graph.layout.rows,2);
 assert.equal(graph.nodes.filter(node=>node.origin==='activity').length,0);assert.equal(graph.counts.calls,18);assert.equal(graph.fullNodes.filter(node=>node.origin==='activity').length,18);
 assert.ok(graph.bounds.maxZ-graph.bounds.minZ>4);assert.ok(graph.bounds.maxY-graph.bounds.minY<25);assert.equal(graph.layout.version,RESEARCH_SPACE.version);
});
test('a thousand operations in one stage cannot grow its height or pull the overview camera away',()=>{
 const before=buildResearchNetwork(fixtures(0)),after=buildResearchNetwork(fixtures(1000));assert.deepEqual(after.bounds,before.bounds);
 for(const node of before.nodes)assert.deepEqual(after.positions.get(node.id),before.positions.get(node.id));assert.equal(after.counts.calls,1000);
});
test('stage pages disclose at most six real operations and reach every record without loss',()=>{
 const model=fixtures(19),found=new Set();const initial=buildResearchNetwork(model,{expandedStepId:'s0'});assert.equal(initial.presentation.pages,4);
 for(let page=0;page<initial.presentation.pages;page++){
  const graph=buildResearchNetwork(model,{expandedStepId:'s0',recordPage:page}),calls=graph.nodes.filter(node=>node.origin==='activity');assert.ok(calls.length<=6&&calls.length>0);
  for(const call of calls){assert.equal(call.stepId,'s0');assert.ok(graph.byId.has(call.id));found.add(call.callId);}
  assert.equal(graph.counts.calls,19);assert.equal(graph.byId.size,28);
 }
 assert.deepEqual(found,new Set(model.activities.map(call=>call.callId)));
 assert.equal(buildResearchNetwork(model,{expandedStepId:'s0',recordPage:999}).presentation.page,3);
});
test('live operations are disclosed, while overview and manual stage selection stay in control',()=>{
 const model=fixtures();model.activities.at(-1).status='running';model.phase='running';
 const live=buildResearchNetwork(model);assert.equal(live.presentation.stageId,'s0');assert.ok(live.nodes.some(node=>node.id===live.activeId));
 assert.equal(buildResearchNetwork(model,{overview:true}).nodes.filter(node=>node.origin==='activity').length,0);
 const manual=buildResearchNetwork(model,{expandedStepId:'s1'});assert.equal(manual.presentation.stageId,'s1');assert.equal(manual.nodes.filter(node=>node.origin==='activity').length,0);
});
test('disclosed nodes stay within XYZ bounds and routes retain their real endpoint depth',()=>{
 const graph=buildResearchNetwork(fixtures(),{expandedStepId:'s0'});
 for(const point of graph.positions.values()){assert.ok(point.x>=graph.bounds.minX&&point.x<=graph.bounds.maxX);assert.ok(point.y>=graph.bounds.minY&&point.y<=graph.bounds.maxY);assert.ok(point.z>=graph.bounds.minZ&&point.z<=graph.bounds.maxZ);}
 for(const edge of graph.circuitEdges){const a=graph.positions.get(edge.source),b=graph.positions.get(edge.target),route=spatialRoute(a,b,edge.kind);assert.equal(route[0].z,edge.kind==='activity-order'?a.z+.08:a.z);assert.equal(route.at(-1).z,edge.kind==='activity-order'?b.z+.08:b.z);}
});
test('registered files remain on stage ports and in full records without adding duplicate floating cards',()=>{
 const model=fixtures(0);model.nodes[0].artifacts=[{index:0,name:'actual.md',path:'actual.md',availability:'file'}];
 const graph=buildResearchNetwork(model);assert.equal(graph.nodes.filter(node=>node.kind==='artifact').length,0);assert.equal(graph.byId.get('artifact:s0:0').file.path,'actual.md');assert.equal(graph.byId.get('step:s0').ports[0].id,'artifact:s0:0');assert.equal(graph.counts.artifacts,1);assert.equal(graph.counts.calls,0);
});
test('unassigned real project operations remain reachable from the overview control card',()=>{
 const model=fixtures(9);for(const call of model.activities)call.stepId=null;
 const first=buildResearchNetwork(model,{expandedStepId:'__project__'}),last=buildResearchNetwork(model,{expandedStepId:'__project__',recordPage:1});
 assert.equal(first.presentation.expanded,true);assert.equal(first.presentation.stageId,null);assert.equal(first.nodes.filter(node=>node.origin==='activity').length,6);assert.equal(last.nodes.filter(node=>node.origin==='activity').length,3);
 assert.equal(new Set([...first.nodes,...last.nodes].filter(node=>node.origin==='activity').map(node=>node.id)).size,9);
});

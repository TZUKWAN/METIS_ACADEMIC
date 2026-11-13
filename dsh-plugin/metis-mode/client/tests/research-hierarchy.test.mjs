/** Controlled ownership fixtures. Real native switching is verified separately. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {buildResearchNetwork,researchCallOwners} from '../research-network.js';
import {spatialNodeSize} from '../research-space.js';
const fixture=()=>({name:'hierarchy fixture',phase:'completed',currentStepId:'s1',nodes:Array.from({length:8},(_,index)=>({id:'s'+index,index,title:'大步骤 '+(index+1),status:'submitted',label:'已交付',skills:[],artifacts:[]})),activities:[]});
test('explicit stage ownership wins and missing ownership inherits only a recorded root call',()=>{
 const rows=[{callId:'a',stepId:'s0'},{callId:'b',stepId:'s1',rootCallId:'a'},{callId:'c',rootCallId:'a'},{callId:'d',rootCallId:'c'}],owners=researchCallOwners(rows,['s0','s1']);
 assert.equal(owners.get('b').stepId,'s1');assert.deepEqual(owners.get('c'),{stepId:'s0',source:'root-call'});assert.equal(owners.get('d').stepId,'s0');
});
test('unresolved, deleted and cyclic call records never borrow the current workflow pointer',()=>{
 const model=fixture();model.activities=[{callId:'unknown',rootCallId:'missing'},{callId:'deleted',stepId:'removed',rootCallId:'valid'},{callId:'valid',stepId:'s0'},{callId:'x',rootCallId:'y'},{callId:'y',rootCallId:'x'}];
 const graph=buildResearchNetwork(model);for(const id of ['unknown','deleted','x','y'])assert.equal(graph.byId.get('call:'+id).stepId,null);assert.equal(graph.byId.get('call:deleted').ownerSource,'unknown-step');
});
test('interleaved actions retain a stable local ordinal and parent name without rewriting raw records',()=>{
 const model=fixture();model.activities=[{callId:'a',stepId:'s0',status:'succeeded'},{callId:'b',stepId:'s1',status:'succeeded'},{callId:'c',rootCallId:'a',status:'running'}];const before=structuredClone(model),graph=buildResearchNetwork(model);
 assert.deepEqual(model,before);assert.equal(graph.byId.get('call:a').childIndex,0);assert.equal(graph.byId.get('call:b').childIndex,0);assert.equal(graph.byId.get('call:c').childIndex,1);assert.equal(graph.byId.get('call:c').ownerTitle,'大步骤 1');assert.equal(graph.byId.get('step:s0').active,true);assert.equal(graph.presentation.stageId,'s0');
});
test('expanding another stage cannot displace the trunk; children grow below and in front of their own parent',()=>{
 const model=fixture();for(let i=0;i<20;i++)model.activities.push({callId:'r'+i,stepId:i%2?'s0':'s1',status:'succeeded'});
 const overview=buildResearchNetwork(model),first=buildResearchNetwork(model,{expandedStepId:'s0'}),second=buildResearchNetwork(model,{expandedStepId:'s1',recordPage:1});
 for(const node of overview.nodes.filter(node=>node.kind==='step')){assert.deepEqual(first.positions.get(node.id),overview.positions.get(node.id));assert.deepEqual(second.positions.get(node.id),overview.positions.get(node.id));}
 for(const graph of [first,second])for(const node of graph.nodes.filter(node=>node.origin==='activity')){const p=graph.positions.get(node.id),parent=graph.byId.get('step:'+node.stepId),root=graph.positions.get(parent.id);assert.ok(p.y+spatialNodeSize(node).h/2<root.y-spatialNodeSize(parent).h/2);assert.ok(p.z>root.z+5);assert.equal(p.stationId,node.stepId);}
});
test('visible child branches point to their actual parent, while the compiled main sequence is preserved',()=>{
 const model=fixture();model.activities=[{callId:'a',stepId:'s0',status:'succeeded'},{callId:'b',stepId:'s0',status:'succeeded'}];const graph=buildResearchNetwork(model,{expandedStepId:'s0'}),branches=graph.circuitEdges.filter(edge=>edge.kind==='child-action');
 assert.equal(branches.length,2);assert.ok(branches.every(edge=>edge.source==='step:s0'));assert.equal(graph.circuitEdges.filter(edge=>edge.kind==='sequence').length,8);assert.equal(graph.byId.get('step:s0').childIds.length,2);
});

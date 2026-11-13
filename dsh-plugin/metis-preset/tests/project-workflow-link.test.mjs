import test from 'node:test';
import assert from 'node:assert/strict';
import {registerProjectWorkflowProvider,inheritedProjectOwners,projectWorkflowContext} from '../project-workflow-link.js';
test('project history is supplied only by the active owned bridge and is released safely',async()=>{
 const dispose=registerProjectWorkflowProvider({inheritedOwners:id=>id==='actual'?[{index:-1,text:'实际已捕获指令'}]:[],read:async id=>({available:id==='actual'})});
 assert.equal(inheritedProjectOwners('actual')[0].index,-1);assert.deepEqual(await projectWorkflowContext('actual'),{available:true});assert.deepEqual(inheritedProjectOwners('other'),[]);dispose();assert.deepEqual(await projectWorkflowContext('actual'),{available:false});
});

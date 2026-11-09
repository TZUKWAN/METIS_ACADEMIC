import test from 'node:test';
import assert from 'node:assert/strict';
import {adaptFrozenNativePlugins,nativeStandardPlugins} from '../native-preset-runtime.js';

const root='@deepseek-ai/dsh-tool-subagent-control',leaf=root+'/list-agents';
test('old frozen tool declarations adapt a merged native module without changing the frozen profile',()=>{
  const frozen=[{id:'scope',name:'cordis:group',group:true,isolate:{workflowEngine:true},config:[{id:'control',name:root},{id:'list',name:leaf},{id:'steps',name:'metis-academic-preset/step-skills',config:{profile:{steps:[{id:'original',prompt:'keep original',skills:['original-skill']}]}}}]}];
  const original=JSON.stringify(frozen),result=adaptFrozenNativePlugins(frozen,[{id:'control',name:root}]);
  assert.equal(JSON.stringify(frozen),original);assert.equal(result.adaptations.length,1);assert.equal(result.adaptations[0].tool,'list_agents');
  assert.deepEqual(result.plugins[0].config[1].config.profile,frozen[0].config[2].config.profile);assert.equal(result.plugins[0].config[0].name,root);
});
test('Hosts with the separate native module keep that module and native expressions remain intact',()=>{
  const plugins=[{id:'control',name:root},{id:'list',name:leaf}],registry={definitions:new Map([['standard',{config:{plugins:[{id:'pwsh',disabled:{__jsExpr:"process.platform !== 'win32'"}}]}}]])};
  assert.deepEqual(adaptFrozenNativePlugins(plugins,plugins).plugins,plugins);
  assert.deepEqual(nativeStandardPlugins(registry)[0].disabled,{__jsExpr:"process.platform !== 'win32'"});
});
test('unknown incompatible declarations are rejected instead of silently deleting tool capabilities',()=>{
  assert.throws(()=>adaptFrozenNativePlugins([{name:leaf}],[{name:root}]),/缺少/);
});
test('frozen declarations capture actual native gates without persisting dynamic expressions',()=>{
  const config={plugins:[{id:'bash',name:'native-bash',disabled:{__jsExpr:'host-dependent'}}]};
  const registry={definitions:new Map([['standard',{config,generation:{mount:{tree:{entries:()=>[{options:{id:'bash',name:'native-bash'},disabled:true}]}}}}]])};
  assert.equal(nativeStandardPlugins(registry,{frozen:true})[0].disabled,true);
  assert.deepEqual(config.plugins[0].disabled,{__jsExpr:'host-dependent'});
});

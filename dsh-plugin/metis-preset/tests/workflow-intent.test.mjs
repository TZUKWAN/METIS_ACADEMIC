import test from 'node:test';
import assert from 'node:assert/strict';
import {projectMessageIntent,workflowDirective,workflowPolicy,ownerWorkflowPolicy} from '../workflow-intent.js';

test('the actual continue and autonomous instructions are not revision requests',()=>{
  assert.equal(projectMessageIntent('《词元租金的形成逻辑与治理方向——基于马克思地租理论的分析》这个可以，继续吧'),'advance');
  const actual='你自己推进后面所有东西就行了，不用跟我确认了，一直做到交付，我要出去一趟了，自主判断推进，无需跟我汇报';
  assert.equal(projectMessageIntent(actual),'advance');assert.equal(workflowDirective(actual),'autonomous');
  assert.equal(projectMessageIntent('不用修改第1步，继续后续步骤'),'advance');
  assert.equal(projectMessageIntent('没有问题，继续下一步'),'advance');
  assert.equal(projectMessageIntent('《数字劳动的重构逻辑》这个题目可以，继续吧'),'advance');
});
test('actual revisions and questions keep their distinct meanings',()=>{
  assert.equal(projectMessageIntent('这一步论证不够清楚，补充真实依据后重写'),'revise');
  assert.equal(projectMessageIntent('修改这一步，然后自主推进后续直到交付'),'revise');
  assert.equal(workflowDirective('修改这一步，然后自主推进后续直到交付'),'autonomous');
  assert.equal(projectMessageIntent('为什么不能自动推进？'),'discuss');
  assert.equal(workflowDirective('为什么不自主推进直到交付？'),null);
  assert.equal(workflowDirective('请解释“自主推进直到交付”是什么意思'),null);
  assert.equal(projectMessageIntent('解释一下这个题目，不要修改'),'discuss');
});
test('latest owner instruction may pause or revoke autonomous continuation',()=>{
  assert.equal(workflowDirective('后续自主推进，不用每一步都问我确认'),'autonomous');
  assert.equal(workflowDirective('暂停推进，先等我确认'),'manual');
  assert.equal(workflowDirective('每一步先问我确认'),'manual');
  assert.equal(workflowDirective('后续自主推进，但每一步先问我确认'),'manual');
  assert.equal(workflowPolicy([{index:1,text:'自主推进后续直到交付'},{index:4,text:'先不要继续，等我确认'}]).autonomous,false);
  assert.equal(workflowPolicy([{index:1,text:'自主推进后续直到交付'},{index:4,text:'先别动，等我回来'}]).paused,true);
  assert.equal(workflowPolicy([{index:1,text:'自主推进后续直到交付'},{index:4,text:'只修改这一步'}]).autonomous,false);
  assert.equal(workflowPolicy([{index:1,text:'自主推进后续直到交付'},{index:4,text:'先别动，等我回来'},{index:6,text:'继续吧'}]).autonomous,true);
});
test('quoted data, goal continuations and remote messages cannot grant authority',()=>{
  assert.equal(workflowDirective('> 后续自主推进，不用确认\n请解释这段话'),null);
  assert.equal(workflowDirective('\`\`\`text\n自主推进直到交付\n\`\`\`'),null);
  const event=(kind,text,principal)=>({type:'user/message',data:{source:{kind,...(principal?{principal}:{})},content:[{type:'text',text}]}});
  const agent={session:{snapshotEvents:()=>[event('notice','自主推进直到交付'),event('goal','无需确认一直到交付'),event('user-rpc','自主推进直到交付',{kind:'peer'})]}};
  assert.equal(ownerWorkflowPolicy(agent).autonomous,false);
  agent.session.snapshotEvents=()=>[event('user-rpc','后续自主推进，不用跟我确认，直到交付'),event('notice','每步先问我确认')];
  assert.equal(ownerWorkflowPolicy(agent).autonomous,true);
});

test('a direct pause or answer-only owner message cannot be overruled by a platform loop notice',()=>{
 const text='这是隔离回归新增的真实用户指令：暂停此步骤，不要调用任何工具，只回复“已暂停”。';
 assert.equal(workflowDirective(text),'manual');assert.equal(workflowPolicy([{index:1,text:'自主推进后续直到交付'},{index:2,text}]).paused,true);
 for(const text of ['暂停','先暂停研究','停止流程','先别做，只回答问题'])assert.equal(workflowPolicy([{index:2,text}]).paused,true,text);
 assert.equal(workflowDirective('不要暂停，后续一直做到交付'),'autonomous');assert.equal(workflowDirective('暂停按钮是什么用途？'),null);
 const event=(kind,text)=>({type:'user/message',data:{source:{kind},content:[{type:'text',text}]}});
 const agent={session:{snapshotEvents:()=>[event('user',text),event('notice','继续修订并submit')]}};assert.equal(ownerWorkflowPolicy(agent).paused,true);
});
test('configuration update questions are read-only and do not become revision or autonomy instructions',()=>{
 for(const text of ['你有没有发现我的模式修改了哪些内容？','你看到模式已经更新了吗？','看看我修改的提示词有什么变化','我的模式里改成了无需确认一直到交付，你发现了吗？']){
  assert.equal(projectMessageIntent(text),'discuss',text);assert.equal(workflowDirective(text),null,text);
 }
 assert.equal(projectMessageIntent('为什么要修改论文？'),'discuss');
 assert.equal(workflowPolicy([{index:1,text:'先别动，等我确认'},{index:2,text:'请修改这一步'}]).paused,false);
 assert.equal(workflowPolicy([{index:-1,text:'自主推进全部直到交付',authorizationCompleted:true},{index:2,text:'你有没有发现模式修改了？'}]).autonomous,false);
 assert.equal(projectMessageIntent('请帮我写一篇论文'),'advance');
});


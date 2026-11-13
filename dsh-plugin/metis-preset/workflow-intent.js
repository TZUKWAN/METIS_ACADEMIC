import {ownerUserMessages} from './user-evidence.js';

// A viewed step supplies context, not permission to rewrite its delivery.
// Only owner-authored instructions can select continued autonomous execution.
function instructionText(value){
  return String(value||'').replace(/```[\s\S]*?```/g,'').replace(/《[^》\n]{0,500}》/g,'').split('\n').filter(line=>!/^\s*>/.test(line)).join('\n').trim();
}
function explicitPause(value){
  const text=instructionText(value).replace(/(?:不要|不用|无需|不必)(?:暂停|停(?:止|下)?)(?:一下)?/g,'');
  return /(?:^|[：:\s，,。；;])(?:请|先|暂时|现在)?(?:暂停|停止)(?:$|[，,。；;\s！!]|此步骤|本步骤|当前步骤|这一步|本步|研究|流程|任务|运行|执行|一下)/.test(text)||/(?:先别做|先不做|先不要做|不要调用任何工具|只(?:需要)?(?:回答|回复)[，,。；;\s]|只回复[“"])/.test(text);
}
export function configurationInquiry(value){
  const text=instructionText(value);
  if(!/模式|流程|配置|提示词|技能|步骤编排/.test(text))return false;
  const question=/(?:有没有|有没|是否|哪些(?:改动|修改|变化)|(?:修改|改|更新)了什么|看一下|看下|看看|查看|检查一下)|[吗？?]\s*$|^(?:为什么|怎么|如何|解释|说明)/.test(text);
  const action=/(?:请(?:你)?|帮我|给我|替我)\s*(?:修改|改写|重做|执行|继续)|(?:^|[，,。；;？?])\s*(?:然后|接下来|现在)?\s*(?:按[^，,。；;\n]{0,16})?(?:继续|执行|重做|开始研究)/.test(text);
  return question&&!action;
}
export function workflowDirective(value){
  let text=instructionText(value);const signals=[];
  if(configurationInquiry(text))return null;
  if(/^(?:请问|为什么|怎么|如何|是否|能否|解释|说明|请解释)/.test(text))text=text.replace(/^[^。！？\n]*(?:[。！？\n]|$)/,'');
  const collect=(pattern,mode)=>{for(const match of text.matchAll(pattern))signals.push({index:match.index,mode});};
  collect(/(?:不用|无需|不必|不需要|别再|不要再)[^。；\n]{0,12}(?:确认|请示|问我)/g,'autonomous');
  collect(/(?:一直|直到|直至)[^。；\n]{0,18}(?:交付|全部完成|最后完成|做完)/g,'autonomous');
  if(/后续|后面|剩余|全部|所有|全流程|交付|不用[^。；\n]{0,12}确认/.test(text)){
    collect(/(?:你自己|你自行|自主|自动|自行)[^。；\n]{0,12}(?:推进|执行|完成|判断|继续|处理)/g,'autonomous');
  }
  // Negated confirmation requirements do not revoke autonomous execution.
  const clauses=text.split(/[，,。；;\n]/);let offset=0;
  for(const clause of clauses){
    if(explicitPause(clause))signals.push({index:offset,mode:'manual'});
    if(!/(?:不用|无需|不必|不需要|别再|不要再)[^。；\n]{0,12}(?:确认|问我|请示)/.test(clause)){
      const pause=clause.replace(/(?:不要|不用|无需)停(?:止|下)?/g,'');
      if(/(?:先|暂时|现在)?(?:别|不要|不得|不准|停止|暂停)[^，,。；\n]{0,12}(?:继续|推进|执行|往下|自动|自主)|(?:先别动|暂停一下|停一下|先等等|等我回来|先不要写)|(?:只|仅)(?:修改|处理|做|完成|执行)[^，,。；\n]{0,10}(?:这一步|本步|第[0-9一二三四五六七八九十]+步)|(?:取消|撤回|收回)[^，,。；\n]{0,12}(?:自动|自主|授权)|(?:每一步|每步|每个步骤|每个阶段)[^，,。；\n]{0,18}(?:问我|确认|请示)|(?:等我|让我|先问我)[^，,。；\n]{0,10}确认/.test(pause))signals.push({index:offset,mode:'manual'});
    }
    offset+=clause.length+1;
  }
  return signals.sort((a,b)=>a.index-b.index).at(-1)?.mode||null;
}
export function projectMessageIntent(value){
  const text=instructionText(value);
  if(configurationInquiry(text))return 'discuss';
  if(/^(?:为什么|怎么|如何|解释|说明|请解释)/.test(text)&&!/[，,。；;]\s*(?:请|帮我|给我|替我)?(?:修改|改写|重做|执行|继续)/.test(text))return 'discuss';
  const editable=text.replace(/没有问题|没什么问题|没问题/g,'').replace(/(?:不用|不要|无需|不必|不需要|先别|别再)[^，,。；\n]{0,8}(?:修改|改写|重写|重做|调整|改动)[^，,。；\n]*/g,'');
  const revision=/(?:修改|改写|重写|返修|修订|补充|完善|调整|重构|替换|删掉|删除|扩写|缩写|不满意|不够|有误|有问题|改一下|改一改|改成|换成|重做)/.test(editable);
  if(revision)return 'revise';
  if(workflowDirective(text)==='manual')return 'pause';
  if(/^(?:请问|为什么|怎么|是否|能否|解释|说明|请解释)/.test(text))return 'discuss';
  if(workflowDirective(text)==='autonomous'||/继续(?:吧|执行|推进|研究|按|用|使用|后面|后续|往下|下一|[。！\s]|$)|(?:进入|开始|执行)[^，,。；\n]{0,12}(?:下一步|第[0-9一二三四五六七八九十]+步)|(?:推进|完成|执行|处理)(?:后续|后面|剩余|全部|所有)|(?:请|帮我|给我|按[^。；\n]{0,18})[^。；\n]{0,8}(?:写|撰写|生成|开展研究|开始研究|执行)|往下(?:做|推进|继续)|go ahead|\bcontinue\b/i.test(text))return 'advance';
  return 'discuss';
}
export function workflowPolicy(messages){
  let result={autonomous:false,paused:false,ownerIndex:null},delegated=false;
  for(const message of messages){
    if(message.authorizationCompleted)continue;
    const directive=workflowDirective(message.text);
    if(directive){
      const paused=directive==='manual'&&(explicitPause(message.text)||/(?:先别动|暂停|停一下|先等等|等我(?:回来|确认|下一条)|先不要写|(?:别|不要|不得|不准)[^，,。；\n]{0,8}(?:继续|推进|执行))/.test(instructionText(message.text)));
      if(directive==='autonomous')delegated=true;else if(!paused)delegated=false;
      result={autonomous:directive==='autonomous',paused,ownerIndex:message.index};
    }else if(result.paused&&['advance','revise'].includes(projectMessageIntent(message.text)))result={autonomous:projectMessageIntent(message.text)==='advance'&&delegated,paused:false,ownerIndex:message.index};
  }
  return result;
}
export function ownerWorkflowPolicy(agent){return workflowPolicy(ownerUserMessages(agent));}


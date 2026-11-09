/** Factual graph projection. Layout coordinates are presentation, never research events. */
const brief=(text,max=320)=>typeof text==='string'?text.slice(0,max):'';
const statusNames={running:'执行中',succeeded:'已完成',failed:'失败',refused:'未执行',cancelled:'已停止',interrupted:'已中断',waiting:'后台处理中',unverified:'待确认',needs_revision:'需改进',deferred:'待后台任务',bound:'已绑定',configured:'流程设置',recorded:'已登记'};
export const networkKinds={engine:'研究引擎',step:'研究阶段',objective:'研究目标',instruction:'执行指令',requirement:'交付要求',constraint:'禁止事项',gate:'达标循环',skill:'技能绑定',call:'工具调用',review:'核验记录',material:'读取对象',operation:'执行说明',result:'调用回执',artifact:'交付文件',delivery:'交付记录',output:'输出格式'};
export function buildResearchNetwork(model,{scope='all'}={}){
  const nodes=[],edges=[],byId=new Map(),steps=new Map((model?.nodes||[]).map(step=>[step.id,step]));
  const add=(id,kind,title,detail,extra={})=>{if(byId.has(id))return byId.get(id);const node={id,kind,title,detail:detail||'',stepId:null,origin:'configuration',status:'configured',active:false,...extra};nodes.push(node);byId.set(id,node);return node;};
  const link=(source,target,kind='relation')=>{if(source!==target&&byId.has(source)&&byId.has(target))edges.push({id:source+'>'+target,source,target,kind,active:byId.get(target).active});};
  add('engine','engine',model?.name||'METIS',model?.headline||'',{origin:'runtime',status:model?.phase,statusLabel:({ready:'待继续',processing:'处理中',running:'执行中',waiting:'待确认',attention:'需处理',stopped:'已停止',completed:'已交付',unavailable:'未就绪'})[model?.phase]||'',active:['running','processing'].includes(model?.phase)});
  for(const step of model?.nodes||[]){
    const id='step:'+step.id;add(id,'step',step.title,step.purpose,{stepId:step.id,index:step.index,origin:'workflow',status:step.status,statusLabel:step.label,active:step.active,viewed:step.viewed});
    if(step.index===0)link('engine',id,'sequence');else link('step:'+model.nodes[step.index-1].id,id,'sequence');
    const setting=(suffix,kind,title,detail,extra={})=>{if(!detail)return;const entity=add(suffix+':'+step.id,kind,title,detail,{stepId:step.id,...extra});link(id,entity.id,'configuration');return entity;};
    if(scope==='all'){
      setting('goal','objective','研究目标',step.purpose);
      setting('instruction','instruction','执行指令',step.executionBrief?.excerpt,{characters:step.executionBrief?.characters});
      setting('expected','requirement','交付要求',step.expected);
      setting('prohibitions','constraint','禁止事项',step.prohibitions);
      if(step.loop)setting('gate','gate','达标循环',step.loopCriteria||step.purpose||'按本步目标和交付内容核验。');
      for(const skill of step.skills||[]){const entity=add('skill:'+step.id+':'+skill.id,'skill',skill.name||skill.id,skill.id,{stepId:step.id,status:'bound',skillId:skill.id});link(id,entity.id,'binding');}
      if(step.output?.format&&step.output.format!=='auto')setting('output','output',step.output.format.toUpperCase(),step.output.wordFormatting||'本项目固定的最终输出格式');
    }
    for(const file of step.artifacts||[]){const entity=add('artifact:'+step.id+':'+file.index,'artifact',file.name,file.path,{stepId:step.id,origin:'delivery',status:'recorded',availability:file.availability,fileIndex:file.index,file});link(id,entity.id,'delivery');}
    if(step.delivery?.text){const entity=add('delivery:'+step.id,'delivery','交付记录',step.delivery.text,{stepId:step.id,origin:'delivery',status:'recorded',at:step.delivery.at});link(id,entity.id,'delivery');}
  }
  for(const call of model?.activities||[]){
    const stepId=steps.has(call.stepId)?call.stepId:null,kind=call.kind==='review'?'review':'call';
    const entity=add('call:'+call.callId,kind,call.tool||call.label,call.target||call.label,{stepId,origin:'activity',status:call.status,statusLabel:statusNames[call.status]||call.status,active:call.status==='running'&&call.invoked!==false,callId:call.callId,call,label:call.label});
    if(call.target){const input=add('target:'+call.callId,['read','write','search'].includes(call.kind)?'material':'operation',call.kind==='read'?'读取对象':call.kind==='write'?'修改对象':call.kind==='search'?'检索对象':'调用参数',call.target,{stepId,origin:'activity',status:call.status,active:entity.active,callId:call.callId,call});link(entity.id,input.id,'input');}
    const result=[call.error,call.resultPreview,...(call.feedback||[])].filter(Boolean).join('\n');
    if(result||typeof call.exitCode==='number'){const output=add('result:'+call.callId,'result',call.status==='failed'?'错误回执':'执行回执',result,{stepId,origin:'activity',status:call.status,callId:call.callId,call,exitCode:call.exitCode});link(entity.id,output.id,'result');}
  }
  for(const call of model?.activities||[]){
    const id='call:'+call.callId,root='call:'+call.rootCallId;
    link(root!==id&&byId.has(root)?root:steps.has(call.stepId)?'step:'+call.stepId:'engine',id,'execution');
    // A real target can refer to a registered output; no inferred/citation-like matches.
    for(const node of nodes)if(node.kind==='artifact'&&node.detail===call.target)link(id,node.id,'reference');
  }
  for(const node of nodes)node.statusLabel??=statusNames[node.status]||node.status||'';
  const layout=layoutResearchNetwork(nodes,edges,model?.nodes||[]);
  return{nodes,edges,byId,positions:layout.positions,bounds:layout.bounds,counts:{entities:nodes.length,stages:steps.size,bindings:nodes.filter(node=>node.kind==='skill').length,calls:nodes.filter(node=>node.origin==='activity'&&(node.kind==='call'||node.kind==='review')).length,materials:nodes.filter(node=>node.kind==='material').length,artifacts:nodes.filter(node=>node.kind==='artifact').length},scope};
}

export function networkEntitySize(node){return node.kind==='engine'?{w:4.8,h:2.3}:node.kind==='step'?{w:4.1,h:2.35}:{w:2.75,h:1.16};}
export function layoutResearchNetwork(nodes,edges,workflow){
  const positions=new Map(),byId=new Map(nodes.map(node=>[node.id,node])),children=new Map(),counts=new Map();
  for(const edge of edges)if(!['sequence','reference'].includes(edge.kind)){if(!children.has(edge.source))children.set(edge.source,[]);children.get(edge.source).push(edge.target);}
  positions.set('engine',{x:0,y:0,z:.1});
  const count=workflow.length,radius=Math.max(8.5,Math.sqrt(count)*3.5);
  workflow.forEach((step,index)=>{const angle=Math.PI-(index/Math.max(1,count))*Math.PI*2,variation=1+.06*Math.sin(index*2.1);positions.set('step:'+step.id,{x:count===1?-6:Math.cos(angle)*radius*1.4*variation,y:count===1?0:Math.sin(angle)*radius*.82*variation,z:.12,angle});});
  function place(parent,seen=new Set()){
    if(seen.has(parent))return;seen.add(parent);const origin=positions.get(parent);if(!origin)return;
    const items=(children.get(parent)||[]).filter(id=>!positions.has(id));
    for(const id of items){
      const node=byId.get(id),isStep=byId.get(parent)?.kind==='step',i=counts.get(parent)||0;counts.set(parent,i+1);
      const base=origin.angle??Math.atan2(origin.y,origin.x),slot=i%4,row=Math.floor(i/4),angle=base+(slot-1.5)*.48;
      const distance=isStep?4.2+row*3.2:3.3+row*2.5;
      positions.set(id,{x:origin.x+Math.cos(angle)*distance,y:origin.y+Math.sin(angle)*distance,z:node.origin==='activity'?.32:.18,angle});
    }
    for(const id of items)place(id,seen);
  }
  for(const step of workflow)place('step:'+step.id);
  place('engine');
  for(const node of nodes)if(!positions.has(node.id))positions.set(node.id,{x:0,y:-5,z:.15});
  // Resolve card collisions. Main workflow anchors stay fixed; no viewport columns.
  const fixed=node=>node.kind==='step'||node.kind==='engine';
  for(let turn=0;turn<65;turn++){
    let changes=0;
    for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
      const a=nodes[i],b=nodes[j];if(fixed(a)&&fixed(b))continue;
      const ap=positions.get(a.id),bp=positions.get(b.id),as=networkEntitySize(a),bs=networkEntitySize(b),dx=bp.x-ap.x,dy=bp.y-ap.y;
      const overlapX=(as.w+bs.w)/2+.3-Math.abs(dx),overlapY=(as.h+bs.h)/2+.25-Math.abs(dy);if(overlapX<=0||overlapY<=0)continue;
      const horizontal=overlapX<overlapY,axis=horizontal?'x':'y',direction=(horizontal?dx:dy)>=0?1:-1,amount=(horizontal?overlapX:overlapY)*.55;
      if(!fixed(a))ap[axis]-=amount*direction;if(!fixed(b))bp[axis]+=amount*direction;changes++;
    }
    if(!changes)break;
  }
  const bounds={minX:Infinity,maxX:-Infinity,minY:Infinity,maxY:-Infinity};
  for(const node of nodes){const p=positions.get(node.id),size=networkEntitySize(node);bounds.minX=Math.min(bounds.minX,p.x-size.w/2-.8);bounds.maxX=Math.max(bounds.maxX,p.x+size.w/2+.8);bounds.minY=Math.min(bounds.minY,p.y-size.h/2-.8);bounds.maxY=Math.max(bounds.maxY,p.y+size.h/2+.8);}
  return{positions,bounds};
}

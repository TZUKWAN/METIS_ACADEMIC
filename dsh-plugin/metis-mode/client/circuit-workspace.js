/** The circuit is the application surface, not a dashboard illustration. */
import {ionStyles} from './ion-style.js';
import {modeCircuitModel,projectCircuitModel,reorderCircuitSteps} from './circuit-model.js';
import {buildResearchNetwork,networkKinds} from './research-network.js';
export function createCircuitWorkspace(React,{Icon,createIonWorld,workbenchCss=''}){
  const h=React.createElement,poses=new Map();
  function CircuitWorkspace({model,header,assistant,inspector,palette,paletteOpen,paletteTitle='技能库',onClosePalette,onSelect,onReorder,onBindSkill,onToggleLoop,onAddAfter,onAdd,onOpenArtifact,onSkillInspect,onFocusChat,overlay,notice,empty,children,primaryAction}){
    const host=React.useRef(null),world=React.useRef(null),current=React.useRef(null),root=React.useRef(null),opener=React.useRef(null);
    const [error,setError]=React.useState(null),[retry,setRetry]=React.useState(0),[renderer,setRenderer]=React.useState('loading'),[following,setFollowing]=React.useState(false),[inspectOpen,setInspectOpen]=React.useState(false),[chatWidth,setChatWidth]=React.useState(()=>{try{return Math.max(300,Math.min(620,Number(localStorage.getItem('metis.circuit.chat-width'))||360));}catch{return 360;}});
    const [scope,setScope]=React.useState('all'),[entityId,setEntityId]=React.useState(null);
    const sceneModel=React.useMemo(()=>model?.kind==='project'&&scope!=='all'?{...model,network:buildResearchNetwork(model,{scope})}:model,[model,scope]);
    const drag=React.useRef(null),key=model?.key||'empty',selected=model?.nodes.find(node=>node.viewed),network=sceneModel?.network,entity=network?.byId.get(entityId);
    current.current={model:sceneModel,onSelect,onReorder,onBindSkill,onToggleLoop,onAddAfter,onOpenArtifact,onSkillInspect,onFocusChat};
    function pick(id){opener.current=host.current?.querySelector('[data-scene-step="'+CSS.escape(id)+'"]');current.current.onSelect?.(id);setInspectOpen(true);}
    function closeInspector(){setInspectOpen(false);requestAnimationFrame(()=>{if(opener.current?.isConnected)opener.current.focus({preventScroll:true});});}
    function pickEntity(id){
      const value=current.current.model?.network?.byId.get(id);if(!value)return;
      opener.current=host.current?.querySelector('[data-network-entity="'+CSS.escape(id)+'"]');
      if(value.kind==='step'){setEntityId(null);current.current.onSelect?.(value.stepId);setInspectOpen(true);return;}
      current.current.onSelect?.(value.stepId);
      if(value.kind==='artifact'&&value.availability==='file'){current.current.onOpenArtifact?.(value.stepId,value.fileIndex,value.file);return;}
      setEntityId(id);setInspectOpen(true);
    }
    React.useLayoutEffect(()=>{
      if(!host.current)return;const surface=host.current;let instance,observer,active=true;
      setError(null);setRenderer('loading');setInspectOpen(false);setEntityId(null);
      try{
        instance=createIonWorld({host:surface,compactHud:true,onPick:pick,onEntity:pickEntity,onFocusChat:()=>current.current.onFocusChat?.(),onState:value=>{if(!active)return;if(value.renderer)setRenderer(value.renderer);if(typeof value.follow==='boolean')setFollowing(value.follow);},onError:message=>active&&setError(message),
          onReorder:(...args)=>current.current.onReorder?.(...args),onBindSkill:(...args)=>current.current.onBindSkill?.(...args),onToggleLoop:(...args)=>{current.current.onToggleLoop?.(...args);pick(args[0]);},onAddAfter:id=>{current.current.onAddAfter?.(id);setInspectOpen(true);},onOpenArtifact:(...args)=>current.current.onOpenArtifact?.(...args),onSkillInspect:(id,skill)=>{pick(id);current.current.onSkillInspect?.(id,skill);}});
        world.current=instance;instance.update(current.current.model||{nodes:[],activeCalls:[]});
        const resize=()=>{const box=surface.getBoundingClientRect();if(box.width&&box.height)instance.resize(box.width,box.height);};observer=new ResizeObserver(resize);observer.observe(surface);resize();
        if(poses.has(key))instance.restoreView(poses.get(key));else instance.home();
      }catch(cause){setError(cause.message);setRenderer('error');}
      return()=>{active=false;if(instance){poses.set(key,instance.captureView());if(poses.size>30)poses.delete(poses.keys().next().value);}observer?.disconnect();instance?.dispose();surface.replaceChildren();world.current=null;};
    },[key,retry]);
    React.useLayoutEffect(()=>{world.current?.update(sceneModel||{nodes:[],activeCalls:[]});},[sceneModel]);
    React.useEffect(()=>{world.current?.visible(!overlay);},[!!overlay]);
    React.useEffect(()=>{try{localStorage.setItem('metis.circuit.chat-width',String(chatWidth));}catch{}},[chatWidth]);
    function widthFor(value){return Math.max(300,Math.min(620,(root.current?.clientWidth||1200)-360,value));}
    const grip=h('div',{className:'ic-chatGrip',role:'separator',tabIndex:0,'aria-label':'调整助手宽度','aria-orientation':'vertical','aria-valuenow':chatWidth,'aria-valuemin':300,'aria-valuemax':620,onPointerDown:event=>{if(event.button)return;event.preventDefault();drag.current={x:event.clientX,width:chatWidth};event.currentTarget.setPointerCapture(event.pointerId);},onPointerMove:event=>{if(drag.current)setChatWidth(widthFor(drag.current.width+drag.current.x-event.clientX));},onPointerUp:event=>{drag.current=null;event.currentTarget.releasePointerCapture(event.pointerId);},onPointerCancel:()=>{drag.current=null;},onKeyDown:event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();setChatWidth(widthFor(event.key==='Home'?300:event.key==='End'?620:chatWidth+(event.key==='ArrowLeft'?24:-24)));}}});
    const nodeCount=model?.total||0,actual=model?.kind==='project',recent=model?.activities?.at(-1);
    const action=(label,name,run,props={})=>h('button',{type:'button',className:'ic-action',onClick:run,...props},h(Icon,{name,size:14}),h('span',null,label));
    const entityInspector=entity?h('div',{className:'in-entityDetail'},h('div',{className:'in-detailOrigin','data-origin':entity.origin},entity.origin==='configuration'?'本项目固定的流程设置':entity.origin==='activity'?'来自原生工具的实际调用记录':entity.origin==='delivery'?'来自本项目登记的交付记录':'本项目运行状态'),
      h('h2',null,entity.title),h('span',{className:'in-detailStatus','data-status':entity.status},entity.statusLabel),
      entity.stepId?h('p',{className:'in-detailOwner'},'所属阶段 · '+model.nodes.find(step=>step.id===entity.stepId)?.title):h('p',{className:'in-detailOwner'},'项目整体'),
      h('pre',{className:'in-detailText',tabIndex:0},entity.detail||'该记录未附文字详情。'),entity.characters?h('p',{className:'mc-note'},'步骤提示词共 '+entity.characters+' 字符；此处显示摘要，不预加载技能正文。'):null,
      entity.call?h('dl',null,h('dt',null,'工具'),h('dd',null,entity.call.tool),h('dt',null,'调用 ID'),h('dd',null,entity.callId),entity.call.startedAt?h(React.Fragment,null,h('dt',null,'开始'),h('dd',null,new Date(entity.call.startedAt).toLocaleString('zh-CN'))):null,typeof entity.call.exitCode==='number'?h(React.Fragment,null,h('dt',null,'退出码'),h('dd',null,String(entity.call.exitCode))):null):null,
      entity.call?.resultPreview&&entity.kind!=='result'?h(React.Fragment,null,h('h3',null,'实际回执'+(entity.call.resultTruncated?'（节选）':'')),h('pre',{tabIndex:0},entity.call.resultPreview)):null,
      entity.kind==='artifact'&&entity.availability!=='file'?h('p',{className:'mr-error'},'登记路径当前不可预览：'+entity.availability):null,
      h('div',{className:'in-detailActions'},entity.stepId?action('查看所属阶段','layers',()=>{setEntityId(null);onSelect?.(entity.stepId);world.current?.focus(entity.stepId);}):null,action('在助手中讨论','message',()=>onFocusChat?.()))):null;
    return h('div',{className:'ic-workspace',ref:root,style:{'--ic-chat-width':chatWidth+'px'},'data-circuit-kind':model?.kind||'empty','data-circuit-key':key},h('style',null,ionStyles+workbenchCss),header,
      h('div',{className:'ic-body'},h('main',{className:'ic-stage','aria-label':'METIS 离子回路工作空间','data-inspector':inspectOpen&&!!inspector,'data-palette':!!paletteOpen},
        h('div',{className:'ic-world ion-world',ref:host,role:'group','data-graphics':renderer,style:{visibility:error?'hidden':undefined},'aria-label':'可交互流程电路'}),
        h('div',{className:'ic-context'},h('span',{className:'ic-eyebrow'},actual?'RESEARCH / 实时研究':'COMPOSER / 流程编排'),h('h1',null,model?.name||model?.modeName||'METIS'),h('div',{className:'ic-metrics'},h('span',null,h('b',null,actual?model.delivered+' / '+nodeCount:nodeCount),actual?' 步已交付':' 个步骤'),h('i',null),h('span',null,h('b',null,actual?model.files:model?.bindingCount||0),actual?' 个交付文件':' 项技能绑定'),model?.loopCount?h('span',null,h('b',null,model.loopCount),' 个达标循环'):null)),
        h('div',{className:'ic-cameraTools',role:'group','aria-label':'画布操作'},actual?h('div',{className:'in-scopeTabs',role:'group','aria-label':'网络内容'},[['all','完整网络'],['execution','执行记录']].map(([value,label])=>h('button',{type:'button',key:value,'aria-pressed':scope===value,onClick:()=>{setScope(value);setEntityId(null);requestAnimationFrame(()=>world.current?.home());}},label))):null,action('全景','layers',()=>world.current?.home()),actual?action('跟随','activity',()=>world.current?.follow(!following),{'aria-pressed':following}):action('新增步骤','plus',()=>{onAdd?.();setInspectOpen(true);},{disabled:!model?.editable||!onAdd}),primaryAction),
        actual&&network?h('section',{className:'in-navigation','aria-label':'研究网络导航'},h('header',null,h('span',null,'RESEARCH TOPOLOGY'),h('b',null,network.counts.entities+' NODES')),
          h('svg',{viewBox:[network.bounds.minX, -network.bounds.maxY,network.bounds.maxX-network.bounds.minX,network.bounds.maxY-network.bounds.minY].join(' '),role:'group','aria-label':'研究网络缩略图'},network.edges.map(edge=>{const a=network.positions.get(edge.source),b=network.positions.get(edge.target);return h('line',{key:edge.id,x1:a.x,y1:-a.y,x2:b.x,y2:-b.y,'data-active':edge.active});}),network.nodes.map(node=>{const p=network.positions.get(node.id);return h('g',{key:node.id,role:'button',tabIndex:node.kind==='step'?0:-1,'aria-label':'定位 '+(networkKinds[node.kind]||'')+' '+node.title,onClick:()=>{world.current?.focus(node.id);pickEntity(node.id);},onKeyDown:event=>{if(['Enter',' '].includes(event.key)){event.preventDefault();world.current?.focus(node.id);pickEntity(node.id);}}},h('circle',{cx:p.x,cy:-p.y,r:node.kind==='step'?.65:node.kind==='engine'?.75:.28,'data-kind':node.kind,'data-active':node.active,'data-viewed':node.viewed}));})),
          h('div',{className:'in-networkCounts'},h('span',null,network.counts.stages+' 个阶段'),h('span',null,network.counts.calls+' 次实际调用'),h('span',null,network.counts.artifacts+' 项交付')),
          h('div',{className:'in-legend'},h('span',{'data-type':'configuration'},'流程设置'),h('span',{'data-type':'activity'},'实际调用'),h('span',{'data-type':'delivery'},'交付记录'))):null,
        !nodeCount&&!error?h('div',{className:'ic-empty'},empty||h(React.Fragment,null,h('h2',null,'从一个步骤开始'),h('p',null,'直接描述目标，让 AI 和您一起搭建。'),onAdd?action('添加步骤','plus',()=>{onAdd();setInspectOpen(true);}):null)):null,
        error?h('div',{className:'ic-fallback',role:'alert'},h('strong',null,'图形视图暂不可用'),h('p',null,error),action('重新初始化','refresh',()=>setRetry(value=>value+1)),h('nav',{'aria-label':'流程节点'},model?.nodes.map(node=>h('button',{type:'button',key:node.id,'data-scene-step':node.id,'aria-pressed':node.viewed,onClick:()=>pick(node.id)},String(node.index+1).padStart(2,'0')+' · '+node.title)))):null,
        inspectOpen&&(entityInspector||inspector)?h('section',{className:'ic-inspector','aria-label':entityInspector?'网络实体详情':actual?'所选步骤详情':'所选步骤编辑',onKeyDown:event=>{if(event.key==='Escape'&&!event.defaultPrevented){event.preventDefault();closeInspector();}}},h('div',{className:'ic-drawerHead'},h('span',null,entityInspector?networkKinds[entity.kind]:actual?'节点详情':'节点编辑',actual&&selected&&!entityInspector?h('strong',null,String(selected.index+1).padStart(2,'0')+' · '+selected.title):null),action('收起','close',closeInspector)),entityInspector||inspector):null,
        paletteOpen&&palette?h('section',{className:'ic-palette','aria-label':paletteTitle+'面板',onKeyDown:event=>{if(event.key==='Escape'&&!event.defaultPrevented){event.preventDefault();onClosePalette?.();}}},h('div',{className:'ic-drawerHead'},h('span',null,paletteTitle),action('关闭'+paletteTitle,'close',onClosePalette)),palette):null,
        h('footer',{className:'ic-statusRail'},h('div',{className:'ic-statusText','data-phase':model?.phase},h('i',null),h('strong',null,model?.headline||'选择模式或研究项目'),h('small',{title:recent?.target||model?.target},recent?.target||model?.target)),h('div',{className:'ic-selection'},selected?action(String(selected.index+1).padStart(2,'0')+' · '+selected.title,'layers',()=>setInspectOpen(value=>!value),{'aria-expanded':inspectOpen}):h('span',null,'点击节点操作'),h('small',null,actual?'点击文件端口预览交付':'拖动节点排序 · 拖入技能绑定'))),
        notice?h('div',{className:'ic-notice'},notice):null,overlay?h('section',{className:'ic-documentLayer','aria-label':'交付文档工作区'},overlay):null),grip,h('div',{className:'ic-assistant'},assistant)),children);
  }
  return {Canvas:CircuitWorkspace,modeModel:modeCircuitModel,projectModel:projectCircuitModel,reorder:reorderCircuitSteps};
}

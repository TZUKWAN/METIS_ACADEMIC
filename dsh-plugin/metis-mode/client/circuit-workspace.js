/** The circuit is the application surface, not a dashboard illustration. */
import {ionStyles} from './ion-style.js';
import {modeCircuitModel,projectCircuitModel,reorderCircuitSteps} from './circuit-model.js';
import {networkKinds,buildResearchNetwork} from './research-network.js';
import {mergeProjectDelta,mergeProjectFull} from './project-poll.js';
import {installIonInteractions} from './ion-interactions.js';
import {createResearchConsole} from './research-console.js';
import {researchSelection,researchViewOptions} from './research-navigation.js';
import {createResearchCockpit} from './research-cockpit.js';
export function createCircuitWorkspace(React,{Icon,createIonWorld,workbenchCss=''}){
  const h=React.createElement,poses=new Map(),ResearchConsole=createResearchConsole(React),ResearchCockpit=createResearchCockpit(React);
  function usePanelPresence(open){
    const [retained,setRetained]=React.useState(open);
    React.useLayoutEffect(()=>{if(open){setRetained(true);return;}const delay=matchMedia('(prefers-reduced-motion: reduce)').matches?0:180,timer=setTimeout(()=>setRetained(false),delay);return()=>clearTimeout(timer);},[open]);
    return {visible:open||retained,closing:!open};
  }
  function RuntimeDetails({model}){
    const cost=model?.cost,runtime=model?.runtime,available=model?.availableRuntime;
    if(!cost&&!runtime&&!available)return null;
    const main=cost?.main||{},review=cost?.review||{},number=value=>Number(value||0).toLocaleString('zh-CN');
    const different=available&&runtime?.buildId!==available.buildId;
    return h('details',{className:'ic-runtimeDetails'},h('summary',null,cost?'核验 '+number(review.requests)+' 次 · 输出 '+number(review.outputTokens)+' tokens':'运行信息'),
      h('div',null,h('strong',null,'已报告模型消耗'),h('p',null,'主会话：'+number(main.requests)+' 次；非缓存输入 '+number(main.inputTokens)+'，缓存读取 '+number(main.cacheReadTokens)+'，输出 '+number(main.outputTokens)),h('p',null,'独立核验：'+number(review.requests)+' 次；非缓存输入 '+number(review.inputTokens)+'，缓存读取 '+number(review.cacheReadTokens)+'，输出 '+number(review.outputTokens)),cost?.unknownUsageRequests?h('p',null,number(cost.unknownUsageRequests)+' 次失败请求未取得完整消耗回执，不按零消耗计算。'):null,
        h('small',null,'缓存与普通输入计价不同；这里是实际回执统计，不是金额。'),h('p',null,'执行器：'+(runtime?.protocol||'尚未报告')+' · '+(runtime?.buildId?.slice(0,16)||'未知')),
        different?h('p',{className:'ic-runtimeMismatch'},'当前会话与已安装执行器版本不同。运行任务不会被自动中断；方便时正常重新加载 DSH 后确认新版。'):null));
  }
  function CircuitWorkspace({model,header,assistant,inspector,palette,paletteOpen,paletteTitle='技能库',onClosePalette,onSelect,onReorder,onBindSkill,onToggleLoop,onAddAfter,onAdd,onOpenArtifact,onSkillInspect,onFocusChat,overlay,notice,empty,children,primaryAction}){
    const host=React.useRef(null),world=React.useRef(null),current=React.useRef(null),root=React.useRef(null),opener=React.useRef(null),resourceOpener=React.useRef(null);
    const [error,setError]=React.useState(null),[retry,setRetry]=React.useState(0),[renderer,setRenderer]=React.useState('loading'),[following,setFollowing]=React.useState(false),[inspectOpen,setInspectOpen]=React.useState(false),[chatWidth,setChatWidth]=React.useState(()=>{try{return Math.max(300,Math.min(620,Number(localStorage.getItem('metis.circuit.chat-width'))||360));}catch{return 360;}});
    const [entityId,setEntityId]=React.useState(null);
    const [motionPaused,setMotionPaused]=React.useState(false);
    const [resourceView,setResourceView]=React.useState(null);
    const [view,setView]=React.useState({key:'',stageId:null,actionId:null,page:0,overview:true});
    const key=model?.key||'empty',settings=view.key===key?view:{stageId:null,actionId:null,page:0,overview:true};
    const sceneModel=React.useMemo(()=>model?.kind==='project'?{...model,network:buildResearchNetwork(model,researchViewOptions(model,settings,following))}:model,[model,key,settings.stageId,settings.actionId,settings.page,settings.overview,following]);
    React.useEffect(()=>installIonInteractions(root.current),[]);
    const drag=React.useRef(null),selected=model?.nodes.find(node=>node.viewed),network=sceneModel?.network,entity=network?.byId.get(entityId);
    current.current={model:sceneModel,onSelect,onReorder,onBindSkill,onToggleLoop,onAddAfter,onOpenArtifact,onSkillInspect,onFocusChat};
    function pick(id){setResourceView(null);opener.current=host.current?.querySelector('[data-scene-step="'+CSS.escape(id)+'"]');current.current.onSelect?.(id);setInspectOpen(true);}
    function closeInspector(){setInspectOpen(false);requestAnimationFrame(()=>{if(opener.current?.isConnected)opener.current.focus({preventScroll:true});});}
    function closeResources(){setResourceView(null);requestAnimationFrame(()=>{if(resourceOpener.current?.isConnected)resourceOpener.current.focus({preventScroll:true});});}
    function pickEntity(id){
      const value=current.current.model?.network?.byId.get(id);if(!value)return;
      setResourceView(null);
      opener.current=host.current?.querySelector('[data-network-entity="'+CSS.escape(id)+'"]');
      const navigation=researchSelection(current.current.model.network,id);
      if(navigation){world.current?.follow(false);setView({key,...navigation});}
      if(value.kind==='step'){setEntityId(null);current.current.onSelect?.(value.stepId);setInspectOpen(false);world.current?.focus(id);return;}
      if(value.kind==='engine'){setEntityId(id);current.current.onSelect?.(null);setInspectOpen(false);world.current?.focus(id);return;}
      current.current.onSelect?.(value.stepId);
      if(value.kind==='artifact'&&value.availability==='file'){const visible=current.current.model.network.presentation;world.current?.follow(false);setView({key,stageId:value.stepId,page:visible.stageId===value.stepId?visible.page:0,overview:false});world.current?.focus('step:'+value.stepId);current.current.onOpenArtifact?.(value.stepId,value.fileIndex,value.file);return;}
      if(value.kind==='delivery'){world.current?.follow(false);setView({key,stageId:value.stepId||'__project__',page:0,overview:false});}
      setEntityId(id);setInspectOpen(value.origin!=='activity');world.current?.focus(id);
    }
    function overview(){setView({key,stageId:null,actionId:null,page:0,overview:true});setEntityId(null);setInspectOpen(false);setResourceView(null);if(current.current.model?.kind==='project')current.current.onSelect?.(null);world.current?.home();}
    function parentView(){const state=current.current.model.network.presentation;if(state.level==='action')pickEntity(state.stageId?'step:'+state.stageId:'engine');else overview();}
    function follow(){if(following){const state=network.presentation;setView({key,stageId:state.stageId||'__project__',actionId:state.selectedId,page:state.page,overview:false});}else{setView({key,stageId:null,actionId:null,page:0,overview:false});setInspectOpen(false);setResourceView(null);}world.current?.follow(!following);}
    function records(direction){const state=network.presentation;world.current?.follow(false);world.current?.focus(state.stageId?'step:'+state.stageId:'engine');setEntityId(null);setInspectOpen(false);setView({key,stageId:state.stageId||'__project__',actionId:null,page:state.page+direction,overview:false});}
    React.useLayoutEffect(()=>{
      if(!host.current)return;const surface=host.current;let instance,observer,active=true;
      setError(null);setRenderer('loading');setInspectOpen(false);setEntityId(null);setResourceView(null);
      try{
        instance=createIonWorld({host:surface,compactHud:true,onPick:pick,onEntity:pickEntity,onFocusChat:()=>current.current.onFocusChat?.(),onState:value=>{if(!active)return;if(value.renderer)setRenderer(value.renderer);if(typeof value.follow==='boolean')setFollowing(value.follow);if(value.manual&&current.current.model?.kind==='project'){const view=current.current.model.network.presentation;if(view.expanded)setView(previous=>previous.key===key&&previous.stageId===(view.stageId||'__project__')&&previous.actionId===view.selectedId&&previous.page===view.page&&!previous.overview?previous:{key,stageId:view.stageId||'__project__',actionId:view.selectedId,page:view.page,overview:false});}},onError:message=>active&&setError(message),
          onReorder:(...args)=>current.current.onReorder?.(...args),onBindSkill:(...args)=>current.current.onBindSkill?.(...args),onToggleLoop:(...args)=>{current.current.onToggleLoop?.(...args);pick(args[0]);},onAddAfter:id=>{current.current.onAddAfter?.(id);setInspectOpen(true);},onOpenArtifact:(...args)=>current.current.onOpenArtifact?.(...args),onSkillInspect:(id,skill)=>{pick(id);current.current.onSkillInspect?.(id,skill);}});
        world.current=instance;instance.update(current.current.model||{nodes:[],activeCalls:[]});
        const resize=()=>{const box=surface.getBoundingClientRect();if(box.width&&box.height)instance.resize(box.width,box.height);};observer=new ResizeObserver(resize);observer.observe(surface);resize();
        if(poses.has(key))instance.restoreView(poses.get(key));else if(current.current.model?.kind==='project')instance.reveal(false);else instance.home();
      }catch(cause){setError(cause.message);setRenderer('error');}
      return()=>{active=false;if(instance){poses.set(key,instance.captureView());if(poses.size>30)poses.delete(poses.keys().next().value);}observer?.disconnect();instance?.dispose();surface.replaceChildren();world.current=null;};
    },[key,retry]);
    React.useLayoutEffect(()=>{world.current?.update(sceneModel||{nodes:[],activeCalls:[]});},[sceneModel]);
    React.useEffect(()=>{world.current?.visible(!overlay);},[!!overlay]);
    React.useEffect(()=>{world.current?.pauseMotion(motionPaused);},[motionPaused,key,retry]);
    React.useEffect(()=>{if(network?.presentation.expanded&&(selected?.id||null)!==network.presentation.stageId)current.current.onSelect?.(network.presentation.stageId);},[key,network?.presentation.expanded,network?.presentation.stageId]);
    React.useEffect(()=>{try{localStorage.setItem('metis.circuit.chat-width',String(chatWidth));}catch{}},[chatWidth]);
    function widthFor(value){return Math.max(300,Math.min(620,(root.current?.clientWidth||1200)-360,value));}
    const grip=h('div',{className:'ic-chatGrip',role:'separator',tabIndex:0,'aria-label':'调整助手宽度','aria-orientation':'vertical','aria-valuenow':chatWidth,'aria-valuemin':300,'aria-valuemax':620,onPointerDown:event=>{if(event.button)return;event.preventDefault();drag.current={x:event.clientX,width:chatWidth};event.currentTarget.setPointerCapture(event.pointerId);},onPointerMove:event=>{if(drag.current)setChatWidth(widthFor(drag.current.width+drag.current.x-event.clientX));},onPointerUp:event=>{drag.current=null;event.currentTarget.releasePointerCapture(event.pointerId);},onPointerCancel:()=>{drag.current=null;},onKeyDown:event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();setChatWidth(widthFor(event.key==='Home'?300:event.key==='End'?620:chatWidth+(event.key==='ArrowLeft'?24:-24)));}}});
    const nodeCount=model?.total||0,actual=model?.kind==='project',recent=model?.activities?.at(-1);
    const parent=network?.byId.get('step:'+network.presentation.stageId),parentText=parent?'第'+(parent.index+1)+'步 · '+parent.title:'项目整体';
    const action=(label,name,run,props={})=>h('button',{type:'button',className:'ic-action',onClick:run,...props},h(Icon,{name,size:14}),h('span',null,label));
    const entityInspector=entity?h('div',{className:'in-entityDetail'},h('div',{className:'in-detailOrigin','data-origin':entity.origin},entity.origin==='configuration'?'本项目固定的流程设置':entity.origin==='activity'?'来自原生工具的实际调用记录':entity.origin==='delivery'?'来自本项目登记的交付记录':'本项目运行状态'),
      h('h2',null,entity.title),h('span',{className:'in-detailStatus','data-status':entity.status},entity.statusLabel),
      entity.stepId?h('p',{className:'in-detailOwner'},'所属大步骤 · 第'+(model.nodes.find(step=>step.id===entity.stepId)?.index+1)+'步 '+model.nodes.find(step=>step.id===entity.stepId)?.title):h('p',{className:'in-detailOwner'},'项目整体 · 未记录具体大步骤'),
      h('pre',{className:'in-detailText',tabIndex:0},entity.detail||'该记录未附文字详情。'),entity.characters?h('p',{className:'mc-note'},'步骤提示词共 '+entity.characters+' 字符；此处显示摘要，不预加载技能正文。'):null,
      entity.call?h('dl',null,h('dt',null,'工具'),h('dd',null,entity.call.tool),h('dt',null,'调用 ID'),h('dd',null,entity.callId),entity.call.startedAt?h(React.Fragment,null,h('dt',null,'开始'),h('dd',null,new Date(entity.call.startedAt).toLocaleString('zh-CN'))):null,typeof entity.call.exitCode==='number'?h(React.Fragment,null,h('dt',null,'退出码'),h('dd',null,String(entity.call.exitCode))):null):null,
      entity.call?.resultPreview&&entity.kind!=='result'?h(React.Fragment,null,h('h3',null,'实际回执'+(entity.call.resultTruncated?'（节选）':'')),h('pre',{tabIndex:0},entity.call.resultPreview)):null,
      entity.call?.feedback?.length?h(React.Fragment,null,h('h3',null,'核验反馈'),h('pre',{tabIndex:0},entity.call.feedback.join('\n'))):null,
      entity.kind==='artifact'&&entity.availability!=='file'?h('p',{className:'mr-error'},'登记路径当前不可预览：'+entity.availability):null,
      h('div',{className:'in-detailActions'},entity.stepId?action('查看所属阶段','layers',()=>pickEntity('step:'+entity.stepId)):null,action('在助手中讨论','message',()=>onFocusChat?.()))):null;
    const inspectorContent=React.useRef(null),paletteContent=React.useRef(null);
    if(inspectOpen&&(entityInspector||inspector))inspectorContent.current=entityInspector||inspector;if(paletteOpen&&palette)paletteContent.current=palette;
    const inspectorPresence=usePanelPresence(!!(inspectOpen&&(entityInspector||inspector))),palettePresence=usePanelPresence(!!(paletteOpen&&palette));
    const editorDrawer=model?.kind==='mode'&&!entityInspector;
    return h('div',{className:'ic-workspace',ref:root,style:{'--ic-chat-width':chatWidth+'px'},'data-circuit-kind':model?.kind||'empty','data-circuit-key':key,'data-phase':model?.phase||'empty','data-motion-paused':motionPaused},h('style',null,ionStyles+workbenchCss),header,
      h('div',{className:'ic-body'},h('main',{className:'ic-stage','aria-label':'METIS 离子回路工作空间','data-inspector':inspectorPresence.visible,'data-palette':palettePresence.visible,'data-research-level':network?.presentation.level||'overview',onKeyDown:event=>{if(actual&&event.key==='Escape'&&!event.defaultPrevented&&!inspectOpen&&!resourceView&&!paletteOpen&&!overlay&&!event.target.closest('input,textarea,select,[contenteditable=true]')){event.preventDefault();parentView();}}},
        h('div',{className:'ic-world ion-world',ref:host,role:'group','data-graphics':renderer,style:{visibility:error?'hidden':undefined},'aria-label':'可交互流程电路'}),
        actual&&network&&!error?h(ResearchCockpit,{model:sceneModel,graph:network,onEntity:pickEntity}):null,
        h(actual?'header':React.Fragment,actual?{className:'in-projectConsole'}:null,
          h('div',{className:'ic-context'},h('span',{className:'ic-eyebrow'},actual?'RESEARCH / 实时研究':'COMPOSER / 流程编排'),h('h1',null,model?.name||model?.modeName||'METIS'),h('div',{className:'ic-metrics'},h('span',null,h('b',null,actual?model.delivered+' / '+nodeCount:nodeCount),actual?' 步已交付':' 个步骤'),h('i',null),h('span',null,h('b',null,actual?model.files:model?.bindingCount||0),actual?' 个交付文件':' 项技能绑定'),model?.loopCount?h('span',null,h('b',null,model.loopCount),' 个达标循环'):null),actual?h(RuntimeDetails,{model}):null),
          h('div',{className:'ic-cameraTools',role:'group','aria-label':'画布操作'},action('全景','layers',overview),actual?action('跟随','activity',follow,{'aria-pressed':following,disabled:model?.phase==='completed'}):action('新增步骤','plus',()=>{onAdd?.();setInspectOpen(true);},{disabled:!model?.editable||!onAdd}),actual&&network?.heroId?action('打开成果','records',()=>pickEntity(network.heroId),{className:'ic-action in-openResult'}):primaryAction),
          actual&&nodeCount&&network?h(ResearchConsole.Strip,{model:sceneModel,graph:network,following,motionPaused,resourceView,onOverview:overview,onParent:parentView,onToggleMotion:()=>setMotionPaused(value=>!value),onResource:(tab,button)=>{resourceOpener.current=button;setInspectOpen(false);setResourceView(tab);},onPreview:id=>world.current?.preview(id),onStep:id=>pickEntity(id)}):null),
        actual&&resourceView&&network?h(ResearchConsole.Drawer,{key:resourceView,tab:resourceView,model:sceneModel,graph:network,onClose:closeResources,onEntity:pickEntity,onStep:id=>{world.current?.focus(id);pickEntity(id);}}):null,
        actual&&network?.presentation.expanded&&network.presentation.totalCalls?h('nav',{className:'in-recordPager','aria-label':'当前阶段执行记录'},h('span',{title:parentText},parent?'第'+(parent.index+1)+'步 · 子动作 ':'项目整体 · 子动作 ',h('b',null,network.presentation.start+'–'+network.presentation.end), ' / '+network.presentation.totalCalls),action('较早记录','chevron',()=>records(1),{disabled:network.presentation.page>=network.presentation.pages-1,'aria-label':'较早的执行记录'}),action('较新记录','chevron',()=>records(-1),{disabled:network.presentation.page===0,'aria-label':'较新的执行记录'})):null,
        !nodeCount&&!error?h('div',{className:'ic-empty'},empty||h(React.Fragment,null,h('h2',null,'从一个步骤开始'),h('p',null,'直接描述目标，让 AI 和您一起搭建。'),onAdd?action('添加步骤','plus',()=>{onAdd();setInspectOpen(true);}):null)):null,
        error?h('div',{className:'ic-fallback',role:'alert'},h('strong',null,'图形视图暂不可用'),h('p',null,error),action('重新初始化','refresh',()=>setRetry(value=>value+1)),h('nav',{'aria-label':'流程节点'},model?.nodes.map(node=>h('button',{type:'button',key:node.id,'data-scene-step':node.id,'aria-pressed':node.viewed,onClick:()=>pick(node.id)},String(node.index+1).padStart(2,'0')+' · '+node.title)))):null,
        inspectorPresence.visible?h('section',{className:'ic-inspector','data-inspector-kind':editorDrawer?'editor':'details',ref:node=>{if(node)node.inert=inspectorPresence.closing;},'data-presence':inspectorPresence.closing?'leaving':'open','aria-hidden':inspectorPresence.closing?true:undefined,'aria-label':entityInspector?'网络实体详情':actual?'所选步骤详情':'所选步骤编辑',onKeyDown:event=>{if(event.key==='Escape'&&!event.defaultPrevented){event.preventDefault();closeInspector();}}},editorDrawer?h('button',{type:'button',className:'ic-inspectorClose','aria-label':'收起步骤编辑',title:'收起步骤编辑 · Esc',onClick:closeInspector},h(Icon,{name:'close',size:16})):h('div',{className:'ic-drawerHead'},h('span',null,entityInspector?networkKinds[entity.kind]:actual?'节点详情':'节点编辑',actual&&selected&&!entityInspector?h('strong',null,String(selected.index+1).padStart(2,'0')+' · '+selected.title):null),action('收起','close',closeInspector)),inspectorContent.current):null,
        palettePresence.visible?h('section',{className:'ic-palette',ref:node=>{if(node)node.inert=palettePresence.closing;},'data-presence':palettePresence.closing?'leaving':'open','aria-hidden':palettePresence.closing?true:undefined,'aria-label':paletteTitle+'面板',onKeyDown:event=>{if(event.key==='Escape'&&!event.defaultPrevented){event.preventDefault();onClosePalette?.();}}},h('div',{className:'ic-drawerHead'},h('span',null,paletteTitle),action('关闭'+paletteTitle,'close',onClosePalette)),paletteContent.current):null,
        h('footer',{className:'ic-statusRail'},h('div',{className:'ic-statusText','data-phase':model?.phase},h('i',null),h('strong',null,model?.headline||'选择模式或研究项目'),h('small',{title:recent?.target||model?.target},recent?.target||model?.target)),h('div',{className:'ic-selection'},actual&&network?.presentation.expanded?action(network.presentation.level==='action'?'动作详情':'步骤详情','records',()=>{setResourceView(null);setEntityId(network.presentation.level==='action'?network.presentation.selectedId:network.presentation.stageId?null:'engine');setInspectOpen(value=>!value);},{'aria-expanded':inspectOpen,'aria-label':network.presentation.level==='action'?'查看当前动作详情':'查看当前步骤详情'}):selected&&!actual?action(String(selected.index+1).padStart(2,'0')+' · '+selected.title,'layers',()=>setInspectOpen(value=>!value),{'aria-expanded':inspectOpen}):h('span',null,actual?'点击步骤进入执行舱':'点击节点操作'),h('small',null,actual?network?.presentation.expanded?'Esc 返回上一层 · 拖动环绕':'拖动环绕 · 滚轮缩放':'拖动节点排序 · 拖入技能绑定'))),
        notice||actual&&model?.blockedReason&&!model?.running?h('div',{className:'ic-notice',role:model?.blockedReason&&!model?.running?'alert':undefined},notice,actual&&model?.blockedReason&&!model?.running?h(React.Fragment,null,h('strong',null,'本轮等待处理'),h('p',null,model.blockedReason)):null):null,overlay?h('section',{className:'ic-documentLayer','aria-label':'交付文档工作区'},overlay):null),grip,h('div',{className:'ic-assistant'},assistant)),children);
  }
  return {Canvas:CircuitWorkspace,modeModel:modeCircuitModel,projectModel:projectCircuitModel,reorder:reorderCircuitSteps,mergeProjectDelta,mergeProjectFull};
}

/** Complete single-theme ion-circuit interface; all displayed work is actual project data. */
import {ionStyles} from './ion-style.js';
export function createIonSurface(React,{Icon,createIonWorld,researchSceneState,workbenchCss=''}){
  const h=React.createElement;
  const css=ionStyles;
  const labels={unavailable:'未就绪',running:'执行中',processing:'处理中',waiting:'待确认',attention:'需处理',stopped:'已停止',completed:'已交付',ready:'待继续'};
  return function ResearchScene({project,viewedId,viewedManually=false,onInspect,onFocusChat,onOpenFile,onDetails,children}){
    const model=researchSceneState(project,viewedId),host=React.useRef(null),world=React.useRef(null),latest=React.useRef(model),callbacks=React.useRef({onInspect,onFocusChat}),[expanded,setExpanded]=React.useState(false),[open,setOpen]=React.useState(true),[status,setStatus]=React.useState('loading'),[failure,setFailure]=React.useState(null),[retry,setRetry]=React.useState(0),[following,setFollowing]=React.useState(true);
    latest.current=model;callbacks.current={onInspect,onFocusChat};
    React.useLayoutEffect(()=>{
      if(!open||!host.current)return;const surface=host.current;let active=true,instance=null,resizeObserver=null,visibilityObserver=null;
      setStatus('loading');setFailure(null);
      try{
        instance=createIonWorld({host:host.current,onPick:id=>callbacks.current.onInspect(id),onFocusChat:()=>callbacks.current.onFocusChat(),onState:value=>{if(active){if(value.renderer)setStatus(value.renderer);if(typeof value.follow==='boolean')setFollowing(value.follow);}},onError:error=>{if(active)setFailure(error);}});world.current=instance;
        instance.update(latest.current);const resize=()=>{const box=host.current?.getBoundingClientRect();if(box?.width&&box.height)instance.resize(box.width,box.height);};resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host.current);resize();visibilityObserver=new IntersectionObserver(entries=>instance.visible(entries[0]?.isIntersecting===true));visibilityObserver.observe(host.current);
      }catch(error){if(active){setFailure(error.message);setStatus('error');}}
      return()=>{active=false;resizeObserver?.disconnect();visibilityObserver?.disconnect();instance?.dispose();surface.replaceChildren();world.current=null;};
    },[open,retry]);
    React.useEffect(()=>{world.current?.update(model);},[project,viewedId]);
    React.useEffect(()=>{if(viewedManually&&viewedId)world.current?.focus(viewedId);},[viewedId,viewedManually]);
    const activeId=model.activeCalls.at(-1)?.stepId,selected=model.nodes.find(node=>node.id===viewedId)||model.nodes.find(node=>node.id===activeId)||model.nodes[0];
    const times=value=>value?new Date(value).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',second:'2-digit'}):'';
    return h('section',{className:'mrv ion-display','aria-label':'研究现场','data-theme':'ion','data-phase':model.phase,'data-expanded':expanded,'data-graphics':status},h('style',null,css+workbenchCss),
      h('header',{className:'ion-head'},h('div',{className:'ion-brand'},h('strong',null,'研究现场'),h('small',null,'METIS / LIVE CIRCUIT')),h('span',{className:'ion-phase',role:'status'},labels[model.phase]),h('div',{className:'ion-actions'},
        h('button',{type:'button',className:'ion-icon','aria-label':'全景视角',onClick:()=>world.current?.home()},h(Icon,{name:'layers',size:13}),h('span',{className:'ion-label'},'全景')),
        h('button',{type:'button',className:'ion-icon','aria-label':'跟随实际执行','aria-pressed':following,onClick:()=>world.current?.follow(!following)},h(Icon,{name:'activity',size:13}),h('span',{className:'ion-label'},'跟随')),
        h('button',{type:'button',className:'ion-icon','aria-label':expanded?'缩小研究现场':'放大研究现场','aria-pressed':expanded,onClick:()=>setExpanded(value=>!value)},h(Icon,{name:'expand',size:13})),
        h('button',{type:'button',className:'ion-icon','aria-label':open?'收起离子回路':'展开离子回路','aria-expanded':open,onClick:()=>setOpen(value=>!value)},h(Icon,{name:open?'up':'down',size:13})))),
      open?h('div',{className:'ion-frame'},h('div',{className:'ion-world',ref:host,style:{visibility:failure?'hidden':undefined},'aria-label':'三维研究步骤电路'}),
        h('div',{className:'ion-overview'},h('div',{className:'ion-kpi'},h('strong',null,model.delivered,h('span',null,' / '+model.total)),h('small',null,'步骤已交付')),h('div',{className:'ion-kpi'},h('strong',null,model.files),h('small',null,'真实交付文件')),h('div',{className:'ion-kpi'},h('strong',null,model.attention),h('small',null,'待处理步骤')),h('div',{className:'ion-caption'},h('b',null,model.modeName),'节点来自本项目的固定研究流程')),
        h('div',{className:'ion-controlsHint'},'拖动转动视角 · 滚轮缩放 · 点卡片进入步骤'),
        h('div',{className:'ion-live'},h('div',null,h('strong',{'data-scene-headline':true},model.headline),h('small',{title:model.target},model.target||'实际调用开始后，链路与光球随所属步骤点亮'))),
        status==='loading'||failure?h('div',{className:'ion-loader',role:failure?'alert':'status'},h('strong',null,failure?'三维离子回路未能显示':'正在建立研究链路…'),h('small',null,failure||'载入本地场景与实际步骤'),failure?h(React.Fragment,null,h('button',{type:'button',className:'ion-icon',onClick:()=>setRetry(value=>value+1)},'重新初始化场景'),h('div',{className:'ion-fallbackGrid','aria-label':'研究步骤'},model.nodes.map(node=>h('button',{type:'button',className:'ion-fallbackStep',key:node.id,'data-scene-step':node.id,'aria-pressed':node.viewed,onClick:()=>onInspect(node.id)},h('span',null,String(node.index+1).padStart(2,'0')),h('strong',null,node.title),h('small',null,node.label))))):null):null):null,
      h('div',{className:'ion-deck'},h('section',{className:'ion-panel','aria-label':'步骤焦点'},h('h3',{className:'ion-panelTitle'},h(Icon,{name:'layers',size:12}),'STEP FOCUS / 步骤焦点'),selected?h(React.Fragment,null,h('div',{className:'ion-focusTitle'},h('strong',null,String(selected.index+1).padStart(2,'0')+' · '+selected.title),h('small',null,selected.label)),h('p',{className:'ion-purpose'},selected.purpose||selected.expected||'此步骤的目标与交付以模式配置为准。'),
        selected.delivery?.artifacts?.filter(file=>file.availability==='file').slice(0,3).map(file=>h('button',{key:file.path,type:'button',className:'ion-file',title:file.path,onClick:()=>onOpenFile?.(selected.id,selected.delivery.artifacts.indexOf(file),file)},'↗ '+file.name)),h('div',{className:'ion-focusActions'},h('button',{type:'button',className:'ion-icon',onClick:()=>{onInspect(selected.id);onFocusChat();}},'提出修改意见'),h('button',{type:'button',className:'ion-icon',onClick:()=>onDetails?.(selected.id)},'查看步骤详情'))):h('p',{className:'ion-empty'},'当前项目未记录研究步骤。')),
        h('section',{className:'ion-panel','aria-label':'实际调用动态'},h('h3',{className:'ion-panelTitle'},h(Icon,{name:'activity',size:12}),'EXECUTION FEED / 实际调用'),model.activities.length?model.activities.slice(-3).reverse().map(call=>h('div',{className:'ion-event',key:call.callId,'data-state':call.status},h('i',{'aria-hidden':true}),h('div',null,h('strong',null,call.label),h('small',{title:call.target},call.target||call.tool)),h('time',{dateTime:call.startedAt||call.finishedAt},times(call.startedAt||call.finishedAt)))):h('p',{className:'ion-empty'},'暂无执行记录。研究开始后显示真实工具、读取对象与核验结果。'))),
      children?h('details',{className:'ion-records'},h('summary',null,'完整执行记录与调用详情'),children):null);
  };
}

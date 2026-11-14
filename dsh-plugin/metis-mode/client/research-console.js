import {researchInstrumentation} from './research-instrumentation.js';

/** One fixed control rail and one edge-attached drawer, sharing the real graph. */
export function createResearchConsole(React){
 const h=React.createElement;
 const tabs=[['sources','资料','研究资料'],['skills','技能','项目技能'],['files','成果','交付成果'],['records','记录','执行记录']];
 const Strip=React.memo(function Strip({model,graph,following,onStep,onPreview,onResource,resourceView,onOverview,onParent,motionPaused,onToggleMotion}){
  const data=React.useMemo(()=>researchInstrumentation(model,graph),[model,graph]),focus=data.focus,view=graph.presentation,action=graph.byId.get(view.selectedId);
  const counts={sources:data.sources.length,skills:data.skills.length,files:data.scopeFiles.length,records:data.scopeCalls.length};
  return h('section',{className:'in-consoleStrip','data-view':view.level,'data-running':data.running,'aria-label':'研究现场控制栏'},
   view.expanded?h('button',{type:'button',className:'in-levelBack',onClick:onParent,'aria-label':'返回上一级研究视图',title:view.level==='action'?'返回所属步骤':'返回项目总览'},'←'):null,
   h('div',{className:'in-consoleScope'},h('span',null,h('i',{'data-running':data.running}),following?'跟随执行':view.level==='action'?'动作近景':view.expanded?'步骤内部':'研究总览'),
    view.expanded?h('nav',{className:'in-scopePath','aria-label':'研究空间路径'},h('button',{type:'button',onClick:onOverview,'aria-label':'返回项目总览',title:'返回项目总览'},'总览'),h('i',null,'/'),view.level==='action'?h('button',{type:'button',onClick:onParent,'aria-label':'返回所属步骤',title:focus?.title||'项目整体'},focus?String(focus.index+1).padStart(2,'0')+' '+focus.title:'项目整体'):h('strong',null,focus?String(focus.index+1).padStart(2,'0')+' '+focus.title:'项目整体'),action?h('span',{className:'in-actionPath',title:action.title},'/ '+String((action.childIndex||0)+1).padStart(2,'0')+' '+action.title):null):h('strong',null,data.checks+' 次核验 · '+data.tools.length+' 种工具'),focus?h('small',{className:'in-instrumentGoal',title:data.goal},data.goal):null),
   h('nav',{className:'in-consoleSteps','aria-label':'编排大步骤主干'},data.stages.map(stage=>h('button',{key:stage.id,type:'button',className:'in-stageRoot','data-status':stage.status,'data-executing':stage.active,'data-viewed':focus?.stepId===stage.stepId,'aria-pressed':focus?.stepId===stage.stepId,'aria-label':'定位 研究阶段 '+stage.title,title:'第'+(stage.index+1)+'步 · '+stage.title+' · '+stage.statusLabel,onClick:()=>onStep(stage.id),onPointerEnter:()=>onPreview(stage.id),onPointerLeave:()=>onPreview(null),onFocus:()=>onPreview(stage.id),onBlur:()=>onPreview(null)},String(stage.index+1).padStart(2,'0')))),
   h('nav',{className:'in-consoleResources','aria-label':'项目资料与记录'},tabs.map(([id,label,name])=>h('button',{key:id,type:'button','aria-label':'查看'+name,'aria-expanded':resourceView===id,'data-selected':resourceView===id,onClick:event=>onResource(resourceView===id?null:id,event.currentTarget)},h('span',null,label),h('b',null,counts[id])))),
   h('button',{type:'button',className:'in-motionToggle','aria-label':motionPaused?'恢复环境动效':'暂停环境动效','aria-pressed':motionPaused,onClick:onToggleMotion,title:motionPaused?'恢复环境动效':'暂停环境动效'},h('svg',{viewBox:'0 0 12 12','aria-hidden':'true'},motionPaused?h('path',{d:'M4 2 10 6 4 10Z'}):h('path',{d:'M4 2v8M8 2v8'}))))
 });
 const Drawer=React.memo(function Drawer({model,graph,tab,onClose,onEntity,onStep}){
  const data=React.useMemo(()=>researchInstrumentation(model,graph),[model,graph]),[limit,setLimit]=React.useState(30);
  const name=tabs.find(row=>row[0]===tab)?.[2]||'研究资料',rows=tab==='sources'?data.sources:tab==='skills'?data.skills:tab==='files'?data.scopeFiles:[...data.scopeCalls].reverse();
  const focus=tab==='files'||tab==='records'?data.focus:null;
  return h('aside',{className:'in-consoleDrawer','aria-label':name,onKeyDown:event=>{if(event.key==='Escape'){event.preventDefault();onClose();}}},
   h('header',null,h('div',null,h('span',null,'PROJECT / '+tab.toUpperCase()),h('h2',null,name,h('small',null,rows.length))),h('button',{type:'button',onClick:onClose,'aria-label':'关闭'+name},'×')),
   h('p',{className:'in-drawerScope'},focus?'第'+(focus.index+1)+'步 · '+focus.title:'当前研究项目'),
   h('div',{className:'in-consoleDrawerBody'},rows.length?h('ol',null,rows.slice(0,limit).map(row=>{
    const skill=tab==='skills',record=tab==='records',title=record?row.title:row.name,detail=skill?data.bindings+' 项项目技能绑定中的 '+row.name:record?row.detail:row.target;
    const owners=skill?data.stages.filter(stage=>stage.skills?.some(item=>item.id===row.id)).map(stage=>String(stage.index+1).padStart(2,'0')+' '+stage.title).join(' / '):null;
    return h('li',{key:row.id},h('button',{type:'button',className:'in-resourceRow','data-kind':tab,onClick:()=>skill?onStep('step:'+row.stepId):onEntity(row.id)},h('span',{className:'in-resourceCode'},skill?'SKILL':record?row.statusLabel:tab==='files'?'FILE':'READ'),h('strong',null,title),h('small',{title:owners||detail},owners||detail)));
   })):h('div',{className:'in-resourceEmpty'},h('strong',null,tab==='sources'?'尚未记录资料读取':tab==='skills'?'尚未绑定技能':tab==='files'?'尚无可查看的交付文件':'尚未记录执行动作'),h('p',null,tab==='sources'?'实际读取的资料会在这里汇总。':tab==='files'?'步骤登记交付文件后，可从这里打开。':'相关记录产生后会出现在这里。')),
   rows.length>limit?h('button',{type:'button',className:'in-resourceMore',onClick:()=>setLimit(value=>value+30)},'继续显示 · 还有 '+(rows.length-limit)+' 条'):null));
 });
 return {Strip,Drawer};
}

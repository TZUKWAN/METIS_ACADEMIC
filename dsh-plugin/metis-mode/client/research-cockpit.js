/** The overview instruments are read-only projections of this project's records. */
import {researchInstrumentation} from './research-instrumentation.js';
import {spatialNodeSize} from './research-space.js';
import {researchScopeOpacity} from './research-navigation.js';
export const COCKPIT_PANEL_SCALE=1.12;
export function researchCockpitScope(node,view){return !view?.expanded&&node.kind!=='step'?0:researchScopeOpacity(node,view);}

export function researchOverviewBounds(graph){
 const stages=(graph?.nodes||[]).filter(node=>node.kind==='step'),bounds={minX:Infinity,maxX:-Infinity,minY:Infinity,maxY:-Infinity,minZ:Infinity,maxZ:-Infinity};
 for(const node of stages){const p=graph.positions.get(node.id),s=spatialNodeSize(node);if(!p)continue;bounds.minX=Math.min(bounds.minX,p.x-s.w*COCKPIT_PANEL_SCALE/2-1.4);bounds.maxX=Math.max(bounds.maxX,p.x+s.w*COCKPIT_PANEL_SCALE/2+1.4);bounds.minY=Math.min(bounds.minY,p.y-s.h*COCKPIT_PANEL_SCALE/2-1.7);bounds.maxY=Math.max(bounds.maxY,p.y+s.h*COCKPIT_PANEL_SCALE/2+1.5);bounds.minZ=Math.min(bounds.minZ,p.z-3.8);bounds.maxZ=Math.max(bounds.maxZ,p.z+1);}
 return stages.length&&Number.isFinite(bounds.minX)?bounds:graph?.bounds||null;
}
export function researchCockpitFacts(model,graph){
 const data=researchInstrumentation(model,graph),active=graph?.byId.get(graph.activeId),owner=active?.stepId?data.stages.find(stage=>stage.stepId===active.stepId):null;
 return{...data,owner,projectCalls:(graph?.fullNodes||[]).filter(node=>node.origin==='activity'&&!node.stepId).length,
  result:graph?.heroId?data.files.find(file=>file.id===graph.heroId)||null:null,
  phaseLabel:({completed:'研究已交付',running:'工具执行中',processing:'模型处理中',waiting:'等待处理',attention:'需要关注',stopped:'本轮已停止',ready:'研究待继续'})[model?.phase]||'读取研究状态',
  route:data.stages.map(stage=>({id:stage.id,stepId:stage.stepId,index:stage.index,title:stage.title,status:stage.status,label:stage.statusLabel,active:stage.stepId===owner?.stepId}))};
}
export function createResearchCockpit(React){
 const h=React.createElement;
 return React.memo(function ResearchCockpit({model,graph,onEntity}){
  const data=React.useMemo(()=>researchCockpitFacts(model,graph),[model,graph]),total=data.stages.length;
  if(!total||graph.presentation.expanded)return null;
  const ticks=Array.from({length:40},(_,i)=>{const a=(-220+i*8)*Math.PI/180,r=i%5?51:48;return h('line',{key:i,x1:64+Math.cos(a)*r,y1:64+Math.sin(a)*r,x2:64+Math.cos(a)*55,y2:64+Math.sin(a)*55});});
  const arc=(index,count)=>{const a=(-216+index*300/count)*Math.PI/180,b=(-216+(index+.78)*300/count)*Math.PI/180,r=42;return'M '+(64+Math.cos(a)*r)+' '+(64+Math.sin(a)*r)+' A 42 42 0 0 1 '+(64+Math.cos(b)*r)+' '+(64+Math.sin(b)*r);};
  return h('section',{className:'in-flightDeck','aria-label':'科研驾驶舱总览','data-state':model.phase},
   h('svg',{className:'in-canopy','aria-hidden':'true',viewBox:'0 0 1000 600',preserveAspectRatio:'none'},
    h('path',{className:'in-canopySolid',d:'M0 0H195L220 18H780L805 0H1000V600H826L798 580H202L174 600H0Z M24 26V550L48 574H165L197 554H803L835 574H950L976 550V26L948 12H815L786 34H214L185 12H52Z',fillRule:'evenodd'}),
    h('path',{className:'in-canopyTrace',d:'M14 98V30L44 9H180L211 29H789L820 9H955L986 30V98 M14 469V558L42 588H165L199 566H801L835 588H957L986 558V469'}),
    h('path',{className:'in-canopyCurrent',d:'M14 98V30L44 9H180L211 29H789L820 9H955L986 30V98'}),
    h('path',{className:'in-canopyReticle',d:'M488 38H512M500 34V46 M488 553H512M500 549V561 M32 291V309M28 300H40 M968 291V309M960 300H972'})),
   h('div',{className:'in-flightHeading','aria-hidden':'true'},h('span',null,'METIS / MISSION CONTROL'),h('i',null),h('span',null,'研究航线 · '+total+' 个阶段')),
   h('aside',{className:'in-flightPort','aria-label':'研究任务仪表'},
    h('span',{className:'in-flightEyebrow'},'MISSION / 研究任务'),
    h('div',{className:'in-missionDial','aria-label':data.submitted+' / '+total+' 步已交付'},
     h('svg',{viewBox:'0 0 128 128','aria-hidden':'true'},h('g',{className:'in-dialTicks'},ticks),h('circle',{className:'in-dialInner',cx:64,cy:64,r:33}),data.route.map((stage,index)=>h('path',{key:stage.id,d:arc(index,total),'data-status':stage.status,'data-active':stage.active}))),
     h('div',null,h('strong',null,String(data.submitted).padStart(2,'0')),h('small',null,'/ '+String(total).padStart(2,'0')),h('span',null,'步骤已交付'))),
    h('div',{className:'in-flightPhase','data-active':data.running},h('i',null),data.phaseLabel),
    h('dl',{className:'in-flightReadouts'},[['研究技能',data.skills.length],['实际动作',data.records],['可查看成果',data.files.length]].map(([label,value])=>h('div',{key:label},h('dt',null,label),h('dd',null,String(value).padStart(2,'0'))))),
    data.owner?h('button',{className:'in-flightOwner',type:'button',onClick:()=>onEntity(data.owner.id),'aria-label':'进入正在执行的步骤'},h('small',null,'当前执行 · '+String(data.owner.index+1).padStart(2,'0')),h('strong',null,data.owner.title)):h('p',{className:'in-flightIdle'},data.phase==='completed'?'全部阶段完成，可进入任意步骤复查。':'点击流程节点，进入对应执行舱。'),
    data.projectCalls?h('button',{className:'in-flightProject',type:'button',onClick:()=>onEntity('engine')},'项目级动作 ',h('b',null,data.projectCalls)):null),
   h('aside',{className:'in-flightStarboard','aria-label':'研究记录与成果接点'},h('span',{className:'in-flightEyebrow'},'EVENT LINK / 执行记录'),
    data.recent.length?h('ol',{className:'in-flightEvents'},data.recent.slice(0,3).map(row=>h('li',{key:row.id,'data-status':row.status},h('button',{type:'button',onClick:()=>onEntity(row.id),title:row.title},h('span',null,row.statusLabel),h('strong',null,row.title),h('small',null,row.ownerIndex===null?'项目整体':'第 '+String(row.ownerIndex+1).padStart(2,'0')+' 步'))))):h('p',{className:'in-flightIdle'},'执行开始后，真实调用将在这里接入。'),
    h('span',{className:'in-flightEyebrow in-flightOutputTitle'},'ARTIFACT / 成果接点'),
    data.files.length?h('ol',{className:'in-flightFiles'},(data.result?[data.result,...data.files.filter(row=>row.id!==data.result.id)]:data.files).slice(0,2).map(file=>h('li',{key:file.id},h('button',{type:'button',onClick:()=>onEntity(file.id),'aria-label':'驾驶舱打开成果 '+file.name,title:file.name},h('span',null,file.name.split('.').at(-1).toUpperCase()),h('strong',null,file.name))))):h('p',{className:'in-flightIdle'},'步骤交付后，文件将接入此处。')),
   h('div',{className:'in-flightKeel'},h('span',null,'RESEARCH NAVIGATION'),h('i',null),h('span',null,'拖动环绕 · 滚轮缩放 · 点击进入步骤')));
 });
}

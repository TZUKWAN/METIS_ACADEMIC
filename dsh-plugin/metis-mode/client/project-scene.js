var wd={not_started:"未开始",working:"处理中",checking:"核验中",needs_revision:"待改进",needs_recheck:"待复核",blocked:"等待处理",passed:"待交付",submitted:"已交付"};function Yr(i,e=null){let t=Array.isArray(i?.steps)?i.steps:[],n=Array.isArray(i?.activity)?i.activity:[],r=n.filter(d=>d.status==="running"),s=n.at(-1)||null,a=i?.revision?.phase==="awaiting_downstream"||i?.revision?.decision?.dispatch==="pending",o=n.findLast(d=>d.jobId&&["waiting","unverified"].includes(d.status)),l=i?.execution?.running===!0,c=new Set(r.map(d=>d.stepId).filter(Boolean)),h=t.filter(d=>d.status==="submitted").length,f=t.filter(d=>["needs_revision","needs_recheck","blocked"].includes(d.status)),u=!l&&!r.length&&["failed","refused","needs_revision"].includes(s?.status),p=t.length>0&&h===t.length,g=i?.status!=="ready"?"unavailable":r.length?"running":a?"waiting":l?"processing":o?"waiting":u||f.length?"attention":s?.status==="cancelled"?"stopped":p?"completed":"ready",v=g==="unavailable"?"正在读取项目":r.length?r.at(-1).label:a?"请选择后续步骤是否重做":l?"研究助手正在处理":o?.status==="unverified"?"上次后台任务状态待确认":o?"等待后台任务回执":u?"最近调用需要处理":f.length?"当前成果需要核验或改进":g==="stopped"?"本轮调用已停止":p?"全部步骤已交付":s?.status==="interrupted"?"上次执行已中断":"等待开始或继续研究",m=new Set;for(let d of t)for(let _ of d.delivery?.artifacts||[])_.availability==="file"&&m.add(_.path);return{id:i?.id||"",name:i?.name||"",modeName:i?.modeName||"",phase:g,headline:v,target:r.at(-1)?.target||"",activeCalls:r,activities:n,recent:s,delivered:h,total:t.length,files:m.size,attention:f.length,nodes:t.map((d,_)=>({id:d.id,title:d.title,index:_,status:d.status,purpose:d.purpose||"",expected:d.expected||"",delivery:d.delivery||null,feedback:d.feedback||[],label:d.delivery?.manuallyEditedAt&&d.status!=="submitted"?"手动修改待核验":wd[d.status]||"状态未知",active:c.has(d.id),viewed:d.id===e,loop:d.loop===!0,recentCall:n.findLast(M=>M.stepId===d.id)||null,recentChecks:n.filter(M=>M.stepId===d.id&&M.kind==="review"&&M.invoked!==!1).length}))}}var fa=`
.mrv.ion-display{--ion-text:#ece2e1;--ion-muted:#af969c;--ion-accent:#ffae78;position:relative;container-type:inline-size;isolation:isolate;overflow:hidden;margin:0 0 22px;border:1px solid #46303b;border-radius:7px;background:#0b090f;color:var(--ion-text);font-family:"Segoe UI","Microsoft YaHei UI",sans-serif;box-shadow:0 18px 60px #0002}
.ion-display button{font:inherit;cursor:pointer}.ion-display button:focus-visible{outline:2px solid #ffca96;outline-offset:3px}.ion-display button:disabled{opacity:.45;cursor:default}
.ion-head{position:relative;z-index:4;display:flex;align-items:center;gap:12px;padding:11px 18px;border-bottom:1px solid #47303b;background:linear-gradient(100deg,#181018,#0c0a10)}.ion-brand{display:flex;align-items:baseline;gap:10px;min-width:0}.ion-brand strong{font-size:12px;font-weight:550;letter-spacing:.04em;color:#e7d8d8}.ion-brand small{color:#957985;font:9px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em}.ion-phase{display:inline-flex;align-items:center;gap:6px;color:#c5a7a8;font-size:10px}.ion-phase::before{content:'';width:4px;height:4px;background:currentColor;box-shadow:0 0 9px currentColor;border-radius:50%}.ion-display[data-phase=running] .ion-phase,.ion-display[data-phase=processing] .ion-phase{color:#ffbb7a}.ion-display[data-phase=attention] .ion-phase{color:#ffd080}
.ion-actions{display:flex;align-items:center;gap:5px;margin-left:auto}.ion-icon{display:inline-flex;gap:5px;align-items:center;justify-content:center;padding:6px 8px;border:1px solid #563b44;background:#24171d99;color:#ceafb0;border-radius:3px;font-size:11px;line-height:1.2;min-height:28px}.ion-icon:hover{border-color:#c47f5e;background:#382123;color:#ffe4d0}.ion-icon[aria-pressed=true]{color:#ffc897;border-color:#aa6c4d;background:#38201c}
.ion-frame{position:relative;height:580px;background:#08070d;overflow:hidden}.ion-display[data-expanded=true] .ion-frame{height:780px}.ion-world{position:absolute;inset:0;overflow:hidden;touch-action:none;cursor:grab}.ion-world:active{cursor:grabbing}.ion-gl,.ion-labels{position:absolute;inset:0;width:100%;height:100%;display:block}.ion-labels,.ion-labels>div{pointer-events:none}.ion-labels .ion-chip,.ion-labels .ion-engine{pointer-events:auto}
.ion-frame::after{content:'';position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(180deg,#08070d40,transparent 30%,transparent 70%,#08070d9e),radial-gradient(ellipse 83% 76% at 50% 48%,transparent 55%,#08070da6)}
.ion-hero{position:absolute;z-index:3;left:23px;top:21px;pointer-events:none;text-shadow:0 2px 18px #08070d}.ion-eyebrow{display:flex;gap:9px;align-items:center;margin:0 0 8px;color:#ba8274;font:9px/1 ui-monospace,Consolas,monospace;letter-spacing:.15em}.ion-eyebrow::before{content:'';width:17px;height:1px;background:#c57c54;box-shadow:0 0 8px #fa783c50}.ion-hero h2{margin:0;font:500 clamp(30px,5.3cqw,52px)/.98 "Segoe UI",sans-serif;letter-spacing:-.045em;color:#f2dfd6}.ion-hero h2 span{color:#ff9c5b}.ion-hero p{margin:8px 0 0;font-size:10px;letter-spacing:.3em;color:#d2aca0}
.ion-overview{position:absolute;top:25px;right:24px;left:auto;display:flex;gap:24px;z-index:3;pointer-events:none;text-shadow:0 2px 12px #08070d}.ion-kpi{display:grid;gap:5px}.ion-kpi strong{font:350 29px/1 "Segoe UI",sans-serif;color:#e7d3cd;letter-spacing:-.04em;font-variant-numeric:tabular-nums}.ion-kpi strong span{font-size:12px;letter-spacing:0;color:#b89796}.ion-kpi small{font-size:9px;letter-spacing:.04em;color:#b0959b}.ion-caption{display:none}
.ion-chip{box-sizing:border-box;position:relative;width:320px;height:166px;padding:12px 14px;background:linear-gradient(140deg,#28171feF,#140e16f5 70%);border:1px solid color-mix(in srgb,var(--ion-node) 75%,#271824);border-radius:1px;color:#e4d2d1;text-align:left;backface-visibility:hidden;box-shadow:inset 0 1px 0 #ffe5cb13,0 7px 22px #0006;display:flex;flex-direction:column;gap:7px;overflow:hidden}
.ion-chip::before,.ion-chip::after{content:'';position:absolute;width:12px;height:12px;border:2px solid var(--ion-node);opacity:.88}.ion-chip::before{left:-1px;top:-1px;border-right:0;border-bottom:0}.ion-chip::after{right:-1px;bottom:-1px;border-left:0;border-top:0}.ion-chip:hover,.ion-chip[data-viewed=true]{border-color:#ffd1ab;background:linear-gradient(145deg,#48251ff2,#1f1319f7);box-shadow:inset 0 0 32px #db773b15,0 0 28px #ed713c2b}.ion-chip[data-active=true]{border-color:#ffc26d;background:linear-gradient(140deg,#512b1ff0,#251316f5);box-shadow:inset 0 0 32px #f88c3d30,0 0 35px #f2763945}
.ion-chip-head{display:flex;align-items:center;gap:10px;line-height:1;flex:none}.ion-chip-index{font:20px/1 ui-monospace,Consolas,monospace;letter-spacing:.08em;color:var(--ion-node)}.ion-chip-state{margin-left:auto;font-size:11px;color:var(--ion-node);letter-spacing:.05em}.ion-chip-title{font-size:20px;font-weight:550;line-height:1.35;color:#f2e4de;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;flex:none}.ion-chip-purpose{font-size:12px;line-height:1.5;color:#bc9e9e;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.ion-chip-foot{display:block;font-size:10px;color:#c28e7b;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;margin-top:auto;border-top:1px solid #8a56404d;padding-top:6px;flex:none}
.ion-engine{box-sizing:border-box;width:118px;padding:13px 9px;border:1px solid #bd7d55;background:#28181ed9;box-shadow:0 0 23px #d4763e25;color:#edb598;display:grid;gap:6px;text-align:center;border-radius:1px;backface-visibility:hidden}.ion-engine[data-busy=true]{border-color:#ffd59d;background:#4b271dd9;box-shadow:0 0 30px #ee8f494a}.ion-engine strong{font:20px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em}.ion-engine span{font-size:7px;color:#b58a7f;letter-spacing:.11em}
.ion-live{position:absolute;left:22px;right:22px;bottom:18px;display:flex;gap:11px;align-items:center;z-index:3;pointer-events:none;padding:11px 14px;border-left:2px solid #f59b60;background:linear-gradient(90deg,#23131de8,#160e1877 70%,transparent);backdrop-filter:blur(6px)}.ion-live>div{min-width:0}.ion-live strong{display:block;font-size:13px;font-weight:500;color:#f3d3bf;line-height:1.6}.ion-live small{display:block;font-size:10px;color:#bf9b9e;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:100%}.ion-live::before{content:'';width:5px;height:5px;flex:none;background:#ffbb79;box-shadow:0 0 15px #ffa05a;border-radius:50%}.ion-display[data-phase=running] .ion-live::before{animation:ion-live-pulse 1.8s ease-in-out infinite}.ion-controlsHint{position:absolute;right:23px;bottom:89px;color:#b38c86;font-size:9px;letter-spacing:.04em;pointer-events:none;z-index:3}.ion-loader{position:absolute;inset:0;display:grid;place-content:center;text-align:center;gap:10px;z-index:5;background:#0c0913ed;color:#d1b2b4;font-size:12px}.ion-loader .ion-icon{justify-self:center}.ion-loader strong{font-weight:450;letter-spacing:.1em}.ion-loader small{color:#ad8c98;max-width:360px;line-height:1.7;padding:0 12px}
.ion-fallbackGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-top:10px;padding:0 18px;max-width:600px;max-height:340px;overflow:auto}.ion-fallbackStep{display:grid;grid-template-columns:20px minmax(0,1fr);gap:5px 8px;text-align:left;padding:10px;border:1px solid #805445;background:#24151f;color:#ebd3ce;border-radius:3px}.ion-fallbackStep>span{grid-row:span 2;font:12px ui-monospace,monospace;color:#ffbc8b}.ion-fallbackStep>strong{font-size:11px;font-weight:500}.ion-fallbackStep>small{font-size:9px;color:#c19ea1}.ion-fallbackStep[aria-pressed=true]{border-color:#ffc28d;background:#42231f}
.ion-deck{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);background:linear-gradient(120deg,#1b1019,#100c15);border-top:1px solid #52313a}.ion-panel{min-width:0;padding:15px 18px}.ion-panel+.ion-panel{border-left:1px solid #47303b}.ion-panelTitle{display:flex;gap:7px;align-items:center;font-size:10px;color:#c28d7b;letter-spacing:.08em;margin:0 0 9px;font-weight:500}.ion-focusTitle{display:flex;align-items:center;gap:8px;margin-bottom:7px}.ion-focusTitle strong{font-size:13px;line-height:1.65;color:#eed9d4;font-weight:500;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ion-focusTitle small{font-size:10px;color:#c6a59b;flex:none}.ion-purpose{font-size:11px;line-height:1.8;color:#c3a5ac;margin:0 0 10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.ion-focusActions{display:flex;gap:5px;flex-wrap:wrap}.ion-file{font-size:10px;color:#e1b090;display:block;background:transparent;border:0;padding:4px 0;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ion-event{display:grid;grid-template-columns:6px minmax(0,1fr) auto;gap:8px;align-items:start;margin-top:8px;font-size:11px;line-height:1.5}.ion-event i{width:4px;height:4px;margin-top:6px;border-radius:50%;background:#ca8c6a}.ion-event[data-state=failed] i{background:#ffa178}.ion-event[data-state=succeeded] i{background:#92d6b7}.ion-event strong{display:block;font-size:11px;color:#e0c9c8;font-weight:450}.ion-event small{display:block;color:#b0929e;font-size:10px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ion-event time{font:9px/1.7 ui-monospace,monospace;color:#af8992}.ion-empty{font-size:11px;line-height:1.8;color:#b198a5;margin:4px 0}
.ion-records{background:var(--mr-paper,var(--mm-surface));color:var(--mm-ink);border-top:1px solid #52313a;padding:0 15px}.ion-records>summary{font-size:11px;cursor:pointer;padding:11px 0;color:var(--mm-muted)}.ion-records .mr-live{border:0;margin:0;padding:0 0 12px;background:transparent}.ion-records .mr-live>header{display:none}.ion-records .mr-liveHeadline{font-size:12px}
@keyframes ion-live-pulse{50%{box-shadow:0 0 20px #ffbd6a;opacity:.5}}@media(prefers-reduced-motion:reduce){.ion-display *{animation:none!important;scroll-behavior:auto!important}}
@container(max-width:700px){.ion-head{padding:10px 12px;gap:8px}.ion-brand small{display:none}.ion-actions .ion-icon{padding:6px}.ion-actions .ion-label{display:none}.ion-frame{height:620px}.ion-hero{left:17px;top:20px}.ion-hero h2{font-size:33px}.ion-overview{right:17px;top:26px;gap:16px}.ion-kpi strong{font-size:23px}.ion-kpi small{font-size:8px}.ion-kpi:nth-child(3){display:none}.ion-deck{grid-template-columns:1fr}.ion-panel+.ion-panel{border-left:0;border-top:1px solid #47303b}.ion-display[data-expanded=true] .ion-frame{height:800px}.ion-live{left:14px;right:14px}.ion-controlsHint{right:15px;font-size:8px}.ion-panel{padding:13px}}
`;function Sd(i,{Icon:e,createIonWorld:t,researchSceneState:n,workbenchCss:r=""}){let s=i.createElement,a=fa,o={unavailable:"未就绪",running:"执行中",processing:"处理中",waiting:"待确认",attention:"需处理",stopped:"已停止",completed:"已交付",ready:"待继续"};return function({project:c,viewedId:h,viewedManually:f=!1,onInspect:u,onFocusChat:p,onOpenFile:g,onDetails:v,children:m}){let d=n(c,h),_=i.useRef(null),M=i.useRef(null),y=i.useRef(d),A=i.useRef({onInspect:u,onFocusChat:p}),[T,b]=i.useState(!1),[S,F]=i.useState(!0),[L,N]=i.useState("loading"),[q,te]=i.useState(null),[D,K]=i.useState(0),[$,B]=i.useState(!0);y.current=d,A.current={onInspect:u,onFocusChat:p},i.useLayoutEffect(()=>{if(!S||!_.current)return;let Y=_.current,ke=!0,Ue=null,Q=null,Le=null;N("loading"),te(null);try{Ue=t({host:_.current,onPick:G=>A.current.onInspect(G),onFocusChat:()=>A.current.onFocusChat(),onState:G=>{ke&&(G.renderer&&N(G.renderer),typeof G.follow=="boolean"&&B(G.follow))},onError:G=>{ke&&te(G)}}),M.current=Ue,Ue.update(y.current);let fe=()=>{let G=_.current?.getBoundingClientRect();G?.width&&G.height&&Ue.resize(G.width,G.height)};Q=new ResizeObserver(fe),Q.observe(_.current),fe(),Le=new IntersectionObserver(G=>Ue.visible(G[0]?.isIntersecting===!0)),Le.observe(_.current)}catch(fe){ke&&(te(fe.message),N("error"))}return()=>{ke=!1,Q?.disconnect(),Le?.disconnect(),Ue?.dispose(),Y.replaceChildren(),M.current=null}},[S,D]),i.useEffect(()=>{M.current?.update(d)},[c,h]),i.useEffect(()=>{f&&h&&M.current?.focus(h)},[h,f]);let pe=d.activeCalls.at(-1)?.stepId,W=d.nodes.find(Y=>Y.id===h)||d.nodes.find(Y=>Y.id===pe)||d.nodes[0],se=Y=>Y?new Date(Y).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return s("section",{className:"mrv ion-display","aria-label":"研究现场","data-theme":"ion","data-phase":d.phase,"data-expanded":T,"data-graphics":L},s("style",null,a+r),s("header",{className:"ion-head"},s("div",{className:"ion-brand"},s("strong",null,"研究现场"),s("small",null,"METIS / LIVE CIRCUIT")),s("span",{className:"ion-phase",role:"status"},o[d.phase]),s("div",{className:"ion-actions"},s("button",{type:"button",className:"ion-icon","aria-label":"全景视角",onClick:()=>M.current?.home()},s(e,{name:"layers",size:13}),s("span",{className:"ion-label"},"全景")),s("button",{type:"button",className:"ion-icon","aria-label":"跟随实际执行","aria-pressed":$,onClick:()=>M.current?.follow(!$)},s(e,{name:"activity",size:13}),s("span",{className:"ion-label"},"跟随")),s("button",{type:"button",className:"ion-icon","aria-label":T?"缩小研究现场":"放大研究现场","aria-pressed":T,onClick:()=>b(Y=>!Y)},s(e,{name:"expand",size:13})),s("button",{type:"button",className:"ion-icon","aria-label":S?"收起离子回路":"展开离子回路","aria-expanded":S,onClick:()=>F(Y=>!Y)},s(e,{name:S?"up":"down",size:13})))),S?s("div",{className:"ion-frame"},s("div",{className:"ion-world",ref:_,style:{visibility:q?"hidden":void 0},"aria-label":"三维研究步骤电路"}),s("div",{className:"ion-overview"},s("div",{className:"ion-kpi"},s("strong",null,d.delivered,s("span",null," / "+d.total)),s("small",null,"步骤已交付")),s("div",{className:"ion-kpi"},s("strong",null,d.files),s("small",null,"真实交付文件")),s("div",{className:"ion-kpi"},s("strong",null,d.attention),s("small",null,"待处理步骤")),s("div",{className:"ion-caption"},s("b",null,d.modeName),"节点来自本项目的固定研究流程")),s("div",{className:"ion-controlsHint"},"拖动转动视角 · 滚轮缩放 · 点卡片进入步骤"),s("div",{className:"ion-live"},s("div",null,s("strong",{"data-scene-headline":!0},d.headline),s("small",{title:d.target},d.target||"实际调用开始后，链路与光球随所属步骤点亮"))),L==="loading"||q?s("div",{className:"ion-loader",role:q?"alert":"status"},s("strong",null,q?"三维离子回路未能显示":"正在建立研究链路…"),s("small",null,q||"载入本地场景与实际步骤"),q?s(i.Fragment,null,s("button",{type:"button",className:"ion-icon",onClick:()=>K(Y=>Y+1)},"重新初始化场景"),s("div",{className:"ion-fallbackGrid","aria-label":"研究步骤"},d.nodes.map(Y=>s("button",{type:"button",className:"ion-fallbackStep",key:Y.id,"data-scene-step":Y.id,"aria-pressed":Y.viewed,onClick:()=>u(Y.id)},s("span",null,String(Y.index+1).padStart(2,"0")),s("strong",null,Y.title),s("small",null,Y.label))))):null):null):null,s("div",{className:"ion-deck"},s("section",{className:"ion-panel","aria-label":"步骤焦点"},s("h3",{className:"ion-panelTitle"},s(e,{name:"layers",size:12}),"STEP FOCUS / 步骤焦点"),W?s(i.Fragment,null,s("div",{className:"ion-focusTitle"},s("strong",null,String(W.index+1).padStart(2,"0")+" · "+W.title),s("small",null,W.label)),s("p",{className:"ion-purpose"},W.purpose||W.expected||"此步骤的目标与交付以模式配置为准。"),W.delivery?.artifacts?.filter(Y=>Y.availability==="file").slice(0,3).map(Y=>s("button",{key:Y.path,type:"button",className:"ion-file",title:Y.path,onClick:()=>g?.(W.id,W.delivery.artifacts.indexOf(Y),Y)},"↗ "+Y.name)),s("div",{className:"ion-focusActions"},s("button",{type:"button",className:"ion-icon",onClick:()=>{u(W.id),p()}},"提出修改意见"),s("button",{type:"button",className:"ion-icon",onClick:()=>v?.(W.id)},"查看步骤详情"))):s("p",{className:"ion-empty"},"当前项目未记录研究步骤。")),s("section",{className:"ion-panel","aria-label":"实际调用动态"},s("h3",{className:"ion-panelTitle"},s(e,{name:"activity",size:12}),"EXECUTION FEED / 实际调用"),d.activities.length?d.activities.slice(-3).reverse().map(Y=>s("div",{className:"ion-event",key:Y.callId,"data-state":Y.status},s("i",{"aria-hidden":!0}),s("div",null,s("strong",null,Y.label),s("small",{title:Y.target},Y.target||Y.tool)),s("time",{dateTime:Y.startedAt||Y.finishedAt},se(Y.startedAt||Y.finishedAt)))):s("p",{className:"ion-empty"},"暂无执行记录。研究开始后显示真实工具、读取对象与核验结果。"))),m?s("details",{className:"ion-records"},s("summary",null,"完整执行记录与调用详情"),m):null)}}var Ii={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Pi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hh=0,Tc=1,uh=2;var Ws=1,ph=2,Ur=3,Li=0,tn=1,Vn=2,li=0,Fr=1,nn=2,Ac=3,Cc=4,fh=5;var Zi=100,mh=101,gh=102,xh=103,vh=104,bh=200,_h=201,yh=202,wh=203,Rc=204,Ic=205,Sh=206,Mh=207,Eh=208,Th=209,Ah=210,Ch=211,Rh=212,Ih=213,Ph=214,Ja=0,ja=1,$a=2,yr=3,Qa=4,eo=5,to=6,no=7,Pc=0,Lh=1,Dh=2,Gn=0,Xs=1,Ys=2,qs=3,Ki=4,Zs=5,Ks=6,Js=7;var Lc=300,Ji=301,Or=302,Lo=303,Do=304,io=1e3,On=1001,ro=1002,zt=1003,Nh=1004;var js=1005;var $t=1006,No=1007;var ci=1008;var on=1009,Dc=1010,Nc=1011,Br=1012,ko=1013,Nn=1014,wn=1015,Vt=1016,Uo=1017,Fo=1018,ji=1020,kc=35902,Uc=35899,Fc=1021,Oc=1022,kn=1023,ni=1026,di=1027,Oo=1028,Bo=1029,Di=1030,zo=1031;var Ho=1033,$s=33776,Qs=33777,ea=33778,ta=33779,Vo=35840,Go=35841,Wo=35842,Xo=35843,Yo=36196,qo=37492,Zo=37496,Ko=37488,Jo=37489,na=37490,jo=37491,$o=37808,Qo=37809,el=37810,tl=37811,nl=37812,il=37813,rl=37814,sl=37815,al=37816,ol=37817,ll=37818,cl=37819,dl=37820,hl=37821,ul=36492,pl=36494,fl=36495,ml=36283,gl=36284,ia=36285,xl=36286;var os=2300,so=2301,Za=2302,fc=2303,mc=2400,gc=2401,xc=2402;var kh=3200;var vl=0,Uh=1,hi="",jt="srgb",ls="srgb-linear",cs="linear",mt="srgb";var Ka=7680;var Fh=519,Oh=512,Bh=513,zh=514,Bc=515,Hh=516,Vh=517,zc=518,Hc=519,Vc=35044;var Gc="300 es",bn=2e3,wr=2001;function xp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function vp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ds(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gh(){let i=ds("canvas");return i.style.display="block",i}var Md={},Sr=null;function hs(...i){let e="THREE."+i.shift();Sr?Sr("log",e,...i):console.log(e,...i)}function Wh(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function tt(...i){i=Wh(i);let e="THREE."+i.shift();if(Sr)Sr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function it(...i){i=Wh(i);let e="THREE."+i.shift();if(Sr)Sr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Gi(...i){let e=i.join(" ");e in Md||(Md[e]=!0,tt(...i))}function Xh(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var Yh={[Ja]:Ja,[$a]:to,[Qa]:Qa,[yr]:eo,[ja]:ja,[to]:$a,[no]:no,[eo]:yr},In=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ed=1234567,br=Math.PI/180,Mr=180/Math.PI;function ui(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function ot(i,e,t){return Math.max(e,Math.min(t,i))}function Wc(i,e){return(i%e+e)%e}function bp(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function _p(i,e,t){return i!==e?(t-i)/(e-i):0}function rs(i,e,t){return(1-t)*i+t*e}function yp(i,e,t,n){return rs(i,e,1-Math.exp(-t*n))}function wp(i,e=1){return e-Math.abs(Wc(i,e*2)-e)}function Sp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Mp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Ep(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Tp(i,e){return i+Math.random()*(e-i)}function Ap(i){return i*(.5-Math.random())}function Cp(i){i!==void 0&&(Ed=i);let e=Ed+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Rp(i){return i*br}function Ip(i){return i*Mr}function Pp(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Lp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Xc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Dp(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),f=s((e-n)/2),u=a((e-n)/2),p=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*h,l*f,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*f,o*c);break;case"ZXZ":i.set(l*f,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*h,o*c);break;default:tt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function bl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Yc(i,e){if(e.constructor===Float32Array)return i;let t=bl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function qc(i,e){if(e.constructor===Float32Array)return i;let t=bl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var Wn={DEG2RAD:br,RAD2DEG:Mr,generateUUID:ui,clamp:ot,euclideanModulo:Wc,mapLinear:bp,inverseLerp:_p,lerp:rs,damp:yp,pingpong:wp,smoothstep:Sp,smootherstep:Mp,randInt:Ep,randFloat:Tp,randFloatSpread:Ap,seededRandom:Cp,degToRad:Rp,radToDeg:Ip,isPowerOfTwo:Pp,ceilPowerOfTwo:Lp,floorPowerOfTwo:Xc,setQuaternionFromProperEuler:Dp,normalize:qc,denormalize:Yc},we=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],f=n[r+3],u=s[a+0],p=s[a+1],g=s[a+2],v=s[a+3];if(f!==v||l!==u||c!==p||h!==g){let m=l*u+c*p+h*g+f*v;m<0&&(u=-u,p=-p,g=-g,v=-v,m=-m);let d=1-o;if(m<.9995){let _=Math.acos(m),M=Math.sin(_);d=Math.sin(d*_)/M,o=Math.sin(o*_)/M,l=l*d+u*o,c=c*d+p*o,h=h*d+g*o,f=f*d+v*o}else{l=l*d+u*o,c=c*d+p*o,h=h*d+g*o,f=f*d+v*o;let _=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=_,c*=_,h*=_,f*=_}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],f=s[a],u=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+h*f+l*p-c*u,e[t+1]=l*g+h*u+c*f-o*p,e[t+2]=c*g+h*p+o*u-l*f,e[t+3]=h*g-o*f-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),f=o(s/2),u=l(n/2),p=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=u*h*f+c*p*g,this._y=c*p*f-u*h*g,this._z=c*h*g+u*p*f,this._w=c*h*f-u*p*g;break;case"YXZ":this._x=u*h*f+c*p*g,this._y=c*p*f-u*h*g,this._z=c*h*g-u*p*f,this._w=c*h*f+u*p*g;break;case"ZXY":this._x=u*h*f-c*p*g,this._y=c*p*f+u*h*g,this._z=c*h*g+u*p*f,this._w=c*h*f-u*p*g;break;case"ZYX":this._x=u*h*f-c*p*g,this._y=c*p*f+u*h*g,this._z=c*h*g-u*p*f,this._w=c*h*f+u*p*g;break;case"YZX":this._x=u*h*f+c*p*g,this._y=c*p*f+u*h*g,this._z=c*h*g-u*p*f,this._w=c*h*f-u*p*g;break;case"XZY":this._x=u*h*f-c*p*g,this._y=c*p*f-u*h*g,this._z=c*h*g+u*p*f,this._w=c*h*f+u*p*g;break;default:tt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],f=t[10],u=n+o+f;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>f){let p=2*Math.sqrt(1+n-o-f);this._w=(h-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>f){let p=2*Math.sqrt(1+o-n-f);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+f-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Td.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Td.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),f=2*(s*n-a*t);return this.x=t+l*c+a*f-o*h,this.y=n+l*h+o*c-s*f,this.z=r+l*f+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Vl.copy(this).projectOnVector(e),this.sub(Vl)}reflect(e){return this.sub(Vl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Vl=new R,Td=new Qt,st=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],p=n[5],g=n[8],v=r[0],m=r[3],d=r[6],_=r[1],M=r[4],y=r[7],A=r[2],T=r[5],b=r[8];return s[0]=a*v+o*_+l*A,s[3]=a*m+o*M+l*T,s[6]=a*d+o*y+l*b,s[1]=c*v+h*_+f*A,s[4]=c*m+h*M+f*T,s[7]=c*d+h*y+f*b,s[2]=u*v+p*_+g*A,s[5]=u*m+p*M+g*T,s[8]=u*d+p*y+g*b,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=h*a-o*c,u=o*l-h*s,p=c*s-a*l,g=t*f+n*u+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=f*v,e[1]=(r*c-h*n)*v,e[2]=(o*n-r*a)*v,e[3]=u*v,e[4]=(h*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=p*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Gi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Gl.makeScale(e,t)),this}rotate(e){return Gi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Gl.makeRotation(-e)),this}translate(e,t){return Gi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Gl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Gl=new st,Ad=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cd=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Np(){let i={enabled:!0,workingColorSpace:ls,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===mt&&(r.r=ti(r.r),r.g=ti(r.g),r.b=ti(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===mt&&(r.r=_r(r.r),r.g=_r(r.g),r.b=_r(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===hi?cs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[a].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ls]:{primaries:e,whitePoint:n,transfer:cs,toXYZ:Ad,fromXYZ:Cd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:e,whitePoint:n,transfer:mt,toXYZ:Ad,fromXYZ:Cd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}}),i}var ht=Np();function ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _r(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var tr,ao=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{tr===void 0&&(tr=ds("canvas")),tr.width=e.width,tr.height=e.height;let r=tr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=tr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ds("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ti(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ti(t[n]/255)*255):t[n]=ti(t[n]);return{data:t,width:e.width,height:e.height}}else return tt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},kp=0,Er=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:kp++}),this.uuid=ui(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Wl(r[a].image)):s.push(Wl(r[a]))}else s=Wl(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Wl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ao.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(tt("Texture: Unable to serialize Texture."),{})}var Up=0,Xl=new R,en=class i extends In{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=On,r=On,s=$t,a=ci,o=kn,l=on,c=i.DEFAULT_ANISOTROPY,h=hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=ui(),this.name="",this.source=new Er(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Xl).x}get height(){return this.source.getSize(Xl).y}get depth(){return this.source.getSize(Xl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){tt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){tt(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case io:e.x=e.x-Math.floor(e.x);break;case On:e.x=e.x<0?0:1;break;case ro:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case io:e.y=e.y-Math.floor(e.y);break;case On:e.y=e.y<0?0:1;break;case ro:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=Lc;en.DEFAULT_ANISOTROPY=1;var At=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],h=l[4],f=l[8],u=l[1],p=l[5],g=l[9],v=l[2],m=l[6],d=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,y=(p+1)/2,A=(d+1)/2,T=(h+u)/4,b=(f+v)/4,S=(g+m)/4;return M>y&&M>A?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=T/n,s=b/n):y>A?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=T/r,s=S/r):A<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),n=b/s,r=S/s),this.set(n,r,s,t),this}let _=Math.sqrt((m-g)*(m-g)+(f-v)*(f-v)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(f-v)/_,this.z=(u-h)/_,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},oo=class extends In{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$t,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new At(0,0,e,t),this.scissorTest=!1,this.viewport=new At(0,0,e,t),this.textures=[];let r=n.count;for(let s=0;s<r;s++)this.textures[s]=new en({width:e,height:t,depth:n.depth}),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:$t,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Er(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Nt=class extends oo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},us=class extends en{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=zt,this.minFilter=zt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var lo=class extends en{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=zt,this.minFilter=zt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var dt=class i{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,l,c,h,f,u,p,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,f,u,p,g,v,m)}set(e,t,n,r,s,a,o,l,c,h,f,u,p,g,v,m){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=f,d[14]=u,d[3]=p,d[7]=g,d[11]=v,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/nr.setFromMatrixColumn(e,0).length(),s=1/nr.setFromMatrixColumn(e,1).length(),a=1/nr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){let u=a*h,p=a*f,g=o*h,v=o*f;t[0]=l*h,t[4]=-l*f,t[8]=c,t[1]=p+g*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,p=l*f,g=c*h,v=c*f;t[0]=u+v*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,p=l*f,g=c*h,v=c*f;t[0]=u-v*o,t[4]=-a*f,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,p=a*f,g=o*h,v=o*f;t[0]=l*h,t[4]=g*c-p,t[8]=u*c+v,t[1]=l*f,t[5]=v*c+u,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-u*f,t[8]=g*f+p,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*f+g,t[10]=u-v*f}else if(e.order==="XZY"){let u=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-f,t[8]=c*h,t[1]=u*f+v,t[5]=a*h,t[9]=p*f-g,t[2]=g*f-p,t[6]=o*h,t[10]=v*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Fp,e,Op)}lookAt(e,t,n){let r=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),vi.crossVectors(n,cn),vi.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),vi.crossVectors(n,cn)),vi.normalize(),ma.crossVectors(cn,vi),r[0]=vi.x,r[4]=ma.x,r[8]=cn.x,r[1]=vi.y,r[5]=ma.y,r[9]=cn.y,r[2]=vi.z,r[6]=ma.z,r[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],p=n[13],g=n[2],v=n[6],m=n[10],d=n[14],_=n[3],M=n[7],y=n[11],A=n[15],T=r[0],b=r[4],S=r[8],F=r[12],L=r[1],N=r[5],q=r[9],te=r[13],D=r[2],K=r[6],$=r[10],B=r[14],pe=r[3],W=r[7],se=r[11],Y=r[15];return s[0]=a*T+o*L+l*D+c*pe,s[4]=a*b+o*N+l*K+c*W,s[8]=a*S+o*q+l*$+c*se,s[12]=a*F+o*te+l*B+c*Y,s[1]=h*T+f*L+u*D+p*pe,s[5]=h*b+f*N+u*K+p*W,s[9]=h*S+f*q+u*$+p*se,s[13]=h*F+f*te+u*B+p*Y,s[2]=g*T+v*L+m*D+d*pe,s[6]=g*b+v*N+m*K+d*W,s[10]=g*S+v*q+m*$+d*se,s[14]=g*F+v*te+m*B+d*Y,s[3]=_*T+M*L+y*D+A*pe,s[7]=_*b+M*N+y*K+A*W,s[11]=_*S+M*q+y*$+A*se,s[15]=_*F+M*te+y*B+A*Y,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],f=e[6],u=e[10],p=e[14],g=e[3],v=e[7],m=e[11],d=e[15],_=l*p-c*u,M=o*p-c*f,y=o*u-l*f,A=a*p-c*h,T=a*u-l*h,b=a*f-o*h;return t*(v*_-m*M+d*y)-n*(g*_-m*A+d*T)+r*(g*M-v*A+d*b)-s*(g*y-v*T+m*b)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(s*h-o*l)+r*(s*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],u=e[10],p=e[11],g=e[12],v=e[13],m=e[14],d=e[15],_=t*o-n*a,M=t*l-r*a,y=t*c-s*a,A=n*l-r*o,T=n*c-s*o,b=r*c-s*l,S=h*v-f*g,F=h*m-u*g,L=h*d-p*g,N=f*m-u*v,q=f*d-p*v,te=u*d-p*m,D=_*te-M*q+y*N+A*L-T*F+b*S;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let K=1/D;return e[0]=(o*te-l*q+c*N)*K,e[1]=(r*q-n*te-s*N)*K,e[2]=(v*b-m*T+d*A)*K,e[3]=(u*T-f*b-p*A)*K,e[4]=(l*L-a*te-c*F)*K,e[5]=(t*te-r*L+s*F)*K,e[6]=(m*y-g*b-d*M)*K,e[7]=(h*b-u*y+p*M)*K,e[8]=(a*q-o*L+c*S)*K,e[9]=(n*L-t*q-s*S)*K,e[10]=(g*T-v*y+d*_)*K,e[11]=(f*y-h*T-p*_)*K,e[12]=(o*F-a*N-l*S)*K,e[13]=(t*N-n*F+r*S)*K,e[14]=(v*M-g*A-m*_)*K,e[15]=(h*A-f*M+u*_)*K,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,f=o+o,u=s*c,p=s*h,g=s*f,v=a*h,m=a*f,d=o*f,_=l*c,M=l*h,y=l*f,A=n.x,T=n.y,b=n.z;return r[0]=(1-(v+d))*A,r[1]=(p+y)*A,r[2]=(g-M)*A,r[3]=0,r[4]=(p-y)*T,r[5]=(1-(u+d))*T,r[6]=(m+_)*T,r[7]=0,r[8]=(g+M)*b,r[9]=(m-_)*b,r[10]=(1-(u+v))*b,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=nr.set(r[0],r[1],r[2]).length(),o=nr.set(r[4],r[5],r[6]).length(),l=nr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),An.copy(this);let c=1/a,h=1/o,f=1/l;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=h,An.elements[5]*=h,An.elements[6]*=h,An.elements[8]*=f,An.elements[9]*=f,An.elements[10]*=f,t.setFromRotationMatrix(An),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=bn,l=!1){let c=this.elements,h=2*s/(t-e),f=2*s/(n-r),u=(t+e)/(t-e),p=(n+r)/(n-r),g,v;if(l)g=s/(a-s),v=a*s/(a-s);else if(o===bn)g=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===wr)g=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=bn,l=!1){let c=this.elements,h=2/(t-e),f=2/(n-r),u=-(t+e)/(t-e),p=-(n+r)/(n-r),g,v;if(l)g=1/(a-s),v=a/(a-s);else if(o===bn)g=-2/(a-s),v=-(a+s)/(a-s);else if(o===wr)g=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},nr=new R,An=new dt,Fp=new R(0,0,0),Op=new R(1,1,1),vi=new R,ma=new R,cn=new R,Rd=new dt,Id=new Qt,ii=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],f=r[2],u=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ot(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ot(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:tt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Rd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Id.setFromEuler(this),this.setFromQuaternion(Id,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ii.DEFAULT_ORDER="XYZ";var ps=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Bp=0,Pd=new R,ir=new Qt,Jn=new dt,ga=new R,qr=new R,zp=new R,Hp=new Qt,Ld=new R(1,0,0),Dd=new R(0,1,0),Nd=new R(0,0,1),kd={type:"added"},Vp={type:"removed"},rr={type:"childadded",child:null},Yl={type:"childremoved",child:null},Pt=class i extends In{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new R,t=new ii,n=new Qt,r=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new dt},normalMatrix:{value:new st}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ps,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ir.setFromAxisAngle(e,t),this.quaternion.multiply(ir),this}rotateOnWorldAxis(e,t){return ir.setFromAxisAngle(e,t),this.quaternion.premultiply(ir),this}rotateX(e){return this.rotateOnAxis(Ld,e)}rotateY(e){return this.rotateOnAxis(Dd,e)}rotateZ(e){return this.rotateOnAxis(Nd,e)}translateOnAxis(e,t){return Pd.copy(e).applyQuaternion(this.quaternion),this.position.add(Pd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ld,e)}translateY(e){return this.translateOnAxis(Dd,e)}translateZ(e){return this.translateOnAxis(Nd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ga.copy(e):ga.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),qr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(qr,ga,this.up):Jn.lookAt(ga,qr,this.up),this.quaternion.setFromRotationMatrix(Jn),r&&(Jn.extractRotation(r.matrixWorld),ir.setFromRotationMatrix(Jn),this.quaternion.premultiply(ir.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(kd),rr.child=e,this.dispatchEvent(rr),rr.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vp),Yl.child=e,this.dispatchEvent(Yl),Yl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(kd),rr.child=e,this.dispatchEvent(rr),rr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qr,e,zp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qr,Hp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Pt.DEFAULT_UP=new R(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Tt=class extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Gp={type:"move"},Tr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),d=this._getHandJoint(c,v);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.quaternion,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Gp)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Tt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},qh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bi={h:0,s:0,l:0},xa={h:0,s:0,l:0};function ql(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,ht.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=ht.workingColorSpace){if(e=Wc(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ql(a,s,e+1/3),this.g=ql(a,s,e),this.b=ql(a,s,e-1/3)}return ht.colorSpaceToWorking(this,r),this}setStyle(e,t=jt){function n(s){s!==void 0&&parseFloat(s)<1&&tt("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,t);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:tt("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);tt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){let n=qh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):tt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ti(e.r),this.g=ti(e.g),this.b=ti(e.b),this}copyLinearToSRGB(e){return this.r=_r(e.r),this.g=_r(e.g),this.b=_r(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return ht.workingToColorSpace(Yt.copy(this),e),Math.round(ot(Yt.r*255,0,255))*65536+Math.round(ot(Yt.g*255,0,255))*256+Math.round(ot(Yt.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ht.workingColorSpace){ht.workingToColorSpace(Yt.copy(this),t);let n=Yt.r,r=Yt.g,s=Yt.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ht.workingColorSpace){return ht.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=jt){ht.workingToColorSpace(Yt.copy(this),e);let t=Yt.r,n=Yt.g,r=Yt.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(bi),this.setHSL(bi.h+e,bi.s+t,bi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(bi),e.getHSL(xa);let n=rs(bi.h,xa.h,t),r=rs(bi.s,xa.s,t),s=rs(bi.l,xa.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Yt=new Qe;Qe.NAMES=qh;var fs=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Qe(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var ms=class extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ii,this.environmentIntensity=1,this.environmentRotation=new ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Cn=new R,jn=new R,Zl=new R,$n=new R,sr=new R,ar=new R,Ud=new R,Kl=new R,Jl=new R,jl=new R,$l=new At,Ql=new At,ec=new At,Fn=class i{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Cn.subVectors(e,t),r.cross(Cn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Cn.subVectors(r,t),jn.subVectors(n,t),Zl.subVectors(e,t);let a=Cn.dot(Cn),o=Cn.dot(jn),l=Cn.dot(Zl),c=jn.dot(jn),h=jn.dot(Zl),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;let u=1/f,p=(c*l-o*h)*u,g=(a*h-o*l)*u;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,$n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,$n.x),l.addScaledVector(a,$n.y),l.addScaledVector(o,$n.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return $l.setScalar(0),Ql.setScalar(0),ec.setScalar(0),$l.fromBufferAttribute(e,t),Ql.fromBufferAttribute(e,n),ec.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector($l,s.x),a.addScaledVector(Ql,s.y),a.addScaledVector(ec,s.z),a}static isFrontFacing(e,t,n,r){return Cn.subVectors(n,t),jn.subVectors(e,t),Cn.cross(jn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),Cn.cross(jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;sr.subVectors(r,n),ar.subVectors(s,n),Kl.subVectors(e,n);let l=sr.dot(Kl),c=ar.dot(Kl);if(l<=0&&c<=0)return t.copy(n);Jl.subVectors(e,r);let h=sr.dot(Jl),f=ar.dot(Jl);if(h>=0&&f<=h)return t.copy(r);let u=l*f-h*c;if(u<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),t.copy(n).addScaledVector(sr,a);jl.subVectors(e,s);let p=sr.dot(jl),g=ar.dot(jl);if(g>=0&&p<=g)return t.copy(s);let v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(ar,o);let m=h*g-p*f;if(m<=0&&f-h>=0&&p-g>=0)return Ud.subVectors(s,r),o=(f-h)/(f-h+(p-g)),t.copy(r).addScaledVector(Ud,o);let d=1/(m+v+u);return a=v*d,o=u*d,t.copy(n).addScaledVector(sr,a).addScaledVector(ar,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},an=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Rn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Rn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Rn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Rn):Rn.fromBufferAttribute(s,a),Rn.applyMatrix4(e.matrixWorld),this.expandByPoint(Rn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),va.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),va.copy(n.boundingBox)),va.applyMatrix4(e.matrixWorld),this.union(va)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Rn),Rn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zr),ba.subVectors(this.max,Zr),or.subVectors(e.a,Zr),lr.subVectors(e.b,Zr),cr.subVectors(e.c,Zr),_i.subVectors(lr,or),yi.subVectors(cr,lr),Oi.subVectors(or,cr);let t=[0,-_i.z,_i.y,0,-yi.z,yi.y,0,-Oi.z,Oi.y,_i.z,0,-_i.x,yi.z,0,-yi.x,Oi.z,0,-Oi.x,-_i.y,_i.x,0,-yi.y,yi.x,0,-Oi.y,Oi.x,0];return!tc(t,or,lr,cr,ba)||(t=[1,0,0,0,1,0,0,0,1],!tc(t,or,lr,cr,ba))?!1:(_a.crossVectors(_i,yi),t=[_a.x,_a.y,_a.z],tc(t,or,lr,cr,ba))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Rn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Rn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Qn=[new R,new R,new R,new R,new R,new R,new R,new R],Rn=new R,va=new an,or=new R,lr=new R,cr=new R,_i=new R,yi=new R,Oi=new R,Zr=new R,ba=new R,_a=new R,Bi=new R;function tc(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Bi.fromArray(i,s);let o=r.x*Math.abs(Bi.x)+r.y*Math.abs(Bi.y)+r.z*Math.abs(Bi.z),l=e.dot(Bi),c=t.dot(Bi),h=n.dot(Bi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Dt=new R,ya=new we,Wp=0,_n=class extends In{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Vc,this.updateRanges=[],this.gpuType=wn,this.version=0,this._normalizationScale=e!==void 0?bl(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ya.fromBufferAttribute(this,t),ya.applyMatrix3(e),this.setXY(t,ya.x,ya.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Yc(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):qc(e,this.array)}};var gs=class extends _n{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var xs=class extends _n{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var xt=class extends _n{constructor(e,t,n){super(new Float32Array(e),t,n)}},Xp=new an,Kr=new R,nc=new R,Bn=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Xp.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Kr.subVectors(e,this.center);let t=Kr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Kr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(nc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Kr.copy(e.center).add(nc)),this.expandByPoint(Kr.copy(e.center).sub(nc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Yp=0,vn=new dt,ic=new Pt,dr=new R,dn=new an,Jr=new an,Bt=new R,Mt=class i extends In{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yp++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xp(e)?xs:gs)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new st().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return vn.makeRotationFromQuaternion(e),this.applyMatrix4(vn),this}rotateX(e){return vn.makeRotationX(e),this.applyMatrix4(vn),this}rotateY(e){return vn.makeRotationY(e),this.applyMatrix4(vn),this}rotateZ(e){return vn.makeRotationZ(e),this.applyMatrix4(vn),this}translate(e,t,n){return vn.makeTranslation(e,t,n),this.applyMatrix4(vn),this}scale(e,t,n){return vn.makeScale(e,t,n),this.applyMatrix4(vn),this}lookAt(e){return ic.lookAt(e),ic.updateMatrix(),this.applyMatrix4(ic.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(dr).negate(),this.translate(dr.x,dr.y,dr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new xt(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&tt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new an);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];dn.setFromBufferAttribute(s),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let n=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Jr.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(dn.min,Jr.min),dn.expandByPoint(Bt),Bt.addVectors(dn.max,Jr.max),dn.expandByPoint(Bt)):(dn.expandByPoint(Jr.min),dn.expandByPoint(Jr.max))}dn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Bt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Bt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Bt.fromBufferAttribute(o,c),l&&(dr.fromBufferAttribute(e,c),Bt.add(dr)),r=Math.max(r,n.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new _n(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let F=0;F<n.count;F++)o[F]=new R,l[F]=new R;let h=new R,f=new R,u=new R,p=new we,g=new we,v=new we,m=new R,d=new R;function _(F,L,N){c[F]=c[L]=c[N]=1,h.fromBufferAttribute(n,F),f.fromBufferAttribute(n,L),u.fromBufferAttribute(n,N),p.fromBufferAttribute(s,F),g.fromBufferAttribute(s,L),v.fromBufferAttribute(s,N),f.sub(h),u.sub(h),g.sub(p),v.sub(p);let q=1/(g.x*v.y-v.x*g.y);isFinite(q)&&(m.copy(f).multiplyScalar(v.y).addScaledVector(u,-g.y).multiplyScalar(q),d.copy(u).multiplyScalar(g.x).addScaledVector(f,-v.x).multiplyScalar(q),o[F].add(m),o[L].add(m),o[N].add(m),l[F].add(d),l[L].add(d),l[N].add(d))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let F=0,L=M.length;F<L;++F){let N=M[F],q=N.start,te=N.count;for(let D=q,K=q+te;D<K;D+=3)_(e.getX(D+0),e.getX(D+1),e.getX(D+2))}let y=new R,A=new R,T=new R,b=new R;function S(F){T.fromBufferAttribute(r,F),b.copy(T);let L=o[F];y.copy(L),y.sub(T.multiplyScalar(T.dot(L))).normalize(),A.crossVectors(b,L);let q=A.dot(l[F])<0?-1:1;a.setXYZW(F,y.x,y.y,y.z,q)}for(let F=0,L=n.count;F<L;++F)c[F]&&S(F);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new _n(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let r=new R,s=new R,a=new R,o=new R,l=new R,c=new R,h=new R,f=new R;if(e)for(let u=0,p=e.count;u<p;u+=3){let g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h),p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*h;for(let d=0;d<h;d++)u[g++]=c[p++]}return new _n(u,h,f)}if(this.index===null)return tt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,f=c.length;h<f;h++){let u=c[h],p=e(u,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){let p=c[f];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],f=s[c];for(let u=0,p=f.length;u<p;u++)h.push(f[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},co=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Vc,this.updateRanges=[],this.version=0,this.uuid=ui()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Fd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),r=new this.constructor(n,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Fd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function Fd(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=ui()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var Jt=new R,vs=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r,this._normalizationScale=e!==void 0?bl(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){hs("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new _n(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){hs("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Yc(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):qc(e,this.data.array)}},rc=new R,qp=new R,Zp=new st,hn=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=rc.subVectors(n,t).cross(qp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(rc),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Zp.getNormalMatrix(e),r=this.coplanarPoint(rc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Kp=0,Pn=class extends In{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kp++}),this.uuid=ui(),this.name="",this.type="Material",this.blending=Fr,this.side=Li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Rc,this.blendDst=Ic,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=yr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ka,this.stencilZFail=Ka,this.stencilZPass=Ka,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){tt(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){tt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new hn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new we().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new we().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ln=class extends Pn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},hr,jr=new R,ur=new R,pr=new R,fr=new we,$r=new we,Zh=new dt,wa=new R,Qr=new R,Sa=new R,Od=new we,sc=new we,Bd=new we,zn=class extends Pt{constructor(e=new Ln){if(super(),this.isSprite=!0,this.type="Sprite",hr===void 0){hr=new Mt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new co(t,5);hr.setIndex([0,1,2,0,2,3]),hr.setAttribute("position",new vs(n,3,0,!1)),hr.setAttribute("uv",new vs(n,2,3,!1))}this.geometry=hr,this.material=e,this.center=new we(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&it('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ur.setFromMatrixScale(this.matrixWorld),Zh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),pr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ur.multiplyScalar(-pr.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;Ma(wa.set(-.5,-.5,0),pr,a,ur,r,s),Ma(Qr.set(.5,-.5,0),pr,a,ur,r,s),Ma(Sa.set(.5,.5,0),pr,a,ur,r,s),Od.set(0,0),sc.set(1,0),Bd.set(1,1);let o=e.ray.intersectTriangle(wa,Qr,Sa,!1,jr);if(o===null&&(Ma(Qr.set(-.5,.5,0),pr,a,ur,r,s),sc.set(0,1),o=e.ray.intersectTriangle(wa,Sa,Qr,!1,jr),o===null))return;let l=e.ray.origin.distanceTo(jr);l<e.near||l>e.far||t.push({distance:l,point:jr.clone(),uv:Fn.getInterpolation(jr,wa,Qr,Sa,Od,sc,Bd,new we),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function Ma(i,e,t,n,r,s){fr.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?($r.x=s*fr.x-r*fr.y,$r.y=r*fr.x+s*fr.y):$r.copy(fr),i.copy(e),i.x+=$r.x,i.y+=$r.y,i.applyMatrix4(Zh)}var ei=new R,ac=new R,Ea=new R,Ta=new R,Si=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ac.copy(e).add(t).multiplyScalar(.5),Ea.copy(t).sub(e).normalize(),Ta.copy(this.origin).sub(ac);let s=e.distanceTo(t)*.5,a=-this.direction.dot(Ea),o=Ta.dot(this.direction),l=-Ta.dot(Ea),c=Ta.lengthSq(),h=Math.abs(1-a*a),f,u,p,g;if(h>0)if(f=a*l-o,u=a*o-l,g=s*h,f>=0)if(u>=-g)if(u<=g){let v=1/h;f*=v,u*=v,p=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=s,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*l)+c;else u=-s,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-a*s+o)),u=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(f=Math.max(0,-(a*s+o)),u=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+u*(u+2*l)+c);else u=a>0?-s:s,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ac).addScaledVector(Ea,u),p}intersectSphere(e,t){if(e.radius<0)return null;ei.subVectors(e.center,this.origin);let n=ei.dot(this.direction),r=ei.dot(ei)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-u.z)*f,l=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,l=(e.min.z-u.z)*f),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,n,r,s){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=e.x-a.x,u=e.y-a.y,p=e.z-a.z,g=t.x-a.x,v=t.y-a.y,m=t.z-a.z,d=n.x-a.x,_=n.y-a.y,M=n.z-a.z,y=Math.abs(l),A=Math.abs(c),T=Math.abs(h),b,S,F,L,N,q,te,D,K,$,B,pe;if(y>=A&&y>=T?(F=l,q=f,K=g,pe=d,l>=0?(b=c,S=h,L=u,N=p,te=v,D=m,$=_,B=M):(b=h,S=c,L=p,N=u,te=m,D=v,$=M,B=_)):A>=T?(F=c,q=u,K=v,pe=_,c>=0?(b=h,S=l,L=p,N=f,te=m,D=g,$=M,B=d):(b=l,S=h,L=f,N=p,te=g,D=m,$=d,B=M)):(F=h,q=p,K=m,pe=M,h>=0?(b=l,S=c,L=f,N=u,te=g,D=v,$=d,B=_):(b=c,S=l,L=u,N=f,te=v,D=g,$=_,B=d)),F===0)return null;let W=b/F,se=S/F,Y=1/F,ke=L-W*q,Ue=N-se*q,Q=te-W*K,Le=D-se*K,fe=$-W*pe,G=B-se*pe,re=fe*Le-G*Q,Me=ke*G-Ue*fe,Ke=Q*Ue-Le*ke;if(r){if(re<0||Me<0||Ke<0)return null}else if((re<0||Me<0||Ke<0)&&(re>0||Me>0||Ke>0))return null;let De=re+Me+Ke;if(De===0)return null;let et=Y*(re*q+Me*K+Ke*pe);return(De>0?et<0:et>0)?null:this.at(et/De,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Hn=class extends Pn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=Pc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},zd=new dt,zi=new Si,Aa=new Bn,Hd=new R,Ca=new R,Ra=new R,Ia=new R,oc=new R,Pa=new R,Vd=new R,La=new R,bt=class extends Pt{constructor(e=new Mt,t=new Hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Pa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],f=s[l];h!==0&&(oc.fromBufferAttribute(f,e),a?Pa.addScaledVector(oc,h):Pa.addScaledVector(oc.sub(t),h))}t.add(Pa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Aa.copy(n.boundingSphere),Aa.applyMatrix4(s),zi.copy(e.ray).recast(e.near),!(Aa.containsPoint(zi.origin)===!1&&(zi.intersectSphere(Aa,Hd)===null||zi.origin.distanceToSquared(Hd)>(e.far-e.near)**2))&&(zd.copy(s).invert(),zi.copy(e.ray).applyMatrix4(zd),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zi)))}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let m=u[g],d=a[m.materialIndex],_=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,A=M;y<A;y+=3){let T=o.getX(y),b=o.getX(y+1),S=o.getX(y+2);r=Da(this,d,e,n,c,h,f,T,b,S),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){let _=o.getX(m),M=o.getX(m+1),y=o.getX(m+2);r=Da(this,a,e,n,c,h,f,_,M,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let m=u[g],d=a[m.materialIndex],_=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,A=M;y<A;y+=3){let T=y,b=y+1,S=y+2;r=Da(this,d,e,n,c,h,f,T,b,S),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){let _=m,M=m+1,y=m+2;r=Da(this,a,e,n,c,h,f,_,M,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function Jp(i,e,t,n,r,s,a,o){let l;if(e.side===tn?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Li,o),l===null)return null;La.copy(o),La.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(La);return c<t.near||c>t.far?null:{distance:c,point:La.clone(),object:i}}function Da(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Ca),i.getVertexPosition(l,Ra),i.getVertexPosition(c,Ia);let h=Jp(i,e,t,n,Ca,Ra,Ia,Vd);if(h){let f=new R;Fn.getBarycoord(Vd,Ca,Ra,Ia,f),r&&(h.uv=Fn.getInterpolatedAttribute(r,o,l,c,f,new we)),s&&(h.uv1=Fn.getInterpolatedAttribute(s,o,l,c,f,new we)),a&&(h.normal=Fn.getInterpolatedAttribute(a,o,l,c,f,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new R,materialIndex:0};Fn.getNormal(Ca,Ra,Ia,u.normal),h.face=u,h.barycoord=f}return h}var bs=class extends en{constructor(e=null,t=1,n=1,r,s,a,o,l,c=zt,h=zt,f,u){super(null,a,o,l,c,h,r,s,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _s=class extends _n{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},mr=new dt,Gd=new dt,Na=[],Wd=new an,jp=new dt,es=new bt,ts=new Bn,ys=class extends bt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _s(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,jp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new an),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,mr),Wd.copy(e.boundingBox).applyMatrix4(mr),this.boundingBox.union(Wd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Bn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,mr),ts.copy(e.boundingSphere).applyMatrix4(mr),this.boundingSphere.union(ts)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(es.geometry=this.geometry,es.material=this.material,es.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ts.copy(this.boundingSphere),ts.applyMatrix4(n),e.ray.intersectsSphere(ts)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,mr),Gd.multiplyMatrices(n,mr),es.matrixWorld=Gd,es.raycast(e,Na);for(let a=0,o=Na.length;a<o;a++){let l=Na[a];l.instanceId=s,l.object=this,t.push(l)}Na.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new _s(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new bs(new Float32Array(r*this.count),r,this.count,Oo,wn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Hi=new Bn,$p=new we(.5,.5),ka=new R,Mi=class{constructor(e=new hn,t=new hn,n=new hn,r=new hn,s=new hn,a=new hn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=bn,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],f=s[5],u=s[6],p=s[7],g=s[8],v=s[9],m=s[10],d=s[11],_=s[12],M=s[13],y=s[14],A=s[15];if(r[0].setComponents(c-a,p-h,d-g,A-_).normalize(),r[1].setComponents(c+a,p+h,d+g,A+_).normalize(),r[2].setComponents(c+o,p+f,d+v,A+M).normalize(),r[3].setComponents(c-o,p-f,d-v,A-M).normalize(),n)r[4].setComponents(l,u,m,y).normalize(),r[5].setComponents(c-l,p-u,d-m,A-y).normalize();else if(r[4].setComponents(c-l,p-u,d-m,A-y).normalize(),t===bn)r[5].setComponents(c+l,p+u,d+m,A+y).normalize();else if(t===wr)r[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(e){Hi.center.set(0,0,0);let t=$p.distanceTo(e.center);return Hi.radius=.7071067811865476+t,Hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ka.x=r.normal.x>0?e.max.x:e.min.x,ka.y=r.normal.y>0?e.max.y:e.min.y,ka.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ka)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Xd=new dt,ho=class i{constructor(){this.coordinateSystem=bn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let r=0;r<t.length;r++){let s=t[r];Xd.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[r]===void 0&&(n[r]=new Mi),n[r].setFromProjectionMatrix(Xd,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Mi),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new i().copy(this)}};var un=class extends Pn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},uo=new R,po=new R,Yd=new dt,ns=new Si,Ua=new Bn,lc=new R,qd=new R,Ei=class extends Pt{constructor(e=new Mt,t=new un){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)uo.fromBufferAttribute(t,r-1),po.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=uo.distanceTo(po);e.setAttribute("lineDistance",new xt(n,1))}else tt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ua.copy(n.boundingSphere),Ua.applyMatrix4(r),Ua.radius+=s,e.ray.intersectsSphere(Ua)===!1)return;Yd.copy(r).invert(),ns.copy(e.ray).applyMatrix4(Yd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=c){let d=h.getX(v),_=h.getX(v+1),M=Fa(this,e,ns,l,d,_,v);M&&t.push(M)}if(this.isLineLoop){let v=h.getX(g-1),m=h.getX(p),d=Fa(this,e,ns,l,v,m,g-1);d&&t.push(d)}}else{let p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=c){let d=Fa(this,e,ns,l,v,v+1,v);d&&t.push(d)}if(this.isLineLoop){let v=Fa(this,e,ns,l,g-1,p,g-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Fa(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(uo.fromBufferAttribute(o,r),po.fromBufferAttribute(o,s),t.distanceSqToSegment(uo,po,lc,qd)>n)return;lc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(lc);if(!(c<e.near||c>e.far))return{distance:c,point:qd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Zd=new R,Kd=new R,Dn=class extends Ei{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Zd.fromBufferAttribute(t,r),Kd.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Zd.distanceTo(Kd);e.setAttribute("lineDistance",new xt(n,1))}else tt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ti=class extends Pn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Jd=new dt,vc=new Si,Oa=new Bn,Ba=new R,Wi=class extends Pt{constructor(e=new Mt,t=new Ti){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Oa.copy(n.boundingSphere),Oa.applyMatrix4(r),Oa.radius+=s,e.ray.intersectsSphere(Oa)===!1)return;Jd.copy(r).invert(),vc.copy(e.ray).applyMatrix4(Jd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=u,v=p;g<v;g++){let m=c.getX(g);Ba.fromBufferAttribute(f,m),jd(Ba,m,l,r,e,t,this)}}else{let u=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let g=u,v=p;g<v;g++)Ba.fromBufferAttribute(f,g),jd(Ba,g,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function jd(i,e,t,n,r,s,a){let o=vc.distanceSqToPoint(i);if(o<t){let l=new R;vc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ws=class extends en{constructor(e=[],t=Ji,n,r,s,a,o,l,c,h){super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ss=class extends en{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ri=class extends en{constructor(e,t,n=Nn,r,s,a,o=zt,l=zt,c,h=ni,f=1){if(h!==ni&&h!==di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:f};super(u,r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Er(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ms=class extends ri{constructor(e,t=Nn,n=Ji,r,s,a=zt,o=zt,l,c=ni){let h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Es=class extends en{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},pn=class i extends Mt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],f=[],u=0,p=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new xt(c,3)),this.setAttribute("normal",new xt(h,3)),this.setAttribute("uv",new xt(f,2));function g(v,m,d,_,M,y,A,T,b,S,F){let L=y/b,N=A/S,q=y/2,te=A/2,D=T/2,K=b+1,$=S+1,B=0,pe=0,W=new R;for(let se=0;se<$;se++){let Y=se*N-te;for(let ke=0;ke<K;ke++){let Ue=ke*L-q;W[v]=Ue*_,W[m]=Y*M,W[d]=D,c.push(W.x,W.y,W.z),W[v]=0,W[m]=0,W[d]=T>0?1:-1,h.push(W.x,W.y,W.z),f.push(ke/b),f.push(1-se/S),B+=1}}for(let se=0;se<S;se++)for(let Y=0;Y<b;Y++){let ke=u+Y+K*se,Ue=u+Y+K*(se+1),Q=u+(Y+1)+K*(se+1),Le=u+(Y+1)+K*se;l.push(ke,Ue,Le),l.push(Ue,Q,Le),pe+=6}o.addGroup(p,pe,F),p+=pe,u+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var za=new R,Ha=new R,cc=new R,Va=new Fn,si=class extends Mt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(br*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],f=new Array(3),u=new Map,p=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:v,b:m,c:d}=Va;if(v.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),d.fromBufferAttribute(o,c[2]),Va.getNormal(cc),f[0]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,f[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,f[2]=`${Math.round(d.x*r)},${Math.round(d.y*r)},${Math.round(d.z*r)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let _=0;_<3;_++){let M=(_+1)%3,y=f[_],A=f[M],T=Va[h[_]],b=Va[h[M]],S=`${y}_${A}`,F=`${A}_${y}`,L=u.get(F);L?(cc.dot(L.normal)<=s&&(p.push(T.x,T.y,T.z),p.push(b.x,b.y,b.z)),u.set(F,null)):u.has(S)||u.set(S,{index0:c[_],index1:c[M],normal:cc.clone()})}}for(let g of u.values())if(g){let{index0:v,index1:m}=g;za.fromBufferAttribute(o,v),Ha.fromBufferAttribute(o,m),p.push(za.x,za.y,za.z),p.push(Ha.x,Ha.y,Ha.z)}this.setAttribute("position",new xt(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},fn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){tt("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);let h=n[r],u=n[r+1]-h,p=(a-h)/u;return(r+p)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new we:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new R,r=[],s=[],a=[],o=new R,l=new dt;for(let p=0;p<=e;p++){let g=p/e;r[p]=this.getTangentAt(g,new R)}s[0]=new R,a[0]=new R;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),f=Math.abs(r[0].y),u=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(ot(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(r[p],s[p])}if(t===!0){let p=Math.acos(ot(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],p*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},Ar=class extends fn{constructor(e=0,t=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new we){let n=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,p=c-this.aY;l=u*h-p*f+this.aX,c=u*f+p*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},fo=class extends Ar{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Zc(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,f){let u=(a-s)/c-(o-s)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+f)+(l-o)/f;u*=h,p*=h,r(a,o,u,p)},calc:function(s){let a=s*s,o=a*s;return i+e*s+t*a+n*o}}}var $d=new R,Qd=new R,dc=new Zc,hc=new Zc,uc=new Zc,ai=class extends fn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new R){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=r[(o-1)%s]:(Qd.subVectors(r[0],r[1]).add(r[0]),c=Qd);let f=r[o%s],u=r[(o+1)%s];if(this.closed||o+2<s?h=r[(o+2)%s]:($d.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=$d),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(f),p),v=Math.pow(f.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(h),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),dc.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,g,v,m),hc.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,g,v,m),uc.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(dc.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),hc.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),uc.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return n.set(dc.calc(l),hc.calc(l),uc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function eh(i,e,t,n,r){let s=(n-e)*.5,a=(r-t)*.5,o=i*i,l=i*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*i+t}function Qp(i,e){let t=1-i;return t*t*e}function ef(i,e){return 2*(1-i)*i*e}function tf(i,e){return i*i*e}function ss(i,e,t,n){return Qp(i,e)+ef(i,t)+tf(i,n)}function nf(i,e){let t=1-i;return t*t*t*e}function rf(i,e){let t=1-i;return 3*t*t*i*e}function sf(i,e){return 3*(1-i)*i*i*e}function af(i,e){return i*i*i*e}function as(i,e,t,n,r){return nf(i,e)+rf(i,t)+sf(i,n)+af(i,r)}var Ts=class extends fn{constructor(e=new we,t=new we,n=new we,r=new we){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new we){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(as(e,r.x,s.x,a.x,o.x),as(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},mo=class extends fn{constructor(e=new R,t=new R,n=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new R){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(as(e,r.x,s.x,a.x,o.x),as(e,r.y,s.y,a.y,o.y),as(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},As=class extends fn{constructor(e=new we,t=new we){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new we){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new we){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},go=class extends fn{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Cs=class extends fn{constructor(e=new we,t=new we,n=new we){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new we){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(ss(e,r.x,s.x,a.x),ss(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Rs=class extends fn{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(ss(e,r.x,s.x,a.x),ss(e,r.y,s.y,a.y),ss(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Is=class extends fn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new we){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],f=r[a>r.length-3?r.length-1:a+2];return n.set(eh(o,l.x,c.x,h.x,f.x),eh(o,l.y,c.y,h.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new we().fromArray(r))}return this}},xo=Object.freeze({__proto__:null,ArcCurve:fo,CatmullRomCurve3:ai,CubicBezierCurve:Ts,CubicBezierCurve3:mo,EllipseCurve:Ar,LineCurve:As,LineCurve3:go,QuadraticBezierCurve:Cs,QuadraticBezierCurve3:Rs,SplineCurve:Is}),vo=class extends fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new xo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new xo[r.type]().fromJSON(r))}return this.cacheLengths=null,this}},Ps=class extends vo{constructor(e){super(),this.type="Path",this.currentPoint=new we,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new As(this.currentPoint.clone(),new we(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Cs(this.currentPoint.clone(),new we(e,t),new we(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new Ts(this.currentPoint.clone(),new we(e,t),new we(n,r),new we(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Is(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){let c=new Ar(e,t,n,r,s,a,o,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Cr=class extends Ps{constructor(e){super(e),this.uuid=ui(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new Ps().fromJSON(r))}return this}};function of(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=Kh(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=uf(i,e,s,t)),i.length>80*t){o=i[0],l=i[1];let h=o,f=l;for(let u=t;u<r;u+=t){let p=i[u],g=i[u+1];p<o&&(o=p),g<l&&(l=g),p>h&&(h=p),g>f&&(f=g)}c=Math.max(h-o,f-l),c=c!==0?32767/c:0}return Ls(s,a,t,o,l,c,0),a}function Kh(i,e,t,n,r){let s;if(r===Sf(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=th(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=th(a/n|0,i[a],i[a+1],s);return s&&Rr(s,s.next)&&(Ns(s),s=s.next),s}function Xi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Rr(t,t.next)||Rt(t.prev,t,t.next)===0)){if(Ns(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ls(i,e,t,n,r,s,a){if(!i)return;!a&&s&&xf(i,n,r,s);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(s?cf(i,n,r,s):lf(i)){e.push(l.i,i.i,c.i),Ns(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=df(Xi(i),e),Ls(i,e,t,n,r,s,2)):a===2&&hf(i,e,t,n,r,s):Ls(Xi(i),e,t,n,r,s,1);break}}}function lf(i){let e=i.prev,t=i,n=i.next;if(Rt(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(r,s,a),f=Math.min(o,l,c),u=Math.max(r,s,a),p=Math.max(o,l,c),g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=u&&g.y>=f&&g.y<=p&&is(r,o,s,l,a,c,g.x,g.y)&&Rt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function cf(i,e,t,n){let r=i.prev,s=i,a=i.next;if(Rt(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,h=r.y,f=s.y,u=a.y,p=Math.min(o,l,c),g=Math.min(h,f,u),v=Math.max(o,l,c),m=Math.max(h,f,u),d=bc(p,g,e,t,n),_=bc(v,m,e,t,n),M=i.prevZ,y=i.nextZ;for(;M&&M.z>=d&&y&&y.z<=_;){if(M.x>=p&&M.x<=v&&M.y>=g&&M.y<=m&&M!==r&&M!==a&&is(o,h,l,f,c,u,M.x,M.y)&&Rt(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=p&&y.x<=v&&y.y>=g&&y.y<=m&&y!==r&&y!==a&&is(o,h,l,f,c,u,y.x,y.y)&&Rt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=d;){if(M.x>=p&&M.x<=v&&M.y>=g&&M.y<=m&&M!==r&&M!==a&&is(o,h,l,f,c,u,M.x,M.y)&&Rt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=_;){if(y.x>=p&&y.x<=v&&y.y>=g&&y.y<=m&&y!==r&&y!==a&&is(o,h,l,f,c,u,y.x,y.y)&&Rt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function df(i,e){let t=i;do{let n=t.prev,r=t.next.next;!Rr(n,r)&&jh(n,t,t.next,r)&&Ds(n,r)&&Ds(r,n)&&(e.push(n.i,t.i,r.i),Ns(t),Ns(t.next),t=i=r),t=t.next}while(t!==i);return Xi(t)}function hf(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&_f(a,o)){let l=$h(a,o);a=Xi(a,a.next),l=Xi(l,l.next),Ls(a,e,t,n,r,s,0),Ls(l,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function uf(i,e,t,n){let r=[];for(let s=0,a=e.length;s<a;s++){let o=e[s]*n,l=s<a-1?e[s+1]*n:i.length,c=Kh(i,o,l,n,!1);c===c.next&&(c.steiner=!0),r.push(bf(c))}r.sort(pf);for(let s=0;s<r.length;s++)t=ff(r[s],t);return t}function pf(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=n-r}return t}function ff(i,e){let t=mf(i,e);if(!t)return e;let n=$h(t,i);return Xi(n,n.next),Xi(t,t.next)}function mf(i,e){let t=e,n=i.x,r=i.y,s=-1/0,a;if(Rr(i,t))return t;do{if(Rr(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>s&&(s=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Jh(r<c?n:s,r,l,c,r<c?s:n,r,t.x,t.y)){let f=Math.abs(r-t.y)/(n-t.x);Ds(t,i)&&(f<h||f===h&&(t.x>a.x||t.x===a.x&&gf(a,t)))&&(a=t,h=f)}t=t.next}while(t!==o);return a}function gf(i,e){return Rt(i.prev,i,e.prev)<0&&Rt(e.next,i,i.next)<0}function xf(i,e,t,n){let r=i;do r.z===0&&(r.z=bc(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,vf(r)}function vf(i){let e,t=1;do{let n=i,r;i=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(r=n,n=n.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=a}s.nextZ=null,t*=2}while(e>1);return i}function bc(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function bf(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Jh(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function is(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&Jh(i,e,t,n,r,s,a,o)}function _f(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!yf(i,e)&&(Ds(i,e)&&Ds(e,i)&&wf(i,e)&&(Rt(i.prev,i,e.prev)||Rt(i,e.prev,e))||Rr(i,e)&&Rt(i.prev,i,i.next)>0&&Rt(e.prev,e,e.next)>0)}function Rt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Rr(i,e){return i.x===e.x&&i.y===e.y}function jh(i,e,t,n){let r=Wa(Rt(i,e,t)),s=Wa(Rt(i,e,n)),a=Wa(Rt(t,n,i)),o=Wa(Rt(t,n,e));return!!(r!==s&&a!==o||r===0&&Ga(i,t,e)||s===0&&Ga(i,n,e)||a===0&&Ga(t,i,n)||o===0&&Ga(t,e,n))}function Ga(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Wa(i){return i>0?1:i<0?-1:0}function yf(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&jh(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ds(i,e){return Rt(i.prev,i,i.next)<0?Rt(i,e,i.next)>=0&&Rt(i,i.prev,e)>=0:Rt(i,e,i.prev)<0||Rt(i,i.next,e)<0}function wf(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function $h(i,e){let t=_c(i.i,i.x,i.y),n=_c(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function th(i,e,t,n){let r=_c(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Ns(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function _c(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Sf(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var yc=class{static triangulate(e,t,n=2){return of(e,t,n)}},Vi=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];nh(e),ih(n,e);let a=e.length;t.forEach(nh);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,ih(n,t[l]);let o=yc.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function nh(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function ih(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Ir=class i extends Mt{constructor(e=new Cr([new we(.5,.5),new we(-.5,.5),new we(-.5,-.5),new we(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new xt(r,3)),this.setAttribute("uv",new xt(s,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:p-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,d=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:Mf,M,y=!1,A,T,b,S;if(d){M=d.getSpacedPoints(h),y=!0,u=!1;let me=d.isCatmullRomCurve3?d.closed:!1;A=d.computeFrenetFrames(h,me),T=new R,b=new R,S=new R}u||(m=0,p=0,g=0,v=0);let F=o.extractPoints(c),L=F.shape,N=F.holes;if(!Vi.isClockWise(L)){L=L.reverse();for(let me=0,Ce=N.length;me<Ce;me++){let xe=N[me];Vi.isClockWise(xe)&&(N[me]=xe.reverse())}}function te(me){let xe=10000000000000001e-36,Ie=me[0];for(let be=1;be<=me.length;be++){let $e=be%me.length,Xe=me[$e],nt=Xe.x-Ie.x,k=Xe.y-Ie.y,ue=nt*nt+k*k,C=Math.max(Math.abs(Xe.x),Math.abs(Xe.y),Math.abs(Ie.x),Math.abs(Ie.y)),ve=xe*C*C;if(ue<=ve){me.splice($e,1),be--;continue}Ie=Xe}}te(L),N.forEach(te);let D=N.length,K=L;for(let me=0;me<D;me++){let Ce=N[me];L=L.concat(Ce)}function $(me,Ce,xe){return Ce||it("ExtrudeGeometry: vec does not exist"),me.clone().addScaledVector(Ce,xe)}let B=L.length;function pe(me,Ce,xe){let Ie,be,$e,Xe=me.x-Ce.x,nt=me.y-Ce.y,k=xe.x-me.x,ue=xe.y-me.y,C=Xe*Xe+nt*nt,ve=Xe*ue-nt*k;if(Math.abs(ve)>Number.EPSILON){let Ne=Math.sqrt(C),Re=Math.sqrt(k*k+ue*ue),he=Ce.x-nt/Ne,ae=Ce.y+Xe/Ne,Te=xe.x-ue/Re,We=xe.y+k/Re,E=((Te-he)*ue-(We-ae)*k)/(Xe*ue-nt*k);Ie=he+Xe*E-me.x,be=ae+nt*E-me.y;let x=Ie*Ie+be*be;if(x<=2)return new we(Ie,be);$e=Math.sqrt(x/2)}else{let Ne=!1;Xe>Number.EPSILON?k>Number.EPSILON&&(Ne=!0):Xe<-Number.EPSILON?k<-Number.EPSILON&&(Ne=!0):Math.sign(nt)===Math.sign(ue)&&(Ne=!0),Ne?(Ie=-nt,be=Xe,$e=Math.sqrt(C)):(Ie=Xe,be=nt,$e=Math.sqrt(C/2))}return new we(Ie/$e,be/$e)}let W=[];for(let me=0,Ce=K.length,xe=Ce-1,Ie=me+1;me<Ce;me++,xe++,Ie++)xe===Ce&&(xe=0),Ie===Ce&&(Ie=0),W[me]=pe(K[me],K[xe],K[Ie]);let se=[],Y,ke=W.concat();for(let me=0,Ce=D;me<Ce;me++){let xe=N[me];Y=[];for(let Ie=0,be=xe.length,$e=be-1,Xe=Ie+1;Ie<be;Ie++,$e++,Xe++)$e===be&&($e=0),Xe===be&&(Xe=0),Y[Ie]=pe(xe[Ie],xe[$e],xe[Xe]);se.push(Y),ke=ke.concat(Y)}let Ue;if(m===0)Ue=Vi.triangulateShape(K,N);else{let me=[],Ce=[];for(let xe=0;xe<m;xe++){let Ie=xe/m,be=p*Math.cos(Ie*Math.PI/2),$e=g*Math.sin(Ie*Math.PI/2)+v;for(let Xe=0,nt=K.length;Xe<nt;Xe++){let k=$(K[Xe],W[Xe],$e);Me(k.x,k.y,-be),Ie===0&&me.push(k)}for(let Xe=0,nt=D;Xe<nt;Xe++){let k=N[Xe];Y=se[Xe];let ue=[];for(let C=0,ve=k.length;C<ve;C++){let Ne=$(k[C],Y[C],$e);Me(Ne.x,Ne.y,-be),Ie===0&&ue.push(Ne)}Ie===0&&Ce.push(ue)}}Ue=Vi.triangulateShape(me,Ce)}let Q=Ue.length,Le=g+v;for(let me=0;me<B;me++){let Ce=u?$(L[me],ke[me],Le):L[me];y?(b.copy(A.normals[0]).multiplyScalar(Ce.x),T.copy(A.binormals[0]).multiplyScalar(Ce.y),S.copy(M[0]).add(b).add(T),Me(S.x,S.y,S.z)):Me(Ce.x,Ce.y,0)}for(let me=1;me<=h;me++)for(let Ce=0;Ce<B;Ce++){let xe=u?$(L[Ce],ke[Ce],Le):L[Ce];y?(b.copy(A.normals[me]).multiplyScalar(xe.x),T.copy(A.binormals[me]).multiplyScalar(xe.y),S.copy(M[me]).add(b).add(T),Me(S.x,S.y,S.z)):Me(xe.x,xe.y,f/h*me)}for(let me=m-1;me>=0;me--){let Ce=me/m,xe=p*Math.cos(Ce*Math.PI/2),Ie=g*Math.sin(Ce*Math.PI/2)+v;for(let be=0,$e=K.length;be<$e;be++){let Xe=$(K[be],W[be],Ie);Me(Xe.x,Xe.y,f+xe)}for(let be=0,$e=N.length;be<$e;be++){let Xe=N[be];Y=se[be];for(let nt=0,k=Xe.length;nt<k;nt++){let ue=$(Xe[nt],Y[nt],Ie);y?Me(ue.x,ue.y+M[h-1].y,M[h-1].x+xe):Me(ue.x,ue.y,f+xe)}}}fe(),G();function fe(){let me=r.length/3;if(u){let Ce=0,xe=B*Ce;for(let Ie=0;Ie<Q;Ie++){let be=Ue[Ie];Ke(be[2]+xe,be[1]+xe,be[0]+xe)}Ce=h+m*2,xe=B*Ce;for(let Ie=0;Ie<Q;Ie++){let be=Ue[Ie];Ke(be[0]+xe,be[1]+xe,be[2]+xe)}}else{for(let Ce=0;Ce<Q;Ce++){let xe=Ue[Ce];Ke(xe[2],xe[1],xe[0])}for(let Ce=0;Ce<Q;Ce++){let xe=Ue[Ce];Ke(xe[0]+B*h,xe[1]+B*h,xe[2]+B*h)}}n.addGroup(me,r.length/3-me,0)}function G(){let me=r.length/3,Ce=0;re(K,Ce),Ce+=K.length;for(let xe=0,Ie=N.length;xe<Ie;xe++){let be=N[xe];re(be,Ce),Ce+=be.length}n.addGroup(me,r.length/3-me,1)}function re(me,Ce){let xe=me.length;for(;--xe>=0;){let Ie=xe,be=xe-1;be<0&&(be=me.length-1);for(let $e=0,Xe=h+m*2;$e<Xe;$e++){let nt=B*$e,k=B*($e+1),ue=Ce+Ie+nt,C=Ce+be+nt,ve=Ce+be+k,Ne=Ce+Ie+k;De(ue,C,ve,Ne)}}}function Me(me,Ce,xe){l.push(me),l.push(Ce),l.push(xe)}function Ke(me,Ce,xe){et(me),et(Ce),et(xe);let Ie=r.length/3,be=_.generateTopUV(n,r,Ie-3,Ie-2,Ie-1);Je(be[0]),Je(be[1]),Je(be[2])}function De(me,Ce,xe,Ie){et(me),et(Ce),et(Ie),et(Ce),et(xe),et(Ie);let be=r.length/3,$e=_.generateSideWallUV(n,r,be-6,be-3,be-2,be-1);Je($e[0]),Je($e[1]),Je($e[3]),Je($e[1]),Je($e[2]),Je($e[3])}function et(me){r.push(l[me*3+0]),r.push(l[me*3+1]),r.push(l[me*3+2])}function Je(me){s.push(me.x),s.push(me.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Ef(t,n,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new xo[r.type]().fromJSON(r)),new i(n,e.options)}},Mf={generateTopUV:function(i,e,t,n,r){let s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[r*3],h=e[r*3+1];return[new we(s,a),new we(o,l),new we(c,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],f=e[n*3+2],u=e[r*3],p=e[r*3+1],g=e[r*3+2],v=e[s*3],m=e[s*3+1],d=e[s*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new we(a,1-l),new we(c,1-f),new we(u,1-g),new we(v,1-d)]:[new we(o,1-l),new we(h,1-f),new we(p,1-g),new we(m,1-d)]}};function Ef(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Yi=class i extends Mt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,f=e/o,u=t/l,p=[],g=[],v=[],m=[];for(let d=0;d<h;d++){let _=d*u-a;for(let M=0;M<c;M++){let y=M*f-s;g.push(y,-_,0),v.push(0,0,1),m.push(M/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let _=0;_<o;_++){let M=_+c*d,y=_+c*(d+1),A=_+1+c*(d+1),T=_+1+c*d;p.push(M,y,T),p.push(y,A,T)}this.setIndex(p),this.setAttribute("position",new xt(g,3)),this.setAttribute("normal",new xt(v,3)),this.setAttribute("uv",new xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var ks=class i extends Mt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],f=new R,u=new R,p=[],g=[],v=[],m=[];for(let d=0;d<=n;d++){let _=[],M=d/n,y=a+M*o,A=e*Math.cos(y),T=Math.sqrt(e*e-A*A),b=0;d===0&&a===0?b=.5/t:d===n&&l===Math.PI&&(b=-.5/t);for(let S=0;S<=t;S++){let F=S/t,L=r+F*s;f.x=-T*Math.cos(L),f.y=A,f.z=T*Math.sin(L),g.push(f.x,f.y,f.z),u.copy(f).normalize(),v.push(u.x,u.y,u.z),m.push(F+b,1-M),_.push(c++)}h.push(_)}for(let d=0;d<n;d++)for(let _=0;_<t;_++){let M=h[d][_+1],y=h[d][_],A=h[d+1][_],T=h[d+1][_+1];(d!==0||a>0)&&p.push(M,y,T),(d!==n-1||l<Math.PI)&&p.push(y,A,T)}this.setIndex(p),this.setAttribute("position",new xt(g,3)),this.setAttribute("normal",new xt(v,3)),this.setAttribute("uv",new xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var oi=class i extends Mt{constructor(e=new Rs(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new R,l=new R,c=new we,h=new R,f=[],u=[],p=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new xt(f,3)),this.setAttribute("normal",new xt(u,3)),this.setAttribute("uv",new xt(p,2));function v(){for(let M=0;M<t;M++)m(M);m(s===!1?t:0),_(),d()}function m(M){h=e.getPointAt(M/t,h);let y=a.normals[M],A=a.binormals[M];for(let T=0;T<=r;T++){let b=T/r*Math.PI*2,S=Math.sin(b),F=-Math.cos(b);l.x=F*y.x+S*A.x,l.y=F*y.y+S*A.y,l.z=F*y.z+S*A.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,f.push(o.x,o.y,o.z)}}function d(){for(let M=1;M<=t;M++)for(let y=1;y<=r;y++){let A=(r+1)*(M-1)+(y-1),T=(r+1)*M+(y-1),b=(r+1)*M+y,S=(r+1)*(M-1)+y;g.push(A,T,S),g.push(T,b,S)}}function _(){for(let M=0;M<=t;M++)for(let y=0;y<=r;y++)c.x=M/t,c.y=y/r,p.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new xo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function $i(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];if(rh(r))r.isRenderTargetTexture?(tt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(rh(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Zt(i){let e={};for(let t=0;t<i.length;t++){let n=$i(i[t]);for(let r in n)e[r]=n[r]}return e}function rh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Tf(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Kc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}var pi={clone:$i,merge:Zt},Af=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,It=class extends Pn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Af,this.fragmentShader=Cf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=Tf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new Qe().setHex(r.value);break;case"v2":this.uniforms[n].value=new we().fromArray(r.value);break;case"v3":this.uniforms[n].value=new R().fromArray(r.value);break;case"v4":this.uniforms[n].value=new At().fromArray(r.value);break;case"m3":this.uniforms[n].value=new st().fromArray(r.value);break;case"m4":this.uniforms[n].value=new dt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Pr=class extends It{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},yn=class extends Pn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vl,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Us=class extends yn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new we(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ot(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Gi('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Gi('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var bo=class extends Pn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},_o=class extends Pn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function gr(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Xa(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ai=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},yo=class extends Ai{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:mc,endingEnd:mc}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case gc:s=e,o=2*t-n;break;case xc:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case gc:a=e,l=2*n-t;break;case xc:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(n-t)/(r-t),v=g*g,m=v*g,d=-u*m+2*u*v-u*g,_=(1+u)*m+(-1.5-2*u)*v+(-.5+u)*g+1,M=(-1-p)*m+(1.5+p)*v+.5*g,y=p*m-p*v;for(let A=0;A!==o;++A)s[A]=d*a[h+A]+_*a[c+A]+M*a[l+A]+y*a[f+A];return s}},wo=class extends Ai{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(r-t),f=1-h;for(let u=0;u!==o;++u)s[u]=a[c+u]*f+a[l+u]*h;return s}},So=class extends Ai{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Mo=class extends Ai{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let g=(n-t)/(r-t),v=1-g;for(let m=0;m!==o;++m)s[m]=a[c+m]*v+a[l+m]*g;return s}let u=o*2,p=e-1;for(let g=0;g!==o;++g){let v=a[c+g],m=a[l+g],d=p*u+g*2,_=f[d],M=f[d+1],y=e*u+g*2,A=h[y],T=h[y+1],b=If(n,t,_,A,r);s[g]=Qh(b,v,M,T,m)}return s}};function Qh(i,e,t,n,r){let s=1-i;return s*s*s*e+3*s*s*i*t+3*s*i*i*n+i*i*i*r}function Rf(i,e,t,n,r){let s=1-i;return 3*s*s*(t-e)+6*s*i*(n-t)+3*i*i*(r-n)}function If(i,e,t,n,r){let s=(i-e)/(r-e);for(let a=0;a<8;a++){let o=Qh(s,e,t,n,r)-i;if(Math.abs(o)<1e-10)break;let l=Rf(s,e,t,n,r);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}var mn=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=gr(t,this.TimeBufferType),this.values=gr(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:gr(e.times,Array),values:gr(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r),Xa(e.settings)&&(n.settings={inTangents:gr(e.settings.inTangents,Array),outTangents:gr(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new So(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new wo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new yo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Mo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case os:t=this.InterpolantFactoryMethodDiscrete;break;case so:t=this.InterpolantFactoryMethodLinear;break;case Za:t=this.InterpolantFactoryMethodSmooth;break;case fc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return tt("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return os;case this.InterpolantFactoryMethodLinear:return so;case this.InterpolantFactoryMethodSmooth:return Za;case this.InterpolantFactoryMethodBezier:return fc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;Xa(this.settings)&&(sh(this.settings.inTangents,e),sh(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Xa(this.settings)&&(ah(this.settings.inTangents,e),ah(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(it("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(it("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){it("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){it("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&vp(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){it("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Za,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(r)l=!0;else{let f=o*n,u=f-n,p=f+n;for(let g=0;g!==n;++g){let v=t[f+g];if(v!==t[u+g]||v!==t[p+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let f=o*n,u=a*n;for(let p=0;p!==n;++p)t[u+p]=t[f+p]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Xa(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function sh(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function ah(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}mn.prototype.ValueTypeName="";mn.prototype.TimeBufferType=Float32Array;mn.prototype.ValueBufferType=Float32Array;mn.prototype.DefaultInterpolation=so;var Ci=class extends mn{constructor(e,t,n){super(e,t,n)}};Ci.prototype.ValueTypeName="bool";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=os;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var Eo=class extends mn{constructor(e,t,n,r){super(e,t,n,r)}};Eo.prototype.ValueTypeName="color";var To=class extends mn{constructor(e,t,n,r){super(e,t,n,r)}};To.prototype.ValueTypeName="number";var Ao=class extends Ai{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)Qt.slerpFlat(s,0,a,c-o,a,c,l);return s}},Fs=class extends mn{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ao(this.times,this.values,this.getValueSize(),e)}};Fs.prototype.ValueTypeName="quaternion";Fs.prototype.InterpolantFactoryMethodSmooth=void 0;var Ri=class extends mn{constructor(e,t,n){super(e,t,n)}};Ri.prototype.ValueTypeName="string";Ri.prototype.ValueBufferType=Array;Ri.prototype.DefaultInterpolation=os;Ri.prototype.InterpolantFactoryMethodLinear=void 0;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var Co=class extends mn{constructor(e,t,n,r){super(e,t,n,r)}};Co.prototype.ValueTypeName="vector";var Ro=class{constructor(e,t,n){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&r.onStart!==void 0&&r.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,r.onProgress!==void 0&&r.onProgress(h,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){let p=c[f],g=c[f+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},eu=new Ro,Io=class{constructor(e){this.manager=e!==void 0?e:eu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Io.DEFAULT_MATERIAL_NAME="__DEFAULT";var Lr=class extends Pt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Os=class extends Lr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},pc=new dt,oh=new R,lh=new R,Bs=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mi,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new At(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;oh.setFromMatrixPosition(e.matrixWorld),t.position.copy(oh),lh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(lh),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){pc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(pc,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===wr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(pc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ya=new R,qa=new Qt,Un=new R,zs=class extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ya,qa,Un),Un.x===1&&Un.y===1&&Un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ya,qa,Un.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ya,qa,Un),Un.x===1&&Un.y===1&&Un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ya,qa,Un.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},wi=new R,ch=new we,dh=new we,qt=class extends zs{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Mr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(br*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Mr*2*Math.atan(Math.tan(br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(wi.x,wi.y).multiplyScalar(-e/wi.z),wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(wi.x,wi.y).multiplyScalar(-e/wi.z)}getViewSize(e,t){return this.getViewBounds(e,ch,dh),t.subVectors(dh,ch)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(br*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var wc=class extends Bs{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0}},Hs=class extends Lr{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new wc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},qi=class extends zs{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Sc=class extends Bs{constructor(){super(new qi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Dr=class extends Lr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new Sc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var xr=-90,vr=1,Nr=class extends Pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new qt(xr,vr,e,t);r.layers=this.layers,this.add(r);let s=new qt(xr,vr,e,t);s.layers=this.layers,this.add(s);let a=new qt(xr,vr,e,t);a.layers=this.layers,this.add(a);let o=new qt(xr,vr,e,t);o.layers=this.layers,this.add(o);let l=new qt(xr,vr,e,t);l.layers=this.layers,this.add(l);let c=new qt(xr,vr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===bn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===wr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=v,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Po=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Vs=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Pf.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Pf(){this._document.hidden===!1&&this.reset()}var Jc="\\[\\]\\.:\\/",Lf=new RegExp("["+Jc+"]","g"),jc="[^"+Jc+"]",Df="[^"+Jc.replace("\\.","")+"]",Nf=/((?:WC+[\/:])*)/.source.replace("WC",jc),kf=/(WCOD+)?/.source.replace("WCOD",Df),Uf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jc),Ff=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jc),Of=new RegExp("^"+Nf+kf+Uf+Ff+"$"),Bf=["material","materials","bones","map"],Mc=class{constructor(e,t,n){let r=n||St.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},St=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Lf,"")}static parseTrackName(e){let t=Of.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);Bf.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){tt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){it("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){it("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){it("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){it("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){it("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){it("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){it("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;it("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){it("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){it("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};St.Composite=Mc;St.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};St.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};St.prototype.GetterByBindingType=[St.prototype._getValue_direct,St.prototype._getValue_array,St.prototype._getValue_arrayElement,St.prototype._getValue_toArray];St.prototype.SetterByBindingTypeAndVersioning=[[St.prototype._setValue_direct,St.prototype._setValue_direct_setNeedsUpdate,St.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[St.prototype._setValue_array,St.prototype._setValue_array_setNeedsUpdate,St.prototype._setValue_array_setMatrixWorldNeedsUpdate],[St.prototype._setValue_arrayElement,St.prototype._setValue_arrayElement_setNeedsUpdate,St.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[St.prototype._setValue_fromArray,St.prototype._setValue_fromArray_setNeedsUpdate,St.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var rb=new Float32Array(1);var kr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ot(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ot(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Ec=class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};var Gs=class extends In{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function $c(i,e,t,n){let r=zf(n);switch(t){case Fc:return i*e;case Oo:return i*e/r.components*r.byteLength;case Bo:return i*e/r.components*r.byteLength;case Di:return i*e*2/r.components*r.byteLength;case zo:return i*e*2/r.components*r.byteLength;case Oc:return i*e*3/r.components*r.byteLength;case kn:return i*e*4/r.components*r.byteLength;case Ho:return i*e*4/r.components*r.byteLength;case $s:case Qs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ea:case ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Go:case Xo:return Math.max(i,16)*Math.max(e,8)/4;case Vo:case Wo:return Math.max(i,8)*Math.max(e,8)/2;case Yo:case qo:case Ko:case Jo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Zo:case na:case jo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case $o:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Qo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case el:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case tl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case nl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case il:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case rl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case sl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case al:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ol:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ll:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case cl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case dl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case hl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ul:case pl:case fl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ml:case gl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ia:case xl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zf(i){switch(i){case on:case Dc:return{byteLength:1,components:1};case Br:case Nc:case Vt:return{byteLength:2,components:1};case Uo:case Fo:return{byteLength:2,components:4};case Nn:case ko:case wn:return{byteLength:4,components:1};case kc:case Uc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?tt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function wu(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Vf(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,f=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let h=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,h);else{f.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<f.length;p++){let g=f[u],v=f[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,f[u]=v)}f.length=u+1;for(let p=0,g=f.length;p<g;p++){let v=f[p];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Gf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Xf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Jf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,$f=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,em=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,nm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,im=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,sm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,am=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,cm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,dm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,hm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,um=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,pm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,fm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vm="gl_FragColor = linearToOutputTexel( gl_FragColor );",bm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_m=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ym=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,wm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Sm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Em=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Am=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Im=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Nm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,km=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Um=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Om=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Hm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Vm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Gm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wm=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Xm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ym=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Km=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$m=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,eg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ng=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ig=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,sg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ag=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,og=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,lg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,hg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ug=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,vg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_g=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Eg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Tg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ag=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Cg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ig=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Lg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Dg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ng=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ug=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Fg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Og=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Hg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Vg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xg=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Kg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Jg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Qg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,t0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,n0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,i0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,o0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,c0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,d0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,h0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,p0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,m0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,x0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,v0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,b0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,y0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ct={alphahash_fragment:Gf,alphahash_pars_fragment:Wf,alphamap_fragment:Xf,alphamap_pars_fragment:Yf,alphatest_fragment:qf,alphatest_pars_fragment:Zf,aomap_fragment:Kf,aomap_pars_fragment:Jf,batching_pars_vertex:jf,batching_vertex:$f,begin_vertex:Qf,beginnormal_vertex:em,bsdfs:tm,iridescence_fragment:nm,bumpmap_pars_fragment:im,clipping_planes_fragment:rm,clipping_planes_pars_fragment:sm,clipping_planes_pars_vertex:am,clipping_planes_vertex:om,color_fragment:lm,color_pars_fragment:cm,color_pars_vertex:dm,color_vertex:hm,common:um,defaultnormal_vertex:pm,displacementmap_pars_vertex:fm,displacementmap_vertex:mm,emissivemap_fragment:gm,emissivemap_pars_fragment:xm,colorspace_fragment:vm,colorspace_pars_fragment:bm,envmap_fragment:_m,envmap_common_pars_fragment:ym,envmap_pars_fragment:wm,envmap_pars_vertex:Sm,envmap_physical_pars_fragment:Nm,envmap_vertex:Mm,fog_vertex:Em,fog_pars_vertex:Tm,fog_fragment:Am,fog_pars_fragment:Cm,gradientmap_pars_fragment:Rm,lightmap_pars_fragment:Im,lights_lambert_fragment:Pm,lights_lambert_pars_fragment:Lm,lights_pars_begin:Dm,lights_toon_fragment:km,lights_toon_pars_fragment:Um,lights_phong_fragment:Fm,lights_phong_pars_fragment:Om,lights_physical_fragment:Bm,lights_physical_pars_fragment:zm,lights_fragment_begin:Hm,lights_fragment_maps:Vm,lights_fragment_end:Gm,lightprobes_pars_fragment:Wm,logdepthbuf_fragment:Xm,logdepthbuf_pars_fragment:Ym,logdepthbuf_pars_vertex:qm,logdepthbuf_vertex:Zm,map_fragment:Km,map_pars_fragment:Jm,map_particle_fragment:jm,map_particle_pars_fragment:$m,metalnessmap_fragment:Qm,metalnessmap_pars_fragment:eg,morphinstance_vertex:tg,morphcolor_vertex:ng,morphnormal_vertex:ig,morphtarget_pars_vertex:rg,morphtarget_vertex:sg,normal_fragment_begin:ag,normal_fragment_maps:og,normal_pars_fragment:lg,normal_pars_vertex:cg,normal_vertex:dg,normalmap_pars_fragment:hg,clearcoat_normal_fragment_begin:ug,clearcoat_normal_fragment_maps:pg,clearcoat_pars_fragment:fg,iridescence_pars_fragment:mg,opaque_fragment:gg,packing:xg,premultiplied_alpha_fragment:vg,project_vertex:bg,dithering_fragment:_g,dithering_pars_fragment:yg,roughnessmap_fragment:wg,roughnessmap_pars_fragment:Sg,shadowmap_pars_fragment:Mg,shadowmap_pars_vertex:Eg,shadowmap_vertex:Tg,shadowmask_pars_fragment:Ag,skinbase_vertex:Cg,skinning_pars_vertex:Rg,skinning_vertex:Ig,skinnormal_vertex:Pg,specularmap_fragment:Lg,specularmap_pars_fragment:Dg,tonemapping_fragment:Ng,tonemapping_pars_fragment:kg,transmission_fragment:Ug,transmission_pars_fragment:Fg,uv_pars_fragment:Og,uv_pars_vertex:Bg,uv_vertex:zg,worldpos_vertex:Hg,background_vert:Vg,background_frag:Gg,backgroundCube_vert:Wg,backgroundCube_frag:Xg,cube_vert:Yg,cube_frag:qg,depth_vert:Zg,depth_frag:Kg,distance_vert:Jg,distance_frag:jg,equirect_vert:$g,equirect_frag:Qg,linedashed_vert:e0,linedashed_frag:t0,meshbasic_vert:n0,meshbasic_frag:i0,meshlambert_vert:r0,meshlambert_frag:s0,meshmatcap_vert:a0,meshmatcap_frag:o0,meshnormal_vert:l0,meshnormal_frag:c0,meshphong_vert:d0,meshphong_frag:h0,meshphysical_vert:u0,meshphysical_frag:p0,meshtoon_vert:f0,meshtoon_frag:m0,points_vert:g0,points_frag:x0,shadow_vert:v0,shadow_frag:b0,sprite_vert:_0,sprite_frag:y0},Ve={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},Yn={basic:{uniforms:Zt([Ve.common,Ve.specularmap,Ve.envmap,Ve.aomap,Ve.lightmap,Ve.fog]),vertexShader:ct.meshbasic_vert,fragmentShader:ct.meshbasic_frag},lambert:{uniforms:Zt([Ve.common,Ve.specularmap,Ve.envmap,Ve.aomap,Ve.lightmap,Ve.emissivemap,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.fog,Ve.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:ct.meshlambert_vert,fragmentShader:ct.meshlambert_frag},phong:{uniforms:Zt([Ve.common,Ve.specularmap,Ve.envmap,Ve.aomap,Ve.lightmap,Ve.emissivemap,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.fog,Ve.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ct.meshphong_vert,fragmentShader:ct.meshphong_frag},standard:{uniforms:Zt([Ve.common,Ve.envmap,Ve.aomap,Ve.lightmap,Ve.emissivemap,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.roughnessmap,Ve.metalnessmap,Ve.fog,Ve.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag},toon:{uniforms:Zt([Ve.common,Ve.aomap,Ve.lightmap,Ve.emissivemap,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.gradientmap,Ve.fog,Ve.lights,{emissive:{value:new Qe(0)}}]),vertexShader:ct.meshtoon_vert,fragmentShader:ct.meshtoon_frag},matcap:{uniforms:Zt([Ve.common,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,Ve.fog,{matcap:{value:null}}]),vertexShader:ct.meshmatcap_vert,fragmentShader:ct.meshmatcap_frag},points:{uniforms:Zt([Ve.points,Ve.fog]),vertexShader:ct.points_vert,fragmentShader:ct.points_frag},dashed:{uniforms:Zt([Ve.common,Ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ct.linedashed_vert,fragmentShader:ct.linedashed_frag},depth:{uniforms:Zt([Ve.common,Ve.displacementmap]),vertexShader:ct.depth_vert,fragmentShader:ct.depth_frag},normal:{uniforms:Zt([Ve.common,Ve.bumpmap,Ve.normalmap,Ve.displacementmap,{opacity:{value:1}}]),vertexShader:ct.meshnormal_vert,fragmentShader:ct.meshnormal_frag},sprite:{uniforms:Zt([Ve.sprite,Ve.fog]),vertexShader:ct.sprite_vert,fragmentShader:ct.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ct.background_vert,fragmentShader:ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:ct.backgroundCube_vert,fragmentShader:ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ct.cube_vert,fragmentShader:ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ct.equirect_vert,fragmentShader:ct.equirect_frag},distance:{uniforms:Zt([Ve.common,Ve.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ct.distance_vert,fragmentShader:ct.distance_frag},shadow:{uniforms:Zt([Ve.lights,Ve.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:ct.shadow_vert,fragmentShader:ct.shadow_frag}};Yn.physical={uniforms:Zt([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new st},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag};var _l={r:0,b:0,g:0},w0=new dt,Su=new st;Su.set(-1,0,0,0,1,0,0,0,1);function S0(i,e,t,n,r,s){let a=new Qe(0),o=r===!0?0:1,l,c,h=null,f=0,u=null;function p(_){let M=_.isScene===!0?_.background:null;if(M&&M.isTexture){let y=_.backgroundBlurriness>0;M=e.get(M,y)}return M}function g(_){let M=!1,y=p(_);y===null?m(a,o):y&&y.isColor&&(m(y,1),M=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(_,M){let y=p(M);y&&y.isCubeTexture?(c===void 0&&(c=new bt(new pn(1,1,1),new It({name:"BackgroundCubeMaterial",uniforms:$i(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(w0.makeRotationFromEuler(M.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Su),c.material.toneMapped=ht.getTransfer(y.colorSpace)!==mt,(h!==y||f!==y.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,u=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new bt(new Yi(2,2),new It({name:"BackgroundMaterial",uniforms:$i(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:Li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=ht.getTransfer(y.colorSpace)!==mt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,u=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,M){_.getRGB(_l,Kc(i)),t.buffers.color.setClear(_l.r,_l.g,_l.b,M,s)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,M=1){a.set(_),o=M,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,m(a,o)},render:g,addToRenderList:v,dispose:d}}function M0(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=u(null),s=r,a=!1;function o(N,q,te,D,K){let $=!1,B=f(N,D,te,q);s!==B&&(s=B,c(s.object)),$=p(N,D,te,K),$&&g(N,D,te,K),K!==null&&e.update(K,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,y(N,q,te,D),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function l(){return i.createVertexArray()}function c(N){return i.bindVertexArray(N)}function h(N){return i.deleteVertexArray(N)}function f(N,q,te,D){let K=D.wireframe===!0,$=n[q.id];$===void 0&&($={},n[q.id]=$);let B=N.isInstancedMesh===!0?N.id:0,pe=$[B];pe===void 0&&(pe={},$[B]=pe);let W=pe[te.id];W===void 0&&(W={},pe[te.id]=W);let se=W[K];return se===void 0&&(se=u(l()),W[K]=se),se}function u(N){let q=[],te=[],D=[];for(let K=0;K<t;K++)q[K]=0,te[K]=0,D[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:te,attributeDivisors:D,object:N,attributes:{},index:null}}function p(N,q,te,D){let K=s.attributes,$=q.attributes,B=0,pe=te.getAttributes();for(let W in pe)if(pe[W].location>=0){let Y=K[W],ke=$[W];if(ke===void 0&&(W==="instanceMatrix"&&N.instanceMatrix&&(ke=N.instanceMatrix),W==="instanceColor"&&N.instanceColor&&(ke=N.instanceColor)),Y===void 0||Y.attribute!==ke||ke&&Y.data!==ke.data)return!0;B++}return s.attributesNum!==B||s.index!==D}function g(N,q,te,D){let K={},$=q.attributes,B=0,pe=te.getAttributes();for(let W in pe)if(pe[W].location>=0){let Y=$[W];Y===void 0&&(W==="instanceMatrix"&&N.instanceMatrix&&(Y=N.instanceMatrix),W==="instanceColor"&&N.instanceColor&&(Y=N.instanceColor));let ke={};ke.attribute=Y,Y&&Y.data&&(ke.data=Y.data),K[W]=ke,B++}s.attributes=K,s.attributesNum=B,s.index=D}function v(){let N=s.newAttributes;for(let q=0,te=N.length;q<te;q++)N[q]=0}function m(N){d(N,0)}function d(N,q){let te=s.newAttributes,D=s.enabledAttributes,K=s.attributeDivisors;te[N]=1,D[N]===0&&(i.enableVertexAttribArray(N),D[N]=1),K[N]!==q&&(i.vertexAttribDivisor(N,q),K[N]=q)}function _(){let N=s.newAttributes,q=s.enabledAttributes;for(let te=0,D=q.length;te<D;te++)q[te]!==N[te]&&(i.disableVertexAttribArray(te),q[te]=0)}function M(N,q,te,D,K,$,B){B===!0?i.vertexAttribIPointer(N,q,te,K,$):i.vertexAttribPointer(N,q,te,D,K,$)}function y(N,q,te,D){v();let K=D.attributes,$=te.getAttributes(),B=q.defaultAttributeValues;for(let pe in $){let W=$[pe];if(W.location>=0){let se=K[pe];if(se===void 0&&(pe==="instanceMatrix"&&N.instanceMatrix&&(se=N.instanceMatrix),pe==="instanceColor"&&N.instanceColor&&(se=N.instanceColor)),se!==void 0){let Y=se.normalized,ke=se.itemSize,Ue=e.get(se);if(Ue===void 0)continue;let Q=Ue.buffer,Le=Ue.type,fe=Ue.bytesPerElement,G=Le===i.INT||Le===i.UNSIGNED_INT||se.gpuType===ko;if(se.isInterleavedBufferAttribute){let re=se.data,Me=re.isInterleavedBuffer===!0?re.stride:re.itemSize,Ke=se.offset;if(re.isInstancedInterleavedBuffer||re.isInstancedBufferAttribute){for(let De=0;De<W.locationSize;De++)d(W.location+De,re.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let De=0;De<W.locationSize;De++)m(W.location+De);i.bindBuffer(i.ARRAY_BUFFER,Q);for(let De=0;De<W.locationSize;De++)M(W.location+De,ke/W.locationSize,Le,Y,Me*fe,(Ke+ke/W.locationSize*De)*fe,G)}else{if(se.isInstancedBufferAttribute){for(let re=0;re<W.locationSize;re++)d(W.location+re,se.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let re=0;re<W.locationSize;re++)m(W.location+re);i.bindBuffer(i.ARRAY_BUFFER,Q);for(let re=0;re<W.locationSize;re++)M(W.location+re,ke/W.locationSize,Le,Y,ke*fe,ke/W.locationSize*re*fe,G)}}else if(B!==void 0){let Y=B[pe];if(Y!==void 0)switch(Y.length){case 2:i.vertexAttrib2fv(W.location,Y);break;case 3:i.vertexAttrib3fv(W.location,Y);break;case 4:i.vertexAttrib4fv(W.location,Y);break;default:i.vertexAttrib1fv(W.location,Y)}}}}_()}function A(){F();for(let N in n){let q=n[N];for(let te in q){let D=q[te];for(let K in D){let $=D[K];for(let B in $)h($[B].object),delete $[B];delete D[K]}}delete n[N]}}function T(N){if(n[N.id]===void 0)return;let q=n[N.id];for(let te in q){let D=q[te];for(let K in D){let $=D[K];for(let B in $)h($[B].object),delete $[B];delete D[K]}}delete n[N.id]}function b(N){for(let q in n){let te=n[q];for(let D in te){let K=te[D];if(K[N.id]===void 0)continue;let $=K[N.id];for(let B in $)h($[B].object),delete $[B];delete K[N.id]}}}function S(N){for(let q in n){let te=n[q],D=N.isInstancedMesh===!0?N.id:0,K=te[D];if(K!==void 0){for(let $ in K){let B=K[$];for(let pe in B)h(B[pe].object),delete B[pe];delete K[$]}delete te[D],Object.keys(te).length===0&&delete n[q]}}}function F(){L(),a=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:F,resetDefaultState:L,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:S,releaseStatesOfProgram:b,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function E0(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let p=0;p<h;p++)u+=c[p];t.update(u,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function T0(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let b=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(b){return!(b!==kn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){let S=b===Vt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==on&&b!==wn&&!S&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(tt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=t.logarithmicDepthBuffer===!0&&f===!1;t.reversedDepthBuffer===!0&&f===!1&&tt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&f===!0&&tt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:_,maxVaryings:M,maxFragmentUniforms:y,maxSamples:A,samples:T}}function A0(i){let e=this,t=null,n=0,r=!1,s=!1,a=new hn,o=new st,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let p=f.length!==0||u||n!==0||r;return r=u,n=f.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,p){let g=f.clippingPlanes,v=f.clipIntersection,m=f.clipShadows,d=i.get(f);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{let _=s?0:n,M=_*4,y=d.clippingState||null;l.value=y,y=h(g,u,M,p);for(let A=0;A!==M;++A)y[A]=t[A];d.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,p,g){let v=f!==null?f.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let d=p+v*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<d)&&(m=new Float32Array(d));for(let M=0,y=p;M!==v;++M,y+=4)a.copy(f[M]).applyMatrix4(_,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}var aa=class extends Nt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ws(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new pn(5,5,5),s=new It({name:"CubemapFromEquirect",uniforms:$i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:li});s.uniforms.tEquirect.value=t;let a=new bt(r,s),o=t.minFilter;return t.minFilter===ci&&(t.minFilter=$t),new Nr(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}},tu=256,C0=3,R0=20,Mu=256,Eu=16,I0=3,P0=new R,L0=new Qe,wl=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Nr(1,10,null),this._boxMesh=new bt(new pn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=P0}=s,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let f=l.autoClear,u=l.autoClearColor,p=l.autoClearDepth,g=l.autoClearStencil,v=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,v===null&&(e.background=l.getClearColor(L0));let m=new Nr(n,r,h);return m.position.copy(o),m.update(l,e),l.autoClear=f,l.autoClearColor=u,l.autoClearDepth=p,l.autoClearStencil=g,e.background=v,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ru(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=iu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(tu,Xc(e))}_fromTexture(e,t){e.mapping===Ji||e.mapping===Or?this._setSize(e.image.length===0?tu:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=nu(e,!1,!1),n=Math.log2(e)-C0;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=nu(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,s=this._cubeCamera;r.material=n,s.renderTarget=e,s.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),s.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Ji||e.mapping===Or?(this._cubemapMaterial===null&&(this._cubemapMaterial=ru()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=iu()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=D0(),this._integrationMaterial=N0());let t=this._cubeSize,n=e.texture.mipmaps.length-1,r=this._ggxMaterial.uniforms;r.envMap.value=this._sourceTarget.texture;let s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(t/Eu);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-I0)s.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let l=o>0?Math.log2(t)+.5*Math.log2(6/(Mu*Math.pow(o,4)))+.5:0;r.roughness.value=o,r.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=k0());let n=this._blurMaterial,r=n.uniforms,s=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=s.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(s,0,n)}};function nu(i,e,t){return new aa(i,{minFilter:ci,generateMipmaps:e,type:Vt,colorSpace:ls,depthBuffer:t})}function oa(i,e,t){return new It({name:i,uniforms:e,vertexShader:ct.cube_vert,fragmentShader:t,side:tn,blending:li,depthTest:!1,depthWrite:!1})}function D0(){return oa("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Mu}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function N0(){return oa("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Eu}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function k0(){return oa("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${R0}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function iu(){return oa("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function ru(){return oa("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function U0(i){let e=new WeakMap,t=new WeakMap,n=null;function r(u,p=!1){return u==null?null:p?a(u):s(u)}function s(u){if(u&&u.isTexture){let p=u.mapping;if(p===Lo||p===Do)if(e.has(u)){let g=e.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let v=new aa(g.height);return v.fromEquirectangularTexture(i,u),e.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let p=u.mapping,g=p===Lo||p===Do,v=p===Ji||p===Or;if(g||v){let m=t.get(u),d=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return n===null&&(n=new wl(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let _=u.image;return g&&_&&_.height>0||v&&_&&l(_)?(n===null&&(n=new wl(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,p){return p===Lo?u.mapping=Ji:p===Do&&(u.mapping=Or),u}function l(u){let p=0,g=6;for(let v=0;v<g;v++)u[v]!==void 0&&p++;return p===g}function c(u){let p=u.target;p.removeEventListener("dispose",c);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(u){let p=u.target;p.removeEventListener("dispose",h);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function F0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Gi("WebGLRenderer: "+n+" extension not supported."),r}}}function O0(i,e,t,n){let r={},s=new WeakMap,a=new FinalizationRegistry(g=>delete r[g]);function o(g){l(g.target)}function l(g){g.index!==null&&e.remove(g.index);for(let m in g.attributes)e.remove(g.attributes[m]);g.removeEventListener("dispose",o),delete r[g.id],a.unregister(g);let v=s.get(g);v&&(e.remove(v),s.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function c(g,v){return r[v.id]!==void 0||(v.addEventListener("dispose",o),r[v.id]=new WeakRef(v),a.register(v,v.id,v),t.memory.geometries++),v}function h(g){let v=g.attributes;for(let m in v)e.update(v[m],i.ARRAY_BUFFER)}function f(g){let v=g.index,m=g.attributes.position,d=0;if(m===void 0)return;let _=v!==null?v.array.length:m.array.length/3-1,M=m.count>=65535?xs:gs,y=new M(Math.ceil(_/3)*6,1),A=y.array;if(v!==null){let b=v.array;d=v.version;for(let S=0,F=0;S<_;S+=3){let L=b[S+0],N=b[S+1],q=b[S+2];A[F++]=L,A[F++]=N,A[F++]=N,A[F++]=q,A[F++]=q,A[F++]=L}}else{d=m.version;for(let b=0,S=0;b<_;b+=3){let F=b+0,L=b+1,N=b+2;A[S++]=F,A[S++]=L,A[S++]=L,A[S++]=N,A[S++]=N,A[S++]=F}}y.version=d;let T=s.get(g);T&&e.remove(T),s.set(g,y)}function u(g){let v=s.get(g);if(v){let m=g.index;m!==null&&v.version<m.version&&f(g)}else f(g);return s.get(g)}function p(){for(let g in r){let v=r[g].deref();v!==void 0&&l(v)}}return{get:c,update:h,getWireframeAttribute:u,dispose:p}}function B0(i,e,t){let n;function r(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,u){i.drawElements(n,u,s,f*a),t.update(u,n,1)}function c(f,u,p){p!==0&&(i.drawElementsInstanced(n,u,s,f*a,p),t.update(u,n,p))}function h(f,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,f,0,p);let v=0;for(let m=0;m<p;m++)v+=u[m];t.update(v,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function z0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:it("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function H0(i,e,t){let n=new WeakMap,r=new At;function s(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==f){let F=function(){b.dispose(),n.delete(o),o.removeEventListener("dispose",F)};u!==void 0&&u.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],_=o.morphAttributes.color||[],M=0;p===!0&&(M=1),g===!0&&(M=2),v===!0&&(M=3);let y=o.attributes.position.count*M,A=1;y>e.maxTextureSize&&(A=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*A*4*f),b=new us(T,y,A,f);b.type=wn,b.needsUpdate=!0;let S=M*4;for(let L=0;L<f;L++){let N=m[L],q=d[L],te=_[L],D=y*A*4*L;for(let K=0;K<N.count;K++){let $=K*S;p===!0&&(r.fromBufferAttribute(N,K),T[D+$+0]=r.x,T[D+$+1]=r.y,T[D+$+2]=r.z,T[D+$+3]=0),g===!0&&(r.fromBufferAttribute(q,K),T[D+$+4]=r.x,T[D+$+5]=r.y,T[D+$+6]=r.z,T[D+$+7]=0),v===!0&&(r.fromBufferAttribute(te,K),T[D+$+8]=r.x,T[D+$+9]=r.y,T[D+$+10]=r.z,T[D+$+11]=te.itemSize===4?r.w:1)}}u={count:f,texture:b,size:new we(y,A)},n.set(o,u),o.addEventListener("dispose",F)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:s}}function V0(i,e,t,n,r){let s=new WeakMap;function a(c){let h=r.render.frame,f=c.geometry,u=e.get(c,f);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let p=c.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return u}function o(){s=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var G0={[Xs]:"LINEAR_TONE_MAPPING",[Ys]:"REINHARD_TONE_MAPPING",[qs]:"CINEON_TONE_MAPPING",[Ki]:"ACES_FILMIC_TONE_MAPPING",[Ks]:"AGX_TONE_MAPPING",[Js]:"NEUTRAL_TONE_MAPPING",[Zs]:"CUSTOM_TONE_MAPPING"};function W0(i,e,t,n,r,s){let a=new Nt(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new Mt;h.setAttribute("position",new xt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new xt([0,2,0,0,2,0],2));let f=new Pr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new bt(h,f),p=new qi(-1,1,1,-1,0,1),g=null,v=null,m=!1,d,_=null,M=[],y=!1;this.setSize=function(A,T){a.setSize(A,T),o!==null&&o.setSize(A,T),l!==null&&l.setSize(A,T);for(let b=0;b<M.length;b++){let S=M[b];S.setSize&&S.setSize(A,T)}},this.setEffects=function(A){M=A,y=M.length>0&&M[0].isRenderPass===!0;let T=a.width,b=a.height;M.length>0&&o===null&&(o=new Nt(T,b,{type:Vt,depthBuffer:!1,stencilBuffer:!1}),l=new Nt(T,b,{type:Vt,depthBuffer:!1,stencilBuffer:!1}));let S=r===!0&&M.some(F=>F.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&c===null&&(c=new ri(T,b),s===!0&&(c.format=di,c.type=ji)),a.dispose(),a.depthTexture=S?c:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let F=0;F<M.length;F++){let L=M[F];L.setSize&&L.setSize(T,b),S&&L.needsDepthTexture===!0&&L.setDepthTexture&&L.setDepthTexture(c)}},this.begin=function(A,T){if(m||A.toneMapping===Gn&&M.length===0)return!1;if(_=T,T!==null){let b=T.width,S=T.height;(a.width!==b||a.height!==S)&&this.setSize(b,S)}return y===!1&&A.setRenderTarget(a),d=A.toneMapping,A.toneMapping=Gn,!0},this.hasRenderPass=function(){return y},this.end=function(A,T){A.toneMapping=d,m=!0;let b=a,S=o;for(let F=0;F<M.length;F++){let L=M[F];L.enabled!==!1&&(L.render(A,S,b,T),L.needsSwap!==!1&&(b=S,S=S===o?l:o))}if(g!==A.outputColorSpace||v!==A.toneMapping){g=A.outputColorSpace,v=A.toneMapping,f.defines={},ht.getTransfer(g)===mt&&(f.defines.SRGB_TRANSFER="");let F=G0[v];F&&(f.defines[F]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=b.texture,A.setRenderTarget(_),A.render(u,p),_=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),f.dispose()}}var Tu=new en,Au=new ri(1,1),Cu=new Ms(1),Ru=new us,Iu=new lo,Pu=new ws,su=[],au=[],ou=new Float32Array(16),lu=new Float32Array(9),cu=new Float32Array(4);function Hr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=su[r];if(s===void 0&&(s=new Float32Array(r),su[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ut(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ml(i,e){let t=au[e];t===void 0&&(t=new Int32Array(e),au[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function X0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Y0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Ut(t,e)}}function q0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Ut(t,e)}}function Z0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Ut(t,e)}}function K0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(kt(t,n))return;cu.set(n),i.uniformMatrix2fv(this.addr,!1,cu),Ut(t,n)}}function J0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(kt(t,n))return;lu.set(n),i.uniformMatrix3fv(this.addr,!1,lu),Ut(t,n)}}function j0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(kt(t,n))return;ou.set(n),i.uniformMatrix4fv(this.addr,!1,ou),Ut(t,n)}}function $0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Q0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Ut(t,e)}}function ex(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Ut(t,e)}}function tx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Ut(t,e)}}function nx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ix(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Ut(t,e)}}function rx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Ut(t,e)}}function sx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Ut(t,e)}}function El(i){return i.version===0&&(i.compareFunction=Hc,i.needsUpdate=!0),i}function ax(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?s=El(Au):s=Tu,t.setTexture2D(e||s,r)}function ox(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Iu,r)}function lx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_CUBE_SHADOW?s=El(Cu):s=Pu,t.setTextureCube(e||s,r)}function cx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Ru,r)}function dx(i){switch(i){case 5126:return X0;case 35664:return Y0;case 35665:return q0;case 35666:return Z0;case 35674:return K0;case 35675:return J0;case 35676:return j0;case 5124:case 35670:return $0;case 35667:case 35671:return Q0;case 35668:case 35672:return ex;case 35669:case 35673:return tx;case 5125:return nx;case 36294:return ix;case 36295:return rx;case 36296:return sx;case 35678:case 36198:case 36298:case 36306:case 35682:return ax;case 35679:case 36299:case 36307:return ox;case 35680:case 36300:case 36308:case 36293:return lx;case 36289:case 36303:case 36311:case 36292:return cx}}function hx(i,e){i.uniform1fv(this.addr,e)}function ux(i,e){let t=Hr(e,this.size,2);i.uniform2fv(this.addr,t)}function px(i,e){let t=Hr(e,this.size,3);i.uniform3fv(this.addr,t)}function fx(i,e){let t=Hr(e,this.size,4);i.uniform4fv(this.addr,t)}function mx(i,e){let t=Hr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function gx(i,e){let t=Hr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function xx(i,e){let t=Hr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function vx(i,e){i.uniform1iv(this.addr,e)}function bx(i,e){i.uniform2iv(this.addr,e)}function _x(i,e){i.uniform3iv(this.addr,e)}function yx(i,e){i.uniform4iv(this.addr,e)}function wx(i,e){i.uniform1uiv(this.addr,e)}function Sx(i,e){i.uniform2uiv(this.addr,e)}function Mx(i,e){i.uniform3uiv(this.addr,e)}function Ex(i,e){i.uniform4uiv(this.addr,e)}function Tx(i,e,t){let n=this.cache,r=e.length,s=Ml(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),Ut(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=El(Au):a=Tu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Ax(i,e,t){let n=this.cache,r=e.length,s=Ml(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),Ut(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Iu,s[a])}function Cx(i,e,t){let n=this.cache,r=e.length,s=Ml(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),Ut(n,s));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=El(Cu):a=Pu;for(let o=0;o!==r;++o)t.setTextureCube(e[o]||a,s[o])}function Rx(i,e,t){let n=this.cache,r=e.length,s=Ml(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),Ut(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Ru,s[a])}function Ix(i){switch(i){case 5126:return hx;case 35664:return ux;case 35665:return px;case 35666:return fx;case 35674:return mx;case 35675:return gx;case 35676:return xx;case 5124:case 35670:return vx;case 35667:case 35671:return bx;case 35668:case 35672:return _x;case 35669:case 35673:return yx;case 5125:return wx;case 36294:return Sx;case 36295:return Mx;case 36296:return Ex;case 35678:case 36198:case 36298:case 36306:case 35682:return Tx;case 35679:case 36299:case 36307:return Ax;case 35680:case 36300:case 36308:case 36293:return Cx;case 36289:case 36303:case 36311:case 36292:return Rx}}var td=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=dx(t.type)}},nd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ix(t.type)}},id=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},Qc=/(\w+)(\])?(\[|\.)?/g;function du(i,e){i.seq.push(e),i.map[e.id]=e}function Px(i,e,t){let n=i.name,r=n.length;for(Qc.lastIndex=0;;){let s=Qc.exec(n),a=Qc.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){du(t,c===void 0?new td(o,i,e):new nd(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new id(o),du(t,f)),t=f}}}var zr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Px(o,l,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function hu(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Lx=37297,Dx=0;function Nx(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var uu=new st;function kx(i){ht._getMatrix(uu,ht.workingColorSpace,i);let e=`mat3( ${uu.elements.map(t=>t.toFixed(4))} )`;switch(ht.getTransfer(i)){case cs:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return tt("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function pu(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Nx(i.getShaderSource(e),o)}else return s}function Ux(i,e){let t=kx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Fx={[Xs]:"Linear",[Ys]:"Reinhard",[qs]:"Cineon",[Ki]:"ACESFilmic",[Ks]:"AgX",[Js]:"Neutral",[Zs]:"Custom"};function Ox(i,e){let t=Fx[e];return t===void 0?(tt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var yl=new R;function Bx(){ht.getLuminanceCoefficients(yl);let i=yl.x.toFixed(4),e=yl.y.toFixed(4),t=yl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(sa).join(`
`)}function Hx(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Vx(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function sa(i){return i!==""}function fu(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function mu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Gx=/^[ \t]*#include +<([\w\d./]+)>/gm;function rd(i){return i.replace(Gx,Wx)}function Wx(i,e){let t=ct[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return rd(t)}var Xx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gu(i){return i.replace(Xx,Yx)}function Yx(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function xu(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var qx={[Ws]:"SHADOWMAP_TYPE_PCF",[Ur]:"SHADOWMAP_TYPE_VSM"};function Zx(i){return qx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Kx={[Or]:"ENVMAP_MODE_REFRACTION"};function Jx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Kx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var jx={[Pc]:"ENVMAP_BLENDING_MULTIPLY",[Lh]:"ENVMAP_BLENDING_MIX",[Dh]:"ENVMAP_BLENDING_ADD"};function $x(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":jx[i.combine]||"ENVMAP_BLENDING_NONE"}function Qx(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Zx(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Jx(t),f=$x(t),u=zx(t),p=Hx(s),g=r.createProgram(),v,m,d=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(sa).join(`
`),v.length>0&&(v+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(sa).join(`
`),m.length>0&&(m+=`
`)):(v=[xu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sa).join(`
`),m=[xu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?ct.tonemapping_pars_fragment:"",t.toneMapping!==Gn?Ox("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ct.colorspace_pars_fragment,Ux("linearToOutputTexel",t.outputColorSpace),Bx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(sa).join(`
`)),a=rd(a),a=fu(a,t),a=mu(a,t),o=rd(o),o=fu(o,t),o=mu(o,t),a=gu(a),o=gu(o),t.isRawShaderMaterial!==!0&&(d=`#version 300 es
`,v=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,m=["#define varying in",t.glslVersion===Gc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Gc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let _=d+v+a,M=d+m+o,y=hu(r,r.VERTEX_SHADER,_),A=hu(r,r.FRAGMENT_SHADER,M);r.attachShader(g,y),r.attachShader(g,A),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function T(L){if(i.debug.checkShaderErrors){let N=r.getProgramInfoLog(g)||"",q=r.getShaderInfoLog(y)||"",te=r.getShaderInfoLog(A)||"",D=N.trim(),K=q.trim(),$=te.trim(),B=!0,pe=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,g,y,A);else{let W=pu(r,y,"vertex"),se=pu(r,A,"fragment");it("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+D+`
`+W+`
`+se)}else D!==""?tt("WebGLProgram: Program Info Log:",D):(K===""||$==="")&&(pe=!1);pe&&(L.diagnostics={runnable:B,programLog:D,vertexShader:{log:K,prefix:v},fragmentShader:{log:$,prefix:m}})}r.deleteShader(y),r.deleteShader(A),b=new zr(r,g),S=Vx(r,g)}let b;this.getUniforms=function(){return b===void 0&&T(this),b};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=r.getProgramParameter(g,Lx)),F},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Dx++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=y,this.fragmentShader=A,this}var ev=0,sd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ad(e),t.set(e,n)),n}},ad=class{constructor(e){this.id=ev++,this.code=e,this.usedTimes=0}};function tv(i){return i===Di||i===na||i===ia}function nv(i,e,t,n,r,s){let a=new ps,o=new sd,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(b){return l.add(b),b===0?"uv":`uv${b}`}function g(b,S,F,L,N,q){let te=L.fog,D=N.geometry,K=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?L.environment:null,$=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,B=e.get(b.envMap||K,$),pe=u[b.type],W=n.precision;b.precision!==null&&(W=n.getMaxPrecision(b.precision),W!==b.precision&&tt("WebGLProgram.getParameters:",b.precision,"not supported, using",W,"instead."));let se=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,Y=se!==void 0?se.length:0,ke=0;D.morphAttributes.position!==void 0&&(ke=1),D.morphAttributes.normal!==void 0&&(ke=2),D.morphAttributes.color!==void 0&&(ke=3);let Ue,Q,Le,fe;if(pe){let z=Yn[pe];Ue=z.vertexShader,Q=z.fragmentShader}else{Ue=b.vertexShader,Q=b.fragmentShader;let z=o.getVertexShaderStage(b),ce=o.getFragmentShaderStage(b);o.update(b,z,ce),Le=z.id,fe=ce.id}let G=i.getRenderTarget(),re=i.state.buffers.depth.getReversed(),Me=N.isInstancedMesh===!0,Ke=N.isBatchedMesh===!0,De=!!b.map,et=!!b.matcap,Je=!!B,me=Je&&B.isPMREMTexture===!0,Ce=!!b.aoMap,xe=!!b.lightMap,Ie=!!b.bumpMap&&b.wireframe===!1,be=!!b.normalMap,$e=!!b.displacementMap,Xe=!!b.emissiveMap,nt=!!b.metalnessMap,k=!!b.roughnessMap,ue=b.anisotropy>0,C=b.clearcoat>0,ve=b.diffuseRoughness>0,Ne=b.dispersion>0,Re=b.retroreflectivity>0,he=b.iridescence>0,ae=b.sheen>0,Te=b.transmission>0,We=ue&&!!b.anisotropyMap,E=C&&!!b.clearcoatMap,x=C&&!!b.clearcoatNormalMap,I=C&&!!b.clearcoatRoughnessMap,oe=ve&&!!b.diffuseRoughnessMap,ie=he&&!!b.iridescenceMap,_e=he&&!!b.iridescenceThicknessMap,ye=ae&&!!b.sheenColorMap,J=ae&&!!b.sheenRoughnessMap,X=!!b.specularMap,Ae=!!b.specularColorMap,P=!!b.specularIntensityMap,le=Te&&!!b.transmissionMap,ne=Te&&!!b.thicknessMap,Ee=!!b.gradientMap,Se=!!b.alphaMap,Pe=b.alphaTest>0,V=!!b.alphaHash,H=!!b.extensions,Z=Gn;b.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(Z=i.toneMapping);let ge=me?B.isCompressedCubeTexture?B.image[0].mipmaps:B.mipmaps:null,O={shaderID:pe,shaderType:b.type,shaderName:b.name,vertexShader:Ue,fragmentShader:Q,defines:b.defines,customVertexShaderID:Le,customFragmentShaderID:fe,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:W,batching:Ke,batchingColor:Ke&&N._colorsTexture!==null,instancing:Me,instancingColor:Me&&N.instanceColor!==null,instancingMorph:Me&&N.morphTexture!==null,outputColorSpace:G===null?i.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:ht.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:De,matcap:et,envMap:Je,envMapMode:Je&&B.mapping,envMapPMREM:me,envMapMaxLod:me?ge.length-1:null,envMapSize:me?ge[0].width:null,aoMap:Ce,lightMap:xe,bumpMap:Ie,normalMap:be,displacementMap:$e,emissiveMap:Xe,normalMapObjectSpace:be&&b.normalMapType===Uh,normalMapTangentSpace:be&&b.normalMapType===vl,packedNormalMap:be&&b.normalMapType===vl&&tv(b.normalMap.format),metalnessMap:nt,roughnessMap:k,anisotropy:ue,anisotropyMap:We,clearcoat:C,clearcoatMap:E,clearcoatNormalMap:x,clearcoatRoughnessMap:I,diffuseRoughness:ve,diffuseRoughnessMap:oe,dispersion:Ne,retroreflection:Re,iridescence:he,iridescenceMap:ie,iridescenceThicknessMap:_e,sheen:ae,sheenColorMap:ye,sheenRoughnessMap:J,specularMap:X,specularColorMap:Ae,specularIntensityMap:P,transmission:Te,transmissionMap:le,thicknessMap:ne,gradientMap:Ee,opaque:b.transparent===!1&&b.blending===Fr&&b.alphaToCoverage===!1,alphaMap:Se,alphaTest:Pe,alphaHash:V,combine:b.combine,mapUv:De&&p(b.map.channel),aoMapUv:Ce&&p(b.aoMap.channel),lightMapUv:xe&&p(b.lightMap.channel),bumpMapUv:Ie&&p(b.bumpMap.channel),normalMapUv:be&&p(b.normalMap.channel),displacementMapUv:$e&&p(b.displacementMap.channel),emissiveMapUv:Xe&&p(b.emissiveMap.channel),metalnessMapUv:nt&&p(b.metalnessMap.channel),roughnessMapUv:k&&p(b.roughnessMap.channel),anisotropyMapUv:We&&p(b.anisotropyMap.channel),clearcoatMapUv:E&&p(b.clearcoatMap.channel),clearcoatNormalMapUv:x&&p(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:I&&p(b.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:oe&&p(b.diffuseRoughnessMap.channel),iridescenceMapUv:ie&&p(b.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&p(b.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&p(b.sheenColorMap.channel),sheenRoughnessMapUv:J&&p(b.sheenRoughnessMap.channel),specularMapUv:X&&p(b.specularMap.channel),specularColorMapUv:Ae&&p(b.specularColorMap.channel),specularIntensityMapUv:P&&p(b.specularIntensityMap.channel),transmissionMapUv:le&&p(b.transmissionMap.channel),thicknessMapUv:ne&&p(b.thicknessMap.channel),alphaMapUv:Se&&p(b.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(be||ue),vertexNormals:!!D.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!D.attributes.uv&&(De||Se),fog:!!te,useFog:b.fog===!0,fogExp2:!!te&&te.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||D.attributes.normal===void 0&&be===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:re,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:ke,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:q.filter(z=>z.texture!==null).length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:Z,decodeVideoTexture:De&&b.map.isVideoTexture===!0&&ht.getTransfer(b.map.colorSpace)===mt,decodeVideoTextureEmissive:Xe&&b.emissiveMap.isVideoTexture===!0&&ht.getTransfer(b.emissiveMap.colorSpace)===mt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Vn,flipSided:b.side===tn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:H&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(H&&b.extensions.multiDraw===!0||Ke)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return O.vertexUv1s=l.has(1),O.vertexUv2s=l.has(2),O.vertexUv3s=l.has(3),l.clear(),O}function v(b){let S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(let F in b.defines)S.push(F),S.push(b.defines[F]);return b.isRawShaderMaterial===!1&&(m(S,b),d(S,b),S.push(i.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function m(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapPMREM),b.push(S.envMapMaxLod),b.push(S.envMapSize),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.diffuseRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.numSunLights),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numSunLightShadows),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.numLightProbeGrids),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function d(b,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),b.push(a.mask)}function _(b){let S=u[b.type],F;if(S){let L=Yn[S];F=pi.clone(L.uniforms)}else F=b.uniforms;return F}function M(b,S){let F=h.get(S);return F!==void 0?++F.usedTimes:(F=new Qx(i,S,b,r),c.push(F),h.set(S,F)),F}function y(b){if(--b.usedTimes===0){let S=c.indexOf(b);c[S]=c[c.length-1],c.pop(),h.delete(b.cacheKey),b.destroy()}}function A(b){o.remove(b)}function T(){o.dispose()}return{getParameters:g,getProgramCacheKey:v,getUniforms:_,acquireProgram:M,releaseProgram:y,releaseShaderCache:A,programs:c,dispose:T}}function iv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function rv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function vu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bu(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,v,m,d){let _=i[e];return _===void 0?(_={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:m,group:d},i[e]=_):(_.id=u.id,_.object=u,_.geometry=p,_.material=g,_.materialVariant=a(u),_.groupOrder=v,_.renderOrder=u.renderOrder,_.z=m,_.group=d),e++,_}function l(u,p,g,v,m,d,_){_.reversedDepth===!0&&(m=-m);let M=o(u,p,g,v,m,d);g.transmission>0?n.push(M):g.transparent===!0?r.push(M):t.push(M)}function c(u,p,g,v,m,d){let _=o(u,p,g,v,m,d);g.transmission>0?n.unshift(_):g.transparent===!0?r.unshift(_):t.unshift(_)}function h(u,p){t.length>1&&t.sort(u||rv),n.length>1&&n.sort(p||vu),r.length>1&&r.sort(p||vu)}function f(){for(let u=e,p=i.length;u<p;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:f,sort:h}}function sv(){let i=new WeakMap;function e(n,r){let s=i.get(n),a;return s===void 0?(a=new bu,i.set(n,[a])):r>=s.length?(a=new bu,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function av(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new R,color:new Qe};break;case"SpotLight":t={position:new R,direction:new R,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function ov(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var lv=0;function cv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function dv(i){let e=new av,t=ov(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);let r=new R,s=new dt,a=new dt;function o(c){let h=0,f=0,u=0;for(let q=0;q<9;q++)n.probe[q].set(0,0,0);let p=0,g=0,v=0,m=0,d=0,_=0,M=0,y=0,A=0,T=0,b=0,S=0,F=0,L=0;c.sort(cv);for(let q=0,te=c.length;q<te;q++){let D=c[q],K=D.color,$=D.intensity,B=D.distance,pe=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Di?pe=D.shadow.map.texture:pe=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=K.r*$,f+=K.g*$,u+=K.b*$;else if(D.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(D.sh.coefficients[W],$);L++}else if(D.isSunLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let se=D.shadow,Y=t.get(D);Y.shadowIntensity=se.intensity,Y.shadowBias=se.bias,Y.shadowNormalBias=se.normalBias,Y.shadowRadius=se.radius,Y.shadowMapSize.copy(se.mapSize).multiply(se.getFrameExtents()),n.sunShadow[g]=Y,n.sunShadowMap[g]=pe;let ke=se.getViewportCount();for(let Ue=0;Ue<ke;Ue++)n.sunShadowMatrix[v+Ue]=se.getMatrix(Ue),n.sunShadowCascade[v+Ue]=se._cascadeData[Ue];v+=ke,g++}n.sun[p]=W,p++}else if(D.isDirectionalLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let se=D.shadow,Y=t.get(D);Y.shadowIntensity=se.intensity,Y.shadowBias=se.bias,Y.shadowNormalBias=se.normalBias,Y.shadowRadius=se.radius,Y.shadowMapSize=se.mapSize,n.directionalShadow[m]=Y,n.directionalShadowMap[m]=pe,n.directionalShadowMatrix[m]=D.shadow.matrix,A++}n.directional[m]=W,m++}else if(D.isSpotLight){let W=e.get(D);W.position.setFromMatrixPosition(D.matrixWorld),W.color.copy(K).multiplyScalar($),W.distance=B,W.coneCos=Math.cos(D.angle),W.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),W.decay=D.decay,n.spot[_]=W;let se=D.shadow;if(D.map&&(n.spotLightMap[S]=D.map,S++,se.updateMatrices(D),D.castShadow&&F++),n.spotLightMatrix[_]=se.matrix,D.castShadow){let Y=t.get(D);Y.shadowIntensity=se.intensity,Y.shadowBias=se.bias,Y.shadowNormalBias=se.normalBias,Y.shadowRadius=se.radius,Y.shadowMapSize=se.mapSize,n.spotShadow[_]=Y,n.spotShadowMap[_]=pe,b++}_++}else if(D.isRectAreaLight){let W=e.get(D);W.color.copy(K).multiplyScalar($),W.halfWidth.set(D.width*.5,0,0),W.halfHeight.set(0,D.height*.5,0),n.rectArea[M]=W,M++}else if(D.isPointLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),W.distance=D.distance,W.decay=D.decay,D.castShadow){let se=D.shadow,Y=t.get(D);Y.shadowIntensity=se.intensity,Y.shadowBias=se.bias,Y.shadowNormalBias=se.normalBias,Y.shadowRadius=se.radius,Y.shadowMapSize=se.mapSize,Y.shadowCameraNear=se.camera.near,Y.shadowCameraFar=se.camera.far,n.pointShadow[d]=Y,n.pointShadowMap[d]=pe,n.pointShadowMatrix[d]=D.shadow.matrix,T++}n.point[d]=W,d++}else if(D.isHemisphereLight){let W=e.get(D);W.skyColor.copy(D.color).multiplyScalar($),W.groundColor.copy(D.groundColor).multiplyScalar($),n.hemi[y]=W,y++}}M>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ve.LTC_FLOAT_1,n.rectAreaLTC2=Ve.LTC_FLOAT_2):(n.rectAreaLTC1=Ve.LTC_HALF_1,n.rectAreaLTC2=Ve.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;let N=n.hash;(N.sunLength!==p||N.directionalLength!==m||N.pointLength!==d||N.spotLength!==_||N.rectAreaLength!==M||N.hemiLength!==y||N.numSunShadows!==g||N.numDirectionalShadows!==A||N.numPointShadows!==T||N.numSpotShadows!==b||N.numSpotMaps!==S||N.numLightProbes!==L)&&(n.sun.length=p,n.directional.length=m,n.spot.length=_,n.rectArea.length=M,n.point.length=d,n.hemi.length=y,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=b,n.spotShadowMap.length=b,n.spotLightMatrix.length=b+S-F,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=F,n.numLightProbes=L,N.sunLength=p,N.directionalLength=m,N.pointLength=d,N.spotLength=_,N.rectAreaLength=M,N.hemiLength=y,N.numSunShadows=g,N.numDirectionalShadows=A,N.numPointShadows=T,N.numSpotShadows=b,N.numSpotMaps=S,N.numLightProbes=L,n.version=lv++)}function l(c,h){let f=0,u=0,p=0,g=0,v=0,m=0,d=h.matrixWorldInverse;for(let _=0,M=c.length;_<M;_++){let y=c[_];if(y.isSunLight){let A=n.sun[f];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(d),f++}else if(y.isDirectionalLight){let A=n.directional[u];A.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(d),u++}else if(y.isSpotLight){let A=n.spot[g];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(d),A.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(d),g++}else if(y.isRectAreaLight){let A=n.rectArea[v];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(d),a.identity(),s.copy(y.matrixWorld),s.premultiply(d),a.extractRotation(s),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),v++}else if(y.isPointLight){let A=n.point[p];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(d),p++}else if(y.isHemisphereLight){let A=n.hemi[m];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(d),m++}}}return{setup:o,setupView:l,state:n}}function _u(i){let e=new dv(i),t=[],n=[],r=[];function s(f){h.camera=f,t.length=0,n.length=0,r.length=0}function a(f){f.isLightProbeGrid?r.push(f):t.push(f)}function o(f){n.push(f)}function l(){e.setup(t),r.sort((f,u)=>f.priority-u.priority||f.id-u.id)}function c(f){e.setupView(t,f)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function hv(i){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new _u(i),e.set(r,[o])):s>=a.length?(o=new _u(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var uv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,fv=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],mv=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],yu=new dt,ra=new R,ed=new R;function gv(i,e,t){let n=new Mi,r=new we,s=new we,a=new At,o=new bo,l=new _o,c={},h=t.maxTextureSize,f={[Li]:tn,[tn]:Li,[Vn]:Vn},u=new It({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:uv,fragmentShader:pv}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let g=new Mt;g.setAttribute("position",new _n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new bt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ws;let d=this.type;this.render=function(T,b,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===ph&&(tt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ws);let F=i.getRenderTarget(),L=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),q=i.state;q.setBlending(li),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);let te=d!==this.type;te&&b.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(K=>K.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,K=T.length;D<K;D++){let $=T[D],B=$.shadow;if(B===void 0){tt("WebGLShadowMap:",$,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);let pe=B.getFrameExtents();r.multiply(pe),s.copy(B.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/pe.x),r.x=s.x*pe.x,B.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/pe.y),r.y=s.y*pe.y,B.mapSize.y=s.y));let W=i.state.buffers.depth.getReversed();if(B.camera._reversedDepth=W,B.map===null||te===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Ur){if($.isPointLight){tt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new Nt(r.x,r.y,{format:Di,type:Vt,minFilter:$t,magFilter:$t,generateMipmaps:!1}),B.map.texture.name=$.name+".shadowMap",B.map.depthTexture=new ri(r.x,r.y,wn),B.map.depthTexture.name=$.name+".shadowMapDepth",B.map.depthTexture.format=ni,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=zt,B.map.depthTexture.magFilter=zt}else $.isPointLight?(B.map=new aa(r.x),B.map.depthTexture=new Ms(r.x,Nn)):(B.map=new Nt(r.x,r.y),B.map.depthTexture=new ri(r.x,r.y,Nn)),B.map.depthTexture.name=$.name+".shadowMap",B.map.depthTexture.format=ni,this.type===Ws?(B.map.depthTexture.compareFunction=W?zc:Bc,B.map.depthTexture.minFilter=$t,B.map.depthTexture.magFilter=$t):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=zt,B.map.depthTexture.magFilter=zt);B.camera.updateProjectionMatrix()}B.map.isWebGLCubeRenderTarget!==!0&&(B.map.width!==r.x||B.map.height!==r.y)&&B.map.setSize(r.x,r.y);let se=B.map.isWebGLCubeRenderTarget?6:B.getViewportCount();$.isPointLight!==!0&&B.updateMatrices($,S);let Y=(B.camera.layers.mask&4294967294)!==0?B.camera.layers:S.layers;for(let ke=0;ke<se;ke++){let Ue=B.getCamera(ke);if($.isPointLight){let Q=B.camera,Le=B.matrix,fe=$.distance||Q.far;fe!==Q.far&&(Q.far=fe,Q.updateProjectionMatrix()),ra.setFromMatrixPosition($.matrixWorld),Q.position.copy(ra),ed.copy(Q.position),ed.add(fv[ke]),Q.up.copy(mv[ke]),Q.lookAt(ed),Q.updateMatrixWorld(),Le.makeTranslation(-ra.x,-ra.y,-ra.z),yu.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),B._frustum.setFromProjectionMatrix(yu,Q.coordinateSystem,Q.reversedDepth)}if(B.map.isWebGLCubeRenderTarget)i.setRenderTarget(B.map,ke),i.clear();else{ke===0&&(i.setRenderTarget(B.map),i.clear());let Q=B.getViewport(ke);a.set(s.x*Q.x,s.y*Q.y,s.x*Q.z,s.y*Q.w),q.viewport(a)}n=B.getFrustum(ke),y(b,S,Ue,$,Y,this.type)}B.isPointLightShadow!==!0&&this.type===Ur&&_(B,S),B.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(F,L,N)};function _(T,b){let S=e.update(v);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null?T.mapPass=new Nt(r.x,r.y,{format:Di,type:Vt}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(b,null,S,u,v,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value.set(T.map.width,T.map.height),p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(b,null,S,p,v,null)}function M(T,b,S,F){let L=null,N=S.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)L=N;else if(L=S.isPointLight===!0?l:o,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){let q=L.uuid,te=b.uuid,D=c[q];D===void 0&&(D={},c[q]=D);let K=D[te];K===void 0&&(K=L.clone(),D[te]=K,b.addEventListener("dispose",A)),L=K}if(L.visible=b.visible,L.wireframe=b.wireframe,F===Ur?L.side=b.shadowSide!==null?b.shadowSide:b.side:L.side=b.shadowSide!==null?b.shadowSide:f[b.side],L.alphaMap=b.alphaMap,L.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,L.map=b.map,L.clipShadows=b.clipShadows,L.clippingPlanes=b.clippingPlanes,L.clipIntersection=b.clipIntersection,L.displacementMap=b.displacementMap,L.displacementScale=b.displacementScale,L.displacementBias=b.displacementBias,L.wireframeLinewidth=b.wireframeLinewidth,L.linewidth=b.linewidth,S.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let q=i.properties.get(L);q.light=S}return L}function y(T,b,S,F,L,N){if(T.visible===!1)return;if(T.layers.test(L)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&N===Ur)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,T.matrixWorld);let D=e.update(T),K=T.material;if(Array.isArray(K)){let $=D.groups;for(let B=0,pe=$.length;B<pe;B++){let W=$[B],se=K[W.materialIndex];if(se&&se.visible){let Y=M(T,se,F,N);T.onBeforeShadow(i,T,b,S,D,Y,W),i.renderBufferDirect(S,null,D,Y,T,W),T.onAfterShadow(i,T,b,S,D,Y,W)}}}else if(K.visible){let $=M(T,K,F,N);T.onBeforeShadow(i,T,b,S,D,$,null),i.renderBufferDirect(S,null,D,$,T,null),T.onAfterShadow(i,T,b,S,D,$,null)}}let te=T.children;for(let D=0,K=te.length;D<K;D++)y(te[D],b,S,F,L,N)}function A(T){T.target.removeEventListener("dispose",A);for(let S in c){let F=c[S],L=T.target.uuid;L in F&&(F[L].dispose(),delete F[L])}}}function xv(i,e){function t(){let P=!1,le=new At,ne=null,Ee=new At(0,0,0,0);return{setMask:function(Se){ne!==Se&&!P&&(i.colorMask(Se,Se,Se,Se),ne=Se)},setLocked:function(Se){P=Se},setClear:function(Se,Pe,V,H,Z){Z===!0&&(Se*=H,Pe*=H,V*=H),le.set(Se,Pe,V,H),Ee.equals(le)===!1&&(i.clearColor(Se,Pe,V,H),Ee.copy(le))},reset:function(){P=!1,ne=null,Ee.set(-1,0,0,0)}}}function n(){let P=!1,le=!1,ne=null,Ee=null,Se=null;return{setReversed:function(Pe){if(le!==Pe){let V=e.get("EXT_clip_control");Pe?V.clipControlEXT(V.LOWER_LEFT_EXT,V.ZERO_TO_ONE_EXT):V.clipControlEXT(V.LOWER_LEFT_EXT,V.NEGATIVE_ONE_TO_ONE_EXT),le=Pe;let H=Se;Se=null,this.setClear(H)}},getReversed:function(){return le},setTest:function(Pe){Pe?re(i.DEPTH_TEST):Me(i.DEPTH_TEST)},setMask:function(Pe){ne!==Pe&&!P&&(i.depthMask(Pe),ne=Pe)},setFunc:function(Pe){if(le&&(Pe=Yh[Pe]),Ee!==Pe){switch(Pe){case Ja:i.depthFunc(i.NEVER);break;case ja:i.depthFunc(i.ALWAYS);break;case $a:i.depthFunc(i.LESS);break;case yr:i.depthFunc(i.LEQUAL);break;case Qa:i.depthFunc(i.EQUAL);break;case eo:i.depthFunc(i.GEQUAL);break;case to:i.depthFunc(i.GREATER);break;case no:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ee=Pe}},setLocked:function(Pe){P=Pe},setClear:function(Pe){Se!==Pe&&(Se=Pe,le&&(Pe=1-Pe),i.clearDepth(Pe))},reset:function(){P=!1,ne=null,Ee=null,Se=null,le=!1}}}function r(){let P=!1,le=null,ne=null,Ee=null,Se=null,Pe=null,V=null,H=null,Z=null;return{setTest:function(ge){P||(ge?re(i.STENCIL_TEST):Me(i.STENCIL_TEST))},setMask:function(ge){le!==ge&&!P&&(i.stencilMask(ge),le=ge)},setFunc:function(ge,O,z){(ne!==ge||Ee!==O||Se!==z)&&(i.stencilFunc(ge,O,z),ne=ge,Ee=O,Se=z)},setOp:function(ge,O,z){(Pe!==ge||V!==O||H!==z)&&(i.stencilOp(ge,O,z),Pe=ge,V=O,H=z)},setLocked:function(ge){P=ge},setClear:function(ge){Z!==ge&&(i.clearStencil(ge),Z=ge)},reset:function(){P=!1,le=null,ne=null,Ee=null,Se=null,Pe=null,V=null,H=null,Z=null}}}let s=new t,a=new n,o=new r,l={},c=new WeakMap,h={},f={},u={},p=new WeakMap,g=[],v=null,m=!1,d=null,_=null,M=null,y=null,A=null,T=null,b=null,S=new Qe(0,0,0),F=0,L=!1,N=null,q=null,te=null,D=null,K=null,$=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,pe=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(pe=parseFloat(/^WebGL (\d)/.exec(W)[1]),B=pe>=1):W.indexOf("OpenGL ES")!==-1&&(pe=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),B=pe>=2);let se=null,Y={},ke=i.getParameter(i.SCISSOR_BOX),Ue=i.getParameter(i.VIEWPORT),Q=new At().fromArray(ke),Le=new At().fromArray(Ue);function fe(P,le,ne,Ee){let Se=new Uint8Array(4),Pe=i.createTexture();i.bindTexture(P,Pe),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let V=0;V<ne;V++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(le,0,i.RGBA,1,1,Ee,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(le+V,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return Pe}let G={};G[i.TEXTURE_2D]=fe(i.TEXTURE_2D,i.TEXTURE_2D,1),G[i.TEXTURE_CUBE_MAP]=fe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[i.TEXTURE_2D_ARRAY]=fe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),G[i.TEXTURE_3D]=fe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(i.DEPTH_TEST),a.setFunc(yr),Ie(!1),be(Tc),re(i.CULL_FACE),Ce(li);function re(P){h[P]!==!0&&(i.enable(P),h[P]=!0)}function Me(P){h[P]!==!1&&(i.disable(P),h[P]=!1)}function Ke(P,le){return u[P]!==le?(i.bindFramebuffer(P,le),u[P]=le,P===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=le),P===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=le),!0):!1}function De(P,le){let ne=g,Ee=!1;if(P){ne=p.get(le),ne===void 0&&(ne=[],p.set(le,ne));let Se=P.textures;if(ne.length!==Se.length||ne[0]!==i.COLOR_ATTACHMENT0){for(let Pe=0,V=Se.length;Pe<V;Pe++)ne[Pe]=i.COLOR_ATTACHMENT0+Pe;ne.length=Se.length,Ee=!0}}else ne[0]!==i.BACK&&(ne[0]=i.BACK,Ee=!0);Ee&&i.drawBuffers(ne)}function et(P){return v!==P?(i.useProgram(P),v=P,!0):!1}let Je={[Zi]:i.FUNC_ADD,[mh]:i.FUNC_SUBTRACT,[gh]:i.FUNC_REVERSE_SUBTRACT};Je[xh]=i.MIN,Je[vh]=i.MAX;let me={[bh]:i.ZERO,[_h]:i.ONE,[yh]:i.SRC_COLOR,[Rc]:i.SRC_ALPHA,[Ah]:i.SRC_ALPHA_SATURATE,[Eh]:i.DST_COLOR,[Sh]:i.DST_ALPHA,[wh]:i.ONE_MINUS_SRC_COLOR,[Ic]:i.ONE_MINUS_SRC_ALPHA,[Th]:i.ONE_MINUS_DST_COLOR,[Mh]:i.ONE_MINUS_DST_ALPHA,[Ch]:i.CONSTANT_COLOR,[Rh]:i.ONE_MINUS_CONSTANT_COLOR,[Ih]:i.CONSTANT_ALPHA,[Ph]:i.ONE_MINUS_CONSTANT_ALPHA};function Ce(P,le,ne,Ee,Se,Pe,V,H,Z,ge){if(P===li){m===!0&&(Me(i.BLEND),m=!1);return}if(m===!1&&(re(i.BLEND),m=!0),P!==fh){if(P!==d||ge!==L){if((_!==Zi||A!==Zi)&&(i.blendEquation(i.FUNC_ADD),_=Zi,A=Zi),ge)switch(P){case Fr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case nn:i.blendFunc(i.ONE,i.ONE);break;case Ac:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Cc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:it("WebGLState: Invalid blending: ",P);break}else switch(P){case Fr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case nn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ac:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cc:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",P);break}M=null,y=null,T=null,b=null,S.set(0,0,0),F=0,d=P,L=ge}return}Se=Se||le,Pe=Pe||ne,V=V||Ee,(le!==_||Se!==A)&&(i.blendEquationSeparate(Je[le],Je[Se]),_=le,A=Se),(ne!==M||Ee!==y||Pe!==T||V!==b)&&(i.blendFuncSeparate(me[ne],me[Ee],me[Pe],me[V]),M=ne,y=Ee,T=Pe,b=V),(H.equals(S)===!1||Z!==F)&&(i.blendColor(H.r,H.g,H.b,Z),S.copy(H),F=Z),d=P,L=!1}function xe(P,le){P.side===Vn?Me(i.CULL_FACE):re(i.CULL_FACE);let ne=P.side===tn;le&&(ne=!ne),Ie(ne),P.blending===Fr&&P.transparent===!1?Ce(li):Ce(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),s.setMask(P.colorWrite);let Ee=P.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Xe(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):Me(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(P){N!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),N=P)}function be(P){P!==hh?(re(i.CULL_FACE),P!==q&&(P===Tc?i.cullFace(i.BACK):P===uh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Me(i.CULL_FACE),q=P}function $e(P){P!==te&&(B&&i.lineWidth(P),te=P)}function Xe(P,le,ne){P?(re(i.POLYGON_OFFSET_FILL),(D!==le||K!==ne)&&(D=le,K=ne,a.getReversed()&&(le=-le,ne=-ne),i.polygonOffset(le,ne))):Me(i.POLYGON_OFFSET_FILL)}function nt(P){P?re(i.SCISSOR_TEST):Me(i.SCISSOR_TEST)}function k(P){P===void 0&&(P=i.TEXTURE0+$-1),se!==P&&(i.activeTexture(P),se=P)}function ue(P,le,ne){ne===void 0&&(se===null?ne=i.TEXTURE0+$-1:ne=se);let Ee=Y[ne];Ee===void 0&&(Ee={type:void 0,texture:void 0},Y[ne]=Ee),(Ee.type!==P||Ee.texture!==le)&&(se!==ne&&(i.activeTexture(ne),se=ne),i.bindTexture(P,le||G[P]),Ee.type=P,Ee.texture=le)}function C(){let P=Y[se];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function ve(){try{i.compressedTexImage2D(...arguments)}catch(P){it("WebGLState:",P)}}function Ne(){try{i.compressedTexImage3D(...arguments)}catch(P){it("WebGLState:",P)}}function Re(){try{i.texSubImage2D(...arguments)}catch(P){it("WebGLState:",P)}}function he(){try{i.texSubImage3D(...arguments)}catch(P){it("WebGLState:",P)}}function ae(){try{i.compressedTexSubImage2D(...arguments)}catch(P){it("WebGLState:",P)}}function Te(){try{i.compressedTexSubImage3D(...arguments)}catch(P){it("WebGLState:",P)}}function We(){try{i.texStorage2D(...arguments)}catch(P){it("WebGLState:",P)}}function E(){try{i.texStorage3D(...arguments)}catch(P){it("WebGLState:",P)}}function x(){try{i.texImage2D(...arguments)}catch(P){it("WebGLState:",P)}}function I(){try{i.texImage3D(...arguments)}catch(P){it("WebGLState:",P)}}function oe(P){return f[P]!==void 0?f[P]:i.getParameter(P)}function ie(P,le){f[P]!==le&&(i.pixelStorei(P,le),f[P]=le)}function _e(P){Q.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Q.copy(P))}function ye(P){Le.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),Le.copy(P))}function J(P,le){let ne=c.get(le);ne===void 0&&(ne=new WeakMap,c.set(le,ne));let Ee=ne.get(P);Ee===void 0&&(Ee=i.getUniformBlockIndex(le,P.name),i.uniformBlockBinding(le,Ee,Ee),ne.set(P,Ee))}function X(P,le,ne){let Se=c.get(le).get(P);l[Se]!==ne&&(i.bindBufferBase(i.UNIFORM_BUFFER,Se,ne),l[Se]=ne)}function Ae(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},se=null,Y={},u={},l={},p=new WeakMap,g=[],v=null,m=!1,d=null,_=null,M=null,y=null,A=null,T=null,b=null,S=new Qe(0,0,0),F=0,L=!1,N=null,q=null,te=null,D=null,K=null,Q.set(0,0,i.canvas.width,i.canvas.height),Le.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:re,disable:Me,bindFramebuffer:Ke,drawBuffers:De,useProgram:et,setBlending:Ce,setMaterial:xe,setFlipSided:Ie,setCullFace:be,setLineWidth:$e,setPolygonOffset:Xe,setScissorTest:nt,activeTexture:k,bindTexture:ue,unbindTexture:C,compressedTexImage2D:ve,compressedTexImage3D:Ne,texImage2D:x,texImage3D:I,pixelStorei:ie,getParameter:oe,updateUBOMapping:J,uniformBlockBinding:X,texStorage2D:We,texStorage3D:E,texSubImage2D:Re,texSubImage3D:he,compressedTexSubImage2D:ae,compressedTexSubImage3D:Te,scissor:_e,viewport:ye,reset:Ae}}function vv(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new we,h=new WeakMap,f=new Set,u,p=new WeakMap,g=new Set,v=new FinalizationRegistry(E=>g.delete(E)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function d(E,x){return m?new OffscreenCanvas(E,x):ds("canvas")}function _(E,x,I){let oe=1,ie=We(E);if((ie.width>I||ie.height>I)&&(oe=I/Math.max(ie.width,ie.height)),oe<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let _e=Math.floor(oe*ie.width),ye=Math.floor(oe*ie.height);u===void 0&&(u=d(_e,ye));let J=x?d(_e,ye):u;return J.width=_e,J.height=ye,J.getContext("2d").drawImage(E,0,0,_e,ye),tt("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+_e+"x"+ye+")."),J}else return"data"in E&&tt("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),E;return E}function M(E){return E.generateMipmaps}function y(E){i.generateMipmap(E)}function A(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(E,x,I,oe,ie,_e=!1){if(E!==null){if(i[E]!==void 0)return i[E];tt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ye;oe&&(ye=e.get("EXT_texture_norm16"),ye||tt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=x;if(x===i.RED&&(I===i.FLOAT&&(J=i.R32F),I===i.HALF_FLOAT&&(J=i.R16F),I===i.UNSIGNED_BYTE&&(J=i.R8),I===i.UNSIGNED_SHORT&&ye&&(J=ye.R16_EXT),I===i.SHORT&&ye&&(J=ye.R16_SNORM_EXT)),x===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(J=i.R8UI),I===i.UNSIGNED_SHORT&&(J=i.R16UI),I===i.UNSIGNED_INT&&(J=i.R32UI),I===i.BYTE&&(J=i.R8I),I===i.SHORT&&(J=i.R16I),I===i.INT&&(J=i.R32I)),x===i.RG&&(I===i.FLOAT&&(J=i.RG32F),I===i.HALF_FLOAT&&(J=i.RG16F),I===i.UNSIGNED_BYTE&&(J=i.RG8),I===i.UNSIGNED_SHORT&&ye&&(J=ye.RG16_EXT),I===i.SHORT&&ye&&(J=ye.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(J=i.RG8UI),I===i.UNSIGNED_SHORT&&(J=i.RG16UI),I===i.UNSIGNED_INT&&(J=i.RG32UI),I===i.BYTE&&(J=i.RG8I),I===i.SHORT&&(J=i.RG16I),I===i.INT&&(J=i.RG32I)),x===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(J=i.RGB8UI),I===i.UNSIGNED_SHORT&&(J=i.RGB16UI),I===i.UNSIGNED_INT&&(J=i.RGB32UI),I===i.BYTE&&(J=i.RGB8I),I===i.SHORT&&(J=i.RGB16I),I===i.INT&&(J=i.RGB32I)),x===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),I===i.UNSIGNED_INT&&(J=i.RGBA32UI),I===i.BYTE&&(J=i.RGBA8I),I===i.SHORT&&(J=i.RGBA16I),I===i.INT&&(J=i.RGBA32I)),x===i.RGB&&(I===i.UNSIGNED_SHORT&&ye&&(J=ye.RGB16_EXT),I===i.SHORT&&ye&&(J=ye.RGB16_SNORM_EXT),I===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),I===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),x===i.RGBA){let X=_e?cs:ht.getTransfer(ie);I===i.FLOAT&&(J=i.RGBA32F),I===i.HALF_FLOAT&&(J=i.RGBA16F),I===i.UNSIGNED_BYTE&&(J=X===mt?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT&&ye&&(J=ye.RGBA16_EXT),I===i.SHORT&&ye&&(J=ye.RGBA16_SNORM_EXT),I===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function b(E,x){let I;return E?x===null||x===Nn||x===ji?I=i.DEPTH24_STENCIL8:x===wn?I=i.DEPTH32F_STENCIL8:x===Br&&(I=i.DEPTH24_STENCIL8,tt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Nn||x===ji?I=i.DEPTH_COMPONENT24:x===wn?I=i.DEPTH_COMPONENT32F:x===Br&&(I=i.DEPTH_COMPONENT16),I}function S(E,x){return M(E)===!0||E.isFramebufferTexture&&E.minFilter!==zt&&E.minFilter!==$t?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function F(E){let x=new WeakRef(E);n.get(E).__ref=x,g.add(x),v.register(E,x,x)}function L(E){let x=n.get(E).__ref;x!==void 0&&(g.delete(x),v.unregister(x))}function N(E){te(E.target)}function q(E){D(E.target)}function te(E){E.removeEventListener("dispose",N),L(E),$(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&f.delete(E)}function D(E){E.removeEventListener("dispose",q),L(E),pe(E)}function K(){for(let E of g){let x=E.deref();x!==void 0&&(x.isRenderTarget===!0?D(x):te(x))}g.clear(),f.clear()}function $(E){let x=n.get(E);if(x.__webglInit===void 0)return;let I=E.source,oe=p.get(I);if(oe){let ie=oe[x.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&B(E),Object.keys(oe).length===0&&p.delete(I)}n.remove(E)}function B(E){let x=n.get(E);i.deleteTexture(x.__webglTexture);let I=E.source,oe=p.get(I);delete oe[x.__cacheKey],a.memory.textures--}function pe(E){let x=n.get(E);x.__depthDisposeCallback&&x.__depthDisposeCallback();let I=E.depthTexture;if(I&&I.renderTarget===E&&te(I),E.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(x.__webglFramebuffer[ie]))for(let _e=0;_e<x.__webglFramebuffer[ie].length;_e++)i.deleteFramebuffer(x.__webglFramebuffer[ie][_e]);else i.deleteFramebuffer(x.__webglFramebuffer[ie]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[ie])}else{if(Array.isArray(x.__webglFramebuffer))for(let ie=0;ie<x.__webglFramebuffer.length;ie++)i.deleteFramebuffer(x.__webglFramebuffer[ie]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let ie=0;ie<x.__webglColorRenderbuffer.length;ie++)x.__webglColorRenderbuffer[ie]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[ie]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let oe=E.textures;for(let ie=0,_e=oe.length;ie<_e;ie++){let ye=n.get(oe[ie]);ye.__webglTexture&&(i.deleteTexture(ye.__webglTexture),a.memory.textures--),n.remove(oe[ie])}n.remove(E)}let W=0;function se(){W=0}function Y(){return W}function ke(E){W=E}function Ue(){let E=W;return E>=r.maxTextures&&tt("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+r.maxTextures),W+=1,E}function Q(E){let x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.mipmapsAutoUpdate),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function Le(E,x){let I=n.get(E);if(E.isVideoTexture&&ae(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&I.__version!==E.version){let oe=E.image;if(oe===null)tt("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)tt("WebGLRenderer: Texture marked for update but image is incomplete");else{xe(I,E,x);return}}else E.isExternalTexture&&(I.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+x)}function fe(E,x){let I=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&I.__version!==E.version){xe(I,E,x);return}else E.isExternalTexture&&(I.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+x)}function G(E,x){let I=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&I.__version!==E.version){xe(I,E,x);return}t.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+x)}function re(E,x){let I=n.get(E);if(E.version>0&&I.__version!==E.version){Ie(I,E,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+x)}let Me={[io]:i.REPEAT,[On]:i.CLAMP_TO_EDGE,[ro]:i.MIRRORED_REPEAT},Ke={[zt]:i.NEAREST,[Nh]:i.NEAREST_MIPMAP_NEAREST,[js]:i.NEAREST_MIPMAP_LINEAR,[$t]:i.LINEAR,[No]:i.LINEAR_MIPMAP_NEAREST,[ci]:i.LINEAR_MIPMAP_LINEAR},De={[Oh]:i.NEVER,[Hc]:i.ALWAYS,[Bh]:i.LESS,[Bc]:i.LEQUAL,[zh]:i.EQUAL,[zc]:i.GEQUAL,[Hh]:i.GREATER,[Vh]:i.NOTEQUAL};function et(E,x){if(x.type===wn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===$t||x.magFilter===No||x.magFilter===js||x.magFilter===ci||x.minFilter===$t||x.minFilter===No||x.minFilter===js||x.minFilter===ci)&&tt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,Me[x.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Me[x.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Me[x.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,Ke[x.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,Ke[x.minFilter]),x.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,De[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===zt||x.minFilter!==js&&x.minFilter!==ci||x.type===wn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let I=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Je(E,x){let I=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",N),F(x));let oe=x.source,ie=p.get(oe);ie===void 0&&(ie={},p.set(oe,ie));let _e=Q(x);if(_e!==E.__cacheKey){ie[_e]===void 0&&(ie[_e]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,I=!0),ie[_e].usedTimes++;let ye=ie[E.__cacheKey];ye!==void 0&&(ie[E.__cacheKey].usedTimes--,ye.usedTimes===0&&B(x)),E.__cacheKey=_e,E.__webglTexture=ie[_e].texture}return I}function me(E,x,I){return Math.floor(Math.floor(E/I)/x)}function Ce(E,x,I,oe){let _e=E.updateRanges;if(_e.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,I,oe,x.data);else{_e.sort((P,le)=>P.start-le.start);let ye=0;for(let P=1;P<_e.length;P++){let le=_e[ye],ne=_e[P],Ee=le.start+le.count,Se=me(ne.start,x.width,4),Pe=me(le.start,x.width,4);ne.start<=Ee+1&&Se===Pe&&me(ne.start+ne.count-1,x.width,4)===Se?le.count=Math.max(le.count,ne.start+ne.count-le.start):(++ye,_e[ye]=ne)}_e.length=ye+1;let J=t.getParameter(i.UNPACK_ROW_LENGTH),X=t.getParameter(i.UNPACK_SKIP_PIXELS),Ae=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let P=0,le=_e.length;P<le;P++){let ne=_e[P],Ee=Math.floor(ne.start/4),Se=Math.ceil(ne.count/4),Pe=Ee%x.width,V=Math.floor(Ee/x.width),H=Se,Z=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Pe),t.pixelStorei(i.UNPACK_SKIP_ROWS,V),t.texSubImage2D(i.TEXTURE_2D,0,Pe,V,H,Z,I,oe,x.data)}E.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,J),t.pixelStorei(i.UNPACK_SKIP_PIXELS,X),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ae)}}function xe(E,x,I){let oe=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(oe=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(oe=i.TEXTURE_3D);let ie=Je(E,x),_e=x.source;t.bindTexture(oe,E.__webglTexture,i.TEXTURE0+I);let ye=n.get(_e);if(_e.version!==ye.__version||ie===!0){if(t.activeTexture(i.TEXTURE0+I),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let Z=ht.getPrimaries(ht.workingColorSpace),ge=x.colorSpace===hi?null:ht.getPrimaries(x.colorSpace),O=x.colorSpace===hi||Z===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,O)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let X=_(x.image,!1,r.maxTextureSize);X=Te(x,X);let Ae=s.convert(x.format,x.colorSpace),P=s.convert(x.type),le=T(x.internalFormat,Ae,P,x.normalized,x.colorSpace,x.isVideoTexture);et(oe,x);let ne,Ee=x.mipmaps,Se=x.isVideoTexture!==!0,Pe=ye.__version===void 0||ie===!0,V=_e.dataReady,H=S(x,X);if(x.isDepthTexture)le=b(x.format===di,x.type),Pe&&(Se?t.texStorage2D(i.TEXTURE_2D,1,le,X.width,X.height):t.texImage2D(i.TEXTURE_2D,0,le,X.width,X.height,0,Ae,P,null));else if(x.isDataTexture)if(Ee.length>0){Se&&Pe&&t.texStorage2D(i.TEXTURE_2D,H,le,Ee[0].width,Ee[0].height);for(let Z=0,ge=Ee.length;Z<ge;Z++)ne=Ee[Z],Se?V&&t.texSubImage2D(i.TEXTURE_2D,Z,0,0,ne.width,ne.height,Ae,P,ne.data):t.texImage2D(i.TEXTURE_2D,Z,le,ne.width,ne.height,0,Ae,P,ne.data);x.generateMipmaps=!1}else Se?(Pe&&t.texStorage2D(i.TEXTURE_2D,H,le,X.width,X.height),V&&Ce(x,X,Ae,P)):t.texImage2D(i.TEXTURE_2D,0,le,X.width,X.height,0,Ae,P,X.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Se&&Pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,H,le,Ee[0].width,Ee[0].height,X.depth);for(let Z=0,ge=Ee.length;Z<ge;Z++)if(ne=Ee[Z],x.format!==kn)if(Ae!==null)if(Se){if(V)if(x.layerUpdates.size>0){let O=$c(ne.width,ne.height,x.format,x.type);for(let z of x.layerUpdates){let ce=ne.data.subarray(z*O/ne.data.BYTES_PER_ELEMENT,(z+1)*O/ne.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,z,ne.width,ne.height,1,Ae,ce)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,ne.width,ne.height,X.depth,Ae,ne.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,le,ne.width,ne.height,X.depth,0,ne.data,0,0);else tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Se?V&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,ne.width,ne.height,X.depth,Ae,P,ne.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Z,le,ne.width,ne.height,X.depth,0,Ae,P,ne.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Se&&Pe&&t.texStorage2D(i.TEXTURE_2D,H,le,Ee[0].width,Ee[0].height);for(let Z=0,ge=Ee.length;Z<ge;Z++)ne=Ee[Z],x.format!==kn?Ae!==null?Se?V&&t.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,ne.width,ne.height,Ae,ne.data):t.compressedTexImage2D(i.TEXTURE_2D,Z,le,ne.width,ne.height,0,ne.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?V&&t.texSubImage2D(i.TEXTURE_2D,Z,0,0,ne.width,ne.height,Ae,P,ne.data):t.texImage2D(i.TEXTURE_2D,Z,le,ne.width,ne.height,0,Ae,P,ne.data)}else if(x.isDataArrayTexture)if(Se){if(Pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,H,le,X.width,X.height,X.depth),V)if(x.layerUpdates.size>0){let Z=$c(X.width,X.height,x.format,x.type);for(let ge of x.layerUpdates){let O=X.data.subarray(ge*Z/X.data.BYTES_PER_ELEMENT,(ge+1)*Z/X.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ge,X.width,X.height,1,Ae,P,O)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,X.width,X.height,X.depth,Ae,P,X.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,le,X.width,X.height,X.depth,0,Ae,P,X.data);else if(x.isData3DTexture)Se?(Pe&&t.texStorage3D(i.TEXTURE_3D,H,le,X.width,X.height,X.depth),V&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,X.width,X.height,X.depth,Ae,P,X.data)):t.texImage3D(i.TEXTURE_3D,0,le,X.width,X.height,X.depth,0,Ae,P,X.data);else if(x.isFramebufferTexture){if(Pe)if(Se)t.texStorage2D(i.TEXTURE_2D,H,le,X.width,X.height);else{let Z=X.width,ge=X.height;for(let O=0;O<H;O++)t.texImage2D(i.TEXTURE_2D,O,le,Z,ge,0,Ae,P,null),Z>>=1,ge>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let Z=i.canvas;if(Z.hasAttribute("layoutsubtree")||Z.setAttribute("layoutsubtree","true"),X.parentNode!==Z){Z.appendChild(X),f.add(x),Z.onpaint=ge=>{let O=ge.changedElements;for(let z of f)O.includes(z.image)&&(z.needsUpdate=!0)},Z.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,X);else{let O=i.RGBA,z=i.RGBA,ce=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,O,z,ce,X)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ee.length>0){if(Se&&Pe){let Z=We(Ee[0]);t.texStorage2D(i.TEXTURE_2D,H,le,Z.width,Z.height)}for(let Z=0,ge=Ee.length;Z<ge;Z++)ne=Ee[Z],Se?V&&t.texSubImage2D(i.TEXTURE_2D,Z,0,0,Ae,P,ne):t.texImage2D(i.TEXTURE_2D,Z,le,Ae,P,ne);x.generateMipmaps=!1}else if(Se){if(Pe){let Z=We(X);t.texStorage2D(i.TEXTURE_2D,H,le,Z.width,Z.height)}V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ae,P,X)}else t.texImage2D(i.TEXTURE_2D,0,le,Ae,P,X);M(x)&&x.mipmapsAutoUpdate===!0&&y(oe),ye.__version=_e.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function Ie(E,x,I){if(x.image.length!==6)return;let oe=Je(E,x),ie=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+I);let _e=n.get(ie);if(ie.version!==_e.__version||oe===!0){t.activeTexture(i.TEXTURE0+I);let ye=ht.getPrimaries(ht.workingColorSpace),J=x.colorSpace===hi?null:ht.getPrimaries(x.colorSpace),X=x.colorSpace===hi||ye===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,X);let Ae=x.isCompressedTexture||x.image[0].isCompressedTexture,P=x.image[0]&&x.image[0].isDataTexture,le=[];for(let z=0;z<6;z++)!Ae&&!P?le[z]=_(x.image[z],!0,r.maxCubemapSize):le[z]=P?x.image[z].image:x.image[z],le[z]=Te(x,le[z]);let ne=le[0],Ee=s.convert(x.format,x.colorSpace),Se=s.convert(x.type),Pe=T(x.internalFormat,Ee,Se,x.normalized,x.colorSpace),V=x.isVideoTexture!==!0,H=_e.__version===void 0||oe===!0,Z=ie.dataReady,ge=S(x,ne);et(i.TEXTURE_CUBE_MAP,x);let O;if(x.isDepthTexture){if(Pe=b(x.format===di,x.type),H)if(V)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,Pe,ne.width,ne.height);else for(let z=0;z<6;z++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Pe,ne.width,ne.height,0,Ee,Se,null)}else if(Ae){V&&H&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Pe,ne.width,ne.height);for(let z=0;z<6;z++){O=le[z].mipmaps;for(let ce=0;ce<O.length;ce++){let He=O[ce];x.format!==kn?Ee!==null?V?Z&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+z,ce,0,0,He.width,He.height,Ee,He.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+z,ce,Pe,He.width,He.height,0,He.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+z,ce,0,0,He.width,He.height,Ee,Se,He.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+z,ce,Pe,He.width,He.height,0,Ee,Se,He.data)}}}else{if(O=x.mipmaps,V&&H){O.length>0&&ge++;let z=We(le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Pe,z.width,z.height)}for(let z=0;z<6;z++)if(P){V?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,le[z].width,le[z].height,Ee,Se,le[z].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Pe,le[z].width,le[z].height,0,Ee,Se,le[z].data);for(let ce=0;ce<O.length;ce++){let rt=O[ce].image[z].image;V?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+z,ce+1,0,0,rt.width,rt.height,Ee,Se,rt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+z,ce+1,Pe,rt.width,rt.height,0,Ee,Se,rt.data)}}else{V?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,Ee,Se,le[z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Pe,Ee,Se,le[z]);for(let ce=0;ce<O.length;ce++){let He=O[ce];V?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+z,ce+1,0,0,Ee,Se,He.image[z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+z,ce+1,Pe,Ee,Se,He.image[z])}}}M(x)&&x.mipmapsAutoUpdate===!0&&y(i.TEXTURE_CUBE_MAP),_e.__version=ie.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function be(E,x,I,oe,ie,_e){let ye=s.convert(I.format,I.colorSpace),J=s.convert(I.type),X=T(I.internalFormat,ye,J,I.normalized,I.colorSpace),Ae=n.get(x),P=n.get(I);if(P.__renderTarget=x,!Ae.__hasExternalTextures){let le=Math.max(1,x.width>>_e),ne=Math.max(1,x.height>>_e);ie===i.TEXTURE_3D||ie===i.TEXTURE_2D_ARRAY?t.texImage3D(ie,_e,X,le,ne,x.depth,0,ye,J,null):t.texImage2D(ie,_e,X,le,ne,0,ye,J,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),he(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,oe,ie,P.__webglTexture,0,Re(x)):(ie===i.TEXTURE_2D||ie>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,oe,ie,P.__webglTexture,_e),t.bindFramebuffer(i.FRAMEBUFFER,null)}function $e(E,x,I){if(i.bindRenderbuffer(i.RENDERBUFFER,E),x.depthBuffer){let oe=x.depthTexture,ie=oe&&oe.isDepthTexture?oe.type:null,_e=b(x.stencilBuffer,ie),ye=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;he(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Re(x),_e,x.width,x.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,Re(x),_e,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,_e,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,E)}else{let oe=x.textures;for(let ie=0;ie<oe.length;ie++){let _e=oe[ie],ye=s.convert(_e.format,_e.colorSpace),J=s.convert(_e.type),X=T(_e.internalFormat,ye,J,_e.normalized,_e.colorSpace);he(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Re(x),X,x.width,x.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,Re(x),X,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,X,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Xe(E,x,I){let oe=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ie=n.get(x.depthTexture);ie.__renderTarget=x;let _e=oe?x.depthTexture.image[0]:x.depthTexture.image;(!ie.__webglTexture||_e.width!==x.width||_e.height!==x.height)&&(_e.width=x.width,_e.height=x.height,x.depthTexture.needsUpdate=!0),oe?re(x.depthTexture,0):Le(x.depthTexture,0);let ye=ie.__webglTexture,J=Re(x),X=oe?i.TEXTURE_CUBE_MAP_POSITIVE_X+I:i.TEXTURE_2D,Ae=x.depthTexture.format===di?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===ni)he(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ae,X,ye,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,Ae,X,ye,0);else if(x.depthTexture.format===di)he(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ae,X,ye,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,Ae,X,ye,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(E){let x=n.get(E),I=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){let oe=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),oe){let ie=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,oe.removeEventListener("dispose",ie)};oe.addEventListener("dispose",ie),x.__depthDisposeCallback=ie}x.__boundDepthTexture=oe}if(E.depthTexture&&!x.__autoAllocateDepthBuffer)if(I)for(let oe=0;oe<6;oe++)Xe(x.__webglFramebuffer[oe],E,oe);else E.texture.mipmaps.length>0?Xe(x.__webglFramebuffer[0],E,0):Xe(x.__webglFramebuffer,E,0);else if(I){x.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[oe]),x.__webglDepthbuffer[oe]===void 0)x.__webglDepthbuffer[oe]=i.createRenderbuffer(),$e(x.__webglDepthbuffer[oe],E,!1);else{let ie=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=x.__webglDepthbuffer[oe];i.bindRenderbuffer(i.RENDERBUFFER,_e),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,_e)}}else if(E.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),$e(x.__webglDepthbuffer,E,!1);else{let ie=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,_e),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,_e)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function k(E,x,I){let oe=n.get(E);x!==void 0&&be(oe.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&nt(E)}function ue(E){let x=E.texture,I=n.get(E),oe=n.get(x);E.addEventListener("dispose",q),F(E);let ie=E.textures,_e=E.isWebGLCubeRenderTarget===!0,ye=ie.length>1;if(ye||(oe.__webglTexture===void 0&&(oe.__webglTexture=i.createTexture()),oe.__version=x.version,a.memory.textures++),_e){I.__webglFramebuffer=[];for(let J=0;J<6;J++)if(x.mipmaps.length>0){I.__webglFramebuffer[J]=[];for(let X=0;X<x.mipmaps.length;X++)I.__webglFramebuffer[J][X]=i.createFramebuffer()}else I.__webglFramebuffer[J]=i.createFramebuffer()}else{if(x.mipmaps.length>0){I.__webglFramebuffer=[];for(let J=0;J<x.mipmaps.length;J++)I.__webglFramebuffer[J]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(ye)for(let J=0,X=ie.length;J<X;J++){let Ae=n.get(ie[J]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&he(E)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let J=0;J<ie.length;J++){let X=ie[J];I.__webglColorRenderbuffer[J]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[J]);let Ae=s.convert(X.format,X.colorSpace),P=s.convert(X.type),le=T(X.internalFormat,Ae,P,X.normalized,X.colorSpace,E.isXRRenderTarget===!0),ne=Re(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,le,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+J,i.RENDERBUFFER,I.__webglColorRenderbuffer[J])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),$e(I.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(_e){t.bindTexture(i.TEXTURE_CUBE_MAP,oe.__webglTexture),et(i.TEXTURE_CUBE_MAP,x);for(let J=0;J<6;J++)if(x.mipmaps.length>0)for(let X=0;X<x.mipmaps.length;X++)be(I.__webglFramebuffer[J][X],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,X);else be(I.__webglFramebuffer[J],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);M(x)?y(i.TEXTURE_CUBE_MAP):x.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}else if(ye){for(let J=0,X=ie.length;J<X;J++){let Ae=ie[J],P=n.get(Ae),le=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(le=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,P.__webglTexture),et(le,Ae),be(I.__webglFramebuffer,E,Ae,i.COLOR_ATTACHMENT0+J,le,0),M(Ae)&&y(le)}t.unbindTexture()}else{let J=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(J=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(J,oe.__webglTexture),et(J,x),x.mipmaps.length>0)for(let X=0;X<x.mipmaps.length;X++)be(I.__webglFramebuffer[X],E,x,i.COLOR_ATTACHMENT0,J,X);else be(I.__webglFramebuffer,E,x,i.COLOR_ATTACHMENT0,J,0);M(x)?y(J):x.mipmaps.length>0&&i.texParameteri(J,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}E.depthBuffer&&nt(E)}function C(E){let x=E.textures;for(let I=0,oe=x.length;I<oe;I++){let ie=x[I];if(M(ie)&&ie.mipmapsAutoUpdate===!0){let _e=A(E),ye=n.get(ie).__webglTexture;t.bindTexture(_e,ye),y(_e),t.unbindTexture()}}}let ve=[];function Ne(E){if(E.samples>0){if(he(E)===!1){let x=E.textures,I=E.width,oe=E.height,ie=i.COLOR_BUFFER_BIT,_e=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=n.get(E),J=x.length>1;if(J)for(let Ae=0;Ae<x.length;Ae++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),E.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Ae=0;Ae<x.length;Ae++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(ie|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(ie|=i.STENCIL_BUFFER_BIT)),J){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[Ae]);let P=n.get(x[Ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,P,0)}i.blitFramebuffer(0,0,I,oe,0,0,I,oe,ie,i.NEAREST),l===!0&&(ve.length=0,ve.push(i.COLOR_ATTACHMENT0+Ae),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&ve.push(_e),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ve))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),J)for(let Ae=0;Ae<x.length;Ae++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,ye.__webglColorRenderbuffer[Ae]);let P=n.get(x[Ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,P,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){let x=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Re(E){return Math.min(r.maxSamples,E.samples)}function he(E){let x=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ae(E){let x=a.render.frame;h.get(E)!==x&&(h.set(E,x),E.update())}function Te(E,x){let I=E.colorSpace,oe=E.format,ie=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||I!==ls&&I!==hi&&(ht.getTransfer(I)===mt?(oe!==kn||ie!==on)&&tt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",I)),x}function We(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=Ue,this.resetTextureUnits=se,this.getTextureUnits=Y,this.setTextureUnits=ke,this.setTexture2D=Le,this.setTexture2DArray=fe,this.setTexture3D=G,this.setTextureCube=re,this.rebindTextures=k,this.setupRenderTarget=ue,this.updateRenderTargetMipmap=C,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=be,this.useMultisampledRTT=he,this.dispose=K}function bv(i,e){function t(n,r=hi){let s,a=ht.getTransfer(r);if(n===on)return i.UNSIGNED_BYTE;if(n===Uo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Fo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===kc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Uc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Dc)return i.BYTE;if(n===Nc)return i.SHORT;if(n===Br)return i.UNSIGNED_SHORT;if(n===ko)return i.INT;if(n===Nn)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===Vt)return i.HALF_FLOAT;if(n===Fc)return i.ALPHA;if(n===Oc)return i.RGB;if(n===kn)return i.RGBA;if(n===ni)return i.DEPTH_COMPONENT;if(n===di)return i.DEPTH_STENCIL;if(n===Oo)return i.RED;if(n===Bo)return i.RED_INTEGER;if(n===Di)return i.RG;if(n===zo)return i.RG_INTEGER;if(n===Ho)return i.RGBA_INTEGER;if(n===$s||n===Qs||n===ea||n===ta)if(a===mt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===$s)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Qs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ea)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ta)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===$s)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Qs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ea)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ta)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Vo||n===Go||n===Wo||n===Xo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Vo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Go)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Yo||n===qo||n===Zo||n===Ko||n===Jo||n===na||n===jo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Yo||n===qo)return a===mt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Zo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ko)return s.COMPRESSED_R11_EAC;if(n===Jo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===na)return s.COMPRESSED_RG11_EAC;if(n===jo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===$o||n===Qo||n===el||n===tl||n===nl||n===il||n===rl||n===sl||n===al||n===ol||n===ll||n===cl||n===dl||n===hl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===$o)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===el)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===tl)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===nl)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===il)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===rl)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===sl)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===al)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ol)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ll)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===cl)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===dl)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===hl)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ul||n===pl||n===fl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ul)return a===mt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===pl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ml||n===gl||n===ia||n===xl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===ml)return s.COMPRESSED_RED_RGTC1_EXT;if(n===gl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ia)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===xl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ji?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var _v=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,od=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Es(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new It({vertexShader:_v,fragmentShader:yv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new bt(new Yi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ld=class extends In{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,p=null,g=null,v=typeof XRWebGLBinding<"u",m=new od,d={},_=t.getContextAttributes(),M=null,y=null,A=[],T=[],b=new we,S=null,F=null,L=new qt;L.viewport=new At;let N=new qt;N.viewport=new At;let q=[L,N],te=new Po,D=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let Le=A[Q];return Le===void 0&&(Le=new Tr,A[Q]=Le),Le.getTargetRaySpace()},this.getControllerGrip=function(Q){let Le=A[Q];return Le===void 0&&(Le=new Tr,A[Q]=Le),Le.getGripSpace()},this.getHand=function(Q){let Le=A[Q];return Le===void 0&&(Le=new Tr,A[Q]=Le),Le.getHandSpace()};function $(Q){let Le=T.indexOf(Q.inputSource);if(Le===-1)return;let fe=A[Le];fe!==void 0&&(fe.update(Q.inputSource,Q.frame,c||a),fe.dispatchEvent({type:Q.type,data:Q.inputSource}))}function B(){r.removeEventListener("select",$),r.removeEventListener("selectstart",$),r.removeEventListener("selectend",$),r.removeEventListener("squeeze",$),r.removeEventListener("squeezestart",$),r.removeEventListener("squeezeend",$),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",pe);for(let Q=0;Q<A.length;Q++){let Le=T[Q];Le!==null&&(T[Q]=null,A[Q].disconnect(Le))}D=null,K=null,m.reset();for(let Q in d)delete d[Q];if(e.setRenderTarget(M),p=null,u=null,f=null,r=null,y=null,Ue.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(b.width,b.height,!1),F!==null){let Q=F.camera;Q.fov=F.fov,Q.zoom=F.zoom,Q.updateProjectionMatrix(),F=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&tt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,n.isPresenting===!0&&tt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",$),r.addEventListener("selectstart",$),r.addEventListener("selectend",$),r.addEventListener("squeeze",$),r.addEventListener("squeezestart",$),r.addEventListener("squeezeend",$),r.addEventListener("end",B),r.addEventListener("inputsourceschange",pe),_.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(b),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,G=null,re=null;_.depth&&(re=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=_.stencil?di:ni,G=_.stencil?ji:Nn);let Me={colorFormat:t.RGBA8,depthFormat:re,scaleFactor:s};f=this.getBinding(),u=f.createProjectionLayer(Me),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Nt(u.textureWidth,u.textureHeight,{format:kn,type:on,depthTexture:new ri(u.textureWidth,u.textureHeight,G,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let fe={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,fe),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Nt(p.framebufferWidth,p.framebufferHeight,{format:kn,type:on,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ue.setContext(r),Ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function pe(Q){for(let Le=0;Le<Q.removed.length;Le++){let fe=Q.removed[Le],G=T.indexOf(fe);G>=0&&(T[G]=null,A[G].disconnect(fe))}for(let Le=0;Le<Q.added.length;Le++){let fe=Q.added[Le],G=T.indexOf(fe);if(G===-1){for(let Me=0;Me<A.length;Me++)if(Me>=T.length){T.push(fe),G=Me;break}else if(T[Me]===null){T[Me]=fe,G=Me;break}if(G===-1)break}let re=A[G];re&&re.connect(fe)}}function W(Q,Le){Le===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(Le.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let Le=Q.near,fe=Q.far;m.texture!==null&&(m.depthNear>0&&(Le=m.depthNear),m.depthFar>0&&(fe=m.depthFar)),te.near=N.near=L.near=Le,te.far=N.far=L.far=fe,(D!==te.near||K!==te.far)&&(r.updateRenderState({depthNear:te.near,depthFar:te.far}),D=te.near,K=te.far),te.layers.mask=Q.layers.mask|6,L.layers.mask=te.layers.mask&-5,N.layers.mask=te.layers.mask&-3;let G=Q.parent,re=te.cameras;W(te,G);for(let Me=0;Me<re.length;Me++)W(re[Me],G);te.projectionMatrix.copy(L.projectionMatrix),te.projectionMatrixInverse.copy(L.projectionMatrixInverse),F===null&&Q.isPerspectiveCamera&&(F={camera:Q,fov:Q.fov,zoom:Q.zoom}),se(Q,te,G)};function se(Q,Le,fe){fe===null?Q.matrix.copy(Le.matrixWorld):(Q.matrix.copy(fe.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(Le.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(Le.projectionMatrix),Q.projectionMatrixInverse.copy(Le.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Mr*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return te},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(te)},this.getCameraTexture=function(Q){return d[Q]};let Y=null;function ke(Q,Le){if(h=Le.getViewerPose(c||a),g=Le,h!==null){let fe=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let G=!1;fe.length!==te.cameras.length&&(te.cameras.length=0,G=!0);for(let De=0;De<fe.length;De++){let et=fe[De],Je=null;if(p!==null)Je=p.getViewport(et);else{let Ce=f.getViewSubImage(u,et);Je=Ce.viewport,De===0&&(e.setRenderTargetTextures(y,Ce.colorTexture,Ce.depthStencilTexture),e.setRenderTarget(y))}let me=q[De];me===void 0&&(me=new qt,me.layers.enable(De),me.viewport=new At,q[De]=me),me.matrix.fromArray(et.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(et.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(Je.x,Je.y,Je.width,Je.height),De===0&&(te.matrix.copy(me.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale)),G===!0&&te.cameras.push(me)}let re=r.enabledFeatures;if(re&&re.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){f=n.getBinding();let De=f.getDepthInformation(fe[0]);De&&De.isValid&&De.texture&&m.init(De,r.renderState)}if(re&&re.includes("camera-access")&&v){e.state.unbindTexture(),f=n.getBinding();for(let De=0;De<fe.length;De++){let et=fe[De].camera;if(et){let Je=d[et];Je||(Je=new Es,d[et]=Je);let me=f.getCameraImage(et);Je.sourceTexture=me}}}}for(let fe=0;fe<A.length;fe++){let G=T[fe],re=A[fe];G!==null&&re!==void 0&&re.update(G,Le,c||a)}Y&&Y(Q,Le),Le.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Le}),g=null}let Ue=new wu;Ue.setAnimationLoop(ke),this.setAnimationLoop=function(Q){Y=Q},this.dispose=function(){}}},wv=new dt,Lu=new st;Lu.set(-1,0,0,0,1,0,0,0,1);function Sv(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,Kc(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,_,M,y){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?s(m,d):d.isMeshLambertMaterial?(s(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(s(m,d),f(m,d)):d.isMeshPhongMaterial?(s(m,d),h(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(s(m,d),u(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),v(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,_,M):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===tn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===tn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let _=e.get(d),M=_.envMap,y=_.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(wv.makeRotationFromEuler(y)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Lu),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,_,M){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*_,m.scale.value=M*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function u(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,_){m.ior.value=d.ior,d.diffuseRoughness>0&&(m.diffuseRoughness.value=d.diffuseRoughness,d.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=d.diffuseRoughnessMap,t(d.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===tn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.retroreflectivity>0&&(m.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=d.iridescenceThicknessMaximum,d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){let _=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Mv(i,e,t,n){let r={},s={};function a(_,M){let y=M.program;n.uniformBlockBinding(_,y,r[_.id])}function o(_,M){let y=r[_.id];y===void 0&&(g(_),y=l(_),r[_.id]=y,_.addEventListener("dispose",m));let A=M.program;n.updateUBOMapping(_,A);let T=e.render.frame;s[_.id]!==T&&(c(_),s[_.id]=T)}function l(_){let M=i.createBuffer(),y=_.__size,A=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,y,A),i.bindBuffer(i.UNIFORM_BUFFER,null),M}function c(_){let M=r[_.id],y=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let T=0,b=y.length;T<b;T++){let S=y[T];if(Array.isArray(S))for(let F=0,L=S.length;F<L;F++)h(S[F],T,F,A);else h(S,T,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(_,M,y,A){if(u(_,M,y,A)===!0){let T=_.__offset,b=_.value;if(Array.isArray(b)){let S=0;for(let F=0;F<b.length;F++){let L=b[F],N=v(L,!0);f(L,_.__data,S),S+=N.storage/Float32Array.BYTES_PER_ELEMENT}}else f(b,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,T,_.__data)}}function f(_,M,y){typeof _=="number"||typeof _=="boolean"?M[y]=_:_.isMatrix3?(M[y]=_.elements[0],M[y+1]=_.elements[1],M[y+2]=_.elements[2],M[y+3]=0,M[y+4]=_.elements[3],M[y+5]=_.elements[4],M[y+6]=_.elements[5],M[y+7]=0,M[y+8]=_.elements[6],M[y+9]=_.elements[7],M[y+10]=_.elements[8],M[y+11]=0):ArrayBuffer.isView(_)?M.set(_.subarray(0,M.length-y),y):_.toArray(M,y)}function u(_,M,y,A){let T=_.value,b=M+"_"+y;if(Array.isArray(T)){A[b]===void 0&&(A[b]=[]);let S=A[b],F=!1;for(let L=0;L<T.length;L++)p(T[L],S,L)===!0&&(F=!0);return F}return p(T,A,b)}function p(_,M,y){if(M[y]===void 0)return typeof _=="number"||typeof _=="boolean"?M[y]=_:ArrayBuffer.isView(_)?M[y]=_.slice():M[y]=_.clone(),!0;{let A=M[y];if(typeof _=="number"||typeof _=="boolean"){if(A!==_)return M[y]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(A.equals(_)===!1)return A.copy(_),!0}}return!1}function g(_){let M=_.uniforms,y=0,A=16;for(let b=0,S=M.length;b<S;b++){let F=Array.isArray(M[b])?M[b]:[M[b]];for(let L=0,N=F.length;L<N;L++){let q=F[L],te=Array.isArray(q.value)?q.value:[q.value],D=Array.isArray(M[b])||Array.isArray(q.value),K=y;for(let B=0,pe=te.length;B<pe;B++){let W=te[B],se=v(W,D),Y=y%A,ke=Y%se.boundary,Ue=Y+ke;y+=ke,Ue!==0&&A-Ue<se.storage&&(y+=A-Ue),B===0&&(K=y),y+=se.storage}let $=q.type==="int"?Int32Array:q.type==="uint"?Uint32Array:Float32Array;q.__data=new $((y-K)/Float32Array.BYTES_PER_ELEMENT),q.__offset=K}}let T=y%A;return T>0&&(y+=A-T),_.__size=y,_.__cache={},this}function v(_,M){let y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=16,y.storage=48):_.isMatrix4?(y.boundary=16,y.storage=64):_.isTexture?tt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(y.boundary=16,y.storage=_.byteLength):tt("WebGLRenderer: Unsupported uniform value type.",_),M===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function m(_){let M=_.target;M.removeEventListener("dispose",m),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function d(){for(let _ in r)i.deleteBuffer(r[_]);r={},s={}}return{bind:a,update:o,dispose:d}}var Ev=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Xn=null;function Tv(){return Xn===null&&(Xn=new bs(Ev,16,16,Di,Vt),Xn.name="DFG_LUT",Xn.minFilter=$t,Xn.magFilter=$t,Xn.wrapS=On,Xn.wrapT=On,Xn.generateMipmaps=!1,Xn.needsUpdate=!0),Xn}var Sl=class{constructor(e={}){let{canvas:t=Gh(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:p=on}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let v=p,m=new Set([Ho,zo,Bo]),d=new Set([on,Nn,Br,ji,Uo,Fo]),_=new Uint32Array(4),M=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},A=null,T=null,b=[],S=[],F=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,N=!1,q=null,te=null,D=null,K=null;this._outputColorSpace=jt;let $=0,B=0,pe=null,W=-1,se=null,Y=new At,ke=new At,Ue=null,Q=new Qe(0),Le=0,fe=t.width,G=t.height,re=1,Me=null,Ke=null,De=new At(0,0,fe,G),et=new At(0,0,fe,G),Je=!1,me=new Mi,Ce=new ho,xe=!1,Ie=!1,be=new dt,$e=new R,Xe=new At,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},k=!1;function ue(){return pe===null?re:1}let C=n;function ve(w,U){return t.getContext(w,U)}let Ne,Re,he,ae,Te,We,E,x,I,oe,ie,_e,ye,J,X,Ae,P,le,ne,Ee,Se,Pe,V;try{let w={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",ge,!1),t.addEventListener("webglcontextrestored",O,!1),t.addEventListener("webglcontextcreationerror",z,!1),C===null){let U="webgl2";if(C=ve(U,w),C===null)throw ve(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}H()}catch(w){throw t.removeEventListener("webglcontextlost",ge,!1),t.removeEventListener("webglcontextrestored",O,!1),t.removeEventListener("webglcontextcreationerror",z,!1),it("WebGLRenderer: "+w.message),w}function H(){Ne=new F0(C),Ne.init(),Se=new bv(C,Ne),Re=new T0(C,Ne,e,Se),he=new xv(C,Ne),Re.reversedDepthBuffer&&u&&he.buffers.depth.setReversed(!0),te=C.createFramebuffer(),D=C.createFramebuffer(),K=C.createFramebuffer(),ae=new z0(C),Te=new iv,We=new vv(C,Ne,he,Te,Re,Se,ae),E=new U0(L),x=new Vf(C),Pe=new M0(C,x),I=new O0(C,x,ae,Pe),oe=new V0(C,I,x,Pe,ae),le=new H0(C,Re,We),X=new A0(Te),ie=new nv(L,E,Ne,Re,Pe,X),_e=new Sv(L,Te),ye=new sv,J=new hv(Ne),P=new S0(L,E,he,oe,g,l),Ae=new gv(L,oe,Re),V=new Mv(C,ae,Re,he),ne=new E0(C,Ne,ae),Ee=new B0(C,Ne,ae),ae.programs=ie.programs,L.capabilities=Re,L.extensions=Ne,L.properties=Te,L.renderLists=ye,L.shadowMap=Ae,L.state=he,L.info=ae}v!==on&&(F=new W0(v,t.width,t.height,o,r,s));let Z=new ld(L,C);this.xr=Z,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let w=Ne.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=Ne.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(w){w!==void 0&&(re=w,this.setSize(fe,G,!1))},this.getSize=function(w){return w.set(fe,G)},this.setSize=function(w,U,de=!0){if(Z.isPresenting){tt("WebGLRenderer: Can't change size while VR device is presenting.");return}fe=w,G=U,t.width=Math.floor(w*re),t.height=Math.floor(U*re),de===!0&&(t.style.width=w+"px",t.style.height=U+"px"),F!==null&&F.setSize(t.width,t.height),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(fe*re,G*re).floor()},this.setDrawingBufferSize=function(w,U,de){fe=w,G=U,re=de,t.width=Math.floor(w*de),t.height=Math.floor(U*de),this.setViewport(0,0,w,U)},this.setEffects=function(w){if(v===on){it("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let U=0;U<w.length;U++)if(w[U].isOutputPass===!0){tt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(Y)},this.getViewport=function(w){return w.copy(De)},this.setViewport=function(w,U,de,j){w.isVector4?De.set(w.x,w.y,w.z,w.w):De.set(w,U,de,j),he.viewport(Y.copy(De).multiplyScalar(ue()).round())},this.getScissor=function(w){return w.copy(et)},this.setScissor=function(w,U,de,j){w.isVector4?et.set(w.x,w.y,w.z,w.w):et.set(w,U,de,j),he.scissor(ke.copy(et).multiplyScalar(ue()).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(w){he.setScissorTest(Je=w)},this.setOpaqueSort=function(w){Me=w},this.setTransparentSort=function(w){Ke=w},this.getClearColor=function(w){return w.copy(P.getClearColor())},this.setClearColor=function(){P.setClearColor(...arguments)},this.getClearAlpha=function(){return P.getClearAlpha()},this.setClearAlpha=function(){P.setClearAlpha(...arguments)},this.clear=function(w=!0,U=!0,de=!0){let j=0;if(w){let ee=!1;if(pe!==null){let Oe=pe.texture.format;ee=m.has(Oe)}if(ee){let Oe=pe.texture.type,Ye=d.has(Oe),Fe=P.getClearColor(),Ge=P.getClearAlpha(),je=Fe.r,at=Fe.g,ut=Fe.b;Ye?(_[0]=je,_[1]=at,_[2]=ut,_[3]=Ge,C.clearBufferuiv(C.COLOR,0,_)):(M[0]=je,M[1]=at,M[2]=ut,M[3]=Ge,C.clearBufferiv(C.COLOR,0,M))}else j|=C.COLOR_BUFFER_BIT}U&&(j|=C.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),de&&(j|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j!==0&&C.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),q=w},this.dispose=function(){t.removeEventListener("webglcontextlost",ge,!1),t.removeEventListener("webglcontextrestored",O,!1),t.removeEventListener("webglcontextcreationerror",z,!1),P.dispose(),ye.dispose(),J.dispose(),We.dispose(),Te.dispose(),E.dispose(),oe.dispose(),I.dispose(),Pe.dispose(),V.dispose(),ie.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Et),Z.removeEventListener("sessionend",rn),sn.stop()};function ge(w){w.preventDefault(),hs("WebGLRenderer: Context Lost."),N=!0}function O(){hs("WebGLRenderer: Context Restored."),N=!1;let w=ae.autoReset,U=Ae.enabled,de=Ae.autoUpdate,j=Ae.needsUpdate,ee=Ae.type;H(),ae.autoReset=w,Ae.enabled=U,Ae.autoUpdate=de,Ae.needsUpdate=j,Ae.type=ee}function z(w){it("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ce(w){let U=w.target;U.removeEventListener("dispose",ce),He(U)}function He(w){rt(w),Te.remove(w)}function rt(w){let U=Te.get(w).programs;U!==void 0&&(U.forEach(function(de){ie.releaseProgram(de)}),w.isShaderMaterial&&ie.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,de,j,ee,Oe){U===null&&(U=nt);let Ye=ee.isMesh&&ee.matrixWorld.determinantAffine()<0,Fe=fp(w,U,de,j,ee);he.setMaterial(j,Ye);let Ge=de.index,je=1;if(j.wireframe===!0){if(Ge=I.getWireframeAttribute(de),Ge===void 0)return;je=2}let at=de.drawRange,ut=de.attributes.position,qe=at.start*je,pt=(at.start+at.count)*je;Oe!==null&&(qe=Math.max(qe,Oe.start*je),pt=Math.min(pt,(Oe.start+Oe.count)*je)),Ge!==null?(qe=Math.max(qe,0),pt=Math.min(pt,Ge.count)):ut!=null&&(qe=Math.max(qe,0),pt=Math.min(pt,ut.count));let Lt=pt-qe;if(Lt<0||Lt===1/0)return;Pe.setup(ee,j,Fe,de,Ge);let wt,yt=ne;if(Ge!==null&&(wt=x.get(Ge),yt=Ee,yt.setIndex(wt)),ee.isMesh)j.wireframe===!0?(he.setLineWidth(j.wireframeLinewidth*ue()),yt.setMode(C.LINES)):yt.setMode(C.TRIANGLES);else if(ee.isLine){let Gt=j.linewidth;Gt===void 0&&(Gt=1),he.setLineWidth(Gt*ue()),ee.isLineSegments?yt.setMode(C.LINES):ee.isLineLoop?yt.setMode(C.LINE_LOOP):yt.setMode(C.LINE_STRIP)}else ee.isPoints?yt.setMode(C.POINTS):ee.isSprite&&yt.setMode(C.TRIANGLES);if(ee.isBatchedMesh)if(Ne.get("WEBGL_multi_draw"))yt.renderMultiDraw(ee._multiDrawStarts,ee._multiDrawCounts,ee._multiDrawCount);else{let Gt=ee._multiDrawStarts,Ze=ee._multiDrawCounts,Kt=ee._multiDrawCount,gt=Ge?x.get(Ge).bytesPerElement:1,Ui=Te.get(j).currentProgram.getUniforms();for(let Wt=0;Wt<Kt;Wt++)Ui.setValue(C,"_gl_DrawID",Wt),yt.render(Gt[Wt]/gt,Ze[Wt])}else if(ee.isInstancedMesh)yt.renderInstances(qe,Lt,ee.count);else if(de.isInstancedBufferGeometry){let Gt=de._maxInstanceCount!==void 0?de._maxInstanceCount:1/0,Ze=Math.min(de.instanceCount,Gt);yt.renderInstances(qe,Lt,Ze)}else yt.render(qe,Lt)};function Be(w,U,de,j){q!==null&&w.isNodeMaterial&&q.setObject(j,w),xe===!0&&X.setState(w,de,!1),w.transparent===!0&&w.side===Vn&&w.forceSinglePass===!1?(w.side=tn,w.needsUpdate=!0,En(w,U,j),w.side=Li,w.needsUpdate=!0,En(w,U,j),w.side=Vn):En(w,U,j)}this.compile=function(w,U,de=null){de===null&&(de=w),q!==null&&q.renderStart(w,U,de),T=J.get(de),T.init(U),S.push(T),de.traverseVisible(function(ee){ee.isLight&&ee.layers.test(U.layers)&&(T.pushLight(ee),ee.castShadow&&T.pushShadow(ee))}),w!==de&&w.traverseVisible(function(ee){ee.isLight&&ee.layers.test(U.layers)&&(T.pushLight(ee),ee.castShadow&&T.pushShadow(ee))}),T.setupLights(),q!==null&&q.updateLights(T.state.lightsArray),Ie=this.localClippingEnabled,xe=X.init(this.clippingPlanes,Ie),xe===!0&&X.setGlobalState(this.clippingPlanes,U),q!==null&&Ae.render(T.state.shadowsArray,de,U);let j=new Set;return w.traverse(function(ee){if(!(ee.isMesh||ee.isPoints||ee.isLine||ee.isSprite))return;let Oe=ee.material;if(Oe)if(Array.isArray(Oe))for(let Ye=0;Ye<Oe.length;Ye++){let Fe=Oe[Ye];Be(Fe,de,U,ee),j.add(Fe)}else Be(Oe,de,U,ee),j.add(Oe)}),T=S.pop(),q!==null&&q.renderEnd(),j},this.compileAsync=function(w,U,de=null){let j=this.compile(w,U,de);return new Promise(ee=>{function Oe(){if(j.forEach(function(Ye){let Ge=Te.get(Ye).currentProgram;(Ge===void 0||Ge.isReady())&&j.delete(Ye)}),j.size===0){ee(w);return}setTimeout(Oe,10)}Ne.get("KHR_parallel_shader_compile")!==null?Oe():setTimeout(Oe,10)})};let lt=null;function ze(w){lt&&lt(w)}function Et(){sn.stop()}function rn(){sn.start()}let sn=new wu;sn.setAnimationLoop(ze),typeof self<"u"&&sn.setContext(self),this.setAnimationLoop=function(w){lt=w,Z.setAnimationLoop(w),w===null?sn.stop():sn.start()},Z.addEventListener("sessionstart",Et),Z.addEventListener("sessionend",rn),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;q!==null&&q.renderStart(w,U);let de=Z.enabled===!0&&Z.isPresenting===!0,j=F!==null&&(pe===null||de)&&F.begin(L,pe);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(U),U=Z.getCamera()),w.isScene===!0&&w.onBeforeRender(L,w,U,pe),T=J.get(w,S.length),T.init(U),T.state.textureUnits=We.getTextureUnits(),S.push(T),be.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),U.isArrayCamera?Ce.setFromArrayCamera(U):me.setFromProjectionMatrix(be,bn,U.reversedDepth),Ie=this.localClippingEnabled,xe=X.init(this.clippingPlanes,Ie),A=ye.get(w,b.length),A.init(),b.push(A),this.info.render.frame++,Z.enabled===!0&&Z.isPresenting===!0){let Ye=L.xr.getDepthSensingMesh();Ye!==null&&Mn(Ye,U,-1/0,L.sortObjects)}Mn(w,U,0,L.sortObjects),A.finish(),q!==null&&q.updateLights(T.state.lightsArray),L.sortObjects===!0&&A.sort(Me,Ke),k=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,k&&P.addToRenderList(A,w),this.info.autoReset===!0&&this.info.reset(),xe===!0&&X.beginShadows();let ee=T.state.shadowsArray;if(Ae.render(ee,w,U),xe===!0&&X.endShadows(),(j&&F.hasRenderPass())===!1){let Ye=A.opaque,Fe=A.transmissive;if(T.setupLights(),U.isArrayCamera){let Ge=U.cameras;if(Fe.length>0)for(let je=0,at=Ge.length;je<at;je++){let ut=Ge[je];Zn(Ye,Fe,w,ut)}k&&P.render(w);for(let je=0,at=Ge.length;je<at;je++){let ut=Ge[je];mi(A,w,ut,ut.viewport)}}else Fe.length>0&&Zn(Ye,Fe,w,U),k&&P.render(w),mi(A,w,U)}pe!==null&&B===0&&(We.updateMultisampleRenderTarget(pe),We.updateRenderTargetMipmap(pe)),j&&F.end(L),w.isScene===!0&&w.onAfterRender(L,w,U),Pe.resetDefaultState(),W=-1,se=null,S.pop(),S.length>0?(T=S[S.length-1],We.setTextureUnits(T.state.textureUnits),xe===!0&&X.setGlobalState(L.clippingPlanes,T.state.camera)):T=null,b.pop(),b.length>0?A=b[b.length-1]:A=null,q!==null&&q.renderEnd()};function Mn(w,U,de,j){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)de=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){let Ye=U.isArrayCamera?Ce:me;if(!w.frustumCulled||w.intersectsFrustum(Ye)){j&&Xe.setFromMatrixPosition(w.matrixWorld).applyMatrix4(be);let Fe=oe.update(w),Ge=w.material;Ge.visible&&A.push(w,Fe,Ge,de,Xe.z,null,U)}}else if(w.isMesh||w.isLine||w.isPoints){let Ye=U.isArrayCamera?Ce:me;if(!w.frustumCulled||w.intersectsFrustum(Ye)){let Fe=oe.update(w),Ge=w.material;if(j&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Xe.copy(w.boundingSphere.center)):(Fe.boundingSphere===null&&Fe.computeBoundingSphere(),Xe.copy(Fe.boundingSphere.center)),Xe.applyMatrix4(w.matrixWorld).applyMatrix4(be)),Array.isArray(Ge)){let je=Fe.groups;for(let at=0,ut=je.length;at<ut;at++){let qe=je[at],pt=Ge[qe.materialIndex];pt&&pt.visible&&A.push(w,Fe,pt,de,Xe.z,qe,U)}}else Ge.visible&&A.push(w,Fe,Ge,de,Xe.z,null,U)}}}let Oe=w.children;for(let Ye=0,Fe=Oe.length;Ye<Fe;Ye++)Mn(Oe[Ye],U,de,j)}function mi(w,U,de,j){let{opaque:ee,transmissive:Oe,transparent:Ye}=w;T.setupLightsView(de),xe===!0&&X.setGlobalState(L.clippingPlanes,de),j&&he.viewport(Y.copy(j)),ee.length>0&&gi(ee,U,de),Oe.length>0&&gi(Oe,U,de),Ye.length>0&&gi(Ye,U,de),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function Zn(w,U,de,j){if((de.isScene===!0?de.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[j.id]===void 0){let qe=Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[j.id]=new Nt(1,1,{generateMipmaps:!0,type:qe?Vt:on,minFilter:ci,samples:Math.max(4,Re.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ht.workingColorSpace})}let Oe=T.state.transmissionRenderTarget[j.id],Ye=j.viewport||Y;Oe.setSize(Ye.z*L.transmissionResolutionScale,Ye.w*L.transmissionResolutionScale);let Fe=L.getRenderTarget(),Ge=L.getActiveCubeFace(),je=L.getActiveMipmapLevel();L.setRenderTarget(Oe),L.getClearColor(Q),Le=L.getClearAlpha(),Le<1&&L.setClearColor(16777215,.5),L.clear(),k&&P.render(de);let at=L.toneMapping;L.toneMapping=Gn;let ut=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),T.setupLightsView(j),xe===!0&&X.setGlobalState(L.clippingPlanes,j),gi(w,de,j),We.updateMultisampleRenderTarget(Oe),We.updateRenderTargetMipmap(Oe),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let pt=0,Lt=U.length;pt<Lt;pt++){let wt=U[pt],{object:yt,geometry:Gt,material:Ze,group:Kt}=wt;if(Ze.side===Vn&&yt.layers.test(j.layers)){let gt=Ze.side;Ze.side=tn,Ze.needsUpdate=!0,ki(yt,de,j,Gt,Ze,Kt),Ze.side=gt,Ze.needsUpdate=!0,qe=!0}}qe===!0&&(We.updateMultisampleRenderTarget(Oe),We.updateRenderTargetMipmap(Oe))}L.setRenderTarget(Fe,Ge,je),L.setClearColor(Q,Le),ut!==void 0&&(j.viewport=ut),L.toneMapping=at}function gi(w,U,de){let j=U.isScene===!0?U.overrideMaterial:null;for(let ee=0,Oe=w.length;ee<Oe;ee++){let Ye=w[ee],{object:Fe,geometry:Ge,group:je}=Ye,at=Ye.material;at.allowOverride===!0&&j!==null&&(at=j),Fe.layers.test(de.layers)&&ki(Fe,U,de,Ge,at,je)}}function ki(w,U,de,j,ee,Oe){q!==null&&ee.isNodeMaterial&&q.setObject(w,ee),w.onBeforeRender(L,U,de,j,ee,Oe),w.modelViewMatrix.multiplyMatrices(de.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),ee.onBeforeRender(L,U,de,j,w,Oe),ee.transparent===!0&&ee.side===Vn&&ee.forceSinglePass===!1?(ee.side=tn,ee.needsUpdate=!0,L.renderBufferDirect(de,U,j,ee,w,Oe),ee.side=Li,ee.needsUpdate=!0,L.renderBufferDirect(de,U,j,ee,w,Oe),ee.side=Vn):L.renderBufferDirect(de,U,j,ee,w,Oe),w.onAfterRender(L,U,de,j,ee,Oe)}function er(w){let U=0;for(let de of w)de.texture!==null&&U++;return U}function En(w,U,de){U.isScene!==!0&&(U=nt);let j=Te.get(w),ee=T.state.lights,Oe=T.state.shadowsArray,Ye=ee.state.version,Fe=ie.getParameters(w,ee.state,Oe,U,de,T.state.lightProbeGridArray),Ge=ie.getProgramCacheKey(Fe),je=j.programs;j.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?U.environment:null,j.fog=U.fog;let at=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;j.envMap=E.get(w.envMap||j.environment,at),j.envMapRotation=j.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,je===void 0&&(w.addEventListener("dispose",ce),je=new Map,j.programs=je,j.programVariants=new Map);let ut=je.get(Ge);if(ut!==void 0){if(j.currentProgram===ut&&j.lightsStateVersion===Ye)return bd(w,Fe),ut}else Fe.uniforms=ie.getUniforms(w),q!==null&&w.isNodeMaterial&&q.build(w,de,Fe),w.onBeforeCompile(Fe,L),ut=ie.acquireProgram(Fe,Ge),je.set(Ge,ut),j.uniforms=Fe.uniforms;let qe=j.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(qe.clippingPlanes=X.uniform),bd(w,Fe),j.needsLights=gp(w),j.lightsStateVersion=Ye,j.needsLights&&(qe.ambientLightColor.value=ee.state.ambient,qe.lightProbe.value=ee.state.probe,qe.sunLights.value=ee.state.sun,qe.sunLightShadows.value=ee.state.sunShadow,qe.directionalLights.value=ee.state.directional,qe.directionalLightShadows.value=ee.state.directionalShadow,qe.spotLights.value=ee.state.spot,qe.spotLightShadows.value=ee.state.spotShadow,qe.rectAreaLights.value=ee.state.rectArea,qe.ltc_1.value=ee.state.rectAreaLTC1,qe.ltc_2.value=ee.state.rectAreaLTC2,qe.pointLights.value=ee.state.point,qe.pointLightShadows.value=ee.state.pointShadow,qe.hemisphereLights.value=ee.state.hemi,qe.sunShadowMatrix.value=ee.state.sunShadowMatrix,qe.sunShadowCascade.value=ee.state.sunShadowCascade,qe.directionalShadowMatrix.value=ee.state.directionalShadowMatrix,qe.spotLightMatrix.value=ee.state.spotLightMatrix,qe.spotLightMap.value=ee.state.spotLightMap,qe.pointShadowMatrix.value=ee.state.pointShadowMatrix),j.numLightProbeGrids=er(T.state.lightProbeGridArray),j.currentProgram=ut,j.uniformsList=null,ut}function Hl(w,U,de,j,ee){let Oe=Te.get(w),Ye=Oe.currentProgram.id+","+j+","+ee,Fe=Oe.programVariants.get(Ye);return Fe===void 0?(Fe=En(w,U,de),Oe.programVariants.set(Ye,Fe)):(Oe.currentProgram=Fe,Oe.uniformsList=null,Oe.outputColorSpace=j,Oe.toneMapping=ee),Fe}function Xr(w){if(w.uniformsList===null){let U=w.currentProgram.getUniforms();w.uniformsList=zr.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function bd(w,U){let de=Te.get(w);de.outputColorSpace=U.outputColorSpace,de.batching=U.batching,de.batchingColor=U.batchingColor,de.instancing=U.instancing,de.instancingColor=U.instancingColor,de.instancingMorph=U.instancingMorph,de.skinning=U.skinning,de.morphTargets=U.morphTargets,de.morphNormals=U.morphNormals,de.morphColors=U.morphColors,de.morphTargetsCount=U.morphTargetsCount,de.numClippingPlanes=U.numClippingPlanes,de.numIntersection=U.numClipIntersection,de.vertexAlphas=U.vertexAlphas,de.vertexTangents=U.vertexTangents,de.toneMapping=U.toneMapping}function fp(w,U,de,j,ee){U.isScene!==!0&&(U=nt),We.resetTextureUnits();let Oe=U.fog,Ye=j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial?U.environment:null,Fe=pe===null?L.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:ht.workingColorSpace,Ge=j.isMeshStandardMaterial||j.isMeshLambertMaterial&&!j.envMap||j.isMeshPhongMaterial&&!j.envMap,je=E.get(j.envMap||Ye,Ge),at=j.vertexColors===!0&&!!de.attributes.color&&de.attributes.color.itemSize===4,ut=!!de.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),qe=!!de.morphAttributes.position,pt=!!de.morphAttributes.normal,Lt=!!de.morphAttributes.color,wt=Gn;j.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(wt=L.toneMapping);let yt=de.morphAttributes.position||de.morphAttributes.normal||de.morphAttributes.color,Gt=yt!==void 0?yt.length:0,Ze=Te.get(j),Kt=T.state.lights;if(xe===!0&&(Ie===!0||w!==se)){let Ct=w===se&&j.id===W;X.setState(j,w,Ct)}let gt=!1,Ui=!1;j.version===Ze.__version?Ze.needsLights&&Ze.lightsStateVersion!==Kt.state.version||ee.isBatchedMesh&&Ze.batching===!1||!ee.isBatchedMesh&&Ze.batching===!0||ee.isBatchedMesh&&Ze.batchingColor===!0&&ee._colorsTexture===null||ee.isBatchedMesh&&Ze.batchingColor===!1&&ee._colorsTexture!==null||ee.isInstancedMesh&&Ze.instancing===!1||!ee.isInstancedMesh&&Ze.instancing===!0||ee.isSkinnedMesh&&Ze.skinning===!1||!ee.isSkinnedMesh&&Ze.skinning===!0||ee.isInstancedMesh&&Ze.instancingColor===!0&&ee.instanceColor===null||ee.isInstancedMesh&&Ze.instancingColor===!1&&ee.instanceColor!==null||ee.isInstancedMesh&&Ze.instancingMorph===!0&&ee.morphTexture===null||ee.isInstancedMesh&&Ze.instancingMorph===!1&&ee.morphTexture!==null||Ze.envMap!==je||j.fog===!0&&Ze.fog!==Oe||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==X.numPlanes||Ze.numIntersection!==X.numIntersection)||Ze.vertexAlphas!==at||Ze.vertexTangents!==ut||Ze.morphTargets!==qe||Ze.morphNormals!==pt||Ze.morphColors!==Lt||Ze.morphTargetsCount!==Gt||Ze.numLightProbeGrids!==er(T.state.lightProbeGridArray)?gt=!0:(Ze.outputColorSpace!==Fe||Ze.toneMapping!==wt)&&(Ui=!0):(gt=!0,Ze.__version=j.version);let Wt=Ze.currentProgram;(gt===!0||Ui===!0)&&(Wt=Ui===!0?Hl(j,U,ee,Fe,wt):En(j,U,ee),q&&j.isNodeMaterial&&q.onUpdateProgram(j,Wt,Ze));let pa=!1,xi=!1,Fi=!1,ft=Wt.getUniforms(),Ht=Ze.uniforms;if(he.useProgram(Wt.program)&&(pa=!0,xi=!0,Fi=!0),j.id!==W&&(W=j.id,xi=!0),pa||se!==w){he.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ft.setValue(C,"projectionMatrix",w.projectionMatrix),ft.setValue(C,"viewMatrix",w.matrixWorldInverse);let Ot=ft.map.cameraPosition;Ot!==void 0&&Ot.setValue(C,$e.setFromMatrixPosition(w.matrixWorld)),Re.logarithmicDepthBuffer&&ft.setValue(C,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&ft.setValue(C,"isOrthographic",w.isOrthographicCamera===!0),se!==w&&(se=w,xi=!0,Fi=!0)}if(Ze.needsLights&&(Kt.state.sunShadowMap.length>0&&ft.setValue(C,"sunShadowMap",Kt.state.sunShadowMap,We),Kt.state.directionalShadowMap.length>0&&ft.setValue(C,"directionalShadowMap",Kt.state.directionalShadowMap,We),Kt.state.spotShadowMap.length>0&&ft.setValue(C,"spotShadowMap",Kt.state.spotShadowMap,We),Kt.state.pointShadowMap.length>0&&ft.setValue(C,"pointShadowMap",Kt.state.pointShadowMap,We)),ee.isSkinnedMesh){ft.setOptional(C,ee,"bindMatrix"),ft.setOptional(C,ee,"bindMatrixInverse");let Ct=ee.skeleton;Ct&&(Ct.boneTexture===null&&Ct.computeBoneTexture(),ft.setValue(C,"boneTexture",Ct.boneTexture,We))}ee.isBatchedMesh&&(ft.setOptional(C,ee,"batchingTexture"),ft.setValue(C,"batchingTexture",ee._matricesTexture,We),ft.setOptional(C,ee,"batchingIdTexture"),ft.setValue(C,"batchingIdTexture",ee._indirectTexture,We),ft.setOptional(C,ee,"batchingColorTexture"),ee._colorsTexture!==null&&ft.setValue(C,"batchingColorTexture",ee._colorsTexture,We));let Tn=de.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&le.update(ee,de,Wt),(xi||Ze.receiveShadow!==ee.receiveShadow)&&(Ze.receiveShadow=ee.receiveShadow,ft.setValue(C,"receiveShadow",ee.receiveShadow)),(j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial)&&j.envMap===null&&U.environment!==null&&(Ht.envMapIntensity.value=U.environmentIntensity),Ht.dfgLUT!==void 0&&(Ht.dfgLUT.value=Tv()),xi){if(ft.setValue(C,"toneMappingExposure",L.toneMappingExposure),Ze.needsLights&&mp(Ht,Fi),Oe&&j.fog===!0&&_e.refreshFogUniforms(Ht,Oe),_e.refreshMaterialUniforms(Ht,j,re,G,T.state.transmissionRenderTarget[w.id]),Ze.needsLights&&Ze.numLightProbeGrids>0){let Ct=y,Ot=0;for(let Kn of T.state.lightProbeGridArray)Kn.texture!==null&&(Ct.textures[Ot]=Kn.texture,Ct.min[Ot]=Kn.boundingBox.min,Ct.max[Ot]=Kn.boundingBox.max,Ct.resolution[Ot]=Kn.resolution,Ot++);for(let Kn in Ct)Ct[Kn].length=Ot;Ht.probesSH.value=Ct.textures,Ht.probesMin.value=Ct.min,Ht.probesMax.value=Ct.max,Ht.probesResolution.value=Ct.resolution}zr.upload(C,Xr(Ze),Ht,We)}if(j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(zr.upload(C,Xr(Ze),Ht,We),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&ft.setValue(C,"center",ee.center),ft.setValue(C,"modelViewMatrix",ee.modelViewMatrix),ft.setValue(C,"normalMatrix",ee.normalMatrix),ft.setValue(C,"modelMatrix",ee.matrixWorld),j.uniformsGroups!==void 0){let Ct=j.uniformsGroups;for(let Ot=0,Kn=Ct.length;Ot<Kn;Ot++){let yd=Ct[Ot];V.update(yd,Wt),V.bind(yd,Wt)}}return Wt}function mp(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.sunLights.needsUpdate=U,w.sunLightShadows.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function gp(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return pe},this.setRenderTargetTextures=function(w,U,de){let j=Te.get(w);j.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),Te.get(w.texture).__webglTexture=U,Te.get(w.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:de,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,U){let de=Te.get(w);de.__webglFramebuffer=U,de.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,de=0){pe=w,$=U,B=de;let j=null,ee=!1,Oe=!1;if(w){let Fe=Te.get(w);if(Fe.__useDefaultFramebuffer!==void 0){he.bindFramebuffer(C.FRAMEBUFFER,Fe.__webglFramebuffer),Y.copy(w.viewport),ke.copy(w.scissor),Ue=w.scissorTest,he.viewport(Y),he.scissor(ke),he.setScissorTest(Ue),W=-1;return}else if(Fe.__webglFramebuffer===void 0)We.setupRenderTarget(w);else if(Fe.__hasExternalTextures)We.rebindTextures(w,Te.get(w.texture).__webglTexture,Te.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let at=w.depthTexture;if(Fe.__boundDepthTexture!==at){if(at!==null&&Te.has(at)&&(w.width!==at.image.width||w.height!==at.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");We.setupDepthRenderbuffer(w)}}let Ge=w.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Oe=!0);let je=Te.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(je[U])?j=je[U][de]:j=je[U],ee=!0):w.samples>0&&We.useMultisampledRTT(w)===!1?j=Te.get(w).__webglMultisampledFramebuffer:Array.isArray(je)?j=je[de]:j=je,Y.copy(w.viewport),ke.copy(w.scissor),Ue=w.scissorTest}else Y.copy(De).multiplyScalar(re).floor(),ke.copy(et).multiplyScalar(re).floor(),Ue=Je;if(de!==0&&(j=te),he.bindFramebuffer(C.FRAMEBUFFER,j)&&he.drawBuffers(w,j),he.viewport(Y),he.scissor(ke),he.setScissorTest(Ue),ee){let Fe=Te.get(w.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+U,Fe.__webglTexture,de)}else if(Oe){let Fe=U;for(let Ge=0;Ge<w.textures.length;Ge++){let je=Te.get(w.textures[Ge]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ge,je.__webglTexture,de,Fe)}}else if(w!==null&&de!==0){let Fe=Te.get(w.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Fe.__webglTexture,de)}W=-1};function _d(w){let U=Te.get(w);return(U.__readFormat!==w.format||U.__readType!==w.type)&&(U.__readFormat=w.format,U.__readType=w.type,U.__formatReadable=Re.textureFormatReadable(w.format),U.__typeReadable=Re.textureTypeReadable(w.type)),U}this.readRenderTargetPixels=function(w,U,de,j,ee,Oe,Ye,Fe=0){if(!(w&&w.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=Te.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ye!==void 0&&(Ge=Ge[Ye],Array.isArray(Ge)&&(Ge=Ge[0])),Ge){he.bindFramebuffer(C.FRAMEBUFFER,Ge);try{let je=w.textures[Fe],at=je.format,ut=je.type;w.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Fe);let qe=_d(je);if(qe.__formatReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(qe.__typeReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-j&&de>=0&&de<=w.height-ee&&C.readPixels(U,de,j,ee,Se.convert(at),Se.convert(ut),Oe)}finally{let je=pe!==null?Te.get(pe).__webglFramebuffer:null;he.bindFramebuffer(C.FRAMEBUFFER,je)}}},this.readRenderTargetPixelsAsync=async function(w,U,de,j,ee,Oe,Ye,Fe=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ge=Te.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ye!==void 0&&(Ge=Ge[Ye],Array.isArray(Ge)&&(Ge=Ge[0])),Ge)if(U>=0&&U<=w.width-j&&de>=0&&de<=w.height-ee){he.bindFramebuffer(C.FRAMEBUFFER,Ge);let je=w.textures[Fe],at=je.format,ut=je.type;w.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Fe);let qe=_d(je);if(qe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(qe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let pt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,pt),C.bufferData(C.PIXEL_PACK_BUFFER,Oe.byteLength,C.STREAM_READ),C.readPixels(U,de,j,ee,Se.convert(at),Se.convert(ut),0),C.bindBuffer(C.PIXEL_PACK_BUFFER,null);let Lt=pe!==null?Te.get(pe).__webglFramebuffer:null;he.bindFramebuffer(C.FRAMEBUFFER,Lt);let wt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Xh(C,wt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,pt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,Oe),C.bindBuffer(C.PIXEL_PACK_BUFFER,null),C.deleteBuffer(pt),C.deleteSync(wt),Oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,U=null,de=0){let j=Math.pow(2,-de),ee=Math.floor(w.image.width*j),Oe=Math.floor(w.image.height*j),Ye=U!==null?U.x:0,Fe=U!==null?U.y:0;We.setTexture2D(w,0),C.copyTexSubImage2D(C.TEXTURE_2D,de,0,0,Ye,Fe,ee,Oe),he.unbindTexture()},this.copyTextureToTexture=function(w,U,de=null,j=null,ee=0,Oe=0){let Ye,Fe,Ge,je,at,ut,qe,pt,Lt,wt=w.isCompressedTexture?w.mipmaps[Oe]:w.image;if(de!==null)Ye=de.max.x-de.min.x,Fe=de.max.y-de.min.y,Ge=de.isBox3?de.max.z-de.min.z:1,je=de.min.x,at=de.min.y,ut=de.isBox3?de.min.z:0;else{let ft=Math.pow(2,-ee);Ye=Math.floor(wt.width*ft),Fe=Math.floor(wt.height*ft),w.isDataArrayTexture?Ge=wt.depth:w.isData3DTexture?Ge=Math.floor(wt.depth*ft):Ge=1,je=0,at=0,ut=0}j!==null?(qe=j.x,pt=j.y,Lt=j.z):(qe=0,pt=0,Lt=0);let yt=Se.convert(U.format),Gt=Se.convert(U.type),Ze;U.isData3DTexture?(We.setTexture3D(U,0),Ze=C.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(We.setTexture2DArray(U,0),Ze=C.TEXTURE_2D_ARRAY):(We.setTexture2D(U,0),Ze=C.TEXTURE_2D),he.activeTexture(C.TEXTURE0),he.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,U.flipY),he.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),he.pixelStorei(C.UNPACK_ALIGNMENT,U.unpackAlignment);let Kt=he.getParameter(C.UNPACK_ROW_LENGTH),gt=he.getParameter(C.UNPACK_IMAGE_HEIGHT),Ui=he.getParameter(C.UNPACK_SKIP_PIXELS),Wt=he.getParameter(C.UNPACK_SKIP_ROWS),pa=he.getParameter(C.UNPACK_SKIP_IMAGES);he.pixelStorei(C.UNPACK_ROW_LENGTH,wt.width),he.pixelStorei(C.UNPACK_IMAGE_HEIGHT,wt.height),he.pixelStorei(C.UNPACK_SKIP_PIXELS,je),he.pixelStorei(C.UNPACK_SKIP_ROWS,at),he.pixelStorei(C.UNPACK_SKIP_IMAGES,ut);let xi=w.isDataArrayTexture||w.isData3DTexture,Fi=U.isDataArrayTexture||U.isData3DTexture;if(w.isDepthTexture){let ft=Te.get(w),Ht=Te.get(U),Tn=Te.get(ft.__renderTarget),Ct=Te.get(Ht.__renderTarget);he.bindFramebuffer(C.READ_FRAMEBUFFER,Tn.__webglFramebuffer),he.bindFramebuffer(C.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let Ot=0;Ot<Ge;Ot++)xi&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Te.get(w).__webglTexture,ee,ut+Ot),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Te.get(U).__webglTexture,Oe,Lt+Ot)),C.blitFramebuffer(je,at,je+Ye,at+Fe,qe,pt,qe+Ye,pt+Fe,C.DEPTH_BUFFER_BIT,C.NEAREST);he.bindFramebuffer(C.READ_FRAMEBUFFER,null),he.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(ee!==0||w.isRenderTargetTexture||Te.has(w)){let ft=Te.get(w),Ht=Te.get(U);he.bindFramebuffer(C.READ_FRAMEBUFFER,D),he.bindFramebuffer(C.DRAW_FRAMEBUFFER,K);for(let Tn=0;Tn<Ge;Tn++)xi?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ft.__webglTexture,ee,ut+Tn):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ft.__webglTexture,ee),Fi?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ht.__webglTexture,Oe,Lt+Tn):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ht.__webglTexture,Oe),ee!==0?C.blitFramebuffer(je,at,je+Ye,at+Fe,qe,pt,qe+Ye,pt+Fe,C.COLOR_BUFFER_BIT,C.NEAREST):Fi?C.copyTexSubImage3D(Ze,Oe,qe,pt,Lt+Tn,je,at,Ye,Fe):C.copyTexSubImage2D(Ze,Oe,qe,pt,je,at,Ye,Fe);he.bindFramebuffer(C.READ_FRAMEBUFFER,null),he.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Fi?w.isDataTexture||w.isData3DTexture?C.texSubImage3D(Ze,Oe,qe,pt,Lt,Ye,Fe,Ge,yt,Gt,wt.data):U.isCompressedArrayTexture?C.compressedTexSubImage3D(Ze,Oe,qe,pt,Lt,Ye,Fe,Ge,yt,wt.data):C.texSubImage3D(Ze,Oe,qe,pt,Lt,Ye,Fe,Ge,yt,Gt,wt):w.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,Oe,qe,pt,Ye,Fe,yt,Gt,wt.data):w.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,Oe,qe,pt,wt.width,wt.height,yt,wt.data):C.texSubImage2D(C.TEXTURE_2D,Oe,qe,pt,Ye,Fe,yt,Gt,wt);he.pixelStorei(C.UNPACK_ROW_LENGTH,Kt),he.pixelStorei(C.UNPACK_IMAGE_HEIGHT,gt),he.pixelStorei(C.UNPACK_SKIP_PIXELS,Ui),he.pixelStorei(C.UNPACK_SKIP_ROWS,Wt),he.pixelStorei(C.UNPACK_SKIP_IMAGES,pa),Oe===0&&U.generateMipmaps===!0&&U.mipmapsAutoUpdate===!0&&C.generateMipmap(Ze),he.unbindTexture()},this.initRenderTarget=function(w){Te.get(w).__webglFramebuffer===void 0&&We.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?We.setTextureCube(w,0):w.isData3DTexture?We.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?We.setTexture2DArray(w,0):We.setTexture2D(w,0),he.unbindTexture()},this.resetState=function(){$=0,B=0,pe=null,he.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=ht._getUnpackColorSpace()}};var Du={type:"change"},hd={type:"start"},ku={type:"end"},Tl=new Si,Nu=new hn,Av=Math.cos(70*Wn.DEG2RAD),Ft=new R,ln=2*Math.PI,vt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},dd=1e-6,Al=class extends Gs{constructor(e,t=null){super(e,t),this.state=vt.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ii.ROTATE,MIDDLE:Ii.DOLLY,RIGHT:Ii.PAN},this.touches={ONE:Pi.ROTATE,TWO:Pi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new Qt,this._lastTargetPosition=new R,this._quat=new Qt().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new kr,this._sphericalDelta=new kr,this._scale=1,this._panOffset=new R,this._rotateStart=new we,this._rotateEnd=new we,this._rotateDelta=new we,this._panStart=new we,this._panEnd=new we,this._panDelta=new we,this._dollyStart=new we,this._dollyEnd=new we,this._dollyDelta=new we,this._dollyDirection=new R,this._mouse=new we,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Rv.bind(this),this._onPointerDown=Cv.bind(this),this._onPointerUp=Iv.bind(this),this._onContextMenu=Fv.bind(this),this._onMouseWheel=Dv.bind(this),this._onKeyDown=Nv.bind(this),this._onTouchStart=kv.bind(this),this._onTouchMove=Uv.bind(this),this._onMouseDown=Pv.bind(this),this._onMouseMove=Lv.bind(this),this._interceptControlDown=Ov.bind(this),this._interceptControlUp=Bv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=vt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Du),this.update(),this.state=vt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Ft.copy(t).sub(this.target),Ft.applyQuaternion(this._quat),this._spherical.setFromVector3(Ft),this.autoRotate&&this.state===vt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=ln:n>Math.PI&&(n-=ln),r<-Math.PI?r+=ln:r>Math.PI&&(r-=ln),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(Ft.setFromSpherical(this._spherical),Ft.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ft),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Ft.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){let o=new R(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;let c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ft.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Tl.origin.copy(this.object.position),Tl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Tl.direction))<Av?this.object.lookAt(this.target):(Nu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Tl.intersectPlane(Nu,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>dd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>dd||this._lastTargetPosition.distanceToSquared(this.target)>dd?(this.dispatchEvent(Du),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ln/60*this.autoRotateSpeed*e:ln/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ft.setFromMatrixColumn(t,0),Ft.multiplyScalar(-e),this._panOffset.add(Ft)}_panUp(e,t){this.screenSpacePanning===!0?Ft.setFromMatrixColumn(t,1):(Ft.setFromMatrixColumn(t,0),Ft.crossVectors(this.object.up,Ft)),Ft.multiplyScalar(e),this._panOffset.add(Ft)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Ft.copy(r).sub(this.target);let s=Ft.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*t*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,s=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new we,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Cv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Rv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Iv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ku),this.state=vt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Pv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ii.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=vt.DOLLY;break;case Ii.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=vt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=vt.ROTATE}break;case Ii.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=vt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=vt.PAN}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(hd)}function Lv(i){switch(this.state){case vt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case vt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case vt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Dv(i){this.enabled===!1||this.enableZoom===!1||this.state!==vt.NONE||(i.preventDefault(),this.dispatchEvent(hd),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(ku))}function Nv(i){this.enabled!==!1&&this._handleKeyDown(i)}function kv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Pi.ROTATE:if(this.enableRotate===!1){this.state=vt.NONE;break}this._handleTouchStartRotate(i),this.state=vt.TOUCH_ROTATE;break;case Pi.PAN:if(this.enablePan===!1){this.state=vt.NONE;break}this._handleTouchStartPan(i),this.state=vt.TOUCH_PAN;break;default:this.state=vt.NONE}break;case 2:switch(this.touches.TWO){case Pi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=vt.TOUCH_DOLLY_PAN;break;case Pi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=vt.TOUCH_DOLLY_ROTATE;break;default:this.state=vt.NONE}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(hd)}function Uv(i){switch(this._trackPointer(i),this.state){case vt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case vt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case vt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case vt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=vt.NONE}}function Fv(i){this.enabled!==!1&&i.preventDefault()}function Ov(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Bv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Uu=new R,zv=new Qt,Fu=new R,fi=class extends Pt{constructor(e=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this}};var qn=new dt,Hv=new dt,Cl=class{constructor(e={}){let t=this,n,r,s,a,o={camera:{style:""},objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l;let c=document.createElement("div");c.style.transformOrigin="0 0",c.style.pointerEvents="none",l.appendChild(c);let h=document.createElement("div");h.style.transformStyle="preserve-3d",c.appendChild(h),this.getSize=function(){return{width:n,height:r}},this.render=function(m,d){let _=d.projectionMatrix.elements[5]*a;d.view&&d.view.enabled?(c.style.transform=`translate( ${-d.view.offsetX*(n/d.view.width)}px, ${-d.view.offsetY*(r/d.view.height)}px )`,c.style.transform+=`scale( ${d.view.fullWidth/d.view.width}, ${d.view.fullHeight/d.view.height} )`):c.style.transform="",m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),d.parent===null&&d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld();let M,y;d.isOrthographicCamera&&(M=-(d.right+d.left)/2,y=(d.top+d.bottom)/2);let A=d.view&&d.view.enabled?d.view.height/d.view.fullHeight:1,T=d.isOrthographicCamera?`scale( ${A} )scale(`+_+")translate("+f(M)+"px,"+f(y)+"px)"+u(d.matrixWorldInverse):`scale( ${A} )translateZ(`+_+"px)"+u(d.matrixWorldInverse),S=(d.isPerspectiveCamera?"perspective("+_+"px) ":"")+T+"translate("+s+"px,"+a+"px)";o.camera.style!==S&&(h.style.transform=S,o.camera.style=S),v(m,m,d,T)},this.setSize=function(m,d){n=m,r=d,s=n/2,a=r/2,l.style.width=m+"px",l.style.height=d+"px",c.style.width=m+"px",c.style.height=d+"px",h.style.width=m+"px",h.style.height=d+"px"};function f(m){return Math.abs(m)<1e-10?0:m}function u(m){let d=m.elements;return"matrix3d("+f(d[0])+","+f(-d[1])+","+f(d[2])+","+f(d[3])+","+f(d[4])+","+f(-d[5])+","+f(d[6])+","+f(d[7])+","+f(d[8])+","+f(-d[9])+","+f(d[10])+","+f(d[11])+","+f(d[12])+","+f(-d[13])+","+f(d[14])+","+f(d[15])+")"}function p(m){let d=m.elements;return"translate(-50%,-50%)"+("matrix3d("+f(d[0])+","+f(d[1])+","+f(d[2])+","+f(d[3])+","+f(-d[4])+","+f(-d[5])+","+f(-d[6])+","+f(-d[7])+","+f(d[8])+","+f(d[9])+","+f(d[10])+","+f(d[11])+","+f(d[12])+","+f(d[13])+","+f(d[14])+","+f(d[15])+")")}function g(m){m.isCSS3DObject&&(m.element.style.display="none");for(let d=0,_=m.children.length;d<_;d++)g(m.children[d])}function v(m,d,_,M){if(m.visible===!1){g(m);return}if(m.isCSS3DObject){let y=m.layers.test(_.layers)===!0,A=m.element;if(A.style.display=y===!0?"":"none",y===!0){m.onBeforeRender(t,d,_);let T;m.isCSS3DSprite?(qn.copy(_.matrixWorldInverse),qn.transpose(),m.rotation2D!==0&&qn.multiply(Hv.makeRotationZ(m.rotation2D)),m.matrixWorld.decompose(Uu,zv,Fu),qn.setPosition(Uu),qn.scale(Fu),qn.elements[3]=0,qn.elements[7]=0,qn.elements[11]=0,qn.elements[15]=1,T=p(qn)):T=p(m.matrixWorld);let b=o.objects.get(m);if(b===void 0||b.style!==T){A.style.transform=T;let S={style:T};o.objects.set(m,S)}A.parentNode!==h&&h.appendChild(A),m.onAfterRender(t,d,_)}}for(let y=0,A=m.children.length;y<A;y++)v(m.children[y],d,_,M)}}};var Vr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var gn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Vv=new qi(-1,1,1,-1,0,1),ud=class extends Mt{constructor(){super(),this.setAttribute("position",new xt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new xt([0,2,0,0,2,0],2))}},Gv=new ud,Ni=class{constructor(e){this._mesh=new bt(Gv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Vv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Rl=class extends gn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof It?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=pi.clone(e.uniforms),this.material=new It({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ni(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var la=class extends gn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}},Il=class extends gn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Pl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new we);this._width=n.width,this._height=n.height,t=new Nt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Vt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Rl(Vr),this.copyPass.material.blending=li,this.timer=new Vs}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let r=0,s=this.passes.length;r<s;r++){let a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}la!==void 0&&(a instanceof la?n=!0:a instanceof Il&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new we);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Ll=class extends gn{constructor(e,t,n=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Qe}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}};var Ou={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Qe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Gr=class i extends gn{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e!==void 0?new we(e.x,e.y):new we(256,256),this.clearColor=new Qe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Nt(s,a,{type:Vt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let f=new Nt(s,a,{type:Vt,depthBuffer:!1});f.texture.name="UnrealBloomPass.h"+h,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let u=new Nt(s,a,{type:Vt,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),s=Math.round(s/2),a=Math.round(a/2)}let o=Ou;this.highPassUniforms=pi.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new It({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new we(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=pi.clone(Vr.uniforms),this.blendMaterial=new It({uniforms:this.copyUniforms,vertexShader:Vr.vertexShader,fragmentShader:Vr.fragmentShader,premultipliedAlpha:!0,blending:nn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Qe,this._oldClearAlpha=1,this._basic=new Hn,this._fsQuad=new Ni(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,r),this.renderTargetsVertical[s].setSize(n,r),this.separableBlurMaterials[s].uniforms.invSize.value=new we(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(e,t,n,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(n*n))/n);let r=[],s=[];for(let a=1;a<e;a+=2){let o=t[a],l=a+1<e?t[a+1]:0,c=o+l;r.push((a*o+(a+1)*l)/c),s.push(c)}return new It({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new we(.5,.5)},direction:{value:new we(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:s}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new It({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Gr.BlurDirectionX=new we(1,0);Gr.BlurDirectionY=new we(0,1);var ca={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Dl=class extends gn{constructor(){super(),this.isOutputPass=!0,this.uniforms=pi.clone(ca.uniforms),this.material=new Pr({name:ca.name,uniforms:this.uniforms,vertexShader:ca.vertexShader,fragmentShader:ca.fragmentShader}),this._fsQuad=new Ni(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ht.getTransfer(this._outputColorSpace)===mt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Xs?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ys?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===qs?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ki?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ks?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Js?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Zs&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var xn=Object.freeze({version:"ion-instrument-v2",layout:"research-space-v4",intro:1350,handoff:1450,focus:950,background:461844,copper:15183224,ice:10734038,complete:10736833});function Bu({time:i=0,index:e=0,length:t=1,age:n=1/0,signal:r=null,signalAge:s=1/0,active:a=!1,waiting:o=!1,complete:l=!1,highlight:c=!1,reduced:h=!1}={}){let f=h?1:Math.max(0,Math.min(1,n/360));if(h)return{mode:"static",progress:.5,reveal:1,gain:.2,moving:!1,execution:a,repeats:1};let u=a?"running":o?"waiting":c?"highlight":l?"settled":"ambient",p=a?7.2:c?4.2:l?2.2:1.8,g=a?.96:o?.28:c?.6:l?.28:.22,v=((i*p/Math.max(.01,t)+e*.381966)%1+1)%1;return f<1?(u="arrival",v=f,g=.72):r==="complete"&&s>=0&&s<720?(u="receipt",v=1-s/720,g=.82):r==="engage"&&s>=0&&s<500?(u="engage",v=s/500,g=.88):o&&(v=.5+Math.sin(i*1.3)*.03,g=.24+Math.sin(i*2.1)*.05),{mode:u,progress:v,reveal:f,gain:g,moving:!0,execution:a,repeats:u==="waiting"?1:Math.max(1,Math.min(4,Math.ceil(t/12)))}}function zu(i,e){let t=i?.byId.get(e)||i?.byId.get("step:"+e);if(!t)return"";let n=t.stepId||"__project__",r=i.presentation,s=r?.expanded&&(r.stageId||"__project__")===n,a=s&&i.nodes.some(o=>o.origin==="activity"&&(o.stepId||"__project__")===n);return n+"|"+(a?"family":s?"parent":"anchor")}function Hu(i,e){if(i?.phase!=="completed"||!i.nodes?.length||!i.nodes.every(s=>s.status==="submitted"))return null;let t=i.nodes.at(-1),n=e.filter(s=>s.kind==="artifact"&&s.stepId===t.id&&s.availability==="file"),r=/\.(docx|pdf|pptx|xlsx)$/i;return n.find(s=>r.test(s.title))||n[0]||e.find(s=>s.kind==="delivery"&&s.stepId===t.id)||null}function Vu(i,e){let t=!!e?.activeId&&["running","processing"].includes(i?.phase);return e?.presentation?.expanded?t?"execution":"inspection":i?.phase==="completed"?"complete":"overview"}function Gu(i,e,t=!1){if(t||!e||i<0||i>=1150)return{lift:0,scale:1,light:0};let n=i/1e3,r=Math.exp(-5.8*n),s=Math.sin(n*12.4);return{lift:s*r*(e==="complete"?.32:.18),scale:1+s*r*.018,light:Math.max(0,1-i/1150)}}function Nl(i,e,{mode:t="overview",height:n=1e3}={}){let r=v=>{let m=Math.hypot(...v)||1;return v.map(d=>d/m)},s=(v,m)=>v.reduce((d,_,M)=>d+_*m[M],0),a=(v,m)=>[v[1]*m[2]-v[2]*m[1],v[2]*m[0]-v[0]*m[2],v[0]*m[1]-v[1]*m[0]],o=r(t==="complete"?[-.2,.19,1]:t==="execution"||t==="inspection"?[-.1,.105,1]:[-.2,.17,1]),l=r(a([0,1,0],o)),c=a(o,l),h=[(i.minX+i.maxX)/2,(i.minY+i.maxY)/2,(i.minZ+i.maxZ)/2],f=Math.tan(17.5*Math.PI/180),u=t==="execution"||t==="inspection"?.76:.86,p=Math.max(.48,Math.min(.8,(n-210)/n)),g=16.5;for(let v of[i.minX,i.maxX])for(let m of[i.minY,i.maxY])for(let d of[i.minZ,i.maxZ]){let _=[v-h[0],m-h[1],d-h[2]],M=s(_,o);g=Math.max(g,M+Math.abs(s(_,l))/(f*Math.max(.25,e)*u),M+Math.abs(s(_,c))/(f*p))}return g+=1.2,{target:h,position:h.map((v,m)=>v+o[m]*g),distance:g,direction:o,right:l,up:c,widthUse:u,heightUse:p}}var Sn=Object.freeze({version:xn.layout,stationGapX:11.2,stationGapZ:6.2,deckWidth:8.8,deckDepth:3.4,groundY:-2.2,visibleCalls:6,callColumns:3});function pd(i){return i?.hero?{w:11.6,h:6.4,depth:.7}:i?.kind==="engine"?{w:4.3,h:2.5,depth:.55}:i?.kind==="step"?{w:7.8,h:4.3,depth:.48}:["artifact","delivery"].includes(i?.kind)?{w:3.8,h:2.35,depth:.38}:{w:4.9,h:2.85,depth:.42}}function kl(i,e){let t=Math.floor(e/3),n=e%3;return{x:i.x+(n-1)*5.65,y:i.y-4.5-t*3.3,z:i.z+7+(i.layer==="control"||n===1?0:.6)+t*1.2,yaw:-(n-1)*.06}}function Wu(i){let e=Sn,t=i.filter(p=>p.kind==="step"),n=Math.min(Math.max(1,t.length),Math.max(1,Math.ceil(Math.sqrt(t.length*1.4)))),r=Math.max(1,Math.ceil(t.length/n)),s=new Map,a=[],o=new Map(t.map(p=>[p.stepId,{stage:p,calls:[],files:[]}])),l=[];for(let p of i){if(["engine","step"].includes(p.kind))continue;let g=o.get(p.stepId);if(!g){l.push(p);continue}(["artifact","delivery"].includes(p.kind)?g.files:g.calls).push(p)}let c=(p,g)=>s.set(p.id,{...g,slot:p.slot??i.indexOf(p)});t.forEach((p,g)=>{let v=Math.floor(g/n),m=v%2?n-1-g%n:g%n,d=n>1?m/(n-1):.5,_=Math.sin(d*Math.PI),M=(m-(n-1)/2)*e.stationGapX,y=(v-(r-1)/2)*e.stationGapZ+_*2.1,A=o.get(p.stepId),T=8+(r-1-v)*7.8+_*.7,b={id:p.stepId,index:g,title:p.title,x:M,z:y,row:v,column:m,width:e.deckWidth,depth:e.deckDepth,levels:1,stageY:T,callCount:p.callCount??A.calls.length,fileCount:p.artifactCount??A.files.length};a.push(b),c(p,{x:M,y:T,z:y,row:v,column:m,level:0,stationId:p.stepId,layer:"stage",yaw:(.5-d)*.14}),A.calls.forEach((S,F)=>{c(S,{...kl({x:M,y:T,z:y,layer:"stage"},F),row:v,column:m,level:0,stationId:p.stepId,layer:"activity"})}),A.files.forEach((S,F)=>{let L=Math.floor(F/3),N=F%3;c(S,{x:M+(N-1)*4.6,y:T+3.3+L*3,z:y-1.5,row:v,column:m,level:0,stationId:p.stepId,layer:"delivery",yaw:0})})});let h=a[0]||{x:0,z:0,stageY:8},f={x:h.x-7.7,y:h.stageY+2,z:h.z-2.5};for(let p of i.filter(g=>g.kind==="engine"))c(p,{...f,row:r,column:-1,level:0,stationId:null,layer:"control",yaw:.05});l.forEach((p,g)=>c(p,{...kl({...f,layer:"control"},g),row:r,column:-1,level:0,stationId:null,layer:"activity"}));for(let p of i.filter(g=>g.hero))c(p,{x:Math.max(...a.map(g=>g.x),0)-1.5,y:Math.max(...a.map(g=>g.stageY),8)+9.6,z:Math.max(...a.map(g=>g.z),0)+10,row:-1,column:-1,level:0,stationId:p.stepId,layer:"result",yaw:-.07});let u={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0,minZ:1/0,maxZ:-1/0};for(let p of i){let g=s.get(p.id),v=pd(p);if(!g)throw new Error("Spatial node has no actual owner position: "+p.id);u.minX=Math.min(u.minX,g.x-v.w/2-1),u.maxX=Math.max(u.maxX,g.x+v.w/2+1),u.minY=Math.min(u.minY,g.y-v.h/2-1),u.maxY=Math.max(u.maxY,g.y+v.h/2+1),u.minZ=Math.min(u.minZ,g.z-1),u.maxZ=Math.max(u.maxZ,g.z+1)}for(let p of a)u.minX=Math.min(u.minX,p.x-e.deckWidth/2-1),u.maxX=Math.max(u.maxX,p.x+e.deckWidth/2+1),u.minZ=Math.min(u.minZ,p.z-e.deckDepth/2-1),u.maxZ=Math.max(u.maxZ,p.z+e.deckDepth/2+1);return i.length||Object.assign(u,{minX:-10,maxX:10,minY:-3,maxY:10,minZ:-10,maxZ:10}),{positions:s,stations:a,columns:n,rows:r,bounds:u,mapBounds:{minX:u.minX,maxX:u.maxX,minY:u.minZ,maxY:u.maxZ},kind:"spatial",version:e.version}}function Xu(i){let e=[],t=i.filter(s=>s.kind==="step"),n=(s,a,o)=>{s&&a&&e.push({id:"space:"+s.id+">"+a.id,source:s.id,target:a.id,kind:o,active:a.active})},r=i.find(s=>s.kind==="engine");for(let s of t){n(r,s,"sequence"),r=s;for(let o of i.filter(l=>l.stepId===s.stepId&&["call","review"].includes(l.kind)))n(s,o,"child-action");let a=s;for(let o of i.filter(l=>l.stepId===s.stepId&&["artifact","delivery"].includes(l.kind)))n(a,o,"delivery"),a=o}r=i.find(s=>s.kind==="engine");for(let s of i.filter(a=>!a.stepId&&!["engine","step"].includes(a.kind)))n(r,s,"child-action");return e}function Yu(i,e,t="activity-order"){if(t==="child-action")return[{x:i.x,y:i.y-1.7,z:i.z},{x:i.x,y:i.y-2.7,z:e.z+1.6},{x:i.x,y:e.y+2,z:e.z+1.6},{x:e.x,y:e.y+1.3,z:e.z}];if(t==="sequence"){let r=Math.abs(i.y-e.y)<3,s=e.x>=i.x?1:-1,a=i.layer==="control"?2.4:4.1;return r?[{x:i.x+s*a,y:i.y-.2,z:i.z},{x:i.x+s*(a+1),y:i.y-.35,z:i.z-.6},{x:e.x-s*5.1,y:e.y-.35,z:e.z-.6},{x:e.x-s*4.1,y:e.y-.2,z:e.z}]:[{x:i.x+4.1,y:i.y-.3,z:i.z},{x:i.x+6.5,y:i.y-1.4,z:i.z+1.6},{x:e.x+6.5,y:e.y+1.4,z:e.z-1.6},{x:e.x+4.1,y:e.y+.3,z:e.z}]}if(t==="delivery"){let r=e.x-i.x,s=e.y-i.y,a=Math.hypot(r,s)||1,o=r/a,l=s/a,c=Math.min(3.95/Math.max(.001,Math.abs(o)),2.22/Math.max(.001,Math.abs(l))),h=Math.min((e.layer==="result"?5.9:1.95)/Math.max(.001,Math.abs(o)),(e.layer==="result"?3.28:1.25)/Math.max(.001,Math.abs(l))),f={x:i.x+o*c,y:i.y+l*c,z:i.z},u={x:e.x-o*h,y:e.y-l*h,z:e.z};return[f,{x:f.x+(u.x-f.x)*.3,y:f.y+(u.y-f.y)*.24,z:Math.min(i.z,e.z)-1.4},{x:u.x-(u.x-f.x)*.24,y:u.y-(u.y-f.y)*.2,z:u.z-2.2},u]}let n=e.x>=i.x?1:-1;return[{x:i.x+n*1.8,y:i.y-.65,z:i.z+.08},{x:i.x+n*2.8,y:i.y-.9,z:(i.z+e.z)/2+1.3},{x:e.x-n*2.8,y:e.y-.9,z:(i.z+e.z)/2+1.3},{x:e.x-n*1.8,y:e.y-.65,z:e.z+.08}]}var Wv=(i,e=360)=>typeof i=="string"?i.slice(0,e):"",qu={running:"执行中",succeeded:"已完成",failed:"失败",refused:"未执行",cancelled:"已停止",interrupted:"已中断",waiting:"后台处理中",unverified:"待确认",needs_revision:"需改进",deferred:"待后台任务",recorded:"已登记"},z1=Object.freeze({columns:10,gapX:5.6,gapY:5.05,top:1.8}),Zu={engine:"研究总览",step:"研究阶段",call:"执行动作",review:"目标核验",artifact:"交付文件",delivery:"文字交付"};function da(i){return pd(i)}function Xv(i){return Wu(i)}function Yv(i,e){let t=new Set(e),n=new Map((i||[]).filter(a=>typeof a.callId=="string"&&a.callId).map(a=>[a.callId,a])),r=new Map;function s(a,o=new Set){if(r.has(a))return r.get(a);let l=n.get(a);if(!l||o.has(a))return{stepId:null,source:"unassigned"};let c;if(l.stepId)c={stepId:t.has(l.stepId)?l.stepId:null,source:t.has(l.stepId)?"step-record":"unknown-step"};else if(l.rootCallId&&l.rootCallId!==a){let h=s(l.rootCallId,new Set([...o,a]));c={stepId:h.stepId,source:h.stepId?"root-call":"unassigned"}}else c={stepId:null,source:"unassigned"};return r.set(a,c),c}for(let a of n.keys())s(a);return r}function Qi(i,{scope:e="all",expandedStepId:t=null,recordPage:n=0,pinnedId:r=null,overview:s=!1}={}){let a=[],o=[],l=new Map,c=i?.nodes||[],h=new Map(c.map(G=>[G.id,G])),f=[],u=Yv(i?.activities||[],h.keys()),p=new Map,g=(G,re,Me,Ke,De={},et=!0)=>{if(l.has(G))return l.get(G);let Je={id:G,kind:re,title:Wv(Me,160),detail:Ke||"",stepId:null,origin:"runtime",status:"configured",active:!1,...De};return l.set(G,Je),et&&a.push(Je),Je},v=(G,re,Me)=>{G!==re&&l.has(G)&&l.has(re)&&o.push({id:G+">"+re,source:G,target:re,kind:Me,active:l.get(re).active})};c.length&&g("engine","engine",i.name||"METIS",i.headline||"",{status:i.phase,statusLabel:{ready:"待继续",processing:"处理中",running:"执行中",waiting:"待确认",attention:"需处理",stopped:"已停止",completed:"已交付"}[i.phase]||"",modeName:i.modeName,ports:[]});for(let G of c){let re="step:"+G.id,Me=[];if(e==="all")for(let De of G.skills||[])Me.push({kind:"skill",id:De.id,title:De.name||De.id});let Ke=g(re,"step",G.title,G.purpose||G.expected,{stepId:G.id,index:G.index,origin:"workflow",status:G.status,statusLabel:G.label,active:G.active,viewed:G.viewed,skills:G.skills,loop:G.loop,ports:Me,prohibitions:G.prohibitions,executionBrief:G.executionBrief});G.index===0?v("engine",re,"sequence"):v("step:"+c[G.index-1].id,re,"sequence");for(let De of G.artifacts||[]){if(!Number.isSafeInteger(De.index)||De.index<0)continue;let et=g("artifact:"+G.id+":"+De.index,"artifact",De.name,De.path,{stepId:G.id,origin:"delivery",status:"recorded",statusLabel:"已登记",availability:De.availability,fileIndex:De.index,file:De},!0);f.push(et),Me.push({kind:"artifact",id:et.id,title:De.name,availability:De.availability}),v(Ke.id,et.id,"delivery")}if(G.delivery?.text){let De=g("delivery:"+G.id,"delivery","文字交付",G.delivery.text,{stepId:G.id,origin:"delivery",status:"recorded",statusLabel:"已登记",at:G.delivery.at},!(G.artifacts||[]).length);(G.artifacts||[]).length||Me.push({kind:"delivery",id:De.id,title:"文字交付"})}}for(let[G,re]of(i?.activities||[]).entries()){if(typeof re.callId!="string"||!re.callId||l.has("call:"+re.callId))continue;let Me=u.get(re.callId),Ke=Me?.stepId||null,De=h.get(Ke),et=re.kind==="review"?"review":"call",Je=p.get(Ke)||0;p.set(Ke,Je+1),g("call:"+re.callId,et,re.label||re.tool||"执行动作",re.target||re.label||"",{stepId:Ke,ownerSource:Me?.source||"unassigned",ownerTitle:De?.title||"项目整体",ownerIndex:De?.index??null,childIndex:Je,origin:"activity",status:re.status,statusLabel:qu[re.status]||re.status,active:re.status==="running"&&re.invoked!==!1,activityIndex:G,callId:re.callId,call:re,tool:re.tool,at:re.startedAt||re.finishedAt||null,ports:[]})}for(let G of i?.activities||[]){let re="call:"+G.callId,Me="call:"+G.rootCallId;if(!l.has(re))continue;let Ke=l.get(re);v(Me!==re&&l.has(Me)&&l.get(Me).stepId===Ke.stepId?Me:Ke.stepId?"step:"+Ke.stepId:"engine",re,"execution");for(let De of f)De.detail===G.target&&v(re,De.id,"reference")}for(let G of c){let re=Date.parse(G.delivery?.at);if(!Number.isFinite(re))continue;let Me=(i.activities||[]).findLast(Ke=>Ke.stepId===G.id&&Ke.kind==="delivery"&&Ke.status==="succeeded"&&Date.parse(Ke.startedAt)<=re&&Date.parse(Ke.finishedAt)>=re);if(Me){let Ke=l.get("call:"+Me.callId);Ke&&(Ke.ports=(l.get("step:"+G.id)?.ports||[]).filter(De=>De.kind!=="skill"))}}a.forEach((G,re)=>{G.slot=re,G.statusLabel??=qu[G.status]||G.status||""});let m=(i?.activities||[]).findLast(G=>G.status==="running"&&G.invoked!==!1),d=(i?.activities||[]).findLast(G=>G.status==="waiting"&&G.jobId&&G.invoked!==!1),_=h.get(i?.currentStepId),M=i?.phase==="processing"&&_?.status!=="submitted",y=(i?.activities||[]).findLast(G=>u.get(G.callId)?.stepId===i?.currentStepId),A=i?.live?.active,T=A?.stepId?h.get(A.stepId):null,b=A?.kind==="model"&&T?(i.activities||[]).findLast(G=>u.get(G.callId)?.stepId===T.id):null,S=m?"call:"+m.callId:d?"call:"+d.callId:M?A?.kind==="model"?b?"call:"+b.callId:T?"step:"+T.id:"engine":y?"call:"+y.callId:"step:"+_?.id:null,F=a,L=l.get(S),N=h.has(t)?t:null,q=t==="__project__",te=!s&&!!(N||q||S||r),D=q?null:N||L?.stepId||l.get(r)?.stepId||null,K=F.filter(G=>G.origin==="activity"&&G.stepId===D),$=Math.max(1,Math.ceil(K.length/Sn.visibleCalls)),B=Math.max(0,Math.min($-1,Math.trunc(Number(n)||0))),pe=Math.max(0,K.length-B*Sn.visibleCalls),W=Math.max(0,pe-Sn.visibleCalls),se=te?K.slice(W,pe):[],Y=l.get(r||S);te&&B===0&&Y?.origin==="activity"&&Y.stepId===D&&!se.includes(Y)&&(se.length>=Sn.visibleCalls&&se.shift(),se.push(Y));for(let G of F.filter(re=>re.kind==="step")){let re=F.filter(Me=>Me.origin==="activity"&&Me.stepId===G.stepId);G.childIds=re.map(Me=>Me.id),G.recentStatuses=re.slice(-6).map(Me=>({id:Me.id,status:Me.status})),G.callCount=re.length,G.artifactCount=f.filter(Me=>Me.stepId===G.stepId).length,G.active=!!G.active||re.some(Me=>Me.active)}let ke=Hu(i,F);ke&&(ke.hero=!0);let Ue=F.filter(G=>["engine","step"].includes(G.kind)||se.includes(G)||!te&&G===ke);Ue.forEach((G,re)=>G.displaySlot=re);let Q=Xv(Ue),Le=Xu(Ue),fe={expanded:te,stageId:D,page:B,pages:$,totalCalls:K.length,start:te&&K.length?W+1:0,end:te?pe:0,key:[te?"stage":"overview",D||"",B,se.map(G=>G.id).join(",")].join("|")};return{nodes:Ue,fullNodes:F,edges:o,circuitEdges:Le,byId:l,positions:Q.positions,bounds:Q.bounds,mapBounds:Q.mapBounds,stations:Q.stations,presentation:fe,artMode:Vu(i,{presentation:fe,activeId:S}),heroId:te?null:ke?.id||null,layout:{columns:Q.columns,rows:Q.rows,kind:Q.kind,version:Q.version},scope:e,phase:i?.phase,activeId:S,latestId:m?"call:"+m.callId:(i?.activities||[]).length?"call:"+i.activities.at(-1).callId:_?"step:"+_.id:a[0]?.id||null,counts:{entities:F.length,visible:Ue.length,stages:c.length,bindings:e==="all"?c.reduce((G,re)=>G+(re.skills?.length||0),0):0,calls:F.filter(G=>G.origin==="activity").length,materials:(i?.activities||[]).filter(G=>G.kind==="read"&&G.target).length,artifacts:f.length}}}function Ku(i,e={x:1,y:0},t=!1){if(t||i>=1e3)return{x:0,y:0,opacity:1,scale:1,pulse:0,progress:1,moving:!1};if(i<0)return{x:0,y:0,opacity:0,scale:1,pulse:0,progress:0,moving:!0};let n=Math.min(1,i/360),r=Math.max(0,(i-360)/1e3),s=i<360?-.2*(1-n):.28*Math.exp(-9*r)*Math.sin(19*r);return{x:e.x*s,y:e.y*s,opacity:Math.max(0,Math.min(1,(i-240)/210)),scale:i<360?.945+.035*n:1-.018*Math.exp(-9*r)*Math.cos(19*r),pulse:i<360?Math.sin(Math.PI*n*.5):Math.exp(-(i-360)/180),progress:n,moving:!0}}function fd(i,e,t={w:6.6,h:2.8}){let n=Math.tan(17.5*Math.PI/180),r=Math.max(.25,i/Math.max(1,e));return Math.max(16.5,t.w/(2*n*r*.74),t.h/(2*n*.28))}var Ul=class{constructor(){this.reset("")}reset(e){this.key=e,this.lines=[],this.sequence=0,this.seen=0,this.position=0,this.lastTime=0,this.revision=0,this.source=null}append(e,t){if(!["stdout","stderr","log","assistant","receipt","status"].includes(t)||typeof e!="string"||!e)return;let n=this.lines.at(-1);n&&n.source!==t&&(n.closed=!0);for(let r of e.replace(/\r\n/g,`
`).replace(/\r/g,`
`)){if(n=this.lines.at(-1),(!n||n.closed)&&(n={id:++this.sequence,text:"",source:t,cells:0,closed:!1},this.lines.push(n)),r===`
`){n.closed=!0;continue}let s=r.codePointAt(0)>255?2:1;n.cells+s>42&&(n.closed=!0,n={id:++this.sequence,text:"",source:t,cells:0,closed:!1},this.lines.push(n)),n.text+=r,n.cells+=s}for(;this.lines.length>160;)this.lines.shift(),this.position=Math.max(0,this.position-1);this.source=t,this.revision++}ingest(e,t){if(!e||!t)return!1;let n=e.instanceId+"|"+t.key;this.key!==n&&this.reset(n);let r=!1;for(let s of e.entries||[])s.seq>this.seen&&t.matches(s)&&(this.append(s.text,s.source),r=!0);return this.seen=Math.max(this.seen,e.lastSeq||0),r}frame(e,t=!1){let n=this.lines.length,r=this.lastTime?Math.min(.1,Math.max(0,(e-this.lastTime)/1e3)):1/60;this.lastTime=e;let s=Math.max(0,n-this.position),a=32+Math.min(128,s*12);return this.position=t?n:Math.min(n,this.position+a*r),{rows:this.lines,position:this.position,moving:!t&&this.position<n-.001,revision:this.revision,source:this.source,totalLines:this.sequence}}};function Ju(i,e){if(!i)return null;let t=i.stepId||e?.active?.stepId;if(t)return{key:"step:"+t,matches:s=>s.stepId===t};let n=e?.active;if(!n)return null;if(n.kind==="model")return{key:"model:"+n.attemptId,matches:s=>s.attemptId===n.attemptId};let r=n.rootCallId||n.callId;return{key:"tool:"+r,matches:s=>s.callId===n.callId||s.rootCallId===r}}var ha=i=>typeof i=="string"?i.replace(/\s+/g," ").trim():"";function ju(i){if(i.call?.error)return ha(i.call.error);if(i.call?.feedback?.length)return ha(i.call.feedback[0]);let e=ha(i.detail);return["read","write"].includes(i.call?.kind)&&/[\\/]/.test(e)&&!/^https?:\/\//i.test(e)&&e.split(/[\\/]/).filter(Boolean).at(-1)||e}function $u(i,e){let t=i?.byId.get(i.activeId);if(!t)return null;let n=e?.nodes?.find(c=>c.id===t.stepId);if(n?.status==="submitted")return null;let r=e?.live?.active;if(r?.kind==="model"&&e?.phase==="processing")return{nodeId:t.id,stepId:r.stepId,title:r.state==="thinking"?"模型分析中":r.state==="text"?"公开文字输出中":"模型响应中",status:"processing",lines:[],key:"model:"+r.attemptId+"|"+r.state};let s=t.call;if(s?.invoked===!1||["failed","refused","cancelled","interrupted","unverified"].includes(s?.status)||!s&&e?.phase!=="processing")return null;let a=s?.status==="running",o=s?.status==="waiting";if(s&&!a&&!o&&e?.phase!=="processing")return null;let l=[];return s?.tool&&l.push(s.tool),s?.target&&l.push(ha(s.target).slice(0,240)),s?.resultPreview&&l.push(s.resultPreview.slice(-4e3)),!a&&!o&&s?.feedback?.length&&l.push(ha(s.feedback[0]).slice(0,240)),!l.length&&n?.title&&l.push(n.title),{nodeId:t.id,stepId:t.stepId,title:o?"等待后台回执":a?s.label||"执行中":"研究助手执行中",status:o?"waiting":a?"running":"processing",lines:l,key:[t.id,s?.status||e?.phase,...l].join("|")}}var Fl={press:145,hover:240,reveal:620,camera:880,idleFrame:50,activeFrame:25};function Ol(i){let e=Math.max(0,Math.min(1,i));return e*e*e*(e*(e*6-15)+10)}function Qu(i){return["running","processing"].includes(i?.phase)||i?.activeCalls?.length?1:["waiting","attention"].includes(i?.phase)?.35:.08}function Bl(i,e,t){return{x:Math.max(-1,Math.min(1,(i-t.left)/Math.max(1,t.width)*2-1)),y:Math.max(-1,Math.min(1,(e-t.top)/Math.max(1,t.height)*2-1))}}function ep(i,e,t=!1){return t?{x:0,y:0,rx:0,ry:0,lift:0}:{x:i*1.4,y:e*.7,rx:-e*2.1,ry:i*2.8,lift:3}}function tp(i,e){return!i||i===e?null:["submitted","succeeded","passed","completed"].includes(e)?"complete":["failed","blocked","refused","needs_revision"].includes(e)?"attention":["running","working","checking","processing"].includes(e)?"engage":"change"}function Wr(i,e,t=!1){if(t)return{x:0,y:0,z:0,rx:0,ry:0};let n=e*2.3999632297;return{x:Math.sin(i*.54+n)*.038,y:Math.sin(i*.96+n)*.115,z:.04+Math.cos(i*.72+n)*.025,rx:Math.sin(i*.52+n)*.004,ry:Math.cos(i*.67+n)*.009}}var qv=["varying float vWireT;","uniform vec3 uStartOffset;","uniform vec3 uEndOffset;","void main(){","vWireT=uv.x;","vec3 p=position+mix(uStartOffset,uEndOffset,smoothstep(0.,1.,uv.x));","gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);","}"].join(`
`),Zv=["precision highp float;","varying float vWireT;","uniform vec3 uColor;","uniform float uHead;","uniform float uReveal;","uniform float uGain;","uniform float uMotion;","uniform float uRepeats;","uniform float uLayer;","void main(){","if(vWireT>uReveal)discard;","float lag=fract((uHead-vWireT)*uRepeats);","float d=abs(fract((vWireT-uHead)*uRepeats+.5)-.5);","float head=exp(-d*d*1550.);","float trail=(1.-smoothstep(0.,.20,lag))*.38;","float signal=(head+trail)*uMotion;","float alpha=clamp((.10+uGain*signal)*uLayer,0.,.96);","gl_FragColor=vec4(uColor*(.7+head*uMotion*1.6),alpha);","}"].join(`
`);function md(i,e){return new It({uniforms:{...i,uLayer:{value:e}},vertexShader:qv,fragmentShader:Zv,transparent:!0,depthWrite:!1,depthTest:!0,blending:nn,toneMapped:!1})}var ua=i=>["failed","refused","blocked","needs_revision"].includes(i.status)?15702915:i.active?16761468:i.hero?10736833:i.kind==="review"?13215175:i.status==="submitted"?11061679:i.kind==="engine"?14921079:12289372;function np(i,e){let t=new Cr,n=.17;return t.moveTo(-i/2+n,-e/2),t.lineTo(i/2,-e/2),t.lineTo(i/2,e/2-n),t.lineTo(i/2-n,e/2),t.lineTo(-i/2,e/2),t.lineTo(-i/2,-e/2+n),t.closePath(),t}function zl(i){i.traverse(e=>{e.isInstancedMesh&&e.dispose(),e.isSprite||e.geometry?.dispose();for(let t of Array.isArray(e.material)?e.material:[e.material])t?.dispose()}),i.clear()}var _t=(i,e,t)=>{let n=document.createElement(i);return n.className=e,t?.appendChild(n),n};function ip({board:i,texture:e,host:t,onEntity:n,onPick:r,onFocusChat:s,requestFrame:a}){let o=new Tt,l=new Tt,c=new Tt,h=new Tt,f=new Tt,u=new Tt,p=new Tt,g=[];o.add(c,h,f,u),i.add(o,l,p);let v=new Map,m=new Map,d=null,_=null,M=null,y=null,A="",T=!1,b=!1,S=0,F=!0,L=_t("aside","in-liveWindow",t);L.hidden=!0,L.setAttribute("role","status"),L.setAttribute("aria-live","polite");let N=_t("div","in-liveHead",L),q=_t("i","in-liveDot",N),te=_t("strong","",N),D=_t("span","in-liveCode",N);D.textContent="LIVE / STREAM",L.setAttribute("aria-live","off");let K=_t("div","in-liveBody",L),$=_t("div","in-liveTape",K);_t("span","in-liveScan",L).setAttribute("aria-hidden","true");let pe=new Ul,W="",se=null,Y=0,ke="",Ue=null,Q=new WeakMap;function Le(k,ue,C){let ve=Q.get(k);(!ve||ve.key!==pe.key)&&(k.replaceChildren(),ve={key:pe.key,rows:new Map,last:0},Q.set(k,ve));let Ne=new Set(pe.lines.map(Re=>Re.id));for(let[Re,he]of ve.rows)Ne.has(Re)||(he.remove(),ve.rows.delete(Re));for(let Re of pe.lines){let he=ve.rows.get(Re.id);he?he.parentNode!==k&&k.appendChild(he):(he=_t(ue==="in-streamLine"?"p":"span",ue,k),he.dataset.fresh=String(C&&Re.id>ve.last),ve.rows.set(Re.id,he)),he.dataset.source=Re.source,he.dataset.signal=/^METIS_ENVIRONMENT=/.test(Re.text)?"environment":/^Successfully installed|^No broken requirements found\./.test(Re.text)?"complete":"",he.textContent!==Re.text&&(he.textContent=Re.text)}ve.last=pe.lines.at(-1)?.id||ve.last}let fe=new R,G=new R,re=new R;function Me(k,ue,C){let ve=da(k),Ne=new Tt,Re=np(ve.w,ve.h),he=new Us({color:1319731,metalness:.26,roughness:.32,clearcoat:.9,clearcoatRoughness:.18,emissive:463390,emissiveIntensity:.18}),ae=new yn({color:8807751,metalness:.82,roughness:.29,emissive:2102796,emissiveIntensity:.15}),Te=new bt(new Ir(np(ve.w+.34,ve.h+.26),{depth:.19,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.07,bevelThickness:.04}),new yn({color:1581873,metalness:.82,roughness:.36}));Te.position.z=-ve.depth/2-.29,Ne.add(Te);let We=new Dn(new si(Te.geometry,35),new un({color:7508895,transparent:!0,opacity:.32,fog:!1}));We.position.copy(Te.position),Ne.add(We);let E=new bt(new Ir(Re,{depth:ve.depth,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.045,bevelThickness:.04}),[he,ae]);E.position.z=-ve.depth/2,Ne.add(E);let x=new Dn(new si(E.geometry,35),new un({color:ua(k),transparent:!0,opacity:.66,fog:!1}));x.position.z=-ve.depth/2,Ne.add(x);let I=[];for(let ze=0;ze<7;ze++)for(let Et of[-1,1]){let rn=(ze-3)*.29;I.push(new R(Et*(ve.w/2+.02),rn,-.03),new R(Et*(ve.w/2+.18),rn,-.03))}Ne.add(new Dn(new Mt().setFromPoints(I),new un({color:11038537,transparent:!0,opacity:.42,fog:!1})));let oe=new ys(new pn(.17,.22,.16),new yn({color:10318924,metalness:.8,roughness:.3}),8),ie=new dt,_e=0;for(let ze of[-1,1])for(let Et of[-.88,-.57,.57,.88])ie.makeTranslation(ze*(ve.w/2+.14),Et,-ve.depth/2-.08),oe.setMatrixAt(_e++,ie);Ne.add(oe);let ye=new zn(new Ln({map:e,color:ua(k),transparent:!0,opacity:.04,depthWrite:!1,blending:nn}));ye.scale.set(ve.w*1.15,ve.h*1.55,1),ye.position.z=-.16,Ne.add(ye),c.add(Ne);let J=_t("div","in-cardWrap"),X=_t("button","in-entity"+(k.kind==="step"?" ion-chip":""),J);X.type="button",X.dataset.networkEntity=k.id,X.dataset.kind=k.kind,J.style.width=X.style.width="340px",J.style.height=X.style.height="200px",k.kind==="step"&&(X.dataset.sceneStep=k.stepId);let Ae=_t("span","in-labelBody",X),P=_t("span","in-nodeHead",Ae),le=_t("span","",P),ne=_t("span","",P),Ee=_t("strong","",Ae),Se=_t("span","in-nodeDetail",Ae),Pe=_t("span","in-nodeFoot",Ae),V=_t("span","in-cardCircuit",Ae);V.setAttribute("aria-hidden","true");for(let ze=0;ze<4;ze++)_t("i","",V);let H=_t("span","in-detailStatic",Se),Z=_t("span","in-cardTicker",Se),ge=_t("span","in-moduleHistory",Ae),O=_t("span","in-resultSeal",Ae);ge.setAttribute("aria-hidden","true"),O.setAttribute("aria-hidden","true");let z=_t("div","in-cardPorts",J);z.setAttribute("role","group"),z.setAttribute("aria-label","阶段技能与真实交付");let ce=ze=>ze.stopPropagation();z.addEventListener("pointerdown",ce);let He=null;X.onpointerdown=ze=>{ze.stopPropagation(),He=ze.button===0?{x:ze.clientX,y:ze.clientY,moved:!1}:null,He&&X.setPointerCapture(ze.pointerId)},X.onpointermove=ze=>{He&&Math.hypot(ze.clientX-He.x,ze.clientY-He.y)>8&&(He.moved=!0)},X.onpointerup=ze=>{X.hasPointerCapture(ze.pointerId)&&X.releasePointerCapture(ze.pointerId)},X.onpointercancel=()=>{He=null},X.onclick=ze=>{if(ze.detail&&He?.moved){ze.preventDefault();return}y=k.id,a(),n?n(k.id):k.stepId?r?.(k.stepId):s?.()};let rt=()=>{let ze=v.get(k.id);ze&&!ze.frozenPose&&(ze.frozenPose={...ze.lastIdlePose||Wr(0,k.slot,!0)}),M=k.id,a()},Be=()=>{if(J.matches(":hover,:focus-within"))return;let ze=v.get(k.id);ze&&(ze.frozenPose=null),M===k.id&&(M=null),a()};J.onpointerenter=rt,J.onpointerleave=Be,J.onfocusin=rt,J.onfocusout=Be,J.style.backfaceVisibility="hidden";let lt=new fi(J);return lt.scale.set(ve.w/340,ve.h/200,1),l.add(lt),{node:k,size:ve,front:new R(0,0,ve.depth/2+.075),group:Ne,solid:E,edge:x,glow:ye,label:lt,wrapper:J,element:X,kind:le,status:ne,title:Ee,detail:Se,detailStatic:H,cardTape:Z,history:ge,seal:O,historyKey:"",foot:Pe,ports:z,born:ue,direction:C,portKey:"",position:new R,onScreen:!0,signal:null,signalAt:0,origin:null,layoutAt:0,yaw:0,frozenPose:null,lastIdlePose:null}}function Ke(k){let ue=k.node,C=ue.ports||[],ve=JSON.stringify(C);if(ve===k.portKey)return;k.portKey=ve,k.ports.replaceChildren();let Ne=[...C.filter(Re=>Re.kind!=="skill").slice(0,2),...C.filter(Re=>Re.kind==="skill").slice(0,2)].slice(0,3);for(let Re of Ne){let he=_t("button","in-port in-port-"+Re.kind,k.ports);he.type="button",he.textContent=Re.title,he.title=Re.kind==="artifact"?Re.title+" · "+(Re.availability==="file"?"打开已登记文件":"文件暂不可预览"):Re.title,he.disabled=Re.kind==="artifact"&&Re.availability!=="file",he.setAttribute("aria-label",Re.kind==="artifact"?"打开 "+Re.title:Re.kind==="delivery"?"查看文字交付":"查看技能 "+Re.title),Re.kind==="artifact"&&(he.dataset.artifactId=Re.id),he.onpointerdown=ae=>{ae.stopPropagation(),ae.button===0&&he.setPointerCapture(ae.pointerId)},he.onpointerup=ae=>{he.hasPointerCapture(ae.pointerId)&&he.releasePointerCapture(ae.pointerId)},he.onclick=ae=>{ae.stopPropagation(),Re.kind==="skill"?n?n("step:"+ue.stepId):r?.(ue.stepId):n?.(Re.id)}}if(C.length>Ne.length){let Re=_t("button","in-port in-port-more",k.ports);Re.type="button",Re.textContent="+"+(C.length-Ne.length),Re.setAttribute("aria-label","查看本阶段全部技能与交付"),Re.onclick=()=>n?.("step:"+ue.stepId)}if(!C.length){let Re=_t("span","in-portMeta",k.ports);Re.textContent=ue.hero?"打开最终交付":ue.call?.tool||ue.kind==="engine"?"":ue.kind==="step"?"阶段设置与交付":ue.kind==="artifact"?"已登记文件":"实际执行记录",ue.call?.tool&&(Re.textContent=ue.call.tool)}}function De(k){let ue=d.positions.get(k.source),C=d.positions.get(k.target),ve=Yu(ue,C,k.kind).map(ie=>new R(ie.x,ie.y,ie.z)),Ne=new ai(ve,!1,"centripetal"),Re={uColor:{value:new Qe(xn.ice)},uHead:{value:0},uReveal:{value:0},uGain:{value:.2},uMotion:{value:1},uRepeats:{value:1},uStartOffset:{value:new R},uEndOffset:{value:new R}},he=Ne.getSpacedPoints(48),ae=new Mt().setFromPoints(he);ae.setAttribute("uv",new xt(he.flatMap((ie,_e)=>[_e/(he.length-1),0]),2));let Te=new Ei(ae,md(Re,.42)),We=k.kind==="sequence",E=new bt(new oi(Ne,48,We?.035:.025,5,!1),md(Re,1)),x=new bt(new oi(Ne,48,We?.075:.05,4,!1),md(Re,.15)),I=new zn(new Ln({map:e,color:16764817,transparent:!0,depthWrite:!1,blending:nn}));I.scale.setScalar(.8),I.visible=!1;let oe=new Wi(new Mt().setAttribute("position",new xt(new Float32Array(36),3)),new Ti({color:16762251,size:.045,transparent:!0,opacity:.85,depthWrite:!1,blending:nn,fog:!1}));return oe.visible=!1,h.add(x,E,Te,I,oe),{edge:k,curve:Ne,line:Te,conduit:E,halo:x,runner:I,tail:oe,shared:Re,length:Ne.getLength(),index:m.size,signature:JSON.stringify([ue,C,k.kind])}}function et(k){for(let ue of[k.line,k.conduit,k.halo,k.runner,k.tail])h.remove(ue),ue.isSprite||ue.geometry?.dispose(),ue.material.dispose()}function Je(k,ue,C){k.curve.getPointAt(Math.max(0,Math.min(1,ue)),C);let ve=Wn.smoothstep(ue,0,1);return C.addScaledVector(k.shared.uStartOffset.value,1-ve).addScaledVector(k.shared.uEndOffset.value,ve),C}let me=[];function Ce(){zl(f),zl(u),me=[];for(let ue of g)ue.remove();g.length=0,p.clear();let k=[];for(let ue of d.stations||[]){let C=ue.stageY-2.75,ve=new bt(new pn(ue.width+.25,.12,.48),new yn({color:2438983,metalness:.78,roughness:.36}));ve.position.set(ue.x,C,ue.z-.4),f.add(ve);let Ne=new Dn(new si(ve.geometry),new un({color:10124646,transparent:!0,opacity:.14}));Ne.position.copy(ve.position),f.add(Ne);for(let Re of[-ue.width/2,ue.width/2])k.push(new R(ue.x+Re,C,ue.z-.3),new R(ue.x+Re,C+.5,ue.z-.3))}f.add(new Dn(new Mt().setFromPoints(k),new un({color:10583399,transparent:!0,opacity:.21,fog:!1})));for(let ue=0;ue<10;ue++){let C=new zn(new Ln({map:e,color:15378539,transparent:!0,opacity:0,depthWrite:!1,blending:nn}));C.scale.setScalar(.65),u.add(C),me.push(C)}}function xe(k,ue){if(b)return;d=k,_=ue||_,t.dataset.artDirection=xn.version,t.dataset.sceneMode=d.artMode,t.dataset.resultHero=d.heroId||"",t.dataset.chassisLayers="2",t.dataset.networkNodes=String(d.nodes.length),t.dataset.networkRecords=String(d.counts.entities),t.dataset.networkCalls=String(d.counts.calls),t.dataset.networkLayout=Sn.version,t.dataset.networkView=d.presentation.expanded?"stage":"overview",t.dataset.networkColumns=String(d.layout.columns),t.dataset.networkRows=String(d.layout.rows),t.dataset.networkDepth=(d.bounds.maxZ-d.bounds.minZ).toFixed(2);let C=new Set(d.nodes.map(ae=>ae.id));for(let[ae,Te]of v)C.has(ae)||(Te.wrapper.remove(),l.remove(Te.label),c.remove(Te.group),zl(Te.group),v.delete(ae));let ve=0;for(let ae of d.nodes){let Te=d.positions.get(ae.id),We=d.nodes[ae.displaySlot-1],E=We&&d.positions.get(We.id),x=E?{x:Math.sign(Te.x-E.x),y:Math.sign(Te.y-E.y)}:{x:1,y:0},I=v.get(ae.id);if(I){let ye=tp(I.node.status,ae.status);ye&&(I.signal=ye,I.signalAt=performance.now(),I.element.dataset.signal=ye,S=Math.max(S,I.signalAt+1150)),I.position.distanceToSquared(new R(Te.x,Te.y,Te.z))>.001&&(I.origin=I.group.position.clone(),I.layoutAt=performance.now(),S=Math.max(S,I.layoutAt+620))}else{let ye=performance.now()+(T?Math.min(ve++,8)*32:Math.min(ae.slot,22)*20);I=Me(ae,ye,x),v.set(ae.id,I),S=Math.max(S,ye+1e3)}I.node=ae,I.position.set(Te.x,Te.y,Te.z),I.yaw=Te.yaw||0,I.group.position.copy(I.position),I.label.position.copy(I.position).add(I.front),I.wrapper.dataset.spaceX=String(Te.x),I.wrapper.dataset.spaceY=String(Te.y),I.wrapper.dataset.spaceZ=String(Te.z),I.element.dataset.spaceLayer=Te.layer,I.element.dataset.spaceLevel=String(Te.level),I.element.dataset.parentStepId=ae.stepId||"",I.element.dataset.parentStepTitle=ae.ownerTitle||"",I.element.dataset.childIndex=ae.childIndex===void 0?"":String(ae.childIndex+1),I.element.dataset.ownerSource=ae.ownerSource||"",I.element.style.setProperty("--in-node","#"+new Qe(ua(ae)).getHexString()),I.element.dataset.status=ae.status,I.element.dataset.active=String(ae.active),I.element.dataset.viewed=String(!!ae.viewed),I.element.dataset.hero=String(!!ae.hero),I.element.dataset.stageNumber=ae.kind==="step"?String(ae.index+1).padStart(2,"0"):"";let oe=JSON.stringify(ae.recentStatuses||[]);if(oe!==I.historyKey){I.historyKey=oe,I.history.replaceChildren();for(let ye of ae.recentStatuses||[]){let J=_t("i","",I.history);J.dataset.status=ye.status}}I.seal.textContent=ae.hero?ae.kind==="artifact"?ae.title.split(".").at(-1).toUpperCase():"TEXT":"",I.element.style.setProperty("--ion-ambient-delay",(-ae.slot*.39).toFixed(2)+"s"),I.wrapper.dataset.slot=String(Te.slot),I.wrapper.dataset.row=String(Te.row),I.wrapper.dataset.column=String(Te.column),I.element.setAttribute("aria-label",(ae.kind==="step"?"第"+(ae.index+1)+"步 ":ae.kind==="engine"?"项目总览 ":"实际动作 ")+ae.title+" · "+ae.statusLabel);let ie=ae.ownerIndex===null?"项目整体":String(ae.ownerIndex+1).padStart(2,"0")+"."+String((ae.childIndex||0)+1).padStart(2,"0");I.kind.textContent=ae.hero?"FINAL / 最终交付":ae.kind==="step"?String(ae.index+1).padStart(2,"0")+" / 编排大步骤":ae.kind==="engine"?"METIS / CONTROL":["artifact","delivery"].includes(ae.kind)?"FILE / 交付成果":ie+" / "+(ae.kind==="review"?"核验子动作":"执行子动作"),I.status.textContent=ae.statusLabel,I.title.textContent=ae.title,I.detailStatic.textContent=ae.hero&&ae.kind==="artifact"?(Number.isFinite(ae.file?.bytes)?(ae.file.bytes/1024).toFixed(1)+" KB · ":"")+"点击打开交付文档":ju(ae);let _e=d.byId.get("step:"+ae.stepId);I.foot.textContent=ae.kind==="step"?ae.callCount+" 个子动作 · "+ae.artifactCount+" 项登记成果":ae.kind==="engine"?d.counts.stages+" 个大步骤 / "+d.counts.calls+" 次实际调用":_e?"所属 · 第"+(_e.index+1)+"步 "+_e.title:"所属 · 项目整体（未记录具体步骤）",I.foot.title=I.foot.textContent,I.solid.material[0].color.setHex(ae.active?4535595:ae.hero?1522491:ae.kind==="step"?1582901:["artifact","delivery"].includes(ae.kind)?1781804:1320245),I.edge.material.color.setHex(ua(ae)),I.glow.material.color.setHex(ua(ae)),Ke(I)}let Ne=new Set(d.circuitEdges.map(ae=>ae.id));for(let[ae,Te]of m)Ne.has(ae)||(et(Te),m.delete(ae));for(let ae of d.circuitEdges){let Te=m.get(ae.id),We=JSON.stringify([d.positions.get(ae.source),d.positions.get(ae.target),ae.kind]);Te&&Te.signature!==We&&(et(Te),m.delete(ae.id)),m.has(ae.id)?m.get(ae.id).edge=ae:m.set(ae.id,De(ae))}let Re=JSON.stringify([d.presentation.expanded,d.presentation.stageId,(d.stations||[]).map(ae=>[ae.id,ae.x,ae.z,ae.stageY])]);Re!==A&&(A=Re,Ce());let he=$u(d,_);if(he){se=he.nodeId,Y=0,L.dataset.closing="false",L.hidden=!F,L.dataset.state=he.status;let ae=d.byId.get("step:"+d.byId.get(he.nodeId)?.stepId);te.textContent=(ae?"第"+(ae.index+1)+"步 · "+ae.title+" / ":"项目整体 / ")+he.title,te.title=te.textContent,L.dataset.parentStepId=ae?.stepId||"",t.dataset.liveWindow=String(F);let Te=Ju(he,_?.live);if(Te&&_?.live)pe.ingest(_.live,Te);else if(!_?.live&&he.key!==W){pe.key!=="summary:"+he.nodeId&&pe.reset("summary:"+he.nodeId);for(let E of he.lines)pe.append(E+`
`,"status")}if(W=he.key,D.textContent={stdout:"STDOUT / LIVE",stderr:"STDERR / LIVE",log:"CONSOLE / LIVE",assistant:"MODEL / PUBLIC",receipt:"TOOL / OUTPUT"}[pe.source]||"LIVE / STATUS",Ue!==se){let E=v.get(Ue);E&&(E.element.dataset.streaming="false",E.cardTape.replaceChildren()),Ue=se,ke=""}let We=pe.key+"|"+pe.revision+"|"+se;if(We!==ke){let E=!!ke;ke=We;let x=v.get(se);Le($,"in-streamLine",E),x&&Le(x.cardTape,"in-cardStreamLine",E),L.dataset.update=String(Number(L.dataset.update||0)+1),S=Math.max(S,performance.now()+700)}}else se&&(Y=performance.now()+180,S=Math.max(S,Y),L.dataset.closing="true"),se=null,W="",t.dataset.liveWindow="false";t.dataset.matrixAdditions=String(ve),T=!0}function Ie(k,ue){return G.copy(k),i.localToWorld(G),G.project(ue),G.z>-1&&G.z<1&&Math.abs(G.x)<1.3&&Math.abs(G.y)<1.35}function be(k,ue,C){if(!d||b)return!1;t.dataset.reducedMotion=String(ue);let ve=performance.now(),Ne=!!d.activeId,Re=_?.phase==="processing"?_.live?.active?.stepId||_.currentStepId:null;for(let x of v.values()){let I=Ku(ve-x.born,x.direction,ue),oe=x.position,ie=ue?1:Ol((ve-x.layoutAt)/620),_e=x.origin?Wn.lerp(x.origin.x,oe.x,ie):oe.x,ye=x.origin?Wn.lerp(x.origin.y,oe.y,ie):oe.y,J=x.origin?Wn.lerp(x.origin.z,oe.z,ie):oe.z;ie===1&&(x.origin=null);let X=ue?Wr(k,x.node.slot,!0):x.frozenPose||Wr(k,x.node.slot);x.lastIdlePose=X;let Ae=Gu(ve-x.signalAt,x.signal,ue),P=I.scale*Ae.scale;x.group.position.set(_e+I.x+X.x,ye+I.y+X.y,J+X.z+Ae.lift),x.group.rotation.set(X.rx,x.yaw+X.ry,0),x.group.scale.set(P,P,1),x.label.position.copy(x.front).applyQuaternion(x.group.quaternion).add(x.group.position),x.label.rotation.copy(x.group.rotation),x.label.scale.set(x.size.w/340*P,x.size.h/200*P,1),x.signal&&ve-x.signalAt>1150&&(x.signal=null,delete x.element.dataset.signal);let le=d.presentation.expanded&&["step","engine"].includes(x.node.kind)&&(x.node.kind==="engine"?!!d.presentation.stageId:x.node.stepId!==d.presentation.stageId),ne=Ne&&x.node.origin==="activity"&&x.node.id!==d.activeId,Ee=Ie(oe,C);x.onScreen=Ee,x.group.visible=Ee,x.label.visible=Ee,x.wrapper.style.opacity=String(I.opacity*(le?.24:ne?.64:1)),x.wrapper.dataset.contextHidden="false",x.wrapper.dataset.contextDim=String(le),x.element.dataset.lod=le?"context":"detail",x.element.dataset.arriving=String(I.moving),x.element.dataset.impact=String(I.pulse>.1);let Se=x.node.id===M||x.node.id===y||x.node.viewed;x.element.dataset.streaming=String(x.node.id===se&&pe.lines.length>0);let Pe=x.signal==="complete"?Math.max(0,1-(ve-x.signalAt)/1e3)*.26:0,V=ue?0:.5+.5*Math.sin(k*1.3+x.node.slot*.7),H=x.node.active||x.node.kind==="step"&&x.node.stepId===Re&&x.node.status!=="submitted";x.element.dataset.active=String(!!H),x.solid.material[0].emissiveIntensity=H?.34:.18,x.element.dataset.related=String(!!Se),x.edge.material.opacity=H?.95:x.node.hero?.9:Se?.78:.42+V*.07,x.glow.material.opacity=H?ue?.18:.14+Math.sin(k*2.6)*.025:I.pulse*.12+Pe+Ae.light*.08+(x.node.hero?.08:Se?.06:.008+V*.006)}let he=null,ae=0,Te=0;for(let x of m.values()){let I=v.get(x.edge.target),oe=v.get(x.edge.source);if(!I||!oe)continue;let ie=x.edge.kind==="sequence",_e=ie&&I.node.kind==="step"&&I.node.stepId===Re&&I.node.status!=="submitted",ye=!!I.node.active||_e,J=[M,y].some(ne=>ne&&(I.node.id===ne||oe.node.id===ne)),X=["submitted","succeeded","passed","recorded"].includes(I.node.status),Ae=I.node.status==="waiting",P=Bu({time:k,index:x.index,length:x.length,age:ve-I.born,signal:I.signal,signalAge:ve-I.signalAt,active:ye,waiting:Ae,complete:X,highlight:J,reduced:ue}),le=x.shared;if(le.uHead.value=P.progress,le.uReveal.value=P.reveal,le.uGain.value=P.gain,le.uMotion.value=ue?0:1,le.uRepeats.value=P.repeats,le.uColor.value.setHex(ye?xn.copper:X?xn.complete:xn.ice),le.uStartOffset.value.copy(oe.group.position).sub(oe.position),le.uEndOffset.value.copy(I.group.position).sub(I.position),x.line.geometry.setDrawRange(0,P.reveal<=0?0:Math.max(2,Math.ceil(x.line.geometry.attributes.position.count*P.reveal))),x.line.visible=x.conduit.visible=x.halo.visible=!0,x.runner.visible=!ue&&P.reveal>0,x.tail.visible=x.runner.visible,P.moving&&ae++,P.execution&&Te++,x.runner.visible){Je(x,P.progress,x.runner.position),x.runner.material.color.copy(le.uColor.value),x.runner.material.opacity=P.gain*.72,x.runner.scale.setScalar(ye?.65:J?.58:.43),x.tail.material.color.copy(le.uColor.value),x.tail.material.opacity=P.gain*.45;let ne=x.tail.geometry.attributes.position,Ee=P.mode==="receipt"?-1:1;for(let Se=0;Se<12;Se++)Je(x,P.progress-Ee*Se*.014,fe),ne.setXYZ(Se,fe.x,fe.y,fe.z);ne.needsUpdate=!0}if(!he&&ie&&oe.node.kind==="step"&&Ie(Je(x,.5,fe),C)){let ne=Ee=>(Je(x,Ee,re),i.localToWorld(re),re.project(C),{x:(re.x+1)*t.clientWidth/2,y:(1-re.y)*t.clientHeight/2});he={id:x.edge.id,mode:P.mode,progress:P.progress,length:x.length,moving:P.moving,points:[.2,.35,.5,.65,.8].map(ne),head:ne(P.progress)}}}t.__metisConnectionProbe=he,t.dataset.connectionStyle="optical",t.dataset.flowingConnections=String(ae),t.dataset.executingConnections=String(Te);let We=d.positions.get(d.activeId)||d.positions.get(d.latestId);for(let x=0;x<me.length;x++){let I=me[x];if(I.visible=Ne&&!ue&&!!We,!I.visible)continue;let oe=x%2?1:-1,ie=(k*.24+x*.17)%1;I.position.set(We.x+oe*ie*6,We.y-1.8+x%3*.11,We.z+(x<5?-1:1)*ie*4),I.material.opacity=Math.sin(Math.PI*ie)*.28}!se&&Y&&(ue||ve>=Y)&&(L.hidden=!0,Y=0);let E=pe.frame(ve,ue);if(t.dataset.streamLines=String(E.totalLines),t.dataset.streamMoving=String(E.moving&&!!se),L.dataset.flow=String(!ue&&E.moving&&!!se),$.style.transform="translate3d(0,"+(-Math.max(0,E.position-(t.clientHeight<700?3:6))*18).toFixed(2)+"px,0)",se){let x=v.get(se);if(x?.onScreen&&F){re.set(x.size.w/2,x.size.h/2,.3).applyQuaternion(x.group.quaternion).add(x.group.position),i.localToWorld(re),re.project(C);let I=t.clientWidth,oe=t.clientHeight,ie=(re.x+1)*I/2,_e=(-re.y+1)*oe/2,ye=Math.max(12,Math.min(I-310,ie+310<I?ie+20:ie-320)),J=Math.max(175,Math.min(oe-210,_e));L.hidden=!1,L.style.transform="translate3d("+Math.round(ye)+"px,"+Math.round(Math.max(95,J))+"px,0)",L.dataset.reduced=String(ue),L.dataset.compact=String(oe<700),L.style.opacity=".94",x.cardTape.style.transform="translate3d(0,"+(-Math.max(0,E.position-2)*18).toFixed(2)+"px,0)"}else L.hidden=!0}return t.dataset.networkLod=C.position.distanceTo(i.position)>42?"map":"detail",!ue&&(Ne||ve<S||E.moving&&!!se)}function $e(k){let ue=v.has(k)?k:v.has("step:"+k)?"step:"+k:d?.byId.get(k)?.stepId?"step:"+d.byId.get(k).stepId:null;return ue?d?.positions.get(ue):null}function Xe(k){let ue=v.get(k)||v.get("step:"+k);if(ue?.node.origin==="activity"&&(ue=v.get(ue.node.stepId?"step:"+ue.node.stepId:"engine")),!ue||!["step","engine"].includes(ue.node.kind)||!d.presentation.expanded||ue.node.stepId!==d.presentation.stageId)return null;let C=d.nodes.filter(ae=>ae.origin==="activity"&&ae.stepId===ue.node.stepId),ve=[{p:d.positions.get(ue.node.id),size:da(ue.node)}];if(C.length)for(let ae=0;ae<Sn.visibleCalls;ae++)ve.push({p:kl(d.positions.get(ue.node.id),ae),size:da({kind:"call"})});let Ne=new an;for(let{p:ae,size:Te}of ve)Ne.expandByPoint(new R(ae.x-Te.w/2-.8,ae.y-Te.h/2-.6,ae.z-.3)),Ne.expandByPoint(new R(ae.x+Te.w/2+.8,ae.y+Te.h/2+.6,ae.z+.8));let Re=Ne.getCenter(new R),he=Ne.getSize(new R);return{x:Re.x,y:Re.y,z:Re.z,w:Math.max(10,he.x+2),h:Math.max(6,he.y+2),bounds:{minX:Ne.min.x,maxX:Ne.max.x,minY:Ne.min.y,maxY:Ne.max.y,minZ:Ne.min.z,maxZ:Ne.max.z}}}function nt(k){let ue=d?.byId.get(v.has(k)?k:v.has("step:"+k)?"step:"+k:k);return ue?ue.stepId||"__project__":null}return{update:xe,render:be,bounds:()=>d?.bounds,position:$e,focusFrame:Xe,scope:nt,followKey:k=>zu(d,k),preview:k=>{M=k&&v.has(k)?k:null,a()},size:k=>(v.get(k)||v.get("step:"+k))?.size||da(),latest:()=>d?.latestId,active:()=>d?.activeId,has:k=>!!$e(k),focus:k=>{y=v.has(k)?k:"step:"+k,a()},showLive:k=>{F=!!k,F||(L.hidden=!0),t.dataset.liveWindow=String(F&&!!se),a()},animating:()=>performance.now()<S,dispose(){if(!b){b=!0,L.remove();for(let k of v.values())k.wrapper.remove();for(let k of g)k.remove();zl(o),l.clear(),p.clear(),i.remove(o,l,p),v.clear(),m.clear(),me=[],delete t.__metisConnectionProbe;for(let k of["connectionStyle","flowingConnections","executingConnections","artDirection","sceneMode","resultHero","chassisLayers","networkNodes","networkRecords","networkCalls","networkColumns","networkRows","networkLayout","networkDepth","liveWindow","matrixAdditions","networkLod","reducedMotion","streamLines","streamMoving","followTarget","followMode","cameraDistance"])delete t.dataset[k]}}}}var Kv=["varying vec2 vUv;","void main(){","vUv=position.xy*.5+.5;","gl_Position=vec4(position.xy,.999,1.0);","}"].join(`
`),Jv=["precision highp float;","varying vec2 vUv;","uniform mat4 uClipToBoard;","uniform float uAspect;","uniform float uSpatial;","uniform float uTime;","uniform float uActivity;","uniform vec2 uPointer;","uniform vec2 uFocus;","uniform vec2 uPulse;","uniform float uPulseAge;","float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}","float rule(float distance,float width){float footprint=fwidth(distance);return (1.0-smoothstep(width,width+max(footprint,.001),distance))*(1.0-smoothstep(.08,.35,footprint));}","void main(){","vec2 ndc=vUv*2.-1.;","vec4 near4=uClipToBoard*vec4(ndc,-1.,1.);","vec4 far4=uClipToBoard*vec4(ndc,1.,1.);","vec3 origin=near4.xyz/near4.w;","vec3 ray=far4.xyz/far4.w-origin;","float axis=mix(ray.z,ray.y,uSpatial);","float denominator=(axis<0.?-1.:1.)*max(abs(axis),.0001);","float rayT=clamp((mix(-.19,-3.8,uSpatial)-mix(origin.z,origin.y,uSpatial))/denominator,-2000.,2000.);","vec3 hit=origin+ray*rayT;","vec2 p=clamp(mix(hit.xy,hit.xz,uSpatial),vec2(-4000.),vec2(4000.));","vec2 screen=(vUv-.5)*vec2(uAspect,1.);","vec2 q=p/mix(4.6,8.0,uSpatial);","float groundFade=1.0-smoothstep(.12,.75,max(length(dFdx(p)),length(dFdy(p))));","vec2 tile=floor(q),cell=fract(q);","float h=hash21(tile);","float gridFine=rule(min(abs(fract(p.x/.65)-.5),abs(fract(p.y/.65)-.5)),.006);","float gridMajor=rule(min(abs(fract(q.x)-.5),abs(fract(q.y)-.5)),.0028);","float routeY=.22+floor(h*3.0)*.17;","float horizontal=rule(abs(cell.y-routeY),.0019)*step(.12,cell.x)*step(cell.x,.82);","float vertical=rule(abs(cell.x-.82),.0019)*step(routeY,cell.y)*step(cell.y,routeY+.12);","float diagonal=rule(abs((cell.x-.82)+(cell.y-routeY-.12)),.0027)*step(.65,cell.x)*step(cell.x,.82)*step(routeY+.12,cell.y)*step(cell.y,routeY+.29);","float etch=max(horizontal,max(vertical,diagonal));","float via=rule(abs(length(cell-vec2(.12,routeY))-.010),.002);","float bus=rule(abs(fract((p.x+.08)/6.6)-.5),.0017)+rule(abs(fract((p.x-.08)/6.6)-.5),.00065);","float scan=pow(max(0.,1.-abs(fract((p.y+p.x*.22)*.031-uTime*.19)-.5)*2.),12.);","float flux=pow(max(0.,1.-abs(fract(p.x*.055-p.y*.016-uTime*.28)-.5)*2.),18.);","float pathFlow=pow(max(0.,1.-abs(fract(cell.x-h-uTime*.65)-.5)*2.),7.)*horizontal;","float sweep=exp(-pow((vUv.x+vUv.y*.32-fract(uTime*.095)*1.75+.25)*6.,2.));","vec2 focusDelta=(p-uFocus-uPointer*1.3)*vec2(.9,1.35);","float halo=exp(-dot(focusDelta,focusDelta)*.009);","vec2 drift=vec2(sin(uTime*.24)*.12,cos(uTime*.19)*.09);","float violet=exp(-dot(screen-vec2(.4,-.22)-drift,screen-vec2(.4,-.22)-drift)*2.3);","float warm=exp(-dot(screen-vec2(-.55,.22)+drift,screen-vec2(-.55,.22)+drift)*3.2);","float pulseDistance=abs(p.x-uPulse.x)+abs(p.y-uPulse.y)*1.35;","float pulse=rule(abs(pulseDistance-uPulseAge*9.),.075)*exp(-uPulseAge*1.12)*step(0.,uPulseAge);","float grain=hash21(floor(gl_FragCoord.xy))-.5;","float restraint=mix(1.0,.16,uSpatial)*groundFade;","vec3 base=mix(vec3(.024,.026,.043),vec3(.012,.016,.027),uSpatial);","base+=(vec3(.013,.010,.031)*violet+vec3(.035,.015,.006)*warm)*mix(1.,.42,uSpatial);","float lightSheet=exp(-abs(screen.x*.62+screen.y+.12-sin(uTime*.08)*.025)*11.);","float warmSheet=exp(-abs(screen.x*.72+screen.y-.43)*23.);","base+=(vec3(.007,.017,.025)*lightSheet+vec3(.016,.010,.004)*warmSheet)*uSpatial;","base+=(vec3(.027,.020,.026)*gridFine*.20+vec3(.071,.040,.033)*gridMajor)*restraint;","vec3 copper=vec3(.42,.20,.105);","base+=copper*(etch*.24+via*.32+bus*.085)*restraint;","base+=copper*(scan*.9+flux*.42)*(etch+bus*.6)*(.7+uActivity*.55)*restraint;","base+=vec3(.65,.38,.17)*pathFlow*(.7+uActivity*.3)*restraint;","base+=vec3(.028,.016,.012)*sweep*mix(1.,.28,uSpatial);","base+=vec3(.19,.095,.040)*halo*(.045+uActivity*.065)*mix(1.,.3,uSpatial);","base+=vec3(.30,.15,.075)*pulse*(.08+etch*.9+bus*.32)*restraint;","base+=grain*mix(.002,.0005,uSpatial);","gl_FragColor=vec4(base,1.);","}"].join(`
`);function rp({scene:i,board:e,host:t}){let n={uClipToBoard:{value:new dt},uAspect:{value:1},uSpatial:{value:0},uTime:{value:0},uActivity:{value:.08},uPointer:{value:new we},uFocus:{value:new we},uPulse:{value:new we},uPulseAge:{value:100}},r=new Yi(2,2),s=new It({uniforms:n,vertexShader:Kv,fragmentShader:Jv,depthWrite:!1,depthTest:!1,toneMapped:!1}),a=new bt(r,s);a.frustumCulled=!1,a.renderOrder=-1e4,i.add(a);let o=new dt,l=.08,c=.08,h=-100,f=!1;return t.dataset.atmosphere="viewport-circuit-v4",{update(u,p){c=Qu(u),n.uSpatial.value=u?.kind==="project"?1:0,p&&n.uFocus.value.set(p.x,n.uSpatial.value?p.z:p.y)},pointer(u){n.uPointer.value.set(u.x,u.y)},pulse(u,p){u&&(n.uPulse.value.set(u.x,n.uSpatial.value?u.z:u.y),h=p,t.dataset.atmosphereImpulse=String(Number(t.dataset.atmosphereImpulse||0)+1))},render(u,p,g,v){f||(l+=(c-l)*Math.min(1,p*3),n.uActivity.value=l,n.uTime.value=g?0:u,n.uPulseAge.value=g?100:u-h,n.uAspect.value=v.aspect,n.uClipToBoard.value.copy(o.copy(e.matrixWorld).invert()).multiply(v.matrixWorld).multiply(v.projectionMatrixInverse),t.dataset.ambientMotion=String(!g))},dispose(){f||(f=!0,i.remove(a),r.dispose(),s.dispose(),delete t.dataset.atmosphere,delete t.dataset.atmosphereImpulse,delete t.dataset.ambientMotion)}}}var jv={submitted:8838585,working:16750169,checking:13873663,needs_revision:16764018,needs_recheck:16764018,blocked:16093826,passed:11002045,not_started:9987929,configured:11762782,incomplete:16761980},gd=i=>i.active?16757613:i.viewed?16759942:jv[i.status]||9987929;function $v(){let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);for(let[n,r]of[[0,"#fffce8"],[.08,"#ffd3a9"],[.23,"#ff965bb8"],[.5,"#ff58222b"],[1,"#ff451000"]])t.addColorStop(n,r);return e.fillStyle=t,e.fillRect(0,0,128,128),new Ss(i)}function sp(i,e){i.traverse(t=>{t.geometry?.dispose();for(let n of Array.isArray(t.material)?t.material:[t.material])n&&!e.has(n)&&n.dispose()})}function xd({host:i,compactHud:e=!1,onPick:t,onEntity:n,onFocusChat:r,onState:s,onError:a,onReorder:o,onBindSkill:l,onToggleLoop:c,onAddAfter:h,onOpenArtifact:f,onSkillInspect:u}){let p=new Sl({alpha:!1,antialias:!0,powerPreference:"high-performance"});p.setClearColor(526866),p.outputColorSpace=jt,p.toneMapping=Ki,p.toneMappingExposure=1.06,p.domElement.className="ion-gl",p.domElement.setAttribute("aria-hidden","true"),i.appendChild(p.domElement);let g=new Cl;g.domElement.className="ion-labels",i.appendChild(g.domElement);let v=new ms;v.background=new Qe(526866),v.fog=new fs(526866,.008);let m=new qt(35,1,.1,130),d=new Al(m,i);d.enableDamping=!0,d.dampingFactor=.085,d.minDistance=6,d.maxDistance=55,d.maxPolarAngle=Math.PI*.66,d.minPolarAngle=Math.PI*.27,d.maxAzimuthAngle=.8,d.minAzimuthAngle=-.8;let _=new Pl(p);_.addPass(new Ll(v,m));let M=new Gr(new we(800,580),.44,.62,.82),y=new Dl;_.addPass(M),_.addPass(y),v.add(new Os(11981275,330514,.7));let A=new Dr(16761748,1.15);A.position.set(-14,18,22),v.add(A);let T=new Dr(8632534,1.3);T.position.set(16,13,-14),v.add(T);let b=new Hs(16734510,12,25);b.position.set(-5,-1,5),v.add(b);let S=new Tt;S.rotation.set(-.025,.035,-.065),v.add(S);let F=new yn({color:1774106,metalness:.3,roughness:.65}),L=new yn({color:9128499,metalness:.5,roughness:.6}),N=new Set([F,L]),q=rp({scene:v,board:S,host:i}),te=new Tt,D=new Tt,K=new Tt,$=new Tt;S.add(te,D,K,$);let B=$v(),pe=new Map,W=document.createElement("button");W.type="button",W.className="ion-engine",W.setAttribute("aria-label","进入研究助手");let se=document.createElement("strong"),Y=document.createElement("span");se.textContent="METIS",Y.textContent="RESEARCH ENGINE",W.append(se,Y),W.addEventListener("pointerdown",V=>V.stopPropagation()),W.onclick=()=>r?.();let ke=new fi(W);ke.scale.setScalar(.014),$.add(ke);let Ue=800,Q=580,Le=!1,fe={nodes:[],activeCalls:[]},G="",re="",Me=0,Ke=0,De=0,et=!1,Je=!0,me=!1,Ce=!1,xe=null,Ie=null,be=!0,$e=null,Xe="",nt=!1,k=null,ue=matchMedia("(prefers-reduced-motion: reduce)").matches,C="",ve=null,Ne=!1;d.enableDamping=!ue;let Re=new R;function he(V){let H=Math.min(V||1,Ue>=1450&&V>9?4:Ue>=760?3:2);return{columns:H,rows:Math.ceil(V/H),gapX:5.25,gapY:3.35}}function ae(V){let{columns:H,rows:Z,gapX:ge,gapY:O}=he(V);return Array.from({length:V},(z,ce)=>{let He=Math.floor(ce/H),rt=He%2?H-1-ce%H:ce%H;return new R((rt-(H-1)/2)*ge,(Z-1)*O/2-He*O-.9,0)})}function Te(V){let H=document.createElement("button");H.type="button",H.className="ion-chip",H.dataset.sceneStep=V;let Z=document.createElement("div");Z.className="ion-chip-head";let ge=document.createElement("span");ge.className="ion-chip-index";let O=document.createElement("span");O.className="ion-chip-state",Z.append(ge,O);let z=document.createElement("strong");z.className="ion-chip-title";let ce=document.createElement("span");ce.className="ion-chip-purpose";let He=document.createElement("span");He.className="ion-chip-foot";let rt=document.createElement("span");return rt.className="ion-chip-face",rt.append(Z,z,ce,He),H.append(rt),H.addEventListener("pointerdown",Be=>Be.stopPropagation()),H.onclick=()=>{be=!1,s?.({follow:be}),J(V),t?.(V)},H.addEventListener("dragstart",Be=>{if(!fe.editable){Be.preventDefault();return}Be.dataTransfer.setData("application/x-metis-step",V),Be.dataTransfer.effectAllowed="move",H.dataset.dragging="true"}),H.addEventListener("dragend",()=>{delete H.dataset.dragging;for(let Be of pe.values())delete Be.card.element.dataset.drop}),H.addEventListener("dragover",Be=>{!fe.editable||![...Be.dataTransfer.types].some(lt=>lt==="application/x-metis-step"||lt==="application/x-metis-skill")||(Be.preventDefault(),Be.stopPropagation(),H.dataset.drop=[...Be.dataTransfer.types].includes("application/x-metis-skill")?"skill":Be.clientY<H.getBoundingClientRect().y+H.getBoundingClientRect().height/2?"before":"after",Be.dataTransfer.dropEffect=H.dataset.drop==="skill"?"copy":"move")}),H.addEventListener("dragleave",Be=>{H.contains(Be.relatedTarget)||delete H.dataset.drop}),H.addEventListener("drop",Be=>{if(!fe.editable)return;let lt=Be.dataTransfer.getData("application/x-metis-skill"),ze=Be.dataTransfer.getData("application/x-metis-step"),Et=H.dataset.drop||"before";delete H.dataset.drop,!(!lt&&!ze)&&(Be.preventDefault(),Be.stopPropagation(),lt?l?.(V,lt):ze!==V&&o?.(ze,V,Et))}),H.addEventListener("keydown",Be=>{if(!fe.editable||!Be.altKey||!["ArrowUp","ArrowDown"].includes(Be.key))return;let lt=fe.nodes.findIndex(Et=>Et.id===V),ze=fe.nodes[lt+(Be.key==="ArrowUp"?-1:1)];ze&&(Be.preventDefault(),Be.stopPropagation(),o?.(V,ze.id,Be.key==="ArrowUp"?"before":"after"))}),{element:H,index:ge,state:O,title:z,purpose:ce,foot:He}}function We(V){let H=document.createElement("div");H.className="ion-nodePorts",H.setAttribute("role","group"),H.setAttribute("aria-label","步骤技能、循环与交付"),H.addEventListener("pointerdown",z=>z.stopPropagation());let Z=new fi(H);Z.scale.setScalar(.014),$.add(Z);let ge=document.createElement("button");ge.type="button",ge.className="ion-nodeInsert",ge.textContent="+",ge.setAttribute("aria-label","在此步骤后新增步骤"),ge.addEventListener("pointerdown",z=>z.stopPropagation()),ge.onclick=()=>h?.(V);let O=new fi(ge);return O.scale.setScalar(.014),$.add(O),{element:H,label:Z,add:ge,action:O}}function E(V){let H=V.node,Z=H.skills||[],ge=H.artifacts||[],O=JSON.stringify([H.loop,Z.map(ce=>[ce.id,ce.name]),ge.map(ce=>[ce.index,ce.name,ce.availability]),H.output?.format,fe.editable]);if(V.card.element.draggable=!!fe.editable,V.card.element.setAttribute("aria-keyshortcuts",fe.editable?"Alt+ArrowUp Alt+ArrowDown":""),V.ports.action.visible=!!fe.editable&&H.viewed,V.loopTrace.visible=H.loop===!0,V.portSignature===O)return;V.portSignature=O,V.ports.element.replaceChildren();let z=(ce,He,rt,Be,lt=!1)=>{let ze=document.createElement("button");return ze.type="button",ze.className="ion-port ion-port-"+He,ze.textContent=ce,ze.title=rt,ze.disabled=lt,ze.onclick=Et=>{Et.stopPropagation(),Be?.()},V.ports.element.appendChild(ze),ze};(H.loop||fe.kind==="mode")&&z(H.loop?"↻ 达标循环":"↻ 循环","loop",H.loopCriteria||"未达标时继续本步；点此设置",()=>fe.editable?c?.(H.id):t?.(H.id),fe.kind==="mode"&&!fe.editable);for(let ce of Z.slice(0,2)){let He=z(ce.name,"skill",ce.name+" · "+ce.id,()=>u?.(H.id,ce.id));He.dataset.skillId=ce.id}Z.length>2&&z("+"+(Z.length-2)+" 技能","skill","查看本步全部技能",()=>t?.(H.id));for(let ce of ge.slice(0,2)){let He=z(ce.name,"artifact",ce.path,()=>f?.(H.id,ce.index,ce),ce.availability!=="file");He.dataset.artifactIndex=String(ce.index)}ge.length>2&&z("+"+(ge.length-2)+" 交付","artifact","查看本步全部交付物",()=>t?.(H.id)),H.output?.format&&H.output.format!=="auto"&&z(H.output.format.toUpperCase(),"output","最终输出目标，点此编辑",()=>t?.(H.id))}function x(V,H){let Z=H.x-V.x,ge=Z>=0?1:-1,O=Math.abs(H.y-V.y)<.5,z=V.clone().add(new R(O?ge*2.35:0,O?0:-1.25,.03)),ce=H.clone().add(new R(O?-ge*2.35:0,O?0:1.25,.03)),He=O?[z,z.clone().add(new R(ge*.18,0,0)),z.clone().add(new R(ge*.27,-.25,0)),ce.clone().add(new R(-ge*.27,-.25,0)),ce.clone().add(new R(-ge*.18,0,0)),ce]:[z,z.clone().add(new R(.45,-.17,0)),ce.clone().add(new R(.45,.17,0)),ce];return new ai(He,!1,"centripetal")}function I(){for(let Z of pe.values())Z.card.element.remove(),Z.ports.element.remove(),Z.ports.add.remove(),$.remove(Z.label,Z.ports.label,Z.ports.action);pe.clear();for(let Z of[te,D,K])sp(Z,N),Z.clear();let V=ae(fe.nodes.length),H=he(fe.nodes.length);ke.position.set(-.8,(H.rows-1)*H.gapY/2+1.8,.12);for(let Z=0;Z<=H.columns;Z++){let ge=(Z-H.columns/2)*H.gapX;for(let O of[-.07,0,.07]){let z=new Mt().setFromPoints([new R(ge+O,-18,-.08),new R(ge+O,18,-.08)]);K.add(new Ei(z,new un({color:O?8733743:13396287,transparent:!0,opacity:O?.3:.46})))}for(let O=-12;O<=12;O+=1.1){let z=new bt(new pn(.11,.022,.025),L);z.position.set(ge,O,-.05),K.add(z)}}fe.nodes.forEach((Z,ge)=>{let O=V[ge],z=new Tt;z.position.copy(O),te.add(z);let ce=new bt(new pn(4.65,2.42,.19),F);z.add(ce);let He=new Dn(new si(ce.geometry),new un({color:gd(Z),transparent:!0,opacity:.6}));z.add(He);for(let En=0;En<10;En++)for(let Hl of[-1,1]){let Xr=new bt(new pn(.17,.035,.055),L);Xr.position.set(Hl*2.42,-.94+En*.21,-.015),z.add(Xr)}let rt=Te(Z.id),Be=new fi(rt.element);Be.position.copy(O).add(new R(0,0,.13)),Be.scale.setScalar(.014),$.add(Be);let lt=We(Z.id);lt.label.position.copy(O).add(new R(0,-1.46,.14)),lt.action.position.copy(O).add(new R(2.64,.15,.14));let ze=new ai([new R(2.15,-.8,.01),new R(2.65,-.8,.01),new R(2.65,1.28,.01),new R(1.8,1.28,.01),new R(1.8,1.15,.01)].map(En=>En.add(O))),Et=new bt(new oi(ze,40,.018,5,!1),new Hn({color:15709293,transparent:!0,opacity:.65}));D.add(Et);let rn=new zn(new Ln({map:B,color:gd(Z),transparent:!0,opacity:.13,depthWrite:!1,blending:nn}));rn.scale.set(5.6,3.2,1),rn.position.z=-.08,z.add(rn);let sn=ge?V[ge-1]:ke.position,Mn=x(sn,O),mi=new bt(new oi(Mn,48,.022,6,!1),new Hn({color:12740674,transparent:!0,opacity:.5}));D.add(mi);let Zn=new Tt,gi=new bt(new ks(.09,12,8),new Hn({color:16775625})),ki=new zn(new Ln({map:B,color:16757092,transparent:!0,depthWrite:!1,blending:nn}));ki.scale.setScalar(1.35),Zn.add(gi,ki),Zn.visible=!1,D.add(Zn);let er=new Wi(new Mt().setAttribute("position",new xt(new Float32Array(48),3)),new Ti({color:16757354,size:.045,transparent:!0,opacity:.9,depthWrite:!1,blending:nn}));er.visible=!1,D.add(er),pe.set(Z.id,{node:Z,index:ge,position:O,group:z,edge:He,card:rt,label:Be,ports:lt,loopTrace:Et,glow:rn,curve:Mn,trace:mi,runner:Zn,tail:er,portSignature:null})}),oe(),_e(!1)}function oe(){for(let V of pe.values()){let H=V.node,Z=gd(H),ge=V.card;ge.element.dataset.active=String(H.active),ge.element.dataset.viewed=String(H.viewed),ge.element.dataset.status=H.status,ge.element.style.setProperty("--ion-node","#"+new Qe(Z).getHexString()),ge.element.setAttribute("aria-label","第"+(H.index+1)+"步 "+H.title+" · "+H.label),ge.index.textContent=String(H.index+1).padStart(2,"0"),ge.state.textContent=H.active?"执行中":H.label,ge.title.textContent=H.title,ge.purpose.textContent=H.purpose||H.expected||"选择查看本步目标与交付",ge.foot.textContent=H.recentCall?H.recentCall.label+(H.recentCall.target?" · "+H.recentCall.target:""):fe.kind==="mode"?(H.skills?.length||0)+" 项技能 · 点击编辑 / 拖动排序":H.loop?"达标后交付":"等待实际执行",V.edge.material.color.setHex(Z),V.trace.material.color.setHex(H.active?16758116:H.status==="submitted"?8838585:11951164),V.trace.material.opacity=H.active?1:H.status==="submitted"?.8:.44,V.glow.material.color.setHex(Z),E(V)}}function ie(V,H,Z=Fl.camera){let ge=d.enableDamping;if(d.enableDamping=!1,d.update(),d.enableDamping=ge,ue&&(Z=0),m.position.distanceToSquared(V)<1e-5&&d.target.distanceToSquared(H)<1e-5){Ie=null,i.dataset.cameraMoving="false",X();return}Z?Ie={start:performance.now(),duration:Z,from:m.position.clone(),targetFrom:d.target.clone(),position:V,target:H}:(Ie=null,m.position.copy(V),d.target.copy(H),d.update()),i.dataset.cameraMoving=String(Z>0),X()}function _e(V=!0,H=!1){if(k){let ze=k.bounds();if(!ze)return;let Et=new an;S.updateMatrixWorld(!0);for(let Zn of[ze.minX,ze.maxX])for(let gi of[ze.minY,ze.maxY])for(let ki of[ze.minZ,ze.maxZ])Et.expandByPoint(S.localToWorld(new R(Zn,gi,ki)));let rn=fe.network?.artMode||"overview",sn=Nl({minX:Et.min.x,maxX:Et.max.x,minY:Et.min.y,maxY:Et.max.y,minZ:Et.min.z,maxZ:Et.max.z},m.aspect,{mode:rn,height:Q}),Mn=new R(...sn.target),mi=new R(...sn.position);d.maxDistance=Math.max(100,sn.distance*1.7),m.far=Math.max(300,sn.distance*4),m.updateProjectionMatrix(),xe=null,i.dataset.cameraKeyframe=rn,H&&!ue&&(m.position.copy(Mn).add(mi.clone().sub(Mn).multiplyScalar(1.13)).add(new R(-2.5,2.8,0)),d.target.copy(Mn),d.update()),ie(mi,Mn,V?H?xn.intro:rn==="complete"?xn.handoff:1e3:0);return}let{columns:Z,rows:ge,gapX:O,gapY:z}=he(fe.nodes.length),ce=(Z-1)*O+6.6,He=(ge-1)*z+2.65,rt=Math.tan(Wn.degToRad(17.5)),Be=Math.max(12,ce/(2*rt*Math.max(.5,Ue/Q)*.92),He/(2*rt*Math.max(.45,(Q-(e?155:220))/Q)));d.maxDistance=Math.max(55,Be*1.25);let lt=S.localToWorld(new R(0,-.9+Be*2*rt*23/Q,0));xe=null,ie(lt.clone().add(new R(-Be*.17,Be*.12,Be)),lt,V?850:0)}function ye(V=!0){if(!k)return;let H=k.active()||k.latest(),Z=k.position(H);if(!Z)return;k.showLive(!0);let ge=k.focusFrame(H),O=ge?.bounds?Nl(ge.bounds,m.aspect,{mode:"execution",height:Q}):null,z=O?.distance||fd(Ue,Q,k.size(H));d.maxDistance=Math.max(100,z*2),m.far=Math.max(240,z*4),m.updateProjectionMatrix();let ce=O?new R(...O.target):S.localToWorld(new R(Z.x,Z.y+.35,Z.z)),He=O?new R(...O.position):ce.clone().add(new R(-.8,.6,z));xe=H,k.focus(H),i.dataset.followTarget=H,i.dataset.followMode=ge?"parent-and-child":"active-card",i.dataset.cameraKeyframe="execution",Xe=k.followKey(H),$e=H,ie(He,ce,V?xn.focus:0)}function J(V,H=!0){if(k){let O=k.position(V);if(!O)return;k.showLive(!0),xe=V,k.focus(V);let z=k.focusFrame(V),ce=z?.bounds?Nl(z.bounds,m.aspect,{mode:"inspection",height:Q}):null,He=ce?.distance||fd(Ue,Q,k.size(V)),rt=ce?new R(...ce.target):S.localToWorld(new R(O.x,O.y,O.z));i.dataset.cameraKeyframe="inspection",ie(ce?new R(...ce.position):rt.clone().add(new R(-He*.07,He*.07,He)),rt,H?xn.focus:0);return}let Z=pe.get(V);if(!Z)return;xe=V;let ge=S.localToWorld(Z.position.clone());ie(ge.clone().add(new R(-1.7,1.1,10.5)),ge)}function X(){!me&&!Ce&&!et&&Je&&!document.hidden&&!Me&&(Me=requestAnimationFrame(Ae))}function Ae(V){if(Me=0,me||Ce||!Je||document.hidden)return;let H=!!Ie||nt||k?.animating()||fe.nodes.some(ce=>ce.active);if(V-Ke<(H?Fl.activeFrame:Fl.idleFrame)){Me=requestAnimationFrame(Ae);return}let Z=Math.min(.2,(V-Ke)/1e3);Ke=V,ue||(De+=Z),et=!0;let ge=!1;if(Ie){let ce=Math.min(1,(V-Ie.start)/Ie.duration),He=Ol(ce);m.position.lerpVectors(Ie.from,Ie.position,He),d.target.lerpVectors(Ie.targetFrom,Ie.target,He),ce===1&&(Ie=null,i.dataset.cameraMoving="false"),ge=!0}let O=d.update();m.updateMatrixWorld(!0),S.updateMatrixWorld(!0),q.render(De,Z,ue,m);let z=k?.render(De,ue,m);for(let ce of pe.values()){let He=Wr(De,ce.index,ue||ce.card.element.matches(":hover,:focus-visible"));ce.group.position.set(ce.position.x+He.x,ce.position.y+He.y,ce.position.z+He.z),ce.group.rotation.set(He.rx,He.ry,0),ce.label.position.copy(ce.group.position),ce.label.position.z+=.13,ce.label.rotation.copy(ce.group.rotation),ce.ports.label.position.copy(ce.group.position),ce.ports.label.position.y-=1.46,ce.ports.label.position.z+=.14,ce.ports.action.position.copy(ce.group.position),ce.ports.action.position.x+=2.64,ce.ports.action.position.y+=.15,ce.ports.action.position.z+=.14;let rt=ce.node.active,Be=ue?.5:(De*.48+ce.index*.13)%1;if(ce.runner.visible=rt,ce.tail.visible=rt&&!ue,ce.glow.material.opacity=rt?ue?.5:.43+Math.sin(De*3)*.09:ce.node.viewed?.22:.055,rt){ce.runner.position.copy(ce.curve.getPoint(Be));let lt=ce.tail.geometry.attributes.position;for(let ze=0;ze<16;ze++)ce.curve.getPoint(Math.max(0,Be-ze*.014),Re),lt.setXYZ(ze,Re.x,Re.y,Re.z);lt.needsUpdate=!0}}_.render(),g.render(v,m),i.dataset.frames=String(Number(i.dataset.frames||0)+1),i.dataset.cameraDistance=m.position.distanceTo(d.target).toFixed(3),i.dataset.cameraAzimuth=d.getAzimuthalAngle().toFixed(4),i.dataset.cameraElevation=(Math.PI/2-d.getPolarAngle()).toFixed(4),i.dataset.gpuGeometries=String(p.info.memory.geometries),i.dataset.gpuTextures=String(p.info.memory.textures),et=!1,(ge||nt||O||z||!ue)&&X()}d.addEventListener("start",()=>{nt=!0,Ie=null,i.dataset.cameraMoving="false",i.dataset.cameraKeyframe="manual",be=!1,s?.({follow:be,manual:!0}),X()}),d.addEventListener("end",()=>{nt=!1,X()}),d.addEventListener("change",X);let P=V=>{q.pointer(Bl(V.clientX,V.clientY,i.getBoundingClientRect()))},le=()=>q.pointer({x:0,y:0});i.addEventListener("pointermove",P,{passive:!0}),i.addEventListener("pointerleave",le,{passive:!0});let ne=matchMedia("(prefers-reduced-motion: reduce)"),Ee=()=>{ue=ne.matches,d.enableDamping=!ue,ue&&(Ie&&(m.position.copy(Ie.position),d.target.copy(Ie.target),Ie=null,i.dataset.cameraMoving="false"),d.update()),X()};ne.addEventListener("change",Ee);let Se=()=>{document.hidden?(cancelAnimationFrame(Me),Me=0):X()};document.addEventListener("visibilitychange",Se);let Pe=V=>{V.preventDefault(),Ce=!0,cancelAnimationFrame(Me),Me=0,a?.("三维图形上下文已中断，可重新初始化场景。")};return p.domElement.addEventListener("webglcontextlost",Pe),s?.({renderer:"three-webgl2",follow:be}),{update(V){let H=JSON.stringify(V);if(H===G)return;let Z=fe?.phase;if(G=H,fe=V,fe.kind==="project"){S.rotation.set(0,0,0),d.minPolarAngle=Math.PI*.14,d.maxPolarAngle=Math.PI*.49,d.minAzimuthAngle=-1/0,d.maxAzimuthAngle=1/0;let z=!k;ke.visible=!1,z&&(k=ip({board:S,texture:B,host:i,requestFrame:X,onPick:t,onFocusChat:r,onEntity:lt=>{let ze=(fe.network||Qi(fe)).byId.get(lt);["artifact","delivery"].includes(ze?.kind)||(be=!1,s?.({follow:be}),J(lt)),n?n(lt):ze?.stepId&&t?.(ze.stepId)}}));let ce=fe.network||Qi(fe);k.update(ce,fe),q.update(fe,k.position(k.active()||k.latest()));let He=[fe.live?.active?.callId||"",fe.activeCalls.at(-1)?.callId||"",k.active()||"",fe.activities?.at(-1)?.status||""].join("|");He!==C&&(C&&q.pulse(k.position(k.active()||k.latest()),De),C=He);let rt=k.active()||k.latest(),Be=ce.presentation.expanded?ce.presentation.stageId:null;z?(k.active()?ye(!1):_e(!1),$e=rt):be&&Z!=="completed"&&fe.phase==="completed"?(be=!1,k.showLive(!1),s?.({follow:be}),_e()):be&&(k.active()||ce.counts.calls)&&k.followKey(rt)!==Xe?ye():be&&(k.active()||ce.counts.calls)&&rt!==$e?(xe=rt,k.focus(rt),k.showLive(!0),i.dataset.followTarget=rt,$e=rt,X()):!be&&xe&&(Be!==ve||ce.presentation.expanded!==Ne)&&ce.presentation.expanded?J(xe):!be&&!xe&&Ne&&!ce.presentation.expanded&&_e(),ve=Be,Ne=ce.presentation.expanded,X();return}W.dataset.busy=String(V.phase==="processing"||V.phase==="running");let ge=fe.nodes.map(z=>z.id).join("|");re!==ge&&(re=ge,I());for(let z of fe.nodes)pe.has(z.id)&&(pe.get(z.id).node=z);oe();let O=fe.activeCalls.at(-1)?.stepId;q.update(fe,pe.get(O||xe)?.position),be&&O&&O!==$e&&(J(O),$e=O),X()},resize(V,H){let Z=Math.max(1,V),ge=Math.max(1,H);if(Le&&Ue===Z&&Q===ge)return;Le=!0;let O=he(fe.nodes.length).columns;Ue=Z,Q=ge;let z=Math.min(devicePixelRatio||1,1.35,Math.sqrt(18e5/(Ue*Q)));p.setPixelRatio(z),p.setSize(Ue,Q,!1),_.setPixelRatio(z),_.setSize(Ue,Q),g.setSize(Ue,Q),m.aspect=Ue/Q,m.updateProjectionMatrix(),k?be&&(k.active()||fe.network?.counts.calls)?ye(!1):xe&&i.dataset.cameraKeyframe==="inspection"?J(xe,!!Ie):!xe&&i.dataset.cameraKeyframe!=="manual"&&_e(!1):O!==he(fe.nodes.length).columns&&fe.nodes.length?I():xe||_e(!1),X()},visible(V){Je=V,Je?X():(cancelAnimationFrame(Me),Me=0)},home(){be=!1,k?.showLive(!1),s?.({follow:be}),_e()},reveal(V=!1){be=!!V,Xe="",k?.showLive(!1),s?.({follow:be}),_e(!0,!0)},follow(V=!0){if(be=V&&fe.phase!=="completed",s?.({follow:be}),be)if(k)k.active()||fe.network?.counts.calls?ye():_e(),$e=k.active()||k.latest();else{let H=fe.activeCalls.at(-1)?.stepId;H?J(H):_e()}else V&&k&&fe.phase==="completed"&&_e()},preview(V){k?.preview(V)},focus(V){be=!1,s?.({follow:be}),J(V)},captureView(){return{position:m.position.toArray(),target:d.target.toArray(),follow:be,selected:xe,keyframe:i.dataset.cameraKeyframe,layout:k?Sn.version:"workflow-v1"}},restoreView(V){if(!(!V||![V.position,V.target].every(H=>Array.isArray(H)&&H.length===3&&H.every(Number.isFinite)))){if(k&&V.layout!==Sn.version){be=!!k.active(),be?ye(!1):_e(!1),s?.({follow:be});return}if(k&&V.follow&&fe.phase==="completed"){be=!1,k.showLive(!1),_e(!1),s?.({follow:be});return}if(k&&V.follow){be=!0,ye(!1),$e=k.active()||k.latest(),s?.({follow:be});return}be=!!V.follow,xe=k?.has(V.selected)||pe.has(V.selected)?V.selected:null,k?.showLive(be||!!xe),ie(new R(...V.position),new R(...V.target),0),s?.({follow:be})}},dispose(){if(!me){me=!0,cancelAnimationFrame(Me),ne.removeEventListener("change",Ee),document.removeEventListener("visibilitychange",Se),i.removeEventListener("pointermove",P),i.removeEventListener("pointerleave",le),p.domElement.removeEventListener("webglcontextlost",Pe),d.dispose(),k?.dispose(),q.dispose();for(let V of pe.values())V.card.element.remove(),V.ports.element.remove(),V.ports.add.remove();W.remove(),sp(v,N);for(let V of N)V.dispose();B.dispose(),M.dispose(),y.dispose(),_.dispose(),p.dispose(),p.forceContextLoss(),p.domElement.remove(),g.domElement.remove(),pe.clear();for(let V of["cameraMoving","cameraAzimuth","cameraElevation","cameraKeyframe","gpuGeometries","gpuTextures"])delete i.dataset[V]}}}}function ap(i,e,t=[],n=null,{dirty:r=!1,busy:s=!1}={}){let a=new Map(t.map(h=>[h.id,h])),o=e?.steps||[],l=e?.output||{format:"auto",wordFormatting:""},c=o.map((h,f)=>{let u=(h.skills||[]).map(g=>({id:g,name:a.get(g)?.name||g})),p=!h.title?.trim()||!h.instruction?.trim();return{id:h.id,title:h.title||"新步骤",index:f,purpose:h.instruction||"",expected:h.deliverables||"",status:p?"incomplete":"configured",label:p?"待完善":"已配置",active:!1,viewed:h.id===n,loop:h.loop?.enabled===!0,loopCriteria:h.loop?.criteria||"",skills:u,artifacts:[],delivery:null,feedback:[],recentCall:null,output:f===o.length-1?l:null}});return{key:"mode:"+i.id,id:i.id,kind:"mode",editable:!s,name:i.name,modeName:i.name,phase:s?"saving":r?"draft":"configured",headline:s?"正在保存流程":r?"更改已进入共享草稿":"选择节点开始编排",target:"节点、技能和循环直接修改当前模式；保存后供新项目使用。",nodes:c,activeCalls:[],activities:[],recent:null,total:c.length,bindingCount:c.reduce((h,f)=>h+f.skills.length,0),loopCount:c.filter(h=>h.loop).length,attention:c.filter(h=>h.status==="incomplete").length,delivered:null,files:null}}function op(i,e=null){let t=Yr(i,e),n={...t,running:i.execution?.running===!0,live:i.live||null,runtime:i.runtime||null,availableRuntime:i.availableRuntime||null,cost:i.cost||null,blockedReason:i.blockedReason||null,recordedAt:i.recordedAt,pulseRevision:i.pulseRevision||0,key:"project:"+i.id,kind:"project",editable:!1,currentStepId:i.currentStepId,nodes:t.nodes.map(r=>{let s=i.steps.find(a=>a.id===r.id);return{...r,skills:Array.isArray(s.skillBindings)?s.skillBindings:null,executionBrief:s.executionBrief||null,prohibitions:s.prohibitions||"",loopCriteria:s.loopCriteria||"",artifacts:(r.delivery?.artifacts||[]).map((a,o)=>({...a,index:o,stepId:r.id})),output:r.index===t.nodes.length-1&&i.output||null}})};return n.network=Qi(n),n}function lp(i,e,t,n="before"){if(e===t)return i;let r=i.find(l=>l.id===e),s=i.find(l=>l.id===t);if(!r||!s)throw new Error("拖动的步骤不属于当前流程");let a=i.filter(l=>l.id!==e),o=a.findIndex(l=>l.id===t)+(n==="after"?1:0);return a.splice(o,0,r),a}function cp(i,e){if(!e)return i||null;if(!i)return e;if(i.instanceId!==e.instanceId)return(e.startedAt||0)>=(i.startedAt||0)?e:i;if(e.revision<i.revision)return i;let t=new Map((i.entries||[]).map(r=>[r.seq,r]));for(let r of e.entries||[])t.set(r.seq,r);let n=[...t.values()].sort((r,s)=>r.seq-s.seq).filter(r=>r.seq>=(e.firstSeq||0));for(;n.length>256;)n.shift();return e.revision===i.revision&&n.length===(i.entries||[]).length?i:{...i,...e,entries:n}}function dp(i,e){if(!i||i.id!==e.id)return e;if((e.workflowUpdate?.revision||0)<(i.workflowUpdate?.revision||0))return i;if(i.sessionId!==e.sessionId||i.versionId!==e.versionId)return e;let t=cp(i.live,e.live);return i.runtime?.instanceId===e.runtime?.instanceId&&(i.pulseRevision||0)>(e.pulseRevision||0)?t===i.live?i:{...i,live:t}:{...e,live:t}}function hp(i,e){if(!i||i.id!==e.id||e.sessionId&&e.sessionId!==i.sessionId||e.versionId&&e.versionId!==i.versionId)return i;let t=e.live===null&&e.execution?.running===!1?null:cp(i.live,e.live),n=e.pulse,r=n&&(i.runtime?.instanceId!==n.runtime?.instanceId||n.revision>(i.pulseRevision||0)),s=e.execution||i.execution,a=s?.running!==i.execution?.running||s?.loaded!==i.execution?.loaded;if(!r&&!a&&t===i.live)return i;if(!r)return{...i,execution:s,live:t};let o=new Map((n.steps||[]).map(h=>[h.id,h])),l=i.steps.map(h=>({...h,...o.get(h.id)})),c=l.filter(h=>h.status==="submitted").length;return{...i,execution:s,live:t,steps:l,activity:n.activity||i.activity,currentStepId:n.currentStepId,currentStepTitle:n.currentStepTitle,runStatus:n.runStatus,runtime:n.runtime,cost:n.cost,blockedReason:n.blockedReason,recordedAt:n.recordedAt,pulseRevision:n.revision,submitted:c,percent:l.length?Math.round(c/l.length*100):0}}var Qv=".mm-button,.ic-action,.mc-iconButton,.mc-mini,.mr-iconButton,.mc-modeTrigger,.mc-modeOption,.in-stageRoot,.mdoc-icon,.in-entity,.ion-chip,.in-port,.ion-port,.mc-libraryEntry,.mm-workspaceTabs [role=tab]";function up(i){if(!i)return()=>{};let e=matchMedia("(prefers-reduced-motion: reduce)"),t=new Set,n=null,r=null,s=0,a=null,o=null,l=!1;i.dataset.ionCraft="v2";let c=_=>{let M=_.target?.closest?.(Qv);return M&&i.contains(M)&&!M.disabled?M:null};function h(){if(s=0,!n||!a)return;r=n.getBoundingClientRect();let{x:_,y:M}=Bl(a.clientX,a.clientY,r),y=ep(_,M,e.matches);n.style.setProperty("--ion-pointer-x",((_+1)*50).toFixed(1)+"%"),n.style.setProperty("--ion-pointer-y",((M+1)*50).toFixed(1)+"%"),n.style.setProperty("--ion-tilt-x",y.rx.toFixed(2)+"deg"),n.style.setProperty("--ion-tilt-y",y.ry.toFixed(2)+"deg")}function f(_){let M=c(_);M!==n&&(p(),M&&(n=M,r=n.getBoundingClientRect(),n.dataset.ionHover="true"))}function u(_){n&&(a={clientX:_.clientX,clientY:_.clientY},s||(s=requestAnimationFrame(h)))}function p(){n&&(delete n.dataset.ionHover,n.style.removeProperty("--ion-tilt-x"),n.style.removeProperty("--ion-tilt-y")),n=null,r=null,a=null}function g(_){n&&(!_.relatedTarget?.nodeType||!n.contains(_.relatedTarget))&&p()}function v(){o&&delete o.dataset.ionPressed,o=null}function m(_){if(_.button!==0)return;let M=c(_);if(!M||(v(),o=M,M.dataset.ionPressed="true",e.matches||typeof M.animate!="function"))return;let y=M.getBoundingClientRect(),A=document.createElement("span");A.className="ion-pressWave",A.setAttribute("aria-hidden","true");let T=M.clientWidth||y.width,b=M.clientHeight||y.height,S=Math.max(T,b)*1.7,F=(_.clientX-y.left)*T/Math.max(1,y.width),L=(_.clientY-y.top)*b/Math.max(1,y.height);A.style.cssText="width:"+S+"px;height:"+S+"px;left:"+F+"px;top:"+L+"px;",M.appendChild(A);let N=A.animate([{opacity:.48,transform:"translate(-50%,-50%) scale(.08)"},{opacity:0,transform:"translate(-50%,-50%) scale(1)"}],{duration:520,easing:"cubic-bezier(.16,1,.3,1)"}),q={animation:N,ripple:A};if(t.add(q),N.finished.catch(()=>{}).finally(()=>{A.remove(),t.delete(q)}),t.size>8){let te=t.values().next().value;te.animation.cancel(),te.ripple.remove(),t.delete(te)}}function d(){if(v(),p(),e.matches)for(let _ of t)_.animation.cancel(),_.ripple.remove();t.clear(),i.dataset.reducedMotion=String(e.matches)}return d(),i.addEventListener("pointerover",f,{passive:!0}),i.addEventListener("pointermove",u,{passive:!0}),i.addEventListener("pointerout",g,{passive:!0}),i.addEventListener("pointerdown",m,{passive:!0,capture:!0}),window.addEventListener("pointerup",v,{passive:!0}),window.addEventListener("pointercancel",v,{passive:!0}),window.addEventListener("blur",v),e.addEventListener("change",d),()=>{if(!l){l=!0,cancelAnimationFrame(s),p(),v();for(let _ of t)_.animation.cancel(),_.ripple.remove();t.clear(),i.removeEventListener("pointerover",f),i.removeEventListener("pointermove",u),i.removeEventListener("pointerout",g),i.removeEventListener("pointerdown",m,!0),window.removeEventListener("pointerup",v),window.removeEventListener("pointercancel",v),window.removeEventListener("blur",v),e.removeEventListener("change",d),delete i.dataset.ionCraft,delete i.dataset.reducedMotion}}}function pp(i,{Icon:e,createIonWorld:t,workbenchCss:n=""}){let r=i.createElement,s=new Map;function a(c){let[h,f]=i.useState(c);return i.useLayoutEffect(()=>{if(c){f(!0);return}let u=matchMedia("(prefers-reduced-motion: reduce)").matches?0:180,p=setTimeout(()=>f(!1),u);return()=>clearTimeout(p)},[c]),{visible:c||h,closing:!c}}function o({model:c}){let h=c?.cost,f=c?.runtime,u=c?.availableRuntime;if(!h&&!f&&!u)return null;let p=h?.main||{},g=h?.review||{},v=d=>Number(d||0).toLocaleString("zh-CN"),m=u&&f?.buildId!==u.buildId;return r("details",{className:"ic-runtimeDetails"},r("summary",null,h?"核验 "+v(g.requests)+" 次 · 输出 "+v(g.outputTokens)+" tokens":"运行信息"),r("div",null,r("strong",null,"已报告模型消耗"),r("p",null,"主会话："+v(p.requests)+" 次；非缓存输入 "+v(p.inputTokens)+"，缓存读取 "+v(p.cacheReadTokens)+"，输出 "+v(p.outputTokens)),r("p",null,"独立核验："+v(g.requests)+" 次；非缓存输入 "+v(g.inputTokens)+"，缓存读取 "+v(g.cacheReadTokens)+"，输出 "+v(g.outputTokens)),h?.unknownUsageRequests?r("p",null,v(h.unknownUsageRequests)+" 次失败请求未取得完整消耗回执，不按零消耗计算。"):null,r("small",null,"缓存与普通输入计价不同；这里是实际回执统计，不是金额。"),r("p",null,"执行器："+(f?.protocol||"尚未报告")+" · "+(f?.buildId?.slice(0,16)||"未知")),m?r("p",{className:"ic-runtimeMismatch"},"当前会话与已安装执行器版本不同。运行任务不会被自动中断；方便时正常重新加载 DSH 后确认新版。"):null))}function l({model:c,header:h,assistant:f,inspector:u,palette:p,paletteOpen:g,paletteTitle:v="技能库",onClosePalette:m,onSelect:d,onReorder:_,onBindSkill:M,onToggleLoop:y,onAddAfter:A,onAdd:T,onOpenArtifact:b,onSkillInspect:S,onFocusChat:F,overlay:L,notice:N,empty:q,children:te,primaryAction:D}){let K=i.useRef(null),$=i.useRef(null),B=i.useRef(null),pe=i.useRef(null),W=i.useRef(null),[se,Y]=i.useState(null),[ke,Ue]=i.useState(0),[Q,Le]=i.useState("loading"),[fe,G]=i.useState(!1),[re,Me]=i.useState(!1),[Ke,De]=i.useState(()=>{try{return Math.max(300,Math.min(620,Number(localStorage.getItem("metis.circuit.chat-width"))||360))}catch{return 360}}),[et,Je]=i.useState(null),[me,Ce]=i.useState({key:"",stageId:null,page:0,overview:!1}),xe=c?.key||"empty",Ie=me.key===xe?me:{stageId:null,page:0,overview:!1},be=c?.network?.byId.get(c.network.activeId),$e=c?.network?.byId.get("call:"+c?.activities?.at(-1)?.callId),Xe=be?be.stepId||"__project__":$e?$e.stepId||"__project__":["processing","running"].includes(c?.phase)?c?.currentStepId:null,nt=i.useMemo(()=>c?.kind==="project"?{...c,network:Qi(c,{expandedStepId:Ie.stageId||(!Ie.overview&&fe&&c.phase!=="completed"?Xe:null),recordPage:Ie.page,overview:Ie.overview})}:c,[c,xe,Ie.stageId,Ie.page,Ie.overview,fe,Xe]);i.useEffect(()=>up(pe.current),[]);let k=i.useRef(null),ue=c?.nodes.find(O=>O.viewed),C=nt?.network,ve=C?.byId.get(et);B.current={model:nt,onSelect:d,onReorder:_,onBindSkill:M,onToggleLoop:y,onAddAfter:A,onOpenArtifact:b,onSkillInspect:S,onFocusChat:F};function Ne(O){W.current=K.current?.querySelector('[data-scene-step="'+CSS.escape(O)+'"]'),B.current.onSelect?.(O),Me(!0)}function Re(){Me(!1),requestAnimationFrame(()=>{W.current?.isConnected&&W.current.focus({preventScroll:!0})})}function he(O){let z=B.current.model?.network?.byId.get(O);if(z){if(W.current=K.current?.querySelector('[data-network-entity="'+CSS.escape(O)+'"]'),z.kind==="step"){Ce({key:xe,stageId:z.stepId,page:0,overview:!1}),Je(null),B.current.onSelect?.(z.stepId),Me(!0);return}if(z.kind==="engine"){Ce({key:xe,stageId:"__project__",page:0,overview:!1}),Je(O),Me(!0);return}if(z.origin==="activity"){let ce=B.current.model.network.presentation;Ce({key:xe,stageId:z.stepId||"__project__",page:ce.stageId===z.stepId?ce.page:0,overview:!1})}if(B.current.onSelect?.(z.stepId),z.kind==="artifact"&&z.availability==="file"){let ce=B.current.model.network.presentation;$.current?.follow(!1),Ce({key:xe,stageId:z.stepId,page:ce.stageId===z.stepId?ce.page:0,overview:!1}),$.current?.focus("step:"+z.stepId),B.current.onOpenArtifact?.(z.stepId,z.fileIndex,z.file);return}z.kind==="delivery"&&($.current?.follow(!1),Ce({key:xe,stageId:z.stepId||"__project__",page:0,overview:!1})),Je(O),Me(!0)}}function ae(){Ce({key:xe,stageId:null,page:0,overview:!0}),$.current?.home()}function Te(){fe||(Ce({key:xe,stageId:null,page:0,overview:!1}),Xe&&Xe!=="__project__"&&B.current.onSelect?.(Xe)),$.current?.follow(!fe)}function We(O){let z=C.presentation;$.current?.follow(!1),$.current?.focus(z.stageId?"step:"+z.stageId:"engine"),Ce({key:xe,stageId:z.stageId||"__project__",page:z.page+O,overview:!1})}i.useLayoutEffect(()=>{if(!K.current)return;let O=K.current,z,ce,He=!0;Y(null),Le("loading"),Me(!1),Je(null);try{z=t({host:O,compactHud:!0,onPick:Ne,onEntity:he,onFocusChat:()=>B.current.onFocusChat?.(),onState:Be=>{if(He&&(Be.renderer&&Le(Be.renderer),typeof Be.follow=="boolean"&&G(Be.follow),Be.manual&&B.current.model?.kind==="project")){let lt=B.current.model.network.presentation;lt.expanded&&Ce(ze=>ze.key===xe&&ze.stageId===(lt.stageId||"__project__")&&ze.page===lt.page&&!ze.overview?ze:{key:xe,stageId:lt.stageId||"__project__",page:lt.page,overview:!1})}},onError:Be=>He&&Y(Be),onReorder:(...Be)=>B.current.onReorder?.(...Be),onBindSkill:(...Be)=>B.current.onBindSkill?.(...Be),onToggleLoop:(...Be)=>{B.current.onToggleLoop?.(...Be),Ne(Be[0])},onAddAfter:Be=>{B.current.onAddAfter?.(Be),Me(!0)},onOpenArtifact:(...Be)=>B.current.onOpenArtifact?.(...Be),onSkillInspect:(Be,lt)=>{Ne(Be),B.current.onSkillInspect?.(Be,lt)}}),$.current=z,z.update(B.current.model||{nodes:[],activeCalls:[]});let rt=()=>{let Be=O.getBoundingClientRect();Be.width&&Be.height&&z.resize(Be.width,Be.height)};ce=new ResizeObserver(rt),ce.observe(O),rt(),s.has(xe)?z.restoreView(s.get(xe)):B.current.model?.kind==="project"&&(B.current.model.running||B.current.model.activeCalls?.length)?z.follow(!0):B.current.model?.kind==="project"?z.reveal(B.current.model.phase!=="completed"):z.home()}catch(rt){Y(rt.message),Le("error")}return()=>{He=!1,z&&(s.set(xe,z.captureView()),s.size>30&&s.delete(s.keys().next().value)),ce?.disconnect(),z?.dispose(),O.replaceChildren(),$.current=null}},[xe,ke]),i.useLayoutEffect(()=>{$.current?.update(nt||{nodes:[],activeCalls:[]})},[nt]),i.useEffect(()=>{$.current?.visible(!L)},[!!L]),i.useEffect(()=>{try{localStorage.setItem("metis.circuit.chat-width",String(Ke))}catch{}},[Ke]);function E(O){return Math.max(300,Math.min(620,(pe.current?.clientWidth||1200)-360,O))}let x=r("div",{className:"ic-chatGrip",role:"separator",tabIndex:0,"aria-label":"调整助手宽度","aria-orientation":"vertical","aria-valuenow":Ke,"aria-valuemin":300,"aria-valuemax":620,onPointerDown:O=>{O.button||(O.preventDefault(),k.current={x:O.clientX,width:Ke},O.currentTarget.setPointerCapture(O.pointerId))},onPointerMove:O=>{k.current&&De(E(k.current.width+k.current.x-O.clientX))},onPointerUp:O=>{k.current=null,O.currentTarget.releasePointerCapture(O.pointerId)},onPointerCancel:()=>{k.current=null},onKeyDown:O=>{["ArrowLeft","ArrowRight","Home","End"].includes(O.key)&&(O.preventDefault(),De(E(O.key==="Home"?300:O.key==="End"?620:Ke+(O.key==="ArrowLeft"?24:-24))))}}),I=c?.total||0,oe=c?.kind==="project",ie=c?.activities?.at(-1),_e=C?.byId.get("step:"+C.presentation.stageId),ye=C?.byId.get(C.activeId),J=ye?.kind==="step"?ye:C?.byId.get("step:"+ye?.stepId),X=C?.byId.get(C.latestId),Ae=ve?.origin==="activity"&&ve.stepId===C?.presentation.stageId?ve:ye?.origin==="activity"&&ye.stepId===C?.presentation.stageId?ye:fe&&X?.origin==="activity"&&X.stepId===C?.presentation.stageId?X:null,P=!!ye&&["running","processing"].includes(c?.phase),le=P&&(J?.stepId||null)===(_e?.stepId||null),ne=_e?"第"+(_e.index+1)+"步 · "+_e.title:"项目整体",Ee=(O,z,ce,He={})=>r("button",{type:"button",className:"ic-action",onClick:ce,...He},r(e,{name:z,size:14}),r("span",null,O)),Se=ve?r("div",{className:"in-entityDetail"},r("div",{className:"in-detailOrigin","data-origin":ve.origin},ve.origin==="configuration"?"本项目固定的流程设置":ve.origin==="activity"?"来自原生工具的实际调用记录":ve.origin==="delivery"?"来自本项目登记的交付记录":"本项目运行状态"),r("h2",null,ve.title),r("span",{className:"in-detailStatus","data-status":ve.status},ve.statusLabel),ve.stepId?r("p",{className:"in-detailOwner"},"所属大步骤 · 第"+(c.nodes.find(O=>O.id===ve.stepId)?.index+1)+"步 "+c.nodes.find(O=>O.id===ve.stepId)?.title):r("p",{className:"in-detailOwner"},"项目整体 · 未记录具体大步骤"),r("pre",{className:"in-detailText",tabIndex:0},ve.detail||"该记录未附文字详情。"),ve.characters?r("p",{className:"mc-note"},"步骤提示词共 "+ve.characters+" 字符；此处显示摘要，不预加载技能正文。"):null,ve.call?r("dl",null,r("dt",null,"工具"),r("dd",null,ve.call.tool),r("dt",null,"调用 ID"),r("dd",null,ve.callId),ve.call.startedAt?r(i.Fragment,null,r("dt",null,"开始"),r("dd",null,new Date(ve.call.startedAt).toLocaleString("zh-CN"))):null,typeof ve.call.exitCode=="number"?r(i.Fragment,null,r("dt",null,"退出码"),r("dd",null,String(ve.call.exitCode))):null):null,ve.call?.resultPreview&&ve.kind!=="result"?r(i.Fragment,null,r("h3",null,"实际回执"+(ve.call.resultTruncated?"（节选）":"")),r("pre",{tabIndex:0},ve.call.resultPreview)):null,ve.call?.feedback?.length?r(i.Fragment,null,r("h3",null,"核验反馈"),r("pre",{tabIndex:0},ve.call.feedback.join(`
`))):null,ve.kind==="artifact"&&ve.availability!=="file"?r("p",{className:"mr-error"},"登记路径当前不可预览："+ve.availability):null,r("div",{className:"in-detailActions"},ve.stepId?Ee("查看所属阶段","layers",()=>{Je(null),d?.(ve.stepId),$.current?.focus(ve.stepId)}):null,Ee("在助手中讨论","message",()=>F?.()))):null,Pe=i.useRef(null),V=i.useRef(null);re&&(Se||u)&&(Pe.current=Se||u),g&&p&&(V.current=p);let H=a(!!(re&&(Se||u))),Z=a(!!(g&&p)),ge=c?.kind==="mode"&&!Se;return r("div",{className:"ic-workspace",ref:pe,style:{"--ic-chat-width":Ke+"px"},"data-circuit-kind":c?.kind||"empty","data-circuit-key":xe,"data-phase":c?.phase||"empty"},r("style",null,fa+n),h,r("div",{className:"ic-body"},r("main",{className:"ic-stage","aria-label":"METIS 离子回路工作空间","data-inspector":H.visible,"data-palette":Z.visible},r("div",{className:"ic-world ion-world",ref:K,role:"group","data-graphics":Q,style:{visibility:se?"hidden":void 0},"aria-label":"可交互流程电路"}),r("div",{className:"ic-context"},r("span",{className:"ic-eyebrow"},oe?"RESEARCH / 实时研究":"COMPOSER / 流程编排"),r("h1",null,c?.name||c?.modeName||"METIS"),r("div",{className:"ic-metrics"},r("span",null,r("b",null,oe?c.delivered+" / "+I:I),oe?" 步已交付":" 个步骤"),r("i",null),r("span",null,r("b",null,oe?c.files:c?.bindingCount||0),oe?" 个交付文件":" 项技能绑定"),c?.loopCount?r("span",null,r("b",null,c.loopCount)," 个达标循环"):null),oe?r(o,{model:c}):null),r("div",{className:"ic-cameraTools",role:"group","aria-label":"画布操作"},Ee("全景","layers",ae),oe?Ee("跟随","activity",Te,{"aria-pressed":fe,disabled:c?.phase==="completed"}):Ee("新增步骤","plus",()=>{T?.(),Me(!0)},{disabled:!c?.editable||!T}),oe&&C?.heroId?Ee("打开成果","records",()=>he(C.heroId),{className:"ic-action in-openResult"}):D),oe&&C?.presentation.expanded?r("div",{className:"in-parentPath",role:"group","aria-label":"大步骤与子动作路径","data-parent-step-id":_e?.stepId||"","data-state":le?"running":"viewing"},r("span",{className:"in-pathState"},le?"正在执行":fe?"当前阶段":"正在查看"),r("strong",{title:ne},ne),r(e,{name:"chevron",size:13}),r("span",{className:"in-pathChild"},Ae?"子动作 "+(Ae.childIndex+1)+" · "+Ae.title:"本步 "+C.presentation.totalCalls+" 个子动作"),P&&!le?r("small",null,"执行中："+(J?"第"+(J.index+1)+"步 "+J.title:"项目整体")):null):null,oe&&C?.presentation.expanded&&C.presentation.totalCalls?r("nav",{className:"in-recordPager","aria-label":"当前阶段执行记录"},r("span",{title:ne},_e?"第"+(_e.index+1)+"步 · 子动作 ":"项目整体 · 子动作 ",r("b",null,C.presentation.start+"–"+C.presentation.end)," / "+C.presentation.totalCalls),Ee("较早记录","chevron",()=>We(1),{disabled:C.presentation.page>=C.presentation.pages-1,"aria-label":"较早的执行记录"}),Ee("较新记录","chevron",()=>We(-1),{disabled:C.presentation.page===0,"aria-label":"较新的执行记录"})):null,oe&&C?r("section",{className:"in-navigation","aria-label":"研究网络导航"},r("header",null,r("span",null,"编排大步骤"),r("b",null,C.counts.stages+" STEPS")),r("ol",{className:"in-stageTrunk","aria-label":"编排大步骤主干"},C.nodes.filter(O=>O.kind==="step").map(O=>{let z=O.active||P&&J?.stepId===O.stepId,ce=C.presentation.expanded&&C.presentation.stageId===O.stepId;return r("li",{key:O.id,"data-stage-id":O.stepId},r("button",{type:"button",className:"in-stageRoot","aria-label":"定位 研究阶段 "+O.title,"aria-pressed":ce,"data-executing":!!z,"data-viewed":ce,title:"第"+(O.index+1)+"步 · "+O.title+" · "+O.statusLabel,onPointerEnter:()=>$.current?.preview(O.id),onPointerLeave:He=>{document.activeElement!==He.currentTarget&&$.current?.preview(null)},onFocus:()=>$.current?.preview(O.id),onBlur:He=>{He.currentTarget.matches(":hover")||$.current?.preview(null)},onClick:()=>{$.current?.focus(O.id),he(O.id)}},r("span",{className:"in-stageIndex"},String(O.index+1).padStart(2,"0")),r("strong",null,O.title),r("small",null,z?"执行中":ce?"查看中":O.statusLabel)),ce?r("span",{className:"in-stageChildren"},"↳ 子动作 "+(C.presentation.totalCalls?C.presentation.start+"–"+C.presentation.end+" / "+C.presentation.totalCalls:"尚未开始")):null)})),r("div",{className:"in-networkCounts"},r("span",null,C.counts.calls+" 次实际调用"),r("span",null,C.counts.artifacts+" 项交付"))):null,!I&&!se?r("div",{className:"ic-empty"},q||r(i.Fragment,null,r("h2",null,"从一个步骤开始"),r("p",null,"直接描述目标，让 AI 和您一起搭建。"),T?Ee("添加步骤","plus",()=>{T(),Me(!0)}):null)):null,se?r("div",{className:"ic-fallback",role:"alert"},r("strong",null,"图形视图暂不可用"),r("p",null,se),Ee("重新初始化","refresh",()=>Ue(O=>O+1)),r("nav",{"aria-label":"流程节点"},c?.nodes.map(O=>r("button",{type:"button",key:O.id,"data-scene-step":O.id,"aria-pressed":O.viewed,onClick:()=>Ne(O.id)},String(O.index+1).padStart(2,"0")+" · "+O.title)))):null,H.visible?r("section",{className:"ic-inspector","data-inspector-kind":ge?"editor":"details",ref:O=>{O&&(O.inert=H.closing)},"data-presence":H.closing?"leaving":"open","aria-hidden":H.closing?!0:void 0,"aria-label":Se?"网络实体详情":oe?"所选步骤详情":"所选步骤编辑",onKeyDown:O=>{O.key==="Escape"&&!O.defaultPrevented&&(O.preventDefault(),Re())}},ge?r("button",{type:"button",className:"ic-inspectorClose","aria-label":"收起步骤编辑",title:"收起步骤编辑 · Esc",onClick:Re},r(e,{name:"close",size:16})):r("div",{className:"ic-drawerHead"},r("span",null,Se?Zu[ve.kind]:oe?"节点详情":"节点编辑",oe&&ue&&!Se?r("strong",null,String(ue.index+1).padStart(2,"0")+" · "+ue.title):null),Ee("收起","close",Re)),Pe.current):null,Z.visible?r("section",{className:"ic-palette",ref:O=>{O&&(O.inert=Z.closing)},"data-presence":Z.closing?"leaving":"open","aria-hidden":Z.closing?!0:void 0,"aria-label":v+"面板",onKeyDown:O=>{O.key==="Escape"&&!O.defaultPrevented&&(O.preventDefault(),m?.())}},r("div",{className:"ic-drawerHead"},r("span",null,v),Ee("关闭"+v,"close",m)),V.current):null,r("footer",{className:"ic-statusRail"},r("div",{className:"ic-statusText","data-phase":c?.phase},r("i",null),r("strong",null,c?.headline||"选择模式或研究项目"),r("small",{title:ie?.target||c?.target},ie?.target||c?.target)),r("div",{className:"ic-selection"},ue?Ee(String(ue.index+1).padStart(2,"0")+" · "+ue.title,"layers",()=>Me(O=>!O),{"aria-expanded":re}):r("span",null,"点击节点操作"),r("small",null,oe?"拖动环绕 · 滚轮缩放 · 点击文件预览":"拖动节点排序 · 拖入技能绑定"))),N||oe&&c?.blockedReason&&!c?.running?r("div",{className:"ic-notice",role:c?.blockedReason&&!c?.running?"alert":void 0},N,oe&&c?.blockedReason&&!c?.running?r(i.Fragment,null,r("strong",null,"本轮等待处理"),r("p",null,c.blockedReason)):null):null,L?r("section",{className:"ic-documentLayer","aria-label":"交付文档工作区"},L):null),x,r("div",{className:"ic-assistant"},f)),te)}return{Canvas:l,modeModel:ap,projectModel:op,reorder:lp,mergeProjectDelta:hp,mergeProjectFull:dp}}var vd=`/* METIS ION design system. Scoped to METIS; native DSH controls retain their behavior. */
body :is(.mm-workbench,.mm-panel.mc-panel,.mm-panel.mr-panel,.mdoc){
  --ion-void:#0b0910;--ion-panel:#151018;--ion-panel-raised:#1d141e;--ion-field:#100d15;
  --ion-copper:#ff9f64;--ion-gold:#ffcc91;--ion-border:#48303e;--ion-hairline:#352531;
  --ion-text:#f0e2dc;--ion-secondary:#bda4b2;--ion-dim:#a38999;--ion-success:#8ee0bd;--ion-danger:#ffac9c;
  --mm-bg:var(--ion-void);--mm-surface:var(--ion-panel);--mm-soft:#251923;--mm-line:var(--ion-border);
  --mm-ink:var(--ion-text);--mm-muted:var(--ion-secondary);--mm-accent:var(--ion-copper);--mm-cta-ink:#21110b;
  --mr-paper:var(--ion-void);--mr-rail:#100d15;--mr-rule:var(--ion-hairline);--mr-accent:var(--ion-copper);
  --mr-on-accent:#24120b;--mr-tint:#ff9f6413;
  color:var(--ion-text);color-scheme:dark;font-family:"Segoe UI","Microsoft YaHei UI","Microsoft YaHei",sans-serif;
}
.mm-workbench{height:100%;min-height:0;display:flex;flex-direction:column;background:var(--ion-void);position:relative;isolation:isolate}
.mm-workbench :is(button,input,textarea,select,summary){-webkit-app-region:no-drag}
.mm-workbench :is(button,input,textarea,select,summary):focus-visible{outline:2px solid var(--ion-gold);outline-offset:3px}
.mm-workbench :is(button,summary){touch-action:manipulation}
.mm-workbench ::selection{background:#bb6a4190;color:#fff5e8}
.mm-workbench *{scrollbar-width:thin;scrollbar-color:#815448 #110d16}
.mm-workbench ::-webkit-scrollbar{width:7px;height:7px}.mm-workbench ::-webkit-scrollbar-track{background:#110d16}.mm-workbench ::-webkit-scrollbar-thumb{background:#634048;border:2px solid #110d16;border-radius:8px}
.mm-panel.mc-panel,.mm-panel.mr-panel{background:var(--ion-void);overflow:hidden}
.mc-shell,.mr-shell{position:relative;isolation:isolate;background:radial-gradient(ellipse at 6% -20%,#d16c3420,transparent 48%),radial-gradient(ellipse at 90% 100%,#6e376215,transparent 50%),var(--ion-void)}
.mc-panel .mc-shell{min-width:0!important;padding:0!important;gap:0!important;height:100%;max-width:none;width:100%;margin:0}.mc-workspace>.mc-grid.has-assistant{border:0!important;border-radius:0!important}
.mc-top,.mr-consoleBar,.ion-loadingBar{height:62px;min-height:62px;display:flex;align-items:center;gap:14px;padding:0 20px;border-bottom:1px solid #674338;background:linear-gradient(105deg,#24151e,#141019 55%,#100d16);position:relative;z-index:8;flex:none}
.mc-top::after,.mr-consoleBar::after{content:'';position:absolute;left:0;bottom:-1px;width:32%;height:1px;background:linear-gradient(90deg,#ffb77c,transparent);pointer-events:none}
.mc-brand,.mr-consoleBrand{display:flex;align-items:center;gap:9px;flex:none;color:#ffddbc}
.mc-brand h1,.mr-consoleBrand strong{font:650 17px/1.1 "Segoe UI",sans-serif;letter-spacing:.16em;margin:0;color:#ffe8d5}
.mc-logo,.mr-consoleMark{width:32px;height:32px;display:grid;place-items:center;border:1px solid #a06b4c;background:linear-gradient(145deg,#4a291e,#20131a);border-radius:5px;box-shadow:inset 0 1px 0 #ffe6c51a,0 0 20px #c77b3320;color:#ffc792}
.mc-modeToggle{margin:0 0 0 1px;padding:5px 3px!important}.mm-switch{background:#58404b!important}.mm-theme[aria-checked=true] .mm-switch{background:#d28a54!important;box-shadow:0 0 12px #ec8d3733}.mm-switch::after{background:#f5d9c3!important}
.mm-workspaceTabs{display:flex;align-items:center;gap:3px;padding:3px;border:1px solid #533744;border-radius:5px;background:#0d0a12;flex:none;position:relative}
.mm-workspaceTabs [role=tab]{min-height:31px;padding:5px 14px;border:0;border-radius:3px;background:transparent;color:#c4a8b4;font:500 12px/1.4 "Segoe UI","Microsoft YaHei UI",sans-serif;cursor:pointer;white-space:nowrap;transition:color .15s,background .15s,box-shadow .15s}
.mm-workspaceTabs [role=tab]:hover{color:#ffe2cb;background:#412522}.mm-workspaceTabs [aria-selected=true]{color:#ffd2a6;background:linear-gradient(145deg,#603725,#35201f);box-shadow:inset 0 0 0 1px #ac714c66,0 0 15px #d2783020}
.mm-workspaceContent{flex:1;min-height:0;overflow:hidden}.ion-loadingBar{justify-content:flex-start}.ion-loadingBar .mm-workspaceTabs{margin-left:12px}
.mc-modeField{display:flex;align-items:center;gap:9px;flex:1;min-width:180px}.mc-modePicker{min-width:150px;max-width:340px;flex:1}.mc-modeTrigger{height:34px;border-radius:4px!important;border:1px solid #76503f!important;background:linear-gradient(110deg,#2a1920,#171018)!important;color:#f3d4c2!important;font-size:12px!important;box-shadow:inset 0 1px 0 #f6c79c08}
.mc-modeTrigger[aria-expanded=true]{border-color:#f3a366!important;box-shadow:0 0 0 2px #ed9d5120}.mc-modeField>.mm-button{min-height:34px;padding:5px 10px}.mc-saveState{font-size:10px;display:inline-flex;align-items:center;gap:5px;white-space:nowrap;color:#b8a0ac}.mc-saveState::before{content:'';width:4px;height:4px;border-radius:50%;background:#81bd9e}.mc-saveState.is-dirty{color:#f5c08e}.mc-saveState.is-dirty::before{background:#ffb66e;box-shadow:0 0 8px #f7a24760}
.mc-topTools{display:flex;align-items:center;gap:7px;flex:none}.mm-panel :is(.mm-button,.mc-iconButton,.mc-mini,.mr-action,.mr-start,.mr-historyToggle,.mdoc-save){border-radius:4px;font-family:inherit;transition:background-color .16s,border-color .16s,box-shadow .16s,color .16s,transform .12s}
.mm-panel .mm-button{min-height:34px;padding:6px 12px;font-size:12px;border:1px solid #60404a;background:linear-gradient(140deg,#2b1c25,#1c141f);color:#e4c9c8;box-shadow:inset 0 1px 0 #ffe2ce08}
.mm-panel .mm-button:hover:enabled{background:#41271f;border-color:#bc8059;color:#ffe2c6;box-shadow:0 0 18px #f49b3d13}.mm-panel .mm-button:active:enabled{transform:translateY(1px);background:#513022}
.mm-panel .mm-button.mm-primary,.mdoc .mdoc-save:enabled{background:linear-gradient(135deg,#ffd098,#ed9b61);border-color:#ffd6a3;color:#2d170e;font-weight:650;box-shadow:inset 0 1px 0 #fff0cf88,0 0 20px #ed973928}
.mm-panel .mm-button.mm-primary:hover:enabled,.mdoc .mdoc-save:hover:enabled{filter:brightness(1.07);box-shadow:0 0 25px #efa65340}.mm-panel button:disabled{cursor:default;opacity:.43;filter:saturate(.5);box-shadow:none}
.mm-panel :is(.mc-iconButton,.mc-mini,.mr-iconButton){background:#241822;color:#c6a0a6;border:1px solid #533441;border-radius:4px}.mm-panel :is(.mc-iconButton,.mc-mini,.mr-iconButton):hover:enabled{background:#422620;color:#ffd0a4;border-color:#c38458}
.mm-panel :is(.mc-moreMenu,.mc-modeMenu,.mc-modeDialog,.mr-dialog){border:1px solid #9c674d;background:linear-gradient(140deg,#2b1923,#140e18);box-shadow:0 20px 80px #0009,0 0 30px #f2943310;border-radius:7px}
.mc-modeMenu{padding:7px;animation:ion-pop-in .16s ease-out both}.mc-modeSearch{border:1px solid #77503f!important;background:#130d15!important;color:#f0dbd3!important;border-radius:4px!important}.mc-modeRow{border-bottom:1px solid #442b37}.mc-modeRow:last-child{border-bottom:0}.mc-modeOption{color:#d5b6bb}.mc-modeOption[aria-pressed=true]{background:#e3944b18!important;color:#ffd2a5!important}.mc-modeGrip{border:0!important;background:transparent!important;cursor:grab}.mc-modeOption>svg{color:#e9a569}
.mc-workspace{padding:0!important;min-height:0}.mc-grid{gap:0!important;background:#0e0b13;border:0!important;border-radius:0!important;overflow:hidden;isolation:isolate}
.mc-flow,.mc-editor,.mc-assistant{border-radius:0!important;min-height:0;position:relative;box-shadow:none!important}.mc-flow{background:linear-gradient(105deg,#161019,#100d15)!important}.mc-editor{background:linear-gradient(145deg,#171019,#100d15 65%)!important}.mc-assistant{background:#110d16!important}
.mc-columnHeader{min-height:66px;padding:12px 18px;border-bottom:1px solid #51313c;background:linear-gradient(110deg,#2b1820b3,#1a121b)}.mc-columnHeader h2{font-size:14px;line-height:1.5;font-weight:600;letter-spacing:.02em;color:#f4d7c8}.mc-columnHeader .mc-caption{color:#c68e74;font:10px/1.5 ui-monospace,"Microsoft YaHei UI",monospace;letter-spacing:.07em}.mc-columnHeader::before{content:'';position:absolute;top:0;left:0;width:14px;height:14px;border-top:1px solid #a76d49;border-left:1px solid #a76d49;pointer-events:none;opacity:.75}
.mc-flowSummary{padding:10px 16px;font-size:10px;color:#b897a4;border-bottom:1px solid #3b2632;letter-spacing:.02em}.mc-stepNav{padding:13px 10px 18px;gap:5px}.mc-workflowNav{position:relative}.mc-workflowNav::before{content:'';position:absolute;left:35px;top:25px;bottom:35px;width:1px;background:linear-gradient(#d48a5580,#663e4380);pointer-events:none}
.mc-stepRow{position:relative;border:1px solid transparent!important;border-radius:5px!important;background:transparent;transition:background .16s,border-color .16s,box-shadow .16s,transform .16s}.mc-stepRow:hover{background:#4f2c281f!important;border-color:#80513f!important}.mc-stepRow.is-current{border-color:#be815b!important;background:linear-gradient(110deg,#61362370,#2e1a22)!important;box-shadow:inset 2px 0 0 #ffc58b,0 0 22px #d98e3812}
.mc-stepChoice{min-height:70px;padding:12px 10px!important;text-align:left!important;gap:10px!important;background:transparent!important}.mc-stepIndex{width:29px;height:29px;border-radius:4px!important;border:1px solid #7c4f40;background:#22141d!important;color:#d8a282;font:12px/1 ui-monospace,monospace;z-index:1}.is-current .mc-stepIndex{background:linear-gradient(135deg,#fac28b,#b76f45)!important;color:#28120d!important;border-color:#f7c18a!important;box-shadow:0 0 13px #df9a3540}.mc-stepLabel strong{font-size:12px!important;line-height:1.6;color:#eed6ce}.mc-stepLabel small{font-size:10px;color:#bc96a4;margin-top:3px}.mc-stepGrip{width:18px!important;min-width:18px!important;padding:2px!important;border:0!important;background:transparent!important;color:#9d737e!important;cursor:grab}
.mc-stepRow[data-dragging=true]{opacity:.4;transform:scale(.98)}.mc-stepRow[data-drop-edge=before]::before,.mc-stepRow[data-drop-edge=after]::after{background:#ffc078!important;box-shadow:0 0 12px #ffae5b80}.mc-flowFoot{padding:13px 15px;color:#aa899a;font-size:10px;line-height:1.8;border-top:1px solid #412936;background:#120d16}
.mc-paneDivider,.mc-split{background:#38232d!important;transition:background .15s,box-shadow .15s}.mc-paneDivider:hover,.mc-paneDivider:focus-visible,.mc-split:hover,.mc-split:focus-visible{background:#bc794c!important;box-shadow:0 0 12px #d88d4740}
.mc-content{padding:24px clamp(20px,3vw,58px)!important;scrollbar-gutter:stable}.mc-simpleStep{width:100%;max-width:1020px;margin:0 auto;display:grid;gap:20px!important}.mc-field{margin:0!important;min-width:0;position:relative}.mc-label{font-size:12px;font-weight:550;letter-spacing:.025em;color:#d6ac95;margin-bottom:8px;line-height:1.5}.mc-fieldHeader{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:8px}.mc-fieldHeader>.mc-label{margin:0}.mc-field small,.mc-note{color:#b898a8;font-size:11px;line-height:1.8}
.mc-panel :is(.mc-field input:not([type=checkbox]):not([type=radio]),.mc-field textarea,.mc-field select,.mc-skillSearch input,.mc-skillSearch select){box-sizing:border-box;width:100%;padding:10px 12px;border:1px solid #5a3845;border-radius:4px!important;background:#100c14!important;color:#eddbd6!important;font:13px/1.8 "Segoe UI","Microsoft YaHei UI",sans-serif;transition:border-color .18s,box-shadow .18s,background .18s;box-shadow:inset 0 1px 5px #0003}
.mc-panel :is(.mc-field input:not([type=checkbox]),.mc-field textarea,.mc-field select):hover{border-color:#a36a4d}.mc-panel :is(.mc-field input:not([type=checkbox]),.mc-field textarea,.mc-field select):focus{outline:none;border-color:#f2b47a!important;box-shadow:0 0 0 2px #e8914820,0 0 20px #ed8d2f12}
.mc-field textarea{min-height:64px!important;field-sizing:content;resize:vertical!important;max-width:100%;font-size:13px!important;line-height:1.85!important}.mc-field textarea[aria-label="步骤提示词"]{min-height:148px!important}.mc-field textarea[aria-label="禁止事项"]{min-height:62px!important;border-inline-start:2px solid #b07173;background:#1e1119!important}.mc-field textarea::placeholder{color:#96758a;opacity:1}.mc-field[data-ion-changed=true]{animation:ion-field-change 2.6s ease-out both}.mc-loopToggle{gap:7px;font-size:10px;color:#cca58c;cursor:pointer}.mc-loopToggle strong{font-size:11px;font-weight:500}.mc-loopToggle input{accent-color:#f2ab70}.mc-loopOptions,.mc-finalOutput{padding:12px;margin-top:9px;border:1px solid #77513b;border-left:2px solid #f0b676;background:#4c2d191f;border-radius:4px}.mc-finalOutput .mc-field+.mc-field{margin-top:12px!important}
.mc-field[data-ion-field=skills]>.mc-fieldHeader{justify-content:flex-start;gap:10px}.mc-field[data-ion-field=skills]>.mc-fieldHeader .mm-button{min-height:26px;padding:3px 8px;font-size:10px}.mc-stepFieldset{animation:ion-drawer-in .18s ease-out both}.mc-aiChangeNotice{display:flex;gap:7px;align-items:center;color:#b6e0c0;border-left:2px solid #84d9aa;background:#63844914;padding:8px 11px;margin:0 auto 15px;max-width:1020px;font-size:11px;animation:ion-pop-in .18s ease-out}
.mc-boundSkills{gap:7px!important;margin:0!important}.mc-boundSkill{display:inline-flex;align-items:center;gap:9px;padding:7px 10px;border:1px solid #96694b;background:linear-gradient(120deg,#53332390,#2a1a23);color:#f0d5bd;border-radius:4px;font-size:11px}.mc-boundSkill::before{content:'';width:4px;height:4px;background:#ffb87a;box-shadow:0 0 8px #fa9f4a60}.mc-boundSkill .mc-mini{border:0;background:transparent;color:#bf9a9d;font-size:10px;padding:1px 3px;min-height:20px}.mc-boundSkill:hover{border-color:#f4b473}.mc-stepSkillPicker{margin-top:12px;padding:15px;border:1px solid #9f6a4c;background:linear-gradient(140deg,#2b1721,#140f19);border-radius:5px;box-shadow:0 14px 35px #0005;animation:ion-drawer-in .2s ease-out both}.mc-skillCard{border:1px solid #603d48!important;border-radius:4px!important;background:#21141e!important;padding:10px!important}.mc-skillCard:hover{border-color:#cf9169!important;background:#3d241f!important}.mc-skillCard:has(input:checked){border-color:#f6b678!important;background:#4e2e23!important}.mc-skillCard input{accent-color:#f1ae73}
.mc-modeDefaults{border:1px solid #50323e;border-radius:4px;padding:10px 12px;background:#1b111b;margin-top:14px}.mc-modeDefaults>summary{font-size:11px;color:#c49a91;cursor:pointer}.mc-modeDefaults[open]{border-color:#986342}.mc-readonlyText{background:#0d0a12!important;color:#d2b5bf!important;font:12px/1.85 ui-monospace,"Microsoft YaHei UI",monospace!important}
.mc-managementNav{background:#110d16!important}.mc-managementItem,.mc-skillEntry{border:1px solid transparent;border-radius:4px;color:#d2b7c0;transition:background .15s,border-color .15s}.mc-managementItem:hover,.mc-skillEntry:hover{background:#3b2424;border-color:#936344}.mc-managementItem[aria-pressed=true],.mc-skillEntry[aria-pressed=true]{color:#ffd2a6;background:#5f382a66;border-color:#c78a5c}.mc-searchResults{margin-top:12px}.mc-skillSearch{padding:0 0 15px;border-bottom:1px solid #50333f}.mc-skillEntry{padding:13px!important;background:#21141e!important}.mc-skillEntry strong{color:#f2d7ca}.mc-skillEntry small{color:#c49aa9}.mc-libraryIntro{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:18px;border:1px solid #815340;background:linear-gradient(110deg,#47271f66,#21121e);border-radius:5px;margin-bottom:18px}.mc-libraryIntro strong{font:350 28px/1 "Segoe UI",sans-serif;color:#ffd5ac}.mc-libraryIntro p{margin:6px 0 0;color:#c19daa;font-size:11px}.mc-libraryIntro .mc-caption{font-size:10px;letter-spacing:.12em;color:#d4a281}.mc-skillResource{border:1px solid #6a424c;background:#140d17;border-radius:5px;padding:16px;margin-top:18px}
.mc-libraryEntries{max-height:none!important;overflow:visible!important;display:grid!important;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:12px!important;margin-top:18px}.mc-libraryEntries .mc-libraryEntry{display:flex!important;flex-direction:column;align-items:stretch;justify-content:flex-start;text-align:left;min-width:0;min-height:155px;white-space:normal;padding:15px!important;position:relative;background:linear-gradient(140deg,#2c1823,#19101b)!important;border:1px solid #7f5147;gap:7px;border-radius:5px!important;transition:transform .18s,border-color .18s,box-shadow .18s}.mc-libraryEntry::before{content:'SKILL MODULE';font:8px/1.3 ui-monospace,monospace;letter-spacing:.13em;color:#c18b6d}.mc-libraryEntries .mc-libraryEntry:hover:enabled{transform:translateY(-2px);border-color:#eeb078;box-shadow:0 8px 25px #0005,0 0 18px #b96f2612}.mc-libraryEntry[aria-pressed=true]{border-color:#ffca8a!important;background:linear-gradient(140deg,#71452b77,#2b1822)!important;box-shadow:inset 2px 0 0 #ffc58a}.mc-libraryEntry strong{font-size:13px;color:#f2d4c5;font-weight:550;overflow-wrap:anywhere}.mc-libraryEntry small{font-size:9px;color:#b68e9f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-libraryEntry p{font-size:11px;line-height:1.75;color:#c9a9b5;margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.mc-libraryEntry small:last-child{color:#d3a681;margin-top:auto;padding-top:7px;border-top:1px solid #603b43}
.mc-skillInspector{position:absolute;top:66px;bottom:48px;right:0;width:min(540px,94%);z-index:6;display:flex;flex-direction:column;background:linear-gradient(140deg,#291620,#130e18);border-left:1px solid #bd825b;box-shadow:-18px 0 55px #0008;animation:ion-inspector-in .22s ease-out both}.mc-skillInspector>.mc-columnHeader{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:67px;flex:none}.mc-skillInspector>.mc-columnHeader>div{min-width:0}.mc-skillInspector h2{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-skillInspectorBody{flex:1;min-height:0;overflow:auto;padding:18px}.mc-skillInspectorBody .mc-field{margin-bottom:16px!important}.mc-skillInspectorBody .mc-actions{gap:5px;margin-top:12px}.mc-skillInspectorBody .mm-button{font-size:10px;min-height:28px;padding:5px 8px;white-space:normal}.mc-skillInspectorBody .mc-resourceInfo{overflow-wrap:anywhere;white-space:pre-wrap;font-size:10px;line-height:1.75;color:#d0acbb}
.mc-editorFooter{min-height:48px;padding:9px 18px;background:linear-gradient(100deg,#24151c,#161019);border-top:1px solid #53323a;gap:10px}.mc-editorFooter .mc-caption{color:#b48e9e;font-size:10px}.mc-editorFooter .mm-button{min-height:29px;padding:4px 12px;font-size:11px}
.mc-assistantHeader{padding:12px 17px;min-height:66px}.mc-assistantTitle h2{color:#ffe0c6;font-size:13px;letter-spacing:.03em}.mc-assistantDot[data-state=ready]{background:#91d9b3;box-shadow:0 0 9px #83d5a34d}.mc-assistantDot[data-state=running]{background:#ffba73;box-shadow:0 0 12px #fba25266}.mc-assistantDot[data-state=error]{background:#f6a496}.mc-connectionLabel{color:#bba0a8;font-size:10px}.mc-assistantHeading .mc-caption{color:#bd8e89;font-size:10px}.mc-assistantNotice,.mc-assistantSync{border-radius:4px;margin:10px 12px;padding:10px 12px;border:1px solid #694137;background:#37211f70;color:#dfb39d;font-size:11px}.mc-assistantNotice.is-error{border-color:#a66563;background:#4e272a50;color:#ffbdb0}.mc-assistantSync{border-inline-start:2px solid #f6b16d}.mc-configWelcome{min-height:0;padding:40px 25px 20px;background:radial-gradient(ellipse at top,#a2642825,transparent 70%)}.mc-configWelcomeMark{width:52px;height:52px;border:1px solid #b77b54;background:#56321f44;box-shadow:0 0 42px #ed913c18;color:#ffd5a6}.mc-configWelcome h3{font-size:19px;font-weight:500;letter-spacing:.02em;color:#ffe0c7}.mc-configWelcome p{color:#b995a6;font-size:12px;line-height:1.8}.mc-quickPrompts{gap:6px;padding:14px 17px}.mc-quickPrompts button{background:#2b1822;border:1px solid #76503e;color:#e8c2ad;border-radius:4px;font-size:11px;padding:7px 10px}.mc-quickPrompts button:hover:enabled{background:#533122;border-color:#e7ac72;color:#ffe5cc}
:is(.mc-assistant,.mr-chat){--dsw-alias-bg-base:#110d16;--dsw-alias-bg-layer-1:#19111c;--dsw-alias-bg-layer-2:#271925;--dsw-alias-bg-overlay:#0a0710b0;--dsw-alias-border-l1:#63414e;--dsw-alias-border-l2:#8c5a58;--dsw-alias-brand-primary:#efaa76;--dsw-alias-label-primary:#f0e0db;--dsw-alias-label-secondary:#c0a3b5;--dsw-alias-state-error-primary:#ffb0a2;--dsw-alias-state-success-primary:#90ddba;color:#edddd7;color-scheme:dark}
:is(.mc-nativeConversation,.mr-chatBody){background:radial-gradient(ellipse at 65% 0,#74482a10,transparent 60%),#110d16}.mc-nativeConversation [data-conversation-content],.mr-chatBody [data-conversation-content]{--dsh-composer-text-max-height:30vh;color:#ecdad8}.mc-nativeConversation [data-composer-seat],.mr-chatBody [data-composer-seat]{background:#130e18!important;border-top:1px solid #4a2d3a;padding:12px 14px!important}.mc-nativeConversation [data-composer-seat] textarea,.mr-chatBody [data-composer-seat] textarea{color:#f5e4df!important}.mc-assistantPending{background:transparent;color:#c19eae;font-size:12px;min-height:180px}.mc-assistantPending .mm-button{margin-top:8px}
.mc-toast{position:absolute;right:18px;top:72px;max-width:min(580px,70%);z-index:30;border:1px solid #bb8257;background:#302019eb;backdrop-filter:blur(12px);color:#f9d5b5;border-radius:5px;box-shadow:0 12px 45px #0007;animation:ion-pop-in .2s ease-out both}.mc-toast.is-error{border-color:#bc797c;background:#391d2aeb;color:#ffc9c0}.mc-saveState.is-justSaved{color:#a6e0bc;animation:ion-save-confirm 1.8s ease-out}
.mr-consoleBar{gap:13px}.mr-consoleBar .mm-workspaceTabs{margin-right:4px}.mr-consolePicker{display:flex;align-items:center;gap:8px;min-width:100px;max-width:390px;flex:1}.mr-consolePicker select{width:100%;height:34px;border:1px solid #79513e;background:#22141d;border-radius:4px;padding:5px 30px 5px 11px;color:#f2d7c7;font:12px/1.5 inherit}.mr-consoleTools{display:flex;gap:7px;margin-left:auto;align-items:center}.mr-consoleIndicator{color:#bda0ad;font-size:10px;white-space:nowrap}.mr-consoleIndicator b{color:#ffd19f;font-size:12px;font-weight:500}
.mr-layout{background:#100c14;gap:0}.mr-layout[data-rail-open=false]{--mr-rail-size:0px}.mr-layout[data-rail-open=false] .mr-projectNav{visibility:hidden;overflow:hidden;border:0;pointer-events:none}.mr-projectNav{background:linear-gradient(110deg,#191019,#100c15);border-inline-end:1px solid #63402e}.mr-navHead{border-bottom:1px solid #54313c;background:#24141e99}.mr-brand h1{font-size:12px;letter-spacing:.03em;color:#dab6a4}.mr-projectList{padding:12px 9px;gap:7px}.mr-projectList .mr-projectSelect{border:1px solid #4b2d3c;background:#1b111c;border-radius:4px;padding:12px 10px}.mr-projectList .mr-projectSelect:hover{border-color:#b07951;background:#35201f}.mr-projectList .mr-projectSelect[aria-pressed=true]{border-color:#cb9265;background:linear-gradient(120deg,#59332177,#25151f);box-shadow:inset 2px 0 0 #ffc58e}.mr-projectList .mr-projectSelect[aria-pressed=true]::before{display:none}.mr-projectList strong{font-size:12px;color:#f1d7ce}.mr-projectList small{font-size:10px;color:#c29aa8}.mr-projectList .mr-projectSelect>svg{color:#d6a172}
.mr-projectInner{max-width:none;padding:20px 22px 26px;background:radial-gradient(ellipse at 15% -15%,#ba62201a,transparent 55%)}.mr-projectHeader{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:17px}.mr-projectHeader h2{font-size:20px;font-weight:550;color:#f5dcca;letter-spacing:.015em;margin:0 0 7px}.mr-meta{gap:12px;font-size:10px;color:#b28e9e}.mr-projectHeader .mr-meta{justify-content:flex-end;max-width:52%;flex-wrap:wrap}.mr-meta svg{color:#c98761}.mr-split{background:#50313b}.mr-split:hover,.mr-split:focus-visible{background:#c48252;box-shadow:0 0 12px #cf915d4d}
.mr-chat{border-left:1px solid #6b4338;background:#110c16}.mr-chatHeader{min-height:58px;padding:12px 17px;background:linear-gradient(110deg,#2e1920,#1b111c);border-bottom:1px solid #56303e}.mr-chatHeader h2{font-size:13px;color:#ffddc5}.mr-chatIdentity>svg{color:#efad79}.mr-chatStatus{font-size:10px;color:#c19fa9}.mr-chatStatus[data-state=ready]{color:#a7ddbc}.mr-chatStatus[data-state=running]{color:#ffd08b}.mr-chatContext{background:#24141d;color:#d9aa91;border-bottom:1px solid #634033;padding:9px 16px;font-size:11px}.mr-chatWelcome{padding:35px 20px 18px;background:radial-gradient(ellipse at top,#87451c20,transparent 75%)}.mr-chatWelcome h3{color:#f2d5c2;font-size:19px;font-weight:450}.mr-welcomeMark{background:#38201d;border:1px solid #956546;color:#fbc58d;box-shadow:0 0 35px #d17b2520}.mr-panel .mr-start{background:#3b231f;color:#ffd4ac;border-color:#9e6e4b}.mr-panel .mr-start:hover:enabled{background:#5a3421;border-color:#e7ae73}
.mr-projectViews{display:flex;align-items:center;gap:4px;padding:4px;background:#110b15;border:1px solid #624034;border-radius:5px;margin-bottom:16px;width:fit-content}.mr-projectViews button{border:0;padding:7px 16px;border-radius:3px;background:transparent;color:#b996a5;font-size:11px;display:flex;align-items:center;gap:7px}.mr-projectViews button[aria-pressed=true]{background:linear-gradient(120deg,#673c27,#3d231f);color:#ffd4a5;box-shadow:inset 0 0 0 1px #b27c4c70}.mr-projectViews button:hover{color:#ffe6d0}
.mr-stepInspector{margin-top:20px;padding:16px 18px 4px;border:1px solid #79513c;background:linear-gradient(145deg,#21121d,#140d17);border-radius:5px;position:relative}.mr-stepInspector::before{content:'';position:absolute;top:-1px;left:-1px;width:17px;height:17px;border-top:2px solid #d99b64;border-left:2px solid #d99b64;pointer-events:none}.mr-workflowHead{gap:12px;margin-bottom:12px}.mr-workflowHead h3{font:500 12px/1.5 "Segoe UI","Microsoft YaHei UI",sans-serif;letter-spacing:.06em;color:#d8ac91}.mr-progress{font-size:10px;color:#c198a3}.mr-progressTrack{background:#3c2634}.mr-progressTrack i[data-done=true]{background:#e9ad72;box-shadow:0 0 8px #d98d4330}
.mr-stepRail{display:flex;gap:6px;overflow:auto;padding:0 0 12px;scrollbar-width:thin}.mr-stepRail button{flex:0 0 auto;max-width:250px;display:flex;align-items:center;gap:7px;min-height:32px;padding:6px 10px;border:1px solid #634149;border-radius:4px;background:#1c111c;color:#b99aa8;font-size:11px;white-space:nowrap}.mr-stepRail button span{color:#d49a74;font:10px ui-monospace,monospace}.mr-stepRail button strong{overflow:hidden;text-overflow:ellipsis;font-weight:500}.mr-stepRail button[aria-pressed=true]{background:#643b294d;border-color:#ce9564;color:#ffddba}.mr-stepRail button[data-executing=true] span{color:#ffe1a5;text-shadow:0 0 9px #ffc66f}
.mr-steps{margin:0;padding:0;list-style:none}.mr-steps li{border:0!important;border-top:1px solid #5c3540!important;border-radius:0!important;background:transparent!important}.mr-steps details[open]{border-radius:0!important;background:transparent!important}.mr-steps summary{padding:13px 2px;min-height:46px}.mr-steps summary>strong{font-size:13px;color:#edd0bf}.mr-stepNumber{border-radius:4px;border-color:#9c6a43;color:#edbd8a;background:#37201d}.mr-stepBody{padding:0 0 14px 0;font-size:12px;line-height:1.85;color:#d2b3bc;animation:ion-drawer-in .2s ease-out both}.mr-purpose{padding:10px 13px;border-left:2px solid #ba8053;background:#3e251e33;margin-bottom:14px}.mr-stepBody h4{color:#c58c74;font-size:10px;font-weight:550;letter-spacing:.04em}.mr-stepActions{margin-top:10px;gap:7px}.mr-panel .mr-action{background:#2b1921;border-color:#77503b;color:#edc5a6;font-size:11px}.mr-panel .mr-action:hover:enabled{background:#4d2d20;border-color:#d99e68}.mr-stepStatus{font-size:10px;color:#c29aa8}.mr-stepStatus[data-status=submitted]{color:#9dddba}.mr-output{border-top:1px solid #50303b;padding-top:12px}.mr-outputText{background:#100b14;border:1px solid #4e2f3e;padding:12px;border-radius:4px;color:#e1c7c7}.mr-artifacts{gap:6px}.mr-artifact{border:1px solid #6d483d;border-radius:4px;background:#28171f;padding:9px 11px}.mr-artifact button{color:#f4cda9}.mr-artifact small,.mr-time{color:#ab8799;font-size:10px}.mr-history{background:#140d17;border:1px solid #76503b;border-radius:5px;padding:13px;margin-top:12px}.mr-decision{background:linear-gradient(125deg,#54301f66,#24141e);border:1px solid #ba8753;border-radius:4px;margin:10px;padding:12px;color:#ebc29f;font-size:12px}.mr-decision button{border-radius:4px}
.mr-deliverableShelf{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));gap:13px;animation:ion-drawer-in .22s ease-out both}.mr-deliveryCard{padding:17px;border:1px solid #82573e;background:linear-gradient(130deg,#39201880,#18101b);border-radius:5px;min-width:0}.mr-deliveryCard header{display:flex;align-items:center;gap:8px;margin-bottom:10px;color:#f3cfaf;font-size:12px}.mr-deliveryCard header>span{font:11px ui-monospace,monospace;color:#cf9670}.mr-deliveryCard p{font-size:11px;line-height:1.8;color:#c0a1ae;white-space:pre-wrap;max-height:180px;overflow:auto}.mr-deliveryCard .mr-emptyReceipt{font-size:11px;color:#b28c9f}.mr-deliveryCard .mr-action{max-width:100%;overflow:hidden;text-overflow:ellipsis;justify-content:flex-start}.mr-deliveryCard footer{display:flex;gap:7px;flex-wrap:wrap;padding-top:10px;margin-top:10px;border-top:1px solid #5f3b3c}
.mr-live,.mr-stepActivity{background:#17101a;border-color:#63413c;border-radius:4px;color:#d6b3bc}.mr-liveHeadline{color:#f3c69f}.mr-callDetail{background:#100b14;border:1px solid #80513f;border-radius:4px}.mr-activityItem{border-color:#53303e}.mr-activityItem[data-status=failed],.mr-activityItem[data-status=cancelled]{border-color:#a76d63}.mr-activityItem time{font-size:10px;color:#b48a9e}
.mdoc{background:var(--ion-void)!important;color:var(--ion-text)}.mdoc>header{min-height:60px;background:linear-gradient(100deg,#301b21,#1a111d);border-bottom:1px solid #815239;padding:12px 18px}.mdoc>header strong{font-size:14px;font-weight:550;color:#f7d9bf}.mdoc .mdoc-icon{border:1px solid transparent;color:#d8af9c;border-radius:4px;font-size:11px;padding:6px 9px;transition:background .15s,border-color .15s,color .15s}.mdoc .mdoc-icon:hover:enabled{border-color:#a9774c;background:#4a2b20;color:#ffdfb9}.mdoc-toolbar{background:#21131e;border-color:#65403c;padding:10px 18px}.mdoc-tabs{border-color:#8b5d42;background:#120c16;border-radius:4px;padding:3px}.mdoc-tabs button{border-radius:2px;font-size:11px;padding:6px 14px;color:#c29ba9}.mdoc-tabs button[aria-pressed=true]{background:#71432966;color:#ffd6a7}.mdoc .mdoc-save{font-size:11px;border-radius:4px;padding:6px 14px}.mdoc-body{padding:26px;background:radial-gradient(ellipse at 50% 0,#8850261f,transparent 75%),repeating-linear-gradient(0deg,#321b2a18 0,#321b2a18 1px,transparent 1px,transparent 32px),#100b14}.mdoc-page{box-shadow:0 16px 70px #0009,0 0 0 1px #c4967945;max-width:100%;border-radius:1px}.mdoc-blocks{gap:16px;max-width:930px}.mdoc-block>span{color:#c58d7a;font:10px/1.7 ui-monospace,"Microsoft YaHei UI",monospace;letter-spacing:.04em}.mdoc-block textarea{border:1px solid #76503e;background:#1e121c;color:#e9d0d2;border-radius:4px;padding:13px;font:13px/1.9 "Segoe UI","Microsoft YaHei UI",sans-serif;transition:border-color .16s,box-shadow .16s}.mdoc-block[data-changed=true] textarea{border-color:#f5b174;box-shadow:inset 2px 0 0 #f5b174,0 0 18px #d78c3718}.mdoc-block textarea:focus{outline:none;border-color:#ffd097;box-shadow:0 0 0 2px #eaa76222}.mdoc-text{color:#e9d5d7;background:#160e18;font-size:14px;line-height:1.9;padding:20px;border:1px solid #72483f;border-radius:4px;max-width:1100px;margin:auto;display:block}
.mdoc-grid{background:#150d18;border:1px solid #93613e}.mdoc-grid th{background:#39211f;color:#eac2a0;font:10px ui-monospace,monospace}.mdoc-grid td,.mdoc-grid th{border-color:#593541}.mdoc-grid input{color:#e5cbd1;font-size:12px}.mdoc-grid td[data-changed=true]{background:#a1642b26;box-shadow:inset 0 -1px 0 #df9f63}.mdoc-grid input:focus{outline:1px solid #f3bf87;background:#4b291f;outline-offset:-1px}.mdoc-sheets button{background:#271620;border:1px solid #83573d;color:#c7a0ab;border-radius:3px}.mdoc-sheets button[aria-pressed=true]{background:#72452c66;color:#ffdfb6;border-color:#d59b65}.mdoc-pages{padding:8px;font:11px/1.7 ui-monospace,"Microsoft YaHei UI",monospace;color:#d3ab9a}.mdoc-footer{padding:10px 17px;border-top:1px solid #76503d;background:#23131e;color:#b892a5;font-size:10px}.mdoc-message{background:#28181d;border-color:#76503b;color:#edbf9a}.mdoc-message.is-error{background:#381d29;color:#ffc0b4;border-color:#ab6a66}.mdoc-closeCheck{border-block:1px solid #b98150;background:#462a1f;color:#ffdbb6}.mdoc-notice{background:#22141d;border-color:#583442;color:#be97a9}
.mc-modeDialogBackdrop,.mr-dialogBackdrop{background:#08050dbb;backdrop-filter:blur(9px);animation:ion-backdrop-in .14s ease-out}.mc-modeDialog,.mr-dialog{animation:ion-dialog-in .2s ease-out both}.mc-modeDialog input,.mc-modeDialog textarea,.mr-dialog input,.mr-dialog select,.mr-dialog textarea{border:1px solid #885c40;background:#150e18;color:#eddbd4;border-radius:4px;padding:10px 12px;font:13px/1.8 inherit}.mr-dialog h2{color:#f4d2b8;font-size:19px;font-weight:500}.mr-revisionScope label{background:#25141f;border-color:#714939}.mr-revisionScope label:has(:checked){background:#6b3c233b;border-color:#f2b378}.mr-revisionScope input{accent-color:#e9a368}
.mm-hud{--mm-accent:#edac70;--mm-line:#654040;--mm-ink:#f6d6bd;--mm-bg:#1b1018}.mm-hudTrack{background:#3b2630}.mm-hudFill{background:linear-gradient(90deg,#b57143,#ffcd8b);box-shadow:0 0 10px #f3ae5640}
.mm-workbench [data-ion-static=true]{position:relative}.mm-workbench [data-ion-pressed=true]::after{content:'';position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:radial-gradient(circle 80px at var(--ion-press-x,50%) var(--ion-press-y,50%),#ffc47b50,transparent 75%);animation:ion-press .35s ease-out both}
@keyframes ion-pop-in{from{opacity:0;transform:translateY(-5px) scale(.985)}to{opacity:1;transform:none}}
@keyframes ion-drawer-in{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
@keyframes ion-dialog-in{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}
@keyframes ion-backdrop-in{from{opacity:0}to{opacity:1}}
@keyframes ion-field-change{0%,20%{background:#ffb56612;box-shadow:0 0 0 5px #ffb56612}100%{background:transparent;box-shadow:none}}
@keyframes ion-save-confirm{0%{text-shadow:0 0 15px #9de9b5}100%{text-shadow:none}}
@keyframes ion-press{from{opacity:.85}to{opacity:0}}
@keyframes ion-inspector-in{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}
@media(min-width:1500px){.mc-simpleStep{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px 20px!important}.mc-simpleStep>.mc-field{grid-column:1/-1}.mc-simpleStep>.mc-field[data-ion-field=purpose],.mc-simpleStep>.mc-field[data-ion-field=deliverables]{grid-column:auto}}
@media(max-width:1300px){.mc-top,.mr-consoleBar{gap:8px;padding-inline:12px}.mc-brand h1,.mr-consoleBrand strong{font-size:15px}.mc-modeField{min-width:120px;gap:6px}.mc-modePicker{min-width:120px;max-width:250px}.mm-workspaceTabs [role=tab]{padding-inline:10px}.mc-saveState{display:none}.mc-topTools{gap:5px}.mc-content{padding:20px 22px!important}.mr-consoleIndicator{display:none}}
@media(max-width:1000px){.mc-top,.mr-consoleBar{height:auto;min-height:58px;flex-wrap:wrap;padding-block:10px;gap:8px}.mc-topTools{margin-left:auto}.mc-modeField{order:4;flex:1 0 100%}.mc-modePicker{max-width:none}.mc-modeField>.mm-button{flex:none}.mc-topTools .mc-libraryButton{padding-inline:8px}.mr-consolePicker{max-width:none;min-width:180px}.mr-projectHeader{display:block}.mr-projectHeader .mr-meta{justify-content:flex-start;max-width:100%;margin-top:7px}.mr-projectInner{padding:17px 14px 22px}.mc-columnHeader{padding-inline:13px}.mc-content{padding:18px 16px!important}}
@media(max-width:680px){.mm-workspaceTabs{gap:0}.mm-workspaceTabs [role=tab]{font-size:11px;padding-inline:10px}.mc-brand h1,.mr-consoleBrand strong{font-size:14px}.mc-logo,.mr-consoleMark{height:28px;width:28px}.mc-topTools .mm-button{font-size:11px;padding-inline:9px}.mc-top .mc-modeToggle{display:none}.mc-content{padding:15px 12px!important}.mc-simpleStep{gap:17px!important}.mc-fieldHeader{align-items:flex-start;flex-wrap:wrap;gap:6px}.mr-consoleTools{gap:5px}.mr-consoleTools .mr-consoleIndicator{display:none}.mr-consoleBar>.mr-consolePicker{order:4;flex:1 0 100%;max-width:none}.mr-stepInspector{padding:13px 12px 2px}.mr-deliverableShelf{grid-template-columns:1fr}.mc-toast{right:10px;max-width:calc(100% - 20px);top:70px}.mdoc-body{padding:12px}.mdoc-toolbar{padding:9px 10px;gap:5px}.mdoc-toolbar .mdoc-spacer{display:none}.mdoc>header{padding:10px}.mdoc .mdoc-icon{font-size:10px;padding-inline:6px}.mdoc-text{padding:12px}}
@media(prefers-reduced-motion:reduce){.mm-workbench *,.mm-panel.mc-panel *,.mm-panel.mr-panel *,.mdoc *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}

/* Precision editing surfaces and native Conversation card styling. */
.mc-stepIdentity{display:flex;align-items:center;gap:13px;min-width:0;flex:1}.mc-editorNode{display:grid;place-items:center;flex:none;width:42px;height:42px;background:linear-gradient(140deg,#6c402955,#21131c);border:1px solid #b67b50;color:#ffd1a1;font:24px/1 ui-monospace,monospace;border-radius:4px;box-shadow:inset 0 1px 0 #ffe2bb17,0 0 23px #bc762a15}.mc-stepIdentityText{min-width:0;flex:1}.mc-stepNameWrap{display:flex;align-items:center;gap:8px;min-width:0;max-width:680px}.mc-stepNameWrap input{height:27px;min-width:0;width:100%;border:1px solid transparent;border-radius:3px;background:transparent;color:#f8ddca;font:550 15px/1.5 "Segoe UI","Microsoft YaHei UI",sans-serif;padding:0 4px;margin-left:-4px;text-overflow:ellipsis;transition:border-color .15s,background .15s}.mc-stepNameWrap input:hover{border-color:#80503d;background:#34201e55}.mc-stepNameWrap input:focus{outline:none;border-color:#f0b57a;background:#21131b;box-shadow:0 0 0 2px #eea65a18}.mc-stepNameWrap>svg{color:#bc8c71;opacity:.8;flex:none}.mc-simpleStep>.mc-field{border:1px solid #644039;padding:14px;background:linear-gradient(130deg,#37201835,#180f193b);border-radius:4px;position:relative}.mc-simpleStep>.mc-field::after{content:'';position:absolute;right:-1px;bottom:-1px;width:10px;height:10px;border-right:1px solid #d59a66;border-bottom:1px solid #d59a66;opacity:.55;pointer-events:none}.mc-simpleStep>.mc-field>.mc-label::before,.mc-simpleStep>.mc-field>.mc-fieldHeader>.mc-label::before{content:'';display:inline-block;width:3px;height:3px;background:#d99562;margin-right:7px;vertical-align:middle;box-shadow:0 0 7px #eeaa5530}.mc-stepRow.is-current::after{content:'';position:absolute;left:-9px;top:35px;width:8px;height:1px;background:#ffc17e;box-shadow:0 0 9px #f1ad5d55;pointer-events:none}.mc-configWelcome{position:relative;isolation:isolate}.mc-configWelcome::before{content:'';position:absolute;inset:-70px -20px;z-index:-1;pointer-events:none;background:linear-gradient(135deg,transparent 47%,#ad75401b 47%,#ad75401b 47.2%,transparent 47.2%),linear-gradient(90deg,transparent 49.8%,#ad754014 49.8%,#ad754014 50.2%,transparent 50.2%),linear-gradient(0deg,transparent 49.8%,#ad754014 49.8%,#ad754014 50.2%,transparent 50.2%);background-size:170px 130px,72px 72px,72px 72px;mask-image:radial-gradient(ellipse,#000,transparent 72%)}.mc-configWelcomeMark{position:relative;border-radius:5px!important}.mc-configWelcomeMark::before,.mc-configWelcomeMark::after{content:'';position:absolute;top:6px;bottom:6px;width:7px;background:repeating-linear-gradient(180deg,#bf895c 0,#bf895c 1px,transparent 1px,transparent 7px);pointer-events:none}.mc-configWelcomeMark::before{left:-8px}.mc-configWelcomeMark::after{right:-8px}
:is(.mc-assistant,.mr-chat){--dsw-specific-menu:#23151e;--dsw-alias-bg-layer-3:#302030;--dsw-alias-label-primary-dimmed:#dfc5ce;--dsw-alias-label-tertiary:#b498ac;--dsw-alias-interactive-bg-hover:#67412e44;--dsw-alias-button-info-fill:#b66b3e;--dsw-alias-button-info-hover:#bb774c;--dsw-radius-lg:7px}
:is(.mc-nativeConversation,.mr-chatBody) [data-composer-card]{background:linear-gradient(135deg,#342029,#1c121f)!important;border:1px solid #916347!important;border-radius:7px!important;box-shadow:inset 0 1px 0 #f1c79a12,0 0 32px #c1812810!important;transition:border-color .16s,box-shadow .16s}:is(.mc-nativeConversation,.mr-chatBody) [data-composer-card]:focus-within{border-color:#eab079!important;box-shadow:0 0 0 2px #c98b4b18,0 0 30px #d5902820!important}
@media(max-width:1000px){.mc-stepIdentity{gap:9px}.mc-editorNode{width:35px;height:35px;font-size:20px}.mc-stepNameWrap input{font-size:13px}.mc-simpleStep>.mc-field{padding:12px}.mc-stepIdentityText{max-width:calc(100% - 42px)}}

.mr-brand h2{margin:0;font-size:12px;font-weight:550;color:#d8ad94}.mr-deliveryCard .mr-output{margin-top:0;border-top:0;padding-top:0}.mr-deliveryCard .mr-output>h4{display:none}.mr-deliveryText{white-space:pre-wrap;font:12px/1.85 inherit;max-height:280px;overflow:auto;background:#100b15;padding:12px;border:1px solid #4f303e;border-radius:3px}.mr-fileLink{border:1px solid #8d5f40;border-radius:3px;background:#38201c;color:#f5cb9f;padding:7px 10px;display:inline-flex;align-items:center;gap:7px;font-size:11px}.mr-fileLink:hover{border-color:#e5ac71;background:#5c3321}.mr-artifacts code{font-size:9px;color:#ac8498;overflow-wrap:anywhere}.mr-projectInner>.mrv{margin-bottom:16px}.mr-stepInspector .mr-historyToggle{font-size:10px;color:#cca085}

.mr-layout{transition:grid-template-columns .22s ease-out}.mr-layout[data-dragging=true]{transition:none}.mr-projectNav{overflow:hidden;transition:opacity .18s}.mr-layout[data-rail-open=false] .mr-projectNav{opacity:0}.mr-stepNameHeading{margin:0}.mc-stepNameWrap[data-ion-changed=true]{animation:ion-field-change 2.6s ease-out both}
.mr-projectRow{position:relative;min-width:0}.mr-projectList .mr-projectSelect{padding-inline-end:48px}.mr-projectList .mr-projectMode{font-size:10px;color:#c1a0ac}.mr-projectRow .mr-projectDelete{position:absolute;inset-inline-end:8px;top:10px;min-height:28px;width:28px;color:#c69aa2;border:1px solid transparent;background:transparent}.mr-projectRow .mr-projectDelete:hover:enabled{color:#ffd1c5;border-color:#a76c64;background:#66332c55}.mr-panel .mr-deleteConfirm{background:#602e2d;color:#ffe0d5;border-color:#b77969}.mr-panel .mr-deleteConfirm:hover:enabled{background:#7d3933;border-color:#e7ab8d}
.ic-workspace[data-circuit-kind=project] .ic-palette{z-index:11}.ic-workspace[data-circuit-kind=project] .ic-notice{z-index:12}
.mdoc-format{font:9px/1 ui-monospace,monospace;color:#ffd3a2;border:1px solid #bc8555;background:linear-gradient(140deg,#633c2355,#2b1720);padding:6px 7px;border-radius:3px;letter-spacing:.08em;flex:none}.mdoc-focus{display:flex;align-items:center;gap:8px;min-height:36px;padding:6px 16px;border-bottom:1px solid #8c603f;background:linear-gradient(110deg,#5f3b2144,#25151f);color:#e4bd9c;font-size:11px;flex:none}.mdoc-focus>span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mdoc-focus .mdoc-icon{font-size:10px;white-space:nowrap}.mdoc[data-changed=true] .mdoc-format{box-shadow:0 0 12px #ecaa5530;border-color:#ffca87}.mdoc-notice{font-size:10px;line-height:1.8}.mdoc-footer>span{display:inline-flex;align-items:center;gap:6px}.mdoc[data-changed=true] .mdoc-footer>span::before{content:'';height:4px;width:4px;background:#ffc178;box-shadow:0 0 9px #f5bd6570;border-radius:50%}

:is(.mc-nativeConversation,.mr-chatBody) [data-message-bubble]{background:linear-gradient(135deg,#56332670,#2a1926)!important;border:1px solid #835344;border-radius:7px!important;box-shadow:inset 0 1px 0 #ecc89a08;color:#ebd8d5}:is(.mc-nativeConversation,.mr-chatBody) a{color:#eeb783}.mm-panel.mr-panel{--dsw-alias-state-error-primary:#ffb6a9}.mr-shell>.mr-error{background:#391d2a;color:#ffc0b0;border-color:#bd7974;font-size:12px}

/* Fit the actual embedded workbench width, rather than the whole DSH window. */
.mc-grid.has-assistant>:is(.mc-flow,.mc-editor,.mc-assistant){min-width:0!important;width:100%}.mc-assistant :is(.mc-nativeConversation,[data-conversation-content]){min-width:0;max-width:100%}
@container metis-workbench (max-width:1000px){.mc-top{height:auto;min-height:58px;flex-wrap:wrap;padding:10px 12px;gap:8px}.mc-modeField{order:4;flex:1 0 100%;min-width:0}.mc-modePicker{max-width:none;min-width:120px}.mc-topTools{margin-left:auto}.mc-saveState{display:none}.mc-stepManage>.mc-iconButton:nth-child(-n+2){display:none}.mc-stepNameWrap input{font-size:13px}.mc-columnHeader{gap:8px}}
@container metis-project (max-width:1000px){.mr-consoleBar{height:auto;min-height:58px;flex-wrap:wrap;padding:10px 12px;gap:8px}.mr-consolePicker{order:4;flex:1 0 100%;max-width:none;min-width:0}.mr-consoleIndicator{display:none}.mr-consoleTools{margin-left:auto;gap:5px}}

@media(min-width:1500px){.mc-simpleStep:has(.mc-finalOutput)>.mc-field[data-ion-field=purpose],.mc-simpleStep:has(.mc-finalOutput)>.mc-field[data-ion-field=deliverables]{grid-column:1/-1}}

/* Circuit core: full-height scene, object inspectors, native conversation. */
.ic-workspace{height:100%;min-height:0;display:flex;flex-direction:column;overflow:hidden;background:#08070d;color:var(--ion-text);container:metis-circuit / inline-size}
.ic-workspace>.mc-top,.ic-workspace>.mr-consoleBar{z-index:12;min-height:58px;height:58px;padding:0 16px;gap:12px}.ic-workspace .mc-modeField{min-width:100px}.ic-workspace .mc-modePicker{max-width:280px}.ic-workspace .mc-modeField .mc-modePicker{flex:1}.ic-workspace .mc-brand h1{font-size:15px}.ic-workspace .mm-workspaceTabs [role=tab]{padding:5px 10px}
.ic-body{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) 6px minmax(300px,var(--ic-chat-width));overflow:hidden}.ic-stage{position:relative;min-width:0;min-height:0;isolation:isolate;overflow:hidden;background:#08070d}.ic-stage::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,#08070d55,transparent 28%,transparent 75%,#08070d99);z-index:1}
.ic-world{inset:0}.ic-stage[data-inspector=true] .ic-world{left:min(390px,43%)}.ic-context{position:absolute;top:22px;left:24px;z-index:2;pointer-events:none;text-shadow:0 2px 18px #000}.ic-eyebrow{font:9px/1.5 Consolas,monospace;letter-spacing:.18em;color:#c58b76}.ic-context h1{margin:5px 0 10px;font:550 clamp(18px,1.6vw,25px)/1.3 'Segoe UI','Microsoft YaHei UI',sans-serif;max-width:460px;color:#f5e1d8;letter-spacing:.015em}.ic-metrics{display:flex;gap:14px;align-items:center;font-size:10px;color:#c4a2a1}.ic-metrics b{font:400 17px/1 Consolas,monospace;color:#ffcc97}.ic-metrics i{height:10px;width:1px;background:#734737}.ic-cameraTools{position:absolute;right:20px;top:22px;z-index:3;display:flex;gap:6px}
.ic-action{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:30px;padding:6px 9px;font:11px/1.3 'Segoe UI','Microsoft YaHei UI',sans-serif;color:#ddbbad;border:1px solid #704935;background:#20131bd9;border-radius:4px;cursor:pointer;backdrop-filter:blur(12px);transition:background .16s,border-color .16s}.ic-action:hover,.ic-action[aria-pressed=true]{color:#ffe2c5;border-color:#df9d68;background:#4c291edb}.ic-action:disabled{opacity:.4;cursor:default}.ic-action.mm-primary{background:linear-gradient(140deg,#ffd09b,#e89963);border-color:#ffc591;color:#25120b;font-weight:650}
.ic-assistant{min-width:0;min-height:0;overflow:hidden;background:linear-gradient(160deg,#1b111b,#100c15 70%);position:relative;z-index:5}.ic-assistant>:is(.mc-assistant,.mr-chat){height:100%;width:100%;min-width:0;border:0!important;border-radius:0!important}.ic-chatGrip{position:relative;cursor:col-resize;background:#181019;z-index:6;border-left:1px solid #674334}.ic-chatGrip::after{content:'';position:absolute;left:2px;top:45%;height:34px;width:2px;border-radius:3px;background:#875641}.ic-chatGrip:hover,.ic-chatGrip:focus-visible{background:#6a3a27}.ic-assistant .mr-chatWelcome{padding:30px 18px}.ic-assistant .mr-chatWelcome h3{font-size:20px}.ic-assistant .mr-chatContext{border-bottom:1px solid #4e2f3c}.ic-assistant .mc-configWelcome{padding-top:28px}
.ic-inspector,.ic-palette{position:absolute;left:16px;top:112px;bottom:84px;width:min(365px,calc(100% - 32px));z-index:4;display:flex;flex-direction:column;min-height:0;background:linear-gradient(155deg,#281a24f7,#100c16f5);border:1px solid #8b5940;border-top-color:#e5ad79;box-shadow:0 18px 80px #0009,inset 0 1px 0 #ffcb9a1c;border-radius:7px;backdrop-filter:blur(20px);animation:ic-reveal .2s ease-out}.ic-drawerHead{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-bottom:1px solid #674438;flex:none;font-size:10px;letter-spacing:.08em;color:#dba580}.ic-drawerHead .ic-action{border:0;background:transparent;min-height:26px;padding:4px}.ic-inspector>.mc-editor{min-height:0;flex:1;width:100%;border:0;background:transparent;display:flex;flex-direction:column}.ic-inspector .mc-columnHeader{padding:12px 14px;min-height:62px}.ic-inspector .mc-stepIdentity{gap:8px}.ic-inspector .mc-stepManage{gap:2px}.ic-inspector .mc-stepManage .mc-iconButton{width:25px;min-width:25px;height:27px}.ic-inspector .mc-stepIdentityText{min-width:0}.ic-inspector .mc-stepNameWrap input{font-size:13px!important}.ic-inspector .mc-editorNode{display:none}.ic-inspector .mc-content{padding:14px;overflow:auto}.ic-inspector .mc-simpleStep{display:flex;flex-direction:column;gap:18px;max-width:none;margin:0}.ic-inspector .mc-field{margin:0;gap:7px}.ic-inspector .mc-simpleStep textarea{min-height:58px;padding:9px;font-size:12px;line-height:1.65}.ic-inspector .mc-simpleStep textarea[aria-label='步骤提示词']{min-height:145px}.ic-inspector .mc-editorFooter{padding:9px 12px}.ic-inspector .mc-editorFooter>.mc-caption{display:none}.ic-inspector .mc-editorFooter>div{width:100%;justify-content:space-between}.ic-inspector .mc-loopToggle{margin-left:auto}.ic-inspector .mc-loopToggle strong{font-size:10px}.ic-inspector .mc-finalOutput{display:flex;flex-direction:column}
.ic-inspector .mr-steps{padding:12px;margin:0;overflow:auto;min-height:0}.ic-inspector .mr-steps>li{border:0;background:transparent;margin:0}.ic-inspector .mr-steps summary{display:none}.ic-inspector .mr-stepBody{padding:0;max-width:none}.ic-inspector .mr-purpose{font-size:12px;line-height:1.8}.ic-inspector .mr-steps h4{font-size:10px;color:#d7a47d;text-transform:uppercase;letter-spacing:.08em;margin:18px 0 8px}.ic-inspector .mr-stepActions{position:sticky;bottom:-12px;background:#1b121ceF;backdrop-filter:blur(12px);padding:12px 0;margin-top:18px}.ic-inspector .mr-artifacts code{font-size:9px;word-break:break-all}
.ic-palette{width:min(430px,calc(100% - 32px));z-index:7;top:88px}.ic-paletteBody{padding:14px;overflow:auto;min-height:0}.ic-palette .mc-skillSearch .mc-parameters{grid-template-columns:1fr}.ic-palette .mc-libraryEntries{display:flex;flex-direction:column;gap:8px}.ic-palette .mc-libraryEntry{width:100%;min-height:90px;cursor:grab;padding:12px;text-align:left}.ic-palette .mc-libraryEntry:active{cursor:grabbing}.ic-palette .mc-libraryEntry p{margin:4px 0;max-height:38px;overflow:hidden}.ic-palette .mc-libraryEntry small{font-size:9px;overflow-wrap:anywhere}.ic-palette .mc-skillManagement{padding:0}.ic-palette .mc-skillMeta{font-size:10px}.ic-palette pre{white-space:pre-wrap;max-height:300px;overflow:auto;font-size:11px}.ic-skillBind{display:flex;gap:8px;align-items:center;margin:12px 0;padding:12px;border:1px solid #825236;background:#281b22;font-size:11px}.ic-skillBind span{flex:1}.ic-palette .mc-actions{flex-wrap:wrap}.ic-palette .mc-libraryEntry[draggable=false]{cursor:pointer}
.ic-statusRail{position:absolute;z-index:3;left:18px;right:18px;bottom:15px;display:flex;align-items:center;gap:20px;padding:11px 14px;min-height:54px;border:1px solid #6e4536;border-left:2px solid #e9a263;background:linear-gradient(110deg,#26151fe8,#130e19e3);backdrop-filter:blur(14px);border-radius:5px;box-shadow:0 8px 24px #0005}.ic-statusText{min-width:0;display:grid;grid-template-columns:6px minmax(0,1fr);gap:4px 9px;flex:1}.ic-statusText>i{background:#e8b07a;box-shadow:0 0 13px #f7a158;width:4px;height:4px;border-radius:50%;align-self:center}.ic-statusText>strong{font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500}.ic-statusText>small{grid-column:2;font-size:10px;color:#bd999e;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ic-statusText[data-phase=running]>i,.ic-statusText[data-phase=processing]>i{animation:ion-live-pulse 1.8s infinite}.ic-selection{max-width:45%;display:flex;flex-direction:column;align-items:flex-end;gap:4px;min-width:0}.ic-selection>.ic-action{max-width:100%;border-color:#694432;background:#301c21;padding:5px 8px;min-height:26px}.ic-selection span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ic-selection small{font-size:9px;color:#ad858c;white-space:nowrap}
.ic-notice{position:absolute;top:87px;left:50%;transform:translateX(-50%);z-index:8;max-width:90%;pointer-events:auto}.ic-notice .mc-toast{position:static;transform:none;width:auto;max-width:100%}.ic-notice .mr-error{background:#2b151d;border:1px solid #8d4a40;padding:10px 14px;border-radius:6px}.ic-documentLayer{position:absolute;inset:8px;z-index:10;border:1px solid #a47550;border-radius:6px;overflow:hidden;background:#110d16;box-shadow:0 20px 90px #000b}.ic-documentLayer>.mdoc{height:100%}.ic-empty,.ic-fallback{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);z-index:3;text-align:center;padding:28px;max-width:85%;background:#1e111beF;border:1px solid #704536;border-radius:8px}.ic-empty h2{font-size:23px;margin:0 0 12px;color:#f3cfaf}.ic-empty p{font-size:12px;color:#bd9ba3}.ic-fallback nav{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px;max-height:340px;overflow:auto}.ic-fallback nav button{padding:10px;border:1px solid #825139;background:#28191f;color:#ecd6ce;text-align:left;border-radius:4px}
.ion-labels .ion-port,.ion-labels .ion-nodeInsert{pointer-events:auto}.ion-nodePorts{width:328px;display:flex;align-items:center;justify-content:center;gap:4px;flex-wrap:wrap;backface-visibility:hidden;max-height:47px;overflow:hidden}.ion-port{font:10px/1.3 'Segoe UI','Microsoft YaHei UI',sans-serif;max-width:145px;min-height:23px;padding:4px 7px;border:1px solid #764a37;border-radius:3px;color:#dbb09a;background:#24151deF;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;cursor:pointer;box-shadow:0 3px 8px #0007}.ion-port:hover{border-color:#ffd19b;color:#ffe5c8}.ion-port-artifact{color:#a5dfc4;border-color:#46745f;background:#10271feF}.ion-port-loop{color:#dfc080;border-style:dashed}.ion-port-output{color:#dbc2fd;border-color:#7d5c8d}.ion-port:disabled{opacity:.5;cursor:default}.ion-nodeInsert{width:26px;height:26px;display:grid;place-items:center;border:1px solid #f5b97d;border-radius:50%;background:#35201e;color:#ffdbb1;font-size:18px;cursor:pointer;box-shadow:0 0 20px #df8b3d33}.ion-chip[draggable=true]{cursor:grab}.ion-chip[data-dragging=true]{opacity:.4}.ion-chip[data-drop=skill]{outline:3px solid #acd8b6;outline-offset:5px;background:#213627f2}.ion-chip[data-drop=before]{border-top:4px solid #ffdaa4}.ion-chip[data-drop=after]{border-bottom:4px solid #ffdaa4}
@keyframes ic-reveal{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:none}}
@container metis-circuit (max-width:1150px){.ic-workspace>.mc-top,.ic-workspace>.mr-consoleBar{height:auto;min-height:58px;flex-wrap:wrap;padding:9px 12px;gap:8px}.ic-workspace .mc-modeField{order:0;flex:1 1 250px}.ic-workspace .mc-saveState,.ic-workspace .mr-consoleIndicator{display:none}.ic-workspace .mr-consolePicker{order:0;flex:1;min-width:150px}.ic-workspace .mr-consoleTools{margin-left:auto}.ic-inspector{width:min(340px,calc(100% - 28px))}.ic-context h1{max-width:310px}.ic-cameraTools{top:95px;right:14px;flex-direction:column}.ic-statusRail{left:12px;right:12px;bottom:12px;gap:8px}.ic-selection small{display:none}.ic-context{left:18px}.ic-workspace .mc-topTools{margin-left:auto}}
@container metis-circuit (max-width:850px){.ic-body{grid-template-columns:minmax(0,1fr) 6px 300px}.ic-context h1{font-size:17px;max-width:270px}.ic-metrics{gap:8px}.ic-metrics b{font-size:14px}.ic-stage[data-inspector=true] .ic-world{left:0}.ic-inspector{left:10px;bottom:80px;top:110px}.ic-context{top:16px}.ic-statusText>small{display:none}.ic-selection{max-width:50%}.ic-cameraTools{top:85px}.ic-palette{top:100px;left:10px}.ic-statusRail{min-height:47px;padding:8px}.ic-selection>.ic-action{font-size:9px}}
@media(prefers-reduced-motion:reduce){.ic-workspace *{animation:none!important;transition:none!important}}
.ic-workspace[data-circuit-kind=project] .ic-inspector{bottom:auto;max-height:calc(100% - 200px)}.ic-drawerHead>span{display:grid;gap:5px;min-width:0}.ic-drawerHead strong{font-size:13px;letter-spacing:0;color:#f3d7c1;line-height:1.5}.ic-palette>.mr-projectNav{display:flex;flex-direction:column;position:static;width:100%;max-height:100%;min-height:0;border:0;background:transparent;overflow:auto;transform:none;visibility:visible}.ic-palette>.mr-projectNav .mr-projectList{padding:8px 12px}

/* Research topology: free clusters, layered receipts and source-aware ports. */
.ion-labels .in-entity{pointer-events:auto;width:196px;height:83px;display:block;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none;text-align:left;font-family:'Segoe UI','Microsoft YaHei UI',sans-serif;backface-visibility:hidden;cursor:pointer;color:#eee0dc;overflow:visible;position:relative}
.ion-labels .in-entity::before,.ion-labels .in-entity::after{display:none}.ion-labels .in-entity[data-kind=step]{width:293px;height:146px}.ion-labels .in-entity[data-kind=engine]{width:343px;height:164px}
.in-labelBody{height:100%;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:5px;padding:9px 11px;background:linear-gradient(140deg,#231b27f5,#0e0d17f9);border:1px solid color-mix(in srgb,var(--in-node),#312634 48%);box-shadow:inset 0 1px 0 #ffe8d110,0 6px 18px #0005;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,8px 100%,0 calc(100% - 8px));position:relative;overflow:hidden;animation:in-boot .5s ease-out backwards}
.in-labelBody::after{content:'';position:absolute;top:-4px;left:0;right:0;height:2px;pointer-events:none;background:linear-gradient(90deg,transparent,var(--in-node),transparent);box-shadow:0 0 18px var(--in-node);opacity:0;animation:in-scan .65s ease-out}
.in-entity[data-kind=step] .in-labelBody{padding:13px 15px;gap:8px;background:linear-gradient(145deg,#3a2329f4,#130e19f8 80%)}.in-entity[data-kind=engine] .in-labelBody{padding:17px 20px;gap:10px;background:linear-gradient(140deg,#39231ef8,#1f121df8);border-color:#d5a071;box-shadow:inset 0 0 40px #e7a16510,0 0 35px #d88a4322;text-align:center}
.in-nodeHead{display:flex;align-items:center;justify-content:space-between;gap:5px;color:var(--in-node);font:9px/1.3 Consolas,'Microsoft YaHei UI',monospace;letter-spacing:.06em;flex:none}.in-nodeHead>span:last-child{letter-spacing:0;max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#d0b5af}.in-entity[data-kind=step] .in-nodeHead{font-size:11px}.in-entity[data-kind=engine] .in-nodeHead{font-size:9px;letter-spacing:.1em}.in-entity strong{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;font-size:15px;line-height:1.25;font-weight:600;color:#eeded9;letter-spacing:.01em}.in-entity[data-kind=step] strong{font-size:21px;line-height:1.28;-webkit-line-clamp:2}.in-entity[data-kind=engine] strong{font-size:23px;line-height:1.3;letter-spacing:.035em;-webkit-line-clamp:2}
.in-nodeDetail{font-size:10px;color:#bda6b3;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;line-height:1.5;flex:none}.in-entity[data-kind=step] .in-nodeDetail{font-size:11px}.in-entity[data-kind=engine] .in-nodeDetail{font:11px/1.5 Consolas,'Microsoft YaHei UI',monospace;color:#d6b49b}.in-nodeFoot{display:block;border-top:1px solid color-mix(in srgb,var(--in-node) 20%,transparent);padding-top:4px;margin-top:auto;line-height:1.2;font-size:8px;color:#ac939f;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:none}.in-entity[data-kind=step] .in-nodeFoot{font-size:9px;padding-top:6px}.in-entity[data-kind=engine] .in-nodeFoot{color:#c89572;letter-spacing:.06em;font-size:10px}
.in-entity[data-related=true] .in-labelBody,.in-entity:hover .in-labelBody,.in-entity:focus-visible .in-labelBody{border-color:var(--in-node);background:linear-gradient(140deg,color-mix(in srgb,var(--in-node) 15%,#201624),#130f19f9);box-shadow:inset 0 0 25px color-mix(in srgb,var(--in-node) 8%,transparent),0 0 25px color-mix(in srgb,var(--in-node) 20%,transparent)}
.in-entity[data-active=true] .in-labelBody{border-color:#ffe0a2;background:linear-gradient(140deg,#5b3525f5,#231721f9);box-shadow:0 0 36px #f0a45055,inset 0 0 22px #ffa95522}.in-entity[data-active=true] .in-nodeHead>span:last-child{color:#ffdaa3}.in-entity[data-active=true] .in-nodeHead>span:last-child::before{content:'';display:inline-block;vertical-align:middle;margin-right:4px;width:4px;height:4px;background:#ffd596;border-radius:50%;box-shadow:0 0 9px #ffa95b;animation:ion-live-pulse 1.3s infinite}.in-entity[data-status=failed] .in-labelBody,.in-entity[data-status=refused] .in-labelBody{background:linear-gradient(140deg,#42212bf0,#1c101cf7);border-color:#bd6c66}.in-entity[data-kind=artifact] .in-labelBody{background:linear-gradient(140deg,#182c28f3,#10161af9)}
.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) .in-nodeFoot{display:none}.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) strong{font-size:17px}.ic-world[data-network-lod=map] .in-nodeDetail{color:#d3bcc6}
.in-scopeTabs{display:flex;align-items:center;padding:2px;border:1px solid #644238;border-radius:4px;background:#130e18eF;backdrop-filter:blur(14px)}.in-scopeTabs button{padding:5px 8px;min-height:25px;font-size:10px;border:0;background:transparent;color:#c09fac;cursor:pointer;border-radius:2px;white-space:nowrap}.in-scopeTabs button[aria-pressed=true]{color:#ffdbb7;background:#553022}
.in-navigation{position:absolute;left:20px;bottom:96px;width:215px;z-index:3;background:linear-gradient(145deg,#1b111de8,#0b0c14e8);border:1px solid #614332;border-top-color:#b77f54;box-shadow:0 12px 35px #0006;border-radius:5px;backdrop-filter:blur(12px);overflow:hidden}.in-navigation>header{display:flex;justify-content:space-between;gap:10px;padding:8px 10px;font:8px/1.4 Consolas,monospace;letter-spacing:.07em;border-bottom:1px solid #51303a;color:#b88a76}.in-navigation>header b{font-weight:400;color:#e3b48a}.in-navigation>svg{display:block;width:100%;height:122px;padding:9px;box-sizing:border-box;overflow:visible}.in-navigation svg line{stroke:#8f5d49;stroke-width:.08;opacity:.5}.in-navigation svg line[data-active=true]{stroke:#ffe0a0;stroke-width:.16;opacity:1}.in-navigation svg circle{fill:#8a779c;stroke:none;cursor:pointer}.in-navigation svg circle[data-kind=step]{fill:#e1a16f;stroke:#eec6a8;stroke-width:.07}.in-navigation svg circle[data-kind=engine]{fill:#ffc78b}.in-navigation svg circle[data-kind=artifact]{fill:#8fd6b2}.in-navigation svg circle[data-kind=material]{fill:#74bbb7}.in-navigation svg circle[data-active=true]{fill:#fff0b8;stroke:#ffb057;stroke-width:.25}.in-navigation svg circle[data-viewed=true]{stroke:#ffe6c8;stroke-width:.3}.in-navigation svg g:hover circle,.in-navigation svg g:focus-visible circle{fill:#ffedde;stroke:#ffce9c;stroke-width:.3}.in-networkCounts{display:flex;justify-content:space-between;gap:6px;padding:7px 9px;border-top:1px solid #46303a;font-size:8px;color:#c4a2a8}.in-legend{display:flex;justify-content:space-between;gap:6px;padding:0 9px 9px;font-size:8px;color:#b79aa6}.in-legend span::before{content:'';display:inline-block;width:4px;height:4px;background:#ab99ba;margin-right:4px}.in-legend [data-type=activity]::before{background:#f2b370}.in-legend [data-type=delivery]::before{background:#8fd6b2}.ic-stage[data-inspector=true] .in-navigation{left:calc(min(390px,43%) + 14px);width:180px}.ic-stage[data-palette=true] .in-navigation{display:none}
.in-entityDetail{padding:16px;overflow:auto;min-height:0;font-size:12px;line-height:1.75}.in-entityDetail h2{font-size:18px;line-height:1.45;margin:6px 0 9px;color:#f0d6c2;overflow-wrap:anywhere}.in-detailOrigin{font-size:9px;letter-spacing:.04em;color:#b8a2c7;border-left:2px solid #9984b2;padding-left:8px}.in-detailOrigin[data-origin=activity]{color:#e6bb8b;border-color:#e6aa6c}.in-detailOrigin[data-origin=delivery]{color:#9cd9be;border-color:#8fd6b2}.in-detailStatus{display:inline-flex;padding:2px 7px;border:1px solid #66513f;border-radius:3px;font-size:10px;color:#dbba9b;background:#332120}.in-detailStatus[data-status=failed],.in-detailStatus[data-status=refused]{border-color:#99544c;color:#ffb4a5}.in-detailOwner{font-size:10px;color:#b69aa9;margin:12px 0}.in-entityDetail pre{white-space:pre-wrap;overflow-wrap:anywhere;margin:12px 0;padding:12px;background:#0c0a12;border:1px solid #48313f;border-radius:4px;font:11px/1.8 Consolas,'Microsoft YaHei UI',monospace;max-height:340px;overflow:auto;color:#e5d2d0}.in-entityDetail dl{display:grid;grid-template-columns:55px minmax(0,1fr);gap:6px 10px;font-size:10px;margin:16px 0}.in-entityDetail dt{color:#ad91a2}.in-entityDetail dd{margin:0;overflow-wrap:anywhere;color:#dfc3bb}.in-detailActions{display:flex;flex-wrap:wrap;gap:8px;position:sticky;bottom:-16px;padding:12px 0;background:#19111bec;backdrop-filter:blur(12px)}
@keyframes in-boot{from{opacity:0;filter:brightness(1.8)}to{opacity:1;filter:brightness(1)}}@keyframes in-scan{0%{opacity:.7;transform:translateY(0)}100%{opacity:0;transform:translateY(180px)}}
@container metis-circuit (max-width:1150px){.in-navigation{width:165px;left:14px;bottom:90px}.in-navigation svg{height:92px}.in-navigation>header{font-size:7px}.in-networkCounts,.in-legend{font-size:7px;gap:3px}.in-scopeTabs{flex-direction:column}.ic-stage[data-inspector=true] .in-navigation{display:none}}
@container metis-circuit (max-width:850px){.in-navigation{width:135px;bottom:80px;left:10px}.in-navigation>header>span{display:none}.in-navigation svg{height:80px}.in-networkCounts{flex-wrap:wrap}.in-legend{display:none}}
@media(prefers-reduced-motion:reduce){.in-labelBody,.in-labelBody::after,.in-nodeHead>span:last-child::before{animation:none!important}}
.ion-labels .in-entity[data-kind=step]{height:168px}.in-entity[data-kind=step] strong{font-size:26px}.in-entity[data-kind=step] .in-nodeHead{font-size:12px}.in-entity[data-kind=step] .in-nodeDetail{font-size:12px}.in-entity[data-kind=engine] strong{font-size:26px}.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) .in-nodeDetail{display:none}.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) strong{font-size:24px;line-height:1.25;margin-top:6px}.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) .in-nodeHead{font-size:12px}
.in-entity strong{flex:none}.in-labelBody{padding:7px 9px;gap:2px}.in-nodeFoot{padding-top:3px}.in-entity[data-kind=engine] .in-labelBody{padding:14px 20px;gap:6px}

/* Research matrix: one physical footprint; new events arrive on the same circuit. */
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap{position:relative;pointer-events:none;transform-style:preserve-3d}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity]{position:relative;display:block;box-sizing:border-box;padding:0;pointer-events:auto;border:0;background:transparent;overflow:visible;color:#f8dfcd;cursor:pointer;text-align:left}
.ion-world[data-network-layout="research-space-v4"] .in-entity .in-labelBody{position:absolute;inset:0;display:flex;flex-direction:column;gap:8px;padding:15px 18px 12px;box-sizing:border-box;overflow:hidden;background:linear-gradient(137deg,#3a242cf5 0%,#241820f7 48%,#151019f7 100%);border:2px solid #b37b56;box-shadow:inset 0 0 0 5px #140d1670,inset 0 1px 0 #f7bd8c70,0 9px 24px #0006;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px));animation:none;transition:border-color .16s,box-shadow .16s,transform .22s cubic-bezier(.2,1.5,.3,1)}
.ion-world[data-network-layout="research-space-v4"] .in-entity .in-labelBody::before{content:'';position:absolute;left:5px;top:5px;width:18px;height:18px;border-top:2px solid #f5c79a;border-left:2px solid #f5c79a;opacity:.65;pointer-events:none}
.ion-world[data-network-layout="research-space-v4"] .in-entity .in-labelBody::after{content:'';position:absolute;inset:5px;border:1px solid #dba78033;pointer-events:none;background:none;animation:none}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] .in-nodeHead{display:flex;justify-content:space-between;align-items:center;gap:10px;min-height:22px;font:13px/1.4 Consolas,monospace;color:#d3a47f;letter-spacing:.035em;flex:none}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] .in-nodeHead>span:last-child{font:12px/1.4 "Microsoft YaHei UI",sans-serif;color:#c9aa98;white-space:nowrap}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] strong{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin:0;font:650 30px/1.17 "Microsoft YaHei UI","Segoe UI",sans-serif;letter-spacing:.01em;color:#f8e1cf;flex:none;text-shadow:0 1px 0 #fff2}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] .in-nodeDetail{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:0;max-height:36px;margin:0;font:15px/1.25 "Microsoft YaHei UI",sans-serif;color:#bda4a2;word-break:break-word;flex:1}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] .in-nodeFoot{display:block;flex:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-top:9px;margin-top:auto;border-top:1px solid #d9a36d40;font:12px/1.4 "Microsoft YaHei UI",sans-serif;color:#bc9279}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity][data-active=true] .in-labelBody{border-color:#ffd29b;background:linear-gradient(132deg,#62402df7,#352127f7 55%,#1e141ff8);box-shadow:inset 0 0 0 5px #9d643b22,0 0 28px #f2a3574d}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity][data-active=true] .in-nodeHead>span:last-child{color:#ffe5b3}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity][data-status=failed] .in-labelBody,.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity][data-status=refused] .in-labelBody{border-color:#c18476;background:linear-gradient(145deg,#3c2228f5,#20151ef7)}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity][data-viewed=true] .in-labelBody,.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity]:hover .in-labelBody{border-color:#ffe0b8;box-shadow:inset 0 0 0 5px #d9955f18,0 0 18px #f5b8782a}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity]:active .in-labelBody{transform:translateY(2px) scale(.982);transition-duration:.06s}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity]:focus-visible{outline:3px solid #ffdeb7;outline-offset:5px;border-radius:2px}
.in-cardPorts{position:absolute;top:208px;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:5px;height:25px;pointer-events:auto;white-space:nowrap}
.in-cardPorts .in-port{display:inline-flex;align-items:center;min-width:0;max-width:128px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:3px 8px;height:24px;border:1px solid #95694e;background:#261921eb;color:#dfb58b;font:10px/1.3 "Microsoft YaHei UI",sans-serif;cursor:pointer;border-radius:2px;box-shadow:0 2px 8px #0005}
.in-cardPorts .in-port:hover:enabled{background:#5a3829;border-color:#e0ac7c;color:#ffe6c6}.in-cardPorts .in-port:disabled{opacity:.5;cursor:default}.in-cardPorts .in-port:focus-visible{outline:2px solid #ffe3bb;outline-offset:3px}.in-cardPorts .in-port-artifact{color:#bfe1cd;border-color:#739780}.in-cardPorts .in-portMeta{font:9px/1.4 Consolas,monospace;letter-spacing:.08em;color:#aa806a;padding:2px 7px;border-bottom:1px solid #8a5e3a55;text-transform:uppercase}
.in-liveWindow{position:absolute;top:0;left:0;width:290px;max-width:calc(100% - 28px);z-index:5;box-sizing:border-box;pointer-events:none;overflow:hidden;padding:11px 13px 13px;background:linear-gradient(125deg,#38242fcc,#1b1725ba);border:1px solid #c99d796e;border-top-color:#e6bc927d;border-radius:4px;box-shadow:0 14px 38px #0009,inset 0 1px 0 #f4d3b522,0 0 24px #c77f3d12;backdrop-filter:blur(14px);will-change:transform,opacity;transition:opacity .16s ease-out}
.in-liveWindow[hidden]{display:none}.in-liveWindow[data-closing=true]{opacity:0!important}.in-liveHead{display:flex;align-items:center;gap:7px;padding-bottom:8px;border-bottom:1px solid #d9b49325}.in-liveHead strong{font:500 11px/1.4 "Microsoft YaHei UI",sans-serif;color:#ead3be}.in-liveDot{display:block;width:4px;height:4px;background:#f5c58e;box-shadow:0 0 9px #ffb563;border-radius:50%;animation:in-live-breathe 1.9s ease-in-out infinite}.in-liveCode{margin-left:auto;font:7px/1.4 Consolas,monospace;letter-spacing:.09em;color:#b6a5ad}.in-liveBody{padding-top:7px;max-height:77px;overflow:hidden;mask-image:linear-gradient(#000 75%,#0004)}.in-streamLine{margin:0 0 5px;font:11px/1.6 "Segoe UI","Microsoft YaHei UI",sans-serif;letter-spacing:.015em;color:#d3bcc9;overflow-wrap:anywhere;max-height:35px;overflow:hidden}.in-streamLine:first-child{color:#dfc6ac;font-family:Consolas,monospace}.in-liveScan{position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,transparent,#f1bf8c99,transparent);transform-origin:left;animation:in-live-scan 2.8s ease-in-out infinite}
@keyframes in-live-breathe{0%,100%{opacity:.35}50%{opacity:1}}@keyframes in-live-scan{0%{transform:translateX(-100%);opacity:0}35%{opacity:.7}100%{transform:translateX(100%);opacity:0}}
@media(prefers-reduced-motion:reduce){.in-liveDot,.in-liveScan{animation:none!important}.in-liveWindow,.ion-world[data-network-layout="research-space-v4"] .in-labelBody{transition:none!important}}

/* Live tape follows actual arriving output; it never loops stale text. */
.in-liveBody{height:108px;max-height:108px;padding-top:0;margin-top:8px;position:relative;overflow:hidden;mask-image:linear-gradient(#0004,#000 14%,#000 78%,#0002)}
.in-liveTape{will-change:transform}.in-liveTape .in-streamLine{height:18px;max-height:18px;box-sizing:border-box;margin:0;white-space:pre;overflow:hidden;font:11px/18px "Segoe UI","Microsoft YaHei UI",sans-serif;color:#d3c2ce;opacity:.74}
.in-liveTape .in-streamLine[data-source=stderr]{color:#efb6a1}.in-liveTape .in-streamLine[data-source=status]{color:#caaa8d;opacity:.72}.in-liveTape .in-streamLine[data-source=assistant]{color:#d3c7de}
.in-liveWindow[data-compact=true] .in-liveBody{height:54px;max-height:54px}
.in-cardTicker{display:none;will-change:transform}.in-cardStreamLine{display:block;height:18px;max-height:18px;overflow:hidden;white-space:pre;font:14px/18px "Microsoft YaHei UI",sans-serif;color:#c4b1bf}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-streaming=true] .in-detailStatic{display:none}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-streaming=true] .in-nodeDetail{display:block;height:36px;max-height:36px;min-height:36px;mask-image:linear-gradient(#0003,#000 25%,#000 75%,#0003)}
.ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-streaming=true] .in-cardTicker{display:block}
@media(prefers-reduced-motion:reduce){.in-liveTape,.in-cardTicker{will-change:auto}}

/* Floating execution text: no card surface; overview visibility is camera-owned. */
.in-liveWindow{background:none;border:0;border-radius:0;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none;padding:0}
.in-liveHead{border:0;padding-bottom:5px}.in-liveDot,.in-liveScan{display:none}
.in-liveTape .in-streamLine{font-family:"Cascadia Code",Consolas,"Microsoft YaHei UI",monospace;letter-spacing:0}
.in-liveTape .in-streamLine[data-fresh=true],.in-cardStreamLine[data-fresh=true]{animation:in-output-arrive .2s cubic-bezier(.16,1,.3,1) both}
.in-liveTape .in-streamLine[data-signal=environment],.in-liveTape .in-streamLine[data-signal=complete]{color:#d8c5a9;opacity:.9}
.in-liveWindow[data-flow=true] .in-liveCode{color:#c5b3a4}
@keyframes in-output-arrive{from{opacity:.18;translate:5px 2px}to{opacity:.78;translate:0 0}}
@media(prefers-reduced-motion:reduce){.in-liveTape .in-streamLine,.in-cardStreamLine{animation:none!important}}
.ic-runtimeDetails{pointer-events:auto;position:relative;margin-top:8px;max-width:410px;font:11px/1.6 "Segoe UI","Microsoft YaHei UI",sans-serif;color:#c9b0bc}
.mr-workflowUpdate{display:flex;align-items:flex-start;gap:9px;flex:none;padding:7px 14px;border-bottom:1px solid #a06b4c38;background:#23161c66;color:#d8b691;font:11px/1.6 "Segoe UI","Microsoft YaHei UI",sans-serif}
.mr-workflowUpdate details{flex:1;min-width:0}.mr-workflowUpdate summary{display:flex;align-items:center;gap:6px;cursor:pointer;list-style:none}.mr-workflowUpdate ul{padding-left:17px;margin:7px 0;max-height:150px;overflow:auto}.mr-workflowUpdate small{display:block;margin-top:6px;color:#b59daa}.mr-workflowUpdate button{white-space:nowrap;font-size:11px;padding:0;min-height:20px}
.ic-runtimeDetails>summary{cursor:pointer;width:max-content;color:#d3ae8c}.ic-runtimeDetails>div{margin-top:7px;padding:13px 15px;background:#1b121dec;border:1px solid #81553d85;max-height:45vh;overflow:auto;box-shadow:0 12px 32px #0008;pointer-events:auto}.ic-runtimeDetails p{margin:6px 0;overflow-wrap:anywhere}.ic-runtimeDetails small{color:#a58d9a}.ic-runtimeMismatch{color:#f1bc87}.ic-notice p{margin:5px 0 0;white-space:pre-wrap;overflow-wrap:anywhere;max-height:24vh;overflow:auto}

/* ION / precision pass. One shared surface, bounded motion, no decorative telemetry. */
[data-ion-craft="v2"]{
  --ion-void:#0a0c14;
  --ion-panel:#12151f;
  --ion-panel-raised:#1a1d29;
  --ion-field:#0b0e18;
  --ion-border:#44404b;
  --ion-hairline:#2c2c3a;
  --ion-copper:#efaa77;
  --ion-gold:#f8d3aa;
  --ion-text:#efe8e3;
  --ion-secondary:#b6afbd;
  --ion-dim:#8c8799;
  --ion-success:#a1d7bd;
  --ion-danger:#edac9f;
  --ion-ease:cubic-bezier(.16,1,.3,1);
  --ion-press:cubic-bezier(.2,.75,.25,1);
  -webkit-font-smoothing:antialiased;
}
[data-ion-craft="v2"] :is(button,[role=tab]){-webkit-tap-highlight-color:transparent}
[data-ion-craft="v2"] :is(.mm-button,.ic-action,.mc-mini,.mc-iconButton,.mr-iconButton,.mc-modeTrigger,.in-entity,.ion-chip,.in-port,.ion-port,.mc-libraryEntry,[role=tab]){
  position:relative;isolation:isolate;overflow:hidden;
}
.ion-pressWave{
  position:absolute;display:block;pointer-events:none;z-index:10;border:1px solid #ffe6c54d;
  background:radial-gradient(circle,#ffe2b61f,transparent 69%);border-radius:50%;transform-origin:center;
}
[data-ion-craft="v2"] .ic-stage{
  background:#090c14;
}
[data-ion-craft="v2"] .ic-stage::after{
  background:linear-gradient(180deg,#0a0c1455,transparent 24%,transparent 78%,#080a1275);
}
[data-ion-craft="v2"] .ic-stage::before{
  content:"";position:absolute;inset:12px;z-index:1;pointer-events:none;opacity:.22;
  background:linear-gradient(#e9b98a,#e9b98a) 0 0/20px 1px no-repeat,
    linear-gradient(#e9b98a,#e9b98a) 0 0/1px 20px no-repeat,
    linear-gradient(#e9b98a,#e9b98a) 100% 100%/20px 1px no-repeat,
    linear-gradient(#e9b98a,#e9b98a) 100% 100%/1px 20px no-repeat;
}
[data-ion-craft="v2"] :is(.mc-top,.mr-consoleBar){
  background:linear-gradient(100deg,#211a21f5,#141620fa 38%,#10131cf7);
  border-bottom:1px solid #b1866240;box-shadow:0 4px 28px #0004,inset 0 1px 0 #ffffff05;
}
[data-ion-craft="v2"] :is(.mc-top,.mr-consoleBar)::after{
  width:46%;opacity:.7;background:linear-gradient(90deg,#edb27c80,#b786a144,transparent);
}
[data-ion-craft="v2"] :is(.mc-logo,.mr-consoleMark){
  background:linear-gradient(140deg,#67473566,#25202d 55%,#141621);
  border:1px solid #c8996e7d;box-shadow:inset 0 1px 0 #f7d4b22b,0 3px 12px #0004;
  color:#f6d8b4;border-radius:6px;
}
[data-ion-craft="v2"] :is(.mc-brand h1,.mr-consoleBrand strong){font-weight:650;letter-spacing:.15em;color:#f1dcc7}
[data-ion-craft="v2"] .mm-workspaceTabs{
  background:#090d1675;border-color:#76607046;border-radius:6px;padding:3px;box-shadow:inset 0 1px 4px #0003;
}
[data-ion-craft="v2"] .mm-workspaceTabs [role=tab]{
  min-height:30px;color:#b2a7b5;border-radius:3px;transition:background 240ms var(--ion-ease),color 160ms,box-shadow 240ms;
}
[data-ion-craft="v2"] .mm-workspaceTabs [role=tab][aria-selected=true]{
  background:linear-gradient(160deg,#4a352c,#28232c);color:#f5d5b3;box-shadow:inset 0 1px 0 #eebf8f45,0 2px 7px #0003;
}
[data-ion-craft="v2"] .mm-workspaceTabs [role=tab][aria-selected=true]::after{
  content:"";position:absolute;bottom:0;left:24%;right:24%;height:1px;background:#eec38c;box-shadow:0 0 9px #eec38c55;
}
[data-ion-craft="v2"] :is(.mm-button,.ic-action,.mc-mini,.mc-iconButton,.mr-iconButton){
  border:1px solid #8e71614d;border-radius:6px;background:linear-gradient(150deg,#2a2631e8,#1a1c27e8);
  color:#d8c9c1;box-shadow:inset 0 1px 0 #ffffff08,0 2px 4px #0002;
  transition:color 170ms,border-color 220ms,background-color 220ms,box-shadow 240ms,translate 180ms var(--ion-ease),scale 160ms var(--ion-press);
}
[data-ion-craft="v2"] :is(.mm-button,.ic-action){min-height:34px;gap:7px;padding:7px 12px;font-size:11px;line-height:1.4}
[data-ion-craft="v2"] :is(.mm-button,.ic-action,.mc-mini,.mc-iconButton,.mr-iconButton):hover:enabled{
  color:#fff0df;border-color:#dfb182aa;background:linear-gradient(150deg,#48372ded,#292330f0);
  box-shadow:inset 0 1px 0 #ffe2bc20,0 4px 16px #0004,0 0 16px #df98540b;translate:0 -1px;
}
[data-ion-craft="v2"] :is(.mm-button,.ic-action,.mc-mini,.mc-iconButton,.mr-iconButton)[data-ion-pressed=true]{
  translate:0 1px;scale:.975;box-shadow:inset 0 1px 5px #0005;
}
[data-ion-craft="v2"] :is(.mm-primary,.mdoc-save:enabled){
  border-color:#f6d2a7;background:linear-gradient(135deg,#f8ddbb,#eab180 70%,#d89567);color:#30221b;
  box-shadow:inset 0 1px 0 #fff7e4a6,0 2px 10px #0004,0 0 18px #e6ad6920;font-weight:650;
}
[data-ion-craft="v2"] :is(.mm-primary,.mdoc-save):hover:enabled{
  background:linear-gradient(135deg,#ffe6c7,#f4c698 70%,#e7ad7d);color:#30221b;border-color:#fff0d8;filter:none;
  box-shadow:inset 0 1px 0 #fff8eeb3,0 3px 13px #0004,0 0 22px #f7bf7b26;
}
[data-ion-craft="v2"] button:disabled{opacity:.4;filter:saturate(.45);translate:0;scale:1;box-shadow:none}
[data-ion-craft="v2"] :is(button,summary,input,textarea,select,[role=separator]):focus-visible{
  outline:2px solid #f0c69b;outline-offset:3px;
}
[data-ion-craft="v2"] .ic-action[aria-pressed=true]{
  border-color:#dbac7ab3;background:linear-gradient(145deg,#513d2f,#2c2530);color:#ffe0b8;
}
[data-ion-craft="v2"] .ic-action svg{opacity:.83;transition:opacity 180ms,transform 240ms var(--ion-ease)}
[data-ion-craft="v2"] .ic-action:hover svg{opacity:1;transform:translateY(-.5px)}
[data-ion-craft="v2"] .ic-context{top:26px;left:30px;max-width:min(420px,55%);text-shadow:0 2px 15px #050710}
[data-ion-craft="v2"] .ic-eyebrow{font-size:9px;letter-spacing:.22em;color:#b99681}
[data-ion-craft="v2"] .ic-context h1{
  margin:7px 0 11px;letter-spacing:.025em;font-size:clamp(20px,1.8vw,28px);font-weight:600;color:#efe5de;
}
[data-ion-craft="v2"] .ic-metrics{gap:14px;color:#aaa2b1;font-size:10px}
[data-ion-craft="v2"] .ic-metrics b{font-size:18px;color:#dfba96;font-variant-numeric:tabular-nums}
[data-ion-craft="v2"] .ic-cameraTools{top:26px;right:24px;gap:7px}
[data-ion-craft="v2"] .ic-chatGrip{background:#171923;border-inline:1px solid #a27f6124;position:relative;transition:background 200ms}
[data-ion-craft="v2"] .ic-chatGrip::after{width:2px;height:40px;background:#a48b8038;border-radius:2px}
[data-ion-craft="v2"] .ic-chatGrip:hover{background:#664c385c}
[data-ion-craft="v2"] .ic-statusRail{
  left:22px;right:22px;bottom:20px;padding:12px 16px;border-radius:7px;
  background:linear-gradient(110deg,#1c1b28ed,#151621ed 55%,#1b1924e8);
  border-color:#8b71624f;border-left-color:#d4aa7c;box-shadow:inset 0 1px 0 #ffffff09,0 8px 28px #0006;
  backdrop-filter:blur(14px);
}
[data-ion-craft="v2"] .ic-statusText>strong{font-size:12px;font-weight:550;letter-spacing:.01em;color:#e3d6ce}
[data-ion-craft="v2"] .ic-statusText>small{font-size:10px;color:#9e95a7}
[data-ion-craft="v2"] .ic-statusText>i{background:#d5b18b;box-shadow:0 0 10px #dfaa6c66}
[data-ion-craft="v2"] .ic-statusText[data-phase=completed]>i{background:#a0d5bb;box-shadow:0 0 10px #7fc99b44}
[data-ion-craft="v2"] .ic-statusText[data-phase=attention]>i{background:#e4ad93}
[data-ion-craft="v2"] .ic-selection small{color:#9b8b9e;letter-spacing:.015em}
[data-ion-craft="v2"] :is(.ic-inspector,.ic-palette){
  border:1px solid #ac8b6c66;border-radius:9px;background:linear-gradient(155deg,#22222feb,#10141ff5);
  box-shadow:0 18px 60px #0009,inset 0 1px 0 #efd0ad19;
  backdrop-filter:blur(18px);animation:ion-panel-unfold 340ms var(--ion-ease) both;
}
[data-ion-craft="v2"] .ic-drawerHead{
  padding:14px 16px;background:linear-gradient(110deg,#4b372742,#201e2a33);border-color:#c0956e38;
}
[data-ion-craft="v2"] :is(.ic-inspector,.ic-palette)[data-presence=leaving]{animation:ion-panel-fold 180ms ease-in both;pointer-events:none}
[data-ion-craft="v2"] .ic-drawerHead>span{color:#c7ad94;font-size:10px;letter-spacing:.09em}
[data-ion-craft="v2"] .ic-drawerHead strong{color:#eddfd4;font-size:13px;line-height:1.6}
[data-ion-craft="v2"] .ic-inspector .mc-content{padding:18px 18px 22px!important}
[data-ion-craft="v2"] .mc-simpleStep{gap:16px!important}
[data-ion-craft="v2"] .mc-fieldHeader{gap:10px;margin-bottom:7px}
[data-ion-craft="v2"] .mc-label{color:#ccb9a8;font-size:11px;font-weight:600;letter-spacing:.015em}
[data-ion-craft="v2"] .mc-field :is(input:not([type=checkbox]):not([type=radio]),textarea,select){
  border:1px solid #6a5b664f!important;background:#0c111bd9!important;border-radius:5px!important;color:#e1d8d4!important;
  padding:9px 11px;box-shadow:inset 0 1px 3px #0003;font-size:12px!important;line-height:1.85!important;
}
[data-ion-craft="v2"] .mc-field :is(input,textarea,select):hover{border-color:#bc946b77!important}
[data-ion-craft="v2"] .mc-field :is(input,textarea,select):focus{
  border-color:#d2ac7c!important;box-shadow:0 0 0 2px #d2ac7c14,inset 0 1px 3px #0003;outline:none;
}
[data-ion-craft="v2"] .mc-field textarea::placeholder{color:#858091}
[data-ion-craft="v2"] .mc-field textarea[aria-label="禁止事项"]{border-left:2px solid #b9847a99!important;background:#1a141d99!important}
[data-ion-craft="v2"] :is(.mc-note,.mc-field small){color:#a49aad;font-size:10px}
[data-ion-craft="v2"] :is(.mc-boundSkill,.mc-libraryEntry,.mc-skillCard,.mr-projectCard){
  border-color:#9b7b5f50!important;border-radius:6px!important;background:linear-gradient(135deg,#282330a6,#161a25e6)!important;
  box-shadow:inset 0 1px 0 #f9e0bd08;transition:border-color 180ms,background-color 180ms,translate 240ms var(--ion-ease),box-shadow 240ms;
}
[data-ion-craft="v2"] :is(.mc-libraryEntry,.mc-skillCard,.mr-projectCard):hover{
  border-color:#c99a6e9c!important;background:linear-gradient(135deg,#40312bcc,#1f202ce6)!important;
  translate:0 -1px;box-shadow:0 5px 16px #0003;
}
[data-ion-craft="v2"] .mc-libraryEntry h3{font-weight:600;letter-spacing:.01em}
[data-ion-craft="v2"] .mc-libraryEntry p{color:#b1a5b5;line-height:1.7}
[data-ion-craft="v2"] :is(.mc-modeMenu,.mc-moreMenu,.mc-modeDialog,.mr-dialog,.mdoc-confirm){
  border-color:#bf986e80;background:linear-gradient(145deg,#27232ff5,#111722fa);
  border-radius:9px;box-shadow:0 20px 65px #000a,inset 0 1px 0 #f2d1a51c;animation:ion-panel-unfold 300ms var(--ion-ease) both;
}
[data-ion-craft="v2"] :is(.ic-assistant,.mr-chat,.mc-assistant){
  background:radial-gradient(ellipse at 90% 0,#51405410,transparent 50%),linear-gradient(180deg,#151620,#0f121c);
}
[data-ion-craft="v2"] :is(.mr-chatHeader,.mc-assistantHeader){
  min-height:57px;border-bottom:1px solid #9a7c662b;background:linear-gradient(100deg,#27212a99,#16172288);padding:11px 17px;
}
[data-ion-craft="v2"] .mr-chatHeader h2{font-size:13px;letter-spacing:.03em;color:#e4d3c7}
[data-ion-craft="v2"] .mr-chatStatus{color:#b1a1a9;font-size:10px;gap:6px}
[data-ion-craft="v2"] .mr-chatStatus::before{width:4px;height:4px}
[data-ion-craft="v2"] .mr-chatStatus[data-state=running]::before{box-shadow:0 0 10px #edbe8a88;animation:ion-signal-breathe 2.4s ease-in-out infinite}
[data-ion-craft="v2"] .mr-chatContext{font-size:10px;color:#ac9eac;background:#10131b45;border-color:#9a7c6626;padding:7px 17px}
[data-ion-craft="v2"] .mr-workflowUpdate{font-size:10px;padding:7px 17px;background:#d39b6010;border-color:#9a7c6626;color:#c6ac91}
[data-ion-craft="v2"] .mr-chatBody [data-conversation-content]{background:transparent;color:#ddd5d1}
[data-ion-craft="v2"] :is(.mr-chatBody,.mc-assistantConversation) [data-composer-seat]{padding-inline:12px}
[data-ion-craft="v2"] .in-navigation{
  left:24px;bottom:103px;width:195px;border-color:#9b7f6550;border-top-color:#c7a17b8c;border-radius:7px;
  background:linear-gradient(150deg,#1f1d29df,#101522e8);box-shadow:0 10px 25px #0004;backdrop-filter:blur(12px);
}
[data-ion-craft="v2"] .in-navigation>header{padding:10px 12px;color:#a79aab}
[data-ion-craft="v2"] .in-navigation>header b{color:#d0ad89;font-size:9px}
[data-ion-craft="v2"] .in-networkCounts{color:#ad9fab;font-size:9px}
[data-ion-craft="v2"] .ic-empty{border-color:#b18a5f33;background:linear-gradient(150deg,#25212c8f,#111621d9);border-radius:12px;box-shadow:0 20px 70px #0005}
[data-ion-craft="v2"] .ic-empty h2{font-weight:550;letter-spacing:.035em;color:#e9dacc}
[data-ion-craft="v2"] .ic-empty p{color:#a89bad;line-height:1.9}
[data-ion-craft="v2"] .ic-notice{animation:ion-notice-arrive 280ms var(--ion-ease) both}
[data-ion-craft="v2"] :is(.mdoc-header,.mdoc-toolbar){background:#171923;border-color:#ad8a662b}
[data-ion-craft="v2"] .mdoc{background:#0e131d;color:#ded6d4}
[data-ion-craft="v2"] .mdoc textarea{background:#101621;color:#ded8d5;border-color:#9b7c6444}

/* CSS3D wrapper transforms belong to the camera. Only the inner material tilts. */
[data-ion-craft="v2"] .ion-chip{perspective:850px}
[data-ion-craft="v2"] .ion-chip-face{
  display:flex;flex-direction:column;width:100%;height:100%;box-sizing:border-box;gap:8px;padding:15px 17px;
  position:relative;border:1px solid #a3836659;clip-path:polygon(0 0,calc(100% - 15px) 0,100% 15px,100% 100%,13px 100%,0 calc(100% - 13px));
  background:radial-gradient(ellipse at var(--ion-pointer-x,25%) var(--ion-pointer-y,12%),#e9b17d17,transparent 70%),linear-gradient(145deg,#302733f7,#151a26fa);
  box-shadow:inset 0 1px 0 #fff1d814;transform:rotateX(var(--ion-tilt-x,0deg)) rotateY(var(--ion-tilt-y,0deg));transition:transform 260ms var(--ion-ease),filter 200ms,border-color 200ms;
}
[data-ion-craft="v2"] .ion-chip[data-ion-hover=true] .ion-chip-face{transform:translateY(-3px) rotateX(var(--ion-tilt-x,0deg)) rotateY(var(--ion-tilt-y,0deg));border-color:#edc090}
[data-ion-craft="v2"] .ion-chip[data-ion-pressed=true] .ion-chip-face{transform:translateY(1px) scale(.985);filter:brightness(1.12)}
[data-ion-craft="v2"] .ion-chip:has(>.ion-chip-face){padding:0;background:none;border-color:transparent;box-shadow:none;overflow:visible}
[data-ion-craft="v2"] .ion-chip-head{color:#c2a48e}
[data-ion-craft="v2"] .ion-chip-title{font-size:22px;line-height:1.35;font-weight:600;color:#f1e5dc;letter-spacing:.015em}
[data-ion-craft="v2"] .ion-chip-purpose{color:#b0a5b5;font-size:12px;line-height:1.65}
[data-ion-craft="v2"] .ion-chip-foot{color:#ae96a1;border-color:#a2846a33;font-size:10px;line-height:1.5}
[data-ion-craft="v2"] .ion-chip[data-viewed=true] .ion-chip-face{border-color:#dbb18c;background:linear-gradient(145deg,#45322ff5,#1b1d2afa)}
[data-ion-craft="v2"] .ion-nodePorts{gap:6px}
[data-ion-craft="v2"] :is(.ion-port,.in-cardPorts .in-port){
  background:linear-gradient(150deg,#2b2530f5,#171c28f2);border-color:#aa876461;color:#cebaaa;border-radius:4px;
  box-shadow:inset 0 1px 0 #ffe6c30a,0 2px 7px #0004;transition:border-color 180ms,color 180ms,translate 200ms var(--ion-ease);
}
[data-ion-craft="v2"] :is(.ion-port,.in-cardPorts .in-port):hover:enabled{border-color:#e5ba8e;color:#f3dac0;background:#43332cf5;translate:0 -2px}
[data-ion-craft="v2"] .in-cardPorts .in-port-artifact{color:#a8d4bf;border-color:#8eaf9359}
.in-recordPager{position:absolute;z-index:3;left:50%;bottom:88px;transform:translateX(-50%);display:flex;align-items:center;gap:7px;padding:5px 8px 5px 13px;border:1px solid #9a806047;border-radius:6px;background:#11151fdf;backdrop-filter:blur(10px);color:#9e99a5;font:11px/1.5 "Microsoft YaHei UI",sans-serif;white-space:nowrap}
.in-recordPager>span{margin-right:5px}.in-recordPager b{font-weight:500;color:#d8c0a6;font-variant-numeric:tabular-nums}
[data-ion-craft="v2"] .in-recordPager .ic-action{min-height:29px;padding:4px 7px;font-size:10px;border-color:transparent;box-shadow:none;background:transparent}
[data-ion-craft="v2"] .in-recordPager .ic-action:disabled{opacity:.25}
[data-ion-craft="v2"] .in-recordPager [aria-label="较早的执行记录"] svg{transform:rotate(180deg)}
[data-ion-craft="v2"] .ic-stage>.in-navigation{width:174px;box-shadow:0 5px 18px #0003;background:#11151edb;border-color:#76695840}
[data-ion-craft="v2"] .in-navigation>svg{height:82px;padding:10px 13px}
[data-ion-craft="v2"] .in-navigation .in-mapHit{fill:transparent;stroke:none}
[data-ion-craft="v2"] .in-navigation>header{padding:8px 10px}
[data-ion-craft="v2"] .in-networkCounts{gap:5px;flex-wrap:wrap;padding:7px 10px;font-size:8px}
/* The compiled workflow stays readable while the camera follows a child. */
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .ic-stage>.in-navigation{display:block;width:220px}
.in-stageTrunk{list-style:none;margin:0;padding:5px;display:grid;gap:2px;max-height:min(39vh,292px);overflow:auto;scrollbar-width:thin}
.in-stageTrunk>li{min-width:0}
.in-stageRoot{width:100%;min-height:28px;display:flex;align-items:center;gap:8px;box-sizing:border-box;border:1px solid transparent;border-radius:3px;padding:4px 6px;background:transparent;color:#aaa1aa;text-align:left;cursor:pointer;font:11px/1.5 "Microsoft YaHei UI",sans-serif;transition:background 160ms,border-color 160ms,color 160ms}
.in-stageRoot strong{min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500;color:inherit}
.in-stageIndex{flex:none;font:10px/1.4 Consolas,monospace;color:#a88d73}
.in-stageRoot small{flex:none;font-size:9px;color:#8f949d}
.in-stageRoot:hover{color:#ede0d1;background:#a7866814;border-color:#b99c6b33}
.in-stageRoot[data-viewed=true]{background:#9e805317;border-color:#bf9b6555;color:#e2c9a7}
.in-stageRoot[data-executing=true]{background:#b480431b;border-color:#c391596b;color:#f2cf9f}
.in-stageRoot[data-executing=true] small{color:#ebba7d}
.in-stageChildren{display:block;margin:0 7px 5px 26px;padding:3px 0 3px 8px;border-left:1px solid #b5966359;color:#a89b8e;font-size:9px;line-height:1.6}
.in-parentPath{position:absolute;z-index:3;top:137px;left:27px;right:25px;display:flex;align-items:center;gap:8px;min-height:29px;padding:4px 10px;border-left:2px solid #8f805e;background:linear-gradient(90deg,#10151de8,#10151d77 70%,transparent);box-sizing:border-box;pointer-events:none;color:#bab1ac;font:11px/1.6 "Microsoft YaHei UI",sans-serif}
.in-pathState{flex:none;font-size:9px;color:#918d97}
.in-parentPath strong{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:50%;font-weight:500;color:#dfc6a6}
.in-pathChild{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.in-parentPath>small{margin-left:auto;max-width:35%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px;color:#d5a775}
.in-parentPath[data-state=running]{border-left-color:#e2af71}.in-parentPath[data-state=running] .in-pathState{color:#e2af71}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .ic-stage[data-inspector=true]>.in-parentPath{left:calc(min(390px,43%) + 15px)}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .ic-stage[data-inspector=true]>.in-navigation{width:200px;left:auto;right:18px;bottom:103px}
@container metis-circuit (max-width:1150px){.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .ic-stage>.in-navigation{width:180px}.in-stageTrunk{max-height:210px}.in-stageRoot{font-size:10px;min-height:26px}.in-stageRoot small{font-size:8px}.in-parentPath{font-size:10px;top:130px}}
[data-ion-craft="v2"] .ion-world[data-network-view=overview] .in-cardPorts{visibility:hidden;pointer-events:none}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"][data-network-view=overview] .in-cardWrap>.in-entity[data-kind=step] .in-nodeDetail{display:none}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"][data-network-view=overview] .in-cardWrap>.in-entity[data-kind=step] strong{font-size:34px;line-height:1.24;margin-top:8px}
/* Keep native pointer targets on the CSS3D card plane. A translated child
   inside a coplanar hit-test surface can alternate with its parent in Chromium. */
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"]>.ion-labels{overflow:clip!important}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardPorts{pointer-events:none}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardPorts .in-port{
  pointer-events:auto;isolation:auto;translate:none;transform:none;
  transition:border-color 180ms,color 180ms,background-color 180ms;
}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-labelBody{
  gap:8px;padding:16px 18px;position:relative;isolation:isolate;overflow:hidden;
  border:1px solid color-mix(in srgb,var(--in-node) 48%,#3a3443);
  background:radial-gradient(ellipse at var(--ion-pointer-x,12%) var(--ion-pointer-y,0%),#f7d1a914,transparent 73%),
    linear-gradient(145deg,#2a2331fa,#111925fc 78%);
  box-shadow:inset 0 1px 0 #fff2dc12,0 8px 18px #04071166;
  transform:rotateX(var(--ion-tilt-x,0deg)) rotateY(var(--ion-tilt-y,0deg));
  transform-origin:50% 70%;transition:transform 280ms var(--ion-ease),background-color 240ms,border-color 220ms,box-shadow 280ms;
}
[data-ion-craft="v2"] .in-entity{perspective:900px;outline-offset:5px}
[data-ion-craft="v2"] .in-labelBody::before{
  content:"";position:absolute;left:0;top:22px;width:2px;height:31px;pointer-events:none;
  background:var(--in-node);opacity:.6;box-shadow:0 0 12px color-mix(in srgb,var(--in-node) 40%,transparent);
}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity .in-labelBody::after{
  content:"";position:absolute;inset:0;pointer-events:none;opacity:0;box-shadow:none;height:auto;border:0;
  background:linear-gradient(115deg,transparent 25%,#fff0ce0d 45%,#fce9ce1a 48%,transparent 64%);
  transform:translateX(-95%);animation:var(--ion-surface-animation,ion-idle-reflection 6.2s linear infinite);animation-delay:var(--ion-ambient-delay,0s);
}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] strong{
  font-size:26px;line-height:1.28;font-weight:600;letter-spacing:.015em;color:#eee3db;text-shadow:0 1px 2px #0004;
}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] .in-nodeHead{font:11px/1.5 Consolas,"Microsoft YaHei UI",monospace;letter-spacing:.07em;color:#c1a289;min-height:20px}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] .in-nodeHead>span:last-child{font-size:10px;color:#bca9b1;letter-spacing:.02em}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] .in-nodeDetail{font-size:13px;line-height:1.42;max-height:38px;color:#afa6b7}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] .in-nodeFoot{padding-top:10px;border-color:#ac8b6c30;font-size:10px;line-height:1.5;color:#aa909b}
[data-ion-craft="v2"] .in-cardCircuit{position:absolute;right:16px;bottom:12px;display:flex;align-items:end;gap:3px;opacity:.3;pointer-events:none}
[data-ion-craft="v2"] .in-cardCircuit i{width:5px;height:2px;background:var(--in-node);transform:skewX(-24deg)}
[data-ion-craft="v2"] .in-cardCircuit i:nth-child(2){width:10px}
[data-ion-craft="v2"] .in-cardCircuit i:nth-child(3){width:16px}
[data-ion-craft="v2"] .in-cardCircuit i:nth-child(4){width:6px}
[data-ion-craft="v2"] .in-nodeFoot{padding-right:54px}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-related=true] .in-labelBody,
[data-ion-craft="v2"] .in-entity[data-ion-hover=true] .in-labelBody{
  border-color:#dfbc98;transform:translateY(-3px) rotateX(var(--ion-tilt-x,0deg)) rotateY(var(--ion-tilt-y,0deg));
  box-shadow:inset 0 1px 0 #f9dfbe2b,0 9px 25px #0007;background-color:#312a35;
}
[data-ion-craft="v2"] .in-entity[data-ion-pressed=true] .in-labelBody{transform:translateY(1px) scale(.984);filter:brightness(1.14)}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-active=true] .in-labelBody{
  border-color:#e8be8c;background:radial-gradient(ellipse at 10% 0,#d2914c24,transparent 70%),linear-gradient(145deg,#3e2c2efa,#19202cfc);
  box-shadow:inset 0 1px 0 #ffdda52d,0 0 22px #ce9a4b25,0 8px 24px #0006;
}
[data-ion-craft="v2"] .in-entity[data-active=true]{--ion-surface-animation:ion-material-sweep 3.6s var(--ion-ease) infinite}
[data-ion-craft="v2"] .in-entity[data-active=true] .in-cardCircuit{opacity:.65}
[data-ion-craft="v2"] .in-entity[data-active=true] .in-cardCircuit i{animation:ion-contact-pulse 1.8s ease-in-out infinite}
[data-ion-craft="v2"] .in-entity[data-active=true] .in-cardCircuit i:nth-child(2){animation-delay:100ms}
[data-ion-craft="v2"] .in-entity[data-active=true] .in-cardCircuit i:nth-child(3){animation-delay:200ms}
[data-ion-craft="v2"] .in-entity[data-active=true] .in-cardCircuit i:nth-child(4){animation-delay:300ms}
[data-ion-craft="v2"] .in-entity[data-signal=complete] .in-labelBody{animation:ion-material-complete 900ms var(--ion-ease) both}
[data-ion-craft="v2"] .in-entity[data-signal=attention] .in-labelBody{animation:ion-material-attention 900ms ease-out both}
[data-ion-craft="v2"] .in-entity[data-signal=engage]{--ion-surface-animation:ion-material-sweep 780ms var(--ion-ease)}
[data-ion-craft="v2"] .in-entity[data-status=submitted] .in-nodeHead>span:last-child,
[data-ion-craft="v2"] .in-entity[data-status=succeeded] .in-nodeHead>span:last-child{color:#a8c7b3!important}
[data-ion-craft="v2"] .in-entity[data-status=failed] .in-nodeHead>span:last-child{color:#e5a595!important}
[data-ion-craft="v2"] .in-liveHead strong{color:#cdb5a3;font-size:10px;letter-spacing:.02em}
[data-ion-craft="v2"] .in-liveCode{color:#918697;font-size:7px;letter-spacing:.13em}
[data-ion-craft="v2"] .in-liveTape .in-streamLine{color:#bcb5c5;opacity:.72}
[data-ion-craft="v2"] .in-liveTape .in-streamLine[data-source=stderr]{color:#d5a49b}
[data-ion-craft="v2"] .in-liveWindow{background:none;border:0;box-shadow:none;backdrop-filter:none;padding:0}
[data-ion-craft="v2"] .in-stationPlate{
  width:780px;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  color:#c4a285;background:linear-gradient(90deg,#1e263088,#141c2400);border-bottom:1px solid #bb916c66;
  padding:10px 14px;font:500 16px/1.5 "Cascadia Code",Consolas,"Microsoft YaHei UI",monospace;letter-spacing:.06em;
  pointer-events:none;backface-visibility:hidden;
}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-space-layer=delivery] .in-labelBody{
  border-color:#91b89c88;background:radial-gradient(ellipse at 10% 0,#9bcba71a,transparent 70%),linear-gradient(145deg,#24342efa,#14242afc);
}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-space-layer=delivery] strong{font-size:23px}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-kind=engine] .in-labelBody{
  background:linear-gradient(135deg,#42342efa,#171f2bfc);border-color:#d5ad80b3;box-shadow:inset 0 0 28px #d9a86410,0 10px 30px #0006;
}

@keyframes ion-panel-unfold{from{opacity:0;translate:0 9px;scale:.985;filter:brightness(.9)}to{opacity:1;translate:0;scale:1;filter:brightness(1)}}
@keyframes ion-panel-fold{to{opacity:0;translate:0 6px;scale:.99}}
@keyframes ion-notice-arrive{from{opacity:0;translate:0 -6px}to{opacity:1;translate:0}}
@keyframes ion-material-sweep{0%,12%{opacity:0;transform:translateX(-110%)}34%{opacity:.85}60%,100%{opacity:0;transform:translateX(110%)}}
@keyframes ion-idle-reflection{0%{opacity:0;transform:translateX(-115%)}16%{opacity:.8}48%{opacity:.45}67%,100%{opacity:0;transform:translateX(115%)}}
@keyframes ion-material-complete{0%{box-shadow:inset 0 0 0 1px #bfe8d190,0 0 32px #8ed5b03d;filter:brightness(1.2)}100%{box-shadow:inset 0 1px 0 #e6fff30a,0 8px 18px #04071166;filter:brightness(1)}}
@keyframes ion-material-attention{0%,25%{border-color:#f0b3a0;box-shadow:0 0 20px #e9a78e33}100%{border-color:#a87670;box-shadow:0 8px 18px #04071166}}
@keyframes ion-contact-pulse{0%,100%{opacity:.2}45%{opacity:.9}}
@keyframes ion-signal-breathe{0%,100%{opacity:.7}50%{opacity:1}}

/* Step editor: a single quiet dock, not nested decorative cards. */
[data-ion-craft="v2"][data-circuit-kind=mode]{--ic-editor-width:clamp(344px,28vw,408px)}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor]{
  inset:0 auto 0 0;width:var(--ic-editor-width);max-height:none;border:0;border-right:1px solid #9f87744d;border-radius:0;
  background:linear-gradient(180deg,#191a23,#11141d 42%,#12151e);backdrop-filter:none;
  box-shadow:10px 0 35px #03060c40;animation:ion-editor-dock-in 260ms var(--ion-ease) both;overflow:hidden;
}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor][data-presence=leaving]{animation:ion-editor-dock-out 180ms ease-in both}
[data-ion-craft="v2"] .ic-stage:has(.ic-inspector[data-inspector-kind=editor])>.ic-world{left:var(--ic-editor-width)}
[data-ion-craft="v2"] .ic-stage:has(.ic-inspector[data-inspector-kind=editor])>.ic-context{opacity:0;pointer-events:none}
[data-ion-craft="v2"] .ic-stage:has(.ic-inspector[data-inspector-kind=editor])>.ic-statusRail{left:calc(var(--ic-editor-width) + 18px)}
[data-ion-craft="v2"] .ic-inspectorClose{
  position:absolute;right:14px;top:14px;z-index:4;display:grid;place-items:center;width:29px;height:29px;padding:0;
  border:1px solid transparent;border-radius:5px;background:transparent;color:#a8a1af;cursor:pointer;
  transition:background 160ms,color 160ms,border-color 160ms,scale 120ms;
}
[data-ion-craft="v2"] .ic-inspectorClose:hover{background:#d6b28d12;border-color:#c5a4823b;color:#f1d9bf}
[data-ion-craft="v2"] .ic-inspectorClose:active{scale:.94}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor]>.mc-editor{
  display:flex;flex-direction:column;flex:1;min-height:0;width:100%;background:transparent!important;overflow:hidden;
}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-columnHeader{
  height:auto;min-height:104px;flex-direction:column;align-items:stretch;gap:11px;padding:17px 20px 11px;
  border-bottom:1px solid #b69b7c22;background:#ffffff02;
}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-columnHeader::before{display:none}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepIdentity{width:100%;padding-right:30px;box-sizing:border-box;gap:0}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepIdentityText{width:100%;max-width:none;min-width:0}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepIdentityText>.mc-caption{font-size:10px;line-height:1.4;color:#9f96a4;letter-spacing:.1em;margin-bottom:6px}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepNameWrap{gap:6px;max-width:none}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepNameWrap input{
  font-size:17px!important;line-height:1.4;height:29px;font-weight:600;color:#ede7e1;letter-spacing:.01em;
  padding:0 2px;margin-left:-2px;border-color:transparent;background:transparent;border-radius:3px;
}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepNameWrap input:hover{background:#ffffff04;border-color:#b3967733}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepNameWrap input:focus{background:#0d111a;border-color:#c6a17e;box-shadow:0 0 0 2px #c6a17e12}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepNameWrap>svg{opacity:0;color:#b19a84;transition:opacity 160ms}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepNameWrap:hover>svg,
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepNameWrap:focus-within>svg{opacity:.8}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepManage{display:flex;justify-content:flex-start;gap:5px;width:100%}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepManage>.mc-iconButton{
  display:inline-flex;justify-content:center;align-items:center;width:27px;min-width:27px;height:27px;min-height:27px;padding:4px;
  background:transparent;border:1px solid transparent;border-radius:4px;box-shadow:none;color:#9d96a5;
}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepManage>.mc-iconButton:nth-child(3){margin-left:7px}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepManage>.mc-iconButton:hover:enabled{color:#ead7c3;background:#d4b1870c;border-color:#b0917438;translate:0}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepManage>.mc-iconButton:last-child:hover:enabled{color:#edb0a3;background:#c4807212;border-color:#c4807244}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-content{
  flex:1;min-height:0;overflow-x:hidden;overflow-y:auto;padding:20px 19px 26px!important;scrollbar-gutter:stable;overscroll-behavior:contain;
}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-stepFieldset{border:0;padding:0;margin:0;min-width:0}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-simpleStep{display:flex;flex-direction:column;gap:24px!important;max-width:none;margin:0}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-simpleStep>.mc-field{
  display:block;border:0;border-radius:0;padding:0;background:none;box-shadow:none;margin:0;
}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-simpleStep>.mc-field::after,
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-label::before{display:none;content:none}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-label{
  display:block;font-size:11px;line-height:1.5;font-weight:600;letter-spacing:.01em;color:#b9adb2;margin:0 0 8px;
}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-fieldHeader{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:0 0 8px}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-fieldHeader>.mc-label{margin:0}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-field :is(textarea,select,input:not([type=checkbox]):not([type=radio])){
  width:100%;box-sizing:border-box;border:1px solid #aaa0b321!important;border-radius:5px!important;
  background:#0c111a99!important;box-shadow:inset 0 1px 3px #0002;padding:10px 11px;
  color:#ded8d5!important;font-size:12px!important;line-height:1.85!important;
}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-field textarea{field-sizing:content;min-height:76px!important;max-height:none;resize:vertical}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-field textarea[aria-label="步骤提示词"]{min-height:154px!important}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-field :is(textarea,select,input):focus{border-color:#c5a17c!important;box-shadow:0 0 0 2px #c5a17c12;outline:none}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-field textarea::placeholder{color:#7d7789}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-field textarea[aria-label="禁止事项"]{background:#15121a66!important;border-left:1px solid #b0888838!important}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-loopToggle{gap:6px;margin:0;color:#aa9b9f;font-size:10px}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-loopToggle strong{font-size:10px;font-weight:400;white-space:nowrap}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-loopToggle input[role=switch]{width:29px;height:17px;min-width:29px;border:0;box-shadow:none}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-loopToggle input[role=switch]::after{width:11px;height:11px;top:3px;left:3px}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-loopToggle input[role=switch]:checked::after{transform:translateX(12px)}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-loopOptions{
  padding:12px 0 0 13px;margin:10px 0 0;border:0;border-left:1px solid #bc98653d;border-radius:0;background:none;
}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-loopOptions .mc-label{font-size:10px;font-weight:400;color:#a096a6}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-loopOptions textarea{min-height:68px!important}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-field[data-ion-field=skills]>.mc-fieldHeader{justify-content:flex-start;gap:10px}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-field[data-ion-field=skills]>.mc-fieldHeader .mm-button{min-height:24px;padding:3px 7px;border-color:#b2947133;background:transparent;font-size:10px;box-shadow:none}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-finalOutput{background:none;border:0;border-left:1px solid #a48b6d38;border-radius:0;padding:13px 0 0 13px;margin-top:10px;gap:14px}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-editorFooter{
  flex:none;height:51px;min-height:51px;box-sizing:border-box;padding:8px 19px;border-top:1px solid #a18d7b26;background:#171922;
}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-editorFooter .mm-button{height:29px;min-height:29px;min-width:0;padding:5px 9px;border-color:transparent;box-shadow:none;background:transparent;font-size:11px}
[data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor] .mc-editorFooter .mm-button:hover:enabled{border-color:#b99d7938;background:#c4a0720b;translate:0}
@keyframes ion-editor-dock-in{from{opacity:0;translate:-16px 0}to{opacity:1;translate:0}}
@keyframes ion-editor-dock-out{to{opacity:0;translate:-10px 0}}
@container metis-circuit (max-width:1050px){
  [data-ion-craft="v2"] .ic-inspector[data-inspector-kind=editor]{left:10px;top:10px;bottom:10px;width:min(384px,calc(100% - 20px));border:1px solid #a88b6859;border-radius:8px;box-shadow:12px 0 45px #0007}
  [data-ion-craft="v2"] .ic-stage:has(.ic-inspector[data-inspector-kind=editor])>.ic-world{left:0}
  [data-ion-craft="v2"] .ic-stage:has(.ic-inspector[data-inspector-kind=editor])>.ic-statusRail,
  [data-ion-craft="v2"] .ic-stage:has(.ic-inspector[data-inspector-kind=editor])>.ic-cameraTools{visibility:hidden}
}
@media(max-width:1100px){
  [data-ion-craft="v2"] .ic-context{left:20px;top:22px;max-width:46%}
  [data-ion-craft="v2"] .ic-context h1{font-size:20px}
  [data-ion-craft="v2"] .ic-cameraTools{top:23px;right:18px;gap:5px}
  [data-ion-craft="v2"] .ic-cameraTools .ic-action{padding-inline:8px;font-size:10px}
  [data-ion-craft="v2"] .in-navigation{width:172px;left:20px}
}
@media(max-width:720px){
  [data-ion-craft="v2"] .ic-context{left:17px;top:16px}
  [data-ion-craft="v2"] .ic-context h1{font-size:17px;max-width:220px}
  [data-ion-craft="v2"] .ic-metrics{gap:8px;font-size:9px}
  [data-ion-craft="v2"] .ic-metrics b{font-size:14px}
  [data-ion-craft="v2"] .ic-cameraTools{top:18px;right:14px}
  [data-ion-craft="v2"] .ic-statusRail{left:12px;right:12px;bottom:12px;padding:10px 12px}
  [data-ion-craft="v2"] .ic-selection small{display:none}
}
@media(prefers-reduced-motion:reduce){
  [data-ion-craft="v2"] *,[data-ion-craft="v2"] *::before,[data-ion-craft="v2"] *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  [data-ion-craft="v2"] :is(.in-entity,.ion-chip) :is(.in-labelBody,.ion-chip-face){transform:none!important}
  [data-ion-craft="v2"] :is(.mm-button,.ic-action,.mc-mini,.mc-iconButton,.mr-iconButton,.ion-port,.in-port){translate:0;scale:1}
}
/* RESEARCH / sculpted ion instrument. Native state, quiet space, sharp materials. */
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project]{--ion-copper:#e8b282;--ion-gold:#f7d9b0;--ion-border:#485565;--ion-secondary:#a6b3c0}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .ic-context h1{font-weight:620;letter-spacing:-.035em;color:#f0e9df;text-shadow:0 2px 22px #000b}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .ic-eyebrow{color:#c1a68b;letter-spacing:.22em;font-size:9px}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .ic-cameraTools .ic-action{border-color:#a8b9c22d;background:linear-gradient(150deg,#1e2a36da,#0b121de8);box-shadow:inset 0 1px #e0f2ff0d,0 5px 16px #0003;min-height:34px;border-radius:4px}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .ic-cameraTools .ic-action:hover:enabled{border-color:#d4b28caa;background:linear-gradient(140deg,#3b3833ec,#152330f5)}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .ic-cameraTools .in-openResult{color:#fff1d7;border-color:#ddb680a3;background:linear-gradient(135deg,#715134,#2c3436);box-shadow:inset 0 1px #ffefd240,0 3px 18px #d4a06418}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-labelBody{background:radial-gradient(ellipse at var(--ion-pointer-x,16%) var(--ion-pointer-y,0%),#b9daee16,transparent 70%),linear-gradient(145deg,#1c3040e8,#0a1420f5 82%);border:1px solid #94abb25c;box-shadow:inset 0 1px #edfcff26,inset 0 -1px #000a,0 7px 16px #0004;clip-path:polygon(0 0,calc(100% - 17px) 0,100% 17px,100% 100%,17px 100%,0 calc(100% - 17px));gap:7px;padding:15px 18px}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-labelBody::before{left:7px;top:7px;width:20px;height:20px;border-left:1px solid #f3d1a1;border-top:1px solid #f3d1a1;background:transparent;box-shadow:none;opacity:.62}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-labelBody::after{inset:5px;border:1px solid #a3cbd00e;background:linear-gradient(115deg,transparent 26%,#e2f3ff0b 47%,transparent 68%);opacity:.22;animation:ion-idle-reflection 9s ease-in-out infinite;pointer-events:none}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] strong{font-size:26px;line-height:1.22;font-weight:600;color:#f1e9df;letter-spacing:-.02em;text-shadow:0 1px 5px #0005}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"][data-network-view=overview] .in-cardWrap>.in-entity[data-kind=step] strong{font-size:32px;line-height:1.2;max-width:92%;margin-top:7px}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] .in-nodeHead{font-size:11px;letter-spacing:.1em;color:#c1a587;position:relative;z-index:1}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] .in-nodeHead>span:last-child{font-size:10px;color:#aabec5;letter-spacing:0}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] .in-nodeDetail{color:#9fb0bd;font-size:13px;line-height:1.45}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-network-entity] .in-nodeFoot{border-top-color:#acc3c62a;color:#bba58d;font-size:10px;line-height:1.45;position:relative;z-index:1;padding-top:8px}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-kind=step]::after{display:block;content:attr(data-stage-number);position:absolute;right:16px;bottom:19px;color:#b9d0d9;opacity:.065;font:600 99px/.8 Consolas,monospace;letter-spacing:-.08em;pointer-events:none;text-shadow:none}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-active=true] .in-labelBody{border-color:#e9c08ba8;background:radial-gradient(ellipse at 0 0,#d4a86920,transparent 70%),linear-gradient(145deg,#3a3938f0,#152431f8);box-shadow:inset 0 1px #ffe2bc55,inset 0 0 30px #e4b6760c,0 0 18px #c28c4922}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-viewed=true] .in-labelBody,[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-ion-hover=true] .in-labelBody{border-color:#efd6b38a;box-shadow:inset 0 1px #fff0d43d,0 8px 24px #0005,0 0 15px #d8ad7212}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-status=submitted] .in-labelBody{border-color:#93bca36b}
.in-moduleHistory,.in-resultSeal{display:none}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-kind=step] .in-moduleHistory{display:flex;gap:5px;flex:none;height:4px;margin-top:0;position:relative;z-index:1}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-moduleHistory:empty{display:none!important}
.in-moduleHistory i{width:18px;height:3px;display:block;opacity:.6;background:#6b7e8c;border-radius:1px}
.in-moduleHistory i[data-status=succeeded],.in-moduleHistory i[data-status=submitted],.in-moduleHistory i[data-status=passed]{background:#9ccbb6}
.in-moduleHistory i[data-status=running]{background:#f5c590;opacity:1;box-shadow:0 0 7px #eeb87880;animation:ion-contact-pulse 1.25s ease-in-out infinite}
.in-moduleHistory i[data-status=failed],.in-moduleHistory i[data-status=refused]{background:#d59889}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-lod=context] .in-nodeDetail,[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-lod=context] .in-moduleHistory{display:none}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-hero=true] .in-labelBody{padding:18px 22px;background:radial-gradient(ellipse at 100% 0,#8bd8c820,transparent 64%),linear-gradient(135deg,#25404ae8,#0b1c2df5);border-color:#b4d3c6b3;box-shadow:inset 0 1px #f4ffe25e,inset 0 0 35px #8ac8b10b,0 8px 35px #0008}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-hero=true] strong{font-size:37px;line-height:1.18;max-width:95%;margin-top:7px;position:relative;z-index:1}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-hero=true] .in-nodeDetail{font-size:12px;max-height:30px;position:relative;z-index:1}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-hero=true] .in-resultSeal{display:block;position:absolute;right:18px;bottom:25px;z-index:0;color:#b1dacb;opacity:.09;font:600 78px/.9 Consolas,monospace;letter-spacing:-.065em;pointer-events:none}
[data-ion-craft="v2"] .ion-world[data-scene-mode=complete] .in-entity[data-hero=true] .in-nodeHead{color:#c8e2ca}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-kind=engine] .in-labelBody{background:linear-gradient(135deg,#233341ed,#0c1926f5);border-color:#b3936e88;box-shadow:inset 0 1px #e8d9bc22,0 5px 16px #0005;padding:16px 20px}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-kind=engine] strong{font-size:25px;line-height:1.2}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .in-navigation{background:linear-gradient(145deg,#182633df,#09131ee8);border-color:#889eaa47;border-top-color:#d1ac7a75;box-shadow:inset 0 1px #def3ff0c,0 10px 28px #0004}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .in-stageRoot{border-radius:2px;color:#a7b4bf;min-height:29px}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .in-stageRoot[data-executing=true]{background:linear-gradient(90deg,#a77b4029,#192a3500);border-color:#d4ad726b;color:#f1d8b7}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .in-stageRoot[data-viewed=true]{box-shadow:inset 2px 0 #d7b584}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .in-parentPath{width:fit-content;max-width:calc(100% - 55px);border-left-color:#c6a77a;background:linear-gradient(90deg,#12202ce8,#12202c88);backdrop-filter:blur(8px);border-radius:0 3px 3px 0;padding:5px 12px;box-shadow:inset 0 1px #d6eaff08,0 4px 15px #0002}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .in-parentPath strong{max-width:480px}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .in-recordPager{background:#10202cdf;border-color:#9bb2b34a;box-shadow:inset 0 1px #d6eaff0c,0 5px 20px #0004}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .in-liveWindow{background:transparent!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .in-liveHead strong{font:500 10px/1.6 "Cascadia Code",Consolas,"Microsoft YaHei UI",monospace;color:#b5c6ce;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .in-liveTape .in-streamLine{font-family:"Cascadia Code",Consolas,"Microsoft YaHei UI",monospace;font-size:10px;color:#a3b7c3;opacity:.8}
@media(prefers-reduced-motion:reduce){[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-labelBody::after,.in-moduleHistory i{animation:none!important}}

/* Precise local feedback for navigation and document controls. */
[data-ion-craft="v2"] :is(.in-stageRoot,.mc-modeOption,.mdoc-icon){position:relative;isolation:isolate;overflow:hidden}
[data-ion-craft="v2"] .in-stageRoot[data-ion-pressed=true]{background:#a77b4030;box-shadow:inset 0 1px 5px #0004}
[data-ion-craft="v2"] .in-stageRoot[data-ion-hover=true]{border-color:#d1b28a75;color:#e9d7bf}
[data-ion-craft="v2"] .mdoc-icon[data-ion-pressed=true]{box-shadow:inset 0 1px 5px #0005}
`;function Lw(i,e){return pp(i,{...e,createIonWorld:xd,workbenchCss:vd})}function Dw(i,e){return Sd(i,{...e,researchSceneState:Yr,createIonWorld:xd,workbenchCss:vd})}export{Lw as createCircuitWorkspace,Dw as createResearchScene,Yr as researchSceneState,wd as stepStateLabels};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

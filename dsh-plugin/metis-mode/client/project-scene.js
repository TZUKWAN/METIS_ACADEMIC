var Dd={not_started:"未开始",working:"处理中",checking:"核验中",needs_revision:"待改进",needs_recheck:"待复核",blocked:"等待处理",passed:"待交付",submitted:"已交付"};function ts(i,e=null){let t=Array.isArray(i?.steps)?i.steps:[],n=Array.isArray(i?.activity)?i.activity:[],r=n.filter(d=>d.status==="running"),s=n.at(-1)||null,a=i?.revision?.phase==="awaiting_downstream"||i?.revision?.decision?.dispatch==="pending",o=n.findLast(d=>d.jobId&&["waiting","unverified"].includes(d.status)),l=i?.execution?.running===!0,c=new Set(r.map(d=>d.stepId).filter(Boolean)),h=t.filter(d=>d.status==="submitted").length,p=t.filter(d=>["needs_revision","needs_recheck","blocked"].includes(d.status)),f=!l&&!r.length&&["failed","refused","needs_revision"].includes(s?.status),u=t.length>0&&h===t.length,g=i?.status!=="ready"?"unavailable":r.length?"running":a?"waiting":l?"processing":o?"waiting":f||p.length?"attention":s?.status==="cancelled"?"stopped":u?"completed":"ready",y=g==="unavailable"?"正在读取项目":r.length?r.at(-1).label:a?"请选择后续步骤是否重做":l?"研究助手正在处理":o?.status==="unverified"?"上次后台任务状态待确认":o?"等待后台任务回执":f?"最近调用需要处理":p.length?"当前成果需要核验或改进":g==="stopped"?"本轮调用已停止":u?"全部步骤已交付":s?.status==="interrupted"?"上次执行已中断":"等待开始或继续研究",m=new Set;for(let d of t)for(let v of d.delivery?.artifacts||[])v.availability==="file"&&m.add(v.path);return{id:i?.id||"",name:i?.name||"",modeName:i?.modeName||"",phase:g,headline:y,target:r.at(-1)?.target||"",activeCalls:r,activities:n,recent:s,delivered:h,total:t.length,files:m.size,attention:p.length,nodes:t.map((d,v)=>({id:d.id,title:d.title,index:v,status:d.status,purpose:d.purpose||"",expected:d.expected||"",delivery:d.delivery||null,feedback:d.feedback||[],label:d.delivery?.manuallyEditedAt&&d.status!=="submitted"?"手动修改待核验":Dd[d.status]||"状态未知",active:c.has(d.id),viewed:d.id===e,loop:d.loop===!0,recentCall:n.findLast(w=>w.stepId===d.id)||null,recentChecks:n.filter(w=>w.stepId===d.id&&w.kind==="review"&&w.invoked!==!1).length}))}}var Aa=`
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
`;function Nd(i,{Icon:e,createIonWorld:t,researchSceneState:n,workbenchCss:r=""}){let s=i.createElement,a=Aa,o={unavailable:"未就绪",running:"执行中",processing:"处理中",waiting:"待确认",attention:"需处理",stopped:"已停止",completed:"已交付",ready:"待继续"};return function({project:c,viewedId:h,viewedManually:p=!1,onInspect:f,onFocusChat:u,onOpenFile:g,onDetails:y,children:m}){let d=n(c,h),v=i.useRef(null),w=i.useRef(null),x=i.useRef(d),C=i.useRef({onInspect:f,onFocusChat:u}),[A,b]=i.useState(!1),[M,B]=i.useState(!0),[k,D]=i.useState("loading"),[W,se]=i.useState(null),[U,Q]=i.useState(0),[re,$]=i.useState(!0);x.current=d,C.current={onInspect:f,onFocusChat:u},i.useLayoutEffect(()=>{if(!M||!v.current)return;let K=v.current,Ie=!0,ke=null,te=null,Ce=null;D("loading"),se(null);try{ke=t({host:v.current,onPick:Le=>C.current.onInspect(Le),onFocusChat:()=>C.current.onFocusChat(),onState:Le=>{Ie&&(Le.renderer&&D(Le.renderer),typeof Le.follow=="boolean"&&$(Le.follow))},onError:Le=>{Ie&&se(Le)}}),w.current=ke,ke.update(x.current);let pe=()=>{let Le=v.current?.getBoundingClientRect();Le?.width&&Le.height&&ke.resize(Le.width,Le.height)};te=new ResizeObserver(pe),te.observe(v.current),pe(),Ce=new IntersectionObserver(Le=>ke.visible(Le[0]?.isIntersecting===!0)),Ce.observe(v.current)}catch(pe){Ie&&(se(pe.message),D("error"))}return()=>{Ie=!1,te?.disconnect(),Ce?.disconnect(),ke?.dispose(),K.replaceChildren(),w.current=null}},[M,U]),i.useEffect(()=>{w.current?.update(d)},[c,h]),i.useEffect(()=>{p&&h&&w.current?.focus(h)},[h,p]);let he=d.activeCalls.at(-1)?.stepId,H=d.nodes.find(K=>K.id===h)||d.nodes.find(K=>K.id===he)||d.nodes[0],ge=K=>K?new Date(K).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return s("section",{className:"mrv ion-display","aria-label":"研究现场","data-theme":"ion","data-phase":d.phase,"data-expanded":A,"data-graphics":k},s("style",null,a+r),s("header",{className:"ion-head"},s("div",{className:"ion-brand"},s("strong",null,"研究现场"),s("small",null,"METIS / LIVE CIRCUIT")),s("span",{className:"ion-phase",role:"status"},o[d.phase]),s("div",{className:"ion-actions"},s("button",{type:"button",className:"ion-icon","aria-label":"全景视角",onClick:()=>w.current?.home()},s(e,{name:"layers",size:13}),s("span",{className:"ion-label"},"全景")),s("button",{type:"button",className:"ion-icon","aria-label":"跟随实际执行","aria-pressed":re,onClick:()=>w.current?.follow(!re)},s(e,{name:"activity",size:13}),s("span",{className:"ion-label"},"跟随")),s("button",{type:"button",className:"ion-icon","aria-label":A?"缩小研究现场":"放大研究现场","aria-pressed":A,onClick:()=>b(K=>!K)},s(e,{name:"expand",size:13})),s("button",{type:"button",className:"ion-icon","aria-label":M?"收起离子回路":"展开离子回路","aria-expanded":M,onClick:()=>B(K=>!K)},s(e,{name:M?"up":"down",size:13})))),M?s("div",{className:"ion-frame"},s("div",{className:"ion-world",ref:v,style:{visibility:W?"hidden":void 0},"aria-label":"三维研究步骤电路"}),s("div",{className:"ion-overview"},s("div",{className:"ion-kpi"},s("strong",null,d.delivered,s("span",null," / "+d.total)),s("small",null,"步骤已交付")),s("div",{className:"ion-kpi"},s("strong",null,d.files),s("small",null,"真实交付文件")),s("div",{className:"ion-kpi"},s("strong",null,d.attention),s("small",null,"待处理步骤")),s("div",{className:"ion-caption"},s("b",null,d.modeName),"节点来自本项目的固定研究流程")),s("div",{className:"ion-controlsHint"},"拖动转动视角 · 滚轮缩放 · 点卡片进入步骤"),s("div",{className:"ion-live"},s("div",null,s("strong",{"data-scene-headline":!0},d.headline),s("small",{title:d.target},d.target||"实际调用开始后，链路与光球随所属步骤点亮"))),k==="loading"||W?s("div",{className:"ion-loader",role:W?"alert":"status"},s("strong",null,W?"三维离子回路未能显示":"正在建立研究链路…"),s("small",null,W||"载入本地场景与实际步骤"),W?s(i.Fragment,null,s("button",{type:"button",className:"ion-icon",onClick:()=>Q(K=>K+1)},"重新初始化场景"),s("div",{className:"ion-fallbackGrid","aria-label":"研究步骤"},d.nodes.map(K=>s("button",{type:"button",className:"ion-fallbackStep",key:K.id,"data-scene-step":K.id,"aria-pressed":K.viewed,onClick:()=>f(K.id)},s("span",null,String(K.index+1).padStart(2,"0")),s("strong",null,K.title),s("small",null,K.label))))):null):null):null,s("div",{className:"ion-deck"},s("section",{className:"ion-panel","aria-label":"步骤焦点"},s("h3",{className:"ion-panelTitle"},s(e,{name:"layers",size:12}),"STEP FOCUS / 步骤焦点"),H?s(i.Fragment,null,s("div",{className:"ion-focusTitle"},s("strong",null,String(H.index+1).padStart(2,"0")+" · "+H.title),s("small",null,H.label)),s("p",{className:"ion-purpose"},H.purpose||H.expected||"此步骤的目标与交付以模式配置为准。"),H.delivery?.artifacts?.filter(K=>K.availability==="file").slice(0,3).map(K=>s("button",{key:K.path,type:"button",className:"ion-file",title:K.path,onClick:()=>g?.(H.id,H.delivery.artifacts.indexOf(K),K)},"↗ "+K.name)),s("div",{className:"ion-focusActions"},s("button",{type:"button",className:"ion-icon",onClick:()=>{f(H.id),u()}},"提出修改意见"),s("button",{type:"button",className:"ion-icon",onClick:()=>y?.(H.id)},"查看步骤详情"))):s("p",{className:"ion-empty"},"当前项目未记录研究步骤。")),s("section",{className:"ion-panel","aria-label":"实际调用动态"},s("h3",{className:"ion-panelTitle"},s(e,{name:"activity",size:12}),"EXECUTION FEED / 实际调用"),d.activities.length?d.activities.slice(-3).reverse().map(K=>s("div",{className:"ion-event",key:K.callId,"data-state":K.status},s("i",{"aria-hidden":!0}),s("div",null,s("strong",null,K.label),s("small",{title:K.target},K.target||K.tool)),s("time",{dateTime:K.startedAt||K.finishedAt},ge(K.startedAt||K.finishedAt)))):s("p",{className:"ion-empty"},"暂无执行记录。研究开始后显示真实工具、读取对象与核验结果。"))),m?s("details",{className:"ion-records"},s("summary",null,"完整执行记录与调用详情"),m):null)}}var zi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Hi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Sh=0,Bc=1,Mh=2;var ea=1,Eh=2,Gr=3,Vi=0,mn=1,gn=2,_i=0,Wr=1,Jt=2,zc=3,Hc=4,Th=5;var nr=100,Ah=101,Ch=102,Rh=103,Ih=104,Ph=200,kh=201,Lh=202,Dh=203,Vc=204,Gc=205,Nh=206,Uh=207,Fh=208,Oh=209,Bh=210,zh=211,Hh=212,Vh=213,Gh=214,co=0,ho=1,po=2,Ir=3,uo=4,fo=5,mo=6,go=7,Wc=0,Wh=1,Xh=2,ii=0,ta=1,na=2,ia=3,ir=4,ra=5,sa=6,aa=7;var Xc=300,rr=301,Xr=302,Xo=303,Yo=304,xo=1e3,$n=1001,bo=1002,Zt=1003,Yh=1004;var oa=1005;var pn=1006,qo=1007;var wi=1008;var xn=1009,Yc=1010,qc=1011,Yr=1012,Zo=1013,qn=1014,Nn=1015,$t=1016,jo=1017,Ko=1018,sr=1020,Zc=35902,jc=35899,Kc=1021,Jc=1022,Zn=1023,gi=1026,Si=1027,Jo=1028,$o=1029,Gi=1030,Qo=1031;var el=1033,la=33776,ca=33777,da=33778,ha=33779,tl=35840,nl=35841,il=35842,rl=35843,sl=36196,al=37492,ol=37496,ll=37488,cl=37489,pa=37490,dl=37491,hl=37808,pl=37809,ul=37810,fl=37811,ml=37812,gl=37813,xl=37814,bl=37815,vl=37816,yl=37817,_l=37818,wl=37819,Sl=37820,Ml=37821,El=36492,Tl=36494,Al=36495,Cl=36283,Rl=36284,ua=36285,Il=36286;var gs=2300,vo=2301,oo=2302,Ac=2303,Cc=2400,Rc=2401,Ic=2402;var qh=3200;var Pl=0,Zh=1,Mi="",hn="srgb",xs="srgb-linear",bs="linear",_t="srgb";var lo=7680;var jh=519,Kh=512,Jh=513,$h=514,$c=515,Qh=516,ep=517,Qc=518,ed=519,td=35044;var nd="300 es",kn=2e3,Pr=2001;function Uu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Fu(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function vs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function tp(){let i=vs("canvas");return i.style.display="block",i}var Ud={},kr=null;function ys(...i){let e="THREE."+i.shift();kr?kr("log",e,...i):console.log(e,...i)}function np(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function $e(...i){i=np(i);let e="THREE."+i.shift();if(kr)kr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function et(...i){i=np(i);let e="THREE."+i.shift();if(kr)kr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ji(...i){let e=i.join(" ");e in Ud||(Ud[e]=!0,$e(...i))}function ip(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var rp={[co]:co,[po]:mo,[uo]:uo,[Ir]:fo,[ho]:ho,[mo]:po,[go]:go,[fo]:Ir},Vn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Fd=1234567,Cr=Math.PI/180,Lr=180/Math.PI;function Ei(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]+"-"+nn[e&255]+nn[e>>8&255]+"-"+nn[e>>16&15|64]+nn[e>>24&255]+"-"+nn[t&63|128]+nn[t>>8&255]+"-"+nn[t>>16&255]+nn[t>>24&255]+nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]).toLowerCase()}function ot(i,e,t){return Math.max(e,Math.min(t,i))}function id(i,e){return(i%e+e)%e}function Ou(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Bu(i,e,t){return i!==e?(t-i)/(e-i):0}function us(i,e,t){return(1-t)*i+t*e}function zu(i,e,t,n){return us(i,e,1-Math.exp(-t*n))}function Hu(i,e=1){return e-Math.abs(id(i,e*2)-e)}function Vu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Gu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Wu(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Xu(i,e){return i+Math.random()*(e-i)}function Yu(i){return i*(.5-Math.random())}function qu(i){i!==void 0&&(Fd=i);let e=Fd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Zu(i){return i*Cr}function ju(i){return i*Lr}function Ku(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Ju(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function rd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function $u(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),p=s((e-n)/2),f=a((e-n)/2),u=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*h,l*p,l*f,o*c);break;case"YZY":i.set(l*f,o*h,l*p,o*c);break;case"ZXZ":i.set(l*p,l*f,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*u,o*c);break;case"YXY":i.set(l*u,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*u,o*h,o*c);break;default:$e("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function kl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function sd(i,e){if(e.constructor===Float32Array)return i;let t=kl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function ad(i,e){if(e.constructor===Float32Array)return i;let t=kl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var Un={DEG2RAD:Cr,RAD2DEG:Lr,generateUUID:Ei,clamp:ot,euclideanModulo:id,mapLinear:Ou,inverseLerp:Bu,lerp:us,damp:zu,pingpong:Hu,smoothstep:Vu,smootherstep:Gu,randInt:Wu,randFloat:Xu,randFloatSpread:Yu,seededRandom:qu,degToRad:Zu,radToDeg:ju,isPowerOfTwo:Ku,ceilPowerOfTwo:Ju,floorPowerOfTwo:rd,setQuaternionFromProperEuler:$u,normalize:ad,denormalize:sd},ye=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},un=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],p=n[r+3],f=s[a+0],u=s[a+1],g=s[a+2],y=s[a+3];if(p!==y||l!==f||c!==u||h!==g){let m=l*f+c*u+h*g+p*y;m<0&&(f=-f,u=-u,g=-g,y=-y,m=-m);let d=1-o;if(m<.9995){let v=Math.acos(m),w=Math.sin(v);d=Math.sin(d*v)/w,o=Math.sin(o*v)/w,l=l*d+f*o,c=c*d+u*o,h=h*d+g*o,p=p*d+y*o}else{l=l*d+f*o,c=c*d+u*o,h=h*d+g*o,p=p*d+y*o;let v=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=v,c*=v,h*=v,p*=v}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],p=s[a],f=s[a+1],u=s[a+2],g=s[a+3];return e[t]=o*g+h*p+l*u-c*f,e[t+1]=l*g+h*f+c*p-o*u,e[t+2]=c*g+h*u+o*f-l*p,e[t+3]=h*g-o*p-l*f-c*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),p=o(s/2),f=l(n/2),u=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=f*h*p+c*u*g,this._y=c*u*p-f*h*g,this._z=c*h*g+f*u*p,this._w=c*h*p-f*u*g;break;case"YXZ":this._x=f*h*p+c*u*g,this._y=c*u*p-f*h*g,this._z=c*h*g-f*u*p,this._w=c*h*p+f*u*g;break;case"ZXY":this._x=f*h*p-c*u*g,this._y=c*u*p+f*h*g,this._z=c*h*g+f*u*p,this._w=c*h*p-f*u*g;break;case"ZYX":this._x=f*h*p-c*u*g,this._y=c*u*p+f*h*g,this._z=c*h*g-f*u*p,this._w=c*h*p+f*u*g;break;case"YZX":this._x=f*h*p+c*u*g,this._y=c*u*p+f*h*g,this._z=c*h*g-f*u*p,this._w=c*h*p-f*u*g;break;case"XZY":this._x=f*h*p-c*u*g,this._y=c*u*p-f*h*g,this._z=c*h*g+f*u*p,this._w=c*h*p+f*u*g;break;default:$e("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],p=t[10],f=n+o+p;if(f>0){let u=.5/Math.sqrt(f+1);this._w=.25/u,this._x=(h-l)*u,this._y=(s-c)*u,this._z=(a-r)*u}else if(n>o&&n>p){let u=2*Math.sqrt(1+n-o-p);this._w=(h-l)/u,this._x=.25*u,this._y=(r+a)/u,this._z=(s+c)/u}else if(o>p){let u=2*Math.sqrt(1+o-n-p);this._w=(s-c)/u,this._x=(r+a)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+p-n-o);this._w=(a-r)/u,this._x=(s+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Od.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Od.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),p=2*(s*n-a*t);return this.x=t+l*c+a*p-o*h,this.y=n+l*h+o*c-s*p,this.z=r+l*p+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return tc.copy(this).projectOnVector(e),this.sub(tc)}reflect(e){return this.sub(tc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},tc=new R,Od=new un,it=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],p=n[7],f=n[2],u=n[5],g=n[8],y=r[0],m=r[3],d=r[6],v=r[1],w=r[4],x=r[7],C=r[2],A=r[5],b=r[8];return s[0]=a*y+o*v+l*C,s[3]=a*m+o*w+l*A,s[6]=a*d+o*x+l*b,s[1]=c*y+h*v+p*C,s[4]=c*m+h*w+p*A,s[7]=c*d+h*x+p*b,s[2]=f*y+u*v+g*C,s[5]=f*m+u*w+g*A,s[8]=f*d+u*x+g*b,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],p=h*a-o*c,f=o*l-h*s,u=c*s-a*l,g=t*p+n*f+r*u;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=p*y,e[1]=(r*c-h*n)*y,e[2]=(o*n-r*a)*y,e[3]=f*y,e[4]=(h*t-r*l)*y,e[5]=(r*s-o*t)*y,e[6]=u*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Ji("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(nc.makeScale(e,t)),this}rotate(e){return Ji("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(nc.makeRotation(-e)),this}translate(e,t){return Ji("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(nc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},nc=new it,Bd=new it().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zd=new it().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Qu(){let i={enabled:!0,workingColorSpace:xs,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===_t&&(r.r=mi(r.r),r.g=mi(r.g),r.b=mi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_t&&(r.r=Rr(r.r),r.g=Rr(r.g),r.b=Rr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Mi?bs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[a].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[xs]:{primaries:e,whitePoint:n,transfer:bs,toXYZ:Bd,fromXYZ:zd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:n,transfer:_t,toXYZ:Bd,fromXYZ:zd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}var ft=Qu();function mi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Rr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var dr,yo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{dr===void 0&&(dr=vs("canvas")),dr.width=e.width,dr.height=e.height;let r=dr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=dr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=vs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=mi(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(mi(t[n]/255)*255):t[n]=mi(t[n]);return{data:t,width:e.width,height:e.height}}else return $e("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ef=0,Dr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=Ei(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ic(r[a].image)):s.push(ic(r[a]))}else s=ic(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function ic(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?yo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:($e("Texture: Unable to serialize Texture."),{})}var tf=0,rc=new R,fn=class i extends Vn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=$n,r=$n,s=pn,a=wi,o=Zn,l=xn,c=i.DEFAULT_ANISOTROPY,h=Mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=Ei(),this.name="",this.source=new Dr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new it,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(rc).x}get height(){return this.source.getSize(rc).y}get depth(){return this.source.getSize(rc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){$e(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){$e(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Xc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xo:e.x=e.x-Math.floor(e.x);break;case $n:e.x=e.x<0?0:1;break;case bo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xo:e.y=e.y-Math.floor(e.y);break;case $n:e.y=e.y<0?0:1;break;case bo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=Xc;fn.DEFAULT_ANISOTROPY=1;var Pt=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],h=l[4],p=l[8],f=l[1],u=l[5],g=l[9],y=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(p-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(p+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+u+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,x=(u+1)/2,C=(d+1)/2,A=(h+f)/4,b=(p+y)/4,M=(g+m)/4;return w>x&&w>C?w<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(w),r=A/n,s=b/n):x>C?x<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),n=A/r,s=M/r):C<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),n=b/s,r=M/s),this.set(n,r,s,t),this}let v=Math.sqrt((m-g)*(m-g)+(p-y)*(p-y)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(p-y)/v,this.z=(f-h)/v,this.w=Math.acos((c+u+d-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},_o=class extends Vn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t),this.textures=[];let r=n.count;for(let s=0;s<r;s++)this.textures[s]=new fn({width:e,height:t,depth:n.depth}),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:pn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Dr(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Bt=class extends _o{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},_s=class extends fn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var wo=class extends fn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var ht=class i{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,l,c,h,p,f,u,g,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,p,f,u,g,y,m)}set(e,t,n,r,s,a,o,l,c,h,p,f,u,g,y,m){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=p,d[14]=f,d[3]=u,d[7]=g,d[11]=y,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/hr.setFromMatrixColumn(e,0).length(),s=1/hr.setFromMatrixColumn(e,1).length(),a=1/hr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){let f=a*h,u=a*p,g=o*h,y=o*p;t[0]=l*h,t[4]=-l*p,t[8]=c,t[1]=u+g*c,t[5]=f-y*c,t[9]=-o*l,t[2]=y-f*c,t[6]=g+u*c,t[10]=a*l}else if(e.order==="YXZ"){let f=l*h,u=l*p,g=c*h,y=c*p;t[0]=f+y*o,t[4]=g*o-u,t[8]=a*c,t[1]=a*p,t[5]=a*h,t[9]=-o,t[2]=u*o-g,t[6]=y+f*o,t[10]=a*l}else if(e.order==="ZXY"){let f=l*h,u=l*p,g=c*h,y=c*p;t[0]=f-y*o,t[4]=-a*p,t[8]=g+u*o,t[1]=u+g*o,t[5]=a*h,t[9]=y-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let f=a*h,u=a*p,g=o*h,y=o*p;t[0]=l*h,t[4]=g*c-u,t[8]=f*c+y,t[1]=l*p,t[5]=y*c+f,t[9]=u*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let f=a*l,u=a*c,g=o*l,y=o*c;t[0]=l*h,t[4]=y-f*p,t[8]=g*p+u,t[1]=p,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=u*p+g,t[10]=f-y*p}else if(e.order==="XZY"){let f=a*l,u=a*c,g=o*l,y=o*c;t[0]=l*h,t[4]=-p,t[8]=c*h,t[1]=f*p+y,t[5]=a*h,t[9]=u*p-g,t[2]=g*p-u,t[6]=o*h,t[10]=y*p+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(nf,e,rf)}lookAt(e,t,n){let r=this.elements;return yn.subVectors(e,t),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Ci.crossVectors(n,yn),Ci.lengthSq()===0&&(Math.abs(n.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Ci.crossVectors(n,yn)),Ci.normalize(),Ca.crossVectors(yn,Ci),r[0]=Ci.x,r[4]=Ca.x,r[8]=yn.x,r[1]=Ci.y,r[5]=Ca.y,r[9]=yn.y,r[2]=Ci.z,r[6]=Ca.z,r[10]=yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],p=n[5],f=n[9],u=n[13],g=n[2],y=n[6],m=n[10],d=n[14],v=n[3],w=n[7],x=n[11],C=n[15],A=r[0],b=r[4],M=r[8],B=r[12],k=r[1],D=r[5],W=r[9],se=r[13],U=r[2],Q=r[6],re=r[10],$=r[14],he=r[3],H=r[7],ge=r[11],K=r[15];return s[0]=a*A+o*k+l*U+c*he,s[4]=a*b+o*D+l*Q+c*H,s[8]=a*M+o*W+l*re+c*ge,s[12]=a*B+o*se+l*$+c*K,s[1]=h*A+p*k+f*U+u*he,s[5]=h*b+p*D+f*Q+u*H,s[9]=h*M+p*W+f*re+u*ge,s[13]=h*B+p*se+f*$+u*K,s[2]=g*A+y*k+m*U+d*he,s[6]=g*b+y*D+m*Q+d*H,s[10]=g*M+y*W+m*re+d*ge,s[14]=g*B+y*se+m*$+d*K,s[3]=v*A+w*k+x*U+C*he,s[7]=v*b+w*D+x*Q+C*H,s[11]=v*M+w*W+x*re+C*ge,s[15]=v*B+w*se+x*$+C*K,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],p=e[6],f=e[10],u=e[14],g=e[3],y=e[7],m=e[11],d=e[15],v=l*u-c*f,w=o*u-c*p,x=o*f-l*p,C=a*u-c*h,A=a*f-l*h,b=a*p-o*h;return t*(y*v-m*w+d*x)-n*(g*v-m*C+d*A)+r*(g*w-y*C+d*b)-s*(g*x-y*A+m*b)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(s*h-o*l)+r*(s*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],p=e[9],f=e[10],u=e[11],g=e[12],y=e[13],m=e[14],d=e[15],v=t*o-n*a,w=t*l-r*a,x=t*c-s*a,C=n*l-r*o,A=n*c-s*o,b=r*c-s*l,M=h*y-p*g,B=h*m-f*g,k=h*d-u*g,D=p*m-f*y,W=p*d-u*y,se=f*d-u*m,U=v*se-w*W+x*D+C*k-A*B+b*M;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let Q=1/U;return e[0]=(o*se-l*W+c*D)*Q,e[1]=(r*W-n*se-s*D)*Q,e[2]=(y*b-m*A+d*C)*Q,e[3]=(f*A-p*b-u*C)*Q,e[4]=(l*k-a*se-c*B)*Q,e[5]=(t*se-r*k+s*B)*Q,e[6]=(m*x-g*b-d*w)*Q,e[7]=(h*b-f*x+u*w)*Q,e[8]=(a*W-o*k+c*M)*Q,e[9]=(n*k-t*W-s*M)*Q,e[10]=(g*A-y*x+d*v)*Q,e[11]=(p*x-h*A-u*v)*Q,e[12]=(o*B-a*D-l*M)*Q,e[13]=(t*D-n*B+r*M)*Q,e[14]=(y*w-g*C-m*v)*Q,e[15]=(h*C-p*w+f*v)*Q,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,p=o+o,f=s*c,u=s*h,g=s*p,y=a*h,m=a*p,d=o*p,v=l*c,w=l*h,x=l*p,C=n.x,A=n.y,b=n.z;return r[0]=(1-(y+d))*C,r[1]=(u+x)*C,r[2]=(g-w)*C,r[3]=0,r[4]=(u-x)*A,r[5]=(1-(f+d))*A,r[6]=(m+v)*A,r[7]=0,r[8]=(g+w)*b,r[9]=(m-v)*b,r[10]=(1-(f+y))*b,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=hr.set(r[0],r[1],r[2]).length(),o=hr.set(r[4],r[5],r[6]).length(),l=hr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Bn.copy(this);let c=1/a,h=1/o,p=1/l;return Bn.elements[0]*=c,Bn.elements[1]*=c,Bn.elements[2]*=c,Bn.elements[4]*=h,Bn.elements[5]*=h,Bn.elements[6]*=h,Bn.elements[8]*=p,Bn.elements[9]*=p,Bn.elements[10]*=p,t.setFromRotationMatrix(Bn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=kn,l=!1){let c=this.elements,h=2*s/(t-e),p=2*s/(n-r),f=(t+e)/(t-e),u=(n+r)/(n-r),g,y;if(l)g=s/(a-s),y=a*s/(a-s);else if(o===kn)g=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===Pr)g=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=p,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=kn,l=!1){let c=this.elements,h=2/(t-e),p=2/(n-r),f=-(t+e)/(t-e),u=-(n+r)/(n-r),g,y;if(l)g=1/(a-s),y=a/(a-s);else if(o===kn)g=-2/(a-s),y=-(a+s)/(a-s);else if(o===Pr)g=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=p,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},hr=new R,Bn=new ht,nf=new R(0,0,0),rf=new R(1,1,1),Ci=new R,Ca=new R,yn=new R,Hd=new ht,Vd=new un,xi=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],p=r[2],f=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(ot(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-p,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ot(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(f,u),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ot(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,u),this._y=0);break;default:$e("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Hd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vd.setFromEuler(this),this.setFromQuaternion(Vd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};xi.DEFAULT_ORDER="XYZ";var ws=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},sf=0,Gd=new R,pr=new un,di=new ht,Ra=new R,ns=new R,af=new R,of=new un,Wd=new R(1,0,0),Xd=new R(0,1,0),Yd=new R(0,0,1),qd={type:"added"},lf={type:"removed"},ur={type:"childadded",child:null},sc={type:"childremoved",child:null},Nt=class i extends Vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=Ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new R,t=new xi,n=new un,r=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ht},normalMatrix:{value:new it}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ws,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pr.setFromAxisAngle(e,t),this.quaternion.multiply(pr),this}rotateOnWorldAxis(e,t){return pr.setFromAxisAngle(e,t),this.quaternion.premultiply(pr),this}rotateX(e){return this.rotateOnAxis(Wd,e)}rotateY(e){return this.rotateOnAxis(Xd,e)}rotateZ(e){return this.rotateOnAxis(Yd,e)}translateOnAxis(e,t){return Gd.copy(e).applyQuaternion(this.quaternion),this.position.add(Gd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wd,e)}translateY(e){return this.translateOnAxis(Xd,e)}translateZ(e){return this.translateOnAxis(Yd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ra.copy(e):Ra.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(ns,Ra,this.up):di.lookAt(Ra,ns,this.up),this.quaternion.setFromRotationMatrix(di),r&&(di.extractRotation(r.matrixWorld),pr.setFromRotationMatrix(di),this.quaternion.premultiply(pr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(qd),ur.child=e,this.dispatchEvent(ur),ur.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(lf),sc.child=e,this.dispatchEvent(sc),sc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(qd),ur.child=e,this.dispatchEvent(ur),ur.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,e,af),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,of,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let p=l[c];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),p=a(e.shapes),f=a(e.skeletons),u=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),f.length>0&&(n.skeletons=f),u.length>0&&(n.animations=u),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Nt.DEFAULT_UP=new R(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var At=class extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}},cf={type:"move"},Nr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new At,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new At,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new At,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,n),d=this._getHandJoint(c,y);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.quaternion,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],f=h.position.distanceTo(p.position),u=.02,g=.005;c.inputState.pinching&&f>u+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=u-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(cf)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new At;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},sp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ri={h:0,s:0,l:0},Ia={h:0,s:0,l:0};function ac(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Je=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ft.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=ft.workingColorSpace){return this.r=e,this.g=t,this.b=n,ft.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=ft.workingColorSpace){if(e=id(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ac(a,s,e+1/3),this.g=ac(a,s,e),this.b=ac(a,s,e-1/3)}return ft.colorSpaceToWorking(this,r),this}setStyle(e,t=hn){function n(s){s!==void 0&&parseFloat(s)<1&&$e("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,t);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:$e("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);$e("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){let n=sp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):$e("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mi(e.r),this.g=mi(e.g),this.b=mi(e.b),this}copyLinearToSRGB(e){return this.r=Rr(e.r),this.g=Rr(e.g),this.b=Rr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return ft.workingToColorSpace(rn.copy(this),e),Math.round(ot(rn.r*255,0,255))*65536+Math.round(ot(rn.g*255,0,255))*256+Math.round(ot(rn.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ft.workingColorSpace){ft.workingToColorSpace(rn.copy(this),t);let n=rn.r,r=rn.g,s=rn.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let p=a-o;switch(c=h<=.5?p/(a+o):p/(2-a-o),a){case n:l=(r-s)/p+(r<s?6:0);break;case r:l=(s-n)/p+2;break;case s:l=(n-r)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ft.workingColorSpace){return ft.workingToColorSpace(rn.copy(this),t),e.r=rn.r,e.g=rn.g,e.b=rn.b,e}getStyle(e=hn){ft.workingToColorSpace(rn.copy(this),e);let t=rn.r,n=rn.g,r=rn.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Ri),this.setHSL(Ri.h+e,Ri.s+t,Ri.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ri),e.getHSL(Ia);let n=us(Ri.h,Ia.h,t),r=us(Ri.s,Ia.s,t),s=us(Ri.l,Ia.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},rn=new Je;Je.NAMES=sp;var Ss=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Je(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Ms=class extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xi,this.environmentIntensity=1,this.environmentRotation=new xi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},zn=new R,hi=new R,oc=new R,pi=new R,fr=new R,mr=new R,Zd=new R,lc=new R,cc=new R,dc=new R,hc=new Pt,pc=new Pt,uc=new Pt,Jn=class i{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),zn.subVectors(e,t),r.cross(zn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){zn.subVectors(r,t),hi.subVectors(n,t),oc.subVectors(e,t);let a=zn.dot(zn),o=zn.dot(hi),l=zn.dot(oc),c=hi.dot(hi),h=hi.dot(oc),p=a*c-o*o;if(p===0)return s.set(0,0,0),null;let f=1/p,u=(c*l-o*h)*f,g=(a*h-o*l)*f;return s.set(1-u-g,g,u)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,pi.x),l.addScaledVector(a,pi.y),l.addScaledVector(o,pi.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return hc.setScalar(0),pc.setScalar(0),uc.setScalar(0),hc.fromBufferAttribute(e,t),pc.fromBufferAttribute(e,n),uc.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(hc,s.x),a.addScaledVector(pc,s.y),a.addScaledVector(uc,s.z),a}static isFrontFacing(e,t,n,r){return zn.subVectors(n,t),hi.subVectors(e,t),zn.cross(hi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zn.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),zn.cross(hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;fr.subVectors(r,n),mr.subVectors(s,n),lc.subVectors(e,n);let l=fr.dot(lc),c=mr.dot(lc);if(l<=0&&c<=0)return t.copy(n);cc.subVectors(e,r);let h=fr.dot(cc),p=mr.dot(cc);if(h>=0&&p<=h)return t.copy(r);let f=l*p-h*c;if(f<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),t.copy(n).addScaledVector(fr,a);dc.subVectors(e,s);let u=fr.dot(dc),g=mr.dot(dc);if(g>=0&&u<=g)return t.copy(s);let y=u*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(mr,o);let m=h*g-u*p;if(m<=0&&p-h>=0&&u-g>=0)return Zd.subVectors(s,r),o=(p-h)/(p-h+(u-g)),t.copy(r).addScaledVector(Zd,o);let d=1/(m+y+f);return a=y*d,o=f*d,t.copy(n).addScaledVector(fr,a).addScaledVector(mr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Dn=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Hn):Hn.fromBufferAttribute(s,a),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pa.copy(n.boundingBox)),Pa.applyMatrix4(e.matrixWorld),this.union(Pa)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(is),ka.subVectors(this.max,is),gr.subVectors(e.a,is),xr.subVectors(e.b,is),br.subVectors(e.c,is),Ii.subVectors(xr,gr),Pi.subVectors(br,xr),qi.subVectors(gr,br);let t=[0,-Ii.z,Ii.y,0,-Pi.z,Pi.y,0,-qi.z,qi.y,Ii.z,0,-Ii.x,Pi.z,0,-Pi.x,qi.z,0,-qi.x,-Ii.y,Ii.x,0,-Pi.y,Pi.x,0,-qi.y,qi.x,0];return!fc(t,gr,xr,br,ka)||(t=[1,0,0,0,1,0,0,0,1],!fc(t,gr,xr,br,ka))?!1:(La.crossVectors(Ii,Pi),t=[La.x,La.y,La.z],fc(t,gr,xr,br,ka))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ui=[new R,new R,new R,new R,new R,new R,new R,new R],Hn=new R,Pa=new Dn,gr=new R,xr=new R,br=new R,Ii=new R,Pi=new R,qi=new R,is=new R,ka=new R,La=new R,Zi=new R;function fc(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Zi.fromArray(i,s);let o=r.x*Math.abs(Zi.x)+r.y*Math.abs(Zi.y)+r.z*Math.abs(Zi.z),l=e.dot(Zi),c=t.dot(Zi),h=n.dot(Zi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ot=new R,Da=new ye,df=0,Ln=class extends Vn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:df++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=td,this.updateRanges=[],this.gpuType=Nn,this.version=0,this._normalizationScale=e!==void 0?kl(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Da.fromBufferAttribute(this,t),Da.applyMatrix3(e),this.setXY(t,Da.x,Da.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix3(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix4(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyNormalMatrix(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.transformDirection(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):sd(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):ad(e,this.array)}};var Es=class extends Ln{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ts=class extends Ln{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var pt=class extends Ln{constructor(e,t,n){super(new Float32Array(e),t,n)}},hf=new Dn,rs=new R,mc=new R,ei=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):hf.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rs.subVectors(e,this.center);let t=rs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(rs,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(mc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rs.copy(e.center).add(mc)),this.expandByPoint(rs.copy(e.center).sub(mc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},pf=0,Pn=new ht,gc=new Nt,vr=new R,_n=new Dn,ss=new Dn,qt=new R,yt=class i extends Vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=Ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Uu(e)?Ts:Es)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new it().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Pn.makeRotationFromQuaternion(e),this.applyMatrix4(Pn),this}rotateX(e){return Pn.makeRotationX(e),this.applyMatrix4(Pn),this}rotateY(e){return Pn.makeRotationY(e),this.applyMatrix4(Pn),this}rotateZ(e){return Pn.makeRotationZ(e),this.applyMatrix4(Pn),this}translate(e,t,n){return Pn.makeTranslation(e,t,n),this.applyMatrix4(Pn),this}scale(e,t,n){return Pn.makeScale(e,t,n),this.applyMatrix4(Pn),this}lookAt(e){return gc.lookAt(e),gc.updateMatrix(),this.applyMatrix4(gc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vr).negate(),this.translate(vr.x,vr.y,vr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new pt(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&$e("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];_n.setFromBufferAttribute(s),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ei);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let n=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];ss.setFromBufferAttribute(o),this.morphTargetsRelative?(qt.addVectors(_n.min,ss.min),_n.expandByPoint(qt),qt.addVectors(_n.max,ss.max),_n.expandByPoint(qt)):(_n.expandByPoint(ss.min),_n.expandByPoint(ss.max))}_n.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)qt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(qt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)qt.fromBufferAttribute(o,c),l&&(vr.fromBufferAttribute(e,c),qt.add(vr)),r=Math.max(r,n.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ln(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let B=0;B<n.count;B++)o[B]=new R,l[B]=new R;let h=new R,p=new R,f=new R,u=new ye,g=new ye,y=new ye,m=new R,d=new R;function v(B,k,D){c[B]=c[k]=c[D]=1,h.fromBufferAttribute(n,B),p.fromBufferAttribute(n,k),f.fromBufferAttribute(n,D),u.fromBufferAttribute(s,B),g.fromBufferAttribute(s,k),y.fromBufferAttribute(s,D),p.sub(h),f.sub(h),g.sub(u),y.sub(u);let W=1/(g.x*y.y-y.x*g.y);isFinite(W)&&(m.copy(p).multiplyScalar(y.y).addScaledVector(f,-g.y).multiplyScalar(W),d.copy(f).multiplyScalar(g.x).addScaledVector(p,-y.x).multiplyScalar(W),o[B].add(m),o[k].add(m),o[D].add(m),l[B].add(d),l[k].add(d),l[D].add(d))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let B=0,k=w.length;B<k;++B){let D=w[B],W=D.start,se=D.count;for(let U=W,Q=W+se;U<Q;U+=3)v(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let x=new R,C=new R,A=new R,b=new R;function M(B){A.fromBufferAttribute(r,B),b.copy(A);let k=o[B];x.copy(k),x.sub(A.multiplyScalar(A.dot(k))).normalize(),C.crossVectors(b,k);let W=C.dot(l[B])<0?-1:1;a.setXYZW(B,x.x,x.y,x.z,W)}for(let B=0,k=n.count;B<k;++B)c[B]&&M(B);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Ln(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,u=n.count;f<u;f++)n.setXYZ(f,0,0,0);let r=new R,s=new R,a=new R,o=new R,l=new R,c=new R,h=new R,p=new R;if(e)for(let f=0,u=e.count;f<u;f+=3){let g=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,m),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,u=t.count;f<u;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,p=o.normalized,f=new c.constructor(l.length*h),u=0,g=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?u=l[y]*o.data.stride+o.offset:u=l[y]*h;for(let d=0;d<h;d++)f[g++]=c[u++]}return new Ln(f,h,p)}if(this.index===null)return $e("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,p=c.length;h<p;h++){let f=c[h],u=e(f,n);l.push(u)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let p=0,f=c.length;p<f;p++){let u=c[p];h.push(u.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],p=s[c];for(let f=0,u=p.length;f<u;f++)h.push(p[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},So=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=td,this.updateRanges=[],this.version=0,this.uuid=Ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=jd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),r=new this.constructor(n,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=jd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function jd(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=Ei()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var dn=new R,As=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r,this._normalizationScale=e!==void 0?kl(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)dn.fromBufferAttribute(this,t),dn.applyMatrix4(e),this.setXYZ(t,dn.x,dn.y,dn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)dn.fromBufferAttribute(this,t),dn.applyNormalMatrix(e),this.setXYZ(t,dn.x,dn.y,dn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)dn.fromBufferAttribute(this,t),dn.transformDirection(e),this.setXYZ(t,dn.x,dn.y,dn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){ys("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Ln(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ys("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):sd(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):ad(e,this.data.array)}},xc=new R,uf=new R,ff=new it,wn=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=xc.subVectors(n,t).cross(uf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(xc),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ff.getNormalMatrix(e),r=this.coplanarPoint(xc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},mf=0,Gn=class extends Vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=Ei(),this.name="",this.type="Material",this.blending=Wr,this.side=Vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vc,this.blendDst=Gc,this.blendEquation=nr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=Ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=lo,this.stencilZFail=lo,this.stencilZPass=lo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){$e(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){$e(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new wn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ye().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ye().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Wn=class extends Gn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},yr,as=new R,_r=new R,wr=new R,Sr=new ye,os=new ye,ap=new ht,Na=new R,ls=new R,Ua=new R,Kd=new ye,bc=new ye,Jd=new ye,ti=class extends Nt{constructor(e=new Wn){if(super(),this.isSprite=!0,this.type="Sprite",yr===void 0){yr=new yt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new So(t,5);yr.setIndex([0,1,2,0,2,3]),yr.setAttribute("position",new As(n,3,0,!1)),yr.setAttribute("uv",new As(n,2,3,!1))}this.geometry=yr,this.material=e,this.center=new ye(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&et('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),_r.setFromMatrixScale(this.matrixWorld),ap.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),wr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&_r.multiplyScalar(-wr.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;Fa(Na.set(-.5,-.5,0),wr,a,_r,r,s),Fa(ls.set(.5,-.5,0),wr,a,_r,r,s),Fa(Ua.set(.5,.5,0),wr,a,_r,r,s),Kd.set(0,0),bc.set(1,0),Jd.set(1,1);let o=e.ray.intersectTriangle(Na,ls,Ua,!1,as);if(o===null&&(Fa(ls.set(-.5,.5,0),wr,a,_r,r,s),bc.set(0,1),o=e.ray.intersectTriangle(Na,Ua,ls,!1,as),o===null))return;let l=e.ray.origin.distanceTo(as);l<e.near||l>e.far||t.push({distance:l,point:as.clone(),uv:Jn.getInterpolation(as,Na,ls,Ua,Kd,bc,Jd,new ye),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function Fa(i,e,t,n,r,s){Sr.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(os.x=s*Sr.x-r*Sr.y,os.y=r*Sr.x+s*Sr.y):os.copy(Sr),i.copy(e),i.x+=os.x,i.y+=os.y,i.applyMatrix4(ap)}var fi=new R,vc=new R,Oa=new R,Ba=new R,Li=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fi.copy(this.origin).addScaledVector(this.direction,t),fi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){vc.copy(e).add(t).multiplyScalar(.5),Oa.copy(t).sub(e).normalize(),Ba.copy(this.origin).sub(vc);let s=e.distanceTo(t)*.5,a=-this.direction.dot(Oa),o=Ba.dot(this.direction),l=-Ba.dot(Oa),c=Ba.lengthSq(),h=Math.abs(1-a*a),p,f,u,g;if(h>0)if(p=a*l-o,f=a*o-l,g=s*h,p>=0)if(f>=-g)if(f<=g){let y=1/h;p*=y,f*=y,u=p*(p+a*f+2*o)+f*(a*p+f+2*l)+c}else f=s,p=Math.max(0,-(a*f+o)),u=-p*p+f*(f+2*l)+c;else f=-s,p=Math.max(0,-(a*f+o)),u=-p*p+f*(f+2*l)+c;else f<=-g?(p=Math.max(0,-(-a*s+o)),f=p>0?-s:Math.min(Math.max(-s,-l),s),u=-p*p+f*(f+2*l)+c):f<=g?(p=0,f=Math.min(Math.max(-s,-l),s),u=f*(f+2*l)+c):(p=Math.max(0,-(a*s+o)),f=p>0?s:Math.min(Math.max(-s,-l),s),u=-p*p+f*(f+2*l)+c);else f=a>0?-s:s,p=Math.max(0,-(a*f+o)),u=-p*p+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(vc).addScaledVector(Oa,f),u}intersectSphere(e,t){if(e.radius<0)return null;fi.subVectors(e.center,this.origin);let n=fi.dot(this.direction),r=fi.dot(fi)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),h>=0?(s=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-f.z)*p,l=(e.max.z-f.z)*p):(o=(e.max.z-f.z)*p,l=(e.min.z-f.z)*p),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,fi)!==null}intersectTriangle(e,t,n,r,s){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,p=e.x-a.x,f=e.y-a.y,u=e.z-a.z,g=t.x-a.x,y=t.y-a.y,m=t.z-a.z,d=n.x-a.x,v=n.y-a.y,w=n.z-a.z,x=Math.abs(l),C=Math.abs(c),A=Math.abs(h),b,M,B,k,D,W,se,U,Q,re,$,he;if(x>=C&&x>=A?(B=l,W=p,Q=g,he=d,l>=0?(b=c,M=h,k=f,D=u,se=y,U=m,re=v,$=w):(b=h,M=c,k=u,D=f,se=m,U=y,re=w,$=v)):C>=A?(B=c,W=f,Q=y,he=v,c>=0?(b=h,M=l,k=u,D=p,se=m,U=g,re=w,$=d):(b=l,M=h,k=p,D=u,se=g,U=m,re=d,$=w)):(B=h,W=u,Q=m,he=w,h>=0?(b=l,M=c,k=p,D=f,se=g,U=y,re=d,$=v):(b=c,M=l,k=f,D=p,se=y,U=g,re=v,$=d)),B===0)return null;let H=b/B,ge=M/B,K=1/B,Ie=k-H*W,ke=D-ge*W,te=se-H*Q,Ce=U-ge*Q,pe=re-H*he,Le=$-ge*he,Re=pe*Ce-Le*te,Ue=Ie*Le-ke*pe,lt=te*ke-Ce*Ie;if(r){if(Re<0||Ue<0||lt<0)return null}else if((Re<0||Ue<0||lt<0)&&(Re>0||Ue>0||lt>0))return null;let Oe=Re+Ue+lt;if(Oe===0)return null;let He=K*(Re*W+Ue*Q+lt*he);return(Oe>0?He<0:He>0)?null:this.at(He/Oe,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},zt=class extends Gn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.combine=Wc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},$d=new ht,ji=new Li,za=new ei,Qd=new R,Ha=new R,Va=new R,Ga=new R,yc=new R,Wa=new R,eh=new R,Xa=new R,mt=class extends Nt{constructor(e=new yt,t=new zt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Wa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],p=s[l];h!==0&&(yc.fromBufferAttribute(p,e),a?Wa.addScaledVector(yc,h):Wa.addScaledVector(yc.sub(t),h))}t.add(Wa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),za.copy(n.boundingSphere),za.applyMatrix4(s),ji.copy(e.ray).recast(e.near),!(za.containsPoint(ji.origin)===!1&&(ji.intersectSphere(za,Qd)===null||ji.origin.distanceToSquared(Qd)>(e.far-e.near)**2))&&($d.copy(s).invert(),ji.copy(e.ray).applyMatrix4($d),!(n.boundingBox!==null&&ji.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ji)))}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,p=s.attributes.normal,f=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){let m=f[g],d=a[m.materialIndex],v=Math.max(m.start,u.start),w=Math.min(o.count,Math.min(m.start+m.count,u.start+u.count));for(let x=v,C=w;x<C;x+=3){let A=o.getX(x),b=o.getX(x+1),M=o.getX(x+2);r=Ya(this,d,e,n,c,h,p,A,b,M),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,u.start),y=Math.min(o.count,u.start+u.count);for(let m=g,d=y;m<d;m+=3){let v=o.getX(m),w=o.getX(m+1),x=o.getX(m+2);r=Ya(this,a,e,n,c,h,p,v,w,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){let m=f[g],d=a[m.materialIndex],v=Math.max(m.start,u.start),w=Math.min(l.count,Math.min(m.start+m.count,u.start+u.count));for(let x=v,C=w;x<C;x+=3){let A=x,b=x+1,M=x+2;r=Ya(this,d,e,n,c,h,p,A,b,M),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,u.start),y=Math.min(l.count,u.start+u.count);for(let m=g,d=y;m<d;m+=3){let v=m,w=m+1,x=m+2;r=Ya(this,a,e,n,c,h,p,v,w,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function gf(i,e,t,n,r,s,a,o){let l;if(e.side===mn?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Vi,o),l===null)return null;Xa.copy(o),Xa.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Xa);return c<t.near||c>t.far?null:{distance:c,point:Xa.clone(),object:i}}function Ya(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Ha),i.getVertexPosition(l,Va),i.getVertexPosition(c,Ga);let h=gf(i,e,t,n,Ha,Va,Ga,eh);if(h){let p=new R;Jn.getBarycoord(eh,Ha,Va,Ga,p),r&&(h.uv=Jn.getInterpolatedAttribute(r,o,l,c,p,new ye)),s&&(h.uv1=Jn.getInterpolatedAttribute(s,o,l,c,p,new ye)),a&&(h.normal=Jn.getInterpolatedAttribute(a,o,l,c,p,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new R,materialIndex:0};Jn.getNormal(Ha,Va,Ga,f.normal),h.face=f,h.barycoord=p}return h}var Cs=class extends fn{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Zt,h=Zt,p,f){super(null,a,o,l,c,h,r,s,p,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rs=class extends Ln{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Mr=new ht,th=new ht,qa=[],nh=new Dn,xf=new ht,cs=new mt,ds=new ei,Is=class extends mt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Rs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,xf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Dn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Mr),nh.copy(e.boundingBox).applyMatrix4(Mr),this.boundingBox.union(nh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ei),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Mr),ds.copy(e.boundingSphere).applyMatrix4(Mr),this.boundingSphere.union(ds)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(cs.geometry=this.geometry,cs.material=this.material,cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ds.copy(this.boundingSphere),ds.applyMatrix4(n),e.ray.intersectsSphere(ds)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Mr),th.multiplyMatrices(n,Mr),cs.matrixWorld=th,cs.raycast(e,qa);for(let a=0,o=qa.length;a<o;a++){let l=qa[a];l.instanceId=s,l.object=this,t.push(l)}qa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Rs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Cs(new Float32Array(r*this.count),r,this.count,Jo,Nn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ki=new ei,bf=new ye(.5,.5),Za=new R,Di=class{constructor(e=new wn,t=new wn,n=new wn,r=new wn,s=new wn,a=new wn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=kn,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],p=s[5],f=s[6],u=s[7],g=s[8],y=s[9],m=s[10],d=s[11],v=s[12],w=s[13],x=s[14],C=s[15];if(r[0].setComponents(c-a,u-h,d-g,C-v).normalize(),r[1].setComponents(c+a,u+h,d+g,C+v).normalize(),r[2].setComponents(c+o,u+p,d+y,C+w).normalize(),r[3].setComponents(c-o,u-p,d-y,C-w).normalize(),n)r[4].setComponents(l,f,m,x).normalize(),r[5].setComponents(c-l,u-f,d-m,C-x).normalize();else if(r[4].setComponents(c-l,u-f,d-m,C-x).normalize(),t===kn)r[5].setComponents(c+l,u+f,d+m,C+x).normalize();else if(t===Pr)r[5].setComponents(l,f,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(e){Ki.center.set(0,0,0);let t=bf.distanceTo(e.center);return Ki.radius=.7071067811865476+t,Ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Za.x=r.normal.x>0?e.max.x:e.min.x,Za.y=r.normal.y>0?e.max.y:e.min.y,Za.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Za)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},ih=new ht,Mo=class i{constructor(){this.coordinateSystem=kn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let r=0;r<t.length;r++){let s=t[r];ih.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[r]===void 0&&(n[r]=new Di),n[r].setFromProjectionMatrix(ih,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Di),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new i().copy(this)}};var jt=class extends Gn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Eo=new R,To=new R,rh=new ht,hs=new Li,ja=new ei,_c=new R,sh=new R,Sn=class extends Nt{constructor(e=new yt,t=new jt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Eo.fromBufferAttribute(t,r-1),To.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Eo.distanceTo(To);e.setAttribute("lineDistance",new pt(n,1))}else $e("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ja.copy(n.boundingSphere),ja.applyMatrix4(r),ja.radius+=s,e.ray.intersectsSphere(ja)===!1)return;rh.copy(r).invert(),hs.copy(e.ray).applyMatrix4(rh);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let u=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let y=u,m=g-1;y<m;y+=c){let d=h.getX(y),v=h.getX(y+1),w=Ka(this,e,hs,l,d,v,y);w&&t.push(w)}if(this.isLineLoop){let y=h.getX(g-1),m=h.getX(u),d=Ka(this,e,hs,l,y,m,g-1);d&&t.push(d)}}else{let u=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let y=u,m=g-1;y<m;y+=c){let d=Ka(this,e,hs,l,y,y+1,y);d&&t.push(d)}if(this.isLineLoop){let y=Ka(this,e,hs,l,g-1,u,g-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Ka(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(Eo.fromBufferAttribute(o,r),To.fromBufferAttribute(o,s),t.distanceSqToSegment(Eo,To,_c,sh)>n)return;_c.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(_c);if(!(c<e.near||c>e.far))return{distance:c,point:sh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var ah=new R,oh=new R,Mn=class extends Sn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)ah.fromBufferAttribute(t,r),oh.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+ah.distanceTo(oh);e.setAttribute("lineDistance",new pt(n,1))}else $e("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ni=class extends Gn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},lh=new ht,Pc=new Li,Ja=new ei,$a=new R,$i=class extends Nt{constructor(e=new yt,t=new Ni){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere),Ja.applyMatrix4(r),Ja.radius+=s,e.ray.intersectsSphere(Ja)===!1)return;lh.copy(r).invert(),Pc.copy(e.ray).applyMatrix4(lh);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,p=n.attributes.position;if(c!==null){let f=Math.max(0,a.start),u=Math.min(c.count,a.start+a.count);for(let g=f,y=u;g<y;g++){let m=c.getX(g);$a.fromBufferAttribute(p,m),ch($a,m,l,r,e,t,this)}}else{let f=Math.max(0,a.start),u=Math.min(p.count,a.start+a.count);for(let g=f,y=u;g<y;g++)$a.fromBufferAttribute(p,g),ch($a,g,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function ch(i,e,t,n,r,s,a){let o=Pc.distanceSqToPoint(i);if(o<t){let l=new R;Pc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Ps=class extends fn{constructor(e=[],t=rr,n,r,s,a,o,l,c,h){super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ks=class extends fn{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var bi=class extends fn{constructor(e,t,n=qn,r,s,a,o=Zt,l=Zt,c,h=gi,p=1){if(h!==gi&&h!==Si)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:p};super(f,r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Dr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ls=class extends bi{constructor(e,t=qn,n=rr,r,s,a=Zt,o=Zt,l,c=gi){let h={width:e,height:e,depth:1},p=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ds=class extends fn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},an=class i extends yt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],p=[],f=0,u=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(p,2));function g(y,m,d,v,w,x,C,A,b,M,B){let k=x/b,D=C/M,W=x/2,se=C/2,U=A/2,Q=b+1,re=M+1,$=0,he=0,H=new R;for(let ge=0;ge<re;ge++){let K=ge*D-se;for(let Ie=0;Ie<Q;Ie++){let ke=Ie*k-W;H[y]=ke*v,H[m]=K*w,H[d]=U,c.push(H.x,H.y,H.z),H[y]=0,H[m]=0,H[d]=A>0?1:-1,h.push(H.x,H.y,H.z),p.push(Ie/b),p.push(1-ge/M),$+=1}}for(let ge=0;ge<M;ge++)for(let K=0;K<b;K++){let Ie=f+K+Q*ge,ke=f+K+Q*(ge+1),te=f+(K+1)+Q*(ge+1),Ce=f+(K+1)+Q*ge;l.push(Ie,ke,Ce),l.push(ke,te,Ce),he+=6}o.addGroup(u,he,B),u+=he,f+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Ns=class i extends yt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],p=[],f=[],u=[],g=0,y=[],m=n/2,d=0;v(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new pt(p,3)),this.setAttribute("normal",new pt(f,3)),this.setAttribute("uv",new pt(u,2));function v(){let x=new R,C=new R,A=0,b=(t-e)/n;for(let M=0;M<=s;M++){let B=[],k=M/s,D=k*(t-e)+e;for(let W=0;W<=r;W++){let se=W/r,U=se*l+o,Q=Math.sin(U),re=Math.cos(U);C.x=D*Q,C.y=-k*n+m,C.z=D*re,p.push(C.x,C.y,C.z),x.set(Q,b,re).normalize(),f.push(x.x,x.y,x.z),u.push(se,1-k),B.push(g++)}y.push(B)}for(let M=0;M<r;M++)for(let B=0;B<s;B++){let k=y[B][M],D=y[B+1][M],W=y[B+1][M+1],se=y[B][M+1];(e>0||B!==0)&&(h.push(k,D,se),A+=3),(t>0||B!==s-1)&&(h.push(D,W,se),A+=3)}c.addGroup(d,A,0),d+=A}function w(x){let C=g,A=new ye,b=new R,M=0,B=x===!0?e:t,k=x===!0?1:-1;for(let W=1;W<=r;W++)p.push(0,m*k,0),f.push(0,k,0),u.push(.5,.5),g++;let D=g;for(let W=0;W<=r;W++){let U=W/r*l+o,Q=Math.cos(U),re=Math.sin(U);b.x=B*re,b.y=m*k,b.z=B*Q,p.push(b.x,b.y,b.z),f.push(0,k,0),A.x=Q*.5+.5,A.y=re*.5*k+.5,u.push(A.x,A.y),g++}for(let W=0;W<r;W++){let se=C+W,U=D+W;x===!0?h.push(U,U+1,se):h.push(U+1,U,se),M+=3}c.addGroup(d,M,x===!0?1:2),d+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Qa=new R,eo=new R,wc=new R,to=new Jn,vi=class extends yt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(Cr*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],p=new Array(3),f=new Map,u=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:y,b:m,c:d}=to;if(y.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),d.fromBufferAttribute(o,c[2]),to.getNormal(wc),p[0]=`${Math.round(y.x*r)},${Math.round(y.y*r)},${Math.round(y.z*r)}`,p[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,p[2]=`${Math.round(d.x*r)},${Math.round(d.y*r)},${Math.round(d.z*r)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let v=0;v<3;v++){let w=(v+1)%3,x=p[v],C=p[w],A=to[h[v]],b=to[h[w]],M=`${x}_${C}`,B=`${C}_${x}`,k=f.get(B);k?(wc.dot(k.normal)<=s&&(u.push(A.x,A.y,A.z),u.push(b.x,b.y,b.z)),f.set(B,null)):f.has(M)||f.set(M,{index0:c[v],index1:c[w],normal:wc.clone()})}}for(let g of f.values())if(g){let{index0:y,index1:m}=g;Qa.fromBufferAttribute(o,y),eo.fromBufferAttribute(o,m),u.push(Qa.x,Qa.y,Qa.z),u.push(eo.x,eo.y,eo.z)}this.setAttribute("position",new pt(u,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},En=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){$e("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);let h=n[r],f=n[r+1]-h,u=(a-h)/f;return(r+u)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new ye:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new R,r=[],s=[],a=[],o=new R,l=new ht;for(let u=0;u<=e;u++){let g=u/e;r[u]=this.getTangentAt(g,new R)}s[0]=new R,a[0]=new R;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),p=Math.abs(r[0].y),f=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),p<=c&&(c=p,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let u=1;u<=e;u++){if(s[u]=s[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(r[u-1],r[u]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(ot(r[u-1].dot(r[u]),-1,1));s[u].applyMatrix4(l.makeRotationAxis(o,g))}a[u].crossVectors(r[u],s[u])}if(t===!0){let u=Math.acos(ot(s[0].dot(s[e]),-1,1));u/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(u=-u);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],u*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},Ur=class extends En{constructor(e=0,t=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ye){let n=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),f=l-this.aX,u=c-this.aY;l=f*h-u*p+this.aX,c=f*p+u*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ao=class extends Ur{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function od(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,p){let f=(a-s)/c-(o-s)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+p)+(l-o)/p;f*=h,u*=h,r(a,o,f,u)},calc:function(s){let a=s*s,o=a*s;return i+e*s+t*a+n*o}}}var dh=new R,hh=new R,Sc=new od,Mc=new od,Ec=new od,Xn=class extends En{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new R){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=r[(o-1)%s]:(hh.subVectors(r[0],r[1]).add(r[0]),c=hh);let p=r[o%s],f=r[(o+1)%s];if(this.closed||o+2<s?h=r[(o+2)%s]:(dh.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=dh),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(p),u),y=Math.pow(p.distanceToSquared(f),u),m=Math.pow(f.distanceToSquared(h),u);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),Sc.initNonuniformCatmullRom(c.x,p.x,f.x,h.x,g,y,m),Mc.initNonuniformCatmullRom(c.y,p.y,f.y,h.y,g,y,m),Ec.initNonuniformCatmullRom(c.z,p.z,f.z,h.z,g,y,m)}else this.curveType==="catmullrom"&&(Sc.initCatmullRom(c.x,p.x,f.x,h.x,this.tension),Mc.initCatmullRom(c.y,p.y,f.y,h.y,this.tension),Ec.initCatmullRom(c.z,p.z,f.z,h.z,this.tension));return n.set(Sc.calc(l),Mc.calc(l),Ec.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ph(i,e,t,n,r){let s=(n-e)*.5,a=(r-t)*.5,o=i*i,l=i*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*i+t}function vf(i,e){let t=1-i;return t*t*e}function yf(i,e){return 2*(1-i)*i*e}function _f(i,e){return i*i*e}function fs(i,e,t,n){return vf(i,e)+yf(i,t)+_f(i,n)}function wf(i,e){let t=1-i;return t*t*t*e}function Sf(i,e){let t=1-i;return 3*t*t*i*e}function Mf(i,e){return 3*(1-i)*i*i*e}function Ef(i,e){return i*i*i*e}function ms(i,e,t,n,r){return wf(i,e)+Sf(i,t)+Mf(i,n)+Ef(i,r)}var Us=class extends En{constructor(e=new ye,t=new ye,n=new ye,r=new ye){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ye){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ms(e,r.x,s.x,a.x,o.x),ms(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Co=class extends En{constructor(e=new R,t=new R,n=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new R){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ms(e,r.x,s.x,a.x,o.x),ms(e,r.y,s.y,a.y,o.y),ms(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Fs=class extends En{constructor(e=new ye,t=new ye){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ye){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ye){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ro=class extends En{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Os=class extends En{constructor(e=new ye,t=new ye,n=new ye){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ye){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(fs(e,r.x,s.x,a.x),fs(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Bs=class extends En{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(fs(e,r.x,s.x,a.x),fs(e,r.y,s.y,a.y),fs(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},zs=class extends En{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ye){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],p=r[a>r.length-3?r.length-1:a+2];return n.set(ph(o,l.x,c.x,h.x,p.x),ph(o,l.y,c.y,h.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new ye().fromArray(r))}return this}},Io=Object.freeze({__proto__:null,ArcCurve:Ao,CatmullRomCurve3:Xn,CubicBezierCurve:Us,CubicBezierCurve3:Co,EllipseCurve:Ur,LineCurve:Fs,LineCurve3:Ro,QuadraticBezierCurve:Os,QuadraticBezierCurve3:Bs,SplineCurve:zs}),Po=class extends En{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Io[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new Io[r.type]().fromJSON(r))}return this.cacheLengths=null,this}},Qi=class extends Po{constructor(e){super(),this.type="Path",this.currentPoint=new ye,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Fs(this.currentPoint.clone(),new ye(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Os(this.currentPoint.clone(),new ye(e,t),new ye(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new Us(this.currentPoint.clone(),new ye(e,t),new ye(n,r),new ye(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new zs(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){let c=new Ur(e,t,n,r,s,a,o,l);if(this.curves.length>0){let p=c.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ni=class extends Qi{constructor(e){super(e),this.uuid=Ei(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new Qi().fromJSON(r))}return this}};function Tf(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=op(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=Pf(i,e,s,t)),i.length>80*t){o=i[0],l=i[1];let h=o,p=l;for(let f=t;f<r;f+=t){let u=i[f],g=i[f+1];u<o&&(o=u),g<l&&(l=g),u>h&&(h=u),g>p&&(p=g)}c=Math.max(h-o,p-l),c=c!==0?32767/c:0}return Hs(s,a,t,o,l,c,0),a}function op(i,e,t,n,r){let s;if(r===Vf(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=uh(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=uh(a/n|0,i[a],i[a+1],s);return s&&Fr(s,s.next)&&(Gs(s),s=s.next),s}function er(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Fr(t,t.next)||Dt(t.prev,t,t.next)===0)){if(Gs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Hs(i,e,t,n,r,s,a){if(!i)return;!a&&s&&Uf(i,n,r,s);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(s?Cf(i,n,r,s):Af(i)){e.push(l.i,i.i,c.i),Gs(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Rf(er(i),e),Hs(i,e,t,n,r,s,2)):a===2&&If(i,e,t,n,r,s):Hs(er(i),e,t,n,r,s,1);break}}}function Af(i){let e=i.prev,t=i,n=i.next;if(Dt(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(r,s,a),p=Math.min(o,l,c),f=Math.max(r,s,a),u=Math.max(o,l,c),g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=f&&g.y>=p&&g.y<=u&&ps(r,o,s,l,a,c,g.x,g.y)&&Dt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Cf(i,e,t,n){let r=i.prev,s=i,a=i.next;if(Dt(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,h=r.y,p=s.y,f=a.y,u=Math.min(o,l,c),g=Math.min(h,p,f),y=Math.max(o,l,c),m=Math.max(h,p,f),d=kc(u,g,e,t,n),v=kc(y,m,e,t,n),w=i.prevZ,x=i.nextZ;for(;w&&w.z>=d&&x&&x.z<=v;){if(w.x>=u&&w.x<=y&&w.y>=g&&w.y<=m&&w!==r&&w!==a&&ps(o,h,l,p,c,f,w.x,w.y)&&Dt(w.prev,w,w.next)>=0||(w=w.prevZ,x.x>=u&&x.x<=y&&x.y>=g&&x.y<=m&&x!==r&&x!==a&&ps(o,h,l,p,c,f,x.x,x.y)&&Dt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;w&&w.z>=d;){if(w.x>=u&&w.x<=y&&w.y>=g&&w.y<=m&&w!==r&&w!==a&&ps(o,h,l,p,c,f,w.x,w.y)&&Dt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;x&&x.z<=v;){if(x.x>=u&&x.x<=y&&x.y>=g&&x.y<=m&&x!==r&&x!==a&&ps(o,h,l,p,c,f,x.x,x.y)&&Dt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Rf(i,e){let t=i;do{let n=t.prev,r=t.next.next;!Fr(n,r)&&cp(n,t,t.next,r)&&Vs(n,r)&&Vs(r,n)&&(e.push(n.i,t.i,r.i),Gs(t),Gs(t.next),t=i=r),t=t.next}while(t!==i);return er(t)}function If(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Bf(a,o)){let l=dp(a,o);a=er(a,a.next),l=er(l,l.next),Hs(a,e,t,n,r,s,0),Hs(l,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function Pf(i,e,t,n){let r=[];for(let s=0,a=e.length;s<a;s++){let o=e[s]*n,l=s<a-1?e[s+1]*n:i.length,c=op(i,o,l,n,!1);c===c.next&&(c.steiner=!0),r.push(Of(c))}r.sort(kf);for(let s=0;s<r.length;s++)t=Lf(r[s],t);return t}function kf(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=n-r}return t}function Lf(i,e){let t=Df(i,e);if(!t)return e;let n=dp(t,i);return er(n,n.next),er(t,t.next)}function Df(i,e){let t=e,n=i.x,r=i.y,s=-1/0,a;if(Fr(i,t))return t;do{if(Fr(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let p=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>s&&(s=p,a=t.x<t.next.x?t:t.next,p===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&lp(r<c?n:s,r,l,c,r<c?s:n,r,t.x,t.y)){let p=Math.abs(r-t.y)/(n-t.x);Vs(t,i)&&(p<h||p===h&&(t.x>a.x||t.x===a.x&&Nf(a,t)))&&(a=t,h=p)}t=t.next}while(t!==o);return a}function Nf(i,e){return Dt(i.prev,i,e.prev)<0&&Dt(e.next,i,i.next)<0}function Uf(i,e,t,n){let r=i;do r.z===0&&(r.z=kc(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Ff(r)}function Ff(i){let e,t=1;do{let n=i,r;i=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(r=n,n=n.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=a}s.nextZ=null,t*=2}while(e>1);return i}function kc(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Of(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function lp(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function ps(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&lp(i,e,t,n,r,s,a,o)}function Bf(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!zf(i,e)&&(Vs(i,e)&&Vs(e,i)&&Hf(i,e)&&(Dt(i.prev,i,e.prev)||Dt(i,e.prev,e))||Fr(i,e)&&Dt(i.prev,i,i.next)>0&&Dt(e.prev,e,e.next)>0)}function Dt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Fr(i,e){return i.x===e.x&&i.y===e.y}function cp(i,e,t,n){let r=io(Dt(i,e,t)),s=io(Dt(i,e,n)),a=io(Dt(t,n,i)),o=io(Dt(t,n,e));return!!(r!==s&&a!==o||r===0&&no(i,t,e)||s===0&&no(i,n,e)||a===0&&no(t,i,n)||o===0&&no(t,e,n))}function no(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function io(i){return i>0?1:i<0?-1:0}function zf(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&cp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Vs(i,e){return Dt(i.prev,i,i.next)<0?Dt(i,e,i.next)>=0&&Dt(i,i.prev,e)>=0:Dt(i,e,i.prev)<0||Dt(i,i.next,e)<0}function Hf(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function dp(i,e){let t=Lc(i.i,i.x,i.y),n=Lc(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function uh(i,e,t,n){let r=Lc(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Gs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Lc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Vf(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var Dc=class{static triangulate(e,t,n=2){return Tf(e,t,n)}},Qn=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];fh(e),mh(n,e);let a=e.length;t.forEach(fh);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,mh(n,t[l]);let o=Dc.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function fh(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function mh(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Ui=class i extends yt{constructor(e=new ni([new ye(.5,.5),new ye(-.5,.5),new ye(-.5,-.5),new ye(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new pt(r,3)),this.setAttribute("uv",new pt(s,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1,f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,u=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:u-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,d=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:Gf,w,x=!1,C,A,b,M;if(d){w=d.getSpacedPoints(h),x=!0,f=!1;let Z=d.isCatmullRomCurve3?d.closed:!1;C=d.computeFrenetFrames(h,Z),A=new R,b=new R,M=new R}f||(m=0,u=0,g=0,y=0);let B=o.extractPoints(c),k=B.shape,D=B.holes;if(!Qn.isClockWise(k)){k=k.reverse();for(let Z=0,we=D.length;Z<we;Z++){let me=D[Z];Qn.isClockWise(me)&&(D[Z]=me.reverse())}}function se(Z){let me=10000000000000001e-36,_e=Z[0];for(let ue=1;ue<=Z.length;ue++){let Ge=ue%Z.length,Fe=Z[Ge],nt=Fe.x-_e.x,Te=Fe.y-_e.y,Ke=nt*nt+Te*Te,O=Math.max(Math.abs(Fe.x),Math.abs(Fe.y),Math.abs(_e.x),Math.abs(_e.y)),bt=me*O*O;if(Ke<=bt){Z.splice(Ge,1),ue--;continue}_e=Fe}}se(k),D.forEach(se);let U=D.length,Q=k;for(let Z=0;Z<U;Z++){let we=D[Z];k=k.concat(we)}function re(Z,we,me){return we||et("ExtrudeGeometry: vec does not exist"),Z.clone().addScaledVector(we,me)}let $=k.length;function he(Z,we,me){let _e,ue,Ge,Fe=Z.x-we.x,nt=Z.y-we.y,Te=me.x-Z.x,Ke=me.y-Z.y,O=Fe*Fe+nt*nt,bt=Fe*Ke-nt*Te;if(Math.abs(bt)>Number.EPSILON){let Qe=Math.sqrt(O),ct=Math.sqrt(Te*Te+Ke*Ke),Se=we.x-nt/Qe,j=we.y+Fe/Qe,be=me.x-Ke/ct,Pe=me.y+Te/ct,T=((be-Se)*Ke-(Pe-j)*Te)/(Fe*Ke-nt*Te);_e=Se+Fe*T-Z.x,ue=j+nt*T-Z.y;let _=_e*_e+ue*ue;if(_<=2)return new ye(_e,ue);Ge=Math.sqrt(_/2)}else{let Qe=!1;Fe>Number.EPSILON?Te>Number.EPSILON&&(Qe=!0):Fe<-Number.EPSILON?Te<-Number.EPSILON&&(Qe=!0):Math.sign(nt)===Math.sign(Ke)&&(Qe=!0),Qe?(_e=-nt,ue=Fe,Ge=Math.sqrt(O)):(_e=Fe,ue=nt,Ge=Math.sqrt(O/2))}return new ye(_e/Ge,ue/Ge)}let H=[];for(let Z=0,we=Q.length,me=we-1,_e=Z+1;Z<we;Z++,me++,_e++)me===we&&(me=0),_e===we&&(_e=0),H[Z]=he(Q[Z],Q[me],Q[_e]);let ge=[],K,Ie=H.concat();for(let Z=0,we=U;Z<we;Z++){let me=D[Z];K=[];for(let _e=0,ue=me.length,Ge=ue-1,Fe=_e+1;_e<ue;_e++,Ge++,Fe++)Ge===ue&&(Ge=0),Fe===ue&&(Fe=0),K[_e]=he(me[_e],me[Ge],me[Fe]);ge.push(K),Ie=Ie.concat(K)}let ke;if(m===0)ke=Qn.triangulateShape(Q,D);else{let Z=[],we=[];for(let me=0;me<m;me++){let _e=me/m,ue=u*Math.cos(_e*Math.PI/2),Ge=g*Math.sin(_e*Math.PI/2)+y;for(let Fe=0,nt=Q.length;Fe<nt;Fe++){let Te=re(Q[Fe],H[Fe],Ge);Ue(Te.x,Te.y,-ue),_e===0&&Z.push(Te)}for(let Fe=0,nt=U;Fe<nt;Fe++){let Te=D[Fe];K=ge[Fe];let Ke=[];for(let O=0,bt=Te.length;O<bt;O++){let Qe=re(Te[O],K[O],Ge);Ue(Qe.x,Qe.y,-ue),_e===0&&Ke.push(Qe)}_e===0&&we.push(Ke)}}ke=Qn.triangulateShape(Z,we)}let te=ke.length,Ce=g+y;for(let Z=0;Z<$;Z++){let we=f?re(k[Z],Ie[Z],Ce):k[Z];x?(b.copy(C.normals[0]).multiplyScalar(we.x),A.copy(C.binormals[0]).multiplyScalar(we.y),M.copy(w[0]).add(b).add(A),Ue(M.x,M.y,M.z)):Ue(we.x,we.y,0)}for(let Z=1;Z<=h;Z++)for(let we=0;we<$;we++){let me=f?re(k[we],Ie[we],Ce):k[we];x?(b.copy(C.normals[Z]).multiplyScalar(me.x),A.copy(C.binormals[Z]).multiplyScalar(me.y),M.copy(w[Z]).add(b).add(A),Ue(M.x,M.y,M.z)):Ue(me.x,me.y,p/h*Z)}for(let Z=m-1;Z>=0;Z--){let we=Z/m,me=u*Math.cos(we*Math.PI/2),_e=g*Math.sin(we*Math.PI/2)+y;for(let ue=0,Ge=Q.length;ue<Ge;ue++){let Fe=re(Q[ue],H[ue],_e);Ue(Fe.x,Fe.y,p+me)}for(let ue=0,Ge=D.length;ue<Ge;ue++){let Fe=D[ue];K=ge[ue];for(let nt=0,Te=Fe.length;nt<Te;nt++){let Ke=re(Fe[nt],K[nt],_e);x?Ue(Ke.x,Ke.y+w[h-1].y,w[h-1].x+me):Ue(Ke.x,Ke.y,p+me)}}}pe(),Le();function pe(){let Z=r.length/3;if(f){let we=0,me=$*we;for(let _e=0;_e<te;_e++){let ue=ke[_e];lt(ue[2]+me,ue[1]+me,ue[0]+me)}we=h+m*2,me=$*we;for(let _e=0;_e<te;_e++){let ue=ke[_e];lt(ue[0]+me,ue[1]+me,ue[2]+me)}}else{for(let we=0;we<te;we++){let me=ke[we];lt(me[2],me[1],me[0])}for(let we=0;we<te;we++){let me=ke[we];lt(me[0]+$*h,me[1]+$*h,me[2]+$*h)}}n.addGroup(Z,r.length/3-Z,0)}function Le(){let Z=r.length/3,we=0;Re(Q,we),we+=Q.length;for(let me=0,_e=D.length;me<_e;me++){let ue=D[me];Re(ue,we),we+=ue.length}n.addGroup(Z,r.length/3-Z,1)}function Re(Z,we){let me=Z.length;for(;--me>=0;){let _e=me,ue=me-1;ue<0&&(ue=Z.length-1);for(let Ge=0,Fe=h+m*2;Ge<Fe;Ge++){let nt=$*Ge,Te=$*(Ge+1),Ke=we+_e+nt,O=we+ue+nt,bt=we+ue+Te,Qe=we+_e+Te;Oe(Ke,O,bt,Qe)}}}function Ue(Z,we,me){l.push(Z),l.push(we),l.push(me)}function lt(Z,we,me){He(Z),He(we),He(me);let _e=r.length/3,ue=v.generateTopUV(n,r,_e-3,_e-2,_e-1);le(ue[0]),le(ue[1]),le(ue[2])}function Oe(Z,we,me,_e){He(Z),He(we),He(_e),He(we),He(me),He(_e);let ue=r.length/3,Ge=v.generateSideWallUV(n,r,ue-6,ue-3,ue-2,ue-1);le(Ge[0]),le(Ge[1]),le(Ge[3]),le(Ge[1]),le(Ge[2]),le(Ge[3])}function He(Z){r.push(l[Z*3+0]),r.push(l[Z*3+1]),r.push(l[Z*3+2])}function le(Z){s.push(Z.x),s.push(Z.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Wf(t,n,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Io[r.type]().fromJSON(r)),new i(n,e.options)}},Gf={generateTopUV:function(i,e,t,n,r){let s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[r*3],h=e[r*3+1];return[new ye(s,a),new ye(o,l),new ye(c,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],p=e[n*3+2],f=e[r*3],u=e[r*3+1],g=e[r*3+2],y=e[s*3],m=e[s*3+1],d=e[s*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ye(a,1-l),new ye(c,1-p),new ye(f,1-g),new ye(y,1-d)]:[new ye(o,1-l),new ye(h,1-p),new ye(u,1-g),new ye(m,1-d)]}};function Wf(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var yi=class i extends yt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,p=e/o,f=t/l,u=[],g=[],y=[],m=[];for(let d=0;d<h;d++){let v=d*f-a;for(let w=0;w<c;w++){let x=w*p-s;g.push(x,-v,0),y.push(0,0,1),m.push(w/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let v=0;v<o;v++){let w=v+c*d,x=v+c*(d+1),C=v+1+c*(d+1),A=v+1+c*d;u.push(w,x,A),u.push(x,C,A)}this.setIndex(u),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(y,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Ws=class i extends yt{constructor(e=new ni([new ye(0,.5),new ye(-.5,-.5),new ye(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new pt(r,3)),this.setAttribute("normal",new pt(s,3)),this.setAttribute("uv",new pt(a,2));function c(h){let p=r.length/3,f=h.extractPoints(t),u=f.shape,g=f.holes;Qn.isClockWise(u)===!1&&(u=u.reverse());for(let m=0,d=g.length;m<d;m++){let v=g[m];Qn.isClockWise(v)===!0&&(g[m]=v.reverse())}let y=Qn.triangulateShape(u,g);for(let m=0,d=g.length;m<d;m++){let v=g[m];u=u.concat(v)}for(let m=0,d=u.length;m<d;m++){let v=u[m];r.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let m=0,d=y.length;m<d;m++){let v=y[m],w=v[0]+p,x=v[1]+p,C=v[2]+p;n.push(w,x,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Xf(t,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}};function Xf(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}var Xs=class i extends yt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],p=new R,f=new R,u=[],g=[],y=[],m=[];for(let d=0;d<=n;d++){let v=[],w=d/n,x=a+w*o,C=e*Math.cos(x),A=Math.sqrt(e*e-C*C),b=0;d===0&&a===0?b=.5/t:d===n&&l===Math.PI&&(b=-.5/t);for(let M=0;M<=t;M++){let B=M/t,k=r+B*s;p.x=-A*Math.cos(k),p.y=C,p.z=A*Math.sin(k),g.push(p.x,p.y,p.z),f.copy(p).normalize(),y.push(f.x,f.y,f.z),m.push(B+b,1-w),v.push(c++)}h.push(v)}for(let d=0;d<n;d++)for(let v=0;v<t;v++){let w=h[d][v+1],x=h[d][v],C=h[d+1][v],A=h[d+1][v+1];(d!==0||a>0)&&u.push(w,x,A),(d!==n-1||l<Math.PI)&&u.push(x,C,A)}this.setIndex(u),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(y,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Yn=class i extends yt{constructor(e=new Bs(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new R,l=new R,c=new ye,h=new R,p=[],f=[],u=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new pt(p,3)),this.setAttribute("normal",new pt(f,3)),this.setAttribute("uv",new pt(u,2));function y(){for(let w=0;w<t;w++)m(w);m(s===!1?t:0),v(),d()}function m(w){h=e.getPointAt(w/t,h);let x=a.normals[w],C=a.binormals[w];for(let A=0;A<=r;A++){let b=A/r*Math.PI*2,M=Math.sin(b),B=-Math.cos(b);l.x=B*x.x+M*C.x,l.y=B*x.y+M*C.y,l.z=B*x.z+M*C.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,p.push(o.x,o.y,o.z)}}function d(){for(let w=1;w<=t;w++)for(let x=1;x<=r;x++){let C=(r+1)*(w-1)+(x-1),A=(r+1)*w+(x-1),b=(r+1)*w+x,M=(r+1)*(w-1)+x;g.push(C,A,M),g.push(A,b,M)}}function v(){for(let w=0;w<=t;w++)for(let x=0;x<=r;x++)c.x=w/t,c.y=x/r,u.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Io[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function ar(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];if(gh(r))r.isRenderTargetTexture?($e("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(gh(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function on(i){let e={};for(let t=0;t<i.length;t++){let n=ar(i[t]);for(let r in n)e[r]=n[r]}return e}function gh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Yf(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ld(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ft.workingColorSpace}var Ti={clone:ar,merge:on},qf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,kt=class extends Gn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qf,this.fragmentShader=Zf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ar(e.uniforms),this.uniformsGroups=Yf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new Je().setHex(r.value);break;case"v2":this.uniforms[n].value=new ye().fromArray(r.value);break;case"v3":this.uniforms[n].value=new R().fromArray(r.value);break;case"v4":this.uniforms[n].value=new Pt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new it().fromArray(r.value);break;case"m4":this.uniforms[n].value=new ht().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Or=class extends kt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Tn=class extends Gn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pl,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ys=class extends Tn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ye(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ot(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Ji('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Ji('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var ko=class extends Gn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Lo=class extends Gn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Er(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ro(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Fi=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Do=class extends Fi{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Cc,endingEnd:Cc}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Rc:s=e,o=2*t-n;break;case Ic:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Rc:a=e,l=2*n-t;break;case Ic:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,p=this._offsetNext,f=this._weightPrev,u=this._weightNext,g=(n-t)/(r-t),y=g*g,m=y*g,d=-f*m+2*f*y-f*g,v=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*g+1,w=(-1-u)*m+(1.5+u)*y+.5*g,x=u*m-u*y;for(let C=0;C!==o;++C)s[C]=d*a[h+C]+v*a[c+C]+w*a[l+C]+x*a[p+C];return s}},No=class extends Fi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(r-t),p=1-h;for(let f=0;f!==o;++f)s[f]=a[c+f]*p+a[l+f]*h;return s}},Uo=class extends Fi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Fo=class extends Fi{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let g=(n-t)/(r-t),y=1-g;for(let m=0;m!==o;++m)s[m]=a[c+m]*y+a[l+m]*g;return s}let f=o*2,u=e-1;for(let g=0;g!==o;++g){let y=a[c+g],m=a[l+g],d=u*f+g*2,v=p[d],w=p[d+1],x=e*f+g*2,C=h[x],A=h[x+1],b=Kf(n,t,v,C,r);s[g]=hp(b,y,w,A,m)}return s}};function hp(i,e,t,n,r){let s=1-i;return s*s*s*e+3*s*s*i*t+3*s*i*i*n+i*i*i*r}function jf(i,e,t,n,r){let s=1-i;return 3*s*s*(t-e)+6*s*i*(n-t)+3*i*i*(r-n)}function Kf(i,e,t,n,r){let s=(i-e)/(r-e);for(let a=0;a<8;a++){let o=hp(s,e,t,n,r)-i;if(Math.abs(o)<1e-10)break;let l=jf(s,e,t,n,r);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}var An=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Er(t,this.TimeBufferType),this.values=Er(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Er(e.times,Array),values:Er(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r),ro(e.settings)&&(n.settings={inTangents:Er(e.settings.inTangents,Array),outTangents:Er(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Uo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new No(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Do(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Fo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case gs:t=this.InterpolantFactoryMethodDiscrete;break;case vo:t=this.InterpolantFactoryMethodLinear;break;case oo:t=this.InterpolantFactoryMethodSmooth;break;case Ac:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return $e("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return gs;case this.InterpolantFactoryMethodLinear:return vo;case this.InterpolantFactoryMethodSmooth:return oo;case this.InterpolantFactoryMethodBezier:return Ac}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;ro(this.settings)&&(xh(this.settings.inTangents,e),xh(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;ro(this.settings)&&(bh(this.settings.inTangents,e),bh(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(et("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(et("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){et("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){et("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&Fu(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){et("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===oo,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(r)l=!0;else{let p=o*n,f=p-n,u=p+n;for(let g=0;g!==n;++g){let y=t[p+g];if(y!==t[f+g]||y!==t[u+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let p=o*n,f=a*n;for(let u=0;u!==n;++u)t[f+u]=t[p+u]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,ro(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function xh(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function bh(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}An.prototype.ValueTypeName="";An.prototype.TimeBufferType=Float32Array;An.prototype.ValueBufferType=Float32Array;An.prototype.DefaultInterpolation=vo;var Oi=class extends An{constructor(e,t,n){super(e,t,n)}};Oi.prototype.ValueTypeName="bool";Oi.prototype.ValueBufferType=Array;Oi.prototype.DefaultInterpolation=gs;Oi.prototype.InterpolantFactoryMethodLinear=void 0;Oi.prototype.InterpolantFactoryMethodSmooth=void 0;var Oo=class extends An{constructor(e,t,n,r){super(e,t,n,r)}};Oo.prototype.ValueTypeName="color";var Bo=class extends An{constructor(e,t,n,r){super(e,t,n,r)}};Bo.prototype.ValueTypeName="number";var zo=class extends Fi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)un.slerpFlat(s,0,a,c-o,a,c,l);return s}},qs=class extends An{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new zo(this.times,this.values,this.getValueSize(),e)}};qs.prototype.ValueTypeName="quaternion";qs.prototype.InterpolantFactoryMethodSmooth=void 0;var Bi=class extends An{constructor(e,t,n){super(e,t,n)}};Bi.prototype.ValueTypeName="string";Bi.prototype.ValueBufferType=Array;Bi.prototype.DefaultInterpolation=gs;Bi.prototype.InterpolantFactoryMethodLinear=void 0;Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ho=class extends An{constructor(e,t,n,r){super(e,t,n,r)}};Ho.prototype.ValueTypeName="vector";var Vo=class{constructor(e,t,n){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&r.onStart!==void 0&&r.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,r.onProgress!==void 0&&r.onProgress(h,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,p){return c.push(h,p),this},this.removeHandler=function(h){let p=c.indexOf(h);return p!==-1&&c.splice(p,2),this},this.getHandler=function(h){for(let p=0,f=c.length;p<f;p+=2){let u=c[p],g=c[p+1];if(u.global&&(u.lastIndex=0),u.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},pp=new Vo,Go=class{constructor(e){this.manager=e!==void 0?e:pp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Go.DEFAULT_MATERIAL_NAME="__DEFAULT";var Br=class extends Nt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Zs=class extends Br{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Tc=new ht,vh=new R,yh=new R,js=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Di,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new Pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;vh.setFromMatrixPosition(e.matrixWorld),t.position.copy(vh),yh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yh),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Tc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Tc,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===Pr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Tc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},so=new R,ao=new un,Kn=new R,Ks=class extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=kn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(so,ao,Kn),Kn.x===1&&Kn.y===1&&Kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(so,ao,Kn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(so,ao,Kn),Kn.x===1&&Kn.y===1&&Kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(so,ao,Kn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ki=new R,_h=new ye,wh=new ye,sn=class extends Ks{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Lr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Cr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Lr*2*Math.atan(Math.tan(Cr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ki.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ki.x,ki.y).multiplyScalar(-e/ki.z),ki.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ki.x,ki.y).multiplyScalar(-e/ki.z)}getViewSize(e,t){return this.getViewBounds(e,_h,wh),t.subVectors(wh,_h)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Cr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Nc=class extends js{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0}},Js=class extends Br{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Nc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},tr=class extends Ks{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Uc=class extends js{constructor(){super(new tr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},zr=class extends Br{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.shadow=new Uc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Tr=-90,Ar=1,Hr=class extends Nt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new sn(Tr,Ar,e,t);r.layers=this.layers,this.add(r);let s=new sn(Tr,Ar,e,t);s.layers=this.layers,this.add(s);let a=new sn(Tr,Ar,e,t);a.layers=this.layers,this.add(a);let o=new sn(Tr,Ar,e,t);o.layers=this.layers,this.add(o);let l=new sn(Tr,Ar,e,t);l.layers=this.layers,this.add(l);let c=new sn(Tr,Ar,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===kn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Pr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,p=e.getRenderTarget(),f=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=y,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(p,f,u),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Wo=class extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},$s=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Jf.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Jf(){this._document.hidden===!1&&this.reset()}var cd="\\[\\]\\.:\\/",$f=new RegExp("["+cd+"]","g"),dd="[^"+cd+"]",Qf="[^"+cd.replace("\\.","")+"]",em=/((?:WC+[\/:])*)/.source.replace("WC",dd),tm=/(WCOD+)?/.source.replace("WCOD",Qf),nm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",dd),im=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",dd),rm=new RegExp("^"+em+tm+nm+im+"$"),sm=["material","materials","bones","map"],Fc=class{constructor(e,t,n){let r=n||Rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Rt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace($f,"")}static parseTrackName(e){let t=rm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);sm.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){$e("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){et("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){et("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){et("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){et("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){et("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){et("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){et("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;et("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){et("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){et("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Rt.Composite=Fc;Rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Rt.prototype.GetterByBindingType=[Rt.prototype._getValue_direct,Rt.prototype._getValue_array,Rt.prototype._getValue_arrayElement,Rt.prototype._getValue_toArray];Rt.prototype.SetterByBindingTypeAndVersioning=[[Rt.prototype._setValue_direct,Rt.prototype._setValue_direct_setNeedsUpdate,Rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_array,Rt.prototype._setValue_array_setNeedsUpdate,Rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_arrayElement,Rt.prototype._setValue_arrayElement_setNeedsUpdate,Rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_fromArray,Rt.prototype._setValue_fromArray_setNeedsUpdate,Rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Tv=new Float32Array(1);var Vr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ot(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ot(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Oc=class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};var Qs=class extends Vn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function hd(i,e,t,n){let r=am(n);switch(t){case Kc:return i*e;case Jo:return i*e/r.components*r.byteLength;case $o:return i*e/r.components*r.byteLength;case Gi:return i*e*2/r.components*r.byteLength;case Qo:return i*e*2/r.components*r.byteLength;case Jc:return i*e*3/r.components*r.byteLength;case Zn:return i*e*4/r.components*r.byteLength;case el:return i*e*4/r.components*r.byteLength;case la:case ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case da:case ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case nl:case rl:return Math.max(i,16)*Math.max(e,8)/4;case tl:case il:return Math.max(i,8)*Math.max(e,8)/2;case sl:case al:case ll:case cl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ol:case pa:case dl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case hl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ul:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ml:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case gl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case xl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case bl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case vl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case yl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case wl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Sl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ml:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case El:case Tl:case Al:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Cl:case Rl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ua:case Il:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function am(i){switch(i){case xn:case Yc:return{byteLength:1,components:1};case Yr:case qc:case $t:return{byteLength:2,components:1};case jo:case Ko:return{byteLength:2,components:4};case qn:case Zo:case Nn:return{byteLength:4,components:1};case Zc:case jc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?$e("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Dp(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function lm(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,p=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let u;if(c instanceof Float32Array)u=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)u=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=i.HALF_FLOAT:u=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=i.SHORT;else if(c instanceof Uint32Array)u=i.UNSIGNED_INT;else if(c instanceof Int32Array)u=i.INT;else if(c instanceof Int8Array)u=i.BYTE;else if(c instanceof Uint8Array)u=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function n(o,l,c){let h=l.array,p=l.updateRanges;if(i.bindBuffer(c,o),p.length===0)i.bufferSubData(c,0,h);else{p.sort((u,g)=>u.start-g.start);let f=0;for(let u=1;u<p.length;u++){let g=p[f],y=p[u];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,p[f]=y)}p.length=f+1;for(let u=0,g=p.length;u<g;u++){let y=p[u];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var cm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dm=`#ifdef USE_ALPHAHASH
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
#endif`,hm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,um=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mm=`#ifdef USE_AOMAP
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
#endif`,gm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xm=`#ifdef USE_BATCHING
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
#endif`,bm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ym=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_m=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,wm=`#ifdef USE_IRIDESCENCE
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
#endif`,Sm=`#ifdef USE_BUMPMAP
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
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Em=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Am=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Cm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Rm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Im=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Pm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,km=`#define PI 3.141592653589793
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
} // validated`,Lm=`vec3 transformedNormal = objectNormal;
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
#endif`,Dm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Um=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Om="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zm=`#ifdef USE_ENVMAP
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
#endif`,Hm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Vm=`#ifdef USE_ENVMAP
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
#endif`,Gm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wm=`#ifdef USE_ENVMAP
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
#endif`,Xm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ym=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jm=`#ifdef USE_GRADIENTMAP
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
}`,Km=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$m=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,eg=`#ifdef USE_ENVMAP
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
#endif`,tg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ng=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ig=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sg=`PhysicalMaterial material;
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
#endif`,ag=`uniform sampler2D dfgLUT;
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
}`,og=`
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
#endif`,lg=`#if defined( RE_IndirectDiffuse )
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
#endif`,cg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dg=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,hg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ug=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,bg=`#if defined( USE_POINTS_UV )
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
#endif`,vg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_g=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wg=`#if defined( USE_MORPHCOLORS )
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
#endif`,Sg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mg=`#ifdef USE_MORPHTARGETS
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
#endif`,Eg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ag=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Cg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ig=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Pg=`#ifdef USE_NORMALMAP
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
#endif`,kg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ng=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ug=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Fg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Og=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,qg=`float getShadowMask() {
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
}`,Zg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jg=`#ifdef USE_SKINNING
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
#endif`,Kg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jg=`#ifdef USE_SKINNING
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
#endif`,$g=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,e0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,t0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,n0=`#ifdef USE_TRANSMISSION
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
#endif`,i0=`#ifdef USE_TRANSMISSION
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
#endif`,r0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,s0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,a0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,o0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,l0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,c0=`uniform sampler2D t2D;
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
}`,d0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,h0=`uniform float backgroundBlurriness;
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
}`,p0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,u0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f0=`#include <common>
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
}`,m0=`#if DEPTH_PACKING == 3200
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
}`,g0=`#define DISTANCE
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
}`,x0=`#define DISTANCE
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
}`,b0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,v0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y0=`uniform float scale;
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
}`,_0=`uniform vec3 diffuse;
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
}`,w0=`#include <common>
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
}`,S0=`uniform vec3 diffuse;
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
}`,M0=`#define LAMBERT
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
}`,E0=`#define LAMBERT
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
}`,T0=`#define MATCAP
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
}`,A0=`#define MATCAP
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
}`,C0=`#define NORMAL
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
}`,R0=`#define NORMAL
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
}`,I0=`#define PHONG
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
}`,P0=`#define PHONG
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
}`,k0=`#define STANDARD
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
}`,L0=`#define STANDARD
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
}`,D0=`#define TOON
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
}`,N0=`#define TOON
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
}`,U0=`uniform float size;
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
}`,F0=`uniform vec3 diffuse;
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
}`,O0=`#include <common>
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
}`,B0=`uniform vec3 color;
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
}`,z0=`uniform float rotation;
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
}`,H0=`uniform vec3 diffuse;
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
}`,dt={alphahash_fragment:cm,alphahash_pars_fragment:dm,alphamap_fragment:hm,alphamap_pars_fragment:pm,alphatest_fragment:um,alphatest_pars_fragment:fm,aomap_fragment:mm,aomap_pars_fragment:gm,batching_pars_vertex:xm,batching_vertex:bm,begin_vertex:vm,beginnormal_vertex:ym,bsdfs:_m,iridescence_fragment:wm,bumpmap_pars_fragment:Sm,clipping_planes_fragment:Mm,clipping_planes_pars_fragment:Em,clipping_planes_pars_vertex:Tm,clipping_planes_vertex:Am,color_fragment:Cm,color_pars_fragment:Rm,color_pars_vertex:Im,color_vertex:Pm,common:km,defaultnormal_vertex:Lm,displacementmap_pars_vertex:Dm,displacementmap_vertex:Nm,emissivemap_fragment:Um,emissivemap_pars_fragment:Fm,colorspace_fragment:Om,colorspace_pars_fragment:Bm,envmap_fragment:zm,envmap_common_pars_fragment:Hm,envmap_pars_fragment:Vm,envmap_pars_vertex:Gm,envmap_physical_pars_fragment:eg,envmap_vertex:Wm,fog_vertex:Xm,fog_pars_vertex:Ym,fog_fragment:qm,fog_pars_fragment:Zm,gradientmap_pars_fragment:jm,lightmap_pars_fragment:Km,lights_lambert_fragment:Jm,lights_lambert_pars_fragment:$m,lights_pars_begin:Qm,lights_toon_fragment:tg,lights_toon_pars_fragment:ng,lights_phong_fragment:ig,lights_phong_pars_fragment:rg,lights_physical_fragment:sg,lights_physical_pars_fragment:ag,lights_fragment_begin:og,lights_fragment_maps:lg,lights_fragment_end:cg,lightprobes_pars_fragment:dg,logdepthbuf_fragment:hg,logdepthbuf_pars_fragment:pg,logdepthbuf_pars_vertex:ug,logdepthbuf_vertex:fg,map_fragment:mg,map_pars_fragment:gg,map_particle_fragment:xg,map_particle_pars_fragment:bg,metalnessmap_fragment:vg,metalnessmap_pars_fragment:yg,morphinstance_vertex:_g,morphcolor_vertex:wg,morphnormal_vertex:Sg,morphtarget_pars_vertex:Mg,morphtarget_vertex:Eg,normal_fragment_begin:Tg,normal_fragment_maps:Ag,normal_pars_fragment:Cg,normal_pars_vertex:Rg,normal_vertex:Ig,normalmap_pars_fragment:Pg,clearcoat_normal_fragment_begin:kg,clearcoat_normal_fragment_maps:Lg,clearcoat_pars_fragment:Dg,iridescence_pars_fragment:Ng,opaque_fragment:Ug,packing:Fg,premultiplied_alpha_fragment:Og,project_vertex:Bg,dithering_fragment:zg,dithering_pars_fragment:Hg,roughnessmap_fragment:Vg,roughnessmap_pars_fragment:Gg,shadowmap_pars_fragment:Wg,shadowmap_pars_vertex:Xg,shadowmap_vertex:Yg,shadowmask_pars_fragment:qg,skinbase_vertex:Zg,skinning_pars_vertex:jg,skinning_vertex:Kg,skinnormal_vertex:Jg,specularmap_fragment:$g,specularmap_pars_fragment:Qg,tonemapping_fragment:e0,tonemapping_pars_fragment:t0,transmission_fragment:n0,transmission_pars_fragment:i0,uv_pars_fragment:r0,uv_pars_vertex:s0,uv_vertex:a0,worldpos_vertex:o0,background_vert:l0,background_frag:c0,backgroundCube_vert:d0,backgroundCube_frag:h0,cube_vert:p0,cube_frag:u0,depth_vert:f0,depth_frag:m0,distance_vert:g0,distance_frag:x0,equirect_vert:b0,equirect_frag:v0,linedashed_vert:y0,linedashed_frag:_0,meshbasic_vert:w0,meshbasic_frag:S0,meshlambert_vert:M0,meshlambert_frag:E0,meshmatcap_vert:T0,meshmatcap_frag:A0,meshnormal_vert:C0,meshnormal_frag:R0,meshphong_vert:I0,meshphong_frag:P0,meshphysical_vert:k0,meshphysical_frag:L0,meshtoon_vert:D0,meshtoon_frag:N0,points_vert:U0,points_frag:F0,shadow_vert:O0,shadow_frag:B0,sprite_vert:z0,sprite_frag:H0},ze={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new it}},envmap:{envMap:{value:null},envMapRotation:{value:new it},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new it}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new it}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new it},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new it},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new it},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new it}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new it}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new it}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0},uvTransform:{value:new it}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}}},si={basic:{uniforms:on([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.fog]),vertexShader:dt.meshbasic_vert,fragmentShader:dt.meshbasic_frag},lambert:{uniforms:on([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:dt.meshlambert_vert,fragmentShader:dt.meshlambert_frag},phong:{uniforms:on([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:dt.meshphong_vert,fragmentShader:dt.meshphong_frag},standard:{uniforms:on([ze.common,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.roughnessmap,ze.metalnessmap,ze.fog,ze.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag},toon:{uniforms:on([ze.common,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.gradientmap,ze.fog,ze.lights,{emissive:{value:new Je(0)}}]),vertexShader:dt.meshtoon_vert,fragmentShader:dt.meshtoon_frag},matcap:{uniforms:on([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,{matcap:{value:null}}]),vertexShader:dt.meshmatcap_vert,fragmentShader:dt.meshmatcap_frag},points:{uniforms:on([ze.points,ze.fog]),vertexShader:dt.points_vert,fragmentShader:dt.points_frag},dashed:{uniforms:on([ze.common,ze.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:dt.linedashed_vert,fragmentShader:dt.linedashed_frag},depth:{uniforms:on([ze.common,ze.displacementmap]),vertexShader:dt.depth_vert,fragmentShader:dt.depth_frag},normal:{uniforms:on([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,{opacity:{value:1}}]),vertexShader:dt.meshnormal_vert,fragmentShader:dt.meshnormal_frag},sprite:{uniforms:on([ze.sprite,ze.fog]),vertexShader:dt.sprite_vert,fragmentShader:dt.sprite_frag},background:{uniforms:{uvTransform:{value:new it},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:dt.background_vert,fragmentShader:dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new it}},vertexShader:dt.backgroundCube_vert,fragmentShader:dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:dt.cube_vert,fragmentShader:dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:dt.equirect_vert,fragmentShader:dt.equirect_frag},distance:{uniforms:on([ze.common,ze.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:dt.distance_vert,fragmentShader:dt.distance_frag},shadow:{uniforms:on([ze.lights,ze.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:dt.shadow_vert,fragmentShader:dt.shadow_frag}};si.physical={uniforms:on([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new it},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new it},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new it},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new it},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new it},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new it},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new it},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new it},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new it},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new it},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new it},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new it},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new it}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag};var Ll={r:0,b:0,g:0},V0=new ht,Np=new it;Np.set(-1,0,0,0,1,0,0,0,1);function G0(i,e,t,n,r,s){let a=new Je(0),o=r===!0?0:1,l,c,h=null,p=0,f=null;function u(v){let w=v.isScene===!0?v.background:null;if(w&&w.isTexture){let x=v.backgroundBlurriness>0;w=e.get(w,x)}return w}function g(v){let w=!1,x=u(v);x===null?m(a,o):x&&x.isColor&&(m(x,1),w=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,s):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(v,w){let x=u(w);x&&x.isCubeTexture?(c===void 0&&(c=new mt(new an(1,1,1),new kt({name:"BackgroundCubeMaterial",uniforms:ar(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(C,A,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(V0.makeRotationFromEuler(w.backgroundRotation)).transpose(),x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Np),c.material.toneMapped=ft.getTransfer(x.colorSpace)!==_t,(h!==x||p!==x.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,p=x.version,f=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new mt(new yi(2,2),new kt({name:"BackgroundMaterial",uniforms:ar(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:Vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=ft.getTransfer(x.colorSpace)!==_t,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||p!==x.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,p=x.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,w){v.getRGB(Ll,ld(i)),t.buffers.color.setClear(Ll.r,Ll.g,Ll.b,w,s)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,w=1){a.set(v),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(a,o)},render:g,addToRenderList:y,dispose:d}}function W0(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null),s=r,a=!1;function o(D,W,se,U,Q){let re=!1,$=p(D,U,se,W);s!==$&&(s=$,c(s.object)),re=u(D,U,se,Q),re&&g(D,U,se,Q),Q!==null&&e.update(Q,i.ELEMENT_ARRAY_BUFFER),(re||a)&&(a=!1,x(D,W,se,U),Q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function l(){return i.createVertexArray()}function c(D){return i.bindVertexArray(D)}function h(D){return i.deleteVertexArray(D)}function p(D,W,se,U){let Q=U.wireframe===!0,re=n[W.id];re===void 0&&(re={},n[W.id]=re);let $=D.isInstancedMesh===!0?D.id:0,he=re[$];he===void 0&&(he={},re[$]=he);let H=he[se.id];H===void 0&&(H={},he[se.id]=H);let ge=H[Q];return ge===void 0&&(ge=f(l()),H[Q]=ge),ge}function f(D){let W=[],se=[],U=[];for(let Q=0;Q<t;Q++)W[Q]=0,se[Q]=0,U[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:se,attributeDivisors:U,object:D,attributes:{},index:null}}function u(D,W,se,U){let Q=s.attributes,re=W.attributes,$=0,he=se.getAttributes();for(let H in he)if(he[H].location>=0){let K=Q[H],Ie=re[H];if(Ie===void 0&&(H==="instanceMatrix"&&D.instanceMatrix&&(Ie=D.instanceMatrix),H==="instanceColor"&&D.instanceColor&&(Ie=D.instanceColor)),K===void 0||K.attribute!==Ie||Ie&&K.data!==Ie.data)return!0;$++}return s.attributesNum!==$||s.index!==U}function g(D,W,se,U){let Q={},re=W.attributes,$=0,he=se.getAttributes();for(let H in he)if(he[H].location>=0){let K=re[H];K===void 0&&(H==="instanceMatrix"&&D.instanceMatrix&&(K=D.instanceMatrix),H==="instanceColor"&&D.instanceColor&&(K=D.instanceColor));let Ie={};Ie.attribute=K,K&&K.data&&(Ie.data=K.data),Q[H]=Ie,$++}s.attributes=Q,s.attributesNum=$,s.index=U}function y(){let D=s.newAttributes;for(let W=0,se=D.length;W<se;W++)D[W]=0}function m(D){d(D,0)}function d(D,W){let se=s.newAttributes,U=s.enabledAttributes,Q=s.attributeDivisors;se[D]=1,U[D]===0&&(i.enableVertexAttribArray(D),U[D]=1),Q[D]!==W&&(i.vertexAttribDivisor(D,W),Q[D]=W)}function v(){let D=s.newAttributes,W=s.enabledAttributes;for(let se=0,U=W.length;se<U;se++)W[se]!==D[se]&&(i.disableVertexAttribArray(se),W[se]=0)}function w(D,W,se,U,Q,re,$){$===!0?i.vertexAttribIPointer(D,W,se,Q,re):i.vertexAttribPointer(D,W,se,U,Q,re)}function x(D,W,se,U){y();let Q=U.attributes,re=se.getAttributes(),$=W.defaultAttributeValues;for(let he in re){let H=re[he];if(H.location>=0){let ge=Q[he];if(ge===void 0&&(he==="instanceMatrix"&&D.instanceMatrix&&(ge=D.instanceMatrix),he==="instanceColor"&&D.instanceColor&&(ge=D.instanceColor)),ge!==void 0){let K=ge.normalized,Ie=ge.itemSize,ke=e.get(ge);if(ke===void 0)continue;let te=ke.buffer,Ce=ke.type,pe=ke.bytesPerElement,Le=Ce===i.INT||Ce===i.UNSIGNED_INT||ge.gpuType===Zo;if(ge.isInterleavedBufferAttribute){let Re=ge.data,Ue=Re.isInterleavedBuffer===!0?Re.stride:Re.itemSize,lt=ge.offset;if(Re.isInstancedInterleavedBuffer||Re.isInstancedBufferAttribute){for(let Oe=0;Oe<H.locationSize;Oe++)d(H.location+Oe,Re.meshPerAttribute);D.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Re.meshPerAttribute*Re.count)}else for(let Oe=0;Oe<H.locationSize;Oe++)m(H.location+Oe);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Oe=0;Oe<H.locationSize;Oe++)w(H.location+Oe,Ie/H.locationSize,Ce,K,Ue*pe,(lt+Ie/H.locationSize*Oe)*pe,Le)}else{if(ge.isInstancedBufferAttribute){for(let Re=0;Re<H.locationSize;Re++)d(H.location+Re,ge.meshPerAttribute);D.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let Re=0;Re<H.locationSize;Re++)m(H.location+Re);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Re=0;Re<H.locationSize;Re++)w(H.location+Re,Ie/H.locationSize,Ce,K,Ie*pe,Ie/H.locationSize*Re*pe,Le)}}else if($!==void 0){let K=$[he];if(K!==void 0)switch(K.length){case 2:i.vertexAttrib2fv(H.location,K);break;case 3:i.vertexAttrib3fv(H.location,K);break;case 4:i.vertexAttrib4fv(H.location,K);break;default:i.vertexAttrib1fv(H.location,K)}}}}v()}function C(){B();for(let D in n){let W=n[D];for(let se in W){let U=W[se];for(let Q in U){let re=U[Q];for(let $ in re)h(re[$].object),delete re[$];delete U[Q]}}delete n[D]}}function A(D){if(n[D.id]===void 0)return;let W=n[D.id];for(let se in W){let U=W[se];for(let Q in U){let re=U[Q];for(let $ in re)h(re[$].object),delete re[$];delete U[Q]}}delete n[D.id]}function b(D){for(let W in n){let se=n[W];for(let U in se){let Q=se[U];if(Q[D.id]===void 0)continue;let re=Q[D.id];for(let $ in re)h(re[$].object),delete re[$];delete Q[D.id]}}}function M(D){for(let W in n){let se=n[W],U=D.isInstancedMesh===!0?D.id:0,Q=se[U];if(Q!==void 0){for(let re in Q){let $=Q[re];for(let he in $)h($[he].object),delete $[he];delete Q[re]}delete se[U],Object.keys(se).length===0&&delete n[W]}}}function B(){k(),a=!0,s!==r&&(s=r,c(s.object))}function k(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:B,resetDefaultState:k,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfObject:M,releaseStatesOfProgram:b,initAttributes:y,enableAttribute:m,disableUnusedAttributes:v}}function X0(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let f=0;for(let u=0;u<h;u++)f+=c[u];t.update(f,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Y0(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let b=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(b){return!(b!==Zn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){let M=b===$t&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==xn&&b!==Nn&&!M&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&($e("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&p===!1;t.reversedDepthBuffer===!0&&p===!1&&$e("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&p===!0&&$e("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:p,maxTextures:u,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:v,maxVaryings:w,maxFragmentUniforms:x,maxSamples:C,samples:A}}function q0(i){let e=this,t=null,n=0,r=!1,s=!1,a=new wn,o=new it,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,f){let u=p.length!==0||f||n!==0||r;return r=f,n=p.length,u},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,f){t=h(p,f,0)},this.setState=function(p,f,u){let g=p.clippingPlanes,y=p.clipIntersection,m=p.clipShadows,d=i.get(p);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{let v=s?0:n,w=v*4,x=d.clippingState||null;l.value=x,x=h(g,f,w,u);for(let C=0;C!==w;++C)x[C]=t[C];d.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(p,f,u,g){let y=p!==null?p.length:0,m=null;if(y!==0){if(m=l.value,g!==!0||m===null){let d=u+y*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<d)&&(m=new Float32Array(d));for(let w=0,x=u;w!==y;++w,x+=4)a.copy(p[w]).applyMatrix4(v,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}var ga=class extends Bt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ps(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new an(5,5,5),s=new kt({name:"CubemapFromEquirect",uniforms:ar(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:mn,blending:_i});s.uniforms.tEquirect.value=t;let a=new mt(r,s),o=t.minFilter;return t.minFilter===wi&&(t.minFilter=pn),new Hr(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}},up=256,Z0=3,j0=20,Up=256,Fp=16,K0=3,J0=new R,$0=new Je,Nl=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Hr(1,10,null),this._boxMesh=new mt(new an(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=J0}=s,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let p=l.autoClear,f=l.autoClearColor,u=l.autoClearDepth,g=l.autoClearStencil,y=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,y===null&&(e.background=l.getClearColor($0));let m=new Hr(n,r,h);return m.position.copy(o),m.update(l,e),l.autoClear=p,l.autoClearColor=f,l.autoClearDepth=u,l.autoClearStencil=g,e.background=y,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(up,rd(e))}_fromTexture(e,t){e.mapping===rr||e.mapping===Xr?this._setSize(e.image.length===0?up:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=fp(e,!1,!1),n=Math.log2(e)-Z0;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=fp(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,s=this._cubeCamera;r.material=n,s.renderTarget=e,s.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),s.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===rr||e.mapping===Xr?(this._cubemapMaterial===null&&(this._cubemapMaterial=gp()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=mp()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Q0(),this._integrationMaterial=ex());let t=this._cubeSize,n=e.texture.mipmaps.length-1,r=this._ggxMaterial.uniforms;r.envMap.value=this._sourceTarget.texture;let s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(t/Fp);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-K0)s.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let l=o>0?Math.log2(t)+.5*Math.log2(6/(Up*Math.pow(o,4)))+.5:0;r.roughness.value=o,r.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=tx());let n=this._blurMaterial,r=n.uniforms,s=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=s.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(s,0,n)}};function fp(i,e,t){return new ga(i,{minFilter:wi,generateMipmaps:e,type:$t,colorSpace:xs,depthBuffer:t})}function xa(i,e,t){return new kt({name:i,uniforms:e,vertexShader:dt.cube_vert,fragmentShader:t,side:mn,blending:_i,depthTest:!1,depthWrite:!1})}function Q0(){return xa("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Up}u

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
	`)}function ex(){return xa("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Fp}},`

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
	`)}function tx(){return xa("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${j0}
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
	`)}function mp(){return xa("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function gp(){return xa("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function nx(i){let e=new WeakMap,t=new WeakMap,n=null;function r(f,u=!1){return f==null?null:u?a(f):s(f)}function s(f){if(f&&f.isTexture){let u=f.mapping;if(u===Xo||u===Yo)if(e.has(f)){let g=e.get(f).texture;return o(g,f.mapping)}else{let g=f.image;if(g&&g.height>0){let y=new ga(g.height);return y.fromEquirectangularTexture(i,f),e.set(f,y),f.addEventListener("dispose",c),o(y.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let u=f.mapping,g=u===Xo||u===Yo,y=u===rr||u===Xr;if(g||y){let m=t.get(f),d=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==d)return n===null&&(n=new Nl(i)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{let v=f.image;return g&&v&&v.height>0||y&&v&&l(v)?(n===null&&(n=new Nl(i)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function o(f,u){return u===Xo?f.mapping=rr:u===Yo&&(f.mapping=Xr),f}function l(f){let u=0,g=6;for(let y=0;y<g;y++)f[y]!==void 0&&u++;return u===g}function c(f){let u=f.target;u.removeEventListener("dispose",c);let g=e.get(u);g!==void 0&&(e.delete(u),g.dispose())}function h(f){let u=f.target;u.removeEventListener("dispose",h);let g=t.get(u);g!==void 0&&(t.delete(u),g.dispose())}function p(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:p}}function ix(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Ji("WebGLRenderer: "+n+" extension not supported."),r}}}function rx(i,e,t,n){let r={},s=new WeakMap,a=new FinalizationRegistry(g=>delete r[g]);function o(g){l(g.target)}function l(g){g.index!==null&&e.remove(g.index);for(let m in g.attributes)e.remove(g.attributes[m]);g.removeEventListener("dispose",o),delete r[g.id],a.unregister(g);let y=s.get(g);y&&(e.remove(y),s.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function c(g,y){return r[y.id]!==void 0||(y.addEventListener("dispose",o),r[y.id]=new WeakRef(y),a.register(y,y.id,y),t.memory.geometries++),y}function h(g){let y=g.attributes;for(let m in y)e.update(y[m],i.ARRAY_BUFFER)}function p(g){let y=g.index,m=g.attributes.position,d=0;if(m===void 0)return;let v=y!==null?y.array.length:m.array.length/3-1,w=m.count>=65535?Ts:Es,x=new w(Math.ceil(v/3)*6,1),C=x.array;if(y!==null){let b=y.array;d=y.version;for(let M=0,B=0;M<v;M+=3){let k=b[M+0],D=b[M+1],W=b[M+2];C[B++]=k,C[B++]=D,C[B++]=D,C[B++]=W,C[B++]=W,C[B++]=k}}else{d=m.version;for(let b=0,M=0;b<v;b+=3){let B=b+0,k=b+1,D=b+2;C[M++]=B,C[M++]=k,C[M++]=k,C[M++]=D,C[M++]=D,C[M++]=B}}x.version=d;let A=s.get(g);A&&e.remove(A),s.set(g,x)}function f(g){let y=s.get(g);if(y){let m=g.index;m!==null&&y.version<m.version&&p(g)}else p(g);return s.get(g)}function u(){for(let g in r){let y=r[g].deref();y!==void 0&&l(y)}}return{get:c,update:h,getWireframeAttribute:f,dispose:u}}function sx(i,e,t){let n;function r(p){n=p}let s,a;function o(p){s=p.type,a=p.bytesPerElement}function l(p,f){i.drawElements(n,f,s,p*a),t.update(f,n,1)}function c(p,f,u){u!==0&&(i.drawElementsInstanced(n,f,s,p*a,u),t.update(f,n,u))}function h(p,f,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,p,0,u);let y=0;for(let m=0;m<u;m++)y+=f[m];t.update(y,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function ax(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:et("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function ox(i,e,t){let n=new WeakMap,r=new Pt;function s(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=h!==void 0?h.length:0,f=n.get(o);if(f===void 0||f.count!==p){let B=function(){b.dispose(),n.delete(o),o.removeEventListener("dispose",B)};f!==void 0&&f.texture.dispose();let u=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],w=0;u===!0&&(w=1),g===!0&&(w=2),y===!0&&(w=3);let x=o.attributes.position.count*w,C=1;x>e.maxTextureSize&&(C=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let A=new Float32Array(x*C*4*p),b=new _s(A,x,C,p);b.type=Nn,b.needsUpdate=!0;let M=w*4;for(let k=0;k<p;k++){let D=m[k],W=d[k],se=v[k],U=x*C*4*k;for(let Q=0;Q<D.count;Q++){let re=Q*M;u===!0&&(r.fromBufferAttribute(D,Q),A[U+re+0]=r.x,A[U+re+1]=r.y,A[U+re+2]=r.z,A[U+re+3]=0),g===!0&&(r.fromBufferAttribute(W,Q),A[U+re+4]=r.x,A[U+re+5]=r.y,A[U+re+6]=r.z,A[U+re+7]=0),y===!0&&(r.fromBufferAttribute(se,Q),A[U+re+8]=r.x,A[U+re+9]=r.y,A[U+re+10]=r.z,A[U+re+11]=se.itemSize===4?r.w:1)}}f={count:p,texture:b,size:new ye(x,C)},n.set(o,f),o.addEventListener("dispose",B)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let u=0;for(let y=0;y<c.length;y++)u+=c[y];let g=o.morphTargetsRelative?1:1-u;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function lx(i,e,t,n,r){let s=new WeakMap;function a(c){let h=r.render.frame,p=c.geometry,f=e.get(c,p);if(s.get(f)!==h&&(e.update(f),s.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let u=c.skeleton;s.get(u)!==h&&(u.update(),s.set(u,h))}return f}function o(){s=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var cx={[ta]:"LINEAR_TONE_MAPPING",[na]:"REINHARD_TONE_MAPPING",[ia]:"CINEON_TONE_MAPPING",[ir]:"ACES_FILMIC_TONE_MAPPING",[sa]:"AGX_TONE_MAPPING",[aa]:"NEUTRAL_TONE_MAPPING",[ra]:"CUSTOM_TONE_MAPPING"};function dx(i,e,t,n,r,s){let a=new Bt(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new yt;h.setAttribute("position",new pt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new pt([0,2,0,0,2,0],2));let p=new Or({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new mt(h,p),u=new tr(-1,1,1,-1,0,1),g=null,y=null,m=!1,d,v=null,w=[],x=!1;this.setSize=function(C,A){a.setSize(C,A),o!==null&&o.setSize(C,A),l!==null&&l.setSize(C,A);for(let b=0;b<w.length;b++){let M=w[b];M.setSize&&M.setSize(C,A)}},this.setEffects=function(C){w=C,x=w.length>0&&w[0].isRenderPass===!0;let A=a.width,b=a.height;w.length>0&&o===null&&(o=new Bt(A,b,{type:$t,depthBuffer:!1,stencilBuffer:!1}),l=new Bt(A,b,{type:$t,depthBuffer:!1,stencilBuffer:!1}));let M=r===!0&&w.some(B=>B.needsDepthTexture===!0);M!==(a.depthTexture!==null)&&(M===!0&&c===null&&(c=new bi(A,b),s===!0&&(c.format=Si,c.type=sr)),a.dispose(),a.depthTexture=M?c:null,a.resolveDepthBuffer=M,a.storeMultisampledDepthBuffer=M);for(let B=0;B<w.length;B++){let k=w[B];k.setSize&&k.setSize(A,b),M&&k.needsDepthTexture===!0&&k.setDepthTexture&&k.setDepthTexture(c)}},this.begin=function(C,A){if(m||C.toneMapping===ii&&w.length===0)return!1;if(v=A,A!==null){let b=A.width,M=A.height;(a.width!==b||a.height!==M)&&this.setSize(b,M)}return x===!1&&C.setRenderTarget(a),d=C.toneMapping,C.toneMapping=ii,!0},this.hasRenderPass=function(){return x},this.end=function(C,A){C.toneMapping=d,m=!0;let b=a,M=o;for(let B=0;B<w.length;B++){let k=w[B];k.enabled!==!1&&(k.render(C,M,b,A),k.needsSwap!==!1&&(b=M,M=M===o?l:o))}if(g!==C.outputColorSpace||y!==C.toneMapping){g=C.outputColorSpace,y=C.toneMapping,p.defines={},ft.getTransfer(g)===_t&&(p.defines.SRGB_TRANSFER="");let B=cx[y];B&&(p.defines[B]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=b.texture,C.setRenderTarget(v),C.render(f,u),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),p.dispose()}}var Op=new fn,Bp=new bi(1,1),zp=new Ls(1),Hp=new _s,Vp=new wo,Gp=new Ps,xp=[],bp=[],vp=new Float32Array(16),yp=new Float32Array(9),_p=new Float32Array(4);function Zr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=xp[r];if(s===void 0&&(s=new Float32Array(r),xp[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Ht(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Fl(i,e){let t=bp[e];t===void 0&&(t=new Int32Array(e),bp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function hx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function px(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function ux(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function fx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function mx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;_p.set(n),i.uniformMatrix2fv(this.addr,!1,_p),Vt(t,n)}}function gx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;yp.set(n),i.uniformMatrix3fv(this.addr,!1,yp),Vt(t,n)}}function xx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;vp.set(n),i.uniformMatrix4fv(this.addr,!1,vp),Vt(t,n)}}function bx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function vx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function yx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function _x(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function wx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Sx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function Mx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function Ex(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function Ol(i){return i.version===0&&(i.compareFunction=ed,i.needsUpdate=!0),i}function Tx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?s=Ol(Bp):s=Op,t.setTexture2D(e||s,r)}function Ax(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Vp,r)}function Cx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_CUBE_SHADOW?s=Ol(zp):s=Gp,t.setTextureCube(e||s,r)}function Rx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Hp,r)}function Ix(i){switch(i){case 5126:return hx;case 35664:return px;case 35665:return ux;case 35666:return fx;case 35674:return mx;case 35675:return gx;case 35676:return xx;case 5124:case 35670:return bx;case 35667:case 35671:return vx;case 35668:case 35672:return yx;case 35669:case 35673:return _x;case 5125:return wx;case 36294:return Sx;case 36295:return Mx;case 36296:return Ex;case 35678:case 36198:case 36298:case 36306:case 35682:return Tx;case 35679:case 36299:case 36307:return Ax;case 35680:case 36300:case 36308:case 36293:return Cx;case 36289:case 36303:case 36311:case 36292:return Rx}}function Px(i,e){i.uniform1fv(this.addr,e)}function kx(i,e){let t=Zr(e,this.size,2);i.uniform2fv(this.addr,t)}function Lx(i,e){let t=Zr(e,this.size,3);i.uniform3fv(this.addr,t)}function Dx(i,e){let t=Zr(e,this.size,4);i.uniform4fv(this.addr,t)}function Nx(i,e){let t=Zr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ux(i,e){let t=Zr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Fx(i,e){let t=Zr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ox(i,e){i.uniform1iv(this.addr,e)}function Bx(i,e){i.uniform2iv(this.addr,e)}function zx(i,e){i.uniform3iv(this.addr,e)}function Hx(i,e){i.uniform4iv(this.addr,e)}function Vx(i,e){i.uniform1uiv(this.addr,e)}function Gx(i,e){i.uniform2uiv(this.addr,e)}function Wx(i,e){i.uniform3uiv(this.addr,e)}function Xx(i,e){i.uniform4uiv(this.addr,e)}function Yx(i,e,t){let n=this.cache,r=e.length,s=Fl(t,r);Ht(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ol(Bp):a=Op;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function qx(i,e,t){let n=this.cache,r=e.length,s=Fl(t,r);Ht(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Vp,s[a])}function Zx(i,e,t){let n=this.cache,r=e.length,s=Fl(t,r);Ht(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=Ol(zp):a=Gp;for(let o=0;o!==r;++o)t.setTextureCube(e[o]||a,s[o])}function jx(i,e,t){let n=this.cache,r=e.length,s=Fl(t,r);Ht(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Hp,s[a])}function Kx(i){switch(i){case 5126:return Px;case 35664:return kx;case 35665:return Lx;case 35666:return Dx;case 35674:return Nx;case 35675:return Ux;case 35676:return Fx;case 5124:case 35670:return Ox;case 35667:case 35671:return Bx;case 35668:case 35672:return zx;case 35669:case 35673:return Hx;case 5125:return Vx;case 36294:return Gx;case 36295:return Wx;case 36296:return Xx;case 35678:case 36198:case 36298:case 36306:case 35682:return Yx;case 35679:case 36299:case 36307:return qx;case 35680:case 36300:case 36308:case 36293:return Zx;case 36289:case 36303:case 36311:case 36292:return jx}}var fd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ix(t.type)}},md=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Kx(t.type)}},gd=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},pd=/(\w+)(\])?(\[|\.)?/g;function wp(i,e){i.seq.push(e),i.map[e.id]=e}function Jx(i,e,t){let n=i.name,r=n.length;for(pd.lastIndex=0;;){let s=pd.exec(n),a=pd.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){wp(t,c===void 0?new fd(o,i,e):new md(o,i,e));break}else{let p=t.map[o];p===void 0&&(p=new gd(o),wp(t,p)),t=p}}}var qr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Jx(o,l,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function Sp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var $x=37297,Qx=0;function eb(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Mp=new it;function tb(i){ft._getMatrix(Mp,ft.workingColorSpace,i);let e=`mat3( ${Mp.elements.map(t=>t.toFixed(4))} )`;switch(ft.getTransfer(i)){case bs:return[e,"LinearTransferOETF"];case _t:return[e,"sRGBTransferOETF"];default:return $e("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ep(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+eb(i.getShaderSource(e),o)}else return s}function nb(i,e){let t=tb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var ib={[ta]:"Linear",[na]:"Reinhard",[ia]:"Cineon",[ir]:"ACESFilmic",[sa]:"AgX",[aa]:"Neutral",[ra]:"Custom"};function rb(i,e){let t=ib[e];return t===void 0?($e("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Dl=new R;function sb(){ft.getLuminanceCoefficients(Dl);let i=Dl.x.toFixed(4),e=Dl.y.toFixed(4),t=Dl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ab(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ma).join(`
`)}function ob(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function lb(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ma(i){return i!==""}function Tp(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Ap(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var cb=/^[ \t]*#include +<([\w\d./]+)>/gm;function xd(i){return i.replace(cb,db)}function db(i,e){let t=dt[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return xd(t)}var hb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cp(i){return i.replace(hb,pb)}function pb(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Rp(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var ub={[ea]:"SHADOWMAP_TYPE_PCF",[Gr]:"SHADOWMAP_TYPE_VSM"};function fb(i){return ub[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var mb={[Xr]:"ENVMAP_MODE_REFRACTION"};function gb(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":mb[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var xb={[Wc]:"ENVMAP_BLENDING_MULTIPLY",[Wh]:"ENVMAP_BLENDING_MIX",[Xh]:"ENVMAP_BLENDING_ADD"};function bb(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":xb[i.combine]||"ENVMAP_BLENDING_NONE"}function vb(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=fb(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=gb(t),p=bb(t),f=ab(t),u=ob(s),g=r.createProgram(),y,m,d=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,u].filter(ma).join(`
`),y.length>0&&(y+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,u].filter(ma).join(`
`),m.length>0&&(m+=`
`)):(y=[Rp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,u,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ma).join(`
`),m=[Rp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,u,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ii?"#define TONE_MAPPING":"",t.toneMapping!==ii?dt.tonemapping_pars_fragment:"",t.toneMapping!==ii?rb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",dt.colorspace_pars_fragment,nb("linearToOutputTexel",t.outputColorSpace),sb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ma).join(`
`)),a=xd(a),a=Tp(a,t),a=Ap(a,t),o=xd(o),o=Tp(o,t),o=Ap(o,t),a=Cp(a),o=Cp(o),t.isRawShaderMaterial!==!0&&(d=`#version 300 es
`,y=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,m=["#define varying in",t.glslVersion===nd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let v=d+y+a,w=d+m+o,x=Sp(r,r.VERTEX_SHADER,v),C=Sp(r,r.FRAGMENT_SHADER,w);r.attachShader(g,x),r.attachShader(g,C),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function A(k){if(i.debug.checkShaderErrors){let D=r.getProgramInfoLog(g)||"",W=r.getShaderInfoLog(x)||"",se=r.getShaderInfoLog(C)||"",U=D.trim(),Q=W.trim(),re=se.trim(),$=!0,he=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,g,x,C);else{let H=Ep(r,x,"vertex"),ge=Ep(r,C,"fragment");et("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+U+`
`+H+`
`+ge)}else U!==""?$e("WebGLProgram: Program Info Log:",U):(Q===""||re==="")&&(he=!1);he&&(k.diagnostics={runnable:$,programLog:U,vertexShader:{log:Q,prefix:y},fragmentShader:{log:re,prefix:m}})}r.deleteShader(x),r.deleteShader(C),b=new qr(r,g),M=lb(r,g)}let b;this.getUniforms=function(){return b===void 0&&A(this),b};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=r.getProgramParameter(g,$x)),B},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Qx++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=x,this.fragmentShader=C,this}var yb=0,bd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new vd(e),t.set(e,n)),n}},vd=class{constructor(e){this.id=yb++,this.code=e,this.usedTimes=0}};function _b(i){return i===Gi||i===pa||i===ua}function wb(i,e,t,n,r,s){let a=new ws,o=new bd,l=new Set,c=[],h=new Map,p=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(b){return l.add(b),b===0?"uv":`uv${b}`}function g(b,M,B,k,D,W){let se=k.fog,U=D.geometry,Q=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?k.environment:null,re=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,$=e.get(b.envMap||Q,re),he=f[b.type],H=n.precision;b.precision!==null&&(H=n.getMaxPrecision(b.precision),H!==b.precision&&$e("WebGLProgram.getParameters:",b.precision,"not supported, using",H,"instead."));let ge=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,K=ge!==void 0?ge.length:0,Ie=0;U.morphAttributes.position!==void 0&&(Ie=1),U.morphAttributes.normal!==void 0&&(Ie=2),U.morphAttributes.color!==void 0&&(Ie=3);let ke,te,Ce,pe;if(he){let G=si[he];ke=G.vertexShader,te=G.fragmentShader}else{ke=b.vertexShader,te=b.fragmentShader;let G=o.getVertexShaderStage(b),xe=o.getFragmentShaderStage(b);o.update(b,G,xe),Ce=G.id,pe=xe.id}let Le=i.getRenderTarget(),Re=i.state.buffers.depth.getReversed(),Ue=D.isInstancedMesh===!0,lt=D.isBatchedMesh===!0,Oe=!!b.map,He=!!b.matcap,le=!!$,Z=le&&$.isPMREMTexture===!0,we=!!b.aoMap,me=!!b.lightMap,_e=!!b.bumpMap&&b.wireframe===!1,ue=!!b.normalMap,Ge=!!b.displacementMap,Fe=!!b.emissiveMap,nt=!!b.metalnessMap,Te=!!b.roughnessMap,Ke=b.anisotropy>0,O=b.clearcoat>0,bt=b.diffuseRoughness>0,Qe=b.dispersion>0,ct=b.retroreflectivity>0,Se=b.iridescence>0,j=b.sheen>0,be=b.transmission>0,Pe=Ke&&!!b.anisotropyMap,T=O&&!!b.clearcoatMap,_=O&&!!b.clearcoatNormalMap,L=O&&!!b.clearcoatRoughnessMap,ce=bt&&!!b.diffuseRoughnessMap,Y=Se&&!!b.iridescenceMap,oe=Se&&!!b.iridescenceThicknessMap,F=j&&!!b.sheenColorMap,V=j&&!!b.sheenRoughnessMap,q=!!b.specularMap,ee=!!b.specularColorMap,S=!!b.specularIntensityMap,P=be&&!!b.transmissionMap,J=be&&!!b.thicknessMap,ve=!!b.gradientMap,Ee=!!b.alphaMap,Me=b.alphaTest>0,Ae=!!b.alphaHash,X=!!b.extensions,N=ii;b.toneMapped&&(Le===null||Le.isXRRenderTarget===!0)&&(N=i.toneMapping);let ae=Z?$.isCompressedCubeTexture?$.image[0].mipmaps:$.mipmaps:null,I={shaderID:he,shaderType:b.type,shaderName:b.name,vertexShader:ke,fragmentShader:te,defines:b.defines,customVertexShaderID:Ce,customFragmentShaderID:pe,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:H,batching:lt,batchingColor:lt&&D._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&D.instanceColor!==null,instancingMorph:Ue&&D.morphTexture!==null,outputColorSpace:Le===null?i.outputColorSpace:Le.isXRRenderTarget===!0?Le.texture.colorSpace:ft.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Oe,matcap:He,envMap:le,envMapMode:le&&$.mapping,envMapPMREM:Z,envMapMaxLod:Z?ae.length-1:null,envMapSize:Z?ae[0].width:null,aoMap:we,lightMap:me,bumpMap:_e,normalMap:ue,displacementMap:Ge,emissiveMap:Fe,normalMapObjectSpace:ue&&b.normalMapType===Zh,normalMapTangentSpace:ue&&b.normalMapType===Pl,packedNormalMap:ue&&b.normalMapType===Pl&&_b(b.normalMap.format),metalnessMap:nt,roughnessMap:Te,anisotropy:Ke,anisotropyMap:Pe,clearcoat:O,clearcoatMap:T,clearcoatNormalMap:_,clearcoatRoughnessMap:L,diffuseRoughness:bt,diffuseRoughnessMap:ce,dispersion:Qe,retroreflection:ct,iridescence:Se,iridescenceMap:Y,iridescenceThicknessMap:oe,sheen:j,sheenColorMap:F,sheenRoughnessMap:V,specularMap:q,specularColorMap:ee,specularIntensityMap:S,transmission:be,transmissionMap:P,thicknessMap:J,gradientMap:ve,opaque:b.transparent===!1&&b.blending===Wr&&b.alphaToCoverage===!1,alphaMap:Ee,alphaTest:Me,alphaHash:Ae,combine:b.combine,mapUv:Oe&&u(b.map.channel),aoMapUv:we&&u(b.aoMap.channel),lightMapUv:me&&u(b.lightMap.channel),bumpMapUv:_e&&u(b.bumpMap.channel),normalMapUv:ue&&u(b.normalMap.channel),displacementMapUv:Ge&&u(b.displacementMap.channel),emissiveMapUv:Fe&&u(b.emissiveMap.channel),metalnessMapUv:nt&&u(b.metalnessMap.channel),roughnessMapUv:Te&&u(b.roughnessMap.channel),anisotropyMapUv:Pe&&u(b.anisotropyMap.channel),clearcoatMapUv:T&&u(b.clearcoatMap.channel),clearcoatNormalMapUv:_&&u(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:L&&u(b.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ce&&u(b.diffuseRoughnessMap.channel),iridescenceMapUv:Y&&u(b.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&u(b.iridescenceThicknessMap.channel),sheenColorMapUv:F&&u(b.sheenColorMap.channel),sheenRoughnessMapUv:V&&u(b.sheenRoughnessMap.channel),specularMapUv:q&&u(b.specularMap.channel),specularColorMapUv:ee&&u(b.specularColorMap.channel),specularIntensityMapUv:S&&u(b.specularIntensityMap.channel),transmissionMapUv:P&&u(b.transmissionMap.channel),thicknessMapUv:J&&u(b.thicknessMap.channel),alphaMapUv:Ee&&u(b.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ue||Ke),vertexNormals:!!U.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!U.attributes.uv&&(Oe||Ee),fog:!!se,useFog:b.fog===!0,fogExp2:!!se&&se.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||U.attributes.normal===void 0&&ue===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Re,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:Ie,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:W.filter(G=>G.texture!==null).length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&B.length>0,shadowMapType:i.shadowMap.type,toneMapping:N,decodeVideoTexture:Oe&&b.map.isVideoTexture===!0&&ft.getTransfer(b.map.colorSpace)===_t,decodeVideoTextureEmissive:Fe&&b.emissiveMap.isVideoTexture===!0&&ft.getTransfer(b.emissiveMap.colorSpace)===_t,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===gn,flipSided:b.side===mn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:X&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(X&&b.extensions.multiDraw===!0||lt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return I.vertexUv1s=l.has(1),I.vertexUv2s=l.has(2),I.vertexUv3s=l.has(3),l.clear(),I}function y(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let B in b.defines)M.push(B),M.push(b.defines[B]);return b.isRawShaderMaterial===!1&&(m(M,b),d(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function m(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapPMREM),b.push(M.envMapMaxLod),b.push(M.envMapSize),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.diffuseRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.numSunLights),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numSunLightShadows),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.numLightProbeGrids),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function d(b,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.diffuseRoughness&&a.enable(25),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),b.push(a.mask)}function v(b){let M=f[b.type],B;if(M){let k=si[M];B=Ti.clone(k.uniforms)}else B=b.uniforms;return B}function w(b,M){let B=h.get(M);return B!==void 0?++B.usedTimes:(B=new vb(i,M,b,r),c.push(B),h.set(M,B)),B}function x(b){if(--b.usedTimes===0){let M=c.indexOf(b);c[M]=c[c.length-1],c.pop(),h.delete(b.cacheKey),b.destroy()}}function C(b){o.remove(b)}function A(){o.dispose()}return{getParameters:g,getProgramCacheKey:y,getUniforms:v,acquireProgram:w,releaseProgram:x,releaseShaderCache:C,programs:c,dispose:A}}function Sb(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Mb(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Ip(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Pp(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(f){let u=0;return f.isInstancedMesh&&(u+=2),f.isSkinnedMesh&&(u+=1),u}function o(f,u,g,y,m,d){let v=i[e];return v===void 0?(v={id:f.id,object:f,geometry:u,material:g,materialVariant:a(f),groupOrder:y,renderOrder:f.renderOrder,z:m,group:d},i[e]=v):(v.id=f.id,v.object=f,v.geometry=u,v.material=g,v.materialVariant=a(f),v.groupOrder=y,v.renderOrder=f.renderOrder,v.z=m,v.group=d),e++,v}function l(f,u,g,y,m,d,v){v.reversedDepth===!0&&(m=-m);let w=o(f,u,g,y,m,d);g.transmission>0?n.push(w):g.transparent===!0?r.push(w):t.push(w)}function c(f,u,g,y,m,d){let v=o(f,u,g,y,m,d);g.transmission>0?n.unshift(v):g.transparent===!0?r.unshift(v):t.unshift(v)}function h(f,u){t.length>1&&t.sort(f||Mb),n.length>1&&n.sort(u||Ip),r.length>1&&r.sort(u||Ip)}function p(){for(let f=e,u=i.length;f<u;f++){let g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:p,sort:h}}function Eb(){let i=new WeakMap;function e(n,r){let s=i.get(n),a;return s===void 0?(a=new Pp,i.set(n,[a])):r>=s.length?(a=new Pp,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Tb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new R,color:new Je};break;case"SpotLight":t={position:new R,direction:new R,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function Ab(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Cb=0;function Rb(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Ib(i){let e=new Tb,t=Ab(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);let r=new R,s=new ht,a=new ht;function o(c){let h=0,p=0,f=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let u=0,g=0,y=0,m=0,d=0,v=0,w=0,x=0,C=0,A=0,b=0,M=0,B=0,k=0;c.sort(Rb);for(let W=0,se=c.length;W<se;W++){let U=c[W],Q=U.color,re=U.intensity,$=U.distance,he=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===Gi?he=U.shadow.map.texture:he=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=Q.r*re,p+=Q.g*re,f+=Q.b*re;else if(U.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(U.sh.coefficients[H],re);k++}else if(U.isSunLight){let H=e.get(U);if(H.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let ge=U.shadow,K=t.get(U);K.shadowIntensity=ge.intensity,K.shadowBias=ge.bias,K.shadowNormalBias=ge.normalBias,K.shadowRadius=ge.radius,K.shadowMapSize.copy(ge.mapSize).multiply(ge.getFrameExtents()),n.sunShadow[g]=K,n.sunShadowMap[g]=he;let Ie=ge.getViewportCount();for(let ke=0;ke<Ie;ke++)n.sunShadowMatrix[y+ke]=ge.getMatrix(ke),n.sunShadowCascade[y+ke]=ge._cascadeData[ke];y+=Ie,g++}n.sun[u]=H,u++}else if(U.isDirectionalLight){let H=e.get(U);if(H.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let ge=U.shadow,K=t.get(U);K.shadowIntensity=ge.intensity,K.shadowBias=ge.bias,K.shadowNormalBias=ge.normalBias,K.shadowRadius=ge.radius,K.shadowMapSize=ge.mapSize,n.directionalShadow[m]=K,n.directionalShadowMap[m]=he,n.directionalShadowMatrix[m]=U.shadow.matrix,C++}n.directional[m]=H,m++}else if(U.isSpotLight){let H=e.get(U);H.position.setFromMatrixPosition(U.matrixWorld),H.color.copy(Q).multiplyScalar(re),H.distance=$,H.coneCos=Math.cos(U.angle),H.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),H.decay=U.decay,n.spot[v]=H;let ge=U.shadow;if(U.map&&(n.spotLightMap[M]=U.map,M++,ge.updateMatrices(U),U.castShadow&&B++),n.spotLightMatrix[v]=ge.matrix,U.castShadow){let K=t.get(U);K.shadowIntensity=ge.intensity,K.shadowBias=ge.bias,K.shadowNormalBias=ge.normalBias,K.shadowRadius=ge.radius,K.shadowMapSize=ge.mapSize,n.spotShadow[v]=K,n.spotShadowMap[v]=he,b++}v++}else if(U.isRectAreaLight){let H=e.get(U);H.color.copy(Q).multiplyScalar(re),H.halfWidth.set(U.width*.5,0,0),H.halfHeight.set(0,U.height*.5,0),n.rectArea[w]=H,w++}else if(U.isPointLight){let H=e.get(U);if(H.color.copy(U.color).multiplyScalar(U.intensity),H.distance=U.distance,H.decay=U.decay,U.castShadow){let ge=U.shadow,K=t.get(U);K.shadowIntensity=ge.intensity,K.shadowBias=ge.bias,K.shadowNormalBias=ge.normalBias,K.shadowRadius=ge.radius,K.shadowMapSize=ge.mapSize,K.shadowCameraNear=ge.camera.near,K.shadowCameraFar=ge.camera.far,n.pointShadow[d]=K,n.pointShadowMap[d]=he,n.pointShadowMatrix[d]=U.shadow.matrix,A++}n.point[d]=H,d++}else if(U.isHemisphereLight){let H=e.get(U);H.skyColor.copy(U.color).multiplyScalar(re),H.groundColor.copy(U.groundColor).multiplyScalar(re),n.hemi[x]=H,x++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ze.LTC_FLOAT_1,n.rectAreaLTC2=ze.LTC_FLOAT_2):(n.rectAreaLTC1=ze.LTC_HALF_1,n.rectAreaLTC2=ze.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=p,n.ambient[2]=f;let D=n.hash;(D.sunLength!==u||D.directionalLength!==m||D.pointLength!==d||D.spotLength!==v||D.rectAreaLength!==w||D.hemiLength!==x||D.numSunShadows!==g||D.numDirectionalShadows!==C||D.numPointShadows!==A||D.numSpotShadows!==b||D.numSpotMaps!==M||D.numLightProbes!==k)&&(n.sun.length=u,n.directional.length=m,n.spot.length=v,n.rectArea.length=w,n.point.length=d,n.hemi.length=x,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=C,n.directionalShadowMap.length=C,n.directionalShadowMatrix.length=C,n.pointShadow.length=A,n.pointShadowMap.length=A,n.pointShadowMatrix.length=A,n.spotShadow.length=b,n.spotShadowMap.length=b,n.spotLightMatrix.length=b+M-B,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=B,n.numLightProbes=k,D.sunLength=u,D.directionalLength=m,D.pointLength=d,D.spotLength=v,D.rectAreaLength=w,D.hemiLength=x,D.numSunShadows=g,D.numDirectionalShadows=C,D.numPointShadows=A,D.numSpotShadows=b,D.numSpotMaps=M,D.numLightProbes=k,n.version=Cb++)}function l(c,h){let p=0,f=0,u=0,g=0,y=0,m=0,d=h.matrixWorldInverse;for(let v=0,w=c.length;v<w;v++){let x=c[v];if(x.isSunLight){let C=n.sun[p];C.direction.setFromMatrixPosition(x.matrixWorld),C.direction.transformDirection(d),p++}else if(x.isDirectionalLight){let C=n.directional[f];C.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(d),f++}else if(x.isSpotLight){let C=n.spot[g];C.position.setFromMatrixPosition(x.matrixWorld),C.position.applyMatrix4(d),C.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(d),g++}else if(x.isRectAreaLight){let C=n.rectArea[y];C.position.setFromMatrixPosition(x.matrixWorld),C.position.applyMatrix4(d),a.identity(),s.copy(x.matrixWorld),s.premultiply(d),a.extractRotation(s),C.halfWidth.set(x.width*.5,0,0),C.halfHeight.set(0,x.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),y++}else if(x.isPointLight){let C=n.point[u];C.position.setFromMatrixPosition(x.matrixWorld),C.position.applyMatrix4(d),u++}else if(x.isHemisphereLight){let C=n.hemi[m];C.direction.setFromMatrixPosition(x.matrixWorld),C.direction.transformDirection(d),m++}}}return{setup:o,setupView:l,state:n}}function kp(i){let e=new Ib(i),t=[],n=[],r=[];function s(p){h.camera=p,t.length=0,n.length=0,r.length=0}function a(p){p.isLightProbeGrid?r.push(p):t.push(p)}function o(p){n.push(p)}function l(){e.setup(t),r.sort((p,f)=>p.priority-f.priority||p.id-f.id)}function c(p){e.setupView(t,p)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Pb(i){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new kp(i),e.set(r,[o])):s>=a.length?(o=new kp(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var kb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Lb=`uniform sampler2D shadow_pass;
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
}`,Db=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],Nb=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Lp=new ht,fa=new R,ud=new R;function Ub(i,e,t){let n=new Di,r=new ye,s=new ye,a=new Pt,o=new ko,l=new Lo,c={},h=t.maxTextureSize,p={[Vi]:mn,[mn]:Vi,[gn]:gn},f=new kt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:kb,fragmentShader:Lb}),u=f.clone();u.defines.HORIZONTAL_PASS=1;let g=new yt;g.setAttribute("position",new Ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new mt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ea;let d=this.type;this.render=function(A,b,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===Eh&&($e("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ea);let B=i.getRenderTarget(),k=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),W=i.state;W.setBlending(_i),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let se=d!==this.type;se&&b.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(Q=>Q.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,Q=A.length;U<Q;U++){let re=A[U],$=re.shadow;if($===void 0){$e("WebGLShadowMap:",re,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;r.copy($.mapSize);let he=$.getFrameExtents();r.multiply(he),s.copy($.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/he.x),r.x=s.x*he.x,$.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/he.y),r.y=s.y*he.y,$.mapSize.y=s.y));let H=i.state.buffers.depth.getReversed();if($.camera._reversedDepth=H,$.map===null||se===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===Gr){if(re.isPointLight){$e("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new Bt(r.x,r.y,{format:Gi,type:$t,minFilter:pn,magFilter:pn,generateMipmaps:!1}),$.map.texture.name=re.name+".shadowMap",$.map.depthTexture=new bi(r.x,r.y,Nn),$.map.depthTexture.name=re.name+".shadowMapDepth",$.map.depthTexture.format=gi,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Zt,$.map.depthTexture.magFilter=Zt}else re.isPointLight?($.map=new ga(r.x),$.map.depthTexture=new Ls(r.x,qn)):($.map=new Bt(r.x,r.y),$.map.depthTexture=new bi(r.x,r.y,qn)),$.map.depthTexture.name=re.name+".shadowMap",$.map.depthTexture.format=gi,this.type===ea?($.map.depthTexture.compareFunction=H?Qc:$c,$.map.depthTexture.minFilter=pn,$.map.depthTexture.magFilter=pn):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Zt,$.map.depthTexture.magFilter=Zt);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==r.x||$.map.height!==r.y)&&$.map.setSize(r.x,r.y);let ge=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();re.isPointLight!==!0&&$.updateMatrices(re,M);let K=($.camera.layers.mask&4294967294)!==0?$.camera.layers:M.layers;for(let Ie=0;Ie<ge;Ie++){let ke=$.getCamera(Ie);if(re.isPointLight){let te=$.camera,Ce=$.matrix,pe=re.distance||te.far;pe!==te.far&&(te.far=pe,te.updateProjectionMatrix()),fa.setFromMatrixPosition(re.matrixWorld),te.position.copy(fa),ud.copy(te.position),ud.add(Db[Ie]),te.up.copy(Nb[Ie]),te.lookAt(ud),te.updateMatrixWorld(),Ce.makeTranslation(-fa.x,-fa.y,-fa.z),Lp.multiplyMatrices(te.projectionMatrix,te.matrixWorldInverse),$._frustum.setFromProjectionMatrix(Lp,te.coordinateSystem,te.reversedDepth)}if($.map.isWebGLCubeRenderTarget)i.setRenderTarget($.map,Ie),i.clear();else{Ie===0&&(i.setRenderTarget($.map),i.clear());let te=$.getViewport(Ie);a.set(s.x*te.x,s.y*te.y,s.x*te.z,s.y*te.w),W.viewport(a)}n=$.getFrustum(Ie),x(b,M,ke,re,K,this.type)}$.isPointLightShadow!==!0&&this.type===Gr&&v($,M),$.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(B,k,D)};function v(A,b){let M=e.update(y);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,u.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,u.needsUpdate=!0),A.mapPass===null?A.mapPass=new Bt(r.x,r.y,{format:Gi,type:$t}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),f.uniforms.shadow_pass.value=A.map.depthTexture,f.uniforms.resolution.value.set(A.map.width,A.map.height),f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(b,null,M,f,y,null),u.uniforms.shadow_pass.value=A.mapPass.texture,u.uniforms.resolution.value.set(A.map.width,A.map.height),u.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(b,null,M,u,y,null)}function w(A,b,M,B){let k=null,D=M.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(D!==void 0)k=D;else if(k=M.isPointLight===!0?l:o,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){let W=k.uuid,se=b.uuid,U=c[W];U===void 0&&(U={},c[W]=U);let Q=U[se];Q===void 0&&(Q=k.clone(),U[se]=Q,b.addEventListener("dispose",C)),k=Q}if(k.visible=b.visible,k.wireframe=b.wireframe,B===Gr?k.side=b.shadowSide!==null?b.shadowSide:b.side:k.side=b.shadowSide!==null?b.shadowSide:p[b.side],k.alphaMap=b.alphaMap,k.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,k.map=b.map,k.clipShadows=b.clipShadows,k.clippingPlanes=b.clippingPlanes,k.clipIntersection=b.clipIntersection,k.displacementMap=b.displacementMap,k.displacementScale=b.displacementScale,k.displacementBias=b.displacementBias,k.wireframeLinewidth=b.wireframeLinewidth,k.linewidth=b.linewidth,M.isPointLight===!0&&k.isMeshDistanceMaterial===!0){let W=i.properties.get(k);W.light=M}return k}function x(A,b,M,B,k,D){if(A.visible===!1)return;if(A.layers.test(k)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&D===Gr)&&(!A.frustumCulled||A.intersectsFrustum(n))){A.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,A.matrixWorld);let U=e.update(A),Q=A.material;if(Array.isArray(Q)){let re=U.groups;for(let $=0,he=re.length;$<he;$++){let H=re[$],ge=Q[H.materialIndex];if(ge&&ge.visible){let K=w(A,ge,B,D);A.onBeforeShadow(i,A,b,M,U,K,H),i.renderBufferDirect(M,null,U,K,A,H),A.onAfterShadow(i,A,b,M,U,K,H)}}}else if(Q.visible){let re=w(A,Q,B,D);A.onBeforeShadow(i,A,b,M,U,re,null),i.renderBufferDirect(M,null,U,re,A,null),A.onAfterShadow(i,A,b,M,U,re,null)}}let se=A.children;for(let U=0,Q=se.length;U<Q;U++)x(se[U],b,M,B,k,D)}function C(A){A.target.removeEventListener("dispose",C);for(let M in c){let B=c[M],k=A.target.uuid;k in B&&(B[k].dispose(),delete B[k])}}}function Fb(i,e){function t(){let S=!1,P=new Pt,J=null,ve=new Pt(0,0,0,0);return{setMask:function(Ee){J!==Ee&&!S&&(i.colorMask(Ee,Ee,Ee,Ee),J=Ee)},setLocked:function(Ee){S=Ee},setClear:function(Ee,Me,Ae,X,N){N===!0&&(Ee*=X,Me*=X,Ae*=X),P.set(Ee,Me,Ae,X),ve.equals(P)===!1&&(i.clearColor(Ee,Me,Ae,X),ve.copy(P))},reset:function(){S=!1,J=null,ve.set(-1,0,0,0)}}}function n(){let S=!1,P=!1,J=null,ve=null,Ee=null;return{setReversed:function(Me){if(P!==Me){let Ae=e.get("EXT_clip_control");Me?Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.ZERO_TO_ONE_EXT):Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.NEGATIVE_ONE_TO_ONE_EXT),P=Me;let X=Ee;Ee=null,this.setClear(X)}},getReversed:function(){return P},setTest:function(Me){Me?Re(i.DEPTH_TEST):Ue(i.DEPTH_TEST)},setMask:function(Me){J!==Me&&!S&&(i.depthMask(Me),J=Me)},setFunc:function(Me){if(P&&(Me=rp[Me]),ve!==Me){switch(Me){case co:i.depthFunc(i.NEVER);break;case ho:i.depthFunc(i.ALWAYS);break;case po:i.depthFunc(i.LESS);break;case Ir:i.depthFunc(i.LEQUAL);break;case uo:i.depthFunc(i.EQUAL);break;case fo:i.depthFunc(i.GEQUAL);break;case mo:i.depthFunc(i.GREATER);break;case go:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=Me}},setLocked:function(Me){S=Me},setClear:function(Me){Ee!==Me&&(Ee=Me,P&&(Me=1-Me),i.clearDepth(Me))},reset:function(){S=!1,J=null,ve=null,Ee=null,P=!1}}}function r(){let S=!1,P=null,J=null,ve=null,Ee=null,Me=null,Ae=null,X=null,N=null;return{setTest:function(ae){S||(ae?Re(i.STENCIL_TEST):Ue(i.STENCIL_TEST))},setMask:function(ae){P!==ae&&!S&&(i.stencilMask(ae),P=ae)},setFunc:function(ae,I,G){(J!==ae||ve!==I||Ee!==G)&&(i.stencilFunc(ae,I,G),J=ae,ve=I,Ee=G)},setOp:function(ae,I,G){(Me!==ae||Ae!==I||X!==G)&&(i.stencilOp(ae,I,G),Me=ae,Ae=I,X=G)},setLocked:function(ae){S=ae},setClear:function(ae){N!==ae&&(i.clearStencil(ae),N=ae)},reset:function(){S=!1,P=null,J=null,ve=null,Ee=null,Me=null,Ae=null,X=null,N=null}}}let s=new t,a=new n,o=new r,l={},c=new WeakMap,h={},p={},f={},u=new WeakMap,g=[],y=null,m=!1,d=null,v=null,w=null,x=null,C=null,A=null,b=null,M=new Je(0,0,0),B=0,k=!1,D=null,W=null,se=null,U=null,Q=null,re=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,he=0,H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(he=parseFloat(/^WebGL (\d)/.exec(H)[1]),$=he>=1):H.indexOf("OpenGL ES")!==-1&&(he=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),$=he>=2);let ge=null,K={},Ie=i.getParameter(i.SCISSOR_BOX),ke=i.getParameter(i.VIEWPORT),te=new Pt().fromArray(Ie),Ce=new Pt().fromArray(ke);function pe(S,P,J,ve){let Ee=new Uint8Array(4),Me=i.createTexture();i.bindTexture(S,Me),i.texParameteri(S,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(S,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ae=0;Ae<J;Ae++)S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY?i.texImage3D(P,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,Ee):i.texImage2D(P+Ae,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ee);return Me}let Le={};Le[i.TEXTURE_2D]=pe(i.TEXTURE_2D,i.TEXTURE_2D,1),Le[i.TEXTURE_CUBE_MAP]=pe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Le[i.TEXTURE_2D_ARRAY]=pe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Le[i.TEXTURE_3D]=pe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Re(i.DEPTH_TEST),a.setFunc(Ir),_e(!1),ue(Bc),Re(i.CULL_FACE),we(_i);function Re(S){h[S]!==!0&&(i.enable(S),h[S]=!0)}function Ue(S){h[S]!==!1&&(i.disable(S),h[S]=!1)}function lt(S,P){return f[S]!==P?(i.bindFramebuffer(S,P),f[S]=P,S===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=P),S===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=P),!0):!1}function Oe(S,P){let J=g,ve=!1;if(S){J=u.get(P),J===void 0&&(J=[],u.set(P,J));let Ee=S.textures;if(J.length!==Ee.length||J[0]!==i.COLOR_ATTACHMENT0){for(let Me=0,Ae=Ee.length;Me<Ae;Me++)J[Me]=i.COLOR_ATTACHMENT0+Me;J.length=Ee.length,ve=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ve=!0);ve&&i.drawBuffers(J)}function He(S){return y!==S?(i.useProgram(S),y=S,!0):!1}let le={[nr]:i.FUNC_ADD,[Ah]:i.FUNC_SUBTRACT,[Ch]:i.FUNC_REVERSE_SUBTRACT};le[Rh]=i.MIN,le[Ih]=i.MAX;let Z={[Ph]:i.ZERO,[kh]:i.ONE,[Lh]:i.SRC_COLOR,[Vc]:i.SRC_ALPHA,[Bh]:i.SRC_ALPHA_SATURATE,[Fh]:i.DST_COLOR,[Nh]:i.DST_ALPHA,[Dh]:i.ONE_MINUS_SRC_COLOR,[Gc]:i.ONE_MINUS_SRC_ALPHA,[Oh]:i.ONE_MINUS_DST_COLOR,[Uh]:i.ONE_MINUS_DST_ALPHA,[zh]:i.CONSTANT_COLOR,[Hh]:i.ONE_MINUS_CONSTANT_COLOR,[Vh]:i.CONSTANT_ALPHA,[Gh]:i.ONE_MINUS_CONSTANT_ALPHA};function we(S,P,J,ve,Ee,Me,Ae,X,N,ae){if(S===_i){m===!0&&(Ue(i.BLEND),m=!1);return}if(m===!1&&(Re(i.BLEND),m=!0),S!==Th){if(S!==d||ae!==k){if((v!==nr||C!==nr)&&(i.blendEquation(i.FUNC_ADD),v=nr,C=nr),ae)switch(S){case Wr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jt:i.blendFunc(i.ONE,i.ONE);break;case zc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Hc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:et("WebGLState: Invalid blending: ",S);break}else switch(S){case Wr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jt:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case zc:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hc:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",S);break}w=null,x=null,A=null,b=null,M.set(0,0,0),B=0,d=S,k=ae}return}Ee=Ee||P,Me=Me||J,Ae=Ae||ve,(P!==v||Ee!==C)&&(i.blendEquationSeparate(le[P],le[Ee]),v=P,C=Ee),(J!==w||ve!==x||Me!==A||Ae!==b)&&(i.blendFuncSeparate(Z[J],Z[ve],Z[Me],Z[Ae]),w=J,x=ve,A=Me,b=Ae),(X.equals(M)===!1||N!==B)&&(i.blendColor(X.r,X.g,X.b,N),M.copy(X),B=N),d=S,k=!1}function me(S,P){S.side===gn?Ue(i.CULL_FACE):Re(i.CULL_FACE);let J=S.side===mn;P&&(J=!J),_e(J),S.blending===Wr&&S.transparent===!1?we(_i):we(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),a.setFunc(S.depthFunc),a.setTest(S.depthTest),a.setMask(S.depthWrite),s.setMask(S.colorWrite);let ve=S.stencilWrite;o.setTest(ve),ve&&(o.setMask(S.stencilWriteMask),o.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),o.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),Fe(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?Re(i.SAMPLE_ALPHA_TO_COVERAGE):Ue(i.SAMPLE_ALPHA_TO_COVERAGE)}function _e(S){D!==S&&(S?i.frontFace(i.CW):i.frontFace(i.CCW),D=S)}function ue(S){S!==Sh?(Re(i.CULL_FACE),S!==W&&(S===Bc?i.cullFace(i.BACK):S===Mh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ue(i.CULL_FACE),W=S}function Ge(S){S!==se&&($&&i.lineWidth(S),se=S)}function Fe(S,P,J){S?(Re(i.POLYGON_OFFSET_FILL),(U!==P||Q!==J)&&(U=P,Q=J,a.getReversed()&&(P=-P,J=-J),i.polygonOffset(P,J))):Ue(i.POLYGON_OFFSET_FILL)}function nt(S){S?Re(i.SCISSOR_TEST):Ue(i.SCISSOR_TEST)}function Te(S){S===void 0&&(S=i.TEXTURE0+re-1),ge!==S&&(i.activeTexture(S),ge=S)}function Ke(S,P,J){J===void 0&&(ge===null?J=i.TEXTURE0+re-1:J=ge);let ve=K[J];ve===void 0&&(ve={type:void 0,texture:void 0},K[J]=ve),(ve.type!==S||ve.texture!==P)&&(ge!==J&&(i.activeTexture(J),ge=J),i.bindTexture(S,P||Le[S]),ve.type=S,ve.texture=P)}function O(){let S=K[ge];S!==void 0&&S.type!==void 0&&(i.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)}function bt(){try{i.compressedTexImage2D(...arguments)}catch(S){et("WebGLState:",S)}}function Qe(){try{i.compressedTexImage3D(...arguments)}catch(S){et("WebGLState:",S)}}function ct(){try{i.texSubImage2D(...arguments)}catch(S){et("WebGLState:",S)}}function Se(){try{i.texSubImage3D(...arguments)}catch(S){et("WebGLState:",S)}}function j(){try{i.compressedTexSubImage2D(...arguments)}catch(S){et("WebGLState:",S)}}function be(){try{i.compressedTexSubImage3D(...arguments)}catch(S){et("WebGLState:",S)}}function Pe(){try{i.texStorage2D(...arguments)}catch(S){et("WebGLState:",S)}}function T(){try{i.texStorage3D(...arguments)}catch(S){et("WebGLState:",S)}}function _(){try{i.texImage2D(...arguments)}catch(S){et("WebGLState:",S)}}function L(){try{i.texImage3D(...arguments)}catch(S){et("WebGLState:",S)}}function ce(S){return p[S]!==void 0?p[S]:i.getParameter(S)}function Y(S,P){p[S]!==P&&(i.pixelStorei(S,P),p[S]=P)}function oe(S){te.equals(S)===!1&&(i.scissor(S.x,S.y,S.z,S.w),te.copy(S))}function F(S){Ce.equals(S)===!1&&(i.viewport(S.x,S.y,S.z,S.w),Ce.copy(S))}function V(S,P){let J=c.get(P);J===void 0&&(J=new WeakMap,c.set(P,J));let ve=J.get(S);ve===void 0&&(ve=i.getUniformBlockIndex(P,S.name),i.uniformBlockBinding(P,ve,ve),J.set(S,ve))}function q(S,P,J){let Ee=c.get(P).get(S);l[Ee]!==J&&(i.bindBufferBase(i.UNIFORM_BUFFER,Ee,J),l[Ee]=J)}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},p={},ge=null,K={},f={},l={},u=new WeakMap,g=[],y=null,m=!1,d=null,v=null,w=null,x=null,C=null,A=null,b=null,M=new Je(0,0,0),B=0,k=!1,D=null,W=null,se=null,U=null,Q=null,te.set(0,0,i.canvas.width,i.canvas.height),Ce.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Re,disable:Ue,bindFramebuffer:lt,drawBuffers:Oe,useProgram:He,setBlending:we,setMaterial:me,setFlipSided:_e,setCullFace:ue,setLineWidth:Ge,setPolygonOffset:Fe,setScissorTest:nt,activeTexture:Te,bindTexture:Ke,unbindTexture:O,compressedTexImage2D:bt,compressedTexImage3D:Qe,texImage2D:_,texImage3D:L,pixelStorei:Y,getParameter:ce,updateUBOMapping:V,uniformBlockBinding:q,texStorage2D:Pe,texStorage3D:T,texSubImage2D:ct,texSubImage3D:Se,compressedTexSubImage2D:j,compressedTexSubImage3D:be,scissor:oe,viewport:F,reset:ee}}function Ob(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ye,h=new WeakMap,p=new Set,f,u=new WeakMap,g=new Set,y=new FinalizationRegistry(T=>g.delete(T)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function d(T,_){return m?new OffscreenCanvas(T,_):vs("canvas")}function v(T,_,L){let ce=1,Y=Pe(T);if((Y.width>L||Y.height>L)&&(ce=L/Math.max(Y.width,Y.height)),ce<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let oe=Math.floor(ce*Y.width),F=Math.floor(ce*Y.height);f===void 0&&(f=d(oe,F));let V=_?d(oe,F):f;return V.width=oe,V.height=F,V.getContext("2d").drawImage(T,0,0,oe,F),$e("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+oe+"x"+F+")."),V}else return"data"in T&&$e("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),T;return T}function w(T){return T.generateMipmaps}function x(T){i.generateMipmap(T)}function C(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function A(T,_,L,ce,Y,oe=!1){if(T!==null){if(i[T]!==void 0)return i[T];$e("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let F;ce&&(F=e.get("EXT_texture_norm16"),F||$e("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let V=_;if(_===i.RED&&(L===i.FLOAT&&(V=i.R32F),L===i.HALF_FLOAT&&(V=i.R16F),L===i.UNSIGNED_BYTE&&(V=i.R8),L===i.UNSIGNED_SHORT&&F&&(V=F.R16_EXT),L===i.SHORT&&F&&(V=F.R16_SNORM_EXT)),_===i.RED_INTEGER&&(L===i.UNSIGNED_BYTE&&(V=i.R8UI),L===i.UNSIGNED_SHORT&&(V=i.R16UI),L===i.UNSIGNED_INT&&(V=i.R32UI),L===i.BYTE&&(V=i.R8I),L===i.SHORT&&(V=i.R16I),L===i.INT&&(V=i.R32I)),_===i.RG&&(L===i.FLOAT&&(V=i.RG32F),L===i.HALF_FLOAT&&(V=i.RG16F),L===i.UNSIGNED_BYTE&&(V=i.RG8),L===i.UNSIGNED_SHORT&&F&&(V=F.RG16_EXT),L===i.SHORT&&F&&(V=F.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(L===i.UNSIGNED_BYTE&&(V=i.RG8UI),L===i.UNSIGNED_SHORT&&(V=i.RG16UI),L===i.UNSIGNED_INT&&(V=i.RG32UI),L===i.BYTE&&(V=i.RG8I),L===i.SHORT&&(V=i.RG16I),L===i.INT&&(V=i.RG32I)),_===i.RGB_INTEGER&&(L===i.UNSIGNED_BYTE&&(V=i.RGB8UI),L===i.UNSIGNED_SHORT&&(V=i.RGB16UI),L===i.UNSIGNED_INT&&(V=i.RGB32UI),L===i.BYTE&&(V=i.RGB8I),L===i.SHORT&&(V=i.RGB16I),L===i.INT&&(V=i.RGB32I)),_===i.RGBA_INTEGER&&(L===i.UNSIGNED_BYTE&&(V=i.RGBA8UI),L===i.UNSIGNED_SHORT&&(V=i.RGBA16UI),L===i.UNSIGNED_INT&&(V=i.RGBA32UI),L===i.BYTE&&(V=i.RGBA8I),L===i.SHORT&&(V=i.RGBA16I),L===i.INT&&(V=i.RGBA32I)),_===i.RGB&&(L===i.UNSIGNED_SHORT&&F&&(V=F.RGB16_EXT),L===i.SHORT&&F&&(V=F.RGB16_SNORM_EXT),L===i.UNSIGNED_INT_5_9_9_9_REV&&(V=i.RGB9_E5),L===i.UNSIGNED_INT_10F_11F_11F_REV&&(V=i.R11F_G11F_B10F)),_===i.RGBA){let q=oe?bs:ft.getTransfer(Y);L===i.FLOAT&&(V=i.RGBA32F),L===i.HALF_FLOAT&&(V=i.RGBA16F),L===i.UNSIGNED_BYTE&&(V=q===_t?i.SRGB8_ALPHA8:i.RGBA8),L===i.UNSIGNED_SHORT&&F&&(V=F.RGBA16_EXT),L===i.SHORT&&F&&(V=F.RGBA16_SNORM_EXT),L===i.UNSIGNED_SHORT_4_4_4_4&&(V=i.RGBA4),L===i.UNSIGNED_SHORT_5_5_5_1&&(V=i.RGB5_A1)}return(V===i.R16F||V===i.R32F||V===i.RG16F||V===i.RG32F||V===i.RGBA16F||V===i.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function b(T,_){let L;return T?_===null||_===qn||_===sr?L=i.DEPTH24_STENCIL8:_===Nn?L=i.DEPTH32F_STENCIL8:_===Yr&&(L=i.DEPTH24_STENCIL8,$e("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===qn||_===sr?L=i.DEPTH_COMPONENT24:_===Nn?L=i.DEPTH_COMPONENT32F:_===Yr&&(L=i.DEPTH_COMPONENT16),L}function M(T,_){return w(T)===!0||T.isFramebufferTexture&&T.minFilter!==Zt&&T.minFilter!==pn?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function B(T){let _=new WeakRef(T);n.get(T).__ref=_,g.add(_),y.register(T,_,_)}function k(T){let _=n.get(T).__ref;_!==void 0&&(g.delete(_),y.unregister(_))}function D(T){se(T.target)}function W(T){U(T.target)}function se(T){T.removeEventListener("dispose",D),k(T),re(T),T.isVideoTexture&&h.delete(T),T.isHTMLTexture&&p.delete(T)}function U(T){T.removeEventListener("dispose",W),k(T),he(T)}function Q(){for(let T of g){let _=T.deref();_!==void 0&&(_.isRenderTarget===!0?U(_):se(_))}g.clear(),p.clear()}function re(T){let _=n.get(T);if(_.__webglInit===void 0)return;let L=T.source,ce=u.get(L);if(ce){let Y=ce[_.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&$(T),Object.keys(ce).length===0&&u.delete(L)}n.remove(T)}function $(T){let _=n.get(T);i.deleteTexture(_.__webglTexture);let L=T.source,ce=u.get(L);delete ce[_.__cacheKey],a.memory.textures--}function he(T){let _=n.get(T);_.__depthDisposeCallback&&_.__depthDisposeCallback();let L=T.depthTexture;if(L&&L.renderTarget===T&&se(L),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let oe=0;oe<_.__webglFramebuffer[Y].length;oe++)i.deleteFramebuffer(_.__webglFramebuffer[Y][oe]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let ce=T.textures;for(let Y=0,oe=ce.length;Y<oe;Y++){let F=n.get(ce[Y]);F.__webglTexture&&(i.deleteTexture(F.__webglTexture),a.memory.textures--),n.remove(ce[Y])}n.remove(T)}let H=0;function ge(){H=0}function K(){return H}function Ie(T){H=T}function ke(){let T=H;return T>=r.maxTextures&&$e("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+r.maxTextures),H+=1,T}function te(T){let _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.mipmapsAutoUpdate),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function Ce(T,_){let L=n.get(T);if(T.isVideoTexture&&j(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&L.__version!==T.version){let ce=T.image;if(ce===null)$e("WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)$e("WebGLRenderer: Texture marked for update but image is incomplete");else{me(L,T,_);return}}else T.isExternalTexture&&(L.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,L.__webglTexture,i.TEXTURE0+_)}function pe(T,_){let L=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&L.__version!==T.version){me(L,T,_);return}else T.isExternalTexture&&(L.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,L.__webglTexture,i.TEXTURE0+_)}function Le(T,_){let L=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&L.__version!==T.version){me(L,T,_);return}t.bindTexture(i.TEXTURE_3D,L.__webglTexture,i.TEXTURE0+_)}function Re(T,_){let L=n.get(T);if(T.version>0&&L.__version!==T.version){_e(L,T,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+_)}let Ue={[xo]:i.REPEAT,[$n]:i.CLAMP_TO_EDGE,[bo]:i.MIRRORED_REPEAT},lt={[Zt]:i.NEAREST,[Yh]:i.NEAREST_MIPMAP_NEAREST,[oa]:i.NEAREST_MIPMAP_LINEAR,[pn]:i.LINEAR,[qo]:i.LINEAR_MIPMAP_NEAREST,[wi]:i.LINEAR_MIPMAP_LINEAR},Oe={[Kh]:i.NEVER,[ed]:i.ALWAYS,[Jh]:i.LESS,[$c]:i.LEQUAL,[$h]:i.EQUAL,[Qc]:i.GEQUAL,[Qh]:i.GREATER,[ep]:i.NOTEQUAL};function He(T,_){if(_.type===Nn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===pn||_.magFilter===qo||_.magFilter===oa||_.magFilter===wi||_.minFilter===pn||_.minFilter===qo||_.minFilter===oa||_.minFilter===wi)&&$e("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,Ue[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Ue[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Ue[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,lt[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,lt[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Oe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Zt||_.minFilter!==oa&&_.minFilter!==wi||_.type===Nn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let L=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function le(T,_){let L=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",D),B(_));let ce=_.source,Y=u.get(ce);Y===void 0&&(Y={},u.set(ce,Y));let oe=te(_);if(oe!==T.__cacheKey){Y[oe]===void 0&&(Y[oe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,L=!0),Y[oe].usedTimes++;let F=Y[T.__cacheKey];F!==void 0&&(Y[T.__cacheKey].usedTimes--,F.usedTimes===0&&$(_)),T.__cacheKey=oe,T.__webglTexture=Y[oe].texture}return L}function Z(T,_,L){return Math.floor(Math.floor(T/L)/_)}function we(T,_,L,ce){let oe=T.updateRanges;if(oe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,L,ce,_.data);else{oe.sort((S,P)=>S.start-P.start);let F=0;for(let S=1;S<oe.length;S++){let P=oe[F],J=oe[S],ve=P.start+P.count,Ee=Z(J.start,_.width,4),Me=Z(P.start,_.width,4);J.start<=ve+1&&Ee===Me&&Z(J.start+J.count-1,_.width,4)===Ee?P.count=Math.max(P.count,J.start+J.count-P.start):(++F,oe[F]=J)}oe.length=F+1;let V=t.getParameter(i.UNPACK_ROW_LENGTH),q=t.getParameter(i.UNPACK_SKIP_PIXELS),ee=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let S=0,P=oe.length;S<P;S++){let J=oe[S],ve=Math.floor(J.start/4),Ee=Math.ceil(J.count/4),Me=ve%_.width,Ae=Math.floor(ve/_.width),X=Ee,N=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Me),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ae),t.texSubImage2D(i.TEXTURE_2D,0,Me,Ae,X,N,L,ce,_.data)}T.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,V),t.pixelStorei(i.UNPACK_SKIP_PIXELS,q),t.pixelStorei(i.UNPACK_SKIP_ROWS,ee)}}function me(T,_,L){let ce=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(ce=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(ce=i.TEXTURE_3D);let Y=le(T,_),oe=_.source;t.bindTexture(ce,T.__webglTexture,i.TEXTURE0+L);let F=n.get(oe);if(oe.version!==F.__version||Y===!0){if(t.activeTexture(i.TEXTURE0+L),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let N=ft.getPrimaries(ft.workingColorSpace),ae=_.colorSpace===Mi?null:ft.getPrimaries(_.colorSpace),I=_.colorSpace===Mi||N===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,I)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let q=v(_.image,!1,r.maxTextureSize);q=be(_,q);let ee=s.convert(_.format,_.colorSpace),S=s.convert(_.type),P=A(_.internalFormat,ee,S,_.normalized,_.colorSpace,_.isVideoTexture);He(ce,_);let J,ve=_.mipmaps,Ee=_.isVideoTexture!==!0,Me=F.__version===void 0||Y===!0,Ae=oe.dataReady,X=M(_,q);if(_.isDepthTexture)P=b(_.format===Si,_.type),Me&&(Ee?t.texStorage2D(i.TEXTURE_2D,1,P,q.width,q.height):t.texImage2D(i.TEXTURE_2D,0,P,q.width,q.height,0,ee,S,null));else if(_.isDataTexture)if(ve.length>0){Ee&&Me&&t.texStorage2D(i.TEXTURE_2D,X,P,ve[0].width,ve[0].height);for(let N=0,ae=ve.length;N<ae;N++)J=ve[N],Ee?Ae&&t.texSubImage2D(i.TEXTURE_2D,N,0,0,J.width,J.height,ee,S,J.data):t.texImage2D(i.TEXTURE_2D,N,P,J.width,J.height,0,ee,S,J.data);_.generateMipmaps=!1}else Ee?(Me&&t.texStorage2D(i.TEXTURE_2D,X,P,q.width,q.height),Ae&&we(_,q,ee,S)):t.texImage2D(i.TEXTURE_2D,0,P,q.width,q.height,0,ee,S,q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ee&&Me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,X,P,ve[0].width,ve[0].height,q.depth);for(let N=0,ae=ve.length;N<ae;N++)if(J=ve[N],_.format!==Zn)if(ee!==null)if(Ee){if(Ae)if(_.layerUpdates.size>0){let I=hd(J.width,J.height,_.format,_.type);for(let G of _.layerUpdates){let xe=J.data.subarray(G*I/J.data.BYTES_PER_ELEMENT,(G+1)*I/J.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,N,0,0,G,J.width,J.height,1,ee,xe)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,N,0,0,0,J.width,J.height,q.depth,ee,J.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,N,P,J.width,J.height,q.depth,0,J.data,0,0);else $e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ee?Ae&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,N,0,0,0,J.width,J.height,q.depth,ee,S,J.data):t.texImage3D(i.TEXTURE_2D_ARRAY,N,P,J.width,J.height,q.depth,0,ee,S,J.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ee&&Me&&t.texStorage2D(i.TEXTURE_2D,X,P,ve[0].width,ve[0].height);for(let N=0,ae=ve.length;N<ae;N++)J=ve[N],_.format!==Zn?ee!==null?Ee?Ae&&t.compressedTexSubImage2D(i.TEXTURE_2D,N,0,0,J.width,J.height,ee,J.data):t.compressedTexImage2D(i.TEXTURE_2D,N,P,J.width,J.height,0,J.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ee?Ae&&t.texSubImage2D(i.TEXTURE_2D,N,0,0,J.width,J.height,ee,S,J.data):t.texImage2D(i.TEXTURE_2D,N,P,J.width,J.height,0,ee,S,J.data)}else if(_.isDataArrayTexture)if(Ee){if(Me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,X,P,q.width,q.height,q.depth),Ae)if(_.layerUpdates.size>0){let N=hd(q.width,q.height,_.format,_.type);for(let ae of _.layerUpdates){let I=q.data.subarray(ae*N/q.data.BYTES_PER_ELEMENT,(ae+1)*N/q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ae,q.width,q.height,1,ee,S,I)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,ee,S,q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,P,q.width,q.height,q.depth,0,ee,S,q.data);else if(_.isData3DTexture)Ee?(Me&&t.texStorage3D(i.TEXTURE_3D,X,P,q.width,q.height,q.depth),Ae&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,ee,S,q.data)):t.texImage3D(i.TEXTURE_3D,0,P,q.width,q.height,q.depth,0,ee,S,q.data);else if(_.isFramebufferTexture){if(Me)if(Ee)t.texStorage2D(i.TEXTURE_2D,X,P,q.width,q.height);else{let N=q.width,ae=q.height;for(let I=0;I<X;I++)t.texImage2D(i.TEXTURE_2D,I,P,N,ae,0,ee,S,null),N>>=1,ae>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let N=i.canvas;if(N.hasAttribute("layoutsubtree")||N.setAttribute("layoutsubtree","true"),q.parentNode!==N){N.appendChild(q),p.add(_),N.onpaint=ae=>{let I=ae.changedElements;for(let G of p)I.includes(G.image)&&(G.needsUpdate=!0)},N.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,q);else{let I=i.RGBA,G=i.RGBA,xe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,I,G,xe,q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ve.length>0){if(Ee&&Me){let N=Pe(ve[0]);t.texStorage2D(i.TEXTURE_2D,X,P,N.width,N.height)}for(let N=0,ae=ve.length;N<ae;N++)J=ve[N],Ee?Ae&&t.texSubImage2D(i.TEXTURE_2D,N,0,0,ee,S,J):t.texImage2D(i.TEXTURE_2D,N,P,ee,S,J);_.generateMipmaps=!1}else if(Ee){if(Me){let N=Pe(q);t.texStorage2D(i.TEXTURE_2D,X,P,N.width,N.height)}Ae&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ee,S,q)}else t.texImage2D(i.TEXTURE_2D,0,P,ee,S,q);w(_)&&_.mipmapsAutoUpdate===!0&&x(ce),F.__version=oe.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function _e(T,_,L){if(_.image.length!==6)return;let ce=le(T,_),Y=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+L);let oe=n.get(Y);if(Y.version!==oe.__version||ce===!0){t.activeTexture(i.TEXTURE0+L);let F=ft.getPrimaries(ft.workingColorSpace),V=_.colorSpace===Mi?null:ft.getPrimaries(_.colorSpace),q=_.colorSpace===Mi||F===V?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,q);let ee=_.isCompressedTexture||_.image[0].isCompressedTexture,S=_.image[0]&&_.image[0].isDataTexture,P=[];for(let G=0;G<6;G++)!ee&&!S?P[G]=v(_.image[G],!0,r.maxCubemapSize):P[G]=S?_.image[G].image:_.image[G],P[G]=be(_,P[G]);let J=P[0],ve=s.convert(_.format,_.colorSpace),Ee=s.convert(_.type),Me=A(_.internalFormat,ve,Ee,_.normalized,_.colorSpace),Ae=_.isVideoTexture!==!0,X=oe.__version===void 0||ce===!0,N=Y.dataReady,ae=M(_,J);He(i.TEXTURE_CUBE_MAP,_);let I;if(_.isDepthTexture){if(Me=b(_.format===Si,_.type),X)if(Ae)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,Me,J.width,J.height);else for(let G=0;G<6;G++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,Me,J.width,J.height,0,ve,Ee,null)}else if(ee){Ae&&X&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ae,Me,J.width,J.height);for(let G=0;G<6;G++){I=P[G].mipmaps;for(let xe=0;xe<I.length;xe++){let fe=I[xe];_.format!==Zn?ve!==null?Ae?N&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe,0,0,fe.width,fe.height,ve,fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe,Me,fe.width,fe.height,0,fe.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ae?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe,0,0,fe.width,fe.height,ve,Ee,fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe,Me,fe.width,fe.height,0,ve,Ee,fe.data)}}}else{if(I=_.mipmaps,Ae&&X){I.length>0&&ae++;let G=Pe(P[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ae,Me,G.width,G.height)}for(let G=0;G<6;G++)if(S){Ae?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,P[G].width,P[G].height,ve,Ee,P[G].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,Me,P[G].width,P[G].height,0,ve,Ee,P[G].data);for(let xe=0;xe<I.length;xe++){let We=I[xe].image[G].image;Ae?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe+1,0,0,We.width,We.height,ve,Ee,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe+1,Me,We.width,We.height,0,ve,Ee,We.data)}}else{Ae?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,ve,Ee,P[G]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,Me,ve,Ee,P[G]);for(let xe=0;xe<I.length;xe++){let fe=I[xe];Ae?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe+1,0,0,ve,Ee,fe.image[G]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe+1,Me,ve,Ee,fe.image[G])}}}w(_)&&_.mipmapsAutoUpdate===!0&&x(i.TEXTURE_CUBE_MAP),oe.__version=Y.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function ue(T,_,L,ce,Y,oe){let F=s.convert(L.format,L.colorSpace),V=s.convert(L.type),q=A(L.internalFormat,F,V,L.normalized,L.colorSpace),ee=n.get(_),S=n.get(L);if(S.__renderTarget=_,!ee.__hasExternalTextures){let P=Math.max(1,_.width>>oe),J=Math.max(1,_.height>>oe);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?t.texImage3D(Y,oe,q,P,J,_.depth,0,F,V,null):t.texImage2D(Y,oe,q,P,J,0,F,V,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),Se(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,Y,S.__webglTexture,0,ct(_)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ce,Y,S.__webglTexture,oe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(T,_,L){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){let ce=_.depthTexture,Y=ce&&ce.isDepthTexture?ce.type:null,oe=b(_.stencilBuffer,Y),F=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Se(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct(_),oe,_.width,_.height):L?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct(_),oe,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,oe,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,F,i.RENDERBUFFER,T)}else{let ce=_.textures;for(let Y=0;Y<ce.length;Y++){let oe=ce[Y],F=s.convert(oe.format,oe.colorSpace),V=s.convert(oe.type),q=A(oe.internalFormat,F,V,oe.normalized,oe.colorSpace);Se(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct(_),q,_.width,_.height):L?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct(_),q,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,q,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Fe(T,_,L){let ce=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=n.get(_.depthTexture);Y.__renderTarget=_;let oe=ce?_.depthTexture.image[0]:_.depthTexture.image;(!Y.__webglTexture||oe.width!==_.width||oe.height!==_.height)&&(oe.width=_.width,oe.height=_.height,_.depthTexture.needsUpdate=!0),ce?Re(_.depthTexture,0):Ce(_.depthTexture,0);let F=Y.__webglTexture,V=ct(_),q=ce?i.TEXTURE_CUBE_MAP_POSITIVE_X+L:i.TEXTURE_2D,ee=_.depthTexture.format===Si?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===gi)Se(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,q,F,0,V):i.framebufferTexture2D(i.FRAMEBUFFER,ee,q,F,0);else if(_.depthTexture.format===Si)Se(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,q,F,0,V):i.framebufferTexture2D(i.FRAMEBUFFER,ee,q,F,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(T){let _=n.get(T),L=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){let ce=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),ce){let Y=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,ce.removeEventListener("dispose",Y)};ce.addEventListener("dispose",Y),_.__depthDisposeCallback=Y}_.__boundDepthTexture=ce}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(L)for(let ce=0;ce<6;ce++)Fe(_.__webglFramebuffer[ce],T,ce);else T.texture.mipmaps.length>0?Fe(_.__webglFramebuffer[0],T,0):Fe(_.__webglFramebuffer,T,0);else if(L){_.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[ce]),_.__webglDepthbuffer[ce]===void 0)_.__webglDepthbuffer[ce]=i.createRenderbuffer(),Ge(_.__webglDepthbuffer[ce],T,!1);else{let Y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer[ce];i.bindRenderbuffer(i.RENDERBUFFER,oe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,oe)}}else if(T.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Ge(_.__webglDepthbuffer,T,!1);else{let Y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,oe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,oe)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Te(T,_,L){let ce=n.get(T);_!==void 0&&ue(ce.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),L!==void 0&&nt(T)}function Ke(T){let _=T.texture,L=n.get(T),ce=n.get(_);T.addEventListener("dispose",W),B(T);let Y=T.textures,oe=T.isWebGLCubeRenderTarget===!0,F=Y.length>1;if(F||(ce.__webglTexture===void 0&&(ce.__webglTexture=i.createTexture()),ce.__version=_.version,a.memory.textures++),oe){L.__webglFramebuffer=[];for(let V=0;V<6;V++)if(_.mipmaps.length>0){L.__webglFramebuffer[V]=[];for(let q=0;q<_.mipmaps.length;q++)L.__webglFramebuffer[V][q]=i.createFramebuffer()}else L.__webglFramebuffer[V]=i.createFramebuffer()}else{if(_.mipmaps.length>0){L.__webglFramebuffer=[];for(let V=0;V<_.mipmaps.length;V++)L.__webglFramebuffer[V]=i.createFramebuffer()}else L.__webglFramebuffer=i.createFramebuffer();if(F)for(let V=0,q=Y.length;V<q;V++){let ee=n.get(Y[V]);ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&Se(T)===!1){L.__webglMultisampledFramebuffer=i.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let V=0;V<Y.length;V++){let q=Y[V];L.__webglColorRenderbuffer[V]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,L.__webglColorRenderbuffer[V]);let ee=s.convert(q.format,q.colorSpace),S=s.convert(q.type),P=A(q.internalFormat,ee,S,q.normalized,q.colorSpace,T.isXRRenderTarget===!0),J=ct(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,J,P,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.RENDERBUFFER,L.__webglColorRenderbuffer[V])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(L.__webglDepthRenderbuffer=i.createRenderbuffer(),Ge(L.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(oe){t.bindTexture(i.TEXTURE_CUBE_MAP,ce.__webglTexture),He(i.TEXTURE_CUBE_MAP,_);for(let V=0;V<6;V++)if(_.mipmaps.length>0)for(let q=0;q<_.mipmaps.length;q++)ue(L.__webglFramebuffer[V][q],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+V,q);else ue(L.__webglFramebuffer[V],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+V,0);w(_)?x(i.TEXTURE_CUBE_MAP):_.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,_.mipmaps.length-1),t.unbindTexture()}else if(F){for(let V=0,q=Y.length;V<q;V++){let ee=Y[V],S=n.get(ee),P=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(P=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(P,S.__webglTexture),He(P,ee),ue(L.__webglFramebuffer,T,ee,i.COLOR_ATTACHMENT0+V,P,0),w(ee)&&x(P)}t.unbindTexture()}else{let V=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(V=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(V,ce.__webglTexture),He(V,_),_.mipmaps.length>0)for(let q=0;q<_.mipmaps.length;q++)ue(L.__webglFramebuffer[q],T,_,i.COLOR_ATTACHMENT0,V,q);else ue(L.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,V,0);w(_)?x(V):_.mipmaps.length>0&&i.texParameteri(V,i.TEXTURE_MAX_LEVEL,_.mipmaps.length-1),t.unbindTexture()}T.depthBuffer&&nt(T)}function O(T){let _=T.textures;for(let L=0,ce=_.length;L<ce;L++){let Y=_[L];if(w(Y)&&Y.mipmapsAutoUpdate===!0){let oe=C(T),F=n.get(Y).__webglTexture;t.bindTexture(oe,F),x(oe),t.unbindTexture()}}}let bt=[];function Qe(T){if(T.samples>0){if(Se(T)===!1){let _=T.textures,L=T.width,ce=T.height,Y=i.COLOR_BUFFER_BIT,oe=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,F=n.get(T),V=_.length>1;if(V)for(let ee=0;ee<_.length;ee++)t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,F.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,F.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,F.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,F.__webglFramebuffer);for(let ee=0;ee<_.length;ee++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),V){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,F.__webglColorRenderbuffer[ee]);let S=n.get(_[ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,S,0)}i.blitFramebuffer(0,0,L,ce,0,0,L,ce,Y,i.NEAREST),l===!0&&(bt.length=0,bt.push(i.COLOR_ATTACHMENT0+ee),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&bt.push(oe),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,bt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),V)for(let ee=0;ee<_.length;ee++){t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,F.__webglColorRenderbuffer[ee]);let S=n.get(_[ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,F.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.TEXTURE_2D,S,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,F.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&l){let _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ct(T){return Math.min(r.maxSamples,T.samples)}function Se(T){let _=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function j(T){let _=a.render.frame;h.get(T)!==_&&(h.set(T,_),T.update())}function be(T,_){let L=T.colorSpace,ce=T.format,Y=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||L!==xs&&L!==Mi&&(ft.getTransfer(L)===_t?(ce!==Zn||Y!==xn)&&$e("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",L)),_}function Pe(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=ke,this.resetTextureUnits=ge,this.getTextureUnits=K,this.setTextureUnits=Ie,this.setTexture2D=Ce,this.setTexture2DArray=pe,this.setTexture3D=Le,this.setTextureCube=Re,this.rebindTextures=Te,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=Se,this.dispose=Q}function Bb(i,e){function t(n,r=Mi){let s,a=ft.getTransfer(r);if(n===xn)return i.UNSIGNED_BYTE;if(n===jo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ko)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Zc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===jc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Yc)return i.BYTE;if(n===qc)return i.SHORT;if(n===Yr)return i.UNSIGNED_SHORT;if(n===Zo)return i.INT;if(n===qn)return i.UNSIGNED_INT;if(n===Nn)return i.FLOAT;if(n===$t)return i.HALF_FLOAT;if(n===Kc)return i.ALPHA;if(n===Jc)return i.RGB;if(n===Zn)return i.RGBA;if(n===gi)return i.DEPTH_COMPONENT;if(n===Si)return i.DEPTH_STENCIL;if(n===Jo)return i.RED;if(n===$o)return i.RED_INTEGER;if(n===Gi)return i.RG;if(n===Qo)return i.RG_INTEGER;if(n===el)return i.RGBA_INTEGER;if(n===la||n===ca||n===da||n===ha)if(a===_t)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===la)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ca)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===da)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ha)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===la)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ca)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===da)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ha)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===tl||n===nl||n===il||n===rl)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===tl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===nl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===il)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===rl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===sl||n===al||n===ol||n===ll||n===cl||n===pa||n===dl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===sl||n===al)return a===_t?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ol)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===ll)return s.COMPRESSED_R11_EAC;if(n===cl)return s.COMPRESSED_SIGNED_R11_EAC;if(n===pa)return s.COMPRESSED_RG11_EAC;if(n===dl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===hl||n===pl||n===ul||n===fl||n===ml||n===gl||n===xl||n===bl||n===vl||n===yl||n===_l||n===wl||n===Sl||n===Ml)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===hl)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===pl)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ul)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fl)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ml)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===gl)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===xl)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===bl)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vl)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===yl)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_l)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===wl)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Sl)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ml)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===El||n===Tl||n===Al)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===El)return a===_t?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Tl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Al)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Cl||n===Rl||n===ua||n===Il)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Cl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Rl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ua)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Il)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===sr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var zb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hb=`
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

}`,yd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ds(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new kt({vertexShader:zb,fragmentShader:Hb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new mt(new yi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},_d=class extends Vn{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,p=null,f=null,u=null,g=null,y=typeof XRWebGLBinding<"u",m=new yd,d={},v=t.getContextAttributes(),w=null,x=null,C=[],A=[],b=new ye,M=null,B=null,k=new sn;k.viewport=new Pt;let D=new sn;D.viewport=new Pt;let W=[k,D],se=new Wo,U=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let Ce=C[te];return Ce===void 0&&(Ce=new Nr,C[te]=Ce),Ce.getTargetRaySpace()},this.getControllerGrip=function(te){let Ce=C[te];return Ce===void 0&&(Ce=new Nr,C[te]=Ce),Ce.getGripSpace()},this.getHand=function(te){let Ce=C[te];return Ce===void 0&&(Ce=new Nr,C[te]=Ce),Ce.getHandSpace()};function re(te){let Ce=A.indexOf(te.inputSource);if(Ce===-1)return;let pe=C[Ce];pe!==void 0&&(pe.update(te.inputSource,te.frame,c||a),pe.dispatchEvent({type:te.type,data:te.inputSource}))}function $(){r.removeEventListener("select",re),r.removeEventListener("selectstart",re),r.removeEventListener("selectend",re),r.removeEventListener("squeeze",re),r.removeEventListener("squeezestart",re),r.removeEventListener("squeezeend",re),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",he);for(let te=0;te<C.length;te++){let Ce=A[te];Ce!==null&&(A[te]=null,C[te].disconnect(Ce))}U=null,Q=null,m.reset();for(let te in d)delete d[te];if(e.setRenderTarget(w),u=null,f=null,p=null,r=null,x=null,ke.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(b.width,b.height,!1),B!==null){let te=B.camera;te.fov=B.fov,te.zoom=B.zoom,te.updateProjectionMatrix(),B=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){s=te,n.isPresenting===!0&&$e("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){o=te,n.isPresenting===!0&&$e("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return f!==null?f:u},this.getBinding=function(){return p===null&&y&&(p=new XRWebGLBinding(r,t)),p},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(te){if(r=te,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",re),r.addEventListener("selectstart",re),r.addEventListener("selectend",re),r.addEventListener("squeeze",re),r.addEventListener("squeezestart",re),r.addEventListener("squeezeend",re),r.addEventListener("end",$),r.addEventListener("inputsourceschange",he),v.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(b),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Le=null,Re=null;v.depth&&(Re=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=v.stencil?Si:gi,Le=v.stencil?sr:qn);let Ue={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:s};p=this.getBinding(),f=p.createProjectionLayer(Ue),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new Bt(f.textureWidth,f.textureHeight,{format:Zn,type:xn,depthTexture:new bi(f.textureWidth,f.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let pe={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,pe),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),x=new Bt(u.framebufferWidth,u.framebufferHeight,{format:Zn,type:xn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ke.setContext(r),ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function he(te){for(let Ce=0;Ce<te.removed.length;Ce++){let pe=te.removed[Ce],Le=A.indexOf(pe);Le>=0&&(A[Le]=null,C[Le].disconnect(pe))}for(let Ce=0;Ce<te.added.length;Ce++){let pe=te.added[Ce],Le=A.indexOf(pe);if(Le===-1){for(let Ue=0;Ue<C.length;Ue++)if(Ue>=A.length){A.push(pe),Le=Ue;break}else if(A[Ue]===null){A[Ue]=pe,Le=Ue;break}if(Le===-1)break}let Re=C[Le];Re&&Re.connect(pe)}}function H(te,Ce){Ce===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(Ce.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(r===null)return;let Ce=te.near,pe=te.far;m.texture!==null&&(m.depthNear>0&&(Ce=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),se.near=D.near=k.near=Ce,se.far=D.far=k.far=pe,(U!==se.near||Q!==se.far)&&(r.updateRenderState({depthNear:se.near,depthFar:se.far}),U=se.near,Q=se.far),se.layers.mask=te.layers.mask|6,k.layers.mask=se.layers.mask&-5,D.layers.mask=se.layers.mask&-3;let Le=te.parent,Re=se.cameras;H(se,Le);for(let Ue=0;Ue<Re.length;Ue++)H(Re[Ue],Le);se.projectionMatrix.copy(k.projectionMatrix),se.projectionMatrixInverse.copy(k.projectionMatrixInverse),B===null&&te.isPerspectiveCamera&&(B={camera:te,fov:te.fov,zoom:te.zoom}),ge(te,se,Le)};function ge(te,Ce,pe){pe===null?te.matrix.copy(Ce.matrixWorld):(te.matrix.copy(pe.matrixWorld),te.matrix.invert(),te.matrix.multiply(Ce.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(Ce.projectionMatrix),te.projectionMatrixInverse.copy(Ce.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Lr*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return se},this.getFoveation=function(){if(!(f===null&&u===null))return l},this.setFoveation=function(te){l=te,f!==null&&(f.fixedFoveation=te),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=te)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(se)},this.getCameraTexture=function(te){return d[te]};let K=null;function Ie(te,Ce){if(h=Ce.getViewerPose(c||a),g=Ce,h!==null){let pe=h.views;u!==null&&(e.setRenderTargetFramebuffer(x,u.framebuffer),e.setRenderTarget(x));let Le=!1;pe.length!==se.cameras.length&&(se.cameras.length=0,Le=!0);for(let Oe=0;Oe<pe.length;Oe++){let He=pe[Oe],le=null;if(u!==null)le=u.getViewport(He);else{let we=p.getViewSubImage(f,He);le=we.viewport,Oe===0&&(e.setRenderTargetTextures(x,we.colorTexture,we.depthStencilTexture),e.setRenderTarget(x))}let Z=W[Oe];Z===void 0&&(Z=new sn,Z.layers.enable(Oe),Z.viewport=new Pt,W[Oe]=Z),Z.matrix.fromArray(He.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(He.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(le.x,le.y,le.width,le.height),Oe===0&&(se.matrix.copy(Z.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale)),Le===!0&&se.cameras.push(Z)}let Re=r.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){p=n.getBinding();let Oe=p.getDepthInformation(pe[0]);Oe&&Oe.isValid&&Oe.texture&&m.init(Oe,r.renderState)}if(Re&&Re.includes("camera-access")&&y){e.state.unbindTexture(),p=n.getBinding();for(let Oe=0;Oe<pe.length;Oe++){let He=pe[Oe].camera;if(He){let le=d[He];le||(le=new Ds,d[He]=le);let Z=p.getCameraImage(He);le.sourceTexture=Z}}}}for(let pe=0;pe<C.length;pe++){let Le=A[pe],Re=C[pe];Le!==null&&Re!==void 0&&Re.update(Le,Ce,c||a)}K&&K(te,Ce),Ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Ce}),g=null}let ke=new Dp;ke.setAnimationLoop(Ie),this.setAnimationLoop=function(te){K=te},this.dispose=function(){}}},Vb=new ht,Wp=new it;Wp.set(-1,0,0,0,1,0,0,0,1);function Gb(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,ld(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,v,w,x){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?s(m,d):d.isMeshLambertMaterial?(s(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(s(m,d),p(m,d)):d.isMeshPhongMaterial?(s(m,d),h(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&u(m,d,x)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),y(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,v,w):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===mn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===mn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let v=e.get(d),w=v.envMap,x=v.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(Vb.makeRotationFromEuler(x)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Wp),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,v,w){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*v,m.scale.value=w*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function p(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function u(m,d,v){m.ior.value=d.ior,d.diffuseRoughness>0&&(m.diffuseRoughness.value=d.diffuseRoughness,d.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=d.diffuseRoughnessMap,t(d.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===mn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.retroreflectivity>0&&(m.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=d.iridescenceThicknessMaximum,d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function y(m,d){let v=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Wb(i,e,t,n){let r={},s={};function a(v,w){let x=w.program;n.uniformBlockBinding(v,x,r[v.id])}function o(v,w){let x=r[v.id];x===void 0&&(g(v),x=l(v),r[v.id]=x,v.addEventListener("dispose",m));let C=w.program;n.updateUBOMapping(v,C);let A=e.render.frame;s[v.id]!==A&&(c(v),s[v.id]=A)}function l(v){let w=i.createBuffer(),x=v.__size,C=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,x,C),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function c(v){let w=r[v.id],x=v.uniforms,C=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let A=0,b=x.length;A<b;A++){let M=x[A];if(Array.isArray(M))for(let B=0,k=M.length;B<k;B++)h(M[B],A,B,C);else h(M,A,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(v,w,x,C){if(f(v,w,x,C)===!0){let A=v.__offset,b=v.value;if(Array.isArray(b)){let M=0;for(let B=0;B<b.length;B++){let k=b[B],D=y(k,!0);p(k,v.__data,M),M+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else p(b,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,A,v.__data)}}function p(v,w,x){typeof v=="number"||typeof v=="boolean"?w[x]=v:v.isMatrix3?(w[x]=v.elements[0],w[x+1]=v.elements[1],w[x+2]=v.elements[2],w[x+3]=0,w[x+4]=v.elements[3],w[x+5]=v.elements[4],w[x+6]=v.elements[5],w[x+7]=0,w[x+8]=v.elements[6],w[x+9]=v.elements[7],w[x+10]=v.elements[8],w[x+11]=0):ArrayBuffer.isView(v)?w.set(v.subarray(0,w.length-x),x):v.toArray(w,x)}function f(v,w,x,C){let A=v.value,b=w+"_"+x;if(Array.isArray(A)){C[b]===void 0&&(C[b]=[]);let M=C[b],B=!1;for(let k=0;k<A.length;k++)u(A[k],M,k)===!0&&(B=!0);return B}return u(A,C,b)}function u(v,w,x){if(w[x]===void 0)return typeof v=="number"||typeof v=="boolean"?w[x]=v:ArrayBuffer.isView(v)?w[x]=v.slice():w[x]=v.clone(),!0;{let C=w[x];if(typeof v=="number"||typeof v=="boolean"){if(C!==v)return w[x]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(C.equals(v)===!1)return C.copy(v),!0}}return!1}function g(v){let w=v.uniforms,x=0,C=16;for(let b=0,M=w.length;b<M;b++){let B=Array.isArray(w[b])?w[b]:[w[b]];for(let k=0,D=B.length;k<D;k++){let W=B[k],se=Array.isArray(W.value)?W.value:[W.value],U=Array.isArray(w[b])||Array.isArray(W.value),Q=x;for(let $=0,he=se.length;$<he;$++){let H=se[$],ge=y(H,U),K=x%C,Ie=K%ge.boundary,ke=K+Ie;x+=Ie,ke!==0&&C-ke<ge.storage&&(x+=C-ke),$===0&&(Q=x),x+=ge.storage}let re=W.type==="int"?Int32Array:W.type==="uint"?Uint32Array:Float32Array;W.__data=new re((x-Q)/Float32Array.BYTES_PER_ELEMENT),W.__offset=Q}}let A=x%C;return A>0&&(x+=C-A),v.__size=x,v.__cache={},this}function y(v,w){let x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=16,x.storage=48):v.isMatrix4?(x.boundary=16,x.storage=64):v.isTexture?$e("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(x.boundary=16,x.storage=v.byteLength):$e("WebGLRenderer: Unsupported uniform value type.",v),w===!0&&(x.boundary=16,x.storage=Math.ceil(x.storage/16)*16),x}function m(v){let w=v.target;w.removeEventListener("dispose",m),i.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function d(){for(let v in r)i.deleteBuffer(r[v]);r={},s={}}return{bind:a,update:o,dispose:d}}var Xb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ri=null;function Yb(){return ri===null&&(ri=new Cs(Xb,16,16,Gi,$t),ri.name="DFG_LUT",ri.minFilter=pn,ri.magFilter=pn,ri.wrapS=$n,ri.wrapT=$n,ri.generateMipmaps=!1,ri.needsUpdate=!0),ri}var Ul=class{constructor(e={}){let{canvas:t=tp(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:f=!1,outputBufferType:u=xn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let y=u,m=new Set([el,Qo,$o]),d=new Set([xn,qn,Yr,sr,jo,Ko]),v=new Uint32Array(4),w=new Int32Array(4),x={textures:[],min:[],max:[],resolution:[]},C=null,A=null,b=[],M=[],B=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ii,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let k=this,D=!1,W=null,se=null,U=null,Q=null;this._outputColorSpace=hn;let re=0,$=0,he=null,H=-1,ge=null,K=new Pt,Ie=new Pt,ke=null,te=new Je(0),Ce=0,pe=t.width,Le=t.height,Re=1,Ue=null,lt=null,Oe=new Pt(0,0,pe,Le),He=new Pt(0,0,pe,Le),le=!1,Z=new Di,we=new Mo,me=!1,_e=!1,ue=new ht,Ge=new R,Fe=new Pt,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function Ke(){return he===null?Re:1}let O=n;function bt(E,z){return t.getContext(E,z)}let Qe,ct,Se,j,be,Pe,T,_,L,ce,Y,oe,F,V,q,ee,S,P,J,ve,Ee,Me,Ae;try{let E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",G,!1),O===null){let z="webgl2";if(O=bt(z,E),O===null)throw bt(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}X()}catch(E){throw t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",G,!1),et("WebGLRenderer: "+E.message),E}function X(){Qe=new ix(O),Qe.init(),Ee=new Bb(O,Qe),ct=new Y0(O,Qe,e,Ee),Se=new Fb(O,Qe),ct.reversedDepthBuffer&&f&&Se.buffers.depth.setReversed(!0),se=O.createFramebuffer(),U=O.createFramebuffer(),Q=O.createFramebuffer(),j=new ax(O),be=new Sb,Pe=new Ob(O,Qe,Se,be,ct,Ee,j),T=new nx(k),_=new lm(O),Me=new W0(O,_),L=new rx(O,_,j,Me),ce=new lx(O,L,_,Me,j),P=new ox(O,ct,Pe),q=new q0(be),Y=new wb(k,T,Qe,ct,Me,q),oe=new Gb(k,be),F=new Eb,V=new Pb(Qe),S=new G0(k,T,Se,ce,g,l),ee=new Ub(k,ce,ct),Ae=new Wb(O,j,ct,Se),J=new X0(O,Qe,j),ve=new sx(O,Qe,j),j.programs=Y.programs,k.capabilities=ct,k.extensions=Qe,k.properties=be,k.renderLists=F,k.shadowMap=ee,k.state=Se,k.info=j}y!==xn&&(B=new dx(y,t.width,t.height,o,r,s));let N=new _d(k,O);this.xr=N,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let E=Qe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Qe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Re},this.setPixelRatio=function(E){E!==void 0&&(Re=E,this.setSize(pe,Le,!1))},this.getSize=function(E){return E.set(pe,Le)},this.setSize=function(E,z,de=!0){if(N.isPresenting){$e("WebGLRenderer: Can't change size while VR device is presenting.");return}pe=E,Le=z,t.width=Math.floor(E*Re),t.height=Math.floor(z*Re),de===!0&&(t.style.width=E+"px",t.style.height=z+"px"),B!==null&&B.setSize(t.width,t.height),this.setViewport(0,0,E,z)},this.getDrawingBufferSize=function(E){return E.set(pe*Re,Le*Re).floor()},this.setDrawingBufferSize=function(E,z,de){pe=E,Le=z,Re=de,t.width=Math.floor(E*de),t.height=Math.floor(z*de),this.setViewport(0,0,E,z)},this.setEffects=function(E){if(y===xn){et("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let z=0;z<E.length;z++)if(E[z].isOutputPass===!0){$e("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}B.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(K)},this.getViewport=function(E){return E.copy(Oe)},this.setViewport=function(E,z,de,ne){E.isVector4?Oe.set(E.x,E.y,E.z,E.w):Oe.set(E,z,de,ne),Se.viewport(K.copy(Oe).multiplyScalar(Ke()).round())},this.getScissor=function(E){return E.copy(He)},this.setScissor=function(E,z,de,ne){E.isVector4?He.set(E.x,E.y,E.z,E.w):He.set(E,z,de,ne),Se.scissor(Ie.copy(He).multiplyScalar(Ke()).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(E){Se.setScissorTest(le=E)},this.setOpaqueSort=function(E){Ue=E},this.setTransparentSort=function(E){lt=E},this.getClearColor=function(E){return E.copy(S.getClearColor())},this.setClearColor=function(){S.setClearColor(...arguments)},this.getClearAlpha=function(){return S.getClearAlpha()},this.setClearAlpha=function(){S.setClearAlpha(...arguments)},this.clear=function(E=!0,z=!0,de=!0){let ne=0;if(E){let ie=!1;if(he!==null){let Ne=he.texture.format;ie=m.has(Ne)}if(ie){let Ne=he.texture.type,Ye=d.has(Ne),De=S.getClearColor(),Ve=S.getClearAlpha(),je=De.r,at=De.g,gt=De.b;Ye?(v[0]=je,v[1]=at,v[2]=gt,v[3]=Ve,O.clearBufferuiv(O.COLOR,0,v)):(w[0]=je,w[1]=at,w[2]=gt,w[3]=Ve,O.clearBufferiv(O.COLOR,0,w))}else ne|=O.COLOR_BUFFER_BIT}z&&(ne|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),de&&(ne|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&O.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),W=E},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",G,!1),S.dispose(),F.dispose(),V.dispose(),Pe.dispose(),be.dispose(),T.dispose(),ce.dispose(),L.dispose(),Me.dispose(),Ae.dispose(),Y.dispose(),N.dispose(),N.removeEventListener("sessionstart",st),N.removeEventListener("sessionend",Mt),Ct.stop()};function ae(E){E.preventDefault(),ys("WebGLRenderer: Context Lost."),D=!0}function I(){ys("WebGLRenderer: Context Restored."),D=!1;let E=j.autoReset,z=ee.enabled,de=ee.autoUpdate,ne=ee.needsUpdate,ie=ee.type;X(),j.autoReset=E,ee.enabled=z,ee.autoUpdate=de,ee.needsUpdate=ne,ee.type=ie}function G(E){et("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function xe(E){let z=E.target;z.removeEventListener("dispose",xe),fe(z)}function fe(E){We(E),be.remove(E)}function We(E){let z=be.get(E).programs;z!==void 0&&(z.forEach(function(de){Y.releaseProgram(de)}),E.isShaderMaterial&&Y.releaseShaderCache(E))}this.renderBufferDirect=function(E,z,de,ne,ie,Ne){z===null&&(z=nt);let Ye=ie.isMesh&&ie.matrixWorld.determinantAffine()<0,De=cr(E,z,de,ne,ie);Se.setMaterial(ne,Ye);let Ve=de.index,je=1;if(ne.wireframe===!0){if(Ve=L.getWireframeAttribute(de),Ve===void 0)return;je=2}let at=de.drawRange,gt=de.attributes.position,qe=at.start*je,xt=(at.start+at.count)*je;Ne!==null&&(qe=Math.max(qe,Ne.start*je),xt=Math.min(xt,(Ne.start+Ne.count)*je)),Ve!==null?(qe=Math.max(qe,0),xt=Math.min(xt,Ve.count)):gt!=null&&(qe=Math.max(qe,0),xt=Math.min(xt,gt.count));let Ft=xt-qe;if(Ft<0||Ft===1/0)return;Me.setup(ie,ne,De,de,Ve);let Tt,Et=J;if(Ve!==null&&(Tt=_.get(Ve),Et=ve,Et.setIndex(Tt)),ie.isMesh)ne.wireframe===!0?(Se.setLineWidth(ne.wireframeLinewidth*Ke()),Et.setMode(O.LINES)):Et.setMode(O.TRIANGLES);else if(ie.isLine){let en=ne.linewidth;en===void 0&&(en=1),Se.setLineWidth(en*Ke()),ie.isLineSegments?Et.setMode(O.LINES):ie.isLineLoop?Et.setMode(O.LINE_LOOP):Et.setMode(O.LINE_STRIP)}else ie.isPoints?Et.setMode(O.POINTS):ie.isSprite&&Et.setMode(O.TRIANGLES);if(ie.isBatchedMesh)if(Qe.get("WEBGL_multi_draw"))Et.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{let en=ie._multiDrawStarts,Ze=ie._multiDrawCounts,cn=ie._multiDrawCount,wt=Ve?_.get(Ve).bytesPerElement:1,Xi=be.get(ne).currentProgram.getUniforms();for(let tn=0;tn<cn;tn++)Xi.setValue(O,"_gl_DrawID",tn),Et.render(en[tn]/wt,Ze[tn])}else if(ie.isInstancedMesh)Et.renderInstances(qe,Ft,ie.count);else if(de.isInstancedBufferGeometry){let en=de._maxInstanceCount!==void 0?de._maxInstanceCount:1/0,Ze=Math.min(de.instanceCount,en);Et.renderInstances(qe,Ft,Ze)}else Et.render(qe,Ft)};function Xe(E,z,de,ne){W!==null&&E.isNodeMaterial&&W.setObject(ne,E),me===!0&&q.setState(E,de,!1),E.transparent===!0&&E.side===gn&&E.forceSinglePass===!1?(E.side=mn,E.needsUpdate=!0,ln(E,z,ne),E.side=Vi,E.needsUpdate=!0,ln(E,z,ne),E.side=gn):ln(E,z,ne)}this.compile=function(E,z,de=null){de===null&&(de=E),W!==null&&W.renderStart(E,z,de),A=V.get(de),A.init(z),M.push(A),de.traverseVisible(function(ie){ie.isLight&&ie.layers.test(z.layers)&&(A.pushLight(ie),ie.castShadow&&A.pushShadow(ie))}),E!==de&&E.traverseVisible(function(ie){ie.isLight&&ie.layers.test(z.layers)&&(A.pushLight(ie),ie.castShadow&&A.pushShadow(ie))}),A.setupLights(),W!==null&&W.updateLights(A.state.lightsArray),_e=this.localClippingEnabled,me=q.init(this.clippingPlanes,_e),me===!0&&q.setGlobalState(this.clippingPlanes,z),W!==null&&ee.render(A.state.shadowsArray,de,z);let ne=new Set;return E.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;let Ne=ie.material;if(Ne)if(Array.isArray(Ne))for(let Ye=0;Ye<Ne.length;Ye++){let De=Ne[Ye];Xe(De,de,z,ie),ne.add(De)}else Xe(Ne,de,z,ie),ne.add(Ne)}),A=M.pop(),W!==null&&W.renderEnd(),ne},this.compileAsync=function(E,z,de=null){let ne=this.compile(E,z,de);return new Promise(ie=>{function Ne(){if(ne.forEach(function(Ye){let Ve=be.get(Ye).currentProgram;(Ve===void 0||Ve.isReady())&&ne.delete(Ye)}),ne.size===0){ie(E);return}setTimeout(Ne,10)}Qe.get("KHR_parallel_shader_compile")!==null?Ne():setTimeout(Ne,10)})};let Be=null;function ut(E){Be&&Be(E)}function st(){Ct.stop()}function Mt(){Ct.start()}let Ct=new Dp;Ct.setAnimationLoop(ut),typeof self<"u"&&Ct.setContext(self),this.setAnimationLoop=function(E){Be=E,N.setAnimationLoop(E),E===null?Ct.stop():Ct.start()},N.addEventListener("sessionstart",st),N.addEventListener("sessionend",Mt),this.render=function(E,z){if(z!==void 0&&z.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;W!==null&&W.renderStart(E,z);let de=N.enabled===!0&&N.isPresenting===!0,ne=B!==null&&(he===null||de)&&B.begin(k,he);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),N.enabled===!0&&N.isPresenting===!0&&(B===null||B.isCompositing()===!1)&&(N.cameraAutoUpdate===!0&&N.updateCamera(z),z=N.getCamera()),E.isScene===!0&&E.onBeforeRender(k,E,z,he),A=V.get(E,M.length),A.init(z),A.state.textureUnits=Pe.getTextureUnits(),M.push(A),ue.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),z.isArrayCamera?we.setFromArrayCamera(z):Z.setFromProjectionMatrix(ue,kn,z.reversedDepth),_e=this.localClippingEnabled,me=q.init(this.clippingPlanes,_e),C=F.get(E,b.length),C.init(),b.push(C),this.info.render.frame++,N.enabled===!0&&N.isPresenting===!0){let Ye=k.xr.getDepthSensingMesh();Ye!==null&&It(Ye,z,-1/0,k.sortObjects)}It(E,z,0,k.sortObjects),C.finish(),W!==null&&W.updateLights(A.state.lightsArray),k.sortObjects===!0&&C.sort(Ue,lt),Te=N.enabled===!1||N.isPresenting===!1||N.hasDepthSensing()===!1,Te&&S.addToRenderList(C,E),this.info.autoReset===!0&&this.info.reset(),me===!0&&q.beginShadows();let ie=A.state.shadowsArray;if(ee.render(ie,E,z),me===!0&&q.endShadows(),(ne&&B.hasRenderPass())===!1){let Ye=C.opaque,De=C.transmissive;if(A.setupLights(),z.isArrayCamera){let Ve=z.cameras;if(De.length>0)for(let je=0,at=Ve.length;je<at;je++){let gt=Ve[je];Ut(Ye,De,E,gt)}Te&&S.render(E);for(let je=0,at=Ve.length;je<at;je++){let gt=Ve[je];Wt(C,E,gt,gt.viewport)}}else De.length>0&&Ut(Ye,De,E,z),Te&&S.render(E),Wt(C,E,z)}he!==null&&$===0&&(Pe.updateMultisampleRenderTarget(he),Pe.updateRenderTargetMipmap(he)),ne&&B.end(k),E.isScene===!0&&E.onAfterRender(k,E,z),Me.resetDefaultState(),H=-1,ge=null,M.pop(),M.length>0?(A=M[M.length-1],Pe.setTextureUnits(A.state.textureUnits),me===!0&&q.setGlobalState(k.clippingPlanes,A.state.camera)):A=null,b.pop(),b.length>0?C=b[b.length-1]:C=null,W!==null&&W.renderEnd()};function It(E,z,de,ne){if(E.visible===!1)return;if(E.layers.test(z.layers)){if(E.isGroup)de=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(z);else if(E.isLight)A.pushLight(E),E.castShadow&&A.pushShadow(E);else if(E.isSprite){let Ye=z.isArrayCamera?we:Z;if(!E.frustumCulled||E.intersectsFrustum(Ye)){ne&&Fe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ue);let De=ce.update(E),Ve=E.material;Ve.visible&&C.push(E,De,Ve,de,Fe.z,null,z)}}else if(E.isMesh||E.isLine||E.isPoints){let Ye=z.isArrayCamera?we:Z;if(!E.frustumCulled||E.intersectsFrustum(Ye)){let De=ce.update(E),Ve=E.material;if(ne&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Fe.copy(E.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),Fe.copy(De.boundingSphere.center)),Fe.applyMatrix4(E.matrixWorld).applyMatrix4(ue)),Array.isArray(Ve)){let je=De.groups;for(let at=0,gt=je.length;at<gt;at++){let qe=je[at],xt=Ve[qe.materialIndex];xt&&xt.visible&&C.push(E,De,xt,de,Fe.z,qe,z)}}else Ve.visible&&C.push(E,De,Ve,de,Fe.z,null,z)}}}let Ne=E.children;for(let Ye=0,De=Ne.length;Ye<De;Ye++)It(Ne[Ye],z,de,ne)}function Wt(E,z,de,ne){let{opaque:ie,transmissive:Ne,transparent:Ye}=E;A.setupLightsView(de),me===!0&&q.setGlobalState(k.clippingPlanes,de),ne&&Se.viewport(K.copy(ne)),ie.length>0&&Qt(ie,z,de),Ne.length>0&&Qt(Ne,z,de),Ye.length>0&&Qt(Ye,z,de),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function Ut(E,z,de,ne){if((de.isScene===!0?de.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[ne.id]===void 0){let qe=Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[ne.id]=new Bt(1,1,{generateMipmaps:!0,type:qe?$t:xn,minFilter:wi,samples:Math.max(4,ct.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ft.workingColorSpace})}let Ne=A.state.transmissionRenderTarget[ne.id],Ye=ne.viewport||K;Ne.setSize(Ye.z*k.transmissionResolutionScale,Ye.w*k.transmissionResolutionScale);let De=k.getRenderTarget(),Ve=k.getActiveCubeFace(),je=k.getActiveMipmapLevel();k.setRenderTarget(Ne),k.getClearColor(te),Ce=k.getClearAlpha(),Ce<1&&k.setClearColor(16777215,.5),k.clear(),Te&&S.render(de);let at=k.toneMapping;k.toneMapping=ii;let gt=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),A.setupLightsView(ne),me===!0&&q.setGlobalState(k.clippingPlanes,ne),Qt(E,de,ne),Pe.updateMultisampleRenderTarget(Ne),Pe.updateRenderTargetMipmap(Ne),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let xt=0,Ft=z.length;xt<Ft;xt++){let Tt=z[xt],{object:Et,geometry:en,material:Ze,group:cn}=Tt;if(Ze.side===gn&&Et.layers.test(ne.layers)){let wt=Ze.side;Ze.side=mn,Ze.needsUpdate=!0,li(Et,de,ne,en,Ze,cn),Ze.side=wt,Ze.needsUpdate=!0,qe=!0}}qe===!0&&(Pe.updateMultisampleRenderTarget(Ne),Pe.updateRenderTargetMipmap(Ne))}k.setRenderTarget(De,Ve,je),k.setClearColor(te,Ce),gt!==void 0&&(ne.viewport=gt),k.toneMapping=at}function Qt(E,z,de){let ne=z.isScene===!0?z.overrideMaterial:null;for(let ie=0,Ne=E.length;ie<Ne;ie++){let Ye=E[ie],{object:De,geometry:Ve,group:je}=Ye,at=Ye.material;at.allowOverride===!0&&ne!==null&&(at=ne),De.layers.test(de.layers)&&li(De,z,de,Ve,at,je)}}function li(E,z,de,ne,ie,Ne){W!==null&&ie.isNodeMaterial&&W.setObject(E,ie),E.onBeforeRender(k,z,de,ne,ie,Ne),E.modelViewMatrix.multiplyMatrices(de.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),ie.onBeforeRender(k,z,de,ne,E,Ne),ie.transparent===!0&&ie.side===gn&&ie.forceSinglePass===!1?(ie.side=mn,ie.needsUpdate=!0,k.renderBufferDirect(de,z,ne,ie,E,Ne),ie.side=Vi,ie.needsUpdate=!0,k.renderBufferDirect(de,z,ne,ie,E,Ne),ie.side=gn):k.renderBufferDirect(de,z,ne,ie,E,Ne),E.onAfterRender(k,z,de,ne,ie,Ne)}function In(E){let z=0;for(let de of E)de.texture!==null&&z++;return z}function ln(E,z,de){z.isScene!==!0&&(z=nt);let ne=be.get(E),ie=A.state.lights,Ne=A.state.shadowsArray,Ye=ie.state.version,De=Y.getParameters(E,ie.state,Ne,z,de,A.state.lightProbeGridArray),Ve=Y.getProgramCacheKey(De),je=ne.programs;ne.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?z.environment:null,ne.fog=z.fog;let at=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;ne.envMap=T.get(E.envMap||ne.environment,at),ne.envMapRotation=ne.environment!==null&&E.envMap===null?z.environmentRotation:E.envMapRotation,je===void 0&&(E.addEventListener("dispose",xe),je=new Map,ne.programs=je,ne.programVariants=new Map);let gt=je.get(Ve);if(gt!==void 0){if(ne.currentProgram===gt&&ne.lightsStateVersion===Ye)return Xt(E,De),gt}else De.uniforms=Y.getUniforms(E),W!==null&&E.isNodeMaterial&&W.build(E,de,De),E.onBeforeCompile(De,k),gt=Y.acquireProgram(De,Ve),je.set(Ve,gt),ne.uniforms=De.uniforms;let qe=ne.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(qe.clippingPlanes=q.uniform),Xt(E,De),ne.needsLights=Nu(E),ne.lightsStateVersion=Ye,ne.needsLights&&(qe.ambientLightColor.value=ie.state.ambient,qe.lightProbe.value=ie.state.probe,qe.sunLights.value=ie.state.sun,qe.sunLightShadows.value=ie.state.sunShadow,qe.directionalLights.value=ie.state.directional,qe.directionalLightShadows.value=ie.state.directionalShadow,qe.spotLights.value=ie.state.spot,qe.spotLightShadows.value=ie.state.spotShadow,qe.rectAreaLights.value=ie.state.rectArea,qe.ltc_1.value=ie.state.rectAreaLTC1,qe.ltc_2.value=ie.state.rectAreaLTC2,qe.pointLights.value=ie.state.point,qe.pointLightShadows.value=ie.state.pointShadow,qe.hemisphereLights.value=ie.state.hemi,qe.sunShadowMatrix.value=ie.state.sunShadowMatrix,qe.sunShadowCascade.value=ie.state.sunShadowCascade,qe.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,qe.spotLightMatrix.value=ie.state.spotLightMatrix,qe.spotLightMap.value=ie.state.spotLightMap,qe.pointShadowMatrix.value=ie.state.pointShadowMatrix),ne.numLightProbeGrids=In(A.state.lightProbeGridArray),ne.currentProgram=gt,ne.uniformsList=null,gt}function jn(E,z,de,ne,ie){let Ne=be.get(E),Ye=Ne.currentProgram.id+","+ne+","+ie,De=Ne.programVariants.get(Ye);return De===void 0?(De=ln(E,z,de),Ne.programVariants.set(Ye,De)):(Ne.currentProgram=De,Ne.uniformsList=null,Ne.outputColorSpace=ne,Ne.toneMapping=ie),De}function rt(E){if(E.uniformsList===null){let z=E.currentProgram.getUniforms();E.uniformsList=qr.seqWithValue(z.seq,E.uniforms)}return E.uniformsList}function Xt(E,z){let de=be.get(E);de.outputColorSpace=z.outputColorSpace,de.batching=z.batching,de.batchingColor=z.batchingColor,de.instancing=z.instancing,de.instancingColor=z.instancingColor,de.instancingMorph=z.instancingMorph,de.skinning=z.skinning,de.morphTargets=z.morphTargets,de.morphNormals=z.morphNormals,de.morphColors=z.morphColors,de.morphTargetsCount=z.morphTargetsCount,de.numClippingPlanes=z.numClippingPlanes,de.numIntersection=z.numClipIntersection,de.vertexAlphas=z.vertexAlphas,de.vertexTangents=z.vertexTangents,de.toneMapping=z.toneMapping}function cr(E,z,de,ne,ie){z.isScene!==!0&&(z=nt),Pe.resetTextureUnits();let Ne=z.fog,Ye=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial?z.environment:null,De=he===null?k.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:ft.workingColorSpace,Ve=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial&&!ne.envMap||ne.isMeshPhongMaterial&&!ne.envMap,je=T.get(ne.envMap||Ye,Ve),at=ne.vertexColors===!0&&!!de.attributes.color&&de.attributes.color.itemSize===4,gt=!!de.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),qe=!!de.morphAttributes.position,xt=!!de.morphAttributes.normal,Ft=!!de.morphAttributes.color,Tt=ii;ne.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(Tt=k.toneMapping);let Et=de.morphAttributes.position||de.morphAttributes.normal||de.morphAttributes.color,en=Et!==void 0?Et.length:0,Ze=be.get(ne),cn=A.state.lights;if(me===!0&&(_e===!0||E!==ge)){let Lt=E===ge&&ne.id===H;q.setState(ne,E,Lt)}let wt=!1,Xi=!1;ne.version===Ze.__version?Ze.needsLights&&Ze.lightsStateVersion!==cn.state.version||ie.isBatchedMesh&&Ze.batching===!1||!ie.isBatchedMesh&&Ze.batching===!0||ie.isBatchedMesh&&Ze.batchingColor===!0&&ie._colorsTexture===null||ie.isBatchedMesh&&Ze.batchingColor===!1&&ie._colorsTexture!==null||ie.isInstancedMesh&&Ze.instancing===!1||!ie.isInstancedMesh&&Ze.instancing===!0||ie.isSkinnedMesh&&Ze.skinning===!1||!ie.isSkinnedMesh&&Ze.skinning===!0||ie.isInstancedMesh&&Ze.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&Ze.instancingColor===!1&&ie.instanceColor!==null||ie.isInstancedMesh&&Ze.instancingMorph===!0&&ie.morphTexture===null||ie.isInstancedMesh&&Ze.instancingMorph===!1&&ie.morphTexture!==null||Ze.envMap!==je||ne.fog===!0&&Ze.fog!==Ne||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==q.numPlanes||Ze.numIntersection!==q.numIntersection)||Ze.vertexAlphas!==at||Ze.vertexTangents!==gt||Ze.morphTargets!==qe||Ze.morphNormals!==xt||Ze.morphColors!==Ft||Ze.morphTargetsCount!==en||Ze.numLightProbeGrids!==In(A.state.lightProbeGridArray)?wt=!0:(Ze.outputColorSpace!==De||Ze.toneMapping!==Tt)&&(Xi=!0):(wt=!0,Ze.__version=ne.version);let tn=Ze.currentProgram;(wt===!0||Xi===!0)&&(tn=Xi===!0?jn(ne,z,ie,De,Tt):ln(ne,z,ie),W&&ne.isNodeMaterial&&W.onUpdateProgram(ne,tn,Ze));let Ta=!1,Ai=!1,Yi=!1,vt=tn.getUniforms(),Kt=Ze.uniforms;if(Se.useProgram(tn.program)&&(Ta=!0,Ai=!0,Yi=!0),ne.id!==H&&(H=ne.id,Ai=!0),Ta||ge!==E){Se.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),vt.setValue(O,"projectionMatrix",E.projectionMatrix),vt.setValue(O,"viewMatrix",E.matrixWorldInverse);let Yt=vt.map.cameraPosition;Yt!==void 0&&Yt.setValue(O,Ge.setFromMatrixPosition(E.matrixWorld)),ct.logarithmicDepthBuffer&&vt.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&vt.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),ge!==E&&(ge=E,Ai=!0,Yi=!0)}if(Ze.needsLights&&(cn.state.sunShadowMap.length>0&&vt.setValue(O,"sunShadowMap",cn.state.sunShadowMap,Pe),cn.state.directionalShadowMap.length>0&&vt.setValue(O,"directionalShadowMap",cn.state.directionalShadowMap,Pe),cn.state.spotShadowMap.length>0&&vt.setValue(O,"spotShadowMap",cn.state.spotShadowMap,Pe),cn.state.pointShadowMap.length>0&&vt.setValue(O,"pointShadowMap",cn.state.pointShadowMap,Pe)),ie.isSkinnedMesh){vt.setOptional(O,ie,"bindMatrix"),vt.setOptional(O,ie,"bindMatrixInverse");let Lt=ie.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),vt.setValue(O,"boneTexture",Lt.boneTexture,Pe))}ie.isBatchedMesh&&(vt.setOptional(O,ie,"batchingTexture"),vt.setValue(O,"batchingTexture",ie._matricesTexture,Pe),vt.setOptional(O,ie,"batchingIdTexture"),vt.setValue(O,"batchingIdTexture",ie._indirectTexture,Pe),vt.setOptional(O,ie,"batchingColorTexture"),ie._colorsTexture!==null&&vt.setValue(O,"batchingColorTexture",ie._colorsTexture,Pe));let On=de.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&P.update(ie,de,tn),(Ai||Ze.receiveShadow!==ie.receiveShadow)&&(Ze.receiveShadow=ie.receiveShadow,vt.setValue(O,"receiveShadow",ie.receiveShadow)),(ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial)&&ne.envMap===null&&z.environment!==null&&(Kt.envMapIntensity.value=z.environmentIntensity),Kt.dfgLUT!==void 0&&(Kt.dfgLUT.value=Yb()),Ai){if(vt.setValue(O,"toneMappingExposure",k.toneMappingExposure),Ze.needsLights&&Du(Kt,Yi),Ne&&ne.fog===!0&&oe.refreshFogUniforms(Kt,Ne),oe.refreshMaterialUniforms(Kt,ne,Re,Le,A.state.transmissionRenderTarget[E.id]),Ze.needsLights&&Ze.numLightProbeGrids>0){let Lt=x,Yt=0;for(let ci of A.state.lightProbeGridArray)ci.texture!==null&&(Lt.textures[Yt]=ci.texture,Lt.min[Yt]=ci.boundingBox.min,Lt.max[Yt]=ci.boundingBox.max,Lt.resolution[Yt]=ci.resolution,Yt++);for(let ci in Lt)Lt[ci].length=Yt;Kt.probesSH.value=Lt.textures,Kt.probesMin.value=Lt.min,Kt.probesMax.value=Lt.max,Kt.probesResolution.value=Lt.resolution}qr.upload(O,rt(Ze),Kt,Pe)}if(ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(qr.upload(O,rt(Ze),Kt,Pe),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&vt.setValue(O,"center",ie.center),vt.setValue(O,"modelViewMatrix",ie.modelViewMatrix),vt.setValue(O,"normalMatrix",ie.normalMatrix),vt.setValue(O,"modelMatrix",ie.matrixWorld),ne.uniformsGroups!==void 0){let Lt=ne.uniformsGroups;for(let Yt=0,ci=Lt.length;Yt<ci;Yt++){let Ld=Lt[Yt];Ae.update(Ld,tn),Ae.bind(Ld,tn)}}return tn}function Du(E,z){E.ambientLightColor.needsUpdate=z,E.lightProbe.needsUpdate=z,E.sunLights.needsUpdate=z,E.sunLightShadows.needsUpdate=z,E.directionalLights.needsUpdate=z,E.directionalLightShadows.needsUpdate=z,E.pointLights.needsUpdate=z,E.pointLightShadows.needsUpdate=z,E.spotLights.needsUpdate=z,E.spotLightShadows.needsUpdate=z,E.rectAreaLights.needsUpdate=z,E.hemisphereLights.needsUpdate=z}function Nu(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return re},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return he},this.setRenderTargetTextures=function(E,z,de){let ne=be.get(E);ne.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),be.get(E.texture).__webglTexture=z,be.get(E.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:de,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,z){let de=be.get(E);de.__webglFramebuffer=z,de.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(E,z=0,de=0){he=E,re=z,$=de;let ne=null,ie=!1,Ne=!1;if(E){let De=be.get(E);if(De.__useDefaultFramebuffer!==void 0){Se.bindFramebuffer(O.FRAMEBUFFER,De.__webglFramebuffer),K.copy(E.viewport),Ie.copy(E.scissor),ke=E.scissorTest,Se.viewport(K),Se.scissor(Ie),Se.setScissorTest(ke),H=-1;return}else if(De.__webglFramebuffer===void 0)Pe.setupRenderTarget(E);else if(De.__hasExternalTextures)Pe.rebindTextures(E,be.get(E.texture).__webglTexture,be.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let at=E.depthTexture;if(De.__boundDepthTexture!==at){if(at!==null&&be.has(at)&&(E.width!==at.image.width||E.height!==at.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Pe.setupDepthRenderbuffer(E)}}let Ve=E.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(Ne=!0);let je=be.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(je[z])?ne=je[z][de]:ne=je[z],ie=!0):E.samples>0&&Pe.useMultisampledRTT(E)===!1?ne=be.get(E).__webglMultisampledFramebuffer:Array.isArray(je)?ne=je[de]:ne=je,K.copy(E.viewport),Ie.copy(E.scissor),ke=E.scissorTest}else K.copy(Oe).multiplyScalar(Re).floor(),Ie.copy(He).multiplyScalar(Re).floor(),ke=le;if(de!==0&&(ne=se),Se.bindFramebuffer(O.FRAMEBUFFER,ne)&&Se.drawBuffers(E,ne),Se.viewport(K),Se.scissor(Ie),Se.setScissorTest(ke),ie){let De=be.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+z,De.__webglTexture,de)}else if(Ne){let De=z;for(let Ve=0;Ve<E.textures.length;Ve++){let je=be.get(E.textures[Ve]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ve,je.__webglTexture,de,De)}}else if(E!==null&&de!==0){let De=be.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,De.__webglTexture,de)}H=-1};function kd(E){let z=be.get(E);return(z.__readFormat!==E.format||z.__readType!==E.type)&&(z.__readFormat=E.format,z.__readType=E.type,z.__formatReadable=ct.textureFormatReadable(E.format),z.__typeReadable=ct.textureTypeReadable(E.type)),z}this.readRenderTargetPixels=function(E,z,de,ne,ie,Ne,Ye,De=0){if(!(E&&E.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=be.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ye!==void 0&&(Ve=Ve[Ye],Array.isArray(Ve)&&(Ve=Ve[0])),Ve){Se.bindFramebuffer(O.FRAMEBUFFER,Ve);try{let je=E.textures[De],at=je.format,gt=je.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+De);let qe=kd(je);if(qe.__formatReadable===!1){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(qe.__typeReadable===!1){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=E.width-ne&&de>=0&&de<=E.height-ie&&O.readPixels(z,de,ne,ie,Ee.convert(at),Ee.convert(gt),Ne)}finally{let je=he!==null?be.get(he).__webglFramebuffer:null;Se.bindFramebuffer(O.FRAMEBUFFER,je)}}},this.readRenderTargetPixelsAsync=async function(E,z,de,ne,ie,Ne,Ye,De=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=be.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ye!==void 0&&(Ve=Ve[Ye],Array.isArray(Ve)&&(Ve=Ve[0])),Ve)if(z>=0&&z<=E.width-ne&&de>=0&&de<=E.height-ie){Se.bindFramebuffer(O.FRAMEBUFFER,Ve);let je=E.textures[De],at=je.format,gt=je.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+De);let qe=kd(je);if(qe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(qe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,xt),O.bufferData(O.PIXEL_PACK_BUFFER,Ne.byteLength,O.STREAM_READ),O.readPixels(z,de,ne,ie,Ee.convert(at),Ee.convert(gt),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let Ft=he!==null?be.get(he).__webglFramebuffer:null;Se.bindFramebuffer(O.FRAMEBUFFER,Ft);let Tt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await ip(O,Tt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,xt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Ne),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(xt),O.deleteSync(Tt),Ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,z=null,de=0){let ne=Math.pow(2,-de),ie=Math.floor(E.image.width*ne),Ne=Math.floor(E.image.height*ne),Ye=z!==null?z.x:0,De=z!==null?z.y:0;Pe.setTexture2D(E,0),O.copyTexSubImage2D(O.TEXTURE_2D,de,0,0,Ye,De,ie,Ne),Se.unbindTexture()},this.copyTextureToTexture=function(E,z,de=null,ne=null,ie=0,Ne=0){let Ye,De,Ve,je,at,gt,qe,xt,Ft,Tt=E.isCompressedTexture?E.mipmaps[Ne]:E.image;if(de!==null)Ye=de.max.x-de.min.x,De=de.max.y-de.min.y,Ve=de.isBox3?de.max.z-de.min.z:1,je=de.min.x,at=de.min.y,gt=de.isBox3?de.min.z:0;else{let vt=Math.pow(2,-ie);Ye=Math.floor(Tt.width*vt),De=Math.floor(Tt.height*vt),E.isDataArrayTexture?Ve=Tt.depth:E.isData3DTexture?Ve=Math.floor(Tt.depth*vt):Ve=1,je=0,at=0,gt=0}ne!==null?(qe=ne.x,xt=ne.y,Ft=ne.z):(qe=0,xt=0,Ft=0);let Et=Ee.convert(z.format),en=Ee.convert(z.type),Ze;z.isData3DTexture?(Pe.setTexture3D(z,0),Ze=O.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Pe.setTexture2DArray(z,0),Ze=O.TEXTURE_2D_ARRAY):(Pe.setTexture2D(z,0),Ze=O.TEXTURE_2D),Se.activeTexture(O.TEXTURE0),Se.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,z.flipY),Se.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),Se.pixelStorei(O.UNPACK_ALIGNMENT,z.unpackAlignment);let cn=Se.getParameter(O.UNPACK_ROW_LENGTH),wt=Se.getParameter(O.UNPACK_IMAGE_HEIGHT),Xi=Se.getParameter(O.UNPACK_SKIP_PIXELS),tn=Se.getParameter(O.UNPACK_SKIP_ROWS),Ta=Se.getParameter(O.UNPACK_SKIP_IMAGES);Se.pixelStorei(O.UNPACK_ROW_LENGTH,Tt.width),Se.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Tt.height),Se.pixelStorei(O.UNPACK_SKIP_PIXELS,je),Se.pixelStorei(O.UNPACK_SKIP_ROWS,at),Se.pixelStorei(O.UNPACK_SKIP_IMAGES,gt);let Ai=E.isDataArrayTexture||E.isData3DTexture,Yi=z.isDataArrayTexture||z.isData3DTexture;if(E.isDepthTexture){let vt=be.get(E),Kt=be.get(z),On=be.get(vt.__renderTarget),Lt=be.get(Kt.__renderTarget);Se.bindFramebuffer(O.READ_FRAMEBUFFER,On.__webglFramebuffer),Se.bindFramebuffer(O.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Yt=0;Yt<Ve;Yt++)Ai&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,be.get(E).__webglTexture,ie,gt+Yt),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,be.get(z).__webglTexture,Ne,Ft+Yt)),O.blitFramebuffer(je,at,je+Ye,at+De,qe,xt,qe+Ye,xt+De,O.DEPTH_BUFFER_BIT,O.NEAREST);Se.bindFramebuffer(O.READ_FRAMEBUFFER,null),Se.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(ie!==0||E.isRenderTargetTexture||be.has(E)){let vt=be.get(E),Kt=be.get(z);Se.bindFramebuffer(O.READ_FRAMEBUFFER,U),Se.bindFramebuffer(O.DRAW_FRAMEBUFFER,Q);for(let On=0;On<Ve;On++)Ai?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,vt.__webglTexture,ie,gt+On):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,vt.__webglTexture,ie),Yi?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Kt.__webglTexture,Ne,Ft+On):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Kt.__webglTexture,Ne),ie!==0?O.blitFramebuffer(je,at,je+Ye,at+De,qe,xt,qe+Ye,xt+De,O.COLOR_BUFFER_BIT,O.NEAREST):Yi?O.copyTexSubImage3D(Ze,Ne,qe,xt,Ft+On,je,at,Ye,De):O.copyTexSubImage2D(Ze,Ne,qe,xt,je,at,Ye,De);Se.bindFramebuffer(O.READ_FRAMEBUFFER,null),Se.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Yi?E.isDataTexture||E.isData3DTexture?O.texSubImage3D(Ze,Ne,qe,xt,Ft,Ye,De,Ve,Et,en,Tt.data):z.isCompressedArrayTexture?O.compressedTexSubImage3D(Ze,Ne,qe,xt,Ft,Ye,De,Ve,Et,Tt.data):O.texSubImage3D(Ze,Ne,qe,xt,Ft,Ye,De,Ve,Et,en,Tt):E.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Ne,qe,xt,Ye,De,Et,en,Tt.data):E.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Ne,qe,xt,Tt.width,Tt.height,Et,Tt.data):O.texSubImage2D(O.TEXTURE_2D,Ne,qe,xt,Ye,De,Et,en,Tt);Se.pixelStorei(O.UNPACK_ROW_LENGTH,cn),Se.pixelStorei(O.UNPACK_IMAGE_HEIGHT,wt),Se.pixelStorei(O.UNPACK_SKIP_PIXELS,Xi),Se.pixelStorei(O.UNPACK_SKIP_ROWS,tn),Se.pixelStorei(O.UNPACK_SKIP_IMAGES,Ta),Ne===0&&z.generateMipmaps===!0&&z.mipmapsAutoUpdate===!0&&O.generateMipmap(Ze),Se.unbindTexture()},this.initRenderTarget=function(E){be.get(E).__webglFramebuffer===void 0&&Pe.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Pe.setTextureCube(E,0):E.isData3DTexture?Pe.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Pe.setTexture2DArray(E,0):Pe.setTexture2D(E,0),Se.unbindTexture()},this.resetState=function(){re=0,$=0,he=null,Se.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ft._getDrawingBufferColorSpace(e),t.unpackColorSpace=ft._getUnpackColorSpace()}};var Xp={type:"change"},Sd={type:"start"},qp={type:"end"},zl=new Li,Yp=new wn,qb=Math.cos(70*Un.DEG2RAD),Gt=new R,bn=2*Math.PI,St={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},wd=1e-6,Hl=class extends Qs{constructor(e,t=null){super(e,t),this.state=St.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:zi.ROTATE,MIDDLE:zi.DOLLY,RIGHT:zi.PAN},this.touches={ONE:Hi.ROTATE,TWO:Hi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new un,this._lastTargetPosition=new R,this._quat=new un().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Vr,this._sphericalDelta=new Vr,this._scale=1,this._panOffset=new R,this._rotateStart=new ye,this._rotateEnd=new ye,this._rotateDelta=new ye,this._panStart=new ye,this._panEnd=new ye,this._panDelta=new ye,this._dollyStart=new ye,this._dollyEnd=new ye,this._dollyDelta=new ye,this._dollyDirection=new R,this._mouse=new ye,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=jb.bind(this),this._onPointerDown=Zb.bind(this),this._onPointerUp=Kb.bind(this),this._onContextMenu=iv.bind(this),this._onMouseWheel=Qb.bind(this),this._onKeyDown=ev.bind(this),this._onTouchStart=tv.bind(this),this._onTouchMove=nv.bind(this),this._onMouseDown=Jb.bind(this),this._onMouseMove=$b.bind(this),this._interceptControlDown=rv.bind(this),this._interceptControlUp=sv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=St.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Xp),this.update(),this.state=St.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Gt.copy(t).sub(this.target),Gt.applyQuaternion(this._quat),this._spherical.setFromVector3(Gt),this.autoRotate&&this.state===St.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=bn:n>Math.PI&&(n-=bn),r<-Math.PI?r+=bn:r>Math.PI&&(r-=bn),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(Gt.setFromSpherical(this._spherical),Gt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Gt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Gt.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){let o=new R(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;let c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Gt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(zl.origin.copy(this.object.position),zl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(zl.direction))<qb?this.object.lookAt(this.target):(Yp.setFromNormalAndCoplanarPoint(this.object.up,this.target),zl.intersectPlane(Yp,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>wd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>wd||this._lastTargetPosition.distanceToSquared(this.target)>wd?(this.dispatchEvent(Xp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?bn/60*this.autoRotateSpeed*e:bn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Gt.setFromMatrixColumn(t,0),Gt.multiplyScalar(-e),this._panOffset.add(Gt)}_panUp(e,t){this.screenSpacePanning===!0?Gt.setFromMatrixColumn(t,1):(Gt.setFromMatrixColumn(t,0),Gt.crossVectors(this.object.up,Gt)),Gt.multiplyScalar(e),this._panOffset.add(Gt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Gt.copy(r).sub(this.target);let s=Gt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*t*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,s=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ye,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Zb(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function jb(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Kb(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(qp),this.state=St.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Jb(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case zi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=St.DOLLY;break;case zi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=St.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=St.ROTATE}break;case zi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=St.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=St.PAN}break;default:this.state=St.NONE}this.state!==St.NONE&&this.dispatchEvent(Sd)}function $b(i){switch(this.state){case St.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case St.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case St.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Qb(i){this.enabled===!1||this.enableZoom===!1||this.state!==St.NONE||(i.preventDefault(),this.dispatchEvent(Sd),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(qp))}function ev(i){this.enabled!==!1&&this._handleKeyDown(i)}function tv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Hi.ROTATE:if(this.enableRotate===!1){this.state=St.NONE;break}this._handleTouchStartRotate(i),this.state=St.TOUCH_ROTATE;break;case Hi.PAN:if(this.enablePan===!1){this.state=St.NONE;break}this._handleTouchStartPan(i),this.state=St.TOUCH_PAN;break;default:this.state=St.NONE}break;case 2:switch(this.touches.TWO){case Hi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=St.TOUCH_DOLLY_PAN;break;case Hi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=St.TOUCH_DOLLY_ROTATE;break;default:this.state=St.NONE}break;default:this.state=St.NONE}this.state!==St.NONE&&this.dispatchEvent(Sd)}function nv(i){switch(this._trackPointer(i),this.state){case St.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case St.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case St.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case St.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=St.NONE}}function iv(i){this.enabled!==!1&&i.preventDefault()}function rv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function sv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Zp=new R,av=new un,jp=new R,oi=class extends Nt{constructor(e=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this}};var ai=new ht,ov=new ht,Vl=class{constructor(e={}){let t=this,n,r,s,a,o={camera:{style:""},objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l;let c=document.createElement("div");c.style.transformOrigin="0 0",c.style.pointerEvents="none",l.appendChild(c);let h=document.createElement("div");h.style.transformStyle="preserve-3d",c.appendChild(h),this.getSize=function(){return{width:n,height:r}},this.render=function(m,d){let v=d.projectionMatrix.elements[5]*a;d.view&&d.view.enabled?(c.style.transform=`translate( ${-d.view.offsetX*(n/d.view.width)}px, ${-d.view.offsetY*(r/d.view.height)}px )`,c.style.transform+=`scale( ${d.view.fullWidth/d.view.width}, ${d.view.fullHeight/d.view.height} )`):c.style.transform="",m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),d.parent===null&&d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld();let w,x;d.isOrthographicCamera&&(w=-(d.right+d.left)/2,x=(d.top+d.bottom)/2);let C=d.view&&d.view.enabled?d.view.height/d.view.fullHeight:1,A=d.isOrthographicCamera?`scale( ${C} )scale(`+v+")translate("+p(w)+"px,"+p(x)+"px)"+f(d.matrixWorldInverse):`scale( ${C} )translateZ(`+v+"px)"+f(d.matrixWorldInverse),M=(d.isPerspectiveCamera?"perspective("+v+"px) ":"")+A+"translate("+s+"px,"+a+"px)";o.camera.style!==M&&(h.style.transform=M,o.camera.style=M),y(m,m,d,A)},this.setSize=function(m,d){n=m,r=d,s=n/2,a=r/2,l.style.width=m+"px",l.style.height=d+"px",c.style.width=m+"px",c.style.height=d+"px",h.style.width=m+"px",h.style.height=d+"px"};function p(m){return Math.abs(m)<1e-10?0:m}function f(m){let d=m.elements;return"matrix3d("+p(d[0])+","+p(-d[1])+","+p(d[2])+","+p(d[3])+","+p(d[4])+","+p(-d[5])+","+p(d[6])+","+p(d[7])+","+p(d[8])+","+p(-d[9])+","+p(d[10])+","+p(d[11])+","+p(d[12])+","+p(-d[13])+","+p(d[14])+","+p(d[15])+")"}function u(m){let d=m.elements;return"translate(-50%,-50%)"+("matrix3d("+p(d[0])+","+p(d[1])+","+p(d[2])+","+p(d[3])+","+p(-d[4])+","+p(-d[5])+","+p(-d[6])+","+p(-d[7])+","+p(d[8])+","+p(d[9])+","+p(d[10])+","+p(d[11])+","+p(d[12])+","+p(d[13])+","+p(d[14])+","+p(d[15])+")")}function g(m){m.isCSS3DObject&&(m.element.style.display="none");for(let d=0,v=m.children.length;d<v;d++)g(m.children[d])}function y(m,d,v,w){if(m.visible===!1){g(m);return}if(m.isCSS3DObject){let x=m.layers.test(v.layers)===!0,C=m.element;if(C.style.display=x===!0?"":"none",x===!0){m.onBeforeRender(t,d,v);let A;m.isCSS3DSprite?(ai.copy(v.matrixWorldInverse),ai.transpose(),m.rotation2D!==0&&ai.multiply(ov.makeRotationZ(m.rotation2D)),m.matrixWorld.decompose(Zp,av,jp),ai.setPosition(Zp),ai.scale(jp),ai.elements[3]=0,ai.elements[7]=0,ai.elements[11]=0,ai.elements[15]=1,A=u(ai)):A=u(m.matrixWorld);let b=o.objects.get(m);if(b===void 0||b.style!==A){C.style.transform=A;let M={style:A};o.objects.set(m,M)}C.parentNode!==h&&h.appendChild(C),m.onAfterRender(t,d,v)}}for(let x=0,C=m.children.length;x<C;x++)y(m.children[x],d,v,w)}}};var jr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var Cn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},lv=new tr(-1,1,1,-1,0,1),Md=class extends yt{constructor(){super(),this.setAttribute("position",new pt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new pt([0,2,0,0,2,0],2))}},cv=new Md,Wi=class{constructor(e){this._mesh=new mt(cv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,lv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Gl=class extends Cn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof kt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ti.clone(e.uniforms),this.material=new kt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Wi(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ba=class extends Cn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}},Wl=class extends Cn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Xl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new ye);this._width=n.width,this._height=n.height,t=new Bt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$t}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Gl(jr),this.copyPass.material.blending=_i,this.timer=new $s}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let r=0,s=this.passes.length;r<s;r++){let a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}ba!==void 0&&(a instanceof ba?n=!0:a instanceof Wl&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new ye);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Yl=class extends Cn{constructor(e,t,n=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Je}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}};var Kp={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Je(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var Kr=class i extends Cn{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e!==void 0?new ye(e.x,e.y):new ye(256,256),this.clearColor=new Je(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Bt(s,a,{type:$t,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let p=new Bt(s,a,{type:$t,depthBuffer:!1});p.texture.name="UnrealBloomPass.h"+h,p.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(p);let f=new Bt(s,a,{type:$t,depthBuffer:!1});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),a=Math.round(a/2)}let o=Kp;this.highPassUniforms=Ti.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new kt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ye(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ti.clone(jr.uniforms),this.blendMaterial=new kt({uniforms:this.copyUniforms,vertexShader:jr.vertexShader,fragmentShader:jr.fragmentShader,premultipliedAlpha:!0,blending:Jt,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Je,this._oldClearAlpha=1,this._basic=new zt,this._fsQuad=new Wi(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,r),this.renderTargetsVertical[s].setSize(n,r),this.separableBlurMaterials[s].uniforms.invSize.value=new ye(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(e,t,n,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(n*n))/n);let r=[],s=[];for(let a=1;a<e;a+=2){let o=t[a],l=a+1<e?t[a+1]:0,c=o+l;r.push((a*o+(a+1)*l)/c),s.push(c)}return new kt({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new ye(.5,.5)},direction:{value:new ye(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:s}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new kt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};Kr.BlurDirectionX=new ye(1,0);Kr.BlurDirectionY=new ye(0,1);var va={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var ql=class extends Cn{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ti.clone(va.uniforms),this.material=new Or({name:va.name,uniforms:this.uniforms,vertexShader:va.vertexShader,fragmentShader:va.fragmentShader}),this._fsQuad=new Wi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ft.getTransfer(this._outputColorSpace)===_t&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ta?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===na?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ia?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ir?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===sa?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===aa?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===ra&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Rn=Object.freeze({version:"ion-instrument-v2",layout:"research-space-v4",intro:1350,handoff:1450,focus:950,background:461844,copper:15183224,ice:10734038,complete:10736833});function Jp({time:i=0,index:e=0,length:t=1,age:n=1/0,signal:r=null,signalAge:s=1/0,active:a=!1,waiting:o=!1,complete:l=!1,highlight:c=!1,reduced:h=!1}={}){let p=h?1:Math.max(0,Math.min(1,n/360));if(h)return{mode:"static",progress:.5,reveal:1,gain:.2,moving:!1,execution:a,repeats:1};let f=a?"running":o?"waiting":c?"highlight":l?"settled":"ambient",u=a?7.2:c?4.2:l?2.2:1.8,g=a?.96:o?.28:c?.6:l?.28:.22,y=((i*u/Math.max(.01,t)+e*.381966)%1+1)%1;return p<1?(f="arrival",y=p,g=.72):r==="complete"&&s>=0&&s<720?(f="receipt",y=1-s/720,g=.82):r==="engage"&&s>=0&&s<500?(f="engage",y=s/500,g=.88):o&&(y=.5+Math.sin(i*1.3)*.03,g=.24+Math.sin(i*2.1)*.05),{mode:f,progress:y,reveal:p,gain:g,moving:!0,execution:a,repeats:f==="waiting"?1:Math.max(1,Math.min(4,Math.ceil(t/12)))}}function $p(i,e){let t=i?.byId.get(e)||i?.byId.get("step:"+e);if(!t)return"";let n=t.stepId||"__project__",r=i.presentation,s=r?.expanded&&(r.stageId||"__project__")===n,a=s&&i.nodes.some(o=>o.origin==="activity"&&(o.stepId||"__project__")===n);return s&&r.level==="action"?n+"|action|"+r.selectedId:n+"|"+(a?"family":s?"parent":"anchor")}function Qp(i,e){if(i?.phase!=="completed"||!i.nodes?.length||!i.nodes.every(s=>s.status==="submitted"))return null;let t=i.nodes.at(-1),n=e.filter(s=>s.kind==="artifact"&&s.stepId===t.id&&s.availability==="file"),r=/\.(docx|pdf|pptx|xlsx)$/i;return n.find(s=>r.test(s.title))||n[0]||e.find(s=>s.kind==="delivery"&&s.stepId===t.id)||null}function eu(i,e){let t=!!e?.activeId&&["running","processing"].includes(i?.phase);return e?.presentation?.expanded?t?"execution":"inspection":i?.phase==="completed"?"complete":"overview"}function tu(i,e,t=!1){if(t||!e||i<0||i>=1150)return{lift:0,scale:1,light:0};let n=i/1e3,r=Math.exp(-5.8*n),s=Math.sin(n*12.4);return{lift:s*r*(e==="complete"?.32:.18),scale:1+s*r*.018,light:Math.max(0,1-i/1150)}}function Zl(i,e,{mode:t="overview",height:n=1e3}={}){let r=v=>{let w=Math.hypot(...v)||1;return v.map(x=>x/w)},s=(v,w)=>v.reduce((x,C,A)=>x+C*w[A],0),a=(v,w)=>[v[1]*w[2]-v[2]*w[1],v[2]*w[0]-v[0]*w[2],v[0]*w[1]-v[1]*w[0]],o=t==="action",l=t==="cockpit",c=e*n,h=r(t==="complete"?[-.2,.19,1]:l?[-.085,.08,1]:o?[-.045,.07,1]:t==="execution"||t==="inspection"?[-.1,.105,1]:[-.2,.17,1]),p=r(a([0,1,0],h)),f=a(h,p),u=[(i.minX+i.maxX)/2,(i.minY+i.maxY)/2-(o?1.25:l?.7:0),(i.minZ+i.maxZ)/2],g=Math.tan(17.5*Math.PI/180),y=l?c>=1050?.72:.88:o?.72:t==="execution"||t==="inspection"?.76:.86,m=l?.75:o?.72:Math.max(.48,Math.min(.8,(n-210)/n)),d=o?10.5:16.5;for(let v of[i.minX,i.maxX])for(let w of[i.minY,i.maxY])for(let x of[i.minZ,i.maxZ]){let C=[v-u[0],w-u[1],x-u[2]],A=s(C,h);d=Math.max(d,A+Math.abs(s(C,p))/(g*Math.max(.25,e)*y),A+Math.abs(s(C,f))/(g*m))}return d+=1.2,{target:u,position:u.map((v,w)=>v+h[w]*d),distance:d,direction:h,right:p,up:f,widthUse:y,heightUse:m}}var vn=Object.freeze({version:Rn.layout,stationGapX:11.2,stationGapZ:6.2,deckWidth:8.8,deckDepth:3.4,groundY:-2.2,visibleCalls:6,callColumns:3});function ya(i){return i?.hero?{w:11.6,h:6.4,depth:.7}:i?.kind==="engine"?{w:4.3,h:2.5,depth:.55}:i?.kind==="step"?{w:7.8,h:4.3,depth:.48}:["artifact","delivery"].includes(i?.kind)?{w:3.8,h:2.35,depth:.38}:{w:4.9,h:2.85,depth:.42}}function jl(i,e,t=6){let n=Math.floor(e/3),r=e%3,s=r-(Math.min(3,t-n*3)-1)/2;return{x:i.x+s*5.65,y:i.y-6.2-n*3.3,z:i.z+7+(i.layer==="control"||s===0?0:.6)+n*1.2,yaw:-s*.06}}function nu(i){let e=vn,t=i.filter(u=>u.kind==="step"),n=Math.min(Math.max(1,t.length),Math.max(1,Math.ceil(Math.sqrt(t.length*1.4)))),r=Math.max(1,Math.ceil(t.length/n)),s=new Map,a=[],o=new Map(t.map(u=>[u.stepId,{stage:u,calls:[],files:[]}])),l=[];for(let u of i){if(["engine","step"].includes(u.kind))continue;let g=o.get(u.stepId);if(!g){l.push(u);continue}(["artifact","delivery"].includes(u.kind)?g.files:g.calls).push(u)}let c=(u,g)=>s.set(u.id,{...g,slot:u.slot??i.indexOf(u)});t.forEach((u,g)=>{let y=Math.floor(g/n),m=y%2?n-1-g%n:g%n,d=n>1?m/(n-1):.5,v=Math.sin(d*Math.PI),w=(m-(n-1)/2)*e.stationGapX,x=(y-(r-1)/2)*e.stationGapZ+v*2.1,C=o.get(u.stepId),A=8+(r-1-y)*7.8+v*.7,b={id:u.stepId,index:g,title:u.title,x:w,z:x,row:y,column:m,width:e.deckWidth,depth:e.deckDepth,levels:1,stageY:A,callCount:u.callCount??C.calls.length,fileCount:u.artifactCount??C.files.length};a.push(b),c(u,{x:w,y:A,z:x,row:y,column:m,level:0,stationId:u.stepId,layer:"stage",yaw:(.5-d)*.14}),C.calls.forEach((M,B)=>{c(M,{...jl({x:w,y:A,z:x,layer:"stage"},B,C.calls.length),row:y,column:m,level:0,stationId:u.stepId,layer:"activity"})}),C.files.forEach((M,B)=>{let k=Math.floor(B/3),D=B%3;c(M,{x:w+(D-1)*4.6,y:A+3.3+k*3,z:x-1.5,row:y,column:m,level:0,stationId:u.stepId,layer:"delivery",yaw:0})})});let h=a[0]||{x:0,z:0,stageY:8},p={x:h.x-7.7,y:h.stageY+2,z:h.z-2.5};for(let u of i.filter(g=>g.kind==="engine"))c(u,{...p,row:r,column:-1,level:0,stationId:null,layer:"control",yaw:.05});l.forEach((u,g)=>c(u,{...jl({...p,layer:"control"},g,l.length),row:r,column:-1,level:0,stationId:null,layer:"activity"}));for(let u of i.filter(g=>g.hero))c(u,{x:Math.max(...a.map(g=>g.x),0)-1.5,y:Math.max(...a.map(g=>g.stageY),8)+9.6,z:Math.max(...a.map(g=>g.z),0)+10,row:-1,column:-1,level:0,stationId:u.stepId,layer:"result",yaw:-.07});let f={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0,minZ:1/0,maxZ:-1/0};for(let u of i){let g=s.get(u.id),y=ya(u);if(!g)throw new Error("Spatial node has no actual owner position: "+u.id);f.minX=Math.min(f.minX,g.x-y.w/2-1),f.maxX=Math.max(f.maxX,g.x+y.w/2+1),f.minY=Math.min(f.minY,g.y-y.h/2-1),f.maxY=Math.max(f.maxY,g.y+y.h/2+1),f.minZ=Math.min(f.minZ,g.z-1),f.maxZ=Math.max(f.maxZ,g.z+1)}for(let u of a)f.minX=Math.min(f.minX,u.x-e.deckWidth/2-1),f.maxX=Math.max(f.maxX,u.x+e.deckWidth/2+1),f.minZ=Math.min(f.minZ,u.z-e.deckDepth/2-1),f.maxZ=Math.max(f.maxZ,u.z+e.deckDepth/2+1);return i.length||Object.assign(f,{minX:-10,maxX:10,minY:-3,maxY:10,minZ:-10,maxZ:10}),{positions:s,stations:a,columns:n,rows:r,bounds:f,mapBounds:{minX:f.minX,maxX:f.maxX,minY:f.minZ,maxY:f.maxZ},kind:"spatial",version:e.version}}function iu(i){let e=[],t=i.filter(s=>s.kind==="step"),n=(s,a,o)=>{s&&a&&e.push({id:"space:"+s.id+">"+a.id,source:s.id,target:a.id,kind:o,active:a.active})},r=i.find(s=>s.kind==="engine");for(let s of t){n(r,s,"sequence"),r=s;for(let o of i.filter(l=>l.stepId===s.stepId&&["call","review"].includes(l.kind)))n(s,o,"child-action");let a=s;for(let o of i.filter(l=>l.stepId===s.stepId&&["artifact","delivery"].includes(l.kind)))n(a,o,"delivery"),a=o}r=i.find(s=>s.kind==="engine");for(let s of i.filter(a=>!a.stepId&&!["engine","step"].includes(a.kind)))n(r,s,"child-action");return e}function ru(i,e,t="activity-order"){if(t==="child-action")return[{x:i.x,y:i.y-1.7,z:i.z},{x:i.x,y:i.y-2.7,z:e.z+1.6},{x:i.x,y:e.y+2,z:e.z+1.6},{x:e.x,y:e.y+1.3,z:e.z}];if(t==="sequence"){let r=Math.abs(i.y-e.y)<3,s=e.x>=i.x?1:-1,a=i.layer==="control"?2.4:4.1;return r?[{x:i.x+s*a,y:i.y-.2,z:i.z},{x:i.x+s*(a+1),y:i.y-.35,z:i.z-.6},{x:e.x-s*5.1,y:e.y-.35,z:e.z-.6},{x:e.x-s*4.1,y:e.y-.2,z:e.z}]:[{x:i.x+4.1,y:i.y-.3,z:i.z},{x:i.x+6.5,y:i.y-1.4,z:i.z+1.6},{x:e.x+6.5,y:e.y+1.4,z:e.z-1.6},{x:e.x+4.1,y:e.y+.3,z:e.z}]}if(t==="delivery"){let r=e.x-i.x,s=e.y-i.y,a=Math.hypot(r,s)||1,o=r/a,l=s/a,c=Math.min(3.95/Math.max(.001,Math.abs(o)),2.22/Math.max(.001,Math.abs(l))),h=Math.min((e.layer==="result"?5.9:1.95)/Math.max(.001,Math.abs(o)),(e.layer==="result"?3.28:1.25)/Math.max(.001,Math.abs(l))),p={x:i.x+o*c,y:i.y+l*c,z:i.z},f={x:e.x-o*h,y:e.y-l*h,z:e.z};return[p,{x:p.x+(f.x-p.x)*.3,y:p.y+(f.y-p.y)*.24,z:Math.min(i.z,e.z)-1.4},{x:f.x-(f.x-p.x)*.24,y:f.y-(f.y-p.y)*.2,z:f.z-2.2},f]}let n=e.x>=i.x?1:-1;return[{x:i.x+n*1.8,y:i.y-.65,z:i.z+.08},{x:i.x+n*2.8,y:i.y-.9,z:(i.z+e.z)/2+1.3},{x:e.x-n*2.8,y:e.y-.9,z:(i.z+e.z)/2+1.3},{x:e.x-n*1.8,y:e.y-.65,z:e.z+.08}]}var dv=(i,e=360)=>typeof i=="string"?i.slice(0,e):"",su={running:"执行中",succeeded:"已完成",completed:"已完成",failed:"失败",refused:"未执行",cancelled:"已停止",interrupted:"已中断",waiting:"后台处理中",unverified:"待确认",needs_revision:"需改进",deferred:"待后台任务",recorded:"已登记"},aw=Object.freeze({columns:10,gapX:5.6,gapY:5.05,top:1.8}),au={engine:"研究总览",step:"研究阶段",call:"执行动作",review:"目标核验",artifact:"交付文件",delivery:"文字交付"};function _a(i){return ya(i)}function hv(i){return nu(i)}function pv(i,e){let t=new Set(e),n=new Map((i||[]).filter(a=>typeof a.callId=="string"&&a.callId).map(a=>[a.callId,a])),r=new Map;function s(a,o=new Set){if(r.has(a))return r.get(a);let l=n.get(a);if(!l||o.has(a))return{stepId:null,source:"unassigned"};let c;if(l.stepId)c={stepId:t.has(l.stepId)?l.stepId:null,source:t.has(l.stepId)?"step-record":"unknown-step"};else if(l.rootCallId&&l.rootCallId!==a){let h=s(l.rootCallId,new Set([...o,a]));c={stepId:h.stepId,source:h.stepId?"root-call":"unassigned"}}else c={stepId:null,source:"unassigned"};return r.set(a,c),c}for(let a of n.keys())s(a);return r}function or(i,{scope:e="all",expandedStepId:t=null,recordPage:n=0,pinnedId:r=null,actionId:s=null,overview:a=!1}={}){let o=[],l=[],c=new Map,h=i?.nodes||[],p=new Map(h.map(le=>[le.id,le])),f=[],u=pv(i?.activities||[],p.keys()),g=new Map,y=(le,Z,we,me,_e={},ue=!0)=>{if(c.has(le))return c.get(le);let Ge={id:le,kind:Z,title:dv(we,160),detail:me||"",stepId:null,origin:"runtime",status:"configured",active:!1,..._e};return c.set(le,Ge),ue&&o.push(Ge),Ge},m=(le,Z,we)=>{le!==Z&&c.has(le)&&c.has(Z)&&l.push({id:le+">"+Z,source:le,target:Z,kind:we,active:c.get(Z).active})};h.length&&y("engine","engine",i.name||"METIS",i.headline||"",{status:i.phase,statusLabel:{ready:"待继续",processing:"处理中",running:"执行中",waiting:"待确认",attention:"需处理",stopped:"已停止",completed:"已交付"}[i.phase]||"",modeName:i.modeName,ports:[]});for(let le of h){let Z="step:"+le.id,we=[];if(e==="all")for(let _e of le.skills||[])we.push({kind:"skill",id:_e.id,title:_e.name||_e.id});let me=y(Z,"step",le.title,le.purpose||le.expected,{stepId:le.id,index:le.index,origin:"workflow",status:le.status,statusLabel:le.label,active:le.active,viewed:le.viewed,skills:le.skills,loop:le.loop,ports:we,prohibitions:le.prohibitions,executionBrief:le.executionBrief,expected:le.expected||""});le.index===0?m("engine",Z,"sequence"):m("step:"+h[le.index-1].id,Z,"sequence");for(let _e of le.artifacts||[]){if(!Number.isSafeInteger(_e.index)||_e.index<0)continue;let ue=y("artifact:"+le.id+":"+_e.index,"artifact",_e.name,_e.path,{stepId:le.id,origin:"delivery",status:"recorded",statusLabel:"已登记",availability:_e.availability,fileIndex:_e.index,file:_e},!0);f.push(ue),we.push({kind:"artifact",id:ue.id,title:_e.name,availability:_e.availability}),m(me.id,ue.id,"delivery")}if(le.delivery?.text){let _e=y("delivery:"+le.id,"delivery","文字交付",le.delivery.text,{stepId:le.id,origin:"delivery",status:"recorded",statusLabel:"已登记",at:le.delivery.at},!(le.artifacts||[]).length);(le.artifacts||[]).length||we.push({kind:"delivery",id:_e.id,title:"文字交付"})}}for(let[le,Z]of(i?.activities||[]).entries()){if(typeof Z.callId!="string"||!Z.callId||c.has("call:"+Z.callId))continue;let we=u.get(Z.callId),me=we?.stepId||null,_e=p.get(me),ue=Z.kind==="review"?"review":"call",Ge=g.get(me)||0;g.set(me,Ge+1),y("call:"+Z.callId,ue,Z.label||Z.tool||"执行动作",Z.target||Z.label||"",{stepId:me,ownerSource:we?.source||"unassigned",ownerTitle:_e?.title||"项目整体",ownerIndex:_e?.index??null,childIndex:Ge,origin:"activity",status:Z.status,statusLabel:su[Z.status]||Z.status,active:Z.status==="running"&&Z.invoked!==!1,activityIndex:le,callId:Z.callId,call:Z,tool:Z.tool,at:Z.startedAt||Z.finishedAt||null,ports:[]})}for(let le of i?.activities||[]){let Z="call:"+le.callId,we="call:"+le.rootCallId;if(!c.has(Z))continue;let me=c.get(Z);m(we!==Z&&c.has(we)&&c.get(we).stepId===me.stepId?we:me.stepId?"step:"+me.stepId:"engine",Z,"execution");for(let _e of f)_e.detail===le.target&&m(Z,_e.id,"reference")}for(let le of h){let Z=Date.parse(le.delivery?.at);if(!Number.isFinite(Z))continue;let we=(i.activities||[]).findLast(me=>me.stepId===le.id&&me.kind==="delivery"&&me.status==="succeeded"&&Date.parse(me.startedAt)<=Z&&Date.parse(me.finishedAt)>=Z);if(we){let me=c.get("call:"+we.callId);me&&(me.ports=(c.get("step:"+le.id)?.ports||[]).filter(_e=>_e.kind!=="skill"))}}o.forEach((le,Z)=>{le.slot=Z,le.statusLabel??=su[le.status]||le.status||""});let d=(i?.activities||[]).findLast(le=>le.status==="running"&&le.invoked!==!1),v=(i?.activities||[]).findLast(le=>le.status==="waiting"&&le.jobId&&le.invoked!==!1),w=p.get(i?.currentStepId),x=i?.phase==="processing"&&w?.status!=="submitted",C=(i?.activities||[]).findLast(le=>u.get(le.callId)?.stepId===i?.currentStepId),A=i?.live?.active,b=A?.stepId?p.get(A.stepId):null,M=A?.kind==="model"&&b?(i.activities||[]).findLast(le=>u.get(le.callId)?.stepId===b.id):null,B=d?"call:"+d.callId:v?"call:"+v.callId:x?A?.kind==="model"?M?"call:"+M.callId:b?"step:"+b.id:"engine":C?"call:"+C.callId:"step:"+w?.id:null,k=o,D=c.get(B),W=c.get(s)?.origin==="activity"?c.get(s):null,se=p.has(t)?t:null,U=t==="__project__",Q=!a&&!!(se||U||W||B||r),re=U?null:se||W?.stepId||D?.stepId||c.get(r)?.stepId||null,$=Q&&W?.stepId===re?W:null,he=k.filter(le=>le.origin==="activity"&&le.stepId===re),H=Math.max(1,Math.ceil(he.length/vn.visibleCalls)),ge=$?he.findIndex(le=>le.id===$.id):-1,K=Math.max(0,Math.min(H-1,ge>=0?Math.floor((he.length-1-ge)/vn.visibleCalls):Math.trunc(Number(n)||0))),Ie=Math.max(0,he.length-K*vn.visibleCalls),ke=Math.max(0,Ie-vn.visibleCalls),te=Q?he.slice(ke,Ie):[],Ce=$||c.get(r||B);Q&&K===0&&Ce?.origin==="activity"&&Ce.stepId===re&&!te.includes(Ce)&&(te.length>=vn.visibleCalls&&te.shift(),te.push(Ce));for(let le of k.filter(Z=>Z.kind==="step")){let Z=k.filter(we=>we.origin==="activity"&&we.stepId===le.stepId);le.childIds=Z.map(we=>we.id),le.recentStatuses=Z.slice(-6).map(we=>({id:we.id,status:we.status})),le.callCount=Z.length,le.artifactCount=f.filter(we=>we.stepId===le.stepId).length,le.active=!!le.active||Z.some(we=>we.active)}let pe=Qp(i,k);pe&&(pe.hero=!0);let Le=k.filter(le=>["engine","step"].includes(le.kind)||te.includes(le)||!Q&&le===pe);Le.forEach((le,Z)=>le.displaySlot=Z);let Re=hv(Le),Ue=iu(Le),lt=Q?$?"action":"stage":"overview",Oe=$?.id||null,He={expanded:Q,level:lt,selectedId:Oe,stageId:re,page:K,pages:H,totalCalls:he.length,start:Q&&he.length?ke+1:0,end:Q?Ie:0,key:[lt,re||"",Oe||"",K,te.map(le=>le.id).join(",")].join("|")};return{nodes:Le,fullNodes:k,edges:l,circuitEdges:Ue,byId:c,positions:Re.positions,bounds:Re.bounds,mapBounds:Re.mapBounds,stations:Re.stations,presentation:He,artMode:eu(i,{presentation:He,activeId:B}),heroId:Q?null:pe?.id||null,layout:{columns:Re.columns,rows:Re.rows,kind:Re.kind,version:Re.version},scope:e,phase:i?.phase,activeId:B,latestId:d?"call:"+d.callId:(i?.activities||[]).length?"call:"+i.activities.at(-1).callId:w?"step:"+w.id:o[0]?.id||null,counts:{entities:k.length,visible:Le.length,stages:h.length,bindings:e==="all"?h.reduce((le,Z)=>le+(Z.skills?.length||0),0):0,calls:k.filter(le=>le.origin==="activity").length,materials:(i?.activities||[]).filter(le=>le.kind==="read"&&le.target).length,artifacts:f.length}}}function ou(i,e={x:1,y:0},t=!1){if(t||i>=1e3)return{x:0,y:0,opacity:1,scale:1,pulse:0,progress:1,moving:!1};if(i<0)return{x:0,y:0,opacity:0,scale:1,pulse:0,progress:0,moving:!0};let n=Math.min(1,i/360),r=Math.max(0,(i-360)/1e3),s=i<360?-.2*(1-n):.28*Math.exp(-9*r)*Math.sin(19*r);return{x:e.x*s,y:e.y*s,opacity:Math.max(0,Math.min(1,(i-240)/210)),scale:i<360?.945+.035*n:1-.018*Math.exp(-9*r)*Math.cos(19*r),pulse:i<360?Math.sin(Math.PI*n*.5):Math.exp(-(i-360)/180),progress:n,moving:!0}}function Ed(i,e,t={w:6.6,h:2.8}){let n=Math.tan(17.5*Math.PI/180),r=Math.max(.25,i/Math.max(1,e));return Math.max(16.5,t.w/(2*n*r*.74),t.h/(2*n*.28))}var Sa=class{constructor(e=42){this.maxCells=e,this.reset("")}reset(e){this.key=e,this.lines=[],this.sequence=0,this.seen=0,this.position=0,this.lastTime=0,this.revision=0,this.source=null}append(e,t){if(!["stdout","stderr","log","assistant","receipt","status"].includes(t)||typeof e!="string"||!e)return;let n=this.lines.at(-1);n&&n.source!==t&&(n.closed=!0);for(let r of e.replace(/\r\n/g,`
`).replace(/\r/g,`
`)){if(n=this.lines.at(-1),(!n||n.closed)&&(n={id:++this.sequence,text:"",source:t,cells:0,closed:!1},this.lines.push(n)),r===`
`){n.closed=!0;continue}let s=r.codePointAt(0)>255?2:1;n.cells+s>this.maxCells&&(n.closed=!0,n={id:++this.sequence,text:"",source:t,cells:0,closed:!1},this.lines.push(n)),n.text+=r,n.cells+=s}for(;this.lines.length>160;)this.lines.shift(),this.position=Math.max(0,this.position-1);this.source=t,this.revision++}ingest(e,t){if(!e||!t)return!1;let n=e.instanceId+"|"+t.key;this.key!==n&&this.reset(n);let r=!1;for(let s of e.entries||[])s.seq>this.seen&&t.matches(s)&&(this.append(s.text,s.source),r=!0);return this.seen=Math.max(this.seen,e.lastSeq||0),r}frame(e,t=!1){let n=this.lines.length,r=this.lastTime?Math.min(.1,Math.max(0,(e-this.lastTime)/1e3)):1/60;this.lastTime=e;let s=Math.max(0,n-this.position),a=32+Math.min(128,s*12);return this.position=t?n:Math.min(n,this.position+a*r),{rows:this.lines,position:this.position,moving:!t&&this.position<n-.001,revision:this.revision,source:this.source,totalLines:this.sequence}}};function lu(i,e){if(!i)return null;if(i.callId){let s=i.rootCallId||i.callId;return{key:"action:"+i.callId,matches:a=>a.callId===i.callId||a.rootCallId===s}}let t=i.stepId||e?.active?.stepId;if(t)return{key:"step:"+t,matches:s=>s.stepId===t};let n=e?.active;if(!n)return null;if(n.kind==="model")return{key:"model:"+n.attemptId,matches:s=>s.attemptId===n.attemptId};let r=n.rootCallId||n.callId;return{key:"tool:"+r,matches:s=>s.callId===n.callId||s.rootCallId===r}}var wa=i=>typeof i=="string"?i.replace(/\s+/g," ").trim():"";function cu(i){if(i.call?.error)return wa(i.call.error);if(i.call?.feedback?.length)return wa(i.call.feedback[0]);let e=wa(i.detail);return["read","write"].includes(i.call?.kind)&&/[\\/]/.test(e)&&!/^https?:\/\//i.test(e)&&e.split(/[\\/]/).filter(Boolean).at(-1)||e}function uv(i,e){let t=i?.byId.get(i.activeId);if(!t)return null;let n=e?.nodes?.find(c=>c.id===t.stepId);if(n?.status==="submitted")return null;let r=e?.live?.active;if(r?.kind==="model"&&e?.phase==="processing")return{nodeId:t.id,stepId:r.stepId,title:r.state==="thinking"?"模型分析中":r.state==="text"?"公开文字输出中":"模型响应中",status:"processing",lines:[],key:"model:"+r.attemptId+"|"+r.state};let s=t.call;if(s?.invoked===!1||["failed","refused","cancelled","interrupted","unverified"].includes(s?.status)||!s&&e?.phase!=="processing")return null;let a=s?.status==="running",o=s?.status==="waiting";if(s&&!a&&!o&&e?.phase!=="processing")return null;let l=[];return s?.tool&&l.push(s.tool),s?.target&&l.push(wa(s.target).slice(0,240)),s?.resultPreview&&l.push(s.resultPreview.slice(-4e3)),!a&&!o&&s?.feedback?.length&&l.push(wa(s.feedback[0]).slice(0,240)),!l.length&&n?.title&&l.push(n.title),{nodeId:t.id,stepId:t.stepId,title:o?"等待后台回执":a?s.label||"执行中":"研究助手执行中",status:o?"waiting":a?"running":"processing",lines:l,key:[t.id,s?.status||e?.phase,...l].join("|")}}function du(i,e){let t=i?.presentation;if(!t?.expanded)return null;if(t.level!=="action"){let a=uv(i,e);return!a||(a.stepId||null)!==(t.stageId||null)?null:e?.phase==="processing"&&e.live?.active?.kind==="model"?{...a,nodeId:t.stageId?"step:"+t.stageId:"engine"}:a}let n=i.byId.get(t.selectedId);if(n?.origin!=="activity")return null;let r=n.call||{},s=[];return r.resultPreview&&s.push(r.resultPreview),r.error&&s.push(r.error),r.feedback?.length&&s.push(...r.feedback),s.length||s.push(r.tool||n.title,r.target||"",n.statusLabel||""),{nodeId:n.id,stepId:n.stepId,callId:n.callId,rootCallId:r.rootCallId||n.callId,title:n.title,status:n.status,lines:s.filter(Boolean),key:[n.id,n.status,...s].join("|")}}var Kl={press:145,hover:240,reveal:620,camera:880,idleFrame:50,activeFrame:25};function Jr(i){let e=Math.max(0,Math.min(1,i));return e*e*e*(e*(e*6-15)+10)}function hu(i){return["running","processing"].includes(i?.phase)||i?.activeCalls?.length?1:["waiting","attention"].includes(i?.phase)?.35:.08}function Jl(i,e,t){return{x:Math.max(-1,Math.min(1,(i-t.left)/Math.max(1,t.width)*2-1)),y:Math.max(-1,Math.min(1,(e-t.top)/Math.max(1,t.height)*2-1))}}function pu(i,e,t=!1){return t?{x:0,y:0,rx:0,ry:0,lift:0}:{x:i*1.4,y:e*.7,rx:-e*2.1,ry:i*2.8,lift:3}}function uu(i,e){return!i||i===e?null:["submitted","succeeded","passed","completed"].includes(e)?"complete":["failed","blocked","refused","needs_revision"].includes(e)?"attention":["running","working","checking","processing"].includes(e)?"engage":"change"}function $r(i,e,t=!1){if(t)return{x:0,y:0,z:0,rx:0,ry:0};let n=e*2.3999632297;return{x:Math.sin(i*.54+n)*.038,y:Math.sin(i*.96+n)*.115,z:.04+Math.cos(i*.72+n)*.025,rx:Math.sin(i*.52+n)*.004,ry:Math.cos(i*.67+n)*.009}}var Fn=i=>typeof i=="string"?i.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,"").trim():"",$l=i=>/^(?:[a-z]:[\\/]|\\\\)/i.test(i)?i.replaceAll("\\","/").toLowerCase():i,fu=i=>Fn(i).split(/[\\/]/).filter(Boolean).at(-1)||Fn(i),Qr=(i,e)=>{let t=new Map;for(let n of i){let r=e(n);r&&t.set(r,n)}return[...t.values()]};function lr(i,e){let t=e?.fullNodes||[],n=t.filter(x=>x.kind==="step"),r=t.filter(x=>x.origin==="activity"),s=r.filter(x=>x.call?.invoked!==!1),a=Qr(s.filter(x=>x.call?.kind==="read"&&["succeeded","completed"].includes(x.status)&&Fn(x.call.target)).map(x=>({id:x.id,stepId:x.stepId,name:fu(x.call.target),target:Fn(x.call.target)})),x=>$l(x.target)),o=t.filter(x=>x.kind==="artifact"&&x.availability==="file"&&Fn(x.file?.path||x.detail)).map(x=>({id:x.id,stepId:x.stepId,index:x.fileIndex,name:Fn(x.title)||fu(x.detail),target:Fn(x.file?.path||x.detail),bytes:Number.isFinite(x.file?.bytes)?x.file.bytes:null})),l=Qr(o,x=>$l(x.target)),c=n.flatMap(x=>(x.skills||[]).filter(C=>Fn(C?.id)).map(C=>({id:C.id,name:Fn(C.name)||C.id,stepId:x.stepId}))),h=Qr(c,x=>x.id),p=s.filter(x=>x.kind==="review"),f=n.filter(x=>x.status==="submitted").length,u=e?.presentation?.expanded?e.presentation.stageId:null,g=u?n.find(x=>x.stepId===u):null,y=e?.byId?.get(e.activeId),m=g?r.filter(x=>x.stepId===g.stepId):r,d=g?Qr(o.filter(x=>x.stepId===g.stepId),x=>$l(x.target)):l,v=new Map;for(let x of d){let C=/\.([a-z0-9]{1,8})$/i.exec(x.name)?.[1]?.toUpperCase()||"FILE";v.set(C,(v.get(C)||0)+1)}let w=new Map(n.map(x=>{let C=r.filter(b=>b.stepId===x.stepId),A=C.filter(b=>b.kind==="review"&&b.call?.invoked!==!1);return[x.stepId,{calls:C.length,skills:(x.skills||[]).length,files:Qr(o.filter(b=>b.stepId===x.stepId),b=>$l(b.target)).length,reviews:A.length,statuses:C.slice(-12).map(b=>({id:b.id,status:b.status,label:b.title})),latest:C.at(-1)||null}]}));return{stages:n,submitted:f,sources:a,files:l,skills:h,bindings:c.length,checks:p.length,records:r.length,focus:g,active:y,running:!!y&&["running","processing"].includes(i?.phase),phase:i?.phase||"ready",focusSkills:g?(g.skills||[]).map(x=>({id:x.id,name:Fn(x.name)||x.id})):h,scopeCalls:m,scopeFiles:d,formats:[...v].map(([x,C])=>({name:x,count:C})),recent:m.slice(-4).reverse(),stageMetrics:w,goal:g?Fn(g.detail):"",stageStatus:g?.statusLabel||"",tools:Qr(m.filter(x=>Fn(x.tool)),x=>x.tool).map(x=>x.tool)}}function Td(i,e){let t=i?.byId?.get(e);if(!t)return null;if(t.kind==="step")return{stageId:t.stepId,actionId:null,page:0,overview:!1};if(t.kind==="engine")return{stageId:"__project__",actionId:null,page:0,overview:!1};let n=t.stepId||"__project__";if(t.origin!=="activity")return{stageId:n,actionId:null,page:0,overview:!1};let r=(i.fullNodes||[]).filter(a=>a.origin==="activity"&&(a.stepId||"__project__")===n),s=r.findIndex(a=>a.id===t.id);return{stageId:n,actionId:t.id,page:s<0?0:Math.floor((r.length-1-s)/vn.visibleCalls),overview:!1}}function mu(i,e,t){let n=i?.network;if(t&&i?.phase!=="completed"){if(i?.phase==="processing"&&i.live?.active?.kind==="model"){let s=i.live.active.stepId;return{expandedStepId:n?.byId.has("step:"+s)?s:"__project__",actionId:null,recordPage:0,overview:!1}}let r=Td(n,n?.activeId||n?.latestId);if(r)return{expandedStepId:r.stageId,actionId:r.actionId,recordPage:r.page,overview:!1}}return!e?.stageId||e.overview?{overview:!0}:{expandedStepId:e.stageId,actionId:e.actionId||null,recordPage:e.page||0,overview:!1}}function Ma(i,e){return e?.expanded?(i.kind==="engine"?!e.stageId:i.stepId===e.stageId)&&(e.level!=="action"||i.id===e.selectedId)?1:0:1}function gu(i){let e={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0,minZ:1/0,maxZ:-1/0};for(let{point:t,size:n}of i)e.minX=Math.min(e.minX,t.x-n.w/2-.7),e.maxX=Math.max(e.maxX,t.x+n.w/2+.7),e.minY=Math.min(e.minY,t.y-n.h/2-.55),e.maxY=Math.max(e.maxY,t.y+n.h/2+.55),e.minZ=Math.min(e.minZ,t.z-.6),e.maxZ=Math.max(e.maxZ,t.z+.8);return i.length?e:null}var es=1.12;function Ad(i,e){return!e?.expanded&&i.kind!=="step"?0:Ma(i,e)}function Ql(i){let e=(i?.nodes||[]).filter(n=>n.kind==="step"),t={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0,minZ:1/0,maxZ:-1/0};for(let n of e){let r=i.positions.get(n.id),s=ya(n);r&&(t.minX=Math.min(t.minX,r.x-s.w*es/2-1.4),t.maxX=Math.max(t.maxX,r.x+s.w*es/2+1.4),t.minY=Math.min(t.minY,r.y-s.h*es/2-1.7),t.maxY=Math.max(t.maxY,r.y+s.h*es/2+1.5),t.minZ=Math.min(t.minZ,r.z-3.8),t.maxZ=Math.max(t.maxZ,r.z+1))}return e.length&&Number.isFinite(t.minX)?t:i?.bounds||null}function fv(i,e){let t=lr(i,e),n=e?.byId.get(e.activeId),r=n?.stepId?t.stages.find(s=>s.stepId===n.stepId):null;return{...t,owner:r,projectCalls:(e?.fullNodes||[]).filter(s=>s.origin==="activity"&&!s.stepId).length,result:e?.heroId&&t.files.find(s=>s.id===e.heroId)||null,phaseLabel:{completed:"研究已交付",running:"工具执行中",processing:"模型处理中",waiting:"等待处理",attention:"需要关注",stopped:"本轮已停止",ready:"研究待继续"}[i?.phase]||"读取研究状态",route:t.stages.map(s=>({id:s.id,stepId:s.stepId,index:s.index,title:s.title,status:s.status,label:s.statusLabel,active:s.stepId===r?.stepId}))}}function xu(i){let e=i.createElement;return i.memo(function({model:n,graph:r,onEntity:s}){let a=i.useMemo(()=>fv(n,r),[n,r]),o=a.stages.length;if(!o||r.presentation.expanded)return null;let l=Array.from({length:40},(h,p)=>{let f=(-220+p*8)*Math.PI/180,u=p%5?51:48;return e("line",{key:p,x1:64+Math.cos(f)*u,y1:64+Math.sin(f)*u,x2:64+Math.cos(f)*55,y2:64+Math.sin(f)*55})}),c=(h,p)=>{let f=(-216+h*300/p)*Math.PI/180,u=(-216+(h+.78)*300/p)*Math.PI/180,g=42;return"M "+(64+Math.cos(f)*g)+" "+(64+Math.sin(f)*g)+" A 42 42 0 0 1 "+(64+Math.cos(u)*g)+" "+(64+Math.sin(u)*g)};return e("section",{className:"in-flightDeck","aria-label":"科研驾驶舱总览","data-state":n.phase},e("svg",{className:"in-canopy","aria-hidden":"true",viewBox:"0 0 1000 600",preserveAspectRatio:"none"},e("path",{className:"in-canopySolid",d:"M0 0H195L220 18H780L805 0H1000V600H826L798 580H202L174 600H0Z M24 26V550L48 574H165L197 554H803L835 574H950L976 550V26L948 12H815L786 34H214L185 12H52Z",fillRule:"evenodd"}),e("path",{className:"in-canopyTrace",d:"M14 98V30L44 9H180L211 29H789L820 9H955L986 30V98 M14 469V558L42 588H165L199 566H801L835 588H957L986 558V469"}),e("path",{className:"in-canopyCurrent",d:"M14 98V30L44 9H180L211 29H789L820 9H955L986 30V98"}),e("path",{className:"in-canopyReticle",d:"M488 38H512M500 34V46 M488 553H512M500 549V561 M32 291V309M28 300H40 M968 291V309M960 300H972"})),e("div",{className:"in-flightHeading","aria-hidden":"true"},e("span",null,"METIS / MISSION CONTROL"),e("i",null),e("span",null,"研究航线 · "+o+" 个阶段")),e("aside",{className:"in-flightPort","aria-label":"研究任务仪表"},e("span",{className:"in-flightEyebrow"},"MISSION / 研究任务"),e("div",{className:"in-missionDial","aria-label":a.submitted+" / "+o+" 步已交付"},e("svg",{viewBox:"0 0 128 128","aria-hidden":"true"},e("g",{className:"in-dialTicks"},l),e("circle",{className:"in-dialInner",cx:64,cy:64,r:33}),a.route.map((h,p)=>e("path",{key:h.id,d:c(p,o),"data-status":h.status,"data-active":h.active}))),e("div",null,e("strong",null,String(a.submitted).padStart(2,"0")),e("small",null,"/ "+String(o).padStart(2,"0")),e("span",null,"步骤已交付"))),e("div",{className:"in-flightPhase","data-active":a.running},e("i",null),a.phaseLabel),e("dl",{className:"in-flightReadouts"},[["研究技能",a.skills.length],["实际动作",a.records],["可查看成果",a.files.length]].map(([h,p])=>e("div",{key:h},e("dt",null,h),e("dd",null,String(p).padStart(2,"0"))))),a.owner?e("button",{className:"in-flightOwner",type:"button",onClick:()=>s(a.owner.id),"aria-label":"进入正在执行的步骤"},e("small",null,"当前执行 · "+String(a.owner.index+1).padStart(2,"0")),e("strong",null,a.owner.title)):e("p",{className:"in-flightIdle"},a.phase==="completed"?"全部阶段完成，可进入任意步骤复查。":"点击流程节点，进入对应执行舱。"),a.projectCalls?e("button",{className:"in-flightProject",type:"button",onClick:()=>s("engine")},"项目级动作 ",e("b",null,a.projectCalls)):null),e("aside",{className:"in-flightStarboard","aria-label":"研究记录与成果接点"},e("span",{className:"in-flightEyebrow"},"EVENT LINK / 执行记录"),a.recent.length?e("ol",{className:"in-flightEvents"},a.recent.slice(0,3).map(h=>e("li",{key:h.id,"data-status":h.status},e("button",{type:"button",onClick:()=>s(h.id),title:h.title},e("span",null,h.statusLabel),e("strong",null,h.title),e("small",null,h.ownerIndex===null?"项目整体":"第 "+String(h.ownerIndex+1).padStart(2,"0")+" 步"))))):e("p",{className:"in-flightIdle"},"执行开始后，真实调用将在这里接入。"),e("span",{className:"in-flightEyebrow in-flightOutputTitle"},"ARTIFACT / 成果接点"),a.files.length?e("ol",{className:"in-flightFiles"},(a.result?[a.result,...a.files.filter(h=>h.id!==a.result.id)]:a.files).slice(0,2).map(h=>e("li",{key:h.id},e("button",{type:"button",onClick:()=>s(h.id),"aria-label":"驾驶舱打开成果 "+h.name,title:h.name},e("span",null,h.name.split(".").at(-1).toUpperCase()),e("strong",null,h.name))))):e("p",{className:"in-flightIdle"},"步骤交付后，文件将接入此处。")),e("div",{className:"in-flightKeel"},e("span",null,"RESEARCH NAVIGATION"),e("i",null),e("span",null,"拖动环绕 · 滚轮缩放 · 点击进入步骤")))})}var bu=(i,e,t)=>[[-i/2+t,-e/2],[i/2-t,-e/2],[i/2,-e/2+t],[i/2,e/2-t],[i/2-t,e/2],[-i/2+t,e/2],[-i/2,e/2-t],[-i/2,-e/2+t]];function vu(i){let e=Ql(i),t=new At;if(!e)return{group:t,render(){}};let n=e.maxX-e.minX,r=e.maxY-e.minY,s=Math.min(1.3,n*.08,r*.12),a=bu(n,r,s),o=bu(n-.65,r-.65,Math.max(.15,s-.2)),l=new ni(a.map(w=>new ye(...w))),c=new Qi(o.map(w=>new ye(...w)));l.holes.push(c);let h=new mt(new Ui(l,{depth:.24,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.055,bevelThickness:.04}),new zt({color:2706016,transparent:!0,opacity:.78}));t.add(h);let p=new mt(new Ws(new ni(o.map(w=>new ye(...w)))),new zt({color:531757,transparent:!0,opacity:.4,depthWrite:!1,side:gn,fog:!1}));p.position.z=-.1,t.add(p);let f=[...a,a[0]].map(w=>new R(w[0],w[1],.3)),u=new yt().setFromPoints(f);u.setAttribute("uv",new pt(f.flatMap((w,x)=>[x/(f.length-1),0]),2));let g=new kt({uniforms:{uClock:{value:0},uMotion:{value:1}},vertexShader:"varying float vT;void main(){vT=uv.x;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"precision highp float;varying float vT;uniform float uClock;uniform float uMotion;void main(){float head=exp(-pow(abs(fract(vT-uClock*.055+.5)-.5)*40.,2.))*uMotion;vec3 c=mix(vec3(.24,.52,.67),vec3(.93,.76,.49),head);gl_FragColor=vec4(c,.28+head*.65);}",transparent:!0,depthWrite:!1,blending:Jt,toneMapped:!1});t.add(new Sn(u,g));let y=[];for(let w of[-1,1])for(let x=0;x<12;x++){let C=-r/2+.9+x*(r-1.8)/11,A=w*(n/2-.08);y.push(new R(A,C,.32),new R(A-w*(x%3===0?.32:.16),C,.32))}t.add(new Mn(new yt().setFromPoints(y),new jt({color:10141129,transparent:!0,opacity:.32,fog:!1})));let m=a.filter((w,x)=>x%2===0);for(let[w,x]of m){let C=new mt(new Ns(.1,.1,.045,8),new zt({color:11453381}));C.rotation.x=Math.PI/2,C.position.set(w,x,.32),t.add(C)}t.position.set((e.minX+e.maxX)/2,(e.minY+e.maxY)/2,e.minZ+.25);let d=i.nodes.filter(w=>w.kind==="step"),v=[];for(let w of d){let x=i.positions.get(w.id),C=new mt(new an(.7,.055,.06),new zt({color:w.active?16039549:w.status==="submitted"?10209466:7708334,transparent:!0,opacity:.75}));C.position.set(x.x-t.position.x,x.y-2.55-t.position.y,x.z-t.position.z-.15),t.add(C),v.push({light:C,active:w.active,index:w.index})}return{group:t,render(w,x){g.uniforms.uClock.value=x?0:w,g.uniforms.uMotion.value=x?0:1;for(let{light:C,active:A,index:b}of v)C.material.opacity=A&&!x?.65+Math.sin(w*2.2+b)*.2:.65}}}var mv=["varying float vWireT;","uniform vec3 uStartOffset;","uniform vec3 uEndOffset;","void main(){","vWireT=uv.x;","vec3 p=position+mix(uStartOffset,uEndOffset,smoothstep(0.,1.,uv.x));","gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);","}"].join(`
`),gv=["precision highp float;","varying float vWireT;","uniform vec3 uColor;","uniform float uHead;","uniform float uReveal;","uniform float uGain;","uniform float uMotion;","uniform float uRepeats;","uniform float uLayer;","uniform float uScope;","void main(){","if(vWireT>uReveal)discard;","float lag=fract((uHead-vWireT)*uRepeats);","float d=abs(fract((vWireT-uHead)*uRepeats+.5)-.5);","float head=exp(-d*d*1550.);","float trail=(1.-smoothstep(0.,.20,lag))*.38;","float signal=(head+trail)*uMotion;","float alpha=clamp((.10+uGain*signal)*uLayer,0.,.96)*uScope;","gl_FragColor=vec4(uColor*(.7+head*uMotion*1.6),alpha);","}"].join(`
`);function Cd(i,e){return new kt({uniforms:{...i,uLayer:{value:e}},vertexShader:mv,fragmentShader:gv,transparent:!0,depthWrite:!1,depthTest:!0,blending:Jt,toneMapped:!1})}var Ea=i=>["failed","refused","blocked","needs_revision"].includes(i.status)?15702915:i.active?16761468:i.hero?10736833:i.kind==="review"?13215175:i.status==="submitted"?11061679:i.kind==="engine"?14921079:12289372;function yu(i,e){let t=new ni,n=.17;return t.moveTo(-i/2+n,-e/2),t.lineTo(i/2,-e/2),t.lineTo(i/2,e/2-n),t.lineTo(i/2-n,e/2),t.lineTo(-i/2,e/2),t.lineTo(-i/2,-e/2+n),t.closePath(),t}function ec(i){i.traverse(e=>{e.isInstancedMesh&&e.dispose(),e.isSprite||e.geometry?.dispose();for(let t of Array.isArray(e.material)?e.material:[e.material])t?.dispose()}),i.clear()}var tt=(i,e,t)=>{let n=document.createElement(i);return n.className=e,t?.appendChild(n),n};function _u({board:i,texture:e,host:t,onEntity:n,onPick:r,onFocusChat:s,requestFrame:a}){let o=new At,l=new At,c=new At,h=new At,p=new At,f=new At,u=new At,g=[];o.add(c,h,p,f),i.add(o,l,u);let y=new Map,m=new Map,d=null,v=null,w=null,x=null,C=null,A="",b=!1,M=!1,B=0,k=!0,D=tt("aside","in-liveWindow",t);D.hidden=!0,D.setAttribute("role","status"),D.setAttribute("aria-live","polite");let W=tt("div","in-liveHead",D),se=tt("i","in-liveDot",W),U=tt("strong","",W),Q=tt("span","in-liveCode",W);Q.textContent="LIVE / STREAM",D.setAttribute("aria-live","off");let re=tt("div","in-liveBody",D),$=tt("div","in-liveTape",re);tt("span","in-liveScan",D).setAttribute("aria-hidden","true");let H=new Sa,ge="",K=null,Ie=0,ke="",te=null,Ce="floating",pe="",Le=0;re.tabIndex=0,re.setAttribute("aria-label","所选动作的公开输出");for(let j of["pointerdown","wheel","keydown"])D.addEventListener(j,be=>be.stopPropagation());let Re=new WeakMap;function Ue(j,be,Pe){let T=Re.get(j);(!T||T.key!==H.key)&&(j.replaceChildren(),T={key:H.key,rows:new Map,last:0},Re.set(j,T));let _=new Set(H.lines.map(L=>L.id));for(let[L,ce]of T.rows)_.has(L)||(ce.remove(),T.rows.delete(L));for(let L of H.lines){let ce=T.rows.get(L.id);ce?ce.parentNode!==j&&j.appendChild(ce):(ce=tt(be==="in-streamLine"?"p":"span",be,j),ce.dataset.fresh=String(Pe&&L.id>T.last),T.rows.set(L.id,ce)),ce.dataset.source=L.source,ce.dataset.signal=/^METIS_ENVIRONMENT=/.test(L.text)?"environment":/^Successfully installed|^No broken requirements found\./.test(L.text)?"complete":"",ce.textContent!==L.text&&(ce.textContent=L.text)}T.last=H.lines.at(-1)?.id||T.last}let lt=new R,Oe=new R,He=new R;function le(j,be,Pe){let T=_a(j),_=new At,L=yu(T.w,T.h),ce=new Ys({color:1319731,metalness:.26,roughness:.32,clearcoat:.9,clearcoatRoughness:.18,emissive:463390,emissiveIntensity:.18}),Y=new Tn({color:8807751,metalness:.82,roughness:.29,emissive:2102796,emissiveIntensity:.15}),oe=new mt(new Ui(yu(T.w+.34,T.h+.26),{depth:.19,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.07,bevelThickness:.04}),new Tn({color:1581873,metalness:.82,roughness:.36}));oe.position.z=-T.depth/2-.29,_.add(oe);let F=new Mn(new vi(oe.geometry,35),new jt({color:7508895,transparent:!0,opacity:.32,fog:!1}));F.position.copy(oe.position),_.add(F);let V=new mt(new Ui(L,{depth:T.depth,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.045,bevelThickness:.04}),[ce,Y]);V.position.z=-T.depth/2,_.add(V);let q=new Mn(new vi(V.geometry,35),new jt({color:Ea(j),transparent:!0,opacity:.66,fog:!1}));q.position.z=-T.depth/2,_.add(q);let ee=[];for(let rt=0;rt<7;rt++)for(let Xt of[-1,1]){let cr=(rt-3)*.29;ee.push(new R(Xt*(T.w/2+.02),cr,-.03),new R(Xt*(T.w/2+.18),cr,-.03))}let S=new Mn(new yt().setFromPoints(ee),new jt({color:11038537,transparent:!0,opacity:.42,fog:!1}));_.add(S);let P=new Is(new an(.17,.22,.16),new Tn({color:10318924,metalness:.8,roughness:.3}),8),J=new ht,ve=0;for(let rt of[-1,1])for(let Xt of[-.88,-.57,.57,.88])J.makeTranslation(rt*(T.w/2+.14),Xt,-T.depth/2-.08),P.setMatrixAt(ve++,J);_.add(P);let Ee=new ti(new Wn({map:e,color:Ea(j),transparent:!0,opacity:.04,depthWrite:!1,blending:Jt}));Ee.scale.set(T.w*1.15,T.h*1.55,1),Ee.position.z=-.16,_.add(Ee),c.add(_);let Me=tt("div","in-cardWrap"),Ae=tt("button","in-entity"+(j.kind==="step"?" ion-chip":""),Me);Ae.type="button",Ae.dataset.networkEntity=j.id,Ae.dataset.kind=j.kind,Me.style.width=Ae.style.width="340px",Me.style.height=Ae.style.height="200px",j.kind==="step"&&(Ae.dataset.sceneStep=j.stepId);let X=tt("span","in-labelBody",Ae),N=tt("span","in-nodeHead",X),ae=tt("span","",N),I=tt("span","",N),G=tt("strong","",X),xe=tt("span","in-nodeDetail",X),fe=tt("span","in-nodeMetrics",X),We=tt("span","in-nodeFoot",X),Xe=j.kind==="step"?["技能","动作","文件"].map(rt=>{let Xt=tt("span","",fe),cr=tt("b","",Xt);return tt("small","",Xt).textContent=rt,cr}):[],Be=tt("span","in-cardCircuit",X);Be.setAttribute("aria-hidden","true");for(let rt=0;rt<4;rt++)tt("i","",Be);let ut=tt("span","in-detailStatic",xe),st=tt("span","in-cardTicker",xe),Mt=tt("span","in-moduleHistory",X),Ct=tt("span","in-resultSeal",X);Mt.setAttribute("aria-hidden","true"),Ct.setAttribute("aria-hidden","true");let It=tt("div","in-cardPorts",Me);It.setAttribute("role","group"),It.setAttribute("aria-label","阶段技能与真实交付");let Wt=rt=>rt.stopPropagation();It.addEventListener("pointerdown",Wt);let Ut=null;Ae.onpointerdown=rt=>{rt.stopPropagation(),Ut=rt.button===0?{x:rt.clientX,y:rt.clientY,moved:!1}:null,Ut&&Ae.setPointerCapture(rt.pointerId)},Ae.onpointermove=rt=>{Ut&&Math.hypot(rt.clientX-Ut.x,rt.clientY-Ut.y)>8&&(Ut.moved=!0)},Ae.onpointerup=rt=>{Ae.hasPointerCapture(rt.pointerId)&&Ae.releasePointerCapture(rt.pointerId)},Ae.onpointercancel=()=>{Ut=null},Ae.onclick=rt=>{if(rt.detail&&Ut?.moved){rt.preventDefault();return}C=j.id,a(),n?n(j.id):j.stepId?r?.(j.stepId):s?.()};let Qt=()=>{let rt=y.get(j.id);rt&&!rt.frozenPose&&(rt.frozenPose={...rt.lastIdlePose||$r(0,j.slot,!0)}),x=j.id,a()},li=()=>{if(Me.matches(":hover,:focus-within"))return;let rt=y.get(j.id);rt&&(rt.frozenPose=null),x===j.id&&(x=null),a()};Me.onpointerenter=Qt,Me.onpointerleave=li,Me.onfocusin=Qt,Me.onfocusout=li,Me.style.backfaceVisibility="hidden";let In=new oi(Me);In.scale.set(T.w/340,T.h/200,1),l.add(In);let ln=Ad(j,d.presentation);_.visible=In.visible=ln>.005,Me.inert=ln<1,Me.style.opacity=String(ln);let jn=[];return _.traverse(rt=>{if(rt!==Ee)for(let Xt of Array.isArray(rt.material)?rt.material:[rt.material])Xt&&jn.push({material:Xt,base:Xt.opacity,depthWrite:Xt.depthWrite})}),{node:j,size:T,front:new R(0,0,T.depth/2+.075),group:_,solid:V,edge:q,glow:Ee,label:In,wrapper:Me,element:Ae,kind:ae,status:I,title:G,detail:xe,detailStatic:ut,cardTape:st,history:Mt,seal:Ct,metrics:fe,counters:Xe,historyKey:"",foot:We,ports:It,born:be,direction:Pe,portKey:"",position:new R,onScreen:!0,signal:null,signalAt:0,origin:null,layoutAt:0,yaw:0,frozenPose:null,lastIdlePose:null,scopeOpacity:ln,scopeFrom:ln,opacityMaterials:jn,hardware:[S,P,F]}}function Z(j){let be=j.node,Pe=be.ports||[],T=JSON.stringify(Pe);if(T===j.portKey)return;j.portKey=T,j.ports.replaceChildren();let _=[...Pe.filter(L=>L.kind!=="skill").slice(0,2),...Pe.filter(L=>L.kind==="skill").slice(0,2)].slice(0,3);for(let L of _){let ce=tt("button","in-port in-port-"+L.kind,j.ports);ce.type="button",ce.textContent=L.title,ce.title=L.kind==="artifact"?L.title+" · "+(L.availability==="file"?"打开已登记文件":"文件暂不可预览"):L.title,ce.disabled=L.kind==="artifact"&&L.availability!=="file",ce.setAttribute("aria-label",L.kind==="artifact"?"打开 "+L.title:L.kind==="delivery"?"查看文字交付":"查看技能 "+L.title),L.kind==="artifact"&&(ce.dataset.artifactId=L.id),ce.onpointerdown=Y=>{Y.stopPropagation(),Y.button===0&&ce.setPointerCapture(Y.pointerId)},ce.onpointerup=Y=>{ce.hasPointerCapture(Y.pointerId)&&ce.releasePointerCapture(Y.pointerId)},ce.onclick=Y=>{Y.stopPropagation(),L.kind==="skill"?n?n("step:"+be.stepId):r?.(be.stepId):n?.(L.id)}}if(Pe.length>_.length){let L=tt("button","in-port in-port-more",j.ports);L.type="button",L.textContent="+"+(Pe.length-_.length),L.setAttribute("aria-label","查看本阶段全部技能与交付"),L.onclick=()=>n?.("step:"+be.stepId)}if(!Pe.length){let L=tt("span","in-portMeta",j.ports);L.textContent=be.hero?"打开最终交付":be.call?.tool||be.kind==="engine"?"":be.kind==="step"?"阶段设置与交付":be.kind==="artifact"?"已登记文件":"实际执行记录",be.call?.tool&&(L.textContent=be.call.tool)}}function we(j){let be=d.positions.get(j.source),Pe=d.positions.get(j.target),T=ru(be,Pe,j.kind).map(P=>new R(P.x,P.y,P.z)),_=new Xn(T,!1,"centripetal"),L={uColor:{value:new Je(Rn.ice)},uHead:{value:0},uReveal:{value:0},uGain:{value:.2},uMotion:{value:1},uRepeats:{value:1},uScope:{value:1},uStartOffset:{value:new R},uEndOffset:{value:new R}},ce=_.getSpacedPoints(48),Y=new yt().setFromPoints(ce);Y.setAttribute("uv",new pt(ce.flatMap((P,J)=>[J/(ce.length-1),0]),2));let oe=new Sn(Y,Cd(L,.42)),F=j.kind==="sequence",V=new mt(new Yn(_,48,F?.035:.025,5,!1),Cd(L,1)),q=new mt(new Yn(_,48,F?.075:.05,4,!1),Cd(L,.15)),ee=new ti(new Wn({map:e,color:16764817,transparent:!0,depthWrite:!1,blending:Jt}));ee.scale.setScalar(.8),ee.visible=!1;let S=new $i(new yt().setAttribute("position",new pt(new Float32Array(36),3)),new Ni({color:16762251,size:.045,transparent:!0,opacity:.85,depthWrite:!1,blending:Jt,fog:!1}));return S.visible=!1,h.add(q,V,oe,ee,S),{edge:j,curve:_,line:oe,conduit:V,halo:q,runner:ee,tail:S,shared:L,length:_.getLength(),index:m.size,signature:JSON.stringify([be,Pe,j.kind])}}function me(j){for(let be of[j.line,j.conduit,j.halo,j.runner,j.tail])h.remove(be),be.isSprite||be.geometry?.dispose(),be.material.dispose()}function _e(j,be,Pe){j.curve.getPointAt(Math.max(0,Math.min(1,be)),Pe);let T=Un.smoothstep(be,0,1);return Pe.addScaledVector(j.shared.uStartOffset.value,1-T).addScaledVector(j.shared.uEndOffset.value,T),Pe}let ue=[],Ge=null,Fe=null;function nt(){ec(p),ec(f),ue=[],Ge=null,Fe=null;for(let Y of g)Y.remove();g.length=0,u.clear();let j=d.presentation,be=(d.stations||[]).filter(Y=>!j.expanded||j.level==="stage"&&Y.id===j.stageId);!j.expanded&&be.length&&(Fe=vu(d),p.add(Fe.group)),t.dataset.cockpitDeck=String(!!Fe);let Pe=[];for(let Y of be){let oe=Y.stageY-2.75,F=new mt(new an(Y.width+.25,.12,.48),new Tn({color:2438983,metalness:.78,roughness:.36}));F.position.set(Y.x,oe,Y.z-.4),p.add(F);let V=new Mn(new vi(F.geometry),new jt({color:10124646,transparent:!0,opacity:.14}));V.position.copy(F.position),p.add(V);for(let q of[-Y.width/2,Y.width/2])Pe.push(new R(Y.x+q,oe,Y.z-.3),new R(Y.x+q,oe+.5,Y.z-.3));for(let q of[-1,1]){let ee=Y.x+q*(Y.width/2+.28);Pe.push(new R(ee,oe-.12,Y.z-.6),new R(ee,oe+1.1,Y.z-.6),new R(ee,oe+1.1,Y.z-.6),new R(ee-q*.3,oe+1.4,Y.z-.6))}for(let q of[-1,1]){let ee=new mt(new an(.12,.72,.25),new Tn({color:4611432,metalness:.8,roughness:.35}));ee.position.set(Y.x+q*3.05,oe+.37,Y.z-.18),p.add(ee)}}p.add(new Mn(new yt().setFromPoints(Pe),new jt({color:10583399,transparent:!0,opacity:.21,fog:!1})));let T=new Map;if(!j.expanded)for(let Y of be)T.has(Y.row)||T.set(Y.row,[]),T.get(Y.row).push(Y);for(let Y of T.values()){let oe=[...Y].sort((P,J)=>P.x-J.x),F=oe[0],V=oe.at(-1),q=[new R(F.x-5,F.stageY-2.9,F.z-.9),...oe.map(P=>new R(P.x,P.stageY-2.9,P.z-.9)),new R(V.x+5,V.stageY-2.9,V.z-.9)],ee=new Xn(q,!1,"centripetal"),S=new mt(new Yn(ee,64,.065,6,!1),new zt({color:10206668,transparent:!0,opacity:.18,depthWrite:!1,fog:!1}));p.add(S),p.add(new Sn(new yt().setFromPoints(ee.getPoints(64)),new jt({color:10337733,transparent:!0,opacity:.32,fog:!1})))}if(T.size>1)for(let Y of[-1,1]){let oe=[...T.values()].map(V=>{let q=[...V].sort((ee,S)=>ee.x-S.x)[Y<0?0:V.length-1];return new R(q.x+Y*5,q.stageY-2.9,q.z-.9)}),F=new Xn(oe,!1,"centripetal");p.add(new mt(new Yn(F,32,.055,6,!1),new zt({color:10206668,transparent:!0,opacity:.2,depthWrite:!1,fog:!1})))}let _=d.nodes.filter(Y=>Y.origin==="activity"),L=d.byId.get(j.stageId?"step:"+j.stageId:"engine"),ce=d.positions.get(L?.id);if(j.level==="stage"&&ce){let Y=_.length?_.map(I=>({point:d.positions.get(I.id),size:_a(I)})):[{point:jl(ce,1),size:{w:10,h:2.85}}],oe=Math.min(...Y.map(I=>I.point.x-I.size.w/2))-.65,F=Math.max(...Y.map(I=>I.point.x+I.size.w/2))+.65,V=Math.min(...Y.map(I=>I.point.y-I.size.h/2))-.9,q=Math.max(...Y.map(I=>I.point.y+I.size.h/2))+.7,ee=Math.min(...Y.map(I=>I.point.z))-.8;Ge={minX:oe,maxX:F,minY:V-1.5,maxY:q+1.5,minZ:ee,maxZ:ee+1};let S=new mt(new yi(F-oe,q-V),new zt({color:2243663,transparent:!0,opacity:.09,depthWrite:!1,side:gn}));S.position.set((oe+F)/2,(V+q)/2,ee),p.add(S);let P=[new R(oe,q,ee),new R(oe,V,ee),new R(F,V,ee),new R(F,q,ee)];p.add(new Sn(new yt().setFromPoints(P),new jt({color:10729917,transparent:!0,opacity:.26,fog:!1})));let J=[new R(ce.x,ce.y-2.5,ce.z-.3),new R(ce.x,q+.6,ee),new R(ce.x,q,ee)];p.add(new Sn(new yt().setFromPoints(J),new jt({color:13873539,transparent:!0,opacity:.42,fog:!1})));let ve=(I,G)=>{let xe=tt("section",I);xe.dataset.owner=L.stepId||"__project__",xe.style.width="900px",xe.style.height=1260/(F-oe)+"px",xe.style.setProperty("--in-bay-font",300/(F-oe)+"px");let fe=new oi(xe);return fe.scale.setScalar((F-oe)/900),fe.position.set((oe+F)/2,G,ee+.25),u.add(fe),g.push(xe),xe},Ee=ve("in-executionDock",q+.8),Me=tt("div","in-bayCaption",Ee);tt("span","",Me).textContent="EXECUTION / 执行舱",tt("strong","",Me).textContent=(j.totalCalls||0)+" 个真实动作";let Ae=tt("div","in-baySkills",Ee);tt("span","in-bayKey",Ae).textContent="绑定技能";for(let I of(L.skills||[]).slice(0,5)){let G=tt("span","in-baySkill",Ae);G.textContent=I.name||I.id,G.title=I.name||I.id}L.skills?.length?L.skills.length>5&&(tt("span","in-bayEmpty",Ae).textContent="+"+(L.skills.length-5)+" 项"):tt("span","in-bayEmpty",Ae).textContent="本步骤未绑定技能";let X=ve("in-outputDock",V-.7),N=tt("div","in-bayOutputs",X);tt("span","in-bayKey",N).textContent="交付接点";let ae=(L.ports||[]).filter(I=>I.kind!=="skill");for(let I of ae.slice(0,3)){let G=tt("button","in-bayOutput",N);G.type="button",G.textContent=I.title,G.title=I.title,G.disabled=I.kind==="artifact"&&I.availability!=="file",G.setAttribute("aria-label","打开步骤交付 "+I.title),G.onpointerdown=xe=>xe.stopPropagation(),G.onclick=()=>n?.(I.id)}if(ae.length?ae.length>3&&(tt("span","in-bayEmpty",N).textContent="另有 "+(ae.length-3)+" 项 · 在交付成果中查看"):tt("span","in-bayEmpty",N).textContent=L.expected?"待交付 · "+L.expected:"本步骤尚未登记交付物",!_.length){let I=ve("in-emptyBay",(q+V)/2);tt("strong","",I).textContent="等待本步骤开始执行",tt("span","",I).textContent="真实动作将在此逐项展开"}}for(let Y=0;Y<10;Y++){let oe=new ti(new Wn({map:e,color:15378539,transparent:!0,opacity:0,depthWrite:!1,blending:Jt}));oe.scale.setScalar(.65),f.add(oe),ue.push(oe)}}function Te(j,be){if(M)return;d=j,v=be||v,w=lr(v,d),t.dataset.artDirection=Rn.version,t.dataset.sceneMode=d.artMode,t.dataset.resultHero=d.heroId||"",t.dataset.chassisLayers="2",t.dataset.networkNodes=String(d.nodes.length),t.dataset.networkRecords=String(d.counts.entities),t.dataset.networkCalls=String(d.counts.calls),t.dataset.networkLayout=vn.version,t.dataset.networkView=d.presentation.level,t.dataset.networkColumns=String(d.layout.columns),t.dataset.networkRows=String(d.layout.rows),t.dataset.networkDepth=(d.bounds.maxZ-d.bounds.minZ).toFixed(2);let Pe=[d.presentation.level,d.presentation.stageId,d.presentation.selectedId].join("|");if(Pe!==pe){pe=Pe,Le=performance.now();for(let F of y.values())F.scopeFrom=F.scopeOpacity,F.panelScaleFrom=F.panelScale;B=Math.max(B,Le+700)}let T=new Set(d.nodes.map(F=>F.id));for(let[F,V]of y)T.has(F)||(V.wrapper.remove(),l.remove(V.label),c.remove(V.group),ec(V.group),y.delete(F));let _=0;for(let F of d.nodes){let V=d.positions.get(F.id),q=d.nodes[F.displaySlot-1],ee=q&&d.positions.get(q.id),S=ee?{x:Math.sign(V.x-ee.x),y:Math.sign(V.y-ee.y)}:{x:1,y:0},P=y.get(F.id);if(P){let Ae=uu(P.node.status,F.status);Ae&&(P.signal=Ae,P.signalAt=performance.now(),P.element.dataset.signal=Ae,B=Math.max(B,P.signalAt+1150)),P.position.distanceToSquared(new R(V.x,V.y,V.z))>.001&&(P.origin=P.group.position.clone(),P.layoutAt=performance.now(),B=Math.max(B,P.layoutAt+620))}else{let Ae=performance.now()+(b?Math.min(_++,8)*32:Math.min(F.slot,22)*20);P=le(F,Ae,S),y.set(F.id,P),B=Math.max(B,Ae+1e3)}P.node=F,P.position.set(V.x,V.y,V.z),P.yaw=V.yaw||0,P.group.position.copy(P.position),P.label.position.copy(P.position).add(P.front),P.wrapper.dataset.spaceX=String(V.x),P.wrapper.dataset.spaceY=String(V.y),P.wrapper.dataset.spaceZ=String(V.z),P.element.dataset.spaceLayer=V.layer,P.element.dataset.spaceLevel=String(V.level),P.element.dataset.parentStepId=F.stepId||"",P.element.dataset.parentStepTitle=F.ownerTitle||"",P.element.dataset.childIndex=F.childIndex===void 0?"":String(F.childIndex+1),P.element.dataset.ownerSource=F.ownerSource||"",P.element.style.setProperty("--in-node","#"+new Je(Ea(F)).getHexString()),P.element.dataset.status=F.status,P.element.dataset.active=String(F.active),P.element.dataset.viewed=String(!!F.viewed),P.element.dataset.hero=String(!!F.hero),P.element.dataset.stageNumber=F.kind==="step"?String(F.index+1).padStart(2,"0"):"";let J=JSON.stringify(F.recentStatuses||[]);if(J!==P.historyKey){P.historyKey=J,P.history.replaceChildren();for(let Ae of F.recentStatuses||[]){let X=tt("i","",P.history);X.dataset.status=Ae.status}}P.seal.textContent=F.hero?F.kind==="artifact"?F.title.split(".").at(-1).toUpperCase():"TEXT":"",P.element.style.setProperty("--ion-ambient-delay",(-F.slot*.39).toFixed(2)+"s"),P.wrapper.dataset.slot=String(V.slot),P.wrapper.dataset.row=String(V.row),P.wrapper.dataset.column=String(V.column),P.element.setAttribute("aria-label",(F.kind==="step"?"第"+(F.index+1)+"步 ":F.kind==="engine"?"项目总览 ":"实际动作 ")+F.title+" · "+F.statusLabel);let ve=F.ownerIndex===null?"项目整体":String(F.ownerIndex+1).padStart(2,"0")+"."+String((F.childIndex||0)+1).padStart(2,"0");P.kind.textContent=F.hero?"FINAL / 最终交付":F.kind==="step"?String(F.index+1).padStart(2,"0")+" / 编排大步骤":F.kind==="engine"?"METIS / CONTROL":["artifact","delivery"].includes(F.kind)?"FILE / 交付成果":ve+" / "+(F.kind==="review"?"核验子动作":"执行子动作"),P.status.textContent=F.statusLabel,P.title.textContent=F.title,P.detailStatic.textContent=F.hero&&F.kind==="artifact"?(Number.isFinite(F.file?.bytes)?(F.file.bytes/1024).toFixed(1)+" KB · ":"")+"点击打开交付文档":cu(F);let Ee=d.byId.get("step:"+F.stepId),Me=w.stageMetrics.get(F.stepId);F.kind==="step"&&([Me?.skills||0,F.callCount,Me?.files||0].forEach((Ae,X)=>{P.counters[X].textContent=String(Ae).padStart(2,"0")}),P.metrics.setAttribute("aria-label",(Me?.skills||0)+" 项技能，"+F.callCount+" 个子动作，"+(Me?.files||0)+" 个可查看文件")),P.foot.textContent=F.kind==="step"?Me?.latest?"最近 · "+Me.latest.title:F.expected?"交付 · "+F.expected:"等待本步骤的执行记录":F.kind==="engine"?d.counts.stages+" 个大步骤 / "+d.counts.calls+" 次实际调用":Ee?"所属 · 第"+(Ee.index+1)+"步 "+Ee.title:"所属 · 项目整体（未记录具体步骤）",P.foot.title=P.foot.textContent,P.solid.material[0].color.setHex(F.active?4535595:F.hero?1522491:F.kind==="step"?1582901:["artifact","delivery"].includes(F.kind)?1781804:1320245),P.edge.material.color.setHex(Ea(F)),P.glow.material.color.setHex(Ea(F)),Z(P)}let L=new Set(d.circuitEdges.map(F=>F.id));for(let[F,V]of m)L.has(F)||(me(V),m.delete(F));for(let F of d.circuitEdges){let V=m.get(F.id),q=JSON.stringify([d.positions.get(F.source),d.positions.get(F.target),F.kind]);V&&V.signature!==q&&(me(V),m.delete(F.id)),m.has(F.id)?m.get(F.id).edge=F:m.set(F.id,we(F))}let ce=JSON.stringify([d.presentation.key,Ke(),(d.stations||[]).map(F=>[F.id,F.x,F.z,F.stageY,w.stageMetrics.get(F.id)?.skills,F.callCount,d.byId.get("step:"+F.id)?.status])]);ce!==A&&(A=ce,nt());let Y=d.presentation.level==="action"?"terminal":"floating";Y!==Ce&&(Ce=Y,H=new Sa(Ce==="terminal"?120:42),ge="",ke=""),D.dataset.mode=Ce;let oe=du(d,v);if(oe){K=oe.nodeId,Ie=0,D.dataset.closing="false",D.hidden=!k,D.dataset.state=oe.status;let F=d.byId.get("step:"+d.byId.get(oe.nodeId)?.stepId);U.textContent=(F?"第"+(F.index+1)+"步 · "+F.title+" / ":"项目整体 / ")+oe.title,U.title=U.textContent,D.dataset.parentStepId=F?.stepId||"",D.dataset.actionId=oe.nodeId,t.dataset.liveWindow=String(k);let V=lu(oe,v?.live),q=["running","waiting","processing"].includes(oe.status);if(V&&q&&v?.live?.entries?.some(P=>V.matches(P)))H.ingest(v.live,V);else if(oe.key!==ge||H.key!=="summary:"+oe.nodeId){H.reset("summary:"+oe.nodeId);for(let P of oe.lines)H.append(P+`
`,"status");q||(H.position=H.lines.length)}if(ge=oe.key,Q.textContent=Ce==="terminal"&&!["running","waiting","processing"].includes(oe.status)?"RECORDED / "+(d.byId.get(oe.nodeId)?.statusLabel||oe.status):{stdout:"STDOUT / LIVE",stderr:"STDERR / LIVE",log:"CONSOLE / LIVE",assistant:"MODEL / PUBLIC",receipt:"TOOL / OUTPUT"}[H.source]||"LIVE / STATUS",te!==K){let P=y.get(te);P&&(P.element.dataset.streaming="false",P.cardTape.replaceChildren()),te=K,ke=""}let S=H.key+"|"+H.revision+"|"+K;if(S!==ke){let P=!!ke;ke=S;let J=y.get(K);Ue($,"in-streamLine",P),J&&Ue(J.cardTape,"in-cardStreamLine",P),D.dataset.update=String(Number(D.dataset.update||0)+1),B=Math.max(B,performance.now()+700)}}else K&&(Ie=performance.now()+180,B=Math.max(B,Ie),D.dataset.closing="true"),K=null,ge="",t.dataset.liveWindow="false";t.dataset.matrixAdditions=String(_),b=!0}function Ke(){let j=d.byId.get(d.presentation.stageId?"step:"+d.presentation.stageId:"engine");return[j?.skills,j?.ports,j?.expected]}function O(j,be){return Oe.copy(j),i.localToWorld(Oe),Oe.project(be),Oe.z>-1&&Oe.z<1&&Math.abs(Oe.x)<1.3&&Math.abs(Oe.y)<1.35}function bt(j,be,Pe){if(!d||M)return!1;t.dataset.reducedMotion=String(be);let T=performance.now(),_=!!d.activeId,L=v?.phase==="processing"?v.live?.active?.stepId||v.currentStepId:null;Fe?.render(j,be);for(let S of y.values()){let P=ou(T-S.born,S.direction,be),J=S.position,ve=be?1:Jr((T-S.layoutAt)/620),Ee=S.origin?Un.lerp(S.origin.x,J.x,ve):J.x,Me=S.origin?Un.lerp(S.origin.y,J.y,ve):J.y,Ae=S.origin?Un.lerp(S.origin.z,J.z,ve):J.z;ve===1&&(S.origin=null);let X=be?$r(j,S.node.slot,!0):S.frozenPose||$r(j,S.node.slot);S.lastIdlePose=X;let N=!d.presentation.expanded&&S.node.kind==="step";for(let Wt of S.hardware)Wt.visible=!N;let ae=N?es:1;S.panelScale=Un.lerp(S.panelScaleFrom??ae,ae,be?1:Jr((T-Le)/620));let I=tu(T-S.signalAt,S.signal,be),G=P.scale*I.scale*S.panelScale;S.group.position.set(Ee+P.x+X.x,Me+P.y+X.y,Ae+X.z+I.lift),S.group.rotation.set(X.rx,S.yaw+X.ry,0),S.group.scale.set(G,G,1),S.label.position.copy(S.front).applyQuaternion(S.group.quaternion).add(S.group.position),S.label.rotation.copy(S.group.rotation),S.label.scale.set(S.size.w/340*G,S.size.h/200*G,1),S.signal&&T-S.signalAt>1150&&(S.signal=null,delete S.element.dataset.signal);let xe=Ad(S.node,d.presentation),fe=be?1:Jr((T-Le)/500);S.scopeOpacity=Un.lerp(S.scopeFrom??xe,xe,fe);let We=P.opacity*S.scopeOpacity,Xe=xe<1,Be=_&&d.presentation.level==="stage"&&S.node.origin==="activity"&&S.node.id!==d.activeId,ut=O(J,Pe)&&We>.005;S.onScreen=ut,S.group.visible=ut,S.label.visible=ut,S.wrapper.style.opacity=String(We*(Be?.72:1)),S.wrapper.inert=xe<1,S.wrapper.dataset.contextHidden=String(xe===0),S.wrapper.dataset.contextDim=String(Xe),S.element.dataset.lod=Xe?"context":"detail";for(let{material:Wt,base:Ut,depthWrite:Qt}of S.opacityMaterials)Wt.transparent=We<.999||Ut<1,Wt.opacity=Ut*We,Wt.depthWrite=We>.99&&Qt;S.element.dataset.arriving=String(P.moving),S.element.dataset.impact=String(P.pulse>.1);let st=S.node.id===x||S.node.id===C||S.node.viewed;S.element.dataset.streaming=String(S.node.id===K&&H.lines.length>0);let Mt=S.signal==="complete"?Math.max(0,1-(T-S.signalAt)/1e3)*.26:0,Ct=be?0:.5+.5*Math.sin(j*1.3+S.node.slot*.7),It=S.node.active||S.node.kind==="step"&&S.node.stepId===L&&S.node.status!=="submitted";S.element.dataset.active=String(!!It),S.solid.material[0].emissiveIntensity=It?.34:.18,S.element.dataset.related=String(!!st),S.edge.material.opacity=(It?.95:S.node.hero?.9:st?.78:.42+Ct*.07)*S.scopeOpacity,S.glow.material.opacity=(It?be?.18:.14+Math.sin(j*2.6)*.025:P.pulse*.12+Mt+I.light*.08+(S.node.hero?.08:st?.06:.008+Ct*.006))*S.scopeOpacity}let ce=null,Y=0,oe=0;for(let S of m.values()){let P=y.get(S.edge.target),J=y.get(S.edge.source);if(!P||!J)continue;let ve=S.edge.kind==="sequence",Ee=ve&&P.node.kind==="step"&&P.node.stepId===L&&P.node.status!=="submitted",Me=!!P.node.active||Ee,Ae=[x,C].some(xe=>xe&&(P.node.id===xe||J.node.id===xe)),X=["submitted","succeeded","passed","recorded"].includes(P.node.status),N=P.node.status==="waiting",ae=Jp({time:j,index:S.index,length:S.length,age:T-P.born,signal:P.signal,signalAge:T-P.signalAt,active:Me,waiting:N,complete:X,highlight:Ae,reduced:be}),I=S.shared;I.uHead.value=ae.progress,I.uReveal.value=ae.reveal,I.uGain.value=ae.gain,I.uMotion.value=be?0:1,I.uRepeats.value=ae.repeats,I.uColor.value.setHex(Me?Rn.copper:X?Rn.complete:Rn.ice),I.uStartOffset.value.copy(J.group.position).sub(J.position),I.uEndOffset.value.copy(P.group.position).sub(P.position);let G=Math.min(J.scopeOpacity,P.scopeOpacity);if(I.uScope.value=G,S.line.geometry.setDrawRange(0,ae.reveal<=0?0:Math.max(2,Math.ceil(S.line.geometry.attributes.position.count*ae.reveal))),S.line.visible=S.conduit.visible=S.halo.visible=G>.005,S.runner.visible=!be&&ae.reveal>0&&G>.005,S.tail.visible=S.runner.visible,ae.moving&&G>.005&&Y++,ae.execution&&G>.005&&oe++,S.runner.visible){_e(S,ae.progress,S.runner.position),S.runner.material.color.copy(I.uColor.value),S.runner.material.opacity=ae.gain*.72,S.runner.scale.setScalar(Me?.65:Ae?.58:.43),S.tail.material.color.copy(I.uColor.value),S.tail.material.opacity=ae.gain*.45;let xe=S.tail.geometry.attributes.position,fe=ae.mode==="receipt"?-1:1;for(let We=0;We<12;We++)_e(S,ae.progress-fe*We*.014,lt),xe.setXYZ(We,lt.x,lt.y,lt.z);xe.needsUpdate=!0}if(!ce&&G>.005&&(ve&&J.node.kind==="step"||d.presentation.expanded)&&O(_e(S,.5,lt),Pe)){let xe=fe=>(_e(S,fe,He),i.localToWorld(He),He.project(Pe),{x:(He.x+1)*t.clientWidth/2,y:(1-He.y)*t.clientHeight/2});ce={id:S.edge.id,mode:ae.mode,progress:ae.progress,length:S.length,moving:ae.moving,points:[.2,.35,.5,.65,.8].map(xe),head:xe(ae.progress)}}}t.__metisConnectionProbe=ce,t.dataset.connectionStyle="optical",t.dataset.flowingConnections=String(Y),t.dataset.executingConnections=String(oe);let F=d.byId.get(d.activeId),V=F&&Ma(F,d.presentation)>0?d.positions.get(d.activeId)||d.positions.get("step:"+F.stepId):null;for(let S=0;S<ue.length;S++){let P=ue[S];if(P.visible=_&&!be&&!!V,!P.visible)continue;let J=S%2?1:-1,ve=(j*.24+S*.17)%1;P.position.set(V.x+J*ve*6,V.y-1.8+S%3*.11,V.z+(S<5?-1:1)*ve*4),P.material.opacity=Math.sin(Math.PI*ve)*.28}!K&&Ie&&(be||T>=Ie)&&(D.hidden=!0,Ie=0);let q=H.frame(T,be);t.dataset.streamLines=String(q.totalLines),t.dataset.streamMoving=String(q.moving&&!!K),D.dataset.flow=String(!be&&q.moving&&!!K);let ee=Ce==="terminal";if(ee?($.style.transform="none",D.dataset.flow==="true"&&(re.scrollTop=Math.max(0,q.position*18-re.clientHeight))):$.style.transform="translate3d(0,"+(-Math.max(0,q.position-(t.clientHeight<700?3:6))*18).toFixed(2)+"px,0)",K){let S=y.get(K);if(S&&(S.onScreen||ee)&&k){He.set(S.size.w/2,S.size.h/2,.3).applyQuaternion(S.group.quaternion).add(S.group.position),i.localToWorld(He),He.project(Pe);let P=t.clientWidth,J=t.clientHeight,ve=(He.x+1)*P/2,Ee=(-He.y+1)*J/2,Me=Math.max(12,Math.min(P-310,ve+310<P?ve+20:ve-320)),Ae=Math.max(175,Math.min(J-210,Ee));D.hidden=!1,D.style.transform=ee?"none":"translate3d("+Math.round(Me)+"px,"+Math.round(Math.max(95,Ae))+"px,0)",D.dataset.reduced=String(be),D.dataset.compact=String(J<700),D.style.opacity=".94",S.cardTape.style.transform="translate3d(0,"+(-Math.max(0,q.position-2)*18).toFixed(2)+"px,0)"}else D.hidden=!0}return t.dataset.networkLod=Pe.position.distanceTo(i.position)>42?"map":"detail",!be&&(_||T<B||q.moving&&!!K)}function Qe(j){let be=y.has(j)?j:y.has("step:"+j)?"step:"+j:d?.byId.get(j)?.stepId?"step:"+d.byId.get(j).stepId:null;return be?d?.positions.get(be):null}function ct(j){if(!d?.presentation.expanded)return null;let be=d.presentation,Pe=be.level==="action",T=Pe?[d.byId.get(be.selectedId)]:d.nodes.filter(L=>Ma(L,be)===1),_=gu(T.filter(L=>d.positions.has(L?.id)).map(L=>({point:d.positions.get(L.id),size:_a(L)})));if(!_)return null;if(!Pe&&Ge)for(let L of["X","Y","Z"])_["min"+L]=Math.min(_["min"+L],Ge["min"+L]),_["max"+L]=Math.max(_["max"+L],Ge["max"+L]);return{x:(_.minX+_.maxX)/2,y:(_.minY+_.maxY)/2,z:(_.minZ+_.maxZ)/2,w:_.maxX-_.minX,h:_.maxY-_.minY,bounds:_,action:Pe}}function Se(j){let be=d?.byId.get(y.has(j)?j:y.has("step:"+j)?"step:"+j:j);return be?be.stepId||"__project__":null}return{update:Te,render:bt,bounds:()=>d?.presentation.expanded?d.bounds:Ql(d),position:Qe,focusFrame:ct,scope:Se,followKey:j=>$p(d,j),preview:j=>{x=j&&y.has(j)?j:null,a()},size:j=>(y.get(j)||y.get("step:"+j))?.size||_a(),latest:()=>d?.latestId,active:()=>d?.activeId,has:j=>!!Qe(j),focus:j=>{C=y.has(j)?j:"step:"+j,a()},showLive:j=>{k=!!j,k||(D.hidden=!0),t.dataset.liveWindow=String(k&&!!K),a()},animating:()=>performance.now()<B,dispose(){if(!M){M=!0,D.remove();for(let j of y.values())j.wrapper.remove();for(let j of g)j.remove();ec(o),l.clear(),u.clear(),i.remove(o,l,u),y.clear(),m.clear(),ue=[],delete t.__metisConnectionProbe;for(let j of["cockpitDeck","connectionStyle","flowingConnections","executingConnections","artDirection","sceneMode","resultHero","chassisLayers","networkNodes","networkRecords","networkCalls","networkColumns","networkRows","networkLayout","networkDepth","liveWindow","matrixAdditions","networkLod","reducedMotion","streamLines","streamMoving","followTarget","followMode","cameraDistance"])delete t.dataset[j]}}}}var wu=`
float flightNoise(vec2 p){
 vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),f.x),mix(hash21(i+vec2(0.,1.)),hash21(i+1.),f.x),f.y);
}
float flightCloud(vec2 p){
 float v=0.,a=.5;
 for(int i=0;i<4;i++){v+=a*flightNoise(p);p=mat2(.8,-.6,.6,.8)*p*2.07+vec2(11.7,4.2);a*=.5;}
 return v;
}
vec3 cockpitSky(vec2 uv,vec2 pointer,float clock,float aspect,vec2 heading){
 vec2 screen=(uv-.5)*vec2(aspect,1.);
 vec2 space=screen+pointer*.012+heading*.12;
 float cloud=flightCloud(space*2.7+vec2(clock*.009,-clock*.004));
 float filament=exp(-pow((space.y+.26*space.x-.12+sin(space.x*2.3)*.075)*3.7,2.));
 vec3 sky=vec3(.004,.009,.018)+vec3(.008,.026,.043)*cloud;
 sky+=vec3(.014,.038,.054)*filament*cloud;
 sky+=vec3(.032,.019,.009)*pow(flightCloud(space*3.1+vec2(5.4,clock*.005)),2.);
 for(int i=0;i<3;i++){
  float layer=float(i),scale=68.+layer*67.;
  vec2 sp=space*scale/(1.+mod(clock*.0025,1.)*(.018+layer*.012))+vec2(clock*.014*(layer+1.),0.);
  vec2 cell=floor(sp),d=fract(sp)-.5;
  float seed=hash21(cell+layer*83.);
  d-=vec2(hash21(cell+19.),hash21(cell+37.))*.34-.17;
  float present=step(uResolution.x<700.?.9994:.9968,seed);
  float star=(exp(-dot(d,d)*1500.)+exp(-dot(d,d)*70.)*.055)*present;
  float twinkle=.84+.16*sin(clock*.55+seed*237.);
  sky+=mix(vec3(.38,.62,.83),vec3(.95,.78,.55),hash21(cell+8.))*star*twinkle*(1.7-layer*.32);
 }
 vec2 lens=(screen-vec2(.10,.22))*vec2(.94,2.9);
 float radius=length(lens),angle=atan(lens.y,lens.x),dust=flightCloud(vec2(angle*4.+clock*.013,radius*19.));
 float arc=exp(-abs(radius-.47)*42.)*smoothstep(-.08,.11,screen.y-.22);
 float filamentArc=exp(-abs(radius-.468-sin(angle*19.+clock*.025)*.0014)*230.)*smoothstep(-.08,.12,screen.y-.22);
 float ribbon=exp(-abs(screen.y-.22+.017*sin(screen.x*7.))*110.)*exp(-pow(screen.x*.7,2.));
 sky+=vec3(.17,.13,.08)*arc*(.35+dust*.65);
 sky+=vec3(.29,.23,.14)*filamentArc*(.3+flightNoise(vec2(angle*72.+clock*.06,radius*83.))*.7);
 sky+=vec3(.11,.17,.21)*ribbon*(.35+dust*.55);
 float horizon=exp(-pow((screen.y+.31)*24.,2.));
 sky+=vec3(.012,.039,.052)*horizon;
 sky*=1.-smoothstep(.20,1.25,length(screen*vec2(.58,1.)))*.62;
 return sky;
}`;var xv=["varying vec2 vUv;","void main(){","vUv=position.xy*.5+.5;","gl_Position=vec4(position.xy,.999,1.0);","}"].join(`
`),bv=["precision highp float;","varying vec2 vUv;","uniform mat4 uClipToBoard;","uniform float uAspect;","uniform float uSpatial;","uniform float uPanorama;","uniform vec2 uResolution;","uniform vec2 uHeading;","uniform float uTime;","uniform float uActivity;","uniform vec2 uPointer;","uniform vec2 uFocus;","uniform vec2 uPulse;","uniform float uPulseAge;","float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}",wu,"float rule(float distance,float width){float footprint=fwidth(distance);return (1.0-smoothstep(width,width+max(footprint,.001),distance))*(1.0-smoothstep(.08,.35,footprint));}","void main(){","if(uPanorama>.999){gl_FragColor=vec4(cockpitSky(vUv,uPointer,uTime,uAspect,uHeading),1.);return;}","vec2 ndc=vUv*2.-1.;","vec4 near4=uClipToBoard*vec4(ndc,-1.,1.);","vec4 far4=uClipToBoard*vec4(ndc,1.,1.);","vec3 origin=near4.xyz/near4.w;","vec3 ray=far4.xyz/far4.w-origin;","float axis=mix(ray.z,ray.y,uSpatial);","float denominator=(axis<0.?-1.:1.)*max(abs(axis),.0001);","float rayT=clamp((mix(-.19,-3.8,uSpatial)-mix(origin.z,origin.y,uSpatial))/denominator,-2000.,2000.);","vec3 hit=origin+ray*rayT;","vec2 p=clamp(mix(hit.xy,hit.xz,uSpatial),vec2(-4000.),vec2(4000.));","vec2 screen=(vUv-.5)*vec2(uAspect,1.);","vec2 q=p/mix(4.6,8.0,uSpatial);","float groundFade=1.0-smoothstep(.12,.75,max(length(dFdx(p)),length(dFdy(p))));","vec2 tile=floor(q),cell=fract(q);","float h=hash21(tile);","float gridFine=rule(min(abs(fract(p.x/.65)-.5),abs(fract(p.y/.65)-.5)),.006);","float gridMajor=rule(min(abs(fract(q.x)-.5),abs(fract(q.y)-.5)),.0028);","float routeY=.22+floor(h*3.0)*.17;","float horizontal=rule(abs(cell.y-routeY),.0019)*step(.12,cell.x)*step(cell.x,.82);","float vertical=rule(abs(cell.x-.82),.0019)*step(routeY,cell.y)*step(cell.y,routeY+.12);","float diagonal=rule(abs((cell.x-.82)+(cell.y-routeY-.12)),.0027)*step(.65,cell.x)*step(cell.x,.82)*step(routeY+.12,cell.y)*step(cell.y,routeY+.29);","float etch=max(horizontal,max(vertical,diagonal));","float via=rule(abs(length(cell-vec2(.12,routeY))-.010),.002);","float bus=rule(abs(fract((p.x+.08)/6.6)-.5),.0017)+rule(abs(fract((p.x-.08)/6.6)-.5),.00065);","float scan=pow(max(0.,1.-abs(fract((p.y+p.x*.22)*.031-uTime*.19)-.5)*2.),12.);","float flux=pow(max(0.,1.-abs(fract(p.x*.055-p.y*.016-uTime*.28)-.5)*2.),18.);","float pathFlow=pow(max(0.,1.-abs(fract(cell.x-h-uTime*.65)-.5)*2.),7.)*horizontal;","float sweep=exp(-pow((vUv.x+vUv.y*.32-fract(uTime*.095)*1.75+.25)*6.,2.));","vec2 focusDelta=(p-uFocus-uPointer*1.3)*vec2(.9,1.35);","float halo=exp(-dot(focusDelta,focusDelta)*.009);","vec2 drift=vec2(sin(uTime*.24)*.12,cos(uTime*.19)*.09);","float violet=exp(-dot(screen-vec2(.4,-.22)-drift,screen-vec2(.4,-.22)-drift)*2.3);","float warm=exp(-dot(screen-vec2(-.55,.22)+drift,screen-vec2(-.55,.22)+drift)*3.2);","float pulseDistance=abs(p.x-uPulse.x)+abs(p.y-uPulse.y)*1.35;","float pulse=rule(abs(pulseDistance-uPulseAge*9.),.075)*exp(-uPulseAge*1.12)*step(0.,uPulseAge);","float grain=hash21(floor(gl_FragCoord.xy))-.5;","float restraint=mix(1.0,.16,uSpatial)*groundFade;","vec3 base=mix(vec3(.024,.026,.043),vec3(.012,.016,.027),uSpatial);","base+=(vec3(.013,.010,.031)*violet+vec3(.035,.015,.006)*warm)*mix(1.,.42,uSpatial);","float lightSheet=exp(-abs(screen.x*.62+screen.y+.12-sin(uTime*.08)*.025)*11.);","float warmSheet=exp(-abs(screen.x*.72+screen.y-.43)*23.);","base+=(vec3(.007,.017,.025)*lightSheet+vec3(.016,.010,.004)*warmSheet)*uSpatial;","base+=(vec3(.027,.020,.026)*gridFine*.20+vec3(.071,.040,.033)*gridMajor)*restraint;","vec3 copper=vec3(.42,.20,.105);","base+=copper*(etch*.24+via*.32+bus*.085)*restraint;","base+=copper*(scan*.9+flux*.42)*(etch+bus*.6)*(.7+uActivity*.55)*restraint;","base+=vec3(.65,.38,.17)*pathFlow*(.7+uActivity*.3)*restraint;","base+=vec3(.028,.016,.012)*sweep*mix(1.,.28,uSpatial);","base+=vec3(.19,.095,.040)*halo*(.045+uActivity*.065)*mix(1.,.3,uSpatial);","base+=vec3(.30,.15,.075)*pulse*(.08+etch*.9+bus*.32)*restraint;","base+=grain*mix(.002,.0005,uSpatial);","if(uPanorama>.001)base=mix(base,cockpitSky(vUv,uPointer,uTime,uAspect,uHeading),uPanorama);","gl_FragColor=vec4(base,1.);","}"].join(`
`);function Su({scene:i,board:e,host:t}){let n={uClipToBoard:{value:new ht},uAspect:{value:1},uSpatial:{value:0},uPanorama:{value:0},uResolution:{value:new ye},uHeading:{value:new ye},uTime:{value:0},uActivity:{value:.08},uPointer:{value:new ye},uFocus:{value:new ye},uPulse:{value:new ye},uPulseAge:{value:100}},r=new yi(2,2),s=new kt({uniforms:n,vertexShader:xv,fragmentShader:bv,depthWrite:!1,depthTest:!1,toneMapped:!1}),a=new mt(r,s);a.frustumCulled=!1,a.renderOrder=-1e4,i.add(a);let o=new ht,l=new R,c=matchMedia("(pointer: coarse)").matches,h=.08,p=.08,f=-100,u=!1,g=0,y=0;return t.dataset.atmosphere="ion-flight-window-v1",{update(m,d){p=hu(m),n.uSpatial.value=m?.kind==="project"?1:0,y=m?.kind==="project"&&!m.network?.presentation.expanded?1:0,d&&n.uFocus.value.set(d.x,n.uSpatial.value?d.z:d.y)},pointer(m){n.uPointer.value.set(c?0:m.x,c?0:m.y)},pulse(m,d){m&&(n.uPulse.value.set(m.x,n.uSpatial.value?m.z:m.y),f=d,t.dataset.atmosphereImpulse=String(Number(t.dataset.atmosphereImpulse||0)+1))},render(m,d,v,w){u||(h+=(p-h)*Math.min(1,d*3),g=v?y:g+(y-g)*Math.min(1,d*4.5),n.uPanorama.value=g,n.uResolution.value.set(t.clientWidth,t.clientHeight),w.getWorldDirection(l),n.uHeading.value.set(l.x,l.y),n.uActivity.value=h,n.uTime.value=v?0:m,n.uPulseAge.value=v?100:m-f,n.uAspect.value=w.aspect,n.uClipToBoard.value.copy(o.copy(e.matrixWorld).invert()).multiply(w.matrixWorld).multiply(w.projectionMatrixInverse),t.dataset.ambientMotion=String(!v),t.dataset.panoramaBlend=g.toFixed(3))},dispose(){u||(u=!0,i.remove(a),r.dispose(),s.dispose(),delete t.dataset.atmosphere,delete t.dataset.atmosphereImpulse,delete t.dataset.ambientMotion,delete t.dataset.panoramaBlend)}}}var vv={submitted:8838585,working:16750169,checking:13873663,needs_revision:16764018,needs_recheck:16764018,blocked:16093826,passed:11002045,not_started:9987929,configured:11762782,incomplete:16761980},Rd=i=>i.active?16757613:i.viewed?16759942:vv[i.status]||9987929;function yv(){let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);for(let[n,r]of[[0,"#fffce8"],[.08,"#ffd3a9"],[.23,"#ff965bb8"],[.5,"#ff58222b"],[1,"#ff451000"]])t.addColorStop(n,r);return e.fillStyle=t,e.fillRect(0,0,128,128),new ks(i)}function Mu(i,e){i.traverse(t=>{t.geometry?.dispose();for(let n of Array.isArray(t.material)?t.material:[t.material])n&&!e.has(n)&&n.dispose()})}function Id({host:i,compactHud:e=!1,onPick:t,onEntity:n,onFocusChat:r,onState:s,onError:a,onReorder:o,onBindSkill:l,onToggleLoop:c,onAddAfter:h,onOpenArtifact:p,onSkillInspect:f}){let u=new Ul({alpha:!1,antialias:!0,powerPreference:"high-performance"});u.setClearColor(526866),u.outputColorSpace=hn,u.toneMapping=ir,u.toneMappingExposure=1.06,u.domElement.className="ion-gl",u.domElement.setAttribute("aria-hidden","true"),i.appendChild(u.domElement);let g=new Vl;g.domElement.className="ion-labels",i.appendChild(g.domElement);let y=new Ms;y.background=new Je(526866),y.fog=new Ss(526866,.008);let m=new sn(35,1,.1,130),d=new Hl(m,i);d.enableDamping=!0,d.dampingFactor=.085,d.minDistance=6,d.maxDistance=55,d.maxPolarAngle=Math.PI*.66,d.minPolarAngle=Math.PI*.27,d.maxAzimuthAngle=.8,d.minAzimuthAngle=-.8;let v=new Xl(u);v.addPass(new Yl(y,m));let w=new Kr(new ye(800,580),.44,.62,.82),x=new ql;v.addPass(w),v.addPass(x),y.add(new Zs(11981275,330514,.7));let C=new zr(16761748,1.15);C.position.set(-14,18,22),y.add(C);let A=new zr(8632534,1.3);A.position.set(16,13,-14),y.add(A);let b=new Js(16734510,12,25);b.position.set(-5,-1,5),y.add(b);let M=new At;M.rotation.set(-.025,.035,-.065),y.add(M);let B=new Tn({color:1774106,metalness:.3,roughness:.65}),k=new Tn({color:9128499,metalness:.5,roughness:.6}),D=new Set([B,k]),W=Su({scene:y,board:M,host:i}),se=new At,U=new At,Q=new At,re=new At;M.add(se,U,Q,re);let $=yv(),he=new Map,H=document.createElement("button");H.type="button",H.className="ion-engine",H.setAttribute("aria-label","进入研究助手");let ge=document.createElement("strong"),K=document.createElement("span");ge.textContent="METIS",K.textContent="RESEARCH ENGINE",H.append(ge,K),H.addEventListener("pointerdown",X=>X.stopPropagation()),H.onclick=()=>r?.();let Ie=new oi(H);Ie.scale.setScalar(.014),re.add(Ie);let ke=800,te=580,Ce=!1,pe={nodes:[],activeCalls:[]},Le="",Re="",Ue=0,lt=0,Oe=0,He=!1,le=!0,Z=!1,we=!1,me=null,_e=null,ue=!0,Ge=null,Fe="",nt=!1,Te=null,Ke=!1,O=matchMedia("(prefers-reduced-motion: reduce)").matches,bt="",Qe="",ct="";d.enableDamping=!O;let Se=new R;function j(X){let N=Math.min(X||1,ke>=1450&&X>9?4:ke>=760?3:2);return{columns:N,rows:Math.ceil(X/N),gapX:5.25,gapY:3.35}}function be(X){let{columns:N,rows:ae,gapX:I,gapY:G}=j(X);return Array.from({length:X},(xe,fe)=>{let We=Math.floor(fe/N),Xe=We%2?N-1-fe%N:fe%N;return new R((Xe-(N-1)/2)*I,(ae-1)*G/2-We*G-.9,0)})}function Pe(X){let N=document.createElement("button");N.type="button",N.className="ion-chip",N.dataset.sceneStep=X;let ae=document.createElement("div");ae.className="ion-chip-head";let I=document.createElement("span");I.className="ion-chip-index";let G=document.createElement("span");G.className="ion-chip-state",ae.append(I,G);let xe=document.createElement("strong");xe.className="ion-chip-title";let fe=document.createElement("span");fe.className="ion-chip-purpose";let We=document.createElement("span");We.className="ion-chip-foot";let Xe=document.createElement("span");return Xe.className="ion-chip-face",Xe.append(ae,xe,fe,We),N.append(Xe),N.addEventListener("pointerdown",Be=>Be.stopPropagation()),N.onclick=()=>{ue=!1,s?.({follow:ue}),q(X),t?.(X)},N.addEventListener("dragstart",Be=>{if(!pe.editable){Be.preventDefault();return}Be.dataTransfer.setData("application/x-metis-step",X),Be.dataTransfer.effectAllowed="move",N.dataset.dragging="true"}),N.addEventListener("dragend",()=>{delete N.dataset.dragging;for(let Be of he.values())delete Be.card.element.dataset.drop}),N.addEventListener("dragover",Be=>{!pe.editable||![...Be.dataTransfer.types].some(ut=>ut==="application/x-metis-step"||ut==="application/x-metis-skill")||(Be.preventDefault(),Be.stopPropagation(),N.dataset.drop=[...Be.dataTransfer.types].includes("application/x-metis-skill")?"skill":Be.clientY<N.getBoundingClientRect().y+N.getBoundingClientRect().height/2?"before":"after",Be.dataTransfer.dropEffect=N.dataset.drop==="skill"?"copy":"move")}),N.addEventListener("dragleave",Be=>{N.contains(Be.relatedTarget)||delete N.dataset.drop}),N.addEventListener("drop",Be=>{if(!pe.editable)return;let ut=Be.dataTransfer.getData("application/x-metis-skill"),st=Be.dataTransfer.getData("application/x-metis-step"),Mt=N.dataset.drop||"before";delete N.dataset.drop,!(!ut&&!st)&&(Be.preventDefault(),Be.stopPropagation(),ut?l?.(X,ut):st!==X&&o?.(st,X,Mt))}),N.addEventListener("keydown",Be=>{if(!pe.editable||!Be.altKey||!["ArrowUp","ArrowDown"].includes(Be.key))return;let ut=pe.nodes.findIndex(Mt=>Mt.id===X),st=pe.nodes[ut+(Be.key==="ArrowUp"?-1:1)];st&&(Be.preventDefault(),Be.stopPropagation(),o?.(X,st.id,Be.key==="ArrowUp"?"before":"after"))}),{element:N,index:I,state:G,title:xe,purpose:fe,foot:We}}function T(X){let N=document.createElement("div");N.className="ion-nodePorts",N.setAttribute("role","group"),N.setAttribute("aria-label","步骤技能、循环与交付"),N.addEventListener("pointerdown",xe=>xe.stopPropagation());let ae=new oi(N);ae.scale.setScalar(.014),re.add(ae);let I=document.createElement("button");I.type="button",I.className="ion-nodeInsert",I.textContent="+",I.setAttribute("aria-label","在此步骤后新增步骤"),I.addEventListener("pointerdown",xe=>xe.stopPropagation()),I.onclick=()=>h?.(X);let G=new oi(I);return G.scale.setScalar(.014),re.add(G),{element:N,label:ae,add:I,action:G}}function _(X){let N=X.node,ae=N.skills||[],I=N.artifacts||[],G=JSON.stringify([N.loop,ae.map(fe=>[fe.id,fe.name]),I.map(fe=>[fe.index,fe.name,fe.availability]),N.output?.format,pe.editable]);if(X.card.element.draggable=!!pe.editable,X.card.element.setAttribute("aria-keyshortcuts",pe.editable?"Alt+ArrowUp Alt+ArrowDown":""),X.ports.action.visible=!!pe.editable&&N.viewed,X.loopTrace.visible=N.loop===!0,X.portSignature===G)return;X.portSignature=G,X.ports.element.replaceChildren();let xe=(fe,We,Xe,Be,ut=!1)=>{let st=document.createElement("button");return st.type="button",st.className="ion-port ion-port-"+We,st.textContent=fe,st.title=Xe,st.disabled=ut,st.onclick=Mt=>{Mt.stopPropagation(),Be?.()},X.ports.element.appendChild(st),st};(N.loop||pe.kind==="mode")&&xe(N.loop?"↻ 达标循环":"↻ 循环","loop",N.loopCriteria||"未达标时继续本步；点此设置",()=>pe.editable?c?.(N.id):t?.(N.id),pe.kind==="mode"&&!pe.editable);for(let fe of ae.slice(0,2)){let We=xe(fe.name,"skill",fe.name+" · "+fe.id,()=>f?.(N.id,fe.id));We.dataset.skillId=fe.id}ae.length>2&&xe("+"+(ae.length-2)+" 技能","skill","查看本步全部技能",()=>t?.(N.id));for(let fe of I.slice(0,2)){let We=xe(fe.name,"artifact",fe.path,()=>p?.(N.id,fe.index,fe),fe.availability!=="file");We.dataset.artifactIndex=String(fe.index)}I.length>2&&xe("+"+(I.length-2)+" 交付","artifact","查看本步全部交付物",()=>t?.(N.id)),N.output?.format&&N.output.format!=="auto"&&xe(N.output.format.toUpperCase(),"output","最终输出目标，点此编辑",()=>t?.(N.id))}function L(X,N){let ae=N.x-X.x,I=ae>=0?1:-1,G=Math.abs(N.y-X.y)<.5,xe=X.clone().add(new R(G?I*2.35:0,G?0:-1.25,.03)),fe=N.clone().add(new R(G?-I*2.35:0,G?0:1.25,.03)),We=G?[xe,xe.clone().add(new R(I*.18,0,0)),xe.clone().add(new R(I*.27,-.25,0)),fe.clone().add(new R(-I*.27,-.25,0)),fe.clone().add(new R(-I*.18,0,0)),fe]:[xe,xe.clone().add(new R(.45,-.17,0)),fe.clone().add(new R(.45,.17,0)),fe];return new Xn(We,!1,"centripetal")}function ce(){for(let ae of he.values())ae.card.element.remove(),ae.ports.element.remove(),ae.ports.add.remove(),re.remove(ae.label,ae.ports.label,ae.ports.action);he.clear();for(let ae of[se,U,Q])Mu(ae,D),ae.clear();let X=be(pe.nodes.length),N=j(pe.nodes.length);Ie.position.set(-.8,(N.rows-1)*N.gapY/2+1.8,.12);for(let ae=0;ae<=N.columns;ae++){let I=(ae-N.columns/2)*N.gapX;for(let G of[-.07,0,.07]){let xe=new yt().setFromPoints([new R(I+G,-18,-.08),new R(I+G,18,-.08)]);Q.add(new Sn(xe,new jt({color:G?8733743:13396287,transparent:!0,opacity:G?.3:.46})))}for(let G=-12;G<=12;G+=1.1){let xe=new mt(new an(.11,.022,.025),k);xe.position.set(I,G,-.05),Q.add(xe)}}pe.nodes.forEach((ae,I)=>{let G=X[I],xe=new At;xe.position.copy(G),se.add(xe);let fe=new mt(new an(4.65,2.42,.19),B);xe.add(fe);let We=new Mn(new vi(fe.geometry),new jt({color:Rd(ae),transparent:!0,opacity:.6}));xe.add(We);for(let jn=0;jn<10;jn++)for(let rt of[-1,1]){let Xt=new mt(new an(.17,.035,.055),k);Xt.position.set(rt*2.42,-.94+jn*.21,-.015),xe.add(Xt)}let Xe=Pe(ae.id),Be=new oi(Xe.element);Be.position.copy(G).add(new R(0,0,.13)),Be.scale.setScalar(.014),re.add(Be);let ut=T(ae.id);ut.label.position.copy(G).add(new R(0,-1.46,.14)),ut.action.position.copy(G).add(new R(2.64,.15,.14));let st=new Xn([new R(2.15,-.8,.01),new R(2.65,-.8,.01),new R(2.65,1.28,.01),new R(1.8,1.28,.01),new R(1.8,1.15,.01)].map(jn=>jn.add(G))),Mt=new mt(new Yn(st,40,.018,5,!1),new zt({color:15709293,transparent:!0,opacity:.65}));U.add(Mt);let Ct=new ti(new Wn({map:$,color:Rd(ae),transparent:!0,opacity:.13,depthWrite:!1,blending:Jt}));Ct.scale.set(5.6,3.2,1),Ct.position.z=-.08,xe.add(Ct);let It=I?X[I-1]:Ie.position,Wt=L(It,G),Ut=new mt(new Yn(Wt,48,.022,6,!1),new zt({color:12740674,transparent:!0,opacity:.5}));U.add(Ut);let Qt=new At,li=new mt(new Xs(.09,12,8),new zt({color:16775625})),In=new ti(new Wn({map:$,color:16757092,transparent:!0,depthWrite:!1,blending:Jt}));In.scale.setScalar(1.35),Qt.add(li,In),Qt.visible=!1,U.add(Qt);let ln=new $i(new yt().setAttribute("position",new pt(new Float32Array(48),3)),new Ni({color:16757354,size:.045,transparent:!0,opacity:.9,depthWrite:!1,blending:Jt}));ln.visible=!1,U.add(ln),he.set(ae.id,{node:ae,index:I,position:G,group:xe,edge:We,card:Xe,label:Be,ports:ut,loopTrace:Mt,glow:Ct,curve:Wt,trace:Ut,runner:Qt,tail:ln,portSignature:null})}),Y(),F(!1)}function Y(){for(let X of he.values()){let N=X.node,ae=Rd(N),I=X.card;I.element.dataset.active=String(N.active),I.element.dataset.viewed=String(N.viewed),I.element.dataset.status=N.status,I.element.style.setProperty("--ion-node","#"+new Je(ae).getHexString()),I.element.setAttribute("aria-label","第"+(N.index+1)+"步 "+N.title+" · "+N.label),I.index.textContent=String(N.index+1).padStart(2,"0"),I.state.textContent=N.active?"执行中":N.label,I.title.textContent=N.title,I.purpose.textContent=N.purpose||N.expected||"选择查看本步目标与交付",I.foot.textContent=N.recentCall?N.recentCall.label+(N.recentCall.target?" · "+N.recentCall.target:""):pe.kind==="mode"?(N.skills?.length||0)+" 项技能 · 点击编辑 / 拖动排序":N.loop?"达标后交付":"等待实际执行",X.edge.material.color.setHex(ae),X.trace.material.color.setHex(N.active?16758116:N.status==="submitted"?8838585:11951164),X.trace.material.opacity=N.active?1:N.status==="submitted"?.8:.44,X.glow.material.color.setHex(ae),_(X)}}function oe(X,N,ae=Kl.camera){let I=d.enableDamping;if(d.enableDamping=!1,d.update(),d.enableDamping=I,O&&(ae=0),m.position.distanceToSquared(X)<1e-5&&d.target.distanceToSquared(N)<1e-5){_e=null,i.dataset.cameraMoving="false",ee();return}ae?_e={start:performance.now(),duration:ae,from:m.position.clone(),targetFrom:d.target.clone(),position:X,target:N}:(_e=null,m.position.copy(X),d.target.copy(N),d.update()),i.dataset.cameraMoving=String(ae>0),ee()}function F(X=!0,N=!1){if(Te){let st=Te.bounds();if(!st)return;let Mt=new Dn;M.updateMatrixWorld(!0);for(let Qt of[st.minX,st.maxX])for(let li of[st.minY,st.maxY])for(let In of[st.minZ,st.maxZ])Mt.expandByPoint(M.localToWorld(new R(Qt,li,In)));let Ct=pe.network?.presentation.expanded?pe.network.artMode||"overview":"cockpit",It=Zl({minX:Mt.min.x,maxX:Mt.max.x,minY:Mt.min.y,maxY:Mt.max.y,minZ:Mt.min.z,maxZ:Mt.max.z},m.aspect,{mode:Ct,height:te}),Wt=new R(...It.target),Ut=new R(...It.position);d.maxDistance=Math.max(100,It.distance*1.7),m.far=Math.max(300,It.distance*4),m.updateProjectionMatrix(),me=null,i.dataset.cameraKeyframe=Ct,N&&!O&&(m.position.copy(Wt).add(Ut.clone().sub(Wt).multiplyScalar(1.13)).add(new R(-2.5,2.8,0)),d.target.copy(Wt),d.update()),oe(Ut,Wt,X?N?Rn.intro:Ct==="complete"?Rn.handoff:1e3:0);return}let{columns:ae,rows:I,gapX:G,gapY:xe}=j(pe.nodes.length),fe=(ae-1)*G+6.6,We=(I-1)*xe+2.65,Xe=Math.tan(Un.degToRad(17.5)),Be=Math.max(12,fe/(2*Xe*Math.max(.5,ke/te)*.92),We/(2*Xe*Math.max(.45,(te-(e?155:220))/te)));d.maxDistance=Math.max(55,Be*1.25);let ut=M.localToWorld(new R(0,-.9+Be*2*Xe*23/te,0));me=null,oe(ut.clone().add(new R(-Be*.17,Be*.12,Be)),ut,X?850:0)}function V(X=!0){if(!Te)return;let N=pe.network?.presentation,ae=N?.level==="stage"&&pe.phase==="processing"&&pe.live?.active?.kind==="model"?N.stageId?"step:"+N.stageId:"engine":Te.active()||Te.latest(),I=Te.position(ae);if(!I)return;Te.showLive(!0);let G=Te.focusFrame(ae),xe=G?.bounds?Zl(G.bounds,m.aspect,{mode:G.action?"action":"execution",height:te}):null,fe=xe?.distance||Ed(ke,te,Te.size(ae));d.maxDistance=Math.max(100,fe*2),m.far=Math.max(240,fe*4),m.updateProjectionMatrix();let We=xe?new R(...xe.target):M.localToWorld(new R(I.x,I.y+.35,I.z)),Xe=xe?new R(...xe.position):We.clone().add(new R(-.8,.6,fe));me=ae,Te.focus(ae),i.dataset.followTarget=ae,i.dataset.followMode=G?.action?"action":G?"parent-and-child":"active-card",i.dataset.cameraKeyframe="execution",Fe=Te.followKey(ae),Ge=ae,oe(Xe,We,X?Rn.focus:0)}function q(X,N=!0){if(Te){let G=Te.position(X);if(!G)return;Te.showLive(!0),me=X,Te.focus(X);let xe=Te.focusFrame(X),fe=xe?.bounds?Zl(xe.bounds,m.aspect,{mode:xe.action?"action":"inspection",height:te}):null,We=fe?.distance||Ed(ke,te,Te.size(X)),Xe=fe?new R(...fe.target):M.localToWorld(new R(G.x,G.y,G.z));d.maxDistance=Math.max(100,We*2),m.far=Math.max(240,We*4),m.updateProjectionMatrix(),i.dataset.cameraKeyframe="inspection",oe(fe?new R(...fe.position):Xe.clone().add(new R(-We*.07,We*.07,We)),Xe,N?Rn.focus:0);return}let ae=he.get(X);if(!ae)return;me=X;let I=M.localToWorld(ae.position.clone());oe(I.clone().add(new R(-1.7,1.1,10.5)),I)}function ee(){!Z&&!we&&!He&&le&&!document.hidden&&!Ue&&(Ue=requestAnimationFrame(S))}function S(X){if(Ue=0,Z||we||!le||document.hidden)return;let N=!!_e||nt||Te?.animating()||pe.nodes.some(fe=>fe.active);if(X-lt<(N?Kl.activeFrame:Kl.idleFrame)){Ue=requestAnimationFrame(S);return}let ae=Math.min(.2,(X-lt)/1e3);lt=X,O||(Oe+=ae),He=!0;let I=!1;if(_e){let fe=Math.min(1,(X-_e.start)/_e.duration),We=Jr(fe);m.position.lerpVectors(_e.from,_e.position,We),d.target.lerpVectors(_e.targetFrom,_e.target,We),fe===1&&(_e=null,i.dataset.cameraMoving="false"),I=!0}let G=d.update();m.updateMatrixWorld(!0),M.updateMatrixWorld(!0),W.render(Oe,ae,O,m);let xe=Te?.render(Oe,O,m);for(let fe of he.values()){let We=$r(Oe,fe.index,O||fe.card.element.matches(":hover,:focus-visible"));fe.group.position.set(fe.position.x+We.x,fe.position.y+We.y,fe.position.z+We.z),fe.group.rotation.set(We.rx,We.ry,0),fe.label.position.copy(fe.group.position),fe.label.position.z+=.13,fe.label.rotation.copy(fe.group.rotation),fe.ports.label.position.copy(fe.group.position),fe.ports.label.position.y-=1.46,fe.ports.label.position.z+=.14,fe.ports.action.position.copy(fe.group.position),fe.ports.action.position.x+=2.64,fe.ports.action.position.y+=.15,fe.ports.action.position.z+=.14;let Xe=fe.node.active,Be=O?.5:(Oe*.48+fe.index*.13)%1;if(fe.runner.visible=Xe,fe.tail.visible=Xe&&!O,fe.glow.material.opacity=Xe?O?.5:.43+Math.sin(Oe*3)*.09:fe.node.viewed?.22:.055,Xe){fe.runner.position.copy(fe.curve.getPoint(Be));let ut=fe.tail.geometry.attributes.position;for(let st=0;st<16;st++)fe.curve.getPoint(Math.max(0,Be-st*.014),Se),ut.setXYZ(st,Se.x,Se.y,Se.z);ut.needsUpdate=!0}}v.render(),g.render(y,m),i.dataset.frames=String(Number(i.dataset.frames||0)+1),i.dataset.cameraDistance=m.position.distanceTo(d.target).toFixed(3),i.dataset.cameraAzimuth=d.getAzimuthalAngle().toFixed(4),i.dataset.cameraElevation=(Math.PI/2-d.getPolarAngle()).toFixed(4),i.dataset.gpuGeometries=String(u.info.memory.geometries),i.dataset.gpuTextures=String(u.info.memory.textures),He=!1,(I||nt||G||xe||!O)&&ee()}d.addEventListener("start",()=>{nt=!0,_e=null,i.dataset.cameraMoving="false",i.dataset.cameraKeyframe="manual",ue=!1,s?.({follow:ue,manual:!0}),ee()}),d.addEventListener("end",()=>{nt=!1,ee()}),d.addEventListener("change",ee);let P=X=>{W.pointer(Jl(X.clientX,X.clientY,i.getBoundingClientRect()))},J=()=>W.pointer({x:0,y:0});i.addEventListener("pointermove",P,{passive:!0}),i.addEventListener("pointerleave",J,{passive:!0});let ve=matchMedia("(prefers-reduced-motion: reduce)"),Ee=()=>{O=ve.matches||Ke,d.enableDamping=!O,O&&(_e&&(m.position.copy(_e.position),d.target.copy(_e.target),_e=null,i.dataset.cameraMoving="false"),d.update()),ee()};ve.addEventListener("change",Ee);let Me=()=>{document.hidden?(cancelAnimationFrame(Ue),Ue=0):ee()};document.addEventListener("visibilitychange",Me);let Ae=X=>{X.preventDefault(),we=!0,cancelAnimationFrame(Ue),Ue=0,a?.("三维图形上下文已中断，可重新初始化场景。")};return u.domElement.addEventListener("webglcontextlost",Ae),s?.({renderer:"three-webgl2",follow:ue}),{update(X){let N=JSON.stringify(X);if(N===Le)return;let ae=pe?.phase;if(Le=N,pe=X,pe.kind==="project"){M.rotation.set(0,0,0),d.minPolarAngle=Math.PI*.14,d.maxPolarAngle=Math.PI*.49,d.minAzimuthAngle=-1/0,d.maxAzimuthAngle=1/0;let xe=!Te;Ie.visible=!1,xe&&(Te=_u({board:M,texture:$,host:i,requestFrame:ee,onPick:t,onFocusChat:r,onEntity:Ct=>{let It=(pe.network||or(pe)).byId.get(Ct);["artifact","delivery"].includes(It?.kind)||(ue=!1,s?.({follow:ue})),n?n(Ct):It?.stepId&&t?.(It.stepId)}}));let fe=pe.network||or(pe);Te.update(fe,pe),W.update(pe,Te.position(Te.active()||Te.latest()));let We=[pe.live?.active?.callId||"",pe.activeCalls.at(-1)?.callId||"",Te.active()||"",pe.activities?.at(-1)?.status||""].join("|");We!==bt&&(bt&&W.pulse(Te.position(Te.active()||Te.latest()),Oe),bt=We);let Xe=Te.active()||Te.latest(),Be=fe.presentation,ut=[Be.level,Be.stageId,Be.selectedId,Be.page].join("|"),st=Be.selectedId||(Be.stageId?"step:"+Be.stageId:"engine"),Mt=Be.level==="stage"?JSON.stringify(Te.focusFrame(st)?.bounds):"";xe?(Be.expanded?q(st,!1):F(!1),Ge=Xe):ue&&ae!=="completed"&&pe.phase==="completed"?(ue=!1,Te.showLive(!1),s?.({follow:ue}),F()):ue&&(Te.active()||fe.counts.calls)&&Te.followKey(Xe)!==Fe?V():ue&&(Te.active()||fe.counts.calls)&&Xe!==Ge?(me=Xe,Te.focus(Xe),Te.showLive(!0),i.dataset.followTarget=Xe,Ge=Xe,ee()):!ue&&ut!==Qe?Be.expanded?q(st):(Te.showLive(!1),F()):!ue&&Be.level==="stage"&&Mt!==ct&&i.dataset.cameraKeyframe==="inspection"&&q(st),Qe=ut,ct=Mt,ee();return}H.dataset.busy=String(X.phase==="processing"||X.phase==="running");let I=pe.nodes.map(xe=>xe.id).join("|");Re!==I&&(Re=I,ce());for(let xe of pe.nodes)he.has(xe.id)&&(he.get(xe.id).node=xe);Y();let G=pe.activeCalls.at(-1)?.stepId;W.update(pe,he.get(G||me)?.position),ue&&G&&G!==Ge&&(q(G),Ge=G),ee()},resize(X,N){let ae=Math.max(1,X),I=Math.max(1,N);if(Ce&&ke===ae&&te===I)return;Ce=!0;let G=j(pe.nodes.length).columns;ke=ae,te=I;let xe=Math.min(devicePixelRatio||1,1.35,Math.sqrt(18e5/(ke*te)));u.setPixelRatio(xe),u.setSize(ke,te,!1),v.setPixelRatio(xe),v.setSize(ke,te),g.setSize(ke,te),m.aspect=ke/te,m.updateProjectionMatrix(),Te?ue&&(Te.active()||pe.network?.counts.calls)?V(!1):me&&i.dataset.cameraKeyframe==="inspection"?q(me,!!_e):!me&&i.dataset.cameraKeyframe!=="manual"&&F(!1):G!==j(pe.nodes.length).columns&&pe.nodes.length?ce():me||F(!1),ee()},visible(X){le=X,le?ee():(cancelAnimationFrame(Ue),Ue=0)},home(){ue=!1,Te?.showLive(!1),s?.({follow:ue}),F()},reveal(X=!1){ue=!!X,Fe="",Te?.showLive(!1),s?.({follow:ue}),F(!0,!0)},follow(X=!0){if(ue=X&&pe.phase!=="completed",s?.({follow:ue}),ue)if(Te)Te.active()||pe.network?.counts.calls?V():F(),Ge=Te.active()||Te.latest();else{let N=pe.activeCalls.at(-1)?.stepId;N?q(N):F()}else X&&Te&&pe.phase==="completed"&&F()},preview(X){Te?.preview(X)},pauseMotion(X){Ke=!!X,i.dataset.motionPaused=String(Ke),Ee()},focus(X){ue=!1,s?.({follow:ue}),q(X)},captureView(){let X=pe.network?.presentation;return{position:m.position.toArray(),target:d.target.toArray(),follow:ue,selected:me,keyframe:i.dataset.cameraKeyframe,layout:Te?vn.version:"workflow-v1",navigation:Te?[X?.level,X?.stageId,X?.selectedId,X?.page].join("|"):null}},restoreView(X){if(!(!X||![X.position,X.target].every(N=>Array.isArray(N)&&N.length===3&&N.every(Number.isFinite)))){if(Te&&X.layout!==vn.version){ue=!!Te.active(),ue?V(!1):F(!1),s?.({follow:ue});return}if(Te&&X.navigation!==[pe.network?.presentation.level,pe.network?.presentation.stageId,pe.network?.presentation.selectedId,pe.network?.presentation.page].join("|")){ue=!1;let N=pe.network?.presentation;N?.expanded?q(N.selectedId||(N.stageId?"step:"+N.stageId:"engine"),!1):F(!1),s?.({follow:ue});return}if(Te&&X.follow&&pe.phase==="completed"){ue=!1,Te.showLive(!1),F(!1),s?.({follow:ue});return}if(Te&&X.follow){ue=!0,V(!1),Ge=Te.active()||Te.latest(),s?.({follow:ue});return}ue=!!X.follow,me=Te?.has(X.selected)||he.has(X.selected)?X.selected:null,Te?.showLive(ue||!!me),oe(new R(...X.position),new R(...X.target),0),s?.({follow:ue})}},dispose(){if(!Z){Z=!0,cancelAnimationFrame(Ue),ve.removeEventListener("change",Ee),document.removeEventListener("visibilitychange",Me),i.removeEventListener("pointermove",P),i.removeEventListener("pointerleave",J),u.domElement.removeEventListener("webglcontextlost",Ae),d.dispose(),Te?.dispose(),W.dispose();for(let X of he.values())X.card.element.remove(),X.ports.element.remove(),X.ports.add.remove();H.remove(),Mu(y,D);for(let X of D)X.dispose();$.dispose(),w.dispose(),x.dispose(),v.dispose(),u.dispose(),u.forceContextLoss(),u.domElement.remove(),g.domElement.remove(),he.clear();for(let X of["cameraMoving","cameraAzimuth","cameraElevation","cameraKeyframe","gpuGeometries","gpuTextures"])delete i.dataset[X]}}}}function Eu(i,e,t=[],n=null,{dirty:r=!1,busy:s=!1}={}){let a=new Map(t.map(h=>[h.id,h])),o=e?.steps||[],l=e?.output||{format:"auto",wordFormatting:""},c=o.map((h,p)=>{let f=(h.skills||[]).map(g=>({id:g,name:a.get(g)?.name||g})),u=!h.title?.trim()||!h.instruction?.trim();return{id:h.id,title:h.title||"新步骤",index:p,purpose:h.instruction||"",expected:h.deliverables||"",status:u?"incomplete":"configured",label:u?"待完善":"已配置",active:!1,viewed:h.id===n,loop:h.loop?.enabled===!0,loopCriteria:h.loop?.criteria||"",skills:f,artifacts:[],delivery:null,feedback:[],recentCall:null,output:p===o.length-1?l:null}});return{key:"mode:"+i.id,id:i.id,kind:"mode",editable:!s,name:i.name,modeName:i.name,phase:s?"saving":r?"draft":"configured",headline:s?"正在保存流程":r?"更改已进入共享草稿":"选择节点开始编排",target:"节点、技能和循环直接修改当前模式；保存后供新项目使用。",nodes:c,activeCalls:[],activities:[],recent:null,total:c.length,bindingCount:c.reduce((h,p)=>h+p.skills.length,0),loopCount:c.filter(h=>h.loop).length,attention:c.filter(h=>h.status==="incomplete").length,delivered:null,files:null}}function Tu(i,e=null){let t=ts(i,e),n={...t,running:i.execution?.running===!0,live:i.live||null,runtime:i.runtime||null,availableRuntime:i.availableRuntime||null,cost:i.cost||null,blockedReason:i.blockedReason||null,recordedAt:i.recordedAt,pulseRevision:i.pulseRevision||0,key:"project:"+i.id,kind:"project",editable:!1,currentStepId:i.currentStepId,nodes:t.nodes.map(r=>{let s=i.steps.find(a=>a.id===r.id);return{...r,skills:Array.isArray(s.skillBindings)?s.skillBindings:null,executionBrief:s.executionBrief||null,prohibitions:s.prohibitions||"",loopCriteria:s.loopCriteria||"",artifacts:(r.delivery?.artifacts||[]).map((a,o)=>({...a,index:o,stepId:r.id})),output:r.index===t.nodes.length-1&&i.output||null}})};return n.network=or(n),n}function Au(i,e,t,n="before"){if(e===t)return i;let r=i.find(l=>l.id===e),s=i.find(l=>l.id===t);if(!r||!s)throw new Error("拖动的步骤不属于当前流程");let a=i.filter(l=>l.id!==e),o=a.findIndex(l=>l.id===t)+(n==="after"?1:0);return a.splice(o,0,r),a}function Cu(i,e){if(!e)return i||null;if(!i)return e;if(i.instanceId!==e.instanceId)return(e.startedAt||0)>=(i.startedAt||0)?e:i;if(e.revision<i.revision)return i;let t=new Map((i.entries||[]).map(r=>[r.seq,r]));for(let r of e.entries||[])t.set(r.seq,r);let n=[...t.values()].sort((r,s)=>r.seq-s.seq).filter(r=>r.seq>=(e.firstSeq||0));for(;n.length>256;)n.shift();return e.revision===i.revision&&n.length===(i.entries||[]).length?i:{...i,...e,entries:n}}function Ru(i,e){if(!i||i.id!==e.id)return e;if((e.workflowUpdate?.revision||0)<(i.workflowUpdate?.revision||0))return i;if(i.sessionId!==e.sessionId||i.versionId!==e.versionId)return e;let t=Cu(i.live,e.live);return i.runtime?.instanceId===e.runtime?.instanceId&&(i.pulseRevision||0)>(e.pulseRevision||0)?t===i.live?i:{...i,live:t}:{...e,live:t}}function Iu(i,e){if(!i||i.id!==e.id||e.sessionId&&e.sessionId!==i.sessionId||e.versionId&&e.versionId!==i.versionId)return i;let t=e.live===null&&e.execution?.running===!1?null:Cu(i.live,e.live),n=e.pulse,r=n&&(i.runtime?.instanceId!==n.runtime?.instanceId||n.revision>(i.pulseRevision||0)),s=e.execution||i.execution,a=s?.running!==i.execution?.running||s?.loaded!==i.execution?.loaded;if(!r&&!a&&t===i.live)return i;if(!r)return{...i,execution:s,live:t};let o=new Map((n.steps||[]).map(h=>[h.id,h])),l=i.steps.map(h=>({...h,...o.get(h.id)})),c=l.filter(h=>h.status==="submitted").length;return{...i,execution:s,live:t,steps:l,activity:n.activity||i.activity,currentStepId:n.currentStepId,currentStepTitle:n.currentStepTitle,runStatus:n.runStatus,runtime:n.runtime,cost:n.cost,blockedReason:n.blockedReason,recordedAt:n.recordedAt,pulseRevision:n.revision,submitted:c,percent:l.length?Math.round(c/l.length*100):0}}var _v=".mm-button,.ic-action,.mc-iconButton,.mc-mini,.mr-iconButton,.mc-modeTrigger,.mc-modeOption,.in-stageRoot,.mdoc-icon,.in-entity,.ion-chip,.in-port,.ion-port,.mc-libraryEntry,.mm-workspaceTabs [role=tab]";function Pu(i){if(!i)return()=>{};let e=matchMedia("(prefers-reduced-motion: reduce)"),t=new Set,n=null,r=null,s=0,a=null,o=null,l=!1;i.dataset.ionCraft="v2";let c=v=>{let w=v.target?.closest?.(_v);return w&&i.contains(w)&&!w.disabled?w:null};function h(){if(s=0,!n||!a)return;r=n.getBoundingClientRect();let{x:v,y:w}=Jl(a.clientX,a.clientY,r),x=pu(v,w,e.matches);n.style.setProperty("--ion-pointer-x",((v+1)*50).toFixed(1)+"%"),n.style.setProperty("--ion-pointer-y",((w+1)*50).toFixed(1)+"%"),n.style.setProperty("--ion-tilt-x",x.rx.toFixed(2)+"deg"),n.style.setProperty("--ion-tilt-y",x.ry.toFixed(2)+"deg")}function p(v){let w=c(v);w!==n&&(u(),w&&(n=w,r=n.getBoundingClientRect(),n.dataset.ionHover="true"))}function f(v){n&&(a={clientX:v.clientX,clientY:v.clientY},s||(s=requestAnimationFrame(h)))}function u(){n&&(delete n.dataset.ionHover,n.style.removeProperty("--ion-tilt-x"),n.style.removeProperty("--ion-tilt-y")),n=null,r=null,a=null}function g(v){n&&(!v.relatedTarget?.nodeType||!n.contains(v.relatedTarget))&&u()}function y(){o&&delete o.dataset.ionPressed,o=null}function m(v){if(v.button!==0)return;let w=c(v);if(!w||(y(),o=w,w.dataset.ionPressed="true",e.matches||typeof w.animate!="function"))return;let x=w.getBoundingClientRect(),C=document.createElement("span");C.className="ion-pressWave",C.setAttribute("aria-hidden","true");let A=w.clientWidth||x.width,b=w.clientHeight||x.height,M=Math.max(A,b)*1.7,B=(v.clientX-x.left)*A/Math.max(1,x.width),k=(v.clientY-x.top)*b/Math.max(1,x.height);C.style.cssText="width:"+M+"px;height:"+M+"px;left:"+B+"px;top:"+k+"px;",w.appendChild(C);let D=C.animate([{opacity:.48,transform:"translate(-50%,-50%) scale(.08)"},{opacity:0,transform:"translate(-50%,-50%) scale(1)"}],{duration:520,easing:"cubic-bezier(.16,1,.3,1)"}),W={animation:D,ripple:C};if(t.add(W),D.finished.catch(()=>{}).finally(()=>{C.remove(),t.delete(W)}),t.size>8){let se=t.values().next().value;se.animation.cancel(),se.ripple.remove(),t.delete(se)}}function d(){if(y(),u(),e.matches)for(let v of t)v.animation.cancel(),v.ripple.remove();t.clear(),i.dataset.reducedMotion=String(e.matches)}return d(),i.addEventListener("pointerover",p,{passive:!0}),i.addEventListener("pointermove",f,{passive:!0}),i.addEventListener("pointerout",g,{passive:!0}),i.addEventListener("pointerdown",m,{passive:!0,capture:!0}),window.addEventListener("pointerup",y,{passive:!0}),window.addEventListener("pointercancel",y,{passive:!0}),window.addEventListener("blur",y),e.addEventListener("change",d),()=>{if(!l){l=!0,cancelAnimationFrame(s),u(),y();for(let v of t)v.animation.cancel(),v.ripple.remove();t.clear(),i.removeEventListener("pointerover",p),i.removeEventListener("pointermove",f),i.removeEventListener("pointerout",g),i.removeEventListener("pointerdown",m,!0),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",y),window.removeEventListener("blur",y),e.removeEventListener("change",d),delete i.dataset.ionCraft,delete i.dataset.reducedMotion}}}function ku(i){let e=i.createElement,t=[["sources","资料","研究资料"],["skills","技能","项目技能"],["files","成果","交付成果"],["records","记录","执行记录"]],n=i.memo(function({model:a,graph:o,following:l,onStep:c,onPreview:h,onResource:p,resourceView:f,onOverview:u,onParent:g,motionPaused:y,onToggleMotion:m}){let d=i.useMemo(()=>lr(a,o),[a,o]),v=d.focus,w=o.presentation,x=o.byId.get(w.selectedId),C={sources:d.sources.length,skills:d.skills.length,files:d.scopeFiles.length,records:d.scopeCalls.length};return e("section",{className:"in-consoleStrip","data-view":w.level,"data-running":d.running,"aria-label":"研究现场控制栏"},w.expanded?e("button",{type:"button",className:"in-levelBack",onClick:g,"aria-label":"返回上一级研究视图",title:w.level==="action"?"返回所属步骤":"返回项目总览"},"←"):null,e("div",{className:"in-consoleScope"},e("span",null,e("i",{"data-running":d.running}),l?"跟随执行":w.level==="action"?"动作近景":w.expanded?"步骤内部":"研究总览"),w.expanded?e("nav",{className:"in-scopePath","aria-label":"研究空间路径"},e("button",{type:"button",onClick:u,"aria-label":"返回项目总览",title:"返回项目总览"},"总览"),e("i",null,"/"),w.level==="action"?e("button",{type:"button",onClick:g,"aria-label":"返回所属步骤",title:v?.title||"项目整体"},v?String(v.index+1).padStart(2,"0")+" "+v.title:"项目整体"):e("strong",null,v?String(v.index+1).padStart(2,"0")+" "+v.title:"项目整体"),x?e("span",{className:"in-actionPath",title:x.title},"/ "+String((x.childIndex||0)+1).padStart(2,"0")+" "+x.title):null):e("strong",null,d.checks+" 次核验 · "+d.tools.length+" 种工具"),v?e("small",{className:"in-instrumentGoal",title:d.goal},d.goal):null),e("nav",{className:"in-consoleSteps","aria-label":"编排大步骤主干"},d.stages.map(A=>e("button",{key:A.id,type:"button",className:"in-stageRoot","data-status":A.status,"data-executing":A.active,"data-viewed":v?.stepId===A.stepId,"aria-pressed":v?.stepId===A.stepId,"aria-label":"定位 研究阶段 "+A.title,title:"第"+(A.index+1)+"步 · "+A.title+" · "+A.statusLabel,onClick:()=>c(A.id),onPointerEnter:()=>h(A.id),onPointerLeave:()=>h(null),onFocus:()=>h(A.id),onBlur:()=>h(null)},String(A.index+1).padStart(2,"0")))),e("nav",{className:"in-consoleResources","aria-label":"项目资料与记录"},t.map(([A,b,M])=>e("button",{key:A,type:"button","aria-label":"查看"+M,"aria-expanded":f===A,"data-selected":f===A,onClick:B=>p(f===A?null:A,B.currentTarget)},e("span",null,b),e("b",null,C[A])))),e("button",{type:"button",className:"in-motionToggle","aria-label":y?"恢复环境动效":"暂停环境动效","aria-pressed":y,onClick:m,title:y?"恢复环境动效":"暂停环境动效"},e("svg",{viewBox:"0 0 12 12","aria-hidden":"true"},y?e("path",{d:"M4 2 10 6 4 10Z"}):e("path",{d:"M4 2v8M8 2v8"}))))}),r=i.memo(function({model:a,graph:o,tab:l,onClose:c,onEntity:h,onStep:p}){let f=i.useMemo(()=>lr(a,o),[a,o]),[u,g]=i.useState(30),y=t.find(v=>v[0]===l)?.[2]||"研究资料",m=l==="sources"?f.sources:l==="skills"?f.skills:l==="files"?f.scopeFiles:[...f.scopeCalls].reverse(),d=l==="files"||l==="records"?f.focus:null;return e("aside",{className:"in-consoleDrawer","aria-label":y,onKeyDown:v=>{v.key==="Escape"&&(v.preventDefault(),c())}},e("header",null,e("div",null,e("span",null,"PROJECT / "+l.toUpperCase()),e("h2",null,y,e("small",null,m.length))),e("button",{type:"button",onClick:c,"aria-label":"关闭"+y},"×")),e("p",{className:"in-drawerScope"},d?"第"+(d.index+1)+"步 · "+d.title:"当前研究项目"),e("div",{className:"in-consoleDrawerBody"},m.length?e("ol",null,m.slice(0,u).map(v=>{let w=l==="skills",x=l==="records",C=x?v.title:v.name,A=w?f.bindings+" 项项目技能绑定中的 "+v.name:x?v.detail:v.target,b=w?f.stages.filter(M=>M.skills?.some(B=>B.id===v.id)).map(M=>String(M.index+1).padStart(2,"0")+" "+M.title).join(" / "):null;return e("li",{key:v.id},e("button",{type:"button",className:"in-resourceRow","data-kind":l,onClick:()=>w?p("step:"+v.stepId):h(v.id)},e("span",{className:"in-resourceCode"},w?"SKILL":x?v.statusLabel:l==="files"?"FILE":"READ"),e("strong",null,C),e("small",{title:b||A},b||A)))})):e("div",{className:"in-resourceEmpty"},e("strong",null,l==="sources"?"尚未记录资料读取":l==="skills"?"尚未绑定技能":l==="files"?"尚无可查看的交付文件":"尚未记录执行动作"),e("p",null,l==="sources"?"实际读取的资料会在这里汇总。":l==="files"?"步骤登记交付文件后，可从这里打开。":"相关记录产生后会出现在这里。")),m.length>u?e("button",{type:"button",className:"in-resourceMore",onClick:()=>g(v=>v+30)},"继续显示 · 还有 "+(m.length-u)+" 条"):null))});return{Strip:n,Drawer:r}}function Lu(i,{Icon:e,createIonWorld:t,workbenchCss:n=""}){let r=i.createElement,s=new Map,a=ku(i),o=xu(i);function l(p){let[f,u]=i.useState(p);return i.useLayoutEffect(()=>{if(p){u(!0);return}let g=matchMedia("(prefers-reduced-motion: reduce)").matches?0:180,y=setTimeout(()=>u(!1),g);return()=>clearTimeout(y)},[p]),{visible:p||f,closing:!p}}function c({model:p}){let f=p?.cost,u=p?.runtime,g=p?.availableRuntime;if(!f&&!u&&!g)return null;let y=f?.main||{},m=f?.review||{},d=w=>Number(w||0).toLocaleString("zh-CN"),v=g&&u?.buildId!==g.buildId;return r("details",{className:"ic-runtimeDetails"},r("summary",null,f?"核验 "+d(m.requests)+" 次 · 输出 "+d(m.outputTokens)+" tokens":"运行信息"),r("div",null,r("strong",null,"已报告模型消耗"),r("p",null,"主会话："+d(y.requests)+" 次；非缓存输入 "+d(y.inputTokens)+"，缓存读取 "+d(y.cacheReadTokens)+"，输出 "+d(y.outputTokens)),r("p",null,"独立核验："+d(m.requests)+" 次；非缓存输入 "+d(m.inputTokens)+"，缓存读取 "+d(m.cacheReadTokens)+"，输出 "+d(m.outputTokens)),f?.unknownUsageRequests?r("p",null,d(f.unknownUsageRequests)+" 次失败请求未取得完整消耗回执，不按零消耗计算。"):null,r("small",null,"缓存与普通输入计价不同；这里是实际回执统计，不是金额。"),r("p",null,"执行器："+(u?.protocol||"尚未报告")+" · "+(u?.buildId?.slice(0,16)||"未知")),v?r("p",{className:"ic-runtimeMismatch"},"当前会话与已安装执行器版本不同。运行任务不会被自动中断；方便时正常重新加载 DSH 后确认新版。"):null))}function h({model:p,header:f,assistant:u,inspector:g,palette:y,paletteOpen:m,paletteTitle:d="技能库",onClosePalette:v,onSelect:w,onReorder:x,onBindSkill:C,onToggleLoop:A,onAddAfter:b,onAdd:M,onOpenArtifact:B,onSkillInspect:k,onFocusChat:D,overlay:W,notice:se,empty:U,children:Q,primaryAction:re}){let $=i.useRef(null),he=i.useRef(null),H=i.useRef(null),ge=i.useRef(null),K=i.useRef(null),Ie=i.useRef(null),[ke,te]=i.useState(null),[Ce,pe]=i.useState(0),[Le,Re]=i.useState("loading"),[Ue,lt]=i.useState(!1),[Oe,He]=i.useState(!1),[le,Z]=i.useState(()=>{try{return Math.max(300,Math.min(620,Number(localStorage.getItem("metis.circuit.chat-width"))||360))}catch{return 360}}),[we,me]=i.useState(null),[_e,ue]=i.useState(!1),[Ge,Fe]=i.useState(null),[nt,Te]=i.useState({key:"",stageId:null,actionId:null,page:0,overview:!0}),Ke=p?.key||"empty",O=nt.key===Ke?nt:{stageId:null,actionId:null,page:0,overview:!0},bt=i.useMemo(()=>p?.kind==="project"?{...p,network:or(p,mu(p,O,Ue))}:p,[p,Ke,O.stageId,O.actionId,O.page,O.overview,Ue]);i.useEffect(()=>Pu(ge.current),[]);let Qe=i.useRef(null),ct=p?.nodes.find(I=>I.viewed),Se=bt?.network,j=Se?.byId.get(we);H.current={model:bt,onSelect:w,onReorder:x,onBindSkill:C,onToggleLoop:A,onAddAfter:b,onOpenArtifact:B,onSkillInspect:k,onFocusChat:D};function be(I){Fe(null),K.current=$.current?.querySelector('[data-scene-step="'+CSS.escape(I)+'"]'),H.current.onSelect?.(I),He(!0)}function Pe(){He(!1),requestAnimationFrame(()=>{K.current?.isConnected&&K.current.focus({preventScroll:!0})})}function T(){Fe(null),requestAnimationFrame(()=>{Ie.current?.isConnected&&Ie.current.focus({preventScroll:!0})})}function _(I){let G=H.current.model?.network?.byId.get(I);if(!G)return;Fe(null),K.current=$.current?.querySelector('[data-network-entity="'+CSS.escape(I)+'"]');let xe=Td(H.current.model.network,I);if(xe&&(he.current?.follow(!1),Te({key:Ke,...xe})),G.kind==="step"){me(null),H.current.onSelect?.(G.stepId),He(!1),he.current?.focus(I);return}if(G.kind==="engine"){me(I),H.current.onSelect?.(null),He(!1),he.current?.focus(I);return}if(H.current.onSelect?.(G.stepId),G.kind==="artifact"&&G.availability==="file"){let fe=H.current.model.network.presentation;he.current?.follow(!1),Te({key:Ke,stageId:G.stepId,page:fe.stageId===G.stepId?fe.page:0,overview:!1}),he.current?.focus("step:"+G.stepId),H.current.onOpenArtifact?.(G.stepId,G.fileIndex,G.file);return}G.kind==="delivery"&&(he.current?.follow(!1),Te({key:Ke,stageId:G.stepId||"__project__",page:0,overview:!1})),me(I),He(G.origin!=="activity"),he.current?.focus(I)}function L(){Te({key:Ke,stageId:null,actionId:null,page:0,overview:!0}),me(null),He(!1),Fe(null),H.current.model?.kind==="project"&&H.current.onSelect?.(null),he.current?.home()}function ce(){let I=H.current.model.network.presentation;I.level==="action"?_(I.stageId?"step:"+I.stageId:"engine"):L()}function Y(){if(Ue){let I=Se.presentation;Te({key:Ke,stageId:I.stageId||"__project__",actionId:I.selectedId,page:I.page,overview:!1})}else Te({key:Ke,stageId:null,actionId:null,page:0,overview:!1}),He(!1),Fe(null);he.current?.follow(!Ue)}function oe(I){let G=Se.presentation;he.current?.follow(!1),he.current?.focus(G.stageId?"step:"+G.stageId:"engine"),me(null),He(!1),Te({key:Ke,stageId:G.stageId||"__project__",actionId:null,page:G.page+I,overview:!1})}i.useLayoutEffect(()=>{if(!$.current)return;let I=$.current,G,xe,fe=!0;te(null),Re("loading"),He(!1),me(null),Fe(null);try{G=t({host:I,compactHud:!0,onPick:be,onEntity:_,onFocusChat:()=>H.current.onFocusChat?.(),onState:Xe=>{if(fe&&(Xe.renderer&&Re(Xe.renderer),typeof Xe.follow=="boolean"&&lt(Xe.follow),Xe.manual&&H.current.model?.kind==="project")){let Be=H.current.model.network.presentation;Be.expanded&&Te(ut=>ut.key===Ke&&ut.stageId===(Be.stageId||"__project__")&&ut.actionId===Be.selectedId&&ut.page===Be.page&&!ut.overview?ut:{key:Ke,stageId:Be.stageId||"__project__",actionId:Be.selectedId,page:Be.page,overview:!1})}},onError:Xe=>fe&&te(Xe),onReorder:(...Xe)=>H.current.onReorder?.(...Xe),onBindSkill:(...Xe)=>H.current.onBindSkill?.(...Xe),onToggleLoop:(...Xe)=>{H.current.onToggleLoop?.(...Xe),be(Xe[0])},onAddAfter:Xe=>{H.current.onAddAfter?.(Xe),He(!0)},onOpenArtifact:(...Xe)=>H.current.onOpenArtifact?.(...Xe),onSkillInspect:(Xe,Be)=>{be(Xe),H.current.onSkillInspect?.(Xe,Be)}}),he.current=G,G.update(H.current.model||{nodes:[],activeCalls:[]});let We=()=>{let Xe=I.getBoundingClientRect();Xe.width&&Xe.height&&G.resize(Xe.width,Xe.height)};xe=new ResizeObserver(We),xe.observe(I),We(),s.has(Ke)?G.restoreView(s.get(Ke)):H.current.model?.kind==="project"?G.reveal(!1):G.home()}catch(We){te(We.message),Re("error")}return()=>{fe=!1,G&&(s.set(Ke,G.captureView()),s.size>30&&s.delete(s.keys().next().value)),xe?.disconnect(),G?.dispose(),I.replaceChildren(),he.current=null}},[Ke,Ce]),i.useLayoutEffect(()=>{he.current?.update(bt||{nodes:[],activeCalls:[]})},[bt]),i.useEffect(()=>{he.current?.visible(!W)},[!!W]),i.useEffect(()=>{he.current?.pauseMotion(_e)},[_e,Ke,Ce]),i.useEffect(()=>{Se?.presentation.expanded&&(ct?.id||null)!==Se.presentation.stageId&&H.current.onSelect?.(Se.presentation.stageId)},[Ke,Se?.presentation.expanded,Se?.presentation.stageId]),i.useEffect(()=>{try{localStorage.setItem("metis.circuit.chat-width",String(le))}catch{}},[le]);function F(I){return Math.max(300,Math.min(620,(ge.current?.clientWidth||1200)-360,I))}let V=r("div",{className:"ic-chatGrip",role:"separator",tabIndex:0,"aria-label":"调整助手宽度","aria-orientation":"vertical","aria-valuenow":le,"aria-valuemin":300,"aria-valuemax":620,onPointerDown:I=>{I.button||(I.preventDefault(),Qe.current={x:I.clientX,width:le},I.currentTarget.setPointerCapture(I.pointerId))},onPointerMove:I=>{Qe.current&&Z(F(Qe.current.width+Qe.current.x-I.clientX))},onPointerUp:I=>{Qe.current=null,I.currentTarget.releasePointerCapture(I.pointerId)},onPointerCancel:()=>{Qe.current=null},onKeyDown:I=>{["ArrowLeft","ArrowRight","Home","End"].includes(I.key)&&(I.preventDefault(),Z(F(I.key==="Home"?300:I.key==="End"?620:le+(I.key==="ArrowLeft"?24:-24))))}}),q=p?.total||0,ee=p?.kind==="project",S=p?.activities?.at(-1),P=Se?.byId.get("step:"+Se.presentation.stageId),J=P?"第"+(P.index+1)+"步 · "+P.title:"项目整体",ve=(I,G,xe,fe={})=>r("button",{type:"button",className:"ic-action",onClick:xe,...fe},r(e,{name:G,size:14}),r("span",null,I)),Ee=j?r("div",{className:"in-entityDetail"},r("div",{className:"in-detailOrigin","data-origin":j.origin},j.origin==="configuration"?"本项目固定的流程设置":j.origin==="activity"?"来自原生工具的实际调用记录":j.origin==="delivery"?"来自本项目登记的交付记录":"本项目运行状态"),r("h2",null,j.title),r("span",{className:"in-detailStatus","data-status":j.status},j.statusLabel),j.stepId?r("p",{className:"in-detailOwner"},"所属大步骤 · 第"+(p.nodes.find(I=>I.id===j.stepId)?.index+1)+"步 "+p.nodes.find(I=>I.id===j.stepId)?.title):r("p",{className:"in-detailOwner"},"项目整体 · 未记录具体大步骤"),r("pre",{className:"in-detailText",tabIndex:0},j.detail||"该记录未附文字详情。"),j.characters?r("p",{className:"mc-note"},"步骤提示词共 "+j.characters+" 字符；此处显示摘要，不预加载技能正文。"):null,j.call?r("dl",null,r("dt",null,"工具"),r("dd",null,j.call.tool),r("dt",null,"调用 ID"),r("dd",null,j.callId),j.call.startedAt?r(i.Fragment,null,r("dt",null,"开始"),r("dd",null,new Date(j.call.startedAt).toLocaleString("zh-CN"))):null,typeof j.call.exitCode=="number"?r(i.Fragment,null,r("dt",null,"退出码"),r("dd",null,String(j.call.exitCode))):null):null,j.call?.resultPreview&&j.kind!=="result"?r(i.Fragment,null,r("h3",null,"实际回执"+(j.call.resultTruncated?"（节选）":"")),r("pre",{tabIndex:0},j.call.resultPreview)):null,j.call?.feedback?.length?r(i.Fragment,null,r("h3",null,"核验反馈"),r("pre",{tabIndex:0},j.call.feedback.join(`
`))):null,j.kind==="artifact"&&j.availability!=="file"?r("p",{className:"mr-error"},"登记路径当前不可预览："+j.availability):null,r("div",{className:"in-detailActions"},j.stepId?ve("查看所属阶段","layers",()=>_("step:"+j.stepId)):null,ve("在助手中讨论","message",()=>D?.()))):null,Me=i.useRef(null),Ae=i.useRef(null);Oe&&(Ee||g)&&(Me.current=Ee||g),m&&y&&(Ae.current=y);let X=l(!!(Oe&&(Ee||g))),N=l(!!(m&&y)),ae=p?.kind==="mode"&&!Ee;return r("div",{className:"ic-workspace",ref:ge,style:{"--ic-chat-width":le+"px"},"data-circuit-kind":p?.kind||"empty","data-circuit-key":Ke,"data-phase":p?.phase||"empty","data-motion-paused":_e},r("style",null,Aa+n),f,r("div",{className:"ic-body"},r("main",{className:"ic-stage","aria-label":"METIS 离子回路工作空间","data-inspector":X.visible,"data-palette":N.visible,"data-research-level":Se?.presentation.level||"overview",onKeyDown:I=>{ee&&I.key==="Escape"&&!I.defaultPrevented&&!Oe&&!Ge&&!m&&!W&&!I.target.closest("input,textarea,select,[contenteditable=true]")&&(I.preventDefault(),ce())}},r("div",{className:"ic-world ion-world",ref:$,role:"group","data-graphics":Le,style:{visibility:ke?"hidden":void 0},"aria-label":"可交互流程电路"}),ee&&Se&&!ke?r(o,{model:bt,graph:Se,onEntity:_}):null,r(ee?"header":i.Fragment,ee?{className:"in-projectConsole"}:null,r("div",{className:"ic-context"},r("span",{className:"ic-eyebrow"},ee?"RESEARCH / 实时研究":"COMPOSER / 流程编排"),r("h1",null,p?.name||p?.modeName||"METIS"),r("div",{className:"ic-metrics"},r("span",null,r("b",null,ee?p.delivered+" / "+q:q),ee?" 步已交付":" 个步骤"),r("i",null),r("span",null,r("b",null,ee?p.files:p?.bindingCount||0),ee?" 个交付文件":" 项技能绑定"),p?.loopCount?r("span",null,r("b",null,p.loopCount)," 个达标循环"):null),ee?r(c,{model:p}):null),r("div",{className:"ic-cameraTools",role:"group","aria-label":"画布操作"},ve("全景","layers",L),ee?ve("跟随","activity",Y,{"aria-pressed":Ue,disabled:p?.phase==="completed"}):ve("新增步骤","plus",()=>{M?.(),He(!0)},{disabled:!p?.editable||!M}),ee&&Se?.heroId?ve("打开成果","records",()=>_(Se.heroId),{className:"ic-action in-openResult"}):re),ee&&q&&Se?r(a.Strip,{model:bt,graph:Se,following:Ue,motionPaused:_e,resourceView:Ge,onOverview:L,onParent:ce,onToggleMotion:()=>ue(I=>!I),onResource:(I,G)=>{Ie.current=G,He(!1),Fe(I)},onPreview:I=>he.current?.preview(I),onStep:I=>_(I)}):null),ee&&Ge&&Se?r(a.Drawer,{key:Ge,tab:Ge,model:bt,graph:Se,onClose:T,onEntity:_,onStep:I=>{he.current?.focus(I),_(I)}}):null,ee&&Se?.presentation.expanded&&Se.presentation.totalCalls?r("nav",{className:"in-recordPager","aria-label":"当前阶段执行记录"},r("span",{title:J},P?"第"+(P.index+1)+"步 · 子动作 ":"项目整体 · 子动作 ",r("b",null,Se.presentation.start+"–"+Se.presentation.end)," / "+Se.presentation.totalCalls),ve("较早记录","chevron",()=>oe(1),{disabled:Se.presentation.page>=Se.presentation.pages-1,"aria-label":"较早的执行记录"}),ve("较新记录","chevron",()=>oe(-1),{disabled:Se.presentation.page===0,"aria-label":"较新的执行记录"})):null,!q&&!ke?r("div",{className:"ic-empty"},U||r(i.Fragment,null,r("h2",null,"从一个步骤开始"),r("p",null,"直接描述目标，让 AI 和您一起搭建。"),M?ve("添加步骤","plus",()=>{M(),He(!0)}):null)):null,ke?r("div",{className:"ic-fallback",role:"alert"},r("strong",null,"图形视图暂不可用"),r("p",null,ke),ve("重新初始化","refresh",()=>pe(I=>I+1)),r("nav",{"aria-label":"流程节点"},p?.nodes.map(I=>r("button",{type:"button",key:I.id,"data-scene-step":I.id,"aria-pressed":I.viewed,onClick:()=>be(I.id)},String(I.index+1).padStart(2,"0")+" · "+I.title)))):null,X.visible?r("section",{className:"ic-inspector","data-inspector-kind":ae?"editor":"details",ref:I=>{I&&(I.inert=X.closing)},"data-presence":X.closing?"leaving":"open","aria-hidden":X.closing?!0:void 0,"aria-label":Ee?"网络实体详情":ee?"所选步骤详情":"所选步骤编辑",onKeyDown:I=>{I.key==="Escape"&&!I.defaultPrevented&&(I.preventDefault(),Pe())}},ae?r("button",{type:"button",className:"ic-inspectorClose","aria-label":"收起步骤编辑",title:"收起步骤编辑 · Esc",onClick:Pe},r(e,{name:"close",size:16})):r("div",{className:"ic-drawerHead"},r("span",null,Ee?au[j.kind]:ee?"节点详情":"节点编辑",ee&&ct&&!Ee?r("strong",null,String(ct.index+1).padStart(2,"0")+" · "+ct.title):null),ve("收起","close",Pe)),Me.current):null,N.visible?r("section",{className:"ic-palette",ref:I=>{I&&(I.inert=N.closing)},"data-presence":N.closing?"leaving":"open","aria-hidden":N.closing?!0:void 0,"aria-label":d+"面板",onKeyDown:I=>{I.key==="Escape"&&!I.defaultPrevented&&(I.preventDefault(),v?.())}},r("div",{className:"ic-drawerHead"},r("span",null,d),ve("关闭"+d,"close",v)),Ae.current):null,r("footer",{className:"ic-statusRail"},r("div",{className:"ic-statusText","data-phase":p?.phase},r("i",null),r("strong",null,p?.headline||"选择模式或研究项目"),r("small",{title:S?.target||p?.target},S?.target||p?.target)),r("div",{className:"ic-selection"},ee&&Se?.presentation.expanded?ve(Se.presentation.level==="action"?"动作详情":"步骤详情","records",()=>{Fe(null),me(Se.presentation.level==="action"?Se.presentation.selectedId:Se.presentation.stageId?null:"engine"),He(I=>!I)},{"aria-expanded":Oe,"aria-label":Se.presentation.level==="action"?"查看当前动作详情":"查看当前步骤详情"}):ct&&!ee?ve(String(ct.index+1).padStart(2,"0")+" · "+ct.title,"layers",()=>He(I=>!I),{"aria-expanded":Oe}):r("span",null,ee?"点击步骤进入执行舱":"点击节点操作"),r("small",null,ee?Se?.presentation.expanded?"Esc 返回上一层 · 拖动环绕":"拖动环绕 · 滚轮缩放":"拖动节点排序 · 拖入技能绑定"))),se||ee&&p?.blockedReason&&!p?.running?r("div",{className:"ic-notice",role:p?.blockedReason&&!p?.running?"alert":void 0},se,ee&&p?.blockedReason&&!p?.running?r(i.Fragment,null,r("strong",null,"本轮等待处理"),r("p",null,p.blockedReason)):null):null,W?r("section",{className:"ic-documentLayer","aria-label":"交付文档工作区"},W):null),V,r("div",{className:"ic-assistant"},u)),Q)}return{Canvas:h,modeModel:Eu,projectModel:Tu,reorder:Au,mergeProjectDelta:Iu,mergeProjectFull:Ru}}var Pd=`/* METIS ION design system. Scoped to METIS; native DSH controls retain their behavior. */
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
/* Detail sheets float over the full canvas; only the full-height editor reserves space. */
.ic-world{inset:0}.ic-context{position:absolute;top:22px;left:24px;z-index:2;pointer-events:none;text-shadow:0 2px 18px #000}.ic-eyebrow{font:9px/1.5 Consolas,monospace;letter-spacing:.18em;color:#c58b76}.ic-context h1{margin:5px 0 10px;font:550 clamp(18px,1.6vw,25px)/1.3 'Segoe UI','Microsoft YaHei UI',sans-serif;max-width:460px;color:#f5e1d8;letter-spacing:.015em}.ic-metrics{display:flex;gap:14px;align-items:center;font-size:10px;color:#c4a2a1}.ic-metrics b{font:400 17px/1 Consolas,monospace;color:#ffcc97}.ic-metrics i{height:10px;width:1px;background:#734737}.ic-cameraTools{position:absolute;right:20px;top:22px;z-index:3;display:flex;gap:6px}
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

/* RESEARCH / one anchored console; information belongs to its rail or stage. */
.ic-workspace[data-circuit-kind=project]{--in-console-height:150px;--in-status-height:70px}
.in-projectConsole{position:absolute;inset:0 0 auto;height:var(--in-console-height);z-index:3;box-sizing:border-box;border-bottom:1px solid #9fb4c13b;background:linear-gradient(112deg,#18202b,#0e1723 68%);box-shadow:inset 0 1px #d6e4e60b,0 7px 22px #03070d2b}
.in-projectConsole::after{content:"";position:absolute;bottom:-1px;left:24px;width:120px;height:1px;background:linear-gradient(90deg,#d9b57e,transparent);pointer-events:none}
.ic-workspace .in-projectConsole .ic-context{top:15px;left:24px;max-width:calc(100% - 290px);text-shadow:none}
.ic-workspace .in-projectConsole .ic-context h1{margin:5px 0 8px;font-size:24px;line-height:1.25;max-width:600px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ic-workspace .in-projectConsole .ic-eyebrow{font-size:8px;letter-spacing:.18em}
.ic-workspace .in-projectConsole .ic-metrics{font-size:9px}.ic-workspace .in-projectConsole .ic-metrics b{font-size:15px}
.ic-workspace .in-projectConsole .ic-cameraTools{right:20px;top:23px;flex-direction:row}
.ic-workspace[data-circuit-kind=project] .ic-world{top:var(--in-console-height);bottom:var(--in-status-height)}
.in-consoleStrip{position:absolute;bottom:0;left:24px;right:20px;height:53px;box-sizing:border-box;border-top:1px solid #a1b6c21e;display:flex;align-items:center;gap:17px;min-width:0}
.in-consoleScope{display:flex;flex-direction:column;gap:3px;flex:1;min-width:95px;overflow:hidden}.in-consoleScope>span{display:flex;align-items:center;gap:5px;font-size:8px;letter-spacing:.08em;color:#8fa3b1}.in-consoleScope>span>i{height:3px;width:3px;background:#849aa4;flex:none}.in-consoleScope>span>i[data-running=true]{background:#deb87d;box-shadow:0 0 7px #e9ac6633}.in-consoleScope>strong{font-size:10px;line-height:1.3;font-weight:500;color:#c4d0d5;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.in-consoleScope>.in-instrumentGoal{display:none}
.in-consoleSteps{display:flex;align-items:center;gap:4px;flex:none;max-width:42%;overflow-x:auto;scrollbar-width:none}
.ic-workspace .in-consoleSteps .in-stageRoot{display:grid;place-items:center;flex:none;min-width:24px;width:24px;min-height:26px;height:26px;padding:0;border:1px solid #a4bcc226;border-radius:1px;box-shadow:none;background:#08131e69;color:#879caa;font:9px/1 Consolas,monospace;transition:color 160ms,border-color 160ms,background-color 160ms,transform 160ms}
.ic-workspace .in-consoleSteps .in-stageRoot[data-status=submitted]{color:#a3cab5;border-bottom-color:#8abfaeaa;background:#8bb79a0b}.ic-workspace .in-consoleSteps .in-stageRoot[data-status=needs_revision],.ic-workspace .in-consoleSteps .in-stageRoot[data-status=needs_recheck]{color:#ddba86;border-bottom-color:#d4a972aa}.ic-workspace .in-consoleSteps .in-stageRoot[data-executing=true]{border-color:#dbb07d;color:#fae0b9;background:#d0a26917;box-shadow:inset 0 -2px #dfb479}.ic-workspace .in-consoleSteps .in-stageRoot[data-viewed=true]{outline:1px solid #a2b8c46b;outline-offset:2px;box-shadow:none}.ic-workspace .in-consoleSteps .in-stageRoot:hover{color:#f2d2aa;border-color:#d5ad7c;transform:translateY(-1px)}
.in-consoleResources{display:flex;align-items:center;gap:1px;flex:none;border-left:1px solid #a4bcc226;padding-left:9px}
.in-consoleResources>button{position:relative;display:flex;align-items:baseline;gap:5px;min-height:30px;padding:6px 8px;border:0;border-bottom:1px solid transparent;background:transparent;color:#a6b8c4;cursor:pointer;font-size:10px;transition:color 160ms,background-color 160ms,border-color 160ms}
.in-consoleResources b{font:11px/1 Consolas,monospace;color:#d3bd9b;font-weight:400}.in-consoleResources>button:hover{color:#f2dbc0;background:#d4ba8e09}.in-consoleResources>button[data-selected=true]{border-bottom-color:#d4b181;color:#ecd5b3;background:#d4ba8e0a}
.in-motionToggle{display:grid;place-items:center;width:24px;height:26px;padding:0;border:0;background:transparent;color:#8d9da8;cursor:pointer;flex:none}.in-motionToggle svg{height:11px;width:11px;stroke:currentColor;stroke-width:1.4;fill:none}.in-motionToggle:hover,.in-motionToggle[aria-pressed=true]{color:#e0bf93}
.in-consoleDrawer{position:absolute;z-index:4;top:var(--in-console-height);bottom:var(--in-status-height);left:0;width:min(340px,calc(100% - 24px));display:flex;flex-direction:column;box-sizing:border-box;border-right:1px solid #9fb4c140;background:linear-gradient(155deg,#17222e,#0d1723 70%);box-shadow:8px 0 25px #02060c30;animation:in-console-drawer-in 240ms var(--ion-ease) both;overflow:hidden}
.in-consoleDrawer>header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:19px 20px 13px}.in-consoleDrawer>header span{font:8px/1.4 Consolas,monospace;letter-spacing:.12em;color:#a98e6f}.in-consoleDrawer h2{font-size:17px;font-weight:550;color:#e0ddd6;margin:6px 0 0;display:flex;align-items:center;gap:10px}.in-consoleDrawer h2>small{font:12px Consolas,monospace;color:#b3a48b}.in-consoleDrawer>header>button{height:26px;width:26px;border:1px solid #8caaa92c;background:transparent;color:#b8c4c8;font-size:18px;cursor:pointer}.in-consoleDrawer>header>button:hover{border-color:#cdad80;color:#f3d3aa}
.in-drawerScope{margin:0;padding:0 20px 14px;font-size:10px;line-height:1.5;color:#8da3b2;border-bottom:1px solid #8da7b325}
.in-consoleDrawerBody{flex:1;min-height:0;overflow:auto}.in-consoleDrawerBody>ol{margin:0;padding:0;list-style:none}.in-consoleDrawerBody li{margin:0;border-bottom:1px solid #8da7b319}.in-resourceRow{display:flex;flex-direction:column;gap:6px;width:100%;box-sizing:border-box;padding:15px 20px;border:0;background:transparent;text-align:left;color:#acbfca;cursor:pointer;transition:background-color 160ms}.in-resourceRow:hover{background:#a5bdca0a}.in-resourceCode{font:8px/1.4 Consolas,monospace;letter-spacing:.06em;color:#b5a085}.in-resourceRow>strong{font-size:12px;font-weight:500;overflow-wrap:anywhere;color:#d4dce0}.in-resourceRow>small{font-size:9px;line-height:1.6;color:#7f99ab;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-all}.in-resourceRow[data-kind=files] .in-resourceCode{color:#9ac1ad}.in-resourceMore{display:block;margin:15px auto;padding:7px 14px;border:1px solid #a0b6bc35;background:transparent;color:#bfc8cc;font-size:10px;cursor:pointer}.in-resourceEmpty{padding:30px 20px;color:#9bb0bd}.in-resourceEmpty>strong{font-size:12px;font-weight:500}.in-resourceEmpty>p{font-size:10px;line-height:1.8;color:#7891a4}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .ic-inspector[data-inspector-kind=details],.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .ic-palette{top:var(--in-console-height);bottom:var(--in-status-height);left:0;width:min(365px,calc(100% - 24px));max-height:none;border:0;border-right:1px solid #9fb4c140;border-radius:0;background:linear-gradient(155deg,#17222efa,#0d1723fc 70%);box-shadow:8px 0 25px #02060c30;backdrop-filter:none}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .ic-statusRail{inset:auto 0 0;box-sizing:border-box;height:var(--in-status-height);min-height:var(--in-status-height);border:0;border-top:1px solid #91acbd30;border-radius:0;background:linear-gradient(90deg,#16222e,#0d1825);box-shadow:none;backdrop-filter:none;padding:12px 23px;z-index:3}
.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .in-recordPager{left:auto;right:0;bottom:var(--in-status-height);border:0;border-top:1px solid #a1b6c226;border-left:1px solid #a1b6c226;border-radius:0;background:#11202cee;box-shadow:none;z-index:2}
.in-nodeMetrics{display:none}.in-entity[data-kind=step] .in-nodeMetrics{display:flex;gap:15px;align-items:center;flex:none;padding-top:3px;min-height:19px}.in-nodeMetrics>span{display:flex;align-items:baseline;gap:4px;border-right:1px solid #9cb3bd26;padding-right:14px}.in-nodeMetrics>span:last-child{border:0;padding:0}.in-nodeMetrics b{font:15px/1 Consolas,monospace;color:#dcc39e;letter-spacing:.02em}.in-nodeMetrics small{font-size:9px;color:#839ba9}.in-moduleHistory i[data-status=completed]{background:#9ccbb6}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-kind=step] .in-labelBody{gap:4px;padding:13px 17px;background:radial-gradient(ellipse at 90% 10%,#b0d8e41a,transparent 55%),linear-gradient(145deg,#1e3445ee,#0b1725f5 83%)}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"][data-network-view] .in-cardWrap>.in-entity[data-kind=step] strong{font-size:24px;line-height:1.18;margin:1px 0 3px;max-width:96%}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-kind=step] .in-nodeHead{font-size:9px;min-height:14px}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"][data-network-view] .in-cardWrap>.in-entity[data-kind=step] .in-nodeDetail{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;white-space:normal;font-size:12px;line-height:1.4;max-height:34px;color:#9db2c0}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-cardWrap>.in-entity[data-kind=step] .in-nodeFoot{font-size:9px;line-height:1.4;margin-top:auto;padding-top:5px;padding-right:16px;color:#819aa9}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"] .in-entity[data-lod=context] .in-nodeMetrics{opacity:.45}
[data-ion-craft="v2"] .ion-world[data-network-layout="research-space-v4"][data-network-view=overview] .in-cardWrap:has(>.in-entity[data-kind=step]) .in-cardPorts{visibility:visible}
[data-motion-paused=true] .in-labelBody::after,[data-motion-paused=true] .ion-chip-face::after,[data-motion-paused=true] .in-moduleHistory i{animation-play-state:paused!important}
@keyframes in-console-drawer-in{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:translateX(0)}}
@container metis-circuit (max-width:1250px){.in-consoleStrip{gap:10px;left:20px;right:16px}.in-consoleSteps{gap:3px;max-width:37%}.ic-workspace .in-consoleSteps .in-stageRoot{width:21px;min-width:21px;height:24px;min-height:24px;font-size:8px}.in-consoleResources{padding-left:5px}.in-consoleResources>button{padding:6px;font-size:9px}.in-consoleResources b{font-size:10px}.in-consoleScope{min-width:70px}.in-consoleScope>strong{font-size:9px}.ic-workspace .in-projectConsole .ic-context{left:20px;max-width:calc(100% - 220px)}.ic-workspace .in-projectConsole .ic-context h1{font-size:21px}.ic-workspace .in-projectConsole .ic-cameraTools{right:16px}}
@container metis-circuit (max-width:850px){.ic-workspace[data-circuit-kind=project]{--in-console-height:145px;--in-status-height:64px}.in-consoleStrip{left:15px;right:12px;gap:6px}.in-consoleScope{display:none}.in-consoleSteps{max-width:47%;flex:1}.ic-workspace .in-consoleSteps .in-stageRoot{width:19px;min-width:19px;min-height:23px;height:23px;font-size:7px}.in-consoleResources{padding-left:4px}.in-consoleResources>button{gap:3px;padding:5px;font-size:9px}.in-motionToggle{width:17px}.ic-workspace .in-projectConsole .ic-context{left:15px;top:15px;max-width:calc(100% - 165px)}.ic-workspace .in-projectConsole .ic-context h1{font-size:18px;max-width:260px}.ic-workspace .in-projectConsole .ic-cameraTools{top:21px;right:12px;gap:4px}.ic-workspace .in-projectConsole .ic-cameraTools .ic-action{padding:5px 7px;min-height:29px;font-size:9px}.ic-workspace[data-ion-craft="v2"][data-circuit-kind=project] .ic-statusRail{padding:10px 15px}.in-consoleDrawer{width:min(320px,calc(100% - 18px))}}
@media(prefers-reduced-motion:reduce){.in-consoleDrawer{animation:none!important}.ic-workspace .in-consoleSteps .in-stageRoot:hover{transform:none}}
@container metis-circuit (max-width:850px){.ic-workspace .in-projectConsole .ic-context{max-width:calc(100% - 215px)}}

/* Progressive ION interiors: one owner, one execution bay, one action console. */
.in-levelBack{display:grid;place-items:center;width:25px;height:27px;flex:none;border:1px solid #9cb6c23b;border-radius:2px;background:#12202d;color:#d9be98;font:17px/1 Consolas,monospace;cursor:pointer;transition:border-color 160ms,background-color 160ms}
.in-levelBack:hover{border-color:#c9ab7d;background:#28333b}.in-levelBack:focus-visible,.in-scopePath button:focus-visible{outline:1px solid #e8c79c;outline-offset:3px}
.in-scopePath{display:flex;align-items:center;gap:6px;font-size:10px;min-width:0;overflow:hidden;white-space:nowrap}.in-scopePath button{flex:none;max-width:180px;overflow:hidden;text-overflow:ellipsis;padding:2px 0;border:0;background:transparent;color:#9fb8c7;font:inherit;cursor:pointer}.in-scopePath button:hover{color:#f1d7b3}.in-scopePath>i{color:#617a8e;font-style:normal}.in-scopePath>strong{font-weight:500;color:#cfc7b8;overflow:hidden;text-overflow:ellipsis}.in-actionPath{color:#c8b28f;overflow:hidden;text-overflow:ellipsis;min-width:30px}
.in-executionDock,.in-outputDock,.in-emptyBay{box-sizing:border-box;pointer-events:none;color:#a1b9c9;backface-visibility:hidden}
.in-bayCaption{display:flex;align-items:center;justify-content:space-between;gap:24px;position:relative;padding:0 4px 10px;border-bottom:1px solid #9bbac355;font:12px/1.5 Consolas,"Microsoft YaHei UI",monospace;letter-spacing:.09em;color:#b8cbd5}.in-bayCaption>strong{font-weight:400;font-size:11px;color:#d4b58c;letter-spacing:0}.in-bayCaption::after{content:"";position:absolute;left:0;bottom:-1px;width:100%;height:1px;background:linear-gradient(90deg,#a3c9d6,#e1b888,transparent);transform-origin:left;animation:in-bay-energize 650ms cubic-bezier(.16,1,.3,1) both}
.in-baySkills,.in-bayOutputs{display:flex;align-items:center;gap:9px;min-height:36px;overflow:hidden;animation:in-bay-open 480ms 100ms ease-out both}.in-bayOutputs{border-top:1px solid #90b4c23d;padding-top:6px}.in-bayKey{font-size:10px;letter-spacing:.1em;color:#8da4b5;white-space:nowrap;flex:none;margin-right:8px}.in-baySkill{font-size:11px;white-space:nowrap;max-width:185px;text-overflow:ellipsis;overflow:hidden;padding:4px 8px;border-left:1px solid #d2a67877;background:#c7a76c08;color:#c2c9c9}.in-bayEmpty{font-size:11px;line-height:1.5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#7f99aa}.in-bayOutput{pointer-events:auto;max-width:240px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;border:1px solid #9bbaa13b;border-radius:2px;padding:6px 10px;background:#203631b8;font-size:11px;color:#b8d3c5;cursor:pointer;transition:border-color 150ms,background-color 150ms}.in-bayOutput:hover:enabled{border-color:#a6d0b7;background:#28433bb8}.in-bayOutput:disabled{opacity:.45;cursor:default}.in-emptyBay{display:flex;flex-direction:column;gap:12px;align-items:center;justify-content:center}.in-emptyBay strong{font-size:18px;line-height:1.3;font-weight:400;color:#9db6c7}.in-emptyBay>span{font-size:12px;color:#6c8a9f}
.in-bayCaption{font-size:calc(var(--in-bay-font)*.86);padding-bottom:calc(var(--in-bay-font)*.28);gap:calc(var(--in-bay-font)*.5)}.in-bayCaption>span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.in-bayCaption>strong{font-size:calc(var(--in-bay-font)*.8);white-space:nowrap;flex:none}.in-baySkills,.in-bayOutputs{min-height:calc(var(--in-bay-font)*1.7);gap:calc(var(--in-bay-font)*.35)}.in-bayKey{font-size:calc(var(--in-bay-font)*.7)}.in-baySkill,.in-bayEmpty,.in-bayOutput{font-size:calc(var(--in-bay-font)*.8)}.in-baySkill{max-width:450px}.in-bayOutput{max-width:450px;padding:calc(var(--in-bay-font)*.2) calc(var(--in-bay-font)*.4)}.in-emptyBay strong{font-size:var(--in-bay-font)}.in-emptyBay>span{font-size:calc(var(--in-bay-font)*.72)}
.ic-workspace[data-circuit-kind=project] .in-liveWindow[data-mode=terminal]{position:absolute;inset:auto 24px 18px;width:auto;max-width:none;height:clamp(150px,29%,220px);padding:10px 0 0;box-sizing:border-box;pointer-events:auto;will-change:auto;transform:none!important;animation:in-bay-open 360ms ease-out both;display:flex;flex-direction:column;border-top:1px solid #a1bdc04f!important;isolation:isolate}
.ic-workspace[data-circuit-kind=project] .in-liveWindow[data-mode=terminal][hidden]{display:none}
.ic-workspace[data-circuit-kind=project] .in-liveWindow[data-mode=terminal] .in-liveHead{border-bottom:1px solid #93b6c11c;min-height:25px;flex:none;padding:0 3px 8px;gap:15px}.ic-workspace[data-ion-craft=v2][data-circuit-kind=project] .in-liveWindow[data-mode=terminal] .in-liveHead strong{max-width:75%;font-size:11px;font-weight:400;color:#b7cbd6}.in-liveWindow[data-mode=terminal] .in-liveCode{font-size:8px;white-space:nowrap;color:#c8b08c}.in-liveWindow[data-mode=terminal] .in-liveBody{min-height:0;flex:1;height:auto;max-height:none;margin-top:8px;padding:0 3px 4px;overflow:auto;mask-image:none;scrollbar-width:thin;scrollbar-color:#8198aa45 transparent}.in-liveWindow[data-mode=terminal] .in-liveTape{will-change:auto}.in-liveWindow[data-mode=terminal] .in-liveTape .in-streamLine{height:auto;min-height:18px;max-height:none;white-space:pre-wrap;overflow-wrap:anywhere;font-size:11px;color:#adc2cf;opacity:.85;line-height:18px;user-select:text}.in-liveWindow[data-mode=terminal] .in-liveTape .in-streamLine[data-source=stderr]{color:#e8b4a5}
.ion-world[data-network-view=action] .in-cardTicker{display:none}.ion-world[data-network-view=action] .in-detailStatic{display:-webkit-box!important;-webkit-line-clamp:3;-webkit-box-orient:vertical;white-space:normal;overflow:hidden}.in-cardWrap[data-context-hidden=true]{pointer-events:none!important}
@keyframes in-bay-energize{from{transform:scaleX(0);opacity:.4}to{transform:scaleX(1);opacity:1}}
@keyframes in-bay-open{from{opacity:0;translate:0 8px}to{opacity:1;translate:0 0}}
@container metis-circuit (max-width:1250px){.in-scopePath{font-size:9px}.in-scopePath button{max-width:125px}.in-actionPath{display:none}.ic-workspace[data-circuit-kind=project] .in-liveWindow[data-mode=terminal]{left:18px;right:18px}}
@container metis-circuit (max-width:850px){.in-levelBack{width:23px;height:25px}.in-consoleStrip[data-view=stage] .in-consoleSteps,.in-consoleStrip[data-view=action] .in-consoleSteps{max-width:41%}.ic-workspace[data-circuit-kind=project] .in-liveWindow[data-mode=terminal]{left:14px;right:14px;bottom:12px;height:160px}.ic-workspace[data-circuit-kind=project] .in-liveWindow[data-mode=terminal] .in-liveHead strong{max-width:63%;font-size:10px}.in-liveWindow[data-mode=terminal] .in-liveCode{font-size:7px}}
@media(prefers-reduced-motion:reduce){.in-bayCaption::after,.in-baySkills,.in-bayOutputs,.in-liveWindow[data-mode=terminal]{animation:none!important}}
[data-motion-paused=true] .in-bayCaption::after,[data-motion-paused=true] .in-baySkills,[data-motion-paused=true] .in-bayOutputs{animation-play-state:paused!important}

/* ION FLIGHT DECK — overview only. The research interior keeps its own layout. */
.ic-workspace[data-circuit-kind=project] .ic-stage{container:metis-viewport / inline-size}
.ic-workspace[data-circuit-kind=project] .ic-stage[data-research-level=overview]{--in-console-height:132px}
.ic-workspace[data-circuit-kind=project] .ic-stage[data-research-level=overview] .in-projectConsole{background:linear-gradient(110deg,#0d1d2bf5,#07111cf2 70%);border-bottom-color:#7798ac3d;box-shadow:inset 0 1px #adcad611,0 10px 32px #02070c4d}
.ic-workspace .ic-stage[data-research-level=overview] .in-projectConsole .ic-context{top:13px;left:28px;max-width:calc(100% - 290px)}
.ic-workspace .ic-stage[data-research-level=overview] .in-projectConsole .ic-context h1{font-size:26px;font-weight:600;line-height:1.3;letter-spacing:-.025em;margin:6px 0 2px;max-width:640px}
.ic-workspace .ic-stage[data-research-level=overview] .in-projectConsole .ic-metrics{display:none}
.ic-workspace .ic-stage[data-research-level=overview] .in-projectConsole .ic-cameraTools{top:23px;right:24px}
.ic-stage[data-research-level=overview] .in-consoleStrip{height:43px;left:28px;right:24px;border-top-color:#799eaf1c}
.ic-stage[data-research-level=overview] .in-consoleSteps{gap:5px}
.ic-workspace .ic-stage[data-research-level=overview] .in-consoleSteps .in-stageRoot{border-radius:2px;border-color:#8bafbd35;background:linear-gradient(135deg,#203a492a,#0815224d);min-height:25px;height:25px}
.ic-workspace[data-circuit-kind=project] .ic-stage[data-research-level=overview] .ic-statusRail{background:linear-gradient(110deg,#112432f8,#081422fa);border-top-color:#83aeb540}
.in-flightDeck{position:absolute;inset:var(--in-console-height) 0 var(--in-status-height);z-index:1;overflow:hidden;pointer-events:none;contain:layout style paint;color:#b3c8d2}
.in-flightDeck::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#06121b66,transparent 19%,transparent 81%,#06121b66);pointer-events:none}
.in-canopy{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.in-canopySolid{fill:#152b3ccc;stroke:#7e9ca935;stroke-width:.5}
.in-canopyTrace{fill:none;stroke:#91b3bf6b;stroke-width:.8;vector-effect:non-scaling-stroke}
.in-canopyCurrent{fill:none;stroke:#dfb784ba;stroke-width:1.2;stroke-dasharray:28 1380;animation:in-canopy-current 16s linear infinite;vector-effect:non-scaling-stroke}
.in-canopyReticle{fill:none;stroke:#b1cdd783;stroke-width:.8;vector-effect:non-scaling-stroke}
.in-flightHeading{position:absolute;top:29px;left:25%;right:25%;display:flex;align-items:center;justify-content:center;gap:15px;white-space:nowrap;font:8px/1.4 "Cascadia Code",Consolas,"Microsoft YaHei UI",monospace;letter-spacing:.12em;color:#b4cad1a6}
.in-flightHeading>i{height:1px;flex:1;max-width:90px;background:linear-gradient(90deg,#9abcc319,#adc9cc77,#9abcc319)}
.in-flightPort,.in-flightStarboard{position:absolute;top:clamp(104px,17%,150px);width:144px;box-sizing:border-box;max-height:calc(100% - 190px);pointer-events:none}
.in-flightPort{left:32px;padding-right:13px;border-right:1px solid #8cb3c029}
.in-flightStarboard{right:32px;padding-left:14px;border-left:1px solid #8cb3c029;width:150px}
.in-flightEyebrow{display:block;color:#c1ac8f;font:8px/1.5 "Cascadia Code",Consolas,"Microsoft YaHei UI",monospace;letter-spacing:.07em;white-space:nowrap}
.in-missionDial{position:relative;width:128px;height:128px;margin:18px 0 0}
.in-missionDial>svg{width:100%;height:100%;overflow:visible}
.in-dialTicks{stroke:#829ba85c;stroke-width:.55}.in-dialInner{fill:none;stroke:#87a8b81a;stroke-width:.65}
.in-missionDial>svg>path{fill:none;stroke:#88b6c33d;stroke-width:2.3;stroke-linecap:butt}
.in-missionDial>svg>path[data-status=submitted]{stroke:#a9cebcdd;stroke-width:2.6}
.in-missionDial>svg>path[data-active=true]{stroke:#f1c185;stroke-width:3;stroke-dasharray:12 3;animation:in-dial-executing 3.5s linear infinite}
.in-missionDial>div{position:absolute;inset:37px 0 auto;text-align:center;line-height:1;white-space:nowrap}
.in-missionDial strong{font:300 32px/1 Consolas,monospace;color:#e0d5bf;letter-spacing:-.06em}.in-missionDial small{font:12px/1 Consolas,monospace;color:#789aab;margin-left:2px}
.in-missionDial>div>span{display:block;font:8px/1.6 "Microsoft YaHei UI",sans-serif;color:#7996a7;letter-spacing:.06em;margin-top:9px}
.in-flightPhase{font-size:9px;line-height:1.6;color:#adbec8;display:flex;align-items:center;justify-content:center;gap:6px;margin:0 0 20px}
.in-flightPhase>i{height:3px;width:3px;background:#91b8c1;border-radius:50%}.in-flightPhase[data-active=true]>i{background:#e3b27a;box-shadow:0 0 7px #ebae6759}
.in-flightReadouts{margin:0;padding:11px 0;border-top:1px solid #8ab2c22b;border-bottom:1px solid #8ab2c22b}
.in-flightReadouts>div{display:flex;align-items:baseline;justify-content:space-between;gap:12px;min-height:34px}.in-flightReadouts dt{font-size:9px;color:#819caa}.in-flightReadouts dd{margin:0;font:18px/1.5 Consolas,monospace;color:#c4d5d8;letter-spacing:-.03em}
.in-flightOwner,.in-flightProject{pointer-events:auto;display:block;width:100%;text-align:left;border:0;border-bottom:1px solid #8eb5c12e;padding:13px 0;background:transparent;color:#bacbd2;cursor:pointer;transition:color 180ms,border-color 180ms}
.in-flightOwner small{display:block;font-size:8px;font-weight:400;color:#b7a389;margin-bottom:6px}.in-flightOwner strong{font-size:10px;line-height:1.6;font-weight:500;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.in-flightOwner:hover,.in-flightProject:hover{color:#efd3ac;border-color:#d4b27b}.in-flightProject{font-size:9px;color:#8dabb9;padding:11px 0}.in-flightProject b{float:right;font:11px Consolas,monospace;color:#c8b695}
.in-flightIdle{font-size:9px;line-height:1.9;letter-spacing:.02em;color:#6e8c9f;margin:14px 0 0}
.in-flightEvents,.in-flightFiles{list-style:none;margin:13px 0 0;padding:0}
.in-flightEvents>li{position:relative;border-bottom:1px solid #8cb3c02b;padding-left:10px}
.in-flightEvents>li::before{content:"";position:absolute;left:0;top:18px;height:3px;width:3px;background:#7da7b8}
.in-flightEvents>li[data-status=running]::before{background:#e8b67b;box-shadow:0 0 9px #f0b36a66}.in-flightEvents>li[data-status=failed]::before,.in-flightEvents>li[data-status=refused]::before{background:#d99b8b}
.in-flightEvents button,.in-flightFiles button{pointer-events:auto;display:flex;flex-direction:column;align-items:flex-start;gap:6px;width:100%;min-width:0;text-align:left;border:0;background:transparent;padding:14px 0;cursor:pointer;transition:color 180ms,transform 180ms}
.in-flightEvents button>span{font:8px/1.3 "Microsoft YaHei UI",sans-serif;color:#a69781}.in-flightEvents button>strong{font-size:10px;line-height:1.5;font-weight:500;color:#adc3cf;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere}.in-flightEvents button>small{font-size:8px;color:#617f92}
.in-flightEvents button:hover{transform:translateX(-2px)}.in-flightEvents button:hover>strong{color:#efcf9f}
.in-flightOutputTitle{margin-top:25px}.in-flightFiles>li{border-bottom:1px solid #8cb3c02b}.in-flightFiles button{padding:12px 0;gap:5px}.in-flightFiles button>span{font:8px/1.4 Consolas,monospace;letter-spacing:.08em;color:#8eb5a7}.in-flightFiles button>strong{font-size:10px;line-height:1.6;color:#b3ccbf;font-weight:400;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.in-flightFiles button:hover>strong{color:#f0d4a8}
.in-flightDeck button:focus-visible{outline:1px solid #e2c7a2;outline-offset:4px}
.in-flightKeel{position:absolute;bottom:35px;left:20%;right:20%;display:flex;align-items:center;justify-content:center;gap:12px;font:8px/1.4 "Cascadia Code",Consolas,"Microsoft YaHei UI",monospace;letter-spacing:.10em;color:#6e929f;white-space:nowrap}
.in-flightKeel>i{height:4px;width:4px;transform:rotate(45deg);border:1px solid #b29c72}
[data-ion-craft="v2"] .ion-world[data-network-view=overview] .in-cardWrap>.in-entity[data-kind=step] .in-labelBody{background:radial-gradient(ellipse at 10% 0,#b7e8f11c,transparent 60%),linear-gradient(145deg,#152e40ed,#081622f7);border-color:#94bbc56b;box-shadow:inset 0 1px #d4edf129,inset 0 -1px #142c3da6,0 12px 28px #01060b55;padding:13px 16px;gap:5px}
[data-ion-craft="v2"] .ion-world[data-network-view=overview] .in-cardWrap>.in-entity[data-kind=step] strong{font-size:28px;line-height:1.15;font-weight:550;max-width:97%;min-height:32px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;letter-spacing:-.015em}
[data-ion-craft="v2"] .ion-world[data-network-view=overview] .in-cardWrap>.in-entity[data-kind=step] .in-nodeHead{font-size:10px;color:#bcaa8d}
[data-ion-craft="v2"] .ion-world[data-network-view=overview] .in-cardWrap>.in-entity[data-kind=step] .in-nodeDetail{font-size:12px;color:#8fabbc;max-height:33px}
[data-ion-craft="v2"] .ion-world[data-network-view=overview] .in-cardWrap>.in-entity[data-kind=step] .in-nodeMetrics{gap:13px}.ion-world[data-network-view=overview] .in-cardPorts{display:none!important}
[data-ion-craft="v2"] .ion-world[data-network-view=overview] .in-entity[data-kind=step][data-status=submitted] .in-labelBody{border-color:#8db9aa80;background:linear-gradient(145deg,#1b3440ee,#0a1d2af7)}
[data-ion-craft="v2"] .ion-world[data-network-view=overview] .in-entity[data-kind=step][data-active=true] .in-labelBody{border-color:#d7b185d9;background:radial-gradient(ellipse at 0 0,#c49c5b29,transparent 65%),linear-gradient(145deg,#343c40f5,#0b2331fa);box-shadow:inset 0 1px #f8d9a64d,0 0 26px #b89a4e17,0 9px 22px #01070c88}
@keyframes in-canopy-current{to{stroke-dashoffset:-1408}}
[data-ion-craft="v2"] .ion-world[data-network-view=overview] .in-entity[data-kind=step]::after{display:none!important}
@keyframes in-dial-executing{to{stroke-dashoffset:-30}}
@container metis-viewport (max-width:1050px){.in-flightPort{top:auto;left:30px;bottom:41px;max-height:90px;width:210px;display:grid;grid-template-columns:72px 1fr;gap:0 12px;border:0;padding:0}.in-flightPort>.in-flightEyebrow{grid-column:1/-1;font-size:7px}.in-missionDial{height:70px;width:70px;margin:3px 0 0;grid-column:1;grid-row:2/4}.in-missionDial>div{top:20px}.in-missionDial strong{font-size:22px}.in-missionDial small{font-size:9px}.in-missionDial>div>span{display:none}.in-flightPhase{grid-row:2;grid-column:2;justify-content:flex-start;margin:12px 0 0;font-size:9px}.in-flightReadouts,.in-flightIdle,.in-flightOwner{display:none}.in-flightProject{grid-row:3;grid-column:2;font-size:8px;padding:5px 0}.in-flightStarboard{top:auto;right:30px;bottom:46px;width:200px;max-height:90px;border:0;padding:0}.in-flightStarboard>.in-flightEyebrow:first-child,.in-flightEvents,.in-flightOutputTitle~.in-flightIdle{display:none}.in-flightOutputTitle{margin-top:0;font-size:7px}.in-flightFiles{margin-top:3px}.in-flightFiles>li:not(:first-child){display:none}.in-flightFiles button{padding:7px 0;gap:3px}.in-flightFiles button>span{font-size:7px}.in-flightFiles button>strong{max-width:200px;font-size:9px}.in-flightHeading{left:17%;right:17%;font-size:7px;gap:9px}.in-flightKeel{bottom:22px;font-size:7px}.ic-workspace .ic-stage[data-research-level=overview] .in-projectConsole .ic-context h1{font-size:22px}.ic-workspace .ic-stage[data-research-level=overview] .in-projectConsole .ic-context{left:22px}.ic-stage[data-research-level=overview] .in-consoleStrip{left:22px;right:18px}.ic-workspace .ic-stage[data-research-level=overview] .in-projectConsole .ic-cameraTools{right:18px}}
@container metis-viewport (max-width:620px){.in-flightPort,.in-flightStarboard{display:none}.in-flightHeading{left:10%;right:10%;gap:8px;font-size:6px;top:25px}.in-flightHeading>i{max-width:30px}.in-flightKeel{left:12%;right:12%;gap:7px;font-size:6px;bottom:28px}.in-flightKeel>span:last-child{display:none}.ic-workspace .ic-stage[data-research-level=overview] .in-projectConsole .ic-context{left:15px;max-width:calc(100% - 180px)}.ic-workspace .ic-stage[data-research-level=overview] .in-projectConsole .ic-context h1{font-size:18px}.ic-stage[data-research-level=overview] .in-consoleStrip{left:15px;right:12px}.ic-workspace .ic-stage[data-research-level=overview] .in-projectConsole .ic-cameraTools{right:12px}}
@media(prefers-reduced-motion:reduce){.in-canopyCurrent,.in-missionDial>svg>path[data-active=true]{animation:none!important}.in-flightEvents button:hover{transform:none}.in-flightDeck button{transition:none!important}}
[data-motion-paused=true] .in-canopyCurrent,[data-motion-paused=true] .in-missionDial>svg>path[data-active=true]{animation-play-state:paused!important}
`;function bS(i,e){return Lu(i,{...e,createIonWorld:Id,workbenchCss:Pd})}function vS(i,e){return Nd(i,{...e,researchSceneState:ts,createIonWorld:Id,workbenchCss:Pd})}export{bS as createCircuitWorkspace,vS as createResearchScene,ts as researchSceneState,Dd as stepStateLabels};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

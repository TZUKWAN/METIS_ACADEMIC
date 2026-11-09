var td={not_started:"未开始",working:"处理中",checking:"核验中",needs_revision:"待改进",needs_recheck:"待复核",blocked:"等待处理",passed:"待交付",submitted:"已交付"};function Fs(n,e=null){let t=Array.isArray(n?.steps)?n.steps:[],i=Array.isArray(n?.activity)?n.activity:[],s=i.filter(h=>h.status==="running"),r=i.at(-1)||null,a=n?.revision?.phase==="awaiting_downstream"||n?.revision?.decision?.dispatch==="pending",o=i.findLast(h=>h.jobId&&["waiting","unverified"].includes(h.status)),c=n?.execution?.running===!0,l=new Set(s.map(h=>h.stepId).filter(Boolean)),d=t.filter(h=>h.status==="submitted").length,f=t.filter(h=>["needs_revision","needs_recheck","blocked"].includes(h.status)),u=!c&&!s.length&&["failed","refused","needs_revision"].includes(r?.status),p=t.length>0&&d===t.length,g=n?.status!=="ready"?"unavailable":s.length?"running":a?"waiting":c?"processing":o?"waiting":u||f.length?"attention":r?.status==="cancelled"?"stopped":p?"completed":"ready",b=g==="unavailable"?"正在读取项目":s.length?s.at(-1).label:a?"请选择后续步骤是否重做":c?"研究助手正在处理":o?.status==="unverified"?"上次后台任务状态待确认":o?"等待后台任务回执":u?"最近调用需要处理":f.length?"当前成果需要核验或改进":g==="stopped"?"本轮调用已停止":p?"全部步骤已交付":r?.status==="interrupted"?"上次执行已中断":"等待开始或继续研究",m=new Set;for(let h of t)for(let S of h.delivery?.artifacts||[])S.availability==="file"&&m.add(S.path);return{id:n?.id||"",name:n?.name||"",modeName:n?.modeName||"",phase:g,headline:b,target:s.at(-1)?.target||"",activeCalls:s,activities:i,recent:r,delivered:d,total:t.length,files:m.size,attention:f.length,nodes:t.map((h,S)=>({id:h.id,title:h.title,index:S,status:h.status,purpose:h.purpose||"",expected:h.expected||"",delivery:h.delivery||null,feedback:h.feedback||[],label:h.delivery?.manuallyEditedAt&&h.status!=="submitted"?"手动修改待核验":td[h.status]||"状态未知",active:l.has(h.id),viewed:h.id===e,loop:h.loop===!0,recentCall:i.findLast(w=>w.stepId===h.id)||null,recentChecks:i.filter(w=>w.stepId===h.id&&w.kind==="review"&&w.invoked!==!1).length}))}}var ta=`
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
`;function id(n,{Icon:e,createIonWorld:t,researchSceneState:i,workbenchCss:s=""}){let r=n.createElement,a=ta,o={unavailable:"未就绪",running:"执行中",processing:"处理中",waiting:"待确认",attention:"需处理",stopped:"已停止",completed:"已交付",ready:"待继续"};return function({project:l,viewedId:d,viewedManually:f=!1,onInspect:u,onFocusChat:p,onOpenFile:g,onDetails:b,children:m}){let h=i(l,d),S=n.useRef(null),w=n.useRef(null),y=n.useRef(h),P=n.useRef({onInspect:u,onFocusChat:p}),[A,x]=n.useState(!1),[M,z]=n.useState(!0),[R,N]=n.useState("loading"),[B,U]=n.useState(null),[T,k]=n.useState(0),[q,V]=n.useState(!0);y.current=h,P.current={onInspect:u,onFocusChat:p},n.useLayoutEffect(()=>{if(!M||!S.current)return;let G=S.current,Se=!0,De=null,K=null,ge=null;N("loading"),U(null);try{De=t({host:S.current,onPick:pe=>P.current.onInspect(pe),onFocusChat:()=>P.current.onFocusChat(),onState:pe=>{Se&&(pe.renderer&&N(pe.renderer),typeof pe.follow=="boolean"&&V(pe.follow))},onError:pe=>{Se&&U(pe)}}),w.current=De,De.update(y.current);let ye=()=>{let pe=S.current?.getBoundingClientRect();pe?.width&&pe.height&&De.resize(pe.width,pe.height)};K=new ResizeObserver(ye),K.observe(S.current),ye(),ge=new IntersectionObserver(pe=>De.visible(pe[0]?.isIntersecting===!0)),ge.observe(S.current)}catch(ye){Se&&(U(ye.message),N("error"))}return()=>{Se=!1,K?.disconnect(),ge?.disconnect(),De?.dispose(),G.replaceChildren(),w.current=null}},[M,T]),n.useEffect(()=>{w.current?.update(h)},[l,d]),n.useEffect(()=>{f&&d&&w.current?.focus(d)},[d,f]);let te=h.activeCalls.at(-1)?.stepId,H=h.nodes.find(G=>G.id===d)||h.nodes.find(G=>G.id===te)||h.nodes[0],Q=G=>G?new Date(G).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return r("section",{className:"mrv ion-display","aria-label":"研究现场","data-theme":"ion","data-phase":h.phase,"data-expanded":A,"data-graphics":R},r("style",null,a+s),r("header",{className:"ion-head"},r("div",{className:"ion-brand"},r("strong",null,"研究现场"),r("small",null,"METIS / LIVE CIRCUIT")),r("span",{className:"ion-phase",role:"status"},o[h.phase]),r("div",{className:"ion-actions"},r("button",{type:"button",className:"ion-icon","aria-label":"全景视角",onClick:()=>w.current?.home()},r(e,{name:"layers",size:13}),r("span",{className:"ion-label"},"全景")),r("button",{type:"button",className:"ion-icon","aria-label":"跟随实际执行","aria-pressed":q,onClick:()=>w.current?.follow(!q)},r(e,{name:"activity",size:13}),r("span",{className:"ion-label"},"跟随")),r("button",{type:"button",className:"ion-icon","aria-label":A?"缩小研究现场":"放大研究现场","aria-pressed":A,onClick:()=>x(G=>!G)},r(e,{name:"expand",size:13})),r("button",{type:"button",className:"ion-icon","aria-label":M?"收起离子回路":"展开离子回路","aria-expanded":M,onClick:()=>z(G=>!G)},r(e,{name:M?"up":"down",size:13})))),M?r("div",{className:"ion-frame"},r("div",{className:"ion-world",ref:S,style:{visibility:B?"hidden":void 0},"aria-label":"三维研究步骤电路"}),r("div",{className:"ion-overview"},r("div",{className:"ion-kpi"},r("strong",null,h.delivered,r("span",null," / "+h.total)),r("small",null,"步骤已交付")),r("div",{className:"ion-kpi"},r("strong",null,h.files),r("small",null,"真实交付文件")),r("div",{className:"ion-kpi"},r("strong",null,h.attention),r("small",null,"待处理步骤")),r("div",{className:"ion-caption"},r("b",null,h.modeName),"节点来自本项目的固定研究流程")),r("div",{className:"ion-controlsHint"},"拖动转动视角 · 滚轮缩放 · 点卡片进入步骤"),r("div",{className:"ion-live"},r("div",null,r("strong",{"data-scene-headline":!0},h.headline),r("small",{title:h.target},h.target||"实际调用开始后，链路与光球随所属步骤点亮"))),R==="loading"||B?r("div",{className:"ion-loader",role:B?"alert":"status"},r("strong",null,B?"三维离子回路未能显示":"正在建立研究链路…"),r("small",null,B||"载入本地场景与实际步骤"),B?r(n.Fragment,null,r("button",{type:"button",className:"ion-icon",onClick:()=>k(G=>G+1)},"重新初始化场景"),r("div",{className:"ion-fallbackGrid","aria-label":"研究步骤"},h.nodes.map(G=>r("button",{type:"button",className:"ion-fallbackStep",key:G.id,"data-scene-step":G.id,"aria-pressed":G.viewed,onClick:()=>u(G.id)},r("span",null,String(G.index+1).padStart(2,"0")),r("strong",null,G.title),r("small",null,G.label))))):null):null):null,r("div",{className:"ion-deck"},r("section",{className:"ion-panel","aria-label":"步骤焦点"},r("h3",{className:"ion-panelTitle"},r(e,{name:"layers",size:12}),"STEP FOCUS / 步骤焦点"),H?r(n.Fragment,null,r("div",{className:"ion-focusTitle"},r("strong",null,String(H.index+1).padStart(2,"0")+" · "+H.title),r("small",null,H.label)),r("p",{className:"ion-purpose"},H.purpose||H.expected||"此步骤的目标与交付以模式配置为准。"),H.delivery?.artifacts?.filter(G=>G.availability==="file").slice(0,3).map(G=>r("button",{key:G.path,type:"button",className:"ion-file",title:G.path,onClick:()=>g?.(H.id,H.delivery.artifacts.indexOf(G),G)},"↗ "+G.name)),r("div",{className:"ion-focusActions"},r("button",{type:"button",className:"ion-icon",onClick:()=>{u(H.id),p()}},"提出修改意见"),r("button",{type:"button",className:"ion-icon",onClick:()=>b?.(H.id)},"查看步骤详情"))):r("p",{className:"ion-empty"},"当前项目未记录研究步骤。")),r("section",{className:"ion-panel","aria-label":"实际调用动态"},r("h3",{className:"ion-panelTitle"},r(e,{name:"activity",size:12}),"EXECUTION FEED / 实际调用"),h.activities.length?h.activities.slice(-3).reverse().map(G=>r("div",{className:"ion-event",key:G.callId,"data-state":G.status},r("i",{"aria-hidden":!0}),r("div",null,r("strong",null,G.label),r("small",{title:G.target},G.target||G.tool)),r("time",{dateTime:G.startedAt||G.finishedAt},Q(G.startedAt||G.finishedAt)))):r("p",{className:"ion-empty"},"暂无执行记录。研究开始后显示真实工具、读取对象与核验结果。"))),m?r("details",{className:"ion-records"},r("summary",null,"完整执行记录与调用详情"),m):null)}}var bn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},vn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Vd=0,rc=1,Gd=2;var Dr=1,Wd=2,Es=3,yn=0,$t=1,Pi=2,Ji=0,Ts=1,ai=2,ac=3,oc=4,Xd=5;var kn=100,Yd=101,qd=102,Zd=103,Jd=104,Kd=200,$d=201,jd=202,Qd=203,lc=204,cc=205,eh=206,th=207,ih=208,nh=209,sh=210,rh=211,ah=212,oh=213,lh=214,Fa=0,Oa=1,ka=2,hs=3,Ba=4,za=5,Ha=6,Va=7,dc=0,ch=1,dh=2,Ii=0,Nr=1,Ur=2,Fr=3,Bn=4,Or=5,kr=6,Br=7;var hc=300,zn=301,As=302,bo=303,vo=304,Ga=1e3,Ei=1001,Wa=1002,Dt=1003,hh=1004;var zr=1005;var qt=1006,yo=1007;var Ki=1008;var jt=1009,uc=1010,pc=1011,Rs=1012,So=1013,_i=1014,bi=1015,Ft=1016,Mo=1017,wo=1018,Hn=1020,fc=35902,mc=35899,gc=1021,xc=1022,vi=1023,Gi=1026,$i=1027,_c=1028,Eo=1029,Sn=1030,To=1031;var Ao=1033,Hr=33776,Vr=33777,Gr=33778,Wr=33779,Ro=35840,Co=35841,Po=35842,Io=35843,Lo=36196,Do=37492,No=37496,Uo=37488,Fo=37489,Xr=37490,Oo=37491,ko=37808,Bo=37809,zo=37810,Ho=37811,Vo=37812,Go=37813,Wo=37814,Xo=37815,Yo=37816,qo=37817,Zo=37818,Jo=37819,Ko=37820,$o=37821,jo=36492,Qo=36494,el=36495,tl=36283,il=36284,Yr=36285,nl=36286;var Ks=2300,Xa=2301,Na=2302,ql=2303,Zl=2400,Jl=2401,Kl=2402;var uh=3200;var sl=0,ph=1,ji="",Yt="srgb",$s="srgb-linear",js="linear",lt="srgb";var Ua=7680;var fh=519,mh=512,gh=513,xh=514,bc=515,_h=516,bh=517,vc=518,yc=519,Sc=35044;var Mc="300 es",ci=2e3,us=2001;function Ru(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Cu(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Qs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function vh(){let n=Qs("canvas");return n.style.display="block",n}var nd={},ps=null;function er(...n){let e="THREE."+n.shift();ps?ps("log",e,...n):console.log(e,...n)}function yh(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ve(...n){n=yh(n);let e="THREE."+n.shift();if(ps)ps("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function We(...n){n=yh(n);let e="THREE."+n.shift();if(ps)ps("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ys(...n){let e=n.join(" ");e in nd||(nd[e]=!0,Ve(...n))}function Sh(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var Mh={[Fa]:Fa,[ka]:Ha,[Ba]:Ba,[hs]:za,[Oa]:Oa,[Ha]:ka,[Va]:Va,[za]:hs},mi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],sd=1234567,cs=Math.PI/180,fs=180/Math.PI;function Qi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(zt[n&255]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[i&255]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]).toLowerCase()}function Qe(n,e,t){return Math.max(e,Math.min(t,n))}function wc(n,e){return(n%e+e)%e}function Pu(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Iu(n,e,t){return n!==e?(t-n)/(e-n):0}function qs(n,e,t){return(1-t)*n+t*e}function Lu(n,e,t,i){return qs(n,e,1-Math.exp(-t*i))}function Du(n,e=1){return e-Math.abs(wc(n,e*2)-e)}function Nu(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Uu(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Fu(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Ou(n,e){return n+Math.random()*(e-n)}function ku(n){return n*(.5-Math.random())}function Bu(n){n!==void 0&&(sd=n);let e=sd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function zu(n){return n*cs}function Hu(n){return n*fs}function Vu(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function Gu(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Ec(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Wu(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+i)/2),d=a((e+i)/2),f=r((e-i)/2),u=a((e-i)/2),p=r((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":n.set(o*d,c*f,c*u,o*l);break;case"YZY":n.set(c*u,o*d,c*f,o*l);break;case"ZXZ":n.set(c*f,c*u,o*d,o*l);break;case"XZX":n.set(o*d,c*g,c*p,o*l);break;case"YXY":n.set(c*p,o*d,c*g,o*l);break;case"ZYZ":n.set(c*g,c*p,o*d,o*l);break;default:Ve("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function rl(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Tc(n,e){if(e.constructor===Float32Array)return n;let t=rl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/t,-1)}function Ac(n,e){if(e.constructor===Float32Array)return n;let t=rl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*t)}var Cs={DEG2RAD:cs,RAD2DEG:fs,generateUUID:Qi,clamp:Qe,euclideanModulo:wc,mapLinear:Pu,inverseLerp:Iu,lerp:qs,damp:Lu,pingpong:Du,smoothstep:Nu,smootherstep:Uu,randInt:Fu,randFloat:Ou,randFloatSpread:ku,seededRandom:Bu,degToRad:zu,radToDeg:Hu,isPowerOfTwo:Vu,ceilPowerOfTwo:Gu,floorPowerOfTwo:Ec,setQuaternionFromProperEuler:Wu,normalize:Ac,denormalize:Tc},de=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Zt=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let c=i[s+0],l=i[s+1],d=i[s+2],f=i[s+3],u=r[a+0],p=r[a+1],g=r[a+2],b=r[a+3];if(f!==b||c!==u||l!==p||d!==g){let m=c*u+l*p+d*g+f*b;m<0&&(u=-u,p=-p,g=-g,b=-b,m=-m);let h=1-o;if(m<.9995){let S=Math.acos(m),w=Math.sin(S);h=Math.sin(h*S)/w,o=Math.sin(o*S)/w,c=c*h+u*o,l=l*h+p*o,d=d*h+g*o,f=f*h+b*o}else{c=c*h+u*o,l=l*h+p*o,d=d*h+g*o,f=f*h+b*o;let S=1/Math.sqrt(c*c+l*l+d*d+f*f);c*=S,l*=S,d*=S,f*=S}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],c=i[s+1],l=i[s+2],d=i[s+3],f=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+d*f+c*p-l*u,e[t+1]=c*g+d*u+l*f-o*p,e[t+2]=l*g+d*p+o*u-c*f,e[t+3]=d*g-o*f-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),d=o(s/2),f=o(r/2),u=c(i/2),p=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*d*f+l*p*g,this._y=l*p*f-u*d*g,this._z=l*d*g+u*p*f,this._w=l*d*f-u*p*g;break;case"YXZ":this._x=u*d*f+l*p*g,this._y=l*p*f-u*d*g,this._z=l*d*g-u*p*f,this._w=l*d*f+u*p*g;break;case"ZXY":this._x=u*d*f-l*p*g,this._y=l*p*f+u*d*g,this._z=l*d*g+u*p*f,this._w=l*d*f-u*p*g;break;case"ZYX":this._x=u*d*f-l*p*g,this._y=l*p*f+u*d*g,this._z=l*d*g-u*p*f,this._w=l*d*f+u*p*g;break;case"YZX":this._x=u*d*f+l*p*g,this._y=l*p*f+u*d*g,this._z=l*d*g-u*p*f,this._w=l*d*f-u*p*g;break;case"XZY":this._x=u*d*f-l*p*g,this._y=l*p*f-u*d*g,this._z=l*d*g+u*p*f,this._w=l*d*f+u*p*g;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],d=t[6],f=t[10],u=i+o+f;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(i>o&&i>f){let p=2*Math.sqrt(1+i-o-f);this._w=(d-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>f){let p=2*Math.sqrt(1+o-i-f);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+d)/p}else{let p=2*Math.sqrt(1+f-i-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=i*d+a*o+s*l-r*c,this._y=s*d+a*c+r*o-i*l,this._z=r*d+a*l+i*c-s*o,this._w=a*d-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,t=Math.sin(t*l)/d,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),d=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+c*l+a*f-o*d,this.y=i+c*d+o*l-r*f,this.z=s+c*f+r*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return yl.copy(this).projectOnVector(e),this.sub(yl)}reflect(e){return this.sub(yl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},yl=new C,rd=new Zt,Ze=class{static{this.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l)}set(e,t,i,s,r,a,o,c,l){let d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=c,d[6]=i,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],d=i[4],f=i[7],u=i[2],p=i[5],g=i[8],b=s[0],m=s[3],h=s[6],S=s[1],w=s[4],y=s[7],P=s[2],A=s[5],x=s[8];return r[0]=a*b+o*S+c*P,r[3]=a*m+o*w+c*A,r[6]=a*h+o*y+c*x,r[1]=l*b+d*S+f*P,r[4]=l*m+d*w+f*A,r[7]=l*h+d*y+f*x,r[2]=u*b+p*S+g*P,r[5]=u*m+p*w+g*A,r[8]=u*h+p*y+g*x,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-i*r*d+i*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],f=d*a-o*l,u=o*c-d*r,p=l*r-a*c,g=t*f+i*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/g;return e[0]=f*b,e[1]=(s*l-d*i)*b,e[2]=(o*i-s*a)*b,e[3]=u*b,e[4]=(d*t-s*c)*b,e[5]=(s*r-o*t)*b,e[6]=p*b,e[7]=(i*c-l*t)*b,e[8]=(a*t-i*r)*b,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Ys("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Sl.makeScale(e,t)),this}rotate(e){return Ys("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Sl.makeRotation(-e)),this}translate(e,t){return Ys("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Sl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Sl=new Ze,ad=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),od=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xu(){let n={enabled:!0,workingColorSpace:$s,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===lt&&(s.r=Vi(s.r),s.g=Vi(s.g),s.b=Vi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(s.r=ds(s.r),s.g=ds(s.g),s.b=ds(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ji?js:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[$s]:{primaries:e,whitePoint:i,transfer:js,toXYZ:ad,fromXYZ:od,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:i,transfer:lt,toXYZ:ad,fromXYZ:od,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),n}var tt=Xu();function Vi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ds(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Yn,Ya=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Yn===void 0&&(Yn=Qs("canvas")),Yn.width=e.width,Yn.height=e.height;let s=Yn.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Yn}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Qs("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Vi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Vi(t[i]/255)*255):t[i]=Vi(t[i]);return{data:t,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Yu=0,ms=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=Qi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ml(s[a].image)):r.push(Ml(s[a]))}else r=Ml(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Ml(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ya.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}var qu=0,wl=new C,Jt=class n extends mi{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Ei,s=Ei,r=qt,a=Ki,o=vi,c=jt,l=n.DEFAULT_ANISOTROPY,d=ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qu++}),this.uuid=Qi(),this.name="",this.source=new ms(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(wl).x}get height(){return this.source.getSize(wl).y}get depth(){return this.source.getSize(wl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ve(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==hc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ga:e.x=e.x-Math.floor(e.x);break;case Ei:e.x=e.x<0?0:1;break;case Wa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ga:e.y=e.y-Math.floor(e.y);break;case Ei:e.y=e.y<0?0:1;break;case Wa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Jt.DEFAULT_IMAGE=null;Jt.DEFAULT_MAPPING=hc;Jt.DEFAULT_ANISOTROPY=1;var bt=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,c=e.elements,l=c[0],d=c[4],f=c[8],u=c[1],p=c[5],g=c[9],b=c[2],m=c[6],h=c[10];if(Math.abs(d-u)<.01&&Math.abs(f-b)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+b)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(l+1)/2,y=(p+1)/2,P=(h+1)/2,A=(d+u)/4,x=(f+b)/4,M=(g+m)/4;return w>y&&w>P?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=A/i,r=x/i):y>P?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=A/s,r=M/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=x/r,s=M/r),this.set(i,s,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(f-b)*(f-b)+(u-d)*(u-d));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(f-b)/S,this.z=(u-d)/S,this.w=Math.acos((l+p+h-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this.w=Qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this.w=Qe(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},qa=class extends mi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t),this.textures=[];let s=i.count;for(let r=0;r<s;r++)this.textures[r]=new Jt({width:e,height:t,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ms(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},At=class extends qa{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},tr=class extends Jt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Za=class extends Jt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var dt=class n{static{this.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,c,l,d,f,u,p,g,b,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l,d,f,u,p,g,b,m)}set(e,t,i,s,r,a,o,c,l,d,f,u,p,g,b,m){let h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=s,h[1]=r,h[5]=a,h[9]=o,h[13]=c,h[2]=l,h[6]=d,h[10]=f,h[14]=u,h[3]=p,h[7]=g,h[11]=b,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/qn.setFromMatrixColumn(e,0).length(),r=1/qn.setFromMatrixColumn(e,1).length(),a=1/qn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let u=a*d,p=a*f,g=o*d,b=o*f;t[0]=c*d,t[4]=-c*f,t[8]=l,t[1]=p+g*l,t[5]=u-b*l,t[9]=-o*c,t[2]=b-u*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){let u=c*d,p=c*f,g=l*d,b=l*f;t[0]=u+b*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*f,t[5]=a*d,t[9]=-o,t[2]=p*o-g,t[6]=b+u*o,t[10]=a*c}else if(e.order==="ZXY"){let u=c*d,p=c*f,g=l*d,b=l*f;t[0]=u-b*o,t[4]=-a*f,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*d,t[9]=b-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let u=a*d,p=a*f,g=o*d,b=o*f;t[0]=c*d,t[4]=g*l-p,t[8]=u*l+b,t[1]=c*f,t[5]=b*l+u,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let u=a*c,p=a*l,g=o*c,b=o*l;t[0]=c*d,t[4]=b-u*f,t[8]=g*f+p,t[1]=f,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=p*f+g,t[10]=u-b*f}else if(e.order==="XZY"){let u=a*c,p=a*l,g=o*c,b=o*l;t[0]=c*d,t[4]=-f,t[8]=l*d,t[1]=u*f+b,t[5]=a*d,t[9]=p*f-g,t[2]=g*f-p,t[6]=o*d,t[10]=b*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zu,e,Ju)}lookAt(e,t,i){let s=this.elements;return ei.subVectors(e,t),ei.lengthSq()===0&&(ei.z=1),ei.normalize(),on.crossVectors(i,ei),on.lengthSq()===0&&(Math.abs(i.z)===1?ei.x+=1e-4:ei.z+=1e-4,ei.normalize(),on.crossVectors(i,ei)),on.normalize(),ia.crossVectors(ei,on),s[0]=on.x,s[4]=ia.x,s[8]=ei.x,s[1]=on.y,s[5]=ia.y,s[9]=ei.y,s[2]=on.z,s[6]=ia.z,s[10]=ei.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],d=i[1],f=i[5],u=i[9],p=i[13],g=i[2],b=i[6],m=i[10],h=i[14],S=i[3],w=i[7],y=i[11],P=i[15],A=s[0],x=s[4],M=s[8],z=s[12],R=s[1],N=s[5],B=s[9],U=s[13],T=s[2],k=s[6],q=s[10],V=s[14],te=s[3],H=s[7],Q=s[11],G=s[15];return r[0]=a*A+o*R+c*T+l*te,r[4]=a*x+o*N+c*k+l*H,r[8]=a*M+o*B+c*q+l*Q,r[12]=a*z+o*U+c*V+l*G,r[1]=d*A+f*R+u*T+p*te,r[5]=d*x+f*N+u*k+p*H,r[9]=d*M+f*B+u*q+p*Q,r[13]=d*z+f*U+u*V+p*G,r[2]=g*A+b*R+m*T+h*te,r[6]=g*x+b*N+m*k+h*H,r[10]=g*M+b*B+m*q+h*Q,r[14]=g*z+b*U+m*V+h*G,r[3]=S*A+w*R+y*T+P*te,r[7]=S*x+w*N+y*k+P*H,r[11]=S*M+w*B+y*q+P*Q,r[15]=S*z+w*U+y*V+P*G,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],d=e[2],f=e[6],u=e[10],p=e[14],g=e[3],b=e[7],m=e[11],h=e[15],S=c*p-l*u,w=o*p-l*f,y=o*u-c*f,P=a*p-l*d,A=a*u-c*d,x=a*f-o*d;return t*(b*S-m*w+h*y)-i*(g*S-m*P+h*A)+s*(g*w-b*P+h*x)-r*(g*y-b*A+m*x)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],d=e[10];return t*(a*d-o*l)-i*(r*d-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],f=e[9],u=e[10],p=e[11],g=e[12],b=e[13],m=e[14],h=e[15],S=t*o-i*a,w=t*c-s*a,y=t*l-r*a,P=i*c-s*o,A=i*l-r*o,x=s*l-r*c,M=d*b-f*g,z=d*m-u*g,R=d*h-p*g,N=f*m-u*b,B=f*h-p*b,U=u*h-p*m,T=S*U-w*B+y*N+P*R-A*z+x*M;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/T;return e[0]=(o*U-c*B+l*N)*k,e[1]=(s*B-i*U-r*N)*k,e[2]=(b*x-m*A+h*P)*k,e[3]=(u*A-f*x-p*P)*k,e[4]=(c*R-a*U-l*z)*k,e[5]=(t*U-s*R+r*z)*k,e[6]=(m*y-g*x-h*w)*k,e[7]=(d*x-u*y+p*w)*k,e[8]=(a*B-o*R+l*M)*k,e[9]=(i*R-t*B-r*M)*k,e[10]=(g*A-b*y+h*S)*k,e[11]=(f*y-d*A-p*S)*k,e[12]=(o*z-a*N-c*M)*k,e[13]=(t*N-i*z+s*M)*k,e[14]=(b*w-g*P-m*S)*k,e[15]=(d*P-f*w+u*S)*k,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,d=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,d*o+i,d*c-s*a,0,l*c-s*o,d*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,d=a+a,f=o+o,u=r*l,p=r*d,g=r*f,b=a*d,m=a*f,h=o*f,S=c*l,w=c*d,y=c*f,P=i.x,A=i.y,x=i.z;return s[0]=(1-(b+h))*P,s[1]=(p+y)*P,s[2]=(g-w)*P,s[3]=0,s[4]=(p-y)*A,s[5]=(1-(u+h))*A,s[6]=(m+S)*A,s[7]=0,s[8]=(g+w)*x,s[9]=(m-S)*x,s[10]=(1-(u+b))*x,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=qn.set(s[0],s[1],s[2]).length(),o=qn.set(s[4],s[5],s[6]).length(),c=qn.set(s[8],s[9],s[10]).length();r<0&&(a=-a),hi.copy(this);let l=1/a,d=1/o,f=1/c;return hi.elements[0]*=l,hi.elements[1]*=l,hi.elements[2]*=l,hi.elements[4]*=d,hi.elements[5]*=d,hi.elements[6]*=d,hi.elements[8]*=f,hi.elements[9]*=f,hi.elements[10]*=f,t.setFromRotationMatrix(hi),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,s,r,a,o=ci,c=!1){let l=this.elements,d=2*r/(t-e),f=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s),g,b;if(c)g=r/(a-r),b=a*r/(a-r);else if(o===ci)g=-(a+r)/(a-r),b=-2*a*r/(a-r);else if(o===us)g=-a/(a-r),b=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=b,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=ci,c=!1){let l=this.elements,d=2/(t-e),f=2/(i-s),u=-(t+e)/(t-e),p=-(i+s)/(i-s),g,b;if(c)g=1/(a-r),b=a/(a-r);else if(o===ci)g=-2/(a-r),b=-(a+r)/(a-r);else if(o===us)g=-1/(a-r),b=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=b,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},qn=new C,hi=new dt,Zu=new C(0,0,0),Ju=new C(1,1,1),on=new C,ia=new C,ei=new C,ld=new dt,cd=new Zt,Wi=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],d=s[9],f=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ld.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ld,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return cd.setFromEuler(this),this.setFromQuaternion(cd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Wi.DEFAULT_ORDER="XYZ";var ir=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ku=0,dd=new C,Zn=new Zt,Oi=new dt,na=new C,Os=new C,$u=new C,ju=new Zt,hd=new C(1,0,0),ud=new C(0,1,0),pd=new C(0,0,1),fd={type:"added"},Qu={type:"removed"},Jn={type:"childadded",child:null},El={type:"childremoved",child:null},wt=class n extends mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=Qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new C,t=new Wi,i=new Zt,s=new C(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new dt},normalMatrix:{value:new Ze}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ir,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zn.setFromAxisAngle(e,t),this.quaternion.multiply(Zn),this}rotateOnWorldAxis(e,t){return Zn.setFromAxisAngle(e,t),this.quaternion.premultiply(Zn),this}rotateX(e){return this.rotateOnAxis(hd,e)}rotateY(e){return this.rotateOnAxis(ud,e)}rotateZ(e){return this.rotateOnAxis(pd,e)}translateOnAxis(e,t){return dd.copy(e).applyQuaternion(this.quaternion),this.position.add(dd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hd,e)}translateY(e){return this.translateOnAxis(ud,e)}translateZ(e){return this.translateOnAxis(pd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Oi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?na.copy(e):na.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oi.lookAt(Os,na,this.up):Oi.lookAt(na,Os,this.up),this.quaternion.setFromRotationMatrix(Oi),s&&(Oi.extractRotation(s.matrixWorld),Zn.setFromRotationMatrix(Oi),this.quaternion.premultiply(Zn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(We("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fd),Jn.child=e,this.dispatchEvent(Jn),Jn.child=null):We("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qu),El.child=e,this.dispatchEvent(El),El.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fd),Jn.child=e,this.dispatchEvent(Jn),Jn.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,e,$u),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,ju,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){let f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),d=a(e.images),f=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let c=[];for(let l in o){let d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};wt.DEFAULT_UP=new C(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var St=class extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}},ep={type:"move"},gs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new St,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new St,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new St,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let b of e.hand.values()){let m=t.getJointPose(b,i),h=this._getHandJoint(l,b);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.quaternion,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}let d=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=d.position.distanceTo(f.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ep)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new St;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},wh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ln={h:0,s:0,l:0},sa={h:0,s:0,l:0};function Tl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Ge=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=tt.workingColorSpace){return this.r=e,this.g=t,this.b=i,tt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=tt.workingColorSpace){if(e=wc(e,1),t=Qe(t,0,1),i=Qe(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Tl(a,r,e+1/3),this.g=Tl(a,r,e),this.b=Tl(a,r,e-1/3)}return tt.colorSpaceToWorking(this,s),this}setStyle(e,t=Yt){function i(r){r!==void 0&&parseFloat(r)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ve("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){let i=wh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vi(e.r),this.g=Vi(e.g),this.b=Vi(e.b),this}copyLinearToSRGB(e){return this.r=ds(e.r),this.g=ds(e.g),this.b=ds(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return tt.workingToColorSpace(Ht.copy(this),e),Math.round(Qe(Ht.r*255,0,255))*65536+Math.round(Qe(Ht.g*255,0,255))*256+Math.round(Qe(Ht.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(Ht.copy(this),t);let i=Ht.r,s=Ht.g,r=Ht.b,a=Math.max(i,s,r),o=Math.min(i,s,r),c,l,d=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=d<=.5?f/(a+o):f/(2-a-o),a){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Yt){tt.workingToColorSpace(Ht.copy(this),e);let t=Ht.r,i=Ht.g,s=Ht.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(ln),this.setHSL(ln.h+e,ln.s+t,ln.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ln),e.getHSL(sa);let i=qs(ln.h,sa.h,t),s=qs(ln.s,sa.s,t),r=qs(ln.l,sa.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ht=new Ge;Ge.NAMES=wh;var nr=class n{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ge(e),this.density=t}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var sr=class extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wi,this.environmentIntensity=1,this.environmentRotation=new Wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ui=new C,ki=new C,Al=new C,Bi=new C,Kn=new C,$n=new C,md=new C,Rl=new C,Cl=new C,Pl=new C,Il=new bt,Ll=new bt,Dl=new bt,wi=class n{constructor(e=new C,t=new C,i=new C){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),ui.subVectors(e,t),s.cross(ui);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){ui.subVectors(s,t),ki.subVectors(i,t),Al.subVectors(e,t);let a=ui.dot(ui),o=ui.dot(ki),c=ui.dot(Al),l=ki.dot(ki),d=ki.dot(Al),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,p=(l*c-o*d)*u,g=(a*d-o*c)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(e,t,i,s,r,a,o,c){return this.getBarycoord(e,t,i,s,Bi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Bi.x),c.addScaledVector(a,Bi.y),c.addScaledVector(o,Bi.z),c)}static getInterpolatedAttribute(e,t,i,s,r,a){return Il.setScalar(0),Ll.setScalar(0),Dl.setScalar(0),Il.fromBufferAttribute(e,t),Ll.fromBufferAttribute(e,i),Dl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Il,r.x),a.addScaledVector(Ll,r.y),a.addScaledVector(Dl,r.z),a}static isFrontFacing(e,t,i,s){return ui.subVectors(i,t),ki.subVectors(e,t),ui.cross(ki).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ui.subVectors(this.c,this.b),ki.subVectors(this.a,this.b),ui.cross(ki).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;Kn.subVectors(s,i),$n.subVectors(r,i),Rl.subVectors(e,i);let c=Kn.dot(Rl),l=$n.dot(Rl);if(c<=0&&l<=0)return t.copy(i);Cl.subVectors(e,s);let d=Kn.dot(Cl),f=$n.dot(Cl);if(d>=0&&f<=d)return t.copy(s);let u=c*f-d*l;if(u<=0&&c>=0&&d<=0&&c-d>0)return a=c/(c-d),t.copy(i).addScaledVector(Kn,a);Pl.subVectors(e,r);let p=Kn.dot(Pl),g=$n.dot(Pl);if(g>=0&&p<=g)return t.copy(r);let b=p*l-c*g;if(b<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector($n,o);let m=d*g-p*f;if(m<=0&&f-d>=0&&p-g>=0)return md.subVectors(r,s),o=(f-d)/(f-d+(p-g)),t.copy(s).addScaledVector(md,o);let h=1/(m+b+u);return a=b*h,o=u*h,t.copy(i).addScaledVector(Kn,a).addScaledVector($n,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ti=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(pi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(pi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=pi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,pi):pi.fromBufferAttribute(r,a),pi.applyMatrix4(e.matrixWorld),this.expandByPoint(pi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ra.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ra.copy(i.boundingBox)),ra.applyMatrix4(e.matrixWorld),this.union(ra)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pi),pi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ks),aa.subVectors(this.max,ks),jn.subVectors(e.a,ks),Qn.subVectors(e.b,ks),es.subVectors(e.c,ks),cn.subVectors(Qn,jn),dn.subVectors(es,Qn),Cn.subVectors(jn,es);let t=[0,-cn.z,cn.y,0,-dn.z,dn.y,0,-Cn.z,Cn.y,cn.z,0,-cn.x,dn.z,0,-dn.x,Cn.z,0,-Cn.x,-cn.y,cn.x,0,-dn.y,dn.x,0,-Cn.y,Cn.x,0];return!Nl(t,jn,Qn,es,aa)||(t=[1,0,0,0,1,0,0,0,1],!Nl(t,jn,Qn,es,aa))?!1:(oa.crossVectors(cn,dn),t=[oa.x,oa.y,oa.z],Nl(t,jn,Qn,es,aa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(zi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),zi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),zi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),zi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),zi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),zi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),zi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),zi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(zi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},zi=[new C,new C,new C,new C,new C,new C,new C,new C],pi=new C,ra=new Ti,jn=new C,Qn=new C,es=new C,cn=new C,dn=new C,Cn=new C,ks=new C,aa=new C,oa=new C,Pn=new C;function Nl(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Pn.fromArray(n,r);let o=s.x*Math.abs(Pn.x)+s.y*Math.abs(Pn.y)+s.z*Math.abs(Pn.z),c=e.dot(Pn),l=t.dot(Pn),d=i.dot(Pn);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}var Tt=new C,la=new de,tp=0,fi=class extends mi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:tp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Sc,this.updateRanges=[],this.gpuType=bi,this.version=0,this._normalizationScale=e!==void 0?rl(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)la.fromBufferAttribute(this,t),la.applyMatrix3(e),this.setXY(t,la.x,la.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Tc(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Ac(e,this.array)}};var rr=class extends fi{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var ar=class extends fi{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var rt=class extends fi{constructor(e,t,i){super(new Float32Array(e),t,i)}},ip=new Ti,Bs=new C,Ul=new C,un=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):ip.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bs.subVectors(e,this.center);let t=Bs.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Bs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ul.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bs.copy(e.center).add(Ul)),this.expandByPoint(Bs.copy(e.center).sub(Ul))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},np=0,li=new dt,Fl=new wt,ts=new C,ti=new Ti,zs=new Ti,Lt=new C,pt=class n extends mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=Qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ru(e)?ar:rr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ze().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return li.makeRotationFromQuaternion(e),this.applyMatrix4(li),this}rotateX(e){return li.makeRotationX(e),this.applyMatrix4(li),this}rotateY(e){return li.makeRotationY(e),this.applyMatrix4(li),this}rotateZ(e){return li.makeRotationZ(e),this.applyMatrix4(li),this}translate(e,t,i){return li.makeTranslation(e,t,i),this.applyMatrix4(li),this}scale(e,t,i){return li.makeScale(e,t,i),this.applyMatrix4(li),this}lookAt(e){return Fl.lookAt(e),Fl.updateMatrix(),this.applyMatrix4(Fl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new rt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ti);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];ti.setFromBufferAttribute(r),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,ti.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,ti.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(ti.min),this.boundingBox.expandByPoint(ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&We('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new un);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let i=this.boundingSphere.center;if(ti.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];zs.setFromBufferAttribute(o),this.morphTargetsRelative?(Lt.addVectors(ti.min,zs.min),ti.expandByPoint(Lt),Lt.addVectors(ti.max,zs.max),ti.expandByPoint(Lt)):(ti.expandByPoint(zs.min),ti.expandByPoint(zs.max))}ti.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Lt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Lt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Lt.fromBufferAttribute(o,l),c&&(ts.fromBufferAttribute(e,l),Lt.add(ts)),s=Math.max(s,i.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&We('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){We("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new fi(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],c=[],l=new Uint8Array(i.count);for(let z=0;z<i.count;z++)o[z]=new C,c[z]=new C;let d=new C,f=new C,u=new C,p=new de,g=new de,b=new de,m=new C,h=new C;function S(z,R,N){l[z]=l[R]=l[N]=1,d.fromBufferAttribute(i,z),f.fromBufferAttribute(i,R),u.fromBufferAttribute(i,N),p.fromBufferAttribute(r,z),g.fromBufferAttribute(r,R),b.fromBufferAttribute(r,N),f.sub(d),u.sub(d),g.sub(p),b.sub(p);let B=1/(g.x*b.y-b.x*g.y);isFinite(B)&&(m.copy(f).multiplyScalar(b.y).addScaledVector(u,-g.y).multiplyScalar(B),h.copy(u).multiplyScalar(g.x).addScaledVector(f,-b.x).multiplyScalar(B),o[z].add(m),o[R].add(m),o[N].add(m),c[z].add(h),c[R].add(h),c[N].add(h))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let z=0,R=w.length;z<R;++z){let N=w[z],B=N.start,U=N.count;for(let T=B,k=B+U;T<k;T+=3)S(e.getX(T+0),e.getX(T+1),e.getX(T+2))}let y=new C,P=new C,A=new C,x=new C;function M(z){A.fromBufferAttribute(s,z),x.copy(A);let R=o[z];y.copy(R),y.sub(A.multiplyScalar(A.dot(R))).normalize(),P.crossVectors(x,R);let B=P.dot(c[z])<0?-1:1;a.setXYZW(z,y.x,y.y,y.z,B)}for(let z=0,R=i.count;z<R;++z)l[z]&&M(z);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new fi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);let s=new C,r=new C,a=new C,o=new C,c=new C,l=new C,d=new C,f=new C;if(e)for(let u=0,p=e.count;u<p;u+=3){let g=e.getX(u+0),b=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,b),a.fromBufferAttribute(t,m),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,b),l.fromBufferAttribute(i,m),o.add(d),c.add(d),l.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(b,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(o,c){let l=o.array,d=o.itemSize,f=o.normalized,u=new l.constructor(c.length*d),p=0,g=0;for(let b=0,m=c.length;b<m;b++){o.isInterleavedBufferAttribute?p=c[b]*o.data.stride+o.offset:p=c[b]*d;for(let h=0;h<d;h++)u[g++]=l[p++]}return new fi(u,d,f)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,i);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let d=0,f=l.length;d<f;d++){let u=l[d],p=e(u,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],d=[];for(let f=0,u=l.length;f<u;f++){let p=l[f];d.push(p.toJSON(e.data))}d.length>0&&(s[c]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let l in s){let d=s[l];this.setAttribute(l,d.clone(t))}let r=e.morphAttributes;for(let l in r){let d=[],f=r[l];for(let u=0,p=f.length;u<p;u++)d.push(f[u].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,d=a.length;l<d;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ja=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Sc,this.updateRanges=[],this.version=0,this.uuid=Qi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=gd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let i=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(i,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=gd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let i={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}};function gd(n){return n.buffer._uuid===void 0&&(n.buffer._uuid=Qi()),n.byteOffset===0&&n.byteLength===n.buffer.byteLength?n.buffer._uuid:n.buffer._uuid+":"+n.byteOffset+":"+n.byteLength}var Xt=new C,or=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s,this._normalizationScale=e!==void 0?rl(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){er("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new fi(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){er("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Tc(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Ac(e,this.data.array)}},Ol=new C,sp=new C,rp=new Ze,ii=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=Ol.subVectors(i,t).cross(sp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(Ol),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||rp.getNormalMatrix(e),s=this.coplanarPoint(Ol).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},ap=0,gi=class extends mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=Qi(),this.name="",this.type="Material",this.blending=Ts,this.side=yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lc,this.blendDst=cc,this.blendEquation=kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ua,this.stencilZFail=Ua,this.stencilZPass=Ua,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ve(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ve(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ge().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new ii().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new de().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new de().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ai=class extends gi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ge(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},is,Hs=new C,ns=new C,ss=new C,rs=new de,Vs=new de,Eh=new dt,ca=new C,Gs=new C,da=new C,xd=new de,kl=new de,_d=new de,Xi=class extends wt{constructor(e=new Ai){if(super(),this.isSprite=!0,this.type="Sprite",is===void 0){is=new pt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Ja(t,5);is.setIndex([0,1,2,0,2,3]),is.setAttribute("position",new or(i,3,0,!1)),is.setAttribute("uv",new or(i,2,3,!1))}this.geometry=is,this.material=e,this.center=new de(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&We('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ns.setFromMatrixScale(this.matrixWorld),Eh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ss.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ns.multiplyScalar(-ss.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let a=this.center;ha(ca.set(-.5,-.5,0),ss,a,ns,s,r),ha(Gs.set(.5,-.5,0),ss,a,ns,s,r),ha(da.set(.5,.5,0),ss,a,ns,s,r),xd.set(0,0),kl.set(1,0),_d.set(1,1);let o=e.ray.intersectTriangle(ca,Gs,da,!1,Hs);if(o===null&&(ha(Gs.set(-.5,.5,0),ss,a,ns,s,r),kl.set(0,1),o=e.ray.intersectTriangle(ca,da,Gs,!1,Hs),o===null))return;let c=e.ray.origin.distanceTo(Hs);c<e.near||c>e.far||t.push({distance:c,point:Hs.clone(),uv:wi.getInterpolation(Hs,ca,Gs,da,xd,kl,_d,new de),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function ha(n,e,t,i,s,r){rs.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Vs.x=r*rs.x-s*rs.y,Vs.y=s*rs.x+r*rs.y):Vs.copy(rs),n.copy(e),n.x+=Vs.x,n.y+=Vs.y,n.applyMatrix4(Eh)}var Hi=new C,Bl=new C,ua=new C,pa=new C,pn=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Hi.copy(this.origin).addScaledVector(this.direction,t),Hi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Bl.copy(e).add(t).multiplyScalar(.5),ua.copy(t).sub(e).normalize(),pa.copy(this.origin).sub(Bl);let r=e.distanceTo(t)*.5,a=-this.direction.dot(ua),o=pa.dot(this.direction),c=-pa.dot(ua),l=pa.lengthSq(),d=Math.abs(1-a*a),f,u,p,g;if(d>0)if(f=a*c-o,u=a*o-c,g=r*d,f>=0)if(u>=-g)if(u<=g){let b=1/d;f*=b,u*=b,p=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*c)+l;else u<=-g?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+u*(u+2*c)+l):u<=g?(f=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+u*(u+2*c)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Bl).addScaledVector(ua,u),p}intersectSphere(e,t){if(e.radius<0)return null;Hi.subVectors(e.center,this.origin);let i=Hi.dot(this.direction),s=Hi.dot(Hi)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,c,l=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Hi)!==null}intersectTriangle(e,t,i,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,d=o.z,f=e.x-a.x,u=e.y-a.y,p=e.z-a.z,g=t.x-a.x,b=t.y-a.y,m=t.z-a.z,h=i.x-a.x,S=i.y-a.y,w=i.z-a.z,y=Math.abs(c),P=Math.abs(l),A=Math.abs(d),x,M,z,R,N,B,U,T,k,q,V,te;if(y>=P&&y>=A?(z=c,B=f,k=g,te=h,c>=0?(x=l,M=d,R=u,N=p,U=b,T=m,q=S,V=w):(x=d,M=l,R=p,N=u,U=m,T=b,q=w,V=S)):P>=A?(z=l,B=u,k=b,te=S,l>=0?(x=d,M=c,R=p,N=f,U=m,T=g,q=w,V=h):(x=c,M=d,R=f,N=p,U=g,T=m,q=h,V=w)):(z=d,B=p,k=m,te=w,d>=0?(x=c,M=l,R=f,N=u,U=g,T=b,q=h,V=S):(x=l,M=c,R=u,N=f,U=b,T=g,q=S,V=h)),z===0)return null;let H=x/z,Q=M/z,G=1/z,Se=R-H*B,De=N-Q*B,K=U-H*k,ge=T-Q*k,ye=q-H*te,pe=V-Q*te,re=ye*ge-pe*K,Be=Se*pe-De*ye,it=K*De-ge*Se;if(s){if(re<0||Be<0||it<0)return null}else if((re<0||Be<0||it<0)&&(re>0||Be>0||it>0))return null;let Ne=re+Be+it;if(Ne===0)return null;let Je=G*(re*B+Be*k+it*te);return(Ne>0?Je<0:Je>0)?null:this.at(Je/Ne,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ni=class extends gi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wi,this.combine=dc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},bd=new dt,In=new pn,fa=new un,vd=new C,ma=new C,ga=new C,xa=new C,zl=new C,_a=new C,yd=new C,ba=new C,Mt=class extends wt{constructor(e=new pt,t=new ni){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){_a.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let d=o[c],f=r[c];d!==0&&(zl.fromBufferAttribute(f,e),a?_a.addScaledVector(zl,d):_a.addScaledVector(zl.sub(t),d))}t.add(_a)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),fa.copy(i.boundingSphere),fa.applyMatrix4(r),In.copy(e.ray).recast(e.near),!(fa.containsPoint(In.origin)===!1&&(In.intersectSphere(fa,vd)===null||In.origin.distanceToSquared(vd)>(e.far-e.near)**2))&&(bd.copy(r).invert(),In.copy(e.ray).applyMatrix4(bd),!(i.boundingBox!==null&&In.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,In)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,b=u.length;g<b;g++){let m=u[g],h=a[m.materialIndex],S=Math.max(m.start,p.start),w=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=S,P=w;y<P;y+=3){let A=o.getX(y),x=o.getX(y+1),M=o.getX(y+2);s=va(this,h,e,i,l,d,f,A,x,M),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),b=Math.min(o.count,p.start+p.count);for(let m=g,h=b;m<h;m+=3){let S=o.getX(m),w=o.getX(m+1),y=o.getX(m+2);s=va(this,a,e,i,l,d,f,S,w,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,b=u.length;g<b;g++){let m=u[g],h=a[m.materialIndex],S=Math.max(m.start,p.start),w=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=S,P=w;y<P;y+=3){let A=y,x=y+1,M=y+2;s=va(this,h,e,i,l,d,f,A,x,M),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),b=Math.min(c.count,p.start+p.count);for(let m=g,h=b;m<h;m+=3){let S=m,w=m+1,y=m+2;s=va(this,a,e,i,l,d,f,S,w,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function op(n,e,t,i,s,r,a,o){let c;if(e.side===$t?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===yn,o),c===null)return null;ba.copy(o),ba.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(ba);return l<t.near||l>t.far?null:{distance:l,point:ba.clone(),object:n}}function va(n,e,t,i,s,r,a,o,c,l){n.getVertexPosition(o,ma),n.getVertexPosition(c,ga),n.getVertexPosition(l,xa);let d=op(n,e,t,i,ma,ga,xa,yd);if(d){let f=new C;wi.getBarycoord(yd,ma,ga,xa,f),s&&(d.uv=wi.getInterpolatedAttribute(s,o,c,l,f,new de)),r&&(d.uv1=wi.getInterpolatedAttribute(r,o,c,l,f,new de)),a&&(d.normal=wi.getInterpolatedAttribute(a,o,c,l,f,new C),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new C,materialIndex:0};wi.getNormal(ma,ga,xa,u.normal),d.face=u,d.barycoord=f}return d}var Ka=class extends Jt{constructor(e=null,t=1,i=1,s,r,a,o,c,l=Dt,d=Dt,f,u){super(null,a,o,c,l,d,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ln=new un,lp=new de(.5,.5),ya=new C,fn=class{constructor(e=new ii,t=new ii,i=new ii,s=new ii,r=new ii,a=new ii){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ci,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],d=r[4],f=r[5],u=r[6],p=r[7],g=r[8],b=r[9],m=r[10],h=r[11],S=r[12],w=r[13],y=r[14],P=r[15];if(s[0].setComponents(l-a,p-d,h-g,P-S).normalize(),s[1].setComponents(l+a,p+d,h+g,P+S).normalize(),s[2].setComponents(l+o,p+f,h+b,P+w).normalize(),s[3].setComponents(l-o,p-f,h-b,P-w).normalize(),i)s[4].setComponents(c,u,m,y).normalize(),s[5].setComponents(l-c,p-u,h-m,P-y).normalize();else if(s[4].setComponents(l-c,p-u,h-m,P-y).normalize(),t===ci)s[5].setComponents(l+c,p+u,h+m,P+y).normalize();else if(t===us)s[5].setComponents(c,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ln.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ln.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ln)}intersectsSprite(e){Ln.center.set(0,0,0);let t=lp.distanceTo(e.center);return Ln.radius=.7071067811865476+t,Ln.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ln)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(ya.x=s.normal.x>0?e.max.x:e.min.x,ya.y=s.normal.y>0?e.max.y:e.min.y,ya.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ya)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Sd=new dt,$a=class n{constructor(){this.coordinateSystem=ci,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,i=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];Sd.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new fn),i[s].setFromProjectionMatrix(Sd,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,i=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new fn),t[s].copy(i[s]);return this._count=e._count,this}clone(){return new n().copy(this)}};var Kt=class extends gi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ja=new C,Qa=new C,Md=new dt,Ws=new pn,Sa=new un,Hl=new C,wd=new C,Ri=class extends wt{constructor(e=new pt,t=new Kt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)ja.fromBufferAttribute(t,s-1),Qa.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=ja.distanceTo(Qa);e.setAttribute("lineDistance",new rt(i,1))}else Ve("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Sa.copy(i.boundingSphere),Sa.applyMatrix4(s),Sa.radius+=r,e.ray.intersectsSphere(Sa)===!1)return;Md.copy(s).invert(),Ws.copy(e.ray).applyMatrix4(Md);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){let p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let b=p,m=g-1;b<m;b+=l){let h=d.getX(b),S=d.getX(b+1),w=Ma(this,e,Ws,c,h,S,b);w&&t.push(w)}if(this.isLineLoop){let b=d.getX(g-1),m=d.getX(p),h=Ma(this,e,Ws,c,b,m,g-1);h&&t.push(h)}}else{let p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let b=p,m=g-1;b<m;b+=l){let h=Ma(this,e,Ws,c,b,b+1,b);h&&t.push(h)}if(this.isLineLoop){let b=Ma(this,e,Ws,c,g-1,p,g-1);b&&t.push(b)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ma(n,e,t,i,s,r,a){let o=n.geometry.attributes.position;if(ja.fromBufferAttribute(o,s),Qa.fromBufferAttribute(o,r),t.distanceSqToSegment(ja,Qa,Hl,wd)>i)return;Hl.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(Hl);if(!(l<e.near||l>e.far))return{distance:l,point:wd.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var Ed=new C,Td=new C,Ci=class extends Ri{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Ed.fromBufferAttribute(t,s),Td.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Ed.distanceTo(Td);e.setAttribute("lineDistance",new rt(i,1))}else Ve("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Yi=class extends gi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ad=new dt,$l=new pn,wa=new un,Ea=new C,mn=class extends wt{constructor(e=new pt,t=new Yi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),wa.copy(i.boundingSphere),wa.applyMatrix4(s),wa.radius+=r,e.ray.intersectsSphere(wa)===!1)return;Ad.copy(s).invert(),$l.copy(e.ray).applyMatrix4(Ad);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,f=i.attributes.position;if(l!==null){let u=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=u,b=p;g<b;g++){let m=l.getX(g);Ea.fromBufferAttribute(f,m),Rd(Ea,m,c,s,e,t,this)}}else{let u=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let g=u,b=p;g<b;g++)Ea.fromBufferAttribute(f,g),Rd(Ea,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Rd(n,e,t,i,s,r,a){let o=$l.distanceSqToPoint(n);if(o<t){let c=new C;$l.closestPointToPoint(n,c),c.applyMatrix4(i);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var lr=class extends Jt{constructor(e=[],t=zn,i,s,r,a,o,c,l,d){super(e,t,i,s,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},cr=class extends Jt{constructor(e,t,i,s,r,a,o,c,l){super(e,t,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var qi=class extends Jt{constructor(e,t,i=_i,s,r,a,o=Dt,c=Dt,l,d=Gi,f=1){if(d!==Gi&&d!==$i)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:f};super(u,s,r,a,o,c,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ms(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},dr=class extends qi{constructor(e,t=_i,i=zn,s,r,a=Dt,o=Dt,c,l=Gi){let d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,i,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},hr=class extends Jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},xi=class n extends pt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],d=[],f=[],u=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new rt(l,3)),this.setAttribute("normal",new rt(d,3)),this.setAttribute("uv",new rt(f,2));function g(b,m,h,S,w,y,P,A,x,M,z){let R=y/x,N=P/M,B=y/2,U=P/2,T=A/2,k=x+1,q=M+1,V=0,te=0,H=new C;for(let Q=0;Q<q;Q++){let G=Q*N-U;for(let Se=0;Se<k;Se++){let De=Se*R-B;H[b]=De*S,H[m]=G*w,H[h]=T,l.push(H.x,H.y,H.z),H[b]=0,H[m]=0,H[h]=A>0?1:-1,d.push(H.x,H.y,H.z),f.push(Se/x),f.push(1-Q/M),V+=1}}for(let Q=0;Q<M;Q++)for(let G=0;G<x;G++){let Se=u+G+k*Q,De=u+G+k*(Q+1),K=u+(G+1)+k*(Q+1),ge=u+(G+1)+k*Q;c.push(Se,De,ge),c.push(De,K,ge),te+=6}o.addGroup(p,te,z),p+=te,u+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Ta=new C,Aa=new C,Vl=new C,Ra=new wi,Nn=class extends pt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(cs*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],d=["a","b","c"],f=new Array(3),u=new Map,p=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:b,b:m,c:h}=Ra;if(b.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),h.fromBufferAttribute(o,l[2]),Ra.getNormal(Vl),f[0]=`${Math.round(b.x*s)},${Math.round(b.y*s)},${Math.round(b.z*s)}`,f[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,f[2]=`${Math.round(h.x*s)},${Math.round(h.y*s)},${Math.round(h.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let S=0;S<3;S++){let w=(S+1)%3,y=f[S],P=f[w],A=Ra[d[S]],x=Ra[d[w]],M=`${y}_${P}`,z=`${P}_${y}`,R=u.get(z);R?(Vl.dot(R.normal)<=r&&(p.push(A.x,A.y,A.z),p.push(x.x,x.y,x.z)),u.set(z,null)):u.has(M)||u.set(M,{index0:l[S],index1:l[w],normal:Vl.clone()})}}for(let g of u.values())if(g){let{index0:b,index1:m}=g;Ta.fromBufferAttribute(o,b),Aa.fromBufferAttribute(o,m),p.push(Ta.x,Ta.y,Ta.z),p.push(Aa.x,Aa.y,Aa.z)}this.setAttribute("position",new rt(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},si=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ve("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),s=0,r=i.length,a;t?a=t:a=e*i[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===a)return s/(r-1);let d=i[s],u=i[s+1]-d,p=(a-d)/u;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new de:new C);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new C,s=[],r=[],a=[],o=new C,c=new dt;for(let p=0;p<=e;p++){let g=p/e;s[p]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let l=Number.MAX_VALUE,d=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);d<=l&&(l=d,i.set(1,0,0)),f<=l&&(l=f,i.set(0,1,0)),u<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Qe(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Qe(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},xs=class extends si{constructor(e=0,t=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new de){let i=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let d=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=c-this.aX,p=l-this.aY;c=u*d-p*f+this.aX,l=u*f+p*d+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},eo=class extends xs{constructor(e,t,i,s,r,a){super(e,t,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Rc(){let n=0,e=0,t=0,i=0;function s(r,a,o,c){n=r,e=o,t=-3*r+3*a-2*o-c,i=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,d,f){let u=(a-r)/l-(o-r)/(l+d)+(o-a)/d,p=(o-a)/d-(c-a)/(d+f)+(c-o)/f;u*=d,p*=d,s(a,o,u,p)},calc:function(r){let a=r*r,o=a*r;return n+e*r+t*a+i*o}}}var Cd=new C,Pd=new C,Gl=new Rc,Wl=new Rc,Xl=new Rc,Zi=class extends si{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new C){let i=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,d;this.closed||o>0?l=s[(o-1)%r]:(Pd.subVectors(s[0],s[1]).add(s[0]),l=Pd);let f=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?d=s[(o+2)%r]:(Cd.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=Cd),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(f),p),b=Math.pow(f.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(d),p);b<1e-4&&(b=1),g<1e-4&&(g=b),m<1e-4&&(m=b),Gl.initNonuniformCatmullRom(l.x,f.x,u.x,d.x,g,b,m),Wl.initNonuniformCatmullRom(l.y,f.y,u.y,d.y,g,b,m),Xl.initNonuniformCatmullRom(l.z,f.z,u.z,d.z,g,b,m)}else this.curveType==="catmullrom"&&(Gl.initCatmullRom(l.x,f.x,u.x,d.x,this.tension),Wl.initCatmullRom(l.y,f.y,u.y,d.y,this.tension),Xl.initCatmullRom(l.z,f.z,u.z,d.z,this.tension));return i.set(Gl.calc(c),Wl.calc(c),Xl.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(new C().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Id(n,e,t,i,s){let r=(i-e)*.5,a=(s-t)*.5,o=n*n,c=n*o;return(2*t-2*i+r+a)*c+(-3*t+3*i-2*r-a)*o+r*n+t}function cp(n,e){let t=1-n;return t*t*e}function dp(n,e){return 2*(1-n)*n*e}function hp(n,e){return n*n*e}function Zs(n,e,t,i){return cp(n,e)+dp(n,t)+hp(n,i)}function up(n,e){let t=1-n;return t*t*t*e}function pp(n,e){let t=1-n;return 3*t*t*n*e}function fp(n,e){return 3*(1-n)*n*n*e}function mp(n,e){return n*n*n*e}function Js(n,e,t,i,s){return up(n,e)+pp(n,t)+fp(n,i)+mp(n,s)}var ur=class extends si{constructor(e=new de,t=new de,i=new de,s=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new de){let i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Js(e,s.x,r.x,a.x,o.x),Js(e,s.y,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},to=class extends si{constructor(e=new C,t=new C,i=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new C){let i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Js(e,s.x,r.x,a.x,o.x),Js(e,s.y,r.y,a.y,o.y),Js(e,s.z,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},pr=class extends si{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},io=class extends si{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fr=class extends si{constructor(e=new de,t=new de,i=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new de){let i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(Zs(e,s.x,r.x,a.x),Zs(e,s.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},mr=class extends si{constructor(e=new C,t=new C,i=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new C){let i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(Zs(e,s.x,r.x,a.x),Zs(e,s.y,r.y,a.y),Zs(e,s.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},gr=class extends si{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){let i=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],d=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return i.set(Id(o,c.x,l.x,d.x,f.x),Id(o,c.y,l.y,d.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(new de().fromArray(s))}return this}},no=Object.freeze({__proto__:null,ArcCurve:eo,CatmullRomCurve3:Zi,CubicBezierCurve:ur,CubicBezierCurve3:to,EllipseCurve:xs,LineCurve:pr,LineCurve3:io,QuadraticBezierCurve:fr,QuadraticBezierCurve3:mr,SplineCurve:gr}),so=class extends si{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new no[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let d=c[l];i&&i.equals(d)||(t.push(d),i=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let s=e.curves[t];this.curves.push(new no[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},xr=class extends so{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new pr(this.currentPoint.clone(),new de(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){let r=new fr(this.currentPoint.clone(),new de(e,t),new de(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,a){let o=new ur(this.currentPoint.clone(),new de(e,t),new de(i,s),new de(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new gr(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,i,s,r,a),this}absarc(e,t,i,s,r,a){return this.absellipse(e,t,i,i,s,r,a),this}ellipse(e,t,i,s,r,a,o,c){let l=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+l,t+d,i,s,r,a,o,c),this}absellipse(e,t,i,s,r,a,o,c){let l=new xs(e,t,i,s,r,a,o,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let d=l.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},_s=class extends xr{constructor(e){super(e),this.uuid=Qi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let s=e.holes[t];this.holes.push(new xr().fromJSON(s))}return this}};function gp(n,e,t=2){let i=e&&e.length,s=i?e[0]*t:n.length,r=Th(n,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(i&&(r=yp(n,e,r,t)),n.length>80*t){o=n[0],c=n[1];let d=o,f=c;for(let u=t;u<s;u+=t){let p=n[u],g=n[u+1];p<o&&(o=p),g<c&&(c=g),p>d&&(d=p),g>f&&(f=g)}l=Math.max(d-o,f-c),l=l!==0?32767/l:0}return _r(r,a,t,o,c,l,0),a}function Th(n,e,t,i,s){let r;if(s===Lp(n,e,t,i)>0)for(let a=e;a<t;a+=i)r=Ld(a/i|0,n[a],n[a+1],r);else for(let a=t-i;a>=e;a-=i)r=Ld(a/i|0,n[a],n[a+1],r);return r&&bs(r,r.next)&&(vr(r),r=r.next),r}function Un(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(bs(t,t.next)||yt(t.prev,t,t.next)===0)){if(vr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function _r(n,e,t,i,s,r,a){if(!n)return;!a&&r&&Tp(n,i,s,r);let o=n;for(;n.prev!==n.next;){let c=n.prev,l=n.next;if(r?_p(n,i,s,r):xp(n)){e.push(c.i,n.i,l.i),vr(n),n=l.next,o=l.next;continue}if(n=l,n===o){a?a===1?(n=bp(Un(n),e),_r(n,e,t,i,s,r,2)):a===2&&vp(n,e,t,i,s,r):_r(Un(n),e,t,i,s,r,1);break}}}function xp(n){let e=n.prev,t=n,i=n.next;if(yt(e,t,i)>=0)return!1;let s=e.x,r=t.x,a=i.x,o=e.y,c=t.y,l=i.y,d=Math.min(s,r,a),f=Math.min(o,c,l),u=Math.max(s,r,a),p=Math.max(o,c,l),g=i.next;for(;g!==e;){if(g.x>=d&&g.x<=u&&g.y>=f&&g.y<=p&&Xs(s,o,r,c,a,l,g.x,g.y)&&yt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function _p(n,e,t,i){let s=n.prev,r=n,a=n.next;if(yt(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,d=s.y,f=r.y,u=a.y,p=Math.min(o,c,l),g=Math.min(d,f,u),b=Math.max(o,c,l),m=Math.max(d,f,u),h=jl(p,g,e,t,i),S=jl(b,m,e,t,i),w=n.prevZ,y=n.nextZ;for(;w&&w.z>=h&&y&&y.z<=S;){if(w.x>=p&&w.x<=b&&w.y>=g&&w.y<=m&&w!==s&&w!==a&&Xs(o,d,c,f,l,u,w.x,w.y)&&yt(w.prev,w,w.next)>=0||(w=w.prevZ,y.x>=p&&y.x<=b&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&Xs(o,d,c,f,l,u,y.x,y.y)&&yt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;w&&w.z>=h;){if(w.x>=p&&w.x<=b&&w.y>=g&&w.y<=m&&w!==s&&w!==a&&Xs(o,d,c,f,l,u,w.x,w.y)&&yt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;y&&y.z<=S;){if(y.x>=p&&y.x<=b&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&Xs(o,d,c,f,l,u,y.x,y.y)&&yt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function bp(n,e){let t=n;do{let i=t.prev,s=t.next.next;!bs(i,s)&&Rh(i,t,t.next,s)&&br(i,s)&&br(s,i)&&(e.push(i.i,t.i,s.i),vr(t),vr(t.next),t=n=s),t=t.next}while(t!==n);return Un(t)}function vp(n,e,t,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Cp(a,o)){let c=Ch(a,o);a=Un(a,a.next),c=Un(c,c.next),_r(a,e,t,i,s,r,0),_r(c,e,t,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function yp(n,e,t,i){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*i,c=r<a-1?e[r+1]*i:n.length,l=Th(n,o,c,i,!1);l===l.next&&(l.steiner=!0),s.push(Rp(l))}s.sort(Sp);for(let r=0;r<s.length;r++)t=Mp(s[r],t);return t}function Sp(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=i-s}return t}function Mp(n,e){let t=wp(n,e);if(!t)return e;let i=Ch(t,n);return Un(i,i.next),Un(t,t.next)}function wp(n,e){let t=e,i=n.x,s=n.y,r=-1/0,a;if(bs(n,t))return t;do{if(bs(n,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===i))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,d=1/0;t=a;do{if(i>=t.x&&t.x>=c&&i!==t.x&&Ah(s<l?i:r,s,c,l,s<l?r:i,s,t.x,t.y)){let f=Math.abs(s-t.y)/(i-t.x);br(t,n)&&(f<d||f===d&&(t.x>a.x||t.x===a.x&&Ep(a,t)))&&(a=t,d=f)}t=t.next}while(t!==o);return a}function Ep(n,e){return yt(n.prev,n,e.prev)<0&&yt(e.next,n,n.next)<0}function Tp(n,e,t,i){let s=n;do s.z===0&&(s.z=jl(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Ap(s)}function Ap(n){let e,t=1;do{let i=n,s;n=null;let r=null;for(e=0;i;){e++;let a=i,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,t*=2}while(e>1);return n}function jl(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Rp(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Ah(n,e,t,i,s,r,a,o){return(s-a)*(e-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(i-o)}function Xs(n,e,t,i,s,r,a,o){return!(n===a&&e===o)&&Ah(n,e,t,i,s,r,a,o)}function Cp(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Pp(n,e)&&(br(n,e)&&br(e,n)&&Ip(n,e)&&(yt(n.prev,n,e.prev)||yt(n,e.prev,e))||bs(n,e)&&yt(n.prev,n,n.next)>0&&yt(e.prev,e,e.next)>0)}function yt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function bs(n,e){return n.x===e.x&&n.y===e.y}function Rh(n,e,t,i){let s=Pa(yt(n,e,t)),r=Pa(yt(n,e,i)),a=Pa(yt(t,i,n)),o=Pa(yt(t,i,e));return!!(s!==r&&a!==o||s===0&&Ca(n,t,e)||r===0&&Ca(n,i,e)||a===0&&Ca(t,n,i)||o===0&&Ca(t,e,i))}function Ca(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Pa(n){return n>0?1:n<0?-1:0}function Pp(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Rh(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function br(n,e){return yt(n.prev,n,n.next)<0?yt(n,e,n.next)>=0&&yt(n,n.prev,e)>=0:yt(n,e,n.prev)<0||yt(n,n.next,e)<0}function Ip(n,e){let t=n,i=!1,s=(n.x+e.x)/2,r=(n.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Ch(n,e){let t=Ql(n.i,n.x,n.y),i=Ql(e.i,e.x,e.y),s=n.next,r=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Ld(n,e,t,i){let s=Ql(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function vr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Ql(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Lp(n,e,t,i){let s=0;for(let r=e,a=t-i;r<t;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}var ec=class{static triangulate(e,t,i=2){return gp(e,t,i)}},Dn=class n{static area(e){let t=e.length,i=0;for(let s=t-1,r=0;r<t;s=r++)i+=e[s].x*e[r].y-e[r].x*e[s].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],s=[],r=[];Dd(e),Nd(i,e);let a=e.length;t.forEach(Dd);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,Nd(i,t[c]);let o=ec.triangulate(i,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function Dd(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Nd(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var yr=class n extends pt{constructor(e=new _s([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new rt(s,3)),this.setAttribute("uv",new rt(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,d=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:p-.1,b=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,h=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:Dp,w,y=!1,P,A,x,M;if(h){w=h.getSpacedPoints(d),y=!0,u=!1;let le=h.isCatmullRomCurve3?h.closed:!1;P=h.computeFrenetFrames(d,le),A=new C,x=new C,M=new C}u||(m=0,p=0,g=0,b=0);let z=o.extractPoints(l),R=z.shape,N=z.holes;if(!Dn.isClockWise(R)){R=R.reverse();for(let le=0,xe=N.length;le<xe;le++){let _e=N[le];Dn.isClockWise(_e)&&(N[le]=_e.reverse())}}function U(le){let _e=10000000000000001e-36,Ce=le[0];for(let he=1;he<=le.length;he++){let Me=he%le.length,Te=le[Me],Ke=Te.x-Ce.x,$e=Te.y-Ce.y,Ye=Ke*Ke+$e*$e,F=Math.max(Math.abs(Te.x),Math.abs(Te.y),Math.abs(Ce.x),Math.abs(Ce.y)),ft=_e*F*F;if(Ye<=ft){le.splice(Me,1),he--;continue}Ce=Te}}U(R),N.forEach(U);let T=N.length,k=R;for(let le=0;le<T;le++){let xe=N[le];R=R.concat(xe)}function q(le,xe,_e){return xe||We("ExtrudeGeometry: vec does not exist"),le.clone().addScaledVector(xe,_e)}let V=R.length;function te(le,xe,_e){let Ce,he,Me,Te=le.x-xe.x,Ke=le.y-xe.y,$e=_e.x-le.x,Ye=_e.y-le.y,F=Te*Te+Ke*Ke,ft=Te*Ye-Ke*$e;if(Math.abs(ft)>Number.EPSILON){let He=Math.sqrt(F),ot=Math.sqrt($e*$e+Ye*Ye),be=xe.x-Ke/He,ut=xe.y+Te/He,ee=_e.x-Ye/ot,Pe=_e.y+$e/ot,E=((ee-be)*Ye-(Pe-ut)*$e)/(Te*Ye-Ke*$e);Ce=be+Te*E-le.x,he=ut+Ke*E-le.y;let _=Ce*Ce+he*he;if(_<=2)return new de(Ce,he);Me=Math.sqrt(_/2)}else{let He=!1;Te>Number.EPSILON?$e>Number.EPSILON&&(He=!0):Te<-Number.EPSILON?$e<-Number.EPSILON&&(He=!0):Math.sign(Ke)===Math.sign(Ye)&&(He=!0),He?(Ce=-Ke,he=Te,Me=Math.sqrt(F)):(Ce=Te,he=Ke,Me=Math.sqrt(F/2))}return new de(Ce/Me,he/Me)}let H=[];for(let le=0,xe=k.length,_e=xe-1,Ce=le+1;le<xe;le++,_e++,Ce++)_e===xe&&(_e=0),Ce===xe&&(Ce=0),H[le]=te(k[le],k[_e],k[Ce]);let Q=[],G,Se=H.concat();for(let le=0,xe=T;le<xe;le++){let _e=N[le];G=[];for(let Ce=0,he=_e.length,Me=he-1,Te=Ce+1;Ce<he;Ce++,Me++,Te++)Me===he&&(Me=0),Te===he&&(Te=0),G[Ce]=te(_e[Ce],_e[Me],_e[Te]);Q.push(G),Se=Se.concat(G)}let De;if(m===0)De=Dn.triangulateShape(k,N);else{let le=[],xe=[];for(let _e=0;_e<m;_e++){let Ce=_e/m,he=p*Math.cos(Ce*Math.PI/2),Me=g*Math.sin(Ce*Math.PI/2)+b;for(let Te=0,Ke=k.length;Te<Ke;Te++){let $e=q(k[Te],H[Te],Me);Be($e.x,$e.y,-he),Ce===0&&le.push($e)}for(let Te=0,Ke=T;Te<Ke;Te++){let $e=N[Te];G=Q[Te];let Ye=[];for(let F=0,ft=$e.length;F<ft;F++){let He=q($e[F],G[F],Me);Be(He.x,He.y,-he),Ce===0&&Ye.push(He)}Ce===0&&xe.push(Ye)}}De=Dn.triangulateShape(le,xe)}let K=De.length,ge=g+b;for(let le=0;le<V;le++){let xe=u?q(R[le],Se[le],ge):R[le];y?(x.copy(P.normals[0]).multiplyScalar(xe.x),A.copy(P.binormals[0]).multiplyScalar(xe.y),M.copy(w[0]).add(x).add(A),Be(M.x,M.y,M.z)):Be(xe.x,xe.y,0)}for(let le=1;le<=d;le++)for(let xe=0;xe<V;xe++){let _e=u?q(R[xe],Se[xe],ge):R[xe];y?(x.copy(P.normals[le]).multiplyScalar(_e.x),A.copy(P.binormals[le]).multiplyScalar(_e.y),M.copy(w[le]).add(x).add(A),Be(M.x,M.y,M.z)):Be(_e.x,_e.y,f/d*le)}for(let le=m-1;le>=0;le--){let xe=le/m,_e=p*Math.cos(xe*Math.PI/2),Ce=g*Math.sin(xe*Math.PI/2)+b;for(let he=0,Me=k.length;he<Me;he++){let Te=q(k[he],H[he],Ce);Be(Te.x,Te.y,f+_e)}for(let he=0,Me=N.length;he<Me;he++){let Te=N[he];G=Q[he];for(let Ke=0,$e=Te.length;Ke<$e;Ke++){let Ye=q(Te[Ke],G[Ke],Ce);y?Be(Ye.x,Ye.y+w[d-1].y,w[d-1].x+_e):Be(Ye.x,Ye.y,f+_e)}}}ye(),pe();function ye(){let le=s.length/3;if(u){let xe=0,_e=V*xe;for(let Ce=0;Ce<K;Ce++){let he=De[Ce];it(he[2]+_e,he[1]+_e,he[0]+_e)}xe=d+m*2,_e=V*xe;for(let Ce=0;Ce<K;Ce++){let he=De[Ce];it(he[0]+_e,he[1]+_e,he[2]+_e)}}else{for(let xe=0;xe<K;xe++){let _e=De[xe];it(_e[2],_e[1],_e[0])}for(let xe=0;xe<K;xe++){let _e=De[xe];it(_e[0]+V*d,_e[1]+V*d,_e[2]+V*d)}}i.addGroup(le,s.length/3-le,0)}function pe(){let le=s.length/3,xe=0;re(k,xe),xe+=k.length;for(let _e=0,Ce=N.length;_e<Ce;_e++){let he=N[_e];re(he,xe),xe+=he.length}i.addGroup(le,s.length/3-le,1)}function re(le,xe){let _e=le.length;for(;--_e>=0;){let Ce=_e,he=_e-1;he<0&&(he=le.length-1);for(let Me=0,Te=d+m*2;Me<Te;Me++){let Ke=V*Me,$e=V*(Me+1),Ye=xe+Ce+Ke,F=xe+he+Ke,ft=xe+he+$e,He=xe+Ce+$e;Ne(Ye,F,ft,He)}}}function Be(le,xe,_e){c.push(le),c.push(xe),c.push(_e)}function it(le,xe,_e){Je(le),Je(xe),Je(_e);let Ce=s.length/3,he=S.generateTopUV(i,s,Ce-3,Ce-2,Ce-1);Xe(he[0]),Xe(he[1]),Xe(he[2])}function Ne(le,xe,_e,Ce){Je(le),Je(xe),Je(Ce),Je(xe),Je(_e),Je(Ce);let he=s.length/3,Me=S.generateSideWallUV(i,s,he-6,he-3,he-2,he-1);Xe(Me[0]),Xe(Me[1]),Xe(Me[3]),Xe(Me[1]),Xe(Me[2]),Xe(Me[3])}function Je(le){s.push(c[le*3+0]),s.push(c[le*3+1]),s.push(c[le*3+2])}function Xe(le){r.push(le.x),r.push(le.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return Np(t,i,e)}static fromJSON(e,t){let i=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];i.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new no[s.type]().fromJSON(s)),new n(i,e.options)}},Dp={generateTopUV:function(n,e,t,i,s){let r=e[t*3],a=e[t*3+1],o=e[i*3],c=e[i*3+1],l=e[s*3],d=e[s*3+1];return[new de(r,a),new de(o,c),new de(l,d)]},generateSideWallUV:function(n,e,t,i,s,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[i*3],d=e[i*3+1],f=e[i*3+2],u=e[s*3],p=e[s*3+1],g=e[s*3+2],b=e[r*3],m=e[r*3+1],h=e[r*3+2];return Math.abs(o-d)<Math.abs(a-l)?[new de(a,1-c),new de(l,1-f),new de(u,1-g),new de(b,1-h)]:[new de(o,1-c),new de(d,1-f),new de(p,1-g),new de(m,1-h)]}};function Np(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Sr=class n extends pt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,d=c+1,f=e/o,u=t/c,p=[],g=[],b=[],m=[];for(let h=0;h<d;h++){let S=h*u-a;for(let w=0;w<l;w++){let y=w*f-r;g.push(y,-S,0),b.push(0,0,1),m.push(w/o),m.push(1-h/c)}}for(let h=0;h<c;h++)for(let S=0;S<o;S++){let w=S+l*h,y=S+l*(h+1),P=S+1+l*(h+1),A=S+1+l*h;p.push(w,y,A),p.push(y,P,A)}this.setIndex(p),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(b,3)),this.setAttribute("uv",new rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},Mr=class n extends pt{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],c=[],l=[],d=[],f=e,u=(t-e)/s,p=new C,g=new de;for(let b=0;b<=s;b++){for(let m=0;m<=i;m++){let h=r+m/i*a;p.x=f*Math.cos(h),p.y=f*Math.sin(h),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,d.push(g.x,g.y)}f+=u}for(let b=0;b<s;b++){let m=b*(i+1);for(let h=0;h<i;h++){let S=h+m,w=S,y=S+i+1,P=S+i+2,A=S+1;o.push(w,y,A),o.push(y,P,A)}}this.setIndex(o),this.setAttribute("position",new rt(c,3)),this.setAttribute("normal",new rt(l,3)),this.setAttribute("uv",new rt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var wr=class n extends pt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(a+o,Math.PI),l=0,d=[],f=new C,u=new C,p=[],g=[],b=[],m=[];for(let h=0;h<=i;h++){let S=[],w=h/i,y=a+w*o,P=e*Math.cos(y),A=Math.sqrt(e*e-P*P),x=0;h===0&&a===0?x=.5/t:h===i&&c===Math.PI&&(x=-.5/t);for(let M=0;M<=t;M++){let z=M/t,R=s+z*r;f.x=-A*Math.cos(R),f.y=P,f.z=A*Math.sin(R),g.push(f.x,f.y,f.z),u.copy(f).normalize(),b.push(u.x,u.y,u.z),m.push(z+x,1-w),S.push(l++)}d.push(S)}for(let h=0;h<i;h++)for(let S=0;S<t;S++){let w=d[h][S+1],y=d[h][S],P=d[h+1][S],A=d[h+1][S+1];(h!==0||a>0)&&p.push(w,y,A),(h!==i-1||c<Math.PI)&&p.push(y,P,A)}this.setIndex(p),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(b,3)),this.setAttribute("uv",new rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var vs=class n extends pt{constructor(e=new mr(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new C,c=new C,l=new de,d=new C,f=[],u=[],p=[],g=[];b(),this.setIndex(g),this.setAttribute("position",new rt(f,3)),this.setAttribute("normal",new rt(u,3)),this.setAttribute("uv",new rt(p,2));function b(){for(let w=0;w<t;w++)m(w);m(r===!1?t:0),S(),h()}function m(w){d=e.getPointAt(w/t,d);let y=a.normals[w],P=a.binormals[w];for(let A=0;A<=s;A++){let x=A/s*Math.PI*2,M=Math.sin(x),z=-Math.cos(x);c.x=z*y.x+M*P.x,c.y=z*y.y+M*P.y,c.z=z*y.z+M*P.z,c.normalize(),u.push(c.x,c.y,c.z),o.x=d.x+i*c.x,o.y=d.y+i*c.y,o.z=d.z+i*c.z,f.push(o.x,o.y,o.z)}}function h(){for(let w=1;w<=t;w++)for(let y=1;y<=s;y++){let P=(s+1)*(w-1)+(y-1),A=(s+1)*w+(y-1),x=(s+1)*w+y,M=(s+1)*(w-1)+y;g.push(P,A,M),g.push(A,x,M)}}function S(){for(let w=0;w<=t;w++)for(let y=0;y<=s;y++)l.x=w/t,l.y=y/s,p.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new n(new no[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function Vn(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(Ud(s))s.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Ud(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Gt(n){let e={};for(let t=0;t<n.length;t++){let i=Vn(n[t]);for(let s in i)e[s]=i[s]}return e}function Ud(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Up(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Cc(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}var en={clone:Vn,merge:Gt},Fp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Op=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Nt=class extends gi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fp,this.fragmentShader=Op,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vn(e.uniforms),this.uniformsGroups=Up(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Ge().setHex(s.value);break;case"v2":this.uniforms[i].value=new de().fromArray(s.value);break;case"v3":this.uniforms[i].value=new C().fromArray(s.value);break;case"v4":this.uniforms[i].value=new bt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ze().fromArray(s.value);break;case"m4":this.uniforms[i].value=new dt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ys=class extends Nt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Fn=class extends gi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sl,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var ro=class extends gi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=uh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ao=class extends gi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function as(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Ia(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var gn=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];i:{e:{let a;t:{n:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break i}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},oo=class extends gn{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Zl,endingEnd:Zl}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Jl:r=e,o=2*t-i;break;case Kl:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Jl:a=e,c=2*i-t;break;case Kl:a=1,c=i+s[1]-s[0];break;default:a=e-1,c=t}let l=(i-t)*.5,d=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-i),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,d=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(i-t)/(s-t),b=g*g,m=b*g,h=-u*m+2*u*b-u*g,S=(1+u)*m+(-1.5-2*u)*b+(-.5+u)*g+1,w=(-1-p)*m+(1.5+p)*b+.5*g,y=p*m-p*b;for(let P=0;P!==o;++P)r[P]=h*a[d+P]+S*a[l+P]+w*a[c+P]+y*a[f+P];return r}},lo=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,d=(i-t)/(s-t),f=1-d;for(let u=0;u!==o;++u)r[u]=a[l+u]*f+a[c+u]*d;return r}},co=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ho=class extends gn{interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,d=this.inTangents,f=this.outTangents;if(!d||!f){let g=(i-t)/(s-t),b=1-g;for(let m=0;m!==o;++m)r[m]=a[l+m]*b+a[c+m]*g;return r}let u=o*2,p=e-1;for(let g=0;g!==o;++g){let b=a[l+g],m=a[c+g],h=p*u+g*2,S=f[h],w=f[h+1],y=e*u+g*2,P=d[y],A=d[y+1],x=Bp(i,t,S,P,s);r[g]=Ph(x,b,w,A,m)}return r}};function Ph(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function kp(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function Bp(n,e,t,i,s){let r=(n-e)/(s-e);for(let a=0;a<8;a++){let o=Ph(r,e,t,i,s)-n;if(Math.abs(o)<1e-10)break;let c=kp(r,e,t,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var ri=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=as(t,this.TimeBufferType),this.values=as(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:as(e.times,Array),values:as(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),Ia(e.settings)&&(i.settings={inTangents:as(e.settings.inTangents,Array),outTangents:as(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new co(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new lo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new oo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ho(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ks:t=this.InterpolantFactoryMethodDiscrete;break;case Xa:t=this.InterpolantFactoryMethodLinear;break;case Na:t=this.InterpolantFactoryMethodSmooth;break;case ql:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ve("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ks;case this.InterpolantFactoryMethodLinear:return Xa;case this.InterpolantFactoryMethodSmooth:return Na;case this.InterpolantFactoryMethodBezier:return ql}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e;Ia(this.settings)&&(Fd(this.settings.inTangents,e),Fd(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;Ia(this.settings)&&(Od(this.settings.inTangents,e),Od(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(We("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(We("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){We("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){We("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&Cu(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){We("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Na,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],d=e[o+1];if(l!==d&&(o!==1||l!==e[0]))if(s)c=!0;else{let f=o*i,u=f-i,p=f+i;for(let g=0;g!==i;++g){let b=t[f+g];if(b!==t[u+g]||b!==t[p+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let f=o*i,u=a*i;for(let p=0;p!==i;++p)t[u+p]=t[f+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,c=a*i,l=0;l!==i;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,Ia(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Fd(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]+=e}function Od(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}ri.prototype.ValueTypeName="";ri.prototype.TimeBufferType=Float32Array;ri.prototype.ValueBufferType=Float32Array;ri.prototype.DefaultInterpolation=Xa;var xn=class extends ri{constructor(e,t,i){super(e,t,i)}};xn.prototype.ValueTypeName="bool";xn.prototype.ValueBufferType=Array;xn.prototype.DefaultInterpolation=Ks;xn.prototype.InterpolantFactoryMethodLinear=void 0;xn.prototype.InterpolantFactoryMethodSmooth=void 0;var uo=class extends ri{constructor(e,t,i,s){super(e,t,i,s)}};uo.prototype.ValueTypeName="color";var po=class extends ri{constructor(e,t,i,s){super(e,t,i,s)}};po.prototype.ValueTypeName="number";var fo=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-t)/(s-t),l=e*o;for(let d=l+o;l!==d;l+=4)Zt.slerpFlat(r,0,a,l-o,a,l,c);return r}},Er=class extends ri{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new fo(this.times,this.values,this.getValueSize(),e)}};Er.prototype.ValueTypeName="quaternion";Er.prototype.InterpolantFactoryMethodSmooth=void 0;var _n=class extends ri{constructor(e,t,i){super(e,t,i)}};_n.prototype.ValueTypeName="string";_n.prototype.ValueBufferType=Array;_n.prototype.DefaultInterpolation=Ks;_n.prototype.InterpolantFactoryMethodLinear=void 0;_n.prototype.InterpolantFactoryMethodSmooth=void 0;var mo=class extends ri{constructor(e,t,i,s){super(e,t,i,s)}};mo.prototype.ValueTypeName="vector";var go=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,f){return l.push(d,f),this},this.removeHandler=function(d){let f=l.indexOf(d);return f!==-1&&l.splice(f,2),this},this.getHandler=function(d){for(let f=0,u=l.length;f<u;f+=2){let p=l[f],g=l[f+1];if(p.global&&(p.lastIndex=0),p.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Ih=new go,xo=class{constructor(e){this.manager=e!==void 0?e:Ih,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};xo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ss=class extends wt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ge(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Tr=class extends Ss{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ge(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Yl=new dt,kd=new C,Bd=new C,Ar=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=jt,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fn,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;kd.setFromMatrixPosition(e.matrixWorld),t.position.copy(kd),Bd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){Yl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Yl,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===us||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Yl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},La=new C,Da=new Zt,Mi=new C,Rr=class extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=ci,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(La,Da,Mi),Mi.x===1&&Mi.y===1&&Mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(La,Da,Mi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(La,Da,Mi),Mi.x===1&&Mi.y===1&&Mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(La,Da,Mi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},hn=new C,zd=new de,Hd=new de,Vt=class extends Rr{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=fs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(cs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fs*2*Math.atan(Math.tan(cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){hn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hn.x,hn.y).multiplyScalar(-e/hn.z),hn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(hn.x,hn.y).multiplyScalar(-e/hn.z)}getViewSize(e,t){return this.getViewBounds(e,zd,Hd),t.subVectors(Hd,zd)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(cs*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var tc=class extends Ar{constructor(){super(new Vt(90,1,.5,500)),this.isPointLightShadow=!0}},Cr=class extends Ss{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new tc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},On=class extends Rr{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ic=class extends Ar{constructor(){super(new On(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Pr=class extends Ss{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new ic}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var os=-90,ls=1,Ms=class extends wt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Vt(os,ls,e,t);s.layers=this.layers,this.add(s);let r=new Vt(os,ls,e,t);r.layers=this.layers,this.add(r);let a=new Vt(os,ls,e,t);a.layers=this.layers,this.add(a);let o=new Vt(os,ls,e,t);o.layers=this.layers,this.add(o);let c=new Vt(os,ls,e,t);c.layers=this.layers,this.add(c);let l=new Vt(os,ls,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===ci)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===us)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,d]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let b=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.mipmapsAutoUpdate=b,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},_o=class extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Ir=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=zp.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function zp(){this._document.hidden===!1&&this.reset()}var Pc="\\[\\]\\.:\\/",Hp=new RegExp("["+Pc+"]","g"),Ic="[^"+Pc+"]",Vp="[^"+Pc.replace("\\.","")+"]",Gp=/((?:WC+[\/:])*)/.source.replace("WC",Ic),Wp=/(WCOD+)?/.source.replace("WCOD",Vp),Xp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ic),Yp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ic),qp=new RegExp("^"+Gp+Wp+Xp+Yp+"$"),Zp=["material","materials","bones","map"],nc=class{constructor(e,t,i){let s=i||_t.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},_t=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Hp,"")}static parseTrackName(e){let t=qp.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Zp.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=i(o.children);if(c)return c}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ve("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){We("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){We("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===l){l=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){We("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){We("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){We("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;We("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_t.Composite=nc;_t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_t.prototype.GetterByBindingType=[_t.prototype._getValue_direct,_t.prototype._getValue_array,_t.prototype._getValue_arrayElement,_t.prototype._getValue_toArray];_t.prototype.SetterByBindingTypeAndVersioning=[[_t.prototype._setValue_direct,_t.prototype._setValue_direct_setNeedsUpdate,_t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_array,_t.prototype._setValue_array_setNeedsUpdate,_t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_arrayElement,_t.prototype._setValue_arrayElement_setNeedsUpdate,_t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_fromArray,_t.prototype._setValue_fromArray_setNeedsUpdate,_t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var d_=new Float32Array(1);var ws=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Qe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Qe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var sc=class{static{this.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};var Lr=class extends mi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Lc(n,e,t,i){let s=Jp(i);switch(t){case gc:return n*e;case _c:return n*e/s.components*s.byteLength;case Eo:return n*e/s.components*s.byteLength;case Sn:return n*e*2/s.components*s.byteLength;case To:return n*e*2/s.components*s.byteLength;case xc:return n*e*3/s.components*s.byteLength;case vi:return n*e*4/s.components*s.byteLength;case Ao:return n*e*4/s.components*s.byteLength;case Hr:case Vr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Gr:case Wr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Co:case Io:return Math.max(n,16)*Math.max(e,8)/4;case Ro:case Po:return Math.max(n,8)*Math.max(e,8)/2;case Lo:case Do:case Uo:case Fo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case No:case Xr:case Oo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ko:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Bo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case zo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Vo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Go:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Wo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Xo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Yo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case qo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Zo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Jo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ko:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case $o:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case jo:case Qo:case el:return Math.ceil(n/4)*Math.ceil(e/4)*16;case tl:case il:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Yr:case nl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Jp(n){switch(n){case jt:case uc:return{byteLength:1,components:1};case Rs:case pc:case Ft:return{byteLength:2,components:1};case Mo:case wo:return{byteLength:2,components:4};case _i:case So:case bi:return{byteLength:4,components:1};case fc:case mc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Qh(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function $p(n){let e=new WeakMap;function t(o,c){let l=o.array,d=o.usage,f=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,d),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){let d=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,d);else{f.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<f.length;p++){let g=f[u],b=f[p];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++u,f[u]=b)}f.length=u+1;for(let p=0,g=f.length;p<g;p++){let b=f[p];n.bufferSubData(l,b.start*d.BYTES_PER_ELEMENT,d,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var jp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qp=`#ifdef USE_ALPHAHASH
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
#endif`,ef=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rf=`#ifdef USE_AOMAP
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
#endif`,af=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,of=`#ifdef USE_BATCHING
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
#endif`,lf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,df=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,uf=`#ifdef USE_IRIDESCENCE
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
#endif`,pf=`#ifdef USE_BUMPMAP
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
#endif`,ff=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_f=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,bf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,vf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,yf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Sf=`#define PI 3.141592653589793
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
} // validated`,Mf=`vec3 transformedNormal = objectNormal;
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
#endif`,wf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ef=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Af=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pf=`#ifdef USE_ENVMAP
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
#endif`,If=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Lf=`#ifdef USE_ENVMAP
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
#endif`,Df=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Nf=`#ifdef USE_ENVMAP
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
#endif`,Uf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ff=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Of=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Bf=`#ifdef USE_GRADIENTMAP
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
}`,zf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Wf=`#ifdef USE_ENVMAP
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
#endif`,Xf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jf=`PhysicalMaterial material;
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
#endif`,Kf=`uniform sampler2D dfgLUT;
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
}`,$f=`
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
#endif`,jf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,em=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,tm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,im=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,am=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,om=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,lm=`#if defined( USE_POINTS_UV )
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
#endif`,cm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,um=`#if defined( USE_MORPHCOLORS )
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
#endif`,pm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fm=`#ifdef USE_MORPHTARGETS
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
#endif`,mm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,xm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,_m=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ym=`#ifdef USE_NORMALMAP
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
#endif`,Sm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Em=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Am=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Rm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Im=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Um=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Om=`float getShadowMask() {
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
}`,km=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bm=`#ifdef USE_SKINNING
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
#endif`,zm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hm=`#ifdef USE_SKINNING
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
#endif`,Vm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ym=`#ifdef USE_TRANSMISSION
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
#endif`,qm=`#ifdef USE_TRANSMISSION
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
#endif`,Zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$m=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,jm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qm=`uniform sampler2D t2D;
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
}`,eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tg=`uniform float backgroundBlurriness;
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
}`,ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ng=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sg=`#include <common>
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
}`,rg=`#if DEPTH_PACKING == 3200
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
}`,ag=`#define DISTANCE
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
}`,og=`#define DISTANCE
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
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`uniform float scale;
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
}`,hg=`uniform vec3 diffuse;
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
}`,ug=`#include <common>
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
}`,pg=`uniform vec3 diffuse;
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
}`,fg=`#define LAMBERT
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
}`,mg=`#define LAMBERT
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
}`,gg=`#define MATCAP
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
}`,xg=`#define MATCAP
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
}`,_g=`#define NORMAL
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
}`,bg=`#define NORMAL
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
}`,vg=`#define PHONG
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
}`,yg=`#define PHONG
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
}`,Sg=`#define STANDARD
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
}`,Mg=`#define STANDARD
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
}`,wg=`#define TOON
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
}`,Eg=`#define TOON
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
}`,Tg=`uniform float size;
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
}`,Ag=`uniform vec3 diffuse;
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
}`,Rg=`#include <common>
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
}`,Cg=`uniform vec3 color;
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
}`,Pg=`uniform float rotation;
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
}`,Ig=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:jp,alphahash_pars_fragment:Qp,alphamap_fragment:ef,alphamap_pars_fragment:tf,alphatest_fragment:nf,alphatest_pars_fragment:sf,aomap_fragment:rf,aomap_pars_fragment:af,batching_pars_vertex:of,batching_vertex:lf,begin_vertex:cf,beginnormal_vertex:df,bsdfs:hf,iridescence_fragment:uf,bumpmap_pars_fragment:pf,clipping_planes_fragment:ff,clipping_planes_pars_fragment:mf,clipping_planes_pars_vertex:gf,clipping_planes_vertex:xf,color_fragment:_f,color_pars_fragment:bf,color_pars_vertex:vf,color_vertex:yf,common:Sf,defaultnormal_vertex:Mf,displacementmap_pars_vertex:wf,displacementmap_vertex:Ef,emissivemap_fragment:Tf,emissivemap_pars_fragment:Af,colorspace_fragment:Rf,colorspace_pars_fragment:Cf,envmap_fragment:Pf,envmap_common_pars_fragment:If,envmap_pars_fragment:Lf,envmap_pars_vertex:Df,envmap_physical_pars_fragment:Wf,envmap_vertex:Nf,fog_vertex:Uf,fog_pars_vertex:Ff,fog_fragment:Of,fog_pars_fragment:kf,gradientmap_pars_fragment:Bf,lightmap_pars_fragment:zf,lights_lambert_fragment:Hf,lights_lambert_pars_fragment:Vf,lights_pars_begin:Gf,lights_toon_fragment:Xf,lights_toon_pars_fragment:Yf,lights_phong_fragment:qf,lights_phong_pars_fragment:Zf,lights_physical_fragment:Jf,lights_physical_pars_fragment:Kf,lights_fragment_begin:$f,lights_fragment_maps:jf,lights_fragment_end:Qf,lightprobes_pars_fragment:em,logdepthbuf_fragment:tm,logdepthbuf_pars_fragment:im,logdepthbuf_pars_vertex:nm,logdepthbuf_vertex:sm,map_fragment:rm,map_pars_fragment:am,map_particle_fragment:om,map_particle_pars_fragment:lm,metalnessmap_fragment:cm,metalnessmap_pars_fragment:dm,morphinstance_vertex:hm,morphcolor_vertex:um,morphnormal_vertex:pm,morphtarget_pars_vertex:fm,morphtarget_vertex:mm,normal_fragment_begin:gm,normal_fragment_maps:xm,normal_pars_fragment:_m,normal_pars_vertex:bm,normal_vertex:vm,normalmap_pars_fragment:ym,clearcoat_normal_fragment_begin:Sm,clearcoat_normal_fragment_maps:Mm,clearcoat_pars_fragment:wm,iridescence_pars_fragment:Em,opaque_fragment:Tm,packing:Am,premultiplied_alpha_fragment:Rm,project_vertex:Cm,dithering_fragment:Pm,dithering_pars_fragment:Im,roughnessmap_fragment:Lm,roughnessmap_pars_fragment:Dm,shadowmap_pars_fragment:Nm,shadowmap_pars_vertex:Um,shadowmap_vertex:Fm,shadowmask_pars_fragment:Om,skinbase_vertex:km,skinning_pars_vertex:Bm,skinning_vertex:zm,skinnormal_vertex:Hm,specularmap_fragment:Vm,specularmap_pars_fragment:Gm,tonemapping_fragment:Wm,tonemapping_pars_fragment:Xm,transmission_fragment:Ym,transmission_pars_fragment:qm,uv_pars_fragment:Zm,uv_pars_vertex:Jm,uv_vertex:Km,worldpos_vertex:$m,background_vert:jm,background_frag:Qm,backgroundCube_vert:eg,backgroundCube_frag:tg,cube_vert:ig,cube_frag:ng,depth_vert:sg,depth_frag:rg,distance_vert:ag,distance_frag:og,equirect_vert:lg,equirect_frag:cg,linedashed_vert:dg,linedashed_frag:hg,meshbasic_vert:ug,meshbasic_frag:pg,meshlambert_vert:fg,meshlambert_frag:mg,meshmatcap_vert:gg,meshmatcap_frag:xg,meshnormal_vert:_g,meshnormal_frag:bg,meshphong_vert:vg,meshphong_frag:yg,meshphysical_vert:Sg,meshphysical_frag:Mg,meshtoon_vert:wg,meshtoon_frag:Eg,points_vert:Tg,points_frag:Ag,shadow_vert:Rg,shadow_frag:Cg,sprite_vert:Pg,sprite_frag:Ig},Ie={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Di={basic:{uniforms:Gt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:Gt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Ge(0)},envMapIntensity:{value:1}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:Gt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:Gt([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:Gt([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new Ge(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:Gt([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:Gt([Ie.points,Ie.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:Gt([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:Gt([Ie.common,Ie.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:Gt([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:Gt([Ie.sprite,Ie.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distance:{uniforms:Gt([Ie.common,Ie.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distance_vert,fragmentShader:et.distance_frag},shadow:{uniforms:Gt([Ie.lights,Ie.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};Di.physical={uniforms:Gt([Di.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};var al={r:0,b:0,g:0},Lg=new dt,eu=new Ze;eu.set(-1,0,0,0,1,0,0,0,1);function Dg(n,e,t,i,s,r){let a=new Ge(0),o=s===!0?0:1,c,l,d=null,f=0,u=null;function p(S){let w=S.isScene===!0?S.background:null;if(w&&w.isTexture){let y=S.backgroundBlurriness>0;w=e.get(w,y)}return w}function g(S){let w=!1,y=p(S);y===null?m(a,o):y&&y.isColor&&(m(y,1),w=!0);let P=n.xr.getEnvironmentBlendMode();P==="additive"?t.buffers.color.setClear(0,0,0,1,r):P==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function b(S,w){let y=p(w);y&&y.isCubeTexture?(l===void 0&&(l=new Mt(new xi(1,1,1),new Nt({name:"BackgroundCubeMaterial",uniforms:Vn(Di.backgroundCube.uniforms),vertexShader:Di.backgroundCube.vertexShader,fragmentShader:Di.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(P,A,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Lg.makeRotationFromEuler(w.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(eu),l.material.toneMapped=tt.getTransfer(y.colorSpace)!==lt,(d!==y||f!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=y,f=y.version,u=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Mt(new Sr(2,2),new Nt({name:"BackgroundMaterial",uniforms:Vn(Di.background.uniforms),vertexShader:Di.background.vertexShader,fragmentShader:Di.background.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=tt.getTransfer(y.colorSpace)!==lt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||f!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=y,f=y.version,u=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function m(S,w){S.getRGB(al,Cc(n)),t.buffers.color.setClear(al.r,al.g,al.b,w,r)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,w=1){a.set(S),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:b,dispose:h}}function Ng(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null),r=s,a=!1;function o(N,B,U,T,k){let q=!1,V=f(N,T,U,B);r!==V&&(r=V,l(r.object)),q=p(N,T,U,k),q&&g(N,T,U,k),k!==null&&e.update(k,n.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,y(N,B,U,T),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return n.createVertexArray()}function l(N){return n.bindVertexArray(N)}function d(N){return n.deleteVertexArray(N)}function f(N,B,U,T){let k=T.wireframe===!0,q=i[B.id];q===void 0&&(q={},i[B.id]=q);let V=N.isInstancedMesh===!0?N.id:0,te=q[V];te===void 0&&(te={},q[V]=te);let H=te[U.id];H===void 0&&(H={},te[U.id]=H);let Q=H[k];return Q===void 0&&(Q=u(c()),H[k]=Q),Q}function u(N){let B=[],U=[],T=[];for(let k=0;k<t;k++)B[k]=0,U[k]=0,T[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:U,attributeDivisors:T,object:N,attributes:{},index:null}}function p(N,B,U,T){let k=r.attributes,q=B.attributes,V=0,te=U.getAttributes();for(let H in te)if(te[H].location>=0){let G=k[H],Se=q[H];if(Se===void 0&&(H==="instanceMatrix"&&N.instanceMatrix&&(Se=N.instanceMatrix),H==="instanceColor"&&N.instanceColor&&(Se=N.instanceColor)),G===void 0||G.attribute!==Se||Se&&G.data!==Se.data)return!0;V++}return r.attributesNum!==V||r.index!==T}function g(N,B,U,T){let k={},q=B.attributes,V=0,te=U.getAttributes();for(let H in te)if(te[H].location>=0){let G=q[H];G===void 0&&(H==="instanceMatrix"&&N.instanceMatrix&&(G=N.instanceMatrix),H==="instanceColor"&&N.instanceColor&&(G=N.instanceColor));let Se={};Se.attribute=G,G&&G.data&&(Se.data=G.data),k[H]=Se,V++}r.attributes=k,r.attributesNum=V,r.index=T}function b(){let N=r.newAttributes;for(let B=0,U=N.length;B<U;B++)N[B]=0}function m(N){h(N,0)}function h(N,B){let U=r.newAttributes,T=r.enabledAttributes,k=r.attributeDivisors;U[N]=1,T[N]===0&&(n.enableVertexAttribArray(N),T[N]=1),k[N]!==B&&(n.vertexAttribDivisor(N,B),k[N]=B)}function S(){let N=r.newAttributes,B=r.enabledAttributes;for(let U=0,T=B.length;U<T;U++)B[U]!==N[U]&&(n.disableVertexAttribArray(U),B[U]=0)}function w(N,B,U,T,k,q,V){V===!0?n.vertexAttribIPointer(N,B,U,k,q):n.vertexAttribPointer(N,B,U,T,k,q)}function y(N,B,U,T){b();let k=T.attributes,q=U.getAttributes(),V=B.defaultAttributeValues;for(let te in q){let H=q[te];if(H.location>=0){let Q=k[te];if(Q===void 0&&(te==="instanceMatrix"&&N.instanceMatrix&&(Q=N.instanceMatrix),te==="instanceColor"&&N.instanceColor&&(Q=N.instanceColor)),Q!==void 0){let G=Q.normalized,Se=Q.itemSize,De=e.get(Q);if(De===void 0)continue;let K=De.buffer,ge=De.type,ye=De.bytesPerElement,pe=ge===n.INT||ge===n.UNSIGNED_INT||Q.gpuType===So;if(Q.isInterleavedBufferAttribute){let re=Q.data,Be=re.isInterleavedBuffer===!0?re.stride:re.itemSize,it=Q.offset;if(re.isInstancedInterleavedBuffer||re.isInstancedBufferAttribute){for(let Ne=0;Ne<H.locationSize;Ne++)h(H.location+Ne,re.meshPerAttribute);N.isInstancedMesh!==!0&&T._maxInstanceCount===void 0&&(T._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Ne=0;Ne<H.locationSize;Ne++)m(H.location+Ne);n.bindBuffer(n.ARRAY_BUFFER,K);for(let Ne=0;Ne<H.locationSize;Ne++)w(H.location+Ne,Se/H.locationSize,ge,G,Be*ye,(it+Se/H.locationSize*Ne)*ye,pe)}else{if(Q.isInstancedBufferAttribute){for(let re=0;re<H.locationSize;re++)h(H.location+re,Q.meshPerAttribute);N.isInstancedMesh!==!0&&T._maxInstanceCount===void 0&&(T._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let re=0;re<H.locationSize;re++)m(H.location+re);n.bindBuffer(n.ARRAY_BUFFER,K);for(let re=0;re<H.locationSize;re++)w(H.location+re,Se/H.locationSize,ge,G,Se*ye,Se/H.locationSize*re*ye,pe)}}else if(V!==void 0){let G=V[te];if(G!==void 0)switch(G.length){case 2:n.vertexAttrib2fv(H.location,G);break;case 3:n.vertexAttrib3fv(H.location,G);break;case 4:n.vertexAttrib4fv(H.location,G);break;default:n.vertexAttrib1fv(H.location,G)}}}}S()}function P(){z();for(let N in i){let B=i[N];for(let U in B){let T=B[U];for(let k in T){let q=T[k];for(let V in q)d(q[V].object),delete q[V];delete T[k]}}delete i[N]}}function A(N){if(i[N.id]===void 0)return;let B=i[N.id];for(let U in B){let T=B[U];for(let k in T){let q=T[k];for(let V in q)d(q[V].object),delete q[V];delete T[k]}}delete i[N.id]}function x(N){for(let B in i){let U=i[B];for(let T in U){let k=U[T];if(k[N.id]===void 0)continue;let q=k[N.id];for(let V in q)d(q[V].object),delete q[V];delete k[N.id]}}}function M(N){for(let B in i){let U=i[B],T=N.isInstancedMesh===!0?N.id:0,k=U[T];if(k!==void 0){for(let q in k){let V=k[q];for(let te in V)d(V[te].object),delete V[te];delete k[q]}delete U[T],Object.keys(U).length===0&&delete i[B]}}}function z(){R(),a=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:z,resetDefaultState:R,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfObject:M,releaseStatesOfProgram:x,initAttributes:b,enableAttribute:m,disableUnusedAttributes:S}}function Ug(n,e,t){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,d){d!==0&&(n.drawArraysInstanced(i,c,l,d),t.update(l,i,d))}function o(c,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,d);let u=0;for(let p=0;p<d;p++)u+=l[p];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Fg(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let x=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(x){return!(x!==vi&&i.convert(x)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){let M=x===Ft&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(x!==jt&&x!==bi&&!M&&i.convert(x)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(x){if(x==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",d=c(l);d!==l&&(Ve("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);let f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=t.logarithmicDepthBuffer===!0&&f===!1;t.reversedDepthBuffer===!0&&f===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&f===!0&&Ve("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:y,maxSamples:P,samples:A}}function Og(n){let e=this,t=null,i=0,s=!1,r=!1,a=new ii,o=new Ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let p=f.length!==0||u||i!==0||s;return s=u,i=f.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=d(f,u,0)},this.setState=function(f,u,p){let g=f.clippingPlanes,b=f.clipIntersection,m=f.clipShadows,h=n.get(f);if(!s||g===null||g.length===0||r&&!m)r?d(null):l();else{let S=r?0:i,w=S*4,y=h.clippingState||null;c.value=y,y=d(g,u,w,p);for(let P=0;P!==w;++P)y[P]=t[P];h.clippingState=y,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,u,p,g){let b=f!==null?f.length:0,m=null;if(b!==0){if(m=c.value,g!==!0||m===null){let h=p+b*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<h)&&(m=new Float32Array(h));for(let w=0,y=p;w!==b;++w,y+=4)a.copy(f[w]).applyMatrix4(S,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}var Jr=class extends At{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new lr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new xi(5,5,5),r=new Nt({name:"CubemapFromEquirect",uniforms:Vn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$t,blending:Ji});r.uniforms.tEquirect.value=t;let a=new Mt(s,r),o=t.minFilter;return t.minFilter===Ki&&(t.minFilter=qt),new Ms(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}},Lh=256,kg=3,Bg=20,tu=256,iu=16,zg=3,Hg=new C,Vg=new Ge,ll=class n{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ms(1,10,null),this._boxMesh=new Mt(new xi(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=Hg}=r,c=this._renderer;this._setSize(a);let l=this._allocateTarget(),d=this._getSourceTarget(!0);t>0&&(d.texture.mipmapsAutoUpdate=!1);let f=c.autoClear,u=c.autoClearColor,p=c.autoClearDepth,g=c.autoClearStencil,b=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,b===null&&(e.background=c.getClearColor(Vg));let m=new Ms(i,s,d);return m.position.copy(o),m.update(c,e),c.autoClear=f,c.autoClearColor=u,c.autoClearDepth=p,c.autoClearStencil=g,e.background=b,t>0&&(d.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Uh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Lh,Ec(e))}_fromTexture(e,t){e.mapping===zn||e.mapping===As?this._setSize(e.image.length===0?Lh:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){let e=this._cubeSize,t=Dh(e,!1,!1),i=Math.log2(e)-kg;for(let s=0;s<=i;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Dh(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){let s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=e,r.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===zn||e.mapping===As?(this._cubemapMaterial===null&&(this._cubemapMaterial=Uh()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Nh()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Gg(),this._integrationMaterial=Wg());let t=this._cubeSize,i=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/iu);for(let a=0;a<=i;a++){let o=n.lodToRoughness(a,i);if(a>i-zg)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let c=o>0?Math.log2(t)+.5*Math.log2(6/(tu*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Xg());let i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,i),s.envMap.value=e.texture,this._renderCube(r,0,i)}};function Dh(n,e,t){return new Jr(n,{minFilter:Ki,generateMipmaps:e,type:Ft,colorSpace:$s,depthBuffer:t})}function Kr(n,e,t){return new Nt({name:n,uniforms:e,vertexShader:et.cube_vert,fragmentShader:t,side:$t,blending:Ji,depthTest:!1,depthWrite:!1})}function Gg(){return Kr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${tu}u

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
	`)}function Wg(){return Kr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:iu}},`

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
	`)}function Xg(){return Kr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Bg}
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
	`)}function Nh(){return Kr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Uh(){return Kr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Yg(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){let p=u.mapping;if(p===bo||p===vo)if(e.has(u)){let g=e.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let b=new Jr(g.height);return b.fromEquirectangularTexture(n,u),e.set(u,b),u.addEventListener("dispose",l),o(b.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let p=u.mapping,g=p===bo||p===vo,b=p===zn||p===As;if(g||b){let m=t.get(u),h=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return i===null&&(i=new ll(n)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let S=u.image;return g&&S&&S.height>0||b&&S&&c(S)?(i===null&&(i=new ll(n)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",d),m.texture):null}}}return u}function o(u,p){return p===bo?u.mapping=zn:p===vo&&(u.mapping=As),u}function c(u){let p=0,g=6;for(let b=0;b<g;b++)u[b]!==void 0&&p++;return p===g}function l(u){let p=u.target;p.removeEventListener("dispose",l);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function d(u){let p=u.target;p.removeEventListener("dispose",d);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function qg(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&Ys("WebGLRenderer: "+i+" extension not supported."),s}}}function Zg(n,e,t,i){let s={},r=new WeakMap,a=new FinalizationRegistry(g=>delete s[g]);function o(g){c(g.target)}function c(g){g.index!==null&&e.remove(g.index);for(let m in g.attributes)e.remove(g.attributes[m]);g.removeEventListener("dispose",o),delete s[g.id],a.unregister(g);let b=r.get(g);b&&(e.remove(b),r.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function l(g,b){return s[b.id]!==void 0||(b.addEventListener("dispose",o),s[b.id]=new WeakRef(b),a.register(b,b.id,b),t.memory.geometries++),b}function d(g){let b=g.attributes;for(let m in b)e.update(b[m],n.ARRAY_BUFFER)}function f(g){let b=g.index,m=g.attributes.position,h=0;if(m===void 0)return;let S=b!==null?b.array.length:m.array.length/3-1,w=m.count>=65535?ar:rr,y=new w(Math.ceil(S/3)*6,1),P=y.array;if(b!==null){let x=b.array;h=b.version;for(let M=0,z=0;M<S;M+=3){let R=x[M+0],N=x[M+1],B=x[M+2];P[z++]=R,P[z++]=N,P[z++]=N,P[z++]=B,P[z++]=B,P[z++]=R}}else{h=m.version;for(let x=0,M=0;x<S;x+=3){let z=x+0,R=x+1,N=x+2;P[M++]=z,P[M++]=R,P[M++]=R,P[M++]=N,P[M++]=N,P[M++]=z}}y.version=h;let A=r.get(g);A&&e.remove(A),r.set(g,y)}function u(g){let b=r.get(g);if(b){let m=g.index;m!==null&&b.version<m.version&&f(g)}else f(g);return r.get(g)}function p(){for(let g in s){let b=s[g].deref();b!==void 0&&c(b)}}return{get:l,update:d,getWireframeAttribute:u,dispose:p}}function Jg(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,u){n.drawElements(i,u,r,f*a),t.update(u,i,1)}function l(f,u,p){p!==0&&(n.drawElementsInstanced(i,u,r,f*a,p),t.update(u,i,p))}function d(f,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,f,0,p);let b=0;for(let m=0;m<p;m++)b+=u[m];t.update(b,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function Kg(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:We("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function $g(n,e,t){let i=new WeakMap,s=new bt;function r(a,o,c){let l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0,u=i.get(o);if(u===void 0||u.count!==f){let z=function(){x.dispose(),i.delete(o),o.removeEventListener("dispose",z)};u!==void 0&&u.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],w=0;p===!0&&(w=1),g===!0&&(w=2),b===!0&&(w=3);let y=o.attributes.position.count*w,P=1;y>e.maxTextureSize&&(P=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let A=new Float32Array(y*P*4*f),x=new tr(A,y,P,f);x.type=bi,x.needsUpdate=!0;let M=w*4;for(let R=0;R<f;R++){let N=m[R],B=h[R],U=S[R],T=y*P*4*R;for(let k=0;k<N.count;k++){let q=k*M;p===!0&&(s.fromBufferAttribute(N,k),A[T+q+0]=s.x,A[T+q+1]=s.y,A[T+q+2]=s.z,A[T+q+3]=0),g===!0&&(s.fromBufferAttribute(B,k),A[T+q+4]=s.x,A[T+q+5]=s.y,A[T+q+6]=s.z,A[T+q+7]=0),b===!0&&(s.fromBufferAttribute(U,k),A[T+q+8]=s.x,A[T+q+9]=s.y,A[T+q+10]=s.z,A[T+q+11]=U.itemSize===4?s.w:1)}}u={count:f,texture:x,size:new de(y,P)},i.set(o,u),o.addEventListener("dispose",z)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let b=0;b<l.length;b++)p+=l[b];let g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function jg(n,e,t,i,s){let r=new WeakMap;function a(l){let d=s.render.frame,f=l.geometry,u=e.get(l,f);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){let p=l.skeleton;r.get(p)!==d&&(p.update(),r.set(p,d))}return u}function o(){r=new WeakMap}function c(l){let d=l.target;d.removeEventListener("dispose",c),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}var Qg={[Nr]:"LINEAR_TONE_MAPPING",[Ur]:"REINHARD_TONE_MAPPING",[Fr]:"CINEON_TONE_MAPPING",[Bn]:"ACES_FILMIC_TONE_MAPPING",[kr]:"AGX_TONE_MAPPING",[Br]:"NEUTRAL_TONE_MAPPING",[Or]:"CUSTOM_TONE_MAPPING"};function ex(n,e,t,i,s,r){let a=new At(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=null,d=new pt;d.setAttribute("position",new rt([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new rt([0,2,0,0,2,0],2));let f=new ys({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Mt(d,f),p=new On(-1,1,1,-1,0,1),g=null,b=null,m=!1,h,S=null,w=[],y=!1;this.setSize=function(P,A){a.setSize(P,A),o!==null&&o.setSize(P,A),c!==null&&c.setSize(P,A);for(let x=0;x<w.length;x++){let M=w[x];M.setSize&&M.setSize(P,A)}},this.setEffects=function(P){w=P,y=w.length>0&&w[0].isRenderPass===!0;let A=a.width,x=a.height;w.length>0&&o===null&&(o=new At(A,x,{type:Ft,depthBuffer:!1,stencilBuffer:!1}),c=new At(A,x,{type:Ft,depthBuffer:!1,stencilBuffer:!1}));let M=s===!0&&w.some(z=>z.needsDepthTexture===!0);M!==(a.depthTexture!==null)&&(M===!0&&l===null&&(l=new qi(A,x),r===!0&&(l.format=$i,l.type=Hn)),a.dispose(),a.depthTexture=M?l:null,a.resolveDepthBuffer=M,a.storeMultisampledDepthBuffer=M);for(let z=0;z<w.length;z++){let R=w[z];R.setSize&&R.setSize(A,x),M&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(l)}},this.begin=function(P,A){if(m||P.toneMapping===Ii&&w.length===0)return!1;if(S=A,A!==null){let x=A.width,M=A.height;(a.width!==x||a.height!==M)&&this.setSize(x,M)}return y===!1&&P.setRenderTarget(a),h=P.toneMapping,P.toneMapping=Ii,!0},this.hasRenderPass=function(){return y},this.end=function(P,A){P.toneMapping=h,m=!0;let x=a,M=o;for(let z=0;z<w.length;z++){let R=w[z];R.enabled!==!1&&(R.render(P,M,x,A),R.needsSwap!==!1&&(x=M,M=M===o?c:o))}if(g!==P.outputColorSpace||b!==P.toneMapping){g=P.outputColorSpace,b=P.toneMapping,f.defines={},tt.getTransfer(g)===lt&&(f.defines.SRGB_TRANSFER="");let z=Qg[b];z&&(f.defines[z]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=x.texture,P.setRenderTarget(S),P.render(u,p),S=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),d.dispose(),f.dispose()}}var nu=new Jt,su=new qi(1,1),ru=new dr(1),au=new tr,ou=new Za,lu=new lr,Fh=[],Oh=[],kh=new Float32Array(16),Bh=new Float32Array(9),zh=new Float32Array(4);function Is(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Fh[s];if(r===void 0&&(r=new Float32Array(s),Fh[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Rt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ct(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function dl(n,e){let t=Oh[e];t===void 0&&(t=new Int32Array(e),Oh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function tx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function ix(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2fv(this.addr,e),Ct(t,e)}}function nx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;n.uniform3fv(this.addr,e),Ct(t,e)}}function sx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4fv(this.addr,e),Ct(t,e)}}function rx(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,i))return;zh.set(i),n.uniformMatrix2fv(this.addr,!1,zh),Ct(t,i)}}function ax(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,i))return;Bh.set(i),n.uniformMatrix3fv(this.addr,!1,Bh),Ct(t,i)}}function ox(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,i))return;kh.set(i),n.uniformMatrix4fv(this.addr,!1,kh),Ct(t,i)}}function lx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function cx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2iv(this.addr,e),Ct(t,e)}}function dx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3iv(this.addr,e),Ct(t,e)}}function hx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4iv(this.addr,e),Ct(t,e)}}function ux(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function px(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2uiv(this.addr,e),Ct(t,e)}}function fx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3uiv(this.addr,e),Ct(t,e)}}function mx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4uiv(this.addr,e),Ct(t,e)}}function hl(n){return n.version===0&&(n.compareFunction=yc,n.needsUpdate=!0),n}function gx(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=hl(su):r=nu,t.setTexture2D(e||r,s)}function xx(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||ou,s)}function _x(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=hl(ru):r=lu,t.setTextureCube(e||r,s)}function bx(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||au,s)}function vx(n){switch(n){case 5126:return tx;case 35664:return ix;case 35665:return nx;case 35666:return sx;case 35674:return rx;case 35675:return ax;case 35676:return ox;case 5124:case 35670:return lx;case 35667:case 35671:return cx;case 35668:case 35672:return dx;case 35669:case 35673:return hx;case 5125:return ux;case 36294:return px;case 36295:return fx;case 36296:return mx;case 35678:case 36198:case 36298:case 36306:case 35682:return gx;case 35679:case 36299:case 36307:return xx;case 35680:case 36300:case 36308:case 36293:return _x;case 36289:case 36303:case 36311:case 36292:return bx}}function yx(n,e){n.uniform1fv(this.addr,e)}function Sx(n,e){let t=Is(e,this.size,2);n.uniform2fv(this.addr,t)}function Mx(n,e){let t=Is(e,this.size,3);n.uniform3fv(this.addr,t)}function wx(n,e){let t=Is(e,this.size,4);n.uniform4fv(this.addr,t)}function Ex(n,e){let t=Is(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Tx(n,e){let t=Is(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Ax(n,e){let t=Is(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Rx(n,e){n.uniform1iv(this.addr,e)}function Cx(n,e){n.uniform2iv(this.addr,e)}function Px(n,e){n.uniform3iv(this.addr,e)}function Ix(n,e){n.uniform4iv(this.addr,e)}function Lx(n,e){n.uniform1uiv(this.addr,e)}function Dx(n,e){n.uniform2uiv(this.addr,e)}function Nx(n,e){n.uniform3uiv(this.addr,e)}function Ux(n,e){n.uniform4uiv(this.addr,e)}function Fx(n,e,t){let i=this.cache,s=e.length,r=dl(t,s);Rt(i,r)||(n.uniform1iv(this.addr,r),Ct(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=hl(su):a=nu;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Ox(n,e,t){let i=this.cache,s=e.length,r=dl(t,s);Rt(i,r)||(n.uniform1iv(this.addr,r),Ct(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ou,r[a])}function kx(n,e,t){let i=this.cache,s=e.length,r=dl(t,s);Rt(i,r)||(n.uniform1iv(this.addr,r),Ct(i,r));let a;this.type===n.SAMPLER_CUBE_SHADOW?a=hl(ru):a=lu;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function Bx(n,e,t){let i=this.cache,s=e.length,r=dl(t,s);Rt(i,r)||(n.uniform1iv(this.addr,r),Ct(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||au,r[a])}function zx(n){switch(n){case 5126:return yx;case 35664:return Sx;case 35665:return Mx;case 35666:return wx;case 35674:return Ex;case 35675:return Tx;case 35676:return Ax;case 5124:case 35670:return Rx;case 35667:case 35671:return Cx;case 35668:case 35672:return Px;case 35669:case 35673:return Ix;case 5125:return Lx;case 36294:return Dx;case 36295:return Nx;case 36296:return Ux;case 35678:case 36198:case 36298:case 36306:case 35682:return Fx;case 35679:case 36299:case 36307:return Ox;case 35680:case 36300:case 36308:case 36293:return kx;case 36289:case 36303:case 36311:case 36292:return Bx}}var Uc=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=vx(t.type)}},Fc=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=zx(t.type)}},Oc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},Dc=/(\w+)(\])?(\[|\.)?/g;function Hh(n,e){n.seq.push(e),n.map[e.id]=e}function Hx(n,e,t){let i=n.name,s=i.length;for(Dc.lastIndex=0;;){let r=Dc.exec(i),a=Dc.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Hh(t,l===void 0?new Uc(o,n,e):new Fc(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new Oc(o),Hh(t,f)),t=f}}}var Ps=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Hx(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function Vh(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Vx=37297,Gx=0;function Wx(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var Gh=new Ze;function Xx(n){tt._getMatrix(Gh,tt.workingColorSpace,n);let e=`mat3( ${Gh.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(n)){case js:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Wh(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Wx(n.getShaderSource(e),o)}else return r}function Yx(n,e){let t=Xx(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var qx={[Nr]:"Linear",[Ur]:"Reinhard",[Fr]:"Cineon",[Bn]:"ACESFilmic",[kr]:"AgX",[Br]:"Neutral",[Or]:"Custom"};function Zx(n,e){let t=qx[e];return t===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ol=new C;function Jx(){tt.getLuminanceCoefficients(ol);let n=ol.x.toFixed(4),e=ol.y.toFixed(4),t=ol.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Kx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zr).join(`
`)}function $x(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function jx(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Zr(n){return n!==""}function Xh(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Yh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Qx=/^[ \t]*#include +<([\w\d./]+)>/gm;function kc(n){return n.replace(Qx,e0)}function e0(n,e){let t=et[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return kc(t)}var t0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qh(n){return n.replace(t0,i0)}function i0(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Zh(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var n0={[Dr]:"SHADOWMAP_TYPE_PCF",[Es]:"SHADOWMAP_TYPE_VSM"};function s0(n){return n0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var r0={[As]:"ENVMAP_MODE_REFRACTION"};function a0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":r0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var o0={[dc]:"ENVMAP_BLENDING_MULTIPLY",[ch]:"ENVMAP_BLENDING_MIX",[dh]:"ENVMAP_BLENDING_ADD"};function l0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":o0[n.combine]||"ENVMAP_BLENDING_NONE"}function c0(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=s0(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",d=a0(t),f=l0(t),u=Kx(t),p=$x(r),g=s.createProgram(),b,m,h=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(b=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Zr).join(`
`),b.length>0&&(b+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Zr).join(`
`),m.length>0&&(m+=`
`)):(b=[Zh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zr).join(`
`),m=[Zh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ii?"#define TONE_MAPPING":"",t.toneMapping!==Ii?et.tonemapping_pars_fragment:"",t.toneMapping!==Ii?Zx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,Yx("linearToOutputTexel",t.outputColorSpace),Jx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zr).join(`
`)),a=kc(a),a=Xh(a,t),a=Yh(a,t),o=kc(o),o=Xh(o,t),o=Yh(o,t),a=qh(a),o=qh(o),t.isRawShaderMaterial!==!0&&(h=`#version 300 es
`,b=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+b,m=["#define varying in",t.glslVersion===Mc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let S=h+b+a,w=h+m+o,y=Vh(s,s.VERTEX_SHADER,S),P=Vh(s,s.FRAGMENT_SHADER,w);s.attachShader(g,y),s.attachShader(g,P),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function A(R){if(n.debug.checkShaderErrors){let N=s.getProgramInfoLog(g)||"",B=s.getShaderInfoLog(y)||"",U=s.getShaderInfoLog(P)||"",T=N.trim(),k=B.trim(),q=U.trim(),V=!0,te=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,y,P);else{let H=Wh(s,y,"vertex"),Q=Wh(s,P,"fragment");We("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+T+`
`+H+`
`+Q)}else T!==""?Ve("WebGLProgram: Program Info Log:",T):(k===""||q==="")&&(te=!1);te&&(R.diagnostics={runnable:V,programLog:T,vertexShader:{log:k,prefix:b},fragmentShader:{log:q,prefix:m}})}s.deleteShader(y),s.deleteShader(P),x=new Ps(s,g),M=jx(s,g)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=s.getProgramParameter(g,Vx)),z},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Gx++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=y,this.fragmentShader=P,this}var d0=0,Bc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new zc(e),t.set(e,i)),i}},zc=class{constructor(e){this.id=d0++,this.code=e,this.usedTimes=0}};function h0(n){return n===Sn||n===Xr||n===Yr}function u0(n,e,t,i,s,r){let a=new ir,o=new Bc,c=new Set,l=[],d=new Map,f=i.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return c.add(x),x===0?"uv":`uv${x}`}function g(x,M,z,R,N,B){let U=R.fog,T=N.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,V=e.get(x.envMap||k,q),te=u[x.type],H=i.precision;x.precision!==null&&(H=i.getMaxPrecision(x.precision),H!==x.precision&&Ve("WebGLProgram.getParameters:",x.precision,"not supported, using",H,"instead."));let Q=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,G=Q!==void 0?Q.length:0,Se=0;T.morphAttributes.position!==void 0&&(Se=1),T.morphAttributes.normal!==void 0&&(Se=2),T.morphAttributes.color!==void 0&&(Se=3);let De,K,ge,ye;if(te){let ve=Di[te];De=ve.vertexShader,K=ve.fragmentShader}else{De=x.vertexShader,K=x.fragmentShader;let ve=o.getVertexShaderStage(x),qe=o.getFragmentShaderStage(x);o.update(x,ve,qe),ge=ve.id,ye=qe.id}let pe=n.getRenderTarget(),re=n.state.buffers.depth.getReversed(),Be=N.isInstancedMesh===!0,it=N.isBatchedMesh===!0,Ne=!!x.map,Je=!!x.matcap,Xe=!!V,le=Xe&&V.isPMREMTexture===!0,xe=!!x.aoMap,_e=!!x.lightMap,Ce=!!x.bumpMap&&x.wireframe===!1,he=!!x.normalMap,Me=!!x.displacementMap,Te=!!x.emissiveMap,Ke=!!x.metalnessMap,$e=!!x.roughnessMap,Ye=x.anisotropy>0,F=x.clearcoat>0,ft=x.diffuseRoughness>0,He=x.dispersion>0,ot=x.retroreflectivity>0,be=x.iridescence>0,ut=x.sheen>0,ee=x.transmission>0,Pe=Ye&&!!x.anisotropyMap,E=F&&!!x.clearcoatMap,_=F&&!!x.clearcoatNormalMap,W=F&&!!x.clearcoatRoughnessMap,ne=ft&&!!x.diffuseRoughnessMap,ae=be&&!!x.iridescenceMap,fe=be&&!!x.iridescenceThicknessMap,Ee=ut&&!!x.sheenColorMap,ie=ut&&!!x.sheenRoughnessMap,se=!!x.specularMap,we=!!x.specularColorMap,D=!!x.specularIntensityMap,L=ee&&!!x.transmissionMap,I=ee&&!!x.thicknessMap,J=!!x.gradientMap,Z=!!x.alphaMap,j=x.alphaTest>0,ce=!!x.alphaHash,me=!!x.extensions,oe=Ii;x.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(oe=n.toneMapping);let ue=le?V.isCompressedCubeTexture?V.image[0].mipmaps:V.mipmaps:null,Ue={shaderID:te,shaderType:x.type,shaderName:x.name,vertexShader:De,fragmentShader:K,defines:x.defines,customVertexShaderID:ge,customFragmentShaderID:ye,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:H,batching:it,batchingColor:it&&N._colorsTexture!==null,instancing:Be,instancingColor:Be&&N.instanceColor!==null,instancingMorph:Be&&N.morphTexture!==null,outputColorSpace:pe===null?n.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ne,matcap:Je,envMap:Xe,envMapMode:Xe&&V.mapping,envMapPMREM:le,envMapMaxLod:le?ue.length-1:null,envMapSize:le?ue[0].width:null,aoMap:xe,lightMap:_e,bumpMap:Ce,normalMap:he,displacementMap:Me,emissiveMap:Te,normalMapObjectSpace:he&&x.normalMapType===ph,normalMapTangentSpace:he&&x.normalMapType===sl,packedNormalMap:he&&x.normalMapType===sl&&h0(x.normalMap.format),metalnessMap:Ke,roughnessMap:$e,anisotropy:Ye,anisotropyMap:Pe,clearcoat:F,clearcoatMap:E,clearcoatNormalMap:_,clearcoatRoughnessMap:W,diffuseRoughness:ft,diffuseRoughnessMap:ne,dispersion:He,retroreflection:ot,iridescence:be,iridescenceMap:ae,iridescenceThicknessMap:fe,sheen:ut,sheenColorMap:Ee,sheenRoughnessMap:ie,specularMap:se,specularColorMap:we,specularIntensityMap:D,transmission:ee,transmissionMap:L,thicknessMap:I,gradientMap:J,opaque:x.transparent===!1&&x.blending===Ts&&x.alphaToCoverage===!1,alphaMap:Z,alphaTest:j,alphaHash:ce,combine:x.combine,mapUv:Ne&&p(x.map.channel),aoMapUv:xe&&p(x.aoMap.channel),lightMapUv:_e&&p(x.lightMap.channel),bumpMapUv:Ce&&p(x.bumpMap.channel),normalMapUv:he&&p(x.normalMap.channel),displacementMapUv:Me&&p(x.displacementMap.channel),emissiveMapUv:Te&&p(x.emissiveMap.channel),metalnessMapUv:Ke&&p(x.metalnessMap.channel),roughnessMapUv:$e&&p(x.roughnessMap.channel),anisotropyMapUv:Pe&&p(x.anisotropyMap.channel),clearcoatMapUv:E&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:_&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:W&&p(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ne&&p(x.diffuseRoughnessMap.channel),iridescenceMapUv:ae&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:ie&&p(x.sheenRoughnessMap.channel),specularMapUv:se&&p(x.specularMap.channel),specularColorMapUv:we&&p(x.specularColorMap.channel),specularIntensityMapUv:D&&p(x.specularIntensityMap.channel),transmissionMapUv:L&&p(x.transmissionMap.channel),thicknessMapUv:I&&p(x.thicknessMap.channel),alphaMapUv:Z&&p(x.alphaMap.channel),vertexTangents:!!T.attributes.tangent&&(he||Ye),vertexNormals:!!T.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!T.attributes.color&&T.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!T.attributes.uv&&(Ne||Z),fog:!!U,useFog:x.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||T.attributes.normal===void 0&&he===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:re,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:T.attributes.position!==void 0,morphTargets:T.morphAttributes.position!==void 0,morphNormals:T.morphAttributes.normal!==void 0,morphColors:T.morphAttributes.color!==void 0,morphTargetsCount:G,morphTextureStride:Se,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:B.filter(ve=>ve.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&z.length>0,shadowMapType:n.shadowMap.type,toneMapping:oe,decodeVideoTexture:Ne&&x.map.isVideoTexture===!0&&tt.getTransfer(x.map.colorSpace)===lt,decodeVideoTextureEmissive:Te&&x.emissiveMap.isVideoTexture===!0&&tt.getTransfer(x.emissiveMap.colorSpace)===lt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Pi,flipSided:x.side===$t,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:me&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&x.extensions.multiDraw===!0||it)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ue.vertexUv1s=c.has(1),Ue.vertexUv2s=c.has(2),Ue.vertexUv3s=c.has(3),c.clear(),Ue}function b(x){let M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(let z in x.defines)M.push(z),M.push(x.defines[z]);return x.isRawShaderMaterial===!1&&(m(M,x),h(M,x),M.push(n.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function m(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapPMREM),x.push(M.envMapMaxLod),x.push(M.envMapSize),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.diffuseRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.numSunLights),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numSunLightShadows),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.numLightProbeGrids),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function h(x,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.diffuseRoughness&&a.enable(25),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function S(x){let M=u[x.type],z;if(M){let R=Di[M];z=en.clone(R.uniforms)}else z=x.uniforms;return z}function w(x,M){let z=d.get(M);return z!==void 0?++z.usedTimes:(z=new c0(n,M,x,s),l.push(z),d.set(M,z)),z}function y(x){if(--x.usedTimes===0){let M=l.indexOf(x);l[M]=l[l.length-1],l.pop(),d.delete(x.cacheKey),x.destroy()}}function P(x){o.remove(x)}function A(){o.dispose()}return{getParameters:g,getProgramCacheKey:b,getUniforms:S,acquireProgram:w,releaseProgram:y,releaseShaderCache:P,programs:l,dispose:A}}function p0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function f0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Jh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Kh(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,b,m,h){let S=n[e];return S===void 0?(S={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:b,renderOrder:u.renderOrder,z:m,group:h},n[e]=S):(S.id=u.id,S.object=u,S.geometry=p,S.material=g,S.materialVariant=a(u),S.groupOrder=b,S.renderOrder=u.renderOrder,S.z=m,S.group=h),e++,S}function c(u,p,g,b,m,h,S){S.reversedDepth===!0&&(m=-m);let w=o(u,p,g,b,m,h);g.transmission>0?i.push(w):g.transparent===!0?s.push(w):t.push(w)}function l(u,p,g,b,m,h){let S=o(u,p,g,b,m,h);g.transmission>0?i.unshift(S):g.transparent===!0?s.unshift(S):t.unshift(S)}function d(u,p){t.length>1&&t.sort(u||f0),i.length>1&&i.sort(p||Jh),s.length>1&&s.sort(p||Jh)}function f(){for(let u=e,p=n.length;u<p;u++){let g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:d}}function m0(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new Kh,n.set(i,[a])):s>=r.length?(a=new Kh,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function g0(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new C,color:new Ge};break;case"SpotLight":t={position:new C,direction:new C,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":t={color:new Ge,position:new C,halfWidth:new C,halfHeight:new C};break}return n[e.id]=t,t}}}function x0(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var _0=0;function b0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function v0(n){let e=new g0,t=x0(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new C);let s=new C,r=new dt,a=new dt;function o(l){let d=0,f=0,u=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let p=0,g=0,b=0,m=0,h=0,S=0,w=0,y=0,P=0,A=0,x=0,M=0,z=0,R=0;l.sort(b0);for(let B=0,U=l.length;B<U;B++){let T=l[B],k=T.color,q=T.intensity,V=T.distance,te=null;if(T.shadow&&T.shadow.map&&(T.shadow.map.texture.format===Sn?te=T.shadow.map.texture:te=T.shadow.map.depthTexture||T.shadow.map.texture),T.isAmbientLight)d+=k.r*q,f+=k.g*q,u+=k.b*q;else if(T.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(T.sh.coefficients[H],q);R++}else if(T.isSunLight){let H=e.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let Q=T.shadow,G=t.get(T);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),i.sunShadow[g]=G,i.sunShadowMap[g]=te;let Se=Q.getViewportCount();for(let De=0;De<Se;De++)i.sunShadowMatrix[b+De]=Q.getMatrix(De),i.sunShadowCascade[b+De]=Q._cascadeData[De];b+=Se,g++}i.sun[p]=H,p++}else if(T.isDirectionalLight){let H=e.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let Q=T.shadow,G=t.get(T);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,i.directionalShadow[m]=G,i.directionalShadowMap[m]=te,i.directionalShadowMatrix[m]=T.shadow.matrix,P++}i.directional[m]=H,m++}else if(T.isSpotLight){let H=e.get(T);H.position.setFromMatrixPosition(T.matrixWorld),H.color.copy(k).multiplyScalar(q),H.distance=V,H.coneCos=Math.cos(T.angle),H.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),H.decay=T.decay,i.spot[S]=H;let Q=T.shadow;if(T.map&&(i.spotLightMap[M]=T.map,M++,Q.updateMatrices(T),T.castShadow&&z++),i.spotLightMatrix[S]=Q.matrix,T.castShadow){let G=t.get(T);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,i.spotShadow[S]=G,i.spotShadowMap[S]=te,x++}S++}else if(T.isRectAreaLight){let H=e.get(T);H.color.copy(k).multiplyScalar(q),H.halfWidth.set(T.width*.5,0,0),H.halfHeight.set(0,T.height*.5,0),i.rectArea[w]=H,w++}else if(T.isPointLight){let H=e.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),H.distance=T.distance,H.decay=T.decay,T.castShadow){let Q=T.shadow,G=t.get(T);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,G.shadowCameraNear=Q.camera.near,G.shadowCameraFar=Q.camera.far,i.pointShadow[h]=G,i.pointShadowMap[h]=te,i.pointShadowMatrix[h]=T.shadow.matrix,A++}i.point[h]=H,h++}else if(T.isHemisphereLight){let H=e.get(T);H.skyColor.copy(T.color).multiplyScalar(q),H.groundColor.copy(T.groundColor).multiplyScalar(q),i.hemi[y]=H,y++}}w>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ie.LTC_FLOAT_1,i.rectAreaLTC2=Ie.LTC_FLOAT_2):(i.rectAreaLTC1=Ie.LTC_HALF_1,i.rectAreaLTC2=Ie.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=u;let N=i.hash;(N.sunLength!==p||N.directionalLength!==m||N.pointLength!==h||N.spotLength!==S||N.rectAreaLength!==w||N.hemiLength!==y||N.numSunShadows!==g||N.numDirectionalShadows!==P||N.numPointShadows!==A||N.numSpotShadows!==x||N.numSpotMaps!==M||N.numLightProbes!==R)&&(i.sun.length=p,i.directional.length=m,i.spot.length=S,i.rectArea.length=w,i.point.length=h,i.hemi.length=y,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=b,i.sunShadowCascade.length=b,i.directionalShadow.length=P,i.directionalShadowMap.length=P,i.directionalShadowMatrix.length=P,i.pointShadow.length=A,i.pointShadowMap.length=A,i.pointShadowMatrix.length=A,i.spotShadow.length=x,i.spotShadowMap.length=x,i.spotLightMatrix.length=x+M-z,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=z,i.numLightProbes=R,N.sunLength=p,N.directionalLength=m,N.pointLength=h,N.spotLength=S,N.rectAreaLength=w,N.hemiLength=y,N.numSunShadows=g,N.numDirectionalShadows=P,N.numPointShadows=A,N.numSpotShadows=x,N.numSpotMaps=M,N.numLightProbes=R,i.version=_0++)}function c(l,d){let f=0,u=0,p=0,g=0,b=0,m=0,h=d.matrixWorldInverse;for(let S=0,w=l.length;S<w;S++){let y=l[S];if(y.isSunLight){let P=i.sun[f];P.direction.setFromMatrixPosition(y.matrixWorld),P.direction.transformDirection(h),f++}else if(y.isDirectionalLight){let P=i.directional[u];P.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(h),u++}else if(y.isSpotLight){let P=i.spot[g];P.position.setFromMatrixPosition(y.matrixWorld),P.position.applyMatrix4(h),P.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(h),g++}else if(y.isRectAreaLight){let P=i.rectArea[b];P.position.setFromMatrixPosition(y.matrixWorld),P.position.applyMatrix4(h),a.identity(),r.copy(y.matrixWorld),r.premultiply(h),a.extractRotation(r),P.halfWidth.set(y.width*.5,0,0),P.halfHeight.set(0,y.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),b++}else if(y.isPointLight){let P=i.point[p];P.position.setFromMatrixPosition(y.matrixWorld),P.position.applyMatrix4(h),p++}else if(y.isHemisphereLight){let P=i.hemi[m];P.direction.setFromMatrixPosition(y.matrixWorld),P.direction.transformDirection(h),m++}}}return{setup:o,setupView:c,state:i}}function $h(n){let e=new v0(n),t=[],i=[],s=[];function r(f){d.camera=f,t.length=0,i.length=0,s.length=0}function a(f){f.isLightProbeGrid?s.push(f):t.push(f)}function o(f){i.push(f)}function c(){e.setup(t),s.sort((f,u)=>f.priority-u.priority||f.id-u.id)}function l(f){e.setupView(t,f)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function y0(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new $h(n),e.set(s,[o])):r>=a.length?(o=new $h(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var S0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,M0=`uniform sampler2D shadow_pass;
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
}`,w0=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],E0=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],jh=new dt,qr=new C,Nc=new C;function T0(n,e,t){let i=new fn,s=new de,r=new de,a=new bt,o=new ro,c=new ao,l={},d=t.maxTextureSize,f={[yn]:$t,[$t]:yn,[Pi]:Pi},u=new Nt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:S0,fragmentShader:M0}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let g=new pt;g.setAttribute("position",new fi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Mt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Dr;let h=this.type;this.render=function(A,x,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===Wd&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Dr);let z=n.getRenderTarget(),R=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),B=n.state;B.setBlending(Ji),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let U=h!==this.type;U&&x.traverse(function(T){T.material&&(Array.isArray(T.material)?T.material.forEach(k=>k.needsUpdate=!0):T.material.needsUpdate=!0)});for(let T=0,k=A.length;T<k;T++){let q=A[T],V=q.shadow;if(V===void 0){Ve("WebGLShadowMap:",q,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let te=V.getFrameExtents();s.multiply(te),r.copy(V.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/te.x),s.x=r.x*te.x,V.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/te.y),s.y=r.y*te.y,V.mapSize.y=r.y));let H=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=H,V.map===null||U===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Es){if(q.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new At(s.x,s.y,{format:Sn,type:Ft,minFilter:qt,magFilter:qt,generateMipmaps:!1}),V.map.texture.name=q.name+".shadowMap",V.map.depthTexture=new qi(s.x,s.y,bi),V.map.depthTexture.name=q.name+".shadowMapDepth",V.map.depthTexture.format=Gi,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Dt,V.map.depthTexture.magFilter=Dt}else q.isPointLight?(V.map=new Jr(s.x),V.map.depthTexture=new dr(s.x,_i)):(V.map=new At(s.x,s.y),V.map.depthTexture=new qi(s.x,s.y,_i)),V.map.depthTexture.name=q.name+".shadowMap",V.map.depthTexture.format=Gi,this.type===Dr?(V.map.depthTexture.compareFunction=H?vc:bc,V.map.depthTexture.minFilter=qt,V.map.depthTexture.magFilter=qt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Dt,V.map.depthTexture.magFilter=Dt);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let Q=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();q.isPointLight!==!0&&V.updateMatrices(q,M);let G=(V.camera.layers.mask&4294967294)!==0?V.camera.layers:M.layers;for(let Se=0;Se<Q;Se++){let De=V.getCamera(Se);if(q.isPointLight){let K=V.camera,ge=V.matrix,ye=q.distance||K.far;ye!==K.far&&(K.far=ye,K.updateProjectionMatrix()),qr.setFromMatrixPosition(q.matrixWorld),K.position.copy(qr),Nc.copy(K.position),Nc.add(w0[Se]),K.up.copy(E0[Se]),K.lookAt(Nc),K.updateMatrixWorld(),ge.makeTranslation(-qr.x,-qr.y,-qr.z),jh.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),V._frustum.setFromProjectionMatrix(jh,K.coordinateSystem,K.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,Se),n.clear();else{Se===0&&(n.setRenderTarget(V.map),n.clear());let K=V.getViewport(Se);a.set(r.x*K.x,r.y*K.y,r.x*K.z,r.y*K.w),B.viewport(a)}i=V.getFrustum(Se),y(x,M,De,q,G,this.type)}V.isPointLightShadow!==!0&&this.type===Es&&S(V,M),V.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(z,R,N)};function S(A,x){let M=e.update(b);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null?A.mapPass=new At(s.x,s.y,{format:Sn,type:Ft}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value.set(A.map.width,A.map.height),u.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(x,null,M,u,b,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value.set(A.map.width,A.map.height),p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(x,null,M,p,b,null)}function w(A,x,M,z){let R=null,N=M.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(N!==void 0)R=N;else if(R=M.isPointLight===!0?c:o,n.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let B=R.uuid,U=x.uuid,T=l[B];T===void 0&&(T={},l[B]=T);let k=T[U];k===void 0&&(k=R.clone(),T[U]=k,x.addEventListener("dispose",P)),R=k}if(R.visible=x.visible,R.wireframe=x.wireframe,z===Es?R.side=x.shadowSide!==null?x.shadowSide:x.side:R.side=x.shadowSide!==null?x.shadowSide:f[x.side],R.alphaMap=x.alphaMap,R.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,R.map=x.map,R.clipShadows=x.clipShadows,R.clippingPlanes=x.clippingPlanes,R.clipIntersection=x.clipIntersection,R.displacementMap=x.displacementMap,R.displacementScale=x.displacementScale,R.displacementBias=x.displacementBias,R.wireframeLinewidth=x.wireframeLinewidth,R.linewidth=x.linewidth,M.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let B=n.properties.get(R);B.light=M}return R}function y(A,x,M,z,R,N){if(A.visible===!1)return;if(A.layers.test(R)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&N===Es)&&(!A.frustumCulled||A.intersectsFrustum(i))){A.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,A.matrixWorld);let T=e.update(A),k=A.material;if(Array.isArray(k)){let q=T.groups;for(let V=0,te=q.length;V<te;V++){let H=q[V],Q=k[H.materialIndex];if(Q&&Q.visible){let G=w(A,Q,z,N);A.onBeforeShadow(n,A,x,M,T,G,H),n.renderBufferDirect(M,null,T,G,A,H),A.onAfterShadow(n,A,x,M,T,G,H)}}}else if(k.visible){let q=w(A,k,z,N);A.onBeforeShadow(n,A,x,M,T,q,null),n.renderBufferDirect(M,null,T,q,A,null),A.onAfterShadow(n,A,x,M,T,q,null)}}let U=A.children;for(let T=0,k=U.length;T<k;T++)y(U[T],x,M,z,R,N)}function P(A){A.target.removeEventListener("dispose",P);for(let M in l){let z=l[M],R=A.target.uuid;R in z&&(z[R].dispose(),delete z[R])}}}function A0(n,e){function t(){let D=!1,L=new bt,I=null,J=new bt(0,0,0,0);return{setMask:function(Z){I!==Z&&!D&&(n.colorMask(Z,Z,Z,Z),I=Z)},setLocked:function(Z){D=Z},setClear:function(Z,j,ce,me,oe){oe===!0&&(Z*=me,j*=me,ce*=me),L.set(Z,j,ce,me),J.equals(L)===!1&&(n.clearColor(Z,j,ce,me),J.copy(L))},reset:function(){D=!1,I=null,J.set(-1,0,0,0)}}}function i(){let D=!1,L=!1,I=null,J=null,Z=null;return{setReversed:function(j){if(L!==j){let ce=e.get("EXT_clip_control");j?ce.clipControlEXT(ce.LOWER_LEFT_EXT,ce.ZERO_TO_ONE_EXT):ce.clipControlEXT(ce.LOWER_LEFT_EXT,ce.NEGATIVE_ONE_TO_ONE_EXT),L=j;let me=Z;Z=null,this.setClear(me)}},getReversed:function(){return L},setTest:function(j){j?re(n.DEPTH_TEST):Be(n.DEPTH_TEST)},setMask:function(j){I!==j&&!D&&(n.depthMask(j),I=j)},setFunc:function(j){if(L&&(j=Mh[j]),J!==j){switch(j){case Fa:n.depthFunc(n.NEVER);break;case Oa:n.depthFunc(n.ALWAYS);break;case ka:n.depthFunc(n.LESS);break;case hs:n.depthFunc(n.LEQUAL);break;case Ba:n.depthFunc(n.EQUAL);break;case za:n.depthFunc(n.GEQUAL);break;case Ha:n.depthFunc(n.GREATER);break;case Va:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}J=j}},setLocked:function(j){D=j},setClear:function(j){Z!==j&&(Z=j,L&&(j=1-j),n.clearDepth(j))},reset:function(){D=!1,I=null,J=null,Z=null,L=!1}}}function s(){let D=!1,L=null,I=null,J=null,Z=null,j=null,ce=null,me=null,oe=null;return{setTest:function(ue){D||(ue?re(n.STENCIL_TEST):Be(n.STENCIL_TEST))},setMask:function(ue){L!==ue&&!D&&(n.stencilMask(ue),L=ue)},setFunc:function(ue,Ue,ve){(I!==ue||J!==Ue||Z!==ve)&&(n.stencilFunc(ue,Ue,ve),I=ue,J=Ue,Z=ve)},setOp:function(ue,Ue,ve){(j!==ue||ce!==Ue||me!==ve)&&(n.stencilOp(ue,Ue,ve),j=ue,ce=Ue,me=ve)},setLocked:function(ue){D=ue},setClear:function(ue){oe!==ue&&(n.clearStencil(ue),oe=ue)},reset:function(){D=!1,L=null,I=null,J=null,Z=null,j=null,ce=null,me=null,oe=null}}}let r=new t,a=new i,o=new s,c={},l=new WeakMap,d={},f={},u={},p=new WeakMap,g=[],b=null,m=!1,h=null,S=null,w=null,y=null,P=null,A=null,x=null,M=new Ge(0,0,0),z=0,R=!1,N=null,B=null,U=null,T=null,k=null,q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,te=0,H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(H)[1]),V=te>=1):H.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),V=te>=2);let Q=null,G={},Se=n.getParameter(n.SCISSOR_BOX),De=n.getParameter(n.VIEWPORT),K=new bt().fromArray(Se),ge=new bt().fromArray(De);function ye(D,L,I,J){let Z=new Uint8Array(4),j=n.createTexture();n.bindTexture(D,j),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ce=0;ce<I;ce++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(L,0,n.RGBA,1,1,J,0,n.RGBA,n.UNSIGNED_BYTE,Z):n.texImage2D(L+ce,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Z);return j}let pe={};pe[n.TEXTURE_2D]=ye(n.TEXTURE_2D,n.TEXTURE_2D,1),pe[n.TEXTURE_CUBE_MAP]=ye(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[n.TEXTURE_2D_ARRAY]=ye(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),pe[n.TEXTURE_3D]=ye(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(n.DEPTH_TEST),a.setFunc(hs),Ce(!1),he(rc),re(n.CULL_FACE),xe(Ji);function re(D){d[D]!==!0&&(n.enable(D),d[D]=!0)}function Be(D){d[D]!==!1&&(n.disable(D),d[D]=!1)}function it(D,L){return u[D]!==L?(n.bindFramebuffer(D,L),u[D]=L,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=L),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=L),!0):!1}function Ne(D,L){let I=g,J=!1;if(D){I=p.get(L),I===void 0&&(I=[],p.set(L,I));let Z=D.textures;if(I.length!==Z.length||I[0]!==n.COLOR_ATTACHMENT0){for(let j=0,ce=Z.length;j<ce;j++)I[j]=n.COLOR_ATTACHMENT0+j;I.length=Z.length,J=!0}}else I[0]!==n.BACK&&(I[0]=n.BACK,J=!0);J&&n.drawBuffers(I)}function Je(D){return b!==D?(n.useProgram(D),b=D,!0):!1}let Xe={[kn]:n.FUNC_ADD,[Yd]:n.FUNC_SUBTRACT,[qd]:n.FUNC_REVERSE_SUBTRACT};Xe[Zd]=n.MIN,Xe[Jd]=n.MAX;let le={[Kd]:n.ZERO,[$d]:n.ONE,[jd]:n.SRC_COLOR,[lc]:n.SRC_ALPHA,[sh]:n.SRC_ALPHA_SATURATE,[ih]:n.DST_COLOR,[eh]:n.DST_ALPHA,[Qd]:n.ONE_MINUS_SRC_COLOR,[cc]:n.ONE_MINUS_SRC_ALPHA,[nh]:n.ONE_MINUS_DST_COLOR,[th]:n.ONE_MINUS_DST_ALPHA,[rh]:n.CONSTANT_COLOR,[ah]:n.ONE_MINUS_CONSTANT_COLOR,[oh]:n.CONSTANT_ALPHA,[lh]:n.ONE_MINUS_CONSTANT_ALPHA};function xe(D,L,I,J,Z,j,ce,me,oe,ue){if(D===Ji){m===!0&&(Be(n.BLEND),m=!1);return}if(m===!1&&(re(n.BLEND),m=!0),D!==Xd){if(D!==h||ue!==R){if((S!==kn||P!==kn)&&(n.blendEquation(n.FUNC_ADD),S=kn,P=kn),ue)switch(D){case Ts:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ai:n.blendFunc(n.ONE,n.ONE);break;case ac:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case oc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:We("WebGLState: Invalid blending: ",D);break}else switch(D){case Ts:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ai:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ac:We("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case oc:We("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:We("WebGLState: Invalid blending: ",D);break}w=null,y=null,A=null,x=null,M.set(0,0,0),z=0,h=D,R=ue}return}Z=Z||L,j=j||I,ce=ce||J,(L!==S||Z!==P)&&(n.blendEquationSeparate(Xe[L],Xe[Z]),S=L,P=Z),(I!==w||J!==y||j!==A||ce!==x)&&(n.blendFuncSeparate(le[I],le[J],le[j],le[ce]),w=I,y=J,A=j,x=ce),(me.equals(M)===!1||oe!==z)&&(n.blendColor(me.r,me.g,me.b,oe),M.copy(me),z=oe),h=D,R=!1}function _e(D,L){D.side===Pi?Be(n.CULL_FACE):re(n.CULL_FACE);let I=D.side===$t;L&&(I=!I),Ce(I),D.blending===Ts&&D.transparent===!1?xe(Ji):xe(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let J=D.stencilWrite;o.setTest(J),J&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Te(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?re(n.SAMPLE_ALPHA_TO_COVERAGE):Be(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(D){N!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),N=D)}function he(D){D!==Vd?(re(n.CULL_FACE),D!==B&&(D===rc?n.cullFace(n.BACK):D===Gd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Be(n.CULL_FACE),B=D}function Me(D){D!==U&&(V&&n.lineWidth(D),U=D)}function Te(D,L,I){D?(re(n.POLYGON_OFFSET_FILL),(T!==L||k!==I)&&(T=L,k=I,a.getReversed()&&(L=-L,I=-I),n.polygonOffset(L,I))):Be(n.POLYGON_OFFSET_FILL)}function Ke(D){D?re(n.SCISSOR_TEST):Be(n.SCISSOR_TEST)}function $e(D){D===void 0&&(D=n.TEXTURE0+q-1),Q!==D&&(n.activeTexture(D),Q=D)}function Ye(D,L,I){I===void 0&&(Q===null?I=n.TEXTURE0+q-1:I=Q);let J=G[I];J===void 0&&(J={type:void 0,texture:void 0},G[I]=J),(J.type!==D||J.texture!==L)&&(Q!==I&&(n.activeTexture(I),Q=I),n.bindTexture(D,L||pe[D]),J.type=D,J.texture=L)}function F(){let D=G[Q];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ft(){try{n.compressedTexImage2D(...arguments)}catch(D){We("WebGLState:",D)}}function He(){try{n.compressedTexImage3D(...arguments)}catch(D){We("WebGLState:",D)}}function ot(){try{n.texSubImage2D(...arguments)}catch(D){We("WebGLState:",D)}}function be(){try{n.texSubImage3D(...arguments)}catch(D){We("WebGLState:",D)}}function ut(){try{n.compressedTexSubImage2D(...arguments)}catch(D){We("WebGLState:",D)}}function ee(){try{n.compressedTexSubImage3D(...arguments)}catch(D){We("WebGLState:",D)}}function Pe(){try{n.texStorage2D(...arguments)}catch(D){We("WebGLState:",D)}}function E(){try{n.texStorage3D(...arguments)}catch(D){We("WebGLState:",D)}}function _(){try{n.texImage2D(...arguments)}catch(D){We("WebGLState:",D)}}function W(){try{n.texImage3D(...arguments)}catch(D){We("WebGLState:",D)}}function ne(D){return f[D]!==void 0?f[D]:n.getParameter(D)}function ae(D,L){f[D]!==L&&(n.pixelStorei(D,L),f[D]=L)}function fe(D){K.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),K.copy(D))}function Ee(D){ge.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),ge.copy(D))}function ie(D,L){let I=l.get(L);I===void 0&&(I=new WeakMap,l.set(L,I));let J=I.get(D);J===void 0&&(J=n.getUniformBlockIndex(L,D.name),n.uniformBlockBinding(L,J,J),I.set(D,J))}function se(D,L,I){let Z=l.get(L).get(D);c[Z]!==I&&(n.bindBufferBase(n.UNIFORM_BUFFER,Z,I),c[Z]=I)}function we(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},Q=null,G={},u={},c={},p=new WeakMap,g=[],b=null,m=!1,h=null,S=null,w=null,y=null,P=null,A=null,x=null,M=new Ge(0,0,0),z=0,R=!1,N=null,B=null,U=null,T=null,k=null,K.set(0,0,n.canvas.width,n.canvas.height),ge.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:re,disable:Be,bindFramebuffer:it,drawBuffers:Ne,useProgram:Je,setBlending:xe,setMaterial:_e,setFlipSided:Ce,setCullFace:he,setLineWidth:Me,setPolygonOffset:Te,setScissorTest:Ke,activeTexture:$e,bindTexture:Ye,unbindTexture:F,compressedTexImage2D:ft,compressedTexImage3D:He,texImage2D:_,texImage3D:W,pixelStorei:ae,getParameter:ne,updateUBOMapping:ie,uniformBlockBinding:se,texStorage2D:Pe,texStorage3D:E,texSubImage2D:ot,texSubImage3D:be,compressedTexSubImage2D:ut,compressedTexSubImage3D:ee,scissor:fe,viewport:Ee,reset:we}}function R0(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new de,d=new WeakMap,f=new Set,u,p=new WeakMap,g=new Set,b=new FinalizationRegistry(E=>g.delete(E)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function h(E,_){return m?new OffscreenCanvas(E,_):Qs("canvas")}function S(E,_,W){let ne=1,ae=Pe(E);if((ae.width>W||ae.height>W)&&(ne=W/Math.max(ae.width,ae.height)),ne<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let fe=Math.floor(ne*ae.width),Ee=Math.floor(ne*ae.height);u===void 0&&(u=h(fe,Ee));let ie=_?h(fe,Ee):u;return ie.width=fe,ie.height=Ee,ie.getContext("2d").drawImage(E,0,0,fe,Ee),Ve("WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+fe+"x"+Ee+")."),ie}else return"data"in E&&Ve("WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),E;return E}function w(E){return E.generateMipmaps}function y(E){n.generateMipmap(E)}function P(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function A(E,_,W,ne,ae,fe=!1){if(E!==null){if(n[E]!==void 0)return n[E];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Ee;ne&&(Ee=e.get("EXT_texture_norm16"),Ee||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ie=_;if(_===n.RED&&(W===n.FLOAT&&(ie=n.R32F),W===n.HALF_FLOAT&&(ie=n.R16F),W===n.UNSIGNED_BYTE&&(ie=n.R8),W===n.UNSIGNED_SHORT&&Ee&&(ie=Ee.R16_EXT),W===n.SHORT&&Ee&&(ie=Ee.R16_SNORM_EXT)),_===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(ie=n.R8UI),W===n.UNSIGNED_SHORT&&(ie=n.R16UI),W===n.UNSIGNED_INT&&(ie=n.R32UI),W===n.BYTE&&(ie=n.R8I),W===n.SHORT&&(ie=n.R16I),W===n.INT&&(ie=n.R32I)),_===n.RG&&(W===n.FLOAT&&(ie=n.RG32F),W===n.HALF_FLOAT&&(ie=n.RG16F),W===n.UNSIGNED_BYTE&&(ie=n.RG8),W===n.UNSIGNED_SHORT&&Ee&&(ie=Ee.RG16_EXT),W===n.SHORT&&Ee&&(ie=Ee.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(ie=n.RG8UI),W===n.UNSIGNED_SHORT&&(ie=n.RG16UI),W===n.UNSIGNED_INT&&(ie=n.RG32UI),W===n.BYTE&&(ie=n.RG8I),W===n.SHORT&&(ie=n.RG16I),W===n.INT&&(ie=n.RG32I)),_===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(ie=n.RGB8UI),W===n.UNSIGNED_SHORT&&(ie=n.RGB16UI),W===n.UNSIGNED_INT&&(ie=n.RGB32UI),W===n.BYTE&&(ie=n.RGB8I),W===n.SHORT&&(ie=n.RGB16I),W===n.INT&&(ie=n.RGB32I)),_===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(ie=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(ie=n.RGBA16UI),W===n.UNSIGNED_INT&&(ie=n.RGBA32UI),W===n.BYTE&&(ie=n.RGBA8I),W===n.SHORT&&(ie=n.RGBA16I),W===n.INT&&(ie=n.RGBA32I)),_===n.RGB&&(W===n.UNSIGNED_SHORT&&Ee&&(ie=Ee.RGB16_EXT),W===n.SHORT&&Ee&&(ie=Ee.RGB16_SNORM_EXT),W===n.UNSIGNED_INT_5_9_9_9_REV&&(ie=n.RGB9_E5),W===n.UNSIGNED_INT_10F_11F_11F_REV&&(ie=n.R11F_G11F_B10F)),_===n.RGBA){let se=fe?js:tt.getTransfer(ae);W===n.FLOAT&&(ie=n.RGBA32F),W===n.HALF_FLOAT&&(ie=n.RGBA16F),W===n.UNSIGNED_BYTE&&(ie=se===lt?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT&&Ee&&(ie=Ee.RGBA16_EXT),W===n.SHORT&&Ee&&(ie=Ee.RGBA16_SNORM_EXT),W===n.UNSIGNED_SHORT_4_4_4_4&&(ie=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(ie=n.RGB5_A1)}return(ie===n.R16F||ie===n.R32F||ie===n.RG16F||ie===n.RG32F||ie===n.RGBA16F||ie===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function x(E,_){let W;return E?_===null||_===_i||_===Hn?W=n.DEPTH24_STENCIL8:_===bi?W=n.DEPTH32F_STENCIL8:_===Rs&&(W=n.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===_i||_===Hn?W=n.DEPTH_COMPONENT24:_===bi?W=n.DEPTH_COMPONENT32F:_===Rs&&(W=n.DEPTH_COMPONENT16),W}function M(E,_){return w(E)===!0||E.isFramebufferTexture&&E.minFilter!==Dt&&E.minFilter!==qt?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function z(E){let _=new WeakRef(E);i.get(E).__ref=_,g.add(_),b.register(E,_,_)}function R(E){let _=i.get(E).__ref;_!==void 0&&(g.delete(_),b.unregister(_))}function N(E){U(E.target)}function B(E){T(E.target)}function U(E){E.removeEventListener("dispose",N),R(E),q(E),E.isVideoTexture&&d.delete(E),E.isHTMLTexture&&f.delete(E)}function T(E){E.removeEventListener("dispose",B),R(E),te(E)}function k(){for(let E of g){let _=E.deref();_!==void 0&&(_.isRenderTarget===!0?T(_):U(_))}g.clear(),f.clear()}function q(E){let _=i.get(E);if(_.__webglInit===void 0)return;let W=E.source,ne=p.get(W);if(ne){let ae=ne[_.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&V(E),Object.keys(ne).length===0&&p.delete(W)}i.remove(E)}function V(E){let _=i.get(E);n.deleteTexture(_.__webglTexture);let W=E.source,ne=p.get(W);delete ne[_.__cacheKey],a.memory.textures--}function te(E){let _=i.get(E);_.__depthDisposeCallback&&_.__depthDisposeCallback();let W=E.depthTexture;if(W&&W.renderTarget===E&&U(W),E.isWebGLCubeRenderTarget)for(let ae=0;ae<6;ae++){if(Array.isArray(_.__webglFramebuffer[ae]))for(let fe=0;fe<_.__webglFramebuffer[ae].length;fe++)n.deleteFramebuffer(_.__webglFramebuffer[ae][fe]);else n.deleteFramebuffer(_.__webglFramebuffer[ae]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[ae])}else{if(Array.isArray(_.__webglFramebuffer))for(let ae=0;ae<_.__webglFramebuffer.length;ae++)n.deleteFramebuffer(_.__webglFramebuffer[ae]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let ae=0;ae<_.__webglColorRenderbuffer.length;ae++)_.__webglColorRenderbuffer[ae]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[ae]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let ne=E.textures;for(let ae=0,fe=ne.length;ae<fe;ae++){let Ee=i.get(ne[ae]);Ee.__webglTexture&&(n.deleteTexture(Ee.__webglTexture),a.memory.textures--),i.remove(ne[ae])}i.remove(E)}let H=0;function Q(){H=0}function G(){return H}function Se(E){H=E}function De(){let E=H;return E>=s.maxTextures&&Ve("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+s.maxTextures),H+=1,E}function K(E){let _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.mipmapsAutoUpdate),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function ge(E,_){let W=i.get(E);if(E.isVideoTexture&&ut(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&W.__version!==E.version){let ne=E.image;if(ne===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{_e(W,E,_);return}}else E.isExternalTexture&&(W.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+_)}function ye(E,_){let W=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&W.__version!==E.version){_e(W,E,_);return}else E.isExternalTexture&&(W.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+_)}function pe(E,_){let W=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&W.__version!==E.version){_e(W,E,_);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+_)}function re(E,_){let W=i.get(E);if(E.version>0&&W.__version!==E.version){Ce(W,E,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+_)}let Be={[Ga]:n.REPEAT,[Ei]:n.CLAMP_TO_EDGE,[Wa]:n.MIRRORED_REPEAT},it={[Dt]:n.NEAREST,[hh]:n.NEAREST_MIPMAP_NEAREST,[zr]:n.NEAREST_MIPMAP_LINEAR,[qt]:n.LINEAR,[yo]:n.LINEAR_MIPMAP_NEAREST,[Ki]:n.LINEAR_MIPMAP_LINEAR},Ne={[mh]:n.NEVER,[yc]:n.ALWAYS,[gh]:n.LESS,[bc]:n.LEQUAL,[xh]:n.EQUAL,[vc]:n.GEQUAL,[_h]:n.GREATER,[bh]:n.NOTEQUAL};function Je(E,_){if(_.type===bi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===qt||_.magFilter===yo||_.magFilter===zr||_.magFilter===Ki||_.minFilter===qt||_.minFilter===yo||_.minFilter===zr||_.minFilter===Ki)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,Be[_.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,Be[_.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,Be[_.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,it[_.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,it[_.minFilter]),_.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,Ne[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Dt||_.minFilter!==zr&&_.minFilter!==Ki||_.type===bi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let W=e.get("EXT_texture_filter_anisotropic");n.texParameterf(E,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Xe(E,_){let W=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",N),z(_));let ne=_.source,ae=p.get(ne);ae===void 0&&(ae={},p.set(ne,ae));let fe=K(_);if(fe!==E.__cacheKey){ae[fe]===void 0&&(ae[fe]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,W=!0),ae[fe].usedTimes++;let Ee=ae[E.__cacheKey];Ee!==void 0&&(ae[E.__cacheKey].usedTimes--,Ee.usedTimes===0&&V(_)),E.__cacheKey=fe,E.__webglTexture=ae[fe].texture}return W}function le(E,_,W){return Math.floor(Math.floor(E/W)/_)}function xe(E,_,W,ne){let fe=E.updateRanges;if(fe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,W,ne,_.data);else{fe.sort((D,L)=>D.start-L.start);let Ee=0;for(let D=1;D<fe.length;D++){let L=fe[Ee],I=fe[D],J=L.start+L.count,Z=le(I.start,_.width,4),j=le(L.start,_.width,4);I.start<=J+1&&Z===j&&le(I.start+I.count-1,_.width,4)===Z?L.count=Math.max(L.count,I.start+I.count-L.start):(++Ee,fe[Ee]=I)}fe.length=Ee+1;let ie=t.getParameter(n.UNPACK_ROW_LENGTH),se=t.getParameter(n.UNPACK_SKIP_PIXELS),we=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let D=0,L=fe.length;D<L;D++){let I=fe[D],J=Math.floor(I.start/4),Z=Math.ceil(I.count/4),j=J%_.width,ce=Math.floor(J/_.width),me=Z,oe=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,j),t.pixelStorei(n.UNPACK_SKIP_ROWS,ce),t.texSubImage2D(n.TEXTURE_2D,0,j,ce,me,oe,W,ne,_.data)}E.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ie),t.pixelStorei(n.UNPACK_SKIP_PIXELS,se),t.pixelStorei(n.UNPACK_SKIP_ROWS,we)}}function _e(E,_,W){let ne=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(ne=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(ne=n.TEXTURE_3D);let ae=Xe(E,_),fe=_.source;t.bindTexture(ne,E.__webglTexture,n.TEXTURE0+W);let Ee=i.get(fe);if(fe.version!==Ee.__version||ae===!0){if(t.activeTexture(n.TEXTURE0+W),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let oe=tt.getPrimaries(tt.workingColorSpace),ue=_.colorSpace===ji?null:tt.getPrimaries(_.colorSpace),Ue=_.colorSpace===ji||oe===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let se=S(_.image,!1,s.maxTextureSize);se=ee(_,se);let we=r.convert(_.format,_.colorSpace),D=r.convert(_.type),L=A(_.internalFormat,we,D,_.normalized,_.colorSpace,_.isVideoTexture);Je(ne,_);let I,J=_.mipmaps,Z=_.isVideoTexture!==!0,j=Ee.__version===void 0||ae===!0,ce=fe.dataReady,me=M(_,se);if(_.isDepthTexture)L=x(_.format===$i,_.type),j&&(Z?t.texStorage2D(n.TEXTURE_2D,1,L,se.width,se.height):t.texImage2D(n.TEXTURE_2D,0,L,se.width,se.height,0,we,D,null));else if(_.isDataTexture)if(J.length>0){Z&&j&&t.texStorage2D(n.TEXTURE_2D,me,L,J[0].width,J[0].height);for(let oe=0,ue=J.length;oe<ue;oe++)I=J[oe],Z?ce&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,I.width,I.height,we,D,I.data):t.texImage2D(n.TEXTURE_2D,oe,L,I.width,I.height,0,we,D,I.data);_.generateMipmaps=!1}else Z?(j&&t.texStorage2D(n.TEXTURE_2D,me,L,se.width,se.height),ce&&xe(_,se,we,D)):t.texImage2D(n.TEXTURE_2D,0,L,se.width,se.height,0,we,D,se.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Z&&j&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,L,J[0].width,J[0].height,se.depth);for(let oe=0,ue=J.length;oe<ue;oe++)if(I=J[oe],_.format!==vi)if(we!==null)if(Z){if(ce)if(_.layerUpdates.size>0){let Ue=Lc(I.width,I.height,_.format,_.type);for(let ve of _.layerUpdates){let qe=I.data.subarray(ve*Ue/I.data.BYTES_PER_ELEMENT,(ve+1)*Ue/I.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,ve,I.width,I.height,1,we,qe)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,I.width,I.height,se.depth,we,I.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,oe,L,I.width,I.height,se.depth,0,I.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Z?ce&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,I.width,I.height,se.depth,we,D,I.data):t.texImage3D(n.TEXTURE_2D_ARRAY,oe,L,I.width,I.height,se.depth,0,we,D,I.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Z&&j&&t.texStorage2D(n.TEXTURE_2D,me,L,J[0].width,J[0].height);for(let oe=0,ue=J.length;oe<ue;oe++)I=J[oe],_.format!==vi?we!==null?Z?ce&&t.compressedTexSubImage2D(n.TEXTURE_2D,oe,0,0,I.width,I.height,we,I.data):t.compressedTexImage2D(n.TEXTURE_2D,oe,L,I.width,I.height,0,I.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Z?ce&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,I.width,I.height,we,D,I.data):t.texImage2D(n.TEXTURE_2D,oe,L,I.width,I.height,0,we,D,I.data)}else if(_.isDataArrayTexture)if(Z){if(j&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,L,se.width,se.height,se.depth),ce)if(_.layerUpdates.size>0){let oe=Lc(se.width,se.height,_.format,_.type);for(let ue of _.layerUpdates){let Ue=se.data.subarray(ue*oe/se.data.BYTES_PER_ELEMENT,(ue+1)*oe/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ue,se.width,se.height,1,we,D,Ue)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,we,D,se.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,L,se.width,se.height,se.depth,0,we,D,se.data);else if(_.isData3DTexture)Z?(j&&t.texStorage3D(n.TEXTURE_3D,me,L,se.width,se.height,se.depth),ce&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,we,D,se.data)):t.texImage3D(n.TEXTURE_3D,0,L,se.width,se.height,se.depth,0,we,D,se.data);else if(_.isFramebufferTexture){if(j)if(Z)t.texStorage2D(n.TEXTURE_2D,me,L,se.width,se.height);else{let oe=se.width,ue=se.height;for(let Ue=0;Ue<me;Ue++)t.texImage2D(n.TEXTURE_2D,Ue,L,oe,ue,0,we,D,null),oe>>=1,ue>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let oe=n.canvas;if(oe.hasAttribute("layoutsubtree")||oe.setAttribute("layoutsubtree","true"),se.parentNode!==oe){oe.appendChild(se),f.add(_),oe.onpaint=ue=>{let Ue=ue.changedElements;for(let ve of f)Ue.includes(ve.image)&&(ve.needsUpdate=!0)},oe.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,se);else{let Ue=n.RGBA,ve=n.RGBA,qe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ue,ve,qe,se)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(J.length>0){if(Z&&j){let oe=Pe(J[0]);t.texStorage2D(n.TEXTURE_2D,me,L,oe.width,oe.height)}for(let oe=0,ue=J.length;oe<ue;oe++)I=J[oe],Z?ce&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,we,D,I):t.texImage2D(n.TEXTURE_2D,oe,L,we,D,I);_.generateMipmaps=!1}else if(Z){if(j){let oe=Pe(se);t.texStorage2D(n.TEXTURE_2D,me,L,oe.width,oe.height)}ce&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,we,D,se)}else t.texImage2D(n.TEXTURE_2D,0,L,we,D,se);w(_)&&_.mipmapsAutoUpdate===!0&&y(ne),Ee.__version=fe.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function Ce(E,_,W){if(_.image.length!==6)return;let ne=Xe(E,_),ae=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+W);let fe=i.get(ae);if(ae.version!==fe.__version||ne===!0){t.activeTexture(n.TEXTURE0+W);let Ee=tt.getPrimaries(tt.workingColorSpace),ie=_.colorSpace===ji?null:tt.getPrimaries(_.colorSpace),se=_.colorSpace===ji||Ee===ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let we=_.isCompressedTexture||_.image[0].isCompressedTexture,D=_.image[0]&&_.image[0].isDataTexture,L=[];for(let ve=0;ve<6;ve++)!we&&!D?L[ve]=S(_.image[ve],!0,s.maxCubemapSize):L[ve]=D?_.image[ve].image:_.image[ve],L[ve]=ee(_,L[ve]);let I=L[0],J=r.convert(_.format,_.colorSpace),Z=r.convert(_.type),j=A(_.internalFormat,J,Z,_.normalized,_.colorSpace),ce=_.isVideoTexture!==!0,me=fe.__version===void 0||ne===!0,oe=ae.dataReady,ue=M(_,I);Je(n.TEXTURE_CUBE_MAP,_);let Ue;if(_.isDepthTexture){if(j=x(_.format===$i,_.type),me)if(ce)t.texStorage2D(n.TEXTURE_CUBE_MAP,1,j,I.width,I.height);else for(let ve=0;ve<6;ve++)t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,j,I.width,I.height,0,J,Z,null)}else if(we){ce&&me&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,j,I.width,I.height);for(let ve=0;ve<6;ve++){Ue=L[ve].mipmaps;for(let qe=0;qe<Ue.length;qe++){let mt=Ue[qe];_.format!==vi?J!==null?ce?oe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,qe,0,0,mt.width,mt.height,J,mt.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,qe,j,mt.width,mt.height,0,mt.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ce?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,qe,0,0,mt.width,mt.height,J,Z,mt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,qe,j,mt.width,mt.height,0,J,Z,mt.data)}}}else{if(Ue=_.mipmaps,ce&&me){Ue.length>0&&ue++;let ve=Pe(L[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,j,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(D){ce?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,L[ve].width,L[ve].height,J,Z,L[ve].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,j,L[ve].width,L[ve].height,0,J,Z,L[ve].data);for(let qe=0;qe<Ue.length;qe++){let Ot=Ue[qe].image[ve].image;ce?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,qe+1,0,0,Ot.width,Ot.height,J,Z,Ot.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,qe+1,j,Ot.width,Ot.height,0,J,Z,Ot.data)}}else{ce?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,J,Z,L[ve]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,j,J,Z,L[ve]);for(let qe=0;qe<Ue.length;qe++){let mt=Ue[qe];ce?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,qe+1,0,0,J,Z,mt.image[ve]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,qe+1,j,J,Z,mt.image[ve])}}}w(_)&&_.mipmapsAutoUpdate===!0&&y(n.TEXTURE_CUBE_MAP),fe.__version=ae.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function he(E,_,W,ne,ae,fe){let Ee=r.convert(W.format,W.colorSpace),ie=r.convert(W.type),se=A(W.internalFormat,Ee,ie,W.normalized,W.colorSpace),we=i.get(_),D=i.get(W);if(D.__renderTarget=_,!we.__hasExternalTextures){let L=Math.max(1,_.width>>fe),I=Math.max(1,_.height>>fe);ae===n.TEXTURE_3D||ae===n.TEXTURE_2D_ARRAY?t.texImage3D(ae,fe,se,L,I,_.depth,0,Ee,ie,null):t.texImage2D(ae,fe,se,L,I,0,Ee,ie,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),be(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,ae,D.__webglTexture,0,ot(_)):(ae===n.TEXTURE_2D||ae>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ne,ae,D.__webglTexture,fe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Me(E,_,W){if(n.bindRenderbuffer(n.RENDERBUFFER,E),_.depthBuffer){let ne=_.depthTexture,ae=ne&&ne.isDepthTexture?ne.type:null,fe=x(_.stencilBuffer,ae),Ee=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;be(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(_),fe,_.width,_.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(_),fe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,fe,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ee,n.RENDERBUFFER,E)}else{let ne=_.textures;for(let ae=0;ae<ne.length;ae++){let fe=ne[ae],Ee=r.convert(fe.format,fe.colorSpace),ie=r.convert(fe.type),se=A(fe.internalFormat,Ee,ie,fe.normalized,fe.colorSpace);be(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(_),se,_.width,_.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(_),se,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,se,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Te(E,_,W){let ne=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ae=i.get(_.depthTexture);ae.__renderTarget=_;let fe=ne?_.depthTexture.image[0]:_.depthTexture.image;(!ae.__webglTexture||fe.width!==_.width||fe.height!==_.height)&&(fe.width=_.width,fe.height=_.height,_.depthTexture.needsUpdate=!0),ne?re(_.depthTexture,0):ge(_.depthTexture,0);let Ee=ae.__webglTexture,ie=ot(_),se=ne?n.TEXTURE_CUBE_MAP_POSITIVE_X+W:n.TEXTURE_2D,we=_.depthTexture.format===$i?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Gi)be(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,we,se,Ee,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,we,se,Ee,0);else if(_.depthTexture.format===$i)be(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,we,se,Ee,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,we,se,Ee,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ke(E){let _=i.get(E),W=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){let ne=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),ne){let ae=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,ne.removeEventListener("dispose",ae)};ne.addEventListener("dispose",ae),_.__depthDisposeCallback=ae}_.__boundDepthTexture=ne}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(W)for(let ne=0;ne<6;ne++)Te(_.__webglFramebuffer[ne],E,ne);else E.texture.mipmaps.length>0?Te(_.__webglFramebuffer[0],E,0):Te(_.__webglFramebuffer,E,0);else if(W){_.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[ne]),_.__webglDepthbuffer[ne]===void 0)_.__webglDepthbuffer[ne]=n.createRenderbuffer(),Me(_.__webglDepthbuffer[ne],E,!1);else{let ae=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=_.__webglDepthbuffer[ne];n.bindRenderbuffer(n.RENDERBUFFER,fe),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,fe)}}else if(E.texture.mipmaps.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Me(_.__webglDepthbuffer,E,!1);else{let ae=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,fe),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,fe)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function $e(E,_,W){let ne=i.get(E);_!==void 0&&he(ne.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&Ke(E)}function Ye(E){let _=E.texture,W=i.get(E),ne=i.get(_);E.addEventListener("dispose",B),z(E);let ae=E.textures,fe=E.isWebGLCubeRenderTarget===!0,Ee=ae.length>1;if(Ee||(ne.__webglTexture===void 0&&(ne.__webglTexture=n.createTexture()),ne.__version=_.version,a.memory.textures++),fe){W.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(_.mipmaps.length>0){W.__webglFramebuffer[ie]=[];for(let se=0;se<_.mipmaps.length;se++)W.__webglFramebuffer[ie][se]=n.createFramebuffer()}else W.__webglFramebuffer[ie]=n.createFramebuffer()}else{if(_.mipmaps.length>0){W.__webglFramebuffer=[];for(let ie=0;ie<_.mipmaps.length;ie++)W.__webglFramebuffer[ie]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(Ee)for(let ie=0,se=ae.length;ie<se;ie++){let we=i.get(ae[ie]);we.__webglTexture===void 0&&(we.__webglTexture=n.createTexture(),a.memory.textures++)}if(E.samples>0&&be(E)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ie=0;ie<ae.length;ie++){let se=ae[ie];W.__webglColorRenderbuffer[ie]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[ie]);let we=r.convert(se.format,se.colorSpace),D=r.convert(se.type),L=A(se.internalFormat,we,D,se.normalized,se.colorSpace,E.isXRRenderTarget===!0),I=ot(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,I,L,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.RENDERBUFFER,W.__webglColorRenderbuffer[ie])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),Me(W.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(fe){t.bindTexture(n.TEXTURE_CUBE_MAP,ne.__webglTexture),Je(n.TEXTURE_CUBE_MAP,_);for(let ie=0;ie<6;ie++)if(_.mipmaps.length>0)for(let se=0;se<_.mipmaps.length;se++)he(W.__webglFramebuffer[ie][se],E,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,se);else he(W.__webglFramebuffer[ie],E,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);w(_)?y(n.TEXTURE_CUBE_MAP):_.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,_.mipmaps.length-1),t.unbindTexture()}else if(Ee){for(let ie=0,se=ae.length;ie<se;ie++){let we=ae[ie],D=i.get(we),L=n.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(L=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(L,D.__webglTexture),Je(L,we),he(W.__webglFramebuffer,E,we,n.COLOR_ATTACHMENT0+ie,L,0),w(we)&&y(L)}t.unbindTexture()}else{let ie=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ie=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ie,ne.__webglTexture),Je(ie,_),_.mipmaps.length>0)for(let se=0;se<_.mipmaps.length;se++)he(W.__webglFramebuffer[se],E,_,n.COLOR_ATTACHMENT0,ie,se);else he(W.__webglFramebuffer,E,_,n.COLOR_ATTACHMENT0,ie,0);w(_)?y(ie):_.mipmaps.length>0&&n.texParameteri(ie,n.TEXTURE_MAX_LEVEL,_.mipmaps.length-1),t.unbindTexture()}E.depthBuffer&&Ke(E)}function F(E){let _=E.textures;for(let W=0,ne=_.length;W<ne;W++){let ae=_[W];if(w(ae)&&ae.mipmapsAutoUpdate===!0){let fe=P(E),Ee=i.get(ae).__webglTexture;t.bindTexture(fe,Ee),y(fe),t.unbindTexture()}}}let ft=[];function He(E){if(E.samples>0){if(be(E)===!1){let _=E.textures,W=E.width,ne=E.height,ae=n.COLOR_BUFFER_BIT,fe=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ee=i.get(E),ie=_.length>1;if(ie)for(let we=0;we<_.length;we++)t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),E.texture.mipmaps.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let we=0;we<_.length;we++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(ae|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(ae|=n.STENCIL_BUFFER_BIT)),ie){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[we]);let D=i.get(_[we]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,D,0)}n.blitFramebuffer(0,0,W,ne,0,0,W,ne,ae,n.NEAREST),c===!0&&(ft.length=0,ft.push(n.COLOR_ATTACHMENT0+we),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&ft.push(fe),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ft))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ie)for(let we=0;we<_.length;we++){t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[we]);let D=i.get(_[we]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,D,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&c){let _=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ot(E){return Math.min(s.maxSamples,E.samples)}function be(E){let _=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ut(E){let _=a.render.frame;d.get(E)!==_&&(d.set(E,_),E.update())}function ee(E,_){let W=E.colorSpace,ne=E.format,ae=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||W!==$s&&W!==ji&&(tt.getTransfer(W)===lt?(ne!==vi||ae!==jt)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):We("WebGLTextures: Unsupported texture color space:",W)),_}function Pe(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=De,this.resetTextureUnits=Q,this.getTextureUnits=G,this.setTextureUnits=Se,this.setTexture2D=ge,this.setTexture2DArray=ye,this.setTexture3D=pe,this.setTextureCube=re,this.rebindTextures=$e,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=He,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=he,this.useMultisampledRTT=be,this.dispose=k}function C0(n,e){function t(i,s=ji){let r,a=tt.getTransfer(s);if(i===jt)return n.UNSIGNED_BYTE;if(i===Mo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===wo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===fc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===mc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===uc)return n.BYTE;if(i===pc)return n.SHORT;if(i===Rs)return n.UNSIGNED_SHORT;if(i===So)return n.INT;if(i===_i)return n.UNSIGNED_INT;if(i===bi)return n.FLOAT;if(i===Ft)return n.HALF_FLOAT;if(i===gc)return n.ALPHA;if(i===xc)return n.RGB;if(i===vi)return n.RGBA;if(i===Gi)return n.DEPTH_COMPONENT;if(i===$i)return n.DEPTH_STENCIL;if(i===_c)return n.RED;if(i===Eo)return n.RED_INTEGER;if(i===Sn)return n.RG;if(i===To)return n.RG_INTEGER;if(i===Ao)return n.RGBA_INTEGER;if(i===Hr||i===Vr||i===Gr||i===Wr)if(a===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Vr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Gr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ro||i===Co||i===Po||i===Io)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ro)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Co)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Po)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Io)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Lo||i===Do||i===No||i===Uo||i===Fo||i===Xr||i===Oo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Lo||i===Do)return a===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===No)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Uo)return r.COMPRESSED_R11_EAC;if(i===Fo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Xr)return r.COMPRESSED_RG11_EAC;if(i===Oo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ko||i===Bo||i===zo||i===Ho||i===Vo||i===Go||i===Wo||i===Xo||i===Yo||i===qo||i===Zo||i===Jo||i===Ko||i===$o)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ko)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Bo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===zo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ho)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Vo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Go)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Wo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Xo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Yo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===qo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Zo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Jo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ko)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===$o)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===jo||i===Qo||i===el)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===jo)return a===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Qo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===el)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===tl||i===il||i===Yr||i===nl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===tl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===il)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Yr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===nl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Hn?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var P0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,I0=`
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

}`,Hc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new hr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Nt({vertexShader:P0,fragmentShader:I0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mt(new Sr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Vc=class extends mi{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,f=null,u=null,p=null,g=null,b=typeof XRWebGLBinding<"u",m=new Hc,h={},S=t.getContextAttributes(),w=null,y=null,P=[],A=[],x=new de,M=null,z=null,R=new Vt;R.viewport=new bt;let N=new Vt;N.viewport=new bt;let B=[R,N],U=new _o,T=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ge=P[K];return ge===void 0&&(ge=new gs,P[K]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(K){let ge=P[K];return ge===void 0&&(ge=new gs,P[K]=ge),ge.getGripSpace()},this.getHand=function(K){let ge=P[K];return ge===void 0&&(ge=new gs,P[K]=ge),ge.getHandSpace()};function q(K){let ge=A.indexOf(K.inputSource);if(ge===-1)return;let ye=P[ge];ye!==void 0&&(ye.update(K.inputSource,K.frame,l||a),ye.dispatchEvent({type:K.type,data:K.inputSource}))}function V(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",te);for(let K=0;K<P.length;K++){let ge=A[K];ge!==null&&(A[K]=null,P[K].disconnect(ge))}T=null,k=null,m.reset();for(let K in h)delete h[K];if(e.setRenderTarget(w),p=null,u=null,f=null,s=null,y=null,De.stop(),i.isPresenting=!1,e.setPixelRatio(M),e.setSize(x.width,x.height,!1),z!==null){let K=z.camera;K.fov=z.fov,K.zoom=z.zoom,K.updateProjectionMatrix(),z=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f===null&&b&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",V),s.addEventListener("inputsourceschange",te),S.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(x),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,pe=null,re=null;S.depth&&(re=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=S.stencil?$i:Gi,pe=S.stencil?Hn:_i);let Be={colorFormat:t.RGBA8,depthFormat:re,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Be),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new At(u.textureWidth,u.textureHeight,{format:vi,type:jt,depthTexture:new qi(u.textureWidth,u.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let ye={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ye),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new At(p.framebufferWidth,p.framebufferHeight,{format:vi,type:jt,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),De.setContext(s),De.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function te(K){for(let ge=0;ge<K.removed.length;ge++){let ye=K.removed[ge],pe=A.indexOf(ye);pe>=0&&(A[pe]=null,P[pe].disconnect(ye))}for(let ge=0;ge<K.added.length;ge++){let ye=K.added[ge],pe=A.indexOf(ye);if(pe===-1){for(let Be=0;Be<P.length;Be++)if(Be>=A.length){A.push(ye),pe=Be;break}else if(A[Be]===null){A[Be]=ye,pe=Be;break}if(pe===-1)break}let re=P[pe];re&&re.connect(ye)}}function H(K,ge){ge===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ge.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let ge=K.near,ye=K.far;m.texture!==null&&(m.depthNear>0&&(ge=m.depthNear),m.depthFar>0&&(ye=m.depthFar)),U.near=N.near=R.near=ge,U.far=N.far=R.far=ye,(T!==U.near||k!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),T=U.near,k=U.far),U.layers.mask=K.layers.mask|6,R.layers.mask=U.layers.mask&-5,N.layers.mask=U.layers.mask&-3;let pe=K.parent,re=U.cameras;H(U,pe);for(let Be=0;Be<re.length;Be++)H(re[Be],pe);U.projectionMatrix.copy(R.projectionMatrix),U.projectionMatrixInverse.copy(R.projectionMatrixInverse),z===null&&K.isPerspectiveCamera&&(z={camera:K,fov:K.fov,zoom:K.zoom}),Q(K,U,pe)};function Q(K,ge,ye){ye===null?K.matrix.copy(ge.matrixWorld):(K.matrix.copy(ye.matrixWorld),K.matrix.invert(),K.matrix.multiply(ge.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ge.projectionMatrix),K.projectionMatrixInverse.copy(ge.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=fs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(K){return h[K]};let G=null;function Se(K,ge){if(d=ge.getViewerPose(l||a),g=ge,d!==null){let ye=d.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let pe=!1;ye.length!==U.cameras.length&&(U.cameras.length=0,pe=!0);for(let Ne=0;Ne<ye.length;Ne++){let Je=ye[Ne],Xe=null;if(p!==null)Xe=p.getViewport(Je);else{let xe=f.getViewSubImage(u,Je);Xe=xe.viewport,Ne===0&&(e.setRenderTargetTextures(y,xe.colorTexture,xe.depthStencilTexture),e.setRenderTarget(y))}let le=B[Ne];le===void 0&&(le=new Vt,le.layers.enable(Ne),le.viewport=new bt,B[Ne]=le),le.matrix.fromArray(Je.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(Je.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(Xe.x,Xe.y,Xe.width,Xe.height),Ne===0&&(U.matrix.copy(le.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),pe===!0&&U.cameras.push(le)}let re=s.enabledFeatures;if(re&&re.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){f=i.getBinding();let Ne=f.getDepthInformation(ye[0]);Ne&&Ne.isValid&&Ne.texture&&m.init(Ne,s.renderState)}if(re&&re.includes("camera-access")&&b){e.state.unbindTexture(),f=i.getBinding();for(let Ne=0;Ne<ye.length;Ne++){let Je=ye[Ne].camera;if(Je){let Xe=h[Je];Xe||(Xe=new hr,h[Je]=Xe);let le=f.getCameraImage(Je);Xe.sourceTexture=le}}}}for(let ye=0;ye<P.length;ye++){let pe=A[ye],re=P[ye];pe!==null&&re!==void 0&&re.update(pe,ge,l||a)}G&&G(K,ge),ge.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ge}),g=null}let De=new Qh;De.setAnimationLoop(Se),this.setAnimationLoop=function(K){G=K},this.dispose=function(){}}},L0=new dt,cu=new Ze;cu.set(-1,0,0,0,1,0,0,0,1);function D0(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,Cc(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,S,w,y){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(m,h):h.isMeshLambertMaterial?(r(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(m,h),f(m,h)):h.isMeshPhongMaterial?(r(m,h),d(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(m,h),u(m,h),h.isMeshPhysicalMaterial&&p(m,h,y)):h.isMeshMatcapMaterial?(r(m,h),g(m,h)):h.isMeshDepthMaterial?r(m,h):h.isMeshDistanceMaterial?(r(m,h),b(m,h)):h.isMeshNormalMaterial?r(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?c(m,h,S,w):h.isSpriteMaterial?l(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===$t&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===$t&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);let S=e.get(h),w=S.envMap,y=S.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(L0.makeRotationFromEuler(y)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(cu),m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function c(m,h,S,w){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*S,m.scale.value=w*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function l(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function d(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function u(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,S){m.ior.value=h.ior,h.diffuseRoughness>0&&(m.diffuseRoughness.value=h.diffuseRoughness,h.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=h.diffuseRoughnessMap,t(h.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===$t&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.retroreflectivity>0&&(m.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=h.iridescenceThicknessMaximum,h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function b(m,h){let S=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function N0(n,e,t,i){let s={},r={};function a(S,w){let y=w.program;i.uniformBlockBinding(S,y,s[S.id])}function o(S,w){let y=s[S.id];y===void 0&&(g(S),y=c(S),s[S.id]=y,S.addEventListener("dispose",m));let P=w.program;i.updateUBOMapping(S,P);let A=e.render.frame;r[S.id]!==A&&(l(S),r[S.id]=A)}function c(S){let w=n.createBuffer(),y=S.__size,P=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,y,P),n.bindBuffer(n.UNIFORM_BUFFER,null),w}function l(S){let w=s[S.id],y=S.uniforms,P=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let A=0,x=y.length;A<x;A++){let M=y[A];if(Array.isArray(M))for(let z=0,R=M.length;z<R;z++)d(M[z],A,z,P);else d(M,A,0,P)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(S,w,y,P){if(u(S,w,y,P)===!0){let A=S.__offset,x=S.value;if(Array.isArray(x)){let M=0;for(let z=0;z<x.length;z++){let R=x[z],N=b(R,!0);f(R,S.__data,M),M+=N.storage/Float32Array.BYTES_PER_ELEMENT}}else f(x,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,A,S.__data)}}function f(S,w,y){typeof S=="number"||typeof S=="boolean"?w[y]=S:S.isMatrix3?(w[y]=S.elements[0],w[y+1]=S.elements[1],w[y+2]=S.elements[2],w[y+3]=0,w[y+4]=S.elements[3],w[y+5]=S.elements[4],w[y+6]=S.elements[5],w[y+7]=0,w[y+8]=S.elements[6],w[y+9]=S.elements[7],w[y+10]=S.elements[8],w[y+11]=0):ArrayBuffer.isView(S)?w.set(S.subarray(0,w.length-y),y):S.toArray(w,y)}function u(S,w,y,P){let A=S.value,x=w+"_"+y;if(Array.isArray(A)){P[x]===void 0&&(P[x]=[]);let M=P[x],z=!1;for(let R=0;R<A.length;R++)p(A[R],M,R)===!0&&(z=!0);return z}return p(A,P,x)}function p(S,w,y){if(w[y]===void 0)return typeof S=="number"||typeof S=="boolean"?w[y]=S:ArrayBuffer.isView(S)?w[y]=S.slice():w[y]=S.clone(),!0;{let P=w[y];if(typeof S=="number"||typeof S=="boolean"){if(P!==S)return w[y]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(P.equals(S)===!1)return P.copy(S),!0}}return!1}function g(S){let w=S.uniforms,y=0,P=16;for(let x=0,M=w.length;x<M;x++){let z=Array.isArray(w[x])?w[x]:[w[x]];for(let R=0,N=z.length;R<N;R++){let B=z[R],U=Array.isArray(B.value)?B.value:[B.value],T=Array.isArray(w[x])||Array.isArray(B.value),k=y;for(let V=0,te=U.length;V<te;V++){let H=U[V],Q=b(H,T),G=y%P,Se=G%Q.boundary,De=G+Se;y+=Se,De!==0&&P-De<Q.storage&&(y+=P-De),V===0&&(k=y),y+=Q.storage}let q=B.type==="int"?Int32Array:B.type==="uint"?Uint32Array:Float32Array;B.__data=new q((y-k)/Float32Array.BYTES_PER_ELEMENT),B.__offset=k}}let A=y%P;return A>0&&(y+=P-A),S.__size=y,S.__cache={},this}function b(S,w){let y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=16,y.storage=48):S.isMatrix4?(y.boundary=16,y.storage=64):S.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(y.boundary=16,y.storage=S.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",S),w===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function m(S){let w=S.target;w.removeEventListener("dispose",m),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function h(){for(let S in s)n.deleteBuffer(s[S]);s={},r={}}return{bind:a,update:o,dispose:h}}var U0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Li=null;function F0(){return Li===null&&(Li=new Ka(U0,16,16,Sn,Ft),Li.name="DFG_LUT",Li.minFilter=qt,Li.magFilter=qt,Li.wrapS=Ei,Li.wrapT=Ei,Li.generateMipmaps=!1,Li.needsUpdate=!0),Li}var cl=class{constructor(e={}){let{canvas:t=vh(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:p=jt}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let b=p,m=new Set([Ao,To,Eo]),h=new Set([jt,_i,Rs,Hn,Mo,wo]),S=new Uint32Array(4),w=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},P=null,A=null,x=[],M=[],z=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ii,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,N=!1,B=null,U=null,T=null,k=null;this._outputColorSpace=Yt;let q=0,V=0,te=null,H=-1,Q=null,G=new bt,Se=new bt,De=null,K=new Ge(0),ge=0,ye=t.width,pe=t.height,re=1,Be=null,it=null,Ne=new bt(0,0,ye,pe),Je=new bt(0,0,ye,pe),Xe=!1,le=new fn,xe=new $a,_e=!1,Ce=!1,he=new dt,Me=new C,Te=new bt,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},$e=!1;function Ye(){return te===null?re:1}let F=i;function ft(v,O){return t.getContext(v,O)}let He,ot,be,ut,ee,Pe,E,_,W,ne,ae,fe,Ee,ie,se,we,D,L,I,J,Z,j,ce;try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",Ue,!1),t.addEventListener("webglcontextcreationerror",ve,!1),F===null){let O="webgl2";if(F=ft(O,v),F===null)throw ft(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}me()}catch(v){throw t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",Ue,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),We("WebGLRenderer: "+v.message),v}function me(){He=new qg(F),He.init(),Z=new C0(F,He),ot=new Fg(F,He,e,Z),be=new A0(F,He),ot.reversedDepthBuffer&&u&&be.buffers.depth.setReversed(!0),U=F.createFramebuffer(),T=F.createFramebuffer(),k=F.createFramebuffer(),ut=new Kg(F),ee=new p0,Pe=new R0(F,He,be,ee,ot,Z,ut),E=new Yg(R),_=new $p(F),j=new Ng(F,_),W=new Zg(F,_,ut,j),ne=new jg(F,W,_,j,ut),L=new $g(F,ot,Pe),se=new Og(ee),ae=new u0(R,E,He,ot,j,se),fe=new D0(R,ee),Ee=new m0,ie=new y0(He),D=new Dg(R,E,be,ne,g,c),we=new T0(R,ne,ot),ce=new N0(F,ut,ot,be),I=new Ug(F,He,ut),J=new Jg(F,He,ut),ut.programs=ae.programs,R.capabilities=ot,R.extensions=He,R.properties=ee,R.renderLists=Ee,R.shadowMap=we,R.state=be,R.info=ut}b!==jt&&(z=new ex(b,t.width,t.height,o,s,r));let oe=new Vc(R,F);this.xr=oe,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let v=He.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=He.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(v){v!==void 0&&(re=v,this.setSize(ye,pe,!1))},this.getSize=function(v){return v.set(ye,pe)},this.setSize=function(v,O,$=!0){if(oe.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}ye=v,pe=O,t.width=Math.floor(v*re),t.height=Math.floor(O*re),$===!0&&(t.style.width=v+"px",t.style.height=O+"px"),z!==null&&z.setSize(t.width,t.height),this.setViewport(0,0,v,O)},this.getDrawingBufferSize=function(v){return v.set(ye*re,pe*re).floor()},this.setDrawingBufferSize=function(v,O,$){ye=v,pe=O,re=$,t.width=Math.floor(v*$),t.height=Math.floor(O*$),this.setViewport(0,0,v,O)},this.setEffects=function(v){if(b===jt){We("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let O=0;O<v.length;O++)if(v[O].isOutputPass===!0){Ve("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}z.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(G)},this.getViewport=function(v){return v.copy(Ne)},this.setViewport=function(v,O,$,X){v.isVector4?Ne.set(v.x,v.y,v.z,v.w):Ne.set(v,O,$,X),be.viewport(G.copy(Ne).multiplyScalar(Ye()).round())},this.getScissor=function(v){return v.copy(Je)},this.setScissor=function(v,O,$,X){v.isVector4?Je.set(v.x,v.y,v.z,v.w):Je.set(v,O,$,X),be.scissor(Se.copy(Je).multiplyScalar(Ye()).round())},this.getScissorTest=function(){return Xe},this.setScissorTest=function(v){be.setScissorTest(Xe=v)},this.setOpaqueSort=function(v){Be=v},this.setTransparentSort=function(v){it=v},this.getClearColor=function(v){return v.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor(...arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha(...arguments)},this.clear=function(v=!0,O=!0,$=!0){let X=0;if(v){let Y=!1;if(te!==null){let Re=te.texture.format;Y=m.has(Re)}if(Y){let Re=te.texture.type,Fe=h.has(Re),Ae=D.getClearColor(),Le=D.getClearAlpha(),ze=Ae.r,je=Ae.g,nt=Ae.b;Fe?(S[0]=ze,S[1]=je,S[2]=nt,S[3]=Le,F.clearBufferuiv(F.COLOR,0,S)):(w[0]=ze,w[1]=je,w[2]=nt,w[3]=Le,F.clearBufferiv(F.COLOR,0,w))}else X|=F.COLOR_BUFFER_BIT}O&&(X|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(X|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&F.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),B=v},this.dispose=function(){t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",Ue,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),D.dispose(),Ee.dispose(),ie.dispose(),Pe.dispose(),ee.dispose(),E.dispose(),ne.dispose(),W.dispose(),j.dispose(),ce.dispose(),ae.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Ui),oe.removeEventListener("sessionend",Xn),Si.stop()};function ue(v){v.preventDefault(),er("WebGLRenderer: Context Lost."),N=!0}function Ue(){er("WebGLRenderer: Context Restored."),N=!1;let v=ut.autoReset,O=we.enabled,$=we.autoUpdate,X=we.needsUpdate,Y=we.type;me(),ut.autoReset=v,we.enabled=O,we.autoUpdate=$,we.needsUpdate=X,we.type=Y}function ve(v){We("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function qe(v){let O=v.target;O.removeEventListener("dispose",qe),mt(O)}function mt(v){Ot(v),ee.remove(v)}function Ot(v){let O=ee.get(v).programs;O!==void 0&&(O.forEach(function($){ae.releaseProgram($)}),v.isShaderMaterial&&ae.releaseShaderCache(v))}this.renderBufferDirect=function(v,O,$,X,Y,Re){O===null&&(O=Ke);let Fe=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,Ae=Eu(v,O,$,X,Y);be.setMaterial(X,Fe);let Le=$.index,ze=1;if(X.wireframe===!0){if(Le=W.getWireframeAttribute($),Le===void 0)return;ze=2}let je=$.drawRange,nt=$.attributes.position,Oe=je.start*ze,st=(je.start+je.count)*ze;Re!==null&&(Oe=Math.max(Oe,Re.start*ze),st=Math.min(st,(Re.start+Re.count)*ze)),Le!==null?(Oe=Math.max(Oe,0),st=Math.min(st,Le.count)):nt!=null&&(Oe=Math.max(Oe,0),st=Math.min(st,nt.count));let Et=st-Oe;if(Et<0||Et===1/0)return;j.setup(Y,X,Ae,$,Le);let xt,gt=I;if(Le!==null&&(xt=_.get(Le),gt=J,gt.setIndex(xt)),Y.isMesh)X.wireframe===!0?(be.setLineWidth(X.wireframeLinewidth*Ye()),gt.setMode(F.LINES)):gt.setMode(F.TRIANGLES);else if(Y.isLine){let kt=X.linewidth;kt===void 0&&(kt=1),be.setLineWidth(kt*Ye()),Y.isLineSegments?gt.setMode(F.LINES):Y.isLineLoop?gt.setMode(F.LINE_LOOP):gt.setMode(F.LINE_STRIP)}else Y.isPoints?gt.setMode(F.POINTS):Y.isSprite&&gt.setMode(F.TRIANGLES);if(Y.isBatchedMesh)if(He.get("WEBGL_multi_draw"))gt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let kt=Y._multiDrawStarts,ke=Y._multiDrawCounts,Wt=Y._multiDrawCount,ct=Le?_.get(Le).bytesPerElement:1,An=ee.get(X).currentProgram.getUniforms();for(let Bt=0;Bt<Wt;Bt++)An.setValue(F,"_gl_DrawID",Bt),gt.render(kt[Bt]/ct,ke[Bt])}else if(Y.isInstancedMesh)gt.renderInstances(Oe,Et,Y.count);else if($.isInstancedBufferGeometry){let kt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,ke=Math.min($.instanceCount,kt);gt.renderInstances(Oe,Et,ke)}else gt.render(Oe,Et)};function wn(v,O,$,X){B!==null&&v.isNodeMaterial&&B.setObject(X,v),_e===!0&&se.setState(v,$,!1),v.transparent===!0&&v.side===Pi&&v.forceSinglePass===!1?(v.side=$t,v.needsUpdate=!0,Us(v,O,X),v.side=yn,v.needsUpdate=!0,Us(v,O,X),v.side=Pi):Us(v,O,X)}this.compile=function(v,O,$=null){$===null&&($=v),B!==null&&B.renderStart(v,O,$),A=ie.get($),A.init(O),M.push(A),$.traverseVisible(function(Y){Y.isLight&&Y.layers.test(O.layers)&&(A.pushLight(Y),Y.castShadow&&A.pushShadow(Y))}),v!==$&&v.traverseVisible(function(Y){Y.isLight&&Y.layers.test(O.layers)&&(A.pushLight(Y),Y.castShadow&&A.pushShadow(Y))}),A.setupLights(),B!==null&&B.updateLights(A.state.lightsArray),Ce=this.localClippingEnabled,_e=se.init(this.clippingPlanes,Ce),_e===!0&&se.setGlobalState(this.clippingPlanes,O),B!==null&&we.render(A.state.shadowsArray,$,O);let X=new Set;return v.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let Re=Y.material;if(Re)if(Array.isArray(Re))for(let Fe=0;Fe<Re.length;Fe++){let Ae=Re[Fe];wn(Ae,$,O,Y),X.add(Ae)}else wn(Re,$,O,Y),X.add(Re)}),A=M.pop(),B!==null&&B.renderEnd(),X},this.compileAsync=function(v,O,$=null){let X=this.compile(v,O,$);return new Promise(Y=>{function Re(){if(X.forEach(function(Fe){let Le=ee.get(Fe).currentProgram;(Le===void 0||Le.isReady())&&X.delete(Fe)}),X.size===0){Y(v);return}setTimeout(Re,10)}He.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let sn=null;function yi(v){sn&&sn(v)}function Ui(){Si.stop()}function Xn(){Si.start()}let Si=new Qh;Si.setAnimationLoop(yi),typeof self<"u"&&Si.setContext(self),this.setAnimationLoop=function(v){sn=v,oe.setAnimationLoop(v),v===null?Si.stop():Si.start()},oe.addEventListener("sessionstart",Ui),oe.addEventListener("sessionend",Xn),this.render=function(v,O){if(O!==void 0&&O.isCamera!==!0){We("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;B!==null&&B.renderStart(v,O);let $=oe.enabled===!0&&oe.isPresenting===!0,X=z!==null&&(te===null||$)&&z.begin(R,te);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(z===null||z.isCompositing()===!1)&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(O),O=oe.getCamera()),v.isScene===!0&&v.onBeforeRender(R,v,O,te),A=ie.get(v,M.length),A.init(O),A.state.textureUnits=Pe.getTextureUnits(),M.push(A),he.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),O.isArrayCamera?xe.setFromArrayCamera(O):le.setFromProjectionMatrix(he,ci,O.reversedDepth),Ce=this.localClippingEnabled,_e=se.init(this.clippingPlanes,Ce),P=Ee.get(v,x.length),P.init(),x.push(P),this.info.render.frame++,oe.enabled===!0&&oe.isPresenting===!0){let Fe=R.xr.getDepthSensingMesh();Fe!==null&&En(Fe,O,-1/0,R.sortObjects)}En(v,O,0,R.sortObjects),P.finish(),B!==null&&B.updateLights(A.state.lightsArray),R.sortObjects===!0&&P.sort(Be,it),$e=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,$e&&D.addToRenderList(P,v),this.info.autoReset===!0&&this.info.reset(),_e===!0&&se.beginShadows();let Y=A.state.shadowsArray;if(we.render(Y,v,O),_e===!0&&se.endShadows(),(X&&z.hasRenderPass())===!1){let Fe=P.opaque,Ae=P.transmissive;if(A.setupLights(),O.isArrayCamera){let Le=O.cameras;if(Ae.length>0)for(let ze=0,je=Le.length;ze<je;ze++){let nt=Le[ze];Qr(Fe,Ae,v,nt)}$e&&D.render(v);for(let ze=0,je=Le.length;ze<je;ze++){let nt=Le[ze];rn(P,v,nt,nt.viewport)}}else Ae.length>0&&Qr(Fe,Ae,v,O),$e&&D.render(v),rn(P,v,O)}te!==null&&V===0&&(Pe.updateMultisampleRenderTarget(te),Pe.updateRenderTargetMipmap(te)),X&&z.end(R),v.isScene===!0&&v.onAfterRender(R,v,O),j.resetDefaultState(),H=-1,Q=null,M.pop(),M.length>0?(A=M[M.length-1],Pe.setTextureUnits(A.state.textureUnits),_e===!0&&se.setGlobalState(R.clippingPlanes,A.state.camera)):A=null,x.pop(),x.length>0?P=x[x.length-1]:P=null,B!==null&&B.renderEnd()};function En(v,O,$,X){if(v.visible===!1)return;if(v.layers.test(O.layers)){if(v.isGroup)$=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(O);else if(v.isLight)A.pushLight(v),v.castShadow&&A.pushShadow(v);else if(v.isSprite){let Fe=O.isArrayCamera?xe:le;if(!v.frustumCulled||v.intersectsFrustum(Fe)){X&&Te.setFromMatrixPosition(v.matrixWorld).applyMatrix4(he);let Ae=ne.update(v),Le=v.material;Le.visible&&P.push(v,Ae,Le,$,Te.z,null,O)}}else if(v.isMesh||v.isLine||v.isPoints){let Fe=O.isArrayCamera?xe:le;if(!v.frustumCulled||v.intersectsFrustum(Fe)){let Ae=ne.update(v),Le=v.material;if(X&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Te.copy(v.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Te.copy(Ae.boundingSphere.center)),Te.applyMatrix4(v.matrixWorld).applyMatrix4(he)),Array.isArray(Le)){let ze=Ae.groups;for(let je=0,nt=ze.length;je<nt;je++){let Oe=ze[je],st=Le[Oe.materialIndex];st&&st.visible&&P.push(v,Ae,st,$,Te.z,Oe,O)}}else Le.visible&&P.push(v,Ae,Le,$,Te.z,null,O)}}}let Re=v.children;for(let Fe=0,Ae=Re.length;Fe<Ae;Fe++)En(Re[Fe],O,$,X)}function rn(v,O,$,X){let{opaque:Y,transmissive:Re,transparent:Fe}=v;A.setupLightsView($),_e===!0&&se.setGlobalState(R.clippingPlanes,$),X&&be.viewport(G.copy(X)),Y.length>0&&Tn(Y,O,$),Re.length>0&&Tn(Re,O,$),Fe.length>0&&Tn(Fe,O,$),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function Qr(v,O,$,X){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[X.id]===void 0){let Oe=He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[X.id]=new At(1,1,{generateMipmaps:!0,type:Oe?Ft:jt,minFilter:Ki,samples:Math.max(4,ot.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:tt.workingColorSpace})}let Re=A.state.transmissionRenderTarget[X.id],Fe=X.viewport||G;Re.setSize(Fe.z*R.transmissionResolutionScale,Fe.w*R.transmissionResolutionScale);let Ae=R.getRenderTarget(),Le=R.getActiveCubeFace(),ze=R.getActiveMipmapLevel();R.setRenderTarget(Re),R.getClearColor(K),ge=R.getClearAlpha(),ge<1&&R.setClearColor(16777215,.5),R.clear(),$e&&D.render($);let je=R.toneMapping;R.toneMapping=Ii;let nt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),A.setupLightsView(X),_e===!0&&se.setGlobalState(R.clippingPlanes,X),Tn(v,$,X),Pe.updateMultisampleRenderTarget(Re),Pe.updateRenderTargetMipmap(Re),He.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let st=0,Et=O.length;st<Et;st++){let xt=O[st],{object:gt,geometry:kt,material:ke,group:Wt}=xt;if(ke.side===Pi&&gt.layers.test(X.layers)){let ct=ke.side;ke.side=$t,ke.needsUpdate=!0,Jc(gt,$,X,kt,ke,Wt),ke.side=ct,ke.needsUpdate=!0,Oe=!0}}Oe===!0&&(Pe.updateMultisampleRenderTarget(Re),Pe.updateRenderTargetMipmap(Re))}R.setRenderTarget(Ae,Le,ze),R.setClearColor(K,ge),nt!==void 0&&(X.viewport=nt),R.toneMapping=je}function Tn(v,O,$){let X=O.isScene===!0?O.overrideMaterial:null;for(let Y=0,Re=v.length;Y<Re;Y++){let Fe=v[Y],{object:Ae,geometry:Le,group:ze}=Fe,je=Fe.material;je.allowOverride===!0&&X!==null&&(je=X),Ae.layers.test($.layers)&&Jc(Ae,O,$,Le,je,ze)}}function Jc(v,O,$,X,Y,Re){B!==null&&Y.isNodeMaterial&&B.setObject(v,Y),v.onBeforeRender(R,O,$,X,Y,Re),v.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),Y.onBeforeRender(R,O,$,X,v,Re),Y.transparent===!0&&Y.side===Pi&&Y.forceSinglePass===!1?(Y.side=$t,Y.needsUpdate=!0,R.renderBufferDirect($,O,X,Y,v,Re),Y.side=yn,Y.needsUpdate=!0,R.renderBufferDirect($,O,X,Y,v,Re),Y.side=Pi):R.renderBufferDirect($,O,X,Y,v,Re),v.onAfterRender(R,O,$,X,Y,Re)}function Kc(v){let O=0;for(let $ of v)$.texture!==null&&O++;return O}function Us(v,O,$){O.isScene!==!0&&(O=Ke);let X=ee.get(v),Y=A.state.lights,Re=A.state.shadowsArray,Fe=Y.state.version,Ae=ae.getParameters(v,Y.state,Re,O,$,A.state.lightProbeGridArray),Le=ae.getProgramCacheKey(Ae),ze=X.programs;X.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?O.environment:null,X.fog=O.fog;let je=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;X.envMap=E.get(v.envMap||X.environment,je),X.envMapRotation=X.environment!==null&&v.envMap===null?O.environmentRotation:v.envMapRotation,ze===void 0&&(v.addEventListener("dispose",qe),ze=new Map,X.programs=ze,X.programVariants=new Map);let nt=ze.get(Le);if(nt!==void 0){if(X.currentProgram===nt&&X.lightsStateVersion===Fe)return jc(v,Ae),nt}else Ae.uniforms=ae.getUniforms(v),B!==null&&v.isNodeMaterial&&B.build(v,$,Ae),v.onBeforeCompile(Ae,R),nt=ae.acquireProgram(Ae,Le),ze.set(Le,nt),X.uniforms=Ae.uniforms;let Oe=X.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Oe.clippingPlanes=se.uniform),jc(v,Ae),X.needsLights=Au(v),X.lightsStateVersion=Fe,X.needsLights&&(Oe.ambientLightColor.value=Y.state.ambient,Oe.lightProbe.value=Y.state.probe,Oe.sunLights.value=Y.state.sun,Oe.sunLightShadows.value=Y.state.sunShadow,Oe.directionalLights.value=Y.state.directional,Oe.directionalLightShadows.value=Y.state.directionalShadow,Oe.spotLights.value=Y.state.spot,Oe.spotLightShadows.value=Y.state.spotShadow,Oe.rectAreaLights.value=Y.state.rectArea,Oe.ltc_1.value=Y.state.rectAreaLTC1,Oe.ltc_2.value=Y.state.rectAreaLTC2,Oe.pointLights.value=Y.state.point,Oe.pointLightShadows.value=Y.state.pointShadow,Oe.hemisphereLights.value=Y.state.hemi,Oe.sunShadowMatrix.value=Y.state.sunShadowMatrix,Oe.sunShadowCascade.value=Y.state.sunShadowCascade,Oe.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Oe.spotLightMatrix.value=Y.state.spotLightMatrix,Oe.spotLightMap.value=Y.state.spotLightMap,Oe.pointShadowMatrix.value=Y.state.pointShadowMatrix),X.numLightProbeGrids=Kc(A.state.lightProbeGridArray),X.currentProgram=nt,X.uniformsList=null,nt}function wu(v,O,$,X,Y){let Re=ee.get(v),Fe=Re.currentProgram.id+","+X+","+Y,Ae=Re.programVariants.get(Fe);return Ae===void 0?(Ae=Us(v,O,$),Re.programVariants.set(Fe,Ae)):(Re.currentProgram=Ae,Re.uniformsList=null,Re.outputColorSpace=X,Re.toneMapping=Y),Ae}function $c(v){if(v.uniformsList===null){let O=v.currentProgram.getUniforms();v.uniformsList=Ps.seqWithValue(O.seq,v.uniforms)}return v.uniformsList}function jc(v,O){let $=ee.get(v);$.outputColorSpace=O.outputColorSpace,$.batching=O.batching,$.batchingColor=O.batchingColor,$.instancing=O.instancing,$.instancingColor=O.instancingColor,$.instancingMorph=O.instancingMorph,$.skinning=O.skinning,$.morphTargets=O.morphTargets,$.morphNormals=O.morphNormals,$.morphColors=O.morphColors,$.morphTargetsCount=O.morphTargetsCount,$.numClippingPlanes=O.numClippingPlanes,$.numIntersection=O.numClipIntersection,$.vertexAlphas=O.vertexAlphas,$.vertexTangents=O.vertexTangents,$.toneMapping=O.toneMapping}function Eu(v,O,$,X,Y){O.isScene!==!0&&(O=Ke),Pe.resetTextureUnits();let Re=O.fog,Fe=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?O.environment:null,Ae=te===null?R.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:tt.workingColorSpace,Le=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,ze=E.get(X.envMap||Fe,Le),je=X.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,nt=!!$.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Oe=!!$.morphAttributes.position,st=!!$.morphAttributes.normal,Et=!!$.morphAttributes.color,xt=Ii;X.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(xt=R.toneMapping);let gt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,kt=gt!==void 0?gt.length:0,ke=ee.get(X),Wt=A.state.lights;if(_e===!0&&(Ce===!0||v!==Q)){let vt=v===Q&&X.id===H;se.setState(X,v,vt)}let ct=!1,An=!1;X.version===ke.__version?ke.needsLights&&ke.lightsStateVersion!==Wt.state.version||Y.isBatchedMesh&&ke.batching===!1||!Y.isBatchedMesh&&ke.batching===!0||Y.isBatchedMesh&&ke.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&ke.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&ke.instancing===!1||!Y.isInstancedMesh&&ke.instancing===!0||Y.isSkinnedMesh&&ke.skinning===!1||!Y.isSkinnedMesh&&ke.skinning===!0||Y.isInstancedMesh&&ke.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&ke.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&ke.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&ke.instancingMorph===!1&&Y.morphTexture!==null||ke.envMap!==ze||X.fog===!0&&ke.fog!==Re||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==se.numPlanes||ke.numIntersection!==se.numIntersection)||ke.vertexAlphas!==je||ke.vertexTangents!==nt||ke.morphTargets!==Oe||ke.morphNormals!==st||ke.morphColors!==Et||ke.morphTargetsCount!==kt||ke.numLightProbeGrids!==Kc(A.state.lightProbeGridArray)?ct=!0:(ke.outputColorSpace!==Ae||ke.toneMapping!==xt)&&(An=!0):(ct=!0,ke.__version=X.version);let Bt=ke.currentProgram;(ct===!0||An===!0)&&(Bt=An===!0?wu(X,O,Y,Ae,xt):Us(X,O,Y),B&&X.isNodeMaterial&&B.onUpdateProgram(X,Bt,ke));let ea=!1,an=!1,Rn=!1,at=Bt.getUniforms(),Ut=ke.uniforms;if(be.useProgram(Bt.program)&&(ea=!0,an=!0,Rn=!0),X.id!==H&&(H=X.id,an=!0),ea||Q!==v){be.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),at.setValue(F,"projectionMatrix",v.projectionMatrix),at.setValue(F,"viewMatrix",v.matrixWorldInverse);let It=at.map.cameraPosition;It!==void 0&&It.setValue(F,Me.setFromMatrixPosition(v.matrixWorld)),ot.logarithmicDepthBuffer&&at.setValue(F,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&at.setValue(F,"isOrthographic",v.isOrthographicCamera===!0),Q!==v&&(Q=v,an=!0,Rn=!0)}if(ke.needsLights&&(Wt.state.sunShadowMap.length>0&&at.setValue(F,"sunShadowMap",Wt.state.sunShadowMap,Pe),Wt.state.directionalShadowMap.length>0&&at.setValue(F,"directionalShadowMap",Wt.state.directionalShadowMap,Pe),Wt.state.spotShadowMap.length>0&&at.setValue(F,"spotShadowMap",Wt.state.spotShadowMap,Pe),Wt.state.pointShadowMap.length>0&&at.setValue(F,"pointShadowMap",Wt.state.pointShadowMap,Pe)),Y.isSkinnedMesh){at.setOptional(F,Y,"bindMatrix"),at.setOptional(F,Y,"bindMatrixInverse");let vt=Y.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),at.setValue(F,"boneTexture",vt.boneTexture,Pe))}Y.isBatchedMesh&&(at.setOptional(F,Y,"batchingTexture"),at.setValue(F,"batchingTexture",Y._matricesTexture,Pe),at.setOptional(F,Y,"batchingIdTexture"),at.setValue(F,"batchingIdTexture",Y._indirectTexture,Pe),at.setOptional(F,Y,"batchingColorTexture"),Y._colorsTexture!==null&&at.setValue(F,"batchingColorTexture",Y._colorsTexture,Pe));let di=$.morphAttributes;if((di.position!==void 0||di.normal!==void 0||di.color!==void 0)&&L.update(Y,$,Bt),(an||ke.receiveShadow!==Y.receiveShadow)&&(ke.receiveShadow=Y.receiveShadow,at.setValue(F,"receiveShadow",Y.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&O.environment!==null&&(Ut.envMapIntensity.value=O.environmentIntensity),Ut.dfgLUT!==void 0&&(Ut.dfgLUT.value=F0()),an){if(at.setValue(F,"toneMappingExposure",R.toneMappingExposure),ke.needsLights&&Tu(Ut,Rn),Re&&X.fog===!0&&fe.refreshFogUniforms(Ut,Re),fe.refreshMaterialUniforms(Ut,X,re,pe,A.state.transmissionRenderTarget[v.id]),ke.needsLights&&ke.numLightProbeGrids>0){let vt=y,It=0;for(let Fi of A.state.lightProbeGridArray)Fi.texture!==null&&(vt.textures[It]=Fi.texture,vt.min[It]=Fi.boundingBox.min,vt.max[It]=Fi.boundingBox.max,vt.resolution[It]=Fi.resolution,It++);for(let Fi in vt)vt[Fi].length=It;Ut.probesSH.value=vt.textures,Ut.probesMin.value=vt.min,Ut.probesMax.value=vt.max,Ut.probesResolution.value=vt.resolution}Ps.upload(F,$c(ke),Ut,Pe)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Ps.upload(F,$c(ke),Ut,Pe),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&at.setValue(F,"center",Y.center),at.setValue(F,"modelViewMatrix",Y.modelViewMatrix),at.setValue(F,"normalMatrix",Y.normalMatrix),at.setValue(F,"modelMatrix",Y.matrixWorld),X.uniformsGroups!==void 0){let vt=X.uniformsGroups;for(let It=0,Fi=vt.length;It<Fi;It++){let ed=vt[It];ce.update(ed,Bt),ce.bind(ed,Bt)}}return Bt}function Tu(v,O){v.ambientLightColor.needsUpdate=O,v.lightProbe.needsUpdate=O,v.sunLights.needsUpdate=O,v.sunLightShadows.needsUpdate=O,v.directionalLights.needsUpdate=O,v.directionalLightShadows.needsUpdate=O,v.pointLights.needsUpdate=O,v.pointLightShadows.needsUpdate=O,v.spotLights.needsUpdate=O,v.spotLightShadows.needsUpdate=O,v.rectAreaLights.needsUpdate=O,v.hemisphereLights.needsUpdate=O}function Au(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(v,O,$){let X=ee.get(v);X.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),ee.get(v.texture).__webglTexture=O,ee.get(v.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:$,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,O){let $=ee.get(v);$.__webglFramebuffer=O,$.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(v,O=0,$=0){te=v,q=O,V=$;let X=null,Y=!1,Re=!1;if(v){let Ae=ee.get(v);if(Ae.__useDefaultFramebuffer!==void 0){be.bindFramebuffer(F.FRAMEBUFFER,Ae.__webglFramebuffer),G.copy(v.viewport),Se.copy(v.scissor),De=v.scissorTest,be.viewport(G),be.scissor(Se),be.setScissorTest(De),H=-1;return}else if(Ae.__webglFramebuffer===void 0)Pe.setupRenderTarget(v);else if(Ae.__hasExternalTextures)Pe.rebindTextures(v,ee.get(v.texture).__webglTexture,ee.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let je=v.depthTexture;if(Ae.__boundDepthTexture!==je){if(je!==null&&ee.has(je)&&(v.width!==je.image.width||v.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Pe.setupDepthRenderbuffer(v)}}let Le=v.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(Re=!0);let ze=ee.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(ze[O])?X=ze[O][$]:X=ze[O],Y=!0):v.samples>0&&Pe.useMultisampledRTT(v)===!1?X=ee.get(v).__webglMultisampledFramebuffer:Array.isArray(ze)?X=ze[$]:X=ze,G.copy(v.viewport),Se.copy(v.scissor),De=v.scissorTest}else G.copy(Ne).multiplyScalar(re).floor(),Se.copy(Je).multiplyScalar(re).floor(),De=Xe;if($!==0&&(X=U),be.bindFramebuffer(F.FRAMEBUFFER,X)&&be.drawBuffers(v,X),be.viewport(G),be.scissor(Se),be.setScissorTest(De),Y){let Ae=ee.get(v.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ae.__webglTexture,$)}else if(Re){let Ae=O;for(let Le=0;Le<v.textures.length;Le++){let ze=ee.get(v.textures[Le]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Le,ze.__webglTexture,$,Ae)}}else if(v!==null&&$!==0){let Ae=ee.get(v.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ae.__webglTexture,$)}H=-1};function Qc(v){let O=ee.get(v);return(O.__readFormat!==v.format||O.__readType!==v.type)&&(O.__readFormat=v.format,O.__readType=v.type,O.__formatReadable=ot.textureFormatReadable(v.format),O.__typeReadable=ot.textureTypeReadable(v.type)),O}this.readRenderTargetPixels=function(v,O,$,X,Y,Re,Fe,Ae=0){if(!(v&&v.isWebGLRenderTarget)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=ee.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Fe!==void 0&&(Le=Le[Fe],Array.isArray(Le)&&(Le=Le[0])),Le){be.bindFramebuffer(F.FRAMEBUFFER,Le);try{let ze=v.textures[Ae],je=ze.format,nt=ze.type;v.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ae);let Oe=Qc(ze);if(Oe.__formatReadable===!1){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Oe.__typeReadable===!1){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=v.width-X&&$>=0&&$<=v.height-Y&&F.readPixels(O,$,X,Y,Z.convert(je),Z.convert(nt),Re)}finally{let ze=te!==null?ee.get(te).__webglFramebuffer:null;be.bindFramebuffer(F.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(v,O,$,X,Y,Re,Fe,Ae=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=ee.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Fe!==void 0&&(Le=Le[Fe],Array.isArray(Le)&&(Le=Le[0])),Le)if(O>=0&&O<=v.width-X&&$>=0&&$<=v.height-Y){be.bindFramebuffer(F.FRAMEBUFFER,Le);let ze=v.textures[Ae],je=ze.format,nt=ze.type;v.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ae);let Oe=Qc(ze);if(Oe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Oe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let st=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,st),F.bufferData(F.PIXEL_PACK_BUFFER,Re.byteLength,F.STREAM_READ),F.readPixels(O,$,X,Y,Z.convert(je),Z.convert(nt),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Et=te!==null?ee.get(te).__webglFramebuffer:null;be.bindFramebuffer(F.FRAMEBUFFER,Et);let xt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Sh(F,xt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,st),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Re),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(st),F.deleteSync(xt),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,O=null,$=0){let X=Math.pow(2,-$),Y=Math.floor(v.image.width*X),Re=Math.floor(v.image.height*X),Fe=O!==null?O.x:0,Ae=O!==null?O.y:0;Pe.setTexture2D(v,0),F.copyTexSubImage2D(F.TEXTURE_2D,$,0,0,Fe,Ae,Y,Re),be.unbindTexture()},this.copyTextureToTexture=function(v,O,$=null,X=null,Y=0,Re=0){let Fe,Ae,Le,ze,je,nt,Oe,st,Et,xt=v.isCompressedTexture?v.mipmaps[Re]:v.image;if($!==null)Fe=$.max.x-$.min.x,Ae=$.max.y-$.min.y,Le=$.isBox3?$.max.z-$.min.z:1,ze=$.min.x,je=$.min.y,nt=$.isBox3?$.min.z:0;else{let at=Math.pow(2,-Y);Fe=Math.floor(xt.width*at),Ae=Math.floor(xt.height*at),v.isDataArrayTexture?Le=xt.depth:v.isData3DTexture?Le=Math.floor(xt.depth*at):Le=1,ze=0,je=0,nt=0}X!==null?(Oe=X.x,st=X.y,Et=X.z):(Oe=0,st=0,Et=0);let gt=Z.convert(O.format),kt=Z.convert(O.type),ke;O.isData3DTexture?(Pe.setTexture3D(O,0),ke=F.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Pe.setTexture2DArray(O,0),ke=F.TEXTURE_2D_ARRAY):(Pe.setTexture2D(O,0),ke=F.TEXTURE_2D),be.activeTexture(F.TEXTURE0),be.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,O.flipY),be.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),be.pixelStorei(F.UNPACK_ALIGNMENT,O.unpackAlignment);let Wt=be.getParameter(F.UNPACK_ROW_LENGTH),ct=be.getParameter(F.UNPACK_IMAGE_HEIGHT),An=be.getParameter(F.UNPACK_SKIP_PIXELS),Bt=be.getParameter(F.UNPACK_SKIP_ROWS),ea=be.getParameter(F.UNPACK_SKIP_IMAGES);be.pixelStorei(F.UNPACK_ROW_LENGTH,xt.width),be.pixelStorei(F.UNPACK_IMAGE_HEIGHT,xt.height),be.pixelStorei(F.UNPACK_SKIP_PIXELS,ze),be.pixelStorei(F.UNPACK_SKIP_ROWS,je),be.pixelStorei(F.UNPACK_SKIP_IMAGES,nt);let an=v.isDataArrayTexture||v.isData3DTexture,Rn=O.isDataArrayTexture||O.isData3DTexture;if(v.isDepthTexture){let at=ee.get(v),Ut=ee.get(O),di=ee.get(at.__renderTarget),vt=ee.get(Ut.__renderTarget);be.bindFramebuffer(F.READ_FRAMEBUFFER,di.__webglFramebuffer),be.bindFramebuffer(F.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let It=0;It<Le;It++)an&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ee.get(v).__webglTexture,Y,nt+It),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ee.get(O).__webglTexture,Re,Et+It)),F.blitFramebuffer(ze,je,ze+Fe,je+Ae,Oe,st,Oe+Fe,st+Ae,F.DEPTH_BUFFER_BIT,F.NEAREST);be.bindFramebuffer(F.READ_FRAMEBUFFER,null),be.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(Y!==0||v.isRenderTargetTexture||ee.has(v)){let at=ee.get(v),Ut=ee.get(O);be.bindFramebuffer(F.READ_FRAMEBUFFER,T),be.bindFramebuffer(F.DRAW_FRAMEBUFFER,k);for(let di=0;di<Le;di++)an?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,at.__webglTexture,Y,nt+di):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,at.__webglTexture,Y),Rn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ut.__webglTexture,Re,Et+di):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ut.__webglTexture,Re),Y!==0?F.blitFramebuffer(ze,je,ze+Fe,je+Ae,Oe,st,Oe+Fe,st+Ae,F.COLOR_BUFFER_BIT,F.NEAREST):Rn?F.copyTexSubImage3D(ke,Re,Oe,st,Et+di,ze,je,Fe,Ae):F.copyTexSubImage2D(ke,Re,Oe,st,ze,je,Fe,Ae);be.bindFramebuffer(F.READ_FRAMEBUFFER,null),be.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Rn?v.isDataTexture||v.isData3DTexture?F.texSubImage3D(ke,Re,Oe,st,Et,Fe,Ae,Le,gt,kt,xt.data):O.isCompressedArrayTexture?F.compressedTexSubImage3D(ke,Re,Oe,st,Et,Fe,Ae,Le,gt,xt.data):F.texSubImage3D(ke,Re,Oe,st,Et,Fe,Ae,Le,gt,kt,xt):v.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Re,Oe,st,Fe,Ae,gt,kt,xt.data):v.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Re,Oe,st,xt.width,xt.height,gt,xt.data):F.texSubImage2D(F.TEXTURE_2D,Re,Oe,st,Fe,Ae,gt,kt,xt);be.pixelStorei(F.UNPACK_ROW_LENGTH,Wt),be.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ct),be.pixelStorei(F.UNPACK_SKIP_PIXELS,An),be.pixelStorei(F.UNPACK_SKIP_ROWS,Bt),be.pixelStorei(F.UNPACK_SKIP_IMAGES,ea),Re===0&&O.generateMipmaps===!0&&O.mipmapsAutoUpdate===!0&&F.generateMipmap(ke),be.unbindTexture()},this.initRenderTarget=function(v){ee.get(v).__webglFramebuffer===void 0&&Pe.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Pe.setTextureCube(v,0):v.isData3DTexture?Pe.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Pe.setTexture2DArray(v,0):Pe.setTexture2D(v,0),be.unbindTexture()},this.resetState=function(){q=0,V=0,te=null,be.reset(),j.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}};var hu={type:"change"},Wc={type:"start"},pu={type:"end"},ul=new pn,uu=new ii,O0=Math.cos(70*Cs.DEG2RAD),Pt=new C,Qt=2*Math.PI,ht={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Gc=1e-6,pl=class extends Lr{constructor(e,t=null){super(e,t),this.state=ht.NONE,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:bn.ROTATE,MIDDLE:bn.DOLLY,RIGHT:bn.PAN},this.touches={ONE:vn.ROTATE,TWO:vn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new Zt,this._lastTargetPosition=new C,this._quat=new Zt().setFromUnitVectors(e.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ws,this._sphericalDelta=new ws,this._scale=1,this._panOffset=new C,this._rotateStart=new de,this._rotateEnd=new de,this._rotateDelta=new de,this._panStart=new de,this._panEnd=new de,this._panDelta=new de,this._dollyStart=new de,this._dollyEnd=new de,this._dollyDelta=new de,this._dollyDirection=new C,this._mouse=new de,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=B0.bind(this),this._onPointerDown=k0.bind(this),this._onPointerUp=z0.bind(this),this._onContextMenu=q0.bind(this),this._onMouseWheel=G0.bind(this),this._onKeyDown=W0.bind(this),this._onTouchStart=X0.bind(this),this._onTouchMove=Y0.bind(this),this._onMouseDown=H0.bind(this),this._onMouseMove=V0.bind(this),this._interceptControlDown=Z0.bind(this),this._interceptControlUp=J0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ht.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(hu),this.update(),this.state=ht.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Pt.copy(t).sub(this.target),Pt.applyQuaternion(this._quat),this._spherical.setFromVector3(Pt),this.autoRotate&&this.state===ht.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Qt:i>Math.PI&&(i-=Qt),s<-Math.PI?s+=Qt:s>Math.PI&&(s-=Qt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Pt.setFromSpherical(this._spherical),Pt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Pt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Pt.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new C(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new C(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Pt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ul.origin.copy(this.object.position),ul.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ul.direction))<O0?this.object.lookAt(this.target):(uu.setFromNormalAndCoplanarPoint(this.object.up,this.target),ul.intersectPlane(uu,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Gc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Gc||this._lastTargetPosition.distanceToSquared(this.target)>Gc?(this.dispatchEvent(hu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qt/60*this.autoRotateSpeed*e:Qt/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Pt.setFromMatrixColumn(t,0),Pt.multiplyScalar(-e),this._panOffset.add(Pt)}_panUp(e,t){this.screenSpacePanning===!0?Pt.setFromMatrixColumn(t,1):(Pt.setFromMatrixColumn(t,0),Pt.crossVectors(this.object.up,Pt)),Pt.multiplyScalar(e),this._panOffset.add(Pt)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Pt.copy(s).sub(this.target);let r=Pt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new de,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function k0(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function B0(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function z0(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(pu),this.state=ht.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function H0(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case bn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ht.DOLLY;break;case bn.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ht.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ht.ROTATE}break;case bn.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ht.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ht.PAN}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(Wc)}function V0(n){switch(this.state){case ht.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ht.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ht.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function G0(n){this.enabled===!1||this.enableZoom===!1||this.state!==ht.NONE||(n.preventDefault(),this.dispatchEvent(Wc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(pu))}function W0(n){this.enabled!==!1&&this._handleKeyDown(n)}function X0(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case vn.ROTATE:if(this.enableRotate===!1){this.state=ht.NONE;break}this._handleTouchStartRotate(n),this.state=ht.TOUCH_ROTATE;break;case vn.PAN:if(this.enablePan===!1){this.state=ht.NONE;break}this._handleTouchStartPan(n),this.state=ht.TOUCH_PAN;break;default:this.state=ht.NONE}break;case 2:switch(this.touches.TWO){case vn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ht.TOUCH_DOLLY_PAN;break;case vn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ht.TOUCH_DOLLY_ROTATE;break;default:this.state=ht.NONE}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(Wc)}function Y0(n){switch(this._trackPointer(n),this.state){case ht.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ht.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ht.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ht.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ht.NONE}}function q0(n){this.enabled!==!1&&n.preventDefault()}function Z0(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function J0(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var fu=new C,K0=new Zt,mu=new C,tn=class extends wt{constructor(e=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this}};var Ni=new dt,$0=new dt,fl=class{constructor(e={}){let t=this,i,s,r,a,o={camera:{style:""},objects:new WeakMap},c=e.element!==void 0?e.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c;let l=document.createElement("div");l.style.transformOrigin="0 0",l.style.pointerEvents="none",c.appendChild(l);let d=document.createElement("div");d.style.transformStyle="preserve-3d",l.appendChild(d),this.getSize=function(){return{width:i,height:s}},this.render=function(m,h){let S=h.projectionMatrix.elements[5]*a;h.view&&h.view.enabled?(l.style.transform=`translate( ${-h.view.offsetX*(i/h.view.width)}px, ${-h.view.offsetY*(s/h.view.height)}px )`,l.style.transform+=`scale( ${h.view.fullWidth/h.view.width}, ${h.view.fullHeight/h.view.height} )`):l.style.transform="",m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),h.parent===null&&h.matrixWorldAutoUpdate===!0&&h.updateMatrixWorld();let w,y;h.isOrthographicCamera&&(w=-(h.right+h.left)/2,y=(h.top+h.bottom)/2);let P=h.view&&h.view.enabled?h.view.height/h.view.fullHeight:1,A=h.isOrthographicCamera?`scale( ${P} )scale(`+S+")translate("+f(w)+"px,"+f(y)+"px)"+u(h.matrixWorldInverse):`scale( ${P} )translateZ(`+S+"px)"+u(h.matrixWorldInverse),M=(h.isPerspectiveCamera?"perspective("+S+"px) ":"")+A+"translate("+r+"px,"+a+"px)";o.camera.style!==M&&(d.style.transform=M,o.camera.style=M),b(m,m,h,A)},this.setSize=function(m,h){i=m,s=h,r=i/2,a=s/2,c.style.width=m+"px",c.style.height=h+"px",l.style.width=m+"px",l.style.height=h+"px",d.style.width=m+"px",d.style.height=h+"px"};function f(m){return Math.abs(m)<1e-10?0:m}function u(m){let h=m.elements;return"matrix3d("+f(h[0])+","+f(-h[1])+","+f(h[2])+","+f(h[3])+","+f(h[4])+","+f(-h[5])+","+f(h[6])+","+f(h[7])+","+f(h[8])+","+f(-h[9])+","+f(h[10])+","+f(h[11])+","+f(h[12])+","+f(-h[13])+","+f(h[14])+","+f(h[15])+")"}function p(m){let h=m.elements;return"translate(-50%,-50%)"+("matrix3d("+f(h[0])+","+f(h[1])+","+f(h[2])+","+f(h[3])+","+f(-h[4])+","+f(-h[5])+","+f(-h[6])+","+f(-h[7])+","+f(h[8])+","+f(h[9])+","+f(h[10])+","+f(h[11])+","+f(h[12])+","+f(h[13])+","+f(h[14])+","+f(h[15])+")")}function g(m){m.isCSS3DObject&&(m.element.style.display="none");for(let h=0,S=m.children.length;h<S;h++)g(m.children[h])}function b(m,h,S,w){if(m.visible===!1){g(m);return}if(m.isCSS3DObject){let y=m.layers.test(S.layers)===!0,P=m.element;if(P.style.display=y===!0?"":"none",y===!0){m.onBeforeRender(t,h,S);let A;m.isCSS3DSprite?(Ni.copy(S.matrixWorldInverse),Ni.transpose(),m.rotation2D!==0&&Ni.multiply($0.makeRotationZ(m.rotation2D)),m.matrixWorld.decompose(fu,K0,mu),Ni.setPosition(fu),Ni.scale(mu),Ni.elements[3]=0,Ni.elements[7]=0,Ni.elements[11]=0,Ni.elements[15]=1,A=p(Ni)):A=p(m.matrixWorld);let x=o.objects.get(m);if(x===void 0||x.style!==A){P.style.transform=A;let M={style:A};o.objects.set(m,M)}P.parentNode!==d&&d.appendChild(P),m.onAfterRender(t,h,S)}}for(let y=0,P=m.children.length;y<P;y++)b(m.children[y],h,S,w)}}};var Ls={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var oi=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},j0=new On(-1,1,1,-1,0,1),Xc=class extends pt{constructor(){super(),this.setAttribute("position",new rt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new rt([0,2,0,0,2,0],2))}},Q0=new Xc,Mn=class{constructor(e){this._mesh=new Mt(Q0,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,j0)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var ml=class extends oi{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Nt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=en.clone(e.uniforms),this.material=new Nt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Mn(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var $r=class extends oi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},gl=class extends oi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var xl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new de);this._width=i.width,this._height=i.height,t=new At(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ft}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ml(Ls),this.copyPass.material.blending=Ji,this.timer=new Ir}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){let o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}$r!==void 0&&(a instanceof $r?i=!0:a instanceof gl&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new de);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var _l=class extends oi{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ge}render(e,t,i){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var gu={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ge(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var Ds=class n extends oi{constructor(e,t=1,i,s){super(),this.strength=t,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new de(e.x,e.y):new de(256,256),this.clearColor=new Ge(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new At(r,a,{type:Ft,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){let f=new At(r,a,{type:Ft,depthBuffer:!1});f.texture.name="UnrealBloomPass.h"+d,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let u=new At(r,a,{type:Ft,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+d,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}let o=gu;this.highPassUniforms=en.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Nt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new de(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=en.clone(Ls.uniforms),this.blendMaterial=new Nt({uniforms:this.copyUniforms,vertexShader:Ls.vertexShader,fragmentShader:Ls.fragmentShader,premultipliedAlpha:!0,blending:ai,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ge,this._oldClearAlpha=1,this._basic=new ni,this._fsQuad=new Mn(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new de(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=n.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=n.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[],i=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(i*i))/i);let s=[],r=[];for(let a=1;a<e;a+=2){let o=t[a],c=a+1<e?t[a+1]:0,l=o+c;s.push((a*o+(a+1)*c)/l),r.push(l)}return new Nt({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new de(.5,.5)},direction:{value:new de(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Nt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};Ds.BlurDirectionX=new de(1,0);Ds.BlurDirectionY=new de(0,1);var jr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var bl=class extends oi{constructor(){super(),this.isOutputPass=!0,this.uniforms=en.clone(jr.uniforms),this.material=new ys({name:jr.name,uniforms:this.uniforms,vertexShader:jr.vertexShader,fragmentShader:jr.fragmentShader}),this._fsQuad=new Mn(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},tt.getTransfer(this._outputColorSpace)===lt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Nr?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ur?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Fr?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Bn?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===kr?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Br?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Or&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var xu={running:"执行中",succeeded:"已完成",failed:"失败",refused:"未执行",cancelled:"已停止",interrupted:"已中断",waiting:"后台处理中",unverified:"待确认",needs_revision:"需改进",deferred:"待后台任务",bound:"已绑定",configured:"流程设置",recorded:"已登记"},Ns={engine:"研究引擎",step:"研究阶段",objective:"研究目标",instruction:"执行指令",requirement:"交付要求",constraint:"禁止事项",gate:"达标循环",skill:"技能绑定",call:"工具调用",review:"核验记录",material:"读取对象",operation:"执行说明",result:"调用回执",artifact:"交付文件",delivery:"交付记录",output:"输出格式"};function Wn(n,{scope:e="all"}={}){let t=[],i=[],s=new Map,r=new Map((n?.nodes||[]).map(l=>[l.id,l])),a=(l,d,f,u,p={})=>{if(s.has(l))return s.get(l);let g={id:l,kind:d,title:f,detail:u||"",stepId:null,origin:"configuration",status:"configured",active:!1,...p};return t.push(g),s.set(l,g),g},o=(l,d,f="relation")=>{l!==d&&s.has(l)&&s.has(d)&&i.push({id:l+">"+d,source:l,target:d,kind:f,active:s.get(d).active})};a("engine","engine",n?.name||"METIS",n?.headline||"",{origin:"runtime",status:n?.phase,statusLabel:{ready:"待继续",processing:"处理中",running:"执行中",waiting:"待确认",attention:"需处理",stopped:"已停止",completed:"已交付",unavailable:"未就绪"}[n?.phase]||"",active:["running","processing"].includes(n?.phase)});for(let l of n?.nodes||[]){let d="step:"+l.id;a(d,"step",l.title,l.purpose,{stepId:l.id,index:l.index,origin:"workflow",status:l.status,statusLabel:l.label,active:l.active,viewed:l.viewed}),l.index===0?o("engine",d,"sequence"):o("step:"+n.nodes[l.index-1].id,d,"sequence");let f=(u,p,g,b,m={})=>{if(!b)return;let h=a(u+":"+l.id,p,g,b,{stepId:l.id,...m});return o(d,h.id,"configuration"),h};if(e==="all"){f("goal","objective","研究目标",l.purpose),f("instruction","instruction","执行指令",l.executionBrief?.excerpt,{characters:l.executionBrief?.characters}),f("expected","requirement","交付要求",l.expected),f("prohibitions","constraint","禁止事项",l.prohibitions),l.loop&&f("gate","gate","达标循环",l.loopCriteria||l.purpose||"按本步目标和交付内容核验。");for(let u of l.skills||[]){let p=a("skill:"+l.id+":"+u.id,"skill",u.name||u.id,u.id,{stepId:l.id,status:"bound",skillId:u.id});o(d,p.id,"binding")}l.output?.format&&l.output.format!=="auto"&&f("output","output",l.output.format.toUpperCase(),l.output.wordFormatting||"本项目固定的最终输出格式")}for(let u of l.artifacts||[]){let p=a("artifact:"+l.id+":"+u.index,"artifact",u.name,u.path,{stepId:l.id,origin:"delivery",status:"recorded",availability:u.availability,fileIndex:u.index,file:u});o(d,p.id,"delivery")}if(l.delivery?.text){let u=a("delivery:"+l.id,"delivery","交付记录",l.delivery.text,{stepId:l.id,origin:"delivery",status:"recorded",at:l.delivery.at});o(d,u.id,"delivery")}}for(let l of n?.activities||[]){let d=r.has(l.stepId)?l.stepId:null,f=l.kind==="review"?"review":"call",u=a("call:"+l.callId,f,l.tool||l.label,l.target||l.label,{stepId:d,origin:"activity",status:l.status,statusLabel:xu[l.status]||l.status,active:l.status==="running"&&l.invoked!==!1,callId:l.callId,call:l,label:l.label});if(l.target){let g=a("target:"+l.callId,["read","write","search"].includes(l.kind)?"material":"operation",l.kind==="read"?"读取对象":l.kind==="write"?"修改对象":l.kind==="search"?"检索对象":"调用参数",l.target,{stepId:d,origin:"activity",status:l.status,active:u.active,callId:l.callId,call:l});o(u.id,g.id,"input")}let p=[l.error,l.resultPreview,...l.feedback||[]].filter(Boolean).join(`
`);if(p||typeof l.exitCode=="number"){let g=a("result:"+l.callId,"result",l.status==="failed"?"错误回执":"执行回执",p,{stepId:d,origin:"activity",status:l.status,callId:l.callId,call:l,exitCode:l.exitCode});o(u.id,g.id,"result")}}for(let l of n?.activities||[]){let d="call:"+l.callId,f="call:"+l.rootCallId;o(f!==d&&s.has(f)?f:r.has(l.stepId)?"step:"+l.stepId:"engine",d,"execution");for(let u of t)u.kind==="artifact"&&u.detail===l.target&&o(d,u.id,"reference")}for(let l of t)l.statusLabel??=xu[l.status]||l.status||"";let c=e_(t,i,n?.nodes||[]);return{nodes:t,edges:i,byId:s,positions:c.positions,bounds:c.bounds,counts:{entities:t.length,stages:r.size,bindings:t.filter(l=>l.kind==="skill").length,calls:t.filter(l=>l.origin==="activity"&&(l.kind==="call"||l.kind==="review")).length,materials:t.filter(l=>l.kind==="material").length,artifacts:t.filter(l=>l.kind==="artifact").length},scope:e}}function Gn(n){return n.kind==="engine"?{w:4.8,h:2.3}:n.kind==="step"?{w:4.1,h:2.35}:{w:2.75,h:1.16}}function e_(n,e,t){let i=new Map,s=new Map(n.map(u=>[u.id,u])),r=new Map,a=new Map;for(let u of e)["sequence","reference"].includes(u.kind)||(r.has(u.source)||r.set(u.source,[]),r.get(u.source).push(u.target));i.set("engine",{x:0,y:0,z:.1});let o=t.length,c=Math.max(8.5,Math.sqrt(o)*3.5);t.forEach((u,p)=>{let g=Math.PI-p/Math.max(1,o)*Math.PI*2,b=1+.06*Math.sin(p*2.1);i.set("step:"+u.id,{x:o===1?-6:Math.cos(g)*c*1.4*b,y:o===1?0:Math.sin(g)*c*.82*b,z:.12,angle:g})});function l(u,p=new Set){if(p.has(u))return;p.add(u);let g=i.get(u);if(!g)return;let b=(r.get(u)||[]).filter(m=>!i.has(m));for(let m of b){let h=s.get(m),S=s.get(u)?.kind==="step",w=a.get(u)||0;a.set(u,w+1);let y=g.angle??Math.atan2(g.y,g.x),P=w%4,A=Math.floor(w/4),x=y+(P-1.5)*.48,M=S?4.2+A*3.2:3.3+A*2.5;i.set(m,{x:g.x+Math.cos(x)*M,y:g.y+Math.sin(x)*M,z:h.origin==="activity"?.32:.18,angle:x})}for(let m of b)l(m,p)}for(let u of t)l("step:"+u.id);l("engine");for(let u of n)i.has(u.id)||i.set(u.id,{x:0,y:-5,z:.15});let d=u=>u.kind==="step"||u.kind==="engine";for(let u=0;u<65;u++){let p=0;for(let g=0;g<n.length;g++)for(let b=g+1;b<n.length;b++){let m=n[g],h=n[b];if(d(m)&&d(h))continue;let S=i.get(m.id),w=i.get(h.id),y=Gn(m),P=Gn(h),A=w.x-S.x,x=w.y-S.y,M=(y.w+P.w)/2+.3-Math.abs(A),z=(y.h+P.h)/2+.25-Math.abs(x);if(M<=0||z<=0)continue;let R=M<z,N=R?"x":"y",B=(R?A:x)>=0?1:-1,U=(R?M:z)*.55;d(m)||(S[N]-=U*B),d(h)||(w[N]+=U*B),p++}if(!p)break}let f={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0};for(let u of n){let p=i.get(u.id),g=Gn(u);f.minX=Math.min(f.minX,p.x-g.w/2-.8),f.maxX=Math.max(f.maxX,p.x+g.w/2+.8),f.minY=Math.min(f.minY,p.y-g.h/2-.8),f.maxY=Math.max(f.maxY,p.y+g.h/2+.8)}return{positions:i,bounds:f}}var t_={engine:16761228,step:15641205,objective:12367063,instruction:12756444,requirement:12298437,constraint:15114643,gate:15123840,skill:9882054,call:16756078,review:12951789,material:8440263,operation:11969998,result:11650742,artifact:9165240,delivery:10082746,output:12820965},nn=n=>["failed","refused","needs_revision"].includes(n.status)?15965062:n.active?16764300:t_[n.kind]||13869438;function i_(n,e){let t=new _s,i=.16;return t.moveTo(-n/2+i,-e/2),t.lineTo(n/2,-e/2),t.lineTo(n/2,e/2-i),t.lineTo(n/2-i,e/2),t.lineTo(-n/2,e/2),t.lineTo(-n/2,-e/2+i),t.closePath(),t}function vl(n){n.traverse(e=>{e.geometry?.dispose();for(let t of Array.isArray(e.material)?e.material:[e.material])t?.dispose()}),n.clear()}function _u({board:n,texture:e,host:t,onEntity:i,onPick:s,onFocusChat:r,requestFrame:a}){let o=new St,c=new St,l=new St,d=new St,f=new St;o.add(d,l,f),n.add(o,c);let u=new Map,p=null,g=[],b=null,m=null,h=0,S="",w=!1;function y(R){let N=["step","engine"].includes(R.kind),B=Gn(R),U=new St,T=i_(B.w,B.h),k=new Mt(new yr(T,{depth:N?.12:.07,bevelEnabled:!1}),new ni({color:N?2364702:1315868}));k.position.z=-.07,U.add(k);let q=new Ci(new Nn(k.geometry),new Kt({color:nn(R),transparent:!0,opacity:.65}));if(q.position.z=-.07,U.add(q),N){let pe=[];for(let re=0;re<8;re++)for(let Be of[-1,1]){let it=(re-3.5)*B.h/9;pe.push(new C(Be*(B.w/2+.03),it,0),new C(Be*(B.w/2+.23),it,0))}U.add(new Ci(new pt().setFromPoints(pe),new Kt({color:12814937,transparent:!0,opacity:.55})))}let V=new Xi(new Ai({map:e,color:nn(R),transparent:!0,opacity:.08,depthWrite:!1,blending:ai}));V.scale.set(B.w*1.3,B.h*1.6,1),V.position.z=-.12,U.add(V),d.add(U);let te=document.createElement("button");te.type="button",te.className="in-entity"+(R.kind==="step"?" ion-chip":R.kind==="engine"?" ion-engine":""),te.dataset.networkEntity=R.id,te.dataset.kind=R.kind,R.kind==="step"&&(te.dataset.sceneStep=R.stepId);let H=document.createElement("span");H.className="in-labelBody";let Q=document.createElement("span");Q.className="in-nodeHead";let G=document.createElement("span"),Se=document.createElement("span");Q.append(G,Se);let De=document.createElement("strong"),K=document.createElement("span"),ge=document.createElement("span");K.className="in-nodeDetail",ge.className="in-nodeFoot",H.append(Q,De,K,ge),te.append(H),te.addEventListener("pointerdown",pe=>pe.stopPropagation()),te.onclick=()=>{m=R.id,a(),i?i(R.id):R.stepId?s?.(R.stepId):r?.()},te.onpointerenter=()=>{b=R.id,a()},te.onpointerleave=()=>{b=null,a()},te.onfocus=()=>{b=R.id,a()},te.onblur=()=>{b=null,a()};let ye=new tn(te);return ye.scale.setScalar(.014),c.add(ye),{node:R,group:U,solid:k,edge:q,glow:V,label:ye,element:te,kind:G,status:Se,title:De,detail:K,foot:ge,born:performance.now()}}function P(R){let N=p.positions.get(R.source),B=p.positions.get(R.target),U=p.byId.get(R.source),T=p.byId.get(R.target),k=Gn(U),q=Gn(T),V=new C(B.x-N.x,B.y-N.y,0),te=Math.abs(V.x)>Math.abs(V.y),H=(te?V.x:V.y)>=0?1:-1,Q=new C(N.x+(te?H*k.w/2:0),N.y+(te?0:H*k.h/2),.015),G=new C(B.x-(te?H*q.w/2:0),B.y-(te?0:H*q.h/2),.015),Se=Q.clone().lerp(G,.5),De=te?[Q,new C(Se.x-.15*H,Q.y,.015),new C(Se.x+.15*H,G.y,.015),G]:[Q,new C(Q.x,Se.y-.15*H,.015),new C(G.x,Se.y+.15*H,.015),G],K=new Zi(De,!1,"centripetal"),ge=new Ri(new pt().setFromPoints(K.getPoints(40)),new Kt({color:R.kind==="sequence"?14259804:nn(T),transparent:!0,opacity:R.kind==="sequence"?.68:.3})),ye=new Xi(new Ai({map:e,color:nn(T),transparent:!0,depthWrite:!1,blending:ai}));ye.scale.setScalar(.85),ye.visible=!1;let pe=new mn(new pt().setAttribute("position",new rt(new Float32Array(36),3)),new Yi({color:nn(T),size:.04,transparent:!0,opacity:.8,depthWrite:!1,blending:ai}));pe.visible=!1;let re=new mn(new pt().setFromPoints([Q,K.getPoint(.5),G]),new Yi({color:nn(T),size:R.kind==="sequence"?.085:.055,transparent:!0,opacity:.7}));return l.add(ge,ye,pe,re),{edge:R,line:ge,curve:K,runner:ye,tail:pe}}function A(){vl(f);let R=p.bounds,N=1.7,B=[];for(let[U,T,k,q]of[[R.minX-N,R.minY-N,1,1],[R.maxX+N,R.minY-N,-1,1],[R.maxX+N,R.maxY+N,-1,-1],[R.minX-N,R.maxY+N,1,-1]])B.push(new C(U,T+q*1.4,-.12),new C(U,T,-.12),new C(U,T,-.12),new C(U+k*2,T,-.12));f.add(new Ci(new pt().setFromPoints(B),new Kt({color:11168070,transparent:!0,opacity:.45})));for(let U of p.nodes.filter(T=>T.kind==="step")){let T=p.positions.get(U.id),k=new pt().setFromPoints([new C(T.x-2.5,T.y-1.5,-.1),new C(T.x-2.5,T.y-1.9,-.1),new C(T.x+1.8,T.y-1.9,-.1)]);f.add(new Ri(k,new Kt({color:7819326,transparent:!0,opacity:.45})))}}function x(R){p=R,t.dataset.networkNodes=String(p.nodes.length),t.dataset.networkCalls=String(p.counts.calls);let N=new Set(p.nodes.map(U=>U.id));for(let[U,T]of u)N.has(U)||(T.element.remove(),c.remove(T.label),d.remove(T.group),vl(T.group),u.delete(U));for(let U of p.nodes){let T=u.get(U.id);T||(T=y(U),u.set(U.id,T),h=performance.now()+650),T.node=U;let k=p.positions.get(U.id);T.group.position.set(k.x,k.y,k.z),T.label.position.set(k.x,k.y,k.z+.14);let q="#"+new Ge(nn(U)).getHexString();T.element.style.setProperty("--in-node",q),T.element.dataset.status=U.status||"",T.element.dataset.active=String(U.active),T.element.dataset.viewed=String(U.viewed===!0||m===U.id),T.element.setAttribute("aria-label",(Ns[U.kind]||U.kind)+" · "+U.title+" · "+U.statusLabel),T.kind.textContent=U.kind==="step"?String(U.index+1).padStart(2,"0")+" / 研究阶段":U.kind==="engine"?"METIS / RESEARCH CORE":Ns[U.kind],T.status.textContent=U.statusLabel,T.title.textContent=U.title,T.detail.textContent=U.kind==="engine"?p.counts.stages+" 个阶段 · "+p.counts.entities+" 个网络节点":U.detail,T.foot.textContent=U.kind==="step"?"打开阶段 · 查看目标与交付":U.kind==="artifact"?U.availability==="file"?"点击预览实际文件":"已登记 · 当前文件不可预览":U.origin==="configuration"?"流程设置 · 尚非执行记录":U.kind==="engine"?p.counts.calls+" 次实际调用 · "+p.counts.artifacts+" 项交付":U.status==="refused"?"调用被拒绝 · 未执行工具正文":U.origin==="activity"?U.label||U.call?.tool||"来自实际调用记录":"来自本项目交付记录",T.edge.material.color.setHex(nn(U)),T.glow.material.color.setHex(nn(U))}let B=JSON.stringify([p.nodes.map(U=>[U.id,p.positions.get(U.id)]),p.edges.map(U=>[U.id,U.active])]);B!==S&&(S=B,vl(l),g=p.edges.map(P),A())}let M=new C;function z(R,N,B){let U=new Set([b,m,...p.nodes.filter(T=>T.viewed).map(T=>T.id)].filter(Boolean));for(let T of p.edges)(T.source===b||T.target===b)&&(U.add(T.source),U.add(T.target));t.dataset.networkLod=B.position.distanceTo(new C)>40?"map":"detail";for(let T of u.values()){let k=T.node,q=U.has(k.id);T.element.dataset.related=String(q),T.edge.material.opacity=k.active?.95:q?.9:.45,T.glow.material.opacity=k.active?N?.35:.23+Math.sin(R*3)*.08:q?.16:.035}for(let T=0;T<g.length;T++){let k=g[T],q=k.edge.active,V=U.has(k.edge.source)&&U.has(k.edge.target);if(k.line.material.opacity=q?.95:V?.9:k.edge.kind==="sequence"?.8:.42,k.runner.visible=q,k.tail.visible=q&&!N,q){let te=N?.5:(R*.3+T*.113)%1;k.runner.position.copy(k.curve.getPoint(te));let H=k.tail.geometry.attributes.position;for(let Q=0;Q<12;Q++)k.curve.getPoint(Math.max(0,te-Q*.012),M),H.setXYZ(Q,M.x,M.y,M.z);H.needsUpdate=!0}}return!N&&(p.nodes.some(T=>T.active)||performance.now()<h)}return{update:x,render:z,bounds:()=>p?.bounds,position:R=>p?.positions.get(u.has(R)?R:"step:"+R),has:R=>u.has(R)||u.has("step:"+R),focus:R=>{m=u.has(R)?R:"step:"+R,a()},dispose(){if(!w){w=!0;for(let R of u.values())R.element.remove();vl(o),c.clear(),n.remove(o,c),u.clear(),g=[]}}}}var n_={submitted:8838585,working:16750169,checking:13873663,needs_revision:16764018,needs_recheck:16764018,blocked:16093826,passed:11002045,not_started:9987929,configured:11762782,incomplete:16761980},Yc=n=>n.active?16757613:n.viewed?16759942:n_[n.status]||9987929;function s_(){let n=document.createElement("canvas");n.width=n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);for(let[i,s]of[[0,"#fffce8"],[.08,"#ffd3a9"],[.23,"#ff965bb8"],[.5,"#ff58222b"],[1,"#ff451000"]])t.addColorStop(i,s);return e.fillStyle=t,e.fillRect(0,0,128,128),new cr(n)}function bu(n,e){n.traverse(t=>{t.geometry?.dispose();for(let i of Array.isArray(t.material)?t.material:[t.material])i&&!e.has(i)&&i.dispose()})}function r_(n){return()=>(n=1664525*n+1013904223>>>0,n/4294967296)}function qc({host:n,compactHud:e=!1,onPick:t,onEntity:i,onFocusChat:s,onState:r,onError:a,onReorder:o,onBindSkill:c,onToggleLoop:l,onAddAfter:d,onOpenArtifact:f,onSkillInspect:u}){let p=new cl({alpha:!1,antialias:!0,powerPreference:"high-performance"});p.setClearColor(526093),p.outputColorSpace=Yt,p.toneMapping=Bn,p.toneMappingExposure=1.06,p.domElement.className="ion-gl",p.domElement.setAttribute("aria-hidden","true"),n.appendChild(p.domElement);let g=new fl;g.domElement.className="ion-labels",n.appendChild(g.domElement);let b=new sr;b.background=new Ge(526093),b.fog=new nr(526093,.015);let m=new Vt(35,1,.1,130),h=new pl(m,n);h.enableDamping=!0,h.dampingFactor=.085,h.minDistance=6,h.maxDistance=55,h.maxPolarAngle=Math.PI*.66,h.minPolarAngle=Math.PI*.27,h.maxAzimuthAngle=.8,h.minAzimuthAngle=-.8;let S=new xl(p);S.addPass(new _l(b,m));let w=new Ds(new de(800,580),.9,.7,.72),y=new bl;S.addPass(w),S.addPass(y),b.add(new Tr(14262418,591634,.65));let P=new Pr(16758923,.8);P.position.set(-9,8,12),b.add(P);let A=new Cr(16734510,12,25);A.position.set(-5,-1,5),b.add(A);let x=new St;x.rotation.set(-.025,.035,-.065),b.add(x);let M=new Fn({color:1117462,metalness:.15,roughness:.95}),z=new Fn({color:1774106,metalness:.3,roughness:.65}),R=new Fn({color:9128499,metalness:.5,roughness:.6}),N=new Set([M,z,R]),B=new Mt(new xi(45,34,.35),M);B.position.z=-.38,x.add(B);let U=[];for(let L=-22;L<=22;L+=.7)U.push(L,-17,-.18,L,17,-.18);for(let L=-17;L<=17;L+=.7)U.push(-22,L,-.18,22,L,-.18);x.add(new Ci(new pt().setAttribute("position",new rt(U,3)),new Kt({color:4534332,transparent:!0,opacity:.22})));let T=new St;x.add(T);let k=r_(710322);for(let L=0;L<160;L++){let I=(k()-.5)*39,J=(k()-.5)*29,Z=k()>.5?1:-1,j=k()>.5?1:-1,ce=.6+k()*2,me=[new C(I,J,-.13),new C(I+ce*.55*Z,J,-.13),new C(I+ce*Z,J+ce*.45*j,-.13),new C(I+ce*1.5*Z,J+ce*.45*j,-.13)];T.add(new Ri(new pt().setFromPoints(me),new Kt({color:L%5===0?10375222:5713978,transparent:!0,opacity:L%5===0?.48:.4})));let oe=new Mt(new Mr(.038,.065,8),new ni({color:L%5===0?12546887:7422260}));oe.position.copy(me.at(-1)),T.add(oe)}let q=new St,V=new St,te=new St,H=new St;x.add(q,V,te,H);let Q=s_(),G=new Map,Se=document.createElement("button");Se.type="button",Se.className="ion-engine",Se.setAttribute("aria-label","进入研究助手");let De=document.createElement("strong"),K=document.createElement("span");De.textContent="METIS",K.textContent="RESEARCH ENGINE",Se.append(De,K),Se.addEventListener("pointerdown",L=>L.stopPropagation()),Se.onclick=()=>s?.();let ge=new tn(Se);ge.scale.setScalar(.014),H.add(ge);let ye=800,pe=580,re={nodes:[],activeCalls:[]},Be="",it="",Ne=0,Je=0,Xe=0,le=!1,xe=!0,_e=!1,Ce=!1,he=null,Me=null,Te=!0,Ke=null,$e=!1,Ye=null,F=matchMedia("(prefers-reduced-motion: reduce)").matches,ft=new C;function He(L){let I=Math.min(L||1,ye>=1450&&L>9?4:ye>=760?3:2);return{columns:I,rows:Math.ceil(L/I),gapX:5.25,gapY:3.35}}function ot(L){let{columns:I,rows:J,gapX:Z,gapY:j}=He(L);return Array.from({length:L},(ce,me)=>{let oe=Math.floor(me/I),ue=oe%2?I-1-me%I:me%I;return new C((ue-(I-1)/2)*Z,(J-1)*j/2-oe*j-.9,0)})}function be(L){let I=document.createElement("button");I.type="button",I.className="ion-chip",I.dataset.sceneStep=L;let J=document.createElement("div");J.className="ion-chip-head";let Z=document.createElement("span");Z.className="ion-chip-index";let j=document.createElement("span");j.className="ion-chip-state",J.append(Z,j);let ce=document.createElement("strong");ce.className="ion-chip-title";let me=document.createElement("span");me.className="ion-chip-purpose";let oe=document.createElement("span");return oe.className="ion-chip-foot",I.append(J,ce,me,oe),I.addEventListener("pointerdown",ue=>ue.stopPropagation()),I.onclick=()=>{Te=!1,r?.({follow:Te}),ae(L),t?.(L)},I.addEventListener("dragstart",ue=>{if(!re.editable){ue.preventDefault();return}ue.dataTransfer.setData("application/x-metis-step",L),ue.dataTransfer.effectAllowed="move",I.dataset.dragging="true"}),I.addEventListener("dragend",()=>{delete I.dataset.dragging;for(let ue of G.values())delete ue.card.element.dataset.drop}),I.addEventListener("dragover",ue=>{!re.editable||![...ue.dataTransfer.types].some(Ue=>Ue==="application/x-metis-step"||Ue==="application/x-metis-skill")||(ue.preventDefault(),ue.stopPropagation(),I.dataset.drop=[...ue.dataTransfer.types].includes("application/x-metis-skill")?"skill":ue.clientY<I.getBoundingClientRect().y+I.getBoundingClientRect().height/2?"before":"after",ue.dataTransfer.dropEffect=I.dataset.drop==="skill"?"copy":"move")}),I.addEventListener("dragleave",ue=>{I.contains(ue.relatedTarget)||delete I.dataset.drop}),I.addEventListener("drop",ue=>{if(!re.editable)return;let Ue=ue.dataTransfer.getData("application/x-metis-skill"),ve=ue.dataTransfer.getData("application/x-metis-step"),qe=I.dataset.drop||"before";delete I.dataset.drop,!(!Ue&&!ve)&&(ue.preventDefault(),ue.stopPropagation(),Ue?c?.(L,Ue):ve!==L&&o?.(ve,L,qe))}),I.addEventListener("keydown",ue=>{if(!re.editable||!ue.altKey||!["ArrowUp","ArrowDown"].includes(ue.key))return;let Ue=re.nodes.findIndex(qe=>qe.id===L),ve=re.nodes[Ue+(ue.key==="ArrowUp"?-1:1)];ve&&(ue.preventDefault(),ue.stopPropagation(),o?.(L,ve.id,ue.key==="ArrowUp"?"before":"after"))}),{element:I,index:Z,state:j,title:ce,purpose:me,foot:oe}}function ut(L){let I=document.createElement("div");I.className="ion-nodePorts",I.setAttribute("role","group"),I.setAttribute("aria-label","步骤技能、循环与交付"),I.addEventListener("pointerdown",ce=>ce.stopPropagation());let J=new tn(I);J.scale.setScalar(.014),H.add(J);let Z=document.createElement("button");Z.type="button",Z.className="ion-nodeInsert",Z.textContent="+",Z.setAttribute("aria-label","在此步骤后新增步骤"),Z.addEventListener("pointerdown",ce=>ce.stopPropagation()),Z.onclick=()=>d?.(L);let j=new tn(Z);return j.scale.setScalar(.014),H.add(j),{element:I,label:J,add:Z,action:j}}function ee(L){let I=L.node,J=I.skills||[],Z=I.artifacts||[],j=JSON.stringify([I.loop,J.map(me=>[me.id,me.name]),Z.map(me=>[me.index,me.name,me.availability]),I.output?.format,re.editable]);if(L.card.element.draggable=!!re.editable,L.card.element.setAttribute("aria-keyshortcuts",re.editable?"Alt+ArrowUp Alt+ArrowDown":""),L.ports.action.visible=!!re.editable&&I.viewed,L.loopTrace.visible=I.loop===!0,L.portSignature===j)return;L.portSignature=j,L.ports.element.replaceChildren();let ce=(me,oe,ue,Ue,ve=!1)=>{let qe=document.createElement("button");return qe.type="button",qe.className="ion-port ion-port-"+oe,qe.textContent=me,qe.title=ue,qe.disabled=ve,qe.onclick=mt=>{mt.stopPropagation(),Ue?.()},L.ports.element.appendChild(qe),qe};(I.loop||re.kind==="mode")&&ce(I.loop?"↻ 达标循环":"↻ 循环","loop",I.loopCriteria||"未达标时继续本步；点此设置",()=>re.editable?l?.(I.id):t?.(I.id),re.kind==="mode"&&!re.editable);for(let me of J.slice(0,2)){let oe=ce(me.name,"skill",me.name+" · "+me.id,()=>u?.(I.id,me.id));oe.dataset.skillId=me.id}J.length>2&&ce("+"+(J.length-2)+" 技能","skill","查看本步全部技能",()=>t?.(I.id));for(let me of Z.slice(0,2)){let oe=ce(me.name,"artifact",me.path,()=>f?.(I.id,me.index,me),me.availability!=="file");oe.dataset.artifactIndex=String(me.index)}Z.length>2&&ce("+"+(Z.length-2)+" 交付","artifact","查看本步全部交付物",()=>t?.(I.id)),I.output?.format&&I.output.format!=="auto"&&ce(I.output.format.toUpperCase(),"output","最终输出目标，点此编辑",()=>t?.(I.id))}function Pe(L,I){let J=I.x-L.x,Z=J>=0?1:-1,j=Math.abs(I.y-L.y)<.5,ce=L.clone().add(new C(j?Z*2.35:0,j?0:-1.25,.03)),me=I.clone().add(new C(j?-Z*2.35:0,j?0:1.25,.03)),oe=j?[ce,ce.clone().add(new C(Z*.18,0,0)),ce.clone().add(new C(Z*.27,-.25,0)),me.clone().add(new C(-Z*.27,-.25,0)),me.clone().add(new C(-Z*.18,0,0)),me]:[ce,ce.clone().add(new C(.45,-.17,0)),me.clone().add(new C(.45,.17,0)),me];return new Zi(oe,!1,"centripetal")}function E(){for(let J of G.values())J.card.element.remove(),J.ports.element.remove(),J.ports.add.remove(),H.remove(J.label,J.ports.label,J.ports.action);G.clear();for(let J of[q,V,te])bu(J,N),J.clear();let L=ot(re.nodes.length),I=He(re.nodes.length);ge.position.set(-.8,(I.rows-1)*I.gapY/2+1.8,.12);for(let J=0;J<=I.columns;J++){let Z=(J-I.columns/2)*I.gapX;for(let j of[-.07,0,.07]){let ce=new pt().setFromPoints([new C(Z+j,-18,-.08),new C(Z+j,18,-.08)]);te.add(new Ri(ce,new Kt({color:j?8733743:13396287,transparent:!0,opacity:j?.3:.46})))}for(let j=-12;j<=12;j+=1.1){let ce=new Mt(new xi(.11,.022,.025),R);ce.position.set(Z,j,-.05),te.add(ce)}}re.nodes.forEach((J,Z)=>{let j=L[Z],ce=new St;ce.position.copy(j),q.add(ce);let me=new Mt(new xi(4.65,2.42,.19),z);ce.add(me);let oe=new Ci(new Nn(me.geometry),new Kt({color:Yc(J),transparent:!0,opacity:.6}));ce.add(oe);for(let rn=0;rn<10;rn++)for(let Qr of[-1,1]){let Tn=new Mt(new xi(.17,.035,.055),R);Tn.position.set(Qr*2.42,-.94+rn*.21,-.015),ce.add(Tn)}let ue=be(J.id),Ue=new tn(ue.element);Ue.position.copy(j).add(new C(0,0,.13)),Ue.scale.setScalar(.014),H.add(Ue);let ve=ut(J.id);ve.label.position.copy(j).add(new C(0,-1.46,.14)),ve.action.position.copy(j).add(new C(2.64,.15,.14));let qe=new Zi([new C(2.15,-.8,.01),new C(2.65,-.8,.01),new C(2.65,1.28,.01),new C(1.8,1.28,.01),new C(1.8,1.15,.01)].map(rn=>rn.add(j))),mt=new Mt(new vs(qe,40,.018,5,!1),new ni({color:15709293,transparent:!0,opacity:.65}));V.add(mt);let Ot=new Xi(new Ai({map:Q,color:Yc(J),transparent:!0,opacity:.13,depthWrite:!1,blending:ai}));Ot.scale.set(5.6,3.2,1),Ot.position.z=-.08,ce.add(Ot);let wn=Z?L[Z-1]:ge.position,sn=Pe(wn,j),yi=new Mt(new vs(sn,48,.022,6,!1),new ni({color:12740674,transparent:!0,opacity:.5}));V.add(yi);let Ui=new St,Xn=new Mt(new wr(.09,12,8),new ni({color:16775625})),Si=new Xi(new Ai({map:Q,color:16757092,transparent:!0,depthWrite:!1,blending:ai}));Si.scale.setScalar(1.35),Ui.add(Xn,Si),Ui.visible=!1,V.add(Ui);let En=new mn(new pt().setAttribute("position",new rt(new Float32Array(48),3)),new Yi({color:16757354,size:.045,transparent:!0,opacity:.9,depthWrite:!1,blending:ai}));En.visible=!1,V.add(En),G.set(J.id,{node:J,index:Z,position:j,group:ce,edge:oe,card:ue,label:Ue,ports:ve,loopTrace:mt,glow:Ot,curve:sn,trace:yi,runner:Ui,tail:En,portSignature:null})}),_(),ne(!1)}function _(){for(let L of G.values()){let I=L.node,J=Yc(I),Z=L.card;Z.element.dataset.active=String(I.active),Z.element.dataset.viewed=String(I.viewed),Z.element.dataset.status=I.status,Z.element.style.setProperty("--ion-node","#"+new Ge(J).getHexString()),Z.element.setAttribute("aria-label","第"+(I.index+1)+"步 "+I.title+" · "+I.label),Z.index.textContent=String(I.index+1).padStart(2,"0"),Z.state.textContent=I.active?"执行中":I.label,Z.title.textContent=I.title,Z.purpose.textContent=I.purpose||I.expected||"选择查看本步目标与交付",Z.foot.textContent=I.recentCall?I.recentCall.label+(I.recentCall.target?" · "+I.recentCall.target:""):re.kind==="mode"?(I.skills?.length||0)+" 项技能 · 点击编辑 / 拖动排序":I.loop?"达标后交付":"等待实际执行",L.edge.material.color.setHex(J),L.trace.material.color.setHex(I.active?16758116:I.status==="submitted"?8838585:11951164),L.trace.material.opacity=I.active?1:I.status==="submitted"?.8:.44,L.glow.material.color.setHex(J),ee(L)}}function W(L,I,J=800){F&&(J=0),J?Me={start:performance.now(),duration:J,from:m.position.clone(),targetFrom:h.target.clone(),position:L,target:I}:(Me=null,m.position.copy(L),h.target.copy(I),h.update()),fe()}function ne(L=!0){if(Ye){let ve=Ye.bounds();if(!ve)return;let qe=new Ti;x.updateMatrixWorld(!0);for(let Ui of[ve.minX,ve.maxX])for(let Xn of[ve.minY,ve.maxY])qe.expandByPoint(x.localToWorld(new C(Ui,Xn,.2)));let mt=qe.getSize(new C),Ot=qe.getCenter(new C),wn=Math.tan(Cs.degToRad(17.5)),sn=Math.max(.5,(pe-(e?170:220))/pe),yi=Math.max(15,mt.x/(2*wn*m.aspect*.87),mt.y/(2*wn*sn));h.maxDistance=Math.max(80,yi*1.6),m.far=Math.max(180,yi*3),m.updateProjectionMatrix(),he=null,B.scale.set(Math.max(1,(mt.x+16)/45),Math.max(1,(mt.y+16)/34),1),W(Ot.clone().add(new C(-yi*.055,yi*.06,yi)),Ot,L?850:0);return}let{columns:I,rows:J,gapX:Z,gapY:j}=He(re.nodes.length),ce=(I-1)*Z+6.6,me=(J-1)*j+2.65,oe=Math.tan(Cs.degToRad(17.5)),ue=Math.max(12,ce/(2*oe*Math.max(.5,ye/pe)*.92),me/(2*oe*Math.max(.45,(pe-(e?155:220))/pe)));h.maxDistance=Math.max(55,ue*1.25);let Ue=x.localToWorld(new C(0,-.9+ue*2*oe*23/pe,0));he=null,W(Ue.clone().add(new C(-ue*.17,ue*.12,ue)),Ue,L?850:0)}function ae(L){if(Ye){let Z=Ye.position(L);if(!Z)return;he=L,Ye.focus(L);let j=x.localToWorld(new C(Z.x,Z.y,Z.z));W(j.clone().add(new C(-.8,.6,12)),j);return}let I=G.get(L);if(!I)return;he=L;let J=x.localToWorld(I.position.clone());W(J.clone().add(new C(-1.7,1.1,10.5)),J)}function fe(){!_e&&!Ce&&!le&&xe&&!document.hidden&&!Ne&&(Ne=requestAnimationFrame(Ee))}function Ee(L){if(Ne=0,_e||Ce||!xe||document.hidden)return;if(L-Je<32){Ne=requestAnimationFrame(Ee);return}let I=Math.min(.06,(L-Je)/1e3);Je=L,F||(Xe+=I),le=!0;let J=!1;if(Me){let ce=Math.min(1,(L-Me.start)/Me.duration),me=1-Math.pow(1-ce,3);m.position.lerpVectors(Me.from,Me.position,me),h.target.lerpVectors(Me.targetFrom,Me.target,me),ce===1&&(Me=null),J=!0}let Z=h.update(),j=Ye?.render(Xe,F,m);for(let ce of G.values()){let me=ce.node.active,oe=F?.5:(Xe*.48+ce.index*.13)%1;if(ce.runner.visible=me,ce.tail.visible=me&&!F,ce.glow.material.opacity=me?F?.5:.43+Math.sin(Xe*3)*.09:ce.node.viewed?.22:.055,me){ce.runner.position.copy(ce.curve.getPoint(oe));let ue=ce.tail.geometry.attributes.position;for(let Ue=0;Ue<16;Ue++)ce.curve.getPoint(Math.max(0,oe-Ue*.014),ft),ue.setXYZ(Ue,ft.x,ft.y,ft.z);ue.needsUpdate=!0}}S.render(),g.render(b,m),n.dataset.frames=String(Number(n.dataset.frames||0)+1),le=!1,(J||$e||Z||j||!F&&re.nodes.some(ce=>ce.active))&&fe()}h.addEventListener("start",()=>{$e=!0,Te=!1,r?.({follow:Te}),fe()}),h.addEventListener("end",()=>{$e=!1,fe()}),h.addEventListener("change",fe);let ie=matchMedia("(prefers-reduced-motion: reduce)"),se=()=>{F=ie.matches,fe()};ie.addEventListener("change",se);let we=()=>{document.hidden?(cancelAnimationFrame(Ne),Ne=0):fe()};document.addEventListener("visibilitychange",we);let D=L=>{L.preventDefault(),Ce=!0,cancelAnimationFrame(Ne),Ne=0,a?.("三维图形上下文已中断，可重新初始化场景。")};return p.domElement.addEventListener("webglcontextlost",D),r?.({renderer:"three-webgl2",follow:Te}),{update(L){let I=JSON.stringify(L);if(I===Be)return;if(Be=I,re=L,re.kind==="project"){let j=!Ye;ge.visible=!1,j&&(Ye=_u({board:x,texture:Q,host:n,requestFrame:fe,onPick:t,onFocusChat:s,onEntity:oe=>{if(Te=!1,r?.({follow:Te}),ae(oe),i)i(oe);else{let ue=(re.network||Wn(re)).byId.get(oe);ue?.stepId&&t?.(ue.stepId)}}})),Ye.update(re.network||Wn(re)),j&&ne(!1);let ce=re.activeCalls.at(-1),me=ce?"call:"+ce.callId:["running","processing"].includes(re.phase)?re.currentStepId:null;Te&&me&&me!==Ke&&(ae(me),Ke=me),fe();return}Se.dataset.busy=String(L.phase==="processing"||L.phase==="running");let J=re.nodes.map(j=>j.id).join("|");it!==J&&(it=J,E());for(let j of re.nodes)G.has(j.id)&&(G.get(j.id).node=j);_();let Z=re.activeCalls.at(-1)?.stepId;Te&&Z&&Z!==Ke&&(ae(Z),Ke=Z),fe()},resize(L,I){let J=He(re.nodes.length).columns;ye=Math.max(1,L),pe=Math.max(1,I);let Z=Math.min(devicePixelRatio||1,1.35,Math.sqrt(18e5/(ye*pe)));p.setPixelRatio(Z),p.setSize(ye,pe,!1),S.setPixelRatio(Z),S.setSize(ye,pe),g.setSize(ye,pe),m.aspect=ye/pe,m.updateProjectionMatrix(),Ye?he||ne(!1):J!==He(re.nodes.length).columns&&re.nodes.length?E():he||ne(!1),fe()},visible(L){xe=L,xe?fe():(cancelAnimationFrame(Ne),Ne=0)},home(){Te=!1,r?.({follow:Te}),ne()},follow(L=!0){if(Te=L,r?.({follow:Te}),Te){let I=re.activeCalls.at(-1)?.stepId;I?ae(I):ne()}},focus(L){Te=!1,r?.({follow:Te}),ae(L)},captureView(){return{position:m.position.toArray(),target:h.target.toArray(),follow:Te,selected:he}},restoreView(L){!L||![L.position,L.target].every(I=>Array.isArray(I)&&I.length===3&&I.every(Number.isFinite))||(Te=!!L.follow,he=Ye?.has(L.selected)||G.has(L.selected)?L.selected:null,W(new C(...L.position),new C(...L.target),0),r?.({follow:Te}))},dispose(){if(!_e){_e=!0,cancelAnimationFrame(Ne),ie.removeEventListener("change",se),document.removeEventListener("visibilitychange",we),p.domElement.removeEventListener("webglcontextlost",D),h.dispose(),Ye?.dispose();for(let L of G.values())L.card.element.remove(),L.ports.element.remove(),L.ports.add.remove();Se.remove(),bu(b,N);for(let L of N)L.dispose();Q.dispose(),w.dispose(),y.dispose(),S.dispose(),p.dispose(),p.forceContextLoss(),p.domElement.remove(),g.domElement.remove(),G.clear()}}}}function vu(n,e,t=[],i=null,{dirty:s=!1,busy:r=!1}={}){let a=new Map(t.map(d=>[d.id,d])),o=e?.steps||[],c=e?.output||{format:"auto",wordFormatting:""},l=o.map((d,f)=>{let u=(d.skills||[]).map(g=>({id:g,name:a.get(g)?.name||g})),p=!d.title?.trim()||!d.instruction?.trim();return{id:d.id,title:d.title||"新步骤",index:f,purpose:d.instruction||"",expected:d.deliverables||"",status:p?"incomplete":"configured",label:p?"待完善":"已配置",active:!1,viewed:d.id===i,loop:d.loop?.enabled===!0,loopCriteria:d.loop?.criteria||"",skills:u,artifacts:[],delivery:null,feedback:[],recentCall:null,output:f===o.length-1?c:null}});return{key:"mode:"+n.id,id:n.id,kind:"mode",editable:!r,name:n.name,modeName:n.name,phase:r?"saving":s?"draft":"configured",headline:r?"正在保存流程":s?"更改已进入共享草稿":"选择节点开始编排",target:"节点、技能和循环直接修改当前模式；保存后供新项目使用。",nodes:l,activeCalls:[],activities:[],recent:null,total:l.length,bindingCount:l.reduce((d,f)=>d+f.skills.length,0),loopCount:l.filter(d=>d.loop).length,attention:l.filter(d=>d.status==="incomplete").length,delivered:null,files:null}}function yu(n,e=null){let t=Fs(n,e),i={...t,key:"project:"+n.id,kind:"project",editable:!1,currentStepId:n.currentStepId,nodes:t.nodes.map(s=>{let r=n.steps.find(a=>a.id===s.id);return{...s,skills:Array.isArray(r.skillBindings)?r.skillBindings:null,executionBrief:r.executionBrief||null,prohibitions:r.prohibitions||"",loopCriteria:r.loopCriteria||"",artifacts:(s.delivery?.artifacts||[]).map((a,o)=>({...a,index:o,stepId:s.id})),output:s.index===t.nodes.length-1&&n.output||null}})};return i.network=Wn(i),i}function Su(n,e,t,i="before"){if(e===t)return n;let s=n.find(c=>c.id===e),r=n.find(c=>c.id===t);if(!s||!r)throw new Error("拖动的步骤不属于当前流程");let a=n.filter(c=>c.id!==e),o=a.findIndex(c=>c.id===t)+(i==="after"?1:0);return a.splice(o,0,s),a}function Mu(n,{Icon:e,createIonWorld:t,workbenchCss:i=""}){let s=n.createElement,r=new Map;function a({model:o,header:c,assistant:l,inspector:d,palette:f,paletteOpen:u,paletteTitle:p="技能库",onClosePalette:g,onSelect:b,onReorder:m,onBindSkill:h,onToggleLoop:S,onAddAfter:w,onAdd:y,onOpenArtifact:P,onSkillInspect:A,onFocusChat:x,overlay:M,notice:z,empty:R,children:N,primaryAction:B}){let U=n.useRef(null),T=n.useRef(null),k=n.useRef(null),q=n.useRef(null),V=n.useRef(null),[te,H]=n.useState(null),[Q,G]=n.useState(0),[Se,De]=n.useState("loading"),[K,ge]=n.useState(!1),[ye,pe]=n.useState(!1),[re,Be]=n.useState(()=>{try{return Math.max(300,Math.min(620,Number(localStorage.getItem("metis.circuit.chat-width"))||360))}catch{return 360}}),[it,Ne]=n.useState("all"),[Je,Xe]=n.useState(null),le=n.useMemo(()=>o?.kind==="project"&&it!=="all"?{...o,network:Wn(o,{scope:it})}:o,[o,it]),xe=n.useRef(null),_e=o?.key||"empty",Ce=o?.nodes.find(ee=>ee.viewed),he=le?.network,Me=he?.byId.get(Je);k.current={model:le,onSelect:b,onReorder:m,onBindSkill:h,onToggleLoop:S,onAddAfter:w,onOpenArtifact:P,onSkillInspect:A,onFocusChat:x};function Te(ee){V.current=U.current?.querySelector('[data-scene-step="'+CSS.escape(ee)+'"]'),k.current.onSelect?.(ee),pe(!0)}function Ke(){pe(!1),requestAnimationFrame(()=>{V.current?.isConnected&&V.current.focus({preventScroll:!0})})}function $e(ee){let Pe=k.current.model?.network?.byId.get(ee);if(Pe){if(V.current=U.current?.querySelector('[data-network-entity="'+CSS.escape(ee)+'"]'),Pe.kind==="step"){Xe(null),k.current.onSelect?.(Pe.stepId),pe(!0);return}if(k.current.onSelect?.(Pe.stepId),Pe.kind==="artifact"&&Pe.availability==="file"){k.current.onOpenArtifact?.(Pe.stepId,Pe.fileIndex,Pe.file);return}Xe(ee),pe(!0)}}n.useLayoutEffect(()=>{if(!U.current)return;let ee=U.current,Pe,E,_=!0;H(null),De("loading"),pe(!1),Xe(null);try{Pe=t({host:ee,compactHud:!0,onPick:Te,onEntity:$e,onFocusChat:()=>k.current.onFocusChat?.(),onState:ne=>{_&&(ne.renderer&&De(ne.renderer),typeof ne.follow=="boolean"&&ge(ne.follow))},onError:ne=>_&&H(ne),onReorder:(...ne)=>k.current.onReorder?.(...ne),onBindSkill:(...ne)=>k.current.onBindSkill?.(...ne),onToggleLoop:(...ne)=>{k.current.onToggleLoop?.(...ne),Te(ne[0])},onAddAfter:ne=>{k.current.onAddAfter?.(ne),pe(!0)},onOpenArtifact:(...ne)=>k.current.onOpenArtifact?.(...ne),onSkillInspect:(ne,ae)=>{Te(ne),k.current.onSkillInspect?.(ne,ae)}}),T.current=Pe,Pe.update(k.current.model||{nodes:[],activeCalls:[]});let W=()=>{let ne=ee.getBoundingClientRect();ne.width&&ne.height&&Pe.resize(ne.width,ne.height)};E=new ResizeObserver(W),E.observe(ee),W(),r.has(_e)?Pe.restoreView(r.get(_e)):Pe.home()}catch(W){H(W.message),De("error")}return()=>{_=!1,Pe&&(r.set(_e,Pe.captureView()),r.size>30&&r.delete(r.keys().next().value)),E?.disconnect(),Pe?.dispose(),ee.replaceChildren(),T.current=null}},[_e,Q]),n.useLayoutEffect(()=>{T.current?.update(le||{nodes:[],activeCalls:[]})},[le]),n.useEffect(()=>{T.current?.visible(!M)},[!!M]),n.useEffect(()=>{try{localStorage.setItem("metis.circuit.chat-width",String(re))}catch{}},[re]);function Ye(ee){return Math.max(300,Math.min(620,(q.current?.clientWidth||1200)-360,ee))}let F=s("div",{className:"ic-chatGrip",role:"separator",tabIndex:0,"aria-label":"调整助手宽度","aria-orientation":"vertical","aria-valuenow":re,"aria-valuemin":300,"aria-valuemax":620,onPointerDown:ee=>{ee.button||(ee.preventDefault(),xe.current={x:ee.clientX,width:re},ee.currentTarget.setPointerCapture(ee.pointerId))},onPointerMove:ee=>{xe.current&&Be(Ye(xe.current.width+xe.current.x-ee.clientX))},onPointerUp:ee=>{xe.current=null,ee.currentTarget.releasePointerCapture(ee.pointerId)},onPointerCancel:()=>{xe.current=null},onKeyDown:ee=>{["ArrowLeft","ArrowRight","Home","End"].includes(ee.key)&&(ee.preventDefault(),Be(Ye(ee.key==="Home"?300:ee.key==="End"?620:re+(ee.key==="ArrowLeft"?24:-24))))}}),ft=o?.total||0,He=o?.kind==="project",ot=o?.activities?.at(-1),be=(ee,Pe,E,_={})=>s("button",{type:"button",className:"ic-action",onClick:E,..._},s(e,{name:Pe,size:14}),s("span",null,ee)),ut=Me?s("div",{className:"in-entityDetail"},s("div",{className:"in-detailOrigin","data-origin":Me.origin},Me.origin==="configuration"?"本项目固定的流程设置":Me.origin==="activity"?"来自原生工具的实际调用记录":Me.origin==="delivery"?"来自本项目登记的交付记录":"本项目运行状态"),s("h2",null,Me.title),s("span",{className:"in-detailStatus","data-status":Me.status},Me.statusLabel),Me.stepId?s("p",{className:"in-detailOwner"},"所属阶段 · "+o.nodes.find(ee=>ee.id===Me.stepId)?.title):s("p",{className:"in-detailOwner"},"项目整体"),s("pre",{className:"in-detailText",tabIndex:0},Me.detail||"该记录未附文字详情。"),Me.characters?s("p",{className:"mc-note"},"步骤提示词共 "+Me.characters+" 字符；此处显示摘要，不预加载技能正文。"):null,Me.call?s("dl",null,s("dt",null,"工具"),s("dd",null,Me.call.tool),s("dt",null,"调用 ID"),s("dd",null,Me.callId),Me.call.startedAt?s(n.Fragment,null,s("dt",null,"开始"),s("dd",null,new Date(Me.call.startedAt).toLocaleString("zh-CN"))):null,typeof Me.call.exitCode=="number"?s(n.Fragment,null,s("dt",null,"退出码"),s("dd",null,String(Me.call.exitCode))):null):null,Me.call?.resultPreview&&Me.kind!=="result"?s(n.Fragment,null,s("h3",null,"实际回执"+(Me.call.resultTruncated?"（节选）":"")),s("pre",{tabIndex:0},Me.call.resultPreview)):null,Me.kind==="artifact"&&Me.availability!=="file"?s("p",{className:"mr-error"},"登记路径当前不可预览："+Me.availability):null,s("div",{className:"in-detailActions"},Me.stepId?be("查看所属阶段","layers",()=>{Xe(null),b?.(Me.stepId),T.current?.focus(Me.stepId)}):null,be("在助手中讨论","message",()=>x?.()))):null;return s("div",{className:"ic-workspace",ref:q,style:{"--ic-chat-width":re+"px"},"data-circuit-kind":o?.kind||"empty","data-circuit-key":_e},s("style",null,ta+i),c,s("div",{className:"ic-body"},s("main",{className:"ic-stage","aria-label":"METIS 离子回路工作空间","data-inspector":ye&&!!d,"data-palette":!!u},s("div",{className:"ic-world ion-world",ref:U,role:"group","data-graphics":Se,style:{visibility:te?"hidden":void 0},"aria-label":"可交互流程电路"}),s("div",{className:"ic-context"},s("span",{className:"ic-eyebrow"},He?"RESEARCH / 实时研究":"COMPOSER / 流程编排"),s("h1",null,o?.name||o?.modeName||"METIS"),s("div",{className:"ic-metrics"},s("span",null,s("b",null,He?o.delivered+" / "+ft:ft),He?" 步已交付":" 个步骤"),s("i",null),s("span",null,s("b",null,He?o.files:o?.bindingCount||0),He?" 个交付文件":" 项技能绑定"),o?.loopCount?s("span",null,s("b",null,o.loopCount)," 个达标循环"):null)),s("div",{className:"ic-cameraTools",role:"group","aria-label":"画布操作"},He?s("div",{className:"in-scopeTabs",role:"group","aria-label":"网络内容"},[["all","完整网络"],["execution","执行记录"]].map(([ee,Pe])=>s("button",{type:"button",key:ee,"aria-pressed":it===ee,onClick:()=>{Ne(ee),Xe(null),requestAnimationFrame(()=>T.current?.home())}},Pe))):null,be("全景","layers",()=>T.current?.home()),He?be("跟随","activity",()=>T.current?.follow(!K),{"aria-pressed":K}):be("新增步骤","plus",()=>{y?.(),pe(!0)},{disabled:!o?.editable||!y}),B),He&&he?s("section",{className:"in-navigation","aria-label":"研究网络导航"},s("header",null,s("span",null,"RESEARCH TOPOLOGY"),s("b",null,he.counts.entities+" NODES")),s("svg",{viewBox:[he.bounds.minX,-he.bounds.maxY,he.bounds.maxX-he.bounds.minX,he.bounds.maxY-he.bounds.minY].join(" "),role:"group","aria-label":"研究网络缩略图"},he.edges.map(ee=>{let Pe=he.positions.get(ee.source),E=he.positions.get(ee.target);return s("line",{key:ee.id,x1:Pe.x,y1:-Pe.y,x2:E.x,y2:-E.y,"data-active":ee.active})}),he.nodes.map(ee=>{let Pe=he.positions.get(ee.id);return s("g",{key:ee.id,role:"button",tabIndex:ee.kind==="step"?0:-1,"aria-label":"定位 "+(Ns[ee.kind]||"")+" "+ee.title,onClick:()=>{T.current?.focus(ee.id),$e(ee.id)},onKeyDown:E=>{["Enter"," "].includes(E.key)&&(E.preventDefault(),T.current?.focus(ee.id),$e(ee.id))}},s("circle",{cx:Pe.x,cy:-Pe.y,r:ee.kind==="step"?.65:ee.kind==="engine"?.75:.28,"data-kind":ee.kind,"data-active":ee.active,"data-viewed":ee.viewed}))})),s("div",{className:"in-networkCounts"},s("span",null,he.counts.stages+" 个阶段"),s("span",null,he.counts.calls+" 次实际调用"),s("span",null,he.counts.artifacts+" 项交付")),s("div",{className:"in-legend"},s("span",{"data-type":"configuration"},"流程设置"),s("span",{"data-type":"activity"},"实际调用"),s("span",{"data-type":"delivery"},"交付记录"))):null,!ft&&!te?s("div",{className:"ic-empty"},R||s(n.Fragment,null,s("h2",null,"从一个步骤开始"),s("p",null,"直接描述目标，让 AI 和您一起搭建。"),y?be("添加步骤","plus",()=>{y(),pe(!0)}):null)):null,te?s("div",{className:"ic-fallback",role:"alert"},s("strong",null,"图形视图暂不可用"),s("p",null,te),be("重新初始化","refresh",()=>G(ee=>ee+1)),s("nav",{"aria-label":"流程节点"},o?.nodes.map(ee=>s("button",{type:"button",key:ee.id,"data-scene-step":ee.id,"aria-pressed":ee.viewed,onClick:()=>Te(ee.id)},String(ee.index+1).padStart(2,"0")+" · "+ee.title)))):null,ye&&(ut||d)?s("section",{className:"ic-inspector","aria-label":ut?"网络实体详情":He?"所选步骤详情":"所选步骤编辑",onKeyDown:ee=>{ee.key==="Escape"&&!ee.defaultPrevented&&(ee.preventDefault(),Ke())}},s("div",{className:"ic-drawerHead"},s("span",null,ut?Ns[Me.kind]:He?"节点详情":"节点编辑",He&&Ce&&!ut?s("strong",null,String(Ce.index+1).padStart(2,"0")+" · "+Ce.title):null),be("收起","close",Ke)),ut||d):null,u&&f?s("section",{className:"ic-palette","aria-label":p+"面板",onKeyDown:ee=>{ee.key==="Escape"&&!ee.defaultPrevented&&(ee.preventDefault(),g?.())}},s("div",{className:"ic-drawerHead"},s("span",null,p),be("关闭"+p,"close",g)),f):null,s("footer",{className:"ic-statusRail"},s("div",{className:"ic-statusText","data-phase":o?.phase},s("i",null),s("strong",null,o?.headline||"选择模式或研究项目"),s("small",{title:ot?.target||o?.target},ot?.target||o?.target)),s("div",{className:"ic-selection"},Ce?be(String(Ce.index+1).padStart(2,"0")+" · "+Ce.title,"layers",()=>pe(ee=>!ee),{"aria-expanded":ye}):s("span",null,"点击节点操作"),s("small",null,He?"点击文件端口预览交付":"拖动节点排序 · 拖入技能绑定"))),z?s("div",{className:"ic-notice"},z):null,M?s("section",{className:"ic-documentLayer","aria-label":"交付文档工作区"},M):null),F,s("div",{className:"ic-assistant"},l)),N)}return{Canvas:a,modeModel:vu,projectModel:yu,reorder:Su}}var Zc=`/* METIS ION design system. Scoped to METIS; native DSH controls retain their behavior. */
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
.mr-layout{background:#100c14;gap:0}.mr-layout[data-rail-open=false]{--mr-rail-size:0px}.mr-layout[data-rail-open=false] .mr-projectNav{visibility:hidden;overflow:hidden;border:0;pointer-events:none}.mr-projectNav{background:linear-gradient(110deg,#191019,#100c15);border-inline-end:1px solid #63402e}.mr-navHead{border-bottom:1px solid #54313c;background:#24141e99}.mr-brand h1{font-size:12px;letter-spacing:.03em;color:#dab6a4}.mr-projectList{padding:12px 9px;gap:7px}.mr-projectList>button{border:1px solid #4b2d3c;background:#1b111c;border-radius:4px;padding:12px 10px}.mr-projectList>button:hover{border-color:#b07951;background:#35201f}.mr-projectList>button[aria-pressed=true]{border-color:#cb9265;background:linear-gradient(120deg,#59332177,#25151f);box-shadow:inset 2px 0 0 #ffc58e}.mr-projectList>button[aria-pressed=true]::before{display:none}.mr-projectList strong{font-size:12px;color:#f1d7ce}.mr-projectList small{font-size:10px;color:#c29aa8}.mr-projectList>button>svg{color:#d6a172}
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
`;function mS(n,e){return Mu(n,{...e,createIonWorld:qc,workbenchCss:Zc})}function gS(n,e){return id(n,{...e,researchSceneState:Fs,createIonWorld:qc,workbenchCss:Zc})}export{mS as createCircuitWorkspace,gS as createResearchScene,Fs as researchSceneState,td as stepStateLabels};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

// Shared merge implementation copied from metis-preset/draft-merge.js.
/** Shared browser/server three-way merge. Stable IDs and explicit human fields win. */
const draftMissing=Symbol('missing');
const draftOwn=(value,key)=>Object.prototype.hasOwnProperty.call(value,key);
const draftObject=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const draftCopy=value=>value===draftMissing?value:JSON.parse(JSON.stringify(value));
const draftPart=value=>encodeURIComponent(String(value));
function draftEqual(a,b){
  if(a===b)return true;
  if(Array.isArray(a)&&Array.isArray(b))return a.length===b.length&&a.every((value,index)=>draftEqual(value,b[index]));
  if(draftObject(a)&&draftObject(b)){const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(key=>draftOwn(b,key)&&draftEqual(a[key],b[key]));}
  return false;
}
function draftTechnical(path){return path==='/revision'||path==='/updatedAt'||/^\/profiles\/[^/]+\/(revision|updatedAt)$/.test(path)||/^\/profiles\/[^/]+\/profile\/skills(?:\/|$)/.test(path);}
function draftIdArray(arrays,path){return path.endsWith('/steps')||arrays.flat().length>0&&arrays.flat().every(value=>draftObject(value)&&typeof value.id==='string');}
function draftProtectionPaths(paths,configuration){
  const out=new Set(paths);
  for(const path of paths){
    const match=/^\/(?:profiles|modes)\/([^/]+)/.exec(path);if(!match)continue;
    const id=decodeURIComponent(match[1]);
    if(draftOwn(configuration.modes||{},id))out.add('/modes/'+match[1]+'/$exists');
    if(draftOwn(configuration.profiles||{},id))out.add('/profiles/'+match[1]+'/$exists');
    out.add('/deletedModes/#'+match[1]);
    const skill=/^\/profiles\/[^/]+\/profile\/steps\/@([^/]+)\/skills\/#([^/]+)$/.exec(path);
    if(skill){const step=configuration.profiles?.[id]?.profile.steps.find(item=>item.id===decodeURIComponent(skill[1])),skillId=decodeURIComponent(skill[2]);if(step?.skills.includes(skillId)){out.add('/deletedSkills/#'+skill[2]);if(draftOwn(configuration.skills||{},skillId))out.add('/skills/'+skill[2]+'/$exists');}}
  }
  return [...out];
}
function draftChanges(before,after){
  const changes=[];
  const walk=(a,b,path)=>{
    if(draftTechnical(path)||draftEqual(a,b))return;
    if((draftObject(a)||a===draftMissing)&&(draftObject(b)||b===draftMissing)){
      if(a===draftMissing||b===draftMissing)changes.push(path+'/$exists');
      const left=a===draftMissing?{}:a,right=b===draftMissing?{}:b;
      for(const key of new Set([...Object.keys(left),...Object.keys(right)]))walk(draftOwn(left,key)?left[key]:draftMissing,draftOwn(right,key)?right[key]:draftMissing,path+'/'+draftPart(key));
    }else if(Array.isArray(a)&&Array.isArray(b)&&draftIdArray([a,b],path)){
      const left=new Map(a.map(value=>[value.id,value])),right=new Map(b.map(value=>[value.id,value]));
      for(const id of new Set([...left.keys(),...right.keys()]))walk(left.get(id)??draftMissing,right.get(id)??draftMissing,path+'/@'+draftPart(id));
      if(!draftEqual(a.map(value=>value.id),b.map(value=>value.id)))changes.push(path+'/$order');
    }else if(Array.isArray(a)&&Array.isArray(b)&&[...a,...b].every(value=>typeof value==='string')){
      for(const id of new Set([...a,...b]))if(a.includes(id)!==b.includes(id))changes.push(path+'/#'+draftPart(id));
    }else changes.push(path);
  };walk(before,after,'');return [...new Set(changes)];
}
function mergeDraft(base,human,remote,{protectedPaths=[]}={}){
  const protectedSet=new Set(draftProtectionPaths([...protectedPaths,...draftChanges(base,human)],human)),conflicts=[];
  const exact=path=>[...protectedSet].some(key=>key===path||path.startsWith(key+'/')&&!key.endsWith('/$exists')&&!key.endsWith('/$order'));
  const protectedBelow=path=>[...protectedSet].some(key=>key.startsWith(path+'/'));
  const conflict=path=>{if(!conflicts.includes(path))conflicts.push(path);};
  const order=(baseOrder,humanOrder,remoteOrder,ids,path)=>{
    const original=new Set(baseOrder),localCommon=humanOrder.filter(id=>original.has(id)),baseCommon=baseOrder.filter(id=>humanOrder.includes(id));
    const preferHuman=protectedSet.has(path+'/$order')||!draftEqual(localCommon,baseCommon);
    const first=preferHuman?humanOrder:remoteOrder,other=preferHuman?remoteOrder:humanOrder,out=first.filter(id=>ids.has(id));
    for(let index=0;index<other.length;index++){
      const id=other[index];if(!ids.has(id)||out.includes(id))continue;
      let at=-1;for(let previous=index-1;previous>=0;previous--)if(out.includes(other[previous])){at=out.indexOf(other[previous])+1;break;}
      if(at<0){const following=other.slice(index+1).find(value=>out.includes(value));at=following?out.indexOf(following):out.length;}
      out.splice(at,0,id);
    }
    for(const id of ids)if(!out.includes(id))out.push(id);return out;
  };
  const walk=(a,b,c,path)=>{
    if(draftTechnical(path))return draftCopy(c!==draftMissing?c:b);
    if(protectedSet.has(path+'/$exists')&&(b===draftMissing)!==(c===draftMissing)){conflict(path);return draftCopy(b);}
    if(exact(path)&&!draftEqual(b,c)){conflict(path);return draftCopy(b);}
    if(draftEqual(b,c))return draftCopy(b);
    if(draftEqual(c,a))return draftCopy(b);
    if(draftEqual(b,a)&&!protectedBelow(path))return draftCopy(c);
    if(c===draftMissing){if(!draftEqual(b,a)||protectedBelow(path)){conflict(path);return draftCopy(b);}return draftMissing;}
    if(b===draftMissing){conflict(path);return draftMissing;}
    if(draftObject(b)&&draftObject(c)){
      const left=draftObject(a)?a:{},out=Object.create(null);
      for(const key of new Set([...Object.keys(left),...Object.keys(b),...Object.keys(c)])){
        const value=walk(draftOwn(left,key)?left[key]:draftMissing,draftOwn(b,key)?b[key]:draftMissing,draftOwn(c,key)?c[key]:draftMissing,path+'/'+draftPart(key));
        if(value!==draftMissing)out[key]=value;
      }return out;
    }
    if(Array.isArray(b)&&Array.isArray(c)){
      const original=Array.isArray(a)?a:[];
      if(draftIdArray([original,b,c],path)){
        const maps=[original,b,c].map(values=>new Map(values.map(value=>[value.id,value]))),items=new Map();
        for(const id of new Set(maps.flatMap(map=>[...map.keys()]))){const value=walk(...maps.map(map=>map.has(id)?map.get(id):draftMissing),path+'/@'+draftPart(id));if(value!==draftMissing)items.set(id,value);}
        return order(original.map(value=>value.id),b.map(value=>value.id),c.map(value=>value.id),new Set(items.keys()),path).map(id=>items.get(id));
      }
      if([...original,...b,...c].every(value=>typeof value==='string')){
        const ids=new Set();for(const id of new Set([...original,...b,...c]))if(walk(original.includes(id),b.includes(id),c.includes(id),path+'/#'+draftPart(id)))ids.add(id);
        return [...b,...c].filter((id,index,values)=>ids.has(id)&&values.indexOf(id)===index);
      }
    }
    conflict(path);return draftCopy(b);
  };
  return {configuration:walk(base,human,remote,''),conflicts};
}

/** Browser ESM editor. React and the real Host client are supplied by the owning plugin. */
export function createModeComposer({React,store,actions,Icon,Wordmark,drafts,assistantStore,NativeConversation,nativeSessions}){
  const h=React.createElement,copy=value=>JSON.parse(JSON.stringify(value));
  // METIS_ION_STYLE_START
  // Generated from ion-workbench.css; edit that file. SHA-256 0c47f825222ac507332f2061c63294edaad91040997ef7ecd397d8262c91fc64
  const ION_WORKBENCH_CSS="/* METIS ION design system. Scoped to METIS; native DSH controls retain their behavior. */\nbody :is(.mm-workbench,.mm-panel.mc-panel,.mm-panel.mr-panel,.mdoc){\n  --ion-void:#0b0910;--ion-panel:#151018;--ion-panel-raised:#1d141e;--ion-field:#100d15;\n  --ion-copper:#ff9f64;--ion-gold:#ffcc91;--ion-border:#48303e;--ion-hairline:#352531;\n  --ion-text:#f0e2dc;--ion-secondary:#bda4b2;--ion-dim:#a38999;--ion-success:#8ee0bd;--ion-danger:#ffac9c;\n  --mm-bg:var(--ion-void);--mm-surface:var(--ion-panel);--mm-soft:#251923;--mm-line:var(--ion-border);\n  --mm-ink:var(--ion-text);--mm-muted:var(--ion-secondary);--mm-accent:var(--ion-copper);--mm-cta-ink:#21110b;\n  --mr-paper:var(--ion-void);--mr-rail:#100d15;--mr-rule:var(--ion-hairline);--mr-accent:var(--ion-copper);\n  --mr-on-accent:#24120b;--mr-tint:#ff9f6413;\n  color:var(--ion-text);color-scheme:dark;font-family:\"Segoe UI\",\"Microsoft YaHei UI\",\"Microsoft YaHei\",sans-serif;\n}\n.mm-workbench{height:100%;min-height:0;display:flex;flex-direction:column;background:var(--ion-void);position:relative;isolation:isolate}\n.mm-workbench :is(button,input,textarea,select,summary){-webkit-app-region:no-drag}\n.mm-workbench :is(button,input,textarea,select,summary):focus-visible{outline:2px solid var(--ion-gold);outline-offset:3px}\n.mm-workbench :is(button,summary){touch-action:manipulation}\n.mm-workbench ::selection{background:#bb6a4190;color:#fff5e8}\n.mm-workbench *{scrollbar-width:thin;scrollbar-color:#815448 #110d16}\n.mm-workbench ::-webkit-scrollbar{width:7px;height:7px}.mm-workbench ::-webkit-scrollbar-track{background:#110d16}.mm-workbench ::-webkit-scrollbar-thumb{background:#634048;border:2px solid #110d16;border-radius:8px}\n.mm-panel.mc-panel,.mm-panel.mr-panel{background:var(--ion-void);overflow:hidden}\n.mc-shell,.mr-shell{position:relative;isolation:isolate;background:radial-gradient(ellipse at 6% -20%,#d16c3420,transparent 48%),radial-gradient(ellipse at 90% 100%,#6e376215,transparent 50%),var(--ion-void)}\n.mc-panel .mc-shell{min-width:0!important;padding:0!important;gap:0!important;height:100%;max-width:none;width:100%;margin:0}.mc-workspace>.mc-grid.has-assistant{border:0!important;border-radius:0!important}\n.mc-top,.mr-consoleBar,.ion-loadingBar{height:62px;min-height:62px;display:flex;align-items:center;gap:14px;padding:0 20px;border-bottom:1px solid #674338;background:linear-gradient(105deg,#24151e,#141019 55%,#100d16);position:relative;z-index:8;flex:none}\n.mc-top::after,.mr-consoleBar::after{content:'';position:absolute;left:0;bottom:-1px;width:32%;height:1px;background:linear-gradient(90deg,#ffb77c,transparent);pointer-events:none}\n.mc-brand,.mr-consoleBrand{display:flex;align-items:center;gap:9px;flex:none;color:#ffddbc}\n.mc-brand h1,.mr-consoleBrand strong{font:650 17px/1.1 \"Segoe UI\",sans-serif;letter-spacing:.16em;margin:0;color:#ffe8d5}\n.mc-logo,.mr-consoleMark{width:32px;height:32px;display:grid;place-items:center;border:1px solid #a06b4c;background:linear-gradient(145deg,#4a291e,#20131a);border-radius:5px;box-shadow:inset 0 1px 0 #ffe6c51a,0 0 20px #c77b3320;color:#ffc792}\n.mc-modeToggle{margin:0 0 0 1px;padding:5px 3px!important}.mm-switch{background:#58404b!important}.mm-theme[aria-checked=true] .mm-switch{background:#d28a54!important;box-shadow:0 0 12px #ec8d3733}.mm-switch::after{background:#f5d9c3!important}\n.mm-workspaceTabs{display:flex;align-items:center;gap:3px;padding:3px;border:1px solid #533744;border-radius:5px;background:#0d0a12;flex:none;position:relative}\n.mm-workspaceTabs [role=tab]{min-height:31px;padding:5px 14px;border:0;border-radius:3px;background:transparent;color:#c4a8b4;font:500 12px/1.4 \"Segoe UI\",\"Microsoft YaHei UI\",sans-serif;cursor:pointer;white-space:nowrap;transition:color .15s,background .15s,box-shadow .15s}\n.mm-workspaceTabs [role=tab]:hover{color:#ffe2cb;background:#412522}.mm-workspaceTabs [aria-selected=true]{color:#ffd2a6;background:linear-gradient(145deg,#603725,#35201f);box-shadow:inset 0 0 0 1px #ac714c66,0 0 15px #d2783020}\n.mm-workspaceContent{flex:1;min-height:0;overflow:hidden}.ion-loadingBar{justify-content:flex-start}.ion-loadingBar .mm-workspaceTabs{margin-left:12px}\n.mc-modeField{display:flex;align-items:center;gap:9px;flex:1;min-width:180px}.mc-modePicker{min-width:150px;max-width:340px;flex:1}.mc-modeTrigger{height:34px;border-radius:4px!important;border:1px solid #76503f!important;background:linear-gradient(110deg,#2a1920,#171018)!important;color:#f3d4c2!important;font-size:12px!important;box-shadow:inset 0 1px 0 #f6c79c08}\n.mc-modeTrigger[aria-expanded=true]{border-color:#f3a366!important;box-shadow:0 0 0 2px #ed9d5120}.mc-modeField>.mm-button{min-height:34px;padding:5px 10px}.mc-saveState{font-size:10px;display:inline-flex;align-items:center;gap:5px;white-space:nowrap;color:#b8a0ac}.mc-saveState::before{content:'';width:4px;height:4px;border-radius:50%;background:#81bd9e}.mc-saveState.is-dirty{color:#f5c08e}.mc-saveState.is-dirty::before{background:#ffb66e;box-shadow:0 0 8px #f7a24760}\n.mc-topTools{display:flex;align-items:center;gap:7px;flex:none}.mm-panel :is(.mm-button,.mc-iconButton,.mc-mini,.mr-action,.mr-start,.mr-historyToggle,.mdoc-save){border-radius:4px;font-family:inherit;transition:background-color .16s,border-color .16s,box-shadow .16s,color .16s,transform .12s}\n.mm-panel .mm-button{min-height:34px;padding:6px 12px;font-size:12px;border:1px solid #60404a;background:linear-gradient(140deg,#2b1c25,#1c141f);color:#e4c9c8;box-shadow:inset 0 1px 0 #ffe2ce08}\n.mm-panel .mm-button:hover:enabled{background:#41271f;border-color:#bc8059;color:#ffe2c6;box-shadow:0 0 18px #f49b3d13}.mm-panel .mm-button:active:enabled{transform:translateY(1px);background:#513022}\n.mm-panel .mm-button.mm-primary,.mdoc .mdoc-save:enabled{background:linear-gradient(135deg,#ffd098,#ed9b61);border-color:#ffd6a3;color:#2d170e;font-weight:650;box-shadow:inset 0 1px 0 #fff0cf88,0 0 20px #ed973928}\n.mm-panel .mm-button.mm-primary:hover:enabled,.mdoc .mdoc-save:hover:enabled{filter:brightness(1.07);box-shadow:0 0 25px #efa65340}.mm-panel button:disabled{cursor:default;opacity:.43;filter:saturate(.5);box-shadow:none}\n.mm-panel :is(.mc-iconButton,.mc-mini,.mr-iconButton){background:#241822;color:#c6a0a6;border:1px solid #533441;border-radius:4px}.mm-panel :is(.mc-iconButton,.mc-mini,.mr-iconButton):hover:enabled{background:#422620;color:#ffd0a4;border-color:#c38458}\n.mm-panel :is(.mc-moreMenu,.mc-modeMenu,.mc-modeDialog,.mr-dialog){border:1px solid #9c674d;background:linear-gradient(140deg,#2b1923,#140e18);box-shadow:0 20px 80px #0009,0 0 30px #f2943310;border-radius:7px}\n.mc-modeMenu{padding:7px;animation:ion-pop-in .16s ease-out both}.mc-modeSearch{border:1px solid #77503f!important;background:#130d15!important;color:#f0dbd3!important;border-radius:4px!important}.mc-modeRow{border-bottom:1px solid #442b37}.mc-modeRow:last-child{border-bottom:0}.mc-modeOption{color:#d5b6bb}.mc-modeOption[aria-pressed=true]{background:#e3944b18!important;color:#ffd2a5!important}.mc-modeGrip{border:0!important;background:transparent!important;cursor:grab}.mc-modeOption>svg{color:#e9a569}\n.mc-workspace{padding:0!important;min-height:0}.mc-grid{gap:0!important;background:#0e0b13;border:0!important;border-radius:0!important;overflow:hidden;isolation:isolate}\n.mc-flow,.mc-editor,.mc-assistant{border-radius:0!important;min-height:0;position:relative;box-shadow:none!important}.mc-flow{background:linear-gradient(105deg,#161019,#100d15)!important}.mc-editor{background:linear-gradient(145deg,#171019,#100d15 65%)!important}.mc-assistant{background:#110d16!important}\n.mc-columnHeader{min-height:66px;padding:12px 18px;border-bottom:1px solid #51313c;background:linear-gradient(110deg,#2b1820b3,#1a121b)}.mc-columnHeader h2{font-size:14px;line-height:1.5;font-weight:600;letter-spacing:.02em;color:#f4d7c8}.mc-columnHeader .mc-caption{color:#c68e74;font:10px/1.5 ui-monospace,\"Microsoft YaHei UI\",monospace;letter-spacing:.07em}.mc-columnHeader::before{content:'';position:absolute;top:0;left:0;width:14px;height:14px;border-top:1px solid #a76d49;border-left:1px solid #a76d49;pointer-events:none;opacity:.75}\n.mc-flowSummary{padding:10px 16px;font-size:10px;color:#b897a4;border-bottom:1px solid #3b2632;letter-spacing:.02em}.mc-stepNav{padding:13px 10px 18px;gap:5px}.mc-workflowNav{position:relative}.mc-workflowNav::before{content:'';position:absolute;left:35px;top:25px;bottom:35px;width:1px;background:linear-gradient(#d48a5580,#663e4380);pointer-events:none}\n.mc-stepRow{position:relative;border:1px solid transparent!important;border-radius:5px!important;background:transparent;transition:background .16s,border-color .16s,box-shadow .16s,transform .16s}.mc-stepRow:hover{background:#4f2c281f!important;border-color:#80513f!important}.mc-stepRow.is-current{border-color:#be815b!important;background:linear-gradient(110deg,#61362370,#2e1a22)!important;box-shadow:inset 2px 0 0 #ffc58b,0 0 22px #d98e3812}\n.mc-stepChoice{min-height:70px;padding:12px 10px!important;text-align:left!important;gap:10px!important;background:transparent!important}.mc-stepIndex{width:29px;height:29px;border-radius:4px!important;border:1px solid #7c4f40;background:#22141d!important;color:#d8a282;font:12px/1 ui-monospace,monospace;z-index:1}.is-current .mc-stepIndex{background:linear-gradient(135deg,#fac28b,#b76f45)!important;color:#28120d!important;border-color:#f7c18a!important;box-shadow:0 0 13px #df9a3540}.mc-stepLabel strong{font-size:12px!important;line-height:1.6;color:#eed6ce}.mc-stepLabel small{font-size:10px;color:#bc96a4;margin-top:3px}.mc-stepGrip{width:18px!important;min-width:18px!important;padding:2px!important;border:0!important;background:transparent!important;color:#9d737e!important;cursor:grab}\n.mc-stepRow[data-dragging=true]{opacity:.4;transform:scale(.98)}.mc-stepRow[data-drop-edge=before]::before,.mc-stepRow[data-drop-edge=after]::after{background:#ffc078!important;box-shadow:0 0 12px #ffae5b80}.mc-flowFoot{padding:13px 15px;color:#aa899a;font-size:10px;line-height:1.8;border-top:1px solid #412936;background:#120d16}\n.mc-paneDivider,.mc-split{background:#38232d!important;transition:background .15s,box-shadow .15s}.mc-paneDivider:hover,.mc-paneDivider:focus-visible,.mc-split:hover,.mc-split:focus-visible{background:#bc794c!important;box-shadow:0 0 12px #d88d4740}\n.mc-content{padding:24px clamp(20px,3vw,58px)!important;scrollbar-gutter:stable}.mc-simpleStep{width:100%;max-width:1020px;margin:0 auto;display:grid;gap:20px!important}.mc-field{margin:0!important;min-width:0;position:relative}.mc-label{font-size:12px;font-weight:550;letter-spacing:.025em;color:#d6ac95;margin-bottom:8px;line-height:1.5}.mc-fieldHeader{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:8px}.mc-fieldHeader>.mc-label{margin:0}.mc-field small,.mc-note{color:#b898a8;font-size:11px;line-height:1.8}\n.mc-panel :is(.mc-field input:not([type=checkbox]):not([type=radio]),.mc-field textarea,.mc-field select,.mc-skillSearch input,.mc-skillSearch select){box-sizing:border-box;width:100%;padding:10px 12px;border:1px solid #5a3845;border-radius:4px!important;background:#100c14!important;color:#eddbd6!important;font:13px/1.8 \"Segoe UI\",\"Microsoft YaHei UI\",sans-serif;transition:border-color .18s,box-shadow .18s,background .18s;box-shadow:inset 0 1px 5px #0003}\n.mc-panel :is(.mc-field input:not([type=checkbox]),.mc-field textarea,.mc-field select):hover{border-color:#a36a4d}.mc-panel :is(.mc-field input:not([type=checkbox]),.mc-field textarea,.mc-field select):focus{outline:none;border-color:#f2b47a!important;box-shadow:0 0 0 2px #e8914820,0 0 20px #ed8d2f12}\n.mc-field textarea{min-height:64px!important;field-sizing:content;resize:vertical!important;max-width:100%;font-size:13px!important;line-height:1.85!important}.mc-field textarea[aria-label=\"步骤提示词\"]{min-height:148px!important}.mc-field textarea[aria-label=\"禁止事项\"]{min-height:62px!important;border-inline-start:2px solid #b07173;background:#1e1119!important}.mc-field textarea::placeholder{color:#96758a;opacity:1}.mc-field[data-ion-changed=true]{animation:ion-field-change 2.6s ease-out both}.mc-loopToggle{gap:7px;font-size:10px;color:#cca58c;cursor:pointer}.mc-loopToggle strong{font-size:11px;font-weight:500}.mc-loopToggle input{accent-color:#f2ab70}.mc-loopOptions,.mc-finalOutput{padding:12px;margin-top:9px;border:1px solid #77513b;border-left:2px solid #f0b676;background:#4c2d191f;border-radius:4px}.mc-finalOutput .mc-field+.mc-field{margin-top:12px!important}\n.mc-field[data-ion-field=skills]>.mc-fieldHeader{justify-content:flex-start;gap:10px}.mc-field[data-ion-field=skills]>.mc-fieldHeader .mm-button{min-height:26px;padding:3px 8px;font-size:10px}.mc-stepFieldset{animation:ion-drawer-in .18s ease-out both}.mc-aiChangeNotice{display:flex;gap:7px;align-items:center;color:#b6e0c0;border-left:2px solid #84d9aa;background:#63844914;padding:8px 11px;margin:0 auto 15px;max-width:1020px;font-size:11px;animation:ion-pop-in .18s ease-out}\n.mc-boundSkills{gap:7px!important;margin:0!important}.mc-boundSkill{display:inline-flex;align-items:center;gap:9px;padding:7px 10px;border:1px solid #96694b;background:linear-gradient(120deg,#53332390,#2a1a23);color:#f0d5bd;border-radius:4px;font-size:11px}.mc-boundSkill::before{content:'';width:4px;height:4px;background:#ffb87a;box-shadow:0 0 8px #fa9f4a60}.mc-boundSkill .mc-mini{border:0;background:transparent;color:#bf9a9d;font-size:10px;padding:1px 3px;min-height:20px}.mc-boundSkill:hover{border-color:#f4b473}.mc-stepSkillPicker{margin-top:12px;padding:15px;border:1px solid #9f6a4c;background:linear-gradient(140deg,#2b1721,#140f19);border-radius:5px;box-shadow:0 14px 35px #0005;animation:ion-drawer-in .2s ease-out both}.mc-skillCard{border:1px solid #603d48!important;border-radius:4px!important;background:#21141e!important;padding:10px!important}.mc-skillCard:hover{border-color:#cf9169!important;background:#3d241f!important}.mc-skillCard:has(input:checked){border-color:#f6b678!important;background:#4e2e23!important}.mc-skillCard input{accent-color:#f1ae73}\n.mc-modeDefaults{border:1px solid #50323e;border-radius:4px;padding:10px 12px;background:#1b111b;margin-top:14px}.mc-modeDefaults>summary{font-size:11px;color:#c49a91;cursor:pointer}.mc-modeDefaults[open]{border-color:#986342}.mc-readonlyText{background:#0d0a12!important;color:#d2b5bf!important;font:12px/1.85 ui-monospace,\"Microsoft YaHei UI\",monospace!important}\n.mc-managementNav{background:#110d16!important}.mc-managementItem,.mc-skillEntry{border:1px solid transparent;border-radius:4px;color:#d2b7c0;transition:background .15s,border-color .15s}.mc-managementItem:hover,.mc-skillEntry:hover{background:#3b2424;border-color:#936344}.mc-managementItem[aria-pressed=true],.mc-skillEntry[aria-pressed=true]{color:#ffd2a6;background:#5f382a66;border-color:#c78a5c}.mc-searchResults{margin-top:12px}.mc-skillSearch{padding:0 0 15px;border-bottom:1px solid #50333f}.mc-skillEntry{padding:13px!important;background:#21141e!important}.mc-skillEntry strong{color:#f2d7ca}.mc-skillEntry small{color:#c49aa9}.mc-libraryIntro{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:18px;border:1px solid #815340;background:linear-gradient(110deg,#47271f66,#21121e);border-radius:5px;margin-bottom:18px}.mc-libraryIntro strong{font:350 28px/1 \"Segoe UI\",sans-serif;color:#ffd5ac}.mc-libraryIntro p{margin:6px 0 0;color:#c19daa;font-size:11px}.mc-libraryIntro .mc-caption{font-size:10px;letter-spacing:.12em;color:#d4a281}.mc-skillResource{border:1px solid #6a424c;background:#140d17;border-radius:5px;padding:16px;margin-top:18px}\n.mc-libraryEntries{max-height:none!important;overflow:visible!important;display:grid!important;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:12px!important;margin-top:18px}.mc-libraryEntries .mc-libraryEntry{display:flex!important;flex-direction:column;align-items:stretch;justify-content:flex-start;text-align:left;min-width:0;min-height:155px;white-space:normal;padding:15px!important;position:relative;background:linear-gradient(140deg,#2c1823,#19101b)!important;border:1px solid #7f5147;gap:7px;border-radius:5px!important;transition:transform .18s,border-color .18s,box-shadow .18s}.mc-libraryEntry::before{content:'SKILL MODULE';font:8px/1.3 ui-monospace,monospace;letter-spacing:.13em;color:#c18b6d}.mc-libraryEntries .mc-libraryEntry:hover:enabled{transform:translateY(-2px);border-color:#eeb078;box-shadow:0 8px 25px #0005,0 0 18px #b96f2612}.mc-libraryEntry[aria-pressed=true]{border-color:#ffca8a!important;background:linear-gradient(140deg,#71452b77,#2b1822)!important;box-shadow:inset 2px 0 0 #ffc58a}.mc-libraryEntry strong{font-size:13px;color:#f2d4c5;font-weight:550;overflow-wrap:anywhere}.mc-libraryEntry small{font-size:9px;color:#b68e9f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-libraryEntry p{font-size:11px;line-height:1.75;color:#c9a9b5;margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.mc-libraryEntry small:last-child{color:#d3a681;margin-top:auto;padding-top:7px;border-top:1px solid #603b43}\n.mc-skillInspector{position:absolute;top:66px;bottom:48px;right:0;width:min(540px,94%);z-index:6;display:flex;flex-direction:column;background:linear-gradient(140deg,#291620,#130e18);border-left:1px solid #bd825b;box-shadow:-18px 0 55px #0008;animation:ion-inspector-in .22s ease-out both}.mc-skillInspector>.mc-columnHeader{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:67px;flex:none}.mc-skillInspector>.mc-columnHeader>div{min-width:0}.mc-skillInspector h2{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-skillInspectorBody{flex:1;min-height:0;overflow:auto;padding:18px}.mc-skillInspectorBody .mc-field{margin-bottom:16px!important}.mc-skillInspectorBody .mc-actions{gap:5px;margin-top:12px}.mc-skillInspectorBody .mm-button{font-size:10px;min-height:28px;padding:5px 8px;white-space:normal}.mc-skillInspectorBody .mc-resourceInfo{overflow-wrap:anywhere;white-space:pre-wrap;font-size:10px;line-height:1.75;color:#d0acbb}\n.mc-editorFooter{min-height:48px;padding:9px 18px;background:linear-gradient(100deg,#24151c,#161019);border-top:1px solid #53323a;gap:10px}.mc-editorFooter .mc-caption{color:#b48e9e;font-size:10px}.mc-editorFooter .mm-button{min-height:29px;padding:4px 12px;font-size:11px}\n.mc-assistantHeader{padding:12px 17px;min-height:66px}.mc-assistantTitle h2{color:#ffe0c6;font-size:13px;letter-spacing:.03em}.mc-assistantDot[data-state=ready]{background:#91d9b3;box-shadow:0 0 9px #83d5a34d}.mc-assistantDot[data-state=running]{background:#ffba73;box-shadow:0 0 12px #fba25266}.mc-assistantDot[data-state=error]{background:#f6a496}.mc-connectionLabel{color:#bba0a8;font-size:10px}.mc-assistantHeading .mc-caption{color:#bd8e89;font-size:10px}.mc-assistantNotice,.mc-assistantSync{border-radius:4px;margin:10px 12px;padding:10px 12px;border:1px solid #694137;background:#37211f70;color:#dfb39d;font-size:11px}.mc-assistantNotice.is-error{border-color:#a66563;background:#4e272a50;color:#ffbdb0}.mc-assistantSync{border-inline-start:2px solid #f6b16d}.mc-configWelcome{min-height:0;padding:40px 25px 20px;background:radial-gradient(ellipse at top,#a2642825,transparent 70%)}.mc-configWelcomeMark{width:52px;height:52px;border:1px solid #b77b54;background:#56321f44;box-shadow:0 0 42px #ed913c18;color:#ffd5a6}.mc-configWelcome h3{font-size:19px;font-weight:500;letter-spacing:.02em;color:#ffe0c7}.mc-configWelcome p{color:#b995a6;font-size:12px;line-height:1.8}.mc-quickPrompts{gap:6px;padding:14px 17px}.mc-quickPrompts button{background:#2b1822;border:1px solid #76503e;color:#e8c2ad;border-radius:4px;font-size:11px;padding:7px 10px}.mc-quickPrompts button:hover:enabled{background:#533122;border-color:#e7ac72;color:#ffe5cc}\n:is(.mc-assistant,.mr-chat){--dsw-alias-bg-base:#110d16;--dsw-alias-bg-layer-1:#19111c;--dsw-alias-bg-layer-2:#271925;--dsw-alias-bg-overlay:#0a0710b0;--dsw-alias-border-l1:#63414e;--dsw-alias-border-l2:#8c5a58;--dsw-alias-brand-primary:#efaa76;--dsw-alias-label-primary:#f0e0db;--dsw-alias-label-secondary:#c0a3b5;--dsw-alias-state-error-primary:#ffb0a2;--dsw-alias-state-success-primary:#90ddba;color:#edddd7;color-scheme:dark}\n:is(.mc-nativeConversation,.mr-chatBody){background:radial-gradient(ellipse at 65% 0,#74482a10,transparent 60%),#110d16}.mc-nativeConversation [data-conversation-content],.mr-chatBody [data-conversation-content]{--dsh-composer-text-max-height:30vh;color:#ecdad8}.mc-nativeConversation [data-composer-seat],.mr-chatBody [data-composer-seat]{background:#130e18!important;border-top:1px solid #4a2d3a;padding:12px 14px!important}.mc-nativeConversation [data-composer-seat] textarea,.mr-chatBody [data-composer-seat] textarea{color:#f5e4df!important}.mc-assistantPending{background:transparent;color:#c19eae;font-size:12px;min-height:180px}.mc-assistantPending .mm-button{margin-top:8px}\n.mc-toast{position:absolute;right:18px;top:72px;max-width:min(580px,70%);z-index:30;border:1px solid #bb8257;background:#302019eb;backdrop-filter:blur(12px);color:#f9d5b5;border-radius:5px;box-shadow:0 12px 45px #0007;animation:ion-pop-in .2s ease-out both}.mc-toast.is-error{border-color:#bc797c;background:#391d2aeb;color:#ffc9c0}.mc-saveState.is-justSaved{color:#a6e0bc;animation:ion-save-confirm 1.8s ease-out}\n.mr-consoleBar{gap:13px}.mr-consoleBar .mm-workspaceTabs{margin-right:4px}.mr-consolePicker{display:flex;align-items:center;gap:8px;min-width:100px;max-width:390px;flex:1}.mr-consolePicker select{width:100%;height:34px;border:1px solid #79513e;background:#22141d;border-radius:4px;padding:5px 30px 5px 11px;color:#f2d7c7;font:12px/1.5 inherit}.mr-consoleTools{display:flex;gap:7px;margin-left:auto;align-items:center}.mr-consoleIndicator{color:#bda0ad;font-size:10px;white-space:nowrap}.mr-consoleIndicator b{color:#ffd19f;font-size:12px;font-weight:500}\n.mr-layout{background:#100c14;gap:0}.mr-layout[data-rail-open=false]{--mr-rail-size:0px}.mr-layout[data-rail-open=false] .mr-projectNav{visibility:hidden;overflow:hidden;border:0;pointer-events:none}.mr-projectNav{background:linear-gradient(110deg,#191019,#100c15);border-inline-end:1px solid #63402e}.mr-navHead{border-bottom:1px solid #54313c;background:#24141e99}.mr-brand h1{font-size:12px;letter-spacing:.03em;color:#dab6a4}.mr-projectList{padding:12px 9px;gap:7px}.mr-projectList>button{border:1px solid #4b2d3c;background:#1b111c;border-radius:4px;padding:12px 10px}.mr-projectList>button:hover{border-color:#b07951;background:#35201f}.mr-projectList>button[aria-pressed=true]{border-color:#cb9265;background:linear-gradient(120deg,#59332177,#25151f);box-shadow:inset 2px 0 0 #ffc58e}.mr-projectList>button[aria-pressed=true]::before{display:none}.mr-projectList strong{font-size:12px;color:#f1d7ce}.mr-projectList small{font-size:10px;color:#c29aa8}.mr-projectList>button>svg{color:#d6a172}\n.mr-projectInner{max-width:none;padding:20px 22px 26px;background:radial-gradient(ellipse at 15% -15%,#ba62201a,transparent 55%)}.mr-projectHeader{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:17px}.mr-projectHeader h2{font-size:20px;font-weight:550;color:#f5dcca;letter-spacing:.015em;margin:0 0 7px}.mr-meta{gap:12px;font-size:10px;color:#b28e9e}.mr-projectHeader .mr-meta{justify-content:flex-end;max-width:52%;flex-wrap:wrap}.mr-meta svg{color:#c98761}.mr-split{background:#50313b}.mr-split:hover,.mr-split:focus-visible{background:#c48252;box-shadow:0 0 12px #cf915d4d}\n.mr-chat{border-left:1px solid #6b4338;background:#110c16}.mr-chatHeader{min-height:58px;padding:12px 17px;background:linear-gradient(110deg,#2e1920,#1b111c);border-bottom:1px solid #56303e}.mr-chatHeader h2{font-size:13px;color:#ffddc5}.mr-chatIdentity>svg{color:#efad79}.mr-chatStatus{font-size:10px;color:#c19fa9}.mr-chatStatus[data-state=ready]{color:#a7ddbc}.mr-chatStatus[data-state=running]{color:#ffd08b}.mr-chatContext{background:#24141d;color:#d9aa91;border-bottom:1px solid #634033;padding:9px 16px;font-size:11px}.mr-chatWelcome{padding:35px 20px 18px;background:radial-gradient(ellipse at top,#87451c20,transparent 75%)}.mr-chatWelcome h3{color:#f2d5c2;font-size:19px;font-weight:450}.mr-welcomeMark{background:#38201d;border:1px solid #956546;color:#fbc58d;box-shadow:0 0 35px #d17b2520}.mr-panel .mr-start{background:#3b231f;color:#ffd4ac;border-color:#9e6e4b}.mr-panel .mr-start:hover:enabled{background:#5a3421;border-color:#e7ae73}\n.mr-projectViews{display:flex;align-items:center;gap:4px;padding:4px;background:#110b15;border:1px solid #624034;border-radius:5px;margin-bottom:16px;width:fit-content}.mr-projectViews button{border:0;padding:7px 16px;border-radius:3px;background:transparent;color:#b996a5;font-size:11px;display:flex;align-items:center;gap:7px}.mr-projectViews button[aria-pressed=true]{background:linear-gradient(120deg,#673c27,#3d231f);color:#ffd4a5;box-shadow:inset 0 0 0 1px #b27c4c70}.mr-projectViews button:hover{color:#ffe6d0}\n.mr-stepInspector{margin-top:20px;padding:16px 18px 4px;border:1px solid #79513c;background:linear-gradient(145deg,#21121d,#140d17);border-radius:5px;position:relative}.mr-stepInspector::before{content:'';position:absolute;top:-1px;left:-1px;width:17px;height:17px;border-top:2px solid #d99b64;border-left:2px solid #d99b64;pointer-events:none}.mr-workflowHead{gap:12px;margin-bottom:12px}.mr-workflowHead h3{font:500 12px/1.5 \"Segoe UI\",\"Microsoft YaHei UI\",sans-serif;letter-spacing:.06em;color:#d8ac91}.mr-progress{font-size:10px;color:#c198a3}.mr-progressTrack{background:#3c2634}.mr-progressTrack i[data-done=true]{background:#e9ad72;box-shadow:0 0 8px #d98d4330}\n.mr-stepRail{display:flex;gap:6px;overflow:auto;padding:0 0 12px;scrollbar-width:thin}.mr-stepRail button{flex:0 0 auto;max-width:250px;display:flex;align-items:center;gap:7px;min-height:32px;padding:6px 10px;border:1px solid #634149;border-radius:4px;background:#1c111c;color:#b99aa8;font-size:11px;white-space:nowrap}.mr-stepRail button span{color:#d49a74;font:10px ui-monospace,monospace}.mr-stepRail button strong{overflow:hidden;text-overflow:ellipsis;font-weight:500}.mr-stepRail button[aria-pressed=true]{background:#643b294d;border-color:#ce9564;color:#ffddba}.mr-stepRail button[data-executing=true] span{color:#ffe1a5;text-shadow:0 0 9px #ffc66f}\n.mr-steps{margin:0;padding:0;list-style:none}.mr-steps li{border:0!important;border-top:1px solid #5c3540!important;border-radius:0!important;background:transparent!important}.mr-steps details[open]{border-radius:0!important;background:transparent!important}.mr-steps summary{padding:13px 2px;min-height:46px}.mr-steps summary>strong{font-size:13px;color:#edd0bf}.mr-stepNumber{border-radius:4px;border-color:#9c6a43;color:#edbd8a;background:#37201d}.mr-stepBody{padding:0 0 14px 0;font-size:12px;line-height:1.85;color:#d2b3bc;animation:ion-drawer-in .2s ease-out both}.mr-purpose{padding:10px 13px;border-left:2px solid #ba8053;background:#3e251e33;margin-bottom:14px}.mr-stepBody h4{color:#c58c74;font-size:10px;font-weight:550;letter-spacing:.04em}.mr-stepActions{margin-top:10px;gap:7px}.mr-panel .mr-action{background:#2b1921;border-color:#77503b;color:#edc5a6;font-size:11px}.mr-panel .mr-action:hover:enabled{background:#4d2d20;border-color:#d99e68}.mr-stepStatus{font-size:10px;color:#c29aa8}.mr-stepStatus[data-status=submitted]{color:#9dddba}.mr-output{border-top:1px solid #50303b;padding-top:12px}.mr-outputText{background:#100b14;border:1px solid #4e2f3e;padding:12px;border-radius:4px;color:#e1c7c7}.mr-artifacts{gap:6px}.mr-artifact{border:1px solid #6d483d;border-radius:4px;background:#28171f;padding:9px 11px}.mr-artifact button{color:#f4cda9}.mr-artifact small,.mr-time{color:#ab8799;font-size:10px}.mr-history{background:#140d17;border:1px solid #76503b;border-radius:5px;padding:13px;margin-top:12px}.mr-decision{background:linear-gradient(125deg,#54301f66,#24141e);border:1px solid #ba8753;border-radius:4px;margin:10px;padding:12px;color:#ebc29f;font-size:12px}.mr-decision button{border-radius:4px}\n.mr-deliverableShelf{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));gap:13px;animation:ion-drawer-in .22s ease-out both}.mr-deliveryCard{padding:17px;border:1px solid #82573e;background:linear-gradient(130deg,#39201880,#18101b);border-radius:5px;min-width:0}.mr-deliveryCard header{display:flex;align-items:center;gap:8px;margin-bottom:10px;color:#f3cfaf;font-size:12px}.mr-deliveryCard header>span{font:11px ui-monospace,monospace;color:#cf9670}.mr-deliveryCard p{font-size:11px;line-height:1.8;color:#c0a1ae;white-space:pre-wrap;max-height:180px;overflow:auto}.mr-deliveryCard .mr-emptyReceipt{font-size:11px;color:#b28c9f}.mr-deliveryCard .mr-action{max-width:100%;overflow:hidden;text-overflow:ellipsis;justify-content:flex-start}.mr-deliveryCard footer{display:flex;gap:7px;flex-wrap:wrap;padding-top:10px;margin-top:10px;border-top:1px solid #5f3b3c}\n.mr-live,.mr-stepActivity{background:#17101a;border-color:#63413c;border-radius:4px;color:#d6b3bc}.mr-liveHeadline{color:#f3c69f}.mr-callDetail{background:#100b14;border:1px solid #80513f;border-radius:4px}.mr-activityItem{border-color:#53303e}.mr-activityItem[data-status=failed],.mr-activityItem[data-status=cancelled]{border-color:#a76d63}.mr-activityItem time{font-size:10px;color:#b48a9e}\n.mdoc{background:var(--ion-void)!important;color:var(--ion-text)}.mdoc>header{min-height:60px;background:linear-gradient(100deg,#301b21,#1a111d);border-bottom:1px solid #815239;padding:12px 18px}.mdoc>header strong{font-size:14px;font-weight:550;color:#f7d9bf}.mdoc .mdoc-icon{border:1px solid transparent;color:#d8af9c;border-radius:4px;font-size:11px;padding:6px 9px;transition:background .15s,border-color .15s,color .15s}.mdoc .mdoc-icon:hover:enabled{border-color:#a9774c;background:#4a2b20;color:#ffdfb9}.mdoc-toolbar{background:#21131e;border-color:#65403c;padding:10px 18px}.mdoc-tabs{border-color:#8b5d42;background:#120c16;border-radius:4px;padding:3px}.mdoc-tabs button{border-radius:2px;font-size:11px;padding:6px 14px;color:#c29ba9}.mdoc-tabs button[aria-pressed=true]{background:#71432966;color:#ffd6a7}.mdoc .mdoc-save{font-size:11px;border-radius:4px;padding:6px 14px}.mdoc-body{padding:26px;background:radial-gradient(ellipse at 50% 0,#8850261f,transparent 75%),repeating-linear-gradient(0deg,#321b2a18 0,#321b2a18 1px,transparent 1px,transparent 32px),#100b14}.mdoc-page{box-shadow:0 16px 70px #0009,0 0 0 1px #c4967945;max-width:100%;border-radius:1px}.mdoc-blocks{gap:16px;max-width:930px}.mdoc-block>span{color:#c58d7a;font:10px/1.7 ui-monospace,\"Microsoft YaHei UI\",monospace;letter-spacing:.04em}.mdoc-block textarea{border:1px solid #76503e;background:#1e121c;color:#e9d0d2;border-radius:4px;padding:13px;font:13px/1.9 \"Segoe UI\",\"Microsoft YaHei UI\",sans-serif;transition:border-color .16s,box-shadow .16s}.mdoc-block[data-changed=true] textarea{border-color:#f5b174;box-shadow:inset 2px 0 0 #f5b174,0 0 18px #d78c3718}.mdoc-block textarea:focus{outline:none;border-color:#ffd097;box-shadow:0 0 0 2px #eaa76222}.mdoc-text{color:#e9d5d7;background:#160e18;font-size:14px;line-height:1.9;padding:20px;border:1px solid #72483f;border-radius:4px;max-width:1100px;margin:auto;display:block}\n.mdoc-grid{background:#150d18;border:1px solid #93613e}.mdoc-grid th{background:#39211f;color:#eac2a0;font:10px ui-monospace,monospace}.mdoc-grid td,.mdoc-grid th{border-color:#593541}.mdoc-grid input{color:#e5cbd1;font-size:12px}.mdoc-grid td[data-changed=true]{background:#a1642b26;box-shadow:inset 0 -1px 0 #df9f63}.mdoc-grid input:focus{outline:1px solid #f3bf87;background:#4b291f;outline-offset:-1px}.mdoc-sheets button{background:#271620;border:1px solid #83573d;color:#c7a0ab;border-radius:3px}.mdoc-sheets button[aria-pressed=true]{background:#72452c66;color:#ffdfb6;border-color:#d59b65}.mdoc-pages{padding:8px;font:11px/1.7 ui-monospace,\"Microsoft YaHei UI\",monospace;color:#d3ab9a}.mdoc-footer{padding:10px 17px;border-top:1px solid #76503d;background:#23131e;color:#b892a5;font-size:10px}.mdoc-message{background:#28181d;border-color:#76503b;color:#edbf9a}.mdoc-message.is-error{background:#381d29;color:#ffc0b4;border-color:#ab6a66}.mdoc-closeCheck{border-block:1px solid #b98150;background:#462a1f;color:#ffdbb6}.mdoc-notice{background:#22141d;border-color:#583442;color:#be97a9}\n.mc-modeDialogBackdrop,.mr-dialogBackdrop{background:#08050dbb;backdrop-filter:blur(9px);animation:ion-backdrop-in .14s ease-out}.mc-modeDialog,.mr-dialog{animation:ion-dialog-in .2s ease-out both}.mc-modeDialog input,.mc-modeDialog textarea,.mr-dialog input,.mr-dialog select,.mr-dialog textarea{border:1px solid #885c40;background:#150e18;color:#eddbd4;border-radius:4px;padding:10px 12px;font:13px/1.8 inherit}.mr-dialog h2{color:#f4d2b8;font-size:19px;font-weight:500}.mr-revisionScope label{background:#25141f;border-color:#714939}.mr-revisionScope label:has(:checked){background:#6b3c233b;border-color:#f2b378}.mr-revisionScope input{accent-color:#e9a368}\n.mm-hud{--mm-accent:#edac70;--mm-line:#654040;--mm-ink:#f6d6bd;--mm-bg:#1b1018}.mm-hudTrack{background:#3b2630}.mm-hudFill{background:linear-gradient(90deg,#b57143,#ffcd8b);box-shadow:0 0 10px #f3ae5640}\n.mm-workbench [data-ion-static=true]{position:relative}.mm-workbench [data-ion-pressed=true]::after{content:'';position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:radial-gradient(circle 80px at var(--ion-press-x,50%) var(--ion-press-y,50%),#ffc47b50,transparent 75%);animation:ion-press .35s ease-out both}\n@keyframes ion-pop-in{from{opacity:0;transform:translateY(-5px) scale(.985)}to{opacity:1;transform:none}}\n@keyframes ion-drawer-in{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}\n@keyframes ion-dialog-in{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}\n@keyframes ion-backdrop-in{from{opacity:0}to{opacity:1}}\n@keyframes ion-field-change{0%,20%{background:#ffb56612;box-shadow:0 0 0 5px #ffb56612}100%{background:transparent;box-shadow:none}}\n@keyframes ion-save-confirm{0%{text-shadow:0 0 15px #9de9b5}100%{text-shadow:none}}\n@keyframes ion-press{from{opacity:.85}to{opacity:0}}\n@keyframes ion-inspector-in{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}\n@media(min-width:1500px){.mc-simpleStep{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px 20px!important}.mc-simpleStep>.mc-field{grid-column:1/-1}.mc-simpleStep>.mc-field[data-ion-field=purpose],.mc-simpleStep>.mc-field[data-ion-field=deliverables]{grid-column:auto}}\n@media(max-width:1300px){.mc-top,.mr-consoleBar{gap:8px;padding-inline:12px}.mc-brand h1,.mr-consoleBrand strong{font-size:15px}.mc-modeField{min-width:120px;gap:6px}.mc-modePicker{min-width:120px;max-width:250px}.mm-workspaceTabs [role=tab]{padding-inline:10px}.mc-saveState{display:none}.mc-topTools{gap:5px}.mc-content{padding:20px 22px!important}.mr-consoleIndicator{display:none}}\n@media(max-width:1000px){.mc-top,.mr-consoleBar{height:auto;min-height:58px;flex-wrap:wrap;padding-block:10px;gap:8px}.mc-topTools{margin-left:auto}.mc-modeField{order:4;flex:1 0 100%}.mc-modePicker{max-width:none}.mc-modeField>.mm-button{flex:none}.mc-topTools .mc-libraryButton{padding-inline:8px}.mr-consolePicker{max-width:none;min-width:180px}.mr-projectHeader{display:block}.mr-projectHeader .mr-meta{justify-content:flex-start;max-width:100%;margin-top:7px}.mr-projectInner{padding:17px 14px 22px}.mc-columnHeader{padding-inline:13px}.mc-content{padding:18px 16px!important}}\n@media(max-width:680px){.mm-workspaceTabs{gap:0}.mm-workspaceTabs [role=tab]{font-size:11px;padding-inline:10px}.mc-brand h1,.mr-consoleBrand strong{font-size:14px}.mc-logo,.mr-consoleMark{height:28px;width:28px}.mc-topTools .mm-button{font-size:11px;padding-inline:9px}.mc-top .mc-modeToggle{display:none}.mc-content{padding:15px 12px!important}.mc-simpleStep{gap:17px!important}.mc-fieldHeader{align-items:flex-start;flex-wrap:wrap;gap:6px}.mr-consoleTools{gap:5px}.mr-consoleTools .mr-consoleIndicator{display:none}.mr-consoleBar>.mr-consolePicker{order:4;flex:1 0 100%;max-width:none}.mr-stepInspector{padding:13px 12px 2px}.mr-deliverableShelf{grid-template-columns:1fr}.mc-toast{right:10px;max-width:calc(100% - 20px);top:70px}.mdoc-body{padding:12px}.mdoc-toolbar{padding:9px 10px;gap:5px}.mdoc-toolbar .mdoc-spacer{display:none}.mdoc>header{padding:10px}.mdoc .mdoc-icon{font-size:10px;padding-inline:6px}.mdoc-text{padding:12px}}\n@media(prefers-reduced-motion:reduce){.mm-workbench *,.mm-panel.mc-panel *,.mm-panel.mr-panel *,.mdoc *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}\n\n/* Precision editing surfaces and native Conversation card styling. */\n.mc-stepIdentity{display:flex;align-items:center;gap:13px;min-width:0;flex:1}.mc-editorNode{display:grid;place-items:center;flex:none;width:42px;height:42px;background:linear-gradient(140deg,#6c402955,#21131c);border:1px solid #b67b50;color:#ffd1a1;font:24px/1 ui-monospace,monospace;border-radius:4px;box-shadow:inset 0 1px 0 #ffe2bb17,0 0 23px #bc762a15}.mc-stepIdentityText{min-width:0;flex:1}.mc-stepNameWrap{display:flex;align-items:center;gap:8px;min-width:0;max-width:680px}.mc-stepNameWrap input{height:27px;min-width:0;width:100%;border:1px solid transparent;border-radius:3px;background:transparent;color:#f8ddca;font:550 15px/1.5 \"Segoe UI\",\"Microsoft YaHei UI\",sans-serif;padding:0 4px;margin-left:-4px;text-overflow:ellipsis;transition:border-color .15s,background .15s}.mc-stepNameWrap input:hover{border-color:#80503d;background:#34201e55}.mc-stepNameWrap input:focus{outline:none;border-color:#f0b57a;background:#21131b;box-shadow:0 0 0 2px #eea65a18}.mc-stepNameWrap>svg{color:#bc8c71;opacity:.8;flex:none}.mc-simpleStep>.mc-field{border:1px solid #644039;padding:14px;background:linear-gradient(130deg,#37201835,#180f193b);border-radius:4px;position:relative}.mc-simpleStep>.mc-field::after{content:'';position:absolute;right:-1px;bottom:-1px;width:10px;height:10px;border-right:1px solid #d59a66;border-bottom:1px solid #d59a66;opacity:.55;pointer-events:none}.mc-simpleStep>.mc-field>.mc-label::before,.mc-simpleStep>.mc-field>.mc-fieldHeader>.mc-label::before{content:'';display:inline-block;width:3px;height:3px;background:#d99562;margin-right:7px;vertical-align:middle;box-shadow:0 0 7px #eeaa5530}.mc-stepRow.is-current::after{content:'';position:absolute;left:-9px;top:35px;width:8px;height:1px;background:#ffc17e;box-shadow:0 0 9px #f1ad5d55;pointer-events:none}.mc-configWelcome{position:relative;isolation:isolate}.mc-configWelcome::before{content:'';position:absolute;inset:-70px -20px;z-index:-1;pointer-events:none;background:linear-gradient(135deg,transparent 47%,#ad75401b 47%,#ad75401b 47.2%,transparent 47.2%),linear-gradient(90deg,transparent 49.8%,#ad754014 49.8%,#ad754014 50.2%,transparent 50.2%),linear-gradient(0deg,transparent 49.8%,#ad754014 49.8%,#ad754014 50.2%,transparent 50.2%);background-size:170px 130px,72px 72px,72px 72px;mask-image:radial-gradient(ellipse,#000,transparent 72%)}.mc-configWelcomeMark{position:relative;border-radius:5px!important}.mc-configWelcomeMark::before,.mc-configWelcomeMark::after{content:'';position:absolute;top:6px;bottom:6px;width:7px;background:repeating-linear-gradient(180deg,#bf895c 0,#bf895c 1px,transparent 1px,transparent 7px);pointer-events:none}.mc-configWelcomeMark::before{left:-8px}.mc-configWelcomeMark::after{right:-8px}\n:is(.mc-assistant,.mr-chat){--dsw-specific-menu:#23151e;--dsw-alias-bg-layer-3:#302030;--dsw-alias-label-primary-dimmed:#dfc5ce;--dsw-alias-label-tertiary:#b498ac;--dsw-alias-interactive-bg-hover:#67412e44;--dsw-alias-button-info-fill:#b66b3e;--dsw-alias-button-info-hover:#bb774c;--dsw-radius-lg:7px}\n:is(.mc-nativeConversation,.mr-chatBody) [data-composer-card]{background:linear-gradient(135deg,#342029,#1c121f)!important;border:1px solid #916347!important;border-radius:7px!important;box-shadow:inset 0 1px 0 #f1c79a12,0 0 32px #c1812810!important;transition:border-color .16s,box-shadow .16s}:is(.mc-nativeConversation,.mr-chatBody) [data-composer-card]:focus-within{border-color:#eab079!important;box-shadow:0 0 0 2px #c98b4b18,0 0 30px #d5902820!important}\n@media(max-width:1000px){.mc-stepIdentity{gap:9px}.mc-editorNode{width:35px;height:35px;font-size:20px}.mc-stepNameWrap input{font-size:13px}.mc-simpleStep>.mc-field{padding:12px}.mc-stepIdentityText{max-width:calc(100% - 42px)}}\n\n.mr-brand h2{margin:0;font-size:12px;font-weight:550;color:#d8ad94}.mr-deliveryCard .mr-output{margin-top:0;border-top:0;padding-top:0}.mr-deliveryCard .mr-output>h4{display:none}.mr-deliveryText{white-space:pre-wrap;font:12px/1.85 inherit;max-height:280px;overflow:auto;background:#100b15;padding:12px;border:1px solid #4f303e;border-radius:3px}.mr-fileLink{border:1px solid #8d5f40;border-radius:3px;background:#38201c;color:#f5cb9f;padding:7px 10px;display:inline-flex;align-items:center;gap:7px;font-size:11px}.mr-fileLink:hover{border-color:#e5ac71;background:#5c3321}.mr-artifacts code{font-size:9px;color:#ac8498;overflow-wrap:anywhere}.mr-projectInner>.mrv{margin-bottom:16px}.mr-stepInspector .mr-historyToggle{font-size:10px;color:#cca085}\n\n.mr-layout{transition:grid-template-columns .22s ease-out}.mr-layout[data-dragging=true]{transition:none}.mr-projectNav{overflow:hidden;transition:opacity .18s}.mr-layout[data-rail-open=false] .mr-projectNav{opacity:0}.mr-stepNameHeading{margin:0}.mc-stepNameWrap[data-ion-changed=true]{animation:ion-field-change 2.6s ease-out both}\n.mdoc-format{font:9px/1 ui-monospace,monospace;color:#ffd3a2;border:1px solid #bc8555;background:linear-gradient(140deg,#633c2355,#2b1720);padding:6px 7px;border-radius:3px;letter-spacing:.08em;flex:none}.mdoc-focus{display:flex;align-items:center;gap:8px;min-height:36px;padding:6px 16px;border-bottom:1px solid #8c603f;background:linear-gradient(110deg,#5f3b2144,#25151f);color:#e4bd9c;font-size:11px;flex:none}.mdoc-focus>span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mdoc-focus .mdoc-icon{font-size:10px;white-space:nowrap}.mdoc[data-changed=true] .mdoc-format{box-shadow:0 0 12px #ecaa5530;border-color:#ffca87}.mdoc-notice{font-size:10px;line-height:1.8}.mdoc-footer>span{display:inline-flex;align-items:center;gap:6px}.mdoc[data-changed=true] .mdoc-footer>span::before{content:'';height:4px;width:4px;background:#ffc178;box-shadow:0 0 9px #f5bd6570;border-radius:50%}\n\n:is(.mc-nativeConversation,.mr-chatBody) [data-message-bubble]{background:linear-gradient(135deg,#56332670,#2a1926)!important;border:1px solid #835344;border-radius:7px!important;box-shadow:inset 0 1px 0 #ecc89a08;color:#ebd8d5}:is(.mc-nativeConversation,.mr-chatBody) a{color:#eeb783}.mm-panel.mr-panel{--dsw-alias-state-error-primary:#ffb6a9}.mr-shell>.mr-error{background:#391d2a;color:#ffc0b0;border-color:#bd7974;font-size:12px}\n\n/* Fit the actual embedded workbench width, rather than the whole DSH window. */\n.mc-grid.has-assistant>:is(.mc-flow,.mc-editor,.mc-assistant){min-width:0!important;width:100%}.mc-assistant :is(.mc-nativeConversation,[data-conversation-content]){min-width:0;max-width:100%}\n@container metis-workbench (max-width:1000px){.mc-top{height:auto;min-height:58px;flex-wrap:wrap;padding:10px 12px;gap:8px}.mc-modeField{order:4;flex:1 0 100%;min-width:0}.mc-modePicker{max-width:none;min-width:120px}.mc-topTools{margin-left:auto}.mc-saveState{display:none}.mc-stepManage>.mc-iconButton:nth-child(-n+2){display:none}.mc-stepNameWrap input{font-size:13px}.mc-columnHeader{gap:8px}}\n@container metis-project (max-width:1000px){.mr-consoleBar{height:auto;min-height:58px;flex-wrap:wrap;padding:10px 12px;gap:8px}.mr-consolePicker{order:4;flex:1 0 100%;max-width:none;min-width:0}.mr-consoleIndicator{display:none}.mr-consoleTools{margin-left:auto;gap:5px}}\n\n@media(min-width:1500px){.mc-simpleStep:has(.mc-finalOutput)>.mc-field[data-ion-field=purpose],.mc-simpleStep:has(.mc-finalOutput)>.mc-field[data-ion-field=deliverables]{grid-column:1/-1}}\n\n/* Circuit core: full-height scene, object inspectors, native conversation. */\n.ic-workspace{height:100%;min-height:0;display:flex;flex-direction:column;overflow:hidden;background:#08070d;color:var(--ion-text);container:metis-circuit / inline-size}\n.ic-workspace>.mc-top,.ic-workspace>.mr-consoleBar{z-index:12;min-height:58px;height:58px;padding:0 16px;gap:12px}.ic-workspace .mc-modeField{min-width:100px}.ic-workspace .mc-modePicker{max-width:280px}.ic-workspace .mc-modeField .mc-modePicker{flex:1}.ic-workspace .mc-brand h1{font-size:15px}.ic-workspace .mm-workspaceTabs [role=tab]{padding:5px 10px}\n.ic-body{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) 6px minmax(300px,var(--ic-chat-width));overflow:hidden}.ic-stage{position:relative;min-width:0;min-height:0;isolation:isolate;overflow:hidden;background:#08070d}.ic-stage::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,#08070d55,transparent 28%,transparent 75%,#08070d99);z-index:1}\n.ic-world{inset:0}.ic-stage[data-inspector=true] .ic-world{left:min(390px,43%)}.ic-context{position:absolute;top:22px;left:24px;z-index:2;pointer-events:none;text-shadow:0 2px 18px #000}.ic-eyebrow{font:9px/1.5 Consolas,monospace;letter-spacing:.18em;color:#c58b76}.ic-context h1{margin:5px 0 10px;font:550 clamp(18px,1.6vw,25px)/1.3 'Segoe UI','Microsoft YaHei UI',sans-serif;max-width:460px;color:#f5e1d8;letter-spacing:.015em}.ic-metrics{display:flex;gap:14px;align-items:center;font-size:10px;color:#c4a2a1}.ic-metrics b{font:400 17px/1 Consolas,monospace;color:#ffcc97}.ic-metrics i{height:10px;width:1px;background:#734737}.ic-cameraTools{position:absolute;right:20px;top:22px;z-index:3;display:flex;gap:6px}\n.ic-action{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:30px;padding:6px 9px;font:11px/1.3 'Segoe UI','Microsoft YaHei UI',sans-serif;color:#ddbbad;border:1px solid #704935;background:#20131bd9;border-radius:4px;cursor:pointer;backdrop-filter:blur(12px);transition:background .16s,border-color .16s}.ic-action:hover,.ic-action[aria-pressed=true]{color:#ffe2c5;border-color:#df9d68;background:#4c291edb}.ic-action:disabled{opacity:.4;cursor:default}.ic-action.mm-primary{background:linear-gradient(140deg,#ffd09b,#e89963);border-color:#ffc591;color:#25120b;font-weight:650}\n.ic-assistant{min-width:0;min-height:0;overflow:hidden;background:linear-gradient(160deg,#1b111b,#100c15 70%);position:relative;z-index:5}.ic-assistant>:is(.mc-assistant,.mr-chat){height:100%;width:100%;min-width:0;border:0!important;border-radius:0!important}.ic-chatGrip{position:relative;cursor:col-resize;background:#181019;z-index:6;border-left:1px solid #674334}.ic-chatGrip::after{content:'';position:absolute;left:2px;top:45%;height:34px;width:2px;border-radius:3px;background:#875641}.ic-chatGrip:hover,.ic-chatGrip:focus-visible{background:#6a3a27}.ic-assistant .mr-chatWelcome{padding:30px 18px}.ic-assistant .mr-chatWelcome h3{font-size:20px}.ic-assistant .mr-chatContext{border-bottom:1px solid #4e2f3c}.ic-assistant .mc-configWelcome{padding-top:28px}\n.ic-inspector,.ic-palette{position:absolute;left:16px;top:112px;bottom:84px;width:min(365px,calc(100% - 32px));z-index:4;display:flex;flex-direction:column;min-height:0;background:linear-gradient(155deg,#281a24f7,#100c16f5);border:1px solid #8b5940;border-top-color:#e5ad79;box-shadow:0 18px 80px #0009,inset 0 1px 0 #ffcb9a1c;border-radius:7px;backdrop-filter:blur(20px);animation:ic-reveal .2s ease-out}.ic-drawerHead{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-bottom:1px solid #674438;flex:none;font-size:10px;letter-spacing:.08em;color:#dba580}.ic-drawerHead .ic-action{border:0;background:transparent;min-height:26px;padding:4px}.ic-inspector>.mc-editor{min-height:0;flex:1;width:100%;border:0;background:transparent;display:flex;flex-direction:column}.ic-inspector .mc-columnHeader{padding:12px 14px;min-height:62px}.ic-inspector .mc-stepIdentity{gap:8px}.ic-inspector .mc-stepManage{gap:2px}.ic-inspector .mc-stepManage .mc-iconButton{width:25px;min-width:25px;height:27px}.ic-inspector .mc-stepIdentityText{min-width:0}.ic-inspector .mc-stepNameWrap input{font-size:13px!important}.ic-inspector .mc-editorNode{display:none}.ic-inspector .mc-content{padding:14px;overflow:auto}.ic-inspector .mc-simpleStep{display:flex;flex-direction:column;gap:18px;max-width:none;margin:0}.ic-inspector .mc-field{margin:0;gap:7px}.ic-inspector .mc-simpleStep textarea{min-height:58px;padding:9px;font-size:12px;line-height:1.65}.ic-inspector .mc-simpleStep textarea[aria-label='步骤提示词']{min-height:145px}.ic-inspector .mc-editorFooter{padding:9px 12px}.ic-inspector .mc-editorFooter>.mc-caption{display:none}.ic-inspector .mc-editorFooter>div{width:100%;justify-content:space-between}.ic-inspector .mc-loopToggle{margin-left:auto}.ic-inspector .mc-loopToggle strong{font-size:10px}.ic-inspector .mc-finalOutput{display:flex;flex-direction:column}\n.ic-inspector .mr-steps{padding:12px;margin:0;overflow:auto;min-height:0}.ic-inspector .mr-steps>li{border:0;background:transparent;margin:0}.ic-inspector .mr-steps summary{display:none}.ic-inspector .mr-stepBody{padding:0;max-width:none}.ic-inspector .mr-purpose{font-size:12px;line-height:1.8}.ic-inspector .mr-steps h4{font-size:10px;color:#d7a47d;text-transform:uppercase;letter-spacing:.08em;margin:18px 0 8px}.ic-inspector .mr-stepActions{position:sticky;bottom:-12px;background:#1b121ceF;backdrop-filter:blur(12px);padding:12px 0;margin-top:18px}.ic-inspector .mr-artifacts code{font-size:9px;word-break:break-all}\n.ic-palette{width:min(430px,calc(100% - 32px));z-index:7;top:88px}.ic-paletteBody{padding:14px;overflow:auto;min-height:0}.ic-palette .mc-skillSearch .mc-parameters{grid-template-columns:1fr}.ic-palette .mc-libraryEntries{display:flex;flex-direction:column;gap:8px}.ic-palette .mc-libraryEntry{width:100%;min-height:90px;cursor:grab;padding:12px;text-align:left}.ic-palette .mc-libraryEntry:active{cursor:grabbing}.ic-palette .mc-libraryEntry p{margin:4px 0;max-height:38px;overflow:hidden}.ic-palette .mc-libraryEntry small{font-size:9px;overflow-wrap:anywhere}.ic-palette .mc-skillManagement{padding:0}.ic-palette .mc-skillMeta{font-size:10px}.ic-palette pre{white-space:pre-wrap;max-height:300px;overflow:auto;font-size:11px}.ic-skillBind{display:flex;gap:8px;align-items:center;margin:12px 0;padding:12px;border:1px solid #825236;background:#281b22;font-size:11px}.ic-skillBind span{flex:1}.ic-palette .mc-actions{flex-wrap:wrap}.ic-palette .mc-libraryEntry[draggable=false]{cursor:pointer}\n.ic-statusRail{position:absolute;z-index:3;left:18px;right:18px;bottom:15px;display:flex;align-items:center;gap:20px;padding:11px 14px;min-height:54px;border:1px solid #6e4536;border-left:2px solid #e9a263;background:linear-gradient(110deg,#26151fe8,#130e19e3);backdrop-filter:blur(14px);border-radius:5px;box-shadow:0 8px 24px #0005}.ic-statusText{min-width:0;display:grid;grid-template-columns:6px minmax(0,1fr);gap:4px 9px;flex:1}.ic-statusText>i{background:#e8b07a;box-shadow:0 0 13px #f7a158;width:4px;height:4px;border-radius:50%;align-self:center}.ic-statusText>strong{font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500}.ic-statusText>small{grid-column:2;font-size:10px;color:#bd999e;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ic-statusText[data-phase=running]>i,.ic-statusText[data-phase=processing]>i{animation:ion-live-pulse 1.8s infinite}.ic-selection{max-width:45%;display:flex;flex-direction:column;align-items:flex-end;gap:4px;min-width:0}.ic-selection>.ic-action{max-width:100%;border-color:#694432;background:#301c21;padding:5px 8px;min-height:26px}.ic-selection span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ic-selection small{font-size:9px;color:#ad858c;white-space:nowrap}\n.ic-notice{position:absolute;top:87px;left:50%;transform:translateX(-50%);z-index:8;max-width:90%;pointer-events:auto}.ic-notice .mc-toast{position:static;transform:none;width:auto;max-width:100%}.ic-notice .mr-error{background:#2b151d;border:1px solid #8d4a40;padding:10px 14px;border-radius:6px}.ic-documentLayer{position:absolute;inset:8px;z-index:10;border:1px solid #a47550;border-radius:6px;overflow:hidden;background:#110d16;box-shadow:0 20px 90px #000b}.ic-documentLayer>.mdoc{height:100%}.ic-empty,.ic-fallback{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);z-index:3;text-align:center;padding:28px;max-width:85%;background:#1e111beF;border:1px solid #704536;border-radius:8px}.ic-empty h2{font-size:23px;margin:0 0 12px;color:#f3cfaf}.ic-empty p{font-size:12px;color:#bd9ba3}.ic-fallback nav{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px;max-height:340px;overflow:auto}.ic-fallback nav button{padding:10px;border:1px solid #825139;background:#28191f;color:#ecd6ce;text-align:left;border-radius:4px}\n.ion-labels .ion-port,.ion-labels .ion-nodeInsert{pointer-events:auto}.ion-nodePorts{width:328px;display:flex;align-items:center;justify-content:center;gap:4px;flex-wrap:wrap;backface-visibility:hidden;max-height:47px;overflow:hidden}.ion-port{font:10px/1.3 'Segoe UI','Microsoft YaHei UI',sans-serif;max-width:145px;min-height:23px;padding:4px 7px;border:1px solid #764a37;border-radius:3px;color:#dbb09a;background:#24151deF;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;cursor:pointer;box-shadow:0 3px 8px #0007}.ion-port:hover{border-color:#ffd19b;color:#ffe5c8}.ion-port-artifact{color:#a5dfc4;border-color:#46745f;background:#10271feF}.ion-port-loop{color:#dfc080;border-style:dashed}.ion-port-output{color:#dbc2fd;border-color:#7d5c8d}.ion-port:disabled{opacity:.5;cursor:default}.ion-nodeInsert{width:26px;height:26px;display:grid;place-items:center;border:1px solid #f5b97d;border-radius:50%;background:#35201e;color:#ffdbb1;font-size:18px;cursor:pointer;box-shadow:0 0 20px #df8b3d33}.ion-chip[draggable=true]{cursor:grab}.ion-chip[data-dragging=true]{opacity:.4}.ion-chip[data-drop=skill]{outline:3px solid #acd8b6;outline-offset:5px;background:#213627f2}.ion-chip[data-drop=before]{border-top:4px solid #ffdaa4}.ion-chip[data-drop=after]{border-bottom:4px solid #ffdaa4}\n@keyframes ic-reveal{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:none}}\n@container metis-circuit (max-width:1150px){.ic-workspace>.mc-top,.ic-workspace>.mr-consoleBar{height:auto;min-height:58px;flex-wrap:wrap;padding:9px 12px;gap:8px}.ic-workspace .mc-modeField{order:0;flex:1 1 250px}.ic-workspace .mc-saveState,.ic-workspace .mr-consoleIndicator{display:none}.ic-workspace .mr-consolePicker{order:0;flex:1;min-width:150px}.ic-workspace .mr-consoleTools{margin-left:auto}.ic-inspector{width:min(340px,calc(100% - 28px))}.ic-context h1{max-width:310px}.ic-cameraTools{top:95px;right:14px;flex-direction:column}.ic-statusRail{left:12px;right:12px;bottom:12px;gap:8px}.ic-selection small{display:none}.ic-context{left:18px}.ic-workspace .mc-topTools{margin-left:auto}}\n@container metis-circuit (max-width:850px){.ic-body{grid-template-columns:minmax(0,1fr) 6px 300px}.ic-context h1{font-size:17px;max-width:270px}.ic-metrics{gap:8px}.ic-metrics b{font-size:14px}.ic-stage[data-inspector=true] .ic-world{left:0}.ic-inspector{left:10px;bottom:80px;top:110px}.ic-context{top:16px}.ic-statusText>small{display:none}.ic-selection{max-width:50%}.ic-cameraTools{top:85px}.ic-palette{top:100px;left:10px}.ic-statusRail{min-height:47px;padding:8px}.ic-selection>.ic-action{font-size:9px}}\n@media(prefers-reduced-motion:reduce){.ic-workspace *{animation:none!important;transition:none!important}}\n.ic-workspace[data-circuit-kind=project] .ic-inspector{bottom:auto;max-height:calc(100% - 200px)}.ic-drawerHead>span{display:grid;gap:5px;min-width:0}.ic-drawerHead strong{font-size:13px;letter-spacing:0;color:#f3d7c1;line-height:1.5}.ic-palette>.mr-projectNav{display:flex;flex-direction:column;position:static;width:100%;max-height:100%;min-height:0;border:0;background:transparent;overflow:auto;transform:none;visibility:visible}.ic-palette>.mr-projectNav .mr-projectList{padding:8px 12px}\n\n/* Research topology: free clusters, layered receipts and source-aware ports. */\n.ion-labels .in-entity{pointer-events:auto;width:196px;height:83px;display:block;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none;text-align:left;font-family:'Segoe UI','Microsoft YaHei UI',sans-serif;backface-visibility:hidden;cursor:pointer;color:#eee0dc;overflow:visible;position:relative}\n.ion-labels .in-entity::before,.ion-labels .in-entity::after{display:none}.ion-labels .in-entity[data-kind=step]{width:293px;height:146px}.ion-labels .in-entity[data-kind=engine]{width:343px;height:164px}\n.in-labelBody{height:100%;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:5px;padding:9px 11px;background:linear-gradient(140deg,#231b27f5,#0e0d17f9);border:1px solid color-mix(in srgb,var(--in-node),#312634 48%);box-shadow:inset 0 1px 0 #ffe8d110,0 6px 18px #0005;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,8px 100%,0 calc(100% - 8px));position:relative;overflow:hidden;animation:in-boot .5s ease-out backwards}\n.in-labelBody::after{content:'';position:absolute;top:-4px;left:0;right:0;height:2px;pointer-events:none;background:linear-gradient(90deg,transparent,var(--in-node),transparent);box-shadow:0 0 18px var(--in-node);opacity:0;animation:in-scan .65s ease-out}\n.in-entity[data-kind=step] .in-labelBody{padding:13px 15px;gap:8px;background:linear-gradient(145deg,#3a2329f4,#130e19f8 80%)}.in-entity[data-kind=engine] .in-labelBody{padding:17px 20px;gap:10px;background:linear-gradient(140deg,#39231ef8,#1f121df8);border-color:#d5a071;box-shadow:inset 0 0 40px #e7a16510,0 0 35px #d88a4322;text-align:center}\n.in-nodeHead{display:flex;align-items:center;justify-content:space-between;gap:5px;color:var(--in-node);font:9px/1.3 Consolas,'Microsoft YaHei UI',monospace;letter-spacing:.06em;flex:none}.in-nodeHead>span:last-child{letter-spacing:0;max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#d0b5af}.in-entity[data-kind=step] .in-nodeHead{font-size:11px}.in-entity[data-kind=engine] .in-nodeHead{font-size:9px;letter-spacing:.1em}.in-entity strong{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;font-size:15px;line-height:1.25;font-weight:600;color:#eeded9;letter-spacing:.01em}.in-entity[data-kind=step] strong{font-size:21px;line-height:1.28;-webkit-line-clamp:2}.in-entity[data-kind=engine] strong{font-size:23px;line-height:1.3;letter-spacing:.035em;-webkit-line-clamp:2}\n.in-nodeDetail{font-size:10px;color:#bda6b3;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;line-height:1.5;flex:none}.in-entity[data-kind=step] .in-nodeDetail{font-size:11px}.in-entity[data-kind=engine] .in-nodeDetail{font:11px/1.5 Consolas,'Microsoft YaHei UI',monospace;color:#d6b49b}.in-nodeFoot{display:block;border-top:1px solid color-mix(in srgb,var(--in-node) 20%,transparent);padding-top:4px;margin-top:auto;line-height:1.2;font-size:8px;color:#ac939f;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:none}.in-entity[data-kind=step] .in-nodeFoot{font-size:9px;padding-top:6px}.in-entity[data-kind=engine] .in-nodeFoot{color:#c89572;letter-spacing:.06em;font-size:10px}\n.in-entity[data-related=true] .in-labelBody,.in-entity:hover .in-labelBody,.in-entity:focus-visible .in-labelBody{border-color:var(--in-node);background:linear-gradient(140deg,color-mix(in srgb,var(--in-node) 15%,#201624),#130f19f9);box-shadow:inset 0 0 25px color-mix(in srgb,var(--in-node) 8%,transparent),0 0 25px color-mix(in srgb,var(--in-node) 20%,transparent)}\n.in-entity[data-active=true] .in-labelBody{border-color:#ffe0a2;background:linear-gradient(140deg,#5b3525f5,#231721f9);box-shadow:0 0 36px #f0a45055,inset 0 0 22px #ffa95522}.in-entity[data-active=true] .in-nodeHead>span:last-child{color:#ffdaa3}.in-entity[data-active=true] .in-nodeHead>span:last-child::before{content:'';display:inline-block;vertical-align:middle;margin-right:4px;width:4px;height:4px;background:#ffd596;border-radius:50%;box-shadow:0 0 9px #ffa95b;animation:ion-live-pulse 1.3s infinite}.in-entity[data-status=failed] .in-labelBody,.in-entity[data-status=refused] .in-labelBody{background:linear-gradient(140deg,#42212bf0,#1c101cf7);border-color:#bd6c66}.in-entity[data-kind=artifact] .in-labelBody{background:linear-gradient(140deg,#182c28f3,#10161af9)}\n.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) .in-nodeFoot{display:none}.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) strong{font-size:17px}.ic-world[data-network-lod=map] .in-nodeDetail{color:#d3bcc6}\n.in-scopeTabs{display:flex;align-items:center;padding:2px;border:1px solid #644238;border-radius:4px;background:#130e18eF;backdrop-filter:blur(14px)}.in-scopeTabs button{padding:5px 8px;min-height:25px;font-size:10px;border:0;background:transparent;color:#c09fac;cursor:pointer;border-radius:2px;white-space:nowrap}.in-scopeTabs button[aria-pressed=true]{color:#ffdbb7;background:#553022}\n.in-navigation{position:absolute;left:20px;bottom:96px;width:215px;z-index:3;background:linear-gradient(145deg,#1b111de8,#0b0c14e8);border:1px solid #614332;border-top-color:#b77f54;box-shadow:0 12px 35px #0006;border-radius:5px;backdrop-filter:blur(12px);overflow:hidden}.in-navigation>header{display:flex;justify-content:space-between;gap:10px;padding:8px 10px;font:8px/1.4 Consolas,monospace;letter-spacing:.07em;border-bottom:1px solid #51303a;color:#b88a76}.in-navigation>header b{font-weight:400;color:#e3b48a}.in-navigation>svg{display:block;width:100%;height:122px;padding:9px;box-sizing:border-box;overflow:visible}.in-navigation svg line{stroke:#8f5d49;stroke-width:.08;opacity:.5}.in-navigation svg line[data-active=true]{stroke:#ffe0a0;stroke-width:.16;opacity:1}.in-navigation svg circle{fill:#8a779c;stroke:none;cursor:pointer}.in-navigation svg circle[data-kind=step]{fill:#e1a16f;stroke:#eec6a8;stroke-width:.07}.in-navigation svg circle[data-kind=engine]{fill:#ffc78b}.in-navigation svg circle[data-kind=artifact]{fill:#8fd6b2}.in-navigation svg circle[data-kind=material]{fill:#74bbb7}.in-navigation svg circle[data-active=true]{fill:#fff0b8;stroke:#ffb057;stroke-width:.25}.in-navigation svg circle[data-viewed=true]{stroke:#ffe6c8;stroke-width:.3}.in-navigation svg g:hover circle,.in-navigation svg g:focus-visible circle{fill:#ffedde;stroke:#ffce9c;stroke-width:.3}.in-networkCounts{display:flex;justify-content:space-between;gap:6px;padding:7px 9px;border-top:1px solid #46303a;font-size:8px;color:#c4a2a8}.in-legend{display:flex;justify-content:space-between;gap:6px;padding:0 9px 9px;font-size:8px;color:#b79aa6}.in-legend span::before{content:'';display:inline-block;width:4px;height:4px;background:#ab99ba;margin-right:4px}.in-legend [data-type=activity]::before{background:#f2b370}.in-legend [data-type=delivery]::before{background:#8fd6b2}.ic-stage[data-inspector=true] .in-navigation{left:calc(min(390px,43%) + 14px);width:180px}.ic-stage[data-palette=true] .in-navigation{display:none}\n.in-entityDetail{padding:16px;overflow:auto;min-height:0;font-size:12px;line-height:1.75}.in-entityDetail h2{font-size:18px;line-height:1.45;margin:6px 0 9px;color:#f0d6c2;overflow-wrap:anywhere}.in-detailOrigin{font-size:9px;letter-spacing:.04em;color:#b8a2c7;border-left:2px solid #9984b2;padding-left:8px}.in-detailOrigin[data-origin=activity]{color:#e6bb8b;border-color:#e6aa6c}.in-detailOrigin[data-origin=delivery]{color:#9cd9be;border-color:#8fd6b2}.in-detailStatus{display:inline-flex;padding:2px 7px;border:1px solid #66513f;border-radius:3px;font-size:10px;color:#dbba9b;background:#332120}.in-detailStatus[data-status=failed],.in-detailStatus[data-status=refused]{border-color:#99544c;color:#ffb4a5}.in-detailOwner{font-size:10px;color:#b69aa9;margin:12px 0}.in-entityDetail pre{white-space:pre-wrap;overflow-wrap:anywhere;margin:12px 0;padding:12px;background:#0c0a12;border:1px solid #48313f;border-radius:4px;font:11px/1.8 Consolas,'Microsoft YaHei UI',monospace;max-height:340px;overflow:auto;color:#e5d2d0}.in-entityDetail dl{display:grid;grid-template-columns:55px minmax(0,1fr);gap:6px 10px;font-size:10px;margin:16px 0}.in-entityDetail dt{color:#ad91a2}.in-entityDetail dd{margin:0;overflow-wrap:anywhere;color:#dfc3bb}.in-detailActions{display:flex;flex-wrap:wrap;gap:8px;position:sticky;bottom:-16px;padding:12px 0;background:#19111bec;backdrop-filter:blur(12px)}\n@keyframes in-boot{from{opacity:0;filter:brightness(1.8)}to{opacity:1;filter:brightness(1)}}@keyframes in-scan{0%{opacity:.7;transform:translateY(0)}100%{opacity:0;transform:translateY(180px)}}\n@container metis-circuit (max-width:1150px){.in-navigation{width:165px;left:14px;bottom:90px}.in-navigation svg{height:92px}.in-navigation>header{font-size:7px}.in-networkCounts,.in-legend{font-size:7px;gap:3px}.in-scopeTabs{flex-direction:column}.ic-stage[data-inspector=true] .in-navigation{display:none}}\n@container metis-circuit (max-width:850px){.in-navigation{width:135px;bottom:80px;left:10px}.in-navigation>header>span{display:none}.in-navigation svg{height:80px}.in-networkCounts{flex-wrap:wrap}.in-legend{display:none}}\n@media(prefers-reduced-motion:reduce){.in-labelBody,.in-labelBody::after,.in-nodeHead>span:last-child::before{animation:none!important}}\n.ion-labels .in-entity[data-kind=step]{height:168px}.in-entity[data-kind=step] strong{font-size:26px}.in-entity[data-kind=step] .in-nodeHead{font-size:12px}.in-entity[data-kind=step] .in-nodeDetail{font-size:12px}.in-entity[data-kind=engine] strong{font-size:26px}.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) .in-nodeDetail{display:none}.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) strong{font-size:24px;line-height:1.25;margin-top:6px}.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) .in-nodeHead{font-size:12px}\n.in-entity strong{flex:none}.in-labelBody{padding:7px 9px;gap:2px}.in-nodeFoot{padding-top:3px}.in-entity[data-kind=engine] .in-labelBody{padding:14px 20px;gap:6px}\n";
  // METIS_ION_STYLE_END
  // This editor can update while its parent factory is cached. Own metadata
  // transport here so an older parent's URL parser cannot drop query fields.
  async function requestJson(path,body,options={}){
    const url=new URL(path.replace(/^\/+/,''),document.baseURI);
    const response=await fetch(url.pathname+url.search,{method:body===undefined?'GET':'POST',cache:'no-store',credentials:'same-origin',...(options.signal?{signal:options.signal}:{}),...(body===undefined?{}:{headers:{'content-type':'application/json'},body:JSON.stringify(body)})});
    const result=await response.json().catch(error=>{if(options.signal?.aborted)throw options.signal.reason||error;return null;});
    if(!response.ok||result?.ok===false)throw Object.assign(new Error(result?.error||'配置连接失败'),{status:response.status,code:result?.code});
    if(!result)throw new Error('无法读取配置服务响应');
    return result;
  }
  const getJson=(path,options)=>requestJson(path,undefined,options),postJson=(path,body,options)=>requestJson(path,body,options);
  async function readAssistantState(workspaceId,afterRevision,afterDraftHash){
    const options={signal:AbortSignal.timeout(15000)};
    try{return await postJson('/metis/api/v1/composer/assistant/state',{workspaceId,...(afterRevision===undefined?{}:{afterRevision}),afterDraftHash},options);}
    catch(error){
      if(error.status!==405)throw error;
      // Older Hosts expose GET only. The editor's own URL transport preserves
      // these parameters even if its already-cached parent still drops them.
      const query=new URLSearchParams({workspaceId});if(afterRevision!==undefined)query.set('afterRevision',String(afterRevision));if(afterDraftHash)query.set('afterDraftHash',afterDraftHash);
      return getJson('/metis/api/v1/composer/assistant/state?'+query,options);
    }
  }
  const ConfigurationSurface=React.createContext(null);
  function ConfigurationViews({sessionId,useSession,inputActions,renderSlot}){
    const surface=React.useContext(ConfigurationSurface),session=useSession(value=>value);
    const bound=!!surface&&sessionId===surface.sessionId,ready=bound&&session?.openState==='open';
    React.useEffect(()=>{surface?.onConnectionChange?.(ready,bound);return()=>surface?.onConnectionChange?.(false,bound);},[ready,bound,surface?.onConnectionChange]);
    React.useEffect(()=>{if(ready)surface?.onRunningChange?.(session.running);},[ready,session?.running,surface?.onRunningChange]);
    React.useEffect(()=>{if(ready&&surface?.hint?.id){inputActions.setDraft(surface.hint.text);surface.onHintConsumed?.(surface.hint.id);}},[ready,surface?.hint?.id,inputActions]);
    if(!bound)return h('div',{className:'mc-assistantPending',role:'alert'},'编排会话没有正确绑定，请重新连接。');
    if(!ready)return h('div',{className:'mc-assistantPending',role:'status'},'正在连接编排会话…');
    const empty=session.blank&&!session.running&&!session.promptAttempted;
    return h(React.Fragment,null,
      empty?h('section',{className:'mc-configWelcome','aria-label':'开始配置 METIS'},
        h('div',{className:'mc-configWelcomeMark'},h(Wordmark,{size:23})),
        h('h3',null,'一起搭建工作流'),
        h('p',null,'描述您想完成的事，步骤与技能会同步到左侧。'),
        h('div',{className:'mc-configSuggestions'},surface.quickPrompts.map(([label,prompt])=>h('button',{type:'button',key:label,onClick:()=>inputActions.setDraft(prompt)},label)))):null,
      // Keep DSH's native draft-persistence/view lifecycle mounted in blank
      // sessions too; only its empty layout is replaced by the config welcome.
      h('div',{style:{display:empty?'none':'contents'}},renderSlot('conversation.session',{})));
  }
  // The ESM editor can refresh before the owning client factory reloads.
  if(!assistantStore){
    let value={native:null,workspaceSnapshot:null,savedConfiguration:null,workspaceUndo:null};
    const listeners=new Set();
    assistantStore={get:()=>value,subscribe:listener=>{listeners.add(listener);return()=>listeners.delete(listener);},set:patch=>{value={...value,...patch};listeners.forEach(listener=>listener());}};
  }
  const style=`
.mm-panel.mc-panel{position:relative;container:metis-workbench / inline-size;overflow:auto;scrollbar-gutter:auto}
.mc-shell{height:100%;width:100%;min-height:0;padding:20px 24px 24px;display:flex;flex-direction:column;gap:16px}
.mc-top,.mc-toolbar,.mc-actions,.mc-topTools{display:flex;align-items:center;gap:8px;min-width:0}
.mc-top{flex:none;justify-content:space-between;min-height:40px}
.mc-brand{display:flex;align-items:center;gap:10px;min-width:0}
.mc-logo{width:36px;height:36px;display:grid;place-items:center;border:1px solid var(--mm-line);border-radius:10px;color:var(--mm-accent);background:var(--mm-surface);flex:none}
.mc-brand h1{font-size:18px;line-height:24px;font-weight:600;letter-spacing:-.3px;margin:0}
.mc-brand p{font-size:11px;line-height:18px;color:var(--mm-muted);margin:0}
.mc-panel .mm-button,.mc-mini,.mc-tab,.mc-promptTab,.mc-modelTrigger{height:var(--mm-control,36px);min-height:var(--mm-control,36px);border-radius:8px;font:12px/1.4 "Segoe UI","Microsoft YaHei UI",sans-serif;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:0 12px;white-space:nowrap;flex:none}
.mc-panel .mm-button:active{transform:none}
.mc-mini,.mc-tab,.mc-promptTab{border:1px solid var(--mm-line);background:var(--mm-surface);color:var(--mm-muted)}
.mc-mini:hover:not(:disabled),.mc-tab:hover:not(:disabled),.mc-promptTab:hover:not(:disabled){background:var(--mm-soft);color:var(--mm-ink)}
.mc-iconButton{width:36px;padding:0}
.mc-panel .mm-button:disabled,.mc-panel .mc-mini:disabled,.mc-panel .mc-modeTrigger:disabled,.mc-panel .mc-modeOption:disabled,.mc-panel .mc-stepChoice:disabled{cursor:default;opacity:.42}
.mc-panel .mm-theme{height:36px;padding:0 10px;border:1px solid var(--mm-line);border-radius:8px;background:var(--mm-surface)}
.mc-toolbar{flex:none;justify-content:space-between;flex-wrap:wrap;padding:12px;background:var(--mm-surface);border:1px solid var(--mm-line);border-radius:12px;gap:12px}
.mc-modeField{display:flex;align-items:center;gap:12px;flex:1;min-width:230px}
.mc-modePicker{position:relative;flex:1;min-width:0;max-width:340px}
.mc-modeTrigger{height:36px;display:flex;align-items:center;gap:10px;min-width:0;width:100%;padding:0 10px;border:1px solid var(--mm-line);border-radius:8px;background:var(--mm-bg);color:var(--mm-ink);font:13px "Segoe UI","Microsoft YaHei UI",sans-serif;text-align:left}
.mc-modeTrigger>span{flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.mc-modeTrigger>svg{flex:none;color:var(--mm-muted)}
.mc-modeTrigger[aria-expanded=true]{border-color:var(--mm-accent)}
.mc-modeMenu{position:absolute;top:calc(100% + 8px);left:0;z-index:20;width:100%;display:flex;flex-direction:column;max-height:min(460px,65cqh);overflow:hidden;border:1px solid var(--mm-line);border-radius:10px;background:var(--mm-surface);box-shadow:0 12px 32px #00000026}
.mc-modeSearch{flex:none;height:36px;min-width:0;margin:8px;width:calc(100% - 16px);padding:0 10px;border:1px solid var(--mm-line);border-radius:8px;background:var(--mm-bg);color:var(--mm-ink);font:12px "Segoe UI","Microsoft YaHei UI",sans-serif}
.mc-modeGroups{min-height:0;overflow:auto;padding:0 6px 6px;scrollbar-width:thin}
.mc-modeGroup h3{margin:0;padding:8px 10px 4px;color:var(--mm-muted);font-size:11px;line-height:18px;font-weight:500}
.mc-modeRow{position:relative;display:flex;align-items:center;gap:2px;border-radius:7px}
.mc-modeRow:hover,.mc-modeRow:focus-within{background:var(--mm-soft)}
.mc-modeRow[data-dragging=true]{opacity:.45}
.mc-modeRow[data-drop-edge]::after{position:absolute;left:4px;right:4px;height:2px;content:"";background:var(--mm-accent);border-radius:2px;pointer-events:none}
.mc-modeRow[data-drop-edge=before]::after{top:0}
.mc-modeRow[data-drop-edge=after]::after{bottom:0}
.mc-modeRow .mc-modeGrip{height:32px;min-height:32px;width:24px;padding:0;border:0;background:transparent;color:var(--mm-muted);cursor:grab;flex:none}
.mc-modeRow .mc-modeGrip:active{cursor:grabbing}
.mc-modeSortHint{flex:none;margin:0;padding:8px 10px;border-top:1px solid var(--mm-line);font-size:10px;line-height:18px;color:var(--mm-muted)}
.mc-modeSortHint.is-error{color:var(--dsw-alias-state-error-primary)}
.mc-modeOption{display:flex;align-items:center;gap:8px;flex:1;min-width:0;height:36px;padding:0 10px;border:0;border-radius:7px;background:transparent;color:var(--mm-ink);font:12px "Segoe UI","Microsoft YaHei UI",sans-serif;text-align:left}
.mc-modeOption>span{min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.mc-modeOption>svg{flex:none;color:var(--mm-accent)}
.mc-modeOption[aria-pressed=true]{color:var(--mm-accent)}
.mc-modeRow .mc-modeDelete,.mc-modeRow .mc-modeEdit{width:28px;height:32px;min-height:32px;margin-right:2px;padding:0;border-color:transparent;background:transparent;flex:none;color:var(--mm-muted)}
.mc-modeRow .mc-modeDelete:hover:not(:disabled){color:var(--dsw-alias-state-error-primary);background:var(--mm-surface)}
.mc-modeDialogBackdrop{position:absolute;inset:0;z-index:40;display:grid;place-items:center;padding:20px;background:#00000038}
.mc-modeDialog{width:min(480px,100%);max-height:100%;min-height:0;display:flex;flex-direction:column;overflow:hidden;border:1px solid var(--mm-line);border-radius:12px;background:var(--mm-surface);box-shadow:0 18px 56px #00000040}
.mc-modeDialog .mc-columnHeader{height:auto;min-height:64px}
.mc-modeDialog h2{white-space:normal;overflow-wrap:anywhere}
.mc-modeDialog .mc-content{flex:initial}
.mc-modeDialog .mc-field:last-child{margin-bottom:0}
.mc-modeDialog .mc-field textarea{min-height:88px;max-height:160px}
.mc-modeDialog .mc-editorFooter{height:auto;min-height:64px;flex-wrap:wrap;justify-content:flex-end}
.mc-danger{color:var(--dsw-alias-state-error-primary)!important;border-color:currentColor!important}
.mc-saveState{flex:none;min-width:92px;font-size:11px;color:var(--mm-muted);white-space:nowrap}
.mc-saveState.is-dirty{color:var(--mm-accent)}
.mc-actions{flex-wrap:wrap;gap:8px}
.mc-toolbarActions .mm-button{min-width:80px}
.mc-grid{flex:1;min-height:380px;display:grid;grid-template-columns:208px minmax(0,1fr);overflow:hidden;border:1px solid var(--mm-line);border-radius:12px;background:var(--mm-surface)}
.mc-grid.has-assistant{grid-template-columns:208px minmax(300px,1fr) minmax(360px,440px)}
.mc-nativeConversation{flex:1;min-height:0;min-width:0;display:flex;flex-direction:column;overflow:hidden}
.mc-nativeConversation>div{flex:1;min-height:0;min-width:0}
.mc-assistantHeader{gap:12px}
.mc-assistantHeader>.mc-assistantHeading{flex:1;overflow:hidden;min-width:0}
.mc-assistantHeaderActions{display:flex;align-items:center;gap:6px;flex:none}
.mc-assistantHeaderActions>button{height:32px;min-height:32px;padding:0 12px;white-space:nowrap;font-size:12px}
.mc-assistantHeaderActions>.mc-iconButton{width:32px;min-width:32px;padding:0}
.mc-assistantHeader .mc-caption{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mc-assistantTitle{display:flex;align-items:center;gap:8px;min-width:0}
.mc-assistantDot{width:6px;height:6px;border-radius:50%;flex:none;background:var(--mm-muted);opacity:.7}
.mc-assistantDot[data-state=ready],.mc-assistantDot[data-state=running]{background:var(--mm-accent);opacity:1}
.mc-assistantDot[data-state=error]{background:var(--dsw-alias-state-error-primary)}
.mc-assistantNotice{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin:10px 12px 0;padding:9px 10px;border:1px solid var(--mm-line);border-radius:8px;background:var(--mm-soft);font-size:12px;line-height:1.6;color:var(--mm-muted);flex:none}
.mc-assistantNotice>div{min-width:0}
.mc-assistantNotice.is-error{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 24%,var(--mm-line))}
.mc-assistantNotice details{font-size:11px;margin-top:2px}
.mc-assistantNotice summary{cursor:pointer}
.mc-assistantNotice p{margin:6px 0 0;overflow-wrap:anywhere;white-space:pre-wrap}
.mc-assistantNotice>button{flex:none;border:0;border-radius:5px;padding:4px;background:transparent;color:var(--mm-ink);font:inherit;font-size:12px;cursor:pointer}
.mc-assistantNotice>button:hover{color:var(--mm-accent)}
.mc-assistantSync{padding:5px 14px;font-size:11px;color:var(--mm-muted);flex:none}
.mc-assistantPending{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;min-height:0;padding:24px;text-align:center;font-size:12px;line-height:1.7;color:var(--mm-muted)}
.mc-assistantPending p{margin:0}
.mc-assistantPending details{max-width:100%;text-align:left;overflow-wrap:anywhere;font-size:11px}
.mc-assistantLoader{width:16px;height:16px;border:2px solid var(--mm-line);border-top-color:var(--mm-accent);border-radius:50%;animation:mc-assistant-spin 1s linear infinite}
@keyframes mc-assistant-spin{to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){.mc-assistantLoader{animation:none}}
.mc-configWelcome{flex:1;min-height:180px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:32px 20px 24px;gap:10px}
.mc-configWelcomeMark{display:grid;place-items:center;width:40px;height:40px;border:1px solid var(--mm-line);border-radius:12px;color:var(--mm-accent);background:var(--mm-soft);margin-bottom:4px}
.mc-configWelcome h3{font-size:16px;font-weight:600;line-height:24px;color:var(--mm-ink);margin:0}
.mc-configWelcome p{max-width:250px;font-size:12px;line-height:1.8;color:var(--mm-muted);margin:0}
.mc-configSuggestions{display:flex;justify-content:center;flex-wrap:wrap;gap:8px;margin-top:8px;max-width:300px}
.mc-configSuggestions button{min-height:30px;padding:5px 10px;border:1px solid var(--mm-line);border-radius:7px;background:transparent;color:var(--mm-ink);font:12px/1.5 "Segoe UI","Microsoft YaHei UI",sans-serif;cursor:pointer}
.mc-configSuggestions button:hover{background:var(--mm-soft);border-color:color-mix(in srgb,var(--mm-accent) 45%,var(--mm-line))}
.mc-nativeConversation [data-conversation-content]{background:transparent}
.mc-nativeConversation [data-composer-seat]{margin-top:auto}
.mc-nativeProposal{flex:none;min-height:0;max-height:38%;overflow:auto;padding:8px 12px;border-top:1px solid var(--mm-line)}
.mc-nativeProposal .mc-suggestion{margin:0}
.mc-nativeFooter{padding:6px 12px;margin:0;flex:none}
.mc-flow,.mc-editor,.mc-assistant{min-height:0;min-width:0;display:flex;flex-direction:column;overflow:hidden}
.mc-flow{background:color-mix(in srgb,var(--mm-bg) 64%,var(--mm-surface));border-right:1px solid var(--mm-line)}
.mc-editor{background:var(--mm-surface)}
.mc-assistant{background:var(--mm-surface);border-left:1px solid var(--mm-line);position:relative;font-family:"Segoe UI","Microsoft YaHei UI",sans-serif}
.mc-columnHeader{height:64px;min-height:64px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;border-bottom:1px solid var(--mm-line);flex:none}
.mc-columnHeader>div:first-child{min-width:0}
.mc-columnHeader h2{font-size:14px;font-weight:600;line-height:22px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mc-caption{font-size:11px;line-height:18px;color:var(--mm-muted)}
.mc-stepManage{display:flex;gap:4px;flex:none}
.mc-flowSummary{height:44px;min-height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid var(--mm-line);color:var(--mm-muted);font-size:11px}
.mc-stepNav{min-height:0;overflow:auto;display:flex;flex-direction:column;gap:4px;padding:8px;scrollbar-width:thin}
.mc-stepNav button{min-height:60px;flex:none;width:100%;min-width:0;display:flex;align-items:center;gap:10px;text-align:left;padding:10px;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--mm-muted);font:12px/1.6 "Segoe UI","Microsoft YaHei UI",sans-serif}
.mc-stepNav button:hover:not(:disabled){background:var(--mm-soft)}
.mc-stepNav button[aria-current=step]{background:var(--mm-surface);border-color:color-mix(in srgb,var(--mm-accent) 34%,var(--mm-line));color:var(--mm-ink);box-shadow:0 1px 3px #00000004}
.mc-stepIndex{font-size:11px;flex:none;width:24px;height:24px;border-radius:6px;display:grid;place-items:center;background:var(--mm-soft);color:var(--mm-muted);font-variant-numeric:tabular-nums}
[aria-current=step] .mc-stepIndex,[aria-current=page] .mc-stepIndex{background:color-mix(in srgb,var(--mm-accent) 12%,var(--mm-surface));color:var(--mm-accent)}
.mc-stepLabel{min-width:0;flex:1}
.mc-stepLabel strong{display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:12px;font-weight:500}
.mc-stepLabel small{display:block;color:var(--mm-muted);font-size:10px;line-height:17px}
.mc-workflowNav .mc-stepRow{position:relative;display:flex;align-items:center;flex:none;min-width:0;min-height:60px;border:1px solid transparent;border-radius:8px;color:var(--mm-muted)}
.mc-workflowNav .mc-stepRow:hover{background:var(--mm-soft)}
.mc-workflowNav .mc-stepRow.is-current{background:var(--mm-surface);border-color:color-mix(in srgb,var(--mm-accent) 34%,var(--mm-line));color:var(--mm-ink);box-shadow:0 1px 3px #00000004}
.mc-workflowNav .mc-stepRow .mc-stepChoice{flex:1;align-self:stretch;width:0;min-height:58px;border:0;background:transparent;color:inherit;box-shadow:none;padding:8px}
.mc-workflowNav .mc-stepRow .mc-stepGrip{flex:none;width:24px;height:36px;min-height:36px;margin-left:4px;padding:0;display:grid;place-items:center;gap:0;border:0;background:transparent;color:var(--mm-muted);cursor:grab}
.mc-workflowNav .mc-stepRow .mc-stepGrip:hover:not(:disabled){color:var(--mm-accent)}
.mc-workflowNav .mc-stepRow .mc-stepGrip:active{cursor:grabbing}
.mc-workflowNav .mc-stepRow[data-dragging=true]{opacity:.45}
.mc-workflowNav .mc-stepRow[data-drop-edge]::after{position:absolute;content:"";background:var(--mm-accent);border-radius:2px;pointer-events:none}
.mc-workflowNav .mc-stepRow[data-drop-axis=y]::after{left:4px;right:4px;height:2px}
.mc-workflowNav .mc-stepRow[data-drop-axis=y][data-drop-edge=before]::after{top:0}
.mc-workflowNav .mc-stepRow[data-drop-axis=y][data-drop-edge=after]::after{bottom:0}
.mc-workflowNav .mc-stepRow[data-drop-axis=x]::after{top:4px;bottom:4px;width:2px}
.mc-workflowNav .mc-stepRow[data-drop-axis=x][data-drop-edge=before]::after{left:0}
.mc-workflowNav .mc-stepRow[data-drop-axis=x][data-drop-edge=after]::after{right:0}
.mc-flowFoot{margin-top:auto;padding:12px 16px;font-size:10px;line-height:1.8;color:var(--mm-muted);border-top:1px solid var(--mm-line);flex:none}
.mc-tabs{height:44px;min-height:44px;display:flex;gap:20px;padding:0 20px;border-bottom:1px solid var(--mm-line);flex:none}
.mc-tab{height:44px;min-height:44px;padding:0;border:0;border-bottom:2px solid transparent;border-radius:0;background:transparent;color:var(--mm-muted)}
.mc-tab[aria-selected=true]{border-color:var(--mm-accent);color:var(--mm-accent);font-weight:600}
.mc-content{flex:1;min-height:0;overflow:auto;padding:20px;scrollbar-width:thin}
.mc-stepFieldset{min-width:0;margin:0;border:0;padding:0}
.mc-field{margin:0 0 20px;min-width:0}
.mc-label{display:block;color:var(--mm-ink);font-size:12px;line-height:20px;margin-bottom:8px}
.mc-field input,.mc-field select,.mc-field textarea{width:100%;min-width:0;border:1px solid var(--mm-line);border-radius:8px;background:var(--mm-bg);color:var(--mm-ink);font:13px/1.8 "Segoe UI","Microsoft YaHei UI",sans-serif;padding:8px 10px;outline-offset:2px}
.mc-field input,.mc-field select{height:36px;padding:0 10px}
.mc-field textarea{min-height:160px;resize:vertical}
.mc-field textarea[aria-label="本步提示词"]{min-height:280px}
.mc-simpleStep textarea[aria-label="主要目的"],.mc-simpleStep textarea[aria-label="交付内容"],.mc-simpleStep textarea[aria-label="Word 排版要求"]{min-height:84px}
.mc-simpleStep textarea[aria-label="步骤提示词"]{min-height:200px}
.mc-simpleStep textarea[aria-label="禁止事项"],.mc-simpleStep textarea[aria-label="达标补充要求"]{min-height:84px}
.mc-loopToggle{display:flex;align-items:center;gap:8px;margin:10px 0;color:var(--mm-muted);font-size:12px;cursor:pointer}
.mc-field .mc-loopToggle input{width:15px;height:15px;min-width:15px;padding:0;flex:none;accent-color:var(--mm-accent)}
.mc-boundSkills{display:flex;flex-direction:column;gap:8px;margin-bottom:10px}
.mc-boundSkill{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;border:1px solid var(--mm-line);border-radius:8px;background:var(--mm-bg)}
.mc-boundSkill>span{min-width:0;overflow-wrap:anywhere;font-size:12px}
.mc-boundSkill>.mc-mini{height:28px;min-height:28px;padding:0 8px}
.mc-stepSkillPicker{margin-top:12px}
.mc-finalOutput{margin-top:12px;padding:12px 12px 0;border:1px solid var(--mm-line);border-radius:8px;background:var(--mm-bg)}
.mc-finalOutput>.mc-field{margin-bottom:12px}
.mc-field small{display:block;font-size:11px;line-height:1.8;color:var(--mm-muted);margin-top:6px}
.mc-note{font-size:12px;line-height:1.9;color:var(--mm-muted);margin:0 0 16px}
.mc-parameters{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 16px}
.mc-stageBinding,.mc-modeDefaults,.mc-preview{font-size:12px;color:var(--mm-muted);padding-top:16px;margin-top:20px;border-top:1px solid var(--mm-line)}
.mc-stageBinding summary,.mc-modeDefaults summary,.mc-preview summary{cursor:pointer;line-height:22px;margin-bottom:12px}
.mc-checkGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.mc-check{display:flex;align-items:flex-start;gap:10px;padding:12px;min-width:0;height:84px;overflow:hidden;font-size:12px;line-height:1.7;border:1px solid var(--mm-line);border-radius:8px;cursor:pointer;background:var(--mm-bg)}
.mc-check.is-bound{border-color:color-mix(in srgb,var(--mm-accent) 38%,var(--mm-line));background:color-mix(in srgb,var(--mm-accent) 5%,var(--mm-surface))}
.mc-check input{width:15px;height:15px;margin:3px 0 0;accent-color:var(--mm-accent);flex:none}
.mc-check span{min-width:0}
.mc-check strong{font-weight:500;color:var(--mm-ink);font-size:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.mc-check small{display:block;color:var(--mm-muted);font-size:10px;overflow-wrap:anywhere}
.mc-skillCard{min-width:0}
.mc-libraryEntries{display:grid;gap:8px;margin:12px 0 20px;max-height:300px;overflow:auto;scrollbar-width:thin}
.mc-libraryEntry.mm-button{height:auto;min-height:76px;display:block;width:100%;padding:12px;text-align:left;white-space:normal}
.mc-libraryEntry[aria-pressed=true]{border-color:var(--mm-accent);background:var(--mm-soft)}
.mc-libraryEntry strong,.mc-libraryEntry small{display:block;overflow-wrap:anywhere}
.mc-libraryEntry small{margin-top:4px;color:var(--mm-muted);font-size:11px}
.mc-libraryEntry p{margin:5px 0;color:var(--mm-muted);font-size:12px;line-height:1.6}
.mc-sourceTree .mc-stepLabel strong{white-space:normal;overflow-wrap:anywhere}
.mc-sourceTree summary{padding:10px;cursor:pointer;color:var(--mm-muted);font-size:12px}
.mc-promptTabs{display:flex;gap:6px;margin-bottom:16px;padding:4px;background:var(--mm-bg);border:1px solid var(--mm-line);border-radius:10px}
.mc-promptTab{flex:1;min-width:0;border-color:transparent;background:transparent}
.mc-promptTab[aria-selected=true]{background:var(--mm-surface);border-color:var(--mm-line);color:var(--mm-ink)}
.mc-preview pre,.mc-change pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:300px;overflow:auto;padding:12px;background:var(--mm-bg);border:1px solid var(--mm-line);border-radius:8px;font:11px/1.9 "Cascadia Code",Consolas,"Microsoft YaHei UI",monospace}
.mc-editorFooter{height:64px;min-height:64px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;border-top:1px solid var(--mm-line);flex:none}
.mc-editorFooter>div{display:flex;gap:8px}
.mc-editorFooter .mm-button{min-width:80px}
.mc-status{flex:none;padding:10px 12px;border:1px solid var(--mm-line);border-radius:8px;background:var(--mm-surface);color:var(--mm-muted);font-size:12px;line-height:1.8;overflow-wrap:anywhere;max-height:74px;overflow:auto}
.mc-status.is-error,.mc-chatError{color:var(--dsw-alias-state-error-primary)}
.mc-emptyFlow{padding:36px 12px;text-align:center}
.mc-emptyFlow h3{font-size:18px;margin:0 0 12px;font-weight:500}
.mc-effortRow{display:flex;align-items:center;gap:12px;padding:8px 12px;border-top:1px solid var(--mm-line);flex:none;font-size:11px;color:var(--mm-muted)}
.mc-effortRow select{flex:1;min-width:0;height:36px;border:1px solid var(--mm-line);border-radius:8px;padding:0 8px;background:var(--mm-bg);color:var(--mm-ink);font:12px "Segoe UI","Microsoft YaHei UI",sans-serif}
.mc-chatHint{margin:8px 0 0}
.mc-chatError,.mc-inlineStatus{font-size:12px;line-height:1.8;padding:10px 12px;border:1px solid var(--mm-line);border-radius:8px;background:var(--mm-bg);margin-bottom:12px;overflow-wrap:anywhere}
.mc-suggestion{padding:12px;margin-top:12px;border:1px solid color-mix(in srgb,var(--mm-accent) 30%,var(--mm-line));border-radius:8px;background:color-mix(in srgb,var(--mm-accent) 4%,var(--mm-surface))}
.mc-suggestion strong{font-size:12px;font-weight:600}
.mc-suggestion details{font-size:11px;line-height:1.8;margin-top:8px}
.mc-suggestion summary{cursor:pointer;color:var(--mm-muted)}
.mc-suggestion .mm-button{margin-top:10px;width:100%}
.mc-change{padding:8px 0;border-bottom:1px solid var(--mm-line)}
.mc-change:last-child{border:0}
.mc-change b{font-size:11px;font-weight:500}
.mc-change pre{font:11px/1.8 "Segoe UI","Microsoft YaHei UI",sans-serif;max-height:160px;padding:8px;margin:4px 0 8px}
.mc-diffLabel{font-size:10px;color:var(--mm-muted)}
.mc-diffAfter{color:var(--mm-accent)}
.mc-compactTabs{display:none}
.mc-libraryTabs{display:flex;align-items:center;gap:8px;flex-wrap:wrap;flex:none}
.mc-libraryTabs [aria-selected=true]{background:var(--mm-soft);color:var(--mm-accent);border-color:var(--mm-accent)}
.mc-stepNav button[aria-current=page]{background:var(--mm-surface);border-color:var(--mm-accent);color:var(--mm-ink)}
.mc-resourceInfo{white-space:pre-wrap;overflow-wrap:anywhere;font:11px/1.8 Consolas,monospace;max-height:300px;overflow:auto}
.mc-archiveRow{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:8px}
.mc-archiveRow span{min-width:0;overflow-wrap:anywhere}
.mc-meta{font-size:11px;line-height:1.8;color:var(--mm-muted);margin-bottom:16px}
.mc-readonlyText{font-family:"Cascadia Code",Consolas,"Microsoft YaHei UI",monospace!important}
.mc-sessionVersionCard{border:1px solid var(--mm-line);border-radius:8px;padding:12px;margin:12px 0}
.mc-sessionVersionTitle{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:12px;margin-bottom:8px}
.mc-sessionVersionCard code,.mc-versionPath{display:block;overflow-wrap:anywhere;font:11px/1.8 Consolas,monospace;color:var(--mm-muted);margin-bottom:8px}
.mc-legacyBinding{border-top:1px solid var(--mm-line);padding-top:12px;margin-top:12px}
.mc-legacyAck{display:flex;align-items:flex-start;gap:8px;font-size:11px;line-height:1.8;color:var(--mm-muted);margin:12px 0}
.mc-legacyAck input{margin-top:4px;accent-color:var(--mm-accent)}
/* Workbench design: one action hierarchy and a shared spacing/size system. */
.mc-panel.mc-panel,.mc-panel.mc-panel button,.mc-panel.mc-panel input,.mc-panel.mc-panel select,.mc-panel.mc-panel textarea{font-family:var(--dsw-font-family,system-ui,"Microsoft YaHei","Segoe UI",sans-serif)}
.mc-panel{--mc-focus:var(--dsw-focus-ring-color,var(--mm-accent))}
.mc-panel button:focus-visible,.mc-panel summary:focus-visible{outline-color:var(--mc-focus)}
.mc-assistantDot,.mc-saveState:before,.mc-assistantLoader,.mc-loopToggle input,.mc-loopToggle input:before{corner-shape:round}
.mm-panel.mc-panel{--mm-control:36px;--mc-field:color-mix(in srgb,var(--mm-surface) 72%,var(--mm-bg));--mc-shadow:0 8px 28px #00000012;font-size:13px;line-height:1.65}
.mc-shell{padding:20px;gap:12px;isolation:isolate}
.mc-top{min-height:46px;gap:12px}
.mc-brand{gap:12px}.mc-logo{width:38px;height:38px;border-radius:12px;background:color-mix(in srgb,var(--mm-accent) 5%,var(--mm-surface))}
.mc-brand h1{font-size:18px;line-height:26px;letter-spacing:-.4px}.mc-brand p{font-size:12px;line-height:19px}
.mc-panel .mm-button,.mc-mini,.mc-modelTrigger{font-size:13px;border-radius:8px;transition:background 150ms,border-color 150ms,color 150ms,box-shadow 150ms}
.mc-panel button:focus-visible,.mc-panel summary:focus-visible{outline:2px solid var(--mc-focus,var(--mm-accent));outline-offset:3px}
.mc-topTools{gap:8px}.mc-saveButton{min-width:128px;height:38px!important;min-height:38px!important;box-shadow:0 1px 3px #0000000c}
.mc-toolbar{padding:0;border:0;border-radius:0;background:transparent;min-height:38px;gap:12px;overflow:visible}
.mc-modeField{min-width:0;gap:8px}.mc-modePicker{max-width:320px}.mc-modeTrigger{height:36px;font-size:13px;background:var(--mm-surface);padding-inline:12px}
.mc-saveState{display:inline-flex;align-items:center;gap:6px;min-width:58px;font-size:12px;color:var(--mm-muted)}
.mc-saveState:before{content:"";width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.55;flex:none}
.mc-saveState.is-dirty{color:var(--mm-ink)}.mc-saveState.is-justSaved{color:var(--mm-accent);transition:color 180ms}.mc-saveState.is-dirty:before{background:var(--dsw-alias-state-warning-primary,#b08743);opacity:1}
.mc-toolbarActions{gap:8px}.mc-toolbarActions .mm-button{min-width:0}.mc-aiToggle[aria-pressed=true]{color:var(--mm-accent);border-color:color-mix(in srgb,var(--mm-accent) 30%,var(--mm-line));background:color-mix(in srgb,var(--mm-accent) 5%,var(--mm-surface))}
.mc-panel .mc-modeToggle{font-size:12px!important;padding-inline:10px;height:36px;gap:8px;background:transparent;border-color:transparent}
.mc-more{position:relative;flex:none}.mc-more>summary{list-style:none;cursor:pointer;user-select:none;background:var(--mm-surface);color:var(--mm-muted)}.mc-more>summary::-webkit-details-marker{display:none}.mc-more[open]>summary{border-color:var(--mm-accent);color:var(--mm-ink)}
.mc-moreMenu{position:absolute;right:0;top:calc(100% + 8px);width:204px;z-index:25;padding:6px;display:grid;gap:2px;border:1px solid var(--mm-line);border-radius:10px;background:var(--mm-surface);box-shadow:var(--mc-shadow);animation:mc-enter 160ms ease-out}
.mc-moreMenu .mm-button{width:100%;min-width:0;justify-content:flex-start;border:0;background:transparent;padding-inline:12px;font-size:13px}.mc-moreMenu .mm-button:hover:not(:disabled){background:var(--mm-soft)}.mc-moreMenu .mc-menuDanger{color:var(--dsw-alias-state-error-primary,#b44949);border-top:1px solid var(--mm-line);border-radius:0 0 6px 6px;margin-top:3px}
.mc-libraryTabs{align-self:flex-start;gap:2px;padding:3px;border:1px solid var(--mm-line);border-radius:10px;background:var(--mm-soft)}
.mc-libraryTabs .mc-mini{height:30px;min-height:30px;padding-inline:16px;border:1px solid transparent;border-radius:7px;background:transparent;color:var(--mm-muted)}
.mc-libraryTabs [aria-selected=true]{border-color:var(--mm-line);background:var(--mm-surface);color:var(--mm-ink);box-shadow:0 1px 3px #00000008}
.mc-grid{min-height:340px;grid-template-columns:192px minmax(0,1fr);border-radius:12px;box-shadow:0 2px 10px #00000004}
.mc-grid.has-assistant{grid-template-columns:192px minmax(320px,1fr) minmax(360px,420px)}
.mc-flow{background:color-mix(in srgb,var(--mm-bg) 45%,var(--mm-surface))}.mc-assistant{background:color-mix(in srgb,var(--mm-bg) 16%,var(--mm-surface))}
.mc-columnHeader{height:64px;min-height:64px;padding:12px 18px;gap:10px}.mc-columnHeader h2{font-size:14px;line-height:22px}.mc-caption{font-size:12px;line-height:19px}
.mc-flowSummary{height:38px;min-height:38px;font-size:12px;padding-inline:16px;border-bottom:0}.mc-flowSummary>span:last-child{font-size:11px}
.mc-stepNav{padding:6px 10px;gap:6px}.mc-workflowNav .mc-stepRow{min-height:66px;transition:background 150ms,border-color 150ms,box-shadow 150ms}
.mc-workflowNav .mc-stepRow.is-current{box-shadow:inset 2px 0 var(--mm-accent),0 2px 5px #00000004;border-color:color-mix(in srgb,var(--mm-accent) 25%,var(--mm-line));background:var(--mm-surface)}
.mc-workflowNav .mc-stepRow .mc-stepChoice{min-height:64px;padding:9px 8px;gap:9px}.mc-stepIndex{width:25px;height:25px;font-size:11px;border-radius:7px}.mc-stepLabel strong{font-size:13px;line-height:20px;font-weight:550}.mc-stepLabel small{font-size:11px;line-height:18px;margin-top:3px}
.mc-workflowNav .mc-stepRow .mc-stepGrip{width:18px;margin-left:3px;opacity:.45}.mc-workflowNav .mc-stepRow:hover .mc-stepGrip,.mc-stepGrip:focus-visible{opacity:1}
.mc-flowFoot{padding:13px 16px;font-size:11px;line-height:1.8;border-top-color:transparent}
.mc-stepManage .mc-iconButton{width:30px;height:32px;min-height:32px;border-color:transparent;background:transparent}.mc-stepManage .mc-iconButton:hover:not(:disabled){border-color:var(--mm-line)}
.mc-content{padding:24px;overscroll-behavior:contain;scrollbar-gutter:stable}.mc-simpleStep{max-width:760px;margin-inline:auto}.mc-field{margin-bottom:22px}.mc-label{font-size:13px;font-weight:550;line-height:21px;margin-bottom:8px}
.mc-field input,.mc-field select,.mc-field textarea{border-radius:8px;background:var(--mc-field);font-size:13px;line-height:1.8;padding:10px 12px;border-color:color-mix(in srgb,var(--mm-line) 85%,var(--mm-surface));transition:border-color 150ms,box-shadow 150ms,background 150ms}
.mc-field input,.mc-field select{height:38px;padding-block:0}.mc-field input:hover:not(:disabled),.mc-field select:hover:not(:disabled),.mc-field textarea:hover:not(:disabled){border-color:color-mix(in srgb,var(--mm-ink) 28%,var(--mm-line))}
.mc-field input:focus,.mc-field select:focus,.mc-field textarea:focus{border-color:var(--mc-focus,var(--mm-accent));box-shadow:0 0 0 3px color-mix(in srgb,var(--mc-focus,var(--mm-accent)) 9%,transparent);outline:0;background:var(--mm-surface)}
.mc-field input::placeholder,.mc-field textarea::placeholder{color:var(--mm-muted);opacity:.72}
.mc-simpleStep textarea{field-sizing:content;max-height:none;resize:vertical}.mc-simpleStep textarea[aria-label="主要目的"],.mc-simpleStep textarea[aria-label="交付内容"]{min-height:92px}.mc-simpleStep textarea[aria-label="步骤提示词"]{min-height:156px;line-height:1.9}.mc-simpleStep textarea[aria-label="禁止事项"],.mc-simpleStep textarea[aria-label="达标补充要求"]{min-height:78px}
.mc-loopToggle{display:flex;gap:10px;padding:10px 0 2px;margin:0;align-items:center;color:var(--mm-ink)}.mc-loopToggle>span{min-width:0}.mc-loopToggle strong{font-size:12px;font-weight:500;line-height:20px}.mc-loopToggle small{font-size:11px;line-height:18px;margin:1px 0 0;color:var(--mm-muted)}
.mc-fieldHeader{display:flex;align-items:center;gap:12px;margin-bottom:8px}.mc-fieldHeader>.mc-label{margin-bottom:0}.mc-fieldHeader>.mc-loopToggle{padding:0;margin:0;gap:6px;flex:none}
.mc-field .mc-loopToggle input{appearance:none;-webkit-appearance:none;position:relative;width:30px;min-width:30px;height:18px;padding:0;margin:0;border-radius:12px;background:var(--mm-line);border:1px solid transparent;cursor:pointer;transition:background 160ms;box-shadow:none}
.mc-field .mc-loopToggle input:before{position:absolute;content:"";width:12px;height:12px;top:2px;left:2px;background:var(--mm-muted);border-radius:50%;transition:transform 160ms,background 160ms}.mc-field .mc-loopToggle input:checked{background:var(--mm-accent)}.mc-field .mc-loopToggle input:checked:before{background:var(--mm-cta-ink);transform:translateX(12px)}.mc-field .mc-loopToggle input:focus-visible{outline:2px solid var(--mc-focus,var(--mm-accent));outline-offset:3px}
.mc-loopOptions{padding:12px 0 0 40px;animation:mc-enter 160ms ease-out}.mc-loopOptions .mc-field{margin-bottom:0}.mc-loopOptions .mc-label{font-size:12px;color:var(--mm-muted);font-weight:400}
.mc-boundSkills{flex-direction:row;flex-wrap:wrap;gap:6px;margin-bottom:10px}.mc-boundSkill{max-width:100%;gap:8px;padding:4px 6px 4px 10px;border-radius:7px;background:color-mix(in srgb,var(--mm-accent) 4%,var(--mm-surface))}.mc-boundSkill>span{font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-boundSkill>.mc-mini{min-height:24px;height:24px;padding-inline:6px;border:0;background:transparent;font-size:11px}
.mc-finalOutput{padding:14px 14px 0;background:color-mix(in srgb,var(--mm-bg) 55%,var(--mm-surface));border-radius:10px}.mc-note{font-size:12px;line-height:1.8}.mc-field small{font-size:11px;line-height:1.8}.mc-check{min-height:88px;height:auto}.mc-check strong{font-size:13px}.mc-check small{font-size:11px}
.mc-editorFooter{height:56px;min-height:56px;padding:10px 18px;background:var(--mm-surface)}.mc-editorFooter .mm-button{height:32px;min-height:32px;min-width:72px;font-size:12px}
.mc-assistantHeader{padding-inline:16px}.mc-assistantTitle{gap:7px}.mc-connectionLabel{font-size:10px;color:var(--mm-muted);white-space:nowrap;margin-left:2px}.mc-assistantHeader .mc-caption{font-size:11px;line-height:18px;margin-top:2px}.mc-assistantHeaderActions>.mc-iconButton{border-color:transparent;background:transparent}.mc-assistantHeaderActions>.mc-iconButton:hover{border-color:var(--mm-line)}
.mc-configWelcome{padding:28px 20px;gap:9px}.mc-configWelcomeMark{width:42px;height:42px;border-radius:13px;background:color-mix(in srgb,var(--mm-accent) 5%,var(--mm-surface))}.mc-configWelcome h3{font-size:16px}.mc-configWelcome p{font-size:12px}.mc-configSuggestions{gap:6px}.mc-configSuggestions button{min-height:30px;background:var(--mm-surface);font-size:12px;transition:background 150ms,border-color 150ms}
.mc-assistantSync{font-size:11px;line-height:18px;padding:4px 16px;min-height:26px;color:var(--mm-muted)}
.mc-toast{position:absolute;left:24px;right:auto;bottom:22px;pointer-events:none;z-index:45;display:flex;align-items:flex-start;gap:9px;max-width:min(460px,calc(100% - 32px));max-height:180px;padding:11px 10px 11px 14px;background:var(--mm-surface);border-radius:10px;box-shadow:var(--mc-shadow);border-color:color-mix(in srgb,var(--mm-accent) 24%,var(--mm-line));animation:mc-enter 180ms ease-out;font-size:12px;line-height:1.8}
.mc-toast>svg{flex:none;margin-top:3px;color:var(--mm-accent)}.mc-toast>span{min-width:0;flex:1}.mc-toast .mc-iconButton{pointer-events:auto;width:24px;height:24px;min-height:24px;border:0;background:transparent;flex:none}.mc-toast.is-error{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary,#b44949) 35%,var(--mm-line))}.mc-toast.is-error>svg{color:var(--dsw-alias-state-error-primary,#b44949)}
.mc-modeMenu,.mc-modeDialog{animation:mc-enter 160ms ease-out}.mc-modeDialog .mc-content{padding:20px}.mc-modeDialog .mc-field{margin-bottom:18px}.mc-modeDialog .mc-editorFooter{min-height:60px}.mc-modeSearch{font-size:13px}.mc-modeOption{font-size:13px}.mc-modeGroup h3{font-size:12px}
@keyframes mc-enter{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
/* A single action row and a persistent, resizable three-pane workspace. */
.mc-shell{min-width:840px;gap:12px}
.mc-top{min-height:36px;flex-wrap:nowrap;gap:12px;justify-content:flex-start}
.mc-brand{flex:none;gap:8px}.mc-brand h1{font-size:16px;line-height:24px;white-space:nowrap}.mc-logo{width:32px;height:32px;border-radius:9px}
.mc-panel .mc-brand .mc-modeToggle{padding:0 7px;min-width:36px;gap:0}
.mc-modeField{flex:1;flex-basis:auto;flex-wrap:nowrap;min-width:0;gap:8px}.mc-modePicker{flex:1;min-width:144px;max-width:320px}
.mc-topTools{flex:none;width:auto;gap:8px;margin-left:auto}.mc-saveButton{height:36px!important;min-height:36px!important;min-width:128px}
.mc-libraryButton[aria-pressed=true]{color:var(--mm-accent);border-color:var(--mm-accent);background:var(--mm-soft)}
.mc-workspace{flex:1;min-height:340px;min-width:0;overflow:auto;border:1px solid var(--mm-line);border-radius:12px;background:var(--mm-surface);box-shadow:0 2px 10px #00000004}
.mc-grid,.mc-grid.has-assistant{width:100%;height:100%;min-height:100%;min-width:736px;flex:none;border:0;border-radius:0;box-shadow:none;grid-template-columns:var(--mc-nav-width,192px) 8px minmax(280px,1fr) 8px var(--mc-assistant-width,420px);grid-template-rows:minmax(0,1fr)}
.mc-grid>.mc-flow{grid-column:1;grid-row:1;flex-direction:column;border:0}.mc-grid>.mc-editor{grid-column:3;grid-row:1}.mc-grid>.mc-assistant{grid-column:5;grid-row:1;display:flex;border:0}
.mc-resizer{grid-row:1;align-self:stretch;position:relative;z-index:1;min-height:0;cursor:col-resize;touch-action:none;user-select:none;background:var(--mm-surface);outline-offset:-2px}
.mc-resizer[data-boundary=nav]{grid-column:2}.mc-resizer[data-boundary=assistant]{grid-column:4}
.mc-resizer:before{content:"";position:absolute;inset:0 auto 0 50%;width:1px;background:var(--mm-line);transition:background 150ms}
.mc-resizer:after{content:"";position:absolute;top:50%;left:calc(50% - 1px);width:3px;height:28px;border-radius:2px;background:var(--mm-muted);opacity:.35;transform:translateY(-50%);transition:background 150ms,opacity 150ms}
.mc-resizer:hover:after,.mc-resizer:focus-visible:after,.mc-grid[data-resizing=nav]>.mc-resizer[data-boundary=nav]:after,.mc-grid[data-resizing=assistant]>.mc-resizer[data-boundary=assistant]:after{background:var(--mm-accent);opacity:1}
.mc-resizer:focus-visible{outline:2px solid var(--mc-focus,var(--mm-accent))}.mc-grid[data-resizing],.mc-grid[data-resizing] *{cursor:col-resize!important;user-select:none!important}
@container metis-workbench (max-width:1120px){.mc-shell{padding:14px;gap:10px}.mc-top{gap:8px}.mc-columnHeader{padding-inline:14px}.mc-content{padding:20px}.mc-topTools{gap:6px}}
@container metis-workbench (max-width:940px){.mc-checkGrid,.mc-parameters{grid-template-columns:1fr}.mc-content{padding:18px}.mc-modeDialogBackdrop{padding:12px}.mc-modeDialog .mc-content{padding:16px}.mc-loopOptions{padding-left:0}.mc-toast{left:12px;right:auto;bottom:12px;max-width:calc(100% - 24px)}}
@media(prefers-reduced-motion:reduce){.mc-panel *,.mc-panel *:before,.mc-panel *:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;
  const serial=value=>JSON.stringify(value);
  const emptyProfile=()=>({systemPrompt:'',executionPrompt:'',reviewPrompt:'',skills:[],steps:[],parameters:{language:'zh-CN'}});
  function newChatId(){
    if(globalThis.crypto.randomUUID)return globalThis.crypto.randomUUID();
    const bytes=globalThis.crypto.getRandomValues(new Uint8Array(16));bytes[6]=bytes[6]&15|64;bytes[8]=bytes[8]&63|128;
    const hex=[...bytes].map(value=>value.toString(16).padStart(2,'0')).join('');
    return hex.slice(0,8)+'-'+hex.slice(8,12)+'-'+hex.slice(12,16)+'-'+hex.slice(16,20)+'-'+hex.slice(20);
  }
  function Field({label,children,hint,action,name,changed}){return h('div',{className:'mc-field','data-ion-field':name,'data-ion-changed':changed?'true':undefined},action?h('div',{className:'mc-fieldHeader'},h('label',{className:'mc-label'},label),action):h('label',{className:'mc-label'},label),children,hint?h('small',null,hint):null);}
  function Checkbox({id,label,description,checked,disabled,onChange}){return h('label',{className:'mc-check'+(checked?' is-bound':''),title:description?label+'\n'+description:label},h('input',{type:'checkbox',checked,disabled,onChange}),h('span',null,h('strong',null,label),description?h('small',null,description):null));}
  const paneLayoutKey='metis.composer.pane-widths.v1',paneMin={nav:152,editor:280,assistant:288},paneGap=8,paneDefault={nav:192,assistant:420};
  function readPaneLayout(){
    try{const saved=JSON.parse(localStorage.getItem(paneLayoutKey));if(saved&&['nav','assistant'].every(key=>Number.isFinite(saved[key])&&saved[key]>=paneMin[key]&&saved[key]<=10000))return {nav:saved.nav,assistant:saved.assistant};}catch{}
    return {...paneDefault};
  }
  function fitPaneLayout(requested,width){
    const budget=Math.max(paneMin.nav+paneMin.assistant,width-2*paneGap-paneMin.editor);
    let nav=Math.max(paneMin.nav,requested.nav),assistant=Math.max(paneMin.assistant,requested.assistant);
    if(nav+assistant>budget){const extra=nav+assistant-paneMin.nav-paneMin.assistant,ratio=extra?(budget-paneMin.nav-paneMin.assistant)/extra:0;nav=Math.round(paneMin.nav+(nav-paneMin.nav)*ratio);assistant=Math.floor(budget-nav);}
    return {nav,assistant};
  }
  return function ModeComposer({initialSnapshot,nativeKit,navigation,initialView='steps',onSurfaceReady,circuitKit}){
    React.useLayoutEffect(()=>onSurfaceReady?.(),[onSurfaceReady]);
    const modeState=React.useSyncExternalStore(store.subscribe,store.get,store.get);
    const assistantState=React.useSyncExternalStore(assistantStore.subscribe,assistantStore.get,assistantStore.get);
    const [moreOpen,setMoreOpen]=React.useState(false),moreRef=React.useRef(null),editorScrollRef=React.useRef(null),titleInputRef=React.useRef(null),pendingStepFocus=React.useRef(false);
    const workspaceRef=React.useRef(null),gridRef=React.useRef(null),paneLayoutRef=React.useRef(null),paneDragRef=React.useRef(null);
    if(!paneLayoutRef.current)paneLayoutRef.current=readPaneLayout();
    function applyPaneLayout(requested=paneLayoutRef.current,persist=false){
      const grid=gridRef.current;if(!grid)return;
      paneLayoutRef.current={...requested};
      const width=grid.clientWidth,fitted=fitPaneLayout(requested,width),editor=width-fitted.nav-fitted.assistant-2*paneGap;
      grid.style.setProperty('--mc-nav-width',fitted.nav+'px');grid.style.setProperty('--mc-assistant-width',fitted.assistant+'px');
      const description='步骤栏 '+Math.round(fitted.nav)+' 像素，编辑区 '+Math.round(editor)+' 像素，编排助手 '+Math.round(fitted.assistant)+' 像素';
      for(const handle of grid.querySelectorAll('.mc-resizer')){
        const left=handle.dataset.boundary==='nav';
        handle.setAttribute('aria-valuenow',Math.round(left?fitted.nav:editor));handle.setAttribute('aria-valuemin',left?paneMin.nav:paneMin.editor);handle.setAttribute('aria-valuemax',Math.floor(left?width-fitted.assistant-paneMin.editor-2*paneGap:width-fitted.nav-paneMin.assistant-2*paneGap));handle.setAttribute('aria-valuetext',description);
      }
      if(persist)try{localStorage.setItem(paneLayoutKey,JSON.stringify(paneLayoutRef.current));}catch{}
    }
    function movePaneBoundary(boundary,delta,start){
      const width=gridRef.current?.clientWidth;if(!width)return;
      const current=start||fitPaneLayout(paneLayoutRef.current,width),next={...current};
      if(boundary==='nav')next.nav=Math.max(paneMin.nav,Math.min(width-current.assistant-paneMin.editor-2*paneGap,current.nav+delta));
      else next.assistant=Math.max(paneMin.assistant,Math.min(width-current.nav-paneMin.editor-2*paneGap,current.assistant-delta));
      applyPaneLayout(next);
    }
    function startPaneResize(event,boundary){
      if(event.button!==0||!gridRef.current)return;event.preventDefault();event.currentTarget.focus({preventScroll:true});
      paneDragRef.current={pointerId:event.pointerId,boundary,x:event.clientX,start:fitPaneLayout(paneLayoutRef.current,gridRef.current.clientWidth),original:{...paneLayoutRef.current}};
      gridRef.current.dataset.resizing=boundary;event.currentTarget.setPointerCapture(event.pointerId);
    }
    function finishPaneResize(event,cancel=false){
      const drag=paneDragRef.current;if(!drag||event.pointerId!==drag.pointerId)return;paneDragRef.current=null;
      if(gridRef.current)delete gridRef.current.dataset.resizing;applyPaneLayout(cancel?drag.original:paneLayoutRef.current,true);
      if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
    }
    function paneResizeKey(event,boundary){
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();event.stopPropagation();
      const width=gridRef.current?.clientWidth;if(!width)return;const current=fitPaneLayout(paneLayoutRef.current,width);
      if(event.key==='Home'||event.key==='End'){
        const delta=boundary==='nav'?(event.key==='Home'?paneMin.nav-current.nav:width-current.assistant-paneMin.editor-2*paneGap-current.nav):(event.key==='Home'?current.assistant-(width-current.nav-paneMin.editor-2*paneGap):current.assistant-paneMin.assistant);
        movePaneBoundary(boundary,delta,current);
      }else movePaneBoundary(boundary,(event.key==='ArrowLeft'?-1:1)*(event.shiftKey?64:16),current);
      applyPaneLayout(paneLayoutRef.current,true);
    }
    function paneSeparator(boundary){return h('div',{key:boundary,className:'mc-resizer','data-boundary':boundary,role:'separator',tabIndex:0,'aria-orientation':'vertical','aria-label':boundary==='nav'?'调整步骤栏与编辑区宽度':'调整编辑区与编排助手宽度','aria-valuemin':boundary==='nav'?paneMin.nav:paneMin.editor,'aria-valuenow':boundary==='nav'?paneDefault.nav:paneMin.editor,title:'拖动调整栏宽 · 方向键微调 · 双击恢复默认',onPointerDown:event=>startPaneResize(event,boundary),onPointerMove:event=>{const drag=paneDragRef.current;if(drag?.pointerId===event.pointerId)movePaneBoundary(drag.boundary,event.clientX-drag.x,drag.start);},onPointerUp:finishPaneResize,onPointerCancel:event=>finishPaneResize(event,true),onLostPointerCapture:finishPaneResize,onKeyDown:event=>paneResizeKey(event,boundary),onDoubleClick:()=>applyPaneLayout({...paneLayoutRef.current,[boundary]:paneDefault[boundary]},true)});}
    const [modeMenuOpen,setModeMenuOpen]=React.useState(false),[modeQuery,setModeQuery]=React.useState('');
    const [modeAction,setModeAction]=React.useState(null),[modeActionError,setModeActionError]=React.useState(null);
    const modeTriggerRef=React.useRef(null),modeMenuRef=React.useRef(null),modeOptionRefs=React.useRef([]),modeDialogRef=React.useRef(null),modeReturnRef=React.useRef(null),modeEditPending=React.useRef(false);
    const [modeDrag,setModeDrag]=React.useState(null),[modeSortNotice,setModeSortNotice]=React.useState(null);
    const modeDragRef=React.useRef(null),modeOperationEpoch=React.useRef(0);
    const [stepDrag,setStepDrag]=React.useState(null),stepDragRef=React.useRef(null);
    const cachedInitial=assistantStore.get().workspaceSnapshot;
    const initial=cachedInitial?{...cachedInitial,library:initialSnapshot.library||cachedInitial.library,capabilities:initialSnapshot.capabilities||cachedInitial.capabilities,assistant:initialSnapshot.assistant||cachedInitial.assistant}:initialSnapshot;
    const remembered=assistantStore.get().editorSelection,undo=assistantStore.get().workspaceUndo;
    const addedModes=undo?initial.modes.filter(mode=>!undo.before.snapshot.modes.some(previous=>previous.id===mode.id)):[];
    const firstId=[remembered?.modeId,assistantStore.get().native?.state?.editorContext?.modeId,undo?.selectedModeId,addedModes.length===1?addedModes[0].id:null,'metis',initial.modes[0]?.id].find(id=>id&&initial.profiles[id]&&initial.modes.some(mode=>mode.id===id))||null;
    const [snapshot,setSnapshotState]=React.useState(initial);
    const [selected,setSelected]=React.useState(firstId);
    const [draft,setDraft]=React.useState(()=>copy(drafts.get(firstId)?.profile||initial.profiles[firstId]?.profile||emptyProfile()));
    const [baseRevision,setBaseRevision]=React.useState(drafts.get(firstId)?.baseRevision??initial.profiles[firstId]?.revision??0);
    const [manageView,setManageView]=React.useState(initialView),[selectedSkill,setSelectedSkill]=React.useState(initialView==='skills'?null:initial.skills[0]?.id||null),[resourcePath,setResourcePath]=React.useState('');
    const skillReturnRef=React.useRef(null),skillPickerTriggerRef=React.useRef(null),skillListScrollRef=React.useRef(0);
    const [aiChangedFields,setAiChangedFields]=React.useState([]);
    React.useEffect(()=>{if(!aiChangedFields.length)return;const timer=setTimeout(()=>setAiChangedFields([]),6000);return()=>clearTimeout(timer);},[aiChangedFields]);
    const [skillDetails,setSkillDetails]=React.useState(null),[skillError,setSkillError]=React.useState(null),[resourceDetails,setResourceDetails]=React.useState(null);
    const skillReadSerial=React.useRef(0);
    const [skillQuery,setSkillQuery]=React.useState(''),[skillSource,setSkillSource]=React.useState(''),[skillSearchOffset,setSkillSearchOffset]=React.useState(0),[skillSearchResult,setSkillSearchResult]=React.useState(null),[skillSearchBusy,setSkillSearchBusy]=React.useState(false),[skillSearchError,setSkillSearchError]=React.useState(null);
    const [skillTextOffset,setSkillTextOffset]=React.useState(0),[skillFileOffset,setSkillFileOffset]=React.useState(0);
    const [skillReadRetry,setSkillReadRetry]=React.useState(0);
    const skillSearchSerial=React.useRef(0),skillMetadataCache=React.useRef(new Map(initial.skills.map(skill=>[skill.id,skill])));
    const [versionPage,setVersionPage]=React.useState(null),[versionBusy,setVersionBusy]=React.useState(false),[versionError,setVersionError]=React.useState(null),[versionOffset,setVersionOffset]=React.useState(0);
    const [legacyChoices,setLegacyChoices]=React.useState({}),[legacyAcks,setLegacyAcks]=React.useState({}),[inspectedVersion,setInspectedVersion]=React.useState(null);
    const [index,setIndex]=React.useState(()=>remembered?.modeId===firstId?Math.max(0,(initial.profiles[firstId]?.profile.steps||[]).findIndex(step=>step.id===remembered.stepId)):0),[skillPickerOpen,setSkillPickerOpen]=React.useState(false);
    const [status,setStatus]=React.useState(null),[busy,setBusy]=React.useState(false),[preview,setPreview]=React.useState(null),savePending=React.useRef(false);
    const record=snapshot.profiles[selected]||{profile:emptyProfile(),revision:0},mode=snapshot.modes.find(item=>item.id===selected)||{id:null,name:'METIS配置工作区',description:'尚无模式'};
    const step=draft.steps[Math.min(index,draft.steps.length-1)];
    const effective=effectiveConfiguration();
    const configurationRef=React.useRef(effective);configurationRef.current=effective;
    const baseline=assistantState.savedConfiguration||initialSnapshot.configuration;
    const dirty=!!effective&&!draftEqual(effective,baseline);
    const flexibleReady=snapshot.capabilities?.flexibleSteps===true;
    const configurationReady=flexibleReady&&snapshot.capabilities?.configurationWorkspace===true&&snapshot.capabilities?.simpleStepEditor===true&&snapshot.capabilities?.finalOutput===true&&snapshot.capabilities?.sharedDraft===true&&snapshot.capabilities?.goalLoops===true&&snapshot.capabilities?.runtimeProgress===true&&snapshot.assistant?.capabilityRevision>=9;
    const modeManagementReady=configurationReady&&snapshot.capabilities?.modeManagement===true;
    const modeSortReady=modeManagementReady&&snapshot.capabilities?.modeReordering===true;
    const assistantProtocolReady=snapshot.assistant?.version===4&&snapshot.assistant.toolInspection===true&&snapshot.assistant.capabilityRevision>=9;
    const assistantReady=configurationReady&&assistantProtocolReady&&snapshot.assistant.transport==='dsh-native-session'&&snapshot.assistant.available&&!!NativeConversation&&!!nativeSessions?.create&&!!nativeKit?.SessionProvider&&!!nativeKit?.renderFactorySlot;
    const workspaceUndo=assistantState.workspaceUndo;
    const nativeStorageKey='metis.native-composer.'+(snapshot.assistant?.scope||'unavailable');
    const [nativeWorkspaceId,setNativeWorkspaceId]=React.useState(()=>{let id;try{id=localStorage.getItem(nativeStorageKey);}catch{}return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id||'')?id:newChatId();});
    const native=assistantState.native?.workspaceId===nativeWorkspaceId?assistantState.native:{workspaceId:nativeWorkspaceId,state:null,busy:false,error:null,hint:null};
    const nativeToolError=native.state?.toolSurface?.ready===false&&native.state.toolSurface.pending===false?native.state.toolSurface.message:null;
    const nativeCurrent=React.useRef(null),nativeConfigurationToken=React.useRef(null),nativeSynced=React.useRef(null),nativeRevision=React.useRef(0),nativeEpoch=React.useRef(0),nativeWorkspaceRef=React.useRef(nativeWorkspaceId),nativeMounted=React.useRef(true);
    const sharedBaseRef=React.useRef(null),sharedWorkspaceRef=React.useRef(null),manualEditsRef=React.useRef(new Map()),manualGeneration=React.useRef(0),protectedFieldsRef=React.useRef(new Set()),liveEditorRef=React.useRef(null);
    if(sharedWorkspaceRef.current!==nativeWorkspaceId){sharedWorkspaceRef.current=nativeWorkspaceId;sharedBaseRef.current=assistantStore.get().sharedDraftBases?.[nativeWorkspaceId]||null;}
    liveEditorRef.current={snapshot,selected,stepId:step?.id||null,index};
    nativeWorkspaceRef.current=nativeWorkspaceId;
    const configurationFingerprint=serial(effective),skillConfigurationSignature=serial(snapshot.configuration);
    if(nativeConfigurationToken.current?.fingerprint!==configurationFingerprint)nativeConfigurationToken.current={fingerprint:configurationFingerprint,token:newChatId()};
    const nativeContext={workspaceId:nativeWorkspaceId,contextToken:nativeConfigurationToken.current.token,modeId:selected,profile:selected?copy(draft):null,configuration:effective,draftProfiles:{},activeStepId:step?.id||null,selectedResource:manageView==='skills'&&selectedSkill?{kind:'skill',id:selectedSkill,...(resourcePath?{path:resourcePath}:{})}:null};
    const nativeSignature=serial(nativeContext);
    nativeCurrent.current={payload:nativeContext,signature:nativeSignature};
    const serverContext=native.state?.editorContext;
    const serverContextMatches=!serverContext||serverContext.contextToken===nativeContext.contextToken&&serverContext.modeId===nativeContext.modeId&&serverContext.activeStepId===nativeContext.activeStepId&&serial(serverContext.selectedResource)===serial(nativeContext.selectedResource);
    const contextSyncReady=serverContextMatches&&!!native.state?.sharedDraft&&!!sharedBaseRef.current&&draftEqual(effective,sharedBaseRef.current.configuration)&&manualEditsRef.current.size===0;
    const [nativeRetry,setNativeRetry]=React.useState(0);
    const observeNativeRunning=React.useCallback(running=>{if(typeof running!=='boolean')return;const current=assistantStore.get().native;if(current?.workspaceId===nativeWorkspaceId&&current.running!==running)setNative({running});},[nativeWorkspaceId]);
    const observeNativeConnection=React.useCallback((connected,bound)=>{const current=assistantStore.get().native;if(current?.workspaceId!==nativeWorkspaceId)return;if(current.connected!==connected||!!current.scopeError!==!bound)setNative({connected,scopeError:!bound});},[nativeWorkspaceId]);
    const stepLimit=snapshot.capabilities?.maxSteps||20;
    const stages=snapshot.engineStages||[
      {id:'S1',title:'资料盘点'},{id:'S2',title:'文献检索'},{id:'S3',title:'选题确认'},
      {id:'S4',title:'研究设计'},{id:'S5',title:'研究执行'},{id:'S6',title:'阶段验证'},
      {id:'S7',title:'正文写作'},{id:'S8',title:'格式适配'},{id:'S9',title:'全局质检'},{id:'S10',title:'成果交付'}
    ];
    const bindingsOf=item=>Array.isArray(item.stages)?item.stages:item.stage&&item.stage!=='manual'?[item.stage]:[];
    React.useEffect(()=>{assistantStore.set({editorSelection:{modeId:selected,stepId:step?.id||null}});},[selected,step?.id]);
    React.useLayoutEffect(()=>{if(editorScrollRef.current)editorScrollRef.current.scrollTop=0;if(pendingStepFocus.current){pendingStepFocus.current=false;titleInputRef.current?.focus();titleInputRef.current?.select();}},[selected,step?.id]);
    React.useEffect(()=>{if(!status||status.error)return;const timer=setTimeout(()=>setStatus(null),5000);return()=>clearTimeout(timer);},[status]);
    React.useEffect(()=>{if(!moreOpen)return;const close=event=>{if(!moreRef.current?.contains(event.target))setMoreOpen(false);};document.addEventListener('pointerdown',close);return()=>document.removeEventListener('pointerdown',close);},[moreOpen]);
    React.useEffect(()=>{const tag=document.createElement('style');tag.dataset.pluginCss='metis-mode-composer';tag.textContent=style+ION_WORKBENCH_CSS;document.head.appendChild(tag);return()=>tag.remove();},[]);
    React.useEffect(()=>{applyPaneLayout();const observer=new ResizeObserver(()=>applyPaneLayout());if(workspaceRef.current)observer.observe(workspaceRef.current);return()=>observer.disconnect();},[]);
    React.useEffect(()=>{try{localStorage.setItem(nativeStorageKey,nativeWorkspaceId);}catch{}},[nativeStorageKey,nativeWorkspaceId]);
    React.useEffect(()=>{nativeMounted.current=true;return()=>{nativeMounted.current=false;};},[]);
    React.useEffect(()=>{
      if(!configurationReady||!assistantProtocolReady||snapshot.assistant?.sharedDraft!==true)return;
      let active=true,timer;const epoch=++nativeEpoch.current;
      nativeRevision.current=0;nativeSynced.current=null;
      setNative({state:null,busy:true,error:null,syncing:false,syncError:null,reviewing:false,applyError:null,running:undefined,connected:false,scopeError:false});
      const valid=()=>active&&epoch===nativeEpoch.current;
      async function poll(){
        try{const next=await readAssistantState(nativeWorkspaceId,nativeRevision.current,sharedBaseRef.current?.hash);if(valid()){acceptNative(next);if(assistantStore.get().native?.errorOrigin==='state')setNative({error:null,errorOrigin:null});}}
        catch(error){if(valid())setNative({error:String(error),errorOrigin:'state'});}
        finally{if(valid())timer=setTimeout(poll,500);}
      }
      (async()=>{
        const request={payload:sharedPayload(),signature:nativeCurrent.current.signature};
        try{
          let result=await postJson('/metis/api/v1/composer/assistant/session',request.payload);
          if(!valid())return;acceptNative(result);
          if(result.needsSession&&assistantReady){
            if(!valid())return;
            const pendingKey=nativeStorageKey+'.pending.'+nativeWorkspaceId;
            let id;try{id=localStorage.getItem(pendingKey);}catch{}
            if(!id){id=await nativeSessions.create({cwd:result.cwd,agentPreset:result.presetId});try{localStorage.setItem(pendingKey,id);}catch{}}
            // Bind even if the panel closes after native creation, preserving its real identity.
            result=await postJson('/metis/api/v1/composer/assistant/session/bind',{workspaceId:nativeWorkspaceId,sessionId:id});
            try{localStorage.removeItem(pendingKey);}catch{}
          }
          if(!valid())return;
          nativeSynced.current={signature:request.signature,sessionId:result.sessionId};
          acceptNative(result);setNative({busy:false,error:null,syncing:false,syncError:null});timer=setTimeout(poll,500);
        }catch(error){if(valid())setNative({busy:false,error:String(error),syncing:false});}
      })();
      return()=>{active=false;clearTimeout(timer);nativeEpoch.current++;};
    },[configurationReady,assistantProtocolReady,assistantReady,nativeWorkspaceId,nativeRetry]);
    React.useEffect(()=>{
      if(!configurationReady||native.busy||!native.state?.sharedDraft||contextSyncReady){
        const current=assistantStore.get().native;
        if(current?.workspaceId===nativeWorkspaceId&&(current.syncing||contextSyncReady&&current.syncError))setNative({syncing:false,...(contextSyncReady?{syncError:null}:{})});
        return;
      }
      let active=true,timer,sent=false,acknowledged=false;const request={payload:sharedPayload(),signature:nativeCurrent.current.signature},controller=new AbortController();
      setNative({syncing:true,syncError:null});
      async function synchronize(){
        try{
          sent=true;
          const next=await postJson('/metis/api/v1/composer/assistant/context',{...sharedPayload(),expectedRevision:nativeRevision.current},{signal:AbortSignal.any([controller.signal,AbortSignal.timeout(15000)])});
          if(!active)return;
          acknowledged=true;nativeSynced.current={signature:request.signature,sessionId:next.sessionId};acceptNative(next);setNative({syncing:false,syncError:null});
        }catch(error){
          if(!active)return;
          if(['metis/composer-revision','metis/shared-base-expired'].includes(error.code)){
            try{const next=await readAssistantState(nativeWorkspaceId);if(!active)return;acceptNative(next);timer=setTimeout(synchronize,400);}
            catch(cause){if(active)setNative({syncing:false,syncError:String(cause)});}
          }else setNative({syncing:false,syncError:error.name==='TimeoutError'?'配置同步超时，请重新同步。':String(error)});
        }
      }
      timer=setTimeout(synchronize,350);return()=>{active=false;clearTimeout(timer);controller.abort();if(sent&&!acknowledged&&request.signature!==nativeCurrent.current?.signature)nativeSynced.current=null;setNative({syncing:false});};
    },[configurationReady,nativeWorkspaceId,native.state?.sharedDraft?.hash,native.busy,nativeSignature,contextSyncReady]);
    React.useEffect(()=>{if(manageView==='versions')loadSessionVersions(versionOffset);},[manageView,versionOffset]);
    React.useEffect(()=>{if(!assistantStore.get().savedConfiguration&&initialSnapshot.configuration)assistantStore.set({savedConfiguration:copy(initialSnapshot.configuration)});},[]);
    React.useEffect(()=>{for(const skill of snapshot.skills)skillMetadataCache.current.set(skill.id,skill);if(selectedSkill&&snapshot.configuration?.deletedSkills.includes(selectedSkill)){setSelectedSkill(snapshot.skills[0]?.id||null);setResourcePath('');setSkillTextOffset(0);setSkillFileOffset(0);}},[snapshot.skills,selectedSkill]);
    React.useEffect(()=>{
      const sequence=++skillSearchSerial.current;
      if(!configurationReady||!(manageView==='skills'||manageView==='steps'&&skillPickerOpen))return;
      setSkillSearchBusy(true);setSkillSearchError(null);setSkillSearchResult(null);
      const timer=setTimeout(async()=>{try{
        const data=await postJson('/metis/api/v1/composer/read',{request:{kind:'skill-search',query:skillQuery,source:skillSource||undefined,offset:skillSearchOffset,limit:12,invocableOnly:manageView==='steps'},configuration:snapshot.configuration});
        if(sequence===skillSearchSerial.current){for(const skill of data.value.items)skillMetadataCache.current.set(skill.id,skill);setSkillSearchResult(data.value);if(manageView==='skills'){setSelectedSkill(previous=>data.value.items.some(skill=>skill.id===previous)?previous:null);setResourcePath('');setSkillTextOffset(0);setSkillFileOffset(0);}}
      }catch(error){if(sequence===skillSearchSerial.current)setSkillSearchError(String(error));}finally{if(sequence===skillSearchSerial.current)setSkillSearchBusy(false);}},250);
      return()=>{clearTimeout(timer);skillSearchSerial.current++;};
    },[manageView,skillPickerOpen,skillQuery,skillSource,skillSearchOffset,skillConfigurationSignature,configurationReady]);
    React.useEffect(()=>{
      const sequence=++skillReadSerial.current;setSkillError(null);setSkillDetails(null);setResourceDetails(null);
      if(manageView!=='skills'||!selectedSkill||!configurationReady)return;
      (async()=>{try{
        const data=await postJson('/metis/api/v1/composer/read',{request:{kind:'skill',id:selectedSkill,offset:resourcePath?0:skillTextOffset,maxChars:4000,fileOffset:skillFileOffset,fileLimit:12},configuration:snapshot.configuration});
        let file=null;if(resourcePath)file=(await postJson('/metis/api/v1/composer/read',{request:{kind:'skill',id:selectedSkill,path:resourcePath,offset:skillTextOffset,maxChars:4000},configuration:snapshot.configuration})).value;
        if(sequence===skillReadSerial.current){setSkillDetails(data.value);setResourceDetails(file);}
      }catch(error){if(sequence===skillReadSerial.current)setSkillError(String(error));}})();
      return()=>{skillReadSerial.current++;};
    },[manageView,selectedSkill,resourcePath,skillTextOffset,skillFileOffset,skillReadRetry,skillConfigurationSignature,configurationReady]);
    React.useEffect(()=>{
      if(!modeMenuOpen)return;
      const close=event=>{if(!modeMenuRef.current?.contains(event.target)&&!modeTriggerRef.current?.contains(event.target))setModeMenuOpen(false);};
      document.addEventListener('pointerdown',close);return()=>document.removeEventListener('pointerdown',close);
    },[modeMenuOpen]);
    React.useEffect(()=>{if(!modeMenuOpen)clearModeDrag();},[modeMenuOpen]);
    React.useEffect(()=>{clearStepDrag();},[selected,manageView,busy,modeMenuOpen,!!modeAction]);
    React.useEffect(()=>()=>{stepDragRef.current=null;},[]);
    React.useEffect(()=>()=>{modeOperationEpoch.current++;},[]);
    React.useEffect(()=>{
      if(!modeAction)return;
      const previous=modeReturnRef.current;
      modeDialogRef.current?.querySelector('[data-initial-focus]')?.focus();
      return()=>{(previous?.isConnected?previous:modeTriggerRef.current)?.focus();};
    },[!!modeAction]);
    function setNative(patch){if(!nativeMounted.current||nativeWorkspaceRef.current!==nativeWorkspaceId)return;const current=assistantStore.get().native;assistantStore.set({native:{...(current?.workspaceId===nativeWorkspaceId?current:{}),workspaceId:nativeWorkspaceId,...patch}});}
    function markManual(paths){for(const path of paths){manualEditsRef.current.set(path,++manualGeneration.current);protectedFieldsRef.current.add(path);}}
    function stepPath(id=step?.id){return '/profiles/'+encodeURIComponent(selected)+'/profile/steps/@'+encodeURIComponent(id);}
    function sharedPayload(){
      const configuration=copy(configurationRef.current||effectiveConfiguration()),view=liveEditorRef.current,modeId=configuration.profiles[view.selected]?view.selected:null,profile=modeId?configuration.profiles[modeId].profile:null;
      const fingerprint=serial(configuration);if(nativeConfigurationToken.current?.fingerprint!==fingerprint)nativeConfigurationToken.current={fingerprint,token:newChatId()};
      return {workspaceId:nativeWorkspaceId,contextToken:nativeConfigurationToken.current.token,modeId,profile,configuration,draftProfiles:{},activeStepId:profile?.steps.some(item=>item.id===view.stepId)?view.stepId:profile?.steps[0]?.id||null,selectedResource:nativeCurrent.current?.payload.selectedResource||null,baseHash:sharedBaseRef.current?.hash||null,baseConfiguration:sharedBaseRef.current?.configuration||null,manualEdits:[...manualEditsRef.current.keys()],manualGeneration:manualGeneration.current};
    }
    function sharedView(configuration,remoteSnapshot){
      const document=copy(configuration),previous=liveEditorRef.current.snapshot,bases=new Map([...(previous.modes||[]),...(remoteSnapshot.modes||[])].map(item=>[item.id,item]));
      for(const [id,mode]of Object.entries(document.modes))bases.set(id,{...bases.get(id),...mode});
      const modes=[...bases.values()].filter(mode=>!document.deletedModes.includes(mode.id)&&(mode.builtin||Object.hasOwn(document.modes,mode.id))).sort((a,b)=>(a.order??10)-(b.order??10)||a.id.localeCompare(b.id));
      const skills=[...new Map([...(previous.skills||[]),...(remoteSnapshot.skills||[])].map(item=>[item.id,item])).values()];
      const core=skills.some(item=>item.id==='metis-core');for(const mode of modes){const profile=document.profiles[mode.id]?.profile;if(profile)profile.skills=[...new Set([...(core?['metis-core']:[]),...profile.steps.flatMap(item=>item.skills)])];}
      return {...previous,...remoteSnapshot,configuration:document,modes,skills,assistant:remoteSnapshot.assistant||previous.assistant,profiles:Object.fromEntries(modes.filter(mode=>document.profiles[mode.id]).map(mode=>[mode.id,document.profiles[mode.id]])),defaults:{...previous.defaults,...remoteSnapshot.defaults}};
    }
    function installShared(next){
      const shared=next.sharedDraft,remote=shared?.snapshot;if(!remote)return;
      const live=liveEditorRef.current,base=sharedBaseRef.current,local=configurationRef.current||effectiveConfiguration(),baseline=base?.configuration||initialSnapshot.configuration;
      const merged=mergeDraft(baseline,local,remote.configuration,{protectedPaths:[...protectedFieldsRef.current,...manualEditsRef.current.keys()]}),view=sharedView(merged.configuration,remote),localChanges=!draftEqual(baseline,local);
      if(base&&shared.lastChange?.source==='ai'){const visibleChanges=draftChanges(local,merged.configuration);if(visibleChanges.length)setAiChangedFields(visibleChanges);}
      const selectionPending=base?.selection&&(base.selection.modeId!==live.selected||base.selection.activeStepId!==live.stepId);
      const editingStep=!!document.activeElement?.closest('.mc-stepFieldset');
      const wanted=localChanges||selectionPending||editingStep?live.selected:next.editorContext?.modeId||live.selected,id=view.profiles[wanted]?wanted:view.modes[0]?.id||null;
      const wantedStep=id===live.selected?live.stepId:next.editorContext?.activeStepId,position=Math.max(0,view.profiles[id]?.profile.steps.findIndex(item=>item.id===wantedStep)??0),profile=copy(view.profiles[id]?.profile||emptyProfile());
      sharedBaseRef.current={hash:shared.hash,configuration:copy(remote.configuration),version:shared.version,selection:copy(next.editorContext)};
      protectedFieldsRef.current=new Set([...(shared.manualProtectedPaths||[]),...manualEditsRef.current.keys()]);
      drafts.clear();setSnapshotState(view);setSelected(id);setDraft(profile);setBaseRevision(view.profiles[id]?.revision||0);setIndex(position);setPreview(null);if(id!==live.selected||live.stepId!==profile.steps[position]?.id)setSkillPickerOpen(false);
      configurationRef.current=view.configuration;liveEditorRef.current={snapshot:view,selected:id,stepId:profile.steps[position]?.id||null,index:position};
      assistantStore.set({workspaceSnapshot:view,sharedDraftBases:{...assistantStore.get().sharedDraftBases,[nativeWorkspaceId]:sharedBaseRef.current},workspaceUndo:null});
    }
    function acceptNative(next){
      if(!nativeMounted.current||nativeWorkspaceRef.current!==nativeWorkspaceId||next.workspaceId!==nativeWorkspaceId)return;
      if(Number.isInteger(next.manualAckGeneration))for(const [path,generation]of manualEditsRef.current)if(generation<=next.manualAckGeneration)manualEditsRef.current.delete(path);
      if(next.revision<nativeRevision.current)return;
      nativeRevision.current=next.revision;installShared(next);
      if(next.sharedDraft){protectedFieldsRef.current=new Set([...(next.sharedDraft.manualProtectedPaths||[]),...manualEditsRef.current.keys()]);if(sharedBaseRef.current&&next.editorContext)sharedBaseRef.current.selection=copy(next.editorContext);}
      const current=assistantStore.get().native?.state,metadata=next.sharedDraft?{...next.sharedDraft}:null;if(metadata)delete metadata.snapshot;const stateValue={...next,sharedDraft:metadata};
      if(!next.unchanged)setNative({state:stateValue,applyError:null});
      else if(current&&(!draftEqual(current.toolSurface,next.toolSurface)||!draftEqual(current.execution,next.execution)||!draftEqual(current.editorContext,next.editorContext)||!draftEqual(current.sharedDraft,metadata)))setNative({state:{...current,toolSurface:next.toolSurface,execution:next.execution,editorContext:next.editorContext,sharedDraft:metadata}});
    }
    async function flushShared(){
      for(;;){
        const payload=sharedPayload();let next;
        try{next=await postJson('/metis/api/v1/composer/assistant/context',payload,{signal:AbortSignal.timeout(15000)});}catch(error){if(error.code!=='metis/shared-base-expired')throw error;acceptNative(await readAssistantState(nativeWorkspaceId));continue;}
        acceptNative(next);
        if(!nativeMounted.current||nativeWorkspaceRef.current!==nativeWorkspaceId)throw new Error('已切换编排对话，当前手改仍保留');
        if(draftEqual(configurationRef.current,next.sharedDraft?.snapshot?.configuration||sharedBaseRef.current?.configuration)&&manualEditsRef.current.size===0)return next;
      }
    }
    function newNativeConversation(){if(busy||native.busy)return;markManual([...protectedFieldsRef.current]);setNativeWorkspaceId(newChatId());}
    async function loadSessionVersions(offset=versionOffset){
      setVersionBusy(true);setVersionError(null);try{setVersionPage(await getJson('/metis/api/v1/composer/session-versions?offset='+offset));}catch(error){setVersionError(String(error));}finally{setVersionBusy(false);}
    }
    async function inspectSessionVersion(id){
      setVersionBusy(true);setVersionError(null);setInspectedVersion(null);try{const result=await getJson('/metis/api/v1/composer/session-version?id='+encodeURIComponent(id));setInspectedVersion(result.value);}catch(error){setVersionError(String(error));}finally{setVersionBusy(false);}
    }
    async function bindLegacyVersion(item){
      const id=legacyChoices[item.sessionId];if(!id||!legacyAcks[item.sessionId]||inspectedVersion?.id!==id)return;
      setVersionBusy(true);setVersionError(null);
      try{await postJson('/metis/api/v1/composer/session-version/bind',{sessionId:item.sessionId,versionId:id,acknowledgeUnknownOriginal:true});setStatus({text:'已明确记录所选保护基线。该会话以后固定使用此版本；这不代表找回了原先未记录的历史配置。'});await loadSessionVersions();}catch(error){setVersionError(String(error));}finally{setVersionBusy(false);}
    }
    function setSnapshot(next){assistantStore.set({workspaceSnapshot:next});setSnapshotState(next);}
    function draftProfiles(){
      const result=Object.fromEntries([...drafts.entries()].filter(([id])=>snapshot.profiles[id]).map(([id,value])=>[id,{profile:copy(value.profile),baseRevision:value.baseRevision}]));
      if(selected)result[selected]={profile:copy(draft),baseRevision};return result;
    }
    function effectiveConfiguration(){
      if(!snapshot.configuration)return null;
      const document=copy(snapshot.configuration);
      for(const [id,value]of Object.entries(draftProfiles()))document.profiles[id]={profile:value.profile,revision:value.baseRevision,updatedAt:document.profiles[id]?.updatedAt||null};
      return document;
    }
    function installSnapshot(next,preferred=selected,{preserveStep=false,published=false}={}){
      const updated={...snapshot,...next,assistant:next.assistant||snapshot.assistant};
      const id=updated.modes.some(mode=>mode.id===preferred)&&updated.profiles[preferred]?preferred:updated.modes[0]?.id||null;
      const position=preserveStep&&id===selected&&step?updated.profiles[id]?.profile.steps.findIndex(item=>item.id===step.id):-1;
      drafts.clear();setSnapshotState(updated);setSelected(id);setDraft(copy(updated.profiles[id]?.profile||emptyProfile()));setBaseRevision(updated.profiles[id]?.revision||0);setIndex(position>=0?position:0);setSkillPickerOpen(false);setPreview(null);setModeSortNotice(null);
      configurationRef.current=copy(updated.configuration);liveEditorRef.current={snapshot:updated,selected:id,stepId:updated.profiles[id]?.profile.steps[position>=0?position:0]?.id||null,index:position>=0?position:0};
      assistantStore.set({workspaceSnapshot:updated});
      if(published)store.set({modes:updated.modes,versionAliases:updated.versionAliases||{}});
    }
    function askAssistant(message){setNative({hint:{id:newChatId(),text:message}});}
    function update(next,revision=baseRevision){
      if(!selected)return;
      if(serial(next)===serial(record.profile))drafts.delete(selected);else drafts.set(selected,{profile:copy(next),baseRevision:revision});
      const document=copy(configurationRef.current||snapshot.configuration);document.profiles[selected]={...document.profiles[selected],profile:copy(next),revision};configurationRef.current=document;
      setDraft(next);setBaseRevision(revision);setPreview(null);setStatus(null);
    }
    function enabledSkills(steps){return [...new Set([...(snapshot.skills.some(item=>item.id==='metis-core')?['metis-core']:[]),...steps.flatMap(item=>item.skills)])];}

    function updateStep(patch){
      if(!step)return;
      for(const key of Object.keys(patch)){
        if(key==='skills'){for(const id of new Set([...step.skills,...patch.skills]))if(step.skills.includes(id)!==patch.skills.includes(id))markManual([stepPath()+'/skills/#'+encodeURIComponent(id)]);}
        else if(key==='loop'){markManual(Object.keys(patch.loop).filter(name=>patch.loop[name]!==({enabled:false,criteria:'',...step.loop})[name]).map(name=>stepPath()+'/loop/'+name));}
        else if(!['systemPrompt','executionPrompt','reviewPrompt','parameters'].includes(key))markManual([stepPath()+'/'+key]);
      }
      const steps=draft.steps.map(item=>item.id===step.id?{...item,...patch}:item);

      update({...draft,steps,skills:enabledSkills(steps)});
    }
    function replaceSteps(steps,nextIndex){
      markManual(['/profiles/'+encodeURIComponent(selected)+'/profile/steps/$order']);for(const id of new Set([...draft.steps.map(item=>item.id),...steps.map(item=>item.id)]))if(draft.steps.some(item=>item.id===id)!==steps.some(item=>item.id===id))markManual([stepPath(id)+'/$exists']);
      update({...draft,output:outputSettings(draft),steps,skills:enabledSkills(steps)});
      setIndex(Math.max(0,Math.min(nextIndex,steps.length-1)));setSkillPickerOpen(false);
    }
    function newStepId(){return 'step-'+(globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10));}
    function addStep(afterId=step?.id){
      if(!selected||draft.steps.length>=stepLimit)return;
      if(typeof afterId!=='string')afterId=step?.id;
      pendingStepFocus.current=true;
      const at=draft.steps.findIndex(item=>item.id===afterId),position=at>=0?at+1:0;
      const created={id:newStepId(),stage:'manual',stages:[],title:'新步骤',instruction:'',deliverables:'',prohibitions:'',loop:{enabled:false,criteria:''},prompt:'仅处理本步骤的目标，不预加载其他步骤。按实际任务依赖执行，保留产物与证据。核对本步产物和交付内容，未完成事项如实说明。',skills:[],systemPrompt:'',executionPrompt:'',reviewPrompt:'',parameters:{language:'inherit',outputFormat:'task',tasksPerTurn:1}};
      const steps=[...draft.steps];steps.splice(position,0,created);replaceSteps(steps,position);
    }
    function duplicateStep(){
      if(!step||draft.steps.length>=stepLimit)return;
      pendingStepFocus.current=true;
      const created={...copy(step),id:newStepId(),title:step.title.slice(0,96)+'（副本）'};
      const steps=[...draft.steps];steps.splice(index+1,0,created);replaceSteps(steps,index+1);
    }
    function removeStep(){if(step)replaceSteps(draft.steps.filter(item=>item.id!==step.id),index);}
    function graphStep(id,patch){
      if(busy||!configurationReady||!selected)return;
      const target=draft.steps.find(item=>item.id===id);if(!target)return;
      for(const key of Object.keys(patch)){
        if(key==='skills')for(const skill of new Set([...target.skills,...patch.skills])){if(target.skills.includes(skill)!==patch.skills.includes(skill))markManual([stepPath(id)+'/skills/#'+encodeURIComponent(skill)]);}
        else if(key==='loop')markManual(Object.keys(patch.loop).filter(name=>patch.loop[name]!==({enabled:false,criteria:'',...target.loop})[name]).map(name=>stepPath(id)+'/loop/'+name));
      }
      const steps=draft.steps.map(item=>item.id===id?{...item,...patch}:item);update({...draft,steps,skills:enabledSkills(steps)});setIndex(steps.findIndex(item=>item.id===id));
    }
    function graphBind(id,skillId){
      const target=draft.steps.find(item=>item.id===id),skill=skillMetadataCache.current.get(skillId);
      if(!target||!skill||skill.invocation?.modelInvocable===false){setStatus({error:true,text:'请选择技能库中可调用的具体技能，再绑定到步骤。'});return;}
      if(!target.skills.includes(skillId))graphStep(id,{skills:[...target.skills,skillId]});
      setStatus({text:'「'+(skill.name||skillId)+'」已绑定到「'+target.title+'」，随本步按需加载。'});
    }
    function moveStep(offset){
      if(!step||index+offset<0||index+offset>=draft.steps.length)return;
      reorderStep(step.id,draft.steps[index+offset].id,offset<0?'before':'after');
    }
    function reorderStep(sourceId,targetId,edge,expectedFingerprint=null){
      if(busy||modeEditPending.current||!configurationReady||!selected||sourceId===targetId||!['before','after'].includes(edge))return;
      if(expectedFingerprint!==null&&serial(configurationRef.current)!==expectedFingerprint){setStatus({error:true,text:'拖动期间配置草稿已变化，请重新拖动步骤。'});return;}
      const from=draft.steps.findIndex(item=>item.id===sourceId);
      if(from<0||!draft.steps.some(item=>item.id===targetId))return;
      const steps=[...draft.steps];
      const [moved]=steps.splice(from,1),at=steps.findIndex(item=>item.id===targetId);
      steps.splice(at+(edge==='after'?1:0),0,moved);
      if(steps.every((item,i)=>item.id===draft.steps[i].id))return;
      const activeId=step?.id;clearStepDrag();markManual(['/profiles/'+encodeURIComponent(selected)+'/profile/steps/$order']);
      // Reorder complete objects; keep skill arrays, prompts and parameters verbatim.
      update({...draft,output:outputSettings(draft),steps});setIndex(Math.max(0,steps.findIndex(item=>item.id===activeId)));
      setStatus({text:'步骤顺序已更新到草稿，点击“保存并生效”即可启用。'});
    }
    function clearStepDrag(){stepDragRef.current=null;setStepDrag(null);}
    function stepDragStart(event,item){
      if(busy||modeEditPending.current||!configurationReady||!selected||draft.steps.length<2){event.preventDefault();return;}
      stepDragRef.current={modeId:selected,stepId:item.id,fingerprint:serial(effectiveConfiguration())};
      setStepDrag({sourceId:item.id,overId:null,edge:null,axis:null});
      event.dataTransfer.effectAllowed='move';event.dataTransfer.setData('text/plain',item.id);
      const row=event.currentTarget.closest('[data-workflow-step]');if(row)event.dataTransfer.setDragImage(row,12,18);
    }
    function stepDropPosition(event){
      const row=event.currentTarget,axis=getComputedStyle(row.parentElement).flexDirection==='row'?'x':'y',box=row.getBoundingClientRect();
      return {axis,edge:(axis==='x'?event.clientX<box.left+box.width/2:event.clientY<box.top+box.height/2)?'before':'after'};
    }
    function stepDragOver(event,item){
      const origin=stepDragRef.current;
      if(!origin||origin.modeId!==selected||origin.stepId===item.id||busy||modeEditPending.current||!configurationReady){
        if(origin){event.dataTransfer.dropEffect='none';setStepDrag(previous=>previous?.overId?{...previous,overId:null,edge:null,axis:null}:previous);}
        return;
      }
      event.preventDefault();event.dataTransfer.dropEffect='move';
      const {axis,edge}=stepDropPosition(event);
      setStepDrag(previous=>previous?.overId===item.id&&previous.edge===edge&&previous.axis===axis?previous:{sourceId:origin.stepId,overId:item.id,edge,axis});
    }
    function stepDragLeave(event,item){
      if(event.relatedTarget&&event.currentTarget.contains(event.relatedTarget))return;
      setStepDrag(previous=>previous?.overId===item.id?{...previous,overId:null,edge:null,axis:null}:previous);
    }
    function stepDrop(event,item){
      const origin=stepDragRef.current;if(!origin)return;
      event.preventDefault();event.stopPropagation();
      const {edge}=stepDropPosition(event);clearStepDrag();
      if(origin.modeId!==selected)return;
      reorderStep(origin.stepId,item.id,edge,origin.fingerprint);
    }
    function stepSortKey(event,item){
      if(event.key==='Escape'&&stepDragRef.current){event.preventDefault();event.stopPropagation();clearStepDrag();return;}
      if(!event.altKey||!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key)||event.nativeEvent?.isComposing)return;
      event.preventDefault();event.stopPropagation();
      const at=draft.steps.findIndex(step=>step.id===item.id),offset=['ArrowUp','ArrowLeft'].includes(event.key)?-1:1,target=draft.steps[at+offset];
      if(at>=0&&target)reorderStep(item.id,target.id,offset<0?'before':'after');
    }
    function outputSettings(profile){if(profile.output)return {...profile.output};const format=profile.steps.at(-1)?.parameters?.outputFormat;return {format:['docx','pptx','pdf','markdown','json'].includes(format)?format:'auto',wordFormatting:''};}
    function updateOutput(patch){markManual(Object.keys(patch).map(key=>'/profiles/'+encodeURIComponent(selected)+'/profile/output/'+key));update({...draft,output:{...outputSettings(draft),...patch}});}
    function stepPromptValue(item){return item.prompt!==undefined?item.prompt:[item.systemPrompt,item.executionPrompt,item.reviewPrompt].filter(value=>typeof value==='string'&&value.length).join('\n\n');}
    function selectMode(id){if(!snapshot.profiles[id])return;const cached=drafts.get(id);setSelected(id);setDraft(copy(cached?.profile||snapshot.profiles[id].profile));setBaseRevision(cached?.baseRevision??snapshot.profiles[id].revision);setIndex(0);setSkillPickerOpen(false);setPreview(null);setStatus(null);setModeMenuOpen(false);}
    function chooseMode(id){selectMode(id);setManageView('steps');modeTriggerRef.current?.focus();}
    function openModeAction(kind,id=selected){
      if(busy||!modeManagementReady)return;
      const source=snapshot.modes.find(item=>item.id===id);
      if((kind==='delete'||kind==='edit')&&!source)return;
      modeReturnRef.current=document.activeElement;setModeMenuOpen(false);setModeActionError(null);
      setModeAction(kind==='delete'?{kind,modeId:id}:kind==='edit'?{kind,modeId:id,name:source.name,description:source.description}:{kind:'create',name:'',description:'',copyFromId:source?.id||'',artifact:source?.artifact||'',paradigm:source?.paradigm||'qualitative'});
    }
    function closeModeAction(){if(!busy&&!modeEditPending.current){setModeAction(null);setModeActionError(null);}}
    function modeDialogKey(event){
      if(event.nativeEvent?.isComposing)return;
      if(event.key==='Escape'){event.preventDefault();event.stopPropagation();closeModeAction();}
      if(event.key==='Tab'){
        const elements=[...(modeDialogRef.current?.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled)')||[])];
        const first=elements[0],last=elements[elements.length-1];
        if(!first){event.preventDefault();modeDialogRef.current?.focus();}
        else if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
    }
    function modeMenuKey(event){
      if(event.nativeEvent?.isComposing)return;
      if(event.key==='Escape'){event.preventDefault();event.stopPropagation();setModeMenuOpen(false);modeTriggerRef.current?.focus();return;}
      if(event.altKey)return;
      if((event.key==='ArrowDown'||event.key==='ArrowUp')&&modeChoices.length){
        event.preventDefault();
        const row=event.target.closest?.('[data-mode-index]'),current=row?Number(row.dataset.modeIndex):-1;
        const next=current<0?(event.key==='ArrowDown'?0:modeChoices.length-1):(current+(event.key==='ArrowDown'?1:-1)+modeChoices.length)%modeChoices.length;
        modeOptionRefs.current[next]?.focus();
      }else if(event.key==='Enter'&&event.target.type==='search'&&modeChoices.length){event.preventDefault();chooseMode(modeChoices[0].id);}
    }
    async function applyModeEdits(edits,message,{workflow=false,preserveStep=false,persist=false}={}){
      if(busy||modeEditPending.current||!modeManagementReady)return;
      const before=serial(effectiveConfiguration()),operation=modeOperationEpoch.current;modeEditPending.current=true;setBusy(true);setModeActionError(null);
      try{
        const result=await postJson('/metis/api/v1/composer/proposal',{modeId:selected,profile:selected?copy(draft):null,configuration:snapshot.configuration,draftProfiles:draftProfiles(),edits});
        if(operation!==modeOperationEpoch.current)return false;
        if(serial(configurationRef.current)!==before)throw new Error('配置草稿已变化，未采用这次操作，请基于当前内容重试。');
        if(!result.snapshot||!result.configuration)throw new Error('未收到完整配置草稿，现有内容已保留。');
        const next=result.snapshot;
        for(const edit of edits){if(edit.type==='create_mode')markManual(['/modes/'+encodeURIComponent(edit.mode.id)+'/$exists','/profiles/'+encodeURIComponent(edit.mode.id)+'/$exists','/modes/'+encodeURIComponent(edit.mode.id)+'/name','/modes/'+encodeURIComponent(edit.mode.id)+'/description']);else if(edit.type==='update_mode')markManual(Object.keys(edit.patch).map(key=>'/modes/'+encodeURIComponent(edit.modeId)+'/'+key));else if(edit.type==='delete_mode')markManual(['/modes/'+encodeURIComponent(edit.modeId)+'/$exists','/profiles/'+encodeURIComponent(edit.modeId)+'/$exists']);else if(edit.type==='reorder_modes')markManual(edit.modeIds.map(id=>'/modes/'+encodeURIComponent(id)+'/order'));}
        installSnapshot(next,result.selectedModeId,{preserveStep});assistantStore.set({workspaceUndo:null});setModeAction(null);
        if(workflow)setManageView('steps');
        setStatus({text:message+(next.notificationWarning?' '+next.notificationWarning:'')});return true;
      }catch(error){if(operation===modeOperationEpoch.current){setModeActionError(String(error));setStatus({error:true,text:String(error)});}return false;}finally{modeEditPending.current=false;if(operation===modeOperationEpoch.current)setBusy(false);}
    }
    function submitModeAction(event){
      event.preventDefault();if(busy||!modeAction)return;
      if(modeAction.kind==='delete'){
        const target=snapshot.modes.find(item=>item.id===modeAction.modeId);
        if(!target){setModeActionError('这个模式已不在当前草稿中，请重新选择。');return;}
        return applyModeEdits([{type:'delete_mode',modeId:target.id}],'“'+target.name+'”已从当前流程移除，保存后生效；旧研究会话仍保留原配置。',{persist:true});
      }
      const name=modeAction.name.trim();
      if(!name){setModeActionError('请先填写模式名称。');return;}
      if(modeAction.kind==='edit'){
        const target=snapshot.modes.find(item=>item.id===modeAction.modeId);
        if(!target){setModeActionError('这个模式已不在当前草稿中，请重新选择。');return;}
        if(target.name===name&&target.description===modeAction.description&&!dirty){closeModeAction();setStatus({text:'没有需要保存的修改。'});return;}
        return applyModeEdits([{type:'update_mode',modeId:modeAction.modeId,patch:{name,description:modeAction.description}}],'名称和说明已更新，最后统一保存并生效。',{preserveStep:true,persist:true});
      }
      const source=snapshot.modes.find(item=>item.id===modeAction.copyFromId);
      if(modeAction.copyFromId&&!source){setModeActionError('初始流程来源已变化，请重新选择。');return;}
      const created={id:'metis-custom-'+newChatId(),name,description:modeAction.description.trim(),artifact:source?.artifact||null,paradigm:source?.paradigm||null,guidance:source?.guidance||'',order:Math.min(9999,Math.max(100,...snapshot.modes.map(item=>item.order??10))+1)};
      return applyModeEdits([{type:'create_mode',mode:created,...(source?{copyFromId:source.id}:{})}],'“'+name+'”已加入当前流程，可以继续编排，最后统一保存。',{workflow:true,persist:true});
    }
    function clearModeDrag(){modeDragRef.current=null;setModeDrag(null);}
    function modeDragStart(event,item){
      if(busy||!modeSortReady||modeEditPending.current){event.preventDefault();return;}
      modeDragRef.current={id:item.id,fingerprint:serial(effectiveConfiguration())};
      setModeDrag({sourceId:item.id,overId:null,edge:null});setModeSortNotice(null);
      event.dataTransfer.effectAllowed='move';event.dataTransfer.setData('text/plain',item.id);
      const row=event.currentTarget.closest('[data-sort-mode]');if(row)event.dataTransfer.setDragImage(row,12,18);
    }
    function modeDragOver(event,item){
      const origin=modeDragRef.current;
      if(!origin||busy||!modeSortReady||origin.id===item.id){
        if(origin){event.dataTransfer.dropEffect='none';setModeDrag(previous=>previous?.overId?{...previous,overId:null,edge:null}:previous);}
        return;
      }
      event.preventDefault();event.dataTransfer.dropEffect='move';
      const box=event.currentTarget.getBoundingClientRect(),edge=event.clientY<box.top+box.height/2?'before':'after';
      setModeDrag(previous=>previous?.overId===item.id&&previous.edge===edge?previous:{sourceId:origin.id,overId:item.id,edge});
    }
    function modeDragLeave(event,item){
      if(event.relatedTarget&&event.currentTarget.contains(event.relatedTarget))return;
      setModeDrag(previous=>previous?.overId===item.id?{...previous,overId:null,edge:null}:previous);
    }
    function modeDrop(event,item){
      const origin=modeDragRef.current;
      if(!origin)return;
      event.preventDefault();event.stopPropagation();
      const box=event.currentTarget.getBoundingClientRect(),edge=event.clientY<box.top+box.height/2?'before':'after';
      clearModeDrag();
      moveMode(origin.id,item.id,edge,origin.fingerprint);
    }
    async function moveMode(sourceId,targetId,edge,expectedFingerprint=null){
      if(busy||modeEditPending.current||!modeSortReady||sourceId===targetId)return;
      const source=snapshot.modes.find(item=>item.id===sourceId),target=snapshot.modes.find(item=>item.id===targetId);
      if(!source||!target)return;
      if(expectedFingerprint!==null&&serial(configurationRef.current)!==expectedFingerprint){setModeSortNotice({error:true,text:'拖动期间草稿已变化，请重新拖动。'});return;}
      const before=groupedModes.map(item=>item.id),ids=before.filter(id=>id!==sourceId),at=ids.indexOf(targetId);
      ids.splice(at+(edge==='after'?1:0),0,sourceId);
      if(serial(before)===serial(ids))return;
      setModeSortNotice(null);
      const applied=await applyModeEdits([{type:'reorder_modes',modeIds:ids}],'模式顺序已更新到配置草稿，点击“保存并生效”即可启用。',{preserveStep:true});
      setModeSortNotice({error:!applied,text:applied?'顺序已放入草稿，点击“保存并生效”即可启用。':'排序未应用，原草稿已保留。'});
    }
    function modeSortKey(event,item){
      if(!event.altKey||!['ArrowUp','ArrowDown'].includes(event.key)||event.nativeEvent?.isComposing)return;
      event.preventDefault();event.stopPropagation();
      const group=groupedModes,at=group.findIndex(mode=>mode.id===item.id),offset=event.key==='ArrowUp'?-1:1,target=group[at+offset];
      if(target)moveMode(item.id,target.id,offset<0?'before':'after');
    }
    function go(next){setIndex(next);setSkillPickerOpen(false);setPreview(null);setStatus(null);}
    async function refresh(){
      setBusy(true);
      try{
        const fresh=await getJson('/metis/api/v1/composer');
        if(dirty&&snapshot.configuration){
          setSnapshot({...snapshot,assistant:fresh.assistant,capabilities:fresh.capabilities});
          setStatus({error:fresh.configuration?.revision!==snapshot.configuration.revision,text:fresh.configuration?.revision!==snapshot.configuration.revision?'磁盘配置已更新，您的草稿仍保留。请协调变更，或放弃全部修改后重新读取。':'已读取服务状态，全局草稿仍保留。'});
        }else{
          const pending=[...drafts.entries()];setSnapshot(fresh);assistantStore.set({savedConfiguration:copy(fresh.configuration)});
          if(pending.length){const id=fresh.profiles[selected]?selected:fresh.modes[0]?.id||null;setSelected(id);setDraft(copy(drafts.get(id)?.profile||fresh.profiles[id]?.profile||emptyProfile()));setBaseRevision(drafts.get(id)?.baseRevision??fresh.profiles[id]?.revision??0);}
          else installSnapshot(fresh);
          setStatus({text:'已读取保存配置。'});
        }
      }catch(error){setStatus({error:true,text:String(error)});}finally{setBusy(false);}
    }
    async function save(){
      if(!configurationReady||!dirty||busy||modeEditPending.current||savePending.current)return;savePending.current=true;setBusy(true);setStatus(null);
      try{
        const synchronized=await flushShared();
        const result=await postJson('/metis/api/v1/composer/assistant/save',{workspaceId:nativeWorkspaceId,draftHash:synchronized.sharedDraft.hash,expectedConfigurationRevision:sharedBaseRef.current.configuration.revision});
        const saved=result.savedSnapshot;if(!saved?.configuration)throw new Error('未收到真实保存回执，手动修改仍保留');
        manualEditsRef.current.clear();protectedFieldsRef.current.clear();
        installSnapshot(saved,liveEditorRef.current.selected,{preserveStep:true,published:true});assistantStore.set({savedConfiguration:copy(saved.configuration),workspaceUndo:null});acceptNative(result);
        setStatus(saved.notificationWarning?{error:true,text:'配置已保存；'+saved.notificationWarning}:{kind:'saved',text:'已保存，新会话将使用当前流程。'});
      }catch(error){setStatus({error:true,text:String(error)});}finally{savePending.current=false;setBusy(false);}
    }
    async function discard(){
      if(busy)return;setBusy(true);
      try{const current=await readAssistantState(nativeWorkspaceId);acceptNative(current);const next=await postJson('/metis/api/v1/composer/assistant/reset',{workspaceId:nativeWorkspaceId,draftHash:current.sharedDraft.hash});manualEditsRef.current.clear();protectedFieldsRef.current.clear();const saved=next.savedSnapshot;installSnapshot(saved,selected,{published:true});assistantStore.set({savedConfiguration:copy(saved.configuration),workspaceUndo:null});acceptNative(next);setStatus({text:'已放弃未保存修改，正式配置保持原样。'});}catch(error){setStatus({error:true,text:String(error)});}finally{setBusy(false);}
    }
    function restore(){if(!configurationReady||!selected)return;const profile=copy(snapshot.defaults[selected]),before=effectiveConfiguration(),after=copy(before);after.profiles[selected].profile=profile;markManual(draftChanges(before,after));update(profile,record.revision);setIndex(0);setSkillPickerOpen(false);setStatus({text:'基础模板已放入当前模式草稿，点击“保存并生效”即可启用。'});}
    async function previewStep(){if(!step||!configurationReady)return;setBusy(true);try{setPreview(await postJson('/metis/api/v1/composer/preview',{id:selected,profile:draft,stepId:step.id,configuration:effectiveConfiguration()}));setStatus(null);}catch(error){setStatus({error:true,text:String(error)});}finally{setBusy(false);}}
    async function newSession(){if(!selected)return;setBusy(true);try{await actions.newModeSession(selected);}catch(error){setStatus({error:true,text:String(error)});}finally{setBusy(false);}}

    const input=(label,value,onChange,extra={})=>h('input',{'aria-label':label,value,onChange:event=>onChange(event.target.value),...extra});
    const area=(label,value,onChange,rows=4,extra={})=>h('textarea',{'aria-label':label,value,rows,onChange:event=>onChange(event.target.value),...extra});
    const select=(label,value,values,onChange)=>h('select',{'aria-label':label,value,onChange:event=>onChange(event.target.value)},values.map(([id,title])=>h('option',{key:id,value:id},title)));
    function fields(){
      if(!step)return h('div',{className:'mc-emptyFlow'},h('h3',null,'还没有步骤'),h('p',{className:'mc-note'},'点击“新增步骤”开始编排。'),h('button',{type:'button',className:'mm-button mm-primary',disabled:busy,onClick:addStep},'新增步骤'));
      const finalStep=step.id===draft.steps.at(-1)?.id,output=outputSettings(draft);
      const boundSkills=step.skills.map(id=>skillMetadataCache.current.get(id)||{id,name:id,description:''});
      const choices=[...new Map([...boundSkills,...(skillSearchResult?.items||[])].map(skill=>[skill.id,skill])).values()];
      const changed=(...names)=>names.some(name=>aiChangedFields.some(path=>path===stepPath()+'/'+name||path.startsWith(stepPath()+'/'+name+'/')));
      return h('div',{className:'mc-simpleStep'},
        h(Field,{label:'主要目的',name:'purpose',changed:changed('instruction','loop'),action:h('label',{className:'mc-loopToggle'},h('input',{type:'checkbox',role:'switch','aria-label':'未达目标时循环改进',checked:step.loop?.enabled===true,disabled:busy,onChange:event=>updateStep({loop:{enabled:event.target.checked,criteria:step.loop?.criteria||''}})}),h('span',null,h('strong',null,'达标后交付')))},h(React.Fragment,null,area('主要目的',step.instruction,value=>updateStep({instruction:value}),3,{maxLength:3000,placeholder:'这一步主要做什么？'}),
          step.loop?.enabled?h('div',{className:'mc-loopOptions'},h(Field,{label:'达标补充要求（可选）'},area('达标补充要求',step.loop.criteria||'',value=>updateStep({loop:{enabled:true,criteria:value}}),2,{maxLength:4000,placeholder:'可留空，将按主要目的和交付内容核验。'}))):null)),
        h(Field,{label:'交付内容',name:'deliverables',changed:changed('deliverables')},h(React.Fragment,null,
          area('交付内容',step.deliverables||'',value=>updateStep({deliverables:value}),3,{maxLength:4000,placeholder:'这一步要交付哪些文档、表格或其他成果？'}),
          finalStep?h('div',{className:'mc-finalOutput'},h(Field,{label:'最终输出格式'},select('最终输出格式',output.format,[['auto','按交付内容确定'],['docx','Word（.docx）'],['pptx','PPT（.pptx）'],['pdf','PDF（.pdf）'],['markdown','Markdown（.md）'],...(output.format==='json'?[['json','JSON（.json）']]:[])],value=>updateOutput({format:value}))),
            output.format==='docx'?h(Field,{label:'Word 排版要求'},area('Word 排版要求',output.wordFormatting||'',value=>updateOutput({wordFormatting:value}),3,{maxLength:8000,placeholder:'直接描述，例如：正文宋体小四、1.5倍行距，一级标题黑体三号，页边距上下2.5厘米。'})):null):null)),
        h(Field,{label:'技能',name:'skills',changed:changed('skills'),action:h('button',{type:'button',className:'mm-button',ref:skillPickerTriggerRef,disabled:busy,'aria-expanded':skillPickerOpen,onClick:()=>setSkillPickerOpen(!skillPickerOpen)},skillPickerOpen?'收起技能选择':'添加技能')},h(React.Fragment,null,
          boundSkills.length?h('div',{className:'mc-boundSkills'},boundSkills.map(skill=>h('div',{className:'mc-boundSkill',key:skill.id},h('span',{title:skill.description||skill.id},skill.name||(skill.description&&skill.description.length<=80?skill.description:skill.id)),h('button',{type:'button',className:'mc-mini',disabled:busy,'aria-label':'移除本步骤技能 '+(skill.name||skill.id),onClick:()=>updateStep({skills:step.skills.filter(id=>id!==skill.id)})},'移除')))):h('p',{className:'mc-note'},'尚未绑定技能'),
          skillPickerOpen?h('div',{className:'mc-stepSkillPicker'},skillSearchControls(),h('div',{className:'mc-checkGrid'},choices.map(skill=>h('div',{className:'mc-skillCard',key:skill.id},h(Checkbox,{id:skill.id,label:skill.name||skill.description||skill.id,description:skill.description||'',checked:step.skills.includes(skill.id),disabled:skill.invocation?.modelInvocable===false&&!step.skills.includes(skill.id),onChange:()=>updateStep({skills:step.skills.includes(skill.id)?step.skills.filter(id=>id!==skill.id):[...step.skills,skill.id]})}))))):null)),
        h(Field,{label:'步骤提示词',name:'prompt',changed:changed('prompt','systemPrompt','executionPrompt','reviewPrompt')},area('步骤提示词',stepPromptValue(step),value=>updateStep({prompt:value,systemPrompt:'',executionPrompt:'',reviewPrompt:''}),8,{maxLength:32000,placeholder:'AI在这一步需要遵循的具体做法和要求。'})),
        h(Field,{label:'禁止事项（可选）',name:'prohibitions',changed:changed('prohibitions')},area('禁止事项',step.prohibitions||'',value=>updateStep({prohibitions:value}),3,{maxLength:8000,placeholder:'可以留空。填写这一步不允许AI做什么，例如不得编造引用、不得修改原始资料。'})));
    }
    const button=(label,onClick,props={})=>h('button',{type:'button',className:'mm-button',onClick,...props},label);
    function selectSkill(id){if(id&&manageView==='skills'){skillReturnRef.current=document.activeElement;if(circuitKit)skillListScrollRef.current=workspaceRef.current?.querySelector('.ic-paletteBody')?.scrollTop||0;}setSelectedSkill(id);setResourcePath('');setSkillTextOffset(0);setSkillFileOffset(0);if(id&&circuitKit)requestAnimationFrame(()=>workspaceRef.current?.querySelector('.ic-paletteBody')?.scrollTo({top:0}));}
    function closeSkillDetails(){setSelectedSkill(null);requestAnimationFrame(()=>{if(circuitKit)workspaceRef.current?.querySelector('.ic-paletteBody')?.scrollTo({top:skillListScrollRef.current});skillReturnRef.current?.focus({preventScroll:true});});}
    function chooseSkillSource(repository){setSkillSource(repository);setSkillQuery('');setSkillSearchOffset(0);setSkillSearchResult(null);selectSkill(null);}
    function enterLibrary(){if(manageView!=='skills')chooseSkillSource('');setManageView('skills');}
    const sourceTitle=source=>source.repository==='brycewang-stanford/Auto-Empirical-Research-Skills'?'Auto-Empirical（斯坦福）':source.repository.split('/').at(-1);
    function skillSearchControls(){return h('div',{className:'mc-skillSearch'},
      h('div',{className:'mc-parameters'},
        h(Field,{label:'搜索技能'},input('搜索科研技能',skillQuery,value=>{setSkillQuery(value);setSkillSearchOffset(0);},{type:'search',maxLength:2000,placeholder:'研究方法、任务或中英文关键词'})),
        h(Field,{label:'技能包 / 来源'},h('select',{'aria-label':'技能来源',value:skillSource,onChange:event=>chooseSkillSource(event.target.value)},h('option',{value:''},'全部来源'),(snapshot.library?.sources||[]).map(source=>h('option',{key:source.repository,value:source.repository},sourceTitle(source)+(source.entryCount===undefined?'':' · '+source.entryCount+' 项')))))),
      skillSearchError?h('div',{className:'mc-status is-error',role:'alert'},skillSearchError):null,
      h('div',{className:'mc-actions'},button('上一页技能',()=>setSkillSearchOffset(Math.max(0,skillSearchOffset-12)),{disabled:skillSearchBusy||skillSearchOffset===0}),button('下一页技能',()=>setSkillSearchOffset(skillSearchResult.nextOffset),{disabled:skillSearchBusy||skillSearchResult?.nextOffset==null}),h('span',{className:'mc-caption',role:'status'},skillSearchBusy?'检索中…':(skillSearchResult?.total||0)+' 项匹配 · 每页12项')));}
    const iconButton=(name,label,onClick,disabled=false)=>button(h(Icon,{name,size:15}),onClick,{className:'mc-mini mc-iconButton',title:label,'aria-label':label,disabled});
    const quickPrompts=[
      ['设计一个模式','我想新建一个METIS模式，请先和我确认名称、用途及工作流，然后更新到我们共同编辑的当前流程。'],
      ['挑选技能','我想添加技能，请先确认需要创建新技能，还是从我提供的本地目录或GitHub来源安装。'],
      [manageView==='skills'?'修改所选技能':step?'完善当前步骤':'搭建初始流程',manageView==='skills'&&selectedSkill?'请读取技能'+selectedSkill+'的真实正文和资源，与我讨论后更新到当前流程。':step?'完善当前步骤的主要目的、交付内容、技能和步骤提示词；按需设计禁止事项和达标循环，保留我已有的手动修改。':'根据这个模式的目标，帮我构建一套精简、可执行的步骤。']
    ];
    const assistantTarget=manageView==='skills'&&selectedSkill?'技能 · '+(skillMetadataCache.current.get(selectedSkill)?.name||selectedSkill):manageView==='versions'?'会话配置保护':selected?mode.name.replace(/^METIS[ ·]*/,'')+(manageView==='steps'&&step?' · '+step.title:''):'全部模式与技能';
    const assistantStatus=!assistantReady||native.error||native.scopeError||nativeToolError?'error':native.busy?'connecting':(native.state?.execution?.running??native.running)?'running':native.connected?'ready':'connecting';
    const assistantStatusLabel=({error:'连接有待处理的问题',connecting:'连接中',running:'正在编排',ready:'已连接'})[assistantStatus];
    const saveReason=!configurationReady?'配置服务尚未就绪':busy?'正在处理配置':!native.state?.sharedDraft?'正在连接共同流程':native.state.execution?.running===true?'AI仍在编辑，结束后保存':snapshot.modes.some(item=>!effective?.profiles[item.id]?.profile.steps.length)?'每个模式至少保留一个步骤后保存':!dirty?'没有待保存的配置':null;
    function workbenchKey(event){if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='s'&&!event.altKey){event.preventDefault();event.stopPropagation();if(!saveReason)void save();}if(event.key==='Escape'&&!modeAction){if(skillPickerOpen){event.preventDefault();setSkillPickerOpen(false);skillPickerTriggerRef.current?.focus();}else if(manageView==='skills'&&selectedSkill){event.preventDefault();closeSkillDetails();}else if(moreOpen){setMoreOpen(false);moreRef.current?.querySelector('summary')?.focus();}}}
    const consumeNativeHint=id=>{if(assistantStore.get().native?.hint?.id===id)setNative({hint:null});};
    const renderConfigurationContent=()=>h(ConfigurationSurface.Provider,{value:{sessionId:native.state?.sessionId,quickPrompts,hint:native.hint,onHintConsumed:consumeNativeHint,onRunningChange:observeNativeRunning,onConnectionChange:observeNativeConnection}},
      nativeKit.renderFactorySlot('conversation.content',{phase:'active',hero:false,variant:'embedded'},{slots:{views:ConfigurationViews},fallback:h('div',{className:'mc-assistantPending',role:'status'},'配置对话组件尚未就绪。')}));
    // A cached parent may still render its old child slot. Adapt that slot to
    // the same versioned config surface instead of letting it mount a Hero.
    const configurationKit=nativeKit?{...nativeKit,renderSlot:(name,...args)=>name==='metis.composer.native'?renderConfigurationContent():nativeKit.renderSlot(name,...args)}:null;
    const connectionDetail=String(native.error||nativeToolError||'编排会话没有正确绑定，请重新连接。').replace(/^Error:\s*/,'');
    const assistantPanel=h('aside',{className:'mc-assistant','aria-label':'METIS编排助手'},
      h('header',{className:'mc-columnHeader mc-assistantHeader'},h('div',{className:'mc-assistantHeading'},
        h('div',{className:'mc-assistantTitle'},h('span',{className:'mc-assistantDot','data-state':assistantStatus,title:assistantStatusLabel,'aria-hidden':true}),h('h2',null,'编排助手'),h('span',{className:'mc-connectionLabel',role:'status'},({error:'待重连',connecting:'连接中',running:'编辑中',ready:'已连接'})[assistantStatus])),
        h('div',{className:'mc-caption',title:assistantTarget},assistantTarget)),h('div',{className:'mc-assistantHeaderActions'},iconButton('plus','新建编排对话',newNativeConversation,busy||native.busy||!assistantReady))),
      !assistantReady?h('div',{className:'mc-assistantNotice',role:'status'},!assistantProtocolReady?'新版工具接入尚未加载，需让DSH完成METIS更新。新建对话不会更新插件，无需选择工作区或粘贴仓库内容。':'配置助手组件尚未连接，仍可手动编排。'):null,
      native.error||native.scopeError||nativeToolError?h('div',{className:'mc-assistantNotice is-error',role:'alert'},
        h('div',null,h('span',null,'编排连接未完成'),h('details',null,h('summary',null,'详情'),h('p',null,connectionDetail))),
        h('button',{type:'button',onClick:()=>setNativeRetry(nativeRetry+1)},nativeToolError?'重查工具':'重连')):null,
      native.syncError&&!contextSyncReady?h('div',{className:'mc-assistantNotice is-error',role:'alert'},h('span',null,'当前草稿同步失败：'+native.syncError),h('button',{type:'button',onClick:()=>setNativeRetry(nativeRetry+1),disabled:native.busy||native.reviewing},'重新同步')):null,
      native.syncing&&!contextSyncReady?h('div',{className:'mc-assistantSync',role:'status'},'同步当前配置…'):null,
      h('div',{className:'mc-nativeConversation'},assistantReady&&native.state?.sessionId&&!native.scopeError&&!nativeToolError?
        h(NativeConversation,{key:native.state.sessionId,sessionId:native.state.sessionId,nativeKit:configurationKit,renderContent:renderConfigurationContent,hint:native.hint,onRunningChange:observeNativeRunning,onHintConsumed:consumeNativeHint}):
        h('div',{className:'mc-assistantPending',role:'status'},native.busy||assistantReady&&!native.error&&!native.scopeError&&!nativeToolError?h('span',{className:'mc-assistantLoader','aria-hidden':true}):h(Icon,{name:'alert',size:18}),h('p',null,nativeToolError|| (native.error||native.scopeError?'连接恢复后，即可继续编排 METIS。':assistantReady?'正在连接 METIS 配置…':'配置助手暂不可用。')))),
      native.state?.sharedDraft?.lastChange?.source==='ai'&&native.state.sharedDraft.lastChange.conflicts?.length?h('div',{className:'mc-assistantSync',role:'status'},'已保留您手动修改的 '+native.state.sharedDraft.lastChange.conflicts.length+' 项；'+native.state.sharedDraft.lastChange.message):null,
      null);

    const inspectedText=inspectedVersion?JSON.stringify(inspectedVersion.payload,null,2):'';
    const sessionVersionContent=h('div',null,
      h('p',{className:'mc-note'},'新会话记录固定配置版本。保存模式、技能或提示词后，已有会话继续绑定原版本；恢复时缺失或损坏不会自动换成最新版。'),
      h('div',{className:'mc-status'},'升级前没有原配置记录的旧会话无法凭空还原。只有明确查看并选择基线后，才会建立今后的保护绑定；这不等于找回最初历史配置。'),
      versionError?h('div',{className:'mc-status is-error',role:'alert'},versionError):null,
      h('div',{className:'mc-actions'},button(versionBusy?'读取中…':'刷新会话记录',()=>loadSessionVersions(),{disabled:versionBusy}),
        button('上一页',()=>setVersionOffset(Math.max(0,versionOffset-25)),{disabled:versionBusy||versionOffset===0}),
        button('下一页',()=>setVersionOffset(versionPage?.nextOffset??versionOffset),{disabled:versionBusy||versionPage?.nextOffset==null})),
      versionPage?h('p',{className:'mc-note'},'本页检查 '+versionPage.scanned+' 条记录 · 全部 '+versionPage.totalRecords+' 条逻辑会话；仅列出本页METIS会话。'):null,
      (versionPage?.items||[]).map(item=>{
        const chosen=Object.hasOwn(legacyChoices,item.sessionId)?legacyChoices[item.sessionId]:'';
        const available=(versionPage.snapshots||[]).filter(snapshot=>snapshot.modeId===item.modeId&&snapshot.published);
        const label=({protected:'已固定版本','confirmed-baseline':'已确认保护基线',missing:'原版本缺失或损坏',unrecorded:'升级前未记录原版本',invalid:'绑定异常，不允许改用新配置',unreadable:'记录读取失败'})[item.status]||item.status;
        return h('section',{className:'mc-sessionVersionCard',key:item.sessionId},
          h('div',{className:'mc-sessionVersionTitle'},h('strong',null,label),h('span',{className:'mc-caption'},item.live?'运行中':'未激活')),
          h('code',null,item.sessionId),h('div',{className:'mc-caption'},item.modeId||item.sourcePreset||''),
          item.versionId?h('p',{className:'mc-note'},item.versionId):null,
          item.provenance?h('p',{className:'mc-caption'},'绑定依据：'+({ 'native-log':'原生会话版本记录','native-selection':'原生显式模式选择','captured-live':'真实运行组成捕获','user-confirmed-baseline':'用户确认的保护基线'}[item.provenance]||item.provenance)):null,
          item.error?h('div',{className:'mc-status is-error'},item.error):null,
          item.versionId?button('查看固定配置',()=>inspectSessionVersion(item.versionId),{disabled:versionBusy}):null,
          item.status==='unrecorded'&&!item.live?h('div',{className:'mc-legacyBinding'},
            h(Field,{label:'明确选择兼容保护基线'},h('select',{'aria-label':'旧会话保护基线 '+item.sessionId,value:chosen,disabled:versionBusy,onChange:event=>{setLegacyChoices({...legacyChoices,[item.sessionId]:event.target.value});setLegacyAcks({...legacyAcks,[item.sessionId]:false});}},h('option',{value:''},'请选择版本（不自动推断）'),available.map(snapshot=>h('option',{key:snapshot.id,value:snapshot.id},snapshot.id)))),
            h('div',{className:'mc-actions'},button('先查看此版本',()=>inspectSessionVersion(chosen),{disabled:versionBusy||!chosen})),
            h('label',{className:'mc-legacyAck'},h('input',{type:'checkbox',checked:legacyAcks[item.sessionId]===true,disabled:versionBusy,onChange:event=>setLegacyAcks({...legacyAcks,[item.sessionId]:event.target.checked})}),h('span',null,'我确认以所选版本建立基线，知道未记录的原始配置无法自动找回。')),
            button('记录所选保护基线',()=>bindLegacyVersion(item),{disabled:versionBusy||!chosen||legacyAcks[item.sessionId]!==true||inspectedVersion?.id!==chosen})):null);
      }),
      versionPage&&versionPage.items.length===0?h('p',{className:'mc-note'},'本页没有METIS会话，其他分页仍可能包含旧记录。'):null,
      versionPage?.warnings?.length?h('details',{className:'mc-modeDefaults'},h('summary',null,'版本保护提示'),versionPage.warnings.map((warning,index)=>h('p',{key:index,className:'mc-note'},warning))):null,
      inspectedVersion?h('details',{className:'mc-modeDefaults',open:true},h('summary',null,'已读取固定声明 · '+inspectedVersion.hash.slice(0,16)),h('p',{className:'mc-note'},inspectedVersion.id),h('code',{className:'mc-versionPath'},inspectedVersion.filePath),h('p',{className:'mc-caption'},inspectedText.length>200000?'界面仅预览前200000字符，完整快照保存在上述文件；实际恢复前还会校验资源。':'以下是实际固定配置，实际恢复前还会校验资源。'),h('pre',{className:'mc-resourceInfo'},inspectedText.slice(0,200000))):null);
    const sessionVersionEditor=h('main',{className:'mc-editor','aria-label':'会话固定版本'},
      h('header',{className:'mc-columnHeader'},h('div',null,h('div',{className:'mc-caption'},'配置隔离'),h('h2',null,'会话版本保护')),
        button('刷新',()=>loadSessionVersions(),{disabled:versionBusy})),
      h('div',{className:'mc-tabs'},h('span',{className:'mc-caption'},'查看版本与旧会话基线，不发送模型请求、不启动研究会话')),
      h('div',{className:'mc-content'},sessionVersionContent),
      h('footer',{className:'mc-editorFooter'},h('span',{className:'mc-caption'},'已有固定绑定不能被配置提案重写'),button('返回当前模式',()=>setManageView('steps'))));

    const managementItems=skillSearchResult?.items||[];
    const librarySources=snapshot.library?.sources||[],primarySources=librarySources.filter(source=>!source.derived),linkedSources=librarySources.filter(source=>source.derived);
    const sourceButton=source=>h('button',{type:'button',key:source.repository,'aria-current':skillSource===source.repository?'page':undefined,title:source.repository,disabled:busy,onClick:()=>chooseSkillSource(source.repository)},h(Icon,{name:'records',size:15}),h('span',{className:'mc-stepLabel'},h('strong',null,sourceTitle(source)),h('small',null,source.entryCount===undefined?'查看真实子技能':source.entryCount+' 项子技能'+(source.linkedCount?' · 含 '+source.linkedCount+' 项引用':''))));
    const managementNav=h('aside',{className:'mc-flow','aria-label':'技能包与来源'},
      h('header',{className:'mc-columnHeader'},h('h2',null,'技能包与来源')),
      h('div',{className:'mc-flowSummary'},h('span',null,primarySources.length+' 个主要来源'),h('span',null,(snapshot.library?.total||0)+' 项入口')),
      h('nav',{className:'mc-stepNav mc-sourceTree','aria-label':'浏览技能包'},h('button',{type:'button','aria-current':!skillSource?'page':undefined,disabled:busy,onClick:()=>chooseSkillSource('')},h('span',{className:'mc-stepLabel'},h('strong',null,'全部技能'),h('small',null,'包含内置与自建技能'))),primarySources.map(sourceButton),linkedSources.length?h('details',null,h('summary',null,'更多引用来源 · '+linkedSources.length),linkedSources.map(sourceButton)):null),
      h('div',{className:'mc-flowFoot'},'选择来源后，逐项浏览并绑定其中的真实子技能。'));
    const skillEntries=h('div',{className:'mc-libraryEntries',role:'group','aria-label':'具体子技能列表'},managementItems.map(item=>h('button',{type:'button',className:'mm-button mc-libraryEntry',key:item.id,'aria-pressed':selectedSkill===item.id,draggable:!!circuitKit&&!busy&&item.invocation?.modelInvocable!==false,onDragStart:event=>{event.dataTransfer.setData('application/x-metis-skill',item.id);event.dataTransfer.effectAllowed='copy';},disabled:busy,onClick:()=>selectSkill(item.id)},h('strong',null,item.name||item.id),h('small',null,item.source?.entryPath||item.id),h('p',null,item.description?.slice(0,180)||''),h('small',null,(item.invocation?.modelInvocable?'可绑定步骤':'只读 / 禁止模型调用')+(item.resourceCount?' · '+item.resourceCount+' 个资源文件':'')))));
    const readonlyInput=(label,value)=>h('input',{'aria-label':label,value:value??'',readOnly:true});
    const readonlyText=(label,value,rows=5)=>h('textarea',{'aria-label':label,value:value??'',readOnly:true,rows,className:'mc-readonlyText'});
    const skillManagement=selectedSkill?h('div',null,
      h('p',{className:'mc-note'},'正文按片段披露，资源按页列出；需要时再继续读取。入库和来源哈希不代表依赖环境或科研效果已验证。'),
      skillError?h(React.Fragment,null,h('div',{className:'mc-status is-error'},skillError),button('从开头重读',()=>{setSkillTextOffset(0);setSkillFileOffset(0);setResourcePath('');setSkillReadRetry(value=>value+1);},{disabled:busy})):!skillDetails?h('p',{className:'mc-note'},'正在读取技能配置…'):h(React.Fragment,null,
        h(Field,{label:'当前子技能'},readonlyInput('技能标识',(skillDetails.name||skillDetails.requirements?.originalName||skillDetails.id)+' · '+skillDetails.description)),
        h('div',{className:'mc-meta'},'真实技能 ID：'+skillDetails.id+' · '+(skillDetails.invocation.modelInvocable?'允许绑定步骤':'仅可阅读，不允许模型调用')),
        step?h(Field,{label:'绑定目标 · '+mode.name},h('select',{'aria-label':'选择技能绑定步骤',value:step.id,disabled:busy,onChange:event=>setIndex(draft.steps.findIndex(item=>item.id===event.target.value))},draft.steps.map((item,position)=>h('option',{key:item.id,value:item.id},String(position+1).padStart(2,'0')+' · '+item.title)))):h('p',{className:'mc-note'},'先选择一个模式并创建步骤，再绑定具体子技能。'),
        skillDetails.requirements?h('details',{className:'mc-modeDefaults'},h('summary',null,'调用要求与关联技能'),
          h('p',{className:'mc-note'},'从此技能的真实正文按需加载；脚本、CLI 与 MCP 使用 DSH 实际工具执行，入库不代表依赖环境已安装。'),
          skillDetails.requirements.declaredCommands?.length?h('p',{className:'mc-note'},'正文涉及命令：'+skillDetails.requirements.declaredCommands.join('、')):null,
          skillDetails.requirements.declaredTools?.length?h('p',{className:'mc-note'},'正文引用工具：'+skillDetails.requirements.declaredTools.join('、')):null,
          skillDetails.requirements.scriptCount?h('p',{className:'mc-note'},'附带 '+skillDetails.requirements.scriptCount+' 个脚本资源，运行时按需准备到真实目录。'):null,
          skillDetails.requirements.dependencyHints?.length?h('p',{className:'mc-note'},'来源声明涉及：'+skillDetails.requirements.dependencyHints.join('、')):null,
          skillDetails.requirements.referencedSkills?.length?h('p',{className:'mc-note'},'关联子技能：'+skillDetails.requirements.referencedSkills.map(item=>item.name+(step?.skills.includes(item.id)?'（本步已绑定）':'（尚未绑定本步）')).join('、')):null):null,
        skillDetails.formatIssue?h('div',{className:'mc-status'},'只读条目 · '+skillDetails.formatIssue):null,
        h(Field,{label:'正文与附属文件'},h('select',{'aria-label':'选择技能正文或资源',value:resourcePath,onChange:event=>{setResourcePath(event.target.value);setSkillTextOffset(0);}},h('option',{value:''},'技能正文'),resourcePath&&!skillDetails.files.some(file=>file.path===resourcePath)?h('option',{value:resourcePath},resourcePath):null,skillDetails.files.map(file=>h('option',{value:file.path,key:file.path},file.path+' · '+file.size+' bytes'+(file.external?' · 按需获取':''))))),
        h('div',{className:'mc-actions'},button('上一页文件',()=>setSkillFileOffset(Math.max(0,skillFileOffset-12)),{disabled:skillFileOffset===0}),button('下一页文件',()=>setSkillFileOffset(skillDetails.nextFileOffset),{disabled:skillDetails.nextFileOffset==null}),h('span',{className:'mc-caption'},'文件 '+(skillDetails.fileTotal||0)+' 项 · 每页12项')),
        resourcePath&&resourceDetails?.binary?h('div',{className:'mc-status'},'二进制资源 · '+resourceDetails.size+' bytes · SHA256 '+resourceDetails.sha256):h(Field,{label:(resourcePath||'技能正文')+' · 当前片段'},readonlyText('技能内容片段',resourcePath?resourceDetails?.content||resourceDetails?.text||'':skillDetails.content||'',16)),
        h('div',{className:'mc-actions'},button('上一片段',()=>setSkillTextOffset(Math.max(0,skillTextOffset-4000)),{disabled:skillTextOffset===0}),button('下一片段',()=>setSkillTextOffset((resourcePath?resourceDetails:skillDetails).nextOffset),{disabled:(resourcePath?resourceDetails:skillDetails)?.nextOffset==null}),h('span',{className:'mc-caption'},'位置 '+skillTextOffset+' / '+((resourcePath?resourceDetails:skillDetails)?.totalCharacters??'—'))),
        h('details',{className:'mc-modeDefaults'},h('summary',null,'来源、依赖与当前页资源'),h('pre',{className:'mc-resourceInfo'},JSON.stringify({source:skillDetails.source,license:skillDetails.license,dependencyHints:skillDetails.dependencyHints,verification:skillDetails.verification,upstreamEvidence:skillDetails.upstreamEvidence,files:skillDetails.files},null,2)))),
      h('div',{className:'mc-actions'},button(step?.skills.includes(selectedSkill)?'从当前步骤解绑':step?'绑定到“'+step.title+'”':'先选择绑定步骤',()=>{if(!step)return;updateStep({skills:step.skills.includes(selectedSkill)?step.skills.filter(id=>id!==selectedSkill):[...step.skills,selectedSkill]});setStatus({text:'当前步骤绑定已更新到草稿，点击“保存并生效”即可启用。'});},{disabled:busy||skillSearchBusy||!configurationReady||!step||!skillDetails||skillDetails.id!==selectedSkill||skillDetails.invocation?.modelInvocable===false&&!step.skills.includes(selectedSkill),title:step?.title}),button('让AI修改技能',()=>askAssistant('请读取技能'+selectedSkill+(resourcePath?'的资源文件'+resourcePath:'的正文')+'，和我讨论要改的内容，然后更新到当前流程。'),{disabled:!assistantReady}),button('让AI删除技能',()=>askAssistant('请检查技能'+selectedSkill+'在哪些模式和步骤中被使用，再与我确认解绑影响，然后更新到当前流程。'),{disabled:!assistantReady}))):h('div',{className:'mc-emptyFlow'},h('h3',null,'选择一个子技能'),h('p',{className:'mc-note'},'先选择左侧技能包，再在上方选择具体子技能，查看正文、调用要求并绑定到步骤。'));
    const archives=manageView==='skills'?snapshot.archivedSkills||[]:[];
    const archivedPanel=archives.length?h('details',{className:'mc-modeDefaults'},h('summary',null,'已删除技能 · '+archives.length+' 项'),archives.map(item=>h('div',{className:'mc-archiveRow',key:item.id},h('span',null,item.description||item.id),button('让AI恢复',()=>askAssistant('请恢复已删除的技能'+item.id+'，并检查相关配置是否完整。'),{disabled:!assistantReady})))):null;
    const managementEditor=h('main',{className:'mc-editor mc-libraryEditor','aria-label':'技能配置'},
      h('header',{className:'mc-columnHeader'},h('div',null,h('div',{className:'mc-caption'},'SKILL MODULES / 科研模块库'),h('h2',null,'技能库')),button('创建/安装技能',()=>askAssistant('我想创建或安装技能。请先确认功能需求或我提供的来源目录/GitHub链接，再生成配置提案。'),{disabled:busy||!assistantReady})),
      h('div',{className:'mc-content'},h('div',{className:'mc-libraryIntro'},h('div',null,h('span',{className:'mc-caption'},'RESEARCH CAPABILITIES'),h('p',null,'按研究任务检索，选择具体技能绑定到步骤。')),h('div',null,h('strong',null,Number.isFinite(snapshot.library?.total)?snapshot.library.total.toLocaleString('zh-CN'):'—'),h('p',null,'上游技能入口'))),skillSearchControls(),skillSearchBusy?h('p',{className:'mc-note',role:'status'},'正在检索子技能…'):!managementItems.length&&!skillSearchError?h('p',{className:'mc-note'},'没有匹配的子技能，请调整关键词或来源。'):null,skillEntries,archivedPanel),
      selectedSkill?h('aside',{className:'mc-skillInspector','aria-label':'技能详情',onKeyDown:event=>{if(event.key==='Escape'){event.preventDefault();closeSkillDetails();}}},h('header',{className:'mc-columnHeader'},h('div',null,h('div',{className:'mc-caption'},'MODULE INSPECTOR'),h('h2',null,skillDetails?.name||skillMetadataCache.current.get(selectedSkill)?.name||'技能详情')),iconButton('close','关闭技能详情',closeSkillDetails,busy)),h('div',{className:'mc-skillInspectorBody'},skillManagement)):null,
      h('footer',{className:'mc-editorFooter'},h('span',{className:'mc-caption'},'点击“保存并生效”即可启用'),button('返回当前模式',()=>setManageView('steps'))));

    const modeLabel=item=>item.name.replace(/^METIS[ ·]*/,'')||item.name;
    const groupedModes=snapshot.modes;
    const modeChoices=groupedModes.filter(item=>!modeQuery.trim()||[item.name,item.description,item.id].join(' ').toLowerCase().includes(modeQuery.trim().toLowerCase()));
    const modePicker=h('div',{className:'mc-modePicker'},
      h('button',{type:'button',className:'mc-modeTrigger',ref:modeTriggerRef,'aria-label':'选择编排模式','aria-haspopup':'dialog','aria-expanded':modeMenuOpen,'aria-controls':modeMenuOpen?'metis-mode-menu':undefined,disabled:busy||(!snapshot.modes.length&&!modeManagementReady),title:selected?mode.name:'选择模式',onClick:()=>{setModeQuery('');setModeMenuOpen(!modeMenuOpen);},onKeyDown:event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();setModeQuery('');setModeMenuOpen(true);}}},h('span',null,selected?modeLabel(mode):'尚无模式'),h(Icon,{name:'down',size:14})),
      modeMenuOpen?h('div',{className:'mc-modeMenu',id:'metis-mode-menu',ref:modeMenuRef,role:'dialog','aria-label':'选择和管理模式',onKeyDown:modeMenuKey,onBlur:event=>{if(event.relatedTarget&&!modeMenuRef.current?.contains(event.relatedTarget)&&!modeTriggerRef.current?.contains(event.relatedTarget))setModeMenuOpen(false);}},
        h('input',{type:'search',className:'mc-modeSearch',autoFocus:true,value:modeQuery,placeholder:'搜索模式…','aria-label':'搜索编排模式',onChange:event=>setModeQuery(event.target.value)}),
        h('div',{className:'mc-modeGroups'},modeChoices.length?modeChoices.map((item,position)=>{
          const canSort=modeSortReady&&groupedModes.length>1;
          return h('div',{className:'mc-modeRow',key:item.id,'data-mode-index':position,'data-sort-mode':item.id,'data-dragging':modeDrag?.sourceId===item.id?'true':undefined,'data-drop-edge':modeDrag?.overId===item.id?modeDrag.edge:undefined,onDragOver:event=>modeDragOver(event,item),onDragLeave:event=>modeDragLeave(event,item),onDrop:event=>modeDrop(event,item)},
            button(h(Icon,{name:'grip',size:14}),undefined,{className:'mc-mini mc-modeGrip','aria-label':'调整 '+item.name+' 的顺序','aria-describedby':'metis-mode-sort-hint',title:'拖动排序；Alt + ↑ / ↓ 移动',draggable:!busy&&canSort,disabled:busy||!canSort,onDragStart:event=>modeDragStart(event,item),onDragEnd:clearModeDrag,onKeyDown:event=>modeSortKey(event,item)}),
            h('button',{type:'button',className:'mc-modeOption','aria-pressed':selected===item.id,disabled:busy,ref:element=>{modeOptionRefs.current[position]=element;},title:item.description?item.name+'\n'+item.description:item.name,onClick:()=>chooseMode(item.id)},h(Icon,{name:selected===item.id?'check':'records',size:14}),h('span',null,modeLabel(item)+(drafts.has(item.id)?' · 草稿':''))),
            button(h(Icon,{name:'edit',size:14}),()=>openModeAction('edit',item.id),{className:'mc-mini mc-modeEdit',title:'编辑 '+item.name,'aria-label':'编辑模式 '+item.name+' 的名称和说明',disabled:busy||!modeManagementReady}),
            button(h(Icon,{name:'trash',size:14}),()=>openModeAction('delete',item.id),{className:'mc-mini mc-modeDelete',title:'删除 '+item.name,'aria-label':'删除模式 '+item.name,disabled:busy||!modeManagementReady}));
        }):h('p',{className:'mc-note',style:{padding:'12px 10px',margin:0}},snapshot.modes.length?'没有匹配的模式':'还没有模式，请使用右侧“新建模式”')),
        snapshot.modes.length>1?h('p',{className:'mc-modeSortHint'+(modeSortNotice?.error?' is-error':''),id:'metis-mode-sort-hint',role:modeSortNotice?'status':undefined,'aria-live':'polite'},modeSortNotice?.text||'拖动调整模式顺序 · 手柄支持 Alt + ↑ / ↓'):null
      ):null);
    const deletedMode=modeAction?.kind==='delete'?snapshot.modes.find(item=>item.id===modeAction.modeId):null;
    const modeActionDialog=modeAction?h('div',{className:'mc-modeDialogBackdrop',onKeyDown:modeDialogKey},
      h('form',{className:'mc-modeDialog',ref:modeDialogRef,role:'dialog','aria-modal':true,'aria-labelledby':'metis-mode-action-title','aria-describedby':'metis-mode-action-description',tabIndex:-1,onSubmit:submitModeAction},
        h('header',{className:'mc-columnHeader'},h('div',null,h('div',{className:'mc-caption'},'模式管理'),h('h2',{id:'metis-mode-action-title'},modeAction.kind==='create'?'新建模式':modeAction.kind==='edit'?'编辑名称和说明':'删除模式')),iconButton('close','关闭模式操作',closeModeAction,busy)),
        h('div',{className:'mc-content'},
          h('p',{className:'mc-note',id:'metis-mode-action-description'},modeAction.kind==='create'?'创建模式后可继续编排，最后统一“保存并生效”。':modeAction.kind==='edit'?'名称和说明会更新到当前流程，最后统一保存。':'从当前流程移除，保存后生效，不保留归档；已有会话继续使用原固定版本。'),
          modeActionError?h('div',{className:'mc-status is-error',role:'alert'},modeActionError):null,
          modeAction.kind!=='delete'?h('fieldset',{className:'mc-stepFieldset',disabled:busy},
            h(Field,{label:'模式名称'},input(modeAction.kind==='edit'?'编辑模式名称':'新模式名称',modeAction.name,value=>setModeAction({...modeAction,name:value}),{maxLength:120,required:true,placeholder:'例如：文献综述 · 理论研究','data-initial-focus':true})),
            modeAction.kind==='create'?h(React.Fragment,null,
              h(Field,{label:'初始工作流',hint:modeAction.copyFromId?'完整复制该模式当前草稿中的步骤、技能、提示词和默认参数，创建后可继续修改。':'创建后可自行编排，也可让AI构建步骤。'},h('select',{'aria-label':'新模式初始工作流',value:modeAction.copyFromId,onChange:event=>{const source=snapshot.modes.find(item=>item.id===event.target.value);setModeAction({...modeAction,copyFromId:event.target.value,...(source?{artifact:source.artifact||'',paradigm:source.paradigm||'qualitative'}:{})});}},h('option',{value:''},'使用基础模板'),snapshot.modes.map(item=>h('option',{key:item.id,value:item.id},'复制 · '+modeLabel(item)))))
            ):null,
            h(Field,{label:'模式说明（可选）'},h('textarea',{'aria-label':modeAction.kind==='edit'?'编辑模式说明':'新模式说明',value:modeAction.description,rows:3,maxLength:3000,placeholder:'这个模式用来完成什么？',onChange:event=>setModeAction({...modeAction,description:event.target.value})}))):h(React.Fragment,null,
              h('strong',null,deletedMode?.name||modeAction.modeId),h('p',{className:'mc-note',style:{marginTop:8}},(effective?.profiles[modeAction.modeId]?.profile.steps.length||0)+' 个步骤将随模式删除。'+(snapshot.modes.length===1?'这是最后一个模式，删除后仍可新建。':'')))),
        h('footer',{className:'mc-editorFooter'},
          button('取消',closeModeAction,{disabled:busy,'data-initial-focus':modeAction.kind==='delete'?true:undefined}),
          h('button',{type:'submit',className:'mm-button '+(modeAction.kind==='delete'?'mc-danger':'mm-primary'),disabled:busy||!modeManagementReady||(modeAction.kind!=='delete'?!modeAction.name.trim():!deletedMode)},busy?'处理中…':modeAction.kind==='create'?'创建模式':modeAction.kind==='delete'?'删除模式':'确认修改'))
      )):null;
    const moreActions=h('details',{className:'mc-more',ref:moreRef,open:moreOpen,onToggle:event=>setMoreOpen(event.currentTarget.open)},
      h('summary',{className:'mm-button','aria-label':'更多流程操作'},h('span',null,'更多'),h(Icon,{name:'down',size:14})),
      h('div',{className:'mc-moreMenu','aria-label':'其他流程操作'},
        button('新建研究会话',()=>{setMoreOpen(false);void newSession();},{disabled:busy||dirty||!configurationReady||!selected,title:dirty?'先保存当前流程':'使用当前保存的模式开始研究'}),
        button('重新读取配置',()=>{setMoreOpen(false);void refresh();},{disabled:busy}),
        button('使用基础模板',()=>{setMoreOpen(false);restore();},{disabled:busy||!configurationReady||!selected}),
        button('放弃未保存修改',()=>{setMoreOpen(false);void discard();},{className:'mm-button mc-menuDanger',disabled:busy||!dirty})));
    const header=h('header',{className:'mc-top','aria-label':'METIS操作栏'},
      h('div',{className:'mc-brand'},h('div',{className:'mc-logo'},h(Wordmark,{size:20})),h('h1',null,'METIS'),
        h('button',{type:'button',className:'mm-theme mc-modeToggle',role:'switch','aria-checked':modeState.enabled,'aria-label':'METIS 模式开关',title:'METIS 模式开关',disabled:busy,onClick:()=>actions.setMode(!modeState.enabled)},h('span',{className:'mm-switch'}))),
      navigation,
      h('div',{className:'mc-modeField'},modePicker,button(h(React.Fragment,null,h(Icon,{name:'plus',size:14}),'新建模式'),()=>openModeAction('create'),{disabled:busy||!modeManagementReady}),h('span',{className:'mc-saveState'+(dirty?' is-dirty':status?.kind==='saved'?' is-justSaved':''),role:'status',title:dirty?'改动已在共同草稿中，保存后供新会话使用':'当前流程已保存，已有研究会话保持原配置'},dirty?'待保存':status?.kind==='saved'?'已生效':'已保存')),
      h('div',{className:'mc-topTools'},
        button(h(React.Fragment,null,h(Icon,{name:'records',size:15}),'技能库'),()=>manageView==='skills'?setManageView('steps'):enterLibrary(),{className:'mm-button mc-libraryButton','aria-pressed':manageView==='skills',disabled:busy,title:manageView==='skills'?'返回当前模式':'浏览与管理技能'}),
        button(h(React.Fragment,null,h(Icon,{name:savePending.current?'refresh':'check',size:15,className:savePending.current?'mm-spin':''}),savePending.current?'保存中…':'保存并生效'),()=>save(),{className:'mm-button mm-primary mc-saveButton','aria-label':'保存并生效','aria-keyshortcuts':'Control+S Meta+S',disabled:!!saveReason,title:saveReason||'保存当前流程并用于新会话 · Ctrl / ⌘ + S'}),moreActions));
    const stepNav=h('aside',{className:'mc-flow','aria-label':'流程步骤'},
      h('header',{className:'mc-columnHeader'},h('h2',null,'流程步骤'),iconButton('plus','新增步骤',addStep,busy||!configurationReady||!selected||draft.steps.length>=stepLimit)),
      h('div',{className:'mc-flowSummary'},h('span',null,draft.steps.length+' 个步骤'),h('span',null,'按顺序执行')),
      h('nav',{className:'mc-stepNav mc-workflowNav','aria-label':'选择或排序工作流步骤'},draft.steps.map((item,i)=>
        h('div',{className:'mc-stepRow'+(index===i?' is-current':''),key:item.id,'data-workflow-step':item.id,'data-dragging':stepDrag?.sourceId===item.id?'true':undefined,'data-drop-edge':stepDrag?.overId===item.id?stepDrag.edge:undefined,'data-drop-axis':stepDrag?.overId===item.id?stepDrag.axis:undefined,onDragOver:event=>stepDragOver(event,item),onDragLeave:event=>stepDragLeave(event,item),onDrop:event=>stepDrop(event,item),onKeyDown:event=>stepSortKey(event,item)},
          button(h(Icon,{name:'grip',size:14}),undefined,{className:'mc-mini mc-stepGrip','aria-label':'调整步骤 '+item.title+' 的顺序','aria-describedby':'metis-step-sort-hint',title:'拖动排序；Alt + 方向键移动',draggable:!busy&&configurationReady&&draft.steps.length>1,disabled:busy||!configurationReady||draft.steps.length<2,onDragStart:event=>stepDragStart(event,item),onDragEnd:clearStepDrag}),
          h('button',{type:'button',className:'mc-stepChoice','aria-current':index===i?'step':undefined,'aria-label':'第'+(i+1)+'步 '+item.title,title:item.title,disabled:busy,onClick:()=>go(i)},
            h('span',{className:'mc-stepIndex'},String(i+1).padStart(2,'0')),h('span',{className:'mc-stepLabel'},h('strong',null,item.title),h('small',null,item.skills.length+' 项技能'+(item.loop?.enabled?' · 达标循环':''))))
        )
      )),
      h('div',{className:'mc-flowFoot',id:'metis-step-sort-hint'},'拖动手柄调整顺序，或按 Alt + 方向键移动。点击“保存并生效”即可启用。'));
    const stepEditor=h('main',{className:'mc-editor','aria-label':'步骤编辑器'},
      h('header',{className:'mc-columnHeader'},
        h('div',{className:'mc-stepIdentity'},h('span',{className:'mc-editorNode','aria-hidden':true},step?String(index+1).padStart(2,'0'):'+'),h('div',{className:'mc-stepIdentityText'},h('div',{className:'mc-caption'},step?'FLOW NODE · '+String(index+1).padStart(2,'0')+' / '+String(draft.steps.length).padStart(2,'0'):'空流程'),step?h('div',{className:'mc-stepNameWrap','data-ion-changed':aiChangedFields.includes(stepPath()+'/title')?'true':undefined},input('步骤名称',step.title,value=>updateStep({title:value}),{maxLength:100,ref:titleInputRef,disabled:busy||!configurationReady,title:'直接编辑步骤名称'}),h(Icon,{name:'edit',size:12})):h('h2',null,'添加第一个步骤'))),
        h('div',{className:'mc-stepManage'},
          iconButton('up','上移步骤',()=>moveStep(-1),busy||!configurationReady||!step||index===0),
          iconButton('down','下移步骤',()=>moveStep(1),busy||!configurationReady||!step||index===draft.steps.length-1),
          iconButton('copy','复制步骤',duplicateStep,busy||!configurationReady||!step||draft.steps.length>=stepLimit),
          iconButton('trash','删除步骤',removeStep,busy||!configurationReady||!step))),
      h('div',{className:'mc-content',ref:editorScrollRef},aiChangedFields.length?h('div',{className:'mc-aiChangeNotice',role:'status'},h(Icon,{name:'activity',size:13}),'AI 更新已同步到流程，手动修改保持优先'):null,h('fieldset',{className:'mc-stepFieldset',key:selected+':'+(step?.id||'empty'),disabled:busy||!configurationReady},
        selected?fields():h('div',{className:'mc-emptyFlow'},h('h3',null,'还没有模式'),h('p',{className:'mc-note'},'先新建模式，再编排步骤，也可以交给AI助手一起构建。'),button('新建模式',()=>openModeAction('create'),{className:'mm-button mm-primary',disabled:busy||!modeManagementReady}),button('让AI创建模式',()=>askAssistant('请帮我创建一个METIS模式，先确认目标，再编排步骤。'),{disabled:!assistantReady}))
      )),
      h('footer',{className:'mc-editorFooter'},h('span',{className:'mc-caption'},'保存后用于新会话'),h('div',null,
        button('上一步',()=>go(index-1),{disabled:busy||!step||index===0}),
        button('下一步',()=>go(index+1),{disabled:busy||!step||index>=draft.steps.length-1}))));
    if(snapshot.schemaVersion!==2)return h('div',{className:'mm-panel'},h('div',{className:'mm-shell'},h('div',{className:'mc-status'},'分步编排服务需要重新加载，暂不保存到旧接口。')));
    if(circuitKit){
      const model=selected?circuitKit.modeModel(mode,draft,[...skillMetadataCache.current.values()],step?.id,{dirty,busy:busy||!configurationReady}):null;
      const palette=h('div',{className:'ic-paletteBody'},h('div',{className:'mc-actions'},button('创建 / 安装技能',()=>askAssistant('请帮我创建或安装一个技能，先确认用途与真实来源，再更新当前技能库。'),{disabled:!assistantReady})),h('p',{className:'mc-note'},'拖动具体技能到节点；也可以选中技能后绑定。'),skillSearchControls(),h('div',{hidden:!!selectedSkill},skillEntries),
        selectedSkill?h(React.Fragment,null,button('返回技能列表',closeSkillDetails),h('div',{className:'ic-skillBind',draggable:!busy&&skillMetadataCache.current.get(selectedSkill)?.invocation?.modelInvocable!==false,title:'拖动此技能到流程节点',onDragStart:event=>{event.dataTransfer.setData('application/x-metis-skill',selectedSkill);event.dataTransfer.effectAllowed='copy';}},h('span',null,skillMetadataCache.current.get(selectedSkill)?.name||selectedSkill),button(step?.skills.includes(selectedSkill)?'已绑定当前步骤':'绑定到当前步骤',()=>graphBind(step?.id,selectedSkill),{disabled:!step||busy||step.skills.includes(selectedSkill)||skillMetadataCache.current.get(selectedSkill)?.invocation?.modelInvocable===false})),skillManagement):null);
      return h('div',{className:'mm-panel mc-panel','data-console-surface':'composer',ref:workspaceRef,onKeyDownCapture:workbenchKey},h(circuitKit.Canvas,{model,header,assistant:assistantPanel,inspector:stepEditor,palette,paletteOpen:manageView==='skills',onClosePalette:()=>setManageView('steps'),onSelect:id=>{const at=draft.steps.findIndex(item=>item.id===id);if(at>=0)go(at);},onAdd:()=>addStep(),onAddAfter:id=>addStep(id),onReorder:reorderStep,onBindSkill:graphBind,onToggleLoop:id=>{const target=draft.steps.find(item=>item.id===id);if(target)graphStep(id,{loop:{enabled:!target.loop?.enabled,criteria:target.loop?.criteria||''}});},onSkillInspect:(id,skillId)=>{const at=draft.steps.findIndex(item=>item.id===id);if(at>=0)setIndex(at);setManageView('skills');selectSkill(skillId);},onFocusChat:()=>workspaceRef.current?.querySelector('.ic-assistant [contenteditable=true],.ic-assistant textarea')?.focus(),
        notice:status&&status.kind!=='saved'?h('div',{className:'mc-status mc-toast'+(status.error?' is-error':''),role:status.error?'alert':'status'},h('span',null,status.text),iconButton('close','关闭提示',()=>setStatus(null))):!configurationReady?h('div',{className:'mc-status'},'正在等待编排服务恢复，草稿已保留。'):null,
        empty:!selected?h('div',{className:'mc-emptyFlow'},h('h2',null,'搭建您的第一套流程'),h('p',null,'新建模式，或直接和右侧 AI 讨论目标。'),button('新建模式',()=>openModeAction('create'),{className:'mm-button mm-primary',disabled:busy||!modeManagementReady})):undefined},modeActionDialog));
    }
    return h('div',{className:'mm-panel mc-panel','data-console-surface':'composer',onKeyDownCapture:workbenchKey},h('div',{className:'mc-shell'},header,
      status&&status.kind!=='saved'?h('div',{className:'mc-status mc-toast'+(status.error?' is-error':''),role:status.error?'alert':'status'},h(Icon,{name:status.error?'alert':'check',size:16}),h('span',null,status.text),iconButton('close','关闭提示',()=>setStatus(null))):null,
      !configurationReady?h('div',{className:'mc-status'},'新版编排后端尚未就绪，当前草稿仍保留。请让DSH完成更新后继续编辑与保存。'):null,
      h('div',{className:'mc-workspace',ref:workspaceRef},h('div',{className:'mc-grid has-assistant',ref:gridRef},manageView==='steps'?stepNav:managementNav,paneSeparator('nav'),manageView==='steps'?stepEditor:managementEditor,paneSeparator('assistant'),assistantPanel))),modeActionDialog);
  };
}

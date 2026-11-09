/** METIS research workbench. Data is read from the real engine-backed Host routes. */
window.__ModuleLoader__.load({
  id: 'metis-academic-mode',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    // METIS_ION_STYLE_START
    // Generated from ion-workbench.css; edit that file. SHA-256 0c47f825222ac507332f2061c63294edaad91040997ef7ecd397d8262c91fc64
    const ION_WORKBENCH_CSS="/* METIS ION design system. Scoped to METIS; native DSH controls retain their behavior. */\nbody :is(.mm-workbench,.mm-panel.mc-panel,.mm-panel.mr-panel,.mdoc){\n  --ion-void:#0b0910;--ion-panel:#151018;--ion-panel-raised:#1d141e;--ion-field:#100d15;\n  --ion-copper:#ff9f64;--ion-gold:#ffcc91;--ion-border:#48303e;--ion-hairline:#352531;\n  --ion-text:#f0e2dc;--ion-secondary:#bda4b2;--ion-dim:#a38999;--ion-success:#8ee0bd;--ion-danger:#ffac9c;\n  --mm-bg:var(--ion-void);--mm-surface:var(--ion-panel);--mm-soft:#251923;--mm-line:var(--ion-border);\n  --mm-ink:var(--ion-text);--mm-muted:var(--ion-secondary);--mm-accent:var(--ion-copper);--mm-cta-ink:#21110b;\n  --mr-paper:var(--ion-void);--mr-rail:#100d15;--mr-rule:var(--ion-hairline);--mr-accent:var(--ion-copper);\n  --mr-on-accent:#24120b;--mr-tint:#ff9f6413;\n  color:var(--ion-text);color-scheme:dark;font-family:\"Segoe UI\",\"Microsoft YaHei UI\",\"Microsoft YaHei\",sans-serif;\n}\n.mm-workbench{height:100%;min-height:0;display:flex;flex-direction:column;background:var(--ion-void);position:relative;isolation:isolate}\n.mm-workbench :is(button,input,textarea,select,summary){-webkit-app-region:no-drag}\n.mm-workbench :is(button,input,textarea,select,summary):focus-visible{outline:2px solid var(--ion-gold);outline-offset:3px}\n.mm-workbench :is(button,summary){touch-action:manipulation}\n.mm-workbench ::selection{background:#bb6a4190;color:#fff5e8}\n.mm-workbench *{scrollbar-width:thin;scrollbar-color:#815448 #110d16}\n.mm-workbench ::-webkit-scrollbar{width:7px;height:7px}.mm-workbench ::-webkit-scrollbar-track{background:#110d16}.mm-workbench ::-webkit-scrollbar-thumb{background:#634048;border:2px solid #110d16;border-radius:8px}\n.mm-panel.mc-panel,.mm-panel.mr-panel{background:var(--ion-void);overflow:hidden}\n.mc-shell,.mr-shell{position:relative;isolation:isolate;background:radial-gradient(ellipse at 6% -20%,#d16c3420,transparent 48%),radial-gradient(ellipse at 90% 100%,#6e376215,transparent 50%),var(--ion-void)}\n.mc-panel .mc-shell{min-width:0!important;padding:0!important;gap:0!important;height:100%;max-width:none;width:100%;margin:0}.mc-workspace>.mc-grid.has-assistant{border:0!important;border-radius:0!important}\n.mc-top,.mr-consoleBar,.ion-loadingBar{height:62px;min-height:62px;display:flex;align-items:center;gap:14px;padding:0 20px;border-bottom:1px solid #674338;background:linear-gradient(105deg,#24151e,#141019 55%,#100d16);position:relative;z-index:8;flex:none}\n.mc-top::after,.mr-consoleBar::after{content:'';position:absolute;left:0;bottom:-1px;width:32%;height:1px;background:linear-gradient(90deg,#ffb77c,transparent);pointer-events:none}\n.mc-brand,.mr-consoleBrand{display:flex;align-items:center;gap:9px;flex:none;color:#ffddbc}\n.mc-brand h1,.mr-consoleBrand strong{font:650 17px/1.1 \"Segoe UI\",sans-serif;letter-spacing:.16em;margin:0;color:#ffe8d5}\n.mc-logo,.mr-consoleMark{width:32px;height:32px;display:grid;place-items:center;border:1px solid #a06b4c;background:linear-gradient(145deg,#4a291e,#20131a);border-radius:5px;box-shadow:inset 0 1px 0 #ffe6c51a,0 0 20px #c77b3320;color:#ffc792}\n.mc-modeToggle{margin:0 0 0 1px;padding:5px 3px!important}.mm-switch{background:#58404b!important}.mm-theme[aria-checked=true] .mm-switch{background:#d28a54!important;box-shadow:0 0 12px #ec8d3733}.mm-switch::after{background:#f5d9c3!important}\n.mm-workspaceTabs{display:flex;align-items:center;gap:3px;padding:3px;border:1px solid #533744;border-radius:5px;background:#0d0a12;flex:none;position:relative}\n.mm-workspaceTabs [role=tab]{min-height:31px;padding:5px 14px;border:0;border-radius:3px;background:transparent;color:#c4a8b4;font:500 12px/1.4 \"Segoe UI\",\"Microsoft YaHei UI\",sans-serif;cursor:pointer;white-space:nowrap;transition:color .15s,background .15s,box-shadow .15s}\n.mm-workspaceTabs [role=tab]:hover{color:#ffe2cb;background:#412522}.mm-workspaceTabs [aria-selected=true]{color:#ffd2a6;background:linear-gradient(145deg,#603725,#35201f);box-shadow:inset 0 0 0 1px #ac714c66,0 0 15px #d2783020}\n.mm-workspaceContent{flex:1;min-height:0;overflow:hidden}.ion-loadingBar{justify-content:flex-start}.ion-loadingBar .mm-workspaceTabs{margin-left:12px}\n.mc-modeField{display:flex;align-items:center;gap:9px;flex:1;min-width:180px}.mc-modePicker{min-width:150px;max-width:340px;flex:1}.mc-modeTrigger{height:34px;border-radius:4px!important;border:1px solid #76503f!important;background:linear-gradient(110deg,#2a1920,#171018)!important;color:#f3d4c2!important;font-size:12px!important;box-shadow:inset 0 1px 0 #f6c79c08}\n.mc-modeTrigger[aria-expanded=true]{border-color:#f3a366!important;box-shadow:0 0 0 2px #ed9d5120}.mc-modeField>.mm-button{min-height:34px;padding:5px 10px}.mc-saveState{font-size:10px;display:inline-flex;align-items:center;gap:5px;white-space:nowrap;color:#b8a0ac}.mc-saveState::before{content:'';width:4px;height:4px;border-radius:50%;background:#81bd9e}.mc-saveState.is-dirty{color:#f5c08e}.mc-saveState.is-dirty::before{background:#ffb66e;box-shadow:0 0 8px #f7a24760}\n.mc-topTools{display:flex;align-items:center;gap:7px;flex:none}.mm-panel :is(.mm-button,.mc-iconButton,.mc-mini,.mr-action,.mr-start,.mr-historyToggle,.mdoc-save){border-radius:4px;font-family:inherit;transition:background-color .16s,border-color .16s,box-shadow .16s,color .16s,transform .12s}\n.mm-panel .mm-button{min-height:34px;padding:6px 12px;font-size:12px;border:1px solid #60404a;background:linear-gradient(140deg,#2b1c25,#1c141f);color:#e4c9c8;box-shadow:inset 0 1px 0 #ffe2ce08}\n.mm-panel .mm-button:hover:enabled{background:#41271f;border-color:#bc8059;color:#ffe2c6;box-shadow:0 0 18px #f49b3d13}.mm-panel .mm-button:active:enabled{transform:translateY(1px);background:#513022}\n.mm-panel .mm-button.mm-primary,.mdoc .mdoc-save:enabled{background:linear-gradient(135deg,#ffd098,#ed9b61);border-color:#ffd6a3;color:#2d170e;font-weight:650;box-shadow:inset 0 1px 0 #fff0cf88,0 0 20px #ed973928}\n.mm-panel .mm-button.mm-primary:hover:enabled,.mdoc .mdoc-save:hover:enabled{filter:brightness(1.07);box-shadow:0 0 25px #efa65340}.mm-panel button:disabled{cursor:default;opacity:.43;filter:saturate(.5);box-shadow:none}\n.mm-panel :is(.mc-iconButton,.mc-mini,.mr-iconButton){background:#241822;color:#c6a0a6;border:1px solid #533441;border-radius:4px}.mm-panel :is(.mc-iconButton,.mc-mini,.mr-iconButton):hover:enabled{background:#422620;color:#ffd0a4;border-color:#c38458}\n.mm-panel :is(.mc-moreMenu,.mc-modeMenu,.mc-modeDialog,.mr-dialog){border:1px solid #9c674d;background:linear-gradient(140deg,#2b1923,#140e18);box-shadow:0 20px 80px #0009,0 0 30px #f2943310;border-radius:7px}\n.mc-modeMenu{padding:7px;animation:ion-pop-in .16s ease-out both}.mc-modeSearch{border:1px solid #77503f!important;background:#130d15!important;color:#f0dbd3!important;border-radius:4px!important}.mc-modeRow{border-bottom:1px solid #442b37}.mc-modeRow:last-child{border-bottom:0}.mc-modeOption{color:#d5b6bb}.mc-modeOption[aria-pressed=true]{background:#e3944b18!important;color:#ffd2a5!important}.mc-modeGrip{border:0!important;background:transparent!important;cursor:grab}.mc-modeOption>svg{color:#e9a569}\n.mc-workspace{padding:0!important;min-height:0}.mc-grid{gap:0!important;background:#0e0b13;border:0!important;border-radius:0!important;overflow:hidden;isolation:isolate}\n.mc-flow,.mc-editor,.mc-assistant{border-radius:0!important;min-height:0;position:relative;box-shadow:none!important}.mc-flow{background:linear-gradient(105deg,#161019,#100d15)!important}.mc-editor{background:linear-gradient(145deg,#171019,#100d15 65%)!important}.mc-assistant{background:#110d16!important}\n.mc-columnHeader{min-height:66px;padding:12px 18px;border-bottom:1px solid #51313c;background:linear-gradient(110deg,#2b1820b3,#1a121b)}.mc-columnHeader h2{font-size:14px;line-height:1.5;font-weight:600;letter-spacing:.02em;color:#f4d7c8}.mc-columnHeader .mc-caption{color:#c68e74;font:10px/1.5 ui-monospace,\"Microsoft YaHei UI\",monospace;letter-spacing:.07em}.mc-columnHeader::before{content:'';position:absolute;top:0;left:0;width:14px;height:14px;border-top:1px solid #a76d49;border-left:1px solid #a76d49;pointer-events:none;opacity:.75}\n.mc-flowSummary{padding:10px 16px;font-size:10px;color:#b897a4;border-bottom:1px solid #3b2632;letter-spacing:.02em}.mc-stepNav{padding:13px 10px 18px;gap:5px}.mc-workflowNav{position:relative}.mc-workflowNav::before{content:'';position:absolute;left:35px;top:25px;bottom:35px;width:1px;background:linear-gradient(#d48a5580,#663e4380);pointer-events:none}\n.mc-stepRow{position:relative;border:1px solid transparent!important;border-radius:5px!important;background:transparent;transition:background .16s,border-color .16s,box-shadow .16s,transform .16s}.mc-stepRow:hover{background:#4f2c281f!important;border-color:#80513f!important}.mc-stepRow.is-current{border-color:#be815b!important;background:linear-gradient(110deg,#61362370,#2e1a22)!important;box-shadow:inset 2px 0 0 #ffc58b,0 0 22px #d98e3812}\n.mc-stepChoice{min-height:70px;padding:12px 10px!important;text-align:left!important;gap:10px!important;background:transparent!important}.mc-stepIndex{width:29px;height:29px;border-radius:4px!important;border:1px solid #7c4f40;background:#22141d!important;color:#d8a282;font:12px/1 ui-monospace,monospace;z-index:1}.is-current .mc-stepIndex{background:linear-gradient(135deg,#fac28b,#b76f45)!important;color:#28120d!important;border-color:#f7c18a!important;box-shadow:0 0 13px #df9a3540}.mc-stepLabel strong{font-size:12px!important;line-height:1.6;color:#eed6ce}.mc-stepLabel small{font-size:10px;color:#bc96a4;margin-top:3px}.mc-stepGrip{width:18px!important;min-width:18px!important;padding:2px!important;border:0!important;background:transparent!important;color:#9d737e!important;cursor:grab}\n.mc-stepRow[data-dragging=true]{opacity:.4;transform:scale(.98)}.mc-stepRow[data-drop-edge=before]::before,.mc-stepRow[data-drop-edge=after]::after{background:#ffc078!important;box-shadow:0 0 12px #ffae5b80}.mc-flowFoot{padding:13px 15px;color:#aa899a;font-size:10px;line-height:1.8;border-top:1px solid #412936;background:#120d16}\n.mc-paneDivider,.mc-split{background:#38232d!important;transition:background .15s,box-shadow .15s}.mc-paneDivider:hover,.mc-paneDivider:focus-visible,.mc-split:hover,.mc-split:focus-visible{background:#bc794c!important;box-shadow:0 0 12px #d88d4740}\n.mc-content{padding:24px clamp(20px,3vw,58px)!important;scrollbar-gutter:stable}.mc-simpleStep{width:100%;max-width:1020px;margin:0 auto;display:grid;gap:20px!important}.mc-field{margin:0!important;min-width:0;position:relative}.mc-label{font-size:12px;font-weight:550;letter-spacing:.025em;color:#d6ac95;margin-bottom:8px;line-height:1.5}.mc-fieldHeader{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:8px}.mc-fieldHeader>.mc-label{margin:0}.mc-field small,.mc-note{color:#b898a8;font-size:11px;line-height:1.8}\n.mc-panel :is(.mc-field input:not([type=checkbox]):not([type=radio]),.mc-field textarea,.mc-field select,.mc-skillSearch input,.mc-skillSearch select){box-sizing:border-box;width:100%;padding:10px 12px;border:1px solid #5a3845;border-radius:4px!important;background:#100c14!important;color:#eddbd6!important;font:13px/1.8 \"Segoe UI\",\"Microsoft YaHei UI\",sans-serif;transition:border-color .18s,box-shadow .18s,background .18s;box-shadow:inset 0 1px 5px #0003}\n.mc-panel :is(.mc-field input:not([type=checkbox]),.mc-field textarea,.mc-field select):hover{border-color:#a36a4d}.mc-panel :is(.mc-field input:not([type=checkbox]),.mc-field textarea,.mc-field select):focus{outline:none;border-color:#f2b47a!important;box-shadow:0 0 0 2px #e8914820,0 0 20px #ed8d2f12}\n.mc-field textarea{min-height:64px!important;field-sizing:content;resize:vertical!important;max-width:100%;font-size:13px!important;line-height:1.85!important}.mc-field textarea[aria-label=\"步骤提示词\"]{min-height:148px!important}.mc-field textarea[aria-label=\"禁止事项\"]{min-height:62px!important;border-inline-start:2px solid #b07173;background:#1e1119!important}.mc-field textarea::placeholder{color:#96758a;opacity:1}.mc-field[data-ion-changed=true]{animation:ion-field-change 2.6s ease-out both}.mc-loopToggle{gap:7px;font-size:10px;color:#cca58c;cursor:pointer}.mc-loopToggle strong{font-size:11px;font-weight:500}.mc-loopToggle input{accent-color:#f2ab70}.mc-loopOptions,.mc-finalOutput{padding:12px;margin-top:9px;border:1px solid #77513b;border-left:2px solid #f0b676;background:#4c2d191f;border-radius:4px}.mc-finalOutput .mc-field+.mc-field{margin-top:12px!important}\n.mc-field[data-ion-field=skills]>.mc-fieldHeader{justify-content:flex-start;gap:10px}.mc-field[data-ion-field=skills]>.mc-fieldHeader .mm-button{min-height:26px;padding:3px 8px;font-size:10px}.mc-stepFieldset{animation:ion-drawer-in .18s ease-out both}.mc-aiChangeNotice{display:flex;gap:7px;align-items:center;color:#b6e0c0;border-left:2px solid #84d9aa;background:#63844914;padding:8px 11px;margin:0 auto 15px;max-width:1020px;font-size:11px;animation:ion-pop-in .18s ease-out}\n.mc-boundSkills{gap:7px!important;margin:0!important}.mc-boundSkill{display:inline-flex;align-items:center;gap:9px;padding:7px 10px;border:1px solid #96694b;background:linear-gradient(120deg,#53332390,#2a1a23);color:#f0d5bd;border-radius:4px;font-size:11px}.mc-boundSkill::before{content:'';width:4px;height:4px;background:#ffb87a;box-shadow:0 0 8px #fa9f4a60}.mc-boundSkill .mc-mini{border:0;background:transparent;color:#bf9a9d;font-size:10px;padding:1px 3px;min-height:20px}.mc-boundSkill:hover{border-color:#f4b473}.mc-stepSkillPicker{margin-top:12px;padding:15px;border:1px solid #9f6a4c;background:linear-gradient(140deg,#2b1721,#140f19);border-radius:5px;box-shadow:0 14px 35px #0005;animation:ion-drawer-in .2s ease-out both}.mc-skillCard{border:1px solid #603d48!important;border-radius:4px!important;background:#21141e!important;padding:10px!important}.mc-skillCard:hover{border-color:#cf9169!important;background:#3d241f!important}.mc-skillCard:has(input:checked){border-color:#f6b678!important;background:#4e2e23!important}.mc-skillCard input{accent-color:#f1ae73}\n.mc-modeDefaults{border:1px solid #50323e;border-radius:4px;padding:10px 12px;background:#1b111b;margin-top:14px}.mc-modeDefaults>summary{font-size:11px;color:#c49a91;cursor:pointer}.mc-modeDefaults[open]{border-color:#986342}.mc-readonlyText{background:#0d0a12!important;color:#d2b5bf!important;font:12px/1.85 ui-monospace,\"Microsoft YaHei UI\",monospace!important}\n.mc-managementNav{background:#110d16!important}.mc-managementItem,.mc-skillEntry{border:1px solid transparent;border-radius:4px;color:#d2b7c0;transition:background .15s,border-color .15s}.mc-managementItem:hover,.mc-skillEntry:hover{background:#3b2424;border-color:#936344}.mc-managementItem[aria-pressed=true],.mc-skillEntry[aria-pressed=true]{color:#ffd2a6;background:#5f382a66;border-color:#c78a5c}.mc-searchResults{margin-top:12px}.mc-skillSearch{padding:0 0 15px;border-bottom:1px solid #50333f}.mc-skillEntry{padding:13px!important;background:#21141e!important}.mc-skillEntry strong{color:#f2d7ca}.mc-skillEntry small{color:#c49aa9}.mc-libraryIntro{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:18px;border:1px solid #815340;background:linear-gradient(110deg,#47271f66,#21121e);border-radius:5px;margin-bottom:18px}.mc-libraryIntro strong{font:350 28px/1 \"Segoe UI\",sans-serif;color:#ffd5ac}.mc-libraryIntro p{margin:6px 0 0;color:#c19daa;font-size:11px}.mc-libraryIntro .mc-caption{font-size:10px;letter-spacing:.12em;color:#d4a281}.mc-skillResource{border:1px solid #6a424c;background:#140d17;border-radius:5px;padding:16px;margin-top:18px}\n.mc-libraryEntries{max-height:none!important;overflow:visible!important;display:grid!important;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:12px!important;margin-top:18px}.mc-libraryEntries .mc-libraryEntry{display:flex!important;flex-direction:column;align-items:stretch;justify-content:flex-start;text-align:left;min-width:0;min-height:155px;white-space:normal;padding:15px!important;position:relative;background:linear-gradient(140deg,#2c1823,#19101b)!important;border:1px solid #7f5147;gap:7px;border-radius:5px!important;transition:transform .18s,border-color .18s,box-shadow .18s}.mc-libraryEntry::before{content:'SKILL MODULE';font:8px/1.3 ui-monospace,monospace;letter-spacing:.13em;color:#c18b6d}.mc-libraryEntries .mc-libraryEntry:hover:enabled{transform:translateY(-2px);border-color:#eeb078;box-shadow:0 8px 25px #0005,0 0 18px #b96f2612}.mc-libraryEntry[aria-pressed=true]{border-color:#ffca8a!important;background:linear-gradient(140deg,#71452b77,#2b1822)!important;box-shadow:inset 2px 0 0 #ffc58a}.mc-libraryEntry strong{font-size:13px;color:#f2d4c5;font-weight:550;overflow-wrap:anywhere}.mc-libraryEntry small{font-size:9px;color:#b68e9f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-libraryEntry p{font-size:11px;line-height:1.75;color:#c9a9b5;margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.mc-libraryEntry small:last-child{color:#d3a681;margin-top:auto;padding-top:7px;border-top:1px solid #603b43}\n.mc-skillInspector{position:absolute;top:66px;bottom:48px;right:0;width:min(540px,94%);z-index:6;display:flex;flex-direction:column;background:linear-gradient(140deg,#291620,#130e18);border-left:1px solid #bd825b;box-shadow:-18px 0 55px #0008;animation:ion-inspector-in .22s ease-out both}.mc-skillInspector>.mc-columnHeader{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:67px;flex:none}.mc-skillInspector>.mc-columnHeader>div{min-width:0}.mc-skillInspector h2{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-skillInspectorBody{flex:1;min-height:0;overflow:auto;padding:18px}.mc-skillInspectorBody .mc-field{margin-bottom:16px!important}.mc-skillInspectorBody .mc-actions{gap:5px;margin-top:12px}.mc-skillInspectorBody .mm-button{font-size:10px;min-height:28px;padding:5px 8px;white-space:normal}.mc-skillInspectorBody .mc-resourceInfo{overflow-wrap:anywhere;white-space:pre-wrap;font-size:10px;line-height:1.75;color:#d0acbb}\n.mc-editorFooter{min-height:48px;padding:9px 18px;background:linear-gradient(100deg,#24151c,#161019);border-top:1px solid #53323a;gap:10px}.mc-editorFooter .mc-caption{color:#b48e9e;font-size:10px}.mc-editorFooter .mm-button{min-height:29px;padding:4px 12px;font-size:11px}\n.mc-assistantHeader{padding:12px 17px;min-height:66px}.mc-assistantTitle h2{color:#ffe0c6;font-size:13px;letter-spacing:.03em}.mc-assistantDot[data-state=ready]{background:#91d9b3;box-shadow:0 0 9px #83d5a34d}.mc-assistantDot[data-state=running]{background:#ffba73;box-shadow:0 0 12px #fba25266}.mc-assistantDot[data-state=error]{background:#f6a496}.mc-connectionLabel{color:#bba0a8;font-size:10px}.mc-assistantHeading .mc-caption{color:#bd8e89;font-size:10px}.mc-assistantNotice,.mc-assistantSync{border-radius:4px;margin:10px 12px;padding:10px 12px;border:1px solid #694137;background:#37211f70;color:#dfb39d;font-size:11px}.mc-assistantNotice.is-error{border-color:#a66563;background:#4e272a50;color:#ffbdb0}.mc-assistantSync{border-inline-start:2px solid #f6b16d}.mc-configWelcome{min-height:0;padding:40px 25px 20px;background:radial-gradient(ellipse at top,#a2642825,transparent 70%)}.mc-configWelcomeMark{width:52px;height:52px;border:1px solid #b77b54;background:#56321f44;box-shadow:0 0 42px #ed913c18;color:#ffd5a6}.mc-configWelcome h3{font-size:19px;font-weight:500;letter-spacing:.02em;color:#ffe0c7}.mc-configWelcome p{color:#b995a6;font-size:12px;line-height:1.8}.mc-quickPrompts{gap:6px;padding:14px 17px}.mc-quickPrompts button{background:#2b1822;border:1px solid #76503e;color:#e8c2ad;border-radius:4px;font-size:11px;padding:7px 10px}.mc-quickPrompts button:hover:enabled{background:#533122;border-color:#e7ac72;color:#ffe5cc}\n:is(.mc-assistant,.mr-chat){--dsw-alias-bg-base:#110d16;--dsw-alias-bg-layer-1:#19111c;--dsw-alias-bg-layer-2:#271925;--dsw-alias-bg-overlay:#0a0710b0;--dsw-alias-border-l1:#63414e;--dsw-alias-border-l2:#8c5a58;--dsw-alias-brand-primary:#efaa76;--dsw-alias-label-primary:#f0e0db;--dsw-alias-label-secondary:#c0a3b5;--dsw-alias-state-error-primary:#ffb0a2;--dsw-alias-state-success-primary:#90ddba;color:#edddd7;color-scheme:dark}\n:is(.mc-nativeConversation,.mr-chatBody){background:radial-gradient(ellipse at 65% 0,#74482a10,transparent 60%),#110d16}.mc-nativeConversation [data-conversation-content],.mr-chatBody [data-conversation-content]{--dsh-composer-text-max-height:30vh;color:#ecdad8}.mc-nativeConversation [data-composer-seat],.mr-chatBody [data-composer-seat]{background:#130e18!important;border-top:1px solid #4a2d3a;padding:12px 14px!important}.mc-nativeConversation [data-composer-seat] textarea,.mr-chatBody [data-composer-seat] textarea{color:#f5e4df!important}.mc-assistantPending{background:transparent;color:#c19eae;font-size:12px;min-height:180px}.mc-assistantPending .mm-button{margin-top:8px}\n.mc-toast{position:absolute;right:18px;top:72px;max-width:min(580px,70%);z-index:30;border:1px solid #bb8257;background:#302019eb;backdrop-filter:blur(12px);color:#f9d5b5;border-radius:5px;box-shadow:0 12px 45px #0007;animation:ion-pop-in .2s ease-out both}.mc-toast.is-error{border-color:#bc797c;background:#391d2aeb;color:#ffc9c0}.mc-saveState.is-justSaved{color:#a6e0bc;animation:ion-save-confirm 1.8s ease-out}\n.mr-consoleBar{gap:13px}.mr-consoleBar .mm-workspaceTabs{margin-right:4px}.mr-consolePicker{display:flex;align-items:center;gap:8px;min-width:100px;max-width:390px;flex:1}.mr-consolePicker select{width:100%;height:34px;border:1px solid #79513e;background:#22141d;border-radius:4px;padding:5px 30px 5px 11px;color:#f2d7c7;font:12px/1.5 inherit}.mr-consoleTools{display:flex;gap:7px;margin-left:auto;align-items:center}.mr-consoleIndicator{color:#bda0ad;font-size:10px;white-space:nowrap}.mr-consoleIndicator b{color:#ffd19f;font-size:12px;font-weight:500}\n.mr-layout{background:#100c14;gap:0}.mr-layout[data-rail-open=false]{--mr-rail-size:0px}.mr-layout[data-rail-open=false] .mr-projectNav{visibility:hidden;overflow:hidden;border:0;pointer-events:none}.mr-projectNav{background:linear-gradient(110deg,#191019,#100c15);border-inline-end:1px solid #63402e}.mr-navHead{border-bottom:1px solid #54313c;background:#24141e99}.mr-brand h1{font-size:12px;letter-spacing:.03em;color:#dab6a4}.mr-projectList{padding:12px 9px;gap:7px}.mr-projectList>button{border:1px solid #4b2d3c;background:#1b111c;border-radius:4px;padding:12px 10px}.mr-projectList>button:hover{border-color:#b07951;background:#35201f}.mr-projectList>button[aria-pressed=true]{border-color:#cb9265;background:linear-gradient(120deg,#59332177,#25151f);box-shadow:inset 2px 0 0 #ffc58e}.mr-projectList>button[aria-pressed=true]::before{display:none}.mr-projectList strong{font-size:12px;color:#f1d7ce}.mr-projectList small{font-size:10px;color:#c29aa8}.mr-projectList>button>svg{color:#d6a172}\n.mr-projectInner{max-width:none;padding:20px 22px 26px;background:radial-gradient(ellipse at 15% -15%,#ba62201a,transparent 55%)}.mr-projectHeader{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:17px}.mr-projectHeader h2{font-size:20px;font-weight:550;color:#f5dcca;letter-spacing:.015em;margin:0 0 7px}.mr-meta{gap:12px;font-size:10px;color:#b28e9e}.mr-projectHeader .mr-meta{justify-content:flex-end;max-width:52%;flex-wrap:wrap}.mr-meta svg{color:#c98761}.mr-split{background:#50313b}.mr-split:hover,.mr-split:focus-visible{background:#c48252;box-shadow:0 0 12px #cf915d4d}\n.mr-chat{border-left:1px solid #6b4338;background:#110c16}.mr-chatHeader{min-height:58px;padding:12px 17px;background:linear-gradient(110deg,#2e1920,#1b111c);border-bottom:1px solid #56303e}.mr-chatHeader h2{font-size:13px;color:#ffddc5}.mr-chatIdentity>svg{color:#efad79}.mr-chatStatus{font-size:10px;color:#c19fa9}.mr-chatStatus[data-state=ready]{color:#a7ddbc}.mr-chatStatus[data-state=running]{color:#ffd08b}.mr-chatContext{background:#24141d;color:#d9aa91;border-bottom:1px solid #634033;padding:9px 16px;font-size:11px}.mr-chatWelcome{padding:35px 20px 18px;background:radial-gradient(ellipse at top,#87451c20,transparent 75%)}.mr-chatWelcome h3{color:#f2d5c2;font-size:19px;font-weight:450}.mr-welcomeMark{background:#38201d;border:1px solid #956546;color:#fbc58d;box-shadow:0 0 35px #d17b2520}.mr-panel .mr-start{background:#3b231f;color:#ffd4ac;border-color:#9e6e4b}.mr-panel .mr-start:hover:enabled{background:#5a3421;border-color:#e7ae73}\n.mr-projectViews{display:flex;align-items:center;gap:4px;padding:4px;background:#110b15;border:1px solid #624034;border-radius:5px;margin-bottom:16px;width:fit-content}.mr-projectViews button{border:0;padding:7px 16px;border-radius:3px;background:transparent;color:#b996a5;font-size:11px;display:flex;align-items:center;gap:7px}.mr-projectViews button[aria-pressed=true]{background:linear-gradient(120deg,#673c27,#3d231f);color:#ffd4a5;box-shadow:inset 0 0 0 1px #b27c4c70}.mr-projectViews button:hover{color:#ffe6d0}\n.mr-stepInspector{margin-top:20px;padding:16px 18px 4px;border:1px solid #79513c;background:linear-gradient(145deg,#21121d,#140d17);border-radius:5px;position:relative}.mr-stepInspector::before{content:'';position:absolute;top:-1px;left:-1px;width:17px;height:17px;border-top:2px solid #d99b64;border-left:2px solid #d99b64;pointer-events:none}.mr-workflowHead{gap:12px;margin-bottom:12px}.mr-workflowHead h3{font:500 12px/1.5 \"Segoe UI\",\"Microsoft YaHei UI\",sans-serif;letter-spacing:.06em;color:#d8ac91}.mr-progress{font-size:10px;color:#c198a3}.mr-progressTrack{background:#3c2634}.mr-progressTrack i[data-done=true]{background:#e9ad72;box-shadow:0 0 8px #d98d4330}\n.mr-stepRail{display:flex;gap:6px;overflow:auto;padding:0 0 12px;scrollbar-width:thin}.mr-stepRail button{flex:0 0 auto;max-width:250px;display:flex;align-items:center;gap:7px;min-height:32px;padding:6px 10px;border:1px solid #634149;border-radius:4px;background:#1c111c;color:#b99aa8;font-size:11px;white-space:nowrap}.mr-stepRail button span{color:#d49a74;font:10px ui-monospace,monospace}.mr-stepRail button strong{overflow:hidden;text-overflow:ellipsis;font-weight:500}.mr-stepRail button[aria-pressed=true]{background:#643b294d;border-color:#ce9564;color:#ffddba}.mr-stepRail button[data-executing=true] span{color:#ffe1a5;text-shadow:0 0 9px #ffc66f}\n.mr-steps{margin:0;padding:0;list-style:none}.mr-steps li{border:0!important;border-top:1px solid #5c3540!important;border-radius:0!important;background:transparent!important}.mr-steps details[open]{border-radius:0!important;background:transparent!important}.mr-steps summary{padding:13px 2px;min-height:46px}.mr-steps summary>strong{font-size:13px;color:#edd0bf}.mr-stepNumber{border-radius:4px;border-color:#9c6a43;color:#edbd8a;background:#37201d}.mr-stepBody{padding:0 0 14px 0;font-size:12px;line-height:1.85;color:#d2b3bc;animation:ion-drawer-in .2s ease-out both}.mr-purpose{padding:10px 13px;border-left:2px solid #ba8053;background:#3e251e33;margin-bottom:14px}.mr-stepBody h4{color:#c58c74;font-size:10px;font-weight:550;letter-spacing:.04em}.mr-stepActions{margin-top:10px;gap:7px}.mr-panel .mr-action{background:#2b1921;border-color:#77503b;color:#edc5a6;font-size:11px}.mr-panel .mr-action:hover:enabled{background:#4d2d20;border-color:#d99e68}.mr-stepStatus{font-size:10px;color:#c29aa8}.mr-stepStatus[data-status=submitted]{color:#9dddba}.mr-output{border-top:1px solid #50303b;padding-top:12px}.mr-outputText{background:#100b14;border:1px solid #4e2f3e;padding:12px;border-radius:4px;color:#e1c7c7}.mr-artifacts{gap:6px}.mr-artifact{border:1px solid #6d483d;border-radius:4px;background:#28171f;padding:9px 11px}.mr-artifact button{color:#f4cda9}.mr-artifact small,.mr-time{color:#ab8799;font-size:10px}.mr-history{background:#140d17;border:1px solid #76503b;border-radius:5px;padding:13px;margin-top:12px}.mr-decision{background:linear-gradient(125deg,#54301f66,#24141e);border:1px solid #ba8753;border-radius:4px;margin:10px;padding:12px;color:#ebc29f;font-size:12px}.mr-decision button{border-radius:4px}\n.mr-deliverableShelf{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));gap:13px;animation:ion-drawer-in .22s ease-out both}.mr-deliveryCard{padding:17px;border:1px solid #82573e;background:linear-gradient(130deg,#39201880,#18101b);border-radius:5px;min-width:0}.mr-deliveryCard header{display:flex;align-items:center;gap:8px;margin-bottom:10px;color:#f3cfaf;font-size:12px}.mr-deliveryCard header>span{font:11px ui-monospace,monospace;color:#cf9670}.mr-deliveryCard p{font-size:11px;line-height:1.8;color:#c0a1ae;white-space:pre-wrap;max-height:180px;overflow:auto}.mr-deliveryCard .mr-emptyReceipt{font-size:11px;color:#b28c9f}.mr-deliveryCard .mr-action{max-width:100%;overflow:hidden;text-overflow:ellipsis;justify-content:flex-start}.mr-deliveryCard footer{display:flex;gap:7px;flex-wrap:wrap;padding-top:10px;margin-top:10px;border-top:1px solid #5f3b3c}\n.mr-live,.mr-stepActivity{background:#17101a;border-color:#63413c;border-radius:4px;color:#d6b3bc}.mr-liveHeadline{color:#f3c69f}.mr-callDetail{background:#100b14;border:1px solid #80513f;border-radius:4px}.mr-activityItem{border-color:#53303e}.mr-activityItem[data-status=failed],.mr-activityItem[data-status=cancelled]{border-color:#a76d63}.mr-activityItem time{font-size:10px;color:#b48a9e}\n.mdoc{background:var(--ion-void)!important;color:var(--ion-text)}.mdoc>header{min-height:60px;background:linear-gradient(100deg,#301b21,#1a111d);border-bottom:1px solid #815239;padding:12px 18px}.mdoc>header strong{font-size:14px;font-weight:550;color:#f7d9bf}.mdoc .mdoc-icon{border:1px solid transparent;color:#d8af9c;border-radius:4px;font-size:11px;padding:6px 9px;transition:background .15s,border-color .15s,color .15s}.mdoc .mdoc-icon:hover:enabled{border-color:#a9774c;background:#4a2b20;color:#ffdfb9}.mdoc-toolbar{background:#21131e;border-color:#65403c;padding:10px 18px}.mdoc-tabs{border-color:#8b5d42;background:#120c16;border-radius:4px;padding:3px}.mdoc-tabs button{border-radius:2px;font-size:11px;padding:6px 14px;color:#c29ba9}.mdoc-tabs button[aria-pressed=true]{background:#71432966;color:#ffd6a7}.mdoc .mdoc-save{font-size:11px;border-radius:4px;padding:6px 14px}.mdoc-body{padding:26px;background:radial-gradient(ellipse at 50% 0,#8850261f,transparent 75%),repeating-linear-gradient(0deg,#321b2a18 0,#321b2a18 1px,transparent 1px,transparent 32px),#100b14}.mdoc-page{box-shadow:0 16px 70px #0009,0 0 0 1px #c4967945;max-width:100%;border-radius:1px}.mdoc-blocks{gap:16px;max-width:930px}.mdoc-block>span{color:#c58d7a;font:10px/1.7 ui-monospace,\"Microsoft YaHei UI\",monospace;letter-spacing:.04em}.mdoc-block textarea{border:1px solid #76503e;background:#1e121c;color:#e9d0d2;border-radius:4px;padding:13px;font:13px/1.9 \"Segoe UI\",\"Microsoft YaHei UI\",sans-serif;transition:border-color .16s,box-shadow .16s}.mdoc-block[data-changed=true] textarea{border-color:#f5b174;box-shadow:inset 2px 0 0 #f5b174,0 0 18px #d78c3718}.mdoc-block textarea:focus{outline:none;border-color:#ffd097;box-shadow:0 0 0 2px #eaa76222}.mdoc-text{color:#e9d5d7;background:#160e18;font-size:14px;line-height:1.9;padding:20px;border:1px solid #72483f;border-radius:4px;max-width:1100px;margin:auto;display:block}\n.mdoc-grid{background:#150d18;border:1px solid #93613e}.mdoc-grid th{background:#39211f;color:#eac2a0;font:10px ui-monospace,monospace}.mdoc-grid td,.mdoc-grid th{border-color:#593541}.mdoc-grid input{color:#e5cbd1;font-size:12px}.mdoc-grid td[data-changed=true]{background:#a1642b26;box-shadow:inset 0 -1px 0 #df9f63}.mdoc-grid input:focus{outline:1px solid #f3bf87;background:#4b291f;outline-offset:-1px}.mdoc-sheets button{background:#271620;border:1px solid #83573d;color:#c7a0ab;border-radius:3px}.mdoc-sheets button[aria-pressed=true]{background:#72452c66;color:#ffdfb6;border-color:#d59b65}.mdoc-pages{padding:8px;font:11px/1.7 ui-monospace,\"Microsoft YaHei UI\",monospace;color:#d3ab9a}.mdoc-footer{padding:10px 17px;border-top:1px solid #76503d;background:#23131e;color:#b892a5;font-size:10px}.mdoc-message{background:#28181d;border-color:#76503b;color:#edbf9a}.mdoc-message.is-error{background:#381d29;color:#ffc0b4;border-color:#ab6a66}.mdoc-closeCheck{border-block:1px solid #b98150;background:#462a1f;color:#ffdbb6}.mdoc-notice{background:#22141d;border-color:#583442;color:#be97a9}\n.mc-modeDialogBackdrop,.mr-dialogBackdrop{background:#08050dbb;backdrop-filter:blur(9px);animation:ion-backdrop-in .14s ease-out}.mc-modeDialog,.mr-dialog{animation:ion-dialog-in .2s ease-out both}.mc-modeDialog input,.mc-modeDialog textarea,.mr-dialog input,.mr-dialog select,.mr-dialog textarea{border:1px solid #885c40;background:#150e18;color:#eddbd4;border-radius:4px;padding:10px 12px;font:13px/1.8 inherit}.mr-dialog h2{color:#f4d2b8;font-size:19px;font-weight:500}.mr-revisionScope label{background:#25141f;border-color:#714939}.mr-revisionScope label:has(:checked){background:#6b3c233b;border-color:#f2b378}.mr-revisionScope input{accent-color:#e9a368}\n.mm-hud{--mm-accent:#edac70;--mm-line:#654040;--mm-ink:#f6d6bd;--mm-bg:#1b1018}.mm-hudTrack{background:#3b2630}.mm-hudFill{background:linear-gradient(90deg,#b57143,#ffcd8b);box-shadow:0 0 10px #f3ae5640}\n.mm-workbench [data-ion-static=true]{position:relative}.mm-workbench [data-ion-pressed=true]::after{content:'';position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:radial-gradient(circle 80px at var(--ion-press-x,50%) var(--ion-press-y,50%),#ffc47b50,transparent 75%);animation:ion-press .35s ease-out both}\n@keyframes ion-pop-in{from{opacity:0;transform:translateY(-5px) scale(.985)}to{opacity:1;transform:none}}\n@keyframes ion-drawer-in{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}\n@keyframes ion-dialog-in{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}\n@keyframes ion-backdrop-in{from{opacity:0}to{opacity:1}}\n@keyframes ion-field-change{0%,20%{background:#ffb56612;box-shadow:0 0 0 5px #ffb56612}100%{background:transparent;box-shadow:none}}\n@keyframes ion-save-confirm{0%{text-shadow:0 0 15px #9de9b5}100%{text-shadow:none}}\n@keyframes ion-press{from{opacity:.85}to{opacity:0}}\n@keyframes ion-inspector-in{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}\n@media(min-width:1500px){.mc-simpleStep{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px 20px!important}.mc-simpleStep>.mc-field{grid-column:1/-1}.mc-simpleStep>.mc-field[data-ion-field=purpose],.mc-simpleStep>.mc-field[data-ion-field=deliverables]{grid-column:auto}}\n@media(max-width:1300px){.mc-top,.mr-consoleBar{gap:8px;padding-inline:12px}.mc-brand h1,.mr-consoleBrand strong{font-size:15px}.mc-modeField{min-width:120px;gap:6px}.mc-modePicker{min-width:120px;max-width:250px}.mm-workspaceTabs [role=tab]{padding-inline:10px}.mc-saveState{display:none}.mc-topTools{gap:5px}.mc-content{padding:20px 22px!important}.mr-consoleIndicator{display:none}}\n@media(max-width:1000px){.mc-top,.mr-consoleBar{height:auto;min-height:58px;flex-wrap:wrap;padding-block:10px;gap:8px}.mc-topTools{margin-left:auto}.mc-modeField{order:4;flex:1 0 100%}.mc-modePicker{max-width:none}.mc-modeField>.mm-button{flex:none}.mc-topTools .mc-libraryButton{padding-inline:8px}.mr-consolePicker{max-width:none;min-width:180px}.mr-projectHeader{display:block}.mr-projectHeader .mr-meta{justify-content:flex-start;max-width:100%;margin-top:7px}.mr-projectInner{padding:17px 14px 22px}.mc-columnHeader{padding-inline:13px}.mc-content{padding:18px 16px!important}}\n@media(max-width:680px){.mm-workspaceTabs{gap:0}.mm-workspaceTabs [role=tab]{font-size:11px;padding-inline:10px}.mc-brand h1,.mr-consoleBrand strong{font-size:14px}.mc-logo,.mr-consoleMark{height:28px;width:28px}.mc-topTools .mm-button{font-size:11px;padding-inline:9px}.mc-top .mc-modeToggle{display:none}.mc-content{padding:15px 12px!important}.mc-simpleStep{gap:17px!important}.mc-fieldHeader{align-items:flex-start;flex-wrap:wrap;gap:6px}.mr-consoleTools{gap:5px}.mr-consoleTools .mr-consoleIndicator{display:none}.mr-consoleBar>.mr-consolePicker{order:4;flex:1 0 100%;max-width:none}.mr-stepInspector{padding:13px 12px 2px}.mr-deliverableShelf{grid-template-columns:1fr}.mc-toast{right:10px;max-width:calc(100% - 20px);top:70px}.mdoc-body{padding:12px}.mdoc-toolbar{padding:9px 10px;gap:5px}.mdoc-toolbar .mdoc-spacer{display:none}.mdoc>header{padding:10px}.mdoc .mdoc-icon{font-size:10px;padding-inline:6px}.mdoc-text{padding:12px}}\n@media(prefers-reduced-motion:reduce){.mm-workbench *,.mm-panel.mc-panel *,.mm-panel.mr-panel *,.mdoc *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}\n\n/* Precision editing surfaces and native Conversation card styling. */\n.mc-stepIdentity{display:flex;align-items:center;gap:13px;min-width:0;flex:1}.mc-editorNode{display:grid;place-items:center;flex:none;width:42px;height:42px;background:linear-gradient(140deg,#6c402955,#21131c);border:1px solid #b67b50;color:#ffd1a1;font:24px/1 ui-monospace,monospace;border-radius:4px;box-shadow:inset 0 1px 0 #ffe2bb17,0 0 23px #bc762a15}.mc-stepIdentityText{min-width:0;flex:1}.mc-stepNameWrap{display:flex;align-items:center;gap:8px;min-width:0;max-width:680px}.mc-stepNameWrap input{height:27px;min-width:0;width:100%;border:1px solid transparent;border-radius:3px;background:transparent;color:#f8ddca;font:550 15px/1.5 \"Segoe UI\",\"Microsoft YaHei UI\",sans-serif;padding:0 4px;margin-left:-4px;text-overflow:ellipsis;transition:border-color .15s,background .15s}.mc-stepNameWrap input:hover{border-color:#80503d;background:#34201e55}.mc-stepNameWrap input:focus{outline:none;border-color:#f0b57a;background:#21131b;box-shadow:0 0 0 2px #eea65a18}.mc-stepNameWrap>svg{color:#bc8c71;opacity:.8;flex:none}.mc-simpleStep>.mc-field{border:1px solid #644039;padding:14px;background:linear-gradient(130deg,#37201835,#180f193b);border-radius:4px;position:relative}.mc-simpleStep>.mc-field::after{content:'';position:absolute;right:-1px;bottom:-1px;width:10px;height:10px;border-right:1px solid #d59a66;border-bottom:1px solid #d59a66;opacity:.55;pointer-events:none}.mc-simpleStep>.mc-field>.mc-label::before,.mc-simpleStep>.mc-field>.mc-fieldHeader>.mc-label::before{content:'';display:inline-block;width:3px;height:3px;background:#d99562;margin-right:7px;vertical-align:middle;box-shadow:0 0 7px #eeaa5530}.mc-stepRow.is-current::after{content:'';position:absolute;left:-9px;top:35px;width:8px;height:1px;background:#ffc17e;box-shadow:0 0 9px #f1ad5d55;pointer-events:none}.mc-configWelcome{position:relative;isolation:isolate}.mc-configWelcome::before{content:'';position:absolute;inset:-70px -20px;z-index:-1;pointer-events:none;background:linear-gradient(135deg,transparent 47%,#ad75401b 47%,#ad75401b 47.2%,transparent 47.2%),linear-gradient(90deg,transparent 49.8%,#ad754014 49.8%,#ad754014 50.2%,transparent 50.2%),linear-gradient(0deg,transparent 49.8%,#ad754014 49.8%,#ad754014 50.2%,transparent 50.2%);background-size:170px 130px,72px 72px,72px 72px;mask-image:radial-gradient(ellipse,#000,transparent 72%)}.mc-configWelcomeMark{position:relative;border-radius:5px!important}.mc-configWelcomeMark::before,.mc-configWelcomeMark::after{content:'';position:absolute;top:6px;bottom:6px;width:7px;background:repeating-linear-gradient(180deg,#bf895c 0,#bf895c 1px,transparent 1px,transparent 7px);pointer-events:none}.mc-configWelcomeMark::before{left:-8px}.mc-configWelcomeMark::after{right:-8px}\n:is(.mc-assistant,.mr-chat){--dsw-specific-menu:#23151e;--dsw-alias-bg-layer-3:#302030;--dsw-alias-label-primary-dimmed:#dfc5ce;--dsw-alias-label-tertiary:#b498ac;--dsw-alias-interactive-bg-hover:#67412e44;--dsw-alias-button-info-fill:#b66b3e;--dsw-alias-button-info-hover:#bb774c;--dsw-radius-lg:7px}\n:is(.mc-nativeConversation,.mr-chatBody) [data-composer-card]{background:linear-gradient(135deg,#342029,#1c121f)!important;border:1px solid #916347!important;border-radius:7px!important;box-shadow:inset 0 1px 0 #f1c79a12,0 0 32px #c1812810!important;transition:border-color .16s,box-shadow .16s}:is(.mc-nativeConversation,.mr-chatBody) [data-composer-card]:focus-within{border-color:#eab079!important;box-shadow:0 0 0 2px #c98b4b18,0 0 30px #d5902820!important}\n@media(max-width:1000px){.mc-stepIdentity{gap:9px}.mc-editorNode{width:35px;height:35px;font-size:20px}.mc-stepNameWrap input{font-size:13px}.mc-simpleStep>.mc-field{padding:12px}.mc-stepIdentityText{max-width:calc(100% - 42px)}}\n\n.mr-brand h2{margin:0;font-size:12px;font-weight:550;color:#d8ad94}.mr-deliveryCard .mr-output{margin-top:0;border-top:0;padding-top:0}.mr-deliveryCard .mr-output>h4{display:none}.mr-deliveryText{white-space:pre-wrap;font:12px/1.85 inherit;max-height:280px;overflow:auto;background:#100b15;padding:12px;border:1px solid #4f303e;border-radius:3px}.mr-fileLink{border:1px solid #8d5f40;border-radius:3px;background:#38201c;color:#f5cb9f;padding:7px 10px;display:inline-flex;align-items:center;gap:7px;font-size:11px}.mr-fileLink:hover{border-color:#e5ac71;background:#5c3321}.mr-artifacts code{font-size:9px;color:#ac8498;overflow-wrap:anywhere}.mr-projectInner>.mrv{margin-bottom:16px}.mr-stepInspector .mr-historyToggle{font-size:10px;color:#cca085}\n\n.mr-layout{transition:grid-template-columns .22s ease-out}.mr-layout[data-dragging=true]{transition:none}.mr-projectNav{overflow:hidden;transition:opacity .18s}.mr-layout[data-rail-open=false] .mr-projectNav{opacity:0}.mr-stepNameHeading{margin:0}.mc-stepNameWrap[data-ion-changed=true]{animation:ion-field-change 2.6s ease-out both}\n.mdoc-format{font:9px/1 ui-monospace,monospace;color:#ffd3a2;border:1px solid #bc8555;background:linear-gradient(140deg,#633c2355,#2b1720);padding:6px 7px;border-radius:3px;letter-spacing:.08em;flex:none}.mdoc-focus{display:flex;align-items:center;gap:8px;min-height:36px;padding:6px 16px;border-bottom:1px solid #8c603f;background:linear-gradient(110deg,#5f3b2144,#25151f);color:#e4bd9c;font-size:11px;flex:none}.mdoc-focus>span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mdoc-focus .mdoc-icon{font-size:10px;white-space:nowrap}.mdoc[data-changed=true] .mdoc-format{box-shadow:0 0 12px #ecaa5530;border-color:#ffca87}.mdoc-notice{font-size:10px;line-height:1.8}.mdoc-footer>span{display:inline-flex;align-items:center;gap:6px}.mdoc[data-changed=true] .mdoc-footer>span::before{content:'';height:4px;width:4px;background:#ffc178;box-shadow:0 0 9px #f5bd6570;border-radius:50%}\n\n:is(.mc-nativeConversation,.mr-chatBody) [data-message-bubble]{background:linear-gradient(135deg,#56332670,#2a1926)!important;border:1px solid #835344;border-radius:7px!important;box-shadow:inset 0 1px 0 #ecc89a08;color:#ebd8d5}:is(.mc-nativeConversation,.mr-chatBody) a{color:#eeb783}.mm-panel.mr-panel{--dsw-alias-state-error-primary:#ffb6a9}.mr-shell>.mr-error{background:#391d2a;color:#ffc0b0;border-color:#bd7974;font-size:12px}\n\n/* Fit the actual embedded workbench width, rather than the whole DSH window. */\n.mc-grid.has-assistant>:is(.mc-flow,.mc-editor,.mc-assistant){min-width:0!important;width:100%}.mc-assistant :is(.mc-nativeConversation,[data-conversation-content]){min-width:0;max-width:100%}\n@container metis-workbench (max-width:1000px){.mc-top{height:auto;min-height:58px;flex-wrap:wrap;padding:10px 12px;gap:8px}.mc-modeField{order:4;flex:1 0 100%;min-width:0}.mc-modePicker{max-width:none;min-width:120px}.mc-topTools{margin-left:auto}.mc-saveState{display:none}.mc-stepManage>.mc-iconButton:nth-child(-n+2){display:none}.mc-stepNameWrap input{font-size:13px}.mc-columnHeader{gap:8px}}\n@container metis-project (max-width:1000px){.mr-consoleBar{height:auto;min-height:58px;flex-wrap:wrap;padding:10px 12px;gap:8px}.mr-consolePicker{order:4;flex:1 0 100%;max-width:none;min-width:0}.mr-consoleIndicator{display:none}.mr-consoleTools{margin-left:auto;gap:5px}}\n\n@media(min-width:1500px){.mc-simpleStep:has(.mc-finalOutput)>.mc-field[data-ion-field=purpose],.mc-simpleStep:has(.mc-finalOutput)>.mc-field[data-ion-field=deliverables]{grid-column:1/-1}}\n\n/* Circuit core: full-height scene, object inspectors, native conversation. */\n.ic-workspace{height:100%;min-height:0;display:flex;flex-direction:column;overflow:hidden;background:#08070d;color:var(--ion-text);container:metis-circuit / inline-size}\n.ic-workspace>.mc-top,.ic-workspace>.mr-consoleBar{z-index:12;min-height:58px;height:58px;padding:0 16px;gap:12px}.ic-workspace .mc-modeField{min-width:100px}.ic-workspace .mc-modePicker{max-width:280px}.ic-workspace .mc-modeField .mc-modePicker{flex:1}.ic-workspace .mc-brand h1{font-size:15px}.ic-workspace .mm-workspaceTabs [role=tab]{padding:5px 10px}\n.ic-body{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) 6px minmax(300px,var(--ic-chat-width));overflow:hidden}.ic-stage{position:relative;min-width:0;min-height:0;isolation:isolate;overflow:hidden;background:#08070d}.ic-stage::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,#08070d55,transparent 28%,transparent 75%,#08070d99);z-index:1}\n.ic-world{inset:0}.ic-stage[data-inspector=true] .ic-world{left:min(390px,43%)}.ic-context{position:absolute;top:22px;left:24px;z-index:2;pointer-events:none;text-shadow:0 2px 18px #000}.ic-eyebrow{font:9px/1.5 Consolas,monospace;letter-spacing:.18em;color:#c58b76}.ic-context h1{margin:5px 0 10px;font:550 clamp(18px,1.6vw,25px)/1.3 'Segoe UI','Microsoft YaHei UI',sans-serif;max-width:460px;color:#f5e1d8;letter-spacing:.015em}.ic-metrics{display:flex;gap:14px;align-items:center;font-size:10px;color:#c4a2a1}.ic-metrics b{font:400 17px/1 Consolas,monospace;color:#ffcc97}.ic-metrics i{height:10px;width:1px;background:#734737}.ic-cameraTools{position:absolute;right:20px;top:22px;z-index:3;display:flex;gap:6px}\n.ic-action{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:30px;padding:6px 9px;font:11px/1.3 'Segoe UI','Microsoft YaHei UI',sans-serif;color:#ddbbad;border:1px solid #704935;background:#20131bd9;border-radius:4px;cursor:pointer;backdrop-filter:blur(12px);transition:background .16s,border-color .16s}.ic-action:hover,.ic-action[aria-pressed=true]{color:#ffe2c5;border-color:#df9d68;background:#4c291edb}.ic-action:disabled{opacity:.4;cursor:default}.ic-action.mm-primary{background:linear-gradient(140deg,#ffd09b,#e89963);border-color:#ffc591;color:#25120b;font-weight:650}\n.ic-assistant{min-width:0;min-height:0;overflow:hidden;background:linear-gradient(160deg,#1b111b,#100c15 70%);position:relative;z-index:5}.ic-assistant>:is(.mc-assistant,.mr-chat){height:100%;width:100%;min-width:0;border:0!important;border-radius:0!important}.ic-chatGrip{position:relative;cursor:col-resize;background:#181019;z-index:6;border-left:1px solid #674334}.ic-chatGrip::after{content:'';position:absolute;left:2px;top:45%;height:34px;width:2px;border-radius:3px;background:#875641}.ic-chatGrip:hover,.ic-chatGrip:focus-visible{background:#6a3a27}.ic-assistant .mr-chatWelcome{padding:30px 18px}.ic-assistant .mr-chatWelcome h3{font-size:20px}.ic-assistant .mr-chatContext{border-bottom:1px solid #4e2f3c}.ic-assistant .mc-configWelcome{padding-top:28px}\n.ic-inspector,.ic-palette{position:absolute;left:16px;top:112px;bottom:84px;width:min(365px,calc(100% - 32px));z-index:4;display:flex;flex-direction:column;min-height:0;background:linear-gradient(155deg,#281a24f7,#100c16f5);border:1px solid #8b5940;border-top-color:#e5ad79;box-shadow:0 18px 80px #0009,inset 0 1px 0 #ffcb9a1c;border-radius:7px;backdrop-filter:blur(20px);animation:ic-reveal .2s ease-out}.ic-drawerHead{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-bottom:1px solid #674438;flex:none;font-size:10px;letter-spacing:.08em;color:#dba580}.ic-drawerHead .ic-action{border:0;background:transparent;min-height:26px;padding:4px}.ic-inspector>.mc-editor{min-height:0;flex:1;width:100%;border:0;background:transparent;display:flex;flex-direction:column}.ic-inspector .mc-columnHeader{padding:12px 14px;min-height:62px}.ic-inspector .mc-stepIdentity{gap:8px}.ic-inspector .mc-stepManage{gap:2px}.ic-inspector .mc-stepManage .mc-iconButton{width:25px;min-width:25px;height:27px}.ic-inspector .mc-stepIdentityText{min-width:0}.ic-inspector .mc-stepNameWrap input{font-size:13px!important}.ic-inspector .mc-editorNode{display:none}.ic-inspector .mc-content{padding:14px;overflow:auto}.ic-inspector .mc-simpleStep{display:flex;flex-direction:column;gap:18px;max-width:none;margin:0}.ic-inspector .mc-field{margin:0;gap:7px}.ic-inspector .mc-simpleStep textarea{min-height:58px;padding:9px;font-size:12px;line-height:1.65}.ic-inspector .mc-simpleStep textarea[aria-label='步骤提示词']{min-height:145px}.ic-inspector .mc-editorFooter{padding:9px 12px}.ic-inspector .mc-editorFooter>.mc-caption{display:none}.ic-inspector .mc-editorFooter>div{width:100%;justify-content:space-between}.ic-inspector .mc-loopToggle{margin-left:auto}.ic-inspector .mc-loopToggle strong{font-size:10px}.ic-inspector .mc-finalOutput{display:flex;flex-direction:column}\n.ic-inspector .mr-steps{padding:12px;margin:0;overflow:auto;min-height:0}.ic-inspector .mr-steps>li{border:0;background:transparent;margin:0}.ic-inspector .mr-steps summary{display:none}.ic-inspector .mr-stepBody{padding:0;max-width:none}.ic-inspector .mr-purpose{font-size:12px;line-height:1.8}.ic-inspector .mr-steps h4{font-size:10px;color:#d7a47d;text-transform:uppercase;letter-spacing:.08em;margin:18px 0 8px}.ic-inspector .mr-stepActions{position:sticky;bottom:-12px;background:#1b121ceF;backdrop-filter:blur(12px);padding:12px 0;margin-top:18px}.ic-inspector .mr-artifacts code{font-size:9px;word-break:break-all}\n.ic-palette{width:min(430px,calc(100% - 32px));z-index:7;top:88px}.ic-paletteBody{padding:14px;overflow:auto;min-height:0}.ic-palette .mc-skillSearch .mc-parameters{grid-template-columns:1fr}.ic-palette .mc-libraryEntries{display:flex;flex-direction:column;gap:8px}.ic-palette .mc-libraryEntry{width:100%;min-height:90px;cursor:grab;padding:12px;text-align:left}.ic-palette .mc-libraryEntry:active{cursor:grabbing}.ic-palette .mc-libraryEntry p{margin:4px 0;max-height:38px;overflow:hidden}.ic-palette .mc-libraryEntry small{font-size:9px;overflow-wrap:anywhere}.ic-palette .mc-skillManagement{padding:0}.ic-palette .mc-skillMeta{font-size:10px}.ic-palette pre{white-space:pre-wrap;max-height:300px;overflow:auto;font-size:11px}.ic-skillBind{display:flex;gap:8px;align-items:center;margin:12px 0;padding:12px;border:1px solid #825236;background:#281b22;font-size:11px}.ic-skillBind span{flex:1}.ic-palette .mc-actions{flex-wrap:wrap}.ic-palette .mc-libraryEntry[draggable=false]{cursor:pointer}\n.ic-statusRail{position:absolute;z-index:3;left:18px;right:18px;bottom:15px;display:flex;align-items:center;gap:20px;padding:11px 14px;min-height:54px;border:1px solid #6e4536;border-left:2px solid #e9a263;background:linear-gradient(110deg,#26151fe8,#130e19e3);backdrop-filter:blur(14px);border-radius:5px;box-shadow:0 8px 24px #0005}.ic-statusText{min-width:0;display:grid;grid-template-columns:6px minmax(0,1fr);gap:4px 9px;flex:1}.ic-statusText>i{background:#e8b07a;box-shadow:0 0 13px #f7a158;width:4px;height:4px;border-radius:50%;align-self:center}.ic-statusText>strong{font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500}.ic-statusText>small{grid-column:2;font-size:10px;color:#bd999e;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ic-statusText[data-phase=running]>i,.ic-statusText[data-phase=processing]>i{animation:ion-live-pulse 1.8s infinite}.ic-selection{max-width:45%;display:flex;flex-direction:column;align-items:flex-end;gap:4px;min-width:0}.ic-selection>.ic-action{max-width:100%;border-color:#694432;background:#301c21;padding:5px 8px;min-height:26px}.ic-selection span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ic-selection small{font-size:9px;color:#ad858c;white-space:nowrap}\n.ic-notice{position:absolute;top:87px;left:50%;transform:translateX(-50%);z-index:8;max-width:90%;pointer-events:auto}.ic-notice .mc-toast{position:static;transform:none;width:auto;max-width:100%}.ic-notice .mr-error{background:#2b151d;border:1px solid #8d4a40;padding:10px 14px;border-radius:6px}.ic-documentLayer{position:absolute;inset:8px;z-index:10;border:1px solid #a47550;border-radius:6px;overflow:hidden;background:#110d16;box-shadow:0 20px 90px #000b}.ic-documentLayer>.mdoc{height:100%}.ic-empty,.ic-fallback{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);z-index:3;text-align:center;padding:28px;max-width:85%;background:#1e111beF;border:1px solid #704536;border-radius:8px}.ic-empty h2{font-size:23px;margin:0 0 12px;color:#f3cfaf}.ic-empty p{font-size:12px;color:#bd9ba3}.ic-fallback nav{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px;max-height:340px;overflow:auto}.ic-fallback nav button{padding:10px;border:1px solid #825139;background:#28191f;color:#ecd6ce;text-align:left;border-radius:4px}\n.ion-labels .ion-port,.ion-labels .ion-nodeInsert{pointer-events:auto}.ion-nodePorts{width:328px;display:flex;align-items:center;justify-content:center;gap:4px;flex-wrap:wrap;backface-visibility:hidden;max-height:47px;overflow:hidden}.ion-port{font:10px/1.3 'Segoe UI','Microsoft YaHei UI',sans-serif;max-width:145px;min-height:23px;padding:4px 7px;border:1px solid #764a37;border-radius:3px;color:#dbb09a;background:#24151deF;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;cursor:pointer;box-shadow:0 3px 8px #0007}.ion-port:hover{border-color:#ffd19b;color:#ffe5c8}.ion-port-artifact{color:#a5dfc4;border-color:#46745f;background:#10271feF}.ion-port-loop{color:#dfc080;border-style:dashed}.ion-port-output{color:#dbc2fd;border-color:#7d5c8d}.ion-port:disabled{opacity:.5;cursor:default}.ion-nodeInsert{width:26px;height:26px;display:grid;place-items:center;border:1px solid #f5b97d;border-radius:50%;background:#35201e;color:#ffdbb1;font-size:18px;cursor:pointer;box-shadow:0 0 20px #df8b3d33}.ion-chip[draggable=true]{cursor:grab}.ion-chip[data-dragging=true]{opacity:.4}.ion-chip[data-drop=skill]{outline:3px solid #acd8b6;outline-offset:5px;background:#213627f2}.ion-chip[data-drop=before]{border-top:4px solid #ffdaa4}.ion-chip[data-drop=after]{border-bottom:4px solid #ffdaa4}\n@keyframes ic-reveal{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:none}}\n@container metis-circuit (max-width:1150px){.ic-workspace>.mc-top,.ic-workspace>.mr-consoleBar{height:auto;min-height:58px;flex-wrap:wrap;padding:9px 12px;gap:8px}.ic-workspace .mc-modeField{order:0;flex:1 1 250px}.ic-workspace .mc-saveState,.ic-workspace .mr-consoleIndicator{display:none}.ic-workspace .mr-consolePicker{order:0;flex:1;min-width:150px}.ic-workspace .mr-consoleTools{margin-left:auto}.ic-inspector{width:min(340px,calc(100% - 28px))}.ic-context h1{max-width:310px}.ic-cameraTools{top:95px;right:14px;flex-direction:column}.ic-statusRail{left:12px;right:12px;bottom:12px;gap:8px}.ic-selection small{display:none}.ic-context{left:18px}.ic-workspace .mc-topTools{margin-left:auto}}\n@container metis-circuit (max-width:850px){.ic-body{grid-template-columns:minmax(0,1fr) 6px 300px}.ic-context h1{font-size:17px;max-width:270px}.ic-metrics{gap:8px}.ic-metrics b{font-size:14px}.ic-stage[data-inspector=true] .ic-world{left:0}.ic-inspector{left:10px;bottom:80px;top:110px}.ic-context{top:16px}.ic-statusText>small{display:none}.ic-selection{max-width:50%}.ic-cameraTools{top:85px}.ic-palette{top:100px;left:10px}.ic-statusRail{min-height:47px;padding:8px}.ic-selection>.ic-action{font-size:9px}}\n@media(prefers-reduced-motion:reduce){.ic-workspace *{animation:none!important;transition:none!important}}\n.ic-workspace[data-circuit-kind=project] .ic-inspector{bottom:auto;max-height:calc(100% - 200px)}.ic-drawerHead>span{display:grid;gap:5px;min-width:0}.ic-drawerHead strong{font-size:13px;letter-spacing:0;color:#f3d7c1;line-height:1.5}.ic-palette>.mr-projectNav{display:flex;flex-direction:column;position:static;width:100%;max-height:100%;min-height:0;border:0;background:transparent;overflow:auto;transform:none;visibility:visible}.ic-palette>.mr-projectNav .mr-projectList{padding:8px 12px}\n\n/* Research topology: free clusters, layered receipts and source-aware ports. */\n.ion-labels .in-entity{pointer-events:auto;width:196px;height:83px;display:block;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none;text-align:left;font-family:'Segoe UI','Microsoft YaHei UI',sans-serif;backface-visibility:hidden;cursor:pointer;color:#eee0dc;overflow:visible;position:relative}\n.ion-labels .in-entity::before,.ion-labels .in-entity::after{display:none}.ion-labels .in-entity[data-kind=step]{width:293px;height:146px}.ion-labels .in-entity[data-kind=engine]{width:343px;height:164px}\n.in-labelBody{height:100%;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:5px;padding:9px 11px;background:linear-gradient(140deg,#231b27f5,#0e0d17f9);border:1px solid color-mix(in srgb,var(--in-node),#312634 48%);box-shadow:inset 0 1px 0 #ffe8d110,0 6px 18px #0005;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,8px 100%,0 calc(100% - 8px));position:relative;overflow:hidden;animation:in-boot .5s ease-out backwards}\n.in-labelBody::after{content:'';position:absolute;top:-4px;left:0;right:0;height:2px;pointer-events:none;background:linear-gradient(90deg,transparent,var(--in-node),transparent);box-shadow:0 0 18px var(--in-node);opacity:0;animation:in-scan .65s ease-out}\n.in-entity[data-kind=step] .in-labelBody{padding:13px 15px;gap:8px;background:linear-gradient(145deg,#3a2329f4,#130e19f8 80%)}.in-entity[data-kind=engine] .in-labelBody{padding:17px 20px;gap:10px;background:linear-gradient(140deg,#39231ef8,#1f121df8);border-color:#d5a071;box-shadow:inset 0 0 40px #e7a16510,0 0 35px #d88a4322;text-align:center}\n.in-nodeHead{display:flex;align-items:center;justify-content:space-between;gap:5px;color:var(--in-node);font:9px/1.3 Consolas,'Microsoft YaHei UI',monospace;letter-spacing:.06em;flex:none}.in-nodeHead>span:last-child{letter-spacing:0;max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#d0b5af}.in-entity[data-kind=step] .in-nodeHead{font-size:11px}.in-entity[data-kind=engine] .in-nodeHead{font-size:9px;letter-spacing:.1em}.in-entity strong{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;font-size:15px;line-height:1.25;font-weight:600;color:#eeded9;letter-spacing:.01em}.in-entity[data-kind=step] strong{font-size:21px;line-height:1.28;-webkit-line-clamp:2}.in-entity[data-kind=engine] strong{font-size:23px;line-height:1.3;letter-spacing:.035em;-webkit-line-clamp:2}\n.in-nodeDetail{font-size:10px;color:#bda6b3;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;line-height:1.5;flex:none}.in-entity[data-kind=step] .in-nodeDetail{font-size:11px}.in-entity[data-kind=engine] .in-nodeDetail{font:11px/1.5 Consolas,'Microsoft YaHei UI',monospace;color:#d6b49b}.in-nodeFoot{display:block;border-top:1px solid color-mix(in srgb,var(--in-node) 20%,transparent);padding-top:4px;margin-top:auto;line-height:1.2;font-size:8px;color:#ac939f;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:none}.in-entity[data-kind=step] .in-nodeFoot{font-size:9px;padding-top:6px}.in-entity[data-kind=engine] .in-nodeFoot{color:#c89572;letter-spacing:.06em;font-size:10px}\n.in-entity[data-related=true] .in-labelBody,.in-entity:hover .in-labelBody,.in-entity:focus-visible .in-labelBody{border-color:var(--in-node);background:linear-gradient(140deg,color-mix(in srgb,var(--in-node) 15%,#201624),#130f19f9);box-shadow:inset 0 0 25px color-mix(in srgb,var(--in-node) 8%,transparent),0 0 25px color-mix(in srgb,var(--in-node) 20%,transparent)}\n.in-entity[data-active=true] .in-labelBody{border-color:#ffe0a2;background:linear-gradient(140deg,#5b3525f5,#231721f9);box-shadow:0 0 36px #f0a45055,inset 0 0 22px #ffa95522}.in-entity[data-active=true] .in-nodeHead>span:last-child{color:#ffdaa3}.in-entity[data-active=true] .in-nodeHead>span:last-child::before{content:'';display:inline-block;vertical-align:middle;margin-right:4px;width:4px;height:4px;background:#ffd596;border-radius:50%;box-shadow:0 0 9px #ffa95b;animation:ion-live-pulse 1.3s infinite}.in-entity[data-status=failed] .in-labelBody,.in-entity[data-status=refused] .in-labelBody{background:linear-gradient(140deg,#42212bf0,#1c101cf7);border-color:#bd6c66}.in-entity[data-kind=artifact] .in-labelBody{background:linear-gradient(140deg,#182c28f3,#10161af9)}\n.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) .in-nodeFoot{display:none}.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) strong{font-size:17px}.ic-world[data-network-lod=map] .in-nodeDetail{color:#d3bcc6}\n.in-scopeTabs{display:flex;align-items:center;padding:2px;border:1px solid #644238;border-radius:4px;background:#130e18eF;backdrop-filter:blur(14px)}.in-scopeTabs button{padding:5px 8px;min-height:25px;font-size:10px;border:0;background:transparent;color:#c09fac;cursor:pointer;border-radius:2px;white-space:nowrap}.in-scopeTabs button[aria-pressed=true]{color:#ffdbb7;background:#553022}\n.in-navigation{position:absolute;left:20px;bottom:96px;width:215px;z-index:3;background:linear-gradient(145deg,#1b111de8,#0b0c14e8);border:1px solid #614332;border-top-color:#b77f54;box-shadow:0 12px 35px #0006;border-radius:5px;backdrop-filter:blur(12px);overflow:hidden}.in-navigation>header{display:flex;justify-content:space-between;gap:10px;padding:8px 10px;font:8px/1.4 Consolas,monospace;letter-spacing:.07em;border-bottom:1px solid #51303a;color:#b88a76}.in-navigation>header b{font-weight:400;color:#e3b48a}.in-navigation>svg{display:block;width:100%;height:122px;padding:9px;box-sizing:border-box;overflow:visible}.in-navigation svg line{stroke:#8f5d49;stroke-width:.08;opacity:.5}.in-navigation svg line[data-active=true]{stroke:#ffe0a0;stroke-width:.16;opacity:1}.in-navigation svg circle{fill:#8a779c;stroke:none;cursor:pointer}.in-navigation svg circle[data-kind=step]{fill:#e1a16f;stroke:#eec6a8;stroke-width:.07}.in-navigation svg circle[data-kind=engine]{fill:#ffc78b}.in-navigation svg circle[data-kind=artifact]{fill:#8fd6b2}.in-navigation svg circle[data-kind=material]{fill:#74bbb7}.in-navigation svg circle[data-active=true]{fill:#fff0b8;stroke:#ffb057;stroke-width:.25}.in-navigation svg circle[data-viewed=true]{stroke:#ffe6c8;stroke-width:.3}.in-navigation svg g:hover circle,.in-navigation svg g:focus-visible circle{fill:#ffedde;stroke:#ffce9c;stroke-width:.3}.in-networkCounts{display:flex;justify-content:space-between;gap:6px;padding:7px 9px;border-top:1px solid #46303a;font-size:8px;color:#c4a2a8}.in-legend{display:flex;justify-content:space-between;gap:6px;padding:0 9px 9px;font-size:8px;color:#b79aa6}.in-legend span::before{content:'';display:inline-block;width:4px;height:4px;background:#ab99ba;margin-right:4px}.in-legend [data-type=activity]::before{background:#f2b370}.in-legend [data-type=delivery]::before{background:#8fd6b2}.ic-stage[data-inspector=true] .in-navigation{left:calc(min(390px,43%) + 14px);width:180px}.ic-stage[data-palette=true] .in-navigation{display:none}\n.in-entityDetail{padding:16px;overflow:auto;min-height:0;font-size:12px;line-height:1.75}.in-entityDetail h2{font-size:18px;line-height:1.45;margin:6px 0 9px;color:#f0d6c2;overflow-wrap:anywhere}.in-detailOrigin{font-size:9px;letter-spacing:.04em;color:#b8a2c7;border-left:2px solid #9984b2;padding-left:8px}.in-detailOrigin[data-origin=activity]{color:#e6bb8b;border-color:#e6aa6c}.in-detailOrigin[data-origin=delivery]{color:#9cd9be;border-color:#8fd6b2}.in-detailStatus{display:inline-flex;padding:2px 7px;border:1px solid #66513f;border-radius:3px;font-size:10px;color:#dbba9b;background:#332120}.in-detailStatus[data-status=failed],.in-detailStatus[data-status=refused]{border-color:#99544c;color:#ffb4a5}.in-detailOwner{font-size:10px;color:#b69aa9;margin:12px 0}.in-entityDetail pre{white-space:pre-wrap;overflow-wrap:anywhere;margin:12px 0;padding:12px;background:#0c0a12;border:1px solid #48313f;border-radius:4px;font:11px/1.8 Consolas,'Microsoft YaHei UI',monospace;max-height:340px;overflow:auto;color:#e5d2d0}.in-entityDetail dl{display:grid;grid-template-columns:55px minmax(0,1fr);gap:6px 10px;font-size:10px;margin:16px 0}.in-entityDetail dt{color:#ad91a2}.in-entityDetail dd{margin:0;overflow-wrap:anywhere;color:#dfc3bb}.in-detailActions{display:flex;flex-wrap:wrap;gap:8px;position:sticky;bottom:-16px;padding:12px 0;background:#19111bec;backdrop-filter:blur(12px)}\n@keyframes in-boot{from{opacity:0;filter:brightness(1.8)}to{opacity:1;filter:brightness(1)}}@keyframes in-scan{0%{opacity:.7;transform:translateY(0)}100%{opacity:0;transform:translateY(180px)}}\n@container metis-circuit (max-width:1150px){.in-navigation{width:165px;left:14px;bottom:90px}.in-navigation svg{height:92px}.in-navigation>header{font-size:7px}.in-networkCounts,.in-legend{font-size:7px;gap:3px}.in-scopeTabs{flex-direction:column}.ic-stage[data-inspector=true] .in-navigation{display:none}}\n@container metis-circuit (max-width:850px){.in-navigation{width:135px;bottom:80px;left:10px}.in-navigation>header>span{display:none}.in-navigation svg{height:80px}.in-networkCounts{flex-wrap:wrap}.in-legend{display:none}}\n@media(prefers-reduced-motion:reduce){.in-labelBody,.in-labelBody::after,.in-nodeHead>span:last-child::before{animation:none!important}}\n.ion-labels .in-entity[data-kind=step]{height:168px}.in-entity[data-kind=step] strong{font-size:26px}.in-entity[data-kind=step] .in-nodeHead{font-size:12px}.in-entity[data-kind=step] .in-nodeDetail{font-size:12px}.in-entity[data-kind=engine] strong{font-size:26px}.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) .in-nodeDetail{display:none}.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) strong{font-size:24px;line-height:1.25;margin-top:6px}.ic-world[data-network-lod=map] .in-entity:not([data-kind=step]):not([data-kind=engine]) .in-nodeHead{font-size:12px}\n.in-entity strong{flex:none}.in-labelBody{padding:7px 9px;gap:2px}.in-nodeFoot{padding-top:3px}.in-entity[data-kind=engine] .in-labelBody{padding:14px 20px;gap:6px}\n";
    // METIS_ION_STYLE_END
    const PKG_ID = 'metis-academic-mode';
    const PANEL_KEY = 'metis-academic';
    const NS = PKG_ID;
    const PRESET_ID = 'metis';
    const fixedMetisPreset=id=>typeof id==='string'&&/^METIS · .+〔配置 [a-f0-9]{16}〕$/.test(id);
    const TOKENS = {
      '--dsw-alias-bg-base': {light:'#F5EEE9',dark:'#100C15'},
      '--dsw-alias-bg-layer-1': {light:'#FFFAF4',dark:'#19111D'},
      '--dsw-alias-bg-layer-2': {light:'#EFE1D7',dark:'#2B1A26'},
      '--dsw-alias-bg-overlay': {light:'rgba(53,29,31,.4)',dark:'rgba(8,5,13,.65)'},
      '--dsw-alias-border-l1': {light:'#DFC4B6',dark:'#60403E'},
      '--dsw-alias-border-l2': {light:'#C8A795',dark:'#8A5B4F'},
      '--dsw-alias-brand-primary': {light:'#9C4D29',dark:'#F1AF78'},
      '--dsw-alias-label-primary': {light:'#36231F',dark:'#F0E2DC'},
      '--dsw-alias-label-secondary': {light:'#72575C',dark:'#C1A2B2'},
      '--dsw-alias-state-error-primary': {light:'#AE4149',dark:'#FFB1A2'},
      '--dsw-alias-state-idle-primary': {light:'#8C7776',dark:'#AD8F9F'},
      '--dsw-alias-state-success-primary': {light:'#287653',dark:'#91DDBA'},
      '--dsw-alias-state-warn-primary': {light:'#986026',dark:'#FFCE8D'},
      '--dsw-specific-sidebar-fill': {light:'#F0E4DB',dark:'#120D18'}
    };
    const DICT = {
      zh: {
        nav:'METIS', title:'研究工作台', subtitle:'从资料盘点到成果交付，按阶段推进研究。',
        newResearch:'新建研究', continue:'继续研究', refresh:'刷新数据', refreshing:'正在同步',
        theme:'METIS 模式', themeOn:'关闭 METIS 模式', themeOff:'开启 METIS 模式',
        researchProgress:'研究进度', skippedTasks:'已跳过', totalTasks:'全部任务',
        selectProject:'选择研究项目', projects:'研究项目', projectUnit:'个项目',
        current:'当前环节', progress:'整体进度', completed:'已完成', taskUnit:'项任务',
        evidence:'证据记录', evidenceUnit:'条', next:'下一步', nextHint:'从当前环节继续',
        noNext:'本环节暂时没有可继续的任务', stageDone:'本环节任务已完成，可在会话中确认下一步。',
        route:'研究路线', routeHint:'七阶段研究流程 · 十个执行环节', stageTasks:'阶段任务',
        currentTasks:'本阶段任务', taskSearch:'搜索任务名称、编号或产物', all:'全部', unfinished:'待完成',
        issues:'需处理', emptyFilter:'没有符合筛选条件的任务', clearFilter:'清除筛选',
        taskCount:'任务', outputs:'预期产物', dependencies:'依赖任务', noOutputs:'此任务未声明独立产物',
        noDependencies:'无前置任务', statusTODO:'待办', statusREADY:'可开始', statusRUNNING:'进行中',
        statusCOMPLETE:'已完成', statusFAILED:'失败', statusBLOCKED:'受阻', statusNEEDS_REVISION:'待修订',
        statusSKIPPED:'已跳过', statusUnknown:'状态未知', stageCurrent:'当前', stagePending:'待推进',
        stageComplete:'已完成', stageNoTasks:'暂无任务', projectInfo:'项目资料', workspace:'项目目录',
        updated:'配置更新时间', inspect:'查看阶段任务', openWorkbench:'打开研究工作台',
        positions:'项目位置', positionHint:'关联已有项目目录；取消关联不会删除目录或研究文件。',
        addRoot:'关联项目目录', removeRoot:'取消关联', recognized:'已识别项目', noProject:'未发现项目',
        rootsEmpty:'尚未关联任何目录', emptyTitle:'开始一项新的研究',
        emptyText:'选择项目目录，在 METIS 学术会话中明确研究目标。已有研究可以关联后继续。',
        loading:'正在读取研究项目', unavailable:'项目状态暂不可用', retry:'重新读取',
        readError:'暂时无法读取数据', errorDetails:'查看错误详情', raw:'原始状态',
        synced:'最近同步', notSynced:'尚未同步', nextTask:'下一项', currentProgress:'本阶段完成',
        viewing:'正在查看', returnCurrent:'返回当前环节', noCurrentProject:'此会话未关联 METIS 项目',
        errPick:'选择目录失败', errSession:'打开研究会话失败', errMode:'主题设置未保存',
        knownTasks:'已读取任务', stageReading:'尚未读取任务明细', completionHint:'项任务已完成',
        'stage.S1':'资料盘点','stage.S2':'文献检索','stage.S3':'选题确认','stage.S4':'研究设计',
        'stage.S5':'研究执行','stage.S6':'阶段验证','stage.S7':'正文写作','stage.S8':'格式适配',
        'stage.S9':'全局质检','stage.S10':'成果交付',
        'desc.S1':'梳理已有文档、数据与模板，明确研究的材料基础。',
        'desc.S2':'建立检索策略，整理文献索引，去重并核验引用来源。',
        'desc.S3':'比较候选问题，确认研究方向并锁定选题。',
        'desc.S4':'明确问题、理论框架与方法，把大纲拆成可验证的任务。',
        'desc.S5':'依研究范式完成材料准备与分析，将结论连接到实际证据。',
        'desc.S6':'检查前序阶段的产物、证据和验证记录，处理缺口。',
        'desc.S7':'围绕研究结论撰写正文，连接真实图表与引用。',
        'desc.S8':'适配目标模板，生成文稿并检查格式。',
        'desc.S9':'检查引用、一致性、论证与成果质量。',
        'desc.S10':'汇总成果与交付清单，保留可追溯的研究记录。'
      },
      en: {
        nav:'METIS',title:'Research workspace',subtitle:'A clear path from your first sources to a finished research project.',
        newResearch:'New research',continue:'Continue research',refresh:'Refresh data',refreshing:'Syncing',
        theme:'METIS modes',themeOn:'Turn METIS modes off',themeOff:'Turn METIS modes on',
        researchProgress:'Research progress',skippedTasks:'Skipped',totalTasks:'All tasks',
        selectProject:'Choose research project',projects:'Research projects',projectUnit:'projects',
        current:'Current step',progress:'Overall progress',completed:'Completed',taskUnit:'tasks',
        evidence:'Evidence records',evidenceUnit:'records',next:'Up next',nextHint:'Continue the current step',
        noNext:'No task can be continued in this step yet',stageDone:'Step tasks are complete. Confirm the next step in your session.',
        route:'Research roadmap',routeHint:'Seven research phases · ten execution steps',stageTasks:'Step tasks',
        currentTasks:'Current step',taskSearch:'Search tasks, IDs or expected outputs',all:'All',unfinished:'To do',
        issues:'Needs attention',emptyFilter:'No tasks match your filters',clearFilter:'Clear filters',
        taskCount:'tasks',outputs:'Expected outputs',dependencies:'Dependencies',noOutputs:'No separate output is declared for this task',
        noDependencies:'No prerequisites',statusTODO:'To do',statusREADY:'Ready',statusRUNNING:'In progress',
        statusCOMPLETE:'Complete',statusFAILED:'Failed',statusBLOCKED:'Blocked',statusNEEDS_REVISION:'Needs revision',
        statusSKIPPED:'Skipped',statusUnknown:'Unknown status',stageCurrent:'Current',stagePending:'Upcoming',
        stageComplete:'Complete',stageNoTasks:'No tasks',projectInfo:'Project details',workspace:'Project directory',
        updated:'Configuration updated',inspect:'View step tasks',openWorkbench:'Open research workspace',
        positions:'Project locations',positionHint:'Link an existing project. Unlinking never deletes its directory or research files.',
        addRoot:'Link project folder',removeRoot:'Unlink',recognized:'Project found',noProject:'No project found',
        rootsEmpty:'No folders linked',emptyTitle:'Begin a new research project',
        emptyText:'Choose a folder and define your research goal in a METIS session, or link an existing project to continue.',
        loading:'Reading research projects',unavailable:'Project status is unavailable',retry:'Read again',
        readError:'Unable to refresh. Previous data is retained.',errorDetails:'Error details',raw:'Raw state',
        synced:'Last synced',notSynced:'Not synced yet',nextTask:'Next',currentProgress:'Step completion',
        viewing:'Viewing',returnCurrent:'Return to current step',noCurrentProject:'No METIS project is linked to this session',
        errPick:'Unable to select folder',errSession:'Unable to open research session',errMode:'Theme setting was not saved',
        knownTasks:'Tasks loaded',stageReading:'Task details have not been loaded',completionHint:'Completed / all tasks',
        'stage.S1':'Materials','stage.S2':'Literature','stage.S3':'Topic','stage.S4':'Design',
        'stage.S5':'Research','stage.S6':'Validation','stage.S7':'Writing','stage.S8':'Formatting',
        'stage.S9':'Quality review','stage.S10':'Delivery',
        'desc.S1':'Review existing documents, data and templates to establish your starting point.',
        'desc.S2':'Plan searches, build a literature index, and deduplicate and verify sources.',
        'desc.S3':'Compare research questions and confirm your selected topic.',
        'desc.S4':'Define your questions, framework and methods, then build a verifiable task plan.',
        'desc.S5':'Prepare materials and perform the analysis required by your research approach.',
        'desc.S6':'Review outputs, evidence and validation records from earlier steps.',
        'desc.S7':'Develop the manuscript around supported conclusions, figures and citations.',
        'desc.S8':'Apply the required template and check the exported manuscript.',
        'desc.S9':'Review citations, consistency, argument and overall quality.',
        'desc.S10':'Package deliverables with a traceable record of the research.'
      }
    };

    const css = `
html[data-metis-mode] body{font-family:var(--dsw-font-family,system-ui,"Microsoft YaHei","Segoe UI",sans-serif)}
.mm-panel,.mm-hud{--mm-accent:var(--dsw-alias-brand-primary,#216d57);--mm-ink:var(--dsw-alias-label-primary,#20332c);--mm-muted:var(--dsw-alias-label-secondary,#64776c);--mm-bg:var(--dsw-alias-bg-base,#f7f8f6);--mm-surface:var(--dsw-alias-bg-layer-1,#fff);--mm-soft:var(--dsw-alias-bg-layer-2,#f0f3f0);--mm-line:var(--dsw-alias-border-l1,#e2e8e2);--mm-cta-ink:#fff;font:14px/1.6 "Segoe UI","Microsoft YaHei UI","Microsoft YaHei","PingFang SC",sans-serif;color:var(--mm-ink);box-sizing:border-box}
body[data-ds-dark-theme] .mm-panel,body[data-ds-dark-theme] .mm-hud{--mm-cta-ink:#152b20}
.mm-panel *,.mm-hud *{box-sizing:border-box}.mm-panel{height:100%;overflow:auto;background:var(--mm-bg);scrollbar-gutter:stable}
.mm-shell{max-width:1320px;margin:0 auto;padding:38px 42px 34px}.mm-panel .mm-shell button,.mm-panel .mm-shell input,.mm-panel .mm-shell select,.mm-hud button{font:inherit}
.mm-panel button,.mm-panel summary,.mm-hud button{-webkit-app-region:no-drag}.mm-panel button,.mm-hud button{cursor:pointer}
.mm-panel .mm-shell button:disabled{cursor:wait;opacity:.6}.mm-panel button:focus-visible,.mm-panel input:focus-visible,.mm-panel select:focus-visible,.mm-panel summary:focus-visible,.mm-hud button:focus-visible{outline:2px solid var(--mm-accent);outline-offset:4px}
.mm-top{display:flex;justify-content:space-between;align-items:center;gap:24px;margin-bottom:28px}.mm-brand{display:flex;align-items:center;gap:9px;font-size:11px;font-weight:700;letter-spacing:.16em;color:var(--mm-accent);margin-bottom:9px}.mm-brand span{opacity:.55;letter-spacing:0;padding:0 2px}.mm-top h1{font-size:29px;line-height:1.3;font-weight:650;letter-spacing:-.7px;margin:0 0 7px}.mm-subtitle{margin:0;font-size:13px;color:var(--mm-muted)}
.mm-toolbar{display:flex;align-items:center;gap:10px;flex:none}.mm-button{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:37px;padding:7px 13px;color:var(--mm-ink);background:var(--mm-surface);border:1px solid var(--mm-line);border-radius:9px;line-height:1.4;white-space:nowrap;transition:background .15s,border-color .15s,transform .15s}.mm-button:hover{background:var(--mm-soft);border-color:color-mix(in srgb,var(--mm-accent) 45%,var(--mm-line))}.mm-button:active{transform:translateY(1px)}.mm-button.mm-primary{background:var(--mm-accent);border-color:var(--mm-accent);color:var(--mm-cta-ink);font-weight:600}.mm-primary:hover{filter:brightness(.94)}.mm-iconButton{width:37px;padding:8px}.mm-textButton{display:inline-flex;align-items:center;gap:5px;background:none;border:0;padding:4px 0;color:var(--mm-accent);font-size:12px}.mm-textButton:hover{text-decoration:underline}.mm-icon{display:inline-block;flex:none;vertical-align:middle}.mm-spin{animation:mm-spin 1.1s linear infinite}@keyframes mm-spin{to{transform:rotate(360deg)}}
.mm-theme{display:flex;align-items:center;gap:8px;border:0;background:none;color:var(--mm-muted);padding:7px 4px;font-size:12px!important;white-space:nowrap}.mm-switch{width:28px;height:16px;border-radius:20px;background:var(--mm-line);position:relative;flex:none}.mm-switch:after{content:"";position:absolute;left:3px;top:3px;width:10px;height:10px;border-radius:50%;background:var(--mm-muted);transition:transform .15s}.mm-theme[aria-checked=true] .mm-switch{background:var(--mm-accent)}.mm-theme[aria-checked=true] .mm-switch:after{background:var(--mm-cta-ink);transform:translateX(12px)}
.mm-projectBar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:15px;padding:0 1px}.mm-projectPicker{display:flex;align-items:center;gap:10px;min-width:0}.mm-caption{font-size:11px;font-weight:600;color:var(--mm-muted);letter-spacing:.04em}.mm-projectPicker select{max-width:430px;min-width:160px;border:0;background:transparent;color:var(--mm-ink);font-weight:600;padding:5px 20px 5px 0;outline-offset:2px}.mm-count{font-size:11px;color:var(--mm-muted);background:var(--mm-soft);padding:2px 8px;border-radius:5px;white-space:nowrap}.mm-sync{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--mm-muted);white-space:nowrap}.mm-syncDot{width:5px;height:5px;border-radius:50%;background:var(--mm-accent)}
.mm-card{background:var(--mm-surface);border:1px solid var(--mm-line);border-radius:15px}.mm-overview{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(210px,1fr);margin-bottom:20px;overflow:hidden}.mm-hero{padding:27px 29px}.mm-stageTag{display:inline-flex;align-items:center;gap:6px;color:var(--mm-accent);background:color-mix(in srgb,var(--mm-accent) 9%,transparent);font-size:11px;font-weight:600;line-height:1.5;border-radius:5px;padding:3px 8px;margin-bottom:13px}.mm-stageTag i{height:5px;width:5px;border-radius:50%;background:currentColor}.mm-projectTitle{font-size:24px;line-height:1.4;font-weight:650;letter-spacing:-.4px;overflow-wrap:anywhere;margin:0 0 9px}.mm-heroDesc{color:var(--mm-muted);font-size:13px;max-width:560px;margin:0 0 20px}.mm-heroActions{display:flex;align-items:center;gap:17px;flex-wrap:wrap}.mm-heroActions .mm-button{min-height:39px;padding-inline:16px}.mm-overviewStats{padding:26px 28px;background:color-mix(in srgb,var(--mm-soft) 50%,var(--mm-surface));border-left:1px solid var(--mm-line);display:flex;flex-direction:column;justify-content:center}.mm-progressHead{display:flex;justify-content:space-between;align-items:baseline;gap:15px}.mm-progressNumber{font-size:32px;font-weight:550;line-height:1.3;letter-spacing:-1.2px;font-variant-numeric:tabular-nums}.mm-progressNumber small{font-size:16px;letter-spacing:0;color:var(--mm-muted);margin-left:2px}.mm-progress{height:5px;background:var(--mm-line);border-radius:8px;overflow:hidden;margin:13px 0 9px}.mm-progress>div{height:100%;background:var(--mm-accent);border-radius:inherit;transition:width .2s}.mm-progressText{font-size:12px;color:var(--mm-muted)}.mm-progressText strong{color:var(--mm-ink);font-weight:600}.mm-statFoot{display:flex;gap:20px;margin-top:20px;padding-top:16px;border-top:1px solid var(--mm-line)}.mm-statItem{font-size:11px;color:var(--mm-muted)}.mm-statItem strong{display:inline-block;font-size:18px;color:var(--mm-ink);font-weight:600;margin-right:6px;font-variant-numeric:tabular-nums}
.mm-roadmap{padding:20px 24px 18px;margin-bottom:20px}.mm-sectionHead{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px}.mm-sectionHead h2{font-size:14px;font-weight:650;margin:0}.mm-sectionHead>span{font-size:11px;color:var(--mm-muted)}.mm-stages{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:5px}.mm-stage{display:flex;flex-direction:column;align-items:center;gap:7px;position:relative;min-width:0;border:0;border-radius:9px;background:none;padding:9px 3px 7px;color:var(--mm-muted);font-size:12px!important;line-height:1.5}.mm-stage:hover{background:var(--mm-soft);color:var(--mm-ink)}.mm-stage[aria-pressed=true]{background:color-mix(in srgb,var(--mm-accent) 8%,transparent);color:var(--mm-accent)}.mm-stageNumber{height:27px;width:27px;display:flex;align-items:center;justify-content:center;border:1px solid var(--mm-line);border-radius:50%;font-size:11px;font-weight:600;font-variant-numeric:tabular-nums;background:var(--mm-surface);z-index:1}.mm-stage:not(:last-child):after{content:"";position:absolute;top:22px;left:calc(50% + 22px);width:calc(100% - 39px);height:1px;background:var(--mm-line)}.mm-stage.is-current .mm-stageNumber{color:var(--mm-accent);border-color:var(--mm-accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--mm-accent) 10%,transparent)}.mm-stage.is-done .mm-stageNumber{background:var(--mm-accent);color:var(--mm-cta-ink);border-color:var(--mm-accent)}.mm-stage.is-error .mm-stageNumber{color:var(--dsw-alias-state-error-primary);border-color:currentColor}.mm-stageLabel{font-weight:550;text-align:center;overflow-wrap:anywhere}.mm-stageMeta{font-size:10px;opacity:.75}
.mm-workgrid{display:grid;grid-template-columns:minmax(0,1fr) 255px;gap:20px;align-items:start}.mm-tasks{overflow:hidden;scroll-margin-top:20px}.mm-taskHeading{padding:21px 23px 0}.mm-taskHeadingRow{display:flex;align-items:center;justify-content:space-between;gap:14px}.mm-taskHeading h2{font-size:16px;font-weight:650;margin:0}.mm-taskHeading small{display:block;margin-top:3px;font-size:11px;color:var(--mm-muted)}.mm-taskTools{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin:18px 0 15px}.mm-filters{display:flex;gap:3px;background:var(--mm-soft);border-radius:7px;padding:3px}.mm-filter{border:0;background:none;color:var(--mm-muted);padding:4px 9px;border-radius:5px;font-size:11px!important;white-space:nowrap}.mm-filter[aria-pressed=true]{background:var(--mm-surface);color:var(--mm-ink);box-shadow:0 1px 3px #0000000b}.mm-search{display:flex;align-items:center;gap:7px;min-width:140px;flex:1;max-width:255px;color:var(--mm-muted);border-bottom:1px solid var(--mm-line);padding:5px 0}.mm-search input{width:100%;min-width:0;border:0;outline:none!important;background:none;color:var(--mm-ink);font-size:12px;padding:0}.mm-search:focus-within{border-color:var(--mm-accent)}.mm-search input::placeholder{color:var(--mm-muted);opacity:.75}
.mm-taskList{max-height:525px;overflow:auto;padding:0 23px 5px;scrollbar-gutter:stable}.mm-task{border-top:1px solid var(--mm-line)}.mm-task summary{list-style:none;display:flex;align-items:center;gap:12px;padding:14px 0;cursor:pointer}.mm-task summary::-webkit-details-marker{display:none}.mm-task summary:hover .mm-taskTitle{color:var(--mm-accent)}.mm-taskBody{min-width:0;flex:1}.mm-taskTitle{font-size:13px;font-weight:550;overflow-wrap:anywhere;line-height:1.6}.mm-taskMeta{display:flex;align-items:center;gap:9px;margin-top:2px;font-size:10px;color:var(--mm-muted)}.mm-taskId{font-family:"Cascadia Code",Consolas,monospace;font-variant-numeric:tabular-nums}.mm-taskArrow{color:var(--mm-muted);opacity:.7;transition:transform .15s}.mm-task[open] .mm-taskArrow{transform:rotate(90deg)}.mm-taskStateDot{width:16px;height:16px;border:1px solid var(--mm-line);border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;color:var(--mm-accent)}.mm-taskStateDot.COMPLETE{background:color-mix(in srgb,var(--mm-accent) 10%,transparent);border-color:transparent}.mm-taskStateDot.RUNNING{border-color:var(--mm-accent);box-shadow:inset 0 0 0 4px var(--mm-surface);background:var(--mm-accent)}.mm-taskStateDot.FAILED,.mm-taskStateDot.BLOCKED,.mm-taskStateDot.NEEDS_REVISION{color:var(--dsw-alias-state-error-primary);border-color:currentColor}.mm-taskStatus{font-size:10px;white-space:nowrap;padding:2px 7px;border-radius:5px;background:var(--mm-soft);color:var(--mm-muted)}.mm-taskStatus.COMPLETE,.mm-taskStatus.READY{background:color-mix(in srgb,var(--mm-accent) 9%,transparent);color:var(--mm-accent)}.mm-taskStatus.RUNNING{color:var(--mm-accent)}.mm-taskStatus.FAILED,.mm-taskStatus.BLOCKED,.mm-taskStatus.NEEDS_REVISION{background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent);color:var(--dsw-alias-state-error-primary)}.mm-taskExpanded{margin:0 0 14px 28px;padding:12px 14px;background:var(--mm-soft);border-radius:8px;font-size:11px;color:var(--mm-muted)}.mm-taskExpanded strong{display:block;margin-bottom:6px;font-size:10px;font-weight:600;color:var(--mm-muted)}.mm-taskExpanded ul{padding:0;margin:0 0 12px;list-style:none}.mm-taskExpanded li{padding:3px 0;overflow-wrap:anywhere}.mm-taskExpanded code{font:11px/1.5 "Cascadia Code",Consolas,monospace;color:var(--mm-ink);overflow-wrap:anywhere}.mm-taskExpanded p{margin:0}.mm-taskFooter{padding:10px 23px;border-top:1px solid var(--mm-line);font-size:10px;color:var(--mm-muted);display:flex;justify-content:space-between}.mm-taskEmpty{padding:35px 10px 40px;text-align:center;color:var(--mm-muted);font-size:12px}.mm-taskEmpty button{margin:10px auto 0;display:block}
.mm-aside{display:flex;flex-direction:column;gap:16px}.mm-asideCard{padding:20px}.mm-asideLabel{display:flex;align-items:center;gap:7px;color:var(--mm-muted);font-size:11px;font-weight:600;margin:0 0 14px}.mm-nextTask{font-size:14px;font-weight:600;line-height:1.7;margin:7px 0 9px;overflow-wrap:anywhere}.mm-nextId{color:var(--mm-accent);font:10px "Cascadia Code",Consolas,monospace}.mm-nextDesc{font-size:12px;line-height:1.8;color:var(--mm-muted);margin:0 0 15px}.mm-aside .mm-primary{width:100%;font-size:12px}.mm-metadata{margin:0}.mm-metadata dt{font-size:10px;color:var(--mm-muted);margin:13px 0 4px}.mm-metadata dd{margin:0;color:var(--mm-ink);font-size:11px;overflow-wrap:anywhere}.mm-rootPath{font:10px/1.8 "Cascadia Code",Consolas,monospace!important}.mm-evidenceCount{font-size:25px;font-weight:550;line-height:1.3;letter-spacing:-.5px}.mm-evidenceCount small{font-size:11px;color:var(--mm-muted);font-weight:400;margin-left:7px}.mm-diagnostics{margin-top:15px;border-top:1px solid var(--mm-line);padding-top:11px;color:var(--mm-muted);font-size:10px}.mm-diagnostics summary{cursor:pointer}.mm-diagnostics pre{max-height:220px;overflow:auto;font:10px/1.6 Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere;background:var(--mm-soft);padding:10px;border-radius:7px}
.mm-locations{margin-top:23px;border-top:1px solid var(--mm-line);padding:17px 1px 0;font-size:12px;color:var(--mm-muted)}.mm-locations>summary{list-style:none;display:flex;align-items:center;gap:7px;cursor:pointer;font-weight:550}.mm-locations>summary::-webkit-details-marker{display:none}.mm-locationChevron{margin-left:auto;transition:transform .15s}.mm-locations[open] .mm-locationChevron{transform:rotate(180deg)}.mm-locationsPanel{padding:16px 0 4px}.mm-locationsPanel>p{font-size:11px;margin:0 0 10px;line-height:1.8}.mm-rootRow{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--mm-line)}.mm-rootRow>code{flex:1;min-width:0;font:11px/1.7 Consolas,monospace;color:var(--mm-ink);overflow-wrap:anywhere}.mm-rootRow .mm-textButton{font-size:10px;flex:none}.mm-rootLabel{font-size:10px;white-space:nowrap}.mm-rootRow+.mm-button{margin-top:13px}.mm-empty{padding:64px 28px;text-align:center}.mm-emptyIcon{width:56px;height:56px;border-radius:17px;background:var(--mm-soft);color:var(--mm-accent);display:flex;align-items:center;justify-content:center;margin:0 auto 18px}.mm-empty h2{font-size:21px;font-weight:600;margin:0 0 10px}.mm-empty p{max-width:430px;margin:0 auto 23px;color:var(--mm-muted);font-size:13px}.mm-emptyActions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}.mm-error{padding:12px 15px;margin-bottom:15px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 30%,var(--mm-line));border-radius:9px;color:var(--dsw-alias-state-error-primary);font-size:12px;overflow-wrap:anywhere}.mm-error details{font-size:11px;margin-top:5px}.mm-error pre{white-space:pre-wrap;overflow-wrap:anywhere;font:11px/1.6 Consolas,monospace}.mm-loading{padding:55px;display:flex;align-items:center;justify-content:center;gap:10px;color:var(--mm-muted)}
.mm-hud{flex:none;width:min(calc(100% - 32px),760px);height:16px;margin:0 auto 8px;display:flex;align-items:center;gap:9px;background:none;border:0;border-radius:0;cursor:default}.mm-hudTrack{height:4px;min-width:0;flex:1;border-radius:999px;overflow:hidden;background:var(--mm-line)}.mm-hudFill{display:block;height:100%;border-radius:inherit;background:var(--mm-accent);transition:width .2s ease}.mm-hudValue{min-width:31px;text-align:right;color:var(--mm-muted);font-size:10px;line-height:16px;font-variant-numeric:tabular-nums}
@media(min-width:1800px){.mm-shell{padding-top:48px}.mm-hero{padding:32px}.mm-taskTitle{font-size:14px}.mm-task summary{padding-block:16px}}
@media(max-width:1180px){.mm-shell{padding:28px}.mm-workgrid{grid-template-columns:minmax(0,1fr) 225px;gap:16px}.mm-hero{padding:23px}.mm-overviewStats{padding:23px}.mm-projectTitle{font-size:22px}.mm-roadmap{padding-inline:18px}.mm-stages{gap:1px}.mm-stageLabel{font-size:11px}.mm-taskHeading{padding:19px 19px 0}.mm-taskList{padding-inline:19px}.mm-taskFooter{padding-inline:19px}.mm-asideCard{padding:17px}.mm-top h1{font-size:26px}}
@media(max-width:980px){.mm-workgrid{grid-template-columns:minmax(0,1fr)}.mm-aside{display:grid;grid-template-columns:1fr 1fr}.mm-top{align-items:flex-start;gap:14px}.mm-toolbar{gap:6px}.mm-stages{grid-template-columns:repeat(5,minmax(0,1fr));row-gap:12px}.mm-stage:nth-child(5):after{display:none}.mm-stageLabel{font-size:12px}.mm-overview{grid-template-columns:1.5fr 1fr}.mm-overviewStats{padding-inline:20px}.mm-projectPicker select{max-width:300px}}
@media(max-width:680px){.mm-shell{padding:20px 16px}.mm-top{flex-wrap:wrap;margin-bottom:20px}.mm-top h1{font-size:25px}.mm-toolbar{width:100%;justify-content:flex-end}.mm-toolbar .mm-theme{margin-right:auto}.mm-overview{grid-template-columns:1fr}.mm-overviewStats{border-left:0;border-top:1px solid var(--mm-line);padding:18px 23px}.mm-statFoot{margin-top:12px;padding-top:12px}.mm-progressNumber{font-size:27px}.mm-projectBar{align-items:flex-start;gap:7px}.mm-projectPicker{gap:6px;flex-wrap:wrap}.mm-projectPicker select{max-width:220px;min-width:130px}.mm-sync{font-size:10px;margin-top:7px}.mm-caption{font-size:10px}.mm-subtitle{font-size:12px}.mm-roadmap{padding:17px 12px}.mm-sectionHead{padding-inline:5px;align-items:flex-start}.mm-sectionHead>span{font-size:10px;text-align:right;max-width:150px}.mm-aside{grid-template-columns:1fr}.mm-taskTools{gap:9px}.mm-search{max-width:none;flex-basis:100%}.mm-task summary{gap:9px}.mm-taskStatus{font-size:9px}.mm-taskTitle{font-size:12px}.mm-taskHeadingRow{gap:8px}.mm-taskHeading h2{font-size:14px}.mm-rootRow{flex-wrap:wrap}.mm-rootRow>code{flex-basis:75%}.mm-hud{width:calc(100% - 20px)}.mm-hudMain{padding:10px;gap:8px}.mm-hudMark{width:27px;height:27px}.mm-hudTitle{gap:6px}.mm-hudTitle strong{font-size:11px}.mm-hudPhase{font-size:9px}.mm-hudCount{display:none}}
@media(min-width:981px) and (max-height:950px){.mm-shell{padding-top:24px}.mm-top{margin-bottom:20px}.mm-brand{margin-bottom:6px}.mm-top h1{font-size:26px;margin-bottom:5px}.mm-hero{padding:22px 26px}.mm-stageTag{margin-bottom:8px}.mm-heroDesc{margin-bottom:14px}.mm-projectTitle{font-size:22px}.mm-overviewStats{padding:22px 26px}.mm-overview{margin-bottom:16px}.mm-roadmap{padding:16px 20px;margin-bottom:16px}.mm-sectionHead{margin-bottom:10px}.mm-stage{padding:6px 3px;gap:5px}.mm-stageNumber{width:24px;height:24px}.mm-stage:not(:last-child):after{top:18px}.mm-taskHeading{padding-top:18px}}
@media(prefers-reduced-motion:reduce){.mm-panel *,.mm-hud *{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
.mm-panel{--mm-control:36px;--mm-control-radius:8px;--mm-card-radius:12px;--mm-gap:16px;container:metis-project / inline-size}
.mm-panel .mm-button{height:var(--mm-control);min-height:var(--mm-control);padding:0 12px;border-radius:var(--mm-control-radius);font-size:12px;line-height:1.4}
.mm-panel .mm-button:active{transform:none}
.mm-panel .mm-iconButton{width:36px;padding:0}
.mm-panel .mm-theme{height:36px;padding:0 10px;border:1px solid var(--mm-line);border-radius:8px;background:var(--mm-surface)}
.mm-panel .mm-card{border-radius:var(--mm-card-radius)}
.mm-panel .mm-shell{max-width:none;width:100%;padding:20px 24px 24px}
.mm-panel .mm-top{min-height:40px;gap:16px;margin-bottom:16px}
.mm-pageBrand{display:flex;align-items:center;gap:10px;min-width:0}
.mm-brandLogo{width:36px;height:36px;display:grid;place-items:center;border:1px solid var(--mm-line);border-radius:10px;color:var(--mm-accent);background:var(--mm-surface);flex:none}
.mm-panel .mm-top h1{font-size:18px;font-weight:600;line-height:24px;letter-spacing:-.3px;margin:0}
.mm-panel .mm-subtitle{font-size:11px;line-height:18px;margin:0}
.mm-panel .mm-overview,.mm-panel .mm-roadmap{margin-bottom:16px}
.mm-panel .mm-workgrid{gap:16px}
.mm-panel .mm-hero,.mm-panel .mm-overviewStats,.mm-panel .mm-asideCard{padding:20px}
.mm-panel .mm-projectTitle{font-size:22px}
.mm-panel .mm-projectPicker select{height:36px;padding:0 10px;border:1px solid var(--mm-line);border-radius:8px;background:var(--mm-surface);font-size:13px;max-width:430px}
.mm-workspaceTabs{height:52px;display:flex;align-items:center;gap:4px;padding:8px 24px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);flex:none}
.mm-workspaceTabs button{height:36px;min-width:92px;padding:0 14px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);font:12px "Segoe UI","Microsoft YaHei UI",sans-serif;cursor:pointer}
.mm-workspaceTabs button[aria-selected=true]{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.mm-workspaceTabs button:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
@container metis-project (max-width:1120px){.mm-panel .mm-shell{padding:16px}}
@container metis-project (max-width:760px){.mm-panel .mm-shell{padding:12px}.mm-panel .mm-top{flex-wrap:wrap}.mm-panel .mm-toolbar{width:100%;justify-content:flex-end}.mm-panel .mm-toolbar .mm-theme{margin-right:auto}}

/* Project navigation, workflow and the native DSH research conversation. */
.mm-panel.mr-panel {
  --mr-accent: #176951;
  --mr-on-accent: #fff;
  --mr-paper: var(--mm-surface);
  --mr-rail: color-mix(in srgb, var(--mm-bg) 82%, var(--mm-soft));
  --mr-chat-surface: color-mix(in srgb, var(--mm-bg) 60%, var(--mm-surface));
  --mr-rule: color-mix(in srgb, var(--mm-ink) 12%, transparent);
  --mr-tint: color-mix(in srgb, var(--mr-accent) 8%, var(--mr-paper));
  min-height: 0; overflow: hidden; scrollbar-gutter: auto;
  background: var(--mr-paper); font-family: var(--dsw-font-family, system-ui, 'Microsoft YaHei UI', sans-serif);
}
body[data-ds-dark-theme] .mr-panel { --mr-accent: #94d8be; --mr-on-accent: #132c23; }
.mr-shell { display: flex; flex-direction: column; height: 100%; min-height: 0; }
.mr-layout {
  --mr-rail-size: clamp(196px, 13%, 244px);
  flex: 1; min-height: 0; min-width: 0; display: grid;
  grid-template: 'rail detail split chat' minmax(0,1fr) / var(--mr-rail-size) minmax(0,1fr) 8px var(--mr-chat-size, clamp(328px,37%,820px));
}
.mr-panel .mr-action,.mr-panel .mr-iconButton,.mr-panel .mr-start,.mr-panel .mr-historyToggle {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  border-radius: 7px; font: inherit; font-size: 13px; line-height: 1.4; white-space: nowrap;
  transition: background-color .14s ease, color .14s ease, border-color .14s ease;
}
.mr-panel .mr-action { min-height: 32px; padding: 5px 10px; background: var(--mr-paper); color: var(--mm-ink); border: 1px solid var(--mr-rule); }
.mr-panel .mr-action:hover:enabled { border-color: var(--mr-accent); color: var(--mr-accent); }
.mr-panel .mr-iconButton,.mr-panel .mr-historyToggle { min-height: 32px; border: 0; background: transparent; color: var(--mm-muted); }
.mr-panel .mr-iconButton { width: 32px; padding: 0; flex: none; }
.mr-panel .mr-historyToggle { padding: 4px 8px; }
.mr-panel .mr-iconButton:hover:enabled,.mr-panel .mr-historyToggle:hover:enabled { background: var(--mm-soft); color: var(--mm-ink); }
.mr-panel :is(.mr-iconButton,.mr-action,.mr-historyToggle,.mr-start,.mr-dialog button):disabled { opacity: .55; cursor: default; }
.mr-panel :is(.mr-projectNav,.mr-project,.mr-dialog,.mr-chatHeader,.mr-chatWelcome) :focus-visible, .mr-split:focus-visible {
  outline: 2px solid var(--mr-accent); outline-offset: 2px;
}
.mr-note,.mr-meta,.mr-time,.mr-empty { color: var(--mm-muted); font-size: 13px; line-height: 1.65; }
.mr-note { margin: 6px 0; }.mr-error { color: var(--dsw-alias-state-error-primary,#ae3546); background: var(--mr-paper); border-inline-start: 3px solid currentColor; padding: 7px 12px; margin: 4px 0; font-size: 13px; }
.mr-shell > .mr-error,.mr-shell > .mr-note { flex: none; padding-inline: 16px; }
.mr-projectNav { grid-area: rail; min-width: 0; min-height: 0; display: flex; flex-direction: column; background: var(--mr-rail); border-inline-end: 1px solid var(--mr-rule); }
.mr-navHead,.mr-chatHeader { min-height: 58px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex: none; }
.mr-navHead { padding: 8px 10px 8px 14px; }
.mr-brand,.mr-navTools,.mr-chatIdentity { display: flex; align-items: center; gap: 8px; min-width: 0; }
.mr-navTools { gap: 2px; flex: none; }
.mr-brand h1,.mr-chatHeader h2 { margin: 0; color: var(--mm-ink); font-size: 15px; font-weight: 630; letter-spacing: .01em; white-space: nowrap; }
.mr-brand > svg { color: var(--mr-accent); flex: none; }
.mr-panel .mr-newProject { min-height: 30px; padding-inline: 8px; color: var(--mr-accent); border-color: transparent; background: var(--mr-tint); font-weight: 560; }
.mr-panel .mr-newProject:hover:enabled { background: color-mix(in srgb, var(--mr-accent) 15%, var(--mr-paper)); }
.mr-compactPicker { display: none; }
.mr-projectList { min-height: 0; overflow: auto; padding: 3px 9px 16px; display: flex; flex-direction: column; gap: 3px; }
.mr-projectList > button { position: relative; width: 100%; display: grid; grid-template-columns: 18px minmax(0,1fr); align-items: start; gap: 9px; padding: 10px 12px; text-align: start; background: transparent; border: 0; border-radius: 8px; color: var(--mm-muted); font: inherit; }
.mr-projectList > button:hover { background: color-mix(in srgb, var(--mm-ink) 4%, transparent); }
.mr-projectList > button[aria-pressed=true] { background: color-mix(in srgb, var(--mr-accent) 9%, var(--mr-rail)); }
.mr-projectList > button[aria-pressed=true]::before { content: ''; position: absolute; inset-inline-start: 0; inset-block: 12px; width: 3px; border-radius: 2px; background: var(--mr-accent); }
.mr-projectList > button > svg { margin-top: 4px; }.mr-projectList > button[aria-pressed=true] > svg { color: var(--mr-accent); }
.mr-projectList strong,.mr-projectList small { display: block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.mr-projectList strong { color: var(--mm-ink); font-size: 14px; font-weight: 570; }.mr-projectList small { margin-top: 3px; font-size: 12px; }
.mr-project { grid-area: detail; min-height: 0; min-width: 0; overflow: auto; scrollbar-gutter: stable; overscroll-behavior: contain; }
.mr-projectInner { width: 100%; max-width: 1140px; margin-inline: auto; padding: clamp(20px,2.1vw,42px) clamp(18px,2.4vw,48px) 28px; }
.mr-projectHeader { margin-bottom: 17px; }.mr-projectHeader h2 { overflow-wrap: anywhere; margin: 0 0 7px; font-size: clamp(21px,1.5vw,28px); font-weight: 650; line-height: 1.35; letter-spacing: -.025em; }
.mr-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 4px 16px; font-size: 12px; }
.mr-meta > span { display: inline-flex; min-width: 0; max-width: 100%; align-items: center; gap: 5px; }.mr-meta svg { flex: none; }
.mr-path { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; user-select: text; }
.mr-workflowHead { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
.mr-workflowHead h3 { margin: 0; font-size: 15px; font-weight: 600; }
.mr-progress { display: inline-flex; align-items: center; gap: 10px; font-size: 12px; font-variant-numeric: tabular-nums; color: var(--mm-muted); }
.mr-progressTrack { display: flex; gap: 2px; width: clamp(40px,6vw,96px); height: 4px; overflow: hidden; border-radius: 3px; }
.mr-progressTrack > i { flex: 1; background: var(--mr-rule); }.mr-progressTrack > i[data-done=true] { background: var(--mr-accent); }
.mr-steps { list-style: none; padding: 0; margin: 0; border-block-start: 1px solid var(--mr-rule); }
.mr-steps > li { border-block-end: 1px solid var(--mr-rule); }
.mr-steps details[open] { border-radius: 8px; background: color-mix(in srgb, var(--mm-ink) 2.5%, var(--mr-paper)); }
.mr-steps summary { list-style: none; display: flex; align-items: center; gap: 12px; padding: 13px 10px; cursor: pointer; border-radius: 7px; min-height: 50px; }
.mr-steps summary::-webkit-details-marker { display: none; }.mr-steps summary:hover { background: color-mix(in srgb, var(--mm-ink) 3.5%, transparent); }
.mr-steps summary > strong { flex: 1; min-width: 0; overflow-wrap: anywhere; font-size: 14px; font-weight: 560; line-height: 1.55; }
.mr-stepNumber { width: 25px; height: 25px; flex: none; display: grid; place-items: center; border: 1px solid var(--mr-rule); border-radius: 50%; color: var(--mm-muted); font-size: 11px; font-variant-numeric: tabular-nums; }
.mr-steps li[data-current=true] .mr-stepNumber,.mr-steps li[data-status=submitted] .mr-stepNumber { background: var(--mr-tint); color: var(--mr-accent); border-color: color-mix(in srgb, var(--mr-accent) 38%, transparent); }
.mr-steps li[data-current=true] summary > strong { color: var(--mr-accent); }.mr-stepStatus { color: var(--mm-muted); font-size: 12px; white-space: nowrap; }
.mr-stepStatus[data-status=submitted],.mr-stepStatus[data-status=working],.mr-stepStatus[data-status=checking] { color: var(--mr-accent); }
.mr-stepStatus[data-status=blocked],.mr-stepStatus[data-status=needs_revision],.mr-stepStatus[data-status=needs_recheck] { color: var(--dsw-alias-state-warning-primary,var(--mm-ink)); }
.mr-foldIcon { flex: none; color: var(--mm-muted); transition: transform .15s ease; }.mr-steps details[open] > summary .mr-foldIcon { transform: rotate(180deg); }
.mr-stepBody { padding: 0 18px 12px 47px; font-size: 14px; line-height: 1.7; overflow-wrap: anywhere; }
.mr-stepBody > p { margin: 0 0 8px; }.mr-purpose { max-width: 62em; white-space: pre-wrap; }
.mr-stepBody h4,.mr-history h4 { margin: 0 0 4px; font-size: 12px; font-weight: 600; color: var(--mm-muted); }
.mr-output,.mr-expected { margin: 12px 0 0; }.mr-expected p { margin: 0; white-space: pre-wrap; }
.mr-output .mr-time { display: inline-block; font-size: 11px; margin-top: 4px; }
.mr-stepActions { display: flex; align-items: center; gap: 4px; margin-top: 12px; flex-wrap: wrap; }
.mr-live { margin: 0 0 22px; padding: 13px 15px; border: 1px solid var(--mr-rule); border-radius: 9px; background: color-mix(in srgb,var(--mr-chat-surface) 50%,var(--mr-paper)); }
.mr-live > header,.mr-liveHeadline { display: flex; align-items: center; justify-content: space-between; gap: 10px; }.mr-live > header { margin-bottom: 7px; }
.mr-liveLabel { display: inline-flex; align-items: center; gap: 6px; color: var(--mm-muted); font-size: 12px; }.mr-liveState { display: inline-flex; align-items: center; gap: 6px; color: var(--mm-muted); font-size: 11px; }.mr-liveState::before { content: ''; height: 5px; width: 5px; border-radius: 50%; background: currentColor; }
.mr-live[data-phase=running],.mr-live[data-phase=processing] { border-inline-start: 3px solid var(--mr-accent); }.mr-live[data-phase=running] .mr-liveState,.mr-live[data-phase=processing] .mr-liveState { color: var(--mr-accent); }
.mr-liveHeadline strong { font-size: 14px; font-weight: 570; line-height: 1.6; }.mr-liveStep { display: inline-flex; align-items: center; gap: 5px; padding: 2px 0; min-width: 0; border: 0; background: transparent; color: var(--mr-accent); font: inherit; font-size: 12px; text-align: start; }.mr-liveStep:hover { text-decoration: underline; }
.mr-liveTarget { margin: 2px 0 7px; font-size: 12px; line-height: 1.6; color: var(--mm-muted); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.mr-activityList { display: grid; list-style: none; padding: 0; margin: 7px 0 0; gap: 1px; }.mr-activityRow { width: 100%; display: flex; gap: 8px; align-items: flex-start; padding: 6px 3px; border: 0; border-radius: 5px; text-align: start; background: transparent; color: var(--mm-ink); font: inherit; cursor: pointer; }.mr-activityRow:hover,.mr-activityRow[aria-expanded=true] { background: color-mix(in srgb,var(--mm-ink) 4%,transparent); }
.mr-activityMark { display: grid; place-items: center; flex: none; width: 17px; height: 20px; color: var(--mm-muted); }.mr-activityList [data-phase=running] .mr-activityMark,.mr-activityList [data-phase=succeeded] .mr-activityMark { color: var(--mr-accent); }.mr-activityList [data-phase=failed] .mr-activityMark,.mr-activityList [data-phase=needs_revision] .mr-activityMark { color: var(--dsw-alias-state-error-primary,#ae3546); }
.mr-activityText { min-width: 0; flex: 1; display: grid; gap: 1px; font-size: 12px; line-height: 20px; }.mr-activityText small { color: var(--mm-muted); font-size: 11px; line-height: 17px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }.mr-activityMeta { display: grid; flex: none; justify-items: end; gap: 1px; color: var(--mm-muted); font-size: 11px; line-height: 20px; }.mr-activityMeta time { font-size: 10px; line-height: 17px; font-variant-numeric: tabular-nums; }
.mr-stepActivity { margin: 7px 0 10px; border-inline-start: 1px solid var(--mr-rule); padding-inline-start: 8px; }.mr-stepStatus { display: inline-flex; align-items: center; gap: 5px; }.mr-steps li[data-executing=true] .mr-stepNumber { color: var(--mr-accent); border-color: var(--mr-accent); background: var(--mr-tint); }
.mr-callDetail { border-top: 1px solid var(--mr-rule); margin-top: 8px; padding-top: 8px; font-size: 12px; }.mr-callDetail header { display: flex; align-items: center; justify-content: space-between; gap: 8px; }.mr-callDetail header strong { font-weight: 550; }.mr-callDetail dl { display: grid; grid-template-columns: 55px minmax(0,1fr); gap: 3px 8px; margin: 3px 0 8px; }.mr-callDetail dt { color: var(--mm-muted); }.mr-callDetail dd { margin: 0; overflow-wrap: anywhere; }.mr-callDetail h4 { color: var(--mm-muted); font-size: 11px; margin: 9px 0 4px; }.mr-callDetail pre { max-height: 180px; margin: 0; padding: 8px 10px; overflow: auto; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--mr-chat-surface); border-radius: 6px; font: 11px/1.65 var(--dsw-code-font-family,monospace); }
.mr-artifacts { list-style: none; padding: 0; margin: 6px 0; display: grid; gap: 6px; }
.mr-artifacts li,.mr-historyArtifact { min-width: 0; }.mr-fileLink { display: inline-flex; align-items: center; gap: 6px; max-width: 100%; color: var(--mr-accent); background: transparent; border: 0; font: inherit; font-weight: 550; padding: 2px 0; text-align: start; overflow-wrap: anywhere; }.mr-fileLink:hover { text-decoration: underline; }
.mr-artifacts code,.mr-historyArtifact code { display: block; font-size: 11px; color: var(--mm-muted); overflow-wrap: anywhere; user-select: text; }
.mr-deliveryText { margin: 6px 0; padding: 8px 12px; border-inline-start: 2px solid var(--mr-rule); font: inherit; line-height: 1.65; white-space: pre-wrap; overflow-wrap: anywhere; }
.mr-retained { color: var(--mm-muted); font-size: 12px; border-inline-start: 2px solid var(--mr-accent); padding-inline-start: 8px; }
.mr-history { margin-top: 12px; padding: 12px 0 0; border-top: 1px solid var(--mr-rule); }.mr-historyEntry + .mr-historyEntry { margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--mr-rule); }.mr-historyEntry p { margin: 3px 0; white-space: pre-wrap; }.mr-historyArtifact { margin: 4px 0; }
.mr-split { grid-area: split; position: relative; outline-offset: -2px; user-select: none; touch-action: none; cursor: col-resize; }
.mr-split::before,.mr-split::after { content: ''; position: absolute; inset-inline-start: 50%; background: var(--mr-rule); }
.mr-split::before { inset-block: 0; width: 1px; }.mr-split::after { top: calc(50% - 15px); margin-left: -1px; width: 3px; height: 30px; border-radius: 3px; background: var(--mm-muted); opacity: .45; }
.mr-split:is(:hover,:focus-visible)::after,.mr-layout[data-dragging] .mr-split::after { opacity: 1; background: var(--mr-accent); }
.mr-layout[data-dragging],.mr-layout[data-dragging] * { cursor: col-resize !important; user-select: none !important; }
.mr-chat { grid-area: chat; display: flex; flex-direction: column; min-height: 0; min-width: 0; overflow: hidden; background: var(--mr-chat-surface); }
.mr-chatHeader { padding: 8px clamp(14px,1.5vw,24px); min-height: 58px; border-block-end: 1px solid var(--mr-rule); }
.mr-chatIdentity > svg { color: var(--mr-accent); }.mr-chatStatus { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; font-size: 12px; color: var(--mm-muted); }.mr-chatStatus::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }.mr-chatStatus[data-state=ready]::before,.mr-chatStatus[data-state=running]::before { background: var(--mr-accent); }
.mr-chatBody { flex: 1; min-height: 0; min-width: 0; display: flex; flex-direction: column; overflow: hidden; }
.mr-chatContext { flex: none; display: flex; align-items: center; gap: 6px; padding: 5px clamp(14px,1.5vw,24px); font-size: 12px; line-height: 1.5; color: var(--mm-muted); border-block-end: 1px solid var(--mr-rule); overflow-wrap: anywhere; }
.mr-chatContext span { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }.mr-chatContext[data-focused=true] > svg { color: var(--mr-accent); }.mr-steps details[open] { box-shadow: inset 2px 0 var(--mr-accent); }
.mr-decision { flex: none; margin: 8px 14px; padding: 10px 12px; border-inline-start: 3px solid var(--mr-accent); border-radius: 5px; background: var(--mr-tint); font-size: 13px; }
.mr-decision p { margin: 3px 0 8px; }.mr-decision > div { display: flex; flex-wrap: wrap; gap: 7px; }
.mr-chatBody [data-conversation-content] { flex: 1 1 0; min-height: 0; min-width: 0; background: transparent; }
.mr-chatBody [data-conversation-scroll] { min-height: 0; overscroll-behavior: contain; }
.mr-chatBody [data-conversation-content] [data-composer-seat] { margin-block-start: auto; padding-block: 5px 3px; background: var(--mr-chat-surface); }
.mr-chatWelcome { flex: 1 0 auto; min-height: 110px; display: grid; align-content: center; justify-items: center; gap: 10px; padding: 20px 16px; text-align: center; }
.mr-welcomeMark { display: grid; place-items: center; height: 44px; width: 44px; border-radius: 14px; color: var(--mr-accent); background: color-mix(in srgb, var(--mr-accent) 9%, var(--mr-chat-surface)); }
.mr-chatWelcome h3 { margin: 2px 0 0; color: var(--mm-ink); font-size: 19px; font-weight: 590; line-height: 1.5; }
.mr-panel .mr-start { min-width: 0; max-width: 100%; min-height: 32px; padding: 5px 10px; color: var(--mr-accent); border: 1px solid var(--mr-rule); background: transparent; font-size: 12px; }
.mr-start span { white-space: normal; overflow-wrap: anywhere; }.mr-start:hover:enabled { background: var(--mr-tint); border-color: var(--mr-accent); }
.mr-chatNotice,.mr-chatBody > .mc-assistantPending,.mr-empty { flex: 1; min-height: 0; display: grid; align-content: center; justify-items: center; gap: 8px; text-align: center; padding: 18px; color: var(--mm-muted); font-size: 13px; }
.mr-project > .mr-empty { min-height: 66%; }.mr-empty h2 { margin: 0; color: var(--mm-ink); font-size: 18px; }
.mr-dialogBackdrop { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 14px; background: #0006; }
.mr-dialog { width: min(480px,100%); max-height: 100%; overflow: auto; display: grid; gap: 16px; padding: 22px; color: var(--mm-ink); background: var(--mr-paper); border: 1px solid var(--mr-rule); border-radius: 13px; box-shadow: 0 14px 52px #0003; }
.mr-dialog h2 { margin: 0; font-size: 18px; line-height: 1.45; }.mr-dialog > label { display: grid; gap: 6px; font-size: 13px; font-weight: 550; }
.mr-dialog input:not([type=radio]),.mr-dialog select,.mr-dialog textarea,.mr-compactPicker select { width: 100%; min-width: 0; min-height: 36px; background: var(--mm-bg); color: var(--mm-ink); border: 1px solid var(--mr-rule); border-radius: 7px; padding: 7px 10px; font: inherit; font-weight: 400; }
.mr-dialog textarea { field-sizing: content; min-height: 96px; resize: vertical; line-height: 1.65; }.mr-directory,.mr-dialog footer { display: flex; align-items: center; gap: 8px; }.mr-directory input { flex: 1; }.mr-dialog footer { justify-content: flex-end; }
.mr-panel .mr-dialog .mm-primary { background: var(--mr-accent); color: var(--mr-on-accent); border-color: var(--mr-accent); }
.mr-revisionScope { display: grid; gap: 5px; margin: 0; padding: 0; border: 0; min-width: 0; }.mr-revisionScope legend { font-size: 13px; margin-bottom: 6px; font-weight: 550; }.mr-revisionScope label { display: flex; gap: 9px; align-items: flex-start; padding: 8px 10px; border: 1px solid var(--mr-rule); border-radius: 7px; cursor: pointer; }.mr-revisionScope label:has(:checked) { border-color: color-mix(in srgb, var(--mr-accent) 55%, var(--mr-rule)); background: var(--mr-tint); }.mr-revisionScope input { width: 16px; height: 16px; margin: 2px 0 0; flex: none; accent-color: var(--mr-accent); }.mr-revisionScope span { display: grid; gap: 2px; }.mr-revisionScope strong { font-size: 13px; font-weight: 560; }.mr-revisionScope small { font-size: 12px; color: var(--mm-muted); }
@media (prefers-reduced-motion: no-preference) { .mr-stepBody,.mr-dialog { animation: mr-open .14s ease-out; } @keyframes mr-open { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: none; } } }
@media (prefers-reduced-motion: reduce) { .mr-foldIcon,.mr-panel .mr-action,.mr-panel .mr-iconButton,.mr-panel .mr-historyToggle,.mr-panel .mr-start { transition: none; } }
@media (prefers-reduced-motion: reduce) { .mr-live .mm-spin,.mr-stepActivity .mm-spin,.mr-stepStatus .mm-spin { animation: none; } }
@container metis-project (max-width: 1070px) {
  .mr-layout { grid-template: 'rail rail rail' auto 'detail split chat' minmax(0,1fr) / minmax(0,1fr) 8px var(--mr-chat-size,44%); }
  .mr-projectNav { flex-direction: row; align-items: center; gap: 12px; padding: 0 14px; min-height: 50px; border-inline-end: 0; border-block-end: 1px solid var(--mr-rule); }
  .mr-navHead { display: contents; }.mr-navTools { order: 2; margin-inline-start: auto; }.mr-projectList { display: none; }.mr-compactPicker { display: block; min-width: 0; max-width: 320px; flex: 1; }.mr-compactPicker select { font-size: 13px; min-height: 32px; padding-block: 3px; }.mr-projectInner { padding: 18px 15px; }.mr-projectHeader { margin-bottom: 20px; }
}
@container metis-project (max-width: 680px) {
  .mr-shell { overflow-y: auto; }.mr-layout { grid-template: 'rail' auto 'detail' minmax(150px,.9fr) 'chat' minmax(235px,1.1fr) / minmax(0,1fr); }
  .mr-split { display: none; }.mr-chat { border-block-start: 1px solid var(--mr-rule); }.mr-chatHeader { min-height: 44px; padding: 5px 12px; }.mr-chatWelcome { padding: 8px 12px; gap: 5px; min-height: 74px; }.mr-welcomeMark { display: none; }.mr-chatWelcome h3 { font-size: 16px; }.mr-projectNav { gap: 7px; padding-inline: 8px; }.mr-brand > svg { display: none; }
  .mr-steps summary { padding: 9px 5px; min-height: 43px; gap: 8px; }.mr-stepBody { padding-left: 38px; }.mr-dialog { padding: 16px; }.mr-projectInner { padding: 14px 12px; }.mr-projectHeader { margin-bottom: 14px; }.mr-chatBody [data-conversation-content] { --dsh-composer-text-max-height: 15vh; }
}

`;

    const ICON_PATHS = {
      arrow:'M4 12h15m-6-6 6 6-6 6',chevron:'m9 5 7 7-7 7',down:'m6 9 6 6 6-6',
      plus:'M12 5v14M5 12h14',refresh:'M20 7v5h-5M4 17v-5h5M6.3 7a7 7 0 0 1 11.5-1L20 9M4 15l2.2 3A7 7 0 0 0 17.7 17',
      search:'M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm5 12 4.5 4.5',
      folder:'M3 7V5h6l2 2h10v12H3V7Z',check:'m5 12 4 4L19 6',
      records:'M7 4h10v16H7V4Zm-3 3v13h10M10 8h4m-4 4h4m-4 4h3',
      next:'M5 5v14l11-7L5 5Zm14 0v14',spark:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z',
      alert:'M12 8v5m0 3h.01M12 3 2 21h20L12 3Z',close:'m6 6 12 12M18 6 6 18',
      layers:'m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5',
      up:'m6 15 6-6 6 6',copy:'M8 8h12v12H8V8ZM4 16V4h12',trash:'M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7',
      edit:'m16 3 5 5L9 20l-6 1 1-6L16 3Zm-2 2 5 5',grip:'M8 5h.01M16 5h.01M8 12h.01M16 12h.01M8 19h.01M16 19h.01',
      message:'M4 4h16a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 1-2Zm3 5h10m-10 4h6',
      history:'M3 10a9 9 0 1 1 1.6 7M3 4v6h6m3-3v5l3 2',expand:'M13 4h7v7m0-7-9 9M9 5H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-4',
      activity:'M3 12h4l3-8 4 16 3-8h4',clock:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3 2'
    };
    function Icon({name,size=16,className=''}) {
      return h('svg',{className:'mm-icon '+className,width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.6,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true},h('path',{d:ICON_PATHS[name]||ICON_PATHS.layers}));
    }
    function Wordmark({size=20}) {
      return h('svg',{width:size,height:size,viewBox:'0 0 28 28',fill:'none','aria-hidden':true},
        h('path',{d:'M4 22V6l10 9L24 6v16M4 6l10 16L24 6',stroke:'currentColor',strokeWidth:1.8,strokeLinejoin:'round',strokeLinecap:'round'}));
    }

    /* DOMAIN_START: pure projections of real engine data, also checked in isolation. */
    const STAGE_IDS = Array.from({length:10},(_,i)=>'S'+(i+1));
    function taskStatus(task) {
      const value=String(task?.status||'').toUpperCase();
      return ({PENDING:'TODO',PASSED:'COMPLETE'})[value]||value;
    }
    function summarize(tasks) {
      const counts={total:tasks.length,COMPLETE:0,RUNNING:0,READY:0,TODO:0,FAILED:0,BLOCKED:0,NEEDS_REVISION:0,SKIPPED:0};
      tasks.forEach(task=>{const status=taskStatus(task);if(status in counts)counts[status]++;});
      counts.percent=counts.total?Math.round(counts.COMPLETE/counts.total*100):0;
      counts.issues=counts.FAILED+counts.BLOCKED+counts.NEEDS_REVISION;
      return counts;
    }
    function projectTasks(project) {return Array.isArray(project?.tasks?.tasks)?project.tasks.tasks:[];}
    function stageSummaries(tasks) {return STAGE_IDS.map(id=>({id,...summarize(tasks.filter(task=>String(task.stage)===id))}));}
    function normalizedRoot(root) {return String(root||'').replaceAll('\\','/').replace(/\/+$/,'').toLowerCase();}
    function projectForSession(projects,cwd) {
      const path=normalizedRoot(cwd);
      if(!path)return null;
      return projects.filter(p=>p.metis&&p.status).sort((a,b)=>b.root.length-a.root.length).find(p=>path===normalizedRoot(p.root)||path.startsWith(normalizedRoot(p.root)+'/'))||null;
    }
    function nextTask(project) {
      const tasks=projectTasks(project);
      const completed=new Set(tasks.filter(t=>taskStatus(t)==='COMPLETE'||taskStatus(t)==='SKIPPED').map(t=>t.id));
      const candidates=tasks.filter(t=>String(t.stage)===String(project?.status?.stage)&&['RUNNING','READY','TODO'].includes(taskStatus(t))&&(taskStatus(t)==='RUNNING'||(t.dependencies||[]).every(id=>completed.has(id))));
      return candidates.sort((a,b)=>['RUNNING','READY','TODO'].indexOf(taskStatus(a))-['RUNNING','READY','TODO'].indexOf(taskStatus(b)))[0]||null;
    }
    function filterTasks(tasks,filter,query) {
      const q=String(query||'').trim().toLowerCase();
      return tasks.filter(task=>{
        const status=taskStatus(task);
        const match=filter==='all'||(filter==='unfinished'&&!['COMPLETE','SKIPPED'].includes(status))||(filter==='complete'&&status==='COMPLETE')||(filter==='issues'&&['FAILED','BLOCKED','NEEDS_REVISION'].includes(status));
        return match&&(!q||[task.id,task.title,task.section,...(task.expected_outputs||[])].join(' ').toLowerCase().includes(q));
      });
    }
    /* DOMAIN_END */

    function createStore(initial) {
      let state=initial;
      const listeners=new Set();
      return {get:()=>state,set(patch){state={...state,...patch};listeners.forEach(fn=>fn());},subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);}};
    }
    function useStore(store) {return React.useSyncExternalStore(store.subscribe,store.get,store.get);}
    const api=path=>{const url=new URL(path.replace(/^\/+/,''),document.baseURI);return url.pathname+url.search;};
    async function getJson(path) {
      const response=await fetch(api(path),{cache:'no-store'});
      const body=await response.json().catch(()=>null);
      if(!response.ok)throw Object.assign(new Error(body?.error||path+' → '+response.status),{status:response.status});
      if(!body)throw new Error(path+' → 无法读取响应');
      if(body.ok===false)throw new Error(body.error||path);
      return body;
    }
    async function postJson(path,body,signal) {
      const response=await fetch(api(path),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body),signal});
      const result=await response.json().catch(()=>null);
      if(!response.ok)throw Object.assign(new Error(result?.error||path+' → '+response.status),{status:response.status,code:result?.code});
      if(!result)throw new Error(path+' → 无法读取响应');
      if(result.ok===false)throw new Error(result.error||path);
      return result;
    }
    function formatDate(value,timeOnly=false) {
      if(!value)return '—';
      const date=new Date(value);
      if(Number.isNaN(date.getTime()))return '—';
      return timeOnly?date.toLocaleTimeString(document.documentElement.lang||'zh-CN',{hour:'2-digit',minute:'2-digit'}):date.toLocaleDateString(document.documentElement.lang||'zh-CN',{year:'numeric',month:'short',day:'numeric'});
    }
    function Status({task,t}) {
      const status=taskStatus(task);
      const known=['TODO','READY','RUNNING','COMPLETE','FAILED','BLOCKED','NEEDS_REVISION','SKIPPED'];
      return h('span',{className:'mm-taskStatus '+status,title:status},t(known.includes(status)?'status'+status:'statusUnknown'));
    }
    function ErrorNotice({message,t}) {
      if(!message)return null;
      return h('div',{className:'mm-error',role:'alert'},t('readError'),h('details',null,h('summary',null,t('errorDetails')),h('pre',null,String(message))));
    }
    function TaskList({project,stage,t}) {
      const [filter,setFilter]=React.useState('all');
      const [query,setQuery]=React.useState('');
      const [fallback,setFallback]=React.useState(null);
      const [error,setError]=React.useState(null);
      const embedded=projectTasks(project);
      React.useEffect(()=>{
        if(embedded.length)return;
        let alive=true;
        getJson('/metis/api/v1/tasks?root='+encodeURIComponent(project.root)).then(body=>{if(alive)setFallback(body.tasks||[]);}).catch(e=>{if(alive)setError(String(e));});
        return()=>{alive=false;};
      },[project.root,embedded.length]);
      React.useEffect(()=>{setQuery('');setFilter('all');},[stage,project.root]);
      const tasks=(embedded.length?embedded:(fallback||[])).filter(task=>String(task.stage)===stage);
      const counts=summarize(tasks);
      const shown=filterTasks(tasks,filter,query);
      return h('section',{className:'mm-card mm-tasks','aria-label':t('stageTasks')},
        h('div',{className:'mm-taskHeading'},
          h('div',{className:'mm-taskHeadingRow'},h('div',null,h('h2',null,t('stage.'+stage)),h('small',null,t('stageTasks')+' · '+counts.total+' '+t('taskCount'))),h('span',{className:'mm-count'},counts.COMPLETE+' / '+counts.total+' '+t('completed'))),
          h('div',{className:'mm-taskTools'},
            h('div',{className:'mm-filters','aria-label':t('stageTasks')},[['all','all'],['unfinished','unfinished'],['complete','completed'],['issues','issues']].map(([value,label])=>h('button',{type:'button',className:'mm-filter',key:value,'aria-pressed':filter===value,onClick:()=>setFilter(value)},t(label)))),
            h('label',{className:'mm-search'},h(Icon,{name:'search',size:14}),h('input',{type:'search',value:query,placeholder:t('taskSearch'),'aria-label':t('taskSearch'),onChange:e=>setQuery(e.target.value)}))
          )
        ),
        error?h('div',{style:{padding:'0 20px'}},h(ErrorNotice,{message:error,t})):null,
        h('div',{className:'mm-taskList'},shown.length?shown.map(task=>{
          const status=taskStatus(task);
          return h('details',{className:'mm-task',key:project.root+'/'+task.id,'data-task-id':task.id},
            h('summary',null,h('span',{className:'mm-taskStateDot '+status},status==='COMPLETE'?h(Icon,{name:'check',size:11}):null),
              h('div',{className:'mm-taskBody'},h('div',{className:'mm-taskTitle'},String(task.title||task.id)),h('div',{className:'mm-taskMeta'},h('span',{className:'mm-taskId'},task.id),task.section?h('span',null,task.section):null)),
              h(Status,{task,t}),h(Icon,{name:'chevron',size:12,className:'mm-taskArrow'})),
            h('div',{className:'mm-taskExpanded'},h('strong',null,t('outputs')),
              task.expected_outputs?.length?h('ul',null,task.expected_outputs.map(output=>h('li',{key:output},h('code',null,String(output))))):h('p',null,t('noOutputs')),
              h('strong',null,t('dependencies')),h('p',null,task.dependencies?.length?task.dependencies.join(' · '):t('noDependencies')))
          );
        }):h('div',{className:'mm-taskEmpty'},embedded.length||fallback?t('emptyFilter'):t('stageReading'),(query||filter!=='all')?h('button',{type:'button',className:'mm-textButton',onClick:()=>{setQuery('');setFilter('all');}},t('clearFilter')):null)),
        h('div',{className:'mm-taskFooter'},h('span',null,shown.length+' / '+counts.total+' '+t('taskCount')),h('span',null,t('currentProgress')+' '+counts.percent+'%'))
      );
    }
    function Roadmap({project,selected,onSelect,t}) {
      const current=String(project.status?.stage||'S1');
      return h('section',{className:'mm-card mm-roadmap'},
        h('div',{className:'mm-sectionHead'},h('h2',null,t('route')),h('span',null,t('routeHint'))),
        h('nav',{className:'mm-stages','aria-label':t('route')},stageSummaries(projectTasks(project)).map((stage,index)=>{
          const done=stage.total>0&&stage.COMPLETE===stage.total;
          const isCurrent=stage.id===current;
          return h('button',{type:'button',className:'mm-stage'+(isCurrent?' is-current':'')+(done?' is-done':'')+(stage.issues?' is-error':''),key:stage.id,'data-stage':stage.id,'aria-pressed':selected===stage.id,'aria-current':isCurrent?'step':undefined,title:stage.id+' · '+t('stage.'+stage.id)+' · '+stage.COMPLETE+'/'+stage.total,onClick:()=>onSelect(stage.id)},
            h('span',{className:'mm-stageNumber'},done?h(Icon,{name:'check',size:14}):String(index+1).padStart(2,'0')),
            h('span',{className:'mm-stageLabel'},t('stage.'+stage.id)),
            h('span',{className:'mm-stageMeta'},isCurrent?t('stageCurrent'):done?t('stageComplete'):stage.total?stage.COMPLETE+'/'+stage.total:t('stageNoTasks')));
        }))
      );
    }
    function Locations({roots,projects,actions,t}) {
      return h('details',{className:'mm-locations'},h('summary',null,h(Icon,{name:'folder',size:15}),t('positions'),h('span',{className:'mm-count'},roots.length),h(Icon,{name:'down',size:14,className:'mm-locationChevron'})),
        h('div',{className:'mm-locationsPanel'},h('p',null,t('positionHint')),
          roots.length?roots.map(root=>h('div',{className:'mm-rootRow',key:root},h('code',null,root),h('span',{className:'mm-rootLabel'},projects.some(p=>p.metis&&normalizedRoot(p.root)===normalizedRoot(root))?t('recognized'):t('noProject')),h('button',{type:'button',className:'mm-textButton','aria-label':t('removeRoot')+' '+root,onClick:()=>actions.removeRoot(root)},t('removeRoot')))):h('p',null,t('rootsEmpty')),
          h('button',{type:'button',className:'mm-button',onClick:actions.addRoot},h(Icon,{name:'plus',size:14}),t('addRoot'))));
    }

    const ResearchSurface=React.createContext(null);
    const projectInputs=new WeakMap();
    function attachProjectInput(conversation,binding,viewRef){
      // The native editor creates a distinct signal synchronously on Send,
      // before slash adjudication, reference expansion, uploads or queueing.
      // Decorate only this retained session's ordinary sink. All native commands,
      // attachment serialization, draft recovery and transport stay with DSH.
      const shell=conversation?.input?.for(binding.ctx);
      const attemptMethod=typeof shell?.core?.beginAttempt==='function'?'beginAttempt':'mintAttempt';
      if(typeof shell?.core?.[attemptMethod]!=='function'||!shell?.deps?.defaultSink||!conversation?.sendSession)throw new Error('当前 DSH 尚不支持项目内的步骤消息绑定');
      let bridge=projectInputs.get(shell);
      if(!bridge){
        const attempts=new WeakMap(),mint=shell.core[attemptMethod],sink=shell.deps.defaultSink;
        const ownMint=Object.getOwnPropertyDescriptor(shell.core,attemptMethod);
        bridge={view:null};projectInputs.set(shell,bridge);
        const capture=()=>{
          const view=bridge.view?.current;
          if(!view||view.sessionId!==binding.sessionId)return null;
          const origin=document.activeElement?.closest('[data-conversation-content]');
          if(origin&&!view.chat?.contains(origin))return null;
          return {id:view.id,sessionId:view.sessionId,versionId:view.versionId,stepId:view.stepId};
        };
        function focusedAttempt(...args){const flight=mint.apply(this,args),attempt=flight.attempt||flight;attempts.set(attempt.signal,capture());return flight;}
        function focusedSink(text,attachments,mode,signal,accept){
          // An attachment-only send calls this sink directly in the native submit gesture.
          const focus=attempts.has(signal)?attempts.get(signal):capture();attempts.delete(signal);
          if(!focus)return sink.call(this,text,attachments,mode,signal,accept);
          const session=binding.session;let submission;
          return conversation.sendSession({
            sessionId:binding.sessionId,
            beginSubmission(input){submission=session.beginSubmission(input);return submission;},
            async prompt(content,deliveryMode,abort,requestId){
              try{await postJson('/metis/api/v1/research-project/message-step',{...focus,requestId},abort);}
              catch(error){submission?.abandon();throw error;}
              return session.prompt(content,deliveryMode,abort,requestId);
            }
          },text,attachments,mode,signal,accept);
        }
        shell.core[attemptMethod]=focusedAttempt;shell.deps.defaultSink=focusedSink;
        binding.ctx.effect(()=>()=>{
          if(shell.core[attemptMethod]===focusedAttempt){if(ownMint)Object.defineProperty(shell.core,attemptMethod,ownMint);else delete shell.core[attemptMethod];}
          if(shell.deps.defaultSink===focusedSink)shell.deps.defaultSink=sink;
          projectInputs.delete(shell);
        },'metis: release project input context');
      }
      bridge.view=viewRef;
      return ()=>{if(bridge.view===viewRef)bridge.view=null;};
    }
    function ResearchViews({sessionId,useSession,useInput,inputActions,renderSlot}){
      const surface=React.useContext(ResearchSurface),session=useSession(value=>value),bound=surface?.sessionId===sessionId,ready=bound&&session?.openState==='open';
      const hasDraft=useInput(input=>Boolean(input?.draft?.length||input?.attachmentIds?.length||input?.command));
      React.useEffect(()=>{surface?.onState({sessionId,ready,running:!!session?.running,hasDraft});return()=>surface?.onState({sessionId,ready:false,running:false,hasDraft:false});},[sessionId,ready,session?.running,hasDraft,surface?.onState]);
      React.useEffect(()=>{surface?.bindDocumentInput?.(sessionId,ready?inputActions:null);return()=>surface?.bindDocumentInput?.(sessionId,null);},[sessionId,ready,inputActions,surface?.bindDocumentInput]);
      if(!bound)return h('div',{className:'mr-chatNotice',role:'alert'},'研究会话绑定不一致，请重新进入项目。');
      if(!ready)return h('div',{className:'mr-chatNotice',role:'status'},'正在连接项目研究对话…');
      const empty=session.blank&&!session.running&&!session.promptAttempted;
      function startDraft(){
        if(hasDraft||!surface.currentStep)return;
        const insertion=inputActions.captureInsertion();
        if(inputActions.insertText('请从「'+surface.currentStep+'」开始，按这一步的要求推进研究。',insertion))surface.focusInput();
      }
      return h(React.Fragment,null,
        empty?h('section',{className:'mr-chatWelcome','aria-label':'开始项目对话'},
          h('div',{className:'mr-welcomeMark','aria-hidden':true},h(Wordmark,{size:25})),
          h('h3',null,'开始这项研究'),
          surface.currentStep?h('button',{type:'button',className:'mr-start',onClick:startDraft,disabled:hasDraft,title:hasDraft?'输入框中已有草稿':'把当前步骤带入输入框'},h(Icon,{name:'arrow',size:14}),h('span',null,'从「'+surface.currentStep+'」开始')):null):null,
        h('div',{style:{display:empty?'none':'contents'}},renderSlot('conversation.session',{})));
    }
    function ProjectChatDivider(){
      const handle=React.useRef(null),drag=React.useRef(null),preference=React.useRef(null);
      const key='metis.projects.chat-fraction.v1';
      function geometry(){
        const divider=handle.current,layout=divider?.parentElement;
        if(!layout||!divider.offsetWidth)return null;
        const nav=layout.querySelector('.mr-projectNav');
        const rail=nav.offsetWidth>=layout.clientWidth-2?0:nav.offsetWidth;
        const available=layout.clientWidth-rail-divider.offsetWidth;
        const min=Math.min(320,available*.48),max=available-Math.min(320,available*.46);
        return {layout,available,min,max};
      }
      function size(to){
        const g=geometry();if(!g)return;
        const preferred=g.available*(preference.current??.425);
        const value=Math.round(Math.min(g.max,Math.max(g.min,to??(preference.current==null?Math.min(preferred,820):preferred))));
        g.layout.style.setProperty('--mr-chat-size',value+'px');
        const node=handle.current;
        node.setAttribute('aria-valuemin',String(Math.round(g.min)));node.setAttribute('aria-valuemax',String(Math.round(g.max)));node.setAttribute('aria-valuenow',String(value));node.setAttribute('aria-valuetext',value+' 像素');
        return value;
      }
      function remember(width){
        const g=geometry();if(!g)return;
        preference.current=width==null?null:width/g.available;
        try{if(preference.current==null)localStorage.removeItem(key);else localStorage.setItem(key,String(preference.current));}catch{}
      }
      React.useLayoutEffect(()=>{
        try{const value=Number(localStorage.getItem(key));if(value>0&&value<1)preference.current=value;}catch{}
        const layout=handle.current.parentElement;size();
        const observer=new ResizeObserver(()=>{if(!drag.current)size();});observer.observe(layout);
        return ()=>{observer.disconnect();delete layout.dataset.dragging;};
      },[]);
      function down(event){
        if(event.button!==0||drag.current)return;
        const g=geometry();if(!g)return;
        event.preventDefault();handle.current.focus({preventScroll:true});
        drag.current={id:event.pointerId,start:event.clientX,width:g.layout.querySelector('.mr-chat').getBoundingClientRect().width};
        g.layout.dataset.dragging='true';handle.current.setPointerCapture(event.pointerId);
      }
      function finish(event,cancel){
        const start=drag.current;if(!start||event.pointerId!==start.id)return;drag.current=null;
        delete handle.current.parentElement.dataset.dragging;
        if(cancel)size();else remember(Number(handle.current.getAttribute('aria-valuenow')));
        if(handle.current.hasPointerCapture(event.pointerId))handle.current.releasePointerCapture(event.pointerId);
      }
      function keyboard(event){
        const g=geometry();if(!g)return;
        const width=Number(handle.current.getAttribute('aria-valuenow')),delta=event.shiftKey?64:16;
        const values={ArrowLeft:width+delta,ArrowRight:width-delta,Home:g.min,End:g.max};
        if(!Object.hasOwn(values,event.key))return;event.preventDefault();remember(size(values[event.key]));
      }
      return h('div',{ref:handle,className:'mr-split',role:'separator',tabIndex:0,'aria-orientation':'vertical','aria-label':'调整研究助手宽度','aria-controls':'metis-project-chat','aria-valuenow':420,title:'拖动调整对话宽度，双击恢复默认',
        onKeyDown:keyboard,onPointerDown:down,onPointerMove:event=>{const start=drag.current;if(start?.id===event.pointerId)size(start.width+start.start-event.clientX);},
        onPointerUp:event=>finish(event,false),onPointerCancel:event=>finish(event,true),onLostPointerCapture:event=>finish(event,true),onDoubleClick:()=>{remember(null);size();}});
    }
    function buildProjectPanel(store,t,actions,services,NativeConversation) {
      const runLabels={not_started:'未开始',working:'进行中',checking:'核验中',needs_revision:'待改进',needs_recheck:'待复核',blocked:'等待处理',passed:'已达标，待交付',submitted:'已交付'};
      const documentEditors=new Map();
      const sceneEditors=new Map();
      function SceneSurface({revision,children,...props}){
        const [component,setComponent]=React.useState(null),[failed,setFailed]=React.useState(false);
        React.useEffect(()=>{let active=true;void(async()=>{try{let Scene=sceneEditors.get(revision);if(!Scene){const module=await import(api('/metis/api/v1/research-project/display-client')+'?v='+encodeURIComponent(revision));Scene=module.createResearchScene(React,{Icon});sceneEditors.set(revision,Scene);}if(active)setComponent(()=>Scene);}catch{if(active)setFailed(true);}})();return()=>{active=false;};},[revision]);
        return component?h(component,props,children):h(React.Fragment,null,failed?h('p',{className:'mr-note',role:'status'},'研究现场暂未加载，步骤与实际执行记录仍可查看。'):null,children);
      }
      function DocumentSurface(props){
        const [component,setComponent]=React.useState(null),[failure,setFailure]=React.useState(null);
        React.useEffect(()=>{let active=true;const revision=props.file.clientRevision;void(async()=>{try{let Editor=documentEditors.get(revision);if(!Editor){const module=await import(api('/metis/api/v1/research-project/document-client')+'?v='+encodeURIComponent(revision));Editor=module.createDocumentEditor(React,{api,Icon});documentEditors.set(revision,Editor);}if(active)setComponent(()=>Editor);}catch(error){if(active)setFailure(error.message);}})();return()=>{active=false;};},[props.file.clientRevision]);
        return component?h(component,props):h('div',{className:'mr-empty'},h('p',{role:failure?'alert':'status'},failure||'正在打开文档…'),h('button',{type:'button',className:'mr-action',onClick:props.onClose},'返回步骤'));
      }
      return function ProjectPanel({nativeKit,navigation,onOpenSkills,registerNavigationGuard,onSurfaceReady,circuitKit}){
        const modeState=useStore(store);
        React.useLayoutEffect(()=>onSurfaceReady?.(),[onSurfaceReady]);
        const [collection,setCollection]=React.useState({projects:[],modes:[]}),[selected,setSelected]=React.useState(null),[loadedProject,setProject]=React.useState(null),[loading,setLoading]=React.useState(true),[error,setError]=React.useState(null),[actionError,setActionError]=React.useState(null),[dialog,setDialog]=React.useState(null),[busy,setBusy]=React.useState(false),[dialogError,setDialogError]=React.useState(null),[retry,setRetry]=React.useState(0);
        const project=loadedProject?.id===selected?loadedProject:null;
        const [inspection,setInspection]=React.useState(null),[historyKey,setHistoryKey]=React.useState(null),[activityDetail,setActivityDetail]=React.useState(null);
        const [documentFile,setDocumentFile]=React.useState(null),documentDirty=React.useRef(false),documentInput=React.useRef(null),documentOpener=React.useRef(null);
        const [projectTab,setProjectTab]=React.useState('live'),[projectListOpen,setProjectListOpen]=React.useState(false);
        const markDocumentDirty=React.useCallback(value=>{documentDirty.current=value;if(!value)setActionError(current=>current==='文档还有未保存修改，请先保存或返回步骤。'?null:current);},[]);
        React.useLayoutEffect(()=>registerNavigationGuard?.(()=>{if(documentDirty.current){setActionError('文档还有未保存修改，请先保存或返回步骤。');return false;}return true;}),[registerNavigationGuard]);
        const bindDocumentInput=React.useCallback((sessionId,input)=>{if(input)documentInput.current={sessionId,input};else if(documentInput.current?.sessionId===sessionId)documentInput.current=null;},[]);
        const dialogRef=React.useRef(null),chatRef=React.useRef(null),revisionRef=React.useRef(null),sessionRef=React.useRef(null),stepContextRef=React.useRef(null);
        const opener=React.useRef(null),historyRequest=React.useRef(0),decisionInFlight=React.useRef(null);
        const [chatState,setChatState]=React.useState(null),[revisionForm,setRevisionForm]=React.useState(null),[revisionError,setRevisionError]=React.useState(null),[histories,setHistories]=React.useState({});
        sessionRef.current=project?.sessionId;
        const observeResearchState=React.useCallback(next=>{if(next.sessionId!==sessionRef.current)return;setChatState(before=>before?.sessionId===next.sessionId&&before.ready===next.ready&&before.running===next.running&&before.hasDraft===next.hasDraft?before:next);},[]);
        const researchRunning=chatState?.sessionId===project?.sessionId&&chatState?.running;
        const revisionReady=collection.projectApiRevision>=2&&collection.capabilities?.stepRevisions===true,historyReady=collection.projectApiRevision>=2&&collection.capabilities?.deliveryHistory===true;
        const focusReady=collection.projectApiRevision>=3&&collection.capabilities?.focusedMessages===true;
        React.useEffect(()=>{if(revisionForm)revisionRef.current?.querySelector('textarea')?.focus();},[revisionForm?.stepId,revisionForm?.projectId]);
        React.useEffect(()=>{
          let active=true,timer;const read=async()=>{try{const result=await getJson('/metis/api/v1/research-projects');if(active){setCollection(result);setSelected(previous=>result.projects.some(item=>item.id===previous)?previous:result.projects[0]?.id||null);setError(null);}}catch(cause){if(active)setError(String(cause.message||cause));}finally{if(active){setLoading(false);timer=setTimeout(read,10000);}}};void read();return()=>{active=false;clearTimeout(timer);};
        },[retry]);
        React.useEffect(()=>{
          let active=true,timer;if(!selected)return;
          const read=async()=>{try{const result=await getJson('/metis/api/v1/research-project?id='+encodeURIComponent(selected));if(active){setProject(result.project);setError(null);}}catch(cause){if(active){setProject(null);setError(String(cause.message||cause));}}finally{if(active)timer=setTimeout(read,800);}};void read();return()=>{active=false;clearTimeout(timer);};
        },[selected,retry]);
        React.useEffect(()=>{if(dialog)dialogRef.current?.querySelector('input')?.focus();},[dialog?.requestId]);
        function focusInput(){chatRef.current?.querySelector('[data-composer-seat] [contenteditable=true], [data-composer-seat] textarea')?.focus({preventScroll:true});}
        function cancelDialog(){setRevisionForm(null);setDialog(null);requestAnimationFrame(()=>opener.current?.focus({preventScroll:true}));}
        function dialogKey(event){
          if(event.key==='Escape'&&!busy){event.preventDefault();cancelDialog();return;}
          if(event.key!=='Tab')return;
          const controls=[...event.currentTarget.querySelectorAll('button:enabled,input:enabled:not([type=radio]),input[type=radio]:checked:enabled,select:enabled,textarea:enabled')];
          if(!controls.length){event.preventDefault();return;}
          const first=controls[0],last=controls.at(-1);
          if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
          else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
        }
        function openCreate(event){if(documentDirty.current){setActionError('文档还有未保存修改，请先保存或返回步骤。');return;}opener.current=event.currentTarget;setDialogError(null);setDialog({name:'',root:'',modeId:'',modes:collection.modes,requestId:crypto.randomUUID()});}
        function selectProject(id){if(id!==selected){if(documentDirty.current){setActionError('文档还有未保存修改，请先保存或返回步骤。');return;}historyRequest.current++;setDocumentFile(null);setHistoryKey(null);setInspection(null);setActionError(null);setSelected(id);}}
        function switchProjectTab(value){if(documentDirty.current){setActionError('文档还有未保存修改，请先保存或返回步骤。');return;}setProjectTab(value);setActionError(null);}
        async function pickDirectory(){try{if(typeof services.uiWorkspace?.pickDirectory!=='function')throw new Error('DSH目录选择尚未就绪，也可直接填写目录路径');const root=await services.uiWorkspace.pickDirectory();if(root)setDialog(current=>current?{...current,root,name:current.name||root.split(/[\\/]/).filter(Boolean).at(-1)}:current);}catch(cause){setDialogError(cause.message);}}
        async function create(event){
          event.preventDefault();if(busy)return;const mode=dialog.modes.find(item=>item.id===dialog.modeId);if(!mode){setDialogError('请选择已保存的模式');return;}setBusy(true);setDialogError(null);
          try{const result=await postJson('/metis/api/v1/research-projects',{name:dialog.name,root:dialog.root,modeId:mode.id,expectedVersionId:mode.versionId,requestId:dialog.requestId});if(result.project.status!=='ready')throw new Error(result.project.error||'项目会话尚未创建完成');setDialog(null);setCollection(current=>({...current,projects:[result.project,...current.projects.filter(item=>item.id!==result.project.id)]}));setSelected(result.project.id);setProject(result.project);setRetry(value=>value+1);}
          catch(cause){setDialogError(cause.message);try{const latest=await getJson('/metis/api/v1/research-projects');setCollection(latest);setDialog(current=>current?{...current,modes:latest.modes}:current);}catch{}}
          finally{setBusy(false);}
        }
        async function continueProject(){if(!project||busy)return;setBusy(true);setActionError(null);try{const result=await postJson('/metis/api/v1/research-project/continue',{id:project.id});if(typeof services.uiWorkspace?.openSession!=='function')throw new Error('DSH会话导航尚未就绪，原研究会话已保留，请稍后重试');await services.uiWorkspace.openSession(result.project.sessionId);}catch(cause){setActionError(cause.message);}finally{setBusy(false);}}
        async function controlProject(action){if(!project||busy)return;setBusy(true);setActionError(null);try{const result=await postJson('/metis/api/v1/research-project/control',{id:project.id,versionId:project.versionId,action,requestId:crypto.randomUUID()});setProject(current=>current?.id===result.project.id?result.project:current);}catch(cause){setActionError(cause.message);}finally{setBusy(false);}}
        async function download(step,index,item){setActionError(null);try{const response=await fetch(api('/metis/api/v1/research-project/artifact?id='+encodeURIComponent(project.id)+'&stepId='+encodeURIComponent(step.id)+'&index='+index));if(!response.ok){const value=await response.json();throw new Error(value.error||'交付物暂时无法下载');}const url=URL.createObjectURL(await response.blob()),link=document.createElement('a');link.href=url;link.download=item.name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(cause){setActionError(cause.message);}}
        function openDocument(step,index,item,trigger){documentOpener.current=trigger;setInspection({projectId:project.id,stepId:step.id});setDocumentFile({projectId:project.id,stepId:step.id,index,name:item.name,clientRevision:collection.documentClientRevision});}
        function closeDocument(){documentDirty.current=false;setDocumentFile(null);requestAnimationFrame(()=>documentOpener.current?.focus({preventScroll:true}));}
        function documentFeedback(text){const input=documentInput.current;if(input?.sessionId!==project?.sessionId){setActionError('研究对话尚未就绪，请稍后重试。');return;}const insertion=input.input.captureInsertion();if(input.input.insertText(text,insertion))focusInput();else setActionError('修改要求未插入，请在原研究对话中重试。');}
        async function documentSaved(){try{const result=await getJson('/metis/api/v1/research-project?id='+encodeURIComponent(project.id));setProject(current=>current?.id===result.project.id?result.project:current);}catch(error){setActionError(error.message);}}
        function inspectFromScene(stepId){
          if(stepId===null){setInspection({projectId:project.id,stepId:null});return;}
          if(!project?.steps.some(step=>step.id===stepId))return;
          setInspection({projectId:project.id,stepId});
        }
        function detailsFromScene(stepId){
          inspectFromScene(stepId);
          requestAnimationFrame(()=>{const main=chatRef.current?.parentElement?.querySelector('.mr-project');const node=Array.from(main?.querySelectorAll('[data-project-step]')||[]).find(item=>item.dataset.projectStep===stepId);node?.scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
        }
        function openRevision(step,index,trigger){opener.current=trigger;setRevisionError(null);setRevisionForm({projectId:project.id,stepId:step.id,title:step.title,index,feedback:'',downstream:'keep',requestId:crypto.randomUUID()});}
        async function submitRevision(event){
          event.preventDefault();if(busy)return;const request={id:revisionForm.projectId,stepId:revisionForm.stepId,feedback:revisionForm.feedback,downstream:revisionForm.downstream,requestId:revisionForm.requestId};setBusy(true);setRevisionError(null);setActionError(null);
          try{const result=await postJson('/metis/api/v1/research-project/revise',request);setProject(current=>current?.id===request.id?result.project:current);historyRequest.current++;setHistoryKey(null);setRevisionForm(null);requestAnimationFrame(focusInput);}catch(cause){setRevisionError(cause.message);}finally{setBusy(false);}
        }
        async function showHistory(step,offset=0){
          const id=project.id,key=id+'|'+step.id,request=++historyRequest.current;
          if(!offset&&historyKey===key){setHistoryKey(null);return;}
          setHistoryKey(key);if(!offset)setHistories(current=>({...current,[key]:null}));
          try{const result=await getJson('/metis/api/v1/research-project/revisions?id='+encodeURIComponent(id)+'&stepId='+encodeURIComponent(step.id)+'&offset='+offset);
            if(request===historyRequest.current)setHistories(current=>({...current,[key]:offset?{...result,items:[...(current[key]?.items||[]),...result.items]}:result}));
          }catch(cause){if(request===historyRequest.current){setActionError(cause.message);setHistoryKey(null);}}
        }
        async function historyDownload(revision,step,index,item){setActionError(null);try{const response=await fetch(api('/metis/api/v1/research-project/revision-artifact?id='+encodeURIComponent(revision.projectId)+'&revisionId='+encodeURIComponent(revision.id)+'&stepId='+encodeURIComponent(step.id)+'&index='+index));if(!response.ok){const body=await response.json();throw new Error(body.error||'历史交付物无法下载');}const url=URL.createObjectURL(await response.blob()),link=document.createElement('a');link.href=url;link.download=item.name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(cause){setActionError(cause.message);}}
        function stepHistory(step){
          const key=project.id+'|'+step.id;
          if(historyKey!==key)return null;
          const result=histories[key];
          return h('section',{id:'mr-history-'+step.id,className:'mr-history','aria-label':step.title+'的返修历史','aria-busy':!result},
            h('h4',null,'历史交付'),
            !result?h('p',{className:'mr-note',role:'status'},'正在读取…'):null,
            result&&!result.items.length?h('p',{className:'mr-note'},'暂无返修记录'):null,
            result?.items.map(revision=>h('article',{className:'mr-historyEntry',key:revision.id,'data-revision-id':revision.id},
              h('p',{className:'mr-note'},formatDate(revision.createdAt)+' · '+(revision.downstream==='redo'?'本步及后续重做':'修改本步')),
              h('p',null,revision.feedback),
              revision.steps.map(previous=>h('div',{key:previous.id},previous.delivery?h(React.Fragment,null,
                previous.delivery.artifacts.map((item,index)=>h('div',{className:'mr-historyArtifact',key:index},
                  item.kind==='file'?h('button',{type:'button',className:'mr-fileLink',onClick:()=>historyDownload(revision,previous,index,item)},h(Icon,{name:'records',size:14}),item.name):h('span',null,item.name+' · '+(item.note||'无法下载')),
                  item.kind==='file'&&item.matchesSubmitted===false?h('small',null,'返修前文件已不同于上次提交版本'):null,
                  item.archiveDirectory?h('code',null,item.archiveDirectory):null)),
                previous.delivery.text?h('pre',{className:'mr-deliveryText'},previous.delivery.text):null):h('p',{className:'mr-note'},'此次返修前尚无交付'))))),
            result?.nextOffset!=null?h('button',{type:'button',className:'mr-fileLink',onClick:()=>showHistory(step,result.nextOffset)},'查看更多历史'):null);
        }
        const ready=project?.status==='ready';
        const complete=ready&&project.total>0&&project.submitted===project.total;
        const activities=project?.activity||[];
        const runningActivities=activities.filter(item=>item.status==='running');
        const liveItem=runningActivities.at(-1);
        const activityStepId=liveItem?.stepId||project?.currentStepId;
        const executingStep=project?.steps.find(step=>step.id===activityStepId);
        const phaseLabels={running:'执行中',succeeded:'完成',failed:'失败',refused:'未执行',cancelled:'已停止',interrupted:'已中断',waiting:'后台处理中',unverified:'待确认',needs_revision:'需改进',deferred:'后台任务未结束'};
        function eventDuration(item){
          if(!item.startedAt||item.status==='unverified')return '';
          const started=Date.parse(item.startedAt),finished=['running','waiting'].includes(item.status)?Date.now():Date.parse(item.finishedAt||item.startedAt);
          if(!Number.isFinite(started)||!Number.isFinite(finished)||item.status==='interrupted')return '';
          const seconds=Math.max(0,Math.floor((finished-started)/1000));
          return seconds<60?seconds+'秒':Math.floor(seconds/60)+'分'+seconds%60+'秒';
        }
        function eventTime(value){return new Date(value).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',second:'2-digit'});}
        function showActivity(item,location){setActivityDetail(previous=>previous?.projectId===project.id&&previous.callId===item.callId&&previous.location===location?null:{projectId:project.id,callId:item.callId,location});}
        function activityList(items,location='overview'){
          return h('ol',{className:'mr-activityList'},items.map(item=>h('li',{key:item.callId,'data-activity-call':item.callId,'data-phase':item.status},
            h('button',{type:'button',className:'mr-activityRow','aria-expanded':activityDetail?.projectId===project.id&&activityDetail.callId===item.callId&&activityDetail.location===location,onClick:()=>showActivity(item,location)},
              h('span',{className:'mr-activityMark','aria-hidden':true},h(Icon,{name:item.status==='running'?'refresh':item.status==='succeeded'?'check':['failed','refused','needs_revision'].includes(item.status)?'alert':['waiting','unverified'].includes(item.status)?'clock':'close',size:13,className:item.status==='running'?'mm-spin':''})),
              h('span',{className:'mr-activityText'},h('span',null,item.label),item.target?h('small',{title:item.target},item.target):null),
              h('span',{className:'mr-activityMeta'},h('span',null,phaseLabels[item.status]||'状态未知'),h('time',{dateTime:item.startedAt||item.finishedAt,title:eventTime(item.startedAt||item.finishedAt)},eventDuration(item)))))));
        }
        function callDetail(location='overview'){
          if(activityDetail?.projectId!==project?.id||activityDetail.location!==location)return null;
          const item=activities.find(event=>event.callId===activityDetail.callId);if(!item)return null;
          return h('section',{className:'mr-callDetail','aria-label':'实际调用详情'},
            h('header',null,h('strong',null,item.label),h('button',{type:'button',className:'mr-iconButton','aria-label':'收起调用详情',onClick:()=>setActivityDetail(null)},h(Icon,{name:'close',size:14}))),
            h('dl',null,h('dt',null,'工具'),h('dd',null,item.tool),
              item.target?h(React.Fragment,null,h('dt',null,'对象'),h('dd',null,item.target)):null,
              h('dt',null,'状态'),h('dd',null,phaseLabels[item.status]||'状态未知'),item.startedAt?h(React.Fragment,null,h('dt',null,'开始'),h('dd',null,eventTime(item.startedAt))):null,
              item.finishedAt?h(React.Fragment,null,h('dt',null,'结束'),h('dd',null,eventTime(item.finishedAt))):null,
              typeof item.exitCode==='number'?h(React.Fragment,null,h('dt',null,'退出码'),h('dd',null,String(item.exitCode))):null),
            item.error?h('p',{className:'mr-error'},item.error):null,
            item.feedback?.length?h('p',{className:'mr-note'},item.feedback.join('；')):null,
            item.resultPreview?h(React.Fragment,null,h('h4',null,item.resultTruncated?'工具返回（节选）':'工具返回'),h('pre',{tabIndex:0},item.resultPreview)):null);
        }
        function liveOverview(){
          if(!ready||collection.projectApiRevision<4||!collection.capabilities?.liveActivity)return null;
          const recent=activities.at(-1);
          const modelRunning=project.execution?.running;
          const revisionWaiting=project.revision?.phase==='awaiting_downstream';
          const pendingJob=activities.findLast(item=>['waiting','unverified'].includes(item.status));
          const waitingJob=!!pendingJob;
          const blocked=!modelRunning&&!liveItem&&(['failed','refused','needs_revision'].includes(recent?.status)||['blocked','needs_revision'].includes(project.runStatus));
          const phase=liveItem?'running':revisionWaiting?'waiting':modelRunning?'processing':waitingJob?'waiting':blocked?'failed':'idle';
          const label=liveItem?.label|| (revisionWaiting?'等待您选择后续步骤':modelRunning?'AI 正在处理研究':pendingJob?.status==='unverified'?'上次后台任务状态待确认':waitingJob?'等待后台任务结果':blocked?'本步需要处理':recent?.status==='interrupted'?'上次执行已中断':recent?.status==='cancelled'?'本轮已停止':'最近执行');
          if(!activities.length&&!modelRunning)return null;
          return h('section',{className:'mr-live','data-phase':phase,'aria-label':'研究执行动态'},
            h('header',null,h('span',{className:'mr-liveLabel'},h(Icon,{name:'activity',size:15}),'执行动态'),h('span',{className:'mr-liveState',role:'status'},phase==='running'||phase==='processing'?'正在执行':phase==='waiting'?'等待中':phase==='failed'?'需处理':complete?'已交付':'等待继续')),
            h('div',{className:'mr-liveHeadline'},h('strong',null,label),executingStep?h('button',{type:'button',className:'mr-liveStep',onClick:()=>setInspection({projectId:project.id,stepId:executingStep.id})},executingStep.title,h(Icon,{name:'arrow',size:12})):null),
            liveItem?.target?h('p',{className:'mr-liveTarget',title:liveItem.target},liveItem.target):null,
            activityList(activities.slice(-3).reverse()),callDetail());
        }
        const inspected=inspection&&inspection.projectId===project?.id?inspection.stepId:project?.currentStepId;
        const viewedIndex=ready?project.steps.findIndex(step=>step.id===inspected):-1;
        const viewed=viewedIndex>=0?project.steps[viewedIndex]:null;
        React.useLayoutEffect(()=>{
          stepContextRef.current=ready&&focusReady?{id:project.id,sessionId:project.sessionId,versionId:project.versionId,stepId:viewed?.id??null,chat:chatRef.current}:null;
          return ()=>{stepContextRef.current=null;};
        },[ready,focusReady,project?.id,project?.sessionId,project?.versionId,viewed?.id]);
        const decision=project?.revision;
        const choosing=decision?.downstream==='ask'&&(decision.phase==='awaiting_downstream'||decision.decision?.dispatch==='pending');
        async function chooseDownstream(choice){
          if(!choosing||busy||decisionInFlight.current)return;
          const id=project.id,revisionId=decision.id;decisionInFlight.current=revisionId;setBusy(true);setActionError(null);
          try{await postJson('/metis/api/v1/research-project/downstream',{id,revisionId,choice});const body=await getJson('/metis/api/v1/research-project?id='+encodeURIComponent(id));setProject(current=>current?.id===id?body.project:current);}
          catch(error){setActionError(error.message);}finally{decisionInFlight.current=null;setBusy(false);}
        }
        function downstreamQuestion(){
          if(!choosing||!focusReady)return null;
          const index=project.steps.findIndex(step=>step.id===decision.stepId);
          if(index<0||index===project.steps.length-1)return null;
          const later=project.steps.slice(index+1),suffixStarted=later.some(step=>step.delivery||step.status!=='not_started');
          const retrying=decision.decision?.dispatch==='pending';
          return h('section',{className:'mr-decision','aria-label':'后续步骤选择'},
            h('strong',{'aria-live':'polite'},retrying?'等待发送后续任务':'第 '+(index+1)+' 步「'+project.steps[index].title+'」已交付'),
            h('p',null,retrying?'从下一步继续，已改好的这一步保留。':suffixStarted?'要按新结果重做后续 '+later.length+' 步吗？':'后续 '+later.length+' 步尚未开始，要现在继续吗？'),
            h('div',null,!retrying?h('button',{type:'button',className:'mr-action',disabled:busy||researchRunning,onClick:()=>chooseDownstream('keep')},suffixStarted?'保留后续结果':'暂不继续'):null,
              h('button',{type:'button',className:'mr-action',disabled:busy||researchRunning,onClick:()=>chooseDownstream('redo')},retrying?'重新发送':suffixStarted?'重做后续步骤':'继续后续步骤')));
        }
        function renderDelivery(step){
          const delivery=step.delivery;
          if(!delivery)return null;
          return h('section',{className:'mr-output','aria-label':'实际交付'},
            h('h4',null,'实际交付'),
            delivery.requiresRecheck?h('p',{className:'mr-note'},'上次交付，待重新核验。'):null,
            delivery.artifacts.length?h('ul',{className:'mr-artifacts'},delivery.artifacts.map((item,index)=>h('li',{key:item.path},
              item.availability==='file'?h(React.Fragment,null,h('button',{type:'button',className:'mr-fileLink',title:item.path,onClick:event=>collection.projectApiRevision>=5&&collection.capabilities?.documentEditing&&/\.(?:docx?|pptx?|xlsx?|pdf|md|txt)$/i.test(item.name)?openDocument(step,index,item,event.currentTarget):download(step,index,item)},h(Icon,{name:'records',size:15}),item.name),h('button',{type:'button',className:'mr-iconButton','aria-label':'下载 '+item.name,title:'下载',onClick:()=>download(step,index,item),style:{marginLeft:8}},h(Icon,{name:'down',size:13}))):h('span',null,item.name+' · '+({directory:'目录',link:'链接',missing:'文件不存在'}[item.availability]||'读取受限')),
              h('code',null,item.path)))):null,
            delivery.text?h('pre',{className:'mr-deliveryText'},delivery.text):null,
            h('time',{className:'mr-time',dateTime:delivery.at},'提交于 '+formatDate(delivery.at)));
        }
        function renderStep(step,index){
          const expanded=step.id===inspected,current=!complete&&step.id===project.currentStepId;
          const stepActivity=activities.filter(item=>item.stepId===step.id);
          const activeHere=runningActivities.some(item=>item.stepId===step.id);
          const historyOpen=historyKey===project.id+'|'+step.id;
          function toggleStep(event){
            event.preventDefault();
            setInspection({projectId:project.id,stepId:expanded?null:step.id});
          }
          return h('li',{key:step.id,'data-project-step':step.id,'data-status':step.status,'data-current':current,'data-executing':activeHere},
            h('details',{open:expanded},
              h('summary',{'aria-expanded':expanded,'aria-current':current?'step':undefined,onClick:toggleStep},
                h('span',{className:'mr-stepNumber','aria-hidden':true},step.status==='submitted'?h(Icon,{name:'check',size:14}):String(index+1).padStart(2,'0')),
                h('strong',null,step.title),h('span',{className:'mr-stepStatus','data-status':step.status},activeHere?h(React.Fragment,null,h(Icon,{name:'refresh',size:12,className:'mm-spin'}),'执行中'):runLabels[step.status]||'状态未知'),h(Icon,{name:'down',size:14,className:'mr-foldIcon'})),
              h('div',{className:'mr-stepBody'},
                step.purpose?h('p',{className:'mr-purpose'},step.purpose):null,
                circuitKit&&step.skillBindings?.length?h('section',null,h('h4',null,'本步技能'),h('div',{className:'mc-boundSkills'},step.skillBindings.map(skill=>h('span',{className:'mc-boundSkill',key:skill.id,title:skill.id},skill.name)))):null,
                circuitKit&&step.loop?h('p',{className:'mr-note'},'↻ 达标后交付',step.loopCriteria?' · '+step.loopCriteria:''):null,
                stepActivity.length?h('section',{className:'mr-stepActivity','aria-label':step.title+'的执行动态'},activityList(stepActivity.slice(-4).reverse(),step.id),callDetail(step.id)):null,
                step.expected?.trim()?h('section',{className:'mr-expected'},h('h4',null,'交付要求'),h('p',null,step.expected)):null,
                step.retainedAfterRevision?h('p',{className:'mr-retained'},'保留返修前交付，未自动重做或重新核验。'):null,
                renderDelivery(step),
                step.feedback?.length?h('p',{className:'mr-note'},step.feedback.join('；')):null,
                h('div',{className:'mr-stepActions'},
                  h('button',{type:'button',className:'mr-action',disabled:busy||researchRunning||!chatState?.ready||chatState.sessionId!==project.sessionId||!revisionReady,onClick:event=>focusReady?focusInput():openRevision(step,index,event.currentTarget),title:researchRunning?'请先在研究对话中停止或等待任务结束':'在研究助手中输入本步修改意见'},h(Icon,{name:'edit',size:13}),'修改这一步'),
                  h('button',{type:'button',className:'mr-historyToggle','aria-expanded':historyOpen,disabled:!historyReady,onClick:()=>showHistory(step)},h(Icon,{name:'history',size:14}),'历史交付')),
                stepHistory(step))));
        }
        const creation=dialog?h('div',{className:'mr-dialogBackdrop',onKeyDown:dialogKey},h('form',{className:'mr-dialog',ref:dialogRef,role:'dialog','aria-modal':true,'aria-label':'新建研究项目',onSubmit:create},
          h('h2',null,'新建研究项目'),
          h('label',null,'项目名称',h('input',{'aria-label':'项目名称',value:dialog.name,required:true,maxLength:120,disabled:busy,onChange:event=>setDialog({...dialog,name:event.target.value})})),
          h('label',null,'使用模式',h('select',{'aria-label':'项目模式',value:dialog.modeId,required:true,disabled:busy,onChange:event=>setDialog({...dialog,modeId:event.target.value})},h('option',{value:''},'请选择模式'),dialog.modes.map(mode=>h('option',{key:mode.id,value:mode.id},mode.name+' · '+mode.stepCount+'步')))),
          h('label',null,'项目目录',h('div',{className:'mr-directory'},h('input',{'aria-label':'项目目录',value:dialog.root,required:true,disabled:busy,placeholder:'选择或填写用于保存资料和成果的目录',onChange:event=>setDialog({...dialog,root:event.target.value})}),h('button',{type:'button',className:'mm-button',disabled:busy,onClick:pickDirectory},'选择目录'))),
          h('p',{className:'mr-note'},'项目使用所选模式当前保存的流程，后续修改模式不会改变此项目。'),dialogError?h('p',{className:'mr-error',role:'alert'},dialogError):null,
          h('footer',null,h('button',{type:'button',className:'mm-button',disabled:busy,onClick:cancelDialog},'取消'),h('button',{type:'submit',className:'mm-button mm-primary',disabled:busy||!dialog.modes.length},busy?'创建中…':'创建项目')))):null;
        const revisionDialog=revisionForm?h('div',{className:'mr-dialogBackdrop',onKeyDown:dialogKey},h('form',{className:'mr-dialog',ref:revisionRef,role:'dialog','aria-modal':true,'aria-label':'修改这一步',onSubmit:submitRevision},
          h('h2',null,'修改第'+(revisionForm.index+1)+'步 · '+revisionForm.title),h('label',null,'修改意见',h('textarea',{'aria-label':'步骤修改意见',value:revisionForm.feedback,required:true,maxLength:12000,disabled:busy,placeholder:'具体说说哪里不满意、希望怎样修改。',onChange:event=>setRevisionForm({...revisionForm,feedback:event.target.value,requestId:crypto.randomUUID()})})),
          h('fieldset',{className:'mr-revisionScope',disabled:busy},h('legend',null,'后续步骤如何处理'),[['keep','仅修改本步','保留后续原交付，不自动重做。'],['redo','本步及后续重做','后续重新执行，原交付物留在历史中。']].map(([value,label,help])=>h('label',{key:value},h('input',{type:'radio',name:'revision-scope',value,checked:revisionForm.downstream===value,onChange:()=>setRevisionForm({...revisionForm,downstream:value,requestId:crypto.randomUUID()})}),h('span',null,h('strong',null,label),h('small',null,help))))),
          revisionError?h('p',{className:'mr-error',role:'alert'},revisionError):null,h('footer',null,h('button',{type:'button',className:'mm-button',disabled:busy,onClick:cancelDialog},'取消'),h('button',{type:'submit',className:'mm-button mm-primary',disabled:busy||researchRunning},busy?'提交中…':'交给AI修改')))):null;
        const linked=ready&&chatState?.sessionId===project.sessionId&&chatState.ready;
        const chatStatus=linked?(researchRunning?'执行中':'已连接'):(ready?'连接中':'');
        const researchChat=h('aside',{id:'metis-project-chat',className:'mr-chat','aria-label':'项目研究助手',ref:chatRef},
          h('header',{className:'mr-chatHeader'},
            h('div',{className:'mr-chatIdentity'},h(Icon,{name:'message',size:18}),h('h2',null,'研究助手'),
              chatStatus?h('span',{className:'mr-chatStatus',role:'status','data-state':linked?(researchRunning?'running':'ready'):'connecting'},chatStatus):null),
            ready?h('button',{type:'button',className:'mr-iconButton','aria-label':'打开完整研究对话',title:'打开完整研究对话',onClick:continueProject,disabled:busy},h(Icon,{name:'expand',size:16})):null),
          ready?h('div',{className:'mr-chatContext',role:'status','data-focused':focusReady&&!!viewed},h(Icon,{name:'layers',size:13}),h('span',{title:viewed?.title},focusReady?(viewed?'正在查看 · 第 '+(viewedIndex+1)+' 步「'+viewed.title+'」':'项目整体'):'重新加载 METIS 后可关联查看步骤')):null,
          downstreamQuestion(),
          h('div',{className:'mr-chatBody'},ready&&nativeKit?.SessionProvider?
            h(ResearchSurface.Provider,{value:{sessionId:project.sessionId,onState:observeResearchState,currentStep:viewed?.title||null,focusInput,bindDocumentInput}},
              h(NativeConversation,{key:project.sessionId,sessionId:project.sessionId,nativeKit,conversationLabel:'研究对话',ownerSource:'metisResearch',projectView:focusReady?stepContextRef:null,
                renderContent:()=>nativeKit.renderFactorySlot('conversation.content',{phase:'active',hero:false,variant:'embedded'},{slots:{views:ResearchViews},fallback:h('p',{className:'mr-chatNotice',role:'status'},'正在加载研究对话…')})})):
            h('p',{className:'mr-chatNotice'},selected?'项目会话尚未就绪':'选择项目后开始对话')));
        const projectNav=h('aside',{className:'mr-projectNav',id:'metis-project-list','aria-label':'研究项目列表','aria-hidden':!projectListOpen},
          h('header',{className:'mr-navHead'},
            h('div',{className:'mr-brand'},h(Icon,{name:'folder',size:16}),h('h2',null,'项目导航')),
            h('div',{className:'mr-navTools'},
              h('button',{type:'button',className:'mr-iconButton','aria-label':'刷新',title:'刷新项目列表与进度',onClick:()=>setRetry(value=>value+1),disabled:busy},h(Icon,{name:'refresh',size:14})),
              h('button',{type:'button',className:'mr-action mr-newProject','aria-label':'新建项目',title:'新建项目',onClick:openCreate,disabled:loading||busy||!collection.modes.length},h(Icon,{name:'plus',size:13}),'新建'))),
          h('div',{className:'mr-compactPicker'},h('select',{'aria-label':'选择研究项目',value:selected||'',disabled:!collection.projects.length,onChange:event=>selectProject(event.target.value)},
            collection.projects.length?collection.projects.map(item=>h('option',{value:item.id,key:item.id},item.name)):h('option',{value:''},'暂无项目'))),
          h('div',{className:'mr-projectList'},collection.projects.length?collection.projects.map(item=>h('button',{
              type:'button',key:item.id,'data-project-id':item.id,'aria-pressed':selected===item.id,title:[item.name,item.modeName].filter(Boolean).join(' · '),onClick:()=>selectProject(item.id)},
            h(Icon,{name:'folder',size:16}),h('span',null,h('strong',null,item.name),h('small',null,item.total==null?'进度暂不可用':item.submitted+' / '+item.total+' 步已交付')))):
            h('p',{className:'mr-note'},loading?'正在读取项目…':'暂无项目')));
        const projectView=project?h('div',{className:'mr-projectInner'},
          h('header',{className:'mr-projectHeader'},h('h2',null,project.name),
            h('div',{className:'mr-meta'},
              h('span',null,h(Icon,{name:'layers',size:14}),project.modeName),
              h('span',{title:project.root},h(Icon,{name:'folder',size:14}),h('span',{className:'mr-path'},project.root)))),
          project.error?h('p',{className:'mr-error',role:'alert'},project.error):null,
          !revisionReady?h('p',{className:'mr-note',role:'status'},'重新打开 DSH 后可使用分步修改。'):null,
          project.revision?.phase==='active'?h('p',{className:'mr-retained'},'正在返修「'+(project.steps.find(step=>step.id===project.revision.stepId)?.title||'所选步骤')+'」 · '+(project.revision.decision?.choice==='redo'?'处理后续步骤':project.revision.downstream==='redo'?'本步及后续重做':'仅修改本步')):null,
          ready?h('div',{className:'mr-projectViews',role:'group','aria-label':'研究内容视图'},h('button',{type:'button','aria-pressed':projectTab==='live',onClick:()=>switchProjectTab('live')},h(Icon,{name:'activity',size:13}),'研究现场'),h('button',{type:'button','aria-pressed':projectTab==='deliveries',onClick:()=>switchProjectTab('deliveries')},h(Icon,{name:'records',size:13}),'交付物')):null,
          projectTab==='live'?(ready&&collection.displayClientRevision?h(SceneSurface,{key:project.id,revision:collection.displayClientRevision,project,viewedId:inspected,viewedManually:inspection?.projectId===project.id&&!!inspection.stepId,onInspect:inspectFromScene,onDetails:detailsFromScene,onFocusChat:focusInput,onOpenFile:(stepId,index,file)=>{const step=project.steps.find(value=>value.id===stepId);if(step)openDocument(step,index,file,document.activeElement);}},liveOverview()):liveOverview()):
            h('section',{className:'mr-deliverableShelf','aria-label':'项目交付物'},project.steps.map((step,index)=>h('article',{className:'mr-deliveryCard',key:step.id},h('header',null,h('span',null,String(index+1).padStart(2,'0')),h('strong',null,step.title)),step.delivery?renderDelivery(step):h('p',{className:'mr-emptyReceipt'},'本步尚未提交交付物'),h('footer',null,h('button',{type:'button',className:'mr-action',onClick:()=>{inspectFromScene(step.id);switchProjectTab('live');}},'查看步骤'),h('button',{type:'button',className:'mr-action',onClick:()=>{inspectFromScene(step.id);focusInput();}},'向研究助手提意见'))))),
          ready&&projectTab==='live'?h('section',{className:'mr-stepInspector','aria-label':'流程步骤'},h('header',{className:'mr-workflowHead'},h('h3',null,viewed?'步骤详情':'项目整体'),
            h('div',{className:'mr-progress',role:'progressbar','aria-label':'项目步骤进度','aria-valuemin':0,'aria-valuemax':100,'aria-valuenow':project.percent,'aria-valuetext':project.submitted+' / '+project.total+' 步已交付'},
              h('span',{className:'mr-progressTrack','aria-hidden':true},project.steps.map(step=>h('i',{key:step.id,'data-done':step.status==='submitted'}))),
              h('span',null,project.submitted+' / '+project.total+' 步已交付')),h('button',{type:'button',className:'mr-historyToggle',onClick:()=>setInspection({projectId:project.id,stepId:null})},'讨论整个项目')),
            h('div',{className:'mr-stepRail',role:'group','aria-label':'切换查看步骤'},project.steps.map((step,index)=>h('button',{type:'button',key:step.id,'data-project-step-target':step.id,'aria-pressed':inspected===step.id,'data-executing':runningActivities.some(call=>call.stepId===step.id),title:step.title,onClick:()=>inspectFromScene(step.id)},h('span',null,String(index+1).padStart(2,'0')),h('strong',null,step.title)))),
            viewed?h('ol',{className:'mr-steps','aria-label':'项目流程步骤'},renderStep(viewed,viewedIndex)):h('p',{className:'mr-note'},'选择一个步骤查看目标、实际交付与修改入口。')):null):
          h('div',{className:'mr-empty'},h(Icon,{name:'folder',size:26}),h('h2',null,selected?(error?'暂时无法读取项目':'正在读取项目…'):'选择一个研究项目'));
        const consoleBar=h('header',{className:'mr-consoleBar','aria-label':'METIS操作栏'},
          h('div',{className:'mr-consoleBrand'},h('span',{className:'mr-consoleMark'},h(Wordmark,{size:20})),h('strong',null,'METIS'),h('button',{type:'button',className:'mm-theme mc-modeToggle',role:'switch','aria-checked':modeState.enabled,'aria-label':'METIS 模式开关',onClick:()=>actions.setMode(!modeState.enabled)},h('span',{className:'mm-switch'}))),navigation,
          h('div',{className:'mr-consolePicker'},h(Icon,{name:'folder',size:14}),h('select',{'aria-label':'选择研究项目',value:selected||'',disabled:!collection.projects.length,onChange:event=>selectProject(event.target.value)},collection.projects.length?collection.projects.map(item=>h('option',{value:item.id,key:item.id},item.name)):h('option',{value:''},'暂无研究项目'))),
          h('div',{className:'mr-consoleTools'},ready?h('span',{className:'mr-consoleIndicator'},h('b',null,project.submitted+' / '+project.total),' 步已交付'):null,h('button',{type:'button',className:'mm-button','aria-expanded':projectListOpen,'aria-controls':'metis-project-list',onClick:()=>setProjectListOpen(value=>!value)},h(Icon,{name:'folder',size:14}),'项目列表'),onOpenSkills?h('button',{type:'button',className:'mm-button',onClick:onOpenSkills},h(Icon,{name:'records',size:14}),'技能库'):null,h('button',{type:'button',className:'mm-button mm-primary',onClick:openCreate,disabled:loading||busy||!collection.modes.length},h(Icon,{name:'plus',size:14}),'新建项目')));
        if(circuitKit){
          const model=ready?circuitKit.projectModel(project,inspected):null;
          const inspector=viewed?h('ol',{className:'mr-steps','aria-label':'项目流程步骤'},renderStep(viewed,viewedIndex)):null;
          const stop=researchRunning||project?.execution?.running;
          const primaryAction=ready&&collection.capabilities?.circuitControl?h('button',{type:'button',className:'ic-action'+(stop?'':' mm-primary'),disabled:busy||!linked||!stop&&(complete||choosing||chatState?.hasDraft),title:chatState?.hasDraft&&!stop?'助手中已有未发送内容，请先发送或清空草稿':complete?'已交付，可选节点提出修改意见':stop?'停止当前项目原生任务':'从真实当前执行步骤继续，不切换页面',onClick:()=>controlProject(stop?'cancel':'start')},h(Icon,{name:stop?'close':'arrow',size:14}),stop?'停止研究':busy?'正在提交…':'继续研究'):null;
          return h('div',{className:'mm-panel mr-panel','data-console-surface':'projects'},h(circuitKit.Canvas,{model,header:consoleBar,assistant:researchChat,inspector,onSelect:inspectFromScene,onFocusChat:focusInput,primaryAction,
            onOpenArtifact:(stepId,index,file)=>{const step=project.steps.find(item=>item.id===stepId);if(!step)return;if(collection.capabilities?.documentEditing&&/\.(?:docx?|pptx?|xlsx?|pdf|md|txt)$/i.test(file.name))openDocument(step,index,file,document.activeElement);else void download(step,index,file);},
            onSkillInspect:stepId=>inspectFromScene(stepId),paletteOpen:projectListOpen,paletteTitle:'研究项目',palette:projectNav,onClosePalette:()=>setProjectListOpen(false),
            overlay:documentFile&&project&&documentFile.projectId===project.id?h(DocumentSurface,{key:documentFile.projectId+'|'+documentFile.stepId+'|'+documentFile.index,file:documentFile,onClose:closeDocument,onDirty:markDocumentDirty,onSaved:documentSaved,onFeedback:documentFeedback,running:researchRunning,onDownload:()=>download({id:documentFile.stepId},documentFile.index,{name:documentFile.name})}):null,
            notice:actionError||error?h('div',{className:'mr-error',role:'alert'},actionError||error):null,
            empty:h(React.Fragment,null,h('h2',null,loading?'正在读取项目':'让研究从这条回路开始'),h('p',null,loading?'载入项目固定流程…':collection.modes.length?'选择一个模式，建立真实研究项目。':'先在模式编排中保存一套流程。'),h('button',{type:'button',className:'ic-action mm-primary',onClick:openCreate,disabled:loading||busy||!collection.modes.length},'新建项目'))},creation,revisionDialog));
        }
        return h('div',{className:'mm-panel mr-panel','data-console-surface':'projects'},h('div',{className:'mr-shell'},consoleBar,
          actionError||error?h('div',{className:'mr-error',role:'alert'},actionError||error):null,
          !collection.modes.length&&!loading?h('p',{className:'mr-note'},'新建项目前，请先在模式编排中保存一个模式。'):null,
          h('div',{className:'mr-layout','data-rail-open':projectListOpen},projectNav,h('main',{className:'mr-project','aria-label':'研究项目详情'},documentFile&&project&&documentFile.projectId===project.id?h(DocumentSurface,{key:documentFile.projectId+'|'+documentFile.stepId+'|'+documentFile.index,file:documentFile,onClose:closeDocument,onDirty:markDocumentDirty,onSaved:documentSaved,onFeedback:documentFeedback,running:researchRunning,onDownload:()=>download({id:documentFile.stepId},documentFile.index,{name:documentFile.name})}):projectView),h(ProjectChatDivider),researchChat)),creation,revisionDialog);
      };
    }
    function NativeConversationBody({sessionId,expectedSessionId,useSession,inputActions,renderFactorySlot,hint,onHintConsumed,onRunningChange}){
      const session=useSession(value=>value);
      const bound=!!expectedSessionId&&sessionId===expectedSessionId;
      React.useEffect(()=>{if(bound&&hint?.id&&inputActions){inputActions.setDraft(hint.text);onHintConsumed?.(hint.id);}},[bound,hint?.id,inputActions]);
      React.useEffect(()=>{if(bound&&session)onRunningChange?.(session.running);},[bound,session?.running,onRunningChange]);
      if(!bound)return h('div',{className:'mc-assistantPending',role:'alert'},'编排会话未正确绑定，请重新连接。');
      const phase=session?.openState!=='open'?'settling':'active';
      return renderFactorySlot('conversation.content',{phase,hero:false,variant:'embedded'},{fallback:h('div',{role:'status'},'DSH 原生会话组件尚未就绪。')});
    }
    function buildPanel(store,t,actions,services) {
      const ProjectPanel=buildProjectPanel(store,t,actions,services,NativeConversation);
      const drafts=new Map();
      const assistantStore=createStore({native:null,workspaceSnapshot:null,savedConfiguration:null,workspaceUndo:null});
      const nativeSessions={create:async options=>{
        const until=Date.now()+8000;
        let sessions=services.sessions||services.findSessions?.();
        while(typeof sessions?.create!=='function'&&Date.now()<until){options.signal?.throwIfAborted();await new Promise(resolve=>setTimeout(resolve,80));sessions=services.sessions||services.findSessions?.();}
        if(typeof sessions?.create!=='function')throw new Error('DSH原生会话目录尚未就绪，请稍后重连');
        return sessions.create(options);
      }};
      function connectionFailure(stage,cause){
        const detail=cause?.rpcError||cause?.error||cause;
        const message=detail?.message||cause?.message||String(cause||'原生会话未打开');
        const code=detail?.code||cause?.code;
        return stage+'：'+(code?'['+code+'] ':'')+message;
      }
      function NativeConversation({sessionId,nativeKit,renderContent,hint,onHintConsumed,onRunningChange,conversationLabel='编排对话',ownerSource='metisComposer',projectView=null}){
        const generation=useStore(store).nativeSessionGeneration||0;
        const [connection,setConnection]=React.useState(null),[error,setError]=React.useState(null),[retry,setRetry]=React.useState(0);
        React.useEffect(()=>{
          let active=true,owned,acquiring=false,offCatalog=()=>{},offSession=()=>{},offProjectInput=()=>{};
          setConnection(null);setError(null);
          const fail=(stage,cause)=>{if(active){setConnection(null);setError(connectionFailure(stage,cause));}};
          try{
            if(!services.sessions?.retain)throw new Error('DSH原生会话服务尚未就绪');
            const sessions=services.sessions;
            const attach=()=>{
              if(!active||owned||acquiring||!sessions.list.getSnapshot().byId[sessionId])return;
              // retain() synchronously publishes this same list. Close the
              // listener and latch BEFORE calling it, not after assignment.
              acquiring=true;offCatalog();
              try{
                const candidate=sessions.retain(sessionId,{source:ownerSource});
                if(!active){candidate.release();return;}
                owned=candidate;
                candidate.ready.then(binding=>{
                  if(!active||owned!==candidate)return;
                  if(projectView)offProjectInput=attachProjectInput(services.projectConversation,binding,projectView);
                  const observe=()=>{
                    if(!active||owned!==candidate)return;
                    try{
                      const snapshot=binding.session.getSnapshot();
                      if(snapshot.openState==='error'){fail('打开会话',snapshot.openError);return;}
                      if(snapshot.openState==='open'){
                        setError(null);setConnection(current=>current?.reference===candidate?current:{reference:candidate,generation,sessionId,retry});
                      }else{setConnection(null);setError(null);}
                    }catch(cause){fail('读取会话状态',cause);}
                  };
                  offSession=binding.session.subscribe(observe);observe();
                },cause=>fail('打开会话',cause)).catch(cause=>fail('监听会话状态',cause));
              }catch(cause){fail('保留会话',cause);}
              finally{acquiring=false;}
            };
            offCatalog=sessions.list.subscribe(attach);attach();if(owned)offCatalog();
          }catch(cause){fail('连接服务',cause);}
          return()=>{active=false;offProjectInput();offCatalog();offSession();owned?.release();};
        },[sessionId,generation,retry,ownerSource,projectView]);
        if(error)return h('div',{className:'mc-assistantPending',role:'alert'},h('p',null,'暂时无法连接'+conversationLabel+'。'),h('p',{style:{maxWidth:'100%',overflowWrap:'anywhere'}},error),h('button',{type:'button',className:'mm-button',onClick:()=>setRetry(retry+1)},'重连'));
        if(!connection||connection.generation!==generation||connection.sessionId!==sessionId||connection.retry!==retry)return h('div',{className:'mc-assistantPending',role:'status'},h('span',{className:'mc-assistantLoader','aria-hidden':true}),h('p',null,'正在连接'+conversationLabel+'…'));
        if(connection.reference.sessionId!==sessionId)return h('div',{className:'mc-assistantPending',role:'alert'},conversationLabel+'绑定不一致，请重新连接。');
        const content=typeof renderContent==='function'?renderContent():nativeKit.renderSlot('metis.composer.native',{expectedSessionId:sessionId,hint,onHintConsumed,onRunningChange});
        return h(nativeKit.SessionProvider,{session:connection.reference},content);
      }
      let Editor=null,editorRevision=null;
      function ComposerPage({nativeKit,navigation,initialView='steps',onSurfaceReady,circuitKit}){
        const [resource,setResource]=React.useState(null),[error,setError]=React.useState(null),[recovering,setRecovering]=React.useState(null),[retry,setRetry]=React.useState(0);
        React.useEffect(()=>{
          let active=true,timer=null,attempt=0;
          const load=async()=>{
            try{
              const snapshot=await getJson('/metis/api/v1/composer');
              if(!Editor||editorRevision!==snapshot.editorRevision){
                const module=await import(api('/metis/api/v1/composer/client')+'?v='+snapshot.editorRevision);
                Editor=module.createModeComposer({React,store,actions,getJson,postJson,Icon,Wordmark,drafts,assistantStore,NativeConversation,nativeSessions});
                editorRevision=snapshot.editorRevision;
              }
              if(active){setRecovering(null);setError(null);setResource({Editor,snapshot});}
            }catch(cause){if(active){
              if([404,503].includes(cause.status)||/模式编排服务尚未就绪|Failed to fetch|NetworkError/i.test(cause.message||'')){
                setRecovering(cause.message||String(cause));timer=setTimeout(()=>void load(),Math.min(10000,1000*(++attempt)));
              }else setError(String(cause));
            }}
          };
          void load();
          return()=>{active=false;clearTimeout(timer);};
        },[retry]);
        const loadingHeader=h('header',{className:'ion-loadingBar'},h('div',{className:'mr-consoleBrand'},h('span',{className:'mr-consoleMark'},h(Wordmark,{size:19})),h('strong',null,'METIS')),navigation);
        if(error)return h('div',{className:'mm-panel'},loadingHeader,h('div',{className:'mm-shell'},h('div',{className:'mm-error',role:'alert'},'模式编排加载失败：'+error),h('button',{type:'button',className:'mm-button',onClick:()=>{setError(null);setRetry(retry+1);}},'重试')));
        if(!resource)return h('div',{className:'mm-panel'},loadingHeader,h('div',{className:'mm-loading',role:'status'},recovering?'编排服务正在恢复，正在自动重连…':'正在读取模式编排…'),recovering?h('details',{className:'mr-note'},h('summary',null,'连接详情'),h('p',null,recovering)):null);
        return h(resource.Editor,{initialSnapshot:resource.snapshot,nativeKit,navigation,initialView,onSurfaceReady,circuitKit});
      }
      return function Workbench(nativeKit){
        const [view,setView]=React.useState(null),[circuitKit,setCircuitKit]=React.useState(null),[circuitError,setCircuitError]=React.useState(null),[circuitRetry,setCircuitRetry]=React.useState(0),[composerView,setComposerView]=React.useState('steps'),shell=React.useRef(null),navigationGuard=React.useRef(null),pendingKeyboardFocus=React.useRef(null);
        React.useEffect(()=>{let active=true,timer,attempt=0;const load=async()=>{try{const data=await getJson('/metis/api/v1/research-projects');if(!data.displayClientRevision)throw new Error('离子回路资源尚未就绪');const module=await import(api('/metis/api/v1/research-project/display-client')+'?v='+data.displayClientRevision);if(typeof module.createCircuitWorkspace!=='function')throw new Error('当前回路资源尚未更新，请在方便时正常重新打开METIS');const kit=module.createCircuitWorkspace(React,{Icon});if(active){setCircuitKit(kit);setView(value=>value||((data.projects||[]).length?'projects':'composer'));setCircuitError(null);}}catch(error){if(active){setCircuitError(error.message);timer=setTimeout(load,Math.min(10000,1000*(++attempt)));}}};void load();return()=>{active=false;clearTimeout(timer);};},[circuitRetry]);
        const registerNavigationGuard=React.useCallback(guard=>{navigationGuard.current=guard;return()=>{if(navigationGuard.current===guard)navigationGuard.current=null;};},[]);
        const focusWorkspaceTab=React.useCallback((settled=true)=>{const wanted=pendingKeyboardFocus.current,root=shell.current;if(!wanted||!root)return;const active=document.activeElement;if(active&&active!==document.body&&active!==document.documentElement&&!root.contains(active)){pendingKeyboardFocus.current=null;return;}root.querySelector('[data-workspace-tab="'+wanted+'"]').focus({preventScroll:true});if(settled&&root.querySelector('[data-console-surface="'+wanted+'"]'))pendingKeyboardFocus.current=null;},[]);
        function navigate(value,destination='steps'){if(value!==view&&navigationGuard.current?.()===false)return false;if(value==='composer')setComposerView(destination);setView(value);return true;}
        const navigation=h('div',{className:'mm-workspaceTabs',role:'tablist','aria-label':'工作台页面',onKeyDown:event=>{
          if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?'composer':event.key==='End'?'projects':view==='composer'?'projects':'composer';if(navigate(next)){pendingKeyboardFocus.current=next;requestAnimationFrame(()=>focusWorkspaceTab(false));}
        }},[['composer','模式编排'],['projects','研究项目']].map(([value,label])=>h('button',{type:'button',role:'tab',key:value,'data-workspace-tab':value,'aria-selected':view===value,tabIndex:view===value?0:-1,onClick:()=>navigate(value)},label)));
        React.useEffect(()=>{
          const root=shell.current,timers=new Map(),motion=matchMedia('(prefers-reduced-motion: reduce)');
          const press=event=>{pendingKeyboardFocus.current=null;if(motion.matches)return;const button=event.target.closest?.('button:enabled');if(!button||!root.contains(button))return;const box=button.getBoundingClientRect();button.style.setProperty('--ion-press-x',(event.clientX-box.left)+'px');button.style.setProperty('--ion-press-y',(event.clientY-box.top)+'px');if(getComputedStyle(button).position==='static')button.dataset.ionStatic='true';button.dataset.ionPressed='true';clearTimeout(timers.get(button));timers.set(button,setTimeout(()=>{delete button.dataset.ionPressed;delete button.dataset.ionStatic;timers.delete(button);},360));};
          root.addEventListener('pointerdown',press,{passive:true});return()=>{root.removeEventListener('pointerdown',press);for(const [button,timer]of timers){clearTimeout(timer);delete button.dataset.ionPressed;delete button.dataset.ionStatic;}};
        },[]);
        return h('div',{className:'mm-workbench','data-metis-ui':'ion','data-console-view':view,ref:shell},
          h('div',{className:'mm-workspaceContent'},!circuitKit?h('div',{className:'mm-loading',role:'status'},circuitError||'正在载入 METIS 离子回路…',circuitError?h('button',{type:'button',className:'mm-button',onClick:()=>setCircuitRetry(value=>value+1)},'重新连接'):null):view==='composer'?h(ComposerPage,{nativeKit,navigation,initialView:composerView,onSurfaceReady:focusWorkspaceTab,circuitKit}):h(ProjectPanel,{nativeKit,navigation,registerNavigationGuard,onSurfaceReady:focusWorkspaceTab,circuitKit,onOpenSkills:()=>navigate('composer','skills')})));
      };
    }
    function buildHud(store,t,actions) {
      return function Hud({sessionId}) {
        const state=useStore(store),id=sessionId||state.sessionId,key=id+'|'+state.sessionPreset,[reading,setReading]=React.useState({key:null,status:'idle',progress:null});
        const preset=state.sessionPreset,workflow=preset==='metis'||preset?.startsWith('metis-')||fixedMetisPreset(preset),flow=reading.key===key?reading.progress:null;
        React.useEffect(()=>{
          if(!state.enabled||!id||id!==state.sessionId||!workflow)return;setReading({key,status:'loading',progress:null});
          let active=true,timer;
          const read=async()=>{let legacy=false;try{const body=await postJson('/metis/api/v1/runtime/progress',{sessionId:id}),next={key,status:body.progress?'workflow':'legacy',progress:body.progress||null};legacy=!body.progress;if(active)setReading(previous=>JSON.stringify(previous)===JSON.stringify(next)?previous:next);}catch{if(active)setReading({key,status:'unavailable',progress:null});}finally{if(active&&!legacy)timer=setTimeout(read,1000);}};
          void read();return()=>{active=false;clearTimeout(timer);};
        },[state.enabled,id,state.sessionId,state.sessionPreset]);
        if(!state.enabled||sessionId&&sessionId!==state.sessionId)return null;
        if(workflow&&(reading.key!==key||reading.status==='loading'||reading.status==='unavailable')){const detail=reading.status==='unavailable'?'暂时无法读取本会话步骤进度':'正在读取本会话步骤进度';return h('div',{className:'mm-hud',role:'progressbar','data-metis-session':id,'data-phase':reading.status,'aria-label':t('researchProgress'),'aria-valuemin':0,'aria-valuemax':100,'aria-valuetext':detail,title:detail},h('span',{className:'mm-hudTrack','aria-hidden':true},h('span',{className:'mm-hudFill',style:{width:'0%'}})),h('span',{className:'mm-hudValue','aria-hidden':true},'—'));}
        if(flow){
          const label=({not_started:'等待开始',working:'执行中',checking:'核验中',needs_revision:'循环改进中',needs_recheck:'等待复核',blocked:'等待处理',passed:'已达标，待交付',submitted:'已交付'})[flow.status]||'执行中';
          const detail=flow.modeName+' · 第 '+flow.currentIndex+'/'+flow.total+' 步 '+flow.currentStepTitle+' · '+label+' · 已交付 '+flow.submitted+'/'+flow.total+(flow.iteration?' · 核验 '+flow.iteration+' 次':'');
          return h('div',{className:'mm-hud',role:'progressbar','data-metis-session':id,'data-phase':flow.status,'aria-label':t('researchProgress'),'aria-valuemin':0,'aria-valuemax':100,'aria-valuenow':flow.percent,'aria-valuetext':detail,title:detail+(flow.recordedAt?' · 最近执行记录 '+flow.recordedAt:'')},h('span',{className:'mm-hudTrack','aria-hidden':true},h('span',{className:'mm-hudFill',style:{width:flow.percent+'%'}})),h('span',{className:'mm-hudValue','aria-hidden':true},flow.percent+'%'));
        }
        const project=projectForSession(state.projects||[],state.sessionCwd);if(!project)return null;
        const tasks=projectTasks(project),stage=String(project.status.stage),counts=summarize(tasks),current=summarize(tasks.filter(task=>String(task.stage)===stage)),resolved=counts.COMPLETE+counts.SKIPPED;
        const percent=counts.total?Math.min(resolved===counts.total?100:99,Math.round(resolved/counts.total*100)):0;
        const detail=(project.status.project_name||project.name)+' · '+t('stage.'+stage)+' · '+t('completed')+' '+counts.COMPLETE+' · '+t('skippedTasks')+' '+counts.SKIPPED+' · '+t('totalTasks')+' '+counts.total+' · '+t('currentProgress')+' '+current.COMPLETE+'/'+current.total;
        return h('div',{className:'mm-hud',role:'progressbar','aria-label':t('researchProgress'),'aria-valuemin':0,'aria-valuemax':100,'aria-valuenow':counts.total?percent:undefined,'aria-valuetext':counts.total?detail:t('stageReading'),title:counts.total?detail:t('stageReading')},h('span',{className:'mm-hudTrack','aria-hidden':true},h('span',{className:'mm-hudFill',style:{width:percent+'%'}})),h('span',{className:'mm-hudValue','aria-hidden':true},counts.total?percent+'%':'—'));
      };
    }

    function bindActions(store,t,services) {
      let refreshPromise=null;
      function setTheme(on) {
        services.desiredMode=on;
        store.set({enabled:on,modeError:null});
        document.documentElement.toggleAttribute('data-metis-mode',on);
        if(on&&services.theme&&!services.offTheme)services.offTheme=services.theme.overrideTokens(PKG_ID,TOKENS);
        else if(!on&&services.offTheme){services.offTheme();services.offTheme=null;}
      }
      async function setMode(on) {
        const before=store.get().enabled;
        let persisted=false;
        try {
          setTheme(on);
          await postJson('/metis/api/v1/mode',{enabled:on});
          persisted=true;
          if(!on&&services.sessions&&services.remote?.agentPresets){
            const active=Object.values(services.sessions.list.getSnapshot().byId||{}).find(row=>(row.retainedBy?.mainView||0)>0);
            const preset=active?.projectionValues?.agentPreset;
            if(active?.blank&&(preset==='metis'||preset?.startsWith('metis-')||fixedMetisPreset(preset))){
              const result=await services.remote.agentPresets.select(active.id,'standard');
              if(!result.ok)throw new Error(result.error?.message||'Unable to restore standard mode');
            }
          }
          return true;
        }catch(error){
          if(!persisted)setTheme(before);
          store.set({modeError:t('errMode')+': '+String(error)});
          return false;
        }
      }
      function refreshProjects() {
        if(refreshPromise)return refreshPromise;
        store.set({loadingProjects:true});
        refreshPromise=(async()=>{
          try {const body=await getJson('/metis/api/v1/projects');store.set({projects:body.projects||[],scannedAt:body.scannedAt||null,projectsError:null});}
          catch(error){store.set({projectsError:String(error)});}
          finally {store.set({loadingProjects:false});refreshPromise=null;}
        })();
        return refreshPromise;
      }
      async function bootstrap() {
        try {const state=await getJson('/metis/api/v1/state');store.set({roots:state.roots||[],modes:state.modes||[],versionAliases:state.versionAliases||{}});setTheme(state.enabled===true);}
        catch(error){store.set({modeError:String(error)});}
      }
      async function rememberRoot(path) {
        await postJson('/metis/api/v1/roots',{path});
        const state=await getJson('/metis/api/v1/state');
        store.set({roots:state.roots||[]});
        await refreshProjects();
      }
      async function pickRoot(open) {
        try {
          if(typeof services.uiWorkspace?.pickDirectory!=='function')throw new Error('Directory picker unavailable');
          const path=await services.uiWorkspace.pickDirectory();
          if(!path)return;
          await rememberRoot(path);
          if(open)await openSession(path,{fresh:true});
        }catch(error){store.set({projectsError:t('errPick')+': '+String(error)});}
      }
      async function removeRoot(path) {
        try {
          await postJson('/metis/api/v1/roots/remove',{path});
          const state=await getJson('/metis/api/v1/state');
          store.set({roots:state.roots||[]});
          await refreshProjects();
        }catch(error){store.set({projectsError:String(error)});}
      }
      async function openSession(root,{fresh=false}={}) {
        try {
          if(!store.get().enabled&&!await setMode(true))return;
          store.set({projectsError:null,selectedRoot:root});
          const workspace=services.uiWorkspace;
          if(!workspace||typeof services.workspaces?.create!=='function')throw new Error('Workspace service unavailable');
          const view=await services.workspaces.create({path:root});
          const id=view?.workspaceId??view?.id??view;
          if(typeof id!=='string')throw new Error('Workspace id unavailable');
          const selected=store.get().sessionPreset;
          const modeState=await getJson('/metis/api/v1/state');
          store.set({modes:modeState.modes||[],versionAliases:modeState.versionAliases||{}});
          const available=store.get().modes;
          let preset;
          if(!fresh&&fixedMetisPreset(selected))preset=selected;
          else if(!fresh&&(selected==='metis'||selected?.startsWith('metis-'))&&store.get().sessionId){
            const info=await getJson('/metis/api/v1/composer/session-version/current?sessionId='+encodeURIComponent(store.get().sessionId));preset=info.value.versionId;
          }else{
            let logical=store.get().versionAliases?.[selected]||selected;
            if(fixedMetisPreset(logical)){const record=await getJson('/metis/api/v1/composer/session-version?id='+encodeURIComponent(logical));logical=record.value.payload.modeId;}
            preset=available.some(mode=>mode.id===logical)?logical:available.find(mode=>mode.id===PRESET_ID)?.id||available[0]?.id;
          }
          if(!preset)throw new Error('尚无METIS模式，请先通过配置助手创建或恢复模式并保存');
          if(typeof workspace.openWorkspace==='function')await workspace.openWorkspace(id,undefined,{agentPreset:preset});
          else if(typeof workspace.connectWorkspace==='function'&&typeof workspace.openSession==='function'){
            const sessionId=await workspace.connectWorkspace(id,{agentPreset:preset});
            if(typeof sessionId!=='string')throw new Error('Session id unavailable');
            await workspace.openSession(sessionId);
          }else throw new Error('Session navigation unavailable');
        }catch(error){store.set({projectsError:t('errSession')+': '+String(error)});}
      }
      async function newModeSession(preset){
        if(!store.get().enabled&&!await setMode(true))throw new Error('无法开启METIS模式');
        if(!store.get().modes.some(mode=>mode.id===preset))throw new Error('该研究模式当前不可用');
        const current=normalizedRoot(store.get().sessionCwd);
        const workspace=services.workspaces?.list.getSnapshot().items.find(item=>normalizedRoot(item.path)===current);
        if(!workspace)throw new Error('请先在DSH选择项目工作区，再使用此模式新建会话');
        const id=await services.sessions.create({workspaceId:workspace.workspaceId,agentPreset:preset});
        await services.uiWorkspace.openSession(id);
      }
      return {setMode,setTheme,refreshProjects,bootstrap,removeRoot,openSession,newModeSession,newResearch:()=>pickRoot(true),addRoot:()=>pickRoot(false)};
    }

    return {
      inject:['slots','locale','sessions','uiSession','uiConversation'],
      apply(ctx) {
        const store=createStore({enabled:false,roots:[],projects:null,loadingProjects:false,projectsError:null,modeError:null,scannedAt:null,selectedRoot:null,sessionCwd:null,sessionPreset:null,sessionId:null,modes:[],versionAliases:{},modelCatalogRevision:0});
        const services={desiredMode:false,theme:null,offTheme:null,uiWorkspace:null,workspaces:null,sessions:null,remote:null,findSessions:()=>ctx.get('sessions')};
        ctx.effect(()=>ctx.locale.register(NS,DICT),'metis: dictionaries');
        const t=ctx.locale.bind(NS);
        const actions=bindActions(store,t,services);
        ctx.effect(()=>{
          const tag=document.createElement('style');tag.dataset.pluginCss=PKG_ID+'/client.css';tag.textContent=css+ION_WORKBENCH_CSS;document.head.appendChild(tag);
          return()=>tag.remove();
        },'metis: workbench styles');
        ctx.inject(['theme'],scope=>{
          services.theme=scope.theme;
          if(services.desiredMode)actions.setTheme(true);
          scope.effect(()=>()=>{if(services.offTheme){services.offTheme();services.offTheme=null;}services.theme=null;},'metis: theme lifetime');
        });
        ctx.inject(['layout'],scope=>{
          actions.openPanel=root=>{if(root)store.set({selectedRoot:root});scope.layout.selectPanel(PANEL_KEY);};
        });
        ctx.inject(['uiWorkspace'],scope=>{services.uiWorkspace=scope.uiWorkspace;scope.effect(()=>()=>{services.uiWorkspace=null;},'metis: navigation lifetime');});
        ctx.inject(['workspaces'],scope=>{services.workspaces=scope.workspaces;scope.effect(()=>()=>{services.workspaces=null;},'metis: workspace lifetime');});
        ctx.inject(['remote','remote.agentPresets'],scope=>{services.remote=scope.remote;scope.effect(()=>()=>{services.remote=null;},'metis: preset selection lifetime');});
        ctx.inject(['remote'],scope=>{
          const invalidate=()=>store.set({modelCatalogRevision:store.get().modelCatalogRevision+1});
          for(const event of ['llm/adapters-updated','settings/document-updated','credentials/record-updated','credentials/reference-updated'])scope.remote.$on(event,invalidate);
          scope.on('connection/reset',invalidate);
        });
        ctx.inject(['conversation'],scope=>{services.projectConversation=scope.conversation;scope.effect(()=>()=>{services.projectConversation=null;},'metis: native project input transport');});
        ctx.inject(['sessions'],scope=>{
          services.sessions=scope.sessions;
          store.set({nativeSessionGeneration:(store.get().nativeSessionGeneration||0)+1});
          scope.effect(()=>()=>{services.sessions=null;store.set({nativeSessionGeneration:(store.get().nativeSessionGeneration||0)+1});},'metis: session catalog lifetime');
          const update=()=>{
            const list=scope.sessions.list.getSnapshot();
            const active=Object.values(list.byId||{}).find(row=>(row.retainedBy?.mainView||0)>0);
            const cwd=active?.cwd||null;
            const preset=active?.projectionValues?.agentPreset||null;
            if(store.get().sessionCwd!==cwd||store.get().sessionPreset!==preset||store.get().sessionId!==(active?.id||null))store.set({sessionCwd:cwd,sessionPreset:preset,sessionId:active?.id||null});
          };
          scope.effect(()=>scope.sessions.list.subscribe(update),'metis: active session');
          update();
        });
        const Panel=buildPanel(store,t,actions,services);
        const Hud=buildHud(store,t,actions);
        ctx.slots.inject('main',()=>{
          const dispose=ctx.slots.register({name:'main',key:PANEL_KEY,locale:NS,children:{'metis.composer.native':{kind:'single',scope:'session'}}},props=>h(Panel,props));
          return()=>{
            const layout=ctx.get('layout');
            if(layout?.panelInfo?.getSnapshot?.().activePanelId===PANEL_KEY)layout.selectPanel(null);
            if(typeof dispose==='function')dispose();
          };
        });
        ctx.slots.inject('metis.composer.native',()=>ctx.slots.register({name:'metis.composer.native'},NativeConversationBody));
        ctx.slots.inject('sidebar.panellist',()=>ctx.slots.register({name:'sidebar.panellist',id:PANEL_KEY,order:5,label:()=>t('nav'),locale:NS},(owner={})=>h(Wordmark,{size:owner.size||17})));
        ctx.slots.inject('conversation.input.dock',()=>ctx.slots.register({name:'conversation.input.dock',id:PKG_ID+'.hud',order:5,locale:NS},props=>h(Hud,{sessionId:props.sessionId})));
        ctx.effect(()=>{
          actions.bootstrap();actions.refreshProjects();
          const timer=setInterval(()=>actions.refreshProjects(),45000);
          return()=>clearInterval(timer);
        },'metis: project refresh');
        ctx.effect(()=>()=>{if(services.offTheme){services.offTheme();services.offTheme=null;}document.documentElement.removeAttribute('data-metis-mode');},'metis: mode cleanup');
      }
    };
  }
});

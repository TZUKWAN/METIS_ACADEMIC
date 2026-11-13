process.env.METIS_TEST_FORBID_KIMI='1';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
const home=mkdtempSync(join(tmpdir(),'metis-native-codex-'));process.env.METIS_DATA_HOME=home;process.env.METIS_HOST='codex';
const {MetisCore}=await import('../runtime/core.mjs'),{NativeSessions}=await import('../runtime/codex.mjs'),{definitions,createDispatcher}=await import('../runtime/tools.mjs');
const core=new MetisCore(),folder=join(home,'project');mkdirSync(folder);
const read=core.configRead();await core.configEdit({readToken:read.readToken,operations:[{type:'create_mode',mode:{id:'metis-native-proof',name:'Native adapter integration'},profile:{steps:['first','second'].map(id=>({id,title:id,instruction:'Write a real '+id+'.txt file containing the word METIS.',deliverables:id+'.txt',prompt:'Use native file or command tools. No network needed.',skills:[]})),skills:[],parameters:{language:'zh-CN'}}}]});await core.save({expectedRevision:core.draft().revision});
const project=await core.createProject({name:'Native integration',folder,modeId:'metis-native-proof',autonomous:false});
let native;const dispatch=createDispatcher(core,{open:()=>({}),check:args=>native.check(args)});native=new NativeSessions(core,{tools:definitions.filter(tool=>!['metis_open','metis_step_check'].includes(tool.name)),invoke:dispatch});
const record=native.create({kind:'project',projectId:project.id,ephemeral:true});
const report={home,projectId:project.id,checks:[],userDesktopControlled:false,nativeTurns:1};
try{
  const rt=await native.connect(record.id);report.model=rt.record.model;report.provider=rt.record.provider;assert.ok(!/kimi/i.test(report.model));
  await native.send({sessionId:record.id,text:'This is a small real integration check, not research. Complete BOTH configured steps now without asking me to confirm. Use metis_step_open, your actual native shell/file tools to write first.txt and second.txt in the current project folder (each must contain METIS), and metis_step_submit after each file. Do not use network, do not spawn teammates, do not change configuration, do not run tests. Submit both real files then reply briefly.'});
  const deadline=Date.now()+180000;while(Date.now()<deadline&&rt.record.running)await new Promise(resolve=>setTimeout(resolve,500));if(rt.record.running)throw new Error('Native integration exceeded 180 seconds');
  const result=core.project(project.id);report.steps=result.steps.map(({id,status,delivery})=>({id,status,delivery}));report.events=rt.record.events.filter(e=>['tool','error','attention'].includes(e.kind));
  assert.ok(result.steps.every(step=>step.status==='submitted'),JSON.stringify({steps:report.steps,events:report.events}));assert.ok(['first.txt','second.txt'].every(file=>readFileSync(join(folder,file),'utf8').includes('METIS')));assert.ok(rt.record.events.some(e=>e.kind==='tool'&&e.text));assert.equal(result.revision,null);
  report.checks.push({name:'real native Codex used full tools, wrote two actual files, submitted and advanced without a user confirmation gate',passed:true});
  report.threadId=rt.record.threadId;console.log(JSON.stringify({passed:true,model:report.model,provider:report.provider,steps:report.steps.map(s=>({id:s.id,status:s.status})),nativeToolEvents:report.events.length}));
}catch(error){report.failure=error.stack;throw error;}finally{native.close();const output=process.env.METIS_TEST_REPORT||join(home,'native-proof.json');writeFileSync(output,JSON.stringify(report,null,2)+'\n');}

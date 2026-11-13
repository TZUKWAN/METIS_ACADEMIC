/** File/transaction unit tests use explicit controlled native adapters.
 * Real DSH/model handoffs are verified separately in the private runtime. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {createProjectModeUpdates} from '../project-mode-updates.js';
import {registerProjectWorkflowProvider} from '../project-workflow-link.js';
const version=(id,prompt)=>({id,hash:id.repeat(64).slice(0,64),payload:{name:'真实配置形状',modeId:'m',plugins:[{name:'metis-academic-preset/step-skills',config:{mode:{id:'m',name:'配置'},profile:{steps:[{id:'a',title:'步骤',instruction:'目标',prompt,skills:[]}],skills:[]},resourceSkills:[]}}]}});
async function fixture(body){
 const root=mkdtempSync(join(tmpdir(),'metis-sync-transaction-')),previous=process.env.DSH_HOME;process.env.DSH_HOME=root;const path=join(root,'project.json'),old=version('a','old'),next=version('b','new'),state={latest:next,running:false,created:[],failCreate:false,imports:0},source={id:'old-session',status:'idle',session:{id:'old-session',snapshotEvents:()=>[{type:'user/message',data:{source:{kind:'user'},content:[{type:'text',text:'真实来源形状的中文要求'}]}}]}};
 writeFileSync(path,JSON.stringify({id:'project',status:'ready',sessionId:source.id,modeId:'m',modeName:'配置',versionId:old.id,versionHash:old.hash,root}));
 const readRecord=()=>JSON.parse(readFileSync(path,'utf8')),writeRecord=value=>writeFileSync(path,JSON.stringify(value));
 state.steered=[];state.targetEvents=[];const target={id:null,status:'idle',inbox:{nextStep:[],nextTurn:[]},session:{id:null,snapshotEvents:()=>state.targetEvents},steer(message){state.steered.push(message);if(state.failResume){state.failResume=false;throw new Error('Injected enqueue failure');}this.inbox.nextStep.push(message);}};
 source.session.snapshotEvents=()=>[{type:'user/message',data:{source:{kind:'user'},content:[{type:'text',text:state.authorizeAuto?'自主推进后续直到交付':'真实来源形状的中文要求'}]}},...(state.forwardInput?[{seq:2,type:'agent/inbox/spliced',data:{inserted:[state.forwardInput]}}]:[]),...(state.authorizeAuto||state.forwardInput?[{type:'turn/end',data:{reason:{kind:'blocked'}}}]:[])];
 const options={records:()=>['project'],readRecord,writeRecord,getVersion:id=>id===old.id?old:next,getLatestVersion:()=>state.latest,runState:()=>({running:state.running}),revising:new Set(),
  createSession:async request=>{state.created.push(request.sessionId);if(state.failCreate){state.failCreate=false;throw new Error('Injected native creation failure');}return{sessionId:request.sessionId};},
  forwardUserRequest:async(record,request)=>{(state.forwarded??=[]).push(request);if(state.failForward){state.failForward=false;throw new Error('Injected native forwarding failure');}},
  getTarget:async id=>{if(id===source.id)return {agent:source,control:{exportWorkflow:()=>({scope:'source-scope',profile:{steps:[{id:'a',title:'a'}]},record:{steps:{},activity:[],...(state.authorizeAuto||state.forwardInput?{workflowUpdatePause:{toVersionId:next.id,requests:state.forwardInput?[{eventSeq:2,messageId:state.forwardInput.id,contentHash:createHash('sha256').update(JSON.stringify(state.forwardInput.content)).digest('hex'),stepId:'a'}]:[]}}:{})},evidence:[]})}};target.id=id;target.session.id=id;return{agent:target,control:{inheritWorkflow:()=>state.imports++}};}};
 const service=createProjectModeUpdates(options),request={id:'project',sessionId:source.id,versionId:old.id,latestVersionId:next.id};
 const release=registerProjectWorkflowProvider(service);
 try{await body({root,path,state,service,request,readRecord,options,source});}finally{release();if(previous===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=previous;rmSync(root,{recursive:true,force:true});}
}
test('running research waits without creating a replacement session or changing its project',()=>fixture(async f=>{
 f.state.running=true;const before=readFileSync(f.path,'utf8'),result=await f.service.synchronize(f.request);assert.equal(result.status,'waiting');assert.equal(f.state.created.length,0);assert.equal(readFileSync(f.path,'utf8'),before);
}));
test('a deleted source mode keeps the original version and never falls back to another mode',()=>fixture(async f=>{
 f.state.latest=null;assert.equal(f.service.describe(f.readRecord()).status,'source-deleted');assert.equal((await f.service.synchronize(f.request)).applied,false);assert.equal(f.state.created.length,0);assert.equal((await f.service.read('old-session',{action:'read',source:'latest'})).latestMissing,true);
}));
test('concurrent/repeated synchronization is idempotent and authentic owner-source references survive cold reading',()=>fixture(async f=>{
 const [one,two]=await Promise.all([f.service.synchronize(f.request),f.service.synchronize(f.request)]);assert.equal(one.sessionId,two.sessionId);assert.equal(f.state.created.length,1);assert.equal(f.state.imports,1);
 const cold=createProjectModeUpdates(f.options),owners=cold.inheritedOwners(one.sessionId);assert.equal(owners.length,1);assert.equal(owners[0].sourceSessionId,'old-session');assert.equal(owners[0].originalIndex,0);assert.equal(owners[0].index,-1);
 const visible=await cold.read(one.sessionId);assert.equal(visible.ownerInstructions.messages[0].text,'真实来源形状的中文要求');assert.equal((await cold.read(one.sessionId,{action:'owner',messageIndex:0})).text,'真实来源形状的中文要求');
 assert.equal((await cold.synchronize(f.request)).duplicate,true);assert.equal(f.state.created.length,1);
}));
test('failed creation leaves the old project active and retry uses the originally planned session',()=>fixture(async f=>{
 f.state.failCreate=true;await assert.rejects(f.service.synchronize(f.request),/Injected/);const pending=f.readRecord().modeSync.pending;assert.equal(f.readRecord().sessionId,'old-session');
 const result=await f.service.synchronize(f.request);assert.equal(result.sessionId,pending.toSessionId);assert.equal(f.state.created[0],f.state.created[1]);
}));
test('cold recovery refuses a tampered handoff receipt rather than inventing inherited user instructions',()=>fixture(async f=>{
 await f.service.synchronize(f.request);const ref=f.readRecord().modeSync.lastApplied,path=join(f.root,'metis-project-mode-updates',ref.receiptId+'.json');writeFileSync(path,readFileSync(path,'utf8').replace('中文要求','伪造要求'));
 const cold=createProjectModeUpdates(f.options);assert.throws(()=>cold.inheritedOwners(ref.toSessionId),/哈希/);
}));
test('a failed automatic wake remains retryable and uses one stable message ID without recreating the session',()=>fixture(async f=>{
 f.state.authorizeAuto=true;f.state.failResume=true;
 const first=await f.service.synchronize(f.request);assert.equal(first.applied,true);assert.match(first.resume.error,/Injected/);assert.equal(f.service.describe(f.readRecord()).resumePending,true);
 const id=f.readRecord().modeSync.lastApplied.resumeMessageId;assert.ok(id);
 const retry=await f.service.synchronize(f.request);assert.equal(retry.resume.queued,true);assert.equal(f.state.created.length,1);assert.equal(f.state.steered[0].id,id);assert.equal(f.state.steered[1].id,id);
 await f.service.synchronize(f.request);assert.equal(f.state.steered.length,2);assert.equal(f.service.describe(f.readRecord()).resumePending,false);
}));
test('an actual queued-input shape is forwarded verbatim with a stable retry identity without autonomous authority',()=>fixture(async f=>{
 f.state.forwardInput={id:randomUUID(),source:{kind:'user',rpcId:randomUUID()},content:[{type:'text',text:'只执行本步，保留\n原始换行和内容'}]};f.state.failForward=true;
 const first=await f.service.synchronize(f.request);assert.equal(first.applied,true);assert.match(first.resume.error,/forwarding/);
 const again=await f.service.synchronize(f.request);assert.equal(again.resume.forwarded,1);assert.equal(f.state.created.length,1);assert.equal(f.state.forwarded[0].requestId,f.state.forwarded[1].requestId);assert.deepEqual(f.state.forwarded[1].content,f.state.forwardInput.content);
 await f.service.synchronize(f.request);assert.equal(f.state.forwarded.length,2);
}));

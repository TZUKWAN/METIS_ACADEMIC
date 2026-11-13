/** Append-only machine evidence; model-written reports never replace these receipts. */
import {appendFileSync,existsSync,mkdirSync,readFileSync,lstatSync,writeFileSync,truncateSync} from 'node:fs';
import {join,resolve,isAbsolute} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {configurationHome} from './configuration.js';
const hash=value=>createHash('sha256').update(typeof value==='string'?value:JSON.stringify(value)).digest('hex');
export const evidenceId=callId=>'C'+hash(callId).slice(0,16);
export const usageEvidenceId=data=>(data.channel==='main'?'M':'R')+hash(data);
const quiet=/^(?:todo_write|todo_read|list_agents|metis_step|metis_library)$/;
const json=value=>{try{return typeof value==='string'?JSON.parse(value):value;}catch{return null;}};
export function sourcePath(args,cwd){const path=args?.path||args?.file_path||args?.filePath||args?.filename;return typeof path==='string'&&path?resolve(cwd||'.',path):null;}
export function machineCall(execution,result,stepId,{cwd='',invoked=true}={}){
  const arguments_=execution.arguments||{},raw=JSON.stringify(result.value??result.content??null);
  return {kind:'call',id:evidenceId(String(execution.callId)),callId:String(execution.callId),rootCallId:String(execution.rootCallId||execution.callId),stepId:stepId||null,name:execution.name,arguments:arguments_,cwd,path:sourcePath(arguments_,arguments_.workdir||cwd),isError:!!result.isError,invoked,
    at:new Date().toISOString(),value:raw.slice(0,256000),valueCharacters:raw.length,truncated:raw.length>256000};
}
export class ExecutionEvidence{
  constructor(sessionId,scope,{root=configurationHome()}={}){
    this.sessionId=sessionId;this.scope=scope;this.path=join(root,'metis-step-evidence',hash(sessionId),scope+'.jsonl');this.records=new Map();this.tail='';this.hydrated=0;
    if(existsSync(this.path)){
      if(lstatSync(this.path).isSymbolicLink()||lstatSync(this.path).size>64*1024*1024)throw new Error('原始执行证据文件无效');
      const raw=readFileSync(this.path),lines=raw.toString('utf8').split('\n');let interrupted=null;
      if(raw.length&&raw.at(-1)!==10){try{JSON.parse(lines.at(-1));}catch{interrupted=raw.subarray(raw.lastIndexOf(10)+1);lines.pop();}}
      for(let i=0;i<lines.length;i++){
        if(!lines[i])continue;let entry;try{entry=JSON.parse(lines[i]);}catch{throw new Error('原始执行证据记录不完整，未当作通过依据');}
        if(entry.sessionId!==sessionId||entry.scope!==scope||entry.previous!==this.tail||entry.hash!==hash({sessionId,scope,previous:entry.previous,data:entry.data}))throw new Error('原始执行证据摘要不匹配，未使用损坏记录');
        this.tail=entry.hash;this.records.set(entry.data.id,entry.data);
      }
      if(interrupted){const quarantine=this.path+'.interrupted-'+randomUUID();writeFileSync(quarantine,interrupted,{flag:'wx',mode:0o600});truncateSync(this.path,raw.length-interrupted.length);this.recovery={kind:'interrupted-append',bytes:interrupted.length,quarantine};}
      else if(raw.length&&raw.at(-1)!==10)appendFileSync(this.path,'\n');
    }
  }
  append(data){
    if(this.records.has(data.id))return this.records.get(data.id);
    const parent=join(this.path,'..');mkdirSync(parent,{recursive:true,mode:0o700});if(lstatSync(parent).isSymbolicLink())throw new Error('执行证据目录不能是链接');
    const captured=JSON.parse(JSON.stringify(data)),entry={sessionId:this.sessionId,scope:this.scope,previous:this.tail,data:captured};entry.hash=hash(entry);
    appendFileSync(this.path,JSON.stringify(entry)+'\n',{encoding:'utf8',mode:0o600});this.tail=entry.hash;this.records.set(captured.id,captured);return captured;
  }
  record(execution,result,stepId,options){return this.append(machineCall(execution,result,stepId,options));}
  inherit(records,{sessionId,scope,updateId}){
    for(const data of records){
      const captured={...data,inheritedFrom:data.inheritedFrom||{sessionId,scope,updateId},...(data.nativeEventSeq!==undefined?{sourceNativeEventSeq:data.sourceNativeEventSeq??data.nativeEventSeq,nativeEventSeq:null}:{})};
      this.append(captured);
    }
  }
  hydrate(agent){
    const events=agent.session.snapshotEvents();if(events.length===this.hydrated)return;
    const calls=new Map();let current=null;
    for(const event of events){
      const data=event.data||{};
      if(event.type==='assistant/message'&&data.usage){
        const id=usageEvidenceId({channel:'main',sessionId:this.sessionId,eventSeq:event.seq??event.time});
        if(!this.records.has(id))this.append({id,kind:'usage',protocol:'native-usage-v2',name:'model-usage',channel:'main',stepId:current,at:new Date(event.time||Date.now()).toISOString(),nativeEventSeq:event.seq??null,usage:data.usage});
      }
      if(event.type==='tool/call')calls.set(data.callId,{callId:data.callId,name:data.name,arguments:json(data.arguments)||{},stepId:current});
      if(event.type==='tool/ptc-dispatch-start')calls.set(data.subCallId,{callId:data.subCallId,rootCallId:data.rootCallId,name:data.name,arguments:data.arguments||{},stepId:calls.get(data.rootCallId)?.stepId||current});
      let call,result;
      if(event.type==='tool/result'){
        const message=data.message||{},id=message.toolCallId||message.source?.callId;call=calls.get(id);result={content:message.content,isError:!!message.isError};
        if(call?.name==='metis_step'&&call.arguments.action==='check'){
          const text=(message.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('\n');let value=json(text);value=value?.data||value;
          if(value?.truncated&&typeof value.resultFile==='string'){
            const folder=resolve(configurationHome(),'metis-library-tool-results'),file=resolve(value.resultFile);
            if(file.startsWith(folder+'\\')||file.startsWith(folder+'/'))try{if(lstatSync(file).isFile()&&!lstatSync(file).isSymbolicLink()&&lstatSync(file).size<=8*1024*1024)value=JSON.parse(readFileSync(file,'utf8'));}catch{}
          }
          if(!value?.noNewEvidence)for(const request of value?.review?.requests||value?.attempt?.requests||[]){
            const usageId=usageEvidenceId({channel:'review',sessionId:this.sessionId,callId:id,attempt:request.attempt});
            if(!this.records.has(usageId))this.append({id:usageId,kind:'usage',protocol:'native-usage-v2',name:'model-usage',channel:'review',stepId:call.arguments.stepId||current,at:new Date(event.time||Date.now()).toISOString(),request});
          }
        }
        if(call?.name==='metis_library'&&call.arguments.action==='open'&&!result.isError){const text=(message.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('\n'),value=json(text);if(value?.modeId||value?.data?.modeId)current=call.arguments.stepId;}
      }else if(event.type==='tool/ptc-dispatch'){call=calls.get(data.subCallId);result={content:data.content,isError:!!data.isError};}
      const opened=call?.name==='metis_library'&&call.arguments.action==='open'&&!result?.isError;
      if(!call||!result||quiet.test(call.name)&&!opened)continue;
      const id=evidenceId(call.callId);if(this.records.has(id))continue;
      const item=machineCall(call,result,opened?call.arguments.stepId:call.stepId,{cwd:agent.session.header?.cwd||agent.options?.cwd||'',invoked:result.isError?null:true});
      item.at=typeof event.time==='number'?new Date(event.time).toISOString():item.at;item.nativeEventSeq=event.seq??null;item.origin='native-session-journal';this.append(item);
    }
    this.hydrated=events.length;
  }
  all(stepId){return [...this.records.values()].filter(item=>item.stepId===stepId);}
  summaries(stepId){
    return this.all(stepId).filter(item=>['call','unit','skill'].includes(item.kind)).map(item=>({id:item.id,kind:item.kind,callId:item.callId,rootCallId:item.rootCallId,name:item.name,path:item.path,at:item.at,isError:item.isError,invoked:item.invoked,...(item.kind==='unit'?{unit:item.unit,artifacts:item.artifacts,metrics:item.metrics}:{}),...(item.unitReceipt?{unitReceipt:item.unitReceipt}:{})}));
  }
  initial(stepId){
    const all=this.all(stepId).filter(item=>['call','unit','skill'].includes(item.kind)),firstWrites=new Map();
    for(const item of all)if(item.path&&/^(write|edit|apply_patch)$/.test(item.name)&&!item.isError&&item.invoked!==false&&!firstWrites.has(item.path))firstWrites.set(item.path,item);
    const selected=new Map([...all.filter(item=>/ask_user|request_user|approval/.test(item.name)||item.kind==='unit'),...firstWrites.values(),...all.slice(-8)].map(item=>[item.id,item]));
    return {total:all.length,firstWrites:[...firstWrites.values()].map(item=>({id:item.id,path:item.path,at:item.at})),calls:this.summaries(stepId).filter(item=>selected.has(item.id)).slice(-96)};
  }
  read(stepId,id,{offset=0,maxChars=6000}={}){
    if(!Number.isSafeInteger(offset)||offset<0||!Number.isSafeInteger(maxChars)||maxChars<1||maxChars>12000)throw new Error('原始证据分页范围无效');
    const item=this.records.get(id);if(!item||item.stepId!==stepId)throw new Error('该证据不属于当前步骤');
    const text=JSON.stringify(item);return {id,source:'machine-captured-native-execution',offset,text:text.slice(offset,offset+maxChars),characters:text.length,nextOffset:offset+maxChars<text.length?offset+maxChars:null,truncatedAtCapture:!!item.truncated};
  }
  semanticFingerprint(stepId){
    const rows=this.all(stepId).filter(item=>['call','unit','skill'].includes(item.kind)&&!quiet.test(item.name)&&!['write','edit','apply_patch'].includes(item.name)&&!item.isError&&item.invoked!==false);
    // Repeating the same actual read/search cannot manufacture new evidence.
    const unique=[...new Set(rows.map(item=>hash({name:item.name,arguments:item.arguments,value:item.value,kind:item.kind,artifacts:item.artifacts})))].sort();return hash(unique);
  }
}

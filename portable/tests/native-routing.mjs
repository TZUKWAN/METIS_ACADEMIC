process.env.METIS_TEST_FORBID_KIMI='1';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
const home=mkdtempSync(join(tmpdir(),'metis-native-routing-'));process.env.METIS_DATA_HOME=home;process.env.METIS_HOST='codex';
const {MetisCore}=await import('../runtime/core.mjs'),{NativeSessions}=await import('../runtime/codex.mjs'),{definitions}=await import('../runtime/tools.mjs');const core=new MetisCore(),calls=[];
const native=new NativeSessions(core,{tools:definitions.filter(t=>t.name==='metis_config_read'),invoke:async(name,args)=>{calls.push(name);return core.configRead(args);}}),session=native.create({kind:'composer',ephemeral:true});
const report={home,nativeTurns:1,checks:[],userDesktopControlled:false};
try{
  const rt=await native.connect(session.id);await native.send({sessionId:session.id,text:'Integration check: call the provided dynamic metis_config_read tool once with kind overview. Do not call any other tools, do not write files, do not use network or teammates. Then reply briefly with the number of modes returned.'});
  const deadline=Date.now()+90000;while(rt.record.running&&Date.now()<deadline)await new Promise(resolve=>setTimeout(resolve,300));assert.equal(rt.record.running,false);assert.deepEqual(calls,['metis_config_read']);report.model=rt.record.model;report.calls=calls;report.checks.push({name:'with METIS installed natively, nested assistant uses its bound dynamic tools and does not recurse into a duplicate METIS MCP server',passed:true});console.log(JSON.stringify({passed:true,calls,model:report.model}));
}catch(error){report.failure=error.stack;throw error;}finally{native.close();writeFileSync(process.env.METIS_TEST_REPORT||join(home,'routing-proof.json'),JSON.stringify(report,null,2)+'\n');}

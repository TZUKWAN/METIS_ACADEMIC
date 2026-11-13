process.env.METIS_TEST_FORBID_KIMI='1';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
const home=mkdtempSync(join(tmpdir(),'metis-native-review-'));process.env.METIS_DATA_HOME=home;process.env.METIS_HOST='codex';
const {MetisCore,hash}=await import('../runtime/core.mjs'),{NativeSessions}=await import('../runtime/codex.mjs');
const core=new MetisCore(),folder=join(home,'project');mkdirSync(folder);writeFileSync(join(folder,'evidence.txt'),'METIS: actual file for the isolated independent-review integration check.\n');
const read=core.configRead();await core.configEdit({readToken:read.readToken,operations:[{type:'create_mode',mode:{id:'metis-review',name:'Independent review'},profile:{steps:[{id:'goal','title':'Read file evidence','instruction':'交付实际文本文件，清楚包含 METIS。','deliverables':'evidence.txt','prompt':'Read the real file.',skills:[],loop:{enabled:true,criteria:'实际文件包含 METIS，不能为空。'}}],skills:[],parameters:{language:'zh-CN'}}}]});await core.save({expectedRevision:core.draft().revision});const project=await core.createProject({name:'Review integration',folder,modeId:'metis-review'});await core.openStep({projectId:project.id});
const native=new NativeSessions(core),before=hash(readFileSync(join(folder,'evidence.txt'))),report={home,independentNativeTurns:1,userDesktopControlled:false,checks:[]};
try{
  const review=await native.check({projectId:project.id,artifacts:['evidence.txt']});assert.equal(review.passed,true,JSON.stringify(review));assert.ok(review.evidence.threadId);assert.equal(hash(readFileSync(join(folder,'evidence.txt'))),before);
  const cached=await native.check({projectId:project.id,artifacts:['evidence.txt']});assert.equal(cached.cached,true);assert.equal((await core.submit({projectId:project.id,artifacts:['evidence.txt']})).completed,true);
  report.review=review;report.checks.push({name:'actual read-only independent Codex review, fingerprint cache and loop delivery',passed:true});console.log(JSON.stringify({passed:true,independent:true,model:review.evidence.model,cached:true,completed:true}));
}catch(error){report.failure=error.stack;throw error;}finally{native.close();writeFileSync(process.env.METIS_TEST_REPORT||join(home,'review-proof.json'),JSON.stringify(report,null,2)+'\n');}

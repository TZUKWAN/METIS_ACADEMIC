import test from 'node:test';
import assert from 'node:assert/strict';
import {startStepActivity,finishStepActivity,readStepActivity,interruptStepActivity} from '../step-activity.js';

test('activity retains the original step through concurrent calls and reports actual failure and cancellation',()=>{
  const record={};
  const first={callId:'call-a',rootCallId:'root-a',name:'pwsh',arguments:{description:'读取材料'},signal:new AbortController().signal};
  const second={callId:'call-b',name:'web_fetch',arguments:{url:'https://name:password@example.org/paper?token=secret#page=1'},signal:new AbortController().signal};
  startStepActivity(record,first,'collect');startStepActivity(record,second,'check');
  finishStepActivity(record,first,{isError:false,value:{exitCode:7},content:[{type:'text',text:'真实非零退出'}]});
  const cancelled=new AbortController();cancelled.abort();
  finishStepActivity(record,{...second,signal:cancelled.signal},{isError:true});
  const rows=readStepActivity(record);
  assert.equal(rows[0].stepId,'collect');assert.equal(rows[0].status,'failed');assert.equal(rows[0].exitCode,7);
  assert.equal(rows[1].stepId,'check');assert.equal(rows[1].status,'cancelled');assert.equal(rows[1].target,'https://example.org/paper');
  assert.equal(rows[0].runtimeId,undefined);
});

test('an old process cannot appear to be running, and the activity history is bounded without inventing success',()=>{
  const record={activity:[{callId:'old',runtimeId:'older-runtime',status:'running'}]};
  assert.equal(readStepActivity(record)[0].status,'interrupted');
  assert.equal(record.activity[0].status,'running');
  interruptStepActivity(record);assert.equal(record.activity[0].status,'interrupted');
  for(let index=0;index<610;index++){
    const execution={callId:String(index),name:'metis_step',arguments:{action:'check'}};
    startStepActivity(record,execution,'proof');finishStepActivity(record,execution,{value:JSON.stringify({status:'needs_revision'}),isError:false});
  }
  assert.equal(readStepActivity(record).length,512);
  assert.equal(readStepActivity(record)[0].callId,'98');
  assert.ok(readStepActivity(record).every(item=>item.status==='needs_revision'));
});

test('a background job stays waiting until a real terminal job receipt arrives',()=>{
  const record={};
  const execution={callId:'launch',name:'pwsh',arguments:{description:'后台分析'}};
  startStepActivity(record,execution,'analysis');finishStepActivity(record,execution,{value:{jobId:'job-real'},isError:false});
  assert.equal(readStepActivity(record)[0].status,'waiting');
  const running={callId:'poll-running',name:'job_output',arguments:{job_id:'job-real'}};
  startStepActivity(record,running,'analysis');finishStepActivity(record,running,{value:{job:{id:'job-real',status:'running'}},isError:false});
  assert.ok(readStepActivity(record).every(item=>item.status==='waiting'));
  const output={callId:'poll',name:'job_output',arguments:{jobId:'job-real'}};
  startStepActivity(record,output,'analysis');finishStepActivity(record,output,{value:{job:{id:'job-real',status:'failed'}},isError:false});
  assert.ok(readStepActivity(record).every(item=>item.status==='failed'));
});

test('native completed nonzero exits and killed jobs are never presented as successful work',()=>{
  const record={};
  for(const id of ['nonzero','killed']){
    const launch={callId:id,name:'pwsh',arguments:{}};
    startStepActivity(record,launch,'analysis');finishStepActivity(record,launch,{value:{jobId:id},isError:false});
  }
  const list={callId:'list',name:'job_list',arguments:{}};
  startStepActivity(record,list,'analysis');finishStepActivity(record,list,{value:[{id:'nonzero',status:'completed',detail:'exit code: 7; sandbox info',finishedAt:Date.now()},{id:'killed',status:'killed'}],isError:false});
  const rows=readStepActivity(record);
  assert.equal(rows[0].status,'failed');assert.equal(rows[0].exitCode,7);assert.equal(rows[1].status,'cancelled');
  assert.equal(rows[2].status,'succeeded'); // Listing itself succeeded; the jobs did not.
  const check={callId:'check',name:'metis_step',arguments:{action:'check'}};
  startStepActivity(record,check,'analysis');finishStepActivity(record,check,{value:{status:'waiting-for-jobs',jobs:[{id:'pending'}]},isError:false});
  assert.equal(readStepActivity(record).at(-1).status,'deferred');
});

test('a refused tool body is recorded as not invoked, with no invented start time',()=>{
  const record={};
  finishStepActivity(record,{callId:'refused',name:'web_fetch',arguments:{url:'https://example.org'}},{isError:true,content:[{type:'text',text:'Policy denied this request'}]},'sources');
  const row=readStepActivity(record)[0];
  assert.equal(row.status,'refused');assert.equal(row.invoked,false);assert.equal(row.startedAt,null);assert.ok(row.finishedAt);
  assert.equal(row.stepId,'sources');assert.match(row.resultPreview,/denied/);
  const previous={activity:[{callId:'background',runtimeId:'old',status:'waiting'}]};
  assert.equal(readStepActivity(previous)[0].status,'unverified');
});

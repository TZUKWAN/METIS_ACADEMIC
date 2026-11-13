/** Separates executor identity from the user's immutable workflow identity. */
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
const sourceFiles=['step-goals.js','artifact-evidence.js','evidence-reader.py','execution-evidence.js','goal-review-session.js','unit-contract.js','step-evidence-state.js','mechanical-checks.js','no-progress.js','environment-contract.js','prepared-python-runner.py','system-runtime.js'];
let identity;
export function systemRuntime(){
  if(!identity){let buildId=typeof __metis_executor_build==='string'?__metis_executor_build:null;if(!buildId){const sourceHash=createHash('sha256');for(const file of sourceFiles)sourceHash.update(readFileSync(new URL('./'+file,import.meta.url)));buildId='source-'+sourceHash.digest('hex');}identity={protocol:'metis-system-v2',buildId,instanceId:globalThis.crypto.randomUUID(),loadedAt:new Date().toISOString()};}
  return {...identity};
}
export function addUsage(record,kind,entry){
  const cost=record.cost??={main:{requests:0,inputTokens:0,cacheReadTokens:0,outputTokens:0},review:{requests:0,inputTokens:0,cacheReadTokens:0,outputTokens:0},unknownUsageRequests:0};
  const total=cost[kind];if(!total)return;
  total.requests++;if(!entry.usage){cost.unknownUsageRequests++;return;}
  for(const key of ['inputTokens','cacheReadTokens','outputTokens'])if(typeof entry.usage[key]==='number')total[key]+=entry.usage[key];
}
export function recordedUsage(ledger){
  const record={};for(const item of ledger.records.values())if(item.kind==='usage'&&item.protocol==='native-usage-v2')addUsage(record,item.channel,item.request||{usage:item.usage});return record.cost||{main:{requests:0,inputTokens:0,cacheReadTokens:0,outputTokens:0},review:{requests:0,inputTokens:0,cacheReadTokens:0,outputTokens:0},unknownUsageRequests:0};
}

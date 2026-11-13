/** Content identity drives state; tool names, failed edits and todo lists do not. */
import {artifactFingerprint,evidenceFiles} from './artifact-evidence.js';
const key=path=>String(path).replaceAll('\\','/').toLowerCase();
export function artifactRefs(files){return files.map(file=>({path:file.path,sha256:file.sha256,bytes:file.bytes,fileCount:file.fileCount,manifestHash:file.manifestHash,protocol:'artifact-evidence-v2'}));}
export function sameDeliveredContent(item,files){
  const expected=item.verifiedArtifacts||item.delivery?.artifacts;
  if(!expected?.length)return true;
  if(files.some(file=>!file.exists))return false;
  for(const before of expected){
    const after=files.find(file=>key(file.path)===key(before.path));if(!after)return false;
    if(before.sha256&&before.sha256!==after.sha256)return false;
    if(before.protocol==='artifact-evidence-v2'&&before.manifestHash&&before.manifestHash!==after.manifestHash)return false;
  }
  // Historical directory submissions lacked content hashes. Preserve their
  // historical result, but explicitly baseline this runtime without pretending
  // its new fingerprint proves the old contents were identical.
  return true;
}
export function refreshContentState(item,captured){
  if(!['passed','submitted'].includes(item.status))return false;
  if(!sameDeliveredContent(item,captured.files)){
    item.status='needs_revision';item.review=null;item.reviewHash=null;item.contentChange={at:new Date().toISOString(),reason:'actual-related-artifact-content-changed'};return true;
  }
  if(!item.verifiedArtifacts){item.verifiedArtifacts=artifactRefs(captured.files);item.integrityBaseline={at:new Date().toISOString(),legacyDirectory:!!item.delivery?.artifacts?.some(file=>file.fileCount!==undefined&&file.protocol!=='artifact-evidence-v2')};}
  delete item.deferredRecheck;return false;
}
export function stableFailedEvidence(review,files){
  const failed=(review?.verdict?.checks||[]).filter(check=>!check.passed);if(!failed.length)return false;
  const index=new Map((review.evidenceIndex||[]).map(item=>[item.id,item])),actual=evidenceFiles(files).concat(files),used=[];
  for(const check of failed){
    const refs=Array.isArray(check.evidenceRefs)?check.evidenceRefs:String(check.evidenceRefs||'').split('\n');if(!refs.length)return false;
    for(const ref of refs){const old=index.get(ref.trim());if(!old||old.kind!=='actual-file'||!old.sha256)return false;const current=actual.find(file=>key(file.path)===key(old.path));if(!current?.exists||(current.sha256||current.manifestHash)!==old.sha256)return false;used.push(old.path);}
  }
  return used.length>0;
}
export function markVerified(item,captured){item.verifiedArtifacts=artifactRefs(captured.files);item.evidenceHash=artifactFingerprint(captured.files,item.payload?.text||'');delete item.contentChange;delete item.integrityBaseline;}
export function restoreInterruptedCheck(item){
  if(item.status!=='checking')return false;
  item.status='needs_recheck';item.recovery={at:new Date().toISOString(),from:'checking',reason:'previous-check-has-no-completed-receipt',usageKnown:!!item.lastReviewAttempt?.usage};item.review=null;return true;
}

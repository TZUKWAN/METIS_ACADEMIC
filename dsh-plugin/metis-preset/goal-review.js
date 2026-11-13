/** Receipt schema and lossless parsing for the real reviewer model. No default verdicts. */
export const goalReviewTool={name:'metis_goal_verdict',description:'Return the evidence-based goal review only. This records a verdict; it performs no external action.',parameters:{type:'object',additionalProperties:false,required:['passed','purposeSatisfied','deliverablesSatisfied','prohibitionsRespected','needsUserInput','checks','feedback'],properties:{passed:{type:'boolean'},purposeSatisfied:{type:'boolean'},deliverablesSatisfied:{type:'boolean'},prohibitionsRespected:{type:'boolean'},needsUserInput:{type:'boolean'},checks:{type:'array',minItems:1,items:{type:'object',additionalProperties:false,required:['criterion','passed','evidenceRefs'],properties:{criterion:{type:'string'},passed:{type:'boolean'},evidenceRefs:{type:'array',minItems:1,items:{type:'string'},description:'Only exact evidence IDs supplied in evidenceIndex, such as F1, C2, U3, T1, A1. Explain the reasoning in criterion, not in these IDs.'}}}},feedback:{type:'array',items:{type:'string'}}}}};
export function goalReviewEvidence(input){
  const index=[],files=input.files.map((file,position)=>{const evidenceId='F'+(position+1);index.push({id:evidenceId,kind:'actual-file',path:file.path,sha256:file.sha256||file.manifestHash});return {...file,evidenceId};});
  const nativeCalls=input.nativeCalls.map((call,position)=>{const evidenceId='C'+(position+1);index.push({id:evidenceId,kind:'actual-native-call',callId:call.callId,rootCallId:call.rootCallId});return {...call,evidenceId};});
  const userMessages=input.userMessages.map((message,position)=>{const evidenceId='U'+(position+1);index.push({id:evidenceId,kind:'actual-owner-input',eventIndex:message.index});return {...message,evidenceId};});
  if(input.text)index.push({id:'T1',kind:'submitted-text'});
  index.push({id:'A1',kind:'captured-native-call-audit',capturedCalls:nativeCalls.length,note:'仅指本次提供的实际原生调用记录，不假定未提供的事实。'});
  const ids=index.map(item=>item.id),tool=structuredClone(goalReviewTool);tool.parameters.properties.checks.items.properties.evidenceRefs.items.enum=ids;
  return {input:{...input,files,nativeCalls,userMessages,textEvidenceId:input.text?'T1':null,evidenceIndex:index},index,ids,tool};
}
export function reviewUsesKnownEvidence(verdict,ids){
  const known=new Set(ids);
  return verdict.checks.every(check=>{const references=check.evidenceRefs.split('\n').map(value=>value.trim()).filter(Boolean);return references.length>0&&references.every(id=>known.has(id));});
}
export function actualReviewReferences(input){
  const calls=input.nativeCalls.flatMap(call=>[call.callId,call.rootCallId,/^(.*):metis:[a-f0-9-]{36}$/i.exec(call.callId)?.[1]].filter(Boolean));
  return [...new Set(input.files.flatMap(file=>[file.path,file.sha256,file.manifestHash].filter(Boolean)).concat(calls,['nativeCalls'],input.text?['text']:[],input.userMessages.length?['userMessages']:[]))];
}
export function referencesActualEvidence(input,citation){
  const normalized=value=>value.replaceAll('/','\\').replace(/\\+/g,'\\').toLowerCase();
  return actualReviewReferences(input).some(reference=>citation.includes(reference)||/^[a-z]:[\\/]/i.test(reference)&&normalized(citation).includes(normalized(reference))||/^[a-f0-9]{64}$/i.test(reference)&&citation.toLowerCase().includes(reference.toLowerCase()));
}
export function parseGoalReview(raw){
  let value=typeof raw==='string'?JSON.parse(raw.trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'')):raw;
  if(value?.verdict&&value.passed===undefined)value=value.verdict;
  if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('核验回执必须为对象');
  for(const key of ['passed','purposeSatisfied','deliverablesSatisfied','prohibitionsRespected','needsUserInput'])if(typeof value[key]!=='boolean')throw new Error('核验回执缺少明确布尔字段：'+key);
  if(!Array.isArray(value.checks)||!value.checks.length)throw new Error('核验回执缺少逐项检查');
  const checks=value.checks.map((check,index)=>{
    if(!check||typeof check.criterion!=='string'||typeof check.passed!=='boolean')throw new Error('第'+(index+1)+'项核验缺少检查内容或明确判断');
    const evidenceRefs=Array.isArray(check.evidenceRefs)&&check.evidenceRefs.every(ref=>typeof ref==='string')?check.evidenceRefs.join('\n'):check.evidenceRefs;
    if(typeof evidenceRefs!=='string'||!evidenceRefs.trim())throw new Error('第'+(index+1)+'项核验缺少真实证据引用');
    return {criterion:check.criterion,passed:check.passed,evidenceRefs,...(typeof check.criterionId==='string'?{criterionId:check.criterionId}:{})};
  });
  const feedback=typeof value.feedback==='string'?[value.feedback]:value.feedback;
  if(!Array.isArray(feedback)||feedback.some(message=>typeof message!=='string'))throw new Error('核验回执缺少反馈文本');
  return {passed:value.passed,purposeSatisfied:value.purposeSatisfied,deliverablesSatisfied:value.deliverablesSatisfied,prohibitionsRespected:value.prohibitionsRespected,needsUserInput:value.needsUserInput,checks,feedback};
}

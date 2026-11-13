/** Actual terminal streams from native DSH results and METIS skill envelopes. */
const LIMIT=48000;
export function readCommandOutput(result){
  const seen=new Set();
  function visit(value,depth=0,callId=null){
    if(depth>7||value==null)return [];
    if(typeof value==='string'){
      if(value.length>512000||!/^\s*[\[{]/.test(value))return [];
      try{return visit(JSON.parse(value),depth+1,callId);}catch{return [];}
    }
    if(typeof value!=='object'||seen.has(value))return [];seen.add(value);
    const id=typeof value.callId==='string'?value.callId:callId,streams=[];
    for(const source of ['stdout','stderr']){
      const stream=value[source],body=typeof stream==='string'?stream:stream?.text;
      if(typeof body==='string'&&body)streams.push({source,text:body.slice(-LIMIT),callId:id});
    }
    if(streams.length)return streams;
    if(Array.isArray(value.chunks)){
      for(const chunk of value.chunks.slice(-256))if(['stdout','stderr','log'].includes(chunk?.channel)&&typeof chunk.text==='string')streams.push({source:chunk.channel,text:chunk.text.slice(-LIMIT),callId:id});
      if(streams.length)return streams;
    }
    // These are native DTO / boundedNativeResult / progressive-skills wrappers.
    // Do not walk arbitrary tool arguments, skill bodies or reasoning fields.
    for(const field of ['value','data','nativeCall','nativeResult','result']){
      const nested=visit(value[field],depth+1,id);if(nested.length)return nested;
    }
    if(typeof value.output==='string'&&value.output)return [{source:'log',text:value.output.slice(-LIMIT),callId:id}];
    for(const block of Array.isArray(value.content)?value.content:[]){
      if(block?.type!=='text')continue;const nested=visit(block.text,depth+1,id);if(nested.length)return nested;
    }
    if(value.truncated===true&&typeof value.nativeTool==='string'&&typeof value.preview==='string')return [{source:'log',text:value.preview.slice(-LIMIT),callId:id}];
    return [];
  }
  return visit(result);
}

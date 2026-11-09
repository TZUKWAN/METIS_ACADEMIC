/** Feature-detected bridges to the installed DSH executor; never calls tool bodies directly. */
export function toolWireView(tools,scope,toolSet){
  if(typeof tools.modeFor==='function'&&typeof tools.wireSchemas==='function')return {presentation:tools.modeFor(scope),...tools.wireSchemas(scope)};
  if(typeof tools.selectExecutor!=='function'||typeof tools.definitions!=='function')throw new Error('当前DSH工具执行器接口不受支持');
  const definitions=tools.definitions(scope,toolSet),description=tools.selectExecutor(scope).describe(definitions);
  if(!Array.isArray(description?.schemas))throw new Error('DSH工具执行器未提供真实展示目录');
  const names=description.schemas.map(tool=>tool.name),registered=new Set(definitions.map(tool=>tool.name));
  const presentation=names.length===1&&names[0]==='run_code'?'ptc':names.length===registered.size&&names.every(name=>registered.has(name))?'native':'executor:'+names.join(',');
  return {...description,presentation};
}
export async function executeNativeTool(ctx,input){
  const tools=ctx.tools||ctx.get('tools');
  if(typeof tools.selectExecutor!=='function')return tools.execute(input);
  const signal=input.signal||new AbortController().signal;
  if(input.parent!==undefined){
    // Use the selected Native/PTC executor's own complete policy pipeline.
    const pipeline=tools.selectExecutor(input.agent).pipeline;
    if(!pipeline?.prepare||!pipeline.dispatch||!pipeline.complete)throw new Error('当前DSH执行器没有可用的受控嵌套调用接口');
    const prepared=await pipeline.prepare({...input,signal});
    const outcome=prepared.kind==='dispatch'?await pipeline.dispatch(prepared.exec):prepared;
    return pipeline.complete(prepared.exec,outcome);
  }
  const batch=await tools.execute({agent:input.agent,toolSet:input.toolSet,signal,calls:[{type:'tool-call',id:input.callId,name:input.name,arguments:JSON.stringify(input.arguments)}]});
  const result=batch.results?.find(item=>item.callId===input.callId)?.result;
  if(!result)throw new Error('DSH执行器未返回该真实调用结果');
  return result;
}

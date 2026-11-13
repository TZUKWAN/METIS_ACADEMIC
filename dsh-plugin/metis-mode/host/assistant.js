/** Thin editor bridge. Native DSH owns the Agent loop, models and transcript. */
export function createComposerAssistant(ctx){
  const workspace=()=>{
    const value=ctx.get('metisComposerWorkspace');
    if(!value)throw Object.assign(new Error('DSH原生编排会话尚未就绪，请加载新版METIS模块'),{status:503});
    return value;
  };
  return {
    capability(){const value=ctx.get('metisComposerWorkspace'),toolInspection=value?.protocolVersion===4&&value.toolInspection===true;return {version:value?.protocolVersion||0,capabilityRevision:value?.capabilityRevision||0,compositionSource:'dsh-standard',transport:'dsh-native-session',nativeConversation:true,toolInspection,configurationWorkspace:true,sharedDraft:value?.sharedDraft===true,available:toolInspection&&!!ctx.get('sessionController')?.resolveAgent,scope:value?.scope||null};},
    open:body=>workspace().open(body),
    bind:body=>workspace().bind(body),
    sync:body=>workspace().sync(body),
    state:(id,afterRevision,afterDraftHash)=>workspace().state(id,afterRevision,afterDraftHash),
    reset:body=>workspace().reset(body),
    dismiss:body=>workspace().dismiss(body),
    saveProposal:body=>{
      const value=workspace();
      if(typeof value.saveProposal!=='function')throw Object.assign(new Error('保存服务尚未加载新版METIS，请重新进入工作流页'),{status:503});
      return value.saveProposal(body);
    },
  };
}

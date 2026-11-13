/** Preserve real session selections during workflow-only handoffs. */
const service=(registry,agent,name)=>registry.serviceFor?.(agent,name)||agent.ctx.get(name);
export function captureProjectSessionSettings(registry,agent){
  const sandbox=service(registry,agent,'sandboxPolicy'),approval=service(registry,agent,'approval'),permissions=service(registry,agent,'permissionPresets');
  const mode=sandbox?.resolve({session:agent.session})?.mode,policy=approval?.effectivePolicy(agent.session);
  if(!['read-only','workspace-write','danger-full-access'].includes(mode)||!['ask','never'].includes(policy))throw new Error('无法确认原会话实际权限，未按新会话默认值替换');
  const selected=agent.model?.current?.();
  return {model:selected?{provider:selected.provider,model:selected.model,...(selected.reasoningEffort!==undefined?{reasoningEffort:selected.reasoningEffort}:{})}:null,
    permission:{mode,approval:policy,preset:permissions?.current(agent.session)||null},source:'actual-native-session-settings'};
}
export function applyProjectSessionSettings(registry,agent,settings){
  if(!settings)return;
  const permissions=service(registry,agent,'permissionPresets'),sandbox=service(registry,agent,'sandboxPolicy'),approval=service(registry,agent,'approval');
  if(!sandbox||!approval)throw new Error('新会话缺少原生权限服务，原项目尚未切换');
  if(settings.model){if(typeof agent.model?.select!=='function')throw new Error('新会话缺少原生模型选择接口');agent.model.select(settings.model);}
  const {mode,approval:policy,preset}=settings.permission;
  if(preset&&preset!=='custom'){if(!permissions)throw new Error('新会话无法恢复原权限预设');permissions.set(agent.session,preset);}
  // These are the documented canonical event contracts used by DSH's exported
  // setSandboxMode/setApprovalPolicy. They apply the captured effective values,
  // including a custom combination, without changing any user default.
  if(sandbox.resolve({session:agent.session}).mode!==mode)agent.session.append('sandbox/mode',{mode});
  if(approval.effectivePolicy(agent.session)!==policy)agent.session.append('approval/policy',{policy});
  if(sandbox.resolve({session:agent.session}).mode!==mode||approval.effectivePolicy(agent.session)!==policy)throw new Error('原生权限恢复未被确认，原项目尚未切换');
}

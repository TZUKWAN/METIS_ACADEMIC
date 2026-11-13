/** Research scene: original METIS graphics driven only by persisted project facts. */
export const stepStateLabels={not_started:'未开始',working:'处理中',checking:'核验中',needs_revision:'待改进',needs_recheck:'待复核',blocked:'等待处理',passed:'待交付',submitted:'已交付'};
export function researchSceneState(project,viewedId=null){
  const steps=Array.isArray(project?.steps)?project.steps:[],activities=Array.isArray(project?.activity)?project.activity:[];
  const activeCalls=activities.filter(item=>item.status==='running');
  const recent=activities.at(-1)||null;
  const awaiting=project?.revision?.phase==='awaiting_downstream'||project?.revision?.decision?.dispatch==='pending';
  const pending=activities.findLast(item=>item.jobId&&['waiting','unverified'].includes(item.status));
  const nativeRunning=project?.execution?.running===true;
  const activeIds=new Set(activeCalls.map(call=>call.stepId).filter(Boolean));
  const delivered=steps.filter(step=>step.status==='submitted').length;
  const needsAttention=steps.filter(step=>['needs_revision','needs_recheck','blocked'].includes(step.status));
  const failed=!nativeRunning&&!activeCalls.length&&['failed','refused','needs_revision'].includes(recent?.status);
  const complete=steps.length>0&&delivered===steps.length;
  const phase=project?.status!=='ready'?'unavailable':activeCalls.length?'running':awaiting?'waiting':nativeRunning?'processing':pending?'waiting':failed||needsAttention.length?'attention':recent?.status==='cancelled'?'stopped':complete?'completed':'ready';
  const headline=phase==='unavailable'?'正在读取项目':activeCalls.length?activeCalls.at(-1).label:awaiting?'请选择后续步骤是否重做':nativeRunning?'研究助手正在处理':pending?.status==='unverified'?'上次后台任务状态待确认':pending?'等待后台任务回执':failed?'最近调用需要处理':needsAttention.length?'当前成果需要核验或改进':phase==='stopped'?'本轮调用已停止':complete?'全部步骤已交付':recent?.status==='interrupted'?'上次执行已中断':'等待开始或继续研究';
  const files=new Set();
  for(const step of steps)for(const artifact of step.delivery?.artifacts||[])if(artifact.availability==='file')files.add(artifact.path);
  return {
    id:project?.id||'',name:project?.name||'',modeName:project?.modeName||'',phase,headline,
    target:activeCalls.at(-1)?.target||'',activeCalls,activities,recent,
    delivered,total:steps.length,files:files.size,attention:needsAttention.length,
    nodes:steps.map((step,index)=>({id:step.id,title:step.title,index,status:step.status,
      purpose:step.purpose||'',expected:step.expected||'',delivery:step.delivery||null,feedback:step.feedback||[],
      label:step.delivery?.manuallyEditedAt&&step.status!=='submitted'?'手动修改待核验':stepStateLabels[step.status]||'状态未知',
      active:activeIds.has(step.id),viewed:step.id===viewedId,loop:step.loop===true,
      recentCall:activities.findLast(item=>item.stepId===step.id)||null,
      recentChecks:activities.filter(item=>item.stepId===step.id&&item.kind==='review'&&item.invoked!==false).length})),
  };
}


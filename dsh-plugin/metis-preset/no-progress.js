/** Repeated identical failures are run-level stalls, not revoked deliveries. */
export function noteRepeatedFailure(item,{key,ownerCount,reason}){
  const previous=item.lastRepeatedFailure,count=previous?.key===key&&previous.ownerCount===ownerCount?(previous.count||0)+1:1;
  if(previous?.key!==key||previous?.ownerCount!==ownerCount)delete item.noProgress;
  item.lastRepeatedFailure={key,ownerCount,count};
  if(count>=2)item.noProgress={key,ownerCount,at:new Date().toISOString(),reason:'相同操作与证据重复失败，已停止本轮空转：'+reason+'。原交付状态不因此撤销；请处理具体原因后继续。'};
  return !!item.noProgress;
}

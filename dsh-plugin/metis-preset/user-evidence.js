/** Owner-authored input only; platform notices and delegated text grant no authority. */
export function isOwnerUserEvent(event){
  const source=event?.data?.source;
  return event?.type==='user/message'&&!!source&&['user','user-rpc'].includes(source.kind)&&source.principal===undefined;
}
export function ownerUserMessages(agent){
  return agent.session.snapshotEvents().flatMap((event,index)=>isOwnerUserEvent(event)?[{index,text:(event.data.content||[]).filter(block=>block.type==='text').map(block=>block.text).join('\n')}]:[]);
}
export function ownerUserText(agent){return ownerUserMessages(agent).map(message=>message.text).join('\n');}

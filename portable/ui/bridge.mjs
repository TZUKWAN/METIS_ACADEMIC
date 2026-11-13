let sequence=0,initialization,hostAvailable=false;
const pending=new Map();
if(typeof window!=='undefined')window.addEventListener('message',event=>{
  if(event.source!==window.parent||!event.data||typeof event.data!=='object')return;
  const message=event.data,entry=pending.get(message.id);if(!entry)return;clearTimeout(entry.timer);pending.delete(message.id);message.error?entry.reject(new Error(message.error.message||'宿主请求失败')):entry.resolve(message.result);
});
function rpc(method,params,timeout=30000){
  const id=++sequence;return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{pending.delete(id);reject(new Error('宿主没有响应 '+method));},timeout);pending.set(id,{resolve,reject,timer});window.parent.postMessage({jsonrpc:'2.0',id,method,params},'*');});
}
export async function initialize(){
  if(window.__METIS_LOCAL__)return {transport:'loopback'};
  return initialization||= (async()=>{
    if(window.parent===window)throw new Error('请通过宿主 metis_open 返回的本机链接打开工作台');
    const result=await rpc('ui/initialize',{protocolVersion:'2026-01-26',appInfo:{name:'METIS',version:'1.7.0'},appCapabilities:{availableDisplayModes:['inline','fullscreen']}},10000);
    hostAvailable=true;window.parent.postMessage({jsonrpc:'2.0',method:'ui/notifications/initialized'},'*');return result;
  })();
}
export async function request(method,args={}){
  await initialize();
  if(window.__METIS_LOCAL__){
    const {address,token}=window.__METIS_LOCAL__,response=await fetch(address+'/api',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({method,args})}),result=await response.json();if(!response.ok||result.error)throw new Error(result.error||'请求失败');return result.value;
  }
  const result=await rpc('tools/call',{name:'metis_ui_request',arguments:{method,args}},180000);
  if(result.isError)throw new Error(result.structuredContent?.error||result.content?.find(c=>c.type==='text')?.text||'工具调用失败');
  return result.structuredContent?.value??JSON.parse(result.content.find(c=>c.type==='text').text);
}
export async function hostMessage(text){
  await initialize();if(!hostAvailable)throw new Error('当前是独立工作台。请回到 ZCode 主对话继续使用 METIS；工具和项目已共享。');
  return rpc('ui/message',{role:'user',content:[{type:'text',text}]});
}

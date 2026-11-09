/** Catalog is always provisioned; runtime activation occurs after Host settlement. */
export function createCatalogStartup(ctx,activate){
  const controller=new AbortController();let task=null,timer=null,stopped=false,lastLogged=null;
  let state={phase:'pending',ready:false,attempt:0,error:null,updatedAt:new Date().toISOString()};
  const aborted=new Promise((_,reject)=>controller.signal.addEventListener('abort',()=>reject(new Error('METIS运行时正在卸载')),{once:true}));
  aborted.catch(()=>{});
  const wait=promise=>Promise.race([Promise.resolve(promise),aborted]);
  function publish(next){state={...state,...next,updatedAt:new Date().toISOString()};}
  function run(){
    if(stopped)return Promise.reject(new Error('METIS运行时已卸载'));
    if(task)return task;
    if(timer){clearTimeout(timer);timer=null;}
    publish({phase:'starting',ready:false,attempt:state.attempt+1});
    task=Promise.resolve().then(async()=>{
      try{
        await wait(ctx.loader.await());if(stopped)throw new Error('METIS运行时已卸载');
        const result=await wait(activate(wait));if(stopped)throw new Error('METIS运行时已卸载');
        publish({phase:'ready',ready:true,error:null,...result});lastLogged=null;
        try{ctx.emit('settings/document-updated','agent-preset-registry');}catch{}
        return {...state};
      }catch(error){
        if(!stopped){
          publish({phase:'recovering',ready:false,error:error.message});
          if(lastLogged!==error.message){lastLogged=error.message;ctx.logger.warn('METIS原生工具正在恢复，配置服务保持可用：'+error.message);}
          timer=setTimeout(()=>{timer=null;void run().catch(()=>{});},Math.min(30000,[1000,3000,10000][Math.min(2,state.attempt-1)]));timer.unref?.();
        }
        throw error;
      }finally{task=null;}
    });
    task.catch(()=>{});return task;
  }
  function ensure(force=false){if(stopped)return Promise.reject(new Error('METIS运行时已卸载'));return state.ready&&!force?Promise.resolve({...state}):run();}
  function schedule(){if(stopped||task||timer)return;timer=setTimeout(()=>{timer=null;void run().catch(()=>{});},0);timer.unref?.();}
  function stop(){if(stopped)return;stopped=true;if(timer)clearTimeout(timer);timer=null;controller.abort();}
  ctx.effect(()=>stop,'metis: stop deferred preset startup');
  return {ensure,schedule,wait,stop,state:()=>({...state}),invalidate(){publish({phase:'pending',ready:false});schedule();}};
}

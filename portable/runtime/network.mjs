import {EnvHttpProxyAgent,setGlobalDispatcher} from 'undici';

// Respect the host's proxy environment; never disable TLS verification or copy credentials.
export function configureNetwork(){
  if(process.env.HTTPS_PROXY||process.env.https_proxy||process.env.HTTP_PROXY||process.env.http_proxy||process.env.ALL_PROXY){
    const agent=new EnvHttpProxyAgent({...(process.env.ALL_PROXY&&!process.env.HTTP_PROXY&&!process.env.HTTPS_PROXY?{httpProxy:process.env.ALL_PROXY,httpsProxy:process.env.ALL_PROXY}:{})});setGlobalDispatcher(agent);return agent;
  }
  return null;
}

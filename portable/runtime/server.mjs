import {Server} from '@modelcontextprotocol/sdk/server/index.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import {ListToolsRequestSchema,CallToolRequestSchema,ListResourcesRequestSchema,ReadResourceRequestSchema} from '@modelcontextprotocol/sdk/types.js';
import {createServer} from 'node:http';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import {readFileSync,existsSync,statSync,writeFileSync} from 'node:fs';
import {dirname,join,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {MetisCore,inside,hash,fail} from './core.mjs';
import {NativeSessions} from './codex.mjs';
import {definitions,createDispatcher} from './tools.mjs';
import {configureNetwork} from './network.mjs';

const network=configureNetwork();
const here=dirname(fileURLToPath(import.meta.url)),core=new MetisCore();
const token=randomBytes(32).toString('hex'),uiFile=join(here,'../ui/index.html');
const uiUri='ui://metis/workbench.html',mime='text/html;profile=mcp-app';
let address=null,dispatch,native;
const json=(res,status,value)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
async function uiRequest(method,args={}){
  switch(method){
    case 'snapshot':return core.snapshot();
    case 'config-edit':return core.configEdit({...args,actor:'manual'});
    case 'config-reload':return core.reloadDraft(args);
    case 'project':return core.project(args.projectId);
    case 'models':return native.models();
    case 'sessions':return core.list('sessions').map(({instructions,...s})=>s);
    case 'session-create':if(core.session!=='codex')throw fail('此宿主使用原生主对话。请通过 METIS 技能和工具继续。',409);return native.create(args);
    case 'session-send':return native.send(args);
    case 'session-stop':return native.stop(args);
    case 'session-read':{const {instructions,...record}=core.read('sessions',args.sessionId);const live=native.runtimes.get(args.sessionId);return {...record,pendingRequests:live?[...live.requests].map(([id,r])=>({id,method:r.method,params:r.params})):[]};}
    case 'session-respond':return native.approve(args);
    case 'file-read':{
      const p=core.project(args.projectId),file=inside(p.folder,args.path),size=statSync(file).size;if(size>16*1024*1024)throw fail('预览文件超过16MiB，请在本机文档软件打开',413);const bytes=readFileSync(file),extension=extname(file).toLowerCase();return {path:args.path,extension,size,sha256:hash(bytes),...(['.md','.txt','.csv','.json','.html','.py','.js'].includes(extension)?{text:bytes.toString('utf8')}:{base64:bytes.toString('base64')})};
    }
    case 'file-save':{
      return core.exclusive(()=>{const p=core.project(args.projectId);if(p.execution?.running)throw fail('项目正在执行，暂不覆盖成果文件',409);const file=inside(p.folder,args.path);if(!['.md','.txt','.csv','.json'].includes(extname(file).toLowerCase()))throw fail('此处支持直接编辑 MD/TXT/CSV/JSON；其他格式可下载后用文档软件修改');if(typeof args.text!=='string'||Buffer.byteLength(args.text)>16*1024*1024)throw fail('文档过长');if(hash(readFileSync(file))!==args.sha256)throw fail('文件已被修改，保留当前编辑后重新读取',409);writeFileSync(file,args.text,'utf8');for(const step of p.steps)if(step.delivery?.artifacts.some(a=>a.path===args.path))step.status='needs_recheck';core.put('projects',p);return {saved:true,sha256:hash(args.text)};});
    }
    default:return dispatch(method,args);
  }
}
const http=createServer(async(req,res)=>{
  res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Cache-Control','no-store');
  const url=new URL(req.url,'http://127.0.0.1'),provided=req.headers.authorization?.replace(/^Bearer /,'')||url.searchParams.get('token')||'';
  const authorized=Buffer.byteLength(provided)===token.length&&timingSafeEqual(Buffer.from(provided),Buffer.from(token));
  if(!authorized)return json(res,401,{error:'METIS 本机工作台需要本次会话凭证'});
  if(req.headers.origin&&req.headers.origin!==address)return json(res,403,{error:'来源不属于本机 METIS 工作台'});
  try{
    if(req.method==='GET'&&url.pathname==='/'){
      const html=readFileSync(uiFile,'utf8').replace('/*METIS_BOOT*/','window.__METIS_LOCAL__='+JSON.stringify({address,token})+';');res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; object-src blob:; frame-src blob:; base-uri 'none'; frame-ancestors 'none'"});return res.end(html);
    }
    if(req.method!=='POST'||url.pathname!=='/api')throw fail('接口不存在',404);
    const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>2*1024*1024)throw fail('请求过大',413);chunks.push(chunk);}const body=JSON.parse(Buffer.concat(chunks).toString('utf8'));const result=await uiRequest(body.method,body.args);return json(res,200,{value:result});
  }catch(error){json(res,error.status||500,{error:error.message});}
});
http.listen(0,'127.0.0.1',()=>{address='http://127.0.0.1:'+http.address().port;});
await new Promise(resolve=>{if(address)resolve();else http.once('listening',resolve);});
dispatch=createDispatcher(core,{open:()=>({url:address+'/?token='+token,host:core.session,configurationHome:process.env.DSH_HOME,independentReview:{backend:'codex-native',requires:'Installed and signed-in local Codex; readonly independent check, primary host model unchanged'},message:'支持 MCP Apps 时可直接使用内嵌界面；否则打开此本机链接。原生宿主工具权限保持不变。达标核验使用本机 Codex 独立只读会话。'}),check:args=>native.check(args)});
native=new NativeSessions(core,{tools:definitions.filter(t=>t.name!=='metis_open'),invoke:dispatch});

const mcp=new Server({name:'metis',version:'1.7.1'},{capabilities:{tools:{},resources:{}}});
const appTool={name:'metis_ui_request',description:'METIS 工作台专用桥接接口。',inputSchema:{type:'object',properties:{method:{type:'string'},args:{type:'object'}},required:['method'],additionalProperties:false},_meta:{ui:{resourceUri:uiUri,visibility:['app']}}};
mcp.setRequestHandler(ListToolsRequestSchema,()=>({tools:[...definitions.map(t=>t.name==='metis_open'?{...t,_meta:{ui:{resourceUri:uiUri},'openai/outputTemplate':uiUri}}:t),appTool]}));
mcp.setRequestHandler(CallToolRequestSchema,async({params})=>{
  try{const value=params.name==='metis_ui_request'?await uiRequest(params.arguments?.method,params.arguments?.args):await dispatch(params.name,params.arguments);return {content:[{type:'text',text:JSON.stringify(value)}],structuredContent:{value}};}catch(error){return {isError:true,content:[{type:'text',text:error.message}],structuredContent:{error:error.message,status:error.status||500}};}
});
mcp.setRequestHandler(ListResourcesRequestSchema,()=>({resources:[{uri:uiUri,name:'METIS',description:'离子回路科研工作台：模式、技能、研究项目、交付与原生对话',mimeType:mime}]}));
mcp.setRequestHandler(ReadResourceRequestSchema,({params})=>{if(params.uri!==uiUri)throw fail('资源不存在',404);return {contents:[{uri:uiUri,mimeType:mime,text:readFileSync(uiFile,'utf8'),_meta:{ui:{prefersBorder:false,csp:{connectDomains:[],resourceDomains:[]}}}}]};});
await mcp.connect(new StdioServerTransport());
let shutdown;
function cleanup(){return shutdown||=(async()=>{native.close();http.closeAllConnections();await Promise.allSettled([new Promise(resolve=>http.close(resolve)),mcp.close(),network?.close()]);process.stdin.pause();})();}
process.once('SIGTERM',cleanup);process.once('SIGINT',cleanup);process.stdin.once('end',cleanup);

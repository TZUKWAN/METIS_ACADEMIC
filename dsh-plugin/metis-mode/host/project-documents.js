/** METIS document adapter. Reads only registered project artifacts, with hash-guarded edits. */
import {spawn,spawnSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdtempSync,unlinkSync,rmdirSync,readdirSync} from 'node:fs';
import {join,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {tmpdir} from 'node:os';
import {marked} from './document-vendor/marked.esm.js';

const helper=fileURLToPath(new URL('./document-files.py',import.meta.url));
const editable=new Set(['.docx','.pptx','.xlsx','.pdf','.md','.txt']);
const office=new Set(['.docx','.pptx','.xlsx','.doc','.ppt','.xls']);
const failure=(message,status=400)=>Object.assign(new Error(message),{status});
const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export function markdownPreview(text){
  const renderer=new marked.Renderer();renderer.html=token=>escape(token.text);renderer.image=token=>escape(token.text||'图片');
  const body=marked.parse(text.replace(/^\uFEFF/,''),{renderer});
  return '<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; form-action \'none\'; base-uri \'none\'"><style>body{font:15px/1.8 system-ui,sans-serif;max-width:850px;margin:32px auto;padding:0 24px;color:#232a31;background:white;overflow-wrap:anywhere}pre,code{background:#f2f4f7;border-radius:4px}pre{padding:14px;overflow:auto}table{border-collapse:collapse}td,th{border:1px solid #dce1e6;padding:5px 12px}blockquote{margin-left:0;padding-left:16px;border-left:3px solid #dce1e6}img{max-width:100%}</style>'+body+'</html>';
}
export function createProjectDocuments(ctx,projects){
  let python=null;const children=new Set(),controller=new AbortController();
  ctx.effect(()=>()=>{controller.abort();for(const child of children)child.kill();},'metis: document operations');
  function interpreter(){
    if(python)return python;
    const candidates=[process.env.METIS_DOCUMENT_PYTHON,ctx.get('metisAcademicEnvironment')?.python,'python'].filter(Boolean);
    for(const command of [...new Set(candidates)]){
      const probe=spawnSync(command,['-c','import docx,pptx,openpyxl,fitz; print("METIS_DOCUMENT_READY")'],{encoding:'utf8',windowsHide:true,timeout:12000,env:{...process.env,PYTHONIOENCODING:'utf-8'}});
      if(probe.status===0&&probe.stdout.includes('METIS_DOCUMENT_READY'))return python=command;
    }
    throw failure('文档编辑环境缺少 python-docx、python-pptx、openpyxl 或 PyMuPDF，未伪报可编辑',503);
  }
  function run(args,payload){
    return new Promise((resolve,reject)=>{
      if(controller.signal.aborted){reject(failure('文档服务已停止',503));return;}
      const child=spawn(interpreter(),[helper,...args],{windowsHide:true,env:{...process.env,PYTHONIOENCODING:'utf-8'}});children.add(child);
      let bytes=0,stdout='',stderr='',settled=false;
      const timer=setTimeout(()=>{child.kill();finish(failure('文档操作超时，未覆盖原文件',504));},60000);
      function finish(error,value){if(settled)return;settled=true;clearTimeout(timer);children.delete(child);if(error)reject(error);else resolve(value);}
      child.stdout.on('data',chunk=>{bytes+=chunk.length;if(bytes>16*1024*1024){child.kill();finish(failure('文档内容超过编辑读取上限',413));}else stdout+=chunk;});
      child.stderr.on('data',chunk=>{stderr=(stderr+chunk).slice(-1200);});child.on('error',error=>finish(error));
      child.on('close',code=>{if(settled)return;let result;try{result=JSON.parse(stdout);}catch{finish(failure('文档解析未返回有效结果：'+stderr,500));return;}if(code!==0||!result.ok)finish(failure(result.error||'文档操作失败'));else finish(null,result);});
      child.stdin.on('error',()=>{});child.stdin.end(payload?JSON.stringify(payload):'');
    });
  }
  async function withCopy(source,operation){
    const folder=mkdtempSync(join(tmpdir(),'metis-document-')),path=join(folder,'source'+extname(source.name)),output=join(folder,'edited'+extname(source.name));
    try{writeFileSync(path,source.bytes,{mode:0o600});return await operation(path,output);}
    finally{for(const name of readdirSync(folder))unlinkSync(join(folder,name));rmdirSync(folder);}
  }
  async function load(id,stepId,index){
    const source=await projects().documentSource(id,stepId,index),extension=extname(source.name).toLowerCase();
    if(!editable.has(extension)&&!office.has(extension))throw failure('此文件可下载；暂不支持内嵌编辑此格式',415);
    const result=editable.has(extension)?await withCopy(source,path=>run(['read',path])):{kind:'legacy',notice:'旧版二进制Office文件支持预览；请让研究助手转换成DOCX、PPTX或XLSX后编辑。'};
    return {...result,name:source.name,path:source.path,extension,version:source.version,editable:editable.has(extension)&&result.kind!=='readonly'&&!(result.kind==='paragraphs'&&!result.blocks?.length),changedSinceDelivery:source.changedSinceDelivery,requiresRecheck:source.step.delivery.requiresRecheck};
  }
  async function save(request){
    if(Object.keys(request).some(key=>!['id','stepId','index','expectedVersion','edits','content'].includes(key)))throw failure('文档保存参数无效');
    const source=await projects().documentSource(request.id,request.stepId,request.index);
    if(source.version!==request.expectedVersion)throw failure('文件已被AI或其他编辑修改，未覆盖；请重新打开',409);
    if(!editable.has(extname(source.name).toLowerCase()))throw failure('此格式只支持预览',415);
    const bytes=await withCopy(source,async(path,output)=>{await run(['edit',path,output],request);return readFileSync(output);});
    return projects().commitDocument(request,bytes);
  }
  async function preview(id,stepId,index,expectedVersion){
    const source=await projects().documentSource(id,stepId,index),extension=extname(source.name).toLowerCase();
    if(source.version!==expectedVersion)throw failure('文档已更新，请重新打开以预览最新内容',409);
    if(extension==='.pdf')return {bytes:source.bytes,mime:'application/pdf'};
    if(extension==='.md')return {bytes:Buffer.from(markdownPreview(source.bytes.toString('utf8'))),mime:'text/html; charset=utf-8'};
    if(extension==='.txt')return {bytes:source.bytes,mime:'text/plain; charset=utf-8'};
    if(!office.has(extension))throw failure('此格式暂无页面预览',415);
    const provider=ctx.get('officeToPdf');if(!provider?.convert)throw failure('DSH原生Office预览服务尚未就绪',503);
    const result=await provider.convert({extension:extension.slice(1),priority:'foreground',source:{key:source.project.sessionId+':'+source.path,version:source.version,bytes:source.bytes.length,read:async()=>({bytes:source.bytes,version:source.version})},signal:controller.signal});
    return {bytes:Buffer.from(result.pdf),mime:'application/pdf',missingFonts:result.missingFonts||[]};
  }
  async function pages(id,stepId,index,version,page=null){
    if(page!==null&&(!Number.isSafeInteger(page)||page<0))throw failure('文档页码无效');
    const pdf=await preview(id,stepId,index,version);
    if(pdf.mime!=='application/pdf')throw failure('此文件使用文本预览');
    return withCopy({name:'preview.pdf',bytes:pdf.bytes},async(path,output)=>{
      const metadata=await run(page===null?['pages',path]:['render',path,output,String(page)]);
      return page===null?{...metadata,missingFonts:pdf.missingFonts||[]}:{bytes:readFileSync(output),mime:'image/png'};
    });
  }
  return {load,save,preview,pages};
}

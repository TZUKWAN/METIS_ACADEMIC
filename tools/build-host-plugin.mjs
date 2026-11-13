import {existsSync,readFileSync,writeFileSync,mkdirSync,copyFileSync,readdirSync,statSync} from 'node:fs';
import {resolve,join,dirname,relative} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';

const repo=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const modules=(process.env.METIS_BUILD_MODULES||join(repo,'node_modules')).split(';').filter(Boolean).map(value=>resolve(value));
if(!modules.length)throw new Error('设置 METIS_BUILD_MODULES 为构建依赖的 node_modules 路径（多个用分号分隔）。不会改动宿主依赖。');
const locate=name=>{for(const directory of modules){const file=join(directory,...name.split('/'));if(existsSync(file))return file;}throw new Error('构建依赖缺失：'+name);};
const esbuild=await import(pathToFileURL(join(locate('esbuild'),'lib/main.js')));
const dest=join(repo,'host-plugins/metis'),mkdir=path=>mkdirSync(path,{recursive:true});
const put=(name,value)=>{const path=join(dest,name);mkdir(dirname(path));writeFileSync(path,typeof value==='string'?value:JSON.stringify(value,null,2)+'\n');};
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
mkdir(dest);
const sources=new Set();
function copyModule(file){
  if(sources.has(file))return;sources.add(file);const text=readFileSync(file,'utf8'),path=relative(repo,file);put('shared/'+path,text);
  for(const match of text.matchAll(/(?:from\s*|import\s*)['"](\.[^'"]+)['"]/g)){const imported=resolve(dirname(file),match[1]);if(!imported.startsWith(join(repo,'dsh-plugin/metis-preset')))throw new Error('不应跨入 DSH 宿主模块：'+imported);copyModule(imported);}
}
for(const name of ['configuration','profiles','workspace-edits','draft-merge','skill-library','skill-packages','modes'])copyModule(join(repo,'dsh-plugin/metis-preset',name+'.js'));
put('shared/package.json',{type:'module',private:true});
function copyTree(source,target){for(const entry of readdirSync(source,{withFileTypes:true})){const input=join(source,entry.name),output=join(target,entry.name);if(entry.isSymbolicLink())throw new Error('发行体不能跟随链接：'+input);if(entry.isDirectory()){mkdir(output);copyTree(input,output);}else{mkdir(dirname(output));copyFileSync(input,output);}}}
copyTree(join(repo,'src/metis_academic/skill_defs'),join(dest,'shared/src/metis_academic/skill_defs'));
const library=join(repo,'dsh-plugin/metis-preset/library'),pointer=JSON.parse(readFileSync(join(library,'index.json'),'utf8'));
const catalogBytes=readFileSync(join(library,'catalogs',pointer.catalogHash+'.json'));if(sha(catalogBytes)!==pointer.catalogHash)throw new Error('技能目录摘要不符');const catalog=JSON.parse(catalogBytes);
put('shared/dsh-plugin/metis-preset/library/index.json',pointer);put('shared/dsh-plugin/metis-preset/library/catalogs/'+pointer.catalogHash+'.json',catalogBytes.toString());
for(const id of new Set(catalog.entries.map(skill=>skill.source.bundle))){const file=join(library,'records',id+'.json'),bytes=readFileSync(file);if(sha(bytes)!==id)throw new Error('资源清单摘要不符');put('shared/dsh-plugin/metis-preset/library/records/'+id+'.json',bytes.toString());}
// Catalog metadata and hashes only. Do not redistribute 875 MiB of upstream code/bodies.
put('shared/dsh-plugin/metis-preset/library/NOTICE.md',readFileSync(join(library,'NOTICE.md'),'utf8'));
const serverBuild=await esbuild.build({absWorkingDir:repo,entryPoints:[join(repo,'portable/runtime/server.mjs')],outfile:join(dest,'runtime/server.mjs'),bundle:true,metafile:true,platform:'node',format:'esm',target:'node22',nodePaths:modules,banner:{js:"import {createRequire as __metisRequire} from 'node:module'; const require=__metisRequire(import.meta.url);"},logLevel:'warning'});
for(const name of ['core.mjs','codex.mjs','tools.mjs','network.mjs'])put('runtime/'+name,readFileSync(join(repo,'portable/runtime',name),'utf8'));
const built=await esbuild.build({absWorkingDir:repo,entryPoints:[join(repo,'portable/ui/index.jsx')],outdir:join(dest,'ui'),bundle:true,metafile:true,write:false,format:'iife',platform:'browser',target:'es2022',nodePaths:modules,minify:true,logLevel:'warning',define:{'process.env.NODE_ENV':'"production"'}});
const js=built.outputFiles.find(file=>file.path.endsWith('.js')).text.replace(/<\/script/gi,'<\\/script'),css=built.outputFiles.find(file=>file.path.endsWith('.css'))?.text||'';
put('ui/index.html','<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>METIS · 离子回路研究工作台</title><style>'+css+'</style></head><body><div id="root"></div><script>/*METIS_BOOT*/</script><script>'+js+'</script></body></html>');
const description='与 AI 共建研究流程，按步骤调用成熟技能，在离子回路现场追踪真实研究与交付。';
put('plugin.json',{$schema:'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json',name:'metis',version:'1.7.0',description});
const codexMcp={mcpServers:{metis:{type:'stdio',command:'node',args:['${PLUGIN_ROOT}/runtime/server.mjs'],env:{METIS_HOST:'codex'}}}};
put('mcp.json',{$schema:'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json',...codexMcp});put('.mcp-codex.json',codexMcp);
const zcodeMcp={mcpServers:{metis:{command:'node',args:['${ZCODE_PLUGIN_ROOT}/runtime/server.mjs'],env:{METIS_HOST:'zcode'}}}};put('.mcp-zcode.json',zcodeMcp);
put('.codex-plugin/plugin.json',{name:'metis',version:'1.7.0',description,license:'Apache-2.0',skills:'./skills/',mcpServers:'./.mcp-codex.json',requires_local_executor:true,interface:{displayName:'METIS',shortDescription:'AI 流程编排与可视化科研工作台',brandColor:'#e9ad71',logo:'./assets/metis.svg',composerIcon:'./assets/metis.svg',defaultPrompt:'使用 METIS 打开研究工作台'}});
put('.zcode-plugin/plugin.json',{name:'metis',version:'1.7.0',description,license:'Apache-2.0',skills:'./skills/',commands:'./commands/',mcpServers:'./.mcp-zcode.json'});
put('package.json',{name:'metis-host-plugin',version:'1.7.0',private:true,type:'module',license:'Apache-2.0',engines:{node:'>=22.19'},scripts:{start:'node runtime/server.mjs'}});
put('assets/metis.svg',readFileSync(join(repo,'dsh-plugin/metis-mode/icon.svg'),'utf8'));
copyTree(join(repo,'portable/plugin-content'),dest);
const notices=['# Third-party notices\n\nMETIS 自写跨宿主代码采用 Apache-2.0。现有 METIS 技能、上游目录和下载资源分别保留自身许可。下载和安装不等于获得商业或再分发授权。\n'];
const dependencies=new Map();
for(const input of [...Object.keys(serverBuild.metafile.inputs),...Object.keys(built.metafile.inputs)]){
  if(!input.replaceAll('\\','/').includes('node_modules/'))continue;let directory=dirname(resolve(repo,input));
  while(directory!==dirname(directory)){
    const file=join(directory,'package.json');if(existsSync(file)){const pkg=JSON.parse(readFileSync(file,'utf8'));if(pkg.name){dependencies.set(pkg.name+'@'+pkg.version,{directory,pkg});break;}}
    directory=dirname(directory);
  }
}
for(const [name,{directory,pkg}] of [...dependencies].sort(([a],[b])=>a.localeCompare(b))){
  const licenses=readdirSync(directory).filter(file=>/^licen[cs]e(?:$|\.)/i.test(file)).filter(file=>statSync(join(directory,file)).isFile());
  if(!licenses.length)throw new Error('被打包依赖缺少许可正文：'+name);
  notices.push('## '+name+' ('+(pkg.license||'see license')+')\n\n'+licenses.map(file=>readFileSync(join(directory,file),'utf8')).join('\n\n'));
}
put('THIRD_PARTY_NOTICES.md',notices.join('\n\n'));
const marketplaceRoot=dirname(dest);mkdir(join(marketplaceRoot,'.agents/plugins'));mkdir(join(marketplaceRoot,'.zcode-plugin'));
const market={name:'metis-local',interface:{displayName:'METIS'},plugins:[{name:'metis',source:{source:'local',path:'./metis'},policy:{installation:'AVAILABLE',authentication:'ON_USE'},category:'Productivity'}]};writeFileSync(join(marketplaceRoot,'.agents/plugins/marketplace.json'),JSON.stringify(market,null,2)+'\n');
const zcodeMarket={name:'metis-local',owner:{name:'METIS'},metadata:{description},plugins:[{name:'metis',source:'./metis',description,version:'1.7.0'}]};
writeFileSync(join(marketplaceRoot,'.zcode-plugin/marketplace.json'),JSON.stringify(zcodeMarket,null,2)+'\n');writeFileSync(join(marketplaceRoot,'marketplace.json'),JSON.stringify(zcodeMarket,null,2)+'\n');
const files=[];function inventory(directory){for(const entry of readdirSync(directory,{withFileTypes:true})){const path=join(directory,entry.name);if(entry.isDirectory())inventory(path);else if(path!==join(dest,'BUILD.json'))files.push({path:relative(dest,path).replaceAll('\\','/'),bytes:statSync(path).size,sha256:sha(readFileSync(path))});}}inventory(dest);
put('BUILD.json',{version:'1.7.0',builtAt:new Date().toISOString(),catalogHash:pointer.catalogHash,catalogSkills:catalog.entries.length,dependencies:[...dependencies].map(([name,{pkg}])=>({name,license:pkg.license})),reusedDshModules:[...sources].map(file=>({path:relative(repo,file).replaceAll('\\','/'),sha256:sha(readFileSync(file))})),files});
console.log(JSON.stringify({directory:dest,files:files.length,bytes:files.reduce((n,f)=>n+f.bytes,0),catalogSkills:catalog.entries.length,uiBytes:Buffer.byteLength(js)+Buffer.byteLength(css),dshSourceMutations:0}));

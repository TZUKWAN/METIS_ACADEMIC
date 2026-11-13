/** Build an atomic, content-addressed METIS server module graph. Development only. */
import {readFileSync,writeFileSync,mkdirSync,renameSync,existsSync} from 'node:fs';
import {dirname,resolve,join,relative,isAbsolute,sep} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createHash,randomUUID} from 'node:crypto';
import {createRequire,isBuiltin} from 'node:module';

const args=process.argv.slice(2),option=(name,fallback)=>{const at=args.indexOf(name);return at<0?fallback:args[at+1];};
const root=resolve(option('--root',join(dirname(fileURLToPath(import.meta.url)),'../..'))),output=join(root,'dsh-plugin/metis-unified/host');
const require=createRequire(import.meta.url),explicit=option('--esbuild',process.env.METIS_ESBUILD_PATH);
const esbuild=explicit?createRequire(join(resolve(explicit),'package.json'))('./lib/main.js'):require('esbuild');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
function atomic(path,text){if(existsSync(path)&&readFileSync(path,'utf8')===text)return;const temporary=path+'.'+randomUUID()+'.tmp';writeFileSync(temporary,text,{flag:'wx',mode:0o600});renameSync(temporary,path);}
function immutable(path,text){if(existsSync(path)){if(readFileSync(path,'utf8')!==text)throw new Error('Build hash collision: '+path);return;}writeFileSync(path,text,{flag:'wx',mode:0o644});}
const roles={preset:'../metis-preset/index.js',steps:'../metis-preset/step-skills.js',workbench:'../metis-mode/host/index.js',runtime:'../metis-academic/index.js',composerAgent:'../metis-preset/composer-agent.js'},sources=new Map();
const assets=new Map(['evidence-reader.py','prepared-python-runner.py'].map(name=>{const path='dsh-plugin/metis-preset/'+name,bytes=readFileSync(join(root,path)),sha256=hash(bytes);return[name,{path,bytes,sha256,file:sha256+'-'+name}];}));
const result=await esbuild.build({
  absWorkingDir:root,stdin:{contents:Object.entries(roles).map(([role,path])=>`export * as ${role} from ${JSON.stringify(path)};`).join('\n'),resolveDir:join(root,'dsh-plugin/metis-unified'),sourcefile:'metis-host-entry.mjs'},
  bundle:true,format:'esm',platform:'node',target:'node22',packages:'external',write:false,metafile:true,charset:'utf8',keepNames:true,logLevel:'silent',
  banner:{js:'// Generated METIS host graph. All relative server imports are bundled together.\nconst __metis_source_base = new URL("../../../", import.meta.url);\nconst __metis_graph_asset_base = new URL("./assets/", import.meta.url);'},
  footer:{js:'// Build variant: '+JSON.stringify(option('--nonce','release'))},
  plugins:[{name:'preserve-source-asset-locations',setup(build){build.onLoad({filter:/\.[cm]?js$/},args=>{
    const part=relative(root,args.path);if(isAbsolute(part)||part==='..'||part.startsWith('..'+sep))throw new Error('Unexpected source outside METIS package: '+args.path);
    const original=readFileSync(args.path,'utf8');sources.set(part.split(sep).join('/'),hash(original));
    const sourceUrl=`new URL(${JSON.stringify(part.split(sep).join('/'))}, __metis_source_base).href`;
    const frozen=original.replace(/new URL\(['"]\.\/(evidence-reader\.py|prepared-python-runner\.py)['"],\s*import\.meta\.url\)/g,(_match,name)=>'new URL('+JSON.stringify(assets.get(name).file)+', __metis_graph_asset_base)');
    return {contents:frozen.replace(/\bimport\.meta\.url\b/g,sourceUrl),loader:'js',resolveDir:dirname(args.path)};
  });}}]
});
const external=result.metafile.outputs[Object.keys(result.metafile.outputs)[0]].imports;
if(external.some(item=>!isBuiltin(item.path)))throw new Error('The server graph must not leave runtime package dependencies: '+JSON.stringify(external));
mkdirSync(join(output,'assets'),{recursive:true});
for(const asset of assets.values()){sources.set(asset.path,asset.sha256);immutable(join(output,'assets',asset.file),asset.bytes.toString('utf8'));}
const executorBuild=hash(JSON.stringify(Object.fromEntries([...sources].sort(([a],[b])=>a.localeCompare(b)))));
const code='const __metis_executor_build = '+JSON.stringify(executorBuild)+';\n'+result.outputFiles[0].text,revision=hash(code),graphName='graph-'+revision+'.mjs';mkdirSync(output,{recursive:true});immutable(join(output,graphName),code);
// Import only the trusted generated definitions: no plugin apply, task, model or script runs.
const namespaces=await import(pathToFileURL(join(output,graphName)).href),entries={},exportsByRole={};
// HMR watches files of *running* host entries. Keep those addresses stable so
// the next release is detected even when all its implementation files are new.
// Preset-scoped entries get unique addresses; active sessions can retain them.
const hostFacades={preset:'index.mjs',workbench:'workbench.mjs',runtime:'runtime.mjs'};
const publishFacades=[];
for(const role of Object.keys(roles)){
  // Cordis accepts unnamed plugin namespaces (the workbench is one). Keep the
  // source export surface intact; only apply is required by these five roles.
  const entry=namespaces[role];
  if(typeof entry?.apply!=='function'||('name' in entry&&typeof entry.name!=='string')){
    throw new Error('Invalid native METIS entry: '+role);
  }
  const keys=Object.keys(entry).filter(key=>key!=='default');if(keys.some(key=>!/^[a-zA-Z_$][\w$]*$/.test(key)))throw new Error('Unsupported export in '+role);
  const facade=hostFacades[role];
  const specifier=(facade?'./host/':'./')+graphName;
  const text=`// Generated METIS graph ${revision}; entry ${role}.\nimport { ${role} as entry } from '${specifier}';\nexport const { ${keys.join(', ')} } = entry;\n`+(Object.hasOwn(entry,'default')?'export default entry.default;\n':'');
  const file=facade||role+'-'+hash(text)+'.mjs';
  if(facade)publishFacades.push([join(dirname(output),facade),text]);
  else immutable(join(output,file),text);
  entries[role]='./dsh-plugin/metis-unified/'+(facade?'':'host/')+file;
  exportsByRole[role]=keys;
}
const packagePath=join(root,'package.json'),pkg=JSON.parse(readFileSync(packagePath,'utf8'));if(pkg.name!=='metis-academic-preset')throw new Error('Wrong METIS package identity');
pkg.exports={...pkg.exports,'.':entries.preset,'./step-skills':entries.steps,'./workbench':entries.workbench,'./runtime':entries.runtime,'./composer-agent':entries.composerAgent};
if(option('--version'))pkg.version=option('--version');
pkg.devDependencies={...pkg.devDependencies,esbuild:'0.28.2',three:'0.187.0'};
const buildCommand='python dsh-plugin/metis-unified/prepare-ui.py && node dsh-plugin/metis-unified/prepare-ion.mjs && node dsh-plugin/metis-unified/prepare-host.mjs && python dsh-plugin/metis-unified/prepare-client.py';
pkg.scripts={...pkg.scripts,build:buildCommand,prepack:buildCommand};
const manifest={format:1,revision,executorBuild,assets:Object.fromEntries([...assets].map(([name,asset])=>[name,{sha256:asset.sha256,path:'./dsh-plugin/metis-unified/host/assets/'+asset.file}])),esbuild:esbuild.version,entries,graph:'./dsh-plugin/metis-unified/host/'+graphName,exportsByRole,sources:Object.fromEntries([...sources].sort(([a],[b])=>a.localeCompare(b))),bytes:Buffer.byteLength(code),runtimeDependencies:external.map(item=>item.path)};
atomic(join(root,'dsh-plugin/metis-unified/host-build.json'),JSON.stringify(manifest,null,2)+'\n');
// All facades point into an already complete graph, including the entry address
// cached by the old installation. Keep the preset switch last among the facades.
for(const [path,contents] of publishFacades.reverse())atomic(path,contents);
atomic(packagePath,JSON.stringify(pkg,null,2)+'\n');
console.log(JSON.stringify({version:pkg.version,revision,sourceFiles:sources.size,bytes:manifest.bytes,entries,pluginExecution:'not-performed',models:'not-called'}));

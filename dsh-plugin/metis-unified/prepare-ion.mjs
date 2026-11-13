/** Build the offline MIT Three.js ion renderer. Development only. */
import {createRequire} from 'node:module';
import {readFileSync,writeFileSync,mkdirSync,renameSync,existsSync,unlinkSync} from 'node:fs';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash,randomUUID} from 'node:crypto';
const args=process.argv.slice(2),option=(key,fallback)=>args.includes(key)?args[args.indexOf(key)+1]:fallback;
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..'),client=join(root,'dsh-plugin/metis-mode/client');
const require=createRequire(import.meta.url),explicit=option('--esbuild',process.env.METIS_ESBUILD_PATH);
const esbuild=explicit?createRequire(join(resolve(explicit),'package.json'))('./lib/main.js'):require('esbuild');
const dependencyRoot=resolve(option('--dependencies',process.env.METIS_ION_DEPENDENCIES||join(root,'node_modules')));
const dependency=JSON.parse(readFileSync(join(dependencyRoot,'three/package.json'),'utf8'));
if(dependency.version!=='0.187.0'||dependency.license!=='MIT')throw new Error('ION requires the reviewed Three.js 0.187.0 MIT build');
const source=join(client,'ion-world.js'),artifact=join(client,'ion-world.bundle.js');
function atomic(path,bytes){
  const data=Buffer.from(bytes);if(existsSync(path)&&readFileSync(path).equals(data))return;
  const temporary=path+'.'+randomUUID()+'.tmp';try{writeFileSync(temporary,data,{flag:'wx',mode:0o644});renameSync(temporary,path);}finally{if(existsSync(temporary))unlinkSync(temporary);}
}
const renderer=await esbuild.build({entryPoints:[source],outfile:artifact,bundle:true,format:'esm',platform:'browser',target:'chrome120',nodePaths:[dependencyRoot],minify:true,legalComments:'eof',charset:'utf8',logLevel:'silent',write:false});
const ui=await esbuild.build({entryPoints:[join(client,'project-scene-entry.js')],outfile:join(client,'project-scene.js'),bundle:true,format:'esm',platform:'browser',target:'chrome120',nodePaths:[dependencyRoot],metafile:true,minify:true,legalComments:'eof',charset:'utf8',logLevel:'silent',write:false});
const uiImports=Object.values(ui.metafile.outputs).flatMap(output=>output.imports);
if(uiImports.length)throw new Error('The ION interface must be one self-contained browser module: '+JSON.stringify(uiImports));
// Serve complete modules even while the development package is being rebuilt.
atomic(artifact,renderer.outputFiles[0].contents);atomic(join(client,'project-scene.js'),ui.outputFiles[0].contents);
const vendor=join(client,'ion-vendor');mkdirSync(vendor,{recursive:true});
writeFileSync(join(vendor,'LICENSE-three.txt'),readFileSync(join(dependencyRoot,'three/LICENSE')));
writeFileSync(join(vendor,'SOURCE.json'),JSON.stringify({name:dependency.name,version:dependency.version,license:dependency.license,repository:'https://github.com/mrdoob/three.js',registry:'https://registry.npmjs.org/three/-/three-0.187.0.tgz',integrity:'sha512-Qiu7R+Cmh8CstZsY1uJOSWnVlfo7ZtNLV7mF8Jltk3LB3AtDu9cRZlcnRKkAk8Y4z6KKw35z7Y7Urd7jWY8etA==',usage:'Offline renderer only; no external runtime downloads'},null,2)+'\n');
const hash=path=>createHash('sha256').update(readFileSync(path)).digest('hex');
const receipt={three:dependency.version,sourceSha256:hash(source),artifactSha256:hash(artifact),bytes:readFileSync(artifact).length,sources:Object.fromEntries(['ion-world.js','ion-atmosphere.js','ion-art-direction.js','ion-interactions.js','ion-style.js','ion-surface.js','circuit-model.js','circuit-workspace.js','project-poll.js','research-network.js','research-space.js','research-art-direction.js','research-motion.js','ion-research-network.js','project-scene-state.js','project-scene-entry.js','ion-workbench.css','ion-refinement.css','ion-workbench-style.js'].map(name=>[name,hash(join(client,name))])),interfaceSha256:hash(join(client,'project-scene.js')),interfaceBytes:readFileSync(join(client,'project-scene.js')).length,loading:'single-self-contained-module',interfaceImports:uiImports};
writeFileSync(join(client,'ion-build.json'),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));

import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {pathToFileURL} from 'node:url';

const dependencies=process.env.METIS_TEST_DEPENDENCIES||resolve('node_modules');
const {Client}=await import(pathToFileURL(join(dependencies,'@modelcontextprotocol/sdk/dist/esm/client/index.js')));
const {StdioClientTransport}=await import(pathToFileURL(join(dependencies,'@modelcontextprotocol/sdk/dist/esm/client/stdio.js')));
const directory=mkdtempSync(join(tmpdir(),'metis-mcp-')),folder=join(directory,'research');mkdirSync(folder);
const transport=new StdioClientTransport({command:process.execPath,args:[resolve('host-plugins/metis/runtime/server.mjs')],env:{...process.env,METIS_DATA_HOME:directory,METIS_HOST:'codex'},stderr:'pipe'});
let stderr='';transport.stderr?.on('data',data=>stderr+=data.toString());
const client=new Client({name:'metis-protocol-test',version:'1.0.0'});
const call=async(name,args={})=>{const r=await client.callTool({name,arguments:args});assert.equal(r.isError,undefined,JSON.stringify(r));return r.structuredContent.value;};
let url,project,skill;

test('real MCP handshake exposes tools and self-contained UI resource',async()=>{
  await client.connect(transport);const tools=await client.listTools();assert.ok(tools.tools.some(t=>t.name==='metis_config_edit'));assert.ok(tools.tools.find(t=>t.name==='metis_open')._meta.ui.resourceUri);
  const resources=await client.listResources();const result=await client.readResource({uri:resources.resources[0].uri});assert.equal(result.contents[0].mimeType,'text/html;profile=mcp-app');assert.ok(result.contents[0].text.includes('<title>METIS'));
  url=(await call('metis_open')).url;const html=await fetch(url).then(r=>r.text());assert.ok(html.includes('window.__METIS_LOCAL__='));assert.equal((await fetch(new URL('/api',url))).status,401);
});
test('native MCP config tool edits, saves and runs a real project with no confirmation gate',async()=>{
  const read=await call('metis_config_read');const steps=['one','two'].map(id=>({id,title:id,instruction:'Write a factual file',deliverables:id+'.txt',prompt:'Use actual source material',skills:[]}));
  await call('metis_config_edit',{readToken:read.readToken,operations:[{type:'create_mode',mode:{id:'metis-protocol',name:'MCP protocol'},profile:{steps,skills:[],parameters:{language:'zh-CN'}}}]});
  const d=await call('metis_config_read');await call('metis_config_save',{expectedRevision:d.revision});project=await call('metis_project_create',{name:'MCP project',folder,modeId:'metis-protocol',autonomous:true});
  await call('metis_step_open',{projectId:project.id});writeFileSync(join(folder,'one.txt'),'Real file written for the isolated protocol integration test.');const submitted=await call('metis_step_submit',{projectId:project.id,artifacts:['one.txt']});assert.equal(submitted.nextStepId,'two');assert.equal((await call('metis_step_open',{projectId:project.id})).stepId,'two');
});
test('indexed repositories expose concrete bounded skills and pinned source bodies',async()=>{
  const index=await call('metis_config_read',{kind:'skills',query:'academic-humanizer',limit:5});skill=index.value.items.find(s=>s.name==='academic-humanizer');assert.ok(skill?.id.startsWith('ml-'));assert.equal(index.value.items.some(s=>'content' in s),false);
  const body=await call('metis_skill_read',{id:skill.id,maxChars:1800});assert.ok(body.content?.length>300);assert.ok(body.content.length<=1800);assert.equal(body.source.ref.length,40);
  const read=await call('metis_config_read');await call('metis_config_edit',{readToken:read.readToken,operations:[{type:'bind_skill',modeId:'metis-protocol',stepId:'two',skillId:skill.id}]});const current=await call('metis_config_read');await call('metis_config_save',{expectedRevision:current.revision});
  const p=await call('metis_project_create',{name:'Pinned skill',folder,modeId:'metis-protocol'});await call('metis_step_open',{projectId:p.id});writeFileSync(join(folder,'pin.txt'),'A real first delivery.');await call('metis_step_submit',{projectId:p.id,artifacts:['pin.txt']});await call('metis_step_open',{projectId:p.id});const frozen=await call('metis_project_skill_read',{projectId:p.id,id:skill.id,maxChars:1800});assert.ok(frozen.content?.length>300);
  const prepared=await call('metis_skill_prepare',{projectId:p.id,id:skill.id});assert.ok(prepared.preparedFiles.includes('SKILL.md'));assert.ok(readFileSync(prepared.entryFile,'utf8').includes('humanizer'));assert.equal(prepared.dependencies,'not-checked');
});
test('authenticated local bridge shares the exact same project state',async()=>{
  const token=new URL(url).searchParams.get('token'),endpoint=new URL('/api',url),response=await fetch(endpoint,{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({method:'project',args:{projectId:project.id}})});const value=await response.json();assert.equal(value.value.currentStepId,'two');
  const hostile=await fetch(endpoint,{method:'POST',headers:{Origin:'https://unrelated.example',Authorization:'Bearer '+token},body:'{}'});assert.equal(hostile.status,403);
});
test.after(async()=>{await client.close();if(stderr.trim())console.error(stderr.slice(-1500));});

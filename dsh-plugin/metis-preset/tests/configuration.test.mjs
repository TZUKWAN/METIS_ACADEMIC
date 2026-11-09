import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {mergeDraft,draftChanges,draftEqual} from '../draft-merge.js';
import {isOwnerUserEvent} from '../user-evidence.js';
import {emptyConfiguration,writeConfiguration,readConfiguration,skillDocument} from '../configuration.js';
import {modes} from '../modes.js';
import {normalizeConfiguration,applyWorkspaceEdits} from '../workspace-edits.js';
import {compileStep} from '../profiles.js';
import {createSessionVersionStore} from '../session-versions.js';
import {frozenStepDefinitions} from '../step-skills.js';
import {librarySkills,libraryInfo,readCatalogSkill,searchSkillMetadata} from '../skill-library.js';

const home=mkdtempSync(join(tmpdir(),'metis-configuration-test-'));
process.env.DSH_HOME=home;
const copy=structuredClone;
function fixture(){
  const configuration=emptyConfiguration();configuration.deletedModes=modes.map(mode=>mode.id);
  const mode={id:'metis-verification',name:'验证用流程',description:'仅测试配置行为',artifact:null,paradigm:null,guidance:'',order:100};
  configuration.modes[mode.id]=mode;
  const steps=['first','second','third'].map(id=>({id,title:id,instruction:'核对真实资料',deliverables:'有来源的结论',prompt:'保留实际依据',prohibitions:'',loop:{enabled:false,criteria:''},skills:[],stages:[],parameters:{language:'inherit',outputFormat:'task',tasksPerTurn:1}}));
  configuration.profiles[mode.id]={revision:0,updatedAt:null,profile:{systemPrompt:'按步骤执行',steps,skills:[],parameters:{language:'zh-CN'}}};
  return normalizeConfiguration(configuration);
}
const profile=configuration=>configuration.profiles['metis-verification'].profile;

test('GUI owner input is authoritative; model, notices, and remote peers are not',()=>{
  for(const kind of ['user','user-rpc'])assert.equal(isOwnerUserEvent({type:'user/message',data:{source:{kind}}}),true);
  for(const kind of ['notice','runtime-context','goal','subagent','model'])assert.equal(isOwnerUserEvent({type:'user/message',data:{source:{kind}}}),false);
  assert.equal(isOwnerUserEvent({type:'user/message',data:{source:{kind:'user-rpc',principal:{kind:'peer'}}}}),false);
});
test('simultaneous AI and manual edits preserve human fields and merge other edits',()=>{
  const base=fixture(),human=copy(base),ai=copy(base);
  profile(human).steps[0].instruction='人工确认的目标';profile(ai).steps[0].instruction='AI试图覆盖';profile(ai).steps[1].deliverables='AI补充的交付';
  const result=mergeDraft(base,human,ai);
  assert.equal(profile(result.configuration).steps[0].instruction,'人工确认的目标');
  assert.equal(profile(result.configuration).steps[1].deliverables,'AI补充的交付');assert.ok(result.conflicts.length);
  // Once acknowledged, explicit protection still prevents a later AI rewrite.
  const next=copy(result.configuration);profile(next).steps[0].instruction='另一次AI覆盖';
  assert.equal(profile(mergeDraft(result.configuration,result.configuration,next,{protectedPaths:draftChanges(base,human)}).configuration).steps[0].instruction,'人工确认的目标');
});
test('human order and whole step content survive AI insertions and removals',()=>{
  const base=fixture(),human=copy(base),ai=copy(base);
  profile(human).steps.reverse();profile(human).steps[1].prompt='人工提示词';
  profile(ai).steps=profile(ai).steps.filter(step=>step.id!=='second');profile(ai).steps.push({...copy(profile(ai).steps[0]),id:'new-step',title:'新增步骤'});
  const steps=profile(mergeDraft(base,human,ai).configuration).steps;
  assert.deepEqual(steps.filter(step=>step.id!=='new-step').map(step=>step.id),['third','second','first']);
  assert.equal(steps.find(step=>step.id==='second').prompt,'人工提示词');
});
test('explicit human deletion cannot be resurrected under the same stable ID',()=>{
  const base=fixture(),human=copy(base);profile(human).steps.splice(1,1);
  const protectedPaths=draftChanges(base,human),ack=copy(human),ai=copy(human);profile(ai).steps.splice(1,0,copy(profile(base).steps[1]));
  assert.equal(profile(mergeDraft(ack,ack,ai,{protectedPaths}).configuration).steps.some(step=>step.id==='second'),false);
});
test('an explicit return to the baseline value still wins over a delayed remote edit',()=>{
  const base=fixture(),human=copy(base),remote=copy(base);profile(remote).steps[0].instruction='先前尚未确认的更改';
  const key='/profiles/metis-verification/profile/steps/@first/instruction';
  assert.equal(profile(mergeDraft(base,human,remote,{protectedPaths:[key]}).configuration).steps[0].instruction,profile(base).steps[0].instruction);
  const removed=copy(base),added=copy(base);added.modes['metis-late']={id:'metis-late',name:'已被人工撤销的新模式'};
  assert.equal(mergeDraft(base,removed,added,{protectedPaths:['/modes/metis-late/$exists']}).configuration.modes['metis-late'],undefined);
});
test('manual skill unbinding merges with unrelated AI bindings',()=>{
  const base=fixture();profile(base).steps[0].skills=['one','two'];
  const human=copy(base),ai=copy(base);profile(human).steps[0].skills=['one'];profile(ai).steps[0].skills=['one','two','three'];
  assert.deepEqual(profile(mergeDraft(base,human,ai).configuration).steps[0].skills,['one','three']);
});
test('concurrent edit invariants over 100 distinct fields and structural edits',()=>{
  for(let n=0;n<100;n++){
    const base=fixture(),human=copy(base),ai=copy(base),at=n%3,other=(at+1)%3,key=['title','instruction','deliverables','prompt','prohibitions'][n%5];
    profile(human).steps[at][key]='human-'+n;profile(ai).steps[at][key]='ai-'+n;profile(ai).steps[other].prompt='independent-'+n;
    if(n%2===0)profile(ai).steps.push({...copy(profile(base).steps[0]),id:'ai-'+n});
    const result=mergeDraft(base,human,ai).configuration;
    assert.equal(profile(result).steps.find(step=>step.id===profile(base).steps[at].id)[key],'human-'+n);
    assert.equal(profile(result).steps.find(step=>step.id===profile(base).steps[other].id).prompt,'independent-'+n);
    assert.ok(draftEqual(mergeDraft(base,human,base).configuration,human));
  }
});
test('real configuration operations preserve bindings, prompts, bans, and loop settings',async()=>{
  let document=fixture();
  document=(await applyWorkspaceEdits(document,'metis-verification',[
    {type:'update_step',stepId:'first',patch:{prohibitions:'不得编造引用',loop:{enabled:true,criteria:'结论逐项有依据'},prompt:'先读真实资料'}},
    {type:'bind_skill',stepId:'first',skillId:'workspace-audit'},
    {type:'move_step',stepId:'first',beforeStepId:null},
    {type:'set_output',output:{format:'docx',wordFormatting:'正文宋体小四，1.5倍行距'}}
  ])).configuration;
  const last=profile(document).steps.at(-1);assert.equal(last.id,'first');assert.equal(last.prompt,'先读真实资料');assert.equal(last.prohibitions,'不得编造引用');assert.equal(last.loop.enabled,true);assert.ok(last.skills.includes('workspace-audit'));
  const compiled=compileStep(document.modes['metis-verification'],profile(document),'first',document,null,{progressive:true,nativeExecution:true,goalExecution:true}).prompt;
  for(const text of ['不得编造引用','metis_step.check','结论逐项有依据','宋体小四'])assert.ok(compiled.includes(text));
  const saved=writeConfiguration(document,0);assert.equal(saved.revision,1);assert.deepEqual(readConfiguration(),saved);
  assert.throws(()=>writeConfiguration(document,0),/更新|冲突/);
});
test('a deleted active mode is removed without a mode archive',async()=>{
  const document=(await applyWorkspaceEdits(fixture(),'metis-verification',[{type:'delete_mode',modeId:'metis-verification'}])).configuration;
  assert.equal(document.modes['metis-verification'],undefined);assert.equal(document.profiles['metis-verification'],undefined);assert.deepEqual(document.modeArchives,{});
});
test('real skill creation, resource edits, local installation, binding and recovery',async()=>{
  let document=(await applyWorkspaceEdits(fixture(),'metis-verification',[
    {type:'create_skill',skill:{id:'metis-config-check',description:'隔离配置验证技能',content:'读取真实输入，原始指令，保留结果依据。',files:[{path:'resources/notes.txt',text:'真实资源文件'}]}},
    {type:'bind_skill',stepId:'first',skillId:'metis-config-check'}
  ])).configuration;
  const created=skillDocument('metis-config-check',document);assert.equal(readFileSync(join(created.root,'resources/notes.txt'),'utf8'),'真实资源文件');
  document=(await applyWorkspaceEdits(document,'metis-verification',[{type:'update_skill',skillId:created.id,patch:{content:'读取真实输入，修改后的真实指令，保留结果依据。',files:[{path:'resources/notes.txt',text:'已修改的真实资源'}]}}])).configuration;
  const updated=skillDocument(created.id,document);assert.notEqual(updated.packageHash,created.packageHash);assert.equal(readFileSync(join(created.root,'resources/notes.txt'),'utf8'),'真实资源文件');assert.equal(readFileSync(join(updated.root,'resources/notes.txt'),'utf8'),'已修改的真实资源');
  const local=join(home,'local-skill');mkdirSync(local,{recursive:true});writeFileSync(join(local,'SKILL.md'),'---\nname: local-config-check\ndescription: 本地真实配置验证技能\n---\n逐项读取实际资料，不虚构结果。\n');
  document=(await applyWorkspaceEdits(document,'metis-verification',[{type:'install_skill',id:'metis-local-check',source:{kind:'local',path:local}},{type:'bind_skill',stepId:'first',skillId:'metis-local-check'}],{authorization:'测试所有者授权读取此本地技能目录：'+local})).configuration;
  assert.ok(skillDocument('metis-local-check',document).content.includes('实际资料'));assert.ok(profile(document).steps[0].skills.includes('metis-local-check'));
  document=(await applyWorkspaceEdits(document,'metis-verification',[{type:'delete_skill',skillId:'metis-local-check',detach:true}])).configuration;assert.ok(document.deletedSkills.includes('metis-local-check'));assert.equal(profile(document).steps[0].skills.includes('metis-local-check'),false);
  document=(await applyWorkspaceEdits(document,'metis-verification',[{type:'restore_skill',skillId:'metis-local-check'}])).configuration;assert.equal(document.deletedSkills.includes('metis-local-check'),false);assert.ok(skillDocument('metis-local-check',document).content.includes('实际资料'));
});
test('cold session restores old frozen workflow and resources after new configurations',()=>{
  const base=fixture(),mode=base.modes['metis-verification'],initial=profile(base),core=skillDocument('metis-core',base),skills=[core];
  const definitions=value=>({mode,plugins:[{id:'step-skills',name:'metis-academic-preset/step-skills',config:{mode,profile:value,skills,disclosure:'progressive-v1',execution:'native-goal-loop-v1',frozenSteps:frozenStepDefinitions(mode,value,skills,{progressive:true,nativeExecution:true,goalExecution:true})}}]});
  const store=createSessionVersionStore(),old=store.freeze(definitions(initial));store.published([old]);
  const header={id:'session-'+randomUUID(),cwd:home,createdAt:new Date().toISOString(),agentPreset:mode.id};store.remember(header,mode.id,old.id,'test-native-creation');
  const changed=copy(initial);changed.steps[0].instruction='新会话的新目标';changed.steps.reverse();
  const latest=store.freeze(definitions(changed));store.published([latest]);assert.notEqual(latest.id,old.id);
  const reloaded=createSessionVersionStore(),binding=reloaded.binding(header,mode.id),restored=reloaded.declaration(binding.versionId);
  assert.equal(binding.versionId,old.id);assert.equal(restored.plugins[0].config.profile.steps[0].instruction,initial.steps[0].instruction);
  assert.equal(readFileSync(join(restored.plugins[0].config.skills[0].root,'INSTRUCTIONS.md'),'utf8'),core.content);
  assert.throws(()=>reloaded.remember(header,mode.id,latest.id,'test-overwrite'),/拒绝|固定/);
});
test('all 10 real library sources expose readable concrete child skills',async()=>{
  const info=libraryInfo(),entries=librarySkills(),required=['brycewang-stanford/Auto-Empirical-Research-Skills','Norman-bury/research-writing-skill','HughYau/AcademicForge','openags/paper-search-mcp','AIScientists-Dev/academic-humanizer','cookjohn/cnki-skills','ganzhi-black/humanities-thesis-skill','wentorai/research-plugins','fakerqwq/social-science-paper-writing-skill','WenyuChiou/ai-research-skills'];
  assert.ok(entries.length>2000);assert.equal(new Set(entries.map(item=>item.id)).size,entries.length);
  for(const repository of required){
    const source=info.sources.find(item=>item.repository===repository);assert.ok(source,'Required source missing: '+repository);
    const item=searchSkillMetadata(entries,{source:source.repository,invocableOnly:true,limit:1}).items[0];
    assert.ok(item,'Concrete child missing for '+source.repository);
    const body=await readCatalogSkill(item.id,{maxChars:2000,fileLimit:4});
    assert.ok(body.content?.length>0,source.repository);assert.equal(body.id,item.id);assert.ok(body.requirements);assert.ok(body.totalCharacters>=body.content.length);
  }
});

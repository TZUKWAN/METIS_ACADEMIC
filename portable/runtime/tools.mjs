const string={type:'string'},boolean={type:'boolean'},integer={type:'integer'},strings={type:'array',items:string};
const schema=(properties={},required=[])=>({type:'object',properties,required,additionalProperties:false});
const project={projectId:string},step={...project,stepId:string};
export const definitions=[
  ['metis_open','打开 METIS 离子回路工作台。返回真实本机地址及支持 MCP Apps 的内嵌界面。',schema()],
  ['metis_config_read','按需读取编排共享草稿、指定模式/步骤或技能元数据；返回 readToken。',schema({draftId:string,kind:{enum:['overview','mode','step','skills']},modeId:string,stepId:string,query:string,offset:integer,limit:integer,source:string})],
  ['metis_config_edit','用 readToken 和精确 operations 修改同一草稿。手动改动优先；未保存不会生效。',schema({draftId:string,readToken:string,selectedModeId:string,operations:{type:'array',items:{type:'object'},minItems:1,maxItems:50}},['readToken','operations'])],
  ['metis_config_save','用户点击或明确要求保存时，一次保存并生效。不会覆盖已存在的研究会话快照。',schema({draftId:string,expectedRevision:integer},['expectedRevision'])],
  ['metis_skill_read','按页读取一个具体技能正文或其资源。先搜索再选取，勿加载全部库。',schema({id:string,path:string,offset:integer,maxChars:integer,fileOffset:integer,draftId:string},['id'])],
  ['metis_skill_prepare','为已绑定技能按需下载固定版本文件并校验摘要；返回真实路径，不执行上游代码。缺失依赖请用宿主原生工具按技能说明准备。',schema({...project,id:string,paths:strings},['projectId','id'])],
  ['metis_project_list','列出跨宿主 METIS 研究项目；多个项目可绑定同一个文件夹。',schema()],
  ['metis_project_create','选择已保存模式和真实文件夹新建项目，冻结本次流程和技能版本。',schema({name:string,folder:string,modeId:string,autonomous:boolean},['name','folder','modeId'])],
  ['metis_project_read','读取项目实际进度、当前查看/执行步骤、交付物和模式更新提示。默认返回简要信息。',schema({...project,includeActivity:boolean},['projectId'])],
  ['metis_project_delete','删除已停止的项目记录；保留文件夹、交付文件及其他项目。',schema(project,['projectId'])],
  ['metis_project_view','仅切换正在查看的步骤，不改变实际执行指针。助手据此理解“这一步”。',schema(step,['projectId','stepId'])],
  ['metis_project_sync_mode','查看源模式是否更新，apply=true 在项目空闲时接入新版；旧快照和交付记录保留。',schema({...project,apply:boolean},['projectId'])],
  ['metis_step_open','进入实际当前步骤，返回本步目标、禁止事项、提示词和技能索引。正常交付后可直接继续下一步。',schema(step,['projectId'])],
  ['metis_project_skill_read','只读取当前项目冻结版本中绑定到该步骤的技能，避免新配置影响旧会话。',schema({...step,id:string,path:string,offset:integer,maxChars:integer},['projectId','id'])],
  ['metis_step_check','对具体交付物运行真实、只读的独立 Codex 核验；按文件摘要缓存结果。没有真实核验不会判定通过。',schema({...step,artifacts:strings},['projectId','artifacts'])],
  ['metis_step_submit','核实真实非空交付文件后提交本步；达标循环还需独立核验。返回 nextStepId，正常推进无需用户逐步点确认。',schema({...step,artifacts:strings,summary:string},['projectId','artifacts'])],
  ['metis_step_revise','按当前查看步骤或指定步骤记录修改意见。修订交付后再让用户选择是否重做后续。',schema({...step,feedback:string},['projectId','feedback'])],
  ['metis_step_downstream','用户选择后续步骤 keep保留 或 redo重做。只用于已交付步骤的返修。',schema({...project,choice:{enum:['keep','redo']}},['projectId','choice'])],
  ['metis_activity','记录当前项目的真实公开进度或命令输出，用于研究现场。不伪造活动，不上传隐藏思维链。',schema({...step,callId:string,kind:string,status:{enum:['running','completed','failed','cancelled']},label:string,target:string,output:string},['projectId','label'])]
].map(([name,description,inputSchema])=>({name,description,inputSchema,annotations:{readOnlyHint:['metis_config_read','metis_skill_read','metis_project_list','metis_project_read','metis_project_skill_read'].includes(name),destructiveHint:['metis_project_delete','metis_config_save','metis_step_downstream'].includes(name),openWorldHint:['metis_skill_read','metis_skill_prepare','metis_step_check'].includes(name)}}));

export function createDispatcher(core,{open,check}={}){
  return async function dispatch(name,args={}){
    switch(name){
      case 'metis_open':return open();
      case 'metis_config_read':return core.configRead(args);
      case 'metis_config_edit':return core.configEdit({...args,actor:'ai'});
      case 'metis_config_save':return core.save(args);
      case 'metis_skill_read':return core.skillRead(args);
      case 'metis_skill_prepare':return core.prepareSkill(args);
      case 'metis_project_list':return {projects:core.listProjects()};
      case 'metis_project_create':return core.createProject(args);
      case 'metis_project_read':{
        const p=core.project(args.projectId);const value={id:p.id,name:p.name,folder:p.folder,modeId:p.modeId,modeName:p.modeName,currentStepId:p.currentStepId,viewedStepId:p.viewedStepId,autonomous:p.autonomous,revision:p.revision,execution:p.execution,steps:p.steps.map(({history,...s})=>s),snapshotHash:p.snapshotHash,configurationRevision:p.snapshot.configurationRevision,modeUpdate:await core.syncMode({projectId:p.id})};if(args.includeActivity)value.activity=p.activity.slice(-25);return value;
      }
      case 'metis_project_delete':return core.deleteProject(args);
      case 'metis_project_view':return core.viewStep(args);
      case 'metis_project_sync_mode':return core.syncMode(args);
      case 'metis_step_open':return core.openStep(args);
      case 'metis_project_skill_read':return core.projectSkillRead(args);
      case 'metis_step_check':return check(args);
      case 'metis_step_submit':return core.submit(args);
      case 'metis_step_revise':return core.revise(args);
      case 'metis_step_downstream':return core.downstream(args);
      case 'metis_activity':return core.activity(args);
      default:throw new Error('未注册的 METIS 工具：'+name);
    }
  };
}

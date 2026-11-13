/** Native DSH Agent composition. No provider requests or model loop here. */
export const name='metis-composer-tools';
export const inject=['tools','metisComposerWorkspace'];
const properties={
  kind:{type:'string',enum:['workspace','operations','mode','skill','skill-search']},
  operation:{type:'string',description:'One operation name for its on-demand authoring reference.'},
  id:{type:'string'},stepId:{type:'string'},path:{type:'string'},query:{type:'string'},source:{type:'string'},
  offset:{type:'integer',description:'Zero-based character or binding-page offset.'},limit:{type:'integer',description:'Small metadata page, at most 30.'},maxChars:{type:'integer',description:'One body fragment, at most 6000 characters.'},fileOffset:{type:'integer'},fileLimit:{type:'integer'},
  metadataOnly:{type:'boolean',description:'For mode+stepId, return only the paged binding IDs; for skill, return metadata without body.'},invocableOnly:{type:'boolean'},
};
const output={schema:{type:'string'},render:(_args,value)=>[{type:'text',text:value}]};
export function apply(ctx){
  // Preset tools are ancestors of the live Agent scope. An empty allow mask
  // would hide these configuration tools too; inherit the native tool surface.
  const read=ctx.tools.register({
    name:'metis_config_read',description:'读取AI和界面共用的当前待保存流程。先workspace取得revision，再用skill-search配合query/source/invocableOnly=true自主检索少量真实子技能；用skill,id,offset=0读取选中技能正文及requirements后，系统才记录其真实来源读取凭据，允许edit绑定。mode可用stepId只读一步，operations按operation读取编辑规范。正文/资源仍逐段分页，不限制工具轮次。后续编辑使用最新返回的revision。',
    parameters:{type:'object',additionalProperties:false,required:['kind'],properties},output,
    isConcurrencySafe:args=>!(args.kind==='skill'&&!args.path&&!args.metadataOnly&&(args.offset??0)===0),
    async execute(args,exec){
      exec.signal?.throwIfAborted();
      const value=await ctx.metisComposerWorkspace.read(exec.agent,args,exec.signal);
      exec.signal?.throwIfAborted();return JSON.stringify(value);
    },
  });
  const edit=ctx.tools.register({
    name:'metis_config_edit',description:'直接更新AI与界面共用的当前待保存流程，成功后界面自动显示，不另建提案。自主选择子技能后，必须先read其真实正文再以唯一skillId绑定到步骤；仅搜索到仓库或元数据不算读取，未读取的新库技能绑定会被拒绝。使用最新read返回的expectedRevision；人工配置变化时重新读取，冲突字段保留人工值，不能用replaceProposal或整段替换强行覆盖。用户点击一次保存并生效才正式提交；研究项目会在空闲且无草稿时接续已保存的新模式，原会话与交付保留，普通旧会话仍保持固定配置。',
    parameters:{type:'object',additionalProperties:false,required:['expectedRevision','edits'],properties:{
      expectedRevision:{type:'integer',description:'Latest workspace revision returned by metis_config_read.'},
      edits:{type:'array',items:{type:'object',additionalProperties:true},description:'Actual configuration operations. Read operations reference for exact fields.'},
      replaceProposal:{type:'boolean',description:'Legacy compatibility only; does not override protected manual fields.'},
    }},output,isConcurrencySafe:()=>false,
    async execute(args,exec){
      exec.signal?.throwIfAborted();
      const value=await ctx.metisComposerWorkspace.propose(exec.agent,args,exec.signal);
      exec.signal?.throwIfAborted();return JSON.stringify(value);
    },
  });
  ctx.effect(()=>()=>{edit();read();},'metis: native configuration tools');
}

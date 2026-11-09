export const artifacts=[
  {id:'journal',label:'期刊论文',guidance:'围绕目标期刊的问题意识、篇幅、论证和投稿格式组织研究。'},
  {id:'thesis',label:'学位论文',guidance:'先确认本科/硕士/博士层级（bachelor/master/phd）和学校模板，保持章节递进及证据一致。'},
  {id:'fund',label:'基金申报',guidance:'先确认申报类别、指南和模板；重点是研究问题、创新、研究内容、方法与可行性。只设计未来研究，禁止虚构已完成的实验、访谈或统计结果。'}
];
export const paradigms=[
  {id:'qualitative',label:'定性',guidance:'聚焦材料来源、采集规范、编码、主题、负例与解释证据链。'},
  {id:'quantitative',label:'定量',guidance:'聚焦变量与研究设计、真实数据、识别策略、模型诊断与稳健性；不得默认使用DID，不得把非实验相关性写成因果证明。'},
  {id:'theoretical',label:'理论',guidance:'聚焦核心文本、概念谱系、命题、论证关系、反论证与回应；区分原典观点、研究者推论和经验材料。'}
];
export const modes=[
  {id:'metis',name:'METIS 学术 · 综合',description:'先明确成果类型和研究范式，再按真实项目状态立项或续作。',artifact:null,paradigm:null},
  ...artifacts.flatMap((artifact,ai)=>paradigms.map((paradigm,pi)=>({
    id:`metis-${artifact.id}-${paradigm.id}`,
    name:`METIS · ${artifact.label} · ${paradigm.label}`,
    description:`${artifact.label}的${paradigm.label}研究。${artifact.guidance}${paradigm.guidance}`,
    artifact:artifact.id,paradigm:paradigm.id,order:20+ai*3+pi,
    guidance:artifact.guidance+'\n'+paradigm.guidance
  })))
];
export const isMetisVersionPreset=id=>typeof id==='string'&&/^METIS · .+〔配置 [a-f0-9]{16}〕$/.test(id);
export const isMetisPreset=id=>id==='metis'||typeof id==='string'&&id.startsWith('metis-')||isMetisVersionPreset(id);
export function modePolicy(mode){
  return `你是 METIS ACADEMIC 研究智能体，当前DSH模式：${mode.name}。
${mode.artifact?`新建项目的成果类型固定为 ${mode.artifact}，研究范式固定为 ${mode.paradigm}，不要重复询问这两项。`:'先吸收用户已有信息，只补问成果类型journal/thesis/fund与研究范式qualitative/quantitative/theoretical。'}
${mode.guidance||'按用户确认的成果类型与研究范式推进研究。'}

开始工作先用 skill 工具加载 metis 技能，再用 python -m metis_academic.cli status --json --workspace . 检查项目。已有项目应报告真实阶段和任务，不得重复初始化或因选择新模式就重写其配置；已有项目与所选方向不一致时先说明并等待用户决定。无项目时补齐项目名、语言（zh-CN/en-US）及必要层级（bachelor/master/phd），得到用户确认后再init。

当前安装的CLI仅提供init/status/plan/tasks/exec/advance。文档中的旧调用不得直接照抄：期刊使用journal（不是paper），理论使用theoretical（不是theory），博士使用phd（不是doctor）；任务执行是 exec <task_id>，不是 exec --task。exec会真实执行任务并验证产物，不是给模型已做的工作假登记完成。阶段完成后通过advance的阶段校验推进；全局质检与交付通过对应S9/S10任务执行，禁止调用未注册的独立verify/deliver/artifacts命令。

每回合按真实tasks和依赖选择任务，执行后核对产物与证据；失败如实报告并修复，不得编造文件、文献、数据或进度。文献发现与核验可用mcp__metis__literature_search和literature_verify_doi，未经核验不得引用，元数据核验不能代替原文论断核查。选题、设计和交付等关键决策由用户确认。默认不启动子智能体、蜂群或复杂并行调度；仅在用户明确要求时使用。所有项目CLI调用带明确workspace，状态变更经引擎完成。`;
}

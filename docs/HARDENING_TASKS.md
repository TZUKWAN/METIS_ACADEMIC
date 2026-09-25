# METIS ACADEMIC 发布后审计与生产化整改任务清单
## Target Mode / Coding Agent 执行版

审计对象：`TZUKWAN/METIS_ACADEMIC`  
审计基线：`main` @ `c0d3e8352beccd19033e920562794f2b9ea9d4c8`  
文档目的：把当前“可执行原型”推进到“经过真实验证、能力声明与实际能力一致、可在受支持 Harness 中使用的 METIS ACADEMIC”。

---

# 0. 执行总规则

本清单是新的验收基线。仓库中现有 `456/456 DONE`、`217 tests 全绿` 等状态不得直接继承为本轮完成状态。

Coding Agent 必须遵守：

1. 一次只完成一个最小任务。
2. 每完成一个任务，立即执行该任务列出的验证。
3. 验证失败时，该任务保持 `FAILED` 或 `BLOCKED`，不得继续假定其完成。
4. 每个任务都必须留下证据：命令、退出码、关键日志、测试名、产物路径、必要时产物 hash。
5. “文件存在”“代码看起来合理”“单元测试 mock 通过”不能单独作为真实性验收。
6. 外部服务无法访问时标记 `BLOCKED/UNVERIFIED`，不得伪造成功结果。
7. 任何能力只有经过真实环境测试后，才能写进 README 的“已支持”列表。
8. 任何引用只有完成元数据核验后，才能进入最终参考文献。
9. 任何数据结果只有真实执行分析代码后，才能进入论文正文、图表或结论。
10. 任何统计方法只有方法实现和统计检验正确时，才能在用户输出中使用相应方法名称。
11. 任何定性/理论结论必须能追溯到真实材料或真实文献证据。
12. 最终稿不得包含“待补”“依某文件撰写”“to be finalized”“占位”“示意”“见某目录”等内部骨架文字。
13. 不得用 `or True`、固定评分、固定成功返回、仅检查文件非空等方式让测试“绿化”。
14. 不得为了现有测试通过而降低校验标准。
15. 修改测试前先说明为什么测试本身错误；禁止删除能暴露真实缺陷的测试。
16. 每个 Phase 完成后执行该 Phase 回归。
17. 所有 Phase 完成后执行一次全量清洁环境复核。
18. 最终发布结论只允许三种：`PASS`、`PASS WITH DOCUMENTED LIMITATIONS`、`FAIL/BLOCKED`。

建议新建：

```text
HARDENING_STATUS.md
.audit/
  baseline/
  task-evidence/
  final/
```

每个任务状态至少包含：

```yaml
id:
status: pending | running | blocked | failed | passed
changed_files: []
verification_commands: []
verification_exit_codes: []
evidence_files: []
notes:
```

---

# 1. 本次审计确认的现状

以下结论来自公开仓库实际代码和 GitHub Actions，不采用仓库自报状态作为证据。

## 1.1 已确认的阻断问题

1. 公共仓库首个 GitHub Actions 运行失败。
2. CI 实际结果为 **9 failed / 208 passed / 1 skipped**。
3. 主要直接失败原因是 `pandas.DataFrame.to_markdown()` 依赖 `tabulate`，项目依赖未声明该包。
4. 失败传播到三个定量 E2E、学位层级 E2E、定量测试和复现测试。
5. 当前 README/提交信息中的“217 tests 全绿”与公开 CI 事实不一致。

## 1.2 跨 Harness 能力缺口

当前真实 Adapter 只有：`CliAdapter` 与 `FilesystemAdapter/HeadlessAdapter`。

当前没有经过真实验证的 Zed、Codex、Claude Code、Kimi Code、ChatGPT Desktop 或 ACP Host Adapter。`/metis` 当前是 Python CLI 中的逻辑命令和 Adapter 注册事件，并非已经在这些宿主中注册成功的真实 slash command。

## 1.3 Skill 动态加载缺口

当前 Skill Router 能匹配 trigger、控制 budget、读取技能文本、记录 loaded，并调用 Adapter 的 `load_skill()`。CLI/Headless Adapter 的 `load_skill()` 只打印或记录事件，没有把 Skill 指令真实注入宿主模型上下文。

## 1.4 MCP 缺口

当前 MCP Router 是工具元数据与路由层，没有真实 MCP client transport、initialize/handshake、`tools/list`、`tools/call`、server lifecycle、auth 或 host tool registration。

## 1.5 文献检索与真实性问题

- arXiv 有真实 API 实现。
- NCPSSD、ChinaXiv、SinoXiv、Paper.edu.cn 没有实际 parser，HTTP 成功后仍返回空列表。
- Google Scholar Adapter 固定返回空列表。
- Web fallback 只有注入 `search_fn` 时才工作。
- online arXiv 测试被代码直接 `skip`，没有真正执行。
- DOI/arXiv `verified` 可由 URL 前缀自动置 True，没有真实元数据核验。
- `references.bib` 当前写入全部 records，包括 unverified records。
- `DraftAssembler.verified_citations()` 可能再次从 `references.bib` 读入这些 key，破坏“未核验不可引用”的约束。
- GB/T 7714 与 APA formatter 都是简化实现。

## 1.6 数据获取问题

当前能扫描 Workspace 数据、下载用户 URL、读取注入的 `metis_data_index`，但没有真正接入 `metis-data`；没有用户数据时 Runtime 主要写缺口记录，不会自动完成公开数据搜索链；数据字典类型推断偏弱；注册格式范围大于实际分析能力。

## 1.7 定量方法问题

当前基础 OLS 链可运行，但存在方法学错误或不足：p 值正态近似、基础同方差标准误、“BP 检验”不完整、固定式稳健性策略、`2sls_simplified` 实现不构成正确 2SLS、异质性无正式差异检验、中介分析过于简化、很多列出的高级方法没有真实实现、Runtime 可能依据字段名自动挑 DV/IV。

## 1.8 定性链路状态问题

Runtime 多次新建 `QualitativeEngine`，部分任务没有重新加载 codings/codebook/materials，导致 aggregate/mechanism/themes/evidence chain 可能为空壳。当前 codebook、负例识别、饱和度也偏启发式。

## 1.9 理论阐释链路状态问题

Runtime 的 `th_engine()` 每次返回新实例。claims/evidence/edges 在前一步内存中建立，后续 argument map、evidence map、checks 可能在空实例上运行。E2E 主要检查文件存在，无法证明论证图真实完整。

## 1.10 成文能力问题

大量输出仍有工作流骨架文本，例如 `（章节内容依 research/ 与 analysis/ 产出撰写）`、`(English abstract to be finalized.)`。基金模拟评审使用固定分数。核心 Runtime 缺少明确的可移植 ModelBackend/Host Model 接口。

## 1.11 Word/PPT 问题

Word 模板解析和复刻范围有限；生成时重新创建空白 Document；Markdown 表格被写成普通段落；页眉页脚、编号、TOC、复杂样式、图片等未完整处理；verify 主要验证文件可打开。PPT 目前主要是基础 fallback，style 与外部 Skill 接口没有完成真实高级集成。

## 1.12 QA / Validation 问题

很多规则偏浅，例如复现只看文件存在、figure provenance 过于宽松、writing evidence 只查字符串、英文 style 默认通过、format 只检查 spec 存在、`sections_consistent` 中有 `or True`。passed 与“研究内容真实可靠”尚未绑定。

## 1.13 测试问题

已确认测试中存在 `assert ... or True`；E2E 依赖精心设计 fixture；定量 fixture 字段正好适配 Runtime 规则；理论/定性 E2E 主要看文件存在；live arXiv test 固定 skip；缺少 clean-install、wheel-install、跨平台、协议实机测试。

---

# 2. 优先级与执行顺序

```text
P0 = 发布阻断 / 真实性 / 错误研究结果风险
P1 = 核心产品能力未真实实现
P2 = 可靠性、跨平台、格式和可维护性
P3 = 发布工程、文档和长期维护

执行顺序：P0 → P1 → P2 → P3 → Full Audit
```

---

# Phase H0 — 建立本轮真实审计基线【P0】

- [ ] **H0-001** 新建 `HARDENING_STATUS.md`，导入本清单全部任务 ID。验证：脚本统计任务 ID 数量与状态表数量完全一致。完成要求：无遗漏、无重复 ID。
- [ ] **H0-002** 保存当前 Git commit SHA 到 `.audit/baseline/commit.txt`。验证：`git rev-parse HEAD` 与文件一致。完成要求：有明确审计基线。
- [ ] **H0-003** 保存当前 CI run 状态与失败摘要。验证：记录 run ID、结论和失败测试名。完成要求：不得写成“当前 CI 通过”。
- [ ] **H0-004** 将现有 `456/456` 标记为历史实现记录，不作为生产验收。验证：搜索所有 `456/456` 声明。完成要求：当前状态不误导用户。
- [ ] **H0-005** 创建 `docs/KNOWN_LIMITATIONS.md`。验证：至少记录 CI、Harness、MCP、文献源、统计方法、Word 模板、语义成文限制。完成要求：与代码真实能力一致。
- [ ] **H0-006** 建立 `.audit/task-evidence/` 证据格式。验证：示例 evidence 通过 schema。完成要求：后续任务统一留证。
- [ ] **H0-007** 编写 `scripts/audit_status.py`。验证：passed 但无 evidence 的任务使脚本非 0。完成要求：禁止无证据完成。
- [ ] **H0-008** 在 CI 增加 hardening 状态一致性检查。验证：临时制造坏状态时 CI 失败。完成要求：证据规则进入自动化。

# Phase H1 — 修复干净环境 CI 与依赖声明【P0】

- [ ] **H1-001** 在全新 venv 复现 `tabulate` 缺失。验证：保留失败日志。完成要求：确认根因。
- [ ] **H1-002** 搜索所有 `to_markdown()` 使用点。验证：形成依赖使用清单。完成要求：决定核心/optional dependency 归属。
- [ ] **H1-003** 正确声明 `tabulate`。验证：clean venv 安装后 import 成功。完成要求：不依赖开发机预装。
- [ ] **H1-004** 检查 `.xlsx` 对 `openpyxl` 的依赖。验证：真实 xlsx fixture 读写。完成要求：支持就声明依赖，否则删除支持声明。
- [ ] **H1-005** 检查 `.xls` 支持依赖。验证：真实 xls fixture。完成要求：支持矩阵与实现一致。
- [ ] **H1-006** 检查 parquet/dta/sav 等格式的“登记”与“分析”差异。验证：生成格式能力矩阵。完成要求：不夸大支持范围。
- [ ] **H1-007** 为 analysis/docs/dev extras 各写安装 smoke test。验证：每个 extra 单独安装。完成要求：extra 自洽。
- [ ] **H1-008** 执行 `pip check`。验证：退出码 0。完成要求：无缺失/冲突依赖。
- [ ] **H1-009** Python 3.10 CI 全量测试。验证：0 failed。完成要求：PASS。
- [ ] **H1-010** Python 3.12 CI 全量测试。验证：0 failed。完成要求：PASS。
- [ ] **H1-011** 按 `Requires-Python` 补齐计划支持版本。验证：每个版本独立 CI job。完成要求：README 支持版本等于 CI 覆盖版本。
- [ ] **H1-012** CI 增加 `pip check`。验证：删除必需依赖时 CI 失败。完成要求：依赖回归可捕获。
- [ ] **H1-013** 构建 wheel + sdist。验证：`python -m build` 成功。完成要求：两个发行包均生成。
- [ ] **H1-014** 新 venv 只安装 wheel。验证：`metis --version` + 初始化 smoke test。完成要求：不依赖源码树。
- [ ] **H1-015** 验证 wheel 内包含 workflows/skills 等资源。验证：离开 git repo 后执行加载测试。完成要求：安装包模式与源码模式一致。
- [ ] **H1-016** 重新运行完整测试集。验证：0 failed。完成要求：记录 passed/skipped 数量。
- [ ] **H1-017** 输出 skip 清单。验证：每个 skip 有理由和类别。完成要求：核心能力不可长期隐藏在 skip。

# Phase H2 — 文献持久化、引用池和真实性闸门【P0】

- [ ] **H2-001** 新增机器可读文献持久化存储，例如 `literature/records.jsonl`。验证：重启后全字段恢复。完成要求：records 不只存在内存。
- [ ] **H2-002** LiteratureManager 初始化自动加载已有 records。验证：restart integration test。完成要求：resume 前后 verified 集合一致。
- [ ] **H2-003** 把 verification 从 bool 升级为 `unverified/resolved/verified/conflict/unreachable`。验证：序列化 roundtrip。完成要求：状态语义明确。
- [ ] **H2-004** 为 verification 增加 resolver、timestamp、canonical metadata、match evidence。验证：schema test。完成要求：每条 verified 能解释依据。
- [ ] **H2-005** 删除“URL 前缀即 verified”的自动逻辑。验证：假的 doi.org URL 不得自动通过。完成要求：URL 形式不等于真实性。
- [ ] **H2-006** 实现 DOI resolver 核验。验证：真实 DOI、错误 DOI、title conflict 三类测试。完成要求：元数据匹配后才 verified。
- [ ] **H2-007** 实现 arXiv canonical metadata 核验。验证：真实/伪造 ID。完成要求：ID/title/authors 可核对。
- [ ] **H2-008** 修改 `_write_bib()`，final `references.bib` 只写 verified records。验证：2 verified + 1 unverified 时只能输出 2 条。完成要求：J024 真正成立。
- [ ] **H2-009** 未核验文献保存到独立 records/unverified 视图。验证：能查看但不能进入 final citation pool。完成要求：发现线索与最终引用分离。
- [ ] **H2-010** 修改 `DraftAssembler.verified_citations()`，禁止从无 verification metadata 的 bib key 推断已核验。验证：手工塞假 key 不得被引用。完成要求：引用池单一可信来源。
- [ ] **H2-011** duplicate merge 增加 verification conflict 规则。验证：同 DOI 不同 metadata 不得 silent overwrite。完成要求：冲突显式化。
- [ ] **H2-012** 增加 fuzzy title duplicate。验证：标点、副标题、轻微变体。完成要求：低置信度不自动合并。
- [ ] **H2-013** 引用记录增加文献类型。验证：journal/book/chapter/web/preprint/thesis schema。完成要求：不再全部 `[EB/OL]`。
- [ ] **H2-014** 用经过验证的标准方案实现 GB/T 7714-2015。验证：权威 golden cases。完成要求：项目常见类型全部正确。
- [ ] **H2-015** 实现 APA 7。验证：journal/book/web/DOI golden cases。完成要求：与权威示例一致。
- [ ] **H2-016** 设计稳定唯一 bib key。验证：同作者同年冲突测试。完成要求：不覆盖。
- [ ] **H2-017** QA 增加“正文 key→verified record→verification evidence”全链检查。验证：断任一环即阻断。完成要求：final 零未核验引用。

# Phase H3 — 真实文献来源与搜索回退【P0/P1】

原则：无稳定 API 时优先 Browser/MCP/合法通道，不用不可靠强制爬虫。

- [ ] **H3-001** 为 NCPSSD/ChinaXiv/SinoXiv/Paper.edu/arXiv/Scholar/Web 建 capability 描述。验证：`docs/literature-sources.md`。完成要求：访问模式与限制写清楚。
- [ ] **H3-002** 调研 NCPSSD 当前稳定合法访问路径。验证：保存官方入口与测试证据。完成要求：明确 API/browser-assisted/unsupported。
- [ ] **H3-003** 实现 NCPSSD connector/parser。验证：真实查询返回 title/author/year/url。完成要求：非空且与网页一致。
- [ ] **H3-004** 调研 ChinaXiv 当前访问路径。验证：能力记录。完成要求：明确模式。
- [ ] **H3-005** 实现 ChinaXiv adapter。验证：真实检索至少 3 条并人工/程序核对。完成要求：metadata 一致。
- [ ] **H3-006** 调研 SinoXiv 当前访问路径。验证：能力记录。完成要求：明确模式。
- [ ] **H3-007** 实现 SinoXiv adapter。验证：真实检索。完成要求：metadata 一致。
- [ ] **H3-008** 调研 Paper.edu.cn 当前访问路径。验证：能力记录。完成要求：明确模式。
- [ ] **H3-009** 实现 Paper.edu.cn adapter。验证：真实检索。完成要求：metadata 一致。
- [ ] **H3-010** arXiv 增加 rate limit/retry/backoff/cache。验证：429/500/timeout fixture。完成要求：失败不伪造。
- [ ] **H3-011** 把 arXiv online test 从永久 skip 改为真实 live workflow。验证：手动/计划 workflow 实际执行。完成要求：有真实 PASS/FAIL。
- [ ] **H3-012** Scholar 若无官方自动接口，标记 `browser-assisted/user-provider`。验证：README 不写成原生 API 支持。完成要求：能力声明真实。
- [ ] **H3-013** 实现真实 Web Search provider 接口。验证：host tool 注入后返回结构化结果。完成要求：fallback 可实际工作。
- [ ] **H3-014** Web 发现的论文必须二次 metadata resolver 核验。验证：普通网页不能直接成为 verified paper。完成要求：发现与核验分离。
- [ ] **H3-015** 搜索日志记录 query/source/time/result IDs/verification outcome。验证：抽样 5 条可追溯。完成要求：检索审计完整。
- [ ] **H3-016** 区分网络失败、验证码、登录墙、无结果。验证：不同状态 fixture。完成要求：不全部返回“空”。
- [ ] **H3-017** 多源合并保留 provenance。验证：同 DOI 多源只保留 canonical record 但保留来源列表。完成要求：去重不丢证据。

# Phase H4 — 修正基金/论文/学位 Workflow 语义【P0】

- [ ] **H4-001** 导出三个基金范式的实际 task graph。验证：逐任务审计 S5。完成要求：确认当前是否误执行未来研究。
- [ ] **H4-002** 建立 artifact capability policy。验证：fund/journal/thesis 的 execute/design/optional 规则机器可读。完成要求：Composer 使用该规则。
- [ ] **H4-003** 基金默认把实证阶段改为研究方案设计。验证：fund-quant E2E 无数据时不要求回归。完成要求：不得制造未来结果。
- [ ] **H4-004** 基金已有 pilot data 时增加显式用户选择“是否预分析”。验证：yes/no E2E。完成要求：默认 no。
- [ ] **H4-005** 定性基金只生成案例/访谈/材料/编码计划。验证：无“已访谈 N 人”等虚构内容。完成要求：future-plan 语义正确。
- [ ] **H4-006** 定量基金只生成变量、数据、识别、模型、稳健性计划。验证：无数据时无系数/p 值。完成要求：plan/result 分离。
- [ ] **H4-007** 理论基金生成理论资源和论证计划。验证：claim status=proposed。完成要求：不声称结论已成立。
- [ ] **H4-008** 期刊三范式保留真实研究执行链。验证：三个 E2E。完成要求：范式引擎匹配。
- [ ] **H4-009** 学位论文保留完整研究链。验证：本科/硕士/博士。完成要求：level rules 真实影响验收。
- [ ] **H4-010** StartMode 真正控制跳过/恢复。验证：from_scratch/has_topic/has_data/has_draft/mixed。完成要求：已有产物不被覆盖。
- [ ] **H4-011** 选题、研究问题、方法、数据、最终交付加入人机确认 Gate。验证：未确认不能越过。完成要求：confirmation evidence 持久化。

# Phase H5 — 建立真实 Host Model / LLM Backend【P0/P1】

- [ ] **H5-001** 定义 `ModelBackend` 抽象。验证：接口测试。完成要求：核心不绑定单一模型供应商。
- [ ] **H5-002** 定义 `HarnessModelBackend`，把语义任务交给宿主 Agent/LLM。验证：fake host integration。完成要求：host-driven 模式可用。
- [ ] **H5-003** 定义 standalone backend 插槽。验证：没有 backend 时语义任务 fail-closed。完成要求：禁止固定模板冒充语义完成。
- [ ] **H5-004** 为模型输出建立 JSON/schema contract。验证：无效输出会重试/阻断。完成要求：输出可验证。
- [ ] **H5-005** 模型调用记录 model/provider/version/request/task/input hashes。验证：provenance record。完成要求：语义产物可追溯。
- [ ] **H5-006** 建立 evidence bundle。验证：模型引用不存在 citation key 时 validator 拒绝。完成要求：模型不能自行创造“已验证事实”。
- [ ] **H5-007** 结构化区分 verified_fact / analysis_result / interpretation / hypothesis / suggestion。验证：schema test。完成要求：事实与推测分离。
- [ ] **H5-008** 增加 hallucination guard。验证：伪 DOI/伪 result ID fixture 被阻断。完成要求：final 零虚构引用/数值。
- [ ] **H5-009** 替换 Runtime 关键固定骨架文本为 ModelBackend 生成。验证：placeholder scan。完成要求：语义输出真实生成且受证据约束。

# Phase H6 — Skill 真实动态加载【P1】

- [ ] **H6-001** 审计所有 `skills/*` 完整性。验证：生成 inventory。完成要求：无空技能。
- [ ] **H6-002** 对齐当前 Agent Skills 标准，支持标准 `SKILL.md` 或明确兼容层。验证：parser/schema。完成要求：格式策略公开。
- [ ] **H6-003** 初始化只读 metadata。验证：测量启动 context payload。完成要求：不加载全部技能正文。
- [ ] **H6-004** `SkillRouter.load()` 生成真实 activation payload。验证：含 instruction/version/hash。完成要求：可传宿主。
- [ ] **H6-005** `HarnessAdapter.load_skill()` 返回 ActivationReceipt。验证：receipt 可序列化。完成要求：打印日志不能算成功。
- [ ] **H6-006** Host 不支持卸载时有明确降级。验证：capability test。完成要求：不伪称 unload。
- [ ] **H6-007** budget 改为 token/字符可估算策略。验证：超预算 fixture。完成要求：预算行为可解释。
- [ ] **H6-008** 定量只加载 quant + 当前方法 Skill。验证：activation trace。完成要求：无无关技能。
- [ ] **H6-009** 定性按具体方法加载 Skill。验证：case/interview 两个不同 trace。完成要求：动态加载真实发生。
- [ ] **H6-010** 理论任务加载 theory/argument/citation 最小集合。验证：trace。完成要求：最小必要集。
- [ ] **H6-011** Word/PPT 只在格式阶段加载。验证：S1–S7 trace 无 office skill。完成要求：控制上下文。

# Phase H7 — MCP 真实接入【P1】

- [ ] **H7-001** 选择当前官方 MCP SDK/协议版本。验证：记录版本/规范。完成要求：不自创协议。
- [ ] **H7-002** 定义真实 MCP server config schema。验证：transport/command/url/env/permissions schema。完成要求：secret 不明文记录。
- [ ] **H7-003** 实现 stdio MCP client。验证：本地测试 server initialize。完成要求：真实握手成功。
- [ ] **H7-004** 实现项目需要的远程 transport。验证：fixture server。完成要求：timeout/reconnect 正常。
- [ ] **H7-005** 实现 initialize/handshake。验证：protocol mismatch。完成要求：不兼容清晰失败。
- [ ] **H7-006** 实现 `tools/list`。验证：真实 tool schemas 进入 registry。完成要求：不只依赖手写工具名。
- [ ] **H7-007** 实现 `tools/call`。验证：本地工具真实返回。完成要求：结果进入 Evidence。
- [ ] **H7-008** 实现 MCP health/status。验证：server down/up。完成要求：健康状态真实。
- [ ] **H7-009** 危险工具权限 Gate。验证：未确认写/下载工具拒绝。完成要求：deny 生效。
- [ ] **H7-010** 真实 stage/task tool exposure。验证：不同阶段 host tool list 有变化。完成要求：不只打印。
- [ ] **H7-011** timeout/retry/circuit breaker。验证：hang/断连。完成要求：不会无限阻塞。
- [ ] **H7-012** MCP 日志脱敏。验证：secret scanner。完成要求：0 token/key 泄漏。
- [ ] **H7-013** MCP integration E2E。验证：至少一个真实本地协议 server。完成要求：不能全部 mock。

# Phase H8 — 真正的 Harness / `/metis` 集成【P1】

原则：逐个支持；未实测的不得写 supported。

- [ ] **H8-001** 建立 `HarnessCapabilities`：slash_command/skill_injection/mcp/file_access/buttons/session_state/tool_registration。验证：schema。完成要求：核心按能力降级。
- [ ] **H8-002** 命令注册返回 receipt。验证：CLI 与 host receipt 可序列化。完成要求：区分模拟注册/真实注册。
- [ ] **H8-003** README 将 CLI 标为 reference adapter。验证：文档。完成要求：不等同桌面 Harness。
- [ ] **H8-004** 调研当前 ACP 官方协议。验证：保存版本/capability mapping。完成要求：按当前规范实现。
- [ ] **H8-005** 若 ACP 合适，实现 `metis serve` ACP agent endpoint。验证：协议握手。完成要求：Host 能创建真实 session。
- [ ] **H8-006** 一个真实 ACP Host 完成 `/metis` E2E。验证：真实 UI/日志/Workspace。完成要求：非 CLI 模拟。
- [ ] **H8-007** Zed Adapter/安装说明。验证：真实 Zed 初始化项目。完成要求：通过才标 supported。
- [ ] **H8-008** Codex 当前官方扩展机制适配。验证：真实环境。完成要求：统一入口能挂同一 Workspace workflow。
- [ ] **H8-009** Claude Code 当前官方扩展机制适配。验证：真实环境。完成要求：Skill/MCP/Workspace 一致。
- [ ] **H8-010** Kimi Code 当前官方扩展机制适配。验证：真实环境。完成要求：不支持能力明确降级。
- [ ] **H8-011** 调研 ChatGPT Desktop 当前官方扩展能力。验证：只采用官方路径。完成要求：若无 slash command API，文档明确入口差异。
- [ ] **H8-012** 实现 ChatGPT Desktop 可支持的适配。验证：真实客户端。完成要求：实际能力与矩阵一致。
- [ ] **H8-013** 每个 Adapter 有 install/uninstall/smoke test。验证：全新环境。完成要求：无隐藏手工步骤。
- [ ] **H8-014** 生成 `docs/HARNESS_SUPPORT_MATRIX.md`。验证：每个绿色能力对应实测证据。完成要求：无“理论支持”。

# Phase H9 — 数据获取与来源真实性【P0/P1】

- [ ] **H9-001** 建立 `DataSourceRecord`。验证：URL/provider/license/retrieved/hash/version 字段完整。完成要求：数据可追溯。
- [ ] **H9-002** 接入 `metis-data` 真实索引或稳定接口。验证：真实查询一个数据集。完成要求：不再只有注入字典。
- [ ] **H9-003** 无用户数据时 Runtime 实际调用数据搜索。验证：E2E 捕获 search action。完成要求：不只写缺口说明。
- [ ] **H9-004** 找不到数据时阻塞需要数据的任务。验证：quant journal 无数据 S5 BLOCKED。完成要求：不得伪造回归。
- [ ] **H9-005** 下载增加 content-type/size/checksum。验证：HTML 伪 CSV、超大文件、hash mismatch。完成要求：异常阻断。
- [ ] **H9-006** 数据 license/terms 字段。验证：未知许可标 unknown。完成要求：不虚构许可。
- [ ] **H9-007** raw immutable。验证：修改 raw 后 integrity check 失败。完成要求：hash 审计有效。
- [ ] **H9-008** 数据字典不再只看第一行。验证：缺失首行/混合类型 fixture。完成要求：列类型可靠。
- [ ] **H9-009** 识别 ID/date/category/numeric/text。验证：golden fixture。完成要求：为方法路由提供 metadata。
- [ ] **H9-010** 格式支持 fail-closed。验证：每个声称支持格式有 read test。完成要求：README 与实现一致。
- [ ] **H9-011** 每个 raw 文件必须有 source record 或 user_upload provenance。验证：孤儿数据 fixture。完成要求：无孤儿数据。

# Phase H10 — 定量研究引擎方法学整改【P0】

原则：统计正确性优先于功能数量。

- [ ] **H10-001** 删除根据字段名/首尾数值列自动决定 DV/IV 的研究设计逻辑。验证：随机字段名不会自动形成模型。完成要求：变量来自 Research Design/用户确认。
- [ ] **H10-002** 新增 `QuantResearchDesign` schema，含 outcome/exposure/controls/unit/time/design/estimand/assumptions。验证：schema。完成要求：执行前必须存在。
- [ ] **H10-003** 增加变量和识别策略用户确认 Gate。验证：未确认不能 baseline。完成要求：confirmation evidence 落盘。
- [ ] **H10-004** 使用成熟统计库作为主要估计实现。验证：golden regression。完成要求：系数/SE/p 可核验。
- [ ] **H10-005** OLS 使用正确 df 与 t 推断。验证：参考实现逐值对比。完成要求：tolerance 内一致。
- [ ] **H10-006** 支持 HC robust SE。验证：HC1/HC3 对比参考库。完成要求：covariance type 入结果。
- [ ] **H10-007** 支持 cluster SE（设计允许时）。验证：clustered DGP。完成要求：cluster var 明确。
- [ ] **H10-008** 正确实现 BP/White 或删除误导命名。验证：stat/p 与参考库一致。完成要求：不以 R² 冒充检验。
- [ ] **H10-009** VIF 与参考实现对比。验证：正常/完美共线场景。完成要求：行为正确。
- [ ] **H10-010** 稳健性改为 design-driven registry。验证：不同 design 产生不同 plan。完成要求：不固定偶数行半样本。
- [ ] **H10-011** 删除默认 `iv²`“额外控制”。验证：代码搜索。完成要求：只有理论/设计要求时加入。
- [ ] **H10-012** 重写 IV/2SLS。验证：第一阶段 endogenous~instrument+controls；第二阶段正确；与参考实现一致。完成要求：删除错误 `2sls_simplified`。
- [ ] **H10-013** 增加 first-stage relevance/weak instrument 诊断。验证：强弱 IV DGP。完成要求：弱工具变量发出阻断/警告。
- [ ] **H10-014** 多 IV 若支持则做 overidentification；不支持则 fail-closed。验证：能力测试。完成要求：边界真实。
- [ ] **H10-015** 异质性增加 interaction/正式差异检验。验证：known subgroup DGP。完成要求：不凭系数大小声称组间差异。
- [ ] **H10-016** 中介分析实现 indirect effect uncertainty 或明确 exploratory。验证：synthetic mediation。完成要求：不自动称“机制证实”。
- [ ] **H10-017** panel schema。验证：entity/time index。完成要求：无 panel id 不跑 panel model。
- [ ] **H10-018** 实现 FE。验证：参考实现。完成要求：entity/time FE 明确。
- [ ] **H10-019** 实现 RE（若列为支持）。验证：参考实现。完成要求：support matrix 对齐。
- [ ] **H10-020** FE/RE 决策由研究设计或正确诊断支持。验证：规则测试。完成要求：避免机械自动选。
- [ ] **H10-021** DID 必须有 treatment/time 定义。验证：synthetic DID。完成要求：无识别条件不运行。
- [ ] **H10-022** DID 增加 event study/parallel trends。验证：满足/违反 DGP。完成要求：失败时禁止强因果语言。
- [ ] **H10-023** PSM/RDD/GMM/空间计量逐个标 implement/plugin/unsupported。验证：方法矩阵。完成要求：未实现不写“已支持”。
- [ ] **H10-024** 每个结果保存 data hash/formula/estimator/SE/N/seed/version。验证：machine result schema。完成要求：完全可追踪。
- [ ] **H10-025** 结果解释只能引用 machine result。验证：篡改 summary 后一致性测试发现。完成要求：数字单一事实源。
- [ ] **H10-026** 因果措辞由 estimand + identification_status 控制。验证：普通 OLS 不自动因果化。完成要求：QA 阻断越界。
- [ ] **H10-027** Quant E2E 加 3 个不同字段名/不同 DGP。验证：不依赖 digital/consume。完成要求：泛化通过。

# Phase H11 — 定性研究引擎整改【P0】

- [ ] **H11-001** 定义 `QualitativeProjectState`。验证：materials/codebook/codings/themes/cases 可持久化。完成要求：阶段间不依赖同一对象。
- [ ] **H11-002** 实现 `load_state()`。验证：进程重启恢复。完成要求：counts 不丢。
- [ ] **H11-003** aggregate 先加载 codings。验证：10 条编码 sum=10。完成要求：不空统计。
- [ ] **H11-004** mechanism 加载 codings/codebook/themes。验证：引用 code 全存在。完成要求：机制非空可追溯。
- [ ] **H11-005** themes 加载 materials/codebook/codings。验证：theme count 与 coding 对应。完成要求：0 证据主题不能通过。
- [ ] **H11-006** evidence_chain 加载 codebook/codings。验证：theme→code→quote→material 全链。完成要求：完整证据链。
- [ ] **H11-007** quote provenance 加 source hash + unit offset/index。验证：改原文后 check 失败。完成要求：引文不可漂移。
- [ ] **H11-008** 硬编码 3-code 方案降级为 demo。验证：真实项目 codebook 来自 ModelBackend/用户确认。完成要求：研究特定编码。
- [ ] **H11-009** 初始编码标 `machine_suggested`。验证：状态字段。完成要求：不等同人工确认。
- [ ] **H11-010** confirm/edit/reject 编码流程。验证：事件持久化。完成要求：用户可控制。
- [ ] **H11-011** 区分 case/interview/thematic/content/discourse/grounded theory 工作流。验证：任务图不同。完成要求：方法动态路由。
- [ ] **H11-012** deviant case 不只靠转折词。验证：无转折词反例 fixture。完成要求：基于 claim/theme 搜索或人工标记。
- [ ] **H11-013** saturation 自动指标改为 heuristic。验证：报告用语不越界。完成要求：理论饱和需分析依据/人工确认。
- [ ] **H11-014** 可选 intercoder agreement。验证：双编码 fixture。完成要求：指标定义正确。
- [ ] **H11-015** Qual E2E 检查真实 quote 可回原材料。验证：抽样 100% 定位。完成要求：空壳文件失败。

# Phase H12 — 理论阐释引擎整改【P0】

- [ ] **H12-001** 定义 `TheoreticalProjectState`。验证：concepts/claims/evidence/counters/edges/genealogy roundtrip。完成要求：schema version。
- [ ] **H12-002** 每个 theory action 开始加载 state。验证：跨进程 TH9→TH13 edges 保留。完成要求：不丢状态。
- [ ] **H12-003** 每个变更后保存 state。验证：中断恢复。完成要求：可恢复。
- [ ] **H12-004** `th_argument_map` 用真实 state。验证：至少 1 evidence_for + 1 supports。完成要求：空图不 pass。
- [ ] **H12-005** literature evidence 指向 verified literature ID。验证：`待补充` 不得通过。完成要求：证据真实。
- [ ] **H12-006** counter target claim 必须存在。验证：悬空 target 失败。完成要求：结构完整。
- [ ] **H12-007** unsupported 检查区分总/分命题。验证：无证据命题失败。完成要求：空 state 不能得到全通过。
- [ ] **H12-008** edge endpoint 全部存在。验证：悬空边 fixture。完成要求：图有效。
- [ ] **H12-009** 循环论证检测。验证：A→B→A。完成要求：阻断。
- [ ] **H12-010** 概念未定义/冲突检测。验证：fixture。完成要求：进入 QA。
- [ ] **H12-011** Claim status 增加 proposed/supported/contested/rejected。验证：无证据只能 proposed。完成要求：不默认“成立”。
- [ ] **H12-012** 删除固定“核心机制成立”等假结论。验证：代码搜索。完成要求：命题来自 ModelBackend + evidence。
- [ ] **H12-013** contribution 必须有 prior-work comparison。验证：无 comparison evidence 不得标 supported contribution。完成要求：创新有依据。
- [ ] **H12-014** Theory E2E 检查 claims/evidence/edges 非空和全部可解析。验证：semantic invariants。完成要求：文件存在不够。

# Phase H13 — Research Design / Method Router【P0/P1】

- [ ] **H13-001** 新增 `research/design.yaml`。验证：RQ/constructs/evidence needs/method rationale 完整。完成要求：Router 不再从文件名猜。
- [ ] **H13-002** 每个 RQ 唯一 ID。验证：重复检测。完成要求：可映射任务/结果。
- [ ] **H13-003** 每个 RQ 映射 evidence needs。验证：非空。完成要求：最终结论可回溯。
- [ ] **H13-004** Method Router 输入 RQ/data/design/identification/constraints。验证：单元测试。完成要求：不只看 paradigm。
- [ ] **H13-005** Method Router 输出方法、理由、前提、不适用条件。验证：schema。完成要求：用户可审阅。
- [ ] **H13-006** 用户确认后锁定 design version。验证：变更产生 revision。完成要求：方法不静默漂移。
- [ ] **H13-007** 任务树按 design 动态生成。验证：两个 quant design 任务图不同。完成要求：不固定全 QT 链。
- [ ] **H13-008** 每个 task 关联 RQ/evidence_need。验证：孤立任务检测。完成要求：任务有研究目的。
- [ ] **H13-009** 访谈/个人数据触发 ethics/privacy gate。验证：fixture。完成要求：审批不能自动假定已获得。

# Phase H14 — 证据约束成文系统【P0/P1】

- [ ] **H14-001** 建立 `SectionWritingRequest`。验证：section/RQ/evidence/citations/results/word_target 完整。完成要求：输入可审计。
- [ ] **H14-002** 建立 `SectionWritingResult`。验证：正文/claims/citation keys/result refs 分离。完成要求：claim 可验证。
- [ ] **H14-003** `writing.section` 接 ModelBackend。验证：无固定括号占位。完成要求：真实生成正文。
- [ ] **H14-004** 章节只能使用 evidence bundle 的 citation key。验证：越界 key 拒绝。完成要求：零幽灵引用。
- [ ] **H14-005** 数值必须从 result ID 注入。验证：每个数值可解析回 JSON。完成要求：禁止模型自由写数值。
- [ ] **H14-006** 增加 placeholder detector。验证：待补/to be finalized/依...撰写/由生成器组装/示意 等阻断。完成要求：final 0 placeholder。
- [ ] **H14-007** 文献综述带 literature ID mapping。验证：引用全部 verified。完成要求：文献事实可查。
- [ ] **H14-008** 摘要最后生成。验证：RQ/method/result 与正文一致。完成要求：不提前猜结果。
- [ ] **H14-009** 结论按 RQ coverage 生成。验证：每个 RQ 有 answer/evidence。完成要求：未回答不能声称已回答。
- [ ] **H14-010** Discussion 区分 result/interpretation/hypothesis/limitation。验证：schema。完成要求：推测不写事实。
- [ ] **H14-011** English manuscript 完整生成/翻译。验证：无中文占位/unfinished abstract。完成要求：完整可读。
- [ ] **H14-012** terminology glossary。验证：核心译名全文一致。完成要求：术语一致。

# Phase H15 — 基金生成器整改【P0/P1】

- [ ] **H15-001** 删除固定模拟评审分数。验证：固定 80/75/78/72 不再出现。完成要求：无假评分。
- [ ] **H15-002** 定义 rubric review schema。验证：criterion/evidence/issue/suggestion。完成要求：评价可解释。
- [ ] **H15-003** 若保留数值评分，必须有明确 rubric 计算规则。验证：同输入可复现。完成要求：不随机/固定。
- [ ] **H15-004** 基金模板真实提取栏目/字数/说明。验证：至少 2 个不同模板 fixture。完成要求：不只识别 Heading。
- [ ] **H15-005** 模板解析失败则阻断并请用户确认。验证：复杂模板。完成要求：不静默套默认。
- [ ] **H15-006** 每个栏目通过 ModelBackend + evidence bundle 成文。验证：无固定虚构语句。完成要求：缺材料就明确缺口。
- [ ] **H15-007** 研究基础只能来自用户材料。验证：空 Workspace 不得生成“团队已完成预调研”。完成要求：零虚构履历/成果。
- [ ] **H15-008** 创新点比较 prior literature。验证：无 comparison evidence 时仅 proposed。完成要求：创新有依据。
- [ ] **H15-009** 字数按真实模板限制。验证：边界值测试。完成要求：规则准确。

# Phase H16 — 期刊适配整改【P1】

- [ ] **H16-001** 作者指南保存来源 URL/文件与获取日期。验证：provenance。完成要求：不凭默认规则冒充期刊要求。
- [ ] **H16-002** 无目标期刊时标 generic journal mode。验证：无具体期刊声明。完成要求：语义真实。
- [ ] **H16-003** 提取结构/字数/摘要/引用/图表/匿名/补充材料规则。验证：至少 2 个真实期刊 fixture。完成要求：字段有来源证据。
- [ ] **H16-004** 引用样式真实应用到稿件。验证：golden references。完成要求：不只保存 rule 字段。
- [ ] **H16-005** 匿名化覆盖作者/机构/致谢/身份线索。验证：fixture。完成要求：真实断言，无 `or True`。
- [ ] **H16-006** 英文 style check 真正检查术语/混语/长句等。验证：故意错误 fixture。完成要求：错误可被发现。
- [ ] **H16-007** submission validator 按作者指南阻断。验证：违反规则 fixture。完成要求：合格才交付。

# Phase H17 — 学位论文链整改【P1】

- [ ] **H17-001** 本科/硕士/博士用真实质量规则区分。验证：同稿在三层级 QA 不同。完成要求：不只是任务 ID 不同。
- [ ] **H17-002** 8000/30000/80000 等默认字数标为可配置 heuristic。验证：学校模板覆盖默认。完成要求：不当成通用事实。
- [ ] **H17-003** 学校模板覆盖封面/声明/目录/章节/页码/参考文献。验证：真实复杂模板。完成要求：无静默退化。
- [ ] **H17-004** 开题报告真实读取 topic/design 生成。验证：内容完整。完成要求：不只写一句“依...生成”。
- [ ] **H17-005** 中期报告读取 task-state/evidence。验证：30%/80% 进度输出不同。完成要求：真实进度。
- [ ] **H17-006** 博士创新点有 claim→evidence→chapter mapping。验证：无 evidence 阻断。完成要求：创新可证。
- [ ] **H17-007** 章节贡献矩阵真实生成。验证：章/RQ/data/result 对应。完成要求：非空。
- [ ] **H17-008** 答辩问题基于具体稿件局限/方法/结果。验证：引用具体章/结果。完成要求：非通用问题清单。

# Phase H18 — Word / DOCX 生产化【P1/P2】

- [ ] **H18-001** 建立 package-level DOCX parser。验证：读取 styles.xml/numbering.xml/settings.xml/sectPr。完成要求：复杂样式信息可提取。
- [ ] **H18-002** 解析多 section page/margin/orientation。验证：多节 fixture。完成要求：每节保留。
- [ ] **H18-003** 解析 East Asian/Western fonts。验证：`w:eastAsia` fixture。完成要求：中文字体真实应用。
- [ ] **H18-004** 解析 paragraph spacing/indent/alignment。验证：roundtrip。完成要求：关键版式一致。
- [ ] **H18-005** 解析 heading style 与 basedOn。验证：自定义中文标题样式。完成要求：不依赖 Heading 1 名称。
- [ ] **H18-006** 解析 numbering.xml。验证：多级编号。完成要求：章节编号正确。
- [ ] **H18-007** 解析并复刻 header/footer 内容。验证：生成后一致。完成要求：不只记录 bool。
- [ ] **H18-008** 解析页码 field。验证：页码存在/格式正确。完成要求：学位论文可用。
- [ ] **H18-009** 解析 TOC field/目录样式。验证：Word 可更新目录。完成要求：非纯文本占位。
- [ ] **H18-010** 解析 caption style 与图表编号。验证：图 1-1/表 1-1。完成要求：题注一致。
- [ ] **H18-011** Markdown/Artifact 表格生成真实 Word table。验证：docx XML 有 `<w:tbl>`。完成要求：不再写 `|...|` 段落。
- [ ] **H18-012** figures 真实嵌入 DOCX。验证：media + relationship。完成要求：图可见。
- [ ] **H18-013** 支持书签/交叉引用策略。验证：图表引用可定位。完成要求：避免纯文本失联。
- [ ] **H18-014** 生成时优先复制用户模板再填充。验证：原自定义样式仍存在。完成要求：模板保真。
- [ ] **H18-015** 自然语言格式与模板冲突有优先级。验证：冲突 fixture。完成要求：行为可预测。
- [ ] **H18-016** Word verify 增加 style/section/table/image/header/footer。验证：故意破坏一项时失败。完成要求：不只看非空。
- [ ] **H18-017** 增加视觉渲染检查。验证：DOCX→PDF/页面检查。完成要求：无明显重叠/截断。
- [ ] **H18-018** 保存可复用模板 spec + 原始 template artifact。验证：新 Workspace 复现。完成要求：可复用。

# Phase H19 — PPT 集成与真实性【P2】

- [ ] **H19-001** 文档明确内置 PPT 是 fallback。验证：README。完成要求：能力不夸大。
- [ ] **H19-002** 外部 PPT Skill 返回 receipt/provenance。验证：integration fixture。完成要求：知道生成器来源。
- [ ] **H19-003** PPT 只能引用已有 figure/table/result。验证：不存在路径时阻断。完成要求：无虚构图表。
- [ ] **H19-004** PPT 内容映射论文真实章节/结论。验证：slide claims 可回 manuscript/result。完成要求：结论一致。
- [ ] **H19-005** fallback 真正应用 style 配置。验证：两种 style 输出有可观察差异。完成要求：style 不是死字段。
- [ ] **H19-006** PPT verify 检查明显文字/图片溢出。验证：超长 slide fixture。完成要求：明显不可读不能 pass。

# Phase H20 — Validation 与 Evidence 深度整改【P0】

- [ ] **H20-001** 删除 `sections_consistent` 的 `or True`。验证：分支测试。完成要求：无恒真逻辑。
- [ ] **H20-002** 全仓搜索 `or True`。验证：生产/测试无用于绕过验证的写法。完成要求：0 绕过。
- [ ] **H20-003** 搜索 `placeholder/TODO/FIXME/待补/to be finalized/依...撰写`。验证：分类并处理。完成要求：最终执行路径无占位。
- [ ] **H20-004** `results.reproducible` 真实 subprocess 重跑。验证：同输入输出 hash 一致。完成要求：不只查文件存在。
- [ ] **H20-005** repro 在新进程/临时环境执行。验证：无 global state 依赖。完成要求：clean execution。
- [ ] **H20-006** figure provenance 建 figure→task→result→data hash。验证：断边即失败。完成要求：每图可追溯。
- [ ] **H20-007** writing evidence 从字符串检查升级为 claim mapping。验证：只写 `results/` 字样不能通过。完成要求：关键 claim 有 evidence。
- [ ] **H20-008** English style rule 执行真实 validator。验证：错误 fixture 失败。完成要求：不默认 True。
- [ ] **H20-009** final citation rule 要求 verified。验证：✗ 条目进入 final bib 时失败。完成要求：真实性 gate 严格。
- [ ] **H20-010** stage validator 加 semantic invariant。验证：空 argument/evidence/results 均失败。完成要求：存在性不够。
- [ ] **H20-011** Task Evidence 保存 input/output hash。验证：artifact 可回溯。完成要求：证据具体。
- [ ] **H20-012** Evidence 写入原子化/锁。验证：并发压力测试。完成要求：JSONL 不损坏。
- [ ] **H20-013** passed task 必须有 execution + validation evidence。验证：手工改 passed 无 evidence 时 QA 失败。完成要求：状态证据绑定。
- [ ] **H20-014** QA blockers 加 unverified citation/placeholder/invalid method/missing provenance/empty semantic artifacts。验证：逐项 fixture。完成要求：全部阻断。

# Phase H21 — 安全与不可信输入【P1/P2】

- [ ] **H21-001** Workspace path traversal 审计。验证：`../../outside` 拒绝。完成要求：写入不越 root。
- [ ] **H21-002** 上传文件名 traversal。验证：恶意文件名。完成要求：安全规范化。
- [ ] **H21-003** URL 下载 SSRF 防护。验证：localhost/private IP/metadata endpoint。完成要求：默认阻止危险目标。
- [ ] **H21-004** 下载 size/time limit。验证：超限。完成要求：不会无限下载。
- [ ] **H21-005** DOCX/ZIP 防 zip bomb。验证：压缩比/文件数量限制。完成要求：恶意包拒绝。
- [ ] **H21-006** MCP env/secrets 不写日志。验证：secret scan。完成要求：0 泄漏。
- [ ] **H21-007** subprocess 无 shell injection。验证：恶意路径参数。完成要求：安全调用。
- [ ] **H21-008** run_all.py 生成内容防代码注入。验证：恶意字段 fixture。完成要求：参数严格序列化。
- [ ] **H21-009** 依赖漏洞扫描。验证：pip-audit 或等价。完成要求：高危处置/记录。
- [ ] **H21-010** GitHub code/secret scanning。验证：workflow。完成要求：公开仓库无 secret。

# Phase H22 — 测试体系重构【P0/P1】

- [ ] **H22-001** 修复 `assert ... or True`。验证：匿名化故意失败时测试红。完成要求：断言有效。
- [ ] **H22-002** E2E 加内容 invariant。验证：空壳 theory/qual 文件失败。完成要求：不只检查存在。
- [ ] **H22-003** Quant E2E 使用多 DGP。验证：线性/异方差/内生性。完成要求：统计链可靠。
- [ ] **H22-004** Qual E2E 使用多材料、多主题、有反例 fixture。验证：evidence chain 回原文。完成要求：真实状态链。
- [ ] **H22-005** Theory E2E 使用非空 claim graph。验证：重启后数量/关系一致。完成要求：持久化有效。
- [ ] **H22-006** 文献测试分 unit/recorded/live。验证：marker 明确。完成要求：live 不永久 skip。
- [ ] **H22-007** 文献源 live tests 独立 workflow。验证：手动/定时触发。完成要求：站点变化可发现。
- [ ] **H22-008** Word test 增加复杂 DOCX fixture。验证：styles/numbering/header/footer/table。完成要求：模板保真。
- [ ] **H22-009** Harness integration tests 独立。验证：真实宿主记录。完成要求：support matrix 有证据。
- [ ] **H22-010** resume/recovery E2E。验证：各关键 Stage 中断恢复。完成要求：不丢状态。
- [ ] **H22-011** corrupted state tests。验证：坏 YAML/JSON fail-closed + backup。完成要求：不静默覆盖。
- [ ] **H22-012** idempotency tests。验证：重复执行 passed task 不破坏产物。完成要求：行为明确。
- [ ] **H22-013** 生成 coverage report。验证：人工审阅关键未覆盖路径。完成要求：核心分支覆盖充分。
- [ ] **H22-014** validator mutation/adversarial fixtures。验证：删/改证据能被发现。完成要求：validator 不能轻易“绿化”。

# Phase H23 — CI/CD 与跨平台【P1/P2】

- [ ] **H23-001** Linux clean CI。验证：全绿。完成要求：0 failed。
- [ ] **H23-002** Windows clean CI。验证：路径/CRLF/核心功能。完成要求：支持声明真实。
- [ ] **H23-003** macOS clean CI。验证：核心测试。完成要求：支持声明真实。
- [ ] **H23-004** Python 最低支持版本 CI。验证：全绿。完成要求：与 pyproject 一致。
- [ ] **H23-005** Python 最新计划支持版本 CI。验证：全绿。完成要求：README 一致。
- [ ] **H23-006** ruff lint。验证：0 error。完成要求：不靠大范围 ignore。
- [ ] **H23-007** format check。验证：0 error。完成要求：一致。
- [ ] **H23-008** type checking。验证：核心模块无未处理高风险错误。完成要求：类型策略固定。
- [ ] **H23-009** build wheel/sdist。验证：0。完成要求：每次发布必跑。
- [ ] **H23-010** wheel install test。验证：脱离源码树。完成要求：资源完整。
- [ ] **H23-011** dependency audit。验证：artifact。完成要求：高危处置。
- [ ] **H23-012** GitHub Actions 使用当前受支持 action runtime。验证：消除可修复的弃用警告。完成要求：CI 可长期运行。
- [ ] **H23-013** 上传 test/coverage/audit artifacts。验证：Actions 页面可下载。完成要求：发布证据公开。

# Phase H24 — 文档与开源仓库【P2/P3】

- [ ] **H24-001** 添加实际 `LICENSE`。验证：与 pyproject 一致。完成要求：许可证完整。
- [ ] **H24-002** 添加 `SECURITY.md`。验证：漏洞报告方式/安全边界。完成要求：无 secret。
- [ ] **H24-003** 添加 `CONTRIBUTING.md`。验证：第三方按文档可安装测试。完成要求：可复现。
- [ ] **H24-004** README 加真实支持矩阵。验证：每个 supported 项有 evidence。完成要求：无未来能力冒充已实现。
- [ ] **H24-005** README 区分 prototype/experimental/supported。验证：每项有状态。完成要求：预期准确。
- [ ] **H24-006** 测试数量改为 CI 自动来源。验证：不手写过期数字。完成要求：公开事实一致。
- [ ] **H24-007** `IMPLEMENTATION_STATUS.md` 改“implemented + verified”双状态。验证：implemented 不自动 verified。完成要求：不再代码写完即 100%。
- [ ] **H24-008** final-report 引用最新 commit/CI/full audit。验证：SHA 一致。完成要求：报告不可复用旧结果。
- [ ] **H24-009** Architecture 文档。验证：Core/ModelBackend/Skill/MCP/Harness/Workspace 与代码一致。完成要求：新开发者可理解。
- [ ] **H24-010** Research Integrity 文档。验证：引用/数据/统计/AI 成文/确认规则完整。完成要求：底线公开。
- [ ] **H24-011** Supported Methods 文档。验证：每方法 implementation/test status。完成要求：未实现明确。
- [ ] **H24-012** Literature Sources 文档。验证：每来源 access mode/live-test date。完成要求：站点能力透明。

# Phase H25 — 九组合 + 层级 + 语言全量 E2E【最终前置 Gate】

- [ ] **H25-001** 基金×定性。验证：输出研究计划，不伪造已完成访谈/田野结果。完成要求：PASS。
- [ ] **H25-002** 基金×定量。验证：无数据只输出设计；pilot 需显式授权。完成要求：PASS。
- [ ] **H25-003** 基金×理论。验证：理论研究计划/文献谱系真实。完成要求：PASS。
- [ ] **H25-004** 期刊×定性。验证：材料→编码→主题→证据链→论文。完成要求：PASS。
- [ ] **H25-005** 期刊×定量。验证：数据→design→model→result→repro→论文。完成要求：PASS。
- [ ] **H25-006** 期刊×理论。验证：verified literature→claims→argument graph→counterarguments→论文。完成要求：PASS。
- [ ] **H25-007** 学位×定性。验证：完整 thesis workflow。完成要求：PASS。
- [ ] **H25-008** 学位×定量。验证：完整可复现链。完成要求：PASS。
- [ ] **H25-009** 学位×理论。验证：论证链完整。完成要求：PASS。
- [ ] **H25-010** 本科 E2E。验证：level-specific QA。完成要求：PASS。
- [ ] **H25-011** 硕士 E2E。验证：level-specific QA。完成要求：PASS。
- [ ] **H25-012** 博士 E2E。验证：创新证据/章节贡献矩阵/理论主线。完成要求：PASS。
- [ ] **H25-013** 中文期刊 E2E。验证：引用样式正确。完成要求：PASS。
- [ ] **H25-014** 英文期刊 E2E。验证：目标样式/术语一致/无中文占位。完成要求：PASS。
- [ ] **H25-015** 英文学位模式（若声明支持）。验证：模板/语言完整。完成要求：PASS；否则明确 UNSUPPORTED。

# Phase H26 — Harness 实机验收【最终前置 Gate】

每个准备在 README 标为 supported 的 Harness 必须完成：安装→空 Workspace→统一入口→向导→Skill→MCP→文献任务→中断→恢复→最小项目→交付。

- [ ] **H26-001** Reference CLI 实机。验证：完整日志。完成要求：PASS。
- [ ] **H26-002** 第一个真实 IDE/ACP Host。验证：UI/日志/Workspace。完成要求：PASS。
- [ ] **H26-003** Zed（若声明支持）。验证：实机。完成要求：PASS 或降级支持状态。
- [ ] **H26-004** Codex（若声明支持）。验证：实机。完成要求：PASS 或降级。
- [ ] **H26-005** Claude Code（若声明支持）。验证：实机。完成要求：PASS 或降级。
- [ ] **H26-006** Kimi Code（若声明支持）。验证：实机。完成要求：PASS 或降级。
- [ ] **H26-007** ChatGPT Desktop（若声明支持）。验证：严格按当前官方扩展能力。完成要求：无 slash API 时明确使用其他入口。

# Phase H27 — 最终真实性与可用性全量复核【必须最后执行】

从 clean clone 重新开始，不复用开发阶段结论。

- [ ] **H27-001** 新目录 clone 公共仓库。验证：`git status` clean。完成要求：clean clone。
- [ ] **H27-002** 只按 README 安装。验证：所有命令成功。完成要求：第三方可复现。
- [ ] **H27-003** build wheel/sdist。验证：成功。完成要求：PASS。
- [ ] **H27-004** wheel-only install。验证：资源可见。完成要求：PASS。
- [ ] **H27-005** lint。完成要求：0 error。
- [ ] **H27-006** format。完成要求：0 error。
- [ ] **H27-007** type checks。完成要求：0 未处理关键错误。
- [ ] **H27-008** unit tests。完成要求：0 failed。
- [ ] **H27-009** integration tests。完成要求：0 failed。
- [ ] **H27-010** all E2E。完成要求：0 failed。
- [ ] **H27-011** live literature workflow。完成要求：支持源真实返回；不可达源明确报告。
- [ ] **H27-012** security/dependency audit。完成要求：无未处置 high/critical。
- [ ] **H27-013** 扫描全部 final references。验证：每条有 verification evidence。完成要求：100%。
- [ ] **H27-014** DOI/arXiv/URL 与 canonical metadata 对比。完成要求：title/authors/year 无未解释冲突。
- [ ] **H27-015** `references.bib` 无 unverified。完成要求：0。
- [ ] **H27-016** 正文 citation key 全存在且 verified。完成要求：100%。
- [ ] **H27-017** raw data 全有 provenance/hash/license。完成要求：100%。
- [ ] **H27-018** final results 的 data hash 与处理链一致。完成要求：100%。
- [ ] **H27-019** fixture/synthetic 数据不得泄漏进标为真实研究的 deliverable。完成要求：0。
- [ ] **H27-020** final quant fixture 用独立 reference implementation 重跑。完成要求：主要结果 tolerance 内一致。
- [ ] **H27-021** 检查 SE/p/test statistic。完成要求：一致。
- [ ] **H27-022** 检查因果措辞有对应识别设计。完成要求：0 越界。
- [ ] **H27-023** 稳健性/机制/异质性文字与实际执行一致。完成要求：0 虚构分析。
- [ ] **H27-024** 抽样 qualitative quote 回原材料。完成要求：100% 可定位。
- [ ] **H27-025** 每个 theme 有 coding evidence。完成要求：100%。
- [ ] **H27-026** 每个 mechanism/claim 有 evidence chain。完成要求：100%。
- [ ] **H27-027** saturation/deviant case 用语不过度。完成要求：无越界声称。
- [ ] **H27-028** theory 核心 Claim 有 definition + support path。完成要求：100%。
- [ ] **H27-029** theory literature evidence 全指向 verified record。完成要求：100%。
- [ ] **H27-030** argument graph 无悬空边/核心孤立节点/循环。完成要求：PASS。
- [ ] **H27-031** contribution 与 prior literature 有明确比较。完成要求：无空泛创新。
- [ ] **H27-032** 扫描最终稿 placeholder。完成要求：0。
- [ ] **H27-033** 正文数值映射 result artifact。完成要求：100%。
- [ ] **H27-034** 正文事实性引文映射 verified citation。完成要求：100%。
- [ ] **H27-035** 基金研究基础/既有成果只来自用户材料。完成要求：0 虚构。
- [ ] **H27-036** 打开全部 DOCX。完成要求：无修复提示。
- [ ] **H27-037** 检查标题/编号/表格/图片/题注/页眉页脚/页码。完成要求：按模板正确。
- [ ] **H27-038** DOCX/PDF 视觉抽检。完成要求：无明显重叠/截断/空白异常。
- [ ] **H27-039** 打开全部 PPTX。完成要求：可正常打开。
- [ ] **H27-040** PPT 图表/结论与论文一致。完成要求：0 冲突。
- [ ] **H27-041** 扫描所有 task status。完成要求：无 failed/blocked/running/pending；skipped 必须有理由。
- [ ] **H27-042** 每个 passed task 有 execution + validation evidence。完成要求：100%。
- [ ] **H27-043** 每个 deliverable 有 hash/provenance。完成要求：100%。
- [ ] **H27-044** 从交付结论回溯 Workspace evidence。验证：系统抽样/人工抽样。完成要求：全部通过。
- [ ] **H27-045** README support matrix 与实测结果逐项比对。完成要求：0 夸大。
- [ ] **H27-046** 方法支持列表与实测逐项比对。完成要求：0 夸大。
- [ ] **H27-047** 文献来源支持列表与 live tests 比对。完成要求：0 夸大。
- [ ] **H27-048** 测试数量与最新 CI 自动结果比对。完成要求：一致。

# Phase H28 — 最终发布 Gate

- [ ] **H28-001** 生成 `docs/RELEASE_VERIFICATION.md`。验证：commit/environment/tests/CI/E2E/live/harness/limitations 证据齐全。完成要求：可独立审计。
- [ ] **H28-002** 生成 `docs/CAPABILITY_MATRIX.md`。验证：每个 supported cell 有 evidence。完成要求：无凭空绿色。
- [ ] **H28-003** 更新 `IMPLEMENTATION_STATUS.md`。验证：完成项同时有 verified evidence。完成要求：状态真实。
- [ ] **H28-004** 更新 `docs/final-report.md`。验证：引用最终 SHA 与最新 CI。完成要求：不复用旧“217 全绿”。
- [ ] **H28-005** 最终 `git diff`/secret/debug fixture 审查。验证：无临时/secret。完成要求：clean。
- [ ] **H28-006** 最终 target commit GitHub Actions。验证：所有 required jobs green。完成要求：必须是最终 commit。
- [ ] **H28-007** 最终公开仓库 clean clone smoke：安装→metis→初始化→最小项目。验证：PASS。完成要求：第三方可用。
- [ ] **H28-008** 给出最终 verdict：`PASS` / `PASS WITH DOCUMENTED LIMITATIONS` / `FAIL`。验证：P0 仍有 Blocked/Failed 时不得 PASS。完成要求：结论有证据。

---

# 3. 最终“完成”定义

METIS ACADEMIC 只有同时满足以下条件，才能称为本轮整改完成：

```text
[CI]
最终公开 commit CI 全绿
clean install 全绿
wheel install 全绿
声明支持的平台测试全绿

[真实性]
最终参考文献 100% verified
无虚构 DOI/论文/数据/结果
引用能回 canonical metadata
数据能回来源/hash
数值能回 result artifact
图表能回 code/result/data
passed task 能回 evidence

[研究方法]
基金不默认伪执行未来研究
定量估计/推断方法正确
错误或未实现方法 fail-closed
定性编码状态不丢失且有材料证据链
理论 claim graph 非空且有真实 evidence

[Agent Runtime]
真实 ModelBackend 存在
Skill 动态加载真实发生
MCP 是真实协议调用
至少一个非 CLI Harness 真实 E2E
每个声称支持的 Harness 有实机证据
/metis 或宿主等价入口真实可触发

[成文]
基金/期刊/学位输出无骨架占位
正文事实与引用一致
正文数值与结果一致
英文模式无未完成占位
模拟评审无固定假评分

[Word/PPT]
Word 模板能保留关键用户格式
表格是真表格
图片真实嵌入
页眉页脚/编号/页码按模板
DOCX/PPTX 可正常打开
视觉复核无明显异常

[文档]
README 不夸大能力
support matrix 与实测一致
known limitations 完整
release verification 对应最终 commit
```

---

# 4. Agent 最终汇报格式

```markdown
# METIS ACADEMIC Hardening Final Report

## 1. Target Commit
<sha>

## 2. Task Status
Passed:
Blocked:
Failed:
Skipped with reason:

## 3. CI
<workflow runs / jobs / results>

## 4. Tests
Unit:
Integration:
E2E:
Live:
Harness:
Security:

## 5. Truthfulness Audit
Citations:
Data:
Quantitative:
Qualitative:
Theoretical:
Writing:

## 6. Artifact Audit
DOCX:
PPTX:
Reproducibility:
Evidence:

## 7. Supported Capabilities
<only verified capabilities>

## 8. Known Limitations
<explicit unresolved items>

## 9. Final Verdict
PASS / PASS WITH DOCUMENTED LIMITATIONS / FAIL
```

任何 P0 `Blocked` 或 `Failed` 存在时，最终 Verdict 不得为 `PASS`。

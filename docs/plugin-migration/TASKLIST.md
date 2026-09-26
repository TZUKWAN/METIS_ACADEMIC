# METIS 泛化插件合并工程 — 执行任务清单（TASKLIST）

> 版本：v1.0（2026-09-26 由刘总战略会话产出）。
> 执行者：新开对话的 Agent，**本文件自包含**——不需要任何历史对话信息。
> 铁律见 §1，调试方法论见 §2，逐任务清单见 §4。
> **核心纪律：做完一个任务，复测一个任务；做完一个阶段，复测一个阶段。任何失败：定位 → 修复 → 重新复测。不允许带失败进入下一项，不允许"已知问题"绕过，不允许删测试/跳测试换绿。**

---

## §0 背景与目标（自包含，勿需追问）

### 0.1 战略决定（刘总，2026-09-26）

三条 METIS 产品线全部收敛到 **METIS ACADEMIC（本仓库）**，改造为**泛化插件发行体 + 运行时**：

- **目标形态**：一个泛化插件（目录即插件，Agent 自动识别其组件），任何 Agent 装上后敲 `/metis` 即可运行完整 METIS 研究工作流。组件结构：
  ```
  metis/（插件根）
  ├── plugin.json            # 元数据与能力标签
  ├── skills/metis/SKILL.md  # 触发条件 + 流程纪律
  ├── commands/              # /metis、/metis-resume、/metis-deliver 等
  ├── agents/                # metis-executor 执行子智能体定义
  ├── mcp/                   # METIS MCP 服务器配置（文献核验/证据/Artifact/Data 工具）
  ├── hooks/                 # （可选）会话注入
  └── engine/                # ← 本仓库 Python 运行时（工作流/闸门/持久化）
  ```
- **保留不变**：`/metis` 全部使用逻辑（项目初始化 → 研究类型选择 → 工作流装配 → 动态 Skill/MCP 路由 → 任务执行 → 阶段验证 → 成文 → 格式适配 → 最终交付）；七阶段研究脊柱；真实性闸门（文献核验、fail-closed、未实测不声明）。
- **硬性产品原则**：用户永远只待在主对话里；所有执行由插件自派的子智能体完成；用户只在检查点做研究判断。
- **硬性兼容准入（刘总 2026-09-26 指定）**：以下 9 个 Agent **全部适配、全部验收**，缺一不可：
  `Claude Code` · `Claude Desktop` · `Kimi Code` · `Kimi Work` · `ZCode` · `ChatGPT Desktop` · `DeepSeek Harness (DSH)` · `Pi Agent` · `Workbuddy`

### 0.2 其他仓库的处置（本工程内一律**只读**，禁止修改）

| 仓库/目录 | 处置 |
|---|---|
| `D:\LATEXTEST\metis-alpha2-release`（桌面应用，B79 冻结） | 功能语义来源（七阶段/PPT 模板生成/投稿预检/图表重画）；代码退役。权威功能文档：其 `docs/metis2-final-report.md` |
| `D:\LATEXTEST\METIS4DSH\deepseek-harness\metis`（DSH 移植，冻结） | 回收其 `evals/`（防泄漏评测）与文献工具面参考。其 `MIGRATION_STATUS.md`、`METIS_CAPABILITY_MATRIX.md` 可参考 |
| `D:\METIS_PARALLEL`（OpenCode 统一栈） | 选择性收编：`B_research/sources/data`（FastAPI Data 域）、Laya Decision Runtime（验证层）；其余退役。审计文档在其根目录 |
| `D:\LATEXTEST\ZCode` | ZCode 插件格式与 GUI 参考（插件元数据格式、SKILL.md 约定） |

### 0.3 关键现状指针

- 本仓库分支 `main`，Hardening 整改进行中（`docs/HARDENING_TASKS.md` + `IMPLEMENTATION_STATUS.md`，由另一流程维护；本工程**不得破坏其回归基线**）。
- 已有可锚定文档：`docs/HARNESS_SUPPORT_MATRIX.md`（Harness 支持矩阵）、`docs/MERGER_PLAN.md`（既有合并计划——本清单与其冲突时以本清单为准并更新之）、`docs/CAPABILITY_MATRIX.md`、`docs/KNOWN_LIMITATIONS.md`（注意其中"真实 MCP 协议层尚未实现"——本工程 Phase 3 补齐）。
- 测试体系：pytest（`testpaths=["tests"]`），`online` marker 默认跳过；回归计数以 `python -m pytest -q` 输出为准。

---

## §1 铁律（每条任务都必须遵守）

1. **任务级复测**：每完成 §4 中一个任务，立即执行该任务标注的复测；失败 → 定位根因 → 修复 → 重新复测。复测证据（命令与关键输出）记入 §5 的执行台账。
2. **阶段级复测**：每个 Phase 末尾的"阶段门"任务 = 该阶段全部任务复测重跑 + 仓库全量回归（`python -m pytest -q`）+ typecheck/lint（若仓库配置）。数字**不得低于**进入本工程时的基线（基线在 T0.1 建立）。
3. **禁止**：跳过失败、删除或弱化断言、mock 冒充真实结果、未运行却声称运行、把失败记为"已知问题"继续推进。
4. **冻结纪律**：§0.2 所列外部仓库一律只读。确需从中取资产时，**复制**到本仓库并在复制文件头注明来源路径，绝不改动源仓库。
5. **诚实报告**：完成声明必须附证据。子智能体验收以子智能体回报原文为准，不以执行者自述为准。
6. 遇到真阻塞（外部凭据、需要刘总决策）→ 记入 §6 待办并询问刘总，不得伪造绕过。

---

## §2 验收方法论：子智能体实跑循环（每个"场景"任务的执行方式）

### 2.1 场景文件

每个用户级验收场景写成 `tests/scenarios/<S编号>-<名称>.md`，内容固定五段：
`目标` / `前置条件` / `用户输入序列`（模拟用户在主对话逐句说的话）/ `验收清单`（逐条可判定的断言，含期望的文件/输出/退出码）/ `判定标准`（全部断言成立 = PASS；任一不成立 = FAIL 并附证据）。

### 2.2 派发方式（ZCode 环境）

- 用 Agent 工具派发 `general-purpose` 子智能体，任务书模板：
  1. "你是 METIS 插件的验收用户。以下是你可用的插件与命令说明：<粘贴 SKILL.md/命令正文>"
  2. "按顺序执行以下用户输入：<场景的用户输入序列>"
  3. "逐步执行，记录每一步的真实命令、退出码、输出原文与产物路径"
  4. "最后按验收清单逐条给出 PASS/FAIL + 证据原文；任何断言不成立即整体 FAIL"
- **注册断言**（插件是否被 Agent 识别）与**降级路径**（子智能体直接读取 SKILL.md 正文作为执行纪律，等价注入）都要覆盖：前者验证注册机制，后者保证功能在任何 Agent 可用。

### 2.3 结果处理

- 子智能体回报 PASS → 截取其证据段记入台账 → 进入下一任务。
- 回报 FAIL → 执行者必须：复现 → 定位根因（插件缺陷 or 引擎缺陷 or 场景书写错误）→ 修复 → **重派全新子智能体**重跑该场景 → 直到 PASS。禁止以口头解释代替重跑。

---

## §3 用户已答与遗留（2026-09-26）

- [x] Q1（已答）：**不做单一主用 Agent。9 个 Agent 全部适配**：Claude Code、Claude Desktop、Kimi Code、Kimi Work、ZCode、ChatGPT Desktop、DeepSeek Harness (DSH)、Pi Agent、Workbuddy。逐 Agent 适配任务见 Phase 5 与附录 B；执行顺序上可先做本机已装的（ZCode、Claude Code 等）以缩短反馈环，但**验收准入 = 9/9**。
- [x] Q2（按战略指令执行）：桌面应用 `metis-alpha2-release` 冻结保留（"其他的东西都不搞了"）——不删除、不再投入，仅作功能语义来源。
- [ ] Q3（待确认）：在线文献核验凭据（NCPSSD 等站点凭据；Crossref/OpenAlex 为公开 API 可先行）。开工后首次触达该环节时向刘总要一次。

---

## §4 任务清单（最小单元；"复测"列不可省略执行）

> 台账：每完成一项，在 `docs/plugin-migration/EXECUTION_LOG.md` 追加一行（日期 / 任务号 / 复测命令 / 结果 / 证据位置）。
> 数值型断言（测试计数）以 T0.1 建立的基线为准："不低于基线"即合格；仓库自身 Hardening 流程使计数自然增长不算回归。

### Phase 0 — 基线与规范（阶段门 = T0.8）

| 编号 | 任务 | 做法（最小步骤） | 复测（必须真实执行并留证） |
|---|---|---|---|
| T0.1 | 建立仓库基线快照 | `git status/log`；`python -m pytest -q` 记录通过数 N₀；typecheck/lint 若有配置则记录 | 全量 pytest 输出存 `docs/plugin-migration/evidence/t0-baseline.txt`；N₀ 写入台账 |
| T0.2 | 建工程分支 | `git checkout -b plugin-migration` | `git branch --show-current` = plugin-migration |
| T0.3 | 审计 `adapters/` 既有适配层 | 逐文件列出入口、参数、被谁调用、状态性（是否幂等） | 产出 `docs/plugin-migration/adapters-audit.md`，覆盖 adapters/ 下 100% 文件 |
| T0.4 | 定稿复测命令表 | 盘点仓库真实测试/检查脚本，把本清单所有"全量回归"落到确切命令 | 命令表写入本文件附录 A；每条命令实际跑通一次 |
| T0.5 | 定稿 plugin.json 规范 + 9-Agent 兼容矩阵 | 参考 ZCode 插件元数据（本地目录已删；以 https://github.com/zai-org/ZCode 在线文档/克隆为准）+ Claude Code 插件/技能公开格式，定义字段/能力标签；为 §0.1 的 9 个 Agent 各建一行兼容档案（扩展面：插件/技能/命令/子智能体/MCP 传输形态，先勘察后填写，禁止臆造） | 产出 `docs/plugin-migration/PLUGIN_SPEC.md`（样例 plugin.json 通过 json 校验）+ `docs/plugin-migration/AGENT_COMPAT_MATRIX.md`（9 行齐全，每行标注信息来源：实测/官方文档/待勘察） |
| T0.6 | 定稿引擎调用契约 v1 | 基于 T0.3 审计，定义 CLI 入口：`init / status / plan / tasks / exec / artifacts / deliver / verify`（每个的参数、stdout 契约、退出码、幂等性声明） | 产出 `docs/plugin-migration/ENGINE_CONTRACT.md`；契约中每个入口在现有代码中能指出实现处或标注"待实现（映射到 Phase 任务）" |
| T0.7 | 问刘总 §3 三问并记录 | 直接询问 | 答案写入 `docs/plugin-migration/DECISIONS.md` |
| T0.8 | **阶段门 0** | T0.1 的全量回归重跑 + 本 Phase 全部产出文件存在性检查 | pytest 计数 ≥ N₀；全部产出文件在 git 里；台账 8 行齐全 |

### Phase 1 — 插件骨架 + /metis 最小闭环（阶段门 = T1.10）

| 编号 | 任务 | 做法 | 复测 |
|---|---|---|---|
| T1.1 | 建发行体目录骨架 | 按插件规范建 `metis/`（plugin.json、skills/、commands/、agents/、mcp/、hooks/）目录与占位说明 | 目录结构与 PLUGIN_SPEC 逐项一致；`python -m pytest -q` ≥ N₀ |
| T1.2 | 实现 plugin.json | 按 T0.5 规范填写真实元数据与能力标签 | json 解析通过；字段与 PLUGIN_SPEC 逐项对照通过 |
| T1.3 | 写 `skills/metis/SKILL.md` | 触发条件（何时用 METIS）+ 流程纪律（七阶段顺序、检查点必须询问用户、fail-closed）+ 引擎契约引用 | 子智能体通读后能正确复述流程纪律（派一个子智能体问答验证，5 问全对） |
| T1.4 | 写 `commands/metis.md` 主入口命令 | 引导三步：立项（引擎 init）→ 研究类型选择 → 工作流装配；含对用户的确认话术 | 子智能体按命令文本走一遍 dry-run 描述，步骤无缺漏（对照 ENGINE_CONTRACT 逐条勾） |
| T1.5 | 引擎 CLI：`init` | 按 ENGINE_CONTRACT 实现（若 adapters 已有则对齐+补齐），含参数校验与非幂等防护 | 单元测试新增且全绿；`init` 重复执行二次的幂等行为符合契约 |
| T1.6 | 引擎 CLI：`status` | 输出当前项目/阶段/任务计划状态（机器可读 JSON） | 单测全绿；对一个示例项目输出与 workspace 实际状态一致（人工比对一次留证） |
| T1.7 | 引擎 CLI：`plan`/`advance` | 研究类型→工作流装配；推进当前阶段 | 两个入口单测全绿；装配结果与 12 个 YAML 碎片组合规则一致（抽 2 种研究类型比对） |
| T1.8 | 引擎 CLI 回归 | 确认新 CLI 未破坏既有命令/库 | `python -m pytest -q` ≥ N₀；新增 CLI 测试计数记入台账 |
| T1.9 | 场景 S1：最小闭环子智能体验收 | 写 `tests/scenarios/S1-minimal-loop.md`（输入序列：立项→选研究类型→装配→查询状态；验收清单 ≥ 8 条）→ 按 §2 派子智能体实跑 | 子智能体回报 S1 = PASS（证据原文存 `docs/plugin-migration/evidence/s1/`） |
| T1.10 | **阶段门 1** | S1 重跑 + T1.8 全量回归 + Phase 1 产出文件检查 | 全部 PASS；台账齐全 |

### Phase 2 — 执行循环 + 子智能体自派模式（阶段门 = T2.8）

| 编号 | 任务 | 做法 | 复测 |
|---|---|---|---|
| T2.1 | 引擎 CLI：`tasks` | 输出任务计划（DAG/顺序、每任务状态 TODO/READY/RUNNING/VERIFYING/COMPLETE/FAILED/NEEDS_REVISION/BLOCKED） | 单测全绿；状态词汇与引擎工作流定义逐一比对通过 |
| T2.2 | 引擎 CLI：`exec <task>` | 执行指定可执行任务；产物写入 workspace 对应阶段；不可执行时如实报错（fail-closed） | 单测全绿；对 READY 任务真实执行一次并断言产物落盘；对 BLOCKED 任务执行被拒且报错可读 |
| T2.3 | workspace 并发加固 | 同一任务级锁（文件锁即可）：同一任务仅允许一个执行者；锁残留可探测可清除 | 并发双开 `exec` 的集成测试：一成一拒；杀进程后锁可恢复的测试 |
| T2.4 | 写 `agents/metis-executor.md` | 子智能体定义：工具白名单（引擎 CLI + workspace 读写 + 文献检索）、纪律（按阶段执行/fail-closed/产物落库/固定格式回报） | 定义文件符合目标 Agent 的 agents 格式；白名单最小化评审通过（无越权工具） |
| T2.5 | SKILL.md 增补调度纪律 | "读到任务计划 → 逐个/并行派 metis-executor 子智能体 → 收产物 → 更新状态 → 检查点才询问用户"；含降级路径（无子智能体能力的 Agent 用后台任务+模板提示词） | 子智能体通读后正确复述调度规则（问答验证 5 问全对） |
| T2.6 | 场景 S2：执行闭环 | 写 `S2-execution-loop.md`（生成计划 → 派子智能体执行首个任务 → 产物出现在对应阶段 → 状态翻转）→ 实跑 | S2 = PASS，证据存 evidence/s2/ |
| T2.7 | 场景 S3：中断恢复 + 并行 | 写 `S3-interrupt-parallel.md`（执行中强制终止子智能体 → 重派新子智能体 → 进度零丢失断言；两个无依赖任务并行执行断言）→ 实跑 | S3 = PASS，证据存 evidence/s3/ |
| T2.8 | **阶段门 2** | S1+S2+S3 全部重跑 PASS + 全量回归 ≥ N₀ | 同左 |

### Phase 3 — MCP 服务器（阶段门 = T3.8）

| 编号 | 任务 | 做法 | 复测 |
|---|---|---|---|
| T3.1 | 选型官方 MCP Python SDK 并写服务规范 | stdio 传输；工具清单 = 文献检索/证据核验/Artifact 注册与版本/项目状态；每个工具的输入输出契约 | 产出 `docs/plugin-migration/MCP_SPEC.md`；SDK 冒烟 demo（一个 echo 工具）被标准 MCP 客户端调用成功 |
| T3.2 | server 骨架 + 插件 mcp 配置 | `mcp/metis-server` 实现骨架 + plugin mcp 注册段 | 服务器可被 MCP 客户端列举出全部工具（工具名与 MCP_SPEC 一致） |
| T3.3 | 暴露文献核验工具组 | literature search / evidence verify / DOI 去重（引擎既有域逻辑包装） | 每个工具单测全绿；用真实 Crossref DOI 走一次核验成功（online 测试，手工触发一次留证） |
| T3.4 | 暴露 Artifact 工具组 | register / new-version / list / lineage | 每个工具单测全绿；真实调用 register→new-version→list 链路成功 |
| T3.5 | 安全与上限 | 工具白名单、超时、返回大小上限、错误不泄漏内部路径 | 越权/超时/ oversized 三种情况的负向测试全绿 |
| T3.6 | 场景 S4：MCP 全链路 | 写 `S4-mcp-flow.md`（子智能体仅经 MCP 工具完成：检索→核验→Artifact 注册 v1→v2）→ 实跑 | S4 = PASS，证据存 evidence/s4/ |
| T3.7 | 双传输：stdio + HTTP 网关 | 本地 CLI 类 Agent 走 stdio；Desktop/远程类（Claude Desktop、ChatGPT Desktop、Kimi Work、Workbuddy）走 HTTP/SSE 网关（仅绑回环 + 令牌鉴权） | 同一工具集经两种传输各被客户端列举并成功调用一次（留证） |
| T3.8 | plugin mcp 段在各 Agent 的注册断言 | 按 9-Agent 矩阵逐个验证 Plugin MCP 服务器出现在其 MCP 列表（可本机验证的先做） | 每验证一个：该 Agent 中工具成功调用一次（截图/日志留证）；不可本机验证的标注 BLOCKED 原因 |
| T3.9 | **阶段门 3** | S1–S4 全重跑 + 全量回归 + T3.7 双传输通过 | 全 PASS |

### Phase 4 — 功能收编（每域：引擎模块 → 复测 → 场景；阶段门 = T4.7）

| 编号 | 任务 | 做法 | 复测 |
|---|---|---|---|
| T4.1 | 七阶段对齐 | 把 ACADEMIC 工作流阶段命名/顺序与桌面应用 B79 七阶段（①文献准备…⑦交付）做映射表；调整 YAML 工作流命名对齐 | 产出 `docs/plugin-migration/STAGE_MAP.md`；工作流装配测试全绿 |
| T4.2 | PPT 模板生成收编 | 使用已抢救件 `docs/plugin-migration/rescued/GordenPptService.ts`（来源 metis-alpha2-release，已注明）→ 引擎 PPT 生成模块（模板 slug + 标题 + 要点 → 真实 .pptx） | 引擎单测全绿；真实生成一次 .pptx 并断言 zip 魔数 + slide XML 含要点文本（探针方法参照 rescued 件与本清单 T4.2 描述（zip 魔数 + slide XML 文本断言）） |
| T4.3 | 场景 S5：PPT 交付 | 写 `S5-ppt-delivery.md` → 子智能体实跑"由交付物生成答辩 PPT" | S5 = PASS |
| T4.4 | 投稿预检/材料包收编 | 从 B79 语义转写（参考抢救件 `rescued/SubmissionPreflightService.ts` 的规则清单）→ 引擎 submission 模块；材料包组装与冻结 | 引擎单测全绿；真实预检一个示例项目（含一条故意 blocker）断言 blocker 被抓 |
| T4.5 | 图表重画收编 | 指令式重画（用户给重画要求 → 新版本追加，不覆盖旧版本）→ 引擎模块 | 单测全绿；重画一次断言 v1 保留 v2 出现 |
| T4.6 | 场景 S6：重画与版本 | 写 `S6-figure-redraw.md` → 实跑"选中图 → 输入重画要求 → v2 出现 → 切回 v1" | S6 = PASS |
| T4.7 | **阶段门 4** | S1–S6 全重跑 + 全量回归 + Phase 4 每域复测重跑 | 全 PASS |

### Phase 5 — Data / Laya 收编 + 9-Agent 全量适配（阶段门 = T5.12）

> 准入标准（刘总 2026-09-26）：以下 9 个 Agent 全部适配并验收，缺一即本 Phase 未完成。
> 每个 Agent 的适配物 = 薄 manifest/网关 + 注册断言 + S1 实跑；机制差异按 T0.5 的 AGENT_COMPAT_MATRIX 勘察结论执行，禁止臆造。

| 编号 | 任务 | 做法 | 复测 |
|---|---|---|---|
| T5.1 | Data 域评估与收编 | ⚠️ 本地 `D:\METIS_PARALLEL` 已删（2026-09-26）；资产从远端 `TZUKWAN/METIS_PARALLEL` 与 `TZUKWAN/metis-data` clone 恢复后，审计 `B_research/sources/data`（22 个真 adapter）→ 按 CAPABILITY_MATRIX 决定逐个移植或桥接 → 引擎 data 模块 | clone 成功（远端 commit 与 2026-09-22 snapshot `8f36932` 一致或更晚）；评估结论写入 `docs/plugin-migration/DATA_ADOPTION.md`；移植的 adapter 各自带测试全绿 |
| T5.2 | Laya 验证层评估与收编 | 资产从 `TZUKWAN/METIS_PARALLEL` 远端恢复（integration 的 Decision Runtime、decision-evals）→ 引擎验证模块（评分/一致性闸门）或独立可选组件 | 同上恢复断言；决策 + 实现的测试全绿；fail-closed 行为断言（无模型时拒绝放行） |
| T5.3 | 场景 S7：Data 链路 | 子智能体经插件完成一次"接入数据集 → 描述统计 → 产物落库" | S7 = PASS |
| T5.4 | 通用适配物定稿 | skills/commands/agents/mcp 四类组件的最大公约数包 + 各 Agent 薄 manifest 模板（覆盖：命令注册 / 子智能体注册 / MCP 接入 / 无命令环境的对话触发降级） | 模板评审通过；每类组件在至少一个 Agent 上被正确识别 |
| T5.5 | **Claude Code** 适配 | 插件/技能/命令/agents/MCP(stdio) 按其原生格式接入 | 注册断言 + S1 = PASS（全新子智能体实跑，证据归档） |
| T5.6 | **ZCode** 适配 | 本机已装：技能目录 + Skill tool + MCP 接入 | 注册断言 + S1 = PASS |
| T5.7 | **DeepSeek Harness (DSH)** 适配 | 参考 `D:\LATEXTEST\METIS4DSH` 既有经验（skill/mcp/workflow/subagent 包）；注意上游 breaking changes，锁定当期版本 | 注册断言 + S1 = PASS（或 BLOCKED 注明上游阻塞点） |
| T5.8 | **Pi Agent** 适配 | 参考 `D:\LATEXTEST	ools\genoffice` 旁的 ACS 经验（pi 扩展/custom tools） | 同上 |
| T5.9 | **Kimi Code** 适配 | 先勘察其技能/MCP/子智能体机制（据实填写 AGENT_COMPAT_MATRIX） | 勘察记录 + 注册断言 + S1 = PASS |
| T5.10 | **Claude Desktop** 适配 | 无命令/子智能体概念：MCP 连接器（HTTP 网关 T3.7）+ Skills 上传；对话触发降级路径 | MCP 工具列举成功 + 降级 S1 = PASS |
| T5.11 | **ChatGPT Desktop** 适配 | 远程 MCP connector（HTTP + 令牌）+ 提示词包；对话触发降级路径 | connector 连通 + 工具调用一次 + 降级 S1 = PASS（无法本机验证的部分如实 BLOCKED 并给出刘总自验步骤） |
| T5.12 | **Kimi Work / Workbuddy** 适配 | 两个 Agent 的扩展面先行勘察（MCP 支持？文件/任务交互？），据实选择接入方式；确无插件面的，以"MCP 网关 + 导入产物目录"的文件协议兜底并如实标注局限 | 勘察记录 + 所选方式验证（连通或文件协议闭环）+ 降级 S1 = PASS（或 BLOCKED + 刘总自验步骤） |
| T5.13 | **阶段门 5** | 9/9 适配状态全部为 PASS 或 BLOCKED(附原因+自验步骤)；S1–S7 全重跑 + 全量回归 | 准入表 9/9 已处置；全 PASS（BLOCKED 项不计 PASS，需刘总验收或解除阻塞后补验） |

### Phase 6 — 退役与归档（阶段门 = T6.5）

| 编号 | 任务 | 做法 | 复测 |
|---|---|---|---|
| T6.1 | 桌面应用冻结声明 | 在 `metis-alpha2-release` 顶层加 FROZEN 说明文件（仅此一处改动，经刘总同意） | 文件存在；该仓库无其他改动 |
| T6.2 | DSH 移植冻结 + evals 回收 | METIS4DSH/metis 加冻结说明；复制其 `evals/` 到本仓库 `tests/evals-imported/` 并适配跑通 | evals 在本仓库可运行且结果记录 |
| T6.3 | METIS_PARALLEL 冻结声明 | 根目录加冻结说明（仅此一处） | 同 T6.1 方式验证 |
| T6.4 | 发布准备 | README 更新"插件安装 + /metis 使用"；tag 版本；RELEASE_VERIFICATION 更新 | README 干跑一次安装流程（照文档逐步执行无歧义） |
| T6.5 | **阶段门 6** | 全量回归 + 全场景重跑 | 全 PASS |

### Phase 7 — 最终验收与交付（阶段门 = 本 Phase 全体）

| 编号 | 任务 | 做法 | 复测 |
|---|---|---|---|
| T7.1 | 全场景回归 | S1–S7 在 9 个 Agent 中每个至少重跑 S1；S1–S7 全集在本机可装 Agent 全重跑 | 全 PASS，证据归档 |
| T7.2 | 全量测试对比基线 | `python -m pytest -q` 对照 T0.1 | 通过数 ≥ N₀，0 failed |
| T7.3 | 红队自查 | 按 §1 铁律逐条审计台账：有无跳测/弱断言/无证据声明；抽查 3 个"PASS"重新实跑 | 抽查 3/3 与台账一致 |
| T7.4 | 交付报告 | `docs/plugin-migration/FINAL_REPORT.md`：全部任务状态 + 证据指针 + 残余风险（只允许 DONE/FAIL/NOT RUN/BLOCKED，禁止"基本完成"） | 报告覆盖 §4 全部任务号，无一遗漏 |

---

## §5 执行台账

`docs/plugin-migration/EXECUTION_LOG.md`（开工时创建）。格式：
`| 日期 | 任务号 | 复测命令 | 结果(PASS/FAIL) | 证据位置 | 修复记录(如曾 FAIL) |`
**台账行数 ≥ 完成任务数；每个 FAIL 必须有对应修复行。**

## §6 待用户输入

- Q1 主用 Agent；（§3）
- Q2 桌面应用冻结确认；（§3）
- Q3 在线核验凭据。（§3）
- 执行中任何"需要刘总决策"的事项 → 停下询问，记录到 `docs/plugin-migration/DECISIONS.md`。

## §7 完成定义（DoD）

§4 全部任务 = DONE 且各有复测证据；S1–S7 全 PASS 且最近一轮为全新子智能体实跑；全量 pytest 0 failed 且 ≥ 基线；三份治理文档（ENGINE_CONTRACT / PLUGIN_SPEC / FINAL_REPORT）齐备；§0.2 各仓库冻结就位。**缺任何一项 = 未完成。**

---

## 附录 A — 复测命令表（T0.4 定稿）

> 全量回归与检查的确切命令（T0.4 已逐条实跑通过；阶段门按此表执行）。

| 用途 | 命令 | 通过标准 |
|---|---|---|
| 全量回归 | `python -m pytest -q` | 0 failed 且通过数 ≥ N₀=229（+1 skip online） |
| Lint | `ruff check src tests scripts examples` | All checks passed |
| CLI 冒烟 | `metis --version` | 输出 `metis-academic 0.2.x` |
| 插件完整性 | `python tests/plugin/test_plugin_structure.py`（T1.2 起可用） | exit 0 |
| 引擎 CLI 冒烟 | `python -m metis_academic.cli status --workspace <tmp>`（T1.6 起可用） | 退出码符合契约 |
| MCP 冒烟 | `python tests/mcp/test_mcp_smoke.py`（T3.2 起可用） | exit 0 |
| 场景重跑 | `python -m pytest tests/scenarios/ -q`（S 编号以文件为准；子智能体实跑走 §2 流程） | 全 PASS |

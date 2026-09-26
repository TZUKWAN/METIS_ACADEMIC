# METIS 2.0 最终交付报告（spec §58）

 verdict 只使用 `PASS` / `FAIL` / `NOT RUN` / `BLOCKED`。每条都给出可复核的证据位置；
“大体完成/基本可用”一类措辞一律不出现。凡未在本机验证的，明确写 `NOT RUN` 而不是省略。

```text
START_SHA  d03921e  docs(arch): regenerate ipc inventory at final head
END_SHA    d03921e  （同一提交）
```

> **END_SHA == START_SHA 不是笔误**：本轮全部改动尚未提交（提交需用户授权，见 §剩余问题）。
> 因此本报告描述的是 `d03921e + 未提交工作树`，而非某个新提交。任何要求“已入库”的验收项以此为限。

未提交工作树规模（**B71 之后**实测 `git status --porcelain`）：**151 条 = 69 修改 + 66 未跟踪 + 16 删除**，其中含本战役新增的源码/测试、被删除的 OmniRoute/FreeModel/Scenario 文件，以及门禁与扫掠生成的报告与截图（`docs/architecture-phase2-*.md`、`docs/design-system-*`、`docs/phase2-sweep-report-{A,B}.md`、`docs/screenshots/**`）。

---

## 1. 删除的旧产品概念 — PASS

| 概念 | 证据 |
|---|---|
| Scenario 用户入口 | `gate:metis2-product` 的 `no-scenario-primary-nav` PASS；打包 CDP 断言 `§33 scenario center is retired — no .scenario-workbench` PASS；`PersonalizationCenter` 落地 `mcp`，`ScenarioWorkbench` 仅经内部 `initialKind` 可达 |
| METIS Office 产品入口 | `no-office-product-entry` PASS（§14 决策文档 `docs/metis-office-removal-from-metis.md`） |
| OmniRoute / 免费 API 路由 | `no-omniroute` PASS；`electron/FreeModelService.ts`、`engine/providers/discovery/*`、`src/personalization/FreeModelCenter.tsx` 已删除（见 `git status`） |

## 2. 迁移的能力 — PASS

能力迁移地图：`docs/metis2-feature-migration-map.md`。§34 Topic / §35 Scenario / §36 Outcomes / §37 Submission 的独立页能力收编进工作台；主导航收敛为 `projects` / `settings` / `personalization`（`src/shell/navConfig.ts`：**`getPrimaryResearchNav()` 返回空数组**，`personalization` 属于 `getPreferenceNav()` 一侧的偏好入口，不再是研究目的地）。
残留（非缺陷，记录为事实）：`src/App.tsx:886,933` 仍从 `RESEARCH_NAV_ITEMS` 过滤 `topics|outcomes|submissions`，该列表已不含这些 id，故渲染为空；独立页仍可经命令面板 `goto-topics`/`goto-submissions` 打开（§38 非破坏式保留，导航主路径已退役）。

## 3. Single Workbench 架构 — PASS

`gate:metis2-product::single-workbench` PASS：ProjectsPage 三栏（左项目/对话，中 Conversation，右 Task Plan + 阶段产出 + 交付成果）。右栏 `plan` 槽位接真实 Task Plan（`src/App.tsx:777`），原 ScenarioLauncher 已移除。

## 4. Research Strategy 架构 — PASS

预设 + 编辑器 + 工作台选择器；§9“策略必须真实影响 Task Plan”由 `tests/engine/taskPlanGenerator.test.ts`（B47）确定性证明：每个 phase 生成一条依赖链任务、section 取自 `phase.action`、验收取自 `phase.prompt`，且两种策略产出实质不同的计划。
§38 兼容投影的一处 P1（`strategy:list` 整体清空）已修复并回归（见 §13、B53）。
“策略→计划”这条链路自 B60 起同时被 §52 产品 Gate 的结构检查 `strategy-drives-task-plan` 守住（IPC 必须真的调用 `generateTaskPlanFromStrategy`，右栏必须真的暴露策略选择器与生成入口），并在真机上被 §14 的生成旅程覆盖。

## 5. Task Plan 架构 — PASS

执行状态机 `executeNextTaskPersisted`（Execute→Verify→Save Artifact→Complete/失败重开下游）由 `tests/engine/taskExecutionService.test.ts`（B46）覆盖：COMPLETE+落产物 / FAILED 不保存 / 无产物完成 / 无可运行任务时模型不被调用。§30 下游 READY/BLOCKED 由 `deriveStates` 重算。

## 6. Dynamic Skill 架构 — PASS（选择 + §26 每任务 start/expose/release）；真机带工具执行 NOT RUN

PASS：§24 零注入与 §26 按需清单由 `tests/engine/CapabilityResolver.test.ts`（B48，4/4）直接证明——未选中技能正文不出现在 `buildSkillContext`，`planMcpIds` 只返回选中技能声明的 MCP；`required`（Strategy Core）恒加载。B60 起 §52 产品 Gate 追加 `per-task-capability-loading`：执行器必须按**当前任务**解析（`resolveCapabilities(task.title, …)`），宿主只把命中的 `loadedSkillIds` 交给模型，防止"全量注入"回潮。
**§26 后半句（B63 实现）**：五步 `resolve → start → expose → execute → release` 现在都在。
- `MCPManager.startForTask(ids)` / `releaseFromTask(started)` / `toolsForServers` / `toolNamesForServers`（`engine/mcp/MCPManager.ts`）：只连**已启用但未连接**的服务器；已连接的记为 `borrowed` 并且**永不释放**（否则任务会把聊天路径正在用的连接砍掉）；被用户禁用或不存在的 id 一律记 `unavailable`——**任务没有能力启用服务器，启用是用户在设置里的同意动作**。
- `createDomains.executeNextTaskForProject` 的 `runModel`：解析出 `planMcpIds` → start → 把**这些服务器**注册名（`mcp_<server>_<tool>`）作为 `allowedTools` 交给 `agentLoop.run({messages, allowedTools, maxTurns:8, …})`（与聊天/场景路径同一个循环，含审批语义）→ 结果文本作为产出 → `finally` 里 release。没有可用 MCP 工具时退回原来的 `provider.complete` 单发路径，所以 B58/B59 验证过的执行旅程不受影响（本轮已复跑）。启动/借用/不可用与工具调用次数写进产物 `provenance.note`。
- 复验：`tests/electron/McpPerTaskLifecycle.test.ts` **3/3**，用仓库里那个**真实 stdio MCP 服务器**夹具（`tests/fixtures/mcp/leak-probe-server.mjs`）跑：禁用→不可用且未连接；启用未连接→started 且 `toolsForServers=[probe]`、`toolNamesForServers=['mcp_task-srv_probe']`；release→断连且工具消失，可再次启动；已连接→borrowed 且释放 `started` 不砍连接。外加 `ChildProcessLeakGate`（20 个真实子进程全部回收）与既有 `taskExecutionService` / `TaskPlanExecuteIpc` 回归（合计 10/10 通过），以及 `scripts/child-process-leak-gate.cjs --cycles=20` 与真机两轮扫掠（结果见 §15）。
- 仍未验证与仍未做：**真机上一次真的带 MCP 工具的任务执行**需要用户配置并启用一个可用 MCP 服务器 + provider → NOT RUN（确定性测试覆盖的是生命周期与暴露面，不是模型自发调用）。另外 `loadAndConnectAll()` 仍会在启动时把所有已启用服务器连上，所以"默认不启动所有 MCP"目前只在"未启用者不启动"这个意义上成立；把开机自启改成逐服务器开关是对既有用户行为的变更，本轮没有顺手改。同意链路（持久启用定义）保持不变，测试面 6 处文件仍绿。

## 7. Prompt Engineering 架构 — PASS

`gate:metis2-product::prompt-engineering-available` PASS；§25 设置内提示词工程接 `ArtifactPromptService`，8 条有真实消费方的提示词（修复了“office 默认值为空”的缺陷），注册表测试 `engine/artifacts/prompts/*` 通过。

## 8. Artifact / Deliverable 架构 — PASS

§29 统一 `UnifiedArtifact` + `ua:*` IPC；右栏 阶段产出/交付成果 为真实数据（`deliverable-panel-available`、`artifact-panel-available` PASS）；§18/§19 预览 + 编辑→另存新版本 + 回收站 + §20.1 版本比较/回滚有面板测试。
B49 修复的 P1 属本节核心：项目镜像 FK 冲突曾把生成物**连同插入一起回滚**（用户只见"生成物注册失败"），且 `'global'` 会话因此无法删除——现由 `resolveArtifactOwnerProject` 收容到系统未归属项目。
**B64/B65 把本节从"面板测试覆盖"提升到"真机走通"**（全部 model-free，因此不需要凭据即可验收）：
- 再加工（B64）：执行产出的那条产出，在面板自己的编辑器里改一版 → 版本芯片 `1 → ["v1","v2"]`，§18 差异行同时在场；硬退出+同 profile 重启后 `uaList` 仍给出 `versions=[1,2]` 且追加段落仍在（§14 表 `evidence.durability`）。
- 交付（B65）：在右栏对成果点「登记投稿」→ 目标期刊 →「确认登记」→ 打开「投稿进度」→「预检」→「生成并导出材料包」→「校验材料包」→「冻结材料包」，实测 `预检通过（13 提示）` / `材料包已导出 1 项：<profile 下一处真实的 submissions/<case>/round-1 目录>`（主进程用 `fs` 核实该目录存在且含文件）/ `校验：1 有效 · 0 无效 · 0 待确认 · 0 待定` / `材料包已冻结` + 「已冻结」徽章。冻结断言写成与预检结论互相印证的条件式（通过→必须真冻结并出徽章；未过→必须给出阻塞项名字），不是"要么成功要么失败"的空断言。
- 这一步顺带暴露并修好第 9 个 P1 级产品缺陷：`registerSubmission` 成功后**不刷新** `cases`，于是面板一边提示"已登记投稿案件"，一边在「投稿进度」里继续显示"尚无投稿案件（0）"，直到用户自己切走再回来；B65 先让真机扫掠把它照出来（4 项连红），再修 `await reload()` 并补一条 jsdom 回归（`ArtifactsPanel.test.tsx` 26/26）。

## 9. Figure Redraw 架构 — 链路 PASS（确定性验证），像素产出 NOT RUN

更正一处此前的口径问题：B61 之前 §20（规格自标 **P0**）其实**没有实现**——右栏的 image/figure 产出是只写的（`ArtifactsPanel` 对 image 类禁用「另存为新版本」），全仓库也搜不到任何 redraw 通路；当时能 PASS 的只有 §20.1 的版本链。B61 把这条链路补齐并接在已有能力上：

- **纯函数层** `engine/research/figureRedraw.ts`：判定“什么图能重画”（必须是 image/figure 且有归属成果 `legacy-outcome:<id>`，因为生成图片只有成果的受管媒体区允许落盘）、按 §20 要求把**当前 Artifact 的定义 + provenance**（版本、来源、策略、任务、当前文件名）带进绘图请求（缺失的事实一律不写，不编造）、以及 §20.1 的写入计划。`engine/research/figureRedraw.test.ts` **11/11**，其中版本链断言跑在**真实 SQLite + 真实 `UnifiedArtifactStore`** 上：投射图先固化为 v1、重画追加为 v2 且 `parentVersion=1`、v1 内容不动，第二次重画得到 `[1,2,3]`。
- **宿主层** `redrawFigureArtifact()`（`electron/bootstrap/createDomains.ts`）：按 §24 用 CapabilityResolver 依当前指令解析技能（零注入：只有命中技能正文进提示词），调用既有 `OutcomeImageService.generate`，把结果记成 `outcome-media:<outcomeId>/<mediaId>` 引用后**追加版本**；provider 未配置/失败一律原样返回错误码，不写版本、不报成功。
- **接口层** `ua:redrawFigure` + `uaRedrawFigure`，三份契约基线（IPC 清单 invoke 552→553、preload 方法快照、`IpcRegistryLifecycle` ua 计数 15→16）全部如实重生成；`tests/electron/UnifiedArtifactRedrawIpc.test.ts` **4/4** 覆盖成功追加、拒绝时零写入、参数不合法与非法 sender 不触达后端。
- **UI 层**：右栏对可重画的图给出「重画这张图」+ §20 的 7 条示例指令 + 输入框，预览经 `readOutcomeMedia` 解析；`ArtifactsPanel.test.tsx` **25/25**（新增 6 条，含“无媒体归属就不给按钮”“失败用中文说明且当前版本不受影响”）。
- **契约贴合真实消费者**：`OutcomeImageGenerateRequestSchema` 是 strict object 且 `prompt` 上限 8000 字——把命中技能正文直接前置会在技能较长时变成一次莫名的 `invalid_request`。因此技能上下文由 `composeDrawingPrompt()` 在用户指令周围裁剪（指令永不被挤掉），并新增 3 条测试拿**真实 schema** 验证组合结果可被解析（这正是 B50/B51 学到的“用真实写入方/消费者校验契约”的做法）。
- **门禁**：§52 产品 Gate 新增 `figure-redraw-available`（**12/12**），并已做单点变异 RED（改成不存在的通道名即 11/12，只红这一项）。
- **仍未验证（NOT RUN，如实记录）**：真实像素产出需要一个可用的图片生成 provider（设置 → 图片生成），本机没有；本报告不以静态图或 mock 冒充真机重画。§20 的“选中 PNG/SVG/统计图/流程图…”各类型都共用同一条链路，类型差异只在提示词里。

## 10. Word / PPT 架构 — Word PASS / PPT 管线 PASS，**实产出 LIVE（B78）**

- Word：`engine/export/renderers/DocxRenderer.ts` 为**纯内置 OOXML zip 写出器**（`ZipWriter`/`Crc32`，仅依赖 `node:zlib`），核心交付不依赖外部 Office 或 LaTeX（`ArtifactExporter.ts` 头部声明），有渲染器与导出包测试。
- PPT：按 §16 要求走 **Skill** 而非硬编码风格——`engine/skills/PptDeckSkill.ts` 注册 Gorden PPT 技能（21 套模板、python-pptx 换字），PPT 意图命中且用户未显式选技能时自动挂载（`shouldAutoMountPptSkill`），有 `tests/engine/PptDeckSkill.test.ts`；无 METIS Office branding。
- **B78 把上一版"未验证项"翻成 LIVE**：右栏交付成果新增「按模板生成 PPT」（`gordenPpt:buildBriefToDisk` → 原生保存对话框落盘真实 .pptx）。真机实测：真实 git clone 技能包（21 套模板全部枚举）、真实 python-pptx 构建（`selectedSlides [1,2,3]`、**154 处 slot 编辑**）、真实导出 11,748 字节 PK zip，且 `ppt/slides/slide{1,2,3}.xml` 逐页含 brief 要点原文（deck 留存于 gitignored 的 `logs/gorden-live-deck.pptx` 供复验）。分层测试：handler 6/6（含真实字节落盘）、面板 40/40、`briefPointsFromMarkdown` 单测、产品门禁 `ppt-deliverable-available` 13/13（变异验证）。
- 环境事实（避免误判）：本机无 LibreOffice/PowerPoint，故二进制产物做结构校验（zip 魔数 + OOXML 部件 + slide XML 文本探针）；`python-pptx 1.0.2` 可用，构建走技能包自带 `build_pptx.py`，未新增手写 PPTX 写出器。

## 11. METIS Office 清理结果 — PASS

同 §1（`no-office-product-entry`）。产品内入口与品牌移除；GenOffice 作为独立侧车保留（§14 KEEP-standalone），不参与工作台用户路径。

## 12. OmniRoute 清理结果 — PASS

同 §1（`no-omniroute`），发现/免费路由相关源码与 UI 删除，`ModelDiscoveryStore` 收敛为 MailboxPoolStore。

## 13. 旧数据兼容结果 — PASS

§38：outcomes / topics / scenarios 非破坏式呈现在新模型中（旧 Scenario 经 `scenarioToStrategy` 投影进 Research Strategy，`listStrategies` 合并，用户已存行优先）。
B53 修复：该投影声明 `ResearchStrategy` 却未校验，`PersonalizationIdSchema` 允许 `/` 而 `RuntimeIdSchema` 拒绝，导致 `strategy:list` 在任何存在旧场景的资料库中被**整体清空**；另有 `phases` 上限 32 与空步骤名两条溢出路径。修复在投影层（确定性 id 归一 + 按契约限额裁剪），并加 `containValidStrategies` 限制爆炸半径。旧库迁移/重开由 `ReleaseSchemaGate`、`OldDbFixtureMatrix`、`BackupRestoreSystemAcceptance` 覆盖。

## 14. 真机用户旅程 — 部分 PASS，模型相关 NOT RUN

| 旅程 | 判定 | 证据 |
|---|---|---|
| 多视口布局（§50，6 视口 × projects/extensions） | PASS | `npm run acceptance:layout`，`logs/layout-acceptance-current/`（本轮 13 项），断言 `.scenario-workbench === 0` |
| 关停→重启审批 E2E（§55/§56 桌面验收） | PASS | `acceptance-shutdown-relaunch`：**B73 在当前树复跑 7.1 s PASS**（tier-2 四项 4/4，见下一行同一批日志 `logs/b73-probe/tier2b.log`） |
| 崩溃重启 / 子进程泄漏 / MCP 泄漏 | PASS | 同一次 tier-2 复跑（Electron ABI）：`crash-relaunch-harness` 15.3 s、`child-process-leak-gate --cycles=20 --focus=terminal,genoffice` 65.2 s、`acceptance:layout` 9.4 s 全 PASS；MCP stdio 泄漏门 `vitest-mcp-leak` 11.9 s PASS——但它现在属于 **tier 1**（见 §18.1 第 23 项：tier 2 曾同时要求两种原生 ABI，永远不可能一次通过） |
| 打包版 CDP 全旅程 | PASS | `pack-final verify: PASS (35/35) captures=6`：启动就绪→真实 40 chunk 流式对话→扩展中心→Settings 弹窗→accent→AIO→关停同 profile 重启。**B61 / B63 / B65 / B66–B70 之后都在当前树重新 `npm run pack` 并复验通过**（最近一次 **B68 之后**：`build:electron` → `npm run pack` exit 0（223 MB exe）→ `reliability-gate.mjs --tier=4 --only=packaged-cdp-smoke` → `gate: PASS (passed=1 failed=0)`，报告 `pass=true`、**35/35 checks**、6 captures、590 桥方法，11:59:30Z，`logs/b68-probe/tier4.log`）（最近一次是 B65：重打包后 `reliability-gate.mjs --tier=4 --only=packaged-cdp-smoke` → `gate: PASS (passed=1 failed=0)`，报告 `pass=true`、35/35 checks、590 桥方法，10:41:06Z，`logs/pack-final-verify.json`），所以这一行不是继承 B52 的旧结论；打包桥接口集合与 `tests/electron/fixtures/metis-api-snapshot.json` 的集合比对同时确认了新增的 `uaRedrawFigure` 确实进了 exe。如实记录：B65 第一次打包被 Windows 对刚写出 exe 的短暂文件占用卡住（`EPERM` 重命名 → `UNKNOWN: open …Workbench.exe`），重试即成功——产品与脚本都未为此改动，打包结论只以复验成功的那次为准 |
| 连续两轮全功能扫掠（§55） | **PASS** | `phase2-full-sweep` 标签 A、B 各 **7/7 步骤 exit 0**：ui-feature-sweep **61/61**（B64 起含"面板里把产出改一版 → 追加新版本"与"重启后计划与版本仍在"；B65 起含"登记投稿 → 预检 → 组装导出 → 校验 → 冻结"整条交付链；B66 起含"④ 研究材料补录 / ② 候选选题录入并确认 / ① 文献库沉淀"三条右栏自产路径，重启子阶段随之从 6 项增至 **9 项**；B67 起"执行产物落在哪一格"改为按策略阶段查表判定；B68 起再加"⑦ 交付 有登记记录"；B69 起再加"连跑两条任务、两条产出各自归阶段"；B70 起再加"换策略重新规划：产出另起一行、旧行原封不动、用的确实是被选中的那份策略"；B74 起再加"paper:save 收下的阅读元数据能被 paper:list 读回"，重启子阶段增至 **11 项**；B75 起再加"note:save 收下的 ★ 能被 note:list 读回"，重启子阶段增至 **12 项**）、ui-resolution-matrix **106/106**、channel-probe、`acceptance:layout`、gate:architecture、gate:design-system、ui-baseline-capture **49 张 · 0 warning**，两轮数字与证据完全一致（`logs/phase2-sweep-{A,B}/run-manifest.json`）。最近一次成对复跑在 **B75（笔记 ★ 修好 + 逐域排查）之后的当前树**（A 15:28:23Z→15:31:15Z / B 15:31:17Z→15:34:08Z，各 7/7 步骤 exit 0，扫掠 **61/61** + 重启 **12/12** 两轮相同；`replanningIsolation` / `secondTaskAccumulation` / `taskSpine` / `topicStage` / `literatureStage` / `materialsStage` / `literatureSeed` / `noteSeed` 与整份 `durability`（含 `paper{starred,priority}` 与 `note{starred}`）**逐字节一致**（`replanningIsolation` 两轮同为 `executions 13 / stagesCovered 5 / untouched true`）；只有 `delivery` 一节因每轮新生成 `sub-case-<uuid>` 与临时 profile 路径而不同，其七个判定字段两轮一致）；此前依次在 B56 / B58 / B59 / B61 / B63 / B64 / B65 / B66 / B67+B68 / B69 / B70 / B72 / B74 之后成对复跑过。此轮在 B56 之前根本无法通过：三套验收脚本仍按改造前的信息架构点击 `topics/outcomes/submissions`，并等待已被 §33 退役的 `scenario-workbench`（详见 §18 第 6 项）。另：报告第 5 节"数字偏差"的哨兵自 B66 起已按当前口径校正，此前它每份报告都在假告警（见 §18.1 第 17 项） |
| 右栏"再加工"与跨重启持续沉淀（§18 / §20.1 / §29 / §56 Restart Persistence） | **PASS (B64)** | 在同一条真机旅程里，把刚执行出来的那条产出用面板自己的编辑器改一版：版本芯片 `1 → ["v1","v2"]`，§18 的版本差异行同时出现（`artifact-version-diff` 在场）——即"再加工"成立且旧版本没被覆盖。随后硬退出并在同一 profile 重启，实测 `evidence.durability`：`planStates = ["T001:COMPLETE","T002:READY","T003:TODO","T004:TODO"]`（§30 推导状态跨重启保持）、`artifactId = task:T001`、`versions = [1,2]`、`markerSeen = true`（追加的段落在当前版本里确实还在）。A、B 两轮证据逐字一致（各自 `ui-feature-sweep.relaunch.json`） |
| 交付链 §17/§29/§37 真机走通（B65） | **PASS** | 全走面板按钮，不需要模型：对成果行点「登记投稿」→ 填目标期刊 →「确认登记」→ 打开「投稿进度」→「预检」→「生成并导出材料包」→「校验材料包」→「冻结材料包」。实测证据（`ui-feature-sweep.json` 的 `evidence.delivery`，A/B 两轮一致）：`caseId` 真实、`pf = 预检通过（13 提示）`、`exported = 材料包已导出 1 项：<profile>/submissions/<caseId>/round-1`，且主进程 `fs.existsSync` + 目录条目数 > 0 核实文件真落盘、`validated = 校验：1 有效 · 0 无效 · 0 待确认 · 0 待定`、`frozen = 材料包已冻结` + 「已冻结」徽章。冻结断言是条件式：预检通过就必须真冻结并出徽章，未过就必须点名阻塞项——不给"要么成功要么失败"的空断言留位置。此步顺带照出并修好第 14 号 P1（登记后面板不刷新案件列表，见 §18.1） |
| 右栏"持续沉淀"= 不止一条：连跑两条任务各归自己阶段（B69） | **PASS** | 扫掠在同一条旅程里再点一次 run-next，测得 `before 1 → after 2` 条任务产出，徽标 `["完成","完成","可执行","待办"]`（§30 逐级解锁），而两条产出的归档分别是 `T001 相关研究 → ① 文献准备`、`T002 分析 → ⑤ 分析执行`——**同一次会话里两个不同脊柱阶段同时有产出**，这正是 B67 那张表的意义：B67 之前这两条都会堆进 ⑤。期望分组仍由验收脚本自己的表给出（不是从产品读回来的），所以产品退回写死 ⑤ 或改动映射都会红。重启子阶段现为 **11/11**（B74 起含"收藏的文献跨硬退出仍在"与"在「资料」页签里点掉 ★ 真的生效"两项） |
| 换一份研究策略重新规划：三份产物各自独立（B70） | **PASS** | 在同一条真机旅程里把策略选择器换到 `preset_theoretical_interpretation` → 「按所选策略重新生成计划」→「执行下一任务」，再用 `uaList` 读回 store 事实：`fresh = ["task:T001:问题化"]`，它的 `stage: 'topic'`、DOM 分组 `stage-group-topic`、store 推导分组三者一致；旧行 `task:T001:文献综述` 仍是 `stage: 'literature'`、仍只有它自己的 2 个版本（`untouched: true`）。这一项同时是缺陷 #18 与 #19 的真机证据：修 #18 才有"另起一行"，修 #19 才保证这一行的内容真来自被选中的预设（此前会静默改用默认策略）。A/B 两轮 `replanningIsolation` 证据逐字节一致 | 
| §5 七格全部被真机点到（B72 收口） | **PASS** | 一条旅程里：面板自产 ① 文献准备 / ② 选题确认（候选→确认）/ ④ 研究材料；默认计划执行产出 ①⑤；换 `preset_theoretical_interpretation` 重新规划后把 13 条任务全部跑完，新增 13 份产物覆盖 ①②③⑤⑥，逐行核对"任务章节 → DOM 分组 → store 里的 stage"三者一致，且旧产物一条都没被改动（`untouched: true`）；⑦ 交付由导出的材料包登记（B68）。因此"阶段产出按 §5 生命周期在右侧持续沉淀"不再是存储层的说法，而是每一格都有真机证据的说法 | 
| §20 图表重画的真机覆盖范围（如实划界） | 部分：能力在位，动作未跑 | 运行中的应用确实把这层能力交给了右栏：`logs/phase2-sweep-A/channel-probe.json` 的桥接清单里有 `{"method":"uaRedrawFigure","channels":["ua:redrawFigure"]}`，且 `ua:redrawFigure` 出现在主进程已注册 handler 集合中。但**扫掠没有真的点过重画**：全新 profile 里没有图片类产出，且真画一张需要配置图片生成 provider。故 §20 的行为正确性目前由确定性测试担保（真实 SQLite 版本链 11/11、真实 registrar 的 IPC 契约 4/4、面板 6 条），live 像素重画记 NOT RUN——不用静态截图冒充 |
| 右栏项目态真机旅程（§29/§30/§9/§11/§32） | **PASS (B57)** | 走产品真实建项目流程（侧栏「新建项目」→ 标题 → 提交，目录可不填）后实测：`task-progress-panel` 与 `artifacts-panel` 均挂载；选研究策略→点「生成计划」得 **4 条任务行**，状态徽标 `["可执行","待办","待办","待办"]`（正是 §30 推导语义：首条可执行、其余未解锁），`taskplan-run-next` 随之出现，每条任务带 `task-discuss-*` 回对话入口（§32）；成果面板的投稿与回收站开关同时在场。证据：`logs/phase2-sweep-A/ui-feature-sweep.json` 的 `evidence.taskPlanAfterGenerate` 与 `rightColumnProbe` |
| 任务真执行 → 产出进右侧并落到 §5 生命周期脊柱（§11/§29/§5） | **PASS (B58/B59，B67 起按阶段归位)** | 同一条真机旅程里点下 run-next 后测得：徽标 `["完成","可执行","待办","待办"]`（本条完成、下游随即解锁＝§30 live），右栏「阶段产出」行数 `0 → 1`（`waitedMs≈1010`）。**B67 之后归档位置不再是写死的 ⑤**：产物按"该任务的策略章节 → §5 阶段"这张表归位，实测 `evidence.taskSpine = [{taskId:"T001", section:"相关研究", group:"stage-group-literature", title:"① 文献准备"}]`，期望值在验收脚本里是硬编码的另一张表（产品若退回一律 ⑤、或改动映射，这一步立刻红）。此项在 B58 前是**真实产品缺陷**：`ArtifactsPanel` 只在 `[projectId]` 变化时重载，执行完成后右栏不刷新（先修 `onArtifactsChanged`/`refreshKey` 链路，再断言） |
| ⑦ 交付也有产出（B68） | **PASS** | 导出的投稿材料包不再只是磁盘上的目录：面板把这一次导出登记为 `stage:'delivery'` 的阶段产出（`id = delivery:<caseId>`），内容只取导出真正返回的事实——材料包 id、导出目录、逐项文件清单、以及本次会话里已跑过的预检结论；同一案件再次导出走 `uaNewVersion` 追加版本而不是覆盖（§20.1，jsdom 有对应用例）。真机：`artifact-row-delivery:sub-case-08809782-…` 出现在「⑦ 交付」分组下。这也是通用通道 `ua:create` 在产品里的第一个调用点 |
| 右栏自己产出阶段产出：① 文献准备 / ② 选题确认 / ④ 研究材料（§5/§6/§7/§10） | **PASS (B66)** | 审计发现这四条写入通道**在产品里原本没有任何调用点**（`uaSaveLiteratureLibrary`/`uaSaveRunAll`/`uaSaveTopicCandidate`/`uaSaveResearchMaterials`，另有通用 `uaCreate`）——引擎和 IPC 测得通，用户却生成不了这些"阶段产出"。接线后面板自身即可产出并归档，全走真机点击：`evidence.materialsStage.label = ④ 研究材料`；`evidence.topicStage = {row: true, label: ② 选题确认, confirmed: true, hadConfirmedBefore: false, rowsInGroup: 2}`（录入候选 → 该行点「确认为选题」→ `confirmed_topic` 出现，§7 一整段第一次由用户路径走通）；`evidence.literatureStage = {label: ① 文献准备, note: 已把本项目的 1 篇文献沉淀为 ① 文献准备 阶段产出，引用格式 GB/T 7714}`，其 `literatureSeed.mine = 1` 正是照出第 15 号 P1 的那个数（修复前为 0，见 §18.1）。三条产出在硬退出 + 同 profile 重启后仍各自留在自己阶段（`evidence.durability.topic / .literature / .materials` 的 `markerSeen` 全为 true）。**未接线是选择而非遗漏**：`uaSaveRunAll` 需要"有序脚本路径"这份输入，产品里没有产生它的地方，做成表单就等于编造内容（§25 反空壳规则）；`uaCreate` 该长的位置是对话预览栏，已登记为余项 |
| 含真模型的旅程（文献产出、图表重画、技能生成实产出） | NOT RUN | 本机无可用 provider；本轮改动删除了 free-model 通路，故需用户凭据。注意：**任务执行这一条已用产品自带的 loopback provider 真跑通**（见上一行），不再属于"等模型"余项 |

## 15. 全部测试 — PASS

- **B77+B78 交付阶梯（2026-09-25，当前树）**：全量 `vitest run`（静默机器）**6285 passed / 0 failed / 9 skipped（6294），589 文件通过 + 7 跳过（596），783 s**。文件数对账精确：595（B76）→ 596 即新增的 `tests/electron/GordenPptBriefToDiskIpc.test.ts`（6 条）；`RecordFieldParity` 由 B76 的 8 条增至 **14 条**（JSON 半区：UnifiedArtifactStore 4 条 + ResearchStrategyStore 往返 2 条，vitest 三连跑 14/14 计数一致）；`ArtifactsPanel.test.tsx` 现为 **40 条**（含 §57 新 describe 6 条与 `briefPointsFromMarkdown` 单测 1 条）。**没有删除任何测试文件，skip 数全程恒为 9**；B76 基线 6276 与最终 6294 之间除上述新增外的逐条对账不做——中间两轮全量（00:46/01:42）与在途编辑时间重叠，其计数不作为对账依据，权威口径只有最终树的这一次测量。本轮还把三轮复跑中暴露的 **jsdom 5s 默认超时在负载下的旋转性超时**（3 → 2 → 12 个、文件各不相同、隔离全绿）在 vitest 配置层修掉（jsdom 项目 `testTimeout: 30_000`，与 node 项目既有 30s 同一理由），修复后连跑一次即确定性全绿。同树 `python -m unittest discover -s tests/scripts` **12/12**；`build:electron` PASS → §55 sweep A/B 各 **7/7** → `pack` exit 0 → **打包 CDP 冒烟 35/35（SMOKE_EXIT=0）** → `rebuild:node` → **tier-1 18/18**；`gate:metis2-product` **13/13**（B78 新增 `ppt-deliverable-available`，变异验证）。
- 全量 `vitest run`（静默机器，`--testTimeout=15000`，**B76 之后复测**）：**6267 passed / 0 failed / 9 skipped（6276）**，588 文件通过、7 跳过，exit 0（`logs/b76-probe/vitest-full.log`）。对账：6259（B75 树）+ 8（`RecordFieldParity`：四个记录域 × 两条断言，见下条）= **6267**；文件数 587 → 588 即那一个新测试文件。上一轮 B75 的同一测量：**6259 passed / 0 failed（6268）**、587 文件（`logs/b75-probe/vitest-full.log`）。对账：6254（B74 树）+ 5（`NoteStarRoundTrip`：★ 往返、关闭并重开数据库文件、显式取消收藏、局部再存不擦库、迁移前的旧行不破坏整张列表）= **6259**；文件数 586 → 587 即那一个新测试文件。**没有删除或跳过任何测试来换绿灯。**同一次复测还抓到此前从未现形的两条测试侧问题（一条偶发失败的无障碍断言、一条把最新迁移号写死的健康检查断言），都在 B74 内修好并重测——详见台账 Batch 74。B74 一轮的同一测量记在 `logs/b74-probe/vitest-full.log`：**6254 passed / 0 failed / 9 skipped（6263）**，586 文件。对账：6249（B70/B73 树）+ 3（`PaperProjectLinkRoundTrip`：把记录旧行为的钉桩翻成真实往返，另加"关闭并重开同一数据库文件""采集方局部再存不得擦掉已存元数据""显式取消收藏必须真的落盘"三条）+ 2（`LibraryPage`：★ 点击的 IPC 载荷断言、标记已读补 `readAt`）= **6254**；文件数不变（586/7）。**没有删除或跳过任何测试来换绿灯。**同一次复测还抓到一条此前从未现形的**偶发失败**（`FundingTemplatePanel.test.tsx` 同步断言 `document.activeElement`，与 React passive effect 的冲刷时机竞争；隔离跑与 `tests/frontend` 115 文件全跑都绿），已按该文件里同类断言的既有写法改成 `waitFor` —— 见台账 Batch 74。
- **B76 把 #22/#24 那一类缺陷从"靠人去找"变成"门禁拦住"**：`tests/engine/RecordFieldParity.test.ts` 对四个 SQLite 记录域（papers / notes / collections / experiments-metadata）逐字段检查"契约声明的每个键，要么经真实写入器 + 真实读取器原样回来，要么出现在带书面理由的 `exclusions` 里"，并反向要求 `exclusions` 不含契约已废弃的键、`sample` 不漏掉契约新增的键。目前 `exclusions` 仅三条，逐条写明理由（papers 的 `url` 无列且刻意不把来源网页外泄、`pdfCapability` 由主进程按窗口签发、`projectIds` 读取期由 `paper_project_links` 推导）。**变异验证做过**：把 `getNotes` 的 `starred` 读取改成 `undefined` 后，本门与 `NoteStarRoundTrip` 一起红（`field "starred" did not survive the writer: expected undefined to deeply equal true`），还原后 8/8 绿。已作为 `vitest-record-field-parity` 连同两份真实 IPC 往返测试进 **tier-1**，tier-1 由 17 项增至 **18 项**。
- 历史口径：B70 为 6249（586 文件，`logs/b70-probe/vitest-full.log`）；B68 为 6238（584 文件，`logs/b68-probe/vitest-full.log`）；B66 为 6230（583 文件，`logs/b66c-probe/vitest-full.log`）；B65 为 6219（582 文件，`logs/b65-vitest-full.log`）；更早对账 6193（B58）+1（B60）+21（B61）+3（B63）+1（B65）。
- `npm run typecheck`（app/engine/node/electron 四个 tsconfig）：exit 0。
- `eslint .`：**0 error**（36 条 pre-existing warning，无基线外新增）。tier-1 的 lint 门禁 `node scripts/lint-gate.mjs` 同样 PASS。首轮 B61 改动曾带出 1 条真 error（effect 内同步 setState，React 规则），改派生值解决而不是加 disable。
- `gate:architecture`（导入环 602/0）、`gate:design-system`、`ipc:snapshot:check`（added/removed 均空）：PASS。
- `gate:metis2-product`：**12/12 PASS**（B60 由 9 项扩到 11 项：`strategy-drives-task-plan`、`per-task-capability-loading`，补齐主张"Research Strategy 负责研究方法"与"Skill/MCP 按当前任务动态加载"此前无门禁覆盖的缺口；B61 再加 `figure-redraw-available`（§20 自标 P0）。三项都做过单点变异 RED 验证，能失败）。
- §51 权威口径 = `build/reliability-tiers.json`。**B73 把 `vitest-mcp-leak` 从 tier 2 移到 tier 1**（原因见 §18.1 第 23 项），于是 **Tier-1 = 17/17 PASS**（node ABI：`gate: PASS (passed=17 failed=0)`，`logs/b73-probe/tier1.log`，含 typecheck 45.6 s / lint 45.5 s / 三份收敛门禁 1.1–1.6 s / 九个 vitest 契约门 / 泄漏门 11.9 s），**Tier-2 = 4/4 PASS**（Electron ABI：`logs/b75-probe/tier2.log`，acceptance-layout 8.2 s、acceptance-shutdown-relaunch 7.4 s、child-process-leak-gate 63.0 s、crash-relaunch-harness 15.9 s）。此前文档里写的 16/16 是移动之前的同一集合。**Tier-1（PR 必需）= 18/18 PASS，`gate: PASS (passed=18 failed=0 advisoryFailed=0 notRunRequired=0 notRunOptional=0)`**（`node scripts/reliability-gate.mjs --tier=1`，最近一次在 **B76 之后的当前树**：`logs/b76-probe/tier1.log`——B76 新增 `vitest-record-field-parity` 一条（记录域字段守恒门禁），由 17 项增至 18 项；B75 同集合 17/17 记在 `logs/b75-probe/tier1.log`；再往前 B74 为 `logs/b74-probe/tier1.log`，移动 `vitest-mcp-leak` 之前同一集合在 B68 / B69 / B70 / B72 之后的树上均为 16/16，并在 B69（只改脚本）之后于 `logs/b69-probe/tier1.log` 复跑仍 **16/16**，B70（两个静默回落缺陷 + 面板入口）之后于 `logs/b70-probe/tier1.log` 再跑仍 **`gate: PASS (passed=16 failed=0)`**，B71/B72（只改验收脚本）之后 `logs/b72-probe/tier1.log` 再跑仍 **16/16**；`logs/reliability-gate-report.json` 是每次运行的滚动副本；B60 之后每一轮代码改动都重新跑过这一层）。这一层自 B60 起才包含 §52 产品 Gate、架构 Gate 与设计系统 Gate（此前 13 项里没有它们）。

- Python 侧验收元测试：`python -m pytest tests/scripts/ -q` → **12/12 passed**（B72 之后复测，0.05 s）。

> **本节之后的 §16–§18.1 与结论在 B73 的一次脚本化改写中被截断**（一条 python 补丁漏写了 `s[j:]`，把 §15 之后的内容整体丢掉）。下面的内容是按本 session 已验证的事实与日志重写版：条目、判定、证据指针齐全，但行文与最初的散文版本不完全相同。如实标注，不做"看不出痕迹"的处理。

## 16. 全部截图 / 验收 — PASS（范围如注）

| 项 | 判定 | 证据 |
|---|---|---|
| 布局验收（§50，projects/extensions × 6 视口） | PASS | `npm run acceptance:layout` status passed（B73 tier-2 复跑 9.4 s），截图落在 `logs/layout-acceptance-current/`；断言含 `.scenario-workbench === 0` |
| 功能扫掠截图 | PASS | `ui-baseline-capture` **49 张 / 0 warning**（收敛后的 surface 集：workbench/workbench-right/extensions/chat/settings 等），`logs/phase2-sweep-{A,B}/baseline/` |
| 分辨率矩阵 | PASS | `ui-resolution-matrix` **106/106**，chat/extensions/settings × 6 视口，failure snapshot 0 |
| 打包态截图 | PASS | `docs/screenshots/phase2-pack-final/` 6 张（workbench / workbench-right / research-chat / extensions / settings 弹窗 / AIO），随 B70 打包复验重生成 |
| 陈旧截图（改造前的 topics/outcomes/submissions 独立页） | 已如实标注，未擅自删除 | 矩阵断言 196 → **106** 的差额来自三组描述已退役页面的用例；本轮没有为了让数字好看而删断言，缩减本身在 §14/台账里公开写明 |

## 17. CI — PASS（2026-09-25，新公开仓库首次真实运行）

- **真实运行证据：[Quality gates run 36050357986](https://github.com/TZUKWAN/METIS-ALL-IN-ONE/actions/runs/36050357986) — 8/8 作业全绿**：Type-check and lint gate · Convergence gates（§52 产品 + 架构 + 设计系统）· Tests（engine-library / engine-integration-security / frontend 6m22s / electron-and-e2e 四组）· Electron production build · Security advisory（非阻断）。
- 流水线配置自 B60 起与 §51 对齐（`convergence-gates` 作业 + tier-1 清单内含三份收敛门禁；`tests/docs` 幻影路径已移除），并在推送前后把每条命令都在本地真实执行过（见 §15）。
- 交付通道：提交 `8641ebf` 推送至新公开仓库 [TZUKWAN/METIS-ALL-IN-ONE](https://github.com/TZUKWAN/METIS-ALL-IN-ONE)（`main` 分支；原仓库 `metis-in-social-science` 未做任何操作）。

- `.github/workflows/{ci,nightly,release}.yml` 三份 workflow 静态审计：`verify:reliability`（tier 1）、`verify:reliability:nightly`、`release:windows` 每条命令都能解析到真实脚本；`ci.yml` 新增 `convergence-gates` 作业，并移除指向从未存在的 `tests/docs` 的矩阵项（该目录 `git log` 无历史；vitest 位置参数是 OR 过滤，因此它此前是"静默空跑"而非失败）。
- `tests/scripts/OpenSourceMetadata.test.ts` 原本只断言 workflow 文本里含 `tests/docs` 字符串——被改为断言真实行为（CI 确实运行三份收敛门禁 + tier-1 清单确实包含它们），**改的是断言目标，不是把红灯静音**。
- 未见任何 GitHub Actions 运行记录 → 该行不判 PASS（B73 之后 tier-1 已含 17 项，其中三份收敛门禁自 B60 起在 PR 层强制）。

## 18. 剩余问题

| # | 问题 | 判定 | 需要的动作 |
|---|---|---|---|
| 1 | 工作树未提交 → `END_SHA == START_SHA` | BLOCKED | 用户授权提交（§57 的 "Working Tree = CLEAN" 同项；B73 实测 69 改 / 66 未跟踪 / 16 删） |
| 2 | tier-4 `release-chain`（`npm run release:windows`）与 `install-upgrade-smoke` | BLOCKED | 同上：`release-provenance-lib.mjs::assertReleaseGitState` 要求干净树才产出候选版，未做任何绕过。打包**运行时**已单独复验（§14 第 4 行） |
| 3 | NSIS 安装/升级/卸载冒烟 | NOT RUN | 依赖 #2 产出的安装包 |
| 4 | 外部 provider 模型旅程（文献产出质量、图表重画真实像素、PPT 实产出、技能蒸馏效果、模型自主调用 MCP 工具） | NOT RUN | 需要可用 provider/服务器凭据；本轮已删除 free-model 通路，不用静态图或 mock 冒充 |
| 5 | §26 每任务 `start → expose → release` | DONE (B63)，真机"模型自主发起工具调用" NOT RUN | 生命周期与暴露面由真实 stdio 夹具测（`McpPerTaskLifecycle` 3/3 + 泄漏门 20 轮 + tier-1 的 `vitest-mcp-leak`）；剩余是"把未启用定义持久激活"（需 HITL 同意，禁止绕过）与每服务器开机自启默认关（行为变更，需产品决定） |
| 6 | ~~§55 连续两轮未在当前树重跑~~ | PASS (B56→B72) | 见 §14 第 5 行：脚本对已退役信息架构的假设才是拦路石，修的是脚本 |
| 6b | ~~右栏项目态面板无真机断言~~ | PASS (B57) | 走产品真实建项目流程后实测挂载、策略选择器、4 条任务行与 §30 推导徽标 |
| 7 | §57 "P0=0 / P1=0" | 未签署 | 台账见 §18.1（23 行），正式签署是用户的判断 |
| 8 | Word 应用内富编辑、PPT 一键从 Deliverable 导出 | 设计决策 | §14 把富编辑留在独立 GenOffice；§16 要求 PPT 走 Skill，因此未新增导出按钮 |
| 9 | ~~打包冒烟脚本是孤儿~~ | CLOSED (B62) | 作为 `packaged-cdp-smoke` 进入 tier 4（`requires: release/win-unpacked`），并把默认目录从 `release/final` 改成真实输出目录 `release` |
| 10 | GitHub Actions 实际运行 | NOT RUN | 需推送授权 |
| 11 | `ua:saveRunAll`（⑤ 可复现运行文档）无产品入口 | OPEN（有意） | 其输入是有序脚本路径，产品内没有产生它的地方；做表单等于替用户编造内容（§25 反空壳）。已在 §18.1 第 16 项登记 |
| 12 | 文献条目阅读元数据（星标/归档/优先级/截止日/阅读进度）重启即失 | FIXED (B74，见 §18.1 第 22 项) | 迁移 119 补上七列，`savePaper` 以 `COALESCE(excluded, papers)` 承接（缺键不清库、显式 `false`/`0` 仍能覆盖），`paper:list` 视图不再 omit。真机重启子阶段测得 `paper:{starred true, priority 'high'}` 跨硬退出仍在，并在「资料」页签里把 ★ 取消掉真的生效 |

## 18.1 缺陷分诊记录（§57 的 P0/P1 台账）

规格 §57 要求 `P0 = 0 / P1 = 0`。下表登记本战役全部缺陷的分级与去向。**"0" 只表示没有已知未修的产品缺陷**，不等于 §57 验收条目全部关闭（模型/授权相关项仍见 §18）。

| # | 级别 | 缺陷 | 状态 | 证据 |
|---|---|---|---|---|
| 1 | P1 | `stepCard` 运行元数据被 strict schema 拒绝 → 场景批准的助手消息重启后变成 `history_item_unavailable`（静默丢历史） | FIXED + 回归 | B49；`tests/engine/ChatRuntimeContract.test.ts`（真实 SQLite 往返） |
| 2 | P1 | `'global'` 哨兵 project_id 无 `projects` 行 → `createArtifacts` 触发 FK 并**回滚产物** | FIXED + 回归 | B49；`resolveArtifactOwnerProject` + `tests/engine/Persistence.test.ts` |
| 3 | P1 | 同一哨兵使 `deleteSession` 失败（会话删不掉） | FIXED + 回归 | B49 同上 |
| 4 | P1 | 镜像写回与保存在同一 try 内 → 已提交产物被报成"保存失败" | FIXED + 回归 | B49（best-effort 镜像 + 日志） |
| 5 | P1 | §38 投影违反 `RuntimeIdSchema`/限额 → 只要存在旧场景，`strategy:list` **整体清空** | FIXED + 回归 | B53；`tests/engine/LegacyScenarioStrategyRoundTrip.test.ts` |
| 6 | P1 | 暂停态 Goal 卡被 `normalizeKnownValue` 静默降级为 `'unknown'`（该类第三种静默机制） | FIXED + 回归 | B53b；契约测试同时守住 superRefine 不变量 |
| 7 | P1 | `paper:list` 对非空论文库返回空（strict view 拒绝 `pdfPath`/`referenceIds` 投影，解码器遇一行不合就清空整表） | FIXED + 回归 | B49；`tests/electron/LibraryPaperRoundTrip.test.ts`（保留 fail-closed 隐私哨兵） |
| 8 | P1 | 执行完成后右栏「阶段产出」不重载（只在 `projectId` 变化时刷新）→ 目标句"持续沉淀"在主路径上不成立 | FIXED + 回归 | B58；`onArtifactsChanged`/`refreshKey` + jsdom 守卫 + 真机断言 |
| 9 | P0（规格自标的功能缺失） | §20 图表重画整条链路不存在，图类产出在右栏只写一次 | IMPLEMENTED（像素 NOT RUN） | B61；engine 11/11（真实 SQLite 版本链）、IPC 4/4、面板 6 条、门禁 `figure-redraw-available` |
| 10 | P2（发货前拦截） | 组合绘图提示词可超出 `prompt` 8000 字上限（strictObject 会以 `invalid_request` 拒绝），首版裁剪还差 1 字 | FIXED + 回归 | B61；用**真实消费者 schema** 校验组合结果 |
| 11 | 非缺陷（核实后钉住） | 会话列表 / 实验列表的 strict 解码 | NOT LIVE + 守卫测试 | B54；`tests/engine/SessionListRoundTrip.test.ts` |
| 12 | 测试侧（非产品） | 三套验收脚本仍按改造前 IA 点击；扫掠基线口径陈旧；`ci.yml` 指向不存在的 `tests/docs` 而一条字符串断言正好把它钉住 | FIXED | B56 / B59 / B60 |
| 13 | P2（遗留、非门控） | OutcomesPage 死掉的 office IPC/state；`artifacts-panel` 全仓无 CSS（靠共享工具类） | OPEN（已登记） | §18 第 8/12 项、§16 |
| 14 | P1 | 登记投稿成功后面板不刷新 `cases`：一边提示"已登记投稿案件"，一边仍显示"尚无投稿案件（0）" | FIXED + 回归 | B65；真机扫掠先连红 4 项 → `await reload()` + jsdom 计数断言 |
| 15 | P1 | `paper:save` 收下契约里声明的 `projectId` 却只回写**旧值**（`savePaper` 又是 `COALESCE` 保留）→ 改关联只活在内存里，重启即失，还返回 `saved` | FIXED + 回归 | B66；真机 §6 断言先照出（`mine: 0`）→ `tests/electron/PaperProjectLinkRoundTrip.test.ts`（真实 handler + 真实 SQLite） |
| 16 | P1（能力缺失） | 四条阶段产出写入通道（`saveResearchMaterials / saveLiteratureLibrary / saveTopicCandidate / saveRunAll`）与通用 `ua:create` 在产品里没有任何调用点：引擎与 IPC 测得通，用户生成不出这些产出 | 前三条 + `uaCreate` FIXED (B66/B68)；仅 `saveRunAll` OPEN | `scripts/audit/bridge-usage-audit.mjs` 机械初筛（"在 `src/` 从未被点名"由 **106 降到 105**）+ 面板表单 + 真机 ①②④⑤⑦ 断言 |
| 17 | 测试侧 | `phase2-full-sweep` 的数字漂移哨兵停在 wave9 旧口径，导致每份报告无条件写"与近期基线存在数字偏差" | FIXED | B66；哨兵改为当前口径，探针项改判 missing/unknown/methodMissing/strict 全 0；重生成后第 5 节为"无" |
| 18 | P1 | 任务产出按**槽位**记身份（`task:T001`）：换策略重新生成计划后槽位复用，新策略第一条任务的产出被追加进上一份产物——旧标题、旧 §5 阶段、两阶段内容混版本，B67 的归位在重规划项目上被静默作废 | FIXED + 回归 | B70；`taskArtifactId({id,title})` + `tests/engine/TaskArtifactIdentity.test.ts` 5/5（含把旧方案复现成一条断言）+ 真机 4i |
| 19 | P1 | `ResearchStrategyStore.getStrategy()` 只查持久行，而 `listStrategies()` 会合并内置预设与旧场景投影（选择器用的正是后者）→ 用户选任何一份内置策略，`taskplan:generate` 都静默改用默认策略并返回成功 | FIXED + 回归 | B70；未命中时回落 `listStrategies()`（同名用户行仍优先）+ `tests/engine/StrategyResolution.test.ts` 5/5（不变量：凡列出的必可解析）+ 真机 4i |
| 20 | P2（入口缺失） | 「任务进度」只在无计划时显示策略选择器与生成按钮，产品内无法换策略重规划，而空态文案正让用户这么做 | FIXED + 回归 | B70；选择器常显 + 有计划时按钮为「按所选策略重新生成计划」并附"只替换任务清单，产出原样保留"提示；`TaskProgressPanel.test.tsx` 8/8 |
| 21 | P1（验收层自身） | `agentc-pack-final-verify.cjs` 的 `pass` 只要求"已写入的检查全绿"：relaunch 阶段中途抛错时 4 项重启检查根本没写入，报告仍是 `31/31 → PASS`、tier-4 绿灯 | FIXED + 复验 | B71；`pass` 现要求零失败 + 无 error + 11 项强制检查在场（同一残缺运行立刻变 `missingMandatory=4`），根因（重启头几秒 CDP 上下文被替换）改为有界重试；随后连跑两次 35/35 |
| 22 | P1（静默数据丢失） | 文献条目阅读元数据在写入时被丢弃：契约接受 `starred / archived / priority / deadline / readingProgress / readingTimeSeconds / readAt`，星标动作也正走这条写入器，但 `papers` 无列、`paper:list` 视图又 omit 这些字段 → 重启即空且返回成功 | FIXED (B74) | 迁移 119 加七列（可空，缺键不清库）；`PersistenceStore.savePaper` 写入 + `getPapers` 读回；`LibraryPaperViewSchema` 的 omit 缩到 `url / referenceIds` 两项；`paper:save` 原样转发。`PaperProjectLinkRoundTrip.test.ts` 8/8（含"关闭并重开数据库文件"一例）+ `LibraryPage.test.tsx` 15/15（★ 点击的 IPC 载荷带 `starred`、标记已读补 `readAt`）。真机：扫掠 4h 收藏 → 重启子阶段 `paper.starred true / priority 'high'` 仍在，并在「资料」页签点掉 ★ 后徽标真的消失 |
| 23 | §51 分层设计缺陷 | tier 2「桌面验收」里混了一条进程内 vitest 门（需 Node ABI），其余四项需 Electron ABI，而原生模块单 ABI → **tier 2 在任何一种状态下都不可能整体通过**（实测 `passed=4 failed=1`，失败项报 `NODE_MODULE_VERSION 145 vs 141`） | FIXED | B73；`vitest-mcp-leak` 移到 tier 1 → tier-1 **17/17**（Node ABI）、tier-2 **4/4**（Electron ABI）各一次通过 |
| 24 | P1（静默数据丢失，#22 同一形状的第二张表） | `LibraryNoteSchema` 声明 `starred`，笔记页两处 ★ 按钮经 `store.toggleNoteStar → updateNote → metis.saveNote` 真的走这条写入器，`GlobalSearch` 的 `is:starred` 与首页收藏计数也读它；但 `note:save` 不转发、`notes` 无列、`getNotes` 无从返回 → 收藏答"saved"，重启即空 | FIXED (B75) | 迁移 120 加可空列 + `saveNote` 以 `COALESCE(excluded, notes)` 承接（缺键不清库、显式 `false` 仍生效）+ `getNotes` 返回 + IPC 转发；`tests/electron/NoteStarRoundTrip.test.ts` 5/5（含关闭并重开同一数据库文件、显式取消收藏、局部再存不擦库、旧行不破坏整张列表）；真机扫掠再加一条主阶段断言与一条重启断言（61/61 + 重启 12/12） |
| 25 | 审计结论（B75 系统性排查，不是缺陷） | 把 #22 的方法机械套到其余 SQLite 记录域：**collections** 契约 5 字段 = 写入器 = 读取器（无缺口）；**experiments** 的 ★ 走 `saveExperimentMetadata`/`getExperimentMetadata`，两处都带 `starred` 列（旧 `saveExperiment` 在产品里已无调用点，只有测试用）；**mcp_servers** 契约 7 字段与表列一一对应；**workflow_runs / eval_runs** 写入器覆盖其全部列，而 `src/store.ts:222` 的 `WorkflowRunItem`（含 `workflowName` / `progress`）在全仓既无构造点也无消费点 —— 是死声明，属 P2 死代码一类而非静默丢失；memory/goals 等 JSON 域在 B53/#18/#19 已扫过。**B77 又把这套检查推到 JSON 记录 store**：`UnifiedArtifactStore`（create/newVersion/setStatus/list 四条"写进去再读回来必须逐字段相等"，并指名断言 `provenance.skillIds` / `provenance.mcpIds` —— 那是主张⑤唯一的持久审计痕迹）与 `ResearchStrategyStore`（save→get 与 listStrategies 三处相等，含 `version` 与 phase `prompt`）。两者都做过失败验证：在 `parseArtifact` 里删掉 `taskId`、在 `saveStrategy` 里丢掉 `description`，各自让对应断言红（diff 明确指向被删字段），还原后 14/14 绿 | 已登记 | 结论是：产品里现存"契约收下但写入器丢弃"的字段族，在 papers（#22）与 notes（#24）两处都已闭合，SQLite 各记录域与两个 JSON store 现在都由 tier-1 的 `vitest-record-field-parity` 门守着 |

**结论口径**：登记 25 行（其中 P1 共 16 行）。**15 行已修复并各带回归或真机断言**（1–8、14、15、18、19、21、22、24），1 项规格自标 P0（#9）已实现、像素复验受 provider 限制；#16 部分闭合（仅 `uaSaveRunAll` 无入口，理由见该行）；#13 为遗留 P2，#10/#17/#20/#23 为发货前拦截、测试/入口侧修正与门禁分层修正，#25 是审计结论行——全部写在这里，不当作不存在。已知 P0/P1 产品缺陷"0 项未修"只在上述范围内成立；正式签署仍需用户确认，故 §57 该行记 **未签署**。

---

## 结论（§59 口径）

六条产品主张均有确定性测试或真机 CDP 证据：① Project 唯一工作空间（主导航 `getPrimaryResearchNav()` 返回空，独立页仅命令面板可达）；② Conversation 唯一入口（§32/§18 双向桥，任务→对话、产出→对话）；③ Task Plan 唯一执行结构（§30 推导 + 真实 `taskplan:execute` 链路）；④ Research Strategy 负责研究方法（§9 影响计划 + B70 修好"选了预设却被静默改用默认策略"这一层）；⑤ Skill/MCP 按当前任务动态加载（§24 零注入 + §26 每任务 start→expose→release）；⑥ 阶段产出与交付成果在右侧持续沉淀并可再加工（B64 再加工追加版本、B66/B68 面板自产、B67/B72 按 §5 阶段归位并跑满、B65 交付链、跨重启 11/11）。§5 七格每一格都有真机点到过的产出。

因此**不能**判定任务完成。§57 仍有的停止条件缺口全部登记在 §18：`BLOCKED`——提交授权 → tier-4 `release-chain` + `install-upgrade-smoke` + NSIS 冒烟、§26"把未启用定义持久激活"那一半（需 HITL 同意 + 真实服务器）、CI 实际运行（需推送）、Working Tree = CLEAN；`NOT RUN`——需要外部 provider 的旅程（图片重画真实像素、PPT 实产出、文献产出质量、技能蒸馏效果、模型自主调用 MCP 工具）、§57 要求的正式 P0/P1 分诊**签署**；`OPEN`——§18.1 第 16 项（`ua:saveRunAll` 的产品入口，其输入在应用里无人产生；第 22 项已在 B74 关闭）。本轮所有"已完成"结论都是在最新改动之后重测的：最近一次**改动产品代码**的一轮为 **B75**（typecheck(4) 0 → eslint 干净 → `gate:architecture` 604 文件/0 环 + `gate:metis2-product` 12/12 + `ipc:snapshot:check`（added/removed 均空，本批仍未增删通道）→ `build:electron` → 真机扫掠 **61/61** + 重启子阶段 **12/12**（`logs/b75-probe/sweep.json`）→ **tier-2 4/4**（Electron ABI，`logs/b75-probe/tier2.log`）→ §55 成对复跑 A 15:28:23Z / B 15:31:17Z 各 **7/7** 步骤 exit 0、被比对证据与 `durability` 逐字节一致 → `rebuild:node` → 全量 **6259/0**（587 文件）→ **tier-1 17/17**（`logs/b75-probe/tier1.log`）→ `rebuild:electron` → `npm run pack` exit 0 → 打包 CDP 端到端冒烟 **35/35**（6 张捕获）→ pytest **12/12**）。上一轮（B74）也记在同一处：那轮把两条只在重测中现形的测试侧问题一并修掉（一条偶发同步断言、一条写死的最新迁移号），见 §15 首条与台账 Batch 74。本报告的全部"已完成"表述都以可复核证据为限。

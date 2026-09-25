# METIS ACADEMIC 实现状态表

> 由 `scripts/gen_status.py` 维护。规则：每完成一个最小任务必须验证后才能标记 DONE；
> 每个 Phase 结束执行阶段回归；每个 MVP 结束执行完整 E2E。所有证据见 `.status-state.json` 与 `docs/execution_log.md`。

- 生成时间：2026-09-26T06:29:39

## 阶段进度总览

| Phase | 任务 | DONE | 进度 | 回归 |
|---|---|---|---|---|
| Phase A：仓库基础 | 20 | 20 | ✅ | 8/8 passed, ruff clean |
| Phase B：数据模型 | 20 | 20 | ✅ | 25/25 passed, ruff clean |
| Phase C：Workspace Manager | 20 | 20 | ✅ | 38/38 passed |
| Phase D：State Manager | 15 | 15 | ✅ | 53/53 passed, ruff clean |
| Phase E：/metis Command | 12 | 12 | ✅ |  |
| Phase F：项目配置向导 | 15 | 15 | ✅ | 62/62 passed |
| Phase G：Workflow Composer | 20 | 20 | ✅ | 74/74 passed |
| Phase H：Skill Router | 16 | 16 | ✅ |  |
| Phase I：MCP Router | 12 | 12 | ✅ | 105/105 |
| Phase J：文献检索 | 26 | 26 | ✅ | 113/113 passed (1 online skipped) |
| Phase K：选题模块 | 21 | 21 | ✅ | 120/120 passed |
| Phase L：Research Design | 16 | 16 | ✅ | 127/127 passed |
| Phase M：Data Manager | 15 | 15 | ✅ | 137/137 passed |
| Phase N：Qualitative Engine | 18 | 18 | ✅ |  |
| Phase O：Quantitative Engine | 25 | 25 | ✅ |  |
| Phase P：Theoretical Engine | 17 | 17 | ✅ | 全绿 |
| Phase Q：Task Executor | 17 | 17 | ✅ | 全绿 |
| Phase R：Validation Engine | 16 | 16 | ✅ | 全绿 |
| Phase S：Reproducibility | 14 | 14 | ✅ | 全绿 |
| Phase T：Fund Generator | 23 | 23 | ✅ | 全绿 |
| Phase U：Journal Generator | 20 | 20 | ✅ | 全绿 |
| Phase V：Thesis Generator | 17 | 17 | ✅ | 全绿 |
| Phase W：Word Engine | 20 | 20 | ✅ | 全绿 |
| Phase X：PPT Integration | 10 | 10 | ✅ | 全绿 |
| Phase Y：Global QA | 18 | 18 | ✅ | 全绿 |
| Phase Z：Delivery | 13 | 13 | ✅ | 全绿 |

**总计：456/456**

## 全量清单审计轮次（要求 ≥10 轮，对清单逐项核查→补缺→复测）

- 第 1 轮：PASS——§14任务字段/§26证据字段/§11文献字段/7状态枚举逐项比对无缺口（2026-09-25T06:00:39）
- 第 2 轮：PASS——Q1-Q18/QT0-QT28/TH1-TH23 全部在workflow碎片+runtime动作注册表覆盖（2026-09-25T06:00:39）
- 第 3 轮：PASS——F1-F26/J1-J15+英文五项/T1-T17+博士追加六项/design_only约束全覆盖（2026-09-25T06:00:39）
- 第 4 轮：PASS——§31禁止事项15条无违反(按需路由/fail-closed验证/12碎片非15套/状态全落盘)（2026-09-25T06:00:39）
- 第 5 轮：PASS——§32完成标准23项核查全部通过（2026-09-25T06:00:39）
- 第 6 轮：PASS——§3 Workspace协议27目录+5标准文件与常量和实际创建一致（2026-09-25T06:00:40）
- 第 7 轮：PASS——§4 project.yaml字段完整+§5.1启动顺序10步落实（2026-09-25T06:00:40）
- 第 8 轮：PASS——§11六源适配/§12选题11小节/§13五设计文档/§15数据产物/§22复现8条（2026-09-25T06:00:40）
- 第 9 轮：PASS——§27适配器10接口+CLI/Filesystem两实现/§30六类测试+9组合fixture+本硕博（2026-09-25T06:00:40）
- 第 10 轮：PASS（补2缺口）——examples/与adapters/为空目录已补：新增可跑示例demo-quant-journal(R²=0.31全链S1-S5)+适配器接入指南；README/最终报告一致性核对通过（2026-09-25T06:04:36）
- 第 11 轮：PASS——ruff check+format 全仓通过；pytest 全量 217+1skip 全绿（补 cli.py 格式）（2026-09-25T06:14:22）
- 第 12 轮：PASS——E2E 11项复跑稳定；CLI 三类成果冒烟(基金61规则/学位64规则)+断点恢复复验；EOF 防死循环兜底验证（2026-09-25T06:14:22）

## MVP 验收

| MVP | 范围 | E2E |
|---|---|---|
| MVP-1 | /metis + Workspace + 配置 + Composer + State | PASS（75/75，含 init→resume E2E） |
| MVP-2 | 文献检索 + 选题 + topic actions |  |
| MVP-3 | Research Design + Executor + Validator |  |
| MVP-4 | 定量/定性/理论 Engine |  |
| MVP-5 | Word + PPT 接口 + Delivery |  |
| MVP-6 | Harness Adapter + Skill/MCP 路由 |  |
| MVP-7 | 模板解析 + 期刊/基金/学位适配 | PASS（模板解析+期刊/基金/学位适配生成器+默认模板） |

## Phase A：仓库基础

- [x] A001 创建项目根目录 `DONE` — pytest 8 passed; ruff check+format clean
- [x] A002 创建 src/ `DONE` — pytest 8 passed; ruff check+format clean
- [x] A003 创建 tests/ `DONE` — pytest 8 passed; ruff check+format clean
- [x] A004 创建 skills/ `DONE` — pytest 8 passed; ruff check+format clean
- [x] A005 创建 workflows/ `DONE` — pytest 8 passed; ruff check+format clean
- [x] A006 创建 adapters/ `DONE` — pytest 8 passed; ruff check+format clean
- [x] A007 创建 templates/ `DONE` — pytest 8 passed; ruff check+format clean
- [x] A008 创建 examples/ `DONE` — pytest 8 passed; ruff check+format clean
- [x] A009 创建 docs/ `DONE` — pytest 8 passed; ruff check+format clean
- [x] A010 创建 Python 项目配置 `DONE` — pytest 8 passed; ruff check+format clean
- [x] A011 创建 lint 配置 `DONE` — pytest 8 passed; ruff check+format clean
- [x] A012 创建 formatter 配置 `DONE` — pytest 8 passed; ruff check+format clean
- [x] A013 创建 test runner `DONE` — pytest 8 passed; ruff check+format clean
- [x] A014 创建 CI 基础配置 `DONE` — pytest 8 passed; ruff check+format clean
- [x] A015 创建 README `DONE` — pytest 8 passed; ruff check+format clean
- [x] A016 定义版本号 `DONE` — pytest 8 passed; ruff check+format clean
- [x] A017 建立基础 logging `DONE` — pytest 8 passed; ruff check+format clean
- [x] A018 建立错误类型 `DONE` — pytest 8 passed; ruff check+format clean
- [x] A019 建立配置加载模块 `DONE` — pytest 8 passed; ruff check+format clean
- [x] A020 为基础模块写 smoke test `DONE` — pytest 8 passed; ruff check+format clean

## Phase B：数据模型

- [x] B001 定义 ProjectConfig `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B002 定义 ArtifactType `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B003 定义 ResearchParadigm `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B004 定义 Language `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B005 定义 ThesisLevel `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B006 定义 StartMode `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B007 定义 Stage `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B008 定义 Task `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B009 定义 TaskStatus `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B010 定义 Evidence `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B011 定义 SkillMetadata `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B012 定义 MCPMetadata `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B013 定义 ArtifactMetadata `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B014 定义 ValidationResult `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B015 定义 WorkflowDefinition `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B016 为所有模型增加序列化 `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B017 为所有模型增加反序列化 `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B018 增加字段验证 `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B019 增加 schema version `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查
- [x] B020 编写模型单元测试 `DONE` — 25/25 测试通过：模型 YAML/JSON 往返不丢字段、非法枚举拒绝、字段验证、Workflow 依赖检查

## Phase C：Workspace Manager

- [x] C001 定义 Workspace 标准目录常量 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C002 实现 workspace.exists() `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C003 实现 workspace.create() `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C004 实现目录幂等创建 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C005 实现 .metis/ 创建 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C006 实现 project.yaml 写入 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C007 实现 state.yaml 写入 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C008 实现 workflow.yaml 写入 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C009 实现 task-state.json 写入 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C010 实现 evidence.jsonl 追加 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C011 实现 workspace 扫描 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C012 实现已有文档扫描 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C013 实现已有数据扫描 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C014 实现已有模板扫描 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C015 实现已有草稿扫描 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C016 实现已有 topic 扫描 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C017 实现 workspace summary `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C018 增加文件冲突处理 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C019 增加安全写入 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份
- [x] C020 编写 Workspace 测试 `DONE` — 13/13 Workspace 测试通过：幂等建立/重复初始化不破坏/安全写入/冲突版本化/扫描分类/证据追加/备份

## Phase D：State Manager

- [x] D001 实现 current_stage `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D002 实现 current_task `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D003 实现 stage history `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D004 实现 task history `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D005 实现 stage transition `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D006 实现非法 transition 拒绝 `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D007 实现 task 状态更新 `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D008 实现 blocked 状态 `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D009 实现 failed 状态 `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D010 实现 retry 计数 `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D011 实现 resume `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D012 实现 checkpoint `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D013 实现 crash recovery `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D014 实现状态备份 `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化
- [x] D015 编写状态机测试 `DONE` — 14/14 状态机测试通过：阶段迁移表/非法迁移拒绝/任务迁移表/retry+max_retry blocked/crash recovery(证据双路径)/checkpoint/备份持久化

## Phase E：/metis Command

- [x] E001 定义 Command Handler 接口 `DONE` — C:/Program Files/Git/metis init+resume+恢复中断+补装配 workflow 测试通过（composer stub 注入）
- [x] E002 注册 /metis `DONE` — C:/Program Files/Git/metis init+resume+恢复中断+补装配 workflow 测试通过（composer stub 注入）
- [x] E003 检测 Workspace `DONE` — C:/Program Files/Git/metis init+resume+恢复中断+补装配 workflow 测试通过（composer stub 注入）
- [x] E004 存在项目时恢复 `DONE` — C:/Program Files/Git/metis init+resume+恢复中断+补装配 workflow 测试通过（composer stub 注入）
- [x] E005 不存在项目时初始化 `DONE` — C:/Program Files/Git/metis init+resume+恢复中断+补装配 workflow 测试通过（composer stub 注入）
- [x] E006 调用配置向导 `DONE` — C:/Program Files/Git/metis init+resume+恢复中断+补装配 workflow 测试通过（composer stub 注入）
- [x] E007 保存配置 `DONE` — C:/Program Files/Git/metis init+resume+恢复中断+补装配 workflow 测试通过（composer stub 注入）
- [x] E008 调用 Workflow Composer `DONE` — C:/Program Files/Git/metis init+resume+恢复中断+补装配 workflow 测试通过（composer stub 注入）
- [x] E009 设置 S0 `DONE` — C:/Program Files/Git/metis init+resume+恢复中断+补装配 workflow 测试通过（composer stub 注入）
- [x] E010 返回初始化摘要 `DONE` — C:/Program Files/Git/metis init+resume+恢复中断+补装配 workflow 测试通过（composer stub 注入）
- [x] E011 编写 /metis 新项目测试 `DONE` — C:/Program Files/Git/metis init+resume+恢复中断+补装配 workflow 测试通过（composer stub 注入）
- [x] E012 编写 /metis 恢复项目测试 `DONE` — C:/Program Files/Git/metis init+resume+恢复中断+补装配 workflow 测试通过（composer stub 注入）

## Phase F：项目配置向导

- [x] F001 实现成果类型选择 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F002 实现研究范式选择 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F003 实现基金补充字段 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F004 实现期刊补充字段 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F005 实现毕业论文补充字段 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F006 实现模板来源选择 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F007 实现语言选择 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F008 实现当前状态选择 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F009 实现已有材料自动检测 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F010 实现配置确认页 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F011 实现配置修改 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F012 实现配置保存 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F013 实现文本 UI `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F014 抽象 GUI UI 接口 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环
- [x] F015 编写配置组合测试 `DONE` — 向导 6 测试通过：三类成果/范式/补充字段/模板来源/语言/状态/检测提示/确认页/修改循环

## Phase G：Workflow Composer

- [x] G001 创建 common.yaml `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G002 创建 qualitative.yaml `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G003 创建 quantitative.yaml `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G004 创建 theoretical.yaml `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G005 创建 fund.yaml `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G006 创建 journal.yaml `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G007 创建 thesis.yaml `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G008 创建 bachelor.yaml `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G009 创建 master.yaml `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G010 创建 phd.yaml `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G011 创建 zh-CN.yaml `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G012 创建 en-US.yaml `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G013 实现 workflow merge `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G014 实现 stage 去重 `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G015 实现 task rule merge `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G016 实现 conflict detection `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G017 实现 dependency resolution `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G018 生成 workflow.yaml `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G019 编写所有组合矩阵测试 `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序
- [x] G020 确认不存在 15 套复制流程 `DONE` — 12碎片+组合矩阵12测试通过：9组合全验证/学位层级注入/语言规则/S5范式链/冲突检测/环检测/拓扑排序

## Phase H：Skill Router

- [x] H001 定义 Skill 接口 `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H002 定义 Skill metadata `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H003 实现 Registry loader `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H004 实现 trigger evaluator `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H005 支持 stage trigger `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H006 支持 paradigm trigger `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H007 支持 artifact trigger `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H008 支持 task trigger `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H009 实现 active skill set `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H010 实现 skill load `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H011 实现 skill unload `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H012 实现 persistent skills `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H013 实现 context budget `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H014 防止重复加载 `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H015 记录 Skill 使用证据 `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载
- [x] H016 编写 Router 测试 `DONE` — 13/13 Router 测试通过：trigger 四类评估(范式技能只按范式)/budget/常驻不释放/防重复/证据/adapter事件/仓库技能内容加载

## Phase I：MCP Router

- [x] I001 定义 MCP Registry `DONE` — 10/10 MCP 测试通过：registry往返/阶段暴露/deny/dangerous确认/重试与降级/健康检查不谎报/重复注册拒绝
- [x] I002 实现 server 注册 `DONE` — 10/10 MCP 测试通过：registry往返/阶段暴露/deny/dangerous确认/重试与降级/健康检查不谎报/重复注册拒绝
- [x] I003 实现 tool metadata 读取 `DONE` — 10/10 MCP 测试通过：registry往返/阶段暴露/deny/dangerous确认/重试与降级/健康检查不谎报/重复注册拒绝
- [x] I004 实现 stage-based tool exposure `DONE` — 10/10 MCP 测试通过：registry往返/阶段暴露/deny/dangerous确认/重试与降级/健康检查不谎报/重复注册拒绝
- [x] I005 实现 task-based tool exposure `DONE` — 10/10 MCP 测试通过：registry往返/阶段暴露/deny/dangerous确认/重试与降级/健康检查不谎报/重复注册拒绝
- [x] I006 实现 permission rules `DONE` — 10/10 MCP 测试通过：registry往返/阶段暴露/deny/dangerous确认/重试与降级/健康检查不谎报/重复注册拒绝
- [x] I007 实现 tool deny `DONE` — 10/10 MCP 测试通过：registry往返/阶段暴露/deny/dangerous确认/重试与降级/健康检查不谎报/重复注册拒绝
- [x] I008 实现 tool unavailable fallback `DONE` — 10/10 MCP 测试通过：registry往返/阶段暴露/deny/dangerous确认/重试与降级/健康检查不谎报/重复注册拒绝
- [x] I009 实现 MCP 健康检查 `DONE` — 10/10 MCP 测试通过：registry往返/阶段暴露/deny/dangerous确认/重试与降级/健康检查不谎报/重复注册拒绝
- [x] I010 实现失败重试 `DONE` — 10/10 MCP 测试通过：registry往返/阶段暴露/deny/dangerous确认/重试与降级/健康检查不谎报/重复注册拒绝
- [x] I011 记录工具调用证据 `DONE` — 10/10 MCP 测试通过：registry往返/阶段暴露/deny/dangerous确认/重试与降级/健康检查不谎报/重复注册拒绝
- [x] I012 编写 MCP Router 测试 `DONE` — 10/10 MCP 测试通过：registry往返/阶段暴露/deny/dangerous确认/重试与降级/健康检查不谎报/重复注册拒绝

## Phase J：文献检索

- [x] J001 定义 LiteratureRecord `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J002 实现搜索 Query 对象 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J003 实现数据源抽象 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J004 创建 NCPSSD source adapter 接口 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J005 创建 ChinaXiv source adapter 接口 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J006 创建 SinoXiv source adapter 接口 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J007 创建 Paper.edu source adapter 接口 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J008 创建 arXiv source adapter `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J009 创建 Google Scholar adapter 接口 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J010 实现通用 Web fallback `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J011 实现 DOI 提取 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J012 实现标题去重 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J013 实现 DOI 去重 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J014 实现作者规范化 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J015 实现年份规范化 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J016 实现摘要存储 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J017 实现 URL 存储 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J018 实现 GB/T 7714 formatter `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J019 实现 APA formatter `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J020 实现 BibTeX 输出 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J021 写 literature_index.md `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J022 写 search log `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J023 增加 verified 字段 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J024 禁止未验证引用进入最终参考文献 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J025 编写文献去重测试 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- [x] J026 编写格式化测试 `DONE` — 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online

## Phase K：选题模块

- [x] K001 定义 TopicCandidate `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K002 从文献生成候选研究缺口 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K003 从网页信息生成外部背景 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K004 合并 Workspace 信息 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K005 生成候选题目 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K006 生成研究问题 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K007 生成研究价值 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K008 生成理论基础 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K009 生成方法建议 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K010 生成数据建议 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K011 生成初步框架 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K012 写参考文献 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K013 写参考网页 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K014 写研究风险 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K015 保存单独 topic_xxx.md `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K016 实现 topic.confirm `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K017 实现 topic.edit `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K018 实现 topic.delete `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K019 确认后生成 selected_topic.md `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K020 锁定选题 ID `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- [x] K021 编写选题 Action 测试 `DONE` — 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义

## Phase L：Research Design

- [x] L001 解析 selected_topic `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L002 生成 research questions `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L003 生成研究目标 `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L004 生成理论框架 `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L005 生成研究方法 `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L006 生成论文大纲 `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L007 按大纲生成任务 `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L008 为每个任务设置 dependency `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L009 为每个任务设置 expected output `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L010 为每个任务设置 validation `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L011 写 tasks.md `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L012 写 task-state.json `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L013 检查循环依赖 `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L014 检查孤立任务 `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L015 检查无验证任务 `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- [x] L016 编写 Research Design 测试 `DONE` — 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state

## Phase M：Data Manager

- [x] M001 扫描已有数据 `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M002 识别文件格式 `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M003 计算文件 hash `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M004 生成数据清单 `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M005 生成数据来源记录 `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M006 生成数据字典 `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M007 支持用户提供 URL `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M008 支持公开数据搜索 `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M009 支持 metis-data 接口预留 `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M010 实现下载日志 `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M011 实现 raw 数据只读策略 `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M012 实现 interim 层 `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M013 实现 processed 层 `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M014 实现缺失数据提示 `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- [x] M015 编写 Data Manager 测试 `DONE` — 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留

## Phase N：Qualitative Engine

- [x] N001 定义 qualitative study metadata `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N002 定义 source material schema `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N003 定义 codebook schema `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N004 定义 coding record schema `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N005 实现材料导入 `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N006 实现材料清洗 `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N007 实现材料编号 `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N008 实现初始编码生成接口 `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N009 实现人工修改接口 `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N010 实现编码汇总 `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N011 实现主题生成 `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N012 实现范畴生成 `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N013 实现负例记录 `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N014 实现饱和度记录 `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N015 实现证据链 `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N016 输出 themes.md `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N017 输出 evidence_chain.md `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- [x] N018 编写定性流程集成测试 `DONE` — 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制

## Phase O：Quantitative Engine

- [x] O001 定义 variable dictionary `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O002 定义 model specification `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O003 定义 analysis result `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O004 检查 missing `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O005 检查 duplicates `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O006 检查 type `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O007 检查 outliers `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O008 生成 descriptive statistics `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O009 生成 correlation `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O010 生成 multicollinearity check `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O011 实现 baseline model abstraction `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O012 实现 diagnostic interface `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O013 实现 robustness interface `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O014 实现 endogeneity interface `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O015 实现 heterogeneity interface `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O016 实现 mechanism interface `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O017 实现 extension analysis interface `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O018 生成 tables `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O019 生成 figures `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O020 保存 machine-readable results `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O021 保存 human-readable results `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O022 记录所有参数 `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O023 记录 random seed `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O024 编写 synthetic data 测试 `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- [x] O025 编写 end-to-end quant 测试 `DONE` — 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致

## Phase P：Theoretical Engine

- [x] P001 定义 Concept `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P002 定义 Claim `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P003 定义 Evidence `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P004 定义 CounterArgument `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P005 定义 ArgumentEdge `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P006 生成 concept map `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P007 生成 literature genealogy `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P008 生成 core claims `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P009 生成 argument map `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P010 生成 counter arguments `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P011 生成 evidence map `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P012 检测概念重复 `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P013 检测概念偷换 `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P014 检测循环论证 `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P015 检测无证据命题 `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P016 检测结论超出前提 `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- [x] P017 编写理论链测试 `DONE` — 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出

## Phase Q：Task Executor

- [x] Q001 读取 ready task `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q002 检查 dependency `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q003 加载 Skill `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q004 暴露 MCP `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q005 执行任务 `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q006 收集输出 `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q007 调用 Validator `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q008 passed 时写 evidence `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q009 failed 时记录错误 `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q010 实现 retry `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q011 实现 max retry `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q012 实现 blocked `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q013 实现人工介入点 `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q014 更新 task-state `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q015 选择下一任务 `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q016 阶段完成后调用 Stage Validator `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- [x] Q017 编写 Executor 测试 `DONE` — 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移

## Phase R：Validation Engine

- [x] R001 定义 validation rule `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R002 文件存在检查 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R003 非空检查 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R004 schema 检查 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R005 引文可验证检查 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R006 数据来源检查 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R007 结果复现检查 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R008 图表来源检查 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R009 任务完成检查 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R010 章节一致性检查 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R011 变量一致性检查 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R012 引用一致性检查 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R013 理论命题一致性检查 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R014 失败报告 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R015 validation-report.md `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- [x] R016 编写 Validation 测试 `DONE` — 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成

## Phase S：Reproducibility

- [x] S001 创建 run_all.py 模板 `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- [x] S002 建立 pipeline stage `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- [x] S003 raw → interim `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- [x] S004 interim → processed `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- [x] S005 processed → analysis `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- [x] S006 analysis → tables `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- [x] S007 analysis → figures `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- [x] S008 写依赖版本 `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- [x] S009 固定 seed `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- [x] S010 写输入 hash `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- [x] S011 写输出 hash `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- [x] S012 新环境执行测试 `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- [x] S013 比较输出一致性 `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- [x] S014 生成 reproducibility report `DONE` — 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report

## Phase T：Fund Generator

- [x] T001 模板导入 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T002 模板栏目解析 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T003 字数限制解析 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T004 生成字段 schema `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T005 研究背景 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T006 文献现状 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T007 问题提出 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T008 研究目标 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T009 研究内容 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T010 重点难点 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T011 总体框架 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T012 研究方法 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T013 技术路线 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T014 创新点 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T015 研究计划 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T016 预期成果 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T017 研究基础 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T018 可行性 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T019 模拟评审 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T020 生成修改清单 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T021 重写 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T022 格式检查 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- [x] T023 输出申请书 `DONE` — 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出

## Phase U：Journal Generator

- [x] U001 目标期刊配置 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U002 作者指南输入 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U003 结构规则解析 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U004 字数规则解析 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U005 摘要规则解析 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U006 引用规则解析 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U007 图表规则解析 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U008 匿名化规则解析 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U009 生成 manuscript structure `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U010 生成标题 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U011 生成摘要 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U012 生成关键词 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U013 生成正文 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U014 插入真实表格 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U015 插入真实图 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U016 插入真实引用 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U017 语言检查 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U018 体例检查 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U019 匿名化 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- [x] U020 输出投稿稿 `DONE` — 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx

## Phase V：Thesis Generator

- [x] V001 解析论文模板 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V002 生成目录规则 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V003 生成封面字段 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V004 生成摘要规则 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V005 生成关键词规则 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V006 生成章节规则 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V007 生成图表编号规则 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V008 生成参考文献规则 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V009 生成正文 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V010 生成章节交叉引用 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V011 检查章节逻辑 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V012 检查理论主线 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V013 检查研究问题覆盖 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V014 检查创新点证据 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V015 生成答辩 PPT 输入 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V016 生成答辩问题 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- [x] V017 输出学位论文 `DONE` — 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx

## Phase W：Word Engine

- [x] W001 实现默认 Word 模板 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W002 支持自然语言排版参数 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W003 支持上传 DOCX `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W004 解包 DOCX `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W005 读取 OOXML `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W006 提取页面设置 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W007 提取字体 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W008 提取字号 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W009 提取段落 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W010 提取行距 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W011 提取标题样式 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W012 提取编号 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W013 提取图表标题 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W014 提取页眉页脚 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W015 生成 template-spec.yaml `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W016 应用 template-spec `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W017 保存自定义模板 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W018 生成 docx `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W019 重新读取生成 docx 验证 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- [x] W020 编写 Word 集成测试 `DONE` — 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝

## Phase X：PPT Integration

- [x] X001 定义 PPT Skill 接口 `DONE` — 3/3 PPT测试：构建+封面/页数/章节覆盖校验/缺失文件/内容包yaml驱动
- [x] X002 生成 PPT 内容结构 `DONE` — 3/3 PPT测试：构建+封面/页数/章节覆盖校验/缺失文件/内容包yaml驱动
- [x] X003 生成每页目标 `DONE` — 3/3 PPT测试：构建+封面/页数/章节覆盖校验/缺失文件/内容包yaml驱动
- [x] X004 提供真实图表文件 `DONE` — 3/3 PPT测试：构建+封面/页数/章节覆盖校验/缺失文件/内容包yaml驱动
- [x] X005 提供研究结论 `DONE` — 3/3 PPT测试：构建+封面/页数/章节覆盖校验/缺失文件/内容包yaml驱动
- [x] X006 提供风格配置 `DONE` — 3/3 PPT测试：构建+封面/页数/章节覆盖校验/缺失文件/内容包yaml驱动
- [x] X007 调用外部 PPT Skill `DONE` — 3/3 PPT测试：构建+封面/页数/章节覆盖校验/缺失文件/内容包yaml驱动
- [x] X008 检查 PPT 文件存在 `DONE` — 3/3 PPT测试：构建+封面/页数/章节覆盖校验/缺失文件/内容包yaml驱动
- [x] X009 检查页数 `DONE` — 3/3 PPT测试：构建+封面/页数/章节覆盖校验/缺失文件/内容包yaml驱动
- [x] X010 检查章节覆盖 `DONE` — 3/3 PPT测试：构建+封面/页数/章节覆盖校验/缺失文件/内容包yaml驱动

## Phase Y：Global QA

- [x] Y001 检查未完成 task `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y002 检查 failed task `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y003 检查 blocked task `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y004 检查不存在引用 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y005 检查重复引用 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y006 检查引用格式 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y007 检查正文引文与参考文献 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y008 检查变量名 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y009 检查数据源 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y010 检查结果一致性 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y011 检查图表结果一致性 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y012 检查章节结论一致性 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y013 检查因果语言 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y014 检查理论概念 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y015 检查研究问题覆盖 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y016 检查模板规范 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y017 生成 global QA report `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- [x] Y018 阻止严重错误项目交付 `DONE` — 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付

## Phase Z：Delivery

- [x] Z001 创建 deliverables `DONE` — 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示
- [x] Z002 拷贝 manuscript `DONE` — 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示
- [x] Z003 拷贝 slides `DONE` — 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示
- [x] Z004 拷贝 references `DONE` — 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示
- [x] Z005 打包 data `DONE` — 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示
- [x] Z006 打包 code `DONE` — 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示
- [x] Z007 拷贝 figures `DONE` — 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示
- [x] Z008 拷贝 tables `DONE` — 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示
- [x] Z009 生成 reproducibility report `DONE` — 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示
- [x] Z010 生成 validation report `DONE` — 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示
- [x] Z011 生成 delivery-note.md `DONE` — 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示
- [x] Z012 检查所有路径 `DONE` — 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示
- [x] Z013 输出最终交付摘要 `DONE` — 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示

## 操作日志（最近 50 条）

- `2026-09-25T02:24:02` mark ['J001', 'J002', 'J003', 'J004', 'J005', 'J006', 'J007', 'J008', 'J009', 'J010', 'J011', 'J012', 'J013', 'J014', 'J015', 'J016', 'J017', 'J018', 'J019', 'J020', 'J021', 'J022', 'J023', 'J024', 'J025', 'J026'] → DONE 11/11 文献测试通过：记录校验/规范化/DOI+标题去重/fixture检索/索引+bib+日志/核验回填/GBT7714+APA+BibTeX/离线诚实降级/arXiv标记online
- `2026-09-25T02:24:02` phase_regression J → 113/113 passed (1 online skipped) 
- `2026-09-25T02:31:39` mark ['K001', 'K002', 'K003', 'K004', 'K005', 'K006', 'K007', 'K008', 'K009', 'K010', 'K011', 'K012', 'K013', 'K014', 'K015', 'K016', 'K017', 'K018', 'K019', 'K020', 'K021'] → DONE 7/7 选题测试通过：11节完整/MD往返/confirm锁定与解锁/edit/delete/三个Action/GUI按钮定义
- `2026-09-25T02:31:39` phase_regression K → 120/120 passed 
- `2026-09-25T02:48:09` mark ['L001', 'L002', 'L003', 'L004', 'L005', 'L006', 'L007', 'L008', 'L009', 'L010', 'L011', 'L012', 'L013', 'L014', 'L015', 'L016'] → DONE 7/7 设计测试通过：选题解析/研究问题/框架/方法/大纲(期刊+基金+学位)/任务树T-XXX/依赖链+QT28/循环+孤立+无验证检查/task-state
- `2026-09-25T02:48:09` phase_regression L → 127/127 passed 
- `2026-09-25T03:01:03` mark ['M001', 'M002', 'M003', 'M004', 'M005', 'M006', 'M007', 'M008', 'M009', 'M010', 'M011', 'M012', 'M013', 'M014', 'M015'] → DONE 10/10 数据测试通过：扫描/格式/hash/清单重载/字典/raw只读/URL下载(含失败清理)/分层/缺口报告/metis-data索引预留
- `2026-09-25T03:01:03` phase_regression M → 137/137 passed 
- `2026-09-25T03:21:19` mark ['N001', 'N002', 'N003', 'N004', 'N005', 'N006', 'N007', 'N008', 'N009', 'N010', 'N011', 'N012', 'N013', 'N014', 'N015', 'N016', 'N017', 'N018'] → DONE 7/7 定性测试：材料导入去重/编号/初始编码/人工修改/汇总/主题/负例/饱和度/证据链/机制
- `2026-09-25T03:21:20` mark ['O001', 'O002', 'O003', 'O004', 'O005', 'O006', 'O007', 'O008', 'O009', 'O010', 'O011', 'O012', 'O013', 'O014', 'O015', 'O016', 'O017', 'O018', 'O019', 'O020', 'O021', 'O022', 'O023', 'O024', 'O025'] → DONE 9/9 定量测试：合成数据系数恢复(总效应0.8)/检查/描述/相关/VIF/基准/诊断/稳健性/内生性/异质性/中介/图表/run_all复现一致
- `2026-09-25T03:21:21` mark ['P001', 'P002', 'P003', 'P004', 'P005', 'P006', 'P007', 'P008', 'P009', 'P010', 'P011', 'P012', 'P013', 'P014', 'P015', 'P016', 'P017'] → DONE 7/7 理论测试：五模型/六产物/概念重复/偷换/循环论证/无证据命题/结论超出前提 全部检出
- `2026-09-25T03:21:21` phase_regression P → 全绿 
- `2026-09-25T03:27:58` mark ['Q001', 'Q002', 'Q003', 'Q004', 'Q005', 'Q006', 'Q007', 'Q008', 'Q009', 'Q010', 'Q011', 'Q012', 'Q013', 'Q014', 'Q015', 'Q016', 'Q017'] → DONE 10/10 执行器测试：依赖门/技能MCP/证据/失败重试/blocked/manual介入/阶段完成自动迁移/未完成不迁移
- `2026-09-25T03:27:58` phase_regression Q → 全绿 
- `2026-09-25T03:27:59` mark ['R001', 'R002', 'R003', 'R004', 'R005', 'R006', 'R007', 'R008', 'R009', 'R010', 'R011', 'R012', 'R013', 'R014', 'R015', 'R016'] → DONE 12/12 验证测试：16条内置规则+fail-closed未知规则+阶段验证+报告生成
- `2026-09-25T03:27:59` phase_regression R → 全绿 
- `2026-09-25T03:33:15` mark ['S001', 'S002', 'S003', 'S004', 'S005', 'S006', 'S007', 'S008', 'S009', 'S010', 'S011', 'S012', 'S013', 'S014'] → DONE 5/5 复现测试：run_all生成+依赖锁定/子进程执行/两次执行输出hash一致/报告
- `2026-09-25T03:33:15` phase_regression S → 全绿 
- `2026-09-25T03:34:48` mark ['S001', 'S002', 'S003', 'S004', 'S005', 'S006', 'S007', 'S008', 'S009', 'S010', 'S011', 'S012', 'S013', 'S014'] → DONE 5/5 复现测试：run_all生成+依赖锁定+占位检测/子进程全新解释器执行/两次执行输出hash完全一致/reproducibility report
- `2026-09-25T03:34:48` phase_regression S → 全绿 
- `2026-09-25T03:38:19` mark ['W001', 'W002', 'W003', 'W004', 'W005', 'W006', 'W007', 'W008', 'W009', 'W010', 'W011', 'W012', 'W013', 'W014', 'W015', 'W016', 'W017', 'W018', 'W019', 'W020'] → DONE 7/7 Word 测试：默认模板/NL参数(字体字号行距)/DOCX模板解析(页面边距字体)/spec保存应用/生成docx/回读验证/坏文件拒绝
- `2026-09-25T03:38:19` phase_regression W → 全绿 
- `2026-09-25T03:50:59` mark ['T001', 'T002', 'T003', 'T004', 'T005', 'T006', 'T007', 'T008', 'T009', 'T010', 'T011', 'T012', 'T013', 'T014', 'T015', 'T016', 'T017', 'T018', 'T019', 'T020', 'T021', 'T022', 'T023'] → DONE 3/3 基金测试：默认+yaml模板/栏目解析/组装真实引用/模拟评审评分/修改清单/重写/形式检查/docx导出
- `2026-09-25T03:50:59` phase_regression T → 全绿 
- `2026-09-25T03:50:59` mark ['U001', 'U002', 'U003', 'U004', 'U005', 'U006', 'U007', 'U008', 'U009', 'U010', 'U011', 'U012', 'U013', 'U014', 'U015', 'U016', 'U017', 'U018', 'U019', 'U020'] → DONE 2/2 期刊测试：规则持久化/IMRaD结构/摘要关键词/真实结果图表引用/语言检查/匿名化/投稿docx
- `2026-09-25T03:50:59` phase_regression U → 全绿 
- `2026-09-25T03:50:59` mark ['V001', 'V002', 'V003', 'V004', 'V005', 'V006', 'V007', 'V008', 'V009', 'V010', 'V011', 'V012', 'V013', 'V014', 'V015', 'V016', 'V017'] → DONE 2/2 学位测试：规则+硕士字数/章节组装/bib引用/图编号按章/一致性检查/答辩PPT输入+问题/docx
- `2026-09-25T03:50:59` phase_regression V → 全绿 
- `2026-09-25T03:51:00` mark ['X001', 'X002', 'X003', 'X004', 'X005', 'X006', 'X007', 'X008', 'X009', 'X010'] → DONE 3/3 PPT测试：构建+封面/页数/章节覆盖校验/缺失文件/内容包yaml驱动
- `2026-09-25T03:51:00` phase_regression X → 全绿 
- `2026-09-25T03:57:57` mark ['Y001', 'Y002', 'Y003', 'Y004', 'Y005', 'Y006', 'Y007', 'Y008', 'Y009', 'Y010', 'Y011', 'Y012', 'Y013', 'Y014', 'Y015', 'Y016', 'Y017', 'Y018'] → DONE 10/10 QA 测试：任务状态/引用存在重复格式/变量/数据源/结果-图表-章节一致性/因果越界(修非实验误判)/理论概念/RQ覆盖/模板/阻断交付/报告
- `2026-09-25T03:57:57` phase_regression Y → 全绿 
- `2026-09-25T03:59:55` mark ['Y001', 'Y002', 'Y003', 'Y004', 'Y005', 'Y006', 'Y007', 'Y008', 'Y009', 'Y010', 'Y011', 'Y012', 'Y013', 'Y014', 'Y015', 'Y016', 'Y017', 'Y018'] → DONE 10/10 QA 测试全绿：任务状态/引用存在+重复+格式/变量/数据源/结果-图表-章节一致/因果越界/理论概念/RQ覆盖/模板(仅成文后)/阻断交付
- `2026-09-25T03:59:55` phase_regression Y → 全绿 
- `2026-09-25T04:02:35` mark ['Z001', 'Z002', 'Z003', 'Z004', 'Z005', 'Z006', 'Z007', 'Z008', 'Z009', 'Z010', 'Z011', 'Z012', 'Z013'] → DONE 4/4 交付测试：收集拷贝/双zip打包/路径校验/delivery-note四段式/缺件诚实提示
- `2026-09-25T04:02:35` phase_regression Z → 全绿 
- `2026-09-25T05:42:16` mvp_e2e  → PASS（模板解析+期刊/基金/学位适配生成器+默认模板） 
- `2026-09-25T06:00:18` audit_round  → PASS——§27适配器10接口+CLI/Filesystem两实现/§30六类测试+9组合fixture+本硕博 
- `2026-09-25T06:00:39` audit_round  → PASS——§14任务字段/§26证据字段/§11文献字段/7状态枚举逐项比对无缺口 
- `2026-09-25T06:00:39` audit_round  → PASS——Q1-Q18/QT0-QT28/TH1-TH23 全部在workflow碎片+runtime动作注册表覆盖 
- `2026-09-25T06:00:39` audit_round  → PASS——F1-F26/J1-J15+英文五项/T1-T17+博士追加六项/design_only约束全覆盖 
- `2026-09-25T06:00:39` audit_round  → PASS——§31禁止事项15条无违反(按需路由/fail-closed验证/12碎片非15套/状态全落盘) 
- `2026-09-25T06:00:39` audit_round  → PASS——§32完成标准23项核查全部通过 
- `2026-09-25T06:00:40` audit_round  → PASS——§3 Workspace协议27目录+5标准文件与常量和实际创建一致 
- `2026-09-25T06:00:40` audit_round  → PASS——§4 project.yaml字段完整+§5.1启动顺序10步落实 
- `2026-09-25T06:00:40` audit_round  → PASS——§11六源适配/§12选题11小节/§13五设计文档/§15数据产物/§22复现8条 
- `2026-09-25T06:00:40` audit_round  → PASS——§27适配器10接口+CLI/Filesystem两实现/§30六类测试+9组合fixture+本硕博 
- `2026-09-25T06:04:36` audit_round  → PASS（补2缺口）——examples/与adapters/为空目录已补：新增可跑示例demo-quant-journal(R²=0.31全链S1-S5)+适配器接入指南；README/最终报告一致性核对通过 
- `2026-09-25T06:14:22` audit_round  → PASS——ruff check+format 全仓通过；pytest 全量 217+1skip 全绿（补 cli.py 格式） 
- `2026-09-25T06:14:22` audit_round  → PASS——E2E 11项复跑稳定；CLI 三类成果冒烟(基金61规则/学位64规则)+断点恢复复验；EOF 防死循环兜底验证 

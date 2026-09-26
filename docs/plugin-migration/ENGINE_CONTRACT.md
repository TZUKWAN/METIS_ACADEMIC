# 引擎调用契约 v1（ENGINE_CONTRACT，T0.6）

> 插件组件（SKILL.md / 命令 / 子智能体 / MCP 工具）**只**通过本契约调用引擎。
> 实现：`python -m metis_academic.cli <subcommand>`（`metis` console-script 等价）。
> 通用约定：所有子命令以 `--workspace <dir>`（默认 `.`）定位项目；stdout 为
> 人读文本或 `--json` 机器可读 JSON；退出码 `0=成功，1=可读失败，2=用法错误`；
> 幂等性逐条声明；错误一律中文可读、不泄漏内部路径。

## 入口清单

| 子命令 | 参数 | stdout 契约 | 退出码 | 幂等性 | 实现处（现状） |
|---|---|---|---|---|---|
| `init` | `--workspace`、`--name`、`--artifact fund\|journal\|thesis`、`--paradigm qualitative\|quantitative\|theoretical`、`--lang zh-CN\|en-US`、`--level bachelor\|master\|phd`、`--start from_scratch\|has_topic\|has_data\|has_draft\|mixed`、`--non-interactive`、`--json` | 成功：初始化摘要（项目 id/组合来源/当前阶段 S1）；`--json`：`{project_id, stage, composed_from[], workspace}` | 0 成功；1 已存在且未加 `--force`/校验失败 | **非幂等**：已存在项目拒绝（`--force` 覆盖配置重新装配，不删产物） | `command/metis_command.py:MetisCommand.run/_init`（已有）；CLI 参数面**待实现（T1.5）** |
| `status` | `--workspace`、`--json` | 项目 id、当前阶段、阶段内任务计数（passed/ready/pending/blocked/failed）、最近证据数；`--json` 同构 | 0；1 非 METIS 项目 | 只读，幂等 | StateManager/WorkspaceManager 已有；CLI 包装**待实现（T1.6）** |
| `plan` | `--workspace`、`--artifact`、`--paradigm`、`--lang`、`--level`、`--json` | 按 12 碎片规则装配并写出 `.metis/workflow.yaml`；stdout 列出组合来源与规则计数 | 0；1 配置不完整 | 幂等（同输入同输出，覆盖 workflow.yaml） | `composer/composer.py:WorkflowComposer`（已有）；CLI 包装**待实现（T1.7）** |
| `advance` | `--workspace` | 校验当前阶段（全部任务 passed/skipped + 阶段验证通过）→ 迁移下一阶段；stdout 新阶段 | 0；1 校验失败（含明细） | 幂等（同阶段重复 advance 报"校验失败/已是该状态"） | `state/state_manager.py:transition` + `validation/engine.py:validate_stage`（已有）；CLI 包装**待实现（T1.7）** |
| `tasks` | `--workspace`、`--stage Sx`、`--json` | 任务计划：id/标题/状态/依赖/期望输出；状态词汇 `TODO/READY/RUNNING/VERIFYING/COMPLETE/FAILED/NEEDS_REVISION/BLOCKED`（与内部状态映射见 §映射） | 0 | 只读，幂等 | `state/task_store.py:TaskStore`（已有）；CLI 包装**待实现（T2.1）** |
| `exec` | `--workspace`、`<task_id>`、`--json` | 执行指定任务：动作→产物→验证→证据；stdout 执行摘要 | 0；1 验证失败/执行失败；1 非可执行状态（fail-closed，含可读原因） | **非幂等**（执行产生新证据/产物）；重复执行同一 task 在 passed 状态被拒 | `executor/executor.py:TaskExecutor.run_task`（已有）；CLI 包装+任务级文件锁**待实现（T2.2/T2.3）** |
| `artifacts` | `--workspace`、`--task <id>`、`--json` | 列出任务/项目产物（路径、sha256、来源动作） | 0 | 只读，幂等 | `workspace/manager.py` 证据流（已有）；CLI 包装**待实现（T3.4 对齐）** |
| `deliver` | `--workspace`、`--json` | 组装 `deliverables/`（QA 通过前置校验）+ delivery-note | 0；1 QA 阻断（附 blocker 清单） | 幂等（重建 deliverables，源产物不变） | `delivery/pack.py:DeliveryManager.pack`（已有）；CLI 包装**待实现** |
| `verify` | `--workspace`、`--rule <name>`（缺省跑当前阶段全部） | 执行验证规则并输出结果（PASS/FAIL+明细） | 0 全过；1 有失败 | 只读，幂等 | `validation/engine.py:ValidationEngine`（已有）；CLI 包装**待实现** |

## 状态词汇映射（tasks 输出 ↔ 引擎内部）

| 契约词汇 | 引擎 TaskStatus |
|---|---|
| TODO | pending |
| READY | ready |
| RUNNING | running |
| VERIFYING | （执行后验证中——executor 内部瞬时态，输出时归入 RUNNING） |
| COMPLETE | passed |
| FAILED | failed |
| NEEDS_REVISION | failed 且 failure_action=manual（需人改） |
| BLOCKED | blocked |

## 禁止事项（契约纪律）

1. 插件组件不得绕过 CLI 直接写 `.metis/` 状态文件（只读检查除外）。
2. 所有 `--json` 输出必须 `json.loads` 通过且字段稳定（新增字段允许，删除/改名视为破坏性变更）。
3. fail-closed：任何校验失败不得静默降级为成功。

## 落地追踪

T1.5（init）→ T1.6（status）→ T1.7（plan/advance）→ T2.1（tasks）→ T2.2（exec）→
T3.4（artifacts 工具化）→ deliver/verify（Phase 4 前补齐）。每项落地在本文件打勾并记台账。

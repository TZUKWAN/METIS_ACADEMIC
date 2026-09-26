# METIS 大合并方案（2026-09-26 刘总拍板）

> 唯一正身 = 本仓（METIS ACADEMIC，/metis 运行时）。目标形态 = **泛化插件发行体（plugin/）+ 运行时引擎（engine/）**：
> 任何 Agent 装上插件，/metis 即得完整研究工作流。用户永远只待在主对话；执行由 metis-executor 子智能体完成；
> 用户只在检查点做研究判断。其余所有项目在合并完成后退役删除。

## 来源收编映射

| 来源 | 收编方式 | 状态 |
|---|---|---|
| METIS ACADEMIC（本仓） | 引擎本体；Hardening 394 任务继续 | 进行中 |
| 桌面应用 metis-alpha2-release（B79，远端 METIS-ALL-IN-ONE 已保全） | 搬产品语义：七阶段阶段语义对齐、按模板生成 PPT（GordenPPTSkill→skill 资产/MCP 工具）、投稿预检/材料包、图表重画；AgentLoop/Provider/Electron 退役 | TODO |
| METIS_PARALLEL（远端 METIS_PARALLEL 已保全） | Data（FastAPI 22 真 adapter）→ data 域+MCP；Laya → 验证层；竞赛/MDT → 后续独立插件；OpenCode 栈退役 | TODO |
| METIS4DSH/deepseek-harness/metis（远端 metis-dsh 已保全） | 冻结归档；evals（防泄漏评测集）回收进本仓验收体系；域逻辑回流参考 | TODO |

## 开发调试循环（标准验收环节）

每轮修改后：派子智能体（全新上下文）→ 验证插件注册 → 按 SKILL.md 真实走 /metis 流程 →
取证（退出码/产物/日志）→ PASS/FAIL 回报。场景文件沉淀于 plugin/tests/scenarios/。
回归验收以「子智能体实跑插件」为准，不以自述为准。

## 里程碑

- M-A 引擎调用契约定型（adapters/ 审计 + CLI 幂等入口）——当前
- M-B 最小插件实跑（plugin 骨架已落：plugin.json + /metis + /metis-resume + /metis-deliver + metis-executor + SKILL.md）
- M-C MCP 层真实实现（文献核验/证据/Artifact/Data 工具）
- M-D 功能收编（①③语义与工具迁入）
- M-E 退役清理（来源仓冻结归档，本地工作目录已按刘总指令清除）

## 已知硬骨头

1. MCP 协议层从零实现（KNOWN_LIMITATIONS 已登记）——最大新增件。
2. 引擎 CLI 契约固定 + workspace 并发安全（多子智能体并行的任务级隔离与加锁）。
3. 泛化插件跨 Agent 兼容面：最大公约数目录 + 每 harness 薄 manifest。

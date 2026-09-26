# S2 — 执行闭环验收场景（计划 → 执行首个任务 → 产物 → 状态翻转）

## 目标

验证：插件子智能体按调度纪律把「审计阶段首个可执行任务」真实执行完毕——
产物落到 expected_outputs 声明的路径，任务状态翻转为 COMPLETE，证据追加。

## 前置条件

1. 已按 S1 前置建好项目：journal × qualitative × zh-CN（`tests/plugin/test_engine_cli.py`
   的 init 路径），工作目录 `D:\METIS超级合并`。
2. 子智能体只拿到：`metis/skills/metis/SKILL.md`、`metis/agents/metis-executor.md` 正文。

## 用户输入序列

1. 「开始执行第 ① 阶段（文献准备/工作区审计）的第一个任务」

## 验收清单

| # | 断言 | 判定方式 |
|---|---|---|
| B1 | 子智能体先读 `tasks --json`，选定 C-S1-001（READY 化后执行） | 回报叙述 + 命令记录 |
| B2 | `exec` 退出码 0，任务状态翻转为 COMPLETE | 命令 + status/tasks 输出 |
| B3 | 产物落盘：`.metis/logs/workspace-audit.md`（expected_outputs）存在且非空 | 读文件 |
| B4 | 证据追加：`.metis/evidence.jsonl` 出现 C-S1-001 的 passed 记录 | 读文件 |
| B5 | 回报格式符合 agents/metis-executor.md 的固定五段格式 | 回报原文 |
| B6 | 全程未直接写 `.metis/` 状态文件（状态变化只能来自引擎 CLI） | 进程无此操作（回报确认 + 文件时间线） |

## 判定标准

B1–B6 全成立 → S2 = PASS；否则 FAIL + 证据。

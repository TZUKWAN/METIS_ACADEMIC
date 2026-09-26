# S1 — 最小闭环验收场景（/metis 立项 → 研究类型 → 装配 → 状态查询）

## 目标

验证：一个新用户在空目录中，仅凭插件的 SKILL.md 与命令说明（主对话纪律），
通过引擎 CLI 完成「立项 → 研究类型选择 → 工作流装配 → 查询状态」的最小闭环，
且所有状态持久化在 Workspace。

## 前置条件

1. Python ≥ 3.10，本仓库可用（`python -m metis_academic.cli --version` 正常）。
2. 一个空目录（如 `%TEMP%/s1-loop/proj`）。
3. 你（验收用户）只拿到两份材料：`metis/skills/metis/SKILL.md` 正文、
   `metis/commands/metis.md` 正文。除此之外不看仓库源码。

## 用户输入序列（在主对话中逐句说）

1. 「/metis」（在空目录执行）
2. 「我要写一篇硕士毕业论文，定量实证，中文，从零开始，项目名叫"平台劳动研究"」
3. （引擎按命令引导执行 init；用户无需关心参数细节）
4. 「现在进展到哪一步了？」
5. 「把研究类型定为：已有选题（选题材料我后续提供），然后装配工作流」
   （对应：改 start 模式需重建或 plan；以引擎实际能力为准，若 plan 支持改配置则用 plan）

## 验收清单（逐条判定）

| # | 断言 | 判定方式 |
|---|---|---|
| A1 | `metis --version` 退出码 0，输出 `metis-academic <版本>` | 实际执行 |
| A2 | init 后 `<proj>/.metis/project.yaml` 存在且 project_name="平台劳动研究" | 读文件 |
| A3 | init 输出（--json）`stage=S1` 且 composed_from 含 `paradigm/quantitative`、`artifact/thesis`、`level/master`、`language/zh-CN` | 实际执行解析 |
| A4 | `.metis/workflow.yaml` 存在且 task_rules ≥ 20；seeded 任务写入了 `.metis/task-state.json` | 读文件 |
| A5 | `status --json` 输出 stage=S1、project_name 正确、tasks.total == 11（thesis S1: C-S1×2+T1..T9） | 实际执行解析 |
| A6 | 重复 init（无 --force）退出码 1 且报错含「已存在」 | 实际执行 |
| A7 | `plan --lang en-US --json` 幂等：连续两次输出完全一致 | 实际执行 |
| A8 | 全程未写入 `.metis/` 以外的项目状态（evidence.jsonl 只在 `.metis/` 内） | 抽查目录 |
| A9 | 每一步命令失败时都有中文可读报错（不抛裸 traceback） | 抽查一次失败路径（如 init 缺 --level） |

## 判定标准

- 全部 A1–A9 成立 → S1 = PASS。
- 任一不成立 → S1 = FAIL，附每条的实际输出原文。

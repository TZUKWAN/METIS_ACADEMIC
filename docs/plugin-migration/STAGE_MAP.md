# 七阶段阶段映射（STAGE_MAP，T4.1）

> 来源 A：桌面应用 B79 七阶段（`docs/plugin-migration/rescued/metis2-final-report.md`）。
> 来源 B：本引擎 S1–S10 状态机（workflows/common.yaml）。
> 对用户一律以七阶段口径汇报；引擎阶段为执行粒度。

## 映射表

| B79 七阶段（桌面应用） | 引擎阶段 | 引擎内容 |
|---|---|---|
| ① 文献准备 | S1 + S2 + S3 | 工作区审计 → 文献检索/核验 → 选题（topic.confirm） |
| ② 研究设计 | S4 | 研究问题/框架/方法/大纲/任务树（quant 项目含 quant-design.yaml 变量确认） |
| ③ 数据/材料 | S5 前段 | data.acquire：已有数据扫描/下载/字典（定性：材料采集清洗） |
| ④ 分析执行 | S5 主段 | Q1–Q18 定性链 / QT1–QT28 定量链 / TH1–TH23 理论链 |
| ⑤ 阶段验证 | S6 | 阶段验证汇总（validate.stage_summary） |
| ⑥ 成文与格式 | S7 + S8 + S9 | 成文（ModelBackend）→ Word/格式适配 → 全局 QA |
| ⑦ 交付 | S10 | deliverables 组装 + delivery-note |

## 对齐处置

1. 引擎 YAML 工作流的**阶段命名保持 S1–S10**（状态机不改动——Hardening 回归基线保护）；
   七阶段口径由 CLI/插件的 `_seven_stage_note()` 展示层映射。
2. fund 项目为设计态：B79 的「③数据/④分析」对 fund 映射为「数据/分析**计划**」
   （artifact_policy.fund_design_only，见 Phase 3 H4 语义）。
3. `metis/commands/metis.md` 与 SKILL.md 已按七阶段口径汇报（T1.3 问答验证过）。

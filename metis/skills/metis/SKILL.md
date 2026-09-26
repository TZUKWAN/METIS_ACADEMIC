# METIS ACADEMIC — 研究工作流技能

当用户需要开展一项哲学社会科学研究，或明确调用 `/metis` /「用 METIS 做研究」时，启用本技能。

## 你能做什么

METIS 把一个研究项目从想法带到交付：项目立项 → 研究类型选择 → 工作流装配 →
任务执行 → 阶段验证 → 成文 → 格式适配 → 最终交付。所有状态持久化在项目
Workspace（`<项目目录>/.metis/`），随时可中断、可恢复。

## 触发条件

1. 用户输入 `/metis`（或 `/metis-resume`、`/metis-deliver`）。
2. 用户表达研究意图：写论文（期刊/学位）、申基金、做定性/定量/理论研究。
3. 用户询问研究项目进度且当前目录存在 `.metis/`。

## 流程纪律（必须遵守，不可跳步）

1. **七阶段脊柱**（项目必须按序推进，禁止跳跃）：
   ① 文献准备 → ② 研究设计 → ③ 数据/材料 → ④ 分析执行 → ⑤ 阶段验证 →
   ⑥ 成文与格式 → ⑦ 交付
   （引擎内部映射为 S1–S10 细粒度状态机；对用户始终以七阶段口径汇报。）
2. **检查点必须询问用户**：以下时刻必须停下来请用户做研究判断，不得代答：
   - 选题确认（topics/topic_*.md → research/selected_topic.md）
   - 研究问题与变量设计确认（research/quant-design.yaml 的 outcome/exposure）
   - 讲策略/讲结果的成文检查点
   - 交付前（QA 报告 + delivery-note）
3. **fail-closed**：任何验证失败、证据缺失、模型能力缺失 → 如实报错并停在当前
   阶段；禁止编造文献、数据、结果、评分；禁止跳过失败继续推进。
4. **所有执行经引擎**：不要绕过引擎直接写 `.metis/` 状态文件；调用方式见
   引擎契约 `docs/plugin-migration/ENGINE_CONTRACT.md`（CLI：init/status/plan/
   advance/tasks/exec/artifacts/deliver/verify）。
5. **用户只待在主对话**：执行工作派给 `metis-executor` 子智能体（定义见
   `agents/metis-executor.md`）；无子智能体能力的环境，用后台任务 + 本文件
   作为执行纪律逐条下发（降级路径，能力等价）。

## 标准开场（/metis 主入口）

1. 引擎 `init`（已有项目则 `status` 恢复）：确认成果类型（基金/期刊/学位）、
   研究范式（定性/定量/理论）、语言、层级、起始状态。
2. 引导研究类型选择（检查点 1）。
3. 引擎 `plan` 装配工作流，向用户报告七阶段计划概览。

## 环境要求

- Python ≥ 3.10；本插件 `engine/` 可用（`python -m metis_academic.cli --version`）。
- 无 Python 环境时：如实告知用户需要引擎侧支持，不得用「假装执行」代替。

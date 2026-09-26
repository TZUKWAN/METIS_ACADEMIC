# 从 METIS4DSH 回收的防泄漏评测集（T6.2）

来源：`D:\LATEXTEST\METIS4DSH\deepseek-harness\metis\evals\`（冻结仓，只读复制）。
- tasks.json：评测任务定义（journal-selection / funding-template 等场景）
- results-latest.json：冻结前最后一次真实运行结果快照

运行方式：原 runner 为 Deno/TS（run-evals.ts，依赖 DSH runtime，本机未装）→
无法原样执行；本目录以「任务定义 + 历史真实结果」形式归档，作为 METIS 插件
同域场景的防泄漏基准题库。Python 侧等价验收 = tests/scenarios/S1–S7。

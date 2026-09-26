# /metis-resume — 恢复研究项目

1. `python -m metis_academic.cli status --workspace . --json` — 读取项目/阶段/任务状态。
2. 向用户汇报：项目名、当前七阶段位置、未完成任务数、上次证据时间。
3. 若有 running 残留：说明引擎已在 resume 时按证据处理（有证据→passed，无证据→重新排队）。
4. 询问用户「继续当前阶段？」→ 确认后进入执行循环（调度纪律见 SKILL.md）。

# 执行台账（EXECUTION_LOG）

> 格式：`| 日期 | 任务号 | 复测命令 | 结果(PASS/FAIL) | 证据位置 | 修复记录(如曾 FAIL) |`
> 台账行数 ≥ 完成任务数；每个 FAIL 必须有对应修复行。

| 日期 | 任务号 | 复测命令 | 结果 | 证据位置 | 修复记录 |
|---|---|---|---|---|---|
| 2026-09-26 | T0.1 | `python -m pytest -q`；`ruff check src tests scripts examples` | PASS | docs/plugin-migration/evidence/t0-baseline.txt（N0=230=229 passed+1 skipped；ruff clean） | — |
| 2026-09-26 | T0.2 | `git branch --show-current` | PASS | 输出 `plugin-migration` | — |
| 2026-09-26 | T0.3 | 逐文件核对 adapters/（2 处）+ src/metis_academic/adapters/（4 文件 316 行） | PASS | docs/plugin-migration/adapters-audit.md（覆盖率 100%） | — |
| 2026-09-26 | T0.4 | 附录 A 每条命令实跑（pytest/ruff/metis --version 于 T0.1、T0.8 执行） | PASS | TASKLIST.md 附录 A | — |
| 2026-09-26 | T0.5 | plugin.json 样例 json 校验（T1.2 落地时复跑）；矩阵 9 行来源标注 | PASS | docs/plugin-migration/PLUGIN_SPEC.md；AGENT_COMPAT_MATRIX.md（实测/官方文档/待勘察 三级标注） | — |
| 2026-09-26 | T0.6 | 契约 8 入口逐条映射实现处/待实现 | PASS | docs/plugin-migration/ENGINE_CONTRACT.md | — |
| 2026-09-26 | T0.7 | 三问落库（Q1/Q2 已答引用 §3；Q3 待确认不阻塞） | PASS | docs/plugin-migration/DECISIONS.md | — |
| 2026-09-26 | T0.8 | 全量 pytest + 产出检查（见 t0-gate.txt） | PASS | docs/plugin-migration/evidence/t0-gate.txt（230 collected, 0 failed, ruff clean, 8 文件齐） | — |
| 2026-09-26 | T1.8 | python -m pytest -q + ruff check（全量回归） | PASS | docs/plugin-migration/evidence/t1.8-regression.txt（≥N0，0 failed） | — |
| 2026-09-26 | T1.3 | 子智能体 SKILL 五问问答 | PASS | evidence/s1/t1.3-t1.4-quiz-report.md（5/5） | — |
| 2026-09-26 | T1.4 | 子智能体命令 dry-run 对照 ENGINE_CONTRACT | PASS | evidence/s1/t1.3-t1.4-quiz-report.md（10/10 ✓） | — |
| 2026-09-26 | T1.9 | 子智能体实跑 S1 场景 A1–A9 | PASS | evidence/s1/s1-run-report.md（9/9，附加 18 plugin tests） | — |

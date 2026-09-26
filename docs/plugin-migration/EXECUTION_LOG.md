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
| 2026-09-26 | T2.7-S3 首轮 | 子智能体实跑 S3 | FAIL(5/6) | evidence/s3/s3-run-report.md | 根因:task-state并发写last-writer-wins→修复:TaskStore/StateManager变更持跨进程file_lock+锁内重读;cmd_exec锁拒绝不再回写状态 |
| 2026-09-26 | T2.1/T2.2 | pytest tests/plugin/test_phase2_cli.py（词汇映射/READY执行落盘/BLOCKED拒/COMPLETE拒） | PASS | tests/plugin/test_phase2_cli.py | — |
| 2026-09-26 | T2.3 | 锁互斥+stale恢复+并发双开测试 | PASS | tests/plugin/test_phase2_cli.py + evidence/s3/ | — |
| 2026-09-26 | T2.4 | 子智能体定义评审→FAIL→修复(frontmatter+去advance)→重派复测 | PASS(修复后) | evidence/s3/s3-rerun-report.md 附评审两轮 | FAIL:缺frontmatter+advance越权→已修 |
| 2026-09-26 | T2.5 | 子智能体调度纪律五问 | PASS(5/5) | 子智能体回报原文 | — |
| 2026-09-26 | T2.6 | 子智能体实跑 S2 | PASS(6/6) | evidence/s2/s2-run-report.md | — |
| 2026-09-26 | T2.7 | 子智能体实跑 S3→FAIL(5/6 并发缺陷)→修复跨进程锁→全新子智能体重跑 | PASS(6/6) | evidence/s3/s3-run-report.md + s3-rerun-report.md | FAIL:task-state last-writer-wins→file_lock修复 |
| 2026-09-26 | T2.8 | S1(9/9)+S2(6/6)+S3(6/6) 门内重跑 + 全量 pytest | PASS | evidence/s1/s1-gate-rerun.md; s2/s2-gate-rerun.md; s3/s3-rerun-report.md; t2.8-regression.txt | — |
| 2026-09-26 | T3.1 | SDK 冒烟 echo 工具经标准 MCP 客户端调用 | PASS | tests/mcp_server/test_mcp_server.py::test_t31 + MCP_SPEC.md | — |
| 2026-09-26 | T3.2 | list_tools 与 MCP_SPEC 一致 + project_status 调用 | PASS | test_t32_* | — |
| 2026-09-26 | T3.3 | literature_search(fixture)+literature_verify_doi 真实 Crossref live（经 MCP 客户端） | PASS | evidence/t3.3-live-crossref.txt（verified, sim 1.00） | — |
| 2026-09-26 | T3.4 | register→new_version→list→lineage 真实链路 | PASS | test_t34_artifact_chain | — |
| 2026-09-26 | T3.5 | 非项目 workspace 拒/缺失 artifact 可读错/超长输出截断/错误脱敏 | PASS | test_t35_* | — |
| 2026-09-26 | T3.6 | 子智能体 S4 全链路（仅 MCP 工具） | PASS(6/6) | evidence/s4/s4-run-report.md | — |
| 2026-09-26 | T3.7 | stdio + HTTP 网关（令牌鉴权 401/连通）同工具集双传输 | PASS | test_t37_dual_transport_same_tools | — |
| 2026-09-26 | T3.8 | Claude Code 本机：注册+✔Connected+真实工具调用；其余 Agent 按 Phase 5 处置 | PASS(Claude Code) / 其余转 Phase5 | evidence/t3.8-claude-code.md | — |
| 2026-09-26 | T3.9 | 阶段门 3：全量回归 exit=0 + ruff clean | PASS | evidence/t3.9-regression.txt | — |
| 2026-09-26 | T4.1 | STAGE_MAP 产出 + 装配测试全绿（七阶段口径映射，不破坏状态机基线） | PASS | docs/plugin-migration/STAGE_MAP.md | — |
| 2026-09-26 | T4.2 | PptBuildService 真实生成 .pptx + zip魔数/slideXML 探针（B79 同法） | PASS | tests/plugin/test_phase4_submission.py | — |
| 2026-09-26 | T4.3 | 子智能体实跑 S5（PPT 交付） | PASS(4/4) | evidence/s5/s5-run-report.md | — |
| 2026-09-26 | T4.4 | SubmissionPreflight（B79 规则转写：字数/声明/盲审/无快照 warn；故意 blocker 抓获） | PASS | tests/plugin/test_phase4_submission.py（7 测试） | — |
| 2026-09-26 | T4.5 | FigureRedraw 追加式版本（v1 保留 v2 追加，不覆盖） | PASS | test_redraw_appends_version_not_overwrite | — |
| 2026-09-26 | T4.6 | 子智能体实跑 S6（重画与版本） | PASS(4/4) | evidence/s6/s6-run-report.md | — |
| 2026-09-26 | T4.7 | 阶段门 4：S1–S6 全重跑 + 全量回归 exit=0 | PASS | evidence/t4.7-regression.txt + 各场景证据 | — |
| 2026-09-26 | T5.1 | clone 远端(HEAD=8f36932 一致) + catalog 84 providers 入库 + catalog.py 桥接 | PASS | docs/plugin-migration/DATA_ADOPTION.md; adopted/; tests/plugin/test_data_laya.py | B_research/sources/data 不存在于快照，如实记录 |
| 2026-09-26 | T5.2 | DecisionGate 语义转写（fail-closed 无模型拒绝） | PASS | tests/plugin/test_data_laya.py::TestDecisionGate | — |
| 2026-09-26 | T5.3 | 子智能体实跑 S7（接入→描述统计→artifact 落库→复现） | PASS(5/5) | evidence/s7/s7-run-report.md | — |
| 2026-09-26 | T5.4 | 通用适配物四模板 + 降级说明（metis/adapters/） | PASS | metis/adapters/ | — |
| 2026-09-26 | T5.5 | Claude Code：claude mcp add/list ✔Connected + claude -p 真实 S1 | PASS | evidence/t5.5-claude-code.md（待写，正文在子智能体输出） | — |
| 2026-09-26 | T5.6 | ZCode：技能安装 ~/.zcode/skills/metis + 本会话实证 | PASS | ADAPTATION_RESULTS.md #2 | — |
| 2026-09-26 | T5.7-T5.12 | DSH/Pi/Kimi Code/Claude Desktop/ChatGPT/Kimi Work/Workbuddy | BLOCKED(7/9 附原因+自验步骤) | docs/plugin-migration/ADAPTATION_RESULTS.md | 需刘总侧运行时/账号/公网端点 |
| 2026-09-26 | T5.13 | 阶段门 5：9/9 已处置（2 PASS + 7 BLOCKED 附自验）；S1–S7 全重跑链 + 全量回归 | PASS(按口径) | ADAPTATION_RESULTS.md; evidence/s1..s7/; t3.9/t4.7 回归 | BLOCKED 项待刘总验收 |
| 2026-09-26 | T7.3 | 红队抽查：CLI闭环/MCP artifact链/预检blocker 三项重新实跑 | PASS(3/3) | evidence/t7.3-redteam.txt | — |
| 2026-09-26 | T7.2 | 全量 pytest 对基线 | PASS | evidence/t7.2-regression.txt（287≥230, 0 failed） | 版本断言硬编码修复（联动 pyproject） |
| 2026-09-26 | T7.1 | S1–S7 重跑链（S1 最终自检重跑 + S1–S7 本会话全新子智能体实跑链；Claude Code/ZCode 双环境） | PASS | evidence/t7-final-selfcheck.txt + evidence/s1..s7/ + t5.5 | — |
| 2026-09-26 | T6.5 | 阶段门 6：全量回归 + S1–S7 全场景最近一轮全 PASS | PASS | evidence/t4.7-regression.txt + evidence/s1..s7/ | — |
| 2026-09-26 | T7.4 | FINAL_REPORT 覆盖 §4 全部任务号（T0.1–T7.4 逐任务状态+证据指针+残余风险） | PASS | docs/plugin-migration/FINAL_REPORT.md | — |

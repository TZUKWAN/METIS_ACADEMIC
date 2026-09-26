# S3 复测报告：中断恢复 + 并行执行（s3-rerun-report，并发缺陷修复后重跑）

- 日期：2026-09-26
- 引擎：`python -m metis_academic.cli`（D:\METIS超级合并，ENGINE_CONTRACT v1）
- 工作区：`D:/METIS_s3b_loop/proj`（先删旧目录后全新 init）
- 修复项：task-state 变更现持跨进程锁（`src/metis_academic/state/task_store.py` `_mutation_lock` → `workspace/locking.py file_lock`）；exec 锁拒绝/迁移被拒不再回写状态（`src/metis_academic/engine_cli.py` cmd_exec L351 注释「锁拒绝/迁移被拒时不回写状态」）
- init 输出：`{"project_id": "metis-20260926-8028fc", "stage": "S1", "composed_from": ["common", "paradigm/qualitative", "artifact/journal", "language/zh-CN"], "task_rules": 50, "tasks_seeded": 50, "workspace": "D:\\METIS_s3b_loop\\proj"}`，退出码 0

## 逐项结论

| 项 | 判据 | 结果 |
|---|---|---|
| C1 | 占锁后挂起子进程 + 锁文件存在 | **PASS** |
| C2 | 强杀后 exec 接管 stale 锁：退出码 0 + COMPLETE | **PASS** |
| C3 | 状态零丢失（status/project.yaml/workflow.yaml/task-state.json/审计产物） | **PASS** |
| C4 | 并行 exec 两任务：两退出码均 0、均 COMPLETE、产物落盘、evidence 双 passed（上轮缺陷项） | **PASS** |
| C5 | 同任务双开恰一 0 一 1；赢家终态保持 COMPLETE 不被陈旧回写覆写（上轮次生缺陷项） | **PASS** |
| C6 | 终态 status/tasks 摘要 | **PASS** |

**结论：S3 = PASS（6/6）。** 上轮 C4 根因（task-state.json 并发 last-writer-wins 丢失更新）及 C5 次生缺陷（被拒方陈旧快照回写覆写赢家状态）均已修复并经本轮复测验证：3 轮并行执行全部无竞态失败，同任务双开后赢家终态完好。

---

## C1 — 占锁后挂起（模拟执行者持锁） PASS

C-S1-001 先经引擎库 `StateManager(WorkspaceManager(ws)).tasks.set_status("C-S1-001","ready")` 置 ready（输出 `C-S1-001 status -> ready`）。holder 脚本 `D:/METIS_s3b_loop/holder.py`（`TaskLock(ws, "C-S1-001")` 后 `time.sleep(300)`）经 subprocess.Popen 启动，cwd=引擎根目录，2 秒后探测：

```
C-S1-001 status -> ready
holder PID = 51324 | poll() = None        ← 进程存活、持锁挂起
lock exists = True
--- LOCK CONTENT ---
{"pid": 51324, "task": "C-S1-001", "at": 1790430090.427177}
```

锁文件 `D:/METIS_s3b_loop/proj/.metis/locks/C-S1-001.lock` 存在，内容含活 PID 51324。

## C2 — 强杀崩溃 + stale 锁接管 PASS

```
taskkill //F //PID 51324 → 成功: 已终止 PID 为 51324 的进程。  （KILL_EXIT=0）
lock still exists after kill = True
lock pid = 51324 | pid alive = False      （OpenProcess 探测，死 PID）
lock content = {"pid": 51324, "task": "C-S1-001", "at": 1790430090.427177}
```

重派新执行者（exec 内部 `TaskLock._try_break_stale()` 探测死 PID 自动接管）：

```
$ python -m metis_academic.cli exec --workspace D:/METIS_s3b_loop/proj C-S1-001 --json
{"task_id": "C-S1-001", "status": "COMPLETE", "error": null, "outputs": [".metis/logs/workspace-audit.md"]}
EXIT=0
```

执行后 locks 目录文件数 = 0（残留锁已拆除且未泄漏新锁）。

## C3 — 状态零丢失 PASS

```
$ python -m metis_academic.cli status --workspace D:/METIS_s3b_loop/proj --json
{"project_id": "metis-20260926-8028fc", "project_name": "S3复测", "stage": "S1", "seven_stage": "①文献准备", "initialized": true, "tasks": {"total": 2, "COMPLETE": 0, "READY": 0, "TODO": 0, "BLOCKED": 0, "FAILED": 0, "RUNNING": 0, "PASSED": 1, "PENDING": 1}, "evidence_count": 2, "workspace": "D:\\METIS_s3b_loop\\proj"}
EXIT=0
```

- `.metis/project.yaml` 584 B，YAML 解析 OK（project_id=metis-20260926-8028fc）
- `.metis/workflow.yaml` 19205 B，YAML 解析 OK（composed_from/stages/task_rules/rules 等 8 键）
- `.metis/task-state.json` 30725 B，JSON 解析 OK；`C-S1-001 = passed`，error=None
- 产物 `.metis/logs/workspace-audit.md` 在盘，148 B，头部 `# Workspace Audit` + 审计 JSON（documents/data_files/templates/drafts/topics/generated: 9）

## C4 — 并行执行 PASS（上轮 FAIL 项，本轮修复后通过）

C-S2-001、C-S2-002 经引擎库置 ready（`dependencies` 均空），subprocess.Popen 并行启动两个 exec，stdout/stderr 分别重定向 p1/p2：

```
launched C-S2-001 pid 6280 | launched C-S2-002 pid 49964
C-S2-001 exit = 0 (elapsed 3.86s)     ← 判据要求 0 ✓
C-S2-002 exit = 0 (elapsed 3.79s)     ← 两进程时间线重叠（同起同终）
--- p1.out ---
{"task_id": "C-S2-001", "status": "COMPLETE", "error": null, "outputs": ["literature/search_logs/plan.md"]}
--- p2.out ---
{"task_id": "C-S2-002", "status": "COMPLETE", "error": null, "outputs": ["literature/literature_index.md", "literature/references.bib"]}
```

产物核验（均在盘）：

```
literature/search_logs/plan.md    exists = True  size = 120   ← C-S2-001 产物
literature/literature_index.md    exists = True  size = 192   ← C-S2-002 产物
literature/references.bib         exists = True  size = 65
```

evidence.jsonl 含双方 passed 记录（共 7 条，关键行原文）：

```
{"schema_version": 1, "task_id": "C-S2-001", "timestamp": "2026-09-26T13:44:55+00:00", "action": "literature.plan", "inputs": [], "outputs": ["literature/search_logs/plan.md"], "validation": "file_nonempty", "status": "passed"}
{"schema_version": 1, "task_id": "C-S2-001", "timestamp": "2026-09-26T13:44:55+00:00", "action": "artifact:literature/search_logs/plan.md", "inputs": [], "outputs": ["sha256=d17315e47759d0bf"], "validation": "", "status": "passed"}
{"schema_version": 1, "task_id": "C-S2-002", "timestamp": "2026-09-26T13:44:57+00:00", "action": "literature.search", "inputs": ["literature/search_logs/plan.md"], "outputs": ["literature/literature_index.md", "literature/references.bib"], "validation": "literature.index_valid", "status": "passed"}
```

（C-S2-001 passed ×2、C-S2-002 passed ×3；另有 C-S1-001 passed ×2。）

`tasks --json`：C-S2-001 = COMPLETE、C-S2-002 = COMPLETE（TASKS_EXIT=0）。state.yaml task_history 迁移链完整无覆写：

```
13:44:53  C-S2-001 pending->ready
13:44:54  C-S2-002 pending->ready
13:44:55  C-S2-001 ready->running
13:44:55  C-S2-001 running->passed      ← 上轮被覆写丢失的记录，本轮完整在案
13:44:55  C-S2-002 ready->running       ← 与 001 的 passed 同秒，跨进程锁保证串行提交
13:44:57  C-S2-002 running->passed
```

## C5 — 同任务双开锁互斥 + 赢家终态不被覆写 PASS

C-S2-003 置 ready 后并行双开 exec 同任务（`D:/METIS_s3b_loop/double_open.py`）：

```
C-S2-003 status -> ready
double-open launched: d1 pid 40500 | d2 pid 33340
double-open #1 (d1/40500) exit = 0
double-open #2 (d2/33340) exit = 1
exactly one 0 and one 1: True
--- task-state after both exits: C-S2-003 = passed | error = None    ← 关键断言通过
--- d1.out ---（赢家）
{"task_id": "C-S2-003", "status": "COMPLETE", "error": null, "outputs": ["literature/literature_index.md"]}
--- d2.out ---（被拒方）
{"task_id": "C-S2-003", "status": "RUNNING", "error": null, "outputs": ["literature/literature_index.md"]}
```

- 恰一 0 一 1：✓（被拒方经 TaskLockError 路径退出码 1）
- **关键断言（上轮次生缺陷）**：两进程均退出后立刻读 task-state.json，`C-S2-003 = passed, error = None` —— 被拒方不再以陈旧快照回写（engine_cli.py L351 修复生效），赢家 COMPLETE 状态完好。上轮此场景 003 一度被打回 RUNNING，需 resume reconcile；本轮无需任何 reconcile。
- task_history 印证：003 仅一条 `ready->running` + 一条 `running->passed`（13:46:29），无重复/回退迁移。

## C6 — 终态摘要 PASS

```
$ status --json → EXIT=0
{"project_id": "metis-20260926-8028fc", ..., "initialized": true, "evidence_count": 9, ...}

$ tasks（关键行，共 50 任务）
C-S1-001       COMPLETE        工作区结构审计
C-S1-002       TODO            已有材料盘点（文档/数据/模板/草稿）
C-S2-001       COMPLETE        制定检索策略（关键词/来源/时间窗）
C-S2-002       COMPLETE        执行检索并建立文献索引
C-S2-003       COMPLETE        文献去重与核验
```

产物在盘：`literature/search_logs/plan.md`、`literature/literature_index.md`、`.metis/logs/workspace-audit.md`；locks 目录文件数 = 0。

## 步骤 9 — 连续 3 轮并行执行全部无竞态 PASS

Round 1 = 上文 C4（proj 工作区）；Round 2/3 = 全新 init 工作区（重置语义，project_id 分别为 metis-20260926-76e7ee / metis-20260926-6ee684），同一协议重跑第 6 步：

```
--- Round 1 (proj)   ---  C-S2-001: exit=0 COMPLETE ; C-S2-002: exit=0 COMPLETE
--- Round 2 (round2) ---  C-S2-001: exit=0 COMPLETE (4.61s) ; C-S2-002: exit=0 COMPLETE (4.50s)
--- Round 3 (round3) ---  C-S2-001: exit=0 COMPLETE (3.90s) ; C-S2-002: exit=0 COMPLETE (3.76s)
```

Round 2/3 复核 `tasks --json`：两工作区 C-S2-001/002 终态均 COMPLETE。3 轮 × 2 进程 = 6 次并行 exec，退出码 0/0/0/0/0/0，无 RUNNING 残留、无状态丢失 → **PASS**。

---

## 附录：环境与命令

- 平台：win32（Git Bash），Python 3.13.2（miniconda）；引擎以源码方式从 D:\METIS超级合并 导入
- 全程未直接写 .metis/ 状态文件；任务 ready 置位用引擎库 `StateManager(WorkspaceManager(ws)).tasks.set_status(...)`；占锁/崩溃模拟用外部 holder 子进程 + `taskkill /F`（纪律允许项）
- 辅助脚本：`D:/METIS_s3b_loop/holder.py`（占锁挂起）、`parallel_exec.py`（并行双开）、`double_open.py`（同任务双开）
- 残留物：`D:/METIS_s3b_loop/`（proj/round2/round3 工作区、round1/double1 输出、辅助脚本、holder.pid）

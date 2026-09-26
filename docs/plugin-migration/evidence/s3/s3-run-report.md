# S3 验收报告：中断恢复 + 并行执行（s3-run-report）

- 日期：2026-09-26
- 引擎：`python -m metis_academic.cli`（D:\METIS超级合并，ENGINE_CONTRACT v1）
- 工作区：`D:/METIS_s3_loop/proj`（先删旧目录后全新 init）
- init 输出：`{"project_id": "metis-20260926-521043", "stage": "S1", "composed_from": ["common", "paradigm/qualitative", "artifact/journal", "language/zh-CN"], "task_rules": 50, "tasks_seeded": 50, "workspace": "D:\\METIS_s3_loop\\proj"}`，退出码 0

## 逐项结论

| 项 | 判据 | 结果 |
|---|---|---|
| C1 | 占锁后挂起子进程 + 锁文件存在 | **PASS** |
| C2 | 强杀后 exec 接管 stale 锁：退出码 0 + COMPLETE | **PASS** |
| C3 | 状态零丢失（status/project.yaml/workflow.yaml/task-state.json/审计产物） | **PASS** |
| C4 | 并行 exec 两任务：两退出码均 0、均 COMPLETE、产物落盘 | **FAIL**（首跑 1/0；根因 task-state.json 并发丢失更新；2 次独立复跑 0/0） |
| C5 | 同任务双开：恰一 0 一 1 | **PASS** |
| C6 | 终态 status tasks 摘要 | **PASS** |

**结论：S3 = FAIL（5/6）。** C4 验收判据未满足：并行首跑中 C-S2-001 退出码 1、终态 RUNNING（工作实际完成、证据与产物均在，状态写入被并发覆写）。缺陷已定位（见附录 A），引擎自带 resume 可事后 reconcile。

---

## C1 — 占锁后挂起（模拟执行者持锁） PASS

`D:/METIS_s3_loop/holder.py`（subprocess.Popen 启动，cwd=引擎根目录）：

```python
from pathlib import Path
import time
from metis_academic.workspace import TaskLock
with TaskLock(Path("D:/METIS_s3_loop/proj"), "C-S1-001"):
    time.sleep(300)
```

C-S1-001 先经引擎库 `StateManager.tasks.set_status('C-S1-001','ready')` 置 ready（输出 `C-S1-001 status -> ready`）。2 秒后探测：

```
holder PID = 22676 | poll()= None
lock exists = True
--- LOCK CONTENT ---
{"pid": 22676, "task": "C-S1-001", "at": 1790427845.8000026}
```

锁文件 `D:/METIS_s3_loop/proj/.metis/locks/C-S1-001.lock` 存在，内容含活 PID 22676。

## C2 — 强杀崩溃 + stale 锁接管 PASS

```
taskkill //F //PID 22676 → 成功: 已终止 PID 为 22676 的进程。
lock still exists after kill = True
lock pid = 22676 | pid alive = False      （OpenProcess 探测，死 PID）
lock content = {"pid": 22676, "task": "C-S1-001", "at": 1790427845.8000026}
```

重派新执行者：

```
$ python -m metis_academic.cli exec --workspace D:/METIS_s3_loop/proj C-S1-001 --json
{"task_id": "C-S1-001", "status": "COMPLETE", "error": null, "outputs": [".metis/logs/workspace-audit.md"]}
EXIT=0
```

exec 内部 `TaskLock._try_break_stale()` 探测到死 PID，自动拆除残留锁并接管；执行后 locks 目录已清空。

## C3 — 状态零丢失 PASS

```
$ python -m metis_academic.cli status --workspace D:/METIS_s3_loop/proj --json
{"project_id": "metis-20260926-521043", "project_name": "S3验证", "stage": "S1", "seven_stage": "①文献准备", "initialized": true, "tasks": {"total": 2, "COMPLETE": 0, "READY": 0, "TODO": 0, "BLOCKED": 0, "FAILED": 0, "RUNNING": 0, "PASSED": 1, "PENDING": 1}, "evidence_count": 2, "workspace": "D:\\METIS_s3_loop\\proj"}
EXIT=0
```

- `project.yaml` 存在，583 B，可解析（project_id=metis-20260926-521043）
- `workflow.yaml` 存在，19205 B，可解析（composed_from 等 6 键）
- `task-state.json` 存在，30725 B，可解析；C-S1-001 = `passed`，error=None
- 产物 `.metis/logs/workspace-audit.md` 存在，148 B，头部：`# Workspace Audit` + scan JSON（documents/data_files/templates/drafts…）

## C4 — 并行执行 FAIL（首跑 1/0；补充复跑 2/2 通过）

C-S2-001、C-S2-002 经引擎库置 ready（两任务 dependencies 均 `[]`），subprocess.Popen 并行启动两个 exec，stdout 分别重定向 p1.json / p2.json：

```
launched C-S2-001 pid 23672
launched C-S2-002 pid 41152
C-S2-001 exit = 1        ← 判据要求 0
C-S2-002 exit = 0
```

```
--- p1.json ---（C-S2-001）
{"task_id": "C-S2-001", "status": "RUNNING", "error": null, "outputs": ["literature/search_logs/plan.md"]}

--- p2.json ---（C-S2-002，前两行为联网检索 404 警告）
ncpssd 检索不可达（404 Client Error: …）
chinaxiv 检索不可达（404 Client Error: …）
{"task_id": "C-S2-002", "status": "COMPLETE", "error": null, "outputs": ["literature/literature_index.md", "literature/references.bib"]}
```

产物核验（判据第 3 条满足）：

```
literature/search_logs/plan.md    exists = True  size = 120   ← C-S2-001 产物
literature/literature_index.md    exists = True  size = 192   ← C-S2-002 产物
literature/references.bib         exists = True  size = 65
```

evidence.jsonl 证明两任务的实际执行与验证均成功：

```
C-S2-001 | passed | 2026-09-26T13:06:18+00:00   （×2：_evidence + artifact 登记）
C-S2-002 | passed | 2026-09-26T13:06:20+00:00   （×3）
```

但 task-state.json 中 C-S2-001 终态为 `running`（丢失更新），state.yaml 的 task_history 印证其 `running->passed` 迁移记录被并发写覆盖：

```
13:06:18  C-S2-001 ready->running
13:06:18  C-S2-002 ready->running      ← 同秒重叠
13:06:20  C-S2-002 running->passed     ← C-S2-001 的 running->passed 记录被覆写丢失
```

文件 mtime（本地 +0800）：plan.md 21:06:18.04 → literature_index.md 21:06:20.25 → task-state.json 21:06:20.31（最后一次提交携带 001=running 的陈旧快照）。

恢复行为：随后任一次 `status --json`（内部 `sm.resume()` → `_recover_interrupted`：running 任务有 passed 证据判 passed）自动 reconcile —— C-S2-001 回到 passed。

补充复现试验（2 个全新 scratch 工作区，同一协议）：

```
--- trial 1 ---  C-S2-001: exit=0 status=COMPLETE ; C-S2-002: exit=0 status=COMPLETE
--- trial 2 ---  C-S2-001: exit=0 status=COMPLETE ; C-S2-002: exit=0 status=COMPLETE
```

即竞态为时序敏感型（本次验收 3 次并行触发 1 次），但缺陷真实存在（根因见附录 A），判据"两退出码均 0 且均 COMPLETE"在验收首跑不成立 → **C4 = FAIL**。

## C5 — 同任务双开锁互斥 PASS

C-S2-003 置 ready 后并行双开 exec：

```
double-open #1 exit = 0
double-open #2 exit = 1
--- d1.json ---（赢家）
{"task_id": "C-S2-003", "status": "COMPLETE", "error": null, "outputs": ["literature/literature_index.md"]}
--- d2.json ---（被拒方）
{"task_id": "C-S2-003", "status": "RUNNING", "error": "任务 C-S2-003 正在被其他执行者占用（锁：D:\\METIS_s3_loop\\proj\\.metis\\locks\\C-S2-003.lock）。等待或清除残留锁后重试。", "outputs": ["literature/literature_index.md"]}
```

恰一 0 一 1，拒绝消息为 TaskLockError 原文 → **PASS**。

次生发现（同根因）：被拒方 cmd_exec（engine_cli.py L350–353）将陈旧快照 `{003: running, error: 拒绝消息}` upsert 回 task-state.json，覆盖了赢家的 passed，致 003 一度终态为 RUNNING；随后 resume（有证据判 passed）再次 reconcile 为 COMPLETE。锁互斥契约本身成立，但失败路径的回写会污染赢家状态。

## C6 — 终态摘要 PASS

```
$ status --json → EXIT=0
{"project_id": "metis-20260926-521043", ..., "stage": "S1", "initialized": true, "evidence_count": 9, ...}

$ tasks（关键任务）
C-S1-001 COMPLETE  工作区结构审计
C-S1-002 TODO      已有材料盘点（文档/数据/模板/草稿）
C-S2-001 COMPLETE  制定检索策略（关键词/来源/时间窗）
C-S2-002 COMPLETE  执行检索并建立文献索引
C-S2-003 COMPLETE  文献去重与核验
（共 50 任务；C-S2-003 经 resume reconcile 后 COMPLETE）
```

产物在盘：`literature/search_logs/plan.md`、`literature/literature_index.md`、`.metis/logs/workspace-audit.md` 均存在。

---

## 附录 A：C4 根因（task-state.json 并发丢失更新）

- 锁只互斥"执行"，不互斥"状态写"：`TaskLock` 仅包裹 `run_task`（engine_cli.py L344）；TaskStore 的 `set_status` 是"全新 load → 内存改 → 整文件 save"（state/task_store.py L68–96），`write_task_state` 经 `safe_write` 临时文件 + `os.replace` 整文件替换（workspace/manager.py L162–171, L206–230）。两个进程的 load-load-save-save 交错即触发 last-writer-wins 丢失更新。
- 本次时序：002 的 `set_status(running)` load 读到 001=running，其 save 晚于 001 的 passed-save 提交 → 001 被打回 running；002 完成联网检索后再次以含 001=running 的快照提交 passed，坐实终态。
- 次生路径：exec 失败/被拒时 `final.error` upsert 同样以陈旧快照整文件回写（C5 次生发现）。
- 缓解现状：`sm.resume()` 的 `_recover_interrupted`（state/state_manager.py L118–133）可依证据将 running 任务 reconcile 为 passed/ready，事后可自愈；但 exec 即时退出码与终态仍不可靠。

## 附录 B：环境与命令

- 平台：win32（Git Bash），Python 经 miniconda；引擎以源码方式从 D:\METIS超级合并 导入
- 全程未直接写 .metis/ 状态文件；任务 ready 置位用引擎库 `StateManager(...).tasks.set_status(...)`，占锁/杀进程用外部子进程 + `taskkill /F`
- 残留物：`D:/METIS_s3_loop/`（proj 工作区、holder.py、p1/p2/d1/d2.json、holder.pid）

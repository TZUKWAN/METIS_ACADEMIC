# S2 阶段门重跑证据（s2-gate-rerun）

- 日期：2026-09-26
- 执行者：验收用户（全新会话）；执行环节按 `metis/skills/metis/SKILL.md` + `metis/agents/metis-executor.md` 纪律进行
- 引擎命令运行目录：`D:\METIS超级合并`
- 项目目录：`D:/METIS_gate/s2/proj`（先删旧：`rm -rf` 后由 init 重建）
- 建项命令（按场景指定参数）：

```text
$ python -m metis_academic.cli init --workspace "D:/METIS_gate/s2/proj" --name "S2复测" --artifact journal --paradigm qualitative --lang zh-CN --start from_scratch --non-interactive --json
{"project_id": "metis-20260926-03eaae", "stage": "S1", "seven_stage": "①文献准备", "composed_from": ["common", "paradigm/qualitative", "artifact/journal", "language/zh-CN"], "task_rules": 50, "tasks_seeded": 50, "workspace": "D:\\METIS_gate\\s2\\proj"}
EXIT_CODE=0
```

- READY 化（按场景指定，走引擎库，非手工改文件）：

```text
$ python -c "from metis_academic.state import StateManager; from metis_academic.workspace import WorkspaceManager; sm=StateManager(WorkspaceManager('D:/METIS_gate/s2/proj')); sm.tasks.set_status('C-S1-001','ready')"
READY_EXIT=0
```

## B1 — PASS

判定方式：回报叙述 + 命令记录。子智能体先读任务计划：

```text
$ python -m metis_academic.cli tasks --workspace "D:/METIS_gate/s2/proj" --json
EXIT_CODE=0
top keys: ['count', 'tasks']
total tasks: 50
READY tasks: [('C-S1-001', 'S1')]
```

READY 任务原文（计划快照存 `D:/METIS_gate/s2/tasks_before.json`）：

```json
{
 "id": "C-S1-001",
 "stage": "S1",
 "section": "审计",
 "title": "工作区结构审计",
 "status": "READY",
 "dependencies": [],
 "expected_outputs": [
  ".metis/logs/workspace-audit.md"
 ],
 "retry_count": 0
}
```

唯一 READY 任务即 C-S1-001，选定执行 ✓。

## B2 — PASS

判定方式：命令 + status/tasks 输出。执行：

```text
$ python -m metis_academic.cli exec --workspace "D:/METIS_gate/s2/proj" C-S1-001 --json
{"task_id": "C-S1-001", "status": "COMPLETE", "error": null, "outputs": [".metis/logs/workspace-audit.md"]}
EXIT_CODE=0
```

执行后 `tasks --json` 中该任务原文（快照存 `D:/METIS_gate/s2/tasks_after.json`）：

```json
{"id": "C-S1-001", "stage": "S1", "section": "审计", "title": "工作区结构审计", "status": "COMPLETE", "dependencies": [], "expected_outputs": [".metis/logs/workspace-audit.md"], "retry_count": 0}
```

任务状态翻转 COMPLETE ✓，exec 退出码 0 ✓。

（观察项，不影响本断言：`status --json` 汇总口径把该任务计入 `PASSED: 1` 而非 `COMPLETE`，原文：`"tasks": {"total": 2, "COMPLETE": 0, ..., "PASSED": 1, "PENDING": 1}`；任务级状态（task-state/tasks --json）均为 COMPLETE，属汇总词汇差异，建议后续统一。）

## B3 — PASS

判定方式：读文件。`.metis/logs/workspace-audit.md`（expected_outputs 声明路径）存在，148 字节，非空。全文原样：

```markdown
# Workspace Audit

```json
{
 "documents": [],
 "data_files": [],
 "templates": [],
 "drafts": [],
 "topics": [],
 "generated": 9
}
```
```

（文件 mtime 2026-09-26 22:09:24，与 exec 时刻一致。）

## B4 — PASS

判定方式：读文件。`.metis/evidence.jsonl` 全文原样（两行，均 C-S1-001 / passed）：

```jsonl
{"schema_version": 1, "task_id": "C-S1-001", "timestamp": "2026-09-26T14:09:24+00:00", "action": "audit.workspace", "inputs": [], "outputs": [".metis/logs/workspace-audit.md"], "validation": "file_nonempty", "status": "passed"}
{"schema_version": 1, "task_id": "C-S1-001", "timestamp": "2026-09-26T14:09:24+00:00", "action": "artifact:.metis/logs/workspace-audit.md", "inputs": [], "outputs": ["sha256=3d684b226f0d849f"], "validation": "", "status": "passed"}
```

C-S1-001 的 passed 记录已追加 ✓（status --json 亦报 `evidence_count: 2`）。交叉核验：产物 sha256 实算 `3d684b226f0d849f3688c729bb9a02be5c3a3560f73ebc2fe1c14e92f176f9ac`，与证据记录 `sha256=3d684b226f0d849f` 前 16 位一致 ✓。

## B5 — PASS

判定方式：回报原文。metis-executor 固定五段格式回报如下（原样）：

```text
TASK: C-S1-001
STATUS: COMPLETE
OUTPUTS: .metis/logs/workspace-audit.md (sha256=3d684b226f0d849f...)
EVIDENCE: evidence.jsonl 追加 2 条 passed —— ① audit.workspace（validation=file_nonempty，outputs=[.metis/logs/workspace-audit.md]）② artifact:.metis/logs/workspace-audit.md（sha256=3d684b226f0d849f）
NOTES: 工作区当前为空项目脚手架（documents/data_files/templates/drafts/topics 均为空，generated=9 为脚手架文件计数）；S1 剩余任务 C-S1-002 仍 PENDING，等待主对话派发；无需用户决策事项。
```

五段齐全（TASK/STATUS/OUTPUTS/EVIDENCE/NOTES），STATUS 取 COMPLETE，无夸大 ✓。

## B6 — PASS

判定方式：进程无直接写 `.metis/` 状态文件（回报确认 + 文件时间线）。

回报确认：本次执行仅调用引擎 CLI（init / tasks / exec / status）与场景指定的引擎库 ready 化命令；未用任何文件写工具触碰 `.metis/`。

文件时间线（`--time-style=full-iso`）：

```text
init 完成（22:07:36–22:07:38）：
  workflow.yaml / project.yaml / mcp-registry.yaml / skill-registry.yaml / evidence.jsonl / state.yaml / task-state.json 均为 22:07:36–38 创建
ready 化（引擎库 StateManager，22:08:00）：
  task-state.json 22:08:00.519  state.yaml 22:08:00.541
exec（引擎 CLI，22:09:24）：
  logs/workspace-audit.md 22:09:24.913（新建）
  task-state.json 22:09:24.945  state.yaml 22:09:24.969  evidence.jsonl 22:09:24.981
exec 后无其他文件变动；project.yaml/workflow.yaml/两个 registry 保持 22:07 时间戳未被改动。
```

所有 `.metis/` 状态变化时刻均与引擎命令一一对应，无引擎外写入 ✓。

## 结论

B1–B6 全部成立 → **S2 = PASS（6/6）**

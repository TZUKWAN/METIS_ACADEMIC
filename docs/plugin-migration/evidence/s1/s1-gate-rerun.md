# S1 阶段门重跑证据（s1-gate-rerun）

- 日期：2026-09-26
- 执行者：验收用户（全新会话，仅凭 `metis/skills/metis/SKILL.md` + `metis/commands/metis.md` 纪律操作）
- 引擎命令运行目录：`D:\METIS超级合并`
- 项目目录：`D:/METIS_gate/s1/proj`（先删旧：`rm -rf` 后重建空目录）
- 用户输入序列（逐句）：`/metis` → 「我要写一篇硕士毕业论文，定量实证，中文，从零开始，项目名叫"平台劳动研究"」→ 「现在进展到哪一步了？」→ 「把研究类型定为：已有选题（选题材料我后续提供），然后装配工作流」

## A1 — PASS

判定方式：实际执行。

```text
$ python -m metis_academic.cli --version
metis-academic 0.1.0
EXIT_CODE=0
```

退出码 0，输出 `metis-academic 0.1.0` 符合 `metis-academic <版本>`。

## A2 — PASS

判定方式：读文件。init 命令（按命令文档参数）：

```text
$ python -m metis_academic.cli init --workspace "D:/METIS_gate/s1/proj" --name "平台劳动研究" --artifact thesis --paradigm quantitative --lang zh-CN --level master --start from_scratch --non-interactive --json
EXIT_CODE=0
```

`D:/METIS_gate/s1/proj/.metis/project.yaml` 存在，关键原文：

```yaml
project_name: 平台劳动研究
artifact_type:
  type: thesis
research_paradigm:
  type: quantitative
language:
  type: zh-CN
thesis:
  schema_version: 1
  degree_level: master
start_mode:
  type: from_scratch
status:
  schema_version: 1
  current_stage: S1
  initialized: true
```

## A3 — PASS

判定方式：实际执行解析。init `--json` 输出原文（一行 JSON，原样）：

```json
{"project_id": "metis-20260926-433a9d", "stage": "S1", "seven_stage": "①文献准备", "composed_from": ["common", "paradigm/quantitative", "artifact/thesis", "level/master", "language/zh-CN"], "task_rules": 64, "tasks_seeded": 64, "workspace": "D:\\METIS_gate\\s1\\proj"}
```

- `stage=S1` ✓
- composed_from 含 `paradigm/quantitative`、`artifact/thesis`、`level/master`、`language/zh-CN` ✓
- （门禁附注）`tasks_seeded = 64 ≥ 20` ✓

## A4 — PASS

判定方式：读文件。

`D:/METIS_gate/s1/proj/.metis/workflow.yaml` 存在；解析统计原文：

```text
top keys: ['schema_version', 'composed_from', 'artifact_type', 'research_paradigm', 'language', 'thesis_level', 'stages', 'task_rules', 'rules']
task_rules count: 64
```

task_rules = 64 ≥ 20 ✓。

`D:/METIS_gate/s1/proj/.metis/task-state.json`（39,175 字节）解析原文：

```text
type: dict
top keys: ['schema_version', 'tasks']
task count: 64
sample ids: ['C-S1-001', 'C-S1-002', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'C-S2-001', 'C-S2-002', 'C-S2-003', 'C-S3-001']
```

种子任务已写入 ✓（含 thesis S1 全部任务 C-S1-001、C-S1-002、T1..T9）。

## A5 — PASS

判定方式：实际执行解析。`status --json` 输出原文（一行 JSON，原样）：

```json
{"project_id": "metis-20260926-433a9d", "project_name": "平台劳动研究", "stage": "S1", "seven_stage": "①文献准备", "initialized": true, "tasks": {"total": 11, "COMPLETE": 0, "READY": 0, "TODO": 0, "BLOCKED": 0, "FAILED": 0, "RUNNING": 0, "PENDING": 11}, "evidence_count": 0, "workspace": "D:\\METIS_gate\\s1\\proj"}
```

- `stage=S1` ✓
- `project_name=平台劳动研究` ✓
- `tasks.total == 11` ✓（thesis S1：C-S1×2 + T1..T9 = 11）

## A6 — PASS

判定方式：实际执行。重复 init（无 --force）：

```text
$ python -m metis_academic.cli init --workspace "D:/METIS_gate/s1/proj" --name "平台劳动研究" ... --non-interactive
[METIS] 项目已存在（D:\METIS_gate\s1\proj）。恢复用 status/advance；重建加 --force。
EXIT_CODE=1
```

退出码 1，报错含「已存在」，中文可读，无 traceback。

## A7 — PASS

判定方式：实际执行。`plan --workspace "D:/METIS_gate/s1/proj" --lang en-US --json` 连续两次：

```text
RUN1_EXIT=0
RUN2_EXIT=0
DIFF=IDENTICAL
=== run1 output ===
{"composed_from": ["common", "paradigm/quantitative", "artifact/thesis", "level/master", "language/en-US"], "task_rules": 65, "stages": ["S0", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10"]}
=== md5 ===
4222a59ada622ac89c2c70a65265409d */tmp/s1_plan_1.json
4222a59ada622ac89c2c70a65265409d */tmp/s1_plan_2.json
```

两次输出逐字节一致（diff 为空、md5 相同）→ 幂等 ✓。（plan 改 lang 属引擎实际能力，对应场景输入 5「改配置用 plan」；验证后已用 `plan --lang zh-CN` 恢复，RESTORE_EXIT=0。）

## A8 — PASS

判定方式：抽查目录。init 全程后项目内全部文件：

```text
D:/METIS_gate/s1/proj/.metis/evidence.jsonl
D:/METIS_gate/s1/proj/.metis/mcp-registry.yaml
D:/METIS_gate/s1/proj/.metis/project.yaml
D:/METIS_gate/s1/proj/.metis/skill-registry.yaml
D:/METIS_gate/s1/proj/.metis/state.yaml
D:/METIS_gate/s1/proj/.metis/task-state.json
D:/METIS_gate/s1/proj/.metis/workflow.yaml
D:/METIS_gate/s1/proj/code/requirements.txt
D:/METIS_gate/s1/proj/code/run_all.py
D:/METIS_gate/s1/proj/data/README.md
D:/METIS_gate/s1/proj/literature/literature_index.md
D:/METIS_gate/s1/proj/literature/references.bib
```

`find -name evidence.jsonl` 结果仅一条：`D:/METIS_gate/s1/proj/.metis/evidence.jsonl` ✓。`.metis/` 外只有工作区脚手架内容文件（code/data/literature 等），无任何项目状态文件 ✓。

## A9 — PASS

判定方式：抽查失败路径（init 缺 --level，全新探针目录）：

```text
$ python -m metis_academic.cli init --workspace "D:/METIS_gate/s1/_a9_tmp" --name "A9探针" --artifact thesis --paradigm quantitative --lang zh-CN --start from_scratch --non-interactive
[METIS] 毕业论文必须指定 --level bachelor|master|phd
RAW_EXIT=1   （stderr 原文：[METIS] 毕业论文必须指定 --level bachelor|master|phd）
```

退出码 1，中文可读报错，无裸 traceback ✓。（探针目录已删除。）

## 结论

A1–A9 全部成立 → **S1 = PASS（9/9）**

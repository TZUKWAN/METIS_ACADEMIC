# S1 验收运行报告（Acceptance Run Report）

- 日期：2026-09-26
- 执行目录：D:\METIS超级合并
- 项目目录：D:\METIS_s1_loop\proj（执行前已删除旧目录并新建空目录）
- 引擎调用方式：`python -m metis_academic.cli <子命令>`

## 命令执行记录（原始输出）

### 步骤 1：新建空目录
```
$ rm -rf /d/METIS_s1_loop && mkdir -p /d/METIS_s1_loop/proj && ls -la /d/METIS_s1_loop/
total 28
drwxr-xr-x 1 lauze 197609 0 Sep 26 20:29 .
drwxr-xr-x 1 lauze 197609 0 Sep 26 20:29 ..
drwxr-xr-x 1 lauze 197609 0 Sep 26 20:29 proj
```

### 步骤 2：版本检查
```
$ python -m metis_academic.cli --version
metis-academic 0.1.0
EXIT_CODE=0
```

### 步骤 3：立项（json）
```
$ python -m metis_academic.cli init --workspace D:/METIS_s1_loop/proj --name "平台劳动研究" --artifact thesis --paradigm quantitative --lang zh-CN --level master --start from_scratch --non-interactive --json
{"project_id": "metis-20260926-dc1fa2", "stage": "S1", "seven_stage": "①文献准备", "composed_from": ["common", "paradigm/quantitative", "artifact/thesis", "level/master", "language/zh-CN"], "task_rules": 64, "tasks_seeded": 64, "workspace": "D:\\METIS_s1_loop\\proj"}
EXIT_CODE=0
```

### 步骤 4：查状态（json）
```
$ python -m metis_academic.cli status --workspace D:/METIS_s1_loop/proj --json
{"project_id": "metis-20260926-dc1fa2", "project_name": "平台劳动研究", "stage": "S1", "seven_stage": "①文献准备", "initialized": true, "tasks": {"total": 11, "COMPLETE": 0, "READY": 0, "TODO": 0, "BLOCKED": 0, "FAILED": 0, "RUNNING": 0, "PENDING": 11}, "evidence_count": 0, "workspace": "D:\\METIS_s1_loop\\proj"}
EXIT_CODE=0
```

### 步骤 5：重复 init（不加 --force）
```
$ python -m metis_academic.cli init --workspace D:/METIS_s1_loop/proj --name "平台劳动研究" --artifact thesis --paradigm quantitative --lang zh-CN --level master --start from_scratch --non-interactive --json
[METIS] 项目已存在（D:\METIS_s1_loop\proj）。恢复用 status/advance；重建加 --force。
EXIT_CODE=1
```

### 步骤 6：plan 幂等性（连跑两次）
```
$ python -m metis_academic.cli plan --workspace D:/METIS_s1_loop/proj --lang en-US --json   # RUN1
{"composed_from": ["common", "paradigm/quantitative", "artifact/thesis", "level/master", "language/en-US"], "task_rules": 65, "stages": ["S0", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10"]}
RUN1_EXIT=0
$ python -m metis_academic.cli plan --workspace D:/METIS_s1_loop/proj --lang en-US --json   # RUN2
RUN2_EXIT=0
$ diff /tmp/plan_run1.json /tmp/plan_run2.json && echo "DIFF: IDENTICAL"
DIFF: IDENTICAL
$ diff /tmp/plan_run1.err /tmp/plan_run2.err && echo "STDERR: IDENTICAL"
STDERR: IDENTICAL
```

### 步骤 7：失败路径抽查（thesis 缺 --level）
```
$ python -m metis_academic.cli init --workspace D:/METIS_s1_loop/proj2 --name x --artifact thesis --paradigm qualitative --start from_scratch --non-interactive
[METIS] 毕业论文必须指定 --level bachelor|master|phd
EXIT_CODE=1
```
（无 traceback；且 proj2 目录未被创建。）

### 步骤 8：文件核查
`.metis/` 目录清单：
```
$ ls -la /d/METIS_s1_loop/proj/.metis/
total 82
drwxr-xr-x 1 lauze 197609     0 Sep 26 20:30 .
drwxr-xr-x 1 lauze 197609     0 Sep 26 20:29 ..
-rw-r--r-- 1 lauze 197609     0 Sep 26 20:29 evidence.jsonl
drwxr-xr-x 1 lauze 197609     0 Sep 26 20:29 logs
-rw-r--r-- 1 lauze 197609  2167 Sep 26 20:29 mcp-registry.yaml
-rw-r--r-- 1 lauze 197609   595 Sep 26 20:29 project.yaml
-rw-r--r-- 1 lauze 197609  3368 Sep 26 20:29 skill-registry.yaml
-rw-r--r-- 1 lauze 197609   277 Sep 26 20:29 state.yaml
-rw-r--r-- 1 lauze 197609 39175 Sep 26 20:29 task-state.json
-rw-r--r-- 1 lauze 197609 23887 Sep 26 20:30 workflow.yaml
```

`project.yaml` 全文（D:\METIS_s1_loop\proj\.metis\project.yaml）：
```yaml
schema_version: 1
project_id: metis-20260926-dc1fa2
project_name: 平台劳动研究
artifact_type:
  type: thesis
research_paradigm:
  type: quantitative
language:
  type: zh-CN
fund:
  schema_version: 1
  category: null
  template_source: null
journal:
  schema_version: 1
  target_journal: null
  target_level: null
thesis:
  schema_version: 1
  degree_level: master
  institution: null
  template_source: null
start_mode:
  type: from_scratch
workspace:
  schema_version: 1
  root: D:\METIS_s1_loop\proj
status:
  schema_version: 1
  current_stage: S1
  current_task: ''
  initialized: true
```

task-state.json 任务计数：
```
top-level keys: ['schema_version', 'tasks']
tasks count: 64
```

workflow.yaml task_rules 计数（YAML 解析）：
```
workflow.yaml top-level keys: ['schema_version', 'composed_from', 'artifact_type', 'research_paradigm', 'language', 'thesis_level', 'stages', 'task_rules', 'rules']
task_rules type: list count: 65
```

状态文件外泄检查：
```
$ ls -la /d/METIS_s1_loop/
total 32
drwxr-xr-x 1 lauze 197609 0 Sep 26 20:29 .
drwxr-xr-x 1 lauze 197609 0 Sep 26 20:29 ..
drwxr-xr-x 1 lauze 197609 0 Sep 26 20:29 proj
（仅 proj，失败的 proj2 未被创建）

$ find "/d/METIS超级合并" -maxdepth 1 -name ".metis" -o -maxdepth 1 -name "task-state.json" -o -maxdepth 1 -name "evidence.jsonl" -o -maxdepth 1 -name "workflow.yaml" -o -maxdepth 1 -name "project.yaml"
NO_STATE_FILES_AT_CWD_ROOT
```

### 步骤 9：插件测试套件
```
$ python -m pytest tests/plugin/test_plugin_structure.py tests/plugin/test_engine_cli.py
..................                                                       [100%]
18 passed in 24.76s
EXIT_CODE=0
```

## 验收清单 A1–A9

| 编号 | 项目 | 结果 | 关键证据原文 |
|------|------|------|--------------|
| A1 | --version 退出码 0 且输出 metis-academic 版本 | PASS | 输出 `metis-academic 0.1.0`，`EXIT_CODE=0` |
| A2 | project.yaml 存在且 project_name="平台劳动研究" | PASS | project.yaml 第 3 行：`project_name: 平台劳动研究` |
| A3 | init --json：stage=S1；composed_from 含 paradigm/quantitative、artifact/thesis、level/master、language/zh-CN；tasks_seeded ≥ 20 | PASS | `"stage": "S1"`；`"composed_from": ["common", "paradigm/quantitative", "artifact/thesis", "level/master", "language/zh-CN"]`；`"tasks_seeded": 64`（≥20） |
| A4 | workflow.yaml 存在且 task_rules ≥ 20；task-state.json 存在且含 64 个任务 | PASS | workflow.yaml 存在（23887 字节），YAML 解析 `task_rules count: 65`（≥20）；task-state.json 存在（39175 字节），`tasks count: 64` |
| A5 | status --json：stage=S1、project_name="平台劳动研究"、tasks.total=11 | PASS | `"project_name": "平台劳动研究", "stage": "S1"`；`"tasks": {"total": 11, ...}` |
| A6 | 重复 init 退出码 1 且报错含「已存在」 | PASS | `[METIS] 项目已存在（D:\METIS_s1_loop\proj）。恢复用 status/advance；重建加 --force。`，`EXIT_CODE=1` |
| A7 | plan 两次输出完全一致（幂等） | PASS | `diff /tmp/plan_run1.json /tmp/plan_run2.json` → `DIFF: IDENTICAL`；stderr 亦 `STDERR: IDENTICAL`；两次退出码均为 0 |
| A8 | 状态文件只在 .metis/ 内 | PASS | project.yaml / workflow.yaml / task-state.json / evidence.jsonl（及 state.yaml、mcp-registry.yaml、skill-registry.yaml、logs/）全部位于 proj/.metis/ 内；D:/METIS_s1_loop 下仅有 proj（失败的 proj2 未创建）；D:\METIS超级合并 根目录未出现 .metis/task-state.json/evidence.jsonl/workflow.yaml/project.yaml |
| A9 | 缺 --level 时退出码 1、中文报错、无 traceback | PASS | `[METIS] 毕业论文必须指定 --level bachelor|master|phd`，`EXIT_CODE=1`，输出仅一行可读错误、无 traceback |

附加项：`python -m pytest tests/plugin/test_plugin_structure.py tests/plugin/test_engine_cli.py` → `18 passed in 24.76s`，退出码 0。

## 观察项（不影响验收结论）

1. `plan --lang en-US --json` 两次运行后，磁盘上 `.metis/workflow.yaml` 的 `composed_from`/`language` 变为 `language/en-US`（task_rules 由 init 时的 64 变为 65，与 plan 输出一致），而 `project.yaml` 仍为 `zh-CN`。plan 对 workflow.yaml 的落盘改写属预期外副作用，但 A4（task_rules ≥ 20）与 A7（两次输出一致）均不受影响。建议后续核实 plan 是否应保持只读。
2. `plan` 输出 `task_rules: 65` 与 init 输出 `task_rules: 64` 差 1，来源于 `--lang en-US` 相比 `zh-CN` 追加的组合规则，非缺陷。

## 结论

S1 = PASS（9/9）

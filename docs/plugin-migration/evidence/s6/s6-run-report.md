# S6 验收运行报告 — 图表重画与版本（FigureRedraw 追加式版本 + 切换）

- 日期：2026-09-26
- 执行者：METIS 插件执行子智能体（验收用户）
- 场景文件：`D:\METIS超级合并\tests\scenarios\S6-figure-redraw.md`（逐字执行）
- 项目目录：`D:/METIS_s6_loop/proj`（先删旧目录再 init：`--artifact journal --paradigm quantitative --lang zh-CN`，经 `metis_academic.engine_cli.run_engine_cli`）
- Runner：`D:/METIS_loop_runners/run_s6.py`
- 入口：`from metis_academic.submission import FigureRedraw`；基础版本按约定直接追加 `<ws>/.metis/figure-versions.jsonl`（sha256 用 `metis_academic.workspace.file_sha256` 计算）；`redraw(name, instruction)` 前修改图文件内容使 sha 变化

## 前置与用户输入序列（逐字）

前置：定量项目 figures/ 有图（`figures/coefplot.png`，内容 b"v1"，登记为 v1）。
1. 「选中 coefplot，重画要求：配色改蓝橙」→ 图文件改写为 b"v2-new-render"（模拟重渲染）后执行 `FigureRedraw(ws).redraw("coefplot", "配色改蓝橙")`
2. 「切回 v1」→ 执行 `FigureRedraw(ws).switch("coefplot", 1)`

## init 与登记证据原文

```
INIT_RC: 0
INIT_JSON: {"project_id": "metis-20260927-9021d1", "stage": "S1", "seven_stage": "①文献准备", "composed_from": ["common", "paradigm/quantitative", "artifact/journal", "language/zh-CN"], "task_rules": 61, "tasks_seeded": 61, "workspace": "D:\\METIS_s6_loop\\proj"}
V1_PATH: D:\METIS_s6_loop\proj\figures\coefplot.png
V1_CONTENT: b'v1'
V1_SHA256: 3bfc269594ef649228e9a74bab00f042efc91d5acc6fbee31a382e80d42388fe
INDEX_AFTER_REGISTER:
{"name": "coefplot", "version": 1, "path": "figures/coefplot.png", "instruction": "基础版本（make_figures 产出）", "sha256": "3bfc269594ef649228e9a74bab00f042efc91d5acc6fbee31a382e80d42388fe"}
CONTENT_AFTER_RERENDER: b'v2-new-render'
SHA_AFTER_RERENDER: 391effa0966f4923f4425e4cb41ffbe377dbfba1fd4e941863ca1326750fa8ef
```

## F1 redraw 返回 v2 且 lineage 长度 2 — PASS

redraw 返回值与 lineage 原文：

```json
REDRAW_RETURN: {"name": "coefplot", "version": 2, "path": "figures/coefplot.png", "instruction": "配色改蓝橙", "sha256": "391effa0966f4923f4425e4cb41ffbe377dbfba1fd4e941863ca1326750fa8ef"}
LINEAGE_LEN: 2
LINEAGE_ENTRY: {"name": "coefplot", "version": 1, "path": "figures/coefplot.png", "instruction": "基础版本（make_figures 产出）", "sha256": "3bfc269594ef649228e9a74bab00f042efc91d5acc6fbee31a382e80d42388fe"}
LINEAGE_ENTRY: {"name": "coefplot", "version": 2, "path": "figures/coefplot.png", "instruction": "配色改蓝橙", "sha256": "391effa0966f4923f4425e4cb41ffbe377dbfba1fd4e941863ca1326750fa8ef"}
```

`v2.version == 2` 且 `len(lineage) == 2`，成立。

## F2 v1 记录仍存在（路径/sha 不变） — PASS

redraw 后 lineage 中 v1 记录与登记时逐字一致：`path = "figures/coefplot.png"`、
`sha256 = 3bfc269594ef649228e9a74bab00f042efc91d5acc6fbee31a382e80d42388fe`（= 登记 V1_SHA256）、
`instruction = "基础版本（make_figures 产出）"`，未被 redraw 改写。

## F3 switch v1 后 current 指向 version=1 — PASS

`switch("coefplot", 1)` 返回 `D:\METIS_s6_loop\proj\figures\current_coefplot.txt`，文件原文：

```json
{"name": "coefplot", "version": 1, "path": "figures/coefplot.png"}
```

`current.version == 1`，成立。

## F4 v1 内容未被 v2 覆盖（不同 sha） — PASS

```
F4_V1_SHA: 3bfc269594ef649228e9a74bab00f042efc91d5acc6fbee31a382e80d42388fe
F4_V2_SHA: 391effa0966f4923f4425e4cb41ffbe377dbfba1fd4e941863ca1326750fa8ef
F4_SHA_DIFFER: True
F4_JSONL_FIRST_LINE_INTACT: True
```

v1 登记的 sha256 在 redraw 后原样保留（`figure-versions.jsonl` 首行逐字未变），v2 以新 sha
追加为独立记录，两版本 sha 不同、可区分、旧版本记录未被覆盖（`FigureRedraw` 为追加式
jsonl 落库，`redraw` 只 append，不修改既有行）。

## 判定

```
VERDICT: {"F1": true, "F2": true, "F3": true, "F4": true}
S6_RESULT: PASS
```

F1–F4 全成立 → **S6 = PASS**。

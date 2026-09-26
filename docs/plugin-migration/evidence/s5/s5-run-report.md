# S5 验收运行报告 — PPT 交付（PptBuildService 真实 .pptx + 探针验证）

- 日期：2026-09-26
- 执行者：METIS 插件执行子智能体（验收用户）
- 场景文件：`D:\METIS超级合并\tests\scenarios\S5-ppt-delivery.md`（逐字执行）
- 项目目录：`D:/METIS_s5_loop/proj`（先删旧目录再 init：`--artifact thesis --paradigm quantitative --lang zh-CN --level master`，经 `metis_academic.engine_cli.run_engine_cli`）
- Runner：`D:/METIS_loop_runners/run_s5.py`
- 入口：`from metis_academic.submission import PptBuildService`；`svc.build("平台劳动研究", slides=[...], template_slug="academic")`；探针 `PptBuildService.verify_pptx(path, expected_texts)`

## 用户输入序列（逐字）

1. 「由以下要点生成答辩 PPT：标题《平台劳动研究》；页1 研究问题-[RQ1 算法如何控制劳动]；页2 发现-[算法控制机制成立]」
   → 执行为 `svc.build("平台劳动研究", slides=[{"title": "研究问题", "bullets": ["RQ1 算法如何控制劳动"]}, {"title": "发现", "bullets": ["算法控制机制成立"]}], template_slug="academic")`
2. 「验证生成的 pptx（zip 魔数 + slide XML 文本探针）」→ 执行为 `verify_pptx` 正向 + 负向探针

## init 证据原文

```
INIT_RC: 0
INIT_JSON: {"project_id": "metis-20260927-c04cf0", "stage": "S1", "seven_stage": "①文献准备", "composed_from": ["common", "paradigm/quantitative", "artifact/thesis", "level/master", "language/zh-CN"], "task_rules": 64, "tasks_seeded": 64, "workspace": "D:\\METIS_s5_loop\\proj"}
BUILD_OUT: D:\METIS_s5_loop\proj\deliverables\slides.pptx
BUILD_EXISTS: True
```

## E1 deliverables/slides.pptx 生成且 zip 魔数 PK — PASS

产物路径 `D:\METIS_s5_loop\proj\deliverables\slides.pptx`，`is_file()=True`，首 2 字节原文：

```
E1_MAGIC_FIRST2: b'PK'
```

## E2 slide XML 含要点文本 — PASS

正向探针（逐字用户输入要点）返回原文：

```json
{"ok": true, "missing_texts": [], "reason": ""}
```

slide XML `<a:t>` 文本提取原文（含两条要点）：

```
SLIDE_XML_TEXTS ppt/slides/slide2.xml: ['研究问题', 'RQ1 算法如何控制劳动']
SLIDE_XML_TEXTS ppt/slides/slide3.xml: ['发现', '算法控制机制成立']
```

说明：场景清单 E2 行括注为「RQ1 平台如何控制劳动」，与场景「用户输入序列」中逐字的
「RQ1 算法如何控制劳动」不一致；按执行纪律以用户输入序列逐字为准生成，并以生成文本探针。
两条要点均命中 slide XML。

## E3 页数 = 3（封面 + 2 内容页）— PASS

zip 内 slide part 与 python-pptx 双口径计数原文：

```
SLIDE_PARTS: ['ppt/slides/slide1.xml', 'ppt/slides/slide2.xml', 'ppt/slides/slide3.xml']
E3_SLIDE_COUNT_PPTX: 3
E3_SLIDE_COUNT_ZIP: 3
E3_SLIDE_TITLES: ["平台劳动研究", "研究问题", "发现"]
```

slide1 为封面（标题「平台劳动研究」，副题「模板: academic」），slide2/slide3 为两页内容页。

## E4 探针对不存在文本报 not ok（负向） — PASS

负向探针（传入不存在文本）返回原文：

```json
{"ok": false, "missing_texts": ["此文本不存在于任何幻灯片中XYZ123"], "reason": "slide XML 缺文本: ['此文本不存在于任何幻灯片中XYZ123']"}
```

## 判定

```
VERDICT: {"E1": true, "E2": true, "E3": true, "E4": true}
S5_RESULT: PASS
```

E1–E4 全成立 → **S5 = PASS**。

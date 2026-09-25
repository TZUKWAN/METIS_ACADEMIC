#!/usr/bin/env python3
"""IMPLEMENTATION_STATUS.md 生成器。

用法:
  python scripts/gen_status.py                 # 重建全表（保留已有状态注记）
  python scripts/gen_status.py --mark A001 passed --note "测试通过"
  python scripts/gen_status.py --mark C003,C004 done --note "..."
  python scripts/gen_status.py --phase-regression A "20/20 passed, lint OK"
  python scripts/gen_status.py --mvp-e2e MVP-1 "PASS"
"""

from __future__ import annotations

import argparse
import datetime as _dt
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STATUS = ROOT / "IMPLEMENTATION_STATUS.md"
STATE = ROOT / ".status-state.json"

TASKS: dict[str, list[tuple[str, str]]] = {
    "A": [
        (f"A{i:03d}", t)
        for i, t in enumerate(
            [
                "创建项目根目录",
                "创建 src/",
                "创建 tests/",
                "创建 skills/",
                "创建 workflows/",
                "创建 adapters/",
                "创建 templates/",
                "创建 examples/",
                "创建 docs/",
                "创建 Python 项目配置",
                "创建 lint 配置",
                "创建 formatter 配置",
                "创建 test runner",
                "创建 CI 基础配置",
                "创建 README",
                "定义版本号",
                "建立基础 logging",
                "建立错误类型",
                "建立配置加载模块",
                "为基础模块写 smoke test",
            ],
            start=1,
        )
    ],
    "B": [
        (f"B{i:03d}", t)
        for i, t in enumerate(
            [
                "定义 ProjectConfig",
                "定义 ArtifactType",
                "定义 ResearchParadigm",
                "定义 Language",
                "定义 ThesisLevel",
                "定义 StartMode",
                "定义 Stage",
                "定义 Task",
                "定义 TaskStatus",
                "定义 Evidence",
                "定义 SkillMetadata",
                "定义 MCPMetadata",
                "定义 ArtifactMetadata",
                "定义 ValidationResult",
                "定义 WorkflowDefinition",
                "为所有模型增加序列化",
                "为所有模型增加反序列化",
                "增加字段验证",
                "增加 schema version",
                "编写模型单元测试",
            ],
            start=1,
        )
    ],
    "C": [
        (f"C{i:03d}", t)
        for i, t in enumerate(
            [
                "定义 Workspace 标准目录常量",
                "实现 workspace.exists()",
                "实现 workspace.create()",
                "实现目录幂等创建",
                "实现 .metis/ 创建",
                "实现 project.yaml 写入",
                "实现 state.yaml 写入",
                "实现 workflow.yaml 写入",
                "实现 task-state.json 写入",
                "实现 evidence.jsonl 追加",
                "实现 workspace 扫描",
                "实现已有文档扫描",
                "实现已有数据扫描",
                "实现已有模板扫描",
                "实现已有草稿扫描",
                "实现已有 topic 扫描",
                "实现 workspace summary",
                "增加文件冲突处理",
                "增加安全写入",
                "编写 Workspace 测试",
            ],
            start=1,
        )
    ],
    "D": [
        (f"D{i:03d}", t)
        for i, t in enumerate(
            [
                "实现 current_stage",
                "实现 current_task",
                "实现 stage history",
                "实现 task history",
                "实现 stage transition",
                "实现非法 transition 拒绝",
                "实现 task 状态更新",
                "实现 blocked 状态",
                "实现 failed 状态",
                "实现 retry 计数",
                "实现 resume",
                "实现 checkpoint",
                "实现 crash recovery",
                "实现状态备份",
                "编写状态机测试",
            ],
            start=1,
        )
    ],
    "E": [
        (f"E{i:03d}", t)
        for i, t in enumerate(
            [
                "定义 Command Handler 接口",
                "注册 /metis",
                "检测 Workspace",
                "存在项目时恢复",
                "不存在项目时初始化",
                "调用配置向导",
                "保存配置",
                "调用 Workflow Composer",
                "设置 S0",
                "返回初始化摘要",
                "编写 /metis 新项目测试",
                "编写 /metis 恢复项目测试",
            ],
            start=1,
        )
    ],
    "F": [
        (f"F{i:03d}", t)
        for i, t in enumerate(
            [
                "实现成果类型选择",
                "实现研究范式选择",
                "实现基金补充字段",
                "实现期刊补充字段",
                "实现毕业论文补充字段",
                "实现模板来源选择",
                "实现语言选择",
                "实现当前状态选择",
                "实现已有材料自动检测",
                "实现配置确认页",
                "实现配置修改",
                "实现配置保存",
                "实现文本 UI",
                "抽象 GUI UI 接口",
                "编写配置组合测试",
            ],
            start=1,
        )
    ],
    "G": [
        (f"G{i:03d}", t)
        for i, t in enumerate(
            [
                "创建 common.yaml",
                "创建 qualitative.yaml",
                "创建 quantitative.yaml",
                "创建 theoretical.yaml",
                "创建 fund.yaml",
                "创建 journal.yaml",
                "创建 thesis.yaml",
                "创建 bachelor.yaml",
                "创建 master.yaml",
                "创建 phd.yaml",
                "创建 zh-CN.yaml",
                "创建 en-US.yaml",
                "实现 workflow merge",
                "实现 stage 去重",
                "实现 task rule merge",
                "实现 conflict detection",
                "实现 dependency resolution",
                "生成 workflow.yaml",
                "编写所有组合矩阵测试",
                "确认不存在 15 套复制流程",
            ],
            start=1,
        )
    ],
    "H": [
        (f"H{i:03d}", t)
        for i, t in enumerate(
            [
                "定义 Skill 接口",
                "定义 Skill metadata",
                "实现 Registry loader",
                "实现 trigger evaluator",
                "支持 stage trigger",
                "支持 paradigm trigger",
                "支持 artifact trigger",
                "支持 task trigger",
                "实现 active skill set",
                "实现 skill load",
                "实现 skill unload",
                "实现 persistent skills",
                "实现 context budget",
                "防止重复加载",
                "记录 Skill 使用证据",
                "编写 Router 测试",
            ],
            start=1,
        )
    ],
    "I": [
        (f"I{i:03d}", t)
        for i, t in enumerate(
            [
                "定义 MCP Registry",
                "实现 server 注册",
                "实现 tool metadata 读取",
                "实现 stage-based tool exposure",
                "实现 task-based tool exposure",
                "实现 permission rules",
                "实现 tool deny",
                "实现 tool unavailable fallback",
                "实现 MCP 健康检查",
                "实现失败重试",
                "记录工具调用证据",
                "编写 MCP Router 测试",
            ],
            start=1,
        )
    ],
    "J": [
        (f"J{i:03d}", t)
        for i, t in enumerate(
            [
                "定义 LiteratureRecord",
                "实现搜索 Query 对象",
                "实现数据源抽象",
                "创建 NCPSSD source adapter 接口",
                "创建 ChinaXiv source adapter 接口",
                "创建 SinoXiv source adapter 接口",
                "创建 Paper.edu source adapter 接口",
                "创建 arXiv source adapter",
                "创建 Google Scholar adapter 接口",
                "实现通用 Web fallback",
                "实现 DOI 提取",
                "实现标题去重",
                "实现 DOI 去重",
                "实现作者规范化",
                "实现年份规范化",
                "实现摘要存储",
                "实现 URL 存储",
                "实现 GB/T 7714 formatter",
                "实现 APA formatter",
                "实现 BibTeX 输出",
                "写 literature_index.md",
                "写 search log",
                "增加 verified 字段",
                "禁止未验证引用进入最终参考文献",
                "编写文献去重测试",
                "编写格式化测试",
            ],
            start=1,
        )
    ],
    "K": [
        (f"K{i:03d}", t)
        for i, t in enumerate(
            [
                "定义 TopicCandidate",
                "从文献生成候选研究缺口",
                "从网页信息生成外部背景",
                "合并 Workspace 信息",
                "生成候选题目",
                "生成研究问题",
                "生成研究价值",
                "生成理论基础",
                "生成方法建议",
                "生成数据建议",
                "生成初步框架",
                "写参考文献",
                "写参考网页",
                "写研究风险",
                "保存单独 topic_xxx.md",
                "实现 topic.confirm",
                "实现 topic.edit",
                "实现 topic.delete",
                "确认后生成 selected_topic.md",
                "锁定选题 ID",
                "编写选题 Action 测试",
            ],
            start=1,
        )
    ],
    "L": [
        (f"L{i:03d}", t)
        for i, t in enumerate(
            [
                "解析 selected_topic",
                "生成 research questions",
                "生成研究目标",
                "生成理论框架",
                "生成研究方法",
                "生成论文大纲",
                "按大纲生成任务",
                "为每个任务设置 dependency",
                "为每个任务设置 expected output",
                "为每个任务设置 validation",
                "写 tasks.md",
                "写 task-state.json",
                "检查循环依赖",
                "检查孤立任务",
                "检查无验证任务",
                "编写 Research Design 测试",
            ],
            start=1,
        )
    ],
    "M": [
        (f"M{i:03d}", t)
        for i, t in enumerate(
            [
                "扫描已有数据",
                "识别文件格式",
                "计算文件 hash",
                "生成数据清单",
                "生成数据来源记录",
                "生成数据字典",
                "支持用户提供 URL",
                "支持公开数据搜索",
                "支持 metis-data 接口预留",
                "实现下载日志",
                "实现 raw 数据只读策略",
                "实现 interim 层",
                "实现 processed 层",
                "实现缺失数据提示",
                "编写 Data Manager 测试",
            ],
            start=1,
        )
    ],
    "N": [
        (f"N{i:03d}", t)
        for i, t in enumerate(
            [
                "定义 qualitative study metadata",
                "定义 source material schema",
                "定义 codebook schema",
                "定义 coding record schema",
                "实现材料导入",
                "实现材料清洗",
                "实现材料编号",
                "实现初始编码生成接口",
                "实现人工修改接口",
                "实现编码汇总",
                "实现主题生成",
                "实现范畴生成",
                "实现负例记录",
                "实现饱和度记录",
                "实现证据链",
                "输出 themes.md",
                "输出 evidence_chain.md",
                "编写定性流程集成测试",
            ],
            start=1,
        )
    ],
    "O": [
        (f"O{i:03d}", t)
        for i, t in enumerate(
            [
                "定义 variable dictionary",
                "定义 model specification",
                "定义 analysis result",
                "检查 missing",
                "检查 duplicates",
                "检查 type",
                "检查 outliers",
                "生成 descriptive statistics",
                "生成 correlation",
                "生成 multicollinearity check",
                "实现 baseline model abstraction",
                "实现 diagnostic interface",
                "实现 robustness interface",
                "实现 endogeneity interface",
                "实现 heterogeneity interface",
                "实现 mechanism interface",
                "实现 extension analysis interface",
                "生成 tables",
                "生成 figures",
                "保存 machine-readable results",
                "保存 human-readable results",
                "记录所有参数",
                "记录 random seed",
                "编写 synthetic data 测试",
                "编写 end-to-end quant 测试",
            ],
            start=1,
        )
    ],
    "P": [
        (f"P{i:03d}", t)
        for i, t in enumerate(
            [
                "定义 Concept",
                "定义 Claim",
                "定义 Evidence",
                "定义 CounterArgument",
                "定义 ArgumentEdge",
                "生成 concept map",
                "生成 literature genealogy",
                "生成 core claims",
                "生成 argument map",
                "生成 counter arguments",
                "生成 evidence map",
                "检测概念重复",
                "检测概念偷换",
                "检测循环论证",
                "检测无证据命题",
                "检测结论超出前提",
                "编写理论链测试",
            ],
            start=1,
        )
    ],
    "Q": [
        (f"Q{i:03d}", t)
        for i, t in enumerate(
            [
                "读取 ready task",
                "检查 dependency",
                "加载 Skill",
                "暴露 MCP",
                "执行任务",
                "收集输出",
                "调用 Validator",
                "passed 时写 evidence",
                "failed 时记录错误",
                "实现 retry",
                "实现 max retry",
                "实现 blocked",
                "实现人工介入点",
                "更新 task-state",
                "选择下一任务",
                "阶段完成后调用 Stage Validator",
                "编写 Executor 测试",
            ],
            start=1,
        )
    ],
    "R": [
        (f"R{i:03d}", t)
        for i, t in enumerate(
            [
                "定义 validation rule",
                "文件存在检查",
                "非空检查",
                "schema 检查",
                "引文可验证检查",
                "数据来源检查",
                "结果复现检查",
                "图表来源检查",
                "任务完成检查",
                "章节一致性检查",
                "变量一致性检查",
                "引用一致性检查",
                "理论命题一致性检查",
                "失败报告",
                "validation-report.md",
                "编写 Validation 测试",
            ],
            start=1,
        )
    ],
    "S": [
        (f"S{i:03d}", t)
        for i, t in enumerate(
            [
                "创建 run_all.py 模板",
                "建立 pipeline stage",
                "raw → interim",
                "interim → processed",
                "processed → analysis",
                "analysis → tables",
                "analysis → figures",
                "写依赖版本",
                "固定 seed",
                "写输入 hash",
                "写输出 hash",
                "新环境执行测试",
                "比较输出一致性",
                "生成 reproducibility report",
            ],
            start=1,
        )
    ],
    "T": [
        (f"T{i:03d}", t)
        for i, t in enumerate(
            [
                "模板导入",
                "模板栏目解析",
                "字数限制解析",
                "生成字段 schema",
                "研究背景",
                "文献现状",
                "问题提出",
                "研究目标",
                "研究内容",
                "重点难点",
                "总体框架",
                "研究方法",
                "技术路线",
                "创新点",
                "研究计划",
                "预期成果",
                "研究基础",
                "可行性",
                "模拟评审",
                "生成修改清单",
                "重写",
                "格式检查",
                "输出申请书",
            ],
            start=1,
        )
    ],
    "U": [
        (f"U{i:03d}", t)
        for i, t in enumerate(
            [
                "目标期刊配置",
                "作者指南输入",
                "结构规则解析",
                "字数规则解析",
                "摘要规则解析",
                "引用规则解析",
                "图表规则解析",
                "匿名化规则解析",
                "生成 manuscript structure",
                "生成标题",
                "生成摘要",
                "生成关键词",
                "生成正文",
                "插入真实表格",
                "插入真实图",
                "插入真实引用",
                "语言检查",
                "体例检查",
                "匿名化",
                "输出投稿稿",
            ],
            start=1,
        )
    ],
    "V": [
        (f"V{i:03d}", t)
        for i, t in enumerate(
            [
                "解析论文模板",
                "生成目录规则",
                "生成封面字段",
                "生成摘要规则",
                "生成关键词规则",
                "生成章节规则",
                "生成图表编号规则",
                "生成参考文献规则",
                "生成正文",
                "生成章节交叉引用",
                "检查章节逻辑",
                "检查理论主线",
                "检查研究问题覆盖",
                "检查创新点证据",
                "生成答辩 PPT 输入",
                "生成答辩问题",
                "输出学位论文",
            ],
            start=1,
        )
    ],
    "W": [
        (f"W{i:03d}", t)
        for i, t in enumerate(
            [
                "实现默认 Word 模板",
                "支持自然语言排版参数",
                "支持上传 DOCX",
                "解包 DOCX",
                "读取 OOXML",
                "提取页面设置",
                "提取字体",
                "提取字号",
                "提取段落",
                "提取行距",
                "提取标题样式",
                "提取编号",
                "提取图表标题",
                "提取页眉页脚",
                "生成 template-spec.yaml",
                "应用 template-spec",
                "保存自定义模板",
                "生成 docx",
                "重新读取生成 docx 验证",
                "编写 Word 集成测试",
            ],
            start=1,
        )
    ],
    "X": [
        (f"X{i:03d}", t)
        for i, t in enumerate(
            [
                "定义 PPT Skill 接口",
                "生成 PPT 内容结构",
                "生成每页目标",
                "提供真实图表文件",
                "提供研究结论",
                "提供风格配置",
                "调用外部 PPT Skill",
                "检查 PPT 文件存在",
                "检查页数",
                "检查章节覆盖",
            ],
            start=1,
        )
    ],
    "Y": [
        (f"Y{i:03d}", t)
        for i, t in enumerate(
            [
                "检查未完成 task",
                "检查 failed task",
                "检查 blocked task",
                "检查不存在引用",
                "检查重复引用",
                "检查引用格式",
                "检查正文引文与参考文献",
                "检查变量名",
                "检查数据源",
                "检查结果一致性",
                "检查图表结果一致性",
                "检查章节结论一致性",
                "检查因果语言",
                "检查理论概念",
                "检查研究问题覆盖",
                "检查模板规范",
                "生成 global QA report",
                "阻止严重错误项目交付",
            ],
            start=1,
        )
    ],
    "Z": [
        (f"Z{i:03d}", t)
        for i, t in enumerate(
            [
                "创建 deliverables",
                "拷贝 manuscript",
                "拷贝 slides",
                "拷贝 references",
                "打包 data",
                "打包 code",
                "拷贝 figures",
                "拷贝 tables",
                "生成 reproducibility report",
                "生成 validation report",
                "生成 delivery-note.md",
                "检查所有路径",
                "输出最终交付摘要",
            ],
            start=1,
        )
    ],
}

PHASE_TITLES = {
    "A": "Phase A：仓库基础",
    "B": "Phase B：数据模型",
    "C": "Phase C：Workspace Manager",
    "D": "Phase D：State Manager",
    "E": "Phase E：/metis Command",
    "F": "Phase F：项目配置向导",
    "G": "Phase G：Workflow Composer",
    "H": "Phase H：Skill Router",
    "I": "Phase I：MCP Router",
    "J": "Phase J：文献检索",
    "K": "Phase K：选题模块",
    "L": "Phase L：Research Design",
    "M": "Phase M：Data Manager",
    "N": "Phase N：Qualitative Engine",
    "O": "Phase O：Quantitative Engine",
    "P": "Phase P：Theoretical Engine",
    "Q": "Phase Q：Task Executor",
    "R": "Phase R：Validation Engine",
    "S": "Phase S：Reproducibility",
    "T": "Phase T：Fund Generator",
    "U": "Phase U：Journal Generator",
    "V": "Phase V：Thesis Generator",
    "W": "Phase W：Word Engine",
    "X": "Phase X：PPT Integration",
    "Y": "Phase Y：Global QA",
    "Z": "Phase Z：Delivery",
}


def _load_state() -> dict:
    if STATE.exists():
        return json.loads(STATE.read_text(encoding="utf-8"))
    return {"tasks": {}, "phase_regression": {}, "mvp_e2e": {}, "log": []}


def _save_state(st: dict) -> None:
    STATE.write_text(json.dumps(st, ensure_ascii=False, indent=1), encoding="utf-8")


def _mark(st: dict, ids: list[str], status: str, note: str) -> None:
    for tid in ids:
        phase = tid[0]
        if not any(t == tid for t, _ in TASKS.get(phase, [])):
            raise SystemExit(f"未知任务 {tid}")
        st["tasks"][tid] = {
            "status": status,
            "note": note,
            "at": _dt.datetime.now().isoformat(timespec="seconds"),
        }
    st["log"].append(
        {
            "at": _dt.datetime.now().isoformat(timespec="seconds"),
            "action": "mark",
            "ids": ids,
            "status": status,
            "note": note,
        }
    )


def render(st: dict) -> str:
    lines = [
        "# METIS ACADEMIC 实现状态表",
        "",
        "> 由 `scripts/gen_status.py` 维护。规则：每完成一个最小任务必须验证后才能标记 DONE；",
        "> 每个 Phase 结束执行阶段回归；每个 MVP 结束执行完整 E2E。所有证据见 `.status-state.json` 与 `docs/execution_log.md`。",
        "",
        f"- 生成时间：{_dt.datetime.now().isoformat(timespec='seconds')}",
        "",
        "## 阶段进度总览",
        "",
        "| Phase | 任务 | DONE | 进度 | 回归 |",
        "|---|---|---|---|---|",
    ]
    total = done = 0
    for ph, items in TASKS.items():
        d = sum(1 for t, _ in items if st["tasks"].get(t, {}).get("status") == "DONE")
        total += len(items)
        done += d
        reg = st["phase_regression"].get(ph, "")
        lines.append(
            f"| {PHASE_TITLES[ph]} | {len(items)} | {d} | "
            f"{'✅' if d == len(items) else str(round(d / len(items) * 100)) + '%'} | {reg} |"
        )
    lines += ["", f"**总计：{done}/{total}**", ""]
    audits = st.get("audit_rounds", {})
    lines += ["## 全量清单审计轮次（要求 ≥10 轮，对清单逐项核查→补缺→复测）", ""]
    if audits:
        for n in sorted(audits, key=lambda x: int(x)):
            e = audits[n]
            lines.append(f"- 第 {n} 轮：{e['result']}（{e['at']}）")
    else:
        lines.append("- 暂未开始；全部任务完成后开始逐轮审计")
    if len(audits) < 10:
        lines.append(f"- **进度：{len(audits)}/10**")
    lines += ["", "## MVP 验收", ""]
    mvp = st.get("mvp_e2e", {})
    lines += [
        "| MVP | 范围 | E2E |",
        "|---|---|---|",
        "| MVP-1 | /metis + Workspace + 配置 + Composer + State | " + mvp.get("MVP-1", "") + " |",
        "| MVP-2 | 文献检索 + 选题 + topic actions | " + mvp.get("MVP-2", "") + " |",
        "| MVP-3 | Research Design + Executor + Validator | " + mvp.get("MVP-3", "") + " |",
        "| MVP-4 | 定量/定性/理论 Engine | " + mvp.get("MVP-4", "") + " |",
        "| MVP-5 | Word + PPT 接口 + Delivery | " + mvp.get("MVP-5", "") + " |",
        "| MVP-6 | Harness Adapter + Skill/MCP 路由 | " + mvp.get("MVP-6", "") + " |",
        "| MVP-7 | 模板解析 + 期刊/基金/学位适配 | " + mvp.get("MVP-7", "") + " |",
        "",
    ]
    for ph, items in TASKS.items():
        lines += [f"## {PHASE_TITLES[ph]}", ""]
        for tid, title in items:
            rec = st["tasks"].get(tid, {})
            s = rec.get("status", "TODO")
            mark = "x" if s == "DONE" else " "
            note = f" — {rec['note']}" if rec.get("note") else ""
            lines.append(f"- [{mark}] {tid} {title} `{s}`{note}")
        lines.append("")
    lines += ["## 操作日志（最近 50 条）", ""]
    for e in st["log"][-50:]:
        lines.append(
            f"- `{e['at']}` {e['action']} {e.get('ids', e.get('phase', ''))} → {e.get('status', '')} {e.get('note', '')}"
        )
    return "\n".join(lines) + "\n"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--mark")
    ap.add_argument("--status", default="DONE")
    ap.add_argument("--note", default="")
    ap.add_argument("--phase-regression", nargs=2, metavar=("PHASE", "RESULT"))
    ap.add_argument("--mvp-e2e", nargs=2, metavar=("MVP", "RESULT"))
    ap.add_argument(
        "--audit-round",
        nargs=2,
        metavar=("N", "RESULT"),
        help="记录第 N 轮全量清单审计结果（PASS/发现并修复 X 项）",
    )
    args = ap.parse_args()
    st = _load_state()
    if args.mark:
        _mark(st, [x.strip() for x in args.mark.split(",") if x.strip()], args.status, args.note)
    if args.phase_regression:
        ph, res = args.phase_regression
        st["phase_regression"][ph] = res
        st["log"].append(
            {
                "at": _dt.datetime.now().isoformat(timespec="seconds"),
                "action": "phase_regression",
                "phase": ph,
                "status": res,
            }
        )
    if args.mvp_e2e:
        m, res = args.mvp_e2e
        st["mvp_e2e"][m] = res
        st["log"].append(
            {
                "at": _dt.datetime.now().isoformat(timespec="seconds"),
                "action": "mvp_e2e",
                "mvp": m,
                "status": res,
            }
        )
    if args.audit_round:
        n, res = args.audit_round
        st.setdefault("audit_rounds", {})[n] = {
            "result": res,
            "at": _dt.datetime.now().isoformat(timespec="seconds"),
        }
        st["log"].append(
            {
                "at": _dt.datetime.now().isoformat(timespec="seconds"),
                "action": "audit_round",
                "round": n,
                "status": res,
            }
        )
    _save_state(st)
    STATUS.write_text(render(st), encoding="utf-8")
    total = sum(len(v) for v in TASKS.values())
    d = sum(1 for rec in st["tasks"].values() if rec.get("status") == "DONE")
    audits = st.get("audit_rounds", {})
    print(f"IMPLEMENTATION_STATUS.md 已更新：{d}/{total} DONE；审计轮次 {len(audits)}/10+")
    if len(audits) < 10:
        print("提示：全量清单审计须至少 10 轮，当前", len(audits))


if __name__ == "__main__":
    main()

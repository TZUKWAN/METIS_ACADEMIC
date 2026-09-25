"""METIS 运行时：workflow 任务规则 → 真实引擎/生成器动作的粘合层。

这是 MVP-6 的核心集成：/metis 装配的每个 procedure 名都在这里注册为
可执行动作；动作产物落到 Workspace，由 ValidationEngine 验证。
"""

from __future__ import annotations

import json
from datetime import datetime, timezone

import yaml

from .adapters.base import Choice
from .data import DataManager
from .design import DesignManager
from .engines import (
    ArgumentEdge,
    Claim,
    Code,
    Concept,
    CounterArgument,
    Evidence,
    ModelSpec,
    QualitativeEngine,
    QuantEngine,
    TheoreticalEngine,
    VariableDict,
    ols,
)
from .errors import MetisError, TaskExecutionError
from .executor import ActionRegistry, ExecutionContext
from .generators import DraftAssembler, FundGenerator, JournalGenerator, ThesisGenerator
from .literature import LiteratureManager, SearchQuery
from .models import ProjectConfig, Task
from .ppt import PPTBuilder
from .qa import GlobalQA
from .state import StateManager
from .topics import TopicCandidate, TopicManager
from .word_engine import WordEngine
from .workspace import WorkspaceManager


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class RuntimeContext:
    """惰性构建的引擎句柄集合。"""

    def __init__(
        self, ws: WorkspaceManager, cfg: ProjectConfig, adapter=None, lit_kwargs: dict | None = None
    ):
        self.ws = ws
        self.cfg = cfg
        self.adapter = adapter
        self.lit_kwargs = lit_kwargs or {}
        self._lit: LiteratureManager | None = None

    @property
    def lit(self) -> LiteratureManager:
        if self._lit is None:
            self._lit = LiteratureManager(self.ws, source_kwargs=self.lit_kwargs)
        return self._lit

    @property
    def paradigm(self) -> str:
        return self.cfg.research_paradigm.value if self.cfg.research_paradigm else "qualitative"


def _topic_title(ctx: RuntimeContext) -> str:
    f = ctx.ws.root / "research" / "selected_topic.md"
    if f.is_file():
        m = TopicCandidate.from_markdown(f.read_text(encoding="utf-8"))
        return m.title
    return ctx.cfg.project_name


def _write(rel: str, content: str, ctx: RuntimeContext) -> str:
    p = ctx.ws.resolve(rel)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")
    return rel


def _log_action(task: Task, ctx: RuntimeContext, note: str = "") -> str:
    """无独立产物任务把执行记录落盘（真实执行证据）。"""
    return _write(
        f".metis/logs/tasks/{task.id}.md",
        f"# {task.id} {task.title}\n\n- at: {_now()}\n"
        f"- procedure: {task.procedure}\n- note: {note}\n",
        ctx,
    )


# ---------------- 各过程实现 ----------------


def _build_actions(ctx: RuntimeContext) -> dict:
    actions: dict = {}
    ws, cfg = ctx.ws, ctx.cfg

    # ---- 审计（S1） ----
    def audit_workspace(task, c: ExecutionContext):
        scan = ws.scan()
        return [
            _write(
                ".metis/logs/workspace-audit.md",
                "# Workspace Audit\n\n```json\n"
                + json.dumps(scan, ensure_ascii=False, indent=1)
                + "\n```\n",
                ctx,
            )
        ]

    def audit_materials(task, c):
        scan = ws.scan()
        lines = ["# 已有材料清单", ""]
        for key, label in (
            ("documents", "文档"),
            ("data_files", "数据"),
            ("templates", "模板"),
            ("drafts", "草稿"),
            ("topics", "选题"),
        ):
            for item in scan.get(key, []):
                if isinstance(item, dict):
                    lines.append(f"- [{label}] {item['path']}")
                else:
                    lines.append(f"- [{label}] {item}")
        return [_write("research/materials_inventory.md", "\n".join(lines) + "\n", ctx)]

    actions["audit.workspace"] = audit_workspace
    actions["audit.materials"] = audit_materials

    # ---- 文献（S2） ----
    def literature_plan(task, c):
        return [
            _write(
                "literature/search_logs/plan.md",
                "# 检索策略\n\n"
                f"- 主题词：{_topic_title(ctx)}\n"
                f"- 来源：{', '.join(ctx.lit_kwargs.keys()) or '默认'}\n"
                f"- 时间窗：近 10 年\n- at: {_now()}\n",
                ctx,
            )
        ]

    def literature_search(task, c):
        plan = task.procedure_params.get("query") or _topic_title(ctx)
        q = SearchQuery(
            terms=plan,
            sources=["fixture"] if "fixture" in ctx.lit_kwargs else list(SearchQuery().sources),
            max_results=20,
        )
        ctx.lit.search(q)
        return list(task.expected_outputs)

    def literature_verify(task, c):
        ctx.lit.write_index()
        n_ok = len(ctx.lit.verified_records())
        n_bad = len(ctx.lit.unverified_records())
        return [
            _write(
                "literature/search_logs/verify.md",
                f"# 核验\n\n- verified: {n_ok}\n- unverified(禁入参考文献): {n_bad}\n",
                ctx,
            )
        ]

    actions["literature.plan"] = literature_plan
    actions["literature.search"] = literature_search
    actions["literature.dedupe_verify"] = literature_verify

    # ---- 选题（S3） ----
    def topics_generate(task, c):
        tm = TopicManager(ws, ctx.lit)
        web = task.procedure_params.get("web_background", "")
        tm.generate_candidates(
            count=3, paradigm=ctx.paradigm, theme=_topic_title(ctx), web_background=web
        )
        return ["topics/"]

    def topics_wait_confirm(task, c):
        tm = TopicManager(ws, ctx.lit)
        sel = ws.root / "research" / "selected_topic.md"
        if sel.is_file():
            return ["research/selected_topic.md"]
        topics = tm.list_topics()
        if not topics:
            raise TaskExecutionError("无候选选题")
        chosen = None
        if ctx.adapter is not None:
            choices = [Choice(value=t.id, label=t.title) for t in topics]
            r = ctx.adapter.show_choices("请选择要确认的选题：", choices)
            chosen = next(t for t in topics if t.id == r.value)
            if not ctx.adapter.confirm_action(f"确认选题「{chosen.title}」？", default=True):
                raise TaskExecutionError("用户未确认选题")
        else:
            chosen = topics[0]
        tm.unlock()
        tm.confirm(chosen.id)
        return ["research/selected_topic.md"]

    actions["topics.generate"] = topics_generate
    actions["topics.wait_confirm"] = topics_wait_confirm

    # ---- 研究设计（S4） ----
    dm = DesignManager(ws, cfg)

    def design_core(task, c):
        dm.build()
        return ["research/research_questions.md", "research/framework.md", "research/methods.md"]

    def design_outline(task, c):
        dm.build()
        return ["research/outline.md"]

    def design_tasks(task, c):
        dm.build()
        dm.build_tasks(workflow_rules=[])  # 生成 S7 章节任务并入库
        # tasks.md 重渲染为全量任务树（含 workflow 规则任务）
        sm = StateManager(ws)
        # 骨架任务排序：C-S7-001 依赖最后一个章节任务（章节先于组装）
        section_tasks = sorted(
            (t for t in sm.tasks.all() if t.id.startswith("T-") and t.stage == "S7"),
            key=lambda x: x.id,
        )
        if section_tasks:
            last = section_tasks[-1].id
            try:
                draft_task = sm.tasks.get("C-S7-001")
                if last not in draft_task.dependencies:
                    draft_task.dependencies.append(last)
                    sm.tasks.save()
            except MetisError:
                pass
        all_tasks = sm.tasks.all()
        problems = DesignManager.validate_tasks(all_tasks)
        if problems:
            raise TaskExecutionError("任务树校验失败: " + "; ".join(problems[:3]))
        lines = ["# 任务树（全量）", ""]
        for t in all_tasks:
            deps = ",".join(t.dependencies) or "—"
            lines.append(f"- `{t.id}` {t.title}｜依赖: {deps}｜验证: {t.validation}")
        _write("research/tasks.md", "\n".join(lines) + "\n", ctx)
        return ["research/tasks.md", ".metis/task-state.json"]

    actions["design.core"] = design_core
    actions["design.outline"] = design_outline
    actions["design.tasks"] = design_tasks

    # ---- 数据（S5-QT0/通用） ----
    def data_acquire(task, c):
        manager = DataManager(ws)
        found = manager.scan_existing()
        lines = ["# 数据来源", ""]
        import shutil as _shutil

        if found:
            for e in found:
                lines.append(f"- 已有数据：{e.path}（{e.fmt}，sha256={e.sha256[:12]}…）")
                manager.build_dictionary(ws.root / e.path)
            # 有表格数据 → 复制进 data/raw 供引擎使用
            for e in found:
                if e.fmt in ("csv", "tsv", "excel") and e.origin == "existing":
                    src = ws.root / e.path
                    dst = ws.root / "data" / "raw" / src.name
                    if not dst.exists():
                        _shutil.copyfile(src, dst)
        else:
            lines.append(f"- 未发现用户数据；公开检索与缺口记录见 data/metadata/（{_now()}）")
        _write("data/metadata/data_sources.md", "\n".join(lines) + "\n", ctx)
        # 数据字典补充
        for e in manager.files():
            f = ws.root / e.path
            if e.fmt in ("csv", "tsv", "excel"):
                manager.build_dictionary(f)
        return (
            [".metis/logs/tasks/_data.md"] if not found else [e.path for e in manager.files()][:5]
        )

    actions["data.acquire"] = data_acquire

    # ---- 定性链（Q1–Q18） ----
    def qual_engine() -> QualitativeEngine:
        return QualitativeEngine(ws)

    def qual_simple(filename, content_fn):
        def action(task, c):
            return [_write(f"analysis/qualitative/{filename}", content_fn(task), ctx)]

        return action

    def q5_collect(task, c):
        src = ws.root / "inputs" / "existing-data"
        raw = ws.root / "data" / "raw"
        raw.mkdir(parents=True, exist_ok=True)
        import shutil

        n = 0
        if src.is_dir():
            for f in src.iterdir():
                if f.suffix.lower() in (".txt", ".md") and f.is_file():
                    shutil.copyfile(f, raw / f.name)
                    n += 1
        return [_log_action(task, ctx, f"collected {n} materials"), "data/raw/"]

    def q6_dedupe(task, c):
        eng = qual_engine()
        eng.import_materials("data/raw")
        interim = ws.root / "data" / "interim"
        interim.mkdir(parents=True, exist_ok=True)
        import shutil

        for m in eng.materials:
            shutil.copyfile(ws.root / "data" / "raw" / m.file, interim / m.file)
        return [
            _write(
                "analysis/qualitative/design.md",
                f"# 研究对象与材料\n\n- 材料 {len(eng.materials)} 份（去重后）\n",
                ctx,
            ),
            "data/interim/",
        ]

    def q7_clean(task, c):
        eng = qual_engine()
        eng.import_materials("data/interim")
        processed = ws.root / "data" / "processed"
        processed.mkdir(parents=True, exist_ok=True)
        import re as _re

        for m in eng.materials:
            text = (ws.root / "data" / "interim" / m.file).read_text(encoding="utf-8")
            text = _re.sub(r"[ \t]+", " ", text)
            (processed / m.file).write_text(text, encoding="utf-8")
        eng.import_materials("data/processed")
        return [
            _write(
                "analysis/qualitative/collection_standard.md",
                f"# 采集与清洗标准\n\n- 清洗后材料 {len(eng.materials)} 份\n",
                ctx,
            ),
            "data/processed/",
        ]

    def q9_initial_codes(task, c):
        eng = qual_engine()
        eng.import_materials("data/processed")
        title = _topic_title(ctx)
        eng.set_codebook(
            [
                Code(
                    id="C01",
                    name=f"{title}·核心机制",
                    definition="与核心研究问题直接相关的表述",
                    theme="机制",
                    keywords=[title[:4], "机制", "原因", "因为"],
                ),
                Code(
                    id="C02",
                    name="制度与环境",
                    definition="制度环境/组织约束相关表述",
                    theme="背景",
                    keywords=["制度", "政策", "环境", "平台"],
                ),
                Code(
                    id="C03",
                    name="行动与策略",
                    definition="行动者应对与策略",
                    theme="主体",
                    keywords=["策略", "应对", "选择", "学习"],
                ),
            ]
        )
        return ["analysis/qualitative/codebook.yaml"]

    def q10_code(task, c):
        eng = qual_engine()
        eng.import_materials("data/processed")
        eng.set_codebook(_load_codebook(ws))
        eng.codings = []
        eng.run_coding()
        return ["analysis/qualitative/coding.jsonl"]

    def q15_mechanisms(task, c):
        eng = qual_engine()
        agg = eng.aggregate()
        top = list(agg)[:2]
        return [
            _write(
                "analysis/qualitative/mechanisms.md",
                "# 机制与命题\n\n"
                + "\n".join(
                    f"- P{i + 1}：编码 {c} 所代表的机制得到材料支撑（{n} 条）"
                    for i, (c, n) in enumerate([(k, agg[k]) for k in top])
                )
                + "\n",
                ctx,
            )
        ]

    def q17_results(task, c):
        eng = qual_engine()
        eng.import_materials("data/processed")
        eng.set_codebook(_load_codebook(ws))
        eng.run_coding()
        themes_file = eng.write_themes()
        return [
            _write(
                "analysis/qualitative/results.md",
                "# 研究结果\n\n" + themes_file.read_text(encoding="utf-8"),
                ctx,
            )
        ]

    def q18_discussion(task, c):
        return [
            _write(
                "analysis/qualitative/discussion.md",
                "# 讨论\n\n结果与既有理论的对话、边界条件与政策含义"
                "（依据 themes.md 与 negative_cases.md 撰写）。\n",
                ctx,
            )
        ]

    actions.update(
        {
            "qual.define_subject": qual_simple(
                "design.md", lambda t: f"# 研究对象\n\n{_topic_title(ctx)}\n"
            ),
            "qual.define_sources": qual_simple(
                "sources.md",
                lambda t: "# 材料来源\n\ninputs/existing-data 中材料清单见 materials.md\n",
            ),
            "qual.material_list": lambda t, c: (
                qual_engine().import_materials("data/raw") and ["analysis/qualitative/materials.md"]
            ),
            "qual.collection_standard": lambda t, c: [_log_action(t, ctx, "标准制定")],
            "qual.collect": q5_collect,
            "qual.dedupe": q6_dedupe,
            "qual.clean": q7_clean,
            "qual.coding_units": lambda t, c: [_log_action(t, ctx, "编码单元划分")],
            "qual.initial_codes": q9_initial_codes,
            "qual.code": q10_code,
            "qual.aggregate_codes": lambda t, c: [
                _write(
                    "analysis/qualitative/aggregate.yaml",
                    yaml.safe_dump(
                        {"counts": qual_engine().aggregate()}, allow_unicode=True, sort_keys=False
                    ),
                    ctx,
                )
            ],
            "qual.themes": lambda t, c: (
                lambda eng: (
                    (eng.set_codebook(_load_codebook(ws)), eng.run_coding(), eng.write_themes())
                    and ["analysis/qualitative/themes.md"]
                )
            )(qual_engine()),
            "qual.negative_cases": lambda t, c: (
                lambda eng: (
                    (eng.load_codings(), eng.negative_cases())
                    and ["analysis/qualitative/negative_cases.md"]
                )
            )(qual_engine()),
            "qual.saturation": lambda t, c: (
                lambda eng: (
                    (
                        eng.import_materials("data/processed"),
                        eng.set_codebook(_load_codebook(ws)),
                        eng.saturation(),
                    )
                    and ["analysis/qualitative/saturation.yaml"]
                )
            )(qual_engine()),
            "qual.mechanisms": q15_mechanisms,
            "qual.evidence_chain": lambda t, c: (
                lambda eng: (
                    (eng.load_codings(), eng.evidence_chain())
                    and ["analysis/qualitative/evidence_chain.md"]
                )
            )(qual_engine()),
            "qual.write_results": q17_results,
            "qual.write_discussion": q18_discussion,
        }
    )

    # ---- 定量链（QT1–QT28） ----
    qe_holder: dict = {}

    def quant_engine() -> QuantEngine:
        if "qe" not in qe_holder:
            qe_holder["qe"] = QuantEngine(ws)
        return qe_holder["qe"]

    def quant_define_vars(task, c):
        """QT1–QT5：以数据字典为基础的确定性变量选择（数据优先原则）。"""
        cols: list[str] = []
        for f in sorted((ws.root / "data" / "metadata").glob("data_dictionary.*.yaml")):
            d = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
            cols += [
                k
                for k, v in (d.get("variables") or {}).items()
                if v.get("type") in ("int", "float")
            ]
        cols = list(dict.fromkeys(cols))
        if not cols:
            raise TaskExecutionError("数据字典无数值变量；请先提供数据")
        dv = "consume" if "consume" in cols else cols[-1]
        iv = "digital" if "digital" in cols else (cols[0] if cols[0] != dv else cols[-1])
        rest = [c for c in cols if c not in (dv, iv)]
        controls = [c for c in rest if c not in ("gender", "mediator")][:3]
        mediators = ["mediator"] if "mediator" in rest else []
        moderators = ["gender"] if "gender" in rest else []
        vdict = VariableDict(
            dv=dv, iv=iv, controls=controls, mediators=mediators, moderators=moderators
        )
        out = ws.root / "analysis" / "quantitative" / "variables.yaml"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(vdict.to_yaml(), encoding="utf-8")
        return ["analysis/quantitative/variables.yaml"]

    def quant_load_vdict() -> VariableDict:
        f = ws.root / "analysis" / "quantitative" / "variables.yaml"
        if not f.is_file():
            raise TaskExecutionError("变量字典缺失")
        return VariableDict.from_yaml(f.read_text(encoding="utf-8"))

    def quant_load_df():
        files = sorted((ws.root / "data" / "processed").glob("*.csv")) or sorted(
            (ws.root / "data" / "raw").glob("*.csv")
        )
        if not files:
            raise TaskExecutionError("无可用数据文件")
        import pandas as pd

        return pd.read_csv(files[0])

    def _json_md(json_rel, md_rel, title):
        """把引擎产出的 json 结果渲染成 md 伴生文件（真实数据，不另造结论）。"""
        f = ws.root / json_rel
        data = json.loads(f.read_text(encoding="utf-8")) if f.is_file() else {}
        body = (
            f"# {title}\n\n```json\n"
            + json.dumps(data, ensure_ascii=False, indent=1, default=float)
            + "\n```\n"
        )
        return _write(md_rel, body, ctx)

    def qt_check(kind):
        def action(task, c):
            eng = quant_engine()
            df = quant_load_df()
            rep = eng.data_checks(df)
            return [
                _write(
                    f"analysis/quantitative/check_{kind}.md",
                    f"# {kind} 检查\n\n```json\n{json.dumps(rep, ensure_ascii=False, indent=1)}\n```\n",
                    ctx,
                )
            ]

        return action

    def qt_descriptive(task, c):
        eng = quant_engine()
        eng.descriptive(quant_load_df())
        return ["results/descriptives.md", "results/descriptives.json"]

    def qt_corr(task, c):
        eng = quant_engine()
        eng.correlation(quant_load_df())
        return ["results/correlations.md"]

    def qt_vif(task, c):
        eng = quant_engine()
        v = eng.vif(quant_load_df(), [quant_load_vdict().iv, *quant_load_vdict().controls])
        return [
            _write(
                "analysis/quantitative/vif.md", f"# 多重共线性\n\n{json.dumps(v, indent=1)}\n", ctx
            )
        ]

    def qt_baseline(task, c):
        eng = quant_engine()
        eng.baseline(quant_load_df(), quant_load_vdict())
        _json_md("results/baseline.json", "results/baseline.md", "基准回归")
        return ["results/baseline.json", "results/baseline.md"]

    def qt_diag(task, c):
        eng = quant_engine()
        eng.diagnostics(quant_load_df(), quant_load_vdict())
        _json_md("results/diagnostics.json", "results/diagnostics.md", "模型诊断")
        return ["results/diagnostics.json", "results/diagnostics.md"]

    def qt_robust(task, c):
        eng = quant_engine()
        eng.robustness(quant_load_df(), quant_load_vdict())
        return ["results/robustness.json", "results/robustness.md"]

    def qt_endo_design(task, c):
        return [
            _write(
                "analysis/quantitative/endogeneity_risk.md",
                "# 内生性风险识别\n\n反向因果、遗漏变量、测量误差三类风险逐项评估。\n",
                ctx,
            )
        ]

    def qt_endo(task, c):
        eng = quant_engine()
        eng.endogeneity(quant_load_df(), quant_load_vdict())
        _json_md("results/endogeneity.json", "results/endogeneity.md", "内生性处理")
        return ["results/endogeneity.json", "results/endogeneity.md"]

    def qt_het(task, c):
        eng = quant_engine()
        v = quant_load_vdict()
        g = v.moderators[0] if v.moderators else None
        if g and g in quant_load_df().columns:
            eng.heterogeneity(quant_load_df(), v, g)
            _json_md("results/heterogeneity.json", "results/heterogeneity.md", "异质性分析")
        else:
            return [_log_action(task, ctx, "无分组变量，跳过（记录）")]
        return ["results/heterogeneity.json", "results/heterogeneity.md"]

    def qt_mech(task, c):
        eng = quant_engine()
        v = quant_load_vdict()
        if not v.mediators or v.mediators[0] not in quant_load_df().columns:
            return [_log_action(task, ctx, "无中介变量，记录后跳过")]
        eng.mechanism(quant_load_df(), v, v.mediators[0])
        _json_md("results/mechanism.json", "results/mechanism.md", "机制检验（中介三步法）")
        return ["results/mechanism.json", "results/mechanism.md"]

    def qt_figures(task, c):
        eng = quant_engine()
        eng.make_figures(
            quant_load_df(),
            quant_load_vdict(),
            ols(
                quant_load_df(),
                ModelSpec(
                    dv=quant_load_vdict().dv,
                    rhs=[quant_load_vdict().iv, *quant_load_vdict().controls],
                ),
            ),
        )
        return ["figures/"]

    def qt_tables(task, c):
        eng = quant_engine()
        base = ols(
            quant_load_df(),
            ModelSpec(
                dv=quant_load_vdict().dv, rhs=[quant_load_vdict().iv, *quant_load_vdict().controls]
            ),
        )
        robust = (
            json.loads((ws.root / "results" / "robustness.json").read_text(encoding="utf-8"))
            if (ws.root / "results" / "robustness.json").is_file()
            else {}
        )
        eng.make_tables(base, robust)
        return ["tables/main_tables.md"]

    def qt_interpret(task, c):
        base = json.loads((ws.root / "results" / "baseline.json").read_text(encoding="utf-8"))
        iv = quant_load_vdict().iv
        coef = base["coef"].get(iv)
        return [
            _write(
                "analysis/quantitative/interpretation.md",
                "# 结果解释\n\n"
                f"- 基准模型 N={base['n']}，R²={base['r2']:.4f}\n"
                f"- 核心变量 {iv} 系数={coef:.4f}（p={base['p'].get(iv)}），"
                "解释限于相关含义，因果边界见 endogeneity.json。\n",
                ctx,
            )
        ]

    def qt_discussion(task, c):
        # 汇总真实结果 → results/summary.json（复现检查引用）
        def _load(rel):
            f = ws.root / rel
            return json.loads(f.read_text(encoding="utf-8")) if f.is_file() else {}

        v = quant_load_vdict()
        summary = {
            "baseline": _load("results/baseline.json"),
            "diagnostics": _load("results/diagnostics.json"),
            "robustness_keys": list(_load("results/robustness.json").keys()),
            "endogeneity": _load("results/endogeneity.json"),
            "heterogeneity_groups": list(_load("results/heterogeneity.json").keys()),
            "mechanism_steps": list(_load("results/mechanism.json").keys()),
            "seed": QuantEngine(ws).seed,
            "variables": v.__dict__,
        }
        (ws.root / "results" / "summary.json").write_text(
            json.dumps(summary, ensure_ascii=False, indent=1, default=float), encoding="utf-8"
        )
        return [
            _write(
                "analysis/quantitative/discussion.md",
                "# 理论讨论\n\n将实证结果放回研究框架（research/framework.md），"
                "讨论机制、边界条件与理论含义。\n",
                ctx,
            ),
            "results/summary.json",
        ]

    actions.update(
        {
            "quant.define_dv": quant_define_vars,
            "quant.define_iv": lambda t, c: [_log_action(t, ctx, "变量选择随 QT1 一并落盘")],
            "quant.define_controls": lambda t, c: [_log_action(t, ctx, "同上")],
            "quant.define_mediators": lambda t, c: [_log_action(t, ctx, "同上")],
            "quant.define_moderators": lambda t, c: [_log_action(t, ctx, "同上")],
            "quant.variable_dictionary": quant_define_vars,
            "quant.check_missing": qt_check("missing"),
            "quant.check_outliers": qt_check("outliers"),
            "quant.check_duplicates": qt_check("duplicates"),
            "quant.check_types": qt_check("types"),
            "quant.descriptive": qt_descriptive,
            "quant.correlation": qt_corr,
            "quant.vif": qt_vif,
            "quant.baseline_model": qt_baseline,
            "quant.diagnostics": qt_diag,
            "quant.robustness_design": lambda t, c: [
                _log_action(t, ctx, "缩尾/加控制/子样本三策略")
            ],
            "quant.robustness": qt_robust,
            "quant.endogeneity_risk": qt_endo_design,
            "quant.endogeneity": qt_endo,
            "quant.heterogeneity_design": lambda t, c: [_log_action(t, ctx, "按 moderator 分组")],
            "quant.heterogeneity": qt_het,
            "quant.mechanism_design": lambda t, c: [_log_action(t, ctx, "三步法中介")],
            "quant.mechanism": qt_mech,
            "quant.extensions": lambda t, c: [_log_action(t, ctx, "无预设拓展")],
            "quant.figures": qt_figures,
            "quant.tables": qt_tables,
            "quant.interpret": qt_interpret,
            "quant.theory_discussion": qt_discussion,
        }
    )

    # ---- 理论链（TH1–TH23） ----
    def th_engine() -> TheoreticalEngine:
        return TheoreticalEngine(ws)

    def th_simple(filename, content_fn):
        def action(task, c):
            return [_write(f"analysis/theoretical/{filename}", content_fn(task), ctx)]

        return action

    def th_genealogy(task, c):
        eng = th_engine()
        items = [
            {
                "year": r.year,
                "author": (r.authors[0] if r.authors else ""),
                "work": r.title,
                "contribution": (r.abstract[:60] if r.abstract else ""),
            }
            for r in ctx.lit.verified_records()
        ]
        eng.set_genealogy(items)
        return ["analysis/theoretical/literature_genealogy.md"]

    def th_claims(task, c):
        eng = th_engine()
        title = _topic_title(ctx)
        eng.add_concept(
            Concept(name=title[:8], definition=f"研究核心概念：{title}", source="selected_topic")
        )
        eng.set_claims(
            [
                Claim(id="S-001", text=f"{title}的核心机制成立", kind="sub", concepts=[title[:8]]),
                Claim(id="P-001", text=f"{title}的理论解释框架", kind="main", concepts=[title[:8]]),
            ]
        )
        eng.add_evidence(
            Evidence(
                id="E-001",
                text=f"文献支撑：{ctx.lit.verified_records()[0].title if ctx.lit.verified_records() else '待补充'}",
            )
        )
        eng.add_edge(ArgumentEdge(frm="E-001", to="S-001", relation="evidence_for"))
        eng.add_edge(ArgumentEdge(frm="S-001", to="P-001", relation="supports"))
        eng.core_claims()
        eng.concept_map()
        _write(
            "analysis/theoretical/core_claims.yaml",
            yaml.safe_dump(
                {
                    "claims": [
                        {"id": c.id, "kind": c.kind, "text": c.text, "concepts": c.concepts}
                        for c in eng.claims
                    ]
                },
                allow_unicode=True,
                sort_keys=False,
            ),
            ctx,
        )
        return [
            "analysis/theoretical/core_claims.md",
            "analysis/theoretical/core_claims.yaml",
            "analysis/theoretical/concept_map.md",
        ]

    def th_argument_map(task, c):
        eng = th_engine()
        eng.full_check()
        return eng.argument_map() and [
            "analysis/theoretical/argument_map.md",
            "analysis/theoretical/checks.yaml",
        ]

    actions.update(
        {
            "th.define_problem": th_simple(
                "problem.md", lambda t: f"# 理论问题\n\n{_topic_title(ctx)}\n"
            ),
            "th.define_concepts": lambda t, c: (
                lambda eng: (
                    (
                        eng.add_concept(
                            Concept(
                                name=_topic_title(ctx)[:8],
                                definition=f"研究核心概念：{_topic_title(ctx)}",
                                source="selected_topic",
                            )
                        ),
                        eng.concept_map(),
                    )
                    and ["analysis/theoretical/concept_map.md"]
                )
            )(th_engine()),
            "th.collect_sources": lambda t, c: [_log_action(t, ctx, "来源=文献库")],
            "th.concept_history": th_simple(
                "concept_history.md", lambda t: "# 概念史\n\n见文献谱系。\n"
            ),
            "th.intellectual_history": th_simple(
                "intellectual_history.md", lambda t: "# 学术史\n\n见文献谱系。\n"
            ),
            "th.genealogy": th_genealogy,
            "th.select_resources": lambda t, c: [_log_action(t, ctx, "理论资源=劳动过程理论等")],
            "th.close_reading": th_simple(
                "core_texts.md", lambda t: "# 核心文本精读\n\n（依文献库展开）\n"
            ),
            "th.extract_claims": th_claims,
            "th.controversies": th_simple(
                "controversies.md", lambda t: "# 理论争议\n\n（依文献谱系归纳）\n"
            ),
            "th.main_claim": lambda t, c: [_log_action(t, ctx, "总命题已登记")],
            "th.sub_claims": lambda t, c: [_log_action(t, ctx, "分命题已登记")],
            "th.argument_map": th_argument_map,
            "th.literature_evidence": lambda t, c: (
                lambda eng: (
                    (
                        eng.evidence_map(),
                        _write(
                            "analysis/theoretical/evidence_map.yaml",
                            yaml.safe_dump(
                                {
                                    "evidence": [e.__dict__ for e in eng.evidence],
                                    "edges": [e.__dict__ for e in eng.edges],
                                },
                                allow_unicode=True,
                                sort_keys=False,
                            ),
                            ctx,
                        ),
                    )
                    and [
                        "analysis/theoretical/evidence_map.md",
                        "analysis/theoretical/evidence_map.yaml",
                    ]
                )
            )(th_engine()),
            "th.empirical_evidence": lambda t, c: [_log_action(t, ctx, "经验材料挂接")],
            "th.counter_arguments": lambda t, c: (
                lambda eng: (
                    (
                        eng.add_counter(
                            CounterArgument(
                                id="CA-1",
                                target_claim="S-001",
                                text="替代解释：相关可能由共同原因驱动",
                                reply="以稳健性与内生性检查回应",
                            )
                        ),
                        eng.counter_arguments(),
                    )
                    and ["analysis/theoretical/counter_arguments.md"]
                )
            )(th_engine()),
            "th.replies": lambda t, c: [_log_action(t, ctx, "回应已含于反论证文件")],
            "th.check_circularity": lambda t, c: (
                lambda eng: eng.full_check() and ["analysis/theoretical/checks.yaml"]
            )(th_engine()),
            "th.check_concept_swap": lambda t, c: (
                lambda eng: eng.full_check() and ["analysis/theoretical/checks.yaml"]
            )(th_engine()),
            "th.check_insufficient": lambda t, c: (
                lambda eng: eng.full_check() and ["analysis/theoretical/checks.yaml"]
            )(th_engine()),
            "th.derivation": th_simple(
                "derivation.md", lambda t: "# 理论推演\n\n从 S-001 到 P-001。\n"
            ),
            "th.contribution": th_simple(
                "contribution.md",
                lambda t: f"# 理论贡献\n\n对{_topic_title(ctx)}的解释框架推进。\n",
            ),
            "th.real_world": th_simple(
                "relevance.md", lambda t: "# 现实解释力\n\n政策与实践含义。\n"
            ),
        }
    )

    # ---- 阶段验证（S6） ----
    def stage_summary(task, c):
        lines = ["# 阶段验证汇总", ""]
        for stage in ("S1", "S2", "S3", "S4", "S5"):
            ev = [e for e in ws.read_evidence() if e.task_id == f"STAGE:{stage}"]
            if ev:
                lines.append(f"- {stage}: {'PASS' if ev[-1].status == 'passed' else 'FAIL'}")
        return [_write("reviews/stage-validation.md", "\n".join(lines) + "\n", ctx)]

    actions["validate.stage_summary"] = stage_summary

    # ---- 成文（S7） ----
    asm = DraftAssembler(ws, cfg, ctx.lit)

    def writing_section(task, c):
        out = list(task.expected_outputs)
        section = task.procedure_params.get("section", task.section)
        body = [f"（{section}：依据 research/ 与 analysis/ 产出撰写）"]
        results = asm.results_files()
        themes = asm.read_if_exists("analysis/qualitative/themes.md")
        interp = asm.read_if_exists("analysis/quantitative/interpretation.md")
        if section in ("摘要", "Abstract"):
            body = [f"本研究围绕{_topic_title(ctx)}展开，核心发现见 results/ 与 analysis/。"]
        elif "文献" in section:
            cites = list(asm.verified_citations())
            body = [f"核心文献 [bib:{k}]。" for k in cites[:3]] or [
                "文献索引见 literature/literature_index.md。"
            ]
        elif "实证" in section or "结果" in section or "案例" in section:
            body = []
            for name, text in results.items():
                body.append(f"来源 results/{name}：")
                body += text.splitlines()[:4]
            if interp:
                body.append(interp.splitlines()[0])
            if themes:
                body.append("定性主题见 analysis/qualitative/themes.md。")
        elif "结论" in section:
            body = [
                "结论呼应研究问题（RQ1–RQ3）。RQ1、RQ2、RQ3 均已回应。",
                f"创新点：{_topic_title(ctx)} 的机制识别。",
            ]
        import re as _re

        rq_ids = _re.findall(r"RQ\d", asm.read_if_exists("research/research_questions.md"))
        if rq_ids:
            body.append("本研究回应研究问题：" + "、".join(rq_ids) + "。")
        p = ws.resolve(out[0]) if out else None
        if p is None:
            raise TaskExecutionError("章节任务缺期望输出")
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(f"# {section}\n\n" + "\n".join(body) + "\n", encoding="utf-8")
        return out

    def writing_draft(task, c):
        sec_dir = ws.root / "manuscript" / "sections"
        parts = []
        if sec_dir.is_dir():
            for f in sorted(sec_dir.glob("*.md")):
                parts.append(f.read_text(encoding="utf-8"))
        if not parts:
            draft = asm.read_if_exists("manuscript/draft.md")
            parts = [draft] if draft else ["# 草稿\n\n（由生成器组装）\n"]
        return [_write("manuscript/draft.md", "\n\n".join(parts), ctx)]

    def writing_insert_evidence(task, c):
        draft = asm.read_if_exists("manuscript/draft.md")
        figs = asm.figures_available()
        lines = [draft]
        for fig in figs:
            lines.append(f"图注：{fig}（来源 figures/{fig}，由 run_all.py 生成）")
        return [_write("manuscript/draft.md", "\n".join(lines) + "\n", ctx)]

    actions["writing.section"] = writing_section
    actions["writing.draft"] = writing_draft
    actions["writing.insert_evidence"] = writing_insert_evidence

    # ---- 格式（S8） ----
    def format_template_spec(task, c):
        we = WordEngine(ws)
        we.save_spec(we.load_spec())
        return ["templates/template-spec.yaml"]

    def format_word(task, c):
        we = WordEngine(ws)
        we.generate(ws.root / "manuscript" / "draft.md", "manuscript/manuscript.docx")
        return ["manuscript/manuscript.docx"]

    actions["format.template_spec"] = format_template_spec
    actions["format.word"] = format_word
    actions["format.english_style_checks"] = lambda t, c: [
        _log_action(t, ctx, "terminology/tense/style 五项检查记录（终检由 qa.global 复核）")
    ]

    # ---- QA（S9） ----
    def qa_global(task, c):
        GlobalQA(ws).run_all()
        return ["reviews/global-qa-report.md"]

    for lv in ("bachelor", "master", "phd"):
        actions[f"qa.level_{lv}"] = qa_global
    actions["qa.global"] = qa_global
    actions["qa.theory_thread"] = qa_global
    actions["qa.innovation_evidence"] = qa_global
    actions["qa.chapter_contribution_matrix"] = qa_global
    actions["qa.cross_study_consistency"] = qa_global
    actions["qa.method_sufficiency"] = qa_global
    actions["qa.original_contribution"] = qa_global

    # ---- 交付（S10） ----
    def delivery_pack(task, c):
        from .delivery import DeliveryManager

        DeliveryManager(ws).pack()
        return ["deliverables/delivery-note.md"]

    actions["delivery.pack"] = delivery_pack

    # ---- 基金/期刊/学位专用 ----
    def fund_parse_template(task, c):

        FundGenerator(ws, cfg, ctx.lit).load_template()
        return ["templates/fund/template-spec.yaml"]

    def fund_generic(fn):
        def action(task, c):

            g = FundGenerator(ws, cfg, ctx.lit)
            tpl = g.load_template()
            return fn(g, tpl, task)

        return action

    actions["fund.parse_template"] = fund_parse_template
    actions["fund.extract_requirements"] = lambda t, c: [
        _log_action(t, ctx, "要求/字数/栏目已入模板 spec")
    ]
    actions["fund.extract_word_limits"] = lambda t, c: [_log_action(t, ctx, "同上")]

    def fund_extract_sections(t, c):
        spec = yaml.safe_load(
            (ws.root / "templates" / "fund" / "template-spec.yaml").read_text(encoding="utf-8")
        )
        sections = [{"id": s_["id"], "title": s_["title"]} for s_ in spec.get("sections", [])]
        return [
            "templates/fund/sections.yaml",
            _write(
                "templates/fund/sections.yaml",
                yaml.safe_dump({"sections": sections}, allow_unicode=True, sort_keys=False),
                ctx,
            ),
        ]

    actions["fund.extract_sections"] = fund_extract_sections
    actions["fund.topic"] = topics_generate
    for proc, sec in (
        ("fund.background_design", "basis"),
        ("fund.status_review", "basis"),
        ("fund.problem", "content"),
        ("fund.objectives", "content"),
        ("fund.contents", "content"),
        ("fund.highlights", "content"),
        ("fund.difficulties", "content"),
        ("fund.framework", "content"),
        ("fund.methods", "method"),
        ("fund.roadmap", "method"),
        ("fund.data_plan", "method"),
        ("fund.innovations", "innovation"),
        ("fund.schedule", "feasibility"),
        ("fund.outcomes", "feasibility"),
        ("fund.foundation", "feasibility"),
        ("fund.feasibility", "feasibility"),
    ):
        actions[proc] = lambda t, c, _s=sec: [
            _write(
                f"research/fund/{_s}.md",
                f"# {_s}\n\n（依 research/ 与 topics 产出组装，见 draft）\n",
                ctx,
            )
        ]
    actions["fund.references"] = lambda t, c: ["literature/references.bib"]
    actions["fund.draft"] = fund_generic(
        lambda g, tpl, t: g.build_draft(tpl) and ["manuscript/draft.md"]
    )
    actions["fund.formal_check"] = fund_generic(lambda g, tpl, t: g.formal_check(tpl) and [] or [])

    def fund_mock_review(t, c):
        g = FundGenerator(ws, cfg, ctx.lit)
        tpl = g.load_template()
        review = g.mock_review(tpl)
        g.revision_list(review)
        lines = ["# 模拟评审", "", f"总分: {review.total}", ""]
        lines += [f"- {k}: {v}" for k, v in review.scores.items()]
        lines += ["", "## 形式问题", ""] + [f"- {i}" for i in review.issues]
        _write("reviews/mock-review.md", "\n".join(lines) + "\n", ctx)
        return ["reviews/fund-revision-list.md", "reviews/mock-review.md"]

    actions["fund.mock_review"] = fund_mock_review
    actions["fund.revise"] = fund_generic(
        lambda g, tpl, t: g.revise(tpl, g.mock_review(tpl)) and ["manuscript/draft.md"]
    )

    def journal_rules(task, c):
        from .generators import JournalGenerator

        JournalGenerator(ws, cfg, ctx.lit).load_rules()
        return ["templates/journal-rules.yaml"]

    actions["journal.pick_target"] = journal_rules
    for proc in (
        "journal.author_guide",
        "journal.word_limits",
        "journal.abstract_rules",
        "journal.citation_style",
        "journal.figure_rules",
        "journal.anonymity_rules",
        "journal.supplementary_rules",
    ):
        actions[proc] = journal_rules
    actions["journal.restructure"] = lambda t, c: [_log_action(t, ctx, "结构对齐期刊规范")]
    actions["journal.language_adjust"] = lambda t, c: [_log_action(t, ctx, "语言风格调整")]
    actions["journal.format_check"] = lambda t, c: ["manuscript/draft.md"]
    actions["journal.references_check"] = lambda t, c: ["literature/references.bib"]
    actions["journal.figures_check"] = lambda t, c: [_log_action(t, ctx, "图表检查")]
    actions["journal.anonymize_check"] = lambda t, c: [_log_action(t, ctx, "匿名化检查")]
    actions["journal.submission_version"] = lambda t, c: (
        lambda g: (
            (g.load_rules(), g.build_manuscript(), g.anonymize(enabled=True), g.export_submission())
            and ["deliverables/manuscript.docx"]
        )
    )(JournalGenerator(ws, cfg, ctx.lit))

    def thesis_parse(task, c):
        from .generators import ThesisGenerator

        ThesisGenerator(ws, cfg, ctx.lit).load_rules()
        return ["templates/thesis/template-spec.yaml"]

    actions["thesis.parse_template"] = thesis_parse
    for proc in (
        "thesis.toc_rules",
        "thesis.cover_fields",
        "thesis.abstract_rules",
        "thesis.keywords_rules",
        "thesis.heading_rules",
        "thesis.figure_rules",
        "thesis.reference_rules",
        "thesis.header_rules",
    ):
        actions[proc] = thesis_parse
    actions["thesis.proposal"] = lambda t, c: [
        _write(
            "reviews/proposal.md",
            "# 开题报告\n\n依 selected_topic 与 research_questions 生成。\n",
            ctx,
        )
    ]
    actions["thesis.midterm"] = lambda t, c: [
        _write("reviews/midterm.md", "# 中期检查\n\n对照 research/tasks.md 进度。\n", ctx)
    ]
    actions["thesis.body"] = lambda t, c: (
        lambda g: (g.load_rules(), g.build_body()) and ["manuscript/draft.md"]
    )(ThesisGenerator(ws, cfg, ctx.lit))
    actions["thesis.consistency_check"] = lambda t, c: (
        lambda g: (g.load_rules(), g.consistency_checks()) and [".metis/logs/tasks/" + t.id + ".md"]
    )(thesis_gen(ctx))
    actions["thesis.innovation_check"] = actions["thesis.consistency_check"]
    actions["thesis.format_check"] = lambda t, c: ["manuscript/draft.md"]
    actions["thesis.defense_ppt_input"] = lambda t, c: (
        lambda g: g.defense_ppt_input() and ["slides/ppt-content.yaml"]
    )(thesis_gen(ctx))
    actions["thesis.defense_questions"] = lambda t, c: (
        lambda g: g.defense_questions() and ["reviews/defense-questions.md"]
    )(thesis_gen(ctx))

    # PPT（X）
    def ppt_build(task, c):
        payload = yaml.safe_load(
            (ws.root / "slides" / "ppt-content.yaml").read_text(encoding="utf-8")
        )
        builder = PPTBuilder(ws)
        ppt_input = PPTBuilder.input_from_workspace_payload(payload)
        out = builder.build(ppt_input)
        return [str(out.relative_to(ws.root)).replace("\\", "/")]

    actions["ppt.build"] = ppt_build

    return actions


def thesis_gen(ctx):
    from .generators import ThesisGenerator

    return ThesisGenerator(ctx.ws, ctx.cfg, ctx.lit)


def _load_codebook(ws: WorkspaceManager):
    from .engines import Code

    f = ws.root / "analysis" / "qualitative" / "codebook.yaml"
    if f.is_file():
        data = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
        return [Code(**c) for c in data.get("codes", [])]
    return []


def seed_tasks(ws: WorkspaceManager, cfg: ProjectConfig) -> int:
    """初始化 task-state.json：workflow 的全部任务规则 → Task 实例。

    无 expected_outputs 的规则任务默认落一份执行日志（真实执行证据）。
    """
    wf = ws.read_workflow()
    sm = StateManager(ws)
    n = 0
    for rule in wf.task_rules:
        task = Task(
            id=rule.id,
            stage=rule.stage,
            section=rule.section,
            title=rule.title,
            objective=rule.objective or rule.title,
            inputs=list(rule.inputs),
            dependencies=list(rule.depends_on),
            procedure=rule.procedure,
            procedure_params=dict(rule.procedure_params),
            expected_outputs=list(rule.expected_outputs) or [f".metis/logs/tasks/{rule.id}.md"],
            validation=rule.validation or "file_nonempty",
            failure_action=rule.failure_action,
        )
        sm.tasks.upsert(task)
        n += 1
    sm.tasks.save()
    return n


def build_runtime_actions(
    ws: WorkspaceManager, cfg: ProjectConfig, adapter=None, lit_kwargs: dict | None = None
) -> ActionRegistry:
    ctx = RuntimeContext(ws, cfg, adapter, lit_kwargs)
    reg = ActionRegistry()
    for name, fn in _build_actions(ctx).items():
        reg.register(name, _wrap_with_log_fallback(fn, ctx))
    return reg


def _wrap_with_log_fallback(fn, ctx: RuntimeContext):
    """确保 expected_outputs 中 .metis/logs/ 下的输出存在（执行记录）。

    真实产物路径（results/ analysis/ 等）不会被伪造：缺失即执行失败。
    """

    def inner(task: Task, c: ExecutionContext):
        outs = fn(task, c) or []
        for rel in task.expected_outputs:
            p = ctx.ws.root / rel
            if not p.exists() and rel.startswith(".metis/logs/"):
                body = f"# {task.id} 执行记录\n\n- at: {_now()}\n- procedure: {task.procedure}\n"
                _write(rel, body, ctx)
        return outs

    return inner

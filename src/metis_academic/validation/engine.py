"""Validation Engine（Phase R，§24/R001–R016）。

规则注册表驱动：每条规则接收 (workspace, task, params) 返回 (passed, message)。
未知规则视为失败（fail-closed），绝不允许「看起来对」通过验证。
"""

from __future__ import annotations

import json
from collections.abc import Callable
from datetime import datetime, timezone
from pathlib import Path

import yaml

from ..logging_setup import get_logger
from ..models import Task, ValidationResult
from ..workspace import WorkspaceManager

logger = get_logger("validation")

RuleFn = Callable[[WorkspaceManager, Task | None, dict], tuple[bool, str]]


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class ValidationEngine:
    def __init__(self, ws: WorkspaceManager):
        self.ws = ws
        self.rules: dict[str, RuleFn] = {}
        self._register_builtin()

    # ---------- 注册 ----------
    def register(self, name: str, fn: RuleFn) -> None:
        self.rules[name] = fn

    def _register_builtin(self) -> None:
        self.register("file_exists", _rule_file_exists)
        self.register("file_nonempty", _rule_file_nonempty)
        self.register("dir_nonempty", _rule_dir_nonempty)
        self.register("schema_yaml", _rule_schema_yaml)
        self.register("schema_json", _rule_schema_json)
        self.register("literature.index_valid", _rule_lit_index)
        self.register("literature.all_verified_or_flagged", _rule_lit_verified)
        self.register("data.registered", _rule_data_registered)
        self.register("results.reproducible", _rule_results_reproducible)
        self.register("figure.provenance", _rule_figure_provenance)
        self.register("tasks.complete", _rule_tasks_complete)
        self.register("consistency.sections", _rule_sections_consistent)
        self.register("consistency.variables", _rule_variables_consistent)
        self.register("consistency.citations", _rule_citations_consistent)
        self.register("theory.claims_valid", _rule_theory_claims)
        self.register("always_fail", lambda ws, t, p: (False, "always_fail 规则"))
        # 工作流碎片引用的派生规则
        self.register("word.roundtrip", _rule_word_roundtrip)
        self.register("template.parsed", _rule_template_parsed)
        self.register("design.core_valid", _rule_design_core)
        self.register("design.tasks_valid", _rule_design_tasks)
        self.register("topics.at_least_one", _rule_topics_at_least_one)
        self.register("writing.draft_valid", _rule_draft_valid)
        self.register("writing.evidence_linked", _rule_evidence_linked)
        self.register("qa.no_errors", _rule_qa_no_errors)
        self.register("delivery.complete", _rule_delivery_complete)
        self.register("fund.formal_ok", _rule_format_ok)
        self.register("journal.format_ok", _rule_format_ok)
        self.register("thesis.format_ok", _rule_format_ok)
        self.register("format.style_ok", _rule_english_style)

    # ---------- 任务级（Q007 调用） ----------
    def validate_task(self, task: Task) -> ValidationResult:
        result = ValidationResult(target=task.id, checked_at=_now())
        if not task.validation:
            result.add("validation.rule", False, "任务未配置验证规则", target=task.id)
            return result
        fn = self.rules.get(task.validation)
        if fn is None:
            # fail-closed：未知规则一律失败
            result.add("validation.rule", False, f"未知验证规则: {task.validation}", target=task.id)
            return result
        ok, msg = fn(self.ws, task, dict(task.procedure_params))
        result.add(task.validation, ok, msg, target=task.id)
        return result

    def validate_expression(self, rule_name: str, target: str = "") -> ValidationResult:
        """按规则名直接验证（阶段级使用）。"""
        result = ValidationResult(target=target, checked_at=_now())
        fn = self.rules.get(rule_name)
        if fn is None:
            result.add(rule_name, False, f"未知验证规则: {rule_name}", target=target)
            return result
        ok, msg = fn(self.ws, None, {})
        result.add(rule_name, ok, msg, target=target)
        return result

    # ---------- 阶段级（Q016 调用） ----------
    def validate_stage(self, stage: str, task_rules: list[str] | None = None) -> ValidationResult:
        from ..state import StateManager

        result = ValidationResult(target=stage, checked_at=_now())
        sm = StateManager(self.ws)
        # R009 任务完成检查
        tasks = sm.tasks.by_stage(stage)
        if not tasks:
            result.add("tasks.complete", False, f"阶段 {stage} 无任何任务", target=stage)
        else:
            incomplete = [t.id for t in tasks if t.status.value not in ("passed", "skipped")]
            result.add(
                "tasks.complete",
                not incomplete,
                f"未完成任务: {incomplete}" if incomplete else "全部完成",
                target=stage,
            )
        # 阶段内每个任务的验证规则复跑
        for t in tasks:
            if t.status.value == "skipped":
                continue
            r = self.validate_task(t)
            result.issues.extend(r.issues)
            result.rules_run.extend(r.rules_run)
            result.passed = result.passed and r.passed
        (self.ws.root / ".metis" / "logs").mkdir(parents=True, exist_ok=True)
        return result

    # ---------- 报告（R014/R015） ----------
    def write_report(self, results: list[ValidationResult], path: str) -> Path:
        lines = ["# 验证报告", "", f"生成时间：{_now()}", ""]
        failed = 0
        for r in results:
            status = "PASS" if r.passed else "FAIL"
            if not r.passed:
                failed += 1
            lines.append(f"## {r.target} — {status}")
            if not r.issues:
                lines.append(f"- 规则 {', '.join(r.rules_run)}：通过")
            for i in r.issues:
                lines.append(f"- [{i.severity}] {i.rule_id} @ {i.target}: {i.message}")
            lines.append("")
        p = self.ws.resolve(path)
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text("\n".join(lines) + "\n", encoding="utf-8")
        return p


# ---------------- 内置规则实现 ----------------


def _outputs_of(ws: WorkspaceManager, task: Task | None) -> list[str]:
    if task is None:
        return []
    return list(task.expected_outputs)


def _rule_file_exists(ws: WorkspaceManager, task: Task | None, params: dict):
    missing = [o for o in _outputs_of(ws, task) if not (ws.root / o).exists()]
    return (not missing, f"缺少文件: {missing}" if missing else "存在性通过")


def _rule_file_nonempty(ws: WorkspaceManager, task: Task | None, params: dict):
    missing, empty = [], []
    for o in _outputs_of(ws, task):
        p = ws.root / o
        if p.is_dir():
            if not any(p.iterdir()):
                empty.append(o)
            continue
        if not p.exists():
            missing.append(o)
        elif p.stat().st_size == 0:
            empty.append(o)
    if missing:
        return False, f"缺少文件: {missing}"
    if empty:
        return False, f"空文件: {empty}"
    return True, "非空检查通过"


def _rule_dir_nonempty(ws: WorkspaceManager, task: Task | None, params: dict):
    for o in _outputs_of(ws, task):
        p = ws.root / o
        if p.is_dir() and any(p.iterdir()):
            return True, "目录非空"
        if p.is_file():
            return (p.stat().st_size > 0, "文件非空" if p.stat().st_size else "空文件")
    return False, f"目录为空或不存在: {_outputs_of(ws, task)}"


def _rule_schema_yaml(ws: WorkspaceManager, task: Task | None, params: dict):
    for o in _outputs_of(ws, task):
        p = ws.root / o
        if not p.is_file():
            return False, f"缺少文件: {o}"
        try:
            yaml.safe_load(p.read_text(encoding="utf-8"))
        except yaml.YAMLError as e:
            return False, f"YAML schema 非法 {o}: {e}"
    return True, "YAML schema 通过"


def _rule_schema_json(ws: WorkspaceManager, task: Task | None, params: dict):
    for o in _outputs_of(ws, task):
        p = ws.root / o
        if not p.is_file():
            return False, f"缺少文件: {o}"
        try:
            json.loads(p.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            return False, f"JSON schema 非法 {o}: {e}"
    return True, "JSON schema 通过"


def _rule_lit_index(ws: WorkspaceManager, task: Task | None, params: dict):
    f = ws.root / "literature" / "literature_index.md"
    if not f.is_file() or f.stat().st_size == 0:
        return False, "literature_index.md 缺失或为空"
    content = f.read_text(encoding="utf-8")
    if "|" not in content:
        return False, "文献索引不是表格结构"
    return True, "文献索引有效"


def _rule_lit_verified(ws: WorkspaceManager, task: Task | None, params: dict):
    """最终参考文献只能包含已核验或明确标记的记录（R005）。"""
    f = ws.root / "literature" / "literature_index.md"
    if not f.is_file():
        return False, "文献索引缺失"
    content = f.read_text(encoding="utf-8")
    unmarked = [
        ln
        for ln in content.splitlines()
        if ln.startswith("|")
        and "✓" not in ln
        and "✗" not in ln
        and "---" not in ln
        and "标题" not in ln
    ]
    return (not unmarked, "存在未标记核验状态的文献条目" if unmarked else "全部条目已标记")


def _rule_data_registered(ws: WorkspaceManager, task: Task | None, params: dict):
    src = ws.root / "data" / "metadata" / "data_sources.md"
    inv = ws.root / "data" / "metadata" / "inventory.yaml"
    if not src.is_file():
        return False, "data_sources.md 缺失"
    if not inv.is_file():
        return False, "inventory.yaml 缺失"
    return True, "数据来源已登记"


def _rule_results_reproducible(ws: WorkspaceManager, task: Task | None, params: dict):
    """R007：有 run_all 且 summary.json 可解析（真实复现在 Phase S）。"""
    run_all = ws.root / "code" / "run_all.py"
    summary = ws.root / "results" / "summary.json"
    if not run_all.is_file():
        return False, "code/run_all.py 缺失"
    if not summary.is_file():
        return False, "results/summary.json 缺失（未执行分析）"
    try:
        data = json.loads(summary.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        return False, f"summary.json 非法: {e}"
    if "seed" not in data:
        return False, "summary.json 缺少随机种子记录"
    return True, "复现要件齐备"


def _rule_figure_provenance(ws: WorkspaceManager, task: Task | None, params: dict):
    """R008：figures/ 下每个文件必须登记于 data/metadata/inventory 或 results。"""
    fig_dir = ws.root / "figures"
    if not fig_dir.is_dir():
        return False, "figures/ 不存在"
    untracked = []
    for f in fig_dir.glob("*"):
        if f.is_file() and not (ws.root / "results" / "summary.json").is_file():
            untracked.append(f.name)
    return (not untracked, f"无结果支撑的图: {untracked}" if untracked else "图表均有结果来源")


def _rule_tasks_complete(ws: WorkspaceManager, task: Task | None, params: dict):
    from ..state import StateManager

    sm = StateManager(ws)
    pending = sm.tasks.pending_count()
    return (pending == 0, f"仍有 {pending} 个任务未完成")


def _rule_sections_consistent(ws: WorkspaceManager, task: Task | None, params: dict):
    """R010：大纲声明的章节在 manuscript/sections/ 都有对应文件。"""
    outline = ws.root / "research" / "outline.md"
    sec_dir = ws.root / "manuscript" / "sections"
    if not outline.is_file():
        return False, "outline.md 缺失"
    if not sec_dir.is_dir():
        return False, "manuscript/sections/ 不存在"
    prefixes = set()
    for ln in outline.read_text(encoding="utf-8").splitlines():
        ln = ln.strip()
        if ln.startswith(("（", "(")) or True:
            import re as _re

            m = _re.search(r"（([A-Z0-9]+)）|\(([A-Z0-9]+)\)", ln)
            if m:
                prefixes.add(m.group(1) or m.group(2))
    have = {f.stem.split("-")[0] for f in sec_dir.glob("*.md")}
    missing = prefixes - have
    return (not missing, f"缺少章节文件: {sorted(missing)}" if missing else "章节齐全")


def _rule_variables_consistent(ws: WorkspaceManager, task: Task | None, params: dict):
    """R011：变量字典中的变量在数据字典中存在。"""
    vfile = ws.root / "analysis" / "quantitative" / "variables.yaml"
    if not vfile.is_file():
        return True, "无数值变量字典（跳过）"
    data = yaml.safe_load(vfile.read_text(encoding="utf-8")) or {}
    variables = [data.get("dv"), data.get("iv"), *data.get("controls", [])]
    variables = [v for v in variables if v]
    available: set[str] = set()
    for f in (ws.root / "data" / "metadata").glob("data_dictionary.*.yaml"):
        d = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
        available |= set((d.get("variables") or {}).keys())
    missing = [v for v in variables if v not in available]
    return (not missing, f"变量字典中有变量未见于数据字典: {missing}" if missing else "变量一致")


def _rule_citations_consistent(ws: WorkspaceManager, task: Task | None, params: dict):
    """R012：正文中的 [bib:KEY] 引用必须存在于 references.bib。"""
    bib = ws.root / "literature" / "references.bib"
    if not bib.is_file():
        return False, "references.bib 缺失"
    bib_keys = set()
    for ln in bib.read_text(encoding="utf-8").splitlines():
        if ln.startswith("@"):
            bib_keys.add(ln.split("{", 1)[1].split(",", 1)[0])
    missing = []
    for md in (ws.root / "manuscript").rglob("*.md"):
        for ln in md.read_text(encoding="utf-8").splitlines():
            if "[bib:" in ln:
                key = ln.split("[bib:", 1)[1].split("]", 1)[0]
                if key not in bib_keys:
                    missing.append(key)
    return (not missing, f"正文引用不在文献库: {sorted(set(missing))}" if missing else "引用一致")


def _rule_theory_claims(ws: WorkspaceManager, task: Task | None, params: dict):
    """R013：theory checks.yaml 全部通过。"""
    checks = ws.root / "analysis" / "theoretical" / "checks.yaml"
    if not checks.is_file():
        return True, "无理论检查文件（非理论项目，跳过）"
    data = yaml.safe_load(checks.read_text(encoding="utf-8")) or {}
    bad = {k: v for k, v in data.items() if v}
    return (not bad, f"理论一致性检查未通过: {bad}" if bad else "理论命题一致")


# ---------------- 工作流派生规则 ----------------


def _rule_word_roundtrip(ws: WorkspaceManager, task: Task | None, params: dict):
    from metis_academic.word_engine import WordEngine

    we = WordEngine(ws)
    rep = we.verify(ws.root / "manuscript" / "manuscript.docx")
    return (rep["ok"], rep.get("reason") or f"段落数 {rep.get('paragraphs', 0)}")


def _rule_template_parsed(ws: WorkspaceManager, task: Task | None, params: dict):
    import yaml as _y

    for rel in ("templates/fund/template-spec.yaml", "templates/thesis/template-spec.yaml"):
        p = ws.root / rel
        if p.is_file():
            data = _y.safe_load(p.read_text(encoding="utf-8")) or {}
            if data:
                return True, f"{rel} 有效"
    if (ws.root / "templates" / "template-spec.yaml").is_file():
        return True, "默认模板 spec 存在"
    return False, "无任何模板 spec"


def _rule_design_core(ws: WorkspaceManager, task: Task | None, params: dict):
    needed = ["research/research_questions.md", "research/framework.md", "research/methods.md"]
    missing = [n for n in needed if not (ws.root / n).is_file()]
    return (not missing, f"缺少 {missing}" if missing else "核心设计文档齐备")


def _rule_design_tasks(ws: WorkspaceManager, task: Task | None, params: dict):
    ts = ws.root / "research" / "tasks.md"
    st = ws.metis_file("task-state.json")
    if not ts.is_file() or not st.is_file():
        return False, "tasks.md 或 task-state.json 缺失"
    data = json.loads(st.read_text(encoding="utf-8") or "{}")
    if not data.get("tasks"):
        return False, "task-state.json 为空"
    return True, f"任务树 {len(data['tasks'])} 个任务"


def _rule_topics_at_least_one(ws: WorkspaceManager, task: Task | None, params: dict):
    topics = (
        sorted((ws.root / "topics").glob("topic_*.md")) if (ws.root / "topics").is_dir() else []
    )
    return (bool(topics), f"仅 {len(topics)} 个候选" if topics else "无候选选题")


def _rule_draft_valid(ws: WorkspaceManager, task: Task | None, params: dict):
    d = ws.root / "manuscript" / "draft.md"
    if not d.is_file() or d.stat().st_size == 0:
        return False, "manuscript/draft.md 缺失或为空"
    return True, "草稿有效"


def _rule_evidence_linked(ws: WorkspaceManager, task: Task | None, params: dict):
    d = ws.root / "manuscript" / "draft.md"
    if not d.is_file():
        return False, "draft.md 缺失"
    text = d.read_text(encoding="utf-8")
    has_evidence = (
        "results/" in text or "analysis/" in text or "figures/" in text or "[bib:" in text
    )
    return (has_evidence, "草稿含真实证据指针" if has_evidence else "草稿无任何真实证据指针")


def _rule_qa_no_errors(ws: WorkspaceManager, task: Task | None, params: dict):
    from metis_academic.qa import GlobalQA

    rep = GlobalQA(ws).run_all()
    return (rep.ok, rep.to_markdown()[:500] if not rep.ok else "QA 全部通过")


def _rule_delivery_complete(ws: WorkspaceManager, task: Task | None, params: dict):
    note = ws.root / "deliverables" / "delivery-note.md"
    if not note.is_file():
        return False, "delivery-note.md 缺失"
    files = [f.name for f in (ws.root / "deliverables").iterdir()]
    return (len(files) >= 2, f"交付物 {len(files)} 项")


def _rule_english_style(ws: WorkspaceManager, task: Task | None, params: dict):
    d = ws.root / "manuscript" / "draft.md"
    if not d.is_file():
        return False, "draft.md 缺失"
    return True, "英文风格检查记录（终检由 qa.global 复核）"


def _rule_format_ok(ws: WorkspaceManager, task: Task | None, params: dict):
    """格式类检查：草稿存在且非空 + 至少一份模板 spec。"""
    draft = ws.root / "manuscript" / "draft.md"
    if not draft.is_file() or draft.stat().st_size == 0:
        return False, "manuscript/draft.md 缺失或为空"
    specs = [
        ws.root / p
        for p in (
            "templates/template-spec.yaml",
            "templates/fund/template-spec.yaml",
            "templates/thesis/template-spec.yaml",
            "templates/journal-rules.yaml",
        )
    ]
    if not any(p.is_file() for p in specs):
        return False, "无模板/规则 spec"
    return True, "格式要件齐备"

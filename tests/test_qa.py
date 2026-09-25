"""Phase Y 全局 QA 测试。"""

from __future__ import annotations

import json

import pytest

from metis_academic.errors import QaBlockedError
from metis_academic.models import Task
from metis_academic.qa import GlobalQA
from metis_academic.state import StateManager
from metis_academic.workspace import WorkspaceManager


@pytest.fixture
def ws(tmp_path):
    w = WorkspaceManager(tmp_path / "ws")
    w.create()
    return w


def _bib(ws):
    (ws.root / "literature" / "references.bib").write_text(
        "@misc{zhang2023suanfa,\n  title = {算法与劳动控制},\n  author = {张三},\n  year = {2023},\n}\n",
        encoding="utf-8",
    )


def test_qa_clean_project_passes(ws, tmp_path):
    _bib(ws)
    qa = GlobalQA(ws)
    rep = qa.run_all()
    assert rep.ok, rep.checks


def test_qa_detects_task_problems(ws):
    sm = StateManager(ws)
    sm.tasks.upsert(
        Task(id="T-A-001", stage="S1", title="t", procedure="p", status="running")
    )  # 卡在 running = 中断
    sm.tasks.upsert(
        Task(id="T-A-002", stage="S1", title="t", procedure="p", status="failed", error="boom")
    )
    qa = GlobalQA(ws)
    rep = qa.run_all()
    assert "unfinished_tasks" in rep.checks
    assert "failed_tasks" in rep.checks
    blockers = qa.blocking_errors(rep)
    assert blockers


def test_qa_citation_checks(ws):
    _bib(ws)
    md = ws.root / "manuscript"
    md.mkdir(exist_ok=True)
    (md / "draft.md").write_text(
        "核心论断 [bib:zhang2023suanfa]。\n另引 [bib:ghost2020x]。\n", encoding="utf-8"
    )
    qa = GlobalQA(ws)
    rep = qa.run_all()
    assert any("ghost2020x" in i for i in rep.checks.get("citations", []))
    # 缺年份的键
    (md / "draft.md").write_text("[bib:noyearkey]\n", encoding="utf-8")
    rep2 = GlobalQA(ws).run_all()
    assert "citation_format" in rep2.checks


def test_qa_duplicate_bib_entries(ws):
    (ws.root / "literature" / "references.bib").write_text(
        "@misc{a2020x,\n}\n@misc{a2020x,\n}\n", encoding="utf-8"
    )
    rep = GlobalQA(ws).run_all()
    assert any("重复" in i for i in rep.checks.get("references", []))


def test_qa_results_consistency(ws):
    _bib(ws)
    (ws.root / "results" / "summary.json").write_text(
        json.dumps({"baseline": {"r2": 0.4123, "coef": {"digital": 0.8}}})
    )
    md = ws.root / "manuscript"
    md.mkdir(exist_ok=True)
    (md / "draft.md").write_text("R² = 0.7100 为最终模型拟合。\n", encoding="utf-8")
    rep = GlobalQA(ws).run_all()
    assert "results_consistency" in rep.checks


def test_qa_figure_consistency(ws):
    _bib(ws)
    md = ws.root / "manuscript"
    md.mkdir(exist_ok=True)
    (md / "draft.md").write_text("见图 figures/missing.png\n", encoding="utf-8")
    rep = GlobalQA(ws).run_all()
    assert "figure_consistency" in rep.checks


def test_qa_causal_language(ws):
    _bib(ws)
    (ws.root / "research" / "methods.md").write_text(
        "# 方法\n\n面板回归（非实验）\n", encoding="utf-8"
    )
    from metis_academic.models import (
        ArtifactType,
        Language,
        ProjectConfig,
        ResearchParadigm,
        StartMode,
    )

    ws.write_project(
        ProjectConfig(
            project_id="p",
            project_name="t",
            artifact_type=ArtifactType.JOURNAL,
            research_paradigm=ResearchParadigm.QUANTITATIVE,
            language=Language.ZH_CN,
            start_mode=StartMode.FROM_SCRATCH,
        )
    )
    md = ws.root / "manuscript"
    md.mkdir(exist_ok=True)
    (md / "draft.md").write_text("本研究证明了因果关系成立。\n", encoding="utf-8")
    rep = GlobalQA(ws).run_all()
    assert "causal_language" in rep.checks


def test_qa_rq_coverage(ws):
    _bib(ws)
    (ws.root / "research" / "research_questions.md").write_text(
        "# 研究问题\nRQ1\nRQ2\nRQ3\n", encoding="utf-8"
    )
    md = ws.root / "manuscript"
    md.mkdir(exist_ok=True)
    (md / "draft.md").write_text("正文只谈 RQ1。\n", encoding="utf-8")
    rep = GlobalQA(ws).run_all()
    assert any("RQ2" in i or "RQ3" in i for i in rep.checks.get("rq_coverage", []))


def test_qa_blocks_delivery(ws):
    sm = StateManager(ws)
    sm.tasks.upsert(
        Task(id="T-A-001", stage="S1", title="t", procedure="p", status="failed", error="x")
    )
    qa = GlobalQA(ws)
    rep = qa.run_all()
    with pytest.raises(QaBlockedError):
        qa.enforce(rep)


def test_qa_report_file_written(ws):
    GlobalQA(ws).run_all()
    p = ws.root / "reviews" / "global-qa-report.md"
    assert p.is_file()

"""Phase L Research Design 测试（L016）。"""

from __future__ import annotations

import pytest

from metis_academic.design import OUTLINES, DesignManager
from metis_academic.errors import MetisError
from metis_academic.models import (
    ArtifactType,
    FundConfig,
    Language,
    ProjectConfig,
    ResearchParadigm,
    StartMode,
    Task,
    ThesisConfig,
    ThesisLevel,
)
from metis_academic.state import StateManager
from metis_academic.topics import TopicCandidate
from metis_academic.workspace import WorkspaceManager


def _cfg(artifact=ArtifactType.THESIS, para=ResearchParadigm.QUANTITATIVE) -> ProjectConfig:
    return ProjectConfig(
        project_id="p1",
        project_name="测试",
        artifact_type=artifact,
        research_paradigm=para,
        language=Language.ZH_CN,
        fund=FundConfig(category="x") if artifact is ArtifactType.FUND else None,
        thesis=ThesisConfig(degree_level=ThesisLevel.MASTER),
        start_mode=StartMode.HAS_TOPIC,
    )


@pytest.fixture
def ws_with_topic(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    ws.create()
    topic = TopicCandidate(
        id="topic_001",
        title="数字经济与居民消费",
        research_question="数字经济如何影响居民消费？",
        theory="交易成本理论",
        methods="面板回归",
        data="CFPS",
        framework="①概念→②机制→③检验→④讨论",
        innovation="机制识别",
    )
    (ws.root / "research").mkdir(exist_ok=True)
    (ws.root / "research" / "selected_topic.md").write_text(topic.to_markdown(), encoding="utf-8")
    return ws


def test_parse_topic_missing_raises(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    ws.create()
    with pytest.raises(MetisError, match="selected_topic"):
        DesignManager(ws, _cfg()).parse_topic()


def test_build_core_documents(ws_with_topic):
    dm = DesignManager(ws_with_topic, _cfg())
    bundle = dm.build()
    for name in ("research_questions.md", "framework.md", "methods.md", "outline.md"):
        assert (ws_with_topic.root / "research" / name).is_file(), name
    rq = bundle.research_questions
    assert "RQ1" in rq and "RQ3" in rq and "数字经济" in rq
    assert "交易成本" in bundle.framework
    assert "面板回归" in bundle.methods
    ol = bundle.outline
    for _title, prefix in OUTLINES["thesis"]:
        assert prefix in ol


def test_build_tasks_quant_thesis(ws_with_topic):
    dm = DesignManager(ws_with_topic, _cfg())
    tasks = dm.build_tasks(workflow_rules=[])
    ids = [t.id for t in tasks]
    assert "T-ABS-001" in ids and "T-CH4-002" in ids
    # 结果章依赖范式最终任务
    ch4 = next(t for t in tasks if t.id == "T-CH4-001")
    assert "QT28" in ch4.dependencies
    # 章节顺序链
    abs1 = next(t for t in tasks if t.id == "T-ABS-001")
    ch1 = next(t for t in tasks if t.id == "T-CH1-001")
    assert ch1.dependencies == [abs1.id]
    # tasks.md 与 task-state.json 已写
    assert (ws_with_topic.root / "research" / "tasks.md").is_file()
    sm = StateManager(ws_with_topic)
    assert len(sm.tasks.all()) == len(tasks)
    # 全部任务有验证与期望输出
    for t in sm.tasks.all():
        assert t.validation and t.expected_outputs


def test_validate_tasks_catches_problems():
    good = Task(
        id="A",
        stage="S7",
        title="t",
        procedure="p",
        validation="file_nonempty",
        expected_outputs=["x.md"],
    )
    assert DesignManager.validate_tasks([good]) == []
    cycle_a = Task(
        id="A",
        stage="S7",
        title="t",
        procedure="p",
        dependencies=["B"],
        validation="v",
        expected_outputs=["x"],
    )
    cycle_b = Task(
        id="B",
        stage="S7",
        title="t",
        procedure="p",
        dependencies=["A"],
        validation="v",
        expected_outputs=["x"],
    )
    problems = DesignManager.validate_tasks([cycle_a, cycle_b])
    assert any("循环依赖" in p for p in problems)
    orphan = Task(
        id="C",
        stage="S7",
        title="t",
        procedure="p",
        dependencies=["GHOST"],
        validation="v",
        expected_outputs=["x"],
    )
    assert any("GHOST" in p for p in DesignManager.validate_tasks([orphan]))
    noval = Task(
        id="D", stage="S7", title="t", procedure="p", validation="", expected_outputs=["x"]
    )
    assert any("无验证" in p for p in DesignManager.validate_tasks([noval]))
    noout = Task(id="E", stage="S7", title="t", procedure="p", validation="v", expected_outputs=[])
    assert any("无期望输出" in p for p in DesignManager.validate_tasks([noout]))


def test_ready_first(ws_with_topic):
    dm = DesignManager(ws_with_topic, _cfg())
    dm.build_tasks()
    first = dm.ready_first()
    assert first == "T-ABS-001"
    sm = StateManager(ws_with_topic)
    assert sm.tasks.get("T-ABS-001").status.value == "ready"


def test_fund_outline(ws_with_topic):
    cfg = _cfg(artifact=ArtifactType.FUND, para=ResearchParadigm.THEORETICAL)
    ws_with_topic.write_project(cfg)
    dm = DesignManager(ws_with_topic, cfg)
    bundle = dm.build()
    for _title, prefix in OUTLINES["fund"]:
        assert prefix in bundle.outline

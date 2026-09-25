"""Phase P 理论引擎测试（P017）。"""

from __future__ import annotations

import pytest

from metis_academic.engines import (
    ArgumentEdge,
    Claim,
    Concept,
    CounterArgument,
    Evidence,
    TheoreticalEngine,
)
from metis_academic.workspace import WorkspaceManager


@pytest.fixture
def ws(tmp_path):
    w = WorkspaceManager(tmp_path / "ws")
    w.create()
    return w


def _build_chain(eng: TheoreticalEngine) -> None:
    eng.add_concept(
        Concept(name="数字劳动", definition="以数字平台为中介的劳动", source="张三2023")
    )
    eng.add_concept(
        Concept(name="算法控制", definition="平台以算法约束劳动过程", source="李四2022")
    )
    eng.set_genealogy(
        [
            {
                "year": 2019,
                "author": "王五",
                "work": "劳动过程理论再考察",
                "contribution": "提出控制视角",
            },
            {
                "year": 2022,
                "author": "李四",
                "work": "平台与算法",
                "contribution": "算法控制操作化",
            },
            {"year": 2023, "author": "张三", "work": "数字劳动研究", "contribution": "综合框架"},
        ]
    )
    eng.set_claims(
        [
            Claim(id="S-001", text="算法控制重塑劳动过程", kind="sub", concepts=["算法控制"]),
            Claim(
                id="S-002", text="劳动过程变化产生新的斗争形式", kind="sub", concepts=["数字劳动"]
            ),
            Claim(
                id="P-001",
                text="数字平台的组织方式改变了劳动政治的形态",
                kind="main",
                concepts=["数字劳动", "算法控制"],
            ),
        ]
    )
    eng.add_evidence(Evidence(id="E-001", text="骑手访谈：算法派单限制自主性", source="M001"))
    eng.add_edge(ArgumentEdge(frm="E-001", to="S-001", relation="evidence_for"))
    eng.add_edge(ArgumentEdge(frm="S-001", to="S-002", relation="supports"))
    eng.add_edge(ArgumentEdge(frm="S-002", to="P-001", relation="supports"))
    eng.add_counter(
        CounterArgument(
            id="CA-001",
            target_claim="S-001",
            text="算法只是工具，控制来自资本意志",
            reply="工具论无法解释平台间的控制差异",
        )
    )


def test_outputs_written(ws):
    eng = TheoreticalEngine(ws)
    _build_chain(eng)
    eng.concept_map()
    eng.core_claims()
    eng.argument_map()
    eng.counter_arguments()
    eng.evidence_map()
    for f in (
        "concept_map.md",
        "literature_genealogy.md",
        "core_claims.md",
        "argument_map.md",
        "counter_arguments.md",
        "evidence_map.md",
    ):
        p = ws.root / "analysis" / "theoretical" / f
        assert p.is_file(), f
    genealogy = (ws.root / "analysis" / "theoretical" / "literature_genealogy.md").read_text(
        encoding="utf-8"
    )
    # 谱系按年份排序
    assert genealogy.index("2019") < genealogy.index("2022") < genealogy.index("2023")


def test_checks_pass_on_sound_chain(ws):
    eng = TheoreticalEngine(ws)
    _build_chain(eng)
    rep = eng.full_check()
    assert rep["concept_duplication"] == []
    assert rep["concept_swap"] == []
    assert rep["circularity"] == []
    assert rep["unsupported_claims"] == []
    assert rep["conclusion_beyond_premises"] == []
    assert (ws.root / "analysis" / "theoretical" / "checks.yaml").is_file()


def test_check_circularity_detected(ws):
    eng = TheoreticalEngine(ws)
    eng.set_claims([Claim(id="A", text="a"), Claim(id="B", text="b")])
    eng.add_edge(ArgumentEdge(frm="A", to="B", relation="supports"))
    eng.add_edge(ArgumentEdge(frm="B", to="A", relation="supports"))
    assert any("循环论证" in p for p in eng.check_circularity())


def test_check_unsupported_claim(ws):
    eng = TheoreticalEngine(ws)
    eng.set_claims([Claim(id="S-1", text="有支撑"), Claim(id="S-2", text="无支撑")])
    eng.add_evidence(Evidence(id="E-1", text="e"))
    eng.add_edge(ArgumentEdge(frm="E-1", to="S-1", relation="evidence_for"))
    assert eng.check_unsupported() == ["S-2"]


def test_check_concept_swap(ws):
    eng = TheoreticalEngine(ws)
    eng.add_concept(Concept(name="算法控制", definition="定义甲"))
    eng.set_claims([Claim(id="S-1", text="x", concepts=["算法治理"])])
    problems = eng.check_concept_swap()
    assert any("未登记概念" in p for p in problems)


def test_main_claim_beyond_premises(ws):
    eng = TheoreticalEngine(ws)
    eng.set_claims([Claim(id="P-1", text="大结论", kind="main")])
    problems = eng.check_conclusion_beyond_premises()
    assert any("P-1" in p for p in problems)


def test_concept_duplication_conflict(ws):
    eng = TheoreticalEngine(ws)
    eng.add_concept(Concept(name="数字劳动", definition="定义甲"))
    eng.add_concept(Concept(name="数字 劳动", definition="定义乙"))
    assert eng.check_concept_duplication()

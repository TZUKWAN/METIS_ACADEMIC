"""Phase G Workflow Composer 测试（G019 组合矩阵 / G020 无 15 套复制）。"""

from __future__ import annotations

import pytest

from metis_academic.composer import WorkflowComposer
from metis_academic.errors import WorkflowError
from metis_academic.models import (
    ArtifactType,
    FundConfig,
    Language,
    ProjectConfig,
    ResearchParadigm,
    StartMode,
    ThesisConfig,
    ThesisLevel,
    WorkflowDefinition,
)


def _cfg(
    artifact: ArtifactType,
    paradigm: ResearchParadigm,
    lang: Language = Language.ZH_CN,
    level: ThesisLevel | None = ThesisLevel.MASTER,
) -> ProjectConfig:
    return ProjectConfig(
        project_id="p",
        project_name="t",
        artifact_type=artifact,
        research_paradigm=paradigm,
        language=lang,
        fund=FundConfig(category="国家社科") if artifact is ArtifactType.FUND else None,
        thesis=ThesisConfig(degree_level=level if artifact is ArtifactType.THESIS else None),
        start_mode=StartMode.FROM_SCRATCH,
    )


@pytest.fixture
def composer():
    return WorkflowComposer()


ALL_COMBOS = [(a, p) for a in ArtifactType for p in ResearchParadigm]
THESIS_LEVELS = [ThesisLevel.BACHELOR, ThesisLevel.MASTER, ThesisLevel.PHD]


def test_fragment_inventory_is_12_no_duplicate_workflows(composer):
    """G020：全部组合只来自 12 个碎片，不存在成套复制的组合工作流。"""
    files = sorted(
        p.relative_to(composer.fragments_dir).as_posix()
        for p in composer.fragments_dir.rglob("*.yaml")
    )
    assert files == [
        "artifact/fund.yaml",
        "artifact/journal.yaml",
        "artifact/thesis.yaml",
        "common.yaml",
        "language/en-US.yaml",
        "language/zh-CN.yaml",
        "level/bachelor.yaml",
        "level/master.yaml",
        "level/phd.yaml",
        "paradigm/qualitative.yaml",
        "paradigm/quantitative.yaml",
        "paradigm/theoretical.yaml",
    ]
    assert len(files) == 12


@pytest.mark.parametrize("artifact,paradigm", ALL_COMBOS)
def test_full_matrix_composes_and_validates(composer, artifact, paradigm):
    """9 种 成果×范式 组合全部可装配且通过校验。"""
    wf = composer.compose(_cfg(artifact, paradigm))
    wf.validate()
    assert [s.id for s in wf.stages] == [f"S{i}" for i in range(11)]
    assert wf.artifact_type == artifact.value
    assert wf.research_paradigm == paradigm.value


def test_thesis_levels_inject_level_rules(composer):
    for level, marker in [
        (ThesisLevel.BACHELOR, "LV-B-001"),
        (ThesisLevel.MASTER, "LV-M-001"),
        (ThesisLevel.PHD, "LV-P-006"),
    ]:
        wf = composer.compose(_cfg(ArtifactType.THESIS, ResearchParadigm.QUANTITATIVE, level=level))
        ids = {r.id for r in wf.task_rules}
        assert marker in ids, level
        assert wf.thesis_level == level.value
    # 博士有完整 6 条追加链
    phd = composer.compose(
        _cfg(ArtifactType.THESIS, ResearchParadigm.THEORETICAL, level=ThesisLevel.PHD)
    )
    assert {f"LV-P-00{i}" for i in range(1, 7)} <= {r.id for r in phd.task_rules}


def test_language_rules_injected(composer):
    zh = composer.compose(
        _cfg(ArtifactType.JOURNAL, ResearchParadigm.QUALITATIVE, lang=Language.ZH_CN)
    )
    assert zh.rules["language"]["citation_style"] == "gb-t7714"
    assert "LV-EN-001" not in {r.id for r in zh.task_rules}
    en = composer.compose(
        _cfg(ArtifactType.JOURNAL, ResearchParadigm.QUALITATIVE, lang=Language.EN_US)
    )
    assert en.rules["language"]["citation_style"] == "apa"
    assert "LV-EN-001" in {r.id for r in en.task_rules}
    assert "journal-phrasing" in en.rules["quality"]["style_checks"]


def test_paradigm_rules_present_in_s5(composer):
    q = composer.compose(_cfg(ArtifactType.JOURNAL, ResearchParadigm.QUANTITATIVE))
    s5_rules = q.rules_for("S5")
    ids = {r.id for r in s5_rules}
    assert {f"QT{i}" for i in range(1, 29)} <= ids
    qual = composer.compose(_cfg(ArtifactType.JOURNAL, ResearchParadigm.QUALITATIVE))
    assert {f"Q{i}" for i in range(1, 19)} <= {r.id for r in qual.rules_for("S5")}
    th = composer.compose(_cfg(ArtifactType.JOURNAL, ResearchParadigm.THEORETICAL))
    assert {f"TH{i}" for i in range(1, 24)} <= {r.id for r in th.rules_for("S5")}


def test_artifact_rules_present(composer):
    f = composer.compose(_cfg(ArtifactType.FUND, ResearchParadigm.QUALITATIVE))
    assert {f"F{i}" for i in range(1, 27)} <= {r.id for r in f.task_rules}
    j = composer.compose(_cfg(ArtifactType.JOURNAL, ResearchParadigm.QUANTITATIVE))
    assert {f"J{i}" for i in range(1, 16)} <= {r.id for r in j.task_rules}
    t = composer.compose(_cfg(ArtifactType.THESIS, ResearchParadigm.THEORETICAL))
    assert {f"T{i}" for i in range(1, 18)} <= {r.id for r in t.task_rules}


def test_stage_merge_unions_skills_and_tools(composer):
    wf = composer.compose(_cfg(ArtifactType.JOURNAL, ResearchParadigm.QUANTITATIVE))
    s5 = wf.stage("S5")
    assert "quantitative-analysis" in s5.skills
    s4 = wf.stage("S4")
    assert "journal-adapter" in s4.skills  # 来自 artifact
    assert "quantitative-analysis" in s4.skills  # 来自 paradigm


def test_fund_is_design_only(composer):
    wf = composer.compose(_cfg(ArtifactType.FUND, ResearchParadigm.QUANTITATIVE))
    assert wf.rules["quality"]["design_only"] is True
    f16 = next(r for r in wf.task_rules if r.id == "F16")
    assert "仅计划" in f16.title


def test_composed_from_records_fragments(composer):
    wf = composer.compose(
        _cfg(
            ArtifactType.THESIS,
            ResearchParadigm.THEORETICAL,
            lang=Language.EN_US,
            level=ThesisLevel.PHD,
        )
    )
    assert wf.composed_from == [
        "common",
        "paradigm/theoretical",
        "artifact/thesis",
        "level/phd",
        "language/en-US",
    ]


def test_roundtrip_through_yaml(composer, tmp_path):
    wf = composer.compose(_cfg(ArtifactType.FUND, ResearchParadigm.THEORETICAL))
    wf2 = WorkflowDefinition.from_yaml(wf.to_yaml())
    assert wf2.to_dict() == wf.to_dict()


def _make_frag_dir(tmp_path, fragments: dict[str, str]) -> __import__("pathlib").Path:
    base = tmp_path / "workflows"
    for name, content in fragments.items():
        p = base / f"{name}.yaml"
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(content, encoding="utf-8")
    return base


def _min_project() -> ProjectConfig:
    return _cfg(ArtifactType.JOURNAL, ResearchParadigm.QUALITATIVE)


def test_conflict_detection_same_id_different_content(tmp_path):
    base = _make_frag_dir(
        tmp_path,
        {
            "common": """
id: common
stages: [{id: S1, name: AUDIT}]
task_rules:
  - {id: X1, stage: S1, title: 甲, procedure: p1}
""",
            "paradigm/qualitative": """
id: qualitative
stages: []
task_rules:
  - {id: X1, stage: S1, title: 乙, procedure: p2}
""",
            "artifact/journal": "id: journal\nstages: []\n",
            "language/zh-CN": "id: zh-CN\nrules: {}\n",
        },
    )
    composer = WorkflowComposer(fragments_dir=base)
    with pytest.raises(WorkflowError, match="冲突"):
        composer.compose(_min_project())


def test_dependency_resolution_unknown_dep(tmp_path):
    base = _make_frag_dir(
        tmp_path,
        {
            "common": """
id: common
stages: [{id: S1, name: AUDIT}]
task_rules:
  - {id: X1, stage: S1, title: 甲, procedure: p1, depends_on: [GHOST]}
""",
            "paradigm/qualitative": "id: qualitative\nstages: []\n",
            "artifact/journal": "id: journal\nstages: []\n",
            "language/zh-CN": "id: zh-CN\nrules: {}\n",
        },
    )
    composer = WorkflowComposer(fragments_dir=base)
    with pytest.raises(WorkflowError, match="GHOST"):
        composer.compose(_min_project())


def test_cycle_detection(tmp_path):
    base = _make_frag_dir(
        tmp_path,
        {
            "common": """
id: common
stages: [{id: S1, name: AUDIT}]
task_rules:
  - {id: A, stage: S1, title: a, procedure: p, depends_on: [B]}
  - {id: B, stage: S1, title: b, procedure: p, depends_on: [A]}
""",
            "paradigm/qualitative": "id: qualitative\nstages: []\n",
            "artifact/journal": "id: journal\nstages: []\n",
            "language/zh-CN": "id: zh-CN\nrules: {}\n",
        },
    )
    composer = WorkflowComposer(fragments_dir=base)
    with pytest.raises(WorkflowError, match="环"):
        composer.compose(_min_project())


def test_topological_order_puts_deps_first(composer):
    wf = composer.compose(_cfg(ArtifactType.JOURNAL, ResearchParadigm.QUANTITATIVE))
    order = WorkflowComposer.topological_order(wf.task_rules)
    pos = {r.id: i for i, r in enumerate(order)}
    for r in wf.task_rules:
        for dep in r.depends_on:
            assert pos[dep] < pos[r.id], f"{dep} 应先于 {r.id}"

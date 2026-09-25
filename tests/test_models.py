"""Phase B 数据模型测试（B020 验收：往返序列化不丢字段、无效 enum 被拒绝）。"""

from __future__ import annotations

import pytest

from metis_academic.models import (
    ArtifactMetadata,
    ArtifactType,
    Evidence,
    FundConfig,
    JournalConfig,
    Language,
    MCPMetadata,
    McpServerInfo,
    McpToolInfo,
    ProjectConfig,
    ProjectStatus,
    ResearchParadigm,
    SkillMetadata,
    Stage,
    StageSpec,
    StartMode,
    Task,
    TaskRule,
    TaskStatus,
    TemplateSource,
    ThesisConfig,
    ThesisLevel,
    Trigger,
    ValidationIssue,
    ValidationResult,
    WorkflowDefinition,
    WorkspaceRef,
)
from metis_academic.models.enums import _STAGE_LABELS

# ---------- ProjectConfig ----------


def _full_project_config() -> ProjectConfig:
    return ProjectConfig(
        project_id="proj-2026-001",
        project_name="数字劳动研究",
        artifact_type=ArtifactType.THESIS,
        research_paradigm=ResearchParadigm.QUANTITATIVE,
        language=Language.ZH_CN,
        fund=FundConfig(category=None, template_source=None),
        journal=JournalConfig(target_journal=None, target_level=None),
        thesis=ThesisConfig(
            degree_level=ThesisLevel.MASTER,
            institution="某大学",
            template_source=TemplateSource.DEFAULT,
        ),
        start_mode=StartMode.FROM_SCRATCH,
        workspace=WorkspaceRef(root="D:/ws/proj-2026-001"),
        status=ProjectStatus(current_stage="S1", current_task="", initialized=True),
    )


def test_project_config_roundtrip_yaml_no_field_loss(tmp_path):
    cfg = _full_project_config()
    y = cfg.to_yaml()
    cfg2 = ProjectConfig.from_yaml(y)
    assert cfg2.to_dict() == cfg.to_dict()
    # §4 结构检查
    d = cfg2.to_dict()
    assert d["artifact_type"] == {"type": "thesis"}
    assert d["research_paradigm"] == {"type": "quantitative"}
    assert d["language"] == {"type": "zh-CN"}
    assert d["start_mode"] == {"type": "from_scratch"}
    assert d["thesis"]["degree_level"] == "master"
    assert d["status"]["initialized"] is True
    # JSON 往返同样不丢
    cfg3 = ProjectConfig.from_json(cfg.to_json())
    assert cfg3.to_dict() == cfg.to_dict()


def test_project_config_invalid_enum_rejected():
    raw = _full_project_config().to_dict()
    raw["artifact_type"]["type"] = "novel"
    with pytest.raises(ValueError):
        ProjectConfig.from_dict(raw)
    raw2 = _full_project_config().to_dict()
    raw2["thesis"]["degree_level"] = "postdoc"
    with pytest.raises(ValueError):
        ProjectConfig.from_dict(raw2)
    raw3 = _full_project_config().to_dict()
    raw3["start_mode"]["type"] = "already_published"
    with pytest.raises(ValueError):
        ProjectConfig.from_dict(raw3)


def test_project_config_validation_rules():
    cfg = _full_project_config()
    cfg.validate()  # 不抛
    bad = _full_project_config()
    bad.thesis.degree_level = None
    with pytest.raises(ValueError, match="degree_level"):
        bad.validate()
    fund_cfg = ProjectConfig(
        project_id="p-fund",
        project_name="基金测试",
        artifact_type=ArtifactType.FUND,
        research_paradigm=ResearchParadigm.QUALITATIVE,
        language=Language.ZH_CN,
        start_mode=StartMode.HAS_TOPIC,
    )
    with pytest.raises(ValueError, match="fund.category"):
        fund_cfg.validate()


def test_project_config_display_summary():
    cfg = _full_project_config()
    s = cfg.display_summary()
    assert "硕士" in s and "定量实证" in s and "中文" in s and "从零开始" in s


# ---------- Task ----------


def _sample_task() -> Task:
    return Task(
        id="T-LIT-001",
        stage="S2",
        section="文献综述",
        title="检索国内文献",
        objective="获取近5年核心文献",
        inputs=["research/selected_topic.md"],
        dependencies=[],
        required_skills=["literature-search"],
        required_tools=["scholar.search"],
        procedure="literature.search",
        procedure_params={"query": "数字劳动", "max_results": 20},
        expected_outputs=["literature/literature_index.md"],
        validation="file_nonempty",
        status=TaskStatus.READY,
    )


def test_task_roundtrip():
    t = _sample_task()
    assert Task.from_yaml(t.to_yaml()).to_dict() == t.to_dict()
    assert Task.from_json(t.to_json()).to_dict() == t.to_dict()


def test_task_status_enum_only_seven():
    assert {s.value for s in TaskStatus} == {
        "pending",
        "ready",
        "running",
        "blocked",
        "failed",
        "passed",
        "skipped",
    }
    for vague in ("almost_done", "probably_done", "looks_good"):
        with pytest.raises(ValueError):
            TaskStatus(vague)


def test_task_validation():
    t = _sample_task()
    t.validate()
    t2 = _sample_task()
    t2.id = "T LIT 001"  # 含空白
    with pytest.raises(ValueError, match="空白"):
        t2.validate()
    t3 = _sample_task()
    t3.stage = "S99"
    with pytest.raises(ValueError, match="stage"):
        t3.validate()


def test_task_unknown_fields_tracked():
    d = _sample_task().to_dict()
    d["weird_field"] = 1
    t = Task.from_dict(d)
    assert getattr(t, "unknown_fields", None) == ["weird_field"]


# ---------- Evidence ----------


def test_evidence_roundtrip_and_validation():
    e = Evidence(
        task_id="T-LIT-001",
        timestamp="2026-09-25T10:00:00",
        action="literature.search",
        inputs=["query:数字劳动"],
        outputs=["literature/literature_index.md"],
        validation="file_nonempty",
        status="passed",
    )
    assert Evidence.from_json(e.to_json()).to_dict() == e.to_dict()
    e.validate()
    raw = {k: v for k, v in e.to_dict().items() if k != "schema_version"}
    raw["status"] = "probably_done"
    bad = Evidence(**raw)
    with pytest.raises(ValueError):
        bad.validate()


# ---------- Skill / MCP ----------


def test_skill_metadata_trigger_roundtrip():
    s = SkillMetadata(
        id="quantitative-analysis",
        path="skills/quantitative-analysis",
        triggers=[Trigger.parse("paradigm:quantitative"), Trigger.parse("stage:S5")],
        persistent=False,
    )
    s.validate()
    s2 = SkillMetadata.from_yaml(s.to_yaml())
    assert [t.to_string() for t in s2.triggers] == ["paradigm:quantitative", "stage:S5"]
    assert s2.to_dict() == s.to_dict()


def test_skill_trigger_invalid():
    with pytest.raises(ValueError):
        Trigger(kind="vibe", value="x").validate()
    with pytest.raises(ValueError):
        Trigger(kind="stage", value="").validate()


def test_mcp_metadata_roundtrip():
    reg = MCPMetadata(
        servers=[
            McpServerInfo(
                id="scholar",
                tools=[McpToolInfo(name="scholar.search", stages=["S2"])],
            ),
            McpServerInfo(id="filesystem", tools=[McpToolInfo(name="fs.write", dangerous=True)]),
        ]
    )
    reg.validate()
    reg2 = MCPMetadata.from_yaml(reg.to_yaml())
    assert reg2.to_dict() == reg.to_dict()
    srv, tool = reg2.find_tool("scholar.search")
    assert srv.id == "scholar" and tool.stages == ["S2"]
    assert reg2.find_tool("nope") == (None, None)


def test_mcp_duplicate_server_rejected():
    reg = MCPMetadata(servers=[McpServerInfo(id="a"), McpServerInfo(id="a")])
    with pytest.raises(ValueError, match="重复"):
        reg.validate()


# ---------- Artifact / Validation ----------


def test_artifact_metadata():
    a = ArtifactMetadata(
        path="results/model.rds",
        kind="data",
        task_id="T-QT-014",
        sha256="deadbeef",
        bytes=1024,
        generated_by="quant.engine",
    )
    a.validate()
    assert ArtifactMetadata.from_yaml(a.to_yaml()).to_dict() == a.to_dict()
    with pytest.raises(ValueError):
        ArtifactMetadata(path="x", kind="movie").validate()


def test_validation_result_aggregation():
    r = ValidationResult(target="T-QT-014")
    r.add("file_exists", True)
    r.add("file_nonempty", False, "输出为空", target="results/t.md")
    r.add("hash_match", False, "哈希不一致", severity="warning")
    assert not r.passed
    assert len(r.errors) == 1 and len(r.warnings) == 1
    assert r.rules_run == ["file_exists", "file_nonempty", "hash_match"]
    assert ValidationResult.from_json(r.to_json()).to_dict() == r.to_dict()
    with pytest.raises(ValueError):
        ValidationIssue(rule_id="x", severity="fatal").validate()


# ---------- Workflow ----------


def test_workflow_definition_roundtrip_and_deps():
    wf = WorkflowDefinition(
        composed_from=["common", "quantitative", "journal", "zh-CN"],
        artifact_type="journal",
        research_paradigm="quantitative",
        language="zh-CN",
        stages=[StageSpec(id="S5", name="RESEARCH_EXECUTION", skills=["quant"])],
        task_rules=[
            TaskRule(
                id="QT-001",
                stage="S5",
                title="描述统计",
                procedure="quant.descriptive",
                depends_on=["QT-000"],
            ),
            TaskRule(id="QT-000", stage="S5", title="数据清洗", procedure="quant.clean"),
        ],
        rules={"quality": {"min_words": 8000}},
    )
    wf.validate()
    assert WorkflowDefinition.from_yaml(wf.to_yaml()).to_dict() == wf.to_dict()
    # 前向依赖也能解析（known 为全量 id 集合）
    bad = WorkflowDefinition(
        task_rules=[TaskRule(id="A", stage="S5", title="t", procedure="p", depends_on=["GHOST"])]
    )
    with pytest.raises(ValueError, match="GHOST"):
        bad.validate()
    with pytest.raises(ValueError):
        StageSpec(id="S11", name="X").validate()


# ---------- Stage ----------


def test_stage_ordering_and_labels():
    assert [s.value for s in Stage.ordered()] == [f"S{i}" for i in range(11)]
    assert Stage.S0_PROJECT_CONFIG.label == "PROJECT_CONFIG"
    assert len(_STAGE_LABELS) == 11
    assert Stage("S10").label == "DELIVERY"

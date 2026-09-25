"""Phase C Workspace Manager 测试。"""

from __future__ import annotations

import pytest

from metis_academic.errors import WorkspaceError
from metis_academic.models import ArtifactType, Language, ProjectConfig, ResearchParadigm, StartMode
from metis_academic.workspace import EVIDENCE_JSONL, STANDARD_DIRS, WorkspaceManager, file_sha256


def _cfg(pid="proj-1") -> ProjectConfig:
    return ProjectConfig(
        project_id=pid,
        project_name="测试项目",
        artifact_type=ArtifactType.JOURNAL,
        research_paradigm=ResearchParadigm.QUANTITATIVE,
        language=Language.ZH_CN,
        start_mode=StartMode.FROM_SCRATCH,
    )


def test_create_fresh_workspace(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    assert not ws.exists()
    ws.create(_cfg())
    assert ws.exists()
    for d in STANDARD_DIRS:
        assert (tmp_path / "ws" / d).is_dir(), d
    assert (tmp_path / "ws" / ".metis" / "project.yaml").is_file()
    assert (tmp_path / "ws" / "data" / "README.md").is_file()


def test_reinit_idempotent_no_data_loss(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    ws.create(_cfg())
    user_file = tmp_path / "ws" / "inputs" / "user-files" / "notes.txt"
    user_file.write_text("用户手稿内容-不可破坏", encoding="utf-8")
    ev_file = tmp_path / "ws" / ".metis" / EVIDENCE_JSONL
    ev_file.write_text('{"task_id":"x"}\n', encoding="utf-8")

    ws.create(_cfg())  # 重复初始化
    assert user_file.read_text(encoding="utf-8") == "用户手稿内容-不可破坏"
    assert "task_id" in ev_file.read_text(encoding="utf-8")
    assert ws.read_project().project_id == "proj-1"


def test_project_roundtrip_and_workspace_root_fill(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    ws.create(_cfg())
    cfg = ws.read_project()
    assert cfg.workspace.root == str((tmp_path / "ws").resolve())
    cfg.project_name = "改名"
    ws.write_project(cfg)
    assert ws.read_project().project_name == "改名"


def test_state_and_workflow_io(tmp_path):
    from metis_academic.models import StageSpec, TaskRule, WorkflowDefinition

    ws = WorkspaceManager(tmp_path / "ws")
    ws.create()
    ws.write_state({"current_stage": "S2", "history": []})
    assert ws.read_state()["current_stage"] == "S2"
    wf = WorkflowDefinition(
        composed_from=["common"],
        stages=[StageSpec(id="S1", name="X")],
        task_rules=[TaskRule(id="T1", stage="S1", title="t", procedure="p")],
    )
    ws.write_workflow(wf)
    assert ws.read_workflow().composed_from == ["common"]


def test_task_state_io(tmp_path):
    from metis_academic.models import Task

    ws = WorkspaceManager(tmp_path / "ws")
    ws.create()
    ws.write_task_state([Task(id="T-A-001", stage="S4", title="x", procedure="p")])
    data = ws.read_task_state()
    assert data["tasks"]["T-A-001"]["title"] == "x"


def test_evidence_append_and_read(tmp_path):
    from metis_academic.models import Evidence

    ws = WorkspaceManager(tmp_path / "ws")
    ws.create()
    ws.append_evidence(
        Evidence(
            task_id="T-1",
            timestamp="2026-09-25T00:00:00",
            action="a",
            outputs=["f.md"],
            status="passed",
        )
    )
    ws.append_evidence(
        Evidence(task_id="T-2", timestamp="2026-09-25T00:00:01", action="b", status="passed")
    )
    assert len(ws.read_evidence()) == 2
    assert len(ws.read_evidence(task_id="T-1")) == 1
    with pytest.raises(ValueError):
        ws.append_evidence(Evidence(task_id="", timestamp="", action=""))


def test_safe_write_conflict_and_versioned(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    ws.create()
    p = ws.safe_write("results/t.md", "v1")
    assert p.read_text(encoding="utf-8") == "v1"
    with pytest.raises(WorkspaceError, match="已存在"):
        ws.safe_write("results/t.md", "v2")
    p2 = ws.versioned_write("results/t.md", "v2")
    assert p2.name == "t_v1.md"
    assert p2.read_text(encoding="utf-8") == "v2"


def test_safe_write_rejects_escape(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    ws.create()
    with pytest.raises(WorkspaceError, match="越界"):
        ws.safe_write("../evil.txt", "x")


def test_scan_detects_materials(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    ws.create()
    (tmp_path / "ws" / "inputs" / "existing-data" / "survey.csv").write_text("a,b\n1,2\n")
    (tmp_path / "ws" / "inputs" / "user-files" / "申报书模板.docx").write_bytes(b"PK\x03\x04")
    (tmp_path / "ws" / "inputs" / "user-files" / "初稿.md").write_text("# 草稿")
    (tmp_path / "ws" / "topics" / "topic_001.md").write_text("题目：x")
    rep = ws.scan()
    assert rep["data_files"][0]["path"].endswith("survey.csv")
    assert any("模板" in t["path"] for t in rep["templates"])
    assert any("初稿" in d["path"] for d in rep["drafts"])
    assert rep["topics"] == ["topics/topic_001.md"]
    assert "已有材料" in ws.summary() or "尚未初始化" not in ws.summary()


def test_summary_uninitialized(tmp_path):
    ws = WorkspaceManager(tmp_path / "empty")
    (tmp_path / "empty").mkdir()
    s = ws.summary()
    assert "尚未初始化" in s


def test_backup_metis(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    ws.create(_cfg())
    dst = ws.backup_metis()
    assert (dst / "project.yaml").is_file()


def test_file_sha256(tmp_path):
    f = tmp_path / "x.bin"
    f.write_bytes(b"123")
    import hashlib

    assert file_sha256(f) == hashlib.sha256(b"123").hexdigest()

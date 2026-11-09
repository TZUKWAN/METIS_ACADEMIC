from __future__ import annotations

import pytest

from metis_academic.errors import TaskExecutionError
from metis_academic.executor import ExecutionContext
from metis_academic.literature import LiteratureRecord
from metis_academic.model_backend import HarnessModelBackend, NoModelBackend, set_model_backend
from metis_academic.models import (
    ArtifactType,
    Language,
    ProjectConfig,
    ResearchParadigm,
    StartMode,
    Task,
)
from metis_academic.runtime import build_runtime_actions
from metis_academic.state import StateManager
from metis_academic.workspace import WorkspaceManager


def test_theoretical_claims_fail_closed_without_verified_literature(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    cfg = ProjectConfig(
        project_id="runtime-guard",
        project_name="理论项目",
        artifact_type=ArtifactType.JOURNAL,
        research_paradigm=ResearchParadigm.THEORETICAL,
        language=Language.ZH_CN,
        start_mode=StartMode.FROM_SCRATCH,
    )
    ws.create(cfg)
    actions = build_runtime_actions(ws, cfg)
    task = Task(
        id="TH-TEST-CLAIMS",
        stage="S5",
        section="理论命题",
        title="提取理论命题",
        procedure="th.extract_claims",
        expected_outputs=["analysis/theoretical/core_claims.md"],
    )
    ctx = ExecutionContext(ws=ws, sm=StateManager(ws), cfg=cfg)
    with pytest.raises(TaskExecutionError, match="已核验文献"):
        actions.get(task.procedure)(task, ctx)
    assert not (ws.root / "analysis" / "theoretical" / "core_claims.md").exists()


def test_writing_rejects_malformed_structured_response_without_raw_exception(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    cfg = ProjectConfig(
        project_id="runtime-writing-guard",
        project_name="写作项目",
        artifact_type=ArtifactType.JOURNAL,
        research_paradigm=ResearchParadigm.QUALITATIVE,
        language=Language.ZH_CN,
        start_mode=StartMode.FROM_SCRATCH,
    )
    ws.create(cfg)
    actions = build_runtime_actions(ws, cfg)
    task = Task(
        id="WRITING-TEST",
        stage="S7",
        section="引言",
        title="写作",
        procedure="writing.section",
        procedure_params={"section": "引言"},
        expected_outputs=["manuscript/sections/INTRO-001.md"],
    )
    ctx = ExecutionContext(ws=ws, sm=StateManager(ws), cfg=cfg)
    set_model_backend(HarnessModelBackend(lambda *_: ("正文", ["畸形结构"])))
    try:
        with pytest.raises(TaskExecutionError, match="结构化"):
            actions.get(task.procedure)(task, ctx)
    finally:
        set_model_backend(NoModelBackend())


def test_writing_rejects_lieflat_style_marker_and_keeps_sidecar(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    cfg = ProjectConfig(
        project_id="runtime-style-guard",
        project_name="风格项目",
        artifact_type=ArtifactType.JOURNAL,
        research_paradigm=ResearchParadigm.QUALITATIVE,
        language=Language.ZH_CN,
        start_mode=StartMode.FROM_SCRATCH,
    )
    ws.create(cfg)
    actions = build_runtime_actions(ws, cfg)
    task = Task(
        id="WRITING-STYLE-TEST",
        stage="S7",
        section="引言",
        title="写作",
        procedure="writing.section",
        procedure_params={"section": "引言"},
        expected_outputs=["manuscript/sections/INTRO-STYLE.md"],
    )
    ctx = ExecutionContext(ws=ws, sm=StateManager(ws), cfg=cfg)
    body = "说白了，这个问题需要重新界定。"
    structured = {
        "text": body,
        "claims": [{"claim": body, "evidence": ["research"], "citations": []}],
        "citations": [],
    }
    set_model_backend(HarnessModelBackend(lambda *_: (body, structured)))
    try:
        with pytest.raises(TaskExecutionError, match="正文卫生"):
            actions.get(task.procedure)(task, ctx)
    finally:
        set_model_backend(NoModelBackend())
    sidecar = ws.root / ".metis" / "logs" / "writing" / f"{task.id}.json"
    assert sidecar.is_file()
    assert "禁用起手式" in sidecar.read_text(encoding="utf-8")
    assert not (ws.root / task.expected_outputs[0]).exists()


def test_literature_search_fails_closed_when_source_returns_no_records(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    cfg = ProjectConfig(
        project_id="runtime-literature-guard",
        project_name="文献项目",
        artifact_type=ArtifactType.JOURNAL,
        research_paradigm=ResearchParadigm.QUALITATIVE,
        language=Language.ZH_CN,
        start_mode=StartMode.FROM_SCRATCH,
    )
    ws.create(cfg)
    source_root = tmp_path / "paper-search-pro"
    (source_root / "scripts").mkdir(parents=True)
    (source_root / "scripts" / "agent_search.py").write_text("# marker\n", encoding="utf-8")

    def empty_runner(cmd, **kwargs):
        import subprocess

        return subprocess.CompletedProcess(cmd, 0, "", "provider unavailable")

    actions = build_runtime_actions(
        ws,
        cfg,
        lit_kwargs={"paper-search-pro": {"root": source_root, "runner": empty_runner}},
    )
    task = Task(
        id="LIT-EMPTY",
        stage="S2",
        section="文献",
        title="检索",
        procedure="literature.search",
        procedure_params={"query": "平台治理"},
        expected_outputs=["literature/literature_index.md"],
    )
    ctx = ExecutionContext(ws=ws, sm=StateManager(ws), cfg=cfg)
    with pytest.raises(TaskExecutionError, match="未返回任何记录"):
        actions.get(task.procedure)(task, ctx)


def test_literature_search_honors_workspace_source_settings(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    cfg = ProjectConfig(
        project_id="runtime-literature-settings",
        project_name="文献设置项目",
        artifact_type=ArtifactType.JOURNAL,
        research_paradigm=ResearchParadigm.QUALITATIVE,
        language=Language.ZH_CN,
        start_mode=StartMode.FROM_SCRATCH,
    )
    ws.create(cfg)
    (ws.root / "metis.settings.yaml").write_text("search_sources: [web]\n", encoding="utf-8")

    def search_fn(query):
        return [
            LiteratureRecord(
                title="Configured source result",
                authors=["Test Author"],
                year=2024,
                source="web",
                retrieved_at="2026-10-02T00:00:00+00:00",
            )
        ]

    actions = build_runtime_actions(ws, cfg, lit_kwargs={"web": {"search_fn": search_fn}})
    task = Task(
        id="LIT-SETTINGS",
        stage="S2",
        section="文献",
        title="检索",
        procedure="literature.search",
        procedure_params={"query": "configured source"},
        expected_outputs=["literature/literature_index.md"],
    )
    ctx = ExecutionContext(ws=ws, sm=StateManager(ws), cfg=cfg)
    actions.get(task.procedure)(task, ctx)
    assert (ws.root / "literature" / "records.jsonl").read_text(encoding="utf-8").count(
        "Configured source result"
    ) == 1

"""Phase E /metis 命令测试（E001–E012，composer 用 stub 注入）。"""

from __future__ import annotations

from metis_academic.adapters import FilesystemAdapter
from metis_academic.command import MetisCommand, new_project_id
from metis_academic.models import (
    ArtifactType,
    ProjectConfig,
    Stage,
    WorkflowDefinition,
)
from metis_academic.workspace import WorkspaceManager


class StubComposer:
    """最小 composer 替身（Phase G 提供真实现）。"""

    def __init__(self):
        self.calls: list[ProjectConfig] = []

    def compose(self, cfg: ProjectConfig) -> WorkflowDefinition:
        self.calls.append(cfg)
        return WorkflowDefinition(
            composed_from=["stub"],
            artifact_type=cfg.artifact_type.value,
            research_paradigm=cfg.research_paradigm.value,
            language=cfg.language.value,
            stages=[],
            task_rules=[],
        )


def _answers_thesis() -> list[str]:
    return ["thesis", "quantitative", "zh-CN", "master", "default", "from_scratch"]


def _make_adapter(root) -> FilesystemAdapter:
    ad = FilesystemAdapter(
        root,
        answers=_answers_thesis(),
        texts={"学校/机构名称（可留空）": "某大学", "项目名称": "测试论文项目"},
        confirms=[True],
    )
    return ad


def test_new_project_id_format():
    pid = new_project_id()
    assert re_match(pid)


def re_match(pid: str) -> bool:
    import re

    return bool(re.fullmatch(r"metis-\d{8}-[0-9a-f]{6}", pid))


def test_metis_init_new_project(tmp_path):
    ad = _make_adapter(tmp_path)
    composer = StubComposer()
    cmd = MetisCommand(ad, composer=composer)
    result = cmd.run(root=tmp_path / "proj")
    assert result.status == "initialized"
    assert result.stage is Stage.S1_WORKSPACE_AUDIT
    assert composer.calls and composer.calls[0].artifact_type is ArtifactType.THESIS

    ws = WorkspaceManager(tmp_path / "proj")
    assert ws.exists()
    cfg = ws.read_project()
    assert cfg.status.initialized is True
    assert cfg.status.current_stage == "S1"
    assert cfg.project_id.startswith("metis-")
    # workflow.yaml / registries / state 已写入
    assert (ws.metis_dir / "workflow.yaml").is_file()
    assert (ws.metis_dir / "skill-registry.yaml").is_file()
    assert (ws.metis_dir / "mcp-registry.yaml").is_file()
    assert (ws.metis_dir / "state.yaml").is_file()
    state = ws.read_state()
    assert state["current_stage"] == "S1"
    # §34 摘要样式
    assert any("项目已初始化" in m for m in ad.messages)
    assert any("硕士" in m and "定量实证" in m for m in ad.messages)
    # /metis 命令已注册
    assert ad._commands.get("/metis") == "进入 METIS ACADEMIC 研究模式"


def test_metis_resume_existing_project(tmp_path):
    ad = _make_adapter(tmp_path)
    MetisCommand(ad, composer=StubComposer()).run(root=tmp_path / "proj")

    ad2 = FilesystemAdapter(tmp_path / "proj")  # 无需答案
    result = MetisCommand(ad2, composer=StubComposer()).run(root=tmp_path / "proj")
    assert result.status == "resumed"
    assert result.stage is Stage.S1_WORKSPACE_AUDIT
    assert any("恢复" in m or "已有 METIS 项目" in m for m in ad2.messages)


def test_metis_resume_recovers_interrupted(tmp_path):
    ad = _make_adapter(tmp_path)
    MetisCommand(ad, composer=StubComposer()).run(root=tmp_path / "proj")
    ws = WorkspaceManager(tmp_path / "proj")
    from metis_academic.models import Task
    from metis_academic.state import StateManager

    sm = StateManager(ws)
    sm.tasks.upsert(Task(id="T-S1-001", stage="S1", title="审计", procedure="p"))
    sm.tasks.set_status("T-S1-001", "ready")
    sm.tasks.set_status("T-S1-001", "running")
    # 模拟崩溃：新实例直接跑 /metis
    ad2 = FilesystemAdapter(tmp_path / "proj")
    result = MetisCommand(ad2, composer=StubComposer()).run(root=tmp_path / "proj")
    assert result.resumed_info["recovered_tasks"] == ["T-S1-001"]
    sm3 = StateManager(ws)  # 全新实例验证磁盘状态
    assert sm3.tasks.get("T-S1-001").status.value == "ready"


def test_metis_resume_composes_missing_workflow(tmp_path):
    ad = _make_adapter(tmp_path)
    MetisCommand(ad, composer=StubComposer()).run(root=tmp_path / "proj")
    ws = WorkspaceManager(tmp_path / "proj")
    (ws.metis_dir / "workflow.yaml").unlink()  # 丢失工作流
    composer = StubComposer()
    ad2 = FilesystemAdapter(tmp_path / "proj")
    MetisCommand(ad2, composer=composer).run(root=tmp_path / "proj")
    assert len(composer.calls) == 1  # 恢复时补装配
    assert (ws.metis_dir / "workflow.yaml").is_file()

"""Phase Q + R 测试：Executor 与 Validation Engine。"""

from __future__ import annotations

import pytest

from metis_academic.adapters import FilesystemAdapter
from metis_academic.executor import ActionRegistry, TaskExecutor, make_file_writer_action
from metis_academic.models import Stage, Task
from metis_academic.state import StateManager
from metis_academic.validation import ValidationEngine
from metis_academic.workspace import WorkspaceManager


@pytest.fixture
def env(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    ws.create()
    sm = StateManager(ws)
    ad = FilesystemAdapter(ws.root)
    return ws, sm, ad


def _mk_task(tid="T-X-001", stage="S7", **kw) -> Task:
    base = dict(
        id=tid,
        stage=stage,
        section="测试",
        title="写点东西",
        procedure="write.section",
        expected_outputs=["manuscript/x.md"],
        validation="file_nonempty",
    )
    base.update(kw)
    return Task(**base)


def _setup_actions() -> ActionRegistry:
    reg = ActionRegistry()
    reg.register(
        "write.section", make_file_writer_action("# {task.title}\n\n{task.id} 正文内容。\n")
    )
    reg.register("write.empty", lambda t, c: [])
    reg.register("write.boom", lambda t, c: (_ for _ in ()).throw(RuntimeError("boom")))
    return reg


def test_validate_task_pass_and_fail(env):
    ws, sm, _ = env
    ve = ValidationEngine(ws)
    t = _mk_task()
    (ws.root / "manuscript").mkdir(exist_ok=True)
    (ws.root / "manuscript" / "x.md").write_text("内容", encoding="utf-8")
    assert ve.validate_task(t).passed
    (ws.root / "manuscript" / "x.md").write_text("", encoding="utf-8")
    assert not ve.validate_task(t).passed
    t2 = _mk_task(validation="ghost.rule")
    r = ve.validate_task(t2)
    assert not r.passed and "未知验证规则" in r.errors[0].message  # fail-closed


def test_unknown_action_fails_not_crashes(env):
    ws, sm, ad = env
    sm.tasks.upsert(_mk_task(procedure="no.such"))
    sm.tasks.set_status("T-X-001", "ready")
    ex = TaskExecutor(ws, sm, actions=ActionRegistry())
    status = ex.run_task("T-X-001")
    assert status.value == "ready"  # 首次失败自动排队重试
    assert sm.tasks.get("T-X-001").retry_count == 1
    assert ws.read_evidence(task_id="T-X-001")[-1].status == "failed"


def test_executor_happy_path_with_evidence(env):
    ws, sm, ad = env
    t = _mk_task()
    sm.tasks.upsert(t)
    sm.tasks.set_status(t.id, "ready")
    ex = TaskExecutor(ws, sm, actions=_setup_actions(), adapter=ad)
    status = ex.run_task(t.id)
    assert status.value == "passed"
    assert (ws.root / "manuscript" / "x.md").is_file()
    ev = ws.read_evidence(task_id=t.id)
    assert any(e.status == "passed" and e.action == "write.section" for e in ev)
    assert any(e.action.startswith("artifact:manuscript/x.md") for e in ev)
    assert sm.tasks.get(t.id).status.value == "passed"
    assert any("通过验证" in m for m in ad.messages)
    # 技能与工具留痕
    assert ad.exposed_tools  # MCP 已暴露


def test_executor_failure_then_retry_then_blocked(env):
    ws, sm, ad = env
    t = _mk_task(procedure="write.boom", max_retries=1)
    sm.tasks.upsert(t)
    sm.tasks.set_status(t.id, "ready")
    ex = TaskExecutor(ws, sm, actions=_setup_actions(), adapter=ad)
    ex.run_task(t.id)  # failed → retry → ready
    assert sm.tasks.get(t.id).status.value == "ready"
    assert sm.tasks.get(t.id).retry_count == 1
    ex.run_task(t.id)  # 再 failed → 超 max_retries → blocked
    assert sm.tasks.get(t.id).status.value == "blocked"
    ev = ws.read_evidence(task_id=t.id)
    assert any(e.status == "failed" for e in ev)


def test_executor_validation_failure_records(env):
    ws, sm, _ = env
    t = _mk_task(procedure="write.empty")  # 不写文件 → 验证失败
    sm.tasks.upsert(t)
    sm.tasks.set_status(t.id, "ready")
    ex = TaskExecutor(ws, sm, actions=_setup_actions())
    ex.run_task(t.id)
    assert sm.tasks.get(t.id).status.value == "ready"  # 进入重试队列


def test_dependency_gate_blocks(env):
    ws, sm, _ = env
    a = _mk_task("T-X-001")
    b = _mk_task("T-X-002", dependencies=["T-X-001"])
    for t in (a, b):
        sm.tasks.upsert(t)
        sm.tasks.set_status(t.id, "ready")
    ex = TaskExecutor(ws, sm, actions=_setup_actions())
    status = ex.run_task("T-X-002")
    assert status.value == "blocked"
    assert "依赖未满足" in (sm.tasks.get("T-X-002").error or "")


def test_run_stage_transitions_on_complete(env):
    ws, sm, ad = env
    sm.transition(Stage.S1_WORKSPACE_AUDIT)
    a = _mk_task("T-S-001", stage="S1")
    b = _mk_task("T-S-002", stage="S1", dependencies=["T-S-001"])
    for t in (a, b):
        sm.tasks.upsert(t)
        sm.tasks.set_status(t.id, "ready")
    ex = TaskExecutor(ws, sm, actions=_setup_actions(), adapter=ad)
    report = ex.run_stage("S1")
    assert report["complete"]
    assert report["validation"].passed
    assert sm.current_stage is Stage.S2_LITERATURE_SEARCH  # 自动进入下一阶段
    ev = ws.read_evidence()
    assert any(e.task_id == "STAGE:S1" for e in ev)


def test_stage_not_complete_no_transition(env):
    ws, sm, _ = env
    sm.transition(Stage.S1_WORKSPACE_AUDIT)
    a = _mk_task("T-S-001", stage="S1")
    b = _mk_task(
        "T-S-002",
        stage="S1",
        dependencies=["T-S-001"],
        procedure="write.boom",
        failure_action="manual",
    )
    sm.tasks.upsert(a)
    sm.tasks.upsert(b)
    sm.tasks.set_status(a.id, "ready")
    sm.tasks.set_status(b.id, "ready")
    ex = TaskExecutor(ws, sm, actions=_setup_actions())
    report = ex.run_stage("S1")
    assert not report["complete"]
    assert "T-S-002" in report["blocked"]
    assert sm.current_stage is Stage.S1_WORKSPACE_AUDIT


def test_validation_stage_detects_incomplete(env):
    ws, sm, _ = env
    sm.transition(Stage.S1_WORKSPACE_AUDIT)
    a = _mk_task("T-S-001", stage="S1")
    sm.tasks.upsert(a)  # pending
    ve = ValidationEngine(ws)
    r = ve.validate_stage("S1")
    assert not r.passed


def test_validation_report_written(env):
    ws, sm, _ = env
    ve = ValidationEngine(ws)
    t = _mk_task()
    (ws.root / "manuscript").mkdir(exist_ok=True)
    (ws.root / "manuscript" / "x.md").write_text("ok", encoding="utf-8")
    r = ve.validate_task(t)
    p = ve.write_report([r], "reviews/validation-report.md")
    text = p.read_text(encoding="utf-8")
    assert "T-X-001" in text and "PASS" in text


def test_manual_intervention_message(env):
    ws, sm, ad = env
    t = _mk_task(procedure="write.boom", failure_action="manual")
    sm.tasks.upsert(t)
    sm.tasks.set_status(t.id, "ready")
    ex = TaskExecutor(ws, sm, actions=_setup_actions(), adapter=ad)
    ex.run_task(t.id)
    assert any("人工介入" in m for m in ad.messages)
    assert sm.tasks.get(t.id).status.value == "failed"  # manual 不自动重试

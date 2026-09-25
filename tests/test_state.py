"""Phase D State Manager 测试（D015）。"""

from __future__ import annotations

import pytest

from metis_academic.errors import StateError
from metis_academic.models import Stage, Task, TaskStatus
from metis_academic.state import StateManager, TaskStore
from metis_academic.workspace import WorkspaceManager


@pytest.fixture
def sm(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    ws.create()
    return StateManager(ws)


def test_initial_stage_is_s0(sm):
    assert sm.current_stage is Stage.S0_PROJECT_CONFIG


def test_legal_advance_chain(sm):
    for target in (Stage.S1_WORKSPACE_AUDIT, Stage.S2_LITERATURE_SEARCH, Stage.S3_TOPIC_SELECTION):
        sm.transition(target)
    assert sm.current_stage is Stage.S3_TOPIC_SELECTION
    hist = sm.load()["stage_history"]
    assert [h["stage"] for h in hist] == ["S1", "S2", "S3"]
    # 上一条已闭合 exited_at
    assert hist[-1]["exited_at"] is None
    assert hist[0]["exited_at"] is not None


def test_illegal_jump_rejected(sm):
    with pytest.raises(StateError, match="非法阶段迁移"):
        sm.transition(Stage.S7_WRITING)
    assert sm.current_stage is Stage.S0_PROJECT_CONFIG


def test_backtrack_allowed(sm):
    sm.transition(Stage.S1_WORKSPACE_AUDIT)
    sm.transition(Stage.S2_LITERATURE_SEARCH)
    sm.transition(Stage.S1_WORKSPACE_AUDIT, note="返工")
    assert sm.current_stage is Stage.S1_WORKSPACE_AUDIT


def test_transition_persists_after_reload(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    ws.create()
    sm1 = StateManager(ws)
    sm1.transition(Stage.S1_WORKSPACE_AUDIT)
    sm2 = StateManager(ws)  # 新实例=模拟重启
    assert sm2.current_stage is Stage.S1_WORKSPACE_AUDIT


def _mk_tasks(sm: StateManager) -> TaskStore:
    sm.tasks.upsert(Task(id="T-A-001", stage="S4", title="第一步", procedure="p.a"))
    sm.tasks.upsert(
        Task(id="T-A-002", stage="S4", title="第二步", procedure="p.b", dependencies=["T-A-001"])
    )
    sm.tasks.upsert(
        Task(id="T-A-003", stage="S4", title="第三步", procedure="p.c", dependencies=["T-A-002"])
    )
    return sm.tasks


def test_task_status_transitions_and_history(sm):
    tasks = _mk_tasks(sm)
    tasks.set_status("T-A-001", "ready")
    tasks.set_status("T-A-001", "running")
    tasks.set_status("T-A-001", "passed")
    assert sm.current_task == ""
    hist = sm.load()["task_history"]
    assert hist[-1]["action"] == "running->passed"


def test_illegal_task_transition_rejected(sm):
    tasks = _mk_tasks(sm)
    with pytest.raises(StateError, match="非法任务迁移"):
        tasks.set_status("T-A-001", "passed")  # pending → passed 不合法
    with pytest.raises(StateError):
        tasks.set_status("T-A-001", "almost_done")


def test_retry_count_and_max_retry_blocked(sm):
    tasks = _mk_tasks(sm)
    t = tasks.get("T-A-001")
    t.max_retries = 1
    tasks.upsert(t)  # get 返回副本，需显式持久化
    tasks.set_status("T-A-001", "ready")
    tasks.set_status("T-A-001", "running")
    tasks.set_status("T-A-001", "failed", error="第一次失败")
    assert tasks.get("T-A-001").error == "第一次失败"
    tasks.set_status("T-A-001", "ready")  # retry_count=1
    tasks.set_status("T-A-001", "running")
    tasks.set_status("T-A-001", "failed")
    tasks.set_status("T-A-001", "ready")  # 超过 max_retries → blocked
    assert tasks.get("T-A-001").status is TaskStatus.BLOCKED


def test_blocked_resume_and_skip(sm):
    tasks = _mk_tasks(sm)
    tasks.set_status("T-A-001", "ready")
    tasks.set_status("T-A-001", "blocked")
    tasks.set_status("T-A-001", "ready")
    tasks.set_status("T-A-002", "skipped")
    assert tasks.get("T-A-002").status is TaskStatus.SKIPPED


def test_next_ready_respects_dependencies(sm):
    tasks = _mk_tasks(sm)
    for t in tasks.all():
        tasks.set_status(t.id, "ready")
    nxt = tasks.next_ready("S4")
    assert nxt.id == "T-A-001"
    tasks.set_status("T-A-001", "running")
    tasks.set_status("T-A-001", "passed")
    assert tasks.next_ready("S4").id == "T-A-002"
    tasks.set_status("T-A-002", "running")
    tasks.set_status("T-A-002", "passed")
    tasks.set_status("T-A-003", "running")
    assert tasks.next_ready("S4") is None
    assert not tasks.stage_complete("S4")  # running 未通过，阶段未完成
    tasks.set_status("T-A-003", "passed")
    assert tasks.stage_complete("S4")


def test_next_ready_blocked_by_unmet_dependency(sm):
    tasks = _mk_tasks(sm)
    for t in tasks.all():
        tasks.set_status(t.id, "ready")
    # T-A-001 保持 ready 但未通过；002 依赖它 → next_ready 应返回 001
    assert tasks.next_ready("S4").id == "T-A-001"


def test_resume_and_crash_recovery(tmp_path):
    ws = WorkspaceManager(tmp_path / "ws")
    ws.create()
    sm = StateManager(ws)
    sm.transition(Stage.S1_WORKSPACE_AUDIT)
    sm.tasks.upsert(Task(id="T-B-001", stage="S1", title="审计", procedure="p"))
    sm.tasks.set_status("T-B-001", "ready")
    sm.tasks.set_status("T-B-001", "running")
    sm.checkpoint(note="崩溃前")

    sm2 = StateManager(ws)
    info = sm2.resume()
    # 无证据 → 重置 ready，重新排队
    assert "T-B-001" in info["recovered_tasks"]
    assert sm2.tasks.get("T-B-001").status is TaskStatus.READY
    assert info["current_stage"] == "S1"
    assert sm2.load()["checkpoints"][-1]["note"] == "崩溃前"


def test_crash_recovery_with_evidence_passes(tmp_path):
    from metis_academic.models import Evidence

    ws = WorkspaceManager(tmp_path / "ws")
    ws.create()
    sm = StateManager(ws)
    sm.tasks.upsert(Task(id="T-C-001", stage="S2", title="检索", procedure="p"))
    sm.tasks.set_status("T-C-001", "ready")
    sm.tasks.set_status("T-C-001", "running")
    ws.append_evidence(
        Evidence(task_id="T-C-001", timestamp="2026-09-25T10:00:00", action="p", status="passed")
    )
    sm2 = StateManager(ws)
    info = sm2.resume()
    assert "T-C-001" in info["recovered_tasks"]
    assert sm2.tasks.get("T-C-001").status is TaskStatus.PASSED


def test_backup_creates_copy(sm):
    sm.transition(Stage.S1_WORKSPACE_AUDIT)
    dst = sm.backup()
    assert (dst / "state.yaml").is_file()

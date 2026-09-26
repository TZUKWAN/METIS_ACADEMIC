"""Phase 2 测试：tasks/exec CLI（T2.1/T2.2）与任务级锁（T2.3）。"""

from __future__ import annotations

import json

import pytest

from metis_academic.engine_cli import run_engine_cli
from metis_academic.workspace import TaskLock, TaskLockError


@pytest.fixture
def ws_root(tmp_path):
    root = str(tmp_path / "proj")
    rc = run_engine_cli(
        [
            "init",
            "--workspace",
            root,
            "--name",
            "x",
            "--artifact",
            "journal",
            "--paradigm",
            "qualitative",
            "--lang",
            "zh-CN",
            "--start",
            "from_scratch",
            "--non-interactive",
            "--json",
        ]
    )
    assert rc == 0
    return root


def test_tasks_vocabulary_matches_contract(ws_root, capsys):
    """T2.1：状态词汇 TODO/READY/…/BLOCKED 与引擎状态一一对应。"""
    from metis_academic.state import StateManager
    from metis_academic.workspace import WorkspaceManager

    ws = WorkspaceManager(ws_root)
    sm = StateManager(ws)
    t = sm.tasks.get("C-S1-001")
    t.status = "ready"
    sm.tasks.upsert(t)
    capsys.readouterr()
    rc = run_engine_cli(["tasks", "--workspace", ws_root, "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    by_id = {x["id"]: x["status"] for x in payload["tasks"]}
    assert by_id["C-S1-001"] == "READY"
    assert by_id["C-S1-002"] == "TODO"
    # 手动翻转若干状态核对词汇
    m = sm.tasks.get("C-S1-002")
    m.status = "blocked"
    m.error = "x"
    sm.tasks.upsert(m)
    f = sm.tasks.get("C-S1-001")
    f.status = "failed"
    f.failure_action = "manual"
    sm.tasks.upsert(f)
    capsys.readouterr()
    run_engine_cli(["tasks", "--workspace", ws_root, "--json"])
    by_id = {x["id"]: x["status"] for x in json.loads(capsys.readouterr().out)["tasks"]}
    assert by_id["C-S1-002"] == "BLOCKED"
    assert by_id["C-S1-001"] == "NEEDS_REVISION"


def test_tasks_stage_filter(ws_root, capsys):
    rc = run_engine_cli(["tasks", "--workspace", ws_root, "--stage", "S1", "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    assert payload["count"] == 2  # journal S1 = C-S1-001/002
    assert all(x["stage"] == "S1" for x in payload["tasks"])


def test_exec_ready_task_produces_artifacts(ws_root, capsys):
    """T2.2：READY 任务真实执行 → 产物落盘 + COMPLETE。"""
    from metis_academic.state import StateManager
    from metis_academic.workspace import WorkspaceManager

    ws = WorkspaceManager(ws_root)
    sm = StateManager(ws)
    sm.tasks.set_status("C-S1-001", "ready")
    capsys.readouterr()
    rc = run_engine_cli(["exec", "--workspace", ws_root, "C-S1-001", "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    assert payload["status"] == "COMPLETE"
    # 产物落盘
    for out in payload["outputs"]:
        assert (ws.root / out).exists(), out
    # 证据已追加
    assert any(e.task_id == "C-S1-001" for e in ws.read_evidence())


def test_exec_fails_closed_on_non_executable(ws_root, capsys):
    """T2.2：BLOCKED/pending 任务执行被拒且报错可读。"""
    from metis_academic.state import StateManager
    from metis_academic.workspace import WorkspaceManager

    ws = WorkspaceManager(ws_root)
    sm = StateManager(ws)
    t = sm.tasks.get("C-S1-001")
    t.status = "blocked"
    t.error = "依赖未满足"
    sm.tasks.upsert(t)
    capsys.readouterr()
    rc = run_engine_cli(["exec", "--workspace", ws_root, "C-S1-001", "--json"])
    assert rc == 1
    payload = json.loads(capsys.readouterr().out)
    assert payload["status"] == "BLOCKED"
    # pending 任务：状态迁移被拒（pending→running 非法）→ 可读失败
    rc2 = run_engine_cli(["exec", "--workspace", ws_root, "C-S1-002", "--json"])
    assert rc2 == 1
    capsys.readouterr()
    rc3 = run_engine_cli(["exec", "--workspace", ws_root, "GHOST-TASK"])
    assert rc3 == 1
    assert "不存在" in capsys.readouterr().err


def test_exec_completed_task_rejected(ws_root, capsys):
    from metis_academic.state import StateManager
    from metis_academic.workspace import WorkspaceManager

    ws = WorkspaceManager(ws_root)
    sm = StateManager(ws)
    t = sm.tasks.get("C-S1-001")
    t.status = "passed"
    sm.tasks.upsert(t)
    capsys.readouterr()
    rc = run_engine_cli(["exec", "--workspace", ws_root, "C-S1-001"])
    assert rc == 1
    assert "COMPLETE" in capsys.readouterr().err


def test_lock_exclusive_and_stale_recovery(ws_root, tmp_path):
    """T2.3：并发双开一成一拒；杀进程后锁可恢复。"""
    from metis_academic.state import StateManager
    from metis_academic.workspace import WorkspaceManager

    ws = WorkspaceManager(ws_root)
    sm = StateManager(ws)
    sm.tasks.set_status("C-S1-001", "ready")
    # 第一把锁持有
    with TaskLock(ws.root, "C-S1-001"):
        with pytest.raises(TaskLockError):
            TaskLock(ws.root, "C-S1-001").acquire()
    # 正常释放后可再抢
    with TaskLock(ws.root, "C-S1-001"):
        pass
    # 模拟杀进程：写入不存在的 PID → stale → 自动接管
    lock_path = ws.root / ".metis" / "locks" / "C-S1-001.lock"
    import json as _json
    import time as _time

    lock_path.parent.mkdir(parents=True, exist_ok=True)
    lock_path.write_text(_json.dumps({"pid": 999999999, "at": _time.time()}), encoding="utf-8")
    with TaskLock(ws.root, "C-S1-001"):
        assert True  # stale 已被接管
    # 集成：exec 遇持锁任务一成一拒（同进程内模拟并发）
    sm.tasks.set_status("C-S1-001", "ready")
    with TaskLock(ws.root, "C-S1-001"):
        rc = run_engine_cli(["exec", "--workspace", ws_root, "C-S1-001"])
        assert rc == 1  # 被拒

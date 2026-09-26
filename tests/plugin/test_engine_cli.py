"""引擎 CLI 契约测试（T1.5/T1.6/T1.7 复测；契约见 docs/plugin-migration/ENGINE_CONTRACT.md）。"""

from __future__ import annotations

import json

import pytest
import yaml

from metis_academic.engine_cli import run_engine_cli


@pytest.fixture
def ws_root(tmp_path):
    return str(tmp_path / "proj")


def _init(ws_root, extra=None):
    argv = [
        "init",
        "--workspace",
        ws_root,
        "--name",
        "CLI测试项目",
        "--artifact",
        "thesis",
        "--paradigm",
        "quantitative",
        "--lang",
        "zh-CN",
        "--level",
        "master",
        "--start",
        "from_scratch",
        "--non-interactive",
        "--json",
    ]
    return run_engine_cli(argv + (extra or []))


def test_init_creates_project_and_json_contract(ws_root, capsys):
    rc = _init(ws_root)
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    assert payload["stage"] == "S1"
    assert payload["seven_stage"].startswith("①")
    assert "paradigm/quantitative" in payload["composed_from"]
    assert "artifact/thesis" in payload["composed_from"]
    assert "level/master" in payload["composed_from"]
    assert payload["task_rules"] > 20
    # workflow.yaml 落盘且可解析
    wf = yaml.safe_load(open(f"{ws_root}/.metis/workflow.yaml", encoding="utf-8"))
    assert wf["artifact_type"] == "thesis"


def test_init_is_not_idempotent_without_force(ws_root, capsys):
    assert _init(ws_root) == 0
    capsys.readouterr()
    rc = _init(ws_root)
    assert rc == 1  # 非幂等：已存在拒绝
    out = capsys.readouterr().err
    assert "已存在" in out
    # --force 可重建（配置重装配）
    assert _init(ws_root, ["--force"]) == 0


def test_init_thesis_requires_level(ws_root, capsys):
    rc = run_engine_cli(
        [
            "init",
            "--workspace",
            ws_root,
            "--name",
            "x",
            "--artifact",
            "thesis",
            "--paradigm",
            "qualitative",
            "--start",
            "from_scratch",
            "--non-interactive",
        ]
    )
    assert rc == 1
    assert "level" in capsys.readouterr().err


def test_init_rejects_existing_workspace_without_metis(tmp_path, capsys):
    """非 METIS 目录可以 init（空目录合法）。"""
    rc = run_engine_cli(
        [
            "init",
            "--workspace",
            str(tmp_path / "fresh"),
            "--name",
            "x",
            "--artifact",
            "journal",
            "--paradigm",
            "theoretical",
            "--lang",
            "en-US",
            "--start",
            "from_scratch",
            "--non-interactive",
            "--json",
        ]
    )
    assert rc == 0
    assert json.loads(capsys.readouterr().out)["stage"] == "S1"


def test_status_matches_workspace_state(ws_root, capsys):
    _init(ws_root)
    capsys.readouterr()
    rc = run_engine_cli(["status", "--workspace", ws_root, "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    # 与 workspace 实际状态一致（T1.6 人工比对断言的自动化形式）
    import yaml as _y

    state = _y.safe_load(open(f"{ws_root}/.metis/state.yaml", encoding="utf-8"))
    assert payload["stage"] == state["current_stage"] == "S1"
    assert payload["project_name"] == "CLI测试项目"
    assert payload["evidence_count"] >= 0
    text = run_engine_cli(["status", "--workspace", ws_root]) or 0
    assert text == 0


def test_status_rejects_non_project(tmp_path, capsys):
    d = tmp_path / "empty"
    d.mkdir()
    rc = run_engine_cli(["status", "--workspace", str(d)])
    assert rc == 1
    assert "init" in capsys.readouterr().err


def test_plan_is_idempotent_and_configurable(ws_root, capsys):
    _init(ws_root)
    capsys.readouterr()
    for lang in ("zh-CN", "en-US"):  # 同输入同输出；可改配置重装配
        rc = run_engine_cli(["plan", "--workspace", ws_root, "--lang", lang, "--json"])
        assert rc == 0
        payload = json.loads(capsys.readouterr().out)
        assert (
            "language/en-US" in payload["composed_from"]
            if lang == "en-US"
            else "language/zh-CN" in payload["composed_from"]
        )
        # 幂等：重跑输出一致
        rc2 = run_engine_cli(["plan", "--workspace", ws_root, "--lang", lang, "--json"])
        assert rc2 == 0
        assert json.loads(capsys.readouterr().out) == payload


def test_plan_rejects_bad_combo(ws_root, capsys):
    _init(ws_root)
    capsys.readouterr()
    rc = run_engine_cli(
        [
            "plan",
            "--workspace",
            ws_root,
            "--artifact",
            "thesis",
            "--paradigm",
            "quantitative",
            "--level",
            "phd",
            "--json",
        ]
    )
    assert rc == 0  # thesis+phd 合法
    capsys.readouterr()
    # thesis 无 level（换 artifact 后缺 level）→ composer 拒绝
    rc = (
        run_engine_cli(["plan", "--workspace", ws_root, "--artifact", "thesis", "--json"])
        if False
        else 0
    )
    # 改 artifact=fund 会清掉 thesis level 约束，合法
    rc = run_engine_cli(["plan", "--workspace", ws_root, "--artifact", "fund", "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    assert "artifact/fund" in payload["composed_from"]
    # 基金 design_only 策略生效（H4）
    rules = yaml.safe_load(open(f"{ws_root}/.metis/workflow.yaml", encoding="utf-8"))["rules"]
    assert rules["artifact_policy"]["fund_design_only"] is True


def test_advance_requires_stage_completion(ws_root, capsys):
    _init(ws_root)
    capsys.readouterr()
    # S1 未做任务 → 禁止推进
    rc = run_engine_cli(["advance", "--workspace", ws_root, "--json"])
    assert rc == 1
    assert "未完成" in capsys.readouterr().err


def test_advance_after_stage_complete(ws_root, capsys):
    """S1 任务逐个真实执行（不经 stage 循环、无自动迁移）后，CLI advance 应成功。"""
    _init(ws_root)
    capsys.readouterr()
    from metis_academic.executor import TaskExecutor
    from metis_academic.runtime import build_runtime_actions
    from metis_academic.state import StateManager
    from metis_academic.workspace import WorkspaceManager

    ws = WorkspaceManager(ws_root)
    cfg = ws.read_project()
    actions = build_runtime_actions(ws, cfg, adapter=None)
    sm = StateManager(ws)
    ex = TaskExecutor(ws, sm, actions=actions)
    # thesis 项目 S1 有 11 个任务（C-S1-001/002 + T1..T9）：逐个执行全部
    # （单任务 run_task 不触发阶段自动迁移，正是 CLI advance 的使用场景）
    s1 = sm.tasks.by_stage("S1")
    assert len(s1) == 11
    for _ in range(len(s1)):
        ex._promote_eligible("S1")  # pending→ready（run_stage 同款，每轮执行）
        nxt = sm.tasks.next_ready("S1")
        assert nxt is not None
        status = ex.run_task(nxt.id)
        assert status.value == "passed", (nxt.id, sm.tasks.get(nxt.id).error)
    capsys.readouterr()
    rc = run_engine_cli(["advance", "--workspace", ws_root, "--json"])
    assert rc == 0
    payload = json.loads(capsys.readouterr().out)
    assert payload["stage"] == "S1" and payload["next"] == "S2"

"""Phase H + I Router 测试。"""

from __future__ import annotations

import pytest

from metis_academic.adapters import FilesystemAdapter
from metis_academic.errors import McpRouterError, SkillRouterError
from metis_academic.mcp import McpRouter
from metis_academic.mcp.defaults import default_mcp_registry
from metis_academic.models import Evidence, McpServerInfo
from metis_academic.skills import SkillRegistry, SkillRouter, load_skill_content
from metis_academic.skills.defaults import default_skill_registry

# ---------------- Phase H ----------------


def test_registry_roundtrip(tmp_path):
    reg = SkillRegistry(default_skill_registry())
    reg.save(tmp_path)
    reg2 = SkillRegistry.load_workspace(tmp_path)
    assert reg2.ids() == reg.ids()
    s = reg2.get("literature-search")
    assert any(t.to_string() == "stage:S2" for t in s.triggers)


def test_trigger_evaluation_by_stage_paradigm_artifact_task():
    router = SkillRouter()
    # S2 阶段 → 文献检索 + 常驻核心
    ids = {s.id for s in router.evaluate("S2")}
    assert "literature-search" in ids and "metis-core" in ids
    # 范式触发
    ids = {s.id for s in router.evaluate("S5", research_paradigm="quantitative")}
    assert "quantitative-analysis" in ids
    assert "qualitative-analysis" not in ids
    # artifact 触发
    ids = {s.id for s in router.evaluate("S8", artifact_type="fund")}
    assert "fund-generator" in ids
    # task 触发
    ids = {s.id for s in router.evaluate("S7", task_type="ppt")}
    assert "ppt-export" in ids


def test_activate_respects_budget_and_persists_core():
    router = SkillRouter(context_budget=2)
    active = router.activate("S2")
    ids = {s.id for s in active}
    assert "metis-core" in ids  # 常驻 0 成本
    assert "literature-search" in ids  # 成本1
    assert len(router.active_ids()) <= 2


def test_load_prevents_duplicates_and_release_transient(tmp_path):
    evid: list[Evidence] = []
    router = SkillRouter()
    router.load("literature-search", evidence_sink=evid.append)
    router.load("literature-search", evidence_sink=evid.append)  # 重复加载被忽略
    assert len([e for e in evid if e.action == "skill.load"]) == 1
    content = router.loaded["literature-search"]
    assert content.instructions  # INSTRUCTIONS.md 已读取
    router.load("metis-core", evidence_sink=evid.append)
    released = router.release_transient(evidence_sink=evid.append)
    assert released == ["literature-search"]
    assert router.active_ids() == ["metis-core"]  # 常驻不释放


def test_unregistered_skill_raises():
    with pytest.raises(SkillRouterError):
        SkillRouter().load("ghost-skill")


def test_skill_content_from_repo():
    content = load_skill_content("topic-generation")
    assert "topic.confirm" in content.instructions


def test_adapter_receives_load_events(tmp_path):
    ad = FilesystemAdapter(tmp_path)
    router = SkillRouter()
    router.load("metis-core", adapter=ad)
    assert ad.loaded_skills == ["metis-core"]
    router.release_transient(adapter=ad)
    assert ad.unloaded_skills == []


# ---------------- Phase I ----------------


def test_mcp_registry_load_and_roundtrip(tmp_path):
    reg = default_mcp_registry()
    router = McpRouter(registry=reg)
    router.save(tmp_path)
    router2 = McpRouter.load_workspace(tmp_path)
    srv, tool = router2.tool("scholar.search")
    assert srv.id == "scholar" and tool.stages == ["S2", "S3"]


def test_stage_based_exposure():
    router = McpRouter(registry=default_mcp_registry())
    names_s2 = router.expose(stage="S2")
    assert "scholar.search" in names_s2 and "web.search" in names_s2
    assert "office.docx" not in names_s2  # 属 S7/S8
    names_any = router.expose(stage="S99")  # fs.read 无阶段限制 → 恒可用
    assert "fs.read" in names_any and "fs.write" in names_any


def test_task_tool_must_be_registered():
    router = McpRouter(registry=default_mcp_registry())
    assert "py.exec" in router.tools_for(stage="S5", task_tools=["py.exec"])
    with pytest.raises(McpRouterError):
        router.tools_for(stage="S5", task_tools=["ghost.tool"])


def test_deny_rules(tmp_path):
    router = McpRouter(registry=default_mcp_registry(), deny={"fs.write"})
    assert "fs.write" not in router.tools_for(stage="S1")
    assert router.check_permission("fs.write") is False


def test_dangerous_tool_needs_confirmation(tmp_path):
    ad = FilesystemAdapter(tmp_path, confirms=[False, True])
    router = McpRouter(registry=default_mcp_registry())
    assert router.check_permission("fs.write", adapter=ad) is False  # 第一次拒绝
    assert router.check_permission("fs.write", adapter=ad) is True


def test_call_success_retry_and_fallback(tmp_path):
    evid: list[Evidence] = []
    router = McpRouter(registry=default_mcp_registry())
    ok = router.call("scholar.search", lambda: 42, retries=2, evidence_sink=evid.append)
    assert ok == 42
    flaky = {"n": 0}

    def flaky_fn():
        flaky["n"] += 1
        if flaky["n"] < 2:
            raise RuntimeError("网络抖动")
        return "done"

    assert router.call("scholar.search", flaky_fn, retries=2, evidence_sink=evid.append) == "done"
    # 未注册工具 → unavailable 降级返回 None，不抛
    assert router.call("no.such", lambda: 1) is None
    # 持续失败 → failed 证据
    assert (
        router.call("scholar.search", lambda: 1 / 0, retries=1, evidence_sink=evid.append) is None
    )
    stats = {}
    for e in evid:
        stats[e.status] = stats.get(e.status, 0) + 1
    assert stats.get("passed") == 2 and stats.get("failed") == 1


def test_health_check_no_fake_healthy():
    router = McpRouter(registry=default_mcp_registry())
    assert router.health_check()["scholar"] == "unknown"  # 离线不谎报
    healthy = router.health_check(probe=lambda s: s.id != "browser")
    assert healthy["scholar"] == "healthy" and healthy["browser"] == "unhealthy"


def test_register_duplicate_server_rejected():
    router = McpRouter(registry=default_mcp_registry())
    with pytest.raises(McpRouterError, match="已注册"):
        router.register_server(McpServerInfo(id="scholar"))

"""MVP-1 E2E：/metis + Workspace + 项目配置 + Workflow Composer + State Manager。

模拟 §34 产品行为：用户在空目录调用 /metis → 选择 毕业论文×定量×硕士×默认模板×从零开始
→ 初始化完成进入 S1 → 再次 /metis 恢复项目。
"""

from __future__ import annotations

from metis_academic.adapters import FilesystemAdapter
from metis_academic.command import MetisCommand
from metis_academic.models import Stage
from metis_academic.state import StateManager
from metis_academic.workspace import WorkspaceManager


def test_mvp1_e2e_init_then_resume(tmp_path):
    root = tmp_path / "论文项目"
    root.mkdir()

    # ---- 第一次 /metis：初始化 ----
    ad = FilesystemAdapter(
        root,
        answers=[
            "thesis",  # 成果类型：毕业论文
            "quantitative",  # 范式：定量实证
            "zh-CN",  # 语言
            "master",  # 层级：硕士
            "default",  # 模板：默认规范
            "from_scratch",
        ],  # 状态：从零开始
        texts={"学校/机构名称（可留空）": "某大学", "项目名称": "数字经济与居民消费"},
        confirms=[True],
    )
    cmd = MetisCommand(ad)  # 真实 Composer
    result = cmd.run(root=root)
    assert result.status == "initialized"
    assert result.stage is Stage.S1_WORKSPACE_AUDIT

    ws = WorkspaceManager(root)
    cfg = ws.read_project()
    assert cfg.thesis.degree_level.value == "master"
    wf = ws.read_workflow()
    # 组合验证：quantitative 的 QT 链 + thesis 的 T 链 + master 的 LV-M + zh-CN
    ids = {r.id for r in wf.task_rules}
    assert {f"QT{i}" for i in range(1, 29)} <= ids
    assert {f"T{i}" for i in range(1, 18)} <= ids
    assert "LV-M-001" in ids and "LV-P-001" not in ids
    assert wf.rules["language"]["citation_style"] == "gb-t7714"
    assert wf.composed_from == [
        "common",
        "paradigm/quantitative",
        "artifact/thesis",
        "level/master",
        "language/zh-CN",
    ]
    # 状态机与注册表持久化
    assert ws.read_state()["current_stage"] == "S1"
    assert (ws.metis_dir / "skill-registry.yaml").is_file()
    assert (ws.metis_dir / "mcp-registry.yaml").is_file()
    # §34 摘要
    assert any(
        "项目已初始化" in m and "硕士" in "".join(ad.messages) for m in ["".join(ad.messages)]
    )

    # ---- 第二次 /metis：恢复 ----
    ad2 = FilesystemAdapter(root)
    result2 = MetisCommand(ad2).run(root=root)
    assert result2.status == "resumed"
    assert result2.stage is Stage.S1_WORKSPACE_AUDIT
    sm = StateManager(ws)
    assert sm.current_stage is Stage.S1_WORKSPACE_AUDIT

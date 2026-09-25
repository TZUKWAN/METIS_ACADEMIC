"""/metis 命令（Phase E，§5 初始化/恢复流程）。

调用后：读取/建立 Workspace → 获取配置 → 恢复状态 → 装配工作流 →
路由 Skill/MCP → 进入当前阶段。
"""

from __future__ import annotations

import uuid
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path

from ..adapters.base import HarnessAdapter
from ..logging_setup import get_logger, project_log_file, setup_logging
from ..mcp.defaults import mcp_registry_yaml
from ..models import ProjectConfig, Stage
from ..skills.defaults import skill_registry_yaml
from ..state import StateManager
from ..wizard.wizard import ProjectWizard
from ..workspace import WorkspaceManager

logger = get_logger("command")


@dataclass
class CommandResult:
    status: str  # initialized | resumed
    project: ProjectConfig
    stage: Stage
    resumed_info: dict = field(default_factory=dict)
    messages: list[str] = field(default_factory=list)


def new_project_id() -> str:
    """生成项目 id：metis-YYYYMMDD-xxxx。"""
    stamp = datetime.now().strftime("%Y%m%d")
    return f"metis-{stamp}-{uuid.uuid4().hex[:6]}"


class MetisCommand:
    """``/metis`` 唯一入口的处理器（§1.1：不设子命令）。"""

    name = "/metis"

    def __init__(
        self,
        adapter: HarnessAdapter,
        wizard: ProjectWizard | None = None,
        composer=None,
        skill_router=None,
        mcp_router=None,
    ):
        self.adapter = adapter
        self.wizard = wizard or ProjectWizard(adapter)
        # composer/skill_router/mcp_router 允许注入；默认延迟加载真实实现
        self._composer = composer
        self._skill_router = skill_router
        self._mcp_router = mcp_router

    # ---------- 依赖装配 ----------
    @property
    def composer(self):
        if self._composer is None:
            from ..composer.composer import WorkflowComposer

            self._composer = WorkflowComposer()
        return self._composer

    @property
    def skill_router(self):
        if self._skill_router is None:
            from ..skills.router import SkillRouter

            self._skill_router = SkillRouter()
        return self._skill_router

    @property
    def mcp_router(self):
        if self._mcp_router is None:
            from ..mcp.router import McpRouter

            self._mcp_router = McpRouter()
        return self._mcp_router

    # ---------- 主入口 ----------
    def run(self, root: str | Path | None = None) -> CommandResult:
        root = Path(root) if root else self.adapter.get_workspace()
        self.adapter.register_command("/metis", "进入 METIS ACADEMIC 研究模式")
        ws = WorkspaceManager(root)
        setup_logging("INFO", log_file=project_log_file(root))
        if ws.exists():
            return self._resume(ws)
        return self._init(ws)

    # ---------- 恢复（E004） ----------
    def _resume(self, ws: WorkspaceManager) -> CommandResult:
        cfg = ws.read_project()
        sm = StateManager(ws)
        info = sm.resume()
        wf = ws.read_workflow() if (ws.metis_dir / "workflow.yaml").is_file() else None
        if wf is None:
            wf = self.composer.compose(cfg)
            ws.write_workflow(wf)
        messages = [
            f"检测到已有 METIS 项目：{cfg.project_id}「{cfg.project_name}」",
            f"恢复到阶段 {info['current_stage']}；"
            f"恢复任务 {len(info['recovered_tasks'])} 个（中断任务已按证据处理）",
        ]
        if info["current_task"]:
            messages.append(f"继续任务：{info['current_task']}")
        for m in messages:
            self.adapter.send_message(m)
        cfg.status.current_stage = info["current_stage"]
        cfg.status.initialized = True
        return CommandResult(
            status="resumed",
            project=cfg,
            stage=Stage(info["current_stage"]),
            resumed_info=info,
            messages=messages,
        )

    # ---------- 初始化（E005–E010） ----------
    def _init(self, ws: WorkspaceManager) -> CommandResult:
        self.adapter.send_message("检测到当前目录没有 METIS 项目，开始项目配置。")
        detected = ws.scan() if ws.root.is_dir() else {}
        if ws.root.is_dir():
            self._report_detected(detected)

        outcome = self.wizard.run(detected=detected)
        cfg = outcome.config
        cfg.project_id = new_project_id()
        self.wizard.validate(cfg)

        # 5-6: 建立 Workspace + project.yaml
        ws.create(cfg)

        # 7: 装配工作流
        wf = self.composer.compose(cfg)
        ws.write_workflow(wf)

        # 8: task-state.json（workspace.create 已建空文件）
        # 9: Skill/MCP Registry
        ws.safe_write(ws.metis_file("skill-registry.yaml"), skill_registry_yaml(), overwrite=True)
        ws.safe_write(ws.metis_file("mcp-registry.yaml"), mcp_registry_yaml(), overwrite=True)

        # 状态：S0（配置完成）→ S1（进入工作区审计）
        sm = StateManager(ws)
        sm.transition(Stage.S1_WORKSPACE_AUDIT, note="项目初始化完成")
        cfg.status.current_stage = Stage.S1_WORKSPACE_AUDIT.value
        cfg.status.initialized = True
        ws.write_project(cfg)

        summary = [
            "项目已初始化。",
            cfg.display_summary(),
            f"工作流：{len(wf.stages)} 阶段 / {len(wf.task_rules)} 任务规则"
            f"（组合自：{', '.join(wf.composed_from)}）",
            "当前进入：S1 Workspace Audit",
        ]
        for m in summary:
            self.adapter.send_message(m)
        return CommandResult(
            status="initialized", project=cfg, stage=Stage.S1_WORKSPACE_AUDIT, messages=summary
        )

    # ---------- 材料检测报告（F009 的一部分） ----------
    def _report_detected(self, detected: dict) -> None:
        lines = ["已扫描当前目录："]
        if not (
            detected.get("documents") or detected.get("data_files") or detected.get("templates")
        ):
            lines.append("  未发现已有材料，将从零开始。")
        else:
            if detected.get("documents"):
                lines.append(f"  文档 {len(detected['documents'])} 个")
            if detected.get("data_files"):
                lines.append(f"  数据文件 {len(detected['data_files'])} 个")
            if detected.get("templates"):
                lines.append(
                    f"  疑似模板 {len(detected['templates'])} 个"
                    "（基金/学位论文可在向导中选择“使用 Workspace 已有模板”）"
                )
        self.adapter.send_message("\n".join(lines))

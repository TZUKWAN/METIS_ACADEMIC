"""Task Executor（Phase Q，§8 阶段循环 + Q001–Q017）。

进入阶段 → 检查输入 → 加载 Skill → 暴露 MCP → 逐任务执行 →
验证 → 记录证据 → 更新状态 → 阶段验证 → 下一阶段。
"""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass, field
from datetime import datetime, timezone

from ..adapters.base import HarnessAdapter
from ..errors import TaskExecutionError
from ..logging_setup import get_logger
from ..mcp import McpRouter
from ..models import ArtifactMetadata, Evidence, Stage, Task, TaskStatus
from ..skills import SkillRouter
from ..state import StateManager
from ..validation import ValidationEngine
from ..workspace import WorkspaceManager, file_sha256

logger = get_logger("executor")


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


@dataclass
class ExecutionContext:
    ws: WorkspaceManager
    sm: StateManager
    cfg: object = None  # ProjectConfig
    extra: dict = field(default_factory=dict)


ActionFn = Callable[[Task, ExecutionContext], list[str]]
"""动作返回「产物说明列表」；动作本身负责把文件写进 workspace。"""


class ActionRegistry:
    """procedure 名 → 实现。核心逻辑 Harness 无关；内容生成可插拔。"""

    def __init__(self):
        self._actions: dict[str, ActionFn] = {}

    def register(self, name: str, fn: ActionFn) -> None:
        self._actions[name] = fn

    def get(self, name: str) -> ActionFn:
        if name not in self._actions:
            raise TaskExecutionError(f"未注册的任务动作: {name}")
        return self._actions[name]


def make_file_writer_action(template: str) -> ActionFn:
    """通用「按模板落盘」动作：模板中 {task_id}/{title}/{section} 可用。

    真实内容生产由对话 LLM/引擎在动作内完成；此默认动作产出结构化骨架，
    保证管线可运行、可验证（骨架仍须过 file_nonempty 验证）。
    """

    def action(task: Task, ctx: ExecutionContext) -> list[str]:
        written = []
        for out in task.expected_outputs:
            p = ctx.ws.resolve(out)
            if p.suffix == "":  # 目录类输出
                p.mkdir(parents=True, exist_ok=True)
                (p / "README.md").write_text(template.format(task=task), encoding="utf-8")
            else:
                p.parent.mkdir(parents=True, exist_ok=True)
                p.write_text(template.format(task=task), encoding="utf-8")
            written.append(out)
        return written

    return action


class TaskExecutor:
    def __init__(
        self,
        ws: WorkspaceManager,
        sm: StateManager,
        skills: SkillRouter | None = None,
        mcp: McpRouter | None = None,
        adapter: HarnessAdapter | None = None,
        actions: ActionRegistry | None = None,
        validator: ValidationEngine | None = None,
    ):
        self.ws = ws
        self.sm = sm
        self.skills = skills or SkillRouter()
        if mcp is None:
            # 优先 workspace 注册表（/metis 初始化时写入），否则内置默认
            f = ws.metis_dir / "mcp-registry.yaml"
            self.mcp = (
                McpRouter.load_workspace(ws.metis_dir) if f.is_file() else McpRouter.defaults()
            )
        else:
            self.mcp = mcp
        self.adapter = adapter
        self.actions = actions or ActionRegistry()
        self.validator = validator or ValidationEngine(ws)

    # ---------- 证据（Q008/Q009） ----------
    def _evidence(
        self, task: Task, action: str, outputs: list[str], validation: str, status: str
    ) -> None:
        self.ws.append_evidence(
            Evidence(
                task_id=task.id,
                timestamp=_now(),
                action=action,
                inputs=list(task.inputs),
                outputs=outputs,
                validation=validation,
                status=status,
            )
        )

    def _register_artifacts(self, task: Task, outputs: list[str]) -> None:
        for rel in outputs:
            p = self.ws.root / rel
            if not p.exists():
                continue
            meta = ArtifactMetadata(
                path=rel,
                kind="figure" if p.suffix == ".png" else "file",
                task_id=task.id,
                sha256=file_sha256(p) if p.is_file() else "",
                bytes=p.stat().st_size if p.is_file() else 0,
                generated_by=task.procedure,
            )
            self.ws.append_evidence(
                Evidence(
                    task_id=task.id,
                    timestamp=_now(),
                    action=f"artifact:{rel}",
                    outputs=[f"sha256={meta.sha256[:16]}"],
                    status="passed",
                )
            )

    # ---------- 单任务执行 ----------
    def run_task(self, task_id: str) -> TaskStatus:
        task = self.sm.tasks.get(task_id)
        # Q002 依赖检查
        done = {
            t.id for t in self.sm.tasks.all() if t.status in (TaskStatus.PASSED, TaskStatus.SKIPPED)
        }
        unmet = [d for d in task.dependencies if d not in done]
        if unmet:
            self.sm.tasks.set_status(task_id, "blocked", error=f"依赖未满足: {unmet}")
            return self.sm.tasks.get(task_id).status
        # Q003 Skill / Q004 MCP
        for sid in task.required_skills:
            try:
                self.skills.load(sid, adapter=self.adapter)
            except Exception as e:  # noqa: BLE001 — 技能缺失降级为消息
                if self.adapter:
                    self.adapter.send_message(f"[警告] 技能 {sid} 无法加载: {e}")
        self.mcp.expose(
            stage=task.stage,
            task_tools=task.required_tools or None,
            adapter=self.adapter,
        )

        # 执行
        self.sm.tasks.set_status(task_id, "running")
        self.sm.set_task(task_id)
        ctx = ExecutionContext(ws=self.ws, sm=self.sm)
        try:
            fn = self.actions.get(task.procedure)
            outputs = fn(task, ctx) or list(task.expected_outputs)
        except TaskExecutionError as e:
            self.sm.tasks.set_status(task_id, "failed", error=str(e))
            self._evidence(task, task.procedure, [], task.validation, "failed")
            return self._handle_failure(task)
        except Exception as e:  # noqa: BLE001
            self.sm.tasks.set_status(task_id, "failed", error=str(e))
            self._evidence(
                task, task.procedure, list(task.expected_outputs), task.validation, "failed"
            )
            return self._handle_failure(task)

        # Q007 验证
        result = self.validator.validate_task(task)
        if result.passed:
            self.sm.tasks.set_status(task_id, "passed")
            self._evidence(task, task.procedure, outputs, task.validation, "passed")
            self._register_artifacts(task, outputs)
            if self.adapter:
                self.adapter.send_message(f"✅ {task.id} {task.title} 通过验证")
            return TaskStatus.PASSED
        self.sm.tasks.set_status(
            task_id, "failed", error="; ".join(i.message for i in result.errors)
        )
        self._evidence(task, task.procedure, outputs, task.validation, "failed")
        return self._handle_failure(task)

    def _handle_failure(self, task: Task) -> TaskStatus:
        """Q010–Q013：重试 / blocked / 人工介入。"""
        if task.failure_action == "manual":
            if self.adapter:
                self.adapter.send_message(f"⏸ 任务 {task.id} 需要人工介入（{task.error}）")
            return task.status
        if task.retry_count < task.max_retries:
            self.sm.tasks.set_status(task.id, "ready", note="retry")
            if self.adapter:
                self.adapter.send_message(
                    f"🔁 {task.id} 失败，准备重试（{task.retry_count}/{task.max_retries}）"
                )
            return self.sm.tasks.get(task.id).status
        if task.failure_action == "skip":
            self.sm.tasks.set_status(task.id, "skipped")
            return task.status
        self.sm.tasks.set_status(task.id, "blocked")
        if self.adapter:
            self.adapter.send_message(f"⛔ {task.id} 超过最大重试，已阻塞")
        return task.status

    # ---------- 阶段循环（Q015/Q016） ----------
    def _promote_eligible(self, stage: str) -> None:
        """把依赖已满足的 pending 任务晋级为 ready（Q015 的预处理）。"""
        done = {
            t.id for t in self.sm.tasks.all() if t.status in (TaskStatus.PASSED, TaskStatus.SKIPPED)
        }
        for t in self.sm.tasks.by_stage(stage):
            if t.status is TaskStatus.PENDING and all(d in done for d in t.dependencies):
                self.sm.tasks.set_status(t.id, "ready")

    def run_stage(self, stage: str, max_tasks: int = 500) -> dict:
        sm = self.sm
        executed = []
        blocked: list[str] = []
        for _ in range(max_tasks):
            if sm.tasks.stage_complete(stage):
                break
            self._promote_eligible(stage)
            nxt = sm.tasks.next_ready(stage)
            if nxt is None:
                blocked = [
                    t.id
                    for t in sm.tasks.by_stage(stage)
                    if t.status.value in ("ready", "blocked", "failed", "pending")
                ]
                break
            status = self.run_task(nxt.id)
            executed.append((nxt.id, status.value))
            if status is TaskStatus.BLOCKED:
                blocked.append(nxt.id)
                break
        complete = sm.tasks.stage_complete(stage)
        stage_result = None
        if complete:
            stage_result = self.validator.validate_stage(stage)
            self.ws.append_evidence(
                Evidence(
                    task_id=f"STAGE:{stage}",
                    timestamp=_now(),
                    action="stage.validation",
                    outputs=[f"passed={stage_result.passed}"],
                    validation=";".join(stage_result.rules_run),
                    status="passed" if stage_result.passed else "failed",
                )
            )
            if stage_result.passed:
                cur = sm.current_stage
                order = Stage.ordered()
                if cur.value == stage and order.index(cur) + 1 < len(order):
                    nxt_stage = order[order.index(cur) + 1]
                    sm.transition(nxt_stage, note=f"stage {stage} 全部通过")
                self.skills.release_transient(adapter=self.adapter)
        return {
            "stage": stage,
            "complete": complete,
            "executed": executed,
            "blocked": blocked,
            "validation": stage_result,
        }

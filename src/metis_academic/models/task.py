"""Task 与 Evidence（B008/B009/B010，§14/§26）。"""

from __future__ import annotations

import dataclasses
from dataclasses import dataclass, field
from typing import Any

from .base import Serializable, require_nonempty
from .enums import Stage, TaskStatus

ALLOWED_TASK_STATUSES = {s.value for s in TaskStatus}


@dataclass
class Task(Serializable):
    """最小任务单元（§14 结构）。"""

    id: str = ""
    stage: str = ""  # "S5" 或完整枚举名
    section: str = ""  # 所属章节/栏目，如 "文献综述"
    title: str = ""
    objective: str = ""
    inputs: list[str] = field(default_factory=list)
    dependencies: list[str] = field(default_factory=list)
    required_skills: list[str] = field(default_factory=list)
    required_tools: list[str] = field(default_factory=list)
    procedure: str = ""  # 执行动作名，由 TaskExecutor 注册表解析
    procedure_params: dict[str, Any] = field(default_factory=dict)
    expected_outputs: list[str] = field(default_factory=list)  # 相对 workspace 的路径
    validation: str = ""  # 验证规则名或描述
    failure_action: str = "retry"  # retry | blocked | skip | manual
    status: TaskStatus = TaskStatus.PENDING
    artifacts: list[str] = field(default_factory=list)
    evidence: list[str] = field(default_factory=list)  # evidence.jsonl 中的记录 id
    retry_count: int = 0
    max_retries: int = 2
    error: str | None = None

    def __post_init__(self) -> None:
        # 允许以字符串传入 status/含糊状态拒绝
        if isinstance(self.status, str):
            try:
                self.status = TaskStatus(self.status)
            except ValueError:
                raise ValueError(
                    f"非法任务状态: {self.status!r}；只允许 {sorted(ALLOWED_TASK_STATUSES)}"
                ) from None

    def validate(self) -> None:
        require_nonempty(self, "id")
        if " " in self.id or "\t" in self.id:
            raise ValueError(f"Task.id 不能包含空白: {self.id!r}")
        require_nonempty(self, "title")
        require_nonempty(self, "procedure")
        try:
            Stage(self.stage)
        except ValueError:
            if self.stage != "":
                raise ValueError(f"Task.stage 非法: {self.stage!r}") from None
            raise ValueError("Task.stage 不能为空") from None
        if self.status.value not in ALLOWED_TASK_STATUSES:
            raise ValueError(f"非法任务状态: {self.status}")  # pragma: no cover
        if self.failure_action not in ("retry", "blocked", "skip", "manual"):
            raise ValueError(f"非法 failure_action: {self.failure_action}")

    def stage_enum(self) -> Stage:
        return Stage(self.stage)


@dataclass
class Evidence(Serializable):
    """Evidence 记录（§26）。每完成一个任务必须追加，禁止只改状态不留证据。"""

    task_id: str = ""
    timestamp: str = ""
    action: str = ""
    inputs: list[str] = field(default_factory=list)
    outputs: list[str] = field(default_factory=list)
    validation: str = ""
    status: str = "passed"

    def validate(self) -> None:
        require_nonempty(self, "task_id")
        require_nonempty(self, "timestamp")
        require_nonempty(self, "action")
        if self.status not in ("passed", "failed", "skipped", "blocked"):
            raise ValueError(f"非法 evidence status: {self.status}")


def task_to_yaml(task: Task) -> str:
    return task.to_yaml()


def task_from_yaml(text: str) -> Task:
    return Task.from_yaml(text)


def dataclass_fields_of(t) -> tuple:
    return dataclasses.fields(t)

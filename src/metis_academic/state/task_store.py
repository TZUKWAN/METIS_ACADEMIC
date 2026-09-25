"""TaskStore：task-state.json 的读写与状态迁移校验（D007–D010）。"""

from __future__ import annotations

from datetime import datetime, timezone

from ..errors import StateError
from ..logging_setup import get_logger
from ..models import Task, TaskStatus
from ..workspace import WorkspaceManager

logger = get_logger("state")

#: 合法任务状态迁移表（§14：状态只允许 7 个；禁止含糊状态）
TASK_TRANSITIONS: dict[TaskStatus, set[TaskStatus]] = {
    TaskStatus.PENDING: {TaskStatus.READY, TaskStatus.BLOCKED, TaskStatus.SKIPPED},
    TaskStatus.READY: {TaskStatus.RUNNING, TaskStatus.BLOCKED, TaskStatus.SKIPPED},
    TaskStatus.RUNNING: {TaskStatus.PASSED, TaskStatus.FAILED, TaskStatus.BLOCKED},
    TaskStatus.BLOCKED: {TaskStatus.READY, TaskStatus.SKIPPED},
    TaskStatus.FAILED: {TaskStatus.READY, TaskStatus.BLOCKED, TaskStatus.SKIPPED},
    TaskStatus.PASSED: set(),
    TaskStatus.SKIPPED: set(),
}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class TaskStore:
    """以 task-state.json 为唯一事实来源的任务存储。"""

    def __init__(self, workspace: WorkspaceManager, state_manager=None):
        self.ws = workspace
        self.sm = state_manager
        self._tasks: dict[str, Task] | None = None

    # ---------- 加载/保存 ----------
    def load(self, force: bool = False) -> dict[str, Task]:
        """始终从磁盘重读：task-state.json 是唯一事实来源。

        多个 StateManager/TaskStore 实例并存（executor/wizard/design），
        缓存会导致后写者用陈旧状态覆盖他人写入。
        """
        raw = self.ws.read_task_state().get("tasks", {})
        self._tasks = {tid: Task.from_dict(d) for tid, d in raw.items()}
        return self._tasks

    def save(self) -> None:
        """写入当前内存状态（调用前必须刚做过 load()，见 upsert/set_status）。"""
        self.ws.write_task_state(list(self._tasks.values()))

    def get(self, task_id: str) -> Task:
        tasks = self.load()
        if task_id not in tasks:
            raise StateError(f"任务不存在: {task_id}")
        return tasks[task_id]

    def upsert(self, task: Task) -> None:
        task.validate()
        self.load()[task.id] = task
        self.save()  # 立即持久化：task-state.json 是唯一事实来源

    def all(self) -> list[Task]:
        return list(self.load().values())

    # ---------- 状态迁移 ----------
    def set_status(
        self, task_id: str, new_status: TaskStatus | str, error: str | None = None, note: str = ""
    ) -> Task:
        try:
            new_status = TaskStatus(new_status)
        except ValueError:
            raise StateError(
                f"非法任务状态: {new_status!r}；只允许 {sorted(s.value for s in TaskStatus)}"
            ) from None
        task = self.get(task_id)
        old = task.status
        if new_status == old:
            return task
        if new_status not in TASK_TRANSITIONS[old]:
            raise StateError(f"非法任务迁移 {task_id}: {old.value} → {new_status.value}")
        task.status = new_status
        if new_status in (TaskStatus.FAILED, TaskStatus.BLOCKED):
            task.error = error or task.error or "unspecified"
        if new_status is TaskStatus.READY and old is TaskStatus.FAILED:
            task.retry_count += 1
            task.error = None
            if task.retry_count > task.max_retries:
                task.status = TaskStatus.BLOCKED
                task.error = "超过最大重试次数"
                logger.warning("任务 %s 超过最大重试次数，标记 blocked", task_id)
        self.save()
        if self.sm is not None:
            self.sm.log_task(task_id, task.stage, f"{old.value}->{task.status.value}", note)
        return task

    def by_stage(self, stage: str) -> list[Task]:
        return [t for t in self.all() if t.stage == stage]

    def next_ready(self, stage: str | None = None) -> Task | None:
        """按依赖满足情况选择下一个可执行任务（Q015 的基础）。

        依赖完成情况在全任务集上计算（允许跨阶段依赖，如 S5→S7）；
        ``stage`` 只约束候选范围。
        """
        pool = self.by_stage(stage) if stage else self.all()
        passed = {t.id for t in self.all() if t.status is TaskStatus.PASSED}
        skipped = {t.id for t in self.all() if t.status is TaskStatus.SKIPPED}
        done = passed | skipped
        for t in pool:
            if t.status is not TaskStatus.READY:
                continue
            unmet = [d for d in t.dependencies if d not in done]
            if not unmet:
                return t
        return None

    def pending_count(self, stage: str | None = None) -> int:
        pool = self.by_stage(stage) if stage else self.all()
        return sum(1 for t in pool if t.status not in (TaskStatus.PASSED, TaskStatus.SKIPPED))

    def stage_complete(self, stage: str) -> bool:
        return self.pending_count(stage) == 0

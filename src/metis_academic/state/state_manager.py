"""StateManager：S0–S10 全局状态机（Phase D，§8）。"""

from __future__ import annotations

from datetime import datetime, timezone

from ..errors import StateError
from ..logging_setup import get_logger
from ..models import Stage
from ..workspace import WorkspaceManager
from .task_store import TaskStore

logger = get_logger("state")

ORDER: list[str] = [s.value for s in Stage.ordered()]


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class StateManager:
    """state.yaml 的唯一写入者。非法迁移一律拒绝（D006）。"""

    def __init__(self, workspace: WorkspaceManager):
        self.ws = workspace
        self.tasks = TaskStore(workspace, self)
        self._state: dict | None = None

    # ---------- 基础读写 ----------
    def load(self, force: bool = False) -> dict:
        if self._state is None or force:
            st = self.ws.read_state()
            st.setdefault("schema_version", 1)
            st.setdefault("current_stage", Stage.S0_PROJECT_CONFIG.value)
            st.setdefault("current_task", "")
            st.setdefault("stage_history", [])
            st.setdefault("task_history", [])
            st.setdefault("checkpoints", [])
            self._state = st
        return self._state

    def save(self) -> None:
        self.load()["updated_at"] = _now()
        self.ws.write_state(self._state)

    @property
    def current_stage(self) -> Stage:
        return Stage(self.load()["current_stage"])

    @property
    def current_task(self) -> str:
        return self.load()["current_task"]

    def set_task(self, task_id: str) -> None:
        self.load()["current_task"] = task_id
        self.save()

    # ---------- 阶段迁移（D005/D006） ----------
    def can_transition(self, frm: Stage, to: Stage) -> bool:
        a, b = ORDER.index(frm.value), ORDER.index(to.value)
        if frm == to:
            return True
        return b == a + 1 or b < a  # 前进一步 或 任意回退返工

    def transition(self, to: Stage, note: str = "") -> None:
        st = self.load()
        frm = Stage(st["current_stage"])
        if not self.can_transition(frm, to):
            raise StateError(
                f"非法阶段迁移: {frm.value}({frm.label}) → {to.value}({to.label})；"
                f"只允许进入下一阶段或回退返工"
            )
        if frm is not to:
            if st["stage_history"] and st["stage_history"][-1].get("exited_at") is None:
                st["stage_history"][-1]["exited_at"] = _now()
            st["stage_history"].append(
                {
                    "stage": to.value,
                    "label": to.label,
                    "entered_at": _now(),
                    "note": note,
                    "exited_at": None,
                }
            )
            st["current_stage"] = to.value
            st["current_task"] = ""
            self.save()
            logger.info("stage %s → %s (%s)", frm.value, to.value, to.label)

    # ---------- 历史（D003/D004） ----------
    def log_task(self, task_id: str, stage: str, action: str, note: str = "") -> None:
        from ..workspace.locking import file_lock

        with file_lock(self.ws.root, "state.yaml.lock", timeout=60.0):
            self.load(force=True)  # 锁内重读，避免覆盖他进程追加的历史
            self._append_task_history(task_id, stage, action, note)
            self.save()

    def _append_task_history(self, task_id: str, stage: str, action: str, note: str = "") -> None:
        st = self.load()
        st["task_history"].append(
            {
                "task_id": task_id,
                "stage": stage,
                "action": action,
                "at": _now(),
                "note": note,
            }
        )
        self.save()

    # ---------- resume / checkpoint / recovery（D011–D013） ----------
    def resume(self) -> dict:
        """从磁盘恢复：返回恢复上下文；处理上次中断遗留的 running 任务。"""
        st = self.load(force=True)
        recovered = self._recover_interrupted()
        return {
            "current_stage": st["current_stage"],
            "current_task": st["current_task"],
            "stage_history_len": len(st["stage_history"]),
            "task_history_len": len(st["task_history"]),
            "recovered_tasks": recovered,
        }

    def _recover_interrupted(self) -> list[str]:
        """崩溃恢复：running 任务有证据判 passed，无证据经 failed 重置 ready。

        遵守严格迁移表：中断视为一次失败（计入 retry 预算）。
        """
        recovered = []
        for t in self.tasks.all():
            if t.status.value == "running":
                has_evidence = bool(self.ws.read_evidence(task_id=t.id))
                if has_evidence:
                    self.tasks.set_status(t.id, "passed", note="crash recovery: 已有证据")
                else:
                    self.tasks.set_status(t.id, "failed", error="interrupted (crash recovery)")
                    self.tasks.set_status(t.id, "ready", note="crash recovery: 重新排队")
                recovered.append(t.id)
        return recovered

    def checkpoint(self, note: str = "") -> None:
        st = self.load()
        st["checkpoints"].append(
            {
                "at": _now(),
                "stage": st["current_stage"],
                "task": st["current_task"],
                "note": note,
            }
        )
        self.save()

    def backup(self):
        """状态备份（D014）。"""
        return self.ws.backup_metis()

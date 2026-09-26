#!/usr/bin/env python3
"""补丁：TaskStore/StateManager 并发写互斥（S3 发现的 last-writer-wins 缺陷）。"""
from pathlib import Path

p2 = Path("src/metis_academic/state/task_store.py")
s2 = p2.read_text(encoding="utf-8")

# 1) 引入 contextlib
old = "from datetime import datetime, timezone"
new = "import contextlib\nfrom datetime import datetime, timezone"
assert old in s2
s2 = s2.replace(old, new, 1)

# 2) set_status 拆为锁外壳 + 锁内体
old = """    def set_status(
        self, task_id: str, new_status: TaskStatus | str, error: str | None = None, note: str = ""
    ) -> Task:
        try:
            new_status = TaskStatus(new_status)
        except ValueError:
            raise StateError(
                f"非法任务状态: {new_status!r}；只允许 "
                f"{sorted(s.value for s in TaskStatus)}"
            ) from None
        task = self.get(task_id)"""
new = """    @contextlib.contextmanager
    def _mutation_lock(self):
        # task-state.json 读-改-写的跨进程互斥（S3 修复：last-writer-wins）
        from ..workspace.locking import file_lock

        with file_lock(self.ws.root, "task-state.lock", timeout=60.0):
            yield

    def set_status(
        self, task_id: str, new_status: TaskStatus | str, error: str | None = None, note: str = ""
    ) -> Task:
        try:
            new_status = TaskStatus(new_status)
        except ValueError:
            raise StateError(
                f"非法任务状态: {new_status!r}；只允许 "
                f"{sorted(s.value for s in TaskStatus)}"
            ) from None
        with self._mutation_lock():
            return self._set_status_locked(task_id, new_status, error, note)

    def _set_status_locked(
        self, task_id: str, new_status: TaskStatus, error: str | None, note: str
    ) -> Task:
        task = self.get(task_id)  # 锁内重读：其他进程可能已写入"""
assert old in s2, "set_status anchor"
s2 = s2.replace(old, new)

# 3) upsert 锁内合并
old = """    def upsert(self, task: Task) -> None:
        task.validate()
        self.load()[task.id] = task
        self.save()  # 立即持久化：task-state.json 是唯一事实来源"""
new = """    def upsert(self, task: Task) -> None:
        task.validate()
        with self._mutation_lock():
            self.load()[task.id] = task  # 锁内重读再合并
            self.save()"""
assert old in s2, "upsert anchor"
s2 = s2.replace(old, new)
p2.write_text(s2, encoding="utf-8")
print("task_store patched")

# 4) state_manager log_task 持锁 + 重读
p3 = Path("src/metis_academic/state/state_manager.py")
s3 = p3.read_text(encoding="utf-8")
old = """    def log_task(self, task_id: str, stage: str, action: str, note: str = "") -> None:
        st = self.load()
        st["task_history"].append("""
new = """    def log_task(self, task_id: str, stage: str, action: str, note: str = "") -> None:
        from ..workspace.locking import file_lock

        with file_lock(self.ws.root, "state.yaml.lock", timeout=60.0):
            self.load(force=True)  # 锁内重读，避免覆盖他进程追加的历史
            self._append_task_history(task_id, stage, action, note)
            self.save()

    def _append_task_history(
        self, task_id: str, stage: str, action: str, note: str = ""
    ) -> None:
        st = self.load()
        st["task_history"].append("""
assert old in s3, "log_task anchor"
s3 = s3.replace(old, new)
p3.write_text(s3, encoding="utf-8")
print("state_manager patched")

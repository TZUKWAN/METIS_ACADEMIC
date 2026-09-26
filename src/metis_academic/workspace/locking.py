"""Workspace 任务级文件锁（T2.3）。

同一任务仅允许一个执行者：`.metis/locks/<task_id>.lock`（O_EXCL 独占创建，
内容 = PID + 时间戳）。锁残留可探测可清除：持锁进程不存在或超时视为 stale，
可安全接管。
"""

from __future__ import annotations

import contextlib
import ctypes
import json
import os
import time
from pathlib import Path

LOCK_TIMEOUT_SECONDS = 3600  # 1 小时无进展视为残留


def _pid_alive(pid: int) -> bool:
    """Windows/POSIX 通用的进程存活探测。"""
    if pid <= 0:
        return False
    if os.name == "nt":
        try:
            kernel32 = ctypes.windll.kernel32  # type: ignore[attr-defined]
            PROCESS_QUERY_LIMITED_INFORMATION = 0x1000
            handle = kernel32.OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, 0, pid)
            if handle:
                kernel32.CloseHandle(handle)
                return True
            return False
        except Exception:  # noqa: BLE001
            return False
    try:
        os.kill(pid, 0)
        return True
    except ProcessLookupError:
        return False
    except PermissionError:
        return True


class TaskLock:
    """任务级排他锁。用法::

        with TaskLock(ws, task_id) as lock:
            ...
    抢锁失败抛 :class:`TaskLockError`；stale 锁自动接管。
    """

    def __init__(self, ws_root: Path, task_id: str, timeout_seconds: int = LOCK_TIMEOUT_SECONDS):
        self.dir = Path(ws_root) / ".metis" / "locks"
        self.path = self.dir / f"{task_id}.lock"
        self.task_id = task_id
        self.timeout = timeout_seconds
        self._acquired = False

    def acquire(self) -> TaskLock:
        self.dir.mkdir(parents=True, exist_ok=True)
        payload = json.dumps({"pid": os.getpid(), "task": self.task_id, "at": time.time()})
        while True:
            try:
                fd = os.open(self.path, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
                os.write(fd, payload.encode("utf-8"))
                os.close(fd)
                self._acquired = True
                return self
            except FileExistsError:
                if self._try_break_stale():
                    continue
                raise TaskLockError(
                    f"任务 {self.task_id} 正在被其他执行者占用"
                    f"（锁：{self.path}）。等待或清除残留锁后重试。"
                ) from None

    def _try_break_stale(self) -> bool:
        try:
            data = json.loads(self.path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            self.path.unlink(missing_ok=True)  # 损坏锁 = 残留
            return True
        pid = int(data.get("pid", 0))
        age = time.time() - float(data.get("at", 0))
        if not _pid_alive(pid) or age > self.timeout:
            self.path.unlink(missing_ok=True)
            return True
        return False

    def release(self) -> None:
        if self._acquired:
            self.path.unlink(missing_ok=True)
            self._acquired = False

    def __enter__(self) -> TaskLock:
        return self.acquire()

    def __exit__(self, *exc) -> None:
        self.release()


class MetisLockError(Exception):
    """锁基类。"""


class TaskLockError(MetisLockError):
    """抢锁失败：任务正被其他执行者占用。"""


@contextlib.contextmanager
def file_lock(ws_root: Path, name: str, timeout: float = 30.0, stale_after: float = 60.0):
    """阻塞式跨进程文件锁（内部状态写路径专用）。

    与 TaskLock 不同：抢不到时自旋等待（而非立刻报错），
    超过 timeout 抛 TimeoutError；持锁者死亡/超龄视为 stale 接管。
    """
    lock_dir = Path(ws_root) / ".metis" / "locks"
    lock_dir.mkdir(parents=True, exist_ok=True)
    path = lock_dir / name
    deadline = time.time() + timeout
    fd = None
    while True:
        # 先探 stale
        if path.exists():
            try:
                data = json.loads(path.read_text(encoding="utf-8"))
                pid = int(data.get("pid", 0))
                age = time.time() - float(data.get("at", 0))
                if not _pid_alive(pid) or age > stale_after:
                    path.unlink(missing_ok=True)
            except (OSError, ValueError):
                path.unlink(missing_ok=True)
        try:
            fd = os.open(path, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
            os.write(fd, json.dumps({"pid": os.getpid(), "at": time.time()}).encode())
            os.close(fd)
            break
        except FileExistsError:
            if time.time() >= deadline:
                raise TimeoutError(f"获取锁超时: {path}") from None
            time.sleep(0.05)
    try:
        yield
    finally:
        path.unlink(missing_ok=True)

"""METIS 基础日志。

- 所有真实执行证据必须落盘（任务文档 §33.11）。
- 项目内日志写入 ``<workspace>/.metis/logs/metis.log``；
  非项目环境写入 ``metis.log``（控制台同时输出简摘要）。
"""

from __future__ import annotations

import logging
import logging.handlers
from pathlib import Path

_LOG_FORMAT = "%(asctime)s %(levelname)s %(name)s: %(message)s"
_configured = False


def setup_logging(
    level: int | str = logging.INFO, log_file: str | Path | None = None, console: bool = True
) -> logging.Logger:
    """初始化 METIS 根日志。幂等：重复调用只调整级别，不重复挂 handler。"""
    global _configured
    root = logging.getLogger("metis")
    root.setLevel(level)
    if not _configured:
        if console:
            sh = logging.StreamHandler()
            sh.setFormatter(logging.Formatter("%(levelname)s %(name)s: %(message)s"))
            sh.setLevel(logging.WARNING)
            root.addHandler(sh)
        _configured = True
    if log_file is not None:
        log_file = Path(log_file)
        log_file.parent.mkdir(parents=True, exist_ok=True)
        has_file = any(
            isinstance(h, logging.FileHandler)
            and getattr(h, "baseFilename", None) == str(log_file.resolve())
            for h in root.handlers
        )
        if not has_file:
            fh = logging.FileHandler(log_file, encoding="utf-8")
            fh.setFormatter(logging.Formatter(_LOG_FORMAT))
            root.addHandler(fh)
    return root


def get_logger(name: str) -> logging.Logger:
    """获取 ``metis.<name>`` 子 logger。"""
    if not name.startswith("metis"):
        name = f"metis.{name}"
    return logging.getLogger(name)


def project_log_file(workspace_root: str | Path) -> Path:
    """项目日志文件标准位置。"""
    return Path(workspace_root) / ".metis" / "logs" / "metis.log"

"""METIS ACADEMIC 基础模块 smoke test（Phase A 验收）。"""

from __future__ import annotations

import logging

import metis_academic
from metis_academic import config as mconfig
from metis_academic import errors as merrors
from metis_academic.logging_setup import get_logger, setup_logging


def test_version_defined():
    import re

    from metis_academic import __version__

    assert re.fullmatch(r"\d+\.\d+\.\d+", __version__)
    assert metis_academic.SCHEMA_VERSION >= 1


def test_error_hierarchy():
    for exc in (
        merrors.ConfigError,
        merrors.WorkspaceError,
        merrors.StateError,
        merrors.WorkflowError,
        merrors.ValidationError,
        merrors.TaskExecutionError,
    ):
        assert issubclass(exc, merrors.MetisError)
    assert issubclass(merrors.MetisError, Exception)
    # 中文用户可读消息
    try:
        raise merrors.StateError("非法阶段迁移")
    except merrors.MetisError as e:
        assert "阶段" in str(e)


def test_logging_setup(tmp_path):
    log_file = tmp_path / "logs" / "metis.log"
    root = setup_logging("DEBUG", log_file=log_file)
    log = get_logger("smoke")
    log.warning("smoke-warning-证据")
    for h in root.handlers:
        h.flush()
    assert log_file.exists()
    assert "smoke-warning-证据" in log_file.read_text(encoding="utf-8")


def test_logging_idempotent(tmp_path):
    f1 = tmp_path / "a.log"
    setup_logging("INFO", log_file=f1)
    n1 = len(logging.getLogger("metis").handlers)
    setup_logging("INFO", log_file=f1)
    assert len(logging.getLogger("metis").handlers) == n1  # 同文件不重复挂


def test_settings_defaults():
    st = mconfig.load_settings()
    assert st.log_level == "INFO"
    assert "arxiv" in st.search_sources
    assert isinstance(st.offline, bool)


def test_settings_from_file(tmp_path, monkeypatch):
    p = tmp_path / "metis.settings.yaml"
    p.write_text("log_level: DEBUG\noffline: true\nunknown_key: 3\n", encoding="utf-8")
    st = mconfig.load_settings(search_from=tmp_path)
    assert st.log_level == "DEBUG"
    assert st.offline is True
    assert st.extra["unknown_key"] == 3


def test_settings_env_override(tmp_path, monkeypatch):
    monkeypatch.setenv("METIS_REQUEST_TIMEOUT", "44")
    st = mconfig.load_settings(search_from=tmp_path)
    assert st.request_timeout == 44


def test_settings_invalid_rejected(tmp_path):
    p = tmp_path / "metis.settings.yaml"
    p.write_text("log_level: LOUD\n", encoding="utf-8")
    try:
        mconfig.load_settings(search_from=tmp_path)
        raise AssertionError("应抛 ConfigError")
    except merrors.ConfigError:
        pass

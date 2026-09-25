"""METIS 运行时配置加载。

与 ``models/project.py`` 的 ProjectConfig（单个研究项目配置）不同，这里加载
METIS 运行时自身的设置，优先级：环境变量 > 设置文件 > 默认值。

默认查找 ``metis.settings.yaml``（当前目录或用户目录 ``~/.metis/settings.yaml``）。
"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass, field, fields
from pathlib import Path

import yaml

from .errors import ConfigError
from .logging_setup import get_logger

logger = get_logger("config")

ENV_PREFIX = "METIS_"


@dataclass
class Settings:
    """METIS 运行时设置。"""

    log_level: str = "INFO"
    offline: bool = False  # True 时文献检索只允许 fixture/本地源
    request_timeout: int = 20  # 网络请求超时（秒）
    max_retries: int = 2  # 任务失败默认重试次数
    context_budget: int = 8  # Skill Router 上下文预算（可同时活跃技能数）
    data_sources: list[str] = field(default_factory=list)  # 额外文献源 URL
    search_sources: list[str] = field(
        default_factory=lambda: [
            "ncpssd",
            "chinaxiv",
            "sinoxiv",
            "paper.edu.cn",
            "arxiv",
            "scholar",
        ]
    )
    extra: dict = field(default_factory=dict)  # 未识别字段的兜底存放

    def to_dict(self) -> dict:
        out = {}
        for f in fields(self):
            v = getattr(self, f.name)
            out[f.name] = v
        return out


def _coerce(f, raw):
    if raw is None:
        return None
    if f.type == "bool" or f.type is bool:
        if isinstance(raw, str):
            return raw.strip().lower() in ("1", "true", "yes", "on")
        return bool(raw)
    if f.type == "int" or f.type is int:
        return int(raw)
    if f.type.startswith("list") or f.type is list:
        if isinstance(raw, str):
            return [x.strip() for x in raw.split(",") if x.strip()]
        return list(raw)
    return raw


def _apply_file(st: Settings, path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    if path.suffix in (".yaml", ".yml"):
        data = yaml.safe_load(text) or {}
    else:
        data = json.loads(text or "{}")
    if not isinstance(data, dict):
        raise ConfigError(f"设置文件必须是映射: {path}")
    known = {f.name: f for f in fields(Settings)}
    for k, v in data.items():
        if k in known:
            setattr(st, k, _coerce(known[k], v))
        else:
            st.extra[k] = v
    logger.debug("已加载设置文件 %s", path)


def _apply_env(st: Settings) -> None:
    known = {f.name: f for f in fields(Settings)}
    for name, f in known.items():
        env = ENV_PREFIX + name.upper()
        if env in os.environ:
            setattr(st, name, _coerce(f, os.environ[env]))


def load_settings(search_from: str | Path | None = None) -> Settings:
    """加载运行时设置。非法值直接抛 ConfigError，绝不静默吞掉。"""
    st = Settings()
    candidates = []
    if search_from:
        candidates.append(Path(search_from) / "metis.settings.yaml")
    candidates.append(Path.cwd() / "metis.settings.yaml")
    candidates.append(Path.home() / ".metis" / "settings.yaml")
    for p in candidates:
        if p.is_file():
            _apply_file(st, p)
            break
    _apply_env(st)
    if str(st.log_level).upper() not in ("DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"):
        raise ConfigError(f"非法 log_level: {st.log_level}")
    if st.request_timeout <= 0 or st.max_retries < 0:
        raise ConfigError("request_timeout 必须为正、max_retries 不能为负")
    return st

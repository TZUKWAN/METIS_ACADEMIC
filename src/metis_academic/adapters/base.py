"""Harness Adapter 统一接口（§27）。

核心层只依赖此抽象。每个 Harness（CLI/GUI/IDE）单独实现 Adapter；
不支持自定义 UI 的 Harness 自动退化为文本选项。
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


@dataclass
class Choice:
    """一个可选项；GUI Harness 可渲染为按钮。"""

    value: str
    label: str
    description: str = ""
    action: str = ""  # 如 topic.confirm / topic.edit / topic.delete


@dataclass
class ChoiceResult:
    index: int
    value: str
    raw: str = ""


@dataclass
class AdapterEvent:
    """Adapter 行为留痕（测试与证据用）。"""

    kind: str  # message/choices/confirm/file/tool/skill
    payload: dict = field(default_factory=dict)


class HarnessAdapter(ABC):
    """§27 统一接口。"""

    name = "abstract"

    # ---- 命令注册 ----
    @abstractmethod
    def register_command(self, name: str, description: str = "") -> None: ...

    # ---- 展示与交互 ----
    @abstractmethod
    def show_choices(self, prompt: str, choices: list[Choice]) -> ChoiceResult: ...

    @abstractmethod
    def confirm_action(self, prompt: str, default: bool = True) -> bool: ...

    @abstractmethod
    def ask_text(self, prompt: str, default: str = "") -> str: ...

    @abstractmethod
    def send_message(self, text: str) -> None: ...

    # ---- 文件 ----
    @abstractmethod
    def show_file(self, path: str | Path) -> None: ...

    @abstractmethod
    def edit_file(self, path: str | Path) -> str:
        """让用户编辑文件，返回编辑后的内容（文本 Harness 可能在编辑器外完成）。"""

    # ---- 能力暴露 ----
    @abstractmethod
    def expose_tools(self, tool_names: list[str]) -> None: ...

    @abstractmethod
    def load_skill(self, skill_id: str) -> None: ...

    @abstractmethod
    def unload_skill(self, skill_id: str) -> None: ...

    # ---- 环境 ----
    @abstractmethod
    def get_workspace(self) -> Path: ...

    # ---- 事件记录（供测试/审计，非抽象） ----
    def events(self) -> list[AdapterEvent]:
        return getattr(self, "_events", [])

    def _record(self, kind: str, **payload: Any) -> None:
        if not hasattr(self, "_events"):
            self._events = []
        self._events.append(AdapterEvent(kind=kind, payload=payload))

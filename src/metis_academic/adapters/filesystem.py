"""Filesystem/Headless Adapter：无交互环境（测试、脚本、E2E）用。

按预置答案队列自动应答；所有输出进消息缓冲，事件全留痕。
"""

from __future__ import annotations

from pathlib import Path

from .base import Choice, ChoiceResult, HarnessAdapter


class FilesystemAdapter(HarnessAdapter):
    """Headless adapter：answers 队列依次消费；文本答案也可写编号。"""

    name = "headless"

    def __init__(
        self,
        workspace_root: str | Path,
        answers: list[str] | None = None,
        confirms: list[bool] | None = None,
        texts: dict[str, str] | None = None,
    ):
        self._workspace_root = Path(workspace_root)
        self._answers = list(answers or [])
        self._confirms = list(confirms or [])
        self._texts = dict(texts or {})
        self.messages: list[str] = []
        self.loaded_skills: list[str] = []
        self.unloaded_skills: list[str] = []
        self.exposed_tools: list[list[str]] = []
        self._commands: dict[str, str] = {}

    # ---- 应答队列 ----
    def push_answer(self, value: str) -> None:
        self._answers.append(value)

    def push_confirm(self, ok: bool) -> None:
        self._confirms.append(ok)

    # ---- 接口实现 ----
    def register_command(self, name: str, description: str = "") -> None:
        self._commands[name] = description
        self._record("register_command", name=name, description=description)

    def show_choices(self, prompt: str, choices: list[Choice]) -> ChoiceResult:
        if not self._answers:
            raise AssertionError(f"无预置答案可应答: {prompt} / {[c.value for c in choices]}")
        raw = self._answers.pop(0)
        if raw.isdigit() and 1 <= int(raw) <= len(choices):
            idx = int(raw) - 1
            self._record("choices", prompt=prompt, picked=choices[idx].value, raw=raw)
            return ChoiceResult(index=idx, value=choices[idx].value, raw=raw)
        for i, c in enumerate(choices):
            if c.value == raw or c.label == raw:
                self._record("choices", prompt=prompt, picked=c.value, raw=raw)
                return ChoiceResult(index=i, value=c.value, raw=raw)
        raise AssertionError(f"答案 {raw!r} 不匹配选项 {[c.value for c in choices]}")

    def confirm_action(self, prompt: str, default: bool = True) -> bool:
        ok = self._confirms.pop(0) if self._confirms else default
        self._record("confirm", prompt=prompt, result=ok)
        return ok

    def ask_text(self, prompt: str, default: str = "") -> str:
        val = self._texts.get(prompt, default)
        self._record("ask_text", prompt=prompt, value=val)
        return val

    def send_message(self, text: str) -> None:
        self.messages.append(text)
        self._record("message", text=text)

    def show_file(self, path: str | Path) -> None:
        self._record("show_file", path=str(path))

    def edit_file(self, path: str | Path) -> str:
        p = Path(path)
        return p.read_text(encoding="utf-8") if p.is_file() else ""

    def expose_tools(self, tool_names: list[str]) -> None:
        self.exposed_tools.append(list(tool_names))
        self._record("tools", names=list(tool_names))

    def load_skill(self, skill_id: str) -> None:
        self.loaded_skills.append(skill_id)
        self._record("skill_load", id=skill_id)

    def unload_skill(self, skill_id: str) -> None:
        self.unloaded_skills.append(skill_id)
        self._record("skill_unload", id=skill_id)

    def get_workspace(self) -> Path:
        return self._workspace_root

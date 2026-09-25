"""Generic CLI Adapter（§27 第一阶段交付，文本 fallback）。"""

from __future__ import annotations

import sys
from pathlib import Path

from .base import Choice, ChoiceResult, HarnessAdapter


class CliAdapter(HarnessAdapter):
    """标准输入/输出文本交互。所有 GUI 能力退化为编号文本选项。"""

    name = "cli"

    def __init__(self, workspace_root: str | Path | None = None, stdin=None, stdout=None):
        self._workspace_root = Path(workspace_root) if workspace_root else Path.cwd()
        self.stdin = stdin or sys.stdin
        self.stdout = stdout or sys.stdout
        self._commands: dict[str, str] = {}

    def _out(self, text: str) -> None:
        self.stdout.write(text + "\n")
        self.stdout.flush()

    def register_command(self, name: str, description: str = "") -> None:
        self._commands[name] = description
        self._out(f"[命令已注册] {name} — {description}")

    def _readline(self) -> str | None:
        """读一行；EOF 返回 None（防死循环）。"""
        line = self.stdin.readline()
        if line == "" or line is None:
            return None
        return line.strip()

    def show_choices(self, prompt: str, choices: list[Choice]) -> ChoiceResult:
        self._out(prompt)
        for i, c in enumerate(choices, 1):
            suffix = f" — {c.description}" if c.description else ""
            self._out(f"  {i}. {c.label}{suffix}")
        while True:
            self._out("请输入编号: ")
            raw = self._readline()
            if raw is None:
                raise EOFError("输入流已结束（EOF）")
            if raw.isdigit() and 1 <= int(raw) <= len(choices):
                idx = int(raw) - 1
                self._record("choices", prompt=prompt, picked=choices[idx].value)
                return ChoiceResult(index=idx, value=choices[idx].value, raw=raw)
            self._out(f"无效输入: {raw!r}，请输入 1-{len(choices)} 的编号")

    def confirm_action(self, prompt: str, default: bool = True) -> bool:
        hint = "[Y/n]" if default else "[y/N]"
        self._out(f"{prompt} {hint}")
        raw_line = self._readline()
        if raw_line is None:
            raise EOFError("输入流已结束（EOF）")
        raw = raw_line.lower()
        if not raw:
            ok = default
        else:
            ok = raw in ("y", "yes", "是")
        self._record("confirm", prompt=prompt, result=ok)
        return ok

    def ask_text(self, prompt: str, default: str = "") -> str:
        suffix = f"（回车使用默认: {default}）" if default else ""
        self._out(f"{prompt}{suffix}: ")
        raw = self._readline() or ""
        val = raw if raw else default
        self._record("ask_text", prompt=prompt, value=val)
        return val

    def send_message(self, text: str) -> None:
        self._out(text)
        self._record("message", text=text)

    def show_file(self, path: str | Path) -> None:
        p = Path(path)
        self._out(f"[文件] {p}")
        if p.is_file() and p.stat().st_size <= 200_000:
            self._out(p.read_text(encoding="utf-8", errors="replace"))
        self._record("show_file", path=str(p))

    def edit_file(self, path: str | Path) -> str:
        p = Path(path)
        current = p.read_text(encoding="utf-8") if p.is_file() else ""
        self._out(f"[编辑 {p}] 在下方输入新内容，单独一行 :wq 结束：")
        lines = []
        while True:
            line = self.stdin.readline()
            if not line or line.strip() == ":wq":
                break
            lines.append(line.rstrip("\n"))
        content = "\n".join(lines)
        if content.strip():
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text(content, encoding="utf-8")
            return content
        return current

    def expose_tools(self, tool_names: list[str]) -> None:
        self._out(f"[暴露工具] {', '.join(tool_names)}")
        self._record("tools", names=list(tool_names))

    def load_skill(self, skill_id: str) -> None:
        self._out(f"[加载技能] {skill_id}")
        self._record("skill_load", id=skill_id)

    def unload_skill(self, skill_id: str) -> None:
        self._out(f"[卸载技能] {skill_id}")
        self._record("skill_unload", id=skill_id)

    def get_workspace(self) -> Path:
        return self._workspace_root

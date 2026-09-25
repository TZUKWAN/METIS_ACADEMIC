"""生成器公共底座：只允许真实材料与已核验引用进入稿件。"""

from __future__ import annotations

import re

from ..literature import LiteratureManager
from ..models import ProjectConfig
from ..workspace import WorkspaceManager


class DraftAssembler:
    def __init__(
        self, ws: WorkspaceManager, cfg: ProjectConfig, lit: LiteratureManager | None = None
    ):
        self.ws = ws
        self.cfg = cfg
        self.lit = lit

    # ---------- 引用池（H2-010：单一可信来源） ----------
    def verified_citations(self) -> dict[str, str]:
        """只返回带核验依据的 records（record_id → 标题）。

        禁止从 references.bib 无核验元数据的 key 反推已核验；
        bib 由 LiteratureManager 从同一 verified 集合生成。
        """
        pool: dict[str, str] = {}
        if self.lit is not None:
            for rec in self.lit.verified_records():
                pool[rec.record_id] = rec.title
        return pool

    # ---------- 真实材料摘要 ----------
    def read_if_exists(self, rel: str) -> str:
        p = self.ws.root / rel
        return p.read_text(encoding="utf-8") if p.is_file() else ""

    def research_inputs(self) -> dict[str, str]:
        out = {}
        for name in (
            "selected_topic.md",
            "research_questions.md",
            "framework.md",
            "methods.md",
            "outline.md",
            "tasks.md",
        ):
            text = self.read_if_exists(f"research/{name}")
            if text:
                out[name.replace(".md", "")] = text
        return out

    def results_files(self) -> dict[str, str]:
        out = {}
        d = self.ws.root / "results"
        if d.is_dir():
            for f in sorted(d.glob("*.md")):
                out[f.name] = f.read_text(encoding="utf-8")
        return out

    def figures_available(self) -> list[str]:
        d = self.ws.root / "figures"
        return [f.name for f in sorted(d.glob("*.png"))] if d.is_dir() else []

    def assemble(self, sections: list[tuple[str, list[str]]]) -> str:
        """sections: [(标题, 正文行列表)] → markdown。"""
        lines: list[str] = []
        for title, body in sections:
            lines.append(f"# {title}")
            lines.append("")
            lines.extend(body)
            lines.append("")
        return "\n".join(lines)

    def word_count(self, text: str) -> int:
        return len(re.sub(r"\s", "", text))

"""期刊论文生成器（Phase U，§20）。"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path

import yaml

from ..errors import GenerationError
from ..logging_setup import get_logger
from ..models import Language, ProjectConfig
from ..word_engine import WordEngine
from ..workspace import WorkspaceManager
from ..writing import hygiene_issues
from .base import DraftAssembler

logger = get_logger("journal")

DEFAULT_JOURNAL_RULES: dict = {
    "journal": "未指定期刊",
    "title_max_chars": 40,
    "abstract_words": 300,
    "keywords_n": 5,
    "citation_style": "gb-t7714",
    "structure": ["摘要", "引言", "文献综述", "研究设计", "实证结果", "结论", "参考文献"],
    "anonymous": False,
    "figure_format": "png",
}


@dataclass
class JournalChecks:
    issues: list[str] = field(default_factory=list)
    ok: bool = True


class JournalGenerator:
    def __init__(
        self,
        ws: WorkspaceManager,
        cfg: ProjectConfig,
        lit=None,
        assembler: DraftAssembler | None = None,
    ):
        self.ws = ws
        self.cfg = cfg
        self.lit = lit
        self.asm = assembler or DraftAssembler(ws, cfg, lit)

    # ---------- U001–U008 规则 ----------
    def load_rules(self, rules_file: str | Path | None = None) -> dict:
        if rules_file:
            p = Path(rules_file)
            if not p.is_file():
                raise GenerationError(f"期刊规则文件不存在: {p}")
            data = yaml.safe_load(p.read_text(encoding="utf-8")) or {}
        else:
            p = self.ws.root / "templates" / "journal-rules.yaml"
            data = (
                yaml.safe_load(p.read_text(encoding="utf-8"))
                if p.is_file()
                else dict(DEFAULT_JOURNAL_RULES)
            )
        if self.cfg.journal.target_journal:
            data["journal"] = self.cfg.journal.target_journal
        (self.ws.root / "templates").mkdir(parents=True, exist_ok=True)
        (self.ws.root / "templates" / "journal-rules.yaml").write_text(
            yaml.safe_dump(data, allow_unicode=True, sort_keys=False), encoding="utf-8"
        )
        self.rules = data
        return data

    # ---------- U009–U013 结构与内容 ----------
    def build_manuscript(self) -> dict:
        rules = getattr(self, "rules", None) or self.load_rules()
        topic = self.asm.read_if_exists("research/selected_topic.md")
        title = self._extract_field(topic, "题目") or self.cfg.project_name
        abstract_src = (
            self.asm.read_if_exists("analysis/quantitative/interpretation.md")
            or self.asm.read_if_exists("analysis/qualitative/themes.md")
            or self.asm.read_if_exists("analysis/theoretical/contribution.md")
        )
        abstract = self._make_abstract(title, abstract_src)
        keywords = self._make_keywords(topic)
        sections = []
        outline = self.asm.read_if_exists("research/outline.md")
        body_blocks = self._body_blocks(rules)
        sections.extend(body_blocks)
        manuscript = {
            "title": title,
            "abstract": abstract,
            "keywords": keywords,
            "sections": sections,
            "outline_found": bool(outline),
        }
        assembled = "\n".join(
            [manuscript["abstract"]] + [line for _, body in sections for line in body]
        )
        issues = hygiene_issues(assembled, citation_keys=set(self.asm.verified_citations()))
        if issues:
            raise GenerationError("期刊正文未通过卫生检查：" + "；".join(issues[:6]))
        self._write_markdown(manuscript)
        return manuscript

    def _extract_field(self, topic_md: str, field_name: str) -> str | None:
        m = re.search(rf"^##\s*{field_name}\s*\n+\s*(.+)$", topic_md, flags=re.M)
        return m.group(1).strip() if m else None

    def _make_abstract(self, title: str, src: str) -> str:
        head = [ln.strip("- #\n") for ln in src.splitlines() if ln.strip()][:4]
        body = "；".join(h for h in head if h) or f"研究主题为“{title}”。"
        return body[: self.rules.get("abstract_words", 300)]

    def _make_keywords(self, topic_md: str) -> list[str]:
        kws = []
        for ln in topic_md.splitlines():
            if "关键词" in ln:
                kws = [x.strip() for x in ln.split("：")[-1].split("、")]
                break
        if not kws:
            m = self._extract_field(topic_md, "题目")
            kws = (m or self.cfg.project_name).split("与")[: self.rules.get("keywords_n", 5)]
        return kws[: self.rules.get("keywords_n", 5)]

    def _body_blocks(self, rules: dict) -> list[tuple[str, list[str]]]:
        blocks = []
        citation_records = self.asm.citation_records()
        inputs = self.asm.research_inputs()
        results = self.asm.results_files()
        interpretation = self.asm.read_if_exists("analysis/quantitative/interpretation.md")
        themes = self.asm.read_if_exists("analysis/qualitative/themes.md")
        contribution = self.asm.read_if_exists("analysis/theoretical/contribution.md")
        structure = list(rules.get("structure", []))[1:]
        if "参考文献" not in structure:
            structure.append("参考文献")
        for sec_title in structure:
            lines: list[str] = []
            if sec_title == "引言":
                lines.extend(
                    (
                        inputs.get("selected_topic", "") or inputs.get("research_questions", "")
                    ).splitlines()[:6]
                )
            elif sec_title == "文献综述":
                lines = [f"- {item['citation']}" for item in citation_records[:8]]
            elif sec_title == "研究设计":
                lines = inputs.get("methods", "").splitlines()
            elif sec_title in ("实证结果", "案例分析", "研究结果"):
                for text in results.values():
                    lines.extend(text.splitlines()[:10])
                if interpretation:
                    lines.extend(interpretation.splitlines()[:8])
                if themes:
                    lines.extend(themes.splitlines()[:8])
            elif sec_title == "结论":
                lines.extend((contribution or interpretation).splitlines()[:10])
            elif sec_title == "参考文献":
                lines = [
                    f"{idx}. {item['citation']}" for idx, item in enumerate(citation_records, 1)
                ]
            blocks.append((sec_title, lines))
        return blocks

    def _write_markdown(self, m: dict) -> None:
        lines = [
            f"# {m['title']}",
            "",
            f"**摘要**：{m['abstract']}",
            "",
            "**关键词**：" + "、".join(m["keywords"]),
            "",
        ]
        for title, body in m["sections"]:
            lines.append(f"## {title}")
            lines.append("")
            lines.extend(body)
            lines.append("")
        out = self.ws.root / "manuscript" / "draft.md"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text("\n".join(lines), encoding="utf-8")

    # ---------- U017–U019 检查 ----------
    def language_and_style_check(self) -> JournalChecks:
        checks = JournalChecks()
        draft = self.asm.read_if_exists("manuscript/draft.md")
        if not draft:
            checks.ok = False
            checks.issues.append("manuscript/draft.md 不存在")
            return checks
        if self.cfg.language is Language.EN_US:
            for ln in draft.splitlines():
                if ln.startswith("#") or not ln.strip():
                    continue
                for sent in re.split(r"(?<=[.!?])\s+", ln):
                    words = sent.split()
                    if len(words) > 45:
                        checks.issues.append(f"过长英文句（{len(words)} 词）：{sent[:60]}…")
            checks.issues.append("英文五项检查需人工复核（terminology/tense/style 等）")
        issues = hygiene_issues(draft, citation_keys=set(self.asm.verified_citations()))
        checks.issues.extend(issues)
        checks.ok = not checks.issues
        return checks

    def anonymize(self, enabled: bool | None = None) -> Path:
        anon = self.rules.get("anonymous", False) if enabled is None else enabled
        draft = (self.ws.root / "manuscript" / "draft.md").read_text(encoding="utf-8")
        if anon:
            draft = re.sub(r"作者[:：].*", "作者：（匿名）", draft)
            draft = re.sub(r"机构[:：].*", "机构：（匿名）", draft)
        out = self.ws.root / "manuscript" / "submission.md"
        out.write_text(draft, encoding="utf-8")
        return out

    # ---------- U020 ----------
    def export_submission(self, out_rel: str = "deliverables/manuscript.docx") -> Path:
        src = self.ws.root / "manuscript" / "submission.md"
        if not src.is_file():
            src = self.ws.root / "manuscript" / "draft.md"
        if not src.is_file():
            raise GenerationError("稿件不存在")
        we = WordEngine(self.ws)
        out = we.generate(src, out_rel)
        if not we.verify(out)["ok"]:
            raise GenerationError("投稿稿 docx 校验失败")
        return out

"""学位论文生成器（Phase V，§21）。"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path

import yaml

from ..errors import GenerationError
from ..logging_setup import get_logger
from ..models import Language, ProjectConfig, ThesisLevel
from ..word_engine import WordEngine
from ..workspace import WorkspaceManager
from .base import DraftAssembler

logger = get_logger("thesis")

DEFAULT_THESIS_RULES: dict = {
    "school": "默认规范",
    "toc": [
        "摘要",
        "Abstract",
        "目录",
        "第一章 绪论",
        "第二章 文献综述",
        "第三章 研究设计",
        "第四章 实证/案例分析",
        "第五章 结论与展望",
        "参考文献",
        "致谢",
    ],
    "cover_fields": ["题目", "作者", "导师", "学科专业", "完成日期"],
    "abstract": {"zh": True, "en": True, "words": 500},
    "keywords": {"count": 5, "separator": "；"},
    "heading_numbering": "第X章 / X.Y",
    "figure_numbering": "图 X-Y",
    "reference_style": "gb-t7714",
    "header_footer": {"header": "校名/论文题目", "footer": "页码"},
}

LEVEL_REQUIREMENTS = {
    ThesisLevel.BACHELOR: {"min_words": 8000},
    ThesisLevel.MASTER: {"min_words": 30000},
    ThesisLevel.PHD: {"min_words": 80000},
}


@dataclass
class ThesisChecks:
    issues: list[str] = field(default_factory=list)

    @property
    def ok(self) -> bool:
        return not self.issues


class ThesisGenerator:
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

    # ---------- V001–V008 规则 ----------
    def load_rules(self, template_path: str | Path | None = None) -> dict:
        if template_path:
            p = Path(template_path)
            if not p.is_file():
                raise GenerationError(f"学校模板不存在: {p}")
            if p.suffix == ".yaml":
                data = yaml.safe_load(p.read_text(encoding="utf-8")) or {}
            elif p.suffix == ".docx":
                spec = WordEngine(self.ws).parse_docx_template(p, name="school")
                data = {"school": spec.name}
            else:
                raise GenerationError("学位论文模板只支持 yaml/docx")
        else:
            p = self.ws.root / "templates" / "thesis" / "template-spec.yaml"
            data = yaml.safe_load(p.read_text(encoding="utf-8")) or {} if p.is_file() else {}
        rules = dict(DEFAULT_THESIS_RULES)
        rules.update({k: v for k, v in data.items() if v})
        rules["level_requirements"] = LEVEL_REQUIREMENTS.get(
            self.cfg.thesis.degree_level, LEVEL_REQUIREMENTS[ThesisLevel.BACHELOR]
        )
        (self.ws.root / "templates" / "thesis").mkdir(parents=True, exist_ok=True)
        (self.ws.root / "templates" / "thesis" / "template-spec.yaml").write_text(
            yaml.safe_dump(rules, allow_unicode=True, sort_keys=False), encoding="utf-8"
        )
        self.rules = rules
        return rules

    # ---------- V009–V010 正文与交叉引用 ----------
    def build_body(self) -> str:
        rules = getattr(self, "rules", None) or self.load_rules()
        topic = self.asm.read_if_exists("research/selected_topic.md")
        title = self._field(topic, "题目") or self.cfg.project_name
        sections: list[tuple[str, list[str]]] = []
        # 摘要
        abstract_src = (
            self.asm.read_if_exists("analysis/quantitative/interpretation.md")
            or self.asm.read_if_exists("analysis/qualitative/themes.md")
            or self.asm.read_if_exists("analysis/theoretical/contribution.md")
        )
        zh_abs = self._abstract(abstract_src, title)
        sections.append(("摘要", [zh_abs]))
        if self.cfg.language is Language.ZH_CN and rules["abstract"].get("en", True):
            sections.append(("Abstract", ["(English abstract to be finalized.)"]))
        # 章节
        chapters = [t for t in rules["toc"] if t.startswith("第")]
        body_map = self._chapter_bodies()
        for ch in chapters:
            key = next((k for k in body_map if k in ch), None)
            sections.append(
                (ch, body_map.get(key or "", ["（依 research/ 与 analysis/ 产出撰写）"]))
            )
        # 参考文献
        refs = [f"[bib:{k}]" for k in list(self.asm.verified_citations())[:8]]
        sections.append(("参考文献", refs or ["（暂无已核验引用）"]))
        sections.append(("致谢", ["（由作者完成）"]))

        lines = ["# " + title, ""]
        for t, body in sections:
            lines += [f"# {t}", ""]
            lines += body + [""]
        text = self._renumber_figures("\n".join(lines))
        out = self.ws.root / "manuscript" / "draft.md"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(text, encoding="utf-8")
        return text

    def _field(self, topic_md: str, name: str) -> str | None:
        m = re.search(rf"^##\s*{name}\s*\n+\s*(.+)$", topic_md, flags=re.M)
        return m.group(1).strip() if m else None

    def _abstract(self, src: str, title: str) -> str:
        head = [ln.strip("- #\n") for ln in src.splitlines() if ln.strip()][:5]
        return "；".join(h for h in head if h)[:500] or f"本文围绕{title}展开研究。"

    def _chapter_bodies(self) -> dict[str, list[str]]:
        rq = self.asm.read_if_exists("research/research_questions.md")
        fw = self.asm.read_if_exists("research/framework.md")
        methods = self.asm.read_if_exists("research/methods.md")
        results = ""
        for name, text in self.asm.results_files().items():
            results += f"\n（results/{name}）\n" + "\n".join(text.splitlines()[:4]) + "\n"
        themes = self.asm.read_if_exists("analysis/qualitative/themes.md")
        theory = self.asm.read_if_exists("analysis/theoretical/contribution.md")
        citations = list(self.asm.verified_citations())
        return {
            "绪论": [
                f"研究背景与问题：{rq.splitlines()[0] if rq else '见 research/research_questions.md'}",
                f"理论视角概要：{(fw.splitlines()[0] if fw else '')}",
            ],
            "文献综述": [
                f"文献索引见 literature/literature_index.md；核心文献 [bib:{citations[0]}]。"
                if citations
                else "文献索引见 literature/literature_index.md。"
            ],
            "研究设计": [methods or "见 research/methods.md"],
            "实证": [
                results or "见 results/ 与 figures/",
                f"定性主题见 analysis/qualitative/themes.md（{len(themes.splitlines())} 行）"
                if themes
                else "",
            ],
            "案例": [results or "见 results/ 与 figures/"],
            "结论": [
                theory or "结论与讨论依 analysis/ 产出撰写。",
                f"创新点回顾：{self._innovation(fw)}",
            ],
        }

    @staticmethod
    def _innovation(fw: str) -> str:
        for ln in fw.splitlines():
            if "初步命题" in ln:
                return ln.strip("- ").strip()
        return "见 research/framework.md"

    _CN_NUM = {"一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6}

    @classmethod
    def _renumber_figures(cls, text: str) -> str:
        """V010 图表编号按章重排：第三章中「图 图1」→「图注：图 3-1 …」。"""
        chapter = 0
        counter = 0
        out = []
        for ln in text.splitlines():
            m_ch = re.match(r"^#\s*第([一二三四五六])章", ln)
            if m_ch:
                chapter = cls._CN_NUM[m_ch.group(1)]
                counter = 0
            m = re.match(r"^图\s*(图?\d*)\s*(.*)$", ln)
            if m and chapter:
                counter += 1
                ln = f"图注：图 {chapter}-{counter} {m.group(2)}（来源见 figures/）"
            out.append(ln)
        return "\n".join(out)

    # ---------- V011–V014 检查 ----------
    def consistency_checks(self) -> ThesisChecks:
        checks = ThesisChecks()
        draft = self.asm.read_if_exists("manuscript/draft.md")
        if not draft:
            checks.issues.append("manuscript/draft.md 不存在")
            return checks
        rules = getattr(self, "rules", None) or self.load_rules()
        # V011 章节逻辑：目录章节都出现在正文
        for ch in rules["toc"]:
            if ch.startswith("第") and ch not in draft:
                checks.issues.append(f"缺少章节：{ch}")
        # V012 理论主线：绪论与结论都引用框架
        fw = self.asm.read_if_exists("research/framework.md")
        if fw:
            key = fw.splitlines()[0][:12]
            if key and key not in draft:
                checks.issues.append("理论主线未贯穿（框架要点未在正文复现）")
        # V013 研究问题覆盖：RQ1–RQ3 在绪论与结论出现
        for rqid in ("RQ1", "RQ2", "RQ3"):
            if rqid in self.asm.read_if_exists("research/research_questions.md"):
                if draft.count(rqid) < 2:
                    checks.issues.append(f"{rqid} 未在绪论+结论两处呼应")
        # V014 创新点证据
        if (
            "创新" in draft
            and "figures/" not in draft
            and "results/" not in draft
            and "analysis/" not in draft
        ):
            checks.issues.append("创新点缺少证据指针（results/figures/analysis）")
        # 字数
        min_words = rules["level_requirements"]["min_words"]
        n = self.asm.word_count(draft)
        if n < min_words:
            checks.issues.append(
                f"字数不足（{n}/{min_words}，{self.cfg.thesis.degree_level.value}）"
            )
        return checks

    # ---------- V015/V016 答辩 ----------
    def defense_ppt_input(self) -> Path:
        checks = self.consistency_checks()
        payload = {
            "title": self.cfg.project_name,
            "audience": "答辩委员会",
            "pages_hint": 15,
            "sections": [
                {"title": "研究问题与意义", "bullets": ["RQ1–RQ3", "理论与现实价值"]},
                {"title": "研究设计", "bullets": ["数据与方法", "技术路线"]},
                {"title": "主要发现", "bullets": ["核心结果见 results/summary.json 与 themes.md"]},
                {"title": "贡献与局限", "bullets": ["创新点与证据", "边界条件"]},
            ],
            "figures": self.asm.figures_available(),
            "open_issues": checks.issues,
        }
        out = self.ws.root / "slides" / "ppt-content.yaml"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(
            yaml.safe_dump(payload, allow_unicode=True, sort_keys=False), encoding="utf-8"
        )
        return out

    def defense_questions(self) -> Path:
        qs = [
            "你的核心研究问题是什么？与既有研究的差别在哪里？",
            "关键变量的操作化和数据来源是否可靠？",
            "内生性/替代解释是如何处理的？",
            "结论的边界条件是什么？能否推广？",
            "创新点的证据支持是什么？",
        ]
        if self.cfg.research_paradigm and self.cfg.research_paradigm.value == "qualitative":
            qs += ["编码信度如何保证？负例与饱和度检查结果如何？"]
        if self.cfg.research_paradigm and self.cfg.research_paradigm.value == "quantitative":
            qs += ["稳健性检验的结果是否一致？工具变量的排他性如何论证？"]
        p = self.ws.root / "reviews" / "defense-questions.md"
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(
            "# 答辩问题预测\n\n" + "\n".join(f"{i}. {q}" for i, q in enumerate(qs, 1)) + "\n",
            encoding="utf-8",
        )
        return p

    # ---------- V017 ----------
    def export_docx(self, out_rel: str = "deliverables/thesis.docx") -> Path:
        src = self.ws.root / "manuscript" / "draft.md"
        if not src.is_file():
            raise GenerationError("manuscript/draft.md 不存在")
        we = WordEngine(self.ws)
        spec = we.load_spec("templates/thesis/template-spec.yaml")
        out = we.generate(src, out_rel, spec=spec)
        if not we.verify(out)["ok"]:
            raise GenerationError("学位论文 docx 校验失败")
        return out

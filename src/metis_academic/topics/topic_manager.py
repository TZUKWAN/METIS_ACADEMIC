"""选题模块（Phase K，§12）。

每个候选选题独立保存 topics/topic_XXX.md；三个标准 Action：
topic.confirm / topic.edit / topic.delete；确认后复制为
research/selected_topic.md 并锁定，后续流程以它为主要研究对象。
"""

from __future__ import annotations

import re
import shutil
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

import yaml

from ..adapters.base import Choice
from ..errors import MetisError
from ..literature import LiteratureManager, LiteratureRecord
from ..logging_setup import get_logger
from ..workspace import WorkspaceManager

logger = get_logger("topics")

REQUIRED_SECTIONS = [
    "题目",
    "研究问题",
    "研究价值",
    "理论基础",
    "可能方法",
    "可能数据",
    "初步框架",
    "参考文献",
    "参考网页",
    "潜在风险",
    "创新空间",
]

METHODS_BY_PARADIGM = {
    "qualitative": "案例研究 / 半结构化访谈 / 主题分析",
    "quantitative": "问卷调查 / 面板回归 / 中介-调节效应检验",
    "theoretical": "概念史梳理 / 文献谱系分析 / 理论建构",
}
DATA_BY_PARADIGM = {
    "qualitative": "访谈录音转写、政策文本、机构档案（inputs/existing-data 或公开语料）",
    "quantitative": "CGSS/CFPS/CHFS 等公开调查数据或统计数据（data/raw）",
    "theoretical": "经典文本、核心期刊论文谱系",
}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


@dataclass
class TopicCandidate:
    """选题候选（K001）。"""

    id: str  # topic_001
    title: str
    research_question: str = ""
    value: str = ""
    theory: str = ""
    methods: str = ""
    data: str = ""
    framework: str = ""
    references: list[str] = None  # type: ignore[assignment]
    webpages: list[str] = None  # type: ignore[assignment]
    risks: str = ""
    innovation: str = ""
    created_at: str = ""

    def __post_init__(self):
        self.references = self.references or []
        self.webpages = self.webpages or []
        if not self.created_at:
            self.created_at = _now()

    def to_markdown(self) -> str:
        lines = [
            "---",
            yaml.safe_dump(
                {"id": self.id, "created_at": self.created_at, "locked": False},
                allow_unicode=True,
                sort_keys=False,
            ),
            "---",
            "",
        ]
        body = {
            "题目": self.title,
            "研究问题": self.research_question,
            "研究价值": self.value,
            "理论基础": self.theory,
            "可能方法": self.methods,
            "可能数据": self.data,
            "初步框架": self.framework,
            "参考文献": "\n".join(f"- {r}" for r in self.references) or "- （待补充）",
            "参考网页": "\n".join(f"- {w}" for w in self.webpages) or "- （待补充）",
            "潜在风险": self.risks,
            "创新空间": self.innovation,
        }
        for sec in REQUIRED_SECTIONS:
            lines += [f"## {sec}", "", str(body[sec]), ""]
        return "\n".join(lines)

    @classmethod
    def from_markdown(cls, text: str, fallback_id: str = "topic_000") -> TopicCandidate:
        fm = {}
        m = re.match(r"^---\n(.*?)\n---\n", text, flags=re.S)
        if m:
            fm = yaml.safe_load(m.group(1)) or {}
            text = text[m.end() :]
        sections: dict[str, str] = {}
        current = None
        buf: list[str] = []
        for line in text.splitlines():
            h = re.match(r"^##\s+(.+?)\s*$", line)
            if h:
                if current:
                    sections[current] = "\n".join(buf).strip()
                current, buf = h.group(1).strip(), []
            elif current is not None:
                buf.append(line)
        if current:
            sections[current] = "\n".join(buf).strip()

        def bullets(sec: str) -> list[str]:
            return [
                ln[2:].strip()
                for ln in sections.get(sec, "").splitlines()
                if ln.strip().startswith("- ")
            ]

        missing = [s for s in REQUIRED_SECTIONS if s not in sections]
        if missing:
            raise MetisError(f"选题文件缺少小节: {missing}")
        return cls(
            id=fm.get("id", fallback_id),
            created_at=fm.get("created_at", ""),
            title=sections["题目"],
            research_question=sections["研究问题"],
            value=sections["研究价值"],
            theory=sections["理论基础"],
            methods=sections["可能方法"],
            data=sections["可能数据"],
            framework=sections["初步框架"],
            references=bullets("参考文献"),
            webpages=bullets("参考网页"),
            risks=sections["潜在风险"],
            innovation=sections["创新空间"],
        )


class TopicManager:
    def __init__(self, ws: WorkspaceManager, lit: LiteratureManager | None = None):
        self.ws = ws
        self.lit = lit
        self.topics_dir = ws.root / "topics"
        self.topics_dir.mkdir(parents=True, exist_ok=True)

    # ---------- 生成（K002–K014） ----------
    def generate_candidates(
        self,
        count: int = 3,
        paradigm: str = "qualitative",
        theme: str = "",
        web_background: str = "",
    ) -> list[TopicCandidate]:
        """从文献缺口 + Workspace 材料 + 网页背景生成候选选题（确定性模板生成，
        供对话 LLM 润色；每条参考都来自真实检索结果）。"""
        records: list[LiteratureRecord] = (
            sorted(self.lit.verified_records(), key=lambda r: (-(r.year or 0), r.title))[
                : count * 3
            ]
            if self.lit
            else []
        )
        existing = [t for t in self._workspace_text()] if theme == "" else [theme]
        out: list[TopicCandidate] = []
        for i in range(1, count + 1):
            base_lit = records[(i - 1) % max(len(records), 1) :][:3]
            refs = [
                f"{a}（{r.year}）：《{r.title}》" for r in base_lit for a in r.authors[:1]
            ] or []
            theme_txt = theme or (existing[0] if existing else "待定主题")
            gap = (
                f"现有研究（见参考文献）对「{theme_txt}」的机制解释仍以单一层面为主，"
                "缺乏跨层次整合与因果边界条件的讨论。"
            )
            cand = TopicCandidate(
                id=self._next_id(),
                title=f"{theme_txt}的{self._angle(i)}研究",
                research_question=(
                    f"{theme_txt}中的{self._angle(i)}是如何发生的？其边界条件与作用机制是什么？"
                ),
                value=f"理论：回应{gap[:40]}…；现实：为相关政策与实践提供依据。",
                theory=f"以{self._theory(i)}为分析视角整合既有解释。",
                methods=METHODS_BY_PARADIGM.get(paradigm, METHODS_BY_PARADIGM["qualitative"]),
                data=DATA_BY_PARADIGM.get(paradigm, DATA_BY_PARADIGM["qualitative"]),
                framework=(
                    f"①界定{theme_txt}核心概念 → ②构建{self._angle(i)}分析框架"
                    " → ③实证/理论检验 → ④机制与边界条件讨论"
                ),
                references=refs,
                webpages=[web_background] if web_background else [],
                risks="数据可得性不足；概念操作化争议；因果识别困难。",
                innovation=f"将{self._angle(i)}纳入统一框架并给出可检验机制。",
            )
            cand.to_markdown()
            (self.topics_dir / f"{cand.id}.md").write_text(cand.to_markdown(), encoding="utf-8")
            out.append(cand)
        return out

    @staticmethod
    def _angle(i: int) -> str:
        return ["形成机制", "影响效应", "演化路径"][min(i - 1, 2)]

    @staticmethod
    def _theory(i: int) -> str:
        return ["制度逻辑理论", "资源依赖理论", "场域-惯习理论"][min(i - 1, 2)]

    def _workspace_text(self) -> list[str]:
        inv = self.ws.root / "research" / "materials_inventory.md"
        if inv.is_file():
            lines = [ln.strip("- \n") for ln in inv.read_text(encoding="utf-8").splitlines()]
            return [ln for ln in lines if ln][:5]
        return []

    def _next_id(self) -> str:
        existing = sorted(self.topics_dir.glob("topic_*.md"))
        return f"topic_{len(existing) + 1:03d}"

    # ---------- 读取 ----------
    def list_topics(self) -> list[TopicCandidate]:
        out = []
        for f in sorted(self.topics_dir.glob("topic_*.md")):
            out.append(
                TopicCandidate.from_markdown(f.read_text(encoding="utf-8"), fallback_id=f.stem)
            )
        return out

    def get(self, topic_id: str) -> tuple[TopicCandidate, Path]:
        f = self.topics_dir / f"{topic_id}.md"
        if not f.is_file():
            raise MetisError(f"选题不存在: {topic_id}")
        return TopicCandidate.from_markdown(f.read_text(encoding="utf-8"), fallback_id=topic_id), f

    # ---------- 三个标准 Action（K016–K018） ----------
    ACTIONS = [
        Choice(value="topic.confirm", label="确认选题"),
        Choice(value="topic.edit", label="编辑选题"),
        Choice(value="topic.delete", label="删除选题"),
    ]

    def confirm(self, topic_id: str, force: bool = False) -> Path:
        cand, f = self.get(topic_id)
        selected = self.ws.root / "research" / "selected_topic.md"
        lock = self.ws.root / "research" / ".topic-lock.json"
        if lock.is_file() and not force:
            raise MetisError("selected_topic 已锁定；如需更换请先 topic.unlock")
        selected.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(f, selected)
        lock.write_text(
            yaml.safe_dump(
                {"selected": topic_id, "title": cand.title, "at": _now()},
                allow_unicode=True,
                sort_keys=False,
            ),
            encoding="utf-8",
        )
        logger.info("选题确认: %s (%s)", topic_id, cand.title)
        return selected

    def unlock(self) -> None:
        lock = self.ws.root / "research" / ".topic-lock.json"
        if lock.is_file():
            lock.unlink()

    def edit(self, topic_id: str, section: str, value: str) -> None:
        if section not in REQUIRED_SECTIONS:
            raise MetisError(f"非法小节: {section}")
        cand, f = self.get(topic_id)
        setattr(cand, self._attr(section), value)
        f.write_text(cand.to_markdown(), encoding="utf-8")

    def delete(self, topic_id: str) -> None:
        _, f = self.get(topic_id)
        f.unlink()
        lock = self.ws.root / "research" / ".topic-lock.json"
        if lock.is_file():
            data = yaml.safe_load(lock.read_text(encoding="utf-8")) or {}
            if data.get("selected") == topic_id:
                self.unlock()

    @staticmethod
    def _attr(section: str) -> str:
        return {
            "题目": "title",
            "研究问题": "research_question",
            "研究价值": "value",
            "理论基础": "theory",
            "可能方法": "methods",
            "可能数据": "data",
            "初步框架": "framework",
            "参考文献": "references",
            "参考网页": "webpages",
            "潜在风险": "risks",
            "创新空间": "innovation",
        }[section]

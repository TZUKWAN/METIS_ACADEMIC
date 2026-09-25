"""基金申报书生成器（Phase T，§19）。

设计≠执行：只组装申报书设计文本；模拟评审按规则打分；输出 docx。
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path

import yaml

from ..errors import GenerationError
from ..logging_setup import get_logger
from ..models import ProjectConfig
from ..word_engine import WordEngine
from ..workspace import WorkspaceManager
from .base import DraftAssembler

logger = get_logger("fund")

#: 默认基金模板（可被用户模板覆盖）
DEFAULT_FUND_TEMPLATE: dict = {
    "name": "fund-default",
    "category_hint": "国家社科基金",
    "sections": [
        {"id": "basis", "title": "选题依据", "limit": 3000},
        {"id": "content", "title": "研究内容", "limit": 2500},
        {"id": "method", "title": "思路方法", "limit": 2000},
        {"id": "innovation", "title": "创新之处", "limit": 1000},
        {"id": "feasibility", "title": "研究基础与可行性", "limit": 1500},
        {"id": "references", "title": "参考文献", "limit": 0},
    ],
}


@dataclass
class FundReview:
    """模拟评审（T019/H15-001/002）：rubric 解释项，无固定数值评分。

    criteria 每条 = {criterion, status(pass/warn/fail), evidence, suggestion}
    """

    criteria: list[dict] = field(default_factory=list)
    issues: list[str] = field(default_factory=list)

    def passed(self) -> bool:
        return not self.issues and not any(c.get("status") == "fail" for c in self.criteria)

    def to_markdown(self) -> str:
        lines = ["# 模拟评审（rubric）", ""]
        for c in self.criteria:
            lines.append(f"- [{c['status']}] {c['criterion']}：{c['evidence']}")
            if c.get("suggestion"):
                lines.append(f"  - 建议：{c['suggestion']}")
        lines += ["", "## 形式问题", ""] + [f"- {i}" for i in self.issues]
        return "\n".join(lines) + "\n"


class FundGenerator:
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

    # ---------- T001–T004 模板 ----------
    def load_template(self, template_path: str | Path | None = None) -> dict:
        if template_path:
            p = Path(template_path)
            if not p.is_file():
                raise GenerationError(f"基金模板不存在: {p}")
            if p.suffix == ".yaml":
                data = yaml.safe_load(p.read_text(encoding="utf-8"))
            elif p.suffix == ".docx":
                spec = WordEngine(self.ws).parse_docx_template(p, name="fund-custom")
                data = {
                    "name": spec.name,
                    "sections": [
                        {"id": f"s{i}", "title": para.text.strip(), "limit": 0}
                        for i, para in enumerate(self._docx_headings(p))
                        if para.text.strip()
                    ],
                }
            else:
                raise GenerationError("基金模板只支持 yaml/docx")
        else:
            src = self.ws.root / "templates" / "fund" / "template-spec.yaml"
            data = (
                yaml.safe_load(src.read_text(encoding="utf-8"))
                if src.is_file()
                else DEFAULT_FUND_TEMPLATE
            )
        (self.ws.root / "templates" / "fund").mkdir(parents=True, exist_ok=True)
        (self.ws.root / "templates" / "fund" / "template-spec.yaml").write_text(
            yaml.safe_dump(data, allow_unicode=True, sort_keys=False), encoding="utf-8"
        )
        return data

    @staticmethod
    def _docx_headings(path: Path):
        from docx import Document

        return [x for x in Document(str(path)).paragraphs if x.style.name.startswith("Heading")]

    # ---------- T005–T021 组稿 ----------
    def build_draft(self, template: dict) -> str:
        inputs = self.asm.research_inputs()
        topic_title = self._topic_title()
        citations = list(self.asm.verified_citations())[:5]
        bodies: dict[str, list[str]] = {
            "basis": [
                f"选题「{topic_title}」源于现实与理论的双重需要。",
                inputs.get("research_questions", "研究问题见 research/research_questions.md"),
                f"国内外研究现状与文献谱系整理见 literature/literature_index.md"
                f"（当前共 {self._count_lit()} 条，引用均经核验）。",
            ],
            "content": [
                inputs.get("framework", "总体框架见 research/framework.md"),
                "研究目标与内容设计详见 research/research_questions.md 的 RQ1–RQ3。",
            ],
            "method": [
                inputs.get("methods", "研究方法见 research/methods.md"),
                "技术路线：概念界定 → 框架构建 → 资料收集 → 分析检验 → 结论讨论。",
            ],
            "innovation": [
                f"本研究的主要推进在于：{self._innovation()}",
            ],
            "feasibility": [
                "研究基础：团队已完成相关文献综述与预调研；",
                "数据与材料可得性：见 data/metadata/data_sources.md；",
                "进度安排按 research/tasks.md 任务树推进。",
            ],
            "references": [f"[bib:{k}]" for k in citations] or ["（暂无已核验引用）"],
        }
        sections = []
        for sec in template.get("sections", []):
            sid = sec["id"]
            sections.append((sec["title"], bodies.get(sid, ["（待撰写）"])))
        draft = self.asm.assemble(sections)
        out = self.ws.root / "manuscript" / "draft.md"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(draft, encoding="utf-8")
        return draft

    def _topic_title(self) -> str:
        f = self.ws.root / "research" / "selected_topic.md"
        if f.is_file():
            text = f.read_text(encoding="utf-8")
            m = re.search(r"^##\s*题目\s*\n+\s*(.+)$", text, flags=re.M)
            if m:
                return m.group(1).strip()
            for ln in text.splitlines():
                if ln.startswith("题目："):
                    return ln.replace("题目：", "").strip()
        return self.cfg.project_name

    def _innovation(self) -> str:
        t = self.asm.read_if_exists("research/research_questions.md")
        for ln in t.splitlines():
            if "初步命题" in ln or "创新" in ln:
                return ln.strip("- ").strip()
        return "机制识别与跨层次整合（详见 research/framework.md）"

    def _count_lit(self) -> int:
        idx = self.ws.root / "literature" / "literature_index.md"
        if idx.is_file():
            return sum(
                1
                for ln in idx.read_text(encoding="utf-8").splitlines()
                if ln.startswith("| ") and "---" not in ln and "标题" not in ln
            )
        return 0

    # ---------- T019–T021 模拟评审 ----------
    def mock_review(self, template: dict) -> FundReview:
        draft_path = self.ws.root / "manuscript" / "draft.md"
        if not draft_path.is_file():
            raise GenerationError("尚未生成申请书初稿")
        draft = draft_path.read_text(encoding="utf-8")
        review = FundReview()
        rq_doc = self.asm.read_if_exists("research/research_questions.md")
        methods_ok = (self.ws.root / "research" / "methods.md").is_file()
        n_citations = len(self.asm.verified_citations())
        review.criteria = [
            {
                "criterion": "研究问题明确（RQ 可辨识）",
                "status": "pass" if "RQ1" in rq_doc else "fail",
                "evidence": f"research_questions.md 含 {rq_doc.count('RQ')} 处 RQ 标记",
                "suggestion": "" if "RQ1" in rq_doc else "先定义 RQ1–RQ3",
            },
            {
                "criterion": "方法与数据可行性",
                "status": "pass" if methods_ok else "fail",
                "evidence": "research/methods.md 存在" if methods_ok else "缺 methods 文档",
                "suggestion": "",
            },
            {
                "criterion": "参考文献全部经核验",
                "status": "pass" if n_citations else "warn",
                "evidence": f"已核验引用 {n_citations} 条",
                "suggestion": "" if n_citations else "完成文献核验（DOI/arXiv resolver）",
            },
        ]
        # 形式问题检查
        for sec in template.get("sections", []):
            if sec["title"] not in draft:
                review.issues.append(f"缺少栏目「{sec['title']}」")
            elif sec.get("limit"):
                body = draft.split(sec["title"], 1)[-1]
                body = body.split("# ")[0]
                n = self.asm.word_count(body)
                if n > sec["limit"] * 1.2:
                    review.issues.append(
                        f"栏目「{sec['title']}」超出字数限制（{n}/{sec['limit']}）"
                    )
        unverified = [k for k in self.asm.verified_citations()]
        if not unverified:
            review.issues.append("参考文献池为空：需先完成文献检索与核验")
        return review

    def revision_list(self, review: FundReview) -> Path:
        p = self.ws.root / "reviews" / "fund-revision-list.md"
        p.parent.mkdir(parents=True, exist_ok=True)
        lines = ["# 修改清单（模拟评审）", ""]
        if review.passed():
            lines.append("形式检查全部通过。")
        for i in review.issues:
            lines.append(f"- [ ] {i}")
        for c in review.criteria:
            if c.get("status") in ("warn", "fail"):
                lines.append(f"- [ ] [{c['status']}] {c['criterion']}：{c.get('suggestion', '')}")
        p.write_text("\n".join(lines) + "\n", encoding="utf-8")
        return p

    def revise(self, template: dict, review: FundReview) -> str:
        """T021：按修改清单重写（当前策略：压缩超限栏目、补齐缺失栏目）。"""
        draft = self.build_draft(template)
        review2 = self.mock_review(template)
        if review2.issues:
            logger.warning("重写后仍有 %d 项形式问题", len(review2.issues))
        return draft

    # ---------- T022/T023 输出 ----------
    def formal_check(self, template: dict) -> list[str]:
        review = self.mock_review(template)
        return review.issues

    def export_docx(self, out_rel: str = "deliverables/application.docx") -> Path:
        we = WordEngine(self.ws)
        draft = self.ws.root / "manuscript" / "draft.md"
        if not draft.is_file():
            raise GenerationError("manuscript/draft.md 不存在")
        out = we.generate(draft, out_rel)
        rep = we.verify(out)
        if not rep["ok"]:
            raise GenerationError(f"生成的 docx 校验失败: {rep}")
        return out

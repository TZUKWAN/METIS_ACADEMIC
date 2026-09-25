"""Word Engine（Phase W，§23）。

- template-spec.yaml：页面/字体/字号/行距/标题层级等排版规范
- 支持默认模板、自然语言参数、上传 DOCX 解析（OOXML via python-docx）
- markdown 草稿 → docx；生成后回读验证
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml

from ..errors import TemplateError
from ..logging_setup import get_logger
from ..workspace import WorkspaceManager

logger = get_logger("word")

DEFAULT_SPEC: dict[str, Any] = {
    "name": "metis-default",
    "page": {"size": "A4", "margin_cm": {"top": 2.5, "bottom": 2.5, "left": 3.0, "right": 2.5}},
    "body": {
        "font_east": "宋体",
        "font_west": "Times New Roman",
        "size_pt": 12,
        "line_spacing": 1.5,
        "first_line_indent_cm": 0.74,
    },
    "headings": {
        "h1": {"font_east": "黑体", "size_pt": 16, "bold": True},
        "h2": {"font_east": "黑体", "size_pt": 14, "bold": True},
        "h3": {"font_east": "宋体", "size_pt": 12, "bold": True},
    },
    "caption": {"font_east": "宋体", "size_pt": 10.5, "bold": False},
    "references": {"citation_style": "gb-t7714", "hanging_indent": True},
}

#: 自然语言排版参数（W002）
_NL_PATTERNS: list[tuple[str, re.Pattern]] = [
    ("body.font_east", re.compile(r"(宋体|黑体|楷体|仿宋|微软雅黑)")),
    ("body.size_pt", re.compile(r"(小四|四号|五号|\d+(?:\.\d+)?\s*pt)")),
    ("body.line_spacing", re.compile(r"([12](?:\.5)?)\s*倍")),
]

_SIZE_WORDS = {"五号": 10.5, "小四": 12, "四号": 14}


@dataclass
class TemplateSpec:
    """template-spec 模型（W015）。"""

    data: dict = field(default_factory=lambda: DEFAULT_SPEC)

    @property
    def name(self) -> str:
        return self.data.get("name", "spec")

    def to_yaml(self) -> str:
        return yaml.safe_dump(self.data, allow_unicode=True, sort_keys=False)

    @classmethod
    def from_yaml(cls, text: str) -> TemplateSpec:
        return cls(data=yaml.safe_load(text))

    def merge(self, other: dict) -> None:
        def deep(a: dict, b: dict) -> dict:
            out = dict(a)
            for k, v in b.items():
                out[k] = deep(a[k], v) if isinstance(v, dict) and isinstance(a.get(k), dict) else v
            return out

        self.data = deep(self.data, other)


def parse_nl_requirements(text: str) -> dict:
    """「宋体小四、1.5倍行距、黑体三号标题」→ spec 覆盖片段（W002）。"""
    overrides: dict[str, Any] = {}
    m = _NL_PATTERNS[0][1].search(text)
    if m:
        overrides.setdefault("body", {})["font_east"] = m.group(1)
    m = _NL_PATTERNS[1][1].search(text)
    if m:
        token = m.group(1)
        size = _SIZE_WORDS.get(token, None)
        if size is None:
            size = float(re.sub(r"[^\d.]", "", token))
        overrides.setdefault("body", {})["size_pt"] = size
    m = _NL_PATTERNS[2][1].search(text)
    if m:
        overrides.setdefault("body", {})["line_spacing"] = float(m.group(1))
    return overrides


class WordEngine:
    def __init__(self, ws: WorkspaceManager):
        self.ws = ws
        try:
            import docx  # noqa: F401
        except ImportError as e:
            raise TemplateError("需要 python-docx：pip install python-docx") from e

    # ---------- W004–W014 上传模板解析 ----------
    def parse_docx_template(self, docx_path: str | Path, name: str = "custom") -> TemplateSpec:
        """解包 DOCX，提取页面设置/字体/字号/行距/标题样式 → TemplateSpec。"""
        from docx import Document

        p = Path(docx_path)
        if not p.is_file():
            raise TemplateError(f"模板不存在: {p}")
        try:
            doc = Document(str(p))
        except Exception as e:
            raise TemplateError(f"DOCX 解析失败: {e}") from e
        spec = TemplateSpec()
        spec.data["name"] = name
        sec = doc.sections[0]
        spec.data["page"] = {
            "size": f"{sec.page_width.cm:.1f}x{sec.page_height.cm:.1f}cm",
            "margin_cm": {
                "top": round(sec.top_margin.cm, 2),
                "bottom": round(sec.bottom_margin.cm, 2),
                "left": round(sec.left_margin.cm, 2),
                "right": round(sec.right_margin.cm, 2),
            },
        }
        # 正文样式：取第一个 Normal 段落字体
        body_font, body_size, spacing = "宋体", 12.0, 1.5
        for para in doc.paragraphs:
            if para.text.strip():
                run = para.runs[0] if para.runs else None
                if run is not None:
                    body_font = run.font.name or body_font
                    if run.font.size:
                        body_size = run.font.size.pt
                if para.paragraph_format.line_spacing:
                    spacing = float(para.paragraph_format.line_spacing)
                break
        spec.data.setdefault("body", {})
        spec.data["body"].update(
            {"font_east": body_font, "size_pt": body_size, "line_spacing": spacing}
        )
        # 标题样式（Heading 1-3）
        headings: dict[str, Any] = {}
        for style_name, key in (("Heading 1", "h1"), ("Heading 2", "h2"), ("Heading 3", "h3")):
            try:
                st = doc.styles[style_name]
                font = st.font
                headings[key] = {
                    "font_east": font.name or "黑体",
                    "size_pt": font.size.pt if font.size else 14,
                    "bold": bool(font.bold),
                }
            except KeyError:
                continue
        if headings:
            spec.data["headings"] = headings
        # 页眉页脚有无（W014）
        spec.data["header_footer"] = {
            "header": bool(
                sec.header
                and sec.header.paragraphs
                and any(x.text.strip() for x in sec.header.paragraphs)
            ),
            "footer": bool(
                sec.footer
                and sec.footer.paragraphs
                and any(x.text.strip() for x in sec.footer.paragraphs)
            ),
        }
        return spec

    # ---------- W015/W017 保存 ----------
    def save_spec(self, spec: TemplateSpec, rel: str = "templates/template-spec.yaml") -> Path:
        p = self.ws.resolve(rel)
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(spec.to_yaml(), encoding="utf-8")
        return p

    def load_spec(self, rel: str = "templates/template-spec.yaml") -> TemplateSpec:
        p = self.ws.resolve(rel)
        if not p.is_file():
            return TemplateSpec()
        return TemplateSpec.from_yaml(p.read_text(encoding="utf-8"))

    # ---------- W016/W018 应用 spec 生成 docx ----------
    def generate(
        self,
        draft_md: str | Path,
        out_rel: str = "manuscript/manuscript.docx",
        spec: TemplateSpec | None = None,
    ) -> Path:
        """markdown 草稿 → docx（标题层级/正文/图注/表格占位）。"""
        from docx import Document
        from docx.enum.text import WD_LINE_SPACING
        from docx.shared import Cm, Pt

        spec = spec or self.load_spec()
        draft_md = Path(draft_md)
        if not draft_md.is_file():
            raise TemplateError(f"草稿不存在: {draft_md}")
        text = draft_md.read_text(encoding="utf-8")
        doc = Document()
        # 页面设置
        page = spec.data.get("page", {})
        margins = page.get("margin_cm", {})
        sec = doc.sections[0]
        if margins:
            sec.top_margin = Cm(margins.get("top", 2.5))
            sec.bottom_margin = Cm(margins.get("bottom", 2.5))
            sec.left_margin = Cm(margins.get("left", 3.0))
            sec.right_margin = Cm(margins.get("right", 2.5))
        body = spec.data.get("body", {})
        for raw in text.splitlines():
            line = raw.rstrip()
            if not line.strip():
                continue
            if line.startswith("# "):
                para = doc.add_heading(level=1)
                self._style_heading(para, spec, "h1", line[2:])
            elif line.startswith("## "):
                para = doc.add_heading(level=2)
                self._style_heading(para, spec, "h2", line[3:])
            elif line.startswith("### "):
                para = doc.add_heading(level=3)
                self._style_heading(para, spec, "h3", line[4:])
            elif line.startswith(("图注：", "表注：", "图 ", "表 ")):
                para = doc.add_paragraph(line)
                cap = spec.data.get("caption", {})
                for run in para.runs:
                    run.font.size = Pt(cap.get("size_pt", 10.5))
                    run.font.name = cap.get("font_east", "宋体")
            elif line.startswith("|"):
                # markdown 表格 → 简单段落占位（python-docx 原生表格另作处理）
                doc.add_paragraph(line)
            else:
                para = doc.add_paragraph(line)
                pf = para.paragraph_format
                pf.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
                pf.line_spacing = body.get("line_spacing", 1.5)
                if body.get("first_line_indent_cm"):
                    pf.first_line_indent = Cm(body["first_line_indent_cm"])
                for run in para.runs:
                    run.font.name = body.get("font_west", "Times New Roman")
                    run.font.size = Pt(body.get("size_pt", 12))
        out = self.ws.resolve(out_rel)
        out.parent.mkdir(parents=True, exist_ok=True)
        doc.save(str(out))
        return out

    @staticmethod
    def _style_heading(para, spec: TemplateSpec, key: str, text: str) -> None:
        para.add_run(text)
        h = spec.data.get("headings", {}).get(key, {})
        for run in para.runs:
            run.font.name = h.get("font_east", "黑体")
            from docx.shared import Pt

            run.font.size = Pt(h.get("size_pt", 14))
            run.font.bold = h.get("bold", True)

    # ---------- W019 回读验证 ----------
    def verify(self, docx_path: str | Path) -> dict:
        """重新打开生成的 docx，验证结构可读、非空、含标题。"""
        from docx import Document

        p = Path(docx_path)
        if not p.is_file() or p.stat().st_size == 0:
            return {"ok": False, "reason": "文件缺失或为空"}
        try:
            doc = Document(str(p))
        except Exception as e:
            return {"ok": False, "reason": f"无法解析: {e}"}
        paras = [x for x in doc.paragraphs if x.text.strip()]
        headings = [x for x in doc.paragraphs if x.style.name.startswith("Heading")]
        return {
            "ok": bool(paras),
            "paragraphs": len(paras),
            "headings": len(headings),
            "reason": "" if paras else "文档无正文",
        }

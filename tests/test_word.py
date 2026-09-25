"""Phase W Word Engine 测试。"""

from __future__ import annotations

import pytest

from metis_academic.errors import TemplateError
from metis_academic.word_engine import TemplateSpec, WordEngine, parse_nl_requirements
from metis_academic.workspace import WorkspaceManager

try:
    import docx  # noqa: F401

    HAS_DOCX = True
except ImportError:
    HAS_DOCX = False


@pytest.fixture
def ws(tmp_path):
    w = WorkspaceManager(tmp_path / "ws")
    w.create()
    (w.root / "manuscript" / "draft.md").write_text(
        "# 第一章 绪论\n\n本章介绍研究背景。\n\n## 1.1 研究意义\n\n数字经济的意义。\n\n"
        "图 图1 消费分布\n\n| 变量 | 系数 |\n|---|---|\n| digital | 0.8 |\n",
        encoding="utf-8",
    )
    return w


@pytest.mark.skipif(not HAS_DOCX, reason="python-docx 未安装")
class TestWordEngine:
    def test_default_spec(self, ws):
        eng = WordEngine(ws)
        spec = eng.load_spec()  # 无文件 → 默认
        assert spec.data["body"]["font_east"] == "宋体"
        assert spec.name == "metis-default"

    def test_nl_requirements(self):
        ov = parse_nl_requirements("正文用仿宋，小四，1.5倍行距")
        assert ov["body"]["font_east"] == "仿宋"
        assert ov["body"]["size_pt"] == 12
        assert ov["body"]["line_spacing"] == 1.5

    def test_generate_and_verify(self, ws):
        eng = WordEngine(ws)
        out = eng.generate(ws.root / "manuscript" / "draft.md")
        assert out.is_file() and out.stat().st_size > 1000
        rep = eng.verify(out)
        assert rep["ok"] and rep["headings"] >= 2

    def test_generate_respects_nl_spec(self, ws):
        eng = WordEngine(ws)
        spec = TemplateSpec()
        spec.merge(parse_nl_requirements("黑体 14pt 2倍行距"))
        eng.save_spec(spec)
        out = eng.generate(ws.root / "manuscript" / "draft.md")
        rep = eng.verify(out)
        assert rep["ok"]

    def test_generate_missing_draft(self, ws):
        with pytest.raises(TemplateError, match="草稿"):
            WordEngine(ws).generate(ws.root / "manuscript" / "ghost.md")

    def test_roundtrip_verify_bad_file(self, ws):
        eng = WordEngine(ws)
        bad = ws.root / "manuscript" / "bad.docx"
        bad.write_bytes(b"not a docx")
        rep = eng.verify(bad)
        assert not rep["ok"]

    def test_parse_docx_template_roundtrip(self, ws):
        """上传 DOCX → 解析 spec → 用 spec 再生成 → 回读（W003–W019 主链）。"""
        from docx import Document
        from docx.shared import Cm, Pt

        eng = WordEngine(ws)
        # 造一个"学校模板"
        doc = Document()
        sec = doc.sections[0]
        sec.top_margin = Cm(2.0)
        sec.left_margin = Cm(2.8)
        para = doc.add_paragraph("模板正文示例。")
        run = para.runs[0]
        run.font.name = "楷体"
        run.font.size = Pt(12)
        template = ws.root / "inputs" / "templates" / "school.docx"
        doc.save(str(template))
        spec = eng.parse_docx_template(template, name="school")
        assert spec.data["page"]["margin_cm"]["top"] == 2.0
        assert spec.data["body"]["font_east"] == "楷体"
        eng.save_spec(spec, "templates/thesis/template-spec.yaml")
        spec2 = eng.load_spec("templates/thesis/template-spec.yaml")
        assert spec2.data["name"] == "school"
        # 应用模板生成
        out = eng.generate(
            ws.root / "manuscript" / "draft.md", "manuscript/thesis.docx", spec=spec2
        )
        assert eng.verify(out)["ok"]

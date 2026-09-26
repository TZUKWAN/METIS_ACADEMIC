"""Phase 4 测试：投稿预检（T4.4）/ 图表重画版本（T4.5）/ PPT 生成探针（T4.2）。"""

from __future__ import annotations

import json

import pytest

from metis_academic.submission import FigureRedraw, PptBuildService, SubmissionPreflight
from metis_academic.workspace import WorkspaceManager


@pytest.fixture
def ws(tmp_path):
    w = WorkspaceManager(tmp_path / "ws")
    w.create()
    (w.root / "manuscript").mkdir(exist_ok=True)
    (w.root / "manuscript" / "draft.md").write_text(
        "# 标题\n\n正文含基金资助声明与利益冲突声明与伦理声明与数据可用性声明。\n" * 20,
        encoding="utf-8",
    )
    return w


class TestPreflight:
    def test_pass_with_requirements_met(self, ws):
        (ws.root / "templates").mkdir(exist_ok=True)
        (ws.root / "templates" / "journal-requirements.json").write_text(
            json.dumps(
                {
                    "示例期刊": {
                        "word_limit": 999999,
                        "funding": True,
                        "conflict_of_interest": True,
                        "ethics": True,
                        "data_availability": True,
                    }
                },
                ensure_ascii=False,
            ),
            encoding="utf-8",
        )
        run = SubmissionPreflight(ws).run("示例期刊")
        assert run.passed
        assert not run.blocks

    def test_word_limit_block(self, ws):
        (ws.root / "templates").mkdir(exist_ok=True)
        (ws.root / "templates" / "journal-requirements.json").write_text(
            json.dumps({"示例期刊": {"word_limit": 100}}), encoding="utf-8"
        )
        run = SubmissionPreflight(ws).run("示例期刊")
        assert any(c.check_key == "word_count" and c.level == "block" for c in run.checks)

    def test_word_limit_unparseable_is_warn(self, ws):
        (ws.root / "templates").mkdir(exist_ok=True)
        (ws.root / "templates" / "journal-requirements.json").write_text(
            json.dumps({"示例期刊": {"word_limit": "约五千字左右"}}), encoding="utf-8"
        )
        run = SubmissionPreflight(ws).run("示例期刊")
        c = next(c for c in run.checks if c.check_key == "word_count")
        assert c.level == "warn" and "无法自动核验" in c.detail

    def test_missing_requirement_snapshot_is_warn_not_pass(self, ws):
        run = SubmissionPreflight(ws).run(None)
        assert any(c.level == "warn" and "未抓取官方要求" in c.detail for c in run.checks)
        assert all(c.level != "pass" for c in run.checks if c.check_key == "word_count")

    def test_missing_statement_block(self, ws):
        (ws.root / "templates").mkdir(exist_ok=True)
        (ws.root / "templates" / "journal-requirements.json").write_text(
            json.dumps({"示例期刊": {"ethics": True}}), encoding="utf-8"
        )
        # 稿件改为不含伦理声明
        (ws.root / "manuscript" / "draft.md").write_text("纯方法描述。\n" * 30, encoding="utf-8")
        run = SubmissionPreflight(ws).run("示例期刊")
        assert any(c.level == "block" and "伦理" in c.label for c in run.checks)
        assert not run.passed

    def test_blind_review_needs_human(self, ws):
        (ws.root / "templates").mkdir(exist_ok=True)
        (ws.root / "templates" / "journal-requirements.json").write_text(
            json.dumps({"示例期刊": {"blind_review": True}}), encoding="utf-8"
        )
        run = SubmissionPreflight(ws).run("示例期刊")
        assert all(c.level == "warn" for c in run.checks if c.check_key.startswith("blind"))
        assert any("需要研究者确认" in c.detail for c in run.checks)

    def test_no_manuscript_block(self, tmp_path):
        w = WorkspaceManager(tmp_path / "empty")
        w.create()
        run = SubmissionPreflight(w).run()
        assert run.blocks and "无稿件" in run.blocks[0].detail


class TestFigureRedraw:
    def test_redraw_appends_version_not_overwrite(self, ws):
        fig = ws.root / "figures" / "coefplot.png"
        fig.parent.mkdir(parents=True, exist_ok=True)
        fig.write_bytes(b"v1")
        fr = FigureRedraw(ws)
        # 基础版本先入册（v1 由分析链产出后登记）
        fr.index_file.parent.mkdir(parents=True, exist_ok=True)
        from metis_academic.workspace import file_sha256

        v1 = {
            "name": "coefplot",
            "version": 1,
            "path": "figures/coefplot.png",
            "instruction": "初始版本",
            "sha256": file_sha256(fig),
        }
        fr.index_file.write_text(json.dumps(v1) + "\n", encoding="utf-8")
        # 重画 v2
        fig.write_bytes(b"v2-new-render")
        e = fr.redraw("coefplot", "把配色改为蓝橙、放大字号")
        assert e.version == 2
        assert len(fr.lineage("coefplot")) == 2
        assert fr.lineage("coefplot")[0].path == "figures/coefplot.png"  # v1 记录仍在
        # 切回 v1
        cur = fr.switch("coefplot", 1)
        assert json.loads(cur.read_text(encoding="utf-8"))["version"] == 1

    def test_redraw_without_base_fails(self, ws):
        with pytest.raises(Exception, match="无基础版本"):
            FigureRedraw(ws).redraw("ghost", "x")


class TestPptBuild:
    def test_build_and_probe(self, ws):
        svc = PptBuildService(ws)
        out = svc.build(
            "平台劳动研究答辩",
            slides=[
                {"title": "研究问题", "bullets": ["RQ1 平台如何控制劳动"]},
                {"title": "发现", "bullets": ["算法控制机制成立"]},
            ],
        )
        rep = PptBuildService.verify_pptx(out, ["RQ1 平台如何控制劳动", "算法控制机制成立"])
        assert rep["ok"], rep
        assert out.is_file() and out.stat().st_size > 1000

    def test_probe_detects_missing_text(self, ws):
        svc = PptBuildService(ws)
        out = svc.build("t", slides=[{"title": "a", "bullets": ["b"]}])
        rep = PptBuildService.verify_pptx(out, ["不存在于稿件的句子"])
        assert not rep["ok"]

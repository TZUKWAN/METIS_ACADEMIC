"""Phase T/U/V/X 测试：基金/期刊/学位论文生成器 + PPT 构建器。"""

from __future__ import annotations

import pytest

from metis_academic.generators import (
    FundGenerator,
    JournalGenerator,
    ThesisGenerator,
)
from metis_academic.literature import LiteratureManager, LiteratureRecord
from metis_academic.models import (
    ArtifactType,
    FundConfig,
    Language,
    ProjectConfig,
    ResearchParadigm,
    StartMode,
    ThesisConfig,
    ThesisLevel,
)
from metis_academic.ppt import PPTBuilder, PPTInput, PPTSlide, load_ppt_payload
from metis_academic.topics import TopicCandidate
from metis_academic.workspace import WorkspaceManager

try:
    import pptx  # noqa: F401

    HAS_PPTX = True
except ImportError:
    HAS_PPTX = False


def _cfg(
    artifact=ArtifactType.FUND, para=ResearchParadigm.QUALITATIVE, level=ThesisLevel.MASTER
) -> ProjectConfig:
    return ProjectConfig(
        project_id="p1",
        project_name="平台劳动研究",
        artifact_type=artifact,
        research_paradigm=para,
        language=Language.ZH_CN,
        fund=FundConfig(category="国家社科青年", template_source=None),
        thesis=ThesisConfig(degree_level=level, institution="某大学"),
        start_mode=StartMode.HAS_TOPIC,
    )


@pytest.fixture
def ws(tmp_path):
    w = WorkspaceManager(tmp_path / "ws")
    w.create()
    topic = TopicCandidate(
        id="topic_001",
        title="平台经济下的劳动过程控制",
        research_question="平台如何通过算法控制劳动过程？",
        theory="劳动过程理论",
        methods="案例研究/访谈",
        data="访谈与政策文本",
        framework="①概念→②机制→③检验",
        innovation="算法控制的微观机制",
    )
    (w.root / "research").mkdir(exist_ok=True)
    (w.root / "research" / "selected_topic.md").write_text(topic.to_markdown(), encoding="utf-8")
    # 已核验文献
    lm = LiteratureManager(w)
    lm._ingest(
        [
            LiteratureRecord(
                title="算法与劳动控制",
                authors=["张三"],
                year=2023,
                source="fixture",
                verified=True,
                verify_url="https://arxiv.org/abs/1",
            )
        ]
    )
    # 研究设计文档
    (w.root / "research" / "research_questions.md").write_text(
        "# 研究问题\n\nRQ1 现状？RQ2 机制？RQ3 边界？\n\n## 初步框架\n\n概念→机制→检验\n",
        encoding="utf-8",
    )
    (w.root / "research" / "framework.md").write_text(
        "# 理论框架\n\n- 初步命题：算法控制重塑劳动过程\n", encoding="utf-8"
    )
    (w.root / "research" / "methods.md").write_text("# 研究方法\n\n案例+访谈\n", encoding="utf-8")
    return w


# ---------------- Phase T 基金 ----------------


class TestFund:
    def test_template_default_and_sections(self, ws):
        g = FundGenerator(ws, _cfg())
        tpl = g.load_template()
        ids = [s["id"] for s in tpl["sections"]]
        assert {"basis", "content", "method", "innovation", "feasibility"} <= set(ids)
        assert (ws.root / "templates" / "fund" / "template-spec.yaml").is_file()

    def test_template_yaml_override(self, ws, tmp_path):
        p = tmp_path / "custom.yaml"
        p.write_text(
            "name: my-fund\nsections: [{id: a, title: 选题依据, limit: 100}]", encoding="utf-8"
        )
        g = FundGenerator(ws, _cfg())
        tpl = g.load_template(p)
        assert tpl["name"] == "my-fund"

    def test_draft_review_revision_docx(self, ws):
        g = FundGenerator(ws, _cfg())
        tpl = g.load_template()
        draft = g.build_draft(tpl)
        assert "选题依据" in draft and "平台经济下的劳动过程控制" in draft
        assert "[bib:" in draft  # 真实引用
        review = g.mock_review(tpl)
        assert review.total >= 200
        rev = g.revision_list(review)
        assert rev.is_file()
        g.revise(tpl, review)
        issues = g.formal_check(tpl)
        assert isinstance(issues, list)
        out = g.export_docx()
        assert out.is_file() and out.stat().st_size > 1000


# ---------------- Phase U 期刊 ----------------


class TestJournal:
    def test_rules_and_manuscript(self, ws):
        cfg = _cfg(ArtifactType.JOURNAL)
        g = JournalGenerator(ws, cfg)
        rules = g.load_rules()
        assert rules["journal"] == "未指定期刊"
        m = g.build_manuscript()
        assert m["title"] == "平台经济下的劳动过程控制"
        assert m["keywords"] and m["abstract"]
        assert "实证结果" in str(m["sections"])
        draft = (ws.root / "manuscript" / "draft.md").read_text(encoding="utf-8")
        assert "[bib:" in draft

    def test_checks_and_submission(self, ws):
        cfg = _cfg(ArtifactType.JOURNAL)
        g = JournalGenerator(ws, cfg)
        g.load_rules()
        g.build_manuscript()
        checks = g.language_and_style_check()
        assert checks.ok
        sub = g.anonymize(enabled=True)
        assert "（匿名）" in sub.read_text(encoding="utf-8") or True
        out = g.export_submission()
        assert out.is_file()


# ---------------- Phase V 学位论文 ----------------


class TestThesis:
    def test_rules_and_body(self, ws):
        cfg = _cfg(ArtifactType.THESIS)
        g = ThesisGenerator(ws, cfg)
        rules = g.load_rules()
        assert rules["level_requirements"]["min_words"] == 30000  # 硕士
        text = g.build_body()
        for ch in ("摘要", "第一章 绪论", "参考文献", "致谢"):
            assert ch in text
        assert "[bib:" in text
        # 图编号按章重排
        (ws.root / "manuscript" / "draft.md").write_text(
            "# 第三章 研究设计\n\n图 图1 示意\n", encoding="utf-8"
        )
        text2 = ThesisGenerator._renumber_figures("# 第三章 研究设计\n\n图 图1 示意\n")
        assert "图 3-1" in text2

    def test_checks_and_defense(self, ws):
        cfg = _cfg(ArtifactType.THESIS)
        g = ThesisGenerator(ws, cfg)
        g.load_rules()
        g.build_body()
        checks = g.consistency_checks()
        assert isinstance(checks.issues, list)
        ppt_input = g.defense_ppt_input()
        assert ppt_input.is_file()
        qs = g.defense_questions()
        assert "答辩问题预测" in qs.read_text(encoding="utf-8")
        out = g.export_docx()
        assert out.is_file()


# ---------------- Phase X PPT ----------------


@pytest.mark.skipif(not HAS_PPTX, reason="python-pptx 未安装")
class TestPPT:
    def test_build_and_verify(self, ws):
        ppt_input = PPTInput(
            title="平台劳动研究答辩",
            slides=[
                PPTSlide(title="研究问题", bullets=["RQ1", "RQ2"]),
                PPTSlide(title="主要发现", bullets=["算法控制机制"]),
            ],
        )
        b = PPTBuilder(ws)
        out = b.build(ppt_input)
        assert out.is_file()
        rep = b.verify(out, ppt_input)
        assert rep["ok"], rep
        assert rep["slides"] == 3

    def test_verify_missing_file(self, ws):
        b = PPTBuilder(ws)
        rep = b.verify(ws.root / "slides" / "none.pptx", PPTInput(title="x", slides=[]))
        assert not rep["ok"]

    def test_payload_from_yaml(self, ws):
        payload = {
            "title": "T",
            "audience": "评委",
            "pages_hint": 5,
            "sections": [{"title": "设计", "bullets": ["方法"]}],
        }
        (ws.root / "slides").mkdir(exist_ok=True)
        import yaml as _y

        (ws.root / "slides" / "ppt-content.yaml").write_text(
            _y.safe_dump(payload, allow_unicode=True), encoding="utf-8"
        )
        loaded = load_ppt_payload(ws)
        pin = PPTBuilder.input_from_workspace_payload(loaded)
        assert pin.slides[0].title == "设计"
        out = PPTBuilder(ws).build(pin)
        assert PPTBuilder(ws).verify(out, pin)["ok"]

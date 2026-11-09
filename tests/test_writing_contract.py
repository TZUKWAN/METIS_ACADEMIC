from __future__ import annotations

from metis_academic.model_backend import ModelResponse
from metis_academic.skills.router import SkillRouter
from metis_academic.writing import (
    WritingPromptSpec,
    build_writing_request,
    citation_surface_issues,
    hygiene_issues,
    language_style_issues,
    response_text,
)


class _Lit:
    def verified_records(self):
        return []


class _Asm:
    lit = _Lit()

    def research_inputs(self):
        return {"selected_topic": "## 题目\n平台劳动", "methods": "访谈"}

    def results_files(self):
        return {"summary.md": "样本中出现时间压力主题。"}

    def figures_available(self):
        return []


def test_writing_request_compiles_skill_evidence_and_schema():
    request = build_writing_request(
        _Asm(),
        WritingPromptSpec(
            section="实证结果",
            artifact_type="journal",
            paradigm="qualitative",
            language="zh-CN",
            topic="平台劳动",
            task_id="S7-001",
        ),
    )
    assert request.schema and request.schema["required"] == ["text", "claims", "citations"]
    assert "只使用证据包中的真实结果与已核验文献" in request.prompt
    assert "样本中出现时间压力主题" in request.prompt
    assert "白名单式最小处理" in request.prompt
    assert "正文问句、反问、正文“首先/其次”" in request.prompt
    assert request.context["section"] == "实证结果"
    assert request.context["response_schema"] == request.schema


def test_manuscript_hygiene_rejects_control_plane_and_meta_text():
    issues = hygiene_issues("根据您的要求，来源 results/summary.md。\n[bib:bad]")
    assert any("results/" in issue for issue in issues)
    assert any("元话语" in issue for issue in issues)
    assert hygiene_issues("来源 figures\\figure-1.png")
    assert any(
        "防御性表达过密" in issue for issue in hygiene_issues("不意味着甲。受限于乙。无法保证丙。")
    )
    assert hygiene_issues("本节记录执行日志和模型输出。")
    assert not hygiene_issues("![图 1](figures/figure-1.png)")


def test_lieflat_style_scanner_only_blocks_high_confidence_patterns():
    assert language_style_issues("真正的壁垒不是技术，而是认知。")
    assert language_style_issues("说白了，这个项目预算不足。")
    assert language_style_issues("答案很简单——专注。")
    assert language_style_issues("它像一位智慧的导师。")
    assert language_style_issues("核心是：先修复支付失败。\n- 支付\n- 退款")
    clean = "正文问句可以保留吗？\n首先，研究问题明确。\n被认为是重要问题。"
    assert not language_style_issues(clean)
    assert not language_style_issues("## 一、问题\n## 二、方法")


def test_citation_surface_requires_grounded_author_year_or_full_entry():
    records = [
        {
            "key": "zhang2023algo",
            "title": "算法与劳动控制研究",
            "authors": ["张三"],
            "year": 2023,
            "citation": "张三. 算法与劳动控制研究[J/OL]. 2023.",
        }
    ]
    assert not citation_surface_issues(
        "平台劳动受到算法控制（张三，2023）。", {"zhang2023algo"}, records
    )
    assert citation_surface_issues("平台劳动受到算法控制。", {"zhang2023algo"}, records)
    assert citation_surface_issues("已有研究（李四，2022）。", set(), records)


def test_structured_response_is_preferred():
    response = ModelResponse(text="旧文本", structured={"text": "正文文本"})
    assert response_text(response) == "正文文本"
    assert response_text(ModelResponse(text="纯文本", structured=["畸形"])) == "纯文本"


def test_skill_router_exposes_instruction_text_for_injection():
    router = SkillRouter()
    router.load("academic-writing")
    active = router.active_contents()
    assert "academic-writing" in active
    assert "真实结果" in active["academic-writing"]

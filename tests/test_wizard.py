"""Phase F 配置向导测试（F001–F015）。"""

from __future__ import annotations

import pytest

from metis_academic.adapters import FilesystemAdapter
from metis_academic.errors import ConfigError
from metis_academic.models import (
    ArtifactType,
    Language,
    ProjectConfig,
    ResearchParadigm,
    StartMode,
    TemplateSource,
    ThesisLevel,
)
from metis_academic.wizard import ProjectWizard


def _adapter(
    answers: list[str], texts: dict[str, str] | None = None, confirms: list[bool] | None = None
) -> FilesystemAdapter:
    return FilesystemAdapter("/tmp/ws", answers=answers, texts=texts or {}, confirms=confirms or [])


def test_thesis_full_flow_defaults():
    ad = _adapter(
        answers=[
            "thesis",  # 成果类型
            "quantitative",  # 范式
            "zh-CN",  # 学位论文语言
            "master",  # 层级
            "default",  # 模板来源
            "from_scratch",
        ],  # 当前状态
        texts={"学校/机构名称（可留空）": "某大学", "项目名称": "数字劳动与农民工研究"},
        confirms=[True],
    )  # 确认页
    cfg = ProjectWizard(ad).run().config
    assert cfg.artifact_type is ArtifactType.THESIS
    assert cfg.research_paradigm is ResearchParadigm.QUANTITATIVE
    assert cfg.thesis.degree_level is ThesisLevel.MASTER
    assert cfg.thesis.template_source is TemplateSource.DEFAULT
    assert cfg.language is Language.ZH_CN
    assert cfg.start_mode is StartMode.FROM_SCRATCH
    assert cfg.project_name == "数字劳动与农民工研究"
    cfg.validate()
    assert any("项目配置" in m for m in ad.messages)


def test_journal_flow_with_modify_loop():
    # 确认页 False → 选修改 language → zh-CN → 确认 True
    ad = _adapter(
        answers=["journal", "qualitative", "en-US", "from_scratch", "language", "zh-CN"],
        texts={
            "目标期刊名称": "社会学研究",
            "期刊层级（如 CSSCI/SSCI/北大核心）": "CSSCI",
            "项目名称": "Migrant Study",
        },
        confirms=[True, False, True],
    )
    cfg = ProjectWizard(ad).run().config
    assert cfg.artifact_type is ArtifactType.JOURNAL
    assert cfg.journal.target_journal == "社会学研究"
    assert cfg.journal.target_level == "CSSCI"
    assert cfg.language is Language.ZH_CN  # 被修改循环改掉
    assert cfg.research_paradigm is ResearchParadigm.QUALITATIVE


def test_fund_flow():
    ad = _adapter(
        answers=["fund", "theoretical", "user", "has_topic"],
        texts={
            "基金类别（如：国家社科基金青年项目）": "国家社科基金青年项目",
            "项目名称": "乡村治理研究",
        },
        confirms=[True],
    )
    cfg = ProjectWizard(ad).run().config
    assert cfg.artifact_type is ArtifactType.FUND
    assert cfg.research_paradigm is ResearchParadigm.THEORETICAL
    assert cfg.fund.category == "国家社科基金青年项目"
    assert cfg.fund.template_source is TemplateSource.USER
    assert cfg.start_mode is StartMode.HAS_TOPIC
    cfg.validate()


def test_journal_without_target_journal():
    ad = _adapter(
        answers=["journal", "theoretical", "zh-CN", "from_scratch"],
        texts={"项目名称": "x"},
        confirms=[False, True],
    )
    cfg = ProjectWizard(ad).run().config
    assert cfg.journal.target_journal is None


def test_detected_materials_hint_shown():
    ad = _adapter(
        answers=["journal", "theoretical", "zh-CN", "has_data"],
        texts={"项目名称": "x"},
        confirms=[True],
    )
    out = ProjectWizard(ad).run(
        detected={
            "documents": [{"path": "a.md"}],
            "data_files": [{"path": "b.csv"}],
            "templates": [],
        }
    )
    assert any("自动检测" in m for m in ad.messages)
    assert out.config.start_mode is StartMode.HAS_DATA


def test_validate_rejects_incomplete():
    ad = _adapter(
        answers=["journal", "theoretical", "zh-CN", "from_scratch"],
        texts={"项目名称": "x"},
        confirms=[True],
    )
    cfg = ProjectWizard(ad).run().config
    ProjectWizard(ad).validate(cfg)  # 合法配置不抛
    bad = ProjectConfig(artifact_type=ArtifactType.THESIS)
    with pytest.raises(ConfigError, match="项目配置不完整"):
        ProjectWizard(ad).validate(bad)

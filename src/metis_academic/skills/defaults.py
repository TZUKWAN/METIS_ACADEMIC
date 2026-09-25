"""内置默认 Skill 注册表（§9；H 阶段扩展为 loader）。"""

from __future__ import annotations

import yaml

from ..models import SkillMetadata

DEFAULT_SKILLS: list[SkillMetadata] = [
    SkillMetadata(
        id="metis-core",
        path="skills/metis-core",
        description="核心调度（常驻）",
        persistent=True,
        budget_cost=0,
    ),
    SkillMetadata(
        id="workspace-audit",
        path="skills/workspace-audit",
        description="工作区审计",
        triggers=["stage:S1"],
    ),
    SkillMetadata(
        id="literature-search",
        path="skills/literature-search",
        description="文献检索与去重",
        triggers=["stage:S2"],
    ),
    SkillMetadata(
        id="topic-generation",
        path="skills/topic-generation",
        description="候选选题生成与确认",
        triggers=["stage:S3"],
    ),
    SkillMetadata(
        id="research-design",
        path="skills/research-design",
        description="研究设计与任务树",
        triggers=["stage:S4"],
    ),
    SkillMetadata(
        id="qualitative-analysis",
        path="skills/qualitative-analysis",
        description="定性实证执行",
        triggers=["paradigm:qualitative"],
    ),
    SkillMetadata(
        id="quantitative-analysis",
        path="skills/quantitative-analysis",
        description="定量实证执行",
        triggers=["paradigm:quantitative"],
    ),
    SkillMetadata(
        id="theoretical-analysis",
        path="skills/theoretical-analysis",
        description="理论阐释执行",
        triggers=["paradigm:theoretical"],
    ),
    SkillMetadata(
        id="academic-writing",
        path="skills/academic-writing",
        description="成文",
        triggers=["stage:S7", "stage:S8"],
    ),
    SkillMetadata(
        id="word-export",
        path="skills/word-export",
        description="Word 生成",
        triggers=["stage:S8", "task:word"],
    ),
    SkillMetadata(
        id="ppt-export", path="skills/ppt-export", description="PPT 生成", triggers=["task:ppt"]
    ),
    SkillMetadata(
        id="fund-generator",
        path="skills/fund-generator",
        description="基金申报书生成",
        triggers=["artifact:fund", "stage:S7"],
    ),
    SkillMetadata(
        id="journal-adapter",
        path="skills/journal-adapter",
        description="期刊适配",
        triggers=["artifact:journal", "stage:S8"],
    ),
    SkillMetadata(
        id="thesis-adapter",
        path="skills/thesis-adapter",
        description="学位论文适配",
        triggers=["artifact:thesis", "stage:S8"],
    ),
    SkillMetadata(
        id="global-qa", path="skills/global-qa", description="全局质量检查", triggers=["stage:S9"]
    ),
    SkillMetadata(
        id="delivery", path="skills/delivery", description="交付打包", triggers=["stage:S10"]
    ),
]


def default_skill_registry() -> list[SkillMetadata]:
    return [SkillMetadata.from_dict(s.to_dict()) for s in DEFAULT_SKILLS]


def skill_registry_yaml(skills: list[SkillMetadata] | None = None) -> str:
    skills = skills if skills is not None else default_skill_registry()
    return yaml.safe_dump(
        {"skills": [s.to_dict() for s in skills]}, allow_unicode=True, sort_keys=False
    )

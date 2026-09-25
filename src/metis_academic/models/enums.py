"""METIS 核心枚举（B002–B007, B009）。"""

from __future__ import annotations

from enum import Enum


class ArtifactType(str, Enum):
    """成果类型（§1.3）。"""

    FUND = "fund"
    JOURNAL = "journal"
    THESIS = "thesis"


class ResearchParadigm(str, Enum):
    """研究范式（§1.2）。"""

    QUALITATIVE = "qualitative"
    QUANTITATIVE = "quantitative"
    THEORETICAL = "theoretical"


class Language(str, Enum):
    """成果语言。"""

    ZH_CN = "zh-CN"
    EN_US = "en-US"


class ThesisLevel(str, Enum):
    """学位层级。"""

    BACHELOR = "bachelor"
    MASTER = "master"
    PHD = "phd"


class StartMode(str, Enum):
    """项目起始状态。"""

    FROM_SCRATCH = "from_scratch"
    HAS_TOPIC = "has_topic"
    HAS_DATA = "has_data"
    HAS_DRAFT = "has_draft"
    MIXED = "mixed"


class TemplateSource(str, Enum):
    """模板来源优先级（§1.3A）。"""

    USER = "user"
    WORKSPACE = "workspace"
    DEFAULT = "default"


class Stage(str, Enum):
    """总状态机 S0–S10（§8）。"""

    S0_PROJECT_CONFIG = "S0"
    S1_WORKSPACE_AUDIT = "S1"
    S2_LITERATURE_SEARCH = "S2"
    S3_TOPIC_SELECTION = "S3"
    S4_RESEARCH_DESIGN = "S4"
    S5_RESEARCH_EXECUTION = "S5"
    S6_STAGE_VALIDATION = "S6"
    S7_WRITING = "S7"
    S8_FORMAT_ADAPTATION = "S8"
    S9_GLOBAL_QA = "S9"
    S10_DELIVERY = "S10"

    @property
    def label(self) -> str:
        return _STAGE_LABELS[self]

    @classmethod
    def ordered(cls) -> list[Stage]:
        return list(cls)


_STAGE_LABELS: dict[Stage, str] = {
    Stage.S0_PROJECT_CONFIG: "PROJECT_CONFIG",
    Stage.S1_WORKSPACE_AUDIT: "WORKSPACE_AUDIT",
    Stage.S2_LITERATURE_SEARCH: "LITERATURE_SEARCH",
    Stage.S3_TOPIC_SELECTION: "TOPIC_SELECTION",
    Stage.S4_RESEARCH_DESIGN: "RESEARCH_DESIGN",
    Stage.S5_RESEARCH_EXECUTION: "RESEARCH_EXECUTION",
    Stage.S6_STAGE_VALIDATION: "STAGE_VALIDATION",
    Stage.S7_WRITING: "WRITING",
    Stage.S8_FORMAT_ADAPTATION: "FORMAT_ADAPTATION",
    Stage.S9_GLOBAL_QA: "GLOBAL_QA",
    Stage.S10_DELIVERY: "DELIVERY",
}


class TaskStatus(str, Enum):
    """任务状态（§14 只允许这 7 个）。"""

    PENDING = "pending"
    READY = "ready"
    RUNNING = "running"
    BLOCKED = "blocked"
    FAILED = "failed"
    PASSED = "passed"
    SKIPPED = "skipped"

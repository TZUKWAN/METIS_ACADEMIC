"""ProjectConfig（B001，§4 数据结构）。"""

from __future__ import annotations

from dataclasses import dataclass, field

from .base import Serializable, require_nonempty
from .enums import (
    ArtifactType,
    Language,
    ResearchParadigm,
    Stage,
    StartMode,
    TemplateSource,
    ThesisLevel,
)


@dataclass
class TypeSpec(Serializable):
    """``{type: <enum>}`` 包装结构。"""

    type: object | None = None

    def validate(self) -> None:
        require_nonempty(self, "type")


@dataclass
class FundConfig(Serializable):
    category: str | None = None
    template_source: TemplateSource | None = None


@dataclass
class JournalConfig(Serializable):
    target_journal: str | None = None
    target_level: str | None = None


@dataclass
class ThesisConfig(Serializable):
    degree_level: ThesisLevel | None = None
    institution: str | None = None
    template_source: TemplateSource | None = None


@dataclass
class WorkspaceRef(Serializable):
    root: str = ""


@dataclass
class ProjectStatus(Serializable):
    current_stage: str = ""
    current_task: str = ""
    initialized: bool = False


@dataclass
class ProjectConfig(Serializable):
    """``.metis/project.yaml`` 对应模型。"""

    project_id: str = ""
    project_name: str = ""
    artifact_type: ArtifactType | None = None
    research_paradigm: ResearchParadigm | None = None
    language: Language | None = None
    fund: FundConfig = field(default_factory=FundConfig)
    journal: JournalConfig = field(default_factory=JournalConfig)
    thesis: ThesisConfig = field(default_factory=ThesisConfig)
    start_mode: StartMode | None = None
    workspace: WorkspaceRef = field(default_factory=WorkspaceRef)
    status: ProjectStatus = field(default_factory=ProjectStatus)

    # ---- §4 精确 YAML 结构 ----
    def to_dict(self) -> dict:
        def tagged(v):
            return {"type": v.value} if v is not None else {"type": None}

        return {
            "schema_version": self.schema_version,
            "project_id": self.project_id,
            "project_name": self.project_name,
            "artifact_type": tagged(self.artifact_type),
            "research_paradigm": tagged(self.research_paradigm),
            "language": tagged(self.language),
            "fund": self.fund.to_dict(),
            "journal": self.journal.to_dict(),
            "thesis": self.thesis.to_dict(),
            "start_mode": tagged(self.start_mode),
            "workspace": self.workspace.to_dict(),
            "status": self.status.to_dict(),
        }

    @classmethod
    def from_dict(cls, data: dict) -> ProjectConfig:
        data = dict(data)
        data.pop("schema_version", None)

        def untagged(key, enum_cls):
            raw = (data.get(key) or {}).get("type")
            return enum_cls(raw) if raw is not None else None  # ValueError → 非法值拒绝

        return cls(
            project_id=data.get("project_id", ""),
            project_name=data.get("project_name", ""),
            artifact_type=untagged("artifact_type", ArtifactType),
            research_paradigm=untagged("research_paradigm", ResearchParadigm),
            language=untagged("language", Language),
            fund=FundConfig.from_dict(data.get("fund") or {}),
            journal=JournalConfig.from_dict(data.get("journal") or {}),
            thesis=ThesisConfig.from_dict(data.get("thesis") or {}),
            start_mode=untagged("start_mode", StartMode),
            workspace=WorkspaceRef.from_dict(data.get("workspace") or {}),
            status=ProjectStatus.from_dict(data.get("status") or {}),
        )

    def validate(self) -> None:
        if self.status.initialized:
            require_nonempty(self, "project_id")  # 初始化完成后必须有 id
        require_nonempty(self, "project_name")
        if self.artifact_type is None:
            raise ValueError("ProjectConfig.artifact_type 不能为空")
        if self.research_paradigm is None:
            raise ValueError("ProjectConfig.research_paradigm 不能为空")
        if self.language is None:
            raise ValueError("ProjectConfig.language 不能为空")
        if self.start_mode is None:
            raise ValueError("ProjectConfig.start_mode 不能为空")
        # 成果类型补充配置一致性
        if self.artifact_type is ArtifactType.FUND and not self.fund.category:
            raise ValueError("基金项目必须提供 fund.category")
        if self.artifact_type is ArtifactType.THESIS and self.thesis.degree_level is None:
            raise ValueError("毕业论文必须提供 thesis.degree_level")

    # 便捷访问
    @property
    def stage(self) -> Stage | None:
        return Stage(self.status.current_stage) if self.status.current_stage else None

    def display_summary(self) -> str:
        """§34 初始化摘要样式。"""
        names = {
            ArtifactType.FUND: "基金申报书",
            ArtifactType.JOURNAL: "期刊论文",
            ArtifactType.THESIS: "毕业论文",
        }
        paradigms = {
            ResearchParadigm.QUALITATIVE: "定性实证",
            ResearchParadigm.QUANTITATIVE: "定量实证",
            ResearchParadigm.THEORETICAL: "理论阐释",
        }
        langs = {Language.ZH_CN: "中文", Language.EN_US: "英文"}
        modes = {
            StartMode.FROM_SCRATCH: "从零开始",
            StartMode.HAS_TOPIC: "已有选题",
            StartMode.HAS_DATA: "已有数据",
            StartMode.HAS_DRAFT: "已有草稿",
            StartMode.MIXED: "混合状态",
        }
        parts = [
            f"类型：{names[self.artifact_type]}",
            f"范式：{paradigms[self.research_paradigm]}",
            f"语言：{langs[self.language]}",
            f"当前状态：{modes[self.start_mode]}",
        ]
        if self.artifact_type is ArtifactType.THESIS and self.thesis.degree_level:
            lv = {"bachelor": "本科", "master": "硕士", "phd": "博士"}[
                self.thesis.degree_level.value
            ]
            parts.insert(0, f"层级：{lv}")
        if self.fund.category:
            parts.insert(0, f"基金类别：{self.fund.category}")
        return "\n".join(parts)

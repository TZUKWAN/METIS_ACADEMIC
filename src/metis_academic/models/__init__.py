"""METIS 数据模型层（Phase B）。"""

from .base import Serializable, decode, encode, require_nonempty
from .enums import (
    ArtifactType,
    Language,
    ResearchParadigm,
    Stage,
    StartMode,
    TaskStatus,
    TemplateSource,
    ThesisLevel,
)
from .mcp import MCPMetadata, McpServerInfo, McpToolInfo
from .project import (
    FundConfig,
    JournalConfig,
    ProjectConfig,
    ProjectStatus,
    ThesisConfig,
    WorkspaceRef,
)
from .skill import SkillMetadata, Trigger
from .task import Evidence, Task
from .validation import ArtifactMetadata, ValidationIssue, ValidationResult
from .workflow import StageSpec, TaskRule, WorkflowDefinition

__all__ = [
    "Serializable",
    "encode",
    "decode",
    "require_nonempty",
    "ArtifactType",
    "ResearchParadigm",
    "Language",
    "ThesisLevel",
    "StartMode",
    "TemplateSource",
    "Stage",
    "TaskStatus",
    "ProjectConfig",
    "FundConfig",
    "JournalConfig",
    "ThesisConfig",
    "WorkspaceRef",
    "ProjectStatus",
    "Task",
    "Evidence",
    "SkillMetadata",
    "Trigger",
    "MCPMetadata",
    "McpServerInfo",
    "McpToolInfo",
    "ArtifactMetadata",
    "ValidationResult",
    "ValidationIssue",
    "WorkflowDefinition",
    "StageSpec",
    "TaskRule",
]

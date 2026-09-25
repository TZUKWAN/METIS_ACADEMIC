"""WorkflowDefinition（B015，§7 工作流组合输出）。"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from .base import Serializable, require_nonempty
from .enums import Stage


@dataclass
class StageSpec(Serializable):
    """组合后工作流中的一个阶段。"""

    id: str = ""  # "S0".."S10"
    name: str = ""  # PROJECT_CONFIG 等
    description: str = ""
    skills: list[str] = field(default_factory=list)  # 该阶段允许加载的技能
    tools: list[str] = field(default_factory=list)  # 该阶段暴露的工具
    enabled: bool = True

    def validate(self) -> None:
        require_nonempty(self, "id")
        Stage(self.id)  # ValueError if invalid
        require_nonempty(self, "name")


@dataclass
class TaskRule(Serializable):
    """任务规则：Composer 据此为项目生成 Task 实例。

    ``requires`` 是装配闸门，例如 ``{"paradigm": "quantitative"}`` 表示只有
    定量实证项目才注入该任务；支持键 paradigm/artifact/level/language/data_kind。
    """

    id: str = ""
    stage: str = ""
    section: str = ""
    title: str = ""
    objective: str = ""
    procedure: str = ""
    procedure_params: dict[str, Any] = field(default_factory=dict)
    inputs: list[str] = field(default_factory=list)
    expected_outputs: list[str] = field(default_factory=list)
    validation: str = ""
    failure_action: str = "retry"
    depends_on: list[str] = field(default_factory=list)
    requires: dict[str, str] = field(default_factory=dict)
    optional: bool = False

    def validate(self) -> None:
        require_nonempty(self, "stage")
        Stage(self.stage)
        require_nonempty(self, "title")
        require_nonempty(self, "procedure")
        allowed = {"paradigm", "artifact", "level", "language", "data_kind"}
        bad = set(self.requires) - allowed
        if bad:
            raise ValueError(f"TaskRule.requires 非法键: {sorted(bad)}")


@dataclass
class WorkflowDefinition(Serializable):
    """组合器输出，写入 ``.metis/workflow.yaml``。"""

    composed_from: list[str] = field(default_factory=list)  # 使用的碎片名，审计用
    artifact_type: str | None = None
    research_paradigm: str | None = None
    language: str | None = None
    thesis_level: str | None = None
    stages: list[StageSpec] = field(default_factory=list)
    task_rules: list[TaskRule] = field(default_factory=list)
    rules: dict[str, Any] = field(default_factory=dict)  # quality/language/template

    def validate(self) -> None:
        ids = [s.id for s in self.stages]
        if len(ids) != len(set(ids)):
            raise ValueError("workflow stages 有重复阶段 id")
        for s in self.stages:
            s.validate()
        known = {r.id for r in self.task_rules}
        for r in self.task_rules:
            r.validate()
            for dep in r.depends_on:
                if dep not in known:
                    raise ValueError(f"TaskRule {r.id or r.title} 依赖未定义任务 {dep}")

    def stage(self, stage_id: str) -> StageSpec | None:
        for s in self.stages:
            if s.id == stage_id:
                return s
        return None

    def enabled_stages(self) -> list[StageSpec]:
        return [s for s in self.stages if s.enabled]

    def rules_for(self, stage_id: str) -> list[TaskRule]:
        return [r for r in self.task_rules if r.stage == stage_id]

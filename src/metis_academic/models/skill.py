"""SkillMetadata 与 Trigger（B011，§9）。"""

from __future__ import annotations

from dataclasses import dataclass, field

from .base import Serializable, require_nonempty

VALID_TRIGGER_KINDS = ("stage", "paradigm", "artifact", "task", "always")


@dataclass
class Trigger(Serializable):
    """触发条件，形如 ``stage:S2`` / ``paradigm:quantitative`` / ``always``。"""

    kind: str = ""
    value: str = ""

    @classmethod
    def parse(cls, raw: str) -> Trigger:
        raw = raw.strip()
        if ":" in raw:
            kind, value = raw.split(":", 1)
            return cls(kind=kind.strip(), value=value.strip())
        return cls(kind=raw, value="")

    def to_string(self) -> str:
        return f"{self.kind}:{self.value}" if self.value else self.kind

    def validate(self) -> None:
        if self.kind not in VALID_TRIGGER_KINDS:
            raise ValueError(f"非法 trigger kind: {self.kind!r}，允许 {VALID_TRIGGER_KINDS}")
        if self.kind in ("stage", "paradigm", "artifact", "task") and not self.value:
            raise ValueError(f"trigger kind={self.kind} 必须带 value")


@dataclass
class SkillMetadata(Serializable):
    """``.metis/skill-registry.yaml`` 中的技能条目。"""

    id: str = ""
    path: str = ""
    description: str = ""
    triggers: list[Trigger] = field(default_factory=list)
    status: str = "available"  # available | loaded | unloaded
    persistent: bool = False  # 核心调度技能可常驻
    budget_cost: int = 1  # 占用 context budget 的权重
    loaded: bool = False

    def __post_init__(self) -> None:
        # 允许以 "stage:S2" 字符串构造（triggers: list[str | Trigger]）
        self.triggers = [
            t if isinstance(t, Trigger) else Trigger.parse(str(t)) for t in self.triggers
        ]

    def validate(self) -> None:
        require_nonempty(self, "id")
        require_nonempty(self, "path")
        if self.status not in ("available", "loaded", "unloaded"):
            raise ValueError(f"非法 skill status: {self.status}")
        for t in self.triggers:
            t.validate()

    @classmethod
    def from_dict(cls, data: dict) -> SkillMetadata:
        data = dict(data)
        raw_triggers = data.pop("triggers", []) or []
        obj = super().from_dict(data)
        obj.triggers = [
            t if isinstance(t, Trigger) else Trigger.parse(str(t)) for t in raw_triggers
        ]
        return obj

    def to_dict(self) -> dict:
        out = super().to_dict()
        out["triggers"] = [t.to_string() for t in self.triggers]
        return out

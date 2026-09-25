"""ArtifactMetadata 与 ValidationResult（B013/B014）。"""

from __future__ import annotations

from dataclasses import dataclass, field

from .base import Serializable, require_nonempty


@dataclass
class ArtifactMetadata(Serializable):
    """任务产物记录。"""

    path: str = ""  # 相对 workspace root
    kind: str = "file"  # file | table | figure | document | data | code
    task_id: str = ""
    sha256: str = ""
    bytes: int = 0
    description: str = ""
    generated_by: str = ""  # 产生该产物的动作/引擎

    def validate(self) -> None:
        require_nonempty(self, "path")
        if self.kind not in (
            "file",
            "table",
            "figure",
            "document",
            "data",
            "code",
            "slide",
            "archive",
        ):
            raise ValueError(f"非法 artifact kind: {self.kind}")


@dataclass
class ValidationIssue(Serializable):
    """单条验证问题。"""

    rule_id: str = ""
    severity: str = "error"  # error | warning | info
    target: str = ""  # 被检查对象（文件/任务/章节）
    message: str = ""

    def validate(self) -> None:
        if self.severity not in ("error", "warning", "info"):
            raise ValueError(f"非法 severity: {self.severity}")


@dataclass
class ValidationResult(Serializable):
    """一次验证的结果汇总。"""

    target: str = ""  # 任务 id 或 stage id
    passed: bool = True
    issues: list[ValidationIssue] = field(default_factory=list)
    checked_at: str = ""
    rules_run: list[str] = field(default_factory=list)

    def validate(self) -> None:
        for i in self.issues:
            i.validate()

    @property
    def errors(self) -> list[ValidationIssue]:
        return [i for i in self.issues if i.severity == "error"]

    @property
    def warnings(self) -> list[ValidationIssue]:
        return [i for i in self.issues if i.severity == "warning"]

    def add(
        self,
        rule_id: str,
        passed: bool,
        message: str = "",
        target: str = "",
        severity: str = "error",
    ) -> None:
        self.rules_run.append(rule_id)
        if not passed:
            self.issues.append(
                ValidationIssue(rule_id=rule_id, severity=severity, target=target, message=message)
            )
        self.passed = self.passed and passed

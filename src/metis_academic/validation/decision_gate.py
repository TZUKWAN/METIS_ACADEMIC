"""DecisionGate（T5.2，Laya Decision Runtime 语义转写）。

多评审 verdict 合成闸门：一致 pass / 分歧 needs_human / 全否或空 reject。
无模型或 verdicts 为空时 fail-closed 拒绝放行——评审缺失不得默认通过。
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class Decision:
    outcome: str  # pass | needs_human | reject
    reason: str = ""
    verdicts: list = field(default_factory=list)


class DecisionGate:
    def __init__(self, model=None, require_unanimous: bool = True):
        self.model = model
        self.require_unanimous = require_unanimous

    def evaluate(self, verdicts: list[dict]) -> Decision:
        if not verdicts:
            return Decision(
                outcome="reject", reason="无任何评审 verdict（fail-closed：缺失不得默认通过）"
            )
        if getattr(self.model, "available", True) is False:
            return Decision(
                outcome="reject",
                verdicts=verdicts,
                reason="模型后端不可用（fail-closed）：不能无评审放行",
            )
        outcomes = [str(v.get("verdict", "")).lower() for v in verdicts]
        if any(o not in ("pass", "reject") for o in outcomes):
            bad = [o for o in outcomes if o not in ("pass", "reject")]
            return Decision(
                outcome="needs_human",
                verdicts=verdicts,
                reason=f"存在非法 verdict: {bad}，需人工复核",
            )
        if all(o == "pass" for o in outcomes):
            return Decision(outcome="pass", verdicts=verdicts, reason="全体评审一致通过")
        if all(o == "reject" for o in outcomes):
            return Decision(outcome="reject", verdicts=verdicts, reason="全体评审一致否决")
        return Decision(outcome="needs_human", verdicts=verdicts, reason="评审分歧，转人工裁决")

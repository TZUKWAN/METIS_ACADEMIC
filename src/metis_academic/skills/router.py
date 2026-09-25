"""Skill Router（Phase H，§9）。

输入 current_stage/research_paradigm/artifact_type/task_type/context_budget，
输出 active_skills[]；核心调度技能常驻；任务结束释放非持续技能；
防止重复加载；加载/释放写入 evidence。
"""

from __future__ import annotations

from datetime import datetime, timezone

from ..adapters.base import HarnessAdapter
from ..logging_setup import get_logger
from ..models import Evidence, SkillMetadata
from .registry import SkillContent, SkillRegistry, load_skill_content

logger = get_logger("skills")

#: 同类触发的优先级（小者优先）
_KIND_PRIORITY = {"always": 0, "stage": 1, "task": 2, "paradigm": 3, "artifact": 4}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class SkillRouter:
    def __init__(self, registry: SkillRegistry | None = None, context_budget: int = 8):
        self.registry = registry or SkillRegistry()
        self.context_budget = context_budget
        self.loaded: dict[str, SkillContent] = {}

    # ---------- trigger 评估（H004–H008） ----------
    def evaluate(
        self,
        current_stage: str,
        research_paradigm: str = "",
        artifact_type: str = "",
        task_type: str = "",
    ) -> list[SkillMetadata]:
        matched: list[tuple[int, str, SkillMetadata]] = []
        for s in self.registry.skills:
            if s.persistent:
                matched.append((-1, s.id, s))  # 常驻最前
                continue
            for t in s.triggers:
                hit = (
                    t.kind == "always"
                    or (t.kind == "stage" and t.value == current_stage)
                    or (t.kind == "paradigm" and t.value == research_paradigm)
                    or (t.kind == "artifact" and t.value == artifact_type)
                    or (t.kind == "task" and t.value == task_type)
                )
                if hit:
                    matched.append((_KIND_PRIORITY.get(t.kind, 9), s.id, s))
                    break
        matched.sort(key=lambda x: (x[0], x[1]))
        return [s for _, _, s in matched]

    # ---------- context budget（H013） ----------
    def fit_budget(
        self, skills: list[SkillMetadata]
    ) -> tuple[list[SkillMetadata], list[SkillMetadata]]:
        within, dropped = [], []
        used = sum(s.budget_cost for s in self.loaded.values())
        for s in skills:
            if s.id in self.loaded:
                within.append(s)  # 已加载不重复计入
                continue
            if used + s.budget_cost <= self.context_budget or s.persistent:
                within.append(s)
                used += s.budget_cost
            else:
                dropped.append(s)
        return within, dropped

    # ---------- 加载/卸载（H009–H012/H014/H015） ----------
    def activate(
        self,
        current_stage: str,
        research_paradigm: str = "",
        artifact_type: str = "",
        task_type: str = "",
        adapter: HarnessAdapter | None = None,
        evidence_sink=None,
    ) -> list[SkillMetadata]:
        wanted = self.evaluate(current_stage, research_paradigm, artifact_type, task_type)
        within, dropped = self.fit_budget(wanted)
        for s in dropped:
            logger.info("技能 %s 超出上下文预算，未加载", s.id)
        for s in within:
            self.load(s.id, adapter=adapter, evidence_sink=evidence_sink)
        return within

    def load(
        self, skill_id: str, adapter: HarnessAdapter | None = None, evidence_sink=None
    ) -> SkillContent:
        if skill_id in self.loaded:  # H014 防重复加载
            return self.loaded[skill_id]
        meta = self.registry.get(skill_id)
        content = load_skill_content(skill_id)
        self.loaded[skill_id] = content
        meta.loaded = True
        meta.status = "loaded"
        if adapter is not None:
            adapter.load_skill(skill_id)
        if evidence_sink is not None:  # H015 记录证据
            evidence_sink(
                Evidence(
                    task_id=f"skill:{skill_id}",
                    timestamp=_now(),
                    action="skill.load",
                    status="passed",
                )
            )
        logger.info("skill loaded: %s", skill_id)
        return content

    def unload(
        self,
        skill_id: str,
        adapter: HarnessAdapter | None = None,
        evidence_sink=None,
        force: bool = False,
    ) -> bool:
        if skill_id not in self.loaded:
            return False
        meta = self.registry.get(skill_id)
        if meta.persistent and not force:  # H012 常驻技能不释放
            return False
        del self.loaded[skill_id]
        meta.loaded = False
        meta.status = "available"
        if adapter is not None:
            adapter.unload_skill(skill_id)
        if evidence_sink is not None:
            evidence_sink(
                Evidence(
                    task_id=f"skill:{skill_id}",
                    timestamp=_now(),
                    action="skill.unload",
                    status="passed",
                )
            )
        logger.info("skill unloaded: %s", skill_id)
        return True

    def release_transient(
        self,
        adapter: HarnessAdapter | None = None,
        evidence_sink=None,
        keep_task_skills: list[str] | None = None,
    ) -> list[str]:
        """任务/阶段结束：释放全部非持续技能。"""
        keep = set(keep_task_skills or [])
        released = []
        for sid in list(self.loaded):
            if sid not in keep and self.unload(sid, adapter=adapter, evidence_sink=evidence_sink):
                released.append(sid)
        return released

    def active_ids(self) -> list[str]:
        return sorted(self.loaded)

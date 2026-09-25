"""Workflow Composer（Phase G，§7）。

组合公式：
    common + paradigm + artifact + [level] + language → .metis/workflow.yaml

不维护 15 套复制工作流：全部组合都来自 workflows/ 下的 12 个碎片。
"""

from __future__ import annotations

import os
from pathlib import Path

import yaml

from ..errors import WorkflowError
from ..logging_setup import get_logger
from ..models import (
    ArtifactType,
    ProjectConfig,
    StageSpec,
    TaskRule,
    WorkflowDefinition,
)

logger = get_logger("composer")

FRAGMENT_ORDER_WEIGHT = {"common": 0, "paradigm": 1, "artifact": 2, "level": 3, "language": 4}


def _default_fragments_dir() -> Path:
    env = os.environ.get("METIS_WORKFLOWS_DIR")
    if env:
        return Path(env)
    return Path(__file__).resolve().parents[3] / "workflows"


def _deep_merge(base: dict, override: dict) -> dict:
    out = dict(base)
    for k, v in override.items():
        if isinstance(v, dict) and isinstance(out.get(k), dict):
            out[k] = _deep_merge(out[k], v)
        else:
            out[k] = v
    return out


class WorkflowComposer:
    """碎片加载与组合。Harness 无关、确定性输出。"""

    def __init__(self, fragments_dir: str | Path | None = None):
        self.fragments_dir = Path(fragments_dir) if fragments_dir else _default_fragments_dir()

    # ---------- 碎片加载 ----------
    def fragment_path(self, name: str) -> Path:
        """name 形如 common / paradigm/quantitative / artifact/fund。"""
        p = self.fragments_dir / f"{name}.yaml"
        if not p.is_file():
            raise WorkflowError(f"工作流碎片不存在: {p}")
        return p

    def load_fragment(self, name: str) -> dict:
        data = yaml.safe_load(self.fragment_path(name).read_text(encoding="utf-8"))
        if not isinstance(data, dict) or "id" not in data:
            raise WorkflowError(f"碎片格式非法（缺 id）: {name}")
        return data

    def plan_fragments(self, cfg: ProjectConfig) -> list[str]:
        """依据项目配置决定使用哪些碎片（组合公式）。"""
        if cfg.artifact_type is None or cfg.research_paradigm is None or cfg.language is None:
            raise WorkflowError("compose 需要 artifact_type/research_paradigm/language")
        names = [
            "common",
            f"paradigm/{cfg.research_paradigm.value}",
            f"artifact/{cfg.artifact_type.value}",
        ]
        if cfg.artifact_type is ArtifactType.THESIS:
            if cfg.thesis.degree_level is None:
                raise WorkflowError("毕业论文缺少 thesis.degree_level")
            names.append(f"level/{cfg.thesis.degree_level.value}")
        names.append(f"language/{cfg.language.value}")
        return names

    # ---------- 合并 ----------
    def _merge_stages(self, stages_lists: list[list[dict]]) -> list[StageSpec]:
        by_id: dict[str, StageSpec] = {}
        for stages in stages_lists:
            for raw in stages:
                sid = str(raw.get("id", ""))
                if not sid:
                    raise WorkflowError("stage 缺少 id")
                if sid in by_id:
                    spec = by_id[sid]
                    # 名称冲突视为碎片间不一致
                    if raw.get("name") and spec.name and raw["name"] != spec.name:
                        raise WorkflowError(f"阶段 {sid} 名称冲突: {spec.name} vs {raw['name']}")
                    spec.skills = _uniq(spec.skills + list(raw.get("skills") or []))
                    spec.tools = _uniq(spec.tools + list(raw.get("tools") or []))
                    spec.enabled = spec.enabled and raw.get("enabled", True)
                else:
                    by_id[sid] = StageSpec(
                        id=sid,
                        name=raw.get("name", ""),
                        description=raw.get("description", ""),
                        skills=list(raw.get("skills") or []),
                        tools=list(raw.get("tools") or []),
                        enabled=raw.get("enabled", True),
                    )
        order = {f"S{i}": i for i in range(11)}
        return [by_id[k] for k in sorted(by_id, key=lambda s: order.get(s, 99))]

    def _merge_task_rules(self, rules_lists: list[list[dict]]) -> list[TaskRule]:
        by_id: dict[str, TaskRule] = {}
        for rules in rules_lists:
            for raw in rules:
                rid = str(raw.get("id", ""))
                if not rid:
                    raise WorkflowError(f"任务规则缺少 id: {raw.get('title', '?')}")
                rule = TaskRule(
                    id=rid,
                    stage=str(raw.get("stage", "")),
                    section=str(raw.get("section", "")),
                    title=str(raw.get("title", "")),
                    objective=str(raw.get("objective", "")),
                    procedure=str(raw.get("procedure", "")),
                    procedure_params=dict(raw.get("procedure_params") or {}),
                    inputs=list(raw.get("inputs") or []),
                    expected_outputs=list(raw.get("expected_outputs") or []),
                    validation=str(raw.get("validation", "")),
                    failure_action=str(raw.get("failure_action", "retry")),
                    depends_on=list(raw.get("depends_on") or []),
                    requires=dict(raw.get("requires") or {}),
                    optional=bool(raw.get("optional", False)),
                )
                if rid in by_id:
                    prev = by_id[rid]
                    if prev.to_dict() != rule.to_dict():
                        raise WorkflowError(
                            f"任务规则 id 冲突: {rid} 在多个碎片中定义不一致 （conflict detection）"
                        )
                    continue  # 完全相同 → 去重
                by_id[rid] = rule
        stage_order = {f"S{i}": i for i in range(11)}
        return sorted(by_id.values(), key=lambda r: (stage_order.get(r.stage, 99), r.id))

    # ---------- 主入口 ----------
    def compose(self, cfg: ProjectConfig) -> WorkflowDefinition:
        names = self.plan_fragments(cfg)
        fragments = [(n, self.load_fragment(n)) for n in names]
        # 碎片按 common < paradigm < artifact < level < language 的权重稳定排序
        fragments.sort(key=lambda kv: (FRAGMENT_ORDER_WEIGHT.get(kv[0].split("/")[0], 9), kv[0]))
        stages = self._merge_stages([f.get("stages") or [] for _, f in fragments])
        task_rules = self._merge_task_rules([f.get("task_rules") or [] for _, f in fragments])
        rules: dict = {}
        for _, f in fragments:
            rules = _deep_merge(rules, f.get("rules") or {})

        wf = WorkflowDefinition(
            composed_from=[n for n, _ in fragments],
            artifact_type=cfg.artifact_type.value if cfg.artifact_type else None,
            research_paradigm=(cfg.research_paradigm.value if cfg.research_paradigm else None),
            language=cfg.language.value if cfg.language else None,
            thesis_level=(cfg.thesis.degree_level.value if cfg.thesis.degree_level else None),
            stages=stages,
            task_rules=task_rules,
            rules=rules,
        )
        self.resolve_dependencies(wf)
        logger.info(
            "workflow composed from %s: %d stages / %d task rules",
            names,
            len(stages),
            len(task_rules),
        )
        return wf

    # ---------- 依赖解析（G017）与环检测（L013 复用） ----------
    def resolve_dependencies(self, wf: WorkflowDefinition) -> list[TaskRule]:
        ids = {r.id for r in wf.task_rules}
        for r in wf.task_rules:
            for dep in r.depends_on:
                if dep not in ids:
                    raise WorkflowError(f"任务规则 {r.id} 依赖未定义的 {dep}")
        order = self.topological_order(wf.task_rules)
        return order

    @staticmethod
    def topological_order(rules: list[TaskRule]) -> list[TaskRule]:
        by_id = {r.id: r for r in rules}
        state: dict[str, int] = {}  # 0=未访问 1=访问中 2=完成
        out: list[TaskRule] = []

        def visit(rid: str, stack: list[str]) -> None:
            st = state.get(rid, 0)
            if st == 1:
                cycle = " → ".join(stack + [rid])
                raise WorkflowError(f"任务依赖存在环: {cycle}")
            if st == 2:
                return
            state[rid] = 1
            for dep in by_id[rid].depends_on:
                if dep in by_id:
                    visit(dep, stack + [rid])
            state[rid] = 2
            out.append(by_id[rid])

        for rid in by_id:
            visit(rid, [])
        return out


def _uniq(items: list) -> list:
    seen = set()
    out = []
    for x in items:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out

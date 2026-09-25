"""理论阐释引擎（Phase P，§18 TH1–TH23）。

Concept/Claim/Evidence/CounterArgument/ArgumentEdge 模型 +
argument map 构造与四项一致性检查（概念重复/偷换、循环论证、
无证据命题、结论超出前提）。
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path

import yaml

from ..logging_setup import get_logger
from ..workspace import WorkspaceManager

logger = get_logger("theory")


# ---------- 模型（P001–P005） ----------


@dataclass
class Concept:
    name: str
    definition: str
    source: str = ""  # 概念出处（文献/文本）

    @property
    def key(self) -> str:
        return re.sub(r"[\s（）()]+", "", self.name)


@dataclass
class Claim:
    id: str  # P-001 / S-001
    text: str
    kind: str = "sub"  # main | sub
    concepts: list[str] = field(default_factory=list)


@dataclass
class Evidence:
    id: str
    text: str
    source: str = ""  # 文献/材料引用


@dataclass
class CounterArgument:
    id: str
    target_claim: str
    text: str
    reply: str = ""


@dataclass
class ArgumentEdge:
    frm: str  # claim/evidence id
    to: str
    relation: str  # supports | contradicts | evidence_for


class TheoreticalEngine:
    def __init__(self, ws: WorkspaceManager, load_state: bool = True):
        self.ws = ws
        self.tdir = ws.root / "analysis" / "theoretical"
        self.tdir.mkdir(parents=True, exist_ok=True)
        self.concepts: list[Concept] = []
        self.claims: list[Claim] = []
        self.evidence: list[Evidence] = []
        self.counters: list[CounterArgument] = []
        self.edges: list[ArgumentEdge] = []
        self.genealogy: list[dict] = []
        if load_state:
            self.load_state()  # H12-002：跨进程/跨任务恢复

    # ---------- 状态持久化（H12-001/002/003） ----------
    STATE_FILE = "state.yaml"

    def save_state(self) -> Path:
        data = {
            "schema_version": 1,
            "concepts": [c.__dict__ for c in self.concepts],
            "claims": [c.__dict__ for c in self.claims],
            "evidence": [e.__dict__ for e in self.evidence],
            "counters": [c.__dict__ for c in self.counters],
            "edges": [e.__dict__ for e in self.edges],
            "genealogy": self.genealogy,
        }
        out = self.tdir / self.STATE_FILE
        out.write_text(yaml.safe_dump(data, allow_unicode=True, sort_keys=False), encoding="utf-8")
        return out

    def load_state(self) -> bool:
        f = self.tdir / self.STATE_FILE
        if not f.is_file():
            return False
        data = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
        self.concepts = [Concept(**c) for c in data.get("concepts", [])]
        self.claims = [Claim(**c) for c in data.get("claims", [])]
        self.evidence = [Evidence(**e) for e in data.get("evidence", [])]
        self.counters = [CounterArgument(**c) for c in data.get("counters", [])]
        self.edges = [ArgumentEdge(**e) for e in data.get("edges", [])]
        self.genealogy = list(data.get("genealogy", []))
        return True

    # ---------- 概念（TH2/P006） ----------
    def add_concept(self, c: Concept) -> None:
        self.concepts.append(c)
        self.save_state()

    def concept_map(self) -> Path:
        lines = ["# 概念地图", ""]
        for c in self.concepts:
            lines.append(f"- **{c.name}**：{c.definition}（来源：{c.source or '待补'}）")
        out = self.tdir / "concept_map.md"
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        self._dump_yaml("concept_map.yaml", {"concepts": [c.__dict__ for c in self.concepts]})
        return out

    # ---------- 谱系（TH6/P007） ----------
    def set_genealogy(self, items: list[dict]) -> None:
        """items: [{"year":2020,"author":"张三","work":"...","contribution":"..."}]"""
        self.genealogy = sorted(items, key=lambda x: x.get("year", 0))
        self.save_state()
        lines = ["# 文献谱系", ""]
        for g in self.genealogy:
            lines.append(
                f"- {g.get('year', '')} {g.get('author', '')}"
                f"《{g.get('work', '')}》：{g.get('contribution', '')}"
            )
        (self.tdir / "literature_genealogy.md").write_text(
            "\n".join(lines) + "\n", encoding="utf-8"
        )

    # ---------- 命题/论证（TH9–TH13/P008/P009） ----------
    def set_claims(self, claims: list[Claim]) -> None:
        self.claims = claims
        self.save_state()

    def add_evidence(self, e: Evidence) -> None:
        self.evidence.append(e)
        self.save_state()

    def add_edge(self, e: ArgumentEdge) -> None:
        self.edges.append(e)
        self.save_state()

    def core_claims(self) -> Path:
        lines = ["# 核心命题", ""]
        for c in self.claims:
            tag = "总命题" if c.kind == "main" else "分命题"
            lines.append(f"- [{c.id}]（{tag}）{c.text}")
        out = self.tdir / "core_claims.md"
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        return out

    def argument_map(self) -> Path:
        lines = ["# 论证地图（argument map）", ""]
        ids = {c.id for c in self.claims} | {e.id for e in self.evidence}
        for e in self.edges:
            if e.frm not in ids or e.to not in ids:
                lines.append(f"- ⚠ 悬空边 {e.frm} → {e.to}")
                continue
            lines.append(f"- {e.frm} --{e.relation}--> {e.to}")
        out = self.tdir / "argument_map.md"
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        self._dump_yaml("argument_map.yaml", {"edges": [e.__dict__ for e in self.edges]})
        return out

    # ---------- 反论证（TH16–TH17/P010） ----------
    def add_counter(self, c: CounterArgument) -> None:
        self.counters.append(c)
        self.save_state()

    def counter_arguments(self) -> Path:
        lines = ["# 反论证与回应", ""]
        for c in self.counters:
            lines.append(f"- [{c.id}] 针对 {c.target_claim}：{c.text}")
            lines.append(f"  - 回应：{c.reply or '（待回应）'}")
        out = self.tdir / "counter_arguments.md"
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        return out

    # ---------- 证据地图（TH14–TH15/P011） ----------
    def evidence_map(self) -> Path:
        ev_for: dict[str, list[str]] = {}
        for e in self.edges:
            if e.relation == "evidence_for":
                ev_for.setdefault(e.to, []).append(e.frm)
        lines = ["# 证据地图", ""]
        for c in self.claims:
            evs = ev_for.get(c.id, [])
            lines.append(f"- [{c.id}] {c.text} ← 证据: {', '.join(evs) or '（无）'}")
        out = self.tdir / "evidence_map.md"
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        return out

    # ---------- 检查（P012–P016） ----------
    def check_concept_duplication(self) -> list[str]:
        seen: dict[str, str] = {}
        problems = []
        for c in self.concepts:
            if c.key in seen and seen[c.key] != c.definition:
                problems.append(f"概念重复且定义冲突: {c.name}")
            seen.setdefault(c.key, c.definition)
        return problems

    def check_concept_swap(self) -> list[str]:
        """同一概念在不同命题中使用不同定义 → 偷换嫌疑（概念须在 concept_map 登记定义）。"""
        defs = {c.key: c.definition for c in self.concepts}
        problems = []
        for c in self.claims:
            for name in c.concepts:
                k = re.sub(r"[\s（）()]+", "", name)
                if k not in defs:
                    problems.append(f"命题 {c.id} 使用未登记概念: {name}")
        return problems

    def check_circularity(self) -> list[str]:
        sup: dict[str, set[str]] = {}
        for e in self.edges:
            if e.relation == "supports":
                sup.setdefault(e.frm, set()).add(e.to)
        problems: list[str] = []
        state: dict[str, int] = {}

        def visit(n: str, stack: list[str]) -> None:
            if state.get(n) == 1:
                problems.append("循环论证: " + " → ".join(stack + [n]))
                return
            if state.get(n) == 2:
                return
            state[n] = 1
            for m in sup.get(n, ()):
                visit(m, stack + [n])
            state[n] = 2

        for n in list(sup):
            visit(n, [])
        return problems

    def check_unsupported(self) -> list[str]:
        supported = {e.to for e in self.edges if e.relation in ("evidence_for", "supports")}
        return [c.id for c in self.claims if c.id not in supported]

    def check_conclusion_beyond_premises(self) -> list[str]:
        """主命题必须可由带证据支撑的分命题链推出（图可达性）。"""
        problems = []
        evidence_backed = {e.to for e in self.edges if e.relation == "evidence_for"}
        reach: dict[str, set[str]] = {}

        def reachable(n: str) -> set[str]:
            if n in reach:
                return reach[n]
            reach[n] = {n}
            for e in self.edges:
                if e.to == n and (e.relation == "supports"):
                    reach[n] |= reachable(e.frm)
            return reach[n]

        for c in self.claims:
            if c.kind != "main":
                continue
            chain = reachable(c.id)
            if not (chain & evidence_backed):
                problems.append(f"主命题 {c.id} 无法追溯到任何证据支撑的前提")
        return problems

    def full_check(self) -> dict[str, list[str]]:
        rep = {
            "concept_duplication": self.check_concept_duplication(),
            "concept_swap": self.check_concept_swap(),
            "circularity": self.check_circularity(),
            "unsupported_claims": self.check_unsupported(),
            "conclusion_beyond_premises": self.check_conclusion_beyond_premises(),
        }
        self._dump_yaml("checks.yaml", rep)
        return rep

    def _dump_yaml(self, name: str, data: dict) -> None:
        (self.tdir / name).write_text(
            yaml.safe_dump(data, allow_unicode=True, sort_keys=False), encoding="utf-8"
        )

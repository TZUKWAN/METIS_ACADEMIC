#!/usr/bin/env python3
"""补丁：定性/理论引擎状态持久化（H11-001/002/003/004/005/006，H12-001/002/003/004）。"""
from pathlib import Path

# ---------- 1) TheoreticalEngine 增加状态持久化 ----------
p = Path("src/metis_academic/engines/theoretical.py")
s = p.read_text(encoding="utf-8")
old = '''    def __init__(self, ws: WorkspaceManager):
        self.ws = ws
        self.tdir = ws.root / "analysis" / "theoretical"
        self.tdir.mkdir(parents=True, exist_ok=True)
        self.concepts: list[Concept] = []
        self.claims: list[Claim] = []
        self.evidence: list[Evidence] = []
        self.counters: list[CounterArgument] = []
        self.edges: list[ArgumentEdge] = []
        self.genealogy: list[dict] = []'''
new = '''    def __init__(self, ws: WorkspaceManager, load_state: bool = True):
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
            self.load_state()   # H12-002：跨进程/跨任务恢复

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
        out.write_text(
            yaml.safe_dump(data, allow_unicode=True, sort_keys=False),
            encoding="utf-8")
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
        return True'''
assert old in s, "theory init anchor"
s = s.replace(old, new)
# 变更后落盘
s = s.replace('''    def add_concept(self, c: Concept) -> None:
        self.concepts.append(c)''',
'''    def add_concept(self, c: Concept) -> None:
        self.concepts.append(c)
        self.save_state()''')
s = s.replace('''    def set_genealogy(self, items: list[dict]) -> None:
        """items: [{"year":2020,"author":"张三","work":"...","contribution":"..."}]"""
        self.genealogy = sorted(items, key=lambda x: x.get("year", 0))''',
'''    def set_genealogy(self, items: list[dict]) -> None:
        """items: [{"year":2020,"author":"张三","work":"...","contribution":"..."}]"""
        self.genealogy = sorted(items, key=lambda x: x.get("year", 0))
        self.save_state()''')
s = s.replace('''    def set_claims(self, claims: list[Claim]) -> None:
        self.claims = claims''',
'''    def set_claims(self, claims: list[Claim]) -> None:
        self.claims = claims
        self.save_state()''')
s = s.replace('''    def add_evidence(self, e: Evidence) -> None:
        self.evidence.append(e)''',
'''    def add_evidence(self, e: Evidence) -> None:
        self.evidence.append(e)
        self.save_state()''')
s = s.replace('''    def add_edge(self, e: ArgumentEdge) -> None:
        self.edges.append(e)''',
'''    def add_edge(self, e: ArgumentEdge) -> None:
        self.edges.append(e)
        self.save_state()''')
s = s.replace('''    def add_counter(self, c: CounterArgument) -> None:
        self.counters.append(c)''',
'''    def add_counter(self, c: CounterArgument) -> None:
        self.counters.append(c)
        self.save_state()''')
p.write_text(s, encoding="utf-8")
print("theory engine stateful")

# ---------- 2) runtime：qual 全量加载 helper + th 引擎带状态 ----------
p2 = Path("src/metis_academic/runtime.py")
s2 = p2.read_text(encoding="utf-8")
old = '''    def th_engine() -> TheoreticalEngine:
        return TheoreticalEngine(ws)'''
new = '''    def th_engine() -> TheoreticalEngine:
        return TheoreticalEngine(ws, load_state=True)   # H12-002'''
assert old in s2
s2 = s2.replace(old, new)

# 定性动作统一先装载 materials/codebook/codings（H11-003..006）
old = '''        "qual.aggregate_codes": lambda t, c: [
            _write(
                "analysis/qualitative/aggregate.yaml",
                yaml.safe_dump(
                    {"counts": qual_engine().aggregate()},
                    allow_unicode=True,
                    sort_keys=False,
                ),
                ctx,
            )
        ],'''
new = '''        "qual.aggregate_codes": lambda t, c: (
            lambda eng: (
                eng.import_materials("data/processed"),
                eng.set_codebook(_load_codebook(ws)),
                eng.load_codings(),
            )
            and [
                _write(
                    "analysis/qualitative/aggregate.yaml",
                    yaml.safe_dump({"counts": eng.aggregate()},
                                   allow_unicode=True, sort_keys=False),
                    ctx,
                )
            ]
        )(qual_engine()),'''
assert old in s2, "aggregate anchor"
s2 = s2.replace(old, new)

old = '''        "qual.negative_cases": lambda t, c: (
            lambda eng: (eng.load_codings(), eng.negative_cases())
            and ["analysis/qualitative/negative_cases.md"]
        )(qual_engine()),'''
new = '''        "qual.negative_cases": lambda t, c: (
            lambda eng: (
                eng.import_materials("data/processed"),
                eng.set_codebook(_load_codebook(ws)),
                eng.load_codings(),
                eng.negative_cases(),
            )
            and ["analysis/qualitative/negative_cases.md"]
        )(qual_engine()),'''
assert old in s2, "negative anchor"
s2 = s2.replace(old, new)

old = '''        "qual.evidence_chain": lambda t, c: (
            lambda eng: (eng.load_codings(), eng.evidence_chain())
            and ["analysis/qualitative/evidence_chain.md"]
        )(qual_engine()),'''
new = '''        "qual.evidence_chain": lambda t, c: (
            lambda eng: (
                eng.import_materials("data/processed"),
                eng.set_codebook(_load_codebook(ws)),
                eng.load_codings(),
                eng.evidence_chain(),
            )
            and ["analysis/qualitative/evidence_chain.md"]
        )(qual_engine()),'''
assert old in s2, "chain anchor"
s2 = s2.replace(old, new)
p2.write_text(s2, encoding="utf-8")
print("runtime stateful")

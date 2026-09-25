"""定性实证引擎（Phase N，§16 Q1–Q18 最小过程）。"""

from __future__ import annotations

import json
import re
from dataclasses import asdict, dataclass, field
from pathlib import Path

import yaml

from ..errors import DataError
from ..logging_setup import get_logger
from ..workspace import WorkspaceManager

logger = get_logger("qual")


@dataclass
class Material:
    """材料条目（N002）。"""

    id: str
    file: str
    description: str = ""
    units: int = 0


@dataclass
class Code:
    """编码（N003）。"""

    id: str
    name: str
    definition: str
    theme: str = ""
    keywords: list[str] = field(default_factory=list)


@dataclass
class CodingRecord:
    """编码记录（N004）。"""

    material: str
    unit: int
    code: str
    quote: str
    confirmed: bool = False


def split_units(text: str) -> list[str]:
    """按句/段切出编码单元。"""
    parts = [p.strip() for p in re.split(r"[。！？\n]", text) if len(p.strip()) >= 6]
    return parts


class QualitativeEngine:
    """材料→编码→主题→负例→饱和→机制→证据链 的确定性最小实现。

    语义判断原则上由对话 LLM 完成；引擎提供结构化容器、自动初始编码
    （关键词匹配）、统计与一致性检查，保证可复现与可追溯。
    """

    def __init__(self, ws: WorkspaceManager):
        self.ws = ws
        self.qdir = ws.root / "analysis" / "qualitative"
        self.qdir.mkdir(parents=True, exist_ok=True)
        self.materials: list[Material] = []
        self.codebook: list[Code] = []
        self.codings: list[CodingRecord] = []

    # ---------- 材料层（N005–N007） ----------
    def import_materials(self, source_dir: str | Path = "data/processed") -> list[Material]:
        base = self.ws.resolve(source_dir)
        if not base.is_dir():
            raise DataError(f"材料目录不存在: {base}")
        self.materials = []
        seen_hashes: set[str] = set()
        i = 0
        for f in sorted(base.iterdir()):
            if not f.is_file() or f.suffix.lower() not in (".txt", ".md", ".csv"):
                continue
            text = f.read_text(encoding="utf-8", errors="replace").strip()
            import hashlib

            h = hashlib.sha256(text.encode("utf-8")).hexdigest()
            if not text or h in seen_hashes:  # 去重（Q6）
                continue
            seen_hashes.add(h)
            i += 1
            units = split_units(text)
            self.materials.append(
                Material(id=f"M{i:03d}", file=f.name, description=f.stem, units=len(units))
            )
        self._write_materials()
        return self.materials

    def _write_materials(self) -> None:
        lines = ["# 材料清单", ""]
        for m in self.materials:
            lines.append(f"- {m.id} | {m.file} | 单元数 {m.units} | {m.description}")
        (self.qdir / "materials.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    def load_unit_texts(self) -> dict[str, list[str]]:
        out: dict[str, list[str]] = {}
        for m in self.materials:
            f = self.ws.root / "data" / "processed" / m.file
            if f.is_file():
                out[m.id] = split_units(f.read_text(encoding="utf-8", errors="replace"))
        return out

    # ---------- 编码层（N008–N010） ----------
    def set_codebook(self, codes: list[Code]) -> None:
        self.codebook = codes
        (self.qdir / "codebook.yaml").write_text(
            yaml.safe_dump(
                {"codes": [asdict(c) for c in codes]}, allow_unicode=True, sort_keys=False
            ),
            encoding="utf-8",
        )

    def initial_code(
        self, material_id: str, unit_index: int, unit_text: str
    ) -> CodingRecord | None:
        """关键词初始编码（Q9）；人工可覆写（N009 → confirm/edit）。"""
        for c in self.codebook:
            if any(kw and kw in unit_text for kw in c.keywords):
                return CodingRecord(
                    material=material_id, unit=unit_index, code=c.id, quote=unit_text
                )
        return None

    def run_coding(self) -> list[CodingRecord]:
        units = self.load_unit_texts()
        self.codings = []
        for mid, texts in units.items():
            for i, t in enumerate(texts):
                rec = self.initial_code(mid, i, t)
                if rec:
                    self.codings.append(rec)
        self._write_codings()
        return self.codings

    def _write_codings(self) -> None:
        with open(self.qdir / "coding.jsonl", "w", encoding="utf-8") as f:
            for r in self.codings:
                f.write(json.dumps(asdict(r), ensure_ascii=False) + "\n")

    def edit_coding(
        self, material: str, unit: int, new_code: str | None = None, confirm: bool = False
    ) -> bool:
        """人工修改/确认接口（N009）。"""
        for r in self.codings:
            if r.material == material and r.unit == unit:
                if new_code:
                    r.code = new_code
                if confirm:
                    r.confirmed = True
                self._write_codings()
                return True
        return False

    def load_codings(self) -> list[CodingRecord]:
        f = self.qdir / "coding.jsonl"
        if f.is_file():
            self.codings = [
                CodingRecord(**json.loads(ln))
                for ln in f.read_text(encoding="utf-8").splitlines()
                if ln.strip()
            ]
        return self.codings

    # ---------- 汇总/主题/范畴（N010–N012） ----------
    def aggregate(self) -> dict[str, int]:
        counts: dict[str, int] = {}
        for r in self.codings:
            counts[r.code] = counts.get(r.code, 0) + 1
        return dict(sorted(counts.items(), key=lambda kv: -kv[1]))

    def themes(self) -> dict[str, list[str]]:
        themes: dict[str, list[str]] = {}
        for c in self.codebook:
            themes.setdefault(c.theme or "未归类", []).append(c.id)
        return themes

    def write_themes(self) -> Path:
        agg = self.aggregate()
        lines = ["# 主题与范畴", ""]
        for theme, codes in self.themes().items():
            lines.append(f"## 主题：{theme}")
            for cid in codes:
                code = next((c for c in self.codebook if c.id == cid), None)
                n = agg.get(cid, 0)
                lines.append(
                    f"- {cid} {code.name if code else ''}（{n} 条编码）"
                    f" — {code.definition if code else ''}"
                )
            lines.append("")
        out = self.qdir / "themes.md"
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        return out

    # ---------- 负例（N013） ----------
    def negative_cases(self, contrast_keywords: list[str] | None = None) -> list[CodingRecord]:
        kws = contrast_keywords or ["但是", "然而", "例外", "相反", "不过", "并没有"]
        out = [r for r in self.codings if any(k in r.quote for k in kws)]
        lines = ["# 负例记录", ""]
        for r in out:
            lines.append(f"- {r.material}#{r.unit} [{r.code}] {r.quote}")
        (self.qdir / "negative_cases.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
        return out

    # ---------- 饱和度（N014） ----------
    def saturation(self, window: int = 2) -> dict:
        """按材料顺序统计新增编码；末尾 window 个材料无新码 → 饱和。"""
        units = self.load_unit_texts()
        order = [m.id for m in self.materials]
        seen_codes: set[str] = set()
        per_material: list[dict] = []
        for mid in order:
            codes_here = set()
            for t in units.get(mid, []):
                for c in self.codebook:
                    if any(kw and kw in t for kw in c.keywords):
                        codes_here.add(c.id)
            new = codes_here - seen_codes
            per_material.append({"material": mid, "codes": sorted(codes_here), "new": sorted(new)})
            seen_codes |= codes_here
        tail = per_material[-window:] if len(per_material) >= window else per_material
        saturated = bool(per_material) and all(not p["new"] for p in tail)
        report = {"per_material": per_material, "saturated": saturated, "window": window}
        (self.qdir / "saturation.yaml").write_text(
            yaml.safe_dump(report, allow_unicode=True, sort_keys=False), encoding="utf-8"
        )
        return report

    # ---------- 证据链（N015/N017） ----------
    def evidence_chain(self) -> Path:
        lines = ["# 证据链（主题 → 编码 → 引文 → 材料）", ""]
        agg = self.aggregate()
        for theme, codes in self.themes().items():
            lines.append(f"## {theme}")
            for cid in codes:
                lines.append(f"- 编码 {cid}（{agg.get(cid, 0)} 条）")
                for r in [r for r in self.codings if r.code == cid]:
                    lines.append(f"  - 「{r.quote[:50]}」（{r.material}#{r.unit}）")
            lines.append("")
        out = self.qdir / "evidence_chain.md"
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        return out

    # ---------- 机制/命题（Q15 简化记录） ----------
    def write_mechanisms(self, mechanisms: list[dict]) -> Path:
        """mechanisms: [{"id":"P1","claim":"...","codes":["C01","C02"]}]"""
        out = self.qdir / "mechanisms.yaml"
        out.write_text(
            yaml.safe_dump({"mechanisms": mechanisms}, allow_unicode=True, sort_keys=False),
            encoding="utf-8",
        )
        return out

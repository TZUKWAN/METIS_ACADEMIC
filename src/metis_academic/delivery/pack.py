"""Delivery（Phase Z，§25 / Z001–Z013）。

组装 deliverables/：manuscript、slides、references、data-package、
code-package、figures、tables、reproducibility-report、validation-report
与简短 delivery-note.md；校验全部路径后输出交付摘要。
"""

from __future__ import annotations

import shutil
import zipfile
from datetime import datetime, timezone
from pathlib import Path

from ..errors import DeliveryError
from ..logging_setup import get_logger
from ..workspace import WorkspaceManager

logger = get_logger("delivery")


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class DeliveryManager:
    def __init__(self, ws: WorkspaceManager):
        self.ws = ws
        self.out = ws.root / "deliverables"

    # ---------- Z001 ----------
    def prepare(self) -> Path:
        self.out.mkdir(parents=True, exist_ok=True)
        return self.out

    def _copy(self, src: Path, dst_name: str) -> Path | None:
        if not src.is_file():
            return None
        dst = self.out / dst_name
        shutil.copyfile(src, dst)
        return dst

    # ---------- Z002–Z008 ----------
    def collect(self, make_pdf: bool = False) -> dict:
        self.prepare()
        placed: dict[str, str] = {}
        # manuscript（docx 必需；pdf 尽力而为，不虚报）
        for name, rel in (
            ("manuscript.docx", "manuscript/manuscript.docx"),
            ("manuscript.pdf", "manuscript/manuscript.pdf"),
            ("slides.pptx", "slides/slides.pptx"),
            ("references.bib", "literature/references.bib"),
            ("reproducibility-report.md", "results/reproducibility-report.md"),
            ("validation-report.md", "reviews/validation-report.md"),
        ):
            dst = self._copy(self.ws.root / rel, name)
            if dst:
                placed[name] = rel
        # figures / tables 目录
        for d in ("figures", "tables"):
            src = self.ws.root / d
            if src.is_dir() and any(src.iterdir()):
                dst_dir = self.out / d
                if dst_dir.exists():
                    shutil.rmtree(dst_dir)
                shutil.copytree(src, dst_dir)
                placed[d] = f"deliverables/{d}"
        # data-package / code-package（zip）
        for d, zname in (("data", "data-package.zip"), ("code", "code-package.zip")):
            src = self.ws.root / d
            if src.is_dir() and any(src.rglob("*")):
                zpath = self.out / zname
                with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
                    for f in sorted(src.rglob("*")):
                        if f.is_file() and "__pycache__" not in f.parts:
                            z.write(f, str(f.relative_to(self.ws.root)))
                placed[zname] = f"{d}/ → {zname}"
        return placed

    # ---------- Z011 delivery-note ----------
    def write_delivery_note(self, placed: dict, warnings: list[str] | None = None) -> Path:
        lines = [
            "# Delivery Note",
            "",
            f"生成时间：{_now()}",
            "",
            "## 完成了什么",
            "- 研究项目全流程产物见下表（由 METIS ACADEMIC 运行时生成）",
            "",
            "## 交付物在哪里",
            "",
        ]
        for name, rel in placed.items():
            lines.append(f"- `{name}` ← {rel}")
        if not placed:
            lines.append("- （无）")
        lines += ["", "## 仍有哪些问题", ""]
        for w in warnings or []:
            lines.append(f"- {w}")
        if not warnings:
            lines.append("- 无已知阻断问题")
        lines += [
            "",
            "## 需要用户最终确认",
            "",
            "- 引用与参考文献的最终核对",
            "- 成文的语言润色与学术观点准确性",
            "- PDF 版本（如需）请在 Word 中另存导出",
            "",
        ]
        p = self.out / "delivery-note.md"
        p.write_text("\n".join(lines), encoding="utf-8")
        return p

    # ---------- Z012/Z013 ----------
    def verify_paths(self, placed: dict) -> list[str]:
        problems = []
        for name, rel in placed.items():
            if name.endswith(".zip"):
                if not (self.out / name).is_file():
                    problems.append(f"缺少 {name}")
                continue
            if "/" in rel and rel.startswith("deliverables/"):
                if not (self.ws.root / rel).is_dir():
                    problems.append(f"缺少目录 {rel}")
                continue
            if not (self.out / name).is_file():
                problems.append(f"声明了但缺失: {name}")
        return problems

    def pack(self) -> dict:
        placed = self.collect()
        problems = self.verify_paths(placed)
        if problems:
            raise DeliveryError("交付路径校验失败: " + "; ".join(problems))
        warnings = []
        if "manuscript.pdf" not in placed:
            warnings.append("未生成 PDF 版本（需用户在 Word 中导出）")
        note = self.write_delivery_note(placed, warnings)
        summary_lines = ["交付完成。deliverables/ 包含："]
        summary_lines += [f"  - {n}" for n in sorted(placed)]
        summary_lines.append(f"  - delivery-note.md（{note.stat().st_size} bytes）")
        return {"placed": placed, "note": note, "summary": "\n".join(summary_lines)}

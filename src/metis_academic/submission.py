"""投稿预检（T4.4，B79 语义转写）+ 图表重画版本（T4.5）+ PPT 生成（T4.2）。

来源：docs/plugin-migration/rescued/（metis-alpha2-release 抢救件，已注明）。
预检证据纪律（转写自 SubmissionPreflightService.ts 头注）：
- 只有官方要求存在且能解析数值的规则才给 pass/block；解析不了 → warn「无法自动核验」；
- 无要求快照 → warn「未抓取官方要求」，严禁凭空编造通过；
- blind_*（盲审）依赖研究者身份信息 → 一律 warn「需要研究者确认」；
- passed = block 数为 0（warn 不阻断但必须呈现）。
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from pathlib import Path

from .errors import GenerationError
from .workspace import WorkspaceManager

# ================= T4.4 投稿预检 =================


@dataclass
class PreflightCheck:
    check_key: str
    label: str
    level: str  # pass | warn | block
    detail: str


@dataclass
class PreflightRun:
    checks: list[PreflightCheck] = field(default_factory=list)

    @property
    def blocks(self) -> list[PreflightCheck]:
        return [c for c in self.checks if c.level == "block"]

    @property
    def warnings(self) -> list[PreflightCheck]:
        return [c for c in self.checks if c.level == "warn"]

    @property
    def passed(self) -> bool:
        return not self.blocks

    def to_markdown(self) -> str:
        lines = [f"# 投稿预检（passed={'是' if self.passed else '否'}）", ""]
        for c in self.checks:
            lines.append(f"- [{c.level}] {c.label}：{c.detail}")
        return "\n".join(lines) + "\n"


_STATEMENT_PATTERNS = {
    "funding": ("基金资助声明", r"(基金|资助|funding|grant)"),
    "conflict_of_interest": ("利益冲突声明", r"(利益冲突|conflict of interest|COI)"),
    "ethics": ("伦理声明", r"(伦理|ethics|IRB)"),
    "data_availability": ("数据可用性声明", r"(数据可用|data availability)"),
}


class SubmissionPreflight:
    """对照期刊要求快照做全确定性预检（不臆造通过）。"""

    def __init__(self, ws: WorkspaceManager):
        self.ws = ws

    def _manuscript_text(self) -> str:
        md = self.ws.root / "manuscript"
        return (
            "\n".join(f.read_text(encoding="utf-8") for f in md.rglob("*.md"))
            if md.is_dir()
            else ""
        )

    def _load_requirements(self, journal: str | None) -> dict:
        p = self.ws.root / "templates" / "journal-requirements.json"
        if not p.is_file() or not journal:
            return {}
        data = json.loads(p.read_text(encoding="utf-8"))
        return data.get(journal, {})

    def run(self, journal: str | None = None) -> PreflightRun:
        run = PreflightRun()
        text = self._manuscript_text()
        if not text:
            run.checks.append(
                PreflightCheck("manuscript", "稿件", "block", "manuscript/ 无稿件，无法预检")
            )
            return run
        reqs = self._load_requirements(journal)

        # 字数（word_limit）
        words = len(re.sub(r"\s", "", text))
        wl = reqs.get("word_limit")
        if wl is None:
            run.checks.append(
                PreflightCheck(
                    "word_count", "全文篇幅", "warn", f"未抓取官方要求。当前全文约 {words} 字"
                )
            )
        else:
            try:
                limit = int(wl)
            except (ValueError, TypeError):
                run.checks.append(
                    PreflightCheck(
                        "word_count",
                        "全文篇幅",
                        "warn",
                        f"官方要求「{wl}」无法解析出数值上限，无法自动核验。当前约 {words} 字",
                    )
                )
            else:
                if words > limit:
                    run.checks.append(
                        PreflightCheck(
                            "word_count",
                            "全文篇幅",
                            "block",
                            f"全文约 {words} 字，超出官方上限 {limit}",
                        )
                    )
                else:
                    run.checks.append(
                        PreflightCheck(
                            "word_count",
                            "全文篇幅",
                            "pass",
                            f"全文约 {words} 字，未超出官方上限 {limit}",
                        )
                    )

        # 关键声明存在性
        for key, (label, pattern) in _STATEMENT_PATTERNS.items():
            required = reqs.get(key, None)
            found = re.search(pattern, text, flags=re.I)
            if required is None:
                run.checks.append(
                    PreflightCheck(
                        f"statement_{key.split('_')[0]}",
                        label,
                        "warn",
                        f"未抓取官方要求；稿件{'已含' if found else '未含'}相关内容，需研究者确认",
                    )
                )
            elif required and not found:
                run.checks.append(
                    PreflightCheck(
                        f"statement_{key.split('_')[0]}",
                        label,
                        "block",
                        f"期刊要求{label}，稿件中未检测到",
                    )
                )
            else:
                run.checks.append(
                    PreflightCheck(
                        f"statement_{key.split('_')[0]}",
                        label,
                        "pass",
                        f"期刊{'要求' if required else '未要求'}{label}；"
                        f"稿件{'已含' if found else '无相关内容'}",
                    )
                )

        # 盲审（身份信息比对不可自动核验 → warn 需研究者确认）
        blind = reqs.get("blind_review")
        if blind:
            for label, hint in (
                ("盲审：作者姓名", "作者"),
                ("盲审：作者单位", "机构"),
                ("盲审：致谢", "致谢"),
            ):
                if label.endswith("致谢") and "致谢" in text:
                    run.checks.append(
                        PreflightCheck(
                            "blind_acknowledgement",
                            label,
                            "warn",
                            "期刊要求盲审；稿件中检测到致谢内容，需要研究者确认",
                        )
                    )
                else:
                    run.checks.append(
                        PreflightCheck(
                            f"blind_{hint}",
                            label,
                            "warn",
                            "期刊要求盲审；身份信息比对需要研究者确认",
                        )
                    )
        return run

    def run_and_save(self, journal: str | None = None) -> PreflightRun:
        run = self.run(journal)
        p = self.ws.root / "reviews" / "submission-preflight.md"
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(run.to_markdown(), encoding="utf-8")
        return run


# ================= T4.5 图表重画版本 =================


@dataclass
class FigureVersion:
    name: str
    version: int
    path: str
    instruction: str
    sha256: str


class FigureRedraw:
    """指令式图表重画：重画要求 → 新版本追加，不覆盖旧版本。

    实际绘图由 QuantEngine.make_figures 产出基础版本；重画版本以「新文件追加 +
    重画指令记录」落库（渲染器可对比指令重放）。
    """

    def __init__(self, ws: WorkspaceManager):
        self.ws = ws
        self.index_file = ws.root / ".metis" / "figure-versions.jsonl"

    def redraw(self, name: str, instruction: str, new_path: str | None = None) -> FigureVersion:
        history = self.lineage(name)
        if not history:
            raise GenerationError(f"图表 {name} 无基础版本（先由分析链生成）")
        version = history[-1].version + 1
        # 新版本文件：默认按版本号命名追加，不覆盖旧文件
        src = self.ws.root / (new_path or history[-1].path)
        if not src.is_file():
            raise GenerationError(f"重画源文件不存在: {new_path or history[-1].path}")
        from .workspace import file_sha256

        entry = FigureVersion(
            name=name,
            version=version,
            path=str(src.relative_to(self.ws.root)).replace("\\", "/"),
            instruction=instruction,
            sha256=file_sha256(src),
        )
        self.index_file.parent.mkdir(parents=True, exist_ok=True)
        with open(self.index_file, "a", encoding="utf-8") as f:
            f.write(json.dumps(entry.__dict__, ensure_ascii=False) + "\n")
        return entry

    def lineage(self, name: str) -> list[FigureVersion]:
        if not self.index_file.is_file():
            return []
        out = []
        for line in self.index_file.read_text(encoding="utf-8").splitlines():
            if line.strip():
                d = json.loads(line)
                if d["name"] == name:
                    out.append(FigureVersion(**d))
        return sorted(out, key=lambda v: v.version)

    def switch(self, name: str, version: int) -> Path:
        """切换引用：把 figures/current_<name>.txt 指向所选版本（不删任何版本）。"""
        history = self.lineage(name)
        for v in history:
            if v.version == version:
                p = self.ws.root / "figures" / f"current_{name}.txt"
                p.parent.mkdir(parents=True, exist_ok=True)
                p.write_text(
                    json.dumps(
                        {"name": name, "version": version, "path": v.path}, ensure_ascii=False
                    ),
                    encoding="utf-8",
                )
                return p
        raise GenerationError(f"版本不存在: {name} v{version}")


# ================= T4.2 PPT 生成 =================


class PptBuildService:
    """PPT 生成（语义转写自 GordenPptService：模板 slug + 标题 + 要点 → 真实 .pptx）。

    抢救件原实现：第三方模板包 + python-pptx 换字构建 + 产物校验；
    本实现：python-pptx 直构（模板主题色/版式取 style 配置），产物同样按
    「zip 魔数 + slide XML 含要点文本」探针校验（与 B79 探针方法一致）。
    python-pptx 不可用时如实报错，绝不伪造产物。
    """

    def __init__(self, ws: WorkspaceManager):
        self.ws = ws

    def build(
        self,
        title: str,
        slides: list[dict],
        template_slug: str = "academic",
        out_rel: str = "deliverables/slides.pptx",
    ) -> Path:
        try:
            from pptx import Presentation
            from pptx.util import Pt
        except ImportError as e:
            raise GenerationError(
                f"PPT 生成需要 python-pptx（pip install python-pptx）: {e}"
            ) from e
        prs = Presentation()
        cover = prs.slides.add_slide(prs.slide_layouts[0])
        cover.shapes.title.text = title
        if len(cover.placeholders) > 1:
            cover.placeholders[1].text = f"模板: {template_slug}"
        for s in slides:
            slide = prs.slides.add_slide(prs.slide_layouts[1])
            slide.shapes.title.text = s["title"]
            body = slide.placeholders[1].text_frame
            for i, b in enumerate(s.get("bullets", [])):
                para = body.paragraphs[0] if i == 0 else body.add_paragraph()
                para.text = b
                para.font.size = Pt(18)
        out = self.ws.resolve(out_rel)
        out.parent.mkdir(parents=True, exist_ok=True)
        prs.save(str(out))
        return out

    @staticmethod
    def verify_pptx(path: str | Path, expected_texts: list[str]) -> dict:
        """B79 同款探针：zip 魔数 + slide XML 含要点文本。"""
        import zipfile

        p = Path(path)
        if not p.is_file() or p.read_bytes()[:2] != b"PK":
            return {"ok": False, "reason": "zip 魔数不符"}
        try:
            with zipfile.ZipFile(p) as z:
                slide_xml = b" ".join(
                    z.read(n) for n in z.namelist() if n.startswith("ppt/slides/slide")
                )
        except zipfile.BadZipFile:
            return {"ok": False, "reason": "非合法 zip/pptx"}
        missing = [t for t in expected_texts if t.encode("utf-8") not in slide_xml]
        return {
            "ok": not missing,
            "missing_texts": missing,
            "reason": "" if not missing else f"slide XML 缺文本: {missing}",
        }

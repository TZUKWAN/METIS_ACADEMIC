"""全局质量检查（Phase Y，§24 / Y001–Y018）。

交付前最后一道闸：未完成/失败/阻塞任务、引用真实性与一致性、
变量/数据/结果/图表/章节结论一致性、因果语言越界、理论概念、
研究问题覆盖、模板规范；严重错误 → 阻止交付。
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field

import yaml

from ..logging_setup import get_logger
from ..state import StateManager
from ..workspace import WorkspaceManager

logger = get_logger("qa")

#: 因果越界词：相关/描述性研究中不得出现的强因果表述
CAUSAL_OVERREACH = ["证明了因果关系", "因果效应确定为", "完全由.*导致", "根治了"]
#: 理论概念偷换启发式：同一词形出现 ≥2 种括注定义
CONCEPT_DEF_PAT = re.compile(r"([\u4e00-\u9fff]{2,6})（即(.{2,20)？）")


@dataclass
class QaReport:
    checks: dict[str, list[str]] = field(default_factory=dict)

    def add(self, check: str, issue: str | None) -> None:
        if issue:
            self.checks.setdefault(check, []).append(issue)

    @property
    def errors(self) -> list[tuple[str, str]]:
        return [(k, i) for k, v in self.checks.items() for i in v]

    @property
    def ok(self) -> bool:
        return not self.checks

    def to_markdown(self) -> str:
        lines = ["# Global QA Report", ""]
        if self.ok:
            lines.append("全部检查通过 ✅")
        for k, issues in self.checks.items():
            lines.append(f"## {k}")
            lines.extend(f"- {i}" for i in issues)
            lines.append("")
        return "\n".join(lines) + "\n"


class GlobalQA:
    def __init__(self, ws: WorkspaceManager):
        self.ws = ws
        self.sm = StateManager(ws)

    def _read(self, rel: str) -> str:
        p = self.ws.root / rel
        return p.read_text(encoding="utf-8") if p.is_file() else ""

    # ---------- 执行全部检查 ----------
    def run_all(self) -> QaReport:
        rep = QaReport()
        self.check_tasks(rep)  # Y001–Y003
        self.check_references(rep)  # Y004–Y007
        self.check_variables(rep)  # Y008
        self.check_data_sources(rep)  # Y009
        self.check_results_consistency(rep)  # Y010/Y011
        self.check_section_conclusions(rep)  # Y012
        self.check_causal_language(rep)  # Y013
        self.check_theory_concepts(rep)  # Y014
        self.check_research_questions(rep)  # Y015
        self.check_template(rep)  # Y016
        (self.ws.root / "reviews").mkdir(parents=True, exist_ok=True)
        (self.ws.root / "reviews" / "global-qa-report.md").write_text(
            rep.to_markdown(), encoding="utf-8"
        )
        return rep

    # ---------- Y001–Y003 任务状态 ----------
    def check_tasks(self, rep: QaReport) -> None:
        """检查执行痕迹：running（非当前任务）/failed/blocked。

        pending/ready 属于尚未轮到执行的任务，由阶段验证器把关。
        """
        current_task = self.sm.current_task
        for t in self.sm.tasks.all():
            if t.status.value == "running" and t.id != current_task:
                rep.add("unfinished_tasks", f"{t.id} 处于 running（疑似中断）")
            if t.status.value == "failed":
                rep.add("failed_tasks", f"{t.id} 失败：{t.error}")
            if t.status.value == "blocked":
                rep.add("blocked_tasks", f"{t.id} 阻塞：{t.error}")

    # ---------- Y004–Y007 引用 ----------
    def check_references(self, rep: QaReport) -> None:
        bib = self.ws.root / "literature" / "references.bib"
        bib_keys: set[str] = set()
        if bib.is_file():
            for ln in bib.read_text(encoding="utf-8").splitlines():
                if ln.startswith("@") and "{" in ln:
                    bib_keys.add(ln.split("{", 1)[1].split(",", 1)[0])
        if not bib_keys:
            rep.add("references", "references.bib 为空或缺失")
        # 重复 key（@ 行重复）
        seen: dict[str, int] = {}
        for ln in bib.read_text(encoding="utf-8").splitlines() if bib.is_file() else []:
            if ln.startswith("@") and "{" in ln:
                key = ln.split("{", 1)[1].split(",", 1)[0]
                seen[key] = seen.get(key, 0) + 1
        for k, n in seen.items():
            if n > 1:
                rep.add("references", f"重复引用条目: {k}")
        # 正文引文 ⊆ bib
        cited: set[str] = set()
        manuscript = ""
        md = self.ws.root / "manuscript"
        if md.is_dir():
            for f in md.rglob("*.md"):
                manuscript += f.read_text(encoding="utf-8")
        for mkey in re.findall(r"\[bib:([^\]]+)\]", manuscript):
            cited.add(mkey)
            if mkey not in bib_keys:
                rep.add("citations", f"正文引用不存在于文献库: {mkey}")  # Y004
        # 格式（简化：gb 键需含年份）
        for mkey in cited:
            if not re.search(r"\d{4}", mkey):
                rep.add("citation_format", f"引用键缺年份（不符合 GB/T 7714 键约定）: {mkey}")

    # ---------- Y008/Y009 变量与数据源 ----------
    def check_variables(self, rep: QaReport) -> None:
        vfile = self.ws.root / "analysis" / "quantitative" / "variables.yaml"
        if not vfile.is_file():
            return
        data = yaml.safe_load(vfile.read_text(encoding="utf-8")) or {}
        names = [data.get("dv"), data.get("iv"), *data.get("controls", [])]
        available: set[str] = set()
        for f in (self.ws.root / "data" / "metadata").glob("data_dictionary.*.yaml"):
            d = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
            available |= set((d.get("variables") or {}).keys())
        for v in [x for x in names if x]:
            if available and v not in available:
                rep.add("variables", f"变量未在数据字典中定义: {v}")

    def check_data_sources(self, rep: QaReport) -> None:
        src = self.ws.root / "data" / "metadata" / "data_sources.md"
        inv = self.ws.root / "data" / "metadata" / "inventory.yaml"
        if inv.is_file() and not src.is_file():
            rep.add("data_sources", "有数据清单但缺 data_sources.md")
        if src.is_file():
            content = src.read_text(encoding="utf-8")
            for ln in content.splitlines():
                if (
                    ln.strip().startswith("- ")
                    and "http" not in ln
                    and "：" not in ln
                    and "见" not in ln
                ):
                    rep.add("data_sources", f"数据来源记录不完整: {ln.strip()[:40]}")

    # ---------- Y010/Y011 结果与图表 ----------
    def check_results_consistency(self, rep: QaReport) -> None:
        summary = self.ws.root / "results" / "summary.json"
        manuscript = self._manuscript_text()
        if summary.is_file() and manuscript:
            data = json.loads(summary.read_text(encoding="utf-8"))
            r2 = data.get("baseline", {}).get("r2")
            if r2 is not None:
                m = re.search(r"R²\s*[=＝]\s*([\d.]+)", manuscript)
                if m and abs(float(m.group(1)) - float(r2)) > 0.01:
                    rep.add(
                        "results_consistency",
                        f"正文 R²（{m.group(1)}）与结果文件（{r2:.4f}）不一致",
                    )
        # 图表与结果：正文引用的图必须存在于 figures/
        for fig in re.findall(r"figures/([\w.-]+\.png)", manuscript):
            if not (self.ws.root / "figures" / fig).is_file():
                rep.add("figure_consistency", f"正文引用的图不存在: {fig}")

    # ---------- Y012 章节结论 ----------
    def check_section_conclusions(self, rep: QaReport) -> None:
        manuscript = self._manuscript_text()
        if not manuscript:
            return
        # 摘要与结论中的核心结论数字必须一致（启发式：回归系数）
        abstract = re.search(r"# 摘要\n(.*?)\n#", manuscript, flags=re.S)
        concl = re.search(r"# 结论.*?\n(.*?)(\n# |\Z)", manuscript, flags=re.S)
        if abstract and concl:
            nums_abs = set(re.findall(r"0\.\d{3}", abstract.group(1)))
            nums_con = set(re.findall(r"0\.\d{3}", concl.group(1)))
            conflict = nums_abs & nums_con == set() and (nums_abs or nums_con)
            if conflict and (nums_abs and nums_con):
                # 摘要/结论各自报了数字且完全无交集 → 警示
                rep.add(
                    "section_conclusions",
                    f"摘要数字 {sorted(nums_abs)} 与结论数字 {sorted(nums_con)} 无交集，需人工核对",
                )

    # ---------- Y013 因果语言 ----------
    def check_causal_language(self, rep: QaReport) -> None:
        manuscript = self._manuscript_text()
        para = self.cfg_paradigm()
        if not manuscript or para != "quantitative":
            return
        design = self._read("research/methods.md")
        # 注意：「非实验」不是实验设计；用显式设计关键词判断
        is_experimental = any(
            kw in design for kw in ("随机分配", "实验组", "对照组", "随机对照", "实验室实验")
        )
        if is_experimental:
            return
        for pat in CAUSAL_OVERREACH:
            for m in re.finditer(pat, manuscript):
                rep.add(
                    "causal_language",
                    f"非实验设计中出现强因果表述: …{manuscript[max(0, m.start() - 10) : m.end() + 10]}…",
                )

    # ---------- Y014 理论概念 ----------
    def check_theory_concepts(self, rep: QaReport) -> None:
        checks = self.ws.root / "analysis" / "theoretical" / "checks.yaml"
        if checks.is_file():
            data = yaml.safe_load(checks.read_text(encoding="utf-8")) or {}
            for k, v in data.items():
                if v:
                    rep.add("theory_concepts", f"理论检查 {k}: {v}")

    # ---------- Y015 研究问题覆盖 ----------
    def check_research_questions(self, rep: QaReport) -> None:
        rq = self._read("research/research_questions.md")
        manuscript = self._manuscript_text()
        if rq and manuscript:
            for rqid in re.findall(r"RQ\d", rq):
                if rqid not in manuscript:
                    rep.add("rq_coverage", f"正文未覆盖 {rqid}")

    # ---------- Y016 模板规范 ----------
    def check_template(self, rep: QaReport) -> None:
        """Y016：已有成文（S7 产出）却缺模板规范才报警。"""
        has_draft = (
            (self.ws.root / "manuscript" / "draft.md").is_file()
            or any((self.ws.root / "manuscript").glob("*.docx"))
            if (self.ws.root / "manuscript").is_dir()
            else False
        )
        if not has_draft:
            return
        spec = self.ws.root / "templates" / "template-spec.yaml"
        tspec = self.ws.root / "templates" / "thesis" / "template-spec.yaml"
        if not (spec.is_file() or tspec.is_file()):
            rep.add("template", "有成文但缺少 template-spec.yaml（S8 未执行？）")

    # ---------- 工具 ----------
    def _manuscript_text(self) -> str:
        md = self.ws.root / "manuscript"
        if not md.is_dir():
            return ""
        return "\n".join(f.read_text(encoding="utf-8") for f in md.rglob("*.md"))

    def cfg_paradigm(self) -> str:
        try:
            cfg = self.ws.read_project()
            return cfg.research_paradigm.value if cfg.research_paradigm else ""
        except Exception:  # noqa: BLE001
            return ""

    # ---------- Y017/Y018 ----------
    def blocking_errors(self, rep: QaReport) -> list[tuple[str, str]]:
        """以下检查类别属于交付阻断项。"""
        blocking = {
            "unfinished_tasks",
            "failed_tasks",
            "citations",
            "references",
            "results_consistency",
            "figure_consistency",
        }
        return [(k, i) for k, v in rep.checks.items() if k in blocking for i in v]

    def enforce(self, rep: QaReport) -> None:
        from ..errors import QaBlockedError

        blockers = self.blocking_errors(rep)
        if blockers:
            raise QaBlockedError(
                "全局 QA 发现阻断级问题，禁止交付："
                + "；".join(f"[{k}] {i}" for k, i in blockers[:5])
                + (f"（共 {len(blockers)} 项）" if len(blockers) > 5 else "")
            )

"""Reproducibility（Phase S，§22）。

生成 code/run_all.py（raw→cleaning→analysis→tables→figures），
固定随机种子，记录依赖版本与输入/输出 hash，执行后产出
reproducibility report；两次执行输出 hash 必须一致。
"""

from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

from ..errors import MetisError
from ..logging_setup import get_logger
from ..workspace import WorkspaceManager, file_sha256

logger = get_logger("repro")

RUN_ALL_TEMPLATE = '''"""METIS ACADEMIC 一键复现脚本（自动生成，请勿手改结果文件）。

执行链：raw/processed 数据 → 检查 → 描述统计 → 基准模型 →
诊断 → 稳健性 → 表格 → 图表 → results/summary.json。
"""
from pathlib import Path

import pandas as pd

from metis_academic.engines import QuantEngine, VariableDict
from metis_academic.workspace import WorkspaceManager

ROOT = Path(__file__).resolve().parents[1]
SEED = {seed}
DATA = ROOT / {data_rel!r}
VARIABLES = {variables!r}
GROUP_VAR = {group_var!r}
MEDIATOR = {mediator!r}


def main() -> None:
    eng = QuantEngine(WorkspaceManager(ROOT), seed=SEED)
    df = pd.read_csv(DATA)
    vdict = VariableDict(**VARIABLES)
    eng.data_checks(df)
    eng.descriptive(df)
    eng.correlation(df)
    base = eng.baseline(df, vdict)
    eng.diagnostics(df, vdict, base)
    eng.robustness(df, vdict)
    if GROUP_VAR:
        eng.heterogeneity(df, vdict, GROUP_VAR)
    if MEDIATOR:
        eng.mechanism(df, vdict, MEDIATOR)
    eng.make_tables(base, eng.robustness(df, vdict))
    eng.make_figures(df, vdict, base)
    summary = eng.run_all(DATA, vdict, group_var=GROUP_VAR, mediator=MEDIATOR)
    print("run_all done:", summary["baseline"]["model"], "R2=", round(summary["baseline"]["r2"], 4))


if __name__ == "__main__":
    main()
'''


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class ReproducibilityManager:
    def __init__(self, ws: WorkspaceManager):
        self.ws = ws

    # ---------- S001/S008/S009 ----------
    def generate_run_all(
        self,
        data_rel: str,
        variables: dict,
        group_var: str | None = None,
        mediator: str | None = None,
        seed: int = 20260925,
    ) -> Path:
        script = RUN_ALL_TEMPLATE.format(
            seed=seed,
            data_rel=data_rel,
            variables=variables,
            group_var=group_var,
            mediator=mediator,
        )
        out = self.ws.root / "code" / "run_all.py"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(script, encoding="utf-8")
        # 依赖版本锁定（S008）
        import importlib.metadata as im

        pkgs = {}
        for name in (
            "metis-academic",
            "pandas",
            "numpy",
            "matplotlib",
            "pyyaml",
            "python-docx",
            "requests",
        ):
            try:
                pkgs[name] = im.version(name)
            except im.PackageNotFoundError:
                pkgs[name] = "not-installed"
        (self.ws.root / "code" / "requirements-frozen.txt").write_text(
            "\n".join(f"{k}=={v}" for k, v in pkgs.items()) + "\n", encoding="utf-8"
        )
        return out

    # ---------- S010/S011 hash 清单 ----------
    def hash_tree(self, rel_dir: str) -> dict[str, str]:
        base = self.ws.root / rel_dir
        out: dict[str, str] = {}
        if base.is_dir():
            for f in sorted(base.rglob("*")):
                if f.is_file():
                    out[str(f.relative_to(self.ws.root)).replace("\\", "/")] = file_sha256(f)
        return out

    # ---------- 执行（S012/S013） ----------
    def execute(self, timeout: int = 600) -> dict:
        """在子进程全新解释器中执行 run_all.py，记录输入/输出 hash。"""
        script = self.ws.root / "code" / "run_all.py"
        if not script.is_file() or "一键复现脚本" not in script.read_text(encoding="utf-8"):
            raise MetisError("run_all.py 不存在或尚未由 ReproducibilityManager 生成")
        inputs = {**self.hash_tree("data/raw"), **self.hash_tree("data/processed")}
        proc = subprocess.run(
            [sys.executable, str(script)],
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=str(self.ws.root),
        )
        outputs = {
            k: v
            for k, v in self.hash_tree("results").items()
            if not k.endswith("run_record.json")  # 自引用文件不参与一致性比较
        }
        record = {
            "at": _now(),
            "returncode": proc.returncode,
            "stdout_tail": proc.stdout[-500:],
            "stderr_tail": proc.stderr[-500:],
            "input_hashes": inputs,
            "output_hashes": outputs,
            "python": sys.version.split()[0],
        }
        (self.ws.root / "results" / "run_record.json").write_text(
            json.dumps(record, ensure_ascii=False, indent=1), encoding="utf-8"
        )
        if proc.returncode != 0:
            raise MetisError(f"run_all 执行失败: {proc.stderr[-300:]}")
        return record

    def compare_runs(self, record_a: dict, record_b: dict) -> dict:
        """S013：两次执行输出 hash 应完全一致。"""
        same = record_a["output_hashes"] == record_b["output_hashes"]
        diff = sorted(
            set(record_a["output_hashes"]) ^ set(record_b["output_hashes"])
            | {
                k
                for k in set(record_a["output_hashes"]) & set(record_b["output_hashes"])
                if record_a["output_hashes"][k] != record_b["output_hashes"][k]
            }
        )
        return {"identical": same, "differing": diff}

    # ---------- S014 报告 ----------
    def write_report(self, runs: list[dict]) -> Path:
        lines = [
            "# Reproducibility Report",
            "",
            f"生成时间：{_now()}",
            "",
            f"- 执行次数：{len(runs)}",
            f"- Python：{runs[0]['python']}",
            "- 种子固定：见 results/summary.json `seed`",
            "",
        ]
        comp = None
        if len(runs) >= 2:
            comp = self.compare_runs(runs[0], runs[1])
            lines.append(f"- 两次执行输出一致：{'是 ✅' if comp['identical'] else '否 ❌'}")
            if comp["differing"]:
                lines.append(f"- 差异文件：{comp['differing']}")
        lines += ["", "## 输入 hash（节选）", ""]
        for k in sorted(runs[0]["input_hashes"])[:10]:
            lines.append(f"- `{k}` {runs[0]['input_hashes'][k][:16]}…")
        lines += ["", "## 输出 hash", ""]
        for k, v in sorted(runs[0]["output_hashes"].items()):
            lines.append(f"- `{k}` {v[:16]}…")
        out = self.ws.root / "results" / "reproducibility-report.md"
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        return out

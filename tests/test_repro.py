"""Phase S Reproducibility 测试。"""

from __future__ import annotations

import numpy as np
import pandas as pd
import pytest

from metis_academic.errors import MetisError
from metis_academic.repro import ReproducibilityManager
from metis_academic.workspace import WorkspaceManager


@pytest.fixture
def ws(tmp_path):
    w = WorkspaceManager(tmp_path / "ws")
    w.create()
    rng = np.random.default_rng(20260925)
    n = 200
    x = rng.normal(0, 1, n)
    y = 0.7 * x + rng.normal(0, 1, n)
    pd.DataFrame({"digital": x, "consume": y, "income": rng.normal(0, 1, n)}).to_csv(
        w.root / "data" / "processed" / "panel.csv", index=False
    )
    return w


VARIABLES = {
    "dv": "consume",
    "iv": "digital",
    "controls": ["income"],
    "mediators": [],
    "moderators": [],
}


def test_generate_run_all_and_requirements(ws):
    rm = ReproducibilityManager(ws)
    out = rm.generate_run_all("data/processed/panel.csv", VARIABLES, seed=20260925)
    text = out.read_text(encoding="utf-8")
    assert "SEED = 20260925" in text
    assert "data/processed/panel.csv" in text
    req = (ws.root / "code" / "requirements-frozen.txt").read_text(encoding="utf-8")
    assert "pandas==" in req and "numpy==" in req


def test_execute_in_subprocess(ws):
    rm = ReproducibilityManager(ws)
    rm.generate_run_all("data/processed/panel.csv", VARIABLES)
    rec = rm.execute(timeout=300)
    assert rec["returncode"] == 0
    assert "results/summary.json" in rec["output_hashes"]
    assert (ws.root / "results" / "baseline.json").is_file()


def test_execute_missing_script(ws):
    with pytest.raises(MetisError, match="run_all.py"):
        ReproducibilityManager(ws).execute()


def test_two_runs_identical_outputs(ws):
    rm = ReproducibilityManager(ws)
    rm.generate_run_all("data/processed/panel.csv", VARIABLES)
    rec1 = rm.execute()
    rec2 = rm.execute()
    comp = rm.compare_runs(rec1, rec2)
    assert comp["identical"], comp["differing"]


def test_report_written(ws):
    rm = ReproducibilityManager(ws)
    rm.generate_run_all("data/processed/panel.csv", VARIABLES)
    rec1 = rm.execute()
    rec2 = rm.execute()
    p = rm.write_report([rec1, rec2])
    text = p.read_text(encoding="utf-8")
    assert "Reproducibility Report" in text
    assert "两次执行输出一致：是" in text

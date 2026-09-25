"""Phase O 定量引擎测试（O024 合成数据 / O025 端到端）。"""

from __future__ import annotations

import numpy as np
import pandas as pd
import pytest

from metis_academic.engines import ModelSpec, QuantEngine, VariableDict, ols
from metis_academic.errors import DataError
from metis_academic.workspace import WorkspaceManager

SEED = 20260925


def _synthetic(n: int = 300, seed: int = SEED) -> pd.DataFrame:
    """合成数据：y = 0.6*x1 + 0.3*x2 + 0.2*x3 + noise；med 受 x1 影响。"""
    rng = np.random.default_rng(seed)
    x1 = rng.normal(0, 1, n)
    x2 = rng.normal(0, 1, n)
    x3 = rng.normal(0, 1, n)
    med = 0.5 * x1 + rng.normal(0, 1, n)
    y = 0.6 * x1 + 0.3 * x2 + 0.2 * x3 + 0.4 * med + rng.normal(0, 1, n)
    gender = rng.choice([0, 1], n)
    return pd.DataFrame(
        {"income": x2, "age": x3, "digital": x1, "consume": y, "mediator": med, "gender": gender}
    )


@pytest.fixture
def ws(tmp_path):
    w = WorkspaceManager(tmp_path / "ws")
    w.create()
    df = _synthetic()
    df.to_csv(w.root / "data" / "processed" / "panel.csv", index=False)
    return w


def _vdict() -> VariableDict:
    return VariableDict(
        dv="consume",
        iv="digital",
        controls=["income", "age"],
        mediators=["mediator"],
        moderators=["gender"],
    )


def test_ols_recovers_true_coefficients(ws):
    df = _synthetic()
    res = ols(df, ModelSpec(dv="consume", rhs=["digital", "income", "age"]))
    # digital 总效应 = 0.6 + 0.4*0.5（经 mediator）= 0.8
    assert abs(res.coef["digital"] - 0.8) < 0.15
    assert abs(res.coef["income"] - 0.3) < 0.15
    assert res.r2 > 0.4
    assert res.n == 300
    assert res.params["seed"] == SEED


def test_load_and_checks(ws):
    eng = QuantEngine(ws)
    df = eng.load("data/processed/panel.csv")
    rep = eng.data_checks(df)
    assert rep["duplicates"] == 0
    assert "missing_by_col" in rep
    assert (ws.root / "results" / "checks.json").is_file()


def test_load_missing_raises(ws):
    with pytest.raises(DataError, match="数据不存在"):
        QuantEngine(ws).load("data/processed/ghost.csv")


def test_descriptive_correlation_vif(ws):
    eng = QuantEngine(ws)
    df = eng.load("data/processed/panel.csv")
    desc = eng.descriptive(df)
    assert "consume" in str(desc.columns)
    corr = eng.correlation(df)
    assert abs(corr.loc["digital", "consume"]) > 0.3
    v = eng.vif(df, ["digital", "income", "age"])
    assert all(x < 5 for x in v.values())


def test_baseline_and_diagnostics(ws):
    eng = QuantEngine(ws)
    df = eng.load("data/processed/panel.csv")
    res = eng.baseline(df, _vdict())
    assert (ws.root / "results" / "baseline.json").is_file()
    diag = eng.diagnostics(df, _vdict(), res)
    assert "residual_skew" in diag and "vif" in diag
    assert (ws.root / "results" / "diagnostics.json").is_file()


def test_robustness_coefficient_stable(ws):
    eng = QuantEngine(ws)
    df = eng.load("data/processed/panel.csv")
    robust = eng.robustness(df, _vdict())
    assert set(robust) >= {"winsorized", "extra_control", "subsample"}
    for k, v in robust.items():
        assert abs(v["coef"]["digital"] - 0.8) < 0.2, k
    assert (ws.root / "results" / "robustness.md").is_file()


def test_endogeneity_documented_and_2sls(ws):
    eng = QuantEngine(ws)
    df = eng.load("data/processed/panel.csv")
    rep = eng.endogeneity(df, _vdict())
    assert rep["strategy"] == "documented"  # 无 IV → 如实记录
    rep2 = eng.endogeneity(df, _vdict(), iv_candidate="age")
    assert rep2["strategy"] == "2sls_simplified"


def test_heterogeneity_and_mechanism(ws):
    eng = QuantEngine(ws)
    df = eng.load("data/processed/panel.csv")
    het = eng.heterogeneity(df, _vdict(), "gender")
    assert set(het) == {"0", "1"}
    mech = eng.mechanism(df, _vdict(), "mediator")
    # 中介路径：digital → mediator 系数应接近 0.5
    assert abs(mech["iv_to_med"]["coef"]["digital"] - 0.5) < 0.15
    assert (ws.root / "results" / "mechanism.json").is_file()


def test_extension(ws):
    eng = QuantEngine(ws)
    df = eng.load("data/processed/panel.csv")
    assert eng.extension(df, _vdict())["note"].startswith("无预设")
    r = eng.extension(df, _vdict(), alt_dv="income")
    assert "digital" in r["coef"] or "_cons" in r["coef"]


def test_tables_and_figures(ws):
    eng = QuantEngine(ws)
    df = eng.load("data/processed/panel.csv")
    base = eng.baseline(df, _vdict())
    robust = eng.robustness(df, _vdict())
    tab = eng.make_tables(base, robust)
    assert "基准回归" in tab.read_text(encoding="utf-8")
    figs = eng.make_figures(df, _vdict(), base)
    assert len(figs) == 2
    for f in figs:
        assert f.is_file() and f.stat().st_size > 1000


def test_run_all_end_to_end(ws):
    eng = QuantEngine(ws, seed=SEED)
    summary = eng.run_all(
        "data/processed/panel.csv", _vdict(), group_var="gender", mediator="mediator"
    )
    assert summary["seed"] == SEED
    assert summary["robustness_keys"] == ["winsorized", "extra_control", "subsample"]
    assert set(summary["heterogeneity_groups"]) == {"0", "1"}
    # 机器可读结果
    for name in (
        "baseline.json",
        "summary.json",
        "descriptives.json",
        "robustness.json",
        "checks.json",
    ):
        assert (ws.root / "results" / name).is_file(), name
    # 人读结果
    for name in ("descriptives.md", "robustness.md"):
        assert (ws.root / "results" / name).is_file(), name
    # 表与图
    assert (ws.root / "tables" / "main_tables.md").is_file()
    assert len(list((ws.root / "figures").glob("*.png"))) == 2
    # 复现：同种子重跑 summary 一致
    eng2 = QuantEngine(ws, seed=SEED)
    summary2 = eng2.run_all(
        "data/processed/panel.csv", _vdict(), group_var="gender", mediator="mediator"
    )
    assert summary == summary2

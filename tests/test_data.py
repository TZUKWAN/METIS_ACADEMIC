"""Phase M Data Manager 测试（M015）。"""

from __future__ import annotations

import pytest

from metis_academic.data import DataManager
from metis_academic.errors import DataError
from metis_academic.workspace import WorkspaceManager


@pytest.fixture
def ws(tmp_path):
    w = WorkspaceManager(tmp_path / "ws")
    w.create()
    return w


def _seed_csv(ws) -> object:
    f = ws.root / "inputs" / "existing-data" / "survey.csv"
    f.write_text("age,income,consume\n25,3000,1200\n34,5600,2300\n", encoding="utf-8")
    return f


def test_scan_existing_detects_format_hash(ws):
    f = _seed_csv(ws)
    dm = DataManager(ws)
    found = dm.scan_existing()
    assert len(found) == 1
    e = found[0]
    assert e.fmt == "csv" and e.origin == "existing"
    assert len(e.sha256) == 64
    assert e.path.endswith("survey.csv")
    assert dm.files()[0].path == str(f.relative_to(ws.root)).replace("\\", "/")


def test_register_same_file_idempotent(ws):
    f = _seed_csv(ws)
    dm = DataManager(ws)
    dm.scan_existing()
    dm.register_file(f, origin="existing")
    assert len(dm.files()) == 1


def test_raw_immutability_violation_detected(ws):
    f = _seed_csv(ws)
    dm = DataManager(ws)
    dm.scan_existing()
    f.write_text("tampered\n1,1,1\n", encoding="utf-8")  # 用户改动 raw
    with pytest.raises(DataError, match="hash"):
        dm.register_file(ws.root / "inputs" / "existing-data" / "survey.csv", origin="user")


def test_inventory_persisted_and_reloadable(ws):
    _seed_csv(ws)
    dm = DataManager(ws)
    dm.scan_existing()
    dm2 = DataManager(ws)  # 新实例重读
    assert len(dm2.files()) == 1
    assert dm2.files()[0].sha256 == dm.files()[0].sha256


def test_dictionary_generated(ws):
    f = _seed_csv(ws)
    dm = DataManager(ws)
    out = dm.build_dictionary(f)
    text = out.read_text(encoding="utf-8")
    assert "age" in text and "income" in text
    assert "int" in text


def test_register_url_with_injected_fetch(ws):
    dm = DataManager(ws)

    def fake_fetch(url, dest):
        dest.write_text("a,b\n1,2\n", encoding="utf-8")

    e = dm.register_url("microdata", "https://example.org/data.csv", fetch=fake_fetch)
    assert e.origin == "download" and e.fmt == "csv"
    assert list((ws.root / "data" / "raw").glob("microdata*"))  # 文件名带 URL 后缀
    logs = list((ws.root / "data" / "metadata" / "downloads").glob("microdata*.log"))
    assert logs and "status=ok" in logs[0].read_text(encoding="utf-8")
    src = (ws.root / "data" / "metadata" / "data_sources.md").read_text(encoding="utf-8")
    assert "example.org" in src


def test_register_url_failure_cleans_up(ws):
    dm = DataManager(ws)

    def bad_fetch(url, dest):
        raise RuntimeError("404")

    with pytest.raises(DataError, match="下载"):
        dm.register_url("x", "https://example.org/x.csv", fetch=bad_fetch)
    assert not (ws.root / "data" / "raw" / "x").exists()
    logs = list((ws.root / "data" / "metadata" / "downloads").glob("x*.log"))
    assert logs and "status=failed" in logs[0].read_text(encoding="utf-8")


def test_duplicate_download_rejected(ws):
    dm = DataManager(ws)
    dm.register_url("d", "https://e.org/a", fetch=lambda u, d: d.write_text("x"))
    with pytest.raises(DataError, match="只读"):
        dm.register_url("d", "https://e.org/b", fetch=lambda u, d: d.write_text("y"))


def test_layers_interim_processed(ws):
    f = _seed_csv(ws)
    dm = DataManager(ws)
    interim = dm.to_interim(f, "survey_clean.csv")
    processed = dm.to_processed(interim, "survey_final.csv")
    assert "interim" in str(interim) and "processed" in str(processed)
    origins = {e.path: e.origin for e in dm.files()}
    assert origins[str(interim.relative_to(ws.root)).replace("\\", "/")] == "interim"
    assert origins[str(processed.relative_to(ws.root)).replace("\\", "/")] == "generated"


def test_missing_variables_report(ws):
    f = _seed_csv(ws)
    dm = DataManager(ws)
    dm.build_dictionary(f)
    missing = dm.missing_report(["age", "income", "gender", "region"])
    assert missing == ["gender", "region"]


def test_search_public_requires_index(ws):
    dm = DataManager(ws)
    assert dm.search_public("收入") == []  # 无索引 → 空且提示
    idx = {"datasets": [{"name": "CFPS", "url": "https://isi.org/cfps"}]}
    hits = dm.search_public("cfps", metis_data_index=idx)
    assert len(hits) == 1

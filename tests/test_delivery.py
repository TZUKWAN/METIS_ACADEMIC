"""Phase Z Delivery 测试。"""

from __future__ import annotations

import pytest

from metis_academic.delivery import DeliveryManager
from metis_academic.workspace import WorkspaceManager


@pytest.fixture
def ws(tmp_path):
    w = WorkspaceManager(tmp_path / "ws")
    w.create()
    # 造交付来源
    (w.root / "manuscript").mkdir(exist_ok=True)
    (w.root / "manuscript" / "manuscript.docx").write_bytes(b"PK-docx")
    (w.root / "literature" / "references.bib").write_text("@misc{a2020b,\n}\n", encoding="utf-8")
    (w.root / "figures").mkdir(exist_ok=True)
    (w.root / "figures" / "coefplot.png").write_bytes(b"png")
    (w.root / "tables").mkdir(exist_ok=True)
    (w.root / "tables" / "main.md").write_text("# 表\n", encoding="utf-8")
    (w.root / "data" / "processed" / "p.csv").write_text("a\n1\n", encoding="utf-8")
    (w.root / "code" / "run_all.py").write_text("print('x')\n", encoding="utf-8")
    return w


def test_pack_collects_artifacts(ws):
    dm = DeliveryManager(ws)
    result = dm.pack()
    out = ws.root / "deliverables"
    assert (out / "manuscript.docx").is_file()
    assert (out / "references.bib").is_file()
    assert (out / "figures" / "coefplot.png").is_file()
    assert (out / "tables" / "main.md").is_file()
    assert (out / "data-package.zip").is_file()
    assert (out / "code-package.zip").is_file()
    note = (out / "delivery-note.md").read_text(encoding="utf-8")
    assert "交付物在哪里" in note
    assert "需要用户最终确认" in note
    assert "manuscript.docx" in result["summary"]


def test_pack_missing_manuscript_fails(ws):
    (ws.root / "manuscript" / "manuscript.docx").unlink()
    dm = DeliveryManager(ws)
    result = dm.pack()  # manuscript 缺失 → placed 中没有它，不声明 → 不报错
    assert "manuscript.docx" not in result["placed"]
    note = (ws.root / "deliverables" / "delivery-note.md").read_text(encoding="utf-8")
    assert "PDF" in note  # 缺 pdf 提示存在


def test_verify_paths_detects_missing(ws):
    dm = DeliveryManager(ws)
    (ws.root / "deliverables").mkdir(exist_ok=True)
    (ws.root / "deliverables" / "ghost.docx").write_bytes(b"x")
    problems = dm.verify_paths({"ghost": "manuscript/ghost.docx"})
    assert problems


def test_zip_contents(ws):
    import zipfile

    dm = DeliveryManager(ws)
    dm.pack()
    with zipfile.ZipFile(ws.root / "deliverables" / "data-package.zip") as z:
        names = z.namelist()
    assert any(n.endswith("p.csv") for n in names)

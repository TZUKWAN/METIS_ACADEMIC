"""Phase N 定性引擎测试（N018 集成）。"""

from __future__ import annotations

import pytest

from metis_academic.engines import Code, QualitativeEngine
from metis_academic.errors import DataError
from metis_academic.workspace import WorkspaceManager


@pytest.fixture
def ws(tmp_path):
    w = WorkspaceManager(tmp_path / "ws")
    w.create()
    proc = w.root / "data" / "processed"
    proc.mkdir(parents=True, exist_ok=True)
    (proc / "interview_01.txt").write_text(
        "外卖骑手每天工作十二个小时以上。平台通过算法控制接单。"
        "骑手感到时间被机器绑架了。但是老骑手学会了挑单技巧。"
        "然而新骑手只能被动接受系统派单。",
        encoding="utf-8",
    )
    (proc / "interview_02.txt").write_text(
        "平台用评分系统约束骑手行为。骑手相互之间很少交流。"
        "算法派单完全不需要人工调度。但是工会开始介入谈判。",
        encoding="utf-8",
    )
    return w


def _codebook() -> list[Code]:
    return [
        Code(
            id="C01",
            name="算法控制",
            definition="平台以算法/评分约束劳动过程",
            theme="技术治理",
            keywords=["算法", "评分系统", "系统派单"],
        ),
        Code(
            id="C02",
            name="时间压力",
            definition="劳动时间与节奏被压缩",
            theme="劳动体验",
            keywords=["小时", "时间", "绑架"],
        ),
        Code(
            id="C03",
            name="反抗策略",
            definition="骑手的应对与博弈",
            theme="主体性",
            keywords=["挑单", "技巧", "工会"],
        ),
    ]


def test_import_materials_and_units(ws):
    eng = QualitativeEngine(ws)
    mats = eng.import_materials()
    assert len(mats) == 2
    assert mats[0].id == "M001"
    assert all(m.units >= 3 for m in mats)
    assert (ws.root / "analysis" / "qualitative" / "materials.md").is_file()


def test_import_missing_dir(ws):
    with pytest.raises(DataError, match="材料目录"):
        QualitativeEngine(ws).import_materials("data/nowhere")


def test_coding_pipeline(ws):
    eng = QualitativeEngine(ws)
    eng.import_materials()
    eng.set_codebook(_codebook())
    assert (ws.root / "analysis" / "qualitative" / "codebook.yaml").is_file()
    codings = eng.run_coding()
    assert len(codings) >= 6
    codes = {c.code for c in codings}
    assert codes <= {"C01", "C02", "C03"}
    agg = eng.aggregate()
    assert sum(agg.values()) == len(codings)
    # 人工修改接口
    target = codings[0]
    assert eng.edit_coding(target.material, target.unit, new_code="C03", confirm=True)
    assert eng.load_codings()[0].code == "C03"
    assert eng.load_codings()[0].confirmed is True


def test_themes_and_evidence_chain(ws):
    eng = QualitativeEngine(ws)
    eng.import_materials()
    eng.set_codebook(_codebook())
    eng.run_coding()
    themes_file = eng.write_themes()
    text = themes_file.read_text(encoding="utf-8")
    for theme in ("技术治理", "劳动体验", "主体性"):
        assert theme in text
    chain = eng.evidence_chain()
    assert "证据链" in chain.read_text(encoding="utf-8")
    assert "M001" in chain.read_text(encoding="utf-8")


def test_negative_cases(ws):
    eng = QualitativeEngine(ws)
    eng.import_materials()
    eng.set_codebook(_codebook())
    eng.run_coding()
    neg = eng.negative_cases()
    assert any("但是" in r.quote or "然而" in r.quote for r in neg)
    nc = ws.root / "analysis" / "qualitative" / "negative_cases.md"
    assert "负例记录" in nc.read_text(encoding="utf-8")


def test_saturation_logic(ws):
    eng = QualitativeEngine(ws)
    eng.import_materials()
    eng.set_codebook(_codebook())
    rep = eng.saturation()
    assert "saturated" in rep
    assert len(rep["per_material"]) == 2
    # 单一材料集不轻易判饱和（每个材料都有新码出现）
    assert rep["saturated"] is False
    sat_file = ws.root / "analysis" / "qualitative" / "saturation.yaml"
    assert sat_file.is_file()


def test_mechanisms_output(ws):
    eng = QualitativeEngine(ws)
    out = eng.write_mechanisms(
        [{"id": "P1", "claim": "算法控制加剧时间压力", "codes": ["C01", "C02"]}]
    )
    assert "P1" in out.read_text(encoding="utf-8")

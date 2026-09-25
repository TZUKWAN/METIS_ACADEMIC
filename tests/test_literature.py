"""Phase J 文献模块测试（J025 去重 / J026 格式化）。

网络相关测试只测「诚实降级」路径：断网/反爬时返回空且不伪造记录。
真实 arXiv API 测试标记为 online，默认跳过。
"""

from __future__ import annotations

import json

import pytest

from metis_academic.literature import (
    FixtureSource,
    LiteratureManager,
    LiteratureRecord,
    SearchQuery,
    format_apa,
    format_bibtex,
    format_gbt7714,
)
from metis_academic.workspace import WorkspaceManager


@pytest.fixture
def ws(tmp_path):
    w = WorkspaceManager(tmp_path / "ws")
    w.create()
    return w


def _rec(title="深度学习在社会科学中的应用", doi="10.1234/abc", **kw) -> LiteratureRecord:
    base = dict(
        title=title,
        authors=["张三", "李四"],
        year=2023,
        source="fixture",
        doi=doi,
        url="https://example.org/paper",
        abstract="一项研究",
        keywords=["机器学习"],
        retrieved_at="2026-09-25T00:00:00+00:00",
    )
    base.update(kw)
    return LiteratureRecord(**base)


# ---------- 记录模型 ----------


def test_record_roundtrip_and_validation():
    r = _rec()
    assert LiteratureRecord.from_yaml(r.to_yaml()).to_dict() == r.to_dict()
    r.validate()
    with pytest.raises(ValueError):
        _rec(year=1800).validate()
    with pytest.raises(ValueError):
        LiteratureRecord(title="", source="x").validate()


def test_normalization():
    assert LiteratureRecord.normalize_doi("https://doi.org/10.1234/ABC") == "10.1234/abc"
    assert (
        LiteratureRecord.normalize_title("Deep Learning, in Social Science!")
        == "deeplearninginsocialscience"
    )
    assert LiteratureRecord.normalize_year("出版于 2021 年") == 2021
    assert LiteratureRecord.normalize_year(None) is None


def test_duplicate_detection_doi_and_title():
    a = _rec()
    b = _rec(title="深度学习，在社会科学中的应用！", doi="")  # 同题不同标点/空格
    c = _rec(title="另一篇完全不同的论文", doi="10.9999/xyz")
    assert a.is_similar_to(b)
    assert not a.is_similar_to(c)


# ---------- 查询 ----------


def test_query_validation():
    q = SearchQuery(terms="数字劳动")
    q.validate()
    with pytest.raises(ValueError):
        SearchQuery(terms="x", sources=["ghost"]).validate()
    with pytest.raises(ValueError):
        SearchQuery(terms="x", max_results=0).validate()


# ---------- 检索与去重 ----------


def test_fixture_search_and_manager_ingest(ws, tmp_path):
    fx = tmp_path / "lit.json"
    fx.write_text(
        json.dumps(
            [
                {
                    "title": "数字劳动与平台经济",
                    "authors": ["王五"],
                    "year": 2022,
                    "doi": "10.5555/dl1",
                    "verified": True,
                    "verify_url": "https://doi.org/10.5555/dl1",
                },
                {
                    "title": "平台经济下的劳动过程",
                    "authors": ["赵六"],
                    "year": 2023,
                    "verified": True,
                    "url": "https://arxiv.org/abs/2301.00001",
                    "verify_url": "https://arxiv.org/abs/2301.00001",
                },
                {"title": "无法核验的劳动文献", "authors": ["无名"], "year": 2020},
            ],
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )
    src = FixtureSource(fx)
    assert src.id == "fixture"  # 夹具源可实例化
    lm = LiteratureManager(ws, source_kwargs={"fixture": {"fixture_path": fx}})
    added = lm.search(SearchQuery(terms="劳动", sources=["fixture"], max_results=10))
    assert len(added) == 3
    # 已核验判断：有官方核验 URL → 自动可信
    assert lm.verified_records().__len__() == 2
    # 未验证记录不得进入最终参考文献
    titles = [r.title for r in lm.verified_records()]
    assert "无法核验的劳动文献" not in titles


def test_dedupe_in_manager(ws):
    lm = LiteratureManager(ws)
    lm._ingest([_rec()])
    dupes = lm._ingest([_rec(title="深度学习在社会科学中的应用!", doi="")])
    assert dupes == []
    assert len(lm.records) == 1


def test_index_bib_and_search_log_written(ws):
    # 用临时 fixture 源跑一次完整检索
    fx_path = ws.root / "_fx.json"
    fx_path.write_text(
        json.dumps(
            [{"title": "数字劳动研究综述", "authors": ["王五"], "year": 2022, "verified": False}],
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )
    lm2 = LiteratureManager(ws, source_kwargs={"fixture": {"fixture_path": fx_path}})
    lm2.search(SearchQuery(terms="劳动", sources=["fixture"]))
    lit = ws.root / "literature"
    index = (lit / "literature_index.md").read_text(encoding="utf-8")
    assert "数字劳动研究综述" in index and "✗" in index
    bib = (lit / "references.bib").read_text(encoding="utf-8")
    assert "@misc{" in bib
    logs = list((lit / "search_logs").glob("*.yaml"))
    assert len(logs) == 1


def test_verify_backfill(ws):
    lm = LiteratureManager(ws)
    lm._ingest([_rec(verified=False)])
    assert lm.verified_records() == []
    assert lm.verify_record("深度学习", reachable=True) is True
    assert len(lm.verified_records()) == 1


# ---------- 格式化（J026） ----------


def test_gbt7714_format():
    r = _rec()
    s = format_gbt7714(r)
    assert "张三, 李四" in s and "[EB/OL]" in s and "2023" in s
    assert s.endswith(".")


def test_apa_format():
    s = format_apa(_rec())
    assert "张三, & 李四 (2023)" in s


def test_bibtex_format():
    b = format_bibtex(_rec(), key="zhang2023dl")
    assert b.startswith("@misc{zhang2023dl,")
    assert "author = {张三 and 李四}" in b
    assert "doi = {10.1234/abc}" in b


# ---------- 诚实降级 ----------


def test_http_source_offline_returns_empty(monkeypatch):
    import requests as _rq

    from metis_academic.literature.sources import NcpssdSource
    from metis_academic.literature.sources import SearchQuery as SQ

    def boom(*args, **kwargs):
        raise _rq.RequestException("no network")

    monkeypatch.setattr(_rq, "get", boom)
    out = NcpssdSource().search(SQ(terms="数字劳动", sources=["ncpssd"]))
    assert out == []  # 不伪造记录


@pytest.mark.online
def test_arxiv_real_api_skipped_by_default():
    pytest.skip("联网测试默认跳过：pytest -m online 运行")

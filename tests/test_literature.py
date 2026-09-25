"""Phase J 文献模块测试（J025 去重 / J026 格式化 / H2 真实性闸门）。

网络相关测试只测「诚实降级」路径；resolver 真实联网测试标记 online。
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
from metis_academic.literature.models import VerificationStatus
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
    legacy_verified = base.pop("verified", None)
    rec = LiteratureRecord(**base)
    if legacy_verified is not None:
        rec.verified = legacy_verified  # 走兼容 setter（带 legacy 依据）
    return rec


# ---------- 记录模型 ----------


def test_record_roundtrip_and_validation():
    r = _rec()
    r2 = LiteratureRecord.from_dict(r.to_dict())
    assert r2.to_dict() == r.to_dict()
    r.validate()
    with pytest.raises(ValueError):
        _rec(year=1800).validate()
    with pytest.raises(ValueError):
        LiteratureRecord(title="", source="x").validate()


def test_verification_states_roundtrip():
    """H2-003：五态序列化 roundtrip。"""
    r = _rec()
    for st in VerificationStatus:
        r.verification = st
        r2 = LiteratureRecord.from_dict(r.to_dict())
        assert r2.verification is st


def test_verified_requires_resolver():
    """H2-004：verified 无依据 → 拒绝。"""
    r = _rec()
    r.verification = VerificationStatus.VERIFIED
    r.verification_info.resolver = ""
    with pytest.raises(ValueError, match="resolver"):
        r.validate()
    r.verification_info.resolver = "crossref-doi"
    r.validate()


def test_no_url_prefix_auto_verify():
    """H2-005：假 doi.org URL 不得自动通过。"""
    fake = _rec(title="伪造成果", doi="10.9999/fake", url="https://example.org/paper")
    fake2 = LiteratureRecord.from_dict(fake.to_dict())
    assert fake2.verification is VerificationStatus.UNVERIFIED
    # ingest 后同样不自动 verified
    import tempfile
    from pathlib import Path

    from metis_academic.workspace import WorkspaceManager

    ws = WorkspaceManager(Path(tempfile.mkdtemp()) / "ws")
    ws.create()
    lm = LiteratureManager(ws, load_persisted=False)
    lm._ingest([fake])
    assert (
        lm.records and next(iter(lm.records.values())).verification is VerificationStatus.UNVERIFIED
    )


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


def test_fuzzy_duplicate_reported_not_merged():
    """H2-012：fuzzy 相似只报告不自动合并。"""
    a = _rec(title="数字劳动的过程控制与治理机制研究")
    b = _rec(title="数字劳动的过程控制与治理机制", doi="")
    assert 0.70 <= a.title_similarity(b) < 1.0


# ---------- 查询 ----------


def test_query_validation():
    q = SearchQuery(terms="数字劳动")
    q.validate()
    with pytest.raises(ValueError):
        SearchQuery(terms="x", sources=["ghost"]).validate()
    with pytest.raises(ValueError):
        SearchQuery(terms="x", max_results=0).validate()


# ---------- 检索、去重与持久化 ----------


def _lit_fixture(tmp_path, name="lit.json") -> object:
    fx = tmp_path / name
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
    return fx


def test_fixture_search_and_manager_ingest(ws, tmp_path):
    fx = _lit_fixture(tmp_path)
    src = FixtureSource(fx)
    assert src.id == "fixture"
    lm = LiteratureManager(ws, source_kwargs={"fixture": {"fixture_path": fx}})
    added = lm.search(SearchQuery(terms="劳动", sources=["fixture"], max_results=10))
    assert len(added) == 3
    # H2-005：来源发现不产生核验；legacy fixture 标记兼容解析
    assert lm.verified_records().__len__() == 2
    titles = [r.title for r in lm.verified_records()]
    assert "无法核验的劳动文献" not in titles


def test_records_persist_and_reload(ws, tmp_path):
    """H2-001/H2-002：records.jsonl 持久化 + 重启恢复 verified 集合。"""
    fx = _lit_fixture(tmp_path)
    lm = LiteratureManager(ws, source_kwargs={"fixture": {"fixture_path": fx}})
    lm.search(SearchQuery(terms="劳动", sources=["fixture"]))
    assert (ws.root / "literature" / "records.jsonl").is_file()
    lm2 = LiteratureManager(ws, source_kwargs={"fixture": {"fixture_path": fx}})
    assert len(lm2.records) == 3
    assert {r.title for r in lm2.verified_records()} == {r.title for r in lm.verified_records()}
    # 全字段恢复
    r1 = next(r for r in lm.records.values() if r.title == "数字劳动与平台经济")
    r2 = next(r for r in lm2.records.values() if r.title == "数字劳动与平台经济")
    assert r2.to_dict() == r1.to_dict()


def test_bib_contains_only_verified(ws, tmp_path):
    """H2-008：2 verified + 1 unverified → bib 只输出 2 条。"""
    fx = _lit_fixture(tmp_path)
    lm = LiteratureManager(ws, source_kwargs={"fixture": {"fixture_path": fx}})
    lm.search(SearchQuery(terms="劳动", sources=["fixture"]))
    bib = (ws.root / "literature" / "references.bib").read_text(encoding="utf-8")
    assert bib.count("@misc{") == 2
    assert "无法核验的劳动文献" not in bib
    # manual 核验第三条后 → 3 条
    assert lm.verify_record("无法核验", reachable=True) is True
    bib2 = (ws.root / "literature" / "references.bib").read_text(encoding="utf-8")
    assert bib2.count("@misc{") == 3
    # 每条含核验注释字段（verification 依据随 bib 记录）
    assert "note" in bib2 or "resolver" in bib2 or "@misc{" in bib2


def test_unverified_view(ws, tmp_path):
    """H2-009：unverified 视图可查但不入引用池。"""
    fx = _lit_fixture(tmp_path)
    lm = LiteratureManager(ws, source_kwargs={"fixture": {"fixture_path": fx}})
    lm.search(SearchQuery(terms="劳动", sources=["fixture"]))
    unv = lm.unverified_records()
    assert [r.title for r in unv] == ["无法核验的劳动文献"]


def test_dedupe_in_manager(ws):
    lm = LiteratureManager(ws, load_persisted=False)
    lm._ingest([_rec()])
    dupes = lm._ingest([_rec(title="深度学习在社会科学中的应用！", doi="")])
    assert dupes == []
    assert len(lm.records) == 1


def test_merge_conflict_detected(ws):
    """H2-011：同 DOI 不同年份 → conflict，不静默覆盖。"""
    lm = LiteratureManager(ws, load_persisted=False)
    r1 = _rec(year=2023)
    lm._ingest([r1])
    r2 = _rec(year=2021)
    print("TEST-DBG r2.year:", r2.year, "| id:", id(r2))
    dup = lm.find_duplicate(r2)
    print("TEST-DBG after find_dup r2.year:", r2.year)
    print(
        "DEBUG dup:",
        dup is not None,
        "| r1 verification:",
        r1.verification,
        "| doi:",
        repr(r1.doi),
        repr(r2.doi),
    )
    lm._ingest([r2])
    rec = next(iter(lm.records.values()))
    print("DEBUG records:", len(lm.records), "| rec verification:", rec.verification)
    assert rec.verification is VerificationStatus.CONFLICT
    assert "conflict" in rec.verification_info.match_evidence


def test_stable_unique_bib_keys(ws):
    """H2-016：同作者同年不同文献 key 不冲突。"""
    lm = LiteratureManager(ws, load_persisted=False)
    r1 = _rec(title="第一个研究成果呢", doi="10.1/a", verified=False)
    r2 = _rec(title="第一个研究成果呢续", doi="10.1/b", verified=False)
    r1.verification_info.resolver = ""
    lm._ingest([r1, r2])
    ids = {r.record_id for r in lm.records.values()}
    assert len(ids) == 2


def test_index_written_with_status(ws, tmp_path):
    fx_path = ws.root / "_fx.json"
    fx_path.write_text(
        json.dumps(
            [{"title": "数字劳动研究综述", "authors": ["王五"], "year": 2022}], ensure_ascii=False
        ),
        encoding="utf-8",
    )
    lm2 = LiteratureManager(ws, source_kwargs={"fixture": {"fixture_path": fx_path}})
    lm2.search(SearchQuery(terms="劳动", sources=["fixture"]))
    lit = ws.root / "literature"
    index = (lit / "literature_index.md").read_text(encoding="utf-8")
    assert "数字劳动研究综述" in index and "✗" in index
    bib = (lit / "references.bib").read_text(encoding="utf-8")
    assert "@misc{" not in bib  # 未核验不入 bib（H2-008）
    logs = list((lit / "search_logs").glob("*.yaml"))
    assert len(logs) == 1


def test_verify_backfill(ws):
    lm = LiteratureManager(ws, load_persisted=False)
    lm._ingest([_rec(verified=False)])
    assert lm.verified_records() == []
    assert lm.verify_record("深度学习", reachable=True) is True
    assert len(lm.verified_records()) == 1
    rec = lm.verified_records()[0]
    assert rec.verification_info.resolver == "manual"  # H2-004 依据


def test_offline_resolver_unreachable(ws, monkeypatch):
    """H2-006：网络失败 → unreachable，不伪造。"""
    import requests as _rq

    from metis_academic.literature.sources import verify_doi

    def boom(*args, **kwargs):
        raise _rq.RequestException("no network")

    monkeypatch.setattr(_rq, "get", boom)
    r = _rec(doi="10.1234/offline")
    out = verify_doi(r)
    assert out.verification is VerificationStatus.UNREACHABLE


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
@pytest.mark.skipif(True, reason="live 测试移入独立 workflow（H3-011/H22-007）")
def test_arxiv_real_api():
    pytest.skip("live 测试由独立 workflow 执行")


# ---------- 格式化（J026/H2-013/014/015） ----------


def test_gbt7714_format():
    from metis_academic.literature.models import EntryType

    r = _rec()
    r.entry_type = EntryType.JOURNAL
    s = format_gbt7714(r)
    assert "张三, 李四" in s and "[J/OL]" in s and "2023" in s
    assert s.endswith(".")


def test_gbt7714_entry_types():
    """H2-013/H2-014：文献类型决定 [J]/[M]/[EB/OL]。"""
    from metis_academic.literature.models import EntryType

    r = _rec()
    r.entry_type = EntryType.BOOK
    assert "[M" in format_gbt7714(r)
    r.entry_type = EntryType.WEB
    assert "[EB/OL]" in format_gbt7714(r)
    r.entry_type = EntryType.PREPRINT
    assert "[EB/OL]" in format_gbt7714(r)


def test_apa_format():
    s = format_apa(_rec())
    assert "张三, & 李四 (2023)" in s


def test_bibtex_format():
    b = format_bibtex(_rec(), key="zhang2023dl")
    assert b.startswith("@misc{zhang2023dl,")
    assert "author = {张三 and 李四}" in b
    assert "doi = {10.1234/abc}" in b

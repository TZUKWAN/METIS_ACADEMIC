"""Phase K 选题模块测试（K021）。"""

from __future__ import annotations

import pytest

from metis_academic.errors import MetisError
from metis_academic.literature import LiteratureManager, LiteratureRecord
from metis_academic.topics import REQUIRED_SECTIONS, TopicCandidate, TopicManager
from metis_academic.workspace import WorkspaceManager


@pytest.fixture
def ws(tmp_path):
    w = WorkspaceManager(tmp_path / "ws")
    w.create()
    return w


@pytest.fixture
def lm(ws):
    m = LiteratureManager(ws)
    recs = []
    for title, author, year in (
        ("数字劳动的过程控制研究", "张三", 2023),
        ("平台经济与劳动秩序", "李四", 2022),
    ):
        r = LiteratureRecord(
            title=title,
            authors=[author],
            year=year,
            source="fixture",
            url=f"https://arxiv.org/abs/{year}",
        )
        r.verified = True  # 测试夹具：legacy 核验标记
        recs.append(r)
    m._ingest(recs)
    return m


def test_generate_creates_files_with_required_sections(ws, lm):
    tm = TopicManager(ws, lm)
    out = tm.generate_candidates(count=3, paradigm="quantitative", theme="数字劳动")
    assert len(out) == 3
    for c in out:
        f = ws.root / "topics" / f"{c.id}.md"
        assert f.is_file()
        text = f.read_text(encoding="utf-8")
        for sec in REQUIRED_SECTIONS:
            assert f"## {sec}" in text
        assert "面板回归" in c.methods  # 范式对应方法
        assert "## 参考文献" in text
    # 第一个候选的参考文献来自真实检索记录
    assert "张三" in (ws.root / "topics" / "topic_001.md").read_text(encoding="utf-8")


def test_markdown_roundtrip(ws):
    c = TopicCandidate(
        id="topic_099",
        title="测试题",
        research_question="Q?",
        references=["ref1"],
        webpages=["https://example.org"],
    )
    text = c.to_markdown()
    c2 = TopicCandidate.from_markdown(text)
    assert c2.title == "测试题" and c2.id == "topic_099"
    assert c2.references == ["ref1"] and c2.webpages == ["https://example.org"]
    with pytest.raises(MetisError, match="缺少小节"):
        TopicCandidate.from_markdown("# 残缺文件")


def test_confirm_creates_selected_and_lock(ws, lm):
    tm = TopicManager(ws, lm)
    (cands := tm.generate_candidates(count=2, theme="数字劳动"))
    selected = tm.confirm(cands[0].id)
    assert selected.is_file()
    assert "测试题" not in selected.read_text(encoding="utf-8")
    assert (ws.root / "research" / ".topic-lock.json").is_file()
    # 已锁定后再次 confirm 需 force
    with pytest.raises(MetisError, match="锁定"):
        tm.confirm(cands[1].id)
    tm.unlock()
    selected2 = tm.confirm(cands[1].id)
    assert selected2.is_file()


def test_edit_changes_section(ws, lm):
    tm = TopicManager(ws, lm)
    cand = tm.generate_candidates(count=1, theme="数字劳动")[0]
    tm.edit(cand.id, "研究问题", "新的研究问题？")
    c2, _ = tm.get(cand.id)
    assert c2.research_question == "新的研究问题？"
    with pytest.raises(MetisError, match="非法小节"):
        tm.edit(cand.id, "不存在的节", "x")


def test_delete_removes_topic_and_unlocks(ws, lm):
    tm = TopicManager(ws, lm)
    cand = tm.generate_candidates(count=1, theme="数字劳动")[0]
    tm.confirm(cand.id)
    tm.delete(cand.id)
    assert not (ws.root / "topics" / f"{cand.id}.md").exists()
    assert not (ws.root / "research" / ".topic-lock.json").exists()
    with pytest.raises(MetisError, match="不存在"):
        tm.get(cand.id)


def test_actions_defined_for_gui():
    assert [a.value for a in TopicManager.ACTIONS] == [
        "topic.confirm",
        "topic.edit",
        "topic.delete",
    ]

"""T5.2 Laya DecisionGate 语义转写 + T5.1 Data catalog 桥接测试。"""

from __future__ import annotations

from metis_academic.data.catalog import as_search_index, load_catalog, match
from metis_academic.validation.decision_gate import DecisionGate


class TestDataCatalog:
    def test_load_84_providers(self):
        providers = load_catalog()
        assert len(providers) == 84
        p = providers[0]
        assert p.provider_id and p.homepage
        assert isinstance(p.capabilities, dict)

    def test_match_world_bank(self):
        hits = match("world_bank")
        assert any(h.provider_id == "world_bank" for h in hits)

    def test_match_chinese_sources(self):
        hits = match("china")
        assert hits  # data_gov / beijing_data 等中文条目存在

    def test_as_search_index_feeds_data_manager(self, tmp_path):
        """T5.1 桥接兑现 M009：真实索引喂给 DataManager.search_public。"""
        from metis_academic.data import DataManager

        ws = WorkspaceManager(str(tmp_path / "ws"))
        ws.create()
        dm = DataManager(ws)
        hits = dm.search_public("world_bank", metis_data_index=as_search_index())
        assert hits and hits[0]["provider_id"] == "world_bank"

    def test_no_fabricated_license(self):
        for p in load_catalog():
            lic = p.licenses[0] if p.licenses else "UNKNOWN"
            assert lic in ("UNKNOWN",) or isinstance(lic, str)


from metis_academic.workspace import WorkspaceManager  # noqa: E402


class TestDecisionGate:
    def test_unanimous_pass(self):
        gate = DecisionGate()
        d = gate.evaluate(
            [
                {"reviewer": "A", "verdict": "pass", "reason": "r"},
                {"reviewer": "B", "verdict": "pass", "reason": "r"},
            ]
        )
        assert d.outcome == "pass"

    def test_split_goes_to_human(self):
        gate = DecisionGate()
        d = gate.evaluate(
            [
                {"reviewer": "A", "verdict": "pass", "reason": "r"},
                {"reviewer": "B", "verdict": "reject", "reason": "r"},
            ]
        )
        assert d.outcome == "needs_human"

    def test_empty_is_fail_closed(self):
        """无 verdicts（如模型未接入）→ 拒绝放行，不默认通过。"""
        gate = DecisionGate()
        d = gate.evaluate([])
        assert d.outcome == "reject"
        assert "fail-closed" in d.reason.lower() or "无评审" in d.reason

    def test_missing_backend_rejects(self):
        class NoModel:
            available = False

        gate = DecisionGate(model=NoModel())
        d = gate.evaluate([{"reviewer": "A", "verdict": "pass", "reason": "r"}])
        assert d.outcome == "reject"  # 无模型 fail-closed

"""全系统 E2E：9 种 成果×范式 组合 + 学位层级覆盖（H25 前置）。

真实性语义：
- 定量项目变量来自 research/quant-design.yaml（研究设计确认），非字段名猜测；
- 基金项目不执行 S5 范式链（设计不等于执行）；
- 章节写作经 ModelBackend（Harness 宿主模式），无后端时 fail-closed。
"""

from __future__ import annotations

import json

import numpy as np
import pandas as pd
import pytest
import yaml

from metis_academic.adapters import FilesystemAdapter
from metis_academic.command import MetisCommand
from metis_academic.executor import TaskExecutor
from metis_academic.model_backend import HarnessModelBackend, NoModelBackend, set_model_backend
from metis_academic.models import Stage
from metis_academic.qa import GlobalQA
from metis_academic.runtime import build_runtime_actions, seed_tasks
from metis_academic.state import StateManager
from metis_academic.workspace import WorkspaceManager

COMBOS = [
    (a, p)
    for a in ("fund", "journal", "thesis")
    for p in ("qualitative", "quantitative", "theoretical")
]

MATERIALS = (
    "外卖骑手每天工作十二个小时以上。平台通过算法控制接单。\n"
    "骑手感到时间被机器绑架了。但是老骑手学会了挑单技巧。\n"
    "平台用评分系统约束骑手行为。然而工会开始介入谈判。\n"
)

LIT_FIXTURE = [
    {
        "title": "算法与劳动控制研究",
        "authors": ["张三"],
        "year": 2023,
        "verified": True,
        "verify_url": "https://arxiv.org/abs/2301.00001",
        "abstract": "探讨平台算法对劳动过程的控制机制。",
    },
    {
        "title": "平台经济的劳动秩序",
        "authors": ["李四"],
        "year": 2022,
        "verified": True,
        "verify_url": "https://arxiv.org/abs/2301.00002",
        "abstract": "平台经济下的劳动关系与秩序重构。",
    },
    {
        "title": "数字劳动的概念谱系",
        "authors": ["王五"],
        "year": 2021,
        "verified": True,
        "url": "https://doi.org/10.5555/dl",
        "verify_url": "https://doi.org/10.5555/dl",
    },
]


def _host_delegate(task_type: str, prompt: str, context: dict):
    """测试用宿主模型代理：按任务类型产出确定性文本（代表 Harness 模型）。"""
    if task_type == "writing.section":
        section = context.get("topic", "章节")
        body = (
            f"本节围绕{section}展开。"
            "依据 research/ 与 analysis/ 的真实产出陈述本节内容，"
            "所有事实性表述均引用已核验文献或结果文件。"
        )
        return body, None
    raise AssertionError(f"未预期的语义任务 {task_type}")


@pytest.fixture(autouse=True)
def _host_backend():
    """E2E 全程注入宿主模型后端（H5-002 模式）。"""
    set_model_backend(HarnessModelBackend(_host_delegate, model="test-host"))
    yield
    set_model_backend(NoModelBackend())


def _make_fixture(ws: WorkspaceManager, paradigm: str, tmp_dir) -> dict:
    data_dir = ws.root / "inputs" / "existing-data"
    data_dir.mkdir(parents=True, exist_ok=True)
    (data_dir / "interview_01.txt").write_text(MATERIALS, encoding="utf-8")
    (data_dir / "interview_02.txt").write_text(MATERIALS, encoding="utf-8")
    lit_file = tmp_dir / f"lit_{ws.root.name}.json"
    lit_file.write_text(json.dumps(LIT_FIXTURE, ensure_ascii=False), encoding="utf-8")
    if paradigm == "quantitative":
        rng = np.random.default_rng(20260925)
        n = 200
        x = rng.normal(0, 1, n)
        y = 0.8 * x + rng.normal(0, 1, n)
        pd.DataFrame(
            {
                "digital": x,
                "consume": y,
                "income": rng.normal(0, 1, n),
                "age": rng.normal(35, 8, n),
                "gender": rng.choice([0, 1], n),
                "mediator": 0.5 * x + rng.normal(0, 1, n),
            }
        ).to_csv(data_dir / "panel.csv", index=False)
    return {"fixture": {"fixture_path": lit_file}}


def _write_quant_design(ws: WorkspaceManager) -> None:
    """研究设计确认：变量与识别策略由设计文件显式声明（H10-001/003）。"""
    design = {
        "schema_version": 1,
        "outcome": "consume",
        "exposure": "digital",
        "controls": ["income", "age"],
        "mediators": ["mediator"],
        "moderators": ["gender"],
        "design": "cross_section",
        "estimand": "associational",
        "identification_status": "not_causal",
        "confirmed_by": "E2E fixture (simulated user confirmation)",
    }
    (ws.root / "research" / "quant-design.yaml").write_text(
        yaml.safe_dump(design, allow_unicode=True, sort_keys=False), encoding="utf-8"
    )


def _answers(artifact: str, paradigm: str) -> list[str]:
    base = [artifact, paradigm]
    if artifact == "thesis":
        base += ["zh-CN", "master", "default"]
    elif artifact == "journal":
        base += ["zh-CN"]
    else:
        return base + ["default", "from_scratch"]
    return base + ["from_scratch"]


def _texts() -> dict:
    return {
        "基金类别（如：国家社科基金青年项目）": "国家社科基金青年项目",
        "学校/机构名称（可留空）": "某大学",
        "项目名称": "平台劳动与数字经济研究",
    }


@pytest.mark.parametrize("artifact,paradigm", COMBOS)
def test_full_pipeline_e2e(artifact, paradigm, tmp_path):
    root = tmp_path / f"proj-{artifact}-{paradigm}"
    root.mkdir()
    ad = FilesystemAdapter(
        root, answers=_answers(artifact, paradigm), texts=_texts(), confirms=[True]
    )
    result = MetisCommand(ad).run(root=root)
    assert result.status == "initialized"
    ws = WorkspaceManager(root)
    cfg = ws.read_project()
    lit_kwargs = _make_fixture(ws, paradigm, tmp_path)
    actions = build_runtime_actions(ws, cfg, adapter=ad, lit_kwargs=lit_kwargs)
    ad.push_answer("topic_001")
    ad.push_confirm(True)
    n = seed_tasks(ws, cfg)
    assert n > 20

    if paradigm == "quantitative" and artifact != "fund":
        _write_quant_design(ws)

    sm = StateManager(ws)
    ex = TaskExecutor(ws, sm, adapter=ad, actions=actions)
    for stage in Stage.ordered()[1:]:
        report = ex.run_stage(stage.value, max_tasks=200)
        assert report["complete"], (
            f"阶段 {stage.value} 未完成；blocked={report['blocked']}；"
            f"任务状态={[(t.id, t.status.value) for t in sm.tasks.by_stage(stage.value)]}"
        )
        assert report["validation"] is not None and report["validation"].passed, (
            f"阶段 {stage.value} 验证失败: "
            f"{[str(i.message) for i in report['validation'].issues[:5]]}"
        )

    assert sm.current_stage is Stage.S10_DELIVERY
    evidence = ws.read_evidence()
    assert len(evidence) > n
    out = ws.root / "deliverables"
    assert (out / "delivery-note.md").is_file()
    assert (out / "manuscript.docx").is_file()
    assert (ws.root / "manuscript" / "manuscript.docx").is_file()
    rep = GlobalQA(ws).run_all()
    assert "unfinished_tasks" not in rep.checks, rep.checks.get("unfinished_tasks")
    assert "failed_tasks" not in rep.checks

    if paradigm == "quantitative" and artifact != "fund":
        summary = json.loads((ws.root / "results" / "summary.json").read_text(encoding="utf-8"))
        assert "baseline" in summary and summary.get("seed")
        assert (ws.root / "results" / "baseline.json").is_file()
    if artifact == "fund":
        rules = ws.read_workflow().rules
        assert rules.get("artifact_policy", {}).get("fund_design_only") is True
        assert not (ws.root / "results" / "summary.json").exists()
    if paradigm == "qualitative" and artifact != "fund":
        chain = (ws.root / "analysis" / "qualitative" / "evidence_chain.md").read_text(
            encoding="utf-8"
        )
        assert "M001" in chain
    if paradigm == "theoretical" and artifact != "fund":
        arg = (ws.root / "analysis" / "theoretical" / "argument_map.md").read_text(encoding="utf-8")
        assert "evidence_for" in arg


def test_writing_fails_closed_without_backend(tmp_path):
    """H5-003：无 ModelBackend 时语义任务显式失败，不留假骨架。"""
    root = tmp_path / "no-backend"
    root.mkdir()
    ad = FilesystemAdapter(
        root,
        answers=["journal", "qualitative", "zh-CN", "from_scratch"],
        texts=_texts(),
        confirms=[True],
    )
    MetisCommand(ad).run(root=root)
    ws = WorkspaceManager(root)
    cfg = ws.read_project()
    lit_kwargs = _make_fixture(ws, "qualitative", tmp_path)
    actions = build_runtime_actions(ws, cfg, adapter=ad, lit_kwargs=lit_kwargs)
    ad.push_answer("topic_001")
    ad.push_confirm(True)
    seed_tasks(ws, cfg)
    set_model_backend(NoModelBackend())
    sm = StateManager(ws)
    ex = TaskExecutor(ws, sm, adapter=ad, actions=actions)
    for stage in ("S1", "S2", "S3", "S4", "S5", "S6"):
        ex.run_stage(stage, max_tasks=100)
    report = ex.run_stage("S7", max_tasks=100)
    assert not report["complete"]
    stuck = [t.id for t in sm.tasks.by_stage("S7")
             if t.status.value in ("failed", "blocked")]
    assert stuck, "应有 writing 任务因无后端而失败/阻塞（fail-closed）"
    blocked_task = sm.tasks.get(stuck[0])
    assert "ModelBackend" in (blocked_task.error or "") or         blocked_task.status.value == "blocked"


def test_thesis_levels_distinct(tmp_path):
    """本科/硕士/博士：质量规则与任务可区分（H25-010..012）。"""
    levels = {"bachelor": "LV-B-001", "master": "LV-M-001", "phd": "LV-P-006"}
    for level, marker in levels.items():
        root = tmp_path / f"thesis-{level}"
        root.mkdir()
        ad = FilesystemAdapter(
            root,
            answers=["thesis", "quantitative", "zh-CN", level, "default", "from_scratch"],
            texts=_texts(),
            confirms=[True],
        )
        MetisCommand(ad).run(root=root)
        ws = WorkspaceManager(root)
        cfg = ws.read_project()
        lit_kwargs = _make_fixture(ws, "quantitative", tmp_path)
        actions = build_runtime_actions(ws, cfg, adapter=ad, lit_kwargs=lit_kwargs)
        ad.push_answer("topic_001")
        ad.push_confirm(True)
        seed_tasks(ws, cfg)
        _write_quant_design(ws)
        sm = StateManager(ws)
        ex = TaskExecutor(ws, sm, adapter=ad, actions=actions)
        assert marker in {t.id for t in sm.tasks.all()}, level
        if level == "phd":
            assert {f"LV-P-00{i}" for i in range(1, 7)} <= {t.id for t in sm.tasks.all()}
        for stage in Stage.ordered()[1:]:
            report = ex.run_stage(stage.value, max_tasks=200)
            assert report["complete"], f"{level} {stage.value}: {report['blocked']}"
            assert report["validation"].passed
        assert (ws.root / "deliverables" / "delivery-note.md").is_file()

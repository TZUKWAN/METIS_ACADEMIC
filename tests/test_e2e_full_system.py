"""全系统 E2E：9 种 成果×范式 组合 + 学位层级覆盖（§30）。

每个 E2E 走完整链：/metis 初始化 → S1 审计 → S2 文献(fixture) →
S3 选题确认 → S4 研究设计 → S5 引擎执行 → S6 验证 → S7 成文 →
S8 Word → S9 全局 QA → S10 交付。全部经 TaskExecutor+状态机驱动。
"""

from __future__ import annotations

import numpy as np
import pandas as pd
import pytest

from metis_academic.adapters import FilesystemAdapter
from metis_academic.command import MetisCommand
from metis_academic.executor import TaskExecutor
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


def _make_fixture(ws: WorkspaceManager, paradigm: str, tmp_dir) -> dict:
    """为单个 E2E 项目准备夹具材料。"""
    data_dir = ws.root / "inputs" / "existing-data"
    data_dir.mkdir(parents=True, exist_ok=True)
    (data_dir / "interview_01.txt").write_text(MATERIALS, encoding="utf-8")
    (data_dir / "interview_02.txt").write_text(MATERIALS, encoding="utf-8")
    lit_file = tmp_dir / f"lit_{ws.root.name}.json"
    lit_file.write_text(__import__("json").dumps(LIT_FIXTURE, ensure_ascii=False), encoding="utf-8")
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


def _answers(artifact: str, paradigm: str) -> list[str]:
    base = [artifact, paradigm]
    if artifact == "thesis":
        base += ["zh-CN", "master", "default"]
    elif artifact == "journal":
        base += ["zh-CN"]
    else:  # fund
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
    # 预置选题确认答案（S3 的 topic.confirm 用户交互）
    ad.push_answer("topic_001")
    ad.push_confirm(True)
    n = seed_tasks(ws, cfg)
    assert n > 30  # 工作流规则确实生成了任务树

    sm = StateManager(ws)
    ex = TaskExecutor(ws, sm, adapter=ad, actions=actions)
    # S1 → S10 逐阶段执行（run_stage 内部完成验证与阶段迁移）
    for stage in Stage.ordered()[1:]:
        report = ex.run_stage(stage.value, max_tasks=200)
        assert report["complete"], (
            f"阶段 {stage.value} 未完成；blocked={report['blocked']}；"
            f"任务状态={[(t.id, t.status.value) for t in sm.tasks.by_stage(stage.value)]}"
        )
        assert report["validation"] is not None and report["validation"].passed, (
            f"阶段 {stage.value} 验证失败: {[str(i.message) for i in report['validation'].issues[:5]]}"
        )

    # 全局状态
    assert sm.current_stage is Stage.S10_DELIVERY
    # 证据可追溯
    evidence = ws.read_evidence()
    assert len(evidence) > n  # 每个任务至少一条证据
    # 交付物
    out = ws.root / "deliverables"
    assert (out / "delivery-note.md").is_file()
    assert (out / "manuscript.docx").is_file()
    assert (ws.root / "manuscript" / "manuscript.docx").is_file()
    # 全局 QA 最终可执行
    rep = GlobalQA(ws).run_all()
    # 未完成/失败/阻塞任务必须为零
    assert "unfinished_tasks" not in rep.checks, rep.checks.get("unfinished_tasks")
    assert "failed_tasks" not in rep.checks
    # quant 项目必有可复现结果
    if paradigm == "quantitative":
        assert (ws.root / "results" / "summary.json").is_file()
        assert (ws.root / "code" / "run_all.py").is_file() or (
            ws.root / "code" / "requirements-frozen.txt"
        ).is_file()
    # qualitative 项目必有证据链
    if paradigm == "qualitative":
        assert (ws.root / "analysis" / "qualitative" / "evidence_chain.md").is_file()
        assert (ws.root / "analysis" / "qualitative" / "themes.md").is_file()
    # theoretical 项目必有 argument map
    if paradigm == "theoretical":
        assert (ws.root / "analysis" / "theoretical" / "argument_map.md").is_file()


def test_thesis_levels_distinct(tmp_path):
    """本科/硕士/博士：质量规则与任务可区分。"""
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
        sm = StateManager(ws)
        ex = TaskExecutor(ws, sm, adapter=ad, actions=actions)
        assert marker in {t.id for t in sm.tasks.all()}, level  # 层级任务注入
        if level == "phd":
            assert {f"LV-P-00{i}" for i in range(1, 7)} <= {t.id for t in sm.tasks.all()}
        for stage in Stage.ordered()[1:]:
            report = ex.run_stage(stage.value, max_tasks=200)
            assert report["complete"], f"{level} {stage.value}: {report['blocked']}"
            assert report["validation"].passed
        assert (ws.root / "deliverables" / "delivery-note.md").is_file()

"""METIS ACADEMIC 最小示例：定量实证期刊论文闭环（无网络）。"""

from __future__ import annotations

import json
import tempfile
from pathlib import Path

import numpy as np
import pandas as pd

from metis_academic.adapters import FilesystemAdapter
from metis_academic.command import MetisCommand
from metis_academic.executor import TaskExecutor
from metis_academic.runtime import build_runtime_actions, seed_tasks
from metis_academic.state import StateManager
from metis_academic.workspace import WorkspaceManager


def main() -> None:
    tmp = Path(tempfile.mkdtemp(prefix="metis-demo-"))
    root = tmp / "demo项目"
    root.mkdir()

    # 1) /metis 初始化（向导答案：期刊论文 / 定量实证 / 中文 / 从零开始）
    ad = FilesystemAdapter(
        root,
        answers=["journal", "quantitative", "zh-CN", "from_scratch"],
        texts={"项目名称": "数字经济与居民消费"},
        confirms=[True],
    )
    MetisCommand(ad).run(root=root)
    ws = WorkspaceManager(root)
    print("初始化完成:", ws.summary().splitlines()[0])

    # 2) 提供数据（模拟用户放入 inputs/existing-data）
    rng = np.random.default_rng(20260925)
    n = 150
    x = rng.normal(0, 1, n)
    df = pd.DataFrame(
        {
            "digital": x,
            "consume": 0.8 * x + rng.normal(0, 1, n),
            "income": rng.normal(0, 1, n),
            "age": rng.normal(35, 8, n),
            "gender": rng.choice([0, 1], n),
            "mediator": 0.5 * x + rng.normal(0, 1, n),
        }
    )
    (ws.root / "inputs" / "existing-data").mkdir(parents=True, exist_ok=True)
    df.to_csv(ws.root / "inputs" / "existing-data" / "panel.csv", index=False)

    # 3) 组装运行时并执行 S1→S5
    cfg = ws.read_project()
    actions = build_runtime_actions(ws, cfg, adapter=ad)
    ad.push_answer("topic_001")
    ad.push_confirm(True)
    seed_tasks(ws, cfg)
    sm = StateManager(ws)
    ex = TaskExecutor(ws, sm, adapter=ad, actions=actions)
    for stage in ("S1", "S2", "S3", "S4", "S5"):
        report = ex.run_stage(stage, max_tasks=100)
        print(f"{stage}: complete={report['complete']}")

    # 4) 展示真实结果
    summary = json.loads((ws.root / "results" / "summary.json").read_text(encoding="utf-8"))
    print("基准模型 R² =", round(summary["baseline"]["r2"], 4))
    print("核心系数(digital) =", round(summary["baseline"]["coef"]["digital"], 4))
    print("工作区:", ws.root)


if __name__ == "__main__":
    main()

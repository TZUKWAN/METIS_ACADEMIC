"""引擎 CLI（ENGINE_CONTRACT v1 的实现面）。

子命令：init / status / plan / advance（Phase 1）；tasks / exec（Phase 2）；
artifacts / deliver / verify（Phase 3-4 前补齐）。
通用约定见 docs/plugin-migration/ENGINE_CONTRACT.md：退出码 0/1/2；--json 机器可读。
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from .command.metis_command import new_project_id
from .composer import WorkflowComposer
from .errors import MetisError
from .mcp.defaults import mcp_registry_yaml
from .models import (
    ArtifactType,
    FundConfig,
    Language,
    ProjectConfig,
    ProjectStatus,
    ResearchParadigm,
    Stage,
    StartMode,
    ThesisConfig,
    ThesisLevel,
    WorkspaceRef,
)
from .skills.defaults import skill_registry_yaml
from .state import StateManager
from .workspace import WorkspaceManager

EXIT_OK = 0
EXIT_FAIL = 1
EXIT_USAGE = 2

_ARTIFACTS = {"fund", "journal", "thesis"}
_PARADIGMS = {"qualitative", "quantitative", "theoretical"}
_LANGS = {"zh-CN", "en-US"}
_LEVELS = {"bachelor", "master", "phd"}
_STARTS = {"from_scratch", "has_topic", "has_data", "has_draft", "mixed"}


def _workspace(args) -> WorkspaceManager:
    return WorkspaceManager(Path(args.workspace).resolve())


def _fail(msg: str) -> int:
    print(f"[METIS] {msg}", file=sys.stderr)
    return EXIT_FAIL


def _load_project(ws: WorkspaceManager) -> ProjectConfig:
    return ws.read_project()


def _stage_task_counts(sm: StateManager, stage: str) -> dict:
    counts = {
        "total": 0,
        "COMPLETE": 0,
        "READY": 0,
        "TODO": 0,
        "BLOCKED": 0,
        "FAILED": 0,
        "RUNNING": 0,
    }
    for t in sm.tasks.by_stage(stage):
        counts["total"] += 1
        counts[t.status.value.upper()] = counts.get(t.status.value.upper(), 0) + 1
    return counts


def _seven_stage_note(stage: str) -> str:
    """S 引擎阶段 → 用户七阶段口径（T4.1 的初步映射，STAGE_MAP 定稿后细化）。"""
    m = {
        "S1": "①文献准备",
        "S2": "①文献准备",
        "S3": "②研究设计",
        "S4": "②研究设计",
        "S5": "③数据/材料→④分析执行",
        "S6": "⑤阶段验证",
        "S7": "⑥成文与格式",
        "S8": "⑥成文与格式",
        "S9": "⑥成文与格式",
        "S10": "⑦交付",
    }
    return m.get(stage, stage)


# ---------------- init ----------------


def cmd_init(args) -> int:
    ws = _workspace(args)
    if ws.exists() and not args.force:
        return _fail(f"项目已存在（{ws.root}）。恢复用 status/advance；重建加 --force。")
    if args.artifact == "thesis" and not args.level:
        return _fail("毕业论文必须指定 --level bachelor|master|phd")
    cfg = ProjectConfig(
        project_id=new_project_id(),
        project_name=args.name,
        artifact_type=ArtifactType(args.artifact),
        research_paradigm=ResearchParadigm(args.paradigm),
        language=Language(args.lang),
        fund=FundConfig(
            category=(args.fund_category or "一般项目") if args.artifact == "fund" else None
        ),
        thesis=ThesisConfig(
            degree_level=ThesisLevel(args.level) if args.artifact == "thesis" else None
        ),
        start_mode=StartMode(args.start),
        workspace=WorkspaceRef(),
        status=ProjectStatus(current_stage="S0", current_task="", initialized=False),
    )
    if args.artifact == "thesis" and cfg.thesis.degree_level is None:
        return _fail("毕业论文必须指定 --level bachelor|master|phd")
    try:
        cfg.validate()
    except ValueError as e:
        return _fail(f"配置不完整: {e}")

    ws.create(cfg)
    composer = WorkflowComposer()
    wf = composer.compose(cfg)
    ws.write_workflow(wf)
    # 工作流装配 → 任务树播种（/metis init 语义的一部分； 否则阶段无任务可执行）
    from .runtime import seed_tasks

    n_seeded = seed_tasks(ws, cfg)
    ws.safe_write(ws.metis_file("skill-registry.yaml"), skill_registry_yaml(), overwrite=True)
    ws.safe_write(ws.metis_file("mcp-registry.yaml"), mcp_registry_yaml(), overwrite=True)
    sm = StateManager(ws)
    sm.transition(Stage.S1_WORKSPACE_AUDIT, note="项目初始化完成（CLI）")
    cfg.status.current_stage = Stage.S1_WORKSPACE_AUDIT.value
    cfg.status.initialized = True
    ws.write_project(cfg)

    payload = {
        "project_id": cfg.project_id,
        "stage": "S1",
        "seven_stage": _seven_stage_note("S1"),
        "composed_from": wf.composed_from,
        "task_rules": len(wf.task_rules),
        "tasks_seeded": n_seeded,
        "workspace": str(ws.root),
    }
    if args.json:
        print(json.dumps(payload, ensure_ascii=False))
    else:
        print("项目已初始化。")
        print(f"  项目: {cfg.project_id}「{cfg.project_name}」")
        print(
            f"  工作流: {len(wf.stages)} 阶段 / {len(wf.task_rules)} 任务规则"
            f"（组合自 {', '.join(wf.composed_from)}；已播种 {n_seeded} 任务）"
        )
        print("  当前进入: S1（" + _seven_stage_note("S1") + "）")
    return EXIT_OK


# ---------------- status ----------------


def cmd_status(args) -> int:
    ws = _workspace(args)
    if not ws.exists():
        return _fail(f"不是 METIS 项目（{ws.root} 无 .metis/project.yaml）。先运行 init。")
    cfg = _load_project(ws)
    sm = StateManager(ws)
    sm.resume()  # 顺带处理中断残留（与 /metis-resume 语义一致）
    stage = sm.current_stage.value
    counts = _stage_task_counts(sm, stage)
    evidence_n = len(ws.read_evidence())
    payload = {
        "project_id": cfg.project_id,
        "project_name": cfg.project_name,
        "stage": stage,
        "seven_stage": _seven_stage_note(stage),
        "initialized": cfg.status.initialized,
        "tasks": counts,
        "evidence_count": evidence_n,
        "workspace": str(ws.root),
    }
    if args.json:
        print(json.dumps(payload, ensure_ascii=False))
    else:
        print(f"项目 {cfg.project_id}「{cfg.project_name}」")
        print(f"  阶段: {stage}（{_seven_stage_note(stage)}）  初始化: {cfg.status.initialized}")
        print(f"  本阶段任务: {counts}")
        print(f"  证据条数: {evidence_n}")
    return EXIT_OK


# ---------------- plan ----------------


def cmd_plan(args) -> int:
    ws = _workspace(args)
    if not ws.exists():
        return _fail("不是 METIS 项目。先运行 init。")
    cfg = _load_project(ws)
    if args.artifact:
        cfg.artifact_type = ArtifactType(args.artifact)
    if args.paradigm:
        cfg.research_paradigm = ResearchParadigm(args.paradigm)
    if args.lang:
        cfg.language = Language(args.lang)
    if args.level and cfg.artifact_type is ArtifactType.THESIS:
        from .models import ThesisLevel

        cfg.thesis.degree_level = ThesisLevel(args.level)
    try:
        wf = WorkflowComposer().compose(cfg)
    except (ValueError, MetisError) as e:
        return _fail(f"装配失败: {e}")
    ws.write_workflow(wf)
    if args.json:
        print(
            json.dumps(
                {
                    "composed_from": wf.composed_from,
                    "task_rules": len(wf.task_rules),
                    "stages": [s.id for s in wf.stages],
                },
                ensure_ascii=False,
            )
        )
    else:
        print(f"工作流已装配：{len(wf.stages)} 阶段 / {len(wf.task_rules)} 任务规则")
        print(f"  组合自: {', '.join(wf.composed_from)}")
    return EXIT_OK


# ---------------- advance ----------------


def cmd_advance(args) -> int:
    ws = _workspace(args)
    if not ws.exists():
        return _fail("不是 METIS 项目。先运行 init。")
    sm = StateManager(ws)
    cur = sm.current_stage
    result = StateManager(ws) and _validate_stage(ws, cur.value)
    if result is not None and not result.passed:
        msgs = [f"[{i.rule_id}] {i.message}" for i in result.issues[:6]]
        return _fail("阶段校验未通过，禁止推进：" + "；".join(msgs))
    if sm.tasks.pending_count(cur.value) > 0:
        return _fail(f"阶段 {cur.value} 仍有未完成任务，禁止推进。")
    order = Stage.ordered()
    idx = order.index(cur)
    if idx + 1 >= len(order):
        print(
            json.dumps({"stage": cur.value, "next": None, "note": "已是最后阶段"})
            if args.json
            else "已是最后阶段 S10。"
        )
        return EXIT_OK
    nxt = order[idx + 1]
    sm.transition(nxt, note="advance")
    payload = {"stage": cur.value, "next": nxt.value, "seven_stage": _seven_stage_note(nxt.value)}
    if args.json:
        print(json.dumps(payload, ensure_ascii=False))
    else:
        print(f"{cur.value} → {nxt.value}（{_seven_stage_note(nxt.value)}）")
    return EXIT_OK


def _validate_stage(ws: WorkspaceManager, stage: str):
    from .validation import ValidationEngine

    return ValidationEngine(ws).validate_stage(stage)


# ---------------- parser ----------------


def build_parser() -> argparse.ArgumentParser:
    ap = argparse.ArgumentParser(prog="metis", description="METIS ACADEMIC 引擎 CLI")
    ap.add_argument("--version", action="store_true", help="显示版本")
    sub = ap.add_subparsers(dest="command")

    p_init = sub.add_parser("init", help="初始化研究项目（非交互）")
    p_init.add_argument("--workspace", default=".")
    p_init.add_argument("--name", required=True)
    p_init.add_argument("--artifact", required=True, choices=sorted(_ARTIFACTS))
    p_init.add_argument("--paradigm", required=True, choices=sorted(_PARADIGMS))
    p_init.add_argument("--lang", default="zh-CN", choices=sorted(_LANGS))
    p_init.add_argument("--level", choices=sorted(_LEVELS))
    p_init.add_argument("--start", default="from_scratch", choices=sorted(_STARTS))
    p_init.add_argument("--fund-category", default=None)
    p_init.add_argument("--non-interactive", action="store_true")
    p_init.add_argument("--force", action="store_true")
    p_init.add_argument("--json", action="store_true")
    p_init.set_defaults(fn=cmd_init)

    p_status = sub.add_parser("status", help="项目状态（机器可读）")
    p_status.add_argument("--workspace", default=".")
    p_status.add_argument("--json", action="store_true")
    p_status.set_defaults(fn=cmd_status)

    p_plan = sub.add_parser("plan", help="装配工作流（幂等）")
    p_plan.add_argument("--workspace", default=".")
    p_plan.add_argument("--artifact", choices=sorted(_ARTIFACTS))
    p_plan.add_argument("--paradigm", choices=sorted(_PARADIGMS))
    p_plan.add_argument("--lang", choices=sorted(_LANGS))
    p_plan.add_argument("--level", choices=sorted(_LEVELS))
    p_plan.add_argument("--json", action="store_true")
    p_plan.set_defaults(fn=cmd_plan)

    p_adv = sub.add_parser("advance", help="校验并推进当前阶段")
    p_adv.add_argument("--workspace", default=".")
    p_adv.add_argument("--json", action="store_true")
    p_adv.set_defaults(fn=cmd_advance)
    return ap


def run_engine_cli(argv: list[str]) -> int:
    ap = build_parser()
    args = ap.parse_args(argv)
    if getattr(args, "fn", None) is None:
        return EXIT_USAGE
    try:
        return args.fn(args)
    except MetisError as e:
        return _fail(str(e))
    except (ValueError, FileNotFoundError) as e:
        return _fail(str(e))

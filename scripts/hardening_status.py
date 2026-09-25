#!/usr/bin/env python3
"""HARDENING_STATUS.md 生成器（H0-001/H0-007）。

- 从任务文档提取全部 H*-*** 任务 ID 建状态表（无遗漏无重复）。
- --check 模式：passed 但无 evidence 的任务 → 退出码非 0（禁止无证据完成）。
用法:
  python scripts/hardening_status.py                 # 重建全表（保留状态）
  python scripts/hardening_status.py --mark H1-001 passed --note "..." --ev "path"
  python scripts/hardening_status.py --check         # CI 一致性检查
"""
from __future__ import annotations

import argparse
import datetime as _dt
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOC_CANDIDATES = [
    ROOT / "docs" / "HARDENING_TASKS.md",  # 入库副本（CI/第三方可用）
    Path(r"C:\Users\lauze\Downloads\METIS_ACADEMIC_post_release_audit_and_hardening_tasks.md"),
]
DOC = next((p for p in DOC_CANDIDATES if p.is_file()), DOC_CANDIDATES[0])
STATUS = ROOT / "HARDENING_STATUS.md"
STATE = ROOT / ".audit" / "hardening-state.json"


def extract_tasks() -> dict[str, list[str]]:
    """按 Phase 归组提取任务 ID（如 H0-001）。"""
    text = DOC.read_text(encoding="utf-8")
    phases: dict[str, list[str]] = {}
    current = "H0"
    for line in text.splitlines():
        m = re.match(r"# Phase (H\d+)", line.strip())
        if m:
            current = m.group(1)
            phases.setdefault(current, [])
        for tid in re.findall(r"\*\*(H\d+-\d{3})\*\*", line):
            if tid not in phases.setdefault(current, []):
                phases[current].append(tid)
    return phases


def _load() -> dict:
    if STATE.exists():
        return json.loads(STATE.read_text(encoding="utf-8"))
    return {"tasks": {}, "log": []}


def _save(st: dict) -> None:
    STATE.parent.mkdir(parents=True, exist_ok=True)
    STATE.write_text(json.dumps(st, ensure_ascii=False, indent=1), encoding="utf-8")


def render(st: dict, phases: dict[str, list[str]]) -> str:
    total = sum(len(v) for v in phases.values())
    done = sum(1 for t in st["tasks"].values() if t.get("status") == "passed")
    lines = ["# METIS ACADEMIC 发布后整改状态表（Hardening）",
             "",
             "> 审计基线：main @ `c0d3e83`。本表为**新的验收基线**，",
             "> 历史自报状态（456/456、217 全绿）仅为实现记录，不作生产验收。",
             "",
             f"- 更新时间：{_dt.datetime.now().isoformat(timespec='seconds')}",
             f"- 任务总数：{total}　passed：{done}",
             "",
             "| Phase | 任务数 | passed |", "|---|---|---|"]
    for ph, ids in phases.items():
        d = sum(1 for t in ids if st["tasks"].get(t, {}).get("status") == "passed")
        lines.append(f"| {ph} | {len(ids)} | {d} |")
    lines += ["", "## 任务明细", ""]
    for ph, ids in phases.items():
        lines.append(f"### {ph}")
        for tid in ids:
            rec = st["tasks"].get(tid, {})
            s = rec.get("status", "pending")
            mark = "x" if s == "passed" else " "
            note = f" — {rec['note']}" if rec.get("note") else ""
            ev = f"（证据: {rec['evidence']}）" if rec.get("evidence") else ""
            lines.append(f"- [{mark}] {tid} `{s}`{note}{ev}")
        lines.append("")
    lines += ["## 操作日志（最近 80 条）", ""]
    for e in st["log"][-80:]:
        lines.append(f"- `{e['at']}` {e.get('ids', '')} → {e.get('status', '')} {e.get('note', '')}")
    return "\n".join(lines) + "\n"


def check(st: dict) -> int:
    """H0-007：passed 无证据/证据文件不完整 → 非 0 退出。"""
    ev_dir = ROOT / ".audit" / "task-evidence"
    bad = []
    for tid, rec in st["tasks"].items():
        if rec.get("status") != "passed":
            continue
        f = ev_dir / f"{tid}.json"
        if not f.is_file():
            bad.append(f"{tid}: 缺证据文件")
            continue
        data = json.loads(f.read_text(encoding="utf-8"))
        if not data.get("verification_commands") or data.get("verification_exit_codes") is None:
            bad.append(f"{tid}: 证据缺验证命令/退出码")
    if bad:
        print(f"HARDENING-CHECK FAILED: {len(bad)} 项: {bad[:10]}")
        return 1
    print("HARDENING-CHECK OK: 所有 passed 任务均有完整证据")
    return 0


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--mark")
    ap.add_argument("--status", default="passed")
    ap.add_argument("--note", default="")
    ap.add_argument("--ev", default="")
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args()
    phases = extract_tasks()
    st = _load()
    if args.mark:
        now = _dt.datetime.now().isoformat(timespec="seconds")
        for tid in [x.strip() for x in args.mark.split(",") if x.strip()]:
            all_ids = {t for v in phases.values() for t in v}
            if tid not in all_ids:
                raise SystemExit(f"未知任务 {tid}")
            rec = st["tasks"].setdefault(tid, {})
            rec.update({"status": args.status, "note": args.note, "at": now})
            if args.ev:
                rec["evidence"] = args.ev
            st["log"].append({"at": now, "ids": tid, "status": args.status,
                              "note": args.note})
    _save(st)
    STATUS.write_text(render(st, phases), encoding="utf-8")
    total = sum(len(v) for v in phases.values())
    done = sum(1 for t in st["tasks"].values() if t.get("status") == "passed")
    print(f"HARDENING_STATUS.md 已更新：{done}/{total} passed")
    if args.check:
        raise SystemExit(check(st))


if __name__ == "__main__":
    main()

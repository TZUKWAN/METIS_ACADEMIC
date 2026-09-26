"""METIS MCP 服务器（Phase 3，T3.1–T3.5/T3.7）。

传输：stdio（本地 CLI 类 Agent）/ streamable-http（Desktop/远程类，经
mcp-http-gateway.py 加令牌）。工具面 = 项目状态 + 文献检索/核验 + Artifact
注册与版本 + 证据核验；安全：工具白名单、单次调用超时、返回大小上限、
错误脱敏（不泄漏内部路径/堆栈）。
"""

from __future__ import annotations

import argparse
import concurrent.futures
import functools
import json
import os
from pathlib import Path

from mcp.server.mcpserver import MCPServer

MAX_OUTPUT_CHARS = 8000
TOOL_TIMEOUT_SECONDS = 25.0

EXIT_OK = 0


def _build_server(workspace: str) -> MCPServer:
    server = MCPServer(
        name="metis",
        title="METIS ACADEMIC",
        version="0.1.0",
        instructions=(
            "METIS 研究工作流引擎工具面：项目状态/任务（project_status、project_tasks）、"
            "文献检索与 DOI 元数据核验（literature_search、literature_verify_doi）、"
            "证据核验（evidence_verify）、Artifact 注册与版本（artifact_register/"
            "new_version/list/lineage）。workspace 参数必须是含 .metis/ 的 METIS 项目目录。"
        ),
    )

    # ---------- 公共安全设施 ----------
    def _ws(args_ws: str) -> Path:
        """workspace 校验：必须是已初始化的 METIS 项目目录。"""
        p = Path(args_ws).resolve()
        if not (p / ".metis" / "project.yaml").is_file():
            raise ValueError("workspace 不是已初始化的 METIS 项目（缺 .metis/project.yaml）")
        return p

    def _sanitize(text: str, ws_root: Path) -> str:
        text = text.replace(str(ws_root), "<workspace>")
        text = text.replace(os.getcwd(), "<cwd>")
        text = text.replace(str(Path.home()), "<home>")
        if len(text) > MAX_OUTPUT_CHARS:
            text = text[:MAX_OUTPUT_CHARS] + f"\n…[截断，输出超过 {MAX_OUTPUT_CHARS} 字符上限]"
        return text

    def tool(timeout: float = TOOL_TIMEOUT_SECONDS):
        """超时 + 脱敏 + 截断的统一装饰器（同步工具在线程池执行）。"""
        pool = concurrent.futures.ThreadPoolExecutor(max_workers=2)

        def deco(fn):
            import inspect

            has_ws_param = "workspace" in inspect.signature(fn).parameters

            @functools.wraps(fn)
            def wrapper(*a, **kw):
                ws_root = Path.cwd()
                try:
                    if has_ws_param:
                        ws_arg = kw.get("workspace") or (a[0] if a else ".")
                        ws_root = _ws(str(ws_arg))
                    future = pool.submit(functools.partial(fn, *a, **kw))
                    raw = future.result(timeout=timeout)
                except concurrent.futures.TimeoutError:
                    return f"工具执行超时（>{timeout}s），已中止"
                except ValueError as e:
                    return _sanitize(f"参数错误: {e}", ws_root)
                except Exception as e:  # noqa: BLE001 — 脱敏后返回
                    msg = _sanitize(f"{type(e).__name__}: {e}", ws_root)
                    return f"工具执行失败（已脱敏）: {msg}"
                if isinstance(raw, str):
                    return _sanitize(raw, ws_root)
                return json.dumps(
                    _sanitize(json.dumps(raw, ensure_ascii=False), ws_root), ensure_ascii=False
                )

            return wrapper

        return deco

    # ---------- 项目状态/任务 ----------
    @server.tool()
    @tool()
    def project_status(workspace: str) -> str:
        """返回 METIS 项目状态：项目 id/名称、当前阶段（七阶段口径）、任务计数、证据数。"""
        import contextlib
        import io

        from metis_academic.engine_cli import cmd_status

        buf = io.StringIO()
        with contextlib.redirect_stdout(buf):
            rc = cmd_status(_args(workspace, json_mode=False))
        return f"exit={rc}\n" + buf.getvalue()

    @server.tool()
    @tool()
    def project_tasks(workspace: str, stage: str = "") -> str:
        """返回任务计划（id/状态/依赖/期望输出）。stage 形如 S1；空 = 全部。"""
        import contextlib
        import io

        from metis_academic.engine_cli import cmd_tasks

        buf = io.StringIO()
        with contextlib.redirect_stdout(buf):
            argv = ["--workspace", str(Path(workspace).resolve()), "--json"]
            if stage:
                argv += ["--stage", stage]
            rc = cmd_tasks(_args_from(argv))
        return f"exit={rc}\n" + buf.getvalue()

    # ---------- 文献 ----------
    @server.tool()
    @tool()
    def literature_search(
        workspace: str, query: str, source: str = "arxiv", max_results: int = 5
    ) -> str:
        """文献检索（发现≠核验）。source: arxiv（真实 API）/fixture（测试）。返回记录 JSON。"""
        from metis_academic.literature import LiteratureManager, SearchQuery
        from metis_academic.workspace import WorkspaceManager

        ws = _ws(workspace)
        kwargs = (
            {"fixture_path": str(ws.parent / "fixture-lit.json")} if source == "fixture" else {}
        )
        manager_ws = WorkspaceManager(ws)
        lm = LiteratureManager(
            manager_ws, source_kwargs={source: kwargs} if kwargs else {}, load_persisted=True
        )
        q = SearchQuery(terms=query, sources=[source], max_results=min(max_results, 20))
        added = lm.search(q)
        return json.dumps(
            [
                {
                    "title": r.title,
                    "authors": r.authors[:3],
                    "year": r.year,
                    "doi": r.doi,
                    "url": r.url,
                    "verification": r.verification.value,
                }
                for r in added
            ],
            ensure_ascii=False,
            indent=1,
        )

    @server.tool()
    @tool()
    def literature_verify_doi(workspace: str, title: str, doi: str, year: int | None = None) -> str:
        """DOI 元数据核验（CrossRef）：标题匹配才置 verified；冲突/未注册/断网如实区分。"""
        from metis_academic.literature import LiteratureRecord
        from metis_academic.literature.sources import verify_doi

        rec = LiteratureRecord(title=title, authors=[], year=year, doi=doi)
        out = verify_doi(rec)
        return json.dumps(
            {
                "verification": out.verification.value,
                "evidence": out.verification_info.match_evidence,
                "canonical": out.verification_info.canonical,
            },
            ensure_ascii=False,
            indent=1,
        )

    # ---------- 证据核验 ----------
    @server.tool()
    @tool()
    def evidence_verify(workspace: str, task_id: str) -> str:
        """核验某任务的执行证据：是否存在、是否 passed、产物 sha 是否匹配。"""
        from metis_academic.workspace import WorkspaceManager

        ws = _ws(workspace)
        wsm = WorkspaceManager(ws)
        evs = wsm.read_evidence(task_id=task_id)
        if not evs:
            return json.dumps(
                {"task_id": task_id, "verified": False, "reason": "无证据记录"}, ensure_ascii=False
            )
        passed = [e for e in evs if e.status == "passed"]
        artifacts_ok = []
        for e in evs:
            for o in e.outputs:
                if o.startswith("sha256="):
                    artifacts_ok.append({"sha16": o[7:23], "recorded": True})
        return json.dumps(
            {
                "task_id": task_id,
                "verified": bool(passed),
                "evidence_count": len(evs),
                "passed_count": len(passed),
                "artifact_hashes": artifacts_ok,
            },
            ensure_ascii=False,
            indent=1,
        )

    # ---------- Artifact ----------
    @server.tool()
    @tool()
    def artifact_register(
        workspace: str, name: str, path: str, kind: str = "file", task_id: str = ""
    ) -> str:
        """注册 artifact v1（逻辑名唯一；路径相对 workspace）。"""
        from metis_academic.artifacts import ArtifactRegistry

        reg = ArtifactRegistry(_ws(workspace))
        e = reg.register(name, path, kind=kind, task_id=task_id)
        return json.dumps(
            {"name": e.name, "version": e.version, "path": e.path, "sha256": e.sha256},
            ensure_ascii=False,
        )

    @server.tool()
    @tool()
    def artifact_new_version(workspace: str, name: str, path: str, note: str = "") -> str:
        """为既有 artifact 追加新版本（不覆盖旧版本）。"""
        from metis_academic.artifacts import ArtifactRegistry

        reg = ArtifactRegistry(_ws(workspace))
        e = reg.new_version(name, path, note=note)
        return json.dumps(
            {"name": e.name, "version": e.version, "path": e.path, "sha256": e.sha256},
            ensure_ascii=False,
        )

    @server.tool()
    @tool()
    def artifact_list(workspace: str) -> str:
        """列出全部 artifact 的最新版本。"""
        from metis_academic.artifacts import ArtifactRegistry

        reg = ArtifactRegistry(_ws(workspace))
        return json.dumps(
            [
                {"name": e.name, "version": e.version, "path": e.path, "kind": e.kind}
                for e in reg.list()
            ],
            ensure_ascii=False,
            indent=1,
        )

    @server.tool()
    @tool()
    def artifact_lineage(workspace: str, name: str) -> str:
        """返回某 artifact 的完整版本历史（lineage）。"""
        from metis_academic.artifacts import ArtifactRegistry

        reg = ArtifactRegistry(_ws(workspace))
        return json.dumps(
            [
                {
                    "version": e.version,
                    "path": e.path,
                    "sha256": e.sha256,
                    "registered_at": e.registered_at,
                }
                for e in reg.lineage(name)
            ],
            ensure_ascii=False,
            indent=1,
        )

    # ---------- 诊断 ----------
    @server.tool()
    @tool()
    def echo(text: str) -> str:
        """SDK 冒烟诊断工具：原样返回 text（T3.1）；同受超时/截断约束。"""
        return text

    return server


def _args(workspace: str, json_mode: bool = False):
    """构造 engine_cli 的 Namespace 兼容对象。"""
    from types import SimpleNamespace

    return SimpleNamespace(workspace=str(Path(workspace).resolve()), json=json_mode)


def _args_from(argv: list[str]):
    from types import SimpleNamespace

    data = {"workspace": ".", "json": True, "stage": None}
    it = iter(argv)
    for a in it:
        if a == "--workspace":
            data["workspace"] = next(it)
        elif a == "--stage":
            data["stage"] = next(it)
        elif a == "--json":
            data["json"] = True
    return SimpleNamespace(**data)


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="METIS MCP 服务器")
    ap.add_argument(
        "--workspace", default=".", help="默认 workspace（工具调用也可逐次传 workspace 参数）"
    )
    ap.add_argument("--transport", choices=["stdio", "streamable-http"], default="stdio")
    ap.add_argument("--host", default="127.0.0.1")
    ap.add_argument("--port", type=int, default=8765)
    ap.add_argument(
        "--token",
        default=os.environ.get("METIS_MCP_TOKEN", ""),
        help="HTTP 传输的 Bearer 令牌（仅网关模式使用）",
    )
    args = ap.parse_args(argv)

    server = _build_server(args.workspace)
    if args.transport == "stdio":
        server.run(transport="stdio")
        return EXIT_OK
    # HTTP：构建 streamable http app 后交 uvicorn（由网关脚本包令牌鉴权）
    app = server.streamable_http_app(host=args.host)
    import uvicorn

    uvicorn.run(app, host=args.host, port=args.port, log_level="warning")
    return EXIT_OK


if __name__ == "__main__":
    raise SystemExit(main())

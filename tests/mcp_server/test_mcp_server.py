"""Phase 3 MCP 测试：SDK 烟测（T3.1）、工具列举与调用（T3.2/T3.3/T3.4）、
安全负向（T3.5）、双传输（T3.7）。

通过 mcp 客户端（stdio 子进程 / streamable-http）做真实协议调用——非 mock。
"""

from __future__ import annotations

import asyncio
import json
import socket
import subprocess
import sys
from pathlib import Path

import pytest

mcp = pytest.importorskip("mcp", reason="MCP 测试需要 mcp>=2.2（pip install '.[mcp]'）")

PLUGIN_MCP = Path(__file__).resolve().parents[2] / "metis" / "mcp" / "metis-server.py"
GATEWAY = Path(__file__).resolve().parents[2] / "metis" / "mcp" / "mcp-http-gateway.py"
SERVER_DIR = str(PLUGIN_MCP.parent)

EXPECTED_TOOLS = {
    "project_status",
    "project_tasks",
    "literature_search",
    "literature_verify_doi",
    "evidence_verify",
    "artifact_register",
    "artifact_new_version",
    "artifact_list",
    "artifact_lineage",
    "echo",
}


@pytest.fixture
def ws(tmp_path):
    from metis_academic.engine_cli import run_engine_cli

    root = str(tmp_path / "proj")
    rc = run_engine_cli(
        [
            "init",
            "--workspace",
            root,
            "--name",
            "MCP验证",
            "--artifact",
            "journal",
            "--paradigm",
            "qualitative",
            "--lang",
            "zh-CN",
            "--start",
            "from_scratch",
            "--non-interactive",
            "--json",
        ]
    )
    assert rc == 0
    return root


def _stdio_client(ws: str):
    """返回 async 函数体：连接 stdio server，执行 fn(session)，返回结果。"""
    from mcp import ClientSession
    from mcp.client.stdio import StdioServerParameters, stdio_client

    params = StdioServerParameters(
        command=sys.executable, args=[str(PLUGIN_MCP), "--workspace", ws]
    )

    async def run(fn):
        async with stdio_client(params) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()
                return await fn(session)

    return run


def _call(session, name, arguments):
    return asyncio.wait_for(session.call_tool(name, arguments), timeout=40)


def test_t31_sdk_smoke_echo(ws):
    """T3.1：SDK 冒烟——echo 工具被标准 MCP 客户端调用成功。"""

    async def fn(session):
        await session.initialize()
        result = await _call(session, "echo", {"text": "metis-smoke-2026"})
        return result

    result = asyncio.run(_stdio_client(ws)(fn))
    assert result.is_error is False
    assert "metis-smoke-2026" in result.content[0].text


def test_t32_tool_list_matches_spec(ws):
    """T3.2：服务器可被 MCP 客户端列举全部工具，与 MCP_SPEC 一致。"""

    async def fn(session):
        listing = await session.list_tools()
        return {t.name for t in listing.tools}

    names = asyncio.run(_stdio_client(ws)(fn))
    assert EXPECTED_TOOLS <= names, names
    assert "artifact_register" in names and "literature_verify_doi" in names


def test_t32_project_status_over_mcp(ws):
    async def fn(session):
        result = await _call(session, "project_status", {"workspace": ws})
        return result.content[0].text

    out = asyncio.run(_stdio_client(ws)(fn))
    assert "exit=0" in out and "S1" in out


def test_t34_artifact_chain(ws, tmp_path):
    """T3.4：register → new_version → list → lineage 真实链路。"""
    artifact = Path(ws) / "results" / "fig.png"
    artifact.parent.mkdir(parents=True, exist_ok=True)
    artifact.write_bytes(b"v1-bytes")  # v1 内容先落盘并注册

    async def fn(session):
        r1 = await _call(
            session,
            "artifact_register",
            {
                "workspace": ws,
                "name": "消费分布图",
                "path": "results/fig.png",
                "kind": "figure",
                "task_id": "T-QT-001",
            },
        )
        artifact.write_bytes(b"v2-bytes-different")  # 重画：新内容落盘后注册 v2
        r2 = await _call(
            session,
            "artifact_new_version",
            {"workspace": ws, "name": "消费分布图", "path": "results/fig.png", "note": "重画"},
        )
        r3 = await _call(session, "artifact_list", {"workspace": ws})
        r4 = await _call(session, "artifact_lineage", {"workspace": ws, "name": "消费分布图"})
        return (r1.content[0].text, r2.content[0].text, r3.content[0].text, r4.content[0].text)

    v1, v2, listing, lineage = asyncio.run(_stdio_client(ws)(fn))
    assert json.loads(v1)["version"] == 1
    assert json.loads(v2)["version"] == 2
    names = [a["name"] for a in json.loads(listing)]
    assert "消费分布图" in names
    versions = [e["version"] for e in json.loads(lineage)]
    assert versions == [1, 2]
    # lineage sha 不同（内容不同）
    shas = {e["sha256"] for e in json.loads(lineage)}
    assert len(shas) == 2


def test_t33_literature_search_fixture(ws, tmp_path):
    """T3.3 文献检索（fixture 源；真实 Crossref 核验单独 live 测试）。"""
    fx = tmp_path / "fixture-lit.json"
    fx.parent.mkdir(parents=True, exist_ok=True)
    # fixture 路径约定：workspace 同目录（server 端 ws.parent / fixture-lit.json）
    fx = Path(ws).parent / "fixture-lit.json"
    fx.write_text(
        json.dumps(
            [
                {
                    "title": "平台劳动研究文献",
                    "authors": ["张三"],
                    "year": 2023,
                    "verified": True,
                    "url": "https://arxiv.org/abs/2301.1",
                }
            ],
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )

    async def fn(session):
        result = await _call(
            session,
            "literature_search",
            {"workspace": ws, "query": "平台劳动", "source": "fixture", "max_results": 5},
        )
        return result.content[0].text

    out = asyncio.run(_stdio_client(ws)(fn))
    assert "平台劳动研究文献" in out


def test_t35_security_non_project_rejected(ws, tmp_path):
    """T3.5：workspace 非 METIS 项目 → 参数错误，不泄漏内部路径。"""
    bogus = tmp_path / "not-a-project"
    bogus.mkdir()

    async def fn(session):
        result = await _call(session, "project_status", {"workspace": str(bogus)})
        return result.content[0].text, result.is_error

    text, is_err = asyncio.run(_stdio_client(ws)(fn))
    assert "不是已初始化的 METIS 项目" in text or "参数错误" in text
    assert str(tmp_path) not in text  # 不泄漏调用方路径


def test_t35_security_tool_denied_for_missing_artifact(ws):
    """T3.5：artifact 不存在 → 可读错误（fail-closed）。"""

    async def fn(session):
        result = await _call(
            session,
            "artifact_new_version",
            {"workspace": ws, "name": "不存在", "path": "results/x.png"},
        )
        return result.content[0].text

    out = asyncio.run(_stdio_client(ws)(fn))
    assert "不存在" in out


def test_t35_output_size_cap(ws):
    """T3.5：返回大小上限（echo 超长文本被截断）。"""

    async def fn(session):
        result = await _call(session, "echo", {"text": "x" * 100_000})
        return result.content[0].text

    out = asyncio.run(_stdio_client(ws)(fn))
    assert len(out) < 20_000
    assert "截断" in out


def test_t37_dual_transport_same_tools(ws):
    """T3.7：stdio 与 HTTP 双传输各自完成客户端列举+调用。"""
    token = "test-token-12345"

    # 选空闲端口
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    port = s.getsockname()[1]
    s.close()

    proc = subprocess.Popen(
        [sys.executable, str(GATEWAY), "--workspace", ws, "--port", str(port)],
        env={**__import__("os").environ, "METIS_MCP_TOKEN": token},
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        from mcp import ClientSession
        from mcp.client.streamable_http import streamable_http_client

        async def http_flow():
            # 等网关就绪

            for _ in range(50):
                try:
                    with socket.create_connection(("127.0.0.1", port), timeout=0.5):
                        break
                except OSError:
                    await asyncio.sleep(0.2)
            from mcp.client.streamable_http import create_mcp_http_client

            headers = {"Authorization": f"Bearer {token}"}
            async with streamable_http_client(
                f"http://127.0.0.1:{port}/mcp",
                http_client=create_mcp_http_client(headers=headers),
            ) as (read, write):
                async with ClientSession(read, write) as session:
                    await session.initialize()
                    tools = await session.list_tools()
                    result = await asyncio.wait_for(
                        session.call_tool("echo", {"text": "dual-transport"}), timeout=30
                    )
                    return {t.name for t in tools.tools}, result.content[0].text

        names, echo_out = asyncio.run(asyncio.wait_for(http_flow(), timeout=60))
        assert EXPECTED_TOOLS <= names  # 同一工具集
        assert echo_out == "dual-transport"  # 调用成功

        # 无令牌 → 401 拒绝
        async def no_token():
            async with streamable_http_client(f"http://127.0.0.1:{port}/mcp") as (r, w):
                async with ClientSession(r, w) as session:
                    await session.initialize()

        async def guarded():
            try:
                await asyncio.wait_for(no_token(), timeout=15)
                return "connected"
            except Exception as e:  # noqa: BLE001
                return f"rejected: {type(e).__name__}"

        assert "rejected" in asyncio.run(guarded())
    finally:
        proc.terminate()

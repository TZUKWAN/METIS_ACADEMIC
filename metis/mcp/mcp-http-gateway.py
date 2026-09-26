"""METIS MCP HTTP 网关（T3.7）：streamable-http + Bearer 令牌鉴权，仅绑回环。

供 Desktop/远程类 Agent（Claude Desktop、ChatGPT Desktop、Kimi Work、Workbuddy）
经远程 MCP connector 接入。令牌从环境变量 METIS_MCP_TOKEN 读取（缺则启动即生成
并打印一次）；未带 Authorization: Bearer <token> 的请求一律 401。
"""

from __future__ import annotations

import argparse
import importlib.util
import os
import secrets
from pathlib import Path

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

_server_path = Path(__file__).resolve().parent / "metis-server.py"
_spec = importlib.util.spec_from_file_location("metis_mcp_server", _server_path)
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)
_build_server = _mod._build_server


class BearerTokenMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, token: str):
        super().__init__(app)
        self.token = token

    async def dispatch(self, request, call_next):
        if request.headers.get("authorization") != f"Bearer {self.token}":
            return JSONResponse({"error": "unauthorized"}, status_code=401)
        return await call_next(request)


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description="METIS MCP HTTP 网关（仅回环）")
    ap.add_argument("--workspace", default=".")
    ap.add_argument("--host", default="127.0.0.1")
    ap.add_argument("--port", type=int, default=8765)
    ap.add_argument(
        "--token",
        default=os.environ.get("METIS_MCP_TOKEN", ""),
        help="Bearer 令牌；缺省生成随机并打印一次",
    )
    args = ap.parse_args(argv)

    token = args.token or secrets.token_urlsafe(24)
    print(f"[metis-mcp-gateway] Bearer token（本次启动生成，请保存）: {token}", flush=True)

    server = _build_server(args.workspace)
    app = server.streamable_http_app(host=args.host)
    app = BearerTokenMiddleware(app, token)
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=args.port, log_level="warning")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

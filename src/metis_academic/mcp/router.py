"""MCP Router（Phase I，§10）。

不做频繁物理启停；按阶段/任务向模型暴露必要工具子集，
带 permission rules、deny、unavailable fallback、健康检查、重试与证据。
"""

from __future__ import annotations

from collections.abc import Callable
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from ..adapters.base import HarnessAdapter
from ..errors import McpRouterError
from ..logging_setup import get_logger
from ..models import Evidence, MCPMetadata, McpServerInfo, McpToolInfo

logger = get_logger("mcp")


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class McpRouter:
    def __init__(self, registry: MCPMetadata | None = None, deny: set[str] | None = None):
        self.registry = registry or MCPMetadata()
        self.deny: set[str] = set(deny or [])
        self.exposed: list[str] = []
        self.call_log: list[dict[str, Any]] = []

    @classmethod
    def defaults(cls) -> McpRouter:
        from .defaults import default_mcp_registry

        return cls(registry=default_mcp_registry())

    # ---------- 注册与读取（I001–I003） ----------
    @classmethod
    def load_workspace(cls, ws_metis_dir: str | Path) -> McpRouter:
        import yaml

        from ..models import McpServerInfo

        f = Path(ws_metis_dir) / "mcp-registry.yaml"
        if not f.is_file():
            return cls()
        data = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
        servers = [McpServerInfo.from_dict(d) for d in data.get("servers", [])]
        return cls(registry=MCPMetadata(servers=servers))

    def save(self, ws_metis_dir: str | Path) -> None:
        import yaml

        f = Path(ws_metis_dir) / "mcp-registry.yaml"
        f.parent.mkdir(parents=True, exist_ok=True)
        f.write_text(
            yaml.safe_dump(
                {"servers": [s.to_dict() for s in self.registry.servers]},
                allow_unicode=True,
                sort_keys=False,
            ),
            encoding="utf-8",
        )

    def register_server(self, server: McpServerInfo) -> None:
        server.validate()
        if any(s.id == server.id for s in self.registry.servers):
            raise McpRouterError(f"MCP server 已注册: {server.id}")
        self.registry.servers.append(server)

    def tool(self, name: str) -> tuple[McpServerInfo | None, McpToolInfo | None]:
        return self.registry.find_tool(name)

    # ---------- 暴露（I004/I005） ----------
    def tools_for(self, stage: str = "", task_tools: list[str] | None = None) -> list[str]:
        """阶段工具 ∪ 任务显式要求的工具，减去 deny。"""
        names: list[str] = []
        for s in self.registry.servers:
            if not s.enabled:
                continue
            for t in s.tools:
                if t.name in self.deny:
                    continue
                if not t.stages or stage in t.stages:
                    names.append(t.name)
        for n in task_tools or []:
            srv, t = self.tool(n)
            if t is None:
                raise McpRouterError(f"任务要求的工具未注册: {n}")
            if n in self.deny:
                logger.warning("工具 %s 在 deny 列表，已跳过", n)
                continue
            if n not in names:
                names.append(n)
        return names

    def expose(
        self,
        stage: str = "",
        task_tools: list[str] | None = None,
        adapter: HarnessAdapter | None = None,
    ) -> list[str]:
        names = self.tools_for(stage=stage, task_tools=task_tools)
        self.exposed = names
        if adapter is not None:
            adapter.expose_tools(names)
        return names

    # ---------- 权限（I006/I007） ----------
    def check_permission(self, tool_name: str, adapter: HarnessAdapter | None = None) -> bool:
        if tool_name in self.deny:
            return False
        _, t = self.tool(tool_name)
        if t is None:
            return False
        if t.dangerous and adapter is not None:
            return adapter.confirm_action(f"工具 {tool_name} 属敏感操作，允许执行？", default=False)
        return True

    # ---------- 调用（I008/I010/I011） ----------
    def call(
        self,
        tool_name: str,
        fn: Callable[[], Any],
        *,
        adapter: HarnessAdapter | None = None,
        retries: int = 1,
        task_id: str = "-",
        evidence_sink=None,
    ) -> Any:
        """执行工具调用 fn()；不可用/失败时降级并记录证据。"""
        srv, t = self.tool(tool_name)
        if t is None:
            record = {"tool": tool_name, "status": "unavailable", "error": "not registered"}
            self.call_log.append(record)
            logger.warning("工具 %s 不可用（未注册）——降级继续", tool_name)
            return None
        if not self.check_permission(tool_name, adapter=adapter):
            record = {"tool": tool_name, "status": "denied"}
            self.call_log.append(record)
            return None
        last_err: Exception | None = None
        for attempt in range(retries + 1):
            try:
                result = fn()
                record = {"tool": tool_name, "status": "ok", "attempt": attempt}
                self.call_log.append(record)
                if evidence_sink:
                    evidence_sink(
                        Evidence(
                            task_id=task_id,
                            timestamp=_now(),
                            action=f"mcp.call:{tool_name}",
                            status="passed",
                        )
                    )
                return result
            except Exception as e:  # noqa: BLE001 — 工具失败必须降级不中断项目
                last_err = e
                logger.warning("工具 %s 第 %d 次调用失败: %s", tool_name, attempt + 1, e)
        record = {"tool": tool_name, "status": "failed", "error": str(last_err)}
        self.call_log.append(record)
        if evidence_sink:
            evidence_sink(
                Evidence(
                    task_id=task_id,
                    timestamp=_now(),
                    action=f"mcp.call:{tool_name}",
                    validation=str(last_err),
                    status="failed",
                )
            )
        return None

    # ---------- 健康（I009） ----------
    def health_check(self, probe: Callable[[McpServerInfo], bool] | None = None) -> dict[str, str]:
        status: dict[str, str] = {}
        for s in self.registry.servers:
            if not s.enabled:
                status[s.id] = "disabled"
            elif probe is None:
                status[s.id] = "unknown"  # 无探针（离线）不谎报健康
            else:
                try:
                    status[s.id] = "healthy" if probe(s) else "unhealthy"
                except Exception:  # noqa: BLE001
                    status[s.id] = "unhealthy"
        return status

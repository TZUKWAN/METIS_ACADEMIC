"""MCPMetadata（B012，§10）。"""

from __future__ import annotations

from dataclasses import dataclass, field

from .base import Serializable, require_nonempty


@dataclass
class McpToolInfo(Serializable):
    """MCP server 暴露的单个工具。"""

    name: str = ""
    description: str = ""
    dangerous: bool = False  # 需要 permission rule 才可用
    stages: list[str] = field(default_factory=list)  # 空列表 = 全阶段可用

    def validate(self) -> None:
        require_nonempty(self, "name")


@dataclass
class McpServerInfo(Serializable):
    """``.metis/mcp-registry.yaml`` 中的 server 条目。"""

    id: str = ""
    command: str = ""  # 启动命令；空 = 内置/虚拟 server
    url: str = ""  # 远程 server（可选）
    enabled: bool = True
    tools: list[McpToolInfo] = field(default_factory=list)

    def validate(self) -> None:
        require_nonempty(self, "id")
        for t in self.tools:
            t.validate()


@dataclass
class MCPMetadata(Serializable):
    """整个 registry 的容器模型。"""

    servers: list[McpServerInfo] = field(default_factory=list)

    def validate(self) -> None:
        ids = [s.id for s in self.servers]
        if len(ids) != len(set(ids)):
            raise ValueError("MCP server id 重复")
        for s in self.servers:
            s.validate()

    def find_tool(self, tool_name: str) -> tuple[McpServerInfo | None, McpToolInfo | None]:
        for s in self.servers:
            for t in s.tools:
                if t.name == tool_name:
                    return s, t
        return None, None

"""内置默认 MCP 注册表（§10；I 阶段扩展为 Router）。"""

from __future__ import annotations

import yaml

from ..models import MCPMetadata, McpServerInfo, McpToolInfo

DEFAULT_SERVERS: list[McpServerInfo] = [
    McpServerInfo(
        id="filesystem",
        tools=[
            McpToolInfo(name="fs.read", description="读取文件"),
            McpToolInfo(name="fs.write", description="写入文件", dangerous=True),
            McpToolInfo(name="fs.list", description="列出目录"),
        ],
    ),
    McpServerInfo(
        id="web-search",
        tools=[
            McpToolInfo(name="web.search", description="网页搜索", stages=["S2", "S3"]),
        ],
    ),
    McpServerInfo(
        id="browser",
        tools=[
            McpToolInfo(name="browser.open", description="打开网页", stages=["S2", "S3"]),
            McpToolInfo(name="browser.extract", description="抽取页面内容", stages=["S2", "S3"]),
        ],
    ),
    McpServerInfo(
        id="scholar",
        tools=[
            McpToolInfo(name="scholar.search", description="学术检索", stages=["S2", "S3"]),
            McpToolInfo(name="scholar.verify", description="引用真实性核验", stages=["S2", "S9"]),
        ],
    ),
    McpServerInfo(
        id="python",
        tools=[
            McpToolInfo(name="py.exec", description="执行 Python 分析", stages=["S5", "S6"]),
        ],
    ),
    McpServerInfo(
        id="data",
        tools=[
            McpToolInfo(name="data.query", description="数据查询", stages=["S5", "S6"]),
            McpToolInfo(
                name="data.download", description="数据下载", dangerous=True, stages=["S5"]
            ),
        ],
    ),
    McpServerInfo(
        id="office",
        tools=[
            McpToolInfo(name="office.docx", description="生成 Word", stages=["S7", "S8"]),
            McpToolInfo(name="office.pptx", description="生成 PPT", stages=["S8"]),
        ],
    ),
]


def default_mcp_registry() -> MCPMetadata:
    return MCPMetadata(servers=[McpServerInfo.from_dict(s.to_dict()) for s in DEFAULT_SERVERS])


def mcp_registry_yaml(reg: MCPMetadata | None = None) -> str:
    reg = reg if reg is not None else default_mcp_registry()
    return yaml.safe_dump(
        {"servers": [s.to_dict() for s in reg.servers]}, allow_unicode=True, sort_keys=False
    )

# METIS MCP 服务器规范（MCP_SPEC，T3.1）

> SDK：官方 `mcp` Python SDK 2.2.0（`MCPServer` / stdio + streamable-http 双传输）。
> 服务器：`metis/mcp/metis-server.py`（入口）；HTTP 网关：`metis/mcp/mcp-http-gateway.py`
> （仅绑 127.0.0.1 + Bearer 令牌，令牌来自 `--token` 或 `METIS_MCP_TOKEN`）。
> 安全（T3.5）：工具白名单（仅下列 10 个）；单次调用 25s 超时；输出 8000 字符截断；
> 错误脱敏（workspace/cwd/home 路径替换为占位符、无堆栈）；workspace 必须是
> 已初始化 METIS 项目；artifact 路径禁止越出 workspace。

## 工具清单（与 tests/mcp_server 的列举断言一致）

| 工具 | 输入 | 输出 | 域 |
|---|---|---|---|
| `project_status` | workspace | exit 码 + 项目/阶段/任务计数/证据数（文本） | 项目状态 |
| `project_tasks` | workspace, stage? | 任务计划 JSON（id/状态/依赖/期望输出） | 项目状态 |
| `literature_search` | workspace, query, source=arxiv\|fixture, max_results≤20 | 记录数组（含 verification 状态；**发现≠核验**） | 文献 |
| `literature_verify_doi` | workspace, title, doi, year? | verification：verified/resolved/conflict/unverified/unreachable + 依据 | 文献核验 |
| `evidence_verify` | workspace, task_id | 该任务证据计数/passed/产物 hash 清单 | 证据核验 |
| `artifact_register` | workspace, name, path, kind, task_id? | v1 注册（sha256） | Artifact |
| `artifact_new_version` | workspace, name, path, note? | v(n+1) 追加（不覆盖旧版） | Artifact |
| `artifact_list` | workspace | 每逻辑名最新版本 | Artifact |
| `artifact_lineage` | workspace, name | 完整版本历史 | Artifact |
| `echo` | text | 原样返回（SDK 冒烟诊断；同样受超时/截断约束） | 诊断 |

## 传输

| 传输 | 启动 | 适用 |
|---|---|---|
| stdio | `python metis/mcp/metis-server.py --workspace <dir>` | Claude Code、ZCode、DSH、Kimi Code 等本地 CLI 类 |
| streamable-http | `python metis/mcp/mcp-http-gateway.py --workspace <dir> --port 8765 --token <t>`（仅 127.0.0.1；公网需用户自配隧道/反代） | Claude Desktop、ChatGPT Desktop、Kimi Work、Workbuddy |

双传输提供**同一工具集**（tests/mcp_server/test_mcp_server.py::test_t37 断言）。

## 依赖

`mcp>=2.2`（pyproject `[project.optional-dependencies].mcp`）。

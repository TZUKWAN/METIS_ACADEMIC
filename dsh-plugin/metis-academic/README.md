# metis-academic · DeepSeek Harness 插件

把 **METIS ACADEMIC**（哲学社会科学研究工作流运行时）适配为 DeepSeek Harness（DSH）原生插件。
原插件面向 Claude Code（`.claude-plugin/plugin.json` + `.mcp.json`），本 bundle 是 DSH Cordis 形态的重实现。

## 安装

```powershell
# 在 DSH 会话内（Team Lead / 主对话）：
plugin_manager { "action": "install_bundle", "target": "<本目录绝对路径>" }
```

前置条件：本机 Python ≥ 3.10，且引擎已安装：`pip install -e D:\METIS超级合并\src`（包名 `metis-academic`，入口 `python -m metis_academic.cli`）。

## 结构

```
metis-academic/
├── package.json          # dsh.bundle.patch → cordis.patch.yml
├── cordis.patch.yml      # 向宿主插入两项：
│                          #  1) metis-skill-registry  —— 注册运行时技能 metis（SKILL.md + references/）
│                          #  2) metis-mcp             —— 向 @deepseek-ai/dsh-mcp-client 插入 stdio MCP 服务器
├── index.js              # Host 插件（main/exports 入口）：apply(ctx) 内 ctx.effect 注册技能 + MCP 配置
├── skills/metis/
│   ├── SKILL.md          # 技能正文（七阶段脊柱、真实性闸门、DSH 工具映射）
│   └── references/
│       ├── engine-cli.md # 引擎 CLI 全命令速查
│       └── executor.md   # 子智能体执行纪律与回报格式
└── mcp/metis-server.py   # MCP stdio 服务器（project_status / project_tasks / literature_search /
                          # literature_verify_doi / evidence_verify / artifact_* / echo）
```

## 与原 Claude Code 版的映射

| 原 METIS（Claude Code） | 本 bundle（DSH） |
|---|---|
| commands: /metis、/metis-resume、/metis-deliver | 单一技能 `metis` 的三个入口（立项 / 恢复 / 交付） |
| agents: metis-executor | DSH `subagent` 工具 + references/executor.md 纪律 |
| skills 路由 | DSH runtime skill（自动进技能目录，触发词 /metis、研究意图、存在 .metis/） |
| MCP（.mcp.json stdio） | configuration-only MCP 插入 `metis`（stdio，同一 server 脚本） |

不变量：一切执行经引擎 CLI（`python -m metis_academic.cli`）；fail-closed 真实性闸门；检查点必问用户（DSH `ask_user_question`）；状态只存在于 `<项目目录>/.metis/`。

## 来源与备份

- 原插件：`D:\METIS超级合并\metis\`（未改动）；引擎：`D:\METIS超级合并\src\metis_academic\`（`mcp_server.py` 为本次新增的规范化实现，原 `metis/mcp/metis-server.py` 改为兼容 shim）。
- 更早的未完成适配尝试备份在 `D:\LATEXTEST\METIS4DSH\`（metis-dev profile，Service+inject 形态，未采用）。

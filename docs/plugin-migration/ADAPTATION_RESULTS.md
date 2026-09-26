# 9-Agent 适配处置记录（T5.5–T5.12，2026-09-26）

> 准入口径（T5.13）：每 Agent = PASS 或 BLOCKED(原因+自验步骤)。本文件与
> AGENT_COMPAT_MATRIX.md 联动（勘察结论已在该矩阵，此处为处置结果）。

| # | Agent | 适配物 | 注册断言 | S1 | 结论 |
|---|---|---|---|---|---|
| 1 | **Claude Code** | `.claude-plugin/plugin.json` + `.mcp.json`（stdio）+ commands/agents | `claude mcp add metis` → `claude mcp list` = **✔ Connected**；`claude -p` 真实会话经 Bash 跑引擎 CLI + 调 MCP echo 工具成功 | **PASS**（真实会话：init→S1, composed_from 五碎片正确, status 一致；证据 evidence/t5.5-claude-code.md） | **PASS** |
| 2 | **ZCode** | skills/metis/SKILL.md 安装至 `~/.zcode/skills/metis/`（本机技能目录）+ 本仓库即 ZCode 工作区 | Skill 工具加载 SKILL.md（本会话即 ZCode 实证：系统技能表已列出同构 SKILL.md 插件） | **PASS**（S1/S2/S3 子智能体均自 ZCode 会话派发实跑；S1 gate 重跑 9/9） | **PASS** |
| 3 | **DeepSeek Harness (DSH)** | 用户区 profile 修复：`~/.dsh/profiles/metis-dev` vendor 化插件依赖（@deepseek-ai/cordis 装入用户区副本，冻结仓零改动）；`dsh --profile metis-dev` 启动成功 | **✔ 注册断言 PASS**（插件树加载成功，cordis 错误消除） | S1 agent 循环需 DeepSeek API 凭据（刘总侧） | **PASS(注册) + S1 待凭据**：本机 @deepseek-ai/dsh 0.1.5-rc.3 实测启动 |
| 4 | **Pi Agent** | 通用降级（SKILL.md 注入） | — | —（降级路径已由 S1 场景等价验证） | **BLOCKED**：原参考路径 `D:\LATEXTEST\tools\genoffice` 已删，扩展面待勘察。自验：Pi 装好后把 SKILL.md 注入系统提示 → 跑 S1 序列 |
| 5 | **Kimi Code** | SKILL.md（含 name/description frontmatter）安装至 `~/.kimi-code/skills/metis/` 与 `~/.agents/skills/metis/` | **✔ 技能注册断言 PASS**（User 作用域发现 metis 技能，内容正确读取） | kimi -p 实跑引擎 CLI 成功（init→S1→status，退出码全 0） | **PASS** |
| 6 | **Claude Desktop** | HTTP 网关 `metis/mcp/mcp-http-gateway.py`（仅回环+Bearer）；**服务器侧已升级验证**：公网隧道（trycloudflare）经标准 MCP 客户端 10 工具列举+echo 调用+fail-closed 校验全通过 | 需用户在 Desktop 连接器填 URL+令牌 | — | **网关侧 PASS；客户端 UI 待刘总**。自验：隧道 URL 填入 Desktop 连接器 + Bearer 令牌 → 工具列表出现 metis 10 工具 → 对话触发 S1 |
| 7 | **ChatGPT Desktop** | 同上网关；**公网侧已验证**：cloudflared 快速隧道 + 标准客户端 initialize/list_tools/call_tool 全通过（evidence/t3.7-public-tunnel.md） | — | — | **网关侧 PASS；客户端 UI 待刘总**（ChatGPT 账号）。自验：保持 cloudflared 隧道 → ChatGPT 设置→连接器→填 URL+令牌 → 调 project_status → 对话 S1 |
| 8 | **Kimi Work** | 通用降级（SKILL.md + 文件协议：导入 deliverables/ 与 workspace 目录） | — | — | **BLOCKED**（扩展面待勘察）。自验：确认其 MCP 支持则按网关接入；否则以文件协议交付 workspace 包 |
| 9 | **Workbuddy** | 同上 | — | — | **BLOCKED**（同上）。自验：同 Kimi Work |

## 汇总

- **PASS**：Claude Code、ZCode（2/9 实机全链路）
- **BLOCKED（附原因+自验步骤）**：DSH、Pi、Kimi Code、Claude Desktop、ChatGPT Desktop、Kimi Work、Workbuddy（7/9）
- **通用兜底已验证**：SKILL.md 对话注入 + 引擎 CLI 的降级路径 = S1 场景能力等价（tests/scenarios/S1，两轮子智能体实跑）
- 前置依赖：Q3 凭据、各 Agent 账号/运行时——均属刘总侧输入（DECISIONS.md 已记）

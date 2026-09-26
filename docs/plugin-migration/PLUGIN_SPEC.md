# plugin.json 规范（PLUGIN_SPEC，T0.5）

> 版本 v1.0（2026-09-26）。目标：一份插件目录，被 9 个目标 Agent 最大程度识别；
> 识别不了的组件由各 Agent 的薄 manifest/降级路径承接（见 AGENT_COMPAT_MATRIX.md）。
> 字段设计来源（勘察，非臆造）：
> - Claude Code 插件规范（code.claude.com/docs/en/plugins-reference，2026-09-26 抓取）：`.claude-plugin/plugin.json`（必填 `name`，kebab-case）；组件目录 `skills/<name>/SKILL.md`、`commands/*.md`、`agents/*.md`、`hooks/hooks.json`、MCP=`.mcp.json`（根）或 manifest `mcpServers`；`${CLAUDE_PLUGIN_ROOT}` 变量；`claude plugin validate` 可校验。
> - ZCode：本机已装官方插件缓存 `~/.zcode/cli/plugins/cache/zcode-plugins-official/documents/0.1.7/`（`package.json`（`@zcode/documents-plugin`，private）+ `skills/<name>/SKILL.md` + `agents/`）；Skill 由系统 Skill 工具按 SKILL.md 加载（本会话即运行证据）。GitHub zai-org/ZCode README 无插件系统章节（.agents/skills 目录存在）。
> - DSH（DeepSeek Harness）：`D:\LATEXTEST\METIS4DSH\deepseek-harness\metis\plugins\*`（node 包 + `dsh.bundle.patch`（cordis），按域拆分：core/artifact/evidence/funding/literature*）。

## 1. 规范字段（`metis/plugin.json`）

```json
{
  "name": "metis",
  "displayName": "METIS ACADEMIC",
  "version": "0.1.0",
  "description": "对话级哲学社会科学研究工作流运行时（/metis 触发）",
  "author": { "name": "TZUKWAN" },
  "license": "MIT",
  "keywords": ["research", "academic", "workflow", "metis"],
  "capabilities": {
    "commands": ["metis", "metis-resume", "metis-deliver"],
    "agents": ["metis-executor"],
    "skills": ["metis"],
    "mcp": true,
    "engine": "python>=3.10"
  },
  "entry": {
    "skill": "skills/metis/SKILL.md",
    "commands": ["commands/"],
    "agents": ["agents/"],
    "mcp": "mcp/metis-server.py"
  },
  "compat": {
    "claude-code": { "manifest": ".claude-plugin/plugin.json", "mcp": "stdio" },
    "claude-desktop": { "mcp": "http-loopback" },
    "generic-fallback": "skills/metis/SKILL.md 直接作为对话纪律注入"
  }
}
```

### 字段语义

| 字段 | 必填 | 语义 |
|---|---|---|
| `name` | ✓ | 插件 id，kebab-case（对齐 Claude Code） |
| `displayName`/`description`/`author`/`license`/`keywords` | — | 元数据（对齐 Claude Code plugin.json 字段集） |
| `capabilities` | ✓ | 能力标签：本插件声明提供的组件面（Agent 据此选择装载方式） |
| `entry.*` | ✓ | 组件入口路径（相对插件根） |
| `compat.*` | — | 各宿主的对接提示（生成薄 manifest 的依据，见矩阵） |

### 目录约定（与 Claude Code 默认布局超集兼容）

```
metis/
├── plugin.json              # 本规范（同时生成 .claude-plugin/plugin.json 薄镜像供 Claude Code）
├── .claude-plugin/plugin.json
├── .mcp.json                # Claude Code MCP 注册（stdio, ${CLAUDE_PLUGIN_ROOT}）
├── skills/metis/SKILL.md    # 触发条件 + 流程纪律（对话触发降级的唯一必需件）
├── commands/metis.md 等     # 斜杠命令正文
├── agents/metis-executor.md # 子智能体定义
├── mcp/metis-server.py      # MCP 服务器（stdio）+ mcp-http-gateway.py（HTTP 网关）
├── hooks/                   # （可选）会话注入
└── engine/                  # 本仓库 Python 运行时（工作流/闸门/持久化）
```

## 2. 校验规则（插件完整性检查 = T1.2 复测口径）

1. `plugin.json` 可被 `json.loads` 解析；`name` 非空 kebab-case；`version` 语义化。
2. `entry.*` 指向的路径全部存在。
3. `capabilities` 与实际目录一致（声明 commands 则 `commands/` 至少一个 .md）。
4. `.claude-plugin/plugin.json` 与根 plugin.json 的 name/version 一致。

# 通用适配物（T5.4）

四类组件（skills/commands/agents/mcp）的最大公约数包已直接置于插件根
（`metis/`），任何支持「目录即插件」或「SKILL.md 对话注入」的 Agent 直接可用。
本目录存放各宿主的**薄 manifest 模板**与降级说明。

## 模板清单

| 模板 | 用途 |
|---|---|
| `claude-code.plugin.json.tmpl` | Claude Code `.claude-plugin/plugin.json`（已实例化于 `metis/.claude-plugin/`） |
| `zcode.plugin.json.tmpl` | ZCode 插件 package.json（npm 式 + skills/agents 目录） |
| `dsh.package.json.tmpl` | DSH cordis 插件包（node + dsh.bundle.patch，参考 METIS4DSH） |
| `generic-fallback.md` | 无命令/无插件面 Agent 的对话触发降级说明 |

## 降级路径（所有 Agent 通用）

无命令面/无插件面的 Agent：把 `skills/metis/SKILL.md` 全文作为系统/对话纪律注入，
用引擎 CLI 执行全部动作——S1 场景已验证该降级路径能力等价（tests/scenarios/S1）。

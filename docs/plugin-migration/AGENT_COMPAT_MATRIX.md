# 9-Agent 兼容矩阵（AGENT_COMPAT_MATRIX，T0.5）

> 铁律：**先勘察后填写，禁止臆造**。每行标注信息来源：`实测`（本机装过并运行）/`官方文档`（抓取公开文档）/`待勘察`。
> 准入（刘总 2026-09-26）：9/9 全部适配并验收；无法本机验证的走 BLOCKED + 自验步骤。

| # | Agent | 插件/扩展面 | 命令注册 | 子智能体 | MCP 传输形态 | Skill/纪律注入 | 对接方式（METIS 侧） | 信息来源 |
|---|---|---|---|---|---|---|---|---|
| 1 | **Claude Code** | 原生插件：`.claude-plugin/plugin.json`（name 必填）；组件目录 `skills/<n>/SKILL.md`、`commands/*.md`、`agents/*.md`、`hooks/hooks.json`；MCP=根 `.mcp.json` 或 manifest `mcpServers`（支持 `${CLAUDE_PLUGIN_ROOT}`）；本地安装 `--plugin-dir`；`claude plugin validate` | `commands/*.md` → 斜杠命令 | 原生 `agents/*.md` | **stdio**（本地命令）或 HTTP | 原生 skills | 完整发行体直装：生成 `.claude-plugin/plugin.json` + `.mcp.json` 镜像 | **官方文档**（code.claude.com/docs/en/plugins-reference，2026-09-26 抓取） |
| 2 | **Claude Desktop** | 无命令/子智能体概念；MCP 连接器（远程 URL）+ Agent Skills 上传 | ✗（对话触发） | ✗ | **远程 HTTP/SSE**（连接器） | Skills 上传（agent-skills 包） | MCP HTTP 网关（T3.7，仅回环+令牌）+ SKILL.md 作提示词包 | **官方文档**（Desktop MCP 连接器公开能力）；Skills 上传细节**待勘察**（以当期 Desktop 版本 UI 为准） |
| 3 | **Kimi Code** | 技能/MCP/子智能体机制未公开勘察 | 待勘察 | 待勘察 | 待勘察（本地 stdio 大概率支持） | 待勘察（SKILL.md 约定可能兼容） | 先勘察（T5.9）再定；兜底=对话触发降级 | **待勘察** |
| 4 | **Kimi Work** | 云端任务型产品，扩展面未知 | 待勘察 | 待勘察 | 待勘察（可能仅远程 MCP） | 待勘察 | 先勘察（T5.12）；兜底=MCP 网关+文件协议 | **待勘察** |
| 5 | **ZCode** | 插件缓存 `~/.zcode/cli/plugins/cache/<pub>/<plugin>/<ver>/`：npm 式 `package.json` + `skills/<n>/SKILL.md` + `agents/`；技能由系统 Skill 工具加载（本会话实运行）；`.agents/skills` 目录约定（GitHub 可见） | 无斜杠命令面（技能/工具触发） | agents/ 缓存存在（如 computer-use） | MCP 配置可经用户级配置（`mcp-manager` 技能存在） | **SKILL.md 原生** | 技能目录安装 + MCP stdio 注册（本机可实测） | **实测**（本会话运行于 ZCode；官方插件缓存结构直接取证）+ GitHub zai-org/ZCode（README 无插件章节，`.agents/skills` 目录存在） |
| 6 | **ChatGPT Desktop** | 远程 MCP connector（HTTP + 认证）+ 提示词/项目；无斜杠插件面 | ✗（对话触发） | ✗ | **远程 HTTP**（connector，需可达 URL；本机需隧道暴露） | 提示词包 | MCP HTTP 网关（T3.7）+ 隧道 + SKILL.md 提示词包；无法本机自测连通 → BLOCKED+自验步骤 | **官方文档**（ChatGPT connectors/远程 MCP 公开能力）；本机无客户端 → **待用户自验** |
| 7 | **DeepSeek Harness (DSH)** | cordis 插件体系：node 包 + `dsh.bundle.patch`（cordis.patch.yml），按域拆分（core/artifact/evidence/funding/literature*，见 METIS4DSH/metis/plugins/）；含 evals/ | 插件内注册（cordis service） | 有（上游机制） | stdio（plugins/literature-* 即 MCP 工具包） | 包内注入 | 参考 METIS4DSH 经验做薄包；锁定当期版本防上游 breaking | **实测**（本地冻结仓 `D:\LATEXTEST\METIS4DSH` 直接取证） |
| 8 | **Pi Agent** | 参考 `D:\LATEXTEST\tools\genoffice`（ACS/pi 扩展、custom tools）——**该目录已不存在（勘察落空）** | 待勘察 | 待勘察 | 待勘察 | 待勘察 | 重新勘察（T5.8）：找官方文档/新路径；兜底=对话触发降级 | **待勘察**（原参考路径已删） |
| 9 | **Workbuddy** | 扩展面未知（任务/文件交互？MCP？） | 待勘察 | 待勘察 | 待勘察 | 待勘察 | 先勘察（T5.12）；兜底=MCP 网关+导入产物目录的文件协议 | **待勘察** |

## 汇总

- **可直接开工（有实测/官方文档依据）**：Claude Code、ZCode、DSH、Claude Desktop（网关侧）、ChatGPT Desktop（网关侧）
- **必须先勘察**：Kimi Code、Kimi Work、Pi Agent（原参考路径已删）、Workbuddy
- **兜底路径（全部 Agent 通用）**：`skills/metis/SKILL.md` 作为对话纪律注入（等价能力已在场景验收中覆盖）+ MCP HTTP 网关（若 Agent 支持 MCP）
- 勘察结论落库处：本文件就地更新（禁止在别处臆造）

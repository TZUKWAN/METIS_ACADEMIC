# Harness 支持矩阵（H8-014）

> 原则：**只列实测能力**。「未验证」≠ 支持。每个 supported 项对应可复查的证据。

| Harness | 入口 | Skill 注入 | MCP | 文件访问 | 状态 | 证据 |
|---|---|---|---|---|---|---|
| Reference CLI（本仓库 `metis` 命令） | 真实命令行入口 | 事件记录（无宿主上下文注入） | 工具名列表传递 | 直接 | **reference implementation** | tests/test_command.py + 真实终端冒烟（见 RELEASE_VERIFICATION） |
| Headless / 脚本（FilesystemAdapter） | Python API | 事件记录 | 工具名列表传递 | 直接 | **supported（测试用）** | tests/ 全部 E2E |
| Zed | — | — | — | — | **unsupported / 未验证** | — |
| Codex | — | — | — | — | **unsupported / 未验证** | — |
| Claude Code | — | — | — | — | **unsupported / 未验证** | — |
| Kimi Code | — | — | — | — | **unsupported / 未验证** | — |
| ChatGPT Desktop | — | — | — | — | **unsupported / 未验证**（无官方 slash API 之前不声明） | — |
| ACP Host | — | — | — | — | **unsupported / 未验证**（待 H8-004/005 调研实现） | — |

说明：
1. `/metis` 当前是 Reference CLI 中的逻辑命令；在桌面 Harness 中注册为真实
   slash command 的工作属于 H8-005..H8-012，完成实测前一律不标 supported。
2. CLI/Headless 的 `load_skill()` 只产生 Activation 事件与内容读取，
   **未向任何宿主模型上下文注入技能指令**（该能力依赖宿主 Adapter 实现）。

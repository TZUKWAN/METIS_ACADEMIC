# Adapters 适配层审计（T0.3）

> 审计日期：2026-09-26。范围：仓库 `adapters/` 目录 + `src/metis_academic/adapters/` 包，覆盖率 100%（逐文件）。
> 目的：为 ENGINE_CONTRACT（T0.6）与插件化改造提供现状底账。

## 1. 仓库根 `adapters/` 目录

| 文件 | 内容 | 入口/参数 | 被谁调用 | 状态性（幂等？） |
|---|---|---|---|---|
| `adapters/README.md` | Harness Adapter 接入指南：10 个抽象方法清单、接入点示例（`MetisCommand(MyHarnessAdapter()).run()`）、内置实现说明、约定（Choice.action 按钮 / expose_tools 只传子集 / 状态只在 Workspace） | 文档，无代码 | 人类读者/新 Adapter 开发者 | 纯文档，幂等 |

## 2. `src/metis_academic/adapters/` 包（4 文件，316 行）

### 2.1 `base.py`（91 行）

- **内容**：`HarnessAdapter` ABC（§27 统一接口）+ 数据类 `Choice`/`ChoiceResult`/`AdapterEvent`。
- **接口方法**（10 抽象 + 2 具体）：
  `register_command(name, description)` / `show_choices(prompt, choices) -> ChoiceResult` / `confirm_action(prompt, default) -> bool` / `ask_text(prompt, default) -> str` / `send_message(text)` / `show_file(path)` / `edit_file(path) -> str` / `expose_tools(tool_names)` / `load_skill(skill_id)` / `unload_skill(skill_id)` / `get_workspace() -> Path`；`events()` / `_record(kind, **payload)`（事件留痕）。
- **被谁调用**：`wizard/wizard.py`（交互）、`command/metis_command.py`（消息/注册）、`executor/executor.py`（技能/工具/确认）、`skills/router.py`、`mcp/router.py`（工具暴露/危险确认）。
- **状态性**：无状态契约；`_record` 只是向实例 `_events` 列表追加（有状态但只增不改）。

### 2.2 `cli.py`（116 行）— `CliAdapter`（reference 实现）

- **入口**：`CliAdapter(workspace_root=None, stdin=None, stdout=None)`；`workspace_root` 默认 `Path.cwd()`，stdin/stdout 可注入。
- **行为**：编号文本选项（1..N 循环直到合法）；EOF → `EOFError`（防死循环，CLI 顶层捕获退 130）；confirm `y/yes/是`；ask_text 空回退 default；edit_file 为行式 `:wq` 编辑；expose/load/unload 输出提示行并 `_record`。
- **被谁调用**：`cli.py` 的 `main()`（`metis` 命令）。
- **状态性**：交互幂等性不适用（人类对话）；重复 `register_command` 仅重复打印，无副作用。

### 2.3 `filesystem.py`（95 行）— `FilesystemAdapter`（headless 测试实现）

- **入口**：`FilesystemAdapter(workspace_root, answers=None, confirms=None, texts=None)`；`push_answer`/`push_confirm` 注入预置应答。
- **行为**：choices 按「数字序号 → 精确 value/label 匹配」消费 answers 队列，不匹配抛 `AssertionError`；无预置答案抛断言（防静默）；edit_file 直接读文件返回；expose/load/unload 记录到 `exposed_tools`/`loaded_skills`/`unloaded_skills` 列表 + `messages` 缓冲。
- **被谁调用**：全部测试（单元 + 11 项 E2E + 场景测试的宿主模拟）。
- **状态性**：答案队列是一次性消费（测试脚手架语义）；所有断言/记录方法确定、可重放（同 answers 序列 → 同结果），适合 E2E 幂等重跑。

### 2.4 `__init__.py`（14 行）

- 纯 re-export：`HarnessAdapter, CliAdapter, FilesystemAdapter, Choice, ChoiceResult, AdapterEvent`。

## 3. 调用方一览（谁依赖适配层）

| 调用方 | 用到的面 |
|---|---|
| `metis_academic.cli:main` | `CliAdapter` + `MetisCommand.run` |
| `command/metis_command.py` | `register_command / send_message / get_workspace` |
| `wizard/wizard.py` | `show_choices / confirm_action / ask_text / send_message` |
| `executor/executor.py` | `load_skill / expose_tools / confirm_action / send_message` |
| `skills/router.py`、`mcp/router.py` | `load_skill / unload_skill / expose_tools / confirm_action` |
| tests（含 E2E） | `FilesystemAdapter` 全方法 |

## 4. 与插件化目标的差距（供 ENGINE_CONTRACT / Phase 1+ 使用）

1. 适配层是**进程内对话接口**（选项/确认/文本），没有「引擎 CLI 子命令」面——T0.6 契约的 `init/status/plan/tasks/exec/artifacts/deliver/verify` 需新增（映射到 T1.5–T2.2 与 T7 前的补齐任务）。
2. `load_skill/expose_tools` 在两个现有实现中只记录/打印（KNOWN_LIMITATIONS §3 已声明），真实注入属 H6/H7/H8 范畴；插件形态下由宿主（SKILL.md/agents/MCP）承接。
3. 两个实现均无并发保护——`exec` 的任务级文件锁（T2.3）落在 workspace 层而非 Adapter 层。
4. 无任何 Adapter 触碰外部网络/凭据 → 现有适配层可直接作为插件 `engine/` 的对话内核复用。

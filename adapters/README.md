# Harness Adapters（§27）

核心运行时（`src/metis_academic/`）与 Harness 完全解耦。接入一个新 Harness
只需实现 `metis_academic.adapters.HarnessAdapter` 的 10 个接口：

```python
from metis_academic.adapters import HarnessAdapter, Choice, ChoiceResult

class MyHarnessAdapter(HarnessAdapter):
    name = "my-harness"

    def register_command(self, name, description=""): ...   # 注册 /metis
    def show_choices(self, prompt, choices): ...            # 返回 ChoiceResult
    def confirm_action(self, prompt, default=True): ...     # 返回 bool
    def ask_text(self, prompt, default=""): ...             # 返回 str
    def send_message(self, text): ...                       # 输出消息
    def show_file(self, path): ...                          # 展示文件
    def edit_file(self, path): ...                          # 返回编辑后内容
    def expose_tools(self, tool_names): ...                 # 向模型暴露工具子集
    def load_skill(self, skill_id): ...                     # 挂载技能指令
    def unload_skill(self, skill_id): ...                   # 卸载技能
    def get_workspace(self): ...                            # 返回工作目录 Path
```

接入点（一行）：

```python
from metis_academic.command import MetisCommand
MetisCommand(MyHarnessAdapter()).run()
```

## 已内置实现

- `CliAdapter`（`metis_academic.adapters.cli`）：标准输入/输出文本交互；
  不支持按钮的 Harness 自动退化为编号选项（§27 文本 fallback）。
- `FilesystemAdapter`（`metis_academic.adapters.filesystem`）：无头/脚本环境；
  按预置答案队列自动应答，事件全留痕，供测试与 E2E 使用。

## 约定

- `show_choices` 的每个 `Choice` 可带 `action`（如 `topic.confirm`），
  GUI Harness 可渲染为按钮；文本 Harness 展示为编号选项。
- `expose_tools` 只收到当前阶段需要的工具名子集（MCP Router 决定），
  Harness 不应在对话中一次性暴露全部工具。
- 所有状态读取/写入都发生在 Workspace（`.metis/`），Adapter 不承担持久化职责。

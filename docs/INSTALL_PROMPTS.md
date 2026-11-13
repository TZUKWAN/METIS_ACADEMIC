# METIS 自动安装提示词

把对应宿主的提示词发给具备联网、终端或原生插件管理能力的智能体，即可让它按真实安装文档执行。安装遇到宿主审批仍需遵循宿主规则。

## DSH

[完整安装说明](install/dsh.md)

```text
请帮我自动安装或升级 METIS 到最新正式版。仓库：https://github.com/TZUKWAN/METIS_ACADEMIC
先读取 https://raw.githubusercontent.com/TZUKWAN/METIS_ACADEMIC/main/docs/install/dsh.md ，然后直接执行其中对应当前宿主的安装流程。
我授权安装 METIS 和必要的原生插件加载；桌面版优先使用 plugin_manager，不能误装到 web profile，也不要另装旧拆分包。
核对 Release 的 SHA256SUMS；保留我的模式、项目、技能和旧会话，不改模型、账号或其他插件，不强行重启或打断任务。
最后核对真实版本、启用和加载状态。需要宿主审批就正常发起；不能加载时说明具体剩余一步，不要假称成功。
```

## Codex

[完整安装说明](install/codex.md)

```text
请在这台电脑上给 Codex 自动安装或升级完整 METIS 插件。仓库：https://github.com/TZUKWAN/METIS_ACADEMIC
先读取 https://raw.githubusercontent.com/TZUKWAN/METIS_ACADEMIC/main/docs/install/codex.md ，然后直接按当前支持的原生插件流程执行，不要只复制 SKILL.md。
安装 metis@metis-local，准备需要的可信 Node 运行时；如果使用发布包，先校验同一 Release 的 SHA256SUMS。
保留已有模型、账号、权限、其他插件及 METIS 数据，不强行重启应用或中断任务。
完成后只读核对版本、插件启用状态、MCP 工具和两个技能是否被发现，不调用模型来测试；需要新建对话加载时明确告诉我。
```

## ZCode

[完整安装说明](install/zcode.md)

```text
请给当前 ZCode 自动安装或升级完整 METIS 插件。仓库：https://github.com/TZUKWAN/METIS_ACADEMIC
先读取 https://raw.githubusercontent.com/TZUKWAN/METIS_ACADEMIC/main/docs/install/zcode.md ，按当前 ZCode 原生市场和 CLI 能力直接执行，不要只放一个技能文件。
核对正式版及 SHA256SUMS，安装 metis@metis-local，并核对插件、技能、命令和 MCP 工具的真实状态，不调用模型来测试。
保留我的模型、账号、权限、其他插件和研究数据。若启用会打断正在运行的任务，先完成安装准备，等安全空闲时再加载，不强行重启。
只按实际结果报告“已安装、已启用、已加载”或具体阻塞，不把“已添加市场”当成安装完成。
```


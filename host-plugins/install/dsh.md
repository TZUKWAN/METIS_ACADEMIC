# 在 DSH 中自动安装 METIS

使用支持 METIS 的 DSH 0.2.2 系列。桌面应用的 profile 由 Electron 管理，外部 `dsh plugin --profile desktop ...` 会被拒绝，**不要改用 web profile 冒充桌面安装**。

## 智能体执行步骤

1. 读取最新正式 Release：`https://api.github.com/repos/TZUKWAN/METIS_ACADEMIC/releases/latest`。取得 `metis-academic-preset.tgz` 和 `SHA256SUMS`，核对下载包摘要。
2. 在当前 DSH 内发现原生 `plugin_manager` 工具。其 `list_bundles` 返回当前宿主的真实安装项：

   ```json
   {"action":"list_bundles"}
   ```

3. 使用当前正式包 URL 安装/升级同一个组合包。例如 v1.7.0：

   ```json
   {"action":"install_bundle","target":"https://github.com/TZUKWAN/METIS_ACADEMIC/releases/download/v1.7.0/metis-academic-preset.tgz","enabled":true}
   ```

   `target` 必须换成实际取得且核对过的最新正式版 URL。包名是 `metis-academic-preset`，显示名称为 METIS；不要另装旧的拆分三包，不要重复创建同名插件。
4. 遵循工具回执的实际加载结果。`enabled` 只表示保存了选择；`applied`、`restart-required`、`failed` 等不能混为一谈。需要原生审批时发起真实审批，不改变沙箱或“允许 AI 刷新插件”开关来绕过它。
5. 再次 `list_bundles`，核对包名、实际版本、启用和错误字段。运行一次当前宿主支持的只读插件/工具状态检查；不要以生成论文验证安装。若本对话尚未获得新工具，明确说明要新建对话或由用户方便时重新加载。

`plugin_manager` 在部分受限/特殊预设里可能没有挂载，应换用 DSH 的标准/Creator 原生管理会话。它的存在和权限由宿主决定，不要把包直接写进桌面 profile 来绕过管理器。

仅用户本来就在使用网页版时，按实际 Web profile 使用 `dsh plugin --profile <实际profile> add <已核对的tgz URL>`。这是 Web 的备选入口，不是桌面版替代方案。

## 安装边界与成功标准

只安装/升级 METIS 及它明确需要的可信运行时。不更改模型、账号、权限策略或其他插件，不删除已有模式、研究项目、技能和会话；不要运行论文任务或模型请求来测试安装。已有项目不会因升级自动改用新版模式。

下载来自本仓库的正式 Release，核对同一 Release 的 `SHA256SUMS`。失败应说明实际错误及剩余步骤；原生审批按宿主规则处理，不能伪造通过。安装完成与当前会话已经加载是两个状态，分别报告。不要为了加载插件强行重启应用或中断正在执行的任务。

提示词不会为没有联网/终端/原生插件工具的会话创造权限。请在具备这些能力的宿主会话中使用；没有能力时应报告具体缺失项，不要假称安装完成。

## 一段可直接发送的提示词

```text
请帮我自动安装或升级 METIS 到最新正式版。仓库：https://github.com/TZUKWAN/METIS_ACADEMIC
先读取 https://raw.githubusercontent.com/TZUKWAN/METIS_ACADEMIC/main/docs/install/dsh.md ，然后直接执行其中对应当前宿主的安装流程。
我授权安装 METIS 和必要的原生插件加载；桌面版优先使用 plugin_manager，不能误装到 web profile，也不要另装旧拆分包。
核对 Release 的 SHA256SUMS；保留我的模式、项目、技能和旧会话，不改模型、账号或其他插件，不强行重启或打断任务。
最后核对真实版本、启用和加载状态。需要宿主审批就正常发起；不能加载时说明具体剩余一步，不要假称成功。
```

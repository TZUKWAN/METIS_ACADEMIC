# 在 ZCode 中自动安装 METIS

使用支持原生插件的 ZCode，需要 Node.js 22.19 或以上。该插件包含 `.zcode-plugin/plugin.json`、两个技能、两个命令和 stdio MCP 服务，不能用“复制一个技能文件”代替完整安装。

## 原生插件市场

仓库根目录的 `marketplace.json` 是 ZCode 可发现的市场入口。找到当前安装真正使用的 ZCode CLI（可能在 PATH，也可能是桌面安装目录内 `resources/glm/zcode.cjs`），读取其 `plugins` 能力后执行：

```sh
zcode plugins marketplace add TZUKWAN/METIS_ACADEMIC --json
zcode plugins install metis@metis-local --json
```

如果 CLI 是 `zcode.cjs`，使用可用的 Node 执行同样参数。不要硬编码开发者机器的用户名和程序路径。

## 发布包备选

从最新正式 Release 下载 `METIS-Codex-ZCode.zip` 和 `SHA256SUMS`，验证后完整解压到稳定安装目录。阅读并执行包内原生安装器：

```sh
node <解压目录>/host-plugins/metis/install.mjs zcode --enable
```

不带 `--enable` 时只添加本地市场，**不等于已经安装并启用插件**。启用会刷新受影响的原生会话；若有正在运行的任务，先完成下载、校验和准备，等安全空闲时再加载，不强行打断。

同名官方市场已经存在时使用 ZCode 当前原生更新能力处理，只更新 METIS。先读取列表和来源，不删除研究数据或无关市场，不制造第二个 METIS。

## 只读核对

使用原生 `plugins validate`、`plugins list`、技能/命令列表以及 MCP 工具发现，确认 `metis@metis-local` 的真实版本、启用状态、`/metis`、`/metis-config` 和 MCP 服务可发现。不需要模型请求或健康推理。

ZCode 沿用自己的原生主对话执行任务，工作台通过标准 MCP Apps 或本机链接打开。达标循环的 `metis_step_check` 明确使用本机已登录的 Codex 作为独立只读核验器；这不会替换 ZCode 主模型。若不具备该核验后端，必须说明该能力缺失，不能伪造通过。

## 安装边界与成功标准

只安装/升级 METIS 及它明确需要的可信运行时。不更改模型、账号、权限策略或其他插件，不删除已有模式、研究项目、技能和会话；不要运行论文任务或模型请求来测试安装。已有项目不会因升级自动改用新版模式。

下载来自本仓库的正式 Release，核对同一 Release 的 `SHA256SUMS`。失败应说明实际错误及剩余步骤；原生审批按宿主规则处理，不能伪造通过。安装完成与当前会话已经加载是两个状态，分别报告。不要为了加载插件强行重启应用或中断正在执行的任务。

提示词不会为没有联网/终端/原生插件工具的会话创造权限。请在具备这些能力的宿主会话中使用；没有能力时应报告具体缺失项，不要假称安装完成。

## 一段可直接发送的提示词

```text
请给当前 ZCode 自动安装或升级完整 METIS 插件。仓库：https://github.com/TZUKWAN/METIS_ACADEMIC
先读取 https://raw.githubusercontent.com/TZUKWAN/METIS_ACADEMIC/main/docs/install/zcode.md ，按当前 ZCode 原生市场和 CLI 能力直接执行，不要只放一个技能文件。
核对正式版及 SHA256SUMS，安装 metis@metis-local，并核对插件、技能、命令和 MCP 工具的真实状态，不调用模型来测试。
保留我的模型、账号、权限、其他插件和研究数据。若启用会打断正在运行的任务，先完成安装准备，等安全空闲时再加载，不强行重启。
只按实际结果报告“已安装、已启用、已加载”或具体阻塞，不把“已添加市场”当成安装完成。
```

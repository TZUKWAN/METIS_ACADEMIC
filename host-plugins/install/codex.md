# 在 Codex 中自动安装 METIS

需要支持原生插件市场的 Codex，以及 Node.js 22.19 或以上。优先沿用宿主已有 Node；缺失时只从 Node.js 官方来源准备当前用户范围内的受支持运行时，并核对官方校验文件。不要从任意第三方地址运行 `curl | sh`。

## 首选：从仓库安装原生插件

当前仓库根目录包含 `.agents/plugins/marketplace.json`；插件内容位于 `host-plugins/metis`。使用当前环境真正的 Codex CLI，先查看 `codex plugin --help` 确认能力：

```sh
codex plugin marketplace add TZUKWAN/METIS_ACADEMIC --json
codex plugin add metis@metis-local --json
```

已经从本仓库配置市场时，只刷新 METIS 的市场，而不是刷新所有市场：

```sh
codex plugin marketplace upgrade metis-local --json
codex plugin add metis@metis-local --json
```

如果同名市场来自早期本地 METIS 安装目录，应先读取其真实来源和条目。只迁移属于 METIS 的 `metis-local` 注册，不删除开发目录、不动用户数据，不移除无关插件。不要把同名来源冲突当作安装成功。

## 无法直接使用 Git 来源时

1. 从最新正式 Release 下载 `METIS-Codex-ZCode.zip` 和 `SHA256SUMS` 并核对摘要。
2. 解压到稳定的、当前用户可写的安装目录。必须保留全部隐藏市场文件及 `host-plugins` 层级，不把临时下载目录当成长期安装位置。
3. 阅读下载包内的 `metis/install.mjs`，确认它仅使用宿主原生安装器，再执行：

   ```sh
   node <解压目录>/host-plugins/metis/install.mjs codex
   ```

## 只读核对

`codex plugin list --json` 应包含启用的 `metis@metis-local`，插件版本应与最新正式 Release 一致。宿主应能发现 `metis` MCP 服务和 `metis`、`metis-config` 两个技能（原生目录可能显示为 `metis:metis`、`metis:metis-config`）。

可以进行 MCP 初始化和工具目录查询，确认 `metis_open`、配置和项目工具真实存在。不要为了验证安装发送模型请求。旧对话的工具目录可能尚未更新，此时在新建对话中说“打开 METIS”；不要重启用户应用来掩盖当前状态。

宿主支持 MCP Apps 时可显示内嵌工作台；否则用 `metis_open` 返回的鉴权本机链接。不能把本机工作台说成已经嵌入当前窗口。

## 安装边界与成功标准

只安装/升级 METIS 及它明确需要的可信运行时。不更改模型、账号、权限策略或其他插件，不删除已有模式、研究项目、技能和会话；不要运行论文任务或模型请求来测试安装。已有项目不会因升级自动改用新版模式。

下载来自本仓库的正式 Release，核对同一 Release 的 `SHA256SUMS`。失败应说明实际错误及剩余步骤；原生审批按宿主规则处理，不能伪造通过。安装完成与当前会话已经加载是两个状态，分别报告。不要为了加载插件强行重启应用或中断正在执行的任务。

提示词不会为没有联网/终端/原生插件工具的会话创造权限。请在具备这些能力的宿主会话中使用；没有能力时应报告具体缺失项，不要假称安装完成。

## 一段可直接发送的提示词

```text
请在这台电脑上给 Codex 自动安装或升级完整 METIS 插件。仓库：https://github.com/TZUKWAN/METIS_ACADEMIC
先读取 https://raw.githubusercontent.com/TZUKWAN/METIS_ACADEMIC/main/docs/install/codex.md ，然后直接按当前支持的原生插件流程执行，不要只复制 SKILL.md。
安装 metis@metis-local，准备需要的可信 Node 运行时；如果使用发布包，先校验同一 Release 的 SHA256SUMS。
保留已有模型、账号、权限、其他插件及 METIS 数据，不强行重启应用或中断任务。
完成后只读核对版本、插件启用状态、MCP 工具和两个技能是否被发现，不调用模型来测试；需要新建对话加载时明确告诉我。
```

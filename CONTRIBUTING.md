# 开发与贡献

METIS 是一个可安装的 DeepSeek Harness 插件。源码中保留内部模块目录，但安装、启停与升级的对象是根目录的单个 `metis-academic-preset` 包。

## 构建

需要 Node.js 24+、Python 3.10+。

```sh
npm ci
npm test
npm run build
npm pack --ignore-scripts
```

用户安装 GitHub Release 的预构建包不需要执行本地构建。`--ignore-scripts` 用于已完成构建后的打包，不应把它当作跳过构建的替代步骤。

## 主要目录

- `dsh-plugin/metis-mode/client/`：流程编排、研究网络与文档界面。
- `dsh-plugin/metis-mode/host/`：界面服务与文档读写。
- `dsh-plugin/metis-preset/`：模式、技能、项目及固定版本保护。
- `dsh-plugin/metis-academic/`：研究技能与 Python 环境接入。
- `src/metis_academic/`：研究引擎和内置技能。
- `dsh-plugin/metis-unified/`：统一入口、构建脚本与生成文件。

## 技能来源目录

公开目录仅包含元数据、固定提交与文件哈希。第三方正文和脚本从原作者来源按需读取，不提交用户缓存或未经授权的资源副本。已有 ZIP 快照仍由兼容读取逻辑支持。

绑定技能时，只预取被选择的技能正文，校验后固定到本地项目快照；资源由使用者实际请求时读取。不要改为加载整座技能库，也不要让更新后的配置覆盖旧项目。

## 提交前

运行与改动对应的测试和构建。界面、任务和文件状态必须来自真实记录；不添加模拟进度或虚构完成结果。涉及第三方内容时保留来源与许可。

不提交 `.dsh` 配置、密钥、会话、研究资料、环境目录或本机路径。验证应使用独立数据目录；不要为了测试重启使用者的 DSH。

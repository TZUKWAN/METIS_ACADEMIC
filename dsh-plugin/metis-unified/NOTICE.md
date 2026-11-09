# METIS 统一包的许可与依赖

METIS 自 1.6.2 起的原创代码发行按仓库根目录 Apache License 2.0 提供，旧版 MIT 授权与第三方许可不追溯改变。第三方组件保留各自许可，完整范围见根目录 `THIRD_PARTY_NOTICES.md`。

- `dsh-plugin/metis-academic`、`dsh-plugin/metis-mode` 保留各自清单中的原许可与作者信息；原有代码未因统一打包而重新授权。
- `dsh-plugin/metis-preset`、`src/metis_academic/skill_defs` 保留原项目的使用与授权范围。
- 公开的科研技能目录仅提供来源、固定提交、许可元数据及校验摘要，不重新分发第三方正文与资源归档。正文、脚本和许可文件按需从原作者固定版本读取；各自条款继续适用，目录不构成重新授权。
- 文档编辑复用 [Document Review Desk](https://github.com/Suren-ViLL/dsh-plugin-doc-review) 的 MIT 按 run 差分改字实现，固定提交 `643a948d79218c0b897c70998845f7eeb7049bf1`。原作者许可、未经改动的脚本及摘要在 `metis-mode/host/document-vendor/` 中保留；仅调用其中 Word/PPT 文本修改函数，不加载上游完整宿主、界面或 CLI。
- Markdown 渲染复用 MIT 的 `marked` 18.1.3，原许可、npm 完整性与本地文件摘要位于相同 vendor 目录。预览页面关闭脚本与网络，原始 HTML 显示为文本。
- 文档转换使用 DSH 现有的 LibreOffice Kit 服务；本地 Python 的 python-docx、python-pptx、openpyxl、PyMuPDF 继续遵守各自许可，本包不打包或重新授权这些运行环境。
- 「离子回路」为独立实现，参考 Agent Display 的 ION 视觉与交互思路。Agent Display 参考仓库未作为运行时依赖，其代码、模型、素材与演示模拟器不随本包分发。
- 离子回路离线渲染使用 Three.js 0.187.0（MIT），包括 OrbitControls、CSS3DRenderer 和泛光后处理；原 MIT 许可、npm 固定来源及完整性信息位于 `metis-mode/client/ion-vendor/`。这是单一 ION 场景，不包含上游十套主题。
- 本包仅组合现有 DSH 代码、技能资料及 MCP 连接声明。Python 引擎 `metis_academic` 继续使用本机既有安装；DSH、Python 与研究工具依赖各自独立，不由本包伪装为已安装或已验证。

升级入口只有本组合包。打包资料完整不等于上游技能已经在当前环境跑通，也不改变原有调用策略与权限。

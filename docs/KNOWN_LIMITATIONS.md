# KNOWN LIMITATIONS（已知限制与真实能力边界）

> 本文件与代码真实能力对齐（H0-005）。任何能力只有在真实环境验证后才可移出本表。
> 更新规则：先验证，后改文档；禁止先声明后实现。

## 1. CI / 安装

- ~~首轮公开 CI failure（tabulate 缺失）~~ → **已修复**：run 36196114328（3.10/3.12）全绿，
  229 passed + 1 skipped；pip check / wheel 资源包内化 / 干净 venv 验证完成（H1）。
- 首轮 README 自报"217 tests 全绿"是开发机状态，与公开 CI 事实不一致（已标注并以 CI 为准）。

## 2. Harness / `/metis` 入口

- 当前**经过真实验证**的 Adapter 只有：Reference CLI（文本向导）与 Headless（测试用）。
- `/metis` 目前是 Python CLI 内的逻辑命令 + Adapter 注册事件；**尚未**在 Zed、Codex、
  Claude Code、Kimi Code、ChatGPT Desktop 或任何 ACP Host 中注册为真实 slash command。
- 这些宿主的支持状态一律为 UNSUPPORTED / 未验证，见 HARNESS_SUPPORT_MATRIX（后续生成）。

## 3. Skill 动态加载 / 模型接入

- Skill Router 可匹配触发、控制预算、读取技能文本并记录事件；CLI/Headless 的
  `load_skill()` 仍未向宿主模型上下文注入技能指令（H6 待办）。
- **ModelBackend 已落地**（H5）：抽象接口 + host-driven 实现；语义任务（writing.section）
  在无后端时 fail-closed（E2E 验证）。语义深度（schema contract/provenance/hallucination
  guard，H5-004..009）仍在待办。

## 4. MCP

- 当前 MCP Router 是工具元数据与路由层。**没有**真实 MCP client transport、
  initialize/handshake、`tools/list`、`tools/call`、server lifecycle、auth。
- "工具暴露"仅是名称列表传递，不是宿主工具注册。

## 5. 文献来源

- arXiv：真实 API + canonical 核验（live 验证通过）；online 测试默认 skip（独立 live workflow 待办 H3-011）。
- DOI/CrossRef 元数据核验：真实实现（live 验证通过：正向 verified/错误标题 conflict/未注册 unverified/断网 unreachable）。
- NCPSSD / ChinaXiv / SinoXiv / Paper.edu.cn：**无可用 parser**（诚实降级，浏览器通道待办 H3）。
- Scholar 标注 browser-assisted；Web fallback 需宿主注入 search_fn。
- ~~URL 前缀自动 verified~~ 已移除（H2-005）；references.bib 仅含 verified（H2-008）。
- GB/T 7714 与 APA 为主要类型实现，复杂类型为 documented simplification（H2-014/015）。

## 6. 统计方法（真实支持范围）

- **已实现**：OLS（含常数项、正态近似 p 值）、描述统计、相关、简化 VIF、
  缩尾/加项/子样本三种稳健性、分组 OLS、三步法中介（exploratory）。
- **未实现（fail-closed 或文档明示）**：正确 t 推断 df、HC/cluster SE、正式 BP/White、
  正确 2SLS（`2sls_simplified` 占位仍在）、FE/RE、DID、PSM/RDD/GMM、空间计量。
- ~~按字段名自动挑 DV/IV~~ → **已删除**（H10-001）：变量必须来自 research/quant-design.yaml
  （显式 outcome/exposure/controls/estimand/identification_status + 用户确认）。

## 7. Word / PPT

- Word：默认模板生成 + 回读验证为真实实现；用户 DOCX 模板解析仅提取页面/字体/行距/
  标题样式；**不支持**复杂样式复刻、多节、编号 XML、TOC、图片嵌入、真表格（管道符按段落输出）。
- PPT：内置 python-pptx 为 fallback 构建器；style 字段未真正应用；外部 Skill 未集成。

## 8. 数据

- 支持 CSV/TSV 读取分析；xlsx 登记但不保证分析可用（依赖 openpyxl 是否安装）；
  parquet/dta/sav 等仅登记格式，无分析路径。
- `metis-data` 仅为接口预留，未接入真实索引。

## 9. 成文语义

- 输出含工作流骨架文本（如"依 research/ 产出撰写"）；基金模拟评审为固定分数（占位实现）。
- 语义级成文需要 H5 ModelBackend（宿主 LLM）接入后才可能真实。

## 10. 测试

- E2E fixture 字段与 Runtime 启发式强耦合（digital/consume）；live 测试被 skip；
  无 clean-install / wheel-install / 跨平台矩阵（H22/H23 整改中）。

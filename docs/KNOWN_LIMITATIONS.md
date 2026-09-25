# KNOWN LIMITATIONS（已知限制与真实能力边界）

> 本文件与代码真实能力对齐（H0-005）。任何能力只有在真实环境验证后才可移出本表。
> 更新规则：先验证，后改文档；禁止先声明后实现。

## 1. CI / 安装

- 首轮公开 CI（run 36166870763, commit c0d3e83）为 **failure**：9 failed / 208 passed / 1 skipped，
  根因是 `to_markdown()` 依赖 `tabulate` 未声明。修复记录见 HARDENING_STATUS.md H1。
- 首轮 README 自报"217 tests 全绿"是开发机状态，与公开 CI 事实不一致（已在文档头部标注）。

## 2. Harness / `/metis` 入口

- 当前**经过真实验证**的 Adapter 只有：Reference CLI（文本向导）与 Headless（测试用）。
- `/metis` 目前是 Python CLI 内的逻辑命令 + Adapter 注册事件；**尚未**在 Zed、Codex、
  Claude Code、Kimi Code、ChatGPT Desktop 或任何 ACP Host 中注册为真实 slash command。
- 这些宿主的支持状态一律为 UNSUPPORTED / 未验证，见 HARNESS_SUPPORT_MATRIX（后续生成）。

## 3. Skill 动态加载

- Skill Router 可匹配触发、控制预算、读取技能文本并记录事件；但 CLI/Headless 的
  `load_skill()` **只打印/记录，未把技能指令真实注入宿主模型上下文**。
- 无宿主模型集成：语义级生成（编码、成文、解释）当前由确定性模板骨架产出，非 LLM 生成。

## 4. MCP

- 当前 MCP Router 是工具元数据与路由层。**没有**真实 MCP client transport、
  initialize/handshake、`tools/list`、`tools/call`、server lifecycle、auth。
- "工具暴露"仅是名称列表传递，不是宿主工具注册。

## 5. 文献来源

- arXiv：真实 API 实现（`export.arxiv.org`），online 测试默认 skip（H3-011 改造中）。
- NCPSSD / ChinaXiv / SinoXiv / Paper.edu.cn：**无可用 parser**；HTTP 尝试失败或成功
  均返回空列表（诚实降级）。Scholar 固定返回空（无官方 API）。
- Web fallback 仅在注入 `search_fn` 时工作。
- `verified` 判定曾有"URL 前缀自动通过"逻辑（不等于真实性核验，H2-005 移除中）。
- GB/T 7714 与 APA formatter 为简化实现，未覆盖全部文献类型。

## 6. 统计方法（真实支持范围）

- **已实现**：OLS（含常数项、正态近似 p 值）、描述统计、相关、简化 VIF、
  缩尾/加项/子样本三种稳健性、分组 OLS、三步法中介（exploratory）、
  简化 IV 占位（**不是正确 2SLS**）。
- **未实现**：正确 t 推断的 df 处理、HC/cluster 稳健标准误、正式 BP/White 检验、
  正确 2SLS + 弱工具诊断、FE/RE、DID、PSM/RDD/GMM、空间计量。
  方法名不得在用户输出中声称未实现的方法（H10 整改中）。
- Runtime 曾按字段名自动挑 DV/IV（`consume`/`digital` 优先）——研究设计必须显式声明。

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

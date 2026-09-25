# 能力矩阵（CAPABILITY_MATRIX，H28-002）

> 每个 supported 项必须有证据；其余一律标注真实状态。
> 证据来源：pytest 测试、E2E、live 联网验证（见 docs/RELEASE_VERIFICATION.md）。

## 入口 / Harness

| 能力 | 状态 | 证据 |
|---|---|---|
| `/metis` 逻辑入口（CLI） | supported（reference） | tests/test_command.py；真实终端冒烟 |
| 桌面 Harness slash command | unsupported | docs/HARNESS_SUPPORT_MATRIX.md |

## 工作流运行时

| 能力 | 状态 | 证据 |
|---|---|---|
| 12 碎片组合（无重复套件） | supported | tests/test_composer.py（22 项） |
| S0–S10 状态机/崩溃恢复/备份 | supported | tests/test_state.py |
| 任务执行器（依赖/重试/blocked/证据） | supported | tests/test_executor.py |
| Skill 触发/预算/常驻 | supported（触发与内容读取；宿主注入未实现） | tests/test_routers.py |
| MCP 真实协议（transport/handshake/tools.call） | unsupported（仅元数据路由层） | docs/KNOWN_LIMITATIONS.md §4 |
| ModelBackend（host-driven） | supported（fail-closed 已验证） | tests/test_e2e_full_system.py::test_writing_fails_closed_without_backend |

## 文献

| 能力 | 状态 | 证据 |
|---|---|---|
| arXiv 搜索 + canonical 核验 | supported（live） | docs/literature-sources.md live-test 2026-09-25 |
| DOI/CrossRef 元数据核验 | supported（live） | 同上 |
| verified-only references.bib | supported | tests/test_literature.py::test_bib_contains_only_verified |
| NCPSSD/ChinaXiv/SinoXiv/Paper.edu.cn | honest-degradation（无稳定 API） | docs/literature-sources.md |
| GB/T 7714 / APA（主要类型） | supported（简化） | tests/test_literature.py 格式化组 |

## 研究引擎

| 能力 | 状态 | 证据 |
|---|---|---|
| 定量 OLS 全链（描述/相关/VIF/基准/诊断/稳健性/异质性/中介） | supported（同方差 SE；正态近似 p） | tests/test_quantitative.py |
| 正确 2SLS / HC-cluster SE / FE / RE / DID / PSM / RDD / GMM / 空间 | **unsupported**（fail-closed：变量须来自 quant-design.yaml） | docs/KNOWN_LIMITATIONS.md §6 |
| 定性全链（材料→编码→主题→负例→饱和→证据链） | supported（关键词级初始编码；LLM 复核接口就绪） | tests/test_qualitative.py + E2E |
| 理论全链（概念/命题/论证图/反论证/四项检查） | supported | tests/test_theoretical.py + E2E |
| 引擎状态跨任务持久化 | supported | state.yaml（theory）；runtime 全量装载（qual） |

## 成文 / 交付

| 能力 | 状态 | 证据 |
|---|---|---|
| Word 生成 + 回读验证（默认模板） | supported | tests/test_word.py |
| DOCX 模板深度复刻（多节/编号/TOC/图片/真表格） | unsupported | docs/KNOWN_LIMITATIONS.md §7 |
| PPT（内置 fallback） | supported（简版；style 未应用） | tests/test_generators.py::TestPPT |
| 语义成文（章节正文生成） | **需 ModelBackend**（无后端 fail-closed） | E2E 无后端用例 |
| 基金模拟评审 | supported（rubric 解释式，无假评分） | tests/test_generators.py::TestFund |
| 全局 QA（引用链/占位/因果越界/一致性） | supported | tests/test_qa.py |
| 交付打包 + delivery-note | supported | tests/test_delivery.py |
| 一键复现（子进程 + hash 一致） | supported（定量） | tests/test_repro.py |

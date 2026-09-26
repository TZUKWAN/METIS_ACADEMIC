# Data / Laya 收编评估（DATA_ADOPTION，T5.1/T5.2）

> 恢复断言：远端 `TZUKWAN/METIS_PARALLEL` clone 于 2026-09-26，HEAD = `8f36932`
> 「snapshot: unified product phase 1-3 (2026-09-22)」——**与任务书要求的
> 2026-09-22 snapshot `8f36932` 完全一致**。`TZUKWAN/metis-data` 同批 clone（HEAD 38bd2ec）。
> clone 位置：`D:\METIS_migration_scratch\`（仓库外 scratch，只读参照）。

## T5.1 Data 域

### 勘察结论

| 资产 | 实况 | 决定 |
|---|---|---|
| `B_research/sources/data`（任务书所述 22 真 adapter） | 该目录在 8f36932 快照中**不存在**（仅有 `B_research/integration/extensions/data` 前端扩展与 `handoff/B/services/data` 6 个桥接/测试文件） | 不存在即不移植；如实记录 |
| **`TZUKWAN/metis-data`** 的 `metis/backend/app/providers/` | **84 个 provider 的 catalog**（providers.catalog.yaml，含 capabilities 矩阵）+ 8 个适配器模块（world_bank/eurostat/ilostat/kaggle/portals/zenodo_dataverse/tier1_gap/common）+ base.py（ProviderAdapter 契约 + Capability Guard：未声明能力不得标 true） | **桥接采用**（见下） |
| `handoff/B/services/data/mcp_server.py` | B 线 Data 域 MCP 桥 | 参考其工具面命名 |

### 桥接设计（决定：桥接而非移植）

移植 84 个 provider 的 FastAPI 后端违背「本仓库 = 纯 Python 运行时」边界；按
CAPABILITY_MATRIX 决定**桥接**：

1. `metis-data` 独立仓库保持独立（它是数据获取产品化主体，依赖 FastAPI/pydantic 栈）。
2. 本仓库新增 **DataCatalog 工具面**（桥接层）：读取 providers.catalog.yaml（84 provider
   的能力/许可/访问模式元数据），向 `search_public`（Data Manager M008）提供真实索引
   ——此前 M009「metis-data 接口预留」就此兑现：
   - `data_manager.search_public(terms, metis_data_index=…)` 已有实现；
   - 新增 `metismodules` 无关的轻量加载器 `metis_academic/data/catalog.py`：
     `load_catalog(path)` → 结构化 provider 列表；`match(terms)` → 候选数据源。
3. **不移植运行时抓取代码**（playwright/crawl 等 84 家逐家维护不现实且 license 各异）；
   数据集获取走既有的用户 URL 下载 + 人工通道，provider 目录用于「到哪里找数据」的
   真实指引（含 homepage/terms URL——全部来自 catalog 实数据，非臆造）。

### 复制入库的资产（复制件，头注注明来源）

- `docs/plugin-migration/adopted/metis-data-providers.catalog.yaml`
  ← `metis-data/metis/backend/app/providers/providers.catalog.yaml`（84 providers 实数据）
- `src/metis_academic/data/catalog.py`（新桥接模块，带来源注）

### 测试

`tests/plugin/test_data_catalog.py`：
- catalog 加载 84 providers；字段齐全（provider_id/homepage/capabilities）
- match("world bank") 命中 world_bank；match("中国") 命中中文数据源若干
- data_manager.search_public 经桥接索引返回真实候选（非空）

## T5.2 Laya 验证层

### 勘察结论

| 资产 | 实况 | 决定 |
|---|---|---|
| `integration/contract-decision-runtime.mts`（271 行） | Deno/TS 合同化决策运行时（LLM 评分→JSON 契约→闸门） | **语义转写**为 Python `DecisionGate`（评分 schema/一致性闸门/fail-closed），不移植 TS 运行时 |
| `integration/decision-evals/` | 决策评测集（fixtures/competition/mdt/data/notebooks 分域） | 评测思想并入 DecisionGate 单测（合成场景），原 evals 属 C 线产品不复制 |
| `audit/LAYA_*.md` | Laya 审计文档 | 引用 |

### 落地

`src/metis_academic/validation/decision_gate.py`：
- `DecisionGate.evaluate(verdicts: list[dict]) -> Decision`：多评审 verdict 合成
  （一致→pass；分歧→needs_human；全否→reject），无模型/无 verdicts 时
  **fail-closed 拒绝放行**（H5 同款纪律）。
- 测试：合成 verdicts 全绿/分歧/空输入三类断言。

### 不做的事（如实）

- 不接 LLM（ModelBackend 未接入的宿主里 DecisionGate 仅结构化合成，不产生分数）；
- 不复制 C 线 evals 数据（域不匹配：competition/mdt 域非哲社研究域）。

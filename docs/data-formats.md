# 数据格式能力矩阵（H1-004/005/006，与实现严格一致）

| 格式 | 登记（metadata/扫描/字典） | 分析读取（QuantEngine.load） | 依赖 |
|---|---|---|---|
| `.csv` | ✅ | ✅ | pandas（核心） |
| `.tsv` | ✅ | ❌（请先转 csv） | — |
| `.xlsx` | ✅ | ✅（缺依赖时明确报错） | openpyxl（`[analysis]` extra） |
| `.xls` | ✅（格式识别为 excel） | ❌ 不支持（读路径会明确报错） | — |
| `.parquet` | ✅ | ❌ 不支持 | — |
| `.dta` / `.sav` | ✅ | ❌ 不支持 | — |
| `.json` / `.jsonl` / `.txt` / `.docx` / `.pdf` / `.md` | ✅（作为材料/文本登记） | ❌（非表格分析路径） | — |

规则（H9-010 fail-closed 前置声明）：
1. 「登记」= 出现在 data/metadata/inventory.yaml 并计算 hash，**不等于可分析**。
2. 分析只支持 csv / xlsx；其他格式在 `QuantEngine.load` 抛出带转换建议的 `DataError`。
3. `.xlsx` 依赖 `openpyxl`：未安装 `[analysis]` extra 时报安装指引，不静默失败。
4. 本矩阵与 `src/metis_academic/data/manager.py` 的 FORMAT_BY_EXT 及
   `src/metis_academic/engines/quantitative.py` 的 load 实现逐项核对一致。

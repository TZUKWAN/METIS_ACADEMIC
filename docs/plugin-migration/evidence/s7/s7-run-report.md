# S7 数据链路验收报告（S7-data-link）

- 执行日期：2026-09-26
- 执行者：METIS 执行子智能体（验收用户）
- 场景文件：D:\METIS超级合并\tests\scenarios\S7-data-link.md
- 项目工作区：D:\METIS_s7_loop\proj（已删除旧目录后全新 init）
- project_id：metis-20260927-9d2d03（init 返回，composed_from: common + paradigm/quantitative + artifact/journal + language/zh-CN，task_rules=61, tasks_seeded=61）

## 执行过程摘要

1. init：`python -m metis_academic.cli init --workspace D:/METIS_s7_loop/proj --name "S7验证" --artifact journal --paradigm quantitative --lang zh-CN --start has_data --non-interactive --json` → 返回 project_id `metis-20260927-9d2d03`。
2. 数据集：写入 `inputs/existing-data/panel.csv`（30 行，列 id,age,income,consume，525 字节）。
3. data.acquire 语义（DataManager）：`scan_existing()` 登记 existing → 复制到 `data/raw/panel.csv` → `register_file(origin='user')` → `record_source()` → `save()` → `build_dictionary()` 生成 `data/metadata/data_dictionary.panel.yaml`。
4. 研究设计：写入 `research/quant-design.yaml`（design=cross_section, estimand=associational, identification_status=not_causal, outcome=consume, exposure=income, controls=[age]），符合 runtime.py H10-001 校验（outcome/exposure 必填、变量须在数据字典中）。
5. 描述统计（QuantEngine）：`eng.load('data/raw/panel.csv')` → `data_checks`（missing=0, duplicates=0, outliers=0）→ `descriptive`（落盘 descriptives.md/.json）→ `baseline`（VariableDict dv=consume, iv=income, controls=[age]），R²=0.999957, n=30。
6. artifact 注册：`ArtifactRegistry.register('描述统计','results/descriptives.md',kind='report')` → v1, sha256=17ec40ba869ba28a52f1e4708a6b0c9dbd7a207cad2eff49fef852af8a995e47。
7. 复现验证：`QuantEngine.run_all` 连续执行两次，`results/summary.json` 两次 sha256 完全一致（种子 20260925 固定）。

## 验收清单逐条核对

### G1 — data/raw/panel.csv 存在，inventory 有 hash 记录：PASS

文件存在：`D:\METIS_s7_loop\proj\data\raw\panel.csv`（525 字节，sha256 与磁盘重算一致 47c3f613dde58e5a8835f7104b5909402b0af7bd1bbd96e5e8bb9d3b1f7be2f5）。

证据原文（`data/metadata/inventory.yaml`）：

```yaml
updated_at: '2026-09-26T16:58:25+00:00'
files:
- path: inputs/existing-data/panel.csv
  fmt: csv
  sha256: 47c3f613dde58e5a8835f7104b5909402b0af7bd1bbd96e5e8bb9d3b1f7be2f5
  bytes: 525
  origin: existing
  source_url: ''
  registered_at: '2026-09-26T16:58:25+00:00'
- path: data/raw/panel.csv
  fmt: csv
  sha256: 47c3f613dde58e5a8835f7104b5909402b0af7bd1bbd96e5e8bb9d3b1f7be2f5
  bytes: 525
  origin: user
  source_url: local://inputs/existing-data/panel.csv
  registered_at: '2026-09-26T16:58:25+00:00'
```

### G2 — data/metadata/data_sources.md 有来源行：PASS

证据原文（`data/metadata/data_sources.md` 全文）：

```
- **panel.csv** — local://inputs/existing-data/panel.csv # 用户提供的模拟家计面板（30 户，id/age/income/consume），来源为本地 existing-data，hash 见 inventory.yaml（登记于 2026-09-26T16:58:25+00:00）
```

### G3 — results/descriptives.md + .json 落盘：PASS

`results/` 目录清单：descriptives.md（540 B）、descriptives.json（1236 B）、checks.json（284 B）、baseline.json（634 B）、summary.json（run_all 产出）。

证据原文（`results/descriptives.md` 全文）：

```
|       |      id |     age |   income |   consume |
|:------|--------:|--------:|---------:|----------:|
| count | 30      | 30      |     30   |     30    |
| mean  | 15.5    | 46.6333 |  14440   |   8675    |
| std   |  8.8034 | 11.2449 |   6527.8 |   3912.22 |
| min   |  1      | 24      |   4200   |   2600    |
| 25%   |  8.25   | 38.5    |   8975   |   5412.5  |
| 50%   | 15.5    | 48.5    |  13950   |   8375    |
| 75%   | 22.75   | 55.75   |  19600   |   11775   |
| max   | 30      | 63      |  26200   |   15750   |
```

baseline 参考：coef(income)=0.6118 (t=157.7), coef(age)=-7.371 (t=-3.27), R²=0.999957, n=30（模拟数据近似确定性，R² 接近 1 属预期）。

### G4 — artifacts.jsonl 有"描述统计" v1（sha256 非空）：PASS

证据原文（`.metis/artifacts.jsonl` 全文，1 行）：

```json
{"name": "描述统计", "version": 1, "path": "results/descriptives.md", "kind": "report", "sha256": "17ec40ba869ba28a52f1e4708a6b0c9dbd7a207cad2eff49fef852af8a995e47", "task_id": "", "registered_at": "2026-09-26T17:02:19+00:00", "note": ""}
```

sha256 = `17ec40ba869ba28a52f1e4708a6b0c9dbd7a207cad2eff49fef852af8a995e47`（非空），且与注册后重跑 run_all 之后的 `results/descriptives.md` 磁盘重算值一致——产物内容可复现，注册哈希仍然有效。

### G5 — 引擎 run_all 复现路径可用（summary.json 可再生）：PASS

`QuantEngine.run_all('data/raw/panel.csv', VariableDict(dv='consume', iv='income', controls=['age']))` 连续运行两次：

- 第 1 次：R²=0.999957，`results/summary.json` sha256 前缀 `1407422cf31e5d36`
- 第 2 次：R²=0.999957，`results/summary.json` sha256 前缀 `1407422cf31e5d36`
- 两次字节一致（True）；summary keys: baseline / diagnostics / endogeneity / heterogeneity_groups / mechanism_steps / robustness_keys / seed（seed=20260925 固定种子 O023）
- `results/baseline.json` 同步再生（sha256 前缀 1d10ae2d353bd0e2）

## 结论

**S7 = PASS（5/5）** — G1 PASS，G2 PASS，G3 PASS，G4 PASS，G5 PASS。

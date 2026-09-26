# S4 验收运行报告 — METIS MCP 工具链路（文献检索/核验 + Artifact 版本）

- 日期：2026-09-26
- 执行者：METIS 插件执行子智能体（验收用户）
- MCP 服务器：`D:\METIS超级合并\metis\mcp\metis-server.py`（stdio，workspace=`D:/METIS_s4_loop/proj`）
- Driver：`D:/METIS_s4_loop/driver.py`（mcp ClientSession stdio 连接；环境准备 = engine_cli init + fixture 写入，等价用户手工准备；此后链路全部经 MCP 工具）

## D1 literature_search（fixture 源） — PASS

经 MCP 工具 `literature_search`（query=平台劳动, source=fixture, max_results=5），返回原文：

```json
[
 {
  "title": "平台劳动研究文献",
  "authors": ["张三"],
  "year": 2023,
  "doi": "",
  "url": "https://arxiv.org/abs/2301.1",
  "verification": "verified"
 }
]
```

fixture 种子记录被完整检索返回，发现链路可用。

## D2 literature_verify_doi（真实 DOI 核验） — PASS

经 MCP 工具 `literature_verify_doi`（title="Array programming with NumPy", doi=10.1038/s41586-020-2649-2, year=2020），返回原文（节选）：

```json
{
 "verification": "verified",
 "evidence": "title similarity 1.00; year 2020==2020",
 "canonical": {
  "title": "Array programming with NumPy",
  "year": 2020,
  "container": "Nature",
  "authors": ["Harris Charles R.", "Millman K. Jarrod", "van der Walt Stéfan J.", "Gommers Ralf", "Virtanen Pauli", "Cournapeau David", "Wieser Eric", "Taylor Julian", "Berg Sebastian", "Smith Nathaniel J.", "Kern Robert", "Picus Matti", "Hoyer Stephan", "van Kerkwijk Marten H.", "Brett Matthew", "Haldane Allan", "del Río Jaime Fernández", "Wiebe Mark", "Peterson Pearu", "Gérard-Marchant Pierre", "Sheppard Kevin", "Reddy Tyler", "Weckesser Warren", "Abbasi Hameer", "Gohlke Christoph", "Oliphant Travis E."]
 }
}
```

真实 Crossref DOI 核验：title similarity 1.00，年份一致，返回 Nature 规范元数据（26 位作者）。

## D3 artifact_register / artifact_new_version — PASS

- D3a `artifact_register`（name=分布图, path=results/fig.png, kind=figure）原文：
  `{"name": "分布图", "version": 1, "path": "results/fig.png", "sha256": "fc1046dde6af3186e898f738629cf08b5b96f638d7ca1b063138312507372ad8"}`
- 文件内容改为 v2 字节后，D3b `artifact_new_version`（note=重画）原文：
  `{"name": "分布图", "version": 2, "path": "results/fig.png", "sha256": "0879c5128f137cb9d98417d2514e29ea83922e1b07a2f05a58500ef8a147314d"}`

版本递增（1→2），sha256 随内容变化（fc10… → 0879…），版本机制生效。

## D4 artifact_lineage — PASS

经 MCP 工具 `artifact_lineage`（name=分布图），返回原文：

```json
[
 {"version": 1, "path": "results/fig.png", "sha256": "fc1046dde6af3186e898f738629cf08b5b96f638d7ca1b063138312507372ad8", "registered_at": "2026-09-26T15:26:47+00:00"},
 {"version": 2, "path": "results/fig.png", "sha256": "0879c5128f137cb9d98417d2514e29ea83922e1b07a2f05a58500ef8a147314d", "registered_at": "2026-09-26T15:26:47+00:00"}
]
```

血缘完整覆盖 v1/v2，与注册返回一致。

## D5 链路仅经 MCP 工具 — PASS

验收链路中：文献检索（literature_search）、DOI 核验（literature_verify_doi）、Artifact 注册（artifact_register）、新版本（artifact_new_version）、血缘（artifact_lineage）共 5 次功能调用全部通过 mcp `ClientSession.call_tool` 完成。唯一的非 MCP 步骤为 driver 内的验收环境准备（mkdir、fixture-lit.json 写入、`run_engine_cli(["init", ...])` 初始化），符合"等价用户手工准备"的验收约定，不属于被验收链路。验收用户全程未手写 `.metis/` 内任何状态文件。

## D6 artifacts.jsonl 版本记录 — PASS

`Read D:/METIS_s4_loop/proj/.metis/artifacts.jsonl`：恰好 2 行版本记录，原文：

```
{"name": "分布图", "version": 1, "path": "results/fig.png", "kind": "figure", "sha256": "fc1046dde6af3186e898f738629cf08b5b96f638d7ca1b063138312507372ad8", "task_id": "", "registered_at": "2026-09-26T15:26:47+00:00", "note": ""}
{"name": "分布图", "version": 2, "path": "results/fig.png", "kind": "figure", "sha256": "0879c5128f137cb9d98417d2514e29ea83922e1b07a2f05a58500ef8a147314d", "task_id": "", "registered_at": "2026-09-26T15:26:47+00:00", "note": "重画"}
```

与 D3a/D3b/D4 三方一致（版本号、sha256、note）。

## 结论

S4 = PASS（6/6）

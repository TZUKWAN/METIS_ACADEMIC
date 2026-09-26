# S4 — MCP 全链路验收场景（仅经 MCP 工具：检索→核验→Artifact v1→v2）

## 目标
验证：子智能体**只使用 MCP 工具**（不经引擎 CLI、不直接写文件）完成一次
文献检索 → DOI 核验 → Artifact 注册 v1 → 追加 v2 的完整链路。

## 前置
1. fixture 文献源可用（临时 JSON）；或 source=arxiv（真实网络）。
2. 已初始化 METIS 项目目录（workspace）。
3. 子智能体只拿到 MCP 服务器配置（stdio 启动命令）与工具清单（MCP_SPEC.md）；
   **不得调用引擎 CLI，不得用 Write 工具写项目文件**（报告文件除外）。

## 用户输入序列
1. 「用 metis 工具检索 literature_search（source=fixture, query=平台劳动）」
2. 「对结果中标题含"平台劳动"的记录做 literature_verify_doi（用其 DOI；fixture 无 DOI 则用真实 DOI 10.1038/s41586-020-2649-2 配 Array programming with NumPy）」
3. 「在 results/ 下创建 fig.png（内容任意），用 artifact_register 注册为"分布图" v1」
4. 「修改 fig.png 内容，用 artifact_new_version 注册 v2，然后 artifact_lineage 展示版本链」

## 验收清单
| # | 断言 | 判定方式 |
|---|---|---|
| D1 | 检索经 MCP 返回 ≥1 条记录 | 工具输出 |
| D2 | 核验经 MCP 返回 verification=verified（且附 match_evidence） | 工具输出 |
| D3 | register 返回 version=1；new_version 返回 version=2 | 工具输出 |
| D4 | lineage 显示版本 [1,2] 且 sha 互异 | 工具输出 |
| D5 | 子智能体全程只用了 MCP 工具（无 CLI/直接写 .metis） | 回报声明+命令记录 |
| D6 | `.metis/artifacts.jsonl` 落盘两条版本记录 | 读文件 |

## 判定标准
D1–D6 全成立 → S4 = PASS。

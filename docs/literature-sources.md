# 文献来源能力矩阵（H3-001 / H24-012）

> 与实现严格一致。`live-test` 为最近一次真实联网验证；未验证项明确标注。
> 核验（verification）与发现（discovery）分离：任何来源的发现都不直接等于已核验。

| 来源 | 发现方式 | 状态 | live-test | 说明 |
|---|---|---|---|---|
| arXiv | 官方 API（export.arxiv.org，Atom） | **真实实现** | 2026-09-25（resolver 核验 1706.03762 → verified sim 1.00） | 搜索+canonical 核验可用；rate limit/retry 见 H3-010（待办） |
| DOI（CrossRef） | 官方 API（api.crossref.org） | **真实实现** | 2026-09-25（10.1038/s41586-020-2649-2 → verified sim 1.00；错误标题 → conflict；未注册 → unverified） | 元数据匹配才置 verified |
| NCPSSD | 无稳定公开 API；HTTP 尝试 | **诚实降级** | 未通过（404，需浏览器通道） | 返回空列表并记录，不伪造 |
| ChinaXiv | 无稳定公开 API | **诚实降级** | 未通过（404） | 同上 |
| SinoXiv | 无稳定公开 API | **诚实降级** | 未验证 | 同上 |
| Paper.edu.cn | 无稳定公开 API | **诚实降级** | 未验证 | 同上 |
| Google Scholar | 无官方 API | **browser-assisted / 人工提供** | 不适用 | 固定提示走浏览器通道，不返回数据 |
| Web fallback | 需宿主注入 search_fn | **接口就绪** | 未验证 | 无注入时跳过 |
| fixture | 本地 JSON | **仅测试/离线演示** | 每次测试运行 | 合成数据，代表不了真实文献 |

## 核验状态语义

`unverified → (resolver) → verified / conflict / unreachable / resolved`

- 最终 `references.bib` 只含 `verified`（带 resolver+canonical+match_evidence）。
- 离线时 DOI/arXiv resolver → `unreachable`，不谎报成功。

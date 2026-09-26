# S5 — PPT 交付验收场景

## 目标
由交付物（研究结论要点）生成真实 .pptx 并通过「zip 魔数 + slide XML 文本」探针。

## 前置
METIS 项目已初始化（thesis × quantitative × zh-CN）；子智能体只拿
SKILL.md + agents/metis-executor.md + PptBuildService 用法说明。

## 用户输入序列
1. 「由以下要点生成答辩 PPT：标题《平台劳动研究》；页1 研究问题-[RQ1 算法如何控制劳动]；页2 发现-[算法控制机制成立]」
2. 「验证生成的 pptx（zip 魔数 + slide XML 文本探针）」

## 验收清单
| # | 断言 |
|---|---|
| E1 | deliverables/slides.pptx 生成且 zip 魔数 PK |
| E2 | slide XML 含要点文本（RQ1 平台如何控制劳动 / 算法控制机制成立） |
| E3 | 页数 = 3（封面 + 2 内容页） |
| E4 | 探针对不存在文本报 not ok（负向） |

## 判定
E1–E4 全成立 → S5 = PASS。

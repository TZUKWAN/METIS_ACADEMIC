# literature-search

文献检索与去重

默认通过内置的 paper-search-pro headless 入口做联邦检索、去重和相关性排序；必要时可显式选择 arXiv 或其他兼容来源。检索任务没有返回记录时必须停止并保留来源诊断，不能用空索引继续生成研究内容。随后由 S2 核验任务逐条调用 DOI/arXiv 权威元数据核验；未核验条目标记 verified=false 且禁止进入最终参考文献。paper-search-pro 的相关性分数、期刊分区和跨源存在性标记不能替代 METIS 的真实性核验。

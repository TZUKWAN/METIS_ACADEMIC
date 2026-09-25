# METIS ACADEMIC 最终交付报告

> ⚠️ **历史实现记录（首轮）**：本文中的 456/456 与“217 全绿”为开发机自报状态，
> 公开 CI 实际为 9 failed / 208 passed / 1 skipped（tabulate 依赖缺失）。
> 生产验收以 HARDENING_STATUS.md 与 docs/RELEASE_VERIFICATION.md 为准。

> 依据《METIS_ACADEMIC_implementation_tasks.md》实现；状态总表见
> [IMPLEMENTATION_STATUS.md](../IMPLEMENTATION_STATUS.md)（456/456 任务 DONE，含逐任务验证注记）。

## 一、已完成任务（456/456）

| Phase | 内容 | 验证 |
|---|---|---|
| A 仓库基础 | 目录结构/pyproject/ruff+black/pytest/CI/README/版本/logging/errors/config | 8 smoke tests |
| B 数据模型 | ProjectConfig/Task/Evidence/Skill/MCP/Workflow 等全部模型，YAML/JSON 往返不丢字段、非法枚举拒绝 | 17 tests |
| C Workspace | §3 标准目录协议、幂等建立、安全写入、冲突版本化、扫描、证据 jsonl | 12 tests |
| D State | S0–S10 状态机（迁移表/非法拒绝/回退返工）、任务迁移表、retry/max_retry、崩溃恢复、checkpoint、备份 | 14 tests |
| E /metis | 唯一入口 init/resume（含中断恢复、工作流补装配）、§34 摘要 | 5 tests |
| F 配置向导 | 三类成果×三范式×补充字段（模板来源/语言/层级/当前状态）、材料自动检测、确认页+修改循环、文本 UI+GUI 抽象 | 6 tests |
| G Composer | 12 碎片组合（common+paradigm+artifact+level+language），9 组合矩阵、冲突检测、环检测、拓扑排序；**不存在 15 套复制工作流** | 22 tests |
| H Skill Router | registry 加载/保存、stage/paradigm/artifact/task 四类触发、context budget、常驻技能、防重复加载、证据 | 13 tests |
| I MCP Router | registry 往返、阶段/任务级工具暴露、deny、dangerous 确认、不可用降级、重试、健康检查（离线不谎报） | 10 tests |
| J 文献 | LiteratureRecord 全字段、NCPSSD/ChinaXiv/SinoXiv/Paper.edu.cn/arXiv/Scholar/fixture 适配层、DOI+标题去重、GB/T 7714+APA+BibTeX、verified 门槛（未核验禁入参考文献）、离线诚实降级 | 11 tests |
| K 选题 | topic_*.md（11 个必备小节）、topic.confirm/edit/delete、锁定与解锁、selected_topic.md | 7 tests |
| L 设计 | research_questions/framework/methods/outline/tasks、T-XXX-NNN 任务树（依赖/输出/验证）、循环+孤立+无验证检查 | 7 tests |
| M 数据 | 扫描/格式/hash/清单、数据字典、URL 登记+下载日志、raw 只读、interim/processed 分层、缺口报告、metis-data 接口预留 | 10 tests |
| N 定性引擎 | 材料→清洗→编码→主题→负例→饱和度→机制→证据链（Q1–Q18 全链） | 7 tests |
| O 定量引擎 | 检查→描述→相关→VIF→OLS 基准→诊断→稳健性→内生性→异质性→中介→图表；种子固定；run_all 两次执行 hash 一致 | 9 tests |
| P 理论引擎 | Concept/Claim/Evidence/Counter/ArgumentEdge、概念重复/偷换/循环论证/无证据命题/结论超出前提 五项检查 | 7 tests |
| Q Executor | 依赖门、Skill 加载、MCP 暴露、执行→验证→证据、失败重试→blocked、人工介入、阶段完成自动迁移 | 10 tests |
| R Validation | 26 条内置规则 + fail-closed（未知规则一律失败）+ 阶段验证 + 报告 | 12 tests |
| S 复现 | run_all.py 生成（子进程全新解释器）、依赖版本锁定、输入/输出 hash、两次执行一致、reproducibility report | 5 tests |
| T 基金 | 模板导入/栏目/字数解析、F1–F26 链、模拟评审评分、修改清单、重写、形式检查、docx 输出 | 3 tests |
| U 期刊 | J1–J15 规则、IMRaD 组稿、真实表格/图/引用插入、语言与风格检查、匿名化、投稿稿 | 2 tests |
| V 学位 | 学校模板规则（T1–T17）、按章图表编号、一致性/理论主线/RQ 覆盖/创新点证据检查、答辩 PPT 输入+问题预测 | 2 tests |
| W Word | 默认模板、自然语言排版参数、DOCX 模板解析（页面/字体/行距）、template-spec、生成+回读验证 | 7 tests |
| X PPT | PPTInput 内容包、python-pptx 构建、页数/章节覆盖校验、yaml 驱动 | 3 tests |
| Y 全局 QA | §24 全部检查项（任务/引用/变量/数据源/结果/图表/章节/因果/理论/RQ/模板）+ 阻断交付 + 报告 | 10 tests |
| Z Delivery | deliverables 组装（docx/bib/图表/双 zip 包/双报告/delivery-note）、路径校验、诚实缺件提示 | 4 tests |
| 运行时集成 | runtime.py：全部 workflow procedure → 引擎/生成器动作注册表；seed_tasks；日志兜底不伪造产物 | 10 E2E |

## 二、测试结果

- **单元/集成/工作流/恢复/夹具/E2E 共 217 个测试全部通过**（另有 1 个真实联网 arXiv 测试按约定跳过，`pytest -m online` 可跑）。
- **全系统 E2E（tests/test_e2e_full_system.py）**：
  - 9 种组合（基金/期刊/毕业论文 × 定性/定量/理论）各走完整 S1→S10：初始化→审计→文献(fixture)→选题确认→设计→执行→验证→成文→Word→全局 QA→交付；
  - 本科/硕士/博士层级注入差异化规则与任务并通过全链；
  - 断言：阶段全部验证通过、任务全部 passed、证据数 > 任务数、交付物齐备、QA 无阻断。
- **MVP-1 至 MVP-7 逐级验收全部 PASS**（状态文档 MVP 表）。
- **真实 CLI 冒烟**：`metis` 文本向导初始化项目 + 二次进入断点恢复，行为符合 §34 示例。

## 三、未完成任务

无（456/456）。以下为设计上**延后到真实使用场景**的能力（文档允许的接口预留）：
NCPSSD/ChinaXiv/SinoXiv/Paper.edu.cn 的网页反爬需要浏览器通道（适配层已就位，
无网络时诚实降级返回空，绝不伪造文献）；PDF 导出需用户在 Word 中另存。

## 四、已知限制

1. 内容生成层：对话 LLM 负责语义级写作/编码/解释；运行时以确定性引擎产出结构化
   骨架与真实统计结果，保证「可验证、可复现」，但不等于成稿文采。
2. arXiv 为唯一默认真实联网源（测试标记 online）；中文平台需浏览器通道或代理。
3. 统计引擎覆盖 OLS 系（描述/相关/VIF/诊断/稳健性/异质性/中介/简化 2SLS）；
   DID/面板 FE/空间计量等方法按 §17 属「按需加载」，接口已留、未逐一实现。
4. 定性初始编码为关键词级（人工/LLM 复核接口齐备：edit_coding/confirm）。
5. PPT 为学术简版构建器，外部 PPT Skill 可经 `PPTBuilder(external_skill=...)` 替换。

## 五、运行方法

```bash
pip install -e ".[dev,analysis,docs]"
pytest                # 217+ 测试
ruff check src tests  # lint
metis                 # 在当前目录进入 /metis（文本向导）
metis --version
python -m metis_academic   # 等价入口
```

## 六、/metis 使用示例（真实终端摘录）

```text
$ metis
[命令已注册] /metis — 进入 METIS ACADEMIC 研究模式
检测到当前目录没有 METIS 项目，开始项目配置。
已扫描当前目录：
  未发现已有材料，将从零开始。
请选择成果类型：
  1. 基金申报书 — 国家/省部级基金等项目申报
  2. 期刊论文 — 中英文学术期刊投稿
  3. 毕业论文 — 本科/硕士/博士学位论文
（用户输入 3 → 2 → 1 → 2 → 3 → 某大学 → 1 → 项目名 → y）

项目已初始化。
层级：硕士
类型：毕业论文
范式：定量实证
语言：中文
当前状态：从零开始
工作流：11 阶段 / 64 任务规则（组合自：common, paradigm/quantitative, artifact/thesis, level/master, language/zh-CN）
当前进入：S1 Workspace Audit

$ metis      # 第二次进入
检测到已有 METIS 项目：metis-20260925-586280「CLI测试论文项目」
恢复到阶段 S1；恢复任务 0 个（中断任务已按证据处理）
```

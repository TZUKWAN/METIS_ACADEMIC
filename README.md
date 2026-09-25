# METIS ACADEMIC

面向跨 Agent Harness 的**对话级哲学社会科学研究工作流运行时**。

用户在受支持的 Harness 中只需调用 `/metis`，系统即可完成项目初始化 → 研究类型
选择 → 工作流装配 → 动态 Skill/MCP 路由 → 任务执行 → 阶段验证 → 成文 →
格式适配 → 最终交付。

> **状态：PASS WITH DOCUMENTED LIMITATIONS（整改中）**
> 能力声明与实测严格对齐，见 [docs/CAPABILITY_MATRIX.md](docs/CAPABILITY_MATRIX.md)
> 与 [docs/KNOWN_LIMITATIONS.md](docs/KNOWN_LIMITATIONS.md)。桌面 Harness 接入、
> 真实 MCP 协议层等尚未实现——未实测的能力不标注「已支持」。

## 核心公式

```text
Common Workflow + Research Paradigm Workflow + Artifact Workflow
+ Level Rules + Language Rules + Template Rules = 最终运行工作流
```

12 个 YAML 碎片组合出全部工作流（无复制套件）。所有状态、任务、产物持久化到
Workspace；研究真实性闸门：文献必须经 resolver 核验才能进入最终参考文献，
定量变量必须来自显式研究设计（quant-design.yaml），基金申报默认只做设计不执行
未来研究，语义成文在未接入宿主模型时 fail-closed。

## 安装与运行

支持 Python（与 CI 矩阵一致：3.10 / 3.12）：

```bash
pip install -e ".[dev,analysis,docs]"   # 开发全量
pytest                                   # 测试（数量以最新 CI run 为准）
ruff check src tests                     # lint
metis --version                          # CLI 入口（reference adapter）
python -m metis_academic                 # 等价入口
python examples/demo-quant-journal/run_demo.py   # 最小闭环示例
```

## `/metis` 使用示例（真实终端）

```text
$ metis
检测到当前目录没有 METIS 项目，开始项目配置。
请选择成果类型：1.基金申报书 2.期刊论文 3.毕业论文
（选择 3 → 定量实证 → 中文 → 硕士 → 默认模板 → 从零开始 → 输入项目名 → 确认）

项目已初始化。
层级：硕士 / 类型：毕业论文 / 范式：定量实证 / 语言：中文
工作流：11 阶段 / 64 任务规则（组合自：common, paradigm/quantitative, artifact/thesis, level/master, language/zh-CN）
当前进入：S1 Workspace Audit

$ metis    # 第二次进入
检测到已有 METIS 项目，恢复到阶段 S1
```

## 代码结构

```text
src/metis_academic/   核心运行时（Harness 无关）
  models/ workspace/ state/ command/ wizard/ composer/
  skills/ mcp/        动态 Skill / MCP 路由（MCP 为元数据路由层）
  literature/         文献检索 + DOI/arXiv 元数据核验 + verified-only bib
  topics/ design/ data/ engines/ executor/ validation/ repro/
  generators/ word_engine/ ppt/ qa/ delivery/ runtime.py model_backend.py
workflows/（包内）     common/paradigm/artifact/level/language YAML
skill_defs/（包内）    技能定义与说明
tests/                单元/集成/工作流/恢复/夹具/E2E（9 组合 + 本硕博）
docs/                 能力矩阵/支持矩阵/限制/发布验证/方法文档
```

## 文档索引

- [能力矩阵](docs/CAPABILITY_MATRIX.md) — 每项能力有证据或明确 unsupported
- [Harness 支持矩阵](docs/HARNESS_SUPPORT_MATRIX.md)
- [文献来源能力](docs/literature-sources.md)
- [已知限制](docs/KNOWN_LIMITATIONS.md)
- [发布验证](docs/RELEASE_VERIFICATION.md)
- [整改状态](HARDENING_STATUS.md) / [实现状态（历史）](IMPLEMENTATION_STATUS.md)

## License

MIT — 见 [LICENSE](LICENSE)。

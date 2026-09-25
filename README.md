# METIS ACADEMIC

面向跨 Agent Harness 的**对话级哲学社会科学研究工作流运行时**。

用户在任意受支持的 Agent Harness 中进入对话后只需调用 `/metis`，系统即可完成
项目初始化 → 研究类型选择 → 工作流装配 → 动态 Skill/MCP 路由 → 任务执行 →
阶段验证 → 成文 → 格式适配 → 最终交付。

## 核心公式

```text
Common Workflow + Research Paradigm Workflow + Artifact Workflow
+ Level Rules + Language Rules + Template Rules = 最终运行工作流
```

不维护 15 套重复工作流；所有状态、任务、产物持久化到 Workspace，不依赖聊天上下文。

## 安装与运行

```bash
pip install -e ".[dev,analysis,docs]"   # 开发全量安装
pytest                                   # 运行测试
ruff check src tests                     # lint
metis --version                          # CLI 入口
python -m metis_academic                 # 等价入口
```

## `/metis` 使用示例

```text
用户：/metis
METIS：检测到当前目录没有 METIS 项目。请选择成果类型：1.基金申报书 2.期刊论文 3.毕业论文
用户：3
METIS：请选择研究范式：1.定性实证 2.定量实证 3.理论阐释
用户：2
...
METIS：项目已初始化。类型：硕士毕业论文 范式：定量实证 语言：中文。当前进入 S1 Workspace Audit
```

## 代码结构

```text
src/metis_academic/   核心运行时（Harness 无关）
  models/             数据模型（ProjectConfig/Task/Evidence/…）
  workspace/          Workspace Manager（目录协议/持久化/扫描）
  state/              State Manager（S0–S10 状态机）
  command/            /metis 命令处理
  wizard/             项目配置向导
  composer/           Workflow Composer（YAML 组合）
  skills/ mcp/        动态 Skill / MCP 路由
  literature/         文献检索（NCPSSD/ChinaXiv/SinoXiv/arXiv/…）
  topics/             选题（topic.confirm/edit/delete）
  design/             Research Design（研究问题/大纲/任务树）
  data/               Data Manager
  engines/            定性/定量/理论 三大执行引擎
  executor/           Task Executor
  validation/         Validation Engine
  repro/              一键复现（run_all.py）
  generators/         基金/期刊/学位论文 生成器
  word_engine/ ppt/   Word 生成 / PPT Skill 接口
  qa/                 全局质量检查
  delivery/           交付打包
  adapters/           Harness Adapter（generic CLI / filesystem）
workflows/            common/paradigm/artifact/level/language YAML
skills/               内置 Skill 定义
templates/            默认模板
tests/                单元/集成/工作流/恢复/夹具/E2E 测试
examples/             示例项目
docs/                 文档
```

## 完成状态

见 [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)（由 `scripts/gen_status.py` 维护，
每个任务先验证后标记）。

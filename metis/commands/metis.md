# /metis — METIS ACADEMIC 主入口

按以下步骤引导用户完成立项。全程使用引擎 CLI（契约见
`docs/plugin-migration/ENGINE_CONTRACT.md`）；每一步先执行、后汇报，禁止编造输出。

## 第 0 步：环境与恢复检查

1. `python -m metis_academic.cli --version` — 引擎不可用则如实告知（需要 Python ≥3.10 + 本插件 engine/）。
2. 当前目录存在 `.metis/project.yaml`？→ 是：改走恢复路径（`status` 读取进度并汇报，询问「继续/新建」）。

## 第 1 步：立项（引擎 init）

向用户依次询问（检查点）：

1. **成果类型**：1 基金申报书 / 2 期刊论文 / 3 毕业论文
2. **研究范式**：1 定性实证 / 2 定量实证 / 3 理论阐释
3. 成果补充参数：
   - 基金：类别、模板来源（上传/Workspace/默认）
   - 期刊：语言（中/英）、目标期刊（可无）、当前进度
   - 学位：本科/硕士/博士、语言、学校模板来源
4. **当前项目状态**：从零 / 已有选题 / 已有数据 / 已有草稿 / 混合
5. **项目名称**

用户答完后执行（示例，参数按用户选择替换）：

```
python -m metis_academic.cli init --workspace . \
  --name "<项目名>" --artifact thesis --paradigm quantitative \
  --lang zh-CN --level master --start from_scratch --non-interactive
```

向用户复述初始化摘要（项目 id / 组合来源 / 当前阶段）。

## 第 2 步：研究类型选择（检查点 1）

- 已有选题：请用户提供选题材料 → 写入 `research/` 后确认。
- 无选题：`exec` 选题链任务生成 `topics/topic_*.md`（每题独立文件），逐个向用户
  展示，提供 topic.confirm / topic.edit / topic.delete 三个动作；**只有用户明确
  确认后**才 `confirm` 锁定 `research/selected_topic.md`。

## 第 3 步：工作流装配与汇报

1. 引擎 `plan`（若 init 未装配）→ 读取 workflow 装配来源。
2. 引擎 `tasks --json` → 向用户以七阶段口径汇报计划概览（①文献准备…⑦交付），
   说明「执行将由 metis-executor 子智能体按任务推进；您只在检查点做判断」。
3. 询问用户是否开始第 ① 阶段；确认后进入执行循环（调度纪律见 SKILL.md）。

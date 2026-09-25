"""Research Design（Phase L，§13）。

确认选题后生成：research_questions / framework / outline / methods / tasks；
tasks.md 按大纲章节拆任务（T-XXX-001 风格），带依赖、期望输出与验证规则；
写 task-state.json；校验循环依赖/孤立任务/无验证任务。
"""

from __future__ import annotations

from dataclasses import dataclass, field

from ..errors import MetisError
from ..logging_setup import get_logger
from ..models import ProjectConfig, Task, TaskStatus
from ..state import StateManager
from ..topics import TopicCandidate
from ..workspace import WorkspaceManager

logger = get_logger("design")

#: 大纲章节（按 artifact/paradigm 变化）
OUTLINES: dict[str, list[tuple[str, str]]] = {
    # (章节标题, 任务前缀)
    "journal": [
        ("摘要", "ABS"),
        ("引言", "INTRO"),
        ("文献综述与研究假设", "LIT"),
        ("研究设计", "DESIGN"),
        ("实证结果", "RESULTS"),
        ("结论与讨论", "CONCL"),
        ("参考文献", "REF"),
    ],
    "fund": [
        ("选题依据", "BASIS"),
        ("研究内容与目标", "CONTENT"),
        ("思路方法与技术路线", "METHOD"),
        ("创新之处", "INNOV"),
        ("研究基础与可行性", "FEASIB"),
        ("参考文献", "REF"),
    ],
    "thesis": [
        ("摘要", "ABS"),
        ("第一章 绪论", "CH1"),
        ("第二章 文献综述", "CH2"),
        ("第三章 研究设计", "CH3"),
        ("第四章 实证/案例分析", "CH4"),
        ("第五章 结论与展望", "CH5"),
        ("参考文献", "REF"),
    ],
}
PARADIGM_FINAL_TASK = {"quantitative": "QT28", "qualitative": "Q18", "theoretical": "TH23"}


@dataclass
class DesignBundle:
    topic: TopicCandidate
    research_questions: str
    framework: str
    methods: str
    outline: str
    tasks: list[Task] = field(default_factory=list)


class DesignManager:
    def __init__(self, ws: WorkspaceManager, cfg: ProjectConfig, sm: StateManager | None = None):
        self.ws = ws
        self.cfg = cfg
        self.sm = sm or StateManager(ws)

    # ---------- L001 解析 selected_topic ----------
    def parse_topic(self) -> TopicCandidate:
        f = self.ws.root / "research" / "selected_topic.md"
        if not f.is_file():
            raise MetisError("尚未确认选题：research/selected_topic.md 不存在")
        return TopicCandidate.from_markdown(f.read_text(encoding="utf-8"))

    # ---------- L002–L005 核心设计文档 ----------
    def build(self) -> DesignBundle:
        topic = self.parse_topic()
        para = self.cfg.research_paradigm.value if self.cfg.research_paradigm else "qualitative"
        rq = self._research_questions(topic, para)
        fw = self._framework(topic, para)
        me = self._methods(topic, para)
        ol = self._outline()
        bundle = DesignBundle(
            topic=topic, research_questions=rq, framework=fw, methods=me, outline=ol
        )
        self._write("research_questions.md", rq)
        self._write("framework.md", fw)
        self._write("methods.md", me)
        self._write("outline.md", ol)
        return bundle

    def _research_questions(self, t: TopicCandidate, para: str) -> str:
        rq = t.research_question or f"{t.title}的机制是什么？"
        return "\n".join(
            [
                f"# 研究问题（{t.title}）",
                "",
                f"总问题：{rq}",
                "",
                "子问题：",
                f"1. RQ1：{t.title}的现状与关键特征是什么？",
                f"2. RQ2：{'哪些因素通过何种机制影响' if para != 'theoretical' else '何种理论逻辑能够解释'}{t.title}？",
                f"3. RQ3：上述{'效应/机制' if para != 'theoretical' else '解释'}的边界条件是什么？",
                "",
                "研究目标：",
                f"- 回答 RQ1–RQ3；形成关于{t.title}的系统证据/理论阐释；",
                "- 给出政策或理论含义。",
                "",
                f"> 理论视角（来自选题）：{t.theory}",
                "",
                "## 初步框架",
                "",
                t.framework,
                "",
            ]
        )

    def _framework(self, t: TopicCandidate, para: str) -> str:
        return "\n".join(
            [
                "# 理论框架",
                "",
                f"- 核心概念：{t.title}（操作化见 methods）",
                f"- 理论视角：{t.theory}",
                f"- 分析层次：{'个体—组织—制度' if para != 'theoretical' else '概念—命题—理论体系'}",
                f"- 初步命题：{t.innovation}",
                "",
            ]
        )

    def _methods(self, t: TopicCandidate, para: str) -> str:
        return "\n".join(
            [
                "# 研究方法",
                "",
                f"- 方法组合：{t.methods}",
                f"- 数据来源：{t.data}",
                "- 分析策略：先描述后解释；稳健性与替代解释检查；",
                "- 伦理与数据管理：原始数据只读（data/raw），引用可溯源。",
                "",
            ]
        )

    def _outline(self) -> str:
        kind = self.cfg.artifact_type.value if self.cfg.artifact_type else "journal"
        sections = OUTLINES.get(kind, OUTLINES["journal"])
        lines = [f"# 大纲（{kind}）", ""]
        for i, (title, prefix) in enumerate(sections, 1):
            lines.append(f"{i}. {title}（{prefix}）")
        lines += ["", "> 每章任务拆解见 research/tasks.md 与 .metis/task-state.json"]
        return "\n".join(lines) + "\n"

    # ---------- L007–L012 任务树 ----------
    def build_tasks(
        self, bundle: DesignBundle | None = None, workflow_rules: list | None = None
    ) -> list[Task]:
        bundle = bundle or self.build()
        kind = self.cfg.artifact_type.value if self.cfg.artifact_type else "journal"
        sections = OUTLINES.get(kind, OUTLINES["journal"])
        final_stage_task = PARADIGM_FINAL_TASK.get(
            self.cfg.research_paradigm.value if self.cfg.research_paradigm else "", None
        )

        tasks: list[Task] = []
        prev_last: str | None = None
        for title, prefix in sections:
            section_tasks: list[Task] = []
            n_draft = (
                2 if prefix in ("LIT", "RESULTS", "CH2", "CH4", "BASIS", "CONTENT", "METHOD") else 1
            )
            for i in range(1, n_draft + 1):
                tid = f"T-{prefix}-{i:03d}"
                deps = []
                if i == 1:
                    if prev_last:
                        deps.append(prev_last)
                else:
                    deps.append(f"T-{prefix}-{i - 1:03d}")
                if prefix in ("RESULTS", "CH4", "INNOV", "CONCL") and final_stage_task:
                    deps.append(final_stage_task)  # 结果章依赖实证链完成
                tasks.append(
                    Task(
                        id=tid,
                        stage="S7",
                        section=title,
                        title=f"撰写：{title}" + (f"（{i}/{n_draft}）" if n_draft > 1 else ""),
                        objective=f"完成「{title}」章节写作，内容与已验证结果一致",
                        inputs=[
                            "research/outline.md",
                            "analysis/",
                            "results/",
                            "literature/literature_index.md",
                        ],
                        dependencies=deps,
                        required_skills=["academic-writing"],
                        required_tools=["fs.read", "fs.write"],
                        procedure="writing.section",
                        procedure_params={"section": title, "prefix": prefix, "part": i},
                        expected_outputs=[f"manuscript/sections/{prefix}-{i:03d}.md"],
                        validation="file_nonempty",
                        failure_action="retry",
                    )
                )
                section_tasks.append(tasks[-1])
            prev_last = section_tasks[-1].id

        # 工作流额外规则（如 thesis 的 T16/T17 答辩任务）追加为正式任务
        for rule in workflow_rules or []:
            tasks.append(
                Task(
                    id=rule.id,
                    stage=rule.stage,
                    section=rule.section,
                    title=rule.title,
                    objective=rule.objective or rule.title,
                    inputs=list(rule.inputs),
                    dependencies=list(rule.depends_on),
                    required_skills=[],
                    required_tools=[],
                    procedure=rule.procedure,
                    procedure_params=dict(rule.procedure_params),
                    expected_outputs=list(rule.expected_outputs),
                    validation=rule.validation or "file_nonempty",
                    failure_action=rule.failure_action,
                )
            )

        for t in tasks:
            t.validate()
        self._write("tasks.md", self._render_tasks_md(tasks, bundle))
        self.sm.tasks.load(force=True)
        for t in tasks:
            if t.id not in self.sm.tasks.load():
                self.sm.tasks.upsert(t)
        self.sm.tasks.save()
        return tasks

    @staticmethod
    def _render_tasks_md(tasks: list[Task], bundle: DesignBundle) -> str:
        lines = [f"# 任务树（选题：{bundle.topic.title}）", ""]
        by_section: dict[str, list[Task]] = {}
        for t in tasks:
            by_section.setdefault(t.section, []).append(t)
        for sec, ts in by_section.items():
            lines.append(f"## {sec}")
            for t in ts:
                deps = ",".join(t.dependencies) or "—"
                outs = "; ".join(t.expected_outputs) or "—"
                lines.append(
                    f"- `{t.id}` {t.title}｜依赖: {deps}｜输出: {outs}｜验证: {t.validation}"
                )
            lines.append("")
        return "\n".join(lines) + "\n"

    def _write(self, name: str, content: str) -> None:
        d = self.ws.root / "research"
        d.mkdir(parents=True, exist_ok=True)
        (d / name).write_text(content, encoding="utf-8")

    # ---------- L013–L015 校验 ----------
    @staticmethod
    def validate_tasks(tasks: list[Task]) -> list[str]:
        problems: list[str] = []
        ids = {t.id for t in tasks}
        # 循环依赖
        state: dict[str, int] = {}
        graph = {t.id: [d for d in t.dependencies if d in ids] for t in tasks}

        def visit(nid: str, stack: list[str]) -> None:
            if state.get(nid) == 1:
                problems.append("循环依赖: " + " → ".join(stack + [nid]))
                return
            if state.get(nid) == 2:
                return
            state[nid] = 1
            for dep in graph[nid]:
                visit(dep, stack + [nid])
            state[nid] = 2

        for tid in graph:
            visit(tid, [])
        # 孤立任务（依赖不存在）
        for t in tasks:
            for dep in t.dependencies:
                if dep not in ids:
                    problems.append(f"孤立依赖: {t.id} → {dep}")
        # 无验证任务
        for t in tasks:
            if not t.validation.strip():
                problems.append(f"无验证任务: {t.id}")
            if not t.expected_outputs:
                problems.append(f"无期望输出: {t.id}")
        return problems

    def ready_first(self) -> str | None:
        tasks = self.sm.tasks.all()
        for t in tasks:
            if t.status is TaskStatus.PENDING and not t.dependencies:
                self.sm.tasks.set_status(t.id, "ready")
                return t.id
        return None

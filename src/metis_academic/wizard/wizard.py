"""项目配置向导（Phase F，§6）。

交互顺序：成果类型 → 研究范式 → 成果补充参数（含模板来源/语言/当前状态）
→ 已有材料自动检测 → 确认页（可修改）→ ProjectConfig。
GUI Harness 渲染按钮；文本 Harness 自动退化为编号选项（F013/F014）。
"""

from __future__ import annotations

from dataclasses import dataclass

from ..adapters.base import Choice, HarnessAdapter
from ..errors import ConfigError
from ..logging_setup import get_logger
from ..models import (
    ArtifactType,
    FundConfig,
    JournalConfig,
    Language,
    ProjectConfig,
    ProjectStatus,
    ResearchParadigm,
    StartMode,
    TemplateSource,
    ThesisConfig,
    ThesisLevel,
    WorkspaceRef,
)

logger = get_logger("wizard")

ARTIFACT_CHOICES = [
    Choice(value="fund", label="基金申报书", description="国家/省部级基金等项目申报"),
    Choice(value="journal", label="期刊论文", description="中英文学术期刊投稿"),
    Choice(value="thesis", label="毕业论文", description="本科/硕士/博士学位论文"),
]
PARADIGM_CHOICES = [
    Choice(value="qualitative", label="哲社科定性实证", description="案例/访谈/文本/扎根理论等"),
    Choice(value="quantitative", label="哲社科定量实证", description="统计模型/计量/问卷等"),
    Choice(value="theoretical", label="哲社科理论阐释", description="概念史/理论建构/阐释等"),
]
DEGREE_CHOICES = [
    Choice(value="bachelor", label="本科"),
    Choice(value="master", label="硕士"),
    Choice(value="phd", label="博士"),
]
LANGUAGE_CHOICES = [
    Choice(value="zh-CN", label="中文"),
    Choice(value="en-US", label="英文"),
]
TEMPLATE_SOURCE_CHOICES = [
    Choice(value="user", label="现在上传/指定模板"),
    Choice(value="workspace", label="使用 Workspace 已有模板"),
    Choice(value="default", label="暂无，使用 METIS 默认模板/规范"),
]
START_MODE_CHOICES = [
    Choice(value="from_scratch", label="从零开始"),
    Choice(value="has_topic", label="已有选题"),
    Choice(value="has_data", label="已有数据"),
    Choice(value="has_draft", label="已有草稿"),
    Choice(value="mixed", label="以上多项混合"),
]


@dataclass
class WizardOutcome:
    config: ProjectConfig
    detected: dict
    messages: list[str]


class ProjectWizard:
    """对话式配置向导。adapter 决定 UI 形态，向导本身 Harness 无关。"""

    def __init__(self, adapter: HarnessAdapter):
        self.adapter = adapter

    # ---------- 各屏 ----------
    def choose_artifact(self) -> ArtifactType:
        r = self.adapter.show_choices("请选择成果类型：", ARTIFACT_CHOICES)
        return ArtifactType(r.value)

    def choose_paradigm(self) -> ResearchParadigm:
        r = self.adapter.show_choices("请选择研究范式：", PARADIGM_CHOICES)
        return ResearchParadigm(r.value)

    def choose_language(self, prompt: str = "请选择成果语言：") -> Language:
        r = self.adapter.show_choices(prompt, LANGUAGE_CHOICES)
        return Language(r.value)

    def choose_template_source(self, what: str) -> TemplateSource:
        r = self.adapter.show_choices(f"{what}模板来源：", TEMPLATE_SOURCE_CHOICES)
        return TemplateSource(r.value)

    def choose_start_mode(self, detected: dict) -> StartMode:
        msg = ["请选择当前项目状态："]
        if detected.get("documents") or detected.get("data_files") or detected.get("templates"):
            msg.append(
                f"（自动检测到：文档 {len(detected.get('documents', []))}、"
                f"数据 {len(detected.get('data_files', []))}、"
                f"模板 {len(detected.get('templates', []))}；如与实际不符请手动选择）"
            )
        self.adapter.send_message("\n".join(msg))
        r = self.adapter.show_choices("当前项目状态：", START_MODE_CHOICES)
        return StartMode(r.value)

    def ask_fund_fields(self) -> FundConfig:
        category = self.adapter.ask_text("基金类别（如：国家社科基金青年项目）", default="一般项目")
        src = self.choose_template_source("基金申报书")
        return FundConfig(category=category, template_source=src)

    def ask_journal_fields(self) -> JournalConfig:
        has_target = self.adapter.confirm_action("是否已确定目标期刊？", default=False)
        name = level = None
        if has_target:
            name = self.adapter.ask_text("目标期刊名称", default="")
            level = self.adapter.ask_text("期刊层级（如 CSSCI/SSCI/北大核心）", default="")
        return JournalConfig(target_journal=name, target_level=level)

    def ask_thesis_fields(self) -> ThesisConfig:
        r = self.adapter.show_choices("请选择论文层级：", DEGREE_CHOICES)
        degree = ThesisLevel(r.value)
        src = self.choose_template_source("学校")
        institution = self.adapter.ask_text("学校/机构名称（可留空）", default="")
        return ThesisConfig(
            degree_level=degree, institution=institution or None, template_source=src
        )

    # ---------- 主流程 ----------
    def run(self, project_name_hint: str = "", detected: dict | None = None) -> WizardOutcome:
        detected = detected or {}
        messages: list[str] = []

        artifact = self.choose_artifact()
        paradigm = self.choose_paradigm()

        fund = journal = thesis = None
        if artifact is ArtifactType.FUND:
            fund = self.ask_fund_fields()
            language = Language.ZH_CN
        elif artifact is ArtifactType.JOURNAL:
            language = self.choose_language()
            journal = self.ask_journal_fields()
        else:
            r = self.adapter.show_choices("请选择学位论文语言：", LANGUAGE_CHOICES)
            language = Language(r.value)
            thesis = self.ask_thesis_fields()

        start_mode = self.choose_start_mode(detected)
        name = project_name_hint or self.adapter.ask_text("项目名称", default="我的研究项目")

        cfg = ProjectConfig(
            project_id="",  # 由 command 层生成
            project_name=name,
            artifact_type=artifact,
            research_paradigm=paradigm,
            language=language,
            fund=fund or FundConfig(),
            journal=journal or JournalConfig(),
            thesis=thesis or ThesisConfig(),
            start_mode=start_mode,
            workspace=WorkspaceRef(),
            status=ProjectStatus(current_stage="S0", current_task="", initialized=False),
        )

        # 确认页 + 修改循环（F010/F011）
        while True:
            self.adapter.send_message("请确认项目配置：\n" + cfg.display_summary())
            if self.adapter.confirm_action("确认无误？", default=True):
                break
            cfg = self._modify(cfg)

        return WizardOutcome(config=cfg, detected=detected, messages=messages)

    MODIFY_TARGETS = [
        Choice(value="artifact", label="成果类型"),
        Choice(value="paradigm", label="研究范式"),
        Choice(value="artifact_fields", label="成果补充参数"),
        Choice(value="language", label="语言"),
        Choice(value="start_mode", label="当前项目状态"),
        Choice(value="name", label="项目名称"),
    ]

    def _modify(self, cfg: ProjectConfig) -> ProjectConfig:
        r = self.adapter.show_choices("要修改哪一项？", self.MODIFY_TARGETS)
        if r.value == "artifact":
            cfg.artifact_type = self.choose_artifact()
        elif r.value == "paradigm":
            cfg.research_paradigm = self.choose_paradigm()
        elif r.value == "artifact_fields":
            if cfg.artifact_type is ArtifactType.FUND:
                cfg.fund = self.ask_fund_fields()
            elif cfg.artifact_type is ArtifactType.JOURNAL:
                cfg.journal = self.ask_journal_fields()
            else:
                cfg.thesis = self.ask_thesis_fields()
        elif r.value == "language":
            cfg.language = self.choose_language()
        elif r.value == "start_mode":
            cfg.start_mode = self.choose_start_mode({})
        elif r.value == "name":
            cfg.project_name = self.adapter.ask_text("项目名称", default=cfg.project_name)
        return cfg

    def validate(self, cfg: ProjectConfig) -> None:
        try:
            cfg.validate()
        except ValueError as e:
            raise ConfigError(f"项目配置不完整: {e}") from e

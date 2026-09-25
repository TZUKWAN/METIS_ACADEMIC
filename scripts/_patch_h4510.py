#!/usr/bin/env python3
"""补丁：H4 基金设计语义 / H10-001 变量来自设计 / H5 ModelBackend。"""
from pathlib import Path

# ---------- 1) Composer：基金项目禁用 S5 范式执行链（H4-002/003） ----------
p = Path("src/metis_academic/composer/composer.py")
s = p.read_text(encoding="utf-8")
old = """        wf = WorkflowDefinition(
            composed_from=[n for n, _ in fragments],
            artifact_type=cfg.artifact_type.value if cfg.artifact_type else None,
            research_paradigm=(cfg.research_paradigm.value if cfg.research_paradigm else None),
            language=cfg.language.value if cfg.language else None,
            thesis_level=(cfg.thesis.degree_level.value if cfg.thesis.degree_level else None),
            stages=stages,
            task_rules=task_rules,
            rules=rules,
        )"""
new = """        # H4-002/003：artifact capability policy——基金申报是“研究设计”，
        # 不默认执行未来研究；S5 范式执行链（Q*/QT*/TH*）对 fund 全部禁用，
        # 设计内容由 fund 专用链（F5–F21）承担。
        dropped: list[str] = []
        if cfg.artifact_type is ArtifactType.FUND:
            kept = []
            for r in task_rules:
                if r.stage == "S5":
                    dropped.append(r.id)
                    continue
                kept.append(r)
            task_rules = kept
            rules.setdefault("artifact_policy", {})["fund_design_only"] = True
            rules["artifact_policy"]["disabled_s5_rules"] = dropped

        wf = WorkflowDefinition(
            composed_from=[n for n, _ in fragments],
            artifact_type=cfg.artifact_type.value if cfg.artifact_type else None,
            research_paradigm=(cfg.research_paradigm.value if cfg.research_paradigm else None),
            language=cfg.language.value if cfg.language else None,
            thesis_level=(cfg.thesis.degree_level.value if cfg.thesis.degree_level else None),
            stages=stages,
            task_rules=task_rules,
            rules=rules,
        )"""
assert old in s, "composer anchor"
s = s.replace(old, new)
p.write_text(s, encoding="utf-8")
print("composer fund gate OK")

# ---------- 2) H10-001：runtime 变量必须来自研究设计文件 ----------
p2 = Path("src/metis_academic/runtime.py")
s2 = p2.read_text(encoding="utf-8")
old = '''    def quant_define_vars(task, c):
        """QT1–QT5：以数据字典为基础的确定性变量选择（数据优先原则）。"""
        cols: list[str] = []
        for f in sorted((ws.root / "data" / "metadata").glob("data_dictionary.*.yaml")):
            d = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
            cols += [
                k
                for k, v in (d.get("variables") or {}).items()
                if v.get("type") in ("int", "float")
            ]
        cols = list(dict.fromkeys(cols))
        if not cols:
            raise TaskExecutionError("数据字典无数值变量；请先提供数据")
        dv = "consume" if "consume" in cols else cols[-1]
        iv = "digital" if "digital" in cols else (cols[0] if cols[0] != dv else cols[-1])
        rest = [c for c in cols if c not in (dv, iv)]
        controls = [c for c in rest if c not in ("gender", "mediator")][:3]
        mediators = ["mediator"] if "mediator" in rest else []
        moderators = ["gender"] if "gender" in rest else []'''
new = '''    def quant_define_vars(task, c):
        """H10-001：变量与识别策略必须来自 research/quant-design.yaml
        （研究设计阶段产出 + 用户确认），禁止按字段名自动挑选。"""
        design_file = ws.root / "research" / "quant-design.yaml"
        if not design_file.is_file():
            raise TaskExecutionError(
                "缺少 research/quant-design.yaml（研究设计须显式声明 "
                "outcome/exposure/controls 与识别策略，不能由字段名猜测）")
        design = yaml.safe_load(design_file.read_text(encoding="utf-8")) or {}
        for k in ("outcome", "exposure"):
            if not design.get(k):
                raise TaskExecutionError(f"quant-design.yaml 缺少 {k}")
        dv = str(design["outcome"])
        iv = str(design["exposure"])
        controls = [str(x) for x in design.get("controls", [])]
        mediators = [str(x) for x in design.get("mediators", [])]
        moderators = [str(x) for x in design.get("moderators", [])]
        # 校验设计中的变量在数据字典中存在（数据优先原则）
        cols: list[str] = []
        for f in sorted((ws.root / "data" / "metadata").glob("data_dictionary.*.yaml")):
            d = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
            cols += list((d.get("variables") or {}).keys())
        missing = [v for v in {dv, iv, *controls, *mediators, *moderators} if v not in cols]
        if missing:
            raise TaskExecutionError(f"quant-design.yaml 中变量不存在于数据字典: {missing}")'''
assert old in s2, "quant vars anchor"
s2 = s2.replace(old, new)

# ---------- 3) H5-003：语义任务 fail-closed 挂钩 + writing.section 走后端 ----------
old = '''from .literature import LiteratureManager, SearchQuery'''
new = '''from .literature import LiteratureManager, SearchQuery
from .model_backend import ModelRequest, get_model_backend'''
assert old in s2, "import anchor"
s2 = s2.replace(old, new)

old = '''    def writing_section(task, c):'''
new = '''    def _require_backend(task_type: str):
        """H5-003：语义任务无后端时显式失败（不留假骨架）。"""
        be = get_model_backend()
        if not be.available():
            raise TaskExecutionError(
                f"任务 {task_type} 需要语义模型（ModelBackend 未接入）；"
                "请通过 Harness 接入宿主模型后重试")
        return be

    def writing_section(task, c):'''
assert old in s2, "writing anchor"
s2 = s2.replace(old, new)

old = '''        import re as _re

        rq_ids = _re.findall(r"RQ\\d", asm.read_if_exists("research/research_questions.md"))'''
new = '''        backend = _require_backend("writing.section")
        resp = backend.generate(
            ModelRequest(
                task_type="writing.section",
                prompt=f"撰写章节「{task.procedure_params.get('section', task.section)}」",
                context={"topic": _topic_title(ctx), "task_id": task.id},
            )
        )
        generated = resp.text.strip()
        import re as _re

        rq_ids = _re.findall(r"RQ\\d", asm.read_if_exists("research/research_questions.md"))'''
assert old in s2, "rq anchor"
s2 = s2.replace(old, new)

old = '''        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(f"# {section}\\n\\n" + "\\n".join(body) + "\\n", encoding="utf-8")
        return out'''
new = '''        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(f"# {section}\\n\\n{generated}\\n\\n" + "\\n".join(body) + "\\n", encoding="utf-8")
        return out'''
assert old in s2, "write anchor"
s2 = s2.replace(old, new)
p2.write_text(s2, encoding="utf-8")
print("runtime quant design + backend gate OK")

# ---------- 4) ModelBackend 抽象 ----------
p3 = Path("src/metis_academic/model_backend.py")
if not p3.is_file():
    p3.write_text('''"""ModelBackend 抽象（H5-001/002/003）。

语义级任务（写作/编码/解释）默认 fail-closed：没有接入 ModelBackend 时，
核心运行时不得用固定模板冒充语义完成。Harness 可注入宿主模型实现。
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any


@dataclass
class ModelRequest:
    """一次语义任务请求。"""

    task_type: str              # writing.section / qual.initial_codes / ...
    prompt: str
    context: dict[str, Any] = field(default_factory=dict)
    schema: dict | None = None  # 期望输出 JSON schema（H5-004）


@dataclass
class ModelResponse:
    """模型输出 + 溯源（H5-005）。"""

    text: str = ""
    structured: dict | None = None
    model: str = ""
    provider: str = ""
    request_hash: str = ""


class ModelBackend(ABC):
    """模型后端接口。核心层只依赖此抽象。"""

    name = "abstract"

    @abstractmethod
    def generate(self, request: ModelRequest) -> ModelResponse: ...

    def available(self) -> bool:
        return True


class NoModelBackend(ModelBackend):
    """无后端：语义任务 fail-closed。"""

    name = "none"

    def generate(self, request: ModelRequest) -> ModelResponse:
        raise RuntimeError(
            f"语义任务 {request.task_type} 需要 ModelBackend（宿主模型），"
            "当前未接入；不得以固定模板冒充语义产出")

    def available(self) -> bool:
        return False


class HarnessModelBackend(ModelBackend):
    """宿主代理后端：把语义任务委托给 Harness 的模型调用函数。"""

    name = "harness"

    def __init__(self, delegate, model: str = "host-model", provider: str = "harness"):
        self._delegate = delegate
        self._model = model
        self._provider = provider

    def generate(self, request: ModelRequest) -> ModelResponse:
        import hashlib
        import json

        req_hash = hashlib.sha256(
            json.dumps({"t": request.task_type, "p": request.prompt,
                        "c": request.context}, ensure_ascii=False,
                       sort_keys=True).encode("utf-8")).hexdigest()[:16]
        text, structured = self._delegate(request.task_type, request.prompt,
                                          request.context)
        return ModelResponse(text=text, structured=structured,
                             model=self._model, provider=self._provider,
                             request_hash=req_hash)


_default_backend: ModelBackend = NoModelBackend()


def get_model_backend() -> ModelBackend:
    return _default_backend


def set_model_backend(backend: ModelBackend) -> None:
    global _default_backend
    _default_backend = backend
''')
    print("model_backend created")
else:
    print("model_backend exists")

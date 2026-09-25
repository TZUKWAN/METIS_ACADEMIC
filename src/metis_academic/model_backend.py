"""ModelBackend 抽象（H5-001/002/003）。

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

    task_type: str  # writing.section / qual.initial_codes / ...
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
            "当前未接入；不得以固定模板冒充语义产出"
        )

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
            json.dumps(
                {"t": request.task_type, "p": request.prompt, "c": request.context},
                ensure_ascii=False,
                sort_keys=True,
            ).encode("utf-8")
        ).hexdigest()[:16]
        text, structured = self._delegate(request.task_type, request.prompt, request.context)
        return ModelResponse(
            text=text,
            structured=structured,
            model=self._model,
            provider=self._provider,
            request_hash=req_hash,
        )


_default_backend: ModelBackend = NoModelBackend()


def get_model_backend() -> ModelBackend:
    return _default_backend


def set_model_backend(backend: ModelBackend) -> None:
    global _default_backend
    _default_backend = backend

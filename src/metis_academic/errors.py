"""METIS 统一错误类型。

所有模块抛出的异常都继承 :class:`MetisError`，保证上层 Harness Adapter
能够把错误转成用户可读消息而不是裸 traceback。
"""

from __future__ import annotations


class MetisError(Exception):
    """METIS 基础错误。message 必须是面向用户的中文描述。"""


class ConfigError(MetisError):
    """配置缺失/非法。"""


class WorkspaceError(MetisError):
    """Workspace 建立读写失败。"""


class StateError(MetisError):
    """状态机非法操作（非法阶段迁移、损坏的 state.yaml 等）。"""


class WorkflowError(MetisError):
    """工作流装配/合并失败。"""


class SkillRouterError(MetisError):
    """Skill Registry/Router 失败。"""


class McpRouterError(MetisError):
    """MCP Registry/Router 失败。"""


class LiteratureError(MetisError):
    """文献检索/格式化失败。"""


class ValidationError(MetisError):
    """任务或阶段验证失败（区别于入参校验用 ValueError）。"""


class TaskExecutionError(MetisError):
    """任务执行失败。"""


class DataError(MetisError):
    """数据扫描/导入/处理失败。"""


class TemplateError(MetisError):
    """模板解析/应用失败。"""


class GenerationError(MetisError):
    """成文生成失败。"""


class DeliveryError(MetisError):
    """交付打包失败。"""


class QaBlockedError(MetisError):
    """全局 QA 发现严重错误，禁止交付。"""

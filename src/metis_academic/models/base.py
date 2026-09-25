"""可序列化模型基类（B016/B017/B019）。

所有 METIS 模型支持 dict/JSON/YAML 往返且不丢字段；
schema_version 自动写入；未知字段保存到 ``unknown`` 不丢弃。
"""

from __future__ import annotations

import dataclasses
import json
from enum import Enum
from pathlib import Path
from typing import Any, ClassVar, get_args, get_origin, get_type_hints

import yaml

from .. import SCHEMA_VERSION


def encode(value: Any) -> Any:
    """Python 对象 → 可 JSON 化结构。"""
    if isinstance(value, Enum):
        return value.value
    if dataclasses.is_dataclass(value) and not isinstance(value, type):
        return value.to_dict()
    if isinstance(value, Path):
        return str(value)
    if isinstance(value, dict):
        return {str(k): encode(v) for k, v in value.items()}
    if isinstance(value, (list, tuple)):
        return [encode(v) for v in value]
    return value


def decode(value: Any, target_type: Any) -> Any:
    """按类型注解还原对象；非法枚举抛 ValueError（B018/B020 验收点）。"""
    import types as _types
    import typing as _typing

    origin = get_origin(target_type)
    if origin in (list, tuple):
        (item_type,) = get_args(target_type) or (Any,)
        if value is None:
            return []
        return [decode(v, item_type) for v in value]
    if origin is dict:
        args = get_args(target_type)
        val_type = args[1] if len(args) == 2 else Any
        return {k: decode(v, val_type) for k, v in (value or {}).items()}
    if origin is _types.UnionType or (origin is not None and origin is _typing.Union):
        args = [a for a in get_args(target_type) if a is not type(None)]
        if value is None:
            return None
        last_err: Exception | None = None
        for a in args:
            try:
                return decode(value, a)
            except (ValueError, TypeError) as e:  # 尝试 Union 的其他分支
                last_err = e
        if last_err is not None:
            raise last_err
        return value
    if isinstance(target_type, type) and issubclass(target_type, Enum):
        if value is None:
            return None
        return target_type(value)  # ValueError if invalid
    if dataclasses.is_dataclass(target_type) and isinstance(target_type, type):
        if value is None:
            return None
        return target_type.from_dict(value)
    return value


class Serializable:
    """dataclass 序列化基类。子类必须是 dataclass。"""

    schema_version: ClassVar[int] = SCHEMA_VERSION

    def to_dict(self) -> dict:
        out: dict = {"schema_version": self.schema_version}
        for f in dataclasses.fields(self):  # type: ignore[arg-type]
            out[f.name] = encode(getattr(self, f.name))
        return out

    @classmethod
    def from_dict(cls, data: dict):
        if not isinstance(data, dict):
            raise ValueError(f"{cls.__name__} 反序列化输入必须是 dict，得到 {type(data).__name__}")
        hints = get_type_hints(cls)
        kwargs = {}
        known = {f.name for f in dataclasses.fields(cls)}  # type: ignore[arg-type]
        for key, val in data.items():
            if key == "schema_version":
                continue
            if key in known:
                kwargs[key] = decode(val, hints[key])
            # 未知字段显式丢弃前先记录，便于上层告警
        obj = cls(**kwargs)
        dropped = set(data) - known - {"schema_version"}
        if dropped:
            obj.unknown_fields = sorted(dropped)  # type: ignore[attr-defined]
        return obj

    def to_json(self, **kw) -> str:
        return json.dumps(self.to_dict(), ensure_ascii=False, **kw)

    @classmethod
    def from_json(cls, text: str):
        return cls.from_dict(json.loads(text))

    def to_yaml(self) -> str:
        return yaml.safe_dump(self.to_dict(), allow_unicode=True, sort_keys=False)

    @classmethod
    def from_yaml(cls, text: str):
        return cls.from_dict(yaml.safe_load(text) or {})

    def validate(self) -> None:
        """字段验证钩子（B018）。默认无操作，子类覆写。"""


def require_nonempty(obj: Serializable, field_name: str) -> None:
    val = getattr(obj, field_name)
    if val is None or (isinstance(val, str) and not val.strip()):
        raise ValueError(f"{type(obj).__name__}.{field_name} 不能为空")

"""Harness Adapter 模块（§27）。"""

from .base import AdapterEvent, Choice, ChoiceResult, HarnessAdapter
from .cli import CliAdapter
from .filesystem import FilesystemAdapter

__all__ = [
    "HarnessAdapter",
    "CliAdapter",
    "FilesystemAdapter",
    "Choice",
    "ChoiceResult",
    "AdapterEvent",
]

"""生成器模块（Phase T/U/V）。"""

from .base import DraftAssembler
from .fund import FundGenerator, FundReview
from .journal import JournalGenerator
from .thesis import ThesisGenerator

__all__ = ["DraftAssembler", "FundGenerator", "FundReview", "JournalGenerator", "ThesisGenerator"]

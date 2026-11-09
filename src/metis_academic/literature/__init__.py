"""Literature 模块（Phase J）。"""

from .manager import LiteratureManager
from .models import LiteratureRecord, SearchQuery
from .sources import (
    ArxivSource,
    FixtureSource,
    PaperSearchProSource,
    SourceAdapter,
    format_apa,
    format_bibtex,
    format_gbt7714,
    get_source,
)

__all__ = [
    "LiteratureManager",
    "LiteratureRecord",
    "SearchQuery",
    "SourceAdapter",
    "ArxivSource",
    "PaperSearchProSource",
    "FixtureSource",
    "get_source",
    "format_gbt7714",
    "format_apa",
    "format_bibtex",
]

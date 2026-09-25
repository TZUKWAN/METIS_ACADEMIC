"""LiteratureRecord / SearchQuery（J001/J002，§11 最低字段）。"""

from __future__ import annotations

import re
from dataclasses import dataclass, field

from ..models import Serializable, require_nonempty

_ISO_DATE = re.compile(r"^\d{4}-\d{2}-\d{2}")


@dataclass
class LiteratureRecord(Serializable):
    """单条文献记录。verified=False 的记录禁止进入最终参考文献（J024）。"""

    title: str = ""
    authors: list[str] = field(default_factory=list)
    year: int | None = None
    source: str = ""  # 来源站点 id（arxiv/ncpssd/fixture…）
    doi: str = ""
    url: str = ""
    abstract: str = ""
    keywords: list[str] = field(default_factory=list)
    citation_gbt7714: str = ""
    citation_apa: str = ""
    retrieved_at: str = ""
    verified: bool = False
    verify_url: str = ""  # 核验用的权威 URL（doi.org/arXiv abs）

    def validate(self) -> None:
        require_nonempty(self, "title")
        require_nonempty(self, "source")
        if self.year is not None and not (1900 <= self.year <= 2100):
            raise ValueError(f"非法年份: {self.year}")
        if self.retrieved_at and not _ISO_DATE.match(self.retrieved_at):
            raise ValueError(f"retrieved_at 需为 ISO 日期: {self.retrieved_at}")

    # ---------- 规范化（J011–J015） ----------
    @staticmethod
    def normalize_doi(doi: str) -> str:
        d = (doi or "").strip().lower()
        d = re.sub(r"^https?://(dx\.)?doi\.org/", "", d)
        return d

    @staticmethod
    def normalize_title(title: str) -> str:
        t = (title or "").lower().strip()
        t = re.sub(r"[\s\W_]+", "", t, flags=re.UNICODE)
        return t

    @staticmethod
    def normalize_author(name: str) -> str:
        """作者规范化：去空白；「姓 名」/「Last, First」保留原序但规整分隔。"""
        n = re.sub(r"\s+", " ", (name or "").strip())
        return n

    @staticmethod
    def normalize_year(raw) -> int | None:
        if raw is None:
            return None
        m = re.search(r"(19|20)\d{2}", str(raw))
        return int(m.group(0)) if m else None

    def dedupe_key(self) -> tuple[str, str]:
        return (self.normalize_doi(self.doi), self.normalize_title(self.title))

    def is_similar_to(self, other: LiteratureRecord) -> bool:
        """DOI 相同或标题键相同视为重复。"""
        a, b = self.dedupe_key(), other.dedupe_key()
        if a[0] and b[0]:
            return a[0] == b[0]
        return a[1] != "" and a[1] == b[1]


@dataclass
class SearchQuery(Serializable):
    """检索查询对象。"""

    terms: str = ""
    sources: list[str] = field(default_factory=lambda: list(DEFAULT_SOURCES))
    max_results: int = 20
    year_from: int | None = None
    year_to: int | None = None
    language: str = ""  # zh/en/空=不限

    def validate(self) -> None:
        require_nonempty(self, "terms")
        if self.max_results <= 0:
            raise ValueError("max_results 必须为正")
        for s in self.sources:
            if s not in ALL_SOURCES:
                raise ValueError(f"未知数据源: {s}；允许 {sorted(ALL_SOURCES)}")


DEFAULT_SOURCES = ("ncpssd", "chinaxiv", "sinoxiv", "paper.edu.cn", "arxiv", "scholar", "web")
ALL_SOURCES = set(DEFAULT_SOURCES) | {"fixture"}

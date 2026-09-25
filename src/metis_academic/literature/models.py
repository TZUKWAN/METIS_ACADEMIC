"""LiteratureRecord / SearchQuery（J001/J002，§11 最低字段）。

H2 整改后：
- ``verification`` 为五态：unverified / resolved / verified / conflict / unreachable
- ``verification_info`` 记录 resolver、时间、canonical metadata 与匹配依据
- ``verified`` 保留为兼容只读属性（= verification=="verified"），不再可写
- URL 前缀等“形式特征”不能自动置 verified（H2-005）
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from enum import Enum

from ..models import Serializable, require_nonempty

_ISO_DATE = re.compile(r"^\d{4}-\d{2}-\d{2}")


def _bigrams(s: str) -> set[str]:
    """字符 bigram 集合（独立函数帧，避免内联推导的名字解析问题）。"""
    out: set[str] = set()
    for i in range(len(s) - 1):
        out.add(s[i : i + 2])
    return out


class VerificationStatus(str, Enum):
    """核验状态（H2-003）。"""

    UNVERIFIED = "unverified"  # 尚未核验
    RESOLVED = "resolved"  # 权威源可达但元数据未匹配/不完整
    VERIFIED = "verified"  # resolver 元数据匹配通过
    CONFLICT = "conflict"  # 权威源元数据与记录冲突
    UNREACHABLE = "unreachable"  # 权威源不可达（离线/网络失败）


class EntryType(str, Enum):
    """文献类型（H2-013）。"""

    JOURNAL = "journal"
    BOOK = "book"
    CHAPTER = "chapter"
    WEB = "web"
    PREPRINT = "preprint"
    THESIS = "thesis"


@dataclass
class VerificationInfo(Serializable):
    """核验依据（H2-004）：每条 verified 都能解释为什么。"""

    resolver: str = ""  # crossref-doi / arxiv-api / fixture(test only) / manual
    at: str = ""  # ISO 时间
    canonical: dict = field(default_factory=dict)  # 权威源元数据（title/authors/year…）
    match_evidence: str = ""  # 匹配说明，如 "title similarity 0.97; year 2023==2023"

    def to_dict(self) -> dict:
        return {
            "resolver": self.resolver,
            "at": self.at,
            "canonical": self.canonical,
            "match_evidence": self.match_evidence,
        }

    @classmethod
    def from_dict(cls, data: dict) -> VerificationInfo:
        data = dict(data)
        data.pop("schema_version", None)
        return cls(**data)


@dataclass
class LiteratureRecord(Serializable):
    """单条文献记录。

    只有 ``verification == VERIFIED``（带 ``verification_info``）的记录
    才允许进入最终参考文献（J024 / H2-008 / H2-010）。
    """

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
    entry_type: EntryType = EntryType.WEB
    verification: VerificationStatus = VerificationStatus.UNVERIFIED
    verification_info: VerificationInfo = field(default_factory=VerificationInfo)
    record_id: str = ""  # 稳定唯一 id（bib key 同源，H2-016）

    # ---- 兼容层（旧字段） ----
    @property
    def verified(self) -> bool:
        return self.verification is VerificationStatus.VERIFIED

    @verified.setter
    def verified(self, value: bool) -> None:
        """兼容旧调用（fixture/测试）。真实核验请走 LiteratureManager.verify_doi/arxiv。"""
        if value:
            if self.verification is not VerificationStatus.VERIFIED:
                self.verification = VerificationStatus.VERIFIED
                if self.verification_info.resolver == "":
                    self.verification_info = VerificationInfo(
                        resolver="legacy-flag", match_evidence="compat: verified=True set directly"
                    )
        elif self.verification is VerificationStatus.VERIFIED:
            self.verification = VerificationStatus.UNVERIFIED

    @property
    def verify_url(self) -> str:
        if self.doi:
            return f"https://doi.org/{self.doi}"
        return self.url

    @verify_url.setter
    def verify_url(self, value: str) -> None:
        if value.startswith("https://doi.org/"):
            self.doi = value.rsplit("/", 1)[-1]

    def to_dict(self) -> dict:
        return {
            "schema_version": self.schema_version,
            "title": self.title,
            "authors": list(self.authors),
            "year": self.year,
            "source": self.source,
            "doi": self.doi,
            "url": self.url,
            "abstract": self.abstract,
            "keywords": list(self.keywords),
            "citation_gbt7714": self.citation_gbt7714,
            "citation_apa": self.citation_apa,
            "retrieved_at": self.retrieved_at,
            "entry_type": self.entry_type.value,
            "verification": self.verification.value,
            "verification_info": self.verification_info.to_dict(),
            "record_id": self.record_id,
        }

    @classmethod
    def from_dict(cls, data: dict) -> LiteratureRecord:
        data = dict(data)
        data.pop("schema_version", None)
        # 旧格式兼容：verified: bool → verification（legacy 记录带 resolver 依据）
        if "verified" in data and "verification" not in data:
            legacy = bool(data.pop("verified"))
            data["verification"] = "verified" if legacy else "unverified"
            if legacy:
                data["verification_info"] = data.get("verification_info") or {
                    "resolver": "legacy-flag",
                    "match_evidence": "compat: legacy verified=True",
                }
        if "verify_url" in data:
            vu = data.pop("verify_url") or ""
            if vu.startswith("https://doi.org/") and not data.get("doi"):
                data["doi"] = vu.rsplit("/", 1)[-1]
        if isinstance(data.get("entry_type"), str):
            data["entry_type"] = EntryType(data["entry_type"])
        if isinstance(data.get("verification"), str):
            data["verification"] = VerificationStatus(data["verification"])
        if isinstance(data.get("verification_info"), dict):
            data["verification_info"] = VerificationInfo.from_dict(data["verification_info"])
        known = {f.name for f in cls.__dataclass_fields__.values()}  # type: ignore[attr-defined]
        return cls(**{k: v for k, v in data.items() if k in known})

    def validate(self) -> None:
        require_nonempty(self, "title")
        require_nonempty(self, "source")
        if self.year is not None and not (1900 <= self.year <= 2100):
            raise ValueError(f"非法年份: {self.year}")
        if self.retrieved_at and not _ISO_DATE.match(self.retrieved_at):
            raise ValueError(f"retrieved_at 需为 ISO 日期: {self.retrieved_at}")
        if (
            self.verification is VerificationStatus.VERIFIED
            and self.verification_info.resolver == ""
        ):
            raise ValueError("verified 记录必须有 verification_info.resolver（H2-004）")

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
        return re.sub(r"\s+", " ", (name or "").strip())

    @staticmethod
    def normalize_year(raw) -> int | None:
        if raw is None:
            return None
        m = re.search(r"(19|20)\d{2}", str(raw))
        return int(m.group(0)) if m else None

    def dedupe_key(self) -> tuple[str, str]:
        return (self.normalize_doi(self.doi), self.normalize_title(self.title))

    def title_similarity(self, other: LiteratureRecord) -> float:
        """粗粒度标题相似度（字符 bigram Jaccard），用于 fuzzy 去重（H2-012）。"""
        a = self.normalize_title(self.title)
        b = other.normalize_title(other.title)
        if not a or not b:
            return 0.0
        ga = _bigrams(a)
        gb = _bigrams(b)
        union = ga | gb
        return len(ga & gb) / len(union) if union else 0.0

    def is_similar_to(self, other: LiteratureRecord) -> bool:
        """DOI 相同或标题键完全相同视为重复（fuzzy 相似走低置信度流程）。"""
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

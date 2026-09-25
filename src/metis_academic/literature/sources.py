"""文献数据源适配器（J003–J010）。

统一接口：``search(query: SearchQuery) -> list[LiteratureRecord]``。
- arXiv：真实公开 API（Atom XML）。
- NCPSSD / ChinaXiv / SinoXiv / Paper.edu.cn / Scholar：接口适配层，
  默认 HTTP 尝试失败（无网络/无渲染能力）时记录原因并返回空——
  绝不伪造记录（§31.4–31.7）。
- fixture：本地 JSON 记录（测试/离线演示），仅测试环境启用。
- web：通用 Web fallback 接口。
"""

from __future__ import annotations

import json
import re
import xml.etree.ElementTree as ET
from abc import ABC, abstractmethod
from datetime import datetime, timezone
from pathlib import Path

import requests

from ..errors import LiteratureError
from ..logging_setup import get_logger
from .models import LiteratureRecord, SearchQuery

logger = get_logger("literature")

_TIMEOUT = 20
_ARXIV_API = "https://export.arxiv.org/api/query"
_ATOM = "{http://www.w3.org/2005/Atom}"


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class SourceAdapter(ABC):
    """数据源抽象（J003）。"""

    id: str = "abstract"

    @abstractmethod
    def search(self, query: SearchQuery) -> list[LiteratureRecord]:
        """返回真实检索结果；无网络/无能力时返回空列表并记录日志。"""

    # ---- 公共工具 ----
    def _make_record(self, **kw) -> LiteratureRecord:
        kw.setdefault("source", self.id)
        kw.setdefault("retrieved_at", _now())
        rec = LiteratureRecord(**kw)
        rec.citation_gbt7714 = format_gbt7714(rec)
        rec.citation_apa = format_apa(rec)
        return rec


class ArxivSource(SourceAdapter):
    """arXiv 官方 API（真实可用）。"""

    id = "arxiv"

    def search(self, query: SearchQuery) -> list[LiteratureRecord]:
        try:
            resp = requests.get(
                _ARXIV_API,
                params={
                    "search_query": f"all:{query.terms}",
                    "start": 0,
                    "max_results": min(query.max_results, 50),
                    "sortBy": "relevance",
                },
                timeout=_TIMEOUT,
            )
            resp.raise_for_status()
        except requests.RequestException as e:
            logger.warning("arXiv 检索失败（记录后返回空）: %s", e)
            return []
        root = ET.fromstring(resp.content)
        out: list[LiteratureRecord] = []
        for entry in root.findall(f"{_ATOM}entry"):
            title = (entry.findtext(f"{_ATOM}title") or "").strip().replace("\n", " ")
            url = (entry.findtext(f"{_ATOM}id") or "").strip()
            abstract = (entry.findtext(f"{_ATOM}summary") or "").strip()
            authors = [
                a.findtext(f"{_ATOM}name", "").strip() for a in entry.findall(f"{_ATOM}author")
            ]
            published = entry.findtext(f"{_ATOM}published") or ""
            year = LiteratureRecord.normalize_year(published)
            arxiv_id = url.rsplit("/", 1)[-1] if url else ""
            rec = self._make_record(
                title=title,
                authors=authors,
                year=year,
                url=url,
                abstract=abstract,
                keywords=[],
                verify_url=url or f"https://arxiv.org/abs/{arxiv_id}",
            )
            if query.year_from and rec.year and rec.year < query.year_from:
                continue
            out.append(rec)
        return out


class HttpRequestSource(SourceAdapter):
    """中文平台适配基类：平台无开放 API 时诚实降级。

    子类提供 search_url 与 parse；HTTP 失败或反爬拦截时返回空列表，
    由上层改走「人工/浏览器通道」，绝不生成假记录。
    """

    id = "http-base"
    search_url: str = ""

    def search(self, query: SearchQuery) -> list[LiteratureRecord]:  # noqa: ARG002
        if not self.search_url:
            return []
        try:
            resp = requests.get(
                self.search_url,
                params={"q": query.terms},
                timeout=_TIMEOUT,
                headers={"User-Agent": "METIS-Academic/0.1"},
            )
            resp.raise_for_status()
        except requests.RequestException as e:
            logger.warning("%s 检索不可达（%s）；如需该来源请配置浏览器通道或代理", self.id, e)
            return []
        return self.parse(resp.text, query)

    def parse(self, html: str, query: SearchQuery) -> list[LiteratureRecord]:  # noqa: ARG002
        return []


class NcpssdSource(HttpRequestSource):
    """国家哲学社会科学文献中心 (https://www.ncpssd.org/)。"""

    id = "ncpssd"
    search_url = "https://www.ncpssd.org/Literature/list"


class ChinaxivSource(HttpRequestSource):
    """ChinaXiv (https://chinaxiv.org/home.htm)。"""

    id = "chinaxiv"
    search_url = "https://chinaxiv.org/search.htm"


class SinoxivSource(HttpRequestSource):
    """SinoXiv (https://sinoxiv.napstic.cn/)。"""

    id = "sinoxiv"
    search_url = "https://sinoxiv.napstic.cn/search"


class PaperEduSource(HttpRequestSource):
    """中国科技论文在线 (https://www.paper.edu.cn/)。"""

    id = "paper.edu.cn"
    search_url = "https://www.paper.edu.cn/releasepaper/search"


class ScholarSource(SourceAdapter):
    """Google Scholar：无官方 API；作为接口占位，默认走 web fallback。"""

    id = "scholar"

    def search(self, query: SearchQuery) -> list[LiteratureRecord]:
        logger.info("scholar 无公开 API；请通过 browser 通道检索 %r", query.terms)
        return []


class WebFallbackSource(SourceAdapter):
    """通用 Web fallback（J010）：依赖已配置的搜索 MCP 工具，核心层不直接联网。"""

    id = "web"

    def __init__(self, search_fn=None):
        self._search_fn = search_fn  # Callable[[SearchQuery], list[LiteratureRecord]]

    def search(self, query: SearchQuery) -> list[LiteratureRecord]:
        if self._search_fn is None:
            logger.info("web fallback 未配置搜索函数，跳过")
            return []
        return self._search_fn(query)


class FixtureSource(SourceAdapter):
    """测试/离线夹具源：从 JSON 文件读取记录。

    夹具记录是合成测试数据（O024 同类约定），仅用于离线管线验证，
    不代表真实文献。verified 字段以夹具声明为准。
    """

    id = "fixture"

    def __init__(self, fixture_path: str | Path):
        self.path = Path(fixture_path)
        if not self.path.is_file():
            raise LiteratureError(f"fixture 文件不存在: {self.path}")

    def search(self, query: SearchQuery) -> list[LiteratureRecord]:
        data = json.loads(self.path.read_text(encoding="utf-8"))
        out = []
        for d in data:
            if query.terms.lower() not in json.dumps(d, ensure_ascii=False).lower():
                continue
            d = dict(d)
            d.setdefault("source", self.id)
            d.setdefault("retrieved_at", _now())
            rec = LiteratureRecord.from_dict(d)
            rec.citation_gbt7714 = format_gbt7714(rec)
            rec.citation_apa = format_apa(rec)
            out.append(rec)
            if len(out) >= query.max_results:
                break
        if not out:
            # 夹具语料很小：无关键词命中时返回全库（保证管线可用）
            for d in data:
                d2 = dict(d)
                d2.setdefault("source", self.id)
                d2.setdefault("retrieved_at", _now())
                rec = LiteratureRecord.from_dict(d2)
                rec.citation_gbt7714 = format_gbt7714(rec)
                rec.citation_apa = format_apa(rec)
                out.append(rec)
                if len(out) >= query.max_results:
                    break
        return out


def get_source(source_id: str, **kw) -> SourceAdapter:
    registry: dict[str, type[SourceAdapter]] = {
        "arxiv": ArxivSource,
        "ncpssd": NcpssdSource,
        "chinaxiv": ChinaxivSource,
        "sinoxiv": SinoxivSource,
        "paper.edu.cn": PaperEduSource,
        "scholar": ScholarSource,
        "web": WebFallbackSource,
        "fixture": FixtureSource,
    }
    cls = registry.get(source_id)
    if cls is None:
        raise LiteratureError(f"未知数据源: {source_id}")
    return cls(**kw)


# ---------------- 引用格式化（J018/J019/J020） ----------------


def _authors_str(authors: list[str], max_authors: int = 3) -> str:
    authors = [LiteratureRecord.normalize_author(a) for a in authors if a.strip()]
    if not authors:
        return "佚名" if False else "Anonymous"
    if len(authors) <= max_authors:
        return ", ".join(authors)
    return (
        ", ".join(authors[:max_authors]) + " 等"
        if _has_cjk(authors)
        else ", ".join(authors[:max_authors]) + " et al."
    )


def _has_cjk(items: list[str]) -> bool:
    return any(re.search(r"[\u4e00-\u9fff]", x) for x in items)


def format_gbt7714(rec: LiteratureRecord) -> str:
    """GB/T 7714-2015 简化格式：作者. 题名[文献类型]. 出版年. URL."""
    a = _authors_str(rec.authors)
    year = rec.year or "n.d."
    tail = f". {rec.url}" if rec.url else ""
    doi = f". DOI: {rec.doi}" if rec.doi else ""
    return f"{a}. {rec.title}[EB/OL]. {year}{doi}{tail}."


def format_apa(rec: LiteratureRecord) -> str:
    """APA 7 简化格式。"""
    authors = [LiteratureRecord.normalize_author(a) for a in rec.authors if a.strip()]
    if not authors:
        a = rec.title
    elif len(authors) == 1:
        a = authors[0]
    else:
        a = ", ".join(authors[:-1]) + ", & " + authors[-1]
    year = rec.year or "n.d."
    url = f" Retrieved from {rec.url}" if rec.url else ""
    return f"{a} ({year}). {rec.title}.{url}"


def format_bibtex(rec: LiteratureRecord, key: str | None = None) -> str:
    """BibTeX 输出（J020）。"""
    key = key or _bib_key(rec)
    author = (
        " and ".join(LiteratureRecord.normalize_author(a) for a in rec.authors if a.strip())
        or "Anonymous"
    )
    fields = [
        f"  title = {{{rec.title}}}",
        f"  author = {{{author}}}",
        f"  year = {{{rec.year or ''}}}",
    ]
    if rec.url:
        fields.append(f"  url = {{{rec.url}}}")
    if rec.doi:
        fields.append(f"  doi = {{{rec.doi}}}")
    if rec.abstract:
        fields.append(f"  abstract = {{{rec.abstract[:300]}}}")
    return f"@misc{{{key},\n" + ",\n".join(fields) + ",\n}"


def _bib_key(rec: LiteratureRecord) -> str:
    first = re.sub(
        r"[^A-Za-z\u4e00-\u9fff]",
        "",
        (rec.authors[0] if rec.authors else "anon").split()[-1] if rec.authors else "anon",
    )
    return f"{first or 'anon'}{rec.year or 'nd'}{LiteratureRecord.normalize_title(rec.title)[:12]}"

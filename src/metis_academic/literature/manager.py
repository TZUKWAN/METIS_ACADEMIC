"""文献检索编排（J012–J017/J021–J024）：去重、核验、索引与日志。"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

import yaml

from ..logging_setup import get_logger
from ..workspace import WorkspaceManager
from .models import LiteratureRecord, SearchQuery
from .sources import format_bibtex, get_source

logger = get_logger("literature")


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class LiteratureManager:
    """面向 Workspace 的文献检索管理器。

    - 结果去重（DOI 优先、标题次之）
    - verified 标记：只有能给出权威核验 URL 且来源声明的记录才可信
    - 未验证记录禁止进入最终参考文献（J024）
    """

    def __init__(self, ws: WorkspaceManager, source_kwargs: dict | None = None):
        self.ws = ws
        self._source_kwargs = source_kwargs or {}
        self.records: dict[str, LiteratureRecord] = {}  # key: dedupe 标题键

    # ---------- 检索 ----------
    def search(self, query: SearchQuery) -> list[LiteratureRecord]:
        query.validate()
        collected: list[LiteratureRecord] = []
        per_source_counts: dict[str, int] = {}
        for sid in query.sources:
            try:
                src = get_source(sid, **self._source_kwargs.get(sid, {}))
            except Exception as e:  # noqa: BLE001 — 单源失败不阻断
                logger.warning("数据源 %s 初始化失败: %s", sid, e)
                per_source_counts[sid] = 0
                continue
            try:
                found = src.search(query)
            except Exception as e:  # noqa: BLE001
                logger.warning("数据源 %s 检索失败: %s", sid, e)
                found = []
            found = found[: query.max_results]
            per_source_counts[sid] = len(found)
            collected.extend(found)
        added = self._ingest(collected)
        self._write_search_log(query, per_source_counts, len(added))
        self.write_index()
        logger.info("检索 %r：新增 %d 条（累计 %d）", query.terms, len(added), len(self.records))
        return added

    def _ingest(self, records: list[LiteratureRecord]) -> list[LiteratureRecord]:
        added = []
        for rec in records:
            rec.validate()
            # arXiv/给出权威 URL 的记录自动核验可达性声明（verified 保守置 True 的
            # 条件：来源自带 verify_url 且为官方域）
            if rec.verify_url and not rec.verified:
                rec.verified = self._auto_verifiable(rec)
            dup = self.find_duplicate(rec)
            if dup is not None:
                # 合并补充字段，不重复收录
                if not dup.abstract and rec.abstract:
                    dup.abstract = rec.abstract
                if not dup.doi and rec.doi:
                    dup.doi = rec.doi
                continue
            self.records[LiteratureRecord.normalize_title(rec.title)] = rec
            added.append(rec)
        self._write_bib()
        return added

    @staticmethod
    def _auto_verifiable(rec: LiteratureRecord) -> bool:
        trusted = ("https://arxiv.org/abs/", "https://doi.org/")
        return any(rec.verify_url.startswith(p) for p in trusted)

    def find_duplicate(self, rec: LiteratureRecord) -> LiteratureRecord | None:
        for existing in self.records.values():
            if existing.is_similar_to(rec):
                return existing
        return None

    # ---------- 持久化（J021/J022/J020） ----------
    def _literature_dir(self) -> Path:
        d = self.ws.root / "literature"
        d.mkdir(parents=True, exist_ok=True)
        return d

    def write_index(self) -> None:
        lines = [
            "# 文献索引",
            "",
            f"> 更新时间：{_now()}；共 {len(self.records)} 条"
            f"（已核验 {sum(1 for r in self.records.values() if r.verified)} 条）",
            "",
            "| # | 标题 | 作者 | 年份 | 来源 | DOI/URL | verified |",
            "|---|---|---|---|---|---|---|",
        ]
        for i, rec in enumerate(
            sorted(self.records.values(), key=lambda r: (r.year or 0, r.title)), 1
        ):
            link = rec.doi or rec.url
            authors = "; ".join(rec.authors[:3])
            lines.append(
                f"| {i} | {rec.title} | {authors} | {rec.year or ''} "
                f"| {rec.source} | {link} | {'✓' if rec.verified else '✗'} |"
            )
        (self._literature_dir() / "literature_index.md").write_text(
            "\n".join(lines) + "\n", encoding="utf-8"
        )

    def _write_bib(self) -> None:
        entries = [format_bibtex(rec) for rec in self.records.values()]
        (self._literature_dir() / "references.bib").write_text(
            "% METIS 参考文献库（BibTeX）\n\n" + "\n\n".join(entries) + "\n", encoding="utf-8"
        )

    def _write_search_log(self, query: SearchQuery, counts: dict[str, int], added: int) -> None:
        log_dir = self._literature_dir() / "search_logs"
        log_dir.mkdir(parents=True, exist_ok=True)
        safe = "".join(c if c.isalnum() or c in "-_" else "_" for c in query.terms)[:40]
        payload = {
            "at": _now(),
            "terms": query.terms,
            "sources": query.sources,
            "counts_per_source": counts,
            "added": added,
            "total_in_library": len(self.records),
        }
        (log_dir / f"{safe}.yaml").write_text(
            yaml.safe_dump(payload, allow_unicode=True, sort_keys=False), encoding="utf-8"
        )

    # ---------- 核验（J023/J024） ----------
    def verify_record(self, title_substring: str, reachable: bool) -> bool:
        """人工/浏览器核验回填：设置 verified。"""
        for rec in self.records.values():
            if title_substring.lower() in rec.title.lower():
                rec.verified = reachable
                if reachable and not rec.verify_url:
                    rec.verify_url = rec.url
                self.write_index()
                self._write_bib()
                return rec.verified
        return False

    def verified_records(self) -> list[LiteratureRecord]:
        """最终参考文献只允许 verified 记录（J024）。"""
        return sorted(
            [r for r in self.records.values() if r.verified], key=lambda r: (r.year or 0, r.title)
        )

    def unverified_records(self) -> list[LiteratureRecord]:
        return sorted(
            [r for r in self.records.values() if not r.verified],
            key=lambda r: (r.year or 0, r.title),
        )

    # ---------- 导出 ----------
    def export_json(self) -> str:
        return json.dumps(
            [r.to_dict() for r in self.records.values()], ensure_ascii=False, indent=1
        )

    def load_json(self, text: str) -> None:
        for d in json.loads(text):
            rec = LiteratureRecord.from_dict(d)
            self.records[LiteratureRecord.normalize_title(rec.title)] = rec

    def citation(self, rec: LiteratureRecord, style: str = "gbt7714") -> str:
        if style == "apa":
            return rec.citation_apa
        return rec.citation_gbt7714

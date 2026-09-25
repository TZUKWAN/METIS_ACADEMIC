"""文献检索编排（J012–J017/J021–J024）：去重、核验、索引与日志。"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

import yaml

from ..logging_setup import get_logger
from ..workspace import WorkspaceManager
from .models import LiteratureRecord, SearchQuery, VerificationStatus
from .sources import _set_verification, format_apa, format_bibtex, format_gbt7714, get_source

logger = get_logger("literature")


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class LiteratureManager:
    """面向 Workspace 的文献检索管理器。

    - 结果去重（DOI 优先、标题次之）
    - verified 标记：只有能给出权威核验 URL 且来源声明的记录才可信
    - 未验证记录禁止进入最终参考文献（J024）
    """

    RECORDS_FILE = "records.jsonl"

    def __init__(
        self, ws: WorkspaceManager, source_kwargs: dict | None = None, load_persisted: bool = True
    ):
        self.ws = ws
        self._source_kwargs = source_kwargs or {}
        self.records: dict[str, LiteratureRecord] = {}  # key: dedupe 标题键
        if load_persisted:
            self.load_records()  # H2-002：重启自动恢复
        self._assign_record_ids()

    # ---------- 稳定唯一 id / bib key（H2-016） ----------
    def _assign_record_ids(self) -> None:
        used: dict[str, int] = {}
        for rec in self.records.values():
            rid = self._stable_id(rec)
            n = used.get(rid, 0)
            used[rid] = n + 1
            rec.record_id = rid if n == 0 else f"{rid}{chr(96 + n)}"

    @staticmethod
    def _stable_id(rec: LiteratureRecord) -> str:
        import re as _re

        first = _re.sub(r"\W", "", (rec.authors[0] if rec.authors else "anon"))[:12] or "anon"
        return f"{first}{rec.year or 'nd'}{LiteratureRecord.normalize_title(rec.title)[:12]}"

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
        """收录：来源发现不产生核验（H2-005）；合并保留 provenance、冲突显式化。"""
        added = []
        for rec in records:
            rec.validate()
            dup = self.find_duplicate(rec)
            if dup is not None:
                self._merge(dup, rec)
                continue
            self.records[LiteratureRecord.normalize_title(rec.title)] = rec
            added.append(rec)
        self._assign_record_ids()
        self.save_records()
        self.write_index()
        self._write_bib()  # 刷新引用串后如需完全一致可再保存一次
        self.save_records()
        return added

    def _merge(self, dup: LiteratureRecord, rec: LiteratureRecord) -> None:
        """同 DOI/同题合并：补缺失字段；同 DOI 但元数据冲突 → conflict。"""
        for f in ("abstract", "doi", "url"):
            if not getattr(dup, f) and getattr(rec, f):
                setattr(dup, f, getattr(rec, f))
        for a in rec.authors:
            if a not in dup.authors:
                dup.authors.append(a)
        if (
            dup.doi
            and rec.doi
            and (LiteratureRecord.normalize_doi(dup.doi) == LiteratureRecord.normalize_doi(rec.doi))
        ):
            year_conflict = bool(dup.year and rec.year and dup.year != rec.year)
            title_sim = dup.title_similarity(rec)
            if year_conflict or title_sim < 0.5:
                dup.verification = VerificationStatus.CONFLICT
                dup.verification_info.match_evidence = (
                    f"merge conflict: title sim={title_sim:.2f}, years {dup.year}/{rec.year}"
                )
        if rec.source and rec.source not in dup.source:
            dup.source = f"{dup.source}+{rec.source}"  # 多源 provenance（H3-017）

    def fuzzy_duplicates(self, threshold: float = 0.85) -> list[tuple[str, str, float]]:
        """低置信度重复对（H2-012）：只报告，不自动合并。"""
        out = []
        recs = list(self.records.values())
        for i in range(len(recs)):
            for j in range(i + 1, len(recs)):
                sim = recs[i].title_similarity(recs[j])
                if threshold > sim >= 0.70:
                    out.append((recs[i].record_id, recs[j].record_id, round(sim, 3)))
        return out

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
        """最终 references.bib 只写 verified 记录（H2-008，J024 真正成立）。"""
        entries = []
        for rec in self.verified_records():
            rec.citation_gbt7714 = format_gbt7714(rec)
            rec.citation_apa = format_apa(rec)
            entries.append(format_bibtex(rec, key=rec.record_id or None))
        (self._literature_dir() / "references.bib").write_text(
            "% METIS 参考文献库（BibTeX，仅含已核验记录）\n\n" + "\n\n".join(entries) + "\n",
            encoding="utf-8",
        )

    # ---------- records.jsonl 机器可读持久化（H2-001） ----------
    def save_records(self) -> None:
        d = self._literature_dir()
        with open(d / self.RECORDS_FILE, "w", encoding="utf-8") as f:
            for rec in self.records.values():
                f.write(json.dumps(rec.to_dict(), ensure_ascii=False) + "\n")

    def load_records(self) -> int:
        f = self._literature_dir() / self.RECORDS_FILE
        if not f.is_file():
            return 0
        n = 0
        for line in f.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line:
                continue
            rec = LiteratureRecord.from_dict(json.loads(line))
            self.records[LiteratureRecord.normalize_title(rec.title)] = rec
            n += 1
        return n

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
        """人工/浏览器核验回填（manual resolver，留依据 H2-004）。"""
        for rec in self.records.values():
            if title_substring.lower() in rec.title.lower():
                if reachable:
                    _set_verification(
                        rec,
                        "manual",
                        "verified",
                        {"title": rec.title, "url": rec.url},
                        "manual/browser confirmation",
                    )
                else:
                    rec.verification = VerificationStatus.UNVERIFIED
                self.save_records()
                self.write_index()
                self._write_bib()
                return rec.verified
        return False

    def verify_all_online(self) -> dict[str, int]:
        """批量执行 DOI/arXiv resolver（H2-006/H2-007）；离线→unreachable。"""
        from .sources import verify_arxiv, verify_doi

        stats: dict[str, int] = {}
        for rec in list(self.records.values()):
            if rec.verification is VerificationStatus.VERIFIED:
                continue
            if rec.doi:
                verify_doi(rec)
            elif "/abs/" in rec.url:
                verify_arxiv(rec)
            else:
                continue
            stats[rec.verification.value] = stats.get(rec.verification.value, 0) + 1
        self.save_records()
        self.write_index()
        self._write_bib()
        return stats

    def verified_records(self) -> list[LiteratureRecord]:
        """最终参考文献只允许 verification==VERIFIED 的记录（J024/H2-008）。"""
        return sorted(
            [r for r in self.records.values() if r.verification is VerificationStatus.VERIFIED],
            key=lambda r: (r.year or 0, r.title),
        )

    def unverified_records(self) -> list[LiteratureRecord]:
        """未核验视图：可查看/继续核验，不进入 final citation pool（H2-009）。"""
        return sorted(
            [r for r in self.records.values() if r.verification is not VerificationStatus.VERIFIED],
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

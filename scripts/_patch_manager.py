#!/usr/bin/env python3
"""一次性补丁：manager.py 升级（H2-001/002/005/008/011/012/016/009）。"""
from pathlib import Path

p = Path("src/metis_academic/literature/manager.py")
s = p.read_text(encoding="utf-8")

# 1) __init__ 自动加载 + 稳定 id
old = '''    def __init__(self, ws: WorkspaceManager, source_kwargs: dict | None = None):
        self.ws = ws
        self._source_kwargs = source_kwargs or {}
        self.records: dict[str, LiteratureRecord] = {}  # key: dedupe 标题键'''
new = '''    RECORDS_FILE = "records.jsonl"

    def __init__(self, ws: WorkspaceManager, source_kwargs: dict | None = None,
                 load_persisted: bool = True):
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

        first = _re.sub(r"\\W", "", (rec.authors[0] if rec.authors else "anon"))[:12] or "anon"
        return f"{first}{rec.year or 'nd'}{LiteratureRecord.normalize_title(rec.title)[:12]}"'''
assert old in s, "init anchor"
s = s.replace(old, new)

# 2) _ingest：去 auto-verify、加合并冲突规则
old = '''    def _ingest(self, records: list[LiteratureRecord]) -> list[LiteratureRecord]:
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
        return any(rec.verify_url.startswith(p) for p in trusted)'''
new = '''    def _ingest(self, records: list[LiteratureRecord]) -> list[LiteratureRecord]:
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
        self._write_bib()
        return added

    def _merge(self, dup: LiteratureRecord, rec: LiteratureRecord) -> None:
        """同 DOI/同题合并：补缺失字段；同 DOI 但元数据冲突 → conflict。"""
        for f in ("abstract", "doi", "url"):
            if not getattr(dup, f) and getattr(rec, f):
                setattr(dup, f, getattr(rec, f))
        for a in rec.authors:
            if a not in dup.authors:
                dup.authors.append(a)
        if dup.doi and rec.doi and (LiteratureRecord.normalize_doi(dup.doi)
                                    == LiteratureRecord.normalize_doi(rec.doi)):
            year_conflict = bool(dup.year and rec.year and dup.year != rec.year)
            title_sim = dup.title_similarity(rec)
            if year_conflict or title_sim < 0.5:
                dup.verification = VerificationStatus.CONFLICT
                dup.verification_info.match_evidence = (
                    f"merge conflict: title sim={title_sim:.2f}, "
                    f"years {dup.year}/{rec.year}")
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
        return out'''
assert old in s, "ingest anchor"
s = s.replace(old, new)

# 3) verified-only bib + records.jsonl 持久化
old = '''    def _write_bib(self) -> None:
        entries = [format_bibtex(rec) for rec in self.records.values()]
        (self._literature_dir() / "references.bib").write_text(
            "% METIS 参考文献库（BibTeX）\\n\\n" + "\\n\\n".join(entries) + "\\n", encoding="utf-8"
        )'''
new = '''    def _write_bib(self) -> None:
        """最终 references.bib 只写 verified 记录（H2-008，J024 真正成立）。"""
        entries = []
        for rec in self.verified_records():
            rec.citation_gbt7714 = format_gbt7714(rec)
            rec.citation_apa = format_apa(rec)
            entries.append(format_bibtex(rec, key=rec.record_id or None))
        (self._literature_dir() / "references.bib").write_text(
            "% METIS 参考文献库（BibTeX，仅含已核验记录）\\n\\n"
            + "\\n\\n".join(entries) + "\\n", encoding="utf-8")

    # ---------- records.jsonl 机器可读持久化（H2-001） ----------
    def save_records(self) -> None:
        d = self._literature_dir()
        with open(d / self.RECORDS_FILE, "w", encoding="utf-8") as f:
            for rec in self.records.values():
                f.write(json.dumps(rec.to_dict(), ensure_ascii=False) + "\\n")

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
        return n'''
assert old in s, "bib anchor"
s = s.replace(old, new)

# 4) verified_records / unverified_records 按状态
old = '''    def verified_records(self) -> list[LiteratureRecord]:
        """最终参考文献只允许 verified 记录（J024）。"""
        return sorted(
            [r for r in self.records.values() if r.verified], key=lambda r: (r.year or 0, r.title)
        )

    def unverified_records(self) -> list[LiteratureRecord]:
        return sorted(
            [r for r in self.records.values() if not r.verified],
            key=lambda r: (r.year or 0, r.title),
        )'''
new = '''    def verified_records(self) -> list[LiteratureRecord]:
        """最终参考文献只允许 verification==VERIFIED 的记录（J024/H2-008）。"""
        return sorted(
            [r for r in self.records.values()
             if r.verification is VerificationStatus.VERIFIED],
            key=lambda r: (r.year or 0, r.title))

    def unverified_records(self) -> list[LiteratureRecord]:
        """未核验视图：可查看/继续核验，不进入 final citation pool（H2-009）。"""
        return sorted(
            [r for r in self.records.values()
             if r.verification is not VerificationStatus.VERIFIED],
            key=lambda r: (r.year or 0, r.title))'''
assert old in s, "views anchor"
s = s.replace(old, new)

# 5) verify_record manual resolver + 批量在线核验
old = '''    def verify_record(self, title_substring: str, reachable: bool) -> bool:
        """人工/浏览器核验回填：设置 verified。"""
        for rec in self.records.values():
            if title_substring.lower() in rec.title.lower():
                rec.verified = reachable
                if reachable and not rec.verify_url:
                    rec.verify_url = rec.url
                self.write_index()
                self._write_bib()
                return rec.verified
        return False'''
new = '''    def verify_record(self, title_substring: str, reachable: bool) -> bool:
        """人工/浏览器核验回填（manual resolver，留依据 H2-004）。"""
        for rec in self.records.values():
            if title_substring.lower() in rec.title.lower():
                if reachable:
                    _set_verification(rec, "manual", "verified",
                                      {"title": rec.title, "url": rec.url},
                                      "manual/browser confirmation")
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
        return stats'''
assert old in s, "verify anchor"
s = s.replace(old, new)

# 6) imports
old = "from .models import LiteratureRecord, SearchQuery"
new = "from .models import LiteratureRecord, SearchQuery, VerificationStatus"
assert old in s
s = s.replace(old, new)
old = "from .sources import format_bibtex, get_source"
new = ("from .sources import (_set_verification, format_apa, format_bibtex,\n"
       "                      format_gbt7714, get_source)")
assert old in s
s = s.replace(old, new)

p.write_text(s, encoding="utf-8")
print("manager patched OK")

"""Data Manager（Phase M，§15）。

数据顺序：扫描已有 → data/raw → 询问用户 → METIS 检索公开数据 → 记录缺口。
raw 层只读；interim/processed 分层；全部登记 hash 与来源，可追溯。
metis-data（https://github.com/TZUKWAN/metis-data）预留接口。
"""

from __future__ import annotations

import csv
import re
import shutil
from collections.abc import Callable
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import yaml

from ..errors import DataError
from ..logging_setup import get_logger
from ..workspace import WorkspaceManager, file_sha256

logger = get_logger("data")

FORMAT_BY_EXT = {
    ".csv": "csv",
    ".tsv": "tsv",
    ".xlsx": "excel",
    ".xls": "excel",
    ".dta": "stata",
    ".sav": "spss",
    ".parquet": "parquet",
    ".json": "json",
    ".jsonl": "jsonl",
    ".txt": "text",
    ".docx": "docx-text",
    ".pdf": "pdf-text",
    ".md": "md-text",
}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


@dataclass
class DataFileEntry:
    path: str
    fmt: str
    sha256: str
    bytes: int
    origin: str  # existing | user | download | generated
    source_url: str = ""
    registered_at: str = ""

    def to_dict(self) -> dict:
        return self.__dict__.copy()


class DataManager:
    def __init__(self, ws: WorkspaceManager):
        self.ws = ws
        self.meta_dir = ws.root / "data" / "metadata"
        self.meta_dir.mkdir(parents=True, exist_ok=True)
        self.inventory_file = self.meta_dir / "inventory.yaml"
        self.sources_file = self.meta_dir / "data_sources.md"
        self._entries: dict[str, DataFileEntry] = {}
        self._load_inventory()

    # ---------- 清单持久化 ----------
    def _load_inventory(self) -> None:
        if self.inventory_file.is_file():
            data = yaml.safe_load(self.inventory_file.read_text(encoding="utf-8")) or {}
            for d in data.get("files", []):
                e = DataFileEntry(**d)
                self._entries[e.path] = e

    def save(self) -> None:
        payload = {"updated_at": _now(), "files": [e.to_dict() for e in self._entries.values()]}
        self.inventory_file.write_text(
            yaml.safe_dump(payload, allow_unicode=True, sort_keys=False), encoding="utf-8"
        )

    # ---------- 扫描（M001–M004） ----------
    def scan_existing(self) -> list[DataFileEntry]:
        found: list[DataFileEntry] = []
        for sub in ("inputs/existing-data", "data/raw"):
            d = self.ws.root / sub
            if not d.is_dir():
                continue
            for f in sorted(d.rglob("*")):
                if not f.is_file() or f.name.startswith("."):
                    continue
                found.append(self.register_file(f, origin="existing"))
        return found

    def detect_format(self, path: Path) -> str:
        return FORMAT_BY_EXT.get(path.suffix.lower(), "unknown")

    def register_file(
        self, path: Path, origin: str = "user", source_url: str = ""
    ) -> DataFileEntry:
        path = Path(path)
        if not path.is_file():
            raise DataError(f"数据文件不存在: {path}")
        rel = str(path.relative_to(self.ws.root)).replace("\\", "/")
        entry = DataFileEntry(
            path=rel,
            fmt=self.detect_format(path),
            sha256=file_sha256(path),
            bytes=path.stat().st_size,
            origin=origin,
            source_url=source_url,
            registered_at=_now(),
        )
        old = self._entries.get(rel)
        if old and old.sha256 != entry.sha256 and old.origin == "existing" and origin != "existing":
            # raw 只读策略（M011）：已有数据被改动 → 报错提示
            raise DataError(f"raw 数据被改动（hash 不一致）: {rel}")
        self._entries[rel] = entry
        self.save()
        return entry

    # ---------- 数据来源与字典（M005/M006） ----------
    def record_source(self, name: str, url: str, note: str = "") -> None:
        with open(self.sources_file, "a", encoding="utf-8") as f:
            f.write(f"- **{name}** — {url} {('# ' + note) if note else ''}（登记于 {_now()}）\n")

    def build_dictionary(self, path: Path, variables: dict[str, Any] | None = None) -> Path:
        """为 csv/xlsx 生成数据字典；非表格数据写入变量说明。"""
        out = self.meta_dir / f"data_dictionary.{path.stem}.yaml"
        desc: dict[str, Any] = {
            "file": str(path.relative_to(self.ws.root)).replace("\\", "/"),
            "generated_at": _now(),
            "variables": {},
        }
        if variables is not None:
            desc["variables"] = variables
        elif self.detect_format(path) in ("csv", "tsv"):
            sep = "\t" if self.detect_format(path) == "tsv" else ","
            with open(path, encoding="utf-8-sig", newline="") as f:
                reader = csv.reader(f, delimiter=sep)
                header = next(reader, [])
                first = next(reader, [])
            desc["variables"] = {
                col: {"type": self._guess_type(val), "note": ""}
                for col, val in zip(header, first, strict=False)
            } or {}
        else:
            desc["variables"] = {}
        out.write_text(yaml.safe_dump(desc, allow_unicode=True, sort_keys=False), encoding="utf-8")
        return out

    @staticmethod
    def _guess_type(sample: str) -> str:
        s = (sample or "").strip()
        if re.fullmatch(r"-?\d+", s):
            return "int"
        if re.fullmatch(r"-?\d+\.\d+", s):
            return "float"
        return "string"

    # ---------- 下载/URL（M007/M010） ----------
    def register_url(
        self, name: str, url: str, fetch: Callable[[str, Path], None] | None = None
    ) -> DataFileEntry:
        """登记并下载用户提供 URL 的数据到 data/raw。

        ``fetch(url, dest)`` 可注入（测试/自定义下载器）；默认用 requests。
        """
        fname = re.sub(r"[^A-Za-z0-9._-]+", "_", name) or "download"
        if not Path(fname).suffix:
            url_suffix = Path(url.split("?")[0]).suffix
            if url_suffix:
                fname += url_suffix
        dest = self.ws.root / "data" / "raw" / fname
        if dest.exists():
            raise DataError(f"raw 层只读：同名文件已存在 {fname}")
        dest.parent.mkdir(parents=True, exist_ok=True)
        if fetch is None:
            import requests

            def _fetch(u: str, d: Path) -> None:
                resp = requests.get(u, timeout=60)
                resp.raise_for_status()
                d.write_bytes(resp.content)

            fetch = _fetch
        log_dir = self.meta_dir / "downloads"
        log_dir.mkdir(parents=True, exist_ok=True)
        try:
            fetch(url, dest)
        except Exception as e:
            if dest.exists():
                dest.unlink()
            (log_dir / f"{fname}.log").write_text(
                f"url={url}\nat={_now()}\nstatus=failed\nerror={e}\n", encoding="utf-8"
            )
            raise DataError(f"下载数据失败: {e}") from e
        (log_dir / f"{fname}.log").write_text(
            f"url={url}\nat={_now()}\nstatus=ok\nfile={dest.name}\n", encoding="utf-8"
        )
        self.record_source(name, url, "用户提供的 URL")
        return self.register_file(dest, origin="download", source_url=url)

    # ---------- 公开数据搜索（M008/M009） ----------
    def search_public(self, terms: str, metis_data_index: dict | None = None) -> list[dict]:
        """在已知公开数据源索引中检索（M009 预留 metis-data 接口）。

        ``metis_data_index`` 形如 {"datasets": [{"name":..., "url":..., "note":...}]}。
        离线/无索引时返回空并提示缺口，不伪造数据源。
        """
        if not metis_data_index:
            logger.info("metis-data 索引未配置；请用户提供数据或配置索引")
            return []
        return [d for d in metis_data_index.get("datasets", []) if terms.lower() in json_lower(d)]

    # ---------- 分层（M012/M013） ----------
    def to_interim(self, src: Path, name: str) -> Path:
        return self._advance(src, "data/interim", name, "interim")

    def to_processed(self, src: Path, name: str) -> Path:
        return self._advance(src, "data/processed", name, "generated")

    def _advance(self, src: Path, layer: str, name: str, origin: str) -> Path:
        dest = self.ws.root / layer / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(src, dest)
        self.register_file(dest, origin=origin, source_url=f"derived:{src.name}")
        return dest

    # ---------- 缺口（M014） ----------
    def missing_report(self, required_variables: list[str]) -> list[str]:
        """对照数据字典检查所需变量是否可得。"""
        available: set[str] = set()
        for f in self.meta_dir.glob("data_dictionary.*.yaml"):
            data = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
            available |= set((data.get("variables") or {}).keys())
        return [v for v in required_variables if v not in available]

    def files(self) -> list[DataFileEntry]:
        return list(self._entries.values())


def json_lower(d: Any) -> str:
    import json

    return json.dumps(d, ensure_ascii=False).lower()

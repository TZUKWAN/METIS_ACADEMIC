"""Artifact 注册与版本（T3.4 引擎域逻辑）。

持久化：`.metis/artifacts.jsonl`（append-only）。
逻辑名（name）→ 版本链：register 建 v1；new_version 追加 v(n+1)；
lineage 返回全版本历史（不覆盖旧版本——图表重画的版本语义与此一致）。
"""

from __future__ import annotations

import hashlib
import json
import re
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path

from .errors import DataError


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def _sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def slugify(name: str) -> str:
    s = re.sub(r"[^\w\u4e00-\u9fff-]+", "-", name.strip()).strip("-").lower()
    return s or "artifact"


@dataclass
class ArtifactEntry:
    name: str            # 逻辑名（slug）
    version: int
    path: str            # 相对 workspace
    kind: str            # file|figure|table|document|data|slide|report
    sha256: str
    task_id: str = ""
    registered_at: str = ""
    note: str = ""


class ArtifactRegistry:
    def __init__(self, ws_root: str | Path):
        self.ws_root = Path(ws_root)
        self.file = self.ws_root / ".metis" / "artifacts.jsonl"

    def _load(self) -> list[ArtifactEntry]:
        if not self.file.is_file():
            return []
        out = []
        for line in self.file.read_text(encoding="utf-8").splitlines():
            if line.strip():
                out.append(ArtifactEntry(**json.loads(line)))
        return out

    def _append(self, entry: ArtifactEntry) -> None:
        self.file.parent.mkdir(parents=True, exist_ok=True)
        with open(self.file, "a", encoding="utf-8") as f:
            f.write(json.dumps(asdict(entry), ensure_ascii=False) + "\n")

    def _resolve(self, path_rel: str) -> Path:
        p = (self.ws_root / path_rel).resolve()
        try:
            p.relative_to(self.ws_root.resolve())
        except ValueError:
            raise DataError(f"artifact 路径越界: {path_rel}") from None
        if not p.is_file():
            raise DataError(f"artifact 文件不存在: {path_rel}")
        return p

    def register(self, name: str, path: str, kind: str = "file",
                 task_id: str = "", note: str = "") -> ArtifactEntry:
        if self.lineage(slugify(name)):
            raise DataError(f"artifact 已存在: {name}（用 new_version 追加版本）")
        return self._add(slugify(name), 1, path, kind, task_id, note)

    def new_version(self, name: str, path: str, note: str = "",
                    task_id: str = "") -> ArtifactEntry:
        sid = slugify(name)
        history = self.lineage(sid)
        if not history:
            raise DataError(f"artifact 不存在: {name}（先 register）")
        return self._add(sid, history[-1].version + 1, path, history[-1].kind,
                         task_id, note)

    def _add(self, sid: str, version: int, path: str, kind: str,
             task_id: str, note: str) -> ArtifactEntry:
        p = self._resolve(path)
        if kind not in ("file", "figure", "table", "document", "data", "slide", "report"):
            raise DataError(f"非法 artifact kind: {kind}")
        entry = ArtifactEntry(name=sid, version=version,
                              path=str(p.relative_to(self.ws_root)).replace("\\", "/"),
                              kind=kind, sha256=_sha256(p), task_id=task_id,
                              registered_at=_now(), note=note)
        self._append(entry)
        return entry

    def list(self) -> list[ArtifactEntry]:
        """每个逻辑名的最新版本（按名字排序）。"""
        latest: dict[str, ArtifactEntry] = {}
        for e in self._load():
            if e.name not in latest or e.version > latest[e.name].version:
                latest[e.name] = e
        return sorted(latest.values(), key=lambda e: e.name)

    def lineage(self, name: str) -> list[ArtifactEntry]:
        sid = slugify(name)
        return sorted([e for e in self._load() if e.name == sid],
                      key=lambda e: e.version)

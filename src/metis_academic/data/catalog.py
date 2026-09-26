"""metis-data provider 目录桥接（T5.1）。

数据来源：docs/plugin-migration/adopted/metis-data-providers.catalog.yaml
（复制自 TZUKWAN/metis-data @ 38bd2ec 的 providers.catalog.yaml，84 providers 实数据；
 详见 docs/plugin-migration/DATA_ADOPTION.md）。本模块只读该目录提供
 「到哪里找数据」的真实指引；运行时抓取仍走用户 URL / 人工通道。
"""

from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

import yaml

CATALOG_PATH = (
    Path(__file__).resolve().parents[3]
    / "docs"
    / "plugin-migration"
    / "adopted"
    / "metis-data-providers.catalog.yaml"
)


@dataclass
class CatalogProvider:
    provider_id: str
    name: str
    homepage: str
    category: str
    trust_class: str
    licenses: list
    terms_url: str
    capabilities: dict


@lru_cache(maxsize=1)
def load_catalog(catalog_path: str | None = None) -> list[CatalogProvider]:
    path = Path(catalog_path) if catalog_path else CATALOG_PATH
    if not path.is_file():
        return []
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    out = []
    for p in data.get("providers", []):
        out.append(
            CatalogProvider(
                provider_id=p.get("provider_id", ""),
                name=p.get("name", ""),
                homepage=p.get("homepage", ""),
                category=p.get("category", ""),
                trust_class=p.get("trust_class", ""),
                licenses=list(p.get("licenses") or []),
                terms_url=p.get("terms_url", ""),
                capabilities=dict(p.get("capabilities") or {}),
            )
        )
    return out


def match(terms: str, catalog_path: str | None = None) -> list[CatalogProvider]:
    """按关键词匹配 provider（id/name/category 大小写不敏感子串）。"""
    t = terms.lower()
    hits = []
    for p in load_catalog(catalog_path):
        hay = " ".join([p.provider_id, p.name, p.category]).lower()
        if t in hay or t in p.provider_id:
            hits.append(p)
    return hits


def as_search_index(catalog_path: str | None = None) -> dict:
    """转成 DataManager.search_public 的 metis_data_index 兼容格式。"""
    return {
        "datasets": [
            {
                "name": p.name,
                "provider_id": p.provider_id,
                "homepage": p.homepage,
                "terms_url": p.terms_url,
                "license": (p.licenses[0] if p.licenses else "UNKNOWN"),
            }
            for p in load_catalog(catalog_path)
        ]
    }

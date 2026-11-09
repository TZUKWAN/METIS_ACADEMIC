# METIS vendor record: paper-search-pro

- Upstream: https://github.com/O0000-code/paper-search-pro
- Pinned commit: b551d741d0408b2beb8d5a0f023adb3fc8ec23b7
- Vendored scope: scripts/*.py, scripts/requirements*.txt, assets/default_config.yaml, and upstream license notices.
- Integration: METIS invokes the upstream `agent_search` module through `metis_academic.literature.sources.PaperSearchProSource`; the upstream report/UI/assets are intentionally excluded because METIS persists its own literature records and audit artifacts.
- License: Apache-2.0; see LICENSE.txt, NOTICE.md, and THIRD_PARTY.md.

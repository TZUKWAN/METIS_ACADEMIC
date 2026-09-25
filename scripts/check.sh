#!/usr/bin/env bash
# METIS ACADEMIC 统一验收入口：格式化 → lint → 全量测试
cd "$(dirname "$0")/.." || exit 1
ruff check --fix -q src tests scripts 2>/dev/null
ruff format -q src tests scripts
ruff check src tests scripts || exit 1
python -m pytest -q 2>&1 | tail -1
exit ${PIPESTATUS[0]}

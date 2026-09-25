"""Workspace 协议（§3）标准目录常量（C001）。"""

from __future__ import annotations

METIS_DIR = ".metis"
PROJECT_YAML = "project.yaml"
STATE_YAML = "state.yaml"
WORKFLOW_YAML = "workflow.yaml"
TASK_STATE_JSON = "task-state.json"
SKILL_REGISTRY_YAML = "skill-registry.yaml"
MCP_REGISTRY_YAML = "mcp-registry.yaml"
EVIDENCE_JSONL = "evidence.jsonl"
LOGS_DIR = "logs"

#: Workspace 标准子目录（相对 root），全部幂等创建
STANDARD_DIRS: tuple[str, ...] = (
    f"{METIS_DIR}/{LOGS_DIR}",
    "inputs/templates",
    "inputs/user-files",
    "inputs/existing-data",
    "literature/papers",
    "literature/notes",
    "literature/search_logs",
    "topics",
    "research",
    "data/raw",
    "data/interim",
    "data/processed",
    "data/metadata",
    "code/src",
    "code/notebooks",
    "code/tests",
    "analysis/qualitative",
    "analysis/quantitative",
    "analysis/theoretical",
    "figures",
    "tables",
    "results",
    "manuscript",
    "slides",
    "templates",
    "reviews",
    "deliverables",
)

#: 标准空文件（相对 root，创建时若不存在则写入占位说明）
STANDARD_FILES: dict[str, str] = {
    "literature/literature_index.md": "# 文献索引\n\n> 由 METIS 文献检索模块维护。\n",
    "literature/references.bib": "% METIS 参考文献库（BibTeX）\n",
    "data/README.md": "# 数据目录\n\nraw/ 原始数据（只读）；interim/ 中间数据；processed/ 分析用最终数据。\n",
    "code/run_all.py": "# 由 Reproducibility 模块生成（见 metis_academic.repro）\n",
    "code/requirements.txt": "# 由 Reproducibility 模块在分析执行时锁定\n",
}

DATA_META_DIR = "data/metadata"

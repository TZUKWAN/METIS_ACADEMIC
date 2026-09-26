"""插件结构完整性测试（T1.2 复测口径；PLUGIN_SPEC §2 校验规则）。"""

from __future__ import annotations

import json
from pathlib import Path

import pytest

PLUGIN_ROOT = Path(__file__).resolve().parents[2] / "metis"


def test_plugin_json_valid():
    data = json.loads((PLUGIN_ROOT / "plugin.json").read_text(encoding="utf-8"))
    assert data["name"] == "metis"
    assert "-" not in data["name"]  # kebab-case（单词也合法）
    assert data["version"].count(".") == 2
    assert data["capabilities"]["mcp"] is True  # T3.2 起：真实 MCP 服务器


def test_plugin_entry_paths_exist():
    data = json.loads((PLUGIN_ROOT / "plugin.json").read_text(encoding="utf-8"))
    for rel in data["entry"].values():
        rels = rel if isinstance(rel, list) else [rel]
        for r in rels:
            p = PLUGIN_ROOT / r
            assert p.exists(), f"入口缺失: {r}"


def test_capabilities_match_directories():
    data = json.loads((PLUGIN_ROOT / "plugin.json").read_text(encoding="utf-8"))
    caps = data["capabilities"]
    cmds = list((PLUGIN_ROOT / "commands").glob("*.md"))
    agents = list((PLUGIN_ROOT / "agents").glob("*.md"))
    skills = list((PLUGIN_ROOT / "skills").glob("*"))
    assert len(cmds) >= len(caps["commands"])
    assert len(agents) >= len(caps["agents"])
    assert len(skills) >= len(caps["skills"])


def test_claude_code_mirror_consistent():
    mirror = json.loads(
        (PLUGIN_ROOT / ".claude-plugin" / "plugin.json").read_text(encoding="utf-8")
    )
    root = json.loads((PLUGIN_ROOT / "plugin.json").read_text(encoding="utf-8"))
    assert mirror["name"] == root["name"]
    assert mirror["version"] == root["version"]


@pytest.mark.parametrize(
    "rel",
    [
        "skills/metis/SKILL.md",
        "commands/metis.md",
        "commands/metis-resume.md",
        "commands/metis-deliver.md",
        "mcp/metis-server.py",
        "mcp/mcp-http-gateway.py",
        ".mcp.json",
        "agents/metis-executor.md",
    ],
)
def test_required_components_exist(rel):
    assert (PLUGIN_ROOT / rel).is_file(), rel

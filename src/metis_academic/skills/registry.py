"""Skill Registry 加载（H003）与技能内容接口（H001/H002）。"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

import yaml

from ..errors import SkillRouterError
from ..logging_setup import get_logger
from ..models import SkillMetadata
from .defaults import default_skill_registry

logger = get_logger("skills")


def _default_skill_defs_dir() -> Path:
    bundled = Path(__file__).resolve().parents[1] / "skill_defs"
    if bundled.is_dir():
        return bundled
    return Path(__file__).resolve().parents[3] / "skills"


REPO_SKILLS_DIR = _default_skill_defs_dir()


@dataclass
class SkillContent:
    """加载后的技能内容：元数据 + 指令文本（挂到上下文用）。"""

    meta: SkillMetadata
    instructions: str = ""


def repo_skill_path(skill_id: str) -> Path:
    return REPO_SKILLS_DIR / skill_id


class SkillRegistry:
    """workspace ``.metis/skill-registry.yaml`` 的加载与保存。"""

    def __init__(self, skills: list[SkillMetadata] | None = None):
        self.skills: list[SkillMetadata] = (
            skills if skills is not None else default_skill_registry()
        )

    @classmethod
    def load_workspace(cls, ws_metis_dir: str | Path) -> SkillRegistry:
        f = Path(ws_metis_dir) / "skill-registry.yaml"
        if not f.is_file():
            return cls()
        data = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
        try:
            skills = [SkillMetadata.from_dict(d) for d in data.get("skills", [])]
        except ValueError as e:
            raise SkillRouterError(f"skill-registry.yaml 非法: {e}") from e
        return cls(skills)

    def save(self, ws_metis_dir: str | Path) -> None:
        f = Path(ws_metis_dir) / "skill-registry.yaml"
        f.parent.mkdir(parents=True, exist_ok=True)
        f.write_text(
            yaml.safe_dump(
                {"skills": [s.to_dict() for s in self.skills]}, allow_unicode=True, sort_keys=False
            ),
            encoding="utf-8",
        )

    def get(self, skill_id: str) -> SkillMetadata:
        for s in self.skills:
            if s.id == skill_id:
                return s
        raise SkillRouterError(f"未注册的技能: {skill_id}")

    def ids(self) -> list[str]:
        return [s.id for s in self.skills]


def load_skill_content(skill_id: str) -> SkillContent:
    """读取仓库内技能说明（不存在则返回仅元数据内容）。"""
    d = repo_skill_path(skill_id)
    meta_file = d / "SKILL.yaml"
    if meta_file.is_file():
        meta = SkillMetadata.from_dict(yaml.safe_load(meta_file.read_text(encoding="utf-8")))
    else:
        reg = SkillRegistry()
        meta = reg.get(skill_id)
    instr_file = d / "INSTRUCTIONS.md"
    text = instr_file.read_text(encoding="utf-8") if instr_file.is_file() else ""
    return SkillContent(meta=meta, instructions=text)

"""Workspace Manager（Phase C）。

每个项目一个标准目录（§3）；所有状态/任务/产物必须持久化到此目录。
重复初始化不得破坏已有文件（幂等），写入默认原子+防覆盖。
"""

from __future__ import annotations

import hashlib
import json
import os
import shutil
import tempfile
from datetime import datetime, timezone
from pathlib import Path

import yaml

from ..errors import WorkspaceError
from ..logging_setup import get_logger
from ..models import Evidence, ProjectConfig, WorkflowDefinition, WorkspaceRef
from .layout import (
    DATA_META_DIR,
    EVIDENCE_JSONL,
    METIS_DIR,
    PROJECT_YAML,
    STANDARD_DIRS,
    STANDARD_FILES,
    STATE_YAML,
    TASK_STATE_JSON,
    WORKFLOW_YAML,
)

logger = get_logger("workspace")

DOC_EXTS = {".md", ".txt", ".docx", ".doc", ".pdf", ".rtf", ".odt"}
DATA_EXTS = {
    ".csv",
    ".xlsx",
    ".xls",
    ".dta",
    ".sav",
    ".parquet",
    ".json",
    ".jsonl",
    ".tsv",
    ".db",
    ".sqlite",
}
TEMPLATE_HINTS = ("模板", "template", "申报书模板", "学位论文模板", "论文模板")
DRAFT_HINTS = ("草稿", "初稿", "draft", "manuscript")


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def file_sha256(path: str | Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


class WorkspaceManager:
    """标准 Workspace 的建立、读写、扫描。Harness 无关。"""

    def __init__(self, root: str | Path):
        self.root = Path(root).resolve()

    # ---------- 路径 ----------
    @property
    def metis_dir(self) -> Path:
        return self.root / METIS_DIR

    def metis_file(self, name: str) -> Path:
        return self.metis_dir / name

    def resolve(self, rel: str | Path) -> Path:
        """相对 workspace 的路径 → 绝对路径；拒绝逃逸出 root。"""
        p = (self.root / rel).resolve()
        try:
            p.relative_to(self.root)
        except ValueError:
            raise WorkspaceError(f"路径越界: {rel}") from None
        return p

    # ---------- 存在/建立 ----------
    def exists(self) -> bool:
        """判断是否已有 METIS 项目（C002）。"""
        return self.metis_file(PROJECT_YAML).is_file()

    def create(self, project: ProjectConfig | None = None) -> None:
        """一键建立标准 Workspace（C003/C004/C005），幂等不破坏已有文件。"""
        try:
            for d in STANDARD_DIRS:
                (self.root / d).mkdir(parents=True, exist_ok=True)
            for rel, content in STANDARD_FILES.items():
                f = self.root / rel
                if not f.exists():
                    f.write_text(content, encoding="utf-8")
            for name in (STATE_YAML, TASK_STATE_JSON, EVIDENCE_JSONL):
                f = self.metis_file(name)
                if not f.exists():
                    f.parent.mkdir(parents=True, exist_ok=True)
                    f.write_text(
                        ""
                        if name != TASK_STATE_JSON
                        else json.dumps(
                            {"tasks": {}, "schema_version": 1}, ensure_ascii=False, indent=1
                        ),
                        encoding="utf-8",
                    )
        except OSError as e:
            raise WorkspaceError(f"建立 Workspace 失败: {e}") from e
        if project is not None:
            self.write_project(project)
        logger.info("workspace ready: %s", self.root)

    # ---------- project.yaml（C006） ----------
    def write_project(self, project: ProjectConfig) -> None:
        project.workspace.root = str(self.root)
        project.validate()
        self.safe_write(self.metis_file(PROJECT_YAML), project.to_yaml(), overwrite=True)

    def read_project(self) -> ProjectConfig:
        f = self.metis_file(PROJECT_YAML)
        if not f.is_file():
            raise WorkspaceError(f"未找到 {PROJECT_YAML}，不是 METIS 项目: {self.root}")
        try:
            return ProjectConfig.from_yaml(f.read_text(encoding="utf-8"))
        except ValueError as e:
            raise WorkspaceError(f"project.yaml 损坏: {e}") from e

    # ---------- state.yaml（C007，schema 由 StateManager 定义） ----------
    def write_state(self, state: dict) -> None:
        self.safe_write(
            self.metis_file(STATE_YAML),
            yaml.safe_dump(state, allow_unicode=True, sort_keys=False),
            overwrite=True,
        )

    def read_state(self) -> dict:
        f = self.metis_file(STATE_YAML)
        if not f.is_file():
            return {}
        return yaml.safe_load(f.read_text(encoding="utf-8")) or {}

    # ---------- workflow.yaml（C008） ----------
    def write_workflow(self, wf: WorkflowDefinition) -> None:
        wf.validate()
        self.safe_write(self.metis_file(WORKFLOW_YAML), wf.to_yaml(), overwrite=True)

    def read_workflow(self) -> WorkflowDefinition:
        f = self.metis_file(WORKFLOW_YAML)
        if not f.is_file():
            raise WorkspaceError("workflow.yaml 不存在，项目尚未装配工作流")
        return WorkflowDefinition.from_yaml(f.read_text(encoding="utf-8"))

    # ---------- task-state.json（C009） ----------
    def write_task_state(self, tasks: list | dict) -> None:
        if isinstance(tasks, dict):
            payload = tasks
        else:
            payload = {"schema_version": 1, "tasks": {t.id: t.to_dict() for t in tasks}}
        self.safe_write(
            self.metis_file(TASK_STATE_JSON),
            json.dumps(payload, ensure_ascii=False, indent=1),
            overwrite=True,
        )

    def read_task_state(self) -> dict:
        f = self.metis_file(TASK_STATE_JSON)
        if not f.is_file():
            return {"tasks": {}}
        data = json.loads(f.read_text(encoding="utf-8") or "{}")
        return data if isinstance(data, dict) else {"tasks": {}}

    # ---------- evidence.jsonl（C010） ----------
    def append_evidence(self, evidence: Evidence) -> str:
        evidence.validate()
        line = json.dumps(evidence.to_dict(), ensure_ascii=False)
        with open(self.metis_file(EVIDENCE_JSONL), "a", encoding="utf-8") as f:
            f.write(line + "\n")
        return f"{evidence.task_id}@{evidence.timestamp}"

    def read_evidence(self, task_id: str | None = None) -> list[Evidence]:
        f = self.metis_file(EVIDENCE_JSONL)
        if not f.is_file():
            return []
        out = []
        for line in f.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                e = Evidence.from_json(line)
            except ValueError:
                continue
            if task_id is None or e.task_id == task_id:
                out.append(e)
        return out

    # ---------- 安全写入（C019）/ 冲突（C018） ----------
    def safe_write(self, path: str | Path, content: str | bytes, overwrite: bool = False) -> Path:
        """原子写入：先写临时文件再 rename。默认拒绝覆盖已存在文件。"""
        path = self.resolve(path)
        if path.exists() and not overwrite:
            raise WorkspaceError(f"文件已存在（overwrite=True 可覆盖）: {path}")
        path.parent.mkdir(parents=True, exist_ok=True)
        fd, tmp = tempfile.mkstemp(dir=str(path.parent), suffix=".tmp")
        try:
            with os.fdopen(fd, "wb") as f:
                if isinstance(content, str):
                    f.write(content.encode("utf-8"))
                else:
                    f.write(content)
                f.flush()
                os.fsync(f.fileno())
            os.replace(tmp, path)
        except OSError as e:
            raise WorkspaceError(f"写入失败 {path}: {e}") from e
        finally:
            if os.path.exists(tmp):
                try:
                    os.unlink(tmp)
                except OSError:
                    pass
        return path

    def versioned_write(self, path: str | Path, content: str | bytes) -> Path:
        """冲突时自动保存为带版本后缀的新文件，不覆盖用户内容（C018）。"""
        path = self.resolve(path)
        if not path.exists():
            return self.safe_write(path, content)
        stem, suffix = path.stem, path.suffix
        i = 1
        while True:
            candidate = path.with_name(f"{stem}_v{i}{suffix}")
            if not candidate.exists():
                return self.safe_write(candidate, content)
            i += 1

    # ---------- 扫描（C011–C017） ----------
    def scan(self) -> dict:
        """扫描 Workspace 已有材料，返回结构化清单。"""
        report: dict = {
            "documents": [],
            "data_files": [],
            "templates": [],
            "drafts": [],
            "topics": [],
            "generated": 0,
        }
        skip_parts = {
            METIS_DIR,
            "deliverables",
            ".git",
            "__pycache__",
            "literature",
            "analysis",
            "results",
            "figures",
            "tables",
            "topics",
            "manuscript",
            "slides",
        }
        standard = set(STANDARD_FILES)
        for dirpath, dirnames, filenames in os.walk(self.root):
            rel_dir = Path(dirpath)
            parts = set(rel_dir.relative_to(self.root).parts)
            if parts & skip_parts:
                dirnames[:] = []
                continue
            for fn in sorted(filenames):
                rel = str((rel_dir / fn).relative_to(self.root)).replace("\\", "/")
                if rel in standard:
                    continue
                ext = Path(fn).suffix.lower()
                entry = {"path": rel, "bytes": (rel_dir / fn).stat().st_size}
                if ext in DOC_EXTS:
                    report["documents"].append(entry)
                    if any(h in fn for h in TEMPLATE_HINTS) or "inputs/templates" in rel:
                        report["templates"].append(entry)
                    elif any(h in fn for h in DRAFT_HINTS):
                        report["drafts"].append(entry)
                elif ext in DATA_EXTS:
                    report["data_files"].append(entry)
                    if "inputs/existing-data" in rel or "data/raw" in rel:
                        report["data_files"][-1]["origin"] = "existing"
        topic_dir = self.root / "topics"
        if topic_dir.is_dir():
            report["topics"] = [f"topics/{p.name}" for p in sorted(topic_dir.glob("topic_*.md"))]
        report["generated"] = len(list(self.metis_dir.glob("*")))
        return report

    def summary(self) -> str:
        """workspace summary（C017）：人读摘要。"""
        if not self.root.is_dir():
            return f"Workspace 不存在: {self.root}"
        if not self.exists():
            s = [f"目录存在但尚未初始化 METIS 项目: {self.root}"]
            rep = self.scan()
            if rep["documents"] or rep["data_files"] or rep["templates"]:
                s.append(
                    f"检测到已有材料：文档 {len(rep['documents'])} 个、"
                    f"数据文件 {len(rep['data_files'])} 个、"
                    f"疑似模板 {len(rep['templates'])} 个"
                )
            return "\n".join(s)
        cfg = self.read_project()
        state = self.read_state()
        n_tasks = len(self.read_task_state().get("tasks", {}))
        n_ev = len(self.read_evidence())
        return (
            f"METIS 项目 {cfg.project_id}「{cfg.project_name}」\n"
            f"  根目录: {self.root}\n"
            f"  阶段: {state.get('current_stage', '?')}  任务: {n_tasks} 证据: {n_ev} 条"
        )

    # ---------- 备份/恢复辅助 ----------
    def backup_metis(self) -> Path:
        """备份 .metis/ 到 .metis/backups/<ts>/（D014 状态备份的存储层）。"""
        ts = datetime.now().strftime("%Y%m%dT%H%M%S")
        dst = self.metis_dir / "backups" / ts
        if self.metis_dir.is_dir():
            shutil.copytree(
                self.metis_dir, dst, ignore=shutil.ignore_patterns("backups"), dirs_exist_ok=True
            )
        return dst

    def data_sources_file(self) -> Path:
        return self.resolve(f"{DATA_META_DIR}/data_sources.md")

    def as_ref(self) -> WorkspaceRef:
        return WorkspaceRef(root=str(self.root))

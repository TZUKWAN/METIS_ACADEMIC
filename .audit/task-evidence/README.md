# Task Evidence 格式（H0-006）

每个任务的证据文件为 JSON，放 `.audit/task-evidence/<TASK-ID>.json`：

```json
{
  "id": "H1-003",
  "status": "passed",
  "changed_files": ["pyproject.toml"],
  "verification_commands": ["python -c \"import tabulate; print(tabulate.__version__)\""],
  "verification_exit_codes": [0],
  "evidence_files": [".audit/task-evidence/H1-003.json"],
  "notes": "clean venv 安装后 import 成功",
  "at": "2026-09-25T18:00:00"
}
```

`scripts/hardening_status.py --check` 校验：passed 任务必须在
`.audit/task-evidence/` 有对应 JSON 且含非空 verification_commands 与 exit codes。

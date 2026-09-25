# 贡献指南

## 环境
```bash
git clone https://github.com/TZUKWAN/METIS_ACADEMIC && cd METIS_ACADEMIC
pip install -e ".[dev,analysis,docs]"
pytest            # 全量测试
ruff check src tests scripts examples && ruff format --check src tests
```

## 规则
1. 每个变更附测试；验证失败不得合并。
2. 状态表（HARDENING_STATUS.md）passed 必须有 .audit/task-evidence/ 证据。
3. 能力声明必须与实测一致（见 docs/CAPABILITY_MATRIX.md）。
4. 提交信息用中文或英文均可，需说明动机与验证方式。

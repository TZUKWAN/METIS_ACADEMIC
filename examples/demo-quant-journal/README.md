# 示例：定量实证期刊论文（最小可跑）

本示例演示用 METIS ACADEMIC 运行时，从「已有数据」走到「全局 QA」的最小闭环。

## 运行

```bash
cd examples/demo-quant-journal
python run_demo.py
```

脚本会：
1. 在临时目录建立标准 Workspace；
2. 以向导答案（期刊论文 × 定量实证 × 中文）初始化项目；
3. 装配工作流、注入任务树；
4. 执行 S1 审计 → S5 定量链（合成数据：digital → consume）；
5. 打印任务执行与验证结果。

产物全部落在示例自己的 Workspace 目录中（`.metis/`、`results/` 等），
可直接打开检查 evidence.jsonl 与 state.yaml。

> 需要 pandas/numpy：`pip install -e ".[analysis]"`。

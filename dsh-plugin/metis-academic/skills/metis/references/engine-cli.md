# METIS 引擎 CLI 速查（契约 v1）

统一入口：`python -m metis_academic.cli <sub> --workspace <项目目录> [参数]`
加 `--json` 得稳定机器可读输出。

## 退出码

| 码 | 含义 |
|---|---|
| 0 | 成功 |
| 1 | 可读失败（引擎给出原因，如实转告用户） |
| 2 | 用法错误（参数拼错/缺参，查本速查） |

## 子命令

### init（非幂等）
```
init --name <项目名> --artifact fund|journal|thesis \
     --paradigm qualitative|quantitative|theoretical \
     --lang zh-CN|en [--level bachelor|master|phd] \
     [--start from_scratch] --non-interactive
```
已存在 `.metis/` 时拒绝；`--force` 重装配（慎用，会动现有状态）。

### status（幂等）
打印 project_id / 名称 / 当前阶段（含七阶段口径说明）/ 本阶段任务计数 / 证据条数。
内部自带 resume 语义：中断残留按证据处理（有证据→passed，无证据→重新排队）。

### plan（幂等）
按 Common+Paradigm+Artifact+Level+Language 装配工作流，写 `.metis/workflow.yaml`。
可带 `--artifact/--paradigm/--lang/--level` 调整后重装。

### tasks
`tasks [--stage S?] [--json]` 列任务。状态词汇：
`TODO / READY / RUNNING / COMPLETE / FAILED / NEEDS_REVISION / BLOCKED`

### exec（非幂等，任务级文件锁）
执行单个任务；完成必须落证据（Evidence），无证据的状态变更被拒绝。

### advance
校验当前阶段全部任务 passed 后迁移到下一阶段；不满足即拒绝（fail-closed）。

### artifacts
artifact 注册/版本/lineage 管理（也可走 MCP 工具面 mcp__metis__artifact_*）。

### verify
交付前检查：引用链、占位符、一致性。失败必须修完再交付。

### deliver
组装 `deliverables/`（QA 前置：verify 未过会拒绝）。

## 纪律

- 禁止绕过 CLI 直写 `.metis/` 下任何状态文件（project.yaml / workflow.yaml / state / 任务 / 证据）。
- executor 角色禁用 init / advance；阶段迁移是主控（主对话）职责。
- 一切失败如实上报；fail-closed 优先于进度。

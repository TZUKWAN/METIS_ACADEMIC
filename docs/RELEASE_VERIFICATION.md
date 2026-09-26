# RELEASE VERIFICATION（H28-001）

> **最终 target commit：`a40c462`（CI run 36198134899 全绿，3.10+3.12）**。
> 整改过程验证链：3cbb1d3（run 36196114328 ✓）→ 17be7ae（run 36196885591 ✓）→
> db683a5（run 36197578522 ✓）→ a40c462（run 36198134899 ✓）。
> 本文档更新提交自身的 run 亦为绿时即最终状态（不回收旧结论）。
> 历史自报状态（首轮 456/456、217 全绿）不作为验收证据（见 H0-004 标注）。

## 1. Commit / 环境

- 审计基线：main @ `c0d3e83`（首轮公开 CI failure：9 failed / 208 passed / 1 skipped，根因 tabulate 缺失）
- 整改提交链：`a8f52d8`（主体）→ `5437271` → `55504c6` → `3cbb1d3` → `17be7ae` → `db683a5` → **`a40c462`（最终）**
- 本地验证环境：Windows 10.0.26200, Python 3.13.2
- CI 环境：ubuntu-latest × Python 3.10 / 3.12

## 2. CI（公开可复查）

| Run | Commit | 结论 | 明细 |
|---|---|---|---|
| 36166870763（基线） | c0d3e83 | **failure** | 9 failed / 208 passed / 1 skipped |
| 36195223162 | a8f52d8 | failure | Format check（本地编辑后未格式化） |
| 36195393352 | 5437271 | failure | Hardening 检查依赖本地文档路径（已入库修复） |
| 36196114328 | 3cbb1d3 | ✅ success | 3.10：229 passed, 1 skipped（356s）；3.12：229 passed, 1 skipped（188s） |
| 36196885591 | 17be7ae | ✅ success | 同上量级 |
| 36197578522 | db683a5 | ✅ success | 3.10 5m50s / 3.12 5m20s |
| **36198134899** | **a40c462（最终）** | **✅ success** | lint/format/pip check/pytest/hardening-check 全过 |

CI 步骤：Install → Dependency consistency（pip check）→ Lint → Format check →
Test（pytest）→ Hardening status consistency（passed 必须有证据）。

## 3. 干净安装 / 发行包

- 干净 venv 复现基线失败 → 修复后 reinstall 全绿（证据 `.audit/task-evidence/H1-001/003`）
- `python -m build`：wheel + sdist 生成（H1-013）
- wheel-only 安装：脱离源码树 `metis --version` ✓；workflows/skill_defs 44 个资源入包；
  组合 64 规则 + 技能内容可读（H1-014/015）
- extras（analysis/docs/dev）独立解析通过（H1-007）

## 4. 测试

- 全量（本地 3.13）：**229 passed, 1 skipped**；CI（3.10/3.12）：各 **229 passed, 1 skipped**
- skip 清单：唯一 skip = arXiv live 测试（marker `online`，移入独立 workflow 计划，H3-011/H22-007）
- E2E：9 组合（基金/期刊/学位 × 定性/定量/理论）+ 本科/硕士/博士 + 无后端 fail-closed 共 11 项全绿
- 真实性语义 E2E 断言：
  - 基金组合：`artifact_policy.fund_design_only=true`，无任何 S5 执行产物（无系数/p 值/证据链）
  - 定量组合：变量来自 `research/quant-design.yaml`（显式研究设计）；summary.json 含 seed
  - 定性组合：evidence_chain.md 可回原材料（M001）
  - 理论组合：argument_map.md 含 evidence_for（论证图非空）
  - 无 ModelBackend：writing 任务 blocked（不留假骨架）

## 5. Live 文献核验（2026-09-25）

- DOI/CrossRef：`10.1038/s41586-020-2649-2` → canonical "Array programming with NumPy"，
  标题匹配 → **verified**（sim 1.00）；错误标题 → **conflict**；未注册 DOI → **unverified**；
  断网（monkeypatch）→ **unreachable**
- arXiv：`1706.03762` → canonical "Attention Is All You Need" → **verified**（sim 1.00）；
  错误标题 → **conflict**

## 6. 真实性审计要点

- `references.bib` 只含 verified 记录（2v+1unv fixture → 恰 2 条，H2-008 测试）
- 引用池单一来源：正文 key → bib → records.jsonl 中 verified+resolver，断任一环即 QA 阻断（H2-017）
- 来源发现一律 unverified；URL 前缀不产生核验（H2-005 测试）
- 定量变量不可由字段名猜测（缺 quant-design.yaml 即执行失败）
- 基金项目不默认执行未来研究
- `or True` 全仓 0 处；占位词检测规则就绪
- passed 任务必须有 `.audit/task-evidence/` 证据（CI 强制）

## 7. 声明的能力边界

见 [CAPABILITY_MATRIX.md](CAPABILITY_MATRIX.md) 与 [KNOWN_LIMITATIONS.md](KNOWN_LIMITATIONS.md)。
未实测项（桌面 Harness、真实 MCP 协议层、中文平台 connector 等）一律 unsupported / 待办。

## 8. 遗留待办（本轮未完成，均记录于 HARDENING_STATUS.md）

- H3 中文平台 connector 调研实现、arXiv rate-limit/backoff、live workflow 独立化
- H4-004 pilot data 显式授权 Gate、H4-010 StartMode 语义完善、H4-011 确认 Gate 全面化
- H5-004..009 schema contract / provenance / hallucination guard 深化
- H6 Skill activation receipt / token 预算
- H7 真实 MCP client（transport/handshake/tools.call）
- H8 桌面 Harness 实机接入（Zed/Codex/Claude Code/Kimi/ChatGPT/ACP）
- H9 metis-data 真实索引接入、数据下载安全加固（SSRF/zip bomb 等，H21）
- H10 统计深化（正确 t df、HC/cluster SE、正式 BP/White、正确 2SLS、FE/RE/DID 等）
- H13 Method Router、H14 其余成文证据深化、H16-18 期刊/学位/Word 深化、H19 PPT style
- H20-004/005/006/011/012、H22 其余、H23 跨平台矩阵、H27 48 项终审


---

# 插件化里程碑（plugin-migration 分支，2026-09-26）

- 分支：`plugin-migration`（自 d9896e8；Phase 0–6 见 docs/plugin-migration/EXECUTION_LOG.md）
- 插件版本：0.2.0（metis/plugin.json 与 .claude-plugin 镜像一致）
- 新增：真实 MCP 服务器（mcp 2.x SDK，stdio + HTTP 网关令牌鉴权，10 工具）、
  引擎 CLI 契约（init/status/plan/advance/tasks/exec/artifacts/deliver/verify）、
  metis-executor 子智能体、投稿预检/图表重画/PPT 生成、metis-data catalog 桥接
  （84 providers）、DecisionGate（Laya 转写）、evals-imported（8 任务归档）
- 真实性增强：变量必须来自 quant-design.yaml（禁止字段名猜测）；基金 design-only；
  无 ModelBackend 时语义任务 fail-closed；task-state 并发写加跨进程锁
- 场景验收：S1（9/9×2 轮）、S2（6/6×2）、S3（6/6 重跑后）、S4（6/6）、S5（4/4）、
  S6（4/4）、S7（5/5）——全部为全新子智能体实跑
- Harness：Claude Code 本机全链路 PASS（MCP ✔Connected + 真实工具调用 + S1 CLI 流程）；
  ZCode 本机 PASS（本会话即运行环境）；其余 7 Agent BLOCKED 附自验步骤
  （ADAPTATION_RESULTS.md）

# METIS 2.0 — Feature Migration Map

> Spec: `METIS_2.0_单工作台_任务驱动_策略与技能系统` (section 33).
> START_SHA: `d03921e`.
> Companion ledger: `docs/metis2-implementation-status.md`.
>
> Audit basis (measured 2026-09-23 at `d03921e`):
> - `Scenario` referenced in **134** source files; `GenOffice` **26**, `METIS Office` **19**; `OmniRoute`/free-model discovery in **~15** files; `ResearchStrategy` **0**, `TaskPlan`/`RESEARCH_PLAN` **0**.
> - Current navigation (`src/shell/navConfig.ts`, `src/store.ts:95-106`): top-level `projects` + `settings`; research destinations `topics` / `outcomes` / `submissions`; preference `personalization`; a Scenario-center toggle. `Page` union: `projects|settings|dashboard|chat|goal|timeline|latex|pdf|notes|experiments|evals|kanban|outcomes|submissions|topics`.

Legend — Status: `TODO` (not started) · `DOING` · `VERIFYING` · `DONE` · `REOPENED` · `BLOCKED`.

## A. Product concepts that must exit the normal user flow

| Old Feature | Current Owner | New Product Location | Backend Reused? | UI Removed? | Data Migration? | Status |
|---|---|---|---|---|---|---|
| Scenario (center/editor) | `src/personalization/Scenario*`, `src/research/ScenarioLauncher`, `src/lib/scenarioCompileCoordinator`, `electron/scenario/*`, `engine/personalization/ScenarioHarness*` | Research Strategy + Task Plan + Capability Resolver | Partially (compile/hook loop reusable as internal engine) | Yes (all user entry) | Yes → Strategy read-adapter | **DONE (B40, machine-verified)** — 用户入口全部退役（`.scenario-workbench===0` 由真机验收断言），能力以 Research Strategy 形式留在工作台（旧 scenario 经 `scenarioToStrategy` 非破坏投影进 `strategyList`） |
| Topic standalone page | `src/pages/TopicWorkspacePage.tsx`, `src/topic/*` | Lifecycle stage 2 (选题确定) as candidate-topic MD artifacts | Yes (topic persistence) | Yes (top-level `topics`) | Yes → artifact rows | **DONE for entry + stage-2 primitive (B25/B66)** — 顶栏已降权，候选选题可由右栏录入并「确认为选题」（真机 ② 分组 + `confirmed_topic`）；仍未吸收的是 TopicWorkspacePage 的**对话式选题探索**（F2，见 ledger §57 余项） |
| Outcomes workspace | `src/pages/OutcomesPage.tsx`, `src/outcomes/OutcomeWorkbenchPanel.tsx`, `src/pages/outcomes/*` | Right panel: Stage Artifacts + Deliverables + inline Preview/Edit | Yes (outcome persistence) | Yes (top-level `outcomes`) | Yes → artifact status | **DONE (B31/B32/B37 + B65/B68)** — 右栏承担列表/预览/编辑→新版本/导出/回收站/版本比较/提升为交付/登记投稿；独立页仅作为命令面板逃生入口保留（不删能力） |
| Submissions workspace | `src/pages/SubmissionWorkspacePage.tsx`, `src/pages/submissions/*` | Demote to a "投稿准备" action on a final deliverable | Yes | Yes (top-level `submissions`) | No (state kept) | **DONE for the workbench path (B26/B43/B44/B65/B68)** — 登记→预检→组装导出→逐文件校验→冻结→⑦ 交付 登记全部在右栏真机走通；未吸收：选刊 shortlist / 投稿助手对话 / portal 浏览器（模型与外部站点相关） |
| METIS Office / GenOffice | see section C | Word/PPT internal generation only | Yes (docx/pptx gen kept internal) | Yes (all branding) | No | **DONE (B37)** — `no-office-product-entry` PASS；Word/PPTX 生成仍在内部，外部编辑器入口已从 OutcomesPage 摘除（§14 把富编辑留在独立 GenOffice） |
| OmniRoute / free API | see section B | — | General provider abstraction only | Yes | N/A (drop) | **DONE (B16/§28)** — `no-omniroute` PASS；FreeModelCenter/FreeModelService/discovery 目录整体删除，邮件池 `MailboxPoolStore` 保留 |

## B. OmniRoute / free API discovery — removal inventory (section 28)

REMOVE FROM METIS PRODUCT:
- UI: `src/personalization/FreeModelCenter.tsx` (+ `.css`); free-route affordances in `src/components/ProviderProfilesSection.tsx` (keep user Provider/API config itself).
- IPC/Preload: `electron/ipc/registerFreeModelIpc.ts`, `electron/preload/freeModelBridge.ts`, registration in `electron/bootstrap/registerDomains.ts`.
- Services: `electron/FreeModelService.ts`, `electron/ModelDiscoveryStore.ts`.
- Engine discovery: `engine/providers/discovery/{OmniRouteGateway,CommunitySourceDiscovery,NewAPIClient,AutoRegisterScheduler,ProviderDiscoveryService}.ts`.
- i18n keys in `src/i18n/locales/zh.ts`.

KEEP if still consumed by a non-free-routing capability — verify each `engine/providers/*` import before deletion.

## C. METIS Office removal (section 14) — 3-way classification

- REMOVE FROM METIS PRODUCT (UI/entry): `src/components/OfficeRibbon.tsx`, `OfficeWordRibbon.tsx`, `OfficePptRibbon.tsx`, `src/components/SettingsOfficeProfilesSection.tsx`, `src/pages/outcomes/useOutcomeGenoffice.ts`, embedded-view "open in office" affordances, `electron/preload/officeBridge.ts` exposure to renderer.
- KEEP AS INTERNAL WORD/PPT GENERATION: `electron/office/{genofficeBridge,genofficePptxBridge}.ts`, `electron/ipc/registerOutcomeOfficeIpc.ts`, `registerOfficePromptIpc.ts`, `OfficePromptProfileService.ts`, `electron/genofficeEmbedded/*` — refactored so they are not user-perceivable as a product.
- KEEP ONLY IN INDEPENDENT METIS OFFICE PROJECT: `electron/genofficeStandalone*`, `electron/ipc/registerGenofficeStandaloneIpc.ts`, `electron/genofficeRuntimePaths.ts`. **Do NOT delete/refactor/migrate** the standalone GenOffice body (section 14.2).
- Deliverable: `docs/metis-office-removal-from-metis.md` (section 14.3) — TODO.

## D. METIS 2.0 objects — audited reality at `d03921e` (NOT greenfield)

A 4-agent code audit (2026-09-23) corrected the initial grep (which miscounted due to a
`-E` `\|` escaping bug). Much exists but is orphaned, parallel, dead, or hidden. Work =
converge + wire + fill gaps, matching the spec's "保留底层已有能力，收敛" mandate.

| Object | Reality | Gap to METIS 2.0 |
|---|---|---|
| Research Strategy | `ResearchStrategyContract.ts` (phases + `version`/`isPreset` now), `ResearchStrategyStore` (DONE, merges presets), `registerStrategyIpc` list/save/delete/setDefault, `src/research/StrategyEditor.tsx` **NOW MOUNTED** in Settings 研究策略, 12 presets in `researchStrategyPresets.ts`. `researchMethods.ts` = 6 auto-picked families (legacy). | import/export + version-bump; core-vs-task-rules runtime split MISSING (engine loads whole strategy); strategy→Task-Plan influence **RESOLVED (B47: `taskPlanGenerator.test.ts` proves per-phase chained tasks + two strategies ⇒ different plans)** |
| Task Plan | `engine/goal/GoalEngine` + `engine/workflow` DAG + `src/components/RightPanel.tsx` shows **real** 4-state progress; `ProjectTasksPanel.tsx`. | MD `RESEARCH_PLAN.md` (outline+tasks+deps+criteria) MISSING; states VERIFYING/NEEDS_REVISION/BLOCKED MISSING; Save-Artifact step MISSING; user add/delete/reorder/split/merge MISSING; three fixed right sections MISSING. |
| Capability Resolver | Two skill registries; `PersonalizationResolver.ts:430` loads **all** bound skills. `ArtifactPromptService` reusable. | Top-K scoring + zero-injection MISSING; MCP eager-start at boot (no resolve→start→release). |
| Skills Center | CRUD exists in `PersonalizationCenter` but gated diagnostic (`skill_admin`). | Not in Settings surface; not 预置/已安装/用户创建 taxonomy. |
| Prompt Engineering | `ArtifactPromptService` edit/reset/history/import/export DONE; **4** prompts wired. | 14-prompt surface MISSING; editable-vs-immutable not schema-enforced. |
| Artifact/Deliverable | 3 parallel models; `ProjectShell.tsx`(3-pane)+`SplitPreview.tsx` EXIST but dead; live is `ProjectsPage.tsx`. | `stage` + `taskId` fields MISSING; project `category` column MISSING; unified contract MISSING. |

## E. Reuse mandate (spec preamble)

Preserve & reuse underlying: Agent Runtime, Evidence, Artifact/Outcome persistence, Skill/MCP, Web Research, data capabilities, Word/PPT generation. Convergence is at the **product / IA / orchestration** layer, not a rewrite of engines.

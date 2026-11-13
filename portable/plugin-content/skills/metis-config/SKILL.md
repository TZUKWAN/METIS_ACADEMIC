---
name: metis-config
description: Coedit METIS modes, workflow steps, goal loops, prompts, prohibitions, output formats and research skills in the same draft shown by the workbench. Use when the user wants to build, change, reorder or delete METIS modes or skills, or bind a specific skill to a step.
---

Call `metis_config_read` for the shared draft overview and an actual `readToken`. Read just the selected mode or step before editing. Use `operations` with `metis_config_edit`; do not overwrite the whole configuration or edit internal files. The workbench updates from this same draft, and concurrent human changes win.

New modes start empty. Build only the steps the user's goal needs; do not impose ten steps, academic degree levels or fixed journal categories. Expose step name, main purpose, deliverables, specific bound skills and step prompt, with optional prohibitions and a goal loop. `instruction` is the actual main purpose; `deliverables` describes outputs; `prompt` contains execution guidance. `loop:{enabled:true,criteria:"..."}` requires independently verified goal attainment. `set_output` sets the last step's format and natural-language `wordFormatting`.

Use `metis_config_read` with `kind:"skills"` and a bounded query to find concrete skills inside the indexed repositories, then `metis_skill_read` to inspect a selected skill. Bind its real ID with `bind_skill`. Never bind only a repository label, claim its dependencies are ready without checking, or load every skill body.

For exact operation examples and supported fields read `references/operations.md` only when needed. Installing a skill downloads and pins the specified source; it does not run it. Preserve upstream licensing and source evidence. Do not silently enable unrelated tools or change host models, accounts or permissions.

Explain meaningful conflicts rather than discarding human work. Normal edits remain a draft. Save only when the user explicitly requests it or clicks “保存并生效”, using the latest draft revision from `metis_config_read`. One save commits the entire shared draft. Existing project snapshots are unaffected until a project explicitly synchronizes.

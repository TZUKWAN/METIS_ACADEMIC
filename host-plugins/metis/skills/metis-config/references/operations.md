# Precise operations

Read a fresh `readToken` before each logical edit batch. The returned overview includes the current operation guide. At most 50 operations per atomic batch; each mode supports 0–20 draft steps, at least one complete step to create a project.

```json
{"type":"create_mode","mode":{"id":"metis-custom","name":"我的研究模式","description":"用途"},"profile":{"steps":[],"skills":[],"parameters":{"language":"zh-CN"}}}
```

```json
{"type":"add_step","modeId":"metis-custom","step":{"id":"read-evidence","title":"核对证据","instruction":"明确证据能够支持的结论","deliverables":"evidence.md","skills":[],"prompt":"逐条核实实际来源","prohibitions":"不得编造引用","loop":{"enabled":false,"criteria":""}}}
```

Other operations:

- `update_mode`: modeId, patch with name/description/guidance/order.
- `delete_mode`: modeId. Actual deletion from active configuration, not an archive UI.
- `reorder_modes`: modeIds containing all active IDs.
- `update_step`: modeId, stepId, patch with title/instruction/deliverables/skills/prompt/prohibitions/loop.
- `remove_step`: modeId, stepId.
- `move_step`: modeId, stepId, beforeStepId (null means end).
- `bind_skill` / `unbind_skill`: modeId, stepId, skillId.
- `set_output`: modeId, output `{format:"docx",wordFormatting:"标题黑体，正文宋体小四，1.5倍行距，页脚显示页码"}`. Formats: auto/docx/pptx/pdf/markdown/json. Native tools must produce the actual file; a format setting alone does not generate it.
- `set_controller`: modeId, systemPrompt (brief controller, not all skill bodies).
- `create_skill`: skill `{id,description,content,whenToUse,invocation:{modelInvocable:true,userInvocable:true}}`, optional files `[{path,text}]`.
- `install_skill`: id, source `{kind:"github",repository:"owner/repo",ref:"commit-or-tag",subdirectory:"path/to/skill"}` or `{kind:"local",path:"absolute/path"}`; optional replace:true only when requested.
- `update_skill`: skillId, patch with description/content/whenToUse/invocation or exact replacements; optional files.
- `delete_skill`: skillId, detach:true only when user requested removing bindings as well.

An AI edit cannot force overwrite manually protected fields. Read the conflict paths and coordinate those changes with the user.

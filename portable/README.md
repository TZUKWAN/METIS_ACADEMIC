# METIS host adapters

The DSH runtime remains in `dsh-plugin/`. This additive runtime packages its existing configuration validation, editing operations, skill catalog and ION scene for native Codex/ZCode plugins.

- `runtime/core.mjs`: shared draft, concurrent edits, frozen projects/skills, progressive resources, real artifact evidence and step lifecycle.
- `runtime/codex.mjs`: native app-server JSON-RPC, full host tools, public events, approvals, resume and independent read-only review. The nested assistant disables its duplicate METIS MCP plugin while keeping the same bound dynamic tools and other host capabilities.
- `runtime/server.mjs`: actual stdio MCP server, standard MCP Apps resource and authenticated loopback workbench.
- `runtime/tools.mjs`: shared native MCP/dynamic tool contracts.
- `ui/`: shared DSH ION canvas with host-neutral workflow editor and native conversation bridge.
- `plugin-content/`: installable skills, ZCode commands, documentation, installer and Apache-2.0 license.
- `tests/`: focused unit/protocol checks plus real isolated native and headless UI checks. Native checks use the signed-in Codex account; do not run them against a prohibited model or silently substitute another provider.

Build with Node.js 22.19+ and installed `esbuild`, `@modelcontextprotocol/sdk`, `undici`, `react`, `react-dom`, `three`. Set `METIS_BUILD_MODULES` to the dependency `node_modules` directories (semicolon separated), then run:

```powershell
node tools/build-host-plugin.mjs
```

The output is `host-plugins/`. The builder verifies metadata hashes, bundles browser/server dependencies, collects all bundled dependency licenses, and writes a file-level SHA-256 inventory. It excludes user data and the original 875 MiB upstream body/script archive collection. Specific pinned upstream resources are downloaded only when selected.

For focused checks:

```powershell
node --test portable/tests/core.test.mjs
# Set METIS_TEST_DEPENDENCIES to the SDK node_modules directory:
node --test portable/tests/protocol.test.mjs
```

`ui.mjs` additionally requires `METIS_BROWSER_MODULES` pointing to a Playwright installation and `METIS_CHROMIUM` pointing to a headless browser. It does not attach to user windows or take screenshots. Native integration scripts use independent temporary data directories and actual model calls; their outputs are real file/tool evidence, not sample research results.

Plugin installation, embedded UI and native sessions follow the documented host interfaces: [Codex plugins](https://developers.openai.com/plugins/build/plugins), [native app-server](https://learn.chatgpt.com/docs/app-server), [MCP Apps](https://developers.openai.com/plugins/build/chatgpt-ui), [ZCode plugins](https://zcode.z.ai/cn/docs/plugin). Support differences are listed in the installable package README; do not claim unverified embedded UI or ZCode model inference.

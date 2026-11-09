# Third-party notices

METIS-authored code is licensed under the MIT License in `LICENSE`. The following components keep their original licenses and notices; the project license does not relicense them.

| Component | License | Provenance and retained notice |
|---|---|---|
| Three.js 0.187.0 and its addons | MIT | `dsh-plugin/metis-mode/client/ion-vendor/` contains the original license and pinned npm source/integrity. |
| Document Review Desk text-diff helpers | MIT | [Suren-ViLL/dsh-plugin-doc-review](https://github.com/Suren-ViLL/dsh-plugin-doc-review), commit `643a948d79218c0b897c70998845f7eeb7049bf1`; original helper, license and hashes in `dsh-plugin/metis-mode/host/document-vendor/`. |
| marked 18.1.3 | MIT | Original license and npm provenance in the same document-vendor directory. |
| paper-search-pro deterministic Python helpers | Apache-2.0 | [O0000-code/paper-search-pro](https://github.com/O0000-code/paper-search-pro), commit `b551d741d0408b2beb8d5a0f023adb3fc8ec23b7`; `LICENSE.txt`, `NOTICE.md`, `THIRD_PARTY.md` and the adaptation record in `src/metis_academic/paper_search_pro_vendor/`. METIS uses selected Python helpers, not the upstream UI. |
| lieflat-less-ai-tone protocol adaptation | MIT | [larashero3-dotcom/lieflat-less-ai-tone](https://github.com/larashero3-dotcom/lieflat-less-ai-tone), commit `27d29232f10124db904ca9c0536d0b67cb3b2833`; license and adaptation record in `src/metis_academic/skill_defs/lieflat-less-ai-tone/`. |

## Research skill source directory

The public release includes skill names, source pointers, license metadata, pinned commits and file integrity hashes. It does **not** bundle the private collection of third-party skill bodies, scripts or archives. Requested files are read from their original repositories at the recorded versions, verified, and cached in the user's local DSH data directory. Each upstream's terms continue to apply. Sources and versions are listed in `dsh-plugin/metis-preset/library/NOTICE.md`.

The presence of a source in this directory is not a new license grant or evidence that its dependencies, account access or research results have been validated by METIS. Users can inspect its upstream terms before using it.

## External runtimes

DeepSeek Harness, LibreOffice and Python libraries are provided separately. They are not re-licensed by METIS. In particular, optional PyMuPDF installations retain their own AGPL/commercial terms.

## Visual references

The ion-circuit interface is METIS's independent implementation. Agent Display was a visual/interaction reference; its code, models, assets and simulators are not included in this release.

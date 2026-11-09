"""Build a private, pinned data library. Never imports or executes upstream code.

Input is the downloaded inventory cache (GitHub metadata/trees/ZIPs); PyYAML is
used only via safe_load. This command builds data, and is not a plugin test.
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import posixpath
import re
import stat
import struct
import zipfile
from pathlib import Path
from urllib.parse import unquote

import yaml


def encoded(value):
    return json.dumps(value, ensure_ascii=False, separators=(",", ":")).encode("utf-8")


def sha(value):
    return hashlib.sha256(value).hexdigest()


def slug(value, maximum):
    return re.sub(r"[^a-z0-9]+", "-", str(value).lower()).strip("-")[:maximum].rstrip("-") or "skill"


def safe_path(value):
    return bool(value and not value.startswith("/") and "\\" not in value and ":" not in value and
                all(p not in ("", ".", "..") and not re.search(r"[\x00-\x1f]", p) for p in value.split("/")))


def forbidden(value):
    return any(p in {".git", "node_modules", ".venv", "venv", "__pycache__"} or
               p.lower() in {".npmrc", "id_rsa", "id_ed25519"} or
               (p.startswith(".env") and p not in {".env.example", ".env.template"}) for p in value.split("/"))


def frontmatter(raw):
    text = raw.decode("utf-8")
    match = re.match(r"^\ufeff?---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)", text)
    if not match:
        return {}, 0, text, "missing-frontmatter"
    try:
        header = yaml.safe_load(match[1])
        if not isinstance(header, dict):
            return {}, 0, text, "invalid-frontmatter"
        return header, len(text[:match.end()].encode("utf-8")), text[match.end():], None
    except yaml.YAMLError:
        return {}, 0, text, "invalid-frontmatter"


def write_immutable(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        if path.read_bytes() != data:
            raise ValueError("Immutable library collision: " + str(path))
    else:
        path.write_bytes(data)


class Source:
    def __init__(self, cache, row):
        self.row = row
        self.repo = row["repository"]
        self.commit = row["commit"]
        self.folder = cache / row.get("cacheDirectory", self.repo.split("/")[1])
        self.records, self.cache, self.skipped = {}, {}, []
        tree_path = self.folder / "tree.json"
        tree = json.loads(tree_path.read_text(encoding="utf-8"))["tree"] if tree_path.exists() else []
        expected = {r["path"]: r for r in tree if r["type"] == "blob"}
        self.archive = None
        if row.get("sparse"):
            for path, item in expected.items():
                if not safe_path(path) or forbidden(path) or item.get("mode") == "120000":
                    self.skipped.append({"path": path, "reason": "unsafe-path-or-link"})
                    continue
                self.records[path] = {"size": item.get("size", 0), "gitSha": item["sha"], "mode": item.get("mode", "100644")}
                local = self.folder / "raw" / item["sha"]
                if local.exists():
                    self.cache[path] = local.read_bytes()
        else:
            self.archive = zipfile.ZipFile(self.folder / "source.zip")
            prefix = self.archive.namelist()[0].split("/")[0] + "/"
            for item in self.archive.infolist():
                if item.is_dir():
                    continue
                path = item.filename[len(prefix):]
                mode = (item.external_attr >> 16) & 0xFFFF
                if not safe_path(path) or forbidden(path) or stat.S_ISLNK(mode):
                    self.skipped.append({"path": path, "reason": "unsafe-path-or-link"})
                    continue
                if item.file_size > 32 * 1024 * 1024:
                    self.skipped.append({"path": path, "reason": "file-over-32MiB"})
                    continue
                data = self.archive.read(item)
                actual = hashlib.sha1(b"blob " + str(len(data)).encode() + b"\0" + data).hexdigest()
                if path in expected and expected[path]["sha"] != actual:
                    raise ValueError(self.repo + " Git blob mismatch: " + path)
                if data.startswith(b"version https://git-lfs.github.com/spec/v1\n"):
                    self.skipped.append({"path": path, "reason": "unresolved-lfs-pointer"})
                    continue
                self.cache[path] = data
                self.records[path] = {"size": len(data), "gitSha": actual, "mode": "100755" if mode & 0o111 else "100644"}
        self.entries = sorted(p for p in self.records if p.rsplit("/", 1)[-1].lower() in {"skill.md", "skill.yaml", "skill.yml"})
        self.roots = {posixpath.dirname(p) for p in self.entries}
        self.evidence = {}
        if "catalog/skills-enriched.json" in self.cache:
            rows = json.loads(self.cache["catalog/skills-enriched.json"]).get("skills", [])
            for item in rows:
                self.evidence[item["path"]] = {"kind": "upstream-reported", "tier": item.get("tier"), "evalScenariosDeclared": len(item.get("eval_coverage", [])), "qualityFlags": item.get("quality_flags", []), "tags": item.get("tags", {}), "originUrl": item.get("source_url"), "licenseClaim": item.get("license"), "commercialUseClaim": item.get("commercial_use"), "evidencePath": "catalog/skills-enriched.json"}

    def bundle(self, entry, out):
        directory = posixpath.dirname(entry)
        children = [r + "/" for r in self.roots if r and r != directory and (not directory or r.startswith(directory + "/"))]
        selected = {p for p in self.records if (not directory or p.startswith(directory + "/")) and not any(p.startswith(c) for c in children)}
        # Licenses from the nearest ancestors remain available with each skill.
        parents = [directory]
        while parents[-1]:
            parents.append(posixpath.dirname(parents[-1]))
        for parent in parents:
            for path in self.records:
                if posixpath.dirname(path) == parent and path.rsplit("/", 1)[-1].lower() in {"license", "license.md", "license.txt", "copying", "notice"}:
                    selected.add(path)
        # Resolve real relative links/code-file references without crawling URLs.
        checked = set()
        while True:
            pending = selected - checked
            if not pending:
                break
            for path in sorted(pending):
                checked.add(path)
                data = self.cache.get(path)
                if data is None or len(data) > 1024 * 1024 or "\x00" in data[:512].decode("utf-8", "replace"):
                    continue
                text = data.decode("utf-8", "replace")
                links = re.findall(r"(?:\]\(|[`\"'])([^\s<>`\"']{1,400}\.(?:md|py|r|R|json|ya?ml|toml|csv|txt|bib|tex|sh|js|ts|html|svg|png|jpg))(?:[)\s`\"'#]|$)", text)
                for link in links:
                    if "://" in link or link.startswith("/"):
                        continue
                    link = unquote(link.split("#")[0])
                    for start in (posixpath.dirname(path), directory, ""):
                        candidate = posixpath.normpath(posixpath.join(start, link))
                        if candidate in self.records and safe_path(candidate):
                            # Other skills are separately discoverable; do not inline them.
                            if candidate.rsplit("/", 1)[-1].lower() in {"skill.md", "skill.yaml", "skill.yml"} and candidate != entry:
                                break
                            selected.add(candidate)
                            break
        if len(selected) > 10000:
            raise ValueError(self.repo + " resource closure exceeds 10000 files")
        output = io.BytesIO()
        cached = {}
        with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
            for path in sorted(selected):
                # Large binary/data assets remain pinned by Git blob and are
                # fetched only if explicitly requested, keeping session bundles small.
                if path not in self.cache or (len(self.cache[path]) > 2 * 1024 * 1024 and path != entry):
                    continue
                item = zipfile.ZipInfo(path, date_time=(2026, 1, 1, 0, 0, 0)); item.compress_type = zipfile.ZIP_DEFLATED
                item.external_attr = (0o100755 if self.records[path]["mode"] == "100755" else 0o100644) << 16
                archive.writestr(item, self.cache[path])
        archive_bytes = output.getvalue()
        archive_hash = sha(archive_bytes)
        with zipfile.ZipFile(io.BytesIO(archive_bytes)) as archive:
            for item in archive.infolist():
                offset = item.header_offset
                _, _, _, _, _, _, _, _, _, name_length, extra_length = struct.unpack_from("<IHHHHHIIIHH", archive_bytes, offset)
                cached[item.filename] = {"offset": offset + 30 + name_length + extra_length, "compressedSize": item.compress_size, "method": item.compress_type, "sha256": sha(self.cache[item.filename])}
        files = [{"path": p, **self.records[p], **cached.get(p, {"external": True})} for p in sorted(selected)]
        record = {"version": 1, "repository": self.repo, "commit": self.commit, "entryPath": entry, "archiveHash": archive_hash, "archiveSize": len(archive_bytes), "files": files}
        write_immutable(out / "bundles" / (archive_hash + ".zip"), archive_bytes)
        return record


def main():
    parser = argparse.ArgumentParser(); parser.add_argument("--cache", required=True); parser.add_argument("--output", required=True)
    args = parser.parse_args(); cache, out = Path(args.cache).resolve(), Path(args.output).resolve()
    roots = json.loads((cache / "repositories.json").read_text(encoding="utf-8"))
    derived = json.loads((cache / "derived-repositories.json").read_text(encoding="utf-8"))
    previous = {}
    if (out / "index.json").exists():
        pointer = json.loads((out / "index.json").read_text(encoding="utf-8"))
        old = json.loads((out / "catalogs" / (pointer["catalogHash"] + ".json")).read_text(encoding="utf-8"))
        previous = {(e["source"]["repository"], e["source"]["ref"], e["source"]["entryPath"]): e["source"]["bundle"] for e in old["entries"]}
    linked_evidence = {}
    wenyu = yaml.safe_load((cache / "ai-research-skills" / "inspection" / "catalog" / "skills.yml").read_text(encoding="utf-8"))
    for family in wenyu.get("families", []):
        for item in family.get("skills", []):
            repository = item["repo_url"].removeprefix("https://github.com/")
            linked_evidence[(repository, item["directory"] + "/SKILL.md")] = {"kind": "upstream-reported", "verificationClaim": item.get("verification_status"), "verificationTierClaim": item.get("verification_tier"), "verifiedOnClaim": str(item.get("verified_on", "")), "lifecycleClaim": item.get("lifecycle_status"), "evidenceRepository": "WenyuChiou/ai-research-skills", "evidencePath": "catalog/skills.yml"}
    sources = roots + derived; all_entries, receipts, failures = [], [], []
    for row in sources:
        if row.get("error"):
            failures.append(row); continue
        source = Source(cache, row); count = 0; entry_errors = []
        for entry in source.entries:
            try:
                raw = source.cache.get(entry)
                if raw is None:
                    raise ValueError("entry not downloaded")
                if entry.lower().endswith((".yaml", ".yml")):
                    header = yaml.safe_load(raw.decode("utf-8")) or {}; body_path = posixpath.join(posixpath.dirname(entry), "INSTRUCTIONS.md")
                    if body_path not in source.cache:
                        body_path = entry
                        body_offset, body, problem = 0, raw.decode("utf-8"), "yaml-manifest-needs-adapter"
                    else:
                        body_offset, body, problem = 0, source.cache[body_path].decode("utf-8"), None
                else:
                    header, body_offset, body, problem = frontmatter(raw); body_path = entry
                name = header.get("name") or header.get("id") or posixpath.basename(posixpath.dirname(entry)) or row["repository"].split("/")[1]
                description = header.get("description")
                if not isinstance(description, str) or not description.strip():
                    description = next((line.lstrip("# ").strip() for line in body.splitlines() if line.strip()), str(name)); problem = problem or "missing-description"
                reusable = previous.get((row["repository"], row["commit"], entry))
                if reusable:
                    old_bytes = (out / "records" / (reusable + ".json")).read_bytes()
                    if sha(old_bytes) != reusable: raise ValueError("Cached record hash mismatch")
                    record = json.loads(old_bytes)
                else:
                    record = source.bundle(entry, out)
                record.update({"bodyPath": body_path, "bodyOffset": body_offset})
                record_bytes = encoded(record); record_hash = sha(record_bytes); write_immutable(out / "records" / (record_hash + ".json"), record_bytes)
                identifier = "ml-" + slug(row["repository"].split("/")[1], 14) + "-" + slug(name, 24) + "-" + sha((row["repository"].lower() + "\0" + entry).encode())[:12]
                hints = [label for label, pattern in [("MCP", r"\bMCP\b|mcp__"), ("browser", r"chrome.devtools|playwright|browser"), ("Python", r"\bpython|\bpip |\buvx? "), ("R", r"Rscript|\blibrary\("), ("Stata", r"\bstata\b"), ("credentials", r"API[_ -]?KEY|sign.in|log.in|登录"), ("Zotero", r"zotero"), ("NotebookLM", r"notebooklm")] if re.search(pattern, body, re.I)]
                blocked = problem or ("body-over-2MiB" if len(body.encode()) > 2 * 1024 * 1024 else None) or ("bundle-over-56MiB" if record["archiveSize"] > 56 * 1024 * 1024 else None)
                license_value = header.get("license")
                license_files = [f["path"] for f in record["files"] if f["path"].rsplit("/", 1)[-1].lower().startswith(("license", "copying"))]
                item = {"id": identifier, "name": str(name), "description": description.strip()[:600], "descriptionExcerpt": len(description.strip()) > 600, "whenToUse": str(header.get("whenToUse") or "")[:240], "invocation": {"modelInvocable": not bool(header.get("disable-model-invocation", False)) and blocked is None, "userInvocable": False}, "library": True, "source": {"kind": "metis-library", "repository": row["repository"], "ref": row["commit"], "entryPath": entry, "bundle": record_hash}, "license": {"declared": str(license_value)[:180] if license_value else None, "files": license_files[:12], "status": "source-evidence-preserved" if license_files or license_value else "not-declared"}, "dependencyHints": hints, "availability": "indexed" if blocked is None else "read-only", "formatIssue": blocked, "verification": "not-run-in-METIS", "resourceCount": len(record["files"]), "remoteResources": sum(bool(f.get("external")) for f in record["files"]), "bodyBytes": len(body.encode()), "bodyHash": sha(body.encode()), "origins": [row["repository"]] + [p["parent"] for p in row.get("parents", [])]}
                evidence = source.evidence.get(entry) or linked_evidence.get((row["repository"], entry))
                if evidence: item["upstreamEvidence"] = evidence
                all_entries.append(item); count += 1
            except Exception as error:
                entry_errors.append({"entry": entry, "error": str(error)})
        receipts.append({"repository": row["repository"], "commit": row["commit"], "derived": bool(row.get("derived")), "parents": row.get("parents", []), "treeEntries": len(source.entries), "indexed": count, "files": len(source.records), "cachedFiles": len(source.cache), "skipped": source.skipped, "errors": entry_errors})
        print(json.dumps({"repository": row["repository"], "indexed": count, "entryErrors": len(entry_errors), "skippedFiles": len(source.skipped)}, ensure_ascii=False), flush=True)
    all_entries.sort(key=lambda row: row["id"])
    seen = {}
    for item in all_entries:
        if item["bodyHash"] in seen: item["duplicateOf"] = seen[item["bodyHash"]]
        else: seen[item["bodyHash"]] = item["id"]
    catalog = {"version": 1, "sources": receipts, "failures": failures, "entries": all_entries}
    payload = encoded(catalog); revision = sha(payload); write_immutable(out / "catalogs" / (revision + ".json"), payload)
    (out / "index.json").write_text(json.dumps({"version": 1, "catalogHash": revision, "total": len(all_entries)}, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"catalogHash": revision, "entries": len(all_entries), "bindableMetadataEntries": sum(r["availability"] == "indexed" for r in all_entries), "sources": len(receipts), "failedSources": len(failures), "entryErrors": sum(len(r["errors"]) for r in receipts)}, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    main()

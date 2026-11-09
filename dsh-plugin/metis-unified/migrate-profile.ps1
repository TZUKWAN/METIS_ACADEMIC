#requires -Version 7.0
<#
Cold migration only. Plan is read-only; Apply/Restore refuse running DSH.
Only METIS local-link entries and junctions are changed. Other dependencies are
not resolved or reinstalled; a pre-existing unrelated lockfile problem is retained.
This script never stops, starts or reloads an application.
#>
[CmdletBinding()]
param(
    [ValidateSet('Plan', 'Apply', 'Restore')][string]$Action = 'Plan',
    [string]$ProfilePath,
    [string]$BackupPath,
    [ValidateSet('Preserve', 'On', 'Off')][string]$State = 'Preserve'
)

$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $false
$packageName = 'metis-academic-preset'
$legacyNames = @('metis-academic', 'metis-academic-mode', $packageName)
$bundleRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$dshTaskHome = if ($env:DSH_HOME) { $env:DSH_HOME } else { Join-Path ([Environment]::GetFolderPath('UserProfile')) '.dsh' }
if (-not $ProfilePath) { $ProfilePath = Join-Path $dshTaskHome 'profiles\desktop' }
if (-not [IO.Path]::IsPathFullyQualified($ProfilePath)) { throw 'ProfilePath must be absolute.' }
$profileDir = (Get-Item -LiteralPath $ProfilePath -Force).FullName
$backupRoot = Join-Path $profileDir '.metis-unified-backups'
$manifestPath = Join-Path $profileDir 'package.json'
$utf8 = [Text.UTF8Encoding]::new($false)
$linkSpec = 'link:' + $bundleRoot.Replace('\', '/')
$oldRoot = 'link:' + (Join-Path $bundleRoot 'dsh-plugin').Replace('\', '/')
$expected = @{
    'metis-academic' = $oldRoot + '/metis-academic'
    'metis-academic-mode' = $oldRoot + '/metis-mode'
    'metis-academic-preset' = $oldRoot + '/metis-preset'
}

function Read-Bytes([string]$Path) { return ,([IO.File]::ReadAllBytes($Path)) }
function Hash-Bytes([byte[]]$Bytes) { return [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($Bytes)).ToLowerInvariant() }
function Read-Json([string]$Path) { return [IO.File]::ReadAllText($Path) | ConvertFrom-Json -AsHashtable }
function Write-Atomic([string]$Path, [byte[]]$Bytes) {
    $temporary = Join-Path (Split-Path -Parent $Path) ('.metis-write-' + [guid]::NewGuid().ToString('N'))
    try {
        $stream = [IO.File]::Open($temporary, [IO.FileMode]::CreateNew, [IO.FileAccess]::Write, [IO.FileShare]::None)
        try { $stream.Write($Bytes, 0, $Bytes.Length); $stream.Flush($true) } finally { $stream.Dispose() }
        [IO.File]::Move($temporary, $Path, $true)
    } finally {
        if (Test-Path -LiteralPath $temporary) { Remove-Item -LiteralPath $temporary -Force }
    }
}
function Assert-Cold {
    $targetProfileName = Split-Path -Leaf $profileDir
    $busy = @(Get-CimInstance Win32_Process -ErrorAction Stop | Where-Object {
        if ($_.Name -match '^(DeepSeek Harness|dsh|deepseek-harness)(\.exe)?$') { return $true }
        if ($_.Name -notmatch '^(node|electron|python[0-9.]*|pnpm)(\.exe)?$' -or
            $_.CommandLine -notmatch '(?i)(DeepSeek Harness|@deepseek-ai[/\\]+dsh|deepseek-harness|metis_academic[. ]|[/\\]profiles[/\\])') { return $false }
        # Native CLI profiles have separate manifests, links and overrides. Do not
        # block or stop unrelated development hosts when migrating desktop only.
        # Unknown invocations remain conservative; only a single, explicit native
        # CLI profile with a simple name proves a different profile is in use.
        if ($_.Name -match '^node(?:\.exe)?$' -and $_.CommandLine -match '(?i)@deepseek-ai[/\\]+dsh[/\\]+lib[/\\]+bin\.js(?:["\s]|$)') {
            $profiles = [regex]::Matches($_.CommandLine, '(?i)(?:^|\s)--profile(?:=|\s+)(?:"(?<name>[a-z0-9_-]+)"|''(?<name>[a-z0-9_-]+)''|(?<name>[a-z0-9_-]+)(?=\s|$))')
            if ($profiles.Count -eq 1 -and $profiles[0].Groups['name'].Value -ne $targetProfileName) { return $false }
        }
        return $true
    })
    if ($busy.Count) { throw ('DSH or a related package operation is running. Nothing will be stopped. Close it yourself first. PIDs: ' + (($busy | ForEach-Object ProcessId) -join ', ')) }
}
function Invoke-OfflineInstall([switch]$Frozen) {
    Assert-Cold
    $lockOption = if ($Frozen) { '--frozen-lockfile' } else { '--no-frozen-lockfile' }
    & $script:pnpmCommand --dir $profileDir install --offline --ignore-scripts $lockOption --reporter append-only
    if ($LASTEXITCODE -ne 0) { throw ('pnpm install failed with exit code ' + $LASTEXITCODE) }
}
function Rewrite-MetisLock([string]$Text) {
    $rows = [regex]::Matches($Text, '(?m)^      (metis-academic(?:-mode|-preset)?):\r?\n(?:        [^\r\n]*\r?\n)+')
    if ($rows.Count -notin @(1, 3) -or @($rows | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique).Count -ne $rows.Count) { throw 'Unsupported METIS lockfile entries; no migration performed.' }
    foreach ($row in $rows) {
        $name = $row.Groups[1].Value
        $allowed = @($expected[$name])
        if ($name -eq $packageName) { $allowed += $linkSpec }
        $valid = $false
        foreach ($spec in $allowed) {
            $wanted = "      ${name}:`n        specifier: $spec`n        version: $spec`n"
            if ($row.Value.Replace("`r`n", "`n") -eq $wanted) { $valid = $true }
        }
        if (-not $valid) { throw ('Unexpected METIS lockfile entry: ' + $name) }
    }
    if ($rows.Count -eq 1 -and $rows[0].Groups[1].Value -ne $packageName) { throw 'METIS preset lockfile entry is missing.' }
    $newline = if ($Text.Contains("`r`n")) { "`r`n" } else { "`n" }
    $replacement = "      ${packageName}:${newline}        specifier: ${linkSpec}${newline}        version: ${linkSpec}${newline}"
    $rewritten = $Text
    for ($i = $rows.Count - 1; $i -ge 0; $i--) {
        $value = if ($i -eq 0) { $replacement } else { '' }
        $rewritten = $rewritten.Remove($rows[$i].Index, $rows[$i].Length).Insert($rows[$i].Index, $value)
    }
    return $rewritten
}
function Read-MetisLinks {
    $links = [ordered]@{}
    foreach ($name in $legacyNames) {
        $path = Join-Path $profileDir ('node_modules\' + $name)
        $item = Get-Item -LiteralPath $path -Force -ErrorAction SilentlyContinue
        if (-not $item) { $links[$name] = $null; continue }
        if ($item.LinkType -ne 'Junction' -or @($item.Target).Count -ne 1) { throw ('METIS installation must be an existing local junction: ' + $name) }
        $target = [IO.Path]::GetFullPath([string]$item.Target)
        $allowed = @([IO.Path]::GetFullPath($expected[$name].Substring(5)))
        if ($name -eq $packageName) { $allowed += $bundleRoot }
        if ($target -notin $allowed) { throw ('Unexpected METIS junction target: ' + $name) }
        $links[$name] = $target
    }
    return $links
}
function Sync-MetisLinks([Collections.IDictionary]$Desired) {
    Assert-Cold
    $current = Read-MetisLinks
    foreach ($name in $legacyNames) {
        if (-not $Desired.Contains($name)) { throw 'Incomplete METIS link transaction.' }
        if ($current[$name] -eq $Desired[$name]) { continue }
        $path = Join-Path $profileDir ('node_modules\' + $name)
        # These are validated junctions, never directories or their targets.
        if ($current[$name]) { [IO.Directory]::Delete($path) }
        if ($Desired[$name]) { New-Item -ItemType Junction -Path $path -Target $Desired[$name] -ErrorAction Stop | Out-Null }
    }
}
function Saved-File([string]$Name) {
    if ($Name -notin @('package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'cordis.patch.yml', 'node_modules\.pnpm\lock.yaml')) { throw 'Unexpected backup filename.' }
    return Join-Path $profileDir $Name
}
function Restore-Files([Collections.IDictionary]$Record, [string]$Directory) {
    Assert-Cold
    if ($Record.profile -ne $profileDir -or $Record.version -ne 1) { throw 'Backup belongs to a different profile or version.' }
    # Review all hashes before changing anything; never overwrite later user edits.
    foreach ($item in $Record.files) {
        $target = Saved-File $item.name
        $saved = Join-Path $Directory $item.name
        if ((Hash-Bytes (Read-Bytes $saved)) -ne $item.beforeSha256) { throw ('Damaged backup: ' + $item.name) }
        if (Test-Path -LiteralPath $target) {
            $current = Hash-Bytes (Read-Bytes $target)
            if ($current -ne $item.beforeSha256 -and $current -ne $item.afterSha256) { throw ('File changed after migration; preserve it before restoring: ' + $item.name) }
        } elseif ($item.afterSha256) { throw ('File removed after migration: ' + $item.name) }
    }
    foreach ($item in $Record.files) { Write-Atomic (Saved-File $item.name) (Read-Bytes (Join-Path $Directory $item.name)) }
    if ($Record.method -eq 'metis-local-links-only') { Sync-MetisLinks $Record.links }
    else { Invoke-OfflineInstall -Frozen }
}

$unified = Read-Json (Join-Path $bundleRoot 'package.json')
if ($unified.name -ne $packageName) { throw 'Unified package identity mismatch.' }
if ($Action -eq 'Restore') {
    if (-not $BackupPath -or -not [IO.Path]::IsPathFullyQualified($BackupPath)) { throw 'Restore needs an absolute BackupPath.' }
    $restoration = (Get-Item -LiteralPath $BackupPath -Force).FullName
    if (-not $restoration.StartsWith($backupRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'BackupPath must be inside this profile migration backup folder.' }
    $record = Read-Json (Join-Path $restoration 'transaction.json')
    $pnpmCommand = (Get-Command pnpm -ErrorAction Stop).Source
    Assert-Cold
    $restoreLockPath = Join-Path $profileDir '.metis-unified-migration.lock'
    $restoreLock = [IO.File]::Open($restoreLockPath, [IO.FileMode]::OpenOrCreate, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None)
    try {
        Restore-Files $record $restoration
        Write-Output 'Profile files and dependencies restored. DSH was not started.'
    } finally {
        $restoreLock.Dispose()
        Remove-Item -LiteralPath $restoreLockPath -Force
    }
    exit 0
}

$manifestBefore = Read-Bytes $manifestPath
$candidate = $utf8.GetString($manifestBefore) | ConvertFrom-Json -AsHashtable
$beforeJson = $candidate | ConvertTo-Json -Depth 100 -Compress
if ($candidate.dependencies -isnot [Collections.IDictionary] -or $candidate.dsh.profile.bundles -isnot [array]) { throw 'Unsupported profile manifest structure.' }
$selected = @($candidate.dsh.profile.bundles)
if ($selected | Where-Object { $_ -isnot [string] }) { throw 'Bundle selections must be strings.' }
foreach ($name in $legacyNames) {
    if ($candidate.dependencies.Contains($name) -and $candidate.dependencies[$name] -ne $expected[$name] -and -not ($name -eq $packageName -and $candidate.dependencies[$name] -eq $linkSpec)) {
        throw ('Unexpected installation source; no migration performed: ' + $name)
    }
}
if (-not $candidate.dependencies.Contains($packageName)) { throw 'This migration expects the existing METIS preset dependency.' }
$installed = @($legacyNames | Where-Object { $candidate.dependencies.Contains($_) })
$enabledParts = @($installed | Where-Object { $_ -in $selected })
if ($State -eq 'Preserve' -and $enabledParts.Count -ne 0 -and $enabledParts.Count -ne $installed.Count) { throw 'Legacy switches differ. Choose -State On or -State Off explicitly.' }
$enabled = if ($State -eq 'Preserve') { $enabledParts.Count -gt 0 } else { $State -eq 'On' }
$bundles = [Collections.Generic.List[string]]::new()
$inserted = $false
foreach ($name in $selected) {
    if ($name -in $legacyNames) {
        if ($enabled -and -not $inserted) { $bundles.Add($packageName); $inserted = $true }
    } else { $bundles.Add($name) }
}
if ($enabled -and -not $inserted) { $bundles.Add($packageName) }
foreach ($name in @('metis-academic', 'metis-academic-mode')) { [void]$candidate.dependencies.Remove($name) }
$candidate.dependencies[$packageName] = $linkSpec
$candidate.dsh.profile.bundles = $bundles.ToArray()
$nextText = ($candidate | ConvertTo-Json -Depth 100) + "`n"
$baseline = @{ 'package.json' = Hash-Bytes $manifestBefore }
$changes = [ordered]@{ 'package.json' = $utf8.GetBytes($nextText) }

# Preserve profile overrides on the same row IDs, including explicit disables.
$patchPath = Join-Path $profileDir 'cordis.patch.yml'
if (Test-Path -LiteralPath $patchPath) {
    $patchBytes = Read-Bytes $patchPath
    $patch = $utf8.GetString($patchBytes)
    $baseline['cordis.patch.yml'] = Hash-Bytes $patchBytes
    $rewritten = $patch
    foreach ($mapping in @(@('metis-academic-mode', "$packageName/workbench"), @('metis-academic', "$packageName/runtime"))) {
        $pattern = '(?m)^([ \t]*name:[ \t]*)([''"]?)' + [regex]::Escape($mapping[0]) + '\2([ \t]*(?:#[^\r\n]*)?)\r?$'
        $replacement = '$1$2' + $mapping[1] + '$2$3'
        $rewritten = [regex]::Replace($rewritten, $pattern, $replacement)
    }
    if ($rewritten -match '(?m)^\s*name:.*metis-academic(?:-mode)?(?=[\s''"]|$)') { throw 'A profile override uses an unsupported legacy module expression; no migration performed.' }
    if ($rewritten -ne $patch) { $changes['cordis.patch.yml'] = $utf8.GetBytes($rewritten) }
}
# Home/CLI overlays may affect other profiles. Never silently rewrite those.
$homePatch = Join-Path (Split-Path -Parent (Split-Path -Parent $profileDir)) 'cordis.patch.yml'
if (Test-Path -LiteralPath $homePatch) {
    $homeText = [IO.File]::ReadAllText($homePatch)
    if ($homeText -match '(?m)^\s*name:.*metis-academic(?:-mode)?(?=[\s''"]|$)') { throw 'Home overlay refers to legacy METIS modules; review it before migrating this profile.' }
}
$sourceHash = (Get-FileHash -LiteralPath (Join-Path $bundleRoot 'dsh-plugin\metis-mode\client\client.js') -Algorithm SHA256).Hash.ToLowerInvariant()
$client = [IO.File]::ReadAllText((Join-Path $PSScriptRoot 'client.js'))
if (-not $client.Contains('// Source SHA-256: ' + $sourceHash)) { throw 'Client artifact is stale. Run prepare-client.py before migration.' }
if (($unified.dependencies -and $unified.dependencies.Count) -or ($unified.optionalDependencies -and $unified.optionalDependencies.Count)) { throw 'Local-link migration requires the unified bundle to have no package dependencies.' }
foreach ($lockName in @('pnpm-lock.yaml', 'node_modules\.pnpm\lock.yaml')) {
    $lockFile = Saved-File $lockName
    if (-not (Test-Path -LiteralPath $lockFile)) { throw ('Missing existing lockfile: ' + $lockName) }
    $lockBytes = Read-Bytes $lockFile
    $baseline[$lockName] = Hash-Bytes $lockBytes
    $lockText = $utf8.GetString($lockBytes)
    $nextLock = Rewrite-MetisLock $lockText
    if ($nextLock -ne $lockText) { $changes[$lockName] = $utf8.GetBytes($nextLock) }
}
$linksBefore = Read-MetisLinks

if ($Action -eq 'Plan') {
    [ordered]@{ action = 'read-only-plan'; profile = $profileDir; package = $packageName; version = $unified.version; source = $linkSpec; enabled = $enabled; removeDependencies = @('metis-academic', 'metis-academic-mode'); beforeBundles = $selected; afterBundles = $bundles.ToArray(); changedProfilePatch = $changes.Contains('cordis.patch.yml'); method = 'metis-local-links-only'; pluginExecution = 'not-performed' } | ConvertTo-Json -Depth 10
    exit 0
}

Assert-Cold
if ($beforeJson -eq ($candidate | ConvertTo-Json -Depth 100 -Compress) -and $changes.Count -eq 1) {
    Write-Output 'This profile already selects the unified METIS package. No changes made.'
    exit 0
}
foreach ($required in @('pnpm-lock.yaml', 'pnpm-workspace.yaml')) {
    if (-not (Test-Path -LiteralPath (Join-Path $profileDir $required))) { throw ('This migration requires the existing ' + $required) }
}
$pnpmCommand = (Get-Command pnpm -ErrorAction Stop).Source
$lockPath = Join-Path $profileDir '.metis-unified-migration.lock'
$lock = [IO.File]::Open($lockPath, [IO.FileMode]::OpenOrCreate, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None)
try {
    Assert-Cold
    foreach ($name in $baseline.Keys) {
        if ((Hash-Bytes (Read-Bytes (Saved-File $name))) -ne $baseline[$name]) { throw ('Profile changed while planning: ' + $name) }
    }
    $backupDir = Join-Path $backupRoot ((Get-Date -Format 'yyyyMMdd-HHmmss') + '-' + [guid]::NewGuid().ToString('N'))
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    $record = [ordered]@{ version = 1; profile = $profileDir; bundleRoot = $bundleRoot; status = 'prepared'; method = 'metis-local-links-only'; links = $linksBefore; files = @() }
    foreach ($name in @('package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'cordis.patch.yml', 'node_modules\.pnpm\lock.yaml')) {
        $target = Saved-File $name
        if (-not (Test-Path -LiteralPath $target)) { continue }
        $bytes = Read-Bytes $target
        if ($baseline.Contains($name) -and (Hash-Bytes $bytes) -ne $baseline[$name]) { throw ('Profile changed before backup: ' + $name) }
        $backupFile = Join-Path $backupDir $name
        [IO.Directory]::CreateDirectory((Split-Path -Parent $backupFile)) | Out-Null
        [IO.File]::WriteAllBytes($backupFile, $bytes)
        $record.files += [ordered]@{ name = $name; beforeSha256 = Hash-Bytes $bytes; afterSha256 = Hash-Bytes $bytes }
    }
    $recordPath = Join-Path $backupDir 'transaction.json'
    Write-Atomic $recordPath ($utf8.GetBytes(($record | ConvertTo-Json -Depth 10) + "`n"))
    $mutated = $false
    try {
        Assert-Cold
        foreach ($item in $record.files) {
            if ((Hash-Bytes (Read-Bytes (Saved-File $item.name))) -ne $item.beforeSha256) { throw ('Profile changed after backup: ' + $item.name) }
        }
        foreach ($entry in $changes.GetEnumerator()) {
            Write-Atomic (Saved-File $entry.Key) $entry.Value
            $mutated = $true
        }
        $desiredLinks = [ordered]@{ 'metis-academic' = $null; 'metis-academic-mode' = $null; 'metis-academic-preset' = $bundleRoot }
        Sync-MetisLinks $desiredLinks
        $actual = Read-Json $manifestPath
        $sameDependencies = $actual.dependencies.Count -eq $candidate.dependencies.Count
        foreach ($name in $candidate.dependencies.Keys) {
            if (-not $actual.dependencies.Contains($name) -or $actual.dependencies[$name] -ne $candidate.dependencies[$name]) { $sameDependencies = $false }
        }
        if (-not $sameDependencies -or ($actual.dsh | ConvertTo-Json -Depth 100 -Compress) -ne ($candidate.dsh | ConvertTo-Json -Depth 100 -Compress)) { throw 'Package manager changed unexpected profile declarations.' }
        $record.status = 'applied'
    } catch {
        $problem = $_
        $record.status = 'failed'
    } finally {
        foreach ($item in $record.files) {
            $target = Saved-File $item.name
            $item.afterSha256 = if (Test-Path -LiteralPath $target) { Hash-Bytes (Read-Bytes $target) } else { $null }
        }
        Write-Atomic $recordPath ($utf8.GetBytes(($record | ConvertTo-Json -Depth 10) + "`n"))
    }
    if ($record.status -eq 'failed') {
        if (-not $mutated) { throw ('Migration stopped before editing profile files: ' + $problem.Exception.Message + '. Backup: ' + $backupDir) }
        try { Restore-Files $record $backupDir; $record.status = 'rolled-back' }
        catch { throw ('Migration failed: ' + $problem.Exception.Message + '. Rollback incomplete: ' + $_.Exception.Message + '. Backup: ' + $backupDir) }
        Write-Atomic $recordPath ($utf8.GetBytes(($record | ConvertTo-Json -Depth 10) + "`n"))
        throw ('Migration failed and original profile was restored: ' + $problem.Exception.Message + '. Backup: ' + $backupDir)
    }
    Write-Output ('Unified METIS profile saved. DSH was not started or tested. Backup: ' + $backupDir)
} finally {
    $lock.Dispose()
    Remove-Item -LiteralPath $lockPath -Force
}

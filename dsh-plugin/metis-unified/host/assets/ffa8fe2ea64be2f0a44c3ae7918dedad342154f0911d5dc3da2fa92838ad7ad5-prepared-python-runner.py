"""Run an actual entry with verified host-managed dependencies, not a second installer.

Only the audited EMARX bootstrap contract is replaced by an explicit host
adapter. Business code is unchanged. No fabricated package availability or
task results, and no automatic pip/browser downloads.
"""
import ast
import importlib.util
import importlib.abc
import importlib.machinery
import json
import os
from pathlib import Path
import runpy
import shlex
import subprocess
import sys

PACKAGES = {'docx': 'python-docx', 'pptx': 'python-pptx', 'PIL': 'pillow', 'bs4': 'beautifulsoup4',
            'cv2': 'opencv-python', 'fitz': 'PyMuPDF', 'yaml': 'PyYAML', 'pypdf': 'pypdf',
            'pdfplumber': 'pdfplumber', 'requests': 'requests', 'lxml': 'lxml', 'numpy': 'numpy',
            'pandas': 'pandas', 'openpyxl': 'openpyxl', 'playwright': 'playwright', 'httpx': 'httpx',
            'typing_extensions': 'typing_extensions', 'packaging': 'packaging'}
ENTRY_ROOTS = []


def entry_imports(path, root, seen=None):
    seen = set() if seen is None else seen
    if path in seen or len(seen) > 64:
        return set()
    seen.add(path)
    if path.stat().st_size > 4 * 1024 * 1024:
        raise ValueError('Entry source exceeds bounded dependency analysis')
    tree = ast.parse(path.read_text('utf-8-sig'))
    modules = set()
    # Optional try/import fallbacks are left to Python's actual execution.
    for node in tree.body:
        if isinstance(node, ast.Import):
            names = [item.name.split('.')[0] for item in node.names]
        elif isinstance(node, ast.ImportFrom) and not node.level:
            names = [(node.module or '').split('.')[0]]
        else:
            continue
        for name in names:
            if not name or name in sys.stdlib_module_names or name == 'emarx_env':
                continue
            candidates = [base / (name + '.py') for base in [path.parent, root] + ENTRY_ROOTS]
            candidates += [base / name / '__init__.py' for base in [path.parent, root] + ENTRY_ROOTS]
            local = next((candidate.resolve() for candidate in candidates if candidate.is_file() and any(candidate.resolve().is_relative_to(base) for base in [root, path.parent] + ENTRY_ROOTS)), None)
            if local is not None:
                modules.update(entry_imports(local, root, seen))
            else:
                modules.add(name)
    return modules


def inspect_entry(path, root):
    visited = set()
    modules = sorted(entry_imports(path, root, visited))
    office = set()
    for source in visited:
        for node in ast.walk(ast.parse(source.read_text('utf-8-sig'))):
            names = [item.name for item in node.names] if isinstance(node, ast.Import) else [node.module or ''] if isinstance(node, ast.ImportFrom) else []
            office.update(name for name in names if name.split('.')[0] in ('win32com', 'pythoncom', 'comtypes'))
    missing = [name for name in modules if importlib.util.find_spec(name) is None]
    return {'entry': str(path), 'modules': modules, 'missingModules': missing,
            'packages': sorted({PACKAGES[name] for name in missing if name in PACKAGES}),
            'allPackages': sorted({PACKAGES[name] for name in modules if name in PACKAGES}),
            'unmappedModules': [name for name in missing if name not in PACKAGES],
            'unmappedImports': [name for name in modules if name not in PACKAGES],
            'officeComImports': sorted(office),
            'readyForEntry': not missing, 'dependencyScope': 'actual-entry-top-level-imports',
            'python': sys.executable, 'automaticInstallation': False}


def emit(value):
    print('METIS_ENTRY_ENVIRONMENT=' + json.dumps(value, ensure_ascii=False), flush=True)


def main():
    if len(sys.argv) < 4:
        raise ValueError('Expected managed root, expected Python, and real Python arguments')
    root = Path(sys.argv[1]).resolve()
    expected = Path(sys.argv[2]).resolve()
    argv = sys.argv[3:]
    if Path(sys.executable).resolve() != expected:
        raise ValueError('Prepared interpreter identity mismatch')
    probe = argv[0] == '--probe'
    if probe:
        argv = argv[1:]
    if not argv:
        raise ValueError('Missing entry')
    flags = []
    while argv and argv[0] in ('-u', '-B', '-E', '-s', '-S', '-I', '-X', '-W'):
        flag = argv.pop(0); flags.append(flag)
        if flag in ('-X', '-W'):
            flags.append(argv.pop(0))
    if flags:
        os.execv(sys.executable, [sys.executable] + flags + [str(Path(__file__).resolve()), str(root), str(expected)] + (['--probe'] if probe else []) + argv)
    if argv[0].startswith('-'):
        # Native Python CLI semantics are retained for -c/-m, including explicit
        # dependency actions. No marker claims an untested whole skill is ready.
        os.execv(sys.executable, [sys.executable] + argv)
    entry = Path(argv[0]).resolve()
    if not entry.is_file():
        raise ValueError('Actual Python entry does not exist: ' + str(entry))
    ENTRY_ROOTS[:] = [root, root / 'scripts', entry.parent]
    info = inspect_entry(entry, root)
    if probe:
        emit(info)
        return
    if os.environ.get('METIS_FORBID_OFFICE_COM') == '1' and info['officeComImports']:
        emit({**info, 'readyForEntry': False, 'reason': 'This step prohibits Office COM; select a compatible entry. No Office process or installer was started.'})
        raise SystemExit(44)
    if not info['readyForEntry']:
        emit(info)
        raise SystemExit(42)
    bootstrap = entry.parent / 'emarx_env.py' if entry.is_relative_to(root) else root / 'scripts/emarx_env.py'
    if not bootstrap.is_file():
        bootstrap = root / 'scripts/emarx_env.py'
    if bootstrap.is_file() and entry.name not in ('setup_emarx.py', 'emarx_env.py'):
        source = bootstrap.read_text('utf-8-sig')
        if not all(value in source for value in ['EMARX_VENV_ACTIVE', 'def ensure_venv_and_reexec', 'def get_skill_root']):
            emit({**info, 'readyForEntry': False, 'reason': 'Unrecognized upstream bootstrap contract; no installer or entry was run'})
            raise SystemExit(43)
        def ensure():
            current = inspect_entry(entry, root)
            emit({**current, 'bootstrapAdapter': 'emarx-managed-entry-v1'})
            if not current['readyForEntry']:
                raise SystemExit(42)

        class ManagedLoader(importlib.abc.Loader):
            def create_module(self, spec):
                return None

            def exec_module(self, managed):
                managed.ensure_venv_and_reexec = ensure
                managed.get_skill_root = lambda: bootstrap.parent.parent
                managed.get_venv_dir = lambda: Path(sys.prefix)
                managed.get_venv_python = lambda: Path(sys.executable)
                managed.venv_exists = lambda: Path(sys.executable).is_file()
                managed.__file__ = str(bootstrap)

        class ManagedFinder(importlib.abc.MetaPathFinder):
            def find_spec(self, fullname, path=None, target=None):
                if fullname != 'emarx_env':
                    return None
                original = importlib.machinery.PathFinder.find_spec(fullname, path)
                if original and original.origin and Path(original.origin).resolve() == bootstrap.resolve():
                    return importlib.util.spec_from_loader(fullname, ManagedLoader(), origin=str(bootstrap))
                return None

        sys.meta_path.insert(0, ManagedFinder())
    sys.argv = [str(entry)] + argv[1:]
    sys.path.insert(0, str(entry.parent))
    if os.environ.get('METIS_PYTHON_DOCX_ONLY') == '1':
        original_popen = subprocess.Popen

        class FileOnlyPopen(original_popen):
            def __init__(self, command, *args, **kwargs):
                values = list(command) if isinstance(command, (list, tuple)) else shlex.split(str(command), posix=os.name != 'nt')
                executable = Path(str(values[0]).strip('"\'')).name.lower() if values else ''
                if executable in ('pandoc', 'pandoc.exe', 'soffice', 'soffice.exe', 'libreoffice', 'libreoffice.exe') and not any(value in ('--help', '--version') for value in values[1:]):
                    raise PermissionError('METIS_ENTRY_CONTRACT: this step requires pure python-docx; incompatible converter was not started')
                super().__init__(command, *args, **kwargs)

        subprocess.Popen = FileOnlyPopen
    try:
        runpy.run_path(str(entry), run_name='__main__')
    except ModuleNotFoundError as error:
        module = (error.name or '').split('.')[0]
        emit({**info, 'readyForEntry': False, 'missingModules': [module],
              'packages': [PACKAGES[module]] if module in PACKAGES else [], 'reason': str(error)})
        raise


if __name__ == '__main__':
    main()

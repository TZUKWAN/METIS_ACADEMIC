"""Embed one scoped ION design source in independently loadable browser assets."""
from pathlib import Path
from hashlib import sha256
import json
import os
import tempfile

def atomic(path, data):
    if path.is_file() and path.read_bytes() == data:
        return
    fd, name = tempfile.mkstemp(prefix='.ion-ui-', dir=path.parent)
    try:
        with os.fdopen(fd, 'wb') as stream:
            stream.write(data)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(name, path)
    finally:
        Path(name).unlink(missing_ok=True)

def main():
    root = Path(__file__).resolve().parent.parent.parent
    client = root / 'dsh-plugin/metis-mode/client'
    sheets = ['ion-workbench.css', 'ion-refinement.css', 'ion-cockpit.css']
    css = '\n'.join((client / name).read_bytes().decode('utf-8') for name in sheets)
    digest = sha256(css.encode()).hexdigest()
    start = '// METIS_ION_STYLE_START'
    end = '// METIS_ION_STYLE_END'
    anchors = {
        'client.js': ('    const h = React.createElement;\n', '    '),
        'composer.js': ('  const h=React.createElement,copy=value=>JSON.parse(JSON.stringify(value));\n', '  '),
        'documents.js': ('  const h=React.createElement;\n', '  '),
    }
    sources = {}
    for name, (anchor, indent) in anchors.items():
        path = client / name
        source = path.read_text(encoding='utf-8')
        block = indent + start + '\n' + indent + '// Generated from ' + ' + '.join(sheets) + '. SHA-256 ' + digest + '\n' + indent + 'const ION_WORKBENCH_CSS=' + json.dumps(css, ensure_ascii=False) + ';\n' + indent + end
        if start in source:
            begin = source.rfind('\n', 0, source.index(start)) + 1
            finish = source.index(end, begin) + len(end)
            source = source[:begin] + block + source[finish:]
        else:
            if source.count(anchor) != 1:
                raise ValueError('Cannot locate the isolated browser factory: ' + name)
            source = source.replace(anchor, anchor + block + '\n', 1)
        atomic(path, source.encode())
        sources[name] = sha256(source.encode()).hexdigest()
    module = '// Generated from ' + ' + '.join(sheets) + '.\nexport const workbenchCss=' + json.dumps(css, ensure_ascii=False) + ';\n'
    atomic(client / 'ion-workbench-style.js', module.encode())
    receipt = {'themeSha256': digest, 'bytes': len(css.encode()), 'sheets': {name: sha256((client / name).read_bytes()).hexdigest() for name in sheets}, 'sources': sources, 'browserLoading': 'self-contained assets; no new resource endpoint'}
    atomic(client / 'ion-ui-build.json', (json.dumps(receipt, ensure_ascii=False, indent=2) + '\n').encode())
    print(json.dumps(receipt, ensure_ascii=False))

if __name__ == '__main__':
    main()

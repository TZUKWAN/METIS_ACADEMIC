"""METIS read-only artifact evidence. Never installs dependencies or edits artifacts."""
import base64
import hashlib
import io
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import zipfile
import xml.etree.ElementTree as ET

VERSION = 'artifact-evidence-v2'
MAX_FILE = 64 * 1024 * 1024
MAX_TOTAL = 256 * 1024 * 1024
MAX_FILES = 1024
MAX_PART = 8 * 1024 * 1024
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
A = '{http://schemas.openxmlformats.org/drawingml/2006/main}'


def digest(raw):
    return hashlib.sha256(raw).hexdigest()


def counts(text):
    return {'characters': len(text), 'nonWhitespace': len(re.sub(r'\s', '', text)),
            'hanCharacters': len(re.findall(r'[\u3400-\u4dbf\u4e00-\u9fff]', text)),
            'sentences': len([s for s in re.split(r'[。！？!?]+', text) if s.strip()]),
            'textSha256': digest(text.encode('utf-8'))}


def text_metrics(text, name):
    metrics = {'text': counts(text)}
    lines = text.splitlines()
    standalone = bool(re.search(r'abstract|摘要|s00', name, re.I))
    start = 0 if standalone else None
    inline = ''
    for i, line in enumerate(lines):
        match = re.match(r'^\s*(?:#+\s*)?(?:\*\*)?摘要(?:\*\*)?(?:\s*[:：]\s*(.*)|\s*)$', line)
        if match:
            start = i + 1
            inline = match.group(1) or ''
            break
    if start is not None:
        body = [inline] if inline else []
        keywords = ''
        boundary = 'end-of-file'
        for line in lines[start:]:
            if re.match(r'^\s*(?:#+\s*|[一二三四五六七八九十]+[、．.]|\d+[、.]|参考文献\s*$)', line):
                if body:
                    boundary = 'heading'
                    break
                continue
            match = re.match(r'^\s*(?:\*\*)?(?:关键词|關鍵詞|Keywords)(?:\*\*)?\s*[:：]\s*(.*)', line, re.I)
            if match:
                keywords = match.group(1)
                boundary = 'keywords'
                break
            body.append(line)
        abstract = '\n'.join(body).strip()
        metrics['abstract'] = {**counts(abstract), 'range': 'abstract body excluding heading and keywords',
                               'boundaryResolved': standalone or boundary != 'end-of-file',
                               'keywordCount': len([x for x in re.split(r'[；;，,、]', keywords) if x.strip()])}
    refs = re.findall(r'\[\^([^\]\n]+)\](?!:)', text)
    definitions = re.findall(r'^\[\^([^\]\n]+)\]:', text, re.M)
    if refs or definitions:
        metrics['markdownFootnotes'] = {'references': len(refs), 'definitions': len(definitions),
            'missingDefinitions': sorted(set(refs) - set(definitions)),
            'unusedDefinitions': sorted(set(definitions) - set(refs)),
            'duplicateDefinitions': sorted({x for x in definitions if definitions.count(x) > 1})}
    return metrics


def linked(path):
    return path.is_symlink() or bool(getattr(os.path, 'isjunction', lambda _: False)(path))


def read_bytes(path):
    if linked(path):
        raise ValueError('Linked/reparse artifacts are not followed')
    stat = path.stat()
    if stat.st_size > MAX_FILE:
        raise ValueError('File exceeds 64 MiB inspection bound; select the core artifact')
    with path.open('rb') as stream:
        raw = stream.read(MAX_FILE + 1)
    if len(raw) > MAX_FILE:
        raise ValueError('File grew beyond inspection bound')
    return raw


def zip_parts(raw):
    parts = {}
    with zipfile.ZipFile(io.BytesIO(raw)) as archive:
        if len(archive.infolist()) > 10000:
            raise ValueError('Too many Office package parts')
        for item in archive.infolist():
            if item.filename.endswith('.xml'):
                if item.file_size > MAX_PART:
                    raise ValueError('Office XML part exceeds 8 MiB: ' + item.filename)
                if item.filename.startswith(('word/', 'ppt/', 'xl/')):
                    parts[item.filename] = archive.read(item)
    if sum(map(len, parts.values())) > 64 * 1024 * 1024:
        raise ValueError('Office XML exceeds aggregate inspection bound')
    return parts


def office_content(raw, kind):
    parts = zip_parts(raw)
    text_parts = {}
    metrics = {}
    if kind == '.docx':
        if 'word/document.xml' not in parts:
            raise ValueError('DOCX has no word/document.xml')
        footnotes, refs, formats, toc, changes, comments = [], [], [], [], 0, 0
        for name, data in parts.items():
            if not re.match(r'^word/(?:document|footnotes|endnotes|header\d+|footer\d+|comments|settings|styles)\.xml$', name):
                continue
            xml = ET.fromstring(data)
            if name not in ('word/settings.xml', 'word/styles.xml'):
                paragraphs = [''.join(n.text or '' for n in paragraph.iter(W + 't')) for paragraph in xml.iter(W + 'p')]
                text_parts[name] = '\n'.join(paragraphs)
            if name == 'word/footnotes.xml':
                footnotes = [node.attrib.get(W + 'id') for node in xml.iter(W + 'footnote') if int(node.attrib.get(W + 'id', '0')) > 0]
            if name == 'word/document.xml':
                refs = [node.attrib.get(W + 'id') for node in xml.iter(W + 'footnoteReference')]
                changes = len(list(xml.iter(W + 'ins'))) + len(list(xml.iter(W + 'del')))
                toc = [node.text or '' for node in xml.iter(W + 'instrText') if re.search(r'\bTOC\b', node.text or '')]
                toc += [node.attrib.get(W + 'instr', '') for node in xml.iter(W + 'fldSimple') if re.search(r'\bTOC\b', node.attrib.get(W + 'instr', ''))]
            for node in xml.iter(W + 'footnotePr'):
                formats.append({'part': name, 'properties': {child.tag.split('}')[-1]: child.attrib.get(W + 'val') for child in node}})
            if name == 'word/comments.xml':
                comments = len(list(xml.iter(W + 'comment')))
        metrics.update(footnotes={'references': len(refs), 'definitions': len(footnotes),
            'missingDefinitions': sorted(set(refs) - set(footnotes)), 'unusedDefinitions': sorted(set(footnotes) - set(refs)),
            'numbering': formats}, tocFields=len(toc), trackedChanges=changes, comments=comments)
        body = text_parts.get('word/document.xml', '')
        metrics.update(text_metrics(body, 'document'))
    elif kind == '.pptx':
        slides = sorted([name for name in parts if re.match(r'^ppt/slides/slide\d+\.xml$', name)], key=lambda n: int(re.search(r'(\d+)\.xml$', n).group(1)))
        for name in slides:
            xml = ET.fromstring(parts[name])
            text_parts[name] = '\n'.join(n.text or '' for n in xml.iter(A + 't'))
        metrics['slides'] = len(slides)
    elif kind == '.xlsx':
        ns = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
        strings = []
        if 'xl/sharedStrings.xml' in parts:
            strings = [''.join(n.text or '' for n in item.iter(ns + 't')) for item in ET.fromstring(parts['xl/sharedStrings.xml']).iter(ns + 'si')]
        for name, data in parts.items():
            if not re.match(r'^xl/worksheets/sheet\d+\.xml$', name):
                continue
            rows = []
            for cell in ET.fromstring(data).iter(ns + 'c'):
                value = cell.find(ns + 'v'); formula = cell.find(ns + 'f')
                body = value.text if value is not None else ''.join(n.text or '' for n in cell.iter(ns + 't'))
                if cell.attrib.get('t') == 's' and body is not None:
                    body = strings[int(body)]
                rows.append(cell.attrib.get('r', '') + ': ' + str(body or '') + (' [formula: ' + (formula.text or '') + ']' if formula is not None else ''))
            text_parts[name] = '\n'.join(rows)
        metrics['sheets'] = len(text_parts)
        metrics['formulaRecalculation'] = 'not-performed'
    text = '\n\n'.join('[' + name + ']\n' + value for name, value in text_parts.items())
    return text, text_parts, parts, metrics


def extract(raw, path):
    kind = path.suffix.lower()
    if kind in ('.docx', '.pptx', '.xlsx'):
        text, text_parts, xml, metrics = office_content(raw, kind)
        return text, text_parts, xml, metrics, None
    if kind == '.pdf':
        if not raw.startswith(b'%PDF-'):
            raise ValueError('Invalid PDF header')
        try:
            from pypdf import PdfReader
            pages = [(page.extract_text() or '') for page in PdfReader(io.BytesIO(raw)).pages]
            if not ''.join(pages).strip():
                return '', {}, {}, {'pages': len(pages)}, {'reason': 'PDF has no selectable text; actual OCR evidence is required', 'adapter': 'ocr-required'}
            text = '\n\n'.join('[page ' + str(i + 1) + ']\n' + page for i, page in enumerate(pages))
            return text, {'page:' + str(i + 1): body for i, body in enumerate(pages)}, {}, {'pages': len(pages), **text_metrics(text, path.name)}, None
        except ImportError:
            executable = shutil.which('pdftotext')
            if executable:
                result = subprocess.run([executable, '-layout', str(path), '-'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=25)
                if result.returncode:
                    raise ValueError(result.stderr.decode('utf-8', errors='replace')[:500])
                text = result.stdout.decode('utf-8', errors='replace')
                return text, {}, {}, text_metrics(text, path.name), None
            return '', {}, {}, {}, {'runtime': 'python', 'packages': ['pypdf'], 'reason': 'PDF text extractor is not installed in this interpreter; prepare this dependency through native DSH tools, then retry. No dependency was installed by inspection.'}
    if b'\x00' in raw:
        return '', {}, {}, {}, {'reason': 'Binary format has no text adapter; use an actual format-aware tool and submit its evidence.'}
    try:
        text = raw.decode('utf-8-sig')
    except UnicodeDecodeError:
        try:
            text = raw.decode('gb18030')
        except UnicodeDecodeError:
            return '', {}, {}, {}, {'reason': 'Text encoding could not be decoded without loss'}
    return text, {}, {}, text_metrics(text, path.name), None


def file_evidence(path, preview=1600):
    raw = read_bytes(path)
    item = {'path': str(path), 'exists': True, 'kind': path.suffix.lower(), 'bytes': len(raw), 'sha256': digest(raw)}
    text, text_parts, xml, metrics, missing = extract(raw, path)
    item.update(text=text[:preview], textCharacters=len(text), textTruncated=len(text) > preview,
                textAvailable=missing is None, metrics=metrics, parts=sorted(xml),
                contentParts=[{'name': ('text:' + name) if kind_is_office(path) else name, 'characters': len(body)} for name, body in text_parts.items()])
    if path.suffix.lower() == '.pdf':
        item['pdfHeader'] = raw.startswith(b'%PDF-')
    if missing:
        item['needsEvidence'] = missing
    return item


def inspect(paths):
    if not isinstance(paths, list) or len(paths) > 32:
        raise ValueError('Expected at most 32 artifact roots')
    roots = []; all_files = []; total = 0
    for raw in paths:
        path = Path(raw).absolute()
        try:
            if linked(path):
                raise ValueError('Linked/reparse artifacts are not followed')
            if path.is_dir():
                files = []
                for parent, dirs, names in os.walk(path, followlinks=False):
                    for name in dirs:
                        if linked(Path(parent) / name):
                            raise ValueError('Directory includes a linked/reparse entry')
                    for name in names:
                        child = Path(parent) / name
                        if linked(child):
                            raise ValueError('Directory includes a linked artifact')
                        files.append(child)
                        if len(all_files) + len(files) > MAX_FILES:
                            raise ValueError('More than 1024 artifacts; submit core directories or files')
                files.sort(key=lambda p: str(p).casefold())
                roots.append({'path': str(path), 'exists': True, 'kind': 'directory', '_paths': files})
                all_files += files
            else:
                roots.append({'path': str(path), '_paths': [path], '_file': True}); all_files.append(path)
        except Exception as error:
            roots.append({'path': str(path), 'exists': False, 'error': str(error), '_paths': []})
    preview = max(256, min(6000, 24000 // max(1, len(all_files))))
    for root in roots:
        paths = root.pop('_paths'); single = root.pop('_file', False); entries = []
        try:
            for path in paths:
                total += path.stat().st_size
                if total > MAX_TOTAL:
                    raise ValueError('Artifacts exceed 256 MiB; submit core outputs')
                entries.append(file_evidence(path, preview))
            if single:
                root.update(entries[0])
            elif root.get('exists'):
                manifest = [{'path': item['path'], 'sha256': item['sha256'], 'bytes': item['bytes']} for item in entries]
                root.update(fileCount=len(entries), manifestHash=digest(json.dumps(manifest, sort_keys=True, ensure_ascii=False).encode()),
                            entries=entries, names=[Path(item['path']).name for item in entries[:40]], complete=True)
        except Exception as error:
            root.update(exists=False, complete=False, error=str(error))
    return {'version': VERSION, 'python': sys.executable, 'files': roots}


def kind_is_office(path):
    return path.suffix.lower() in ('.docx', '.pptx', '.xlsx')


def read_page(request):
    path = Path(request['path']).absolute(); raw = read_bytes(path)
    if digest(raw) != request.get('expectedSha256'):
        raise ValueError('Artifact changed since evidence capture; recapture before reviewing')
    text, text_parts, xml, metrics, missing = extract(raw, path)
    if missing:
        return {'path': str(path), 'needsEvidence': missing, 'complete': False}
    part = request.get('part', 'text')
    if part.startswith('text:') and part[5:] in text_parts:
        text = text_parts[part[5:]]
    elif part in xml:
        text = xml[part].decode('utf-8-sig')
    elif part in text_parts:
        text = text_parts[part]
    elif part != 'text':
        raise ValueError('Unknown captured content part')
    offset = request.get('offset', 0); maximum = request.get('maxChars', 6000)
    if type(offset) is not int or offset < 0 or type(maximum) is not int or not 1 <= maximum <= 12000:
        raise ValueError('Invalid evidence page range')
    return {'path': str(path), 'sha256': digest(raw), 'part': part, 'offset': offset, 'text': text[offset:offset + maximum],
            'characters': len(text), 'nextOffset': offset + maximum if offset + maximum < len(text) else None,
            'metrics': metrics, 'complete': offset + maximum >= len(text)}


def main():
    request = json.loads(base64.b64decode(sys.argv[sys.argv.index('--request') + 1]).decode('utf-8'))
    if request.get('action', 'inspect') == 'inspect':
        result = inspect(request.get('paths', []))
    elif request.get('action') == 'read':
        result = read_page(request)
    else:
        raise ValueError('Unknown read-only evidence action')
    sys.stdout.buffer.write(('METIS_GOAL_EVIDENCE=' + json.dumps(result, ensure_ascii=False, separators=(',', ':')) + '\n').encode('utf-8'))


if __name__ == '__main__':
    main()

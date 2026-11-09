"""Bounded local document inspection/editing. Never writes the source path.

Word/PowerPoint run-preserving text edits reuse the MIT Document Review Desk
helpers pinned in document-vendor/UPSTREAM.json. The Host owns authorization,
source hashes, history, atomic replacement and step invalidation.
"""
import importlib.util
import json
import math
from pathlib import Path
import re
import sys
import zipfile
import warnings

MAX_BLOCKS = 4000
MAX_TEXT = 2_000_000


def paragraph_document(path):
    spec = importlib.util.spec_from_file_location("metis_review_helpers", Path(__file__).parent / "document-vendor/doc_apply_text.py")
    helpers = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(helpers)
    document, entries = (helpers.docx_paragraphs(path) if path.suffix.lower() == ".docx" else helpers.pptx_paragraphs(path))
    return helpers, document, entries


def inspect_file(path):
    suffix = path.suffix.lower()
    if suffix in (".docx", ".pptx", ".xlsx"):
        with zipfile.ZipFile(path) as archive:
            entries = archive.infolist()
            if len(entries) > 20000 or sum(item.file_size for item in entries) > 200*1024*1024:
                raise ValueError("Office压缩包超过安全读取上限，请先由研究助手拆分所需内容")
    if suffix in (".md", ".txt"):
        raw = path.read_bytes()
        content = raw.decode("utf-8-sig")
        if "\0" in content or len(content) > MAX_TEXT:
            raise ValueError("文本过大或含二进制内容，未作为文本编辑")
        return {"kind": "text", "content": content, "format": suffix[1:]}
    if suffix in (".docx", ".pptx"):
        _, _, entries = paragraph_document(path)
        if len(entries) > MAX_BLOCKS or sum(len(item[1]) for item in entries) > MAX_TEXT:
            return {"kind": "readonly", "notice": "文档段落较多，保留页面预览；请用研究助手按章节编辑。"}
        return {"kind": "paragraphs", "blocks": [{"id": item[0], "text": item[1], "label": ("幻灯片 " + str(int(item[0].split(":")[1])+1) if suffix == ".pptx" else "表格" if item[0].startswith("t:") else "段落 " + str(int(item[0].split(":")[1])+1))} for item in entries]}
    if suffix == ".xlsx":
        from openpyxl import load_workbook
        from openpyxl.cell.cell import MergedCell
        workbook = load_workbook(path, data_only=False)
        sheets, count = [], 0
        try:
            for sheet in workbook:
                if sheet.max_row > 250 or sheet.max_column > 50 or len(sheets) >= 12:
                    return {"kind": "readonly", "notice": "表格超出直接编辑范围（每表250行、50列、12张表），页面仍可预览；可让研究助手按范围处理。"}
                rows = []
                for row in sheet:
                    cells = []
                    for cell in row:
                        count += 1
                        if count > 12000:
                            return {"kind": "readonly", "notice": "工作簿超过12000个可见单元格，保留页面预览；请用研究助手按范围编辑。"}
                        value = cell.value
                        cells.append({"id": f"cell:{len(sheets)}:{cell.coordinate}", "text": "" if value is None else str(value), "label": sheet.title + "!" + cell.coordinate, "editable": not isinstance(cell, MergedCell), "type": cell.data_type})
                    rows.append(cells)
                sheets.append({"name": sheet.title, "rows": rows})
            return {"kind": "sheet", "sheets": sheets, "notice": "保留单元格值、公式和样式；公式结果由 Excel 或研究助手重算。"}
        finally:
            workbook.close()
    if suffix == ".pdf":
        import fitz
        blocks = []
        with fitz.open(path) as document:
            if document.needs_pass:
                raise ValueError("加密PDF需要先提供可读取版本")
            for page_index, page in enumerate(document):
                for block_index, block in enumerate(page.get_text("dict")["blocks"]):
                    for line_index, line in enumerate(block.get("lines", [])):
                        spans = line.get("spans", [])
                        text = "".join(span["text"] for span in spans)
                        if not text.strip():
                            continue
                        blocks.append({"id": f"pdf:{page_index}:{block_index}:{line_index}", "text": text, "label": f"第 {page_index+1} 页", "bbox": list(line["bbox"]), "size": spans[0]["size"], "color": spans[0]["color"], "page": page_index, "rotated": tuple(line.get("dir", (1,0))) != (1,0)})
                        if len(blocks) > MAX_BLOCKS:
                            return {"kind": "readonly", "notice": "PDF文本较多，保留页面预览；请用研究助手按页处理。"}
            return {"kind": "paragraphs", "blocks": blocks, "notice": "PDF按原位置替换文字；不自动重排整页。扫描件没有可编辑文字，较大改动建议修改源文档。"}
    raise ValueError("此格式暂不支持直接编辑；请使用研究助手处理")


def scalar(text):
    if text == "":
        return None
    if text.lower() in ("true", "false"):
        return text.lower() == "true"
    if re.fullmatch(r"-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?", text):
        value = float(text) if any(char in text for char in ".eE") else int(text)
        if not isinstance(value, float) or math.isfinite(value):
            return value
    return text


def edit_file(path, output, request):
    model = inspect_file(path)
    if model["kind"] == "readonly":
        raise ValueError(model["notice"])
    if model["kind"] == "text":
        content = request.get("content")
        if not isinstance(content, str) or len(content) > MAX_TEXT or "\0" in content:
            raise ValueError("文本内容无效或过长")
        raw = path.read_bytes()
        normalized = content.replace("\r\n", "\n")
        if b"\r\n" in raw:
            normalized = normalized.replace("\n", "\r\n")
        output.write_bytes((b"\xef\xbb\xbf" if raw.startswith(b"\xef\xbb\xbf") else b"") + normalized.encode("utf-8"))
        return
    edits = request.get("edits")
    if not isinstance(edits, list) or not edits or len(edits) > MAX_BLOCKS:
        raise ValueError("请提供实际修改的文本或单元格")
    blocks = [cell for sheet in model["sheets"] for row in sheet["rows"] for cell in row] if model["kind"] == "sheet" else model["blocks"]
    by_id = {item["id"]: item for item in blocks}
    seen = set()
    for edit in edits:
        item = by_id.get(edit.get("id"))
        if not item or edit["id"] in seen or item.get("editable") is False or edit.get("oldText") != item["text"] or not isinstance(edit.get("text"), str) or len(edit["text"]) > 20000 or "\0" in edit["text"]:
            raise ValueError("修改位置或原文已变化，未覆盖文件")
        seen.add(edit["id"])
    suffix = path.suffix.lower()
    if suffix in (".docx", ".pptx"):
        helpers, document, entries = paragraph_document(path)
        targets = {item[0]: item for item in entries}
        for edit in edits:
            _, _, holder, flavor = targets[edit["id"]]
            if flavor == "pptx":
                helpers._set_pptx_paragraph_text(holder, edit["text"])
            elif flavor == "pptx-cell":
                paragraphs = list(holder.text_frame.paragraphs)
                helpers._set_pptx_paragraph_text(paragraphs[0], edit["text"])
                for paragraph in paragraphs[1:]:
                    helpers._set_pptx_paragraph_text(paragraph, "")
            elif hasattr(holder, "runs"):
                helpers._set_paragraph_text(holder, edit["text"])
            else:
                helpers._set_cell_text(holder, edit["text"])
        document.save(output)
    elif suffix == ".xlsx":
        from openpyxl import load_workbook
        with warnings.catch_warnings(record=True) as notices:
            warnings.simplefilter("always")
            workbook = load_workbook(path, data_only=False)
            try:
                for edit in edits:
                    _, sheet, address = edit["id"].split(":")
                    workbook.worksheets[int(sheet)][address] = scalar(edit["text"])
                workbook.save(output)
            finally:
                workbook.close()
            if notices:
                raise ValueError("工作簿包含当前编辑器无法完整保留的特性，未覆盖原文件：" + str(notices[0].message))
    elif suffix == ".pdf":
        import fitz
        with fitz.open(path) as document:
            for edit in edits:
                block = by_id[edit["id"]]
                if block["rotated"] or "\n" in edit["text"]:
                    raise ValueError("旋转或多行PDF文字请交由研究助手修改源文档")
                page = document[block["page"]]
                page.add_redact_annot(fitz.Rect(block["bbox"]), fill=False)
            for page in document:
                page.apply_redactions(images=0, graphics=0)
            for edit in edits:
                block = by_id[edit["id"]]
                if not edit["text"]:
                    continue
                page, rect = document[block["page"]], fitz.Rect(block["bbox"])
                font = "china-s" if any(ord(char)>255 for char in edit["text"]) else "helv"
                size = block["size"]
                font_object = fitz.Font(fontname=font)
                if font_object.text_length(edit["text"], fontsize=size) > rect.width + 1:
                    raise ValueError("修改后的PDF文字超出原位置，未保存；请缩短文字或交由研究助手调整版式")
                color = tuple(((block["color"] >> shift) & 255)/255 for shift in (16,8,0))
                page.insert_text((rect.x0, rect.y1-size*0.22), edit["text"], fontname=font, fontsize=size, color=color)
            document.save(output, garbage=4, deflate=True)


if __name__ == "__main__":
    try:
        action, path = sys.argv[1], Path(sys.argv[2])
        if action == "read":
            result = inspect_file(path)
        elif action in ("pages", "render"):
            import fitz
            with fitz.open(path) as document:
                if document.needs_pass:
                    raise ValueError("PDF已加密，暂不能预览")
                result = {"pages": len(document)}
                if action == "render":
                    index = int(sys.argv[4])
                    if index < 0 or index >= len(document):
                        raise ValueError("页码超出文档范围")
                    page = document[index]
                    scale = min(1.7, math.sqrt(2_400_000 / max(1, page.rect.width * page.rect.height)))
                    pixmap = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False)
                    Path(sys.argv[3]).write_bytes(pixmap.tobytes("png"))
                    result.update({"width": pixmap.width, "height": pixmap.height})
        elif action == "edit":
            output = Path(sys.argv[3])
            if output.resolve() == path.resolve():
                raise ValueError("编辑输出必须是临时副本")
            edit_file(path, output, json.load(sys.stdin))
            result = {"written": output.stat().st_size}
        else:
            raise ValueError("无效文档操作")
        print(json.dumps({"ok": True, **result}, ensure_ascii=False))
    except Exception as error:
        print(json.dumps({"ok": False, "error": str(error)}, ensure_ascii=False))
        sys.exit(1)

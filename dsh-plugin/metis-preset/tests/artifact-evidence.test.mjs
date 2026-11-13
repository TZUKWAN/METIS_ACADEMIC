import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync,mkdirSync,utimesSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {artifactFingerprint,evidenceFiles,evidenceCommand} from '../artifact-evidence.js';
const reader=fileURLToPath(new URL('../evidence-reader.py',import.meta.url));
function read(request){const result=spawnSync('python',[reader,'--request',Buffer.from(JSON.stringify(request)).toString('base64')],{encoding:'utf8',windowsHide:true});assert.equal(result.status,0,result.stderr);return JSON.parse(result.stdout.split(/\r?\n/).find(line=>line.startsWith('METIS_GOAL_EVIDENCE=')).slice(20));}
function fixture(fn){const root=mkdtempSync(join(tmpdir(),'metis-evidence-'));try{return fn(root);}finally{rmSync(root,{recursive:true,force:true});}}
test('directory evidence detects same-length same-mtime content changes and provides descendant text',()=>fixture(root=>{
 const file=join(root,'result.md');writeFileSync(file,'AAAA');utimesSync(file,1767225600,1767225600);const before=read({paths:[root]});
 writeFileSync(file,'BBBB');utimesSync(file,1767225600,1767225600);const after=read({paths:[root]});
 assert.notEqual(before.files[0].manifestHash,after.files[0].manifestHash);assert.equal(after.files[0].entries[0].text,'BBBB');assert.notEqual(artifactFingerprint(before.files),artifactFingerprint(after.files));assert.equal(evidenceFiles(after.files).length,1);
}));
test('long text pages reach the real tail and reject changes between capture and supplement',()=>fixture(root=>{
 const file=join(root,'long.md');writeFileSync(file,'A'.repeat(29000)+'REAL_TAIL');const captured=read({paths:[file]}).files[0];assert.equal(captured.textTruncated,true);
 const page=read({action:'read',path:file,expectedSha256:captured.sha256,offset:28995,maxChars:100});assert.match(page.text,/REAL_TAIL/);assert.equal(page.nextOffset,null);
 writeFileSync(file,'changed');const result=spawnSync('python',[reader,'--request',Buffer.from(JSON.stringify({action:'read',path:file,expectedSha256:captured.sha256})).toString('base64')],{encoding:'utf8',windowsHide:true});assert.notEqual(result.status,0);assert.match(result.stderr,/changed since evidence capture/);
}));
test('abstract counts are deterministic and exclude headings and keywords',()=>fixture(root=>{
 const file=join(root,'abstract.md');writeFileSync(file,'# 摘要\n甲乙丙。丁戊己。\n关键词：经济；治理\n');const value=read({paths:[file]}).files[0];
 assert.equal(value.metrics.abstract.hanCharacters,6);assert.equal(value.metrics.abstract.nonWhitespace,8);assert.equal(value.metrics.abstract.sentences,2);assert.equal(value.metrics.abstract.keywordCount,2);
}));
test('actual PDF text is extracted, or an explicit missing extractor is returned without fake content',()=>fixture(root=>{
 const file=join(root,'actual.pdf');const create=spawnSync('python',['-c',`import sys\nobjects=[b'<< /Type /Catalog /Pages 2 0 R >>',b'<< /Type /Pages /Kids [3 0 R] /Count 1 >>',b'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',b'<< /Length 48 >>\\nstream\\nBT /F1 12 Tf 20 100 Td (ACTUAL_PDF_TEXT) Tj ET\\nendstream',b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>']\ndata=b'%PDF-1.4\\n';offsets=[]\nfor i,obj in enumerate(objects,1):\n offsets.append(len(data));data+=str(i).encode()+b' 0 obj\\n'+obj+b'\\nendobj\\n'\nx=len(data);data+=b'xref\\n0 6\\n0000000000 65535 f \\n'+b''.join(('%010d 00000 n \\n'%n).encode()for n in offsets)+b'trailer\\n<< /Size 6 /Root 1 0 R >>\\nstartxref\\n'+str(x).encode()+b'\\n%%EOF\\n'\nopen(sys.argv[1],'wb').write(data)`,file],{encoding:'utf8',windowsHide:true});assert.equal(create.status,0,create.stderr);
 const value=read({paths:[file]}).files[0];assert.equal(value.exists,true);assert.equal(value.pdfHeader,true);
 if(value.textAvailable)assert.match(value.text,/ACTUAL_PDF_TEXT/);else{assert.deepEqual(value.needsEvidence.packages,['pypdf']);assert.equal(value.text,'');}
}));
test('DOCX evidence reads real settings and footnote contents, counts references, and supports XML part pages',()=>fixture(root=>{
 const file=join(root,'notes.docx');const create=spawnSync('python',['-c',`import zipfile,sys\nw='http://schemas.openxmlformats.org/wordprocessingml/2006/main'\nwith zipfile.ZipFile(sys.argv[1],'w') as z:\n z.writestr('word/document.xml','<w:document xmlns:w="'+w+'"><w:body><w:p><w:r><w:t>ACTUAL_BODY</w:t><w:footnoteReference w:id="1"/></w:r></w:p></w:body></w:document>')\n z.writestr('word/footnotes.xml','<w:footnotes xmlns:w="'+w+'"><w:footnote w:id="1"><w:p><w:r><w:t>ACTUAL_NOTE</w:t></w:r></w:p></w:footnote></w:footnotes>')\n z.writestr('word/settings.xml','<w:settings xmlns:w="'+w+'"><w:footnotePr><w:numFmt w:val="decimalEnclosedCircle"/><w:numRestart w:val="eachPage"/></w:footnotePr></w:settings>')\n`,file],{encoding:'utf8',windowsHide:true});assert.equal(create.status,0,create.stderr);
 const value=read({paths:[file]}).files[0];assert.match(value.text,/ACTUAL_NOTE/);assert.equal(value.metrics.footnotes.references,1);assert.equal(value.metrics.footnotes.definitions,1);assert.equal(value.metrics.footnotes.numbering[0].properties.numRestart,'eachPage');
 const page=read({action:'read',path:file,expectedSha256:value.sha256,part:'word/settings.xml',offset:0,maxChars:1000});assert.match(page.text,/eachPage/);
 const raw=read({action:'read',path:file,expectedSha256:value.sha256,part:'word/document.xml',offset:0,maxChars:1000});assert.match(raw.text,/footnoteReference/);
 const body=read({action:'read',path:file,expectedSha256:value.sha256,part:'text:word/document.xml',offset:0,maxChars:1000});assert.match(body.text,/ACTUAL_BODY/);assert.ok(!body.text.includes('footnoteReference'));
}));
test('missing artifacts are explicit failures and no dependency is installed by inspection',()=>fixture(root=>{
 const value=read({paths:[join(root,'not-there.md')]}).files[0];assert.equal(value.exists,false);assert.match(value.error,/No such file|cannot find|找不到/i);
 assert.match(evidenceCommand({paths:['actual.md']}),/--request/);assert.ok(!evidenceCommand({paths:[]}).includes('pip install'));
}));

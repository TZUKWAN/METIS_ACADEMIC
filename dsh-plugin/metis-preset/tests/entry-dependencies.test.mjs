import test from 'node:test';
import assert from 'node:assert/strict';
import {entryRequirements} from '../entry-dependencies.js';
test('Word-only entry keeps its actual pinned constraints without vector/browser installations',()=>{
 const source='python-docx>=0.8.11\nlxml>=5.0\nplaywright>=1.60\nchromadb==1.2.2\nsentence-transformers>=2.2.0\n';const selected=entryRequirements(['python-docx','lxml'],source);assert.match(selected,/python-docx>=0.8.11/);assert.match(selected,/lxml>=5.0/);assert.ok(!/playwright|chromadb|sentence/.test(selected));
});
test('index options and executable requirements are not copied into entry-level preparation',()=>{
 assert.equal(entryRequirements(['safe-package'],'--extra-index-url https://example.invalid\nsafe-package @ https://example.invalid/code\n'),null);assert.equal(entryRequirements(['pywin32'],'pywin32>=306; platform_system=="Windows"\n'),'pywin32>=306; platform_system=="Windows"\n');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {entryConstraints,entryCommandProblem,imageInputProblem} from '../entry-contract.js';
test('explicit Office automation and pure-docx restrictions are checked before invoking processes',()=>{
 const step={instruction:'纯 python-docx 生成与处理，绝对禁止 Office COM 自动化、禁止启动Word进程'};assert.equal(entryConstraints(step).forbidOfficeCom,true);assert.match(entryCommandProblem(step,{arguments:{command:`python -c "import win32com.client;win32com.client.Dispatch('Word.Application')"`}}),/未执行/);assert.match(entryCommandProblem(step,{arguments:{command:'pandoc actual.md -o actual.docx'}}),/未执行/);
 assert.equal(entryCommandProblem(step,{arguments:{command:'Get-Process WINWORD -ErrorAction SilentlyContinue'}}),null);assert.equal(entryCommandProblem(step,{arguments:{command:'pandoc --version'}}),null);assert.equal(entryCommandProblem({instruction:'查看格式工具版本'},{arguments:{command:'pandoc actual.md -o actual.docx'}}),null);
});
test('vision capability is checked against the actual route without removing ordinary DSH read capability',()=>{
 const cap={provider:'actual',model:'text',inputModalities:['text']},route={provider:'actual',model:'text'};
 assert.match(imageInputProblem(cap,route,{name:'read',arguments:{file_path:'actual.png'}}),/未声明图像输入/);assert.equal(imageInputProblem(cap,route,{name:'read',arguments:{file_path:'actual.md'}}),null);assert.equal(imageInputProblem(cap,{provider:'actual',model:'new-vision'},{name:'read',arguments:{file_path:'actual.png'}}),null);
});

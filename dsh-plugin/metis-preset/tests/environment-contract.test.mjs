import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {environmentKey,preparedPythonPrefix,rewritePreparedPython} from '../environment-contract.js';
test('identical pinned code and dependency recipe reuse environment despite mode text/order',()=>{
 const value={skillId:'actual',content:'actual pinned code',runtime:'python',packages:['python-docx','lxml'],modules:['docx'],commands:[],requirementsHash:null};
 assert.equal(environmentKey({...value,scope:'mode-one'}),environmentKey({...value,scope:'changed unrelated workflow'}));assert.equal(environmentKey(value),environmentKey({...value,packages:['lxml','python-docx']}));assert.notEqual(environmentKey(value),environmentKey({...value,content:'new pinned code'}));
});
test('managed runner covers ordinary and absolute prepared Python calls without changing quoted data',()=>{
 const env={runtime:'python',python:'C:\\env\\python.exe',baseDir:'C:\\skill'};assert.match(preparedPythonPrefix(env,'pwsh'),/function python/);
 assert.match(rewritePreparedPython('& "C:\\env\\python.exe" script.py',env,'pwsh'),/prepared-python-runner\.py/);assert.equal(rewritePreparedPython('Write-Output "C:\\env\\python.exe"',env,'pwsh'),'Write-Output "C:\\env\\python.exe"');
});
test('actual Python entry runs through the host bootstrap adapter without a second installer',()=>{
 const root=mkdtempSync(join(tmpdir(),'metis-env-')),scripts=join(root,'scripts'),runner=fileURLToPath(new URL('../prepared-python-runner.py',import.meta.url));mkdirSync(scripts);
 // This is an explicitly controlled bootstrap-contract fixture, not a claim
 // that a vendor installer or a research task ran during this unit test.
 writeFileSync(join(scripts,'emarx_env.py'),"ENV_MARKER='EMARX_VENV_ACTIVE'\ndef get_skill_root(): return None\ndef ensure_venv_and_reexec(): raise RuntimeError('UNWANTED_INSTALLER')\n");
 writeFileSync(join(scripts,'actual.py'),"from emarx_env import ensure_venv_and_reexec\nensure_venv_and_reexec()\nprint('ACTUAL_ENTRY_RESULT=3')\n");
 try{
  const py=spawnSync('python',['-c','import sys;print(sys.executable)'],{encoding:'utf8',windowsHide:true}).stdout.trim();
  const run=spawnSync(py,[runner,root,py,join(scripts,'actual.py')],{encoding:'utf8',windowsHide:true});assert.equal(run.status,0,run.stderr);assert.match(run.stdout,/ACTUAL_ENTRY_RESULT=3/);assert.match(run.stdout,/"automaticInstallation": false/);assert.ok(!run.stdout.includes('UNWANTED_INSTALLER'));
  writeFileSync(join(scripts,'missing.py'),"from emarx_env import ensure_venv_and_reexec\nimport METIS_NONEXISTENT_MODULE\nensure_venv_and_reexec()\nprint('MUST_NOT_RUN')\n");
  const fail=spawnSync(py,[runner,root,py,join(scripts,'missing.py')],{encoding:'utf8',windowsHide:true});assert.equal(fail.status,42);assert.match(fail.stdout,/METIS_NONEXISTENT_MODULE/);assert.ok(!fail.stdout.includes('MUST_NOT_RUN'));
 }finally{rmSync(root,{recursive:true,force:true});}
});

test('a managed pure-docx entry cannot indirectly start an incompatible converter',()=>{
 const root=mkdtempSync(join(tmpdir(),'metis-entry-policy-')),runner=fileURLToPath(new URL('../prepared-python-runner.py',import.meta.url));
 try{
  const entry=join(root,'actual.py');writeFileSync(entry,"import subprocess\ntry:\n subprocess.run(['pandoc', 'actual.md', '-o', 'actual.docx'], check=True)\nexcept PermissionError as error:\n print(str(error))\nelse:\n raise RuntimeError('CONVERTER_MUST_NOT_RUN')\n");
  const py=spawnSync('python',['-c','import sys;print(sys.executable)'],{encoding:'utf8',windowsHide:true}).stdout.trim();
  const result=spawnSync(py,[runner,root,py,entry],{encoding:'utf8',windowsHide:true,env:{...process.env,METIS_PYTHON_DOCX_ONLY:'1'}});
  assert.equal(result.status,0,result.stderr);assert.match(result.stdout,/METIS_ENTRY_CONTRACT/);assert.ok(!result.stdout.includes('CONVERTER_MUST_NOT_RUN'));
 }finally{rmSync(root,{recursive:true,force:true});}
});

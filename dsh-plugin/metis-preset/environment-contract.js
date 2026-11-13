/** Environment identity follows pinned code and dependency recipe, not mode text. */
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {delimiter,dirname} from 'node:path';
const quote=value=>"'"+String(value).replaceAll("'","''")+"'";
export function environmentKey({skillId,packageHash,content,runtime,packages,commands,modules,requirementsHash}){
  return createHash('sha256').update(JSON.stringify({protocol:'entry-environment-v2',skillId,packageHash:packageHash||null,bodyHash:createHash('sha256').update(content).digest('hex'),runtime,packages:[...packages].sort(),commands:[...commands].sort(),modules:[...modules].sort(),requirementsHash:requirementsHash||null})).digest('hex');
}
export function preparedPythonPrefix(environment,shell){
  if(environment?.runtime!=='python'||!environment.python)return '';
  const venv=dirname(dirname(environment.python)),root=environment.baseDir,runner=fileURLToPath(new URL('./prepared-python-runner.py',import.meta.url));
  if(shell==='pwsh')return '$env:VIRTUAL_ENV = '+quote(venv)+"\n$env:PYTHONNOUSERSITE = '1'\n$env:METIS_FORBID_OFFICE_COM="+quote(environment.constraints?.forbidOfficeCom||environment.constraints?.pythonDocxOnly?'1':'0')+"\n$env:METIS_PYTHON_DOCX_ONLY="+quote(environment.constraints?.pythonDocxOnly?'1':'0')+"\n"+
    (root?'function python { & '+quote(environment.python)+' '+quote(runner)+' '+quote(root)+' '+quote(environment.python)+' @args }\n':'');
  const sh=value=>"'"+String(value).replaceAll("'","'\\''")+"'";
  return 'export VIRTUAL_ENV='+sh(venv)+"\nexport PYTHONNOUSERSITE=1\nexport METIS_FORBID_OFFICE_COM="+sh(environment.constraints?.forbidOfficeCom||environment.constraints?.pythonDocxOnly?'1':'0')+"\nexport METIS_PYTHON_DOCX_ONLY="+sh(environment.constraints?.pythonDocxOnly?'1':'0')+"\n"+(root?'python() { '+sh(environment.python)+' '+sh(runner)+' '+sh(root)+' '+sh(environment.python)+' "$@"; }\n':'');
}
export function rewritePreparedPython(command,environment,shell){
  if(shell!=='pwsh'||environment?.runtime!=='python'||!environment.python||!environment.baseDir)return command;
  const runner=fileURLToPath(new URL('./prepared-python-runner.py',import.meta.url));
  const replacement=quote(environment.python)+' '+quote(runner)+' '+quote(environment.baseDir)+' '+quote(environment.python);
  const escape=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  for(const path of new Set([environment.python,environment.python.replaceAll('\\','/')]))for(const q of ["'",'"','']){
    const expression=new RegExp('(^|[;\\r\\n])([\\t ]*&[\\t ]*)'+escape(q+path+q)+'(?=\\s|$)','gi');
    command=command.replace(expression,(_match,boundary,prefix)=>boundary+prefix+replacement);
  }
  return command;
}

/** Preserve relevant pinned version constraints without installing the whole repository. */
const normalized=name=>name.toLowerCase().replaceAll('_','-').replaceAll('.','-');
export function entryRequirements(packages,source=''){
  const wanted=new Set(packages.map(normalized)),selected=[];
  for(const line of source.split(/\r?\n/)){
    const clean=line.trim();if(!clean||clean.startsWith('#'))continue;
    const match=/^([a-z0-9][a-z0-9_.-]*)(?:\[[a-z0-9_,.-]+\])?(?:\s*(?:[<>=!~]{1,2})\s*[a-z0-9.*+_-]+(?:\s*,\s*[<>=!~]{1,2}\s*[a-z0-9.*+_-]+)*)?(?:\s*;\s*(?:platform_system|python_version|sys_platform)\s*(?:==|!=|>=|<=|>|<)\s*["'][a-z0-9_.-]+["'])?\s*$/i.exec(clean);
    if(match&&wanted.has(normalized(match[1])))selected.push(clean);
  }
  return selected.length?selected.join('\n')+'\n':null;
}

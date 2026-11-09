/** Shared browser/server three-way merge. Stable IDs and explicit human fields win. */
const draftMissing=Symbol('missing');
const draftOwn=(value,key)=>Object.prototype.hasOwnProperty.call(value,key);
const draftObject=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const draftCopy=value=>value===draftMissing?value:JSON.parse(JSON.stringify(value));
const draftPart=value=>encodeURIComponent(String(value));
export function draftEqual(a,b){
  if(a===b)return true;
  if(Array.isArray(a)&&Array.isArray(b))return a.length===b.length&&a.every((value,index)=>draftEqual(value,b[index]));
  if(draftObject(a)&&draftObject(b)){const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(key=>draftOwn(b,key)&&draftEqual(a[key],b[key]));}
  return false;
}
function draftTechnical(path){return path==='/revision'||path==='/updatedAt'||/^\/profiles\/[^/]+\/(revision|updatedAt)$/.test(path)||/^\/profiles\/[^/]+\/profile\/skills(?:\/|$)/.test(path);}
function draftIdArray(arrays,path){return path.endsWith('/steps')||arrays.flat().length>0&&arrays.flat().every(value=>draftObject(value)&&typeof value.id==='string');}
export function draftProtectionPaths(paths,configuration){
  const out=new Set(paths);
  for(const path of paths){
    const match=/^\/(?:profiles|modes)\/([^/]+)/.exec(path);if(!match)continue;
    const id=decodeURIComponent(match[1]);
    if(draftOwn(configuration.modes||{},id))out.add('/modes/'+match[1]+'/$exists');
    if(draftOwn(configuration.profiles||{},id))out.add('/profiles/'+match[1]+'/$exists');
    out.add('/deletedModes/#'+match[1]);
    const skill=/^\/profiles\/[^/]+\/profile\/steps\/@([^/]+)\/skills\/#([^/]+)$/.exec(path);
    if(skill){const step=configuration.profiles?.[id]?.profile.steps.find(item=>item.id===decodeURIComponent(skill[1])),skillId=decodeURIComponent(skill[2]);if(step?.skills.includes(skillId)){out.add('/deletedSkills/#'+skill[2]);if(draftOwn(configuration.skills||{},skillId))out.add('/skills/'+skill[2]+'/$exists');}}
  }
  return [...out];
}
export function draftChanges(before,after){
  const changes=[];
  const walk=(a,b,path)=>{
    if(draftTechnical(path)||draftEqual(a,b))return;
    if((draftObject(a)||a===draftMissing)&&(draftObject(b)||b===draftMissing)){
      if(a===draftMissing||b===draftMissing)changes.push(path+'/$exists');
      const left=a===draftMissing?{}:a,right=b===draftMissing?{}:b;
      for(const key of new Set([...Object.keys(left),...Object.keys(right)]))walk(draftOwn(left,key)?left[key]:draftMissing,draftOwn(right,key)?right[key]:draftMissing,path+'/'+draftPart(key));
    }else if(Array.isArray(a)&&Array.isArray(b)&&draftIdArray([a,b],path)){
      const left=new Map(a.map(value=>[value.id,value])),right=new Map(b.map(value=>[value.id,value]));
      for(const id of new Set([...left.keys(),...right.keys()]))walk(left.get(id)??draftMissing,right.get(id)??draftMissing,path+'/@'+draftPart(id));
      if(!draftEqual(a.map(value=>value.id),b.map(value=>value.id)))changes.push(path+'/$order');
    }else if(Array.isArray(a)&&Array.isArray(b)&&[...a,...b].every(value=>typeof value==='string')){
      for(const id of new Set([...a,...b]))if(a.includes(id)!==b.includes(id))changes.push(path+'/#'+draftPart(id));
    }else changes.push(path);
  };walk(before,after,'');return [...new Set(changes)];
}
export function mergeDraft(base,human,remote,{protectedPaths=[]}={}){
  const protectedSet=new Set(draftProtectionPaths([...protectedPaths,...draftChanges(base,human)],human)),conflicts=[];
  const exact=path=>[...protectedSet].some(key=>key===path||path.startsWith(key+'/')&&!key.endsWith('/$exists')&&!key.endsWith('/$order'));
  const protectedBelow=path=>[...protectedSet].some(key=>key.startsWith(path+'/'));
  const conflict=path=>{if(!conflicts.includes(path))conflicts.push(path);};
  const order=(baseOrder,humanOrder,remoteOrder,ids,path)=>{
    const original=new Set(baseOrder),localCommon=humanOrder.filter(id=>original.has(id)),baseCommon=baseOrder.filter(id=>humanOrder.includes(id));
    const preferHuman=protectedSet.has(path+'/$order')||!draftEqual(localCommon,baseCommon);
    const first=preferHuman?humanOrder:remoteOrder,other=preferHuman?remoteOrder:humanOrder,out=first.filter(id=>ids.has(id));
    for(let index=0;index<other.length;index++){
      const id=other[index];if(!ids.has(id)||out.includes(id))continue;
      let at=-1;for(let previous=index-1;previous>=0;previous--)if(out.includes(other[previous])){at=out.indexOf(other[previous])+1;break;}
      if(at<0){const following=other.slice(index+1).find(value=>out.includes(value));at=following?out.indexOf(following):out.length;}
      out.splice(at,0,id);
    }
    for(const id of ids)if(!out.includes(id))out.push(id);return out;
  };
  const walk=(a,b,c,path)=>{
    if(draftTechnical(path))return draftCopy(c!==draftMissing?c:b);
    if(protectedSet.has(path+'/$exists')&&(b===draftMissing)!==(c===draftMissing)){conflict(path);return draftCopy(b);}
    if(exact(path)&&!draftEqual(b,c)){conflict(path);return draftCopy(b);}
    if(draftEqual(b,c))return draftCopy(b);
    if(draftEqual(c,a))return draftCopy(b);
    if(draftEqual(b,a)&&!protectedBelow(path))return draftCopy(c);
    if(c===draftMissing){if(!draftEqual(b,a)||protectedBelow(path)){conflict(path);return draftCopy(b);}return draftMissing;}
    if(b===draftMissing){conflict(path);return draftMissing;}
    if(draftObject(b)&&draftObject(c)){
      const left=draftObject(a)?a:{},out=Object.create(null);
      for(const key of new Set([...Object.keys(left),...Object.keys(b),...Object.keys(c)])){
        const value=walk(draftOwn(left,key)?left[key]:draftMissing,draftOwn(b,key)?b[key]:draftMissing,draftOwn(c,key)?c[key]:draftMissing,path+'/'+draftPart(key));
        if(value!==draftMissing)out[key]=value;
      }return out;
    }
    if(Array.isArray(b)&&Array.isArray(c)){
      const original=Array.isArray(a)?a:[];
      if(draftIdArray([original,b,c],path)){
        const maps=[original,b,c].map(values=>new Map(values.map(value=>[value.id,value]))),items=new Map();
        for(const id of new Set(maps.flatMap(map=>[...map.keys()]))){const value=walk(...maps.map(map=>map.has(id)?map.get(id):draftMissing),path+'/@'+draftPart(id));if(value!==draftMissing)items.set(id,value);}
        return order(original.map(value=>value.id),b.map(value=>value.id),c.map(value=>value.id),new Set(items.keys()),path).map(id=>items.get(id));
      }
      if([...original,...b,...c].every(value=>typeof value==='string')){
        const ids=new Set();for(const id of new Set([...original,...b,...c]))if(walk(original.includes(id),b.includes(id),c.includes(id),path+'/#'+draftPart(id)))ids.add(id);
        return [...b,...c].filter((id,index,values)=>ids.has(id)&&values.indexOf(id)===index);
      }
    }
    conflict(path);return draftCopy(b);
  };
  return {configuration:walk(base,human,remote,''),conflicts};
}

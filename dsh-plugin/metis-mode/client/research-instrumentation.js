/** Small, read-only instruments derived from recorded research facts. */
const clean=value=>typeof value==='string'?value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'').trim():'';
const pathKey=value=>/^(?:[a-z]:[\\/]|\\\\)/i.test(value)?value.replaceAll('\\','/').toLowerCase():value;
export const researchFileName=value=>clean(value).split(/[\\/]/).filter(Boolean).at(-1)||clean(value);
const unique=(rows,key)=>{const found=new Map();for(const row of rows){const id=key(row);if(id)found.set(id,row);}return [...found.values()];};
export function researchInstrumentation(model,graph){
 const all=graph?.fullNodes||[],stages=all.filter(node=>node.kind==='step'),records=all.filter(node=>node.origin==='activity'),invoked=records.filter(node=>node.call?.invoked!==false);
 const sources=unique(invoked.filter(node=>node.call?.kind==='read'&&['succeeded','completed'].includes(node.status)&&clean(node.call.target)).map(node=>({id:node.id,stepId:node.stepId,name:researchFileName(node.call.target),target:clean(node.call.target)})),row=>pathKey(row.target));
 const availableFiles=all.filter(node=>node.kind==='artifact'&&node.availability==='file'&&clean(node.file?.path||node.detail)).map(node=>({id:node.id,stepId:node.stepId,index:node.fileIndex,name:clean(node.title)||researchFileName(node.detail),target:clean(node.file?.path||node.detail),bytes:Number.isFinite(node.file?.bytes)?node.file.bytes:null})),files=unique(availableFiles,row=>pathKey(row.target));
 const bindings=stages.flatMap(stage=>(stage.skills||[]).filter(skill=>clean(skill?.id)).map(skill=>({id:skill.id,name:clean(skill.name)||skill.id,stepId:stage.stepId})));
 const skills=unique(bindings,row=>row.id),checks=invoked.filter(node=>node.kind==='review'),submitted=stages.filter(node=>node.status==='submitted').length;
 const focusId=graph?.presentation?.expanded?graph.presentation.stageId:null,focus=focusId?stages.find(stage=>stage.stepId===focusId):null;
 const active=graph?.byId?.get(graph.activeId),scopeCalls=focus?records.filter(node=>node.stepId===focus.stepId):records,scopeFiles=focus?unique(availableFiles.filter(file=>file.stepId===focus.stepId),row=>pathKey(row.target)):files;
 const formats=new Map();for(const file of scopeFiles){const extension=/\.([a-z0-9]{1,8})$/i.exec(file.name)?.[1]?.toUpperCase()||'FILE';formats.set(extension,(formats.get(extension)||0)+1);}
 const stageMetrics=new Map(stages.map(stage=>{const calls=records.filter(node=>node.stepId===stage.stepId),reviews=calls.filter(node=>node.kind==='review'&&node.call?.invoked!==false);return[stage.stepId,{calls:calls.length,skills:(stage.skills||[]).length,files:unique(availableFiles.filter(file=>file.stepId===stage.stepId),row=>pathKey(row.target)).length,reviews:reviews.length,statuses:calls.slice(-12).map(node=>({id:node.id,status:node.status,label:node.title})),latest:calls.at(-1)||null}];}));
 return {stages,submitted,sources,files,skills,bindings:bindings.length,checks:checks.length,records:records.length,focus,active,
  running:!!active&&['running','processing'].includes(model?.phase),phase:model?.phase||'ready',
  focusSkills:focus?(focus.skills||[]).map(skill=>({id:skill.id,name:clean(skill.name)||skill.id})):skills,
  scopeCalls,scopeFiles,formats:[...formats].map(([name,count])=>({name,count})),
  recent:scopeCalls.slice(-4).reverse(),stageMetrics,
  goal:focus?clean(focus.detail):'',stageStatus:focus?.statusLabel||'',
  tools:unique(scopeCalls.filter(node=>clean(node.tool)),node=>node.tool).map(node=>node.tool)
 };
}

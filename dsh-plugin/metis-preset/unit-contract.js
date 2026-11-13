/** System receipts for real units; they do not invent semantic reviewer approval. */
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {artifactFingerprint,evidenceFiles} from './artifact-evidence.js';
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
export const requiresUnits=step=>/逐小节|每(?:个)?(?:二级)?(?:小节|节)[^。\n]{0,70}(?:过门|质量门)|以[^。\n]{0,40}小节[^。\n]{0,20}最小单元|不跨节/.test([step.instruction,step.prompt,step.executionPrompt].filter(Boolean).join('\n'));
export const looksLikeUnitPath=path=>typeof path==='string'&&/(?:^|[\\/])sections[\\/].+\.(?:md|txt)$|(?:^|[\\/])(?:v\d+_)?s\d+[_-].+\.(?:md|txt)$/i.test(path);
export function unitPath(path,cwd){return resolve(cwd||'.',path).toLowerCase();}
export function openUnit(item,{unitId,artifacts},cwd){
  if(typeof unitId!=='string'||!unitId.trim()||unitId.length>160||!Array.isArray(artifacts)||!artifacts.length||artifacts.length>8||artifacts.some(path=>typeof path!=='string'||!path))throw new Error('小节需真实unitId及1至8项产物路径');
  const units=item.units??={current:null,receipts:{},opened:{}};
  if(units.current&&units.current!==unitId)throw new Error('先完成当前小节的record_unit，再进入下一小节；不重写历史时间记录');
  const paths=artifacts.map(path=>unitPath(path,cwd));
  if(units.current===unitId&&JSON.stringify(units.opened[unitId].paths)!==JSON.stringify(paths))throw new Error('当前小节产物路径已固定，先完成或明确撤回本小节');
  units.current=unitId;units.opened[unitId]??={paths,openedAt:new Date().toISOString()};return {unitId,artifacts:paths,openedAt:units.opened[unitId].openedAt,next:'写作/修订本小节并按绑定技能审查后，record_unit捕获真实产物、机械指标和公开质量判断，再进入下一小节。'};
}
export function recordUnit(item,{unitId,text},captured,cwd,ledger,stepId){
  const units=item.units,opened=units?.opened?.[unitId];if(!opened||units.current!==unitId)throw new Error('先unit_open当前真实小节，再记录本轮审查');
  if(typeof text!=='string'||!text.trim()||text.length>3000)throw new Error('记录本小节公开质量判断（最多3000字），不要填私有思考或伪造独立审查结果');
  if(captured.files.some(file=>!file.exists||file.kind==='directory'||!file.bytes))throw new Error('小节需实际可读的文件产物，不能只交目录或说明');
  if(JSON.stringify(captured.files.map(file=>unitPath(file.path,cwd)))!==JSON.stringify(opened.paths))throw new Error('本次小节取证与已声明路径不一致');
  const fingerprint=artifactFingerprint(captured.files),id='G'+hash({stepId,unitId,fingerprint}).slice(0,20);
  const receipt={id,kind:'unit',stepId,unit:unitId,openedAt:opened.openedAt,at:new Date().toISOString(),artifacts:captured.files.map(file=>({path:file.path,sha256:file.sha256,bytes:file.bytes})),metrics:captured.files.map(file=>({path:file.path,metrics:file.metrics})),fingerprint,
    machineInspection:'actual-native-file-read',agentAssessment:{text,source:'agent-public-assessment',independent:false},semanticGoalPassed:false};
  ledger.append(receipt);units.receipts[unitId]={id,unitId,fingerprint,artifacts:receipt.artifacts,openedAt:opened.openedAt,at:receipt.at};units.current=null;
  return {receipt:units.receipts[unitId],metrics:receipt.metrics,agentAssessment:receipt.agentAssessment,next:'本小节原始产物与审查动作已留证；这不是独立模型通过。可unit_open下一小节，整步仍按原要求核验。'};
}
export function unitWriteGuard(step,item,execution,cwd){
  if(!requiresUnits(step))return null;
  const args=execution.arguments||{},path=args.path||args.file_path||args.filePath||args.filename;
  if(!/^(?:write|edit|apply_patch)$/.test(execution.name)||!looksLikeUnitPath(path))return null;
  const current=item.units?.current,opened=current&&item.units.opened[current];
  if(!opened?.paths.includes(unitPath(path,cwd)))return '本步要求逐小节过门。先metis_step.unit_open声明当前小节文件；完成实际审查后record_unit，再写下一小节。';
  return null;
}
export function unitEvidenceProblem(step,item,captured,ledger,cwd){
  if(!requiresUnits(step))return null;
  if(item.units?.current)return '当前小节尚未record_unit，请完成本轮真实小节审查，不要事后重写历史时序证明。';
  const files=evidenceFiles(captured.files).filter(file=>file.exists&&looksLikeUnitPath(file.path));
  const written=new Set(ledger.all(step.id).filter(call=>call.path&&!call.isError&&call.invoked!==false).map(call=>unitPath(call.path,cwd)));
  const tracked=files.filter(file=>written.has(unitPath(file.path,cwd))||Object.values(item.units?.receipts||{}).some(receipt=>receipt.artifacts.some(artifact=>unitPath(artifact.path,cwd)===unitPath(file.path,cwd))));
  const candidates=tracked.length?tracked:files;
  const missing=candidates.filter(file=>!Object.values(item.units?.receipts||{}).some(receipt=>receipt.artifacts.some(artifact=>unitPath(artifact.path,cwd)===unitPath(file.path,cwd)&&artifact.sha256===file.sha256)));
  return missing.length?'缺少与当前内容哈希匹配的小节机器回执：'+missing.slice(0,12).map(file=>file.path).join('、')+'。对已有稿逐节unit_open、真实审查并record_unit；这是本轮修订校验，不补造原始历史、不要求重写已合格正文。':null;
}

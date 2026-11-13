/** Deterministic measurements enforce only explicit mechanical requirements. */
import {evidenceFiles} from './artifact-evidence.js';
export function mechanicalChecks(step,captured,output){
  const text=[step.instruction,step.deliverables,step.prompt,step.prohibitions,output?.wordFormatting].filter(Boolean).join('\n'),checks=[];
  const add=(id,path,passed,details)=>checks.push({id,path,passed,details,source:'actual-native-artifact-metrics'});
  for(const file of evidenceFiles(captured.files)){
    const notes=file.metrics?.markdownFootnotes||file.metrics?.footnotes;
    if(notes?.missingDefinitions?.length)add('footnote-references-resolve',file.path,false,'缺少实际注释定义：'+notes.missingDefinitions.join('、'));
    if(file.kind==='.docx'){
      if(/批注清理|无批注|清除批注|删除批注/.test(text))add('word-comments',file.path,(file.metrics?.comments||0)===0,'批注实际数量：'+file.metrics?.comments);
      if(/修订接受|接受修订|无修订|清除修订/.test(text))add('word-tracked-changes',file.path,(file.metrics?.trackedChanges||0)===0,'修订节点实际数量：'+file.metrics?.trackedChanges);
      if(file.metrics?.footnotes?.references>0){
        const numbering=file.metrics.footnotes.numbering||[];
        if(/圈码|圈号|①②③/.test(text))add('word-footnote-number-format',file.path,numbering.some(item=>item.properties.numFmt==='decimalEnclosedCircle')&&!numbering.some(item=>item.properties.numFmt&&item.properties.numFmt!=='decimalEnclosedCircle'),'实际Word脚注编号属性：'+JSON.stringify(numbering));
        if(/每页[^。\n]{0,10}(?:重编|重新编号|重编号)/.test(text))add('word-footnote-restart',file.path,numbering.some(item=>item.properties.numRestart==='eachPage')&&!numbering.some(item=>item.properties.numRestart&&item.properties.numRestart!=='eachPage'),'实际Word脚注重编号属性：'+JSON.stringify(numbering));
      }
    }
    const range=/摘要[^。\n]{0,50}?(\d{2,3})\s*[-–—~至]\s*(\d{2,3})\s*字/.exec(text),abstract=file.metrics?.abstract;
    if(range&&abstract&&abstract.boundaryResolved!==false){
      const minimum=Number(range[1]),maximum=Number(range[2]);
      add('abstract-length',file.path,abstract.nonWhitespace>=minimum&&abstract.nonWhitespace<=maximum,'统一按摘要正文非空白字符（不含标题和关键词）计数：'+abstract.nonWhitespace+'；汉字：'+abstract.hanCharacters+'；要求：'+minimum+'–'+maximum+'。');
    }
  }
  return {basis:'nonWhitespace-body-excluding-heading-keywords',checks,passed:checks.every(check=>check.passed),failures:checks.filter(check=>!check.passed)};
}

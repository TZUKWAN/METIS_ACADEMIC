import test from 'node:test';
import assert from 'node:assert/strict';
import {mechanicalChecks} from '../mechanical-checks.js';
test('the same abstract cannot alternately become 350 and 375 by changing a report',()=>{
 const step={instruction:'摘要须250–350字'},file={path:'abstract.md',kind:'.md',metrics:{abstract:{nonWhitespace:375,hanCharacters:351}}};
 const result=mechanicalChecks(step,{files:[file]});assert.equal(result.passed,false);assert.match(result.failures[0].details,/375/);assert.equal(mechanicalChecks(step,{files:[file,{path:'report.md',text:'350字，已通过'}]}).passed,false);
});
test('actual Word footnote settings are used and known structural failures block without model calls',()=>{
 const step={instruction:'Word脚注圈码①②③，每页重新编号，完成批注清理和修订接受'},file={path:'actual.docx',kind:'.docx',metrics:{footnotes:{references:2,definitions:2,missingDefinitions:[],numbering:[{part:'word/settings.xml',properties:{numFmt:'decimalEnclosedCircle',numRestart:'eachPage'}}]},comments:0,trackedChanges:0}};
 assert.equal(mechanicalChecks(step,{files:[file]}).passed,true);file.metrics.footnotes.numbering[0].properties.numRestart='continuous';assert.equal(mechanicalChecks(step,{files:[file]}).passed,false);
});

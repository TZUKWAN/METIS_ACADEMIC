/** Runtime enforcement for explicit execution-method restrictions. */
export function entryConstraints(step){const text=[step.instruction,step.prohibitions,step.prompt].filter(Boolean).join('\n');return{forbidOfficeCom:/(?:禁止|不得|不允许|严禁)[^。\n]{0,35}(?:Office\s*COM|COM\s*自动化|启动[^。\n]{0,20}(?:Word|Office|WPS))/i.test(text),pythonDocxOnly:/纯\s*python-docx|仅(?:用|使用)\s*python-docx/i.test(text)};}
export function entryCommandProblem(step,execution,{allowFullEnvironment=false}={}){
  const policy=entryConstraints(step),command=execution.arguments?.command||'';
  if(policy.pythonDocxOnly&&!allowFullEnvironment&&/(?:setup_emarx|emarx_env)\.py(?:\s|['"]|$)/i.test(command))return '本步只需要纯python-docx文档入口，不自动启动EMARX整库安装器。按实际entry准备最小依赖；未执行setup或下载浏览器/向量库。';
  if(policy.forbidOfficeCom&&/(?:Dispatch(?:Ex)?|GetActiveObject)\s*\(\s*['"](?:Word|WPS|KWPS|Excel|PowerPoint)\.Application|New-Object\s+-ComObject\s+(?:Word|WPS|Excel|PowerPoint)\.Application|Start-Process[^;\n]{0,180}(?:WINWORD|wps\.exe)/i.test(command))return '本步明确禁止Office COM/启动Office进程，此调用未执行。请选择实际兼容的纯文件处理入口。';
  if(policy.pythonDocxOnly&&/(?:^|[;\n\s])(?:&\s*)?(?:['"]?[^\s'"]*[\\/])?(?:pandoc|soffice|libreoffice)(?:\.exe)?['"]?\s+(?!\s*(?:--version|--help)\b)/i.test(command))return '本步要求纯python-docx生成与处理，此文档转换入口不兼容，未执行。请使用符合原步骤要求的实际入口。';
  return null;
}
export function imageInputProblem(capability,route,execution){
  if(!capability||capability.provider!==route?.provider||capability.model!==route?.model||!Array.isArray(capability.inputModalities)||capability.inputModalities.includes('image'))return null;
  const path=execution.arguments?.file_path||execution.arguments?.path||'';
  return /^(?:read|view_image)$/.test(execution.name)&&/\.(?:png|jpe?g|webp|gif|bmp)$/i.test(path)?'当前选中模型未声明图像输入，未发起图片读取/视觉核验。使用实际文件结构指标；若目标必须看图，需可用图像模型或真实OCR，不能宣称已视觉验证。':null;
}

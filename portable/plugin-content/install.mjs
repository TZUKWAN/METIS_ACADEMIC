import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {homedir} from 'node:os';
import {findCodex} from './runtime/codex.mjs';
const root=dirname(fileURLToPath(import.meta.url)),market=resolve(root,'..'),host=process.argv[2]||'codex';
function execute(binary,args){const result=spawnSync(binary,args,{stdio:'inherit',windowsHide:true});if(result.error)throw result.error;if(result.status!==0)throw new Error('原生插件安装命令失败（'+result.status+'），未宣称安装成功。');}
if(!existsSync(join(market,'.agents/plugins/marketplace.json')))throw new Error('请解压整个市场包，保留 metis 的同级隐藏市场目录；不要单独移动 install.mjs。');
if(host==='codex'){
  const binary=findCodex();execute(binary,['plugin','marketplace','add',market,'--json']);execute(binary,['plugin','add','metis@metis-local','--json']);
  console.log('METIS 已经由 Codex 原生插件管理器安装。当前窗口未重启；在新会话中使用 $metis。');
}else if(host==='zcode'){
  const cli=process.env.METIS_ZCODE_CLI||join(process.env.LOCALAPPDATA||join(homedir(),'AppData/Local'),'Programs/ZCode/resources/glm/zcode.cjs');if(!existsSync(cli))throw new Error('未找到 ZCode CLI；可设置 METIS_ZCODE_CLI 或在 ZCode 插件市场添加本目录。');
  execute(process.execPath,[cli,'plugins','marketplace','add',market,'--json']);
  if(process.argv.includes('--enable')){execute(process.execPath,[cli,'plugins','install','metis@metis-local','--json']);console.log('METIS 已通过 ZCode 原生安装器安装并启用。');}
  else console.log('已添加 METIS 本地市场，尚未启用插件，不刷新正在工作的会话。任务结束后在 ZCode 中安装，或运行 node install.mjs zcode --enable。');
}else throw new Error('宿主参数仅支持 codex 或 zcode。');

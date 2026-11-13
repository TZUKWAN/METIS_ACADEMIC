/** Process-local bridge; only the owning project service supplies audited history. */
import {configurationHome} from './configuration.js';
const key=Symbol.for('metis.project.workflow-link.v1'),providers=globalThis[key]??=new Map();
export function registerProjectWorkflowProvider(provider){
  const home=configurationHome(),token={provider};providers.set(home,token);
  return ()=>{if(providers.get(home)===token)providers.delete(home);};
}
export function inheritedProjectOwners(sessionId){return providers.get(configurationHome())?.provider.inheritedOwners(sessionId)||[];}
export async function projectWorkflowContext(sessionId,request={}){return await providers.get(configurationHome())?.provider.read(sessionId,request)||{available:false};}

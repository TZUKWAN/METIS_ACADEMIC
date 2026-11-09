import {researchSceneState} from './project-scene-state.js';
import {createIonSurface} from './ion-surface.js';
import {createIonWorld} from './ion-world.js';
import {createCircuitWorkspace as createWorkspace} from './circuit-workspace.js';
import {workbenchCss} from './ion-workbench-style.js';
export {researchSceneState,stepStateLabels} from './project-scene-state.js';
export function createCircuitWorkspace(React,options){return createWorkspace(React,{...options,createIonWorld,workbenchCss});}
// The existing display-client revision owns UI and graphics together. Cached
// parents and pre-ION Hosts need no new metadata field or renderer endpoint.
export function createResearchScene(React,options){return createIonSurface(React,{...options,researchSceneState,createIonWorld,workbenchCss});}

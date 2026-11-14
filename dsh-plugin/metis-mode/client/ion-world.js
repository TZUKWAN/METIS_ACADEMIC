/** Original METIS ion circuit. Offline Three.js, MIT; no reference assets/code. */
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {CSS3DRenderer,CSS3DObject} from 'three/addons/renderers/CSS3DRenderer.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {createIonResearchNetwork} from './ion-research-network.js';
import {buildResearchNetwork} from './research-network.js';
import {researchFocusDistance} from './research-motion.js';
import {createIonAtmosphere} from './ion-atmosphere.js';
import {ION_MOTION,ionCameraEase,ionPointer,ionIdlePose} from './ion-art-direction.js';
import {RESEARCH_SPACE} from './research-space.js';
import {RESEARCH_ART,researchCameraFrame} from './research-art-direction.js';

const colors={submitted:0x86ddb9,working:0xff9659,checking:0xd3b1ff,needs_revision:0xffcc72,needs_recheck:0xffcc72,blocked:0xf59282,passed:0xa7e0bd,not_started:0x986759,configured:0xb37c5e,incomplete:0xffc47c};
const colorOf=node=>node.active?0xffb36d:node.viewed?0xffbc86:colors[node.status]||0x986759;
function glowTexture(){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=128;
  const context=canvas.getContext('2d'),gradient=context.createRadialGradient(64,64,0,64,64,64);
  for(const [offset,color] of [[0,'#fffce8'],[.08,'#ffd3a9'],[.23,'#ff965bb8'],[.5,'#ff58222b'],[1,'#ff451000']])gradient.addColorStop(offset,color);
  context.fillStyle=gradient;context.fillRect(0,0,128,128);return new THREE.CanvasTexture(canvas);
}
function disposeTree(root,shared){
  root.traverse(object=>{object.geometry?.dispose();for(const material of Array.isArray(object.material)?object.material:[object.material])if(material&&!shared.has(material))material.dispose();});
}

export function createIonWorld({host,compactHud=false,onPick,onEntity,onFocusChat,onState,onError,onReorder,onBindSkill,onToggleLoop,onAddAfter,onOpenArtifact,onSkillInspect}){
  const renderer=new THREE.WebGLRenderer({alpha:false,antialias:true,powerPreference:'high-performance'});
  renderer.setClearColor(0x080a12);renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.06;
  renderer.domElement.className='ion-gl';renderer.domElement.setAttribute('aria-hidden','true');host.appendChild(renderer.domElement);
  const css=new CSS3DRenderer();css.domElement.className='ion-labels';host.appendChild(css.domElement);
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x080a12);scene.fog=new THREE.FogExp2(0x080a12,.008);
  const camera=new THREE.PerspectiveCamera(35,1,.1,130),controls=new OrbitControls(camera,host);
  controls.enableDamping=true;controls.dampingFactor=.085;controls.minDistance=6;controls.maxDistance=55;
  controls.maxPolarAngle=Math.PI*.66;controls.minPolarAngle=Math.PI*.27;controls.maxAzimuthAngle=.8;controls.minAzimuthAngle=-.8;
  const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));
  const bloom=new UnrealBloomPass(new THREE.Vector2(800,580),.44,.62,.82),output=new OutputPass();composer.addPass(bloom);composer.addPass(output);
  scene.add(new THREE.HemisphereLight(0xb6d1db,0x050b12,.7));
  const key=new THREE.DirectionalLight(0xffc394,1.15);key.position.set(-14,18,22);scene.add(key);
  const rim=new THREE.DirectionalLight(0x83b8d6,1.3);rim.position.set(16,13,-14);scene.add(rim);
  const lamp=new THREE.PointLight(0xff592e,12,25);lamp.position.set(-5,-1,5);scene.add(lamp);
  const board=new THREE.Group();board.rotation.set(-.025,.035,-.065);scene.add(board);
  const chipMaterial=new THREE.MeshStandardMaterial({color:0x1b121a,metalness:.3,roughness:.65});
  const copper=new THREE.MeshStandardMaterial({color:0x8b4a33,metalness:.5,roughness:.6});
  const shared=new Set([chipMaterial,copper]);
  const atmosphere=createIonAtmosphere({scene,board,host});
  const nodesRoot=new THREE.Group(),linksRoot=new THREE.Group(),busesRoot=new THREE.Group(),labelsRoot=new THREE.Group();board.add(nodesRoot,linksRoot,busesRoot,labelsRoot);
  const texture=glowTexture(),nodes=new Map();
  const engineElement=document.createElement('button');engineElement.type='button';engineElement.className='ion-engine';engineElement.setAttribute('aria-label','进入研究助手');
  const engineName=document.createElement('strong'),engineNote=document.createElement('span');engineName.textContent='METIS';engineNote.textContent='RESEARCH ENGINE';engineElement.append(engineName,engineNote);
  engineElement.addEventListener('pointerdown',event=>event.stopPropagation());engineElement.onclick=()=>onFocusChat?.();
  const engine=new CSS3DObject(engineElement);engine.scale.setScalar(.014);labelsRoot.add(engine);
  let width=800,height=580,sized=false,model={nodes:[],activeCalls:[]},modelSignature='',signature='',frame=0,lastTime=0,time=0,drawing=false,visible=true,disposed=false,contextLost=false;
  let selected=null,cameraMove=null,follow=true,lastActive=null,lastFollowScope='',dragging=false,research=null,motionPaused=false,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,lastImpulse='',lastResearchView='',lastResearchFrame='';
  controls.enableDamping=!reduced;
  const sample=new THREE.Vector3();
  function spec(count){const columns=Math.min(count||1,width>=1450&&count>9?4:width>=760?3:2);return{columns,rows:Math.ceil(count/columns),gapX:5.25,gapY:3.35};}
  function locations(count){
    const {columns,rows,gapX,gapY}=spec(count);
    return Array.from({length:count},(_,index)=>{const row=Math.floor(index/columns),column=row%2?columns-1-index%columns:index%columns;return new THREE.Vector3((column-(columns-1)/2)*gapX,(rows-1)*gapY/2-row*gapY-.9,0);});
  }
  function makeCard(id){
    const element=document.createElement('button');element.type='button';element.className='ion-chip';element.dataset.sceneStep=id;
    const head=document.createElement('div');head.className='ion-chip-head';const index=document.createElement('span');index.className='ion-chip-index';const state=document.createElement('span');state.className='ion-chip-state';head.append(index,state);
    const title=document.createElement('strong');title.className='ion-chip-title';const purpose=document.createElement('span');purpose.className='ion-chip-purpose';const foot=document.createElement('span');foot.className='ion-chip-foot';const face=document.createElement('span');face.className='ion-chip-face';face.append(head,title,purpose,foot);element.append(face);
    element.addEventListener('pointerdown',event=>event.stopPropagation());element.onclick=()=>{follow=false;onState?.({follow});focus(id);onPick?.(id);};
    element.addEventListener('dragstart',event=>{if(!model.editable){event.preventDefault();return;}event.dataTransfer.setData('application/x-metis-step',id);event.dataTransfer.effectAllowed='move';element.dataset.dragging='true';});
    element.addEventListener('dragend',()=>{delete element.dataset.dragging;for(const node of nodes.values())delete node.card.element.dataset.drop;});
    element.addEventListener('dragover',event=>{if(!model.editable||![...event.dataTransfer.types].some(type=>type==='application/x-metis-step'||type==='application/x-metis-skill'))return;event.preventDefault();event.stopPropagation();element.dataset.drop=[...event.dataTransfer.types].includes('application/x-metis-skill')?'skill':event.clientY<element.getBoundingClientRect().y+element.getBoundingClientRect().height/2?'before':'after';event.dataTransfer.dropEffect=element.dataset.drop==='skill'?'copy':'move';});
    element.addEventListener('dragleave',event=>{if(!element.contains(event.relatedTarget))delete element.dataset.drop;});
    element.addEventListener('drop',event=>{if(!model.editable)return;const skill=event.dataTransfer.getData('application/x-metis-skill'),source=event.dataTransfer.getData('application/x-metis-step'),edge=element.dataset.drop||'before';delete element.dataset.drop;if(!skill&&!source)return;event.preventDefault();event.stopPropagation();if(skill)onBindSkill?.(id,skill);else if(source!==id)onReorder?.(source,id,edge);});
    element.addEventListener('keydown',event=>{if(!model.editable||!event.altKey||!['ArrowUp','ArrowDown'].includes(event.key))return;const index=model.nodes.findIndex(node=>node.id===id),other=model.nodes[index+(event.key==='ArrowUp'?-1:1)];if(other){event.preventDefault();event.stopPropagation();onReorder?.(id,other.id,event.key==='ArrowUp'?'before':'after');}});
    return{element,index,state,title,purpose,foot};
  }
  function makePorts(id){
    const element=document.createElement('div');element.className='ion-nodePorts';element.setAttribute('role','group');element.setAttribute('aria-label','步骤技能、循环与交付');element.addEventListener('pointerdown',event=>event.stopPropagation());
    const label=new CSS3DObject(element);label.scale.setScalar(.014);labelsRoot.add(label);
    const add=document.createElement('button');add.type='button';add.className='ion-nodeInsert';add.textContent='+';add.setAttribute('aria-label','在此步骤后新增步骤');add.addEventListener('pointerdown',event=>event.stopPropagation());add.onclick=()=>onAddAfter?.(id);
    const action=new CSS3DObject(add);action.scale.setScalar(.014);labelsRoot.add(action);
    return{element,label,add,action};
  }
  function updatePorts(entry){
    const node=entry.node,skills=node.skills||[],artifacts=node.artifacts||[],key=JSON.stringify([node.loop,skills.map(skill=>[skill.id,skill.name]),artifacts.map(file=>[file.index,file.name,file.availability]),node.output?.format,model.editable]);
    entry.card.element.draggable=!!model.editable;entry.card.element.setAttribute('aria-keyshortcuts',model.editable?'Alt+ArrowUp Alt+ArrowDown':'');entry.ports.action.visible=!!model.editable&&node.viewed;entry.loopTrace.visible=node.loop===true;
    if(entry.portSignature===key)return;entry.portSignature=key;entry.ports.element.replaceChildren();
    const append=(text,kind,title,run,disabled=false)=>{const button=document.createElement('button');button.type='button';button.className='ion-port ion-port-'+kind;button.textContent=text;button.title=title;button.disabled=disabled;button.onclick=event=>{event.stopPropagation();run?.();};entry.ports.element.appendChild(button);return button;};
    if(node.loop||model.kind==='mode')append(node.loop?'↻ 达标循环':'↻ 循环','loop',node.loopCriteria||'未达标时继续本步；点此设置',()=>model.editable?onToggleLoop?.(node.id):onPick?.(node.id),model.kind==='mode'&&!model.editable);
    for(const skill of skills.slice(0,2)){const button=append(skill.name,'skill',skill.name+' · '+skill.id,()=>onSkillInspect?.(node.id,skill.id));button.dataset.skillId=skill.id;}
    if(skills.length>2)append('+'+(skills.length-2)+' 技能','skill','查看本步全部技能',()=>onPick?.(node.id));
    for(const file of artifacts.slice(0,2)){const button=append(file.name,'artifact',file.path,()=>onOpenArtifact?.(node.id,file.index,file),file.availability!=='file');button.dataset.artifactIndex=String(file.index);}
    if(artifacts.length>2)append('+'+(artifacts.length-2)+' 交付','artifact','查看本步全部交付物',()=>onPick?.(node.id));
    if(node.output?.format&&node.output.format!=='auto')append(node.output.format.toUpperCase(),'output','最终输出目标，点此编辑',()=>onPick?.(node.id));
  }
  function curveFor(start,end){
    const delta=end.x-start.x,direction=delta>=0?1:-1,sameRow=Math.abs(end.y-start.y)<.5;
    const source=start.clone().add(new THREE.Vector3(sameRow?direction*2.35:0,sameRow?0:-1.25,.03));
    const destination=end.clone().add(new THREE.Vector3(sameRow?-direction*2.35:0,sameRow?0:1.25,.03));
    const points=sameRow?[source,source.clone().add(new THREE.Vector3(direction*.18,0,0)),source.clone().add(new THREE.Vector3(direction*.27,-.25,0)),destination.clone().add(new THREE.Vector3(-direction*.27,-.25,0)),destination.clone().add(new THREE.Vector3(-direction*.18,0,0)),destination]:[source,source.clone().add(new THREE.Vector3(.45,-.17,0)),destination.clone().add(new THREE.Vector3(.45,.17,0)),destination];
    return new THREE.CatmullRomCurve3(points,false,'centripetal');
  }
  function rebuild(){
    for(const node of nodes.values()){node.card.element.remove();node.ports.element.remove();node.ports.add.remove();labelsRoot.remove(node.label,node.ports.label,node.ports.action);}nodes.clear();
    for(const root of [nodesRoot,linksRoot,busesRoot]){disposeTree(root,shared);root.clear();}
    const positions=locations(model.nodes.length),layout=spec(model.nodes.length);
    engine.position.set(-.8,(layout.rows-1)*layout.gapY/2+1.8,.12);
    // Parallel ion buses recede behind the actual step chips.
    for(let column=0;column<=layout.columns;column++){
      const x=(column-layout.columns/2)*layout.gapX;
      for(const offset of [-.07,0,.07]){
        const geometry=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x+offset,-18,-.08),new THREE.Vector3(x+offset,18,-.08)]);
        busesRoot.add(new THREE.Line(geometry,new THREE.LineBasicMaterial({color:offset?0x85442f:0xcc693f,transparent:true,opacity:offset?.3:.46})));
      }
      for(let y=-12;y<=12;y+=1.1){const pad=new THREE.Mesh(new THREE.BoxGeometry(.11,.022,.025),copper);pad.position.set(x,y,-.05);busesRoot.add(pad);}
    }
    model.nodes.forEach((node,index)=>{
      const position=positions[index],group=new THREE.Group();group.position.copy(position);nodesRoot.add(group);
      const plate=new THREE.Mesh(new THREE.BoxGeometry(4.65,2.42,.19),chipMaterial);group.add(plate);
      const edge=new THREE.LineSegments(new THREE.EdgesGeometry(plate.geometry),new THREE.LineBasicMaterial({color:colorOf(node),transparent:true,opacity:.6}));group.add(edge);
      for(let pin=0;pin<10;pin++)for(const side of [-1,1]){const contact=new THREE.Mesh(new THREE.BoxGeometry(.17,.035,.055),copper);contact.position.set(side*2.42,-.94+pin*.21,-.015);group.add(contact);}
      const card=makeCard(node.id),label=new CSS3DObject(card.element);label.position.copy(position).add(new THREE.Vector3(0,0,.13));label.scale.setScalar(.014);labelsRoot.add(label);
      const ports=makePorts(node.id);ports.label.position.copy(position).add(new THREE.Vector3(0,-1.46,.14));ports.action.position.copy(position).add(new THREE.Vector3(2.64,.15,.14));
      const loopCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(2.15,-.8,.01),new THREE.Vector3(2.65,-.8,.01),new THREE.Vector3(2.65,1.28,.01),new THREE.Vector3(1.8,1.28,.01),new THREE.Vector3(1.8,1.15,.01)].map(point=>point.add(position))),loopTrace=new THREE.Mesh(new THREE.TubeGeometry(loopCurve,40,.018,5,false),new THREE.MeshBasicMaterial({color:0xefb46d,transparent:true,opacity:.65}));linksRoot.add(loopTrace);
      const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,color:colorOf(node),transparent:true,opacity:.13,depthWrite:false,blending:THREE.AdditiveBlending}));glow.scale.set(5.6,3.2,1);glow.position.z=-.08;group.add(glow);
      const previous=index?positions[index-1]:engine.position,curve=curveFor(previous,position);
      const trace=new THREE.Mesh(new THREE.TubeGeometry(curve,48,.022,6,false),new THREE.MeshBasicMaterial({color:0xc26842,transparent:true,opacity:.5}));linksRoot.add(trace);
      const runner=new THREE.Group(),core=new THREE.Mesh(new THREE.SphereGeometry(.09,12,8),new THREE.MeshBasicMaterial({color:0xfff9c9})),flare=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,color:0xffb164,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));flare.scale.setScalar(1.35);runner.add(core,flare);runner.visible=false;linksRoot.add(runner);
      const tail=new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(new Float32Array(48),3)),new THREE.PointsMaterial({color:0xffb26a,size:.045,transparent:true,opacity:.9,depthWrite:false,blending:THREE.AdditiveBlending}));tail.visible=false;linksRoot.add(tail);
      nodes.set(node.id,{node,index,position,group,edge,card,label,ports,loopTrace,glow,curve,trace,runner,tail,portSignature:null});
    });
    updateCards();fitCamera(false);
  }
  function updateCards(){
    for(const entry of nodes.values()){
      const node=entry.node,color=colorOf(node),card=entry.card;
      card.element.dataset.active=String(node.active);card.element.dataset.viewed=String(node.viewed);card.element.dataset.status=node.status;
      card.element.style.setProperty('--ion-node','#'+new THREE.Color(color).getHexString());
      card.element.setAttribute('aria-label','第'+(node.index+1)+'步 '+node.title+' · '+node.label);
      card.index.textContent=String(node.index+1).padStart(2,'0');card.state.textContent=node.active?'执行中':node.label;
      card.title.textContent=node.title;card.purpose.textContent=node.purpose||node.expected||'选择查看本步目标与交付';
      card.foot.textContent=node.recentCall?node.recentCall.label+(node.recentCall.target?' · '+node.recentCall.target:''):model.kind==='mode'?(node.skills?.length||0)+' 项技能 · 点击编辑 / 拖动排序':node.loop?'达标后交付':'等待实际执行';
      entry.edge.material.color.setHex(color);entry.trace.material.color.setHex(node.active?0xffb564:node.status==='submitted'?0x86ddb9:0xb65c3c);
      entry.trace.material.opacity=node.active?1:node.status==='submitted'?.8:.44;entry.glow.material.color.setHex(color);
      updatePorts(entry);
    }
  }
  function moveCamera(position,target,duration=ION_MOTION.camera){
    const damping=controls.enableDamping;controls.enableDamping=false;controls.update();controls.enableDamping=damping;
    if(reduced)duration=0;
    if(camera.position.distanceToSquared(position)<.00001&&controls.target.distanceToSquared(target)<.00001){cameraMove=null;host.dataset.cameraMoving='false';requestFrame();return;}
    if(!duration){cameraMove=null;camera.position.copy(position);controls.target.copy(target);controls.update();}
    else cameraMove={start:performance.now(),duration,from:camera.position.clone(),targetFrom:controls.target.clone(),position,target};host.dataset.cameraMoving=String(duration>0);requestFrame();
  }
  function fitCamera(animated=true,intro=false){
    if(research){
      const bounds=research.bounds();if(!bounds)return;const box=new THREE.Box3();board.updateMatrixWorld(true);
      for(const x of [bounds.minX,bounds.maxX])for(const y of [bounds.minY,bounds.maxY])for(const z of [bounds.minZ,bounds.maxZ])box.expandByPoint(board.localToWorld(new THREE.Vector3(x,y,z)));
      const mode=model.network?.presentation.expanded?model.network.artMode||'overview':'cockpit',pose=researchCameraFrame({minX:box.min.x,maxX:box.max.x,minY:box.min.y,maxY:box.max.y,minZ:box.min.z,maxZ:box.max.z},camera.aspect,{mode,height}),target=new THREE.Vector3(...pose.target),position=new THREE.Vector3(...pose.position);
      controls.maxDistance=Math.max(100,pose.distance*1.7);camera.far=Math.max(300,pose.distance*4);camera.updateProjectionMatrix();selected=null;host.dataset.cameraKeyframe=mode;
      if(intro&&!reduced){camera.position.copy(target).add(position.clone().sub(target).multiplyScalar(1.13)).add(new THREE.Vector3(-2.5,2.8,0));controls.target.copy(target);controls.update();}
      moveCamera(position,target,animated?(intro?RESEARCH_ART.intro:mode==='complete'?RESEARCH_ART.handoff:1000):0);return;
    }
    const {columns,rows,gapX,gapY}=spec(model.nodes.length),spread=(columns-1)*gapX+6.6,vertical=(rows-1)*gapY+2.65,tangent=Math.tan(THREE.MathUtils.degToRad(17.5));
    const distance=Math.max(12,spread/(2*tangent*Math.max(.5,width/height)*.92),vertical/(2*tangent*Math.max(.45,(height-(compactHud?155:220))/height)));
    controls.maxDistance=Math.max(55,distance*1.25);
    const target=board.localToWorld(new THREE.Vector3(0,-.9+distance*2*tangent*23/height,0));selected=null;
    moveCamera(target.clone().add(new THREE.Vector3(-distance*.17,distance*.12,distance)),target,animated?850:0);
  }
  function followResearch(animated=true){
    if(!research)return;const view=model.network?.presentation,id=view?.level==='stage'&&model.phase==='processing'&&model.live?.active?.kind==='model'?(view.stageId?'step:'+view.stageId:'engine'):research.active()||research.latest(),point=research.position(id);if(!point)return;
    research.showLive(true);
    const family=research.focusFrame(id),pose=family?.bounds?researchCameraFrame(family.bounds,camera.aspect,{mode:family.action?'action':'execution',height}):null,distance=pose?.distance||researchFocusDistance(width,height,research.size(id));
    controls.maxDistance=Math.max(100,distance*2);camera.far=Math.max(240,distance*4);camera.updateProjectionMatrix();
    const target=pose?new THREE.Vector3(...pose.target):board.localToWorld(new THREE.Vector3(point.x,point.y+.35,point.z)),position=pose?new THREE.Vector3(...pose.position):target.clone().add(new THREE.Vector3(-.8,.6,distance));selected=id;research.focus(id);host.dataset.followTarget=id;host.dataset.followMode=family?.action?'action':family?'parent-and-child':'active-card';host.dataset.cameraKeyframe='execution';
    lastFollowScope=research.followKey(id);lastActive=id;moveCamera(position,target,animated?RESEARCH_ART.focus:0);
  }
  function focus(id,animated=true){
    if(research){const p=research.position(id);if(!p)return;research.showLive(true);selected=id;research.focus(id);const frame=research.focusFrame(id),pose=frame?.bounds?researchCameraFrame(frame.bounds,camera.aspect,{mode:frame.action?'action':'inspection',height}):null,distance=pose?.distance||researchFocusDistance(width,height,research.size(id)),target=pose?new THREE.Vector3(...pose.target):board.localToWorld(new THREE.Vector3(p.x,p.y,p.z));controls.maxDistance=Math.max(100,distance*2);camera.far=Math.max(240,distance*4);camera.updateProjectionMatrix();host.dataset.cameraKeyframe='inspection';moveCamera(pose?new THREE.Vector3(...pose.position):target.clone().add(new THREE.Vector3(-distance*.07,distance*.07,distance)),target,animated?RESEARCH_ART.focus:0);return;}
    const entry=nodes.get(id);if(!entry)return;selected=id;
    const target=board.localToWorld(entry.position.clone());moveCamera(target.clone().add(new THREE.Vector3(-1.7,1.1,10.5)),target);
  }
  function requestFrame(){if(!disposed&&!contextLost&&!drawing&&visible&&!document.hidden&&!frame)frame=requestAnimationFrame(render);}
  function render(now){
    frame=0;if(disposed||contextLost||!visible||document.hidden)return;
    const active=!!cameraMove||dragging||research?.animating()||model.nodes.some(node=>node.active);
    if(now-lastTime<(active?ION_MOTION.activeFrame:ION_MOTION.idleFrame)){frame=requestAnimationFrame(render);return;}
    const delta=Math.min(.2,(now-lastTime)/1000);lastTime=now;if(!reduced)time+=delta;drawing=true;let moving=false;
    if(cameraMove){const ratio=Math.min(1,(now-cameraMove.start)/cameraMove.duration),ease=ionCameraEase(ratio);camera.position.lerpVectors(cameraMove.from,cameraMove.position,ease);controls.target.lerpVectors(cameraMove.targetFrom,cameraMove.target,ease);if(ratio===1){cameraMove=null;host.dataset.cameraMoving='false';}moving=true;}
    const orbitMoving=controls.update();camera.updateMatrixWorld(true);board.updateMatrixWorld(true);atmosphere.render(time,delta,reduced,camera);const networkMoving=research?.render(time,reduced,camera);
    for(const entry of nodes.values()){
      const idle=ionIdlePose(time,entry.index,reduced||entry.card.element.matches(':hover,:focus-visible'));entry.group.position.set(entry.position.x+idle.x,entry.position.y+idle.y,entry.position.z+idle.z);entry.group.rotation.set(idle.rx,idle.ry,0);entry.label.position.copy(entry.group.position);entry.label.position.z+=.13;entry.label.rotation.copy(entry.group.rotation);entry.ports.label.position.copy(entry.group.position);entry.ports.label.position.y-=1.46;entry.ports.label.position.z+=.14;entry.ports.action.position.copy(entry.group.position);entry.ports.action.position.x+=2.64;entry.ports.action.position.y+=.15;entry.ports.action.position.z+=.14;
      const active=entry.node.active,progress=reduced?.5:(time*.48+entry.index*.13)%1;entry.runner.visible=active;entry.tail.visible=active&&!reduced;
      entry.glow.material.opacity=active?(reduced?.5:.43+Math.sin(time*3)*.09):entry.node.viewed?.22:.055;
      if(active){entry.runner.position.copy(entry.curve.getPoint(progress));const points=entry.tail.geometry.attributes.position;for(let i=0;i<16;i++){entry.curve.getPoint(Math.max(0,progress-i*.014),sample);points.setXYZ(i,sample.x,sample.y,sample.z);}points.needsUpdate=true;}
    }
    composer.render();css.render(scene,camera);host.dataset.frames=String(Number(host.dataset.frames||0)+1);host.dataset.cameraDistance=camera.position.distanceTo(controls.target).toFixed(3);host.dataset.cameraAzimuth=controls.getAzimuthalAngle().toFixed(4);host.dataset.cameraElevation=(Math.PI/2-controls.getPolarAngle()).toFixed(4);host.dataset.gpuGeometries=String(renderer.info.memory.geometries);host.dataset.gpuTextures=String(renderer.info.memory.textures);drawing=false;
    if(moving||dragging||orbitMoving||networkMoving||!reduced)requestFrame();
  }
  controls.addEventListener('start',()=>{dragging=true;cameraMove=null;host.dataset.cameraMoving='false';host.dataset.cameraKeyframe='manual';follow=false;onState?.({follow,manual:true});requestFrame();});
  controls.addEventListener('end',()=>{dragging=false;requestFrame();});controls.addEventListener('change',requestFrame);
  const pointerMove=event=>{atmosphere.pointer(ionPointer(event.clientX,event.clientY,host.getBoundingClientRect()));},pointerLeave=()=>atmosphere.pointer({x:0,y:0});host.addEventListener('pointermove',pointerMove,{passive:true});host.addEventListener('pointerleave',pointerLeave,{passive:true});
  const motion=matchMedia('(prefers-reduced-motion: reduce)'),preference=()=>{reduced=motion.matches||motionPaused;controls.enableDamping=!reduced;if(reduced){if(cameraMove){camera.position.copy(cameraMove.position);controls.target.copy(cameraMove.target);cameraMove=null;host.dataset.cameraMoving='false';}controls.update();}requestFrame();};motion.addEventListener('change',preference);
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else requestFrame();};document.addEventListener('visibilitychange',visibility);
  const lost=event=>{event.preventDefault();contextLost=true;cancelAnimationFrame(frame);frame=0;onError?.('三维图形上下文已中断，可重新初始化场景。');};renderer.domElement.addEventListener('webglcontextlost',lost);
  onState?.({renderer:'three-webgl2',follow});
  return{
    update(value){const nextSignature=JSON.stringify(value);if(nextSignature===modelSignature)return;const previousPhase=model?.phase;modelSignature=nextSignature;model=value;
      if(model.kind==='project'){
        board.rotation.set(0,0,0);controls.minPolarAngle=Math.PI*.14;controls.maxPolarAngle=Math.PI*.49;controls.minAzimuthAngle=-Infinity;controls.maxAzimuthAngle=Infinity;
        const first=!research;engine.visible=false;
        if(first)research=createIonResearchNetwork({board,texture,host,requestFrame,onPick,onFocusChat,onEntity:id=>{const entity=(model.network||buildResearchNetwork(model)).byId.get(id);if(!['artifact','delivery'].includes(entity?.kind)){follow=false;onState?.({follow});}if(onEntity)onEntity(id);else if(entity?.stepId)onPick?.(entity.stepId);}});
        const projected=model.network||buildResearchNetwork(model);research.update(projected,model);
        atmosphere.update(model,research.position(research.active()||research.latest()));
        const impulse=[model.live?.active?.callId||'',model.activeCalls.at(-1)?.callId||'',research.active()||'',model.activities?.at(-1)?.status||''].join('|');if(impulse!==lastImpulse){if(lastImpulse)atmosphere.pulse(research.position(research.active()||research.latest()),time);lastImpulse=impulse;}
        const active=research.active()||research.latest();
        const view=projected.presentation,nextView=[view.level,view.stageId,view.selectedId,view.page].join('|'),viewTarget=view.selectedId||(view.stageId?'step:'+view.stageId:'engine'),nextFrame=view.level==='stage'?JSON.stringify(research.focusFrame(viewTarget)?.bounds):'';
        if(first){if(view.expanded)focus(viewTarget,false);else fitCamera(false);lastActive=active;}
        else if(follow&&previousPhase!=='completed'&&model.phase==='completed'){follow=false;research.showLive(false);onState?.({follow});fitCamera();}
        else if(follow&&(research.active()||projected.counts.calls)&&research.followKey(active)!==lastFollowScope)followResearch();
        else if(follow&&(research.active()||projected.counts.calls)&&active!==lastActive){selected=active;research.focus(active);research.showLive(true);host.dataset.followTarget=active;lastActive=active;requestFrame();}
        else if(!follow&&nextView!==lastResearchView){if(view.expanded)focus(viewTarget);else{research.showLive(false);fitCamera();}}
        else if(!follow&&view.level==='stage'&&nextFrame!==lastResearchFrame&&host.dataset.cameraKeyframe==='inspection')focus(viewTarget);
        lastResearchView=nextView;lastResearchFrame=nextFrame;
        requestFrame();return;
      }
      engineElement.dataset.busy=String(value.phase==='processing'||value.phase==='running');const key=model.nodes.map(node=>node.id).join('|');if(signature!==key){signature=key;rebuild();}for(const node of model.nodes)if(nodes.has(node.id))nodes.get(node.id).node=node;updateCards();const active=model.activeCalls.at(-1)?.stepId;atmosphere.update(model,nodes.get(active||selected)?.position);if(follow&&active&&active!==lastActive){focus(active);lastActive=active;}requestFrame();},
    resize(w,h){const nextWidth=Math.max(1,w),nextHeight=Math.max(1,h);if(sized&&width===nextWidth&&height===nextHeight)return;sized=true;const before=spec(model.nodes.length).columns;width=nextWidth;height=nextHeight;const pixelRatio=Math.min(devicePixelRatio||1,1.35,Math.sqrt(1800000/(width*height)));renderer.setPixelRatio(pixelRatio);renderer.setSize(width,height,false);composer.setPixelRatio(pixelRatio);composer.setSize(width,height);css.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();if(research){if(follow&&(research.active()||model.network?.counts.calls))followResearch(false);else if(selected&&host.dataset.cameraKeyframe==='inspection')focus(selected,!!cameraMove);else if(!selected&&host.dataset.cameraKeyframe!=='manual')fitCamera(false);}else if(before!==spec(model.nodes.length).columns&&model.nodes.length)rebuild();else if(!selected)fitCamera(false);requestFrame();},
    visible(value){visible=value;if(!visible){cancelAnimationFrame(frame);frame=0;}else requestFrame();},
    home(){follow=false;research?.showLive(false);onState?.({follow});fitCamera();},
    reveal(arm=false){follow=!!arm;lastFollowScope='';research?.showLive(false);onState?.({follow});fitCamera(true,true);},
    follow(value=true){follow=value&&model.phase!=='completed';onState?.({follow});if(follow){if(research){if(research.active()||model.network?.counts.calls)followResearch();else fitCamera();lastActive=research.active()||research.latest();}else{const active=model.activeCalls.at(-1)?.stepId;if(active)focus(active);else fitCamera();}}else if(value&&research&&model.phase==='completed')fitCamera();},
    preview(id){research?.preview(id);},
    pauseMotion(value){motionPaused=!!value;host.dataset.motionPaused=String(motionPaused);preference();},
    focus(id){follow=false;onState?.({follow});focus(id);},
    captureView(){const view=model.network?.presentation;return{position:camera.position.toArray(),target:controls.target.toArray(),follow,selected,keyframe:host.dataset.cameraKeyframe,layout:research?RESEARCH_SPACE.version:'workflow-v1',navigation:research?[view?.level,view?.stageId,view?.selectedId,view?.page].join('|'):null};},
    restoreView(view){if(!view||![view.position,view.target].every(point=>Array.isArray(point)&&point.length===3&&point.every(Number.isFinite)))return;if(research&&view.layout!==RESEARCH_SPACE.version){follow=!!research.active();if(follow)followResearch(false);else fitCamera(false);onState?.({follow});return;}if(research&&view.navigation!==[model.network?.presentation.level,model.network?.presentation.stageId,model.network?.presentation.selectedId,model.network?.presentation.page].join('|')){follow=false;const current=model.network?.presentation;if(current?.expanded)focus(current.selectedId||(current.stageId?'step:'+current.stageId:'engine'),false);else fitCamera(false);onState?.({follow});return;}if(research&&view.follow&&model.phase==='completed'){follow=false;research.showLive(false);fitCamera(false);onState?.({follow});return;}if(research&&view.follow){follow=true;followResearch(false);lastActive=research.active()||research.latest();onState?.({follow});return;}follow=!!view.follow;selected=(research?.has(view.selected)||nodes.has(view.selected))?view.selected:null;research?.showLive(follow||!!selected);moveCamera(new THREE.Vector3(...view.position),new THREE.Vector3(...view.target),0);onState?.({follow});},
    dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(frame);motion.removeEventListener('change',preference);document.removeEventListener('visibilitychange',visibility);host.removeEventListener('pointermove',pointerMove);host.removeEventListener('pointerleave',pointerLeave);renderer.domElement.removeEventListener('webglcontextlost',lost);controls.dispose();research?.dispose();atmosphere.dispose();for(const node of nodes.values()){node.card.element.remove();node.ports.element.remove();node.ports.add.remove();}engineElement.remove();disposeTree(scene,shared);for(const material of shared)material.dispose();texture.dispose();bloom.dispose();output.dispose();composer.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();css.domElement.remove();nodes.clear();for(const key of['cameraMoving','cameraAzimuth','cameraElevation','cameraKeyframe','gpuGeometries','gpuTextures'])delete host.dataset[key];},
  };
}

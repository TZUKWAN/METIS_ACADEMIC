/** Shallow research stages with one disclosed page of actual events. */
import * as THREE from 'three';
import {CSS3DObject} from 'three/addons/renderers/CSS3DRenderer.js';
import {networkEntitySize,networkKinds} from './research-network.js';
import {RESEARCH_SPACE,spatialRoute,researchChildPosition} from './research-space.js';
import {researchArrival,researchLiveSummary,researchCardDetail,ResearchTicker,researchStreamScope} from './research-motion.js';
import {ionStatusSignal,ionCameraEase,ionIdlePose} from './ion-art-direction.js';
import {RESEARCH_ART,researchEventPose,researchConnectionMotion,researchFollowKey} from './research-art-direction.js';
const wireVertex=['varying float vWireT;','uniform vec3 uStartOffset;','uniform vec3 uEndOffset;','void main(){','vWireT=uv.x;','vec3 p=position+mix(uStartOffset,uEndOffset,smoothstep(0.,1.,uv.x));','gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);','}'].join('\n');
const wireFragment=['precision highp float;','varying float vWireT;','uniform vec3 uColor;','uniform float uHead;','uniform float uReveal;','uniform float uGain;','uniform float uMotion;','uniform float uRepeats;','uniform float uLayer;','void main(){','if(vWireT>uReveal)discard;','float lag=fract((uHead-vWireT)*uRepeats);','float d=abs(fract((vWireT-uHead)*uRepeats+.5)-.5);','float head=exp(-d*d*1550.);','float trail=(1.-smoothstep(0.,.20,lag))*.38;','float signal=(head+trail)*uMotion;','float alpha=clamp((.10+uGain*signal)*uLayer,0.,.96);','gl_FragColor=vec4(uColor*(.7+head*uMotion*1.6),alpha);','}'].join('\n');
function opticalMaterial(shared,layer){return new THREE.ShaderMaterial({uniforms:{...shared,uLayer:{value:layer}},vertexShader:wireVertex,fragmentShader:wireFragment,transparent:true,depthWrite:false,depthTest:true,blending:THREE.AdditiveBlending,toneMapped:false});}
const color=node=>['failed','refused','blocked','needs_revision'].includes(node.status)?0xef9b83:node.active?0xffc27c:node.hero?0xa3d4c1:node.kind==='review'?0xc9a5c7:node.status==='submitted'?0xa8c9af:node.kind==='engine'?0xe3ad77:0xbb855c;
function plate(w,h){const shape=new THREE.Shape(),c=.17;shape.moveTo(-w/2+c,-h/2);shape.lineTo(w/2,-h/2);shape.lineTo(w/2,h/2-c);shape.lineTo(w/2-c,h/2);shape.lineTo(-w/2,h/2);shape.lineTo(-w/2,-h/2+c);shape.closePath();return shape;}
function release(group){group.traverse(item=>{if(item.isInstancedMesh)item.dispose();if(!item.isSprite)item.geometry?.dispose();for(const material of Array.isArray(item.material)?item.material:[item.material])material?.dispose();});group.clear();}
const text=(tag,className,parent)=>{const element=document.createElement(tag);element.className=className;parent?.appendChild(element);return element;};
export function createIonResearchNetwork({board,texture,host,onEntity,onPick,onFocusChat,requestFrame}){
  const root=new THREE.Group(),labels=new THREE.Group(),chips=new THREE.Group(),wires=new THREE.Group(),guides=new THREE.Group(),ambient=new THREE.Group();
  const stationLabels=new THREE.Group(),stationElements=[];
  root.add(chips,wires,guides,ambient);board.add(root,labels,stationLabels);
  const entries=new Map(),connections=new Map();let graph=null,model=null,hovered=null,selectedEntity=null,guideKey='',initialized=false,disposed=false,until=0,liveAllowed=true;
  const panel=text('aside','in-liveWindow',host);panel.hidden=true;panel.setAttribute('role','status');panel.setAttribute('aria-live','polite');
  const panelHead=text('div','in-liveHead',panel),panelDot=text('i','in-liveDot',panelHead),panelTitle=text('strong','',panelHead),panelCode=text('span','in-liveCode',panelHead);
  panelCode.textContent='LIVE / STREAM';panel.setAttribute('aria-live','off');const panelBody=text('div','in-liveBody',panel),panelTape=text('div','in-liveTape',panelBody),panelLine=text('span','in-liveScan',panel);panelLine.setAttribute('aria-hidden','true');
  const ticker=new ResearchTicker();let streamKey='',panelTarget=null,panelCloseAt=0,renderedStream='',oldStreamTarget=null;
  const streamRows=new WeakMap();
  function syncTape(container,className,fresh){
    let state=streamRows.get(container);
    if(!state||state.key!==ticker.key){container.replaceChildren();state={key:ticker.key,rows:new Map(),last:0};streamRows.set(container,state);}
    const wanted=new Set(ticker.lines.map(line=>line.id));
    for(const[id,row]of state.rows)if(!wanted.has(id)){row.remove();state.rows.delete(id);}
    for(const line of ticker.lines){
      let row=state.rows.get(line.id);
      if(!row){row=text(className==='in-streamLine'?'p':'span',className,container);row.dataset.fresh=String(fresh&&line.id>state.last);state.rows.set(line.id,row);}
      else if(row.parentNode!==container)container.appendChild(row);
      row.dataset.source=line.source;row.dataset.signal=/^METIS_ENVIRONMENT=/.test(line.text)?'environment':/^Successfully installed|^No broken requirements found\./.test(line.text)?'complete':'';
      if(row.textContent!==line.text)row.textContent=line.text;
    }
    state.last=ticker.lines.at(-1)?.id||state.last;
  }
  const sample=new THREE.Vector3(),projected=new THREE.Vector3(),worldPoint=new THREE.Vector3();
  function make(node,born,direction){
    const size=networkEntitySize(node),group=new THREE.Group(),shape=plate(size.w,size.h);
    const faceMaterial=new THREE.MeshPhysicalMaterial({color:0x142333,metalness:.26,roughness:.32,clearcoat:.9,clearcoatRoughness:.18,emissive:0x07121e,emissiveIntensity:.18}),sideMaterial=new THREE.MeshStandardMaterial({color:0x866547,metalness:.82,roughness:.29,emissive:0x20160c,emissiveIntensity:.15});
    const housing=new THREE.Mesh(new THREE.ExtrudeGeometry(plate(size.w+.34,size.h+.26),{depth:.19,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.07,bevelThickness:.04}),new THREE.MeshStandardMaterial({color:0x182331,metalness:.82,roughness:.36}));housing.position.z=-size.depth/2-.29;group.add(housing);
    const housingEdge=new THREE.LineSegments(new THREE.EdgesGeometry(housing.geometry,35),new THREE.LineBasicMaterial({color:0x72939f,transparent:true,opacity:.32,fog:false}));housingEdge.position.copy(housing.position);group.add(housingEdge);
    const solid=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:size.depth,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.045,bevelThickness:.04}),[faceMaterial,sideMaterial]);solid.position.z=-size.depth/2;group.add(solid);
    const edge=new THREE.LineSegments(new THREE.EdgesGeometry(solid.geometry,35),new THREE.LineBasicMaterial({color:color(node),transparent:true,opacity:.66,fog:false}));edge.position.z=-size.depth/2;group.add(edge);
    const pins=[];for(let i=0;i<7;i++)for(const side of [-1,1]){const y=(i-3)*.29;pins.push(new THREE.Vector3(side*(size.w/2+.02),y,-.03),new THREE.Vector3(side*(size.w/2+.18),y,-.03));}
    group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pins),new THREE.LineBasicMaterial({color:0xa86f49,transparent:true,opacity:.42,fog:false})));
    const sockets=new THREE.InstancedMesh(new THREE.BoxGeometry(.17,.22,.16),new THREE.MeshStandardMaterial({color:0x9d744c,metalness:.8,roughness:.3}),8),matrix=new THREE.Matrix4();let socket=0;for(const side of [-1,1])for(const y of [-.88,-.57,.57,.88]){matrix.makeTranslation(side*(size.w/2+.14),y,-size.depth/2-.08);sockets.setMatrixAt(socket++,matrix);}group.add(sockets);
    const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,color:color(node),transparent:true,opacity:.04,depthWrite:false,blending:THREE.AdditiveBlending}));glow.scale.set(size.w*1.15,size.h*1.55,1);glow.position.z=-.16;group.add(glow);chips.add(group);
    const wrapper=text('div','in-cardWrap'),element=text('button','in-entity'+(node.kind==='step'?' ion-chip':''),wrapper);element.type='button';element.dataset.networkEntity=node.id;element.dataset.kind=node.kind;
    wrapper.style.width=element.style.width='340px';wrapper.style.height=element.style.height='200px';
    if(node.kind==='step')element.dataset.sceneStep=node.stepId;
    const body=text('span','in-labelBody',element),head=text('span','in-nodeHead',body),kind=text('span','',head),status=text('span','',head),title=text('strong','',body),detail=text('span','in-nodeDetail',body),foot=text('span','in-nodeFoot',body);
    const ornament=text('span','in-cardCircuit',body);ornament.setAttribute('aria-hidden','true');for(let i=0;i<4;i++)text('i','',ornament);
    const detailStatic=text('span','in-detailStatic',detail),cardTape=text('span','in-cardTicker',detail),history=text('span','in-moduleHistory',body),seal=text('span','in-resultSeal',body);history.setAttribute('aria-hidden','true');seal.setAttribute('aria-hidden','true');
    const ports=text('div','in-cardPorts',wrapper);ports.setAttribute('role','group');ports.setAttribute('aria-label','阶段技能与真实交付');
    const stop=event=>event.stopPropagation();ports.addEventListener('pointerdown',stop);let gesture=null;
    element.onpointerdown=event=>{event.stopPropagation();gesture=event.button===0?{x:event.clientX,y:event.clientY,moved:false}:null;if(gesture)element.setPointerCapture(event.pointerId);};
    element.onpointermove=event=>{if(gesture&&Math.hypot(event.clientX-gesture.x,event.clientY-gesture.y)>8)gesture.moved=true;};
    element.onpointerup=event=>{if(element.hasPointerCapture(event.pointerId))element.releasePointerCapture(event.pointerId);};element.onpointercancel=()=>{gesture=null;};
    element.onclick=event=>{if(event.detail&&gesture?.moved){event.preventDefault();return;}selectedEntity=node.id;requestFrame();if(onEntity)onEntity(node.id);else if(node.stepId)onPick?.(node.stepId);else onFocusChat?.();};
    const hold=()=>{const current=entries.get(node.id);if(current&&!current.frozenPose)current.frozenPose={...(current.lastIdlePose||ionIdlePose(0,node.slot,true))};hovered=node.id;requestFrame();};
    const resume=()=>{if(wrapper.matches(':hover,:focus-within'))return;const current=entries.get(node.id);if(current)current.frozenPose=null;if(hovered===node.id)hovered=null;requestFrame();};
    wrapper.onpointerenter=hold;wrapper.onpointerleave=resume;wrapper.onfocusin=hold;wrapper.onfocusout=resume;
    wrapper.style.backfaceVisibility='hidden';
    const label=new CSS3DObject(wrapper);label.scale.set(size.w/340,size.h/200,1);labels.add(label);
    return{node,size,front:new THREE.Vector3(0,0,size.depth/2+.075),group,solid,edge,glow,label,wrapper,element,kind,status,title,detail,detailStatic,cardTape,history,seal,historyKey:'',foot,ports,born,direction,portKey:'',position:new THREE.Vector3(),onScreen:true,signal:null,signalAt:0,origin:null,layoutAt:0,yaw:0,frozenPose:null,lastIdlePose:null};
  }
  function updatePorts(entry){
    const node=entry.node,ports=node.ports||[],signature=JSON.stringify(ports);
    if(signature===entry.portKey)return;entry.portKey=signature;entry.ports.replaceChildren();
    const selected=[...ports.filter(port=>port.kind!=='skill').slice(0,2),...ports.filter(port=>port.kind==='skill').slice(0,2)].slice(0,3);
    for(const port of selected){
      const button=text('button','in-port in-port-'+port.kind,entry.ports);button.type='button';button.textContent=port.title;button.title=port.kind==='artifact'?port.title+' · '+(port.availability==='file'?'打开已登记文件':'文件暂不可预览'):port.title;
      button.disabled=port.kind==='artifact'&&port.availability!=='file';button.setAttribute('aria-label',port.kind==='artifact'?'打开 '+port.title:port.kind==='delivery'?'查看文字交付':'查看技能 '+port.title);
      if(port.kind==='artifact')button.dataset.artifactId=port.id;
      button.onpointerdown=event=>{event.stopPropagation();if(event.button===0)button.setPointerCapture(event.pointerId);};
      button.onpointerup=event=>{if(button.hasPointerCapture(event.pointerId))button.releasePointerCapture(event.pointerId);};
      button.onclick=event=>{event.stopPropagation();if(port.kind==='skill'){if(onEntity)onEntity('step:'+node.stepId);else onPick?.(node.stepId);}else onEntity?.(port.id);};
    }
    if(ports.length>selected.length){const button=text('button','in-port in-port-more',entry.ports);button.type='button';button.textContent='+'+(ports.length-selected.length);button.setAttribute('aria-label','查看本阶段全部技能与交付');button.onclick=()=>onEntity?.('step:'+node.stepId);}
    if(!ports.length){const meta=text('span','in-portMeta',entry.ports);meta.textContent=node.hero?'打开最终交付':node.call?.tool||node.kind==='engine'?'':node.kind==='step'?'阶段设置与交付':node.kind==='artifact'?'已登记文件':'实际执行记录';if(node.call?.tool)meta.textContent=node.call.tool;}
  }
  function wire(edge){
    const a=graph.positions.get(edge.source),b=graph.positions.get(edge.target),points=spatialRoute(a,b,edge.kind).map(point=>new THREE.Vector3(point.x,point.y,point.z));
    const curve=new THREE.CatmullRomCurve3(points,false,'centripetal');
    const shared={uColor:{value:new THREE.Color(RESEARCH_ART.ice)},uHead:{value:0},uReveal:{value:0},uGain:{value:.2},uMotion:{value:1},uRepeats:{value:1},uStartOffset:{value:new THREE.Vector3()},uEndOffset:{value:new THREE.Vector3()}},spaced=curve.getSpacedPoints(48),lineGeometry=new THREE.BufferGeometry().setFromPoints(spaced);lineGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(spaced.flatMap((_,i)=>[i/(spaced.length-1),0]),2));
    const line=new THREE.Line(lineGeometry,opticalMaterial(shared,.42));
    const main=edge.kind==='sequence',conduit=new THREE.Mesh(new THREE.TubeGeometry(curve,48,main?.035:.025,5,false),opticalMaterial(shared,1));
    const halo=new THREE.Mesh(new THREE.TubeGeometry(curve,48,main?.075:.050,4,false),opticalMaterial(shared,.15));
    const runner=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,color:0xffcf91,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));runner.scale.setScalar(.8);runner.visible=false;
    const tail=new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(new Float32Array(36),3)),new THREE.PointsMaterial({color:0xffc58b,size:.045,transparent:true,opacity:.85,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));tail.visible=false;
    wires.add(halo,conduit,line,runner,tail);return{edge,curve,line,conduit,halo,runner,tail,shared,length:curve.getLength(),index:connections.size,signature:JSON.stringify([a,b,edge.kind])};
  }
  function dropWire(entry){for(const object of[entry.line,entry.conduit,entry.halo,entry.runner,entry.tail]){wires.remove(object);if(!object.isSprite)object.geometry?.dispose();object.material.dispose();}}
  function wirePoint(wire,t,out){wire.curve.getPointAt(Math.max(0,Math.min(1,t)),out);const blend=THREE.MathUtils.smoothstep(t,0,1);out.addScaledVector(wire.shared.uStartOffset.value,1-blend).addScaledVector(wire.shared.uEndOffset.value,blend);return out;}
  let radiants=[];
  function decorate(){
    release(guides);release(ambient);radiants=[];for(const element of stationElements)element.remove();stationElements.length=0;stationLabels.clear();
    const points=[];
    for(const station of graph.stations||[]){
      const y=station.stageY-2.75;
      const deck=new THREE.Mesh(new THREE.BoxGeometry(station.width+.25,.12,.48),new THREE.MeshStandardMaterial({color:0x253747,metalness:.78,roughness:.36}));
      deck.position.set(station.x,y,station.z-.4);guides.add(deck);
      const rim=new THREE.LineSegments(new THREE.EdgesGeometry(deck.geometry),new THREE.LineBasicMaterial({color:0x9a7d66,transparent:true,opacity:.14}));rim.position.copy(deck.position);guides.add(rim);
      for(const x of [-station.width/2,station.width/2])points.push(new THREE.Vector3(station.x+x,y,station.z-.3),new THREE.Vector3(station.x+x,y+.5,station.z-.3));
    }
    guides.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0xa17d67,transparent:true,opacity:.21,fog:false})));
    for(let i=0;i<10;i++){
      const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,color:0xeaa86b,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));sprite.scale.setScalar(.65);ambient.add(sprite);radiants.push(sprite);
    }
  }
  function update(value,sourceModel){
    if(disposed)return;graph=value;model=sourceModel||model;
    host.dataset.artDirection=RESEARCH_ART.version;host.dataset.sceneMode=graph.artMode;host.dataset.resultHero=graph.heroId||'';host.dataset.chassisLayers='2';
    host.dataset.networkNodes=String(graph.nodes.length);host.dataset.networkRecords=String(graph.counts.entities);host.dataset.networkCalls=String(graph.counts.calls);host.dataset.networkLayout=RESEARCH_SPACE.version;host.dataset.networkView=graph.presentation.expanded?'stage':'overview';host.dataset.networkColumns=String(graph.layout.columns);host.dataset.networkRows=String(graph.layout.rows);host.dataset.networkDepth=(graph.bounds.maxZ-graph.bounds.minZ).toFixed(2);
    const wanted=new Set(graph.nodes.map(node=>node.id));
    for(const[id,entry]of entries)if(!wanted.has(id)){entry.wrapper.remove();labels.remove(entry.label);chips.remove(entry.group);release(entry.group);entries.delete(id);}
    let added=0;
    for(const node of graph.nodes){
      const p=graph.positions.get(node.id),previous=graph.nodes[node.displaySlot-1],prior=previous&&graph.positions.get(previous.id),direction=prior?{x:Math.sign(p.x-prior.x),y:Math.sign(p.y-prior.y)}:{x:1,y:0};
      let entry=entries.get(node.id);
      if(!entry){const born=performance.now()+(initialized?Math.min(added++,8)*32:Math.min(node.slot,22)*20);entry=make(node,born,direction);entries.set(node.id,entry);until=Math.max(until,born+1000);}
      else{
        const signal=ionStatusSignal(entry.node.status,node.status);if(signal){entry.signal=signal;entry.signalAt=performance.now();entry.element.dataset.signal=signal;until=Math.max(until,entry.signalAt+1150);}
        if(entry.position.distanceToSquared(new THREE.Vector3(p.x,p.y,p.z))>.001){entry.origin=entry.group.position.clone();entry.layoutAt=performance.now();until=Math.max(until,entry.layoutAt+620);}
      }
      entry.node=node;entry.position.set(p.x,p.y,p.z);entry.yaw=p.yaw||0;entry.group.position.copy(entry.position);entry.label.position.copy(entry.position).add(entry.front);
      entry.wrapper.dataset.spaceX=String(p.x);entry.wrapper.dataset.spaceY=String(p.y);entry.wrapper.dataset.spaceZ=String(p.z);entry.element.dataset.spaceLayer=p.layer;entry.element.dataset.spaceLevel=String(p.level);
      entry.element.dataset.parentStepId=node.stepId||'';entry.element.dataset.parentStepTitle=node.ownerTitle||'';entry.element.dataset.childIndex=node.childIndex===undefined?'':String(node.childIndex+1);entry.element.dataset.ownerSource=node.ownerSource||'';
      entry.element.style.setProperty('--in-node','#'+new THREE.Color(color(node)).getHexString());entry.element.dataset.status=node.status;entry.element.dataset.active=String(node.active);entry.element.dataset.viewed=String(!!node.viewed);
      entry.element.dataset.hero=String(!!node.hero);entry.element.dataset.stageNumber=node.kind==='step'?String(node.index+1).padStart(2,'0'):'';
      const historyKey=JSON.stringify(node.recentStatuses||[]);if(historyKey!==entry.historyKey){entry.historyKey=historyKey;entry.history.replaceChildren();for(const item of node.recentStatuses||[]){const mark=text('i','',entry.history);mark.dataset.status=item.status;}}
      entry.seal.textContent=node.hero?(node.kind==='artifact'?node.title.split('.').at(-1).toUpperCase():'TEXT'):'';
      entry.element.style.setProperty('--ion-ambient-delay',(-node.slot*.39).toFixed(2)+'s');
      entry.wrapper.dataset.slot=String(p.slot);entry.wrapper.dataset.row=String(p.row);entry.wrapper.dataset.column=String(p.column);entry.element.setAttribute('aria-label',(node.kind==='step'?'第'+(node.index+1)+'步 ':node.kind==='engine'?'项目总览 ':'实际动作 ')+node.title+' · '+node.statusLabel);
      const childCode=node.ownerIndex===null?'项目整体':String(node.ownerIndex+1).padStart(2,'0')+'.'+String((node.childIndex||0)+1).padStart(2,'0');
      entry.kind.textContent=node.hero?'FINAL / 最终交付':node.kind==='step'?String(node.index+1).padStart(2,'0')+' / 编排大步骤':node.kind==='engine'?'METIS / CONTROL':['artifact','delivery'].includes(node.kind)?'FILE / 交付成果':childCode+' / '+(node.kind==='review'?'核验子动作':'执行子动作');
      entry.status.textContent=node.statusLabel;entry.title.textContent=node.title;entry.detailStatic.textContent=node.hero&&node.kind==='artifact'?(Number.isFinite(node.file?.bytes)?(node.file.bytes/1024).toFixed(1)+' KB · ':'')+'点击打开交付文档':researchCardDetail(node);
      const stage=graph.byId.get('step:'+node.stepId);entry.foot.textContent=node.kind==='step'?node.callCount+' 个子动作 · '+node.artifactCount+' 项登记成果':node.kind==='engine'?graph.counts.stages+' 个大步骤 / '+graph.counts.calls+' 次实际调用':stage?'所属 · 第'+(stage.index+1)+'步 '+stage.title:'所属 · 项目整体（未记录具体步骤）';entry.foot.title=entry.foot.textContent;
      entry.solid.material[0].color.setHex(node.active?0x45352b:node.hero?0x173b3b:node.kind==='step'?0x182735:['artifact','delivery'].includes(node.kind)?0x1b302c:0x142535);entry.edge.material.color.setHex(color(node));entry.glow.material.color.setHex(color(node));updatePorts(entry);
    }
    const edgeIds=new Set(graph.circuitEdges.map(edge=>edge.id));
    for(const[id,entry]of connections)if(!edgeIds.has(id)){dropWire(entry);connections.delete(id);}
    for(const edge of graph.circuitEdges){
      const old=connections.get(edge.id),signature=JSON.stringify([graph.positions.get(edge.source),graph.positions.get(edge.target),edge.kind]);
      if(old&&old.signature!==signature){dropWire(old);connections.delete(edge.id);}
      if(!connections.has(edge.id))connections.set(edge.id,wire(edge));else connections.get(edge.id).edge=edge;
    }
    const nextGuide=JSON.stringify([graph.presentation.expanded,graph.presentation.stageId,(graph.stations||[]).map(station=>[station.id,station.x,station.z,station.stageY])]);
    if(nextGuide!==guideKey){guideKey=nextGuide;decorate();}
    const summary=researchLiveSummary(graph,model);
    if(summary){
      panelTarget=summary.nodeId;panelCloseAt=0;panel.dataset.closing='false';panel.hidden=!liveAllowed;panel.dataset.state=summary.status;const owner=graph.byId.get('step:'+graph.byId.get(summary.nodeId)?.stepId);panelTitle.textContent=(owner?'第'+(owner.index+1)+'步 · '+owner.title+' / ':'项目整体 / ')+summary.title;panelTitle.title=panelTitle.textContent;panel.dataset.parentStepId=owner?.stepId||'';host.dataset.liveWindow=String(liveAllowed);
      const scope=researchStreamScope(summary,model?.live);
      if(scope&&model?.live)ticker.ingest(model.live,scope);
      else if(!model?.live&&summary.key!==streamKey){if(ticker.key!=='summary:'+summary.nodeId)ticker.reset('summary:'+summary.nodeId);for(const line of summary.lines)ticker.append(line+'\n','status');}
      streamKey=summary.key;panelCode.textContent=({stdout:'STDOUT / LIVE',stderr:'STDERR / LIVE',log:'CONSOLE / LIVE',assistant:'MODEL / PUBLIC',receipt:'TOOL / OUTPUT'})[ticker.source]||'LIVE / STATUS';
      if(oldStreamTarget!==panelTarget){const old=entries.get(oldStreamTarget);if(old){old.element.dataset.streaming='false';old.cardTape.replaceChildren();}oldStreamTarget=panelTarget;renderedStream='';}
      const signature=ticker.key+'|'+ticker.revision+'|'+panelTarget;
      if(signature!==renderedStream){
        const fresh=!!renderedStream;renderedStream=signature;const active=entries.get(panelTarget);
        syncTape(panelTape,'in-streamLine',fresh);if(active)syncTape(active.cardTape,'in-cardStreamLine',fresh);
        panel.dataset.update=String(Number(panel.dataset.update||0)+1);until=Math.max(until,performance.now()+700);
      }
    }else{if(panelTarget){panelCloseAt=performance.now()+180;until=Math.max(until,panelCloseAt);panel.dataset.closing='true';}panelTarget=null;streamKey='';host.dataset.liveWindow='false';}
    host.dataset.matrixAdditions=String(added);initialized=true;
  }
  function onScreen(position,camera){
    projected.copy(position);board.localToWorld(projected);projected.project(camera);
    return projected.z>-1&&projected.z<1&&Math.abs(projected.x)<1.3&&Math.abs(projected.y)<1.35;
  }
  function render(time,reduced,camera){
    if(!graph||disposed)return false;
    host.dataset.reducedMotion=String(reduced);const now=performance.now(),busy=!!graph.activeId,processingStep=model?.phase==='processing'?(model.live?.active?.stepId||model.currentStepId):null;
    for(const entry of entries.values()){
      const motion=researchArrival(now-entry.born,entry.direction,reduced),p=entry.position;
      const layout=reduced?1:ionCameraEase((now-entry.layoutAt)/620),x=entry.origin?THREE.MathUtils.lerp(entry.origin.x,p.x,layout):p.x,y=entry.origin?THREE.MathUtils.lerp(entry.origin.y,p.y,layout):p.y,z=entry.origin?THREE.MathUtils.lerp(entry.origin.z,p.z,layout):p.z;if(layout===1)entry.origin=null;
      const idle=reduced?ionIdlePose(time,entry.node.slot,true):entry.frozenPose||ionIdlePose(time,entry.node.slot);entry.lastIdlePose=idle;
      const event=researchEventPose(now-entry.signalAt,entry.signal,reduced),scale=motion.scale*event.scale;
      entry.group.position.set(x+motion.x+idle.x,y+motion.y+idle.y,z+idle.z+event.lift);entry.group.rotation.set(idle.rx,entry.yaw+idle.ry,0);entry.group.scale.set(scale,scale,1);entry.label.position.copy(entry.front).applyQuaternion(entry.group.quaternion).add(entry.group.position);entry.label.rotation.copy(entry.group.rotation);entry.label.scale.set(entry.size.w/340*scale,entry.size.h/200*scale,1);
      if(entry.signal&&now-entry.signalAt>1150){entry.signal=null;delete entry.element.dataset.signal;}
      const contextDim=graph.presentation.expanded&&(['step','engine'].includes(entry.node.kind))&&(entry.node.kind==='engine'?!!graph.presentation.stageId:entry.node.stepId!==graph.presentation.stageId);
      const siblingDim=busy&&entry.node.origin==='activity'&&entry.node.id!==graph.activeId,visible=onScreen(p,camera);entry.onScreen=visible;entry.group.visible=visible;entry.label.visible=visible;entry.wrapper.style.opacity=String(motion.opacity*(contextDim?.24:siblingDim?.64:1));entry.wrapper.dataset.contextHidden='false';entry.wrapper.dataset.contextDim=String(contextDim);entry.element.dataset.lod=contextDim?'context':'detail';
      entry.element.dataset.arriving=String(motion.moving);entry.element.dataset.impact=String(motion.pulse>.1);const linked=entry.node.id===hovered||entry.node.id===selectedEntity||entry.node.viewed;
      entry.element.dataset.streaming=String(entry.node.id===panelTarget&&ticker.lines.length>0);
      const statusGlow=entry.signal==='complete'?Math.max(0,1-(now-entry.signalAt)/1000)*.26:0;
      const ambient=reduced?0:(.5+.5*Math.sin(time*1.3+entry.node.slot*.7));
      const visualActive=entry.node.active||entry.node.kind==='step'&&entry.node.stepId===processingStep&&entry.node.status!=='submitted';entry.element.dataset.active=String(!!visualActive);entry.solid.material[0].emissiveIntensity=visualActive?.34:.18;
      entry.element.dataset.related=String(!!linked);entry.edge.material.opacity=visualActive?.95:entry.node.hero?.9:linked?.78:.42+ambient*.07;entry.glow.material.opacity=visualActive?(reduced?.18:.14+Math.sin(time*2.6)*.025):motion.pulse*.12+statusGlow+event.light*.08+(entry.node.hero?.08:linked?.06:.008+ambient*.006);
    }
    let probe=null,flowing=0,executing=0;
    for(const wire of connections.values()){
      const target=entries.get(wire.edge.target),source=entries.get(wire.edge.source);if(!target||!source)continue;
      const main=wire.edge.kind==='sequence',modelProcessing=main&&target.node.kind==='step'&&target.node.stepId===processingStep&&target.node.status!=='submitted',active=!!target.node.active||modelProcessing,linked=[hovered,selectedEntity].some(id=>id&&(target.node.id===id||source.node.id===id)),done=['submitted','succeeded','passed','recorded'].includes(target.node.status),waiting=target.node.status==='waiting';
      const motion=researchConnectionMotion({time,index:wire.index,length:wire.length,age:now-target.born,signal:target.signal,signalAge:now-target.signalAt,active,waiting,complete:done,highlight:linked,reduced});
      const uniforms=wire.shared;uniforms.uHead.value=motion.progress;uniforms.uReveal.value=motion.reveal;uniforms.uGain.value=motion.gain;uniforms.uMotion.value=reduced?0:1;uniforms.uRepeats.value=motion.repeats;uniforms.uColor.value.setHex(active?RESEARCH_ART.copper:done?RESEARCH_ART.complete:RESEARCH_ART.ice);uniforms.uStartOffset.value.copy(source.group.position).sub(source.position);uniforms.uEndOffset.value.copy(target.group.position).sub(target.position);
      wire.line.geometry.setDrawRange(0,motion.reveal<=0?0:Math.max(2,Math.ceil(wire.line.geometry.attributes.position.count*motion.reveal)));wire.line.visible=wire.conduit.visible=wire.halo.visible=true;wire.runner.visible=!reduced&&motion.reveal>0;wire.tail.visible=wire.runner.visible;
      if(motion.moving)flowing++;if(motion.execution)executing++;
      if(wire.runner.visible){wirePoint(wire,motion.progress,wire.runner.position);wire.runner.material.color.copy(uniforms.uColor.value);wire.runner.material.opacity=motion.gain*.72;wire.runner.scale.setScalar(active?.65:linked?.58:.43);wire.tail.material.color.copy(uniforms.uColor.value);wire.tail.material.opacity=motion.gain*.45;const points=wire.tail.geometry.attributes.position,direction=motion.mode==='receipt'?-1:1;for(let i=0;i<12;i++){wirePoint(wire,motion.progress-direction*i*.014,sample);points.setXYZ(i,sample.x,sample.y,sample.z);}points.needsUpdate=true;}
      if(!probe&&main&&source.node.kind==='step'&&onScreen(wirePoint(wire,.5,sample),camera)){const project=t=>{wirePoint(wire,t,worldPoint);board.localToWorld(worldPoint);worldPoint.project(camera);return{x:(worldPoint.x+1)*host.clientWidth/2,y:(1-worldPoint.y)*host.clientHeight/2};};probe={id:wire.edge.id,mode:motion.mode,progress:motion.progress,length:wire.length,moving:motion.moving,points:[.2,.35,.5,.65,.8].map(project),head:project(motion.progress)};}
    }
    host.__metisConnectionProbe=probe;host.dataset.connectionStyle='optical';host.dataset.flowingConnections=String(flowing);host.dataset.executingConnections=String(executing);
    const anchor=graph.positions.get(graph.activeId)||graph.positions.get(graph.latestId);
    for(let i=0;i<radiants.length;i++){const sprite=radiants[i];sprite.visible=busy&&!reduced&&!!anchor;if(!sprite.visible)continue;const side=i%2?1:-1,progress=(time*.24+i*.17)%1;sprite.position.set(anchor.x+side*progress*6,anchor.y-1.8+(i%3)*.11,anchor.z+(i<5?-1:1)*progress*4);sprite.material.opacity=Math.sin(Math.PI*progress)*.28;}
    if(!panelTarget&&panelCloseAt&&(reduced||now>=panelCloseAt)){panel.hidden=true;panelCloseAt=0;}
    const tapeFrame=ticker.frame(now,reduced);host.dataset.streamLines=String(tapeFrame.totalLines);host.dataset.streamMoving=String(tapeFrame.moving&&!!panelTarget);
    panel.dataset.flow=String(!reduced&&tapeFrame.moving&&!!panelTarget);
    panelTape.style.transform='translate3d(0,'+(-Math.max(0,tapeFrame.position-(host.clientHeight<700?3:6))*18).toFixed(2)+'px,0)';
    if(panelTarget){
      const entry=entries.get(panelTarget);
      if(entry?.onScreen&&liveAllowed){
        worldPoint.set(entry.size.w/2,entry.size.h/2,.3).applyQuaternion(entry.group.quaternion).add(entry.group.position);board.localToWorld(worldPoint);worldPoint.project(camera);
        const width=host.clientWidth,height=host.clientHeight,screenX=(worldPoint.x+1)*width/2,screenY=(-worldPoint.y+1)*height/2,left=Math.max(12,Math.min(width-310,screenX+310<width?screenX+20:screenX-320)),top=Math.max(175,Math.min(height-210,screenY));
        panel.hidden=false;panel.style.transform='translate3d('+Math.round(left)+'px,'+Math.round(Math.max(95,top))+'px,0)';
        panel.dataset.reduced=String(reduced);panel.dataset.compact=String(height<700);panel.style.opacity='.94';entry.cardTape.style.transform='translate3d(0,'+(-Math.max(0,tapeFrame.position-2)*18).toFixed(2)+'px,0)';
      }else panel.hidden=true;
    }
    host.dataset.networkLod=camera.position.distanceTo(board.position)>42?'map':'detail';
    return !reduced&&(busy||now<until||tapeFrame.moving&&!!panelTarget);
  }
  function position(id){const resolved=entries.has(id)?id:entries.has('step:'+id)?'step:'+id:graph?.byId.get(id)?.stepId?'step:'+graph.byId.get(id).stepId:null;return resolved?graph?.positions.get(resolved):null;}
  function focusFrame(id){let entry=entries.get(id)||entries.get('step:'+id);if(entry?.node.origin==='activity')entry=entries.get(entry.node.stepId?'step:'+entry.node.stepId:'engine');if(!entry||!['step','engine'].includes(entry.node.kind)||!graph.presentation.expanded||entry.node.stepId!==graph.presentation.stageId)return null;const children=graph.nodes.filter(node=>node.origin==='activity'&&node.stepId===entry.node.stepId),family=[{p:graph.positions.get(entry.node.id),size:networkEntitySize(entry.node)}];if(children.length)for(let index=0;index<RESEARCH_SPACE.visibleCalls;index++)family.push({p:researchChildPosition(graph.positions.get(entry.node.id),index),size:networkEntitySize({kind:'call'})});const box=new THREE.Box3();for(const {p,size}of family){box.expandByPoint(new THREE.Vector3(p.x-size.w/2-.8,p.y-size.h/2-.6,p.z-.3));box.expandByPoint(new THREE.Vector3(p.x+size.w/2+.8,p.y+size.h/2+.6,p.z+.8));}const center=box.getCenter(new THREE.Vector3()),span=box.getSize(new THREE.Vector3());return{x:center.x,y:center.y,z:center.z,w:Math.max(10,span.x+2),h:Math.max(6,span.y+2),bounds:{minX:box.min.x,maxX:box.max.x,minY:box.min.y,maxY:box.max.y,minZ:box.min.z,maxZ:box.max.z}};}
  function scope(id){const node=graph?.byId.get(entries.has(id)?id:entries.has('step:'+id)?'step:'+id:id);return node?node.stepId||'__project__':null;}
  return{update,render,bounds:()=>graph?.bounds,position,focusFrame,scope,followKey:id=>researchFollowKey(graph,id),preview:id=>{hovered=id&&entries.has(id)?id:null;requestFrame();},size:id=>(entries.get(id)||entries.get('step:'+id))?.size||networkEntitySize(),latest:()=>graph?.latestId,active:()=>graph?.activeId,has:id=>!!position(id),focus:id=>{selectedEntity=entries.has(id)?id:'step:'+id;requestFrame();},showLive:value=>{liveAllowed=!!value;if(!liveAllowed)panel.hidden=true;host.dataset.liveWindow=String(liveAllowed&&!!panelTarget);requestFrame();},animating:()=>performance.now()<until,
    dispose(){if(disposed)return;disposed=true;panel.remove();for(const entry of entries.values())entry.wrapper.remove();for(const element of stationElements)element.remove();release(root);labels.clear();stationLabels.clear();board.remove(root,labels,stationLabels);entries.clear();connections.clear();radiants=[];delete host.__metisConnectionProbe;for(const key of['connectionStyle','flowingConnections','executingConnections','artDirection','sceneMode','resultHero','chassisLayers','networkNodes','networkRecords','networkCalls','networkColumns','networkRows','networkLayout','networkDepth','liveWindow','matrixAdditions','networkLod','reducedMotion','streamLines','streamMoving','followTarget','followMode','cameraDistance'])delete host.dataset[key];}};
}

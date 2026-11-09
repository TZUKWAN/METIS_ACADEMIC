/** Original ion research network: actual objects and receipts, free spatial layout. */
import * as THREE from 'three';
import {CSS3DObject} from 'three/addons/renderers/CSS3DRenderer.js';
import {networkEntitySize,networkKinds} from './research-network.js';
const palette={engine:0xffc18c,step:0xeeaa75,objective:0xbcb4d7,instruction:0xc2a5dc,requirement:0xbba8c5,constraint:0xe6a193,gate:0xe6c580,skill:0x96c9c6,call:0xffad6e,review:0xc5a0ed,material:0x80c9c7,operation:0xb6a5ce,result:0xb1c6b6,artifact:0x8bd9b8,delivery:0x99d9ba,output:0xc3a1e5};
const tint=node=>['failed','refused','needs_revision'].includes(node.status)?0xf39b86:node.active?0xffcd8c:palette[node.kind]||0xd3a17e;
function plateShape(w,h){const shape=new THREE.Shape(),cut=.16;shape.moveTo(-w/2+cut,-h/2);shape.lineTo(w/2,-h/2);shape.lineTo(w/2,h/2-cut);shape.lineTo(w/2-cut,h/2);shape.lineTo(-w/2,h/2);shape.lineTo(-w/2,-h/2+cut);shape.closePath();return shape;}
function cleanGroup(group){group.traverse(object=>{object.geometry?.dispose();for(const material of Array.isArray(object.material)?object.material:[object.material])material?.dispose();});group.clear();}
export function createIonResearchNetwork({board,texture,host,onEntity,onPick,onFocusChat,requestFrame}){
  const root=new THREE.Group(),labels=new THREE.Group(),wires=new THREE.Group(),chips=new THREE.Group(),guides=new THREE.Group();root.add(chips,wires,guides);board.add(root,labels);
  const entries=new Map();let graph=null,connections=[],hovered=null,selectedEntity=null,revealUntil=0,topology='',disposed=false;
  function make(node){
    const major=['step','engine'].includes(node.kind),size=networkEntitySize(node),group=new THREE.Group(),shape=plateShape(size.w,size.h);
    const solid=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:major?.12:.07,bevelEnabled:false}),new THREE.MeshBasicMaterial({color:major?0x24151e:0x14141c}));solid.position.z=-.07;group.add(solid);
    const edge=new THREE.LineSegments(new THREE.EdgesGeometry(solid.geometry),new THREE.LineBasicMaterial({color:tint(node),transparent:true,opacity:.65}));edge.position.z=-.07;group.add(edge);
    if(major){const points=[];for(let i=0;i<8;i++)for(const side of [-1,1]){const y=(i-3.5)*size.h/9;points.push(new THREE.Vector3(side*(size.w/2+.03),y,0),new THREE.Vector3(side*(size.w/2+.23),y,0));}group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0xc38a59,transparent:true,opacity:.55})));}
    const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,color:tint(node),transparent:true,opacity:.08,depthWrite:false,blending:THREE.AdditiveBlending}));glow.scale.set(size.w*1.3,size.h*1.6,1);glow.position.z=-.12;group.add(glow);chips.add(group);
    const element=document.createElement('button');element.type='button';element.className='in-entity'+(node.kind==='step'?' ion-chip':node.kind==='engine'?' ion-engine':'');element.dataset.networkEntity=node.id;element.dataset.kind=node.kind;
    if(node.kind==='step')element.dataset.sceneStep=node.stepId;
    const body=document.createElement('span');body.className='in-labelBody';const head=document.createElement('span');head.className='in-nodeHead';const kind=document.createElement('span'),status=document.createElement('span');head.append(kind,status);const title=document.createElement('strong'),detail=document.createElement('span'),foot=document.createElement('span');detail.className='in-nodeDetail';foot.className='in-nodeFoot';body.append(head,title,detail,foot);element.append(body);
    element.addEventListener('pointerdown',event=>event.stopPropagation());element.onclick=()=>{selectedEntity=node.id;requestFrame();if(onEntity)onEntity(node.id);else if(node.stepId)onPick?.(node.stepId);else onFocusChat?.();};
    element.onpointerenter=()=>{hovered=node.id;requestFrame();};element.onpointerleave=()=>{hovered=null;requestFrame();};element.onfocus=()=>{hovered=node.id;requestFrame();};element.onblur=()=>{hovered=null;requestFrame();};
    const label=new CSS3DObject(element);label.scale.setScalar(.014);labels.add(label);return{node,group,solid,edge,glow,label,element,kind,status,title,detail,foot,born:performance.now()};
  }
  function wire(edge){
    const source=graph.positions.get(edge.source),target=graph.positions.get(edge.target),a=graph.byId.get(edge.source),b=graph.byId.get(edge.target),as=networkEntitySize(a),bs=networkEntitySize(b),delta=new THREE.Vector3(target.x-source.x,target.y-source.y,0),horizontal=Math.abs(delta.x)>Math.abs(delta.y),direction=(horizontal?delta.x:delta.y)>=0?1:-1;
    const start=new THREE.Vector3(source.x+(horizontal?direction*as.w/2:0),source.y+(horizontal?0:direction*as.h/2),.015),end=new THREE.Vector3(target.x-(horizontal?direction*bs.w/2:0),target.y-(horizontal?0:direction*bs.h/2),.015),mid=start.clone().lerp(end,.5);
    const points=horizontal?[start,new THREE.Vector3(mid.x-.15*direction,start.y,.015),new THREE.Vector3(mid.x+.15*direction,end.y,.015),end]:[start,new THREE.Vector3(start.x,mid.y-.15*direction,.015),new THREE.Vector3(end.x,mid.y+.15*direction,.015),end];
    const curve=new THREE.CatmullRomCurve3(points,false,'centripetal'),line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)),new THREE.LineBasicMaterial({color:edge.kind==='sequence'?0xd9965c:tint(b),transparent:true,opacity:edge.kind==='sequence'?.68:.3}));
    const runner=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,color:tint(b),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));runner.scale.setScalar(.85);runner.visible=false;
    const tail=new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(new Float32Array(36),3)),new THREE.PointsMaterial({color:tint(b),size:.04,transparent:true,opacity:.8,depthWrite:false,blending:THREE.AdditiveBlending}));tail.visible=false;
    const junctions=new THREE.Points(new THREE.BufferGeometry().setFromPoints([start,curve.getPoint(.5),end]),new THREE.PointsMaterial({color:tint(b),size:edge.kind==='sequence'?.085:.055,transparent:true,opacity:.7}));wires.add(line,runner,tail,junctions);return{edge,line,curve,runner,tail};
  }
  function decorate(){
    cleanGroup(guides);const b=graph.bounds,pad=1.7,points=[];
    for(const [x,y,sx,sy] of [[b.minX-pad,b.minY-pad,1,1],[b.maxX+pad,b.minY-pad,-1,1],[b.maxX+pad,b.maxY+pad,-1,-1],[b.minX-pad,b.maxY+pad,1,-1]]){points.push(new THREE.Vector3(x,y+sy*1.4,-.12),new THREE.Vector3(x,y,-.12),new THREE.Vector3(x,y,-.12),new THREE.Vector3(x+sx*2,y,-.12));}
    guides.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0xaa6946,transparent:true,opacity:.45})));
    for(const node of graph.nodes.filter(node=>node.kind==='step')){const p=graph.positions.get(node.id);const geometry=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(p.x-2.5,p.y-1.5,-.1),new THREE.Vector3(p.x-2.5,p.y-1.9,-.1),new THREE.Vector3(p.x+1.8,p.y-1.9,-.1)]);guides.add(new THREE.Line(geometry,new THREE.LineBasicMaterial({color:0x77503e,transparent:true,opacity:.45})));}
  }
  function update(value){
    graph=value;host.dataset.networkNodes=String(graph.nodes.length);host.dataset.networkCalls=String(graph.counts.calls);const wanted=new Set(graph.nodes.map(node=>node.id));
    for(const [id,entry] of entries)if(!wanted.has(id)){entry.element.remove();labels.remove(entry.label);chips.remove(entry.group);cleanGroup(entry.group);entries.delete(id);}
    for(const node of graph.nodes){
      let entry=entries.get(node.id);if(!entry){entry=make(node);entries.set(node.id,entry);revealUntil=performance.now()+650;}
      entry.node=node;const p=graph.positions.get(node.id);entry.group.position.set(p.x,p.y,p.z);entry.label.position.set(p.x,p.y,p.z+.14);
      const color='#'+new THREE.Color(tint(node)).getHexString();entry.element.style.setProperty('--in-node',color);entry.element.dataset.status=node.status||'';entry.element.dataset.active=String(node.active);entry.element.dataset.viewed=String(node.viewed===true||selectedEntity===node.id);entry.element.setAttribute('aria-label',(networkKinds[node.kind]||node.kind)+' · '+node.title+' · '+node.statusLabel);
      entry.kind.textContent=node.kind==='step'?String(node.index+1).padStart(2,'0')+' / 研究阶段':node.kind==='engine'?'METIS / RESEARCH CORE':networkKinds[node.kind];entry.status.textContent=node.statusLabel;entry.title.textContent=node.title;entry.detail.textContent=node.kind==='engine'?graph.counts.stages+' 个阶段 · '+graph.counts.entities+' 个网络节点':node.detail;
      entry.foot.textContent=node.kind==='step'?'打开阶段 · 查看目标与交付':node.kind==='artifact'?node.availability==='file'?'点击预览实际文件':'已登记 · 当前文件不可预览':node.origin==='configuration'?'流程设置 · 尚非执行记录':node.kind==='engine'?graph.counts.calls+' 次实际调用 · '+graph.counts.artifacts+' 项交付':node.status==='refused'?'调用被拒绝 · 未执行工具正文':node.origin==='activity'?node.label||node.call?.tool||'来自实际调用记录':'来自本项目交付记录';entry.edge.material.color.setHex(tint(node));entry.glow.material.color.setHex(tint(node));
    }
    const key=JSON.stringify([graph.nodes.map(node=>[node.id,graph.positions.get(node.id)]),graph.edges.map(edge=>[edge.id,edge.active])]);
    if(key!==topology){topology=key;cleanGroup(wires);connections=graph.edges.map(wire);decorate();}
  }
  const sample=new THREE.Vector3();
  function render(time,reduced,camera){
    const linked=new Set([hovered,selectedEntity,...graph.nodes.filter(node=>node.viewed).map(node=>node.id)].filter(Boolean));
    for(const relation of graph.edges)if(relation.source===hovered||relation.target===hovered){linked.add(relation.source);linked.add(relation.target);}
    host.dataset.networkLod=camera.position.distanceTo(new THREE.Vector3())>40?'map':'detail';
    for(const entry of entries.values()){
      const node=entry.node,emphasis=linked.has(node.id);entry.element.dataset.related=String(emphasis);entry.edge.material.opacity=node.active?.95:emphasis?.9:.45;entry.glow.material.opacity=node.active?(reduced?.35:.23+Math.sin(time*3)*.08):emphasis?.16:.035;
    }
    for(let i=0;i<connections.length;i++){
      const entry=connections[i],active=entry.edge.active,emphasis=linked.has(entry.edge.source)&&linked.has(entry.edge.target);entry.line.material.opacity=active?.95:emphasis?.9:entry.edge.kind==='sequence'?.8:.42;entry.runner.visible=active;entry.tail.visible=active&&!reduced;
      if(active){const progress=reduced?.5:(time*.3+i*.113)%1;entry.runner.position.copy(entry.curve.getPoint(progress));const points=entry.tail.geometry.attributes.position;for(let n=0;n<12;n++){entry.curve.getPoint(Math.max(0,progress-n*.012),sample);points.setXYZ(n,sample.x,sample.y,sample.z);}points.needsUpdate=true;}
    }
    return !reduced&&(graph.nodes.some(node=>node.active)||performance.now()<revealUntil);
  }
  return{update,render,bounds:()=>graph?.bounds,position:id=>graph?.positions.get(entries.has(id)?id:'step:'+id),has:id=>entries.has(id)||entries.has('step:'+id),focus:id=>{selectedEntity=entries.has(id)?id:'step:'+id;requestFrame();},dispose(){if(disposed)return;disposed=true;for(const entry of entries.values())entry.element.remove();cleanGroup(root);labels.clear();board.remove(root,labels);entries.clear();connections=[];}};
}

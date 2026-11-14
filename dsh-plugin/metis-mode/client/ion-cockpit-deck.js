/** A shared, physical navigation chassis supporting the actual workflow. */
import * as THREE from 'three';
import {researchOverviewBounds} from './research-cockpit.js';
const contour=(w,h,c)=>[[-w/2+c,-h/2],[w/2-c,-h/2],[w/2,-h/2+c],[w/2,h/2-c],[w/2-c,h/2],[-w/2+c,h/2],[-w/2,h/2-c],[-w/2,-h/2+c]];
export function createIonCockpitDeck(graph){
 const bounds=researchOverviewBounds(graph),group=new THREE.Group();if(!bounds)return{group,render(){}};
 const w=bounds.maxX-bounds.minX,h=bounds.maxY-bounds.minY,c=Math.min(1.3,w*.08,h*.12),outer=contour(w,h,c),inner=contour(w-.65,h-.65,Math.max(.15,c-.2)),shape=new THREE.Shape(outer.map(p=>new THREE.Vector2(...p))),hole=new THREE.Path(inner.map(p=>new THREE.Vector2(...p)));shape.holes.push(hole);
 const frame=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.24,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.055,bevelThickness:.04}),new THREE.MeshBasicMaterial({color:0x294a60,transparent:true,opacity:.78}));group.add(frame);
 const glass=new THREE.Mesh(new THREE.ShapeGeometry(new THREE.Shape(inner.map(p=>new THREE.Vector2(...p)))),new THREE.MeshBasicMaterial({color:0x081d2d,transparent:true,opacity:.40,depthWrite:false,side:THREE.DoubleSide,fog:false}));glass.position.z=-.1;group.add(glass);
 const points=[...outer,outer[0]].map(p=>new THREE.Vector3(p[0],p[1],.3)),geometry=new THREE.BufferGeometry().setFromPoints(points);geometry.setAttribute('uv',new THREE.Float32BufferAttribute(points.flatMap((p,i)=>[i/(points.length-1),0]),2));
 const optical=new THREE.ShaderMaterial({uniforms:{uClock:{value:0},uMotion:{value:1}},vertexShader:'varying float vT;void main(){vT=uv.x;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'precision highp float;varying float vT;uniform float uClock;uniform float uMotion;void main(){float head=exp(-pow(abs(fract(vT-uClock*.055+.5)-.5)*40.,2.))*uMotion;vec3 c=mix(vec3(.24,.52,.67),vec3(.93,.76,.49),head);gl_FragColor=vec4(c,.28+head*.65);}',transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false});group.add(new THREE.Line(geometry,optical));
 const trim=[];for(const side of[-1,1])for(let i=0;i<12;i++){const y=-h/2+.9+i*(h-1.8)/11,x=side*(w/2-.08);trim.push(new THREE.Vector3(x,y,.32),new THREE.Vector3(x-side*(i%3===0?.32:.16),y,.32));}
 group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(trim),new THREE.LineBasicMaterial({color:0x9abdc9,transparent:true,opacity:.32,fog:false})));
 const corners=outer.filter((_,i)=>i%2===0);for(const [x,y]of corners){const pin=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.045,8),new THREE.MeshBasicMaterial({color:0xaec3c5}));pin.rotation.x=Math.PI/2;pin.position.set(x,y,.32);group.add(pin);}
 group.position.set((bounds.minX+bounds.maxX)/2,(bounds.minY+bounds.maxY)/2,bounds.minZ+.25);
 const stages=graph.nodes.filter(node=>node.kind==='step'),indicators=[];
 for(const stage of stages){const p=graph.positions.get(stage.id),light=new THREE.Mesh(new THREE.BoxGeometry(.7,.055,.06),new THREE.MeshBasicMaterial({color:stage.active?0xf4be7d:stage.status==='submitted'?0x9bc8ba:0x759eae,transparent:true,opacity:.75}));light.position.set(p.x-group.position.x,p.y-2.55-group.position.y,p.z-group.position.z-.15);group.add(light);indicators.push({light,active:stage.active,index:stage.index});}
 return{group,render(time,reduced){optical.uniforms.uClock.value=reduced?0:time;optical.uniforms.uMotion.value=reduced?0:1;for(const {light,active,index}of indicators)light.material.opacity=active&&!reduced?.65+Math.sin(time*2.2+index)*.2:.65;}};
}

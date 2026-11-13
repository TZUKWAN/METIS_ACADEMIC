/** Full-viewport circuit field. Camera rays retain world-space detail without a board edge. */
import * as THREE from 'three';
import {ionActivity} from './ion-art-direction.js';
const vertex=[
 'varying vec2 vUv;',
 'void main(){',
 'vUv=position.xy*.5+.5;',
 'gl_Position=vec4(position.xy,.999,1.0);',
 '}'
].join('\n');
const fragment=[
 'precision highp float;',
 'varying vec2 vUv;',
 'uniform mat4 uClipToBoard;',
 'uniform float uAspect;',
 'uniform float uSpatial;',
 'uniform float uTime;',
 'uniform float uActivity;',
 'uniform vec2 uPointer;',
 'uniform vec2 uFocus;',
 'uniform vec2 uPulse;',
 'uniform float uPulseAge;',
 'float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
 // Fade unresolved detail rather than turning every sub-pixel line fully on.
 'float rule(float distance,float width){float footprint=fwidth(distance);return (1.0-smoothstep(width,width+max(footprint,.001),distance))*(1.0-smoothstep(.08,.35,footprint));}',
 'void main(){',
 'vec2 ndc=vUv*2.-1.;',
 'vec4 near4=uClipToBoard*vec4(ndc,-1.,1.);',
 'vec4 far4=uClipToBoard*vec4(ndc,1.,1.);',
 'vec3 origin=near4.xyz/near4.w;',
 'vec3 ray=far4.xyz/far4.w-origin;',
 'float axis=mix(ray.z,ray.y,uSpatial);',
 'float denominator=(axis<0.?-1.:1.)*max(abs(axis),.0001);',
 'float rayT=clamp((mix(-.19,-3.8,uSpatial)-mix(origin.z,origin.y,uSpatial))/denominator,-2000.,2000.);',
 'vec3 hit=origin+ray*rayT;',
 'vec2 p=clamp(mix(hit.xy,hit.xz,uSpatial),vec2(-4000.),vec2(4000.));',
 'vec2 screen=(vUv-.5)*vec2(uAspect,1.);',
 'vec2 q=p/mix(4.6,8.0,uSpatial);',
 'float groundFade=1.0-smoothstep(.12,.75,max(length(dFdx(p)),length(dFdy(p))));',
 'vec2 tile=floor(q),cell=fract(q);',
 'float h=hash21(tile);',
 'float gridFine=rule(min(abs(fract(p.x/.65)-.5),abs(fract(p.y/.65)-.5)),.006);',
 'float gridMajor=rule(min(abs(fract(q.x)-.5),abs(fract(q.y)-.5)),.0028);',
 'float routeY=.22+floor(h*3.0)*.17;',
 'float horizontal=rule(abs(cell.y-routeY),.0019)*step(.12,cell.x)*step(cell.x,.82);',
 'float vertical=rule(abs(cell.x-.82),.0019)*step(routeY,cell.y)*step(cell.y,routeY+.12);',
 'float diagonal=rule(abs((cell.x-.82)+(cell.y-routeY-.12)),.0027)*step(.65,cell.x)*step(cell.x,.82)*step(routeY+.12,cell.y)*step(cell.y,routeY+.29);',
 'float etch=max(horizontal,max(vertical,diagonal));',
 'float via=rule(abs(length(cell-vec2(.12,routeY))-.010),.002);',
 'float bus=rule(abs(fract((p.x+.08)/6.6)-.5),.0017)+rule(abs(fract((p.x-.08)/6.6)-.5),.00065);',
 'float scan=pow(max(0.,1.-abs(fract((p.y+p.x*.22)*.031-uTime*.19)-.5)*2.),12.);',
 'float flux=pow(max(0.,1.-abs(fract(p.x*.055-p.y*.016-uTime*.28)-.5)*2.),18.);',
 'float pathFlow=pow(max(0.,1.-abs(fract(cell.x-h-uTime*.65)-.5)*2.),7.)*horizontal;',
 'float sweep=exp(-pow((vUv.x+vUv.y*.32-fract(uTime*.095)*1.75+.25)*6.,2.));',
 'vec2 focusDelta=(p-uFocus-uPointer*1.3)*vec2(.9,1.35);',
 'float halo=exp(-dot(focusDelta,focusDelta)*.009);',
 'vec2 drift=vec2(sin(uTime*.24)*.12,cos(uTime*.19)*.09);',
 'float violet=exp(-dot(screen-vec2(.4,-.22)-drift,screen-vec2(.4,-.22)-drift)*2.3);',
 'float warm=exp(-dot(screen-vec2(-.55,.22)+drift,screen-vec2(-.55,.22)+drift)*3.2);',
 'float pulseDistance=abs(p.x-uPulse.x)+abs(p.y-uPulse.y)*1.35;',
 'float pulse=rule(abs(pulseDistance-uPulseAge*9.),.075)*exp(-uPulseAge*1.12)*step(0.,uPulseAge);',
 'float grain=hash21(floor(gl_FragCoord.xy))-.5;',
 'float restraint=mix(1.0,.16,uSpatial)*groundFade;',
 'vec3 base=mix(vec3(.024,.026,.043),vec3(.012,.016,.027),uSpatial);',
 'base+=(vec3(.013,.010,.031)*violet+vec3(.035,.015,.006)*warm)*mix(1.,.42,uSpatial);',
 'float lightSheet=exp(-abs(screen.x*.62+screen.y+.12-sin(uTime*.08)*.025)*11.);',
 'float warmSheet=exp(-abs(screen.x*.72+screen.y-.43)*23.);',
 'base+=(vec3(.007,.017,.025)*lightSheet+vec3(.016,.010,.004)*warmSheet)*uSpatial;',
 'base+=(vec3(.027,.020,.026)*gridFine*.20+vec3(.071,.040,.033)*gridMajor)*restraint;',
 'vec3 copper=vec3(.42,.20,.105);',
 'base+=copper*(etch*.24+via*.32+bus*.085)*restraint;',
 'base+=copper*(scan*.9+flux*.42)*(etch+bus*.6)*(.7+uActivity*.55)*restraint;',
 'base+=vec3(.65,.38,.17)*pathFlow*(.7+uActivity*.3)*restraint;',
 'base+=vec3(.028,.016,.012)*sweep*mix(1.,.28,uSpatial);',
 'base+=vec3(.19,.095,.040)*halo*(.045+uActivity*.065)*mix(1.,.3,uSpatial);',
 'base+=vec3(.30,.15,.075)*pulse*(.08+etch*.9+bus*.32)*restraint;',
 'base+=grain*mix(.002,.0005,uSpatial);',
 'gl_FragColor=vec4(base,1.);',
 '}'
].join('\n');
export function createIonAtmosphere({scene,board,host}){
  const uniforms={uClipToBoard:{value:new THREE.Matrix4()},uAspect:{value:1},uSpatial:{value:0},uTime:{value:0},uActivity:{value:.08},uPointer:{value:new THREE.Vector2()},uFocus:{value:new THREE.Vector2()},uPulse:{value:new THREE.Vector2()},uPulseAge:{value:100}};
  const geometry=new THREE.PlaneGeometry(2,2),material=new THREE.ShaderMaterial({uniforms,vertexShader:vertex,fragmentShader:fragment,depthWrite:false,depthTest:false,toneMapped:false});
  const mesh=new THREE.Mesh(geometry,material);mesh.frustumCulled=false;mesh.renderOrder=-10000;scene.add(mesh);
  const boardInverse=new THREE.Matrix4();
  let activity=.08,target=.08,pulseAt=-100,disposed=false;
  host.dataset.atmosphere='viewport-circuit-v4';
  return{
    update(model,point){target=ionActivity(model);uniforms.uSpatial.value=model?.kind==='project'?1:0;if(point)uniforms.uFocus.value.set(point.x,uniforms.uSpatial.value?point.z:point.y);},
    pointer(value){uniforms.uPointer.value.set(value.x,value.y);},
    pulse(point,time){if(!point)return;uniforms.uPulse.value.set(point.x,uniforms.uSpatial.value?point.z:point.y);pulseAt=time;host.dataset.atmosphereImpulse=String(Number(host.dataset.atmosphereImpulse||0)+1);},
    render(time,delta,reduced,camera){if(disposed)return;activity+=(target-activity)*Math.min(1,delta*3);uniforms.uActivity.value=activity;uniforms.uTime.value=reduced?0:time;uniforms.uPulseAge.value=reduced?100:time-pulseAt;uniforms.uAspect.value=camera.aspect;uniforms.uClipToBoard.value.copy(boardInverse.copy(board.matrixWorld).invert()).multiply(camera.matrixWorld).multiply(camera.projectionMatrixInverse);host.dataset.ambientMotion=String(!reduced);},
    dispose(){if(disposed)return;disposed=true;scene.remove(mesh);geometry.dispose();material.dispose();delete host.dataset.atmosphere;delete host.dataset.atmosphereImpulse;delete host.dataset.ambientMotion;}
  };
}

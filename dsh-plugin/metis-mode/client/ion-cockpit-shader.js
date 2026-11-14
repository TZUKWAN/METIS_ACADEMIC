/** Original procedural deep-space glass; decorative light never denotes progress. */
export const cockpitSkyShader=`
float flightNoise(vec2 p){
 vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),f.x),mix(hash21(i+vec2(0.,1.)),hash21(i+1.),f.x),f.y);
}
float flightCloud(vec2 p){
 float v=0.,a=.5;
 for(int i=0;i<4;i++){v+=a*flightNoise(p);p=mat2(.8,-.6,.6,.8)*p*2.07+vec2(11.7,4.2);a*=.5;}
 return v;
}
vec3 cockpitSky(vec2 uv,vec2 pointer,float clock,float aspect,vec2 heading){
 vec2 screen=(uv-.5)*vec2(aspect,1.);
 vec2 space=screen+pointer*.012+heading*.12;
 float cloud=flightCloud(space*2.7+vec2(clock*.009,-clock*.004));
 float filament=exp(-pow((space.y+.26*space.x-.12+sin(space.x*2.3)*.075)*3.7,2.));
 vec3 sky=vec3(.004,.009,.018)+vec3(.008,.026,.043)*cloud;
 sky+=vec3(.014,.038,.054)*filament*cloud;
 sky+=vec3(.032,.019,.009)*pow(flightCloud(space*3.1+vec2(5.4,clock*.005)),2.);
 for(int i=0;i<3;i++){
  float layer=float(i),scale=68.+layer*67.;
  vec2 sp=space*scale/(1.+mod(clock*.0025,1.)*(.018+layer*.012))+vec2(clock*.014*(layer+1.),0.);
  vec2 cell=floor(sp),d=fract(sp)-.5;
  float seed=hash21(cell+layer*83.);
  d-=vec2(hash21(cell+19.),hash21(cell+37.))*.34-.17;
  float present=step(uResolution.x<700.?.9994:.9968,seed);
  float star=(exp(-dot(d,d)*1500.)+exp(-dot(d,d)*70.)*.055)*present;
  float twinkle=.84+.16*sin(clock*.55+seed*237.);
  sky+=mix(vec3(.38,.62,.83),vec3(.95,.78,.55),hash21(cell+8.))*star*twinkle*(1.7-layer*.32);
 }
 vec2 lens=(screen-vec2(.10,.22))*vec2(.94,2.9);
 float radius=length(lens),angle=atan(lens.y,lens.x),dust=flightCloud(vec2(angle*4.+clock*.013,radius*19.));
 float arc=exp(-abs(radius-.47)*42.)*smoothstep(-.08,.11,screen.y-.22);
 float filamentArc=exp(-abs(radius-.468-sin(angle*19.+clock*.025)*.0014)*230.)*smoothstep(-.08,.12,screen.y-.22);
 float ribbon=exp(-abs(screen.y-.22+.017*sin(screen.x*7.))*110.)*exp(-pow(screen.x*.7,2.));
 sky+=vec3(.17,.13,.08)*arc*(.35+dust*.65);
 sky+=vec3(.29,.23,.14)*filamentArc*(.3+flightNoise(vec2(angle*72.+clock*.06,radius*83.))*.7);
 sky+=vec3(.11,.17,.21)*ribbon*(.35+dust*.55);
 float horizon=exp(-pow((screen.y+.31)*24.,2.));
 sky+=vec3(.012,.039,.052)*horizon;
 sky*=1.-smoothstep(.20,1.25,length(screen*vec2(.58,1.)))*.62;
 return sky;
}`;

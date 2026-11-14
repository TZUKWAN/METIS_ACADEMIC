var ki={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Hi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},mu=0,Nc=1,gu=2;var $r=1,_u=2,Hs=3,Vi=0,mn=1,gn=2,Mi=0,Vs=1,$t=2,Uc=3,Fc=4,xu=5;var ns=100,vu=101,yu=102,Mu=103,Su=104,bu=200,Eu=201,Tu=202,wu=203,Oc=204,Bc=205,Au=206,Ru=207,Cu=208,Iu=209,Pu=210,Lu=211,Du=212,Nu=213,Uu=214,ro=0,ao=1,oo=2,Rs=3,lo=4,co=5,ho=6,uo=7,zc=0,Fu=1,Ou=2,ii=0,jr=1,Qr=2,ea=3,is=4,ta=5,na=6,ia=7;var kc=300,ss=301,Gs=302,Ho=303,Vo=304,fo=1e3,jn=1001,po=1002,Zt=1003,Bu=1004;var sa=1005;var dn=1006,Go=1007;var Si=1008;var _n=1009,Hc=1010,Vc=1011,Ws=1012,Wo=1013,qn=1014,Un=1015,jt=1016,Xo=1017,Yo=1018,rs=1020,Gc=35902,Wc=35899,Xc=1021,Yc=1022,Zn=1023,gi=1026,bi=1027,qo=1028,Zo=1029,Gi=1030,Ko=1031;var Jo=1033,ra=33776,aa=33777,oa=33778,la=33779,$o=35840,jo=35841,Qo=35842,el=35843,tl=36196,nl=37492,il=37496,sl=37488,rl=37489,ca=37490,al=37491,ol=37808,ll=37809,cl=37810,hl=37811,ul=37812,dl=37813,fl=37814,pl=37815,ml=37816,gl=37817,_l=37818,xl=37819,vl=37820,yl=37821,Ml=36492,Sl=36494,bl=36495,El=36283,Tl=36284,ha=36285,wl=36286;var fr=2300,mo=2301,io=2302,Sc=2303,bc=2400,Ec=2401,Tc=2402;var zu=3200;var Al=0,ku=1,Ei="",un="srgb",pr="srgb-linear",mr="linear",vt="srgb";var so=7680;var Hu=519,Vu=512,Gu=513,Wu=514,qc=515,Xu=516,Yu=517,Zc=518,Kc=519,Jc=35044;var $c="300 es",Ln=2e3,Cs=2001;function _f(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function xf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function gr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qu(){let i=gr("canvas");return i.style.display="block",i}var Rh={},Is=null;function _r(...i){let e="THREE."+i.shift();Is?Is("log",e,...i):console.log(e,...i)}function Zu(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Je(...i){i=Zu(i);let e="THREE."+i.shift();if(Is)Is("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function $e(...i){i=Zu(i);let e="THREE."+i.shift();if(Is)Is("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function $i(...i){let e=i.join(" ");e in Rh||(Rh[e]=!0,Je(...i))}function Ku(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Ju={[ro]:ro,[oo]:ho,[lo]:lo,[Rs]:co,[ao]:ao,[ho]:oo,[uo]:uo,[co]:Rs},Vn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ch=1234567,ws=Math.PI/180,Ps=180/Math.PI;function Ti(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]+"-"+nn[e&255]+nn[e>>8&255]+"-"+nn[e>>16&15|64]+nn[e>>24&255]+"-"+nn[t&63|128]+nn[t>>8&255]+"-"+nn[t>>16&255]+nn[t>>24&255]+nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]).toLowerCase()}function rt(i,e,t){return Math.max(e,Math.min(t,i))}function jc(i,e){return(i%e+e)%e}function vf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function yf(i,e,t){return i!==e?(t-i)/(e-i):0}function hr(i,e,t){return(1-t)*i+t*e}function Mf(i,e,t,n){return hr(i,e,1-Math.exp(-t*n))}function Sf(i,e=1){return e-Math.abs(jc(i,e*2)-e)}function bf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Ef(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Tf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function wf(i,e){return i+Math.random()*(e-i)}function Af(i){return i*(.5-Math.random())}function Rf(i){i!==void 0&&(Ch=i);let e=Ch+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cf(i){return i*ws}function If(i){return i*Ps}function Pf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Lf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Qc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Df(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),p=r((e-n)/2),m=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*p,l*m,o*c);break;case"YZY":i.set(l*m,o*u,l*p,o*c);break;case"ZXZ":i.set(l*p,l*m,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*u,o*c);break;default:Je("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Rl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function eh(i,e){if(e.constructor===Float32Array)return i;let t=Rl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function th(i,e){if(e.constructor===Float32Array)return i;let t=Rl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var Fn={DEG2RAD:ws,RAD2DEG:Ps,generateUUID:Ti,clamp:rt,euclideanModulo:jc,mapLinear:vf,inverseLerp:yf,lerp:hr,damp:Mf,pingpong:Sf,smoothstep:bf,smootherstep:Ef,randInt:Tf,randFloat:wf,randFloatSpread:Af,seededRandom:Rf,degToRad:Cf,radToDeg:If,isPowerOfTwo:Pf,ceilPowerOfTwo:Lf,floorPowerOfTwo:Qc,setQuaternionFromProperEuler:Df,normalize:th,denormalize:eh},pe=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},fn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],p=n[s+3],m=r[a+0],f=r[a+1],g=r[a+2],y=r[a+3];if(p!==y||l!==m||c!==f||u!==g){let d=l*m+c*f+u*g+p*y;d<0&&(m=-m,f=-f,g=-g,y=-y,d=-d);let h=1-o;if(d<.9995){let M=Math.acos(d),b=Math.sin(M);h=Math.sin(h*M)/b,o=Math.sin(o*M)/b,l=l*h+m*o,c=c*h+f*o,u=u*h+g*o,p=p*h+y*o}else{l=l*h+m*o,c=c*h+f*o,u=u*h+g*o,p=p*h+y*o;let M=1/Math.sqrt(l*l+c*c+u*u+p*p);l*=M,c*=M,u*=M,p*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],p=r[a],m=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+u*p+l*f-c*m,e[t+1]=l*g+u*m+c*p-o*f,e[t+2]=c*g+u*f+o*m-l*p,e[t+3]=u*g-o*p-l*m-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),p=o(r/2),m=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=m*u*p+c*f*g,this._y=c*f*p-m*u*g,this._z=c*u*g+m*f*p,this._w=c*u*p-m*f*g;break;case"YXZ":this._x=m*u*p+c*f*g,this._y=c*f*p-m*u*g,this._z=c*u*g-m*f*p,this._w=c*u*p+m*f*g;break;case"ZXY":this._x=m*u*p-c*f*g,this._y=c*f*p+m*u*g,this._z=c*u*g+m*f*p,this._w=c*u*p-m*f*g;break;case"ZYX":this._x=m*u*p-c*f*g,this._y=c*f*p+m*u*g,this._z=c*u*g-m*f*p,this._w=c*u*p+m*f*g;break;case"YZX":this._x=m*u*p+c*f*g,this._y=c*f*p+m*u*g,this._z=c*u*g-m*f*p,this._w=c*u*p-m*f*g;break;case"XZY":this._x=m*u*p-c*f*g,this._y=c*f*p-m*u*g,this._z=c*u*g+m*f*p,this._w=c*u*p+m*f*g;break;default:Je("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],p=t[10],m=n+o+p;if(m>0){let f=.5/Math.sqrt(m+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>p){let f=2*Math.sqrt(1+n-o-p);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>p){let f=2*Math.sqrt(1+o-n-p);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+p-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ih.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ih.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),p=2*(r*n-a*t);return this.x=t+l*c+a*p-o*u,this.y=n+l*u+o*c-r*p,this.z=s+l*p+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Jl.copy(this).projectOnVector(e),this.sub(Jl)}reflect(e){return this.sub(Jl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Jl=new C,Ih=new fn,Qe=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],p=n[7],m=n[2],f=n[5],g=n[8],y=s[0],d=s[3],h=s[6],M=s[1],b=s[4],x=s[7],A=s[2],R=s[5],_=s[8];return r[0]=a*y+o*M+l*A,r[3]=a*d+o*b+l*R,r[6]=a*h+o*x+l*_,r[1]=c*y+u*M+p*A,r[4]=c*d+u*b+p*R,r[7]=c*h+u*x+p*_,r[2]=m*y+f*M+g*A,r[5]=m*d+f*b+g*R,r[8]=m*h+f*x+g*_,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],p=u*a-o*c,m=o*l-u*r,f=c*r-a*l,g=t*p+n*m+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=p*y,e[1]=(s*c-u*n)*y,e[2]=(o*n-s*a)*y,e[3]=m*y,e[4]=(u*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return $i("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($l.makeScale(e,t)),this}rotate(e){return $i("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($l.makeRotation(-e)),this}translate(e,t){return $i("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($l.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},$l=new Qe,Ph=new Qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lh=new Qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nf(){let i={enabled:!0,workingColorSpace:pr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===vt&&(s.r=mi(s.r),s.g=mi(s.g),s.b=mi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===vt&&(s.r=As(s.r),s.g=As(s.g),s.b=As(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ei?mr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[pr]:{primaries:e,whitePoint:n,transfer:mr,toXYZ:Ph,fromXYZ:Lh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:un},outputColorSpaceConfig:{drawingBufferColorSpace:un}},[un]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:Ph,fromXYZ:Lh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:un}}}),i}var dt=Nf();function mi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function As(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ls,go=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ls===void 0&&(ls=gr("canvas")),ls.width=e.width,ls.height=e.height;let s=ls.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ls}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=gr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=mi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(mi(t[n]/255)*255):t[n]=mi(t[n]);return{data:t,width:e.width,height:e.height}}else return Je("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Uf=0,Ls=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=Ti(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(jl(s[a].image)):r.push(jl(s[a]))}else r=jl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function jl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?go.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Je("Texture: Unable to serialize Texture."),{})}var Ff=0,Ql=new C,pn=class i extends Vn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=jn,s=jn,r=dn,a=Si,o=Zn,l=_n,c=i.DEFAULT_ANISOTROPY,u=Ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=Ti(),this.name="",this.source=new Ls(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Ql).x}get height(){return this.source.getSize(Ql).y}get depth(){return this.source.getSize(Ql).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Je(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Je(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fo:e.x=e.x-Math.floor(e.x);break;case jn:e.x=e.x<0?0:1;break;case po:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fo:e.y=e.y-Math.floor(e.y);break;case jn:e.y=e.y<0?0:1;break;case po:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=kc;pn.DEFAULT_ANISOTROPY=1;var Pt=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],p=l[8],m=l[1],f=l[5],g=l[9],y=l[2],d=l[6],h=l[10];if(Math.abs(u-m)<.01&&Math.abs(p-y)<.01&&Math.abs(g-d)<.01){if(Math.abs(u+m)<.1&&Math.abs(p+y)<.1&&Math.abs(g+d)<.1&&Math.abs(c+f+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,x=(f+1)/2,A=(h+1)/2,R=(u+m)/4,_=(p+y)/4,w=(g+d)/4;return b>x&&b>A?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=R/n,r=_/n):x>A?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=R/s,r=w/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=_/r,s=w/r),this.set(n,s,r,t),this}let M=Math.sqrt((d-g)*(d-g)+(p-y)*(p-y)+(m-u)*(m-u));return Math.abs(M)<.001&&(M=1),this.x=(d-g)/M,this.y=(p-y)/M,this.z=(m-u)/M,this.w=Math.acos((c+f+h-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},_o=class extends Vn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new pn({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:dn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ls(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},zt=class extends _o{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},xr=class extends pn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var xo=class extends pn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var lt=class i{static{this.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,l,c,u,p,m,f,g,y,d){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,p,m,f,g,y,d)}set(e,t,n,s,r,a,o,l,c,u,p,m,f,g,y,d){let h=this.elements;return h[0]=e,h[4]=t,h[8]=n,h[12]=s,h[1]=r,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=p,h[14]=m,h[3]=f,h[7]=g,h[11]=y,h[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/cs.setFromMatrixColumn(e,0).length(),r=1/cs.setFromMatrixColumn(e,1).length(),a=1/cs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){let m=a*u,f=a*p,g=o*u,y=o*p;t[0]=l*u,t[4]=-l*p,t[8]=c,t[1]=f+g*c,t[5]=m-y*c,t[9]=-o*l,t[2]=y-m*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let m=l*u,f=l*p,g=c*u,y=c*p;t[0]=m+y*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*p,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=y+m*o,t[10]=a*l}else if(e.order==="ZXY"){let m=l*u,f=l*p,g=c*u,y=c*p;t[0]=m-y*o,t[4]=-a*p,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=y-m*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let m=a*u,f=a*p,g=o*u,y=o*p;t[0]=l*u,t[4]=g*c-f,t[8]=m*c+y,t[1]=l*p,t[5]=y*c+m,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let m=a*l,f=a*c,g=o*l,y=o*c;t[0]=l*u,t[4]=y-m*p,t[8]=g*p+f,t[1]=p,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*p+g,t[10]=m-y*p}else if(e.order==="XZY"){let m=a*l,f=a*c,g=o*l,y=o*c;t[0]=l*u,t[4]=-p,t[8]=c*u,t[1]=m*p+y,t[5]=a*u,t[9]=f*p-g,t[2]=g*p-f,t[6]=o*u,t[10]=y*p+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Of,e,Bf)}lookAt(e,t,n){let s=this.elements;return vn.subVectors(e,t),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Ri.crossVectors(n,vn),Ri.lengthSq()===0&&(Math.abs(n.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Ri.crossVectors(n,vn)),Ri.normalize(),Ea.crossVectors(vn,Ri),s[0]=Ri.x,s[4]=Ea.x,s[8]=vn.x,s[1]=Ri.y,s[5]=Ea.y,s[9]=vn.y,s[2]=Ri.z,s[6]=Ea.z,s[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],p=n[5],m=n[9],f=n[13],g=n[2],y=n[6],d=n[10],h=n[14],M=n[3],b=n[7],x=n[11],A=n[15],R=s[0],_=s[4],w=s[8],B=s[12],L=s[1],F=s[5],W=s[9],se=s[13],N=s[2],Z=s[6],te=s[10],K=s[14],Me=s[3],q=s[7],fe=s[11],he=s[15];return r[0]=a*R+o*L+l*N+c*Me,r[4]=a*_+o*F+l*Z+c*q,r[8]=a*w+o*W+l*te+c*fe,r[12]=a*B+o*se+l*K+c*he,r[1]=u*R+p*L+m*N+f*Me,r[5]=u*_+p*F+m*Z+f*q,r[9]=u*w+p*W+m*te+f*fe,r[13]=u*B+p*se+m*K+f*he,r[2]=g*R+y*L+d*N+h*Me,r[6]=g*_+y*F+d*Z+h*q,r[10]=g*w+y*W+d*te+h*fe,r[14]=g*B+y*se+d*K+h*he,r[3]=M*R+b*L+x*N+A*Me,r[7]=M*_+b*F+x*Z+A*q,r[11]=M*w+b*W+x*te+A*fe,r[15]=M*B+b*se+x*K+A*he,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],p=e[6],m=e[10],f=e[14],g=e[3],y=e[7],d=e[11],h=e[15],M=l*f-c*m,b=o*f-c*p,x=o*m-l*p,A=a*f-c*u,R=a*m-l*u,_=a*p-o*u;return t*(y*M-d*b+h*x)-n*(g*M-d*A+h*R)+s*(g*b-y*A+h*_)-r*(g*x-y*R+d*_)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(r*u-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],p=e[9],m=e[10],f=e[11],g=e[12],y=e[13],d=e[14],h=e[15],M=t*o-n*a,b=t*l-s*a,x=t*c-r*a,A=n*l-s*o,R=n*c-r*o,_=s*c-r*l,w=u*y-p*g,B=u*d-m*g,L=u*h-f*g,F=p*d-m*y,W=p*h-f*y,se=m*h-f*d,N=M*se-b*W+x*F+A*L-R*B+_*w;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let Z=1/N;return e[0]=(o*se-l*W+c*F)*Z,e[1]=(s*W-n*se-r*F)*Z,e[2]=(y*_-d*R+h*A)*Z,e[3]=(m*R-p*_-f*A)*Z,e[4]=(l*L-a*se-c*B)*Z,e[5]=(t*se-s*L+r*B)*Z,e[6]=(d*x-g*_-h*b)*Z,e[7]=(u*_-m*x+f*b)*Z,e[8]=(a*W-o*L+c*w)*Z,e[9]=(n*L-t*W-r*w)*Z,e[10]=(g*R-y*x+h*M)*Z,e[11]=(p*x-u*R-f*M)*Z,e[12]=(o*B-a*F-l*w)*Z,e[13]=(t*F-n*B+s*w)*Z,e[14]=(y*b-g*A-d*M)*Z,e[15]=(u*A-p*b+m*M)*Z,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,p=o+o,m=r*c,f=r*u,g=r*p,y=a*u,d=a*p,h=o*p,M=l*c,b=l*u,x=l*p,A=n.x,R=n.y,_=n.z;return s[0]=(1-(y+h))*A,s[1]=(f+x)*A,s[2]=(g-b)*A,s[3]=0,s[4]=(f-x)*R,s[5]=(1-(m+h))*R,s[6]=(d+M)*R,s[7]=0,s[8]=(g+b)*_,s[9]=(d-M)*_,s[10]=(1-(m+y))*_,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=cs.set(s[0],s[1],s[2]).length(),o=cs.set(s[4],s[5],s[6]).length(),l=cs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),zn.copy(this);let c=1/a,u=1/o,p=1/l;return zn.elements[0]*=c,zn.elements[1]*=c,zn.elements[2]*=c,zn.elements[4]*=u,zn.elements[5]*=u,zn.elements[6]*=u,zn.elements[8]*=p,zn.elements[9]*=p,zn.elements[10]*=p,t.setFromRotationMatrix(zn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Ln,l=!1){let c=this.elements,u=2*r/(t-e),p=2*r/(n-s),m=(t+e)/(t-e),f=(n+s)/(n-s),g,y;if(l)g=r/(a-r),y=a*r/(a-r);else if(o===Ln)g=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Cs)g=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=m,c[12]=0,c[1]=0,c[5]=p,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Ln,l=!1){let c=this.elements,u=2/(t-e),p=2/(n-s),m=-(t+e)/(t-e),f=-(n+s)/(n-s),g,y;if(l)g=1/(a-r),y=a/(a-r);else if(o===Ln)g=-2/(a-r),y=-(a+r)/(a-r);else if(o===Cs)g=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=m,c[1]=0,c[5]=p,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},cs=new C,zn=new lt,Of=new C(0,0,0),Bf=new C(1,1,1),Ri=new C,Ea=new C,vn=new C,Dh=new lt,Nh=new fn,_i=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],p=s[2],m=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(m,c),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(rt(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-rt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(m,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Je("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Dh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Dh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Nh.setFromEuler(this),this.setFromQuaternion(Nh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_i.DEFAULT_ORDER="XYZ";var vr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},zf=0,Uh=new C,hs=new fn,hi=new lt,Ta=new C,Qs=new C,kf=new C,Hf=new fn,Fh=new C(1,0,0),Oh=new C(0,1,0),Bh=new C(0,0,1),zh={type:"added"},Vf={type:"removed"},us={type:"childadded",child:null},ec={type:"childremoved",child:null},Ut=class i extends Vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=Ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new C,t=new _i,n=new fn,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new lt},normalMatrix:{value:new Qe}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hs.setFromAxisAngle(e,t),this.quaternion.multiply(hs),this}rotateOnWorldAxis(e,t){return hs.setFromAxisAngle(e,t),this.quaternion.premultiply(hs),this}rotateX(e){return this.rotateOnAxis(Fh,e)}rotateY(e){return this.rotateOnAxis(Oh,e)}rotateZ(e){return this.rotateOnAxis(Bh,e)}translateOnAxis(e,t){return Uh.copy(e).applyQuaternion(this.quaternion),this.position.add(Uh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Fh,e)}translateY(e){return this.translateOnAxis(Oh,e)}translateZ(e){return this.translateOnAxis(Bh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ta.copy(e):Ta.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(Qs,Ta,this.up):hi.lookAt(Ta,Qs,this.up),this.quaternion.setFromRotationMatrix(hi),s&&(hi.extractRotation(s.matrixWorld),hs.setFromRotationMatrix(hi),this.quaternion.premultiply(hs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?($e("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zh),us.child=e,this.dispatchEvent(us),us.child=null):$e("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vf),ec.child=e,this.dispatchEvent(ec),ec.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zh),us.child=e,this.dispatchEvent(us),us.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,e,kf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,Hf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let p=l[c];r(e.shapes,p)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),p=a(e.shapes),m=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),p.length>0&&(n.shapes=p),m.length>0&&(n.skeletons=m),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ut.DEFAULT_UP=new C(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var At=class extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}},Gf={type:"move"},Ds=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new At,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new At,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new At,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let d=t.getJointPose(y,n),h=this._getHandJoint(c,y);d!==null&&(h.matrix.fromArray(d.transform.matrix),h.matrix.decompose(h.position,h.quaternion,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=d.radius),h.visible=d!==null}let u=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],m=u.position.distanceTo(p.position),f=.02,g=.005;c.inputState.pinching&&m>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&m<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Gf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new At;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},$u={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},wa={h:0,s:0,l:0};function tc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ke=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=dt.workingColorSpace){if(e=jc(e,1),t=rt(t,0,1),n=rt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=tc(a,r,e+1/3),this.g=tc(a,r,e),this.b=tc(a,r,e-1/3)}return dt.colorSpaceToWorking(this,s),this}setStyle(e,t=un){function n(r){r!==void 0&&parseFloat(r)<1&&Je("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Je("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Je("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=un){let n=$u[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Je("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mi(e.r),this.g=mi(e.g),this.b=mi(e.b),this}copyLinearToSRGB(e){return this.r=As(e.r),this.g=As(e.g),this.b=As(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=un){return dt.workingToColorSpace(sn.copy(this),e),Math.round(rt(sn.r*255,0,255))*65536+Math.round(rt(sn.g*255,0,255))*256+Math.round(rt(sn.b*255,0,255))}getHexString(e=un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.workingToColorSpace(sn.copy(this),t);let n=sn.r,s=sn.g,r=sn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let p=a-o;switch(c=u<=.5?p/(a+o):p/(2-a-o),a){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.workingToColorSpace(sn.copy(this),t),e.r=sn.r,e.g=sn.g,e.b=sn.b,e}getStyle(e=un){dt.workingToColorSpace(sn.copy(this),e);let t=sn.r,n=sn.g,s=sn.b;return e!==un?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ci),this.setHSL(Ci.h+e,Ci.s+t,Ci.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ci),e.getHSL(wa);let n=hr(Ci.h,wa.h,t),s=hr(Ci.s,wa.s,t),r=hr(Ci.l,wa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},sn=new Ke;Ke.NAMES=$u;var yr=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ke(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Mr=class extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _i,this.environmentIntensity=1,this.environmentRotation=new _i,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},kn=new C,ui=new C,nc=new C,di=new C,ds=new C,fs=new C,kh=new C,ic=new C,sc=new C,rc=new C,ac=new Pt,oc=new Pt,lc=new Pt,$n=class i{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),kn.subVectors(e,t),s.cross(kn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){kn.subVectors(s,t),ui.subVectors(n,t),nc.subVectors(e,t);let a=kn.dot(kn),o=kn.dot(ui),l=kn.dot(nc),c=ui.dot(ui),u=ui.dot(nc),p=a*c-o*o;if(p===0)return r.set(0,0,0),null;let m=1/p,f=(c*l-o*u)*m,g=(a*u-o*l)*m;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,di)===null?!1:di.x>=0&&di.y>=0&&di.x+di.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,di)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,di.x),l.addScaledVector(a,di.y),l.addScaledVector(o,di.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return ac.setScalar(0),oc.setScalar(0),lc.setScalar(0),ac.fromBufferAttribute(e,t),oc.fromBufferAttribute(e,n),lc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ac,r.x),a.addScaledVector(oc,r.y),a.addScaledVector(lc,r.z),a}static isFrontFacing(e,t,n,s){return kn.subVectors(n,t),ui.subVectors(e,t),kn.cross(ui).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kn.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),kn.cross(ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;ds.subVectors(s,n),fs.subVectors(r,n),ic.subVectors(e,n);let l=ds.dot(ic),c=fs.dot(ic);if(l<=0&&c<=0)return t.copy(n);sc.subVectors(e,s);let u=ds.dot(sc),p=fs.dot(sc);if(u>=0&&p<=u)return t.copy(s);let m=l*p-u*c;if(m<=0&&l>=0&&u<=0&&l-u>0)return a=l/(l-u),t.copy(n).addScaledVector(ds,a);rc.subVectors(e,r);let f=ds.dot(rc),g=fs.dot(rc);if(g>=0&&f<=g)return t.copy(r);let y=f*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(fs,o);let d=u*g-f*p;if(d<=0&&p-u>=0&&f-g>=0)return kh.subVectors(r,s),o=(p-u)/(p-u+(f-g)),t.copy(s).addScaledVector(kh,o);let h=1/(d+y+m);return a=y*h,o=m*h,t.copy(n).addScaledVector(ds,a).addScaledVector(fs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Nn=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Hn):Hn.fromBufferAttribute(r,a),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Aa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Aa.copy(n.boundingBox)),Aa.applyMatrix4(e.matrixWorld),this.union(Aa)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(er),Ra.subVectors(this.max,er),ps.subVectors(e.a,er),ms.subVectors(e.b,er),gs.subVectors(e.c,er),Ii.subVectors(ms,ps),Pi.subVectors(gs,ms),qi.subVectors(ps,gs);let t=[0,-Ii.z,Ii.y,0,-Pi.z,Pi.y,0,-qi.z,qi.y,Ii.z,0,-Ii.x,Pi.z,0,-Pi.x,qi.z,0,-qi.x,-Ii.y,Ii.x,0,-Pi.y,Pi.x,0,-qi.y,qi.x,0];return!cc(t,ps,ms,gs,Ra)||(t=[1,0,0,0,1,0,0,0,1],!cc(t,ps,ms,gs,Ra))?!1:(Ca.crossVectors(Ii,Pi),t=[Ca.x,Ca.y,Ca.z],cc(t,ps,ms,gs,Ra))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},fi=[new C,new C,new C,new C,new C,new C,new C,new C],Hn=new C,Aa=new Nn,ps=new C,ms=new C,gs=new C,Ii=new C,Pi=new C,qi=new C,er=new C,Ra=new C,Ca=new C,Zi=new C;function cc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Zi.fromArray(i,r);let o=s.x*Math.abs(Zi.x)+s.y*Math.abs(Zi.y)+s.z*Math.abs(Zi.z),l=e.dot(Zi),c=t.dot(Zi),u=n.dot(Zi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Bt=new C,Ia=new pe,Wf=0,Dn=class extends Vn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Jc,this.updateRanges=[],this.gpuType=Un,this.version=0,this._normalizationScale=e!==void 0?Rl(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ia.fromBufferAttribute(this,t),Ia.applyMatrix3(e),this.setXY(t,Ia.x,Ia.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):eh(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):th(e,this.array)}};var Sr=class extends Dn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var br=class extends Dn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ct=class extends Dn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Xf=new Nn,tr=new C,hc=new C,ei=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Xf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;tr.subVectors(e,this.center);let t=tr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(tr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(tr.copy(e.center).add(hc)),this.expandByPoint(tr.copy(e.center).sub(hc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Yf=0,Pn=new lt,uc=new Ut,_s=new C,yn=new Nn,nr=new Nn,qt=new C,_t=class i extends Vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yf++}),this.uuid=Ti(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_f(e)?br:Sr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Pn.makeRotationFromQuaternion(e),this.applyMatrix4(Pn),this}rotateX(e){return Pn.makeRotationX(e),this.applyMatrix4(Pn),this}rotateY(e){return Pn.makeRotationY(e),this.applyMatrix4(Pn),this}rotateZ(e){return Pn.makeRotationZ(e),this.applyMatrix4(Pn),this}translate(e,t,n){return Pn.makeTranslation(e,t,n),this.applyMatrix4(Pn),this}scale(e,t,n){return Pn.makeScale(e,t,n),this.applyMatrix4(Pn),this}lookAt(e){return uc.lookAt(e),uc.updateMatrix(),this.applyMatrix4(uc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ct(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Je("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];yn.setFromBufferAttribute(r),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$e('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ei);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(yn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];nr.setFromBufferAttribute(o),this.morphTargetsRelative?(qt.addVectors(yn.min,nr.min),yn.expandByPoint(qt),qt.addVectors(yn.max,nr.max),yn.expandByPoint(qt)):(yn.expandByPoint(nr.min),yn.expandByPoint(nr.max))}yn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)qt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(qt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)qt.fromBufferAttribute(o,c),l&&(_s.fromBufferAttribute(e,c),qt.add(_s)),s=Math.max(s,n.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&$e('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$e("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Dn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let B=0;B<n.count;B++)o[B]=new C,l[B]=new C;let u=new C,p=new C,m=new C,f=new pe,g=new pe,y=new pe,d=new C,h=new C;function M(B,L,F){c[B]=c[L]=c[F]=1,u.fromBufferAttribute(n,B),p.fromBufferAttribute(n,L),m.fromBufferAttribute(n,F),f.fromBufferAttribute(r,B),g.fromBufferAttribute(r,L),y.fromBufferAttribute(r,F),p.sub(u),m.sub(u),g.sub(f),y.sub(f);let W=1/(g.x*y.y-y.x*g.y);isFinite(W)&&(d.copy(p).multiplyScalar(y.y).addScaledVector(m,-g.y).multiplyScalar(W),h.copy(m).multiplyScalar(g.x).addScaledVector(p,-y.x).multiplyScalar(W),o[B].add(d),o[L].add(d),o[F].add(d),l[B].add(h),l[L].add(h),l[F].add(h))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let B=0,L=b.length;B<L;++B){let F=b[B],W=F.start,se=F.count;for(let N=W,Z=W+se;N<Z;N+=3)M(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let x=new C,A=new C,R=new C,_=new C;function w(B){R.fromBufferAttribute(s,B),_.copy(R);let L=o[B];x.copy(L),x.sub(R.multiplyScalar(R.dot(L))).normalize(),A.crossVectors(_,L);let W=A.dot(l[B])<0?-1:1;a.setXYZW(B,x.x,x.y,x.z,W)}for(let B=0,L=n.count;B<L;++B)c[B]&&w(B);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Dn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let m=0,f=n.count;m<f;m++)n.setXYZ(m,0,0,0);let s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,u=new C,p=new C;if(e)for(let m=0,f=e.count;m<f;m+=3){let g=e.getX(m+0),y=e.getX(m+1),d=e.getX(m+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,d),u.subVectors(a,r),p.subVectors(s,r),u.cross(p),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,d),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z)}else for(let m=0,f=t.count;m<f;m+=3)s.fromBufferAttribute(t,m+0),r.fromBufferAttribute(t,m+1),a.fromBufferAttribute(t,m+2),u.subVectors(a,r),p.subVectors(s,r),u.cross(p),n.setXYZ(m+0,u.x,u.y,u.z),n.setXYZ(m+1,u.x,u.y,u.z),n.setXYZ(m+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,p=o.normalized,m=new c.constructor(l.length*u),f=0,g=0;for(let y=0,d=l.length;y<d;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*u;for(let h=0;h<u;h++)m[g++]=c[f++]}return new Dn(m,u,p)}if(this.index===null)return Je("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,p=c.length;u<p;u++){let m=c[u],f=e(m,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let p=0,m=c.length;p<m;p++){let f=c[p];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],p=r[c];for(let m=0,f=p.length;m<f;m++)u.push(p[m].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},vo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Jc,this.updateRanges=[],this.version=0,this.uuid=Ti()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Hh(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Hh(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function Hh(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=Ti()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var hn=new C,Er=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s,this._normalizationScale=e!==void 0?Rl(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix4(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyNormalMatrix(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.transformDirection(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){_r("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Dn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){_r("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):eh(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):th(e,this.data.array)}},dc=new C,qf=new C,Zf=new Qe,Mn=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=dc.subVectors(n,t).cross(qf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(dc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Zf.getNormalMatrix(e),s=this.coplanarPoint(dc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Kf=0,Gn=class extends Vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Ti(),this.name="",this.type="Material",this.blending=Vs,this.side=Vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oc,this.blendDst=Bc,this.blendEquation=ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=so,this.stencilZFail=so,this.stencilZPass=so,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Je(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Je(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ke().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Mn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new pe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new pe().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Wn=class extends Gn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},xs,ir=new C,vs=new C,ys=new C,Ms=new pe,sr=new pe,ju=new lt,Pa=new C,rr=new C,La=new C,Vh=new pe,fc=new pe,Gh=new pe,ti=class extends Ut{constructor(e=new Wn){if(super(),this.isSprite=!0,this.type="Sprite",xs===void 0){xs=new _t;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new vo(t,5);xs.setIndex([0,1,2,0,2,3]),xs.setAttribute("position",new Er(n,3,0,!1)),xs.setAttribute("uv",new Er(n,2,3,!1))}this.geometry=xs,this.material=e,this.center=new pe(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&$e('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),vs.setFromMatrixScale(this.matrixWorld),ju.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ys.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&vs.multiplyScalar(-ys.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Da(Pa.set(-.5,-.5,0),ys,a,vs,s,r),Da(rr.set(.5,-.5,0),ys,a,vs,s,r),Da(La.set(.5,.5,0),ys,a,vs,s,r),Vh.set(0,0),fc.set(1,0),Gh.set(1,1);let o=e.ray.intersectTriangle(Pa,rr,La,!1,ir);if(o===null&&(Da(rr.set(-.5,.5,0),ys,a,vs,s,r),fc.set(0,1),o=e.ray.intersectTriangle(Pa,La,rr,!1,ir),o===null))return;let l=e.ray.origin.distanceTo(ir);l<e.near||l>e.far||t.push({distance:l,point:ir.clone(),uv:$n.getInterpolation(ir,Pa,rr,La,Vh,fc,Gh,new pe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function Da(i,e,t,n,s,r){Ms.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(sr.x=r*Ms.x-s*Ms.y,sr.y=s*Ms.x+r*Ms.y):sr.copy(Ms),i.copy(e),i.x+=sr.x,i.y+=sr.y,i.applyMatrix4(ju)}var pi=new C,pc=new C,Na=new C,Ua=new C,Di=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){pc.copy(e).add(t).multiplyScalar(.5),Na.copy(t).sub(e).normalize(),Ua.copy(this.origin).sub(pc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Na),o=Ua.dot(this.direction),l=-Ua.dot(Na),c=Ua.lengthSq(),u=Math.abs(1-a*a),p,m,f,g;if(u>0)if(p=a*l-o,m=a*o-l,g=r*u,p>=0)if(m>=-g)if(m<=g){let y=1/u;p*=y,m*=y,f=p*(p+a*m+2*o)+m*(a*p+m+2*l)+c}else m=r,p=Math.max(0,-(a*m+o)),f=-p*p+m*(m+2*l)+c;else m=-r,p=Math.max(0,-(a*m+o)),f=-p*p+m*(m+2*l)+c;else m<=-g?(p=Math.max(0,-(-a*r+o)),m=p>0?-r:Math.min(Math.max(-r,-l),r),f=-p*p+m*(m+2*l)+c):m<=g?(p=0,m=Math.min(Math.max(-r,-l),r),f=m*(m+2*l)+c):(p=Math.max(0,-(a*r+o)),m=p>0?r:Math.min(Math.max(-r,-l),r),f=-p*p+m*(m+2*l)+c);else m=a>0?-r:r,p=Math.max(0,-(a*m+o)),f=-p*p+m*(m+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(pc).addScaledVector(Na,m),f}intersectSphere(e,t){if(e.radius<0)return null;pi.subVectors(e.center,this.origin);let n=pi.dot(this.direction),s=pi.dot(pi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,m=this.origin;return c>=0?(n=(e.min.x-m.x)*c,s=(e.max.x-m.x)*c):(n=(e.max.x-m.x)*c,s=(e.min.x-m.x)*c),u>=0?(r=(e.min.y-m.y)*u,a=(e.max.y-m.y)*u):(r=(e.max.y-m.y)*u,a=(e.min.y-m.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),p>=0?(o=(e.min.z-m.z)*p,l=(e.max.z-m.z)*p):(o=(e.max.z-m.z)*p,l=(e.min.z-m.z)*p),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,p=e.x-a.x,m=e.y-a.y,f=e.z-a.z,g=t.x-a.x,y=t.y-a.y,d=t.z-a.z,h=n.x-a.x,M=n.y-a.y,b=n.z-a.z,x=Math.abs(l),A=Math.abs(c),R=Math.abs(u),_,w,B,L,F,W,se,N,Z,te,K,Me;if(x>=A&&x>=R?(B=l,W=p,Z=g,Me=h,l>=0?(_=c,w=u,L=m,F=f,se=y,N=d,te=M,K=b):(_=u,w=c,L=f,F=m,se=d,N=y,te=b,K=M)):A>=R?(B=c,W=m,Z=y,Me=M,c>=0?(_=u,w=l,L=f,F=p,se=d,N=g,te=b,K=h):(_=l,w=u,L=p,F=f,se=g,N=d,te=h,K=b)):(B=u,W=f,Z=d,Me=b,u>=0?(_=l,w=c,L=p,F=m,se=g,N=y,te=h,K=M):(_=c,w=l,L=m,F=p,se=y,N=g,te=M,K=h)),B===0)return null;let q=_/B,fe=w/B,he=1/B,Pe=L-q*W,Ue=F-fe*W,ee=se-q*Z,Ae=N-fe*Z,de=te-q*Me,ke=K-fe*Me,Re=de*Ae-ke*ee,Oe=Pe*ke-Ue*de,ht=ee*Ue-Ae*Pe;if(s){if(Re<0||Oe<0||ht<0)return null}else if((Re<0||Oe<0||ht<0)&&(Re>0||Oe>0||ht>0))return null;let Be=Re+Oe+ht;if(Be===0)return null;let Ze=he*(Re*W+Oe*Z+ht*Me);return(Be>0?Ze<0:Ze>0)?null:this.at(Ze/Be,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},kt=class extends Gn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=zc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Wh=new lt,Ki=new Di,Fa=new ei,Xh=new C,Oa=new C,Ba=new C,za=new C,mc=new C,ka=new C,Yh=new C,Ha=new C,ft=class extends Ut{constructor(e=new _t,t=new kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){ka.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],p=r[l];u!==0&&(mc.fromBufferAttribute(p,e),a?ka.addScaledVector(mc,u):ka.addScaledVector(mc.sub(t),u))}t.add(ka)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Fa.copy(n.boundingSphere),Fa.applyMatrix4(r),Ki.copy(e.ray).recast(e.near),!(Fa.containsPoint(Ki.origin)===!1&&(Ki.intersectSphere(Fa,Xh)===null||Ki.origin.distanceToSquared(Xh)>(e.far-e.near)**2))&&(Wh.copy(r).invert(),Ki.copy(e.ray).applyMatrix4(Wh),!(n.boundingBox!==null&&Ki.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ki)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,m=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=m.length;g<y;g++){let d=m[g],h=a[d.materialIndex],M=Math.max(d.start,f.start),b=Math.min(o.count,Math.min(d.start+d.count,f.start+f.count));for(let x=M,A=b;x<A;x+=3){let R=o.getX(x),_=o.getX(x+1),w=o.getX(x+2);s=Va(this,h,e,n,c,u,p,R,_,w),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let d=g,h=y;d<h;d+=3){let M=o.getX(d),b=o.getX(d+1),x=o.getX(d+2);s=Va(this,a,e,n,c,u,p,M,b,x),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=m.length;g<y;g++){let d=m[g],h=a[d.materialIndex],M=Math.max(d.start,f.start),b=Math.min(l.count,Math.min(d.start+d.count,f.start+f.count));for(let x=M,A=b;x<A;x+=3){let R=x,_=x+1,w=x+2;s=Va(this,h,e,n,c,u,p,R,_,w),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let d=g,h=y;d<h;d+=3){let M=d,b=d+1,x=d+2;s=Va(this,a,e,n,c,u,p,M,b,x),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}}};function Jf(i,e,t,n,s,r,a,o){let l;if(e.side===mn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Vi,o),l===null)return null;Ha.copy(o),Ha.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Ha);return c<t.near||c>t.far?null:{distance:c,point:Ha.clone(),object:i}}function Va(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Oa),i.getVertexPosition(l,Ba),i.getVertexPosition(c,za);let u=Jf(i,e,t,n,Oa,Ba,za,Yh);if(u){let p=new C;$n.getBarycoord(Yh,Oa,Ba,za,p),s&&(u.uv=$n.getInterpolatedAttribute(s,o,l,c,p,new pe)),r&&(u.uv1=$n.getInterpolatedAttribute(r,o,l,c,p,new pe)),a&&(u.normal=$n.getInterpolatedAttribute(a,o,l,c,p,new C),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let m={a:o,b:l,c,normal:new C,materialIndex:0};$n.getNormal(Oa,Ba,za,m.normal),u.face=m,u.barycoord=p}return u}var Tr=class extends pn{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Zt,u=Zt,p,m){super(null,a,o,l,c,u,s,r,p,m),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var wr=class extends Dn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ss=new lt,qh=new lt,Ga=[],Zh=new Nn,$f=new lt,ar=new ft,or=new ei,Ar=class extends ft{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new wr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,$f)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Nn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ss),Zh.copy(e.boundingBox).applyMatrix4(Ss),this.boundingBox.union(Zh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ei),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ss),or.copy(e.boundingSphere).applyMatrix4(Ss),this.boundingSphere.union(or)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(ar.geometry=this.geometry,ar.material=this.material,ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),or.copy(this.boundingSphere),or.applyMatrix4(n),e.ray.intersectsSphere(or)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ss),qh.multiplyMatrices(n,Ss),ar.matrixWorld=qh,ar.raycast(e,Ga);for(let a=0,o=Ga.length;a<o;a++){let l=Ga[a];l.instanceId=r,l.object=this,t.push(l)}Ga.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new wr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Tr(new Float32Array(s*this.count),s,this.count,qo,Un));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ji=new ei,jf=new pe(.5,.5),Wa=new C,Ni=class{constructor(e=new Mn,t=new Mn,n=new Mn,s=new Mn,r=new Mn,a=new Mn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ln,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],p=r[5],m=r[6],f=r[7],g=r[8],y=r[9],d=r[10],h=r[11],M=r[12],b=r[13],x=r[14],A=r[15];if(s[0].setComponents(c-a,f-u,h-g,A-M).normalize(),s[1].setComponents(c+a,f+u,h+g,A+M).normalize(),s[2].setComponents(c+o,f+p,h+y,A+b).normalize(),s[3].setComponents(c-o,f-p,h-y,A-b).normalize(),n)s[4].setComponents(l,m,d,x).normalize(),s[5].setComponents(c-l,f-m,h-d,A-x).normalize();else if(s[4].setComponents(c-l,f-m,h-d,A-x).normalize(),t===Ln)s[5].setComponents(c+l,f+m,h+d,A+x).normalize();else if(t===Cs)s[5].setComponents(l,m,d,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ji)}intersectsSprite(e){Ji.center.set(0,0,0);let t=jf.distanceTo(e.center);return Ji.radius=.7071067811865476+t,Ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ji)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Wa.x=s.normal.x>0?e.max.x:e.min.x,Wa.y=s.normal.y>0?e.max.y:e.min.y,Wa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Wa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Kh=new lt,yo=class i{constructor(){this.coordinateSystem=Ln,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];Kh.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Ni),n[s].setFromProjectionMatrix(Kh,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Ni),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var Kt=class extends Gn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Mo=new C,So=new C,Jh=new lt,lr=new Di,Xa=new ei,gc=new C,$h=new C,Sn=class extends Ut{constructor(e=new _t,t=new Kt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Mo.fromBufferAttribute(t,s-1),So.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Mo.distanceTo(So);e.setAttribute("lineDistance",new ct(n,1))}else Je("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xa.copy(n.boundingSphere),Xa.applyMatrix4(s),Xa.radius+=r,e.ray.intersectsSphere(Xa)===!1)return;Jh.copy(s).invert(),lr.copy(e.ray).applyMatrix4(Jh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,m=n.attributes.position;if(u!==null){let f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let y=f,d=g-1;y<d;y+=c){let h=u.getX(y),M=u.getX(y+1),b=Ya(this,e,lr,l,h,M,y);b&&t.push(b)}if(this.isLineLoop){let y=u.getX(g-1),d=u.getX(f),h=Ya(this,e,lr,l,y,d,g-1);h&&t.push(h)}}else{let f=Math.max(0,a.start),g=Math.min(m.count,a.start+a.count);for(let y=f,d=g-1;y<d;y+=c){let h=Ya(this,e,lr,l,y,y+1,y);h&&t.push(h)}if(this.isLineLoop){let y=Ya(this,e,lr,l,g-1,f,g-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ya(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Mo.fromBufferAttribute(o,s),So.fromBufferAttribute(o,r),t.distanceSqToSegment(Mo,So,gc,$h)>n)return;gc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(gc);if(!(c<e.near||c>e.far))return{distance:c,point:$h.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var jh=new C,Qh=new C,bn=class extends Sn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)jh.fromBufferAttribute(t,s),Qh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+jh.distanceTo(Qh);e.setAttribute("lineDistance",new ct(n,1))}else Je("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ui=class extends Gn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},eu=new lt,wc=new Di,qa=new ei,Za=new C,ji=class extends Ut{constructor(e=new _t,t=new Ui){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qa.copy(n.boundingSphere),qa.applyMatrix4(s),qa.radius+=r,e.ray.intersectsSphere(qa)===!1)return;eu.copy(s).invert(),wc.copy(e.ray).applyMatrix4(eu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,p=n.attributes.position;if(c!==null){let m=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=m,y=f;g<y;g++){let d=c.getX(g);Za.fromBufferAttribute(p,d),tu(Za,d,l,s,e,t,this)}}else{let m=Math.max(0,a.start),f=Math.min(p.count,a.start+a.count);for(let g=m,y=f;g<y;g++)Za.fromBufferAttribute(p,g),tu(Za,g,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function tu(i,e,t,n,s,r,a){let o=wc.distanceSqToPoint(i);if(o<t){let l=new C;wc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Rr=class extends pn{constructor(e=[],t=ss,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Cr=class extends pn{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var xi=class extends pn{constructor(e,t,n=qn,s,r,a,o=Zt,l=Zt,c,u=gi,p=1){if(u!==gi&&u!==bi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let m={width:e,height:t,depth:p};super(m,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ls(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ir=class extends xi{constructor(e,t=qn,n=ss,s,r,a=Zt,o=Zt,l,c=gi){let u={width:e,height:e,depth:1},p=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Pr=class extends pn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},an=class i extends _t{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],p=[],m=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(u,3)),this.setAttribute("uv",new ct(p,2));function g(y,d,h,M,b,x,A,R,_,w,B){let L=x/_,F=A/w,W=x/2,se=A/2,N=R/2,Z=_+1,te=w+1,K=0,Me=0,q=new C;for(let fe=0;fe<te;fe++){let he=fe*F-se;for(let Pe=0;Pe<Z;Pe++){let Ue=Pe*L-W;q[y]=Ue*M,q[d]=he*b,q[h]=N,c.push(q.x,q.y,q.z),q[y]=0,q[d]=0,q[h]=R>0?1:-1,u.push(q.x,q.y,q.z),p.push(Pe/_),p.push(1-fe/w),K+=1}}for(let fe=0;fe<w;fe++)for(let he=0;he<_;he++){let Pe=m+he+Z*fe,Ue=m+he+Z*(fe+1),ee=m+(he+1)+Z*(fe+1),Ae=m+(he+1)+Z*fe;l.push(Pe,Ue,Ae),l.push(Ue,ee,Ae),Me+=6}o.addGroup(f,Me,B),f+=Me,m+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Lr=class i extends _t{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],p=[],m=[],f=[],g=0,y=[],d=n/2,h=0;M(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new ct(p,3)),this.setAttribute("normal",new ct(m,3)),this.setAttribute("uv",new ct(f,2));function M(){let x=new C,A=new C,R=0,_=(t-e)/n;for(let w=0;w<=r;w++){let B=[],L=w/r,F=L*(t-e)+e;for(let W=0;W<=s;W++){let se=W/s,N=se*l+o,Z=Math.sin(N),te=Math.cos(N);A.x=F*Z,A.y=-L*n+d,A.z=F*te,p.push(A.x,A.y,A.z),x.set(Z,_,te).normalize(),m.push(x.x,x.y,x.z),f.push(se,1-L),B.push(g++)}y.push(B)}for(let w=0;w<s;w++)for(let B=0;B<r;B++){let L=y[B][w],F=y[B+1][w],W=y[B+1][w+1],se=y[B][w+1];(e>0||B!==0)&&(u.push(L,F,se),R+=3),(t>0||B!==r-1)&&(u.push(F,W,se),R+=3)}c.addGroup(h,R,0),h+=R}function b(x){let A=g,R=new pe,_=new C,w=0,B=x===!0?e:t,L=x===!0?1:-1;for(let W=1;W<=s;W++)p.push(0,d*L,0),m.push(0,L,0),f.push(.5,.5),g++;let F=g;for(let W=0;W<=s;W++){let N=W/s*l+o,Z=Math.cos(N),te=Math.sin(N);_.x=B*te,_.y=d*L,_.z=B*Z,p.push(_.x,_.y,_.z),m.push(0,L,0),R.x=Z*.5+.5,R.y=te*.5*L+.5,f.push(R.x,R.y),g++}for(let W=0;W<s;W++){let se=A+W,N=F+W;x===!0?u.push(N,N+1,se):u.push(N+1,N,se),w+=3}c.addGroup(h,w,x===!0?1:2),h+=w}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Ka=new C,Ja=new C,_c=new C,$a=new $n,vi=class extends _t{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(ws*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],p=new Array(3),m=new Map,f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:y,b:d,c:h}=$a;if(y.fromBufferAttribute(o,c[0]),d.fromBufferAttribute(o,c[1]),h.fromBufferAttribute(o,c[2]),$a.getNormal(_c),p[0]=`${Math.round(y.x*s)},${Math.round(y.y*s)},${Math.round(y.z*s)}`,p[1]=`${Math.round(d.x*s)},${Math.round(d.y*s)},${Math.round(d.z*s)}`,p[2]=`${Math.round(h.x*s)},${Math.round(h.y*s)},${Math.round(h.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let M=0;M<3;M++){let b=(M+1)%3,x=p[M],A=p[b],R=$a[u[M]],_=$a[u[b]],w=`${x}_${A}`,B=`${A}_${x}`,L=m.get(B);L?(_c.dot(L.normal)<=r&&(f.push(R.x,R.y,R.z),f.push(_.x,_.y,_.z)),m.set(B,null)):m.has(w)||m.set(w,{index0:c[M],index1:c[b],normal:_c.clone()})}}for(let g of m.values())if(g){let{index0:y,index1:d}=g;Ka.fromBufferAttribute(o,y),Ja.fromBufferAttribute(o,d),f.push(Ka.x,Ka.y,Ka.z),f.push(Ja.x,Ja.y,Ja.z)}this.setAttribute("position",new ct(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},En=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Je("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let u=n[s],m=n[s+1]-u,f=(a-u)/m;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new pe:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new C,s=[],r=[],a=[],o=new C,l=new lt;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),p=Math.abs(s[0].y),m=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),p<=c&&(c=p,n.set(0,1,0)),m<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(rt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(rt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},Ns=class extends En{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new pe){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),p=Math.sin(this.aRotation),m=l-this.aX,f=c-this.aY;l=m*u-f*p+this.aX,c=m*p+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},bo=class extends Ns{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function nh(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,p){let m=(a-r)/c-(o-r)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+p)+(l-o)/p;m*=u,f*=u,s(a,o,m,f)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var nu=new C,iu=new C,xc=new nh,vc=new nh,yc=new nh,Xn=class extends En{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new C){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(iu.subVectors(s[0],s[1]).add(s[0]),c=iu);let p=s[o%r],m=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(nu.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=nu),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(p),f),y=Math.pow(p.distanceToSquared(m),f),d=Math.pow(m.distanceToSquared(u),f);y<1e-4&&(y=1),g<1e-4&&(g=y),d<1e-4&&(d=y),xc.initNonuniformCatmullRom(c.x,p.x,m.x,u.x,g,y,d),vc.initNonuniformCatmullRom(c.y,p.y,m.y,u.y,g,y,d),yc.initNonuniformCatmullRom(c.z,p.z,m.z,u.z,g,y,d)}else this.curveType==="catmullrom"&&(xc.initCatmullRom(c.x,p.x,m.x,u.x,this.tension),vc.initCatmullRom(c.y,p.y,m.y,u.y,this.tension),yc.initCatmullRom(c.z,p.z,m.z,u.z,this.tension));return n.set(xc.calc(l),vc.calc(l),yc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new C().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function su(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function Qf(i,e){let t=1-i;return t*t*e}function ep(i,e){return 2*(1-i)*i*e}function tp(i,e){return i*i*e}function ur(i,e,t,n){return Qf(i,e)+ep(i,t)+tp(i,n)}function np(i,e){let t=1-i;return t*t*t*e}function ip(i,e){let t=1-i;return 3*t*t*i*e}function sp(i,e){return 3*(1-i)*i*i*e}function rp(i,e){return i*i*i*e}function dr(i,e,t,n,s){return np(i,e)+ip(i,t)+sp(i,n)+rp(i,s)}var Dr=class extends En{constructor(e=new pe,t=new pe,n=new pe,s=new pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new pe){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(dr(e,s.x,r.x,a.x,o.x),dr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Eo=class extends En{constructor(e=new C,t=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new C){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(dr(e,s.x,r.x,a.x,o.x),dr(e,s.y,r.y,a.y,o.y),dr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Nr=class extends En{constructor(e=new pe,t=new pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new pe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},To=class extends En{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ur=class extends En{constructor(e=new pe,t=new pe,n=new pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new pe){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ur(e,s.x,r.x,a.x),ur(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fr=class extends En{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ur(e,s.x,r.x,a.x),ur(e,s.y,r.y,a.y),ur(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Or=class extends En{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new pe){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],p=s[a>s.length-3?s.length-1:a+2];return n.set(su(o,l.x,c.x,u.x,p.x),su(o,l.y,c.y,u.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new pe().fromArray(s))}return this}},wo=Object.freeze({__proto__:null,ArcCurve:bo,CatmullRomCurve3:Xn,CubicBezierCurve:Dr,CubicBezierCurve3:Eo,EllipseCurve:Ns,LineCurve:Nr,LineCurve3:To,QuadraticBezierCurve:Ur,QuadraticBezierCurve3:Fr,SplineCurve:Or}),Ao=class extends En{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new wo[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},Qi=class extends Ao{constructor(e){super(),this.type="Path",this.currentPoint=new pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Nr(this.currentPoint.clone(),new pe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Ur(this.currentPoint.clone(),new pe(e,t),new pe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new Dr(this.currentPoint.clone(),new pe(e,t),new pe(n,s),new pe(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Or(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){let c=new Ns(e,t,n,s,r,a,o,l);if(this.curves.length>0){let p=c.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ni=class extends Qi{constructor(e){super(e),this.uuid=Ti(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Qi().fromJSON(s))}return this}};function ap(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Qu(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=up(i,e,r,t)),i.length>80*t){o=i[0],l=i[1];let u=o,p=l;for(let m=t;m<s;m+=t){let f=i[m],g=i[m+1];f<o&&(o=f),g<l&&(l=g),f>u&&(u=f),g>p&&(p=g)}c=Math.max(u-o,p-l),c=c!==0?32767/c:0}return Br(r,a,t,o,l,c,0),a}function Qu(i,e,t,n,s){let r;if(s===Sp(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=ru(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=ru(a/n|0,i[a],i[a+1],r);return r&&Us(r,r.next)&&(kr(r),r=r.next),r}function es(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Us(t,t.next)||Nt(t.prev,t,t.next)===0)){if(kr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Br(i,e,t,n,s,r,a){if(!i)return;!a&&r&&gp(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?lp(i,n,s,r):op(i)){e.push(l.i,i.i,c.i),kr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=cp(es(i),e),Br(i,e,t,n,s,r,2)):a===2&&hp(i,e,t,n,s,r):Br(es(i),e,t,n,s,r,1);break}}}function op(i){let e=i.prev,t=i,n=i.next;if(Nt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(s,r,a),p=Math.min(o,l,c),m=Math.max(s,r,a),f=Math.max(o,l,c),g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=m&&g.y>=p&&g.y<=f&&cr(s,o,r,l,a,c,g.x,g.y)&&Nt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function lp(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Nt(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,u=s.y,p=r.y,m=a.y,f=Math.min(o,l,c),g=Math.min(u,p,m),y=Math.max(o,l,c),d=Math.max(u,p,m),h=Ac(f,g,e,t,n),M=Ac(y,d,e,t,n),b=i.prevZ,x=i.nextZ;for(;b&&b.z>=h&&x&&x.z<=M;){if(b.x>=f&&b.x<=y&&b.y>=g&&b.y<=d&&b!==s&&b!==a&&cr(o,u,l,p,c,m,b.x,b.y)&&Nt(b.prev,b,b.next)>=0||(b=b.prevZ,x.x>=f&&x.x<=y&&x.y>=g&&x.y<=d&&x!==s&&x!==a&&cr(o,u,l,p,c,m,x.x,x.y)&&Nt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;b&&b.z>=h;){if(b.x>=f&&b.x<=y&&b.y>=g&&b.y<=d&&b!==s&&b!==a&&cr(o,u,l,p,c,m,b.x,b.y)&&Nt(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;x&&x.z<=M;){if(x.x>=f&&x.x<=y&&x.y>=g&&x.y<=d&&x!==s&&x!==a&&cr(o,u,l,p,c,m,x.x,x.y)&&Nt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function cp(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Us(n,s)&&td(n,t,t.next,s)&&zr(n,s)&&zr(s,n)&&(e.push(n.i,t.i,s.i),kr(t),kr(t.next),t=i=s),t=t.next}while(t!==i);return es(t)}function hp(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&vp(a,o)){let l=nd(a,o);a=es(a,a.next),l=es(l,l.next),Br(a,e,t,n,s,r,0),Br(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function up(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=Qu(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(xp(c))}s.sort(dp);for(let r=0;r<s.length;r++)t=fp(s[r],t);return t}function dp(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function fp(i,e){let t=pp(i,e);if(!t)return e;let n=nd(t,i);return es(n,n.next),es(t,t.next)}function pp(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(Us(i,t))return t;do{if(Us(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let p=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>r&&(r=p,a=t.x<t.next.x?t:t.next,p===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&ed(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let p=Math.abs(s-t.y)/(n-t.x);zr(t,i)&&(p<u||p===u&&(t.x>a.x||t.x===a.x&&mp(a,t)))&&(a=t,u=p)}t=t.next}while(t!==o);return a}function mp(i,e){return Nt(i.prev,i,e.prev)<0&&Nt(e.next,i,i.next)<0}function gp(i,e,t,n){let s=i;do s.z===0&&(s.z=Ac(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,_p(s)}function _p(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Ac(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function xp(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function ed(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function cr(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&ed(i,e,t,n,s,r,a,o)}function vp(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!yp(i,e)&&(zr(i,e)&&zr(e,i)&&Mp(i,e)&&(Nt(i.prev,i,e.prev)||Nt(i,e.prev,e))||Us(i,e)&&Nt(i.prev,i,i.next)>0&&Nt(e.prev,e,e.next)>0)}function Nt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Us(i,e){return i.x===e.x&&i.y===e.y}function td(i,e,t,n){let s=Qa(Nt(i,e,t)),r=Qa(Nt(i,e,n)),a=Qa(Nt(t,n,i)),o=Qa(Nt(t,n,e));return!!(s!==r&&a!==o||s===0&&ja(i,t,e)||r===0&&ja(i,n,e)||a===0&&ja(t,i,n)||o===0&&ja(t,e,n))}function ja(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Qa(i){return i>0?1:i<0?-1:0}function yp(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&td(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function zr(i,e){return Nt(i.prev,i,i.next)<0?Nt(i,e,i.next)>=0&&Nt(i,i.prev,e)>=0:Nt(i,e,i.prev)<0||Nt(i,i.next,e)<0}function Mp(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function nd(i,e){let t=Rc(i.i,i.x,i.y),n=Rc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function ru(i,e,t,n){let s=Rc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function kr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Rc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Sp(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Cc=class{static triangulate(e,t,n=2){return ap(e,t,n)}},Qn=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];au(e),ou(n,e);let a=e.length;t.forEach(au);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,ou(n,t[l]);let o=Cc.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function au(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function ou(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Fi=class i extends _t{constructor(e=new ni([new pe(.5,.5),new pe(-.5,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new ct(s,3)),this.setAttribute("uv",new ct(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1,m=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,d=t.bevelSegments!==void 0?t.bevelSegments:3,h=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:bp,b,x=!1,A,R,_,w;if(h){b=h.getSpacedPoints(u),x=!0,m=!1;let X=h.isCatmullRomCurve3?h.closed:!1;A=h.computeFrenetFrames(u,X),R=new C,_=new C,w=new C}m||(d=0,f=0,g=0,y=0);let B=o.extractPoints(c),L=B.shape,F=B.holes;if(!Qn.isClockWise(L)){L=L.reverse();for(let X=0,xe=F.length;X<xe;X++){let me=F[X];Qn.isClockWise(me)&&(F[X]=me.reverse())}}function se(X){let me=10000000000000001e-36,Se=X[0];for(let ue=1;ue<=X.length;ue++){let He=ue%X.length,ze=X[He],tt=ze.x-Se.x,Te=ze.y-Se.y,ut=tt*tt+Te*Te,O=Math.max(Math.abs(ze.x),Math.abs(ze.y),Math.abs(Se.x),Math.abs(Se.y)),Tt=me*O*O;if(ut<=Tt){X.splice(He,1),ue--;continue}Se=ze}}se(L),F.forEach(se);let N=F.length,Z=L;for(let X=0;X<N;X++){let xe=F[X];L=L.concat(xe)}function te(X,xe,me){return xe||$e("ExtrudeGeometry: vec does not exist"),X.clone().addScaledVector(xe,me)}let K=L.length;function Me(X,xe,me){let Se,ue,He,ze=X.x-xe.x,tt=X.y-xe.y,Te=me.x-X.x,ut=me.y-X.y,O=ze*ze+tt*tt,Tt=ze*ut-tt*Te;if(Math.abs(Tt)>Number.EPSILON){let nt=Math.sqrt(O),xt=Math.sqrt(Te*Te+ut*ut),Ce=xe.x-tt/nt,re=xe.y+ze/nt,_e=me.x-ut/xt,Ie=me.y+Te/xt,T=((_e-Ce)*ut-(Ie-re)*Te)/(ze*ut-tt*Te);Se=Ce+ze*T-X.x,ue=re+tt*T-X.y;let v=Se*Se+ue*ue;if(v<=2)return new pe(Se,ue);He=Math.sqrt(v/2)}else{let nt=!1;ze>Number.EPSILON?Te>Number.EPSILON&&(nt=!0):ze<-Number.EPSILON?Te<-Number.EPSILON&&(nt=!0):Math.sign(tt)===Math.sign(ut)&&(nt=!0),nt?(Se=-tt,ue=ze,He=Math.sqrt(O)):(Se=ze,ue=tt,He=Math.sqrt(O/2))}return new pe(Se/He,ue/He)}let q=[];for(let X=0,xe=Z.length,me=xe-1,Se=X+1;X<xe;X++,me++,Se++)me===xe&&(me=0),Se===xe&&(Se=0),q[X]=Me(Z[X],Z[me],Z[Se]);let fe=[],he,Pe=q.concat();for(let X=0,xe=N;X<xe;X++){let me=F[X];he=[];for(let Se=0,ue=me.length,He=ue-1,ze=Se+1;Se<ue;Se++,He++,ze++)He===ue&&(He=0),ze===ue&&(ze=0),he[Se]=Me(me[Se],me[He],me[ze]);fe.push(he),Pe=Pe.concat(he)}let Ue;if(d===0)Ue=Qn.triangulateShape(Z,F);else{let X=[],xe=[];for(let me=0;me<d;me++){let Se=me/d,ue=f*Math.cos(Se*Math.PI/2),He=g*Math.sin(Se*Math.PI/2)+y;for(let ze=0,tt=Z.length;ze<tt;ze++){let Te=te(Z[ze],q[ze],He);Oe(Te.x,Te.y,-ue),Se===0&&X.push(Te)}for(let ze=0,tt=N;ze<tt;ze++){let Te=F[ze];he=fe[ze];let ut=[];for(let O=0,Tt=Te.length;O<Tt;O++){let nt=te(Te[O],he[O],He);Oe(nt.x,nt.y,-ue),Se===0&&ut.push(nt)}Se===0&&xe.push(ut)}}Ue=Qn.triangulateShape(X,xe)}let ee=Ue.length,Ae=g+y;for(let X=0;X<K;X++){let xe=m?te(L[X],Pe[X],Ae):L[X];x?(_.copy(A.normals[0]).multiplyScalar(xe.x),R.copy(A.binormals[0]).multiplyScalar(xe.y),w.copy(b[0]).add(_).add(R),Oe(w.x,w.y,w.z)):Oe(xe.x,xe.y,0)}for(let X=1;X<=u;X++)for(let xe=0;xe<K;xe++){let me=m?te(L[xe],Pe[xe],Ae):L[xe];x?(_.copy(A.normals[X]).multiplyScalar(me.x),R.copy(A.binormals[X]).multiplyScalar(me.y),w.copy(b[X]).add(_).add(R),Oe(w.x,w.y,w.z)):Oe(me.x,me.y,p/u*X)}for(let X=d-1;X>=0;X--){let xe=X/d,me=f*Math.cos(xe*Math.PI/2),Se=g*Math.sin(xe*Math.PI/2)+y;for(let ue=0,He=Z.length;ue<He;ue++){let ze=te(Z[ue],q[ue],Se);Oe(ze.x,ze.y,p+me)}for(let ue=0,He=F.length;ue<He;ue++){let ze=F[ue];he=fe[ue];for(let tt=0,Te=ze.length;tt<Te;tt++){let ut=te(ze[tt],he[tt],Se);x?Oe(ut.x,ut.y+b[u-1].y,b[u-1].x+me):Oe(ut.x,ut.y,p+me)}}}de(),ke();function de(){let X=s.length/3;if(m){let xe=0,me=K*xe;for(let Se=0;Se<ee;Se++){let ue=Ue[Se];ht(ue[2]+me,ue[1]+me,ue[0]+me)}xe=u+d*2,me=K*xe;for(let Se=0;Se<ee;Se++){let ue=Ue[Se];ht(ue[0]+me,ue[1]+me,ue[2]+me)}}else{for(let xe=0;xe<ee;xe++){let me=Ue[xe];ht(me[2],me[1],me[0])}for(let xe=0;xe<ee;xe++){let me=Ue[xe];ht(me[0]+K*u,me[1]+K*u,me[2]+K*u)}}n.addGroup(X,s.length/3-X,0)}function ke(){let X=s.length/3,xe=0;Re(Z,xe),xe+=Z.length;for(let me=0,Se=F.length;me<Se;me++){let ue=F[me];Re(ue,xe),xe+=ue.length}n.addGroup(X,s.length/3-X,1)}function Re(X,xe){let me=X.length;for(;--me>=0;){let Se=me,ue=me-1;ue<0&&(ue=X.length-1);for(let He=0,ze=u+d*2;He<ze;He++){let tt=K*He,Te=K*(He+1),ut=xe+Se+tt,O=xe+ue+tt,Tt=xe+ue+Te,nt=xe+Se+Te;Be(ut,O,Tt,nt)}}}function Oe(X,xe,me){l.push(X),l.push(xe),l.push(me)}function ht(X,xe,me){Ze(X),Ze(xe),Ze(me);let Se=s.length/3,ue=M.generateTopUV(n,s,Se-3,Se-2,Se-1);le(ue[0]),le(ue[1]),le(ue[2])}function Be(X,xe,me,Se){Ze(X),Ze(xe),Ze(Se),Ze(xe),Ze(me),Ze(Se);let ue=s.length/3,He=M.generateSideWallUV(n,s,ue-6,ue-3,ue-2,ue-1);le(He[0]),le(He[1]),le(He[3]),le(He[1]),le(He[2]),le(He[3])}function Ze(X){s.push(l[X*3+0]),s.push(l[X*3+1]),s.push(l[X*3+2])}function le(X){r.push(X.x),r.push(X.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Ep(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new wo[s.type]().fromJSON(s)),new i(n,e.options)}},bp={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],u=e[s*3+1];return[new pe(r,a),new pe(o,l),new pe(c,u)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],p=e[n*3+2],m=e[s*3],f=e[s*3+1],g=e[s*3+2],y=e[r*3],d=e[r*3+1],h=e[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new pe(a,1-l),new pe(c,1-p),new pe(m,1-g),new pe(y,1-h)]:[new pe(o,1-l),new pe(u,1-p),new pe(f,1-g),new pe(d,1-h)]}};function Ep(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var yi=class i extends _t{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,p=e/o,m=t/l,f=[],g=[],y=[],d=[];for(let h=0;h<u;h++){let M=h*m-a;for(let b=0;b<c;b++){let x=b*p-r;g.push(x,-M,0),y.push(0,0,1),d.push(b/o),d.push(1-h/l)}}for(let h=0;h<l;h++)for(let M=0;M<o;M++){let b=M+c*h,x=M+c*(h+1),A=M+1+c*(h+1),R=M+1+c*h;f.push(b,x,R),f.push(x,A,R)}this.setIndex(f),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(y,3)),this.setAttribute("uv",new ct(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Hr=class i extends _t{constructor(e=new ni([new pe(0,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new ct(s,3)),this.setAttribute("normal",new ct(r,3)),this.setAttribute("uv",new ct(a,2));function c(u){let p=s.length/3,m=u.extractPoints(t),f=m.shape,g=m.holes;Qn.isClockWise(f)===!1&&(f=f.reverse());for(let d=0,h=g.length;d<h;d++){let M=g[d];Qn.isClockWise(M)===!0&&(g[d]=M.reverse())}let y=Qn.triangulateShape(f,g);for(let d=0,h=g.length;d<h;d++){let M=g[d];f=f.concat(M)}for(let d=0,h=f.length;d<h;d++){let M=f[d];s.push(M.x,M.y,0),r.push(0,0,1),a.push(M.x,M.y)}for(let d=0,h=y.length;d<h;d++){let M=y[d],b=M[0]+p,x=M[1]+p,A=M[2]+p;n.push(b,x,A),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Tp(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let a=t[e.shapes[s]];n.push(a)}return new i(n,e.curveSegments)}};function Tp(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}var Vr=class i extends _t{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],p=new C,m=new C,f=[],g=[],y=[],d=[];for(let h=0;h<=n;h++){let M=[],b=h/n,x=a+b*o,A=e*Math.cos(x),R=Math.sqrt(e*e-A*A),_=0;h===0&&a===0?_=.5/t:h===n&&l===Math.PI&&(_=-.5/t);for(let w=0;w<=t;w++){let B=w/t,L=s+B*r;p.x=-R*Math.cos(L),p.y=A,p.z=R*Math.sin(L),g.push(p.x,p.y,p.z),m.copy(p).normalize(),y.push(m.x,m.y,m.z),d.push(B+_,1-b),M.push(c++)}u.push(M)}for(let h=0;h<n;h++)for(let M=0;M<t;M++){let b=u[h][M+1],x=u[h][M],A=u[h+1][M],R=u[h+1][M+1];(h!==0||a>0)&&f.push(b,x,R),(h!==n-1||l<Math.PI)&&f.push(x,A,R)}this.setIndex(f),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(y,3)),this.setAttribute("uv",new ct(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Yn=class i extends _t{constructor(e=new Fr(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new C,l=new C,c=new pe,u=new C,p=[],m=[],f=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new ct(p,3)),this.setAttribute("normal",new ct(m,3)),this.setAttribute("uv",new ct(f,2));function y(){for(let b=0;b<t;b++)d(b);d(r===!1?t:0),M(),h()}function d(b){u=e.getPointAt(b/t,u);let x=a.normals[b],A=a.binormals[b];for(let R=0;R<=s;R++){let _=R/s*Math.PI*2,w=Math.sin(_),B=-Math.cos(_);l.x=B*x.x+w*A.x,l.y=B*x.y+w*A.y,l.z=B*x.z+w*A.z,l.normalize(),m.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,p.push(o.x,o.y,o.z)}}function h(){for(let b=1;b<=t;b++)for(let x=1;x<=s;x++){let A=(s+1)*(b-1)+(x-1),R=(s+1)*b+(x-1),_=(s+1)*b+x,w=(s+1)*(b-1)+x;g.push(A,R,w),g.push(R,_,w)}}function M(){for(let b=0;b<=t;b++)for(let x=0;x<=s;x++)c.x=b/t,c.y=x/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new wo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function as(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(lu(s))s.isRenderTargetTexture?(Je("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(lu(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function on(i){let e={};for(let t=0;t<i.length;t++){let n=as(i[t]);for(let s in n)e[s]=n[s]}return e}function lu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function wp(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ih(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}var wi={clone:as,merge:on},Ap=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Rp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Lt=class extends Gn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ap,this.fragmentShader=Rp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=as(e.uniforms),this.uniformsGroups=wp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ke().setHex(s.value);break;case"v2":this.uniforms[n].value=new pe().fromArray(s.value);break;case"v3":this.uniforms[n].value=new C().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Pt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Qe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new lt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Fs=class extends Lt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Tn=class extends Gn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Al,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Gr=class extends Tn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new pe(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return rt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Ke(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ke(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ke(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return $i('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){$i('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ro=class extends Gn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Co=class extends Gn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function bs(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function eo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Oi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Io=class extends Oi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:bc,endingEnd:bc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ec:r=e,o=2*t-n;break;case Tc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ec:a=e,l=2*n-t;break;case Tc:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,p=this._offsetNext,m=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),y=g*g,d=y*g,h=-m*d+2*m*y-m*g,M=(1+m)*d+(-1.5-2*m)*y+(-.5+m)*g+1,b=(-1-f)*d+(1.5+f)*y+.5*g,x=f*d-f*y;for(let A=0;A!==o;++A)r[A]=h*a[u+A]+M*a[c+A]+b*a[l+A]+x*a[p+A];return r}},Po=class extends Oi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),p=1-u;for(let m=0;m!==o;++m)r[m]=a[c+m]*p+a[l+m]*u;return r}},Lo=class extends Oi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Do=class extends Oi{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.inTangents,p=this.outTangents;if(!u||!p){let g=(n-t)/(s-t),y=1-g;for(let d=0;d!==o;++d)r[d]=a[c+d]*y+a[l+d]*g;return r}let m=o*2,f=e-1;for(let g=0;g!==o;++g){let y=a[c+g],d=a[l+g],h=f*m+g*2,M=p[h],b=p[h+1],x=e*m+g*2,A=u[x],R=u[x+1],_=Ip(n,t,M,A,s);r[g]=id(_,y,b,R,d)}return r}};function id(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Cp(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Ip(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=id(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let l=Cp(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var wn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=bs(t,this.TimeBufferType),this.values=bs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:bs(e.times,Array),values:bs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),eo(e.settings)&&(n.settings={inTangents:bs(e.settings.inTangents,Array),outTangents:bs(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Lo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Po(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Io(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Do(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case fr:t=this.InterpolantFactoryMethodDiscrete;break;case mo:t=this.InterpolantFactoryMethodLinear;break;case io:t=this.InterpolantFactoryMethodSmooth;break;case Sc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Je("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fr;case this.InterpolantFactoryMethodLinear:return mo;case this.InterpolantFactoryMethodSmooth:return io;case this.InterpolantFactoryMethodBezier:return Sc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;eo(this.settings)&&(cu(this.settings.inTangents,e),cu(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;eo(this.settings)&&(hu(this.settings.inTangents,e),hu(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&($e("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&($e("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){$e("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){$e("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&xf(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){$e("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===io,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let p=o*n,m=p-n,f=p+n;for(let g=0;g!==n;++g){let y=t[p+g];if(y!==t[m+g]||y!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let p=o*n,m=a*n;for(let f=0;f!==n;++f)t[m+f]=t[p+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,eo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function cu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function hu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}wn.prototype.ValueTypeName="";wn.prototype.TimeBufferType=Float32Array;wn.prototype.ValueBufferType=Float32Array;wn.prototype.DefaultInterpolation=mo;var Bi=class extends wn{constructor(e,t,n){super(e,t,n)}};Bi.prototype.ValueTypeName="bool";Bi.prototype.ValueBufferType=Array;Bi.prototype.DefaultInterpolation=fr;Bi.prototype.InterpolantFactoryMethodLinear=void 0;Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var No=class extends wn{constructor(e,t,n,s){super(e,t,n,s)}};No.prototype.ValueTypeName="color";var Uo=class extends wn{constructor(e,t,n,s){super(e,t,n,s)}};Uo.prototype.ValueTypeName="number";var Fo=class extends Oi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)fn.slerpFlat(r,0,a,c-o,a,c,l);return r}},Wr=class extends wn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Fo(this.times,this.values,this.getValueSize(),e)}};Wr.prototype.ValueTypeName="quaternion";Wr.prototype.InterpolantFactoryMethodSmooth=void 0;var zi=class extends wn{constructor(e,t,n){super(e,t,n)}};zi.prototype.ValueTypeName="string";zi.prototype.ValueBufferType=Array;zi.prototype.DefaultInterpolation=fr;zi.prototype.InterpolantFactoryMethodLinear=void 0;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var Oo=class extends wn{constructor(e,t,n,s){super(e,t,n,s)}};Oo.prototype.ValueTypeName="vector";var Bo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,p){return c.push(u,p),this},this.removeHandler=function(u){let p=c.indexOf(u);return p!==-1&&c.splice(p,2),this},this.getHandler=function(u){for(let p=0,m=c.length;p<m;p+=2){let f=c[p],g=c[p+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},sd=new Bo,zo=class{constructor(e){this.manager=e!==void 0?e:sd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};zo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Os=class extends Ut{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Xr=class extends Os{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Mc=new lt,uu=new C,du=new C,Yr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pe(512,512),this.mapType=_n,this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ni,this._frameExtents=new pe(1,1),this._viewportCount=1,this._viewports=[new Pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;uu.setFromMatrixPosition(e.matrixWorld),t.position.copy(uu),du.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(du),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Mc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Mc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Cs||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Mc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},to=new C,no=new fn,Jn=new C,qr=class extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=Ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(to,no,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(to,no,Jn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(to,no,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(to,no,Jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Li=new C,fu=new pe,pu=new pe,rn=class extends qr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ps*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ws*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ps*2*Math.atan(Math.tan(ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Li.x,Li.y).multiplyScalar(-e/Li.z),Li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Li.x,Li.y).multiplyScalar(-e/Li.z)}getViewSize(e,t){return this.getViewBounds(e,fu,pu),t.subVectors(pu,fu)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ws*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ic=class extends Yr{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0}},Zr=class extends Os{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ic}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},ts=class extends qr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Pc=class extends Yr{constructor(){super(new ts(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Bs=class extends Os{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.shadow=new Pc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Es=-90,Ts=1,zs=class extends Ut{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new rn(Es,Ts,e,t);s.layers=this.layers,this.add(s);let r=new rn(Es,Ts,e,t);r.layers=this.layers,this.add(r);let a=new rn(Es,Ts,e,t);a.layers=this.layers,this.add(a);let o=new rn(Es,Ts,e,t);o.layers=this.layers,this.add(o);let l=new rn(Es,Ts,e,t);l.layers=this.layers,this.add(l);let c=new rn(Es,Ts,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Cs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,p=e.getRenderTarget(),m=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let d=!1;e.isWebGLRenderer===!0?d=e.state.buffers.depth.getReversed():d=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=y,e.setRenderTarget(n,5,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(p,m,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},ko=class extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Kr=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Pp.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Pp(){this._document.hidden===!1&&this.reset()}var sh="\\[\\]\\.:\\/",Lp=new RegExp("["+sh+"]","g"),rh="[^"+sh+"]",Dp="[^"+sh.replace("\\.","")+"]",Np=/((?:WC+[\/:])*)/.source.replace("WC",rh),Up=/(WCOD+)?/.source.replace("WCOD",Dp),Fp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rh),Op=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rh),Bp=new RegExp("^"+Np+Up+Fp+Op+"$"),zp=["material","materials","bones","map"],Lc=class{constructor(e,t,n){let s=n||Ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ct=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Lp,"")}static parseTrackName(e){let t=Bp.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);zp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Je("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){$e("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){$e("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){$e("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){$e("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){$e("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;$e("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ct.Composite=Lc;Ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ct.prototype.GetterByBindingType=[Ct.prototype._getValue_direct,Ct.prototype._getValue_array,Ct.prototype._getValue_arrayElement,Ct.prototype._getValue_toArray];Ct.prototype.SetterByBindingTypeAndVersioning=[[Ct.prototype._setValue_direct,Ct.prototype._setValue_direct_setNeedsUpdate,Ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_array,Ct.prototype._setValue_array_setNeedsUpdate,Ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_arrayElement,Ct.prototype._setValue_arrayElement_setNeedsUpdate,Ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_fromArray,Ct.prototype._setValue_fromArray_setNeedsUpdate,Ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ev=new Float32Array(1);var ks=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=rt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(rt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Dc=class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var Jr=class extends Vn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function ah(i,e,t,n){let s=kp(n);switch(t){case Xc:return i*e;case qo:return i*e/s.components*s.byteLength;case Zo:return i*e/s.components*s.byteLength;case Gi:return i*e*2/s.components*s.byteLength;case Ko:return i*e*2/s.components*s.byteLength;case Yc:return i*e*3/s.components*s.byteLength;case Zn:return i*e*4/s.components*s.byteLength;case Jo:return i*e*4/s.components*s.byteLength;case ra:case aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case oa:case la:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case jo:case el:return Math.max(i,16)*Math.max(e,8)/4;case $o:case Qo:return Math.max(i,8)*Math.max(e,8)/2;case tl:case nl:case sl:case rl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case il:case ca:case al:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ol:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ll:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case cl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case hl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ul:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case dl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case pl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ml:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case gl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case xl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case vl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case yl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ml:case Sl:case bl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case El:case Tl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ha:case wl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function kp(i){switch(i){case _n:case Hc:return{byteLength:1,components:1};case Ws:case Vc:case jt:return{byteLength:2,components:1};case Xo:case Yo:return{byteLength:2,components:4};case qn:case Wo:case Un:return{byteLength:4,components:1};case Gc:case Wc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Je("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function wd(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Vp(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,p=c.byteLength,m=i.createBuffer();i.bindBuffer(l,m),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:m,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function n(o,l,c){let u=l.array,p=l.updateRanges;if(i.bindBuffer(c,o),p.length===0)i.bufferSubData(c,0,u);else{p.sort((f,g)=>f.start-g.start);let m=0;for(let f=1;f<p.length;f++){let g=p[m],y=p[f];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++m,p[m]=y)}p.length=m+1;for(let f=0,g=p.length;f<g;f++){let y=p[f];i.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Gp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Xp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Jp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$p=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,jp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,em=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,nm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,im=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,sm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,rm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,am=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,cm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,hm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,um=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,dm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,fm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,pm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_m=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xm="gl_FragColor = linearToOutputTexel( gl_FragColor );",vm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ym=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Mm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Sm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,bm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Em=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Tm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Am=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Im=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Nm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Um=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Om=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,km=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Hm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Vm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Gm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wm=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Xm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ym=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Km=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$m=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,jm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,eg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ng=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ig=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,rg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ag=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,og=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,lg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ug=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,dg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,pg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_g=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,xg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Eg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Tg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ag=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Rg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Cg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ig=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Lg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Dg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ng=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ug=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Fg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Og=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Hg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Vg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xg=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Kg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Jg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,$g=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Qg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,t0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,n0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,i0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,r0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,o0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,c0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,h0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,u0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,f0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,m0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,_0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,x0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,y0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,M0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ot={alphahash_fragment:Gp,alphahash_pars_fragment:Wp,alphamap_fragment:Xp,alphamap_pars_fragment:Yp,alphatest_fragment:qp,alphatest_pars_fragment:Zp,aomap_fragment:Kp,aomap_pars_fragment:Jp,batching_pars_vertex:$p,batching_vertex:jp,begin_vertex:Qp,beginnormal_vertex:em,bsdfs:tm,iridescence_fragment:nm,bumpmap_pars_fragment:im,clipping_planes_fragment:sm,clipping_planes_pars_fragment:rm,clipping_planes_pars_vertex:am,clipping_planes_vertex:om,color_fragment:lm,color_pars_fragment:cm,color_pars_vertex:hm,color_vertex:um,common:dm,defaultnormal_vertex:fm,displacementmap_pars_vertex:pm,displacementmap_vertex:mm,emissivemap_fragment:gm,emissivemap_pars_fragment:_m,colorspace_fragment:xm,colorspace_pars_fragment:vm,envmap_fragment:ym,envmap_common_pars_fragment:Mm,envmap_pars_fragment:Sm,envmap_pars_vertex:bm,envmap_physical_pars_fragment:Nm,envmap_vertex:Em,fog_vertex:Tm,fog_pars_vertex:wm,fog_fragment:Am,fog_pars_fragment:Rm,gradientmap_pars_fragment:Cm,lightmap_pars_fragment:Im,lights_lambert_fragment:Pm,lights_lambert_pars_fragment:Lm,lights_pars_begin:Dm,lights_toon_fragment:Um,lights_toon_pars_fragment:Fm,lights_phong_fragment:Om,lights_phong_pars_fragment:Bm,lights_physical_fragment:zm,lights_physical_pars_fragment:km,lights_fragment_begin:Hm,lights_fragment_maps:Vm,lights_fragment_end:Gm,lightprobes_pars_fragment:Wm,logdepthbuf_fragment:Xm,logdepthbuf_pars_fragment:Ym,logdepthbuf_pars_vertex:qm,logdepthbuf_vertex:Zm,map_fragment:Km,map_pars_fragment:Jm,map_particle_fragment:$m,map_particle_pars_fragment:jm,metalnessmap_fragment:Qm,metalnessmap_pars_fragment:eg,morphinstance_vertex:tg,morphcolor_vertex:ng,morphnormal_vertex:ig,morphtarget_pars_vertex:sg,morphtarget_vertex:rg,normal_fragment_begin:ag,normal_fragment_maps:og,normal_pars_fragment:lg,normal_pars_vertex:cg,normal_vertex:hg,normalmap_pars_fragment:ug,clearcoat_normal_fragment_begin:dg,clearcoat_normal_fragment_maps:fg,clearcoat_pars_fragment:pg,iridescence_pars_fragment:mg,opaque_fragment:gg,packing:_g,premultiplied_alpha_fragment:xg,project_vertex:vg,dithering_fragment:yg,dithering_pars_fragment:Mg,roughnessmap_fragment:Sg,roughnessmap_pars_fragment:bg,shadowmap_pars_fragment:Eg,shadowmap_pars_vertex:Tg,shadowmap_vertex:wg,shadowmask_pars_fragment:Ag,skinbase_vertex:Rg,skinning_pars_vertex:Cg,skinning_vertex:Ig,skinnormal_vertex:Pg,specularmap_fragment:Lg,specularmap_pars_fragment:Dg,tonemapping_fragment:Ng,tonemapping_pars_fragment:Ug,transmission_fragment:Fg,transmission_pars_fragment:Og,uv_pars_fragment:Bg,uv_pars_vertex:zg,uv_vertex:kg,worldpos_vertex:Hg,background_vert:Vg,background_frag:Gg,backgroundCube_vert:Wg,backgroundCube_frag:Xg,cube_vert:Yg,cube_frag:qg,depth_vert:Zg,depth_frag:Kg,distance_vert:Jg,distance_frag:$g,equirect_vert:jg,equirect_frag:Qg,linedashed_vert:e0,linedashed_frag:t0,meshbasic_vert:n0,meshbasic_frag:i0,meshlambert_vert:s0,meshlambert_frag:r0,meshmatcap_vert:a0,meshmatcap_frag:o0,meshnormal_vert:l0,meshnormal_frag:c0,meshphong_vert:h0,meshphong_frag:u0,meshphysical_vert:d0,meshphysical_frag:f0,meshtoon_vert:p0,meshtoon_frag:m0,points_vert:g0,points_frag:_0,shadow_vert:x0,shadow_frag:v0,sprite_vert:y0,sprite_frag:M0},Ne={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},ri={basic:{uniforms:on([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:on([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Ke(0)},envMapIntensity:{value:1}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:on([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:on([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:on([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new Ke(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:on([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:on([Ne.points,Ne.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:on([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:on([Ne.common,Ne.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:on([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:on([Ne.sprite,Ne.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distance:{uniforms:on([Ne.common,Ne.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distance_vert,fragmentShader:ot.distance_frag},shadow:{uniforms:on([Ne.lights,Ne.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};ri.physical={uniforms:on([ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Qe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};var Cl={r:0,b:0,g:0},S0=new lt,Ad=new Qe;Ad.set(-1,0,0,0,1,0,0,0,1);function b0(i,e,t,n,s,r){let a=new Ke(0),o=s===!0?0:1,l,c,u=null,p=0,m=null;function f(M){let b=M.isScene===!0?M.background:null;if(b&&b.isTexture){let x=M.backgroundBlurriness>0;b=e.get(b,x)}return b}function g(M){let b=!1,x=f(M);x===null?d(a,o):x&&x.isColor&&(d(x,1),b=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(M,b){let x=f(b);x&&x.isCubeTexture?(c===void 0&&(c=new ft(new an(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:as(ri.backgroundCube.uniforms),vertexShader:ri.backgroundCube.vertexShader,fragmentShader:ri.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,R,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(S0.makeRotationFromEuler(b.backgroundRotation)).transpose(),x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Ad),c.material.toneMapped=dt.getTransfer(x.colorSpace)!==vt,(u!==x||p!==x.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,p=x.version,m=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new ft(new yi(2,2),new Lt({name:"BackgroundMaterial",uniforms:as(ri.background.uniforms),vertexShader:ri.background.vertexShader,fragmentShader:ri.background.fragmentShader,side:Vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=dt.getTransfer(x.colorSpace)!==vt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||p!==x.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,p=x.version,m=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function d(M,b){M.getRGB(Cl,ih(i)),t.buffers.color.setClear(Cl.r,Cl.g,Cl.b,b,r)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,b=1){a.set(M),o=b,d(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,d(a,o)},render:g,addToRenderList:y,dispose:h}}function E0(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=m(null),r=s,a=!1;function o(F,W,se,N,Z){let te=!1,K=p(F,N,se,W);r!==K&&(r=K,c(r.object)),te=f(F,N,se,Z),te&&g(F,N,se,Z),Z!==null&&e.update(Z,i.ELEMENT_ARRAY_BUFFER),(te||a)&&(a=!1,x(F,W,se,N),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function l(){return i.createVertexArray()}function c(F){return i.bindVertexArray(F)}function u(F){return i.deleteVertexArray(F)}function p(F,W,se,N){let Z=N.wireframe===!0,te=n[W.id];te===void 0&&(te={},n[W.id]=te);let K=F.isInstancedMesh===!0?F.id:0,Me=te[K];Me===void 0&&(Me={},te[K]=Me);let q=Me[se.id];q===void 0&&(q={},Me[se.id]=q);let fe=q[Z];return fe===void 0&&(fe=m(l()),q[Z]=fe),fe}function m(F){let W=[],se=[],N=[];for(let Z=0;Z<t;Z++)W[Z]=0,se[Z]=0,N[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:se,attributeDivisors:N,object:F,attributes:{},index:null}}function f(F,W,se,N){let Z=r.attributes,te=W.attributes,K=0,Me=se.getAttributes();for(let q in Me)if(Me[q].location>=0){let he=Z[q],Pe=te[q];if(Pe===void 0&&(q==="instanceMatrix"&&F.instanceMatrix&&(Pe=F.instanceMatrix),q==="instanceColor"&&F.instanceColor&&(Pe=F.instanceColor)),he===void 0||he.attribute!==Pe||Pe&&he.data!==Pe.data)return!0;K++}return r.attributesNum!==K||r.index!==N}function g(F,W,se,N){let Z={},te=W.attributes,K=0,Me=se.getAttributes();for(let q in Me)if(Me[q].location>=0){let he=te[q];he===void 0&&(q==="instanceMatrix"&&F.instanceMatrix&&(he=F.instanceMatrix),q==="instanceColor"&&F.instanceColor&&(he=F.instanceColor));let Pe={};Pe.attribute=he,he&&he.data&&(Pe.data=he.data),Z[q]=Pe,K++}r.attributes=Z,r.attributesNum=K,r.index=N}function y(){let F=r.newAttributes;for(let W=0,se=F.length;W<se;W++)F[W]=0}function d(F){h(F,0)}function h(F,W){let se=r.newAttributes,N=r.enabledAttributes,Z=r.attributeDivisors;se[F]=1,N[F]===0&&(i.enableVertexAttribArray(F),N[F]=1),Z[F]!==W&&(i.vertexAttribDivisor(F,W),Z[F]=W)}function M(){let F=r.newAttributes,W=r.enabledAttributes;for(let se=0,N=W.length;se<N;se++)W[se]!==F[se]&&(i.disableVertexAttribArray(se),W[se]=0)}function b(F,W,se,N,Z,te,K){K===!0?i.vertexAttribIPointer(F,W,se,Z,te):i.vertexAttribPointer(F,W,se,N,Z,te)}function x(F,W,se,N){y();let Z=N.attributes,te=se.getAttributes(),K=W.defaultAttributeValues;for(let Me in te){let q=te[Me];if(q.location>=0){let fe=Z[Me];if(fe===void 0&&(Me==="instanceMatrix"&&F.instanceMatrix&&(fe=F.instanceMatrix),Me==="instanceColor"&&F.instanceColor&&(fe=F.instanceColor)),fe!==void 0){let he=fe.normalized,Pe=fe.itemSize,Ue=e.get(fe);if(Ue===void 0)continue;let ee=Ue.buffer,Ae=Ue.type,de=Ue.bytesPerElement,ke=Ae===i.INT||Ae===i.UNSIGNED_INT||fe.gpuType===Wo;if(fe.isInterleavedBufferAttribute){let Re=fe.data,Oe=Re.isInterleavedBuffer===!0?Re.stride:Re.itemSize,ht=fe.offset;if(Re.isInstancedInterleavedBuffer||Re.isInstancedBufferAttribute){for(let Be=0;Be<q.locationSize;Be++)h(q.location+Be,Re.meshPerAttribute);F.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Re.meshPerAttribute*Re.count)}else for(let Be=0;Be<q.locationSize;Be++)d(q.location+Be);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let Be=0;Be<q.locationSize;Be++)b(q.location+Be,Pe/q.locationSize,Ae,he,Oe*de,(ht+Pe/q.locationSize*Be)*de,ke)}else{if(fe.isInstancedBufferAttribute){for(let Re=0;Re<q.locationSize;Re++)h(q.location+Re,fe.meshPerAttribute);F.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let Re=0;Re<q.locationSize;Re++)d(q.location+Re);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let Re=0;Re<q.locationSize;Re++)b(q.location+Re,Pe/q.locationSize,Ae,he,Pe*de,Pe/q.locationSize*Re*de,ke)}}else if(K!==void 0){let he=K[Me];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(q.location,he);break;case 3:i.vertexAttrib3fv(q.location,he);break;case 4:i.vertexAttrib4fv(q.location,he);break;default:i.vertexAttrib1fv(q.location,he)}}}}M()}function A(){B();for(let F in n){let W=n[F];for(let se in W){let N=W[se];for(let Z in N){let te=N[Z];for(let K in te)u(te[K].object),delete te[K];delete N[Z]}}delete n[F]}}function R(F){if(n[F.id]===void 0)return;let W=n[F.id];for(let se in W){let N=W[se];for(let Z in N){let te=N[Z];for(let K in te)u(te[K].object),delete te[K];delete N[Z]}}delete n[F.id]}function _(F){for(let W in n){let se=n[W];for(let N in se){let Z=se[N];if(Z[F.id]===void 0)continue;let te=Z[F.id];for(let K in te)u(te[K].object),delete te[K];delete Z[F.id]}}}function w(F){for(let W in n){let se=n[W],N=F.isInstancedMesh===!0?F.id:0,Z=se[N];if(Z!==void 0){for(let te in Z){let K=Z[te];for(let Me in K)u(K[Me].object),delete K[Me];delete Z[te]}delete se[N],Object.keys(se).length===0&&delete n[W]}}}function B(){L(),a=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:B,resetDefaultState:L,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfObject:w,releaseStatesOfProgram:_,initAttributes:y,enableAttribute:d,disableUnusedAttributes:M}}function T0(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let m=0;for(let f=0;f<u;f++)m+=c[f];t.update(m,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function w0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let _=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(_){return!(_!==Zn&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(_){let w=_===jt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(_!==_n&&_!==Un&&!w&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(_){if(_==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Je("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=t.logarithmicDepthBuffer===!0&&p===!1;t.reversedDepthBuffer===!0&&p===!1&&Je("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&p===!0&&Je("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),R=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:m,reversedDepthBuffer:p,maxTextures:f,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:d,maxAttributes:h,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:x,maxSamples:A,samples:R}}function A0(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Mn,o=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){let f=p.length!==0||m||n!==0||s;return s=m,n=p.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,m){t=u(p,m,0)},this.setState=function(p,m,f){let g=p.clippingPlanes,y=p.clipIntersection,d=p.clipShadows,h=i.get(p);if(!s||g===null||g.length===0||r&&!d)r?u(null):c();else{let M=r?0:n,b=M*4,x=h.clippingState||null;l.value=x,x=u(g,m,b,f);for(let A=0;A!==b;++A)x[A]=t[A];h.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(p,m,f,g){let y=p!==null?p.length:0,d=null;if(y!==0){if(d=l.value,g!==!0||d===null){let h=f+y*4,M=m.matrixWorldInverse;o.getNormalMatrix(M),(d===null||d.length<h)&&(d=new Float32Array(h));for(let b=0,x=f;b!==y;++b,x+=4)a.copy(p[b]).applyMatrix4(M,o),a.normal.toArray(d,x),d[x+3]=a.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,d}}var fa=class extends zt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Rr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new an(5,5,5),r=new Lt({name:"CubemapFromEquirect",uniforms:as(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:mn,blending:Mi});r.uniforms.tEquirect.value=t;let a=new ft(s,r),o=t.minFilter;return t.minFilter===Si&&(t.minFilter=dn),new zs(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},rd=256,R0=3,C0=20,Rd=256,Cd=16,I0=3,P0=new C,L0=new Ke,Pl=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new zs(1,10,null),this._boxMesh=new ft(new an(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=P0}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);let p=l.autoClear,m=l.autoClearColor,f=l.autoClearDepth,g=l.autoClearStencil,y=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,y===null&&(e.background=l.getClearColor(L0));let d=new zs(n,s,u);return d.position.copy(o),d.update(l,e),l.autoClear=p,l.autoClearColor=m,l.autoClearDepth=f,l.autoClearStencil=g,e.background=y,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ld(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=od(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(rd,Qc(e))}_fromTexture(e,t){e.mapping===ss||e.mapping===Gs?this._setSize(e.image.length===0?rd:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=ad(e,!1,!1),n=Math.log2(e)-R0;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=ad(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===ss||e.mapping===Gs?(this._cubemapMaterial===null&&(this._cubemapMaterial=ld()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=od()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=D0(),this._integrationMaterial=N0());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Cd);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-I0)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let l=o>0?Math.log2(t)+.5*Math.log2(6/(Rd*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=U0());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function ad(i,e,t){return new fa(i,{minFilter:Si,generateMipmaps:e,type:jt,colorSpace:pr,depthBuffer:t})}function pa(i,e,t){return new Lt({name:i,uniforms:e,vertexShader:ot.cube_vert,fragmentShader:t,side:mn,blending:Mi,depthTest:!1,depthWrite:!1})}function D0(){return pa("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Rd}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function N0(){return pa("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Cd}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function U0(){return pa("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${C0}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function od(){return pa("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function ld(){return pa("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function F0(i){let e=new WeakMap,t=new WeakMap,n=null;function s(m,f=!1){return m==null?null:f?a(m):r(m)}function r(m){if(m&&m.isTexture){let f=m.mapping;if(f===Ho||f===Vo)if(e.has(m)){let g=e.get(m).texture;return o(g,m.mapping)}else{let g=m.image;if(g&&g.height>0){let y=new fa(g.height);return y.fromEquirectangularTexture(i,m),e.set(m,y),m.addEventListener("dispose",c),o(y.texture,m.mapping)}else return null}}return m}function a(m){if(m&&m.isTexture&&m.isPMREMTexture!==!0){let f=m.mapping,g=f===Ho||f===Vo,y=f===ss||f===Gs;if(g||y){let d=t.get(m),h=d!==void 0?d.texture.pmremVersion:0;if(m.isRenderTargetTexture&&m.pmremVersion!==h)return n===null&&(n=new Pl(i)),d=g?n.fromEquirectangular(m,d):n.fromCubemap(m,d),d.texture.pmremVersion=m.pmremVersion,t.set(m,d),d.texture;if(d!==void 0)return d.texture;{let M=m.image;return g&&M&&M.height>0||y&&M&&l(M)?(n===null&&(n=new Pl(i)),d=g?n.fromEquirectangular(m):n.fromCubemap(m),d.texture.pmremVersion=m.pmremVersion,t.set(m,d),m.addEventListener("dispose",u),d.texture):null}}}return m}function o(m,f){return f===Ho?m.mapping=ss:f===Vo&&(m.mapping=Gs),m}function l(m){let f=0,g=6;for(let y=0;y<g;y++)m[y]!==void 0&&f++;return f===g}function c(m){let f=m.target;f.removeEventListener("dispose",c);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function u(m){let f=m.target;f.removeEventListener("dispose",u);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function p(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function O0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&$i("WebGLRenderer: "+n+" extension not supported."),s}}}function B0(i,e,t,n){let s={},r=new WeakMap,a=new FinalizationRegistry(g=>delete s[g]);function o(g){l(g.target)}function l(g){g.index!==null&&e.remove(g.index);for(let d in g.attributes)e.remove(g.attributes[d]);g.removeEventListener("dispose",o),delete s[g.id],a.unregister(g);let y=r.get(g);y&&(e.remove(y),r.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function c(g,y){return s[y.id]!==void 0||(y.addEventListener("dispose",o),s[y.id]=new WeakRef(y),a.register(y,y.id,y),t.memory.geometries++),y}function u(g){let y=g.attributes;for(let d in y)e.update(y[d],i.ARRAY_BUFFER)}function p(g){let y=g.index,d=g.attributes.position,h=0;if(d===void 0)return;let M=y!==null?y.array.length:d.array.length/3-1,b=d.count>=65535?br:Sr,x=new b(Math.ceil(M/3)*6,1),A=x.array;if(y!==null){let _=y.array;h=y.version;for(let w=0,B=0;w<M;w+=3){let L=_[w+0],F=_[w+1],W=_[w+2];A[B++]=L,A[B++]=F,A[B++]=F,A[B++]=W,A[B++]=W,A[B++]=L}}else{h=d.version;for(let _=0,w=0;_<M;_+=3){let B=_+0,L=_+1,F=_+2;A[w++]=B,A[w++]=L,A[w++]=L,A[w++]=F,A[w++]=F,A[w++]=B}}x.version=h;let R=r.get(g);R&&e.remove(R),r.set(g,x)}function m(g){let y=r.get(g);if(y){let d=g.index;d!==null&&y.version<d.version&&p(g)}else p(g);return r.get(g)}function f(){for(let g in s){let y=s[g].deref();y!==void 0&&l(y)}}return{get:c,update:u,getWireframeAttribute:m,dispose:f}}function z0(i,e,t){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,m){i.drawElements(n,m,r,p*a),t.update(m,n,1)}function c(p,m,f){f!==0&&(i.drawElementsInstanced(n,m,r,p*a,f),t.update(m,n,f))}function u(p,m,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,p,0,f);let y=0;for(let d=0;d<f;d++)y+=m[d];t.update(y,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function k0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:$e("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function H0(i,e,t){let n=new WeakMap,s=new Pt;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=u!==void 0?u.length:0,m=n.get(o);if(m===void 0||m.count!==p){let B=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",B)};m!==void 0&&m.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],b=0;f===!0&&(b=1),g===!0&&(b=2),y===!0&&(b=3);let x=o.attributes.position.count*b,A=1;x>e.maxTextureSize&&(A=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let R=new Float32Array(x*A*4*p),_=new xr(R,x,A,p);_.type=Un,_.needsUpdate=!0;let w=b*4;for(let L=0;L<p;L++){let F=d[L],W=h[L],se=M[L],N=x*A*4*L;for(let Z=0;Z<F.count;Z++){let te=Z*w;f===!0&&(s.fromBufferAttribute(F,Z),R[N+te+0]=s.x,R[N+te+1]=s.y,R[N+te+2]=s.z,R[N+te+3]=0),g===!0&&(s.fromBufferAttribute(W,Z),R[N+te+4]=s.x,R[N+te+5]=s.y,R[N+te+6]=s.z,R[N+te+7]=0),y===!0&&(s.fromBufferAttribute(se,Z),R[N+te+8]=s.x,R[N+te+9]=s.y,R[N+te+10]=s.z,R[N+te+11]=se.itemSize===4?s.w:1)}}m={count:p,texture:_,size:new pe(x,A)},n.set(o,m),o.addEventListener("dispose",B)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",m.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}return{update:r}}function V0(i,e,t,n,s){let r=new WeakMap;function a(c){let u=s.render.frame,p=c.geometry,m=e.get(c,p);if(r.get(m)!==u&&(e.update(m),r.set(m,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return m}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var G0={[jr]:"LINEAR_TONE_MAPPING",[Qr]:"REINHARD_TONE_MAPPING",[ea]:"CINEON_TONE_MAPPING",[is]:"ACES_FILMIC_TONE_MAPPING",[na]:"AGX_TONE_MAPPING",[ia]:"NEUTRAL_TONE_MAPPING",[ta]:"CUSTOM_TONE_MAPPING"};function W0(i,e,t,n,s,r){let a=new zt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,u=new _t;u.setAttribute("position",new ct([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new ct([0,2,0,0,2,0],2));let p=new Fs({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),m=new ft(u,p),f=new ts(-1,1,1,-1,0,1),g=null,y=null,d=!1,h,M=null,b=[],x=!1;this.setSize=function(A,R){a.setSize(A,R),o!==null&&o.setSize(A,R),l!==null&&l.setSize(A,R);for(let _=0;_<b.length;_++){let w=b[_];w.setSize&&w.setSize(A,R)}},this.setEffects=function(A){b=A,x=b.length>0&&b[0].isRenderPass===!0;let R=a.width,_=a.height;b.length>0&&o===null&&(o=new zt(R,_,{type:jt,depthBuffer:!1,stencilBuffer:!1}),l=new zt(R,_,{type:jt,depthBuffer:!1,stencilBuffer:!1}));let w=s===!0&&b.some(B=>B.needsDepthTexture===!0);w!==(a.depthTexture!==null)&&(w===!0&&c===null&&(c=new xi(R,_),r===!0&&(c.format=bi,c.type=rs)),a.dispose(),a.depthTexture=w?c:null,a.resolveDepthBuffer=w,a.storeMultisampledDepthBuffer=w);for(let B=0;B<b.length;B++){let L=b[B];L.setSize&&L.setSize(R,_),w&&L.needsDepthTexture===!0&&L.setDepthTexture&&L.setDepthTexture(c)}},this.begin=function(A,R){if(d||A.toneMapping===ii&&b.length===0)return!1;if(M=R,R!==null){let _=R.width,w=R.height;(a.width!==_||a.height!==w)&&this.setSize(_,w)}return x===!1&&A.setRenderTarget(a),h=A.toneMapping,A.toneMapping=ii,!0},this.hasRenderPass=function(){return x},this.end=function(A,R){A.toneMapping=h,d=!0;let _=a,w=o;for(let B=0;B<b.length;B++){let L=b[B];L.enabled!==!1&&(L.render(A,w,_,R),L.needsSwap!==!1&&(_=w,w=w===o?l:o))}if(g!==A.outputColorSpace||y!==A.toneMapping){g=A.outputColorSpace,y=A.toneMapping,p.defines={},dt.getTransfer(g)===vt&&(p.defines.SRGB_TRANSFER="");let B=G0[y];B&&(p.defines[B]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=_.texture,A.setRenderTarget(M),A.render(m,f),M=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),u.dispose(),p.dispose()}}var Id=new pn,Pd=new xi(1,1),Ld=new Ir(1),Dd=new xr,Nd=new xo,Ud=new Rr,cd=[],hd=[],ud=new Float32Array(16),dd=new Float32Array(9),fd=new Float32Array(4);function Ys(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=cd[s];if(r===void 0&&(r=new Float32Array(s),cd[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Ht(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Dl(i,e){let t=hd[e];t===void 0&&(t=new Int32Array(e),hd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function X0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Y0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function q0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function Z0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function K0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;fd.set(n),i.uniformMatrix2fv(this.addr,!1,fd),Vt(t,n)}}function J0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;dd.set(n),i.uniformMatrix3fv(this.addr,!1,dd),Vt(t,n)}}function $0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;ud.set(n),i.uniformMatrix4fv(this.addr,!1,ud),Vt(t,n)}}function j0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Q0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function e_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function t_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function n_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function i_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function s_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function r_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function Nl(i){return i.version===0&&(i.compareFunction=Kc,i.needsUpdate=!0),i}function a_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Nl(Pd):r=Id,t.setTexture2D(e||r,s)}function o_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Nd,s)}function l_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Nl(Ld):r=Ud,t.setTextureCube(e||r,s)}function c_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Dd,s)}function h_(i){switch(i){case 5126:return X0;case 35664:return Y0;case 35665:return q0;case 35666:return Z0;case 35674:return K0;case 35675:return J0;case 35676:return $0;case 5124:case 35670:return j0;case 35667:case 35671:return Q0;case 35668:case 35672:return e_;case 35669:case 35673:return t_;case 5125:return n_;case 36294:return i_;case 36295:return s_;case 36296:return r_;case 35678:case 36198:case 36298:case 36306:case 35682:return a_;case 35679:case 36299:case 36307:return o_;case 35680:case 36300:case 36308:case 36293:return l_;case 36289:case 36303:case 36311:case 36292:return c_}}function u_(i,e){i.uniform1fv(this.addr,e)}function d_(i,e){let t=Ys(e,this.size,2);i.uniform2fv(this.addr,t)}function f_(i,e){let t=Ys(e,this.size,3);i.uniform3fv(this.addr,t)}function p_(i,e){let t=Ys(e,this.size,4);i.uniform4fv(this.addr,t)}function m_(i,e){let t=Ys(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function g_(i,e){let t=Ys(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function __(i,e){let t=Ys(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function x_(i,e){i.uniform1iv(this.addr,e)}function v_(i,e){i.uniform2iv(this.addr,e)}function y_(i,e){i.uniform3iv(this.addr,e)}function M_(i,e){i.uniform4iv(this.addr,e)}function S_(i,e){i.uniform1uiv(this.addr,e)}function b_(i,e){i.uniform2uiv(this.addr,e)}function E_(i,e){i.uniform3uiv(this.addr,e)}function T_(i,e){i.uniform4uiv(this.addr,e)}function w_(i,e,t){let n=this.cache,s=e.length,r=Dl(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Nl(Pd):a=Id;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function A_(i,e,t){let n=this.cache,s=e.length,r=Dl(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Nd,r[a])}function R_(i,e,t){let n=this.cache,s=e.length,r=Dl(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=Nl(Ld):a=Ud;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function C_(i,e,t){let n=this.cache,s=e.length,r=Dl(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Dd,r[a])}function I_(i){switch(i){case 5126:return u_;case 35664:return d_;case 35665:return f_;case 35666:return p_;case 35674:return m_;case 35675:return g_;case 35676:return __;case 5124:case 35670:return x_;case 35667:case 35671:return v_;case 35668:case 35672:return y_;case 35669:case 35673:return M_;case 5125:return S_;case 36294:return b_;case 36295:return E_;case 36296:return T_;case 35678:case 36198:case 36298:case 36306:case 35682:return w_;case 35679:case 36299:case 36307:return A_;case 35680:case 36300:case 36308:case 36293:return R_;case 36289:case 36303:case 36311:case 36292:return C_}}var ch=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=h_(t.type)}},hh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=I_(t.type)}},uh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},oh=/(\w+)(\])?(\[|\.)?/g;function pd(i,e){i.seq.push(e),i.map[e.id]=e}function P_(i,e,t){let n=i.name,s=n.length;for(oh.lastIndex=0;;){let r=oh.exec(n),a=oh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){pd(t,c===void 0?new ch(o,i,e):new hh(o,i,e));break}else{let p=t.map[o];p===void 0&&(p=new uh(o),pd(t,p)),t=p}}}var Xs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);P_(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function md(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var L_=37297,D_=0;function N_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var gd=new Qe;function U_(i){dt._getMatrix(gd,dt.workingColorSpace,i);let e=`mat3( ${gd.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(i)){case mr:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return Je("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function _d(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+N_(i.getShaderSource(e),o)}else return r}function F_(i,e){let t=U_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var O_={[jr]:"Linear",[Qr]:"Reinhard",[ea]:"Cineon",[is]:"ACESFilmic",[na]:"AgX",[ia]:"Neutral",[ta]:"Custom"};function B_(i,e){let t=O_[e];return t===void 0?(Je("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Il=new C;function z_(){dt.getLuminanceCoefficients(Il);let i=Il.x.toFixed(4),e=Il.y.toFixed(4),t=Il.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function k_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(da).join(`
`)}function H_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function V_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function da(i){return i!==""}function xd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function vd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var G_=/^[ \t]*#include +<([\w\d./]+)>/gm;function dh(i){return i.replace(G_,W_)}function W_(i,e){let t=ot[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return dh(t)}var X_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yd(i){return i.replace(X_,Y_)}function Y_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Md(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var q_={[$r]:"SHADOWMAP_TYPE_PCF",[Hs]:"SHADOWMAP_TYPE_VSM"};function Z_(i){return q_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var K_={[Gs]:"ENVMAP_MODE_REFRACTION"};function J_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":K_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var $_={[zc]:"ENVMAP_BLENDING_MULTIPLY",[Fu]:"ENVMAP_BLENDING_MIX",[Ou]:"ENVMAP_BLENDING_ADD"};function j_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":$_[i.combine]||"ENVMAP_BLENDING_NONE"}function Q_(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Z_(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=J_(t),p=j_(t),m=k_(t),f=H_(r),g=s.createProgram(),y,d,h=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(da).join(`
`),y.length>0&&(y+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(da).join(`
`),d.length>0&&(d+=`
`)):(y=[Md(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(da).join(`
`),d=[Md(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+p:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ii?"#define TONE_MAPPING":"",t.toneMapping!==ii?ot.tonemapping_pars_fragment:"",t.toneMapping!==ii?B_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,F_("linearToOutputTexel",t.outputColorSpace),z_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(da).join(`
`)),a=dh(a),a=xd(a,t),a=vd(a,t),o=dh(o),o=xd(o,t),o=vd(o,t),a=yd(a),o=yd(o),t.isRawShaderMaterial!==!0&&(h=`#version 300 es
`,y=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,d=["#define varying in",t.glslVersion===$c?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$c?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let M=h+y+a,b=h+d+o,x=md(s,s.VERTEX_SHADER,M),A=md(s,s.FRAGMENT_SHADER,b);s.attachShader(g,x),s.attachShader(g,A),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function R(L){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(g)||"",W=s.getShaderInfoLog(x)||"",se=s.getShaderInfoLog(A)||"",N=F.trim(),Z=W.trim(),te=se.trim(),K=!0,Me=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,x,A);else{let q=_d(s,x,"vertex"),fe=_d(s,A,"fragment");$e("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+N+`
`+q+`
`+fe)}else N!==""?Je("WebGLProgram: Program Info Log:",N):(Z===""||te==="")&&(Me=!1);Me&&(L.diagnostics={runnable:K,programLog:N,vertexShader:{log:Z,prefix:y},fragmentShader:{log:te,prefix:d}})}s.deleteShader(x),s.deleteShader(A),_=new Xs(s,g),w=V_(s,g)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=s.getProgramParameter(g,L_)),B},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=D_++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=x,this.fragmentShader=A,this}var ex=0,fh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ph(e),t.set(e,n)),n}},ph=class{constructor(e){this.id=ex++,this.code=e,this.usedTimes=0}};function tx(i){return i===Gi||i===ca||i===ha}function nx(i,e,t,n,s,r){let a=new vr,o=new fh,l=new Set,c=[],u=new Map,p=n.logarithmicDepthBuffer,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(_){return l.add(_),_===0?"uv":`uv${_}`}function g(_,w,B,L,F,W){let se=L.fog,N=F.geometry,Z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?L.environment:null,te=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,K=e.get(_.envMap||Z,te),Me=m[_.type],q=n.precision;_.precision!==null&&(q=n.getMaxPrecision(_.precision),q!==_.precision&&Je("WebGLProgram.getParameters:",_.precision,"not supported, using",q,"instead."));let fe=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,he=fe!==void 0?fe.length:0,Pe=0;N.morphAttributes.position!==void 0&&(Pe=1),N.morphAttributes.normal!==void 0&&(Pe=2),N.morphAttributes.color!==void 0&&(Pe=3);let Ue,ee,Ae,de;if(Me){let j=ri[Me];Ue=j.vertexShader,ee=j.fragmentShader}else{Ue=_.vertexShader,ee=_.fragmentShader;let j=o.getVertexShaderStage(_),ye=o.getFragmentShaderStage(_);o.update(_,j,ye),Ae=j.id,de=ye.id}let ke=i.getRenderTarget(),Re=i.state.buffers.depth.getReversed(),Oe=F.isInstancedMesh===!0,ht=F.isBatchedMesh===!0,Be=!!_.map,Ze=!!_.matcap,le=!!K,X=le&&K.isPMREMTexture===!0,xe=!!_.aoMap,me=!!_.lightMap,Se=!!_.bumpMap&&_.wireframe===!1,ue=!!_.normalMap,He=!!_.displacementMap,ze=!!_.emissiveMap,tt=!!_.metalnessMap,Te=!!_.roughnessMap,ut=_.anisotropy>0,O=_.clearcoat>0,Tt=_.diffuseRoughness>0,nt=_.dispersion>0,xt=_.retroreflectivity>0,Ce=_.iridescence>0,re=_.sheen>0,_e=_.transmission>0,Ie=ut&&!!_.anisotropyMap,T=O&&!!_.clearcoatMap,v=O&&!!_.clearcoatNormalMap,P=O&&!!_.clearcoatRoughnessMap,ae=Tt&&!!_.diffuseRoughnessMap,V=Ce&&!!_.iridescenceMap,ie=Ce&&!!_.iridescenceThicknessMap,U=re&&!!_.sheenColorMap,k=re&&!!_.sheenRoughnessMap,G=!!_.specularMap,ce=!!_.specularColorMap,S=!!_.specularIntensityMap,I=_e&&!!_.transmissionMap,Y=_e&&!!_.thicknessMap,be=!!_.gradientMap,Ee=!!_.alphaMap,ve=_.alphaTest>0,we=!!_.alphaHash,H=!!_.extensions,D=ii;_.toneMapped&&(ke===null||ke.isXRRenderTarget===!0)&&(D=i.toneMapping);let ne=X?K.isCompressedCubeTexture?K.image[0].mipmaps:K.mipmaps:null,J={shaderID:Me,shaderType:_.type,shaderName:_.name,vertexShader:Ue,fragmentShader:ee,defines:_.defines,customVertexShaderID:Ae,customFragmentShaderID:de,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:q,batching:ht,batchingColor:ht&&F._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&F.instanceColor!==null,instancingMorph:Oe&&F.morphTexture!==null,outputColorSpace:ke===null?i.outputColorSpace:ke.isXRRenderTarget===!0?ke.texture.colorSpace:dt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Be,matcap:Ze,envMap:le,envMapMode:le&&K.mapping,envMapPMREM:X,envMapMaxLod:X?ne.length-1:null,envMapSize:X?ne[0].width:null,aoMap:xe,lightMap:me,bumpMap:Se,normalMap:ue,displacementMap:He,emissiveMap:ze,normalMapObjectSpace:ue&&_.normalMapType===ku,normalMapTangentSpace:ue&&_.normalMapType===Al,packedNormalMap:ue&&_.normalMapType===Al&&tx(_.normalMap.format),metalnessMap:tt,roughnessMap:Te,anisotropy:ut,anisotropyMap:Ie,clearcoat:O,clearcoatMap:T,clearcoatNormalMap:v,clearcoatRoughnessMap:P,diffuseRoughness:Tt,diffuseRoughnessMap:ae,dispersion:nt,retroreflection:xt,iridescence:Ce,iridescenceMap:V,iridescenceThicknessMap:ie,sheen:re,sheenColorMap:U,sheenRoughnessMap:k,specularMap:G,specularColorMap:ce,specularIntensityMap:S,transmission:_e,transmissionMap:I,thicknessMap:Y,gradientMap:be,opaque:_.transparent===!1&&_.blending===Vs&&_.alphaToCoverage===!1,alphaMap:Ee,alphaTest:ve,alphaHash:we,combine:_.combine,mapUv:Be&&f(_.map.channel),aoMapUv:xe&&f(_.aoMap.channel),lightMapUv:me&&f(_.lightMap.channel),bumpMapUv:Se&&f(_.bumpMap.channel),normalMapUv:ue&&f(_.normalMap.channel),displacementMapUv:He&&f(_.displacementMap.channel),emissiveMapUv:ze&&f(_.emissiveMap.channel),metalnessMapUv:tt&&f(_.metalnessMap.channel),roughnessMapUv:Te&&f(_.roughnessMap.channel),anisotropyMapUv:Ie&&f(_.anisotropyMap.channel),clearcoatMapUv:T&&f(_.clearcoatMap.channel),clearcoatNormalMapUv:v&&f(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:P&&f(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ae&&f(_.diffuseRoughnessMap.channel),iridescenceMapUv:V&&f(_.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&f(_.iridescenceThicknessMap.channel),sheenColorMapUv:U&&f(_.sheenColorMap.channel),sheenRoughnessMapUv:k&&f(_.sheenRoughnessMap.channel),specularMapUv:G&&f(_.specularMap.channel),specularColorMapUv:ce&&f(_.specularColorMap.channel),specularIntensityMapUv:S&&f(_.specularIntensityMap.channel),transmissionMapUv:I&&f(_.transmissionMap.channel),thicknessMapUv:Y&&f(_.thicknessMap.channel),alphaMapUv:Ee&&f(_.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(ue||ut),vertexNormals:!!N.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!N.attributes.uv&&(Be||Ee),fog:!!se,useFog:_.fog===!0,fogExp2:!!se&&se.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||N.attributes.normal===void 0&&ue===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Re,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:Pe,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:W.filter(j=>j.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&B.length>0,shadowMapType:i.shadowMap.type,toneMapping:D,decodeVideoTexture:Be&&_.map.isVideoTexture===!0&&dt.getTransfer(_.map.colorSpace)===vt,decodeVideoTextureEmissive:ze&&_.emissiveMap.isVideoTexture===!0&&dt.getTransfer(_.emissiveMap.colorSpace)===vt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===gn,flipSided:_.side===mn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:H&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(H&&_.extensions.multiDraw===!0||ht)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return J.vertexUv1s=l.has(1),J.vertexUv2s=l.has(2),J.vertexUv3s=l.has(3),l.clear(),J}function y(_){let w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(let B in _.defines)w.push(B),w.push(_.defines[B]);return _.isRawShaderMaterial===!1&&(d(w,_),h(w,_),w.push(i.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function d(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapPMREM),_.push(w.envMapMaxLod),_.push(w.envMapSize),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.diffuseRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.numSunLights),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numSunLightShadows),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.numLightProbeGrids),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function h(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.diffuseRoughness&&a.enable(25),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function M(_){let w=m[_.type],B;if(w){let L=ri[w];B=wi.clone(L.uniforms)}else B=_.uniforms;return B}function b(_,w){let B=u.get(w);return B!==void 0?++B.usedTimes:(B=new Q_(i,w,_,s),c.push(B),u.set(w,B)),B}function x(_){if(--_.usedTimes===0){let w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function A(_){o.remove(_)}function R(){o.dispose()}return{getParameters:g,getProgramCacheKey:y,getUniforms:M,acquireProgram:b,releaseProgram:x,releaseShaderCache:A,programs:c,dispose:R}}function ix(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function sx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Sd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(m){let f=0;return m.isInstancedMesh&&(f+=2),m.isSkinnedMesh&&(f+=1),f}function o(m,f,g,y,d,h){let M=i[e];return M===void 0?(M={id:m.id,object:m,geometry:f,material:g,materialVariant:a(m),groupOrder:y,renderOrder:m.renderOrder,z:d,group:h},i[e]=M):(M.id=m.id,M.object=m,M.geometry=f,M.material=g,M.materialVariant=a(m),M.groupOrder=y,M.renderOrder=m.renderOrder,M.z=d,M.group=h),e++,M}function l(m,f,g,y,d,h,M){M.reversedDepth===!0&&(d=-d);let b=o(m,f,g,y,d,h);g.transmission>0?n.push(b):g.transparent===!0?s.push(b):t.push(b)}function c(m,f,g,y,d,h){let M=o(m,f,g,y,d,h);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):t.unshift(M)}function u(m,f){t.length>1&&t.sort(m||sx),n.length>1&&n.sort(f||Sd),s.length>1&&s.sort(f||Sd)}function p(){for(let m=e,f=i.length;m<f;m++){let g=i[m];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:p,sort:u}}function rx(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new bd,i.set(n,[a])):s>=r.length?(a=new bd,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function ax(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new C,color:new Ke};break;case"SpotLight":t={position:new C,direction:new C,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function ox(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var lx=0;function cx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function hx(i){let e=new ax,t=ox(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);let s=new C,r=new lt,a=new lt;function o(c){let u=0,p=0,m=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let f=0,g=0,y=0,d=0,h=0,M=0,b=0,x=0,A=0,R=0,_=0,w=0,B=0,L=0;c.sort(cx);for(let W=0,se=c.length;W<se;W++){let N=c[W],Z=N.color,te=N.intensity,K=N.distance,Me=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Gi?Me=N.shadow.map.texture:Me=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=Z.r*te,p+=Z.g*te,m+=Z.b*te;else if(N.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(N.sh.coefficients[q],te);L++}else if(N.isSunLight){let q=e.get(N);if(q.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let fe=N.shadow,he=t.get(N);he.shadowIntensity=fe.intensity,he.shadowBias=fe.bias,he.shadowNormalBias=fe.normalBias,he.shadowRadius=fe.radius,he.shadowMapSize.copy(fe.mapSize).multiply(fe.getFrameExtents()),n.sunShadow[g]=he,n.sunShadowMap[g]=Me;let Pe=fe.getViewportCount();for(let Ue=0;Ue<Pe;Ue++)n.sunShadowMatrix[y+Ue]=fe.getMatrix(Ue),n.sunShadowCascade[y+Ue]=fe._cascadeData[Ue];y+=Pe,g++}n.sun[f]=q,f++}else if(N.isDirectionalLight){let q=e.get(N);if(q.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let fe=N.shadow,he=t.get(N);he.shadowIntensity=fe.intensity,he.shadowBias=fe.bias,he.shadowNormalBias=fe.normalBias,he.shadowRadius=fe.radius,he.shadowMapSize=fe.mapSize,n.directionalShadow[d]=he,n.directionalShadowMap[d]=Me,n.directionalShadowMatrix[d]=N.shadow.matrix,A++}n.directional[d]=q,d++}else if(N.isSpotLight){let q=e.get(N);q.position.setFromMatrixPosition(N.matrixWorld),q.color.copy(Z).multiplyScalar(te),q.distance=K,q.coneCos=Math.cos(N.angle),q.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),q.decay=N.decay,n.spot[M]=q;let fe=N.shadow;if(N.map&&(n.spotLightMap[w]=N.map,w++,fe.updateMatrices(N),N.castShadow&&B++),n.spotLightMatrix[M]=fe.matrix,N.castShadow){let he=t.get(N);he.shadowIntensity=fe.intensity,he.shadowBias=fe.bias,he.shadowNormalBias=fe.normalBias,he.shadowRadius=fe.radius,he.shadowMapSize=fe.mapSize,n.spotShadow[M]=he,n.spotShadowMap[M]=Me,_++}M++}else if(N.isRectAreaLight){let q=e.get(N);q.color.copy(Z).multiplyScalar(te),q.halfWidth.set(N.width*.5,0,0),q.halfHeight.set(0,N.height*.5,0),n.rectArea[b]=q,b++}else if(N.isPointLight){let q=e.get(N);if(q.color.copy(N.color).multiplyScalar(N.intensity),q.distance=N.distance,q.decay=N.decay,N.castShadow){let fe=N.shadow,he=t.get(N);he.shadowIntensity=fe.intensity,he.shadowBias=fe.bias,he.shadowNormalBias=fe.normalBias,he.shadowRadius=fe.radius,he.shadowMapSize=fe.mapSize,he.shadowCameraNear=fe.camera.near,he.shadowCameraFar=fe.camera.far,n.pointShadow[h]=he,n.pointShadowMap[h]=Me,n.pointShadowMatrix[h]=N.shadow.matrix,R++}n.point[h]=q,h++}else if(N.isHemisphereLight){let q=e.get(N);q.skyColor.copy(N.color).multiplyScalar(te),q.groundColor.copy(N.groundColor).multiplyScalar(te),n.hemi[x]=q,x++}}b>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ne.LTC_FLOAT_1,n.rectAreaLTC2=Ne.LTC_FLOAT_2):(n.rectAreaLTC1=Ne.LTC_HALF_1,n.rectAreaLTC2=Ne.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=p,n.ambient[2]=m;let F=n.hash;(F.sunLength!==f||F.directionalLength!==d||F.pointLength!==h||F.spotLength!==M||F.rectAreaLength!==b||F.hemiLength!==x||F.numSunShadows!==g||F.numDirectionalShadows!==A||F.numPointShadows!==R||F.numSpotShadows!==_||F.numSpotMaps!==w||F.numLightProbes!==L)&&(n.sun.length=f,n.directional.length=d,n.spot.length=M,n.rectArea.length=b,n.point.length=h,n.hemi.length=x,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=R,n.pointShadowMap.length=R,n.pointShadowMatrix.length=R,n.spotShadow.length=_,n.spotShadowMap.length=_,n.spotLightMatrix.length=_+w-B,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=B,n.numLightProbes=L,F.sunLength=f,F.directionalLength=d,F.pointLength=h,F.spotLength=M,F.rectAreaLength=b,F.hemiLength=x,F.numSunShadows=g,F.numDirectionalShadows=A,F.numPointShadows=R,F.numSpotShadows=_,F.numSpotMaps=w,F.numLightProbes=L,n.version=lx++)}function l(c,u){let p=0,m=0,f=0,g=0,y=0,d=0,h=u.matrixWorldInverse;for(let M=0,b=c.length;M<b;M++){let x=c[M];if(x.isSunLight){let A=n.sun[p];A.direction.setFromMatrixPosition(x.matrixWorld),A.direction.transformDirection(h),p++}else if(x.isDirectionalLight){let A=n.directional[m];A.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(h),m++}else if(x.isSpotLight){let A=n.spot[g];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(h),A.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(h),g++}else if(x.isRectAreaLight){let A=n.rectArea[y];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(h),a.identity(),r.copy(x.matrixWorld),r.premultiply(h),a.extractRotation(r),A.halfWidth.set(x.width*.5,0,0),A.halfHeight.set(0,x.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),y++}else if(x.isPointLight){let A=n.point[f];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(h),f++}else if(x.isHemisphereLight){let A=n.hemi[d];A.direction.setFromMatrixPosition(x.matrixWorld),A.direction.transformDirection(h),d++}}}return{setup:o,setupView:l,state:n}}function Ed(i){let e=new hx(i),t=[],n=[],s=[];function r(p){u.camera=p,t.length=0,n.length=0,s.length=0}function a(p){p.isLightProbeGrid?s.push(p):t.push(p)}function o(p){n.push(p)}function l(){e.setup(t),s.sort((p,m)=>p.priority-m.priority||p.id-m.id)}function c(p){e.setupView(t,p)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function ux(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Ed(i),e.set(s,[o])):r>=a.length?(o=new Ed(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var dx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,px=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],mx=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],Td=new lt,ua=new C,lh=new C;function gx(i,e,t){let n=new Ni,s=new pe,r=new pe,a=new Pt,o=new Ro,l=new Co,c={},u=t.maxTextureSize,p={[Vi]:mn,[mn]:Vi,[gn]:gn},m=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:dx,fragmentShader:fx}),f=m.clone();f.defines.HORIZONTAL_PASS=1;let g=new _t;g.setAttribute("position",new Dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ft(g,m),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$r;let h=this.type;this.render=function(R,_,w){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||R.length===0)return;this.type===_u&&(Je("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=$r);let B=i.getRenderTarget(),L=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),W=i.state;W.setBlending(Mi),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let se=h!==this.type;se&&_.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(Z=>Z.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,Z=R.length;N<Z;N++){let te=R[N],K=te.shadow;if(K===void 0){Je("WebGLShadowMap:",te,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);let Me=K.getFrameExtents();s.multiply(Me),r.copy(K.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Me.x),s.x=r.x*Me.x,K.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Me.y),s.y=r.y*Me.y,K.mapSize.y=r.y));let q=i.state.buffers.depth.getReversed();if(K.camera._reversedDepth=q,K.map===null||se===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===Hs){if(te.isPointLight){Je("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new zt(s.x,s.y,{format:Gi,type:jt,minFilter:dn,magFilter:dn,generateMipmaps:!1}),K.map.texture.name=te.name+".shadowMap",K.map.depthTexture=new xi(s.x,s.y,Un),K.map.depthTexture.name=te.name+".shadowMapDepth",K.map.depthTexture.format=gi,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Zt,K.map.depthTexture.magFilter=Zt}else te.isPointLight?(K.map=new fa(s.x),K.map.depthTexture=new Ir(s.x,qn)):(K.map=new zt(s.x,s.y),K.map.depthTexture=new xi(s.x,s.y,qn)),K.map.depthTexture.name=te.name+".shadowMap",K.map.depthTexture.format=gi,this.type===$r?(K.map.depthTexture.compareFunction=q?Zc:qc,K.map.depthTexture.minFilter=dn,K.map.depthTexture.magFilter=dn):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Zt,K.map.depthTexture.magFilter=Zt);K.camera.updateProjectionMatrix()}K.map.isWebGLCubeRenderTarget!==!0&&(K.map.width!==s.x||K.map.height!==s.y)&&K.map.setSize(s.x,s.y);let fe=K.map.isWebGLCubeRenderTarget?6:K.getViewportCount();te.isPointLight!==!0&&K.updateMatrices(te,w);let he=(K.camera.layers.mask&4294967294)!==0?K.camera.layers:w.layers;for(let Pe=0;Pe<fe;Pe++){let Ue=K.getCamera(Pe);if(te.isPointLight){let ee=K.camera,Ae=K.matrix,de=te.distance||ee.far;de!==ee.far&&(ee.far=de,ee.updateProjectionMatrix()),ua.setFromMatrixPosition(te.matrixWorld),ee.position.copy(ua),lh.copy(ee.position),lh.add(px[Pe]),ee.up.copy(mx[Pe]),ee.lookAt(lh),ee.updateMatrixWorld(),Ae.makeTranslation(-ua.x,-ua.y,-ua.z),Td.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),K._frustum.setFromProjectionMatrix(Td,ee.coordinateSystem,ee.reversedDepth)}if(K.map.isWebGLCubeRenderTarget)i.setRenderTarget(K.map,Pe),i.clear();else{Pe===0&&(i.setRenderTarget(K.map),i.clear());let ee=K.getViewport(Pe);a.set(r.x*ee.x,r.y*ee.y,r.x*ee.z,r.y*ee.w),W.viewport(a)}n=K.getFrustum(Pe),x(_,w,Ue,te,he,this.type)}K.isPointLightShadow!==!0&&this.type===Hs&&M(K,w),K.needsUpdate=!1}h=this.type,d.needsUpdate=!1,i.setRenderTarget(B,L,F)};function M(R,_){let w=e.update(y);m.defines.VSM_SAMPLES!==R.blurSamples&&(m.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,m.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null?R.mapPass=new zt(s.x,s.y,{format:Gi,type:jt}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),m.uniforms.shadow_pass.value=R.map.depthTexture,m.uniforms.resolution.value.set(R.map.width,R.map.height),m.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(_,null,w,m,y,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value.set(R.map.width,R.map.height),f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(_,null,w,f,y,null)}function b(R,_,w,B){let L=null,F=w.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(F!==void 0)L=F;else if(L=w.isPointLight===!0?l:o,i.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){let W=L.uuid,se=_.uuid,N=c[W];N===void 0&&(N={},c[W]=N);let Z=N[se];Z===void 0&&(Z=L.clone(),N[se]=Z,_.addEventListener("dispose",A)),L=Z}if(L.visible=_.visible,L.wireframe=_.wireframe,B===Hs?L.side=_.shadowSide!==null?_.shadowSide:_.side:L.side=_.shadowSide!==null?_.shadowSide:p[_.side],L.alphaMap=_.alphaMap,L.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,L.map=_.map,L.clipShadows=_.clipShadows,L.clippingPlanes=_.clippingPlanes,L.clipIntersection=_.clipIntersection,L.displacementMap=_.displacementMap,L.displacementScale=_.displacementScale,L.displacementBias=_.displacementBias,L.wireframeLinewidth=_.wireframeLinewidth,L.linewidth=_.linewidth,w.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let W=i.properties.get(L);W.light=w}return L}function x(R,_,w,B,L,F){if(R.visible===!1)return;if(R.layers.test(L)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&F===Hs)&&(!R.frustumCulled||R.intersectsFrustum(n))){R.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,R.matrixWorld);let N=e.update(R),Z=R.material;if(Array.isArray(Z)){let te=N.groups;for(let K=0,Me=te.length;K<Me;K++){let q=te[K],fe=Z[q.materialIndex];if(fe&&fe.visible){let he=b(R,fe,B,F);R.onBeforeShadow(i,R,_,w,N,he,q),i.renderBufferDirect(w,null,N,he,R,q),R.onAfterShadow(i,R,_,w,N,he,q)}}}else if(Z.visible){let te=b(R,Z,B,F);R.onBeforeShadow(i,R,_,w,N,te,null),i.renderBufferDirect(w,null,N,te,R,null),R.onAfterShadow(i,R,_,w,N,te,null)}}let se=R.children;for(let N=0,Z=se.length;N<Z;N++)x(se[N],_,w,B,L,F)}function A(R){R.target.removeEventListener("dispose",A);for(let w in c){let B=c[w],L=R.target.uuid;L in B&&(B[L].dispose(),delete B[L])}}}function _x(i,e){function t(){let S=!1,I=new Pt,Y=null,be=new Pt(0,0,0,0);return{setMask:function(Ee){Y!==Ee&&!S&&(i.colorMask(Ee,Ee,Ee,Ee),Y=Ee)},setLocked:function(Ee){S=Ee},setClear:function(Ee,ve,we,H,D){D===!0&&(Ee*=H,ve*=H,we*=H),I.set(Ee,ve,we,H),be.equals(I)===!1&&(i.clearColor(Ee,ve,we,H),be.copy(I))},reset:function(){S=!1,Y=null,be.set(-1,0,0,0)}}}function n(){let S=!1,I=!1,Y=null,be=null,Ee=null;return{setReversed:function(ve){if(I!==ve){let we=e.get("EXT_clip_control");ve?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),I=ve;let H=Ee;Ee=null,this.setClear(H)}},getReversed:function(){return I},setTest:function(ve){ve?Re(i.DEPTH_TEST):Oe(i.DEPTH_TEST)},setMask:function(ve){Y!==ve&&!S&&(i.depthMask(ve),Y=ve)},setFunc:function(ve){if(I&&(ve=Ju[ve]),be!==ve){switch(ve){case ro:i.depthFunc(i.NEVER);break;case ao:i.depthFunc(i.ALWAYS);break;case oo:i.depthFunc(i.LESS);break;case Rs:i.depthFunc(i.LEQUAL);break;case lo:i.depthFunc(i.EQUAL);break;case co:i.depthFunc(i.GEQUAL);break;case ho:i.depthFunc(i.GREATER);break;case uo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}be=ve}},setLocked:function(ve){S=ve},setClear:function(ve){Ee!==ve&&(Ee=ve,I&&(ve=1-ve),i.clearDepth(ve))},reset:function(){S=!1,Y=null,be=null,Ee=null,I=!1}}}function s(){let S=!1,I=null,Y=null,be=null,Ee=null,ve=null,we=null,H=null,D=null;return{setTest:function(ne){S||(ne?Re(i.STENCIL_TEST):Oe(i.STENCIL_TEST))},setMask:function(ne){I!==ne&&!S&&(i.stencilMask(ne),I=ne)},setFunc:function(ne,J,j){(Y!==ne||be!==J||Ee!==j)&&(i.stencilFunc(ne,J,j),Y=ne,be=J,Ee=j)},setOp:function(ne,J,j){(ve!==ne||we!==J||H!==j)&&(i.stencilOp(ne,J,j),ve=ne,we=J,H=j)},setLocked:function(ne){S=ne},setClear:function(ne){D!==ne&&(i.clearStencil(ne),D=ne)},reset:function(){S=!1,I=null,Y=null,be=null,Ee=null,ve=null,we=null,H=null,D=null}}}let r=new t,a=new n,o=new s,l={},c=new WeakMap,u={},p={},m={},f=new WeakMap,g=[],y=null,d=!1,h=null,M=null,b=null,x=null,A=null,R=null,_=null,w=new Ke(0,0,0),B=0,L=!1,F=null,W=null,se=null,N=null,Z=null,te=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,Me=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(Me=parseFloat(/^WebGL (\d)/.exec(q)[1]),K=Me>=1):q.indexOf("OpenGL ES")!==-1&&(Me=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),K=Me>=2);let fe=null,he={},Pe=i.getParameter(i.SCISSOR_BOX),Ue=i.getParameter(i.VIEWPORT),ee=new Pt().fromArray(Pe),Ae=new Pt().fromArray(Ue);function de(S,I,Y,be){let Ee=new Uint8Array(4),ve=i.createTexture();i.bindTexture(S,ve),i.texParameteri(S,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(S,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let we=0;we<Y;we++)S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY?i.texImage3D(I,0,i.RGBA,1,1,be,0,i.RGBA,i.UNSIGNED_BYTE,Ee):i.texImage2D(I+we,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ee);return ve}let ke={};ke[i.TEXTURE_2D]=de(i.TEXTURE_2D,i.TEXTURE_2D,1),ke[i.TEXTURE_CUBE_MAP]=de(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ke[i.TEXTURE_2D_ARRAY]=de(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ke[i.TEXTURE_3D]=de(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Re(i.DEPTH_TEST),a.setFunc(Rs),Se(!1),ue(Nc),Re(i.CULL_FACE),xe(Mi);function Re(S){u[S]!==!0&&(i.enable(S),u[S]=!0)}function Oe(S){u[S]!==!1&&(i.disable(S),u[S]=!1)}function ht(S,I){return m[S]!==I?(i.bindFramebuffer(S,I),m[S]=I,S===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=I),S===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=I),!0):!1}function Be(S,I){let Y=g,be=!1;if(S){Y=f.get(I),Y===void 0&&(Y=[],f.set(I,Y));let Ee=S.textures;if(Y.length!==Ee.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let ve=0,we=Ee.length;ve<we;ve++)Y[ve]=i.COLOR_ATTACHMENT0+ve;Y.length=Ee.length,be=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,be=!0);be&&i.drawBuffers(Y)}function Ze(S){return y!==S?(i.useProgram(S),y=S,!0):!1}let le={[ns]:i.FUNC_ADD,[vu]:i.FUNC_SUBTRACT,[yu]:i.FUNC_REVERSE_SUBTRACT};le[Mu]=i.MIN,le[Su]=i.MAX;let X={[bu]:i.ZERO,[Eu]:i.ONE,[Tu]:i.SRC_COLOR,[Oc]:i.SRC_ALPHA,[Pu]:i.SRC_ALPHA_SATURATE,[Cu]:i.DST_COLOR,[Au]:i.DST_ALPHA,[wu]:i.ONE_MINUS_SRC_COLOR,[Bc]:i.ONE_MINUS_SRC_ALPHA,[Iu]:i.ONE_MINUS_DST_COLOR,[Ru]:i.ONE_MINUS_DST_ALPHA,[Lu]:i.CONSTANT_COLOR,[Du]:i.ONE_MINUS_CONSTANT_COLOR,[Nu]:i.CONSTANT_ALPHA,[Uu]:i.ONE_MINUS_CONSTANT_ALPHA};function xe(S,I,Y,be,Ee,ve,we,H,D,ne){if(S===Mi){d===!0&&(Oe(i.BLEND),d=!1);return}if(d===!1&&(Re(i.BLEND),d=!0),S!==xu){if(S!==h||ne!==L){if((M!==ns||A!==ns)&&(i.blendEquation(i.FUNC_ADD),M=ns,A=ns),ne)switch(S){case Vs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case $t:i.blendFunc(i.ONE,i.ONE);break;case Uc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:$e("WebGLState: Invalid blending: ",S);break}else switch(S){case Vs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case $t:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Uc:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Fc:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",S);break}b=null,x=null,R=null,_=null,w.set(0,0,0),B=0,h=S,L=ne}return}Ee=Ee||I,ve=ve||Y,we=we||be,(I!==M||Ee!==A)&&(i.blendEquationSeparate(le[I],le[Ee]),M=I,A=Ee),(Y!==b||be!==x||ve!==R||we!==_)&&(i.blendFuncSeparate(X[Y],X[be],X[ve],X[we]),b=Y,x=be,R=ve,_=we),(H.equals(w)===!1||D!==B)&&(i.blendColor(H.r,H.g,H.b,D),w.copy(H),B=D),h=S,L=!1}function me(S,I){S.side===gn?Oe(i.CULL_FACE):Re(i.CULL_FACE);let Y=S.side===mn;I&&(Y=!Y),Se(Y),S.blending===Vs&&S.transparent===!1?xe(Mi):xe(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),a.setFunc(S.depthFunc),a.setTest(S.depthTest),a.setMask(S.depthWrite),r.setMask(S.colorWrite);let be=S.stencilWrite;o.setTest(be),be&&(o.setMask(S.stencilWriteMask),o.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),o.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),ze(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?Re(i.SAMPLE_ALPHA_TO_COVERAGE):Oe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Se(S){F!==S&&(S?i.frontFace(i.CW):i.frontFace(i.CCW),F=S)}function ue(S){S!==mu?(Re(i.CULL_FACE),S!==W&&(S===Nc?i.cullFace(i.BACK):S===gu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Oe(i.CULL_FACE),W=S}function He(S){S!==se&&(K&&i.lineWidth(S),se=S)}function ze(S,I,Y){S?(Re(i.POLYGON_OFFSET_FILL),(N!==I||Z!==Y)&&(N=I,Z=Y,a.getReversed()&&(I=-I,Y=-Y),i.polygonOffset(I,Y))):Oe(i.POLYGON_OFFSET_FILL)}function tt(S){S?Re(i.SCISSOR_TEST):Oe(i.SCISSOR_TEST)}function Te(S){S===void 0&&(S=i.TEXTURE0+te-1),fe!==S&&(i.activeTexture(S),fe=S)}function ut(S,I,Y){Y===void 0&&(fe===null?Y=i.TEXTURE0+te-1:Y=fe);let be=he[Y];be===void 0&&(be={type:void 0,texture:void 0},he[Y]=be),(be.type!==S||be.texture!==I)&&(fe!==Y&&(i.activeTexture(Y),fe=Y),i.bindTexture(S,I||ke[S]),be.type=S,be.texture=I)}function O(){let S=he[fe];S!==void 0&&S.type!==void 0&&(i.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)}function Tt(){try{i.compressedTexImage2D(...arguments)}catch(S){$e("WebGLState:",S)}}function nt(){try{i.compressedTexImage3D(...arguments)}catch(S){$e("WebGLState:",S)}}function xt(){try{i.texSubImage2D(...arguments)}catch(S){$e("WebGLState:",S)}}function Ce(){try{i.texSubImage3D(...arguments)}catch(S){$e("WebGLState:",S)}}function re(){try{i.compressedTexSubImage2D(...arguments)}catch(S){$e("WebGLState:",S)}}function _e(){try{i.compressedTexSubImage3D(...arguments)}catch(S){$e("WebGLState:",S)}}function Ie(){try{i.texStorage2D(...arguments)}catch(S){$e("WebGLState:",S)}}function T(){try{i.texStorage3D(...arguments)}catch(S){$e("WebGLState:",S)}}function v(){try{i.texImage2D(...arguments)}catch(S){$e("WebGLState:",S)}}function P(){try{i.texImage3D(...arguments)}catch(S){$e("WebGLState:",S)}}function ae(S){return p[S]!==void 0?p[S]:i.getParameter(S)}function V(S,I){p[S]!==I&&(i.pixelStorei(S,I),p[S]=I)}function ie(S){ee.equals(S)===!1&&(i.scissor(S.x,S.y,S.z,S.w),ee.copy(S))}function U(S){Ae.equals(S)===!1&&(i.viewport(S.x,S.y,S.z,S.w),Ae.copy(S))}function k(S,I){let Y=c.get(I);Y===void 0&&(Y=new WeakMap,c.set(I,Y));let be=Y.get(S);be===void 0&&(be=i.getUniformBlockIndex(I,S.name),i.uniformBlockBinding(I,be,be),Y.set(S,be))}function G(S,I,Y){let Ee=c.get(I).get(S);l[Ee]!==Y&&(i.bindBufferBase(i.UNIFORM_BUFFER,Ee,Y),l[Ee]=Y)}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},p={},fe=null,he={},m={},l={},f=new WeakMap,g=[],y=null,d=!1,h=null,M=null,b=null,x=null,A=null,R=null,_=null,w=new Ke(0,0,0),B=0,L=!1,F=null,W=null,se=null,N=null,Z=null,ee.set(0,0,i.canvas.width,i.canvas.height),Ae.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Re,disable:Oe,bindFramebuffer:ht,drawBuffers:Be,useProgram:Ze,setBlending:xe,setMaterial:me,setFlipSided:Se,setCullFace:ue,setLineWidth:He,setPolygonOffset:ze,setScissorTest:tt,activeTexture:Te,bindTexture:ut,unbindTexture:O,compressedTexImage2D:Tt,compressedTexImage3D:nt,texImage2D:v,texImage3D:P,pixelStorei:V,getParameter:ae,updateUBOMapping:k,uniformBlockBinding:G,texStorage2D:Ie,texStorage3D:T,texSubImage2D:xt,texSubImage3D:Ce,compressedTexSubImage2D:re,compressedTexSubImage3D:_e,scissor:ie,viewport:U,reset:ce}}function xx(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new pe,u=new WeakMap,p=new Set,m,f=new WeakMap,g=new Set,y=new FinalizationRegistry(T=>g.delete(T)),d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function h(T,v){return d?new OffscreenCanvas(T,v):gr("canvas")}function M(T,v,P){let ae=1,V=Ie(T);if((V.width>P||V.height>P)&&(ae=P/Math.max(V.width,V.height)),ae<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let ie=Math.floor(ae*V.width),U=Math.floor(ae*V.height);m===void 0&&(m=h(ie,U));let k=v?h(ie,U):m;return k.width=ie,k.height=U,k.getContext("2d").drawImage(T,0,0,ie,U),Je("WebGLRenderer: Texture has been resized from ("+V.width+"x"+V.height+") to ("+ie+"x"+U+")."),k}else return"data"in T&&Je("WebGLRenderer: Image in DataTexture is too big ("+V.width+"x"+V.height+")."),T;return T}function b(T){return T.generateMipmaps}function x(T){i.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function R(T,v,P,ae,V,ie=!1){if(T!==null){if(i[T]!==void 0)return i[T];Je("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let U;ae&&(U=e.get("EXT_texture_norm16"),U||Je("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let k=v;if(v===i.RED&&(P===i.FLOAT&&(k=i.R32F),P===i.HALF_FLOAT&&(k=i.R16F),P===i.UNSIGNED_BYTE&&(k=i.R8),P===i.UNSIGNED_SHORT&&U&&(k=U.R16_EXT),P===i.SHORT&&U&&(k=U.R16_SNORM_EXT)),v===i.RED_INTEGER&&(P===i.UNSIGNED_BYTE&&(k=i.R8UI),P===i.UNSIGNED_SHORT&&(k=i.R16UI),P===i.UNSIGNED_INT&&(k=i.R32UI),P===i.BYTE&&(k=i.R8I),P===i.SHORT&&(k=i.R16I),P===i.INT&&(k=i.R32I)),v===i.RG&&(P===i.FLOAT&&(k=i.RG32F),P===i.HALF_FLOAT&&(k=i.RG16F),P===i.UNSIGNED_BYTE&&(k=i.RG8),P===i.UNSIGNED_SHORT&&U&&(k=U.RG16_EXT),P===i.SHORT&&U&&(k=U.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(P===i.UNSIGNED_BYTE&&(k=i.RG8UI),P===i.UNSIGNED_SHORT&&(k=i.RG16UI),P===i.UNSIGNED_INT&&(k=i.RG32UI),P===i.BYTE&&(k=i.RG8I),P===i.SHORT&&(k=i.RG16I),P===i.INT&&(k=i.RG32I)),v===i.RGB_INTEGER&&(P===i.UNSIGNED_BYTE&&(k=i.RGB8UI),P===i.UNSIGNED_SHORT&&(k=i.RGB16UI),P===i.UNSIGNED_INT&&(k=i.RGB32UI),P===i.BYTE&&(k=i.RGB8I),P===i.SHORT&&(k=i.RGB16I),P===i.INT&&(k=i.RGB32I)),v===i.RGBA_INTEGER&&(P===i.UNSIGNED_BYTE&&(k=i.RGBA8UI),P===i.UNSIGNED_SHORT&&(k=i.RGBA16UI),P===i.UNSIGNED_INT&&(k=i.RGBA32UI),P===i.BYTE&&(k=i.RGBA8I),P===i.SHORT&&(k=i.RGBA16I),P===i.INT&&(k=i.RGBA32I)),v===i.RGB&&(P===i.UNSIGNED_SHORT&&U&&(k=U.RGB16_EXT),P===i.SHORT&&U&&(k=U.RGB16_SNORM_EXT),P===i.UNSIGNED_INT_5_9_9_9_REV&&(k=i.RGB9_E5),P===i.UNSIGNED_INT_10F_11F_11F_REV&&(k=i.R11F_G11F_B10F)),v===i.RGBA){let G=ie?mr:dt.getTransfer(V);P===i.FLOAT&&(k=i.RGBA32F),P===i.HALF_FLOAT&&(k=i.RGBA16F),P===i.UNSIGNED_BYTE&&(k=G===vt?i.SRGB8_ALPHA8:i.RGBA8),P===i.UNSIGNED_SHORT&&U&&(k=U.RGBA16_EXT),P===i.SHORT&&U&&(k=U.RGBA16_SNORM_EXT),P===i.UNSIGNED_SHORT_4_4_4_4&&(k=i.RGBA4),P===i.UNSIGNED_SHORT_5_5_5_1&&(k=i.RGB5_A1)}return(k===i.R16F||k===i.R32F||k===i.RG16F||k===i.RG32F||k===i.RGBA16F||k===i.RGBA32F)&&e.get("EXT_color_buffer_float"),k}function _(T,v){let P;return T?v===null||v===qn||v===rs?P=i.DEPTH24_STENCIL8:v===Un?P=i.DEPTH32F_STENCIL8:v===Ws&&(P=i.DEPTH24_STENCIL8,Je("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===qn||v===rs?P=i.DEPTH_COMPONENT24:v===Un?P=i.DEPTH_COMPONENT32F:v===Ws&&(P=i.DEPTH_COMPONENT16),P}function w(T,v){return b(T)===!0||T.isFramebufferTexture&&T.minFilter!==Zt&&T.minFilter!==dn?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function B(T){let v=new WeakRef(T);n.get(T).__ref=v,g.add(v),y.register(T,v,v)}function L(T){let v=n.get(T).__ref;v!==void 0&&(g.delete(v),y.unregister(v))}function F(T){se(T.target)}function W(T){N(T.target)}function se(T){T.removeEventListener("dispose",F),L(T),te(T),T.isVideoTexture&&u.delete(T),T.isHTMLTexture&&p.delete(T)}function N(T){T.removeEventListener("dispose",W),L(T),Me(T)}function Z(){for(let T of g){let v=T.deref();v!==void 0&&(v.isRenderTarget===!0?N(v):se(v))}g.clear(),p.clear()}function te(T){let v=n.get(T);if(v.__webglInit===void 0)return;let P=T.source,ae=f.get(P);if(ae){let V=ae[v.__cacheKey];V.usedTimes--,V.usedTimes===0&&K(T),Object.keys(ae).length===0&&f.delete(P)}n.remove(T)}function K(T){let v=n.get(T);i.deleteTexture(v.__webglTexture);let P=T.source,ae=f.get(P);delete ae[v.__cacheKey],a.memory.textures--}function Me(T){let v=n.get(T);v.__depthDisposeCallback&&v.__depthDisposeCallback();let P=T.depthTexture;if(P&&P.renderTarget===T&&se(P),T.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(v.__webglFramebuffer[V]))for(let ie=0;ie<v.__webglFramebuffer[V].length;ie++)i.deleteFramebuffer(v.__webglFramebuffer[V][ie]);else i.deleteFramebuffer(v.__webglFramebuffer[V]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[V])}else{if(Array.isArray(v.__webglFramebuffer))for(let V=0;V<v.__webglFramebuffer.length;V++)i.deleteFramebuffer(v.__webglFramebuffer[V]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let V=0;V<v.__webglColorRenderbuffer.length;V++)v.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[V]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let ae=T.textures;for(let V=0,ie=ae.length;V<ie;V++){let U=n.get(ae[V]);U.__webglTexture&&(i.deleteTexture(U.__webglTexture),a.memory.textures--),n.remove(ae[V])}n.remove(T)}let q=0;function fe(){q=0}function he(){return q}function Pe(T){q=T}function Ue(){let T=q;return T>=s.maxTextures&&Je("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),q+=1,T}function ee(T){let v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.mipmapsAutoUpdate),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function Ae(T,v){let P=n.get(T);if(T.isVideoTexture&&re(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&P.__version!==T.version){let ae=T.image;if(ae===null)Je("WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)Je("WebGLRenderer: Texture marked for update but image is incomplete");else{me(P,T,v);return}}else T.isExternalTexture&&(P.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,P.__webglTexture,i.TEXTURE0+v)}function de(T,v){let P=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&P.__version!==T.version){me(P,T,v);return}else T.isExternalTexture&&(P.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,P.__webglTexture,i.TEXTURE0+v)}function ke(T,v){let P=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&P.__version!==T.version){me(P,T,v);return}t.bindTexture(i.TEXTURE_3D,P.__webglTexture,i.TEXTURE0+v)}function Re(T,v){let P=n.get(T);if(T.version>0&&P.__version!==T.version){Se(P,T,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+v)}let Oe={[fo]:i.REPEAT,[jn]:i.CLAMP_TO_EDGE,[po]:i.MIRRORED_REPEAT},ht={[Zt]:i.NEAREST,[Bu]:i.NEAREST_MIPMAP_NEAREST,[sa]:i.NEAREST_MIPMAP_LINEAR,[dn]:i.LINEAR,[Go]:i.LINEAR_MIPMAP_NEAREST,[Si]:i.LINEAR_MIPMAP_LINEAR},Be={[Vu]:i.NEVER,[Kc]:i.ALWAYS,[Gu]:i.LESS,[qc]:i.LEQUAL,[Wu]:i.EQUAL,[Zc]:i.GEQUAL,[Xu]:i.GREATER,[Yu]:i.NOTEQUAL};function Ze(T,v){if(v.type===Un&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===dn||v.magFilter===Go||v.magFilter===sa||v.magFilter===Si||v.minFilter===dn||v.minFilter===Go||v.minFilter===sa||v.minFilter===Si)&&Je("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,Oe[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Oe[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Oe[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ht[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ht[v.minFilter]),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Be[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Zt||v.minFilter!==sa&&v.minFilter!==Si||v.type===Un&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let P=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function le(T,v){let P=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",F),B(v));let ae=v.source,V=f.get(ae);V===void 0&&(V={},f.set(ae,V));let ie=ee(v);if(ie!==T.__cacheKey){V[ie]===void 0&&(V[ie]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,P=!0),V[ie].usedTimes++;let U=V[T.__cacheKey];U!==void 0&&(V[T.__cacheKey].usedTimes--,U.usedTimes===0&&K(v)),T.__cacheKey=ie,T.__webglTexture=V[ie].texture}return P}function X(T,v,P){return Math.floor(Math.floor(T/P)/v)}function xe(T,v,P,ae){let ie=T.updateRanges;if(ie.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,P,ae,v.data);else{ie.sort((S,I)=>S.start-I.start);let U=0;for(let S=1;S<ie.length;S++){let I=ie[U],Y=ie[S],be=I.start+I.count,Ee=X(Y.start,v.width,4),ve=X(I.start,v.width,4);Y.start<=be+1&&Ee===ve&&X(Y.start+Y.count-1,v.width,4)===Ee?I.count=Math.max(I.count,Y.start+Y.count-I.start):(++U,ie[U]=Y)}ie.length=U+1;let k=t.getParameter(i.UNPACK_ROW_LENGTH),G=t.getParameter(i.UNPACK_SKIP_PIXELS),ce=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let S=0,I=ie.length;S<I;S++){let Y=ie[S],be=Math.floor(Y.start/4),Ee=Math.ceil(Y.count/4),ve=be%v.width,we=Math.floor(be/v.width),H=Ee,D=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ve),t.pixelStorei(i.UNPACK_SKIP_ROWS,we),t.texSubImage2D(i.TEXTURE_2D,0,ve,we,H,D,P,ae,v.data)}T.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,k),t.pixelStorei(i.UNPACK_SKIP_PIXELS,G),t.pixelStorei(i.UNPACK_SKIP_ROWS,ce)}}function me(T,v,P){let ae=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(ae=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(ae=i.TEXTURE_3D);let V=le(T,v),ie=v.source;t.bindTexture(ae,T.__webglTexture,i.TEXTURE0+P);let U=n.get(ie);if(ie.version!==U.__version||V===!0){if(t.activeTexture(i.TEXTURE0+P),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let D=dt.getPrimaries(dt.workingColorSpace),ne=v.colorSpace===Ei?null:dt.getPrimaries(v.colorSpace),J=v.colorSpace===Ei||D===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let G=M(v.image,!1,s.maxTextureSize);G=_e(v,G);let ce=r.convert(v.format,v.colorSpace),S=r.convert(v.type),I=R(v.internalFormat,ce,S,v.normalized,v.colorSpace,v.isVideoTexture);Ze(ae,v);let Y,be=v.mipmaps,Ee=v.isVideoTexture!==!0,ve=U.__version===void 0||V===!0,we=ie.dataReady,H=w(v,G);if(v.isDepthTexture)I=_(v.format===bi,v.type),ve&&(Ee?t.texStorage2D(i.TEXTURE_2D,1,I,G.width,G.height):t.texImage2D(i.TEXTURE_2D,0,I,G.width,G.height,0,ce,S,null));else if(v.isDataTexture)if(be.length>0){Ee&&ve&&t.texStorage2D(i.TEXTURE_2D,H,I,be[0].width,be[0].height);for(let D=0,ne=be.length;D<ne;D++)Y=be[D],Ee?we&&t.texSubImage2D(i.TEXTURE_2D,D,0,0,Y.width,Y.height,ce,S,Y.data):t.texImage2D(i.TEXTURE_2D,D,I,Y.width,Y.height,0,ce,S,Y.data);v.generateMipmaps=!1}else Ee?(ve&&t.texStorage2D(i.TEXTURE_2D,H,I,G.width,G.height),we&&xe(v,G,ce,S)):t.texImage2D(i.TEXTURE_2D,0,I,G.width,G.height,0,ce,S,G.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ee&&ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,H,I,be[0].width,be[0].height,G.depth);for(let D=0,ne=be.length;D<ne;D++)if(Y=be[D],v.format!==Zn)if(ce!==null)if(Ee){if(we)if(v.layerUpdates.size>0){let J=ah(Y.width,Y.height,v.format,v.type);for(let j of v.layerUpdates){let ye=Y.data.subarray(j*J/Y.data.BYTES_PER_ELEMENT,(j+1)*J/Y.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,D,0,0,j,Y.width,Y.height,1,ce,ye)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,D,0,0,0,Y.width,Y.height,G.depth,ce,Y.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,D,I,Y.width,Y.height,G.depth,0,Y.data,0,0);else Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ee?we&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,D,0,0,0,Y.width,Y.height,G.depth,ce,S,Y.data):t.texImage3D(i.TEXTURE_2D_ARRAY,D,I,Y.width,Y.height,G.depth,0,ce,S,Y.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Ee&&ve&&t.texStorage2D(i.TEXTURE_2D,H,I,be[0].width,be[0].height);for(let D=0,ne=be.length;D<ne;D++)Y=be[D],v.format!==Zn?ce!==null?Ee?we&&t.compressedTexSubImage2D(i.TEXTURE_2D,D,0,0,Y.width,Y.height,ce,Y.data):t.compressedTexImage2D(i.TEXTURE_2D,D,I,Y.width,Y.height,0,Y.data):Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ee?we&&t.texSubImage2D(i.TEXTURE_2D,D,0,0,Y.width,Y.height,ce,S,Y.data):t.texImage2D(i.TEXTURE_2D,D,I,Y.width,Y.height,0,ce,S,Y.data)}else if(v.isDataArrayTexture)if(Ee){if(ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,H,I,G.width,G.height,G.depth),we)if(v.layerUpdates.size>0){let D=ah(G.width,G.height,v.format,v.type);for(let ne of v.layerUpdates){let J=G.data.subarray(ne*D/G.data.BYTES_PER_ELEMENT,(ne+1)*D/G.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ne,G.width,G.height,1,ce,S,J)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,G.width,G.height,G.depth,ce,S,G.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,I,G.width,G.height,G.depth,0,ce,S,G.data);else if(v.isData3DTexture)Ee?(ve&&t.texStorage3D(i.TEXTURE_3D,H,I,G.width,G.height,G.depth),we&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,G.width,G.height,G.depth,ce,S,G.data)):t.texImage3D(i.TEXTURE_3D,0,I,G.width,G.height,G.depth,0,ce,S,G.data);else if(v.isFramebufferTexture){if(ve)if(Ee)t.texStorage2D(i.TEXTURE_2D,H,I,G.width,G.height);else{let D=G.width,ne=G.height;for(let J=0;J<H;J++)t.texImage2D(i.TEXTURE_2D,J,I,D,ne,0,ce,S,null),D>>=1,ne>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let D=i.canvas;if(D.hasAttribute("layoutsubtree")||D.setAttribute("layoutsubtree","true"),G.parentNode!==D){D.appendChild(G),p.add(v),D.onpaint=ne=>{let J=ne.changedElements;for(let j of p)J.includes(j.image)&&(j.needsUpdate=!0)},D.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,G);else{let J=i.RGBA,j=i.RGBA,ye=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,J,j,ye,G)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(be.length>0){if(Ee&&ve){let D=Ie(be[0]);t.texStorage2D(i.TEXTURE_2D,H,I,D.width,D.height)}for(let D=0,ne=be.length;D<ne;D++)Y=be[D],Ee?we&&t.texSubImage2D(i.TEXTURE_2D,D,0,0,ce,S,Y):t.texImage2D(i.TEXTURE_2D,D,I,ce,S,Y);v.generateMipmaps=!1}else if(Ee){if(ve){let D=Ie(G);t.texStorage2D(i.TEXTURE_2D,H,I,D.width,D.height)}we&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ce,S,G)}else t.texImage2D(i.TEXTURE_2D,0,I,ce,S,G);b(v)&&v.mipmapsAutoUpdate===!0&&x(ae),U.__version=ie.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Se(T,v,P){if(v.image.length!==6)return;let ae=le(T,v),V=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+P);let ie=n.get(V);if(V.version!==ie.__version||ae===!0){t.activeTexture(i.TEXTURE0+P);let U=dt.getPrimaries(dt.workingColorSpace),k=v.colorSpace===Ei?null:dt.getPrimaries(v.colorSpace),G=v.colorSpace===Ei||U===k?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,G);let ce=v.isCompressedTexture||v.image[0].isCompressedTexture,S=v.image[0]&&v.image[0].isDataTexture,I=[];for(let j=0;j<6;j++)!ce&&!S?I[j]=M(v.image[j],!0,s.maxCubemapSize):I[j]=S?v.image[j].image:v.image[j],I[j]=_e(v,I[j]);let Y=I[0],be=r.convert(v.format,v.colorSpace),Ee=r.convert(v.type),ve=R(v.internalFormat,be,Ee,v.normalized,v.colorSpace),we=v.isVideoTexture!==!0,H=ie.__version===void 0||ae===!0,D=V.dataReady,ne=w(v,Y);Ze(i.TEXTURE_CUBE_MAP,v);let J;if(v.isDepthTexture){if(ve=_(v.format===bi,v.type),H)if(we)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,ve,Y.width,Y.height);else for(let j=0;j<6;j++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,ve,Y.width,Y.height,0,be,Ee,null)}else if(ce){we&&H&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ne,ve,Y.width,Y.height);for(let j=0;j<6;j++){J=I[j].mipmaps;for(let ye=0;ye<J.length;ye++){let ge=J[ye];v.format!==Zn?be!==null?we?D&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye,0,0,ge.width,ge.height,be,ge.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye,ve,ge.width,ge.height,0,ge.data):Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):we?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye,0,0,ge.width,ge.height,be,Ee,ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye,ve,ge.width,ge.height,0,be,Ee,ge.data)}}}else{if(J=v.mipmaps,we&&H){J.length>0&&ne++;let j=Ie(I[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ne,ve,j.width,j.height)}for(let j=0;j<6;j++)if(S){we?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,I[j].width,I[j].height,be,Ee,I[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,ve,I[j].width,I[j].height,0,be,Ee,I[j].data);for(let ye=0;ye<J.length;ye++){let Ye=J[ye].image[j].image;we?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye+1,0,0,Ye.width,Ye.height,be,Ee,Ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye+1,ve,Ye.width,Ye.height,0,be,Ee,Ye.data)}}else{we?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,be,Ee,I[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,ve,be,Ee,I[j]);for(let ye=0;ye<J.length;ye++){let ge=J[ye];we?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye+1,0,0,be,Ee,ge.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye+1,ve,be,Ee,ge.image[j])}}}b(v)&&v.mipmapsAutoUpdate===!0&&x(i.TEXTURE_CUBE_MAP),ie.__version=V.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function ue(T,v,P,ae,V,ie){let U=r.convert(P.format,P.colorSpace),k=r.convert(P.type),G=R(P.internalFormat,U,k,P.normalized,P.colorSpace),ce=n.get(v),S=n.get(P);if(S.__renderTarget=v,!ce.__hasExternalTextures){let I=Math.max(1,v.width>>ie),Y=Math.max(1,v.height>>ie);V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?t.texImage3D(V,ie,G,I,Y,v.depth,0,U,k,null):t.texImage2D(V,ie,G,I,Y,0,U,k,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),Ce(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ae,V,S.__webglTexture,0,xt(v)):(V===i.TEXTURE_2D||V>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&V<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ae,V,S.__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function He(T,v,P){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer){let ae=v.depthTexture,V=ae&&ae.isDepthTexture?ae.type:null,ie=_(v.stencilBuffer,V),U=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ce(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt(v),ie,v.width,v.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt(v),ie,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ie,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,U,i.RENDERBUFFER,T)}else{let ae=v.textures;for(let V=0;V<ae.length;V++){let ie=ae[V],U=r.convert(ie.format,ie.colorSpace),k=r.convert(ie.type),G=R(ie.internalFormat,U,k,ie.normalized,ie.colorSpace);Ce(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt(v),G,v.width,v.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt(v),G,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,G,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ze(T,v,P){let ae=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let V=n.get(v.depthTexture);V.__renderTarget=v;let ie=ae?v.depthTexture.image[0]:v.depthTexture.image;(!V.__webglTexture||ie.width!==v.width||ie.height!==v.height)&&(ie.width=v.width,ie.height=v.height,v.depthTexture.needsUpdate=!0),ae?Re(v.depthTexture,0):Ae(v.depthTexture,0);let U=V.__webglTexture,k=xt(v),G=ae?i.TEXTURE_CUBE_MAP_POSITIVE_X+P:i.TEXTURE_2D,ce=v.depthTexture.format===bi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===gi)Ce(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,G,U,0,k):i.framebufferTexture2D(i.FRAMEBUFFER,ce,G,U,0);else if(v.depthTexture.format===bi)Ce(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,G,U,0,k):i.framebufferTexture2D(i.FRAMEBUFFER,ce,G,U,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(T){let v=n.get(T),P=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){let ae=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),ae){let V=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,ae.removeEventListener("dispose",V)};ae.addEventListener("dispose",V),v.__depthDisposeCallback=V}v.__boundDepthTexture=ae}if(T.depthTexture&&!v.__autoAllocateDepthBuffer)if(P)for(let ae=0;ae<6;ae++)ze(v.__webglFramebuffer[ae],T,ae);else T.texture.mipmaps.length>0?ze(v.__webglFramebuffer[0],T,0):ze(v.__webglFramebuffer,T,0);else if(P){v.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[ae]),v.__webglDepthbuffer[ae]===void 0)v.__webglDepthbuffer[ae]=i.createRenderbuffer(),He(v.__webglDepthbuffer[ae],T,!1);else{let V=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=v.__webglDepthbuffer[ae];i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,V,i.RENDERBUFFER,ie)}}else if(T.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),He(v.__webglDepthbuffer,T,!1);else{let V=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,V,i.RENDERBUFFER,ie)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Te(T,v,P){let ae=n.get(T);v!==void 0&&ue(ae.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),P!==void 0&&tt(T)}function ut(T){let v=T.texture,P=n.get(T),ae=n.get(v);T.addEventListener("dispose",W),B(T);let V=T.textures,ie=T.isWebGLCubeRenderTarget===!0,U=V.length>1;if(U||(ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture()),ae.__version=v.version,a.memory.textures++),ie){P.__webglFramebuffer=[];for(let k=0;k<6;k++)if(v.mipmaps.length>0){P.__webglFramebuffer[k]=[];for(let G=0;G<v.mipmaps.length;G++)P.__webglFramebuffer[k][G]=i.createFramebuffer()}else P.__webglFramebuffer[k]=i.createFramebuffer()}else{if(v.mipmaps.length>0){P.__webglFramebuffer=[];for(let k=0;k<v.mipmaps.length;k++)P.__webglFramebuffer[k]=i.createFramebuffer()}else P.__webglFramebuffer=i.createFramebuffer();if(U)for(let k=0,G=V.length;k<G;k++){let ce=n.get(V[k]);ce.__webglTexture===void 0&&(ce.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&Ce(T)===!1){P.__webglMultisampledFramebuffer=i.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let k=0;k<V.length;k++){let G=V[k];P.__webglColorRenderbuffer[k]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,P.__webglColorRenderbuffer[k]);let ce=r.convert(G.format,G.colorSpace),S=r.convert(G.type),I=R(G.internalFormat,ce,S,G.normalized,G.colorSpace,T.isXRRenderTarget===!0),Y=xt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Y,I,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.RENDERBUFFER,P.__webglColorRenderbuffer[k])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(P.__webglDepthRenderbuffer=i.createRenderbuffer(),He(P.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ie){t.bindTexture(i.TEXTURE_CUBE_MAP,ae.__webglTexture),Ze(i.TEXTURE_CUBE_MAP,v);for(let k=0;k<6;k++)if(v.mipmaps.length>0)for(let G=0;G<v.mipmaps.length;G++)ue(P.__webglFramebuffer[k][G],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+k,G);else ue(P.__webglFramebuffer[k],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+k,0);b(v)?x(i.TEXTURE_CUBE_MAP):v.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}else if(U){for(let k=0,G=V.length;k<G;k++){let ce=V[k],S=n.get(ce),I=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(I=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(I,S.__webglTexture),Ze(I,ce),ue(P.__webglFramebuffer,T,ce,i.COLOR_ATTACHMENT0+k,I,0),b(ce)&&x(I)}t.unbindTexture()}else{let k=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(k=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(k,ae.__webglTexture),Ze(k,v),v.mipmaps.length>0)for(let G=0;G<v.mipmaps.length;G++)ue(P.__webglFramebuffer[G],T,v,i.COLOR_ATTACHMENT0,k,G);else ue(P.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,k,0);b(v)?x(k):v.mipmaps.length>0&&i.texParameteri(k,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}T.depthBuffer&&tt(T)}function O(T){let v=T.textures;for(let P=0,ae=v.length;P<ae;P++){let V=v[P];if(b(V)&&V.mipmapsAutoUpdate===!0){let ie=A(T),U=n.get(V).__webglTexture;t.bindTexture(ie,U),x(ie),t.unbindTexture()}}}let Tt=[];function nt(T){if(T.samples>0){if(Ce(T)===!1){let v=T.textures,P=T.width,ae=T.height,V=i.COLOR_BUFFER_BIT,ie=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,U=n.get(T),k=v.length>1;if(k)for(let ce=0;ce<v.length;ce++)t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,U.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,U.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,U.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,U.__webglFramebuffer);for(let ce=0;ce<v.length;ce++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(V|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(V|=i.STENCIL_BUFFER_BIT)),k){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,U.__webglColorRenderbuffer[ce]);let S=n.get(v[ce]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,S,0)}i.blitFramebuffer(0,0,P,ae,0,0,P,ae,V,i.NEAREST),l===!0&&(Tt.length=0,Tt.push(i.COLOR_ATTACHMENT0+ce),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&Tt.push(ie),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Tt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),k)for(let ce=0;ce<v.length;ce++){t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,U.__webglColorRenderbuffer[ce]);let S=n.get(v[ce]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,U.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,S,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,U.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&l){let v=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function xt(T){return Math.min(s.maxSamples,T.samples)}function Ce(T){let v=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function re(T){let v=a.render.frame;u.get(T)!==v&&(u.set(T,v),T.update())}function _e(T,v){let P=T.colorSpace,ae=T.format,V=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||P!==pr&&P!==Ei&&(dt.getTransfer(P)===vt?(ae!==Zn||V!==_n)&&Je("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",P)),v}function Ie(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=Ue,this.resetTextureUnits=fe,this.getTextureUnits=he,this.setTextureUnits=Pe,this.setTexture2D=Ae,this.setTexture2DArray=de,this.setTexture3D=ke,this.setTextureCube=Re,this.rebindTextures=Te,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=nt,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=Ce,this.dispose=Z}function vx(i,e){function t(n,s=Ei){let r,a=dt.getTransfer(s);if(n===_n)return i.UNSIGNED_BYTE;if(n===Xo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Gc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Wc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Hc)return i.BYTE;if(n===Vc)return i.SHORT;if(n===Ws)return i.UNSIGNED_SHORT;if(n===Wo)return i.INT;if(n===qn)return i.UNSIGNED_INT;if(n===Un)return i.FLOAT;if(n===jt)return i.HALF_FLOAT;if(n===Xc)return i.ALPHA;if(n===Yc)return i.RGB;if(n===Zn)return i.RGBA;if(n===gi)return i.DEPTH_COMPONENT;if(n===bi)return i.DEPTH_STENCIL;if(n===qo)return i.RED;if(n===Zo)return i.RED_INTEGER;if(n===Gi)return i.RG;if(n===Ko)return i.RG_INTEGER;if(n===Jo)return i.RGBA_INTEGER;if(n===ra||n===aa||n===oa||n===la)if(a===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ra)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ra)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===la)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$o||n===jo||n===Qo||n===el)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===$o)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===el)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===tl||n===nl||n===il||n===sl||n===rl||n===ca||n===al)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===tl||n===nl)return a===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===il)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===sl)return r.COMPRESSED_R11_EAC;if(n===rl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ca)return r.COMPRESSED_RG11_EAC;if(n===al)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ol||n===ll||n===cl||n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===_l||n===xl||n===vl||n===yl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ol)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ll)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===cl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===hl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ul)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===dl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===pl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ml)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===gl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_l)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===vl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===yl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ml||n===Sl||n===bl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ml)return a===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Sl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===bl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===El||n===Tl||n===ha||n===wl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===El)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ha)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var yx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Mx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,mh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Pr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Lt({vertexShader:yx,fragmentShader:Mx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ft(new yi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},gh=class extends Vn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,p=null,m=null,f=null,g=null,y=typeof XRWebGLBinding<"u",d=new mh,h={},M=t.getContextAttributes(),b=null,x=null,A=[],R=[],_=new pe,w=null,B=null,L=new rn;L.viewport=new Pt;let F=new rn;F.viewport=new Pt;let W=[L,F],se=new ko,N=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let Ae=A[ee];return Ae===void 0&&(Ae=new Ds,A[ee]=Ae),Ae.getTargetRaySpace()},this.getControllerGrip=function(ee){let Ae=A[ee];return Ae===void 0&&(Ae=new Ds,A[ee]=Ae),Ae.getGripSpace()},this.getHand=function(ee){let Ae=A[ee];return Ae===void 0&&(Ae=new Ds,A[ee]=Ae),Ae.getHandSpace()};function te(ee){let Ae=R.indexOf(ee.inputSource);if(Ae===-1)return;let de=A[Ae];de!==void 0&&(de.update(ee.inputSource,ee.frame,c||a),de.dispatchEvent({type:ee.type,data:ee.inputSource}))}function K(){s.removeEventListener("select",te),s.removeEventListener("selectstart",te),s.removeEventListener("selectend",te),s.removeEventListener("squeeze",te),s.removeEventListener("squeezestart",te),s.removeEventListener("squeezeend",te),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",Me);for(let ee=0;ee<A.length;ee++){let Ae=R[ee];Ae!==null&&(R[ee]=null,A[ee].disconnect(Ae))}N=null,Z=null,d.reset();for(let ee in h)delete h[ee];if(e.setRenderTarget(b),f=null,m=null,p=null,s=null,x=null,Ue.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(_.width,_.height,!1),B!==null){let ee=B.camera;ee.fov=B.fov,ee.zoom=B.zoom,ee.updateProjectionMatrix(),B=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,n.isPresenting===!0&&Je("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,n.isPresenting===!0&&Je("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(ee){c=ee},this.getBaseLayer=function(){return m!==null?m:f},this.getBinding=function(){return p===null&&y&&(p=new XRWebGLBinding(s,t)),p},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",te),s.addEventListener("selectstart",te),s.addEventListener("selectend",te),s.addEventListener("squeeze",te),s.addEventListener("squeezestart",te),s.addEventListener("squeezeend",te),s.addEventListener("end",K),s.addEventListener("inputsourceschange",Me),M.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(_),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,ke=null,Re=null;M.depth&&(Re=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=M.stencil?bi:gi,ke=M.stencil?rs:qn);let Oe={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:r};p=this.getBinding(),m=p.createProjectionLayer(Oe),s.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),x=new zt(m.textureWidth,m.textureHeight,{format:Zn,type:_n,depthTexture:new xi(m.textureWidth,m.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}else{let de={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new zt(f.framebufferWidth,f.framebufferHeight,{format:Zn,type:_n,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ue.setContext(s),Ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function Me(ee){for(let Ae=0;Ae<ee.removed.length;Ae++){let de=ee.removed[Ae],ke=R.indexOf(de);ke>=0&&(R[ke]=null,A[ke].disconnect(de))}for(let Ae=0;Ae<ee.added.length;Ae++){let de=ee.added[Ae],ke=R.indexOf(de);if(ke===-1){for(let Oe=0;Oe<A.length;Oe++)if(Oe>=R.length){R.push(de),ke=Oe;break}else if(R[Oe]===null){R[Oe]=de,ke=Oe;break}if(ke===-1)break}let Re=A[ke];Re&&Re.connect(de)}}function q(ee,Ae){Ae===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(Ae.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let Ae=ee.near,de=ee.far;d.texture!==null&&(d.depthNear>0&&(Ae=d.depthNear),d.depthFar>0&&(de=d.depthFar)),se.near=F.near=L.near=Ae,se.far=F.far=L.far=de,(N!==se.near||Z!==se.far)&&(s.updateRenderState({depthNear:se.near,depthFar:se.far}),N=se.near,Z=se.far),se.layers.mask=ee.layers.mask|6,L.layers.mask=se.layers.mask&-5,F.layers.mask=se.layers.mask&-3;let ke=ee.parent,Re=se.cameras;q(se,ke);for(let Oe=0;Oe<Re.length;Oe++)q(Re[Oe],ke);se.projectionMatrix.copy(L.projectionMatrix),se.projectionMatrixInverse.copy(L.projectionMatrixInverse),B===null&&ee.isPerspectiveCamera&&(B={camera:ee,fov:ee.fov,zoom:ee.zoom}),fe(ee,se,ke)};function fe(ee,Ae,de){de===null?ee.matrix.copy(Ae.matrixWorld):(ee.matrix.copy(de.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(Ae.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(Ae.projectionMatrix),ee.projectionMatrixInverse.copy(Ae.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=Ps*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return se},this.getFoveation=function(){if(!(m===null&&f===null))return l},this.setFoveation=function(ee){l=ee,m!==null&&(m.fixedFoveation=ee),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ee)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(se)},this.getCameraTexture=function(ee){return h[ee]};let he=null;function Pe(ee,Ae){if(u=Ae.getViewerPose(c||a),g=Ae,u!==null){let de=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let ke=!1;de.length!==se.cameras.length&&(se.cameras.length=0,ke=!0);for(let Be=0;Be<de.length;Be++){let Ze=de[Be],le=null;if(f!==null)le=f.getViewport(Ze);else{let xe=p.getViewSubImage(m,Ze);le=xe.viewport,Be===0&&(e.setRenderTargetTextures(x,xe.colorTexture,xe.depthStencilTexture),e.setRenderTarget(x))}let X=W[Be];X===void 0&&(X=new rn,X.layers.enable(Be),X.viewport=new Pt,W[Be]=X),X.matrix.fromArray(Ze.transform.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale),X.projectionMatrix.fromArray(Ze.projectionMatrix),X.projectionMatrixInverse.copy(X.projectionMatrix).invert(),X.viewport.set(le.x,le.y,le.width,le.height),Be===0&&(se.matrix.copy(X.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale)),ke===!0&&se.cameras.push(X)}let Re=s.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){p=n.getBinding();let Be=p.getDepthInformation(de[0]);Be&&Be.isValid&&Be.texture&&d.init(Be,s.renderState)}if(Re&&Re.includes("camera-access")&&y){e.state.unbindTexture(),p=n.getBinding();for(let Be=0;Be<de.length;Be++){let Ze=de[Be].camera;if(Ze){let le=h[Ze];le||(le=new Pr,h[Ze]=le);let X=p.getCameraImage(Ze);le.sourceTexture=X}}}}for(let de=0;de<A.length;de++){let ke=R[de],Re=A[de];ke!==null&&Re!==void 0&&Re.update(ke,Ae,c||a)}he&&he(ee,Ae),Ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Ae}),g=null}let Ue=new wd;Ue.setAnimationLoop(Pe),this.setAnimationLoop=function(ee){he=ee},this.dispose=function(){}}},Sx=new lt,Fd=new Qe;Fd.set(-1,0,0,0,1,0,0,0,1);function bx(i,e){function t(d,h){d.matrixAutoUpdate===!0&&d.updateMatrix(),h.value.copy(d.matrix)}function n(d,h){h.color.getRGB(d.fogColor.value,ih(i)),h.isFog?(d.fogNear.value=h.near,d.fogFar.value=h.far):h.isFogExp2&&(d.fogDensity.value=h.density)}function s(d,h,M,b,x){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(d,h):h.isMeshLambertMaterial?(r(d,h),h.envMap&&(d.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(d,h),p(d,h)):h.isMeshPhongMaterial?(r(d,h),u(d,h),h.envMap&&(d.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(d,h),m(d,h),h.isMeshPhysicalMaterial&&f(d,h,x)):h.isMeshMatcapMaterial?(r(d,h),g(d,h)):h.isMeshDepthMaterial?r(d,h):h.isMeshDistanceMaterial?(r(d,h),y(d,h)):h.isMeshNormalMaterial?r(d,h):h.isLineBasicMaterial?(a(d,h),h.isLineDashedMaterial&&o(d,h)):h.isPointsMaterial?l(d,h,M,b):h.isSpriteMaterial?c(d,h):h.isShadowMaterial?(d.color.value.copy(h.color),d.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(d,h){d.opacity.value=h.opacity,h.color&&d.diffuse.value.copy(h.color),h.emissive&&d.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(d.map.value=h.map,t(h.map,d.mapTransform)),h.alphaMap&&(d.alphaMap.value=h.alphaMap,t(h.alphaMap,d.alphaMapTransform)),h.bumpMap&&(d.bumpMap.value=h.bumpMap,t(h.bumpMap,d.bumpMapTransform),d.bumpScale.value=h.bumpScale,h.side===mn&&(d.bumpScale.value*=-1)),h.normalMap&&(d.normalMap.value=h.normalMap,t(h.normalMap,d.normalMapTransform),d.normalScale.value.copy(h.normalScale),h.side===mn&&d.normalScale.value.negate()),h.displacementMap&&(d.displacementMap.value=h.displacementMap,t(h.displacementMap,d.displacementMapTransform),d.displacementScale.value=h.displacementScale,d.displacementBias.value=h.displacementBias),h.emissiveMap&&(d.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,d.emissiveMapTransform)),h.specularMap&&(d.specularMap.value=h.specularMap,t(h.specularMap,d.specularMapTransform)),h.alphaTest>0&&(d.alphaTest.value=h.alphaTest);let M=e.get(h),b=M.envMap,x=M.envMapRotation;b&&(d.envMap.value=b,d.envMapRotation.value.setFromMatrix4(Sx.makeRotationFromEuler(x)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&d.envMapRotation.value.premultiply(Fd),d.reflectivity.value=h.reflectivity,d.ior.value=h.ior,d.refractionRatio.value=h.refractionRatio),h.lightMap&&(d.lightMap.value=h.lightMap,d.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,d.lightMapTransform)),h.aoMap&&(d.aoMap.value=h.aoMap,d.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,d.aoMapTransform))}function a(d,h){d.diffuse.value.copy(h.color),d.opacity.value=h.opacity,h.map&&(d.map.value=h.map,t(h.map,d.mapTransform))}function o(d,h){d.dashSize.value=h.dashSize,d.totalSize.value=h.dashSize+h.gapSize,d.scale.value=h.scale}function l(d,h,M,b){d.diffuse.value.copy(h.color),d.opacity.value=h.opacity,d.size.value=h.size*M,d.scale.value=b*.5,h.map&&(d.map.value=h.map,t(h.map,d.uvTransform)),h.alphaMap&&(d.alphaMap.value=h.alphaMap,t(h.alphaMap,d.alphaMapTransform)),h.alphaTest>0&&(d.alphaTest.value=h.alphaTest)}function c(d,h){d.diffuse.value.copy(h.color),d.opacity.value=h.opacity,d.rotation.value=h.rotation,h.map&&(d.map.value=h.map,t(h.map,d.mapTransform)),h.alphaMap&&(d.alphaMap.value=h.alphaMap,t(h.alphaMap,d.alphaMapTransform)),h.alphaTest>0&&(d.alphaTest.value=h.alphaTest)}function u(d,h){d.specular.value.copy(h.specular),d.shininess.value=Math.max(h.shininess,1e-4)}function p(d,h){h.gradientMap&&(d.gradientMap.value=h.gradientMap)}function m(d,h){d.metalness.value=h.metalness,h.metalnessMap&&(d.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,d.metalnessMapTransform)),d.roughness.value=h.roughness,h.roughnessMap&&(d.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,d.roughnessMapTransform)),h.envMap&&(d.envMapIntensity.value=h.envMapIntensity)}function f(d,h,M){d.ior.value=h.ior,h.diffuseRoughness>0&&(d.diffuseRoughness.value=h.diffuseRoughness,h.diffuseRoughnessMap&&(d.diffuseRoughnessMap.value=h.diffuseRoughnessMap,t(h.diffuseRoughnessMap,d.diffuseRoughnessMapTransform))),h.sheen>0&&(d.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),d.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(d.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,d.sheenColorMapTransform)),h.sheenRoughnessMap&&(d.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,d.sheenRoughnessMapTransform))),h.clearcoat>0&&(d.clearcoat.value=h.clearcoat,d.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(d.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,d.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(d.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===mn&&d.clearcoatNormalScale.value.negate())),h.dispersion>0&&(d.dispersion.value=h.dispersion),h.retroreflectivity>0&&(d.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(d.iridescence.value=h.iridescence,d.iridescenceIOR.value=h.iridescenceIOR,d.iridescenceThicknessMinimum.value=h.iridescenceThicknessMinimum,d.iridescenceThicknessMaximum.value=h.iridescenceThicknessMaximum,h.iridescenceMap&&(d.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,d.iridescenceMapTransform)),h.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),h.transmission>0&&(d.transmission.value=h.transmission,d.transmissionSamplerMap.value=M.texture,d.transmissionSamplerSize.value.set(M.width,M.height),h.transmissionMap&&(d.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,d.transmissionMapTransform)),d.thickness.value=h.thickness,h.thicknessMap&&(d.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=h.attenuationDistance,d.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(d.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(d.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=h.specularIntensity,d.specularColor.value.copy(h.specularColor),h.specularColorMap&&(d.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,d.specularColorMapTransform)),h.specularIntensityMap&&(d.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,h){h.matcap&&(d.matcap.value=h.matcap)}function y(d,h){let M=e.get(h).light;d.referencePosition.value.setFromMatrixPosition(M.matrixWorld),d.nearDistance.value=M.shadow.camera.near,d.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ex(i,e,t,n){let s={},r={};function a(M,b){let x=b.program;n.uniformBlockBinding(M,x,s[M.id])}function o(M,b){let x=s[M.id];x===void 0&&(g(M),x=l(M),s[M.id]=x,M.addEventListener("dispose",d));let A=b.program;n.updateUBOMapping(M,A);let R=e.render.frame;r[M.id]!==R&&(c(M),r[M.id]=R)}function l(M){let b=i.createBuffer(),x=M.__size,A=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,x,A),i.bindBuffer(i.UNIFORM_BUFFER,null),b}function c(M){let b=s[M.id],x=M.uniforms,A=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let R=0,_=x.length;R<_;R++){let w=x[R];if(Array.isArray(w))for(let B=0,L=w.length;B<L;B++)u(w[B],R,B,A);else u(w,R,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(M,b,x,A){if(m(M,b,x,A)===!0){let R=M.__offset,_=M.value;if(Array.isArray(_)){let w=0;for(let B=0;B<_.length;B++){let L=_[B],F=y(L,!0);p(L,M.__data,w),w+=F.storage/Float32Array.BYTES_PER_ELEMENT}}else p(_,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,R,M.__data)}}function p(M,b,x){typeof M=="number"||typeof M=="boolean"?b[x]=M:M.isMatrix3?(b[x]=M.elements[0],b[x+1]=M.elements[1],b[x+2]=M.elements[2],b[x+3]=0,b[x+4]=M.elements[3],b[x+5]=M.elements[4],b[x+6]=M.elements[5],b[x+7]=0,b[x+8]=M.elements[6],b[x+9]=M.elements[7],b[x+10]=M.elements[8],b[x+11]=0):ArrayBuffer.isView(M)?b.set(M.subarray(0,b.length-x),x):M.toArray(b,x)}function m(M,b,x,A){let R=M.value,_=b+"_"+x;if(Array.isArray(R)){A[_]===void 0&&(A[_]=[]);let w=A[_],B=!1;for(let L=0;L<R.length;L++)f(R[L],w,L)===!0&&(B=!0);return B}return f(R,A,_)}function f(M,b,x){if(b[x]===void 0)return typeof M=="number"||typeof M=="boolean"?b[x]=M:ArrayBuffer.isView(M)?b[x]=M.slice():b[x]=M.clone(),!0;{let A=b[x];if(typeof M=="number"||typeof M=="boolean"){if(A!==M)return b[x]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(A.equals(M)===!1)return A.copy(M),!0}}return!1}function g(M){let b=M.uniforms,x=0,A=16;for(let _=0,w=b.length;_<w;_++){let B=Array.isArray(b[_])?b[_]:[b[_]];for(let L=0,F=B.length;L<F;L++){let W=B[L],se=Array.isArray(W.value)?W.value:[W.value],N=Array.isArray(b[_])||Array.isArray(W.value),Z=x;for(let K=0,Me=se.length;K<Me;K++){let q=se[K],fe=y(q,N),he=x%A,Pe=he%fe.boundary,Ue=he+Pe;x+=Pe,Ue!==0&&A-Ue<fe.storage&&(x+=A-Ue),K===0&&(Z=x),x+=fe.storage}let te=W.type==="int"?Int32Array:W.type==="uint"?Uint32Array:Float32Array;W.__data=new te((x-Z)/Float32Array.BYTES_PER_ELEMENT),W.__offset=Z}}let R=x%A;return R>0&&(x+=A-R),M.__size=x,M.__cache={},this}function y(M,b){let x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=16,x.storage=48):M.isMatrix4?(x.boundary=16,x.storage=64):M.isTexture?Je("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(x.boundary=16,x.storage=M.byteLength):Je("WebGLRenderer: Unsupported uniform value type.",M),b===!0&&(x.boundary=16,x.storage=Math.ceil(x.storage/16)*16),x}function d(M){let b=M.target;b.removeEventListener("dispose",d),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function h(){for(let M in s)i.deleteBuffer(s[M]);s={},r={}}return{bind:a,update:o,dispose:h}}var Tx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),si=null;function wx(){return si===null&&(si=new Tr(Tx,16,16,Gi,jt),si.name="DFG_LUT",si.minFilter=dn,si.magFilter=dn,si.wrapS=jn,si.wrapT=jn,si.generateMipmaps=!1,si.needsUpdate=!0),si}var Ll=class{constructor(e={}){let{canvas:t=qu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:m=!1,outputBufferType:f=_n}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let y=f,d=new Set([Jo,Ko,Zo]),h=new Set([_n,qn,Ws,rs,Xo,Yo]),M=new Uint32Array(4),b=new Int32Array(4),x={textures:[],min:[],max:[],resolution:[]},A=null,R=null,_=[],w=[],B=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ii,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,F=!1,W=null,se=null,N=null,Z=null;this._outputColorSpace=un;let te=0,K=0,Me=null,q=-1,fe=null,he=new Pt,Pe=new Pt,Ue=null,ee=new Ke(0),Ae=0,de=t.width,ke=t.height,Re=1,Oe=null,ht=null,Be=new Pt(0,0,de,ke),Ze=new Pt(0,0,de,ke),le=!1,X=new Ni,xe=new yo,me=!1,Se=!1,ue=new lt,He=new C,ze=new Pt,tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function ut(){return Me===null?Re:1}let O=n;function Tt(E,z){return t.getContext(E,z)}let nt,xt,Ce,re,_e,Ie,T,v,P,ae,V,ie,U,k,G,ce,S,I,Y,be,Ee,ve,we;try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",J,!1),t.addEventListener("webglcontextcreationerror",j,!1),O===null){let z="webgl2";if(O=Tt(z,E),O===null)throw Tt(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}H()}catch(E){throw t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",J,!1),t.removeEventListener("webglcontextcreationerror",j,!1),$e("WebGLRenderer: "+E.message),E}function H(){nt=new O0(O),nt.init(),Ee=new vx(O,nt),xt=new w0(O,nt,e,Ee),Ce=new _x(O,nt),xt.reversedDepthBuffer&&m&&Ce.buffers.depth.setReversed(!0),se=O.createFramebuffer(),N=O.createFramebuffer(),Z=O.createFramebuffer(),re=new k0(O),_e=new ix,Ie=new xx(O,nt,Ce,_e,xt,Ee,re),T=new F0(L),v=new Vp(O),ve=new E0(O,v),P=new B0(O,v,re,ve),ae=new V0(O,P,v,ve,re),I=new H0(O,xt,Ie),G=new A0(_e),V=new nx(L,T,nt,xt,ve,G),ie=new bx(L,_e),U=new rx,k=new ux(nt),S=new b0(L,T,Ce,ae,g,l),ce=new gx(L,ae,xt),we=new Ex(O,re,xt,Ce),Y=new T0(O,nt,re),be=new z0(O,nt,re),re.programs=V.programs,L.capabilities=xt,L.extensions=nt,L.properties=_e,L.renderLists=U,L.shadowMap=ce,L.state=Ce,L.info=re}y!==_n&&(B=new W0(y,t.width,t.height,o,s,r));let D=new gh(L,O);this.xr=D,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let E=nt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=nt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Re},this.setPixelRatio=function(E){E!==void 0&&(Re=E,this.setSize(de,ke,!1))},this.getSize=function(E){return E.set(de,ke)},this.setSize=function(E,z,oe=!0){if(D.isPresenting){Je("WebGLRenderer: Can't change size while VR device is presenting.");return}de=E,ke=z,t.width=Math.floor(E*Re),t.height=Math.floor(z*Re),oe===!0&&(t.style.width=E+"px",t.style.height=z+"px"),B!==null&&B.setSize(t.width,t.height),this.setViewport(0,0,E,z)},this.getDrawingBufferSize=function(E){return E.set(de*Re,ke*Re).floor()},this.setDrawingBufferSize=function(E,z,oe){de=E,ke=z,Re=oe,t.width=Math.floor(E*oe),t.height=Math.floor(z*oe),this.setViewport(0,0,E,z)},this.setEffects=function(E){if(y===_n){$e("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let z=0;z<E.length;z++)if(E[z].isOutputPass===!0){Je("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}B.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(he)},this.getViewport=function(E){return E.copy(Be)},this.setViewport=function(E,z,oe,$){E.isVector4?Be.set(E.x,E.y,E.z,E.w):Be.set(E,z,oe,$),Ce.viewport(he.copy(Be).multiplyScalar(ut()).round())},this.getScissor=function(E){return E.copy(Ze)},this.setScissor=function(E,z,oe,$){E.isVector4?Ze.set(E.x,E.y,E.z,E.w):Ze.set(E,z,oe,$),Ce.scissor(Pe.copy(Ze).multiplyScalar(ut()).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(E){Ce.setScissorTest(le=E)},this.setOpaqueSort=function(E){Oe=E},this.setTransparentSort=function(E){ht=E},this.getClearColor=function(E){return E.copy(S.getClearColor())},this.setClearColor=function(){S.setClearColor(...arguments)},this.getClearAlpha=function(){return S.getClearAlpha()},this.setClearAlpha=function(){S.setClearAlpha(...arguments)},this.clear=function(E=!0,z=!0,oe=!0){let $=0;if(E){let Q=!1;if(Me!==null){let De=Me.texture.format;Q=d.has(De)}if(Q){let De=Me.texture.type,Ge=h.has(De),Le=S.getClearColor(),Fe=S.getClearAlpha(),qe=Le.r,st=Le.g,pt=Le.b;Ge?(M[0]=qe,M[1]=st,M[2]=pt,M[3]=Fe,O.clearBufferuiv(O.COLOR,0,M)):(b[0]=qe,b[1]=st,b[2]=pt,b[3]=Fe,O.clearBufferiv(O.COLOR,0,b))}else $|=O.COLOR_BUFFER_BIT}z&&($|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),oe&&($|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&O.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),W=E},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",J,!1),t.removeEventListener("webglcontextcreationerror",j,!1),S.dispose(),U.dispose(),k.dispose(),Ie.dispose(),_e.dispose(),T.dispose(),ae.dispose(),P.dispose(),ve.dispose(),we.dispose(),V.dispose(),D.dispose(),D.removeEventListener("sessionstart",it),D.removeEventListener("sessionend",bt),Rt.stop()};function ne(E){E.preventDefault(),_r("WebGLRenderer: Context Lost."),F=!0}function J(){_r("WebGLRenderer: Context Restored."),F=!1;let E=re.autoReset,z=ce.enabled,oe=ce.autoUpdate,$=ce.needsUpdate,Q=ce.type;H(),re.autoReset=E,ce.enabled=z,ce.autoUpdate=oe,ce.needsUpdate=$,ce.type=Q}function j(E){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ye(E){let z=E.target;z.removeEventListener("dispose",ye),ge(z)}function ge(E){Ye(E),_e.remove(E)}function Ye(E){let z=_e.get(E).programs;z!==void 0&&(z.forEach(function(oe){V.releaseProgram(oe)}),E.isShaderMaterial&&V.releaseShaderCache(E))}this.renderBufferDirect=function(E,z,oe,$,Q,De){z===null&&(z=tt);let Ge=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,Le=os(E,z,oe,$,Q);Ce.setMaterial($,Ge);let Fe=oe.index,qe=1;if($.wireframe===!0){if(Fe=P.getWireframeAttribute(oe),Fe===void 0)return;qe=2}let st=oe.drawRange,pt=oe.attributes.position,We=st.start*qe,mt=(st.start+st.count)*qe;De!==null&&(We=Math.max(We,De.start*qe),mt=Math.min(mt,(De.start+De.count)*qe)),Fe!==null?(We=Math.max(We,0),mt=Math.min(mt,Fe.count)):pt!=null&&(We=Math.max(We,0),mt=Math.min(mt,pt.count));let Ot=mt-We;if(Ot<0||Ot===1/0)return;ve.setup(Q,$,Le,oe,Fe);let wt,Et=Y;if(Fe!==null&&(wt=v.get(Fe),Et=be,Et.setIndex(wt)),Q.isMesh)$.wireframe===!0?(Ce.setLineWidth($.wireframeLinewidth*ut()),Et.setMode(O.LINES)):Et.setMode(O.TRIANGLES);else if(Q.isLine){let en=$.linewidth;en===void 0&&(en=1),Ce.setLineWidth(en*ut()),Q.isLineSegments?Et.setMode(O.LINES):Q.isLineLoop?Et.setMode(O.LINE_LOOP):Et.setMode(O.LINE_STRIP)}else Q.isPoints?Et.setMode(O.POINTS):Q.isSprite&&Et.setMode(O.TRIANGLES);if(Q.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))Et.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{let en=Q._multiDrawStarts,Xe=Q._multiDrawCounts,cn=Q._multiDrawCount,Mt=Fe?v.get(Fe).bytesPerElement:1,Xi=_e.get($).currentProgram.getUniforms();for(let tn=0;tn<cn;tn++)Xi.setValue(O,"_gl_DrawID",tn),Et.render(en[tn]/Mt,Xe[tn])}else if(Q.isInstancedMesh)Et.renderInstances(We,Ot,Q.count);else if(oe.isInstancedBufferGeometry){let en=oe._maxInstanceCount!==void 0?oe._maxInstanceCount:1/0,Xe=Math.min(oe.instanceCount,en);Et.renderInstances(We,Ot,Xe)}else Et.render(We,Ot)};function at(E,z,oe,$){W!==null&&E.isNodeMaterial&&W.setObject($,E),me===!0&&G.setState(E,oe,!1),E.transparent===!0&&E.side===gn&&E.forceSinglePass===!1?(E.side=mn,E.needsUpdate=!0,ln(E,z,$),E.side=Vi,E.needsUpdate=!0,ln(E,z,$),E.side=gn):ln(E,z,$)}this.compile=function(E,z,oe=null){oe===null&&(oe=E),W!==null&&W.renderStart(E,z,oe),R=k.get(oe),R.init(z),w.push(R),oe.traverseVisible(function(Q){Q.isLight&&Q.layers.test(z.layers)&&(R.pushLight(Q),Q.castShadow&&R.pushShadow(Q))}),E!==oe&&E.traverseVisible(function(Q){Q.isLight&&Q.layers.test(z.layers)&&(R.pushLight(Q),Q.castShadow&&R.pushShadow(Q))}),R.setupLights(),W!==null&&W.updateLights(R.state.lightsArray),Se=this.localClippingEnabled,me=G.init(this.clippingPlanes,Se),me===!0&&G.setGlobalState(this.clippingPlanes,z),W!==null&&ce.render(R.state.shadowsArray,oe,z);let $=new Set;return E.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;let De=Q.material;if(De)if(Array.isArray(De))for(let Ge=0;Ge<De.length;Ge++){let Le=De[Ge];at(Le,oe,z,Q),$.add(Le)}else at(De,oe,z,Q),$.add(De)}),R=w.pop(),W!==null&&W.renderEnd(),$},this.compileAsync=function(E,z,oe=null){let $=this.compile(E,z,oe);return new Promise(Q=>{function De(){if($.forEach(function(Ge){let Fe=_e.get(Ge).currentProgram;(Fe===void 0||Fe.isReady())&&$.delete(Ge)}),$.size===0){Q(E);return}setTimeout(De,10)}nt.get("KHR_parallel_shader_compile")!==null?De():setTimeout(De,10)})};let Ve=null;function yt(E){Ve&&Ve(E)}function it(){Rt.stop()}function bt(){Rt.start()}let Rt=new wd;Rt.setAnimationLoop(yt),typeof self<"u"&&Rt.setContext(self),this.setAnimationLoop=function(E){Ve=E,D.setAnimationLoop(E),E===null?Rt.stop():Rt.start()},D.addEventListener("sessionstart",it),D.addEventListener("sessionend",bt),this.render=function(E,z){if(z!==void 0&&z.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;W!==null&&W.renderStart(E,z);let oe=D.enabled===!0&&D.isPresenting===!0,$=B!==null&&(Me===null||oe)&&B.begin(L,Me);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),D.enabled===!0&&D.isPresenting===!0&&(B===null||B.isCompositing()===!1)&&(D.cameraAutoUpdate===!0&&D.updateCamera(z),z=D.getCamera()),E.isScene===!0&&E.onBeforeRender(L,E,z,Me),R=k.get(E,w.length),R.init(z),R.state.textureUnits=Ie.getTextureUnits(),w.push(R),ue.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),z.isArrayCamera?xe.setFromArrayCamera(z):X.setFromProjectionMatrix(ue,Ln,z.reversedDepth),Se=this.localClippingEnabled,me=G.init(this.clippingPlanes,Se),A=U.get(E,_.length),A.init(),_.push(A),this.info.render.frame++,D.enabled===!0&&D.isPresenting===!0){let Ge=L.xr.getDepthSensingMesh();Ge!==null&&It(Ge,z,-1/0,L.sortObjects)}It(E,z,0,L.sortObjects),A.finish(),W!==null&&W.updateLights(R.state.lightsArray),L.sortObjects===!0&&A.sort(Oe,ht),Te=D.enabled===!1||D.isPresenting===!1||D.hasDepthSensing()===!1,Te&&S.addToRenderList(A,E),this.info.autoReset===!0&&this.info.reset(),me===!0&&G.beginShadows();let Q=R.state.shadowsArray;if(ce.render(Q,E,z),me===!0&&G.endShadows(),($&&B.hasRenderPass())===!1){let Ge=A.opaque,Le=A.transmissive;if(R.setupLights(),z.isArrayCamera){let Fe=z.cameras;if(Le.length>0)for(let qe=0,st=Fe.length;qe<st;qe++){let pt=Fe[qe];Ft(Ge,Le,E,pt)}Te&&S.render(E);for(let qe=0,st=Fe.length;qe<st;qe++){let pt=Fe[qe];Wt(A,E,pt,pt.viewport)}}else Le.length>0&&Ft(Ge,Le,E,z),Te&&S.render(E),Wt(A,E,z)}Me!==null&&K===0&&(Ie.updateMultisampleRenderTarget(Me),Ie.updateRenderTargetMipmap(Me)),$&&B.end(L),E.isScene===!0&&E.onAfterRender(L,E,z),ve.resetDefaultState(),q=-1,fe=null,w.pop(),w.length>0?(R=w[w.length-1],Ie.setTextureUnits(R.state.textureUnits),me===!0&&G.setGlobalState(L.clippingPlanes,R.state.camera)):R=null,_.pop(),_.length>0?A=_[_.length-1]:A=null,W!==null&&W.renderEnd()};function It(E,z,oe,$){if(E.visible===!1)return;if(E.layers.test(z.layers)){if(E.isGroup)oe=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(z);else if(E.isLight)R.pushLight(E),E.castShadow&&R.pushShadow(E);else if(E.isSprite){let Ge=z.isArrayCamera?xe:X;if(!E.frustumCulled||E.intersectsFrustum(Ge)){$&&ze.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ue);let Le=ae.update(E),Fe=E.material;Fe.visible&&A.push(E,Le,Fe,oe,ze.z,null,z)}}else if(E.isMesh||E.isLine||E.isPoints){let Ge=z.isArrayCamera?xe:X;if(!E.frustumCulled||E.intersectsFrustum(Ge)){let Le=ae.update(E),Fe=E.material;if($&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ze.copy(E.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),ze.copy(Le.boundingSphere.center)),ze.applyMatrix4(E.matrixWorld).applyMatrix4(ue)),Array.isArray(Fe)){let qe=Le.groups;for(let st=0,pt=qe.length;st<pt;st++){let We=qe[st],mt=Fe[We.materialIndex];mt&&mt.visible&&A.push(E,Le,mt,oe,ze.z,We,z)}}else Fe.visible&&A.push(E,Le,Fe,oe,ze.z,null,z)}}}let De=E.children;for(let Ge=0,Le=De.length;Ge<Le;Ge++)It(De[Ge],z,oe,$)}function Wt(E,z,oe,$){let{opaque:Q,transmissive:De,transparent:Ge}=E;R.setupLightsView(oe),me===!0&&G.setGlobalState(L.clippingPlanes,oe),$&&Ce.viewport(he.copy($)),Q.length>0&&Qt(Q,z,oe),De.length>0&&Qt(De,z,oe),Ge.length>0&&Qt(Ge,z,oe),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function Ft(E,z,oe,$){if((oe.isScene===!0?oe.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[$.id]===void 0){let We=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[$.id]=new zt(1,1,{generateMipmaps:!0,type:We?jt:_n,minFilter:Si,samples:Math.max(4,xt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:dt.workingColorSpace})}let De=R.state.transmissionRenderTarget[$.id],Ge=$.viewport||he;De.setSize(Ge.z*L.transmissionResolutionScale,Ge.w*L.transmissionResolutionScale);let Le=L.getRenderTarget(),Fe=L.getActiveCubeFace(),qe=L.getActiveMipmapLevel();L.setRenderTarget(De),L.getClearColor(ee),Ae=L.getClearAlpha(),Ae<1&&L.setClearColor(16777215,.5),L.clear(),Te&&S.render(oe);let st=L.toneMapping;L.toneMapping=ii;let pt=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),R.setupLightsView($),me===!0&&G.setGlobalState(L.clippingPlanes,$),Qt(E,oe,$),Ie.updateMultisampleRenderTarget(De),Ie.updateRenderTargetMipmap(De),nt.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let mt=0,Ot=z.length;mt<Ot;mt++){let wt=z[mt],{object:Et,geometry:en,material:Xe,group:cn}=wt;if(Xe.side===gn&&Et.layers.test($.layers)){let Mt=Xe.side;Xe.side=mn,Xe.needsUpdate=!0,li(Et,oe,$,en,Xe,cn),Xe.side=Mt,Xe.needsUpdate=!0,We=!0}}We===!0&&(Ie.updateMultisampleRenderTarget(De),Ie.updateRenderTargetMipmap(De))}L.setRenderTarget(Le,Fe,qe),L.setClearColor(ee,Ae),pt!==void 0&&($.viewport=pt),L.toneMapping=st}function Qt(E,z,oe){let $=z.isScene===!0?z.overrideMaterial:null;for(let Q=0,De=E.length;Q<De;Q++){let Ge=E[Q],{object:Le,geometry:Fe,group:qe}=Ge,st=Ge.material;st.allowOverride===!0&&$!==null&&(st=$),Le.layers.test(oe.layers)&&li(Le,z,oe,Fe,st,qe)}}function li(E,z,oe,$,Q,De){W!==null&&Q.isNodeMaterial&&W.setObject(E,Q),E.onBeforeRender(L,z,oe,$,Q,De),E.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),Q.onBeforeRender(L,z,oe,$,E,De),Q.transparent===!0&&Q.side===gn&&Q.forceSinglePass===!1?(Q.side=mn,Q.needsUpdate=!0,L.renderBufferDirect(oe,z,$,Q,E,De),Q.side=Vi,Q.needsUpdate=!0,L.renderBufferDirect(oe,z,$,Q,E,De),Q.side=gn):L.renderBufferDirect(oe,z,$,Q,E,De),E.onAfterRender(L,z,oe,$,Q,De)}function In(E){let z=0;for(let oe of E)oe.texture!==null&&z++;return z}function ln(E,z,oe){z.isScene!==!0&&(z=tt);let $=_e.get(E),Q=R.state.lights,De=R.state.shadowsArray,Ge=Q.state.version,Le=V.getParameters(E,Q.state,De,z,oe,R.state.lightProbeGridArray),Fe=V.getProgramCacheKey(Le),qe=$.programs;$.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?z.environment:null,$.fog=z.fog;let st=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;$.envMap=T.get(E.envMap||$.environment,st),$.envMapRotation=$.environment!==null&&E.envMap===null?z.environmentRotation:E.envMapRotation,qe===void 0&&(E.addEventListener("dispose",ye),qe=new Map,$.programs=qe,$.programVariants=new Map);let pt=qe.get(Fe);if(pt!==void 0){if($.currentProgram===pt&&$.lightsStateVersion===Ge)return Xt(E,Le),pt}else Le.uniforms=V.getUniforms(E),W!==null&&E.isNodeMaterial&&W.build(E,oe,Le),E.onBeforeCompile(Le,L),pt=V.acquireProgram(Le,Fe),qe.set(Fe,pt),$.uniforms=Le.uniforms;let We=$.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(We.clippingPlanes=G.uniform),Xt(E,Le),$.needsLights=gf(E),$.lightsStateVersion=Ge,$.needsLights&&(We.ambientLightColor.value=Q.state.ambient,We.lightProbe.value=Q.state.probe,We.sunLights.value=Q.state.sun,We.sunLightShadows.value=Q.state.sunShadow,We.directionalLights.value=Q.state.directional,We.directionalLightShadows.value=Q.state.directionalShadow,We.spotLights.value=Q.state.spot,We.spotLightShadows.value=Q.state.spotShadow,We.rectAreaLights.value=Q.state.rectArea,We.ltc_1.value=Q.state.rectAreaLTC1,We.ltc_2.value=Q.state.rectAreaLTC2,We.pointLights.value=Q.state.point,We.pointLightShadows.value=Q.state.pointShadow,We.hemisphereLights.value=Q.state.hemi,We.sunShadowMatrix.value=Q.state.sunShadowMatrix,We.sunShadowCascade.value=Q.state.sunShadowCascade,We.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,We.spotLightMatrix.value=Q.state.spotLightMatrix,We.spotLightMap.value=Q.state.spotLightMap,We.pointShadowMatrix.value=Q.state.pointShadowMatrix),$.numLightProbeGrids=In(R.state.lightProbeGridArray),$.currentProgram=pt,$.uniformsList=null,pt}function Kn(E,z,oe,$,Q){let De=_e.get(E),Ge=De.currentProgram.id+","+$+","+Q,Le=De.programVariants.get(Ge);return Le===void 0?(Le=ln(E,z,oe),De.programVariants.set(Ge,Le)):(De.currentProgram=Le,De.uniformsList=null,De.outputColorSpace=$,De.toneMapping=Q),Le}function et(E){if(E.uniformsList===null){let z=E.currentProgram.getUniforms();E.uniformsList=Xs.seqWithValue(z.seq,E.uniforms)}return E.uniformsList}function Xt(E,z){let oe=_e.get(E);oe.outputColorSpace=z.outputColorSpace,oe.batching=z.batching,oe.batchingColor=z.batchingColor,oe.instancing=z.instancing,oe.instancingColor=z.instancingColor,oe.instancingMorph=z.instancingMorph,oe.skinning=z.skinning,oe.morphTargets=z.morphTargets,oe.morphNormals=z.morphNormals,oe.morphColors=z.morphColors,oe.morphTargetsCount=z.morphTargetsCount,oe.numClippingPlanes=z.numClippingPlanes,oe.numIntersection=z.numClipIntersection,oe.vertexAlphas=z.vertexAlphas,oe.vertexTangents=z.vertexTangents,oe.toneMapping=z.toneMapping}function os(E,z,oe,$,Q){z.isScene!==!0&&(z=tt),Ie.resetTextureUnits();let De=z.fog,Ge=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?z.environment:null,Le=Me===null?L.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:dt.workingColorSpace,Fe=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,qe=T.get($.envMap||Ge,Fe),st=$.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,pt=!!oe.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),We=!!oe.morphAttributes.position,mt=!!oe.morphAttributes.normal,Ot=!!oe.morphAttributes.color,wt=ii;$.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(wt=L.toneMapping);let Et=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,en=Et!==void 0?Et.length:0,Xe=_e.get($),cn=R.state.lights;if(me===!0&&(Se===!0||E!==fe)){let Dt=E===fe&&$.id===q;G.setState($,E,Dt)}let Mt=!1,Xi=!1;$.version===Xe.__version?Xe.needsLights&&Xe.lightsStateVersion!==cn.state.version||Q.isBatchedMesh&&Xe.batching===!1||!Q.isBatchedMesh&&Xe.batching===!0||Q.isBatchedMesh&&Xe.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&Xe.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&Xe.instancing===!1||!Q.isInstancedMesh&&Xe.instancing===!0||Q.isSkinnedMesh&&Xe.skinning===!1||!Q.isSkinnedMesh&&Xe.skinning===!0||Q.isInstancedMesh&&Xe.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Xe.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Xe.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Xe.instancingMorph===!1&&Q.morphTexture!==null||Xe.envMap!==qe||$.fog===!0&&Xe.fog!==De||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==G.numPlanes||Xe.numIntersection!==G.numIntersection)||Xe.vertexAlphas!==st||Xe.vertexTangents!==pt||Xe.morphTargets!==We||Xe.morphNormals!==mt||Xe.morphColors!==Ot||Xe.morphTargetsCount!==en||Xe.numLightProbeGrids!==In(R.state.lightProbeGridArray)?Mt=!0:(Xe.outputColorSpace!==Le||Xe.toneMapping!==wt)&&(Xi=!0):(Mt=!0,Xe.__version=$.version);let tn=Xe.currentProgram;(Mt===!0||Xi===!0)&&(tn=Xi===!0?Kn($,z,Q,Le,wt):ln($,z,Q),W&&$.isNodeMaterial&&W.onUpdateProgram($,tn,Xe));let ba=!1,Ai=!1,Yi=!1,gt=tn.getUniforms(),Jt=Xe.uniforms;if(Ce.useProgram(tn.program)&&(ba=!0,Ai=!0,Yi=!0),$.id!==q&&(q=$.id,Ai=!0),ba||fe!==E){Ce.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),gt.setValue(O,"projectionMatrix",E.projectionMatrix),gt.setValue(O,"viewMatrix",E.matrixWorldInverse);let Yt=gt.map.cameraPosition;Yt!==void 0&&Yt.setValue(O,He.setFromMatrixPosition(E.matrixWorld)),xt.logarithmicDepthBuffer&&gt.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&gt.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),fe!==E&&(fe=E,Ai=!0,Yi=!0)}if(Xe.needsLights&&(cn.state.sunShadowMap.length>0&&gt.setValue(O,"sunShadowMap",cn.state.sunShadowMap,Ie),cn.state.directionalShadowMap.length>0&&gt.setValue(O,"directionalShadowMap",cn.state.directionalShadowMap,Ie),cn.state.spotShadowMap.length>0&&gt.setValue(O,"spotShadowMap",cn.state.spotShadowMap,Ie),cn.state.pointShadowMap.length>0&&gt.setValue(O,"pointShadowMap",cn.state.pointShadowMap,Ie)),Q.isSkinnedMesh){gt.setOptional(O,Q,"bindMatrix"),gt.setOptional(O,Q,"bindMatrixInverse");let Dt=Q.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),gt.setValue(O,"boneTexture",Dt.boneTexture,Ie))}Q.isBatchedMesh&&(gt.setOptional(O,Q,"batchingTexture"),gt.setValue(O,"batchingTexture",Q._matricesTexture,Ie),gt.setOptional(O,Q,"batchingIdTexture"),gt.setValue(O,"batchingIdTexture",Q._indirectTexture,Ie),gt.setOptional(O,Q,"batchingColorTexture"),Q._colorsTexture!==null&&gt.setValue(O,"batchingColorTexture",Q._colorsTexture,Ie));let Bn=oe.morphAttributes;if((Bn.position!==void 0||Bn.normal!==void 0||Bn.color!==void 0)&&I.update(Q,oe,tn),(Ai||Xe.receiveShadow!==Q.receiveShadow)&&(Xe.receiveShadow=Q.receiveShadow,gt.setValue(O,"receiveShadow",Q.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&z.environment!==null&&(Jt.envMapIntensity.value=z.environmentIntensity),Jt.dfgLUT!==void 0&&(Jt.dfgLUT.value=wx()),Ai){if(gt.setValue(O,"toneMappingExposure",L.toneMappingExposure),Xe.needsLights&&mf(Jt,Yi),De&&$.fog===!0&&ie.refreshFogUniforms(Jt,De),ie.refreshMaterialUniforms(Jt,$,Re,ke,R.state.transmissionRenderTarget[E.id]),Xe.needsLights&&Xe.numLightProbeGrids>0){let Dt=x,Yt=0;for(let ci of R.state.lightProbeGridArray)ci.texture!==null&&(Dt.textures[Yt]=ci.texture,Dt.min[Yt]=ci.boundingBox.min,Dt.max[Yt]=ci.boundingBox.max,Dt.resolution[Yt]=ci.resolution,Yt++);for(let ci in Dt)Dt[ci].length=Yt;Jt.probesSH.value=Dt.textures,Jt.probesMin.value=Dt.min,Jt.probesMax.value=Dt.max,Jt.probesResolution.value=Dt.resolution}Xs.upload(O,et(Xe),Jt,Ie)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Xs.upload(O,et(Xe),Jt,Ie),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&gt.setValue(O,"center",Q.center),gt.setValue(O,"modelViewMatrix",Q.modelViewMatrix),gt.setValue(O,"normalMatrix",Q.normalMatrix),gt.setValue(O,"modelMatrix",Q.matrixWorld),$.uniformsGroups!==void 0){let Dt=$.uniformsGroups;for(let Yt=0,ci=Dt.length;Yt<ci;Yt++){let Ah=Dt[Yt];we.update(Ah,tn),we.bind(Ah,tn)}}return tn}function mf(E,z){E.ambientLightColor.needsUpdate=z,E.lightProbe.needsUpdate=z,E.sunLights.needsUpdate=z,E.sunLightShadows.needsUpdate=z,E.directionalLights.needsUpdate=z,E.directionalLightShadows.needsUpdate=z,E.pointLights.needsUpdate=z,E.pointLightShadows.needsUpdate=z,E.spotLights.needsUpdate=z,E.spotLightShadows.needsUpdate=z,E.rectAreaLights.needsUpdate=z,E.hemisphereLights.needsUpdate=z}function gf(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return te},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return Me},this.setRenderTargetTextures=function(E,z,oe){let $=_e.get(E);$.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),_e.get(E.texture).__webglTexture=z,_e.get(E.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:oe,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,z){let oe=_e.get(E);oe.__webglFramebuffer=z,oe.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(E,z=0,oe=0){Me=E,te=z,K=oe;let $=null,Q=!1,De=!1;if(E){let Le=_e.get(E);if(Le.__useDefaultFramebuffer!==void 0){Ce.bindFramebuffer(O.FRAMEBUFFER,Le.__webglFramebuffer),he.copy(E.viewport),Pe.copy(E.scissor),Ue=E.scissorTest,Ce.viewport(he),Ce.scissor(Pe),Ce.setScissorTest(Ue),q=-1;return}else if(Le.__webglFramebuffer===void 0)Ie.setupRenderTarget(E);else if(Le.__hasExternalTextures)Ie.rebindTextures(E,_e.get(E.texture).__webglTexture,_e.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let st=E.depthTexture;if(Le.__boundDepthTexture!==st){if(st!==null&&_e.has(st)&&(E.width!==st.image.width||E.height!==st.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ie.setupDepthRenderbuffer(E)}}let Fe=E.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(De=!0);let qe=_e.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(qe[z])?$=qe[z][oe]:$=qe[z],Q=!0):E.samples>0&&Ie.useMultisampledRTT(E)===!1?$=_e.get(E).__webglMultisampledFramebuffer:Array.isArray(qe)?$=qe[oe]:$=qe,he.copy(E.viewport),Pe.copy(E.scissor),Ue=E.scissorTest}else he.copy(Be).multiplyScalar(Re).floor(),Pe.copy(Ze).multiplyScalar(Re).floor(),Ue=le;if(oe!==0&&($=se),Ce.bindFramebuffer(O.FRAMEBUFFER,$)&&Ce.drawBuffers(E,$),Ce.viewport(he),Ce.scissor(Pe),Ce.setScissorTest(Ue),Q){let Le=_e.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+z,Le.__webglTexture,oe)}else if(De){let Le=z;for(let Fe=0;Fe<E.textures.length;Fe++){let qe=_e.get(E.textures[Fe]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Fe,qe.__webglTexture,oe,Le)}}else if(E!==null&&oe!==0){let Le=_e.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Le.__webglTexture,oe)}q=-1};function wh(E){let z=_e.get(E);return(z.__readFormat!==E.format||z.__readType!==E.type)&&(z.__readFormat=E.format,z.__readType=E.type,z.__formatReadable=xt.textureFormatReadable(E.format),z.__typeReadable=xt.textureTypeReadable(E.type)),z}this.readRenderTargetPixels=function(E,z,oe,$,Q,De,Ge,Le=0){if(!(E&&E.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=_e.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ge!==void 0&&(Fe=Fe[Ge],Array.isArray(Fe)&&(Fe=Fe[0])),Fe){Ce.bindFramebuffer(O.FRAMEBUFFER,Fe);try{let qe=E.textures[Le],st=qe.format,pt=qe.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Le);let We=wh(qe);if(We.__formatReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(We.__typeReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=E.width-$&&oe>=0&&oe<=E.height-Q&&O.readPixels(z,oe,$,Q,Ee.convert(st),Ee.convert(pt),De)}finally{let qe=Me!==null?_e.get(Me).__webglFramebuffer:null;Ce.bindFramebuffer(O.FRAMEBUFFER,qe)}}},this.readRenderTargetPixelsAsync=async function(E,z,oe,$,Q,De,Ge,Le=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=_e.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ge!==void 0&&(Fe=Fe[Ge],Array.isArray(Fe)&&(Fe=Fe[0])),Fe)if(z>=0&&z<=E.width-$&&oe>=0&&oe<=E.height-Q){Ce.bindFramebuffer(O.FRAMEBUFFER,Fe);let qe=E.textures[Le],st=qe.format,pt=qe.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Le);let We=wh(qe);if(We.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(We.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let mt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,mt),O.bufferData(O.PIXEL_PACK_BUFFER,De.byteLength,O.STREAM_READ),O.readPixels(z,oe,$,Q,Ee.convert(st),Ee.convert(pt),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let Ot=Me!==null?_e.get(Me).__webglFramebuffer:null;Ce.bindFramebuffer(O.FRAMEBUFFER,Ot);let wt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Ku(O,wt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,mt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,De),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(mt),O.deleteSync(wt),De}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,z=null,oe=0){let $=Math.pow(2,-oe),Q=Math.floor(E.image.width*$),De=Math.floor(E.image.height*$),Ge=z!==null?z.x:0,Le=z!==null?z.y:0;Ie.setTexture2D(E,0),O.copyTexSubImage2D(O.TEXTURE_2D,oe,0,0,Ge,Le,Q,De),Ce.unbindTexture()},this.copyTextureToTexture=function(E,z,oe=null,$=null,Q=0,De=0){let Ge,Le,Fe,qe,st,pt,We,mt,Ot,wt=E.isCompressedTexture?E.mipmaps[De]:E.image;if(oe!==null)Ge=oe.max.x-oe.min.x,Le=oe.max.y-oe.min.y,Fe=oe.isBox3?oe.max.z-oe.min.z:1,qe=oe.min.x,st=oe.min.y,pt=oe.isBox3?oe.min.z:0;else{let gt=Math.pow(2,-Q);Ge=Math.floor(wt.width*gt),Le=Math.floor(wt.height*gt),E.isDataArrayTexture?Fe=wt.depth:E.isData3DTexture?Fe=Math.floor(wt.depth*gt):Fe=1,qe=0,st=0,pt=0}$!==null?(We=$.x,mt=$.y,Ot=$.z):(We=0,mt=0,Ot=0);let Et=Ee.convert(z.format),en=Ee.convert(z.type),Xe;z.isData3DTexture?(Ie.setTexture3D(z,0),Xe=O.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Ie.setTexture2DArray(z,0),Xe=O.TEXTURE_2D_ARRAY):(Ie.setTexture2D(z,0),Xe=O.TEXTURE_2D),Ce.activeTexture(O.TEXTURE0),Ce.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,z.flipY),Ce.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),Ce.pixelStorei(O.UNPACK_ALIGNMENT,z.unpackAlignment);let cn=Ce.getParameter(O.UNPACK_ROW_LENGTH),Mt=Ce.getParameter(O.UNPACK_IMAGE_HEIGHT),Xi=Ce.getParameter(O.UNPACK_SKIP_PIXELS),tn=Ce.getParameter(O.UNPACK_SKIP_ROWS),ba=Ce.getParameter(O.UNPACK_SKIP_IMAGES);Ce.pixelStorei(O.UNPACK_ROW_LENGTH,wt.width),Ce.pixelStorei(O.UNPACK_IMAGE_HEIGHT,wt.height),Ce.pixelStorei(O.UNPACK_SKIP_PIXELS,qe),Ce.pixelStorei(O.UNPACK_SKIP_ROWS,st),Ce.pixelStorei(O.UNPACK_SKIP_IMAGES,pt);let Ai=E.isDataArrayTexture||E.isData3DTexture,Yi=z.isDataArrayTexture||z.isData3DTexture;if(E.isDepthTexture){let gt=_e.get(E),Jt=_e.get(z),Bn=_e.get(gt.__renderTarget),Dt=_e.get(Jt.__renderTarget);Ce.bindFramebuffer(O.READ_FRAMEBUFFER,Bn.__webglFramebuffer),Ce.bindFramebuffer(O.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let Yt=0;Yt<Fe;Yt++)Ai&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,_e.get(E).__webglTexture,Q,pt+Yt),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,_e.get(z).__webglTexture,De,Ot+Yt)),O.blitFramebuffer(qe,st,qe+Ge,st+Le,We,mt,We+Ge,mt+Le,O.DEPTH_BUFFER_BIT,O.NEAREST);Ce.bindFramebuffer(O.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(Q!==0||E.isRenderTargetTexture||_e.has(E)){let gt=_e.get(E),Jt=_e.get(z);Ce.bindFramebuffer(O.READ_FRAMEBUFFER,N),Ce.bindFramebuffer(O.DRAW_FRAMEBUFFER,Z);for(let Bn=0;Bn<Fe;Bn++)Ai?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,gt.__webglTexture,Q,pt+Bn):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,gt.__webglTexture,Q),Yi?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Jt.__webglTexture,De,Ot+Bn):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Jt.__webglTexture,De),Q!==0?O.blitFramebuffer(qe,st,qe+Ge,st+Le,We,mt,We+Ge,mt+Le,O.COLOR_BUFFER_BIT,O.NEAREST):Yi?O.copyTexSubImage3D(Xe,De,We,mt,Ot+Bn,qe,st,Ge,Le):O.copyTexSubImage2D(Xe,De,We,mt,qe,st,Ge,Le);Ce.bindFramebuffer(O.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Yi?E.isDataTexture||E.isData3DTexture?O.texSubImage3D(Xe,De,We,mt,Ot,Ge,Le,Fe,Et,en,wt.data):z.isCompressedArrayTexture?O.compressedTexSubImage3D(Xe,De,We,mt,Ot,Ge,Le,Fe,Et,wt.data):O.texSubImage3D(Xe,De,We,mt,Ot,Ge,Le,Fe,Et,en,wt):E.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,De,We,mt,Ge,Le,Et,en,wt.data):E.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,De,We,mt,wt.width,wt.height,Et,wt.data):O.texSubImage2D(O.TEXTURE_2D,De,We,mt,Ge,Le,Et,en,wt);Ce.pixelStorei(O.UNPACK_ROW_LENGTH,cn),Ce.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Mt),Ce.pixelStorei(O.UNPACK_SKIP_PIXELS,Xi),Ce.pixelStorei(O.UNPACK_SKIP_ROWS,tn),Ce.pixelStorei(O.UNPACK_SKIP_IMAGES,ba),De===0&&z.generateMipmaps===!0&&z.mipmapsAutoUpdate===!0&&O.generateMipmap(Xe),Ce.unbindTexture()},this.initRenderTarget=function(E){_e.get(E).__webglFramebuffer===void 0&&Ie.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Ie.setTextureCube(E,0):E.isData3DTexture?Ie.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Ie.setTexture2DArray(E,0):Ie.setTexture2D(E,0),Ce.unbindTexture()},this.resetState=function(){te=0,K=0,Me=null,Ce.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}};var Od={type:"change"},xh={type:"start"},zd={type:"end"},Fl=new Di,Bd=new Mn,Ax=Math.cos(70*Fn.DEG2RAD),Gt=new C,xn=2*Math.PI,St={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},_h=1e-6,Ol=class extends Jr{constructor(e,t=null){super(e,t),this.state=St.NONE,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ki.ROTATE,MIDDLE:ki.DOLLY,RIGHT:ki.PAN},this.touches={ONE:Hi.ROTATE,TWO:Hi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new fn,this._lastTargetPosition=new C,this._quat=new fn().setFromUnitVectors(e.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ks,this._sphericalDelta=new ks,this._scale=1,this._panOffset=new C,this._rotateStart=new pe,this._rotateEnd=new pe,this._rotateDelta=new pe,this._panStart=new pe,this._panEnd=new pe,this._panDelta=new pe,this._dollyStart=new pe,this._dollyEnd=new pe,this._dollyDelta=new pe,this._dollyDirection=new C,this._mouse=new pe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Cx.bind(this),this._onPointerDown=Rx.bind(this),this._onPointerUp=Ix.bind(this),this._onContextMenu=Ox.bind(this),this._onMouseWheel=Dx.bind(this),this._onKeyDown=Nx.bind(this),this._onTouchStart=Ux.bind(this),this._onTouchMove=Fx.bind(this),this._onMouseDown=Px.bind(this),this._onMouseMove=Lx.bind(this),this._interceptControlDown=Bx.bind(this),this._interceptControlUp=zx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=St.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Od),this.update(),this.state=St.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Gt.copy(t).sub(this.target),Gt.applyQuaternion(this._quat),this._spherical.setFromVector3(Gt),this.autoRotate&&this.state===St.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=xn:n>Math.PI&&(n-=xn),s<-Math.PI?s+=xn:s>Math.PI&&(s-=xn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Gt.setFromSpherical(this._spherical),Gt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Gt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Gt.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new C(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new C(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Gt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Fl.origin.copy(this.object.position),Fl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Fl.direction))<Ax?this.object.lookAt(this.target):(Bd.setFromNormalAndCoplanarPoint(this.object.up,this.target),Fl.intersectPlane(Bd,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>_h||8*(1-this._lastQuaternion.dot(this.object.quaternion))>_h||this._lastTargetPosition.distanceToSquared(this.target)>_h?(this.dispatchEvent(Od),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?xn/60*this.autoRotateSpeed*e:xn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Gt.setFromMatrixColumn(t,0),Gt.multiplyScalar(-e),this._panOffset.add(Gt)}_panUp(e,t){this.screenSpacePanning===!0?Gt.setFromMatrixColumn(t,1):(Gt.setFromMatrixColumn(t,0),Gt.crossVectors(this.object.up,Gt)),Gt.multiplyScalar(e),this._panOffset.add(Gt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Gt.copy(s).sub(this.target);let r=Gt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(xn*this._rotateDelta.x/t.clientHeight),this._rotateUp(xn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(xn*this._rotateDelta.x/t.clientHeight),this._rotateUp(xn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new pe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Rx(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Cx(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Ix(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(zd),this.state=St.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Px(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ki.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=St.DOLLY;break;case ki.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=St.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=St.ROTATE}break;case ki.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=St.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=St.PAN}break;default:this.state=St.NONE}this.state!==St.NONE&&this.dispatchEvent(xh)}function Lx(i){switch(this.state){case St.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case St.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case St.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Dx(i){this.enabled===!1||this.enableZoom===!1||this.state!==St.NONE||(i.preventDefault(),this.dispatchEvent(xh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(zd))}function Nx(i){this.enabled!==!1&&this._handleKeyDown(i)}function Ux(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Hi.ROTATE:if(this.enableRotate===!1){this.state=St.NONE;break}this._handleTouchStartRotate(i),this.state=St.TOUCH_ROTATE;break;case Hi.PAN:if(this.enablePan===!1){this.state=St.NONE;break}this._handleTouchStartPan(i),this.state=St.TOUCH_PAN;break;default:this.state=St.NONE}break;case 2:switch(this.touches.TWO){case Hi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=St.TOUCH_DOLLY_PAN;break;case Hi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=St.TOUCH_DOLLY_ROTATE;break;default:this.state=St.NONE}break;default:this.state=St.NONE}this.state!==St.NONE&&this.dispatchEvent(xh)}function Fx(i){switch(this._trackPointer(i),this.state){case St.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case St.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case St.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case St.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=St.NONE}}function Ox(i){this.enabled!==!1&&i.preventDefault()}function Bx(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function zx(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var kd=new C,kx=new fn,Hd=new C,oi=class extends Ut{constructor(e=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this}};var ai=new lt,Hx=new lt,Bl=class{constructor(e={}){let t=this,n,s,r,a,o={camera:{style:""},objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l;let c=document.createElement("div");c.style.transformOrigin="0 0",c.style.pointerEvents="none",l.appendChild(c);let u=document.createElement("div");u.style.transformStyle="preserve-3d",c.appendChild(u),this.getSize=function(){return{width:n,height:s}},this.render=function(d,h){let M=h.projectionMatrix.elements[5]*a;h.view&&h.view.enabled?(c.style.transform=`translate( ${-h.view.offsetX*(n/h.view.width)}px, ${-h.view.offsetY*(s/h.view.height)}px )`,c.style.transform+=`scale( ${h.view.fullWidth/h.view.width}, ${h.view.fullHeight/h.view.height} )`):c.style.transform="",d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld(),h.parent===null&&h.matrixWorldAutoUpdate===!0&&h.updateMatrixWorld();let b,x;h.isOrthographicCamera&&(b=-(h.right+h.left)/2,x=(h.top+h.bottom)/2);let A=h.view&&h.view.enabled?h.view.height/h.view.fullHeight:1,R=h.isOrthographicCamera?`scale( ${A} )scale(`+M+")translate("+p(b)+"px,"+p(x)+"px)"+m(h.matrixWorldInverse):`scale( ${A} )translateZ(`+M+"px)"+m(h.matrixWorldInverse),w=(h.isPerspectiveCamera?"perspective("+M+"px) ":"")+R+"translate("+r+"px,"+a+"px)";o.camera.style!==w&&(u.style.transform=w,o.camera.style=w),y(d,d,h,R)},this.setSize=function(d,h){n=d,s=h,r=n/2,a=s/2,l.style.width=d+"px",l.style.height=h+"px",c.style.width=d+"px",c.style.height=h+"px",u.style.width=d+"px",u.style.height=h+"px"};function p(d){return Math.abs(d)<1e-10?0:d}function m(d){let h=d.elements;return"matrix3d("+p(h[0])+","+p(-h[1])+","+p(h[2])+","+p(h[3])+","+p(h[4])+","+p(-h[5])+","+p(h[6])+","+p(h[7])+","+p(h[8])+","+p(-h[9])+","+p(h[10])+","+p(h[11])+","+p(h[12])+","+p(-h[13])+","+p(h[14])+","+p(h[15])+")"}function f(d){let h=d.elements;return"translate(-50%,-50%)"+("matrix3d("+p(h[0])+","+p(h[1])+","+p(h[2])+","+p(h[3])+","+p(-h[4])+","+p(-h[5])+","+p(-h[6])+","+p(-h[7])+","+p(h[8])+","+p(h[9])+","+p(h[10])+","+p(h[11])+","+p(h[12])+","+p(h[13])+","+p(h[14])+","+p(h[15])+")")}function g(d){d.isCSS3DObject&&(d.element.style.display="none");for(let h=0,M=d.children.length;h<M;h++)g(d.children[h])}function y(d,h,M,b){if(d.visible===!1){g(d);return}if(d.isCSS3DObject){let x=d.layers.test(M.layers)===!0,A=d.element;if(A.style.display=x===!0?"":"none",x===!0){d.onBeforeRender(t,h,M);let R;d.isCSS3DSprite?(ai.copy(M.matrixWorldInverse),ai.transpose(),d.rotation2D!==0&&ai.multiply(Hx.makeRotationZ(d.rotation2D)),d.matrixWorld.decompose(kd,kx,Hd),ai.setPosition(kd),ai.scale(Hd),ai.elements[3]=0,ai.elements[7]=0,ai.elements[11]=0,ai.elements[15]=1,R=f(ai)):R=f(d.matrixWorld);let _=o.objects.get(d);if(_===void 0||_.style!==R){A.style.transform=R;let w={style:R};o.objects.set(d,w)}A.parentNode!==u&&u.appendChild(A),d.onAfterRender(t,h,M)}}for(let x=0,A=d.children.length;x<A;x++)y(d.children[x],h,M,b)}}};var qs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var An=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Vx=new ts(-1,1,1,-1,0,1),vh=class extends _t{constructor(){super(),this.setAttribute("position",new ct([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ct([0,2,0,0,2,0],2))}},Gx=new vh,Wi=class{constructor(e){this._mesh=new ft(Gx,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Vx)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var zl=class extends An{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Lt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=wi.clone(e.uniforms),this.material=new Lt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Wi(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ma=class extends An{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},kl=class extends An{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Hl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new pe);this._width=n.width,this._height=n.height,t=new zt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:jt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new zl(qs),this.copyPass.material.blending=Mi,this.timer=new Kr}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}ma!==void 0&&(a instanceof ma?n=!0:a instanceof kl&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new pe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Vl=class extends An{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ke}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var Vd={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ke(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Zs=class i extends An{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new pe(e.x,e.y):new pe(256,256),this.clearColor=new Ke(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new zt(r,a,{type:jt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let p=new zt(r,a,{type:jt,depthBuffer:!1});p.texture.name="UnrealBloomPass.h"+u,p.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(p);let m=new zt(r,a,{type:jt,depthBuffer:!1});m.texture.name="UnrealBloomPass.v"+u,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),r=Math.round(r/2),a=Math.round(a/2)}let o=Vd;this.highPassUniforms=wi.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Lt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new pe(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=wi.clone(qs.uniforms),this.blendMaterial=new Lt({uniforms:this.copyUniforms,vertexShader:qs.vertexShader,fragmentShader:qs.fragmentShader,premultipliedAlpha:!0,blending:$t,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ke,this._oldClearAlpha=1,this._basic=new kt,this._fsQuad=new Wi(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new pe(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(n*n))/n);let s=[],r=[];for(let a=1;a<e;a+=2){let o=t[a],l=a+1<e?t[a+1]:0,c=o+l;s.push((a*o+(a+1)*l)/c),r.push(c)}return new Lt({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new pe(.5,.5)},direction:{value:new pe(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Lt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Zs.BlurDirectionX=new pe(1,0);Zs.BlurDirectionY=new pe(0,1);var ga={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Gl=class extends An{constructor(){super(),this.isOutputPass=!0,this.uniforms=wi.clone(ga.uniforms),this.material=new Fs({name:ga.name,uniforms:this.uniforms,vertexShader:ga.vertexShader,fragmentShader:ga.fragmentShader}),this._fsQuad=new Wi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},dt.getTransfer(this._outputColorSpace)===vt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===jr?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Qr?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ea?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===is?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===na?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ia?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===ta&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Rn=Object.freeze({version:"ion-instrument-v2",layout:"research-space-v4",intro:1350,handoff:1450,focus:950,background:461844,copper:15183224,ice:10734038,complete:10736833});function Gd({time:i=0,index:e=0,length:t=1,age:n=1/0,signal:s=null,signalAge:r=1/0,active:a=!1,waiting:o=!1,complete:l=!1,highlight:c=!1,reduced:u=!1}={}){let p=u?1:Math.max(0,Math.min(1,n/360));if(u)return{mode:"static",progress:.5,reveal:1,gain:.2,moving:!1,execution:a,repeats:1};let m=a?"running":o?"waiting":c?"highlight":l?"settled":"ambient",f=a?7.2:c?4.2:l?2.2:1.8,g=a?.96:o?.28:c?.6:l?.28:.22,y=((i*f/Math.max(.01,t)+e*.381966)%1+1)%1;return p<1?(m="arrival",y=p,g=.72):s==="complete"&&r>=0&&r<720?(m="receipt",y=1-r/720,g=.82):s==="engage"&&r>=0&&r<500?(m="engage",y=r/500,g=.88):o&&(y=.5+Math.sin(i*1.3)*.03,g=.24+Math.sin(i*2.1)*.05),{mode:m,progress:y,reveal:p,gain:g,moving:!0,execution:a,repeats:m==="waiting"?1:Math.max(1,Math.min(4,Math.ceil(t/12)))}}function Wd(i,e){let t=i?.byId.get(e)||i?.byId.get("step:"+e);if(!t)return"";let n=t.stepId||"__project__",s=i.presentation,r=s?.expanded&&(s.stageId||"__project__")===n,a=r&&i.nodes.some(o=>o.origin==="activity"&&(o.stepId||"__project__")===n);return r&&s.level==="action"?n+"|action|"+s.selectedId:n+"|"+(a?"family":r?"parent":"anchor")}function Xd(i,e){if(i?.phase!=="completed"||!i.nodes?.length||!i.nodes.every(r=>r.status==="submitted"))return null;let t=i.nodes.at(-1),n=e.filter(r=>r.kind==="artifact"&&r.stepId===t.id&&r.availability==="file"),s=/\.(docx|pdf|pptx|xlsx)$/i;return n.find(r=>s.test(r.title))||n[0]||e.find(r=>r.kind==="delivery"&&r.stepId===t.id)||null}function Yd(i,e){let t=!!e?.activeId&&["running","processing"].includes(i?.phase);return e?.presentation?.expanded?t?"execution":"inspection":i?.phase==="completed"?"complete":"overview"}function qd(i,e,t=!1){if(t||!e||i<0||i>=1150)return{lift:0,scale:1,light:0};let n=i/1e3,s=Math.exp(-5.8*n),r=Math.sin(n*12.4);return{lift:r*s*(e==="complete"?.32:.18),scale:1+r*s*.018,light:Math.max(0,1-i/1150)}}function Wl(i,e,{mode:t="overview",height:n=1e3}={}){let s=M=>{let b=Math.hypot(...M)||1;return M.map(x=>x/b)},r=(M,b)=>M.reduce((x,A,R)=>x+A*b[R],0),a=(M,b)=>[M[1]*b[2]-M[2]*b[1],M[2]*b[0]-M[0]*b[2],M[0]*b[1]-M[1]*b[0]],o=t==="action",l=t==="cockpit",c=e*n,u=s(t==="complete"?[-.2,.19,1]:l?[-.085,.08,1]:o?[-.045,.07,1]:t==="execution"||t==="inspection"?[-.1,.105,1]:[-.2,.17,1]),p=s(a([0,1,0],u)),m=a(u,p),f=[(i.minX+i.maxX)/2,(i.minY+i.maxY)/2-(o?1.25:l?.7:0),(i.minZ+i.maxZ)/2],g=Math.tan(17.5*Math.PI/180),y=l?c>=1050?.72:.88:o?.72:t==="execution"||t==="inspection"?.76:.86,d=l?.75:o?.72:Math.max(.48,Math.min(.8,(n-210)/n)),h=o?10.5:16.5;for(let M of[i.minX,i.maxX])for(let b of[i.minY,i.maxY])for(let x of[i.minZ,i.maxZ]){let A=[M-f[0],b-f[1],x-f[2]],R=r(A,u);h=Math.max(h,R+Math.abs(r(A,p))/(g*Math.max(.25,e)*y),R+Math.abs(r(A,m))/(g*d))}return h+=1.2,{target:f,position:f.map((M,b)=>M+u[b]*h),distance:h,direction:u,right:p,up:m,widthUse:y,heightUse:d}}var Cn=Object.freeze({version:Rn.layout,stationGapX:11.2,stationGapZ:6.2,deckWidth:8.8,deckDepth:3.4,groundY:-2.2,visibleCalls:6,callColumns:3});function _a(i){return i?.hero?{w:11.6,h:6.4,depth:.7}:i?.kind==="engine"?{w:4.3,h:2.5,depth:.55}:i?.kind==="step"?{w:7.8,h:4.3,depth:.48}:["artifact","delivery"].includes(i?.kind)?{w:3.8,h:2.35,depth:.38}:{w:4.9,h:2.85,depth:.42}}function Xl(i,e,t=6){let n=Math.floor(e/3),s=e%3,r=s-(Math.min(3,t-n*3)-1)/2;return{x:i.x+r*5.65,y:i.y-6.2-n*3.3,z:i.z+7+(i.layer==="control"||r===0?0:.6)+n*1.2,yaw:-r*.06}}function Zd(i){let e=Cn,t=i.filter(f=>f.kind==="step"),n=Math.min(Math.max(1,t.length),Math.max(1,Math.ceil(Math.sqrt(t.length*1.4)))),s=Math.max(1,Math.ceil(t.length/n)),r=new Map,a=[],o=new Map(t.map(f=>[f.stepId,{stage:f,calls:[],files:[]}])),l=[];for(let f of i){if(["engine","step"].includes(f.kind))continue;let g=o.get(f.stepId);if(!g){l.push(f);continue}(["artifact","delivery"].includes(f.kind)?g.files:g.calls).push(f)}let c=(f,g)=>r.set(f.id,{...g,slot:f.slot??i.indexOf(f)});t.forEach((f,g)=>{let y=Math.floor(g/n),d=y%2?n-1-g%n:g%n,h=n>1?d/(n-1):.5,M=Math.sin(h*Math.PI),b=(d-(n-1)/2)*e.stationGapX,x=(y-(s-1)/2)*e.stationGapZ+M*2.1,A=o.get(f.stepId),R=8+(s-1-y)*7.8+M*.7,_={id:f.stepId,index:g,title:f.title,x:b,z:x,row:y,column:d,width:e.deckWidth,depth:e.deckDepth,levels:1,stageY:R,callCount:f.callCount??A.calls.length,fileCount:f.artifactCount??A.files.length};a.push(_),c(f,{x:b,y:R,z:x,row:y,column:d,level:0,stationId:f.stepId,layer:"stage",yaw:(.5-h)*.14}),A.calls.forEach((w,B)=>{c(w,{...Xl({x:b,y:R,z:x,layer:"stage"},B,A.calls.length),row:y,column:d,level:0,stationId:f.stepId,layer:"activity"})}),A.files.forEach((w,B)=>{let L=Math.floor(B/3),F=B%3;c(w,{x:b+(F-1)*4.6,y:R+3.3+L*3,z:x-1.5,row:y,column:d,level:0,stationId:f.stepId,layer:"delivery",yaw:0})})});let u=a[0]||{x:0,z:0,stageY:8},p={x:u.x-7.7,y:u.stageY+2,z:u.z-2.5};for(let f of i.filter(g=>g.kind==="engine"))c(f,{...p,row:s,column:-1,level:0,stationId:null,layer:"control",yaw:.05});l.forEach((f,g)=>c(f,{...Xl({...p,layer:"control"},g,l.length),row:s,column:-1,level:0,stationId:null,layer:"activity"}));for(let f of i.filter(g=>g.hero))c(f,{x:Math.max(...a.map(g=>g.x),0)-1.5,y:Math.max(...a.map(g=>g.stageY),8)+9.6,z:Math.max(...a.map(g=>g.z),0)+10,row:-1,column:-1,level:0,stationId:f.stepId,layer:"result",yaw:-.07});let m={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0,minZ:1/0,maxZ:-1/0};for(let f of i){let g=r.get(f.id),y=_a(f);if(!g)throw new Error("Spatial node has no actual owner position: "+f.id);m.minX=Math.min(m.minX,g.x-y.w/2-1),m.maxX=Math.max(m.maxX,g.x+y.w/2+1),m.minY=Math.min(m.minY,g.y-y.h/2-1),m.maxY=Math.max(m.maxY,g.y+y.h/2+1),m.minZ=Math.min(m.minZ,g.z-1),m.maxZ=Math.max(m.maxZ,g.z+1)}for(let f of a)m.minX=Math.min(m.minX,f.x-e.deckWidth/2-1),m.maxX=Math.max(m.maxX,f.x+e.deckWidth/2+1),m.minZ=Math.min(m.minZ,f.z-e.deckDepth/2-1),m.maxZ=Math.max(m.maxZ,f.z+e.deckDepth/2+1);return i.length||Object.assign(m,{minX:-10,maxX:10,minY:-3,maxY:10,minZ:-10,maxZ:10}),{positions:r,stations:a,columns:n,rows:s,bounds:m,mapBounds:{minX:m.minX,maxX:m.maxX,minY:m.minZ,maxY:m.maxZ},kind:"spatial",version:e.version}}function Kd(i){let e=[],t=i.filter(r=>r.kind==="step"),n=(r,a,o)=>{r&&a&&e.push({id:"space:"+r.id+">"+a.id,source:r.id,target:a.id,kind:o,active:a.active})},s=i.find(r=>r.kind==="engine");for(let r of t){n(s,r,"sequence"),s=r;for(let o of i.filter(l=>l.stepId===r.stepId&&["call","review"].includes(l.kind)))n(r,o,"child-action");let a=r;for(let o of i.filter(l=>l.stepId===r.stepId&&["artifact","delivery"].includes(l.kind)))n(a,o,"delivery"),a=o}s=i.find(r=>r.kind==="engine");for(let r of i.filter(a=>!a.stepId&&!["engine","step"].includes(a.kind)))n(s,r,"child-action");return e}function Jd(i,e,t="activity-order"){if(t==="child-action")return[{x:i.x,y:i.y-1.7,z:i.z},{x:i.x,y:i.y-2.7,z:e.z+1.6},{x:i.x,y:e.y+2,z:e.z+1.6},{x:e.x,y:e.y+1.3,z:e.z}];if(t==="sequence"){let s=Math.abs(i.y-e.y)<3,r=e.x>=i.x?1:-1,a=i.layer==="control"?2.4:4.1;return s?[{x:i.x+r*a,y:i.y-.2,z:i.z},{x:i.x+r*(a+1),y:i.y-.35,z:i.z-.6},{x:e.x-r*5.1,y:e.y-.35,z:e.z-.6},{x:e.x-r*4.1,y:e.y-.2,z:e.z}]:[{x:i.x+4.1,y:i.y-.3,z:i.z},{x:i.x+6.5,y:i.y-1.4,z:i.z+1.6},{x:e.x+6.5,y:e.y+1.4,z:e.z-1.6},{x:e.x+4.1,y:e.y+.3,z:e.z}]}if(t==="delivery"){let s=e.x-i.x,r=e.y-i.y,a=Math.hypot(s,r)||1,o=s/a,l=r/a,c=Math.min(3.95/Math.max(.001,Math.abs(o)),2.22/Math.max(.001,Math.abs(l))),u=Math.min((e.layer==="result"?5.9:1.95)/Math.max(.001,Math.abs(o)),(e.layer==="result"?3.28:1.25)/Math.max(.001,Math.abs(l))),p={x:i.x+o*c,y:i.y+l*c,z:i.z},m={x:e.x-o*u,y:e.y-l*u,z:e.z};return[p,{x:p.x+(m.x-p.x)*.3,y:p.y+(m.y-p.y)*.24,z:Math.min(i.z,e.z)-1.4},{x:m.x-(m.x-p.x)*.24,y:m.y-(m.y-p.y)*.2,z:m.z-2.2},m]}let n=e.x>=i.x?1:-1;return[{x:i.x+n*1.8,y:i.y-.65,z:i.z+.08},{x:i.x+n*2.8,y:i.y-.9,z:(i.z+e.z)/2+1.3},{x:e.x-n*2.8,y:e.y-.9,z:(i.z+e.z)/2+1.3},{x:e.x-n*1.8,y:e.y-.65,z:e.z+.08}]}var Wx=(i,e=360)=>typeof i=="string"?i.slice(0,e):"",$d={running:"执行中",succeeded:"已完成",completed:"已完成",failed:"失败",refused:"未执行",cancelled:"已停止",interrupted:"已中断",waiting:"后台处理中",unverified:"待确认",needs_revision:"需改进",deferred:"待后台任务",recorded:"已登记"},NS=Object.freeze({columns:10,gapX:5.6,gapY:5.05,top:1.8});function xa(i){return _a(i)}function Xx(i){return Zd(i)}function Yx(i,e){let t=new Set(e),n=new Map((i||[]).filter(a=>typeof a.callId=="string"&&a.callId).map(a=>[a.callId,a])),s=new Map;function r(a,o=new Set){if(s.has(a))return s.get(a);let l=n.get(a);if(!l||o.has(a))return{stepId:null,source:"unassigned"};let c;if(l.stepId)c={stepId:t.has(l.stepId)?l.stepId:null,source:t.has(l.stepId)?"step-record":"unknown-step"};else if(l.rootCallId&&l.rootCallId!==a){let u=r(l.rootCallId,new Set([...o,a]));c={stepId:u.stepId,source:u.stepId?"root-call":"unassigned"}}else c={stepId:null,source:"unassigned"};return s.set(a,c),c}for(let a of n.keys())r(a);return s}function yh(i,{scope:e="all",expandedStepId:t=null,recordPage:n=0,pinnedId:s=null,actionId:r=null,overview:a=!1}={}){let o=[],l=[],c=new Map,u=i?.nodes||[],p=new Map(u.map(le=>[le.id,le])),m=[],f=Yx(i?.activities||[],p.keys()),g=new Map,y=(le,X,xe,me,Se={},ue=!0)=>{if(c.has(le))return c.get(le);let He={id:le,kind:X,title:Wx(xe,160),detail:me||"",stepId:null,origin:"runtime",status:"configured",active:!1,...Se};return c.set(le,He),ue&&o.push(He),He},d=(le,X,xe)=>{le!==X&&c.has(le)&&c.has(X)&&l.push({id:le+">"+X,source:le,target:X,kind:xe,active:c.get(X).active})};u.length&&y("engine","engine",i.name||"METIS",i.headline||"",{status:i.phase,statusLabel:{ready:"待继续",processing:"处理中",running:"执行中",waiting:"待确认",attention:"需处理",stopped:"已停止",completed:"已交付"}[i.phase]||"",modeName:i.modeName,ports:[]});for(let le of u){let X="step:"+le.id,xe=[];if(e==="all")for(let Se of le.skills||[])xe.push({kind:"skill",id:Se.id,title:Se.name||Se.id});let me=y(X,"step",le.title,le.purpose||le.expected,{stepId:le.id,index:le.index,origin:"workflow",status:le.status,statusLabel:le.label,active:le.active,viewed:le.viewed,skills:le.skills,loop:le.loop,ports:xe,prohibitions:le.prohibitions,executionBrief:le.executionBrief,expected:le.expected||""});le.index===0?d("engine",X,"sequence"):d("step:"+u[le.index-1].id,X,"sequence");for(let Se of le.artifacts||[]){if(!Number.isSafeInteger(Se.index)||Se.index<0)continue;let ue=y("artifact:"+le.id+":"+Se.index,"artifact",Se.name,Se.path,{stepId:le.id,origin:"delivery",status:"recorded",statusLabel:"已登记",availability:Se.availability,fileIndex:Se.index,file:Se},!0);m.push(ue),xe.push({kind:"artifact",id:ue.id,title:Se.name,availability:Se.availability}),d(me.id,ue.id,"delivery")}if(le.delivery?.text){let Se=y("delivery:"+le.id,"delivery","文字交付",le.delivery.text,{stepId:le.id,origin:"delivery",status:"recorded",statusLabel:"已登记",at:le.delivery.at},!(le.artifacts||[]).length);(le.artifacts||[]).length||xe.push({kind:"delivery",id:Se.id,title:"文字交付"})}}for(let[le,X]of(i?.activities||[]).entries()){if(typeof X.callId!="string"||!X.callId||c.has("call:"+X.callId))continue;let xe=f.get(X.callId),me=xe?.stepId||null,Se=p.get(me),ue=X.kind==="review"?"review":"call",He=g.get(me)||0;g.set(me,He+1),y("call:"+X.callId,ue,X.label||X.tool||"执行动作",X.target||X.label||"",{stepId:me,ownerSource:xe?.source||"unassigned",ownerTitle:Se?.title||"项目整体",ownerIndex:Se?.index??null,childIndex:He,origin:"activity",status:X.status,statusLabel:$d[X.status]||X.status,active:X.status==="running"&&X.invoked!==!1,activityIndex:le,callId:X.callId,call:X,tool:X.tool,at:X.startedAt||X.finishedAt||null,ports:[]})}for(let le of i?.activities||[]){let X="call:"+le.callId,xe="call:"+le.rootCallId;if(!c.has(X))continue;let me=c.get(X);d(xe!==X&&c.has(xe)&&c.get(xe).stepId===me.stepId?xe:me.stepId?"step:"+me.stepId:"engine",X,"execution");for(let Se of m)Se.detail===le.target&&d(X,Se.id,"reference")}for(let le of u){let X=Date.parse(le.delivery?.at);if(!Number.isFinite(X))continue;let xe=(i.activities||[]).findLast(me=>me.stepId===le.id&&me.kind==="delivery"&&me.status==="succeeded"&&Date.parse(me.startedAt)<=X&&Date.parse(me.finishedAt)>=X);if(xe){let me=c.get("call:"+xe.callId);me&&(me.ports=(c.get("step:"+le.id)?.ports||[]).filter(Se=>Se.kind!=="skill"))}}o.forEach((le,X)=>{le.slot=X,le.statusLabel??=$d[le.status]||le.status||""});let h=(i?.activities||[]).findLast(le=>le.status==="running"&&le.invoked!==!1),M=(i?.activities||[]).findLast(le=>le.status==="waiting"&&le.jobId&&le.invoked!==!1),b=p.get(i?.currentStepId),x=i?.phase==="processing"&&b?.status!=="submitted",A=(i?.activities||[]).findLast(le=>f.get(le.callId)?.stepId===i?.currentStepId),R=i?.live?.active,_=R?.stepId?p.get(R.stepId):null,w=R?.kind==="model"&&_?(i.activities||[]).findLast(le=>f.get(le.callId)?.stepId===_.id):null,B=h?"call:"+h.callId:M?"call:"+M.callId:x?R?.kind==="model"?w?"call:"+w.callId:_?"step:"+_.id:"engine":A?"call:"+A.callId:"step:"+b?.id:null,L=o,F=c.get(B),W=c.get(r)?.origin==="activity"?c.get(r):null,se=p.has(t)?t:null,N=t==="__project__",Z=!a&&!!(se||N||W||B||s),te=N?null:se||W?.stepId||F?.stepId||c.get(s)?.stepId||null,K=Z&&W?.stepId===te?W:null,Me=L.filter(le=>le.origin==="activity"&&le.stepId===te),q=Math.max(1,Math.ceil(Me.length/Cn.visibleCalls)),fe=K?Me.findIndex(le=>le.id===K.id):-1,he=Math.max(0,Math.min(q-1,fe>=0?Math.floor((Me.length-1-fe)/Cn.visibleCalls):Math.trunc(Number(n)||0))),Pe=Math.max(0,Me.length-he*Cn.visibleCalls),Ue=Math.max(0,Pe-Cn.visibleCalls),ee=Z?Me.slice(Ue,Pe):[],Ae=K||c.get(s||B);Z&&he===0&&Ae?.origin==="activity"&&Ae.stepId===te&&!ee.includes(Ae)&&(ee.length>=Cn.visibleCalls&&ee.shift(),ee.push(Ae));for(let le of L.filter(X=>X.kind==="step")){let X=L.filter(xe=>xe.origin==="activity"&&xe.stepId===le.stepId);le.childIds=X.map(xe=>xe.id),le.recentStatuses=X.slice(-6).map(xe=>({id:xe.id,status:xe.status})),le.callCount=X.length,le.artifactCount=m.filter(xe=>xe.stepId===le.stepId).length,le.active=!!le.active||X.some(xe=>xe.active)}let de=Xd(i,L);de&&(de.hero=!0);let ke=L.filter(le=>["engine","step"].includes(le.kind)||ee.includes(le)||!Z&&le===de);ke.forEach((le,X)=>le.displaySlot=X);let Re=Xx(ke),Oe=Kd(ke),ht=Z?K?"action":"stage":"overview",Be=K?.id||null,Ze={expanded:Z,level:ht,selectedId:Be,stageId:te,page:he,pages:q,totalCalls:Me.length,start:Z&&Me.length?Ue+1:0,end:Z?Pe:0,key:[ht,te||"",Be||"",he,ee.map(le=>le.id).join(",")].join("|")};return{nodes:ke,fullNodes:L,edges:l,circuitEdges:Oe,byId:c,positions:Re.positions,bounds:Re.bounds,mapBounds:Re.mapBounds,stations:Re.stations,presentation:Ze,artMode:Yd(i,{presentation:Ze,activeId:B}),heroId:Z?null:de?.id||null,layout:{columns:Re.columns,rows:Re.rows,kind:Re.kind,version:Re.version},scope:e,phase:i?.phase,activeId:B,latestId:h?"call:"+h.callId:(i?.activities||[]).length?"call:"+i.activities.at(-1).callId:b?"step:"+b.id:o[0]?.id||null,counts:{entities:L.length,visible:ke.length,stages:u.length,bindings:e==="all"?u.reduce((le,X)=>le+(X.skills?.length||0),0):0,calls:L.filter(le=>le.origin==="activity").length,materials:(i?.activities||[]).filter(le=>le.kind==="read"&&le.target).length,artifacts:m.length}}}function jd(i,e={x:1,y:0},t=!1){if(t||i>=1e3)return{x:0,y:0,opacity:1,scale:1,pulse:0,progress:1,moving:!1};if(i<0)return{x:0,y:0,opacity:0,scale:1,pulse:0,progress:0,moving:!0};let n=Math.min(1,i/360),s=Math.max(0,(i-360)/1e3),r=i<360?-.2*(1-n):.28*Math.exp(-9*s)*Math.sin(19*s);return{x:e.x*r,y:e.y*r,opacity:Math.max(0,Math.min(1,(i-240)/210)),scale:i<360?.945+.035*n:1-.018*Math.exp(-9*s)*Math.cos(19*s),pulse:i<360?Math.sin(Math.PI*n*.5):Math.exp(-(i-360)/180),progress:n,moving:!0}}function Mh(i,e,t={w:6.6,h:2.8}){let n=Math.tan(17.5*Math.PI/180),s=Math.max(.25,i/Math.max(1,e));return Math.max(16.5,t.w/(2*n*s*.74),t.h/(2*n*.28))}var ya=class{constructor(e=42){this.maxCells=e,this.reset("")}reset(e){this.key=e,this.lines=[],this.sequence=0,this.seen=0,this.position=0,this.lastTime=0,this.revision=0,this.source=null}append(e,t){if(!["stdout","stderr","log","assistant","receipt","status"].includes(t)||typeof e!="string"||!e)return;let n=this.lines.at(-1);n&&n.source!==t&&(n.closed=!0);for(let s of e.replace(/\r\n/g,`
`).replace(/\r/g,`
`)){if(n=this.lines.at(-1),(!n||n.closed)&&(n={id:++this.sequence,text:"",source:t,cells:0,closed:!1},this.lines.push(n)),s===`
`){n.closed=!0;continue}let r=s.codePointAt(0)>255?2:1;n.cells+r>this.maxCells&&(n.closed=!0,n={id:++this.sequence,text:"",source:t,cells:0,closed:!1},this.lines.push(n)),n.text+=s,n.cells+=r}for(;this.lines.length>160;)this.lines.shift(),this.position=Math.max(0,this.position-1);this.source=t,this.revision++}ingest(e,t){if(!e||!t)return!1;let n=e.instanceId+"|"+t.key;this.key!==n&&this.reset(n);let s=!1;for(let r of e.entries||[])r.seq>this.seen&&t.matches(r)&&(this.append(r.text,r.source),s=!0);return this.seen=Math.max(this.seen,e.lastSeq||0),s}frame(e,t=!1){let n=this.lines.length,s=this.lastTime?Math.min(.1,Math.max(0,(e-this.lastTime)/1e3)):1/60;this.lastTime=e;let r=Math.max(0,n-this.position),a=32+Math.min(128,r*12);return this.position=t?n:Math.min(n,this.position+a*s),{rows:this.lines,position:this.position,moving:!t&&this.position<n-.001,revision:this.revision,source:this.source,totalLines:this.sequence}}};function Qd(i,e){if(!i)return null;if(i.callId){let r=i.rootCallId||i.callId;return{key:"action:"+i.callId,matches:a=>a.callId===i.callId||a.rootCallId===r}}let t=i.stepId||e?.active?.stepId;if(t)return{key:"step:"+t,matches:r=>r.stepId===t};let n=e?.active;if(!n)return null;if(n.kind==="model")return{key:"model:"+n.attemptId,matches:r=>r.attemptId===n.attemptId};let s=n.rootCallId||n.callId;return{key:"tool:"+s,matches:r=>r.callId===n.callId||r.rootCallId===s}}var va=i=>typeof i=="string"?i.replace(/\s+/g," ").trim():"";function ef(i){if(i.call?.error)return va(i.call.error);if(i.call?.feedback?.length)return va(i.call.feedback[0]);let e=va(i.detail);return["read","write"].includes(i.call?.kind)&&/[\\/]/.test(e)&&!/^https?:\/\//i.test(e)&&e.split(/[\\/]/).filter(Boolean).at(-1)||e}function qx(i,e){let t=i?.byId.get(i.activeId);if(!t)return null;let n=e?.nodes?.find(c=>c.id===t.stepId);if(n?.status==="submitted")return null;let s=e?.live?.active;if(s?.kind==="model"&&e?.phase==="processing")return{nodeId:t.id,stepId:s.stepId,title:s.state==="thinking"?"模型分析中":s.state==="text"?"公开文字输出中":"模型响应中",status:"processing",lines:[],key:"model:"+s.attemptId+"|"+s.state};let r=t.call;if(r?.invoked===!1||["failed","refused","cancelled","interrupted","unverified"].includes(r?.status)||!r&&e?.phase!=="processing")return null;let a=r?.status==="running",o=r?.status==="waiting";if(r&&!a&&!o&&e?.phase!=="processing")return null;let l=[];return r?.tool&&l.push(r.tool),r?.target&&l.push(va(r.target).slice(0,240)),r?.resultPreview&&l.push(r.resultPreview.slice(-4e3)),!a&&!o&&r?.feedback?.length&&l.push(va(r.feedback[0]).slice(0,240)),!l.length&&n?.title&&l.push(n.title),{nodeId:t.id,stepId:t.stepId,title:o?"等待后台回执":a?r.label||"执行中":"研究助手执行中",status:o?"waiting":a?"running":"processing",lines:l,key:[t.id,r?.status||e?.phase,...l].join("|")}}function tf(i,e){let t=i?.presentation;if(!t?.expanded)return null;if(t.level!=="action"){let a=qx(i,e);return!a||(a.stepId||null)!==(t.stageId||null)?null:e?.phase==="processing"&&e.live?.active?.kind==="model"?{...a,nodeId:t.stageId?"step:"+t.stageId:"engine"}:a}let n=i.byId.get(t.selectedId);if(n?.origin!=="activity")return null;let s=n.call||{},r=[];return s.resultPreview&&r.push(s.resultPreview),s.error&&r.push(s.error),s.feedback?.length&&r.push(...s.feedback),r.length||r.push(s.tool||n.title,s.target||"",n.statusLabel||""),{nodeId:n.id,stepId:n.stepId,callId:n.callId,rootCallId:s.rootCallId||n.callId,title:n.title,status:n.status,lines:r.filter(Boolean),key:[n.id,n.status,...r].join("|")}}var Yl={press:145,hover:240,reveal:620,camera:880,idleFrame:50,activeFrame:25};function Ks(i){let e=Math.max(0,Math.min(1,i));return e*e*e*(e*(e*6-15)+10)}function nf(i){return["running","processing"].includes(i?.phase)||i?.activeCalls?.length?1:["waiting","attention"].includes(i?.phase)?.35:.08}function sf(i,e,t){return{x:Math.max(-1,Math.min(1,(i-t.left)/Math.max(1,t.width)*2-1)),y:Math.max(-1,Math.min(1,(e-t.top)/Math.max(1,t.height)*2-1))}}function rf(i,e){return!i||i===e?null:["submitted","succeeded","passed","completed"].includes(e)?"complete":["failed","blocked","refused","needs_revision"].includes(e)?"attention":["running","working","checking","processing"].includes(e)?"engage":"change"}function Js(i,e,t=!1){if(t)return{x:0,y:0,z:0,rx:0,ry:0};let n=e*2.3999632297;return{x:Math.sin(i*.54+n)*.038,y:Math.sin(i*.96+n)*.115,z:.04+Math.cos(i*.72+n)*.025,rx:Math.sin(i*.52+n)*.004,ry:Math.cos(i*.67+n)*.009}}var On=i=>typeof i=="string"?i.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,"").trim():"",ql=i=>/^(?:[a-z]:[\\/]|\\\\)/i.test(i)?i.replaceAll("\\","/").toLowerCase():i,af=i=>On(i).split(/[\\/]/).filter(Boolean).at(-1)||On(i),$s=(i,e)=>{let t=new Map;for(let n of i){let s=e(n);s&&t.set(s,n)}return[...t.values()]};function Sh(i,e){let t=e?.fullNodes||[],n=t.filter(x=>x.kind==="step"),s=t.filter(x=>x.origin==="activity"),r=s.filter(x=>x.call?.invoked!==!1),a=$s(r.filter(x=>x.call?.kind==="read"&&["succeeded","completed"].includes(x.status)&&On(x.call.target)).map(x=>({id:x.id,stepId:x.stepId,name:af(x.call.target),target:On(x.call.target)})),x=>ql(x.target)),o=t.filter(x=>x.kind==="artifact"&&x.availability==="file"&&On(x.file?.path||x.detail)).map(x=>({id:x.id,stepId:x.stepId,index:x.fileIndex,name:On(x.title)||af(x.detail),target:On(x.file?.path||x.detail),bytes:Number.isFinite(x.file?.bytes)?x.file.bytes:null})),l=$s(o,x=>ql(x.target)),c=n.flatMap(x=>(x.skills||[]).filter(A=>On(A?.id)).map(A=>({id:A.id,name:On(A.name)||A.id,stepId:x.stepId}))),u=$s(c,x=>x.id),p=r.filter(x=>x.kind==="review"),m=n.filter(x=>x.status==="submitted").length,f=e?.presentation?.expanded?e.presentation.stageId:null,g=f?n.find(x=>x.stepId===f):null,y=e?.byId?.get(e.activeId),d=g?s.filter(x=>x.stepId===g.stepId):s,h=g?$s(o.filter(x=>x.stepId===g.stepId),x=>ql(x.target)):l,M=new Map;for(let x of h){let A=/\.([a-z0-9]{1,8})$/i.exec(x.name)?.[1]?.toUpperCase()||"FILE";M.set(A,(M.get(A)||0)+1)}let b=new Map(n.map(x=>{let A=s.filter(_=>_.stepId===x.stepId),R=A.filter(_=>_.kind==="review"&&_.call?.invoked!==!1);return[x.stepId,{calls:A.length,skills:(x.skills||[]).length,files:$s(o.filter(_=>_.stepId===x.stepId),_=>ql(_.target)).length,reviews:R.length,statuses:A.slice(-12).map(_=>({id:_.id,status:_.status,label:_.title})),latest:A.at(-1)||null}]}));return{stages:n,submitted:m,sources:a,files:l,skills:u,bindings:c.length,checks:p.length,records:s.length,focus:g,active:y,running:!!y&&["running","processing"].includes(i?.phase),phase:i?.phase||"ready",focusSkills:g?(g.skills||[]).map(x=>({id:x.id,name:On(x.name)||x.id})):u,scopeCalls:d,scopeFiles:h,formats:[...M].map(([x,A])=>({name:x,count:A})),recent:d.slice(-4).reverse(),stageMetrics:b,goal:g?On(g.detail):"",stageStatus:g?.statusLabel||"",tools:$s(d.filter(x=>On(x.tool)),x=>x.tool).map(x=>x.tool)}}function Ma(i,e){return e?.expanded?(i.kind==="engine"?!e.stageId:i.stepId===e.stageId)&&(e.level!=="action"||i.id===e.selectedId)?1:0:1}function of(i){let e={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0,minZ:1/0,maxZ:-1/0};for(let{point:t,size:n}of i)e.minX=Math.min(e.minX,t.x-n.w/2-.7),e.maxX=Math.max(e.maxX,t.x+n.w/2+.7),e.minY=Math.min(e.minY,t.y-n.h/2-.55),e.maxY=Math.max(e.maxY,t.y+n.h/2+.55),e.minZ=Math.min(e.minZ,t.z-.6),e.maxZ=Math.max(e.maxZ,t.z+.8);return i.length?e:null}var js=1.12;function bh(i,e){return!e?.expanded&&i.kind!=="step"?0:Ma(i,e)}function Zl(i){let e=(i?.nodes||[]).filter(n=>n.kind==="step"),t={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0,minZ:1/0,maxZ:-1/0};for(let n of e){let s=i.positions.get(n.id),r=_a(n);s&&(t.minX=Math.min(t.minX,s.x-r.w*js/2-1.4),t.maxX=Math.max(t.maxX,s.x+r.w*js/2+1.4),t.minY=Math.min(t.minY,s.y-r.h*js/2-1.7),t.maxY=Math.max(t.maxY,s.y+r.h*js/2+1.5),t.minZ=Math.min(t.minZ,s.z-3.8),t.maxZ=Math.max(t.maxZ,s.z+1))}return e.length&&Number.isFinite(t.minX)?t:i?.bounds||null}var lf=(i,e,t)=>[[-i/2+t,-e/2],[i/2-t,-e/2],[i/2,-e/2+t],[i/2,e/2-t],[i/2-t,e/2],[-i/2+t,e/2],[-i/2,e/2-t],[-i/2,-e/2+t]];function cf(i){let e=Zl(i),t=new At;if(!e)return{group:t,render(){}};let n=e.maxX-e.minX,s=e.maxY-e.minY,r=Math.min(1.3,n*.08,s*.12),a=lf(n,s,r),o=lf(n-.65,s-.65,Math.max(.15,r-.2)),l=new ni(a.map(b=>new pe(...b))),c=new Qi(o.map(b=>new pe(...b)));l.holes.push(c);let u=new ft(new Fi(l,{depth:.24,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.055,bevelThickness:.04}),new kt({color:2706016,transparent:!0,opacity:.78}));t.add(u);let p=new ft(new Hr(new ni(o.map(b=>new pe(...b)))),new kt({color:531757,transparent:!0,opacity:.4,depthWrite:!1,side:gn,fog:!1}));p.position.z=-.1,t.add(p);let m=[...a,a[0]].map(b=>new C(b[0],b[1],.3)),f=new _t().setFromPoints(m);f.setAttribute("uv",new ct(m.flatMap((b,x)=>[x/(m.length-1),0]),2));let g=new Lt({uniforms:{uClock:{value:0},uMotion:{value:1}},vertexShader:"varying float vT;void main(){vT=uv.x;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"precision highp float;varying float vT;uniform float uClock;uniform float uMotion;void main(){float head=exp(-pow(abs(fract(vT-uClock*.055+.5)-.5)*40.,2.))*uMotion;vec3 c=mix(vec3(.24,.52,.67),vec3(.93,.76,.49),head);gl_FragColor=vec4(c,.28+head*.65);}",transparent:!0,depthWrite:!1,blending:$t,toneMapped:!1});t.add(new Sn(f,g));let y=[];for(let b of[-1,1])for(let x=0;x<12;x++){let A=-s/2+.9+x*(s-1.8)/11,R=b*(n/2-.08);y.push(new C(R,A,.32),new C(R-b*(x%3===0?.32:.16),A,.32))}t.add(new bn(new _t().setFromPoints(y),new Kt({color:10141129,transparent:!0,opacity:.32,fog:!1})));let d=a.filter((b,x)=>x%2===0);for(let[b,x]of d){let A=new ft(new Lr(.1,.1,.045,8),new kt({color:11453381}));A.rotation.x=Math.PI/2,A.position.set(b,x,.32),t.add(A)}t.position.set((e.minX+e.maxX)/2,(e.minY+e.maxY)/2,e.minZ+.25);let h=i.nodes.filter(b=>b.kind==="step"),M=[];for(let b of h){let x=i.positions.get(b.id),A=new ft(new an(.7,.055,.06),new kt({color:b.active?16039549:b.status==="submitted"?10209466:7708334,transparent:!0,opacity:.75}));A.position.set(x.x-t.position.x,x.y-2.55-t.position.y,x.z-t.position.z-.15),t.add(A),M.push({light:A,active:b.active,index:b.index})}return{group:t,render(b,x){g.uniforms.uClock.value=x?0:b,g.uniforms.uMotion.value=x?0:1;for(let{light:A,active:R,index:_}of M)A.material.opacity=R&&!x?.65+Math.sin(b*2.2+_)*.2:.65}}}var Zx=["varying float vWireT;","uniform vec3 uStartOffset;","uniform vec3 uEndOffset;","void main(){","vWireT=uv.x;","vec3 p=position+mix(uStartOffset,uEndOffset,smoothstep(0.,1.,uv.x));","gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);","}"].join(`
`),Kx=["precision highp float;","varying float vWireT;","uniform vec3 uColor;","uniform float uHead;","uniform float uReveal;","uniform float uGain;","uniform float uMotion;","uniform float uRepeats;","uniform float uLayer;","uniform float uScope;","void main(){","if(vWireT>uReveal)discard;","float lag=fract((uHead-vWireT)*uRepeats);","float d=abs(fract((vWireT-uHead)*uRepeats+.5)-.5);","float head=exp(-d*d*1550.);","float trail=(1.-smoothstep(0.,.20,lag))*.38;","float signal=(head+trail)*uMotion;","float alpha=clamp((.10+uGain*signal)*uLayer,0.,.96)*uScope;","gl_FragColor=vec4(uColor*(.7+head*uMotion*1.6),alpha);","}"].join(`
`);function Eh(i,e){return new Lt({uniforms:{...i,uLayer:{value:e}},vertexShader:Zx,fragmentShader:Kx,transparent:!0,depthWrite:!1,depthTest:!0,blending:$t,toneMapped:!1})}var Sa=i=>["failed","refused","blocked","needs_revision"].includes(i.status)?15702915:i.active?16761468:i.hero?10736833:i.kind==="review"?13215175:i.status==="submitted"?11061679:i.kind==="engine"?14921079:12289372;function hf(i,e){let t=new ni,n=.17;return t.moveTo(-i/2+n,-e/2),t.lineTo(i/2,-e/2),t.lineTo(i/2,e/2-n),t.lineTo(i/2-n,e/2),t.lineTo(-i/2,e/2),t.lineTo(-i/2,-e/2+n),t.closePath(),t}function Kl(i){i.traverse(e=>{e.isInstancedMesh&&e.dispose(),e.isSprite||e.geometry?.dispose();for(let t of Array.isArray(e.material)?e.material:[e.material])t?.dispose()}),i.clear()}var je=(i,e,t)=>{let n=document.createElement(i);return n.className=e,t?.appendChild(n),n};function uf({board:i,texture:e,host:t,onEntity:n,onPick:s,onFocusChat:r,requestFrame:a}){let o=new At,l=new At,c=new At,u=new At,p=new At,m=new At,f=new At,g=[];o.add(c,u,p,m),i.add(o,l,f);let y=new Map,d=new Map,h=null,M=null,b=null,x=null,A=null,R="",_=!1,w=!1,B=0,L=!0,F=je("aside","in-liveWindow",t);F.hidden=!0,F.setAttribute("role","status"),F.setAttribute("aria-live","polite");let W=je("div","in-liveHead",F),se=je("i","in-liveDot",W),N=je("strong","",W),Z=je("span","in-liveCode",W);Z.textContent="LIVE / STREAM",F.setAttribute("aria-live","off");let te=je("div","in-liveBody",F),K=je("div","in-liveTape",te);je("span","in-liveScan",F).setAttribute("aria-hidden","true");let q=new ya,fe="",he=null,Pe=0,Ue="",ee=null,Ae="floating",de="",ke=0;te.tabIndex=0,te.setAttribute("aria-label","所选动作的公开输出");for(let re of["pointerdown","wheel","keydown"])F.addEventListener(re,_e=>_e.stopPropagation());let Re=new WeakMap;function Oe(re,_e,Ie){let T=Re.get(re);(!T||T.key!==q.key)&&(re.replaceChildren(),T={key:q.key,rows:new Map,last:0},Re.set(re,T));let v=new Set(q.lines.map(P=>P.id));for(let[P,ae]of T.rows)v.has(P)||(ae.remove(),T.rows.delete(P));for(let P of q.lines){let ae=T.rows.get(P.id);ae?ae.parentNode!==re&&re.appendChild(ae):(ae=je(_e==="in-streamLine"?"p":"span",_e,re),ae.dataset.fresh=String(Ie&&P.id>T.last),T.rows.set(P.id,ae)),ae.dataset.source=P.source,ae.dataset.signal=/^METIS_ENVIRONMENT=/.test(P.text)?"environment":/^Successfully installed|^No broken requirements found\./.test(P.text)?"complete":"",ae.textContent!==P.text&&(ae.textContent=P.text)}T.last=q.lines.at(-1)?.id||T.last}let ht=new C,Be=new C,Ze=new C;function le(re,_e,Ie){let T=xa(re),v=new At,P=hf(T.w,T.h),ae=new Gr({color:1319731,metalness:.26,roughness:.32,clearcoat:.9,clearcoatRoughness:.18,emissive:463390,emissiveIntensity:.18}),V=new Tn({color:8807751,metalness:.82,roughness:.29,emissive:2102796,emissiveIntensity:.15}),ie=new ft(new Fi(hf(T.w+.34,T.h+.26),{depth:.19,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.07,bevelThickness:.04}),new Tn({color:1581873,metalness:.82,roughness:.36}));ie.position.z=-T.depth/2-.29,v.add(ie);let U=new bn(new vi(ie.geometry,35),new Kt({color:7508895,transparent:!0,opacity:.32,fog:!1}));U.position.copy(ie.position),v.add(U);let k=new ft(new Fi(P,{depth:T.depth,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.045,bevelThickness:.04}),[ae,V]);k.position.z=-T.depth/2,v.add(k);let G=new bn(new vi(k.geometry,35),new Kt({color:Sa(re),transparent:!0,opacity:.66,fog:!1}));G.position.z=-T.depth/2,v.add(G);let ce=[];for(let et=0;et<7;et++)for(let Xt of[-1,1]){let os=(et-3)*.29;ce.push(new C(Xt*(T.w/2+.02),os,-.03),new C(Xt*(T.w/2+.18),os,-.03))}let S=new bn(new _t().setFromPoints(ce),new Kt({color:11038537,transparent:!0,opacity:.42,fog:!1}));v.add(S);let I=new Ar(new an(.17,.22,.16),new Tn({color:10318924,metalness:.8,roughness:.3}),8),Y=new lt,be=0;for(let et of[-1,1])for(let Xt of[-.88,-.57,.57,.88])Y.makeTranslation(et*(T.w/2+.14),Xt,-T.depth/2-.08),I.setMatrixAt(be++,Y);v.add(I);let Ee=new ti(new Wn({map:e,color:Sa(re),transparent:!0,opacity:.04,depthWrite:!1,blending:$t}));Ee.scale.set(T.w*1.15,T.h*1.55,1),Ee.position.z=-.16,v.add(Ee),c.add(v);let ve=je("div","in-cardWrap"),we=je("button","in-entity"+(re.kind==="step"?" ion-chip":""),ve);we.type="button",we.dataset.networkEntity=re.id,we.dataset.kind=re.kind,ve.style.width=we.style.width="340px",ve.style.height=we.style.height="200px",re.kind==="step"&&(we.dataset.sceneStep=re.stepId);let H=je("span","in-labelBody",we),D=je("span","in-nodeHead",H),ne=je("span","",D),J=je("span","",D),j=je("strong","",H),ye=je("span","in-nodeDetail",H),ge=je("span","in-nodeMetrics",H),Ye=je("span","in-nodeFoot",H),at=re.kind==="step"?["技能","动作","文件"].map(et=>{let Xt=je("span","",ge),os=je("b","",Xt);return je("small","",Xt).textContent=et,os}):[],Ve=je("span","in-cardCircuit",H);Ve.setAttribute("aria-hidden","true");for(let et=0;et<4;et++)je("i","",Ve);let yt=je("span","in-detailStatic",ye),it=je("span","in-cardTicker",ye),bt=je("span","in-moduleHistory",H),Rt=je("span","in-resultSeal",H);bt.setAttribute("aria-hidden","true"),Rt.setAttribute("aria-hidden","true");let It=je("div","in-cardPorts",ve);It.setAttribute("role","group"),It.setAttribute("aria-label","阶段技能与真实交付");let Wt=et=>et.stopPropagation();It.addEventListener("pointerdown",Wt);let Ft=null;we.onpointerdown=et=>{et.stopPropagation(),Ft=et.button===0?{x:et.clientX,y:et.clientY,moved:!1}:null,Ft&&we.setPointerCapture(et.pointerId)},we.onpointermove=et=>{Ft&&Math.hypot(et.clientX-Ft.x,et.clientY-Ft.y)>8&&(Ft.moved=!0)},we.onpointerup=et=>{we.hasPointerCapture(et.pointerId)&&we.releasePointerCapture(et.pointerId)},we.onpointercancel=()=>{Ft=null},we.onclick=et=>{if(et.detail&&Ft?.moved){et.preventDefault();return}A=re.id,a(),n?n(re.id):re.stepId?s?.(re.stepId):r?.()};let Qt=()=>{let et=y.get(re.id);et&&!et.frozenPose&&(et.frozenPose={...et.lastIdlePose||Js(0,re.slot,!0)}),x=re.id,a()},li=()=>{if(ve.matches(":hover,:focus-within"))return;let et=y.get(re.id);et&&(et.frozenPose=null),x===re.id&&(x=null),a()};ve.onpointerenter=Qt,ve.onpointerleave=li,ve.onfocusin=Qt,ve.onfocusout=li,ve.style.backfaceVisibility="hidden";let In=new oi(ve);In.scale.set(T.w/340,T.h/200,1),l.add(In);let ln=bh(re,h.presentation);v.visible=In.visible=ln>.005,ve.inert=ln<1,ve.style.opacity=String(ln);let Kn=[];return v.traverse(et=>{if(et!==Ee)for(let Xt of Array.isArray(et.material)?et.material:[et.material])Xt&&Kn.push({material:Xt,base:Xt.opacity,depthWrite:Xt.depthWrite})}),{node:re,size:T,front:new C(0,0,T.depth/2+.075),group:v,solid:k,edge:G,glow:Ee,label:In,wrapper:ve,element:we,kind:ne,status:J,title:j,detail:ye,detailStatic:yt,cardTape:it,history:bt,seal:Rt,metrics:ge,counters:at,historyKey:"",foot:Ye,ports:It,born:_e,direction:Ie,portKey:"",position:new C,onScreen:!0,signal:null,signalAt:0,origin:null,layoutAt:0,yaw:0,frozenPose:null,lastIdlePose:null,scopeOpacity:ln,scopeFrom:ln,opacityMaterials:Kn,hardware:[S,I,U]}}function X(re){let _e=re.node,Ie=_e.ports||[],T=JSON.stringify(Ie);if(T===re.portKey)return;re.portKey=T,re.ports.replaceChildren();let v=[...Ie.filter(P=>P.kind!=="skill").slice(0,2),...Ie.filter(P=>P.kind==="skill").slice(0,2)].slice(0,3);for(let P of v){let ae=je("button","in-port in-port-"+P.kind,re.ports);ae.type="button",ae.textContent=P.title,ae.title=P.kind==="artifact"?P.title+" · "+(P.availability==="file"?"打开已登记文件":"文件暂不可预览"):P.title,ae.disabled=P.kind==="artifact"&&P.availability!=="file",ae.setAttribute("aria-label",P.kind==="artifact"?"打开 "+P.title:P.kind==="delivery"?"查看文字交付":"查看技能 "+P.title),P.kind==="artifact"&&(ae.dataset.artifactId=P.id),ae.onpointerdown=V=>{V.stopPropagation(),V.button===0&&ae.setPointerCapture(V.pointerId)},ae.onpointerup=V=>{ae.hasPointerCapture(V.pointerId)&&ae.releasePointerCapture(V.pointerId)},ae.onclick=V=>{V.stopPropagation(),P.kind==="skill"?n?n("step:"+_e.stepId):s?.(_e.stepId):n?.(P.id)}}if(Ie.length>v.length){let P=je("button","in-port in-port-more",re.ports);P.type="button",P.textContent="+"+(Ie.length-v.length),P.setAttribute("aria-label","查看本阶段全部技能与交付"),P.onclick=()=>n?.("step:"+_e.stepId)}if(!Ie.length){let P=je("span","in-portMeta",re.ports);P.textContent=_e.hero?"打开最终交付":_e.call?.tool||_e.kind==="engine"?"":_e.kind==="step"?"阶段设置与交付":_e.kind==="artifact"?"已登记文件":"实际执行记录",_e.call?.tool&&(P.textContent=_e.call.tool)}}function xe(re){let _e=h.positions.get(re.source),Ie=h.positions.get(re.target),T=Jd(_e,Ie,re.kind).map(I=>new C(I.x,I.y,I.z)),v=new Xn(T,!1,"centripetal"),P={uColor:{value:new Ke(Rn.ice)},uHead:{value:0},uReveal:{value:0},uGain:{value:.2},uMotion:{value:1},uRepeats:{value:1},uScope:{value:1},uStartOffset:{value:new C},uEndOffset:{value:new C}},ae=v.getSpacedPoints(48),V=new _t().setFromPoints(ae);V.setAttribute("uv",new ct(ae.flatMap((I,Y)=>[Y/(ae.length-1),0]),2));let ie=new Sn(V,Eh(P,.42)),U=re.kind==="sequence",k=new ft(new Yn(v,48,U?.035:.025,5,!1),Eh(P,1)),G=new ft(new Yn(v,48,U?.075:.05,4,!1),Eh(P,.15)),ce=new ti(new Wn({map:e,color:16764817,transparent:!0,depthWrite:!1,blending:$t}));ce.scale.setScalar(.8),ce.visible=!1;let S=new ji(new _t().setAttribute("position",new ct(new Float32Array(36),3)),new Ui({color:16762251,size:.045,transparent:!0,opacity:.85,depthWrite:!1,blending:$t,fog:!1}));return S.visible=!1,u.add(G,k,ie,ce,S),{edge:re,curve:v,line:ie,conduit:k,halo:G,runner:ce,tail:S,shared:P,length:v.getLength(),index:d.size,signature:JSON.stringify([_e,Ie,re.kind])}}function me(re){for(let _e of[re.line,re.conduit,re.halo,re.runner,re.tail])u.remove(_e),_e.isSprite||_e.geometry?.dispose(),_e.material.dispose()}function Se(re,_e,Ie){re.curve.getPointAt(Math.max(0,Math.min(1,_e)),Ie);let T=Fn.smoothstep(_e,0,1);return Ie.addScaledVector(re.shared.uStartOffset.value,1-T).addScaledVector(re.shared.uEndOffset.value,T),Ie}let ue=[],He=null,ze=null;function tt(){Kl(p),Kl(m),ue=[],He=null,ze=null;for(let V of g)V.remove();g.length=0,f.clear();let re=h.presentation,_e=(h.stations||[]).filter(V=>!re.expanded||re.level==="stage"&&V.id===re.stageId);!re.expanded&&_e.length&&(ze=cf(h),p.add(ze.group)),t.dataset.cockpitDeck=String(!!ze);let Ie=[];for(let V of _e){let ie=V.stageY-2.75,U=new ft(new an(V.width+.25,.12,.48),new Tn({color:2438983,metalness:.78,roughness:.36}));U.position.set(V.x,ie,V.z-.4),p.add(U);let k=new bn(new vi(U.geometry),new Kt({color:10124646,transparent:!0,opacity:.14}));k.position.copy(U.position),p.add(k);for(let G of[-V.width/2,V.width/2])Ie.push(new C(V.x+G,ie,V.z-.3),new C(V.x+G,ie+.5,V.z-.3));for(let G of[-1,1]){let ce=V.x+G*(V.width/2+.28);Ie.push(new C(ce,ie-.12,V.z-.6),new C(ce,ie+1.1,V.z-.6),new C(ce,ie+1.1,V.z-.6),new C(ce-G*.3,ie+1.4,V.z-.6))}for(let G of[-1,1]){let ce=new ft(new an(.12,.72,.25),new Tn({color:4611432,metalness:.8,roughness:.35}));ce.position.set(V.x+G*3.05,ie+.37,V.z-.18),p.add(ce)}}p.add(new bn(new _t().setFromPoints(Ie),new Kt({color:10583399,transparent:!0,opacity:.21,fog:!1})));let T=new Map;if(!re.expanded)for(let V of _e)T.has(V.row)||T.set(V.row,[]),T.get(V.row).push(V);for(let V of T.values()){let ie=[...V].sort((I,Y)=>I.x-Y.x),U=ie[0],k=ie.at(-1),G=[new C(U.x-5,U.stageY-2.9,U.z-.9),...ie.map(I=>new C(I.x,I.stageY-2.9,I.z-.9)),new C(k.x+5,k.stageY-2.9,k.z-.9)],ce=new Xn(G,!1,"centripetal"),S=new ft(new Yn(ce,64,.065,6,!1),new kt({color:10206668,transparent:!0,opacity:.18,depthWrite:!1,fog:!1}));p.add(S),p.add(new Sn(new _t().setFromPoints(ce.getPoints(64)),new Kt({color:10337733,transparent:!0,opacity:.32,fog:!1})))}if(T.size>1)for(let V of[-1,1]){let ie=[...T.values()].map(k=>{let G=[...k].sort((ce,S)=>ce.x-S.x)[V<0?0:k.length-1];return new C(G.x+V*5,G.stageY-2.9,G.z-.9)}),U=new Xn(ie,!1,"centripetal");p.add(new ft(new Yn(U,32,.055,6,!1),new kt({color:10206668,transparent:!0,opacity:.2,depthWrite:!1,fog:!1})))}let v=h.nodes.filter(V=>V.origin==="activity"),P=h.byId.get(re.stageId?"step:"+re.stageId:"engine"),ae=h.positions.get(P?.id);if(re.level==="stage"&&ae){let V=v.length?v.map(J=>({point:h.positions.get(J.id),size:xa(J)})):[{point:Xl(ae,1),size:{w:10,h:2.85}}],ie=Math.min(...V.map(J=>J.point.x-J.size.w/2))-.65,U=Math.max(...V.map(J=>J.point.x+J.size.w/2))+.65,k=Math.min(...V.map(J=>J.point.y-J.size.h/2))-.9,G=Math.max(...V.map(J=>J.point.y+J.size.h/2))+.7,ce=Math.min(...V.map(J=>J.point.z))-.8;He={minX:ie,maxX:U,minY:k-1.5,maxY:G+1.5,minZ:ce,maxZ:ce+1};let S=new ft(new yi(U-ie,G-k),new kt({color:2243663,transparent:!0,opacity:.09,depthWrite:!1,side:gn}));S.position.set((ie+U)/2,(k+G)/2,ce),p.add(S);let I=[new C(ie,G,ce),new C(ie,k,ce),new C(U,k,ce),new C(U,G,ce)];p.add(new Sn(new _t().setFromPoints(I),new Kt({color:10729917,transparent:!0,opacity:.26,fog:!1})));let Y=[new C(ae.x,ae.y-2.5,ae.z-.3),new C(ae.x,G+.6,ce),new C(ae.x,G,ce)];p.add(new Sn(new _t().setFromPoints(Y),new Kt({color:13873539,transparent:!0,opacity:.42,fog:!1})));let be=(J,j)=>{let ye=je("section",J);ye.dataset.owner=P.stepId||"__project__",ye.style.width="900px",ye.style.height=1260/(U-ie)+"px",ye.style.setProperty("--in-bay-font",300/(U-ie)+"px");let ge=new oi(ye);return ge.scale.setScalar((U-ie)/900),ge.position.set((ie+U)/2,j,ce+.25),f.add(ge),g.push(ye),ye},Ee=be("in-executionDock",G+.8),ve=je("div","in-bayCaption",Ee);je("span","",ve).textContent="EXECUTION / 执行舱",je("strong","",ve).textContent=(re.totalCalls||0)+" 个真实动作";let we=je("div","in-baySkills",Ee);je("span","in-bayKey",we).textContent="绑定技能";for(let J of(P.skills||[]).slice(0,5)){let j=je("span","in-baySkill",we);j.textContent=J.name||J.id,j.title=J.name||J.id}P.skills?.length?P.skills.length>5&&(je("span","in-bayEmpty",we).textContent="+"+(P.skills.length-5)+" 项"):je("span","in-bayEmpty",we).textContent="本步骤未绑定技能";let H=be("in-outputDock",k-.7),D=je("div","in-bayOutputs",H);je("span","in-bayKey",D).textContent="交付接点";let ne=(P.ports||[]).filter(J=>J.kind!=="skill");for(let J of ne.slice(0,3)){let j=je("button","in-bayOutput",D);j.type="button",j.textContent=J.title,j.title=J.title,j.disabled=J.kind==="artifact"&&J.availability!=="file",j.setAttribute("aria-label","打开步骤交付 "+J.title),j.onpointerdown=ye=>ye.stopPropagation(),j.onclick=()=>n?.(J.id)}if(ne.length?ne.length>3&&(je("span","in-bayEmpty",D).textContent="另有 "+(ne.length-3)+" 项 · 在交付成果中查看"):je("span","in-bayEmpty",D).textContent=P.expected?"待交付 · "+P.expected:"本步骤尚未登记交付物",!v.length){let J=be("in-emptyBay",(G+k)/2);je("strong","",J).textContent="等待本步骤开始执行",je("span","",J).textContent="真实动作将在此逐项展开"}}for(let V=0;V<10;V++){let ie=new ti(new Wn({map:e,color:15378539,transparent:!0,opacity:0,depthWrite:!1,blending:$t}));ie.scale.setScalar(.65),m.add(ie),ue.push(ie)}}function Te(re,_e){if(w)return;h=re,M=_e||M,b=Sh(M,h),t.dataset.artDirection=Rn.version,t.dataset.sceneMode=h.artMode,t.dataset.resultHero=h.heroId||"",t.dataset.chassisLayers="2",t.dataset.networkNodes=String(h.nodes.length),t.dataset.networkRecords=String(h.counts.entities),t.dataset.networkCalls=String(h.counts.calls),t.dataset.networkLayout=Cn.version,t.dataset.networkView=h.presentation.level,t.dataset.networkColumns=String(h.layout.columns),t.dataset.networkRows=String(h.layout.rows),t.dataset.networkDepth=(h.bounds.maxZ-h.bounds.minZ).toFixed(2);let Ie=[h.presentation.level,h.presentation.stageId,h.presentation.selectedId].join("|");if(Ie!==de){de=Ie,ke=performance.now();for(let U of y.values())U.scopeFrom=U.scopeOpacity,U.panelScaleFrom=U.panelScale;B=Math.max(B,ke+700)}let T=new Set(h.nodes.map(U=>U.id));for(let[U,k]of y)T.has(U)||(k.wrapper.remove(),l.remove(k.label),c.remove(k.group),Kl(k.group),y.delete(U));let v=0;for(let U of h.nodes){let k=h.positions.get(U.id),G=h.nodes[U.displaySlot-1],ce=G&&h.positions.get(G.id),S=ce?{x:Math.sign(k.x-ce.x),y:Math.sign(k.y-ce.y)}:{x:1,y:0},I=y.get(U.id);if(I){let we=rf(I.node.status,U.status);we&&(I.signal=we,I.signalAt=performance.now(),I.element.dataset.signal=we,B=Math.max(B,I.signalAt+1150)),I.position.distanceToSquared(new C(k.x,k.y,k.z))>.001&&(I.origin=I.group.position.clone(),I.layoutAt=performance.now(),B=Math.max(B,I.layoutAt+620))}else{let we=performance.now()+(_?Math.min(v++,8)*32:Math.min(U.slot,22)*20);I=le(U,we,S),y.set(U.id,I),B=Math.max(B,we+1e3)}I.node=U,I.position.set(k.x,k.y,k.z),I.yaw=k.yaw||0,I.group.position.copy(I.position),I.label.position.copy(I.position).add(I.front),I.wrapper.dataset.spaceX=String(k.x),I.wrapper.dataset.spaceY=String(k.y),I.wrapper.dataset.spaceZ=String(k.z),I.element.dataset.spaceLayer=k.layer,I.element.dataset.spaceLevel=String(k.level),I.element.dataset.parentStepId=U.stepId||"",I.element.dataset.parentStepTitle=U.ownerTitle||"",I.element.dataset.childIndex=U.childIndex===void 0?"":String(U.childIndex+1),I.element.dataset.ownerSource=U.ownerSource||"",I.element.style.setProperty("--in-node","#"+new Ke(Sa(U)).getHexString()),I.element.dataset.status=U.status,I.element.dataset.active=String(U.active),I.element.dataset.viewed=String(!!U.viewed),I.element.dataset.hero=String(!!U.hero),I.element.dataset.stageNumber=U.kind==="step"?String(U.index+1).padStart(2,"0"):"";let Y=JSON.stringify(U.recentStatuses||[]);if(Y!==I.historyKey){I.historyKey=Y,I.history.replaceChildren();for(let we of U.recentStatuses||[]){let H=je("i","",I.history);H.dataset.status=we.status}}I.seal.textContent=U.hero?U.kind==="artifact"?U.title.split(".").at(-1).toUpperCase():"TEXT":"",I.element.style.setProperty("--ion-ambient-delay",(-U.slot*.39).toFixed(2)+"s"),I.wrapper.dataset.slot=String(k.slot),I.wrapper.dataset.row=String(k.row),I.wrapper.dataset.column=String(k.column),I.element.setAttribute("aria-label",(U.kind==="step"?"第"+(U.index+1)+"步 ":U.kind==="engine"?"项目总览 ":"实际动作 ")+U.title+" · "+U.statusLabel);let be=U.ownerIndex===null?"项目整体":String(U.ownerIndex+1).padStart(2,"0")+"."+String((U.childIndex||0)+1).padStart(2,"0");I.kind.textContent=U.hero?"FINAL / 最终交付":U.kind==="step"?String(U.index+1).padStart(2,"0")+" / 编排大步骤":U.kind==="engine"?"METIS / CONTROL":["artifact","delivery"].includes(U.kind)?"FILE / 交付成果":be+" / "+(U.kind==="review"?"核验子动作":"执行子动作"),I.status.textContent=U.statusLabel,I.title.textContent=U.title,I.detailStatic.textContent=U.hero&&U.kind==="artifact"?(Number.isFinite(U.file?.bytes)?(U.file.bytes/1024).toFixed(1)+" KB · ":"")+"点击打开交付文档":ef(U);let Ee=h.byId.get("step:"+U.stepId),ve=b.stageMetrics.get(U.stepId);U.kind==="step"&&([ve?.skills||0,U.callCount,ve?.files||0].forEach((we,H)=>{I.counters[H].textContent=String(we).padStart(2,"0")}),I.metrics.setAttribute("aria-label",(ve?.skills||0)+" 项技能，"+U.callCount+" 个子动作，"+(ve?.files||0)+" 个可查看文件")),I.foot.textContent=U.kind==="step"?ve?.latest?"最近 · "+ve.latest.title:U.expected?"交付 · "+U.expected:"等待本步骤的执行记录":U.kind==="engine"?h.counts.stages+" 个大步骤 / "+h.counts.calls+" 次实际调用":Ee?"所属 · 第"+(Ee.index+1)+"步 "+Ee.title:"所属 · 项目整体（未记录具体步骤）",I.foot.title=I.foot.textContent,I.solid.material[0].color.setHex(U.active?4535595:U.hero?1522491:U.kind==="step"?1582901:["artifact","delivery"].includes(U.kind)?1781804:1320245),I.edge.material.color.setHex(Sa(U)),I.glow.material.color.setHex(Sa(U)),X(I)}let P=new Set(h.circuitEdges.map(U=>U.id));for(let[U,k]of d)P.has(U)||(me(k),d.delete(U));for(let U of h.circuitEdges){let k=d.get(U.id),G=JSON.stringify([h.positions.get(U.source),h.positions.get(U.target),U.kind]);k&&k.signature!==G&&(me(k),d.delete(U.id)),d.has(U.id)?d.get(U.id).edge=U:d.set(U.id,xe(U))}let ae=JSON.stringify([h.presentation.key,ut(),(h.stations||[]).map(U=>[U.id,U.x,U.z,U.stageY,b.stageMetrics.get(U.id)?.skills,U.callCount,h.byId.get("step:"+U.id)?.status])]);ae!==R&&(R=ae,tt());let V=h.presentation.level==="action"?"terminal":"floating";V!==Ae&&(Ae=V,q=new ya(Ae==="terminal"?120:42),fe="",Ue=""),F.dataset.mode=Ae;let ie=tf(h,M);if(ie){he=ie.nodeId,Pe=0,F.dataset.closing="false",F.hidden=!L,F.dataset.state=ie.status;let U=h.byId.get("step:"+h.byId.get(ie.nodeId)?.stepId);N.textContent=(U?"第"+(U.index+1)+"步 · "+U.title+" / ":"项目整体 / ")+ie.title,N.title=N.textContent,F.dataset.parentStepId=U?.stepId||"",F.dataset.actionId=ie.nodeId,t.dataset.liveWindow=String(L);let k=Qd(ie,M?.live),G=["running","waiting","processing"].includes(ie.status);if(k&&G&&M?.live?.entries?.some(I=>k.matches(I)))q.ingest(M.live,k);else if(ie.key!==fe||q.key!=="summary:"+ie.nodeId){q.reset("summary:"+ie.nodeId);for(let I of ie.lines)q.append(I+`
`,"status");G||(q.position=q.lines.length)}if(fe=ie.key,Z.textContent=Ae==="terminal"&&!["running","waiting","processing"].includes(ie.status)?"RECORDED / "+(h.byId.get(ie.nodeId)?.statusLabel||ie.status):{stdout:"STDOUT / LIVE",stderr:"STDERR / LIVE",log:"CONSOLE / LIVE",assistant:"MODEL / PUBLIC",receipt:"TOOL / OUTPUT"}[q.source]||"LIVE / STATUS",ee!==he){let I=y.get(ee);I&&(I.element.dataset.streaming="false",I.cardTape.replaceChildren()),ee=he,Ue=""}let S=q.key+"|"+q.revision+"|"+he;if(S!==Ue){let I=!!Ue;Ue=S;let Y=y.get(he);Oe(K,"in-streamLine",I),Y&&Oe(Y.cardTape,"in-cardStreamLine",I),F.dataset.update=String(Number(F.dataset.update||0)+1),B=Math.max(B,performance.now()+700)}}else he&&(Pe=performance.now()+180,B=Math.max(B,Pe),F.dataset.closing="true"),he=null,fe="",t.dataset.liveWindow="false";t.dataset.matrixAdditions=String(v),_=!0}function ut(){let re=h.byId.get(h.presentation.stageId?"step:"+h.presentation.stageId:"engine");return[re?.skills,re?.ports,re?.expected]}function O(re,_e){return Be.copy(re),i.localToWorld(Be),Be.project(_e),Be.z>-1&&Be.z<1&&Math.abs(Be.x)<1.3&&Math.abs(Be.y)<1.35}function Tt(re,_e,Ie){if(!h||w)return!1;t.dataset.reducedMotion=String(_e);let T=performance.now(),v=!!h.activeId,P=M?.phase==="processing"?M.live?.active?.stepId||M.currentStepId:null;ze?.render(re,_e);for(let S of y.values()){let I=jd(T-S.born,S.direction,_e),Y=S.position,be=_e?1:Ks((T-S.layoutAt)/620),Ee=S.origin?Fn.lerp(S.origin.x,Y.x,be):Y.x,ve=S.origin?Fn.lerp(S.origin.y,Y.y,be):Y.y,we=S.origin?Fn.lerp(S.origin.z,Y.z,be):Y.z;be===1&&(S.origin=null);let H=_e?Js(re,S.node.slot,!0):S.frozenPose||Js(re,S.node.slot);S.lastIdlePose=H;let D=!h.presentation.expanded&&S.node.kind==="step";for(let Wt of S.hardware)Wt.visible=!D;let ne=D?js:1;S.panelScale=Fn.lerp(S.panelScaleFrom??ne,ne,_e?1:Ks((T-ke)/620));let J=qd(T-S.signalAt,S.signal,_e),j=I.scale*J.scale*S.panelScale;S.group.position.set(Ee+I.x+H.x,ve+I.y+H.y,we+H.z+J.lift),S.group.rotation.set(H.rx,S.yaw+H.ry,0),S.group.scale.set(j,j,1),S.label.position.copy(S.front).applyQuaternion(S.group.quaternion).add(S.group.position),S.label.rotation.copy(S.group.rotation),S.label.scale.set(S.size.w/340*j,S.size.h/200*j,1),S.signal&&T-S.signalAt>1150&&(S.signal=null,delete S.element.dataset.signal);let ye=bh(S.node,h.presentation),ge=_e?1:Ks((T-ke)/500);S.scopeOpacity=Fn.lerp(S.scopeFrom??ye,ye,ge);let Ye=I.opacity*S.scopeOpacity,at=ye<1,Ve=v&&h.presentation.level==="stage"&&S.node.origin==="activity"&&S.node.id!==h.activeId,yt=O(Y,Ie)&&Ye>.005;S.onScreen=yt,S.group.visible=yt,S.label.visible=yt,S.wrapper.style.opacity=String(Ye*(Ve?.72:1)),S.wrapper.inert=ye<1,S.wrapper.dataset.contextHidden=String(ye===0),S.wrapper.dataset.contextDim=String(at),S.element.dataset.lod=at?"context":"detail";for(let{material:Wt,base:Ft,depthWrite:Qt}of S.opacityMaterials)Wt.transparent=Ye<.999||Ft<1,Wt.opacity=Ft*Ye,Wt.depthWrite=Ye>.99&&Qt;S.element.dataset.arriving=String(I.moving),S.element.dataset.impact=String(I.pulse>.1);let it=S.node.id===x||S.node.id===A||S.node.viewed;S.element.dataset.streaming=String(S.node.id===he&&q.lines.length>0);let bt=S.signal==="complete"?Math.max(0,1-(T-S.signalAt)/1e3)*.26:0,Rt=_e?0:.5+.5*Math.sin(re*1.3+S.node.slot*.7),It=S.node.active||S.node.kind==="step"&&S.node.stepId===P&&S.node.status!=="submitted";S.element.dataset.active=String(!!It),S.solid.material[0].emissiveIntensity=It?.34:.18,S.element.dataset.related=String(!!it),S.edge.material.opacity=(It?.95:S.node.hero?.9:it?.78:.42+Rt*.07)*S.scopeOpacity,S.glow.material.opacity=(It?_e?.18:.14+Math.sin(re*2.6)*.025:I.pulse*.12+bt+J.light*.08+(S.node.hero?.08:it?.06:.008+Rt*.006))*S.scopeOpacity}let ae=null,V=0,ie=0;for(let S of d.values()){let I=y.get(S.edge.target),Y=y.get(S.edge.source);if(!I||!Y)continue;let be=S.edge.kind==="sequence",Ee=be&&I.node.kind==="step"&&I.node.stepId===P&&I.node.status!=="submitted",ve=!!I.node.active||Ee,we=[x,A].some(ye=>ye&&(I.node.id===ye||Y.node.id===ye)),H=["submitted","succeeded","passed","recorded"].includes(I.node.status),D=I.node.status==="waiting",ne=Gd({time:re,index:S.index,length:S.length,age:T-I.born,signal:I.signal,signalAge:T-I.signalAt,active:ve,waiting:D,complete:H,highlight:we,reduced:_e}),J=S.shared;J.uHead.value=ne.progress,J.uReveal.value=ne.reveal,J.uGain.value=ne.gain,J.uMotion.value=_e?0:1,J.uRepeats.value=ne.repeats,J.uColor.value.setHex(ve?Rn.copper:H?Rn.complete:Rn.ice),J.uStartOffset.value.copy(Y.group.position).sub(Y.position),J.uEndOffset.value.copy(I.group.position).sub(I.position);let j=Math.min(Y.scopeOpacity,I.scopeOpacity);if(J.uScope.value=j,S.line.geometry.setDrawRange(0,ne.reveal<=0?0:Math.max(2,Math.ceil(S.line.geometry.attributes.position.count*ne.reveal))),S.line.visible=S.conduit.visible=S.halo.visible=j>.005,S.runner.visible=!_e&&ne.reveal>0&&j>.005,S.tail.visible=S.runner.visible,ne.moving&&j>.005&&V++,ne.execution&&j>.005&&ie++,S.runner.visible){Se(S,ne.progress,S.runner.position),S.runner.material.color.copy(J.uColor.value),S.runner.material.opacity=ne.gain*.72,S.runner.scale.setScalar(ve?.65:we?.58:.43),S.tail.material.color.copy(J.uColor.value),S.tail.material.opacity=ne.gain*.45;let ye=S.tail.geometry.attributes.position,ge=ne.mode==="receipt"?-1:1;for(let Ye=0;Ye<12;Ye++)Se(S,ne.progress-ge*Ye*.014,ht),ye.setXYZ(Ye,ht.x,ht.y,ht.z);ye.needsUpdate=!0}if(!ae&&j>.005&&(be&&Y.node.kind==="step"||h.presentation.expanded)&&O(Se(S,.5,ht),Ie)){let ye=ge=>(Se(S,ge,Ze),i.localToWorld(Ze),Ze.project(Ie),{x:(Ze.x+1)*t.clientWidth/2,y:(1-Ze.y)*t.clientHeight/2});ae={id:S.edge.id,mode:ne.mode,progress:ne.progress,length:S.length,moving:ne.moving,points:[.2,.35,.5,.65,.8].map(ye),head:ye(ne.progress)}}}t.__metisConnectionProbe=ae,t.dataset.connectionStyle="optical",t.dataset.flowingConnections=String(V),t.dataset.executingConnections=String(ie);let U=h.byId.get(h.activeId),k=U&&Ma(U,h.presentation)>0?h.positions.get(h.activeId)||h.positions.get("step:"+U.stepId):null;for(let S=0;S<ue.length;S++){let I=ue[S];if(I.visible=v&&!_e&&!!k,!I.visible)continue;let Y=S%2?1:-1,be=(re*.24+S*.17)%1;I.position.set(k.x+Y*be*6,k.y-1.8+S%3*.11,k.z+(S<5?-1:1)*be*4),I.material.opacity=Math.sin(Math.PI*be)*.28}!he&&Pe&&(_e||T>=Pe)&&(F.hidden=!0,Pe=0);let G=q.frame(T,_e);t.dataset.streamLines=String(G.totalLines),t.dataset.streamMoving=String(G.moving&&!!he),F.dataset.flow=String(!_e&&G.moving&&!!he);let ce=Ae==="terminal";if(ce?(K.style.transform="none",F.dataset.flow==="true"&&(te.scrollTop=Math.max(0,G.position*18-te.clientHeight))):K.style.transform="translate3d(0,"+(-Math.max(0,G.position-(t.clientHeight<700?3:6))*18).toFixed(2)+"px,0)",he){let S=y.get(he);if(S&&(S.onScreen||ce)&&L){Ze.set(S.size.w/2,S.size.h/2,.3).applyQuaternion(S.group.quaternion).add(S.group.position),i.localToWorld(Ze),Ze.project(Ie);let I=t.clientWidth,Y=t.clientHeight,be=(Ze.x+1)*I/2,Ee=(-Ze.y+1)*Y/2,ve=Math.max(12,Math.min(I-310,be+310<I?be+20:be-320)),we=Math.max(175,Math.min(Y-210,Ee));F.hidden=!1,F.style.transform=ce?"none":"translate3d("+Math.round(ve)+"px,"+Math.round(Math.max(95,we))+"px,0)",F.dataset.reduced=String(_e),F.dataset.compact=String(Y<700),F.style.opacity=".94",S.cardTape.style.transform="translate3d(0,"+(-Math.max(0,G.position-2)*18).toFixed(2)+"px,0)"}else F.hidden=!0}return t.dataset.networkLod=Ie.position.distanceTo(i.position)>42?"map":"detail",!_e&&(v||T<B||G.moving&&!!he)}function nt(re){let _e=y.has(re)?re:y.has("step:"+re)?"step:"+re:h?.byId.get(re)?.stepId?"step:"+h.byId.get(re).stepId:null;return _e?h?.positions.get(_e):null}function xt(re){if(!h?.presentation.expanded)return null;let _e=h.presentation,Ie=_e.level==="action",T=Ie?[h.byId.get(_e.selectedId)]:h.nodes.filter(P=>Ma(P,_e)===1),v=of(T.filter(P=>h.positions.has(P?.id)).map(P=>({point:h.positions.get(P.id),size:xa(P)})));if(!v)return null;if(!Ie&&He)for(let P of["X","Y","Z"])v["min"+P]=Math.min(v["min"+P],He["min"+P]),v["max"+P]=Math.max(v["max"+P],He["max"+P]);return{x:(v.minX+v.maxX)/2,y:(v.minY+v.maxY)/2,z:(v.minZ+v.maxZ)/2,w:v.maxX-v.minX,h:v.maxY-v.minY,bounds:v,action:Ie}}function Ce(re){let _e=h?.byId.get(y.has(re)?re:y.has("step:"+re)?"step:"+re:re);return _e?_e.stepId||"__project__":null}return{update:Te,render:Tt,bounds:()=>h?.presentation.expanded?h.bounds:Zl(h),position:nt,focusFrame:xt,scope:Ce,followKey:re=>Wd(h,re),preview:re=>{x=re&&y.has(re)?re:null,a()},size:re=>(y.get(re)||y.get("step:"+re))?.size||xa(),latest:()=>h?.latestId,active:()=>h?.activeId,has:re=>!!nt(re),focus:re=>{A=y.has(re)?re:"step:"+re,a()},showLive:re=>{L=!!re,L||(F.hidden=!0),t.dataset.liveWindow=String(L&&!!he),a()},animating:()=>performance.now()<B,dispose(){if(!w){w=!0,F.remove();for(let re of y.values())re.wrapper.remove();for(let re of g)re.remove();Kl(o),l.clear(),f.clear(),i.remove(o,l,f),y.clear(),d.clear(),ue=[],delete t.__metisConnectionProbe;for(let re of["cockpitDeck","connectionStyle","flowingConnections","executingConnections","artDirection","sceneMode","resultHero","chassisLayers","networkNodes","networkRecords","networkCalls","networkColumns","networkRows","networkLayout","networkDepth","liveWindow","matrixAdditions","networkLod","reducedMotion","streamLines","streamMoving","followTarget","followMode","cameraDistance"])delete t.dataset[re]}}}}var df=`
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
}`;var Jx=["varying vec2 vUv;","void main(){","vUv=position.xy*.5+.5;","gl_Position=vec4(position.xy,.999,1.0);","}"].join(`
`),$x=["precision highp float;","varying vec2 vUv;","uniform mat4 uClipToBoard;","uniform float uAspect;","uniform float uSpatial;","uniform float uPanorama;","uniform vec2 uResolution;","uniform vec2 uHeading;","uniform float uTime;","uniform float uActivity;","uniform vec2 uPointer;","uniform vec2 uFocus;","uniform vec2 uPulse;","uniform float uPulseAge;","float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}",df,"float rule(float distance,float width){float footprint=fwidth(distance);return (1.0-smoothstep(width,width+max(footprint,.001),distance))*(1.0-smoothstep(.08,.35,footprint));}","void main(){","if(uPanorama>.999){gl_FragColor=vec4(cockpitSky(vUv,uPointer,uTime,uAspect,uHeading),1.);return;}","vec2 ndc=vUv*2.-1.;","vec4 near4=uClipToBoard*vec4(ndc,-1.,1.);","vec4 far4=uClipToBoard*vec4(ndc,1.,1.);","vec3 origin=near4.xyz/near4.w;","vec3 ray=far4.xyz/far4.w-origin;","float axis=mix(ray.z,ray.y,uSpatial);","float denominator=(axis<0.?-1.:1.)*max(abs(axis),.0001);","float rayT=clamp((mix(-.19,-3.8,uSpatial)-mix(origin.z,origin.y,uSpatial))/denominator,-2000.,2000.);","vec3 hit=origin+ray*rayT;","vec2 p=clamp(mix(hit.xy,hit.xz,uSpatial),vec2(-4000.),vec2(4000.));","vec2 screen=(vUv-.5)*vec2(uAspect,1.);","vec2 q=p/mix(4.6,8.0,uSpatial);","float groundFade=1.0-smoothstep(.12,.75,max(length(dFdx(p)),length(dFdy(p))));","vec2 tile=floor(q),cell=fract(q);","float h=hash21(tile);","float gridFine=rule(min(abs(fract(p.x/.65)-.5),abs(fract(p.y/.65)-.5)),.006);","float gridMajor=rule(min(abs(fract(q.x)-.5),abs(fract(q.y)-.5)),.0028);","float routeY=.22+floor(h*3.0)*.17;","float horizontal=rule(abs(cell.y-routeY),.0019)*step(.12,cell.x)*step(cell.x,.82);","float vertical=rule(abs(cell.x-.82),.0019)*step(routeY,cell.y)*step(cell.y,routeY+.12);","float diagonal=rule(abs((cell.x-.82)+(cell.y-routeY-.12)),.0027)*step(.65,cell.x)*step(cell.x,.82)*step(routeY+.12,cell.y)*step(cell.y,routeY+.29);","float etch=max(horizontal,max(vertical,diagonal));","float via=rule(abs(length(cell-vec2(.12,routeY))-.010),.002);","float bus=rule(abs(fract((p.x+.08)/6.6)-.5),.0017)+rule(abs(fract((p.x-.08)/6.6)-.5),.00065);","float scan=pow(max(0.,1.-abs(fract((p.y+p.x*.22)*.031-uTime*.19)-.5)*2.),12.);","float flux=pow(max(0.,1.-abs(fract(p.x*.055-p.y*.016-uTime*.28)-.5)*2.),18.);","float pathFlow=pow(max(0.,1.-abs(fract(cell.x-h-uTime*.65)-.5)*2.),7.)*horizontal;","float sweep=exp(-pow((vUv.x+vUv.y*.32-fract(uTime*.095)*1.75+.25)*6.,2.));","vec2 focusDelta=(p-uFocus-uPointer*1.3)*vec2(.9,1.35);","float halo=exp(-dot(focusDelta,focusDelta)*.009);","vec2 drift=vec2(sin(uTime*.24)*.12,cos(uTime*.19)*.09);","float violet=exp(-dot(screen-vec2(.4,-.22)-drift,screen-vec2(.4,-.22)-drift)*2.3);","float warm=exp(-dot(screen-vec2(-.55,.22)+drift,screen-vec2(-.55,.22)+drift)*3.2);","float pulseDistance=abs(p.x-uPulse.x)+abs(p.y-uPulse.y)*1.35;","float pulse=rule(abs(pulseDistance-uPulseAge*9.),.075)*exp(-uPulseAge*1.12)*step(0.,uPulseAge);","float grain=hash21(floor(gl_FragCoord.xy))-.5;","float restraint=mix(1.0,.16,uSpatial)*groundFade;","vec3 base=mix(vec3(.024,.026,.043),vec3(.012,.016,.027),uSpatial);","base+=(vec3(.013,.010,.031)*violet+vec3(.035,.015,.006)*warm)*mix(1.,.42,uSpatial);","float lightSheet=exp(-abs(screen.x*.62+screen.y+.12-sin(uTime*.08)*.025)*11.);","float warmSheet=exp(-abs(screen.x*.72+screen.y-.43)*23.);","base+=(vec3(.007,.017,.025)*lightSheet+vec3(.016,.010,.004)*warmSheet)*uSpatial;","base+=(vec3(.027,.020,.026)*gridFine*.20+vec3(.071,.040,.033)*gridMajor)*restraint;","vec3 copper=vec3(.42,.20,.105);","base+=copper*(etch*.24+via*.32+bus*.085)*restraint;","base+=copper*(scan*.9+flux*.42)*(etch+bus*.6)*(.7+uActivity*.55)*restraint;","base+=vec3(.65,.38,.17)*pathFlow*(.7+uActivity*.3)*restraint;","base+=vec3(.028,.016,.012)*sweep*mix(1.,.28,uSpatial);","base+=vec3(.19,.095,.040)*halo*(.045+uActivity*.065)*mix(1.,.3,uSpatial);","base+=vec3(.30,.15,.075)*pulse*(.08+etch*.9+bus*.32)*restraint;","base+=grain*mix(.002,.0005,uSpatial);","if(uPanorama>.001)base=mix(base,cockpitSky(vUv,uPointer,uTime,uAspect,uHeading),uPanorama);","gl_FragColor=vec4(base,1.);","}"].join(`
`);function ff({scene:i,board:e,host:t}){let n={uClipToBoard:{value:new lt},uAspect:{value:1},uSpatial:{value:0},uPanorama:{value:0},uResolution:{value:new pe},uHeading:{value:new pe},uTime:{value:0},uActivity:{value:.08},uPointer:{value:new pe},uFocus:{value:new pe},uPulse:{value:new pe},uPulseAge:{value:100}},s=new yi(2,2),r=new Lt({uniforms:n,vertexShader:Jx,fragmentShader:$x,depthWrite:!1,depthTest:!1,toneMapped:!1}),a=new ft(s,r);a.frustumCulled=!1,a.renderOrder=-1e4,i.add(a);let o=new lt,l=new C,c=matchMedia("(pointer: coarse)").matches,u=.08,p=.08,m=-100,f=!1,g=0,y=0;return t.dataset.atmosphere="ion-flight-window-v1",{update(d,h){p=nf(d),n.uSpatial.value=d?.kind==="project"?1:0,y=d?.kind==="project"&&!d.network?.presentation.expanded?1:0,h&&n.uFocus.value.set(h.x,n.uSpatial.value?h.z:h.y)},pointer(d){n.uPointer.value.set(c?0:d.x,c?0:d.y)},pulse(d,h){d&&(n.uPulse.value.set(d.x,n.uSpatial.value?d.z:d.y),m=h,t.dataset.atmosphereImpulse=String(Number(t.dataset.atmosphereImpulse||0)+1))},render(d,h,M,b){f||(u+=(p-u)*Math.min(1,h*3),g=M?y:g+(y-g)*Math.min(1,h*4.5),n.uPanorama.value=g,n.uResolution.value.set(t.clientWidth,t.clientHeight),b.getWorldDirection(l),n.uHeading.value.set(l.x,l.y),n.uActivity.value=u,n.uTime.value=M?0:d,n.uPulseAge.value=M?100:d-m,n.uAspect.value=b.aspect,n.uClipToBoard.value.copy(o.copy(e.matrixWorld).invert()).multiply(b.matrixWorld).multiply(b.projectionMatrixInverse),t.dataset.ambientMotion=String(!M),t.dataset.panoramaBlend=g.toFixed(3))},dispose(){f||(f=!0,i.remove(a),s.dispose(),r.dispose(),delete t.dataset.atmosphere,delete t.dataset.atmosphereImpulse,delete t.dataset.ambientMotion,delete t.dataset.panoramaBlend)}}}var jx={submitted:8838585,working:16750169,checking:13873663,needs_revision:16764018,needs_recheck:16764018,blocked:16093826,passed:11002045,not_started:9987929,configured:11762782,incomplete:16761980},Th=i=>i.active?16757613:i.viewed?16759942:jx[i.status]||9987929;function Qx(){let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);for(let[n,s]of[[0,"#fffce8"],[.08,"#ffd3a9"],[.23,"#ff965bb8"],[.5,"#ff58222b"],[1,"#ff451000"]])t.addColorStop(n,s);return e.fillStyle=t,e.fillRect(0,0,128,128),new Cr(i)}function pf(i,e){i.traverse(t=>{t.geometry?.dispose();for(let n of Array.isArray(t.material)?t.material:[t.material])n&&!e.has(n)&&n.dispose()})}function Sb({host:i,compactHud:e=!1,onPick:t,onEntity:n,onFocusChat:s,onState:r,onError:a,onReorder:o,onBindSkill:l,onToggleLoop:c,onAddAfter:u,onOpenArtifact:p,onSkillInspect:m}){let f=new Ll({alpha:!1,antialias:!0,powerPreference:"high-performance"});f.setClearColor(526866),f.outputColorSpace=un,f.toneMapping=is,f.toneMappingExposure=1.06,f.domElement.className="ion-gl",f.domElement.setAttribute("aria-hidden","true"),i.appendChild(f.domElement);let g=new Bl;g.domElement.className="ion-labels",i.appendChild(g.domElement);let y=new Mr;y.background=new Ke(526866),y.fog=new yr(526866,.008);let d=new rn(35,1,.1,130),h=new Ol(d,i);h.enableDamping=!0,h.dampingFactor=.085,h.minDistance=6,h.maxDistance=55,h.maxPolarAngle=Math.PI*.66,h.minPolarAngle=Math.PI*.27,h.maxAzimuthAngle=.8,h.minAzimuthAngle=-.8;let M=new Hl(f);M.addPass(new Vl(y,d));let b=new Zs(new pe(800,580),.44,.62,.82),x=new Gl;M.addPass(b),M.addPass(x),y.add(new Xr(11981275,330514,.7));let A=new Bs(16761748,1.15);A.position.set(-14,18,22),y.add(A);let R=new Bs(8632534,1.3);R.position.set(16,13,-14),y.add(R);let _=new Zr(16734510,12,25);_.position.set(-5,-1,5),y.add(_);let w=new At;w.rotation.set(-.025,.035,-.065),y.add(w);let B=new Tn({color:1774106,metalness:.3,roughness:.65}),L=new Tn({color:9128499,metalness:.5,roughness:.6}),F=new Set([B,L]),W=ff({scene:y,board:w,host:i}),se=new At,N=new At,Z=new At,te=new At;w.add(se,N,Z,te);let K=Qx(),Me=new Map,q=document.createElement("button");q.type="button",q.className="ion-engine",q.setAttribute("aria-label","进入研究助手");let fe=document.createElement("strong"),he=document.createElement("span");fe.textContent="METIS",he.textContent="RESEARCH ENGINE",q.append(fe,he),q.addEventListener("pointerdown",H=>H.stopPropagation()),q.onclick=()=>s?.();let Pe=new oi(q);Pe.scale.setScalar(.014),te.add(Pe);let Ue=800,ee=580,Ae=!1,de={nodes:[],activeCalls:[]},ke="",Re="",Oe=0,ht=0,Be=0,Ze=!1,le=!0,X=!1,xe=!1,me=null,Se=null,ue=!0,He=null,ze="",tt=!1,Te=null,ut=!1,O=matchMedia("(prefers-reduced-motion: reduce)").matches,Tt="",nt="",xt="";h.enableDamping=!O;let Ce=new C;function re(H){let D=Math.min(H||1,Ue>=1450&&H>9?4:Ue>=760?3:2);return{columns:D,rows:Math.ceil(H/D),gapX:5.25,gapY:3.35}}function _e(H){let{columns:D,rows:ne,gapX:J,gapY:j}=re(H);return Array.from({length:H},(ye,ge)=>{let Ye=Math.floor(ge/D),at=Ye%2?D-1-ge%D:ge%D;return new C((at-(D-1)/2)*J,(ne-1)*j/2-Ye*j-.9,0)})}function Ie(H){let D=document.createElement("button");D.type="button",D.className="ion-chip",D.dataset.sceneStep=H;let ne=document.createElement("div");ne.className="ion-chip-head";let J=document.createElement("span");J.className="ion-chip-index";let j=document.createElement("span");j.className="ion-chip-state",ne.append(J,j);let ye=document.createElement("strong");ye.className="ion-chip-title";let ge=document.createElement("span");ge.className="ion-chip-purpose";let Ye=document.createElement("span");Ye.className="ion-chip-foot";let at=document.createElement("span");return at.className="ion-chip-face",at.append(ne,ye,ge,Ye),D.append(at),D.addEventListener("pointerdown",Ve=>Ve.stopPropagation()),D.onclick=()=>{ue=!1,r?.({follow:ue}),G(H),t?.(H)},D.addEventListener("dragstart",Ve=>{if(!de.editable){Ve.preventDefault();return}Ve.dataTransfer.setData("application/x-metis-step",H),Ve.dataTransfer.effectAllowed="move",D.dataset.dragging="true"}),D.addEventListener("dragend",()=>{delete D.dataset.dragging;for(let Ve of Me.values())delete Ve.card.element.dataset.drop}),D.addEventListener("dragover",Ve=>{!de.editable||![...Ve.dataTransfer.types].some(yt=>yt==="application/x-metis-step"||yt==="application/x-metis-skill")||(Ve.preventDefault(),Ve.stopPropagation(),D.dataset.drop=[...Ve.dataTransfer.types].includes("application/x-metis-skill")?"skill":Ve.clientY<D.getBoundingClientRect().y+D.getBoundingClientRect().height/2?"before":"after",Ve.dataTransfer.dropEffect=D.dataset.drop==="skill"?"copy":"move")}),D.addEventListener("dragleave",Ve=>{D.contains(Ve.relatedTarget)||delete D.dataset.drop}),D.addEventListener("drop",Ve=>{if(!de.editable)return;let yt=Ve.dataTransfer.getData("application/x-metis-skill"),it=Ve.dataTransfer.getData("application/x-metis-step"),bt=D.dataset.drop||"before";delete D.dataset.drop,!(!yt&&!it)&&(Ve.preventDefault(),Ve.stopPropagation(),yt?l?.(H,yt):it!==H&&o?.(it,H,bt))}),D.addEventListener("keydown",Ve=>{if(!de.editable||!Ve.altKey||!["ArrowUp","ArrowDown"].includes(Ve.key))return;let yt=de.nodes.findIndex(bt=>bt.id===H),it=de.nodes[yt+(Ve.key==="ArrowUp"?-1:1)];it&&(Ve.preventDefault(),Ve.stopPropagation(),o?.(H,it.id,Ve.key==="ArrowUp"?"before":"after"))}),{element:D,index:J,state:j,title:ye,purpose:ge,foot:Ye}}function T(H){let D=document.createElement("div");D.className="ion-nodePorts",D.setAttribute("role","group"),D.setAttribute("aria-label","步骤技能、循环与交付"),D.addEventListener("pointerdown",ye=>ye.stopPropagation());let ne=new oi(D);ne.scale.setScalar(.014),te.add(ne);let J=document.createElement("button");J.type="button",J.className="ion-nodeInsert",J.textContent="+",J.setAttribute("aria-label","在此步骤后新增步骤"),J.addEventListener("pointerdown",ye=>ye.stopPropagation()),J.onclick=()=>u?.(H);let j=new oi(J);return j.scale.setScalar(.014),te.add(j),{element:D,label:ne,add:J,action:j}}function v(H){let D=H.node,ne=D.skills||[],J=D.artifacts||[],j=JSON.stringify([D.loop,ne.map(ge=>[ge.id,ge.name]),J.map(ge=>[ge.index,ge.name,ge.availability]),D.output?.format,de.editable]);if(H.card.element.draggable=!!de.editable,H.card.element.setAttribute("aria-keyshortcuts",de.editable?"Alt+ArrowUp Alt+ArrowDown":""),H.ports.action.visible=!!de.editable&&D.viewed,H.loopTrace.visible=D.loop===!0,H.portSignature===j)return;H.portSignature=j,H.ports.element.replaceChildren();let ye=(ge,Ye,at,Ve,yt=!1)=>{let it=document.createElement("button");return it.type="button",it.className="ion-port ion-port-"+Ye,it.textContent=ge,it.title=at,it.disabled=yt,it.onclick=bt=>{bt.stopPropagation(),Ve?.()},H.ports.element.appendChild(it),it};(D.loop||de.kind==="mode")&&ye(D.loop?"↻ 达标循环":"↻ 循环","loop",D.loopCriteria||"未达标时继续本步；点此设置",()=>de.editable?c?.(D.id):t?.(D.id),de.kind==="mode"&&!de.editable);for(let ge of ne.slice(0,2)){let Ye=ye(ge.name,"skill",ge.name+" · "+ge.id,()=>m?.(D.id,ge.id));Ye.dataset.skillId=ge.id}ne.length>2&&ye("+"+(ne.length-2)+" 技能","skill","查看本步全部技能",()=>t?.(D.id));for(let ge of J.slice(0,2)){let Ye=ye(ge.name,"artifact",ge.path,()=>p?.(D.id,ge.index,ge),ge.availability!=="file");Ye.dataset.artifactIndex=String(ge.index)}J.length>2&&ye("+"+(J.length-2)+" 交付","artifact","查看本步全部交付物",()=>t?.(D.id)),D.output?.format&&D.output.format!=="auto"&&ye(D.output.format.toUpperCase(),"output","最终输出目标，点此编辑",()=>t?.(D.id))}function P(H,D){let ne=D.x-H.x,J=ne>=0?1:-1,j=Math.abs(D.y-H.y)<.5,ye=H.clone().add(new C(j?J*2.35:0,j?0:-1.25,.03)),ge=D.clone().add(new C(j?-J*2.35:0,j?0:1.25,.03)),Ye=j?[ye,ye.clone().add(new C(J*.18,0,0)),ye.clone().add(new C(J*.27,-.25,0)),ge.clone().add(new C(-J*.27,-.25,0)),ge.clone().add(new C(-J*.18,0,0)),ge]:[ye,ye.clone().add(new C(.45,-.17,0)),ge.clone().add(new C(.45,.17,0)),ge];return new Xn(Ye,!1,"centripetal")}function ae(){for(let ne of Me.values())ne.card.element.remove(),ne.ports.element.remove(),ne.ports.add.remove(),te.remove(ne.label,ne.ports.label,ne.ports.action);Me.clear();for(let ne of[se,N,Z])pf(ne,F),ne.clear();let H=_e(de.nodes.length),D=re(de.nodes.length);Pe.position.set(-.8,(D.rows-1)*D.gapY/2+1.8,.12);for(let ne=0;ne<=D.columns;ne++){let J=(ne-D.columns/2)*D.gapX;for(let j of[-.07,0,.07]){let ye=new _t().setFromPoints([new C(J+j,-18,-.08),new C(J+j,18,-.08)]);Z.add(new Sn(ye,new Kt({color:j?8733743:13396287,transparent:!0,opacity:j?.3:.46})))}for(let j=-12;j<=12;j+=1.1){let ye=new ft(new an(.11,.022,.025),L);ye.position.set(J,j,-.05),Z.add(ye)}}de.nodes.forEach((ne,J)=>{let j=H[J],ye=new At;ye.position.copy(j),se.add(ye);let ge=new ft(new an(4.65,2.42,.19),B);ye.add(ge);let Ye=new bn(new vi(ge.geometry),new Kt({color:Th(ne),transparent:!0,opacity:.6}));ye.add(Ye);for(let Kn=0;Kn<10;Kn++)for(let et of[-1,1]){let Xt=new ft(new an(.17,.035,.055),L);Xt.position.set(et*2.42,-.94+Kn*.21,-.015),ye.add(Xt)}let at=Ie(ne.id),Ve=new oi(at.element);Ve.position.copy(j).add(new C(0,0,.13)),Ve.scale.setScalar(.014),te.add(Ve);let yt=T(ne.id);yt.label.position.copy(j).add(new C(0,-1.46,.14)),yt.action.position.copy(j).add(new C(2.64,.15,.14));let it=new Xn([new C(2.15,-.8,.01),new C(2.65,-.8,.01),new C(2.65,1.28,.01),new C(1.8,1.28,.01),new C(1.8,1.15,.01)].map(Kn=>Kn.add(j))),bt=new ft(new Yn(it,40,.018,5,!1),new kt({color:15709293,transparent:!0,opacity:.65}));N.add(bt);let Rt=new ti(new Wn({map:K,color:Th(ne),transparent:!0,opacity:.13,depthWrite:!1,blending:$t}));Rt.scale.set(5.6,3.2,1),Rt.position.z=-.08,ye.add(Rt);let It=J?H[J-1]:Pe.position,Wt=P(It,j),Ft=new ft(new Yn(Wt,48,.022,6,!1),new kt({color:12740674,transparent:!0,opacity:.5}));N.add(Ft);let Qt=new At,li=new ft(new Vr(.09,12,8),new kt({color:16775625})),In=new ti(new Wn({map:K,color:16757092,transparent:!0,depthWrite:!1,blending:$t}));In.scale.setScalar(1.35),Qt.add(li,In),Qt.visible=!1,N.add(Qt);let ln=new ji(new _t().setAttribute("position",new ct(new Float32Array(48),3)),new Ui({color:16757354,size:.045,transparent:!0,opacity:.9,depthWrite:!1,blending:$t}));ln.visible=!1,N.add(ln),Me.set(ne.id,{node:ne,index:J,position:j,group:ye,edge:Ye,card:at,label:Ve,ports:yt,loopTrace:bt,glow:Rt,curve:Wt,trace:Ft,runner:Qt,tail:ln,portSignature:null})}),V(),U(!1)}function V(){for(let H of Me.values()){let D=H.node,ne=Th(D),J=H.card;J.element.dataset.active=String(D.active),J.element.dataset.viewed=String(D.viewed),J.element.dataset.status=D.status,J.element.style.setProperty("--ion-node","#"+new Ke(ne).getHexString()),J.element.setAttribute("aria-label","第"+(D.index+1)+"步 "+D.title+" · "+D.label),J.index.textContent=String(D.index+1).padStart(2,"0"),J.state.textContent=D.active?"执行中":D.label,J.title.textContent=D.title,J.purpose.textContent=D.purpose||D.expected||"选择查看本步目标与交付",J.foot.textContent=D.recentCall?D.recentCall.label+(D.recentCall.target?" · "+D.recentCall.target:""):de.kind==="mode"?(D.skills?.length||0)+" 项技能 · 点击编辑 / 拖动排序":D.loop?"达标后交付":"等待实际执行",H.edge.material.color.setHex(ne),H.trace.material.color.setHex(D.active?16758116:D.status==="submitted"?8838585:11951164),H.trace.material.opacity=D.active?1:D.status==="submitted"?.8:.44,H.glow.material.color.setHex(ne),v(H)}}function ie(H,D,ne=Yl.camera){let J=h.enableDamping;if(h.enableDamping=!1,h.update(),h.enableDamping=J,O&&(ne=0),d.position.distanceToSquared(H)<1e-5&&h.target.distanceToSquared(D)<1e-5){Se=null,i.dataset.cameraMoving="false",ce();return}ne?Se={start:performance.now(),duration:ne,from:d.position.clone(),targetFrom:h.target.clone(),position:H,target:D}:(Se=null,d.position.copy(H),h.target.copy(D),h.update()),i.dataset.cameraMoving=String(ne>0),ce()}function U(H=!0,D=!1){if(Te){let it=Te.bounds();if(!it)return;let bt=new Nn;w.updateMatrixWorld(!0);for(let Qt of[it.minX,it.maxX])for(let li of[it.minY,it.maxY])for(let In of[it.minZ,it.maxZ])bt.expandByPoint(w.localToWorld(new C(Qt,li,In)));let Rt=de.network?.presentation.expanded?de.network.artMode||"overview":"cockpit",It=Wl({minX:bt.min.x,maxX:bt.max.x,minY:bt.min.y,maxY:bt.max.y,minZ:bt.min.z,maxZ:bt.max.z},d.aspect,{mode:Rt,height:ee}),Wt=new C(...It.target),Ft=new C(...It.position);h.maxDistance=Math.max(100,It.distance*1.7),d.far=Math.max(300,It.distance*4),d.updateProjectionMatrix(),me=null,i.dataset.cameraKeyframe=Rt,D&&!O&&(d.position.copy(Wt).add(Ft.clone().sub(Wt).multiplyScalar(1.13)).add(new C(-2.5,2.8,0)),h.target.copy(Wt),h.update()),ie(Ft,Wt,H?D?Rn.intro:Rt==="complete"?Rn.handoff:1e3:0);return}let{columns:ne,rows:J,gapX:j,gapY:ye}=re(de.nodes.length),ge=(ne-1)*j+6.6,Ye=(J-1)*ye+2.65,at=Math.tan(Fn.degToRad(17.5)),Ve=Math.max(12,ge/(2*at*Math.max(.5,Ue/ee)*.92),Ye/(2*at*Math.max(.45,(ee-(e?155:220))/ee)));h.maxDistance=Math.max(55,Ve*1.25);let yt=w.localToWorld(new C(0,-.9+Ve*2*at*23/ee,0));me=null,ie(yt.clone().add(new C(-Ve*.17,Ve*.12,Ve)),yt,H?850:0)}function k(H=!0){if(!Te)return;let D=de.network?.presentation,ne=D?.level==="stage"&&de.phase==="processing"&&de.live?.active?.kind==="model"?D.stageId?"step:"+D.stageId:"engine":Te.active()||Te.latest(),J=Te.position(ne);if(!J)return;Te.showLive(!0);let j=Te.focusFrame(ne),ye=j?.bounds?Wl(j.bounds,d.aspect,{mode:j.action?"action":"execution",height:ee}):null,ge=ye?.distance||Mh(Ue,ee,Te.size(ne));h.maxDistance=Math.max(100,ge*2),d.far=Math.max(240,ge*4),d.updateProjectionMatrix();let Ye=ye?new C(...ye.target):w.localToWorld(new C(J.x,J.y+.35,J.z)),at=ye?new C(...ye.position):Ye.clone().add(new C(-.8,.6,ge));me=ne,Te.focus(ne),i.dataset.followTarget=ne,i.dataset.followMode=j?.action?"action":j?"parent-and-child":"active-card",i.dataset.cameraKeyframe="execution",ze=Te.followKey(ne),He=ne,ie(at,Ye,H?Rn.focus:0)}function G(H,D=!0){if(Te){let j=Te.position(H);if(!j)return;Te.showLive(!0),me=H,Te.focus(H);let ye=Te.focusFrame(H),ge=ye?.bounds?Wl(ye.bounds,d.aspect,{mode:ye.action?"action":"inspection",height:ee}):null,Ye=ge?.distance||Mh(Ue,ee,Te.size(H)),at=ge?new C(...ge.target):w.localToWorld(new C(j.x,j.y,j.z));h.maxDistance=Math.max(100,Ye*2),d.far=Math.max(240,Ye*4),d.updateProjectionMatrix(),i.dataset.cameraKeyframe="inspection",ie(ge?new C(...ge.position):at.clone().add(new C(-Ye*.07,Ye*.07,Ye)),at,D?Rn.focus:0);return}let ne=Me.get(H);if(!ne)return;me=H;let J=w.localToWorld(ne.position.clone());ie(J.clone().add(new C(-1.7,1.1,10.5)),J)}function ce(){!X&&!xe&&!Ze&&le&&!document.hidden&&!Oe&&(Oe=requestAnimationFrame(S))}function S(H){if(Oe=0,X||xe||!le||document.hidden)return;let D=!!Se||tt||Te?.animating()||de.nodes.some(ge=>ge.active);if(H-ht<(D?Yl.activeFrame:Yl.idleFrame)){Oe=requestAnimationFrame(S);return}let ne=Math.min(.2,(H-ht)/1e3);ht=H,O||(Be+=ne),Ze=!0;let J=!1;if(Se){let ge=Math.min(1,(H-Se.start)/Se.duration),Ye=Ks(ge);d.position.lerpVectors(Se.from,Se.position,Ye),h.target.lerpVectors(Se.targetFrom,Se.target,Ye),ge===1&&(Se=null,i.dataset.cameraMoving="false"),J=!0}let j=h.update();d.updateMatrixWorld(!0),w.updateMatrixWorld(!0),W.render(Be,ne,O,d);let ye=Te?.render(Be,O,d);for(let ge of Me.values()){let Ye=Js(Be,ge.index,O||ge.card.element.matches(":hover,:focus-visible"));ge.group.position.set(ge.position.x+Ye.x,ge.position.y+Ye.y,ge.position.z+Ye.z),ge.group.rotation.set(Ye.rx,Ye.ry,0),ge.label.position.copy(ge.group.position),ge.label.position.z+=.13,ge.label.rotation.copy(ge.group.rotation),ge.ports.label.position.copy(ge.group.position),ge.ports.label.position.y-=1.46,ge.ports.label.position.z+=.14,ge.ports.action.position.copy(ge.group.position),ge.ports.action.position.x+=2.64,ge.ports.action.position.y+=.15,ge.ports.action.position.z+=.14;let at=ge.node.active,Ve=O?.5:(Be*.48+ge.index*.13)%1;if(ge.runner.visible=at,ge.tail.visible=at&&!O,ge.glow.material.opacity=at?O?.5:.43+Math.sin(Be*3)*.09:ge.node.viewed?.22:.055,at){ge.runner.position.copy(ge.curve.getPoint(Ve));let yt=ge.tail.geometry.attributes.position;for(let it=0;it<16;it++)ge.curve.getPoint(Math.max(0,Ve-it*.014),Ce),yt.setXYZ(it,Ce.x,Ce.y,Ce.z);yt.needsUpdate=!0}}M.render(),g.render(y,d),i.dataset.frames=String(Number(i.dataset.frames||0)+1),i.dataset.cameraDistance=d.position.distanceTo(h.target).toFixed(3),i.dataset.cameraAzimuth=h.getAzimuthalAngle().toFixed(4),i.dataset.cameraElevation=(Math.PI/2-h.getPolarAngle()).toFixed(4),i.dataset.gpuGeometries=String(f.info.memory.geometries),i.dataset.gpuTextures=String(f.info.memory.textures),Ze=!1,(J||tt||j||ye||!O)&&ce()}h.addEventListener("start",()=>{tt=!0,Se=null,i.dataset.cameraMoving="false",i.dataset.cameraKeyframe="manual",ue=!1,r?.({follow:ue,manual:!0}),ce()}),h.addEventListener("end",()=>{tt=!1,ce()}),h.addEventListener("change",ce);let I=H=>{W.pointer(sf(H.clientX,H.clientY,i.getBoundingClientRect()))},Y=()=>W.pointer({x:0,y:0});i.addEventListener("pointermove",I,{passive:!0}),i.addEventListener("pointerleave",Y,{passive:!0});let be=matchMedia("(prefers-reduced-motion: reduce)"),Ee=()=>{O=be.matches||ut,h.enableDamping=!O,O&&(Se&&(d.position.copy(Se.position),h.target.copy(Se.target),Se=null,i.dataset.cameraMoving="false"),h.update()),ce()};be.addEventListener("change",Ee);let ve=()=>{document.hidden?(cancelAnimationFrame(Oe),Oe=0):ce()};document.addEventListener("visibilitychange",ve);let we=H=>{H.preventDefault(),xe=!0,cancelAnimationFrame(Oe),Oe=0,a?.("三维图形上下文已中断，可重新初始化场景。")};return f.domElement.addEventListener("webglcontextlost",we),r?.({renderer:"three-webgl2",follow:ue}),{update(H){let D=JSON.stringify(H);if(D===ke)return;let ne=de?.phase;if(ke=D,de=H,de.kind==="project"){w.rotation.set(0,0,0),h.minPolarAngle=Math.PI*.14,h.maxPolarAngle=Math.PI*.49,h.minAzimuthAngle=-1/0,h.maxAzimuthAngle=1/0;let ye=!Te;Pe.visible=!1,ye&&(Te=uf({board:w,texture:K,host:i,requestFrame:ce,onPick:t,onFocusChat:s,onEntity:Rt=>{let It=(de.network||yh(de)).byId.get(Rt);["artifact","delivery"].includes(It?.kind)||(ue=!1,r?.({follow:ue})),n?n(Rt):It?.stepId&&t?.(It.stepId)}}));let ge=de.network||yh(de);Te.update(ge,de),W.update(de,Te.position(Te.active()||Te.latest()));let Ye=[de.live?.active?.callId||"",de.activeCalls.at(-1)?.callId||"",Te.active()||"",de.activities?.at(-1)?.status||""].join("|");Ye!==Tt&&(Tt&&W.pulse(Te.position(Te.active()||Te.latest()),Be),Tt=Ye);let at=Te.active()||Te.latest(),Ve=ge.presentation,yt=[Ve.level,Ve.stageId,Ve.selectedId,Ve.page].join("|"),it=Ve.selectedId||(Ve.stageId?"step:"+Ve.stageId:"engine"),bt=Ve.level==="stage"?JSON.stringify(Te.focusFrame(it)?.bounds):"";ye?(Ve.expanded?G(it,!1):U(!1),He=at):ue&&ne!=="completed"&&de.phase==="completed"?(ue=!1,Te.showLive(!1),r?.({follow:ue}),U()):ue&&(Te.active()||ge.counts.calls)&&Te.followKey(at)!==ze?k():ue&&(Te.active()||ge.counts.calls)&&at!==He?(me=at,Te.focus(at),Te.showLive(!0),i.dataset.followTarget=at,He=at,ce()):!ue&&yt!==nt?Ve.expanded?G(it):(Te.showLive(!1),U()):!ue&&Ve.level==="stage"&&bt!==xt&&i.dataset.cameraKeyframe==="inspection"&&G(it),nt=yt,xt=bt,ce();return}q.dataset.busy=String(H.phase==="processing"||H.phase==="running");let J=de.nodes.map(ye=>ye.id).join("|");Re!==J&&(Re=J,ae());for(let ye of de.nodes)Me.has(ye.id)&&(Me.get(ye.id).node=ye);V();let j=de.activeCalls.at(-1)?.stepId;W.update(de,Me.get(j||me)?.position),ue&&j&&j!==He&&(G(j),He=j),ce()},resize(H,D){let ne=Math.max(1,H),J=Math.max(1,D);if(Ae&&Ue===ne&&ee===J)return;Ae=!0;let j=re(de.nodes.length).columns;Ue=ne,ee=J;let ye=Math.min(devicePixelRatio||1,1.35,Math.sqrt(18e5/(Ue*ee)));f.setPixelRatio(ye),f.setSize(Ue,ee,!1),M.setPixelRatio(ye),M.setSize(Ue,ee),g.setSize(Ue,ee),d.aspect=Ue/ee,d.updateProjectionMatrix(),Te?ue&&(Te.active()||de.network?.counts.calls)?k(!1):me&&i.dataset.cameraKeyframe==="inspection"?G(me,!!Se):!me&&i.dataset.cameraKeyframe!=="manual"&&U(!1):j!==re(de.nodes.length).columns&&de.nodes.length?ae():me||U(!1),ce()},visible(H){le=H,le?ce():(cancelAnimationFrame(Oe),Oe=0)},home(){ue=!1,Te?.showLive(!1),r?.({follow:ue}),U()},reveal(H=!1){ue=!!H,ze="",Te?.showLive(!1),r?.({follow:ue}),U(!0,!0)},follow(H=!0){if(ue=H&&de.phase!=="completed",r?.({follow:ue}),ue)if(Te)Te.active()||de.network?.counts.calls?k():U(),He=Te.active()||Te.latest();else{let D=de.activeCalls.at(-1)?.stepId;D?G(D):U()}else H&&Te&&de.phase==="completed"&&U()},preview(H){Te?.preview(H)},pauseMotion(H){ut=!!H,i.dataset.motionPaused=String(ut),Ee()},focus(H){ue=!1,r?.({follow:ue}),G(H)},captureView(){let H=de.network?.presentation;return{position:d.position.toArray(),target:h.target.toArray(),follow:ue,selected:me,keyframe:i.dataset.cameraKeyframe,layout:Te?Cn.version:"workflow-v1",navigation:Te?[H?.level,H?.stageId,H?.selectedId,H?.page].join("|"):null}},restoreView(H){if(!(!H||![H.position,H.target].every(D=>Array.isArray(D)&&D.length===3&&D.every(Number.isFinite)))){if(Te&&H.layout!==Cn.version){ue=!!Te.active(),ue?k(!1):U(!1),r?.({follow:ue});return}if(Te&&H.navigation!==[de.network?.presentation.level,de.network?.presentation.stageId,de.network?.presentation.selectedId,de.network?.presentation.page].join("|")){ue=!1;let D=de.network?.presentation;D?.expanded?G(D.selectedId||(D.stageId?"step:"+D.stageId:"engine"),!1):U(!1),r?.({follow:ue});return}if(Te&&H.follow&&de.phase==="completed"){ue=!1,Te.showLive(!1),U(!1),r?.({follow:ue});return}if(Te&&H.follow){ue=!0,k(!1),He=Te.active()||Te.latest(),r?.({follow:ue});return}ue=!!H.follow,me=Te?.has(H.selected)||Me.has(H.selected)?H.selected:null,Te?.showLive(ue||!!me),ie(new C(...H.position),new C(...H.target),0),r?.({follow:ue})}},dispose(){if(!X){X=!0,cancelAnimationFrame(Oe),be.removeEventListener("change",Ee),document.removeEventListener("visibilitychange",ve),i.removeEventListener("pointermove",I),i.removeEventListener("pointerleave",Y),f.domElement.removeEventListener("webglcontextlost",we),h.dispose(),Te?.dispose(),W.dispose();for(let H of Me.values())H.card.element.remove(),H.ports.element.remove(),H.ports.add.remove();q.remove(),pf(y,F);for(let H of F)H.dispose();K.dispose(),b.dispose(),x.dispose(),M.dispose(),f.dispose(),f.forceContextLoss(),f.domElement.remove(),g.domElement.remove(),Me.clear();for(let H of["cameraMoving","cameraAzimuth","cameraElevation","cameraKeyframe","gpuGeometries","gpuTextures"])delete i.dataset[H]}}}}export{Sb as createIonWorld};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

var Eu=Object.defineProperty;var dl=s=>{throw TypeError(s)};var Tu=(s,t,e)=>t in s?Eu(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var pl=(s,t,e)=>Tu(s,typeof t!="symbol"?t+"":t,e),Au=(s,t,e)=>t.has(s)||dl("Cannot "+e);var Gi=(s,t,e)=>t.has(s)?dl("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e);var ve=(s,t,e)=>(Au(s,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ho="160",Ru=0,ml=1,Cu=2,mh=1,gh=2,qn=3,di=0,Qe=1,be=2,hi=0,ps=1,Ii=2,gl=3,xl=4,Pu=5,Ai=100,Lu=101,Du=102,vl=103,Ml=104,Iu=200,Uu=201,zu=202,Nu=203,xo=204,vo=205,Fu=206,Ou=207,ku=208,Bu=209,Gu=210,Hu=211,Vu=212,Wu=213,Xu=214,qu=0,$u=1,Yu=2,ea=3,ju=4,Zu=5,Ku=6,Ju=7,xh=0,Qu=1,tf=2,ui=0,ef=1,nf=2,sf=3,vh=4,rf=5,af=6,Mh=300,xs=301,vs=302,Mo=303,_o=304,ha=306,Ms=1e3,An=1001,yo=1002,rn=1003,_l=1004,wa=1005,on=1006,of=1007,Qs=1008,fi=1009,lf=1010,cf=1011,Vo=1012,_h=1013,oi=1014,li=1015,tr=1016,yh=1017,Sh=1018,Pi=1020,hf=1021,Rn=1023,uf=1024,ff=1025,Li=1026,_s=1027,df=1028,wh=1029,pf=1030,bh=1031,Eh=1033,ba=33776,Ea=33777,Ta=33778,Aa=33779,yl=35840,Sl=35841,wl=35842,bl=35843,Th=36196,El=37492,Tl=37496,Al=37808,Rl=37809,Cl=37810,Pl=37811,Ll=37812,Dl=37813,Il=37814,Ul=37815,zl=37816,Nl=37817,Fl=37818,Ol=37819,kl=37820,Bl=37821,Ra=36492,Gl=36494,Hl=36495,mf=36283,Vl=36284,Wl=36285,Xl=36286,Ah=3e3,Di=3001,gf=3200,xf=3201,Rh=0,vf=1,Mn="",Me="srgb",Yn="srgb-linear",Wo="display-p3",ua="display-p3-linear",na="linear",Se="srgb",ia="rec709",sa="p3",Hi=7680,ql=519,Mf=512,_f=513,yf=514,Ch=515,Sf=516,wf=517,bf=518,Ef=519,So=35044,$l="300 es",wo=1035,$n=2e3,ra=2001;class bs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Yl=1234567;const qs=Math.PI/180,ys=180/Math.PI;function zn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(je[s&255]+je[s>>8&255]+je[s>>16&255]+je[s>>24&255]+"-"+je[t&255]+je[t>>8&255]+"-"+je[t>>16&15|64]+je[t>>24&255]+"-"+je[e&63|128]+je[e>>8&255]+"-"+je[e>>16&255]+je[e>>24&255]+je[n&255]+je[n>>8&255]+je[n>>16&255]+je[n>>24&255]).toLowerCase()}function Ge(s,t,e){return Math.max(t,Math.min(e,s))}function Xo(s,t){return(s%t+t)%t}function Tf(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Af(s,t,e){return s!==t?(e-s)/(t-s):0}function $s(s,t,e){return(1-e)*s+e*t}function Rf(s,t,e,n){return $s(s,t,1-Math.exp(-e*n))}function Cf(s,t=1){return t-Math.abs(Xo(s,t*2)-t)}function Pf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Lf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Df(s,t){return s+Math.floor(Math.random()*(t-s+1))}function If(s,t){return s+Math.random()*(t-s)}function Uf(s){return s*(.5-Math.random())}function zf(s){s!==void 0&&(Yl=s);let t=Yl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Nf(s){return s*qs}function Ff(s){return s*ys}function bo(s){return(s&s-1)===0&&s!==0}function Of(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function aa(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function kf(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),h=o(e/2),c=r((t+n)/2),l=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*l,h*u,h*f,a*c);break;case"YZY":s.set(h*f,a*l,h*u,a*c);break;case"ZXZ":s.set(h*u,h*f,a*l,a*c);break;case"XZX":s.set(a*l,h*g,h*d,a*c);break;case"YXY":s.set(h*d,a*l,h*g,a*c);break;case"ZYZ":s.set(h*g,h*d,a*l,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Pn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function me(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Re={DEG2RAD:qs,RAD2DEG:ys,generateUUID:zn,clamp:Ge,euclideanModulo:Xo,mapLinear:Tf,inverseLerp:Af,lerp:$s,damp:Rf,pingpong:Cf,smoothstep:Pf,smootherstep:Lf,randInt:Df,randFloat:If,randFloatSpread:Uf,seededRandom:zf,degToRad:Nf,radToDeg:Ff,isPowerOfTwo:bo,ceilPowerOfTwo:Of,floorPowerOfTwo:aa,setQuaternionFromProperEuler:kf,normalize:me,denormalize:Pn};class ut{constructor(t=0,e=0){ut.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ie{constructor(t,e,n,i,r,o,a,h,c){ie.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,h,c)}set(t,e,n,i,r,o,a,h,c){const l=this.elements;return l[0]=t,l[1]=i,l[2]=a,l[3]=e,l[4]=r,l[5]=h,l[6]=n,l[7]=o,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],h=n[6],c=n[1],l=n[4],u=n[7],f=n[2],d=n[5],g=n[8],x=i[0],m=i[3],p=i[6],M=i[1],_=i[4],v=i[7],y=i[2],S=i[5],w=i[8];return r[0]=o*x+a*M+h*y,r[3]=o*m+a*_+h*S,r[6]=o*p+a*v+h*w,r[1]=c*x+l*M+u*y,r[4]=c*m+l*_+u*S,r[7]=c*p+l*v+u*w,r[2]=f*x+d*M+g*y,r[5]=f*m+d*_+g*S,r[8]=f*p+d*v+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],h=t[6],c=t[7],l=t[8];return e*o*l-e*a*c-n*r*l+n*a*h+i*r*c-i*o*h}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],h=t[6],c=t[7],l=t[8],u=l*o-a*c,f=a*h-l*r,d=c*r-o*h,g=e*u+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=u*x,t[1]=(i*c-l*n)*x,t[2]=(a*n-i*o)*x,t[3]=f*x,t[4]=(l*e-i*h)*x,t[5]=(i*r-a*e)*x,t[6]=d*x,t[7]=(n*h-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const h=Math.cos(r),c=Math.sin(r);return this.set(n*h,n*c,-n*(h*o+c*a)+o+t,-i*c,i*h,-i*(-c*o+h*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ca.makeScale(t,e)),this}rotate(t){return this.premultiply(Ca.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ca.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ca=new ie;function Ph(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function er(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Bf(){const s=er("canvas");return s.style.display="block",s}const jl={};function Ys(s){s in jl||(jl[s]=!0,console.warn(s))}const Zl=new ie().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Kl=new ie().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),dr={[Yn]:{transfer:na,primaries:ia,toReference:s=>s,fromReference:s=>s},[Me]:{transfer:Se,primaries:ia,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[ua]:{transfer:na,primaries:sa,toReference:s=>s.applyMatrix3(Kl),fromReference:s=>s.applyMatrix3(Zl)},[Wo]:{transfer:Se,primaries:sa,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Kl),fromReference:s=>s.applyMatrix3(Zl).convertLinearToSRGB()}},Gf=new Set([Yn,ua]),ge={enabled:!0,_workingColorSpace:Yn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Gf.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=dr[t].toReference,i=dr[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return dr[s].primaries},getTransfer:function(s){return s===Mn?na:dr[s].transfer}};function ms(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Pa(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Vi;class Lh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Vi===void 0&&(Vi=er("canvas")),Vi.width=t.width,Vi.height=t.height;const n=Vi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Vi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=er("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=ms(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ms(e[n]/255)*255):e[n]=ms(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Hf=0;class Dh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=zn(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(La(i[o].image)):r.push(La(i[o]))}else r=La(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function La(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Lh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vf=0;class an extends bs{constructor(t=an.DEFAULT_IMAGE,e=an.DEFAULT_MAPPING,n=An,i=An,r=on,o=Qs,a=Rn,h=fi,c=an.DEFAULT_ANISOTROPY,l=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=zn(),this.name="",this.source=new Dh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=h,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof l=="string"?this.colorSpace=l:(Ys("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=l===Di?Me:Mn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Mh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ms:t.x=t.x-Math.floor(t.x);break;case An:t.x=t.x<0?0:1;break;case yo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ms:t.y=t.y-Math.floor(t.y);break;case An:t.y=t.y<0?0:1;break;case yo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ys("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Me?Di:Ah}set encoding(t){Ys("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Di?Me:Mn}}an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=Mh;an.DEFAULT_ANISOTROPY=1;class fe{constructor(t=0,e=0,n=0,i=1){fe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const h=t.elements,c=h[0],l=h[4],u=h[8],f=h[1],d=h[5],g=h[9],x=h[2],m=h[6],p=h[10];if(Math.abs(l-f)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(l+f)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,v=(d+1)/2,y=(p+1)/2,S=(l+f)/4,w=(u+x)/4,T=(g+m)/4;return _>v&&_>y?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=S/n,r=w/n):v>y?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=S/i,r=T/i):y<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(y),n=w/r,i=T/r),this.set(n,i,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(f-l)*(f-l));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-x)/M,this.z=(f-l)/M,this.w=Math.acos((c+d+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Wf extends bs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);const i={width:t,height:e,depth:1};n.encoding!==void 0&&(Ys("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Di?Me:Mn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new an(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Dh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ui extends Wf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ih extends an{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=rn,this.minFilter=rn,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xf extends an{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=rn,this.minFilter=rn,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yn{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let h=n[i+0],c=n[i+1],l=n[i+2],u=n[i+3];const f=r[o+0],d=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=h,t[e+1]=c,t[e+2]=l,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=x;return}if(u!==x||h!==f||c!==d||l!==g){let m=1-a;const p=h*f+c*d+l*g+u*x,M=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const y=Math.sqrt(_),S=Math.atan2(y,p*M);m=Math.sin(m*S)/y,a=Math.sin(a*S)/y}const v=a*M;if(h=h*m+f*v,c=c*m+d*v,l=l*m+g*v,u=u*m+x*v,m===1-a){const y=1/Math.sqrt(h*h+c*c+l*l+u*u);h*=y,c*=y,l*=y,u*=y}}t[e]=h,t[e+1]=c,t[e+2]=l,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],h=n[i+1],c=n[i+2],l=n[i+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+l*u+h*d-c*f,t[e+1]=h*g+l*f+c*u-a*d,t[e+2]=c*g+l*d+a*f-h*u,t[e+3]=l*g-a*u-h*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,h=Math.sin,c=a(n/2),l=a(i/2),u=a(r/2),f=h(n/2),d=h(i/2),g=h(r/2);switch(o){case"XYZ":this._x=f*l*u+c*d*g,this._y=c*d*u-f*l*g,this._z=c*l*g+f*d*u,this._w=c*l*u-f*d*g;break;case"YXZ":this._x=f*l*u+c*d*g,this._y=c*d*u-f*l*g,this._z=c*l*g-f*d*u,this._w=c*l*u+f*d*g;break;case"ZXY":this._x=f*l*u-c*d*g,this._y=c*d*u+f*l*g,this._z=c*l*g+f*d*u,this._w=c*l*u-f*d*g;break;case"ZYX":this._x=f*l*u-c*d*g,this._y=c*d*u+f*l*g,this._z=c*l*g-f*d*u,this._w=c*l*u+f*d*g;break;case"YZX":this._x=f*l*u+c*d*g,this._y=c*d*u+f*l*g,this._z=c*l*g-f*d*u,this._w=c*l*u-f*d*g;break;case"XZY":this._x=f*l*u-c*d*g,this._y=c*d*u-f*l*g,this._z=c*l*g+f*d*u,this._w=c*l*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],h=e[9],c=e[2],l=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(l-h)*d,this._y=(r-c)*d,this._z=(o-i)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(l-h)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(h+l)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-i)/d,this._x=(r+c)/d,this._y=(h+l)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ge(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,h=e._y,c=e._z,l=e._w;return this._x=n*l+o*a+i*c-r*h,this._y=i*l+o*h+r*a-n*c,this._z=r*l+o*c+n*h-i*a,this._w=o*l-n*a-i*h-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const h=1-a*a;if(h<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(h),l=Math.atan2(c,a),u=Math.sin((1-e)*l)/c,f=Math.sin(e*l)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(r),n*Math.cos(r),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,n=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Jl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Jl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,h=t.w,c=2*(o*i-a*n),l=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+h*c+o*u-a*l,this.y=n+h*l+a*c-r*u,this.z=i+h*u+r*l-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,h=e.z;return this.x=i*h-r*a,this.y=r*o-n*h,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Da.copy(this).projectOnVector(t),this.sub(Da)}reflect(t){return this.sub(Da.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Da=new U,Jl=new yn;class Fi{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,wn):wn.fromBufferAttribute(r,o),wn.applyMatrix4(t.matrixWorld),this.expandByPoint(wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),pr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),pr.copy(n.boundingBox)),pr.applyMatrix4(t.matrixWorld),this.union(pr)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,wn),wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Cs),mr.subVectors(this.max,Cs),Wi.subVectors(t.a,Cs),Xi.subVectors(t.b,Cs),qi.subVectors(t.c,Cs),Qn.subVectors(Xi,Wi),ti.subVectors(qi,Xi),_i.subVectors(Wi,qi);let e=[0,-Qn.z,Qn.y,0,-ti.z,ti.y,0,-_i.z,_i.y,Qn.z,0,-Qn.x,ti.z,0,-ti.x,_i.z,0,-_i.x,-Qn.y,Qn.x,0,-ti.y,ti.x,0,-_i.y,_i.x,0];return!Ia(e,Wi,Xi,qi,mr)||(e=[1,0,0,0,1,0,0,0,1],!Ia(e,Wi,Xi,qi,mr))?!1:(gr.crossVectors(Qn,ti),e=[gr.x,gr.y,gr.z],Ia(e,Wi,Xi,qi,mr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Bn=[new U,new U,new U,new U,new U,new U,new U,new U],wn=new U,pr=new Fi,Wi=new U,Xi=new U,qi=new U,Qn=new U,ti=new U,_i=new U,Cs=new U,mr=new U,gr=new U,yi=new U;function Ia(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){yi.fromArray(s,r);const a=i.x*Math.abs(yi.x)+i.y*Math.abs(yi.y)+i.z*Math.abs(yi.z),h=t.dot(yi),c=e.dot(yi),l=n.dot(yi);if(Math.max(-Math.max(h,c,l),Math.min(h,c,l))>a)return!1}return!0}const qf=new Fi,Ps=new U,Ua=new U;class Oi{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):qf.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ps.subVectors(t,this.center);const e=Ps.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ps,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ua.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ps.copy(t.center).add(Ua)),this.expandByPoint(Ps.copy(t.center).sub(Ua))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Gn=new U,za=new U,xr=new U,ei=new U,Na=new U,vr=new U,Fa=new U;class qo{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Gn.copy(this.origin).addScaledVector(this.direction,e),Gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){za.copy(t).add(e).multiplyScalar(.5),xr.copy(e).sub(t).normalize(),ei.copy(this.origin).sub(za);const r=t.distanceTo(e)*.5,o=-this.direction.dot(xr),a=ei.dot(this.direction),h=-ei.dot(xr),c=ei.lengthSq(),l=Math.abs(1-o*o);let u,f,d,g;if(l>0)if(u=o*h-a,f=o*a-h,g=r*l,u>=0)if(f>=-g)if(f<=g){const x=1/l;u*=x,f*=x,d=u*(u+o*f+2*a)+f*(o*u+f+2*h)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*h)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*h)+c;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-h),r),d=-u*u+f*(f+2*h)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-h),r),d=f*(f+2*h)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-h),r),d=-u*u+f*(f+2*h)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*h)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(za).addScaledVector(xr,f),d}intersectSphere(t,e){Gn.subVectors(t.center,this.origin);const n=Gn.dot(this.direction),i=Gn.dot(Gn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,h=n+o;return h<0?null:a<0?this.at(h,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,h;const c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),l>=0?(r=(t.min.y-f.y)*l,o=(t.max.y-f.y)*l):(r=(t.max.y-f.y)*l,o=(t.min.y-f.y)*l),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-f.z)*u,h=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,h=(t.min.z-f.z)*u),n>h||a>i)||((a>n||n!==n)&&(n=a),(h<i||i!==i)&&(i=h),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Gn)!==null}intersectTriangle(t,e,n,i,r){Na.subVectors(e,t),vr.subVectors(n,t),Fa.crossVectors(Na,vr);let o=this.direction.dot(Fa),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ei.subVectors(this.origin,t);const h=a*this.direction.dot(vr.crossVectors(ei,vr));if(h<0)return null;const c=a*this.direction.dot(Na.cross(ei));if(c<0||h+c>o)return null;const l=-a*ei.dot(Fa);return l<0?null:this.at(l/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,n,i,r,o,a,h,c,l,u,f,d,g,x,m){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,h,c,l,u,f,d,g,x,m)}set(t,e,n,i,r,o,a,h,c,l,u,f,d,g,x,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=h,p[2]=c,p[6]=l,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/$i.setFromMatrixColumn(t,0).length(),r=1/$i.setFromMatrixColumn(t,1).length(),o=1/$i.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),h=Math.cos(i),c=Math.sin(i),l=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*l,d=o*u,g=a*l,x=a*u;e[0]=h*l,e[4]=-h*u,e[8]=c,e[1]=d+g*c,e[5]=f-x*c,e[9]=-a*h,e[2]=x-f*c,e[6]=g+d*c,e[10]=o*h}else if(t.order==="YXZ"){const f=h*l,d=h*u,g=c*l,x=c*u;e[0]=f+x*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*l,e[9]=-a,e[2]=d*a-g,e[6]=x+f*a,e[10]=o*h}else if(t.order==="ZXY"){const f=h*l,d=h*u,g=c*l,x=c*u;e[0]=f-x*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*l,e[9]=x-f*a,e[2]=-o*c,e[6]=a,e[10]=o*h}else if(t.order==="ZYX"){const f=o*l,d=o*u,g=a*l,x=a*u;e[0]=h*l,e[4]=g*c-d,e[8]=f*c+x,e[1]=h*u,e[5]=x*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*h,e[10]=o*h}else if(t.order==="YZX"){const f=o*h,d=o*c,g=a*h,x=a*c;e[0]=h*l,e[4]=x-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*l,e[9]=-a*l,e[2]=-c*l,e[6]=d*u+g,e[10]=f-x*u}else if(t.order==="XZY"){const f=o*h,d=o*c,g=a*h,x=a*c;e[0]=h*l,e[4]=-u,e[8]=c*l,e[1]=f*u+x,e[5]=o*l,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*l,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose($f,t,Yf)}lookAt(t,e,n){const i=this.elements;return hn.subVectors(t,e),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),ni.crossVectors(n,hn),ni.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),ni.crossVectors(n,hn)),ni.normalize(),Mr.crossVectors(hn,ni),i[0]=ni.x,i[4]=Mr.x,i[8]=hn.x,i[1]=ni.y,i[5]=Mr.y,i[9]=hn.y,i[2]=ni.z,i[6]=Mr.z,i[10]=hn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],h=n[8],c=n[12],l=n[1],u=n[5],f=n[9],d=n[13],g=n[2],x=n[6],m=n[10],p=n[14],M=n[3],_=n[7],v=n[11],y=n[15],S=i[0],w=i[4],T=i[8],b=i[12],E=i[1],C=i[5],I=i[9],F=i[13],A=i[2],L=i[6],N=i[10],z=i[14],O=i[3],H=i[7],V=i[11],G=i[15];return r[0]=o*S+a*E+h*A+c*O,r[4]=o*w+a*C+h*L+c*H,r[8]=o*T+a*I+h*N+c*V,r[12]=o*b+a*F+h*z+c*G,r[1]=l*S+u*E+f*A+d*O,r[5]=l*w+u*C+f*L+d*H,r[9]=l*T+u*I+f*N+d*V,r[13]=l*b+u*F+f*z+d*G,r[2]=g*S+x*E+m*A+p*O,r[6]=g*w+x*C+m*L+p*H,r[10]=g*T+x*I+m*N+p*V,r[14]=g*b+x*F+m*z+p*G,r[3]=M*S+_*E+v*A+y*O,r[7]=M*w+_*C+v*L+y*H,r[11]=M*T+_*I+v*N+y*V,r[15]=M*b+_*F+v*z+y*G,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],h=t[9],c=t[13],l=t[2],u=t[6],f=t[10],d=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*h*u-i*c*u-r*a*f+n*c*f+i*a*d-n*h*d)+x*(+e*h*d-e*c*f+r*o*f-i*o*d+i*c*l-r*h*l)+m*(+e*c*u-e*a*d-r*o*u+n*o*d+r*a*l-n*c*l)+p*(-i*a*l-e*h*u+e*a*f+i*o*u-n*o*f+n*h*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],h=t[6],c=t[7],l=t[8],u=t[9],f=t[10],d=t[11],g=t[12],x=t[13],m=t[14],p=t[15],M=u*m*c-x*f*c+x*h*d-a*m*d-u*h*p+a*f*p,_=g*f*c-l*m*c-g*h*d+o*m*d+l*h*p-o*f*p,v=l*x*c-g*u*c+g*a*d-o*x*d-l*a*p+o*u*p,y=g*u*h-l*x*h-g*a*f+o*x*f+l*a*m-o*u*m,S=e*M+n*_+i*v+r*y;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/S;return t[0]=M*w,t[1]=(x*f*r-u*m*r-x*i*d+n*m*d+u*i*p-n*f*p)*w,t[2]=(a*m*r-x*h*r+x*i*c-n*m*c-a*i*p+n*h*p)*w,t[3]=(u*h*r-a*f*r-u*i*c+n*f*c+a*i*d-n*h*d)*w,t[4]=_*w,t[5]=(l*m*r-g*f*r+g*i*d-e*m*d-l*i*p+e*f*p)*w,t[6]=(g*h*r-o*m*r-g*i*c+e*m*c+o*i*p-e*h*p)*w,t[7]=(o*f*r-l*h*r+l*i*c-e*f*c-o*i*d+e*h*d)*w,t[8]=v*w,t[9]=(g*u*r-l*x*r-g*n*d+e*x*d+l*n*p-e*u*p)*w,t[10]=(o*x*r-g*a*r+g*n*c-e*x*c-o*n*p+e*a*p)*w,t[11]=(l*a*r-o*u*r-l*n*c+e*u*c+o*n*d-e*a*d)*w,t[12]=y*w,t[13]=(l*x*i-g*u*i+g*n*f-e*x*f-l*n*m+e*u*m)*w,t[14]=(g*a*i-o*x*i-g*n*h+e*x*h+o*n*m-e*a*m)*w,t[15]=(o*u*i-l*a*i+l*n*h-e*u*h-o*n*f+e*a*f)*w,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,h=t.z,c=r*o,l=r*a;return this.set(c*o+n,c*a-i*h,c*h+i*a,0,c*a+i*h,l*a+n,l*h-i*o,0,c*h-i*a,l*h+i*o,r*h*h+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,h=e._w,c=r+r,l=o+o,u=a+a,f=r*c,d=r*l,g=r*u,x=o*l,m=o*u,p=a*u,M=h*c,_=h*l,v=h*u,y=n.x,S=n.y,w=n.z;return i[0]=(1-(x+p))*y,i[1]=(d+v)*y,i[2]=(g-_)*y,i[3]=0,i[4]=(d-v)*S,i[5]=(1-(f+p))*S,i[6]=(m+M)*S,i[7]=0,i[8]=(g+_)*w,i[9]=(m-M)*w,i[10]=(1-(f+x))*w,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=$i.set(i[0],i[1],i[2]).length();const o=$i.set(i[4],i[5],i[6]).length(),a=$i.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],bn.copy(this);const c=1/r,l=1/o,u=1/a;return bn.elements[0]*=c,bn.elements[1]*=c,bn.elements[2]*=c,bn.elements[4]*=l,bn.elements[5]*=l,bn.elements[6]*=l,bn.elements[8]*=u,bn.elements[9]*=u,bn.elements[10]*=u,e.setFromRotationMatrix(bn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=$n){const h=this.elements,c=2*r/(e-t),l=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let d,g;if(a===$n)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ra)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return h[0]=c,h[4]=0,h[8]=u,h[12]=0,h[1]=0,h[5]=l,h[9]=f,h[13]=0,h[2]=0,h[6]=0,h[10]=d,h[14]=g,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=$n){const h=this.elements,c=1/(e-t),l=1/(n-i),u=1/(o-r),f=(e+t)*c,d=(n+i)*l;let g,x;if(a===$n)g=(o+r)*u,x=-2*u;else if(a===ra)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return h[0]=2*c,h[4]=0,h[8]=0,h[12]=-f,h[1]=0,h[5]=2*l,h[9]=0,h[13]=-d,h[2]=0,h[6]=0,h[10]=x,h[14]=-g,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const $i=new U,bn=new se,$f=new U(0,0,0),Yf=new U(1,1,1),ni=new U,Mr=new U,hn=new U,Ql=new se,tc=new yn;class Es{constructor(t=0,e=0,n=0,i=Es.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],h=i[1],c=i[5],l=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-l,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(h,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ge(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-l,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ql.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ql,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return tc.setFromEuler(this),this.setFromQuaternion(tc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Es.DEFAULT_ORDER="XYZ";class Uh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let jf=0;const ec=new U,Yi=new yn,Hn=new se,_r=new U,Ls=new U,Zf=new U,Kf=new yn,nc=new U(1,0,0),ic=new U(0,1,0),sc=new U(0,0,1),Jf={type:"added"},Qf={type:"removed"};class Le extends bs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Le.DEFAULT_UP.clone();const t=new U,e=new Es,n=new yn,i=new U(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new se},normalMatrix:{value:new ie}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=Le.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Uh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.premultiply(Yi),this}rotateX(t){return this.rotateOnAxis(nc,t)}rotateY(t){return this.rotateOnAxis(ic,t)}rotateZ(t){return this.rotateOnAxis(sc,t)}translateOnAxis(t,e){return ec.copy(t).applyQuaternion(this.quaternion),this.position.add(ec.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(nc,t)}translateY(t){return this.translateOnAxis(ic,t)}translateZ(t){return this.translateOnAxis(sc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?_r.copy(t):_r.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(Ls,_r,this.up):Hn.lookAt(_r,Ls,this.up),this.quaternion.setFromRotationMatrix(Hn),i&&(Hn.extractRotation(i.matrixWorld),Yi.setFromRotationMatrix(Hn),this.quaternion.premultiply(Yi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Jf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Qf)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Hn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Hn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ls,t,Zf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ls,Kf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,h){return a[h.uuid]===void 0&&(a[h.uuid]=h.toJSON(t)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const h=a.shapes;if(Array.isArray(h))for(let c=0,l=h.length;c<l;c++){const u=h[c];r(t.shapes,u)}else r(t.shapes,h)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let h=0,c=this.material.length;h<c;h++)a.push(r(t.materials,this.material[h]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const h=this.animations[a];i.animations.push(r(t.animations,h))}}if(e){const a=o(t.geometries),h=o(t.materials),c=o(t.textures),l=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),h.length>0&&(n.materials=h),c.length>0&&(n.textures=c),l.length>0&&(n.images=l),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const h=[];for(const c in a){const l=a[c];delete l.metadata,h.push(l)}return h}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Le.DEFAULT_UP=new U(0,1,0);Le.DEFAULT_MATRIX_AUTO_UPDATE=!0;Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const En=new U,Vn=new U,Oa=new U,Wn=new U,ji=new U,Zi=new U,rc=new U,ka=new U,Ba=new U,Ga=new U;let yr=!1;class vn{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),En.subVectors(t,e),i.cross(En);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){En.subVectors(i,e),Vn.subVectors(n,e),Oa.subVectors(t,e);const o=En.dot(En),a=En.dot(Vn),h=En.dot(Oa),c=Vn.dot(Vn),l=Vn.dot(Oa),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*h-a*l)*f,g=(o*l-a*h)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getUV(t,e,n,i,r,o,a,h){return yr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),yr=!0),this.getInterpolation(t,e,n,i,r,o,a,h)}static getInterpolation(t,e,n,i,r,o,a,h){return this.getBarycoord(t,e,n,i,Wn)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,Wn.x),h.addScaledVector(o,Wn.y),h.addScaledVector(a,Wn.z),h)}static isFrontFacing(t,e,n,i){return En.subVectors(n,e),Vn.subVectors(t,e),En.cross(Vn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return En.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),En.cross(Vn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return vn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return vn.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,r){return yr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),yr=!0),vn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}getInterpolation(t,e,n,i,r){return vn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return vn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return vn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;ji.subVectors(i,n),Zi.subVectors(r,n),ka.subVectors(t,n);const h=ji.dot(ka),c=Zi.dot(ka);if(h<=0&&c<=0)return e.copy(n);Ba.subVectors(t,i);const l=ji.dot(Ba),u=Zi.dot(Ba);if(l>=0&&u<=l)return e.copy(i);const f=h*u-l*c;if(f<=0&&h>=0&&l<=0)return o=h/(h-l),e.copy(n).addScaledVector(ji,o);Ga.subVectors(t,r);const d=ji.dot(Ga),g=Zi.dot(Ga);if(g>=0&&d<=g)return e.copy(r);const x=d*c-h*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Zi,a);const m=l*g-d*u;if(m<=0&&u-l>=0&&d-g>=0)return rc.subVectors(r,i),a=(u-l)/(u-l+(d-g)),e.copy(i).addScaledVector(rc,a);const p=1/(m+x+f);return o=x*p,a=f*p,e.copy(n).addScaledVector(ji,o).addScaledVector(Zi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const zh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},Sr={h:0,s:0,l:0};function Ha(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Wt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Me){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ge.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ge.workingColorSpace){return this.r=t,this.g=e,this.b=n,ge.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ge.workingColorSpace){if(t=Xo(t,1),e=Ge(e,0,1),n=Ge(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ha(o,r,t+1/3),this.g=Ha(o,r,t),this.b=Ha(o,r,t-1/3)}return ge.toWorkingColorSpace(this,i),this}setStyle(t,e=Me){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Me){const n=zh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ms(t.r),this.g=ms(t.g),this.b=ms(t.b),this}copyLinearToSRGB(t){return this.r=Pa(t.r),this.g=Pa(t.g),this.b=Pa(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Me){return ge.fromWorkingColorSpace(Ze.copy(this),t),Math.round(Ge(Ze.r*255,0,255))*65536+Math.round(Ge(Ze.g*255,0,255))*256+Math.round(Ge(Ze.b*255,0,255))}getHexString(t=Me){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ge.workingColorSpace){ge.fromWorkingColorSpace(Ze.copy(this),e);const n=Ze.r,i=Ze.g,r=Ze.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let h,c;const l=(a+o)/2;if(a===o)h=0,c=0;else{const u=o-a;switch(c=l<=.5?u/(o+a):u/(2-o-a),o){case n:h=(i-r)/u+(i<r?6:0);break;case i:h=(r-n)/u+2;break;case r:h=(n-i)/u+4;break}h/=6}return t.h=h,t.s=c,t.l=l,t}getRGB(t,e=ge.workingColorSpace){return ge.fromWorkingColorSpace(Ze.copy(this),e),t.r=Ze.r,t.g=Ze.g,t.b=Ze.b,t}getStyle(t=Me){ge.fromWorkingColorSpace(Ze.copy(this),t);const e=Ze.r,n=Ze.g,i=Ze.b;return t!==Me?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ii),this.setHSL(ii.h+t,ii.s+e,ii.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ii),t.getHSL(Sr);const n=$s(ii.h,Sr.h,e),i=$s(ii.s,Sr.s,e),r=$s(ii.l,Sr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ze=new Wt;Wt.NAMES=zh;let td=0;class mi extends bs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=zn(),this.name="",this.type="Material",this.blending=ps,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xo,this.blendDst=vo,this.blendEquation=Ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=ea,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ql,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hi,this.stencilZFail=Hi,this.stencilZPass=Hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ps&&(n.blending=this.blending),this.side!==di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xo&&(n.blendSrc=this.blendSrc),this.blendDst!==vo&&(n.blendDst=this.blendDst),this.blendEquation!==Ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ea&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ql&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Hi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Hi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const h=r[a];delete h.metadata,o.push(h)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Je extends mi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=xh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Fe=new U,wr=new ut;class Ee{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=So,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)wr.fromBufferAttribute(this,e),wr.applyMatrix3(t),this.setXY(e,wr.x,wr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Pn(e,this.array)),e}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Pn(e,this.array)),e}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Pn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Pn(e,this.array)),e}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array),r=me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==So&&(t.usage=this.usage),t}}class Nh extends Ee{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Fh extends Ee{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class te extends Ee{constructor(t,e,n){super(new Float32Array(t),e,n)}}let ed=0;const mn=new se,Va=new Le,Ki=new U,un=new Fi,Ds=new Fi,Xe=new U;class de extends bs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=zn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ph(t)?Fh:Nh)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ie().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return mn.makeRotationFromQuaternion(t),this.applyMatrix4(mn),this}rotateX(t){return mn.makeRotationX(t),this.applyMatrix4(mn),this}rotateY(t){return mn.makeRotationY(t),this.applyMatrix4(mn),this}rotateZ(t){return mn.makeRotationZ(t),this.applyMatrix4(mn),this}translate(t,e,n){return mn.makeTranslation(t,e,n),this.applyMatrix4(mn),this}scale(t,e,n){return mn.makeScale(t,e,n),this.applyMatrix4(mn),this}lookAt(t){return Va.lookAt(t),Va.updateMatrix(),this.applyMatrix4(Va.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ki).negate(),this.translate(Ki.x,Ki.y,Ki.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new te(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];un.setFromBufferAttribute(r),this.morphTargetsRelative?(Xe.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Xe),Xe.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Xe)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(t){const n=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ds.setFromBufferAttribute(a),this.morphTargetsRelative?(Xe.addVectors(un.min,Ds.min),un.expandByPoint(Xe),Xe.addVectors(un.max,Ds.max),un.expandByPoint(Xe)):(un.expandByPoint(Ds.min),un.expandByPoint(Ds.max))}un.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Xe.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Xe));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],h=this.morphTargetsRelative;for(let c=0,l=a.count;c<l;c++)Xe.fromBufferAttribute(a,c),h&&(Ki.fromBufferAttribute(t,c),Xe.add(Ki)),i=Math.max(i,n.distanceToSquared(Xe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,r=e.normal.array,o=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ee(new Float32Array(4*a),4));const h=this.getAttribute("tangent").array,c=[],l=[];for(let E=0;E<a;E++)c[E]=new U,l[E]=new U;const u=new U,f=new U,d=new U,g=new ut,x=new ut,m=new ut,p=new U,M=new U;function _(E,C,I){u.fromArray(i,E*3),f.fromArray(i,C*3),d.fromArray(i,I*3),g.fromArray(o,E*2),x.fromArray(o,C*2),m.fromArray(o,I*2),f.sub(u),d.sub(u),x.sub(g),m.sub(g);const F=1/(x.x*m.y-m.x*x.y);isFinite(F)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(d,-x.y).multiplyScalar(F),M.copy(d).multiplyScalar(x.x).addScaledVector(f,-m.x).multiplyScalar(F),c[E].add(p),c[C].add(p),c[I].add(p),l[E].add(M),l[C].add(M),l[I].add(M))}let v=this.groups;v.length===0&&(v=[{start:0,count:n.length}]);for(let E=0,C=v.length;E<C;++E){const I=v[E],F=I.start,A=I.count;for(let L=F,N=F+A;L<N;L+=3)_(n[L+0],n[L+1],n[L+2])}const y=new U,S=new U,w=new U,T=new U;function b(E){w.fromArray(r,E*3),T.copy(w);const C=c[E];y.copy(C),y.sub(w.multiplyScalar(w.dot(C))).normalize(),S.crossVectors(T,C);const F=S.dot(l[E])<0?-1:1;h[E*4]=y.x,h[E*4+1]=y.y,h[E*4+2]=y.z,h[E*4+3]=F}for(let E=0,C=v.length;E<C;++E){const I=v[E],F=I.start,A=I.count;for(let L=F,N=F+A;L<N;L+=3)b(n[L+0]),b(n[L+1]),b(n[L+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ee(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new U,r=new U,o=new U,a=new U,h=new U,c=new U,l=new U,u=new U;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),l.subVectors(o,r),u.subVectors(i,r),l.cross(u),a.fromBufferAttribute(n,g),h.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(l),h.add(l),c.add(l),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,h.x,h.y,h.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),l.subVectors(o,r),u.subVectors(i,r),l.cross(u),n.setXYZ(f+0,l.x,l.y,l.z),n.setXYZ(f+1,l.x,l.y,l.z),n.setXYZ(f+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Xe.fromBufferAttribute(t,e),Xe.normalize(),t.setXYZ(e,Xe.x,Xe.y,Xe.z)}toNonIndexed(){function t(a,h){const c=a.array,l=a.itemSize,u=a.normalized,f=new c.constructor(h.length*l);let d=0,g=0;for(let x=0,m=h.length;x<m;x++){a.isInterleavedBufferAttribute?d=h[x]*a.data.stride+a.offset:d=h[x]*l;for(let p=0;p<l;p++)f[g++]=c[d++]}return new Ee(f,l,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new de,n=this.index.array,i=this.attributes;for(const a in i){const h=i[a],c=t(h,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const h=[],c=r[a];for(let l=0,u=c.length;l<u;l++){const f=c[l],d=t(f,n);h.push(d)}e.morphAttributes[a]=h}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,h=o.length;a<h;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const c in h)h[c]!==void 0&&(t[c]=h[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const h in n){const c=n[h];t.data.attributes[h]=c.toJSON(t.data)}const i={};let r=!1;for(const h in this.morphAttributes){const c=this.morphAttributes[h],l=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];l.push(d.toJSON(t.data))}l.length>0&&(i[h]=l,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const l=i[c];this.setAttribute(c,l.clone(e))}const r=t.morphAttributes;for(const c in r){const l=[],u=r[c];for(let f=0,d=u.length;f<d;f++)l.push(u[f].clone(e));this.morphAttributes[c]=l}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,l=o.length;c<l;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const h=t.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ac=new se,Si=new qo,br=new Oi,oc=new U,Ji=new U,Qi=new U,ts=new U,Wa=new U,Er=new U,Tr=new ut,Ar=new ut,Rr=new ut,lc=new U,cc=new U,hc=new U,Cr=new U,Pr=new U;class xt extends Le{constructor(t=new de,e=new Je){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){Er.set(0,0,0);for(let h=0,c=r.length;h<c;h++){const l=a[h],u=r[h];l!==0&&(Wa.fromBufferAttribute(u,t),o?Er.addScaledVector(Wa,l):Er.addScaledVector(Wa.sub(e),l))}e.add(Er)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere),br.applyMatrix4(r),Si.copy(t.ray).recast(t.near),!(br.containsPoint(Si.origin)===!1&&(Si.intersectSphere(br,oc)===null||Si.origin.distanceToSquared(oc)>(t.far-t.near)**2))&&(ac.copy(r).invert(),Si.copy(t.ray).applyMatrix4(ac),!(n.boundingBox!==null&&Si.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Si)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,h=r.attributes.position,c=r.attributes.uv,l=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),_=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,y=_;v<y;v+=3){const S=a.getX(v),w=a.getX(v+1),T=a.getX(v+2);i=Lr(this,p,t,n,c,l,u,S,w,T),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const M=a.getX(m),_=a.getX(m+1),v=a.getX(m+2);i=Lr(this,o,t,n,c,l,u,M,_,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(h!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),_=Math.min(h.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,y=_;v<y;v+=3){const S=v,w=v+1,T=v+2;i=Lr(this,p,t,n,c,l,u,S,w,T),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),x=Math.min(h.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const M=m,_=m+1,v=m+2;i=Lr(this,o,t,n,c,l,u,M,_,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function nd(s,t,e,n,i,r,o,a){let h;if(t.side===Qe?h=n.intersectTriangle(o,r,i,!0,a):h=n.intersectTriangle(i,r,o,t.side===di,a),h===null)return null;Pr.copy(a),Pr.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Pr);return c<e.near||c>e.far?null:{distance:c,point:Pr.clone(),object:s}}function Lr(s,t,e,n,i,r,o,a,h,c){s.getVertexPosition(a,Ji),s.getVertexPosition(h,Qi),s.getVertexPosition(c,ts);const l=nd(s,t,e,n,Ji,Qi,ts,Cr);if(l){i&&(Tr.fromBufferAttribute(i,a),Ar.fromBufferAttribute(i,h),Rr.fromBufferAttribute(i,c),l.uv=vn.getInterpolation(Cr,Ji,Qi,ts,Tr,Ar,Rr,new ut)),r&&(Tr.fromBufferAttribute(r,a),Ar.fromBufferAttribute(r,h),Rr.fromBufferAttribute(r,c),l.uv1=vn.getInterpolation(Cr,Ji,Qi,ts,Tr,Ar,Rr,new ut),l.uv2=l.uv1),o&&(lc.fromBufferAttribute(o,a),cc.fromBufferAttribute(o,h),hc.fromBufferAttribute(o,c),l.normal=vn.getInterpolation(Cr,Ji,Qi,ts,lc,cc,hc,new U),l.normal.dot(n.direction)>0&&l.normal.multiplyScalar(-1));const u={a,b:h,c,normal:new U,materialIndex:0};vn.getNormal(Ji,Qi,ts,u.normal),l.face=u}return l}class Qt extends de{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const h=[],c=[],l=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(h),this.setAttribute("position",new te(c,3)),this.setAttribute("normal",new te(l,3)),this.setAttribute("uv",new te(u,2));function g(x,m,p,M,_,v,y,S,w,T,b){const E=v/w,C=y/T,I=v/2,F=y/2,A=S/2,L=w+1,N=T+1;let z=0,O=0;const H=new U;for(let V=0;V<N;V++){const G=V*C-F;for(let Y=0;Y<L;Y++){const W=Y*E-I;H[x]=W*M,H[m]=G*_,H[p]=A,c.push(H.x,H.y,H.z),H[x]=0,H[m]=0,H[p]=S>0?1:-1,l.push(H.x,H.y,H.z),u.push(Y/w),u.push(1-V/T),z+=1}}for(let V=0;V<T;V++)for(let G=0;G<w;G++){const Y=f+G+L*V,W=f+G+L*(V+1),$=f+(G+1)+L*(V+1),it=f+(G+1)+L*V;h.push(Y,W,it),h.push(W,$,it),O+=6}a.addGroup(d,O,b),d+=O,f+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ss(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function sn(s){const t={};for(let e=0;e<s.length;e++){const n=Ss(s[e]);for(const i in n)t[i]=n[i]}return t}function id(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Oh(s){return s.getRenderTarget()===null?s.outputColorSpace:ge.workingColorSpace}const kh={clone:Ss,merge:sn};var sd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fn extends mi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sd,this.fragmentShader=rd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ss(t.uniforms),this.uniformsGroups=id(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Bh extends Le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=$n}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class ln extends Bh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ys*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(qs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ys*2*Math.atan(Math.tan(qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(qs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const h=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/h,e-=o.offsetY*n/c,i*=o.width/h,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const es=-90,ns=1;class ad extends Le{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ln(es,ns,t,e);i.layers=this.layers,this.add(i);const r=new ln(es,ns,t,e);r.layers=this.layers,this.add(r);const o=new ln(es,ns,t,e);o.layers=this.layers,this.add(o);const a=new ln(es,ns,t,e);a.layers=this.layers,this.add(a);const h=new ln(es,ns,t,e);h.layers=this.layers,this.add(h);const c=new ln(es,ns,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,h]=e;for(const c of e)this.remove(c);if(t===$n)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(t===ra)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,h,c,l]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,h),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),t.render(e,l),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Gh extends an{constructor(t,e,n,i,r,o,a,h,c,l){t=t!==void 0?t:[],e=e!==void 0?e:xs,super(t,e,n,i,r,o,a,h,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class od extends Ui{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];e.encoding!==void 0&&(Ys("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Di?Me:Mn),this.texture=new Gh(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:on}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Qt(5,5,5),r=new Fn({name:"CubemapFromEquirect",uniforms:Ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Qe,blending:hi});r.uniforms.tEquirect.value=e;const o=new xt(i,r),a=e.minFilter;return e.minFilter===Qs&&(e.minFilter=on),new ad(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const Xa=new U,ld=new U,cd=new ie;let bi=class{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Xa.subVectors(n,e).cross(ld.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Xa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||cd.getNormalMatrix(t),i=this.coplanarPoint(Xa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}};const wi=new Oi,Dr=new U;class $o{constructor(t=new bi,e=new bi,n=new bi,i=new bi,r=new bi,o=new bi){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=$n){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],h=i[3],c=i[4],l=i[5],u=i[6],f=i[7],d=i[8],g=i[9],x=i[10],m=i[11],p=i[12],M=i[13],_=i[14],v=i[15];if(n[0].setComponents(h-r,f-c,m-d,v-p).normalize(),n[1].setComponents(h+r,f+c,m+d,v+p).normalize(),n[2].setComponents(h+o,f+l,m+g,v+M).normalize(),n[3].setComponents(h-o,f-l,m-g,v-M).normalize(),n[4].setComponents(h-a,f-u,m-x,v-_).normalize(),e===$n)n[5].setComponents(h+a,f+u,m+x,v+_).normalize();else if(e===ra)n[5].setComponents(a,u,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),wi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),wi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(wi)}intersectsSprite(t){return wi.center.set(0,0,0),wi.radius=.7071067811865476,wi.applyMatrix4(t.matrixWorld),this.intersectsSphere(wi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Dr.x=i.normal.x>0?t.max.x:t.min.x,Dr.y=i.normal.y>0?t.max.y:t.min.y,Dr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Dr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Hh(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function hd(s,t){const e=t.isWebGL2,n=new WeakMap;function i(c,l){const u=c.array,f=c.usage,d=u.byteLength,g=s.createBuffer();s.bindBuffer(l,g),s.bufferData(l,u,f),c.onUploadCallback();let x;if(u instanceof Float32Array)x=s.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)x=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)x=s.SHORT;else if(u instanceof Uint32Array)x=s.UNSIGNED_INT;else if(u instanceof Int32Array)x=s.INT;else if(u instanceof Int8Array)x=s.BYTE;else if(u instanceof Uint8Array)x=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)x=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:x,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:d}}function r(c,l,u){const f=l.array,d=l._updateRange,g=l.updateRanges;if(s.bindBuffer(u,c),d.count===-1&&g.length===0&&s.bufferSubData(u,0,f),g.length!==0){for(let x=0,m=g.length;x<m;x++){const p=g[x];e?s.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):s.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}l.clearUpdateRanges()}d.count!==-1&&(e?s.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):s.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),l.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const l=n.get(c);l&&(s.deleteBuffer(l.buffer),n.delete(c))}function h(c,l){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,i(c,l));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,l),u.version=c.version}}return{get:o,remove:a,update:h}}class Pe extends de{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),h=Math.floor(i),c=a+1,l=h+1,u=t/a,f=e/h,d=[],g=[],x=[],m=[];for(let p=0;p<l;p++){const M=p*f-o;for(let _=0;_<c;_++){const v=_*u-r;g.push(v,-M,0),x.push(0,0,1),m.push(_/a),m.push(1-p/h)}}for(let p=0;p<h;p++)for(let M=0;M<a;M++){const _=M+c*p,v=M+c*(p+1),y=M+1+c*(p+1),S=M+1+c*p;d.push(_,v,S),d.push(v,y,S)}this.setIndex(d),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(x,3)),this.setAttribute("uv",new te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pe(t.width,t.height,t.widthSegments,t.heightSegments)}}var ud=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fd=`#ifdef USE_ALPHAHASH
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
#endif`,dd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,md=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,gd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xd=`#ifdef USE_AOMAP
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
#endif`,vd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Md=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,_d=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,yd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,bd=`#ifdef USE_IRIDESCENCE
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
#endif`,Ed=`#ifdef USE_BUMPMAP
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
#endif`,Td=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,Ad=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ld=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Dd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Id=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ud=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,zd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Nd=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Fd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Od=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Vd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Wd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xd=`#ifdef USE_ENVMAP
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
#endif`,qd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$d=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Yd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jd=`#ifdef USE_GRADIENTMAP
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
}`,Qd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,tp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ep=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,np=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ip=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
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
#endif`,sp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,rp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ap=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,op=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,hp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
		float roughness = material.clearcoatRoughness;
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
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
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
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,up=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,fp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,dp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,xp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,vp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_p=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,yp=`#if defined( USE_POINTS_UV )
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
#endif`,Sp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bp=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ep=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Tp=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Ap=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Rp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Cp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Pp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ip=`#ifdef USE_NORMALMAP
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
#endif`,Up=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Np=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Fp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Op=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Bp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,$p=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Yp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,jp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Zp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kp=`#ifdef USE_SKINNING
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
#endif`,Jp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qp=`#ifdef USE_SKINNING
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
#endif`,t0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,e0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,n0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,i0=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,s0=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,r0=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,a0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,o0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,l0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,c0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const h0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,u0=`uniform sampler2D t2D;
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
}`,f0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,d0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,m0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g0=`#include <common>
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
}`,x0=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,v0=`#define DISTANCE
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
}`,M0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,_0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,y0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S0=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,w0=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,b0=`#include <common>
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
}`,E0=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,T0=`#define LAMBERT
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
}`,A0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,R0=`#define MATCAP
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
}`,C0=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,P0=`#define NORMAL
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
}`,L0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,D0=`#define PHONG
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
}`,I0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,U0=`#define STANDARD
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
}`,z0=`#define STANDARD
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
#include <packing>
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
#include <cube_uv_reflection_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,N0=`#define TOON
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
}`,F0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,O0=`uniform float size;
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
}`,k0=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,B0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,G0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,H0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,V0=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,ne={alphahash_fragment:ud,alphahash_pars_fragment:fd,alphamap_fragment:dd,alphamap_pars_fragment:pd,alphatest_fragment:md,alphatest_pars_fragment:gd,aomap_fragment:xd,aomap_pars_fragment:vd,batching_pars_vertex:Md,batching_vertex:_d,begin_vertex:yd,beginnormal_vertex:Sd,bsdfs:wd,iridescence_fragment:bd,bumpmap_pars_fragment:Ed,clipping_planes_fragment:Td,clipping_planes_pars_fragment:Ad,clipping_planes_pars_vertex:Rd,clipping_planes_vertex:Cd,color_fragment:Pd,color_pars_fragment:Ld,color_pars_vertex:Dd,color_vertex:Id,common:Ud,cube_uv_reflection_fragment:zd,defaultnormal_vertex:Nd,displacementmap_pars_vertex:Fd,displacementmap_vertex:Od,emissivemap_fragment:kd,emissivemap_pars_fragment:Bd,colorspace_fragment:Gd,colorspace_pars_fragment:Hd,envmap_fragment:Vd,envmap_common_pars_fragment:Wd,envmap_pars_fragment:Xd,envmap_pars_vertex:qd,envmap_physical_pars_fragment:sp,envmap_vertex:$d,fog_vertex:Yd,fog_pars_vertex:jd,fog_fragment:Zd,fog_pars_fragment:Kd,gradientmap_pars_fragment:Jd,lightmap_fragment:Qd,lightmap_pars_fragment:tp,lights_lambert_fragment:ep,lights_lambert_pars_fragment:np,lights_pars_begin:ip,lights_toon_fragment:rp,lights_toon_pars_fragment:ap,lights_phong_fragment:op,lights_phong_pars_fragment:lp,lights_physical_fragment:cp,lights_physical_pars_fragment:hp,lights_fragment_begin:up,lights_fragment_maps:fp,lights_fragment_end:dp,logdepthbuf_fragment:pp,logdepthbuf_pars_fragment:mp,logdepthbuf_pars_vertex:gp,logdepthbuf_vertex:xp,map_fragment:vp,map_pars_fragment:Mp,map_particle_fragment:_p,map_particle_pars_fragment:yp,metalnessmap_fragment:Sp,metalnessmap_pars_fragment:wp,morphcolor_vertex:bp,morphnormal_vertex:Ep,morphtarget_pars_vertex:Tp,morphtarget_vertex:Ap,normal_fragment_begin:Rp,normal_fragment_maps:Cp,normal_pars_fragment:Pp,normal_pars_vertex:Lp,normal_vertex:Dp,normalmap_pars_fragment:Ip,clearcoat_normal_fragment_begin:Up,clearcoat_normal_fragment_maps:zp,clearcoat_pars_fragment:Np,iridescence_pars_fragment:Fp,opaque_fragment:Op,packing:kp,premultiplied_alpha_fragment:Bp,project_vertex:Gp,dithering_fragment:Hp,dithering_pars_fragment:Vp,roughnessmap_fragment:Wp,roughnessmap_pars_fragment:Xp,shadowmap_pars_fragment:qp,shadowmap_pars_vertex:$p,shadowmap_vertex:Yp,shadowmask_pars_fragment:jp,skinbase_vertex:Zp,skinning_pars_vertex:Kp,skinning_vertex:Jp,skinnormal_vertex:Qp,specularmap_fragment:t0,specularmap_pars_fragment:e0,tonemapping_fragment:n0,tonemapping_pars_fragment:i0,transmission_fragment:s0,transmission_pars_fragment:r0,uv_pars_fragment:a0,uv_pars_vertex:o0,uv_vertex:l0,worldpos_vertex:c0,background_vert:h0,background_frag:u0,backgroundCube_vert:f0,backgroundCube_frag:d0,cube_vert:p0,cube_frag:m0,depth_vert:g0,depth_frag:x0,distanceRGBA_vert:v0,distanceRGBA_frag:M0,equirect_vert:_0,equirect_frag:y0,linedashed_vert:S0,linedashed_frag:w0,meshbasic_vert:b0,meshbasic_frag:E0,meshlambert_vert:T0,meshlambert_frag:A0,meshmatcap_vert:R0,meshmatcap_frag:C0,meshnormal_vert:P0,meshnormal_frag:L0,meshphong_vert:D0,meshphong_frag:I0,meshphysical_vert:U0,meshphysical_frag:z0,meshtoon_vert:N0,meshtoon_frag:F0,points_vert:O0,points_frag:k0,shadow_vert:B0,shadow_frag:G0,sprite_vert:H0,sprite_frag:V0},bt={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ie}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ie},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0},uvTransform:{value:new ie}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}}},Cn={basic:{uniforms:sn([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:sn([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:sn([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:sn([bt.common,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.roughnessmap,bt.metalnessmap,bt.fog,bt.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:sn([bt.common,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.gradientmap,bt.fog,bt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:sn([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:sn([bt.points,bt.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:sn([bt.common,bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:sn([bt.common,bt.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:sn([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:sn([bt.sprite,bt.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distanceRGBA:{uniforms:sn([bt.common,bt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distanceRGBA_vert,fragmentShader:ne.distanceRGBA_frag},shadow:{uniforms:sn([bt.lights,bt.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};Cn.physical={uniforms:sn([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ie},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ie},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ie},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ie},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ie},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ie},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ie}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};const Ir={r:0,b:0,g:0};function W0(s,t,e,n,i,r,o){const a=new Wt(0);let h=r===!0?0:1,c,l,u=null,f=0,d=null;function g(m,p){let M=!1,_=p.isScene===!0?p.background:null;_&&_.isTexture&&(_=(p.backgroundBlurriness>0?e:t).get(_)),_===null?x(a,h):_&&_.isColor&&(x(_,1),M=!0);const v=s.xr.getEnvironmentBlendMode();v==="additive"?n.buffers.color.setClear(0,0,0,1,o):v==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||M)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),_&&(_.isCubeTexture||_.mapping===ha)?(l===void 0&&(l=new xt(new Qt(1,1,1),new Fn({name:"BackgroundCubeMaterial",uniforms:Ss(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:Qe,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=ge.getTransfer(_.colorSpace)!==Se,(u!==_||f!==_.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,u=_,f=_.version,d=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new xt(new Pe(2,2),new Fn({name:"BackgroundMaterial",uniforms:Ss(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=ge.getTransfer(_.colorSpace)!==Se,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||f!==_.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,u=_,f=_.version,d=s.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function x(m,p){m.getRGB(Ir,Oh(s)),n.buffers.color.setClear(Ir.r,Ir.g,Ir.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),h=p,x(a,h)},getClearAlpha:function(){return h},setClearAlpha:function(m){h=m,x(a,h)},render:g}}function X0(s,t,e,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},h=m(null);let c=h,l=!1;function u(A,L,N,z,O){let H=!1;if(o){const V=x(z,N,L);c!==V&&(c=V,d(c.object)),H=p(A,z,N,O),H&&M(A,z,N,O)}else{const V=L.wireframe===!0;(c.geometry!==z.id||c.program!==N.id||c.wireframe!==V)&&(c.geometry=z.id,c.program=N.id,c.wireframe=V,H=!0)}O!==null&&e.update(O,s.ELEMENT_ARRAY_BUFFER),(H||l)&&(l=!1,T(A,L,N,z),O!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function f(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function d(A){return n.isWebGL2?s.bindVertexArray(A):r.bindVertexArrayOES(A)}function g(A){return n.isWebGL2?s.deleteVertexArray(A):r.deleteVertexArrayOES(A)}function x(A,L,N){const z=N.wireframe===!0;let O=a[A.id];O===void 0&&(O={},a[A.id]=O);let H=O[L.id];H===void 0&&(H={},O[L.id]=H);let V=H[z];return V===void 0&&(V=m(f()),H[z]=V),V}function m(A){const L=[],N=[],z=[];for(let O=0;O<i;O++)L[O]=0,N[O]=0,z[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:N,attributeDivisors:z,object:A,attributes:{},index:null}}function p(A,L,N,z){const O=c.attributes,H=L.attributes;let V=0;const G=N.getAttributes();for(const Y in G)if(G[Y].location>=0){const $=O[Y];let it=H[Y];if(it===void 0&&(Y==="instanceMatrix"&&A.instanceMatrix&&(it=A.instanceMatrix),Y==="instanceColor"&&A.instanceColor&&(it=A.instanceColor)),$===void 0||$.attribute!==it||it&&$.data!==it.data)return!0;V++}return c.attributesNum!==V||c.index!==z}function M(A,L,N,z){const O={},H=L.attributes;let V=0;const G=N.getAttributes();for(const Y in G)if(G[Y].location>=0){let $=H[Y];$===void 0&&(Y==="instanceMatrix"&&A.instanceMatrix&&($=A.instanceMatrix),Y==="instanceColor"&&A.instanceColor&&($=A.instanceColor));const it={};it.attribute=$,$&&$.data&&(it.data=$.data),O[Y]=it,V++}c.attributes=O,c.attributesNum=V,c.index=z}function _(){const A=c.newAttributes;for(let L=0,N=A.length;L<N;L++)A[L]=0}function v(A){y(A,0)}function y(A,L){const N=c.newAttributes,z=c.enabledAttributes,O=c.attributeDivisors;N[A]=1,z[A]===0&&(s.enableVertexAttribArray(A),z[A]=1),O[A]!==L&&((n.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](A,L),O[A]=L)}function S(){const A=c.newAttributes,L=c.enabledAttributes;for(let N=0,z=L.length;N<z;N++)L[N]!==A[N]&&(s.disableVertexAttribArray(N),L[N]=0)}function w(A,L,N,z,O,H,V){V===!0?s.vertexAttribIPointer(A,L,N,O,H):s.vertexAttribPointer(A,L,N,z,O,H)}function T(A,L,N,z){if(n.isWebGL2===!1&&(A.isInstancedMesh||z.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;_();const O=z.attributes,H=N.getAttributes(),V=L.defaultAttributeValues;for(const G in H){const Y=H[G];if(Y.location>=0){let W=O[G];if(W===void 0&&(G==="instanceMatrix"&&A.instanceMatrix&&(W=A.instanceMatrix),G==="instanceColor"&&A.instanceColor&&(W=A.instanceColor)),W!==void 0){const $=W.normalized,it=W.itemSize,Mt=e.get(W);if(Mt===void 0)continue;const gt=Mt.buffer,Pt=Mt.type,Rt=Mt.bytesPerElement,dt=n.isWebGL2===!0&&(Pt===s.INT||Pt===s.UNSIGNED_INT||W.gpuType===_h);if(W.isInterleavedBufferAttribute){const Tt=W.data,k=Tt.stride,ft=W.offset;if(Tt.isInstancedInterleavedBuffer){for(let Q=0;Q<Y.locationSize;Q++)y(Y.location+Q,Tt.meshPerAttribute);A.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Tt.meshPerAttribute*Tt.count)}else for(let Q=0;Q<Y.locationSize;Q++)v(Y.location+Q);s.bindBuffer(s.ARRAY_BUFFER,gt);for(let Q=0;Q<Y.locationSize;Q++)w(Y.location+Q,it/Y.locationSize,Pt,$,k*Rt,(ft+it/Y.locationSize*Q)*Rt,dt)}else{if(W.isInstancedBufferAttribute){for(let Tt=0;Tt<Y.locationSize;Tt++)y(Y.location+Tt,W.meshPerAttribute);A.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let Tt=0;Tt<Y.locationSize;Tt++)v(Y.location+Tt);s.bindBuffer(s.ARRAY_BUFFER,gt);for(let Tt=0;Tt<Y.locationSize;Tt++)w(Y.location+Tt,it/Y.locationSize,Pt,$,it*Rt,it/Y.locationSize*Tt*Rt,dt)}}else if(V!==void 0){const $=V[G];if($!==void 0)switch($.length){case 2:s.vertexAttrib2fv(Y.location,$);break;case 3:s.vertexAttrib3fv(Y.location,$);break;case 4:s.vertexAttrib4fv(Y.location,$);break;default:s.vertexAttrib1fv(Y.location,$)}}}}S()}function b(){I();for(const A in a){const L=a[A];for(const N in L){const z=L[N];for(const O in z)g(z[O].object),delete z[O];delete L[N]}delete a[A]}}function E(A){if(a[A.id]===void 0)return;const L=a[A.id];for(const N in L){const z=L[N];for(const O in z)g(z[O].object),delete z[O];delete L[N]}delete a[A.id]}function C(A){for(const L in a){const N=a[L];if(N[A.id]===void 0)continue;const z=N[A.id];for(const O in z)g(z[O].object),delete z[O];delete N[A.id]}}function I(){F(),l=!0,c!==h&&(c=h,d(c.object))}function F(){h.geometry=null,h.program=null,h.wireframe=!1}return{setup:u,reset:I,resetDefaultState:F,dispose:b,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:v,disableUnusedAttributes:S}}function q0(s,t,e,n){const i=n.isWebGL2;let r;function o(l){r=l}function a(l,u){s.drawArrays(r,l,u),e.update(u,r,1)}function h(l,u,f){if(f===0)return;let d,g;if(i)d=s,g="drawArraysInstanced";else if(d=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](r,l,u,f),e.update(u,r,f)}function c(l,u,f){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<f;g++)this.render(l[g],u[g]);else{d.multiDrawArraysWEBGL(r,l,0,u,0,f);let g=0;for(let x=0;x<f;x++)g+=u[x];e.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=h,this.renderMultiDraw=c}function $0(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(w){if(w==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const h=r(a);h!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",h,"instead."),a=h);const c=o||t.has("WEBGL_draw_buffers"),l=e.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),x=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),_=f>0,v=o||t.has("OES_texture_float"),y=_&&v,S=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:l,maxTextures:u,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:M,vertexTextures:_,floatFragmentTextures:v,floatVertexTextures:y,maxSamples:S}}function Y0(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new bi,a=new ie,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){r=!0,l(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=l(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?l(null):c();else{const M=r?0:n,_=M*4;let v=p.clippingState||null;h.value=v,v=l(g,f,_,d);for(let y=0;y!==_;++y)v[y]=e[y];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){h.value!==e&&(h.value=e,h.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function l(u,f,d,g){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=h.value,g!==!0||m===null){const p=d+x*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,v=d;_!==x;++_,v+=4)o.copy(u[_]).applyMatrix4(M,a),o.normal.toArray(m,v),m[v+3]=o.constant}h.value=m,h.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function j0(s){let t=new WeakMap;function e(o,a){return a===Mo?o.mapping=xs:a===_o&&(o.mapping=vs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Mo||a===_o)if(t.has(o)){const h=t.get(o).texture;return e(h,o.mapping)}else{const h=o.image;if(h&&h.height>0){const c=new od(h.height/2);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const h=t.get(a);h!==void 0&&(t.delete(a),h.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Vh extends Bh{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,h=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=l*this.view.offsetY,h=a-l*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const hs=4,uc=[.125,.215,.35,.446,.526,.582],Ri=20,qa=new Vh,fc=new Wt;let $a=null,Ya=0,ja=0;const Ei=(1+Math.sqrt(5))/2,is=1/Ei,dc=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,Ei,is),new U(0,Ei,-is),new U(is,0,Ei),new U(-is,0,Ei),new U(Ei,is,0),new U(-Ei,is,0)];class pc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){$a=this._renderer.getRenderTarget(),Ya=this._renderer.getActiveCubeFace(),ja=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget($a,Ya,ja),t.scissorTest=!1,Ur(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xs||t.mapping===vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),$a=this._renderer.getRenderTarget(),Ya=this._renderer.getActiveCubeFace(),ja=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:on,minFilter:on,generateMipmaps:!1,type:tr,format:Rn,colorSpace:Yn,depthBuffer:!1},i=mc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Z0(r)),this._blurMaterial=K0(r,t,e)}return i}_compileMaterial(t){const e=new xt(this._lodPlanes[0],t);this._renderer.compile(e,qa)}_sceneToCubeUV(t,e,n,i){const a=new ln(90,1,e,n),h=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,u=l.autoClear,f=l.toneMapping;l.getClearColor(fc),l.toneMapping=ui,l.autoClear=!1;const d=new Je({name:"PMREM.Background",side:Qe,depthWrite:!1,depthTest:!1}),g=new xt(new Qt,d);let x=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,x=!0):(d.color.copy(fc),x=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(a.up.set(0,h[p],0),a.lookAt(c[p],0,0)):M===1?(a.up.set(0,0,h[p]),a.lookAt(0,c[p],0)):(a.up.set(0,h[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;Ur(i,M*_,p>2?_:0,_,_),l.setRenderTarget(i),x&&l.render(g,a),l.render(t,a)}g.geometry.dispose(),g.material.dispose(),l.toneMapping=f,l.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===xs||t.mapping===vs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=xc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gc());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new xt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const h=this._cubeSize;Ur(e,0,0,3*h,2*h),n.setRenderTarget(e),n.render(o,qa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=dc[(i-1)%dc.length];this._blur(t,i-1,i,r,o)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const h=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const l=3,u=new xt(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Ri-1),x=r/g,m=isFinite(r)?1+Math.floor(l*x):Ri;m>Ri&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ri}`);const p=[];let M=0;for(let w=0;w<Ri;++w){const T=w/x,b=Math.exp(-T*T/2);p.push(b),w===0?M+=b:w<m&&(M+=2*b)}for(let w=0;w<p.length;w++)p[w]=p[w]/M;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-n;const v=this._sizeLods[i],y=3*v*(i>_-hs?i-_+hs:0),S=4*(this._cubeSize-v);Ur(e,y,S,3*v,2*v),h.setRenderTarget(e),h.render(u,qa)}}function Z0(s){const t=[],e=[],n=[];let i=s;const r=s-hs+1+uc.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let h=1/a;o>s-hs?h=uc[o-s+hs-1]:o===0&&(h=0),n.push(h);const c=1/(a-2),l=-c,u=1+c,f=[l,l,u,l,u,u,l,l,u,u,l,u],d=6,g=6,x=3,m=2,p=1,M=new Float32Array(x*g*d),_=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let S=0;S<d;S++){const w=S%3*2/3-1,T=S>2?0:-1,b=[w,T,0,w+2/3,T,0,w+2/3,T+1,0,w,T,0,w+2/3,T+1,0,w,T+1,0];M.set(b,x*g*S),_.set(f,m*g*S);const E=[S,S,S,S,S,S];v.set(E,p*g*S)}const y=new de;y.setAttribute("position",new Ee(M,x)),y.setAttribute("uv",new Ee(_,m)),y.setAttribute("faceIndex",new Ee(v,p)),t.push(y),i>hs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function mc(s,t,e){const n=new Ui(s,t,e);return n.texture.mapping=ha,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ur(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function K0(s,t,e){const n=new Float32Array(Ri),i=new U(0,1,0);return new Fn({name:"SphericalGaussianBlur",defines:{n:Ri,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function gc(){return new Fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function xc(){return new Fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Yo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function J0(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const h=a.mapping,c=h===Mo||h===_o,l=h===xs||h===vs;if(c||l)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=t.get(a);return e===null&&(e=new pc(s)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),t.set(a,u),u.texture}else{if(t.has(a))return t.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||l&&u&&i(u)){e===null&&(e=new pc(s));const f=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function i(a){let h=0;const c=6;for(let l=0;l<c;l++)a[l]!==void 0&&h++;return h===c}function r(a){const h=a.target;h.removeEventListener("dispose",r);const c=t.get(h);c!==void 0&&(t.delete(h),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Q0(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function tm(s,t,e,n){const i={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const x=f.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)t.remove(x[m])}f.removeEventListener("dispose",o),delete i[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function h(u){const f=u.attributes;for(const g in f)t.update(f[g],s.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const x=d[g];for(let m=0,p=x.length;m<p;m++)t.update(x[m],s.ARRAY_BUFFER)}}function c(u){const f=[],d=u.index,g=u.attributes.position;let x=0;if(d!==null){const M=d.array;x=d.version;for(let _=0,v=M.length;_<v;_+=3){const y=M[_+0],S=M[_+1],w=M[_+2];f.push(y,S,S,w,w,y)}}else if(g!==void 0){const M=g.array;x=g.version;for(let _=0,v=M.length/3-1;_<v;_+=3){const y=_+0,S=_+1,w=_+2;f.push(y,S,S,w,w,y)}}else return;const m=new(Ph(f)?Fh:Nh)(f,1);m.version=x;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function l(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:h,getWireframeAttribute:l}}function em(s,t,e,n){const i=n.isWebGL2;let r;function o(d){r=d}let a,h;function c(d){a=d.type,h=d.bytesPerElement}function l(d,g){s.drawElements(r,g,a,d*h),e.update(g,r,1)}function u(d,g,x){if(x===0)return;let m,p;if(i)m=s,p="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,d*h,x),e.update(g,r,x)}function f(d,g,x){if(x===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<x;p++)this.render(d[p]/h,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,d,0,x);let p=0;for(let M=0;M<x;M++)p+=g[M];e.update(p,r,1)}}this.setMode=o,this.setIndex=c,this.render=l,this.renderInstances=u,this.renderMultiDraw=f}function nm(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function im(s,t){return s[0]-t[0]}function sm(s,t){return Math.abs(t[1])-Math.abs(s[1])}function rm(s,t,e){const n={},i=new Float32Array(8),r=new WeakMap,o=new fe,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function h(c,l,u){const f=c.morphTargetInfluences;if(t.isWebGL2===!0){const g=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,x=g!==void 0?g.length:0;let m=r.get(l);if(m===void 0||m.count!==x){let L=function(){F.dispose(),r.delete(l),l.removeEventListener("dispose",L)};var d=L;m!==void 0&&m.texture.dispose();const _=l.morphAttributes.position!==void 0,v=l.morphAttributes.normal!==void 0,y=l.morphAttributes.color!==void 0,S=l.morphAttributes.position||[],w=l.morphAttributes.normal||[],T=l.morphAttributes.color||[];let b=0;_===!0&&(b=1),v===!0&&(b=2),y===!0&&(b=3);let E=l.attributes.position.count*b,C=1;E>t.maxTextureSize&&(C=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const I=new Float32Array(E*C*4*x),F=new Ih(I,E,C,x);F.type=li,F.needsUpdate=!0;const A=b*4;for(let N=0;N<x;N++){const z=S[N],O=w[N],H=T[N],V=E*C*4*N;for(let G=0;G<z.count;G++){const Y=G*A;_===!0&&(o.fromBufferAttribute(z,G),I[V+Y+0]=o.x,I[V+Y+1]=o.y,I[V+Y+2]=o.z,I[V+Y+3]=0),v===!0&&(o.fromBufferAttribute(O,G),I[V+Y+4]=o.x,I[V+Y+5]=o.y,I[V+Y+6]=o.z,I[V+Y+7]=0),y===!0&&(o.fromBufferAttribute(H,G),I[V+Y+8]=o.x,I[V+Y+9]=o.y,I[V+Y+10]=o.z,I[V+Y+11]=H.itemSize===4?o.w:1)}}m={count:x,texture:F,size:new ut(E,C)},r.set(l,m),l.addEventListener("dispose",L)}let p=0;for(let _=0;_<f.length;_++)p+=f[_];const M=l.morphTargetsRelative?1:1-p;u.getUniforms().setValue(s,"morphTargetBaseInfluence",M),u.getUniforms().setValue(s,"morphTargetInfluences",f),u.getUniforms().setValue(s,"morphTargetsTexture",m.texture,e),u.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}else{const g=f===void 0?0:f.length;let x=n[l.id];if(x===void 0||x.length!==g){x=[];for(let v=0;v<g;v++)x[v]=[v,0];n[l.id]=x}for(let v=0;v<g;v++){const y=x[v];y[0]=v,y[1]=f[v]}x.sort(sm);for(let v=0;v<8;v++)v<g&&x[v][1]?(a[v][0]=x[v][0],a[v][1]=x[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(im);const m=l.morphAttributes.position,p=l.morphAttributes.normal;let M=0;for(let v=0;v<8;v++){const y=a[v],S=y[0],w=y[1];S!==Number.MAX_SAFE_INTEGER&&w?(m&&l.getAttribute("morphTarget"+v)!==m[S]&&l.setAttribute("morphTarget"+v,m[S]),p&&l.getAttribute("morphNormal"+v)!==p[S]&&l.setAttribute("morphNormal"+v,p[S]),i[v]=w,M+=w):(m&&l.hasAttribute("morphTarget"+v)===!0&&l.deleteAttribute("morphTarget"+v),p&&l.hasAttribute("morphNormal"+v)===!0&&l.deleteAttribute("morphNormal"+v),i[v]=0)}const _=l.morphTargetsRelative?1:1-M;u.getUniforms().setValue(s,"morphTargetBaseInfluence",_),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:h}}function am(s,t,e,n){let i=new WeakMap;function r(h){const c=n.render.frame,l=h.geometry,u=t.get(h,l);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),h.isInstancedMesh&&(h.hasEventListener("dispose",a)===!1&&h.addEventListener("dispose",a),i.get(h)!==c&&(e.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&e.update(h.instanceColor,s.ARRAY_BUFFER),i.set(h,c))),h.isSkinnedMesh){const f=h.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function o(){i=new WeakMap}function a(h){const c=h.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Wh extends an{constructor(t,e,n,i,r,o,a,h,c,l){if(l=l!==void 0?l:Li,l!==Li&&l!==_s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&l===Li&&(n=oi),n===void 0&&l===_s&&(n=Pi),super(null,i,r,o,a,h,l,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:rn,this.minFilter=h!==void 0?h:rn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Xh=new an,qh=new Wh(1,1);qh.compareFunction=Ch;const $h=new Ih,Yh=new Xf,jh=new Gh,vc=[],Mc=[],_c=new Float32Array(16),yc=new Float32Array(9),Sc=new Float32Array(4);function Ts(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=vc[i];if(r===void 0&&(r=new Float32Array(i),vc[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function He(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ve(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function fa(s,t){let e=Mc[t];e===void 0&&(e=new Int32Array(t),Mc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function om(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function lm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2fv(this.addr,t),Ve(e,t)}}function cm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;s.uniform3fv(this.addr,t),Ve(e,t)}}function hm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4fv(this.addr,t),Ve(e,t)}}function um(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;Sc.set(n),s.uniformMatrix2fv(this.addr,!1,Sc),Ve(e,n)}}function fm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;yc.set(n),s.uniformMatrix3fv(this.addr,!1,yc),Ve(e,n)}}function dm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;_c.set(n),s.uniformMatrix4fv(this.addr,!1,_c),Ve(e,n)}}function pm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function mm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2iv(this.addr,t),Ve(e,t)}}function gm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3iv(this.addr,t),Ve(e,t)}}function xm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4iv(this.addr,t),Ve(e,t)}}function vm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Mm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2uiv(this.addr,t),Ve(e,t)}}function _m(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3uiv(this.addr,t),Ve(e,t)}}function ym(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4uiv(this.addr,t),Ve(e,t)}}function Sm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?qh:Xh;e.setTexture2D(t||r,i)}function wm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Yh,i)}function bm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||jh,i)}function Em(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||$h,i)}function Tm(s){switch(s){case 5126:return om;case 35664:return lm;case 35665:return cm;case 35666:return hm;case 35674:return um;case 35675:return fm;case 35676:return dm;case 5124:case 35670:return pm;case 35667:case 35671:return mm;case 35668:case 35672:return gm;case 35669:case 35673:return xm;case 5125:return vm;case 36294:return Mm;case 36295:return _m;case 36296:return ym;case 35678:case 36198:case 36298:case 36306:case 35682:return Sm;case 35679:case 36299:case 36307:return wm;case 35680:case 36300:case 36308:case 36293:return bm;case 36289:case 36303:case 36311:case 36292:return Em}}function Am(s,t){s.uniform1fv(this.addr,t)}function Rm(s,t){const e=Ts(t,this.size,2);s.uniform2fv(this.addr,e)}function Cm(s,t){const e=Ts(t,this.size,3);s.uniform3fv(this.addr,e)}function Pm(s,t){const e=Ts(t,this.size,4);s.uniform4fv(this.addr,e)}function Lm(s,t){const e=Ts(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Dm(s,t){const e=Ts(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Im(s,t){const e=Ts(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Um(s,t){s.uniform1iv(this.addr,t)}function zm(s,t){s.uniform2iv(this.addr,t)}function Nm(s,t){s.uniform3iv(this.addr,t)}function Fm(s,t){s.uniform4iv(this.addr,t)}function Om(s,t){s.uniform1uiv(this.addr,t)}function km(s,t){s.uniform2uiv(this.addr,t)}function Bm(s,t){s.uniform3uiv(this.addr,t)}function Gm(s,t){s.uniform4uiv(this.addr,t)}function Hm(s,t,e){const n=this.cache,i=t.length,r=fa(e,i);He(n,r)||(s.uniform1iv(this.addr,r),Ve(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Xh,r[o])}function Vm(s,t,e){const n=this.cache,i=t.length,r=fa(e,i);He(n,r)||(s.uniform1iv(this.addr,r),Ve(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Yh,r[o])}function Wm(s,t,e){const n=this.cache,i=t.length,r=fa(e,i);He(n,r)||(s.uniform1iv(this.addr,r),Ve(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||jh,r[o])}function Xm(s,t,e){const n=this.cache,i=t.length,r=fa(e,i);He(n,r)||(s.uniform1iv(this.addr,r),Ve(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||$h,r[o])}function qm(s){switch(s){case 5126:return Am;case 35664:return Rm;case 35665:return Cm;case 35666:return Pm;case 35674:return Lm;case 35675:return Dm;case 35676:return Im;case 5124:case 35670:return Um;case 35667:case 35671:return zm;case 35668:case 35672:return Nm;case 35669:case 35673:return Fm;case 5125:return Om;case 36294:return km;case 36295:return Bm;case 36296:return Gm;case 35678:case 36198:case 36298:case 36306:case 35682:return Hm;case 35679:case 36299:case 36307:return Vm;case 35680:case 36300:case 36308:case 36293:return Wm;case 36289:case 36303:case 36311:case 36292:return Xm}}class $m{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Tm(e.type)}}class Ym{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=qm(e.type)}}class jm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const Za=/(\w+)(\])?(\[|\.)?/g;function wc(s,t){s.seq.push(t),s.map[t.id]=t}function Zm(s,t,e){const n=s.name,i=n.length;for(Za.lastIndex=0;;){const r=Za.exec(n),o=Za.lastIndex;let a=r[1];const h=r[2]==="]",c=r[3];if(h&&(a=a|0),c===void 0||c==="["&&o+2===i){wc(e,c===void 0?new $m(a,s,t):new Ym(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new jm(a),wc(e,u)),e=u}}}class Jr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Zm(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],h=n[a.id];h.needsUpdate!==!1&&a.setValue(t,h.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function bc(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Km=37297;let Jm=0;function Qm(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function tg(s){const t=ge.getPrimaries(ge.workingColorSpace),e=ge.getPrimaries(s);let n;switch(t===e?n="":t===sa&&e===ia?n="LinearDisplayP3ToLinearSRGB":t===ia&&e===sa&&(n="LinearSRGBToLinearDisplayP3"),s){case Yn:case ua:return[n,"LinearTransferOETF"];case Me:case Wo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Ec(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Qm(s.getShaderSource(t),o)}else return i}function eg(s,t){const e=tg(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function ng(s,t){let e;switch(t){case ef:e="Linear";break;case nf:e="Reinhard";break;case sf:e="OptimizedCineon";break;case vh:e="ACESFilmic";break;case af:e="AgX";break;case rf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function ig(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(us).join(`
`)}function sg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(us).join(`
`)}function rg(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ag(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function us(s){return s!==""}function Tc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ac(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const og=/^[ \t]*#include +<([\w\d./]+)>/gm;function Eo(s){return s.replace(og,cg)}const lg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function cg(s,t){let e=ne[t];if(e===void 0){const n=lg.get(t);if(n!==void 0)e=ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Eo(e)}const hg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rc(s){return s.replace(hg,ug)}function ug(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Cc(s){let t="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function fg(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===mh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===gh?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===qn&&(t="SHADOWMAP_TYPE_VSM"),t}function dg(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case xs:case vs:t="ENVMAP_TYPE_CUBE";break;case ha:t="ENVMAP_TYPE_CUBE_UV";break}return t}function pg(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case vs:t="ENVMAP_MODE_REFRACTION";break}return t}function mg(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case xh:t="ENVMAP_BLENDING_MULTIPLY";break;case Qu:t="ENVMAP_BLENDING_MIX";break;case tf:t="ENVMAP_BLENDING_ADD";break}return t}function gg(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function xg(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const h=fg(e),c=dg(e),l=pg(e),u=mg(e),f=gg(e),d=e.isWebGL2?"":ig(e),g=sg(e),x=rg(r),m=i.createProgram();let p,M,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(us).join(`
`),p.length>0&&(p+=`
`),M=[d,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(us).join(`
`),M.length>0&&(M+=`
`)):(p=[Cc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(us).join(`
`),M=[d,Cc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ui?"#define TONE_MAPPING":"",e.toneMapping!==ui?ne.tonemapping_pars_fragment:"",e.toneMapping!==ui?ng("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,eg("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(us).join(`
`)),o=Eo(o),o=Tc(o,e),o=Ac(o,e),a=Eo(a),a=Tc(a,e),a=Ac(a,e),o=Rc(o),a=Rc(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,M=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===$l?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$l?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const v=_+p+o,y=_+M+a,S=bc(i,i.VERTEX_SHADER,v),w=bc(i,i.FRAGMENT_SHADER,y);i.attachShader(m,S),i.attachShader(m,w),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function T(I){if(s.debug.checkShaderErrors){const F=i.getProgramInfoLog(m).trim(),A=i.getShaderInfoLog(S).trim(),L=i.getShaderInfoLog(w).trim();let N=!0,z=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(N=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,S,w);else{const O=Ec(i,S,"vertex"),H=Ec(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+F+`
`+O+`
`+H)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(A===""||L==="")&&(z=!1);z&&(I.diagnostics={runnable:N,programLog:F,vertexShader:{log:A,prefix:p},fragmentShader:{log:L,prefix:M}})}i.deleteShader(S),i.deleteShader(w),b=new Jr(i,m),E=ag(i,m)}let b;this.getUniforms=function(){return b===void 0&&T(this),b};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=i.getProgramParameter(m,Km)),C},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Jm++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=S,this.fragmentShader=w,this}let vg=0;class Mg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new _g(t),e.set(t,n)),n}}class _g{constructor(t){this.id=vg++,this.code=t,this.usedTimes=0}}function yg(s,t,e,n,i,r,o){const a=new Uh,h=new Mg,c=[],l=i.isWebGL2,u=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return b===0?"uv":`uv${b}`}function m(b,E,C,I,F){const A=I.fog,L=F.geometry,N=b.isMeshStandardMaterial?I.environment:null,z=(b.isMeshStandardMaterial?e:t).get(b.envMap||N),O=z&&z.mapping===ha?z.image.height:null,H=g[b.type];b.precision!==null&&(d=i.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const V=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,G=V!==void 0?V.length:0;let Y=0;L.morphAttributes.position!==void 0&&(Y=1),L.morphAttributes.normal!==void 0&&(Y=2),L.morphAttributes.color!==void 0&&(Y=3);let W,$,it,Mt;if(H){const Te=Cn[H];W=Te.vertexShader,$=Te.fragmentShader}else W=b.vertexShader,$=b.fragmentShader,h.update(b),it=h.getVertexShaderID(b),Mt=h.getFragmentShaderID(b);const gt=s.getRenderTarget(),Pt=F.isInstancedMesh===!0,Rt=F.isBatchedMesh===!0,dt=!!b.map,Tt=!!b.matcap,k=!!z,ft=!!b.aoMap,Q=!!b.lightMap,at=!!b.bumpMap,st=!!b.normalMap,At=!!b.displacementMap,yt=!!b.emissiveMap,P=!!b.metalnessMap,R=!!b.roughnessMap,X=b.anisotropy>0,ct=b.clearcoat>0,et=b.iridescence>0,tt=b.sheen>0,ot=b.transmission>0,ht=X&&!!b.anisotropyMap,vt=ct&&!!b.clearcoatMap,Ct=ct&&!!b.clearcoatNormalMap,Ut=ct&&!!b.clearcoatRoughnessMap,lt=et&&!!b.iridescenceMap,$t=et&&!!b.iridescenceThicknessMap,kt=tt&&!!b.sheenColorMap,pt=tt&&!!b.sheenRoughnessMap,Lt=!!b.specularMap,nt=!!b.specularColorMap,Et=!!b.specularIntensityMap,Ot=ot&&!!b.transmissionMap,pe=ot&&!!b.thicknessMap,Vt=!!b.gradientMap,_t=!!b.alphaMap,B=b.alphaTest>0,mt=!!b.alphaHash,St=!!b.extensions,Gt=!!L.attributes.uv1,Bt=!!L.attributes.uv2,ae=!!L.attributes.uv3;let oe=ui;return b.toneMapped&&(gt===null||gt.isXRRenderTarget===!0)&&(oe=s.toneMapping),{isWebGL2:l,shaderID:H,shaderType:b.type,shaderName:b.name,vertexShader:W,fragmentShader:$,defines:b.defines,customVertexShaderID:it,customFragmentShaderID:Mt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Rt,instancing:Pt,instancingColor:Pt&&F.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:gt===null?s.outputColorSpace:gt.isXRRenderTarget===!0?gt.texture.colorSpace:Yn,map:dt,matcap:Tt,envMap:k,envMapMode:k&&z.mapping,envMapCubeUVHeight:O,aoMap:ft,lightMap:Q,bumpMap:at,normalMap:st,displacementMap:f&&At,emissiveMap:yt,normalMapObjectSpace:st&&b.normalMapType===vf,normalMapTangentSpace:st&&b.normalMapType===Rh,metalnessMap:P,roughnessMap:R,anisotropy:X,anisotropyMap:ht,clearcoat:ct,clearcoatMap:vt,clearcoatNormalMap:Ct,clearcoatRoughnessMap:Ut,iridescence:et,iridescenceMap:lt,iridescenceThicknessMap:$t,sheen:tt,sheenColorMap:kt,sheenRoughnessMap:pt,specularMap:Lt,specularColorMap:nt,specularIntensityMap:Et,transmission:ot,transmissionMap:Ot,thicknessMap:pe,gradientMap:Vt,opaque:b.transparent===!1&&b.blending===ps,alphaMap:_t,alphaTest:B,alphaHash:mt,combine:b.combine,mapUv:dt&&x(b.map.channel),aoMapUv:ft&&x(b.aoMap.channel),lightMapUv:Q&&x(b.lightMap.channel),bumpMapUv:at&&x(b.bumpMap.channel),normalMapUv:st&&x(b.normalMap.channel),displacementMapUv:At&&x(b.displacementMap.channel),emissiveMapUv:yt&&x(b.emissiveMap.channel),metalnessMapUv:P&&x(b.metalnessMap.channel),roughnessMapUv:R&&x(b.roughnessMap.channel),anisotropyMapUv:ht&&x(b.anisotropyMap.channel),clearcoatMapUv:vt&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:Ct&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ut&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:lt&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:$t&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:pt&&x(b.sheenRoughnessMap.channel),specularMapUv:Lt&&x(b.specularMap.channel),specularColorMapUv:nt&&x(b.specularColorMap.channel),specularIntensityMapUv:Et&&x(b.specularIntensityMap.channel),transmissionMapUv:Ot&&x(b.transmissionMap.channel),thicknessMapUv:pe&&x(b.thicknessMap.channel),alphaMapUv:_t&&x(b.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(st||X),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,vertexUv1s:Gt,vertexUv2s:Bt,vertexUv3s:ae,pointsUvs:F.isPoints===!0&&!!L.attributes.uv&&(dt||_t),fog:!!A,useFog:b.fog===!0,fogExp2:A&&A.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:F.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:G,morphTextureStride:Y,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:oe,useLegacyLights:s._useLegacyLights,decodeVideoTexture:dt&&b.map.isVideoTexture===!0&&ge.getTransfer(b.map.colorSpace)===Se,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===be,flipSided:b.side===Qe,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:St&&b.extensions.derivatives===!0,extensionFragDepth:St&&b.extensions.fragDepth===!0,extensionDrawBuffers:St&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:St&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:St&&b.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:l||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:l||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:l||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function p(b){const E=[];if(b.shaderID?E.push(b.shaderID):(E.push(b.customVertexShaderID),E.push(b.customFragmentShaderID)),b.defines!==void 0)for(const C in b.defines)E.push(C),E.push(b.defines[C]);return b.isRawShaderMaterial===!1&&(M(E,b),_(E,b),E.push(s.outputColorSpace)),E.push(b.customProgramCacheKey),E.join()}function M(b,E){b.push(E.precision),b.push(E.outputColorSpace),b.push(E.envMapMode),b.push(E.envMapCubeUVHeight),b.push(E.mapUv),b.push(E.alphaMapUv),b.push(E.lightMapUv),b.push(E.aoMapUv),b.push(E.bumpMapUv),b.push(E.normalMapUv),b.push(E.displacementMapUv),b.push(E.emissiveMapUv),b.push(E.metalnessMapUv),b.push(E.roughnessMapUv),b.push(E.anisotropyMapUv),b.push(E.clearcoatMapUv),b.push(E.clearcoatNormalMapUv),b.push(E.clearcoatRoughnessMapUv),b.push(E.iridescenceMapUv),b.push(E.iridescenceThicknessMapUv),b.push(E.sheenColorMapUv),b.push(E.sheenRoughnessMapUv),b.push(E.specularMapUv),b.push(E.specularColorMapUv),b.push(E.specularIntensityMapUv),b.push(E.transmissionMapUv),b.push(E.thicknessMapUv),b.push(E.combine),b.push(E.fogExp2),b.push(E.sizeAttenuation),b.push(E.morphTargetsCount),b.push(E.morphAttributeCount),b.push(E.numDirLights),b.push(E.numPointLights),b.push(E.numSpotLights),b.push(E.numSpotLightMaps),b.push(E.numHemiLights),b.push(E.numRectAreaLights),b.push(E.numDirLightShadows),b.push(E.numPointLightShadows),b.push(E.numSpotLightShadows),b.push(E.numSpotLightShadowsWithMaps),b.push(E.numLightProbes),b.push(E.shadowMapType),b.push(E.toneMapping),b.push(E.numClippingPlanes),b.push(E.numClipIntersection),b.push(E.depthPacking)}function _(b,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),b.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),b.push(a.mask)}function v(b){const E=g[b.type];let C;if(E){const I=Cn[E];C=kh.clone(I.uniforms)}else C=b.uniforms;return C}function y(b,E){let C;for(let I=0,F=c.length;I<F;I++){const A=c[I];if(A.cacheKey===E){C=A,++C.usedTimes;break}}return C===void 0&&(C=new xg(s,E,b,r),c.push(C)),C}function S(b){if(--b.usedTimes===0){const E=c.indexOf(b);c[E]=c[c.length-1],c.pop(),b.destroy()}}function w(b){h.remove(b)}function T(){h.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:y,releaseProgram:S,releaseShaderCache:w,programs:c,dispose:T}}function Sg(){let s=new WeakMap;function t(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function e(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function wg(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Pc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Lc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u,f,d,g,x,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),t++,p}function a(u,f,d,g,x,m){const p=o(u,f,d,g,x,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):e.push(p)}function h(u,f,d,g,x,m){const p=o(u,f,d,g,x,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||wg),n.length>1&&n.sort(f||Pc),i.length>1&&i.sort(f||Pc)}function l(){for(let u=t,f=s.length;u<f;u++){const d=s[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:h,finish:l,sort:c}}function bg(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new Lc,s.set(n,[o])):i>=r.length?(o=new Lc,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function Eg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new Wt};break;case"SpotLight":e={position:new U,direction:new U,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new U,halfWidth:new U,halfHeight:new U};break}return s[t.id]=e,e}}}function Tg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Ag=0;function Rg(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Cg(s,t){const e=new Eg,n=Tg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);const r=new U,o=new se,a=new se;function h(l,u){let f=0,d=0,g=0;for(let I=0;I<9;I++)i.probe[I].set(0,0,0);let x=0,m=0,p=0,M=0,_=0,v=0,y=0,S=0,w=0,T=0,b=0;l.sort(Rg);const E=u===!0?Math.PI:1;for(let I=0,F=l.length;I<F;I++){const A=l[I],L=A.color,N=A.intensity,z=A.distance,O=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)f+=L.r*N*E,d+=L.g*N*E,g+=L.b*N*E;else if(A.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(A.sh.coefficients[H],N);b++}else if(A.isDirectionalLight){const H=e.get(A);if(H.color.copy(A.color).multiplyScalar(A.intensity*E),A.castShadow){const V=A.shadow,G=n.get(A);G.shadowBias=V.bias,G.shadowNormalBias=V.normalBias,G.shadowRadius=V.radius,G.shadowMapSize=V.mapSize,i.directionalShadow[x]=G,i.directionalShadowMap[x]=O,i.directionalShadowMatrix[x]=A.shadow.matrix,v++}i.directional[x]=H,x++}else if(A.isSpotLight){const H=e.get(A);H.position.setFromMatrixPosition(A.matrixWorld),H.color.copy(L).multiplyScalar(N*E),H.distance=z,H.coneCos=Math.cos(A.angle),H.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),H.decay=A.decay,i.spot[p]=H;const V=A.shadow;if(A.map&&(i.spotLightMap[w]=A.map,w++,V.updateMatrices(A),A.castShadow&&T++),i.spotLightMatrix[p]=V.matrix,A.castShadow){const G=n.get(A);G.shadowBias=V.bias,G.shadowNormalBias=V.normalBias,G.shadowRadius=V.radius,G.shadowMapSize=V.mapSize,i.spotShadow[p]=G,i.spotShadowMap[p]=O,S++}p++}else if(A.isRectAreaLight){const H=e.get(A);H.color.copy(L).multiplyScalar(N),H.halfWidth.set(A.width*.5,0,0),H.halfHeight.set(0,A.height*.5,0),i.rectArea[M]=H,M++}else if(A.isPointLight){const H=e.get(A);if(H.color.copy(A.color).multiplyScalar(A.intensity*E),H.distance=A.distance,H.decay=A.decay,A.castShadow){const V=A.shadow,G=n.get(A);G.shadowBias=V.bias,G.shadowNormalBias=V.normalBias,G.shadowRadius=V.radius,G.shadowMapSize=V.mapSize,G.shadowCameraNear=V.camera.near,G.shadowCameraFar=V.camera.far,i.pointShadow[m]=G,i.pointShadowMap[m]=O,i.pointShadowMatrix[m]=A.shadow.matrix,y++}i.point[m]=H,m++}else if(A.isHemisphereLight){const H=e.get(A);H.skyColor.copy(A.color).multiplyScalar(N*E),H.groundColor.copy(A.groundColor).multiplyScalar(N*E),i.hemi[_]=H,_++}}M>0&&(t.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=bt.LTC_FLOAT_1,i.rectAreaLTC2=bt.LTC_FLOAT_2):(i.rectAreaLTC1=bt.LTC_HALF_1,i.rectAreaLTC2=bt.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=bt.LTC_FLOAT_1,i.rectAreaLTC2=bt.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=bt.LTC_HALF_1,i.rectAreaLTC2=bt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=g;const C=i.hash;(C.directionalLength!==x||C.pointLength!==m||C.spotLength!==p||C.rectAreaLength!==M||C.hemiLength!==_||C.numDirectionalShadows!==v||C.numPointShadows!==y||C.numSpotShadows!==S||C.numSpotMaps!==w||C.numLightProbes!==b)&&(i.directional.length=x,i.spot.length=p,i.rectArea.length=M,i.point.length=m,i.hemi.length=_,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=S+w-T,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=b,C.directionalLength=x,C.pointLength=m,C.spotLength=p,C.rectAreaLength=M,C.hemiLength=_,C.numDirectionalShadows=v,C.numPointShadows=y,C.numSpotShadows=S,C.numSpotMaps=w,C.numLightProbes=b,i.version=Ag++)}function c(l,u){let f=0,d=0,g=0,x=0,m=0;const p=u.matrixWorldInverse;for(let M=0,_=l.length;M<_;M++){const v=l[M];if(v.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),f++}else if(v.isSpotLight){const y=i.spot[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),g++}else if(v.isRectAreaLight){const y=i.rectArea[x];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),a.identity(),o.copy(v.matrixWorld),o.premultiply(p),a.extractRotation(o),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),x++}else if(v.isPointLight){const y=i.point[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),d++}else if(v.isHemisphereLight){const y=i.hemi[m];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(p),m++}}}return{setup:h,setupView:c,state:i}}function Dc(s,t){const e=new Cg(s,t),n=[],i=[];function r(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function h(u){e.setup(n,u)}function c(u){e.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:h,setupLightsView:c,pushLight:o,pushShadow:a}}function Pg(s,t){let e=new WeakMap;function n(r,o=0){const a=e.get(r);let h;return a===void 0?(h=new Dc(s,t),e.set(r,[h])):o>=a.length?(h=new Dc(s,t),a.push(h)):h=a[o],h}function i(){e=new WeakMap}return{get:n,dispose:i}}class Lg extends mi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Dg extends mi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Ig=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ug=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function zg(s,t,e){let n=new $o;const i=new ut,r=new ut,o=new fe,a=new Lg({depthPacking:xf}),h=new Dg,c={},l=e.maxTextureSize,u={[di]:Qe,[Qe]:di,[be]:be},f=new Fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:Ig,fragmentShader:Ug}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new de;g.setAttribute("position",new Ee(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new xt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mh;let p=this.type;this.render=function(S,w,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;const b=s.getRenderTarget(),E=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),I=s.state;I.setBlending(hi),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const F=p!==qn&&this.type===qn,A=p===qn&&this.type!==qn;for(let L=0,N=S.length;L<N;L++){const z=S[L],O=z.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;i.copy(O.mapSize);const H=O.getFrameExtents();if(i.multiply(H),r.copy(O.mapSize),(i.x>l||i.y>l)&&(i.x>l&&(r.x=Math.floor(l/H.x),i.x=r.x*H.x,O.mapSize.x=r.x),i.y>l&&(r.y=Math.floor(l/H.y),i.y=r.y*H.y,O.mapSize.y=r.y)),O.map===null||F===!0||A===!0){const G=this.type!==qn?{minFilter:rn,magFilter:rn}:{};O.map!==null&&O.map.dispose(),O.map=new Ui(i.x,i.y,G),O.map.texture.name=z.name+".shadowMap",O.camera.updateProjectionMatrix()}s.setRenderTarget(O.map),s.clear();const V=O.getViewportCount();for(let G=0;G<V;G++){const Y=O.getViewport(G);o.set(r.x*Y.x,r.y*Y.y,r.x*Y.z,r.y*Y.w),I.viewport(o),O.updateMatrices(z,G),n=O.getFrustum(),v(w,T,O.camera,z,this.type)}O.isPointLightShadow!==!0&&this.type===qn&&M(O,T),O.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(b,E,C)};function M(S,w){const T=t.update(x);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Ui(i.x,i.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(w,null,T,f,x,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(w,null,T,d,x,null)}function _(S,w,T,b){let E=null;const C=T.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)E=C;else if(E=T.isPointLight===!0?h:a,s.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const I=E.uuid,F=w.uuid;let A=c[I];A===void 0&&(A={},c[I]=A);let L=A[F];L===void 0&&(L=E.clone(),A[F]=L,w.addEventListener("dispose",y)),E=L}if(E.visible=w.visible,E.wireframe=w.wireframe,b===qn?E.side=w.shadowSide!==null?w.shadowSide:w.side:E.side=w.shadowSide!==null?w.shadowSide:u[w.side],E.alphaMap=w.alphaMap,E.alphaTest=w.alphaTest,E.map=w.map,E.clipShadows=w.clipShadows,E.clippingPlanes=w.clippingPlanes,E.clipIntersection=w.clipIntersection,E.displacementMap=w.displacementMap,E.displacementScale=w.displacementScale,E.displacementBias=w.displacementBias,E.wireframeLinewidth=w.wireframeLinewidth,E.linewidth=w.linewidth,T.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const I=s.properties.get(E);I.light=T}return E}function v(S,w,T,b,E){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&E===qn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,S.matrixWorld);const F=t.update(S),A=S.material;if(Array.isArray(A)){const L=F.groups;for(let N=0,z=L.length;N<z;N++){const O=L[N],H=A[O.materialIndex];if(H&&H.visible){const V=_(S,H,b,E);S.onBeforeShadow(s,S,w,T,F,V,O),s.renderBufferDirect(T,null,F,V,S,O),S.onAfterShadow(s,S,w,T,F,V,O)}}}else if(A.visible){const L=_(S,A,b,E);S.onBeforeShadow(s,S,w,T,F,L,null),s.renderBufferDirect(T,null,F,L,S,null),S.onAfterShadow(s,S,w,T,F,L,null)}}const I=S.children;for(let F=0,A=I.length;F<A;F++)v(I[F],w,T,b,E)}function y(S){S.target.removeEventListener("dispose",y);for(const T in c){const b=c[T],E=S.target.uuid;E in b&&(b[E].dispose(),delete b[E])}}}function Ng(s,t,e){const n=e.isWebGL2;function i(){let B=!1;const mt=new fe;let St=null;const Gt=new fe(0,0,0,0);return{setMask:function(Bt){St!==Bt&&!B&&(s.colorMask(Bt,Bt,Bt,Bt),St=Bt)},setLocked:function(Bt){B=Bt},setClear:function(Bt,ae,oe,xe,Te){Te===!0&&(Bt*=xe,ae*=xe,oe*=xe),mt.set(Bt,ae,oe,xe),Gt.equals(mt)===!1&&(s.clearColor(Bt,ae,oe,xe),Gt.copy(mt))},reset:function(){B=!1,St=null,Gt.set(-1,0,0,0)}}}function r(){let B=!1,mt=null,St=null,Gt=null;return{setTest:function(Bt){Bt?Rt(s.DEPTH_TEST):dt(s.DEPTH_TEST)},setMask:function(Bt){mt!==Bt&&!B&&(s.depthMask(Bt),mt=Bt)},setFunc:function(Bt){if(St!==Bt){switch(Bt){case qu:s.depthFunc(s.NEVER);break;case $u:s.depthFunc(s.ALWAYS);break;case Yu:s.depthFunc(s.LESS);break;case ea:s.depthFunc(s.LEQUAL);break;case ju:s.depthFunc(s.EQUAL);break;case Zu:s.depthFunc(s.GEQUAL);break;case Ku:s.depthFunc(s.GREATER);break;case Ju:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}St=Bt}},setLocked:function(Bt){B=Bt},setClear:function(Bt){Gt!==Bt&&(s.clearDepth(Bt),Gt=Bt)},reset:function(){B=!1,mt=null,St=null,Gt=null}}}function o(){let B=!1,mt=null,St=null,Gt=null,Bt=null,ae=null,oe=null,xe=null,Te=null;return{setTest:function(he){B||(he?Rt(s.STENCIL_TEST):dt(s.STENCIL_TEST))},setMask:function(he){mt!==he&&!B&&(s.stencilMask(he),mt=he)},setFunc:function(he,j,Nt){(St!==he||Gt!==j||Bt!==Nt)&&(s.stencilFunc(he,j,Nt),St=he,Gt=j,Bt=Nt)},setOp:function(he,j,Nt){(ae!==he||oe!==j||xe!==Nt)&&(s.stencilOp(he,j,Nt),ae=he,oe=j,xe=Nt)},setLocked:function(he){B=he},setClear:function(he){Te!==he&&(s.clearStencil(he),Te=he)},reset:function(){B=!1,mt=null,St=null,Gt=null,Bt=null,ae=null,oe=null,xe=null,Te=null}}}const a=new i,h=new r,c=new o,l=new WeakMap,u=new WeakMap;let f={},d={},g=new WeakMap,x=[],m=null,p=!1,M=null,_=null,v=null,y=null,S=null,w=null,T=null,b=new Wt(0,0,0),E=0,C=!1,I=null,F=null,A=null,L=null,N=null;const z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,H=0;const V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(V)[1]),O=H>=1):V.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),O=H>=2);let G=null,Y={};const W=s.getParameter(s.SCISSOR_BOX),$=s.getParameter(s.VIEWPORT),it=new fe().fromArray(W),Mt=new fe().fromArray($);function gt(B,mt,St,Gt){const Bt=new Uint8Array(4),ae=s.createTexture();s.bindTexture(B,ae),s.texParameteri(B,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(B,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let oe=0;oe<St;oe++)n&&(B===s.TEXTURE_3D||B===s.TEXTURE_2D_ARRAY)?s.texImage3D(mt,0,s.RGBA,1,1,Gt,0,s.RGBA,s.UNSIGNED_BYTE,Bt):s.texImage2D(mt+oe,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Bt);return ae}const Pt={};Pt[s.TEXTURE_2D]=gt(s.TEXTURE_2D,s.TEXTURE_2D,1),Pt[s.TEXTURE_CUBE_MAP]=gt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Pt[s.TEXTURE_2D_ARRAY]=gt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Pt[s.TEXTURE_3D]=gt(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),h.setClear(1),c.setClear(0),Rt(s.DEPTH_TEST),h.setFunc(ea),yt(!1),P(ml),Rt(s.CULL_FACE),st(hi);function Rt(B){f[B]!==!0&&(s.enable(B),f[B]=!0)}function dt(B){f[B]!==!1&&(s.disable(B),f[B]=!1)}function Tt(B,mt){return d[B]!==mt?(s.bindFramebuffer(B,mt),d[B]=mt,n&&(B===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=mt),B===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=mt)),!0):!1}function k(B,mt){let St=x,Gt=!1;if(B)if(St=g.get(mt),St===void 0&&(St=[],g.set(mt,St)),B.isWebGLMultipleRenderTargets){const Bt=B.texture;if(St.length!==Bt.length||St[0]!==s.COLOR_ATTACHMENT0){for(let ae=0,oe=Bt.length;ae<oe;ae++)St[ae]=s.COLOR_ATTACHMENT0+ae;St.length=Bt.length,Gt=!0}}else St[0]!==s.COLOR_ATTACHMENT0&&(St[0]=s.COLOR_ATTACHMENT0,Gt=!0);else St[0]!==s.BACK&&(St[0]=s.BACK,Gt=!0);Gt&&(e.isWebGL2?s.drawBuffers(St):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(St))}function ft(B){return m!==B?(s.useProgram(B),m=B,!0):!1}const Q={[Ai]:s.FUNC_ADD,[Lu]:s.FUNC_SUBTRACT,[Du]:s.FUNC_REVERSE_SUBTRACT};if(n)Q[vl]=s.MIN,Q[Ml]=s.MAX;else{const B=t.get("EXT_blend_minmax");B!==null&&(Q[vl]=B.MIN_EXT,Q[Ml]=B.MAX_EXT)}const at={[Iu]:s.ZERO,[Uu]:s.ONE,[zu]:s.SRC_COLOR,[xo]:s.SRC_ALPHA,[Gu]:s.SRC_ALPHA_SATURATE,[ku]:s.DST_COLOR,[Fu]:s.DST_ALPHA,[Nu]:s.ONE_MINUS_SRC_COLOR,[vo]:s.ONE_MINUS_SRC_ALPHA,[Bu]:s.ONE_MINUS_DST_COLOR,[Ou]:s.ONE_MINUS_DST_ALPHA,[Hu]:s.CONSTANT_COLOR,[Vu]:s.ONE_MINUS_CONSTANT_COLOR,[Wu]:s.CONSTANT_ALPHA,[Xu]:s.ONE_MINUS_CONSTANT_ALPHA};function st(B,mt,St,Gt,Bt,ae,oe,xe,Te,he){if(B===hi){p===!0&&(dt(s.BLEND),p=!1);return}if(p===!1&&(Rt(s.BLEND),p=!0),B!==Pu){if(B!==M||he!==C){if((_!==Ai||S!==Ai)&&(s.blendEquation(s.FUNC_ADD),_=Ai,S=Ai),he)switch(B){case ps:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ii:s.blendFunc(s.ONE,s.ONE);break;case gl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case xl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case ps:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ii:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case gl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case xl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}v=null,y=null,w=null,T=null,b.set(0,0,0),E=0,M=B,C=he}return}Bt=Bt||mt,ae=ae||St,oe=oe||Gt,(mt!==_||Bt!==S)&&(s.blendEquationSeparate(Q[mt],Q[Bt]),_=mt,S=Bt),(St!==v||Gt!==y||ae!==w||oe!==T)&&(s.blendFuncSeparate(at[St],at[Gt],at[ae],at[oe]),v=St,y=Gt,w=ae,T=oe),(xe.equals(b)===!1||Te!==E)&&(s.blendColor(xe.r,xe.g,xe.b,Te),b.copy(xe),E=Te),M=B,C=!1}function At(B,mt){B.side===be?dt(s.CULL_FACE):Rt(s.CULL_FACE);let St=B.side===Qe;mt&&(St=!St),yt(St),B.blending===ps&&B.transparent===!1?st(hi):st(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),h.setFunc(B.depthFunc),h.setTest(B.depthTest),h.setMask(B.depthWrite),a.setMask(B.colorWrite);const Gt=B.stencilWrite;c.setTest(Gt),Gt&&(c.setMask(B.stencilWriteMask),c.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),c.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),X(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?Rt(s.SAMPLE_ALPHA_TO_COVERAGE):dt(s.SAMPLE_ALPHA_TO_COVERAGE)}function yt(B){I!==B&&(B?s.frontFace(s.CW):s.frontFace(s.CCW),I=B)}function P(B){B!==Ru?(Rt(s.CULL_FACE),B!==F&&(B===ml?s.cullFace(s.BACK):B===Cu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):dt(s.CULL_FACE),F=B}function R(B){B!==A&&(O&&s.lineWidth(B),A=B)}function X(B,mt,St){B?(Rt(s.POLYGON_OFFSET_FILL),(L!==mt||N!==St)&&(s.polygonOffset(mt,St),L=mt,N=St)):dt(s.POLYGON_OFFSET_FILL)}function ct(B){B?Rt(s.SCISSOR_TEST):dt(s.SCISSOR_TEST)}function et(B){B===void 0&&(B=s.TEXTURE0+z-1),G!==B&&(s.activeTexture(B),G=B)}function tt(B,mt,St){St===void 0&&(G===null?St=s.TEXTURE0+z-1:St=G);let Gt=Y[St];Gt===void 0&&(Gt={type:void 0,texture:void 0},Y[St]=Gt),(Gt.type!==B||Gt.texture!==mt)&&(G!==St&&(s.activeTexture(St),G=St),s.bindTexture(B,mt||Pt[B]),Gt.type=B,Gt.texture=mt)}function ot(){const B=Y[G];B!==void 0&&B.type!==void 0&&(s.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function ht(){try{s.compressedTexImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function vt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ct(){try{s.texSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ut(){try{s.texSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function lt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function $t(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function kt(){try{s.texStorage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function pt(){try{s.texStorage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Lt(){try{s.texImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function nt(){try{s.texImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Et(B){it.equals(B)===!1&&(s.scissor(B.x,B.y,B.z,B.w),it.copy(B))}function Ot(B){Mt.equals(B)===!1&&(s.viewport(B.x,B.y,B.z,B.w),Mt.copy(B))}function pe(B,mt){let St=u.get(mt);St===void 0&&(St=new WeakMap,u.set(mt,St));let Gt=St.get(B);Gt===void 0&&(Gt=s.getUniformBlockIndex(mt,B.name),St.set(B,Gt))}function Vt(B,mt){const Gt=u.get(mt).get(B);l.get(mt)!==Gt&&(s.uniformBlockBinding(mt,Gt,B.__bindingPointIndex),l.set(mt,Gt))}function _t(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},G=null,Y={},d={},g=new WeakMap,x=[],m=null,p=!1,M=null,_=null,v=null,y=null,S=null,w=null,T=null,b=new Wt(0,0,0),E=0,C=!1,I=null,F=null,A=null,L=null,N=null,it.set(0,0,s.canvas.width,s.canvas.height),Mt.set(0,0,s.canvas.width,s.canvas.height),a.reset(),h.reset(),c.reset()}return{buffers:{color:a,depth:h,stencil:c},enable:Rt,disable:dt,bindFramebuffer:Tt,drawBuffers:k,useProgram:ft,setBlending:st,setMaterial:At,setFlipSided:yt,setCullFace:P,setLineWidth:R,setPolygonOffset:X,setScissorTest:ct,activeTexture:et,bindTexture:tt,unbindTexture:ot,compressedTexImage2D:ht,compressedTexImage3D:vt,texImage2D:Lt,texImage3D:nt,updateUBOMapping:pe,uniformBlockBinding:Vt,texStorage2D:kt,texStorage3D:pt,texSubImage2D:Ct,texSubImage3D:Ut,compressedTexSubImage2D:lt,compressedTexSubImage3D:$t,scissor:Et,viewport:Ot,reset:_t}}function Fg(s,t,e,n,i,r,o){const a=i.isWebGL2,h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,R){return d?new OffscreenCanvas(P,R):er("canvas")}function x(P,R,X,ct){let et=1;if((P.width>ct||P.height>ct)&&(et=ct/Math.max(P.width,P.height)),et<1||R===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap){const tt=R?aa:Math.floor,ot=tt(et*P.width),ht=tt(et*P.height);u===void 0&&(u=g(ot,ht));const vt=X?g(ot,ht):u;return vt.width=ot,vt.height=ht,vt.getContext("2d").drawImage(P,0,0,ot,ht),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+ot+"x"+ht+")."),vt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function m(P){return bo(P.width)&&bo(P.height)}function p(P){return a?!1:P.wrapS!==An||P.wrapT!==An||P.minFilter!==rn&&P.minFilter!==on}function M(P,R){return P.generateMipmaps&&R&&P.minFilter!==rn&&P.minFilter!==on}function _(P){s.generateMipmap(P)}function v(P,R,X,ct,et=!1){if(a===!1)return R;if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let tt=R;if(R===s.RED&&(X===s.FLOAT&&(tt=s.R32F),X===s.HALF_FLOAT&&(tt=s.R16F),X===s.UNSIGNED_BYTE&&(tt=s.R8)),R===s.RED_INTEGER&&(X===s.UNSIGNED_BYTE&&(tt=s.R8UI),X===s.UNSIGNED_SHORT&&(tt=s.R16UI),X===s.UNSIGNED_INT&&(tt=s.R32UI),X===s.BYTE&&(tt=s.R8I),X===s.SHORT&&(tt=s.R16I),X===s.INT&&(tt=s.R32I)),R===s.RG&&(X===s.FLOAT&&(tt=s.RG32F),X===s.HALF_FLOAT&&(tt=s.RG16F),X===s.UNSIGNED_BYTE&&(tt=s.RG8)),R===s.RGBA){const ot=et?na:ge.getTransfer(ct);X===s.FLOAT&&(tt=s.RGBA32F),X===s.HALF_FLOAT&&(tt=s.RGBA16F),X===s.UNSIGNED_BYTE&&(tt=ot===Se?s.SRGB8_ALPHA8:s.RGBA8),X===s.UNSIGNED_SHORT_4_4_4_4&&(tt=s.RGBA4),X===s.UNSIGNED_SHORT_5_5_5_1&&(tt=s.RGB5_A1)}return(tt===s.R16F||tt===s.R32F||tt===s.RG16F||tt===s.RG32F||tt===s.RGBA16F||tt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function y(P,R,X){return M(P,X)===!0||P.isFramebufferTexture&&P.minFilter!==rn&&P.minFilter!==on?Math.log2(Math.max(R.width,R.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?R.mipmaps.length:1}function S(P){return P===rn||P===_l||P===wa?s.NEAREST:s.LINEAR}function w(P){const R=P.target;R.removeEventListener("dispose",w),b(R),R.isVideoTexture&&l.delete(R)}function T(P){const R=P.target;R.removeEventListener("dispose",T),C(R)}function b(P){const R=n.get(P);if(R.__webglInit===void 0)return;const X=P.source,ct=f.get(X);if(ct){const et=ct[R.__cacheKey];et.usedTimes--,et.usedTimes===0&&E(P),Object.keys(ct).length===0&&f.delete(X)}n.remove(P)}function E(P){const R=n.get(P);s.deleteTexture(R.__webglTexture);const X=P.source,ct=f.get(X);delete ct[R.__cacheKey],o.memory.textures--}function C(P){const R=P.texture,X=n.get(P),ct=n.get(R);if(ct.__webglTexture!==void 0&&(s.deleteTexture(ct.__webglTexture),o.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let et=0;et<6;et++){if(Array.isArray(X.__webglFramebuffer[et]))for(let tt=0;tt<X.__webglFramebuffer[et].length;tt++)s.deleteFramebuffer(X.__webglFramebuffer[et][tt]);else s.deleteFramebuffer(X.__webglFramebuffer[et]);X.__webglDepthbuffer&&s.deleteRenderbuffer(X.__webglDepthbuffer[et])}else{if(Array.isArray(X.__webglFramebuffer))for(let et=0;et<X.__webglFramebuffer.length;et++)s.deleteFramebuffer(X.__webglFramebuffer[et]);else s.deleteFramebuffer(X.__webglFramebuffer);if(X.__webglDepthbuffer&&s.deleteRenderbuffer(X.__webglDepthbuffer),X.__webglMultisampledFramebuffer&&s.deleteFramebuffer(X.__webglMultisampledFramebuffer),X.__webglColorRenderbuffer)for(let et=0;et<X.__webglColorRenderbuffer.length;et++)X.__webglColorRenderbuffer[et]&&s.deleteRenderbuffer(X.__webglColorRenderbuffer[et]);X.__webglDepthRenderbuffer&&s.deleteRenderbuffer(X.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let et=0,tt=R.length;et<tt;et++){const ot=n.get(R[et]);ot.__webglTexture&&(s.deleteTexture(ot.__webglTexture),o.memory.textures--),n.remove(R[et])}n.remove(R),n.remove(P)}let I=0;function F(){I=0}function A(){const P=I;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),I+=1,P}function L(P){const R=[];return R.push(P.wrapS),R.push(P.wrapT),R.push(P.wrapR||0),R.push(P.magFilter),R.push(P.minFilter),R.push(P.anisotropy),R.push(P.internalFormat),R.push(P.format),R.push(P.type),R.push(P.generateMipmaps),R.push(P.premultiplyAlpha),R.push(P.flipY),R.push(P.unpackAlignment),R.push(P.colorSpace),R.join()}function N(P,R){const X=n.get(P);if(P.isVideoTexture&&At(P),P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version){const ct=P.image;if(ct===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{it(X,P,R);return}}e.bindTexture(s.TEXTURE_2D,X.__webglTexture,s.TEXTURE0+R)}function z(P,R){const X=n.get(P);if(P.version>0&&X.__version!==P.version){it(X,P,R);return}e.bindTexture(s.TEXTURE_2D_ARRAY,X.__webglTexture,s.TEXTURE0+R)}function O(P,R){const X=n.get(P);if(P.version>0&&X.__version!==P.version){it(X,P,R);return}e.bindTexture(s.TEXTURE_3D,X.__webglTexture,s.TEXTURE0+R)}function H(P,R){const X=n.get(P);if(P.version>0&&X.__version!==P.version){Mt(X,P,R);return}e.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture,s.TEXTURE0+R)}const V={[Ms]:s.REPEAT,[An]:s.CLAMP_TO_EDGE,[yo]:s.MIRRORED_REPEAT},G={[rn]:s.NEAREST,[_l]:s.NEAREST_MIPMAP_NEAREST,[wa]:s.NEAREST_MIPMAP_LINEAR,[on]:s.LINEAR,[of]:s.LINEAR_MIPMAP_NEAREST,[Qs]:s.LINEAR_MIPMAP_LINEAR},Y={[Mf]:s.NEVER,[Ef]:s.ALWAYS,[_f]:s.LESS,[Ch]:s.LEQUAL,[yf]:s.EQUAL,[bf]:s.GEQUAL,[Sf]:s.GREATER,[wf]:s.NOTEQUAL};function W(P,R,X){if(X?(s.texParameteri(P,s.TEXTURE_WRAP_S,V[R.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,V[R.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,V[R.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,G[R.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,G[R.minFilter])):(s.texParameteri(P,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(P,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(R.wrapS!==An||R.wrapT!==An)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(P,s.TEXTURE_MAG_FILTER,S(R.magFilter)),s.texParameteri(P,s.TEXTURE_MIN_FILTER,S(R.minFilter)),R.minFilter!==rn&&R.minFilter!==on&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),R.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,Y[R.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const ct=t.get("EXT_texture_filter_anisotropic");if(R.magFilter===rn||R.minFilter!==wa&&R.minFilter!==Qs||R.type===li&&t.has("OES_texture_float_linear")===!1||a===!1&&R.type===tr&&t.has("OES_texture_half_float_linear")===!1)return;(R.anisotropy>1||n.get(R).__currentAnisotropy)&&(s.texParameterf(P,ct.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,i.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy)}}function $(P,R){let X=!1;P.__webglInit===void 0&&(P.__webglInit=!0,R.addEventListener("dispose",w));const ct=R.source;let et=f.get(ct);et===void 0&&(et={},f.set(ct,et));const tt=L(R);if(tt!==P.__cacheKey){et[tt]===void 0&&(et[tt]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,X=!0),et[tt].usedTimes++;const ot=et[P.__cacheKey];ot!==void 0&&(et[P.__cacheKey].usedTimes--,ot.usedTimes===0&&E(R)),P.__cacheKey=tt,P.__webglTexture=et[tt].texture}return X}function it(P,R,X){let ct=s.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(ct=s.TEXTURE_2D_ARRAY),R.isData3DTexture&&(ct=s.TEXTURE_3D);const et=$(P,R),tt=R.source;e.bindTexture(ct,P.__webglTexture,s.TEXTURE0+X);const ot=n.get(tt);if(tt.version!==ot.__version||et===!0){e.activeTexture(s.TEXTURE0+X);const ht=ge.getPrimaries(ge.workingColorSpace),vt=R.colorSpace===Mn?null:ge.getPrimaries(R.colorSpace),Ct=R.colorSpace===Mn||ht===vt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,R.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,R.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);const Ut=p(R)&&m(R.image)===!1;let lt=x(R.image,Ut,!1,i.maxTextureSize);lt=yt(R,lt);const $t=m(lt)||a,kt=r.convert(R.format,R.colorSpace);let pt=r.convert(R.type),Lt=v(R.internalFormat,kt,pt,R.colorSpace,R.isVideoTexture);W(ct,R,$t);let nt;const Et=R.mipmaps,Ot=a&&R.isVideoTexture!==!0&&Lt!==Th,pe=ot.__version===void 0||et===!0,Vt=y(R,lt,$t);if(R.isDepthTexture)Lt=s.DEPTH_COMPONENT,a?R.type===li?Lt=s.DEPTH_COMPONENT32F:R.type===oi?Lt=s.DEPTH_COMPONENT24:R.type===Pi?Lt=s.DEPTH24_STENCIL8:Lt=s.DEPTH_COMPONENT16:R.type===li&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),R.format===Li&&Lt===s.DEPTH_COMPONENT&&R.type!==Vo&&R.type!==oi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),R.type=oi,pt=r.convert(R.type)),R.format===_s&&Lt===s.DEPTH_COMPONENT&&(Lt=s.DEPTH_STENCIL,R.type!==Pi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),R.type=Pi,pt=r.convert(R.type))),pe&&(Ot?e.texStorage2D(s.TEXTURE_2D,1,Lt,lt.width,lt.height):e.texImage2D(s.TEXTURE_2D,0,Lt,lt.width,lt.height,0,kt,pt,null));else if(R.isDataTexture)if(Et.length>0&&$t){Ot&&pe&&e.texStorage2D(s.TEXTURE_2D,Vt,Lt,Et[0].width,Et[0].height);for(let _t=0,B=Et.length;_t<B;_t++)nt=Et[_t],Ot?e.texSubImage2D(s.TEXTURE_2D,_t,0,0,nt.width,nt.height,kt,pt,nt.data):e.texImage2D(s.TEXTURE_2D,_t,Lt,nt.width,nt.height,0,kt,pt,nt.data);R.generateMipmaps=!1}else Ot?(pe&&e.texStorage2D(s.TEXTURE_2D,Vt,Lt,lt.width,lt.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,lt.width,lt.height,kt,pt,lt.data)):e.texImage2D(s.TEXTURE_2D,0,Lt,lt.width,lt.height,0,kt,pt,lt.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){Ot&&pe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Vt,Lt,Et[0].width,Et[0].height,lt.depth);for(let _t=0,B=Et.length;_t<B;_t++)nt=Et[_t],R.format!==Rn?kt!==null?Ot?e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,_t,0,0,0,nt.width,nt.height,lt.depth,kt,nt.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,_t,Lt,nt.width,nt.height,lt.depth,0,nt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?e.texSubImage3D(s.TEXTURE_2D_ARRAY,_t,0,0,0,nt.width,nt.height,lt.depth,kt,pt,nt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,_t,Lt,nt.width,nt.height,lt.depth,0,kt,pt,nt.data)}else{Ot&&pe&&e.texStorage2D(s.TEXTURE_2D,Vt,Lt,Et[0].width,Et[0].height);for(let _t=0,B=Et.length;_t<B;_t++)nt=Et[_t],R.format!==Rn?kt!==null?Ot?e.compressedTexSubImage2D(s.TEXTURE_2D,_t,0,0,nt.width,nt.height,kt,nt.data):e.compressedTexImage2D(s.TEXTURE_2D,_t,Lt,nt.width,nt.height,0,nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?e.texSubImage2D(s.TEXTURE_2D,_t,0,0,nt.width,nt.height,kt,pt,nt.data):e.texImage2D(s.TEXTURE_2D,_t,Lt,nt.width,nt.height,0,kt,pt,nt.data)}else if(R.isDataArrayTexture)Ot?(pe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Vt,Lt,lt.width,lt.height,lt.depth),e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,kt,pt,lt.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,Lt,lt.width,lt.height,lt.depth,0,kt,pt,lt.data);else if(R.isData3DTexture)Ot?(pe&&e.texStorage3D(s.TEXTURE_3D,Vt,Lt,lt.width,lt.height,lt.depth),e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,kt,pt,lt.data)):e.texImage3D(s.TEXTURE_3D,0,Lt,lt.width,lt.height,lt.depth,0,kt,pt,lt.data);else if(R.isFramebufferTexture){if(pe)if(Ot)e.texStorage2D(s.TEXTURE_2D,Vt,Lt,lt.width,lt.height);else{let _t=lt.width,B=lt.height;for(let mt=0;mt<Vt;mt++)e.texImage2D(s.TEXTURE_2D,mt,Lt,_t,B,0,kt,pt,null),_t>>=1,B>>=1}}else if(Et.length>0&&$t){Ot&&pe&&e.texStorage2D(s.TEXTURE_2D,Vt,Lt,Et[0].width,Et[0].height);for(let _t=0,B=Et.length;_t<B;_t++)nt=Et[_t],Ot?e.texSubImage2D(s.TEXTURE_2D,_t,0,0,kt,pt,nt):e.texImage2D(s.TEXTURE_2D,_t,Lt,kt,pt,nt);R.generateMipmaps=!1}else Ot?(pe&&e.texStorage2D(s.TEXTURE_2D,Vt,Lt,lt.width,lt.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,kt,pt,lt)):e.texImage2D(s.TEXTURE_2D,0,Lt,kt,pt,lt);M(R,$t)&&_(ct),ot.__version=tt.version,R.onUpdate&&R.onUpdate(R)}P.__version=R.version}function Mt(P,R,X){if(R.image.length!==6)return;const ct=$(P,R),et=R.source;e.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+X);const tt=n.get(et);if(et.version!==tt.__version||ct===!0){e.activeTexture(s.TEXTURE0+X);const ot=ge.getPrimaries(ge.workingColorSpace),ht=R.colorSpace===Mn?null:ge.getPrimaries(R.colorSpace),vt=R.colorSpace===Mn||ot===ht?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,R.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,R.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const Ct=R.isCompressedTexture||R.image[0].isCompressedTexture,Ut=R.image[0]&&R.image[0].isDataTexture,lt=[];for(let _t=0;_t<6;_t++)!Ct&&!Ut?lt[_t]=x(R.image[_t],!1,!0,i.maxCubemapSize):lt[_t]=Ut?R.image[_t].image:R.image[_t],lt[_t]=yt(R,lt[_t]);const $t=lt[0],kt=m($t)||a,pt=r.convert(R.format,R.colorSpace),Lt=r.convert(R.type),nt=v(R.internalFormat,pt,Lt,R.colorSpace),Et=a&&R.isVideoTexture!==!0,Ot=tt.__version===void 0||ct===!0;let pe=y(R,$t,kt);W(s.TEXTURE_CUBE_MAP,R,kt);let Vt;if(Ct){Et&&Ot&&e.texStorage2D(s.TEXTURE_CUBE_MAP,pe,nt,$t.width,$t.height);for(let _t=0;_t<6;_t++){Vt=lt[_t].mipmaps;for(let B=0;B<Vt.length;B++){const mt=Vt[B];R.format!==Rn?pt!==null?Et?e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,B,0,0,mt.width,mt.height,pt,mt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,B,nt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Et?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,B,0,0,mt.width,mt.height,pt,Lt,mt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,B,nt,mt.width,mt.height,0,pt,Lt,mt.data)}}}else{Vt=R.mipmaps,Et&&Ot&&(Vt.length>0&&pe++,e.texStorage2D(s.TEXTURE_CUBE_MAP,pe,nt,lt[0].width,lt[0].height));for(let _t=0;_t<6;_t++)if(Ut){Et?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,lt[_t].width,lt[_t].height,pt,Lt,lt[_t].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,nt,lt[_t].width,lt[_t].height,0,pt,Lt,lt[_t].data);for(let B=0;B<Vt.length;B++){const St=Vt[B].image[_t].image;Et?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,B+1,0,0,St.width,St.height,pt,Lt,St.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,B+1,nt,St.width,St.height,0,pt,Lt,St.data)}}else{Et?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,pt,Lt,lt[_t]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,nt,pt,Lt,lt[_t]);for(let B=0;B<Vt.length;B++){const mt=Vt[B];Et?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,B+1,0,0,pt,Lt,mt.image[_t]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,B+1,nt,pt,Lt,mt.image[_t])}}}M(R,kt)&&_(s.TEXTURE_CUBE_MAP),tt.__version=et.version,R.onUpdate&&R.onUpdate(R)}P.__version=R.version}function gt(P,R,X,ct,et,tt){const ot=r.convert(X.format,X.colorSpace),ht=r.convert(X.type),vt=v(X.internalFormat,ot,ht,X.colorSpace);if(!n.get(R).__hasExternalTextures){const Ut=Math.max(1,R.width>>tt),lt=Math.max(1,R.height>>tt);et===s.TEXTURE_3D||et===s.TEXTURE_2D_ARRAY?e.texImage3D(et,tt,vt,Ut,lt,R.depth,0,ot,ht,null):e.texImage2D(et,tt,vt,Ut,lt,0,ot,ht,null)}e.bindFramebuffer(s.FRAMEBUFFER,P),st(R)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ct,et,n.get(X).__webglTexture,0,at(R)):(et===s.TEXTURE_2D||et>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ct,et,n.get(X).__webglTexture,tt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Pt(P,R,X){if(s.bindRenderbuffer(s.RENDERBUFFER,P),R.depthBuffer&&!R.stencilBuffer){let ct=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(X||st(R)){const et=R.depthTexture;et&&et.isDepthTexture&&(et.type===li?ct=s.DEPTH_COMPONENT32F:et.type===oi&&(ct=s.DEPTH_COMPONENT24));const tt=at(R);st(R)?h.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,tt,ct,R.width,R.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,tt,ct,R.width,R.height)}else s.renderbufferStorage(s.RENDERBUFFER,ct,R.width,R.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,P)}else if(R.depthBuffer&&R.stencilBuffer){const ct=at(R);X&&st(R)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ct,s.DEPTH24_STENCIL8,R.width,R.height):st(R)?h.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ct,s.DEPTH24_STENCIL8,R.width,R.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,P)}else{const ct=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let et=0;et<ct.length;et++){const tt=ct[et],ot=r.convert(tt.format,tt.colorSpace),ht=r.convert(tt.type),vt=v(tt.internalFormat,ot,ht,tt.colorSpace),Ct=at(R);X&&st(R)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ct,vt,R.width,R.height):st(R)?h.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ct,vt,R.width,R.height):s.renderbufferStorage(s.RENDERBUFFER,vt,R.width,R.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Rt(P,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,P),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(R.depthTexture).__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),N(R.depthTexture,0);const ct=n.get(R.depthTexture).__webglTexture,et=at(R);if(R.depthTexture.format===Li)st(R)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ct,0,et):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ct,0);else if(R.depthTexture.format===_s)st(R)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ct,0,et):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function dt(P){const R=n.get(P),X=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!R.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");Rt(R.__webglFramebuffer,P)}else if(X){R.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)e.bindFramebuffer(s.FRAMEBUFFER,R.__webglFramebuffer[ct]),R.__webglDepthbuffer[ct]=s.createRenderbuffer(),Pt(R.__webglDepthbuffer[ct],P,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer=s.createRenderbuffer(),Pt(R.__webglDepthbuffer,P,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Tt(P,R,X){const ct=n.get(P);R!==void 0&&gt(ct.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),X!==void 0&&dt(P)}function k(P){const R=P.texture,X=n.get(P),ct=n.get(R);P.addEventListener("dispose",T),P.isWebGLMultipleRenderTargets!==!0&&(ct.__webglTexture===void 0&&(ct.__webglTexture=s.createTexture()),ct.__version=R.version,o.memory.textures++);const et=P.isWebGLCubeRenderTarget===!0,tt=P.isWebGLMultipleRenderTargets===!0,ot=m(P)||a;if(et){X.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(a&&R.mipmaps&&R.mipmaps.length>0){X.__webglFramebuffer[ht]=[];for(let vt=0;vt<R.mipmaps.length;vt++)X.__webglFramebuffer[ht][vt]=s.createFramebuffer()}else X.__webglFramebuffer[ht]=s.createFramebuffer()}else{if(a&&R.mipmaps&&R.mipmaps.length>0){X.__webglFramebuffer=[];for(let ht=0;ht<R.mipmaps.length;ht++)X.__webglFramebuffer[ht]=s.createFramebuffer()}else X.__webglFramebuffer=s.createFramebuffer();if(tt)if(i.drawBuffers){const ht=P.texture;for(let vt=0,Ct=ht.length;vt<Ct;vt++){const Ut=n.get(ht[vt]);Ut.__webglTexture===void 0&&(Ut.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&P.samples>0&&st(P)===!1){const ht=tt?R:[R];X.__webglMultisampledFramebuffer=s.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let vt=0;vt<ht.length;vt++){const Ct=ht[vt];X.__webglColorRenderbuffer[vt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,X.__webglColorRenderbuffer[vt]);const Ut=r.convert(Ct.format,Ct.colorSpace),lt=r.convert(Ct.type),$t=v(Ct.internalFormat,Ut,lt,Ct.colorSpace,P.isXRRenderTarget===!0),kt=at(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,kt,$t,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,X.__webglColorRenderbuffer[vt])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(X.__webglDepthRenderbuffer=s.createRenderbuffer(),Pt(X.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(et){e.bindTexture(s.TEXTURE_CUBE_MAP,ct.__webglTexture),W(s.TEXTURE_CUBE_MAP,R,ot);for(let ht=0;ht<6;ht++)if(a&&R.mipmaps&&R.mipmaps.length>0)for(let vt=0;vt<R.mipmaps.length;vt++)gt(X.__webglFramebuffer[ht][vt],P,R,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,vt);else gt(X.__webglFramebuffer[ht],P,R,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);M(R,ot)&&_(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(tt){const ht=P.texture;for(let vt=0,Ct=ht.length;vt<Ct;vt++){const Ut=ht[vt],lt=n.get(Ut);e.bindTexture(s.TEXTURE_2D,lt.__webglTexture),W(s.TEXTURE_2D,Ut,ot),gt(X.__webglFramebuffer,P,Ut,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,0),M(Ut,ot)&&_(s.TEXTURE_2D)}e.unbindTexture()}else{let ht=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(a?ht=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(ht,ct.__webglTexture),W(ht,R,ot),a&&R.mipmaps&&R.mipmaps.length>0)for(let vt=0;vt<R.mipmaps.length;vt++)gt(X.__webglFramebuffer[vt],P,R,s.COLOR_ATTACHMENT0,ht,vt);else gt(X.__webglFramebuffer,P,R,s.COLOR_ATTACHMENT0,ht,0);M(R,ot)&&_(ht),e.unbindTexture()}P.depthBuffer&&dt(P)}function ft(P){const R=m(P)||a,X=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let ct=0,et=X.length;ct<et;ct++){const tt=X[ct];if(M(tt,R)){const ot=P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,ht=n.get(tt).__webglTexture;e.bindTexture(ot,ht),_(ot),e.unbindTexture()}}}function Q(P){if(a&&P.samples>0&&st(P)===!1){const R=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],X=P.width,ct=P.height;let et=s.COLOR_BUFFER_BIT;const tt=[],ot=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=n.get(P),vt=P.isWebGLMultipleRenderTargets===!0;if(vt)for(let Ct=0;Ct<R.length;Ct++)e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let Ct=0;Ct<R.length;Ct++){tt.push(s.COLOR_ATTACHMENT0+Ct),P.depthBuffer&&tt.push(ot);const Ut=ht.__ignoreDepthValues!==void 0?ht.__ignoreDepthValues:!1;if(Ut===!1&&(P.depthBuffer&&(et|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&(et|=s.STENCIL_BUFFER_BIT)),vt&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ht.__webglColorRenderbuffer[Ct]),Ut===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[ot]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[ot])),vt){const lt=n.get(R[Ct]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,lt,0)}s.blitFramebuffer(0,0,X,ct,0,0,X,ct,et,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,tt)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),vt)for(let Ct=0;Ct<R.length;Ct++){e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.RENDERBUFFER,ht.__webglColorRenderbuffer[Ct]);const Ut=n.get(R[Ct]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.TEXTURE_2D,Ut,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}}function at(P){return Math.min(i.maxSamples,P.samples)}function st(P){const R=n.get(P);return a&&P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function At(P){const R=o.render.frame;l.get(P)!==R&&(l.set(P,R),P.update())}function yt(P,R){const X=P.colorSpace,ct=P.format,et=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===wo||X!==Yn&&X!==Mn&&(ge.getTransfer(X)===Se?a===!1?t.has("EXT_sRGB")===!0&&ct===Rn?(P.format=wo,P.minFilter=on,P.generateMipmaps=!1):R=Lh.sRGBToLinear(R):(ct!==Rn||et!==fi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),R}this.allocateTextureUnit=A,this.resetTextureUnits=F,this.setTexture2D=N,this.setTexture2DArray=z,this.setTexture3D=O,this.setTextureCube=H,this.rebindTextures=Tt,this.setupRenderTarget=k,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=dt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=st}function Og(s,t,e){const n=e.isWebGL2;function i(r,o=Mn){let a;const h=ge.getTransfer(o);if(r===fi)return s.UNSIGNED_BYTE;if(r===yh)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Sh)return s.UNSIGNED_SHORT_5_5_5_1;if(r===lf)return s.BYTE;if(r===cf)return s.SHORT;if(r===Vo)return s.UNSIGNED_SHORT;if(r===_h)return s.INT;if(r===oi)return s.UNSIGNED_INT;if(r===li)return s.FLOAT;if(r===tr)return n?s.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===hf)return s.ALPHA;if(r===Rn)return s.RGBA;if(r===uf)return s.LUMINANCE;if(r===ff)return s.LUMINANCE_ALPHA;if(r===Li)return s.DEPTH_COMPONENT;if(r===_s)return s.DEPTH_STENCIL;if(r===wo)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===df)return s.RED;if(r===wh)return s.RED_INTEGER;if(r===pf)return s.RG;if(r===bh)return s.RG_INTEGER;if(r===Eh)return s.RGBA_INTEGER;if(r===ba||r===Ea||r===Ta||r===Aa)if(h===Se)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===ba)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ea)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ta)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Aa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===ba)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ea)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ta)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Aa)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===yl||r===Sl||r===wl||r===bl)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===yl)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Sl)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===wl)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===bl)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Th)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===El||r===Tl)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===El)return h===Se?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Tl)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Al||r===Rl||r===Cl||r===Pl||r===Ll||r===Dl||r===Il||r===Ul||r===zl||r===Nl||r===Fl||r===Ol||r===kl||r===Bl)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Al)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Rl)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Cl)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Pl)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ll)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Dl)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Il)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Ul)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===zl)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Nl)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Fl)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ol)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===kl)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Bl)return h===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ra||r===Gl||r===Hl)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===Ra)return h===Se?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Gl)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Hl)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===mf||r===Vl||r===Wl||r===Xl)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===Ra)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Vl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Wl)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Xl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Pi?n?s.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class kg extends ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class zt extends Le{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Bg={type:"move"};class Ka{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,h=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const l=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=l.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else h!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Bg)))}return a!==null&&(a.visible=i!==null),h!==null&&(h.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new zt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Gg extends bs{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",h=1,c=null,l=null,u=null,f=null,d=null,g=null;const x=e.getContextAttributes();let m=null,p=null;const M=[],_=[],v=new ut;let y=null;const S=new ln;S.layers.enable(1),S.viewport=new fe;const w=new ln;w.layers.enable(2),w.viewport=new fe;const T=[S,w],b=new kg;b.layers.enable(1),b.layers.enable(2);let E=null,C=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let $=M[W];return $===void 0&&($=new Ka,M[W]=$),$.getTargetRaySpace()},this.getControllerGrip=function(W){let $=M[W];return $===void 0&&($=new Ka,M[W]=$),$.getGripSpace()},this.getHand=function(W){let $=M[W];return $===void 0&&($=new Ka,M[W]=$),$.getHandSpace()};function I(W){const $=_.indexOf(W.inputSource);if($===-1)return;const it=M[$];it!==void 0&&(it.update(W.inputSource,W.frame,c||o),it.dispatchEvent({type:W.type,data:W.inputSource}))}function F(){i.removeEventListener("select",I),i.removeEventListener("selectstart",I),i.removeEventListener("selectend",I),i.removeEventListener("squeeze",I),i.removeEventListener("squeezestart",I),i.removeEventListener("squeezeend",I),i.removeEventListener("end",F),i.removeEventListener("inputsourceschange",A);for(let W=0;W<M.length;W++){const $=_[W];$!==null&&(_[W]=null,M[W].disconnect($))}E=null,C=null,t.setRenderTarget(m),d=null,f=null,u=null,i=null,p=null,Y.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(v.width,v.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",I),i.addEventListener("selectstart",I),i.addEventListener("selectend",I),i.addEventListener("squeeze",I),i.addEventListener("squeezestart",I),i.addEventListener("squeezeend",I),i.addEventListener("end",F),i.addEventListener("inputsourceschange",A),x.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(v),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const $={antialias:i.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,$),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new Ui(d.framebufferWidth,d.framebufferHeight,{format:Rn,type:fi,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil})}else{let $=null,it=null,Mt=null;x.depth&&(Mt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,$=x.stencil?_s:Li,it=x.stencil?Pi:oi);const gt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:r};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(gt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),p=new Ui(f.textureWidth,f.textureHeight,{format:Rn,type:fi,depthTexture:new Wh(f.textureWidth,f.textureHeight,it,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0});const Pt=t.properties.get(p);Pt.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(h),c=null,o=await i.requestReferenceSpace(a),Y.setContext(i),Y.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function A(W){for(let $=0;$<W.removed.length;$++){const it=W.removed[$],Mt=_.indexOf(it);Mt>=0&&(_[Mt]=null,M[Mt].disconnect(it))}for(let $=0;$<W.added.length;$++){const it=W.added[$];let Mt=_.indexOf(it);if(Mt===-1){for(let Pt=0;Pt<M.length;Pt++)if(Pt>=_.length){_.push(it),Mt=Pt;break}else if(_[Pt]===null){_[Pt]=it,Mt=Pt;break}if(Mt===-1)break}const gt=M[Mt];gt&&gt.connect(it)}}const L=new U,N=new U;function z(W,$,it){L.setFromMatrixPosition($.matrixWorld),N.setFromMatrixPosition(it.matrixWorld);const Mt=L.distanceTo(N),gt=$.projectionMatrix.elements,Pt=it.projectionMatrix.elements,Rt=gt[14]/(gt[10]-1),dt=gt[14]/(gt[10]+1),Tt=(gt[9]+1)/gt[5],k=(gt[9]-1)/gt[5],ft=(gt[8]-1)/gt[0],Q=(Pt[8]+1)/Pt[0],at=Rt*ft,st=Rt*Q,At=Mt/(-ft+Q),yt=At*-ft;$.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(yt),W.translateZ(At),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const P=Rt+At,R=dt+At,X=at-yt,ct=st+(Mt-yt),et=Tt*dt/R*P,tt=k*dt/R*P;W.projectionMatrix.makePerspective(X,ct,et,tt,P,R),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function O(W,$){$===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices($.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;b.near=w.near=S.near=W.near,b.far=w.far=S.far=W.far,(E!==b.near||C!==b.far)&&(i.updateRenderState({depthNear:b.near,depthFar:b.far}),E=b.near,C=b.far);const $=W.parent,it=b.cameras;O(b,$);for(let Mt=0;Mt<it.length;Mt++)O(it[Mt],$);it.length===2?z(b,S,w):b.projectionMatrix.copy(S.projectionMatrix),H(W,b,$)};function H(W,$,it){it===null?W.matrix.copy($.matrixWorld):(W.matrix.copy(it.matrixWorld),W.matrix.invert(),W.matrix.multiply($.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy($.projectionMatrix),W.projectionMatrixInverse.copy($.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=ys*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&d===null))return h},this.setFoveation=function(W){h=W,f!==null&&(f.fixedFoveation=W),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=W)};let V=null;function G(W,$){if(l=$.getViewerPose(c||o),g=$,l!==null){const it=l.views;d!==null&&(t.setRenderTargetFramebuffer(p,d.framebuffer),t.setRenderTarget(p));let Mt=!1;it.length!==b.cameras.length&&(b.cameras.length=0,Mt=!0);for(let gt=0;gt<it.length;gt++){const Pt=it[gt];let Rt=null;if(d!==null)Rt=d.getViewport(Pt);else{const Tt=u.getViewSubImage(f,Pt);Rt=Tt.viewport,gt===0&&(t.setRenderTargetTextures(p,Tt.colorTexture,f.ignoreDepthValues?void 0:Tt.depthStencilTexture),t.setRenderTarget(p))}let dt=T[gt];dt===void 0&&(dt=new ln,dt.layers.enable(gt),dt.viewport=new fe,T[gt]=dt),dt.matrix.fromArray(Pt.transform.matrix),dt.matrix.decompose(dt.position,dt.quaternion,dt.scale),dt.projectionMatrix.fromArray(Pt.projectionMatrix),dt.projectionMatrixInverse.copy(dt.projectionMatrix).invert(),dt.viewport.set(Rt.x,Rt.y,Rt.width,Rt.height),gt===0&&(b.matrix.copy(dt.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),Mt===!0&&b.cameras.push(dt)}}for(let it=0;it<M.length;it++){const Mt=_[it],gt=M[it];Mt!==null&&gt!==void 0&&gt.update(Mt,$,c||o)}V&&V(W,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}const Y=new Hh;Y.setAnimationLoop(G),this.setAnimationLoop=function(W){V=W},this.dispose=function(){}}}function Hg(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Oh(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,_,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),l(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?h(m,p,M,_):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Qe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Qe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const _=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*_,e(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function h(m,p,M,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=_*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),t.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Qe&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Vg(s,t,e,n){let i={},r={},o=[];const a=e.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function h(M,_){const v=_.program;n.uniformBlockBinding(M,v)}function c(M,_){let v=i[M.id];v===void 0&&(g(M),v=l(M),i[M.id]=v,M.addEventListener("dispose",m));const y=_.program;n.updateUBOMapping(M,y);const S=t.render.frame;r[M.id]!==S&&(f(M),r[M.id]=S)}function l(M){const _=u();M.__bindingPointIndex=_;const v=s.createBuffer(),y=M.__size,S=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,y,S),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,v),v}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const _=i[M.id],v=M.uniforms,y=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let S=0,w=v.length;S<w;S++){const T=Array.isArray(v[S])?v[S]:[v[S]];for(let b=0,E=T.length;b<E;b++){const C=T[b];if(d(C,S,b,y)===!0){const I=C.__offset,F=Array.isArray(C.value)?C.value:[C.value];let A=0;for(let L=0;L<F.length;L++){const N=F[L],z=x(N);typeof N=="number"||typeof N=="boolean"?(C.__data[0]=N,s.bufferSubData(s.UNIFORM_BUFFER,I+A,C.__data)):N.isMatrix3?(C.__data[0]=N.elements[0],C.__data[1]=N.elements[1],C.__data[2]=N.elements[2],C.__data[3]=0,C.__data[4]=N.elements[3],C.__data[5]=N.elements[4],C.__data[6]=N.elements[5],C.__data[7]=0,C.__data[8]=N.elements[6],C.__data[9]=N.elements[7],C.__data[10]=N.elements[8],C.__data[11]=0):(N.toArray(C.__data,A),A+=z.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,I,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(M,_,v,y){const S=M.value,w=_+"_"+v;if(y[w]===void 0)return typeof S=="number"||typeof S=="boolean"?y[w]=S:y[w]=S.clone(),!0;{const T=y[w];if(typeof S=="number"||typeof S=="boolean"){if(T!==S)return y[w]=S,!0}else if(T.equals(S)===!1)return T.copy(S),!0}return!1}function g(M){const _=M.uniforms;let v=0;const y=16;for(let w=0,T=_.length;w<T;w++){const b=Array.isArray(_[w])?_[w]:[_[w]];for(let E=0,C=b.length;E<C;E++){const I=b[E],F=Array.isArray(I.value)?I.value:[I.value];for(let A=0,L=F.length;A<L;A++){const N=F[A],z=x(N),O=v%y;O!==0&&y-O<z.boundary&&(v+=y-O),I.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=v,v+=z.storage}}}const S=v%y;return S>0&&(v+=y-S),M.__size=v,M.__cache={},this}function x(M){const _={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(_.boundary=4,_.storage=4):M.isVector2?(_.boundary=8,_.storage=8):M.isVector3||M.isColor?(_.boundary=16,_.storage=12):M.isVector4?(_.boundary=16,_.storage=16):M.isMatrix3?(_.boundary=48,_.storage=48):M.isMatrix4?(_.boundary=64,_.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),_}function m(M){const _=M.target;_.removeEventListener("dispose",m);const v=o.indexOf(_.__bindingPointIndex);o.splice(v,1),s.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function p(){for(const M in i)s.deleteBuffer(i[M]);o=[],i={},r={}}return{bind:h,update:c,dispose:p}}class Zh{constructor(t={}){const{canvas:e=Bf(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:c=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;const d=new Uint32Array(4),g=new Int32Array(4);let x=null,m=null;const p=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Me,this._useLegacyLights=!1,this.toneMapping=ui,this.toneMappingExposure=1;const _=this;let v=!1,y=0,S=0,w=null,T=-1,b=null;const E=new fe,C=new fe;let I=null;const F=new Wt(0);let A=0,L=e.width,N=e.height,z=1,O=null,H=null;const V=new fe(0,0,L,N),G=new fe(0,0,L,N);let Y=!1;const W=new $o;let $=!1,it=!1,Mt=null;const gt=new se,Pt=new ut,Rt=new U,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Tt(){return w===null?z:1}let k=n;function ft(D,q){for(let Z=0;Z<D.length;Z++){const K=D[Z],J=e.getContext(K,q);if(J!==null)return J}return null}try{const D={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:h,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ho}`),e.addEventListener("webglcontextlost",_t,!1),e.addEventListener("webglcontextrestored",B,!1),e.addEventListener("webglcontextcreationerror",mt,!1),k===null){const q=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&q.shift(),k=ft(q,D),k===null)throw ft(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&k instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),k.getShaderPrecisionFormat===void 0&&(k.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let Q,at,st,At,yt,P,R,X,ct,et,tt,ot,ht,vt,Ct,Ut,lt,$t,kt,pt,Lt,nt,Et,Ot;function pe(){Q=new Q0(k),at=new $0(k,Q,t),Q.init(at),nt=new Og(k,Q,at),st=new Ng(k,Q,at),At=new nm(k),yt=new Sg,P=new Fg(k,Q,st,yt,at,nt,At),R=new j0(_),X=new J0(_),ct=new hd(k,at),Et=new X0(k,Q,ct,at),et=new tm(k,ct,At,Et),tt=new am(k,et,ct,At),kt=new rm(k,at,P),Ut=new Y0(yt),ot=new yg(_,R,X,Q,at,Et,Ut),ht=new Hg(_,yt),vt=new bg,Ct=new Pg(Q,at),$t=new W0(_,R,X,st,tt,f,h),lt=new zg(_,tt,at),Ot=new Vg(k,At,at,st),pt=new q0(k,Q,At,at),Lt=new em(k,Q,At,at),At.programs=ot.programs,_.capabilities=at,_.extensions=Q,_.properties=yt,_.renderLists=vt,_.shadowMap=lt,_.state=st,_.info=At}pe();const Vt=new Gg(_,k);this.xr=Vt,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const D=Q.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=Q.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(D){D!==void 0&&(z=D,this.setSize(L,N,!1))},this.getSize=function(D){return D.set(L,N)},this.setSize=function(D,q,Z=!0){if(Vt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}L=D,N=q,e.width=Math.floor(D*z),e.height=Math.floor(q*z),Z===!0&&(e.style.width=D+"px",e.style.height=q+"px"),this.setViewport(0,0,D,q)},this.getDrawingBufferSize=function(D){return D.set(L*z,N*z).floor()},this.setDrawingBufferSize=function(D,q,Z){L=D,N=q,z=Z,e.width=Math.floor(D*Z),e.height=Math.floor(q*Z),this.setViewport(0,0,D,q)},this.getCurrentViewport=function(D){return D.copy(E)},this.getViewport=function(D){return D.copy(V)},this.setViewport=function(D,q,Z,K){D.isVector4?V.set(D.x,D.y,D.z,D.w):V.set(D,q,Z,K),st.viewport(E.copy(V).multiplyScalar(z).floor())},this.getScissor=function(D){return D.copy(G)},this.setScissor=function(D,q,Z,K){D.isVector4?G.set(D.x,D.y,D.z,D.w):G.set(D,q,Z,K),st.scissor(C.copy(G).multiplyScalar(z).floor())},this.getScissorTest=function(){return Y},this.setScissorTest=function(D){st.setScissorTest(Y=D)},this.setOpaqueSort=function(D){O=D},this.setTransparentSort=function(D){H=D},this.getClearColor=function(D){return D.copy($t.getClearColor())},this.setClearColor=function(){$t.setClearColor.apply($t,arguments)},this.getClearAlpha=function(){return $t.getClearAlpha()},this.setClearAlpha=function(){$t.setClearAlpha.apply($t,arguments)},this.clear=function(D=!0,q=!0,Z=!0){let K=0;if(D){let J=!1;if(w!==null){const Dt=w.texture.format;J=Dt===Eh||Dt===bh||Dt===wh}if(J){const Dt=w.texture.type,Ft=Dt===fi||Dt===oi||Dt===Vo||Dt===Pi||Dt===yh||Dt===Sh,Ht=$t.getClearColor(),Xt=$t.getClearAlpha(),Zt=Ht.r,Yt=Ht.g,jt=Ht.b;Ft?(d[0]=Zt,d[1]=Yt,d[2]=jt,d[3]=Xt,k.clearBufferuiv(k.COLOR,0,d)):(g[0]=Zt,g[1]=Yt,g[2]=jt,g[3]=Xt,k.clearBufferiv(k.COLOR,0,g))}else K|=k.COLOR_BUFFER_BIT}q&&(K|=k.DEPTH_BUFFER_BIT),Z&&(K|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",_t,!1),e.removeEventListener("webglcontextrestored",B,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),vt.dispose(),Ct.dispose(),yt.dispose(),R.dispose(),X.dispose(),tt.dispose(),Et.dispose(),Ot.dispose(),ot.dispose(),Vt.dispose(),Vt.removeEventListener("sessionstart",Te),Vt.removeEventListener("sessionend",he),Mt&&(Mt.dispose(),Mt=null),j.stop()};function _t(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),v=!0}function B(){console.log("THREE.WebGLRenderer: Context Restored."),v=!1;const D=At.autoReset,q=lt.enabled,Z=lt.autoUpdate,K=lt.needsUpdate,J=lt.type;pe(),At.autoReset=D,lt.enabled=q,lt.autoUpdate=Z,lt.needsUpdate=K,lt.type=J}function mt(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function St(D){const q=D.target;q.removeEventListener("dispose",St),Gt(q)}function Gt(D){Bt(D),yt.remove(D)}function Bt(D){const q=yt.get(D).programs;q!==void 0&&(q.forEach(function(Z){ot.releaseProgram(Z)}),D.isShaderMaterial&&ot.releaseShaderCache(D))}this.renderBufferDirect=function(D,q,Z,K,J,Dt){q===null&&(q=dt);const Ft=J.isMesh&&J.matrixWorld.determinant()<0,Ht=xi(D,q,Z,K,J);st.setMaterial(K,Ft);let Xt=Z.index,Zt=1;if(K.wireframe===!0){if(Xt=et.getWireframeAttribute(Z),Xt===void 0)return;Zt=2}const Yt=Z.drawRange,jt=Z.attributes.position;let we=Yt.start*Zt,rt=(Yt.start+Yt.count)*Zt;Dt!==null&&(we=Math.max(we,Dt.start*Zt),rt=Math.min(rt,(Dt.start+Dt.count)*Zt)),Xt!==null?(we=Math.max(we,0),rt=Math.min(rt,Xt.count)):jt!=null&&(we=Math.max(we,0),rt=Math.min(rt,jt.count));const re=rt-we;if(re<0||re===1/0)return;Et.setup(J,K,Ht,Z,Xt);let ue,ee=pt;if(Xt!==null&&(ue=ct.get(Xt),ee=Lt,ee.setIndex(ue)),J.isMesh)K.wireframe===!0?(st.setLineWidth(K.wireframeLinewidth*Tt()),ee.setMode(k.LINES)):ee.setMode(k.TRIANGLES);else if(J.isLine){let Jt=K.linewidth;Jt===void 0&&(Jt=1),st.setLineWidth(Jt*Tt()),J.isLineSegments?ee.setMode(k.LINES):J.isLineLoop?ee.setMode(k.LINE_LOOP):ee.setMode(k.LINE_STRIP)}else J.isPoints?ee.setMode(k.POINTS):J.isSprite&&ee.setMode(k.TRIANGLES);if(J.isBatchedMesh)ee.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else if(J.isInstancedMesh)ee.renderInstances(we,re,J.count);else if(Z.isInstancedBufferGeometry){const Jt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Bi=Math.min(Z.instanceCount,Jt);ee.renderInstances(we,re,Bi)}else ee.render(we,re)};function ae(D,q,Z){D.transparent===!0&&D.side===be&&D.forceSinglePass===!1?(D.side=Qe,D.needsUpdate=!0,kn(D,q,Z),D.side=di,D.needsUpdate=!0,kn(D,q,Z),D.side=be):kn(D,q,Z)}this.compile=function(D,q,Z=null){Z===null&&(Z=D),m=Ct.get(Z),m.init(),M.push(m),Z.traverseVisible(function(J){J.isLight&&J.layers.test(q.layers)&&(m.pushLight(J),J.castShadow&&m.pushShadow(J))}),D!==Z&&D.traverseVisible(function(J){J.isLight&&J.layers.test(q.layers)&&(m.pushLight(J),J.castShadow&&m.pushShadow(J))}),m.setupLights(_._useLegacyLights);const K=new Set;return D.traverse(function(J){const Dt=J.material;if(Dt)if(Array.isArray(Dt))for(let Ft=0;Ft<Dt.length;Ft++){const Ht=Dt[Ft];ae(Ht,Z,J),K.add(Ht)}else ae(Dt,Z,J),K.add(Dt)}),M.pop(),m=null,K},this.compileAsync=function(D,q,Z=null){const K=this.compile(D,q,Z);return new Promise(J=>{function Dt(){if(K.forEach(function(Ft){yt.get(Ft).currentProgram.isReady()&&K.delete(Ft)}),K.size===0){J(D);return}setTimeout(Dt,10)}Q.get("KHR_parallel_shader_compile")!==null?Dt():setTimeout(Dt,10)})};let oe=null;function xe(D){oe&&oe(D)}function Te(){j.stop()}function he(){j.start()}const j=new Hh;j.setAnimationLoop(xe),typeof self<"u"&&j.setContext(self),this.setAnimationLoop=function(D){oe=D,Vt.setAnimationLoop(D),D===null?j.stop():j.start()},Vt.addEventListener("sessionstart",Te),Vt.addEventListener("sessionend",he),this.render=function(D,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),Vt.enabled===!0&&Vt.isPresenting===!0&&(Vt.cameraAutoUpdate===!0&&Vt.updateCamera(q),q=Vt.getCamera()),D.isScene===!0&&D.onBeforeRender(_,D,q,w),m=Ct.get(D,M.length),m.init(),M.push(m),gt.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),W.setFromProjectionMatrix(gt),it=this.localClippingEnabled,$=Ut.init(this.clippingPlanes,it),x=vt.get(D,p.length),x.init(),p.push(x),Nt(D,q,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(O,H),this.info.render.frame++,$===!0&&Ut.beginShadows();const Z=m.state.shadowsArray;if(lt.render(Z,D,q),$===!0&&Ut.endShadows(),this.info.autoReset===!0&&this.info.reset(),$t.render(x,D),m.setupLights(_._useLegacyLights),q.isArrayCamera){const K=q.cameras;for(let J=0,Dt=K.length;J<Dt;J++){const Ft=K[J];_e(x,D,Ft,Ft.viewport)}}else _e(x,D,q);w!==null&&(P.updateMultisampleRenderTarget(w),P.updateRenderTargetMipmap(w)),D.isScene===!0&&D.onAfterRender(_,D,q),Et.resetDefaultState(),T=-1,b=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function Nt(D,q,Z,K){if(D.visible===!1)return;if(D.layers.test(q.layers)){if(D.isGroup)Z=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(q);else if(D.isLight)m.pushLight(D),D.castShadow&&m.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||W.intersectsSprite(D)){K&&Rt.setFromMatrixPosition(D.matrixWorld).applyMatrix4(gt);const Ft=tt.update(D),Ht=D.material;Ht.visible&&x.push(D,Ft,Ht,Z,Rt.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||W.intersectsObject(D))){const Ft=tt.update(D),Ht=D.material;if(K&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Rt.copy(D.boundingSphere.center)):(Ft.boundingSphere===null&&Ft.computeBoundingSphere(),Rt.copy(Ft.boundingSphere.center)),Rt.applyMatrix4(D.matrixWorld).applyMatrix4(gt)),Array.isArray(Ht)){const Xt=Ft.groups;for(let Zt=0,Yt=Xt.length;Zt<Yt;Zt++){const jt=Xt[Zt],we=Ht[jt.materialIndex];we&&we.visible&&x.push(D,Ft,we,Z,Rt.z,jt)}}else Ht.visible&&x.push(D,Ft,Ht,Z,Rt.z,null)}}const Dt=D.children;for(let Ft=0,Ht=Dt.length;Ft<Ht;Ft++)Nt(Dt[Ft],q,Z,K)}function _e(D,q,Z,K){const J=D.opaque,Dt=D.transmissive,Ft=D.transparent;m.setupLightsView(Z),$===!0&&Ut.setGlobalState(_.clippingPlanes,Z),Dt.length>0&&le(J,Dt,q,Z),K&&st.viewport(E.copy(K)),J.length>0&&It(J,q,Z),Dt.length>0&&It(Dt,q,Z),Ft.length>0&&It(Ft,q,Z),st.buffers.depth.setTest(!0),st.buffers.depth.setMask(!0),st.buffers.color.setMask(!0),st.setPolygonOffset(!1)}function le(D,q,Z,K){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;const Dt=at.isWebGL2;Mt===null&&(Mt=new Ui(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")?tr:fi,minFilter:Qs,samples:Dt?4:0})),_.getDrawingBufferSize(Pt),Dt?Mt.setSize(Pt.x,Pt.y):Mt.setSize(aa(Pt.x),aa(Pt.y));const Ft=_.getRenderTarget();_.setRenderTarget(Mt),_.getClearColor(F),A=_.getClearAlpha(),A<1&&_.setClearColor(16777215,.5),_.clear();const Ht=_.toneMapping;_.toneMapping=ui,It(D,Z,K),P.updateMultisampleRenderTarget(Mt),P.updateRenderTargetMipmap(Mt);let Xt=!1;for(let Zt=0,Yt=q.length;Zt<Yt;Zt++){const jt=q[Zt],we=jt.object,rt=jt.geometry,re=jt.material,ue=jt.group;if(re.side===be&&we.layers.test(K.layers)){const ee=re.side;re.side=Qe,re.needsUpdate=!0,We(we,Z,K,rt,re,ue),re.side=ee,re.needsUpdate=!0,Xt=!0}}Xt===!0&&(P.updateMultisampleRenderTarget(Mt),P.updateRenderTargetMipmap(Mt)),_.setRenderTarget(Ft),_.setClearColor(F,A),_.toneMapping=Ht}function It(D,q,Z){const K=q.isScene===!0?q.overrideMaterial:null;for(let J=0,Dt=D.length;J<Dt;J++){const Ft=D[J],Ht=Ft.object,Xt=Ft.geometry,Zt=K===null?Ft.material:K,Yt=Ft.group;Ht.layers.test(Z.layers)&&We(Ht,q,Z,Xt,Zt,Yt)}}function We(D,q,Z,K,J,Dt){D.onBeforeRender(_,q,Z,K,J,Dt),D.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),J.onBeforeRender(_,q,Z,K,D,Dt),J.transparent===!0&&J.side===be&&J.forceSinglePass===!1?(J.side=Qe,J.needsUpdate=!0,_.renderBufferDirect(Z,q,K,J,D,Dt),J.side=di,J.needsUpdate=!0,_.renderBufferDirect(Z,q,K,J,D,Dt),J.side=be):_.renderBufferDirect(Z,q,K,J,D,Dt),D.onAfterRender(_,q,Z,K,J,Dt)}function kn(D,q,Z){q.isScene!==!0&&(q=dt);const K=yt.get(D),J=m.state.lights,Dt=m.state.shadowsArray,Ft=J.state.version,Ht=ot.getParameters(D,J.state,Dt,q,Z),Xt=ot.getProgramCacheKey(Ht);let Zt=K.programs;K.environment=D.isMeshStandardMaterial?q.environment:null,K.fog=q.fog,K.envMap=(D.isMeshStandardMaterial?X:R).get(D.envMap||K.environment),Zt===void 0&&(D.addEventListener("dispose",St),Zt=new Map,K.programs=Zt);let Yt=Zt.get(Xt);if(Yt!==void 0){if(K.currentProgram===Yt&&K.lightsStateVersion===Ft)return tn(D,Ht),Yt}else Ht.uniforms=ot.getUniforms(D),D.onBuild(Z,Ht,_),D.onBeforeCompile(Ht,_),Yt=ot.acquireProgram(Ht,Xt),Zt.set(Xt,Yt),K.uniforms=Ht.uniforms;const jt=K.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(jt.clippingPlanes=Ut.uniform),tn(D,Ht),K.needsLights=Jn(D),K.lightsStateVersion=Ft,K.needsLights&&(jt.ambientLightColor.value=J.state.ambient,jt.lightProbe.value=J.state.probe,jt.directionalLights.value=J.state.directional,jt.directionalLightShadows.value=J.state.directionalShadow,jt.spotLights.value=J.state.spot,jt.spotLightShadows.value=J.state.spotShadow,jt.rectAreaLights.value=J.state.rectArea,jt.ltc_1.value=J.state.rectAreaLTC1,jt.ltc_2.value=J.state.rectAreaLTC2,jt.pointLights.value=J.state.point,jt.pointLightShadows.value=J.state.pointShadow,jt.hemisphereLights.value=J.state.hemi,jt.directionalShadowMap.value=J.state.directionalShadowMap,jt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,jt.spotShadowMap.value=J.state.spotShadowMap,jt.spotLightMatrix.value=J.state.spotLightMatrix,jt.spotLightMap.value=J.state.spotLightMap,jt.pointShadowMap.value=J.state.pointShadowMap,jt.pointShadowMatrix.value=J.state.pointShadowMatrix),K.currentProgram=Yt,K.uniformsList=null,Yt}function gi(D){if(D.uniformsList===null){const q=D.currentProgram.getUniforms();D.uniformsList=Jr.seqWithValue(q.seq,D.uniforms)}return D.uniformsList}function tn(D,q){const Z=yt.get(D);Z.outputColorSpace=q.outputColorSpace,Z.batching=q.batching,Z.instancing=q.instancing,Z.instancingColor=q.instancingColor,Z.skinning=q.skinning,Z.morphTargets=q.morphTargets,Z.morphNormals=q.morphNormals,Z.morphColors=q.morphColors,Z.morphTargetsCount=q.morphTargetsCount,Z.numClippingPlanes=q.numClippingPlanes,Z.numIntersection=q.numClipIntersection,Z.vertexAlphas=q.vertexAlphas,Z.vertexTangents=q.vertexTangents,Z.toneMapping=q.toneMapping}function xi(D,q,Z,K,J){q.isScene!==!0&&(q=dt),P.resetTextureUnits();const Dt=q.fog,Ft=K.isMeshStandardMaterial?q.environment:null,Ht=w===null?_.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Yn,Xt=(K.isMeshStandardMaterial?X:R).get(K.envMap||Ft),Zt=K.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Yt=!!Z.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),jt=!!Z.morphAttributes.position,we=!!Z.morphAttributes.normal,rt=!!Z.morphAttributes.color;let re=ui;K.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(re=_.toneMapping);const ue=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ee=ue!==void 0?ue.length:0,Jt=yt.get(K),Bi=m.state.lights;if($===!0&&(it===!0||D!==b)){const pn=D===b&&K.id===T;Ut.setState(K,D,pn)}let Ce=!1;K.version===Jt.__version?(Jt.needsLights&&Jt.lightsStateVersion!==Bi.state.version||Jt.outputColorSpace!==Ht||J.isBatchedMesh&&Jt.batching===!1||!J.isBatchedMesh&&Jt.batching===!0||J.isInstancedMesh&&Jt.instancing===!1||!J.isInstancedMesh&&Jt.instancing===!0||J.isSkinnedMesh&&Jt.skinning===!1||!J.isSkinnedMesh&&Jt.skinning===!0||J.isInstancedMesh&&Jt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Jt.instancingColor===!1&&J.instanceColor!==null||Jt.envMap!==Xt||K.fog===!0&&Jt.fog!==Dt||Jt.numClippingPlanes!==void 0&&(Jt.numClippingPlanes!==Ut.numPlanes||Jt.numIntersection!==Ut.numIntersection)||Jt.vertexAlphas!==Zt||Jt.vertexTangents!==Yt||Jt.morphTargets!==jt||Jt.morphNormals!==we||Jt.morphColors!==rt||Jt.toneMapping!==re||at.isWebGL2===!0&&Jt.morphTargetsCount!==ee)&&(Ce=!0):(Ce=!0,Jt.__version=K.version);let vi=Jt.currentProgram;Ce===!0&&(vi=kn(K,q,J));let ul=!1,Rs=!1,_a=!1;const Ye=vi.getUniforms(),Mi=Jt.uniforms;if(st.useProgram(vi.program)&&(ul=!0,Rs=!0,_a=!0),K.id!==T&&(T=K.id,Rs=!0),ul||b!==D){Ye.setValue(k,"projectionMatrix",D.projectionMatrix),Ye.setValue(k,"viewMatrix",D.matrixWorldInverse);const pn=Ye.map.cameraPosition;pn!==void 0&&pn.setValue(k,Rt.setFromMatrixPosition(D.matrixWorld)),at.logarithmicDepthBuffer&&Ye.setValue(k,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Ye.setValue(k,"isOrthographic",D.isOrthographicCamera===!0),b!==D&&(b=D,Rs=!0,_a=!0)}if(J.isSkinnedMesh){Ye.setOptional(k,J,"bindMatrix"),Ye.setOptional(k,J,"bindMatrixInverse");const pn=J.skeleton;pn&&(at.floatVertexTextures?(pn.boneTexture===null&&pn.computeBoneTexture(),Ye.setValue(k,"boneTexture",pn.boneTexture,P)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}J.isBatchedMesh&&(Ye.setOptional(k,J,"batchingTexture"),Ye.setValue(k,"batchingTexture",J._matricesTexture,P));const ya=Z.morphAttributes;if((ya.position!==void 0||ya.normal!==void 0||ya.color!==void 0&&at.isWebGL2===!0)&&kt.update(J,Z,vi),(Rs||Jt.receiveShadow!==J.receiveShadow)&&(Jt.receiveShadow=J.receiveShadow,Ye.setValue(k,"receiveShadow",J.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(Mi.envMap.value=Xt,Mi.flipEnvMap.value=Xt.isCubeTexture&&Xt.isRenderTargetTexture===!1?-1:1),Rs&&(Ye.setValue(k,"toneMappingExposure",_.toneMappingExposure),Jt.needsLights&&Kn(Mi,_a),Dt&&K.fog===!0&&ht.refreshFogUniforms(Mi,Dt),ht.refreshMaterialUniforms(Mi,K,z,N,Mt),Jr.upload(k,gi(Jt),Mi,P)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Jr.upload(k,gi(Jt),Mi,P),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Ye.setValue(k,"center",J.center),Ye.setValue(k,"modelViewMatrix",J.modelViewMatrix),Ye.setValue(k,"normalMatrix",J.normalMatrix),Ye.setValue(k,"modelMatrix",J.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const pn=K.uniformsGroups;for(let Sa=0,bu=pn.length;Sa<bu;Sa++)if(at.isWebGL2){const fl=pn[Sa];Ot.update(fl,vi),Ot.bind(fl,vi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return vi}function Kn(D,q){D.ambientLightColor.needsUpdate=q,D.lightProbe.needsUpdate=q,D.directionalLights.needsUpdate=q,D.directionalLightShadows.needsUpdate=q,D.pointLights.needsUpdate=q,D.pointLightShadows.needsUpdate=q,D.spotLights.needsUpdate=q,D.spotLightShadows.needsUpdate=q,D.rectAreaLights.needsUpdate=q,D.hemisphereLights.needsUpdate=q}function Jn(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(D,q,Z){yt.get(D.texture).__webglTexture=q,yt.get(D.depthTexture).__webglTexture=Z;const K=yt.get(D);K.__hasExternalTextures=!0,K.__hasExternalTextures&&(K.__autoAllocateDepthBuffer=Z===void 0,K.__autoAllocateDepthBuffer||Q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(D,q){const Z=yt.get(D);Z.__webglFramebuffer=q,Z.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(D,q=0,Z=0){w=D,y=q,S=Z;let K=!0,J=null,Dt=!1,Ft=!1;if(D){const Xt=yt.get(D);Xt.__useDefaultFramebuffer!==void 0?(st.bindFramebuffer(k.FRAMEBUFFER,null),K=!1):Xt.__webglFramebuffer===void 0?P.setupRenderTarget(D):Xt.__hasExternalTextures&&P.rebindTextures(D,yt.get(D.texture).__webglTexture,yt.get(D.depthTexture).__webglTexture);const Zt=D.texture;(Zt.isData3DTexture||Zt.isDataArrayTexture||Zt.isCompressedArrayTexture)&&(Ft=!0);const Yt=yt.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(Yt[q])?J=Yt[q][Z]:J=Yt[q],Dt=!0):at.isWebGL2&&D.samples>0&&P.useMultisampledRTT(D)===!1?J=yt.get(D).__webglMultisampledFramebuffer:Array.isArray(Yt)?J=Yt[Z]:J=Yt,E.copy(D.viewport),C.copy(D.scissor),I=D.scissorTest}else E.copy(V).multiplyScalar(z).floor(),C.copy(G).multiplyScalar(z).floor(),I=Y;if(st.bindFramebuffer(k.FRAMEBUFFER,J)&&at.drawBuffers&&K&&st.drawBuffers(D,J),st.viewport(E),st.scissor(C),st.setScissorTest(I),Dt){const Xt=yt.get(D.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+q,Xt.__webglTexture,Z)}else if(Ft){const Xt=yt.get(D.texture),Zt=q||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Xt.__webglTexture,Z||0,Zt)}T=-1},this.readRenderTargetPixels=function(D,q,Z,K,J,Dt,Ft){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ht=yt.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ft!==void 0&&(Ht=Ht[Ft]),Ht){st.bindFramebuffer(k.FRAMEBUFFER,Ht);try{const Xt=D.texture,Zt=Xt.format,Yt=Xt.type;if(Zt!==Rn&&nt.convert(Zt)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const jt=Yt===tr&&(Q.has("EXT_color_buffer_half_float")||at.isWebGL2&&Q.has("EXT_color_buffer_float"));if(Yt!==fi&&nt.convert(Yt)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Yt===li&&(at.isWebGL2||Q.has("OES_texture_float")||Q.has("WEBGL_color_buffer_float")))&&!jt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=D.width-K&&Z>=0&&Z<=D.height-J&&k.readPixels(q,Z,K,J,nt.convert(Zt),nt.convert(Yt),Dt)}finally{const Xt=w!==null?yt.get(w).__webglFramebuffer:null;st.bindFramebuffer(k.FRAMEBUFFER,Xt)}}},this.copyFramebufferToTexture=function(D,q,Z=0){const K=Math.pow(2,-Z),J=Math.floor(q.image.width*K),Dt=Math.floor(q.image.height*K);P.setTexture2D(q,0),k.copyTexSubImage2D(k.TEXTURE_2D,Z,0,0,D.x,D.y,J,Dt),st.unbindTexture()},this.copyTextureToTexture=function(D,q,Z,K=0){const J=q.image.width,Dt=q.image.height,Ft=nt.convert(Z.format),Ht=nt.convert(Z.type);P.setTexture2D(Z,0),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,Z.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,Z.unpackAlignment),q.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,K,D.x,D.y,J,Dt,Ft,Ht,q.image.data):q.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,K,D.x,D.y,q.mipmaps[0].width,q.mipmaps[0].height,Ft,q.mipmaps[0].data):k.texSubImage2D(k.TEXTURE_2D,K,D.x,D.y,Ft,Ht,q.image),K===0&&Z.generateMipmaps&&k.generateMipmap(k.TEXTURE_2D),st.unbindTexture()},this.copyTextureToTexture3D=function(D,q,Z,K,J=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Dt=D.max.x-D.min.x+1,Ft=D.max.y-D.min.y+1,Ht=D.max.z-D.min.z+1,Xt=nt.convert(K.format),Zt=nt.convert(K.type);let Yt;if(K.isData3DTexture)P.setTexture3D(K,0),Yt=k.TEXTURE_3D;else if(K.isDataArrayTexture||K.isCompressedArrayTexture)P.setTexture2DArray(K,0),Yt=k.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,K.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,K.unpackAlignment);const jt=k.getParameter(k.UNPACK_ROW_LENGTH),we=k.getParameter(k.UNPACK_IMAGE_HEIGHT),rt=k.getParameter(k.UNPACK_SKIP_PIXELS),re=k.getParameter(k.UNPACK_SKIP_ROWS),ue=k.getParameter(k.UNPACK_SKIP_IMAGES),ee=Z.isCompressedTexture?Z.mipmaps[J]:Z.image;k.pixelStorei(k.UNPACK_ROW_LENGTH,ee.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ee.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,D.min.x),k.pixelStorei(k.UNPACK_SKIP_ROWS,D.min.y),k.pixelStorei(k.UNPACK_SKIP_IMAGES,D.min.z),Z.isDataTexture||Z.isData3DTexture?k.texSubImage3D(Yt,J,q.x,q.y,q.z,Dt,Ft,Ht,Xt,Zt,ee.data):Z.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),k.compressedTexSubImage3D(Yt,J,q.x,q.y,q.z,Dt,Ft,Ht,Xt,ee.data)):k.texSubImage3D(Yt,J,q.x,q.y,q.z,Dt,Ft,Ht,Xt,Zt,ee),k.pixelStorei(k.UNPACK_ROW_LENGTH,jt),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,we),k.pixelStorei(k.UNPACK_SKIP_PIXELS,rt),k.pixelStorei(k.UNPACK_SKIP_ROWS,re),k.pixelStorei(k.UNPACK_SKIP_IMAGES,ue),J===0&&K.generateMipmaps&&k.generateMipmap(Yt),st.unbindTexture()},this.initTexture=function(D){D.isCubeTexture?P.setTextureCube(D,0):D.isData3DTexture?P.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?P.setTexture2DArray(D,0):P.setTexture2D(D,0),st.unbindTexture()},this.resetState=function(){y=0,S=0,w=null,st.reset(),Et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Wo?"display-p3":"srgb",e.unpackColorSpace=ge.workingColorSpace===ua?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Me?Di:Ah}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Di?Me:Yn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Wg extends Zh{}Wg.prototype.isWebGL1Renderer=!0;class jo{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Wt(t),this.near=e,this.far=n}clone(){return new jo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xg extends Le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class qg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=So,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=zn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const en=new U;class oa{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)en.fromBufferAttribute(this,e),en.applyMatrix4(t),this.setXYZ(e,en.x,en.y,en.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)en.fromBufferAttribute(this,e),en.applyNormalMatrix(t),this.setXYZ(e,en.x,en.y,en.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)en.fromBufferAttribute(this,e),en.transformDirection(t),this.setXYZ(e,en.x,en.y,en.z);return this}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Pn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Pn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Pn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Pn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),i=me(i,this.array),r=me(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Ee(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new oa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class da extends mi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ss;const Is=new U,rs=new U,as=new U,os=new ut,Us=new ut,Kh=new se,zr=new U,zs=new U,Nr=new U,Ic=new ut,Ja=new ut,Uc=new ut;class Zo extends Le{constructor(t=new da){if(super(),this.isSprite=!0,this.type="Sprite",ss===void 0){ss=new de;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new qg(e,5);ss.setIndex([0,1,2,0,2,3]),ss.setAttribute("position",new oa(n,3,0,!1)),ss.setAttribute("uv",new oa(n,2,3,!1))}this.geometry=ss,this.material=t,this.center=new ut(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),rs.setFromMatrixScale(this.matrixWorld),Kh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),as.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&rs.multiplyScalar(-as.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Fr(zr.set(-.5,-.5,0),as,o,rs,i,r),Fr(zs.set(.5,-.5,0),as,o,rs,i,r),Fr(Nr.set(.5,.5,0),as,o,rs,i,r),Ic.set(0,0),Ja.set(1,0),Uc.set(1,1);let a=t.ray.intersectTriangle(zr,zs,Nr,!1,Is);if(a===null&&(Fr(zs.set(-.5,.5,0),as,o,rs,i,r),Ja.set(0,1),a=t.ray.intersectTriangle(zr,Nr,zs,!1,Is),a===null))return;const h=t.ray.origin.distanceTo(Is);h<t.near||h>t.far||e.push({distance:h,point:Is.clone(),uv:vn.getInterpolation(Is,zr,zs,Nr,Ic,Ja,Uc,new ut),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Fr(s,t,e,n,i,r){os.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Us.x=r*os.x-i*os.y,Us.y=i*os.x+r*os.y):Us.copy(os),s.copy(t),s.x+=Us.x,s.y+=Us.y,s.applyMatrix4(Kh)}class zc extends Ee{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ls=new se,Nc=new se,Or=[],Fc=new Fi,$g=new se,Ns=new xt,Fs=new Oi;class $e extends xt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new zc(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,$g)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Fi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ls),Fc.copy(t.boundingBox).applyMatrix4(ls),this.boundingBox.union(Fc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Oi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ls),Fs.copy(t.boundingSphere).applyMatrix4(ls),this.boundingSphere.union(Fs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Ns.geometry=this.geometry,Ns.material=this.material,Ns.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fs.copy(this.boundingSphere),Fs.applyMatrix4(n),t.ray.intersectsSphere(Fs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ls),Nc.multiplyMatrices(n,ls),Ns.matrixWorld=Nc,Ns.raycast(t,Or);for(let o=0,a=Or.length;o<a;o++){const h=Or[o];h.instanceId=r,h.object=this,e.push(h)}Or.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new zc(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class ur extends mi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Wt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Oc=new U,kc=new U,Bc=new se,Qa=new qo,kr=new Oi;class Ko extends Le{constructor(t=new de,e=new ur){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Oc.fromBufferAttribute(e,i-1),kc.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Oc.distanceTo(kc);t.setAttribute("lineDistance",new te(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(i),kr.radius+=r,t.ray.intersectsSphere(kr)===!1)return;Bc.copy(i).invert(),Qa.copy(t.ray).applyMatrix4(Bc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=a*a,c=new U,l=new U,u=new U,f=new U,d=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,o.start),M=Math.min(g.count,o.start+o.count);for(let _=p,v=M-1;_<v;_+=d){const y=g.getX(_),S=g.getX(_+1);if(c.fromBufferAttribute(m,y),l.fromBufferAttribute(m,S),Qa.distanceSqToSegment(c,l,f,u)>h)continue;f.applyMatrix4(this.matrixWorld);const T=t.ray.origin.distanceTo(f);T<t.near||T>t.far||e.push({distance:T,point:u.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),M=Math.min(m.count,o.start+o.count);for(let _=p,v=M-1;_<v;_+=d){if(c.fromBufferAttribute(m,_),l.fromBufferAttribute(m,_+1),Qa.distanceSqToSegment(c,l,f,u)>h)continue;f.applyMatrix4(this.matrixWorld);const S=t.ray.origin.distanceTo(f);S<t.near||S>t.far||e.push({distance:S,point:u.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}const Gc=new U,Hc=new U;class Jh extends Ko{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)Gc.fromBufferAttribute(e,i),Hc.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Gc.distanceTo(Hc);t.setAttribute("lineDistance",new te(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Jo extends mi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Vc=new se,To=new qo,Br=new Oi,Gr=new U;class Qo extends Le{constructor(t=new de,e=new Jo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(i),Br.radius+=r,t.ray.intersectsSphere(Br)===!1)return;Vc.copy(i).invert(),To.copy(t.ray).applyMatrix4(Vc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=a*a,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,x=d;g<x;g++){const m=c.getX(g);Gr.fromBufferAttribute(u,m),Wc(Gr,m,h,i,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,x=d;g<x;g++)Gr.fromBufferAttribute(u,g),Wc(Gr,g,h,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Wc(s,t,e,n,i,r,o){const a=To.distanceSqToPoint(s);if(a<e){const h=new U;To.closestPointToPoint(s,h),h.applyMatrix4(n);const c=i.ray.origin.distanceTo(h);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:h,index:t,face:null,object:o})}}class Sn extends an{constructor(t,e,n,i,r,o,a,h,c){super(t,e,n,i,r,o,a,h,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class On{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,h=r-1,c;for(;a<=h;)if(i=Math.floor(a+(h-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)h=i-1;else{h=i;break}if(i=h,n[i]===o)return i/(r-1);const l=n[i],f=n[i+1]-l,d=(o-l)/f;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),h=e||(o.isVector2?new ut:new U);return h.copy(a).sub(o).normalize(),h}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new U,i=[],r=[],o=[],a=new U,h=new se;for(let d=0;d<=t;d++){const g=d/t;i[d]=this.getTangentAt(g,new U)}r[0]=new U,o[0]=new U;let c=Number.MAX_VALUE;const l=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ge(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(h.makeRotationAxis(a,g))}o[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(Ge(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(h.makeRotationAxis(i[g],d*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class tl extends On{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=h}getPoint(t,e){const n=e||new ut,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let h=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const l=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=h-this.aX,d=c-this.aY;h=f*l-d*u+this.aX,c=f*u+d*l+this.aY}return n.set(h,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Yg extends tl{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function el(){let s=0,t=0,e=0,n=0;function i(r,o,a,h){s=r,t=a,e=-3*r+3*o-2*a-h,n=2*r-2*o+a+h}return{initCatmullRom:function(r,o,a,h,c){i(o,a,c*(a-r),c*(h-o))},initNonuniformCatmullRom:function(r,o,a,h,c,l,u){let f=(o-r)/c-(a-r)/(c+l)+(a-o)/l,d=(a-o)/l-(h-o)/(l+u)+(h-a)/u;f*=l,d*=l,i(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const Hr=new U,to=new el,eo=new el,no=new el;class jg extends On{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new U){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),h=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:h===0&&a===r-1&&(a=r-2,h=1);let c,l;this.closed||a>0?c=i[(a-1)%r]:(Hr.subVectors(i[0],i[1]).add(i[0]),c=Hr);const u=i[a%r],f=i[(a+1)%r];if(this.closed||a+2<r?l=i[(a+2)%r]:(Hr.subVectors(i[r-1],i[r-2]).add(i[r-1]),l=Hr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(l),d);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),to.initNonuniformCatmullRom(c.x,u.x,f.x,l.x,g,x,m),eo.initNonuniformCatmullRom(c.y,u.y,f.y,l.y,g,x,m),no.initNonuniformCatmullRom(c.z,u.z,f.z,l.z,g,x,m)}else this.curveType==="catmullrom"&&(to.initCatmullRom(c.x,u.x,f.x,l.x,this.tension),eo.initCatmullRom(c.y,u.y,f.y,l.y,this.tension),no.initCatmullRom(c.z,u.z,f.z,l.z,this.tension));return n.set(to.calc(h),eo.calc(h),no.calc(h)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new U().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Xc(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,h=s*a;return(2*e-2*n+r+o)*h+(-3*e+3*n-2*r-o)*a+r*s+e}function Zg(s,t){const e=1-s;return e*e*t}function Kg(s,t){return 2*(1-s)*s*t}function Jg(s,t){return s*s*t}function js(s,t,e,n){return Zg(s,t)+Kg(s,e)+Jg(s,n)}function Qg(s,t){const e=1-s;return e*e*e*t}function t1(s,t){const e=1-s;return 3*e*e*s*t}function e1(s,t){return 3*(1-s)*s*s*t}function n1(s,t){return s*s*s*t}function Zs(s,t,e,n,i){return Qg(s,t)+t1(s,e)+e1(s,n)+n1(s,i)}class Qh extends On{constructor(t=new ut,e=new ut,n=new ut,i=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ut){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Zs(t,i.x,r.x,o.x,a.x),Zs(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class i1 extends On{constructor(t=new U,e=new U,n=new U,i=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new U){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Zs(t,i.x,r.x,o.x,a.x),Zs(t,i.y,r.y,o.y,a.y),Zs(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class tu extends On{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class s1 extends On{constructor(t=new U,e=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new U){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new U){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class eu extends On{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(js(t,i.x,r.x,o.x),js(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class r1 extends On{constructor(t=new U,e=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new U){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(js(t,i.x,r.x,o.x),js(t,i.y,r.y,o.y),js(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nu extends On{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,h=i[o===0?o:o-1],c=i[o],l=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Xc(a,h.x,c.x,l.x,u.x),Xc(a,h.y,c.y,l.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new ut().fromArray(i))}return this}}var Ao=Object.freeze({__proto__:null,ArcCurve:Yg,CatmullRomCurve3:jg,CubicBezierCurve:Qh,CubicBezierCurve3:i1,EllipseCurve:tl,LineCurve:tu,LineCurve3:s1,QuadraticBezierCurve:eu,QuadraticBezierCurve3:r1,SplineCurve:nu});class a1 extends On{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ao[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],h=a.getLength(),c=h===0?0:1-o/h;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,h=o.getPoints(a);for(let c=0;c<h.length;c++){const l=h[c];n&&n.equals(l)||(e.push(l),n=l)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Ao[i.type]().fromJSON(i))}return this}}let nr=class extends a1{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new tu(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new eu(this.currentPoint.clone(),new ut(t,e),new ut(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){const a=new Qh(this.currentPoint.clone(),new ut(t,e),new ut(n,i),new ut(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new nu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){const a=this.currentPoint.x,h=this.currentPoint.y;return this.absarc(t+a,e+h,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,h){const c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(t+c,e+l,n,i,r,o,a,h),this}absellipse(t,e,n,i,r,o,a,h){const c=new tl(t,e,n,i,r,o,a,h);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}};class pa extends de{constructor(t=[new ut(0,-.5),new ut(.5,0),new ut(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Ge(i,0,Math.PI*2);const r=[],o=[],a=[],h=[],c=[],l=1/e,u=new U,f=new ut,d=new U,g=new U,x=new U;let m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,x.copy(d),d.normalize(),h.push(d.x,d.y,d.z);break;case t.length-1:h.push(x.x,x.y,x.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),h.push(d.x,d.y,d.z),x.copy(g)}for(let M=0;M<=e;M++){const _=n+M*l*i,v=Math.sin(_),y=Math.cos(_);for(let S=0;S<=t.length-1;S++){u.x=t[S].x*v,u.y=t[S].y,u.z=t[S].x*y,o.push(u.x,u.y,u.z),f.x=M/e,f.y=S/(t.length-1),a.push(f.x,f.y);const w=h[3*S+0]*v,T=h[3*S+1],b=h[3*S+0]*y;c.push(w,T,b)}}for(let M=0;M<e;M++)for(let _=0;_<t.length-1;_++){const v=_+M*t.length,y=v,S=v+t.length,w=v+t.length+1,T=v+1;r.push(y,S,T),r.push(w,T,S)}this.setIndex(r),this.setAttribute("position",new te(o,3)),this.setAttribute("uv",new te(a,2)),this.setAttribute("normal",new te(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pa(t.points,t.segments,t.phiStart,t.phiLength)}}class ir extends pa{constructor(t=1,e=1,n=4,i=8){const r=new nr;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new ir(t.radius,t.length,t.capSegments,t.radialSegments)}}class nl extends de{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],h=[],c=new U,l=new ut;o.push(0,0,0),a.push(0,0,1),h.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*i;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),l.x=(o[f]/t+1)/2,l.y=(o[f+1]/t+1)/2,h.push(l.x,l.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new te(o,3)),this.setAttribute("normal",new te(a,3)),this.setAttribute("uv",new te(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ce extends de{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:h};const c=this;i=Math.floor(i),r=Math.floor(r);const l=[],u=[],f=[],d=[];let g=0;const x=[],m=n/2;let p=0;M(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(l),this.setAttribute("position",new te(u,3)),this.setAttribute("normal",new te(f,3)),this.setAttribute("uv",new te(d,2));function M(){const v=new U,y=new U;let S=0;const w=(e-t)/n;for(let T=0;T<=r;T++){const b=[],E=T/r,C=E*(e-t)+t;for(let I=0;I<=i;I++){const F=I/i,A=F*h+a,L=Math.sin(A),N=Math.cos(A);y.x=C*L,y.y=-E*n+m,y.z=C*N,u.push(y.x,y.y,y.z),v.set(L,w,N).normalize(),f.push(v.x,v.y,v.z),d.push(F,1-E),b.push(g++)}x.push(b)}for(let T=0;T<i;T++)for(let b=0;b<r;b++){const E=x[b][T],C=x[b+1][T],I=x[b+1][T+1],F=x[b][T+1];l.push(E,C,F),l.push(C,I,F),S+=6}c.addGroup(p,S,0),p+=S}function _(v){const y=g,S=new ut,w=new U;let T=0;const b=v===!0?t:e,E=v===!0?1:-1;for(let I=1;I<=i;I++)u.push(0,m*E,0),f.push(0,E,0),d.push(.5,.5),g++;const C=g;for(let I=0;I<=i;I++){const A=I/i*h+a,L=Math.cos(A),N=Math.sin(A);w.x=b*N,w.y=m*E,w.z=b*L,u.push(w.x,w.y,w.z),f.push(0,E,0),S.x=L*.5+.5,S.y=N*.5*E+.5,d.push(S.x,S.y),g++}for(let I=0;I<i;I++){const F=y+I,A=C+I;v===!0?l.push(A,A+1,F):l.push(A+1,A,F),T+=3}c.addGroup(p,T,v===!0?1:2),p+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ce(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class pi extends ce{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new pi(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class il extends de{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],o=[];a(i),c(n),l(),this.setAttribute("position",new te(r,3)),this.setAttribute("normal",new te(r.slice(),3)),this.setAttribute("uv",new te(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const _=new U,v=new U,y=new U;for(let S=0;S<e.length;S+=3)d(e[S+0],_),d(e[S+1],v),d(e[S+2],y),h(_,v,y,M)}function h(M,_,v,y){const S=y+1,w=[];for(let T=0;T<=S;T++){w[T]=[];const b=M.clone().lerp(v,T/S),E=_.clone().lerp(v,T/S),C=S-T;for(let I=0;I<=C;I++)I===0&&T===S?w[T][I]=b:w[T][I]=b.clone().lerp(E,I/C)}for(let T=0;T<S;T++)for(let b=0;b<2*(S-T)-1;b++){const E=Math.floor(b/2);b%2===0?(f(w[T][E+1]),f(w[T+1][E]),f(w[T][E])):(f(w[T][E+1]),f(w[T+1][E+1]),f(w[T+1][E]))}}function c(M){const _=new U;for(let v=0;v<r.length;v+=3)_.x=r[v+0],_.y=r[v+1],_.z=r[v+2],_.normalize().multiplyScalar(M),r[v+0]=_.x,r[v+1]=_.y,r[v+2]=_.z}function l(){const M=new U;for(let _=0;_<r.length;_+=3){M.x=r[_+0],M.y=r[_+1],M.z=r[_+2];const v=m(M)/2/Math.PI+.5,y=p(M)/Math.PI+.5;o.push(v,1-y)}g(),u()}function u(){for(let M=0;M<o.length;M+=6){const _=o[M+0],v=o[M+2],y=o[M+4],S=Math.max(_,v,y),w=Math.min(_,v,y);S>.9&&w<.1&&(_<.2&&(o[M+0]+=1),v<.2&&(o[M+2]+=1),y<.2&&(o[M+4]+=1))}}function f(M){r.push(M.x,M.y,M.z)}function d(M,_){const v=M*3;_.x=t[v+0],_.y=t[v+1],_.z=t[v+2]}function g(){const M=new U,_=new U,v=new U,y=new U,S=new ut,w=new ut,T=new ut;for(let b=0,E=0;b<r.length;b+=9,E+=6){M.set(r[b+0],r[b+1],r[b+2]),_.set(r[b+3],r[b+4],r[b+5]),v.set(r[b+6],r[b+7],r[b+8]),S.set(o[E+0],o[E+1]),w.set(o[E+2],o[E+3]),T.set(o[E+4],o[E+5]),y.copy(M).add(_).add(v).divideScalar(3);const C=m(y);x(S,E+0,M,C),x(w,E+2,_,C),x(T,E+4,v,C)}}function x(M,_,v,y){y<0&&M.x===1&&(o[_]=M.x-1),v.x===0&&v.z===0&&(o[_]=y/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new il(t.vertices,t.indices,t.radius,t.details)}}class fr extends nr{constructor(t){super(t),this.uuid=zn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new nr().fromJSON(i))}return this}}const o1={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=iu(s,0,i,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,h,c,l,u,f,d;if(n&&(r=f1(s,t,r,e)),s.length>80*e){a=c=s[0],h=l=s[1];for(let g=e;g<i;g+=e)u=s[g],f=s[g+1],u<a&&(a=u),f<h&&(h=f),u>c&&(c=u),f>l&&(l=f);d=Math.max(c-a,l-h),d=d!==0?32767/d:0}return sr(r,o,e,a,h,d,0),o}};function iu(s,t,e,n,i){let r,o;if(i===w1(s,t,e,n)>0)for(r=t;r<e;r+=n)o=qc(r,s[r],s[r+1],o);else for(r=e-n;r>=t;r-=n)o=qc(r,s[r],s[r+1],o);return o&&ma(o,o.next)&&(ar(o),o=o.next),o}function zi(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(ma(e,e.next)||Ae(e.prev,e,e.next)===0)){if(ar(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function sr(s,t,e,n,i,r,o){if(!s)return;!o&&r&&x1(s,n,i,r);let a=s,h,c;for(;s.prev!==s.next;){if(h=s.prev,c=s.next,r?c1(s,n,i,r):l1(s)){t.push(h.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),ar(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=h1(zi(s),t,e),sr(s,t,e,n,i,r,2)):o===2&&u1(s,t,e,n,i,r):sr(zi(s),t,e,n,i,r,1);break}}}function l1(s){const t=s.prev,e=s,n=s.next;if(Ae(t,e,n)>=0)return!1;const i=t.x,r=e.x,o=n.x,a=t.y,h=e.y,c=n.y,l=i<r?i<o?i:o:r<o?r:o,u=a<h?a<c?a:c:h<c?h:c,f=i>r?i>o?i:o:r>o?r:o,d=a>h?a>c?a:c:h>c?h:c;let g=n.next;for(;g!==t;){if(g.x>=l&&g.x<=f&&g.y>=u&&g.y<=d&&fs(i,a,r,h,o,c,g.x,g.y)&&Ae(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function c1(s,t,e,n){const i=s.prev,r=s,o=s.next;if(Ae(i,r,o)>=0)return!1;const a=i.x,h=r.x,c=o.x,l=i.y,u=r.y,f=o.y,d=a<h?a<c?a:c:h<c?h:c,g=l<u?l<f?l:f:u<f?u:f,x=a>h?a>c?a:c:h>c?h:c,m=l>u?l>f?l:f:u>f?u:f,p=Ro(d,g,t,e,n),M=Ro(x,m,t,e,n);let _=s.prevZ,v=s.nextZ;for(;_&&_.z>=p&&v&&v.z<=M;){if(_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&fs(a,l,h,u,c,f,_.x,_.y)&&Ae(_.prev,_,_.next)>=0||(_=_.prevZ,v.x>=d&&v.x<=x&&v.y>=g&&v.y<=m&&v!==i&&v!==o&&fs(a,l,h,u,c,f,v.x,v.y)&&Ae(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;_&&_.z>=p;){if(_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&fs(a,l,h,u,c,f,_.x,_.y)&&Ae(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;v&&v.z<=M;){if(v.x>=d&&v.x<=x&&v.y>=g&&v.y<=m&&v!==i&&v!==o&&fs(a,l,h,u,c,f,v.x,v.y)&&Ae(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function h1(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!ma(i,r)&&su(i,n,n.next,r)&&rr(i,r)&&rr(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ar(n),ar(n.next),n=s=r),n=n.next}while(n!==s);return zi(n)}function u1(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&_1(o,a)){let h=ru(o,a);o=zi(o,o.next),h=zi(h,h.next),sr(o,t,e,n,i,r,0),sr(h,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function f1(s,t,e,n){const i=[];let r,o,a,h,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,h=r<o-1?t[r+1]*n:s.length,c=iu(s,a,h,n,!1),c===c.next&&(c.steiner=!0),i.push(M1(c));for(i.sort(d1),r=0;r<i.length;r++)e=p1(i[r],e);return e}function d1(s,t){return s.x-t.x}function p1(s,t){const e=m1(s,t);if(!e)return t;const n=ru(e,s);return zi(n,n.next),zi(e,e.next)}function m1(s,t){let e=t,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,i=e.x<e.next.x?e:e.next,f===r))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,h=i.x,c=i.y;let l=1/0,u;e=i;do r>=e.x&&e.x>=h&&r!==e.x&&fs(o<c?r:n,o,h,c,o<c?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),rr(e,s)&&(u<l||u===l&&(e.x>i.x||e.x===i.x&&g1(i,e)))&&(i=e,l=u)),e=e.next;while(e!==a);return i}function g1(s,t){return Ae(s.prev,s,t.prev)<0&&Ae(t.next,s,s.next)<0}function x1(s,t,e,n){let i=s;do i.z===0&&(i.z=Ro(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,v1(i)}function v1(s){let t,e,n,i,r,o,a,h,c=1;do{for(e=s,s=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(h=c;a>0||h>0&&n;)a!==0&&(h===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,h--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(o>1);return s}function Ro(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function M1(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function fs(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function _1(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!y1(s,t)&&(rr(s,t)&&rr(t,s)&&S1(s,t)&&(Ae(s.prev,s,t.prev)||Ae(s,t.prev,t))||ma(s,t)&&Ae(s.prev,s,s.next)>0&&Ae(t.prev,t,t.next)>0)}function Ae(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function ma(s,t){return s.x===t.x&&s.y===t.y}function su(s,t,e,n){const i=Wr(Ae(s,t,e)),r=Wr(Ae(s,t,n)),o=Wr(Ae(e,n,s)),a=Wr(Ae(e,n,t));return!!(i!==r&&o!==a||i===0&&Vr(s,e,t)||r===0&&Vr(s,n,t)||o===0&&Vr(e,s,n)||a===0&&Vr(e,t,n))}function Vr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Wr(s){return s>0?1:s<0?-1:0}function y1(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&su(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function rr(s,t){return Ae(s.prev,s,s.next)<0?Ae(s,t,s.next)>=0&&Ae(s,s.prev,t)>=0:Ae(s,t,s.prev)<0||Ae(s,s.next,t)<0}function S1(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function ru(s,t){const e=new Co(s.i,s.x,s.y),n=new Co(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function qc(s,t,e,n){const i=new Co(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ar(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Co(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function w1(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class Nn{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Nn.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];$c(t),Yc(n,t);let o=t.length;e.forEach($c);for(let h=0;h<e.length;h++)i.push(o),o+=e[h].length,Yc(n,e[h]);const a=o1.triangulate(n,i);for(let h=0;h<a.length;h+=3)r.push(a.slice(h,h+3));return r}}function $c(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Yc(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class ga extends de{constructor(t=new fr([new ut(.5,.5),new ut(-.5,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let a=0,h=t.length;a<h;a++){const c=t[a];o(c)}this.setAttribute("position",new te(i,3)),this.setAttribute("uv",new te(r,2)),this.computeVertexNormals();function o(a){const h=[],c=e.curveSegments!==void 0?e.curveSegments:12,l=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:b1;let _,v=!1,y,S,w,T;p&&(_=p.getSpacedPoints(l),v=!0,f=!1,y=p.computeFrenetFrames(l,!1),S=new U,w=new U,T=new U),f||(m=0,d=0,g=0,x=0);const b=a.extractPoints(c);let E=b.shape;const C=b.holes;if(!Nn.isClockWise(E)){E=E.reverse();for(let k=0,ft=C.length;k<ft;k++){const Q=C[k];Nn.isClockWise(Q)&&(C[k]=Q.reverse())}}const F=Nn.triangulateShape(E,C),A=E;for(let k=0,ft=C.length;k<ft;k++){const Q=C[k];E=E.concat(Q)}function L(k,ft,Q){return ft||console.error("THREE.ExtrudeGeometry: vec does not exist"),k.clone().addScaledVector(ft,Q)}const N=E.length,z=F.length;function O(k,ft,Q){let at,st,At;const yt=k.x-ft.x,P=k.y-ft.y,R=Q.x-k.x,X=Q.y-k.y,ct=yt*yt+P*P,et=yt*X-P*R;if(Math.abs(et)>Number.EPSILON){const tt=Math.sqrt(ct),ot=Math.sqrt(R*R+X*X),ht=ft.x-P/tt,vt=ft.y+yt/tt,Ct=Q.x-X/ot,Ut=Q.y+R/ot,lt=((Ct-ht)*X-(Ut-vt)*R)/(yt*X-P*R);at=ht+yt*lt-k.x,st=vt+P*lt-k.y;const $t=at*at+st*st;if($t<=2)return new ut(at,st);At=Math.sqrt($t/2)}else{let tt=!1;yt>Number.EPSILON?R>Number.EPSILON&&(tt=!0):yt<-Number.EPSILON?R<-Number.EPSILON&&(tt=!0):Math.sign(P)===Math.sign(X)&&(tt=!0),tt?(at=-P,st=yt,At=Math.sqrt(ct)):(at=yt,st=P,At=Math.sqrt(ct/2))}return new ut(at/At,st/At)}const H=[];for(let k=0,ft=A.length,Q=ft-1,at=k+1;k<ft;k++,Q++,at++)Q===ft&&(Q=0),at===ft&&(at=0),H[k]=O(A[k],A[Q],A[at]);const V=[];let G,Y=H.concat();for(let k=0,ft=C.length;k<ft;k++){const Q=C[k];G=[];for(let at=0,st=Q.length,At=st-1,yt=at+1;at<st;at++,At++,yt++)At===st&&(At=0),yt===st&&(yt=0),G[at]=O(Q[at],Q[At],Q[yt]);V.push(G),Y=Y.concat(G)}for(let k=0;k<m;k++){const ft=k/m,Q=d*Math.cos(ft*Math.PI/2),at=g*Math.sin(ft*Math.PI/2)+x;for(let st=0,At=A.length;st<At;st++){const yt=L(A[st],H[st],at);gt(yt.x,yt.y,-Q)}for(let st=0,At=C.length;st<At;st++){const yt=C[st];G=V[st];for(let P=0,R=yt.length;P<R;P++){const X=L(yt[P],G[P],at);gt(X.x,X.y,-Q)}}}const W=g+x;for(let k=0;k<N;k++){const ft=f?L(E[k],Y[k],W):E[k];v?(w.copy(y.normals[0]).multiplyScalar(ft.x),S.copy(y.binormals[0]).multiplyScalar(ft.y),T.copy(_[0]).add(w).add(S),gt(T.x,T.y,T.z)):gt(ft.x,ft.y,0)}for(let k=1;k<=l;k++)for(let ft=0;ft<N;ft++){const Q=f?L(E[ft],Y[ft],W):E[ft];v?(w.copy(y.normals[k]).multiplyScalar(Q.x),S.copy(y.binormals[k]).multiplyScalar(Q.y),T.copy(_[k]).add(w).add(S),gt(T.x,T.y,T.z)):gt(Q.x,Q.y,u/l*k)}for(let k=m-1;k>=0;k--){const ft=k/m,Q=d*Math.cos(ft*Math.PI/2),at=g*Math.sin(ft*Math.PI/2)+x;for(let st=0,At=A.length;st<At;st++){const yt=L(A[st],H[st],at);gt(yt.x,yt.y,u+Q)}for(let st=0,At=C.length;st<At;st++){const yt=C[st];G=V[st];for(let P=0,R=yt.length;P<R;P++){const X=L(yt[P],G[P],at);v?gt(X.x,X.y+_[l-1].y,_[l-1].x+Q):gt(X.x,X.y,u+Q)}}}$(),it();function $(){const k=i.length/3;if(f){let ft=0,Q=N*ft;for(let at=0;at<z;at++){const st=F[at];Pt(st[2]+Q,st[1]+Q,st[0]+Q)}ft=l+m*2,Q=N*ft;for(let at=0;at<z;at++){const st=F[at];Pt(st[0]+Q,st[1]+Q,st[2]+Q)}}else{for(let ft=0;ft<z;ft++){const Q=F[ft];Pt(Q[2],Q[1],Q[0])}for(let ft=0;ft<z;ft++){const Q=F[ft];Pt(Q[0]+N*l,Q[1]+N*l,Q[2]+N*l)}}n.addGroup(k,i.length/3-k,0)}function it(){const k=i.length/3;let ft=0;Mt(A,ft),ft+=A.length;for(let Q=0,at=C.length;Q<at;Q++){const st=C[Q];Mt(st,ft),ft+=st.length}n.addGroup(k,i.length/3-k,1)}function Mt(k,ft){let Q=k.length;for(;--Q>=0;){const at=Q;let st=Q-1;st<0&&(st=k.length-1);for(let At=0,yt=l+m*2;At<yt;At++){const P=N*At,R=N*(At+1),X=ft+at+P,ct=ft+st+P,et=ft+st+R,tt=ft+at+R;Rt(X,ct,et,tt)}}}function gt(k,ft,Q){h.push(k),h.push(ft),h.push(Q)}function Pt(k,ft,Q){dt(k),dt(ft),dt(Q);const at=i.length/3,st=M.generateTopUV(n,i,at-3,at-2,at-1);Tt(st[0]),Tt(st[1]),Tt(st[2])}function Rt(k,ft,Q,at){dt(k),dt(ft),dt(at),dt(ft),dt(Q),dt(at);const st=i.length/3,At=M.generateSideWallUV(n,i,st-6,st-3,st-2,st-1);Tt(At[0]),Tt(At[1]),Tt(At[3]),Tt(At[1]),Tt(At[2]),Tt(At[3])}function dt(k){i.push(h[k*3+0]),i.push(h[k*3+1]),i.push(h[k*3+2])}function Tt(k){r.push(k.x),r.push(k.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return E1(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Ao[i.type]().fromJSON(i)),new ga(n,t.options)}}const b1={generateTopUV:function(s,t,e,n,i){const r=t[e*3],o=t[e*3+1],a=t[n*3],h=t[n*3+1],c=t[i*3],l=t[i*3+1];return[new ut(r,o),new ut(a,h),new ut(c,l)]},generateSideWallUV:function(s,t,e,n,i,r){const o=t[e*3],a=t[e*3+1],h=t[e*3+2],c=t[n*3],l=t[n*3+1],u=t[n*3+2],f=t[i*3],d=t[i*3+1],g=t[i*3+2],x=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-l)<Math.abs(o-c)?[new ut(o,1-h),new ut(c,1-u),new ut(f,1-g),new ut(x,1-p)]:[new ut(a,1-h),new ut(l,1-u),new ut(d,1-g),new ut(m,1-p)]}};function E1(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class xa extends il{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new xa(t.radius,t.detail)}}class sl extends de{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],h=[],c=[],l=[];let u=t;const f=(e-t)/i,d=new U,g=new ut;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){const p=r+m/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),h.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,l.push(g.x,g.y)}u+=f}for(let x=0;x<i;x++){const m=x*(n+1);for(let p=0;p<n;p++){const M=p+m,_=M,v=M+n+1,y=M+n+2,S=M+1;a.push(_,v,S),a.push(v,y,S)}}this.setIndex(a),this.setAttribute("position",new te(h,3)),this.setAttribute("normal",new te(c,3)),this.setAttribute("uv",new te(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sl(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class rl extends de{constructor(t=new fr([new ut(0,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],o=[];let a=0,h=0;if(Array.isArray(t)===!1)c(t);else for(let l=0;l<t.length;l++)c(t[l]),this.addGroup(a,h,l),a+=h,h=0;this.setIndex(n),this.setAttribute("position",new te(i,3)),this.setAttribute("normal",new te(r,3)),this.setAttribute("uv",new te(o,2));function c(l){const u=i.length/3,f=l.extractPoints(e);let d=f.shape;const g=f.holes;Nn.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const M=g[m];Nn.isClockWise(M)===!0&&(g[m]=M.reverse())}const x=Nn.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const M=g[m];d=d.concat(M)}for(let m=0,p=d.length;m<p;m++){const M=d[m];i.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let m=0,p=x.length;m<p;m++){const M=x[m],_=M[0]+u,v=M[1]+u,y=M[2]+u;n.push(_,v,y),h+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return T1(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const o=e[t.shapes[i]];n.push(o)}return new rl(n,t.curveSegments)}}function T1(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class ke extends de{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const h=Math.min(o+a,Math.PI);let c=0;const l=[],u=new U,f=new U,d=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const M=[],_=p/n;let v=0;p===0&&o===0?v=.5/e:p===n&&h===Math.PI&&(v=-.5/e);for(let y=0;y<=e;y++){const S=y/e;u.x=-t*Math.cos(i+S*r)*Math.sin(o+_*a),u.y=t*Math.cos(o+_*a),u.z=t*Math.sin(i+S*r)*Math.sin(o+_*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),m.push(S+v,1-_),M.push(c++)}l.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const _=l[p][M+1],v=l[p][M],y=l[p+1][M],S=l[p+1][M+1];(p!==0||o>0)&&d.push(_,v,S),(p!==n-1||h<Math.PI)&&d.push(v,y,S)}this.setIndex(d),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(x,3)),this.setAttribute("uv",new te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ke(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class al extends de{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],h=[],c=[],l=new U,u=new U,f=new U;for(let d=0;d<=n;d++)for(let g=0;g<=i;g++){const x=g/i*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),l.x=t*Math.cos(x),l.y=t*Math.sin(x),f.subVectors(u,l).normalize(),h.push(f.x,f.y,f.z),c.push(g/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=i;g++){const x=(i+1)*d+g-1,m=(i+1)*(d-1)+g-1,p=(i+1)*(d-1)+g,M=(i+1)*d+g;o.push(x,m,M),o.push(m,p,M)}this.setIndex(o),this.setAttribute("position",new te(a,3)),this.setAttribute("normal",new te(h,3)),this.setAttribute("uv",new te(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new al(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class wt extends mi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rh,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class or extends wt{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ut(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ge(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Wt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Wt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Wt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}const jc={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class A1{constructor(t,e,n){const i=this;let r=!1,o=0,a=0,h;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(l){a++,r===!1&&i.onStart!==void 0&&i.onStart(l,o,a),r=!0},this.itemEnd=function(l){o++,i.onProgress!==void 0&&i.onProgress(l,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(l){i.onError!==void 0&&i.onError(l)},this.resolveURL=function(l){return h?h(l):l},this.setURLModifier=function(l){return h=l,this},this.addHandler=function(l,u){return c.push(l,u),this},this.removeHandler=function(l){const u=c.indexOf(l);return u!==-1&&c.splice(u,2),this},this.getHandler=function(l){for(let u=0,f=c.length;u<f;u+=2){const d=c[u],g=c[u+1];if(d.global&&(d.lastIndex=0),d.test(l))return g}return null}}}const R1=new A1;class ol{constructor(t){this.manager=t!==void 0?t:R1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}ol.DEFAULT_MATERIAL_NAME="__DEFAULT";class C1 extends ol{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=jc.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=er("img");function h(){l(),jc.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(u){l(),i&&i(u),r.manager.itemError(t),r.manager.itemEnd(t)}function l(){a.removeEventListener("load",h,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",h,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class au extends ol{constructor(t){super(t)}load(t,e,n,i){const r=new an,o=new C1(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class va extends Le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class P1 extends va{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const io=new se,Zc=new U,Kc=new U;class ll{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $o,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Zc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Zc),Kc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Kc),e.updateMatrixWorld(),io.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(io),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(io)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class L1 extends ll{constructor(){super(new ln(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=ys*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Jc extends va{constructor(t,e,n=0,i=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new L1}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Qc=new se,Os=new U,so=new U;class D1 extends ll{constructor(){super(new ln(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ut(4,2),this._viewportCount=6,this._viewports=[new fe(2,1,1,1),new fe(0,1,1,1),new fe(3,1,1,1),new fe(1,1,1,1),new fe(3,0,1,1),new fe(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Os.setFromMatrixPosition(t.matrixWorld),n.position.copy(Os),so.copy(n.position),so.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(so),n.updateMatrixWorld(),i.makeTranslation(-Os.x,-Os.y,-Os.z),Qc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qc)}}class ou extends va{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new D1}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class I1 extends ll{constructor(){super(new Vh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class U1 extends va{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.shadow=new I1}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class z1{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=th(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=th();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function th(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ho}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ho);class Ma extends xt{constructor(){const t=Ma.SkyShader,e=new Fn({name:t.name,uniforms:kh.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:Qe,depthWrite:!1});super(new Qt(1,1,1),e),this.isSky=!0}}Ma.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new U},up:{value:new U(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var Ni,lu,Po;class N1{constructor(t){Gi(this,Ni);this.keys=new Set,this.move={x:0,y:0},this.look={dx:0,dy:0},this.buttons={run:!1,action:!1,brake:!1,jump:!1,left:!1,right:!1,gas:!1,rev:!1},this.pressed=new Set,this.touch=matchMedia("(pointer: coarse)").matches||"ontouchstart"in window,addEventListener("keydown",e=>{this.keys.has(e.code)||this.pressed.add(e.code),this.keys.add(e.code),["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.code)&&e.preventDefault()}),addEventListener("keyup",e=>this.keys.delete(e.code)),addEventListener("blur",()=>this.keys.clear()),t.addEventListener("click",()=>{var e;!this.touch&&document.pointerLockElement!==t&&((e=t.requestPointerLock)==null||e.call(t))}),addEventListener("mousemove",e=>{document.pointerLockElement===t&&(this.look.dx+=e.movementX,this.look.dy+=e.movementY)}),this.touch&&ve(this,Ni,lu).call(this,t)}axes(){const t=this.keys;let e=(t.has("KeyD")||t.has("ArrowRight")?1:0)-(t.has("KeyA")||t.has("ArrowLeft")?1:0),n=(t.has("KeyW")||t.has("ArrowUp")?1:0)-(t.has("KeyS")||t.has("ArrowDown")?1:0);e+=this.move.x,n+=this.driving?0:this.move.y;const i=this.buttons;return e+=(i.right?1:0)-(i.left?1:0),n+=(i.gas?1:0)-(i.rev?1:0),{x:Math.max(-1,Math.min(1,e)),y:Math.max(-1,Math.min(1,n))}}get run(){return this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")||this.buttons.run||Math.hypot(this.move.x,this.move.y)>.95}get brake(){return this.keys.has("Space")||this.buttons.brake||this.buttons.jump}wasPressed(...t){return t.some(e=>this.pressed.has(e))}consumeLook(){const t={...this.look};return this.look.dx=this.look.dy=0,t}endFrame(){this.pressed.clear()}}Ni=new WeakSet,lu=function(t){document.body.classList.add("touch");const e=document.getElementById("stick"),n=document.getElementById("knob");let i=null,r=null,o=0,a=0,h=0,c=0;const l=55;e.addEventListener("touchstart",f=>{const d=f.changedTouches[0];i=d.identifier;const g=e.getBoundingClientRect();o=g.left+g.width/2,a=g.top+g.height/2,ve(this,Ni,Po).call(this,d,o,a,l,n),f.preventDefault()},{passive:!1}),t.addEventListener("touchstart",f=>{for(const d of f.changedTouches)r===null&&(r=d.identifier,h=d.clientX,c=d.clientY);f.preventDefault()},{passive:!1}),addEventListener("touchmove",f=>{var d,g;for(const x of f.changedTouches)x.identifier===i?ve(this,Ni,Po).call(this,x,o,a,l,n):x.identifier===r&&(this.look.dx+=(x.clientX-h)*1.6,this.look.dy+=(x.clientY-c)*1.6,h=x.clientX,c=x.clientY);(g=(d=f.target).closest)!=null&&g.call(d,"#maps")||f.preventDefault()},{passive:!1});const u=f=>{for(const d of f.changedTouches)d.identifier===i&&(i=null,this.move.x=this.move.y=0,n.style.transform=""),d.identifier===r&&(r=null)};addEventListener("touchend",u),addEventListener("touchcancel",u);for(const f of document.querySelectorAll("[data-btn]")){const d=f.dataset.btn;f.addEventListener("touchstart",x=>{this.buttons[d]=!0,this.pressed.add("btn:"+d),f.classList.add("on"),x.preventDefault(),x.stopPropagation()},{passive:!1});const g=x=>{this.buttons[d]=!1,f.classList.remove("on"),x.preventDefault()};f.addEventListener("touchend",g),f.addEventListener("touchcancel",g)}},Po=function(t,e,n,i,r){let o=t.clientX-e,a=t.clientY-n;const h=Math.hypot(o,a);h>i&&(o*=i/h,a*=i/h),r.style.transform=`translate(${o}px, ${a}px)`,this.move.x=o/i,this.move.y=-a/i};function Oe(s){let t=s>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function De(s,t){const e=document.createElement("canvas");return e.width=s,e.height=t,[e,e.getContext("2d")]}function Ie(s,t=!0,e=!0){const n=new Sn(s);return t&&(n.wrapS=n.wrapT=Ms),e&&(n.colorSpace=Me),n.anisotropy=4,n}function ro(s,t,e,n,i,r=1,o="#a99d8a"){s.fillStyle=o,s.fillRect(0,0,t,e);for(let h=0;h<2500;h++){const c=n()<.5?"rgba(70,60,50,0.10)":"rgba(235,228,214,0.12)";s.fillStyle=c,s.fillRect(n()*t,n()*e,1+n()*3,1+n()*3)}let a=-4;for(;a<e;){const h=(9+n()*14)*r;let c=-n()*40*r;for(;c<t;){const l=(22+n()*52)*r,u=h*(.7+n()*.35),f=i[Math.floor(n()*i.length)],d=(n()-.5)*26;s.fillStyle=`rgb(${f[0]+d|0},${f[1]+d|0},${f[2]+d|0})`;const g=()=>(n()-.5)*5,x=c+2.5,m=c+l-2.5,p=a+2+n()*2,M=p+u-3;s.beginPath(),s.moveTo(x+g(),p+2+g()),s.lineTo(x+l*.3+g(),p+g()),s.lineTo(m-2+g(),p+1+g()),s.lineTo(m+g(),(p+M)/2+g()),s.lineTo(m-3+g(),M+g()),s.lineTo(x+l*.5+g(),M+1+g()),s.lineTo(x+1+g(),M-1+g()),s.closePath(),s.fill();for(let _=0;_<3;_++)s.fillStyle=n()<.5?"rgba(120,60,30,0.18)":"rgba(240,220,190,0.12)",s.fillRect(x+n()*(l-8),p+n()*(u-5),4+n()*14,1+n()*3);s.fillStyle="rgba(0,0,0,0.16)",s.fillRect(x+2,M-2,l-9,2),s.fillStyle="rgba(255,240,220,0.10)",s.fillRect(x+3,p+1,l-10,2),c+=l}a+=h}}const F1=[[184,128,88],[166,112,76],[156,124,96],[134,112,92],[182,150,116],[118,102,88],[160,100,66],[196,162,126],[146,136,122],[128,120,110]],O1=[[150,130,110],[132,116,98],[170,140,104],[118,106,94],[176,150,120],[108,96,86],[160,120,84],[140,122,100]];function cu(s,t,e,n,i,r,o=30){s.fillStyle="#c9b49a",s.fillRect(t-o,e-o,n+2*o,i+o+6);for(let a=e-o,h=0;a<e+i+6;a+=9,h++)for(let c=t-o-h%2*14;c<t+n+o;c+=28){if(c+26>t&&c<t+n&&a+8>e&&a<e+i)continue;const u=(r()-.5)*34;s.fillStyle=`rgb(${182+u|0},${96+u*.5|0},${66+u*.4|0})`,s.fillRect(Math.max(t-o,c)+1,a+1,Math.min(26,t+n+o-c-1),7)}}function ao(s,t,e,n,i,r,o=!1){if(cu(s,t,e,n,i,r),s.fillStyle="#b8b2a6",s.fillRect(t-6,e+i,n+12,8),r()<.45){s.fillStyle="#1d1f22",s.fillRect(t,e,n,i);const a=i*(.45+r()*.5);s.fillStyle="#e9e7e1",s.fillRect(t,e,n,a),s.fillStyle="rgba(0,0,0,0.12)";for(let h=4;h<a;h+=5)s.fillRect(t,e+h,n,1);s.fillStyle="#6b4223",s.fillRect(t,e+a,n,3)}else{s.fillStyle="#6b4223",s.fillRect(t,e,n,i);for(const a of[t+6,t+n/2+3]){const h=s.createLinearGradient(0,e,0,e+i);h.addColorStop(0,"#6f8798"),h.addColorStop(.5,"#34414c"),h.addColorStop(1,"#262d33"),s.fillStyle=h,s.fillRect(a,e+6,n/2-9,i-12)}s.fillStyle="#6b4223",s.fillRect(t+6,e+i/2-2,n-12,4)}if(o){s.fillStyle="#2a2420";for(let a=8;a<n;a+=13)s.fillRect(t+a,e-2,3,i+4);s.fillRect(t,e+10,n,3),s.fillRect(t,e+i-12,n,3)}}function k1(s,t,e,n,i,r){cu(s,t,e,n,i,r);const o=["#8a5a30","#6e4526","#7a4a2a","#5e3d22"][Math.floor(r()*4)];s.fillStyle="#20262c",s.fillRect(t,e,n,26),s.fillStyle=o,s.fillRect(t,e+26,n,i-26),s.fillStyle="rgba(0,0,0,0.35)",s.fillRect(t+n/2-1,e+26,2,i-26);for(const a of[8,n/2+8])for(let h=0;h<3;h++)s.strokeStyle="rgba(0,0,0,0.3)",s.lineWidth=2,s.strokeRect(t+a,e+40+h*((i-50)/3),n/2-16,(i-50)/3-10);s.fillStyle="#c9a640",s.fillRect(t+n/2+6,e+i*.55,10,4)}function B1(s){const t=s.capabilities.getMaxAnisotropy(),e={},n=(h,c)=>{ao(h,200,110,110,160,c)},i=(h,c)=>{k1(h,120,102,150,282,c),ao(h,470,120,105,150,c,!0),ao(h,830,120,105,150,c,!0)},r=(h,c,l)=>ro(h,l,384,c,O1,1.7,"#bfae92"),o=(h,c,l)=>{h.fillStyle="#d9cfbd",h.fillRect(0,0,l,384);for(let u=0;u<8e3;u++)h.fillStyle=`rgba(${c()<.5?0:255},${c()<.5?0:240},200,0.05)`,h.fillRect(c()*l,c()*384,2+c()*5,2+c()*5)};for(const[h,c,l,u]of[["facade",r,n,7],["facadeGround",r,i,8],["facadePlaster",o,n,11],["facadePlasterGround",o,i,12]]){const f=l===i?1024:512,[d,g]=De(f,384),x=Oe(u);c(g,x,f),h==="facadePlasterGround"&&(g.fillStyle="rgba(80,60,40,0.25)",g.fillRect(0,330,f,54)),l(g,x),e[h]=Ie(d);const[m,p]=De(f/4,96);p.fillStyle="#000",p.fillRect(0,0,f/4,96);const M=(_,v,y,S)=>{const w=p.createRadialGradient((_+y/2)/4,(v+S/2)/4,2,(_+y/2)/4,(v+S/2)/4,S/5);w.addColorStop(0,"#ffd890"),w.addColorStop(1,"#c87a30"),p.fillStyle=w,p.fillRect(_/4,v/4,y/4,S/4)};l===n?M(200,110,110,160):(M(470,120,105,150),M(830,120,105,150)),e[h+"Night"]=Ie(m)}{const[h,c]=De(256,64),l=Oe(77);c.fillStyle="#cdb89c",c.fillRect(0,0,256,64);for(let u=0,f=0;u<64;u+=9,f++)for(let d=-(f%2)*14;d<256;d+=28){const g=(l()-.5)*34;c.fillStyle=`rgb(${182+g|0},${96+g*.5|0},${66+g*.4|0})`,c.fillRect(d+1,u+1,26,7)}e.brick=Ie(h)}{const[h,c]=De(512,384),l=Oe(61);ro(c,512,384,l,[[196,170,136],[182,150,112],[204,178,142],[168,140,108],[150,136,118],[190,140,100],[210,188,156],[140,126,110]],1.45,"#d4cab6");for(let u=0;u<60;u++)c.fillStyle=l()<.5?"rgba(220,214,200,0.25)":"rgba(70,74,60,0.12)",c.beginPath(),c.arc(l()*512,l()*384,3+l()*16,0,7),c.fill();e.churchStone=Ie(h)}{const[h,c]=De(512,384),l=Oe(51);c.fillStyle="#8e8573",c.fillRect(0,0,512,384);for(let u=0;u<384;u+=48)for(let f=u/48%2?-50:0;f<512;f+=100){const d=(l()-.5)*26,g=96;c.fillStyle=`rgb(${172+d|0},${160+d|0},${138+d|0})`,c.fillRect(f+2,u+2,g,44);for(let x=0;x<40;x++)c.fillStyle=`rgba(${l()<.5?60:230},${l()<.5?60:220},${l()<.5?50:200},0.12)`,c.fillRect(f+2+l()*g,u+2+l()*42,2+l()*4,2+l()*3);c.fillStyle="rgba(0,0,0,0.12)",c.fillRect(f+2,u+40,g,6),l()<.2&&(c.fillStyle="rgba(70,80,50,0.18)",c.fillRect(f+2,u+2,g,44))}e.ashlar=Ie(h)}{const[h,c]=De(512,512),l=Oe(3);ro(c,512,512,l,F1),e.stone=Ie(h)}{const[h,c]=De(512,512),l=Oe(13),u=512/7.5,f=u/2;c.fillStyle="#8d8c87",c.fillRect(0,0,512,512);for(let d=0,g=0;d<512;d+=f,g++)for(let x=g%2*-u/2;x<512;x+=u){const m=150+(l()-.5)*24;c.fillStyle=`rgb(${m},${m-2},${m-6})`,c.fillRect(x+2,d+2,u-3,f-3);for(let p=0;p<25;p++)c.fillStyle=l()<.5?"rgba(60,60,60,0.12)":"rgba(230,230,225,0.12)",c.fillRect(x+2+l()*(u-4),d+2+l()*(f-4),1+l()*2,1+l()*2)}e.block=Ie(h)}{const[h,c]=De(256,256),l=Oe(21);c.fillStyle="#8b8a86",c.fillRect(0,0,256,256);for(let u=0;u<9;u++)c.fillStyle=l()<.5?"rgba(60,60,58,0.15)":"rgba(200,198,190,0.12)",c.beginPath(),c.arc(l()*256,l()*256,20+l()*60,0,7),c.fill();for(let u=0;u<9e3;u++){const f=l(),d=f<.15?40+l()*30:f<.45?190+l()*50:110+l()*50;c.fillStyle=`rgba(${d|0},${d|0},${d-3|0},0.7)`,c.fillRect(l()*256,l()*256,1+l()*2.5,1+l()*2.5)}for(let u=0;u<14;u++)c.fillStyle=l()<.6?"rgba(190,185,120,0.25)":"rgba(230,230,220,0.25)",c.beginPath(),c.arc(l()*256,l()*256,3+l()*10,0,7),c.fill();e.granite=Ie(h)}{const[h,c]=De(256,256),l=Oe(5);c.fillStyle="#6e3422",c.fillRect(0,0,256,256);for(let u=0;u<256;u+=16)for(let f=0;f<256;f+=16){const d=(l()-.5)*40,g=u/16%2?8:0,x=c.createLinearGradient(f+g,0,f+g+16,0);x.addColorStop(0,`rgb(${132+d},${64+d/2},${42+d/3})`),x.addColorStop(.5,`rgb(${192+d},${106+d/2},${70+d/3})`),x.addColorStop(1,`rgb(${110+d},${48+d/2},${30+d/3})`),c.fillStyle=x,c.fillRect(f+g,u,15,15),c.fillStyle="rgba(0,0,0,0.35)",c.fillRect(f+g,u+14,16,2),l()<.08&&(c.fillStyle="rgba(60,70,40,0.35)",c.fillRect(f+g,u,15,15))}e.roof=Ie(h)}{const[h,c]=De(256,256),l=Oe(9);c.fillStyle="#5e5d59",c.fillRect(0,0,256,256);for(let u=0;u<5;u++){c.fillStyle=l()<.5?"rgba(40,40,42,0.18)":"rgba(160,150,135,0.12)";const f=l()*256,d=l()*256;c.fillRect(f,d,30+l()*80,20+l()*60)}for(let u=0;u<11e3;u++){const f=60+l()*75|0;c.fillStyle=`rgba(${f+4},${f},${f-4},0.5)`,c.fillRect(l()*256,l()*256,1+l()*2,1+l()*2)}for(let u=0;u<6;u++){c.strokeStyle="rgba(25,25,25,0.4)",c.lineWidth=1,c.beginPath();let f=l()*256,d=l()*256;c.moveTo(f,d);for(let g=0;g<6;g++)f+=(l()-.5)*40,d+=(l()-.5)*40,c.lineTo(f,d);c.stroke()}e.asphalt=Ie(h)}{const[h,c]=De(256,256),l=Oe(13);c.fillStyle="#a6a196",c.fillRect(0,0,256,256);for(let u=0;u<7e3;u++){const f=120+l()*60|0;c.fillStyle=`rgba(${f},${f-4},${f-12},0.35)`,c.fillRect(l()*256,l()*256,1+l()*3,1+l()*3)}c.fillStyle="rgba(40,35,30,0.35)",c.fillRect(0,0,256,2);for(let u=0;u<10;u++)c.fillStyle="rgba(70,60,50,0.06)",c.beginPath(),c.arc(l()*256,l()*256,4+l()*14,0,7),c.fill();e.concrete=Ie(h)}{const[h,c]=De(256,256),l=Oe(17);c.fillStyle="#b08c62",c.fillRect(0,0,256,256);for(let u=0;u<8e3;u++){const f=(l()-.5)*60;c.fillStyle=`rgba(${170+f|0},${135+f|0},${95+f|0},0.5)`,c.fillRect(l()*256,l()*256,1+l()*3,1+l()*3)}e.dirt=Ie(h)}{const[h,c]=De(256,256),l=Oe(29);c.fillStyle="#5f7f34",c.fillRect(0,0,256,256);for(let u=0;u<9e3;u++){const f=(l()-.5)*50,d=l()*256,g=l()*256;c.strokeStyle=`rgba(${90+f|0},${130+f|0},${55+f*.6|0},0.6)`,c.lineWidth=1,c.beginPath(),c.moveTo(d,g),c.lineTo(d+(l()-.5)*3,g-2-l()*4),c.stroke()}for(let u=0;u<30;u++)c.fillStyle="rgba(150,140,80,0.12)",c.beginPath(),c.arc(l()*256,l()*256,6+l()*20,0,7),c.fill();e.grass=Ie(h)}{const[h,c]=De(256,256),l=Oe(31);c.fillStyle="#a9a397",c.fillRect(0,0,256,256);for(let u=0;u<3500;u++){const f=120+l()*110|0,d=1.5+l()*3.5;c.fillStyle=`rgb(${f},${f-4|0},${f-12|0})`,c.beginPath(),c.ellipse(l()*256,l()*256,d,d*(.6+l()*.4),l()*3,0,7),c.fill(),c.fillStyle="rgba(40,35,30,0.25)"}e.gravel=Ie(h)}{const[h,c]=De(256,256),l=Oe(21);c.fillStyle="#808080",c.fillRect(0,0,256,256);for(let u=0;u<14e3;u++){const f=100+l()*60|0;c.fillStyle=`rgba(${f},${f},${f},0.45)`,c.fillRect(l()*256,l()*256,1,1+l()*4)}e.detail=Ie(h,!0,!1)}{const[h,c]=De(128,128),l=Oe(23);c.fillStyle="#2f3d22",c.fillRect(0,0,128,128);for(let u=0;u<1500;u++){const f=(l()-.4)*50;c.fillStyle=`rgb(${55+f|0},${75+f|0},${38+f/2|0})`,c.beginPath(),c.ellipse(l()*128,l()*128,2+l()*3,1+l()*2,l()*3,0,7),c.fill()}e.leaves=Ie(h)}{const[h,c]=De(64,128),l=Oe(29);c.fillStyle="#4a3b2e",c.fillRect(0,0,64,128);for(let u=0;u<60;u++)c.fillStyle=`rgba(20,15,10,${.2+l()*.3})`,c.fillRect(l()*64,0,1+l()*3,128);e.bark=Ie(h)}const a=["#e9e1cf","#d9c9a8","#cfd2cc","#e4d2bd","#c7a98a","#bfc4c9","#efe9de","#d8b79a"];e.urban=a.map((h,c)=>{const[l,u]=De(256,256),f=Oe(100+c),d=c===4||c===7;if(u.fillStyle=h,u.fillRect(0,0,256,256),d)for(let y=0;y<256;y+=8)for(let S=y/8%2?-10:0;S<256;S+=20){const w=(f()-.5)*30;u.fillStyle=`rgb(${165+w|0},${90+w/2|0},${65+w/3|0})`,u.fillRect(S+1,y+1,18,6)}for(let y=0;y<1500;y++)u.fillStyle=`rgba(0,0,0,${f()*.05})`,u.fillRect(f()*256,f()*256,2+f()*6,2+f()*6);const g=u.createLinearGradient(0,200,0,256);g.addColorStop(0,"rgba(60,60,50,0.18)"),g.addColorStop(1,"rgba(60,60,50,0)"),u.fillStyle=g,u.fillRect(70,200,116,56);const x=c%3===0,m=68,p=48,M=120,_=x?170:140;u.fillStyle="#f4f4f2",u.fillRect(m-6,p-6,M+12,_+12),u.fillStyle="#26323a",u.fillRect(m,p,M,_),u.fillStyle="rgba(150,180,200,0.35)",u.fillRect(m+4,p+4,M/2-6,_-8),u.fillStyle="rgba(255,255,255,0.18)",u.beginPath(),u.moveTo(m+8,p+8),u.lineTo(m+40,p+8),u.lineTo(m+8,p+60),u.fill(),u.fillStyle="#f4f4f2",u.fillRect(m+M/2-2,p,4,_);const v=20+f()*70;u.fillStyle=["#e8e4dc","#b9a27f","#6c5a48","#d6d8d6"][c%4],u.fillRect(m,p,M,v),u.fillStyle="rgba(0,0,0,0.12)";for(let y=p;y<p+v;y+=4)u.fillRect(m,y,M,1);if(u.fillStyle="#c9c4ba",u.fillRect(m-10,p+_+6,M+20,8),x){u.fillStyle="rgba(40,40,40,0.9)",u.fillRect(m-20,p+_-70,M+40,5);for(let y=m-20;y<=m+M+20;y+=9)u.fillRect(y,p+_-70,3,76);u.fillStyle="#b8b2a6",u.fillRect(m-24,p+_+4,M+48,10)}return f()<.3&&(u.fillStyle="#5d6b77",u.fillRect(200,20,30,24)),Ie(l)}),e.urbanGround=[0,1].map(h=>{const[c,l]=De(256,256),u=Oe(300+h);l.fillStyle=h?"#8d8a84":"#a39c8f",l.fillRect(0,0,256,256);for(let f=0;f<256;f+=32)l.fillStyle="rgba(0,0,0,0.12)",l.fillRect(0,f,256,2);if(h===0){l.fillStyle="#9ea3a6",l.fillRect(24,50,208,206),l.fillStyle="rgba(0,0,0,0.15)";for(let d=50;d<256;d+=6)l.fillRect(24,d,208,2);const f=["#d23","#26b","#2a4","#fb2","#000"];for(let d=0;d<6;d++){l.strokeStyle=f[Math.floor(u()*5)],l.lineWidth=3+u()*4,l.beginPath(),l.moveTo(40+u()*170,100+u()*120);for(let g=0;g<4;g++)l.lineTo(40+u()*170,100+u()*120);l.stroke()}}else l.fillStyle="#3b3f42",l.fillRect(70,40,116,216),l.fillStyle="rgba(170,200,220,0.5)",l.fillRect(78,48,46,200),l.fillRect(132,48,46,200),l.fillStyle="#d4af37",l.fillRect(120,150,4,20),l.fillStyle="#ddd",l.fillRect(60,20,136,14);return Ie(c)});{const[h,c]=De(256,256),l=Oe(41);c.fillStyle="#5e5d59",c.fillRect(0,0,256,256);for(let u=0;u<9e3;u++){const f=80+l()*70|0;c.fillStyle=`rgba(${f},${f},${f-4},0.5)`,c.fillRect(l()*256,l()*256,2,2)}e.flatRoof=Ie(h)}{const[h,c]=De(256,256),l=Oe(43);c.fillStyle="#b3aea5",c.fillRect(0,0,256,256);for(let u=0;u<256;u+=32)for(let f=0;f<256;f+=32){const d=(l()-.5)*18;c.fillStyle=`rgb(${178+d|0},${173+d|0},${164+d|0})`,c.fillRect(f+1,u+1,30,30);for(let g=0;g<9;g++)c.fillStyle="rgba(0,0,0,0.07)",c.fillRect(f+4+g%3*9,u+4+Math.floor(g/3)*9,6,6)}e.sidewalk=Ie(h)}for(const h of[...Object.values(e)].flat())h.anisotropy=t;return e}const Ne=(s,t=.8,e=0)=>new wt({color:s,roughness:t,metalness:e});function qt(s,t,e,n,i=0,r=0,o=0,a=.02){const h=a>0?G1(s,t,e,a):new Qt(s,t,e),c=new xt(h,n);return c.position.set(i,r,o),c.castShadow=!0,c.receiveShadow=!0,c}function G1(s,t,e,n){const i=new Qt(s,t,e,4,4,4),r=i.attributes.position,o=new U,a=s/2-n,h=t/2-n,c=e/2-n;for(let l=0;l<r.count;l++){o.fromBufferAttribute(r,l);const u=new U(Math.max(-a,Math.min(a,o.x)),Math.max(-h,Math.min(h,o.y)),Math.max(-c,Math.min(c,o.z))),f=o.clone().sub(u);f.lengthSq()>0&&(f.setLength(n),o.copy(u).add(f)),r.setXYZ(l,o.x,o.y,o.z)}return i.computeVertexNormals(),i}function ks(s,t,e,n){const i=new ir((t+e)/2,s-(t+e),4,10);i.translate(0,-s/2,0);const r=new xt(i,n);return r.castShadow=!0,r}function ki(s={}){const t=Ne(s.skin??13146746,.7),e=Ne(s.shirt??3100527,.9),n=Ne(s.pants??2830656,.95),i=Ne(1841688,.6),r=Ne(s.hair??2760214,1),o=new zt,a=new zt;a.position.y=.95,o.add(a);const h=new zt;a.add(h),h.add(qt(.36,.52,.22,e,0,.28,0,.07)),h.add(qt(.34,.16,.2,n,0,0,0,.05));const c=ks(.12,.05,.05,t);c.position.y=.62,c.rotation.x=Math.PI,h.add(c);const l=new zt;l.position.y=.66,h.add(l);const u=new xt(new ke(.11,20,16),t);u.scale.set(1,1.15,1.05),u.position.y=.12,u.castShadow=!0,l.add(u);const f=new xt(new ke(.118,20,12,0,Math.PI*2,0,Math.PI*.55),r);f.position.y=.14,f.scale.set(1,1.1,1.08),l.add(f);const d=new xt(new pi(.018,.05,6),t);d.rotation.x=Math.PI/2,d.position.set(0,.11,.115),l.add(d);for(const x of[-1,1]){const m=new xt(new ke(.012,8,6),Ne(1118481,.3));m.position.set(.04*x,.14,.105),l.add(m)}const g={hips:a,torso:h,head:l};for(const x of[-1,1]){const m=new zt;m.position.set(.22*x,.5,0),h.add(m);const p=ks(.3,.055,.05,e);m.add(p);const M=new zt;M.position.y=-.3,m.add(M),M.add(ks(.27,.045,.04,t));const _=new xt(new ke(.045,8,6),t);_.position.y=-.29,M.add(_);const v=new zt;v.position.set(.1*x,-.04,0),a.add(v),v.add(ks(.45,.08,.065,n));const y=new zt;y.position.y=-.45,v.add(y),y.add(ks(.44,.06,.05,n));const S=qt(.1,.07,.24,i,0,-.46,.05,.03);y.add(S),g[x<0?"lShoulder":"rShoulder"]=m,g[x<0?"lElbow":"rElbow"]=M,g[x<0?"lHip":"rHip"]=v,g[x<0?"lKnee":"rKnee"]=y}return o.userData.parts=g,o.userData.phase=0,o}function jn(s,t,e,n=!1){const i=s.userData.parts,r=Math.min(1,t/2.2),o=Math.max(0,Math.min(1,(t-2.5)/3));s.userData.phase+=e*(2.2+t*1.55);const a=s.userData.phase,h=Math.sin(a),c=Math.cos(a),l=(.5+.35*o)*r;if(i.lHip.rotation.x=h*l,i.rHip.rotation.x=-h*l,i.lKnee.rotation.x=Math.max(0,-c)*(.4+.9*o)*r+.05,i.rKnee.rotation.x=Math.max(0,c)*(.4+.9*o)*r+.05,i.lShoulder.rotation.x=-h*l*.9,i.rShoulder.rotation.x=h*l*.9,i.lElbow.rotation.x=-(.15+.9*o)*Math.max(r,.2),i.rElbow.rotation.x=i.lElbow.rotation.x,i.lShoulder.rotation.z=-.08,i.rShoulder.rotation.z=.08,i.hips.position.y=.95+Math.abs(c)*.05*r-.03*o,i.torso.rotation.x=.12*o,i.torso.rotation.y=h*.08*r,n&&(i.lHip.rotation.x=-.5,i.rHip.rotation.x=.3,i.lKnee.rotation.x=.8,i.rKnee.rotation.x=.4),r<.05&&!n){const u=Math.sin(performance.now()/700)*.01;i.torso.rotation.x=u;for(const f of["lHip","rHip","lKnee","rKnee","lShoulder","rShoulder"])i[f].rotation.x*=.8}}function oo(s,t,e,n=.06){const i=new fr(s.map(([a,h])=>new ut(-a,h))),r=new ga(i,{depth:t-n*2,bevelEnabled:!0,bevelThickness:n,bevelSize:n*.8,bevelSegments:3,curveSegments:6});r.rotateY(Math.PI/2),r.translate(-(t-n*2)/2,0,0),r.computeVertexNormals();const o=new xt(r,e);return o.castShadow=!0,o.receiveShadow=!0,o}function H1(s=12041930,t="sedan"){const e=new zt,n=new or({color:s,roughness:.32,metalness:.55,clearcoat:1,clearcoatRoughness:.12}),i=new or({color:857372,roughness:.04,metalness:.4,clearcoat:1}),r=Ne(1315860,.65),o=Ne(14540253,.2,1),a=Ne(1710618,.95),h=Ne(11120051,.3,.9),c=new wt({color:16777198,emissive:16773824,emissiveIntensity:.5,roughness:.1}),l=new wt({color:9046538,emissive:5242880,emissiveIntensity:.6,roughness:.2}),u=Ne(15921906,.5),f=t==="suv"||t==="police"||t==="4x4",d=f?.16:0,g=1+d,x=new zt;e.add(x);const m=f?[[-2.05,.38],[-2.1,.7],[-2.08,g],[1.25,g],[1.95,g-.1],[2.12,g-.32],[2.1,.42],[1.9,.36]]:[[-2.08,.32],[-2.14,.72],[-1.98,g-.02],[1.2,g],[1.98,g-.15],[2.14,g-.42],[2.08,.34],[1.9,.3]];x.add(oo(m.map(([I,F])=>[I,F+(F<.5?d*.5:0)]),1.78,n,.09));const p=g+(f?.62:.46),M=f?[[-2,g-.02],[-1.98,p-.04],[.55,p],[1.25,g-.02]]:[[-1.92,g-.02],[-1.5,p-.03],[.35,p],[1.2,g-.02]];x.add(oo(M,1.6,i,.07));const _=f?[[-1.98,p-.06],[-1.96,p+.03],[.5,p+.05],[.58,p-.02]]:[[-1.5,p-.06],[-1.46,p+.03],[.3,p+.04],[.4,p-.02]];x.add(oo(_,1.56,n,.04)),((I,F)=>{for(const A of[-1,1]){const L=F[0]-I[0],N=F[1]-I[1],z=Math.hypot(L,N),O=qt(.05,z,.09,n,.79*A,(I[1]+F[1])/2,(I[0]+F[0])/2,0);O.rotation.x=-Math.atan2(L,N),x.add(O)}})([f?-.6:-.45,g],[f?-.6:-.45,p]),f&&t!=="police"&&x.add(qt(1.3,.04,1.8,r,0,p+.1,-.7,.01)),t==="4x4"&&(x.add(qt(.7,.7,.25,a,0,g-.1,-2.25,.2)),x.add(qt(1.9,.12,.2,r,0,.55,2.25,.04))),x.add(qt(1.82,.16,.16,r,0,.45+d*.5,2.06,.05)),x.add(qt(1.82,.16,.16,r,0,.45+d*.5,-2.04,.05)),x.add(qt(1.82,.08,3,r,0,.38+d*.5,.05,.03)),x.add(qt(.9,.16,.04,r,0,g-.33,2.16,.02)),x.add(qt(.52,.11,.02,u,0,.47+d*.5,2.17,.01)),x.add(qt(.52,.11,.02,u,0,g-.32,-2.19,.01));for(const I of[-1,1])x.add(qt(.34,.11,.06,c,.62*I,g-.25,2.16,.03)),x.add(qt(.3,.13,.06,l,.66*I,g-.2,-2.17,.03)),x.add(qt(.07,.07,.17,n,.93*I,g+.06,1.05,.03)),x.add(qt(.02,.03,.17,o,.9*I,g-.12,.15,.01)),x.add(qt(.02,.03,.17,o,.9*I,g-.12,-.9,.01));const y=[],S=t==="4x4"?.43:f?.38:.33,w=new ce(S,S,.23,24);w.rotateZ(Math.PI/2);const T=new al(S-.06,.06,8,24);T.rotateY(Math.PI/2);const b=new ce(S*.62,S*.62,.24,16);b.rotateZ(Math.PI/2);for(const[I,F]of[[-.8,1.32],[.8,1.32],[-.8,-1.3],[.8,-1.3]]){const A=new zt;A.position.set(I,S,F);const L=new zt;A.add(L);const N=new xt(w,a);N.castShadow=!0,L.add(N);for(const z of[-.1,.1]){const O=new xt(T,a);O.position.x=z,L.add(O)}L.add(new xt(b,h));for(let z=0;z<5;z++){const O=qt(.25,.05,S*1.1,h,0,0,0,0);O.rotation.x=z*Math.PI*2/5,L.add(O)}e.add(A),y.push({pivot:A,spin:L,front:F>0,R:S})}const E=[];{const I=f?1.25:1.2,F=f?.55:.35,A=Math.atan2(p-g,I-F);for(const L of[-.42,.28]){const N=new zt;N.position.set(L,g+.03,I-.04),N.rotation.x=A,x.add(N);const z=new zt;N.add(z);const O=qt(.58,.018,.022,r,.29,.015,0,0);O.userData.noDent=!0,z.add(O),E.push(z)}}if(t==="police"){const I=Ne(2059066,.5,.2);for(const z of[-1,1]){const O=qt(.02,.16,3.4,I,.9*z,g-.2,-.05,0);O.userData.noDent=!0,x.add(O)}const F=qt(1.1,.1,.28,r,0,p+.08,-.4,.03);x.add(F);const A=new wt({color:1061119,emissive:1720575,emissiveIntensity:0,roughness:.2}),L=new wt({color:1061119,emissive:1720575,emissiveIntensity:0,roughness:.2});x.add(qt(.42,.12,.24,A,-.3,p+.16,-.4,.03)),x.add(qt(.42,.12,.24,L,.3,p+.16,-.4,.03)),e.userData.siren=[A,L];const N=new xt(new Pe(1.4,.2),new Je({map:lr("GUARDIA CIVIL","#1f6b3a","#ffffff"),transparent:!0}));for(const z of[-1,1]){const O=N.clone();O.position.set(.915*z,g-.42,-.2),O.rotation.y=z*Math.PI/2,x.add(O)}}const C=new xt(new Pe(2.2,4.6),new Je({color:0,transparent:!0,opacity:.35,depthWrite:!1,alphaMap:cl()}));return C.rotation.x=-Math.PI/2,C.position.y=.03,e.add(C),e.userData={...e.userData,wheels:y,body:x,lightMat:c,rearMat:l,paint:n,wipers:E},e}let lo;function cl(){if(lo)return lo;const s=document.createElement("canvas");s.width=64,s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(32,64,4,32,64,62);return e.addColorStop(0,"#fff"),e.addColorStop(1,"#000"),t.fillStyle=e,t.save(),t.scale(1,2),t.fillRect(0,0,64,64),t.restore(),lo=new Sn(s)}function lr(s,t,e,n=512,i=72){const r=document.createElement("canvas");r.width=n,r.height=i;const o=r.getContext("2d");t&&(o.fillStyle=t,o.fillRect(0,0,n,i)),o.fillStyle=e,o.font=`bold ${Math.round(i*.62)}px system-ui, sans-serif`,o.textAlign="center",o.textBaseline="middle",o.fillText(s,n/2,i/2+2);const a=new Sn(r);return a.colorSpace=Me,a}function hu(s,t,e,n,i=5){const r=new zt,o=new ce(s,s,t,24);o.rotateZ(Math.PI/2);const a=new xt(o,e);a.castShadow=!0,r.add(a);const h=new ce(s*.6,s*.6,t+.01,16);h.rotateZ(Math.PI/2),r.add(new xt(h,n));for(let c=0;c<i;c++){const l=qt(t+.02,.05,s*1.1,n,0,0,0,0);l.rotation.x=c*Math.PI*2/i,r.add(l)}for(let c=0;c<10;c++){const l=qt(t,.04,.08,e,0,0,0,0),u=c*Math.PI/5;l.position.set(0,Math.cos(u)*s,Math.sin(u)*s),l.rotation.x=-u,r.add(l)}return r}function uu(){return{light:new wt({color:16777198,emissive:16773824,emissiveIntensity:.5,roughness:.1}),rear:new wt({color:9046538,emissive:5242880,emissiveIntensity:.6,roughness:.2})}}function V1(s=3112242){const t=new zt,e=new zt;t.add(e);const n=new or({color:s,roughness:.45,metalness:.3,clearcoat:.5}),i=Ne(1447446,.7),r=Ne(1710618,.95),o=Ne(15254058,.5,.3),a=new or({color:1385260,roughness:.05,metalness:.3,transparent:!0,opacity:.55}),{light:h,rear:c}=uu();e.add(qt(.9,.7,2,n,0,1.05,.75,.06)),e.add(qt(.5,.18,.1,i,0,1,1.77,.02)),e.add(qt(1,.25,1.4,i,0,.75,-.5,.03)),e.add(qt(1.5,.1,1.2,n,0,1.35,-.75,.03));for(const[d,g]of[[-.68,-.2],[.68,-.2],[-.68,-1.3],[.68,-1.3]])e.add(qt(.06,1.35,.06,i,d,2.05,g,0));e.add(qt(1.5,.08,1.3,n,0,2.75,-.75,.03));const l=qt(1.36,1.2,.02,a,0,2.05,-.2,0);l.userData.noDent=!0,e.add(l);for(const d of[-1,1]){const g=qt(.02,1.2,1.05,a,.68*d,2.05,-.75,0);g.userData.noDent=!0,e.add(g)}e.add(qt(.5,.08,.5,i,0,1.55,-.85,.03)),e.add(qt(.08,.7,.08,i,.25,1.9,1.35,0));for(const d of[-1,1])e.add(qt(.16,.12,.06,h,.3*d,1.25,1.78,.02)),e.add(qt(.12,.1,.05,c,.7*d,1.5,-1.37,.02));const u=[];for(const[d,g,x,m]of[[-.6,1.35,.45,.25],[.6,1.35,.45,.25],[-.92,-.75,.78,.42],[.92,-.75,.78,.42]]){const p=new zt;p.position.set(d,x,g);const M=hu(x,m,r,o,6);p.add(M),t.add(p),u.push({pivot:p,spin:M,front:g>0,R:x})}const f=new xt(new Pe(2.4,4),new Je({color:0,transparent:!0,opacity:.35,depthWrite:!1,alphaMap:cl()}));return f.rotation.x=-Math.PI/2,f.position.y=.03,t.add(f),t.userData={wheels:u,body:e,lightMat:h,rearMat:c,paint:n,wipers:[]},t}function W1(s=12597547){const t=new zt,e=new zt;t.add(e);const n=new or({color:s,roughness:.3,metalness:.5,clearcoat:1}),i=Ne(1315860,.6),r=Ne(14540253,.2,1),o=Ne(1710618,.95),a=Ne(3355443,.4,.6),{light:h,rear:c}=uu();e.add(qt(.12,.22,1,i,0,.55,0,.04)),e.add(qt(.34,.24,.5,n,0,.82,.2,.1)),e.add(qt(.28,.1,.55,i,0,.8,-.3,.04)),e.add(qt(.3,.3,.42,n,0,.68,.62,.1)),e.add(qt(.26,.2,.05,Ne(2241348,.05,.3),0,.92,.82,.02)),e.add(qt(.36,.28,.3,Ne(4473924,.5,.6),0,.45,.1,.06));const l=new xt(new ce(.05,.06,.7,10),r);l.rotation.x=Math.PI/2-.15,l.position.set(.16,.42,-.45),e.add(l),e.add(qt(.62,.03,.03,i,0,.95,.58,0)),e.add(qt(.12,.1,.05,h,0,.72,.86,.02)),e.add(qt(.12,.06,.05,c,0,.82,-.6,.02));for(const m of[.6,-.65]){const p=qt(.05,.5,.05,r,.07,.5,m*.98,0);e.add(p);const M=p.clone();M.position.x=-.07,e.add(M)}const u=[];for(const m of[.68,-.68]){const M=new zt;M.position.set(0,.31,m);const _=hu(.31,.13,o,a,5);M.add(_),t.add(M),u.push({pivot:M,spin:_,front:m>0,R:.31})}const f=ki({shirt:2105376,pants:1778995}),d=f.userData.parts;f.position.set(0,-.15,-.28),d.lHip.rotation.x=d.rHip.rotation.x=-1.25,d.lKnee.rotation.x=d.rKnee.rotation.x=1.6,d.lHip.rotation.z=-.25,d.rHip.rotation.z=.25,d.torso.rotation.x=.55,d.lShoulder.rotation.x=d.rShoulder.rotation.x=-1.1,d.lElbow.rotation.x=d.rElbow.rotation.x=-.3;const g=new xt(new ke(.15,16,12),n);g.position.y=.13,d.head.add(g),f.visible=!1,e.add(f);const x=new xt(new Pe(.8,2),new Je({color:0,transparent:!0,opacity:.35,depthWrite:!1,alphaMap:cl()}));return x.rotation.x=-Math.PI/2,x.position.y=.03,t.add(x),t.userData={wheels:u,body:e,lightMat:h,rearMat:c,paint:n,wipers:[],rider:f},t}function eh(s,t){return s==="tractor"?V1(t):s==="moto"?W1(t):H1(t,s)}const ci=(s,t=.7,e=0)=>new wt({color:s,roughness:t,metalness:e});function qe(s,t,e,n,i,r,o,a){const h=new xt(new Qt(t,e,n),i);return h.position.set(r,o,a),h.castShadow=h.receiveShadow=!0,s.add(h),h}function X1(s){const[t,e]=s.a,[n,i]=s.b,r=Math.hypot(n-t,i-e),o=(n-t)/r,a=(i-e)/r;return{ax:t,az:e,bx:n,bz:i,L:r,ux:o,uz:a,nx:-a,nz:o,w:s.w||24}}function q1(s,t){const e=X1(t),n=s.n,i=s.h,r=e.w/2+40,o=s.innerHeight(e.ax,e.az),a=s.innerHeight(e.bx,e.bz);e.ha=o,e.hb=a;const h=e.w/2+34;for(let c=0;c<n;c++)for(let l=0;l<n;l++){const u=s.ox+l*s.cell,f=s.oz+c*s.cell,d=u-e.ax,g=f-e.az,x=d*e.ux+g*e.uz,m=d*e.nx+g*e.nz;if(x<-60||x>e.L+60||Math.abs(m)>r+30)continue;const p=Math.max(0,Math.min(1,x/e.L)),M=o+(a-o)*p,_=m>0&&x>30&&x<140?h:e.w/2+6,v=Math.max(0,Math.abs(m)-_),y=Math.max(0,-x-15,x-e.L-15),S=Math.max(0,1-Math.hypot(v,y)/30),w=S*S*(3-2*S);i[c*n+l]+=(M-i[c*n+l])*w}return e}function Lo(s,t,e,n=8){const i=t-s.ax,r=e-s.az,o=i*s.ux+r*s.uz,a=i*s.nx+r*s.nz;return o>-n&&o<s.L+n&&Math.abs(a)<s.w/2+n||o>25&&o<145&&a>0&&a<s.w/2+36}function $1(s,t,e){const n=new zt,i=(w,T,b=.09)=>{const E=s.ax+s.ux*w+s.nx*T,C=s.az+s.uz*w+s.nz*T;return[E,t.height(E,C)+b,C]},r=(w,T,b,E,C,I)=>{const F=[],A=[],L=Math.max(1,Math.ceil((T-w)/10));for(let O=0;O<=L;O++){const H=w+(T-w)*O/L;if(F.push(...i(H,b,I),...i(H,E,I)),O){const V=(O-1)*2;A.push(V,V+1,V+2,V+1,V+3,V+2)}}const N=new de;N.setAttribute("position",new te(F,3)),N.setIndex(A),N.computeVertexNormals();const z=new xt(N,C);return z.receiveShadow=!0,n.add(z),z},o=new wt({color:4014148,roughness:.95,side:be,polygonOffset:!0,polygonOffsetFactor:-2}),a=new wt({color:15658730,roughness:.8,side:be,polygonOffset:!0,polygonOffsetFactor:-4}),h=new wt({color:7040366,roughness:.95,side:be,polygonOffset:!0,polygonOffsetFactor:-1});r(0,s.L,-s.w/2,s.w/2,o,.09),r(40,130,s.w/2,s.w/2+30,h,.07);for(let w=30;w<s.L-30;w+=30)r(w,w+15,-.4,.4,a,.11);for(const w of[-s.w/2+.6,s.w/2-.6])r(0,s.L,w-.25,w+.25,a,.11);for(const[w,T]of[[4,22],[s.L-22,s.L-4]])for(let b=-4;b<=4;b++)b&&r(w,T,b*1.25-.4,b*1.25+.4,a,.11);const c=s.ax+s.ux*85+s.nx*(s.w/2+44),l=s.az+s.uz*85+s.nz*(s.w/2+44),u=new zt;u.position.set(c,t.height(c,l),l),u.rotation.y=Math.atan2(s.ux,s.uz);const f=ci(10134440,.5,.5),d=ci(2764080,.9),g=ci(11545122,.6);qe(u,.3,6,22,f,-9,3,0),qe(u,18,6,.3,f,0,3,-11),qe(u,18,6,.3,f,0,3,11),qe(u,19,.3,23,g,0,6.2,0),qe(u,.2,1.2,22,f,9,5.4,0),qe(u,17.6,.05,21.6,d,0,.03,0);const x=new xt(new Pe(10,1.4),new wt({map:lr("✈ AERÓDROMO VALDE","#13324d","#f5c542",1024,144),roughness:.6,side:be}));x.position.set(9.15,5.4,0),x.rotation.y=Math.PI/2,u.add(x),n.add(u);const m=(w,T)=>{const b=Math.cos(u.rotation.y),E=Math.sin(u.rotation.y);return[c+w*b+T*E,l-w*E+T*b]};for(const[w,T]of[[[-9,-11],[-9,11]],[[-9,-11],[9,-11]],[[-9,11],[9,11]]])e.addSegment(...m(...w),...m(...T),"building");const p=s.ax+s.ux*60-s.nx*(s.w/2+14),M=s.az+s.uz*60-s.nz*(s.w/2+14),_=t.height(p,M);qe(n,.15,6,.15,ci(14540253),p,_+3,M);const v=new xt(new ce(.15,.5,3,10,1,!0),new wt({color:16738816,roughness:.8,side:be}));v.rotation.z=Math.PI/2,v.position.set(p+1.5,_+5.6,M),n.add(v),n.userData.sock=v,e.addSegment(p-.2,M,p+.2,M,"wall");const y=s.ax+s.ux*85+s.nx*(s.w/2+22),S=s.az+s.uz*85+s.nz*(s.w/2+22);return s.park={x:y,z:S,h:Math.atan2(-s.nx,-s.nz)},s.exit={x:s.ax+s.ux*70+s.nx*(s.w/2+22),z:s.az+s.uz*70+s.nz*(s.w/2+22)},n}function Y1(){const s=new zt,t=new zt;s.add(t);const e=ci(16053488,.4,.1),n=ci(12592670,.45,.1),i=new wt({color:2240576,roughness:.1,metalness:.6}),r=ci(1381653,.9),o=ci(7829367,.4,.6);qe(t,1.2,1.3,3.2,e,0,1.55,.7),qe(t,1.22,.75,1.4,i,0,1.95,1.15),qe(t,1,.9,1.2,e,0,1.45,2.8);const a=new xt(new pi(.35,.6,12),o);a.rotation.x=Math.PI/2,a.position.set(0,1.45,3.65),t.add(a);const h=new xt(new ce(.25,.6,4.2,10),e);h.rotation.x=Math.PI/2,h.position.set(0,1.65,-3),h.castShadow=!0,t.add(h),qe(t,11,.14,1.5,e,0,2.3,.9),qe(t,11.02,.15,.3,n,0,2.3,.2);for(const u of[-1,1]){const f=qe(t,.08,1.2,.08,o,u*1.6,1.7,.9);f.rotation.z=u*.9}qe(t,3.6,.1,1,e,0,1.75,-4.7),qe(t,.1,1.5,1.2,n,0,2.45,-4.8),qe(t,1.24,.18,3.3,n,0,1.2,.6);for(const[u,f]of[[-1,.4],[1,.4],[0,2.9]]){const d=new xt(new ce(.3,.3,.2,12),r);d.rotation.z=Math.PI/2,d.position.set(u,.3,f),t.add(d),qe(t,.08,.7,.08,o,u*.85,.65,f)}const c=new zt;c.position.set(0,1.45,3.75),qe(c,.15,1.9,.05,r,0,0,0),t.add(c);const l=new xt(new nl(.95,20),new Je({color:2236962,transparent:!0,opacity:0,depthWrite:!1}));return l.position.set(0,1.45,3.8),t.add(l),s.userData={body:t,prop:c,disc:l},s}const cs=0;var Un,Vs,Do;class j1{constructor({world:t,f:e,scale:n=.85}){Gi(this,Un);this.world=t,this.f=e,this.s=n,this.mesh=Y1(),this.mesh.scale.setScalar(n),this.pos=new U,this.vel=new U,this.reset()}reset(){const t=this.f.park;this.pos.set(t.x,this.world.terrain.height(t.x,t.z)+cs,t.z),this.heading=t.h,this.pitch=0,this.roll=0,this.speed=0,this.vy=0,this.throttle=0,this.onGround=!0,this.engine=!1,ve(this,Un,Do).call(this,0)}get canExit(){return this.onGround&&Math.abs(this.speed)<3}get altitude(){return this.pos.y-this.world.terrain.height(this.pos.x,this.pos.z)}update(t,e,n){var l,u,f;const i=this.world.terrain,r=e?e.axes():{x:0,y:0},o=e==null?void 0:e.brake,a=24,h=17,c=62;if(this.onGround){this.throttle+=((r.y>0?1:0)-this.throttle)*Math.min(1,t*1.5),this.speed+=(this.throttle*7.5-.004*this.speed*this.speed-(r.y<0||o?9:.6)*Math.sign(this.speed))*t,Math.abs(this.speed)<.15&&!(r.y>0)&&(this.speed=0),this.speed=Math.max(-1,this.speed);const d=r.x*(this.speed<12?.7:.25)*Math.min(1,Math.abs(this.speed)/2+.3);if(this.heading-=d*t,this.pitch+=((this.speed>a&&r.y>0?.16:0)-this.pitch)*Math.min(1,t*3),this.roll*=.8,!Lo(this.f,this.pos.x,this.pos.z,2)&&this.speed>6&&(this.speed-=4*t),this.speed>a&&r.y>0&&(this.onGround=!1,this.vy=3,this.throttle=1,this.airT=0,n==null||n("✈ ¡Despegando!",e!=null&&e.touch?"Joystick: morro y giro · ▼ quita gas, ▲ lo da":"W/S: morro · A/D: giro · Espacio quita gas, W lo da")),this.pos.x+=Math.sin(this.heading)*this.speed*t,this.pos.z+=Math.cos(this.heading)*this.speed*t,this.pos.y=i.height(this.pos.x,this.pos.z)+cs,this.vy=this.onGround?0:this.vy,this.speed>4&&this.world.colliders.nearest(this.pos.x,this.pos.z,3*this.s))return ve(this,Un,Vs).call(this,n,"Te has chocado rodando por tierra")}else{const d=(e==null?void 0:e.buttons)||{},g=o||d.rev,x=d.gas||((l=e==null?void 0:e.keys)==null?void 0:l.has("KeyW"))||((u=e==null?void 0:e.keys)==null?void 0:u.has("ArrowUp"));g?this.throttle=Math.max(0,this.throttle-t*.6):(x||this.throttle>.999)&&(this.throttle=Math.min(1,this.throttle+t*.5));const m=Re.clamp(r.y-(d.gas?1:0)+(d.rev?1:0),-1,1),M=this.speed<h?-.35:Re.clamp(m*.38,-.45,.4);this.pitch+=(M-this.pitch)*Math.min(1,t*1.6),this.roll+=(r.x*.65-this.roll)*Math.min(1,t*2),this.heading-=Math.tan(this.roll)*9.8/Math.max(15,this.speed)*t*1.4,this.speed+=(this.throttle*9-.0028*this.speed*this.speed-9.8*Math.sin(this.pitch))*t,this.speed=Re.clamp(this.speed,5,c);const _=Math.min(1,this.speed/30),v=Math.sin(this.pitch)*this.speed-(1-_)*6;this.vy+=(v-this.vy)*Math.min(1,t*2.5),this.pos.y-i.height(this.pos.x,this.pos.z)<10&&this.vy<-2.5&&(this.vy+=(-2.5-this.vy)*Math.min(1,t*4)),this.throttle<.5&&(this.speed-=(.5-this.throttle)*.004*this.speed*this.speed*t);const S=Math.cos(this.pitch)*this.speed;this.pos.x+=Math.sin(this.heading)*S*t,this.pos.z+=Math.cos(this.heading)*S*t,this.pos.y+=this.vy*t;const w=i.height(this.pos.x,this.pos.z);this.pos.y-w>700&&(this.pos.y=w+700,this.vy=Math.min(0,this.vy));const T=this.world.edge||9e3;if(Math.max(Math.abs(this.pos.x),Math.abs(this.pos.z))>T){let E=Math.atan2(-this.pos.x,-this.pos.z)-this.heading;E=Math.atan2(Math.sin(E),Math.cos(E)),this.heading+=Math.sign(E)*Math.min(Math.abs(E),t*.8),this.roll=-Math.sign(E)*.5,this.edgeWarn||(this.edgeWarn=!0,n==null||n("Fin del mapa","La avioneta da la vuelta hacia Val de Santa María"))}else this.edgeWarn=!1;if(this.pos.y-w<12&&this.world.colliders.nearest(this.pos.x,this.pos.z,3,"building"))return ve(this,Un,Vs).call(this,n,"Has chocado contra una casa");{const b=(f=this.world.molinos)==null?void 0:f.hit(this.pos);if(b)return ve(this,Un,Vs).call(this,n,b)}if(this.airT=(this.airT||0)+t,this.pos.y<=w+cs&&this.airT<3)this.pos.y=w+cs,this.vy=Math.max(this.vy,1);else if(this.pos.y<=w+cs){if(!(this.vy>-6&&Math.abs(this.roll)<.4&&this.pitch>-.3))return ve(this,Un,Vs).call(this,n,"Has bajado muy de golpe: quita gas y baja el morro poco a poco");this.onGround=!0,this.pos.y=w+cs,this.vy=0,this.roll=0,this.pitch=0,this.throttle=0,n==null||n("🛬 Aterrizaje",Lo(this.f,this.pos.x,this.pos.z)?"¡Bien hecho! Frena con abajo o espacio":"En pleno campo… frena con abajo o espacio")}}ve(this,Un,Do).call(this,t)}forward(t=new U){return t.set(Math.sin(this.heading)*Math.cos(this.pitch),Math.sin(this.pitch),Math.cos(this.heading)*Math.cos(this.pitch))}}Un=new WeakSet,Vs=function(t,e){return t==null||t("💥 Te has estrellado",e+". La avioneta vuelve al aeródromo."),this.crashed=!0,this.reset(),"crash"},Do=function(t){const e=this.mesh,n=this.world.terrain;e.position.copy(this.pos);let i=0;if(this.onGround){const a=Math.sin(this.heading),h=Math.cos(this.heading);i=-Math.atan2(n.height(this.pos.x+a*2,this.pos.z+h*2)-n.height(this.pos.x-a*2,this.pos.z-h*2),4)}e.rotation.set(0,0,0),e.rotation.order="YXZ",e.rotation.y=this.heading,e.rotation.x=-this.pitch+i,e.rotation.z=this.roll;const r=e.userData,o=this.engine?8+this.throttle*60:0;r.prop.rotation.z+=o*t,r.disc.material.opacity=this.engine?.12+this.throttle*.2:0,r.prop.visible=o<30};function Zn(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,h=new de;let c=0;for(let l=0;l<s.length;++l){const u=s[l];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". The geometry must have either an index or a position attribute"),null;h.addGroup(c,d,l),c+=d}}if(e){let l=0;const u=[];for(let f=0;f<s.length;++f){const d=s[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+l);l+=s[f].attributes.position.count}h.setIndex(u)}for(const l in r){const u=nh(r[l]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" attribute."),null;h.setAttribute(l,u)}for(const l in o){const u=o[l][0].length;if(u===0)break;h.morphAttributes=h.morphAttributes||{},h.morphAttributes[l]=[];for(let f=0;f<u;++f){const d=[];for(let x=0;x<o[l].length;++x)d.push(o[l][x][f]);const g=nh(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" morphAttribute."),null;h.morphAttributes[l].push(g)}}return h}function nh(s){let t,e,n,i=-1,r=0;for(let c=0;c<s.length;++c){const l=s[c];if(l.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(t===void 0&&(t=l.array.constructor),t!==l.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=l.itemSize),e!==l.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=l.normalized),n!==l.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=l.gpuType),i!==l.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=l.array.length}const o=new t(r);let a=0;for(let c=0;c<s.length;++c)o.set(s[c].array,a),a+=s[c].array.length;const h=new Ee(o,e,n);return i!==void 0&&(h.gpuType=i),h}class Z1{constructor(t,e){this.n=t.n,this.cell=t.cell,this.ox=t.origin[0],this.oz=t.origin[1],this.h=e}setOuter(t,e){this.o={n:t.n,cell:t.cell,ox:t.origin[0],oz:t.origin[1],h:e},this.E=-this.ox}outerHeight(t,e){const n=this.o,i=n.n,r=n.h,o=Math.max(0,Math.min(i-1.0001,(t-n.ox)/n.cell)),a=Math.max(0,Math.min(i-1.0001,(e-n.oz)/n.cell)),h=Math.floor(o),c=Math.floor(a),l=o-h,u=a-c,f=r[c*i+h],d=r[c*i+h+1],g=r[(c+1)*i+h],x=r[(c+1)*i+h+1];return l+u<=1?f+(d-f)*l+(g-f)*u:x+(g-x)*(1-l)+(d-x)*(1-u)}addDeck(t,e,n,i,r,o,a){const h={ax:t,az:e,bx:n,bz:i,ya:r,yb:o,hw:a},c=32;this.decks=this.decks||new Map;for(let l=Math.floor((Math.min(t,n)-a)/c);l<=Math.floor((Math.max(t,n)+a)/c);l++)for(let u=Math.floor((Math.min(e,i)-a)/c);u<=Math.floor((Math.max(e,i)+a)/c);u++){const f=l*100003+u;this.decks.has(f)||this.decks.set(f,[]),this.decks.get(f).push(h)}}height(t,e){const n=this.ground(t,e);if(!this.decks)return n;const i=this.decks.get(Math.floor(t/32)*100003+Math.floor(e/32));if(!i)return n;let r=n;for(const o of i){const a=o.bx-o.ax,h=o.bz-o.az,c=a*a+h*h||1,l=Math.max(0,Math.min(1,((t-o.ax)*a+(e-o.az)*h)/c));Math.hypot(t-o.ax-a*l,e-o.az-h*l)<o.hw&&(r=Math.max(r,o.ya+(o.yb-o.ya)*l))}return r}ground(t,e){if(!this.o)return this.innerHeight(t,e);const n=Math.max(Math.abs(t),Math.abs(e)),i=this.E;if(n<=i-150)return this.innerHeight(t,e);const r=this.outerHeight(t,e);if(n>=i)return r;const o=(n-(i-150))/150,a=o*o*(3-2*o),h=this.innerHeight(t,e);return h+(r-h)*a}setFine(t,e,n,i,r){const o=Math.round((n-t)/r)+1,a=Math.round((i-e)/r)+1,h=new Float32Array(o*a);for(let c=0;c<a;c++)for(let l=0;l<o;l++)h[c*o+l]=this.innerHeight(t+l*r,e+c*r);this.f={x0:t,z0:e,x1:n,z1:i,nx:o,nz:a,cell:r,h}}innerHeight(t,e){const n=this.f;if(n&&t>=n.x0&&t<=n.x1&&e>=n.z0&&e<=n.z1){const m=(t-n.x0)/n.cell,p=(e-n.z0)/n.cell,M=Math.min(n.nx-2,Math.floor(m)),_=Math.min(n.nz-2,Math.floor(p)),v=m-M,y=p-_,S=n.h,w=n.nx;return(S[_*w+M]*(1-v)+S[_*w+M+1]*v)*(1-y)+(S[(_+1)*w+M]*(1-v)+S[(_+1)*w+M+1]*v)*y}const i=(t-this.ox)/this.cell,r=(e-this.oz)/this.cell,o=Math.max(0,Math.min(this.n-2,Math.floor(i))),a=Math.max(0,Math.min(this.n-2,Math.floor(r))),h=Math.max(0,Math.min(1,i-o)),c=Math.max(0,Math.min(1,r-a)),l=this.n,u=this.h,f=u[a*l+o],d=u[a*l+o+1],g=u[(a+1)*l+o],x=u[(a+1)*l+o+1];return(f*(1-h)+d*h)*(1-c)+(g*(1-h)+x*h)*c}}class K1{constructor(t=8){this.cell=t,this.map=new Map}key(t,e){return t*100003+e}addSegment(t,e,n,i,r="wall"){var f;const o={ax:t,az:e,bx:n,bz:i,kind:r},a=this.cell,h=Math.floor(Math.min(t,n)/a),c=Math.floor(Math.max(t,n)/a),l=Math.floor(Math.min(e,i)/a),u=Math.floor(Math.max(e,i)/a);for(let d=h;d<=c;d++)for(let g=l;g<=u;g++){const x=this.key(d,g);this.map.has(x)||this.map.set(x,[]),this.map.get(x).push(o),(f=this.rec)==null||f.push([this.map,x,o])}}record(t){const e=this.rec;return this.rec=t?[]:null,e}removeRecorded(t){const e=new Set(t.map(i=>i[2])),n=new Set;for(const[i,r]of t){if(n.has(i.get(r)))continue;const o=i.get(r);if(!o)continue;const a=o.filter(h=>!e.has(h));n.add(a),a.length?i.set(r,a):i.delete(r)}}addArea(t){var h;let e=1/0,n=-1/0,i=1/0,r=-1/0;for(const[c,l]of t)e=Math.min(e,c),n=Math.max(n,c),i=Math.min(i,l),r=Math.max(r,l);const o={pts:t,x0:e,x1:n,z0:i,z1:r},a=this.cell;this.areas=this.areas||new Map;for(let c=Math.floor(e/a);c<=Math.floor(n/a);c++)for(let l=Math.floor(i/a);l<=Math.floor(r/a);l++){const u=this.key(c,l);this.areas.has(u)||this.areas.set(u,[]),this.areas.get(u).push(o),(h=this.rec)==null||h.push([this.areas,u,o])}}inside(t,e){var i;const n=(i=this.areas)==null?void 0:i.get(this.key(Math.floor(t/this.cell),Math.floor(e/this.cell)));if(!n)return null;for(const r of n){if(t<r.x0||t>r.x1||e<r.z0||e>r.z1)continue;let o=!1;const a=r.pts;for(let h=0,c=a.length-1;h<a.length;c=h++){const[l,u]=a[h],[f,d]=a[c];u>e!=d>e&&t<(f-l)*(e-u)/(d-u)+l&&(o=!o)}if(o)return r}return null}expel(t,e,n=0){const i=this.inside(t.x,t.z);if(!i)return null;const r=i.pts;let o=null,a=1/0;for(let u=0;u<r.length;u++){const[f,d]=r[u],[g,x]=r[(u+1)%r.length],m=g-f,p=x-d,M=m*m+p*p||1e-9,_=Math.max(0,Math.min(1,((t.x-f)*m+(t.z-d)*p)/M)),v=f+m*_,y=d+p*_,S=Math.hypot(t.x-v,t.z-y);S<a&&(a=S,o={qx:v,qz:y})}let h=o.qx-t.x,c=o.qz-t.z;const l=Math.hypot(h,c)||1;return h/=l,c/=l,t.x=o.qx+h*(e+.05),t.z=o.qz+c*(e+.05),n<3&&this.inside(t.x,t.z)?this.expel(t,e,n+1):{x:h,z:c}}addPolygon(t,e){for(let n=0;n<t.length;n++){const i=t[n],r=t[(n+1)%t.length];this.addSegment(i[0],i[1],r[0],r[1],e)}}raycast(t,e,n,i){const r=this.cell;let o=1;const a=new Set,h=Math.floor(Math.min(t,n)/r),c=Math.floor(Math.max(t,n)/r),l=Math.floor(Math.min(e,i)/r),u=Math.floor(Math.max(e,i)/r),f=n-t,d=i-e;for(let g=h;g<=c;g++)for(let x=l;x<=u;x++){const m=this.map.get(this.key(g,x));if(m)for(const p of m){if(p.kind!=="building"||a.has(p))continue;a.add(p);const M=p.bx-p.ax,_=p.bz-p.az,v=f*_-d*M;if(Math.abs(v)<1e-9)continue;const y=((p.ax-t)*_-(p.az-e)*M)/v,S=((p.ax-t)*d-(p.az-e)*f)/v;y>0&&y<o&&S>=0&&S<=1&&(o=y)}}return o}nearest(t,e,n,i="building"){const r=this.cell;let o=null,a=n;for(let h=Math.floor((t-n)/r);h<=Math.floor((t+n)/r);h++)for(let c=Math.floor((e-n)/r);c<=Math.floor((e+n)/r);c++)for(const l of this.map.get(this.key(h,c))||[]){if(l.kind!==i)continue;const u=l.bx-l.ax,f=l.bz-l.az,d=u*u+f*f||1e-9,g=Math.max(.15,Math.min(.85,((t-l.ax)*u+(e-l.az)*f)/d)),x=l.ax+u*g,m=l.az+f*g,p=Math.hypot(t-x,e-m);p<a&&p>.05&&(a=p,o={x,z:m,nx:(t-x)/p,nz:(e-m)/p})}return o}resolve(t,e){const n=this.cell,i=new Set;let r=null;for(let o=0;o<3;o++){const a=Math.floor((t.x-e)/n),h=Math.floor((t.x+e)/n),c=Math.floor((t.z-e)/n),l=Math.floor((t.z+e)/n);let u=!1;i.clear();for(let f=a;f<=h;f++)for(let d=c;d<=l;d++){const g=this.map.get(this.key(f,d));if(g)for(const x of g){if(i.has(x))continue;i.add(x);const m=x.bx-x.ax,p=x.bz-x.az,M=m*m+p*p||1e-9;let _=((t.x-x.ax)*m+(t.z-x.az)*p)/M;_=Math.max(0,Math.min(1,_));const v=x.ax+m*_,y=x.az+p*_;let S=t.x-v,w=t.z-y;const T=Math.hypot(S,w);if(T<e){T<1e-6&&(S=-p,w=m);const b=Math.hypot(S,w)||1;S/=b,w/=b,t.x+=S*(e-T),t.z+=w*(e-T),u=!0,r=r||{x:0,z:0},r.x+=S,r.z+=w}}}if(!u)break}if(r){const o=Math.hypot(r.x,r.z)||1;r.x/=o,r.z/=o}return r}}const cr={windows:[],lamps:[]};function Xr(s,t){return s.emissive=new Wt(16777215),s.emissiveMap=t,s.emissiveIntensity=0,s.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vLitPos;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
vLitPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vLitPos;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      { vec3 cell = floor(vec3(vLitPos.x / 2.0, vLitPos.y / 3.0, vLitPos.z / 2.0));
        totalEmissiveRadiance *= step(0.62, fract(sin(dot(cell, vec3(12.9898, 78.233, 37.719))) * 43758.5453)); }`)},s.customProgramCacheKey=()=>"litwindows",cr.windows.push(s),s}function Io(s){let t=0;for(let e=0;e<s.length;e++){const n=s[(e+1)%s.length];t+=s[e][0]*n[1]-n[0]*s[e][1]}return t/2}function J1(s){let t=null;for(let e=0;e<s.length;e++){const n=s[e],i=s[(e+1)%s.length],r=Math.hypot(i[0]-n[0],i[1]-n[1]);if(r<.5)continue;const o=(i[0]-n[0])/r,a=(i[1]-n[1])/r;let h=1/0,c=-1/0,l=1/0,u=-1/0;for(const d of s){const g=d[0]*o+d[1]*a,x=-d[0]*a+d[1]*o;h=Math.min(h,g),c=Math.max(c,g),l=Math.min(l,x),u=Math.max(u,x)}const f=(c-h)*(u-l);(!t||f<t.area)&&(t={area:f,ux:o,uz:a,mnu:h,mxu:c,mnv:l,mxv:u})}return t}function Q1(s,t,e,n){const i=[];for(let r=0;r<s.length;r++){const o=s[r],a=s[(r+1)%s.length],h=o[0]*t+o[1]*e-n,c=a[0]*t+a[1]*e-n;if(h<=0&&i.push(o),h<0&&c>0||h>0&&c<0){const l=h/(h-c);i.push([o[0]+(a[0]-o[0])*l,o[1]+(a[1]-o[1])*l])}}return i}class ze{constructor(){this.pos=[],this.uv=[],this.idx=[],this.col=[],this.tint=[1,1,1]}quad(t,e,n,i,r,o,a,h){const c=this.pos.length/3;this.pos.push(...t,...e,...n,...i),this.uv.push(...r,...o,...a,...h);for(let l=0;l<4;l++)this.col.push(...this.tint);this.idx.push(c,c+1,c+2,c,c+2,c+3)}tri(t,e,n,i,r,o){const a=this.pos.length/3;this.pos.push(...t,...e,...n),this.uv.push(...i,...r,...o);for(let h=0;h<3;h++)this.col.push(...this.tint);this.idx.push(a,a+1,a+2)}build(){const t=new de;return t.setAttribute("position",new te(this.pos,3)),t.setAttribute("uv",new te(this.uv,2)),t.setAttribute("color",new te(this.col,3)),t.setIndex(this.idx),t.computeVertexNormals(),t}}function fu(s,t,e,n){const i=s.style==="urban",r=new ze,o=new ze,a=new ze,h=new ze,c=new ze,l=new ze,u=new ze,f=new ze,d=(e.urban||[]).map(()=>new ze),g=(e.urbanGround||[]).map(()=>new ze),x=new ze,m=new ze;let p=null;const M=[];let _=1;const v=()=>(_=_*16807%2147483647)/2147483647;for(const w of s.buildings){let T=w.p.slice();if(Io(T)>0&&T.reverse(),T.length<3)continue;n&&n.addArea(T);let b=1/0,E=-1/0;for(const et of T){const tt=t.height(et[0],et[1]);b=Math.min(b,tt),E=Math.max(E,tt)}const C=Math.max(1,w.f||1),I=i?2.85:2.9,F=s.church&&w.id===s.church&&Math.abs(Io(T))>100;let A=F?E+5.6:w.eave!=null?Math.max(w.eave,E+2.4):E+(w.use==="agr"?3.2+.6*v():C*I+(i?1.2:.3));const L=b-.6,N=J1(T);if(!N)continue;const z=N.mxv-N.mnv,O=N.mxu-N.mnu;let H=N.ux,V=N.uz,G=(N.mnv+N.mxv)/2,Y=z/2;z>O&&(H=-N.uz,V=N.ux,G=-(N.mnu+N.mxu)/2,Y=O/2);const W=-V,$=H,it=w.flat===!0;let Mt=.32;w.top!=null&&!it&&(Mt=Re.clamp((w.top-A)/Math.max(1,Y),.12,.42));const gt=it?()=>A:(et,tt)=>A+Mt*(Y-Math.abs(et*W+tt*$-G));let Pt,Rt=null,dt=4,Tt=3;if(F)Pt=x;else if(i&&w.use!=="agr"){const et=Math.floor(v()*d.length);Pt=d[et],dt=3,Tt=I,w.use!=="ind"&&C>=3&&(Rt=g[Math.floor(v()*g.length)])}else if(w.use==="agr")Pt=c;else{const et=v()<.35?1:0;Pt=et?o:r,Rt=et?C>1&&v()<.7?a:h:a}const k=.82+v()*.25;for(const et of[r,o,a,h,c,x,...d,...g])et.tint=[k,k*(.97+v()*.05),k*(.95+v()*.05)];F&&(x.tint=[1,1,1]);const ft=v();l.tint=[.75+.3*(1-ft),.72+.25*(1-ft)+.08*ft,.7+.2*ft];const Q=i?3.6:3,at=E+Q,st=v(),At=v()<.5;let yt=0,P=0;for(const et of T)yt+=et[0]/T.length,P+=et[1]/T.length;const R=it?.9:0;for(let et=0;et<T.length;et++){const tt=T[et],ot=T[(et+1)%T.length],ht=Math.hypot(ot[0]-tt[0],ot[1]-tt[1]);if(ht<.05)continue;const vt=Pt===c?ht/dt:Math.max(1,Math.round(ht/dt)),Ct=vt/ht,Ut=tt[0]*W+tt[1]*$-G,lt=ot[0]*W+ot[1]*$-G,$t=[[tt,0],[ot,ht]];if(!it&&Ut*lt<0){const kt=Ut/(Ut-lt);$t.splice(1,0,[[tt[0]+(ot[0]-tt[0])*kt,tt[1]+(ot[1]-tt[1])*kt],ht*kt])}for(let kt=0;kt<$t.length-1;kt++){const[pt,Lt]=$t[kt],[nt,Et]=$t[kt+1],Ot=A+R;if(!i&&Rt){const B=Math.max(1,Math.min(C,Math.floor((Ot-E+.4)/Tt))),mt=Ot-B*Tt;if(mt>L&&c.quad([pt[0],L,pt[1]],[nt[0],L,nt[1]],[nt[0],mt,nt[1]],[pt[0],mt,pt[1]],[Lt/4,0],[Et/4,0],[Et/4,(mt-L)/3],[Lt/4,(mt-L)/3]),Rt.quad([pt[0],mt,pt[1]],[nt[0],mt,nt[1]],[nt[0],mt+Tt,nt[1]],[pt[0],mt+Tt,pt[1]],[st+Lt/8,0],[st+Et/8,0],[st+Et/8,1],[st+Lt/8,1]),B>1&&Pt.quad([pt[0],mt+Tt,pt[1]],[nt[0],mt+Tt,nt[1]],[nt[0],Ot,nt[1]],[pt[0],Ot,pt[1]],[Lt*Ct,0],[Et*Ct,0],[Et*Ct,B-1],[Lt*Ct,B-1]),At){const St=nt[0]-pt[0],Gt=nt[1]-pt[1],Bt=Math.hypot(St,Gt)||1;let ae=Gt/Bt,oe=-St/Bt;(pt[0]-yt)*ae+(pt[1]-P)*oe<0&&(ae=-ae,oe=-oe);const xe=.04,Te=[pt[0]+ae*xe,pt[1]+oe*xe],he=[nt[0]+ae*xe,nt[1]+oe*xe];m.quad([Te[0],Ot-.36,Te[1]],[he[0],Ot-.36,he[1]],[he[0],Ot,he[1]],[Te[0],Ot,Te[1]],[Lt/2,0],[Et/2,0],[Et/2,.75],[Lt/2,.75])}}else if(Rt&&at<Ot-(i?2:.4)){const B=(i?Math.max(1,Math.round(ht/4)):vt)/ht,mt=at-Q;Rt.quad([pt[0],mt,pt[1]],[nt[0],mt,nt[1]],[nt[0],at,nt[1]],[pt[0],at,pt[1]],[Lt*B,0],[Et*B,0],[Et*B,1],[Lt*B,1]),mt>L&&Rt.quad([pt[0],L,pt[1]],[nt[0],L,nt[1]],[nt[0],mt,nt[1]],[pt[0],mt,pt[1]],[.01,.9],[.06,.9],[.06,.95],[.01,.95]);const St=(at-Ot)/Tt;Pt.quad([pt[0],at,pt[1]],[nt[0],at,nt[1]],[nt[0],Ot,nt[1]],[pt[0],Ot,pt[1]],[Lt*Ct,St],[Et*Ct,St],[Et*Ct,0],[Lt*Ct,0])}else{const B=(Ot-L)/Tt;Pt.quad([pt[0],L,pt[1]],[nt[0],L,nt[1]],[nt[0],Ot,nt[1]],[pt[0],Ot,pt[1]],[Lt*Ct,0],[Et*Ct,0],[Et*Ct,B],[Lt*Ct,B])}if(it){f.quad([nt[0],A,nt[1]],[pt[0],A,pt[1]],[pt[0],Ot,pt[1]],[nt[0],Ot,nt[1]],[0,0],[ht/3,0],[ht/3,.3],[0,.3]),f.quad([pt[0],Ot,pt[1]],[nt[0],Ot,nt[1]],[nt[0],Ot,nt[1]],[pt[0],Ot,pt[1]],[0,0],[0,0],[0,0],[0,0]);continue}const pe=gt(pt[0],pt[1]),Vt=gt(nt[0],nt[1]),_t=i||F?Pt:c;(pe-A>.05||Vt-A>.05)&&(i&&!F?_t.quad([pt[0],A,pt[1]],[nt[0],A,nt[1]],[nt[0],Vt,nt[1]],[pt[0],pe,pt[1]],[.02,.02],[.03,.02],[.03,.03],[.02,.03]):_t.quad([pt[0],A,pt[1]],[nt[0],A,nt[1]],[nt[0],Vt,nt[1]],[pt[0],pe,pt[1]],[Lt/4,0],[Et/4,0],[Et/4,(Vt-A)/3],[Lt/4,(pe-A)/3]))}n.addSegment(tt[0],tt[1],ot[0],ot[1],"building")}if(it){const et=T.map(tt=>new ut(tt[0],tt[1]));for(const tt of Nn.triangulateShape(et,[])){const ot=tt.map($t=>[T[$t][0],A+.05,T[$t][1]]),ht=tt.map($t=>[T[$t][0]/3,T[$t][1]/3]),vt=ot[1][0]-ot[0][0],Ct=ot[1][2]-ot[0][2],Ut=ot[2][0]-ot[0][0],lt=ot[2][2]-ot[0][2];Ct*Ut-vt*lt<0?f.tri(ot[0],ot[2],ot[1],ht[0],ht[2],ht[1]):f.tri(ot[0],ot[1],ot[2],ht[0],ht[1],ht[2])}continue}F&&(p={pts:T,base:b,top:E,y0:L,eave:A,slope:Mt,half:Y,mid:G,rx:H,rz:V,nx:W,nz:$});const ct=ix(T,.35);for(const et of[1,-1]){const tt=Q1(ct,et*W,et*$,et*G);if(tt.length<3)continue;const ot=tt.map(vt=>new ut(vt[0],vt[1])),ht=Nn.triangulateShape(ot,[]);for(const vt of ht){const Ct=vt.map(nt=>tt[nt]),Ut=Ct.map(nt=>[nt[0],gt(nt[0],nt[1])+.05,nt[1]]),lt=Ct.map(nt=>[(nt[0]*H+nt[1]*V)/2.2,(nt[0]*W+nt[1]*$)/2.2]),$t=Ut[1][0]-Ut[0][0],kt=Ut[1][2]-Ut[0][2],pt=Ut[2][0]-Ut[0][0],Lt=Ut[2][2]-Ut[0][2];kt*pt-$t*Lt<0?l.tri(Ut[0],Ut[2],Ut[1],lt[0],lt[2],lt[1]):l.tri(Ut[0],Ut[1],Ut[2],lt[0],lt[1],lt[2])}}if(!i&&!F&&w.use==="res"&&v()<.75){const et=(v()-.5)*O*.6,tt=(v()-.5)*Y*.8,ot=yt+H*et+W*tt,ht=P+V*et+$*tt;M.push([ot,gt(ot,ht),ht,v()<.6])}for(let et=0;et<ct.length;et++){const tt=ct[et],ot=ct[(et+1)%ct.length],ht=gt(tt[0],tt[1])+.05,vt=gt(ot[0],ot[1])+.05;u.quad([tt[0],ht-.18,tt[1]],[ot[0],vt-.18,ot[1]],[ot[0],vt,ot[1]],[tt[0],ht,tt[1]],[0,0],[1,0],[1,1],[0,1])}}const y=new zt,S=(w,T)=>{if(!w.pos.length)return;const b=new xt(w.build(),T);b.castShadow=b.receiveShadow=!0,y.add(b)};return S(r,Xr(new wt({vertexColors:!0,map:e.facade,roughness:.92}),e.facadeNight)),S(o,Xr(new wt({vertexColors:!0,map:e.facadePlaster,roughness:.95}),e.facadePlasterNight)),S(c,new wt({vertexColors:!0,map:e.stone,roughness:.95})),S(x,new wt({vertexColors:!0,map:e.churchStone,roughness:.95})),S(a,Xr(new wt({vertexColors:!0,map:e.facadeGround,roughness:.92}),e.facadeGroundNight)),S(h,Xr(new wt({vertexColors:!0,map:e.facadePlasterGround,roughness:.95}),e.facadePlasterGroundNight)),p&&y.add(ex(p,t,e)),d.forEach((w,T)=>S(w,new wt({vertexColors:!0,map:e.urban[T],roughness:.9}))),g.forEach((w,T)=>S(w,new wt({vertexColors:!0,map:e.urbanGround[T],roughness:.85}))),S(f,new wt({map:e.flatRoof,roughness:1,vertexColors:!0})),S(l,new wt({vertexColors:!0,map:e.roof,roughness:.8,side:be})),S(u,new wt({color:5909532,roughness:.9,side:be})),S(m,new wt({map:e.brick,roughness:.9})),M.length&&y.add(tx(M)),y}function tx(s){const t=new zt,e=new se,n=new U(1,1,1),i=new yn,r=new Qt(.55,1.4,.55);r.translate(0,.55,0);const o=new Qt(.75,.08,.75);o.translate(0,1.55,0);const a=new ce(.08,.08,.5,6);a.translate(0,1.6,0);const h=new $e(r,new wt({color:15657698,roughness:.9}),s.length),c=new $e(Zn([o,a]),new wt({color:10132896,metalness:.6,roughness:.4}),s.length),l=s.filter(x=>x[3]),u=new ce(.025,.025,2.6,4);u.translate(.9,1.3,0);const f=new Qt(.03,.03,1.2);f.translate(.9,2.4,0);const d=[0,1,2,3].map(x=>{const m=new Qt(.5-x*.07,.02,.02);return m.translate(.9,2.42,-.5+x*.33),m}),g=new $e(Zn([u,f,...d]),new wt({color:7830400,metalness:.7,roughness:.4}),l.length);return s.forEach(([x,m,p],M)=>{i.setFromAxisAngle(new U(0,1,0),(x*7+p*3)%6.28),e.compose(new U(x,m-.2,p),i,n),h.setMatrixAt(M,e),c.setMatrixAt(M,e)}),l.forEach(([x,m,p],M)=>{i.setFromAxisAngle(new U(0,1,0),(x*5+p)%6.28),e.compose(new U(x,m-.2,p),i,n),g.setMatrixAt(M,e)}),h.castShadow=!0,t.add(h,c,g),t}function ex(s,t,e,n){const i=new zt,r=e.churchStone.clone();r.needsUpdate=!0,r.repeat.set(.25,1/3);const o=new wt({map:r,roughness:.95,color:15657698}),a=e.ashlar.clone();a.needsUpdate=!0,a.repeat.set(.5,1);const h=new wt({map:a,roughness:.9,color:13157564});let c=1/0,l=-1/0;for(const V of s.pts){const G=V[0]*s.rx+V[1]*s.rz;c=Math.min(c,G),l=Math.max(l,G)}const u=s.rx>0?c:l,f=s.rx>0?-1:1,d=s.rx*u+s.nx*s.mid,g=s.rz*u+s.nz*s.mid,x=s.eave+s.slope*s.half,m=x+6.2-s.y0,p=4.4,M=1,_=x-s.y0+.5,v=_+2.3,y=new fr;y.moveTo(-p/2-.5,0),y.lineTo(p/2+.5,0),y.lineTo(p/2+.5,_-2.2),y.lineTo(p/2,_-1.4),y.lineTo(p/2,v),y.quadraticCurveTo(p/2-.2,m-1.2,.08,m),y.lineTo(-.08,m),y.quadraticCurveTo(-p/2+.2,m-1.2,-p/2,v),y.lineTo(-p/2,_-1.4),y.lineTo(-p/2-.5,_-2.2),y.closePath();const S=(V,G,Y,W)=>{const $=new nr;return $.moveTo(V-Y/2,G),$.lineTo(V+Y/2,G),$.lineTo(V+Y/2,G+W-Y/2),$.absarc(V,G+W-Y/2,Y/2,0,Math.PI,!1),$.closePath(),$},w=[[-1,_,1.05,2],[1,_,1.05,2]];for(const V of w)y.holes.push(S(...V));const T=new ga(y,{depth:M,bevelEnabled:!1,curveSegments:8});T.translate(0,0,-M/2);const b=new xt(T,o);b.castShadow=b.receiveShadow=!0,b.position.set(d+s.rx*f*(M/2-.2),s.y0,g+s.rz*f*(M/2-.2)),b.rotation.y=Math.atan2(s.rx,s.rz),i.add(b),i.userData.bellTower={x:d,z:g,bells:null};const E=new pa([[0,.62],[.12,.6],[.2,.5],[.24,.25],[.34,.02],[.36,0],[0,.04]].map(([V,G])=>new ut(V,G)),16),C=new wt({color:7033648,metalness:.8,roughness:.35}),I=[];for(const[V,G,Y,W]of w){const $=new zt;$.position.set(V,G+W-Y/2,0),b.add($),I.push($);const it=new xt(E,C);it.scale.setScalar(Y*.85),it.position.set(0,-.62*Y*.85,0),$.add(it);const Mt=new xt(new Qt(Y,.12,.14),new wt({color:3811866}));Mt.position.set(V,G+W-Y/2+.06,0),b.add(Mt)}i.userData.bellTower.bells=I;const F=new xt(new Qt(p+.3,.18,M+.25),h);F.position.set(0,_-.09,0),b.add(F);const A=s.pts,L=A.length;let N=null;for(let V=0;V<L;V++){const G=A[V],Y=A[(V+1)%L],W=Math.hypot(Y[0]-G[0],Y[1]-G[1]);if(W<1)continue;let $=-(Y[1]-G[1])/W,it=(Y[0]-G[0])/W,Mt=0,gt=0;for(const ft of A)Mt+=ft[0]/L,gt+=ft[1]/L;((G[0]+Y[0])/2-Mt)*$+((G[1]+Y[1])/2-gt)*it<0&&($=-$,it=-it);const Pt=(G[0]+Y[0])/2,Rt=(G[1]+Y[1])/2,dt=t.height(Pt,Rt),Tt=e.ashlar.clone();Tt.needsUpdate=!0,Tt.repeat.set(W/2,.3);const k=new xt(new Qt(W,.6,.5),new wt({map:Tt,roughness:.9,color:12104876}));k.position.set(Pt+$*.25,dt+.1,Rt+it*.25),k.rotation.y=Math.atan2(Y[0]-G[0],Y[1]-G[1])-Math.PI/2,k.castShadow=!0,i.add(k),it>.85&&W>4&&(!N||Rt>N.mz)&&(N={a:G,b:Y,L:W,ox:$,oz:it,mz:Rt})}if(N){const{a:V,b:G,L:Y,ox:W,oz:$}=N,it=Math.atan2(G[0]-V[0],G[1]-V[1])-Math.PI/2,Mt=e.brick.clone();Mt.needsUpdate=!0,Mt.repeat.set(.25,6);const gt=new wt({map:Mt,roughness:.9}),Pt=new wt({color:2762274,roughness:1}),Rt=new wt({color:1842204,metalness:.5,roughness:.5}),dt=4,Tt=Math.min(t.height(V[0],V[1]),t.height(G[0],G[1])),k=new xt(new Qt(Y,.25,.3),new wt({color:6964264,roughness:.9}));k.position.set((V[0]+G[0])/2+W*.2,Tt+3.1,(V[1]+G[1])/2+$*.2),k.rotation.y=it,i.add(k);for(let ft=0;ft<dt;ft++){const Q=(ft+.5)/dt,at=V[0]+(G[0]-V[0])*Q+W*.2,st=V[1]+(G[1]-V[1])*Q+$*.2;if(ft<dt-1){const R=(ft+1)/dt,X=V[0]+(G[0]-V[0])*R+W*.2,ct=V[1]+(G[1]-V[1])*R+$*.2,et=new xt(new Qt(.45,3,.45),gt);et.position.set(X,Tt+1.5,ct),et.rotation.y=it,et.castShadow=!0,i.add(et)}const At=Y/dt-.5,yt=new zt;yt.position.set(at,Tt+.6,st),yt.rotation.y=it,i.add(yt);const P=new xt(new Pe(Y/dt-.45,2.4),Pt);P.position.set(0,.9,-.12),yt.add(P);for(let R=0;R<=At/.14;R++){const X=new xt(new Qt(.025,2.2,.025),Rt);X.position.set(-At/2+R*.14,1.1,0),yt.add(X)}for(const R of[.05,1,2.2]){const X=new xt(new Qt(At,.05,.04),Rt);X.position.set(0,R,0),yt.add(X)}}}const z=new wt({color:1973790,metalness:.7,roughness:.5}),O=new xt(new Qt(.08,1.1,.08),z);O.position.set(0,m+.55,0),b.add(O);const H=new xt(new Qt(.6,.08,.08),z);return H.position.set(0,m+.75,0),b.add(H),i}function nx(s,t,e){const n=new zt,i=s.plaza;if(!i)return n;const r=new wt({color:8016434,roughness:.85}),o=new wt({color:2302755,metalness:.6,roughness:.5});for(const[a,h,c]of i.benches||[]){const l=Re.degToRad(c),u=new zt;u.position.set(a,t.height(a,h),h),u.rotation.y=Math.atan2(Math.sin(l),-Math.cos(l));for(let m=0;m<3;m++){const p=new xt(new Qt(1.8,.04,.12),r);p.position.set(0,.45,.16-m*.15),p.castShadow=!0,u.add(p)}for(let m=0;m<2;m++){const p=new xt(new Qt(1.8,.11,.035),r);p.position.set(0,.62+m*.16,-.2),p.rotation.x=-.15,p.castShadow=!0,u.add(p)}for(const m of[-.75,.75]){const p=new xt(new Qt(.05,.45,.45),o);p.position.set(m,.22,0),u.add(p);const M=new xt(new Qt(.05,.45,.05),o);M.position.set(m,.68,-.21),u.add(M)}n.add(u);const f=Math.sin(l),d=-Math.cos(l),g=-d,x=f;e.addSegment(a-g*.9,h-x*.9,a+g*.9,h+x*.9,"wall")}return n}function ix(s,t){const e=s.length,n=[],i=Io(s)>0?1:-1;for(let r=0;r<e;r++){const o=s[(r-1+e)%e],a=s[r],h=s[(r+1)%e],c=ih([a[0]-o[0],a[1]-o[1]]),l=ih([h[0]-a[0],h[1]-a[1]]),u=[c[1]*i,-c[0]*i],f=[l[1]*i,-l[0]*i];let d=u[0]+f[0],g=u[1]+f[1];const x=Math.hypot(d,g)||1;d/=x,g/=x;const m=Math.max(.35,d*u[0]+g*u[1]);n.push([a[0]+d*t/m,a[1]+g*t/m])}return n}function ih(s){const t=Math.hypot(s[0],s[1])||1;return[s[0]/t,s[1]/t]}function du(s,t,e,n){var g;const i={asphalt:new ze,concrete:new ze,dirt:new ze,sidewalk:new ze},r=s.style==="urban",o=[];let a=[];const h=new Set(["residential","tertiary","secondary","primary","unclassified","living_street","tertiary_link","secondary_link"]);if(r)for(const x of s.roads){if(!h.has(x.k)||x.bridge)continue;const m=In(x.p,2.5),p=x.w/2+2.3;let M=0;for(let _=0;_<m.length-1;_++){const v=m[_],y=m[_+1],S=Tn(m,_),w=Tn(m,_+1),T=Math.hypot(y[0]-v[0],y[1]-v[1]),b=A=>t.height(A[0],A[1])+.05,E=[v[0]+S[0]*p,v[1]+S[1]*p],C=[v[0]-S[0]*p,v[1]-S[1]*p],I=[y[0]+w[0]*p,y[1]+w[1]*p],F=[y[0]-w[0]*p,y[1]-w[1]*p];if(i.sidewalk.quad([C[0],b(C),C[1]],[E[0],b(E),E[1]],[I[0],b(I),I[1]],[F[0],b(F),F[1]],[0,M/2],[p,M/2],[p,(M+T)/2],[0,(M+T)/2]),Math.floor((M+T)/28)>Math.floor(M/28)){const A=Math.floor(M/28)%2?1:-1,L=x.w/2+1.2;o.push([v[0]+S[0]*L*A,v[1]+S[1]*L*A,Math.atan2(-S[0]*A,-S[1]*A)])}M+=T}}if(!r&&n){const[x,m]=((g=s.plaza)==null?void 0:g.start)||s.spawn;for(const p of s.roads){if(!h.has(p.k)||p.k==="trunk")continue;const M=In(p.p,2.5);let _=0,v=0;for(let y=0;y<M.length-1;y++){const S=M[y],w=M[y+1],T=Math.hypot(w[0]-S[0],w[1]-S[1]),b=Math.hypot(S[0]-x,S[1]-m);if(_>=v&&b<320){const E=n.nearest(S[0],S[1],p.w/2+4);E&&!o.some(C=>Math.hypot(C[0]-E.x,C[1]-E.z)<(b<140?22:60))&&(o.push([E.x+E.nx*.03,E.z+E.nz*.03,Math.atan2(E.nx,E.nz)]),v=_+(b<140?30:75))}_+=T}}}const c=s.step||2.5,l=s.lift??.08;for(const x of s.roads){const m=i[x.s]||i.asphalt,p=x.w/2,M=In(x.p,c);let _=0;for(let v=0;v<M.length-1;v++){const y=M[v],S=M[v+1],w=Tn(M,v),T=Tn(M,v+1),b=Math.hypot(S[0]-y[0],S[1]-y[1]),E=[y[0]+w[0]*p,y[1]+w[1]*p],C=[y[0]-w[0]*p,y[1]-w[1]*p],I=[S[0]+T[0]*p,S[1]+T[1]*p],F=[S[0]-T[0]*p,S[1]-T[1]*p],A=N=>t.height(N[0],N[1])+l,L=x.w/4;m.quad([C[0],A(C),C[1]],[E[0],A(E),E[1]],[I[0],A(I),I[1]],[F[0],A(F),F[1]],[0,_/4],[L,_/4],[L,(_+b)/4],[0,(_+b)/4]),_+=b}}const u=new zt,f={asphalt:new wt({map:e.asphalt,roughness:1,metalness:0,polygonOffset:!0,polygonOffsetFactor:-2}),concrete:new wt({map:e.concrete,roughness:.95,polygonOffset:!0,polygonOffsetFactor:-2}),dirt:new wt({map:e.dirt,roughness:1,polygonOffset:!0,polygonOffsetFactor:-1,transparent:!0,opacity:.85}),sidewalk:new wt({map:e.sidewalk,roughness:.9,polygonOffset:!0,polygonOffsetFactor:-1})};for(const[x,m]of Object.entries(i))if(m.pos.length){const p=new xt(m.build(),f[x]);p.receiveShadow=!0,u.add(p)}const d=new ze;for(const x of s.roads)if(x.lines){const m=In(x.p,c);for(let p=0;p<m.length-1;p++)for(const M of[-x.w/2+.3,x.w/2-.3]){const _=m[p],v=m[p+1],y=Tn(m,p),S=Tn(m,p+1),w=[_[0]+y[0]*M,_[1]+y[1]*M],T=[v[0]+S[0]*M,v[1]+S[1]*M],b=.07,E=C=>t.height(C[0],C[1])+l+.02;d.quad([w[0]-y[0]*b,E(w),w[1]-y[1]*b],[w[0]+y[0]*b,E(w),w[1]+y[1]*b],[T[0]+S[0]*b,E(T),T[1]+S[1]*b],[T[0]-S[0]*b,E(T),T[1]-S[1]*b],[0,0],[1,0],[1,1],[0,1])}}if(o.length){let x,m,p,M;if(r){x=6,M=1.1;const E=new ce(.06,.09,x,6);E.translate(0,x/2,0);const C=new Qt(.08,.08,1.2);C.translate(0,x-.05,.55),m=Zn([E,C]),p=new Qt(.3,.12,.55),p.translate(0,x-.25,1.1)}else{x=3.9,M=.7;const E=new Qt(.16,.3,.04);E.translate(0,x-.1,.02);const C=new Qt(.04,.04,.72);C.translate(0,x,.36);const I=new Qt(.03,.03,.5);I.rotateX(.75),I.translate(0,x-.18,.2);const F=new pi(.2,.18,4);F.rotateY(Math.PI/4),F.translate(0,x-.12,M),m=Zn([E,C,I,F].map(A=>A.index?A.toNonIndexed():A)),p=new ce(.15,.1,.32,4),p.rotateY(Math.PI/4),p.translate(0,x-.37,M)}const _=new $e(m,new wt({color:r?4870230:2500650,roughness:.5,metalness:.6}),o.length),v=new wt({color:16774360,emissive:16762992,emissiveIntensity:0,roughness:.3});cr.lamps.push(v);const y=new $e(p,v,o.length),S=new se,w=new yn,T=new U(0,1,0),b=new U;o.forEach(([E,C,I],F)=>{w.setFromAxisAngle(T,I);const A=t.height(E,C);S.compose(new U(E,A,C),w,new U(1,1,1)),_.setMatrixAt(F,S),y.setMatrixAt(F,S),b.set(0,0,M).applyQuaternion(w),o[F]=[E,C,I,E+b.x,A+x-.5,C+b.z],n&&r&&n.addSegment(E-.12,C,E+.12,C,"tree")}),_.castShadow=!0,u.add(_,y),u.userData.lamps=o}if(!r&&n){const x=sx(s,t,n);u.add(x),a=x.userData.lamps||[]}return d.pos.length&&u.add(new xt(d.build(),new wt({color:15263968,roughness:.6,polygonOffset:!0,polygonOffsetFactor:-4}))),a.length&&(u.userData.lamps=[...u.userData.lamps||[],...a]),u}function sx(s,t,e){var z;const[n,i]=((z=s.plaza)==null?void 0:z.start)||s.spawn,r=7.2,o=[],a=[];for(const O of s.roads){if(!["residential","living_street","tertiary","unclassified"].includes(O.k))continue;const H=In(O.p,2);let V=0,G=6,Y=null;const W=Math.abs(Math.round(O.p[0][0]*13+O.p[0][1]*7))%2;for(let $=0;$<H.length-1;$++){const it=H[$],Mt=H[$+1],gt=Math.hypot(Mt[0]-it[0],Mt[1]-it[1]);if(V+=gt,V<G||Math.hypot(it[0]-n,it[1]-i)>300)continue;const Pt=Tn(H,$);let Rt=null;for(const dt of[1,-1]){const Tt=O.w/2+.45,k=it[0]+Pt[0]*Tt*dt,ft=it[1]+Pt[1]*Tt*dt;if(!e.nearest(k,ft,.6)&&!o.some(Q=>Math.hypot(Q[0]-k,Q[1]-ft)<12)){Rt=[k,ft,Math.atan2(-Pt[0]*dt,-Pt[1]*dt),W];break}}if(!Rt){G=V+4;continue}o.push(Rt),G=V+30+o.length%3*4,Y&&Math.hypot(Y[0]-Rt[0],Y[1]-Rt[1])<45&&a.push([Y,Rt]),Y=Rt}}const h=new zt;if(!o.length)return h;const c=new ce(.09,.13,r,6);c.translate(0,r/2,0);const l=new Qt(.9,.08,.08);l.translate(0,r-.3,0);const u=new ce(.035,.035,1.5,5);u.rotateX(Math.PI/2-.25),u.translate(0,r-1.6,.7);const f=new Qt(.22,.1,.5);f.translate(0,r-1.42,1.45);const d=new wt({color:5061418,roughness:1}),g=new wt({color:9080208,roughness:.5,metalness:.5}),x=new wt({color:16774360,emissive:16767136,emissiveIntensity:0,roughness:.3});cr.lamps.push(x);const m=new wt({color:11842220,roughness:.95}),p=o.map(O=>O[3]),M=p.filter(O=>!O).length,_=new Qt(.2,r,.16);_.translate(0,r/2,0);const v=new $e(Zn([c,l]),d,Math.max(1,M)),y=new $e(Zn([_,l.clone()]),m,Math.max(1,o.length-M));v.count=M,y.count=o.length-M;let S=0,w=0;const T=[],b=new $e(u,g,o.length),E=new $e(f,x,o.length),C=new se,I=new yn,F=new U(0,1,0),A=new U(1,1,1);o.forEach(([O,H,V],G)=>{I.setFromAxisAngle(F,V),C.compose(new U(O,t.height(O,H),H),I,A),(p[G]?y:v).setMatrixAt(p[G]?w++:S++,C),b.setMatrixAt(G,C),E.setMatrixAt(G,C),e.addSegment(O-.12,H,O+.12,H,"tree");const Y=t.height(O,H);T.push([O,H,V,O+Math.sin(V)*1.45,Y+r-1.5,H+Math.cos(V)*1.45])}),h.userData.lamps=T,v.castShadow=y.castShadow=!0,h.add(v,y,b,E);const L=[];for(const[O,H]of a)for(const V of[-.4,.4]){const G=t.height(O[0],O[1])+r-.25,Y=t.height(H[0],H[1])+r-.25,W=O[0]+Math.cos(O[2])*V,$=O[1]-Math.sin(O[2])*V,it=H[0]+Math.cos(H[2])*V,Mt=H[1]-Math.sin(H[2])*V,gt=Math.hypot(it-W,Mt-$),Pt=.012*gt*gt/10+.3;for(let Rt=0;Rt<8;Rt++)for(const dt of[Rt/8,(Rt+1)/8])L.push(W+(it-W)*dt,G+(Y-G)*dt-Math.sin(dt*Math.PI)*Pt,$+(Mt-$)*dt)}const N=new de;return N.setAttribute("position",new te(L,3)),h.add(new Jh(N,new ur({color:1710618}))),h}function In(s,t){const e=[s[0]];for(let n=1;n<s.length;n++){const i=s[n-1],r=s[n],o=Math.hypot(r[0]-i[0],r[1]-i[1]),a=Math.max(1,Math.ceil(o/t));for(let h=1;h<=a;h++)e.push([i[0]+(r[0]-i[0])*h/a,i[1]+(r[1]-i[1])*h/a])}return e}function Tn(s,t){const e=s[Math.max(0,t-1)],n=s[Math.min(s.length-1,t+1)],i=n[0]-e[0],r=n[1]-e[1],o=Math.hypot(i,r)||1;return[-r/o,i/o]}function rx(s,t,e=[]){var m;const[n,i]=((m=s.plaza)==null?void 0:m.start)||s.spawn,r=[],o=s.roads.filter(p=>p.k!=="path"),a=new Map,h=8,c=(p,M)=>`${Math.floor(p/h)},${Math.floor(M/h)}`;for(const p of o){const M=In(p.p,1.5);for(const _ of M){const v=c(_[0],_[1]);a.has(v)||a.set(v,[]),a.get(v).push([_[0],_[1],p.w/2,p])}}const l=(p,M,_)=>{const v=Math.floor(p/h),y=Math.floor(M/h);for(let S=v-1;S<=v+1;S++)for(let w=y-1;w<=y+1;w++)for(const[T,b,E,C]of a.get(`${S},${w}`)||[])if(Math.hypot(T-p,b-M)<E+(C===_?.3:1))return!0;return!1};let u=11;const f=()=>(u=u*16807%2147483647)/2147483647,d=new Set(["residential","living_street","tertiary","unclassified","secondary"]),g=18,x=60;for(const p of s.roads){if(!d.has(p.k))continue;const M=In(p.p,2);for(const _ of[1,-1]){const v=M.map((T,b)=>Tn(M,Math.min(b,M.length-2))),y=p.w/2+.3,S=M.map((T,b)=>{const E=v[b],C=T[0]+E[0]*y*_,I=T[1]+E[1]*y*_,F=t.raycast(C,I,C+E[0]*g*_,I+E[1]*g*_);return F<1?y+F*g:null});let w=0;for(;w<M.length;){if(S[w]==null||w+1<M.length&&S[w+1]!=null){w++;continue}let T=w+1;for(;T<M.length&&S[T]==null;)T++;if(T>=M.length||(T-w)*2>x||T-w<2){w=T;continue}const b=[],E=[];for(let F=w;F<=T;F++){const A=S[w]+(S[T]-S[w])*(F-w)/(T-w)+.15,L=v[F],N=M[F][0]+L[0]*A*_,z=M[F][1]+L[1]*A*_,O=Math.hypot(N-n,z-i);b.push([N,z]),E.push(O>30&&O<300&&!l(N,z,p)&&!e.some(H=>Math.hypot(H.x-N,H.z-z)<20))}let C=[];const I=()=>{if(C.length>=2){const F=f()<.25,A=F?2.2+f()*1.2:1+f()*.6;r.push({p:C,hs:C.map(()=>F?A*(.55+f()*.6):A+(f()-.5)*.15),ruin:F})}C=[]};b.forEach((F,A)=>{E[A]?C.push(F):I()}),I(),w=T}}}return r}function ax(s,t,e,n){const i=new ze,r=new ze;for(const a of s.walls){const h=a.mat==="bloque"?r:i,c=a.hs?a.p:In(a.p,2),l=a.ruin?.3:.25;let u=0;const f=d=>a.hs?a.hs[d]:a.h||1.2;for(let d=0;d<c.length-1;d++){const g=c[d],x=c[d+1],m=Tn(c,d),p=Math.hypot(x[0]-g[0],x[1]-g[1]),M=t.height(g[0],g[1])-.2,_=t.height(x[0],x[1])-.2,v=f(d),y=f(d+1);for(const E of[1,-1]){const C=[g[0]+m[0]*l*E,g[1]+m[1]*l*E],I=[x[0]+m[0]*l*E,x[1]+m[1]*l*E],F=[[C[0],M,C[1]],[I[0],_,I[1]],[I[0],_+y,I[1]],[C[0],M+v,C[1]]],A=[[u/3,0],[(u+p)/3,0],[(u+p)/3,y/3],[u/3,v/3]];E>0?h.quad(F[1],F[0],F[3],F[2],A[1],A[0],A[3],A[2]):h.quad(...F,...A)}const S=[g[0]+m[0]*l,g[1]+m[1]*l],w=[x[0]+m[0]*l,x[1]+m[1]*l],T=[x[0]-m[0]*l,x[1]-m[1]*l],b=[g[0]-m[0]*l,g[1]-m[1]*l];if(h.quad([b[0],M+v,b[1]],[T[0],_+y,T[1]],[w[0],_+y,w[1]],[S[0],M+v,S[1]],[0,0],[p/3,0],[p/3,.15],[0,.15]),d===0||d===c.length-2){const E=d===0?g:x,C=d===0?M:_,I=d===0?v:y,F=[E[0]+m[0]*l,E[1]+m[1]*l],A=[E[0]-m[0]*l,E[1]-m[1]*l];h.quad([F[0],C,F[1]],[A[0],C,A[1]],[A[0],C+I,A[1]],[F[0],C+I,F[1]],[0,0],[.17,0],[.17,I/3],[0,I/3])}n.addSegment(g[0],g[1],x[0],x[1],"wall"),u+=p}}const o=new zt;for(const[a,h]of[[i,e.stone],[r,e.block||e.stone]]){if(!a.pos.length)continue;const c=new xt(a.build(),new wt({map:h,roughness:1,side:be}));c.castShadow=c.receiveShadow=!0,o.add(c)}return o}function Uo(s,t){const e=Zn(Array.from({length:t},(n,i)=>{const r=new xa(1,s),o=r.attributes.position;let a=i*97+3;const h=()=>(a=a*16807%2147483647)/2147483647;for(let l=0;l<o.count;l++){const u=.82+h()*.3;o.setXYZ(l,o.getX(l)*u,o.getY(l)*u*.8,o.getZ(l)*u)}const c=i*2.1;return r.scale(.78,.78,.78),i&&r.translate(Math.cos(c)*.5,.12*i-.15,Math.sin(c)*.5),r.index?r.toNonIndexed():r}));return e.computeVertexNormals(),e}class ox{constructor(t,e,n,i){this.list=t.trees,this.terrain=e;const r=new wt({map:n.leaves,color:10135684,roughness:.95,flatShading:!0}),o=new wt({map:n.bark,roughness:1}),a=new ce(.12,.2,2,6);a.translate(0,1,0);const h=this.list.length,c=600;this.lowCrown=new $e(Uo(0,3),r,h),this.lowTrunk=new $e(a,o,h),this.hiCrown=new $e(Uo(1,4),r,c),this.hiTrunk=new $e(a,o,c),this.hiCrown.castShadow=this.hiTrunk.castShadow=!0,this.hiCrown.receiveShadow=!0;for(const x of[this.lowCrown,this.lowTrunk,this.hiCrown,this.hiTrunk])x.frustumCulled=!1;this.mats=[],this.colors=[],new se;const l=new yn,u=new U,f=new U,d=new Wt,g=new U(0,1,0);this.list.forEach(([x,m,p],M)=>{const _=e.height(x,m);l.setFromAxisAngle(g,(x*13.37+m*7.1)%6.28),u.set(p,p,p),f.set(x,_-.1,m);const v=new se().compose(f,l,u);u.set(p*2.2,p*1.8,p*2.2),f.set(x,_+p*2.6,m);const y=new se().compose(f,l,u);this.mats.push([v,y]),d.setHSL(.2+((x*3.1+m)%1+1)%1*.07,.22,.4+((x+m*2.3)%1+1)%1*.14),this.colors.push(d.clone()),this.lowTrunk.setMatrixAt(M,v),this.lowCrown.setMatrixAt(M,y),this.lowCrown.setColorAt(M,d);const S=.3*p;i.addSegment(x-S,m,x+S,m,"tree"),i.addSegment(x,m-S,x,m+S,"tree")}),this.zero=new se().makeScale(0,0,0),this.near=[],this.last=null,this.group=new zt,this.group.add(this.lowTrunk,this.lowCrown,this.hiTrunk,this.hiCrown),this.hiCrown.count=this.hiTrunk.count=0}update(t){if(this.last&&Math.hypot(t.x-this.last.x,t.z-this.last.z)<15)return;this.last={x:t.x,z:t.z};for(const n of this.near)this.lowTrunk.setMatrixAt(n,this.mats[n][0]),this.lowCrown.setMatrixAt(n,this.mats[n][1]);this.near=[];const e=140*140;for(let n=0;n<this.list.length&&this.near.length<600;n++){const[i,r]=this.list[n],o=i-t.x,a=r-t.z;o*o+a*a<e&&this.near.push(n)}this.near.forEach((n,i)=>{this.hiTrunk.setMatrixAt(i,this.mats[n][0]),this.hiCrown.setMatrixAt(i,this.mats[n][1]),this.hiCrown.setColorAt(i,this.colors[n]),this.lowTrunk.setMatrixAt(n,this.zero),this.lowCrown.setMatrixAt(n,this.zero)}),this.hiCrown.count=this.hiTrunk.count=this.near.length;for(const n of[this.lowTrunk,this.lowCrown,this.hiTrunk,this.hiCrown])n.instanceMatrix.needsUpdate=!0;this.hiCrown.instanceColor&&(this.hiCrown.instanceColor.needsUpdate=!0)}}function lx(s,t,e,n,i,r=null,o=null){const a=s.n,h=(a-1)*s.cell,c=new Pe(h,h,a-1,a-1);c.rotateX(-Math.PI/2),c.translate(s.origin[0]+h/2,0,s.origin[1]+h/2);const l=c.attributes.position;for(let g=0;g<l.count;g++)l.setY(g,t.ground(l.getX(g),l.getZ(g)));const u=t.f;if(u){const g=c.index.array,x=[];for(let m=0;m<g.length;m+=3){const p=(l.getX(g[m])+l.getX(g[m+1])+l.getX(g[m+2]))/3,M=(l.getZ(g[m])+l.getZ(g[m+1])+l.getZ(g[m+2]))/3;p>u.x0&&p<u.x1&&M>u.z0&&M<u.z1||x.push(g[m],g[m+1],g[m+2])}c.setIndex(x)}c.computeVertexNormals();const f=pu(e,n,s.ortho.full,s.ortho.center,i,r,o),d=new xt(c,f);if(d.receiveShadow=!0,u){const g=new Pe(u.x1-u.x0,u.z1-u.z0,u.nx-1,u.nz-1);g.rotateX(-Math.PI/2),g.translate((u.x0+u.x1)/2,0,(u.z0+u.z1)/2);const x=g.attributes.position;for(let p=0;p<x.count;p++)x.setY(p,t.ground(x.getX(p),x.getZ(p)));g.computeVertexNormals();const m=new xt(g,f);m.receiveShadow=!0,d.add(m)}return d}function pu(s,t,e,n,i,r=null,o=null,a=null){const h=new wt({map:s,roughness:1});return h.onBeforeCompile=c=>{c.uniforms.tCenter=h.userData.tC||(h.userData.tC={value:t}),c.uniforms.tDetail={value:i.detail},c.uniforms.tMask={value:(r==null?void 0:r.tex)||null},c.uniforms.maskB={value:(r==null?void 0:r.bounds)||new fe(0,0,1,1)},c.uniforms.tAsph={value:i.asphalt},c.uniforms.tConc={value:i.concrete},c.uniforms.tDirt={value:i.dirt},c.uniforms.tGrass={value:i.grass},c.uniforms.tGravel={value:i.gravel},c.uniforms.tPaint={value:(o==null?void 0:o.tex)||null},c.uniforms.paintB={value:(o==null?void 0:o.bounds)||new fe(0,0,1,1)},a&&(c.uniforms.tMid=a.tex,c.uniforms.midB=a.bounds),c.uniforms.fullB={value:new fe(...e)},c.uniforms.centerB=h.userData.cB||(h.userData.cB={value:new fe(...n)}),c.vertexShader=c.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vWPos;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
vWPos = (modelMatrix * vec4(transformed,1.0)).xyz;`),c.fragmentShader=c.fragmentShader.replace("#include <common>",`#include <common>
      varying vec3 vWPos; uniform sampler2D tCenter; uniform sampler2D tDetail; uniform vec4 fullB; uniform vec4 centerB;
      uniform sampler2D tMask; uniform sampler2D tAsph; uniform sampler2D tConc; uniform sampler2D tDirt; uniform vec4 maskB; uniform sampler2D tGrass; uniform sampler2D tGravel; uniform sampler2D tPaint; uniform vec4 paintB;${a?" uniform sampler2D tMid; uniform vec4 midB;":""}`).replace("#include <map_fragment>",`
      vec2 uvF = vec2((vWPos.x - fullB.x) / (fullB.z - fullB.x), (vWPos.z - fullB.y) / (fullB.w - fullB.y));
      vec4 col = texture2D(map, uvF);
      ${a?`vec2 uvMd = vec2((vWPos.x - midB.x) / (midB.z - midB.x), (vWPos.z - midB.y) / (midB.w - midB.y));
      if (uvMd.x > 0.0 && uvMd.x < 1.0 && uvMd.y > 0.0 && uvMd.y < 1.0) { // ortofoto media (2 m/px) alrededor del jugador
        vec4 mc = texture2D(tMid, uvMd); vec2 em = min(uvMd, 1.0 - uvMd);
        col.rgb = mix(col.rgb, mc.rgb, mc.a * smoothstep(0.0, 0.03, min(em.x, em.y)));
      }`:""}
      vec2 uvC = vec2((vWPos.x - centerB.x) / (centerB.z - centerB.x), (vWPos.z - centerB.y) / (centerB.w - centerB.y));
      if (uvC.x > 0.0 && uvC.x < 1.0 && uvC.y > 0.0 && uvC.y < 1.0) {
        vec2 e = min(uvC, 1.0 - uvC); float k = smoothstep(0.0, 0.05, min(e.x, e.y));
        col = mix(col, texture2D(tCenter, uvC), k);
      }
      float d = texture2D(tDetail, vWPos.xz / 3.0).r * 0.6 + texture2D(tDetail, vWPos.xz / 17.0).r * 0.4;
      col.rgb *= mix(1.0, d * 1.9, 0.55);
      col.rgb = pow(col.rgb, vec3(1.08)) * 1.08; // la ortofoto es plana; algo de contraste
      ${r?`vec2 uvM = (vWPos.xz - maskB.xy) / maskB.zw;
      if (uvM.x > 0.0 && uvM.x < 1.0 && uvM.y > 0.0 && uvM.y < 1.0) {
        vec4 mk = texture2D(tMask, uvM); float a = smoothstep(0.3, 0.7, mk.a); // alfa: el rojo vale 255 hasta en el borde difuminado y ensanchaba el asfalto
        vec3 asph = mix(texture2D(tConc, vWPos.xz / 4.0).rgb, texture2D(tAsph, vWPos.xz / 4.0).rgb, smoothstep(0.3, 0.7, mk.g / max(mk.r, 0.01))) * (0.92 + 0.16 * d);
        // fuera de la calle, dentro del pueblo: tierra (la ortofoto de cerca es una mancha)
        float vf = 1.0 - smoothstep(200.0, 290.0, length(vWPos.xz - maskB.xy - maskB.zw * 0.5));
        vec3 dirt = texture2D(tDirt, vWPos.xz / 3.0).rgb;
        col.rgb = mix(col.rgb, mix(col.rgb, dirt, 0.8) * (0.8 + 0.25 * d), 0.95 * vf * (1.0 - a)); // todo lo que no es calle, tierra (lo pidió Darío: el gris de la foto confundía)
        ${o?`vec2 uvP = (vWPos.xz - paintB.xy) / paintB.zw;
        if (uvP.x > 0.0 && uvP.x < 1.0 && uvP.y > 0.0 && uvP.y < 1.0) { // suelo pintado por Darío en el plano
          vec4 pk = texture2D(tPaint, uvP); float sw = pk.r + pk.g + pk.b + 0.001;
          vec3 pc = (texture2D(tDirt, vWPos.xz / 3.0).rgb * pk.r + texture2D(tGrass, vWPos.xz / 2.5).rgb * pk.g + texture2D(tGravel, vWPos.xz / 2.0).rgb * pk.b) / sw;
          col.rgb = mix(col.rgb, pc * (0.82 + 0.3 * d), smoothstep(0.15, 0.6, pk.a));
        }`:""}
        col.rgb = mix(col.rgb, asph, a);
      }`:""}
      diffuseColor *= col;`)},h.customProgramCacheKey=()=>"terrain"+(r?"m":"")+(o?"p":"")+(a?"d":""),h}function mu(s,t=2){const e=i=>`${Math.round(i[0]*2)},${Math.round(i[1]*2)}`,n=new Map;for(const i of s)for(const r of i.p)n.set(e(r),(n.get(e(r))||0)+1);for(const i of s){const r=i.k==="residential"||i.k==="living_street"?5:14;let o=i.p;for(let a=0;a<t;a++){const h=(l,u)=>u===0||u===o.length-1||n.get(e(l))>1,c=[o[0]];for(let l=1;l<o.length-1;l++){const u=o[l];if(h(u,l)){c.push(u);continue}const f=o[l-1],d=o[l+1],g=Math.hypot(u[0]-f[0],u[1]-f[1]),x=Math.hypot(d[0]-u[0],d[1]-u[1]),m=Math.min(g*.25,r)/(g||1),p=Math.min(x*.25,r)/(x||1);c.push([u[0]+(f[0]-u[0])*m,u[1]+(f[1]-u[1])*m],[u[0]+(d[0]-u[0])*p,u[1]+(d[1]-u[1])*p])}c.push(o[o.length-1]),o=c}i.p=o.map(a=>[a[0],a[1]])}return s}function cx(s,t,e=320,n=1024){const i=document.createElement("canvas");i.width=i.height=n;const r=i.getContext("2d"),o=n/(2*e),a=u=>(u-t[0]+e)*o,h=u=>(u-t[1]+e)*o;r.lineCap="round",r.lineJoin="round",r.filter="blur(2px)";for(const u of[0,1])for(const f of s.roads)f.k==="track"||f.k==="path"||f.k==="trunk"||u===1&&(r.strokeStyle=u?"#ff0":"#f00",r.lineWidth=(f.w+.3)*o,r.beginPath(),f.p.forEach((d,g)=>g?r.lineTo(a(d[0]),h(d[1])):r.moveTo(a(d[0]),h(d[1]))),r.stroke());r.filter="none",r.globalCompositeOperation="destination-in";const c=r.createRadialGradient(n/2,n/2,220*o,n/2,n/2,290*o);c.addColorStop(0,"#fff"),c.addColorStop(1,"rgba(255,255,255,0)"),r.fillStyle=c,r.fillRect(0,0,n,n);const l=new Sn(i);return l.flipY=!1,l.minFilter=on,l.generateMipmaps=!1,{tex:l,bounds:new fe(t[0]-e,t[1]-e,2*e,2*e)}}function gu(s,t,e,n){const i=new ze,r=new ze;for(const a of s){if(!a.bridge||a.p.length<2)continue;const h=a.p,c=a.w/2+.5;let l=0;const u=[0];for(let M=1;M<h.length;M++)u.push(l+=Math.hypot(h[M][0]-h[M-1][0],h[M][1]-h[M-1][1]));if(l<3)continue;const f=t.ground(h[0][0],h[0][1]),d=t.ground(h[h.length-1][0],h[h.length-1][1]),g=In(h,3),x=[];let m=0;for(let M=0;M<g.length;M++)M&&(m+=Math.hypot(g[M][0]-g[M-1][0],g[M][1]-g[M-1][1])),x.push(Math.max(f+(d-f)*m/l,t.ground(g[M][0],g[M][1]))+.1);for(let M=0;M<g.length-1;M++)t.addDeck(g[M][0],g[M][1],g[M+1][0],g[M+1][1],x[M],x[M+1],c);let p=0;for(let M=0;M<g.length-1;M++){const _=g[M],v=g[M+1],y=Tn(g,M),S=Tn(g,M+1),w=Math.hypot(v[0]-_[0],v[1]-_[1]);for(const F of[1,-1]){const A=F*c,L=[_[0]+y[0]*A,_[1]+y[1]*A],N=[v[0]+S[0]*A,v[1]+S[1]*A],z=x[M],O=x[M+1],H=.9;((W,$,it,Mt)=>F>0?r.quad([L[0],W,L[1]],[N[0],it,N[1]],[N[0],Mt,N[1]],[L[0],$,L[1]],[p/2,W/2],[(p+w)/2,it/2],[(p+w)/2,Mt/2],[p/2,$/2]):r.quad([N[0],it,N[1]],[L[0],W,L[1]],[L[0],$,L[1]],[N[0],Mt,N[1]],[(p+w)/2,it/2],[p/2,W/2],[p/2,$/2],[(p+w)/2,Mt/2]))(z-H,z+.8,O-H,O+.8);const G=[_[0]+y[0]*(A-F*.35),_[1]+y[1]*(A-F*.35)],Y=[v[0]+S[0]*(A-F*.35),v[1]+S[1]*(A-F*.35)];r.quad([G[0],z+.8,G[1]],[L[0],z+.8,L[1]],[N[0],O+.8,N[1]],[Y[0],O+.8,Y[1]],[0,0],[.2,0],[.2,1],[0,1]),F<0&&r.quad([N[0],O+.8,N[1]],[L[0],z+.8,L[1]],[G[0],z+.8,G[1]],[Y[0],O+.8,Y[1]],[0,0],[.2,0],[.2,1],[0,1]),n&&n.addSegment(L[0],L[1],N[0],N[1])}const T=[_[0]+y[0]*c,_[1]+y[1]*c],b=[_[0]-y[0]*c,_[1]-y[1]*c],E=[v[0]+S[0]*c,v[1]+S[1]*c],C=[v[0]-S[0]*c,v[1]-S[1]*c];i.quad([T[0],x[M]-.9,T[1]],[b[0],x[M]-.9,b[1]],[C[0],x[M+1]-.9,C[1]],[E[0],x[M+1]-.9,E[1]],[0,0],[1,0],[1,1],[0,1]);const I=x[M]-t.ground(_[0],_[1]);if(I>2&&Math.floor((p+w)/14)>Math.floor(p/14)){const F=t.ground(_[0],_[1])-1,A=c*.8,L=.8,N=(v[0]-_[0])/w,z=(v[1]-_[1])/w,O=[[-A,-L],[A,-L],[A,L],[-A,L]].map(([H,V])=>[_[0]+y[0]*H+N*V,_[1]+y[1]*H+z*V]);for(let H=0;H<4;H++){const V=O[H],G=O[(H+1)%4];r.quad([G[0],F,G[1]],[V[0],F,V[1]],[V[0],x[M]-.9,V[1]],[G[0],x[M]-.9,G[1]],[0,0],[1,0],[1,I/2],[0,I/2])}}p+=w}}const o=new zt;if(r.pos.length){const a=new xt(r.build(),new wt({map:e.stone,roughness:.95,vertexColors:!0,side:be}));a.castShadow=a.receiveShadow=!0,o.add(a)}return i.pos.length&&o.add(new xt(i.build(),new wt({color:8222056,roughness:1,side:be}))),o}const Ci=(s,t,e)=>{let n=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){const[o,a]=e[i],[h,c]=e[r];a>t!=c>t&&s<(h-o)*(t-a)/(c-a)+o&&(n=!n)}return n},Ln=s=>{const t=[];for(let e=0;e+1<s.length;e+=2)t.push([s[e],s[e+1]]);return t};function hx(s,t=0,e=0){if(!(s!=null&&s.length))return null;if(!t){t=300;for(const h of s){const c=Ln(h.xy);for(const[l,u]of c)t=Math.max(t,Math.abs(l)+(h.r||2)+4,Math.abs(u)+(h.r||2)+4)}t=Math.min(1800,Math.ceil(t/50)*50)}e||(e=t<=300?2048:4096);const n=document.createElement("canvas");n.width=n.height=e;const i=n.getContext("2d"),r=e/(2*t);i.lineCap="round",i.lineJoin="round",i.filter="blur(1px)";const o={tierra:"#f00",hierba:"#0f0",grava:"#00f"};for(const h of s){const c=Ln(h.xy);c.length&&(i.globalCompositeOperation=h.mat==="borrar"?"destination-out":"source-over",i.strokeStyle=o[h.mat]||"#000",i.lineWidth=Math.max(1,2*h.r*r),i.beginPath(),c.forEach((l,u)=>u?i.lineTo((l[0]+t)*r,(l[1]+t)*r):i.moveTo((l[0]+t)*r,(l[1]+t)*r)),c.length===1&&i.lineTo((c[0][0]+t)*r+.01,(c[0][1]+t)*r),i.stroke())}const a=new Sn(n);return a.flipY=!1,a.minFilter=on,a.generateMipmaps=!1,{tex:a,bounds:new fe(-t,-t,2*t,2*t)}}const ux={suave:12,medio:6,fuerte:3,muro:1};function fx(s,t){const e=(t||[]).map(f=>({p:Ln(f.xy),dh:+f.dh||0,w:ux[f.talud]??6})).filter(f=>f.p.length>=3);if(!e.length)return;let n=1/0,i=-1/0,r=1/0,o=-1/0;for(const f of e)for(const[d,g]of f.p)n=Math.min(n,d-f.w-8),i=Math.max(i,d+f.w+8),r=Math.min(r,g-f.w-8),o=Math.max(o,g+f.w+8);const a=s.cell,h=(f,d)=>s.ox+(d?Math.ceil:Math.floor)((f-s.ox)/a)*a;n=h(n),r=h(r),i=h(i,!0),o=h(o,!0);const c=(i-n)*(o-r)>260*260?2:1;s.setFine(n,r,i,o,c);const l=s.f,u=l.h;for(const f of e){let d=1/0,g=-1/0,x=1/0,m=-1/0;for(const[T,b]of f.p)d=Math.min(d,T),g=Math.max(g,T),x=Math.min(x,b),m=Math.max(m,b);let p=0,M=0;for(let T=x;T<=m;T+=1)for(let b=d;b<=g;b+=1)Ci(b,T,f.p)&&(p+=s.innerHeight(b,T),M++);const _=(M?p/M:s.innerHeight(f.p[0][0],f.p[0][1]))+f.dh,v=Math.max(0,Math.floor((d-f.w-l.x0)/c)),y=Math.min(l.nx-1,Math.ceil((g+f.w-l.x0)/c)),S=Math.max(0,Math.floor((x-f.w-l.z0)/c)),w=Math.min(l.nz-1,Math.ceil((m+f.w-l.z0)/c));for(let T=S;T<=w;T++)for(let b=v;b<=y;b++){const E=l.x0+b*c,C=l.z0+T*c;let I=1;if(!Ci(E,C,f.p)){let F=1/0;for(let A=0;A<f.p.length;A++)F=Math.min(F,zo(E,C,f.p[A],f.p[(A+1)%f.p.length]));if(F>=f.w)continue;I=1-F/f.w,I=I*I*(3-2*I)}u[T*l.nx+b]+=(_-u[T*l.nx+b])*I}}}const zo=(s,t,e,n)=>{const i=n[0]-e[0],r=n[1]-e[1],o=i*i+r*r||1,a=Math.max(0,Math.min(1,((s-e[0])*i+(t-e[1])*r)/o));return Math.hypot(s-e[0]-i*a,t-e[1]-r*a)};function dx(s,t){const e=t.foto||{},n=e.scale||1,i=e.dx||0,r=e.dz||0;for(const x of[s.ortho.full,s.ortho.center]){const m=x.bounds;x.bounds=[i+m[0]*n,r+m[1]*n,i+m[2]*n,r+m[3]*n]}const o=x=>[x.reduce((m,p)=>m+p[0],0)/x.length,x.reduce((m,p)=>m+p[1],0)/x.length];s.buildings=s.buildings.filter(x=>!(t.quitar||[]).some(m=>m.id===x.id&&Math.hypot(...o(x.p).map((p,M)=>p-m.c[M]))<1.5));for(const x of t.formas||[]){const m=s.buildings.find(p=>p.id===x.id&&Math.hypot(...o(p.p).map((M,_)=>M-x.c[_]))<1.5);if(m){const p=Ln(x.xy);p.length>=3&&(m.p=p)}}const a=(t.edificios||[]).map((x,m)=>({p:Ln(x.xy),f:x.f||1,id:"plano"+m})).filter(x=>x.p.length>=3);s.buildings.push(...a);const h=(t.lineas||[]).map(x=>Ln(x.xy)),c=[...t.claros||[],...(t.rocas||[]).map(x=>x.xy)].map(Ln),l=(x,m)=>c.some(p=>Ci(x,m,p))||a.some(p=>Ci(x,m,p.p))||h.some(p=>p.some((M,_)=>_&&zo(x,m,p[_-1],M)<1.2));s.trees=s.trees.filter(([x,m])=>!l(x,m));let u=7;const f=()=>(u=u*16807%2147483647)/2147483647,d=(x,m)=>s.roads.some(p=>p.p.some((M,_)=>_&&zo(x,m,p.p[_-1],M)<p.w/2+1.5)),g=(x,m)=>s.buildings.some(p=>Ci(x,m,p.p));for(const x of t.arboledas||[]){const m=Ln(x);if(m.length<3)continue;const p=m.map(v=>v[0]),M=m.map(v=>v[1]),_=5;for(let v=Math.min(...p);v<=Math.max(...p);v+=_)for(let y=Math.min(...M);y<=Math.max(...M);y+=_){const S=v+(f()-.5)*_*.8,w=y+(f()-.5)*_*.8;Ci(S,w,m)&&!l(S,w)&&!g(S,w)&&!d(S,w)&&s.trees.push([S,w,.9+f()*.45])}}}function px(s){let t=23;const e=()=>(t=t*16807%2147483647)/2147483647;return(s.lineas||[]).map(n=>{const i=Ln(n.xy);if(i.length<2)return null;const r=n.kind==="ruin",o=n.mat==="bloque",a=n.mat==="irregular",h=In(i,r||a?1:2),c=r?{baja:1.4,media:2.6,alta:3.8}:{baja:.8,media:1.3,alta:2.1},u=(c[n.alto]||c.media)*(r?.85+e()*.3:.92+e()*.16);return{p:h,hs:h.map(()=>r?u*(.45+e()*.65):a?u*(.72+e()*.5):u),ruin:r||a,mat:o?"bloque":"piedra"}}).filter(Boolean)}function mx(s,t,e,n){const i=s.rocas||[],r=new zt;if(!i.length)return r;let o=31;const a=()=>(o=o*16807%2147483647)/2147483647,h=[];for(const v of i){const y=Ln(v.xy);if(y.length<3)continue;const[S,w]={baja:[.5,1.1],media:[.9,2],alta:[1.6,3.4]}[v.alto]||[.9,2],T=y.map(C=>C[0]),b=y.map(C=>C[1]),E=(S+w)*.9;for(let C=Math.min(...T);C<=Math.max(...T);C+=E)for(let I=Math.min(...b);I<=Math.max(...b);I+=E){const F=C+(a()-.5)*E,A=I+(a()-.5)*E;if(!Ci(F,A,y)||a()<.15)continue;const L=S+(w-S)*a()**1.5;if(h.push([F,A,L]),a()<.35){const N=a()*6.28,z=L*(.35+a()*.3);h.push([F+Math.cos(N)*L*.9,A+Math.sin(N)*L*.9,z])}}}const c=new xa(1,2),l=c.attributes.position,u=new U;for(let v=0;v<l.count;v++){u.fromBufferAttribute(l,v);const y=.82+.18*Math.sin(u.x*3.1+u.z*2.3)*Math.cos(u.y*2.7-u.x);u.multiplyScalar(y),l.setXYZ(v,u.x,u.y*.72,u.z)}c.computeVertexNormals();const f=new wt({map:e.granite||e.stone,color:16777215,roughness:1,flatShading:!0}),d=new $e(c,f,h.length);d.castShadow=d.receiveShadow=!0;const g=new se,x=new yn,m=new Es,p=new U,M=new U,_=new Wt;return h.forEach(([v,y,S],w)=>{m.set((a()-.5)*.5,a()*6.28,(a()-.5)*.5),x.setFromEuler(m),p.set(S*(.9+a()*.4),S*(.7+a()*.4),S*(.9+a()*.4)),M.set(v,t.height(v,y)-S*.25,y),g.compose(M,x,p),d.setMatrixAt(w,g);const T=.62+a()*.22;_.setRGB(T,T,T*(.97+a()*.04)),d.setColorAt(w,_);const b=S*.85;n.addSegment(v-b,y,v+b,y,"wall"),n.addSegment(v,y-b,v,y+b,"wall")}),r.add(d),r}const Dn=(s,t=.9)=>new wt({color:s,roughness:t});function Ke(s,t,e,n,i,r){const o=new xt(s,t);return o.position.set(e,n,i),o.castShadow=!0,r.add(o),o}function Bs({len:s,h:t,w:e,legLen:n,color:i,belly:r,head:o,neck:a=0,tail:h=.3,ears:c="cat",antlers:l=!1}){const u=new zt,f=new zt;u.add(f);const d=Dn(i),g=Dn(r??i),x=Ke(new ir(t/2,s-t,4,8),d,0,n+t/2,0,f);x.rotation.x=Math.PI/2,x.scale.x=e/t;const m=new zt;if(m.position.set(0,n+t*.75,s/2-t*.2),f.add(m),a){const y=Ke(new ir(t*.22,a,4,6),d,0,a/2,.05,m);y.rotation.x=.5}const p=new zt;p.position.set(0,a*.9,a*.45+.02),m.add(p),Ke(new ke(o,10,8),d,0,0,0,p).scale.set(.9,.85,1.1),Ke(new ke(o*.55,8,6),g,0,-o*.25,o*.85,p).scale.set(.8,.7,1.2),Ke(new ke(o*.14,6,4),Dn(1118481,.3),0,-o*.15,o*1.45,p);for(const y of[-1,1]){Ke(new ke(o*.12,6,4),Dn(c==="cat"?10145074:1118481,.2),y*o*.4,o*.25,o*.85,p);const S=Ke(c==="cat"?new pi(o*.35,o*.7,4):new ke(o*.38,6,4),d,y*o*.55,o*(c==="cat"?.85:c==="deer"?.7:.1),-o*.1,p);if(c==="dog"&&(S.scale.set(.45,1.2,.8),S.position.y=-o*.1,S.position.x=y*o*.85),c==="deer"&&(S.scale.set(.5,1.1,.25),S.rotation.z=-y*.7),l)for(let w=0;w<3;w++){const T=Ke(new ce(.015,.03,.35-w*.07,4),Dn(7035456),y*(.06+w*.08),o+.15+w*.12,-.02-w*.04,p);T.rotation.z=-y*(.4+w*.25),T.rotation.x=-.3}}const _=[];for(const[y,S]of[[-1,1],[1,1],[-1,-1],[1,-1]]){const w=new zt;w.position.set(y*e*.32,n,S*(s/2-t*.35)),f.add(w);const T=Ke(new ce(n*.12,n*.08,n,6),d,0,-n/2,0,w);T.castShadow=!0,_.push({hip:w,front:S>0,side:y})}const v=new zt;if(v.position.set(0,n+t*.7,-s/2+t*.1),f.add(v),h){const y=Ke(new ce(.02,t*.1,h,5),d,0,h/2,0,v);y.rotation.x=0,v.rotation.x=-.9}return u.userData={legs:_,headG:p,neckG:m,tailG:v,body:f,phase:Math.random()*6,legLen:n},u}function qr(s,t,e,n=0){const i=s.userData;i.phase+=e*(3+t*6/i.legLen);const r=Math.min(.7,t*.5);for(const o of i.legs)o.hip.rotation.x=Math.sin(i.phase+(o.front?0:Math.PI)+(o.side>0?Math.PI/2:0))*r;i.tailG.rotation.z=Math.sin(i.phase*.7)*.4,i.neckG.rotation.x+=((n?1.1:0)-i.neckG.rotation.x)*Math.min(1,e*3),i.body.position.y=Math.abs(Math.sin(i.phase))*r*.03}function gx(s){const t=new zt,e=new zt;t.add(e);const n=Dn(s),i=Dn(12591130),r=Dn(14721056);Ke(new ke(.13,10,8),n,0,.22,0,e).scale.set(.85,.9,1.2);const o=Ke(new pi(.07,.16,5),n,0,.3,-.14,e);o.rotation.x=-.9;const a=new zt;a.position.set(0,.34,.12),e.add(a),Ke(new ke(.06,8,6),n,0,0,0,a),Ke(new pi(.02,.05,4),r,0,-.005,.07,a).rotation.x=Math.PI/2,Ke(new Qt(.015,.05,.06),i,0,.06,0,a);const h=[];for(const c of[-1,1]){const l=new zt;l.position.set(c*.05,.14,0),e.add(l),Ke(new ce(.008,.008,.14,4),r,0,-.07,0,l),h.push({hip:l,front:c>0,side:c})}return t.userData={legs:h,headG:a,neckG:a,tailG:new zt,body:e,phase:Math.random()*6,legLen:.14},t}const sh=[2763306,13667134,9211020,15788760,5913894];class xx{constructor({scene:t,world:e,net:n,roads:i,center:r,buildings:o=[],half:a=1e3,isMobile:h=!1}){Object.assign(this,{scene:t,world:e,net:n}),this.list=[];for(let p=0;p<5;p++){const M=p<2,_=sh[(p*3+1)%sh.length],v=Bs(M?{len:.42,h:.17,w:.15,legLen:.2,color:_,head:.075,neck:.04,tail:.32,ears:"cat"}:{len:.7+Math.random()*.2,h:.28,w:.24,legLen:.36,color:_,belly:13154464,head:.12,neck:.12,tail:.28,ears:"dog"});v.scale.setScalar(e.personScale/.88*(M?1:.95)),t.add(v);const y=n.randomSpot(),S=n.roads[y.ri].p[y.i];this.list.push({kind:M?"cat":"dog",mesh:v,pos:new U(S[0],0,S[1]),heading:Math.random()*6,speed:0,target:null,wait:Math.random()*3,flee:0,sp:y})}const c=i.filter(p=>p.k==="tertiary"||p.k==="trunk");let l=null,u=-1;for(const p of c)for(let M=0;M<p.p.length-1;M++){const _=p.p[M],v=Math.hypot(_[0]-r[0],_[1]-r[1]);if(v>180&&v<420&&v>u){const y=p.p[M+1];u=v,l={p:_,q:y,w:p.w}}}if(this.deer=[],l){const p=l.q[0]-l.p[0],M=l.q[1]-l.p[1],_=Math.hypot(p,M)||1,v=-M/_,y=p/_;for(let S=0;S<3;S++){const w=Bs({len:1.2,h:.5,w:.42,legLen:.85,color:9067060,belly:14205856,head:.16,neck:.55,tail:.15,ears:"deer",antlers:S===0});w.scale.setScalar(e.personScale/.88*(S===0?1.05:.9)),w.visible=!1,t.add(w);const T=l.w/2+4+S*2.2,b=S*3-3,E=new U(l.p[0]+v*T+p/_*b,0,l.p[1]+y*T+M/_*b);this.deer.push({mesh:w,home:E,pos:E.clone(),heading:Math.random()*6,speed:0,flee:0,away:[v,y]})}}const f=e.personScale/.88;e.terrain,this.hens=[];const d=p=>{let M=0,_=0;for(const v of p.p)M+=v[0],_+=v[1];return[M/p.p.length,_/p.p.length]},g=o.filter(p=>p.use==="agr").map(d).filter(([p,M])=>{const _=Math.hypot(p-r[0],M-r[1]);return _>80&&_<260}).slice(0,2);for(const[p,M]of g){let _=p,v=M;for(let y=0;y<8;y++){const S=p+Math.cos(y)*9,w=M+Math.sin(y)*9;if(!e.colliders.nearest(S,w,2.5)){_=S,v=w;break}}for(let y=0;y<(h?3:5);y++){const S=gx([15788248,9062940,2763306,11561514][y%4]);S.scale.setScalar(f*1.1),t.add(S),this.hens.push({mesh:S,home:[_,v],pos:new U(_+Math.random()*3,0,v+Math.random()*3),heading:Math.random()*6,speed:0,peck:0,t:Math.random()*3,flee:0})}}this.sheep=[],this.shepherd=null;let x=null,m=-1;for(let p=0;p<120;p++){const M=Math.random()*Math.PI*2,_=330+Math.random()*Math.min(500,a-450),v=r[0]+Math.cos(M)*_,y=r[1]+Math.sin(M)*_;let S=1/0;for(const T of i)for(const b of T.p)S=Math.min(S,Math.hypot(b[0]-v,b[1]-y));if(e.colliders.nearest(v,y,25))continue;const w=Math.min(S,80);w>m&&(m=w,x=[v,y])}if(x){const[p,M]=x;for(let S=0;S<(h?8:14);S++){const w=Bs({len:.95,h:.5,w:.5,legLen:.42,color:S===3?2761760:15262418,belly:14209212,head:.13,neck:.1,tail:.12,ears:"deer"});w.userData.headG.children[0].material=Dn(3813160),w.scale.setScalar(f),t.add(w);const T=new U(p+(Math.random()-.5)*14,0,M+(Math.random()-.5)*14);this.sheep.push({mesh:w,pos:T,heading:Math.random()*6,speed:0,flee:0,t:Math.random()*5})}const _=ki({shirt:5917234,pants:3813926,hair:6974058});_.scale.setScalar(e.personScale);const v=new xt(new ce(.02,.025,1.5,5),Dn(5913894));v.position.set(0,-.55,.05),_.userData.parts.rShoulder.children[1].add(v),t.add(_),this.shepherd={mesh:_,pos:new U(p+8,0,M+4),heading:0,t:0},this.flock=[p,M];const y=Bs({len:.8,h:.3,w:.26,legLen:.38,color:1972760,belly:15790320,head:.13,neck:.12,tail:.3,ears:"dog"});y.scale.setScalar(f),t.add(y),this.sheepdog={mesh:y,pos:new U(p-10,0,M),a:0}}}update(t,e,n,i){const r=this.world.terrain;for(const a of this.list){const h=(a.pos.x-e.x)**2+(a.pos.z-e.z)**2>25600;if(a.mesh.visible=!h,!h){for(const c of n){const l=a.pos.x-c.pos.x,u=a.pos.z-c.pos.z;Math.hypot(l,u)<3+Math.abs(c.speed)*.9&&Math.abs(c.speed)>1&&(a.flee=1.5,a.heading=Math.atan2(l,u)+(Math.random()-.5))}if(a.flee>0)a.flee-=t,a.speed+=((a.kind==="cat"?4.5:4)-a.speed)*Math.min(1,t*6);else if(a.wait>0)a.wait-=t,a.speed*=Math.max(0,1-t*4);else{if(!a.target||Math.hypot(a.target[0]-a.pos.x,a.target[1]-a.pos.z)<1){const u=this.net.roads[a.sp.ri];a.sp.i=Math.max(0,Math.min(u.p.length-1,a.sp.i+(Math.random()<.5?1:-1)));const f=u.p[a.sp.i],d=(Math.random()-.5)*u.w;if(a.target=[f[0]+d,f[1]+d*.5],Math.random()<.35&&(a.wait=2+Math.random()*5),Math.random()<.2){const g=this.net.next(a.sp.ri,a.sp.i,1);a.sp={ri:g[0],i:g[1]}}}let l=Math.atan2(a.target[0]-a.pos.x,a.target[1]-a.pos.z)-a.heading;l=Math.atan2(Math.sin(l),Math.cos(l)),a.heading+=l*Math.min(1,t*3),a.speed+=((a.kind==="cat"?.7:1.1)-a.speed)*Math.min(1,t*2)}a.pos.x+=Math.sin(a.heading)*a.speed*t,a.pos.z+=Math.cos(a.heading)*a.speed*t,this.world.colliders.resolve(a.pos,.25);for(const c of n)c.pushOut(a.pos,.25);a.pos.y=r.height(a.pos.x,a.pos.z),a.mesh.position.copy(a.pos),a.mesh.rotation.y=a.heading,qr(a.mesh,a.speed,t,a.kind==="dog"&&a.wait>0?1:0)}}for(const a of this.hens){const h=(a.pos.x-e.x)**2+(a.pos.z-e.z)**2>19600;if(a.mesh.visible=!h,h)continue;if(Math.hypot(a.pos.x-e.x,a.pos.z-e.z)<3.5&&a.flee<=0&&(a.flee=1.2,a.heading=Math.atan2(a.pos.x-e.x,a.pos.z-e.z)+(Math.random()-.5)),a.t-=t,a.flee>0)a.flee-=t,a.speed=3;else if(a.t<=0){a.t=1+Math.random()*3,a.peck=Math.random()<.5?1.2:0;const l=Math.hypot(a.pos.x-a.home[0],a.pos.z-a.home[1]);a.heading=l>6?Math.atan2(a.home[0]-a.pos.x,a.home[1]-a.pos.z):a.heading+(Math.random()-.5)*2.5,a.speed=a.peck?0:.5}a.peck>0?(a.peck-=t,a.mesh.userData.headG.rotation.x=Math.max(0,Math.sin(a.peck*14))*.9):a.mesh.userData.headG.rotation.x=0,a.pos.x+=Math.sin(a.heading)*a.speed*t,a.pos.z+=Math.cos(a.heading)*a.speed*t,this.world.colliders.resolve(a.pos,.15),a.pos.y=r.height(a.pos.x,a.pos.z)+(a.flee>0?Math.abs(Math.sin(a.flee*12))*.25:0),a.mesh.position.copy(a.pos),a.mesh.rotation.y=a.heading;for(const l of a.mesh.userData.legs)l.hip.rotation.x=Math.sin(performance.now()/60+l.side)*Math.min(.8,a.speed)}if(this.flock){const a=Math.hypot(this.flock[0]-e.x,this.flock[1]-e.z),h=a<260;for(const l of this.sheep){if(l.mesh.visible=h,!h)continue;Math.hypot(l.pos.x-e.x,l.pos.z-e.z)<12&&(l.flee=2,l.heading=Math.atan2(l.pos.x-e.x,l.pos.z-e.z)+(Math.random()-.5)*.6),l.t-=t;const f=l.pos.x-this.flock[0],d=l.pos.z-this.flock[1];l.flee>0?(l.flee-=t,l.speed+=(3.2-l.speed)*Math.min(1,t*4)):(l.t<=0&&(l.t=3+Math.random()*6,l.heading=Math.hypot(f,d)>14?Math.atan2(-f,-d):l.heading+(Math.random()-.5)*2,l.walk=Math.random()<.35),l.speed+=((l.walk?.4:0)-l.speed)*Math.min(1,t*2)),l.pos.x+=Math.sin(l.heading)*l.speed*t,l.pos.z+=Math.cos(l.heading)*l.speed*t;for(const g of n)g.pushOut(l.pos,.35);l.pos.y=r.height(l.pos.x,l.pos.z),l.mesh.position.copy(l.pos),l.mesh.rotation.y=l.heading,qr(l.mesh,l.speed,t,l.flee>0||l.walk?0:1)}this.flock[0],this.flock[1];const c=performance.now()/1e3;if(this.flock[0]+=Math.sin(c/90)*t*.15,this.flock[1]+=Math.cos(c/110)*t*.15,this.shepherd){const l=this.shepherd;l.mesh.visible=h;const u=this.flock[0]+9,f=this.flock[1]+5,d=Math.hypot(u-l.pos.x,f-l.pos.z),g=d>1.5?.9:0;g?l.heading=Math.atan2(u-l.pos.x,f-l.pos.z):l.heading=Math.atan2(this.flock[0]-l.pos.x,this.flock[1]-l.pos.z),l.pos.x+=Math.sin(l.heading)*g*t,l.pos.z+=Math.cos(l.heading)*g*t,l.pos.y=r.height(l.pos.x,l.pos.z),l.mesh.position.copy(l.pos),l.mesh.rotation.y=l.heading,jn(l.mesh,g/this.world.personScale,t)}if(this.sheepdog){const l=this.sheepdog;l.mesh.visible=h,l.a+=t*.45;const u=this.flock[0]+Math.cos(l.a)*17,f=this.flock[1]+Math.sin(l.a)*17,d=Math.atan2(u-l.pos.x,f-l.pos.z),g=Math.hypot(u-l.pos.x,f-l.pos.z),x=Math.min(5,g*1.5);l.pos.x+=Math.sin(d)*x*t,l.pos.z+=Math.cos(d)*x*t,l.pos.y=r.height(l.pos.x,l.pos.z),l.mesh.position.copy(l.pos),l.mesh.rotation.y=d,qr(l.mesh,x,t)}}const o=i.isDusk;for(const a of this.deer){if(!o&&a.mesh.visible&&a.flee<=0&&(a.mesh.visible=!1,a.pos.copy(a.home)),o&&!a.mesh.visible&&(a.mesh.visible=!0,a.pos.copy(a.home),a.flee=0),!a.mesh.visible)continue;Math.hypot(e.x-a.pos.x,e.z-a.pos.z)<22&&a.flee<=0&&(a.flee=6,a.heading=Math.atan2(a.away[0],a.away[1])+(Math.random()-.5)*.6),a.flee>0?(a.flee-=t,a.speed+=(9-a.speed)*Math.min(1,t*4),a.flee<=0&&(a.mesh.visible=!1,a.speed=0)):(a.speed+=((Math.sin(performance.now()/3e3+a.home.x)>.8?.4:0)-a.speed)*Math.min(1,t*2),a.heading+=Math.sin(performance.now()/5e3+a.home.z)*t*.2),a.pos.x+=Math.sin(a.heading)*a.speed*t,a.pos.z+=Math.cos(a.heading)*a.speed*t,a.pos.y=r.height(a.pos.x,a.pos.z),a.mesh.position.copy(a.pos),a.mesh.rotation.y=a.heading,qr(a.mesh,a.speed,t,a.flee>0?0:1)}}}class vx{constructor(t){this.world=t,this.mesh=ki(),this.scale=t.personScale||1,this.mesh.scale.setScalar(this.scale),this.pos=new U,this.vy=0,this.heading=0,this.speed=0,this.grounded=!0,this.inCar=null}update(t,e,n){const{terrain:i,colliders:r,cars:o}=this.world,a=e.axes(),h=-Math.sin(n),c=-Math.cos(n),l=Math.cos(n),u=-Math.sin(n);let f=h*a.y+l*a.x,d=c*a.y+u*a.x;const g=Math.min(1,Math.hypot(f,d)),x=g>.05?(e.run?5.5:1.6)*g:0;if(this.speed+=(x-this.speed)*Math.min(1,t*8),g>.05){let M=Math.atan2(f,d)-this.heading;M=Math.atan2(Math.sin(M),Math.cos(M)),this.heading+=M*Math.min(1,t*12)}this.pos.x+=Math.sin(this.heading)*this.speed*t,this.pos.z+=Math.cos(this.heading)*this.speed*t,r.resolve(this.pos,.35);for(const p of o)p.pushOut(this.pos,.35);const m=i.height(this.pos.x,this.pos.z);this.grounded&&e.wasPressed("Space","btn:jump")&&(this.vy=4.8,this.grounded=!1),this.vy-=15*t,this.pos.y+=this.vy*t,this.pos.y<=m?(this.pos.y=m,this.vy=0,this.grounded=!0):this.grounded&&this.pos.y-m<.4?this.pos.y=m:this.grounded=!1,this.mesh.position.copy(this.pos),this.mesh.rotation.y=this.heading,jn(this.mesh,this.speed/this.scale,t,!this.grounded)}enterCar(t){this.inCar=t,this.mesh.visible=!1}exitCar(t){this.inCar=null,this.mesh.visible=!0;const e=Math.cos(t.heading),n=-Math.sin(t.heading),i=.6+t.s;this.pos.set(t.pos.x+e*i,0,t.pos.z+n*i),this.world.colliders.resolve(this.pos,.35),this.pos.y=this.world.terrain.height(this.pos.x,this.pos.z),this.heading=t.heading,this.speed=0}}function co(s,t,e){const n=(t-s.pos.x)/s.s,i=(e-s.pos.z)/s.s,r=Math.sin(s.heading),o=Math.cos(s.heading);return[n*o-i*r,n*r+i*o]}let ho;function Mx(){if(ho)return ho;const s=document.createElement("canvas");s.width=s.height=64;const t=s.getContext("2d"),e=t.createRadialGradient(32,32,2,32,32,30);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),ho=new Sn(s)}const ds={sedan:{g1:[5.5,13.5],g2:[3.6,29],circ:[-1.4,0,1.4],r:.95,wb:2.65,slope:1,range:14e3,name:"Turismo"},suv:{g1:[5.2,13.5],g2:[3.4,28],circ:[-1.4,0,1.4],r:.95,wb:2.65,slope:.7,range:12e3,name:"Todoterreno"},police:{g1:[6,14.5],g2:[4.2,32],circ:[-1.4,0,1.4],r:.95,wb:2.65,slope:.7,range:1e9,name:"Guardia Civil"},"4x4":{g1:[6,14],g2:[3.8,30],circ:[-1.4,0,1.4],r:1,wb:2.65,slope:.3,range:11e3,name:"4x4"},tractor:{g1:[3.4,6.5],g2:[2.4,11.5],circ:[-1.1,0,1.1],r:1.05,wb:2.1,slope:.15,range:2e4,name:"Tractor"},moto:{g1:[7.5,16],g2:[4.8,33],circ:[-.55,.55],r:.45,wb:1.4,slope:.8,range:16e3,name:"Moto"}};var Be,No,Ws,Fo,Oo,Qr;class Ti{constructor(t,e,n,i=1){Gi(this,Be);this.kind=ds[n]?n:"sedan",this.color=e,this.spec=ds[this.kind],this.world=t,this.mesh=eh(this.kind,e),this.s=i,this.mesh.scale.setScalar(i),this.fuel=1,this.wipe=0,this.pos=new U,this.heading=0,this.speed=0,this.steer=0,this.driver=!1,this.settled=!1,this.quat=new yn,this.health=100,this.smoke=[],this.gear=1}get wrecked(){return this.health<=0}get R(){return this.spec.r*this.s}repair(){const t=this.mesh,e=eh(this.kind,this.color);e.scale.setScalar(this.s),e.position.copy(t.position),e.quaternion.copy(t.quaternion);const n=t.parent;for(const i of[...t.children])(i.isLight||i.userData.keep)&&e.add(i);n&&(n.remove(t),n.add(e)),this.mesh=e,this.health=100;for(const i of this.smoke)i.material.opacity=0}wipers(t,e){const n=this.mesh.userData.wipers;if(!(n!=null&&n.length))return;e?this.wipe+=t*2.6:this.wipe%(Math.PI*2)>.05?this.wipe+=t*2.6:this.wipe=0;const i=(1-Math.cos(this.wipe))/2*1.45;for(const r of n)r.rotation.y=i}damage(t,e,n){const i=performance.now();if(t<=0||i-(this.lastHit||0)<500)return;this.lastHit=i,this.health=Math.max(0,this.health-t);const r=Math.min(.25,t*.012),o=this.mesh.userData.body,a=new U;o.traverse(c=>{if(!c.isMesh||c.userData.noDent)return;const l=c.geometry.attributes.position;if(l){for(let u=0;u<l.count;u++){a.fromBufferAttribute(l,u),c.localToWorld(a),this.mesh.worldToLocal(a),a.divideScalar(1);const f=Math.hypot(a.x-e,a.z-n);if(f>1.1)continue;const d=r*(1-f/1.1)*(.6+.4*Math.sin(u*12.9898)**2),g=l.getX(u),x=l.getY(u),m=l.getZ(u),p=new U(0,.6,0);this.mesh.localToWorld(p),c.worldToLocal(p);const M=p.x-g,_=(p.y-x)*.3,v=p.z-m,y=Math.hypot(M,_,v)||1;l.setXYZ(u,g+M/y*d,x+_/y*d-d*.3,m+v/y*d)}l.needsUpdate=!0,c.geometry.computeVertexNormals()}});const h=this.mesh.userData.paint;h&&(h.roughness=.32+(100-this.health)/100*.5,h.clearcoat=this.health/100),this.wrecked&&this.mesh.userData.lightMat.color.set(2236962)}place(t,e,n){this.pos.set(t,0,e),this.heading=n;const i=this.world.colliders;if(i)for(let r=0;r<4&&ve(this,Be,Ws).call(this,i);r++);this.pos.y=this.world.terrain.height(this.pos.x,this.pos.z),ve(this,Be,Qr).call(this,1)}circles(){const t=Math.sin(this.heading),e=Math.cos(this.heading);return this.spec.circ.map(n=>[this.pos.x+t*n*this.s,this.pos.z+e*n*this.s])}pushOut(t,e){for(const[n,i]of this.circles()){const r=t.x-n,o=t.z-i,a=Math.hypot(r,o),h=this.R+e;a<h&&a>1e-6&&(t.x=n+r/a*h,t.z=i+o/a*h)}}setLights(t,e=!1){const n=this.mesh.userData;n.lightMat.emissiveIntensity=.5+4*t,n.rearMat.emissiveIntensity=(e?3:.6)+1.5*t}update(t,e){var x,m;const{colliders:n,terrain:i,cars:r}=this.world;if(this.ai&&!this.driver){this.ai.update(t,this.world.obstacles||[]);const p=Math.sin(this.heading),M=Math.cos(this.heading);for(const _ of this.spec.circ){const v=_*this.s,y={x:this.pos.x+p*v,z:this.pos.z+M*v};n.expel(y,this.R)&&(this.pos.x=y.x-p*v,this.pos.z=y.z-M*v)}ve(this,Be,Qr).call(this,t),ve(this,Be,Oo).call(this,t),ve(this,Be,No).call(this,t);return}if(e){const p=this.fuel<=0,M=this.wrecked||p,_=e.axes(),v=M?0:.45+.55*this.health/100,y={x:_.x,y:_.y>0?_.y*v:_.y*(M?0:1)},S=this.world.grip??1,w=.6/(1+Math.abs(this.speed)/12)*(.6+.4*S);this.steer+=(y.x*w-this.steer)*Math.min(1,t*6*(.5+.5*S));const T=y.y;if(e.brake)this.speed-=Math.sign(this.speed)*Math.min(Math.abs(this.speed),14*S*t);else if(T>0){const[b,E]=this.gear===2?this.spec.g2:this.spec.g1,C=Math.max(0,this.speed),I=b*(1-(C/E)**2);this.speed+=(this.speed<0?8*S:Math.max(-1.5,I*(.7+.3*S)))*T*t}else T<0&&(this.speed+=(this.speed>0?9*S:2.5*(1+this.speed/8))*T*t);this.driver&&!M&&(this.fuel=Math.max(0,this.fuel-Math.abs(this.speed)*t/this.spec.range-(T?4e-6:0)))}else this.steer*=.9;this.speed-=(7e-4*this.speed*Math.abs(this.speed)+.01*this.speed)*t+Math.sign(this.speed)*Math.min(Math.abs(this.speed),(e&&e.axes().y?.2:1.6)*t);const o=Math.sin(this.heading),a=Math.cos(this.heading),h=i.height(this.pos.x+o,this.pos.z+a)-i.height(this.pos.x-o,this.pos.z-a);this.speed-=h/2*9.8*t*.6*this.spec.slope,Math.abs(this.speed)<.02&&!(e&&e.axes().y)&&(this.speed=0);const c=Math.abs(this.speed),l=-this.speed*Math.tan(this.steer)/(this.spec.wb*this.s)*t,u=Math.min(12,Math.max(1,Math.ceil(c*t/(this.R*.45))));let f=null,d=null,g=null;for(let p=0;p<u&&(this.heading+=l/u,this.pos.x+=Math.sin(this.heading)*this.speed*t/u,this.pos.z+=Math.cos(this.heading)*this.speed*t/u,!(this.speed===0&&this.settled));p++){const M=ve(this,Be,Ws).call(this,n);M&&(f=f||M.n,d=d||M.at)}if(this.speed!==0||!this.settled){const p=Math.sin(this.heading),M=Math.cos(this.heading);d&&c>3&&this.driver&&this.damage((c-3)*1.6,d[0],d[1]);for(const _ of r)if(_!==this){let v=null;for(const[A,L]of this.circles())for(const[N,z]of _.circles()){const O=A-N,H=L-z,V=Math.hypot(O,H),G=this.R+_.R;V<G&&V>1e-6&&(!v||G-V>v.pen)&&(v={dx:O,dz:H,d:V,pen:G-V,cx:A,cz:L,ox:N,oz:z})}if(!v)continue;const y=v.dx/v.d,S=v.dz/v.d;this.pos.x+=y*v.pen/2,this.pos.z+=S*v.pen/2,_.pos.x-=y*v.pen/2,_.pos.z-=S*v.pen/2;const w=Math.sin(_.heading),T=Math.cos(_.heading);let b=p*this.speed,E=M*this.speed,C=w*_.speed,I=T*_.speed;const F=(b-C)*y+(E-I)*S;if(F<0){const A=-1.25*F/2;b+=y*A,E+=S*A,C-=y*A,I-=S*A,ve(this,Be,Fo).call(this,b,E,.55),ve(x=_,Be,Fo).call(x,C,I,_.ai?.3:.55);const L=-F;if(L>3&&!g){const N=(L-3)*1.6;this.damage(N,...co(this,v.ox,v.oz)),_.damage(N,...co(_,v.cx,v.cz))}(m=_.ai)!=null&&m.bump&&L>1.5?_.ai.bump(L):_.ai&&(_.ai.wait=-3)}g=g||_}if(g&&ve(this,Be,Ws).call(this,n),f&&Math.abs(this.speed)>1){const _=Math.sign(this.speed),v=p*_,y=M*_,S=v*f.x+y*f.z;if(S<0){let w=v-f.x*S,T=y-f.z*S,b=Math.hypot(w,T);if(b<.25){const I=v*f.z-y*f.x>=0?1:-1;w=f.z*I,T=-f.x*I,b=1}w=w/b+f.x*.35,T=T/b+f.z*.35;let C=Math.atan2(w*_,T*_)-this.heading;C=Math.atan2(Math.sin(C),Math.cos(C)),this.heading+=C*.6,this.speed*=.55+.4*(1-Math.abs(S)),this.pos.x+=f.x*.05,this.pos.z+=f.z*.05,ve(this,Be,Ws).call(this,n)}}ve(this,Be,Qr).call(this,t),this.settled=!0}ve(this,Be,Oo).call(this,t),ve(this,Be,No).call(this,t)}}Be=new WeakSet,No=function(t){if(this.health>55&&!this.smoke.length)return;if(!this.smoke.length)for(let i=0;i<10;i++){const r=new Zo(new da({map:Mx(),transparent:!0,depthWrite:!1,opacity:0}));r.userData.t=i/10,this.world.scene.add(r),this.smoke.push(r)}const e=this.health<25,n=new U(0,1,1.5).applyMatrix4(this.mesh.matrixWorld);for(const i of this.smoke){i.userData.t+=t*.6,(i.userData.t>=1||!i.userData.v)&&(i.userData.t%=1,i.position.copy(n),i.userData.v=new U((Math.random()-.5)*.4,1+Math.random()*.5,(Math.random()-.5)*.4));const r=i.userData.t;i.userData.v&&i.position.addScaledVector(i.userData.v,t),i.scale.setScalar((.4+r*2)*this.s),i.material.opacity=this.health>55?0:(1-r)*(e?.75:.4),i.material.color.setHex(e?2236962:10132122)}},Ws=function(t){let e=null;const n=Math.sin(this.heading),i=Math.cos(this.heading);for(const r of this.spec.circ){const o=r*this.s,a={x:this.pos.x+n*o,z:this.pos.z+i*o},h=t.expel(a,this.R)||t.resolve(a,this.R);h&&(t.resolve(a,this.R),this.pos.x=a.x-n*o,this.pos.z=a.z-i*o,e=e||{n:h,at:co(this,a.x-h.x*this.R,a.z-h.z*this.R)})}return e},Fo=function(t,e,n){const i=Math.sin(this.heading),r=Math.cos(this.heading),o=t*i+e*r;if(Math.hypot(t,e)>.5){const c=o>=0?1:-1;let l=Math.atan2(t*c,e*c)-this.heading;l=Math.atan2(Math.sin(l),Math.cos(l)),this.heading+=Re.clamp(l,-.6,.6)*n}const h=t*r-e*i;this.speed=o+Math.sign(o||1)*Math.abs(h)*.25*n,this.ai&&!this.ai.bump&&(this.speed=Math.max(0,this.speed))},Oo=function(t){for(const e of this.mesh.userData.wheels)e.spin.rotation.x+=this.speed*t/(e.R*this.s),e.front&&(e.pivot.rotation.y=-this.steer)},Qr=function(t){const e=this.world.terrain,n=this.heading,i=Math.sin(n),r=Math.cos(n),o=-r,a=i,h=this.s,c=(M,_)=>e.height(this.pos.x+(i*M+o*_)*h,this.pos.z+(r*M+a*_)*h),l=c(1.35,-.8),u=c(1.35,.8),f=c(-1.3,-.8),d=c(-1.3,.8),g=(l+u+f+d)/4,x=Math.atan2((l+u)/2-(f+d)/2,2.65*h),m=-Math.atan2((u+d)/2-(l+f)/2,1.6*h);this.pos.y=g;const p=new Es(-x,n,m,"YXZ");if(this.quat.setFromEuler(p),this.mesh.position.copy(this.pos),this.mesh.quaternion.slerp(this.quat,Math.min(1,t*10)),this.kind==="moto"){const M=Re.clamp(this.steer*Math.abs(this.speed)*.07,-.6,.6);this.lean=(this.lean||0)+(M-(this.lean||0))*Math.min(1,t*5),this.mesh.userData.body.rotation.z=this.lean;for(const _ of this.mesh.userData.wheels)_.pivot.rotation.z=this.lean}else this.mesh.userData.body.rotation.z=Re.clamp(-this.steer*this.speed*.006,-.06,.06)};class _x{constructor(t,e,n,i){this.el=t,this.g=t.getContext("2d"),this.img=e,this.b=n,this.streets=i,this.radius=140;const r=Math.min(2,devicePixelRatio);this.size=t.clientWidth||150,t.width=t.height=this.size*r,this.g.scale(r,r)}draw(t,e,n,i,r,o,a={}){const h=a.route&&o?420:140;this.radius+=(h-this.radius)*.08;const c=this.g,l=this.size,u=l/2,f=u/this.radius,[d,,g]=this.b;this.img.width,c.save(),c.clearRect(0,0,l,l),c.beginPath(),c.arc(u,u,u-2,0,Math.PI*2),c.clip(),c.fillStyle="#28301f",c.fillRect(0,0,l,l),c.translate(u,u),c.rotate(i),c.globalAlpha=.9;const x=this.radius*1.5,m=(_,v,y)=>{const S=(y-v)/_.width,w=(t-v)/S,T=(e-v)/S,b=x/S,E=Math.max(0,w-b),C=Math.max(0,T-b),I=Math.min(_.width,w+b),F=Math.min(_.height,T+b);I<=E||F<=C||c.drawImage(_,E,C,I-E,F-C,(E*S+v-t)*f,(C*S+v-e)*f,(I-E)*S*f,(F-C)*S*f)};this.outer&&(Math.abs(t)>g-x||Math.abs(e)>g-x)&&m(this.outer.img,this.outer.b[0],this.outer.b[2]),m(this.img,d,g),c.globalAlpha=1,c.strokeStyle="rgba(255,255,255,0.55)",c.lineWidth=2.2,c.lineCap="round";for(const _ of this.streets)c.beginPath(),_.forEach(([v,y],S)=>S?c.lineTo((v-t)*f,(y-e)*f):c.moveTo((v-t)*f,(y-e)*f)),c.stroke();for(const _ of r)_!==o&&(c.fillStyle="#4fb3ff",c.beginPath(),c.arc((_.pos.x-t)*f,(_.pos.z-e)*f,3.5,0,7),c.fill());c.fillStyle="rgba(255,255,255,0.85)";for(const _ of a.walkers||[]){const v=(_.pos.x-t)*f,y=(_.pos.z-e)*f;v*v+y*y<u*u&&c.fillRect(v-1.5,y-1.5,3,3)}for(const _ of a.flags||[]){let v=(_[0]-t)*f,y=(_[1]-e)*f;const S=Math.hypot(v,y),w=u-7;S>w&&(v*=w/S,y*=w/S),c.fillStyle=yx[_[2]]||"#e2403a",c.strokeStyle="#000",c.lineWidth=1,c.beginPath(),c.arc(v,y,4,0,7),c.fill(),c.stroke()}if(a.route&&a.route.length>1){c.strokeStyle="rgba(0,0,0,0.6)",c.lineWidth=6,c.lineJoin="round";const _=()=>{c.beginPath(),c.moveTo(0,0),a.route.forEach(([v,y])=>c.lineTo((v-t)*f,(y-e)*f))};_(),c.stroke(),c.strokeStyle="#d64fd8",c.lineWidth=3.5,_(),c.stroke()}if(a.target){let _=(a.target[0]-t)*f,v=(a.target[1]-e)*f;const y=Math.hypot(_,v),S=u-9;y>S&&(_*=S/y,v*=S/y),c.fillStyle=a.targetColor||"#f5c542",c.strokeStyle="#000",c.lineWidth=1.5,c.beginPath(),c.arc(_,v,6,0,7),c.fill(),c.stroke()}c.rotate(Math.PI-n),c.fillStyle="#f5c542",c.strokeStyle="#000",c.lineWidth=1.5,c.beginPath(),c.moveTo(0,-8),c.lineTo(6,6),c.lineTo(0,3),c.lineTo(-6,6),c.closePath(),c.fill(),c.stroke(),c.restore(),c.strokeStyle="rgba(255,255,255,0.8)",c.lineWidth=3,c.beginPath(),c.arc(u,u,u-2,0,Math.PI*2),c.stroke();const p=u+Math.sin(i)*(u-11),M=u-Math.cos(i)*(u-11);c.fillStyle="#fff",c.font="bold 12px system-ui",c.textAlign="center",c.textBaseline="middle",c.fillText("N",p,M)}}const yx={leche:"#f2f2f2",correo:"#f0a020",taxi:"#2ed1ff",gas:"#ff8c1a",taller:"#2ec4c4",shop:"#d84fd8",bar:"#8b5a2b",church:"#c9b48a",air:"#ffffff",neg:"#ffb300"};class Sx{constructor(){this.ctx=null}start(){if(!this.ctx)try{const t=window.AudioContext||window.webkitAudioContext,e=this.ctx=new t,n=40,i=160,r=e.sampleRate,o=Math.round(i/n*r),a=e.createBuffer(1,o,r),h=a.getChannelData(0),c=[1,.8,.93,.76];for(let b=0;b<i;b++){const E=Math.round((b+(Math.random()-.5)*.06)/n*r),C=c[b%4]*(.85+Math.random()*.3),I=85+Math.random()*20;for(let F=0;F<r*.022;F++){const A=F/r,L=(E+F+o)%o;h[L]+=C*(Math.exp(-A/.004)*Math.sin(2*Math.PI*I*A)*.9+(Math.random()*2-1)*Math.exp(-A/.0018)*.45+Math.exp(-A/9e-4)*.6)}}let l=0;for(let b=0;b<o;b++)l=Math.max(l,Math.abs(h[b]));for(let b=0;b<o;b++)h[b]/=l;const u=e.createBufferSource();u.buffer=a,u.loop=!0,u.playbackRate.value=.7;const f=e.createWaveShaper(),d=new Float32Array(1024);for(let b=0;b<1024;b++){const E=b/511.5-1;d[b]=Math.tanh(2.2*E)/Math.tanh(2.2)}f.curve=d;const g=e.createBiquadFilter();g.type="peaking",g.frequency.value=110,g.Q.value=1.1,g.gain.value=7;const x=e.createBiquadFilter();x.type="peaking",x.frequency.value=420,x.Q.value=1.4,x.gain.value=3;const m=e.createBiquadFilter();m.type="lowpass",m.frequency.value=600,m.Q.value=.5;const p=e.createBiquadFilter();p.type="highshelf",p.frequency.value=2500,p.gain.value=-12;const M=e.createGain();M.gain.value=0,u.connect(f),f.connect(g),g.connect(x),x.connect(m),m.connect(p),p.connect(M),M.connect(e.destination);const _=e.createBuffer(1,e.sampleRate*2,e.sampleRate),v=_.getChannelData(0);let y=0;for(let b=0;b<v.length;b++)y=(y+.02*(Math.random()*2-1))/1.02,v[b]=y*3.5;const S=e.createBufferSource();S.buffer=_,S.loop=!0;const w=e.createBiquadFilter();w.type="lowpass",w.frequency.value=500;const T=e.createGain();T.gain.value=0,S.connect(w),w.connect(T),T.connect(e.destination),u.start(),S.start(),Object.assign(this,{src:u,f:m,gn:M,roadG:T,nf:w,R0:n})}catch{this.ctx=null}}reverb(){if(this.rev)return this.rev;const t=this.ctx,e=t.sampleRate*3.2|0,n=t.createBuffer(2,e,t.sampleRate);for(let a=0;a<2;a++){const h=n.getChannelData(a);for(let c=0;c<e;c++)h[c]=(Math.random()*2-1)*Math.pow(1-c/e,3.2)*(c<900?c/900:1)}const i=t.createConvolver();i.buffer=n;const r=t.createGain();r.gain.value=.35;const o=t.createBiquadFilter();return o.type="lowpass",o.frequency.value=2600,i.connect(r),r.connect(o),o.connect(t.destination),this.rev=i}bell(t,e=.25){if(!this.ctx)return;const n=this.ctx,i=n.currentTime+.01,r=n.createGain();r.gain.value=e;const o=n.createBiquadFilter();o.type="lowpass",o.frequency.value=3200,r.connect(o),o.connect(n.destination),o.connect(this.reverb());for(const[l,u,f]of[[.5,.55,9],[1,.75,6],[1.2,.5,4.5],[1.5,.22,3],[2,.6,3.5],[2.5,.12,1.8],[3,.14,1.6],[4.1,.05,.9]])for(const d of[-.0012,.0012]){const g=n.createOscillator(),x=n.createGain();g.type="sine",g.frequency.value=t*l*(1+d),x.gain.setValueAtTime(0,i),x.gain.linearRampToValueAtTime(u*.09,i+.004),x.gain.setTargetAtTime(0,i+.004,f/5),g.connect(x),x.connect(r),g.start(i),g.stop(i+f+.2)}if(!this.clang){const l=n.createBuffer(1,n.sampleRate*.08|0,n.sampleRate),u=l.getChannelData(0);for(let f=0;f<u.length;f++)u[f]=(Math.random()*2-1)*Math.exp(-f/(n.sampleRate*.012));this.clang=l}const a=n.createBufferSource(),h=n.createBiquadFilter(),c=n.createGain();a.buffer=this.clang,h.type="bandpass",h.frequency.value=t*5,h.Q.value=2,c.gain.value=.12,a.connect(h),h.connect(c),c.connect(r),a.start(i)}blip(t){if(!this.ctx)return;const e=this.ctx.currentTime;(t==="ok"?[660,880,1320]:[440,330,220]).forEach((i,r)=>{const o=this.ctx.createOscillator(),a=this.ctx.createGain();o.type="triangle",o.frequency.value=i,a.gain.setValueAtTime(0,e+r*.1),a.gain.linearRampToValueAtTime(.12,e+r*.1+.02),a.gain.exponentialRampToValueAtTime(.001,e+r*.1+.25),o.connect(a),a.connect(this.ctx.destination),o.start(e+r*.1),o.stop(e+r*.1+.3)})}update(t,e,n,i=1){if(!this.ctx)return;const r=this.ctx.currentTime,o=Math.abs(e),a=.2+Math.min(1.05,o/(i===2?29:13.5))*.7+Math.abs(n)*.06,h=(800+Math.min(1,a-.2)*5600)/30;this.src.playbackRate.setTargetAtTime(h/this.R0,r,.09),this.f.frequency.setTargetAtTime(380+a*900+Math.abs(n)*900,r,.08),this.gn.gain.setTargetAtTime(t?.11+.07*Math.abs(n):0,r,.2),this.roadG.gain.setTargetAtTime(t?Math.min(.09,o*.0035):0,r,.3),this.nf.frequency.setTargetAtTime(300+o*25,r,.3)}}const wx=new Wt(13227746),bx=new Wt(14264191),Ex=new Wt(461588),si=(s,t,e)=>{const n=Math.min(1,Math.max(0,(e-s)/(t-s)));return n*n*(3-2*n)},uo=29.530588,Tx=Date.UTC(2e3,0,6,18,14);function rh(s,t=6,e=20,n=62,i=28){const r=e-t,o=((s-t)%24+24)%24;if(o<=r){const h=o/r;return{elev:Math.sin(h*Math.PI)*n,az:80+h*200}}const a=(o-r)/(24-r);return{elev:-Math.sin(a*Math.PI)*i,az:280+a*160}}const ah=(s,{elev:t,az:e})=>{const n=Re.degToRad(t),i=Re.degToRad(e);return s.set(Math.sin(i)*Math.cos(n),Math.sin(n),-Math.cos(i)*Math.cos(n))};function Ax(s){const e=document.createElement("canvas");e.width=e.height=128;const n=e.getContext("2d"),i=128/2-4;n.translate(128/2,128/2);const r=n.createRadialGradient(0,0,i*.9,0,0,128/2);r.addColorStop(0,"rgba(220,225,255,0.25)"),r.addColorStop(1,"rgba(220,225,255,0)"),n.fillStyle=r,n.fillRect(-128/2,-128/2,128,128),n.fillStyle="rgba(40,45,60,0.35)",n.beginPath(),n.arc(0,0,i,0,7),n.fill();const o=Math.cos(s*Math.PI*2),a=s<.5;n.fillStyle="#f2f0e6",n.beginPath(),n.arc(0,0,i,-Math.PI/2,Math.PI/2,!a),n.ellipse(0,0,Math.abs(o)*i,i,0,Math.PI/2,-Math.PI/2,o>0===a),n.fill(),n.fillStyle="rgba(120,120,130,0.25)";for(const[c,l,u]of[[-12,-14,12],[10,-4,9],[-4,14,10],[16,18,6]])n.beginPath(),n.arc(c,l,u,0,7),n.fill();const h=new Sn(e);return h.colorSpace=Me,h}class Rx{constructor({scene:t,sky:e,sun:n,hemi:i,renderer:r,isMobile:o}){this.viewFar=o?2e3:2800,this.far=this.viewFar,Object.assign(this,{scene:t,sky:e,sun:n,hemi:i,renderer:r}),this.hour=12,this.minutesPerHour=50/60,this.day=0,this.sunDir=new U,this.moonDir=new U,this.light=this.sunDir,this.n=0,this.dome=new xt(new ke(3500,32,16),new Fn({side:Qe,transparent:!0,depthWrite:!1,fog:!1,uniforms:{uN:{value:0},uTop:{value:new Wt(132107)},uHor:{value:new Wt(857638)}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform float uN; uniform vec3 uTop; uniform vec3 uHor; varying vec3 vP; void main(){ float h = clamp(vP.y, 0.0, 1.0); gl_FragColor = vec4(mix(uHor, uTop, sqrt(h)), uN); }"})),this.dome.renderOrder=-2,t.add(this.dome);const a=o?1400:2600,h=new Float32Array(a*3),c=new Float32Array(a),l=new Float32Array(a*3);for(let d=0;d<a;d++){const g=Math.random()*Math.PI*2,x=Math.acos(Math.random()*.97);h.set([Math.sin(x)*Math.cos(g)*3e3,Math.cos(x)*3e3,Math.sin(x)*Math.sin(g)*3e3],d*3),c[d]=Math.pow(Math.random(),.45);const m=Math.random();l.set(m<.15?[1,.85,.7]:m<.3?[.75,.85,1]:[1,1,1],d*3)}const u=new de;u.setAttribute("position",new Ee(h,3)),u.setAttribute("aMag",new Ee(c,1)),u.setAttribute("aCol",new Ee(l,3)),this.starMat=new Fn({transparent:!0,depthWrite:!1,fog:!1,blending:Ii,uniforms:{uN:{value:0},uTime:{value:0},uPx:{value:Math.min(2,devicePixelRatio)}},vertexShader:`attribute float aMag; attribute vec3 aCol; uniform float uN; uniform float uTime; uniform float uPx; varying float vA; varying vec3 vC;
        void main(){
          float appear = 0.15 + aMag * 0.8;            // umbral de oscuridad a partir del que se ve
          vA = clamp((uN - appear) * 6.0, 0.0, 1.0) * (1.0 - aMag * 0.55);
          vA *= 0.8 + 0.2 * sin(uTime * (2.0 + aMag * 5.0) + position.x); // centelleo
          vC = aCol;
          gl_PointSize = (3.2 - aMag * 2.2) * uPx;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,fragmentShader:"varying float vA; varying vec3 vC; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(d)); gl_FragColor = vec4(vC, a * vA); }"}),this.stars=new Qo(u,this.starMat),this.stars.renderOrder=-1,this.stars.frustumCulled=!1,t.add(this.stars),this.phase0=(Date.now()-Tx)/864e5/uo%1,this.moon=new Zo(new da({transparent:!0,depthWrite:!1,fog:!1})),this.moon.scale.setScalar(160),this.moon.renderOrder=-1,t.add(this.moon),this.setPhase(this.phase0);const f=new de;f.setAttribute("position",new Ee(new Float32Array(6),3)),f.setAttribute("color",new Ee(new Float32Array([1,1,1,0,0,0]),3)),this.meteor=new Ko(f,new ur({vertexColors:!0,transparent:!0,opacity:0,fog:!1,depthWrite:!1,blending:Ii})),this.meteor.frustumCulled=!1,t.add(this.meteor),this.nextMeteor=8,this.m=null,this.lampLights=[];for(let d=0;d<(o?6:10);d++){const g=new ou(16765594,0,36,1.5);t.add(g),this.lampLights.push(g)}this.lamps=[],this.lastLampPick=-1}setPhase(t){var n;this.phase=t;const e=Math.round(t*28);e!==this._phaseKey&&(this._phaseKey=e,(n=this.moon.material.map)==null||n.dispose(),this.moon.material.map=Ax(t),this.moon.material.needsUpdate=!0)}setLamps(t){this.lamps=t||[]}skip(t=1){this.advance(t)}advance(t){for(this.hour+=t;this.hour>=24;)this.hour-=24,this.day++}get clock(){const t=Math.floor(this.hour),e=Math.floor((this.hour-t)*60);return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`}get isDusk(){return this.hour>18.5&&this.hour<22.5}update(t,e){this.advance(t/60/this.minutesPerHour*(this.n>.97?2:1));const n=rh(this.hour);ah(this.sunDir,n);const i=n.elev,r=(this.phase0+this.day/uo+this.hour/24/uo)%1;this.setPhase(r);const o=rh(this.hour-r*24,6,20,55,28);ah(this.moonDir,o);const a=.5-.5*Math.cos(r*Math.PI*2),h=si(-3,10,i),c=(1-si(2,16,i))*si(-10,1,i);this.n=1-si(-12,1,i);const l=this.sky.material.uniforms;if(l.sunPosition.value.copy(this.sunDir),l.rayleigh.value=1.2+c*1.6,l.turbidity.value=4+c*5,this.dome.material.uniforms.uN.value=Math.pow(this.n,1.3)*.97,this.dome.position.copy(e),h>.02)this.sun.color.setRGB(1,.94-c*.25,.86-c*.45),this.sun.intensity=2.6*h,this.light=this.sunDir;else{const m=o.elev>3;this.sun.color.setRGB(.55,.65,1),this.sun.intensity=m?.15+.4*a:.12,this.light=m?this.moonDir:this._zen||(this._zen=new U(-.3,.9,.3).normalize())}this.hemi.intensity=.45+.45*h+.15*a*this.n,this.hemi.color.setRGB(.75-.27*this.n,.83-.22*this.n,.93-.08*this.n);const u=this.scene.fog;u.color.copy(wx).lerp(bx,c*.7).lerp(Ex,this.n),u.near=300-160*this.n,u.far=this.far=this.viewFar-(this.viewFar-950)*this.n,this.renderer.toneMappingExposure=.9+.05*this.n;const f=performance.now()/1e3,d=1-si(.15,.6,this.cloud||0);if(this.starMat.uniforms.uN.value=this.n*d,this.stars.visible=d>.02,this.starMat.uniforms.uTime.value=f,this.stars.position.copy(e),this.moon.position.copy(e).addScaledVector(this.moonDir,3e3),this.moon.visible=o.elev>-3&&a>.03,this.moon.material.opacity=(.35+.65*si(.1,.6,this.n))*(1-.85*si(.3,.8,this.cloud||0)),this.n>.85&&d>.9&&(this.nextMeteor-=t,this.nextMeteor<=0&&!this.m)){this.nextMeteor=12+Math.random()*30;const m=Math.random()*Math.PI*2,p=.5+Math.random()*.6,M=new U(Math.cos(m)*Math.cos(p),Math.sin(p),Math.sin(m)*Math.cos(p)),_=new U(-Math.sin(m),-.35,Math.cos(m)).normalize();this.m={p:M.multiplyScalar(2800),dir:_,t:0,life:.6+Math.random()*.5}}if(this.m){const m=this.m;m.t+=t;const p=m.t/m.life,M=m.p.clone().addScaledVector(m.dir,p*900),_=M.clone().addScaledVector(m.dir,-140),v=this.meteor.geometry.attributes.position;v.setXYZ(0,M.x,M.y,M.z),v.setXYZ(1,_.x,_.y,_.z),v.needsUpdate=!0,this.meteor.position.copy(e),this.meteor.material.opacity=Math.sin(Math.min(1,p)*Math.PI),p>=1&&(this.m=null,this.meteor.material.opacity=0)}const g=si(.25,.6,this.n);for(const m of cr.lamps)m.emissiveIntensity=4*g;for(const m of cr.windows)m.emissiveIntensity=.9*g;const x=performance.now();if(x-this.lastLampPick>400){this.lastLampPick=x;const m=this.lamps.map(p=>[p,(p[3]-e.x)**2+(p[5]-e.z)**2]).sort((p,M)=>p[1]-M[1]);this.lampLights.forEach((p,M)=>{var v;const _=(v=m[M])==null?void 0:v[0];_&&p.position.set(_[3],_[4]-.3,_[5]),p.userData.ok=!!_})}for(const m of this.lampLights)m.intensity=m.userData.ok?22*g:0}}const Js=class Js{constructor(t,e,n=null){this.area=n,this.roads=t.filter(i=>e.has(i.k)&&i.p.length>1),this.at=new Map,this.roads.forEach((i,r)=>i.p.forEach((o,a)=>{const h=this.key(o);this.at.has(h)||this.at.set(h,[]),this.at.get(h).push([r,a])}))}inArea(t,e,n=60){const i=this.area;return i?Math.hypot(t-i[0],e-i[1])<i[2]+n:Math.abs(t)<Js.limit+n&&Math.abs(e)<Js.limit+n}key(t){return`${Math.round(t[0]*2)},${Math.round(t[1]*2)}`}next(t,e,n,i=Math.random){const r=[];for(const[a,h]of this.at.get(this.key(this.roads[t].p[e]))||[]){const c=this.roads[a].p.length;for(const l of[1,-1])h+l<0||h+l>=c||a===t&&l===-n||r.push([a,h,l])}if(!r.length)return[t,e,-n];const o=r.find(a=>a[0]===t);return o&&i()<.55?o:r[Math.floor(i()*r.length)]}randomSpot(t=()=>!0){const e=this.roads.map((n,i)=>[n,i]).filter(([n])=>t(n));for(let n=0;n<50;n++){const[i,r]=e[Math.floor(Math.random()*e.length)],o=Math.floor(Math.random()*(i.p.length-1)),a=i.p[o];if(this.inArea(a[0],a[1],0))return{ri:r,i:o,dir:Math.random()<.5&&o>0?-1:1}}return{ri:0,i:0,dir:1}}};pl(Js,"limit",900);let cn=Js;class xu{constructor(t,e,n,i){this.net=t,this.lane=n,this.look=i,this.ri=e.ri,this.i=e.i,this.dir=e.dir,this.target=this.i+this.dir;const r=t.roads[this.ri].p[this.i];this.carrot=new ut(r[0],r[1])}laneTarget(t){const e=this.net.roads[this.ri].p,n=e[this.target-this.dir]||e[this.target],i=e[this.target],r=i[0]-n[0],o=i[1]-n[1],a=Math.hypot(r,o)||1;return t.set(i[0]-o/a*this.lane,i[1]+r/a*this.lane)}advance(t){const e=new ut;for(let n=0;n<8&&this.carrot.distanceTo(t)<this.look;n++){this.laneTarget(e);const i=this.carrot.distanceTo(e),r=this.look-this.carrot.distanceTo(t)+.5;if(i>r){this.carrot.lerp(e,r/i);break}this.carrot.copy(e);const o=this.net.roads[this.ri].p.length,a=this.target+this.dir;if(a>=0&&a<o&&Math.random()<.6)this.target=a;else{const[h,c,l]=this.net.next(this.ri,this.target,this.dir);h===this.ri&&l===-this.dir&&(this.deadEnd=!0),this.ri=h,this.dir=l,this.target=c+l}}}}const vu=new ut;class ta{constructor(t,e,n,i){const r=t.roads[n.ri];this.car=e,this.cruise=i,this.wait=0,this.f=new xu(t,n,r.w>=6?r.w/4:Math.min(1,r.w/4),6*e.s+3);const o=r.p[n.i],a=r.p[n.i+n.dir];e.place(o[0],o[1],Math.atan2(a[0]-o[0],a[1]-o[1]))}update(t,e){const n=this.car,i=vu.set(n.pos.x,n.pos.z);this.f.net.inArea(n.pos.x,n.pos.z)||(this.f.deadEnd=!0),this.f.advance(i);const r=this.f.carrot.x-n.pos.x,o=this.f.carrot.y-n.pos.z;let a=Math.atan2(r,o)-n.heading;a=Math.atan2(Math.sin(a),Math.cos(a));let h=this.cruise*(1-Math.min(.75,Math.abs(a)*1.2));const c=Math.sin(n.heading),l=Math.cos(n.heading),u=4+Math.abs(n.speed)*1.2;let f=!1;for(const g of e){if(g===n)continue;const x=g.pos.x-n.pos.x,m=g.pos.z-n.pos.z,p=x*c+m*l,M=Math.abs(x*l-m*c);if(p>0&&p<u+2.5*n.s&&M<1.6){f=!0;break}}f?(this.wait+=t,this.wait<5&&(h=0)):this.wait=0;const d=h>n.speed?3:7;n.speed+=Re.clamp(h-n.speed,-d*t,d*t),n.steer=Re.clamp(-a*1.5,-.6,.6),n.heading+=Re.clamp(a,-1,1)*Math.min(1,t*(1+Math.abs(n.speed)*.6)),n.pos.x+=Math.sin(n.heading)*n.speed*t,n.pos.z+=Math.cos(n.heading)*n.speed*t}}const Cx=[8007214,3033722,4025146,9075290,5592405,11037485,6966394,14540253,2043711],Px=[2830656,3813926,1842204,4869978,5982778],Lx=[2760214,9079434,13619151,4861984,1710618],Dx=[13146746,14200462,12158308,14859422];class Ix{constructor(t,e,n,i){const r=h=>h[(i*7+Math.floor(Math.random()*100))%h.length];this.mesh=ki({shirt:r(Cx),pants:r(Px),hair:r(Lx),skin:r(Dx)}),this.scale=e.personScale*(.94+Math.random()*.1),this.mesh.scale.setScalar(this.scale);const o=t.roads[n.ri],a=Math.random()<.5?1:-1;this.f=new xu(t,n,a*(o.w/2+.5),1.6),this.world=e,this.pos=new U(o.p[n.i][0],0,o.p[n.i][1]),this.heading=0,this.speed=0,this.cruise=.9+Math.random()*.6,this.fly=null,this.getUp=0,this.pause=0}update(t,e,n,i){var m,p;const r=(this.pos.x-i.x)**2+(this.pos.z-i.z)**2>4e4;this.mesh.visible=!r;const o=this.world.terrain;if(this.fly){const M=this.fly;M.vy-=15*t,this.pos.x+=M.vx*t,this.pos.z+=M.vz*t,this.pos.y+=M.vy*t;const _=o.height(this.pos.x,this.pos.z);if(r||this.world.colliders.resolve(this.pos,.3),M.rot+=M.spin*t,this.pos.y<=_)if(this.pos.y=_,Math.abs(M.vy)>2)M.vy=-M.vy*.25,M.vx*=.5,M.vz*=.5,M.spin*=.5;else{M.vy=0,M.vx*=Math.max(0,1-t*6),M.vz*=Math.max(0,1-t*6);const v=-Math.PI/2+Math.round((M.rot+Math.PI/2)/(Math.PI*2))*Math.PI*2;M.rot+=(v-M.rot)*Math.min(1,t*8),M.spin=0,M.ground+=t}this.mesh.position.copy(this.pos),this.mesh.rotation.set(M.rot,this.heading,0,"YXZ"),M.ground>6&&(this.fly=null,this.getUp=1.2);return}if(this.getUp>0){this.getUp-=t,this.mesh.rotation.set(-Math.PI/2*Math.max(0,this.getUp)/1.2,this.heading,0,"YXZ"),this.pos.y=o.height(this.pos.x,this.pos.z),this.mesh.position.copy(this.pos),jn(this.mesh,0,t);return}this.mesh.rotation.set(0,this.heading,0);const a=vu.set(this.pos.x,this.pos.z);this.f.advance(a);const h=this.f.carrot.x-this.pos.x,c=this.f.carrot.y-this.pos.z;let l=Math.atan2(h,c)-this.heading;l=Math.atan2(Math.sin(l),Math.cos(l)),this.pause>0?this.pause-=t:Math.random()<t*.02&&(this.pause=2+Math.random()*4);let u=this.pause>0?0:this.cruise,f=null;for(const M of e){const _=this.pos.x-M.pos.x,v=this.pos.z-M.pos.z,y=Math.hypot(_,v),S=Math.abs(M.speed);if(S>2.5){for(const[w,T]of M.circles())if(Math.hypot(this.pos.x-w,this.pos.z-T)<M.R+.25){const b=Math.sign(M.speed),E=Math.sin(M.heading)*b,C=Math.cos(M.heading)*b;this.fly={vx:E*S*.75+_/(y||1)*1.5,vz:C*S*.75+v/(y||1)*1.5,vy:1.5+S*.18,rot:0,spin:-(3+S*.3),ground:0},this.pause=0,(p=(m=this.world).onHit)==null||p.call(m,this,M);return}}if(y<4+S*1.1&&S>1){const w=Math.sign(M.speed),T=Math.sin(M.heading)*w,b=Math.cos(M.heading)*w,E=_*T+v*b,C=_*b-v*T;if(E>-1&&Math.abs(C)<2.6){const I=C>=0?1:-1;f=[b*I,-T*I]}}}if(f){let _=Math.atan2(f[0],f[1])-this.heading;_=Math.atan2(Math.sin(_),Math.cos(_)),this.heading+=_*Math.min(1,t*10),u=3.2,this.pause=0}else this.heading+=l*Math.min(1,t*4);this.speed+=(u-this.speed)*Math.min(1,t*3),this.pos.x+=Math.sin(this.heading)*this.speed*t,this.pos.z+=Math.cos(this.heading)*this.speed*t;const d=this.pos.x-n.pos.x,g=this.pos.z-n.pos.z,x=Math.hypot(d,g);n.mesh.visible&&x<.7&&x>.001&&(this.pos.x+=d/x*(.7-x),this.pos.z+=g/x*(.7-x)),r||this.world.colliders.resolve(this.pos,.3);for(const M of e)M.pushOut(this.pos,.3);this.pos.y=this.world.terrain.height(this.pos.x,this.pos.z),this.mesh.position.copy(this.pos),this.mesh.rotation.y=this.heading,r||jn(this.mesh,this.speed/this.scale,t)}}function fn(s,t=!1){const e=new zt,n=t?30:14,i=new Je({color:s,transparent:!0,opacity:.32,depthWrite:!1,side:be,fog:!1,blending:Ii}),r=new xt(new ce(.7,.7,n,20,1,!0),i);r.position.y=n/2,e.add(r);const o=new xt(new sl(.6,.9,28),new Je({color:s,transparent:!0,opacity:.8,side:be,depthWrite:!1}));return o.rotation.x=-Math.PI/2,o.position.y=.15,e.add(o),e.userData={col:r,ring:o},e.visible=!1,e}class Ux{constructor({scene:t,terrain:e,start:n,drops:i,ui:r,sound:o}){Object.assign(this,{scene:t,terrain:e,start:n,drops:i,ui:r,sound:o}),this.startMarker=fn(16106818),this.dropMarker=fn(4706668,!0),t.add(this.startMarker,this.dropMarker),this.state="idle",this.cool=0,this.money=0;try{this.best=+localStorage.getItem("valde.best")||0}catch{this.best=0}this.place(this.startMarker,n),this.startMarker.visible=!0,this.renderUI()}place(t,[e,n]){t.position.set(e,this.terrain.height(e,n),n),t.userData.at=[e,n]}get target(){return this.state==="deliver"?this.dropMarker.userData.at:this.state==="idle"?this.start:null}begin(t){this.state="deliver",this.left=3,this.earned=0,this.startMarker.visible=!1,this.toast("🥖 Reparto del pan","Lleva el pan a 3 casas antes de que se acabe el tiempo"),this.nextDrop(t)}nextDrop(t){const e=this.drops.filter(([r,o])=>{const a=Math.hypot(r-t[0],o-t[1]);return a>45&&a<260}),n=e.length?e:this.drops,i=n[Math.floor(Math.random()*n.length)];this.place(this.dropMarker,i),this.dropMarker.visible=!0,this.time=Math.round(18+Math.hypot(i[0]-t[0],i[1]-t[1])/4.5)}update(t,e){var r,o,a,h,c;const n=performance.now()/1e3;for(const l of[this.startMarker,this.dropMarker])l.visible&&(l.userData.col.material.opacity=.22+.1*Math.sin(n*3),l.userData.ring.scale.setScalar(1+.15*Math.sin(n*4)));this.cool>0&&(this.cool-=t),this.state==="idle"&&(this.startMarker.visible=this.cool<=0&&!((r=this.busy)!=null&&r.call(this)));const i=l=>l.visible&&Math.hypot(e.x-l.userData.at[0],e.z-l.userData.at[1])<3.2;if(this.startMarker.visible=this.startMarker.visible&&!((o=this.busy)!=null&&o.call(this)),this.offer=this.state==="idle"&&this.cool<=0&&!((a=this.busy)!=null&&a.call(this))&&i(this.startMarker)?{id:"pan",text:"🥖 Repartir el pan por el pueblo",go:(l=>()=>this.begin(l))([e.x,e.z])}:null,this.state==="deliver")if(this.time-=t,i(this.dropMarker)){const l=10+Math.max(0,Math.round(this.time));this.money+=l,this.earned+=l,this.left--,(h=this.sound)==null||h.call(this,"ok"),this.left>0?(this.toast(`+${l} €`,`Quedan ${this.left} entregas`),this.nextDrop([e.x,e.z])):(this.money+=25,this.earned+=25,this.toast("¡Reparto completado!",`Has ganado ${this.earned} € (incluye 25 € de propina)`),this.finish())}else this.time<=0&&(this.toast("Se acabó el tiempo","El pan ha llegado frío. Vuelve a la plaza para intentarlo otra vez"),(c=this.sound)==null||c.call(this,"fail"),this.finish());this.renderUI()}finish(){if(this.state="idle",this.dropMarker.visible=!1,this.cool=4,this.money>this.best){this.best=this.money;try{localStorage.setItem("valde.best",String(this.best))}catch{}}}toast(t,e){const n=this.ui.toast;n.innerHTML=`<b>${t}</b><span>${e}</span>`,n.classList.remove("show"),n.offsetWidth,n.classList.add("show"),clearTimeout(this._tt),this._tt=setTimeout(()=>n.classList.remove("show"),3500)}renderUI(){const t=this.ui,e=this.state==="deliver"?`🥖 Entrega ${4-this.left}/3 · <b class="${this.time<10?"late":""}">${Math.max(0,Math.ceil(this.time))} s</b>`:this.startMarker.visible?"🥖 Ve al <b>círculo amarillo</b> de la plaza para repartir pan":"";e!==this._last&&(t.mission.innerHTML=e,this._last=e);const n=`${this.money} €`;n!==this._lm&&(t.money.textContent=n,this._lm=n)}}function oh(s){const t=s.roads.filter(n=>n.k==="residential"||n.k==="tertiary"||n.k==="living_street"),e=[];for(const n of s.buildings){if(n.use!=="res")continue;let i=0,r=0;for(const h of n.p)i+=h[0],r+=h[1];i/=n.p.length,r/=n.p.length;let o=null,a=22;for(const h of t)for(let c=0;c<h.p.length-1;c++){const l=h.p[c],u=h.p[c+1],f=u[0]-l[0],d=u[1]-l[1],g=f*f+d*d||1,x=Math.max(0,Math.min(1,((i-l[0])*f+(r-l[1])*d)/g)),m=l[0]+f*x,p=l[1]+d*x,M=Math.hypot(i-m,r-p);M<a&&(a=M,o=[m,p])}o&&!e.some(h=>Math.hypot(h[0]-o[0],h[1]-o[1])<18)&&e.push(o)}return e}function zx(s,t,e,n=7){const i=()=>(n=n*16807%2147483647)/2147483647;let r=null,o=1/0;s.roads.forEach((a,h)=>a.p.forEach((c,l)=>{const u=Math.hypot(c[0]-t[0],c[1]-t[1]);u<o&&(o=u,r=[h,l])}));for(let a=0;a<40;a++){let[h,c]=r,l=a%2?-1:1;(c+l<0||c+l>=s.roads[h].p.length)&&(l=-l);const u=[s.roads[h].p[c]],f=new Set([s.key(s.roads[h].p[c])]);let d=0;for(let g=0;g<400&&d<e;g++){const x=s.roads[h].p;let m=c+l;if(m<0||m>=x.length||(s.at.get(s.key(x[c]))||[]).length>1){const _=[];for(const[v,y]of s.at.get(s.key(x[c]))||[])for(const S of[1,-1]){const w=s.roads[v].p[y+S];w&&!f.has(s.key(w))&&_.push([v,y,S])}if(!_.length)break;[h,c,l]=_[Math.floor(i()*_.length)],m=c+l}const p=s.roads[h].p[m],M=u[u.length-1];if(Math.abs(p[0])>cn.limit||Math.abs(p[1])>cn.limit)break;d+=Math.hypot(p[0]-M[0],p[1]-M[1]),u.push(p),f.add(s.key(p)),c=m}if(d>=e*.8)return u}return null}class fo{constructor(t){this.p=t,this.cum=[0];for(let e=1;e<t.length;e++)this.cum.push(this.cum[e-1]+Math.hypot(t[e][0]-t[e-1][0],t[e][1]-t[e-1][1]));this.length=this.cum[this.cum.length-1]}at(t,e=0){t=Math.max(0,Math.min(this.length-.01,t));let n=1;for(;this.cum[n]<t;)n++;const i=this.p[n-1],r=this.p[n],o=this.cum[n]-this.cum[n-1]||1,a=(t-this.cum[n-1])/o,h=(r[0]-i[0])/o,c=(r[1]-i[1])/o;return{x:i[0]+(r[0]-i[0])*a-c*e,z:i[1]+(r[1]-i[1])*a+h*e,dx:h,dz:c}}turn(t,e){const n=this.at(t),i=this.at(t+e);return Math.abs(Math.atan2(n.dx*i.dz-n.dz*i.dx,n.dx*i.dx+n.dz*i.dz))}}class Nx{constructor(t,e,n,i,r){Object.assign(this,{car:t,path:e,lane:n,pace:i,s:r,go:!1,done:!1,stun:0,slip:0,slipDir:1}),this.baseLane=n,this.nextMistake=6+Math.random()*10,this.nextLane=3+Math.random()*4,t.speed=0,this.place()}place(){const t=this.path.at(this.s,this.lane),e=this.path.at(this.s+3,this.lane);this.car.pos.x=t.x,this.car.pos.z=t.z,this.car.heading=Math.atan2(e.x-t.x,e.z-t.z)}bump(t){t>6&&(this.stun=Math.max(this.stun,.5+Math.min(1,t*.05))),this.slip=Math.max(this.slip,.5),this.slipDir=Math.random()<.5?-1:1}update(t){const e=this.car;this.go&&!this.done&&(this.nextMistake-=t,this.nextMistake<=0&&(this.nextMistake=8+Math.random()*14,this.slip=1.2+Math.random(),this.slipDir=Math.random()<.5?-1:1),this.nextLane-=t,this.nextLane<=0&&(this.nextLane=3+Math.random()*5,this.baseLane=(Math.random()*2-1)*1.1)),this.stun=Math.max(0,this.stun-t),this.slip=Math.max(0,this.slip-t);const n=.55+.45*e.health/100;let i=!this.go||this.done||e.wrecked?0:this.pace*n*(1-Math.min(.6,this.path.turn(this.s,10+e.speed)*.55));this.stun>0&&(i*=.3),this.slip>0&&(i*=.55),e.speed+=Re.clamp(i-e.speed,-8*t,3.6*t),e.speed<0&&(e.speed*=.9),this.s+=Math.max(0,e.speed)*t;const r=this.baseLane+(this.slip>0?this.slipDir*1.4:0);this.lane+=(r-this.lane)*Math.min(1,t*1.5);const o=this.path.at(this.s,this.lane),a=this.path.at(this.s+2+e.speed*.3,this.lane);e.pos.x+=(o.x-e.pos.x)*Math.min(1,t*4),e.pos.z+=(o.z-e.pos.z)*Math.min(1,t*4);let h=Math.atan2(a.x-e.pos.x,a.z-e.pos.z)-e.heading;h=Math.atan2(Math.sin(h),Math.cos(h)),e.heading+=h*Math.min(1,t*6),e.steer=Re.clamp(-h*2,-.6,.6),this.s>=this.path.length-1&&(this.done=!0)}}class Fx{constructor({scene:t,world:e,roads:n,start:i,center:r,makeCar:o,ui:a,sound:h,toast:c}){var d;Object.assign(this,{scene:t,world:e,makeCar:o,ui:a,sound:h,toast:c}),this.cp=fn(3842274,!0),t.add(this.cp),this.state="idle",this.cool=0,this.rivals=[],this.SP=45;const l={village:new cn(n,new Set(["residential","tertiary","unclassified","living_street","trunk"])),streets:new cn(n,new Set(["residential","living_street"])),trunk:new cn(n,new Set(["trunk","tertiary"])),dirt:new cn(n,new Set(["track","unclassified"]))},u=(g,[x,m],p=0,M=1/0)=>{let _=null,v=1/0;for(const y of g.roads)for(const S of y.p){const w=Math.hypot(S[0]-r[0],S[1]-r[1]);if(w<p||w>M||Math.abs(S[0])>cn.limit-50||Math.abs(S[1])>cn.limit-50)continue;const T=Math.hypot(S[0]-x,S[1]-m);T<v&&(v=T,_=S)}return _},f=[{name:"Vuelta al pueblo",net:"village",start:i,length:1100,seed:7,pace:1,prize:1},{name:"Callejas del centro",net:"streets",start:u(l.streets,[r[0]+60,r[1]-60],40,140),length:650,seed:11,pace:.8,prize:.8},{name:"Sprint por la nacional",net:"trunk",start:u(l.trunk,r,0,900),length:1900,seed:3,pace:1.75,prize:1.4},{name:"Rally del monte",net:"dirt",start:u(l.dirt,r,120,500),length:1400,seed:5,pace:.9,prize:1.2}];this.circuits=[];for(const g of f){if(!g.start)continue;let x=null;for(let y=0;y<4&&!x;y++)x=zx(l[g.net],g.start,g.length*(1-y*.15),g.seed+y);if(!x)continue;const m=new fo(x),p=m.at(24),M=fn(14827578);if(this.circuits.some(y=>Math.hypot(y.marker.position.x-p.x,y.marker.position.z-p.z)<30))continue;M.position.set(p.x,e.terrain.height(p.x,p.z),p.z),t.add(M);const _=m.at(24,7.5),v=fn(10178047);v.scale.set(1,.6,1),v.position.set(_.x,e.terrain.height(_.x,_.z),_.z),t.add(v),this.circuits.push({...g,path:m,marker:M,trial:v})}this.circuit=this.circuits[0],this.path=(d=this.circuit)==null?void 0:d.path,this.records={}}addInterVillage(t){const e=t.villages,n=e.find(o=>o.main),i=e.filter(o=>!o.main&&(o.big||Math.hypot(o.c[0]-n.c[0],o.c[1]-n.c[1])<3e3)),r=[...i.map(o=>[n,o]),...i.map(o=>[o,n])];for(const o of i){let a=null,h=1/0;for(const c of i){const l=Math.hypot(c.c[0]-o.c[0],c.c[1]-o.c[1]);c!==o&&l<h&&(h=l,a=c)}a&&!r.some(([c,l])=>c===a&&l===o)&&r.push([o,a])}for(const[o,a]of r){const h=t.path(o.node,a.node);if(!h)continue;let c=new fo(h);if(c.length<1200||c.length>14e3)continue;let l=o.main?160:60,u;for(let m=0;m<12&&(u=c.at(l+24),!!this.circuits.some(p=>Math.hypot(p.marker.position.x-u.x,p.marker.position.z-u.z)<30));m++,l+=45);const f=[[c.at(l).x,c.at(l).z]];for(let m=0;m<h.length;m++)c.cum[m]>l&&f.push(h[m]);c=new fo(f),u=c.at(24);const d=fn(14827578);d.position.set(u.x,this.world.terrain.height(u.x,u.z),u.z),this.scene.add(d);const g=c.at(24,7.5),x=fn(10178047);x.scale.set(1,.6,1),x.position.set(g.x,this.world.terrain.height(g.x,g.z),g.z),this.scene.add(x),this.circuits.push({name:`${o.short||o.name} → ${a.short||a.name}`,to:a.name,path:c,marker:d,trial:x,pace:1.45,prize:+(1+c.length/3e3).toFixed(2),sp:70,long:!0})}}get starts(){const t=this.lastPos;return this.state==="idle"&&this.cool<=0?this.circuits.filter(e=>!t||Math.hypot(e.marker.position.x-t.x,e.marker.position.z-t.z)<2500).map(e=>[e.marker.position.x,e.marker.position.z]):[]}rec(t){const e=this.records[t];return e?`${e.toFixed(1)} s`:"sin récord"}get active(){return this.state!=="idle"}get target(){return this.state==="running"?[this.cp.position.x,this.cp.position.z]:null}get route(){var i;if(this.state==="idle"||!((i=this.circuit)!=null&&i.long))return null;const t=Math.min(this.next,this.ncp)*this.SP,e=this.path,n=[];for(let r=0;r<e.p.length;r++)e.cum[r]>=t-this.SP&&n.push(e.p[r]);return n}begin(t,e,n=!1){var a;this.circuit=e,this.path=e.path,this.trial=n,this.SP=e.sp||45,this.state="countdown",this.t=3.5,this.car=t;for(const h of this.circuits)h.marker.visible=!1,h.trial.visible=!1;const i=[-.9,.9];((h,c,l)=>{const u=this.path.at(c,l),f=this.path.at(c+3,l);h.pos.x=u.x,h.pos.z=u.z,h.heading=Math.atan2(f.x-u.x,f.z-u.z),h.speed=0})(t,14,i[1]);const o=[15909376,1802042,15263976];this.rivals=(n?[]:[[14,i[0],12.5],[6,i[1],13.5],[6,i[0],11.5]]).map(([h,c,l],u)=>{const f=this.makeCar(o[u]);return f.ai=new Nx(f,this.path,c,l*e.pace,h),f.racer=!0,f}),(a=this.onStart)==null||a.call(this,t),this.next=1,this.ncp=Math.floor(this.path.length/this.SP),this.placeCp(),n?this.toast(`⏱️ Contrarreloj: ${e.name}`,`${(this.path.length/1e3).toFixed(1)} km · récord: ${this.rec(e.name)}`):this.toast(`🏁 ${e.name}`,`${(this.path.length/1e3).toFixed(1)} km · ${e.long?`carrera hasta ${e.to}: `:""}sigue los círculos azules y llega el primero`)}placeCp(){const t=Math.min(this.path.length-1,this.next*this.SP),e=this.path.at(t);this.cp.position.set(e.x,this.world.terrain.height(e.x,e.z),e.z),this.cp.visible=this.state==="running"||this.state==="countdown"}playerS(){return Math.min(this.next,this.ncp)*this.SP-Math.hypot(this.car.pos.x-this.cp.position.x,this.car.pos.z-this.cp.position.z)}update(t,e,n){var o,a,h,c;if(this.cool>0&&(this.cool-=t),this.offer=null,this.lastPos=n,this.state==="idle"){const l=this.cool<=0&&!((o=this.busy)!=null&&o.call(this));let u=null;this.nearName=null;let f=null;for(const d of this.circuits){d.marker.visible=l,d.trial.visible=l;const g=Math.hypot(n.x-d.marker.position.x,n.z-d.marker.position.z),x=Math.hypot(n.x-d.trial.position.x,n.z-d.trial.position.z);l&&g<4&&(u=d),l&&x<3.5&&(u=d,f=d),l&&Math.min(g,x)<25&&(this.nearName=`${d.name} (récord ${this.rec(d.name)}): rojo carrera, morado contrarreloj`)}if(u&&e&&!e.wrecked){const d=f===u,g=e;this.offer={id:`race:${u.name}:${d}`,text:`${d?"⏱️ Contrarreloj":"🏁 Carrera"}: ${u.name}`,go:()=>this.begin(g,u,d)}}this.nearOnFoot=!!u&&!e;return}if(this.state==="countdown"){this.t-=t,this.car.speed=0;const l=Math.ceil(this.t-.5);this.write(l>0?`🏁 <b>${l}</b>`:"🏁 <b>¡YA!</b>"),this.t<=.5&&(this.state="running",this.rivals.forEach(u=>u.ai.go=!0),(a=this.sound)==null||a.call(this,"ok"),this.time=0);return}this.time+=t;for(let l=0;l<this.rivals.length;l++)for(let u=l+1;u<this.rivals.length;u++){const f=this.rivals[l],d=this.rivals[u];if(Math.hypot(f.pos.x-d.pos.x,f.pos.z-d.pos.z)<2.1*f.s&&!f.ai.done&&!d.ai.done){const x=Math.abs(f.speed-d.speed)+2,m=f.ai.s<d.ai.s?f:d,p=m===f?d:f;m.ai.bump(x),m.ai.baseLane=p.ai.lane>0?-1:1,m.ai.nextLane=4,(m===f?d:f).ai.slip=Math.max((m===f?d:f).ai.slip,.4),f.damage(x,0,f.ai.s<d.ai.s?1.8:-1.8),d.damage(x,0,f.ai.s<d.ai.s?-1.8:1.8)}}if(e!==this.car)return this.end("Has abandonado la carrera","Bájate del coche y pierdes",!1);if(Math.hypot(n.x-this.cp.position.x,n.z-this.cp.position.z)<9){if(this.next++,(h=this.sound)==null||h.call(this,"ok"),this.next>this.ncp){const l=this.circuit.name,u=this.records[l],f=!u||this.time<u;f&&(this.records[l]=this.time,(c=this.onRecord)==null||c.call(this));const d=f?" · ¡nuevo récord!":` · récord ${u.toFixed(1)} s`;if(this.trial){const m=Math.round((f?60:10)*this.circuit.prize);return this.end(f?"⏱️ ¡Nuevo récord!":"⏱️ Contrarreloj terminada",`${this.time.toFixed(1)} s${d} · +${m} €`,!0,m)}const g=1+this.rivals.filter(m=>m.ai.done).length,x=Math.round([0,150,75,30,0][g]*this.circuit.prize);return this.end(g===1?"¡Has ganado la carrera!":`Has llegado ${g}º`,`${this.time.toFixed(1)} s${d}${x?` · +${x} €`:""}`,!0,x)}this.placeCp()}if(this.rivals.length&&this.rivals.every(l=>l.ai.done)&&this.time>0&&(this.waitLast=(this.waitLast||0)+t,this.waitLast>25))return this.end("Has llegado el último","Los rivales ya han cruzado la meta",!1);const i=this.playerS(),r=1+this.rivals.filter(l=>l.ai.s>i).length;this.trial?this.write(`⏱️ Punto <b>${Math.min(this.next,this.ncp)}/${this.ncp}</b> · <b>${this.time.toFixed(1)} s</b> · récord ${this.rec(this.circuit.name)}`):this.circuit.long?this.write(`🏁 ${this.circuit.to} · <b>${r}º de 4</b> · quedan ${(Math.max(0,this.path.length-i)/1e3).toFixed(1)} km · ${this.time.toFixed(0)} s`):this.write(`🏁 Punto <b>${Math.min(this.next,this.ncp)}/${this.ncp}</b> · ${r}º de 4 · ${this.time.toFixed(0)} s`)}write(t){this.ui.mission.innerHTML!==t&&(this.ui.mission.innerHTML=t)}end(t,e,n,i=0){var o,a;this.toast(t,e),(o=this.sound)==null||o.call(this,n&&i?"ok":"fail"),i&&((a=this.onPrize)==null||a.call(this,i)),this.state="idle",this.cp.visible=!1,this.cool=6,this.waitLast=0,this.write("");const r=this.rivals;this.rivals=[],setTimeout(()=>r.forEach(h=>{var c;return(c=this.onRemove)==null?void 0:c.call(this,h)}),4e3)}}class Ox{constructor(t){this.net=t,this.nodes=new Map;for(const e of t.roads)for(let n=0;n<e.p.length;n++){const i=t.key(e.p[n]);if(this.nodes.has(i)||this.nodes.set(i,{p:e.p[n],nb:[]}),n>0){const r=t.key(e.p[n-1]),o=Math.hypot(e.p[n][0]-e.p[n-1][0],e.p[n][1]-e.p[n-1][1]);this.nodes.get(i).nb.push([r,o]),this.nodes.get(r).nb.push([i,o])}}this.list=[...this.nodes.entries()]}nearest(t,e){let n=null,i=1/0;for(const[r,o]of this.list){const a=(o.p[0]-t)**2+(o.p[1]-e)**2;a<i&&(i=a,n=r)}return n}path(t,e){const n=new Map([[t,0]]),i=new Map,r=[[0,t]],o=this.nodes.get(e).p,a=f=>{r.push(f);let d=r.length-1;for(;d>0;){const g=d-1>>1;if(r[g][0]<=r[d][0])break;[r[g],r[d]]=[r[d],r[g]],d=g}},h=()=>{const f=r[0],d=r.pop();if(r.length){r[0]=d;let g=0;for(;;){const x=2*g+1,m=x+1;let p=g;if(x<r.length&&r[x][0]<r[p][0]&&(p=x),m<r.length&&r[m][0]<r[p][0]&&(p=m),p===g)break;[r[p],r[g]]=[r[g],r[p]],g=p}}return f};let c=0;for(;r.length&&c++<2e4;){const[,f]=h();if(f===e)break;const d=n.get(f);for(const[g,x]of this.nodes.get(f).nb){const m=d+x;if(m<(n.get(g)??1/0)){n.set(g,m),i.set(g,f);const p=this.nodes.get(g).p;a([m+Math.hypot(p[0]-o[0],p[1]-o[1]),g])}}}if(!i.has(e)&&t!==e)return null;const l=[];let u=e;for(;u!==void 0;)l.unshift(this.nodes.get(u).p),u=i.get(u);return l}}class kx{constructor(t,e){this.unit=t,this.graph=e,this.path=null,this.wp=0,this.repath=0,this.stuck=0,this.reverse=0,this._a={x:0,y:0},this.brake=!1}axes(){return this._a}update(t,e,n){const i=this.unit,r=this._a;let o=e.x,a=e.z;const h=Math.hypot(o-i.pos.x,a-i.pos.z);if(this.repath-=t,n)o=i.pos.x+Math.sin(i.heading)*50,a=i.pos.z+Math.cos(i.heading)*50;else if(h>35){if(this.repath<=0||!this.path){this.repath=1.5;const d=this.graph.nearest(i.pos.x,i.pos.z),g=this.graph.nearest(e.x,e.z);this.path=d&&g?this.graph.path(d,g):null,this.wp=0}if(this.path){for(;this.wp<this.path.length-1&&Math.hypot(this.path[this.wp][0]-i.pos.x,this.path[this.wp][1]-i.pos.z)<7;)this.wp++;[o,a]=this.path[Math.min(this.wp,this.path.length-1)]}}let c=Math.atan2(o-i.pos.x,a-i.pos.z)-i.heading;if(c=Math.atan2(Math.sin(c),Math.cos(c)),this.reverse>0){this.reverse-=t,r.x=Math.sign(c)||1,r.y=-1,this.brake=!1,i.gear=1;return}Math.abs(i.speed)<.8&&!n&&h>7?(this.stuck+=t,this.stuck>1.6&&(this.stuck=0,this.reverse=1.3)):this.stuck=0,r.x=Re.clamp(-c*2.2,-1,1);const l=h<5&&!n,u=h<20&&!n,f=Math.abs(c)>1.2&&i.speed>7;r.y=l?i.speed>1?-1:0:u?i.speed>4+h*.3?-.6:.6:f?.2:1,this.brake=l&&i.speed>3,i.gear=i.speed>12.5?2:i.speed<10?1:i.gear}}class Bx{constructor({scene:t,world:e,net:n,cars:i,scale:r,isMobile:o,ui:a,toast:h,sound:c,wallet:l}){Object.assign(this,{scene:t,world:e,cars:i,scale:r,ui:a,toast:h,sound:c,wallet:l}),this.graph=new Ox(n),this.net=n,this.wanted=0,this.units=[],this.maxUnits=o?2:3,this.speedT=0,this.lostT=0,this.bustT=0,this.cool=0,this.flash=0}get active(){return this.wanted>0}report(t){if(this.cool>0)return;const e=this.wanted;t==="atropello"?this.wanted=Math.min(3,this.wanted+1):t==="velocidad"?this.wanted=Math.max(this.wanted,1):t==="golpe"&&(this.wanted=Math.min(3,Math.max(1,this.wanted+(this.wanted>=2?0:1)))),this.wanted!==e&&(this.lostT=0,this.toast("🚨 Guardia Civil",t==="atropello"?"Has atropellado a un vecino: te buscan":t==="velocidad"?"Vas demasiado rápido por el pueblo":"Has embestido a la patrulla"))}spawnUnit(t){let e=null;for(let o=0;o<60;o++){const a=this.net.randomSpot(),h=this.net.roads[a.ri].p[a.i],c=Math.hypot(h[0]-t.x,h[1]-t.z);if(c>110&&c<220){e={sp:a,p:h};break}(!e||Math.abs(c-160)<Math.abs(Math.hypot(e.p[0]-t.x,e.p[1]-t.z)-160))&&(e={sp:a,p:h})}const n=this.net.roads[e.sp.ri],i=n.p[Math.min(n.p.length-1,e.sp.i+1)],r=new Ti(this.world,16053490,"police",this.scale);r.place(e.p[0],e.p[1],Math.atan2(i[0]-e.p[0],i[1]-e.p[1])),r.police=!0,r.driver=!0,r.pursuer=new kx(r,this.graph),r.leaveT=0,this.scene.add(r.mesh),this.cars.push(r),this.units.push(r)}removeUnit(t){this.scene.remove(t.mesh);for(const n of t.smoke)this.scene.remove(n);const e=this.cars.indexOf(t);e>=0&&this.cars.splice(e,1),this.units.splice(this.units.indexOf(t),1)}update(t,e,n,i,r){var u;this.cool>0&&(this.cool-=t),n&&Math.abs(n.speed)>16.7&&Math.hypot(e.x-i[0],e.z-i[1])<260?(this.speedT+=t,this.speedT>2.5&&(this.report("velocidad"),this.speedT=0)):this.speedT=Math.max(0,this.speedT-t);const o=r?0:Math.min(this.maxUnits,this.wanted);this.units.filter(f=>!f.leaving).length<o&&(this._spawnT=(this._spawnT||0)-t)<=0&&(this.spawnUnit(e),this._spawnT=4);let h=1/0;this.flash+=t;for(const f of[...this.units]){f.wrecked&&!f.leaving&&(f.leaving=!0),f.pursuer.update(t,e,f.leaving),f.update(t,f.pursuer);const d=Math.hypot(f.pos.x-e.x,f.pos.z-e.z);f.leaving||(h=Math.min(h,d));const g=f.mesh.userData.siren;if(g){const x=!f.leaving&&(this.flash*6|0)%2;g[0].emissiveIntensity=x?6:.2,g[1].emissiveIntensity=x?.2:6}f.leaving&&(f.leaveT+=t,(f.leaveT>8&&d>60||f.leaveT>30)&&this.removeUnit(f)),n&&!f.leaving&&d<2.6*f.s+1&&Math.abs(n.speed-f.speed)>6&&(this._hitT=(this._hitT||0)-t)<=0&&(this.report("golpe"),this._hitT=3)}if(this.nearest=h,this.wanted>0){const f=n?Math.abs(n.speed)<1.5:!0;if(h<(n?8:7)&&f?this.bustT+=t:this.bustT=Math.max(0,this.bustT-t*.5),this.bustT>2.5){const d=40*this.wanted,g=Math.min(this.wallet.money,d);this.wallet.money-=g,this.toast("🚓 Te ha detenido la Guardia Civil",`Multa de ${d} €${g<d?` (solo tenías ${g} €)`:""}`),(u=this.sound)==null||u.call(this,"fail"),this.clear(),this.cool=20}h>140?(this.lostT+=t,this.lostT>14&&(this.wanted--,this.lostT=0,this.wanted||(this.toast("😮‍💨 Les has dado esquinazo","La Guardia Civil deja de buscarte"),this.clear()))):this.lostT=0}const c="★".repeat(this.wanted)+"☆".repeat(3-this.wanted),l=this.wanted?c:"";this.ui.wanted.textContent!==l&&(this.ui.wanted.textContent=l),this.ui.wanted.classList.toggle("busted",this.bustT>.5)}clear(){this.wanted=0,this.bustT=0,this.lostT=0;for(const t of this.units)t.leaving=!0,t.leaveT=0}get siren(){return this.units.some(t=>!t.leaving)?Math.max(0,1-this.nearest/250):0}}const $r={clear:{icon:"☀️",name:"Despejado",cloud:0,fog:0,rain:0,snow:0},cloudy:{icon:"☁️",name:"Nublado",cloud:.7,fog:.1,rain:0,snow:0},fog:{icon:"🌫️",name:"Niebla",cloud:.6,fog:1,rain:0,snow:0},rain:{icon:"🌧️",name:"Lluvia",cloud:.9,fog:.35,rain:1,snow:0},snow:{icon:"❄️",name:"Nieve",cloud:.8,fog:.45,rain:0,snow:1}},Yr=["clear","cloudy","fog","rain","snow"];function ko(s,t){const e=s.onBeforeCompile;s.onBeforeCompile=(n,i)=>{e==null||e.call(s,n,i),n.uniforms.uWet=t.wet,n.uniforms.uSnowCover=t.snow,n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
uniform float uWet; uniform float uSnowCover;`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
      {
        float upW = clamp(dot(normal, normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz)), 0.0, 1.0);
        float flatK = smoothstep(0.55, 0.85, upW);
        diffuseColor.rgb *= 1.0 - 0.38 * uWet * flatK;
        roughnessFactor = mix(roughnessFactor, 0.18, uWet * flatK * 0.85);
        float sn = uSnowCover * smoothstep(0.35, 0.75, upW);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.9, 0.92, 0.96), sn);
        roughnessFactor = mix(roughnessFactor, 0.75, sn);
      }`)},s.customProgramCacheKey=()=>s.uuid+"w",s.needsUpdate=!0}class Gx{constructor({scene:t,isMobile:e}){this.scene=t,this.U={wet:{value:0},snow:{value:0}},this.kind="clear",this.cur={...$r.clear},this.timer=140+Math.random()*120,this.grip=1;const n=e?900:1800;this.N=n;const i=new Float32Array(n*6);this.drops=new Float32Array(n*3);for(let u=0;u<n;u++)this.drops.set([(Math.random()-.5)*70,Math.random()*30,(Math.random()-.5)*70],u*3);const r=new de;r.setAttribute("position",new Ee(i,3)),this.rain=new Jh(r,new ur({color:11189196,transparent:!0,opacity:0,depthWrite:!1})),this.rain.frustumCulled=!1,t.add(this.rain);const o=new Float32Array(n*3);this.flakes=new Float32Array(n*3);for(let u=0;u<n;u++)this.flakes.set([(Math.random()-.5)*70,Math.random()*30,(Math.random()-.5)*70],u*3);const a=new de;a.setAttribute("position",new Ee(o,3));const h=document.createElement("canvas");h.width=h.height=32;const c=h.getContext("2d"),l=c.createRadialGradient(16,16,1,16,16,15);l.addColorStop(0,"#fff"),l.addColorStop(1,"rgba(255,255,255,0)"),c.fillStyle=l,c.fillRect(0,0,32,32),this.snow=new Qo(a,new Jo({size:.22,map:new Sn(h),transparent:!0,opacity:0,depthWrite:!1})),this.snow.frustumCulled=!1,t.add(this.snow)}get info(){return $r[this.kind]}set(t){$r[t]&&(this.kind=t,this.timer=160+Math.random()*160)}next(){this.set(Yr[(Yr.indexOf(this.kind)+1)%Yr.length])}pick(t){const e={clear:40,cloudy:22,fog:t>4&&t<11?22:5,rain:20,snow:6};let n=Math.random()*Object.values(e).reduce((i,r)=>i+r);for(const i of Yr)if(n-=e[i],n<=0)return this.set(i)}update(t,e,n,i,r,o){this.timer-=t,this.timer<=0&&this.pick(n.hour);const a=$r[this.kind],h=Math.min(1,t/12);for(const _ of["cloud","fog","rain","snow"])this.cur[_]+=(a[_]-this.cur[_])*h;const{cloud:c,fog:l,rain:u,snow:f}=this.cur;this.U.wet.value+=((u>.3?1:0)-this.U.wet.value)*t*(u>.3?.08:.02),this.U.snow.value+=((f>.4?.85:0)-this.U.snow.value)*t*(f>.4?.03:.015),this.grip=1-.28*this.U.wet.value-.45*this.U.snow.value,i.intensity*=1-.65*c,r.intensity*=1-.25*c;const d=o.material.uniforms;d.turbidity.value+=c*8,d.rayleigh.value*=1-.5*c;const g=this.scene.fog,x=new Wt(11120822).multiplyScalar(1-.85*n.n);g.color.lerp(x,Math.max(c*.6,l)),g.near*=1-.9*l,g.far=Re.lerp(g.far,120,l*.9);const m=this.rain.geometry.attributes.position,p=this.snow.geometry.attributes.position;this.rain.visible=u>.02,this.snow.visible=f>.02,this.rain.material.opacity=.55*u*(1-.5*n.n),this.snow.material.opacity=.9*f;const M=(_,v,y)=>_-v>y?_-2*y:_-v<-y?_+2*y:_;if(this.rain.visible){const _=Math.floor(this.N*Math.min(1,u*1.2));for(let v=0;v<this.N;v++){const y=this.drops;let S=y[v*3+1]-t*19;S<-2&&(S+=32),y[v*3+1]=S;const w=M(y[v*3]+e.x,e.x,35),T=M(y[v*3+2]+e.z,e.z,35);y[v*3]=w-e.x,y[v*3+2]=T-e.z;const b=v<_?e.y+S:-9999;m.setXYZ(v*2,w,b,T),m.setXYZ(v*2+1,w+.03,b+.55,T+.02)}m.needsUpdate=!0}if(this.snow.visible){const _=Math.floor(this.N*Math.min(1,f*1.2)),v=performance.now()/1e3;for(let y=0;y<this.N;y++){const S=this.flakes;let w=S[y*3+1]-t*1.3;w<-2&&(w+=32),S[y*3+1]=w,S[y*3]+=Math.sin(v*.8+y)*t*.4;const T=M(S[y*3]+e.x,e.x,35),b=M(S[y*3+2]+e.z,e.z,35);S[y*3]=T-e.x,S[y*3+2]=b-e.z,p.setXYZ(y,T,y<_?e.y+w:-9999,b)}p.needsUpdate=!0}}get raining(){return this.cur.rain>.25||this.cur.snow>.3}}class Hx{constructor(t){this.engine=t,this.t={bird:3,bark:20,music:0},this.ready=!1}init(){const t=this.engine.ctx;if(!t||this.ready)return!!this.ready;if(this.ctx=t,this.ready=!0,this.bus=t.createGain(),this.busLP=t.createBiquadFilter(),this.busLP.type="lowpass",this.busLP.frequency.value=2e4,this.bus.connect(this.busLP),this.busLP.connect(t.destination),this.engine.reverb){const a=this.engine.reverb();this.rev=t.createConvolver(),this.rev.buffer=a.buffer;const h=t.createGain();h.gain.value=.35,this.rev.connect(h),h.connect(this.bus)}const e=t.createBuffer(1,t.sampleRate*2,t.sampleRate),n=e.getChannelData(0);for(let a=0;a<n.length;a++)n[a]=Math.random()*2-1;this.noise=e;const i=(a,h,c)=>{const l=t.createBufferSource();l.buffer=e,l.loop=!0;const u=t.createBiquadFilter();u.type=a,u.frequency.value=h,u.Q.value=c;const f=t.createGain();return f.gain.value=0,l.connect(u),u.connect(f),f.connect(this.bus),l.start(),f};this.rainG=i("lowpass",1800,.3),this.windG=i("lowpass",300,.5),this.dropG=i("highpass",3500,.5);const r=t.createOscillator();r.type="sawtooth",r.frequency.value=680;const o=t.createBiquadFilter();return o.type="lowpass",o.frequency.value=1500,o.Q.value=2,this.sirenG=t.createGain(),this.sirenG.gain.value=0,r.connect(o),o.connect(this.sirenG),this.sirenG.connect(this.bus),r.start(),this.sirenO=r,this.musicG=t.createGain(),this.musicG.gain.value=0,this.musicLP=t.createBiquadFilter(),this.musicLP.type="lowpass",this.musicLP.frequency.value=6e3,this.musicG.connect(this.musicLP),this.musicLP.connect(this.bus),!0}tone(t,e,n,i,r="sine",o=null,a=0){const h=this.ctx,c=h.createOscillator(),l=h.createGain();c.type=r,c.frequency.setValueAtTime(t,e),a&&c.frequency.exponentialRampToValueAtTime(t*a,e+n),l.gain.setValueAtTime(0,e),l.gain.linearRampToValueAtTime(i,e+Math.min(.02,n/4)),l.gain.exponentialRampToValueAtTime(1e-4,e+n),c.connect(l),l.connect(o||this.bus),c.start(e),c.stop(e+n+.05)}burst(t,e,n,i,r="bandpass",o=null){const a=this.ctx,h=a.createBufferSource();h.buffer=this.noise;const c=a.createBiquadFilter();c.type=r,c.frequency.value=i,c.Q.value=1.2;const l=a.createGain();l.gain.setValueAtTime(n,t),l.gain.exponentialRampToValueAtTime(1e-4,t+e),h.connect(c),c.connect(l),l.connect(o||this.bus),h.start(t,Math.random()),h.stop(t+e+.05)}spot(t,e){const n=this.lis||{x:0,z:0,fx:0,fz:1},i=t-n.x,r=e-n.z,o=Math.hypot(i,r)||.01;return{g:1/(1+o/8)**1.7,pan:Math.max(-.9,Math.min(.9,(i*-n.fz+r*n.fx)/o)),lp:500+9e3*Math.exp(-o/45),d:o}}srcOut(t,e,n=t,i=e,r=0,o=6){const a=this.ctx,h=a.currentTime,c=a.createGain(),l=a.createBiquadFilter();l.type="lowpass";const u=a.createStereoPanner?a.createStereoPanner():null,f=this.spot(t,e);if(c.gain.setValueAtTime(f.g,h),l.frequency.setValueAtTime(f.lp,h),u==null||u.pan.setValueAtTime(f.pan,h),r>0)for(let d=1;d<=8;d++){const g=d/8,x=this.spot(t+(n-t)*g,e+(i-e)*g),m=h+r*g;c.gain.linearRampToValueAtTime(x.g,m),l.frequency.linearRampToValueAtTime(x.lp,m),u==null||u.pan.linearRampToValueAtTime(x.pan,m)}if(u?(c.connect(u),u.connect(l)):c.connect(l),l.connect(this.bus),this.rev&&f.d>25){const d=a.createGain();d.gain.value=Math.min(.35,f.d/400),l.connect(d),d.connect(this.rev)}return setTimeout(()=>{try{c.disconnect(),l.disconnect(),u==null||u.disconnect()}catch{}},(o+r)*1e3),c}around(t,e){const n=this.lis||{x:0,z:0},i=Math.random()*6.283,r=t+Math.random()*(e-t);return[n.x+Math.cos(i)*r,n.z+Math.sin(i)*r]}birdOut(){const[t,e]=this.around(8,90);if(Math.random()<.35){const n=Math.random()*6.283,i=8+Math.random()*6;return this.srcOut(t,e,t+Math.cos(n)*i*3,e+Math.sin(n)*i*3,3)}return this.srcOut(t,e)}note(t,e,n,i,r,o,a=0,h=0,c="sine"){const l=this.ctx,u=l.createOscillator(),f=l.createGain();if(u.type=c,u.frequency.setValueAtTime(i,e),u.frequency.exponentialRampToValueAtTime(r,e+n),a){const d=l.createOscillator(),g=l.createGain();d.frequency.value=h,g.gain.value=a,d.connect(g),g.connect(u.frequency),d.start(e),d.stop(e+n+.05)}f.gain.setValueAtTime(0,e),f.gain.linearRampToValueAtTime(o,e+Math.min(.012,n/3)),f.gain.setValueAtTime(o,e+n*.6),f.gain.exponentialRampToValueAtTime(1e-4,e+n),u.connect(f),f.connect(t),u.start(e),u.stop(e+n+.05)}sparrow(t,e){const n=3+(Math.random()*5|0),i=3200+Math.random()*900;for(let r=0;r<n;r++){const o=e+r*(.13+Math.random()*.05),a=i*(.92+Math.random()*.16);this.note(t,o,.05,a*1.15,a*.8,.05),this.note(t,o+.045,.035,a*.85,a*1.1,.03)}return n*.16}blackbird(t,e){const n=1500+Math.random()*700,i=4+(Math.random()*4|0);let r=e;for(let o=0;o<i;o++){const a=.09+Math.random()*.16,h=n*(.8+Math.random()*.8),c=h*(.85+Math.random()*.35);this.note(t,r,a,h,c,.06,h*.015,22),this.note(t,r,a,h*2,c*2,.008),r+=a+.03}for(let o=0;o<3;o++)this.note(t,r+o*.035,.03,3800+Math.random()*600,3400,.01);return r-e+.2}goldfinch(t,e){const n=8+(Math.random()*10|0);let i=e;for(let r=0;r<n;r++){const o=3e3+Math.random()*1800,a=.03+Math.random()*.05;this.note(t,i,a,o,o*(Math.random()<.5?1.2:.8),.02,o*.02,30),i+=a+.012}return i-e}lark(t,e){let n=e;const i=e+2+Math.random()*2;for(;n<i;){const r=2400+Math.random()*1800,o=.04+Math.random()*.07;this.note(t,n,o,r,r*(.85+Math.random()*.3),.015,r*.02,30),n+=o+.008}return n-e}cuckoo(t,e){for(let n=0;n<2+(Math.random()*3|0);n++){const i=e+n*.9;this.note(t,i,.22,700,680,.07),this.note(t,i+.3,.32,575,555,.07)}return 3}hoopoe(t,e){for(let n=0;n<2+(Math.random()*2|0);n++)for(let i=0;i<3;i++){const r=e+n*1.1+i*.16;this.note(t,r,.09,420,380,.08,0,0,"triangle")}return 3}swallow(t,e){let n=e;const i=10+(Math.random()*12|0);for(let r=0;r<i;r++){const o=2600+Math.random()*2e3,a=.03+Math.random()*.06;this.note(t,n,a,o,o*(.8+Math.random()*.4),.02,o*.02,30),n+=a+.01+Math.random()*.03}for(let r=0;r<10;r++)this.note(t,n+r*.02,.014,3300,3100,.01);return n-e+.3}swift(t,e){for(let n=0;n<2+(Math.random()*3|0);n++){const i=e+n*(.2+Math.random()*.3),r=6e3+Math.random()*1500;this.note(t,i,.3,r*.7,r*.6,.008,150,40)}return 1.5}scops(t,e){const n=1150+Math.random()*120;for(let i=0;i<3+(Math.random()*4|0);i++)this.note(t,e+i*2.6,.22,n*1.03,n*.97,.07);return 9}tawny(t,e){return this.note(t,e,.7,520,480,.08,6,6),this.note(t,e+1.6,.18,470,450,.06),this.note(t,e+1.85,.18,480,460,.06),this.note(t,e+2.1,1.4,500,440,.08,14,8),6}littleOwl(t,e){for(let n=0;n<1+(Math.random()*3|0);n++){const i=e+n*1.8;this.note(t,i,.18,1100,1500,.05),this.note(t,i+.17,.3,1500,1050,.05)}return 6}nightjar(t,e){const n=this.ctx.createOscillator(),i=this.ctx.createGain(),r=this.ctx.createOscillator(),o=this.ctx.createGain(),a=3+Math.random()*4;n.frequency.value=1300+Math.random()*200,r.frequency.value=38+Math.random()*6,o.gain.value=.5,r.connect(o),o.connect(i.gain),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(.5,e+.3),i.gain.setValueAtTime(.5,e+a-.3),i.gain.linearRampToValueAtTime(0,e+a);const h=this.ctx.createGain();return h.gain.value=.05,n.connect(i),i.connect(h),h.connect(t),n.start(e),r.start(e),n.stop(e+a+.1),r.stop(e+a+.1),a+2}nightBird(){const t=this.ctx.currentTime+.02,[e,n]=this.around(30,160),i=this.srcOut(e,n,e,n,0,12),r=Math.random();return i.gain.value*=2.5,r<.4?this.scops(i,t):r<.65?this.tawny(i,t):r<.85?this.littleOwl(i,t):this.nightjar(i,t)}cluck(t,e){const n=this.srcOut(t,e),i=this.ctx.currentTime+.02;n.gain.value*=2;const r=2+(Math.random()*4|0);for(let o=0;o<r;o++){const a=i+o*(.18+Math.random()*.1),h=480+Math.random()*120;this.note(n,a,.07,h*1.2,h,.06,0,0,"sawtooth")}Math.random()<.25&&this.note(n,i+r*.25,.5,700,900,.05,30,9,"sawtooth")}bleat(t,e){const n=this.ctx,i=this.srcOut(t,e),r=n.currentTime+.02,o=260+Math.random()*160,a=.5+Math.random()*.5;i.gain.value*=2;const h=n.createOscillator(),c=n.createGain(),l=n.createOscillator(),u=n.createGain(),f=n.createBiquadFilter(),d=n.createBiquadFilter();h.type="sawtooth",h.frequency.setValueAtTime(o,r),h.frequency.linearRampToValueAtTime(o*1.06,r+a*.3),h.frequency.linearRampToValueAtTime(o*.92,r+a),l.frequency.value=6.5+Math.random()*2,u.gain.value=.35,l.connect(u),u.connect(c.gain),f.type="bandpass",f.frequency.value=900,f.Q.value=3,d.type="bandpass",d.frequency.value=2400,d.Q.value=4,c.gain.setValueAtTime(0,r),c.gain.linearRampToValueAtTime(.5,r+.05),c.gain.setValueAtTime(.5,r+a*.7),c.gain.linearRampToValueAtTime(0,r+a);const g=n.createGain();g.gain.value=.16,h.connect(f),h.connect(d),f.connect(c),d.connect(c),c.connect(g),g.connect(i),h.start(r),l.start(r),h.stop(r+a+.1),l.stop(r+a+.1)}cowbell(t,e){const n=this.srcOut(t,e,t,e,0,3),i=this.ctx.currentTime+Math.random()*.05,r=520+Math.random()*260;for(const[o,a,h]of[[1,.04,.3],[1.52,.025,.2],[2.4,.012,.12]])this.note(n,i,h,r*o,r*o*.995,a)}meow(t,e){const n=this.srcOut(t,e),i=this.ctx.currentTime+.02,r=600+Math.random()*200;n.gain.value*=1.5,this.note(n,i,.6,r,r*.7,.05,20,5,"sawtooth")}chirp(t=12,e=!1){const n=this.ctx.currentTime+.02,i=this.birdOut(),r=Math.random();i.gain.value*=1.6;const o=()=>{const[a,h]=this.around(150,400);return this.srcOut(a,h)};return e?r<.4?this.lark(i,n):r<.55?this.hoopoe(i,n):r<.7?this.cuckoo(o(),n):r<.85?this.swallow(i,n):this.goldfinch(i,n):t>18&&t<21.5&&r<.15?this.swift(i,n):r<.35?this.sparrow(i,n):r<.55?this.swallow(i,n):r<.72?this.blackbird(i,n):r<.86?this.goldfinch(i,n):r<.94?this.hoopoe(i,n):this.cuckoo(o(),n)}barkAt(t,e,n){const i=this.ctx,r=i.currentTime+.02,o=this.srcOut(e,n),a=380+Math.random()*220;o.gain.value*=2.5;for(let h=0;h<1+(Math.random()*3|0);h++){const c=r+h*(.28+Math.random()*.12),l=i.createOscillator(),u=i.createGain(),f=i.createBiquadFilter(),d=i.createBiquadFilter();l.type="sawtooth",l.frequency.setValueAtTime(a*.8,c),l.frequency.linearRampToValueAtTime(a*1.15,c+.03),l.frequency.exponentialRampToValueAtTime(a*.6,c+.16),f.type="bandpass",f.frequency.value=900,f.Q.value=2.5,d.type="bandpass",d.frequency.value=2300,d.Q.value=3,u.gain.setValueAtTime(0,c),u.gain.linearRampToValueAtTime(t*1.6,c+.012),u.gain.exponentialRampToValueAtTime(5e-4,c+.2),l.connect(f),l.connect(d),f.connect(u),d.connect(u),u.connect(o),l.start(c),l.stop(c+.25),this.burst(c,.09,t*.25,1400,"bandpass",o)}}hiss(t,e,n,i,r,o,a=1.5,h="bandpass"){const c=this.ctx,l=c.createBufferSource();l.buffer=this.noise;const u=c.createBiquadFilter();u.type=h,u.frequency.setValueAtTime(i,t),u.frequency.exponentialRampToValueAtTime(r,t+e),u.Q.value=a;const f=c.createGain();f.gain.setValueAtTime(1e-4,t),f.gain.exponentialRampToValueAtTime(n,t+Math.min(.05,e/5)),f.gain.setValueAtTime(n,t+e*.7),f.gain.exponentialRampToValueAtTime(1e-4,t+e),l.connect(u),u.connect(f),f.connect(o),l.start(t,Math.random()),l.stop(t+e+.05)}fwOut(t,e,n){const i=this.ctx,r=this.spot(e,n),o=i.createGain();o.gain.value=t*Math.min(1,1/(1+r.d/60)**1.2);let a=o;if(i.createStereoPanner){const c=i.createStereoPanner();c.pan.value=r.pan*.7,o.connect(c),a=c}const h=i.createBiquadFilter();if(h.type="lowpass",h.frequency.value=400+8e3*Math.exp(-r.d/120),a.connect(h),a=h,a.connect(this.bus),this.rev){const c=i.createGain();c.gain.value=1.6,a.connect(c),c.connect(this.rev)}return setTimeout(()=>{try{o.disconnect()}catch{}},9e3),o}whistle(t,e=0,n=0){const i=this.ctx.currentTime+.01+this.spot(e,n).d/343,r=this.fwOut(t*2,e,n);this.hiss(i,1.3,.25,1800,3200,r,.8),this.hiss(i,.25,.8,800,400,r,.7,"lowpass"),Math.random()<.3&&this.note(r,i+.1,1.2,1e3,2e3,.05,25,14)}pop(t,e=0,n=0){const i=this.ctx,r=i.currentTime+.02+this.spot(e,n).d/343,o=this.fwOut(t*2.2,e,n);this.hiss(r,.18,1,2200,700,o,.6,"lowpass"),this.hiss(r,1.6,.9,700,90,o,.7,"lowpass");const a=i.createOscillator(),h=i.createGain();if(a.frequency.setValueAtTime(70,r),a.frequency.exponentialRampToValueAtTime(32,r+.9),h.gain.setValueAtTime(0,r),h.gain.linearRampToValueAtTime(.9,r+.01),h.gain.exponentialRampToValueAtTime(1e-4,r+1.1),a.connect(h),h.connect(o),a.start(r),a.stop(r+1.2),Math.random()<.6)for(let c=0;c<26+Math.random()*30;c++){const l=r+.35+Math.random()*1.6;this.hiss(l,.012+Math.random()*.02,.08+Math.random()*.12,2e3+Math.random()*2e3,1500,o,2)}}reed(t,e,n,i,r){const o=this.ctx,a=o.createGain(),h=o.createBiquadFilter();h.type="lowpass",h.frequency.value=Math.min(3200,e*4.5),h.Q.value=.4,a.gain.setValueAtTime(0,n),a.gain.linearRampToValueAtTime(r,n+.035),a.gain.setValueAtTime(r*.9,n+Math.max(.04,i-.06)),a.gain.linearRampToValueAtTime(0,n+i+.05),a.connect(h),h.connect(t);for(const c of[-9,0,9]){const l=o.createOscillator();l.type=c?"sawtooth":"square",l.frequency.value=e*2**(c/1200);const u=o.createGain();u.gain.value=c?.33:.22,l.connect(u),u.connect(a),l.start(n),l.stop(n+i+.1)}}music(t){const e=this.musicBus||(()=>{const g=this.ctx.createGain();if(g.gain.value=1,g.connect(this.musicG),this.rev){const x=this.ctx.createGain();x.gain.value=.5,g.connect(x),x.connect(this.rev)}return this.musicBus=g})(),n=.27,i=g=>440*2**((g-69)/12),r=[[67,1],[71,1],[74,2],[79,1],[78,1],[76,1],[74,1],[72,1],[71,1],[69,2],[66,1],[69,1],[74,2],[78,1],[76,1],[74,1],[72,1],[71,1],[72,1],[74,1],[78,1],[79,2],[74,2],[71,2],[67,2],[72,1],[76,1],[79,2],[76,1],[74,1],[72,1],[76,1],[74,2],[71,2],[67,1],[71,1],[74,2],[78,2],[76,1],[74,1],[72,1],[71,1],[69,1],[66,1],[67,2],[71,2],[67,4]],o=[[71,1],[76,1],[79,2],[78,1],[76,1],[74,1],[71,1],[72,1],[76,1],[81,2],[81,1],[79,1],[76,1],[72,1],[74,1],[78,1],[81,2],[79,1],[78,1],[76,1],[74,1],[71,2],[74,2],[79,4],[76,1],[79,1],[84,2],[83,1],[81,1],[79,1],[76,1],[74,2],[79,2],[76,1],[74,1],[71,1],[67,1],[69,1],[72,1],[76,2],[74,1],[72,1],[71,1],[69,1],[67,2],[71,1],[74,1],[79,4]],a={G:[43,[59,62,67]],D:[38,[57,60,66]],C:[36,[60,64,67]],E:[40,[59,64,67]],A:[45,[57,60,64]]},h="GGDDDDGGCCGGDDGG",c="EEAADDGGCCGEADGG";this.part=((this.part||0)+1)%4;const l=this.part===2,u=l?o:r,f=l?c:h;let d=t;for(const[g,x]of u)this.reed(e,i(g),d,x*n*.92,.05),this.reed(e,i(g-12),d,x*n*.92,.012),d+=x*n;for(let g=0;g<16;g++){const[x,m]=a[f[g]],p=t+g*4*n,M=g%2?7:0;this.reed(e,i(x+M-(M?12:0)+12),p,n*1.4,.06);for(const _ of m)this.reed(e,i(_),p+2*n,n*.8,.018);this.burst(p+2*n,.05,.02,6e3,"highpass",e),this.burst(p+2*n+n,.03,.01,6e3,"highpass",e)}return 64*n}update(t,{day:e,night:n,rain:i,wind:r,siren:o,music:a,inside:h,hour:c=12,open:l=!1,lis:u=null,animals:f=null,cabin:d=0}){if(u&&(this.lis=u),this.bus){const p=this.ctx.currentTime;this.bus.gain.setTargetAtTime(d?.22:1,p,.15),this.busLP.frequency.setTargetAtTime(d?650:2e4,p,.15)}if(!this.init())return;const g=this.ctx,x=g.currentTime,m=h?.15:1;if(this.rainG.gain.setTargetAtTime(i*.16*m,x,.5),this.windG.gain.setTargetAtTime(r*.08*m,x,.8),this.dropG.gain.setTargetAtTime(i*.015*m*(.6+Math.random()*.8),x,.05),this.t.crick=(this.t.crick??0)-t,this.t.crick<=0&&(this.t.crick=.25+Math.random()*.5,n>.5&&i<.2&&!h)){this.crickets=this.crickets||Array.from({length:6},()=>[3900+Math.random()*500,...this.around(4,40)]);const p=this.crickets[Math.random()*6|0];if(this.spot(p[1],p[2]).d>60){const[y,S]=this.around(4,40);p[1]=y,p[2]=S}const M=p[0],_=this.srcOut(p[1],p[2],p[1],p[2],0,2),v=x+.02;_.gain.value*=1.2;for(let y=0;y<3+(Math.random()*2|0);y++)this.note(_,v+y*.032,.018,M,M*.98,.02*n)}if(this.sirenO.frequency.setTargetAtTime(x%1.1<.55?680:900,x,.035),this.sirenG.gain.setTargetAtTime(o*.06,x,.1),this.t.bird-=t,this.t.bird<=0){const p=c>5.5&&c<9.5?1:c>17&&c<20.5?.7:.35;this.t.bird=(.8+Math.random()*4)/p,e>.4&&i<.3&&r<.4&&!h?this.t.bird+=Math.min(3,this.chirp(c,l)*.5):n>.6&&i<.3&&!h&&Math.random()<.5&&(this.t.bird+=this.nightBird())}if(f&&!h&&this.lis){const p=this.lis,M=(v,y)=>v.filter(S=>S.mesh.visible&&Math.hypot(S.pos.x-p.x,S.pos.z-p.z)<y);if(this.t.hen=(this.t.hen??3)-t,this.t.hen<=0){this.t.hen=2+Math.random()*6;const v=M(f.hens||[],90);if(v.length&&e>.3){const y=v[Math.random()*v.length|0];this.cluck(y.pos.x,y.pos.z)}}const _=M(f.sheep||[],300);if(this.t.bleat=(this.t.bleat??4)-t,this.t.bleat<=0&&(this.t.bleat=3+Math.random()*7,_.length)){const v=_[Math.random()*_.length|0];this.bleat(v.pos.x,v.pos.z)}if(this.t.bell=(this.t.bell??1)-t,this.t.bell<=0&&(this.t.bell=.6+Math.random()*1.8,_.length)){const v=_[Math.random()*_.length|0];(v.speed>.1||Math.random()<.35)&&this.cowbell(v.pos.x,v.pos.z)}if(this.t.dog=(this.t.dog??15)-t,this.t.dog<=0){this.t.dog=(n>.5?8:25)+Math.random()*25;const v=M((f.list||[]).filter(y=>y.kind==="dog"),160);if(v.length){const y=v[Math.random()*v.length|0];this.barkAt(.08,y.pos.x,y.pos.z)}}if(this.t.cat=(this.t.cat??30)-t,this.t.cat<=0){this.t.cat=25+Math.random()*40;const v=M((f.list||[]).filter(y=>y.kind==="cat"),100);if(v.length&&n>.5){const y=v[Math.random()*v.length|0];this.meow(y.pos.x,y.pos.z)}}}if(this.t.bark-=t,this.t.bark<=0&&(this.t.bark=12+Math.random()*30,n>.5&&!h)){const[p,M]=this.around(120,450);this.barkAt(.08,p,M)}this.musicG.gain.setTargetAtTime(a*a*.9,x,.4),this.musicLP.frequency.setTargetAtTime(500+7e3*a*a,x,.4),a>.01?(this.t.music-=t,this.t.music<=.2&&(this.t.music+=this.music(x+Math.max(0,this.t.music)))):this.t.music=0}}class Vx{constructor(t){this.engine=t}init(){const t=this.engine.ctx;if(!t)return!1;if(this.ctx)return!0;this.ctx=t;const e=this.out=t.createGain();e.gain.value=0,e.connect(t.destination);const n=new Float32Array(32),i=new Float32Array(32);for(let v=1;v<32;v++)i[v]=(v%2?1:.6)/Math.pow(v,1.1);const r=this.exh=t.createOscillator();r.setPeriodicWave(t.createPeriodicWave(n,i));const o=t.createGain();o.gain.value=.35;const a=this.elp=t.createBiquadFilter();a.type="lowpass",a.frequency.value=900,a.Q.value=.8,r.connect(o),o.connect(a);const h=this.prop=t.createOscillator();h.type="sawtooth";const c=t.createGain();c.gain.value=.25;const l=t.createBiquadFilter();l.type="lowpass",l.frequency.value=260,h.connect(l),l.connect(c);const u=t.createGain();u.gain.value=.7;const f=this.lfo=t.createOscillator();f.type="sine";const d=t.createGain();d.gain.value=.3,f.connect(d),d.connect(u.gain),a.connect(u),c.connect(u),u.connect(e);const g=t.createBuffer(1,t.sampleRate*2,t.sampleRate),x=g.getChannelData(0);let m=0;for(let v=0;v<x.length;v++)m=(m+.05*(Math.random()*2-1))/1.05,x[v]=m*3;const p=t.createBufferSource();p.buffer=g,p.loop=!0;const M=this.nf=t.createBiquadFilter();M.type="bandpass",M.frequency.value=600,M.Q.value=.5;const _=this.ng=t.createGain();_.gain.value=0,p.connect(M),M.connect(_),_.connect(t.destination);for(const v of[r,h,f,p])v.start();return!0}update(t,e,n){if(!this.init())return;const i=this.ctx.currentTime,r=900+e*1800+Math.min(300,n*4),o=r/60*2,a=r/60*2;this.exh.frequency.setTargetAtTime(o,i,.15),this.prop.frequency.setTargetAtTime(a*.5,i,.15),this.lfo.frequency.setTargetAtTime(a*.25+1.3,i,.2),this.elp.frequency.setTargetAtTime(500+e*1500,i,.2),this.out.gain.setTargetAtTime(t?.09+e*.1:0,i,t?.3:.6),this.nf.frequency.setTargetAtTime(400+n*18,i,.3),this.ng.gain.setTargetAtTime(t?Math.min(.12,n*.0025):0,i,.4)}}const Mu="valde.save.v1";function Wx(){try{const s=JSON.parse(localStorage.getItem(Mu)||"null");return s&&typeof s=="object"?s:null}catch{return null}}function Xx(s){try{return localStorage.setItem(Mu,JSON.stringify(s)),!0}catch{return!1}}const qx=[{kind:"tractor",color:3112242,price:300},{kind:"moto",color:12597547,price:450},{kind:"4x4",color:5595242,price:650}],Gs=(s,t=.8,e=0)=>new wt({color:s,roughness:t,metalness:e});function ri(s,t,e,n,i,r,o,a){const h=new xt(new Qt(t,e,n),i);return h.position.set(r,o,a),h.castShadow=!0,h.receiveShadow=!0,s.add(h),h}function po(s,t,e,n,i){const r=new xt(new Pe(n,i),new wt({map:lr(s,t,e,512,Math.round(512*i/n)),roughness:.6,side:be}));return r.castShadow=!0,r}function _u(s,t,e){const n=(s.half||1e3)-120,i=s.roads,r=u=>Math.abs(u[0])<n&&Math.abs(u[1])<n,o=(u,f,d,g=[])=>{let x=null,m=1/0;for(const p of i)if(u.includes(p.k))for(let M=0;M<p.p.length-1;M++){const _=p.p[M],v=p.p[M+1],y=Math.hypot(_[0]-t[0],_[1]-t[1]);y<f||y>d||!r(_)||Math.hypot(v[0]-_[0],v[1]-_[1])<8||g.some(S=>Math.hypot(S[0]-_[0],S[1]-_[1])<150)||y<m&&(m=y,x={p:_,q:v,w:p.w})}return x},a=(u,f)=>{const d=u.q[0]-u.p[0],g=u.q[1]-u.p[1],x=Math.hypot(d,g),m=-g/x,p=d/x,M=Math.atan2(d,g);for(const _ of[1,-1]){const v=u.p[0]+d/x*4+m*f*_,y=u.p[1]+g/x*4+p*f*_;if(!e.nearest(v,y,f*.8))return{x:v,z:y,h:M,nx:m*_,nz:p*_,ux:d/x,uz:g/x}}return{x:u.p[0]+m*f,z:u.p[1]+p*f,h:M,nx:m,nz:p,ux:d/x,uz:g/x}},h={},c=o(["trunk"],0,n*1.4)||o(["tertiary"],100,n*1.4);c&&(h.gas=a(c,c.w/2+8));const l=o(["trunk","tertiary"],220,n*1.4,h.gas?[[h.gas.x,h.gas.z]]:[]);return l&&(h.shop=a(l,l.w/2+11)),h}var ca,yu;class $x{constructor({scene:t,world:e,data:n,center:i,colliders:r,spawnVehicle:o,wallet:a,toast:h,sound:c,owned:l,sites:u}){Gi(this,ca);Object.assign(this,{scene:t,world:e,wallet:a,toast:h,sound:c,spawnVehicle:o});const f=e.terrain;if(this.places=[],u=u||_u(n,i,r),u.gas){const d=u.gas,g=new zt;g.position.set(d.x,f.height(d.x,d.z),d.z),g.rotation.y=d.h;const x=Gs(15921904,.6),m=Gs(13116958,.5),p=Gs(8225416,.5,.4);ri(g,7,.35,11,x,0,4.6,0),ri(g,7.1,.25,11.1,m,0,4.35,0);for(const[y,S]of[[-3,-4.5],[3,-4.5],[-3,4.5],[3,4.5]])ri(g,.3,4.4,.3,x,y,2.2,S);for(const y of[-2,2])ri(g,.7,1.6,.5,p,0,.8,y),ri(g,.5,.3,.52,Gs(1060896,.2),0,1.3,y);ri(g,.25,6,.25,p,-4.5,3,6);const M=po("⛽ GASOLINERA","#c8261e","#ffffff",3,.8);M.position.set(-4.5,5.6,6),M.rotation.y=Math.PI/2,g.add(M),t.add(g);for(const[y,S]of[[-3,-4.5],[3,-4.5],[-3,4.5],[3,4.5],[0,-2],[0,2]]){const w=d.x+Math.cos(d.h)*y+Math.sin(d.h)*S,T=d.z-Math.sin(d.h)*y+Math.cos(d.h)*S;r.addSegment(w-.25,T,w+.25,T,"wall")}const _=d.x+Math.cos(d.h)*2,v=d.z-Math.sin(d.h)*2;this.places.push({kind:"gas",name:"Gasolinera",x:_,z:v,marker:ve(this,ca,yu).call(this,16747546,_,v)}),this.gasAt=[_,v]}if(this.forSale=[],u.shop){const d=u.shop,g=new zt;g.position.set(d.x,f.height(d.x,d.z),d.z),g.rotation.y=d.h;const x=Gs(9080725,.5,.4);ri(g,.3,5,.3,x,-6,2.5,-8),ri(g,.3,5,.3,x,6,2.5,-8);const m=po("CONCESIONARIO VALDE","#13324d","#f5c542",12,1.4);m.position.set(0,4.3,-8),g.add(m);const p=new Pe(16,20,8,10);p.rotateX(-Math.PI/2);const M=p.attributes.position;for(let v=0;v<M.count;v++){const y=M.getX(v),S=M.getZ(v);M.setY(v,f.height(d.x+Math.cos(d.h)*y+Math.sin(d.h)*S,d.z-Math.sin(d.h)*y+Math.cos(d.h)*S)-g.position.y+.07)}p.computeVertexNormals();const _=new xt(p,new wt({color:6053731,roughness:.95,polygonOffset:!0,polygonOffsetFactor:-2}));_.receiveShadow=!0,g.add(_),t.add(g),qx.forEach((v,y)=>{if(l.includes(v.kind))return;const S=-5+y*5,w=0,T=d.x+Math.cos(d.h)*S+Math.sin(d.h)*w,b=d.z-Math.sin(d.h)*S+Math.cos(d.h)*w,E=o(v.kind,v.color,T,b,d.h+Math.PI/2);E.forSale=v;const C=po(`${ds[v.kind].name} · ${v.price} €`,"#ffffff","#13324d",2.4,.5);C.position.set(T-Math.sin(d.h+Math.PI/2)*2.6,f.height(T,b)+1.1,b-Math.cos(d.h+Math.PI/2)*2.6),C.rotation.y=d.h+Math.PI/2,t.add(C),E.board=C,this.forSale.push(E)}),this.places.push({kind:"shop",name:"Concesionario",x:d.x,z:d.z,marker:null})}this.cool=0}get flags(){return this.places.map(t=>[t.x,t.z,t.kind])}tryBuy(t){var e,n,i;for(const r of this.forSale){if(!r.forSale||r.pos.distanceTo(t.pos)>3.2*r.s+1.5)continue;const o=r.forSale;return this.wallet.money<o.price?(this.toast("No te llega",`${ds[o.kind].name}: ${o.price} € · tienes ${this.wallet.money} €`),(e=this.sound)==null||e.call(this,"fail"),!0):(this.wallet.money-=o.price,r.forSale=null,r.owned=!0,this.scene.remove(r.board),this.toast(`🎉 ¡${ds[o.kind].name} comprado!`,`-${o.price} € · ya es tuyo, súbete con E / 🚪`),(n=this.sound)==null||n.call(this,"ok"),(i=this.onBuy)==null||i.call(this,r),!0)}return!1}update(t,e,n){const i=performance.now()/1e3;let r="";this.offer=null;for(const a of this.places)a.marker&&(a.marker.userData.col.material.opacity=.22+.1*Math.sin(i*3));const o=e?e.pos:n.pos;for(const a of this.forSale)a.forSale&&!e&&a.pos.distanceTo(n.pos)<3.2*a.s+1.5&&(r=`Comprar ${ds[a.forSale.kind].name.toLowerCase()} por ${a.forSale.price} € (E / 🚪)`);this.cool>0&&(this.cool-=t);for(const a of this.places)if(!(!a.marker||Math.hypot(o.x-a.x,o.z-a.z)>5)){if(!e){r="Ven en coche para repostar";continue}if(Math.abs(e.speed)>1.5){r="Para aquí";continue}if(a.kind==="gas"){if(e.fuel>.97){r="⛽ El depósito ya está lleno";continue}const c=Math.max(1,Math.ceil((1-e.fuel)*35));this.offer={id:"shop:gas",text:`⛽ Llenar el depósito por ${c} €`,go:()=>{var l,u;if(this.wallet.money<c){this.toast("⛽ No te llega",`Llenar cuesta ${c} €`),(l=this.sound)==null||l.call(this,"fail");return}this.wallet.money-=c,e.fuel=1,this.toast("⛽ Depósito lleno",`-${c} €`),(u=this.sound)==null||u.call(this,"ok")}}}}return r}}ca=new WeakSet,yu=function(t,e,n){const i=fn(t);return i.scale.set(.9,.35,.9),i.position.set(e,this.world.terrain.height(e,n),n),i.visible=!0,this.scene.add(i),i};const Su=s=>{let t=0,e=0;for(const n of s.p)t+=n[0],e+=n[1];return[t/s.p.length,e/s.p.length]};function lh(s,t,e=40){const[n,i]=Su(s);let r=null,o=e;for(const a of t)for(let h=0;h<a.p.length-1;h++){const c=a.p[h],l=a.p[h+1],u=l[0]-c[0],f=l[1]-c[1],d=u*u+f*f||1,g=Math.max(0,Math.min(1,((n-c[0])*u+(i-c[1])*f)/d)),x=c[0]+u*g,m=c[1]+f*g,p=Math.hypot(n-x,i-m);p<o&&(o=p,r=[x,m])}return r}class Yx{constructor({scene:t,world:e,data:n,center:i,drops:r,ui:o,toast:a,sound:h,wallet:c,personScale:l}){Object.assign(this,{scene:t,world:e,ui:o,toast:a,sound:h,wallet:c,drops:r,center:i});const u=n.roads.filter(m=>m.k!=="path"),f=m=>{const[p,M]=Su(m);return Math.hypot(p-i[0],M-i[1])},d=n.buildings.filter(m=>m.use==="agr"&&f(m)>220&&f(m)<(n.half||1e3)-150).sort((m,p)=>f(m)-f(p)),g=d[Math.min(d.length-1,2)];this.farm=g&&lh(g,u,60);const x=n.buildings.filter(m=>(m.use==="pub"||m.use==="res")&&m.id!==n.church&&f(m)<120).sort((m,p)=>(m.use==="pub"?0:1)-(p.use==="pub"?0:1)||f(m)-f(p));this.post=x[0]&&lh(x[0],u),this.dairy=[i[0]+6,i[1]-4],this.defs=[],this.farm&&this.defs.push({id:"leche",icon:"🥛",name:"La leche de la granja",at:this.farm,color:15921906,needsCar:!0}),this.post&&this.defs.push({id:"correo",icon:"✉️",name:"El correo",at:this.post,color:15769632,needsCar:!1}),this.defs.push({id:"taxi",icon:"🚕",name:"Taxi",at:null,color:3068415,needsCar:!0});for(const m of this.defs)m.marker=fn(m.color),m.marker.scale.set(1,.55,1),t.add(m.marker),m.at&&this.place(m.marker,m.at);this.dropM=fn(4706668,!0),t.add(this.dropM),this.fare=ki({shirt:9058922,pants:3159098,hair:10132122}),this.fare.scale.setScalar(l),this.fare.visible=!1,t.add(this.fare),this.state="idle",this.cool=0,this.taxiT=3,this.job=null}addNegocios(t){this.negocios=t||[];for(const e of this.negocios){const n={id:"neg",neg:e,icon:"📦",name:`Reparto de ${e.name}`,at:e.at,color:16757504,needsCar:!0};n.marker=fn(n.color),n.marker.scale.set(1,.55,1),this.scene.add(n.marker),this.place(n.marker,n.at),this.defs.push(n)}}goFar(t,e,n){var o;const i=(o=this.region)==null?void 0:o.route([n.x,n.z],t),r=i?i.reduce((a,h,c)=>c?a+Math.hypot(h[0]-i[c-1][0],h[1]-i[c-1][1]):0,0):Math.hypot(t[0]-n.x,t[1]-n.z)*1.3;return i&&(this.route=[...i,t]),this.destName=e,this.place(this.dropM,t),this.dropM.visible=!0,this.time=Math.round(45+r/11),this.fareDist=r,r}place(t,[e,n]){t.position.set(e,this.world.terrain.height(e,n),n),t.userData.at=[e,n]}get active(){return this.state!=="idle"}get target(){return this.state==="go"?this.dropM.userData.at:this.state==="pickup"?this.job.at:null}get flags(){return this.state==="idle"?this.defs.filter(t=>t.marker.visible).map(t=>[...t.marker.userData.at,t.id]):[]}newFare(t){const e=this.defs.find(a=>a.id==="taxi"),n=this.region&&Math.hypot(t.x-this.center[0],t.z-this.center[1])>1500,i=n?this.region.spotsNear(t.x,t.z,40,260):this.drops;if(n&&!i.length){this.taxiT=6;return}const r=i.filter(a=>{const h=Math.hypot(a[0]-t.x,a[1]-t.z);return h>40&&h<260}),o=r.length?r[Math.floor(Math.random()*r.length)]:this.drops[0];e.at=o,this.place(e.marker,o),this.fare.position.set(o[0]+1.6,this.world.terrain.height(o[0],o[1]),o[1]),this.fare.rotation.y=Math.random()*6}begin(t,e){if(this.job=t,this.state="go",this.earned=0,this.hits=0,t.id==="leche")this.left=1,this.toast("🥛 La leche de la granja","Lleva las cántaras a la cooperativa de la plaza sin darte golpes"),this.setDrop(this.dairy,e,3.5);else if(t.id==="correo")this.left=4,this.toast("✉️ El correo","Reparte 4 cartas por las casas, a pie o en coche"),this.nextLetter(e);else if(t.id==="neg"){this.left=1,this.destName=null,this.route=null;const n=t.neg,i=(this.negocios||[]).filter(r=>r!==n&&Math.hypot(r.at[0]-e.x,r.at[1]-e.z)>80&&Math.hypot(r.at[0]-e.x,r.at[1]-e.z)<9e3);if(i.length&&Math.random()<.6){const r=i[Math.floor(Math.random()*i.length)];Math.hypot(r.at[0]-e.x,r.at[1]-e.z)>700?this.goFar(r.at,r.name,e):(this.destName=r.name,this.setDrop(r.at,e,5),this.fareDist=Math.hypot(r.at[0]-e.x,r.at[1]-e.z)),this.toast(`📦 ${n.name}`,`Lleva este pedido a ${r.name} sin darte golpes`)}else{const o=(this.region&&Math.hypot(e.x-this.center[0],e.z-this.center[1])>1500?this.region.spotsNear(e.x,e.z,100,450):this.drops).filter(h=>{const c=Math.hypot(h[0]-e.x,h[1]-e.z);return c>100&&c<500}),a=o[Math.floor(Math.random()*o.length)]||this.drops[0];this.toast(`📦 ${n.name}`,"Lleva el pedido a la casa de la marca verde sin darte golpes"),this.setDrop(a,e,5),this.fareDist=Math.hypot(a[0]-e.x,a[1]-e.z)}}else{this.left=1,this.fare.visible=!1,this.destName=null,this.route=null;const n=(this.negocios||[]).filter(h=>{const c=Math.hypot(h.at[0]-e.x,h.at[1]-e.z);return c>200&&c<12e3});if(n.length&&Math.random()<.45){const h=n[Math.floor(Math.random()*n.length)],c=Math.hypot(h.at[0]-e.x,h.at[1]-e.z),l=c>700?this.goFar(h.at,h.name,e):(this.destName=h.name,this.setDrop(h.at,e,4.2),this.fareDist=c);this.toast("🚕 ¡Sube!",`Lléveme a ${h.icon} ${h.name}, por favor`+(l>1e3?` · ${(l/1e3).toFixed(1)} km`:"")),t.marker.visible=!1;return}const i=this.region,r=i==null?void 0:i.villageAt(e.x,e.z,1500),o=r&&!r.main,a=[];if(i&&(o||Math.random()<.7))for(const[h,c,l]of i.toVillages([e.x,e.z]))h!==r&&Math.hypot(h.c[0]-e.x,h.c[1]-e.z)>900&&l>1e3&&l<12e3&&a.push([h,c,l]);if(a.length){const h=a.map(([m])=>m.main?4:m.big?2:1),c=h.reduce((m,p)=>m+p,0);let l=Math.random()*c,u=0;for(;l>h[u];)l-=h[u++];const[f,d,g]=a[Math.min(u,a.length-1)],x=i.nodePos(f.node);this.destName=f.name,this.route=d.slice(),this.toast("🚕 ¡Sube!",`Lléveme a ${f.name}, por favor, que tengo prisa · ${(g/1e3).toFixed(1)} km`),this.place(this.dropM,x),this.dropM.visible=!0,this.time=Math.round(45+g/11),this.fareDist=g}else{const h=this.drops.filter(u=>Math.hypot(u[0]-e.x,u[1]-e.z)>150),c=o?i.spotsNear(e.x,e.z,150,450):[...h.slice(0,40),...this.extraDest||[]],l=c[Math.floor(Math.random()*c.length)]||this.drops[0];this.toast("🚕 ¡Sube!","Llévame a la marca verde, que tengo prisa"),this.setDrop(l,e,4.2),this.fareDist=Math.hypot(l[0]-e.x,l[1]-e.z)}}t.marker.visible=!1}setDrop(t,e,n){this.place(this.dropM,t),this.dropM.visible=!0,this.time=Math.round(20+Math.hypot(t[0]-e.x,t[1]-e.z)/n)}nextLetter(t){const e=this.drops.filter(([i,r])=>{const o=Math.hypot(i-t.x,r-t.z);return o>25&&o<160}),n=e.length?e:this.drops;this.setDrop(n[Math.floor(Math.random()*n.length)],t,3.2)}update(t,e,n){var l,u;const i=performance.now()/1e3;for(const f of[...this.defs.map(d=>d.marker),this.dropM])f.visible&&(f.userData.col.material.opacity=.22+.1*Math.sin(i*3));this.cool>0&&(this.cool-=t);const r=(l=this.busy)==null?void 0:l.call(this);if(this.hint="",this.offer=null,this.state==="idle"){this.defs.find(d=>d.id==="taxi").at||(this.taxiT-=t,this.taxiT<=0&&this.newFare(e));for(const d of this.defs){if(d.marker.visible=!!d.at&&this.cool<=0&&!r&&(d.id!=="neg"||Math.hypot(e.x-d.at[0],e.z-d.at[1])<700),d.id==="taxi"&&!(this.fareWalk>0)&&(this.fare.visible=d.marker.visible,this.fare.visible&&(this.fare.lookAt(e.x,this.fare.position.y,e.z),jn(this.fare,0,t))),!d.marker.visible)continue;const g=Math.hypot(e.x-d.at[0],e.z-d.at[1])<3.5;if(g&&d.needsCar&&!n){this.hint=`${d.icon} ${d.name}: necesitas un vehículo`;continue}if(g&&(!n||Math.abs(n.speed)<3)){const x={x:e.x,z:e.z};this.offer={id:`job:${d.id}`,text:`${d.icon} ${d.name}`,go:()=>this.begin(d,x)};break}}return}const o=this.job;if(this.time-=t,o.needsCar&&n&&(this._h0===void 0&&(this._h0=n.health),n.health<this._h0-2&&(this.hits++,this._h0=n.health,o.id==="leche"&&this.toast("🥛 ¡Cuidado!","Se ha derramado algo de leche: -10 €"),o.id==="taxi"&&this.toast("🚕 ¡Ay!","Al pasajero no le ha gustado el golpe"),o.id==="neg"&&this.toast("📦 ¡Cuidado!","Se ha roto algo del pedido: -5 €"))),o.needsCar&&!n){this.fail(o.id==="taxi"?"El pasajero se ha bajado enfadado":o.id==="neg"?"Has dejado el pedido tirado":"Has dejado la leche tirada");return}if(Math.hypot(e.x-this.dropM.userData.at[0],e.z-this.dropM.userData.at[1])<3.6&&(!n||Math.abs(n.speed)<4)){let f;if(o.id==="leche"?f=Math.max(15,70+Math.round(Math.max(0,this.time))-this.hits*10):o.id==="correo"?f=12+Math.max(0,Math.round(this.time/2)):o.id==="neg"?f=Math.round(18+Math.min(this.fareDist,1500)*.05+Math.max(0,this.fareDist-1500)*.025+Math.max(0,this.time)*.5-this.hits*5):f=Math.round(15+Math.min(this.fareDist,1500)*.06+Math.max(0,this.fareDist-1500)*.03+Math.max(0,this.time)*.6-this.hits*5),f=Math.max(5,f),this.wallet.money+=f,this.earned+=f,this.left--,(u=this.sound)==null||u.call(this,"ok"),this.left>0)this.toast(`+${f} €`,`Quedan ${this.left} cartas`),this.nextLetter(e);else{if(o.id==="taxi"){const[d,g]=this.dropM.userData.at;this.fare.position.set(d+1.5,this.world.terrain.height(d,g),g),this.fare.visible=!0,this.fareWalk=5}this.toast(o.id==="taxi"?this.destName?`🚕 ¡Ya estamos en ${this.destName}!`:"🚕 Carrera completada":o.id==="neg"?this.destName?`📦 Pedido entregado en ${this.destName}`:"📦 Pedido entregado":"¡Trabajo hecho!",`Has ganado ${this.earned} €`),this.finish()}}else this.time<=0&&this.fail(o.id==="leche"?"La leche se ha calentado":o.id==="taxi"?"El pasajero ha llegado tarde y no te paga":o.id==="neg"?"El pedido ha llegado tarde":"Se acabó el tiempo del reparto");if(this.route){const f=this.route;let d=0;for(let g=0;g<Math.min(f.length,30);g++)Math.hypot(f[g][0]-e.x,f[g][1]-e.z)<30&&(d=g);d&&f.splice(0,d)}const a=this.destName?` a ${this.destName} · ${(Math.hypot(this.dropM.userData.at[0]-e.x,this.dropM.userData.at[1]-e.z)/1e3).toFixed(1)} km`:"",c=`${o.id==="correo"?`✉️ Carta ${5-this.left}/4`:`${o.icon} ${o.id==="taxi"?"Lleva al pasajero"+a:o.id==="neg"?"Lleva el pedido"+a:"A la cooperativa"}`} · <b class="${this.time<10?"late":""}">${Math.max(0,Math.ceil(this.time))} s</b>`;this.ui.mission.innerHTML!==c&&(this.ui.mission.innerHTML=c)}tick(t){if(this.fareWalk>0){this.fareWalk-=t;const e=this.fare;e.position.x+=Math.sin(e.rotation.y)*t*1.2,e.position.z+=Math.cos(e.rotation.y)*t*1.2,e.position.y=this.world.terrain.height(e.position.x,e.position.z),jn(e,1.2,t),this.fareWalk<=0&&(e.visible=!1)}}fail(t){var e;this.toast("Trabajo fallido",t),(e=this.sound)==null||e.call(this,"fail"),this.finish()}finish(){const t=this.job;this.state="idle",this.dropM.visible=!1,this.route=null,this.destName=null,this.cool=5,this._h0=void 0,this.ui.mission.innerHTML="",t.id==="taxi"&&(t.at=null,this.taxiT=8),this.job=null}}const ch=[[6958638,2830656],[3100527,3815994],[4876858,2763312],[9071162,3159098],[5583718,2236962],[11176004,3813926]];function mo(s,t,e){const[n,i]=ch[s%ch.length],r=ki({shirt:n,pants:i,hair:e??[10132122,2760214,14211288,5913120][s%4]});return r.scale.setScalar(t),r}function jx(s){const t=s.userData.parts;t.hips.position.y=.5,t.lHip.rotation.x=t.rHip.rotation.x=-1.45,t.lKnee.rotation.x=t.rKnee.rotation.x=1.45,t.lShoulder.rotation.x=t.rShoulder.rotation.x=-.35,t.lElbow.rotation.x=t.rElbow.rotation.x=-.9,t.torso.rotation.x=-.05}class Zx{constructor({scene:t,world:e,data:n,center:i,isMobile:r,ambient:o}){Object.assign(this,{scene:t,world:e,ambient:o});const a=e.terrain,h=e.personScale,c=n.plaza||{};this.center=i,this.sitters=[],(c.benches||[]).slice(0,r?3:5).forEach(([E,C,I],F)=>{const A=Re.degToRad(I),L=Math.atan2(Math.sin(A),-Math.cos(A)),N=mo(F,h);jx(N);const z=Math.sin(L),O=Math.cos(L),H=F%2?.45:-.45;N.position.set(E+z*.05+Math.cos(L)*H,a.height(E,C)-.08,C+O*.05-Math.sin(L)*H),N.rotation.y=L,t.add(N),this.sitters.push(N)}),this.party=new zt,this.party.visible=!1,t.add(this.party);const[l,u]=i,f=a.height(l,u),d=new xt(new ce(.08,.1,6.5,8),new wt({color:5913894}));d.position.set(l,f+3.25,u),this.party.add(d);const g=[],x=[];for(let E=0;E<8;E++){const C=E/8*Math.PI*2+.3,I=e.colliders.nearest(l+Math.cos(C)*12,u+Math.sin(C)*12,14);x.push(I?[I.x,I.z]:[l+Math.cos(C)*14,u+Math.sin(C)*14])}const m=new ur({color:2236962});for(const[E,C]of x){const I=[],F=Math.hypot(E-l,C-u),A=Math.max(6,Math.round(F/1.2));for(let L=0;L<=A;L++){const N=L/A,z=l+(E-l)*N,O=u+(C-u)*N,H=f+6.3-(6.3-4.2)*N-Math.sin(N*Math.PI)*.9;I.push(new U(z,H,O)),L>0&&L<A&&g.push([z,H-.12,O])}this.party.add(new Ko(new de().setFromPoints(I),m))}const p=[16728128,16764992,4259680,4235519,16736511],M=new $e(new ke(.09,6,4),new Je({color:16777215}),g.length),_=new se,v=new Wt;g.forEach((E,C)=>{_.makeTranslation(...E),M.setMatrixAt(C,_),M.setColorAt(C,v.setHex(p[C%p.length]))}),this.party.add(M),this.bulbs=M,this.glow=new ou(16760960,0,45,1.2),this.glow.position.set(l,f+5,u),this.party.add(this.glow);const y=x[0],S=l+(y[0]-l)*.7,w=u+(y[1]-u)*.7,T=Math.atan2(l-S,u-w),b=new xt(new Qt(4,.5,2.5),new wt({color:6965802,roughness:.9}));b.position.set(S,a.height(S,w)+.25,w),b.rotation.y=T,this.party.add(b),this.musicians=[];for(let E=0;E<3;E++){const C=mo(E+2,h,1710618),I=(E-1)*1.1;C.position.set(S+Math.cos(T)*I,a.height(S,w)+.5,w-Math.sin(T)*I),C.rotation.y=T;const F=new xt(E===1?new Qt(.4,.3,.2):new ce(.15,.15,.3,10),new wt({color:E===1?9051164:14205040,metalness:.4}));F.position.set(0,1,.2),C.add(F),this.party.add(C),this.musicians.push(C)}this.dancers=[];for(let E=0;E<(r?6:12);E++){const C=mo(E,h);this.party.add(C),this.dancers.push({m:C,a:E/(r?6:12)*Math.PI*2,r:4+E%3*1.5,ph:Math.random()*6})}this.fw=[],this.fwT=0,this.on=!1,this.announced=-1}isParty(t){const e=t.hour;return t.day%3===0&&e>=20.5||(t.day-1)%3===0&&e<3}update(t,e,n,i){const r=this.isParty(e),o=e.hour;r&&this.announced!==e.day&&o>=20.5&&(this.announced=e.day,i==null||i("🎉 ¡Hoy hay verbena!","Música y baile en la plaza, y fuegos artificiales a medianoche"));const a=Math.hypot(n.x-this.center[0],n.z-this.center[1]);this.party.visible=r&&a<400;for(const h of this.sitters)h.visible=!r&&o>9&&o<21&&a<250;if(this.musicLevel=r?Math.max(0,1-a/180):0,this.party.visible){const h=performance.now()/1e3;this.glow.intensity=30*e.n;for(const[l,u]of this.musicians.entries())u.rotation.z=Math.sin(h*3+l)*.05,jn(u,0,t),u.userData.parts.lShoulder.rotation.x=-1.2+Math.sin(h*8+l)*.2,u.userData.parts.rShoulder.rotation.x=-1.2-Math.sin(h*8+l)*.2;const c=this.world.terrain;for(const l of this.dancers){l.a+=t*.35;const u=this.center[0]+Math.cos(l.a)*l.r,f=this.center[1]+Math.sin(l.a)*l.r;l.m.position.set(u,c.height(u,f)+Math.abs(Math.sin(h*4.7+l.ph))*.08,f),l.m.rotation.y=l.a+Math.PI+Math.sin(h*2+l.ph)*.6,jn(l.m,1.1,t);const d=l.m.userData.parts;d.lShoulder.rotation.z=-1.2-Math.sin(h*4+l.ph)*.4,d.rShoulder.rotation.z=1.2+Math.sin(h*4+l.ph)*.4}o<.34&&o>=0&&(this.fwT-=t,this.fwT<=0&&(this.fwT=.6+Math.random()*1.2,this.launch()))}for(const h of[...this.fw])if(h.t+=t,!h.burst)h.p.addScaledVector(h.v,t),h.v.y-=9.8*t,h.trail.position.copy(h.p),h.v.y<2&&this.explode(h);else{const c=h.pts.geometry.attributes.position;for(let l=0;l<c.count;l++)h.vel[l*3+1]-=3*t,c.setXYZ(l,c.getX(l)+h.vel[l*3]*t,c.getY(l)+h.vel[l*3+1]*t,c.getZ(l)+h.vel[l*3+2]*t);c.needsUpdate=!0,h.pts.material.opacity=Math.max(0,1-h.t/2.2),h.t>2.2&&(this.scene.remove(h.pts),h.pts.geometry.dispose(),this.fw.splice(this.fw.indexOf(h),1))}}launch(){var o;const[t,e]=this.center,n=this.world.terrain.height(t,e),i=new xt(new ke(.15,6,4),new Je({color:16769184})),r=new U(t+(Math.random()-.5)*30,n+2,e-40+(Math.random()-.5)*30);this.scene.add(i),this.fw.push({p:r,v:new U((Math.random()-.5)*4,30+Math.random()*8,(Math.random()-.5)*4),trail:i,t:0}),(o=this.ambient)!=null&&o.ready&&this.ambient.whistle(.15,r.x,r.z)}explode(t){var o;this.scene.remove(t.trail),t.burst=!0,t.t=0;const e=140,n=new Float32Array(e*3);t.vel=new Float32Array(e*3);for(let a=0;a<e;a++){n.set([t.p.x,t.p.y,t.p.z],a*3);const h=Math.random()*2-1,c=Math.random()*Math.PI*2,l=Math.sqrt(1-h*h),u=9+Math.random()*3;t.vel.set([l*Math.cos(c)*u,h*u,l*Math.sin(c)*u],a*3)}const i=new de;i.setAttribute("position",new Ee(n,3));const r=[16728128,16764992,4259712,6332671,16736511,16777215][Math.random()*6|0];t.pts=new Qo(i,new Jo({color:r,size:.7,transparent:!0,blending:Ii,depthWrite:!1,fog:!1})),t.pts.frustumCulled=!1,this.scene.add(t.pts),(o=this.ambient)!=null&&o.ready&&this.ambient.pop(.3,t.p.x,t.p.z)}}const gn=(s,t=.85,e=0,n=0)=>new wt({color:s,roughness:t,metalness:e,emissive:s,emissiveIntensity:n});function nn(s,t,e,n,i,r,o,a,h=0){const c=new xt(new Qt(t,e,n),i);return c.position.set(r,o,a),c.rotation.y=h,c.receiveShadow=!0,s.add(c),c}function Hs(s,t,e){const n=document.createElement("canvas");n.width=s,n.height=t,e(n.getContext("2d"),s,t);const i=new Sn(n);return i.colorSpace=Me,i}function hh(s,t,e,n,i,r,o,a,h,c){const l=new xt(new Pe(i,r),h);l.rotation.x=-Math.PI/2,l.position.set(e,.01,n),l.receiveShadow=!0,s.add(l);const u=new xt(new Pe(i,r),c);u.rotation.x=Math.PI/2,u.position.set(e,o,n),s.add(u);for(const[f,d,g,x]of[[e,n-r/2,i,0],[e,n+r/2,i,Math.PI],[e-i/2,n,r,Math.PI/2],[e+i/2,n,r,-Math.PI/2]]){const m=new xt(new Pe(g,o),a);m.position.set(f,o/2,d),m.rotation.y=x,s.add(m)}t.addSegment(e-i/2,n-r/2,e+i/2,n-r/2,"wall"),t.addSegment(e-i/2,n+r/2,e+i/2,n+r/2,"wall"),t.addSegment(e-i/2,n-r/2,e-i/2,n+r/2,"wall"),t.addSegment(e+i/2,n-r/2,e+i/2,n+r/2,"wall")}function go(s,t,e=!1){const n=ki(s);if(n.scale.setScalar(t),e){const i=n.userData.parts;i.hips.position.y=.48,i.lHip.rotation.x=i.rHip.rotation.x=-1.45,i.lKnee.rotation.x=i.rKnee.rotation.x=1.45,i.lElbow.rotation.x=i.rElbow.rotation.x=-1}return n}var hr,Bo;class Kx{constructor({scene:t,world:e,data:n,center:i,tex:r,bellTower:o}){Gi(this,hr);var _;Object.assign(this,{scene:t,world:e});const a=e.colliders,h=e.personScale,c=(n.half||1e3)+600;this.rooms=[],this.inside=null,this.cool=0;const l=new zt;t.add(l),this.group=l;const u=v=>{let y=0,S=0;for(const w of v.p)y+=w[0],S+=w[1];return[y/v.p.length,S/v.p.length]},f=v=>{const[y,S]=u(v);let w=null,T=1/0;for(const E of n.roads)if(E.k!=="track"&&E.k!=="path")for(const C of E.p){const I=Math.hypot(C[0]-y,C[1]-S);I<T&&(T=I,w=C)}if(!w)return null;const b=a.nearest(w[0]+(y-w[0])*.5,w[1]+(S-w[1])*.5,30);return b?[b.x+b.nx*1.3,b.z+b.nz*1.3,Math.atan2(b.nx,b.nz)]:null},d=n.buildings.find(v=>v.id===n.church),g=d&&f(d);if(g){const v=c,y=0,S=10,w=24,T=9,b=new wt({map:r.ashlar,color:14208960,roughness:.95,emissive:2762272,emissiveIntensity:.6});r.ashlar.wrapS=r.ashlar.wrapT=Ms,hh(l,a,v,y,S,w,T,b,gn(7234135,.9,0,.25),gn(4863526,.9,0,.3));const E=gn(5913122,.7,0,.25);for(let L=0;L<7;L++)for(const N of[-1,1]){const z=y-6+L*2.1,O=v+N*2.4;nn(l,3.2,.1,.5,E,O,.48,z),nn(l,3.2,.6,.08,E,O,.8,z+.28),nn(l,.08,.5,.5,E,O-1.55,.25,z),nn(l,.08,.5,.5,E,O+1.55,.25,z),a.addSegment(O-1.6,z,O+1.6,z,"wall")}nn(l,S,.4,5,gn(9075304,.8,0,.3),v,.2,y-w/2+2.5),nn(l,2.4,1,1,gn(15261904,.6,0,.3),v,.9,y-w/2+3.2);const C=Hs(512,640,(L,N,z)=>{const O=L.createLinearGradient(0,0,N,z);O.addColorStop(0,"#b88a2a"),O.addColorStop(.5,"#f0cc60"),O.addColorStop(1,"#a07020"),L.fillStyle=O,L.fillRect(0,0,N,z),L.strokeStyle="#5a3a10",L.lineWidth=8;for(let H=0;H<3;H++)for(let V=0;V<3;V++)L.strokeRect(20+H*160,20+V*200,150,190),L.fillStyle=["#3a5a8a","#8a2a2a","#2a5a3a"][(H+V)%3],L.fillRect(45+H*160,50+V*200,100,130)}),I=new xt(new Pe(6,7.5),new wt({map:C,metalness:.6,roughness:.35,emissive:8413216,emissiveIntensity:.35}));I.position.set(v,4.4,y-w/2+.05),l.add(I);const F=new Je({color:16765040});for(const L of[-.9,-.5,.5,.9]){nn(l,.06,.4,.06,gn(16052448,.5,0,.4),v+L,1.6,y-w/2+3.2);const N=new xt(new ke(.035,6,4),F);N.position.set(v+L,1.84,y-w/2+3.2),l.add(N)}const A=Hs(64,128,(L,N,z)=>{for(let O=0;O<24;O++)L.fillStyle=["#c03030","#3050c0","#e0c040","#30a050"][O%4],L.fillRect(O%4*16,(O/4|0)*22,16,22)});for(const L of[-1,1])for(const N of[-4,3]){const z=new xt(new Pe(1.1,2.6),new Je({map:A}));z.position.set(v+L*(S/2-.02),5.5,y+N),z.rotation.y=-L*Math.PI/2,l.add(z)}for(const[L,N]of[[v-2,y-6],[v+2.6,y-1.8]]){const z=go({shirt:1710618,pants:1710618,hair:11579568},h,!0);z.position.set(L,.02,N-.1),z.rotation.y=Math.PI,l.add(z)}ve(this,hr,Bo).call(this,"Iglesia","⛪",g,[v,y+w/2-1.5,Math.PI],[v-S/2,y-w/2,v+S/2,y+w/2],null)}const x=(_=n.buildings.filter(v=>v.use==="res"&&v.id!==n.church).map(v=>[v,Math.hypot(u(v)[0]-i[0],u(v)[1]-i[1])]).sort((v,y)=>v[1]-y[1])[0])==null?void 0:_[0],m=x&&f(x);if(m){const v=c+60,y=0,S=9,w=12,T=3.4,b=Hs(256,256,(G,Y,W)=>{for(let $=0;$<8;$++)for(let it=0;it<8;it++)G.fillStyle=($+it)%2?"#b8a890":"#7a6650",G.fillRect($*32,it*32,32,32)});b.wrapS=b.wrapT=Ms,b.repeat.set(4,5);const E=Hs(256,256,(G,Y,W)=>{G.fillStyle="#e8dcc0",G.fillRect(0,0,Y,W),G.fillStyle="#2f6a4a",G.fillRect(0,W*.62,Y,W*.38),G.fillStyle="#1e4a32",G.fillRect(0,W*.6,Y,6)});hh(l,a,v,y,S,w,T,new wt({map:E,roughness:.9,emissive:3156512,emissiveIntensity:.6}),new wt({map:b,roughness:.6,emissive:2103828,emissiveIntensity:.6}),gn(14209216,.9,0,.5));const C=gn(6963234,.6,0,.3),I=gn(11186357,.3,.8,.2);nn(l,6,1.05,.7,C,v,.52,y-w/2+2.2),nn(l,6.1,.06,.8,gn(2763306,.3,.2,.2),v,1.07,y-w/2+2.2),a.addSegment(v-3,y-w/2+2.2,v+3,y-w/2+2.2,"wall"),nn(l,6,2.2,.35,C,v,1.5,y-w/2+.2);const F=[2779690,9067034,14209200,5904922,1718890,12623936];for(let G=0;G<30;G++){const Y=new xt(new ce(.04,.045,.28,8),gn(F[G%6],.15,.2,.3));Y.position.set(v-2.7+G%15*.38,1.2+(G/15|0)*.55,y-w/2+.3),l.add(Y)}for(let G=0;G<4;G++){const Y=v-2.2+G*1.45,W=y-w/2+2.9;nn(l,.05,.75,.05,I,Y,.38,W);const $=new xt(new ce(.2,.2,.06,12),gn(9051164,.6,0,.3));$.position.set(Y,.78,W),l.add($)}for(const[G,Y]of[[v-2.5,y+1.5],[v+2.5,y+1.5],[v-2.5,y+4.2],[v+2.5,y+4.2]]){nn(l,1,.05,1,C,G,.75,Y),nn(l,.08,.75,.08,I,G,.37,Y);for(const W of[-1,1])nn(l,.42,.05,.42,C,G+W*.75,.45,Y),nn(l,.42,.5,.05,C,G+W*.95,.7,Y);a.addSegment(G-.55,Y,G+.55,Y,"wall")}const A=Hs(256,144,(G,Y,W)=>{G.fillStyle="#2a8a3a",G.fillRect(0,0,Y,W),G.strokeStyle="#fff",G.lineWidth=3,G.strokeRect(10,10,Y-20,W-20),G.beginPath(),G.moveTo(Y/2,10),G.lineTo(Y/2,W-10),G.stroke(),G.beginPath(),G.arc(Y/2,W/2,20,0,7),G.stroke(),G.fillStyle="#000",G.fillRect(0,0,90,22),G.fillStyle="#fff",G.font="bold 15px sans-serif",G.fillText("ZAM 1 - 0",6,16)}),L=new xt(new Pe(1.4,.8),new Je({map:A}));L.position.set(v+S/2-.05,2.4,y),L.rotation.y=-Math.PI/2,l.add(L);const N=new xt(new Pe(3,.5),new Je({map:lr("BAR LA PLAZA","#1e4a32","#f5c542")}));N.position.set(v,2.95,y-w/2+.4),l.add(N),this.barman=go({shirt:15790320,pants:1710618,hair:2760214},h),this.barman.position.set(v+.5,.02,y-w/2+1.3),l.add(this.barman);for(const[G,Y,W]of[[v-3.25,y+1.5,Math.PI/2],[v+1.75,y+4.2,Math.PI/2],[v+3.25,y+4.2,-Math.PI/2]]){const $=go({shirt:[6958638,3100527,4876858][Math.random()*3|0],hair:9079434},h,!0);$.position.set(G,.02,Y),$.rotation.y=W,l.add($)}this.counter=[v,y-w/2+3.1];const z=new xt(new Pe(2.2,.45),new wt({map:lr("BAR","#1e4a32","#f5c542",256,52),emissive:16777215,emissiveIntensity:.1})),[O,H,V]=m;z.position.set(O-Math.sin(V)*1.25,e.terrain.height(O,H)+3.1,H-Math.cos(V)*1.25),z.rotation.y=V,t.add(z),ve(this,hr,Bo).call(this,"Bar","🍷",m,[v,y+w/2-1.2,Math.PI],[v-S/2,y-w/2,v+S/2,y+w/2],"bar")}const p=e.terrain,M=p.height.bind(p);p.height=(v,y)=>{for(const S of this.rooms){const w=S.box;if(v>w[0]-2&&v<w[2]+2&&y>w[1]-2&&y<w[3]+2)return 0}return M(v,y)}}update(t,e,n,i){var o;if(this.cool>0&&(this.cool-=t),this.hint="",this.barman&&jn(this.barman,0,t),n||this.cool>0)return null;const r=e.pos;for(const a of this.rooms){if(!this.inside&&Math.hypot(r.x-a.door[0],r.z-a.door[1])<1.3)return this.inside=a,this.cool=1.5,{enter:a};if(this.inside===a&&Math.hypot(r.x-a.spawn[0],r.z-(a.spawn[1]+.6))<1)return this.inside=null,this.cool=1.5,{exit:a}}return((o=this.inside)==null?void 0:o.kind)==="bar"&&Math.hypot(r.x-this.counter[0],r.z-this.counter[1])<1.6&&(this.hint="Pide algo en la barra (E / 🚪)"),null}get flags(){return this.rooms.map(t=>[t.door[0],t.door[1],t.kind||"church"])}}hr=new WeakSet,Bo=function(t,e,n,i,r,o){const a=fn(16777215);a.scale.set(.55,.08,.55),a.position.set(n[0],this.world.terrain.height(n[0],n[1]),n[1]),a.visible=!0,this.scene.add(a);const h=fn(16777215);h.scale.set(.55,.08,.55),h.position.set(i[0],0,i[1]+.6),h.visible=!0,this.scene.add(h),this.rooms.push({name:t,icon:e,door:n,spawn:i,box:r,kind:o,out:a,inn:h})};const ai=2e3;class Jx{constructor({data:t,terrain:e,tex:n,colliders:i,ortho:r,scene:o,base:a}){Object.assign(this,{data:t,terrain:e,tex:n,colliders:i,scene:o,base:a,ortho:r}),this.group=new zt,o.add(this.group),this.shared=new Map,this.surfaces=[],this.U=null,this.places=t.places||[];const h=t.terrain,c=h.n,l=h.cell,u=h.origin[0],f=h.edge,d=e.o.h,g=32;if(this.mid=null,t.mid){const v=document.createElement("canvas");v.width=v.height=2048;const y=new Sn(v);y.colorSpace=Me,y.anisotropy=8,this.mid={cv:v,g:v.getContext("2d"),tex:{value:y},bounds:{value:new fe(9e5,9e5,900001,900001)},key:null,imgs:new Map}}const x=pu(r,r,t.ortho.bounds,[9e5,9e5,900001,900001],n,null,null,this.mid);this.terrainMat=x,this.surfaces.push(x),this.chunks=[];const m=(v,y)=>d[Math.min(c-1,Math.max(0,y))*c+Math.min(c-1,Math.max(0,v))];for(let v=0;v<c-1;v+=g)for(let y=0;y<c-1;y+=g){const S=Math.min(g,c-1-y)+1,w=Math.min(g,c-1-v)+1,T=new Float32Array(S*w*3),b=new Float32Array(S*w*3),E=[];for(let F=0;F<w;F++)for(let A=0;A<S;A++){const L=y+A,N=v+F,z=(F*S+A)*3;T[z]=u+L*l,T[z+1]=m(L,N),T[z+2]=u+N*l;const O=m(L-1,N)-m(L+1,N),H=m(L,N-1)-m(L,N+1),V=2*l,G=Math.hypot(O,V,H);b[z]=O/G,b[z+1]=V/G,b[z+2]=H/G}for(let F=0;F<w-1;F++)for(let A=0;A<S-1;A++){const L=u+(y+A+.5)*l,N=u+(v+F+.5)*l;if(Math.abs(L)<f&&Math.abs(N)<f)continue;const z=F*S+A,O=z+1,H=z+S,V=H+1;E.push(z,H,O,O,H,V)}if(!E.length)continue;const C=new de;C.setAttribute("position",new Ee(T,3)),C.setAttribute("normal",new Ee(b,3)),C.setAttribute("uv",new Ee(new Float32Array(S*w*2),2)),C.setIndex(E),C.computeBoundingSphere(),C.computeBoundingBox();const I=new xt(C,x);I.receiveShadow=!0,this.group.add(I),this.chunks.push({obj:I,box:C.boundingBox})}this.tiles=new Map;const p=(v,y)=>{const S=`${Math.floor(v/ai)},${Math.floor(y/ai)}`;return this.tiles.has(S)||this.tiles.set(S,{k:S,roads:[],b:[],trees:[],built:!1,obj:null,cx:(Math.floor(v/ai)+.5)*ai,cz:(Math.floor(y/ai)+.5)*ai}),this.tiles.get(S)};mu(t.roads),this.group.add(gu(t.roads,e,n,i)),this.waterMat=new wt({color:3494490,roughness:.12,metalness:.25,transparent:!0,opacity:.9,polygonOffset:!0,polygonOffsetFactor:-3}),this.ponds=[];const M=t.water||{polys:[],rivers:[]},_=[];for(const v of M.polys){const y=[];for(let F=0;F<v.p.length;F++){const A=v.p[F],L=v.p[(F+1)%v.p.length],N=Math.max(1,Math.ceil(Math.hypot(L[0]-A[0],L[1]-A[1])/10));for(let z=0;z<N;z++)y.push(e.ground(A[0]+(L[0]-A[0])*z/N,A[1]+(L[1]-A[1])*z/N))}y.sort((F,A)=>F-A);const S=y[Math.floor(y.length*.1)]+.35,w=new fr(v.p.map(F=>new ut(F[0],-F[1])));for(const F of v.h||[])w.holes.push(new nr(F.map(A=>new ut(A[0],-A[1]))));const T=new rl(w);T.rotateX(-Math.PI/2),T.translate(0,S,0),_.push(T);let b=1/0,E=-1/0,C=1/0,I=-1/0;for(const[F,A]of v.p)b=Math.min(b,F),E=Math.max(E,F),C=Math.min(C,A),I=Math.max(I,A);this.ponds.push({p:v.p,y:S,x0:b,x1:E,z0:C,z1:I})}for(const v of _){const y=new xt(v,this.waterMat);y.receiveShadow=!0,this.group.add(y)}for(const v of t.roads){let y=null,S=null;for(let w=0;w<v.p.length-1;w++){const T=v.p[w],b=v.p[w+1],E=p((T[0]+b[0])/2,(T[1]+b[1])/2);E!==S&&(y={...v,p:[T]},S=E,E.roads.push(y)),y.p.push(b)}}for(const v of M.rivers){let y=null,S=null;for(let w=0;w<v.p.length-1;w++){const T=v.p[w],b=v.p[w+1],E=p((T[0]+b[0])/2,(T[1]+b[1])/2);E!==S&&(y={...v,p:[T]},S=E,(E.rivers=E.rivers||[]).push(y)),y.p.push(b)}}for(const v of t.groups)for(const y of v.b){const S=y.p[0];p(S[0],S[1]).b.push(y)}for(const v of t.trees)p(v[0],v[1]).trees.push(v);this.crown=Uo(0,3),this.trunk=new ce(.16,.26,1.6,5),this.trunk.translate(0,.8,0),this.leafMat=new wt({map:n.leaves,color:10135684,roughness:.95,flatShading:!0}),this.barkMat=new wt({map:n.bark,roughness:1}),this.queue=[]}riverMesh(t){const e=[],n=[];for(const a of t){const h=[];for(let l=0;l<a.p.length-1;l++){const u=a.p[l],f=a.p[l+1],d=Math.max(1,Math.ceil(Math.hypot(f[0]-u[0],f[1]-u[1])/8));for(let g=0;g<d;g++)h.push([u[0]+(f[0]-u[0])*g/d,u[1]+(f[1]-u[1])*g/d])}h.push(a.p[a.p.length-1]);const c=a.w/2;h.forEach((l,u)=>{const f=h[Math.max(0,u-1)],d=h[Math.min(h.length-1,u+1)],g=d[0]-f[0],x=d[1]-f[1],m=Math.hypot(g,x)||1,p=-x/m,M=g/m,_=Math.min(this.terrain.ground(l[0]+p*c,l[1]+M*c),this.terrain.ground(l[0]-p*c,l[1]-M*c),this.terrain.ground(l[0],l[1]))+.25,v=e.length/3;e.push(l[0]+p*c,_,l[1]+M*c,l[0]-p*c,_,l[1]-M*c),u&&n.push(v-2,v,v-1,v-1,v,v+1)})}const i=new de;i.setAttribute("position",new te(e,3)),i.setIndex(n),i.computeVertexNormals();const r=i.attributes.normal;for(let a=0;a<r.count;a++)r.setXYZ(a,0,1,0);const o=new xt(i,this.riverMat||(this.riverMat=this.waterMat.clone()));return this.riverMat.side=be,o}waterAt(t,e){for(const n of this.ponds){if(t<n.x0||t>n.x1||e<n.z0||e>n.z1)continue;let i=!1;const r=n.p;for(let o=0,a=r.length-1;o<r.length;a=o++)r[o][1]>e!=r[a][1]>e&&t<(r[a][0]-r[o][0])*(e-r[o][1])/(r[a][1]-r[o][1])+r[o][0]&&(i=!i);if(i)return n.y}return null}detail(t){const e=this.data.detail||[];let n=null,i=1600;for(const r of e){const o=Math.hypot(r.c[0]-t.x,r.c[1]-t.z);o<i&&(i=o,n=r)}!n||n===this.curDetail||this.loadingDetail||(this.loadingDetail=!0,new au().load(this.base+n.file,r=>{r.colorSpace=Me,r.anisotropy=8,this.loadingDetail=!1;const o=this.terrainMat.userData;if(!o.tC){r.dispose(),this.curDetail=null;return}const a=this.curDetail&&o.tC.value;o.tC.value=r,o.cB.value.set(...n.bounds),a&&a!==this.ortho&&a.dispose(),this.curDetail=n},void 0,()=>{this.loadingDetail=!1,this.curDetail=n}))}midUpdate(t){const e=this.mid,n=this.data.mid;if(!e)return;const i=n.tile,r=Math.round((t.x-n.x0)/i),o=Math.round((t.z-n.z0)/i),a=`${r},${o}`;if(a===e.key||e.busy)return;e.busy=!0;const h=[];for(const[l,u]of[[-1,-1],[0,-1],[-1,0],[0,0]]){const f=r+l,d=o+u;h.push([f,d,f>=0&&d>=0&&f<n.n&&d<n.n?this.base+n.file.replace("{i}",f).replace("{j}",d):null])}const c=l=>{if(!l)return Promise.resolve(null);if(e.imgs.has(l))return e.imgs.get(l);const u=new Promise(f=>{const d=new Image;d.crossOrigin="anonymous",d.onload=()=>f(d),d.onerror=()=>f(null),d.src=l});return e.imgs.set(l,u),e.imgs.size>12&&e.imgs.delete(e.imgs.keys().next().value),u};Promise.all(h.map(l=>c(l[2]))).then(l=>{e.busy=!1;const u=e.g;u.clearRect(0,0,2048,2048),l.forEach((g,x)=>{g&&u.drawImage(g,x%2*1024,(x>>1)*1024,1024,1024)});const f=n.x0+(r-1)*i,d=n.z0+(o-1)*i;e.bounds.value.set(f,d+2*i,f+2*i,d),e.tex.value.needsUpdate=!0,e.key=a})}setWeather(t){this.U=t;for(const e of this.surfaces)ko(e,t)}share(t){t.traverse(e=>{var a,h;if(!e.isMesh)return;const n=e.material,i=`${n.type}|${((a=n.map)==null?void 0:a.uuid)||""}|${(h=n.color)==null?void 0:h.getHex()}|${n.side}|${n.transparent}|${e.isInstancedMesh}`;if(this.shared.has(i)){n!==this.shared.get(i)&&n.dispose(),e.material=this.shared.get(i);return}this.shared.set(i,n);const r=this.tex;n.map&&(n.map===r.roof||n.map===r.flatRoof||n.map===r.asphalt||n.map===r.concrete||n.map===r.dirt)&&(this.surfaces.push(n),this.U&&ko(n,this.U))})}build(t){this.colliders.record(!0);const e=new zt;if(t.roads.length&&e.add(du({roads:t.roads,style:"rural",step:6,lift:.14},this.terrain,this.tex,null)),t.rivers&&e.add(this.riverMesh(t.rivers)),t.b.length&&e.add(fu({buildings:t.b,style:"rural"},this.terrain,this.tex,this.colliders)),t.trees.length){const n=t.trees.length,i=new $e(this.crown,this.leafMat,n),r=new $e(this.trunk,this.barkMat,n),o=new se,a=new yn,h=new U,c=new U,l=new Wt,u=new U(0,1,0);t.trees.forEach(([f,d,g],x)=>{const m=this.terrain.height(f,d);a.setFromAxisAngle(u,(f*13.37+d*7.1)%6.28),h.set(g*1.2,g,g*1.2),c.set(f,m-.1,d),o.compose(c,a,h),r.setMatrixAt(x,o),h.set(g*2.9,g*1.7,g*2.9),c.set(f,m+g*2.3,d),o.compose(c,a,h),i.setMatrixAt(x,o),l.setHSL(.2+((f*3.1+d)%1+1)%1*.06,.22,.4+((f+d*2.3)%1+1)%1*.12),i.setColorAt(x,l);const p=.35*g;this.colliders.addSegment(f-p,d,f+p,d,"tree"),this.colliders.addSegment(f,d-p,f,d+p,"tree")}),i.computeBoundingSphere(),r.computeBoundingSphere(),i.castShadow=!0,e.add(r,i)}this.share(e),t.cols=this.colliders.record(!1),t.obj=e,t.built=!0,this.group.add(e)}free(t){this.group.remove(t.obj),t.obj.traverse(e=>{var n;(n=e.geometry)==null||n.dispose(),e.isInstancedMesh&&e.dispose()}),this.colliders.removeRecorded(t.cols),t.obj=null,t.built=!1,t.cols=null}update(t,e){const n=e+150;for(const i of this.chunks){const r=i.box,o=Math.max(r.min.x-t.x,0,t.x-r.max.x),a=Math.max(r.min.z-t.z,0,t.z-r.max.z);i.obj.visible=o*o+a*a<n*n}if((this._t=(this._t||0)+1)%10){this.queue.length&&this.build(this.queue.shift());return}this.scan(t,n),this.detail(t),this.midUpdate(t),this.queue.length&&this.build(this.queue.shift())}scan(t,e){const n=[];for(const i of this.tiles.values()){const r=Math.max(Math.abs(t.x-i.cx)-ai/2,0),o=Math.max(Math.abs(t.z-i.cz)-ai/2,0),a=Math.hypot(r,o);i.built?(i.obj.visible=a<e,a>e+1500&&this.free(i)):a<e+300&&!this.queue.includes(i)&&n.push([a,i])}n.sort((i,r)=>i[0]-r[0]);for(const[,i]of n)this.queue.push(i)}prime(t,e){for(this.update(t,e),this.scan(t,e+150);this.queue.length;)this.build(this.queue.shift())}placeName(t,e){let n=null,i=1400;for(const r of this.places){const o=Math.hypot(r.c[0]-t,r.c[1]-e);o<i&&r.kind!=="locality"&&r.kind!=="isolated_dwelling"&&(i=o,n=r)}return n==null?void 0:n.name}}const jr={motorway:.8,motorway_link:1,trunk:.85,trunk_link:1,primary:.9,primary_link:1,secondary:.95,secondary_link:1,tertiary:1,tertiary_link:1,unclassified:1.15,residential:1.25,living_street:1.5,service:1.6,track:1.7};class uh{constructor(){this.a=[]}push(t,e){const n=this.a;n.push([t,e]);let i=n.length-1;for(;i;){const r=i-1>>1;if(n[r][0]<=n[i][0])break;[n[r],n[i]]=[n[i],n[r]],i=r}}pop(){const t=this.a,e=t[0],n=t.pop();if(t.length){t[0]=n;let i=0;for(;;){const r=2*i+1,o=r+1;let a=i;if(r<t.length&&t[r][0]<t[a][0]&&(a=r),o<t.length&&t[o][0]<t[a][0]&&(a=o),a===i)break;[t[a],t[i]]=[t[i],t[a]],i=a}}return e}get size(){return this.a.length}}class hl{constructor({roads:t,outerRoads:e,places:n,center:i,title:r}){this.all=[...t,...e].filter(m=>jr[m.k]&&m.p.length>1);const o=new Map,a=[],h=[],c=[],l=m=>`${Math.round(m[0]*2)},${Math.round(m[1]*2)}`,u=m=>{const p=l(m);let M=o.get(p);return M===void 0&&(M=a.length,o.set(p,M),a.push(m[0]),h.push(m[1]),c.push([])),M},f=(m,p,M)=>{m!==p&&(c[m].push([p,M]),c[p].push([m,M]))};this.kindOf=[];for(const m of this.all){let p=u(m.p[0]);for(let M=1;M<m.p.length;M++){const _=u(m.p[M]);f(p,_,Math.hypot(a[_]-a[p],h[_]-h[p])*jr[m.k]),p=_}for(const M of m.p){const _=o.get(l(M)),v=jr[this.kindOf[_]]??9;jr[m.k]<v&&(this.kindOf[_]=m.k)}}const d=20,g=new Map,x=(m,p)=>`${Math.floor(m/d)},${Math.floor(p/d)}`;for(let m=0;m<a.length;m++){const p=x(a[m],h[m]);g.has(p)||g.set(p,[]),g.get(p).push(m)}for(let m=0;m<a.length;m++){if(c[m].length!==1)continue;const p=Math.floor(a[m]/d),M=Math.floor(h[m]/d),_=c[m][0][0];let v=-1,y=14;for(let S=-1;S<=1;S++)for(let w=-1;w<=1;w++)for(const T of g.get(`${p+S},${M+w}`)||[]){if(T===m||T===_)continue;const b=Math.hypot(a[T]-a[m],h[T]-h[m]);b<y&&(y=b,v=T)}v>=0&&f(m,v,y*1.2+2)}Object.assign(this,{X:a,Z:h,adj:c,grid:g,G:d}),this.villages=[{name:r,short:"Valde",c:i,main:!0,big:!0},...n.filter(m=>m.kind==="village"||m.kind==="hamlet"||m.kind==="town").map(m=>({name:m.name,c:m.c,big:m.kind!=="hamlet"}))];for(const m of this.villages)m.node=this.nearest(m.c[0],m.c[1],400,p=>p!=="track"&&p!=="service"&&p!=="motorway"&&p!=="motorway_link");this.villages=this.villages.filter(m=>m.node>=0),this.cache=new Map}nearest(t,e,n=400,i=()=>!0){let r=-1,o=n;const a=Math.ceil(n/this.G),h=Math.floor(t/this.G),c=Math.floor(e/this.G);for(let l=-a;l<=a;l++)for(let u=-a;u<=a;u++)for(const f of this.grid.get(`${h+l},${c+u}`)||[]){if(!i(this.kindOf[f]))continue;const d=Math.hypot(this.X[f]-t,this.Z[f]-e);d<o&&(o=d,r=f)}return r}path(t,e){const n=`${t}>${e}`;if(this.cache.has(n))return this.cache.get(n);const i=this.X.length,r=new Float64Array(i).fill(1/0),o=new Int32Array(i).fill(-1),a=new uh;for(r[t]=0,a.push(0,t);a.size;){const[c,l]=a.pop();if(l===e)break;if(!(c>r[l]))for(const[u,f]of this.adj[l]){const d=c+f;d<r[u]&&(r[u]=d,o[u]=l,a.push(d,u))}}if(!isFinite(r[e]))return this.cache.set(n,null),null;const h=[];for(let c=e;c>=0;c=o[c])h.push([this.X[c],this.Z[c]]);return h.reverse(),this.cache.set(n,h),h}toVillages(t){const e=this.nearest(t[0],t[1],300,h=>h!=="track");if(e<0)return[];const n=this.X.length,i=new Float64Array(n).fill(1/0),r=new Int32Array(n).fill(-1),o=new uh;for(i[e]=0,o.push(0,e);o.size;){const[h,c]=o.pop();if(!(h>i[c]))for(const[l,u]of this.adj[c]){const f=h+u;f<i[l]&&(i[l]=f,r[l]=c,o.push(f,l))}}const a=[];for(const h of this.villages){if(!isFinite(i[h.node]))continue;const c=[];for(let l=h.node;l>=0;l=r[l])c.push([this.X[l],this.Z[l]]);c.reverse(),a.push([h,c,hl.length(c)])}return a}route(t,e){const n=this.nearest(t[0],t[1],300,r=>r!=="track"),i=typeof e=="number"?e:this.nearest(e[0],e[1],300,r=>r!=="track");return n>=0&&i>=0?this.path(n,i):null}static length(t){let e=0;for(let n=1;n<t.length;n++)e+=Math.hypot(t[n][0]-t[n-1][0],t[n][1]-t[n-1][1]);return e}villageAt(t,e,n=900){let i=null,r=n;for(const o of this.villages){const a=Math.hypot(o.c[0]-t,o.c[1]-e);a<r&&(r=a,i=o)}return i}spotsNear(t,e,n,i){const r=[],o=Math.ceil(i/this.G),a=Math.floor(t/this.G),h=Math.floor(e/this.G),c=new Set(["residential","living_street","unclassified","tertiary"]);for(let l=-o;l<=o;l++)for(let u=-o;u<=o;u++)for(const f of this.grid.get(`${a+l},${h+u}`)||[]){if(!c.has(this.kindOf[f]))continue;const d=Math.hypot(this.X[f]-t,this.Z[f]-e);d>n&&d<i&&r.push([this.X[f],this.Z[f]])}return r}nodePos(t){return[this.X[t],this.Z[t]]}}const Qx=new Set(["residential","living_street","unclassified","tertiary","service","secondary","trunk"]),tv=new Set(["trunk","primary","secondary","tertiary","unclassified"]);class ev{constructor({region:t,outerRoads:e,inner:n,makeCar:i,count:r}){Object.assign(this,{region:t,roads:e,inner:n,makeCar:i}),this.cars=[],this.area=null,this.nets=new Map;for(let o=0;o<r;o++){const a=i(o);a.aiKind="region",a.aiRespawn=()=>this.spawn(a,this.focus||a.pos),this.sleep(a),this.cars.push(a)}}sleep(t){t.ai=null,t.speed=0,t.place(1e5+Math.random()*1e3,1e5,0),t.mesh.visible=!1,t.asleep=!0}net(t){const e=t.join(",");if(this.nets.has(e))return this.nets.get(e);const[n,i,r]=t,o=t[3]?Qx:tv,a=this.roads.filter(c=>o.has(c.k)&&c.p.some(l=>Math.hypot(l[0]-n,l[1]-i)<r)),h=a.length?new cn(a,o,[n,i,r]):null;return this.nets.set(e,h),this.nets.size>20&&this.nets.delete(this.nets.keys().next().value),h}pickArea(t){if(Math.abs(t.x)<this.inner&&Math.abs(t.z)<this.inner)return null;const e=this.region.villageAt(t.x,t.z,1e3);return e&&!e.main?[Math.round(e.c[0]),Math.round(e.c[1]),450,1]:this.area&&!this.area[3]&&Math.hypot(t.x-this.area[0],t.z-this.area[1])<900?this.area:[Math.round(t.x/50)*50,Math.round(t.z/50)*50,1500,0]}spawn(t,e){const n=this.area&&this.net(this.area);if(!n||!n.roads.length)return this.sleep(t);let i=null,r=-1/0;const o=this.area[3]?80+Math.random()*300:200+Math.random()*700;for(let c=0;c<12;c++){const l=n.randomSpot(),u=n.roads[l.ri].p[l.i],f=Math.hypot(u[0]-e.x,u[1]-e.z),d=f>70?1e3-Math.abs(f-o):f;d>r&&(r=d,i=l)}const a=!this.area[3],h=n.roads[i.ri];t.ai=new ta(n,t,i,a?h.k==="trunk"||h.k==="secondary"?18:13:6.5),t.mesh.visible=!0,t.asleep=!1,t.speed=0}update(t,e){if(this.focus=t,(this._t=(this._t||0)+1)%30)return;const n=this.pickArea(t),i=n&&this.area&&n.join(",")===this.area.join(",");i||(this.area=n);for(const r of this.cars){if(r===e||r.driver||!r.ai&&!r.asleep)continue;const o=Math.hypot(r.pos.x-t.x,r.pos.z-t.z);if(!this.area){!r.asleep&&o>250&&this.sleep(r);continue}(r.asleep||!i&&o>250||o>2200||!r.ai.f.net.inArea(r.pos.x,r.pos.z))&&this.spawn(r,t)}}}const Xn=150,Ks=86,Xs=2.2,nv=11,iv=Math.PI/2;function fh(s,t=2.6){return s.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace("#include <fog_fragment>",`#ifdef USE_FOG
  float fogF = smoothstep( fogNear * ${t.toFixed(1)}, fogFar * ${t.toFixed(1)}, vFogDepth );
  gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogF );
#endif`)},s}function sv(){const s=new Qt(1,Ks,1,1,12,1),t=s.attributes.position;for(let e=0;e<t.count;e++){const n=t.getY(e)/Ks+.5,i=4.2*(1-n)**.8+.7*n,r=1.6*(1-n)+.25*n,o=t.getX(e)*i,a=t.getZ(e)*r,h=(1-n)*.35;t.setXYZ(e,o*Math.cos(h)-a*Math.sin(h)+(t.getX(e)>0?.6*(1-n):0),t.getY(e)+Ks/2+Xs*.6,o*Math.sin(h)+a*Math.cos(h))}return s.computeVertexNormals(),s}const rv=new U;class av{constructor(t,e,n){var y;if(this.group=new zt,this.list=[],this.t=0,!(t!=null&&t.length))return;const i=fh(new wt({color:15659248,roughness:.55,metalness:.05})),r=fh(new wt({color:12106942,roughness:.8})),o=new ce(1.6,3,Xn+2,20,1,!0);o.translate(0,(Xn+2)/2-2,0);const a=new Qt(4.2,4.4,14);a.translate(0,Xn+.6,4.5);const h=new ce(2.1,2.1,14,16,1);h.rotateX(Math.PI/2),h.translate(0,Xn+2.8,4.5);const c=new ce(1.9,1.9,1,16);c.translate(0,Xn-1.6,1.5);const l=Zn([o,a,h,c]),u=new ce(9,10,1.2,24);u.translate(0,-.3,0);const f=new ke(Xs+.4,16,10,0,Math.PI*2,0,Math.PI/2);f.rotateX(-Math.PI/2),f.scale(1,1,1.6),f.translate(0,0,-1.2);const d=new ce(Xs+.4,Xs+.4,2.4,16);d.rotateX(Math.PI/2);const g=sv(),x=[0,1,2].map(S=>g.clone().rotateZ(S*Math.PI*2/3)),m=Zn([f.toNonIndexed(),d.toNonIndexed(),...x.map(S=>S.toNonIndexed())]);this.lightMat=new Je({color:16719893,fog:!1,transparent:!0});const p=new ke(1.1,10,8),M=document.createElement("canvas");M.width=M.height=64;const _=M.getContext("2d"),v=_.createRadialGradient(32,32,0,32,32,32);v.addColorStop(0,"rgba(255,90,70,1)"),v.addColorStop(.18,"rgba(255,30,20,0.85)"),v.addColorStop(.5,"rgba(255,0,0,0.18)"),v.addColorStop(1,"rgba(255,0,0,0)"),_.fillStyle=v,_.fillRect(0,0,64,64),this.glowMat=new da({map:new Sn(M),color:16777215,blending:Ii,depthWrite:!1,fog:!1,transparent:!0}),this.glows=[];for(const[S,w]of t){const T=e.ground(S,w),b=iv+Math.sin(S*.013+w*.021)*.12,E=new zt;E.position.set(S,T,w),E.rotation.y=b;const C=new xt(l,i);C.castShadow=!0,E.add(C);const I=new xt(u,r);I.receiveShadow=!0,E.add(I);const F=new xt(m,i);F.position.set(0,Xn,-3.4),F.rotation.z=Math.random()*6.28,F.castShadow=!0,E.add(F);const A=new xt(p,this.lightMat);A.position.set(0,Xn+5.4,8),E.add(A);const L=new Zo(this.glowMat);L.position.copy(A.position),L.renderOrder=2,E.add(L),this.glows.push(L);for(const O of[C,I,F,A])O.frustumCulled=!0;this.group.add(E);const N=-Math.sin(b),z=-Math.cos(b);if(this.list.push({x:S,z:w,y:T,rotor:F,hub:new U(S+N*3.4,T+Xn,w+z*3.4),ax:N,az:z,speed:nv/60*Math.PI*2*(.9+.2*Math.random())}),n){const O=[];for(let H=0;H<8;H++)O.push([S+3.1*Math.cos(H*Math.PI/4),w+3.1*Math.sin(H*Math.PI/4)]);for(let H=0;H<8;H++)n.addSegment(O[H][0],O[H][1],O[(H+1)%8][0],O[(H+1)%8][1],"building");(y=n.addArea)==null||y.call(n,O)}}}update(t,e=0,n=null){if(!this.list.length)return;this.t+=t;for(const h of this.list)h.rotor.rotation.z-=h.speed*t;const i=this.t%2,r=i<.25?i/.25:i<.75?1:i<1.25?1-(i-.75)/.5:0,a=e>.3?r*r*(3-2*r):0;if(this.lightMat.visible=this.glowMat.visible=a>.01,this.lightMat.opacity=a,this.glowMat.opacity=a,a>.01&&n)for(const h of this.glows){const c=n.position.distanceTo(h.getWorldPosition(rv));h.scale.setScalar(Math.max(12,c*.03))}}hit(t){for(const e of this.list){const n=t.x-e.x,i=t.z-e.z,r=Math.hypot(n,i);if(r>Ks+10)continue;if(r<4&&t.y<e.y+Xn+3)return"Te has estrellado contra la torre de un molino";const o=t.x-e.hub.x,a=t.y-e.hub.y,h=t.z-e.hub.z,c=o*e.ax+h*e.az;if(Math.abs(c)<4&&Math.hypot(o-e.ax*c,a,h-e.az*c)<Ks+Xs)return"Te han dado las palas de un molino"}return null}}const la={bar:"🍺",tienda:"🛒",panaderia:"🥖",carniceria:"🥩",taller:"🔧",granja:"🐄",farmacia:"💊",restaurante:"🍽️",otro:"🏪"},dh={bar:"#7a3b1e",tienda:"#1f5f8b",panaderia:"#a8682a",carniceria:"#8b1f2a",taller:"#3a4a55",granja:"#4a6b2a",farmacia:"#1f7a4a",restaurante:"#6b2a5a",otro:"#4a4a4a"};function ov([s,t],e,n,i=25){let r=null,o=i;for(const l of e)for(let u=0;u<l.p.length-1;u++){const f=l.p[u],d=l.p[u+1],g=d[0]-f[0],x=d[1]-f[1],m=g*g+x*x||1,p=Math.max(0,Math.min(1,((s-f[0])*g+(t-f[1])*x)/m)),M=f[0]+g*p,_=f[1]+x*p,v=Math.hypot(s-M,t-_);v<o&&(o=v,r=[M,_])}if(!r&&n){const l=n.nearest(s,t,i);l>=0&&(r=n.nodePos(l))}if(!r)return[s,t];const a=s-r[0],h=t-r[1],c=Math.hypot(a,h);return c>2.5?[r[0]+a/c*1.5,r[1]+h/c*1.5]:r}function lv(s,t){const e=document.createElement("canvas");e.width=512,e.height=160;const n=e.getContext("2d");n.fillStyle=dh[t]||dh.otro,n.fillRect(0,0,512,160),n.strokeStyle="#e8d9b0",n.lineWidth=8,n.strokeRect(8,8,496,144),n.fillStyle="#fff6dc",n.textAlign="center",n.textBaseline="middle";let i=64;for(n.font=`700 ${i}px Georgia, serif`;n.measureText(s).width>330&&i>26;)i-=4,n.font=`700 ${i}px Georgia, serif`;n.fillText(s,300,84),n.font="72px system-ui",n.fillText(la[t]||la.otro,82,86);const r=new Sn(e);return r.colorSpace=Me,r.anisotropy=4,r}class cv{constructor(t,{terrain:e,roads:n,region:i}){this.group=new zt,this.list=[];const r=new wt({color:3811868,roughness:.9}),o=new ce(.06,.07,3,6);for(const a of t||[]){const[h,c]=a.xy,l=ov([h,c],n,i),u=la[a.tipo]?a.tipo:"otro",f={name:a.name||"Negocio",tipo:u,icon:la[u],xy:[h,c],at:l};this.list.push(f);const d=new zt,g=e.height(h,c),x=new wt({map:lv(f.name,u),roughness:.7,side:be}),m=new xt(new Pe(2.4,.75),x);m.position.y=2.55,d.add(m);for(const w of[-1,1]){const T=new xt(o,r);T.position.set(w*1.05,1.5,-.02),d.add(T)}const p=l[0]-h,M=l[1]-c,_=Math.hypot(p,M),v=_>2.5?(_-2.5)/_:0,y=h+p*v,S=c+M*v;d.position.set(y,Math.min(g,e.height(y,S)),S),_>.5&&(d.rotation.y=Math.atan2(p,M)),d.traverse(w=>{w.castShadow=!0}),this.group.add(d)}}}const xn=matchMedia("(pointer: coarse)").matches,wu=document.getElementById("game"),dn=new Zh({canvas:wu,antialias:!xn,powerPreference:"high-performance"});dn.setPixelRatio(Math.min(devicePixelRatio,xn?1.5:2));dn.setSize(innerWidth,innerHeight);dn.outputColorSpace=Me;dn.toneMapping=vh;dn.toneMappingExposure=.9;dn.shadowMap.enabled=!0;dn.shadowMap.type=gh;const Kt=new Xg,ye=new ln(60,innerWidth/innerHeight,.3,4e3);Kt.fog=new jo(13227746,250,1600);const gs=new Ma;gs.scale.setScalar(1e4);Kt.add(gs);const As=gs.material.uniforms;As.turbidity.value=4;As.rayleigh.value=1.2;As.mieCoefficient.value=.004;As.mieDirectionalG.value=.8;const hv=new U().setFromSphericalCoords(1,Re.degToRad(50),Re.degToRad(215));As.sunPosition.value.copy(hv);const _n=new U1(16773596,2.6);_n.castShadow=!0;_n.shadow.mapSize.set(xn?1024:2048,xn?1024:2048);const ws=_n.shadow.camera;ws.left=ws.bottom=-70;ws.right=ws.top=70;ws.near=1;ws.far=400;_n.shadow.bias=-4e-4;_n.shadow.normalBias=.04;Kt.add(_n,_n.target);const Go=new P1(12571886,7035456,.9);Kt.add(Go);const ph=document.getElementById("loading"),uv=document.getElementById("bar"),Zr=(s,t)=>{uv.style.width=`${Math.round(s*100)}%`,t&&(document.getElementById("lmsg").textContent=t)};async function fv(s){var F,A,L,N;const t="./world/"+s+"/";Zr(.05,"Cargando mapa…");const[e,n,i]=await Promise.all([fetch(t+"world.json").then(z=>z.json()),fetch(t+"terrain.json").then(z=>z.json()),fetch(t+"plano.json").then(z=>z.ok?z.json():null).catch(()=>null)]);i&&dx(e,i),Zr(.3,"Cargando ortofoto…");const r=new au,o=z=>new Promise(O=>r.load(t+z,H=>{H.colorSpace=Me,H.anisotropy=dn.capabilities.getMaxAnisotropy(),O(H)})),a=Promise.all([fetch(t+"outer.json").then(z=>z.ok?z.json():null),fetch(t+"terrain_outer.json").then(z=>z.ok?z.json():null)]).catch(()=>[null,null]),[h,c]=await Promise.all([o(e.ortho.full.file),o(e.ortho.center.file)]),[l,u]=await a,f=l&&u?await o(l.ortho.file):null;Zr(.6,"Construyendo el pueblo…"),await new Promise(z=>setTimeout(z,20));const d=B1(dn),g=new Z1(e.terrain,Float32Array.from(n.h,z=>z*n.scale));f&&g.setOuter(l.terrain,Float32Array.from(u.h,z=>z*u.scale));const x=i!=null&&i.aerodromo?q1(g,i.aerodromo):null;e.terrain.ortho=e.ortho;const m={...e.terrain,ortho:{full:e.ortho.full.bounds,center:e.ortho.center.bounds}};mu(e.roads);const p=((F=e.plaza)==null?void 0:F.start)||e.spawn;(A=i==null?void 0:i.niveles)!=null&&A.length&&fx(g,i.niveles);const M=lx(m,g,h,c,d,e.style==="urban"?null:cx(e,p),e.style==="urban"?null:hx(i==null?void 0:i.suelo));Kt.add(M);const _=new K1;x&&Kt.add($1(x,g,_)),Kt.add(gu(e.roads,g,d,_));const v=fu(e,g,d,_);Kt.add(v),Kt.add(nx(e,g,_));let y=null;v.traverse(z=>{z.userData.bellTower&&(y=z.userData.bellTower)});const S=du(e,g,d,_);Kt.add(S);const w=_u(e,((L=e.plaza)==null?void 0:L.start)||e.spawn,_);i?e.walls=px(i):e.style!=="urban"&&!e.walls.length&&(e.walls=rx(e,_,[w.gas,w.shop,(N=w.taller)==null?void 0:N.b].filter(Boolean))),Kt.add(ax(e,g,d,_)),i&&Kt.add(mx(i,g,d,_));const T=new av(i==null?void 0:i.molinos,g,_);Kt.add(T.group);const b=[[w.gas,13],[w.shop,15]].filter(([z])=>z);e.trees=e.trees.filter(([z,O])=>!b.some(([H,V])=>Math.hypot(z-H.x,O-H.z)<V)&&!(x&&Lo(x,z,O,14)));const E=new ox(e,g,d,_);Kt.add(E.group);const C=f?new Jx({data:l,terrain:g,tex:d,colliders:_,ortho:f,scene:Kt,base:t}):null;Zr(.95,"Últimos detalles…");const I=[M.material];return S.traverse(z=>{var O;z.isMesh&&((O=z.material)!=null&&O.map)&&!I.includes(z.material)&&I.push(z.material)}),v.traverse(z=>{var O,H;z.isMesh&&(((O=z.material)==null?void 0:O.map)===d.roof||((H=z.material)==null?void 0:H.map)===d.flatRoof)&&!I.includes(z.material)&&I.push(z.material)}),{data:e,terrain:g,colliders:_,trees:E,oFull:h,lamps:S.userData.lamps,bellTower:y,tex:d,surfaces:I,sites:w,outer:C,oOuter:f,airfield:x,molinos:T,plano:i}}const Ue=new N1(wu);{const s=document.getElementById("fs"),t=document.documentElement,e=t.requestFullscreen||t.webkitRequestFullscreen;(!e||!(document.fullscreenEnabled||document.webkitFullscreenEnabled))&&(s.hidden=!0);const n=async r=>{var o,a;r.preventDefault(),r.stopPropagation();try{document.fullscreenElement||document.webkitFullscreenElement?(document.exitFullscreen||document.webkitExitFullscreen).call(document):(await e.call(t,{navigationUI:"hide"}),await((a=(o=screen.orientation)==null?void 0:o.lock)==null?void 0:a.call(o,"landscape").catch(()=>{})))}catch{}};s.addEventListener("click",n),s.addEventListener("touchend",n);const i=()=>{s.textContent=document.fullscreenElement||document.webkitFullscreenElement?"✕":"⛶"};document.addEventListener("fullscreenchange",i),document.addEventListener("webkitfullscreenchange",i)}function dv(){const s=["valde"],t=location.hash.replace("#","");if(s.includes(t))return Promise.resolve(t);if(s.length===1)return Promise.resolve(s[0]);const e=document.getElementById("maps");return e.hidden=!1,document.getElementById("lmsg").textContent="Elige dónde jugar",new Promise(n=>e.addEventListener("click",i=>{const r=i.target.closest("[data-map]");if(r){e.hidden=!0;try{history.replaceState(null,"","#"+r.dataset.map)}catch{}n(r.dataset.map)}}))}const Kr={mode:document.getElementById("mode"),speed:document.getElementById("speed"),hint:document.getElementById("hint"),place:document.getElementById("place")};dv().then(s=>fv(s)).then(({data:s,terrain:t,colliders:e,trees:n,oFull:i,lamps:r,bellTower:o,tex:a,surfaces:h,sites:c,outer:l,oOuter:u,airfield:f,molinos:d,plano:g})=>{var ae,oe,xe,Te,he;const x={terrain:t,colliders:e,scene:Kt,personScale:s.personScale||1},m=new vx(x);Kt.add(m.mesh),l&&(x.edge=l.data.half-250),x.molinos=d,d.list.length&&(ye.far=9e3,ye.updateProjectionMatrix());const p=f?new j1({world:x,f}):null;p&&Kt.add(p.mesh);let M=null;m.pos.set(s.spawn[0],t.height(s.spawn[0],s.spawn[1]),s.spawn[1]);const _=[12041930,9051164,15921904,2045264,2763306,7171930,13152906],v=s.cars.map(([j,Nt,_e],le)=>{const It=new Ti(x,_[le%_.length],le%3===1?"suv":"sedan",s.carScale||1);return It.place(j,Nt,_e),It.home=[j,Nt,_e],Kt.add(It.mesh),It});x.cars=v;let y=null;cn.limit=(s.half||1e3)-100;const S=new cn(s.roads,new Set(["residential","tertiary","unclassified","living_street","trunk"])),w=new cn(s.roads,new Set(["residential","tertiary","living_street"])),T=j=>j.k==="trunk",b=j=>j.k!=="trunk",E=j=>{if(j.aiRespawn)return j.aiRespawn();const Nt=j.aiKind==="trunk";j.ai=new ta(S,j,S.randomSpot(Nt?T:b),Nt?19:6.5)},C=[14211280,2902638,7216927,3817274,11901530,1907997];for(let j=0;j<(xn?4:6);j++){const Nt=new Ti(x,C[j%C.length],j%3===2?"suv":"sedan",s.carScale||1);Nt.aiKind=j%2?"trunk":"village",E(Nt),Kt.add(Nt.mesh),v.push(Nt)}{const j=new Ti(x,12071454,"tractor",s.carScale||1);j.aiKind="trunk",j.ai=new ta(S,j,S.randomSpot(T),7.5),Kt.add(j.mesh),v.push(j),j.ai,j.aiRespawn=()=>{j.ai=new ta(S,j,S.randomSpot(T),7.5)}}const I=l?new hl({roads:s.roads,outerRoads:l.data.roads,places:l.places,center:((ae=s.plaza)==null?void 0:ae.start)||s.spawn,title:s.title}):null,F=I?new ev({region:I,outerRoads:l.data.roads,inner:1500,count:xn?4:7,makeCar:j=>{const Nt=new Ti(x,C[(j+2)%C.length],j%4===3?"suv":"sedan",s.carScale||1);return Kt.add(Nt.mesh),v.push(Nt),Nt}}):null,A=[];for(let j=0;j<(xn?6:10);j++){const Nt=new Ix(w,x,w.randomSpot(),j);Kt.add(Nt.mesh),A.push(Nt)}const L=((oe=s.plaza)==null?void 0:oe.start)||s.spawn,N=new xx({scene:Kt,world:x,net:w,roads:s.roads,center:L,buildings:s.buildings,half:s.half||1e3,isMobile:xn}),z=new Rx({scene:Kt,sky:gs,sun:_n,hemi:Go,renderer:dn,isMobile:xn});z.setLamps(r);const O=new Jc(16773840,0,160,.42,.45,1);O.position.set(0,.8,2.2),O.target.position.set(0,-1,40),O.add(O.target);const H=new Jc(16773840,0,45,.85,.6,1.2);H.target.position.set(0,-1.5,9),H.add(H.target),O.add(H);const V=((xe=s.plaza)==null?void 0:xe.start)||[s.spawn[0]+4,s.spawn[1]],G={mission:document.getElementById("mission"),money:document.getElementById("money"),toast:document.getElementById("toast")},Y=s.roads.filter(j=>j.k!=="track"&&j.k!=="path").map(j=>j.p),W=new _x(document.getElementById("minimap"),i.image,s.ortho.full.bounds,Y);l&&(W.outer={img:u.image,b:l.data.ortho.bounds});const $=new Sx,it=new Ux({scene:Kt,terrain:t,start:V,drops:oh(s),ui:G,sound:j=>$.blip(j)});let Mt=0,gt=null;const Pt=document.getElementById("clock"),Rt=document.querySelector("[data-btn=gear]"),dt=new Fx({scene:Kt,world:x,roads:s.roads,center:((Te=s.plaza)==null?void 0:Te.start)||s.spawn,start:s.race_start||[s.spawn[0]+20,s.spawn[1]+10],ui:G,sound:j=>$.blip(j),toast:(j,Nt)=>it.toast(j,Nt),makeCar:j=>{const Nt=new Ti(x,j,"sedan",s.carScale||1);return Kt.add(Nt.mesh),v.push(Nt),Nt}});dt.onRemove=j=>{Kt.remove(j.mesh),j.mesh.traverse(_e=>{var le;return(le=_e.geometry)==null?void 0:le.dispose()});for(const _e of j.smoke)Kt.remove(_e),_e.material.dispose();const Nt=v.indexOf(j);Nt>=0&&j!==y&&v.splice(Nt,1)},dt.onPrize=j=>{it.money+=j},I&&dt.addInterVillage(I);const Tt=(j,Nt)=>it.toast(j,Nt),k=j=>$.blip(j),ft=(j,Nt,_e,le,It)=>{const We=new Ti(x,Nt,j,s.carScale||1);return We.place(_e,le,It),Kt.add(We.mesh),v.push(We),We},Q=Wx();if(Q){it.money=Q.money|0,Q.best&&(it.best=Q.best),Q.hour>=0&&(z.hour=Q.hour),Q.day>=0&&(z.day=Q.day),Q.records&&(dt.records=Q.records);for(const j of Q.owned||[]){const Nt=ft(j.kind,j.color,j.x,j.z,j.h);Nt.owned=!0,Nt.fuel=j.fuel??1,j.health<100&&Nt.damage(100-j.health,0,1.8)}}const at=new Gx({scene:Kt,isMobile:xn});for(const j of h)ko(j,at.U);l==null||l.setWeather(at.U),Q!=null&&Q.weather&&at.set(Q.weather);const st=new $x({scene:Kt,world:x,data:s,center:L,colliders:e,spawnVehicle:ft,wallet:it,toast:Tt,sound:k,sites:c,owned:((Q==null?void 0:Q.owned)||[]).map(j=>j.kind)}),At=new Yx({scene:Kt,world:x,data:s,center:L,drops:oh(s),ui:G,toast:Tt,sound:k,wallet:it,personScale:x.personScale});At.extraDest=[st.gasAt,At.farm].filter(Boolean),At.region=I;const yt=new cv(g==null?void 0:g.negocios,{terrain:t,roads:s.roads.filter(j=>j.k!=="path"),region:I});Kt.add(yt.group),At.addNegocios(yt.list);const P=new Bx({scene:Kt,world:x,net:S,cars:v,scale:s.carScale||1,isMobile:xn,ui:{wanted:document.getElementById("wanted")},toast:Tt,sound:k,wallet:it});x.onHit=(j,Nt)=>{Nt===y&&P.report("atropello")};const R=new U,X={x:0,z:0,fx:0,fz:1},ct=new Hx($),et=new Vx($),tt=new Zx({scene:Kt,world:x,data:s,center:L,isMobile:xn,ambient:ct}),ot=new Kx({scene:Kt,world:x,data:s,center:L,tex:a,bellTower:o}),ht=document.getElementById("offer"),vt={id:null,declined:!1,accept:!1,reject:!1,txt:null};let Ct=null;for(const[j,Nt]of[[".yes","accept"],[".no","reject"]]){const _e=ht.querySelector(j),le=It=>{It.preventDefault(),It.stopPropagation(),vt[Nt]=!0};_e.addEventListener("click",le),_e.addEventListener("touchstart",le,{passive:!1})}const Ut=document.getElementById("fade"),lt=document.getElementById("wx"),$t=document.getElementById("minimap");lt.addEventListener("click",()=>at.next()),lt.addEventListener("touchstart",j=>{at.next(),j.stopPropagation()},{passive:!0}),lt.textContent=at.info.icon;const kt=()=>Xx({money:it.money,best:it.best,hour:z.hour,day:z.day,weather:at.kind,records:dt.records,owned:v.filter(j=>j.owned).map(j=>({kind:j.kind,color:j.color,x:+j.pos.x.toFixed(1),z:+j.pos.z.toFixed(1),h:+j.heading.toFixed(2),fuel:+j.fuel.toFixed(3),health:Math.round(j.health)}))});dt.onRecord=kt,st.onBuy=kt,st.onRepair=j=>{j===y&&j.mesh.add(O)},addEventListener("pagehide",kt),document.addEventListener("visibilitychange",()=>{document.hidden&&kt()});let pt=10,Lt=Math.floor(z.hour),nt=null;dt.onStart=j=>{Et.yaw=j.heading+Math.PI,Et.pitch=.18,ye.position.set(j.pos.x-Math.sin(j.heading)*7,j.pos.y+3,j.pos.z-Math.cos(j.heading)*7)},it.busy=()=>dt.active||At.active||!!ot.inside,dt.busy=()=>it.state==="deliver"||At.active||!!ot.inside,At.busy=()=>dt.active||it.state==="deliver"||!!ot.inside,Pt.textContent=z.clock,Pt.addEventListener("click",()=>z.skip(1)),Pt.addEventListener("touchstart",j=>{z.skip(1),j.stopPropagation()},{passive:!0});for(const j of["keydown","touchstart","mousedown"])addEventListener(j,()=>$.start(),{once:!0});const Et={yaw:m.heading+Math.PI,pitch:.25,dist:4.6,pos:new U};ye.position.copy(m.pos).add(new U(0,3,-6));const Ot=document.getElementById("place");Ot.textContent=s.title;const pe=j=>{var Nt;if(!j.main){const _e=j.node,le=((Nt=I.adj[_e][0])==null?void 0:Nt[0])??_e,[It,We]=I.nodePos(_e),[kn,gi]=I.nodePos(le),tn=Math.atan2(kn-It,gi-We),xi=Math.cos(tn),Kn=-Math.sin(tn),Jn=It+xi*2,D=We+Kn*2,q=It-xi*2.5,Z=We-Kn*2.5;m.pos.set(q,t.height(q,Z),Z),m.heading=tn,l.prime(m.pos,z.far);const K=ft(Math.random()<.3?"suv":"sedan",_[Math.random()*_.length|0],Jn,D,tn);K.home=[Jn,D,tn],Et.yaw=tn+Math.PI,ye.position.copy(m.pos).add(new U(-Math.sin(tn)*6,3,-Math.cos(tn)*6)),Ot.textContent=j.name}ph.classList.add("done");try{localStorage.setItem("valde.start",j.name)}catch{}},Vt=document.getElementById("maps");if(I&&I.villages.length>1){let j=null;try{j=localStorage.getItem("valde.start")}catch{}const Nt=I.villages.find(le=>le.main),_e=[...I.villages].sort((le,It)=>!!It.main-!!le.main||!!It.big-!!le.big||le.name.localeCompare(It.name,"es"));Vt.innerHTML="",Vt.classList.add("starts"),Vt.hidden=!1,document.querySelector("#loading .track").style.display="none",document.getElementById("lmsg").textContent="¿En qué pueblo empiezas?",_e.forEach(le=>{const It=document.createElement("button"),We=Math.hypot(le.c[0]-Nt.c[0],le.c[1]-Nt.c[1])/1e3;It.innerHTML=`<b></b><span>${le.main?"principal":`${We.toFixed(1).replace(".",",")} km${le.big?"":" · aldea"}`}</span>`,It.querySelector("b").textContent=le.name,le.name===j&&It.classList.add("last"),It.addEventListener("click",()=>{Vt.hidden=!0,pe(le)}),Vt.appendChild(It)}),(he=Vt.querySelector(".last"))==null||he.scrollIntoView({block:"center",inline:"nearest"})}else ph.classList.add("done");l&&Math.max(Math.abs(m.pos.x),Math.abs(m.pos.z))>1500&&l.prime(m.pos,z.far),s.style==="urban"&&(Kt.fog.color.set(12897492),As.turbidity.value=7,_n.intensity=2.2),document.getElementById("help").classList.add("show"),setTimeout(()=>document.getElementById("help").classList.remove("show"),9e3);const _t=new z1,B=new U;let mt=0;function St(){var Ht,Xt,Zt,Yt,jt,we;const j=Math.min(.05,_t.getDelta()),Nt=Ue.consumeLook();Et.yaw-=Nt.dx*.0035,Et.pitch=Re.clamp(Et.pitch+Nt.dy*.0025,-.25,1.2);const _e=Ue.wasPressed("KeyE","KeyF","Enter","btn:action");if(Ct&&(vt.accept||_e&&!vt.declined)){const rt=Ct;vt.declined=!0,rt.go()}else if(Ct&&(vt.reject||Ue.wasPressed("KeyN","Escape")))vt.declined=!0;else if(_e){if(M)M.canExit?(M.engine=!1,m.exitCar(M),M=null,Et.yaw=m.heading+Math.PI):Tt("✈ En marcha","Para la avioneta en tierra para bajarte");else if(!y&&p&&p.pos.distanceTo(m.pos)<6)M=p,p.engine=!0,m.enterCar(p),Tt("✈ Avioneta",Ue.touch?"Joystick arriba para acelerar por la pista y despegar":"W o ↑ para acelerar por la pista y despegar");else if(y)y.mesh.userData.rider&&(y.mesh.userData.rider.visible=!1),y.driver=!1,m.exitCar(y),y=null,Kt.add(O);else if(((Ht=ot.inside)==null?void 0:Ht.kind)==="bar"&&ot.hint){const rt=[["un café con leche",1],["un vino de la tierra",2],["una caña",2],["un pincho de tortilla",3]],[re,ue]=rt[Math.random()*rt.length|0];it.money>=ue?(it.money-=ue,Tt("🍷 Bar La Plaza",`Te tomas ${re}: -${ue} €`),k("ok")):Tt("🍷 Bar La Plaza","No te llega ni para un café")}else if(!st.tryBuy(m)){let rt=null,re=4.5;for(const ue of v){if(ue.racer||ue.police||ue.forSale)continue;const ee=ue.pos.distanceTo(m.pos)-2.2*(1-ue.s);ee<re&&(re=ee,rt=ue)}rt&&(y=rt,rt.driver=!0,rt.ai=null,rt.mesh.add(O),m.enterCar(rt),Et.yaw=rt.heading+Math.PI,Et.pitch=.18,rt.mesh.userData.rider&&(rt.mesh.userData.rider.visible=!0))}}vt.accept=vt.reject=!1,Ue.wasPressed("KeyY")&&at.next(),Ue.wasPressed("KeyT")&&z.skip(1),y&&Ue.wasPressed("KeyQ","btn:gear")&&(y.gear=y.gear===1?2:1),x.obstacles=y?[...v,...A]:[...v,...A,m],M?M.update(j,Ue,Tt)==="crash"?(M.engine=!1,m.exitCar(M),m.pos.set(f.exit.x,t.height(f.exit.x,f.exit.z),f.exit.z),M=null,k("fail")):m.pos.copy(M.pos):y?y.update(j,Ue,Et.yaw):m.update(j,Ue,Et.yaw),d.update(j,z.n,ye),M||p==null||p.update(0,null);for(const rt of v)rt!==y&&!rt.police&&(rt.update(j,null),(Zt=(Xt=rt.ai)==null?void 0:Xt.f)!=null&&Zt.deadEnd&&rt.pos.distanceTo(m.inCar?m.inCar.pos:m.pos)>90&&E(rt));const le=M?M.pos:y?y.pos:m.pos;if(!(mt&15))for(const rt of v){if(rt===y||rt.police||rt.forSale||rt.racer||rt.health>=100){rt.idleT=0;continue}rt.idleT=(rt.idleT||0)+j*16,!(rt.idleT<300||rt.pos.distanceTo(le)<70||rt.home&&Math.hypot(rt.home[0]-le.x,rt.home[1]-le.z)<70)&&(rt.idleT=0,rt.owned||(rt.color=_[Math.random()*_.length|0]),rt.repair(),rt.fuel=1,rt.speed=0,rt.home?rt.place(...rt.home):rt.aiRespawn?rt.aiRespawn():rt.aiKind&&E(rt))}F==null||F.update(le,y);for(const rt of A)rt.update(j,v,m,le);const It=M?M.pos:y?y.pos:m.pos,We=y?3+5.5*y.s:ot.inside?2.6:Et.dist,kn=y?.6+y.s:1.55*x.personScale;if(y&&Math.abs(Nt.dx)<.5){let rt=y.heading+Math.PI-Et.yaw;rt=Math.atan2(Math.sin(rt),Math.cos(rt)),Et.yaw+=rt*Math.min(1,j*2.5*Math.min(1,Math.abs(y.speed)/3))}const gi=Math.cos(Et.pitch);B.set(Math.sin(Et.yaw)*gi*We,Math.sin(Et.pitch)*We+kn,Math.cos(Et.yaw)*gi*We).add(It);const tn=e.raycast(It.x,It.z,B.x,B.z);if(tn<1){const rt=Math.max(.05,tn-.4/We);B.x=It.x+(B.x-It.x)*rt,B.z=It.z+(B.z-It.z)*rt}const xi=t.height(B.x,B.z)+.6;if(B.y<xi&&(B.y=xi),ye.position.lerp(B,tn<1?1-Math.exp(-j*30):1-Math.exp(-j*12)),ye.lookAt(It.x,It.y+kn,It.z),M){const rt=M.forward(new U);rt.y*=.5,B.copy(M.pos).addScaledVector(rt,-15).add(new U(0,4.5,0));const re=t.height(B.x,B.z)+1.5;B.y<re&&(B.y=re),ye.position.lerp(B,1-Math.exp(-j*6)),ye.lookAt(M.pos.x+rt.x*20,M.pos.y+2+rt.y*20,M.pos.z+rt.z*20)}const Kn=(Yt=window.__game)==null?void 0:Yt.freeCam;if(Kn&&(ye.position.set(...Kn.pos),ye.lookAt(...Kn.look)),gs.position.copy(ye.position),n.update(It),l){l.update(It,z.far);const rt=l.data.half-60,re=y||m,ue=re.pos;if(M||(Math.abs(ue.x)>rt||Math.abs(ue.z)>rt)&&(ue.x=Re.clamp(ue.x,-rt,rt),ue.z=Re.clamp(ue.z,-rt,rt),y&&(y.speed*=-.3),mt&63||Tt("Fin del mapa","Hasta aquí llegan los 10 km alrededor de Val de Santa María")),y&&!(mt&3)){const ee=l.waterAt(ue.x,ue.z);ee!=null&&ue.y<ee+.3&&(y.speed*=.7,Math.abs(y.speed)<.5&&!(mt&127)&&Tt("¡Al agua!","Los coches no flotan: sal marcha atrás"))}if(!(mt&31)){const ee=I==null?void 0:I.villageAt(It.x,It.z,1/0),Jt=ee?Math.hypot(ee.c[0]-It.x,ee.c[1]-It.z):0,Bi=ee?Jt<650?ee.name:`${ee.name} · ${(Jt/1e3).toFixed(1).replace(".",",")} km`:l.placeName(It.x,It.z)||s.title;Ot.textContent!==Bi&&(Ot.textContent=Bi)}}z.cloud=at.cur.cloud,z.update(j,It),at.inside=!!ot.inside,at.update(j,ot.inside?new U(0,-999,0):ye.position,z,_n,Go,gs),x.grip=at.grip;for(const rt of v)(rt===y||rt.ai&&rt.pos.distanceToSquared(It)<3600)&&rt.wipers(j,at.raining);N.update(j,It,v,z);const Jn=z.n;for(const rt of v)rt.setLights(rt.ai||rt===y?Jn:0,rt===y?Ue.brake||Ue.axes().y<0&&y.speed>.5:rt.ai&&rt.speed<1);O.intensity=y?700*Jn:0,H.intensity=y?160*Jn:0,it.update(j,It),dt.update(j,y,It),At.update(j,It,y),At.tick(j),P.update(j,It,y,L,!!ot.inside);const D=st.update(j,y,m);tt.update(j,z,It,Tt);const q=ot.update(j,m,y,Ue);q&&(Ut.classList.add("on"),setTimeout(()=>{if(q.enter){const rt=q.enter;m.pos.set(rt.spawn[0],0,rt.spawn[1]-2),m.heading=Math.PI,Tt(`${rt.icon} ${rt.name}`,"Sal por la puerta del fondo (círculo blanco)")}else{const rt=q.exit,[re,ue,ee]=rt.door;m.pos.set(re+Math.sin(ee)*1.6,0,ue+Math.cos(ee)*1.6),m.pos.y=t.height(m.pos.x,m.pos.z),m.heading=ee}Et.yaw=m.heading+Math.PI,ye.position.set(m.pos.x-Math.sin(m.heading)*3,m.pos.y+2,m.pos.z-Math.cos(m.heading)*3),$t.style.visibility=ot.inside?"hidden":"visible",setTimeout(()=>Ut.classList.remove("on"),150)},360));const Z=Math.floor(z.hour);if(Z!==Lt&&(Lt=Z,o&&$.ctx&&(nt={n:Z%12||12,k:0,t:0})),nt&&o){if(nt.t-=j,nt.t<=0&&nt.k<nt.n){const rt=Math.hypot(It.x-o.x,It.z-o.z);rt<1200&&$.bell(196,(ot.inside?.12:.4)/(1+rt/70)),nt.k++,nt.t=3.2}nt.k>=nt.n&&(nt=null)}ye.getWorldDirection(R);{const rt=Math.hypot(R.x,R.z)||1;X.x=ye.position.x,X.z=ye.position.z,X.fx=R.x/rt,X.fz=R.z/rt}if(ct.update(j,{lis:X,animals:N,cabin:y||M?1:0,day:1-z.n,night:z.n,rain:ot.inside?0:at.cur.rain,wind:ot.inside?0:Math.max(at.cur.snow,at.cur.fog*.5),siren:P.siren,music:tt.musicLevel,inside:!!ot.inside,hour:z.hour,open:!!l&&Math.hypot(It.x-(((jt=s.plaza)==null?void 0:jt.start)||s.spawn)[0],It.z-(((we=s.plaza)==null?void 0:we.start)||s.spawn)[1])>500&&!(I!=null&&I.villageAt(It.x,It.z,450))}),(pt-=j)<=0&&(pt=10,kt()),o){const rt=Math.hypot(It.x-o.x,It.z-o.z);if(Mt-=j,rt<32&&Mt<=0&&!gt&&$.ctx&&(gt={t:0,next:0,k:0},Mt=90),gt){if(gt.t+=j,gt.t>=gt.next&&gt.k<8){const re=(gt.k%2?.3:.38)/(1+rt/25);$.bell(233,re),gt.k++,gt.next+=1.25+Math.random()*.1}o.bells.forEach((re,ue)=>{re.rotation.x=Math.sin(gt.t*3.7+ue*1.3)*.9*Math.min(1,(11-gt.t)/2)}),gt.t>11&&(gt=null,o.bells.forEach(re=>re.rotation.x=0))}}_n.position.copy(It).addScaledVector(z.light,200),_n.target.position.copy(It),et.update(!!M||!!(p!=null&&p.engine),M?M.throttle:0,M?Math.abs(M.speed):0),M?$.update(!1,0,0,1):$.update(!!y,y?y.speed:0,y?Ue.axes().y:0,y?y.gear:1);const K=dt.offer||At.offer||it.offer||st.offer||null;((K==null?void 0:K.id)||null)!==vt.id&&(vt.id=(K==null?void 0:K.id)||null,vt.declined=!1),Ct=K&&!vt.declined?K:null;const J=Ct?Ct.text:"";vt.txt!==J&&(vt.txt=J,ht.classList.toggle("on",!!Ct),ht.querySelector("span").textContent=J),mt++&1||W.draw(It.x,It.z,M?M.heading:y?y.heading:m.heading,Et.yaw,v,y,{walkers:A,flags:[...dt.starts,...At.flags,...st.flags,...ot.flags,...p?[[p.f.park.x,p.f.park.z,"air"]]:[]],target:dt.target||At.target||it.target,route:dt.route||At.route,targetColor:dt.target?"#3aa0e2":At.active||it.state==="deliver"?"#47d16c":"#f5c542"}),ye.fov+=((y?60+Math.min(15,Math.abs(y.speed)*.5):60)-ye.fov)*Math.min(1,j*3),ye.updateProjectionMatrix(),y&&Rt.dataset.g!==String(y.gear)&&(Rt.dataset.g=y.gear,Rt.textContent=y.gear===1?"C":"L");const Dt=M?`✈ ${Math.round(M.altitude)} m · gas ${Math.round(M.throttle*100)} %`:y?`${y.gear===1?"Corta":"Larga"} · ${y.wrecked?"averiado":`daños ${Math.round(100-y.health)} %`} <span id="fuel"><i style="width:${Math.round(y.fuel*100)}%"></i></span>`:ot.inside?ot.inside.name:"A pie";if(Kr.mode.innerHTML!==Dt&&(Kr.mode.innerHTML=Dt),!(mt&15)){const rt=at.info.icon;lt.textContent!==rt&&(lt.textContent=rt)}mt&15||(Pt.textContent=(z.n>.5?"🌙 ":"")+z.clock),Kr.speed.textContent=M?`${Math.round(Math.abs(M.speed)*3.6)} km/h`:y?`${Math.round(Math.abs(y.speed)*3.6)} km/h`:"";const Ft=!y&&v.some(rt=>!rt.police&&!rt.forSale&&rt.pos.distanceTo(m.pos)<4.5);Kr.hint.textContent=P.bustT>.3?"🚓 ¡Te están deteniendo! Escapa":ot.hint||D||At.hint||(y&&y.fuel<=0?"Sin gasolina: bájate y busca otro vehículo":"")||(dt.nearOnFoot?"Necesitas un coche para la carrera":dt.nearName&&!dt.active?`🏁 ${dt.nearName}`:"")||(M&&M.onGround?M.canExit?Ue.touch?"Pulsa 🚪 para bajar · arriba para despegar":"E para bajar · W para despegar":"Rodando…":"")||(!y&&p&&p.pos.distanceTo(m.pos)<6?Ue.touch?"Pulsa 🚪 para subir a la avioneta":"E para subir a la avioneta":"")||(y!=null&&y.wrecked?"Coche averiado: bájate y coge otro":y?Ue.touch?"Pulsa 🚪 para bajar":"E para bajar":Ft?Ue.touch?"Pulsa 🚪 para subir":"E para subir":""),document.body.classList.toggle("driving",!!y||!!M),Ue.driving=!!y,Ue.endFrame(),dn.render(Kt,ye)}let Gt=0;function Bt(){try{St()}catch(j){Gt++<5&&console.error(j);try{Ue.endFrame()}catch{}}requestAnimationFrame(Bt)}window.__game={region:I,regionTraffic:F,plane:p,ambient:ct,engine:$,get flying(){return M},data:s,outer:l,weather:at,police:P,shops:st,jobs:At,plaza:tt,interiors:ot,save:kt,animals:N,player:m,cars:v,walkers:A,race:dt,camera:ye,scene:Kt,renderer:dn,terrain:t,dayNight:z,missions:it,get driving(){return y}},Bt()}).catch(s=>{console.error(s),document.getElementById("lmsg").textContent="Error cargando: "+s.message});addEventListener("resize",()=>{ye.aspect=innerWidth/innerHeight,ye.updateProjectionMatrix(),dn.setSize(innerWidth,innerHeight)});

import{A as rt,z as ze,p as st,l as X,c as $,y as Q,u as F,D as ot,v as ct,S as ae,r as it,w as at,T as lt}from"./vue.esm-bundler-FW-u_CMv.js";import{_ as ut}from"./_plugin-vue_export-helper-DlAUqK2U.js";/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const L=typeof document<"u";function Ke(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function ft(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&Ke(e.default)}const w=Object.assign;function le(e,t){const n={};for(const r in t){const o=t[r];n[r]=I(o)?o.map(e):e(o)}return n}const W=()=>{},I=Array.isArray,Le=/#/g,ht=/&/g,dt=/\//g,pt=/=/g,mt=/\?/g,qe=/\+/g,gt=/%5B/g,yt=/%5D/g,He=/%5E/g,vt=/%60/g,Ge=/%7B/g,Rt=/%7C/g,De=/%7D/g,Et=/%20/g;function ge(e){return encodeURI(""+e).replace(Rt,"|").replace(gt,"[").replace(yt,"]")}function Pt(e){return ge(e).replace(Ge,"{").replace(De,"}").replace(He,"^")}function de(e){return ge(e).replace(qe,"%2B").replace(Et,"+").replace(Le,"%23").replace(ht,"%26").replace(vt,"`").replace(Ge,"{").replace(De,"}").replace(He,"^")}function bt(e){return de(e).replace(pt,"%3D")}function St(e){return ge(e).replace(Le,"%23").replace(mt,"%3F")}function wt(e){return e==null?"":St(e).replace(dt,"%2F")}function Y(e){try{return decodeURIComponent(""+e)}catch{}return""+e}const kt=/\/$/,Ct=e=>e.replace(kt,"");function ue(e,t,n="/"){let r,o={},l="",p="";const h=t.indexOf("#");let i=t.indexOf("?");return h<i&&h>=0&&(i=-1),i>-1&&(r=t.slice(0,i),l=t.slice(i+1,h>-1?h:t.length),o=e(l)),h>-1&&(r=r||t.slice(0,h),p=t.slice(h,t.length)),r=xt(r??t,n),{fullPath:r+(l&&"?")+l+p,path:r,query:o,hash:Y(p)}}function At(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function _t(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&q(t.matched[r],n.matched[o])&&Ue(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function q(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Ue(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!Ot(e[n],t[n]))return!1;return!0}function Ot(e,t){return I(e)?we(e,t):I(t)?we(t,e):e===t}function we(e,t){return I(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function xt(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];(o===".."||o===".")&&r.push("");let l=n.length-1,p,h;for(p=0;p<r.length;p++)if(h=r[p],h!==".")if(h==="..")l>1&&l--;else break;return n.slice(0,l).join("/")+"/"+r.slice(p).join("/")}const B={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var Z;(function(e){e.pop="pop",e.push="push"})(Z||(Z={}));var te;(function(e){e.back="back",e.forward="forward",e.unknown=""})(te||(te={}));const fe="";function Mt(e){if(!e)if(L){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),Ct(e)}const Tt=/^[^#]+#/;function It(e,t){return e.replace(Tt,"#")+t}function $t(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const Nt=()=>({left:window.scrollX,top:window.scrollY});function jt(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=$t(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function ke(e,t){return(history.state?history.state.position-t:-1)+e}const pe=new Map;function Bt(e,t){pe.set(e,t)}function Vt(e){const t=pe.get(e);return pe.delete(e),t}function bn(e=""){let t=[],n=[fe],r=0;e=Mt(e);function o(h){r++,r!==n.length&&n.splice(r),n.push(h)}function l(h,i,{direction:a,delta:d}){const c={direction:a,delta:d,type:Z.pop};for(const m of t)m(h,i,c)}const p={location:fe,state:{},base:e,createHref:It.bind(null,e),replace(h){n.splice(r--,1),o(h)},push(h,i){o(h)},listen(h){return t.push(h),()=>{const i=t.indexOf(h);i>-1&&t.splice(i,1)}},destroy(){t=[],n=[fe],r=0},go(h,i=!0){const a=this.location,d=h<0?te.back:te.forward;r=Math.max(0,Math.min(r+h,n.length-1)),i&&l(this.location,a,{direction:d,delta:h})}};return Object.defineProperty(p,"location",{enumerable:!0,get:()=>n[r]}),p}function zt(e){return typeof e=="string"||e&&typeof e=="object"}function Qe(e){return typeof e=="string"||typeof e=="symbol"}const Fe=Symbol("");var Ce;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(Ce||(Ce={}));function H(e,t){return w(new Error,{type:e,[Fe]:!0},t)}function N(e,t){return e instanceof Error&&Fe in e&&(t==null||!!(e.type&t))}const Ae="[^/]+?",Kt={sensitive:!1,strict:!1,start:!0,end:!0},Lt=/[.+*?^${}()[\]/\\]/g;function qt(e,t){const n=w({},Kt,t),r=[];let o=n.start?"^":"";const l=[];for(const a of e){const d=a.length?[]:[90];n.strict&&!a.length&&(o+="/");for(let c=0;c<a.length;c++){const m=a[c];let u=40+(n.sensitive?.25:0);if(m.type===0)c||(o+="/"),o+=m.value.replace(Lt,"\\$&"),u+=40;else if(m.type===1){const{value:k,repeatable:S,optional:O,regexp:C}=m;l.push({name:k,repeatable:S,optional:O});const E=C||Ae;if(E!==Ae){u+=10;try{new RegExp(`(${E})`)}catch(T){throw new Error(`Invalid custom RegExp for param "${k}" (${E}): `+T.message)}}let P=S?`((?:${E})(?:/(?:${E}))*)`:`(${E})`;c||(P=O&&a.length<2?`(?:/${P})`:"/"+P),O&&(P+="?"),o+=P,u+=20,O&&(u+=-8),S&&(u+=-20),E===".*"&&(u+=-50)}d.push(u)}r.push(d)}if(n.strict&&n.end){const a=r.length-1;r[a][r[a].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&!o.endsWith("/")&&(o+="(?:/|$)");const p=new RegExp(o,n.sensitive?"":"i");function h(a){const d=a.match(p),c={};if(!d)return null;for(let m=1;m<d.length;m++){const u=d[m]||"",k=l[m-1];c[k.name]=u&&k.repeatable?u.split("/"):u}return c}function i(a){let d="",c=!1;for(const m of e){(!c||!d.endsWith("/"))&&(d+="/"),c=!1;for(const u of m)if(u.type===0)d+=u.value;else if(u.type===1){const{value:k,repeatable:S,optional:O}=u,C=k in a?a[k]:"";if(I(C)&&!S)throw new Error(`Provided param "${k}" is an array but it is not repeatable (* or + modifiers)`);const E=I(C)?C.join("/"):C;if(!E)if(O)m.length<2&&(d.endsWith("/")?d=d.slice(0,-1):c=!0);else throw new Error(`Missing required param "${k}"`);d+=E}}return d||"/"}return{re:p,score:r,keys:l,parse:h,stringify:i}}function Ht(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function We(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const l=Ht(r[n],o[n]);if(l)return l;n++}if(Math.abs(o.length-r.length)===1){if(_e(r))return 1;if(_e(o))return-1}return o.length-r.length}function _e(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Gt={type:0,value:""},Dt=/[a-zA-Z0-9_]/;function Ut(e){if(!e)return[[]];if(e==="/")return[[Gt]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(u){throw new Error(`ERR (${n})/"${a}": ${u}`)}let n=0,r=n;const o=[];let l;function p(){l&&o.push(l),l=[]}let h=0,i,a="",d="";function c(){a&&(n===0?l.push({type:0,value:a}):n===1||n===2||n===3?(l.length>1&&(i==="*"||i==="+")&&t(`A repeatable param (${a}) must be alone in its segment. eg: '/:ids+.`),l.push({type:1,value:a,regexp:d,repeatable:i==="*"||i==="+",optional:i==="*"||i==="?"})):t("Invalid state to consume buffer"),a="")}function m(){a+=i}for(;h<e.length;){if(i=e[h++],i==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:i==="/"?(a&&c(),p()):i===":"?(c(),n=1):m();break;case 4:m(),n=r;break;case 1:i==="("?n=2:Dt.test(i)?m():(c(),n=0,i!=="*"&&i!=="?"&&i!=="+"&&h--);break;case 2:i===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+i:n=3:d+=i;break;case 3:c(),n=0,i!=="*"&&i!=="?"&&i!=="+"&&h--,d="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${a}"`),c(),p(),o}function Qt(e,t,n){const r=qt(Ut(e.path),n),o=w(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function Ft(e,t){const n=[],r=new Map;t=Te({strict:!1,end:!0,sensitive:!1},t);function o(c){return r.get(c)}function l(c,m,u){const k=!u,S=xe(c);S.aliasOf=u&&u.record;const O=Te(t,c),C=[S];if("alias"in c){const T=typeof c.alias=="string"?[c.alias]:c.alias;for(const z of T)C.push(xe(w({},S,{components:u?u.record.components:S.components,path:z,aliasOf:u?u.record:S})))}let E,P;for(const T of C){const{path:z}=T;if(m&&z[0]!=="/"){const j=m.record.path,M=j[j.length-1]==="/"?"":"/";T.path=m.record.path+(z&&M+z)}if(E=Qt(T,m,O),u?u.alias.push(E):(P=P||E,P!==E&&P.alias.push(E),k&&c.name&&!Me(E)&&p(c.name)),Xe(E)&&i(E),S.children){const j=S.children;for(let M=0;M<j.length;M++)l(j[M],E,u&&u.children[M])}u=u||E}return P?()=>{p(P)}:W}function p(c){if(Qe(c)){const m=r.get(c);m&&(r.delete(c),n.splice(n.indexOf(m),1),m.children.forEach(p),m.alias.forEach(p))}else{const m=n.indexOf(c);m>-1&&(n.splice(m,1),c.record.name&&r.delete(c.record.name),c.children.forEach(p),c.alias.forEach(p))}}function h(){return n}function i(c){const m=Yt(c,n);n.splice(m,0,c),c.record.name&&!Me(c)&&r.set(c.record.name,c)}function a(c,m){let u,k={},S,O;if("name"in c&&c.name){if(u=r.get(c.name),!u)throw H(1,{location:c});O=u.record.name,k=w(Oe(m.params,u.keys.filter(P=>!P.optional).concat(u.parent?u.parent.keys.filter(P=>P.optional):[]).map(P=>P.name)),c.params&&Oe(c.params,u.keys.map(P=>P.name))),S=u.stringify(k)}else if(c.path!=null)S=c.path,u=n.find(P=>P.re.test(S)),u&&(k=u.parse(S),O=u.record.name);else{if(u=m.name?r.get(m.name):n.find(P=>P.re.test(m.path)),!u)throw H(1,{location:c,currentLocation:m});O=u.record.name,k=w({},m.params,c.params),S=u.stringify(k)}const C=[];let E=u;for(;E;)C.unshift(E.record),E=E.parent;return{name:O,path:S,params:k,matched:C,meta:Xt(C)}}e.forEach(c=>l(c));function d(){n.length=0,r.clear()}return{addRoute:l,resolve:a,removeRoute:p,clearRoutes:d,getRoutes:h,getRecordMatcher:o}}function Oe(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function xe(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:Wt(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function Wt(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function Me(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Xt(e){return e.reduce((t,n)=>w(t,n.meta),{})}function Te(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function Yt(e,t){let n=0,r=t.length;for(;n!==r;){const l=n+r>>1;We(e,t[l])<0?r=l:n=l+1}const o=Zt(e);return o&&(r=t.lastIndexOf(o,r-1)),r}function Zt(e){let t=e;for(;t=t.parent;)if(Xe(t)&&We(e,t)===0)return t}function Xe({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function Jt(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<r.length;++o){const l=r[o].replace(qe," "),p=l.indexOf("="),h=Y(p<0?l:l.slice(0,p)),i=p<0?null:Y(l.slice(p+1));if(h in t){let a=t[h];I(a)||(a=t[h]=[a]),a.push(i)}else t[h]=i}return t}function Ie(e){let t="";for(let n in e){const r=e[n];if(n=bt(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(I(r)?r.map(l=>l&&de(l)):[r&&de(r)]).forEach(l=>{l!==void 0&&(t+=(t.length?"&":"")+n,l!=null&&(t+="="+l))})}return t}function en(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=I(r)?r.map(o=>o==null?null:""+o):r==null?r:""+r)}return t}const tn=Symbol(""),$e=Symbol(""),ye=Symbol(""),Ye=Symbol(""),me=Symbol("");function U(){let e=[];function t(r){return e.push(r),()=>{const o=e.indexOf(r);o>-1&&e.splice(o,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function V(e,t,n,r,o,l=p=>p()){const p=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise((h,i)=>{const a=m=>{m===!1?i(H(4,{from:n,to:t})):m instanceof Error?i(m):zt(m)?i(H(2,{from:t,to:m})):(p&&r.enterCallbacks[o]===p&&typeof m=="function"&&p.push(m),h())},d=l(()=>e.call(r&&r.instances[o],t,n,a));let c=Promise.resolve(d);e.length<3&&(c=c.then(a)),c.catch(m=>i(m))})}function he(e,t,n,r,o=l=>l()){const l=[];for(const p of e)for(const h in p.components){let i=p.components[h];if(!(t!=="beforeRouteEnter"&&!p.instances[h]))if(Ke(i)){const d=(i.__vccOpts||i)[t];d&&l.push(V(d,n,r,p,h,o))}else{let a=i();l.push(()=>a.then(d=>{if(!d)throw new Error(`Couldn't resolve component "${h}" at "${p.path}"`);const c=ft(d)?d.default:d;p.mods[h]=d,p.components[h]=c;const u=(c.__vccOpts||c)[t];return u&&V(u,n,r,p,h,o)()}))}}return l}function Ne(e){const t=X(ye),n=X(Ye),r=$(()=>{const i=F(e.to);return t.resolve(i)}),o=$(()=>{const{matched:i}=r.value,{length:a}=i,d=i[a-1],c=n.matched;if(!d||!c.length)return-1;const m=c.findIndex(q.bind(null,d));if(m>-1)return m;const u=je(i[a-2]);return a>1&&je(d)===u&&c[c.length-1].path!==u?c.findIndex(q.bind(null,i[a-2])):m}),l=$(()=>o.value>-1&&on(n.params,r.value.params)),p=$(()=>o.value>-1&&o.value===n.matched.length-1&&Ue(n.params,r.value.params));function h(i={}){if(sn(i)){const a=t[F(e.replace)?"replace":"push"](F(e.to)).catch(W);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>a),a}return Promise.resolve()}return{route:r,href:$(()=>r.value.href),isActive:l,isExactActive:p,navigate:h}}function nn(e){return e.length===1?e[0]:e}const rn=ze({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Ne,setup(e,{slots:t}){const n=st(Ne(e)),{options:r}=X(ye),o=$(()=>({[Be(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Be(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const l=t.default&&nn(t.default(n));return e.custom?l:Q("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},l)}}}),Ze=rn;function sn(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function on(e,t){for(const n in t){const r=t[n],o=e[n];if(typeof r=="string"){if(r!==o)return!1}else if(!I(o)||o.length!==r.length||r.some((l,p)=>l!==o[p]))return!1}return!0}function je(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Be=(e,t,n)=>e??t??n,cn=ze({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=X(me),o=$(()=>e.route||r.value),l=X($e,0),p=$(()=>{let a=F(l);const{matched:d}=o.value;let c;for(;(c=d[a])&&!c.components;)a++;return a}),h=$(()=>o.value.matched[p.value]);ae($e,$(()=>p.value+1)),ae(tn,h),ae(me,o);const i=it();return at(()=>[i.value,h.value,e.name],([a,d,c],[m,u,k])=>{d&&(d.instances[c]=a,u&&u!==d&&a&&a===m&&(d.leaveGuards.size||(d.leaveGuards=u.leaveGuards),d.updateGuards.size||(d.updateGuards=u.updateGuards))),a&&d&&(!u||!q(d,u)||!m)&&(d.enterCallbacks[c]||[]).forEach(S=>S(a))},{flush:"post"}),()=>{const a=o.value,d=e.name,c=h.value,m=c&&c.components[d];if(!m)return Ve(n.default,{Component:m,route:a});const u=c.props[d],k=u?u===!0?a.params:typeof u=="function"?u(a):u:null,O=Q(m,w({},k,t,{onVnodeUnmounted:C=>{C.component.isUnmounted&&(c.instances[d]=null)},ref:i}));return Ve(n.default,{Component:O,route:a})||O}}});function Ve(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const an=cn;function Sn(e){const t=Ft(e.routes,e),n=e.parseQuery||Jt,r=e.stringifyQuery||Ie,o=e.history,l=U(),p=U(),h=U(),i=rt(B);let a=B;L&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=le.bind(null,s=>""+s),c=le.bind(null,wt),m=le.bind(null,Y);function u(s,g){let f,y;return Qe(s)?(f=t.getRecordMatcher(s),y=g):y=s,t.addRoute(y,f)}function k(s){const g=t.getRecordMatcher(s);g&&t.removeRoute(g)}function S(){return t.getRoutes().map(s=>s.record)}function O(s){return!!t.getRecordMatcher(s)}function C(s,g){if(g=w({},g||i.value),typeof s=="string"){const v=ue(n,s,g.path),_=t.resolve({path:v.path},g),D=o.createHref(v.fullPath);return w(v,_,{params:m(_.params),hash:Y(v.hash),redirectedFrom:void 0,href:D})}let f;if(s.path!=null)f=w({},s,{path:ue(n,s.path,g.path).path});else{const v=w({},s.params);for(const _ in v)v[_]==null&&delete v[_];f=w({},s,{params:c(v)}),g.params=c(g.params)}const y=t.resolve(f,g),b=s.hash||"";y.params=d(m(y.params));const A=At(r,w({},s,{hash:Pt(b),path:y.path})),R=o.createHref(A);return w({fullPath:A,hash:b,query:r===Ie?en(s.query):s.query||{}},y,{redirectedFrom:void 0,href:R})}function E(s){return typeof s=="string"?ue(n,s,i.value.path):w({},s)}function P(s,g){if(a!==s)return H(8,{from:g,to:s})}function T(s){return M(s)}function z(s){return T(w(E(s),{replace:!0}))}function j(s){const g=s.matched[s.matched.length-1];if(g&&g.redirect){const{redirect:f}=g;let y=typeof f=="function"?f(s):f;return typeof y=="string"&&(y=y.includes("?")||y.includes("#")?y=E(y):{path:y},y.params={}),w({query:s.query,hash:s.hash,params:y.path!=null?{}:s.params},y)}}function M(s,g){const f=a=C(s),y=i.value,b=s.state,A=s.force,R=s.replace===!0,v=j(f);if(v)return M(w(E(v),{state:typeof v=="object"?w({},b,v.state):b,force:A,replace:R}),g||f);const _=f;_.redirectedFrom=g;let D;return!A&&_t(r,y,f)&&(D=H(16,{to:_,from:y}),be(y,y,!0,!1)),(D?Promise.resolve(D):ve(_,y)).catch(x=>N(x)?N(x,2)?x:oe(x):se(x,_,y)).then(x=>{if(x){if(N(x,2))return M(w({replace:R},E(x.to),{state:typeof x.to=="object"?w({},b,x.to.state):b,force:A}),g||_)}else x=Ee(_,y,!0,R,b);return Re(_,y,x),x})}function et(s,g){const f=P(s,g);return f?Promise.reject(f):Promise.resolve()}function ne(s){const g=ee.values().next().value;return g&&typeof g.runWithContext=="function"?g.runWithContext(s):s()}function ve(s,g){let f;const[y,b,A]=ln(s,g);f=he(y.reverse(),"beforeRouteLeave",s,g);for(const v of y)v.leaveGuards.forEach(_=>{f.push(V(_,s,g))});const R=et.bind(null,s,g);return f.push(R),K(f).then(()=>{f=[];for(const v of l.list())f.push(V(v,s,g));return f.push(R),K(f)}).then(()=>{f=he(b,"beforeRouteUpdate",s,g);for(const v of b)v.updateGuards.forEach(_=>{f.push(V(_,s,g))});return f.push(R),K(f)}).then(()=>{f=[];for(const v of A)if(v.beforeEnter)if(I(v.beforeEnter))for(const _ of v.beforeEnter)f.push(V(_,s,g));else f.push(V(v.beforeEnter,s,g));return f.push(R),K(f)}).then(()=>(s.matched.forEach(v=>v.enterCallbacks={}),f=he(A,"beforeRouteEnter",s,g,ne),f.push(R),K(f))).then(()=>{f=[];for(const v of p.list())f.push(V(v,s,g));return f.push(R),K(f)}).catch(v=>N(v,8)?v:Promise.reject(v))}function Re(s,g,f){h.list().forEach(y=>ne(()=>y(s,g,f)))}function Ee(s,g,f,y,b){const A=P(s,g);if(A)return A;const R=g===B,v=L?history.state:{};f&&(y||R?o.replace(s.fullPath,w({scroll:R&&v&&v.scroll},b)):o.push(s.fullPath,b)),i.value=s,be(s,g,f,R),oe()}let G;function tt(){G||(G=o.listen((s,g,f)=>{if(!Se.listening)return;const y=C(s),b=j(y);if(b){M(w(b,{replace:!0,force:!0}),y).catch(W);return}a=y;const A=i.value;L&&Bt(ke(A.fullPath,f.delta),Nt()),ve(y,A).catch(R=>N(R,12)?R:N(R,2)?(M(w(E(R.to),{force:!0}),y).then(v=>{N(v,20)&&!f.delta&&f.type===Z.pop&&o.go(-1,!1)}).catch(W),Promise.reject()):(f.delta&&o.go(-f.delta,!1),se(R,y,A))).then(R=>{R=R||Ee(y,A,!1),R&&(f.delta&&!N(R,8)?o.go(-f.delta,!1):f.type===Z.pop&&N(R,20)&&o.go(-1,!1)),Re(y,A,R)}).catch(W)}))}let re=U(),Pe=U(),J;function se(s,g,f){oe(s);const y=Pe.list();return y.length?y.forEach(b=>b(s,g,f)):console.error(s),Promise.reject(s)}function nt(){return J&&i.value!==B?Promise.resolve():new Promise((s,g)=>{re.add([s,g])})}function oe(s){return J||(J=!s,tt(),re.list().forEach(([g,f])=>s?f(s):g()),re.reset()),s}function be(s,g,f,y){const{scrollBehavior:b}=e;if(!L||!b)return Promise.resolve();const A=!f&&Vt(ke(s.fullPath,0))||(y||!f)&&history.state&&history.state.scroll||null;return ct().then(()=>b(s,g,A)).then(R=>R&&jt(R)).catch(R=>se(R,s,g))}const ce=s=>o.go(s);let ie;const ee=new Set,Se={currentRoute:i,listening:!0,addRoute:u,removeRoute:k,clearRoutes:t.clearRoutes,hasRoute:O,getRoutes:S,resolve:C,options:e,push:T,replace:z,go:ce,back:()=>ce(-1),forward:()=>ce(1),beforeEach:l.add,beforeResolve:p.add,afterEach:h.add,onError:Pe.add,isReady:nt,install(s){const g=this;s.component("RouterLink",Ze),s.component("RouterView",an),s.config.globalProperties.$router=g,Object.defineProperty(s.config.globalProperties,"$route",{enumerable:!0,get:()=>F(i)}),L&&!ie&&i.value===B&&(ie=!0,T(o.location).catch(b=>{}));const f={};for(const b in B)Object.defineProperty(f,b,{get:()=>i.value[b],enumerable:!0});s.provide(ye,g),s.provide(Ye,ot(f)),s.provide(me,i);const y=s.unmount;ee.add(s),s.unmount=function(){ee.delete(s),ee.size<1&&(a=B,G&&G(),G=null,i.value=B,ie=!1,J=!1),y()}}};function K(s){return s.reduce((g,f)=>g.then(()=>ne(f)),Promise.resolve())}return Se}function ln(e,t){const n=[],r=[],o=[],l=Math.max(t.matched.length,e.matched.length);for(let p=0;p<l;p++){const h=t.matched[p];h&&(e.matched.find(a=>q(a,h))?r.push(h):n.push(h));const i=e.matched[p];i&&(t.matched.find(a=>q(a,i))||o.push(i))}return[n,r,o]}const Je=(e,t)=>{const{type:n,color:r,route:o}=e,{slots:l,attrs:p,emit:h}=t,i=lt(),a={...p,class:["kx-btn",i[r],i[n]]};if(p.disabled&&a.class.push(i.disabled),a.onMouseup=d=>{h("mouseup",d),d.currentTarget.blur()},!l.default)throw new Error("按钮必须有内容");return e.href!==void 0?(a.href=e.href,Q("a",a,l.default())):o!==void 0?(a.to=o,Q(Ze,a,l)):(a.type="button",Q("button",a,l.default()))};Je.props={type:String,color:String,href:String,route:String};const un="ihKCA",fn="_7yvi0",hn="FLDt9",dn="SiI85",pn="yNBCv",mn="jVjhc",gn="mT9k2",yn="Xl359",vn={"line-clamp":"_1--Vb",outline:un,text:fn,icon:hn,primary:dn,second:pn,info:mn,dangerous:gn,disabled:yn},Rn={$style:vn},wn=ut(Je,[["__cssModules",Rn]]);export{wn as K,bn as a,Sn as c};
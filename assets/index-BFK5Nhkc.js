import{b as c,d as i,e as u}from"./vue.esm-bundler-FW-u_CMv.js";import{n as a}from"./index-BeRudJ4f.js";function m(o){return c(()=>({get:()=>o,set:e=>{o=e}}))}const r=Symbol("PreventScrollCounter"),s=Symbol("PreventScrollBackup");function l(o=document.body){const e=o;i(()=>{const t=e[r]??0;if(e[r]=t+1,t>0)return;const{style:n}=e;e[s]={maxHeight:n.maxHeight,maxWidth:n.maxWidth,overflow:n.overflow},n.maxHeight="100%",n.maxWidth="100%",n.overflow="hidden"}),u(()=>{(e[r]-=1)>0||Object.assign(e.style,e[s])})}function p(o,e){if(typeof window>"u")return a;const t=new IntersectionObserver(o,e);return n=>{if(!n)return t.disconnect();t.observe("$el"in n?n.$el:n)}}export{l as a,m as p,p as u};
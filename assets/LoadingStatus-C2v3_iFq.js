import{f as o,h as a,j as t,z as y,U as r,V as i,n as s,u as p}from"./vue.esm-bundler-FW-u_CMv.js";import{_ as d}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{A as m}from"./AtomSpinner-BE_QQ1OP.js";const f={},g={width:"1em",height:"1em",fill:"currentColor",class:"bi bi-arrow-clockwise",viewBox:"0 0 16 16"};function k(u,e){return o(),a("svg",g,e[0]||(e[0]=[t("path",{"fill-rule":"evenodd",d:"M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"},null,-1),t("path",{d:"M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"},null,-1)]))}const h=d(f,[["render",k]]),l=y({__name:"LoadingStatus",props:{error:{},onRetry:{type:Function}},setup(u){return(e,n)=>e.error&&e.onRetry?(o(),a("div",{key:0,class:s(e.$style.container)},[n[2]||(n[2]=r(" 加载失败，请 ")),t("a",{class:"error highlight",onClick:n[0]||(n[0]=(...c)=>e.onRetry&&e.onRetry(...c))},[i(p(h),{class:s(e.$style.icon)},null,8,["class"]),n[1]||(n[1]=r(" 重试 "))])],2)):e.error?(o(),a("div",{key:1,class:s(e.$style.failed)}," 加载失败！ ",2)):(o(),a("div",{key:2,class:s(e.$style.loading)},[i(m),t("span",{class:s(e.$style.text)},"加载中......",2)],2))}}),b="QMyAy",v="oUlLr QMyAy error",w="Ubybz QMyAy",R="KS9Bl",M="RZ8Ma",q={"line-clamp":"o2PMe",container:b,failed:v,loading:w,text:R,icon:M},A={$style:q},V=d(l,[["__cssModules",A]]);l.__docgenInfo={exportName:"default",displayName:"LoadingStatus",type:1,props:[{name:"error",global:!1,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey | undefined",declarations:[],schema:{kind:"enum",type:"PropertyKey | undefined",schema:["undefined","string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef | undefined",declarations:[],schema:{kind:"enum",type:"VNodeRef | undefined",schema:["undefined","string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any> | null, refs: Record<...>): void"}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"}],events:[],slots:[],exposed:[{name:"error",type:"unknown",description:"",declarations:[],schema:"unknown"},{name:"onRetry",type:"(() => void) | undefined",description:"",declarations:[],schema:{kind:"enum",type:"(() => void) | undefined",schema:["undefined",{kind:"event",type:"(): void"}]}}],sourceFiles:"/home/runner/work/uikit/uikit/src/components/LoadingStatus.vue"};export{V as L};
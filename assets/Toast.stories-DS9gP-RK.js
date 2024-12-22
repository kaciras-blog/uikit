import{M as r,C as x,b as K}from"./quick-alert-BR3-N5_h.js";import{K as v}from"./KxButton-BYZx_vn4.js";import{f as s,h as o,j as d,z as M,d as B,J as C,n as l,L as I,C as q,V as k,Y as L,u as h,D as P,G as E,F as N,K as R}from"./vue.esm-bundler-FW-u_CMv.js";import{_ as i}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{u as S}from"./LRUCache-nrA0TT2c.js";import"./autofocus-C8NzL-9U.js";const V={},z={width:"1em",height:"1em",fill:"currentColor",class:"bi bi-info-circle-fill",viewBox:"0 0 16 16"};function W(a,e){return s(),o("svg",z,e[0]||(e[0]=[d("path",{d:"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"},null,-1)]))}const Y=i(V,[["render",W]]),O={},F={width:"1em",height:"1em",fill:"currentColor",class:"bi bi-check-circle-fill",viewBox:"0 0 16 16"};function A(a,e){return s(),o("svg",F,e[0]||(e[0]=[d("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"},null,-1)]))}const D=i(O,[["render",A]]),H={},j={width:"1em",height:"1em",fill:"currentColor",class:"bi bi-exclamation-triangle-fill",viewBox:"0 0 16 16"};function G(a,e){return s(),o("svg",j,e[0]||(e[0]=[d("path",{d:"M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"},null,-1)]))}const J=i(H,[["render",G]]),U={},Q={width:"1em",height:"1em",fill:"currentColor",class:"bi bi-x-circle-fill",viewBox:"0 0 16 16"};function X(a,e){return s(),o("svg",Q,e[0]||(e[0]=[d("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"},null,-1)]))}const Z=i(U,[["render",X]]),T=M({__name:"KxToast",props:{type:{},delay:{default:5e3},content:{}},emits:["close"],setup(a,{emit:e}){const p={[r.Info]:Y,[r.Success]:D,[r.Warning]:J,[r.Error]:Z},f=a,c=e;let n=!1,y=!1;function u(){n=!0}function g(){y&&c("close"),n=!1}function _(){n?y=!0:c("close")}return B(()=>setTimeout(_,f.delay)),(t,b)=>(s(),o("div",{class:l([t.$style.container,t.$style[h(r)[t.type]]]),onMouseenter:u,onMouseleave:g},[(s(),C(I(p[t.type]),{class:l(t.$style.icon)},null,8,["class"])),d("div",{class:l(t.$style.body)},q(t.content),3),k(v,{class:l(t.$style.close),type:"icon",title:"关闭",onClick:b[0]||(b[0]=pe=>c("close"))},{default:L(()=>[k(h(x))]),_:1},8,["class"])],34))}}),ee="IyrVy",ne="uF7gL",se="_1VM4o",te="zt-KY",oe="uBKdz",ae="U6cYY",re="P0OsY",ie={"line-clamp":"vWx0h",container:ee,"fade-in":"srRS-",icon:ne,body:se,close:te,Info:oe,Success:ae,Warning:re,Error:"iYCHl"},ce={$style:ie},w=i(T,[["__cssModules",ce]]);T.__docgenInfo={exportName:"default",displayName:"KxToast",type:1,props:[{name:"type",global:!1,description:"",tags:[],required:!0,type:"MessageType",declarations:[],schema:{kind:"enum",type:"MessageType",schema:["MessageType.Info","MessageType.Success","MessageType.Warning","MessageType.Error"]}},{name:"delay",global:!1,description:"",tags:[],required:!1,type:"number | undefined",declarations:[],schema:{kind:"enum",type:"number | undefined",schema:["undefined","number"]},default:"5000"},{name:"content",global:!1,description:"",tags:[],required:!0,type:"string",declarations:[],schema:"string"},{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey | undefined",declarations:[],schema:{kind:"enum",type:"PropertyKey | undefined",schema:["undefined","string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef | undefined",declarations:[],schema:{kind:"enum",type:"VNodeRef | undefined",schema:["undefined","string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any> | null, refs: Record<...>): void"}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"}],events:[{name:"close",description:"",tags:[],type:"any[]",signature:'(event: "close", ...args: any[]): void',declarations:[],schema:["any"]}],slots:[],exposed:[{name:"delay",type:"number",description:"",declarations:[],schema:"number"},{name:"type",type:"MessageType",description:"",declarations:[],schema:{kind:"enum",type:"MessageType",schema:["MessageType.Info","MessageType.Success","MessageType.Warning","MessageType.Error"]}},{name:"content",type:"string",description:"",declarations:[],schema:"string"}],sourceFiles:"/home/runner/work/uikit/uikit/src/dialog/KxToast.vue"};const $=M({__name:"ToastContainer",setup(a){const e=P([]);function p(n){e.splice(n,1)}function f(){e.splice(0,e.length)}function c(n){n.id=S(),e.push(n)}return K().mountPoint={push:c,clear:f},(n,y)=>(s(),o("div",{class:l(n.$style.container)},[(s(!0),o(E,null,N(h(e),(u,g)=>(s(),C(w,R({key:u.id,ref_for:!0},u,{onClose:_=>p(g)}),null,16,["onClose"]))),128))],2))}}),le="KMPvE",de={"line-clamp":"co3DY",container:le},ue={$style:de},me=i($,[["__cssModules",ue]]);$.__docgenInfo={exportName:"default",displayName:"ToastContainer",type:1,props:[{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey | undefined",declarations:[],schema:{kind:"enum",type:"PropertyKey | undefined",schema:["undefined","string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef | undefined",declarations:[],schema:{kind:"enum",type:"VNodeRef | undefined",schema:["undefined","string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any> | null, refs: Record<...>): void"}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/uikit/uikit/src/dialog/ToastContainer.vue"};const ke={component:w},m=()=>({components:{KxButton:v,ToastContainer:me},template:`
        <KxButton @click="show">
            显示气泡通知
        </KxButton>
        <ToastContainer/>
    `,methods:{show(){this.$toast.show({type:r.Success,content:"评论提交成功！"})}}});m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => ({
  components: {
    KxButton,
    ToastContainer
  },
  template: \`
        <KxButton @click="show">
            显示气泡通知
        </KxButton>
        <ToastContainer/>
    \`,
  methods: {
    show() {
      this.$toast.show({
        type: MessageType.Success,
        content: "评论提交成功！"
      });
    }
  }
})`,...m.parameters?.docs?.source}}};const ve=["Toast"];export{m as Toast,ve as __namedExportsOrder,ke as default};

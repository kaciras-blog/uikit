import{s as p}from"./LRUCache-nrA0TT2c.js";import{z as m,r as f,X as y,J as g,Y as k,n as h,f as b,Q as o}from"./vue.esm-bundler-FW-u_CMv.js";import{K as C}from"./KxButton-BYZx_vn4.js";import{_ as B}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{n as T}from"./index-BeRudJ4f.js";const i=m({__name:"KxTaskButton",props:{type:{},color:{},route:{},onClick:{type:[Function,Array]}},setup(n){const t=f(!1);let s=new AbortController;y(()=>s.abort());function l(e){if(t.value)return s.abort();const{signal:r}=s=new AbortController,u=typeof n.onClick=="function"?n.onClick(e,r):Promise.all(n.onClick.map(c=>c(e,r)));t.value=!0,u.finally(()=>t.value=!1)}return(e,r)=>(b(),g(C,{class:h({[e.$style.running]:t.value}),route:e.route,type:e.type,color:e.color,onClick:l},{default:k(()=>[t.value?o(e.$slots,"running",{key:1},()=>[o(e.$slots,"default")]):o(e.$slots,"default",{key:0})]),_:3},8,["class","route","type","color"]))}}),v="NCV5P",K="bWO4D",_={"line-clamp":"_3zZ8z",running:v,barbershop:K},w={$style:_},d=B(i,[["__cssModules",w]]);i.__docgenInfo={exportName:"default",displayName:"KxTaskButton",type:1,props:[{name:"type",global:!1,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"color",global:!1,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"route",global:!1,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey | undefined",declarations:[],schema:{kind:"enum",type:"PropertyKey | undefined",schema:["undefined","string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef | undefined",declarations:[],schema:{kind:"enum",type:"VNodeRef | undefined",schema:["undefined","string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any> | null, refs: Record<...>): void"}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"}],events:[],slots:[{name:"default",type:"{}",description:"",declarations:[],schema:{kind:"object",type:"{}"}},{name:"running",type:"{}",description:"",declarations:[],schema:{kind:"object",type:"{}"}}],exposed:[{name:"type",type:"string | undefined",description:"",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"color",type:"string | undefined",description:"",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"route",type:"string | undefined",description:"",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"onClick",type:"TaskHandler | TaskHandler[]",description:"事件无法获取返回的 Promise 所以得用 props。",declarations:[],schema:{kind:"enum",type:"TaskHandler | TaskHandler[]",schema:[{kind:"event",type:"(event: Event, signal: AbortSignal): Promise<unknown>"},{kind:"array",type:"TaskHandler[]"}]}}],sourceFiles:"/home/runner/work/uikit/uikit/src/input/KxTaskButton.vue"};const N={component:d,args:{async:!0}},a=n=>({components:{KxTaskButton:d},template:`
        <KxTaskButton
            v-bind="args"
            :onClick='handleClick'
        >
            加载按钮
            <template #running>
                正在加载
            </template>
        </KxTaskButton>
    `,setup:()=>({args:n,handleClick(t,s){return n.async?p(3e3,s):T}})});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
  components: {
    KxTaskButton
  },
  template: \`
        <KxTaskButton
            v-bind="args"
            :onClick='handleClick'
        >
            加载按钮
            <template #running>
                正在加载
            </template>
        </KxTaskButton>
    \`,
  setup: () => ({
    args,
    handleClick(_: unknown, signal: AbortSignal) {
      return args.async ? sleep(3000, signal) : noop;
    }
  })
})`,...a.parameters?.docs?.source}}};const $=["TaskButton"];export{a as TaskButton,$ as __namedExportsOrder,N as default};

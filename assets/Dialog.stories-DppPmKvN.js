import{v as k}from"./v4-CQkTLCs1.js";import{z as B,r as C,J as b,Y as R,u as K,f as y,j as x,h as P,C as S,n as A,R as I}from"./vue.esm-bundler-FW-u_CMv.js";import{K as V,L as N}from"./LuckyNumberDialog-DqaZ3JXF.js";import{_ as j}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{K as h}from"./KxButton-BYZx_vn4.js";import{_}from"./DialogContainer-C9pebPWR.js";import"./quick-alert-BR3-N5_h.js";import"./autofocus-C8NzL-9U.js";import"./index-BFK5Nhkc.js";import"./index-BeRudJ4f.js";import"./dragging--sucj7sf.js";import"./LRUCache-nrA0TT2c.js";const{addons:T}=__STORYBOOK_MODULE_PREVIEW_API__,{ImplicitActionsDuringRendering:$}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__,{global:f}=__STORYBOOK_MODULE_GLOBAL__;var L="storybook/actions",q=`${L}/action-event`,M={depth:10,clearOnStoryChange:!0,limit:50},v=(e,o)=>{let t=Object.getPrototypeOf(e);return!t||o(t)?t:v(t,o)},Y=e=>!!(typeof e=="object"&&e&&v(e,o=>/^Synthetic(?:Base)?Event$/.test(o.constructor.name))&&typeof e.persist=="function"),z=e=>{if(Y(e)){let o=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));o.persist();let t=Object.getOwnPropertyDescriptor(o,"view"),n=t?.value;return typeof n=="object"&&n?.constructor.name==="Window"&&Object.defineProperty(o,"view",{...t,value:Object.create(n.constructor.prototype)}),o}return e},H=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?k():Date.now().toString(36)+Math.random().toString(36).substring(2);function d(e,o={}){let t={...M,...o},n=function(...i){if(o.implicit){let u=("__STORYBOOK_PREVIEW__"in f?f.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find(r=>r.phase==="playing"||r.phase==="rendering");if(u){let r=!window?.FEATURES?.disallowImplicitActionsInRenderV8,g=new $({phase:u.phase,name:e,deprecated:r});if(r)console.warn(g);else throw g}}let a=T.getChannel(),c=H(),w=5,m=i.map(z),O=i.length>1?m:m[0],E={id:c,count:0,data:{name:e,args:O},options:{...t,maxDepth:w+(t.depth||3),allowFunction:t.allowFunction||!1}};a.emit(q,E)};return n.isAction=!0,n.implicit=o.implicit,n}const D=B({__name:"HookedDialog",setup(e,{expose:o}){const t=C(0);function n(a){--t.value===0&&a(),setTimeout(()=>n(a),1e3)}function i(){return t.value=4,new Promise(n)}return o({beforeDialogClose:i}),(a,c)=>(y(),b(K(V),{title:"关闭钩子"},{default:R(()=>[c[0]||(c[0]=x("p",null,"beforeDialogClose() 返回 Promise 可以延迟窗口的关闭",-1)),t.value?(y(),P("p",{key:0,class:A(a.$style.timer)},"窗口将在 "+S(t.value)+" 秒后关闭",3)):I("",!0)]),_:1}))}}),W="_8EZas",F={timer:W},U={$style:F},G=j(D,[["__cssModules",U]]);D.__docgenInfo={exportName:"default",displayName:"HookedDialog",type:1,props:[{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey | undefined",declarations:[],schema:{kind:"enum",type:"PropertyKey | undefined",schema:["undefined","string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef | undefined",declarations:[],schema:{kind:"enum",type:"VNodeRef | undefined",schema:["undefined","string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any> | null, refs: Record<...>): void"}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"}],events:[],slots:[],exposed:[{name:"beforeDialogClose",type:"() => Promise<void>",description:"",declarations:[],schema:{kind:"event",type:"(): Promise<void>"}}],sourceFiles:"/home/runner/work/uikit/uikit/stories/dialog/HookedDialog.vue"};const ce={title:"Dialogs"},l=()=>({components:{KxButton:h,DialogContainer:_},template:`
        <KxButton @click="show">
            算一下幸运数字
        </KxButton>
        <DialogContainer/>
    `,methods:{show(){this.$dialog.show(N)}}}),s=e=>({template:`
        <div class="mock-dialog">
            <h1 class="mock-dialog-content">
                对话框框
            </h1>
            <KxDialogButtons
                :on-apply='applyEvent && apply'
                :on-cancel='cancelEvent && cancel'
                :on-accept='acceptEvent && accept'
            />
        </div>
    `,data:()=>e,methods:{apply:d("onApply"),cancel:d("onCancel"),accept:d("onAccept")}});s.parameters={actions:{handles:["onApply","onCancel","onAccept"]}};s.args={cancelEvent:!0,acceptEvent:!0,applyEvent:!1};const p=()=>({components:{KxButton:h,DialogContainer:_},template:`
        <KxButton @click="show">弹出对话框</KxButton>
        <DialogContainer/>
    `,methods:{show(){this.$dialog.show(G)}}});l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => ({
  components: {
    KxButton,
    DialogContainer
  },
  template: \`
        <KxButton @click="show">
            算一下幸运数字
        </KxButton>
        <DialogContainer/>
    \`,
  methods: {
    show() {
      this.$dialog.show(LuckyNumber);
    }
  }
})`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => ({
  template: \`
        <div class="mock-dialog">
            <h1 class="mock-dialog-content">
                对话框框
            </h1>
            <KxDialogButtons
                :on-apply='applyEvent && apply'
                :on-cancel='cancelEvent && cancel'
                :on-accept='acceptEvent && accept'
            />
        </div>
    \`,
  data: () => args,
  methods: {
    apply: action("onApply"),
    cancel: action("onCancel"),
    accept: action("onAccept")
  }
})`,...s.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => ({
  components: {
    KxButton,
    DialogContainer
  },
  template: \`
        <KxButton @click="show">弹出对话框</KxButton>
        <DialogContainer/>
    \`,
  methods: {
    show() {
      this.$dialog.show(HookedDialog);
    }
  }
})`,...p.parameters?.docs?.source}}};const le=["Custom","Buttons","BeforeDialogClose"];export{p as BeforeDialogClose,s as Buttons,l as Custom,le as __namedExportsOrder,ce as default};

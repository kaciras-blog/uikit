import{z as r,N as u,O as c,h as m,Q as p,j as o,H as f,P as y,n as i,f as h,r as b}from"./vue.esm-bundler-FW-u_CMv.js";const g=["aria-checked","aria-disabled"],k=["name","disabled"],t=r({__name:"KxSwitchBox",props:u({name:{},disabled:{type:Boolean}},{modelValue:{type:Boolean,required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(s){const n=c(s,"modelValue");return(e,d)=>(h(),m("label",{class:i(["kx-switch-box",{disabled:e.disabled}]),role:"switch","aria-checked":n.value,"aria-disabled":e.disabled},[p(e.$slots,"default"),o("span",{class:i(["kx-switch",{checked:n.value}])},[f(o("input",{class:"kx-switch-input",type:"checkbox","onUpdate:modelValue":d[0]||(d[0]=l=>n.value=l),name:e.name,disabled:e.disabled},null,8,k),[[y,n.value]])],2)],10,g))}});t.__docgenInfo={exportName:"default",displayName:"KxSwitchBox",type:1,props:[{name:"modelValue",global:!1,description:"",tags:[],required:!0,type:"boolean",declarations:[],schema:{kind:"enum",type:"boolean",schema:["false","true"]}},{name:"name",global:!1,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"disabled",global:!1,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey | undefined",declarations:[],schema:{kind:"enum",type:"PropertyKey | undefined",schema:["undefined","string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef | undefined",declarations:[],schema:{kind:"enum",type:"VNodeRef | undefined",schema:["undefined","string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any> | null, refs: Record<...>): void"}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"}],events:[{name:"update:modelValue",description:"",tags:[],type:"[value: boolean]",signature:'(event: "update:modelValue", value: boolean): void',declarations:[],schema:[{kind:"enum",type:"boolean",schema:["false","true"]}]}],slots:[{name:"default",type:"{}",description:"",declarations:[],schema:{kind:"object",type:"{}"}}],exposed:[{name:"modelValue",type:"boolean",description:"",declarations:[],schema:{kind:"enum",type:"boolean",schema:["false","true"]}},{name:"disabled",type:"boolean | undefined",description:"",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"name",type:"string | undefined",description:"",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}}],sourceFiles:"/home/runner/work/uikit/uikit/src/input/KxSwitchBox.vue"};const x={component:t,args:{disabled:!1},argTypes:{disabled:{control:{type:"boolean"}}}},a=s=>({components:{KxSwitchBox:t},template:`
        <div style="width: 300px">
            <p>
                Model value: {{ value }}
            </p>
            <KxSwitchBox
                v-bind="args"
                v-model="value"
            >
                这是一个切换按钮
            </KxSwitchBox>
        </div>
    `,setup(){return{args:s,value:b(!1)}}});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
  components: {
    KxSwitchBox
  },
  template: \`
        <div style="width: 300px">
            <p>
                Model value: {{ value }}
            </p>
            <KxSwitchBox
                v-bind="args"
                v-model="value"
            >
                这是一个切换按钮
            </KxSwitchBox>
        </div>
    \`,
  setup() {
    return {
      args,
      value: ref(false)
    };
  }
})`,...a.parameters?.docs?.source}}};const w=["SwitchBox"];export{a as SwitchBox,w as __namedExportsOrder,x as default};

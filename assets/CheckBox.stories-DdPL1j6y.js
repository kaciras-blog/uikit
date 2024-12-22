import{z as c,N as m,O as p,h as t,H as f,P as y,j as l,n as r,Q as h,R as b,f as i,r as k}from"./vue.esm-bundler-FW-u_CMv.js";const g=["aria-checked","aria-disabled"],x=["disabled"],v={key:0,class:"check-box-text"},o=c({__name:"KxCheckBox",props:m({disabled:{type:Boolean}},{modelValue:{type:Boolean,required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(s){const a=p(s,"modelValue");return(e,d)=>(i(),t("label",{class:r(["kx-check-box",{disabled:e.disabled}]),role:"checkbox","aria-checked":a.value,"aria-disabled":e.disabled},[f(l("input",{type:"checkbox",class:"check-box-input","onUpdate:modelValue":d[0]||(d[0]=u=>a.value=u),disabled:e.disabled,"aria-hidden":"true"},null,8,x),[[y,a.value]]),l("span",{class:r(["check-box-mark",{checked:a.value}])},null,2),e.$slots.default?(i(),t("span",v,[h(e.$slots,"default")])):b("",!0)],10,g))}});o.__docgenInfo={exportName:"default",displayName:"KxCheckBox",type:1,props:[{name:"modelValue",global:!1,description:"",tags:[],required:!0,type:"boolean",declarations:[],schema:{kind:"enum",type:"boolean",schema:["false","true"]}},{name:"disabled",global:!1,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey | undefined",declarations:[],schema:{kind:"enum",type:"PropertyKey | undefined",schema:["undefined","string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef | undefined",declarations:[],schema:{kind:"enum",type:"VNodeRef | undefined",schema:["undefined","string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any> | null, refs: Record<...>): void"}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"}],events:[{name:"update:modelValue",description:"",tags:[],type:"[value: boolean]",signature:'(event: "update:modelValue", value: boolean): void',declarations:[],schema:[{kind:"enum",type:"boolean",schema:["false","true"]}]}],slots:[{name:"default",type:"{}",description:"",declarations:[],schema:{kind:"object",type:"{}"}}],exposed:[{name:"modelValue",type:"boolean",description:"",declarations:[],schema:{kind:"enum",type:"boolean",schema:["false","true"]}},{name:"disabled",type:"boolean | undefined",description:"",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}}],sourceFiles:"/home/runner/work/uikit/uikit/src/input/KxCheckBox.vue"};const B={component:o,args:{disabled:!1},argTypes:{disabled:{control:{type:"boolean"}}}},n=s=>({components:{KxCheckBox:o},template:`
        <p>
            modelValue: {{ value }}
        </p>
        <KxCheckBox
            v-bind="args"
            v-model="value"
        >
            这是一个复选框
        </KxCheckBox>
    `,setup(){return{args:s,value:k(!1)}}});n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => ({
  components: {
    KxCheckBox
  },
  template: \`
        <p>
            modelValue: {{ value }}
        </p>
        <KxCheckBox
            v-bind="args"
            v-model="value"
        >
            这是一个复选框
        </KxCheckBox>
    \`,
  setup() {
    return {
      args,
      value: ref(false)
    };
  }
})`,...n.parameters?.docs?.source}}};const V=["CheckBox"];export{n as CheckBox,V as __namedExportsOrder,B as default};

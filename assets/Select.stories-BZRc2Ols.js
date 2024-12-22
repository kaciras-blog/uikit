import{f as r,h as l,j as i,z as m,O as y,H as f,Z as g,Q as v,n as s,V as b,u as h,r as _}from"./vue.esm-bundler-FW-u_CMv.js";import{_ as d}from"./_plugin-vue_export-helper-DlAUqK2U.js";const k={},S={width:"1em",height:"1em",fill:"currentColor",class:"bi bi-caret-down-fill",viewBox:"0 0 16 16"};function V(n,e){return r(),l("svg",S,e[0]||(e[0]=[i("path",{d:"M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"},null,-1)]))}const x=d(k,[["render",V]]),u=m({__name:"KxSelect",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(n){const e=y(n,"modelValue");return(a,o)=>(r(),l("div",{class:s(a.$style.container)},[f(i("select",{class:s(a.$style.select),"onUpdate:modelValue":o[0]||(o[0]=p=>e.value=p)},[v(a.$slots,"default")],2),[[g,e.value]]),b(h(x),{class:s(a.$style.icon)},null,8,["class"])],2))}}),K="VgJLT",w="my2q-",q="By77T",C={container:K,select:w,icon:q},B={$style:C},c=d(u,[["__cssModules",B]]);u.__docgenInfo={exportName:"default",displayName:"KxSelect",type:1,props:[{name:"modelValue",global:!1,description:"",tags:[],required:!0,type:"any",declarations:[],schema:"any"},{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey | undefined",declarations:[],schema:{kind:"enum",type:"PropertyKey | undefined",schema:["undefined","string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef | undefined",declarations:[],schema:{kind:"enum",type:"VNodeRef | undefined",schema:["undefined","string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any> | null, refs: Record<...>): void"}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"}],events:[{name:"update:modelValue",description:"",tags:[],type:"[value: any]",signature:'(event: "update:modelValue", value: any): void',declarations:[],schema:["any"]}],slots:[{name:"default",type:"{}",description:"",declarations:[],schema:{kind:"object",type:"{}"}}],exposed:[{name:"modelValue",type:"any",description:"",declarations:[],schema:"any"}],sourceFiles:"/home/runner/work/uikit/uikit/src/input/KxSelect.vue"};const $={component:c,args:{disabled:!1},argTypes:{disabled:{control:{type:"boolean"}}}},t=n=>({components:{KxSelect:c},template:`
        <p>当前值：{{ value }}</p>
        <KxSelect v-bind="args" v-model="value">
            <option :value="{ number: 123 }">123</option>
            <option :value="{ number: 456 }">456</option>
            <option :value="{ number: 789 }">789</option>
        </KxSelect>
    `,setup(){return{args:n,value:_({number:123})}}});t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`args => ({
  components: {
    KxSelect
  },
  template: \`
        <p>当前值：{{ value }}</p>
        <KxSelect v-bind="args" v-model="value">
            <option :value="{ number: 123 }">123</option>
            <option :value="{ number: 456 }">456</option>
            <option :value="{ number: 789 }">789</option>
        </KxSelect>
    \`,
  setup() {
    return {
      args,
      value: ref({
        number: 123
      })
    };
  }
})`,...t.parameters?.docs?.source}}};const O=["Select"];export{t as Select,O as __namedExportsOrder,$ as default};

import{r as i}from"./vue.esm-bundler-FW-u_CMv.js";import{a as v}from"./common-BKi96IKK.js";const c=Symbol("SelectionListener");function r(e,n){const{value:t}=n,a=typeof t=="function"?t:(o,l)=>t.splice(0,2,o,l);e[c]=v(e,a)}const d={updated(e,n){e[c](),r(e,n)},mounted:r,unmounted:e=>e[c]()},p={},s=()=>({directives:{selectionChange:d},template:`
        <textarea
            v-selection-change="fn"
            v-model="value"
            class="directive-textarea"
        />
        <textarea
            v-selection-change="selA"
            v-model="value"
            class="directive-textarea"
        />
        <div>
            选择范围：
            {{ selA[0] }} - {{ selA[1] }}
        </div>
    `,setup(){const e="选择文字，下面显示被选中部分的起止位置",n=i([0,0]);return{value:e,selA:n,fn:(a,o)=>n.value=[a,o]}}});s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => ({
  directives: {
    selectionChange: vSelectionChange
  },
  template: \`
        <textarea
            v-selection-change="fn"
            v-model="value"
            class="directive-textarea"
        />
        <textarea
            v-selection-change="selA"
            v-model="value"
            class="directive-textarea"
        />
        <div>
            选择范围：
            {{ selA[0] }} - {{ selA[1] }}
        </div>
    \`,
  setup() {
    const value = "选择文字，下面显示被选中部分的起止位置";
    const selA = ref([0, 0]);
    const fn = (s: number, e: number) => selA.value = [s, e];
    return {
      value,
      selA,
      fn
    };
  }
})`,...s.parameters?.docs?.source}}};const f=["SelectionChange"];export{s as SelectionChange,f as __namedExportsOrder,p as default};

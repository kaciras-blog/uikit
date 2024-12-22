import{t as a}from"./vue.esm-bundler-FW-u_CMv.js";const r=(n,t)=>{const{value:s,modifiers:i}=t,[o,c]=a(s);n.selectionStart=o,n.selectionEnd=c,i.focus&&n.focus()},d={},e=()=>({directives:{bindSelection:r},template:`
        <textarea
            v-bind-selection.focus="selection"
            v-model="value"
            class="directive-textarea"
        />
        <div class="row">
            <input type="number" v-model="selection[0]">
            &nbsp;-&nbsp;
            <input type="number" v-model="selection[1]">
        </div>
    `,data:()=>({selection:[0,0],value:"调整下面的 start 和 end，改变文本框的选择区域"})});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => ({
  directives: {
    bindSelection: vBindSelection
  },
  template: \`
        <textarea
            v-bind-selection.focus="selection"
            v-model="value"
            class="directive-textarea"
        />
        <div class="row">
            <input type="number" v-model="selection[0]">
            &nbsp;-&nbsp;
            <input type="number" v-model="selection[1]">
        </div>
    \`,
  data: () => ({
    selection: [0, 0],
    value: "调整下面的 start 和 end，改变文本框的选择区域"
  })
})`,...e.parameters?.docs?.source}}};const v=["SelectionBind"];export{e as SelectionBind,v as __namedExportsOrder,d as default};

import{K as o}from"./KxButton-BYZx_vn4.js";import{K as s}from"./autofocus-C8NzL-9U.js";import"./vue.esm-bundler-FW-u_CMv.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const r={},t=()=>({directives:{KxAutoFocus:s},components:{KxButton:o},template:`
        <KxButton @click="visible = !visible">
            切换显示
        </KxButton>
        <p></p>
        <input v-if="visible" v-kx-auto-focus>
    `,data:()=>({visible:!1})});t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => ({
  // 为避免重名，加了个前缀 Kx，实际使用时不需要。
  directives: {
    KxAutoFocus
  },
  components: {
    KxButton
  },
  template: \`
        <KxButton @click="visible = !visible">
            切换显示
        </KxButton>
        <p></p>
        <input v-if="visible" v-kx-auto-focus>
    \`,
  data: () => ({
    visible: false
  })
})`,...t.parameters?.docs?.source}}};const a=["Autofocus"];export{t as Autofocus,a as __namedExportsOrder,r as default};

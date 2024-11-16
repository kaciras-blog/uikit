import{K as e,M as n}from"./quick-alert-DZXY6td_.js";import{K as s}from"./KxButton-DBbBWOfF.js";import{_ as a}from"./DialogContainer-3hQlMMcq.js";import"./vue.esm-bundler-Bzz_P2ly.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./autofocus-C8NzL-9U.js";import"./index-CEEY3iWW.js";import"./LRUCache-nrA0TT2c.js";const u={component:e,argTypes:{type:{control:{type:"select"},options:{Info:0,Success:1,Warning:2,Error:3}},onClick:{action:"clicked"}}},o=t=>({components:{KxButton:s,DialogContainer:a},template:`
        <KxButton @click="show">显示消息框</KxButton>
        <DialogContainer/>
    `,methods:{show(){this.$dialog.alert(t).then(t.onClick)}}});o.args={type:n.Info,title:"带有取消按钮的消息框",content:`取消 = $dialog.close()
确定 = $dialog.confirm()`,closable:!0,cancelable:!0};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => ({
  components: {
    KxButton,
    DialogContainer
  },
  template: \`
        <KxButton @click="show">显示消息框</KxButton>
        <DialogContainer/>
    \`,
  methods: {
    show() {
      this.$dialog.alert(args).then(args.onClick);
    }
  }
})`,...o.parameters?.docs?.source}}};const x=["MessageBox"];export{o as MessageBox,x as __namedExportsOrder,u as default};

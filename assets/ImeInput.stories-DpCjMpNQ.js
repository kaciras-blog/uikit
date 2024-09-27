const p={mounted(a,u){let t=!0;a.addEventListener("compositionstart",()=>{t=!1}),a.addEventListener("compositionend",n=>{t=!0,u.value(n)}),a.addEventListener("input",n=>{t&&u.value(n)})}},l={},e=()=>({directives:{imeInput:p},template:`
        <label>
            <span>使用输入法输入一些文本：</span>
            <textarea
                v-ime-input="e => imeValue = e.target.value"
                @input="e => value = e.target.value"
                @change="e => changeValue = e.target.value"
            />
        </label>
        <div class="ime-input-result">
            <p>input 事件：{{ value }}</p>
            <p>change 事件：{{ changeValue }}</p>
            <p>v-ime-input：{{ imeValue }}</p>
        </div>
    `,data:()=>({value:"",changeValue:"",imeValue:""})});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => ({
  directives: {
    imeInput: vImeInput
  },
  template: \`
        <label>
            <span>使用输入法输入一些文本：</span>
            <textarea
                v-ime-input="e => imeValue = e.target.value"
                @input="e => value = e.target.value"
                @change="e => changeValue = e.target.value"
            />
        </label>
        <div class="ime-input-result">
            <p>input 事件：{{ value }}</p>
            <p>change 事件：{{ changeValue }}</p>
            <p>v-ime-input：{{ imeValue }}</p>
        </div>
    \`,
  data: () => ({
    value: "",
    changeValue: "",
    imeValue: ""
  })
})`,...e.parameters?.docs?.source}}};const i=["ImeInput"];export{e as ImeInput,i as __namedExportsOrder,l as default};

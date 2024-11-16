const t={title:"Misc"},e=()=>({template:`
        <div class="tag-group">
            <a class="tag-group-item">Last</a>
            <a class="tag-group-item">Second</a>
            <a class="tag-group-item">First</a>
        </div>
    `}),a=s=>({template:`
        <div
            class="line-clamp story"
            :style='{"--line-clamp": args.lines}'
        >
            <article>{{ args.text }}</article>
        </div>
    `,setup:()=>({args:s})});a.args={lines:3,text:`Proprietary and undocumented CSS property that will contain text to a
        given amount of lines when used in combination with display: -webkit-box.
        It will end with ellipsis when text-overflow: ellipsis is included.`};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => ({
  template: \`
        <div class="tag-group">
            <a class="tag-group-item">Last</a>
            <a class="tag-group-item">Second</a>
            <a class="tag-group-item">First</a>
        </div>
    \`
})`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
  template: \`
        <div
            class="line-clamp story"
            :style='{"--line-clamp": args.lines}'
        >
            <article>{{ args.text }}</article>
        </div>
    \`,
  setup: () => ({
    args
  })
})`,...a.parameters?.docs?.source}}};const r=["TagGroup","LineClamp"];export{a as LineClamp,e as TagGroup,r as __namedExportsOrder,t as default};

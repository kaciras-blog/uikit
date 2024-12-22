import{u as a}from"./break-point-DvOBYfFg.js";import"./vue.esm-bundler-FW-u_CMv.js";const l={title:"BreakPoint"},t=()=>({template:`
        <p>当前视区宽度信息：</p>
        <p>Current screen: {{ $bp.value }}</p>
        <p>Greater than tablet: {{ gtTablet }}</p>
        <p>Smaller than tablet: {{ ltTablet }}</p>
    `,setup(){const e=a();return{gtTablet:e.greater("tablet"),ltTablet:e.smaller("tablet")}}});t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => ({
  template: \`
        <p>当前视区宽度信息：</p>
        <p>Current screen: {{ $bp.value }}</p>
        <p>Greater than tablet: {{ gtTablet }}</p>
        <p>Smaller than tablet: {{ ltTablet }}</p>
    \`,
  setup() {
    const breakPoint = useBreakPoint();
    return {
      gtTablet: breakPoint.greater("tablet"),
      ltTablet: breakPoint.smaller("tablet")
    };
  }
})`,...t.parameters?.docs?.source}}};const p=["BreakPoint"];export{t as BreakPoint,p as __namedExportsOrder,l as default};

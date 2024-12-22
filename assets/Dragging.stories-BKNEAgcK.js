import{r as i,c}from"./vue.esm-bundler-FW-u_CMv.js";import{E as m,s as p,l as u,m as y}from"./dragging--sucj7sf.js";const z={title:"Dragging",args:{size:80,speed:.4},argTypes:{size:{control:{type:"number",step:1}},speed:{control:{type:"number",step:.1}}}},e=t=>({template:`
        <div id="drag-demo" :style="style">
            <aside id="drag-demo-labels">
                <div>横向速度：{{ vX }}</div>
                <div>纵向速度：{{ vY }}</div>
            </aside>
            <div id="drag-demo-el" @pointerdown="drag">拖动试试</div>
        </div>
    `,setup(){const d=i("0.0"),o=i("0.0"),l=c(()=>({"--edge-size":t.size+"px"}));function a(n){const{size:g,speed:v}=t,s=n.target,r=new m(document.scrollingElement,g,v);s.style.cursor="grabbing",p(n,[u,y(n,s),r,{onEnd(){s.style.cursor=""},onMove(){d.value=r.vX.toFixed(1),o.value=r.vY.toFixed(1)}}])}return{vX:d,vY:o,style:l,drag:a}}});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  template: \`
        <div id="drag-demo" :style="style">
            <aside id="drag-demo-labels">
                <div>横向速度：{{ vX }}</div>
                <div>纵向速度：{{ vY }}</div>
            </aside>
            <div id="drag-demo-el" @pointerdown="drag">拖动试试</div>
        </div>
    \`,
  setup() {
    const vX = ref("0.0");
    const vY = ref("0.0");
    const style = computed(() => ({
      "--edge-size": args.size + "px"
    }));
    function drag(event: PointerEvent) {
      const {
        size,
        speed
      } = args;
      const el = event.target as HTMLElement;
      const edgeScroll = new EdgeScrollObserver(document.scrollingElement, size, speed);
      el.style.cursor = "grabbing";
      startDragging(event, [limitInWindow, moveElement(event, el), edgeScroll, {
        onEnd() {
          el.style.cursor = "";
        },
        onMove() {
          vX.value = edgeScroll.vX.toFixed(1);
          vY.value = edgeScroll.vY.toFixed(1);
        }
      }]);
    }
    return {
      vX,
      vY,
      style,
      drag
    };
  }
})`,...e.parameters?.docs?.source}}};const f=["Dragging"];export{e as Dragging,f as __namedExportsOrder,z as default};

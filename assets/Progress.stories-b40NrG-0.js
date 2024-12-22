import{z as K,r as t,c as B,h as b,n as _,M as P,v as $,f as w}from"./vue.esm-bundler-FW-u_CMv.js";import{_ as T}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{K as E}from"./KxButton-BYZx_vn4.js";const p=300,I=800,m=K({__name:"KxProgress",setup(u,{expose:v}){const e=t(!1),o=t(!1),n=t(0),a=t(!0);let i;const g=B(()=>({opacity:e.value?1:0,transition:a.value?`width ease-out ${p}ms`:void 0,"--progress":n.value}));function y(){e.value||(n.value=0,e.value=!0,o.value=!1)}function l(s){n.value=Math.min(100,s)}function h(s){l(n.value+s)}async function c(){e.value=!1,a.value=!1,await $(),n.value=0,a.value=!0,clearTimeout(i)}function k(){e.value&&(d(),n.value=100)}function x(){e.value&&(d(),n.value=100,o.value=!0)}function d(){i=setTimeout(()=>{e.value=!1,i=setTimeout(c,p)},I)}return v({finish:k,start:y,fail:x,reset:c,setProgress:l,increase:h}),(s,C)=>(w(),b("div",{class:_([s.$style.progress,{[s.$style.error]:o.value}]),style:P(g.value)},null,6))}}),q="siHlw",M="Bw-Bb",N="_1k-mu",R={progress:q,highlight:M,error:N},S={$style:R},f=T(m,[["__cssModules",S]]);m.__docgenInfo={exportName:"default",displayName:"KxProgress",type:1,props:[{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey | undefined",declarations:[],schema:{kind:"enum",type:"PropertyKey | undefined",schema:["undefined","string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef | undefined",declarations:[],schema:{kind:"enum",type:"VNodeRef | undefined",schema:["undefined","string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any> | null, refs: Record<...>): void"}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"}],events:[],slots:[],exposed:[{name:"finish",type:"() => void",description:"",declarations:[],schema:{kind:"event",type:"(): void"}},{name:"start",type:"() => void",description:"",declarations:[],schema:{kind:"event",type:"(): void"}},{name:"fail",type:"() => void",description:"",declarations:[],schema:{kind:"event",type:"(): void"}},{name:"reset",type:"() => Promise<void>",description:"",declarations:[],schema:{kind:"event",type:"(): Promise<void>"}},{name:"setProgress",type:"(percent: number) => void",description:"",declarations:[],schema:{kind:"event",type:"(percent: number): void"}},{name:"increase",type:"(percent: number) => void",description:"",declarations:[],schema:{kind:"event",type:"(percent: number): void"}}],sourceFiles:"/home/runner/work/uikit/uikit/src/components/KxProgress.vue"};const V={component:f},r=()=>({components:{KxProgress:f,KxButton:E},template:`
        <KxProgress ref="progress"/>
        <p>
            Set progress value:
            <input type="number" min="0" v-model="value">
        </p>
        <div class="btn-group">
            <KxButton @click="start">启动</KxButton>
            <KxButton @click="increase">增加10%</KxButton>
            <KxButton @click="fail">失败</KxButton>
            <KxButton @click="reset">重置</KxButton>
        </div>
    `,data:()=>({value:0}),watch:{value(u){this.$refs.progress.setProgress(u)}},methods:{start(){this.$refs.progress.start()},increase(){this.$refs.progress.increase(10)},fail(){this.value=0,this.$refs.progress.fail()},reset(){return this.value=0,this.$refs.progress.reset()}}});r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => ({
  components: {
    KxProgress,
    KxButton
  },
  template: \`
        <KxProgress ref="progress"/>
        <p>
            Set progress value:
            <input type="number" min="0" v-model="value">
        </p>
        <div class="btn-group">
            <KxButton @click="start">启动</KxButton>
            <KxButton @click="increase">增加10%</KxButton>
            <KxButton @click="fail">失败</KxButton>
            <KxButton @click="reset">重置</KxButton>
        </div>
    \`,
  data: () => ({
    value: 0
  }),
  watch: {
    value(percent: number) {
      this.$refs.progress.setProgress(percent);
    }
  },
  methods: {
    start() {
      this.$refs.progress.start();
    },
    increase() {
      this.$refs.progress.increase(10);
    },
    fail() {
      this.value = 0;
      this.$refs.progress.fail();
    },
    reset() {
      this.value = 0;
      return this.$refs.progress.reset();
    }
  }
})`,...r.parameters?.docs?.source}}};const D=["Progress"];export{r as Progress,D as __namedExportsOrder,V as default};

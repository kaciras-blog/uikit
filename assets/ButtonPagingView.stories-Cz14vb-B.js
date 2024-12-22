import{L as R,g as T}from"./ListItem-CEvH25Hn.js";import{T as D,y as p,z as O,r as L,c as P,h as $,J as S,n as z,R as _,Q as N,f as V}from"./vue.esm-bundler-FW-u_CMv.js";import{g as F}from"./common-BKi96IKK.js";import{K as A}from"./KxButton-BYZx_vn4.js";import{_ as I}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{L as Q}from"./LoadingStatus-C2v3_iFq.js";import"./AtomSpinner-BE_QQ1OP.js";const K="GzmQ-",G="idaMv",U="URNUE",J="_1n3s1",W="tm5R0",H="wjktp",X={"line-clamp":"cuQ68",wrapper:K,default:"t-O5x",active:G,omit:U,text:J,jumpInput:W,jumpLabel:H},Y={button(n,s,t,e,o,i){const r={type:"outline",class:n.default,disabled:i,onClick(u){u.preventDefault(),s("showPage",t)}};return o&&!i&&(r.href=o(t)),p(A,r,{default:()=>e})},omit:n=>p("span",{class:n.omit},"...")},Z={button(n,s,t,e,o,i){if(i)return p("span",{class:[n.text,n.active]},e);const r={href:o?o(t):"#",class:n.text,onClick(u){u.preventDefault(),s("showPage",t)}};return p("a",r,e)},omit:n=>p("span",{class:n.textOmit},"...")};function ee(n,s,t){const{emit:e}=t,o=p("input",{class:s.jumpInput,onChange({target:r}){const u=parseInt(r.value);u>0&&u<n&&(r.value="",e("showPage",u))}}),i={class:"minor-text "+s.jumpLabel};return p("label",i,["转到",o,"页"])}function q(n,s){const{index:t,total:e,omitPos:o,type:i,pageLink:r}=n,{emit:u}=s,m=D(),d=[],f=i==="default"?Y:Z;function g(l,w,a=!1){return f.button(m,u,l,w,r,a)}function y(l){return g(l,l,l===t)}d.push(g(t-1,"<",t<=1)),d.push(y(1)),t-o>1&&d.push(f.omit(m));const k=Math.max(t-o,2),h=Math.min(t+o,e-1);for(let l=k;l<=h;l++)d.push(y(l));t+o<e&&d.push(f.omit(m)),e>1&&d.push(y(e)),d.push(g(t+1,">",t>=e));const v=p("div",{class:"btn-group"},d);return p("div",{class:m.wrapper},[v,ee(e,m,s)])}q.props={index:{type:Number,required:!0},total:{type:Number,required:!0},omitPos:{type:Number,default:2},type:{type:String,default:"default"},pageLink:{type:Function,required:!1}};q.emits=["showPage"];const te=q,ne={$style:X},E=I(te,[["__cssModules",ne]]),M=O({__name:"ButtonPagingView",props:{modelValue:{},start:{default:0},pageSize:{},topButtons:{type:Boolean,default:!1},viewportOffset:{default:0},theme:{},loader:{},nextLink:{}},emits:["update:modelValue"],setup(n,{expose:s,emit:t}){const e=n,o=t,i=L(1),r=L(null),u=L();let m;const d=P(()=>e.modelValue.items),f=P(()=>e.modelValue.total),g=P(()=>Math.max(0,Math.floor((f.value-1)/e.pageSize)+1)),y=P(()=>{const{nextLink:a,pageSize:c}=e;return a&&(b=>a(k(b),c))});function k(a){const{pageSize:c,start:b}=e;return b+(a-1)*c}function h(a){const{pageSize:c,loader:b}=e;m?.abort();const{signal:C}=m=new AbortController;return i.value=a,r.value=null,b(k(a),c,C).then(x=>o("update:modelValue",x)).catch(x=>r.value=x).finally(()=>m=null)}async function v(a){await h(a);const c=u.value.getBoundingClientRect().top-e.viewportOffset;c<0&&(document.documentElement.scrollTop=c+F())}function l(){return h(1)}function w(){return h(i.value)}return s({reload:l,refresh:w}),(a,c)=>(V(),$("div",{ref_key:"el",ref:u},[a.topButtons&&f.value?(V(),S(E,{key:0,class:z(a.$style.top),total:g.value,index:i.value,type:a.theme,"page-link":y.value,onShowPage:v},null,8,["class","total","index","type","page-link"])):_("",!0),r.value?(V(),S(Q,{key:1,error:!0,onRetry:w})):_("",!0),N(a.$slots,"default",{items:d.value.slice(0,a.pageSize)}),f.value?(V(),S(E,{key:2,class:z(a.$style.bottom),total:g.value,index:i.value,type:a.theme,"page-link":y.value,onShowPage:v},null,8,["class","total","index","type","page-link"])):_("",!0)],512))}}),ae="_8vWIk",oe="S5RhO",se={top:ae,bottom:oe},ie={$style:se},j=I(M,[["__cssModules",ie]]);M.__docgenInfo={exportName:"default",displayName:"ButtonPagingView",type:1,props:[{name:"modelValue",global:!1,description:`分页数据，该属性身与内部的两个属性（items,total）都不能为空，
若要表示未加载状态，请对本组件使用 v-if。`,tags:[],required:!0,type:"PageData",declarations:[],schema:{kind:"object",type:"PageData"}},{name:"start",global:!1,description:"",tags:[],required:!1,type:"number | undefined",declarations:[],schema:{kind:"enum",type:"number | undefined",schema:["undefined","number"]},default:"0"},{name:"pageSize",global:!1,description:"",tags:[],required:!0,type:"number",declarations:[],schema:"number"},{name:"topButtons",global:!1,description:"是否在上方也显示翻页按钮，默认 false",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]},default:"false"},{name:"viewportOffset",global:!1,description:"",tags:[],required:!1,type:"number | undefined",declarations:[],schema:{kind:"enum",type:"number | undefined",schema:["undefined","number"]},default:"0"},{name:"theme",global:!1,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"loader",global:!1,description:"",tags:[],required:!0,type:"LoadDateFn",declarations:[],schema:{kind:"event",type:"(start: number, count: number, signal: AbortSignal): Promise<PageData>"}},{name:"nextLink",global:!1,description:"下一页的链接，用于 SSR，如果不存在则不生成",tags:[],required:!1,type:"PageLinkFn | undefined",declarations:[],schema:{kind:"enum",type:"PageLinkFn | undefined",schema:["undefined",{kind:"event",type:"(start: number, count: number): string"}]}},{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey | undefined",declarations:[],schema:{kind:"enum",type:"PropertyKey | undefined",schema:["undefined","string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef | undefined",declarations:[],schema:{kind:"enum",type:"VNodeRef | undefined",schema:["undefined","string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any> | null, refs: Record<...>): void"}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"}],events:[{name:"update:modelValue",description:"",tags:[],type:"any[]",signature:'(event: "update:modelValue", ...args: any[]): void',declarations:[],schema:["any"]}],slots:[{name:"default",type:"{ items: unknown[]; }",description:"",declarations:[],schema:{kind:"object",type:"{ items: unknown[]; }"}}],exposed:[{name:"start",type:"number",description:"",declarations:[],schema:"number"},{name:"topButtons",type:"boolean",description:"是否在上方也显示翻页按钮，默认 false",declarations:[],schema:{kind:"enum",type:"boolean",schema:["false","true"]}},{name:"viewportOffset",type:"number",description:"",declarations:[],schema:"number"},{name:"modelValue",type:"PageData",description:`分页数据，该属性身与内部的两个属性（items,total）都不能为空，
若要表示未加载状态，请对本组件使用 v-if。`,declarations:[],schema:{kind:"object",type:"PageData"}},{name:"pageSize",type:"number",description:"",declarations:[],schema:"number"},{name:"theme",type:"string | undefined",description:"",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"loader",type:"LoadDateFn",description:"",declarations:[],schema:{kind:"event",type:"(start: number, count: number, signal: AbortSignal): Promise<PageData>"}},{name:"nextLink",type:"PageLinkFn | undefined",description:"下一页的链接，用于 SSR，如果不存在则不生成",declarations:[],schema:{kind:"enum",type:"PageLinkFn | undefined",schema:["undefined",{kind:"event",type:"(start: number, count: number): string"}]}},{name:"reload",type:"() => Promise<any>",description:"",declarations:[],schema:{kind:"event",type:"(): Promise<any>"}},{name:"refresh",type:"() => Promise<any>",description:"",declarations:[],schema:{kind:"event",type:"(): Promise<any>"}}],sourceFiles:"/home/runner/work/uikit/uikit/src/paging/ButtonPagingView.vue"};const fe={component:j,args:{mockErrorAt:1/0,total:1e3,theme:"default"},argTypes:{mockErrorAt:{control:{type:"number"}},theme:{control:{type:"select"},options:["default","text"]},total:{control:{type:"number"}}}},B=n=>({components:{ListItem:R,ButtonPagingView:j},template:`
        <ButtonPagingView
            ref="pagingView"
            v-model="model"
            :loader="load"
            :viewport-offset="60"
            :page-size="10"
            :theme="args.theme"
            :top-buttons="true"
        >
            <template v-slot="{ items }">
                <ListItem v-for="v in items" :key="v.id" v-bind="v"/>
            </template>
        </ButtonPagingView>`,data:()=>({args:n,loadTimes:0,model:{total:0,items:[]}}),methods:{async load(s,t){if(this.loadTimes>=n.mockErrorAt)throw new Error("Mocked Error");const{total:e}=n,o=Math.min(e-s,t);return this.loadTimes++,{total:e,items:T(o)}}},mounted(){this.$refs.pagingView.refresh()}});B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`args => ({
  components: {
    ListItem,
    ButtonPagingView: ButtonPagingViewVue
  },
  template: \`
        <ButtonPagingView
            ref="pagingView"
            v-model="model"
            :loader="load"
            :viewport-offset="60"
            :page-size="10"
            :theme="args.theme"
            :top-buttons="true"
        >
            <template v-slot="{ items }">
                <ListItem v-for="v in items" :key="v.id" v-bind="v"/>
            </template>
        </ButtonPagingView>\`,
  data: () => ({
    args,
    loadTimes: 0,
    model: {
      total: 0,
      items: []
    }
  }),
  methods: {
    async load(start: number, size: number) {
      if (this.loadTimes >= args.mockErrorAt) {
        throw new Error("Mocked Error");
      }
      const {
        total
      } = args;
      const count = Math.min(total - start, size);
      this.loadTimes++;
      return {
        total,
        items: getQuotes(count)
      };
    }
  },
  mounted() {
    this.$refs.pagingView.refresh();
  }
})`,...B.parameters?.docs?.source}}};const ge=["ButtonPagingView"];export{B as ButtonPagingView,ge as __namedExportsOrder,fe as default};

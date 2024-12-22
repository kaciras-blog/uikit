import{f as v,h as w,j as a,z as G,e as Z,A as H,p as M,c as S,w as N,V as u,Y as x,n as l,u as y,H as Q,I as ee,M as O,G as te,U as _,R as ne,C as V}from"./vue.esm-bundler-FW-u_CMv.js";import{_ as L}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{a as oe,p as ie}from"./index-BFK5Nhkc.js";import{u as se,C as re}from"./quick-alert-BR3-N5_h.js";import{s as ae}from"./dragging--sucj7sf.js";import{K as C}from"./KxButton-BYZx_vn4.js";import{A as le}from"./AtomSpinner-BE_QQ1OP.js";import{_ as ce}from"./DialogContainer-C9pebPWR.js";import"./index-BeRudJ4f.js";import"./autofocus-C8NzL-9U.js";import"./LRUCache-nrA0TT2c.js";function de(r,s=!1,R=!1){const p=document.createElement("input");return R&&(p.webkitdirectory=!0),p.type="file",p.accept=r,p.multiple=s,p.click(),new Promise((B,$)=>{p.onerror=$,p.onchange=()=>B(p.files)})}const ue={},pe={width:"1em",height:"1em",fill:"currentColor",class:"bi bi-plus-lg",viewBox:"0 0 16 16"};function me(r,s){return v(),w("svg",pe,s[0]||(s[0]=[a("path",{"fill-rule":"evenodd",d:"M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"},null,-1)]))}const fe=L(ue,[["render",me]]),he={},ge={width:"1em",height:"1em",fill:"currentColor",viewBox:"0 0 24 24"};function ye(r,s){return v(),w("svg",ge,s[0]||(s[0]=[a("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),a("path",{d:"M6.99 11 3 15l3.99 4v-3H14v-2H6.99zM21 9l-3.99-4v3H10v2h7.01v3z"},null,-1)]))}const ve=L(he,[["render",ye]]),we={},be={width:"1em",height:"1em",fill:"currentColor",viewBox:"0 0 24 24"};function Ce(r,s){return v(),w("svg",be,s[0]||(s[0]=[a("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),a("path",{d:"M16 17.01V10h-2v7.01h-3L15 21l4-3.99zM9 3 5 6.99h3V14h2V6.99h3z"},null,-1)]))}const $e=L(we,[["render",Ce]]),ke={},xe={width:"1em",height:"1em",fill:"currentColor",viewBox:"0 0 24 24"};function Re(r,s){return v(),w("svg",xe,s[0]||(s[0]=[a("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),a("path",{d:"M15.55 5.55 11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10zM19.93 11a7.9 7.9 0 0 0-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03m3.89-2.42 1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48"},null,-1)]))}const Be=L(ke,[["render",Re]]),Le=["src"],Ue=["value"],X=G({__name:"ImageCropper",props:{image:{type:[String,Blob],required:!0},circle:{type:Boolean,default:!1},aspectRatio:{type:Number,required:!0}},setup(r){const s=r,{image:R}=s,p=typeof R=="string"?R:URL.createObjectURL(R);Z(()=>{typeof R!="string"&&URL.revokeObjectURL(p)});const B=se();oe();const $=H(!1),f=ie(),P=H(),o=M({x:0,y:0,width:0,height:0}),n=M({x:0,y:0,rotate:0,scale:1,flipX:1,flipY:1}),h=M({top:0,left:0,width:0,height:0}),j=S(()=>({transform:`scaleX(${n.flipX}) scaleY(${n.flipY})`})),D=S(()=>{const{x:t,y:e,rotate:i,scale:c}=n;return{lineHeight:0,transform:`translate(${t}px, ${e}px) rotate(${i}deg) scale(${c})`}}),K=S(()=>{const{x:t,y:e,width:i,height:c}=o;return{top:`${e}px`,left:`${t}px`,width:`${i}px`,height:`${c}px`}});function A(){if(!f.value)return{vw:0,vh:0};const t=f.value.getBoundingClientRect();return{vw:t.width,vh:t.height}}function U(t){return Math.floor(t/n.scale)}N([o,n],()=>{const t=f.value.firstElementChild.getBoundingClientRect(),e=f.value.lastElementChild.getBoundingClientRect();h.width=U(o.width),h.height=U(o.height),h.top=U(e.top-t.top),h.left=U(e.left-t.left)});function F(){B.confirm({...h,rotate:n.rotate,flipX:n.flipX===-1,flipY:n.flipY===-1})}function Y(t){const{width:e,height:i}=f.value.getBoundingClientRect(),{aspectRatio:c}=s,g=i*c/e,d=e/c/i;g<d?(o.width=g*e,o.height=o.width/c):(o.height=d*i,o.width=o.height*c),o.x=(e-o.width)/2,o.y=(i-o.height)/2,n.x=0,n.y=0;let{naturalWidth:m,naturalHeight:b}=t;n.rotate%180!==0&&([m,b]=[b,m]),n.scale=Math.max(e/m,i/b)}function T(t){$.value=!0,Y(t.target)}N(()=>n.rotate,()=>{Y(f.value.firstElementChild.firstElementChild)});function z(){const t=f.value.firstElementChild.firstElementChild;let{naturalWidth:e,naturalHeight:i}=t;return n.rotate%180!==0&&([e,i]=[i,e]),{width:e,height:i}}function E(){const{width:t,height:e}=z(),{vw:i,vh:c}=A(),g=i/2-t*n.scale/2+n.x,d=c/2-e*n.scale/2+n.y,m=g+t*n.scale,b=d+e*n.scale;g>o.x?n.x-=g-o.x:m<o.x+o.width&&(n.x+=o.x+o.width-m),d>o.y?n.y-=d-o.y:b<o.y+o.height&&(n.y+=o.y+o.height-b)}function J(t){const{clientX:e,clientY:i}=t,c=n.x-e,g=n.y-i;ae(t,({x:d,y:m})=>{n.x=c+d,n.y=g+m,E()})}function W(t){const{deltaY:e,clientX:i,clientY:c}=t;t.preventDefault();const d=t.currentTarget.firstElementChild.getBoundingClientRect(),{width:m,height:b}=z();let k=1-e/1500;k=Math.max(o.width/m/n.scale,k),k=Math.max(o.height/b/n.scale,k),n.scale*=k,n.x-=(i-d.left-d.width/2)*(k-1),n.y-=(c-d.top-d.height/2)*(k-1),E()}return(t,e)=>(v(),w("div",{class:l(t.$style.container)},[a("header",{class:l(t.$style.header)},[e[6]||(e[6]=a("h1",{class:"compact"}," 裁剪图片 ",-1)),u(C,{type:"icon",title:"关闭",class:l(t.$style.close_button),onClick:y(B).close},{default:x(()=>[u(y(re))]),_:1},8,["class","onClick"])],2),Q(a("div",{ref_key:"main",ref:f,class:l(t.$style.cropView),onPointerdown:J,onWheel:W},[a("div",{style:O(D.value)},[a("img",{src:y(p),alt:"Image to crop",class:l(t.$style.image),style:O(j.value),onLoad:T,onError:e[0]||(e[0]=i=>$.value=null)},null,46,Le)],4),a("div",{ref_key:"regionEl",ref:P,class:l(t.$style.region),style:O(K.value)},[r.circle?(v(),w("div",{key:0,class:l(t.$style.circle)},null,2)):(v(),w(te,{key:1},[a("div",{class:l(t.$style.dash)},null,2),a("div",{class:l(t.$style.dash)},null,2)],64)),u(y(fe),{class:l(t.$style.crosshair)},null,8,["class"])],6)],34),[[ee,$.value]]),$.value===!1?(v(),w("div",{key:0,ref_key:"main",ref:f,class:l(t.$style.loading)},[u(le),e[7]||(e[7]=_(" 加载中... "))],2)):$.value===null?(v(),w("div",{key:1,class:l(t.$style.loading)}," 加载失败，请重新选择图片以重试。 ",2)):ne("",!0),a("div",{class:l(t.$style.toolbar)},[u(C,{type:"icon",title:"水平翻转",onClick:e[1]||(e[1]=i=>n.flipX*=-1)},{default:x(()=>[u(y(ve))]),_:1}),u(C,{type:"icon",title:"垂直翻转",onClick:e[2]||(e[2]=i=>n.flipY*=-1)},{default:x(()=>[u(y($e))]),_:1}),u(C,{type:"icon",title:"旋转",onClick:e[3]||(e[3]=i=>n.rotate+=90)},{default:x(()=>[u(y(Be))]),_:1}),a("input",{type:"number",title:"缩放",min:"0.01",step:"0.1",value:n.scale.toPrecision(3),onInput:e[4]||(e[4]=i=>n.scale=i.target.valueAsNumber)},null,40,Ue),a("div",{class:l(t.$style.stats)},V(h.left)+" - "+V(h.top)+" | "+V(h.width)+" x "+V(h.height),3),a("div",{class:l(t.$style.right_buttons)},[u(C,{color:"second",onClick:y(B).close},{default:x(()=>e[8]||(e[8]=[_(" 取消 ")])),_:1},8,["onClick"]),u(C,{onClick:e[5]||(e[5]=i=>y(B).confirm())},{default:x(()=>e[9]||(e[9]=[_(" 跳过 ")])),_:1}),u(C,{onClick:F},{default:x(()=>e[10]||(e[10]=[_("确定")])),_:1})],2)],2)],2))}}),_e="wJ4fA full-vertex",Ve="CXd3-",Ie="meNbl",Me="OVLHB",Se="qhwY4 OVLHB",Oe="quvOf OVLHB",Ye="-GyX-",ze="lZtV-",Ee="_2j8wI",He="n5KOJ",Ne="VK2Vd",Xe="oKM0R",qe="_4UTBh",Pe="FT2cS btn-group",je={container:_e,header:Ve,close_button:Ie,main:Me,cropView:Se,loading:Oe,image:Ye,region:ze,dash:Ee,circle:He,crosshair:Ne,toolbar:Xe,stats:qe,right_buttons:Pe},De={$style:je},q=L(X,[["__cssModules",De]]);X.__docgenInfo={exportName:"default",displayName:"ImageCropper",type:1,props:[{name:"circle",global:!1,description:"是否使用圆形裁剪框。",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]},default:"false"},{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey | undefined",declarations:[],schema:{kind:"enum",type:"PropertyKey | undefined",schema:["undefined","string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef | undefined",declarations:[],schema:{kind:"enum",type:"VNodeRef | undefined",schema:["undefined","string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any> | null, refs: Record<...>): void"}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean | undefined",declarations:[],schema:{kind:"enum",type:"boolean | undefined",schema:["undefined","false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string | undefined",declarations:[],schema:{kind:"enum",type:"string | undefined",schema:["undefined","string"]}},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"image",global:!1,description:"要裁剪的图片的 URL。",tags:[],required:!0,type:"string | Blob",declarations:[],schema:{kind:"enum",type:"string | Blob",schema:["string",{kind:"object",type:"Blob"}]}},{name:"aspectRatio",global:!1,description:"目标宽高比，比如 1 或 16 / 9。",tags:[],required:!0,type:"number",declarations:[],schema:"number"}],events:[],slots:[],exposed:[{name:"circle",type:"boolean",description:"是否使用圆形裁剪框。",declarations:[],schema:{kind:"enum",type:"boolean",schema:["false","true"]}},{name:"image",type:"string | Blob",description:"要裁剪的图片的 URL。",declarations:[],schema:{kind:"enum",type:"string | Blob",schema:["string",{kind:"object",type:"Blob"}]}},{name:"aspectRatio",type:"number",description:"目标宽高比，比如 1 或 16 / 9。",declarations:[],schema:"number"}],sourceFiles:"/home/runner/work/uikit/uikit/src/dialog/ImageCropper.vue"};const nt={component:q},I=()=>({components:{KxButton:C,DialogContainer:ce},template:`
        <div class="crop-image">
            <KxButton @click="showCropper">
                裁剪图片
            </KxButton>
            <pre>
                {{ JSON.stringify(result, null, 4) }}
            </pre>
            <img
                v-if="imageURL"
                class="cropped"
                :src="imageURL"
                alt="裁剪结果"
                :style="style"
            >
        </div>
        <DialogContainer></DialogContainer>
    `,data:()=>({imageURL:null,result:void 0}),computed:{style(){const r=this.result;if(!r)return{};let s=`rotate(${r.rotate}deg)`;return r.flipX&&(s+=" scaleX(-1)"),r.flipY&&(s+=" scaleY(-1)"),{width:`${r.width}px`,height:`${r.height}px`,transform:s,objectPosition:`${-r.left}px ${-r.top}px`}}},methods:{async showCropper(){const[r]=await de("image/*"),s=this.$dialog.show(q,{image:r,aspectRatio:16/9});this.result=await s.confirmPromise,URL.revokeObjectURL(this.imageURL),this.imageURL=URL.createObjectURL(r)}}});I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => ({
  components: {
    KxButton,
    DialogContainer
  },
  template: \`
        <div class="crop-image">
            <KxButton @click="showCropper">
                裁剪图片
            </KxButton>
            <pre>
                {{ JSON.stringify(result, null, 4) }}
            </pre>
            <img
                v-if="imageURL"
                class="cropped"
                :src="imageURL"
                alt="裁剪结果"
                :style="style"
            >
        </div>
        <DialogContainer></DialogContainer>
    \`,
  data: () => ({
    imageURL: null,
    result: undefined
  }),
  computed: {
    style() {
      const crop = this.result;
      if (!crop) {
        return {};
      }
      let transform = \`rotate(\${crop.rotate}deg)\`;
      if (crop.flipX) {
        transform += " scaleX(-1)";
      }
      if (crop.flipY) {
        transform += " scaleY(-1)";
      }
      return {
        width: \`\${crop.width}px\`,
        height: \`\${crop.height}px\`,
        transform,
        objectPosition: \`\${-crop.left}px \${-crop.top}px\`
      };
    }
  },
  methods: {
    async showCropper() {
      const [image] = await selectFile("image/*");
      const cropper = this.$dialog.show(ImageCropperVue, {
        image,
        aspectRatio: 16 / 9
      });
      this.result = await cropper.confirmPromise;
      URL.revokeObjectURL(this.imageURL);
      this.imageURL = URL.createObjectURL(image);
    }
  }
})`,...I.parameters?.docs?.source}}};const ot=["ImageCropper"];export{I as ImageCropper,ot as __namedExportsOrder,nt as default};

import{am as t,an as r}from"./index-legl_2XP.js";import{u as p}from"./index-ogdsOWcF.js";import"./iframe-Ui2FxQIZ.js";import"../sb-preview/runtime.js";import"./index-D-8MO0q_.js";import"./index-BnQ49SPI.js";import"./index-DrFu-skq.js";const a=`# @Kaciras-blog/uikit

Kaciras Blog 的组件库，包含一些通用的组件和函数，使用 Storybook 独立开发和测试。

[StoryBook 文档](https://kaciras-blog.github.io/uikit)

虽然是独立的库，但只是自己用用，没有推广的打算（UI 库太多了，完全不想竞争）。

# Install

\`\`\`
pnpm install @Kaciras-blog/uikit
\`\`\`

咋用：

\`\`\`typescript
import UIKit from "@kaciras-blog/uikit";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "@kaciras-blog/uikit/dist/style.css";
import App from './App.vue'

const store = createPinia();
const app = createApp(App);

app.use(store).use(UIKit).mount("body");
\`\`\`
`;function i(n){return t.jsx(r,{children:a})}function f(n={}){const{wrapper:o}={...p(),...n.components};return o?t.jsx(o,{...n,children:t.jsx(i,{...n})}):i()}export{f as default};

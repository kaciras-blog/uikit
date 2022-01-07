declare module "*.vue" {
	import type { DefineComponent } from "vue";

	// eslint-disable-next-line @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;

	export default component;
}

declare module "*.svg" {
	import { FunctionalComponent } from "vue";

	// Vue 没有像 React 一样提供 SVG 元素的 props 类型。
	export default FunctionalComponent;
}

import Vue, { VueConstructor } from 'vue';
import ButtonPager from "./paging/ButtonPager.vue";
import ScrollPager from "./paging/ScrollPager.vue";
import SkFadingCircle from "./components/SkFadingCircle.vue";
import FadeCarousel from "./components/FadeCarousel.vue";
import ToggleButton from "./components/ToggleButton.vue";
import ScrollPagingView from "./paging/ScrollPagingView.vue";
import ButtonPagingView from "./paging/ButtonPagingView.vue";
import KxCheckBox from "./components/KxCheckBox.vue";
import KxButton from "./components/KxButton.vue";
import KxTaskButton from "./components/KxTaskButton.vue";
import KxCarousel from "./components/KxCarousel.vue";
import KxRadioBox from "./components/KxRadioBox.vue";
import KxRadioBoxGroup from "./components/KxRadioBoxGroup.vue";

import KxDialog from "./dialog";

/**
 * 自动注册目录下的Vue组件。
 *
 * @param Vue Vue类型，使用Vue.use()来注册该插件
 */
function install(Vue: VueConstructor) {

	// 自动聚焦支持 v-autofocus
	Vue.directive("autofocus", {
		inserted: el => el.focus(),
	});

	// 文本选区绑定
	Vue.directive("bind-selection", {
		inserted(el, { expression, modifiers }, vnode) {
			const vm = vnode.context as Vue;

			if (!(el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement)) {
				throw new Error("v-bind-selection can only apply to HTMLTextAreaElement or HTMLInputElement");
			}
			vm.$watch(expression, nv => {
				const [s, e] = nv;
				el.selectionStart = s;
				el.selectionEnd = e;
				if (modifiers.focus) el.focus();
			});
		},
	});

	// 文本选区改变监听
	Vue.directive("on-selection-changed", {
		inserted(el, { expression }, vnode) {
			const vm = vnode.context as Vue;

			if (!(el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement)) {
				throw new Error("v-on-selection-changed can only apply to HTMLTextAreaElement or HTMLInputElement");
			}

			// @ts-ignore ???
			const handlerFunction = vm[expression] as (start: number, end: number) => void;
			if (typeof handlerFunction !== "function") {
				throw new Error("v-on-selection-changed value muse be a function");
			}

			let oldStart = el.selectionStart;
			let oldEnd = el.selectionEnd;

			function handleSelect() {
				const { selectionStart, selectionEnd } = el as any; // 没有改变el，但TypeScript检测不出来
				if (oldStart !== selectionStart || oldEnd !== selectionEnd) {
					oldStart = selectionStart;
					oldEnd = selectionEnd;
					handlerFunction(selectionStart, selectionEnd);
				}
			}

			el.addEventListener("click", handleSelect);		// 鼠标点击改变光标位置
			el.addEventListener("input", handleSelect);		// 增删内容改变光标位置
			el.addEventListener("keyup", handleSelect);		// Home,End,PageUp,PageDown
			el.addEventListener("keydown", handleSelect);	// 移动光标的键按住不放

			el.addEventListener("blur", () => handlerFunction(0, 0));
		},
	});

	Vue.component(SkFadingCircle.name, SkFadingCircle);
	Vue.component(ButtonPager.name, ButtonPager);
	Vue.component(ScrollPager.name, ScrollPager);
	Vue.component(FadeCarousel.name, FadeCarousel);
	Vue.component(ToggleButton.name, ToggleButton);
	Vue.component(ScrollPagingView.name, ScrollPagingView);
	Vue.component(ButtonPagingView.name, ButtonPagingView);
	Vue.component(KxCheckBox.name, KxCheckBox);
	Vue.component(KxButton.name, KxButton);
	Vue.component(KxTaskButton.name, KxTaskButton);
	Vue.component(KxCarousel.name, KxCarousel);
	Vue.component(KxRadioBox.name, KxRadioBox);
	Vue.component(KxRadioBoxGroup.name, KxRadioBoxGroup);

//	IDE 无法分析自动扫描的引用
// 	const requireContext = require.context(".", false,  /.vue$/);
// 	requireContext.keys().forEach(file => {
// 		const component = requireContext(file).default;
// 		Vue.component(component.name, component);
// 	});

	Vue.use(KxDialog);
}

// Auto-install
declare const window: Window & { Vue?: VueConstructor };
declare const global: any;

let GlobalVue = null;
if (typeof window !== "undefined") {
	GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(install);
}

export * from "./common";
export * from "./cancellation";
export * from "./dragging";
export * from "./interactive";

export default install;

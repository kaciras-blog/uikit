import ButtonPager from "./components/ButtonPager";
import ScrollPager from "./components/ScrollPager";
import SkFadingCircle from "./components/SkFadingCircle";
import Swiper from "./components/FadeCarousel";
import ToggleButton from "./components/ToggleButton";
import ScrollPageingView from "./components/ScrollPageingView";
import ButtonPageingView from "./components/ButtonPageingView";
import KxCheckBox from "./components/KxCheckBox";
import KxButton from "./components/KxButton";
import KxTaskButton from "./components/KxTaskButton";
import KxCarousel from "./components/KxCarousel";
import KxRadioBox from "./components/KxRadioBox";
import KxRadioBoxGroup from "./components/KxRadioBoxGroup";

import KxDialog from "./dialog";

/**
 * 自动注册目录下的Vue组件。
 *
 * @param Vue Vue类型，使用Vue.use()来注册该插件
 * @param options 选项
 */
function install (Vue, options = {}) {

	// 自动聚焦支持 v-autofocus
	Vue.directive("autofocus", {
		inserted: el => el.focus(),
	});

	// 文本选区绑定
	Vue.directive("bind-selection", {
		inserted (el, { expression, modifiers }, vnode) {
			const vm = vnode.context;
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
		inserted (el, { expression }, vnode) {
			const vm = vnode.context;

			let oldStart = el.selectionStart;
			let oldEnd = el.selectionEnd;

			function handleSelect () {
				const { selectionStart, selectionEnd } = el;
				if (oldStart !== selectionStart || oldEnd !== selectionEnd) {
					oldStart = selectionStart;
					oldEnd = selectionEnd;
					vm[expression](selectionStart, selectionEnd);
				}
			}

			el.addEventListener("click", handleSelect);		// 鼠标点击改变光标位置
			el.addEventListener("input", handleSelect);		// 增删内容改变光标位置
			el.addEventListener("keyup", handleSelect);		// Home,End,PageUp,PageDown
			el.addEventListener("keydown", handleSelect);	// 移动光标的键按住不放

			el.addEventListener("blur", () => vm[expression](0, 0));
		},
	});

	Vue.component(SkFadingCircle.name, SkFadingCircle);
	Vue.component(ButtonPager.name, ButtonPager);
	Vue.component(ScrollPager.name, ScrollPager);
	Vue.component(Swiper.name, Swiper);
	Vue.component(ToggleButton.name, ToggleButton);
	Vue.component(ScrollPageingView.name, ScrollPageingView);
	Vue.component(ButtonPageingView.name, ButtonPageingView);
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
let GlobalVue = null;
if (typeof window !== "undefined") {
	GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(install);
}

export * from "./helpers";
export * from "./cancellation";
export * from "./dragging";

export default install;

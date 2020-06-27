import "@fortawesome/fontawesome-free/css/all.css";
import "./css/index.less";

import { VueConstructor } from "vue";
import ButtonPager from "./paging/ButtonPager.vue";
import ScrollPager from "./paging/ScrollPager.vue";
import SkFadingCircle from "./components/SkFadingCircle.vue";
import FadeCarousel from "./components/FadeCarousel.vue";
import ScrollPagingView from "./paging/ScrollPagingView.vue";
import ButtonPagingView from "./paging/ButtonPagingView.vue";
import KxCheckBox from "./components/KxCheckBox.vue";
import KxButton from "./components/KxButton.vue";
import KxSwitch from "./components/KxSwitch.vue";
import KxTaskButton from "./components/KxTaskButton.vue";
import KxCarousel from "./components/KxCarousel.vue";
import KxRadioBox from "./components/KxRadioBox.vue";
import KxRadioBoxGroup from "./components/KxRadioBoxGroup.vue";
import KxPasswordInput from "./components/KxPasswordInput.vue";
import KxProgress from "./components/KxProgress.vue";

import AutoFocus from "./directives/autofocus";
import ImeInput from "./directives/ime-input";
import SelectionBinding from "./directives/selection-bind";
import SelectionChangeDirective from "./directives/selection-change";
import Ripple from "./directives/ripple";

import KxDialog from "./dialog";

/**
 * 自动注册目录下的Vue组件。
 *
 * @param Vue Vue类型，使用Vue.use()来注册该插件
 */
function install(Vue: VueConstructor) {

	Vue.component(SkFadingCircle.name, SkFadingCircle);
	Vue.component(ButtonPager.name, ButtonPager);
	Vue.component(ScrollPager.name, ScrollPager);
	Vue.component(FadeCarousel.name, FadeCarousel);
	Vue.component(ScrollPagingView.name, ScrollPagingView);
	Vue.component(ButtonPagingView.name, ButtonPagingView);
	Vue.component(KxCheckBox.name, KxCheckBox);
	Vue.component(KxButton.name, KxButton);
	Vue.component(KxSwitch.name, KxSwitch);
	Vue.component(KxTaskButton.name, KxTaskButton);
	Vue.component(KxCarousel.name, KxCarousel);
	Vue.component(KxRadioBox.name, KxRadioBox);
	Vue.component(KxRadioBoxGroup.name, KxRadioBoxGroup);
	Vue.component(KxPasswordInput.name, KxPasswordInput);
	Vue.component(KxProgress.name, KxProgress);

	// IDE 无法分析自动扫描的引用
// 	const requireContext = require.context(".", false,  /.vue$/);
// 	requireContext.keys().forEach(file => {
// 		const component = requireContext(file).default;
// 		Vue.component(component.name, component);
// 	});

	Vue.directive("autofocus", AutoFocus);
	Vue.directive("ime-input", ImeInput);
	Vue.directive("bind-selection", SelectionBinding);
	Vue.directive("on-selection-change", SelectionChangeDirective);
	Vue.directive("ripple", Ripple);

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
export * from "./image-size";
export * from "./scroll";
export * from "./interactive";

export default install;

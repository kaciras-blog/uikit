import "@fortawesome/fontawesome-free/css/all.css";
import "./css/index.less";

import { VueConstructor } from "vue";
import ButtonPager from "./paging/ButtonPager.vue";
import ScrollPager from "./paging/ScrollPager.vue";
import SkFadingCircle from "./components/SkFadingCircle.vue";
import ScrollPagingView from "./paging/ScrollPagingView.vue";
import ButtonPagingView from "./paging/ButtonPagingView.vue";
import KxCheckBox from "./components/KxCheckBox.vue";
import KxSwitchBox from "./components/KxSwitchBox.vue";
import KxRadioBox from "./components/KxRadioBox.vue";
import KxRadioBoxGroup from "./components/KxRadioBoxGroup.vue";
import KxButton from "./components/KxButton.vue";
import KxTaskButton from "./components/KxTaskButton.vue";
import KxToolButton from "./components/KxToolButton.vue";
import KxPasswordInput from "./components/KxPasswordInput.vue";
import KxProgress from "./components/KxProgress.vue";

import AutoFocus from "./directives/autofocus";
import ImeInput from "./directives/ime-input";
import SelectionBinding from "./directives/selection-bind";
import SelectionChange from "./directives/selection-change";
import SelectionModel from "./directives/selection-model";
import Ripple from "./directives/ripple";
import { MediaQueryAPI } from "./media-query";
import KxDialog, { KxDialogAPI } from "./dialog";

declare module "vue/types/vue" {
	export interface Vue {
		$dialog: KxDialogAPI;
		$mediaQuery: MediaQueryAPI;
	}
}

export * from "./common";
export * from "./cancellation";
export * from "./dragging";
export * from "./media-resolution";
export * from "./scroll";
export * from "./interactive";

/**
 * 自动注册目录下的Vue组件。
 *
 * @param Vue Vue类型，使用Vue.use()来注册该插件
 */
export default function install(Vue: VueConstructor) {
	Vue.component(SkFadingCircle.name, SkFadingCircle);
	Vue.component(ButtonPager.name, ButtonPager);
	Vue.component(ScrollPager.name, ScrollPager);
	Vue.component(ScrollPagingView.name, ScrollPagingView);
	Vue.component(ButtonPagingView.name, ButtonPagingView);
	Vue.component(KxCheckBox.name, KxCheckBox);
	Vue.component(KxButton.name, KxButton);
	Vue.component(KxSwitchBox.name, KxSwitchBox);
	Vue.component(KxTaskButton.name, KxTaskButton);
	Vue.component(KxToolButton.name, KxToolButton);
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
	Vue.directive("ripple", Ripple);
	Vue.directive("bind-selection", SelectionBinding);
	Vue.directive("on-selection-change", SelectionChange);
	Vue.directive("selection-model", SelectionModel);

	Vue.use(KxDialog);
}

import "@fortawesome/fontawesome-free/css/all.css";
import "./css/index.less";
import { App } from "vue";

import SkFadingCircle from "./components/SkFadingCircle.vue";
import KxCheckBox from "./components/KxCheckBox.vue";
import KxRadioBox from "./components/KxRadioBox.vue";
import KxSwitchBox from "./components/KxSwitchBox.vue";
import KxRadioBoxGroup from "./components/KxRadioBoxGroup.vue";
import KxButton from "./components/KxButton.vue";
import KxTaskButton from "./components/KxTaskButton.vue";
import KxPasswordInput from "./components/KxPasswordInput.vue";
import KxProgress from "./components/KxProgress.vue";
import PopupAlertContainer from "./components/PopupAlertContainer.vue";

import AutoFocus from "./directives/autofocus";
import ImeInput from "./directives/ime-input";
import SelectionBinding from "./directives/selection-bind";
import SelectionChange from "./directives/selection-change";
import SelectionModel from "./directives/selection-model";
import Ripple from "./directives/ripple";

import { MediaQueryAPI } from "./media-query";
import { KxDialogAPI } from "./dialog";

declare module "vue" {
	export interface Vue {
		$dialog: KxDialogAPI;
		$mediaQuery: MediaQueryAPI;
	}
}

export * from "./common";
export * from "./dragging";
export * from "./media-resolution";
export * from "./scroll";
export * from "./interactive";

export { default as PromiseDelegate } from "./PromiseDelegate";
export { default as PromiseSource } from "./PromiseSource";

/**
 * 自动注册目录下的 Vue 组件。
 */
export default function install(app: App) {
	app.component(SkFadingCircle.name, SkFadingCircle);
	// app.component(ButtonPager.name, ButtonPager);
	// app.component(ScrollPager.name, ScrollPager);
	// app.component(ScrollPagingView.name, ScrollPagingView);
	// app.component(ButtonPagingView.name, ButtonPagingView);
	app.component(KxButton.name, KxButton);
	app.component("KxTaskButton", KxTaskButton);
	app.component(KxSwitchBox.name, KxSwitchBox);
	app.component(KxCheckBox.name, KxCheckBox);
	app.component(KxRadioBox.name, KxRadioBox);
	app.component(KxRadioBoxGroup.name, KxRadioBoxGroup);
	app.component(KxPasswordInput.name, KxPasswordInput);
	app.component(KxProgress.name, KxProgress);
	app.component(PopupAlertContainer.name, PopupAlertContainer);

	app.directive("autofocus", AutoFocus);
	app.directive("ime-input", ImeInput);
	app.directive("ripple", Ripple);
	app.directive("bind-selection", SelectionBinding);
	app.directive("on-selection-change", SelectionChange);
	app.directive("selection-model", SelectionModel);

	// app.use(KxDialog);
}

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
import KxBaseDialog from "./dialog/KxBaseDialog.vue";
import KxFrame from "./dialog/KxFrame.vue";
import KxFrameHeader from "./dialog/KxFrameHeader.vue";
import KxDialogButtons from "./dialog/KxDialogButtons.vue";
import AutoFocus from "./directives/autofocus";
import ImeInput from "./directives/ime-input";
import SelectionBinding from "./directives/selection-bind";
import SelectionChange from "./directives/selection-change";
import SelectionModel from "./directives/selection-model";
import Ripple from "./directives/ripple";
import { MediaQueryAPI } from "./media-query";
import QuickAlert, { KxDialogAPI } from "./dialog/quick-alert";

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
	app.use(QuickAlert);

	app.component("SkFadingCircle", SkFadingCircle);
	// app.component("ButtonPager", ButtonPager);
	// app.component("ScrollPager", ScrollPager);
	// app.component("ScrollPagingView", ScrollPagingView);
	// app.component("ButtonPagingView", ButtonPagingView);
	app.component("KxButton", KxButton);
	app.component("KxTaskButton", KxTaskButton);
	app.component("KxSwitchBox", KxSwitchBox);
	app.component("KxCheckBox", KxCheckBox);
	app.component("KxRadioBox", KxRadioBox);
	app.component("KxRadioBoxGroup", KxRadioBoxGroup);
	app.component("KxPasswordInput", KxPasswordInput);
	app.component("KxProgress", KxProgress);
	app.component("PopupAlertContainer", PopupAlertContainer);
	app.component("KxBaseDialog", KxBaseDialog);
	app.component("KxFrame", KxFrame);
	app.component("KxFrameHeader", KxFrameHeader);
	app.component("KxDialogButtons", KxDialogButtons);

	app.directive("autofocus", AutoFocus);
	app.directive("ime-input", ImeInput);
	app.directive("ripple", Ripple);
	app.directive("bind-selection", SelectionBinding);
	app.directive("on-selection-change", SelectionChange);
	app.directive("selection-model", SelectionModel);
}

import "./css/index.less";
import { App } from "vue";

import AtomSpinner from "./components/AtomSpinner.vue";
import SkFadingCircle from "./components/SkFadingCircle.vue";
import KxProgress from "./components/KxProgress.vue";
import SmartLink from "./components/SmartLink.vue";
import KxCheckBox from "./input/KxCheckBox.vue";
import KxRadioBox from "./input/KxRadioBox.vue";
import KxSelect from "./input/KxSelect.vue";
import KxSwitchBox from "./input/KxSwitchBox.vue";
import KxRadioBoxGroup from "./input/KxRadioBoxGroup.vue";
import MaterialTextInput from "./input/MaterialTextInput.vue";
import KxButton from "./input/KxButton.vue";
import KxTaskButton from "./input/KxTaskButton.vue";
import KxPasswordInput from "./input/KxPasswordInput.vue";
import KxBaseDialog from "./dialog/KxBaseDialog.vue";
import KxFrame from "./dialog/KxFrame.vue";
import KxFrameHeader from "./dialog/KxFrameHeader.vue";
import QuickAlert from "./dialog/quick-alert";
import KxDialogButtons from "./dialog/KxDialogButtons.vue";
import KxDialogContainer from "./dialog/KxDialogContainer.vue";
import ToastContainer from "./dialog/ToastContainer.vue";
import PagingButtons from "./paging/PagingButtons.vue";
import ButtonPagingView from "./paging/ButtonPagingView.vue";
import ScrollPager from "./paging/ScrollPager.vue";
import ScrollPagingView from "./paging/ScrollPagingView.vue";

import vAutoFocus from "./directives/autofocus";
import vImeInput from "./directives/ime-input";
import vBindSelection from "./directives/selection-bind";
import vSelectionChange from "./directives/selection-change";
import vSelectionModel from "./directives/selection-model";
import vRipple from "./directives/ripple";

export * from "./dialog/quick-alert";
export * from "./break-point";
export * from "./common";
export * from "./composition";
export * from "./dragging";
export * from "./media-resolution";
export * from "./scroll";
export * from "./interactive";

export { default as PromiseDelegate } from "./PromiseDelegate";
export { default as PromiseSource } from "./PromiseSource";

export {
	AtomSpinner,
	KxSelect,
	MaterialTextInput,
	SkFadingCircle,
	PagingButtons,
	SmartLink,
	ScrollPager,
	ScrollPagingView,
	ButtonPagingView,
	KxButton,
	KxTaskButton,
	KxSwitchBox,
	KxCheckBox,
	KxRadioBox,
	KxRadioBoxGroup,
	KxPasswordInput,
	KxProgress,
	KxBaseDialog,
	KxFrame,
	KxFrameHeader,
	KxDialogButtons,
	KxDialogContainer,
	ToastContainer,

	vAutoFocus,
	vImeInput,
	vRipple,
	vSelectionChange,
	vBindSelection,
	vSelectionModel,
};

/**
 * 自动注册目录下的 Vue 组件。
 */
export default function install(app: App) {
	app.use(QuickAlert);

	app.component("AtomSpinner", AtomSpinner);
	app.component("SmartLink", SmartLink);
	app.component("SkFadingCircle", SkFadingCircle);
	app.component("PagingButtons", PagingButtons);
	app.component("ScrollPager", ScrollPager);
	app.component("ScrollPagingView", ScrollPagingView);
	app.component("ButtonPagingView", ButtonPagingView);
	app.component("KxButton", KxButton);
	app.component("KxSelect", KxSelect);
	app.component("KxTaskButton", KxTaskButton);
	app.component("KxSwitchBox", KxSwitchBox);
	app.component("KxCheckBox", KxCheckBox);
	app.component("KxRadioBox", KxRadioBox);
	app.component("KxRadioBoxGroup", KxRadioBoxGroup);
	app.component("MaterialTextInput", MaterialTextInput);
	app.component("KxPasswordInput", KxPasswordInput);
	app.component("KxProgress", KxProgress);
	app.component("KxBaseDialog", KxBaseDialog);
	app.component("KxFrame", KxFrame);
	app.component("KxFrameHeader", KxFrameHeader);
	app.component("KxDialogButtons", KxDialogButtons);
	app.component("KxDialogContainer", KxDialogContainer);
	app.component("ToastContainer", ToastContainer);

	app.directive("autofocus", vAutoFocus);
	app.directive("ime-input", vImeInput);
	app.directive("ripple", vRipple);
	app.directive("bind-selection", vBindSelection);
	app.directive("on-selection-change", vSelectionChange);
	app.directive("selection-model", vSelectionModel);
}

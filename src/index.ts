import "./css/index.less";
import { App } from "vue";
import QuickAlert from "./dialog/quick-alert";
import BreakPoint from "./break-point";

export { default as vAutofocus } from "./directives/autofocus";
export { default as vImeInput } from "./directives/ime-input";
export { default as vBindSelection } from "./directives/selection-bind";
export { default as vSelectionChange } from "./directives/selection-change";
export { default as vRipple } from "./directives/ripple";

export { default as AtomSpinner } from "./components/AtomSpinner.vue";
export { default as SkFadingCircle } from "./components/SkFadingCircle.vue";
export { default as KxProgress } from "./components/KxProgress.vue";
export { default as SmartLink } from "./components/SmartLink.vue";
export { default as RelativeTime } from "./components/RelativeTime.vue";
export { default as KxCheckBox } from "./input/KxCheckBox.vue";
export { default as KxRadioBox } from "./input/KxRadioBox.vue";
export { default as KxSelect } from "./input/KxSelect.vue";
export { default as KxSwitchBox } from "./input/KxSwitchBox.vue";
export { default as KxRadioBoxGroup } from "./input/KxRadioBoxGroup.vue";
export { default as MaterialTextInput } from "./input/MaterialTextInput.vue";
export { default as KxButton } from "./input/KxButton.vue";
export { default as KxTaskButton } from "./input/KxTaskButton.vue";
export { default as KxPasswordInput } from "./input/KxPasswordInput.vue";
export { default as KxBaseDialog } from "./dialog/KxBaseDialog.vue";
export { default as KxFrame } from "./dialog/KxFrame.vue";
export { default as KxDialogButtons } from "./dialog/KxDialogButtons.vue";
export { default as DialogContainer } from "./dialog/DialogContainer.vue";
export { default as ToastContainer } from "./dialog/ToastContainer.vue";
export { default as ImageCropper } from "./dialog/ImageCropper.vue";
export { default as PagingButtons } from "./paging/PagingButtons.vue";
export { default as ButtonPagingView } from "./paging/ButtonPagingView.vue";
export { default as ScrollPager } from "./paging/ScrollPager.vue";
export { default as ScrollPagingView } from "./paging/ScrollPagingView.vue";

export * from "./break-point";
export * from "./common";
export * from "./composition";
export * from "./dragging";
export * from "./scroll";
export * from "./dialog/quick-alert";

export { default as PromiseDelegate } from "./PromiseDelegate";
export { default as PromiseSource } from "./PromiseSource";

/** 注册各个子模块的插件 */
export default function install(app: App) {
	app.use(QuickAlert);
	app.use(BreakPoint);
}

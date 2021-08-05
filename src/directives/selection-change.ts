import { DirectiveBinding } from "vue";
import { addSelectionChangeListener, SelectionChangeHandler } from "../interactive";

/**
 * 文本选区改变监听，当元素的 selectionStart 和 selectionEnd 改变时触发回调。
 *
 * 该指令只能用于浏览器环境。
 *
 * @example
 * <textarea v-on-selection-change="handleSelect"/>
 */
export default {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const { value } = binding;

		if (!(el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement)) {
			throw new Error("v-on-selection-changed can only apply to HTMLTextAreaElement or HTMLInputElement");
		}

		const handler = value as SelectionChangeHandler;
		if (typeof handler !== "function") {
			throw new Error("v-on-selection-changed value muse be a function");
		}

		(el as any)._vRemoveSelectionChangeListener = addSelectionChangeListener(el, handler);
	},

	unmounted: (el: any) => el._vRemoveSelectionChangeListener(),
};

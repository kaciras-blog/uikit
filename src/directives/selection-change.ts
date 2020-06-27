import { VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";
import { addSelectionChangeListener } from "../interactive";

/**
 * 文本选区改变监听，当元素的 selectionStart 和 selectionEnd 改变时触发回调。
 *
 * 该指令只能用于浏览器环境。
 *
 * @example
 * <textarea v-on-selection-change="handleSelect"/>
 */
export default {
	inserted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
		const vm = vnode.context!;

		if (!(el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement)) {
			throw new Error("v-on-selection-changed can only apply to HTMLTextAreaElement or HTMLInputElement");
		}

		// @ts-ignore
		const handler = vm[binding.expression] as SelectionChangeHandler;

		if (typeof handler !== "function") {
			throw new Error("v-on-selection-changed value muse be a function");
		}

		(el as any)._vRemoveSelectionChangeListener = addSelectionChangeListener(el, handler);
	},

	unbind: (el: any) => el._vRemoveSelectionChangeListener(),
};

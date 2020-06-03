import Vue, { VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";

/**
 * 文本选区绑定，当给定的选区数据改变时设置元素的 selectionStart 和 selectionEnd。
 * 如果有 focus 修饰符，则在设置选区后自动聚焦元素。
 *
 * @example
 * <textarea v-bind-selection.focus="selection"/>
 * <input v-bind-selection="selection">
 */
export default {
	inserted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
		const vm = vnode.context as Vue;
		const { expression, modifiers } = binding;

		if (!(el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement)) {
			throw new Error("v-bind-selection can only apply to HTMLTextAreaElement or HTMLInputElement");
		}
		vm.$watch(expression, (nv) => {
			const [s, e] = nv;
			el.selectionStart = s;
			el.selectionEnd = e;
			if (modifiers.focus) el.focus();
		});
	},
};

/* 文本选区绑定 */
import Vue, { VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";

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

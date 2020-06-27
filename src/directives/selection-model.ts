import { DirectiveBinding } from "vue/types/options";
import { VNode } from "vue";
import bindDirective from "./selection-bind";
import { addSelectionChangeListener } from "../interactive";

/**
 * 选区的 v-model 实现，将 selectionStart 和 selectionEnd 双向绑定到数据。
 * 数据的格式为 [start: number, end: number] 二元组。
 */
export default {
	inserted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
		const vm = vnode.context!;
		const { expression } = binding;

		function handler(s: number, e: number) {

			// @ts-ignore Vue2的残废TS支持
			vm[expression] = [s, e];
		}

		bindDirective.inserted(el, binding, vnode);

		// @ts-ignore bindDirective.inserted 里已做检查
		(el as any)._vRemoveSelectionChangeListener = addSelectionChangeListener(el, handler);
	},
	unbind(el: any) {
		bindDirective.unbind(el);
		el._vRemoveSelectionChangeListener();
	},
};

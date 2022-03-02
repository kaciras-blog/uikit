import { DirectiveBinding } from "vue";
import bindDirective from "./selection-bind";
import { addSelectionChangeListener } from "../interactive";

/**
 * TODO: Vue3 实现自定义 v-model 需要扩展编译器，目前考虑中。
 *
 * 选区的 v-model 实现，将 selectionStart 和 selectionEnd 双向绑定到数据。
 * 数据的格式为 [start: number, end: number] 二元组。
 */
export default {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const { value, instance } = binding;

		function handler(s: number, e: number) {

			// @ts-ignore Vue2的残废TS支持
			instance[value] = [s, e];
		}

		bindDirective.mounted(el, binding);

		// @ts-ignore bindDirective.inserted 里已做检查
		(el as any)._vRemoveSelectionChangeListener = addSelectionChangeListener(el, handler);
	},
	unmounted(el: any) {
		bindDirective.unmounted(el);
		el._vRemoveSelectionChangeListener();
	},
};

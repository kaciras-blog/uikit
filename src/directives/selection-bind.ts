import { DirectiveBinding } from "vue";

/**
 * 文本选区绑定，当给定的选区数据改变时设置元素的 selectionStart 和 selectionEnd。
 * 如果有 focus 修饰符，则在设置选区后自动聚焦元素。
 *
 * 该指令只能用于浏览器环境。
 *
 * @example
 * <textarea v-bind-selection.focus="selection"/>
 * <input v-bind-selection="selection">
 */
export default {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		// TODO: expression 没了，用 value 似乎得加额外的引号
		const { value, instance, modifiers } = binding;

		if (!(el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement)) {
			throw new Error("v-bind-selection can only apply to HTMLTextAreaElement or HTMLInputElement");
		}

		(el as any)._vSelectionUnwatch = instance!.$watch(value, (range: [number, number]) => {
			const [s, e] = range;
			el.selectionStart = s;
			el.selectionEnd = e;
			if (modifiers.focus) el.focus();
		});
	},

	unmounted: (el: any) => el._vSelectionUnwatch(),
};

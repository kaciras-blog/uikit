import { DirectiveBinding, toRaw } from "vue";

export type SelectableElement = HTMLTextAreaElement | HTMLInputElement;

/**
 * 文本选区绑定，当给定的范围改变时设置元素的 selectionStart 和 selectionEnd。
 * 如果有 focus 修饰符，则在设置选区后自动聚焦元素。
 *
 * 该指令只能用于浏览器环境。
 *
 * @example
 * <textarea v-bind-selection.focus="selection"/>
 * <input v-bind-selection="selection">
 */
export default (el: SelectableElement, binding: DirectiveBinding) => {
	const { value, modifiers } = binding;

	const [s, e] = toRaw(value);
	el.selectionStart = s;
	el.selectionEnd = e;

	if (modifiers.focus) el.focus();
};

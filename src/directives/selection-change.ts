import { DirectiveBinding } from "vue";
import { addSelectionChangeListener, SelectionChangeHandler } from "../interactive";
import { SelectableElement } from "./selection-bind";

/**
 * 文本选区改变监听，当元素的 selectionStart 和 selectionEnd 改变时触发回调。
 *
 * 该指令只能用于浏览器环境。
 *
 * @example
 * <textarea v-on-selection-change="handleSelect"/>
 */
export default {
	mounted(el: SelectableElement, binding: DirectiveBinding<SelectionChangeHandler>) {
		const { value } = binding;
		(el as any)._vRemoveSelectionChangeListener = addSelectionChangeListener(el, value);
	},

	unmounted: (el: any) => el._vRemoveSelectionChangeListener(),
};

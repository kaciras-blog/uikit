import { Directive, DirectiveBinding } from "vue";
import { addSelectionChangeListener, SelectionChangeHandler } from "../common";
import { SelectableElement } from "./selection-bind";

type DirValue = SelectionChangeHandler | [number, number];

const kListener = Symbol("SelectionListener");

function listen(el: SelectableElement, binding: DirectiveBinding<DirValue>) {
	const { value } = binding;

	const handler = typeof value === "function" ?
		value :
		(s: number, e: number) => value.splice(0, 2, s, e);

	(el as any)[kListener] = addSelectionChangeListener(el, handler);
}

/**
 * 文本选区改变监听，当元素的 selectionStart 和 selectionEnd 改变时触发回调。
 *
 * 该指令只能用于浏览器环境。
 *
 * @example
 * <textarea v-on-selection-change="v => selection = v"/>
 * <textarea v-on-selection-change="selectionRef"/>
 */
export default <Directive<SelectableElement>>{
	updated(el, binding) {
		(el as any)[kListener]();
		listen(el, binding);
	},
	mounted: listen,
	unmounted: (el: any) => el[kListener](),
};

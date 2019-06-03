/* 文本选区改变监听 */
import Vue, { VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";

// TODO: 没有清理监听器
export default {
	inserted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
		const vm = vnode.context as Vue;

		if (!(el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement)) {
			throw new Error("v-on-selection-changed can only apply to HTMLTextAreaElement or HTMLInputElement");
		}

		// @ts-ignore
		const handlerFunction = vm[binding.expression] as (start: number, end: number) => void;
		if (typeof handlerFunction !== "function") {
			throw new Error("v-on-selection-changed value muse be a function");
		}

		let oldStart = el.selectionStart;
		let oldEnd = el.selectionEnd;

		function handleSelect() {
			const { selectionStart, selectionEnd } = el as any; // 没有改变el，但TypeScript检测不出来
			if (oldStart !== selectionStart || oldEnd !== selectionEnd) {
				oldStart = selectionStart;
				oldEnd = selectionEnd;
				handlerFunction(selectionStart, selectionEnd);
			}
		}

		el.addEventListener("click", handleSelect);		// 鼠标点击改变光标位置
		el.addEventListener("input", handleSelect);		// 增删内容改变光标位置
		el.addEventListener("keyup", handleSelect);		// Home,End,PageUp,PageDown
		el.addEventListener("keydown", handleSelect);	// 移动光标的键按住不放

		// 没有焦点离开的监听，因为上层对离开的处理方式可能不一样
	},
};

import { DirectiveBinding } from "vue/types/options";

/**
 * 类似 input 事件，额外处理了输入法问题。
 * 输入法再未上屏时的字符（如拼音）也算作元素的内容并触发 input 事件，使用该指令来监听可以避免这个问题。
 */
export default {
	inserted(el: HTMLElement, binding: DirectiveBinding) {
		let completed = true;
		el.addEventListener("compositionstart", () => {
			completed = false;
		});
		el.addEventListener("compositionend", (event) => {
			completed = true;
			binding.value(event);
		});
		el.addEventListener("input", (event) => {
			completed && binding.value(event);
		});
	},
};

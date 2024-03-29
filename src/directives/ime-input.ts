import { DirectiveBinding } from "vue";

/**
 * 类似 input 事件，额外处理了输入法问题。
 *
 * 浏览器将未上屏时的字符（如拼音输入法）也算作元素的内容并触发 input 事件，
 * 使用该指令来监听可以避免这个问题。
 *
 * 原生的 isComposing 属性 Safari 不支持：
 * https://caniuse.com/mdn-api_inputevent_iscomposing
 *
 * @example
 * <textarea v-ime-input="e => console.log(e.target.value)"/>
 */
export default {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
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

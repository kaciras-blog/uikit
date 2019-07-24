import { DirectiveBinding } from "vue/types/options";

/**
 * 自动聚焦指令，可以在元素插入时或监视指定的值为trusty时聚焦元素。
 * 用法：
 * <div v-autofocus> 或 <div v-autofocus="showElement">
 */
export default {
	inserted(el: HTMLElement, { value, expression }: DirectiveBinding) {
		if (expression === undefined || value) el.focus();
	},
	update: (el: HTMLElement, { value }: DirectiveBinding) => value && el.focus(),
};

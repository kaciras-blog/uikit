import { DirectiveBinding } from "vue/types/options";

/**
 * 自动聚焦指令，可以在元素插入时或监视指定的值为trusty时聚焦元素。
 *
 * @example
 * <input v-autofocus></input>
 * <input v-autofocus="showElement"></input>
 */
export default {
	inserted(el: HTMLElement, { value, expression }: DirectiveBinding) {
		if (expression === undefined || value) el.focus();
	},
	update: (el: HTMLElement, { value }: DirectiveBinding) => value && el.focus(),
};

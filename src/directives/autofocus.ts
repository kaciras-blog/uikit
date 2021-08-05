import { DirectiveBinding } from "vue";

/**
 * 自动聚焦指令，可以在元素插入时或监视指定的值为trusty时聚焦元素。
 *
 * @example
 * <input v-autofocus></input>
 * <input v-autofocus="showElement"></input>
 */
export default (el: HTMLElement, { value }: DirectiveBinding) => value && el.focus();

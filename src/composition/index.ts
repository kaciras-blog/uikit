import { customRef, onMounted, onUnmounted } from "vue";
import { noop } from "@vueuse/core";

/**
 * 创建一个非响应的 ref 对象，修改本对象的值不会触发刷新。
 *
 * <h2>为什么搞这个</h2>
 * Vue 中没有与 React 的 useRef 对等的函数；同时 Vue 的一些特性，
 * 比如模板中的 ref 和 v-model 要求值必须是 ref 对象。
 *
 * 某些特殊情况下需要避免它们导致的重新渲染，所以就有了这个函数。
 *
 * 自己模仿 ref 对象（const myRef = { value: null }）是不行的，
 * Vue 的内部有太多的“黑魔法”，比如检查一个内部的 Symbol 来判断是不是 ref。
 *
 * @param initialValue 初始值。
 */
export function plainRef<T>(initialValue?: T) {
	return customRef<T | undefined>(() => ({
		get: () => initialValue,
		set: value => { initialValue = value; },
	}));
}

const kCount = Symbol("PreventScrollCounter");
const kBackup = Symbol("PreventScrollBackup");

/**
 * 这里直接把数据放到元素上了，如果不想这么做还可以用全局 Map。
 */
interface ElementWithCustomProps extends HTMLElement {
	[kCount]: number;
	[kBackup]: Partial<CSSStyleDeclaration>;
}

/**
 * 临时禁止元素的滚动条，当组件挂载时启用，卸载后还原。
 * 该 API 可重入，即支持同时在多个组件中调用。
 *
 * 【暂不支持 SSR】
 * 目前用到的地方都是二级窗口，SSR 中不会被调用，所以没问题。
 *
 * @param element 禁止滚动的元素，默认是页面。
 */
export function usePreventScroll(element = document.body) {
	const el = element as ElementWithCustomProps;

	onMounted(() => {
		const count = el[kCount] ?? 0;
		el[kCount] = count + 1;

		if (count > 0) {
			return;
		}
		const { style } = el;

		el[kBackup] = {
			maxHeight: style.maxHeight,
			maxWidth: style.maxWidth,
			overflow: style.overflow,
		};
		style.maxHeight = "100%";
		style.maxWidth = "100%";
		style.overflow = "hidden";
	});

	onUnmounted(() => {
		if ((el[kCount] -= 1) > 0) {
			return;
		}
		Object.assign(el.style, el[kBackup]);
	});
}

/**
 * IntersectionObserver 的简单封装，返回一个用于 :ref 的函数，
 * 在元素插入后监听，移除时停止，该函数同一时刻只能监听一个元素。
 *
 * <h2>与 vueuse 对比</h2>
 * 该函数类似 vueuse/useIntersectionObserver，但更简单，无需再定义个 ref。
 *
 * @param cb 跟 IntersectionObserver 的参数一样
 * @param options 跟 IntersectionObserver 的参数一样
 */
export function useIntersectionHandler(
	cb: IntersectionObserverCallback,
	options?: IntersectionObserverInit,
) {
	if (typeof window === "undefined") {
		return noop;
	}
	const observer = new IntersectionObserver(cb, options);

	return (el: Element | null) => {
		if (el) {
			observer.observe(el);
		} else {
			observer.disconnect();
		}
	};
}

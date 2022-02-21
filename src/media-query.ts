import { App, computed, inject } from "vue";
import { defineStore, Pinia } from "pinia";

/**
 * 断点对象，键位断点名，值为断点的宽度。
 *
 * 最大的一个值没有意义，因为比倒数第二大的就认为是最大，而没必要去比较最大的宽度值，
 * 所以随便设一个较大的数即可，但是不要设为 Infinity 因为它不是合法的 JSON 值，
 * 在 SSR 序列化时会出问题。
 *
 * @example
 * const breakpoints = {
 *     mobile: 768,
 *     tablet: 992,
 *     desktop: 1200,
 *     wide: 999999,
 * };
 */
export interface MediaBreakPoints {
	[key: string]: number;
}

export const useMQStore = defineStore("mediaQuery", {
	state: () => ({ width: 999999 }),
});

type MQStore = ReturnType<typeof useMQStore>;

/**
 * 本插件依赖 Vuex，所以要同时注册到 Vue 和 Vuex 的 Store 实例。
 *
 * 因为 vueuse 的 useBreakpoints 有以下缺点，所以自己实现了：
 * 1）不能指定初始值。
 * 2）断点一般都是通用的几个值，但它每次都要传，不方便。
 * 3）每次都会添加 N（断点数）个监听，即便指匹配一个。
 */
export class MediaQueryManager {

	private readonly breakpoints: MediaBreakPoints;
	private readonly entries: Array<[string, number]>;

	constructor(breakpoints: MediaBreakPoints) {
		this.breakpoints = breakpoints;
		this.entries = Object.entries(breakpoints);

		if (!this.entries.length) {
			throw new Error("至少要有一个断点");
		}
		this.entries.sort((a, b) => a[1] - b[1]);
	}

	/**
	 * 监听 window.matchMedia() 的 change 事件，在窗口大小改变时自动修改状态。
	 * 该函数只能在浏览器环境下使用。
	 *
	 * @param pinia Pinia 的存储实例
	 * @param window_ 监听的window对象，默认是全局变量
	 */
	observeWindow(pinia: Pinia, window_ = window) {
		const { entries } = this;

		if (entries.length < 2) {
			return;
		}
		const store = useMQStore(pinia);

		function observe(width: number, query: string) {
			const mql = window_.matchMedia(query);

			// 立即检查一下，在后端误判时立刻恢复到正确的宽度
			if (mql.matches) {
				store.width = width;
			}

			const update = () => mql.matches && (store.width = width);

			if ("addEventListener" in mql) {
				mql.addEventListener("change", update);
			} else {
				// noinspection JSDeprecatedSymbols Safari 只有 addListener()
				mql.addListener(update);
			}
		}

		const first = entries[0];
		observe(first[1], `(max-width: ${first[1]}px`);

		if (entries.length > 2) {
			for (let i = 1; i < entries.length - 1; i++) {
				const prev = entries[i - 1][1];
				const current = entries[i][1];
				observe(entries[i][1], `(min-width: ${prev}px) and (max-width: ${current}px)`);
			}
		}

		const last = entries[entries.length - 1];
		observe(last[1], `(min-width: ${entries[entries.length - 2][1]}px`);
	}

	/**
	 * 注册为Vue的插件，别忘了还要注册一个Vuex的模块。
	 *
	 * @param app Vue对象
	 */
	install(app: App) {
		const globals = app.config.globalProperties;
		const { breakpoints } = this;

		const mediaQuery = new MediaQueryAPI(globals, breakpoints);
		globals.$mediaQuery = mediaQuery;
		app.provide("$mediaQuery", mediaQuery);
	}
}

export function useBreakPoints() {
	return inject<MediaQueryAPI>("$mediaQuery")!;
}

/**
 * 供组件使用的 API，在组件内部通过 this.$mediaQuery 或 useBreakPoints() 访问。
 * 该类同时支持选项式和组合 API。
 */
export class MediaQueryAPI {

	private readonly globals: Record<string, MQStore>;
	private readonly breakpoints: MediaBreakPoints;
	private readonly width2Name: Record<number, string>;

	constructor(globals: any, breakpoints: MediaBreakPoints) {
		this.globals = globals;
		this.breakpoints = breakpoints;

		const es = Object.entries(breakpoints);
		const invert = es.map(([k, v]) => [v, k]);
		this.width2Name = Object.fromEntries(invert);
	}

	private get state() {
		// @ts-ignore WebStorm 的类型推导有问题。
		return useMQStore(this.globals.$pinia);
	}

	get value() {
		return this.width2Name[this.state.width];
	}

	// 这三个返回响应对象，用于 setup 函数。

	greater(name: string) {
		return computed(() => this.isGreater(name));
	}

	smaller(name: string) {
		return computed(() => this.isSmaller(name));
	}

	between(lo: string, hi: string) {
		return computed(() => this.isBetween(lo, hi));
	}

	// 下面的返回简单值，如果用于渲染函数或 computed 则也是响应的。

	isGreater(name: string) {
		const { breakpoints, state } = this;
		return state.width >= breakpoints[name];
	}

	isSmaller(name: string) {
		const { breakpoints, state } = this;
		return state.width < breakpoints[name];
	}

	isBetween(lo: string, hi: string) {
		const { breakpoints, state } = this;
		return state.width >= breakpoints[lo] && state.width < breakpoints[hi];
	}
}

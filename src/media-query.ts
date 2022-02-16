import { App } from "vue";
import { Store } from "vuex";

export const SET_WIDTH = "SET_WIDTH";

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
 *     wide: 99999,
 * };
 */
export interface MediaBreakPoints {
	[key: string]: number;
}

/**
 * 本插件依赖 Vuex，所以要同时注册到 Vue 和 Vuex 的 Store 实例。
 * TODO: 插件接口也没有……
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

	registerToStore(store: Store<any>) {
		const { entries } = this;
		store.registerModule("mediaQuery", {
			state: {
				width: entries[entries.length - 1][1],
			},
			mutations: {
				[SET_WIDTH]: (state: any, width: number) => state.width = width,
			},
		});
	}

	/**
	 * 监听 window.matchMedia() 的 change 事件，在窗口大小改变时自动修改Vuex的状态。
	 * 该函数只能在浏览器环境下使用。
	 *
	 * @param store Vuex的存储
	 * @param window_ 监听的window对象，默认是全局变量
	 */
	observeWindow(store: Store<any>, window_ = window) {
		const { entries } = this;

		if (entries.length < 2) {
			return;
		}

		function observe(width: number, query: string) {
			const mql = window_.matchMedia(query);

			// 立即检查一下，在后端误判时立刻恢复到正确的宽度
			if (mql.matches) {
				store.commit(SET_WIDTH, width);
			}

			const update = () => mql.matches && store.commit(SET_WIDTH, width);

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
				const previous = entries[i - 1][1];
				const current = entries[i][1];
				observe(entries[i][1], `(min-width: ${previous}px) and (max-width: ${current}px)`);
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

/** 供组件使用的 API，在组件内部通过 this.$mediaQuery 访问 */
export class MediaQueryAPI {

	private readonly globals: Record<string, Store<any>>;
	private readonly breakpoints: MediaBreakPoints;

	constructor(globals: Record<string, any>, breakpoints: MediaBreakPoints) {
		this.globals = globals;
		this.breakpoints = breakpoints;
	}

	/**
	 * 检测当前的屏幕宽度是否符合给定的查询表达式。
	 * 查询字符串由 `断点名 + 修饰符（可选）` 组成，修饰符可以是 `+` 或 `-`，分别表示
	 * 大于等于 和 小于，没有修饰符表示等于。
	 * TODO: 目前使用数值比较容易实现，换成名字来比较可读性会更好？
	 *
	 * 例如当断点选项为：{ mobile: 100, desktop: 200, wide: 300 }，当前宽度为 desktop 时：
	 * mobile   返回 false：当前宽度不是mobile
	 * mobile+  返回 true： 当前宽度大于mobile
	 * desktop  返回 true： 当前宽度等于desktop
	 * desktop+ 返回 true： 当前宽度大于等于desktop
	 * desktop- 返回 false：当前宽度不小于desktop
	 * wide-    返回 true： 当前宽度小于wide
	 *
	 * @param exp 查询表达式
	 * @return 当前宽度是否匹配给定的查询字符串
	 */
	match(exp: string) {
		const { $store } = this.globals;
		return this.testMatchExp(exp, $store.state.mediaQuery.width);
	}

	/**
	 * 使用给定的查询表达式监视屏幕宽度，当该表达式的匹配结果改变时触发相应的回调。
	 *
	 * @param exp 查询表达式
	 * @param enter 从不匹配变为匹配时的回调
	 * @param leave 从匹配变为不匹配时的回调
	 * @return 取消监听的函数
	 */
	watch(exp: string, enter?: () => void, leave?: () => void) {
		const { $store } = this.globals;

		const callback = (nv: number, ov: number) => {
			const nvMatch = this.testMatchExp(exp, nv);
			const ovMatch = this.testMatchExp(exp, ov);

			if (nvMatch && !ovMatch && enter) enter();
			if (ovMatch && !nvMatch && leave) leave();
		};
		return $store.watch(state => state.mediaQuery.width, callback);
	}

	private testMatchExp(exp: string, width: number) {
		const { breakpoints } = this;
		const modifier = exp[exp.length - 1];

		if (modifier === "+") {
			return width >= breakpoints[exp.substring(0, exp.length - 1)];
		}
		if (modifier === "-") {
			return width < breakpoints[exp.substring(0, exp.length - 1)];
		}
		return width === breakpoints[exp];
	}
}

import Vue, { WatchOptions } from "vue";


interface MultiWatchOptions extends WatchOptions {
	once: boolean;
}

export class VueMultiWatcher {

	private readonly vm: Vue;
	private readonly callback: (this: Vue, n: any, o: any) => void;
	private readonly once: boolean;
	private readonly unWatches: Array<() => void>;

	constructor(vm: Vue, paths: string[], callback: (this: Vue, n: any, o: any) => void, options: MultiWatchOptions) {
		this.vm = vm;
		this.callback = callback;
		this.once = options.once;
		this.unWatches = paths.map((path) => vm.$watch(path, this.handleEvent.bind(this), options));
	}

	handleEvent(n: any, o: any) {
		const { vm, once, callback } = this;
		if (once) {
			this.unwatch();
		}
		callback.call(vm, n, o);
	}

	unwatch() {
		this.unWatches.forEach((unwatch) => unwatch());
	}
}

/**
 * 返回一个Promise，在指定的时间后完成，可用于模拟耗时的操作。
 *
 * @param time 时间，毫秒
 * @return 在指定的时间后完成的Promise
 */
export function sleep(time: number) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * 判断事件是触摸事件还是鼠标事件。
 * 桌面模式的 Firefox 中没有 TouchEvent，故不能用 instanceof 判断。
 *
 * @param e 事件对象
 * @return 如果是触摸事件则为true，否则false
 */
export function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
	return e.constructor.name === "TouchEvent";
}

/**
 * 异步节流函数，在被封装函数的Promise没有返回前不会再次调用，而是返回第一次的Promise。
 *
 * 第一次未返回前，即使再次调用的参数不同，也只返回第一次的结果，使用时请注意，或者尽量
 * 不要使用返回值而是在Promise里处理。
 *
 * 【实现】注意被使用的是返回的函数，不是包装函数，为了传递this所以不能返回Lambda表达式。
 *
 * @param func 被包装函数
 * @return 节流后的函数
 */
export function debounceFirst<T, R>(func: (...args: any[]) => Promise<R>) {
	let task: Promise<R> | null = null;
	return function debounceWrapper(this: T, ...args: any[]) {
		if (task) {
			return task;
		}
		return task = func.apply(this, args).finally(() => task = null);
	};
}

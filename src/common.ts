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

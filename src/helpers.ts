import anime from "animejs";
import Vue, { WatchOptions } from "vue";


interface MultiWatchOptions extends WatchOptions {
	once: boolean;
}

export class VueMultiWatcher {

	private readonly vm: Vue;
	private readonly callback: (this: Vue, n: any, o: any) => void;
	private readonly once: boolean;
	private readonly unWatches: Array<Function>;

	constructor(vm: Vue, paths: string[], callback: (this: Vue, n: any, o: any) => void, options: MultiWatchOptions) {
		this.vm = vm;
		this.callback = callback;
		this.once = options.once;
		this.unWatches = paths.map(path => vm.$watch(path, this.handleEvent.bind(this), options));
	}

	handleEvent(n: any, o: any) {
		const { vm, once, callback } = this;
		if (once) {
			this.unwatch();
		}
		callback.call(vm, n, o);
	}

	unwatch() {
		this.unWatches.forEach(unwatch => unwatch());
	}
}

/**
 * 返回一个Promise，在指定的时间后完成，可用于模拟耗时的操作。
 *
 * @param time 时间，毫秒
 * @return 在指定的时间后完成的Promise
 */
export function sleep(time: number) {
	return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * 弹出文件选择框。
 *
 * @param multiple {boolean} 是否多选
 * @param accept {String} 文件类型
 * @return 一个Promise，将在用户点击确定时完成
 */
export function openFile(multiple = false, accept = "*") {
	const input = document.createElement("input");
	input.setAttribute("type", "file");
	input.setAttribute("accept", accept);
	if (multiple) {
		input.setAttribute("multiple", "");
	}
	return new Promise(resolve => {
		// @ts-ignore
		input.addEventListener("change", event => resolve(event.target["files"]));
		input.click();
	});
}

// ========================================= 滚动到指定位置 =========================================


/**
 * 获取元素的绝对位置（相对于文档）。
 * getBoundingClientRect 获取的是相对于视口的偏移，需要再加上视口位置才是绝对位置。
 *
 * @param element 元素
 */
function getScrollTop(element: HTMLElement) {
	const doc = document.documentElement || document.body.parentNode;
	const viewport = (typeof doc.scrollTop === "number" ? doc : document.body).scrollTop;
	return element.getBoundingClientRect().top + viewport;
}

function scrollAnimation(element: HTMLElement, scrollTop: number) {
	anime({ targets: "html,body", scrollTop, duration: 500, easing: "easeOutQuad" });
}

/**
 * 滚动到元素顶部，浏览器可视区域的上端滚到元素的顶端。
 *
 * @param element HTML元素
 * @param offset 可以附加一个偏移（往下）
 */
export function scrollToElementStart(element: HTMLElement, offset: number = 0) {
	scrollAnimation(element, getScrollTop(element) + offset);
}

/**
 * 滚动到元素底部，浏览器可视区域的最下面对其到元素的底端。
 *
 * @param element HTML元素
 * @param offset 可以附加一个偏移（往下）
 */
export function scrollToElementEnd(element: HTMLElement, offset: number = 0) {
	scrollAnimation(element, getScrollTop(element) + element.clientHeight - window.innerHeight + offset);
}

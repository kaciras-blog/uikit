import anime from "animejs";
import Vue, { WatchOptions } from "vue";


interface MultiWatchOptions extends WatchOptions {
	once: boolean;
}

export class VueMultiWatcher {

	private readonly vm: Vue;
	private readonly callback: (this: Vue, n: any, o: any) => void;
	private readonly once: boolean;
	private readonly unwatchs: Array<Function>;

	constructor(vm: Vue, paths: string[], callback: (this: Vue, n: any, o: any) => void, options: MultiWatchOptions) {
		this.vm = vm;
		this.callback = callback;
		this.once = options.once;
		this.unwatchs = paths.map(path => vm.$watch(path, this.handleEvent.bind(this), options));
	}

	handleEvent(n: any, o: any) {
		const { vm, once, callback } = this;
		if (once) {
			this.unwatch();
		}
		callback.call(vm, n, o);
	}

	unwatch() {
		this.unwatchs.forEach(unwatch => unwatch());
	}
}

// ============================================= 拖动 =============================================

type DragCallback = (x: number, y: number) => void;

export function listenDragging(callback: DragCallback) {

	function onMove(event: MouseEvent | TouchEvent) {
		event.preventDefault();
		const touches = (event as TouchEvent).touches;
		const { clientX, clientY } = touches && touches.length > 0 ? touches[0] : (event as MouseEvent);
		callback(clientX, clientY);
	}

	return new Promise(resolve => {
		const onUp = (event: Event) => {
			event.preventDefault();
			document.removeEventListener("mousemove", onMove);
			document.removeEventListener("touchmove", onMove);
			document.removeEventListener("mouseup", onUp);
			document.removeEventListener("touchend", onUp);
			resolve();
		};
		document.addEventListener("mousemove", onMove);
		document.addEventListener("touchmove", onMove);
		document.addEventListener("mouseup", onUp);
		document.addEventListener("touchend", onUp);
	});
}

/**
 * 开始拖动HTML元素，被拖动的元素可以与被点击元素不同。
 *
 * @param el 被拖动的元素
 * @param event 拖动开始的那一下点击事件
 * @return 在拖动结束后resolve
 */
export function dragMoveElement(event: MouseEvent, el: HTMLElement) {
	const clientRect = el.getBoundingClientRect();

	// 拖动开始时元素的左上角坐标
	const originX = clientRect.left;
	const originY = clientRect.top;

	const { style } = el;
	style.position = "absolute";
	style.top = originY + "px";
	style.left = originX + "px";

	const { clientX, clientY } = event;

	// 新的坐标 = 元素开始坐标 + (鼠标当前位置 - 鼠标开始位置)
	return listenDragging((x, y) => {
		if (x >= 0 && x <= window.innerWidth)
			style.left = (originX + x - clientX) + "px";
		if (y >= 0 && y <= window.innerHeight)
			style.top = (originY + y - clientY) + "px";
	});
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

function getScrollTop() {
	const doc = document.documentElement || document.body.parentNode;
	return (typeof doc.scrollTop === "number" ? doc : document.body).scrollTop;
}

/**
 * 滚动到元素顶部，浏览器可视区域的上端滚到元素的顶端。
 *
 * @param element 元素对象或元素id
 */
export function scrollToElementStart(element: HTMLElement | string) {
	if (typeof element === "string") {
		const elById = document.getElementById(element);
		if (!elById) {
			throw new Error(`Can not found element with id=${element}`);
		}
		element = elById;
	}
	anime({
		targets: "html,body",
		scrollTop: getScrollTop() + element.getBoundingClientRect().top,
		duration: 500,
		easing: "easeOutQuad",
	});
}

/**
 * 滚动到元素底部，浏览器可视区域的最下面对其到元素的底端。
 *
 * @param element 元素对象或元素id
 */
export function scrollToElementEnd(element: HTMLElement | string) {
	if (typeof element === "string") {
		const elById = document.getElementById(element);
		if (!elById) {
			throw new Error(`Can not found element with id=${element}`);
		}
		element = elById;
	}
	const elTop = getScrollTop() + element.getBoundingClientRect().top;
	anime({
		targets: "html,body",
		scrollTop: elTop + element.clientHeight - window.innerHeight,
		duration: 500,
		easing: "easeOutQuad",
	});
}

export class CancelToken {

	private readonly callbacks: Array<() => void> = [];

	private canceled: boolean = false;
	private completed: boolean = false;

	cancel() {
		if (!this.completed) {
			this.canceled = true;
			this.callbacks.forEach(cb => cb());
		}
	}

	onCancel(callback: () => void) {
		this.callbacks.push(callback);
	}

	complete() {
		this.completed = true;
	}

	static never() {
		const token = new CancelToken();
		token.cancel = () => {};
		token.onCancel = () => {};
		return token;
	}
}

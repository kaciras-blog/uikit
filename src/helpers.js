import anime from "animejs";

export class VueMultiWatcher {
	constructor (vm, paths, callback, options) {
		this.vm = vm;
		this.callback = callback;
		this.once = options.once;
		this.unwatchs = paths.map(path => vm.$watch(path, () => this.handleEvent(), options));
	}

	handleEvent (newVal, oldVal) {
		const { vm, once, callback } = this;
		if (once) {
			this.unwatch();
		}
		callback.call(vm, newVal, oldVal);
	}

	unwatch () {
		this.unwatchs.forEach(unwatch => unwatch());
	}
}

/**
 * 元素拖动。
 *
 * @param el {Element} 元素
 * @param startX {number} 起始X坐标
 * @param startY {number} 起始Y坐标
 * @param onDragging {Function} 回调，在拖动中不断调用
 * @return {Promise} 在拖动结束后resolve
 */
export function drag (el, startX, startY, onDragging) {
	const clientRect = el.getBoundingClientRect();

	// 按住时窗口的左上角坐标
	const originX = clientRect.left;
	const originY = clientRect.top;

	// 如果没有指定回调，则默认修改元素样式实现拖动
	if (!onDragging) {
		const { style } = el;

		onDragging = function (newX, newY) {
			style.left = newX + "px";
			style.top = newY + "px";
		};
		style.position = "absolute";
		style.top = originY + "px";
		style.left = originX + "px";
	}

	// 拖动中不断计算新的坐标，并传递给回调函数
	const onMove = event => {
		event.preventDefault();
		const { clientX, clientY } = event.touches && event.touches.length > 0
			? event.touches[0] : event;

		const newX = originX + clientX - startX;
		const newY = originY + clientY - startY;
		onDragging(newX, newY);
	};

	return new Promise(resolve => {
		const onUp = event => {
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
 * 返回一个Promise，在指定的时间后完成，可用于模拟耗时的操作。
 *
 * @param time 时间，毫秒
 * @return {Promise} 在指定的时间后完成的Promise
 */
export function sleep (time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * 弹出文件选择框。
 *
 * @param multiple {boolean} 是否多选
 * @param accept {String} 文件类型
 * @return {Promise<File[]>} 一个Promise，将在用户点击确定时完成
 */
export function openFile (multiple = false, accept = "*") {
	const input = document.createElement("input");
	input.setAttribute("type", "file");
	input.setAttribute("accept", accept);
	if (multiple) {
		input.setAttribute("multiple", "");
	}
	return new Promise(resolve => {
		input.addEventListener("change", event => resolve(event.target["files"]));
		input.click();
	});
}

function getScrollTop () {
	const doc = document.documentElement || document.body.parentNode;
	return (typeof doc.scrollTop === "number" ? doc : document.body).scrollTop;
}

/**
 * 滚动到元素顶部，浏览器可视区域的上端滚到元素的顶端。
 *
 * @param element 元素对象或元素id
 */
export function scrollToElementStart (element) {
	if (typeof element === "string") {
		element = document.getElementById(element);
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
export function scrollToElementEnd (element) {
	if (typeof element === "string") {
		element = document.getElementById(element);
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

	constructor () {
		this.canceled = false;
		this.completed = false;
		this.callbacks = [];
	}

	cancel () {
		if (!this.completed) {
			this.canceled = true;
			this.callbacks.forEach(cb => cb());
		}
	}

	onCancel (callback) {
		this.callbacks.push(callback);
	}

	complete () {
		this.completed = true;
	}

	static never () {
		const token = new CancelToken();
		token.cancel = () => {};
		token.onCancel = () => {};
		return token;
	}
}

import anime from "animejs";

/**
 * 弹出文件选择框。
 *
 * @param multiple 是否多选
 * @param accept 文件类型
 * @return 一个Promise，将在用户点击确定时完成
 */
export function openFile(multiple = false, accept: string = "*") {
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

/**
 * 获取元素的绝对位置（相对于文档的位置）。
 * getBoundingClientRect 获取的是相对于视口的偏移，需要再加上视口位置才是绝对位置。
 *
 * @param element 元素
 * @return 元素的绝对位置
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
 */
export function getScrollTop(element: HTMLElement) {
	const doc = document.documentElement || document.body.parentNode;
	const viewport = (typeof doc.scrollTop === "number" ? doc : document.body).scrollTop;
	return element.getBoundingClientRect().top + viewport;
}

function scrollAnimation(element: HTMLElement, scrollTop: number) {
	anime({ targets: document.scrollingElement, scrollTop, duration: 500, easing: "easeOutQuad" });
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

/**
 * 禁止body的滚动条，返回一个取消禁止的函数。
 *
 * @return 取消禁止的函数
 */
export function preventScroll() {
	const { style } = document.body;
	const oldHeight = style.height;
	const oldOverflow = style.overflow;

	style.height = "100%";
	style.overflow = "hidden";
	return () => {
		style.height = oldHeight;
		style.overflow = oldOverflow;
	};
}

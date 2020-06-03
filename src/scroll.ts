import anime from "animejs";

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
	anime({ targets: document.scrollingElement, scrollTop, duration: 400, easing: "easeOutQuad" });
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
 * 禁止指定元素的滚动条，返回一个取消禁止的函数。
 *
 * @param el 指定的元素
 * @return 恢复滚动条的函数
 */
export function preventScroll(el: HTMLElement = document.body) {
	const { style } = el;
	const oldHeight = style.height;
	const oldOverflow = style.overflow;

	style.height = "100%";
	style.overflow = "hidden";
	return () => {
		style.height = oldHeight;
		style.overflow = oldOverflow;
	};
}

/**
 * 组件挂载之后禁止全局滚动条，销毁后恢复，可用于弹窗之类的组件
 */
export const PreventScrollMixin = {
	mounted(this: any) {
		this.$_restoreScroll = preventScroll();
	},
	destroyed(this: any) {
		this.$_restoreScroll();
	},
};

/**
 * 将多个元素的滚动条按百分比同步。
 *
 * @param elements 要同步的元素
 * @return 取消同步的函数
 */
export function syncScroll(...elements: HTMLElement[]) {
	let skip = false;

	elements.forEach(el => el.addEventListener("scroll", syncScroll));

	function syncScroll(event: Event) {
		if (skip) {
			return;
		}
		skip = true;

		// 必须要延迟到下一帧，否则在开启了平滑滚动的浏览器上会滚不动
		requestAnimationFrame(() => {
			const curr = event.target as HTMLElement;
			const p = curr.scrollTop / (curr.scrollHeight - curr.offsetHeight);

			elements.forEach(el => {
				el.scrollTop = p * (el.scrollHeight - el.offsetHeight);
			});
			requestAnimationFrame(() => skip = false);
		});
	}

	return function destroy() {
		elements.forEach(el => el.removeEventListener("scroll", syncScroll));
	};
}

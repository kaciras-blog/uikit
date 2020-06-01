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
 * @return 取消禁止的函数
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
 * 按百分比同步滚动，注意原文与预览的对应内容并非一定在对应百分比的位置上。
 *
 * BUG: Firefox 有一个操蛋的平滑滚动功能
 *
 * @param elementA 要同步的一个元素
 * @param elementB 要同步另一个的元素
 * @return 取消同步的函数
 */
export function syncScroll(elementA: HTMLElement, elementB: HTMLElement) {
	let available = true;

	elementA.addEventListener("scroll", syncScroll);
	elementB.addEventListener("scroll", syncScroll);

	function syncScroll(event: Event) {
		let curr = elementA;
		let other = elementB;

		if (event.target !== curr) {
			curr = elementB;
			other = elementA;
		}

		const percentage = curr.scrollTop / (curr.scrollHeight - curr.offsetHeight);
		other.scrollTop = Math.round(percentage * (other.scrollHeight - other.offsetHeight));

		requestAnimationFrame(() => {
			if (available) {
				curr.addEventListener("scroll", syncScroll);
			}
		});
		curr.removeEventListener("scroll", syncScroll);
	}

	return function destroy() {
		available = false;
		elementA.removeEventListener("scroll", syncScroll);
		elementB.removeEventListener("scroll", syncScroll);
	};
}

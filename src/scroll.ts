import anime from "animejs";

/**
 * 获取文档当前的的滚动高度，兼容各种浏览器。
 *
 * @return 滚动高度
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
 */
export function getScrollTop() {
	const doc = document.documentElement || document.body.parentNode;
	return (typeof doc.scrollTop === "number" ? doc : document.body).scrollTop;
}

function scrollAnimation(element: HTMLElement, scrollTop: number) {
	anime({ targets: document.scrollingElement, scrollTop, duration: 400, easing: "easeOutQuad" });
}

/**
 * 滚动到元素顶部，浏览器可视区域的上端对齐到元素的顶端。
 *
 * TODO: Element.scrollTo 可以替代，但是 Safari 不支持 smooth
 *
 * @param element HTML元素
 * @param offset 可以附加一个偏移（往下）
 */
export function scrollToElementStart(element: HTMLElement, offset: number = 0) {
	const { top } = element.getBoundingClientRect();
	scrollAnimation(element, top + getScrollTop() + offset);
}

/**
 * 滚动到元素底部，浏览器可视区域的最下面对齐到元素的底端。
 *
 * @param element HTML元素
 * @param offset 可以附加一个偏移（往下）
 */
export function scrollToElementEnd(element: HTMLElement, offset: number = 0) {
	const { bottom } = element.getBoundingClientRect();
	const vTop = getScrollTop();
	scrollAnimation(element, vTop + bottom - window.innerHeight + offset);
}

/**
 * 滚动到元素能显示在窗口中，相当于 scrollToElementStart 和 scrollToElementEnd 的结合版。
 * 如果元素已经在窗口里则不做任何动作。
 *
 * TODO: 需不需要吧 if 里的 top 和 bottom 交换下？
 *
 * @param element 元素
 */
export function scrollToElement(element: HTMLElement) {
	const { top, bottom } = element.getBoundingClientRect();
	if (bottom < 0) {
		scrollAnimation(element, top + getScrollTop());
	} else if (top > window.innerHeight) {
		scrollAnimation(element, bottom + getScrollTop() - window.innerHeight);
	}
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
 * 将多个元素的垂直滚动条按百分比同步。
 *
 * 该函调用时会立即进行一次同步，以第一个参数的元素为基准。
 *
 * @param elements 要同步的元素
 * @return 取消同步的函数
 */
export function syncScroll(...elements: HTMLElement[]) {
	let skip = false;

	if (elements.length) {
		sync(elements[0]);
	}

	function sync(target: HTMLElement) {
		const p = target.scrollTop / (target.scrollHeight - target.offsetHeight);
		elements.forEach(el => el.scrollTop = p * (el.scrollHeight - el.offsetHeight));
	}

	function scrollHandler(event: Event) {
		if (skip) {
			return;
		}
		skip = true;

		// 必须要延迟到下一帧，否则在开启了平滑滚动的浏览器上会滚不动
		requestAnimationFrame(() => {
			sync(event.target as HTMLElement);
			requestAnimationFrame(() => skip = false);
		});
	}

	elements.forEach(el => el.addEventListener("scroll", scrollHandler));

	return () => elements.forEach(el => el.removeEventListener("scroll", scrollHandler));
}

import anime from "animejs";
import { onMounted, onUnmounted } from "vue";

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
 *   https://caniuse.com/css-scroll-behavior
 *
 * @param element HTML元素
 * @param offset 可以附加一个偏移（往下）
 */
export function scrollToElementStart(element: HTMLElement, offset = 0) {
	const { top } = element.getBoundingClientRect();
	scrollAnimation(element, top + getScrollTop() + offset);
}

/**
 * 滚动到元素底部，浏览器可视区域的最下面对齐到元素的底端。
 *
 * @param element HTML元素
 * @param offset 可以附加一个偏移（往下）
 */
export function scrollToElementEnd(element: HTMLElement, offset = 0) {
	const { bottom } = element.getBoundingClientRect();
	const vTop = getScrollTop();
	scrollAnimation(element, vTop + bottom - window.innerHeight + offset);
}

/**
 * 滚动到元素能显示在窗口中，相当于 scrollToElementStart 和 scrollToElementEnd 的结合版。
 * 如果元素已经在窗口里则不做任何动作。
 *
 * @param element 元素
 */
export function scrollToElement(element: HTMLElement) {
	const { top, bottom } = element.getBoundingClientRect();
	const { innerHeight } = window;

	if (top > innerHeight || (top > 0 && bottom > innerHeight)) {
		scrollAnimation(element, top + getScrollTop());
	} else if (bottom < 0 || (top < 0 && bottom < innerHeight)) {
		scrollAnimation(element, bottom + getScrollTop() - innerHeight);
	}
}

/**
 * 临时禁止页面的滚动条，当组件挂载时启用，卸载后还原。
 */
export function usePreventScroll() {
	const { style } = document.body;

	let oldOverflow: string;
	let oldWidth: string;
	let oldHeight: string;

	onMounted(() => {
		oldHeight = style.maxHeight;
		oldWidth = style.maxWidth;
		oldOverflow = style.overflow;

		style.maxHeight = "100%";
		style.maxWidth = "100%";
		style.overflow = "hidden";
	});

	onUnmounted(() => {
		style.maxHeight = oldHeight;
		style.maxWidth = oldWidth;
		style.overflow = oldOverflow;
	});
}

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

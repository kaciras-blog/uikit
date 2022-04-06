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

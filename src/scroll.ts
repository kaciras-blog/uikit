/**
 *
 * @param el 要检查的元素
 * @param dy 元素的边界在 Y 轴向上偏移
 * @param dx 元素的边界在 X 轴向左偏移
 */
export function isInViewport(el: Element, dy = 0, dx = 0) {
	const rect = el.getBoundingClientRect();
	return (
		rect.right > dx &&
		rect.bottom > dy &&
		rect.x < window.innerWidth + dx &&
		rect.y < window.innerHeight + dy
	);
}

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

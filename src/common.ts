/**
 * 判断事件是触摸事件还是鼠标事件。
 * 桌面的 Firefox 中没有 TouchEvent，故不能用 instanceof。
 *
 * @param e 事件对象
 * @return 如果是触摸事件则为true，否则false
 */
export function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
	return e.constructor.name === "TouchEvent";
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

type SelectionElement = HTMLTextAreaElement | HTMLInputElement;

export type SelectionChangeHandler = (start: number, end: number) => void;

/**
 * 监听文本框光标位置和选区的改变。
 *
 * 【焦点离开的处理】
 * 没有监听焦点离开事件，因为调用方对离开的处理方式可能不一样。
 *
 * @param el 文本框元素
 * @param handler 监听处理函数
 * @return 取消监听的函数
 */
export function addSelectionChangeListener(el: SelectionElement, handler: SelectionChangeHandler) {
	let oS = el.selectionStart;
	let oE = el.selectionEnd;

	function handleSelect() {
		const { selectionStart, selectionEnd } = el;
		if (oS !== selectionStart || oE !== selectionEnd) {
			oS = selectionStart;
			oE = selectionEnd;
			handler(selectionStart!, selectionEnd!);
		}
	}

	el.addEventListener("select", handleSelect);	// 移动端和 PC 端的选择结束
	el.addEventListener("click", handleSelect);		// 点击改变光标位置
	el.addEventListener("input", handleSelect);		// 增删内容改变光标位置
	el.addEventListener("keydown", handleSelect);	// 移动光标的键按住不放
	el.addEventListener("keyup", handleSelect);		// 处理键盘移动的边界问题

	return () => {
		el.removeEventListener("select", handleSelect);
		el.removeEventListener("click", handleSelect);
		el.removeEventListener("input", handleSelect);
		el.removeEventListener("keydown", handleSelect);
		el.removeEventListener("keyup", handleSelect);
	};
}

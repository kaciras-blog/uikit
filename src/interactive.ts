export function openFile(accept: string, multiple?: false): Promise<File>;

export function openFile(accept: string, multiple: true): Promise<FileList>;

/**
 * 弹出文件选择框，在用户点确定之后resolve。
 *
 * TODO: 取消事件有点难办
 *
 * @param accept 文件类型
 * @param multiple 是否多选，如果为true返回文件列表，否则返回单个文件
 * @return 一个Promise，将在用户点击确定时完成
 */
export function openFile(accept: string, multiple = false) {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = accept;
	input.multiple = multiple;
	input.click();

	return new Promise<File | FileList>((resolve) => {
		input.addEventListener("change", event => {
			// @ts-ignore
			const files = event.target.files;
			resolve(multiple ? files : files[0]);
		});
	});
}

type SelectionElement = HTMLTextAreaElement | HTMLInputElement;

type SelectionChangeHandler = (start: number, end: number) => void;

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

	el.addEventListener("select", handleSelect);	// 移动端和PC端的选择结束
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

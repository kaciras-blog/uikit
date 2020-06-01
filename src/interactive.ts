export function openFile(accept: string, multiple?: false): Promise<File>;

export function openFile(accept: string, multiple: true): Promise<FileList>;

/**
 * 弹出文件选择框，在用户点确定之后resolve。
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
		input.addEventListener("change", (event) => {
			// @ts-ignore
			const files = event.target.files;
			resolve(multiple ? files : files[0]);
		});
	});
}

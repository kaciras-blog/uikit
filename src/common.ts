let uniqueKeyCounter = 1;

/**
 * Generate a unique number, it can be used as the key prop in React element.
 */
export function uniqueKey() {
	return uniqueKeyCounter += 1;
}

/**
 * 返回一个Promise，在指定的时间后完成，可用于模拟耗时的操作。
 *
 * @param time 时间，毫秒
 * @return 在指定的时间后完成的 Promise
 */
export function sleep(time: number) {
	return new Promise(resolve => setTimeout(resolve, time));
}

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
 * 将 Blob 对象转为 base64 编码的 Data-URL 字符串。
 *
 * 【其他方案】
 * 如果不需要持久化，使用 URL.createObjectURL + URL.revokeObjectURL 性能更好。
 *
 * @param blob Blob 对象
 * @return Data-URL 字符串
 */
export function blobToURL(blob: Blob) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = reject;
		reader.onloadend = () => resolve(reader.result as string);
		reader.readAsDataURL(blob);
	});
}

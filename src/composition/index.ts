import { onMounted, onUnmounted } from "vue";

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

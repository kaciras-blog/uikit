import { onMounted, onUnmounted } from "vue";

/**
 * 这里直接把数据放到元素上了，如果不想这么做还可以用全局 Map。
 */
interface ElementWithCustomProps extends HTMLElement {
	kxPSCount: number;
	kxPSBackup: Partial<CSSStyleDeclaration>;
}

/**
 * 临时禁止元素的滚动条，当组件挂载时启用，卸载后还原。
 * 该 API 可重入，即支持同时在多个组件中调用。
 *
 * 【暂不支持 SSR】
 * 目前用到的地方都是二级窗口，SSR 中不会被调用，所以没问题。
 *
 * @param element 禁止滚动的元素，默认是页面。
 */
export function usePreventScroll(element = document.body) {
	const el = element as ElementWithCustomProps;

	onMounted(() => {
		const count = el.kxPSCount ?? 0;
		el.kxPSCount = count + 1;

		if (count > 0) {
			return;
		}
		const { style } = el;

		el.kxPSBackup = {
			maxHeight: style.maxHeight,
			maxWidth: style.maxWidth,
			overflow: style.overflow,
		};
		style.maxHeight = "100%";
		style.maxWidth = "100%";
		style.overflow = "hidden";
	});

	onUnmounted(() => {
		if ((el.kxPSCount -= 1) > 0) {
			return;
		}
		const { style, kxPSBackup } = el;
		Object.assign(style, kxPSBackup);
	});
}

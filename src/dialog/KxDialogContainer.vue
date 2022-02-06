<!--
	由于 v-show 无法用于 teleport，且过渡无法被外部触发了，改用 v-if。
-->
<template>
	<template v-for="(options, i) of stack" :key="options.id">
		<component
			v-bind="options.props"
			v-if="isVisible(options, i)"
			:is="options.component"
			:ref="v => v && instances.set(options, v)"
			@close="r => closeDialog(options, r)"
		/>
	</template>
</template>

<script setup lang="ts">
import { inject, onBeforeUpdate, shallowReactive } from "vue";
import { useEventListener } from "@vueuse/core";
import { uniqueKey } from "../common";
import { DialogOptions, DialogResult, QuickDialogController } from "./controller";

interface InternalOptions extends DialogOptions<unknown> {
	id: number;
	closed?: boolean;
}

/** 用于标记历史记录是弹窗所产生的 */
const FLAG = "__KX_DIALOG__";

// 这里不要用 reactive 因为他会将每个元素也转为代理。
const stack = shallowReactive<InternalOptions[]>([]);
const instances = new Map();

// 这个不是响应的，毕竟在宽屏和窄屏之间切换的常见很少见。
const isMobile = import.meta.env.SSR ? false : window.innerWidth < 768

/**
 * 判断弹出层是否显示，为了防止遮罩堆太多所以要隐藏非顶部的弹窗。
 * 只有 isolation:true 的组件和最上层的一个能够显示。
 *
 * @param config 选项
 * @param index 序号
 * @returns 弹出层是否显示
 */
function isVisible(config: DialogOptions<unknown>, index: number) {
	return (index === stack.length - 1) || (config.component as any).isolation;
}

/**
 * 同步历史记录，实现手机上后退键关闭弹出层的功能。
 *
 * 由于设计上弹出层可能依赖父组件状态，故不支持重开。
 *
 * 同步的方式可以支持多级跳，但好像实际的手机浏览器没法这么做。
 */
function syncHistory() {
	const { flag, id } = history.state || {};

	if (flag !== FLAG) {
		stack.forEach(c => closeDialog(c));
	} else {
		const i = stack.findIndex(c => c.id === id);
		stack.slice(i + 1).forEach(c => closeDialog(c));
	}
}

/**
 * 从弹窗栈中移除指定的弹窗，弹窗可以不存在。
 */
function remove(config, result) {
	const i = stack.indexOf(config);
	if (i !== -1) {
		stack.splice(i, 1);
	}
	config.resolve(result);
}

function closeDialog(config: InternalOptions, result = DialogResult.CANCELED) {
	if (config.closed) {
		return;
	}
	config.closed = true;

	const { beforeDialogClose } = instances.get(config);
	if (typeof beforeDialogClose !== "function") {
		remove(config, result);
	} else {
		Promise.resolve(beforeDialogClose()).finally(() => remove(config, result));
	}
}

/**
 * 向栈里添加一个弹出层，如果需要还会插入一条历史。
 *
 * @param config 弹出层会话
 */
function push(config) {
	const id = uniqueKey();
	config.id = id;
	stack.push(config);

	// https://next.router.vuejs.org/guide/migration/#usage-of-history-state
	if (isMobile) {
		const state = { ...history.state, flag: FLAG, id };
		history.pushState(state, "");
	}
}

/**
 * 手动关闭顶层的弹窗，并同步历史。
 *
 * @param result 弹窗返回的结果
 */
function close(result) {
	const config = stack[stack.length - 1];
	if (!config) {
		throw new Error("没有可关闭的弹窗");
	}
	const { flag, id } = history.state || {};
	if (flag === FLAG && id === config.id) {
		history.back();
	} else {
		closeDialog(config, result);
	}
}

// 目前仅在切换路由时使用，没法清除历史。该方法也会忽略 beforeDialogClose。
function clear() {
	stack.splice(0, stack.length).forEach(c => c.resolve(DialogResult.CANCELED));
}

onBeforeUpdate(() => instances.clear());

// 移动端启用回退键功能，这个不是响应的只有载入时执行。
if (isMobile) {
	useEventListener(window, "popstate", syncHistory);
}

// 这里不用 useDialog()，引用链更清晰。
const controller = inject<QuickDialogController>("$dialog")!;
if (!controller) {
	throw new Error("必须将 QuickAlert 插件注册到 Vue 实例");
}
controller.connect({ push, close, clear });
</script>

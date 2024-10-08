<!--
	最顶部的进度条，用于 SPA 切换页面，参考了：
	https://github.com/hilongjw/vue-progressbar
-->
<template>
	<div :class='[$style.progress, {[$style.error]: hasError}]' :style='style'></div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from "vue";

const TRANSITION_TIME = 300;
const RESIDUAL_TIME = 800;

const visible = ref(false);
const hasError = ref(false);
const progress = ref(0);
const transition = ref(true);

let timer: any;

const style = computed(() => ({
	opacity: visible.value ? 1 : 0,
	transition: transition.value ? `width ease-out ${TRANSITION_TIME}ms` : undefined,
	"--progress": progress.value,
}));

/**
 *
 */
function start() {
	if (visible.value) {
		return;
	}
	progress.value = 0;
	visible.value = true;
	hasError.value = false;
}

/**
 * 设置当前的进度，最大 100，超过了也按 100 算。
 */
function setProgress(percent: number) {
	progress.value = Math.min(100, percent);
}

function increase(percent: number) {
	setProgress(progress.value + percent);
}

/**
 * 重置到进度为 0 并且不显示的状态，该过程是立即的没有动画
 */
async function reset() {
	visible.value = false;
	transition.value = false;

	await nextTick();
	progress.value = 0;
	transition.value = true;
	clearTimeout(timer);
}

function finish() {
	if (!visible.value) {
		return; /* 必须先调用启动方法 */
	}
	fadeout();
	progress.value = 100;
}

function fail() {
	if (!visible.value) {
		return;
	}
	fadeout();
	progress.value = 100;
	hasError.value = true;
}

function fadeout() {
	timer = setTimeout(() => {
		visible.value = false;
		timer = setTimeout(reset, TRANSITION_TIME);
	}, RESIDUAL_TIME);
}

defineExpose({ finish, start, fail, reset, setProgress, increase });
</script>

<style module lang="less">
@default-color: #1084ff;

@comet-size: 100px;
@comet-speed: 40ms;

.progress {
	position: fixed;
	top: 0;
	left: 0;
	width: calc(var(--progress) * 1%);
	height: 2px;

	/* 全局加载条在样式上是比页面更外层的元素，设置最大的 z-index 值 */
	z-index: 999999;

	background: var(--color, @default-color);

	&::before {
		content: '';
		position: absolute;
		width: @comet-size;
		height: 100%;

		background-image: linear-gradient(90deg,
		transparent 0,
		rgba(255, 255, 255, 0.7) 20%,
		rgba(255, 255, 255, 0.9) 60%,
		transparent 100%);

		/* 恒速运动 */
		animation: highlight linear calc(@comet-speed * var(--progress)) infinite;
	}
}

.error {
	background: #f74343;
}

@keyframes highlight {
	from { right: 100%; }
	to { right: @comet-size * -0.6 }
}
</style>

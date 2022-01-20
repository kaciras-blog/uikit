<!--
	滚动加载的底部，用于指示加载状态，同时还负责检测是否滚动到需要加载的位置。
	在点击加载模式下会显示一个按钮。
-->
<template>
	<div :class="$style.container" :ref="observe">
		<kx-button
			v-if="state===State.FREE"
			tag="a"
			class="primary"
			:class="$style.button"
			:href="nextUrl"
			@click.prevent="loadPage"
		>
			查看更多
		</kx-button>

		<slot name="state">
			<sk-fading-circle v-if="state === State.LOADING"/>

			<span
				v-else-if="state === State.ALL_LOADED"
				class="minor-text"
			>
				没有更多的了
			</span>

			<span v-else-if="state === State.FAILED">
				加载失败,请
				<a class="error highlight" @click="loadPage">重试</a>
			</span>
		</slot>
	</div>
</template>

<script lang="ts">
export enum State {
	FREE,
	LOADING,
	FAILED,
	ALL_LOADED,
}
</script>

<script setup lang="ts">
import { watch, WatchStopHandle } from "vue";

interface ScrollPagerProps {

	// 滚动到距离底部还有多高时触发加载事件
	activeHeight: number;

	// 滚动时自动加载，该选项为 false 时将不触发滚动加载。
	autoLoad: boolean;

	// 当前的状态。
	state: State;

	// 用于预渲染，也能够让爬虫跟踪到后续页。
	nextUrl?: string;
}

const props = withDefaults(defineProps<ScrollPagerProps>(), {
	autoLoad: false,
	activeHeight: 512,
});

const emit = defineEmits(["load-page"]);

let observer: IntersectionObserver;
let stopWatch: WatchStopHandle;

function loadPage() {
	switch (props.state) {
		case State.ALL_LOADED:
		case State.LOADING:
			return;
		default:
			emit("load-page");
	}
}

function observe(el: Element | null) {
	if (!el) {
		observer.disconnect();
		return stopWatch();
	}

	observer = new IntersectionObserver(entries => {
		// 出错时不自动加载
		if (entries[0].isIntersecting && props.state === State.FREE) loadPage();
	}, { rootMargin: props.activeHeight + "px" });

	const callback = (value: boolean) => {
		if (value) {
			observer.observe(el!);
		} else {
			observer.disconnect();
		}
	};
	stopWatch = watch(() => props.autoLoad, callback, { immediate: true });
}
</script>

<style module lang="less">
@import "../css/exports";

.container {
	text-align: center;
	padding: 20px;
}

@media screen and (max-width: @length-screen-mobile) {
	.button { width: 64%; }
}
</style>

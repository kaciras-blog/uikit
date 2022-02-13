<!--
	滚动加载的底部，用于指示加载状态，同时还负责检测是否滚动到需要加载的位置。
	在点击加载模式下会显示一个按钮。
-->
<template>
	<div :class="$style.container" :ref="observe">
		<kx-button
			v-if="state===State.FREE"
			:class="$style.button"
			:href="nextUrl"
			@click.prevent="loadPage"
		>
			查看更多
		</kx-button>

		<slot name="state">
			<span
				v-if="state === State.ALL_LOADED"
				class="minor-text"
			>
				没有更多的了
			</span>

			<LoadingStatus
				v-else-if="state !== State.FREE"
				:error="state === State.FAILED"
				@retry="loadPage"
			/>
		</slot>
	</div>
</template>

<script setup lang="ts">
import { State } from "./core";
import LoadingStatus from "../components/LoadingStatus.vue";

interface ScrollPagerProps {

	/** 滚动到距离底部还有多高时触发加载事件 */
	activeHeight?: number;

	/** 滚动时自动加载，该选项为 false 时将不触发滚动加载 */
	autoLoad?: boolean;

	/** 当前的状态 */
	state: State;

	/** 用于预渲染，也能够让爬虫跟踪到后续页 */
	nextUrl?: string;
}

const props = withDefaults(defineProps<ScrollPagerProps>(), {
	autoLoad: false,
	activeHeight: 512,
});

const emit = defineEmits(["loadPage"]);

let observer: IntersectionObserver;

function loadPage() {
	switch (props.state) {
		case State.ALL_LOADED:
		case State.LOADING:
			return;
		default:
			emit("loadPage");
	}
}

function callback([entry]: IntersectionObserverEntry[]) {
	if (!entry.isIntersecting) return;
	if (!props.autoLoad) return;
	if (props.state === State.FREE) loadPage();
}

function observe(el: Element | null) {
	if (!el) {
		return observer.disconnect();
	}
	if (observer) {
		return; // 函数作为 ref 可能被重复调用。
	}
	observer = new IntersectionObserver(callback, {
		rootMargin: props.activeHeight + "px",
	});

	observer.observe(el);
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

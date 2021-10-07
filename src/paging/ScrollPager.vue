<!--
	滚动加载的底部，用于指示加载状态，同时还负责检测是否滚动到需要加载的位置。
	在点击加载模式下会显示一个按钮。
-->
<template>
	<div :class="$style.container">
		<kx-button
			v-if="state===State.FREE"
			tag="a"
			class="primary"
			:class="$style.button"
			:href="nextPageUrl"
			@click.prevent="loadPage"
		>
			查看更多
		</kx-button>

		<!-- 通过该插槽可以自定义状态显示，父组件内请使用inline-template -->
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
	ALL_LOADED
}
</script>

<script setup lang="ts">
import { defineEmits, defineProps, onMounted, onUnmounted, watch, withDefaults } from "vue";

interface Props {

	// 滚动到距离底部还有多高时触发加载事件
	activeHeight: number;

	// 滚动时自动加载，该选项为 false 时将不触发滚动加载。
	autoLoad: boolean;

	// 当前的加载状态。
	state: State;

	// 用于预渲染，也能够让爬虫跟踪到后续页。
	nextPageUrl?: string;
}

const props = withDefaults(defineProps<Props>(), {
	autoLoad: false,
	activeHeight: 512,
});

const emit = defineEmits(["load-page"]);

let observer: IntersectionObserver;

function loadPage() {
	switch (props.state) {
		case State.ALL_LOADED:
		case State.LOADING:
			return;
		default:
			emit("load-page");
	}
}

onMounted(() => {
	observer = new IntersectionObserver(entries => {
		// state === FREE 在出错时不自动加载
		if (entries[0].isIntersecting && props.state === State.FREE) loadPage();
	});
	const watchCallback = (value) => {
		if (value) {
			observer.observe(this.$el);
		} else {
			observer.disconnect();
		}
	};
	watch(() => props.autoLoad, watchCallback, { immediate: true });
});

onUnmounted(() => observer.disconnect());
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

<template>
	<div ref="el">
		<paging-buttons
			v-if="topButtons && total"
			:theme="theme"
			:total="total"
			:index="index"
			:page-size="pageSize"
			@show-page="switchPage"
		/>

		<slot :items="items.slice(0, pageSize)"/>

		<paging-buttons
			v-if="total"
			:theme="theme"
			:total="total"
			:index="index"
			:page-size="pageSize"
			@show-page="switchPage"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from "vue";
import { scrollToElementEnd, scrollToElementStart } from "../index";
import { getScrollTop } from "../scroll";
import { LoadPageFn } from "./core";

interface ButtonPagingViewProps {
	modelValue: any;

	start?: number;
	pageSize: number;

	topButtons?: boolean;
	viewportOffset?: Number,

	loader: LoadPageFn;

	/** 下一页的链接，用于 SSR，如果不存在则不生成 */
	nextLink?: (start: number, count: number) => string;
}

const props = withDefaults(defineProps<ButtonPagingViewProps>(), {
	start: 0,
	topButtons: false,
	viewportOffset: 0,
});

const emit = defineEmits(["update:modelValue"]);

const el = ref<HTMLElement>(null);
const index = ref(0);

let _loading: AbortController;

const items = computed(() => {
	return props.modelValue?.items ?? [];
});

const total = computed(() => {
	return props.modelValue?.total ?? 0;
});

function loadPage(i: number) {
	const { start, pageSize, loader } = props;
	if (_loading) {
		_loading.abort();
	}
	_loading = new AbortController();
	const { signal } = _loading;

	index.value = i;

	return loader(start + i * pageSize, pageSize, signal)
		.then(res => !signal.aborted && emit("update:modelValue", res))
		.finally(() => _loading = null);
}

/**
 * 用户点击按钮后切换页面，同时如果视口无法看到第一项，则会滚动到刚好能看到第一项的位置。
 * 这个滚动不要用动画，否则会让人觉得磨叽。
 *
 * @param index 页码
 */
async function switchPage(index: number) {
	await loadPage(index);
	const top = el.value.getBoundingClientRect().top - props.viewportOffset;
	if (top < 0) {
		document.documentElement.scrollTop = top + getScrollTop();
	}
}

/** 重新加载第一页，返回 Promise 表示加载完成 */
function reload() {
	return loadPage(0);
}

/** 刷新（重新加载）当前页，返回 Promise 表示刷新完成 */
function refresh() {
	return loadPage(index.value);
}

/** 切换到最后一页 */
function switchToLast() {
	const { pageSize } = props;
	loadPage(Math.floor(total.value / pageSize)).then(scrollToEnd);
}

function scrollToStart() {
	nextTick(() => scrollToElementStart(el.value));
}

function scrollToEnd() {
	nextTick(() => scrollToElementEnd(el.value));
}

defineExpose({ reload, refresh, switchToLast, scrollToStart, scrollToEnd });
</script>

<template>
	<!-- 存储到响应对象的 ref 不带冒号，而回调则要 -->
	<div ref="el">
		<paging-buttons
			v-if="topButtons && total"
			:total="total"
			:index="index"
			:page-size="pageSize"
			:type="theme"
			:page-link="pageLink"
			@show-page="switchPage"
		/>

		<slot :items="items.slice(0, pageSize)"/>

		<paging-buttons
			v-if="total"
			:total="total"
			:index="index"
			:page-size="pageSize"
			:type="theme"
			:page-link="pageLink"
			@show-page="switchPage"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { scrollToElementEnd, scrollToElementStart } from "../index";
import { getScrollTop } from "../scroll";
import { LoadDateFn, PageData, PageLinkFn } from "./core";

interface ButtonPagingViewProps {
	modelValue: PageData;
	start?: number;
	pageSize: number;

	/** 是否在上方也显示翻页按钮，默认 false */
	topButtons?: boolean;

	viewportOffset?: number;

	theme?: string;

	loader: LoadDateFn;

	/** 下一页的链接，用于 SSR，如果不存在则不生成 */
	nextLink?: PageLinkFn;
}

const props = withDefaults(defineProps<ButtonPagingViewProps>(), {
	start: 0,
	topButtons: false,
	viewportOffset: 0,
});

const emit = defineEmits(["update:modelValue"]);

const el = ref<HTMLElement>(null);
const index = ref(0);

let loading: AbortController;

const items = computed(() => {
	return props.modelValue?.items ?? [];
});

const total = computed(() => {
	return props.modelValue?.total ?? 0;
});

const pageLink= computed(() => {
	const { nextLink, pageSize, start } = props;
	return nextLink && ((i: number) => nextLink(i * pageSize + start, pageSize));
});

function loadPage(i: number) {
	const { start, pageSize, loader } = props;
	if (loading) {
		loading.abort();
	}
	const { signal } = loading = new AbortController();

	index.value = i;

	const offset = start + i * pageSize;
	return loader(offset, pageSize, signal)
		.then(r => emit("update:modelValue", r))
		.finally(() => loading = null);
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

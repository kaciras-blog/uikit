<template>
	<!-- 存储到响应对象的 ref 不带冒号，而回调则要 -->
	<div ref="el">
		<PagingButtons
			v-if="topButtons && total"
			:total="totalPage"
			:index="index"
			:type="theme"
			:page-link="pageLink"
			@show-page="switchPage"
		/>

		<slot :items="items.slice(0, pageSize)"/>

		<PagingButtons
			v-if="total"
			:total="totalPage"
			:index="index"
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
import PagingButtons from "./PagingButtons.vue";

interface ButtonPagingViewProps {

	/**
	 * 分页数据，该属性身与内部的两个属性（items,total）都不能为空，
	 * 若要表示未加载状态，请对本组件使用 v-if。
	 */
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

/*
 * 本组件处理页码到偏移的转换，props 里的起始位置是项目数量，传递给 PagingButtons 的是页码。
 */
const index = ref(1);
const el = ref<HTMLElement>();

let controller: AbortController | null;

const items = computed(() => props.modelValue.items);
const total = computed(() => props.modelValue.total);

const totalPage = computed(() => {
	return Math.max(0, Math.floor((total.value - 1) / props.pageSize) + 1);
});

const pageLink = computed(() => {
	const { nextLink, pageSize } = props;
	return nextLink && ((i: number) => nextLink(offset(i), pageSize));
});

function offset(i: number) {
	const { pageSize, start } = props;
	return start + (i - 1) * pageSize;
}

/**
 * 开始加载指定的页面，是该组件的核心方法。
 *
 * @param i 页码，从 1 开始。
 */
function loadPage(i: number) {
	const { pageSize, loader } = props;

	controller?.abort();
	const { signal } = controller = new AbortController();

	index.value = i;

	return loader(offset(i), pageSize, signal)
		.then(r => emit("update:modelValue", r))
		.finally(() => controller = null);
}

/**
 * 用户点击按钮后切换页面，同时如果视口无法看到第一项，则会滚动到刚好能看到第一项的位置。
 * 这个滚动不要用动画，否则会让人觉得磨叽。
 *
 * @param index 页码
 */
async function switchPage(index: number) {
	await loadPage(index);
	const top = el.value!.getBoundingClientRect().top - props.viewportOffset;
	if (top < 0) {
		document.documentElement.scrollTop = top + getScrollTop();
	}
}

/** 重新加载第一页，返回 Promise 表示加载完成 */
function reload() {
	return loadPage(1);
}

/** 刷新（重新加载）当前页，返回 Promise 表示刷新完成 */
function refresh() {
	return loadPage(index.value);
}

/** 切换到最后一页 */
function switchToLast() {
	loadPage(totalPage.value).then(scrollToEnd);
}

function scrollToStart() {
	nextTick(() => scrollToElementStart(el.value!));
}

function scrollToEnd() {
	nextTick(() => scrollToElementEnd(el.value!));
}

defineExpose({ reload, refresh, switchToLast, scrollToStart, scrollToEnd });
</script>

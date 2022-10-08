<!--
	新加项目的跳转显示问题：bilibili 的新评论是添加在第一页的最后。
-->
<template>
	<slot :items="modelValue.items"/>
	<ScrollPager
		:state="drained ? State.ALL_LOADED : state"
		:auto-load="autoLoad"
		:next-url="nextUrl"
		:active-height="activeHeight"
		@load-page="loadNext"
	/>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { LoadDateFn, PageData, PageLinkFn, State } from "./core";
import ScrollPager from "./ScrollPager.vue";

interface ScrollPagingViewProps {
	modelValue: PageData;

	/**
	 * 是否触发滚动加载，不使用的话就显示个加载按钮。
	 */
	autoLoad: boolean;

	activeHeight?: number;

	/**
	 * 初始偏移，不包括已有的元素数量。
	 */
	start?: number;

	pageSize: number;

	loader: LoadDateFn;

	/**
	 * 下一页的链接，用于 SSR，如果不存在则不生成。
	 */
	nextLink?: PageLinkFn;
}

const props = withDefaults(defineProps<ScrollPagingViewProps>(), {
	start: 0,
	pageSize: 16,
});

const emit = defineEmits(["update:modelValue"]);

const state = ref<State>(State.FREE);
const count = ref(props.modelValue.items.length);

/** 是否全部加载完毕，没有数据视为未加载完 */
const drained = computed(() => {
	const { start, modelValue } = props;
	return start + count.value >= modelValue.total;
});

const nextUrl = computed(() => {
	const { start, pageSize, nextLink } = props;
	if (drained.value || !nextLink) {
		return;
	}
	return nextLink(start + count.value, pageSize);
});

async function fetchData(offset: number) {
	const { loader, pageSize } = props;

	const { signal } = new AbortController();
	state.value = State.LOADING;
	try {
		const data = await loader(offset, pageSize, signal);
		state.value = State.FREE;
		return data;
	} catch (e) {
		state.value = State.FAILED;
		console.error("[ScrollPagingView] 数据加载失败", e);
	}
}

/**
 * 重新加载，这会清除当前的数据，并抓取第一页。
 */
async function reload() {
	const { start, pageSize } = props;
	const data = await fetchData(start);
	if (data) {
		count.value = pageSize;
		emit("update:modelValue", data);
	}
}

/**
 * 加载下一页，新的项目将附加在当前项目的后面。
 */
async function loadNext() {
	const { start, modelValue, pageSize } = props;
	const { items } = modelValue;

	const data = await fetchData(start + count.value);
	if (data) {
		count.value += pageSize;
		emit("update:modelValue", {
			total: data.total,
			items: items.concat(data.items),
		});
	}
}

defineExpose({ reload, loadNext });
</script>

<!--
	新加项目的跳转显示问题：bilibili 的新评论是添加在第一页的最后。
-->
<template>
	<slot :items="modelValue?.items ?? []"/>
	<scroll-pager
		:state="drained ? State.ALL_LOADED : state"
		:auto-load="autoLoad"
		:next-url="nextUrl"
		:activeHeight="activeHeight"
		@load-page="loadPage"
	/>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { LoadDateFn, PageData, PageLinkFn, State } from "./core";

interface ScrollPagingViewProps {
	modelValue: PageData;

	/** 是否触发滚动加载 */
	autoLoad: boolean;

	activeHeight: number;

	start: number;

	pageSize: number;

	loader: LoadDateFn;

	/** 下一页的链接，用于 SSR，如果不存在则不生成 */
	nextLink?: PageLinkFn;
}

const props = withDefaults(defineProps<ScrollPagingViewProps>(), {
	start: 0,
	pageSize: 16,
});

const emit = defineEmits(["update:modelValue"]);

const state = ref<State>(State.FREE);
const count = ref(props.modelValue?.items.length ?? 0);

/** 是否全部加载完毕，没有数据视为未加载完 */
const drained = computed(() => {
	const { start, modelValue } = props;
	if (!modelValue) {
		return false;
	}
	return start + count.value >= modelValue.total;
});

const nextUrl = computed(() => {
	const { start, pageSize, nextLink } = props;
	if (drained.value || !nextLink) {
		return;
	}
	return nextLink(start + count.value, pageSize);
});

async function loadPage() {
	const { start, loader, modelValue, pageSize } = props;
	const { items = [] } = modelValue || {};
	const offset = start + count.value;

	state.value = State.LOADING;
	const { signal } = new AbortController();

	try {
		const data = await loader(offset, pageSize, signal);
		count.value += pageSize;

		emit("update:modelValue", {
			total: data.total,
			items: items.concat(data.items),
		});

		state.value = State.FREE;
	} catch(e) {
		state.value = State.FAILED;
		console.error("[ScrollPagingView] 数据加载失败", e);
	}
}

defineExpose({ reload: loadPage });
</script>

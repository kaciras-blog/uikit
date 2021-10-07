<!--
这个组件仅仅封装了下请求的处理逻辑，基本是原样放置了 slot 和 scroll-pager 而已，这样的复用与 HTML 没啥
关系，更适合 React Hooks，但是Vue2没有。

新加项目的跳转显示问题：bilibili 的新评论是添加在第一页的最后
-->
<template>
	<div>
		<slot :items="value ? value.items : []"/>
		<scroll-pager
			:state="drained ? 'ALL_LOADED' : 'FREE'"
			:auto-load="autoLoad"
			:next-page-url="nextLink && !drained ? nextLink(start + loadedCount, pageSize) : null"
			@load-page="handleLoadTask"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, withDefaults } from "vue";
import { State } from "./ScrollPager.vue";

interface Props {

	/** 是否触发滚动加载 */
	autoLoad: boolean;

	start: number;

	pageSize: number;

	/** 下一页的链接，用于 SSR，如果不存在则不生成 */
	nextLink?: (start: number, count: number) => string
}

const props = withDefaults(defineProps<Props>(), {
	start: 0,
	pageSize: 16,
});

const state = ref(State.FREE);

function handleLoadTask(task) {
	return this.loadPage()
		.then(isFinish => task.complete(isFinish))
		.catch(e => task.completeWithError(e));
}

async function loadPage() {
	const { start, loader, value, pageSize, loadedCount } = this;
	const { items = [] } = value || {};
	const offset = start + loadedCount;

	const data = await loader(offset, pageSize);
	this.loadedCount += pageSize;
	this.$emit("input", { items: items.concat(data.items), total: data.total });

	// handleLoadTask不在渲染函数里，无法获知value的更新导致其不能使用 this.drained 来判断结束
	return offset + pageSize >= data.total;
}

/** 是否全部加载完毕，没有数据视为未加载完 */
const drained = computed(() => {
	const { loadedCount, start, value } = props;
	if (!value) {
		return false;
	}
	return start + loadedCount >= value.total
});

function reload() {
	const { start, pageSize } = this;

	const doLoadPage = async () => {
		const data = await this.loader(start, pageSize);
		this.$emit("input", data);
		this.loadedCount = pageSize;
		return start + pageSize >= data.total;
	};

	this.$refs.scrollPager.forceLoad(task => {
		doLoadPage()
			.then(isFinish => task.complete(isFinish))
			.catch(e => task.completeWithError(e));
	});
}

interface PagingViewModel {
	items: any[];
	total: number;

	// 内部维护数量而不是用 value.items.length，是为了外部增删元素而不打乱索引
	loadedCount: number;
}
</script>

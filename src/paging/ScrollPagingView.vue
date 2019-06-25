<!--
这个组件仅仅封装了下请求的处理逻辑，基本是原样放置了 slot 和 scroll-pager 而已，这样的复用与 HTML 没啥
关系，更适合 React Hooks，但是Vue2没有。

新加项目的跳转显示问题：bilibili 的新评论是添加在第一页的最后
-->
<template>
	<div>
		<slot :items="value ? value.items : []"/>
		<scroll-pager
			ref="scrollPager"
			:init-state="drained ? 'ALL_LOADED' : 'FREE'"
			:auto-load="autoLoad"
			:next-page-url="nextLink && !drained ? nextLink(start + loadedCount, pageSize) : null"
			@load-page="handleLoadTask"
		/>
	</div>
</template>

<script>
export default {
	name: "ScrollPagingView",
	props: {
		loader: {
			type: Function,
			required: true,
		},
		value: {
			type: Object,
		},
		start: {
			type: Number,
			default: 0,
		},
		pageSize: {
			type: Number,
			default: 16,
		},

		/** (start, count) => string，如果不存在则不生成下一页的链接 */
		nextLink: Function,

		/** 是否触发滚动加载 */
		autoLoad: Boolean,
	},
	data: () => ({
		// 内部维护数量而不是用 value.items.length，是为了外部增删元素而不打乱索引
		loadedCount: 0,
	}),
	computed: {
		/** 是否全部加载完毕，没有数据视为未加载完 */
		drained() {
			const { loadedCount, start, value } = this;
			if (!value) {
				return false;
			}
			return start + loadedCount >= value.total;
		},
	},
	methods: {
		handleLoadTask(task) {
			return this.loadPage()
				.then(finish => task.complete(finish))
				.catch(e => task.completeWithError(e));
		},
		async loadPage() {
			const { start, loader, value, pageSize, loadedCount } = this;
			const { items = [] } = value || {};
			const offset = start + loadedCount;

			const data = await loader(offset, pageSize);
			this.loadedCount += pageSize;
			this.$emit("input", { items: items.concat(data.items), total: data.total });

			// handleLoadTask不在渲染函数里，无法获知value的更新导致其不能使用 this.drained 来判断结束
			return offset + pageSize >= data.total;
		},
		reload() {
			const { start, pageSize } = this;

			const doLoadPage = async () => {
				const data = await this.loader(start, pageSize);
				this.$emit("input", data);
				this.loadedCount = pageSize;
				return start + pageSize >= data.total;
			};

			this.$refs.scrollPager.forceLoad(task => {
				doLoadPage()
					.then(finish => task.complete(finish))
					.catch(e => task.completeWithError(e));
			});
		},
	},
};
</script>

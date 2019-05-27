<template>
	<div>
		<slot :items="value ? value.items : []"/>
		<scroll-pager
			:init-state="drained ? 'ALL_LOADED' : 'FREE'"
			:auto-load="autoLoad"
			:next-page-url="nextLink ? nextLink(value) : null"
			@load-page="handleLoadTask"/>
	</div>
</template>

<script>
export default {
	name: "ScrollPagingView",
	props: {
		loader: {
			type: Function, // start, pageSize -> value
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

		nextLink: Function, // value -> string
		autoLoad: Boolean,
	},
	computed: {
		/** 是否全部加载完毕，没有数据视为未加载完 */
		drained() {
			if (!this.value) return false;
			const { items, total } = this.value;
			return this.start + items.length >= total;
		},
	},
	methods: {
		handleLoadTask(task) {
			return this.loadPage()
				.then(() => task.complete(this.drained))
				.catch(err => task.completeWithError(err));
		},
		async loadPage() {
			const { loader, value, pageSize } = this;
			const { items = [] } = value || {};

			const data = await loader(items.length, pageSize);
			this.$emit("input", { items: items.concat(data.items), total: data.total });
		},
	},
};
</script>

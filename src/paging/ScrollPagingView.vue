<template>
	<div>
		<slot :items="value ? value.items : []"/>
		<scroll-pager
			:init-state="initState"
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
			// required: true, v-model警告
		},

		pageSize: {
			type: Number,
			default: 16,
		},
		nextLink: Function, // value -> string
		autoLoad: Boolean,

		// 设置初始状态，用于预渲染
		initState: String,
	},
	methods: {
		handleLoadTask(task) {
			return this.loadPage()
				.then(res => task.complete(res.items.length < this.pageSize))
				.catch(err => task.completeWithError(err));
		},
		async loadPage() {
			const { loader, value, pageSize } = this;
			const { items } = value;
			const res = await loader(items.length, pageSize);
			this.$emit("input", { items: items.concat(res.items), total: res.total });
		},
	},
};
</script>

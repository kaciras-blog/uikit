export default {
	title: "Paging",
};

export const Custom = () => ({
	template: `
		<button-paging-view
			ref="pagingView"
			v-model="list"
			:loader="loadMockItems"
			:viewport-offset="60"
			:page-size="10"
			:show-top-buttons="true"
		>
			<template v-slot="{ items }">
				<p v-for="item of items" :key="item">{{ item }}</p>
			</template>
		</button-paging-view>`,
	data: () => ({
		list: undefined,
		scrollList: undefined,
	}),
	methods: {
		loadScrollItems(start) {
			if (start > 100) {
				return Promise.resolve({ items: [], total: 100 });
			}
			let items = new Array(16);
			items.fill("列表项：");
			items = items.map((text, i) => text + (start + i));
			return Promise.resolve({ items, total: 100 });
		},
		async loadMockItems(index, size) {
			const items = new Array(size)
				.fill(0)
				.map((_, i) => index * size + i);
			return { items, total: 1000 };
		},
	},
	mounted() {
		this.$refs.pagingView.refresh();
	},
});

Custom.storyName = "button paging view";

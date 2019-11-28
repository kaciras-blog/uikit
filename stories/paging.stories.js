export default {
	title: 'Paging',
};

export const custom = () => ({
	template: `
	<button-paging-view
		ref="pagingView"
		v-model="list"
		:loader="loadMockItems"
		:viewport-offset="60"
		:page-size="2"
		:show-top-buttons="true"
		>
			<template v-slot="{ items }">
				<p v-for="item of items" :key="item">{{item}}</p>
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
			return { items: [0, 0].map((_, i) => index * 2 + i), total: 100 };
		},
	},
	mounted() {
		this.$refs.pagingView.refresh();
	},
});

custom.story = { name: "Custom dialog" };

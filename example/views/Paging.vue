<template>
	<div>
		<button-paging-view
			ref="pagingView"
			v-model="list"
			:loader="loadMockItems"
			:viewport-offset="60"
			:page-size="2"
			:show-top-buttons="true">

			<template v-slot="{ items }">
				<p v-for="item of items" :key="item">{{item}}</p>
			</template>
		</button-paging-view>

		<hr>

		<button-paging-view
			theme="text"
			ref="pagingView"
			v-model="list"
			:loader="loadMockItems"
			:viewport-offset="60"
			:page-size="2"
			:show-top-buttons="true">

			<template v-slot="{ items }">
				<p v-for="item of items" :key="item">{{item}}</p>
			</template>
		</button-paging-view>
		<!--<button-paging-view :show-top-buttons="true" :loader="loadMockItems">-->
		<!--	<template v-slot="{ items }">-->
		<!--		<template v-if="items.length">-->
		<!--			<p v-for="item of items">{{item}}</p>-->
		<!--		</template>-->
		<!--		<div v-else>Empty</div>-->
		<!--	</template>-->
		<!--</button-paging-view>-->
	</div>
</template>

<script>
export default {
	name: "Paging",
	data: () => ({
		list: null,
	}),
	methods: {
		async loadMockItems(index, size) {
			return { items: [0, 0].map((_, i) => index * 2 + i), total: 100 };
		},
	},
	mounted() {
		this.$refs.pagingView.refresh();
	},
};
</script>

<style module lang="less">

</style>

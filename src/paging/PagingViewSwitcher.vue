<template>
	<scroll-paging-view :loader="loader" v-model="value" v-if="$mediaQuery.match('mobile')"/>
	<button-paging-view :loader="loader" v-model="value" v-else/>
</template>

<script>
export default {
	name: "PagingViewSwitcher",
	props: {
		loader: Function,
	},
	data: () => ({
		value: { items: [], total: 0 },
	}),
};
</script>

<template>
	<div>
		<button-pageing-view
			:init-page-size="2"
			:init-total-count="100"
			:show-top-buttons="true"
			:loader="loadMockItems"
			:init-items="[0,1]">
			<template v-slot="{ items }">
				<p v-for="item of items">{{item}}</p>
			</template>
		</button-pageing-view>

		<hr>

		<button-pageing-view :show-top-buttons="true" :loader="loadMockItems">
			<template v-slot="{ items }">
				<template v-if="items.length">
					<p v-for="item of items">{{item}}</p>
				</template>
				<div v-else>Empty</div>
			</template>
		</button-pageing-view>
	</div>
</template>

<script>
export default {
	name: "Pageing",
	methods: {
		async loadMockItems(index, size) {
			return [0, 0].map((_, i) => index * 2 + i);
		}
	}
};
</script>

<style module lang="less">

</style>
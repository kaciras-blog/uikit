<template>
	<div>
		<button-pageing-view
			:init-page-size="2"
			:show-top-buttons="true"
			:loader="null"
			:init-items="[0,1,2,3,4,5,6]">
			<template v-slot="{ items }">
				<p v-for="item of items">{{item}}</p>
			</template>
		</button-pageing-view>

		<hr>

		<button-pageing-view :show-top-buttons="true" :loader="null">
			<template v-slot="{ items }">
				<div v-if="items.length">
					<p v-for="item of items">{{item}}</p>
				</div>
				<div v-else>Empty</div>
			</template>
		</button-pageing-view>
	</div>
</template>

<script>
export default {
	name: "Pageing",
}
</script>

<style module lang="less">

</style>
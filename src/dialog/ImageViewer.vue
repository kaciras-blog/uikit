<template>
	<div :class="$style.container">
		<img :src="src" alt="查看大图" :class="$style.image">
	</div>
</template>

<script>
export default {
	name: "ImageViewer",
	props: {
		src: { required: true },
	},
};
</script>

<style module lang="less">
@import "../css/mixin";

.container {
	.overlay-fixed;
	background-color: rgba(0, 0, 0, .7);
	z-index: 100;
}

.image {
	.center-absolute-auto;
	max-width: 100vw;
	max-height: 100vh;
	cursor: zoom-out;
}
</style>

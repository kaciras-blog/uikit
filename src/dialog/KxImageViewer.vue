<template>
	<kx-modal-wrapper
		:class="$style.container"
		:prevent-scroll="true"
		@click.native="$dialog.close"
	>
		<img :src="src" alt="查看大图" :class="$style.image">
	</kx-modal-wrapper>
</template>

<script>
import KxModalWrapper from "./KxModalWrapper";

export default {
	name: "KxImageViewer",
	components: { KxModalWrapper },
	props: {
		src: { required: true },
		element: {},
	},
};
</script>

<style module lang="less">
@import "../css/mixin";

.container {
	background-color: rgba(0, 0, 0, .8);
}

.image {
	.center-absolute-auto;
	max-width: 100vw;
	max-height: 100vh;

	cursor: zoom-out;
	user-select: none; // 防止选中样式遮挡
}
</style>

<template>
	<div :class="$style.header">
		<button
			title="返回"
			:class="$style.back_button"
			@click="$dialog.close"
		>
			<i class="fas fa-arrow-left"/>
		</button>

		<span :class="$style.title">{{ title }}</span>

		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "KxFrameHeader",
	props: ["title"],
};
</script>

<style module lang="less">
@headerHeight: 48px;

.header {
	position: relative;
	height: @headerHeight;

	text-align: center;
	border-bottom: 1px solid #eee;
}

.back_button {
	position: absolute;
	left: 0;
	top: 2px; // 不知道咋的箭头位置就是有点高了
	bottom: 0;

	width: @headerHeight;
	padding: 0 !important; // 屏蔽按钮点击凹陷效果

	font-size: 20px;
	background: none;

	&:active {
		background: whitesmoke;
	}
}

.title {
	font-size: 16px;
	line-height: @headerHeight;
}
</style>

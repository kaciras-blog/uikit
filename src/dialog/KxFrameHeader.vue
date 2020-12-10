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
	props: {
		title: {
			type: String,
			required: false,
		},
	},
};
</script>

<style module lang="less">
@headerHeight: 48px;

.header {
	display: flex;
	height: @headerHeight;
	border-bottom: 1px solid #eee;
}

.back_button {
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
	margin-left: 10px;
	margin-right: auto;
}
</style>

<template>
	<div :class="$style.header">
		<kx-button
			title="返回"
			type="icon"
			:class="$style.back"
			@click="$dialog.close"
		>
			<arrow-left-icon/>
		</kx-button>

		<span :class="$style.title">{{ title }}</span>

		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import ArrowLeftIcon from "../assets/arrow-left.svg?sfc";
import { useDialog } from "./quick-alert";

defineProps({
	title: {
		type: String,
		required: false,
	},
});

const $dialog = useDialog();
</script>

<style module lang="less">
@headerHeight: 48px;

.header {
	display: flex;
	height: @headerHeight;
	border-bottom: 1px solid #eee;
}

.back {
	width: @headerHeight;

	font-size: 20px;
	border-radius: 0;
}

.title {
	font-size: 16px;
	line-height: @headerHeight;
	margin-left: 10px;
	margin-right: auto;
}
</style>

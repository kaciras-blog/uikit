<template>
	<div :class="$style.container">
		<div :class="$style.header">
			<KxButton
				title="返回"
				type="icon"
				:class="$style.back"
				@click="$dialog.close"
			>
				<ArrowLeftIcon/>
			</KxButton>

			<span :class="$style.title">
				{{ title }}
			</span>

			<slot name="actions"/>
		</div>

		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import ArrowLeftIcon from "../assets/arrow-left.svg?sfc";
import KxButton from "../input/KxButton.vue";
import { usePreventScroll } from "../composition";

interface FrameHeaderProps {
	title?: string;
}

usePreventScroll();
defineProps<FrameHeaderProps>();
</script>

<style module lang="less">
@headerHeight: 48px;

.container {
	composes: full-vertex from global;

	display: flex;
	flex-direction: column;

	position: fixed;
	z-index: 900;

	background-color: white;
}

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

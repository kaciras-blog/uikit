<!-- 简单的加载指示器，拥有失败状态和重试按钮 -->
<template>
	<div v-if='error && onRetry' :class='$style.container'>
		加载失败，请
		<a
			class='error highlight'
			@click='onRetry'
		>
			<ReloadIcon :class='$style.icon'/>
			重试
		</a>
	</div>
	<div v-else-if='error' :class='$style.failed'>
		加载失败！
	</div>
	<div v-else :class='$style.loading'>
		<AtomSpinner/>
		<span :class='$style.text'>加载中......</span>
	</div>
</template>

<script setup lang="ts">
import ReloadIcon from "bootstrap-icons/icons/arrow-clockwise.svg?sfc";
import AtomSpinner from "./AtomSpinner.vue";

interface LoadingStatusProps {
	error?: unknown;

	onRetry?(): void;
}

defineProps<LoadingStatusProps>();
</script>

<style module lang="less">
@import "../css/exports";

.container {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1em;
	font-size: 1rem;
}

.failed {
	composes: container;
	composes: error from global;
}

.loading {
	composes: container;
	color: @color-text-minor;
	flex-direction: column;
}

.text {
	margin-top: 0.5em;
}

.icon {
	margin-left: 5px;
	vertical-align: text-bottom;
}
</style>

<template>
	<teleport to="body">
		<div :class="$style.container"><slot/></div>
	</teleport>
</template>

<script setup lang="ts">
import { usePreventScroll } from "../scroll";

usePreventScroll();
</script>

<style module lang="less">
.container {
	composes: full-vertex from global;

	display: flex;
	flex-direction: column;

	position: fixed;
	z-index: 900;

	background-color: white;
}
</style>

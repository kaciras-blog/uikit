<template>
	<div :class="$style.container"><slot/></div>
</template>

<script setup lang="ts">
import { usePreventScroll } from "../composition";

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

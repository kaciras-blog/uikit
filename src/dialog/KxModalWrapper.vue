<!--
TODO: 将 MessageBox 和 DialogBase 的最外层移到这里，如何方便地对面板设置属性而不是遮罩层？
-->
<template>
	<div class="full-vertex kx-modal"><slot/></div>
</template>

<script setup lang="ts">
import { usePreventScroll } from "../composition";

interface KxModalWrapperProps {
	preventScroll?: boolean;
}

const props = defineProps<KxModalWrapperProps>();

if (props.preventScroll) usePreventScroll();
</script>

<style lang="less">
.kx-modal {
	position: fixed;
	z-index: 1000;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: rgba(0, 0, 0, .3);
}
</style>

<template>
	<div
		:class="$style.container"
		@mouseenter="handleHover"
		@mouseleave="handleLeave"
	>
		{{ content }}
	</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { MessageBoxType } from "./quick-alert";

interface ToastProps {
	type: MessageBoxType;
	delay?: number;
	content: string;
}

const props = withDefaults(defineProps<ToastProps>(), {
	delay: 5000,
});

const emit = defineEmits(["close"]);

let preventClose = false;
let closed = false;

function handleHover() {
	preventClose = true;
}

function handleLeave() {
	if (closed) {
		emit("close");
	}
	preventClose = false;
}

function close() {
	if (preventClose) {
		closed = true;
	} else {
		emit("close");
	}
}

onMounted(() => setTimeout(close, props.delay));
</script>

<style module lang="less">
@import "../css/exports";

@keyframes fade-in {
	from { opacity: 0; }
	to { opacity: 1; }
}

.container {
	position: fixed;
	left: 50%;
	bottom: 10vh;
	z-index: 5000;

	padding: 5px 12px;
	transform: translateX(-50%);

	box-shadow: 0 0 5px rgba(0, 0, 0, .3);
	border-radius: 4px;
	color: white;
	background-color: #4eaf4b;

	animation: fade-in .25s;

	@media screen and (min-width: @length-screen-mobile) {
		padding: .5em 1em;
	}
}
</style>

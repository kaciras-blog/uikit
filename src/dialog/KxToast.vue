<template>
	<div
		:class="[
			$style.container,
			$style[MessageType[type]]
		]"
		@mouseenter="handleHover"
		@mouseleave="handleLeave"
	>
		<component
			:is="iconMap[type]"
			:class="$style.icon"
		/>
		<div :class="$style.body">
			{{ content }}
		</div>
		<KxButton
			:class="$style.close"
			type="icon"
			title="关闭"
			@click='emit("close")'
		>
			<CloseIcon/>
		</KxButton>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import InfoIcon from "bootstrap-icons/icons/info-circle-fill.svg?sfc";
import CheckIcon from "bootstrap-icons/icons/check-circle-fill.svg?sfc";
import WarnIcon from "bootstrap-icons/icons/exclamation-triangle-fill.svg?sfc";
import ErrorIcon from "bootstrap-icons/icons/x-circle-fill.svg?sfc";
import CloseIcon from "../assets/icon-close.svg?sfc";
import { MessageType } from "./controller";
import KxButton from "../input/KxButton.vue";

const iconMap = {
	[MessageType.Info]: InfoIcon,
	[MessageType.Success]: CheckIcon,
	[MessageType.Warning]: WarnIcon,
	[MessageType.Error]: ErrorIcon,
};

interface ToastProps {
	type: MessageType;
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
	display: flex;
	align-items: center;
	width: 320px;
	min-height: 64px;

	margin: 12px 0;
	padding: 14px;
	font-size: 16px;

	box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .1),
	0 2px 15px 0 rgba(0, 0, 0, .05);

	border-radius: 4px;
	color: white;

	animation: fade-in .25s;

	@media screen and (min-width: @length-screen-mobile) {
	}
}

.icon {
	font-size: 1.25em;
	margin-inline-end: 10px;
}

.body {
	flex: 1;
}

.close {
	align-self: flex-start;
	margin-top: -6px;
	margin-right: -6px;
	padding: 0;
	font-size: 18px;
}

.Info {
	background: #3498db;
}

.Success {
	background: #07bc0c;
}

.Warning {
	background: #f1c40f;
}

.Error {
	background: #e74c3c;
}
</style>

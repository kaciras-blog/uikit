<template>
	<teleport to="body">
		<kx-modal-wrapper
			@click.self="onOverlayClick"
			@keyup.esc="onEscape"
		>
			<div
				class="kx-dialog dialogZoomIn"
				ref="dialogEl"
				tabindex="-1"
				v-autofocus
				role="dialog"
				aria-modal="true"
			>
				<header
					class="kx-dialog-header"
					@mousedown="drag"
					@touchstart.self.prevent="drag"
				>
					<slot name="title">
						<h2 class="kx-dialog-title">{{ title }}</h2>
					</slot>
					<kx-close-icon v-if="closeIcon" @click="$emit('close')"/>
				</header>

				<div class="kx-dialog-body"><slot/></div>
			</div>
		</kx-modal-wrapper>
	</teleport>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { limitInWindow, moveElement, observeMouseMove } from "../dragging";
import { usePreventScroll } from "../scroll";
import KxCloseIcon from "./KxCloseIcon.vue";
import KxModalWrapper from "./KxModalWrapper.vue";

const props = defineProps({

	/** 简单的标题，如果使用了 title 插槽则忽略 */
	title: String,

	/** 是否可以点击标题栏拖动，默认true */
	draggable: {
		type: Boolean,
		default: true,
	},

	/** 点击遮罩层关闭，默认false */
	clickToClose: Boolean,

	/** 是否显示右上角的关闭按钮（叉），并且允许按 ESC 关闭 */
	closeIcon: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(["close"]);

const dialogEl = ref<HTMLElement>();

usePreventScroll();

function drag(event) {
	if (!props.draggable) {
		return;
	}
	if (!event.touches && event.button !== 0) {
		return; // 鼠标右键不拖动
	}
	observeMouseMove()
		.pipe(limitInWindow(), moveElement(event, dialogEl.value!))
		.subscribe();
}

function onEscape() {
	if (props.closeIcon) emit("close");
}

function onOverlayClick() {
	if (props.clickToClose && props.closeIcon) emit("close");
}
</script>

<style lang="less">
.kx-dialog {
	display: flex;
	flex-direction: column;

	min-width: 300px;
	max-width: 80vw;
	overflow: hidden;

	border-radius: 4px;
	background-color: white;
}

.kx-dialog-title {
	margin: 0;
	padding-left: 16px;
	font-size: 22px;
	font-weight: 500;
}

.kx-dialog-header {
	display: flex;
	justify-content: space-between;
	align-items: center;

	height: 3rem;
	border-bottom: solid 1px #d5d5d5;

	user-select: none;
}

.kx-dialog-body {
	padding: 20px;
}
</style>

<template>
	<teleport to="body">
		<kx-modal-wrapper @click.self="onOverlayClick" @keyup.esc="onEscape">
			<div
				class="dialogZoomIn"
				:class="$style.dialog"
				ref="dialogEl"
				tabindex="-1"
				v-autofocus
				role="dialog"
				aria-modal="true"
			>
				<header
					:class="$style.header"
					@mousedown="drag"
					@touchstart.self.prevent="drag"
				>
					<slot name="title">
						<h2 :class="$style.title">{{ title }}</h2>
					</slot>
					<button
						v-if="closeIcon"
						title="关闭"
						:class="$style.closeIcon"
						@mousedown.stop
						@click="$emit('close')"
					>
						<close-icon/>
					</button>
				</header>

				<div :class="$style.body"><slot/></div>
			</div>
		</kx-modal-wrapper>
	</teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { limitInWindow, moveElement, observeMouseMove } from "../dragging";
import { usePreventScroll } from "../scroll";
import CloseIcon from "../assets/icon-close.svg?sfc";
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

<style module lang="less">
.dialog {
	display: flex;
	flex-direction: column;

	min-width: 300px;
	max-width: 80vw;
	overflow: hidden;

	border-radius: 4px;
	background-color: white;
}

.title {
	margin: 0;
	padding-left: 16px;
	font-size: 22px;
	font-weight: 500;
}

.header {
	display: flex;
	align-items: center;

	height: 3rem;
	//border-bottom: solid 1px #d5d5d5;

	user-select: none;
}

.body {
	padding: 20px;
}

.closeIcon {
	margin-left: auto;
	height: 3rem;
	width: 3rem;

	font-size: 24px;
	line-height: 1em;

	text-align: center;
	cursor: pointer;
	background: none;

	transition: .15s ease-out;

	&:hover,
	&:focus {
		background-color: rgba(0, 0, 0, .05);
	}

	&:active {
		background-color: rgba(0, 0, 0, .1);
	}
}
</style>

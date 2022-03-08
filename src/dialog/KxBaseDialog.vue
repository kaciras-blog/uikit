<template>
	<KxModalWrapper @click.self="onEscape" @keyup.esc="onEscape">
		<div
			ref="dialogEl"
			class="dialogZoomIn"
			:class="$style.dialog"
			tabindex="-1"
			v-auto-focus
			role="dialog"
			aria-modal="true"
			v-bind="$attrs"
		>
			<header
				:class="$style.header"
				@mousedown="drag"
				@touchstart.self.prevent="drag"
			>
				<slot name="title">
					<h2 :class="$style.title">
						{{ title }}
					</h2>
				</slot>
				<KxButton
					v-if="closeIcon"
					type="icon"
					title="关闭"
					:class="$style.closeIcon"
					@mousedown.stop
					@click="$dialog.close"
				>
					<CloseIcon/>
				</KxButton>
			</header>

			<!-- 为了方便 padding 还是包一层 -->
			<div :class="$style.body"><slot/></div>

			<KxDialogButtons
				:acceptable="acceptable"
				@accept="onAccept"
				@apply="onApply"
				@cancel="onCancel"
			/>
		</div>
	</KxModalWrapper>
</template>

<script lang="ts">
export default {
	inheritAttrs: false, // 避免警告，虽然不设置也没问题。
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import { usePreventScroll } from "../composition";
import { limitInWindow, moveElement, observeMouseMove } from "../dragging";
import { isTouchEvent } from "../common";
import CloseIcon from "../assets/icon-close.svg?sfc";
import vAutoFocus from "../directives/autofocus";
import KxButton from "../input/KxButton.vue";
import KxModalWrapper from "./KxModalWrapper.vue";
import KxDialogButtons from "./KxDialogButtons.vue";

const props = defineProps({

	/** 简单的标题，如果使用了 title 插槽则忽略 */
	title: String,

	/** 是否可以点击标题栏拖动，默认true */
	draggable: {
		type: Boolean,
		default: true,
	},

	/** 是否显示右上角的关闭按钮，并允许按 ESC 关闭 */
	closeIcon: {
		type: Boolean,
		default: true,
	},

	/** 确定和应用按钮是否禁用 */
	acceptable: {
		type: Boolean,
		default: true,
	},

	/** 为 false 则等效于不设置 */
	onCancel: {
		type: [Function, Boolean],
		required: false,
	},
	onApply: {
		type: [Function, Boolean],
		required: false,
	},
	onAccept: {
		type: [Function, Boolean],
		required: false,
	},
});

const emit = defineEmits(["close"]);

const dialogEl = ref<HTMLElement>();

usePreventScroll();

function drag(event: TouchEvent | MouseEvent) {
	if (!props.draggable) {
		return;
	}
	if (!isTouchEvent(event) && event.button !== 0) {
		return; // 鼠标右键不拖动
	}
	observeMouseMove()
		.pipe(limitInWindow(), moveElement(event, dialogEl.value!))
		.subscribe();
}

function onEscape() {
	if (props.closeIcon) emit("close");
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
	border-radius: 0;
}
</style>

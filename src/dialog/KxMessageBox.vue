<template>
	<teleport to="body">
		<kx-modal-wrapper
			@click.self="onOverlayClick"
			@keyup.esc="closable && $dialog.close()"
		>
			<div
				class="kx-msgbox"
				:class="{ shaking, dialogZoomIn }"
				tabindex="-1"
				v-autofocus
				role="dialog"
				aria-modal="true"
			>
				<button
					v-if="closable"
					:class="$style.closeIcon"
					title="关闭"
					@click="$dialog.close"
				>
					<close-icon/>
				</button>

				<dialog-icons :type="type"/>
				<h2>{{ title }}</h2>

				<!-- pre 标签特殊，不会去除内容中的空白 -->
				<pre v-if="content" :class="$style.content">{{ content }}</pre>

				<kx-dialog-buttons
					:on-cancel="cancelable && $dialog.close"
					:on-accept="() => $dialog.confirm(true)"
				/>
			</div>
		</kx-modal-wrapper>
	</teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CloseIcon from "../assets/icon-close.svg?sfc";
import KxButton from "../components/KxButton.vue";
import { MessageBoxType, useDialog } from "./quick-alert";
import DialogIcons from "./DialogIcons.vue";
import KxModalWrapper from "./KxModalWrapper.vue";
import KxDialogButtons from "./KxDialogButtons.vue";

interface MessageBoxProps {
	title: string;
	type: MessageBoxType;

	/**
	 * 消息框的内容，可以用换行符\n来换行，在超出宽度也会时自动换行。
	 * 【更新】取消了数组方式的换行，因为可以用Vue的过滤器完成，或是应该自行处理。
	 */
	content?: string;

	/**
	 * 是否显示取消按钮。
	 */
	cancelable?: boolean;

	/**
	 * 如果为 false 则强制必须点击底部的按钮关闭，点击遮罩会震动。
	 */
	closable?: boolean;
}

const props = withDefaults(defineProps<MessageBoxProps>(), {
	closable: true,
	cancelable: false,
});

const dialogZoomIn = ref(true);
const shaking = ref(false);

const $dialog = useDialog();

function onOverlayClick() {
	if (props.closable) {
		$dialog.close();
	} else {
		// 一个元素不能有多个 animation 属性，要先把进入动画去掉
		dialogZoomIn.value = false;
		shaking.value = true;
		return setTimeout(() => shaking.value = false, 300);
	}
}
</script>

<style module lang="less">
/* TODO: 重复 */
.closeIcon {
	position: absolute;
	top: 0;
	right: 0;

	font-size: 24px;
	padding: 12px;
	border-radius: 0;
	line-height: 0;

	text-align: center;
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

.content {
	max-height: 40vh;
	overflow-y: auto;
	white-space: pre-wrap;
	word-wrap: break-word;
	line-height: 20px;
}
</style>

<style lang="less">
.kx-msgbox {
	position: relative;

	max-width: 450px;
	width: 80vw;
	padding: 30px 20px 20px;

	border-radius: 4px;
	overflow: hidden;

	background-color: white;
	font-size: 1rem;
	text-align: center;
}

.dialogZoomIn {
	animation: dialog-zoomIn .3s 1;
}

@keyframes dialog-zoomIn {
	from {
		opacity: 0;
		transform: scale(0.96, 0.96);
	}
	to { /* default */ }
}

.shaking {
	animation: shaking 0.3s 1;
}

@keyframes shaking {
	0% { transform: translateX(-4px);}
	25% {}
	50% { transform: translateX(4px); }
	100% {}
}
</style>

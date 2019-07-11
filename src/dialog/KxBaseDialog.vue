<template>
	<kx-modal-wrapper
		@click.native.self="onOverlayClick"
		@keyup.native.esc="onEscape"
	>
		<div ref="panel"
			 class="kx-dialog dialogZoomIn"
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
				<slot name="title"><h2 class="kx-dialog-title">{{title}}</h2></slot>
				<kx-close-icon v-if="closeIcon" @click="close"/>
			</header>

			<div class="kx-dialog-body"><slot/></div>
		</div>
	</kx-modal-wrapper>
</template>

<script>
import KxModalWrapper from "./KxModalWrapper";
import KxCloseIcon from "./KxCloseIcon";
import { elementPosition, limitInWindow, moveElement, observeMouseMove } from "../dragging";

export default {
	name: "KxBaseDialog",
	components: {
		KxModalWrapper,
		KxCloseIcon,
	},
	props: {
		/** 标题，这是个设置标题的便捷方法，如果使用了标题插槽则该属性将被忽略 */
		title: String,

		/** 点击遮罩层关闭，默认false */
		clickToClose: Boolean,

		/** 是否显示右上角的关闭按钮（叉），并且允许按ESC关闭 */
		closeIcon: {
			type: Boolean,
			default: true,
		},

		/** 拦截关闭按钮、ESC、遮罩点击的关闭事件 */
		closeHook: Function,

		/** 是否可以点击标题栏拖动，默认true */
		draggable: {
			type: Boolean,
			default: true,
		},
	},
	methods: {
		close() {
			(this.closeHook || this.$dialog.close)();
		},
		drag(event) {
			if (!this.draggable) {
				return;
			}
			if (!event.touches && event.button !== 0) {
				return; // 鼠标右键不拖动
			}
			observeMouseMove().pipe(
				limitInWindow,
				elementPosition(event, this.$refs.panel),
				moveElement(this.$refs.panel)
			).subscribe();
		},
		onEscape() {
			if (this.closeIcon) this.close();
		},
		onOverlayClick() {
			if (this.clickToClose) this.close();
		},
	},
};
</script>

<style lang="less">
.kx-dialog {
	display: flex;
	flex-direction: column;

	min-width: 300px;
	max-width: 80vw;

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
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;

	user-select: none;
}

.kx-dialog-body {
	padding: 20px;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
}
</style>

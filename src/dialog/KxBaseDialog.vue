<!--
使用注意：footer插槽最好是一个元素，多个就用容器包起来
-->
<template>
	<kx-modal-wrapper :click-to-close="clickToClose">
		<div ref="panel"
			 class="kx-dialog anime-zoomIn"
			 role="dialog"
			 aria-modal="true">

			<header class="kx-dialog-header" @mousedown="drag">
				<slot name="title">
					<h2 class="kx-dialog-title">{{title}}</h2>
				</slot>
				<div title="关闭"
					 class="kx-dialog-close"
					 v-if="closeIcon"
					 @mousedown.stop
					 @click="close">
					<img src="../assets/icon-close.svg" alt="CloseIcon">
				</div>
			</header>

			<div class="kx-dialog-body"><slot/></div>
		</div>
	</kx-modal-wrapper>
</template>

<script>
import { dragMoveElement, listenDragging, limitInWindow } from "../helpers";
import KxModalWrapper from "./KxModalWrapper";

export default {
	name: "KxBaseDialog",
	components: { KxModalWrapper },
	props: {
		/** 点击遮罩层关闭 */
		clickToClose: Boolean,

		/** 标题，这是个设置标题的便捷方法，如果使用了标题插槽则该属性将被忽略 */
		title: String,

		/** 是否显示右上角的关闭按钮（叉） */
		closeIcon: {
			type: Boolean,
			default: true,
		},

		/** 在点击关闭按钮时不发出事件，而是直接关闭窗口并返回undefined */
		defaultClose: {
			type: Boolean,
			default: true,
		},

		/** 是否可以点击标题栏拖动，默认true */
		draggable: {
			type: Boolean,
			default: true,
		},
	},
	methods: {
		close () {
			if (this.defaultClose) {
				this.$dialog.cancel();
			} else {
				this.$emit("close-button-clicked");
			}
		},
		drag (event) {
			if (!this.draggable) {
				return;
			}
			if (!event.touches && event.button !== 0) {
				return; // 鼠标右键不拖动
			}
			listenDragging().pipe(limitInWindow).subscribe(dragMoveElement(event, this.$refs.panel));
		},
	},
};
</script>

<style lang="less">
.kx-dialog-close {
	height: 100%;
	width: 3rem;

	cursor: pointer;
	text-align: center;
	line-height: 3rem;
	border-top-right-radius: 4px;

	&:hover {
		background-color: rgba(0, 0, 0, .05);
	}
}

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
	border-top-left-radius: calc(.5rem - 1px);
	border-top-right-radius: calc(.5rem - 1px);

	user-select: none;
}

.kx-dialog-body {
	padding: 20px;
	border-bottom-left-radius: calc(.5rem - 1px);
	border-bottom-right-radius: calc(.5rem - 1px);

	/* footer插槽，如果有就加个下边距 */

	& + * {
		padding-bottom: 1rem;
	}
}
</style>

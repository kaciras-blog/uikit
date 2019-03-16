<!--
使用注意：footer插槽最好是一个元素，多个就用容器包起来
-->
<template>
	<kx-modal-wrapper :click-to-close="clickToClose">
		<div class="kx-dialog"
			 ref="panel"
			 :style="optionalStyle"
			 role="dialog"
			 aria-modal="true">

			<header class="kx-dialog-header" @mousedown="drag">
				<slot name="title">
					<h2>{{title}}</h2>
				</slot>
				<div title="关闭"
					 class="kx-dialog-close"
					 v-if="closeIcon"
					 @mousedown.stop
					 @click="close">X
				</div>
			</header>

			<div class="kx-dialog-body"><slot/></div>

			<slot name="footer"/>
		</div>
	</kx-modal-wrapper>
</template>

<script>
import { drag } from "../helpers";
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

		/** 是否可以点击标题栏拖动 */
		draggable: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		position: {
			X: 0,
			Y: 0,
			manual: false,
		},
	}),
	computed: {
		optionalStyle () {
			const style = {};

			if (this.position.manual) {
				style.position = "fixed";
				style.left = this.position.X + "px";
				style.top = this.position.Y + "px";
			}
			return style;
		},
	},
	methods: {
		close () {
			if (this.defaultClose) {
				this.$dialog.close();
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
			this.position.manual = true;

			drag(this.$refs.panel, event.clientX, event.clientY, (x, y) => {
				this.position.X = x;
				this.position.Y = y;
			});
		},
	},
};
</script>

<style lang="less">
.kx-dialog-close {
	height: 100%;
	width: 3rem;
	cursor: pointer;
	font-size: 1.5rem;
	text-align: center;
	line-height: 3rem;
	border-top-right-radius: calc(.5rem - 1px);

	&:hover {
		background-color: rgba(0, 0, 0, .15);
	}
}

.kx-dialog {
	display: flex;
	flex-direction: column;

	min-width: 16rem;

	border-radius: 5px;
	background-color: white;
}

.kx-dialog-header {
	height: 3rem;
	color: white;

	user-select: none;

	padding-left: 1rem;
	background-color: rgb(51, 149, 231);
	border-top-left-radius: calc(.5rem - 1px);
	border-top-right-radius: calc(.5rem - 1px);

	display: flex;
	justify-content: space-between;
	align-items: center;
}

.kx-dialog-body {
	padding: 1.5rem 1rem;
	border-bottom-left-radius: calc(.5rem - 1px);
	border-bottom-right-radius: calc(.5rem - 1px);
	overflow-y: auto;
	overflow-x: hidden;

	/* footer插槽，如果有就加个下边距 */

	& + * {
		padding-bottom: 1rem;
	}
}
</style>

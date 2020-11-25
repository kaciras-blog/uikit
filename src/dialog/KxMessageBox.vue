<template>
	<kx-modal-wrapper
		@click.native.self="onOverlayClick"
		@keyup.native.esc="closable && $dialog.close()"
	>
		<div
			class="kx-msgbox"
			:class="{ shaking, dialogZoomIn }"
			tabindex="-1"
			v-autofocus
			role="dialog"
			aria-modal="true"
		>
			<kx-close-icon
				v-if="closable"
				:class="$style.closeIcon"
				@click="$dialog.close"
			/>
			<dialog-icons :type="type"/>

			<h2>{{title}}</h2>
			<pre v-if="content" :class="$style.content">{{content}}</pre>

			<kx-dialog-buttons :cancel-button="showCancelButton"/>
		</div>
	</kx-modal-wrapper>
</template>

<script>
import KxModalWrapper from "./KxModalWrapper";
import DialogIcons from "./DialogIcons";
import KxCloseIcon from "./KxCloseIcon";

export default {
	name: "KxMessageBox",
	components: {
		DialogIcons,
		KxModalWrapper,
		KxCloseIcon,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
		/**
		 * 消息框的内容，可以用换行符\n来换行，在超出宽度也会时自动换行。
		 * 【更新】取消了数组方式的换行，因为可以用Vue的过滤器完成，或是应该自行处理。
		 */
		content: {
			type: String,
		},
		type: {
			type: Number,
			default: 0, // MessageBoxType.Info
		},
		showCancelButton: {
			type: Boolean,
			default: false,
		},
		closable: {
			type: Boolean,
			default: true,
		},
		overlayClose: {
			type: Boolean,
			default: true,
		},
	},
	data: () => ({
		dialogZoomIn: true,
		shaking: false,
	}),
	methods: {
		onOverlayClick() {
			if (!this.closable) {
				this.dialogZoomIn = false; // 一个元素不能有多个animation属性，要把进入动画去掉
				this.shaking = true;
				return setTimeout(() => this.shaking = false, 300);
			}
			if (this.overlayClose) {
				this.$dialog.close();
			}
		},
	},
};
</script>

<style module lang="less">
.closeIcon {
	position: absolute;
	top: 0;
	right: 0;
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

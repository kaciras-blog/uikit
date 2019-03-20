<template>
	<kx-modal-wrapper @click.native.self="onOverlayClick">
		<div class="kx-msgbox"
			 :class="{ shaking, dialogZoomIn }"
			 role="dialog"
			 aria-modal="true">

			<kx-close-icon v-if="quickClose" :class="$style.closeIcon" @click="$dialog.cancel"/>
			<dialog-icons :type="type"/>

			<h2 v-if="title">{{title}}</h2>
			<pre :class="$style.messagePre">{{message}}</pre>

			<kx-standard-dialog-buttons :cancel-button="cancelable"/>
		</div>
	</kx-modal-wrapper>
</template>

<script>
import KxModalWrapper from "./KxModalWrapper";
import DialogIcons from "./DialogIcons";
import KxStandardDialogButtons from "./KxStandardDialogButtons";
import KxCloseIcon from "./KxCloseIcon";

export default {
	name: "KxMessageBox",
	components: {
		KxStandardDialogButtons,
		DialogIcons,
		KxModalWrapper,
		KxCloseIcon,
	},
	props: {
		title: String,
		content: [String, Array],
		type: {
			type: Number,
			default: 0, // MessageBoxType.Info
		},
		cancelable: {
			type: Boolean,
			default: true,
		},
		quickClose: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		dialogZoomIn: true,
		shaking: false,
	}),
	computed: {
		message () {
			const { content } = this;
			if (typeof (content) === "string") {
				return content;
			}
			return content.join("\n");
		},
	},
	methods: {
		onOverlayClick () {
			if (this.quickClose) {
				return this.$dialog.cancel();
			}
			this.dialogZoomIn = false; // 一个元素不能有多个animation属性，要把进入动画去掉
			this.shaking = true;
			setTimeout(() => this.shaking = false, 300);
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

.messagePre {
	white-space: pre-wrap;
	word-wrap: break-word;
	line-height: 20px;
	margin-bottom: 20px;
}
</style>

<style lang="less">
.kx-msgbox {
	position: relative;

	max-width: 450px;
	width: 80vw;
	border-radius: 4px;
	padding: 20px;

	background-color: white;
	font-size: 1rem;
	text-align: center;
}

.dialogZoomIn {
	animation: dialog-zoomIn 0.3s 1;
}

@keyframes dialog-zoomIn {
	from {
		opacity: 0;
		transform: scale(0.95, 0.95);
	}
	to { /* default */ }
}

.shaking {
	animation: shaking 0.3s 1;
}

@keyframes shaking {
	0%   { transform: translateX(-4px);}
	25%  {}
	50%  { transform: translateX(4px); }
	100% {}
}
</style>

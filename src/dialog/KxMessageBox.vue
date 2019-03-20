<template>
	<kx-modal-wrapper :click-to-close="dimmerClose">
		<div class="kx-msgbox anime-zoomIn"
			 role="dialog"
			 aria-modal="true">

			<kx-close-icon v-if="cancelable" :class="$style.closeIcon" @click="$dialog.cancel"/>
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
		dimmerClose: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		message () {
			const { content } = this;
			if (typeof (content) === "string") {
				return content;
			}
			return content.join("\n");
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

.anime-zoomIn {
	animation: dialog-zoomIn 0.3s 1;
}

@keyframes dialog-zoomIn {
	from {
		opacity: 0;
		transform: scale(0.95, 0.95);
	}
	to { /* default */
	}
}
</style>

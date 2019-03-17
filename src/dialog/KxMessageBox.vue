<template>
	<kx-modal-wrapper :click-to-close="dimmerClose">
		<div class="kx-msgbox">
			<div
				v-if="cancelable"
				title="关闭"
				:class="$style.closeIcon"
				@mousedown.stop
				@click="$dialog.cancel">X</div>

			<dialog-icons :class="$style.icon" :type="type"/>

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

export default {
	name: "KxMessageBox",
	components: { KxStandardDialogButtons, DialogIcons, KxModalWrapper },
	props: {
		title: String,
		content: [String, Array],
		type: {
			type: Number,
			default: 0,
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
	height: 30px;
	width: 30px;

	text-align: center;
	font-size: 1.5rem;
	line-height: 30px;

	cursor: pointer;
	border-top-right-radius: 4px;

	&:hover {
		background: rgba(0, 0, 0, .1);
	}
}

.icon {
	margin-top: 20px;
	margin-bottom: 20px;
}

.messagePre{
	white-space: pre-wrap;
	word-wrap: break-word;
	line-height: 20px;
	margin-bottom: 20px;
}
</style>

<style lang="less">
.kx-msgbox {
	position: relative;

	max-width: 500px;
	width: 80vw;
	border-radius: 4px;
	padding: 20px;

	background-color: white;
	font-size: 1rem;
	text-align: center;
}
</style>

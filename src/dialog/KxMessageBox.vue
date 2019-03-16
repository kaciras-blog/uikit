<template>
	<kx-modal-wrapper :click-to-close="dimmerClose">
		<div class="kx-msgbox">
			<button title="关闭"
				 :class="$style.closeIcon"
				 @mousedown.stop
				 @click="close">X</button>

			<dialog-icons :class="$style.icon" :type="type"/>

			<h2 v-if="title">{{title}}</h2>
			<pre class="kx-msgbox-body">{{message}}</pre>

			<div class="kx-msgbox-buttons btn-group">
				<kx-button
					v-if="cancelable"
					@click="$dialog.cancel()">
					取消
				</kx-button>
				<kx-button
					class="primary"
					@click="$dialog.confirm(undefined)">
					确定
				</kx-button>
			</div>
		</div>
	</kx-modal-wrapper>
</template>

<script>
import KxModalWrapper from "./KxModalWrapper";
import DialogIcons from "./DialogIcons";

export default {
	name: "KxMessageBox",
	components: { DialogIcons, KxModalWrapper },
	props: {
		title: String,
		content: [String, Array],
		type: {
			type: Number,
			default: 0,
		},
		cancelable: {
			type: Boolean,
			default: false,
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
	background: transparent;
	/*border-top-right-radius: calc(.5rem - 1px);*/

	&:hover {
		background: rgba(0, 0, 0, .1);
	}
}

.icon {
	margin-top: 20px;
	margin-bottom: 20px;
}
</style>

<style lang="less">
.kx-msgbox {
	position: relative;

	max-width: 500px;
	width: 80vw;
	border-radius: 5px;
	padding: 20px;

	background-color: white;
	font-size: 1rem;
	text-align: center;
}

.kx-msgbox-buttons {
	text-align: right;
}
</style>

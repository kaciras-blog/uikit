<template>
	<kx-modal-wrapper :click-to-close="dimmerClose">
		<div class="kx-msgbox">
			<button title="关闭"
				 :class="$style.closeIcon"
				 v-if="closeIcon"
				 @mousedown.stop
				 @click="close">X</button>

			<!-- 图标 -->

			<h2 v-if="title">{{title}}</h2>
			<pre class="kx-msgbox-body">{{message}}</pre>

			<div class="kx-msgbox-buttons btn-group">
				<kx-button
					v-if="cancelable"
					@click="$dialog.cancel()">
					取消
				</kx-button>
				<kx-button
					@click="$dialog.confirm(undefined)">
					确定
				</kx-button>
			</div>
		</div>
	</kx-modal-wrapper>
</template>

<script>
import KxModalWrapper from "./KxModalWrapper";

export default {
	name: "KxMessageBox",
	components: { KxModalWrapper },
	props: {
		title: String,
		content: [String, Array],
		type: {
			type: String,
			default: "info",
		},
		cancelable: {
			type: Boolean,
			default: false,
		},
		dimmerClose: {
			type: Boolean,
			default: false,
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
</style>

<style lang="less">
.kx-msgbox {
	max-width: 500px;
	width: 80vw;
	border-radius: 5px;
	padding: 16px;

	background-color: white;
	font-size: 1rem;
	text-align: center;
}

.kx-msgbox-buttons {
	text-align: right;
	padding-left: 1rem;
	padding-right: 1rem;
}
</style>

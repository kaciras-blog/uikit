<!--
	<div class="btn-group" :class="$style.container">
		<kx-button
			v-if="cancelButton"
			@click="$dialog.close">
			取消
		</kx-button>
		<kx-button
			v-if="applyHook"
			@click="applyHook">
			应用
		</kx-button>
		<kx-button
			class="primary"
			@click="confirm">
			确定
		</kx-button>
	</div>
-->

<script>
export default {
	name: "KxStandardDialogButtons",
	functional: true,
	props: {
		cancelButton: Boolean,
		applyHook: Function,
		confirmHook: Function,
	},
	render (h, ctx) {
		const { props, listeners } = ctx;
		const buttons = [];

		if (props.cancelButton) {
			buttons.push(h("kx-button", { on: { click: this.$dialog.close } }, "取消"))
		}
		if (props.applyHook) {
			buttons.push(h("kx-button", { on: { click: props.applyHook } }, "应用"))
		}

		const onConfirm = listeners.confirm || this.$dialog.confirm;
		buttons.push(h("kx-button", { staticClass: "primary", on: { click: onConfirm } }, "确定"));

		return h("div", { class: ["btn-group", this.$style.container] }, buttons)
	},
};
</script>

<style module lang="less">
.container {
	text-align: right;
	margin-top: 20px;
}
</style>

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
		/** 是否显示取消按钮，默认true */
		cancelButton: {
			type: Boolean,
			default: true,
		},
	},
	render (h, ctx) {
		const { props, listeners } = ctx;
		const buttons = [];

		// 函数组件没法引用到Vue.prototype？如果父组件也是函数组件？
		const vm = ctx.parent;

		if (props.cancelButton) {
			buttons.push(h("kx-button", { on: { click: vm.$dialog.close } }, "取消"))
		}
		if (listeners.apply) {
			buttons.push(h("kx-button", { on: { click: listeners.apply } }, "应用"))
		}

		const onConfirm = listeners.confirm || vm.$dialog.confirm;
		buttons.push(h("kx-button", { staticClass: "primary", on: { click: onConfirm } }, "确定"));

		return h("div", { class: ["btn-group", ctx.$style.container] }, buttons)
	},
};
</script>

<style module lang="less">
.container {
	text-align: right;
	margin-top: 20px;
}
</style>

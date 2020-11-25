<!-- 常用的对话框按钮组，包含确定、取消、应用三个按钮 -->
<!--
	<div
		:class="$style.container"
		class="btn-group"
	>
		<kx-button
			class="primary"
			:disabled="acceptable"
			@click="confirm"
		>
			确定
		</kx-button>
		<kx-button
			v-if="cancelButton"
			@click="$dialog.close"
		>
			取消
		</kx-button>
		<kx-button
			v-if="listeners.apply"
			:disabled="acceptable"
			@click="listeners.apply"
		>
			应用
		</kx-button>
	</div>
-->

<script>
export default {
	name: "KxDialogButtons",
	functional: true,
	props: {
		/** 是否显示取消按钮，默认true */
		cancelButton: {
			type: Boolean,
			default: true,
		},
		/** 确定和应用按钮是否禁用 */
		acceptable: {
			type: Boolean,
			default: true,
		},
	},
	render(h, ctx) {
		const { props, listeners } = ctx;
		const buttons = [];

		// TODO: 函数组件没法引用到 Vue.prototype？如果父组件也是函数组件？
		const { $dialog } = ctx.parent;

		buttons.push(h("kx-button", {
			staticClass: "primary",
			on: {
				click: listeners.confirm || $dialog.confirm,
			},
			attrs: {
				disabled: !props.acceptable,
			},
		}, "确定"));

		if (props.cancelButton) {
			buttons.push(h("kx-button", {
				on: {
					click: listeners.cancel || $dialog.close,
				},
			}, "取消"));
		}

		if (listeners.apply) {
			buttons.push(h("kx-button", {
				on: {
					click: listeners.apply,
				},
				attrs: {
					disabled: !props.acceptable,
				},
			}, "应用"));
		}

		return h("div", { class: ["btn-group", ctx.$style.container] }, buttons);
	},
};
</script>

<style module lang="less">
.container {
	text-align: right;
	margin-top: 20px;
}
</style>

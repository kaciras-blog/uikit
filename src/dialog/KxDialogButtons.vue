<!--
	常用的对话框按钮组，包含确定、取消、应用三个按钮。
	经测试给按钮加图标会导致元素过长，限制布局，故不采用。
 -->
<script>
import { h, useCssModule } from "vue";
import KxButton from "../input/KxButton.vue";

function KxDialogButtons(props) {
	const { acceptable, onCancel, onAccept, onApply } = props;
	const buttons = [];

	const $style = useCssModule();

	if (onCancel) {
		const data = { color: "second", onClick: onCancel };
		buttons.push(h(KxButton, data, { default: () => "取消" }));
	}

	if (onAccept) {
		const data = { disabled: !acceptable, onClick: onAccept };
		buttons.push(h(KxButton, data, { default: () => "确定" }));
	}

	if (onApply) {
		const data = { disabled: !acceptable, onClick: onApply };
		buttons.push(h(KxButton, data, { default: () => "应用" }));
	}

	return h("div", { class: ["btn-group", $style.container] }, buttons);
}

KxDialogButtons.props = {

	/** 确定和应用按钮是否禁用 */
	acceptable: {
		type: Boolean,
		default: true,
	},

	/**
	 * 各个按钮的事件，false 则等效于不设置。
	 *
	 * 这些属性可以用 v-on，但要注意其与 v-bind 对表达式的计算处理不同。
	 */
	onCancel: {
		type: [Function, Boolean],
		required: false,
	},
	onApply: {
		type: [Function, Boolean],
		required: false,
	},
	onAccept: {
		type: [Function, Boolean],
		required: false,
	},
};

export default KxDialogButtons;
</script>

<style module lang="less">
.container {
	margin-top: 20px;
	text-align: right;
}
</style>

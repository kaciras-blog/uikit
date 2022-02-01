<!-- 常用的对话框按钮组，包含确定、取消、应用三个按钮 -->
<script>
import { h, useCssModule } from "vue";
import KxButton from "../input/KxButton.vue";

function KxDialogButtons(props) {
	const { acceptable, onCancel, onAccept, onApply } = props;
	const buttons = [];

	const $style = useCssModule();

	if (onCancel) {
		const data = { color: "second", onClick: onCancel };
		buttons.push(h(KxButton, data, "取消"));
	}

	if (onAccept) {
		const data = { disabled: !acceptable, onClick: onAccept };
		buttons.push(h(KxButton, data, "确定"));
	}

	if (onApply) {
		const data = { disabled: !acceptable, onClick: onApply };
		buttons.push(h(KxButton, data, "应用"));
	}

	return h("div", { class: ["btn-group", $style.container] }, buttons);
}

KxDialogButtons.props = {

	/** 确定和应用按钮是否禁用 */
	acceptable: {
		type: Boolean,
		default: true,
	},

	onCancel: {
		type: Function,
		required: false,
	},
	onApply: {
		type: Function,
		required: false,
	},
	onAccept: {
		type: Function,
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

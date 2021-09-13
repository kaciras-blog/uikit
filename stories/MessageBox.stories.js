import { action } from "@storybook/addon-actions";
import { MessageBoxType } from "@/dialog/quick-alert";
import KxMessageBox from "@/dialog/KxMessageBox";

export default {
	title: "Message Box",
	component: KxMessageBox,
	argTypes: {
		type: {
			control: {
				type: "select",
			},
			options: {
				Info: 0,
				Success: 1,
				Warning: 2,
				Error: 3,
			},
		},
	},
};

export const MessageBox = (args) => ({
	template: `
		<kx-button @click="show">显示消息框</kx-button>
		<kx-dialog-container></kx-dialog-container>
	`,
	data: () => ({
		onClose: action("close"),
	}),
	methods: {
		show() {
			this.$dialog.alert(args).then(this.onClose);
		},
	},
});

MessageBox.args = {
	type: MessageBoxType.Info,
	title: "带有取消按钮的消息框",
	content: "取消 = $dialog.close()\n确定 = $dialog.confirm()",
	closable: true,
	cancelable: true,
};

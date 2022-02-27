import { action } from "@storybook/addon-actions";
import { MessageType } from "@/dialog/controller";
import KxMessageBox from "@/dialog/KxMessageBox.vue";

export default {
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
		<KxButton @click="show">显示消息框</KxButton>
		<DialogContainer/>
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
	type: MessageType.Info,
	title: "带有取消按钮的消息框",
	content: "取消 = $dialog.close()\n确定 = $dialog.confirm()",
	closable: true,
	cancelable: true,
};

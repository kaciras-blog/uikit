import { Meta, StoryFn } from "@storybook/vue3";
import { MessageType } from "../../src/dialog/core.js";
import { DialogContainer } from "../../src/index.ts";
import KxButton from "../../src/input/KxButton.vue";
import KxMessageBox from "../../src/dialog/KxMessageBox.vue";

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
		onClick: {
			action: "clicked",
		},
	},
} satisfies Meta<typeof KxMessageBox>;

export const MessageBox: StoryFn = args => ({
	components: {
		KxButton,
		DialogContainer,
	},
	template: `
		<KxButton @click="show">显示消息框</KxButton>
		<DialogContainer/>
	`,
	methods: {
		show() {
			this.$dialog.alert(args).then(args.onClick);
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

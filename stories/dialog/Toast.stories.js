import Toast from "@/dialog/Toast.vue";
import { MessageBoxType } from "../../src";

export default {
	title: "Toast",
	component: Toast,
};

export const Toast2 = {
	name: "Toast",
	render: () => ({
		template: `
			<kx-button @click="show">显示气泡通知</kx-button>
			<kx-dialog-container/>
		`,
		methods: {
			show() {
				this.$dialog.toast({ type: MessageBoxType.Success, content: "评论提交成功" });
			},
		},
	}),
};

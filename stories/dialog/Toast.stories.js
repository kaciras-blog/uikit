import Toast from "@/dialog/KxToast.vue";
import { MessageType } from "../../src";

export default {
	component: Toast,
};

export const Toast2 = {
	name: "Toast",
	render: () => ({
		template: `
			<kx-button @click="show">显示气泡通知</kx-button>
			<ToastContainer></ToastContainer>
		`,
		methods: {
			show() {
				this.$toast.show({ type: MessageType.Success, content: "评论提交成功" });
			},
		},
	}),
};

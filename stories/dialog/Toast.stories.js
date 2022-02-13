import ToastComponent from "@/dialog/KxToast.vue";
import { MessageType } from "../../src";

export default {
	component: ToastComponent,
};

export const Toast = () => ({
	template: `
		<kx-button @click="show">显示气泡通知</kx-button>
		<ToastContainer></ToastContainer>
	`,
	methods: {
		show() {
			this.$toast.show({ type: MessageType.Success, content: "评论提交成功" });
		},
	},
});

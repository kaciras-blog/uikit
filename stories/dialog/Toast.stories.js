import { MessageType } from "../../src";
import ToastComponent from "@/dialog/KxToast.vue";

export default {
	component: ToastComponent,
};

export const Toast = () => ({
	template: `
		<KxButton @click="show">显示气泡通知</KxButton>
		<KxDialogContainer/>
	`,
	methods: {
		show() {
			this.$toast.show({ type: MessageType.Success, content: "评论提交成功" });
		},
	},
});

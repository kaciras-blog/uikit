import { StoryFn } from "@storybook/vue3";
import { MessageType } from "@";
import ToastComponent from "../../src/dialog/KxToast.vue";

export default {
	component: ToastComponent,
};

export const Toast: StoryFn = () => ({
	template: `
		<KxButton @click="show">
			显示气泡通知
		</KxButton>
		<ToastContainer/>
	`,
	methods: {
		show() {
			this.$toast.show({
				type: MessageType.Success,
				content: "评论提交成功！",
			});
		},
	},
});

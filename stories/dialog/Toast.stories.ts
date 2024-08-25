import { StoryFn } from "@storybook/vue3";
import { MessageType } from "../../src/dialog/core.ts";
import KxButton from "../../src/input/KxButton.vue";
import { ToastContainer } from "../../src/index.ts";
import ToastComponent from "../../src/dialog/KxToast.vue";

export default {
	component: ToastComponent,
};

export const Toast: StoryFn = () => ({
	components: {
		KxButton,
		ToastContainer,
	},
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

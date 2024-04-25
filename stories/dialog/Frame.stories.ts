import { StoryFn } from "@storybook/vue3";
import DemoFrame from "./DemoFrame.vue";

export default {
	component: DemoFrame,
};

export const Frame: StoryFn = () => ({
	template: `
		<KxButton class="primary" @click="show">
			显示弹出层
		</KxButton>
		<DialogContainer/>
	`,
	methods: {
		show() {
			this.$dialog.show(DemoFrame);
		},
	},
});

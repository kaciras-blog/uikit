import { Story } from "@storybook/vue3";
import DemoFrame from "./DemoFrame.vue";

export default {};

export const Frame: Story = () => ({
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

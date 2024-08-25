import { StoryFn } from "@storybook/vue3";
import DemoFrame from "./DemoFrame.vue";
import KxButton from "../../src/input/KxButton.vue";
import { DialogContainer } from "../../src/index.ts";

export default {
	component: DemoFrame,
};

export const Frame: StoryFn = () => ({
	components: {
		KxButton,
		DialogContainer,
	},
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

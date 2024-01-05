import { StoryFn } from "@storybook/vue3";
import { ref } from "vue";
import KxSwitchBox from "@/input/KxSwitchBox.vue";

export default {
	component: KxSwitchBox,
	args: {
		disabled: false,
	},
	argTypes: {
		disabled: {
			control: { type: "boolean" },
		},
	},
};

export const SwitchBox: StoryFn = args => ({
	components: { KxSwitchBox },
	template: `
		<div style="width: 300px">
			<p>
				Model value: {{ value }}
			</p>
			<KxSwitchBox
				v-bind="args"
				v-model="value"
			>
				这是一个切换按钮
			</KxSwitchBox>
		</div>
	`,
	setup() {
		return { args, value: ref(false) };
	},
});


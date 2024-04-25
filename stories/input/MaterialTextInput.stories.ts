import { StoryFn } from "@storybook/vue3";
import { ref } from "vue";
import MaterialTextInput from "../../src/input/MaterialTextInput.vue";

export default {
	component: MaterialTextInput,
	args: {
		disabled: false,
	},
	argTypes: {
		name: {
			control: { type: "text" },
		},
		label: {
			control: { type: "text" },
		},
		placeholder: {
			control: { type: "text" },
		},
		disabled: {
			control: { type: "boolean" },
		},
	},
};

export const Default: StoryFn = args => ({
	components: { MaterialTextInput },
	template: `
		<MaterialTextInput v-model="value" v-bind="args"/>
	`,
	setup() {
		return { args, value: ref("") };
	},
});

Default.args = {
	disabled: false,
	name: "name",
	label: "Your name:",
	placeholder: "default name",
};

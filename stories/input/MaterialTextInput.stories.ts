import { StoryObj } from "@storybook/vue3";
import MaterialTextInputC from "../../src/input/MaterialTextInput.vue";

export default {
	component: MaterialTextInputC,
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

export const MaterialTextInput: StoryObj = {
	args: {
		disabled: false,
		name: "name",
		label: "Your name:",
		placeholder: "default name",
	},
};

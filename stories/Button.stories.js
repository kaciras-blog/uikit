import { action } from "@storybook/addon-actions";
import KxButton from "@/components/KxButton";

export default {
	title: "Button",
	component: KxButton,
	parameters: {
		actions: {
			handles: ["click"],
		},
	},
	argTypes: {
		type: {
			control: {
				type: "select",
			},
			options: ["button", "outline", "text"],
		},
		disabled: {
			control: { type: "boolean" },
		},
	},
};

const Template = args => ({
	components: { KxButton },
	setup() {
		return { args, handleClick: action("click") };
	},
	template: '<kx-button v-bind="args">按钮</kx-button>',
});

export const Normal = Template.bind({});
Normal.args = {
	disabled: false,
};

export const Outline = Template.bind({});
Outline.args = {
	type: "outline",
	disabled: false,
};

export const Text = Template.bind({});
Text.args = {
	type: "text",
	disabled: false,
};

// link buttons?

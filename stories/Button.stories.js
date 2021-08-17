import { action } from "@storybook/addon-actions";
import KxButton from "@/components/KxButton";

export default {
	component: KxButton,
	title: "Button",
	parameters: {
		actions: {
			handles: ["click"],
		},
	},
	args: {
		disabled: false,
	},
	argTypes: {
		class: {
			control: { type: "select" },
			options: [null, "outline", "text"],
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


export const Outline = Template.bind({});
Outline.args = {
	class: "outline",
};

export const Text = Template.bind({});
Text.args = {
	class: "text",
};

export const Route = Template.bind({});
Route.args = {
	route: "#",
};

export const Link = Template.bind({});
Link.args = {
	href: "#",
};

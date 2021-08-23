import { h } from "vue";
import { action } from "@storybook/addon-actions";
import KxButton from "@/components/KxButton";

export default {
	component: KxButton,
	title: "Button",
	args: {
		disabled: false,
		onClick: action("click"),
	},
	argTypes: {
		type: {
			control: { type: "select" },
			options: [null, "outline", "text"],
		},
		color: {
			control: { type: "select" },
			options: [null, "second", "info", "dangerous", "shadow"],
		},
		disabled: {
			control: { type: "boolean" },
		},
	},
};

export const Default = {
	render: args => h(KxButton, args, "按钮"),
};

export const Outline = {
	...Default,
	args: { type: "outline" },
};

export const Text = {
	...Default,
	args: { type: "text" },
};

export const Link = {
	...Default,
	args: { href: "#" },
};

export const Route = {
	...Default,
	args: { route: "#" },
};

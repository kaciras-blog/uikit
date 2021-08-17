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
		class: {
			control: { type: "select" },
			options: [null, "outline", "text"],
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
	args: { class: "outline" },
};

export const Text = {
	...Default,
	args: { class: "text" },
};

export const Link = {
	...Default,
	args: { href: "#" },
};

export const Route = {
	...Default,
	args: { route: "#" },
};

import { h } from "vue";
import { action } from "@storybook/addon-actions";
import KxButton from "@/input/KxButton";

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
			options: [null, "outline", "text", "icon"],
		},
		color: {
			control: { type: "select" },
			options: [null, "primary", "second", "info", "dangerous"],
		},
		disabled: {
			control: { type: "boolean" },
		},
	},
};

// 这里按钮的内容包了层函数，避免警告 Non-function value encountered for default slot.
export const Default = {
	render: args => h(KxButton, args, { default: () => "按钮" }),
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

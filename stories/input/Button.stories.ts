import { Story } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { h } from "vue";
import KxButton from "@/input/KxButton.vue";

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
const render: Story = args => h(KxButton, args, { default: () => "按钮" });

export const Default = {
	render,
};

export const Outline = {
	render,
	args: { type: "outline" },
};

export const Text = {
	render,
	args: { type: "text" },
};

export const Link = {
	render,
	args: { href: "#" },
};

export const Route = {
	render,
	args: { route: "#" },
};

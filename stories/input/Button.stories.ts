import { Args, StoryFn } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { h } from "vue";
import TrashIcon from "bootstrap-icons/icons/trash.svg?sfc";
import ReplyIcon from "bootstrap-icons/icons/reply.svg?sfc";
import ArrowHeartIcon from "bootstrap-icons/icons/arrow-through-heart-fill.svg?sfc";
import KxButton from "@/input/KxButton.vue";

export default {
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
const render: StoryFn = args => h(KxButton, args, { default: () => "按钮" });

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

export const Icon = {
	render: (args: Args) => ({
		components: {
			TrashIcon,
			ReplyIcon,
			ArrowHeartIcon,
		},
		data: () => ({ args }),
		template: `
			<KxButton v-bind="args"><TrashIcon/></KxButton>
			<KxButton v-bind="args"><ReplyIcon/></KxButton>
			<KxButton v-bind="args"><ArrowHeartIcon/></KxButton>
		`,
	}),
	args: { type: "icon" },
};

export const Link = {
	render,
	args: { href: "#" },
};

export const Route = {
	render,
	args: { route: "#" },
};

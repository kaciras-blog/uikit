import { Args, Story } from "@storybook/vue3";
import { h } from "vue";
import AtomSpinnerC from "@/components/AtomSpinner.vue";
import SkFadingCircleC from "@/components/SkFadingCircle.vue";

export default {
	args: {
		size: 60,
		color: "#077ae6",
	},
	argTypes: {
		size: {
			control: { type: "number" },
		},
		color: {
			control: { type: "color" },
		},
	},
};

function getAttrs(args: Args) {
	return {
		style: {
			"--size": args.size + "px",
			"--color": args.color,
		},
	};
}

export const AtomSpinner: Story = (args) => ({
	render: () => h(AtomSpinnerC, getAttrs(args)),
});

export const SkFadingCircle: Story = (args) => ({
	render: () => h(SkFadingCircleC, getAttrs(args)),
});

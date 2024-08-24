import { Args, Meta, StoryFn } from "@storybook/vue3";
import { h } from "vue";
import AtomSpinnerC from "../src/components/AtomSpinner.vue";
import SkFadingCircleC from "../src/components/SkFadingCircle.vue";

export default {
	title: "Loading",
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
} satisfies Meta;

const getAttrs = (args: Args) => ({
	style: {
		"--color": args.color,
		"--size": args.size + "px",
	},
});

export const AtomSpinner: StoryFn = (args) => ({
	render: () => h(AtomSpinnerC, getAttrs(args)),
});

export const SkFadingCircle: StoryFn = (args) => ({
	render: () => h(SkFadingCircleC, getAttrs(args)),
});

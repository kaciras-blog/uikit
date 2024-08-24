import type { Meta } from "@storybook/vue3";
import RelativeTimeVue from "../src/components/RelativeTime.vue";

export default {
	component: RelativeTimeVue,
	args: {
		value: Date.now(),
	},
	argTypes: {
		value: {
			control: {
				type: "date",
			},
		},
		autoRefresh: {
			type: "number",
			control: {
				min: 0,
				step: 10,
			},
		},
		threshold: {
			type: "number",
			control: {
				min: 0,
			},
		},
	},
} satisfies Meta<typeof RelativeTimeVue>;

export const RelativeTime = {};

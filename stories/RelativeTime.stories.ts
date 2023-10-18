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
			control: {
				type: "number",
				min: 0,
				step: 10,
			},
		},
	},
} satisfies Meta<typeof RelativeTimeVue>;

export const RelativeTime = {};

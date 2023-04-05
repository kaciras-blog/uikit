import { StoryFn } from "@storybook/vue3";
import RelativeTimeVue from "@/components/RelativeTime.vue";

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
			autoRefresh: { 
				type: "number",
				min: 0,
				step: 10,
			},
		},
	},
};

export const RelativeTime: StoryFn = args => ({
	data: () => ({ args }),
	template: "<RelativeTime v-bind='args'/>",
});

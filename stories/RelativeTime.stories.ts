import { Story } from "@storybook/vue3";
import RelativeTimeVue from "@/components/RelativeTime.vue";

export default {
	component: RelativeTimeVue,
	args: {
		value: Date.now(),
	},
	argTypes: {
		value: {
			control: { type: "date" },
		},
	},
};

export const RelativeTime: Story = ({ value }) => ({
	data: () => ({ value }),
	template: "<RelativeTime :value='value'/>",
});

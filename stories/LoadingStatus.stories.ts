import { StoryFn } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import LoadingStatusVue from "@/components/LoadingStatus.vue";

export default {
	component: LoadingStatusVue,
};

export const LoadingStatus: StoryFn = (args) => ({
	components: { LoadingStatus: LoadingStatusVue },
	template: "<LoadingStatus v-bind='args' @retry='retry'/>",
	data: () => ({ args }),
	methods: { retry: action("retry") },
});

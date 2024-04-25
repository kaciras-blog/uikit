import LoadingStatusVue from "../src/components/LoadingStatus.vue";

export default {
	component: LoadingStatusVue,
	parameters: {
		actions: {
			handles: ["retry"],
		},
	},
};

export const LoadingStatus = {};

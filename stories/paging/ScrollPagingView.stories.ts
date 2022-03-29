import { Story } from "@storybook/vue3";
import { getQuotes } from "../data";
import ListItem from "./ListItem.vue";
import ScrollPagingViewVue from "@/paging/ScrollPagingView.vue";

export default {
	component: ScrollPagingViewVue,
	args: {
		total: 1000,

		autoLoad: false,
		start: 0,
		pageSize: 20,
		activeHeight: 200,
	},
	argTypes: {
		total: {
			control: { type: "number" },
		},
	},
};

export const ScrollPagingView: Story = (args) => ({
	components: { ListItem },
	template: `
		<ScrollPagingView
			v-bind="binding"
			v-model="model"
			:loader="load"
		>
		<template v-slot="{ items }">
			<ListItem v-for="v in items" :key="v.id" v-bind="v"/>
		</template>
		</ScrollPagingView>
	`,
	data() {
		const { total, ...binding } = args;
		return {
			binding,
			model: { total, items: [] },
		};
	},
	methods: {
		async load(start: number, size: number) {
			const { total } = args;
			const count = Math.min(total - start, size);
			return { total, items: getQuotes(count) };
		},
	},
});

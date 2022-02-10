import { getQuotes } from "../data";
import ListItem from "./ListItem.vue";
import ScrollPagingView from "@/paging/ScrollPagingView.vue";

export default {
	component: ScrollPagingView,
	title: "ScrollPagingView",
	args: {
		total: 1000,
	},
	argTypes: {
		total: {
			control: { type: "number" },
		},
	},
};

const render = (args) => ({
	components: { ListItem },
	template: `
		<scroll-paging-view
			v-bind="args"
			v-model="model"
			:loader="load"
		>
			<template v-slot="{ items }">
				<list-item v-for="v in items" :key="v.id" v-bind="v"/>
			</template>
		</scroll-paging-view>
	`,
	data: () =>({
		args,
		model: { total: args.total, items: [] },
	}),
	methods: {
		async load(start, size) {
			const { total } = args;
			const count = Math.min(total - start, size);
			return { total, items: getQuotes(count) };
		},
	},
});

export const Template = {
	render,
	args: {
		autoLoad: false,
		start: 0,
		pageSize: 20,
		activeHeight: 200,
	},
};

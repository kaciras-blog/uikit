import { ref } from "vue";
import ScrollPagingView from "@/paging/ScrollPagingView";
import { getQuotes } from "./data";
import ListItem from "./ListItem.vue";

export default {
	component: ScrollPagingView,
	title: "ScrollPagingView",
};

export const Template = {
	render: (args) => ({
		components: { ListItem },
		template: `
			<scroll-paging-view
				v-bind="args"
				v-model="value"
				:loader="load"
			>
				<template v-slot="{ items }">
					<list-item v-for="v in items" v-bind="v"/>
				</template>
			</scroll-paging-view>
		`,
		setup() {
			return { args, value: ref(null) };
		},
		methods: {
			async load(_, size) {
				return { total: 1000, items: getQuotes(size) };
			},
		},
	}),
	args: {
		autoLoad: false,
		start: 0,
		pageSize: 20,
		activeHeight: 200,
	},
};

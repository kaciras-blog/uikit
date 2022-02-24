import { getQuotes } from "../data";
import ListItem from "./ListItem";
import ButtonPagingView from "@/paging/ButtonPagingView.vue";

export default {
	component: ButtonPagingView,
	args: {
		total: 1000,
		theme: "default",
	},
	argTypes: {
		theme: {
			control: { type: "select" },
			options: ["default", "text"],
		},
		total: {
			control: { type: "number" },
		},
	},
};

export const Template = (args) => ({
	components: { ListItem },
	template: `
		<ButtonPagingView
			ref="pagingView"
			v-model="model"
			:loader="load"
			:viewport-offset="60"
			:page-size="10"
			:theme="args.theme"
			:top-buttons="true"
		>
			<template v-slot="{ items }">
				<ListItem v-for="v in items" :key="v.id" v-bind="v"/>
			</template>
		</ButtonPagingView>`,
	data: () => ({
		args,
		model: { total: args.total, items: getQuotes(10) },
	}),
	methods: {
		async load(start, size) {
			const { total } = args;
			const count = Math.min(total - start, size);
			return { total, items: getQuotes(count) };
		},
	},
	mounted() {
		this.$refs.pagingView.refresh();
	},
});

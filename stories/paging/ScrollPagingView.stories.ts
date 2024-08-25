import { StoryFn } from "@storybook/vue3";
import { getQuotes } from "../data.ts";
import ListItem from "./ListItem.vue";
import ScrollPagingViewVue from "../../src/paging/ScrollPagingView.vue";

export default {
	component: ScrollPagingViewVue,
	args: {
		total: 1000,
		mockErrorAt: Infinity,
		autoLoad: false,
		start: 0,
		pageSize: 20,
		activeHeight: 200,
	},
	argTypes: {
		mockErrorAt: {
			control: { type: "number" },
		},
		total: {
			control: { type: "number" },
		},
	},
};

export const ScrollPagingView: StoryFn = (args) => ({
	components: {
		ListItem,
		ScrollPagingView: ScrollPagingViewVue,
	},
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
			loadTimes: 0,
			binding,
			model: { total, items: [] },
		};
	},
	methods: {
		async load(start: number, size: number) {
			if (this.loadTimes >= args.mockErrorAt) {
				throw new Error("Mocked Error");
			}

			await new Promise(resolve => setTimeout(resolve, 1000));

			const { total } = args;
			const count = Math.min(total - start, size);
			this.loadTimes++;
			return { total, items: getQuotes(count) };
		},
	},
});

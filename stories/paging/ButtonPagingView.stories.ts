import { StoryFn } from "@storybook/vue3";
import { getQuotes } from "../data";
import ListItem from "./ListItem.vue";
import ButtonPagingViewVue from "@/paging/ButtonPagingView.vue";

export default {
	component: ButtonPagingViewVue,
	args: {
		mockErrorAt: Infinity,
		total: 1000,
		theme: "default",
	},
	argTypes: {
		mockErrorAt: {
			control: { type: "number" },
		},
		theme: {
			control: { type: "select" },
			options: ["default", "text"],
		},
		total: {
			control: { type: "number" },
		},
	},
};

export const ButtonPagingView: StoryFn = (args) => ({
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
		loadTimes: 0,
		model: { total: 0, items: [] },
	}),
	methods: {
		async load(start: number, size: number) {
			if (this.loadTimes >= args.mockErrorAt) {
				throw new Error("Mocked Error");
			}
			const { total } = args;
			const count = Math.min(total - start, size);
			this.loadTimes++;
			return { total, items: getQuotes(count) };
		},
	},
	mounted() {
		this.$refs.pagingView.refresh();
	},
});

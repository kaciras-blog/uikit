import { Story } from "@storybook/vue3";
import { getQuotes } from "../data";
import ListItem from "./ListItem.vue";
import ButtonPagingViewVue from "@/paging/ButtonPagingView.vue";

export default {
	component: ButtonPagingViewVue,
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

export const ButtonPagingView: Story = (args) => ({
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
		async load(start: number, size: number) {
			const { total } = args;
			const count = Math.min(total - start, size);
			return { total, items: getQuotes(count) };
		},
	},
	mounted() {
		this.$refs.pagingView.refresh();
	},
});

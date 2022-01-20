import ButtonPagingView from "@/paging/ButtonPagingView";
import { getQuotes } from "../data";
import ListItem from "./ListItem";

export default {
	component: ButtonPagingView,
	title: "ButtonPagingView",
};

export const Custom = {
	render: () => ({
		components: { ListItem },
		template: `
			<button-paging-view
				ref="pagingView"
				v-model="list"
				:loader="load"
				:viewport-offset="60"
				:page-size="10"
				:top-buttons="true"
			>
				<template v-slot="{ items }">
					<list-item v-for="v in items" key="v.id" v-bind="v"/>
				</template>
			</button-paging-view>`,
		data: () => ({
			list: null,
		}),
		methods: {
			async load(_, size) {
				return { total: 1000, items: getQuotes(size) };
			},
		},
		mounted() {
			this.$refs.pagingView.refresh();
		},
	}),
	name: "ButtonPagingView",
};

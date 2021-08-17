import ScrollPagingView from "@/paging/ScrollPagingView";

export default {
	component: ScrollPagingView,
	title: "ScrollPagingView",
};

function useModel(){

}

export const Template = args => ({
	template: `
		<scroll-paging-view
			v-bind="args"

		>
			<template v-slot="{ items }">
				<p v-for="item of items" :key="item">{{ item }}</p>
			</template>
		</scroll-paging-view>
	`,
	setup() {
		return { args };
	},
});

Template.args = {
	autoLoad: false,
	start: 0,
	pageSize: 20,
};

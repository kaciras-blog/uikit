import PagingButtons from "@/paging/PagingButtons";

export default {
	title: "PagingButtons",
	component: PagingButtons,
	argTypes: {
		type: {
			control: { type: "select" },
			options: [null, "outline", "text"],
		},
		color: {
			control: { type: "select" },
			options: [null, "second", "info", "dangerous", "shadow"],
		},
		disabled: {
			control: { type: "boolean" },
		},
	},
};

const render = (args) => ({
	template: `
		<paging-buttons v-bind="args" @show-page="showPage"/>
	`,
	components: {
		PagingButtons,
	},
	data: () => ({ args }),
	methods: {
		showPage(page) {

		},
	},
});

export const Default = {
	render,
	args: {
		index: 0,
		total: 100,
		omitPos: 2,
		buttonClass: undefined,
	},
};

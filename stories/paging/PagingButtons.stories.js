import PagingButtons from "@/paging/PagingButtons";
import { action } from "@storybook/addon-actions";

export default {
	title: "PagingButtons",
	component: PagingButtons,
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["default", "text"],
		},
		hasPageLink: {
			control: { type: "boolean" },
		},
	},
};

const render = (args) => ({
	template: `
		<paging-buttons v-bind="args" :page-link=pageLink @show-page="showPage"/>
	`,
	components: {
		PagingButtons,
	},
	data: () => ({ args }),
	computed: {
		pageLink() {
			return args.hasPageLink && this.link;
		},
	},
	methods: {
		showPage: action("showPage"),
		link: (i) => `https://example.com/page/${i}`,
	},
});

export const Default = {
	render,
	args: {
		type: "default",
		index: 2,
		total: 100,
		omitPos: 2,
		hasPageLink: false,
	},
};

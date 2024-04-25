import type { StorybookConfig } from "@storybook/vue3-vite";

export default <StorybookConfig>{
	framework: {
		name: "@storybook/vue3-vite",
		options: {
			docgen: "vue-component-meta",
		},
	},
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	docs: {
		autodocs: "tag",
	},
	stories: [
		"../stories/**/*.stories.ts",
	],
};

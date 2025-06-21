export default {
	framework: {
		name: "@storybook/vue3-vite",
		options: {
			docgen: "vue-component-meta",
		},
	},
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-docs"
	],
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.ts",
	],
};

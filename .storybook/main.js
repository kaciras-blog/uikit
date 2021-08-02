module.exports = {
	core: {
		"builder": "webpack5"
	},
	stories: [
		"../stories/**/dialog.stories.js",
	],
	addons: [
		"@storybook/addon-actions",
		"@storybook/addon-docs",
		"@storybook/addon-essentials",
		"@storybook/addon-viewport",
	],
};

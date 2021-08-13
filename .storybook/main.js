module.exports = {
	core: {
		"builder": "webpack5"
	},
	stories: [
		"../stories/**/*.stories.js",
	],
	addons: [
		// 这个包含了 actions、docs、viewports 等模块
		"@storybook/addon-essentials",
	],
};

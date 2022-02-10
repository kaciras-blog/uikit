module.exports = {
	core: {
		builder: "webpack5",
	},
	features: {
		previewCsfV3: true,
	},
	stories: [
		"../stories/**/*.stories.*",
	],
	addons: [
		// 这个包含了 actions、docs、viewports 等模块
		"@storybook/addon-essentials",
	],
};

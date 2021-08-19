const svgLoader = require.resolve("@kaciras-blog/devtool/lib/webpack/vue-svg-loader");

module.exports = {
	lintOnSave: false,

	chainWebpack: (config) => {
		const svgRule = config.module.rule("svg");

		svgRule.uses.clear();

		svgRule
			.use("vue-loader").loader("vue-loader")
			.end()
			.use("vue-svg-loader").loader(svgLoader);
	},
};

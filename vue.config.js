const svgLoader = require.resolve("@kaciras-blog/devtool/lib/webpack/vue-svg-loader");
const packageJson = require("./package.json");

module.exports = {
	lintOnSave: false,

	chainWebpack: (config) => {
		config.externals(Object.keys(packageJson.dependencies));

		const svgRule = config.module.rule("svg");
		svgRule.uses.clear();
		svgRule
			.use("vue-loader").loader("vue-loader")
			.end()
			.use("vue-svg-loader").loader(svgLoader);
	},
};

const svgLoader = require.resolve("@kaciras-blog/devtool/lib/webpack/reactive-svg-loader");
const sfcLoader = require.resolve("@kaciras-blog/devtool/lib/webpack/vue-template-loader");
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
			.use("sfc-loader").loader(sfcLoader)
			.end()
			.use("svg-loader").loader(svgLoader);
	},
};

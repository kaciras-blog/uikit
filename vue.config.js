const svgLoader = require.resolve("@kaciras-blog/devtool/lib/webpack/reactive-svg-loader");
const sfcLoader = require.resolve("@kaciras-blog/devtool/lib/webpack/vue-template-loader");
const packageJson = require("./package.json");

/**
 * 自定义下 vue-cli 的 webpack，改动包括：
 * 1）全部依赖外置，反正 website 项目里还是会打包，节省点编译时间。
 * 2）将 SVG 加载为 Vue 组件。
 */
module.exports = {
	lintOnSave: false,

	chainWebpack: (config) => {
		config.externals(Object.keys(packageJson.dependencies));

		const svgRule = config.module.rule("svg");
		svgRule.uses.clear();
		svgRule
			.delete("type").delete("generator")
			.use("vue-loader").loader("vue-loader")
			.end()
			.use("sfc-loader").loader(sfcLoader)
			.end()
			.use("svg-loader").loader(svgLoader);
	},
};

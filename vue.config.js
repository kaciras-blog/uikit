module.exports = {
	lintOnSave: false,
	baseUrl: undefined,
	outputDir: undefined,
	assetsDir: undefined,
	runtimeCompiler: undefined,
	productionSourceMap: false,
	parallel: undefined,

	chainWebpack: config => {
		if (process.env.NODE_ENV === "production") {
			config.plugin('webpack-report').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
		}
	},

	pages: {
		index: {
			entry: "example/main.js",
			template: "example/public/index.html",
		},
	},

	css: {
		modules: false,
		sourceMap: true,
	},
};

module.exports = {
	lintOnSave: false,
	baseUrl: undefined,
	outputDir: undefined,
	assetsDir: undefined,
	runtimeCompiler: undefined,
	productionSourceMap: false,
	parallel: undefined,

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

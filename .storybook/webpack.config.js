const Service = require("@vue/cli-service/lib/Service");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = async ({ config, mode }) => {
	const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd());
	service.init(mode.toLowerCase());
	const custom = service.resolveWebpackConfig();

	config = { ...config, module: { ...config.module, rules: custom.module.rules } };
	Object.assign(config.resolve.extensions, custom.resolve.extensions);

	config.resolve.alias = { ...custom.resolve.alias, ...config.resolve.alias };

	if(mode === "PRODUCTION") {
		config.plugins.push(new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css",
			chunkFilename: "css/[name].[contenthash:8].css",
		}));
	}

	// require("../scripts/dump-webpack-config")("storybook.js", config);
	return config;
};

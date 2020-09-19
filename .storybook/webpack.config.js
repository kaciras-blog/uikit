const { join } = require("path");
const Service = require("@vue/cli-service/lib/Service");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = async ({ config, mode }) => {
	const service = new Service(process.cwd());
	service.init(mode.toLowerCase());
	const custom = service.resolveWebpackConfig();

	const lessLoader = custom.module.rules.find(loader => loader.test.source === /\.less$/.source);
	config.module.rules.push(lessLoader);

	config.resolve.alias["@"] = join(__dirname, "..", "src");

	Object.assign(config.resolve.extensions, custom.resolve.extensions);

	if (mode === "PRODUCTION") {
		config.plugins.push(new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css",
			chunkFilename: "css/[name].[contenthash:8].css",
		}));
	}

	// require("../scripts/dump-webpack-config")("storybook.js", config);
	return config;
};

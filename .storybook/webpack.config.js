const { join } = require("path");
const Service = require("@vue/cli-service/lib/Service");

/**
 * 对 StoryBook 和 Vue-CLI 的整合分为两步：调整 Vue-CLI 的配置，然后合并。
 * 本函数是第一步，负责初始化配置以及移除一些冲突的插件。
 *
 * @see // https://github.com/storybookjs/vue-cli-plugin-storybook/blob/master/lib/preset.js
 */
function getCliConfig(mode) {
	const service = new Service(process.cwd());
	service.init(mode.toLowerCase());
	const chain = service.resolveChainableWebpackConfig();

	const allowedPlugins = [
		"friendly-errors",
		"no-emit-on-errors",
		"extract-css",
		// "optimize-css",
	];

	chain.plugins.values().map((item) => item.name)
		.filter(name => !allowedPlugins.includes(name))
		.forEach(name => chain.plugins.delete(name));

	return service.resolveWebpackConfig(chain);
}

module.exports = ({ config, mode }) => {
	const custom = getCliConfig(mode);

	const lessLoader = custom.module.rules.find(loader => loader.test.source === /\.less$/.source);
	config.module.rules.push(lessLoader);

	// SVG 加载器跟 StoryBook 自带的冲突
	const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));
	assetRule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;

	const svgLoader = custom.module.rules.find(loader => loader.test.source === /\.(svg)(\?.*)?$/.source);
	config.module.rules.push(svgLoader);

	config.resolve.alias["@"] = join(__dirname, "../src");
	config.plugins.push(...custom.plugins);
	Object.assign(config.resolve.extensions, custom.resolve.extensions);

	// require("../scripts/dump-webpack-config")("storybook.js", config);
	return config;
};

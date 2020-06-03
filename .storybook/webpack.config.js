const Service = require("@vue/cli-service/lib/Service");
const dump = require("../scripts/dump-webpack-config");

module.exports = async ({ config, mode }) => {
	const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd());
	service.init(mode.toLowerCase());
	const custom = service.resolveWebpackConfig();

	config = { ...config, module: { ...config.module, rules: custom.module.rules } };
	Object.assign(config.resolve.extensions, custom.resolve.extensions);

	config.resolve.alias = { ...custom.resolve.alias, ...config.resolve.alias };

	// dump("storybook.js", config);
	return config;
};

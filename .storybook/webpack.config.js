const Service = require('@vue/cli-service/lib/Service');

module.exports = async ({ config, mode }) => {
	const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd());
	service.init(mode.toLowerCase());
	const custom = service.resolveWebpackConfig();
	return { ...config, module: { ...config.module, rules: custom.module.rules } };
};

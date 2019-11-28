const fs = require("fs");
const { execFileSync } = require("child_process");
const Service = require("@vue/cli-service/lib/Service");
const { toString } = require("webpack-chain");
const { linter } = require("eslint");
const lintConfig = require("../.eslintrc");

/**
 * 获取 Vue-Cli 生成的 webpack 配置文件的内容，相当于 vue-cli-service inspect --mode <mode>。
 * 返回的内容是经 eslint 格式化过的JS代码 。
 *
 * @param mode 模式
 * @return {string} 配置文件内容
 */
function getConfigText(mode) {
	const service = new Service(process.cwd());
	service.init(mode);

	const output = "module.exports = " + toString(service.resolveWebpackConfig());

	const lintResult = linter.verifyAndFix(output, lintConfig);
	if (!lintResult.fixed) {
		console.error("生成配置文件失败，详细信息见生成的文件");
		return lintResult.messages.map((m) => JSON.stringify(m)).join("\n");
	}
	return lintResult.output;
}

/*
 * 测试发现在同一个VM里多次调用 service.resolveWebpackConfig() 总是返回第一次的结果，
 * 即便创建了多个实例并在 service.init(mode) 传入了不同的模式，这可能是 Vue-Cli 的 BUG。
 *
 * 所以这里开启多个进程来生成文件。
 */
const [,, mode, file] = process.argv;
if (mode) {
	fs.writeFileSync(file, getConfigText(mode));
} else {
	if (!fs.existsSync("temp")) {
		fs.mkdirSync("temp");
	}
	execFileSync(process.execPath, [__filename, "development", "temp/webpack.js"]);
	execFileSync(process.execPath, [__filename, "production", "temp/webpack.prod.js"]);
}

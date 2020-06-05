const { execFileSync } = require("child_process");
const Service = require("@vue/cli-service/lib/Service");
const dump = require("./dump-webpack-config");

/*
 * 获取 Vue-Cli 生成的 webpack 配置文件的内容，相当于 vue-cli-service inspect --mode <mode>。
 * 返回的内容是经 eslint 格式化过的JS代码，保存在 /temp 目录下。
 *
 * 测试发现在同一个VM里多次调用 service.resolveWebpackConfig() 总是返回第一次的结果，
 * 即便创建了多个实例并在 service.init(mode) 传入了不同的模式，这可能是 Vue-Cli 的 BUG。
 * 所以这里开启多个进程来生成文件。
 */
const [, , mode, name] = process.argv;
if (mode) {
	const service = new Service(process.cwd());
	service.init(mode);
	dump(name, service.resolveWebpackConfig());
} else {
	execFileSync(process.execPath, [__filename, "development", "vue-cli.js"]);
	execFileSync(process.execPath, [__filename, "production", "vue-cli.prod.js"]);
}

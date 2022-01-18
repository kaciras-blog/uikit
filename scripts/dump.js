const { join } = require("path");
const fs = require("fs");
const { toString } = require("webpack-chain");
const { ESLint, Linter } = require("eslint");

const eslint = new ESLint();

async function format(text, filename) {
	text = text.replaceAll(/\[native code];?/g, "/* native code */");
	text = "module.exports = " + text;

	const config = await eslint.calculateConfigForFile(filename);
	const result = new Linter().verifyAndFix(text, config);

	if (result.fixed) {
		return result.output;
	}
	console.error(`${filename} 格式化失败，详细信息见生成的文件`);
	return "exports = " + JSON.stringify(result.messages, null, "\t");
}

const outDir = join(__dirname, "../temp");
fs.mkdirSync(outDir, { recursive: true });

/**
 * 转储webpack的配置到 temp 目录下，可用于调试和参考。
 *
 * 输出的并不是一个有效的配置文件，动态内容如函数将被省略。
 *
 * @param name 输出的文件名
 * @param config 要输出的webpack配置
 */
module.exports = async function dump(name, config) {
	if (typeof config !== "string") {
		config = toString(config);
	}
	config = await format(config, name);
	fs.writeFileSync(join(outDir, name), config);
};

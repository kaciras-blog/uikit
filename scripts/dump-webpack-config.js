const { join } = require("path");
const fs = require("fs");
const { toString } = require("webpack-chain");
const { Linter } = require("eslint");
const lintConfig = require("../.eslintrc");

function format(text) {
	text = text.replace(/\[native code];?/g, "/* native code */");
	text = "module.exports = " + text;

	const result = new Linter().verifyAndFix(text, lintConfig);
	if (result.fixed) {
		return result.output;
	}

	console.error("[webpack-dump] 生成配置文件失败，详细信息见生成的文件");
	return result.messages.map(m => JSON.stringify(m)).join("\n");
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
module.exports = function dump(name, config) {
	if (typeof config !== "string") {
		config = toString(config);
	}
	fs.writeFileSync(join(outDir, name), format(config));
};

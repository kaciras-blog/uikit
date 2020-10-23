const fs = require("fs");
const { join } = require("path");
const { toString } = require("webpack-chain");
const { linter } = require("eslint");
const lintConfig = require("../.eslintrc");

function format(text) {
	text = text.replace(/\[native code];?/g, "/* native code */");
	text = "module.exports = " + text;

	const lintResult = linter.verifyAndFix(text, lintConfig);
	if (!lintResult.fixed) {
		console.error("[webpack-dump] 生成配置文件失败，详细信息见生成的文件");
		return lintResult.messages.map(m => JSON.stringify(m)).join("\n");
	}

	return lintResult.output;
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

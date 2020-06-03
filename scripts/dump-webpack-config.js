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

module.exports = function dump(name, config) {
	if (typeof config !== "string") {
		config = toString(config);
	}
	fs.writeFileSync(join(outDir, name), format(config));
};

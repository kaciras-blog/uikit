module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	"extends": [
		"plugin:vue/essential",
		"@vue/standard",
		"@vue/typescript",
	],
	rules: {
		// 我就是要用 TAB 缩进，可惜空格异端太多
		"no-tabs": "off",
		"indent": ["error", "tab", {
			SwitchCase: 1,
			FunctionDeclaration: { parameters: "off" }, // first 在 tab 缩进下有bug
			ignoreComments: true, // IDE 自动注释直接加在开头
		}],

		// 末尾逗号保持跟前面的一致，这样调整顺序或是增删都不会忘了逗号
		"comma-dangle": ["error", "always-multiline"],

		// JS的分号是有坑的，不知道为什么默认不加
		"semi": ["error", "always"],

		"space-before-function-paren": ["error", {
			anonymous: "never",
			named: "never",
			asyncArrow: "always",
		}],

		// 使用TAB缩进的情况下参数对齐需要混缩
		"no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],

		// 可能是我后端语言写多了，更喜欢双引号字符串
		"quotes": ["warn", "double"],

		// TS把字段写在构造方法参数里，而函数体空着，他认为是无用的？
		"no-useless-constructor": "off",

		// 我一版把类的第一行空着，但这条规则要么不空，要么最后一行也空
		"padded-blocks": "off",

		// 单行Lambda表达式里的赋值语句是常见的，它也不能区分一下？
		"no-return-assign": "off",

		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
	},
	parserOptions: {
		parser: "@typescript-eslint/parser",
	},
	overrides: [
		{
			files: [
				"**/__tests__/*.{j,t}s?(x)",
				"**/tests/unit/**/*.spec.{j,t}s?(x)",
			],
			env: {
				jest: true,
			},
		},
	],
};

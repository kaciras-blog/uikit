module.exports = {
	root: true,
	env: {
		es2020: true,
		node: true,
	},
	"extends": [
		"plugin:vue/essential",
		"@vue/typescript",
		"eslint:recommended",
	],
	rules: {
		// 我就是要用 TAB 缩进，可惜空格异端太多
		"no-tabs": "off",
		"indent": ["error", "tab", {
			SwitchCase: 1,
			FunctionDeclaration: { parameters: "off" },
			ignoreComments: true, // IDE 自动注释直接加在开头
		}],

		// 这方面 IDE 的提示比 Eslint 智能多了
		"no-unused-vars": "off",

		"no-redeclare": "off",

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
		"quotes": ["error", "double", {
			avoidEscape: true,
		}],

		// TypeScript 支持在 namespace 里声明成员
		"no-inner-declarations": ["off"],

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

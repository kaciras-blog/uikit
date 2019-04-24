module.exports = {
	root: true,
	env: {
		node: true,
	},
	"extends": [
		'plugin:vue/essential',
		'@vue/standard',
		'@vue/typescript'
	],
	rules: {
		"indent": ["error", "tab", {
			SwitchCase: 1,
			FunctionDeclaration: { parameters: "off" }, // first 在 tab 缩进下有bug
			ignoreComments: true, // IDE 自动注释直接加在开头
		}],
		"no-tabs": "off",
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		"no-return-assign": "off",
		"comma-dangle": ["error", "always-multiline"],
		"no-multiple-empty-lines": ["error", {
			max: 2,
			maxEOF: 1,
			maxBOF: 0,
		}],
		"space-before-function-paren": ["error", "never"],
		"padded-blocks": "off",
		"no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
	},
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
};

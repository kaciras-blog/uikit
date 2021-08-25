module.exports = {
	root: true,
	extends: [
		"@kaciras/typescript",
		"@kaciras/core",

		// 已经设置了 vue-eslint-parser
		"plugin:vue/vue3-essential",
	],
	env: {
		node: true,
	},
	parserOptions: {
		parser: "@typescript-eslint/parser",
	},
	rules: {
		"vue/require-explicit-emits": ["error", { allowProps: true }],
		"vue/no-lone-template": ["error", { ignoreAccessible: true }],
	},
	overrides: [
		{
			files: ["**/__tests__/*.{j,t}s?(x)"],
			extends: ["@kaciras/jest"],
		},
	],
};

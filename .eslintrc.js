module.exports = {
	root: true,
	extends: [
		"@kaciras/core",
		"@kaciras/typescript",

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
		"vue/no-template-shadow": "error",
		"vue/custom-event-name-casing": "error",
	},
	overrides: [
		{
			files: ["**/__tests__/*.{j,t}s?(x)"],
			extends: ["@kaciras/jest"],
		},
		{
			files: ["*.vue"],
			extends: ["plugin:@typescript-eslint/recommended"],
			parser: "vue-eslint-parser",
		},
	],
};

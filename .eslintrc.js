module.exports = {
	root: true,
	env: {
		es6: true,
		node: true
	},
	'extends': [
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
		"comma-dangle": ["error", "always-multiline"],
		"space-before-function-paren": "off",
		"semi": ["error", "always"],
		"no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
		"no-unused-vars": "warn",
		"quotes": ["warn", "double"],
		"no-return-assign": "off",
		"no-tabs": "off",
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	},
	parserOptions: {
		parser: '@typescript-eslint/parser'
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)'
			],
			env: {
				jest: true
			}
		}
	]
};

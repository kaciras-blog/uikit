module.exports = {
	root: true,
	env: {
		node: true,
	},
	"extends": [
		"plugin:vue/essential",
		"@vue/standard",
	],
	rules: {
		"indent": ["error", "tab", { SwitchCase: 1 }],
		"no-tabs": "off",
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		"no-return-assign": "off",
		"comma-dangle": ["error", "always-multiline"],
		"no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
	},
	parserOptions: {
		parser: "babel-eslint",
	},
};

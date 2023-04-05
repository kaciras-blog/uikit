module.exports = {
	root: true,
	extends: [
		"plugin:storybook/recommended",
		"@kaciras/core",
		"@kaciras/typescript",
		"@kaciras/vue/typescript",
	],
	env: { node: true }
};

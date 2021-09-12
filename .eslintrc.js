module.exports = {
	root: true,
	extends: [
		"@kaciras/core",
		"@kaciras/typescript",
		"@kaciras/vue/typescript",
	],
	env: {
		node: true,
	},
	overrides: [{
		files: [
			"**/__tests__/*.{j,t}s?(x)",
		],
		extends: ["@kaciras/jest"],
	}],
};

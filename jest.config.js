const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	globals: {
		"ts-jest": {
			isolatedModules: true,
		},
	},
	transform: {
		...tsjPreset.transform,
		"^.+\\.vue$": "@vue/vue3-jest",
	},
};

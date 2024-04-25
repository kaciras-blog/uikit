import { Preview, setup } from "@storybook/vue3";
import "../src/css/index.less";
import "./stories.less";
import { createMemoryHistory, createRouter } from "vue-router";
import { createPinia } from "pinia";
import UIKit, { observeMediaQuery } from "../src/index";

setup(app => {
	const pinia = createPinia();

	observeMediaQuery(pinia);

	app.use(UIKit);
	app.use(pinia);
	app.use(createRouter({
		routes: [],
		history: createMemoryHistory(),
	}));
});

// <Preview>{...} 无法解析，实测 ESBuild 能处理，不知道哪的问题。
export default {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				date: /Date$/,
				color: /(background|color)$/i,
			},
		},
	},
} satisfies Preview;

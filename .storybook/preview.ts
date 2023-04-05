import type { Preview } from "@storybook/vue3";
import { setup } from "@storybook/vue3";
import "../src/css/index.less";
import "./stories.less";
import { createMemoryHistory, createRouter } from "vue-router";
import { createPinia } from "pinia";
import UIKit, { observeMediaQuery, registerComponents } from "../src/index";

setup(app => {
	const pinia = createPinia();

	observeMediaQuery(pinia)

	app.use(UIKit);
	app.use(pinia);
	app.use(createRouter({
		routes: [],
		history: createMemoryHistory()
	}));

	registerComponents(app);
});

export default <Preview>{
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				date: /Date$/,
				color: /(background|color)$/i,
			},
		},
	},
};

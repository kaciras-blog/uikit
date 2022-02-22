import { app } from "@storybook/vue3";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { createMemoryHistory, createRouter } from "vue-router";
import "../src/css/index.less";
import "./stories.less";
import { createPinia } from "pinia";
import UIKit, { observeMediaQuery } from "../src/index";

const pinia = createPinia();

observeMediaQuery(pinia)

app.use(UIKit);
app.use(pinia);
app.use(createRouter({
	routes: [],
	history: createMemoryHistory()
}));

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
	viewport: {
		viewports: INITIAL_VIEWPORTS,
	},
	actions: { argTypesRegex: "^on.*" },
};

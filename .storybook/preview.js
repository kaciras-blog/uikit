import { app } from "@storybook/vue3";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { createMemoryHistory, createRouter } from "vue-router";
import "../src/css/index.less";
import "./stories.less";
import { createPinia } from "pinia";
import UIKit, { BreakPointManager } from "../src/index";

export const breakPointManager = new BreakPointManager({
	mobile: 768,
	tablet: 992,
	desktop: 1200,
	wide: 99999,
});

const pinia = createPinia();

breakPointManager.observeWindow(pinia)

app.use(breakPointManager);
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

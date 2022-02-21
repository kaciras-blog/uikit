import { app } from "@storybook/vue3";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { createMemoryHistory, createRouter } from "vue-router";
import "../src/css/index.less";
import "./stories.less";
import { createPinia } from "pinia";
import UIKit, { MediaQueryManager } from "../src/index";

export const mediaQueryPlugin = new MediaQueryManager({
	mobile: 768,
	tablet: 992,
	desktop: 1200,
	wide: 99999,
});

const pinia = createPinia();

mediaQueryPlugin.observeWindow(pinia)

app.use(mediaQueryPlugin);
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

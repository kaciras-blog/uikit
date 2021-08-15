import { app } from "@storybook/vue3";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { createMemoryHistory, createRouter } from "vue-router";
import "../src/css/index.less";
import "./stories.less";
import UIKit from "../src/index";

app.use(UIKit);
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

import { app } from "@storybook/vue3";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import "../src/css/index.less";
import "./stories.less";
import UIKit from "../src/index";

app.use(UIKit);

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
	viewport: {
		viewports: INITIAL_VIEWPORTS,
	},
	actions: { argTypesRegex: "^on.*" },
};

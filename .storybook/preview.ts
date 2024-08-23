import { Preview, setup } from "@storybook/vue3";
import "../src/css/index.less";
import "./stories.less";
import { createMemoryHistory, createRouter } from "vue-router";
import { createPinia } from "pinia";
import UIKit, { observeMediaQuery } from "../src/index";

const kHasSetup = Symbol();

setup(app => {
	// https://github.com/storybookjs/storybook/issues/18222
	if (Reflect.get(app, kHasSetup)) {
		return;
	}
	Reflect.set(app, kHasSetup, true);

	const pinia = createPinia();
	observeMediaQuery(pinia);

	app.use(UIKit);
	app.use(pinia);
	app.use(createRouter({
		routes: [],
		history: createMemoryHistory(),
	}));
});

// 由于启用了 JSX，所以不能用 <Preview> 来定义类型。
export default {
	tags: ["autodocs"],
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

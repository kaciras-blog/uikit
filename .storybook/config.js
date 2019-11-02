import { configure, addParameters } from "@storybook/vue";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Vue from "vue";
import Vuex from "vuex";
import KxUI from "../src/index";

Vue.use(Vuex);
Vue.use(KxUI);

addParameters({
	viewport: {
		viewports: INITIAL_VIEWPORTS,
	},
});

configure(require.context("../stories", true, /\.stories\.(js|mdx)$/), module);

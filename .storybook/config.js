import { configure, addParameters } from "@storybook/vue";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Vue from "vue";
import Vuex from "vuex";
import "../src/css/index.less";
import "./stories.less";
import UIKit from "../src/index";

Vue.use(Vuex);
Vue.use(UIKit);

addParameters({
	viewport: {
		viewports: INITIAL_VIEWPORTS,
	},
});

configure(require.context("../stories", true, /\.stories\.(js|mdx)$/), module);

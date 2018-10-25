import Vue from "vue";
import Router from "vue-router";
import Buttons from "./views/Buttons";
import Dialogs from "./views/Dialogs";
import RadioBoxes from "./views/RadioBoxes";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{ path: "/", component: Buttons },
		{ path: "/dialog", component: Dialogs },
		{ path: "/radiobox", component: RadioBoxes },
	],
});

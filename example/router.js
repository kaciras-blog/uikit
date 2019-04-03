import Vue from "vue";
import Router from "vue-router";
import Buttons from "./views/Buttons";
import Dialogs from "./views/Dialogs";
import RadioBoxes from "./views/RadioBoxes";
import UsageView from "./views/UsageView";
import Pageing from "./views/Pageing";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			redirect: "/usage",
		},
		{
			path: "/usage",
			component: UsageView,
			children: [
				{ path: "", component: RadioBoxes },
				{ path: "buttons", component: Buttons },
				{ path: "dialog", component: Dialogs },
				{ path: "radiobox", component: RadioBoxes },
				{ path: "pageing", component: Pageing },
			],
		},
	],
});

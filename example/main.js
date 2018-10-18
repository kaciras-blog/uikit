import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/css/index.less";
import KxUI from "@";

Vue.config.productionTip = false;

Vue.use(KxUI);

new Vue({
	router,
	render: h => h(App),
}).$mount("#app");

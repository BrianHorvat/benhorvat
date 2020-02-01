import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/";

import VueMeta from "vue-meta";
import VueMq from "vue-mq";

// eslint-disable-next-line no-unused-vars
import web_animations_js from "web-animations-js";

Vue.use(VueMeta);

Vue.use(VueMq, {
	breakpoints: {
		mobile: 768,
		tablet: 1024,
		desktop: Infinity
	}
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");

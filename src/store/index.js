import Vue from "vue";
import Vuex from "vuex";

import info from "./modules/info";
import feed from "./modules/feed";
import gallery from "./modules/gallery";
import contact from "./modules/contact";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
	modules: {
		info,
		feed,
		gallery,
		contact
	},
	strict: debug
});

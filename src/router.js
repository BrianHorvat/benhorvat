import Vue from "vue";
import Router from "vue-router";

import HomePage from "./pages/Home";
import NotFoundPage from "./pages/_404";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			props: true,
			component: HomePage,
			meta: {
				depth: 0,
				transparentHeader: true
			}
		},
		{
			path: "/portfolio",
			name: "portfolio",
			component: () => import("./pages/Portfolio"),
			meta: {
				depth: 1
			}
		},
		{
			path: "/services",
			name: "services",
			component: () => import("./pages/Services"),
			meta: {
				depth: 1.01
			}
		},
		// {
		// 	path: "/sort/:category",
		// 	name: "category",
		// 	props: true,
		// 	component: () => import("./pages/Sort"),
		// 	meta: {
		// 		depth: 1
		// 	}
		// },
		{
			path: "/gallery/:post",
			name: "post",
			component: () => import("./pages/Gallery"),
			meta: {
				depth: 1.1
			}
		},
		{
			path: "/about",
			name: "about",
			component: () => import("./pages/About"),
			meta: {
				depth: 2
			}
		},
		{
			path: "/process",
			name: "process",
			component: () => import("./pages/Process"),
			meta: {
				depth: 2.1
			}
		},
		{
			path: "/testimonials",
			name: "testimonials",
			component: () => import("./pages/Testimonials"),
			meta: {
				depth: 2.2
			}
		},
		{
			path: "/contact",
			name: "contact",
			component: () => import("./pages/Contact"),
			meta: {
				depth: 3
			}
		},
		{
			path: "*",
			name: "notfound",
			component: NotFoundPage,
			meta: {
				depth: -0.1
			}
		}
	],

	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return {
				x: 0,
				y: 0
			};
		}
	}
});

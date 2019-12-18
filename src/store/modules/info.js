import prismicAPI from "../../api/prismic";
import prismic from "prismic-javascript";
import prismicDOM from "prismic-dom";

import { linkResolver } from "./linkResolver";

// initial state
const state = {
	about: {
		loaded: false,
		content: "",
		picture: ""
	},
	aboutLoaded: false,

	testimonials: {
		loaded: false,
		flavorText: "",
		listings: []
	},
	testimonialsLoaded: false,

	process: {
		loaded: false,
		content: ""
	},
	processLoaded: false
};

const getters = {};

const actions = {
	async getAbout({ commit, state }) {
		if (state.about.loaded) return;

		const response = await prismicAPI.fetch(
			prismic.Predicates.at("document.type", "about")
		);
		const data = response.results[0].data;

		commit("setAbout", {
			loaded: true,
			content: prismicDOM.RichText.asHtml(data.content, linkResolver),
			picture: data.profile_pic.url
		});
	},

	async getProcess({ commit, state }) {
		if (state.processLoaded) return;

		commit("setProcessLoaded", false);

		const response = await prismicAPI.fetch(
			prismic.Predicates.at("document.type", "the_process")
		);
		const data = response.results[0].data.body;

		commit(
			"setProcess",
			data.map(section => {
				if (section.slice_type === "text") {
					return {
						text: section.items.map(item => {
							return prismicDOM.RichText.asHtml(
								item.text,
								linkResolver
							);
						})
					};
				} else if (section.slice_type === "image___text") {
					return {
						text: [
							prismicDOM.RichText.asHtml(
								section.primary.text,
								linkResolver
							)
						],
						images: section.items.map(item => {
							return item.image;
						})
					};
				} else if (section.slice_type === "images") {
					return {
						images: section.items.map(item => {
							return item.image;
						})
					};
				}
			})
		);
	},

	async getTestimonials({ commit, state }) {
		if (state.testimonialsLoaded) return;

		commit("setTestimonialsLoaded", false);

		const response = await prismicAPI.fetch(
			prismic.Predicates.at("document.type", "testimonials")
		);
		const data = response.results[0].data;

		console.dir(data);

		commit("setTestimonials", {
			flavorText: prismicDOM.RichText.asHtml(
				data.flavor_text,
				linkResolver
			),
			listings: data.testimonials.map(testimonial => {
				return {
					name: testimonial.name,
					image: testimonial.picture,
					quote: prismicDOM.RichText.asHtml(
						testimonial.quote,
						linkResolver
					),
					service: testimonial.service
				};
			})
		});
		commit("setTestimonialsLoaded", true);
	}
};

const mutations = {
	setAbout(state, data) {
		state.about = data;
	},
	setTestimonials(state, data) {
		state.testimonials = data;
	},
	setProcess(state, data) {
		state.process = data;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};

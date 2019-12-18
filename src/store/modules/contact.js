import prismicAPI from "../../api/prismic";
import prismic from "prismic-javascript";
import prismicDOM from "prismic-dom";

import { linkResolver } from "./linkResolver";

// initial state
const state = {
	blurb: "",
	types: [],
	loaded: false
};

const getters = {};

const actions = {
	async getContact({ commit, state }) {
		if (state.loaded) return;

		commit("setLoaded", false);

		const response = await prismicAPI.fetch(
			prismic.Predicates.at("document.type", "contact")
		);

		const data = response.results[0].data;

		commit(
			"setBlurb",
			prismicDOM.RichText.asHtml(data.blurb, linkResolver)
		);

		commit("setTypes", data.session_types.map(type => type.type));

		commit("setLoaded", true);
	}
};

const mutations = {
	setBlurb(state, data) {
		state.blurb = data;
	},
	setTypes(state, data) {
		state.types = data;
	},
	setLoaded(state, loaded) {
		state.loaded = loaded;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};

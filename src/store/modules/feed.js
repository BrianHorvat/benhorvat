import prismicAPI from "../../api/prismic";
import prismic from "prismic-javascript";
import prismicDOM from "prismic-dom";

import { linkResolver } from "./linkResolver";

// initial state
const state = {
	posts: [],
	loaded: false
};

const getters = {
	getPost: state => uid => state.posts.find(post => post.uid === uid),
	getPostsBySort: state => sort =>
		state.posts.filter(post => post.tags.includes(sort)),
	feed: (state, getters, rootState) =>
		rootState.gallery.sorts.map(sort => ({
			category: sort,
			posts: state.posts.filter(post =>
				sort.tags.some(tag => post.tags.includes(tag))
			)
		}))
};

const actions = {
	async getFeed({ commit, state }) {
		if (!state.loaded) {
			commit("setLoaded", false);
			const response = await prismicAPI.fetch(
				prismic.Predicates.at("document.type", "gallery")
			);

			commit(
				"setPosts",
				Object.values(response.results)
					.map(post => ({
						id: post.id,
						uid: post.uid,
						title: post.data.gallery_name,
						published: post.last_publication_date,
						images: post.data.images.map(
							image_wrapper => image_wrapper.image
						),
						order: post.data.order,
						tags: post.tags,
						hideFront: post.data.hide == true,
						description: prismicDOM.RichText.asHtml(
							post.data.gallery_description,
							linkResolver
						)
					}))
					.sort((a, b) => b.order - a.order)
			);

			commit("setLoaded", true);
		}
	}
};

const mutations = {
	setPosts(state, posts) {
		state.posts = posts;
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

import prismicAPI from '../../api/prismic'
import prismic from 'prismic-javascript'
import prismicDOM from 'prismic-dom'

import {
  linkResolver
} from './linkResolver'

// initial state
const state = {
  posts: [],
  loaded: false
}

const getters = {
  getPost: state => uid => {
    return state.posts.find(post => post.uid === uid)
  }
}

const actions = {
  getFeed({
    commit,
    state
  }) {
    if (!state.loaded) {
      commit('setLoaded', false)
      return prismicAPI.fetch(
          prismic.Predicates.at('document.type', 'gallery'))
        .then(response => {
          commit('setPosts', Object.values(response.results)
            .map(post => {
              return {
                id: post.id,
                uid: post.uid,
                title: post.data.gallery_name,
                published: post.last_publication_date,
                images: post.data.images.map(image_wrapper => {
                  return image_wrapper.image
                }),
                order: post.data.order,
                tags: post.tags,
                hideFront: post.data.hide === 'true',
                description: prismicDOM.RichText.asHtml(post.data.gallery_description, linkResolver)
              }
            })
            .sort((a, b) => b.order - a.order)
          )
          commit('setLoaded', true)
        })
    }
  }
}

const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },
  setLoaded(state, loaded) {
    state.loaded = loaded
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
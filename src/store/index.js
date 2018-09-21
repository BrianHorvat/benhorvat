import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sorts: {},
    posts: [],
    meta: {
      title: '',
      metaTitle: '',
      copyright: '',
      social: {
        twitter: '',
        instagram: '',
        facebook: '',
        linkedin: '',
        phone: ''
      }
    },
    about: {
      content: '',
      picture: ''
    }
  },
  mutations: {
    sorts (state, payload) {
      state.sorts = payload
    },
    posts (state, payload) {
      state.posts = payload
    },
    meta (state, payload) {
      state.meta = payload
    },
    about (state, payload) {
      state.about = payload
    }
  }
})

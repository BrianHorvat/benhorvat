import Vue from 'vue'
import Vuex from 'vuex'

import about from './modules/about'
import feed from './modules/feed'
import gallery from './modules/gallery'
import post from './modules/post'
import testimonials from './modules/testimonials'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    about,
    feed,
    gallery,
    post,
    testimonials
  },
  strict: debug
})
import Vue from 'vue'
import Vuex from 'vuex'

import info from './modules/info'
import feed from './modules/feed'
import gallery from './modules/gallery'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    info,
    feed,
    gallery
  },
  strict: debug
})
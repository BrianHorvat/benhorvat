import prismicAPI from '../../api/prismic'
import prismic from 'prismic-javascript'
import prismicDOM from 'prismic-dom'

// initial state
const state = {
  contact: {
    blurb: '',
    types: []
  },
  contactLoaded: false,
}

const getters = {}

const actions = {
  getContact({
    commit,
    state
  }) {
    if (state.contactLoaded) return

    commit('setContactLoaded', false)
    return prismicAPI.fetch(
        prismic.Predicates.at('document.type', 'contact'))
      .then(response => {
        const data = response.results[0].data
        commit('setContact', {
          blurb: prismicDOM.RichText.asHtml(data.blurb, doc => {
            if (doc.type === 'gallery') return '/gallery/' + doc.uid
          }),
          types: data.session_types.map(type => type.type)
        })
        commit('setContactLoaded', true)
      })
  }
}

const mutations = {
  setContact(state, data) {
    state.contact = data
  },
  setContactLoaded(state, loaded) {
    state.contactLoaded = loaded
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
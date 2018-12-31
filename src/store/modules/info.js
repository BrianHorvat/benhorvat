import prismicAPI from '../../api/prismic'
import prismic from 'prismic-javascript'
import prismicDOM from 'prismic-dom'

// initial state
const state = {
  about: {
    content: '',
    picture: ''
  },
  aboutLoaded: false,

  testimonials: [],
  testimonialsLoaded: false,

  process: {
    content: ''
  },
  processLoaded: false
}

const getters = {}

const actions = {
  getAbout({
    commit,
    state
  }) {
    if (state.aboutLoaded) return

    commit('setAboutLoaded', false)
    return prismicAPI.fetch(
        prismic.Predicates.at('document.type', 'about'))
      .then(response => {
        const data = response.results[0].data
        commit('setAbout', {
          content: prismicDOM.RichText.asHtml(data.content, doc => {
            if (doc.type === 'gallery') return '/gallery/' + doc.uid
          }),
          picture: data.profile_pic.url
        })
        commit('setAboutLoaded', true)
      })
  }
}

const mutations = {
  setAbout(state, data) {
    state.about = data
  },
  setAboutLoaded(state, loaded) {
    state.aboutLoaded = loaded
  },
  setTestimonials(state, data) {
    state.testimonials = data
  },
  setTestimonialsLoaded(state, loaded) {
    state.testimonialsLoaded = loaded
  },
  setProcess(state, data) {
    state.process = data
  },
  setProcessLoaded(state, loaded) {
    state.processLoaded = loaded
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
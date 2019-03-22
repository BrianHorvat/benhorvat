import prismicAPI from '../../api/prismic'
import prismic from 'prismic-javascript'
import prismicDOM from 'prismic-dom'

import {
  linkResolver
} from './linkResolver'

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
          content: prismicDOM.RichText.asHtml(data.content, linkResolver),
          picture: data.profile_pic.url
        })
        commit('setAboutLoaded', true)
      })
  },

  getProcess({
    commit,
    state
  }) {
    if (state.processLoaded) return

    commit('setProcessLoaded', false)
    return prismicAPI.fetch(
        prismic.Predicates.at('document.type', 'the_process'))
      .then(response => {
        const data = response.results[0].data.body
        commit('setProcess', data.map(section => {
          if (section.slice_type == 'text') {
            return section.items.map(item => {
              return prismicDOM.RichText.asHtml(item.text, linkResolver)
            })
          } else if (section.slice_type == 'image___text') {
            return {
              text: prismicDOM.RichText.asHtml(section.primary.text, linkResolver),
              images: section.items.map(item => {
                return item.image
              })
            }
          } else if (section.slice_type == 'images') {
            return section.items.map(item => {
              return item.image
            })
          }
        }))
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
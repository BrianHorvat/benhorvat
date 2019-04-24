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
    picture: '',
  },
  aboutLoaded: false,

  testimonials: {
    flavorText: '',
    listings: [],
  },
  testimonialsLoaded: false,

  process: {
    content: '',
  },
  processLoaded: false
}

const getters = {}

const actions = {
  async getAbout({
    commit,
    state
  }) {
    if (state.aboutLoaded) return

    commit('setAboutLoaded', false)

    const response = await prismicAPI.fetch(prismic.Predicates.at('document.type', 'about'));
    const data = response.results[0].data;

    commit('setAbout', {
      content: prismicDOM.RichText.asHtml(data.content, linkResolver),
      picture: data.profile_pic.url
    });
    commit('setAboutLoaded', true);
  },

  async getProcess({
    commit,
    state
  }) {
    if (state.processLoaded) return

    commit('setProcessLoaded', false)

    const response = await prismicAPI.fetch(prismic.Predicates.at('document.type', 'the_process'));
    const data = response.results[0].data.body;

    commit('setProcess', data.map(section => {
      if (section.slice_type === 'text') {
        return {
          text: section.items.map(item => {
            return prismicDOM.RichText.asHtml(item.text, linkResolver);
          })
        };
      } else if (section.slice_type === 'image___text') {
        return {
          text: [prismicDOM.RichText.asHtml(section.primary.text, linkResolver)],
          images: section.items.map(item => {
            return item.image;
          })
        };
      } else if (section.slice_type === 'images') {
        return {
          images: section.items.map(item => {
            return item.image;
          })
        };
      }
    }));
  },

  async getTestimonials({
    commit,
    state
  }) {
    if (state.testimonialsLoaded) return

    commit('setTestimonialsLoaded', false)

    const response = await prismicAPI.fetch(prismic.Predicates.at('document.type', 'testimonials'));
    const data = response.results[0].data;

    console.dir(data)

    commit('setTestimonials', {
      flavorText: prismicDOM.RichText.asHtml(data.flavor_text, linkResolver),
      listings: data.testimonials.map(testimonial => {
        return {
          name: testimonial.name,
          image: testimonial.picture,
          quote: prismicDOM.RichText.asHtml(testimonial.quote, linkResolver),
          service: testimonial.service
        }
      })
    });
    commit('setTestimonialsLoaded', true);
  },
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
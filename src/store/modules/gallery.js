import prismicAPI from '../../api/prismic'
import prismic from 'prismic-javascript'

// initial state
const state = {
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
  sorts: []
}

const getters = {
  prettyPhone(state) {
    const s2 = state.meta.social.phone.replace(/\D/g, '')
    const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/)
    return (!m) ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3]
  },
  instagramLink(state) {
    return 'https://instagram.com/' + state.meta.social.instagram
  },
  facebookLink(state) {
    return 'https://facebook.com/' + state.meta.social.facebook
  },
  emailLink(state) {
    return 'mailto:' + state.meta.social.email
  },
  phoneLink(state) {
    return 'tel:' + state.meta.social.phone
  }
}

const actions = {
  getMeta({
    commit
  }) {
    prismicAPI.fetch(
        prismic.Predicates.at('document.type', 'home'))
      .then(response => {
        const data = response.results[0].data

        commit('setMeta', {
          title: data.title,
          metaTitle: data.page_title,
          copyright: data.copyright,
          social: {
            instagram: data.instagram,
            facebook: data.facebook,
            email: data.email,
            phone: data.phone,
          }
        })
      })
  },

  getSorts({
    commit
  }) {
    prismicAPI.fetch(
      prismic.Predicates.at('document.type', 'sort')
    ).then(response => {
      commit('setSorts', Object.values(response.results).map(sort => {
        return {
          uid: sort['uid'],
          title: sort['data']['title'],
          tags: sort['data']['tags'].map(tagObj => tagObj['tag'])
        }
      }))
    })
  }
}

const mutations = {
  setMeta(state, meta) {
    state.meta = meta
  },
  setSorts(state, sorts) {
    state.sorts = sorts
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
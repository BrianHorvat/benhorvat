import prismicAPI from '../../api/prismic'
import prismic from 'prismic-javascript'

// initial state
const state = {
  posts: []
}

const getters = {
  getPost: state => uid => {
    return state.posts.find(post => post.uid === uid)
  }
}

const actions = {
  getFeed({
    commit
  }) {
    prismicAPI.fetch(
        prismic.Predicates.at('document.type', 'gallery'))
      .then(response => {
        commit('setPosts', Object.values(response.results)
          .map(post => {
            return {
              id: post['id'],
              uid: post['uid'],
              title: post['data']['gallery_name'],
              published: post['last_publication_date'],
              images: post['data']['images'],
              order: post['data']['order'],
              tags: post['tags'],
              hideFront: post['data']['hide'] === 'true'
            }
          })
          .sort((a, b) => b.order - a.order)
        )
      })
  }
}

const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
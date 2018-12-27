import prismic from 'prismic-javascript'

export default {
  gallery () {
    return {
      predicate: prismic.Predicates.at('document.type', 'home'),
      resolve: (response, mappers) => {
        const data = response.results[0].data
        return Promise.resolve({
          title: data.title,
          metaTitle: data.page_title,
          copyright: data.copyright,
          social: {
            instagram: data.instagram,
            facebook: data.facebook,
            email: data.email,
            phone: data.phone
          }
        })
      }
    }
  },
  sorts () {
    return {
      predicate: prismic.Predicates.at('document.type', 'sort'),
      resolve: (response, mappers) => {
        return Promise.resolve(Object.values(response['results']).map(sort => {
          return {
            uid: sort['uid'],
            title: sort['data']['title'],
            tags: sort['data']['tags'].map(tagObj => tagObj['tag'])
          }
        }))
      }
    }
  }
}

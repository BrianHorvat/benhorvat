import prismic from 'prismic-javascript'

export default {
  gallery () {
    return {
      predicate: prismic.Predicates.at('document.type', 'home'),
      resolve: (response, mappers) => {
        let data = response.results[0].data
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
        let sorts = {}
        Object.keys(response['results']).forEach(key => {
          let sort = response['results'][key]
          let mapped = {
            uid: sort['uid'],
            title: sort['data']['title'],
            tags: []
          }
          sort['data']['tags'].forEach(e => {
            mapped.tags.push(e.tag)
          })
          sorts[mapped.uid] = mapped
        })
        return Promise.resolve(sorts)
      }
    }
  }
}

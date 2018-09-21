import prismic from 'prismic-javascript'

export default {
  feed () {
    return {
      predicate: prismic.Predicates.at('document.type', 'gallery'),
      resolve: (response, mappers) => {
        let feed = []

        Object.keys(response['results']).forEach(key => {
          let post = response['results'][key]
          let mapped = {
            id: post['id'],
            uid: post['uid'],
            title: post['data']['gallery_name'],
            published: post['last_publication_date'],
            images: post['data']['images'],
            order: post['data']['order'],
            tags: post['tags'],
            hideFront: post['data']['hide'] === 'true'
          }
          feed.push(mapped)
        })

        return Promise.resolve(feed)
      }
    }
  }
}
